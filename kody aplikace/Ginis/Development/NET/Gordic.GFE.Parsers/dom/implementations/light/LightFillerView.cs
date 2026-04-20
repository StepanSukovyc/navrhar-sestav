//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.FillerView.cs                     </Name>
//    <Description> Třída pro zobrazení formulářů                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-28                                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Text;
using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.General;
using Gordic.GFE.Parsers.Binding;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Výchozí třída pro práci s formuláři.
    /// Pohled bez ovladačů.
    /// Používá se jako nevizuální prvek.
    /// </summary>
    public class LightFillerView : DefaultAbstractViewContent, ICustomizedCommands, IDataManagerHandler
    {
        #region DefaultAbstractViewContent
        /// <summary>
        /// přetížení ovladače - daná třída neobsahuje žádný
        /// </summary>
        public override object Control { get => null; }

        bool isSaving = false;
        /// <summary>
        /// Přetížení kvůli tomu, že Primární Filler není vidět
        /// Je vidět jeho sekundární obsahy
        /// </summary>
        /// <param name="file"></param>
        /// <param name="stream"></param>
        public override void Save(OpenedFile file, System.IO.Stream stream)
        {
            if (!isSaving)
                isSaving = true;
            else
            {
                stream.Write(FileData, 0, FileData.Length);
                //using (StreamWriter sw = new StreamWriter(stream))
                //    sw.Write(FileContent);

                return;
            }

            foreach (var item in SecondaryViewContents)
                item.Save(file, stream);

            isSaving = false;
        }
        #endregion

        #region ICustomizedCommands
        /// <summary>
        /// Uložení sestavy
        /// </summary>
        /// <returns></returns>
        public bool SaveCommand()
        {
            if (project != null)
                return Save(new EventHandlerOpenedFileArgument(SaveFile.Save), project.Save);

            return true;
        }
        /// <summary>
        /// Uložení sestavy
        /// </summary>
        /// <returns></returns>
        public bool SaveAsCommand()
        {
            if (project != null)
                return SaveAs(new EventHandlerOpenedFileArgument(SaveFile.Save), project.SaveAs);

            return true;
        }
        /// <summary>
        /// Uložení obsahu.
        /// </summary>
        /// <param name="fileServiceEventHandler">Uložení obsahu</param>
        /// <param name="projectEventHandler">Uložení projektu</param>
        /// <returns></returns>
        internal bool Save(EventHandlerOpenedFileArgument fileServiceEventHandler, EventHandler projectEventHandler = null)
        {
            try
            {
                // po uložení textové části souboru
                fileServiceEventHandler.Invoke(PrimaryFile);

                // uložíme projektovu část
                if (projectEventHandler != null)
                    projectEventHandler.Invoke(this, EventArgs.Empty);

                return true;
            }
            catch (Exception ex)
            {
                MessageService.ShowError(ex);
                return false;
            }
        }
        /// <summary>
        /// Uložení obsahu.
        /// </summary>
        /// <param name="fileServiceEventHandler">Uložení obsahu</param>
        /// <param name="projectEventHandler">Uložení projektu</param>
        /// <returns></returns>
        internal bool SaveAs(EventHandlerOpenedFileArgument fileServiceEventHandler, EventHandlerFillerSaveAs projectEventHandler = null)
        {
            try
            {
                // po uložení textové části souboru
                fileServiceEventHandler.Invoke(PrimaryFile);

                // uložíme projektovu část
                if (projectEventHandler != null)
                    projectEventHandler.Invoke(this, new EventArgsFillerSaveAs());

                return true;
            }
            catch (Exception ex)
            {
                MessageService.ShowError(ex);
                return false;
            }
        }
        /// <summary>
        /// Uložení souboru do databáze
        /// </summary>
        /// <returns>TRUE, pokud operace je dostupná</returns>
        public bool SaveToDatabaseCommand(EventHandlerOpenedFileArgument eventHandler) { return false; }
        #endregion

        #region IDataManagerHandler
        /// <summary>
        /// správce dostupných dat
        /// </summary>
        public DefaultDataManager DataManager { get; set; }
        GFEStructure structure;
        /// <summary>
        /// Přidružená datová struktura
        /// </summary>
        public GFEStructure Structure { get { return structure; } }

        byte[] m_FileData;
        /// <summary>
        /// data formuláře
        /// </summary>
        //public byte[] FileData { get { return Encoding.UTF8.GetBytes(fileContent); } }
        public byte[] FileData { get { return m_FileData; } }
        

        //string fileContent;
        /// <summary>
        /// Zdrojový soubor, ze kterého byla vytvořená jednotka.
        /// </summary>
        public string FileContent
        {
            //get { return fileContent; }
            //set { fileContent = value; }
            get { return Encoding.UTF8.GetString(m_FileData); }
            set { m_FileData = Encoding.UTF8.GetBytes(value); }
        }
        #endregion

        IFiller project;
        IFiller IDataManagerHandler.Filler { get { return project; } }

        /// <summary>
        /// inicializace pohledu
        /// </summary>
        /// <param name="file">primární soubor zobrazení</param>
        /// <param name="project">projekt souboru zobrazení</param>
        public override IViewContent Initialize(OpenedFile file, IFiller project)
        {
            base.Initialize(file, project);
            this.project = project;
            TabPageText = GResources.GetResourceText(29450305); //RC 29450305 : Datový soubor

            _OnFileNameChanged(file);
            return this;
        }

        /// <summary>
        /// "otevření" (načtení všech potřebných dat) pohledu
        /// </summary>
        public void Open()
        {
            var file = _Files[0];

            // vytvoříme datovou structuru
            // musí být před načtením textu
            GetOrCreateStructure(project.StructureSection);

            DataManager = new DefaultDataManager(structure, project);
            file.ForceInitializeView(this);
            DataManager.Encoding = PrimaryFile != null ? PrimaryFile.Encoding : Encoding.UTF8;
            SetCompilationUnit(file);

            if (project.FormatFile != null)
                if (project.FormatFile.Items.Count != 0)
                {
                    string fileName = FileUtility.Combine(project.FormatFile.Items[0].Location, project.FormatFile.Items[0].Name);

                    if (FileUtility.TestFileExists(fileName))
                    {
                        var grfControl = new DefaultViewContent();
                        grfControl.Initialize(this, project.IsLK);
                        SecondaryViewContents.Add(grfControl);
                        project.OnBeforeLoad();
                        grfControl.FormFile = FileService.GetOrCreateOpenedFile(fileName);
                    }
                }
        }

        void SetCompilationUnit(OpenedFile opendFile)
        {
            if (opendFile != null)
            {
                //FileContent = new System.IO.StreamReader(opendFile.OpenRead()).ReadToEnd();
                m_FileData = opendFile.FileData;
                if (m_FileData == null) m_FileData = File.ReadAllBytes(opendFile.ContentFileName);
            }
        }
        void GetOrCreateStructure(ProjectSection structureSection)
        {
            if (structureSection != null)
                if (structureSection.Items.Count != 0)
                {
                    string fileName = FileUtility.Combine(structureSection.Items[0].Location, structureSection.Items[0].Name);

                    if (FileUtility.TestFileExists(fileName))
                        structure = GFEStructure.LoadFromFile(fileName); //StructureViewEntry.GetOrCreate(fileName);
                }
        }
    }
}

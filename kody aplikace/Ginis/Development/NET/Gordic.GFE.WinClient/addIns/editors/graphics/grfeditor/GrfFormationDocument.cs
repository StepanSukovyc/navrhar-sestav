//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.FormationDocument.cs                     </Name>
//    <Description> Jednotka GRF sestavy                                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Linq;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Editor;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.InfoSectionView;
using Gordic.GFE.WinClient.Services;
using Gordic.General;
using System.Text;

namespace Gordic.GFE.WinClient.GrfEditor
{
    /// <summary>
    /// Jednotka GRF sestavy
    /// </summary>
    class GrfFormationDocument : GraphicFormationDocument
    {
        #region AbstractFormationDocument
        /// <summary>
        /// načtení stránek z formátu <paramref name="format"/>.
        /// </summary>
        /// <param name="format">formát sestavy</param>
        public override void LoadPages(GFEFormat format)
        {
            base.LoadPages(format);
            Pages.Parent = document.Control as IPagePanel;

            if (format is GFEFormatGRF)
            {
                for (int i = 0; i < (format as GFEFormatGRF).PageCount; i++)
                {
                    GrfPage page = new GrfPage(Pages);
                    page.Initialize();
                    page.ChangePosition += PageChangePosition;
                    Pages.Add(page as IPage);
                }
                //Pages.SynchronizeByOrigin();
            }
            else
                MessageService.ShowError(GResources.GetResourceText(29450002)); //RC 29450002 : Chybný formát sestavy.
        }
        /// <summary>
        /// načtení formátu XML
        /// </summary>
        /// <param name="xml">obsah formátu XML</param>
        public override void Load(string xml)
        {
            base.Load(xml);
            try
            {
                if (document.PrimaryFile != null)
                {
                    // načteme vlastností dokumentu
                    _FormationProperty.LoadContent(this, document.PrimaryFile.Encoding, xml, document.PrimaryFile.FileName);
                    _FormationProperty.RefreshContent();
                    OnFormationLoaded();
                }
            }
            catch (Exception ex)
            {
                LoggingService.Debug(ex.ToString());
                document.ShowErrorMessage(ex.Message);
            }
        }
        #endregion

        IFormationDocumentProperty formProp;
        /// <summary>
        /// Vlastnosti dokumentu
        /// </summary>
        public override IFormationDocumentProperty _FormationProperty
        {
            get
            {
                if (formProp == null)
                {
                    if (CompilationService.Units[document.PrimaryFile] is CompilationUnit cu)
                    {
                        if (cu.FormationProperty == null)
                            cu.FormationProperty = new GrfFormationProperty();
                        cu.CompileMethod += CompileMethod;
                        formProp = cu.FormationProperty;
                    }
                }

                return formProp;
            }
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="document"></param>
        public GrfFormationDocument(IDocumentView document)
            : base(document)
        {
        }

        /// <summary>
        /// Vytvoření stránky
        /// </summary>
        internal void CreatePage()
        {
            IPage existPage = Pages.First();
            GrfPage page = new GrfPage(Pages);
            page.Initialize();
            page.ChangePosition += PageChangePosition;
            Pages.Add(page as IPage);
        }
        /// <summary>
        /// Odstranění stránky ze seznamu stránek
        /// </summary>
        /// <param name="page">Stránka k odstranění</param>
        internal void RemovePage(IPage page)
        {
            if (Pages.Contains(page))
                Pages.Remove(page);
        }
        internal void RefreshByStructure()
        {
            if (Pages != null)
                foreach (var item in Pages)
                    if (item is IItemContainer)
                        (item as IItemContainer).RefreshByStructure();
        }

        /// <summary>
        /// Generování alf kódu
        /// </summary>
        /// <param name="unt"></param>
        /// <returns></returns>
        string CompileMethod(dynamic unt = null)
        {
            ThreadService.WaitForLockers();
            CompilationUnit unit = (unt is CompilationUnit ? unt as CompilationUnit : (CompilationService.Units[document.PrimaryFile] as CompilationUnit)) ?? throw new GException(GResources.GetResourceText(29450001));

            // uvolníme seznam obrázků z předchozího uložení
            ImageService.ClearSaved(unit.OpenedFile);

            //Načtení ze sestavy
            XmlDocumentPosition xmlDoc = new XmlDocumentPosition();
            xmlDoc.Selected.Clear();

            //<?xml version="1.0" encoding="utf-8"?>
            XmlDeclaration xmlDecl = xmlDoc.CreateXmlDeclaration(ReportDesignerProperties.Instance.Version, unit.OpenedFile.Encoding.WebName, null);
            xmlDoc.AppendChild(xmlDecl);

            // uložení globálního komentáře před sekci formát
            XmlDocumentService.SetChangesComments(formProp.Comments, xmlDoc);

            // z obsahu převezmene Info sekci
            XmlDocument xmlOldDoc = new XmlDocument();
            xmlOldDoc.LoadXml(unit.FileContent.Content);
            unit.NamespaceURI = xmlOldDoc.DocumentElement.NamespaceURI;

            //<format type="grr" xmlns="http://www.gordic.cz/TR/alf/1.4/">
            XmlElement xmlFormat = xmlDoc.CreateElement("format", unit.NamespaceURI);
            xmlFormat.SetAttribute("type", "grf");

            // zkopírujemen sekcí INFO
            if (InfoSectionViewPad.Instance == null
                || !InfoSectionViewPad.SetInfoSection(xmlDoc, xmlFormat, unit.OpenedFile))
                XmlDocumentService.CopyInfoSection(xmlOldDoc, xmlFormat, xmlDoc);

            // uložení dat do sekce PAPER-SETTING
            XmlDocumentService.SetPaperSetting(Pages, xmlFormat, unit.NamespaceURI);

            // uložíme globální komentáře
            XmlDocumentService.SetGlobalScripts(_FormationProperty.GlobalScripts, xmlFormat);

            formProp.SetData(ref xmlFormat, unit);
            if (!unit.OpenedFile.CancelSaving)
            {
                xmlDoc.AppendChild(xmlFormat);
                unit.ZipResources = ImageService.GetZippedImage(unit.OpenedFile);
                unit.XmlDocPosition = xmlDoc;
                return xmlDoc.OuterXml;
            }
            else
                throw new GException(string.Format("{0}\n{1}", GResources.GetResourceText(29450003), //RC 29450003 : Chyba uložení!
                    GResources.GetResourceText(29450004))); //RC 29450004 : Zřejmě chybí datová struktura!
        }
        void PageChangePosition(object sender, EventArgsChangePosition e)
        {
            if (e != EventArgs.Empty)
                Pages.MoveFromTo(e.OldPosition, e.NewPosition);

            UndoRedoService.Commit();
        }
    }
}

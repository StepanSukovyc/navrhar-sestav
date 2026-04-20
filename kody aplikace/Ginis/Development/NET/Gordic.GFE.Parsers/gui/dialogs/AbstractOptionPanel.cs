//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AbstractOptionPanel.cs                   </Name>
//    <Description> Abstraktní třída Možnosti                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.XmlForms;
using Gordic.General;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Abstraktní třída Možnosti
    /// </summary>
    public class AbstractOptionPanel : BaseXmlUserControl, IDialogPanel
    {
        bool wasActivated = false;
        bool isFinished = true;
        object customizationObject;
        /// <summary>
        /// Ovladač
        /// </summary>
        public Control Control { get => this; }
        /// <summary>
        /// Je aktivované
        /// </summary>
        public bool WasActivated { get => wasActivated; }
        /// <summary>
        /// Přizpůsobení objektu
        /// </summary>
        public object CustomizationObject
        {
            get => customizationObject;
            set
            {
                customizationObject = value;
                OnCustomizationObjectChanged();
            }
        }
        /// <summary>
        /// Povoleno ukončení
        /// </summary>
        public virtual bool EnableFinish
        {
            get => isFinished;
            set
            {
                if (isFinished != value)
                {
                    isFinished = value;
                    OnEnableFinishChanged();
                }
            }
        }
        /// <summary>
        /// Název sestavení
        /// </summary>
        protected string AssemblyName { get => this.GetType().Assembly.GetName().Name; }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public AbstractOptionPanel() { }

        /// <summary>
        /// Příjem zpráv
        /// </summary>
        /// <param name="message">přijatá zpráva</param>
        /// <returns></returns>
        public virtual bool ReceiveDialogMessage(DialogMessage message)
        {
            switch (message)
            {
                case DialogMessage.activated:
                    if (!wasActivated)
                    {
                        LoadPanelContents();
                        wasActivated = true;
                    }
                    break;
                case DialogMessage.ok:
                    if (wasActivated)
                        return StorePanelContents();
                    break;
            }

            return true;
        }
        /// <summary>
        /// Načtení obsahu panelu
        /// </summary>
        public virtual void LoadPanelContents() { }
        /// <summary>
        /// Uložení obsahu panelu
        /// </summary>
        /// <returns></returns>
        public virtual bool StorePanelContents() => true;

        /// <summary>
        /// Základní složka
        /// </summary>
        protected string baseDirectory = string.Empty;
        /// <exclude/>
        protected void ConnectBrowseButton(string browseButton, string target, string fileFilter)
        {
            if (ControlDictionary[browseButton] == null)
            {
                MessageService.ShowErrorFormatted(string.Join(" ", "{0}", GResources.GetResourceText(29450403)), browseButton); //RC 29450403 : nenalezen!
                return;
            }
            if (ControlDictionary[target] == null)
            {
                MessageService.ShowErrorFormatted(string.Join(" ", "{0}", GResources.GetResourceText(29450403)), target); //RC 29450403 : nenalezen!
                return;
            }
            ControlDictionary[browseButton].Click += new EventHandler(new BrowseButtonEvent(this, ControlDictionary[target], fileFilter).Event);
        }
        /// <exclude/>
        protected void ConnectBrowseFolder(string browseButton, string target)
        {
            ConnectBrowseFolder(browseButton, target, GResources.GetResourceText(29450404)); //RC 29450404 : Vyberte složku.
        }
        /// <exclude/>
        protected void ConnectBrowseFolder(string browseButton, string target, string description)
        {
            if (ControlDictionary[browseButton] == null)
            {
                MessageService.ShowErrorFormatted(string.Join(" ", "{0}", GResources.GetResourceText(29450403)), browseButton);
                return;
            }
            if (ControlDictionary[target] == null)
            {
                MessageService.ShowErrorFormatted(string.Join(" ", "{0}", GResources.GetResourceText(29450403)), target);
                return;
            }

            ControlDictionary[browseButton].Click += new EventHandler(new BrowseFolderEvent(this, target, description).Event);
        }

        sealed class BrowseButtonEvent
        {
            readonly AbstractOptionPanel panel;
            readonly Control target;
            readonly string filter;

            public BrowseButtonEvent(AbstractOptionPanel panel, Control target, string filter)
            {
                this.panel = panel;
                this.filter = filter;
                this.target = target;
            }

            public void Event(object sender, EventArgs e)
            {
                using (OpenFileDialog fdiag = new OpenFileDialog())
                {
                    fdiag.Filter = StringParser.Parse(filter);
                    fdiag.Multiselect = false;
                    try
                    {
                        string initialDir = System.IO.Path.GetDirectoryName(System.IO.Path.Combine(panel.baseDirectory, target.Text));
                        if (FileUtility.IsValidPath(initialDir) && System.IO.Directory.Exists(initialDir))
                            fdiag.InitialDirectory = initialDir;
                    }
                    catch { }
                    if (fdiag.ShowDialog() == DialogResult.OK)
                    {
                        string file = fdiag.FileName;
                        if (panel.baseDirectory != null)
                            file = FileUtility.GetRelativePath(panel.baseDirectory, file);
                        target.Text = file;
                    }
                }
            }
        }

        sealed class BrowseFolderEvent
        {
            readonly AbstractOptionPanel panel;
            readonly string target;
            readonly string description;

            internal BrowseFolderEvent(AbstractOptionPanel panel, string target, string description)
            {
                this.panel = panel;
                this.description = description;
                this.target = target;
            }

            public void Event(object sender, EventArgs e)
            {
                string startLocation = panel.baseDirectory;
                if (startLocation != null)
                {
                    string text = panel.ControlDictionary[target].Text;
                    startLocation = FileUtility.GetAbsolutePath(startLocation, text);
                }

                using (FolderBrowserDialog fdiag = FileUtility.CreateFolderBrowserDialog(description, startLocation))
                {
                    if (fdiag.ShowDialog() == DialogResult.OK)
                    {
                        string path = fdiag.SelectedPath;
                        if (panel.baseDirectory != null)
                            path = FileUtility.GetRelativePath(panel.baseDirectory, path);
                        if (!path.EndsWith("\\") && !path.EndsWith("/"))
                            path += "\\";
                        panel.ControlDictionary[target].Text = path;
                    }
                }
            }
        }

        /// <exclude/>
        protected virtual void OnEnableFinishChanged()
        {
            EnableFinishChanged?.Invoke(this, null);
        }
        /// <exclude/>
        protected virtual void OnCustomizationObjectChanged()
        {
            CustomizationObjectChanged?.Invoke(this, null);
        }

        /// <summary>
        /// Objekt změněn
        /// </summary>
        public event EventHandler CustomizationObjectChanged;
        /// <summary>
        /// Povolení změněno
        /// </summary>
        public event EventHandler EnableFinishChanged;

        /// <summary>
        /// Wizard
        /// </summary>
        public WizardDialog Wizard { get; set; }
    }
}

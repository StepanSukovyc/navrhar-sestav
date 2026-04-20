//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.RdiWorkspaceWindow.cs                  </Name>
//    <Description> Okno pracovního prostoru                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.Parsers.Docking;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.FileCommands;
using Gordic.GFE.WinClient.Gui;
using Gordic.WinForms.Controls;
using Gordic.General;
using Gordic.GFE.Parsers.Dom;

namespace Gordic.GFE.WinClient.Base.Gui
{
    /// <summary>
    /// Okno pracovního prostoru
    /// </summary>
    sealed class RdiWorkspaceWindow : DockContent, IWorkspaceWindow
    {
        #region IWorkspaceWindow
        TabControl viewTabControl;
        /// <summary>
        /// pohled na záložky
        /// </summary>
        public TabControl ViewTabControl => viewTabControl;

        /// <summary>
        /// Získání/Nastavení kolekce viditelných pohledů pracovního prostoru
        /// </summary>
        public List<IViewContent> VisibleContents { get; set; }

        /// <summary>
        /// zrušení registrovaného pohledu
        /// </summary>
        /// <param name="content">pohled ke zrušení registrace</param>
        public void UnregisterContent(IViewContent content)
        {
            content.DesktopWindow = null;

            content.TabPageTextChanged -= OnTabPageTextChanged;
            content.TitleNameChanged -= OnTitleNameChanged;
            content.IsDirtyChanged -= OnIsDirtyChanged;
        }
        /// <summary>
        /// uvolnění pohledů
        /// </summary>
        public void ClearContent()
        {
            this.Controls.Clear();
            if (viewTabControl != null)
            {
                foreach (TabPage page in viewTabControl.TabPages)
                    page.Controls.Clear();
                viewTabControl.Dispose();
                viewTabControl = null;
            }
        }

        /// <summary>
        /// aktualizace aktualního pohledu
        /// </summary>
        public void UpdateActiveViewContent()
        {
            UpdateTitle();
            IViewContent newActiveViewContent = this.ActiveViewContent;
            if (oldActiveViewContent != newActiveViewContent && ActiveViewContentChanged != null)
                ActiveViewContentChanged(this, EventArgs.Empty);
            oldActiveViewContent = newActiveViewContent;
        }

        /// <summary>
        /// Validace aktualního pohledu před přepnutím
        /// </summary>
        /// <returns>TRUE - validace proběhla úspěšně jinak FALSE</returns>
        public bool ValidateActiveViewContent() => !(SimpleDesktop.Desktop.ActiveViewContent is IValidatable content) || content.Validate();

        /// <summary>
        /// registrace nového pohledu na obsah
        /// </summary>
        /// <param name="content">Pohled k registraci</param>
        public void RegisterNewContent(IViewContent content)
        {
            Debug.Assert(content.DesktopWindow == null);
            content.DesktopWindow = this;

            content.TabPageTextChanged += OnTabPageTextChanged;
            content.TitleNameChanged += OnTitleNameChanged;
            content.IsDirtyChanged += OnIsDirtyChanged;
        }
        /// <summary>
        /// vytvoření ovladače zobrazení všech obsahů
        /// </summary>
        public void CreateViewTabControl()
        {
            if (viewTabControl == null)
            {
                this.Controls.Clear();

                viewTabControl = new TabControl();
                viewTabControl.GotFocus += delegate
                {
                    if (viewTabControl.SelectedTab.Controls.Count != 0
                        && !viewTabControl.SelectedTab.ContainsFocus)
                        viewTabControl.SelectedTab.Controls[0].Focus();
                };
                viewTabControl.Alignment = TabAlignment.Bottom;
                viewTabControl.Dock = DockStyle.Fill;
                this.Controls.Add(viewTabControl);

                viewTabControl.Selecting += ViewTabControl_Selecting;

                viewTabControl.SelectedIndexChanged += delegate
                {
                    lock (syncRoot)
                        UpdateActiveViewContent();
                };
            }
        }

        private void ViewTabControl_Selecting(object sender, TabControlCancelEventArgs e)
        {
            e.Cancel = !ValidateActiveViewContent();
        }
        #endregion

        #region IDesktopWindow
        /// <summary>
        /// titulek okna.
        /// </summary>
        public string Title
        {
            get => Text;
            set
            {
                Text = value;
                OnTitleChanged(EventArgs.Empty);
            }
        }
        void OnTitleChanged(EventArgs e)
        {
            TitleChanged?.Invoke(this, e);
        }

        /// <summary>
        /// Gets/Sets aktuálně zobrazený v okně obsah
        /// </summary>
        public IViewContent ActiveViewContent
        {
            get
            {
                Debug.Assert(SimpleDesktop.MainForm.InvokeRequired == false);
                if (VisibleContents == null)
                    return null;

                return viewTabControl != null && viewTabControl.SelectedIndex >= 0 && viewTabControl.SelectedIndex < ViewContents.Count
                    ? VisibleContents[viewTabControl.SelectedIndex]
                    : VisibleContents.FirstOrNull(itm => itm.Visible);
            }
            set
            {
                int pos = ViewContents.IndexOf(value);
                if (pos < 0)
                    throw new ArgumentException(GResources.GetResourceText(29450319)); //RC 29450319 : Obsah neexistuje!
                SwitchView(pos);
            }
        }

        /// <summary>
        /// Aktivuje se po změně vlastnosti ActiveViewContent
        /// </summary>
        public event EventHandler ActiveViewContentChanged;

        readonly ViewContentCollection viewContents;
        /// <summary>
        /// Seznam pohledů na obsah daného okna
        /// </summary>
        public IList<IViewContent> ViewContents { get { return viewContents; } }

        /// <summary>
        /// Aktivace pohledu se specifickým indexem
        /// </summary>
        public void SwitchView(int viewNumber)
        {
            if (viewTabControl != null)
            {
                this.viewTabControl.SelectedIndex = viewNumber;
                // nechápu proč nefunguje IndexChange
                lock (syncRoot)
                    UpdateActiveViewContent();
            }
        }

        /// <summary>
        /// Uzavřění okna, pokud force == true uzavře okno bez dotazu, i když obsah byl pozměněn
        /// </summary>
        /// <returns>true, pokud okno je zavřené</returns>
        public bool CloseWindow(bool force)
        {
            bool fileDiscarded = false;
            if (!force && this.IsDirty)
            {
                DialogResult dr = MessageBox.Show(GResources.GetResourceText(29450320), //RC 29450320 : Chcete uložit aktuální změny?
                                                  string.Format(GResources.GetResourceText(29450321) + " '{0}'?", Title), //RC 29450321 : Uložit změny v
                                                  MessageBoxButtons.YesNoCancel, MessageBoxIcon.Question,
                                                  MessageBoxDefaultButton.Button1, 0);
                switch (dr)
                {
                    case DialogResult.Yes:
                        foreach (IViewContent vc in this.ViewContents)
                            while (vc.IsDirty && !vc.PrimaryFile.CancelSaving)
                            {
                                SaveFile.Save(vc);
                                if (vc.IsDirty)
                                {
                                    DialogResult result = GMessageBox.Show(SimpleDesktop.MainForm, GResources.GetResourceText(29450322), GResources.GetResourceText(29450263), GMessageBoxButtons.YesNoCancel, GMessageBoxIcon.Question, GMessageBoxDefaultButton.Button1);  //RC 29450263 : Dotaz
                                                                                                                                                                                                                                                                             //MessageService.ShowCustomDialog(, 0, 1, "ano", "ne", "zrušit");
                                    if (result == System.Windows.Forms.DialogResult.Cancel)
                                        return false;
                                    else if (result == DialogResult.Yes)
                                    {
                                        fileDiscarded = true;
                                        break;
                                    }
                                }
                            }
                        break;
                    case DialogResult.No:
                        fileDiscarded = true;
                        break;
                    case DialogResult.Cancel:
                        return false;
                }
            }

            // Vytvoření seznamu souboru k analýze po zavření okna.
            // Je to nezbytné, protože po zrušení změn,
            // ParserService stále obsahuje informaci o změnách, které nyni jsou neplatné
            string[] filesToReparse;
            if (fileDiscarded)
                filesToReparse = this.ViewContents
                    .SelectMany(vc => vc.Files)
                    .Select(f => f.FileName)
                    .Distinct(StringComparer.OrdinalIgnoreCase)
                    .ToArray();
            else
                filesToReparse = null;

            OnCloseEvent(null);
            Dispose();

            if (filesToReparse != null)
            {
                // K tomu musí dojit po Uvolnění, takže ViewContents
                // jsou zavřené a jejích obsah se již nenachází v ParserService.
                LoggingService.DebugFormatted(string.Join(" ", GResources.GetResourceText(29450323), "\n'{0}'\n", GResources.GetResourceText(29450324)), String.Join(", ", filesToReparse)); //RC 29450324 : se změny neuloží
                foreach (string file in filesToReparse)
                    if (File.Exists(file))
                        //    ParserService.EnqueueForParsing(file);
                        //else
                        // musíme je z cach objektu odstranit
                        ParserService.ClearParseInformation(file);
            }

            return true;
        }
        void OnCloseEvent(EventArgs e)
        {
            OnWindowDeselected(e);
            CloseEvent?.Invoke(this, e);
        }

        /// <summary>
        /// Zobrazení daného okna na popředí a nastavení uživatelského fokusu na toto okno.
        /// </summary>
        public void SelectWindow()
        {
            viewTabControl?.Focus();
            Show();
        }

        /// <summary>
        /// Opětovná inicializace obsahu a překreslení komponenty.
        /// </summary>
        public void RedrawContent() { RefreshTabPageTexts(); }
        void RefreshTabPageTexts()
        {
            if (viewTabControl != null)
                for (int i = 0; i < viewTabControl.TabPages.Count; ++i)
                {
                    TabPage tabPage = viewTabControl.TabPages[i];
                    tabPage.Text = StringParser.Parse(ViewContents[i].TabPageText);
                }
        }

        /// <summary>
        /// Pro vnitřní použití:
        /// Tato metoda se vola pracovní plochou pro zjištění, zda okno je vybrané
        /// </summary>
        public void OnWindowSelected(EventArgs e)
        {
            WindowSelected?.Invoke(this, e);
        }

        /// <summary>
        /// Pouze interně:
        /// Tato metoda volá pracovní stul s tím, že okno bylo uvolněno
        /// </summary>
        /// <param name="e">Argument metody</param>
        public void OnWindowDeselected(EventArgs e)
        {
            WindowDeselected?.Invoke(this, e);
        }

        /// <summary>
        /// Volá se povybrání okna.
        /// </summary>
        public event EventHandler WindowSelected;

        /// <summary>
        /// Volá se po uvolnění okna
        /// </summary>
        public event EventHandler WindowDeselected;

        /// <summary>
        /// Volá se po změně titulku okna.
        /// </summary>
        public event EventHandler TitleChanged;

        /// <summary>
        /// Po zavření okna.
        /// </summary>
        public event EventHandler CloseEvent;
        #endregion

        #region IOwnerState
        /// <summary>
        /// Stavy
        /// </summary>
        [Flags]
        public enum OpenFileTabStates
        {
            Nothing = 0,
            FileDirty = 1,
            FileReadOnly = 2,
            FileUntitled = 4
        }
        /// <summary>
        /// Vnitřní stav
        /// </summary>
        public Enum InternalState
        {
            get
            {
                IViewContent content = this.ActiveViewContent;
                OpenFileTabStates state = OpenFileTabStates.Nothing;
                if (content != null)
                {
                    if (content.IsDirty)
                        state |= OpenFileTabStates.FileDirty;
                    if (content.IsReadOnly)
                        state |= OpenFileTabStates.FileReadOnly;
                    if (content.PrimaryFile != null && content.PrimaryFile.IsUntitled)
                        state |= OpenFileTabStates.FileUntitled;
                }
                return state;
            }
        }
        #endregion

        #region Items
        void OnTabPageTextChanged(object sender, EventArgs e) { RefreshTabPageTexts(); }
        void OnTitleNameChanged(object sender, EventArgs e)
        {
            if (sender == ActiveViewContent)
                UpdateTitle();
        }
        void OnIsDirtyChanged(object sender, EventArgs e) { UpdateTitle(); }
        void UpdateTitle()
        {
            IViewContent content = ActiveViewContent;
            if (content == null && this.ViewContents != null && this.ViewContents.Count > 0)
                // k tomu může dojít, pokud okno není aktivní a 
                // žádná ze záložek není vybraná
                // (viewTabControl.SelectedIndex == -1)
                // ale máme více položek ViewContents.
                content = this.ViewContents[0];

            if (content != null)
            {
                string newTitle = content.TitleName;

                if (this.IsDirty)
                    newTitle += "*";
                else if (content.IsReadOnly)
                    newTitle += "+";

                if (newTitle != Title)
                    Title = newTitle;

                ToolTipText = content.PrimaryFileName;
            }
        }
        object syncRoot = new object();
        #endregion

        #region Override
        /// <exclude/>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                viewContents?.Clear();

                TabPageContextMenu?.Dispose();
                TabPageContextMenu = null;
            }
            base.Dispose(disposing);
        }
        /// <exclude/>
        protected override void OnClosing(System.ComponentModel.CancelEventArgs e)
        {
            e.Cancel = !CloseWindow(false);
        }
        #endregion

        readonly static string contextMenuPath = "/ReportDesigner/Desktop/OpenFileTab/ContextMenu";

        IViewContent oldActiveViewContent;

        /// <summary>
        /// Indikuje, zda alespoň jeden z pohledu má změny od poslední operace SAVE/LOAD.
        /// </summary>
        public bool IsDirty { get { return this.ViewContents.Any(vc => vc.IsDirty); } }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public RdiWorkspaceWindow()
        {
            viewContents = new ViewContentCollection(this);
            this.DockAreas = DockAreas.Document;
            this.DockPadding.All = 2;
            OnTitleNameChanged(this, EventArgs.Empty);

            ContextMenuStrip strip = MenuService.CreateContextMenu(this, new EventArgsContextMenu(contextMenuPath));
            if (strip != null)
                TabPageContextMenuStrip = strip;
        }

        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(RdiWorkspaceWindow));
            this.SuspendLayout();
            // 
            // RdiWorkspaceWindow
            // 
            resources.ApplyResources(this, "$this");
            this.Name = "RdiWorkspaceWindow";
            this.ResumeLayout(false);
        }
    }
}

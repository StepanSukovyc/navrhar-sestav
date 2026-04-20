//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.StartPane.cs                           </Name>
//    <Description> Obsah startovacího okna                                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;
using System.IO;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.FileCommands;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Project.Commands;
using Gordic.WinForms.Controls;
using Gordic.General;
using Gordic.GFE.Parsers.Binding;

namespace Gordic.GFE.WinClient.StartPage
{
    /// <summary>
    /// Obsah startovacího okna
    /// </summary>
    class StartViewPane : UserControl
    {
        const string addInRecentOpenContextMenu = "/ReportDesigner/StartTab/RecentOpen/ContextMenu";

        private GGroupBox gGroupBox3;
        private System.ComponentModel.IContainer components;
        GToolTip gToolTip;
        static StartViewPane instance;

        /// <summary>
        /// Instance startovací stránky
        /// </summary>
        public static StartViewPane Instance { get { return instance; } }

        /// <summary>
        /// Obsluha události zavření stránky
        /// </summary>
        public event EventHandler Closed;

        /// <summary>
        /// Zavření ViewContent obsahující dané podokno.
        /// </summary>
        public void Close()
        {
            Closed?.Invoke(this, EventArgs.Empty);
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public StartViewPane()
        {
            instance = this;
            Dock = DockStyle.Fill;
            BackColor = SystemColors.ControlDark;
            InitializeComponent();
            RefreshRecentOpen();
        }

        /// <summary>
        /// //Zobrazení seznamu naposledy otevřených souborů
        /// </summary>
        internal void RefreshRecentOpen()
        {
            Point _location = new Point(4, 15);
            int _controlsHeight = 0;

            #region sestavy
            gGroupBox3.Controls.Clear();
            LoggingService.Info(GResources.GetResourceText(29450249)); //RC 29450249 : nastavení konfigurovaného počtu naposledy otevřených souborů
            for (int _index = 0; _index < Gordic.GFE.WinClient.Services.FileAgent.RecentOpen.RecentFileOrProject.Count; _index++)
            {
                RecentOpenFile file = Gordic.GFE.WinClient.Services.FileAgent.RecentOpen.RecentFileOrProject[_index];

                GLinkLabel _link = new GLinkLabel();

                ContextMenuStrip strip = MenuService.CreateContextMenu(_link, new Parsers.EventArgsContextMenu(addInRecentOpenContextMenu));
                if (strip != null)
                    _link.ContextMenuStrip = strip;

                _link.Location = _location;
                _link.Height = 17;
                _link.Anchor = AnchorStyles.Left | AnchorStyles.Right | AnchorStyles.Top;
                _link.Width = gGroupBox3.Width - 10;
                string toolTip;
                switch (file.Type)
                {
                    case RecentOpenFileType.project:
                        _link.LinkColor = Color.Green;
                        _link.Click += new EventHandler(LoadSolution.OnOpen);
                        _link.PreviewKeyDown += new PreviewKeyDownEventHandler((sender, pe) =>
                                                    {
                                                        if (pe.KeyValue == 13)
                                                            LoadSolution.OnOpen(sender, new EventArgs());
                                                    });
                        toolTip = string.Format(GResources.GetResourceText(29450250) + "\n{0}", file.Path); //RC 29450250 : projekt
                        break;
                    case RecentOpenFileType.database:
                        //_link.LinkColor = Color.Red;
                        toolTip = string.Format(GResources.GetResourceText(29450251) + "\nalv: {0}\nfrm: {1}", file.IXSALV, file.IXSFRM); //RC 29450251 : databázový soubor
                        _link.Click += new EventHandler(OpenFileDb.OnOpen);
                        _link.PreviewKeyDown += new PreviewKeyDownEventHandler((sender, pe) =>
                                                    {
                                                        if (pe.KeyValue == 13)
                                                            OpenFileDb.OnOpen(sender, new EventArgs());
                                                    });
                        break;
                    default:
                        _link.Click += new EventHandler(OpenFile.OnOpen);
                        _link.PreviewKeyDown += new PreviewKeyDownEventHandler((sender, pe) =>
                                                    {
                                                        if (pe.KeyValue == 13)
                                                            OpenFile.OnOpen(sender, new EventArgs());
                                                    });
                        toolTip = string.Format("{0}\n{1}", !string.IsNullOrEmpty(file.Formation) ? GResources.GetResourceText(29450252) : GResources.GetResourceText(29450253), file.Path); //RC 29450253 : soubor
                        break;
                }
                _link.Tag = file;
                if (!string.IsNullOrEmpty(file.Formation))
                    toolTip = string.Format("{0}\n" + GResources.GetResourceText(29450254) + " {1}", toolTip, file.Formation); //RC 29450254 : formát souboru

                gToolTip.SetToolTip(_link, toolTip);

                if (file.IsDatabaseFile)
                    _link.Text = file.DisplayName;
                else
                    _link.Text = GetTextByWidth(file.Path, gGroupBox3.Width - 25, _link);

                if (!string.IsNullOrEmpty(_link.Text))
                {
                    _location = new Point(_location.X, _location.Y + _link.Height);
                    _controlsHeight = _location.Y + _link.Height;
                    this.gGroupBox3.Controls.Add(_link);
                }

                if (this.gGroupBox3.Controls.Count == ReportDesignerProperties.Instance.RecentOpenMaxCount)
                    break;
            }

            LoggingService.Info(GResources.GetResourceText(29450255)); //RC 29450255 : aktualizace seznamu naposledy otevřených souborů/sestavení

            if (_controlsHeight > 0 && this.gGroupBox3.Height != _controlsHeight)
                this.Height = _controlsHeight + this.gGroupBox3.Top;
            #endregion
        }
        /// <summary>
        /// Zpracuje text dle šířky a písma tak, aby bylo vidět název souboru
        /// </summary>
        /// <param name="p_text">Text</param>
        /// <param name="p_width">Šířka</param>
        /// <param name="p_link">Štítek</param>
        /// <returns></returns>
        string GetTextByWidth(string p_text, int p_width, GLinkLabel p_link)
        {
            if (!File.Exists(p_text))
                return null;
            FileInfo _fi = new FileInfo(p_text);
            p_link.Text = p_text;
            Graphics _graphics = p_link.CreateGraphics();
            if (_graphics.MeasureString(p_link.Text, p_link.Font).Width > p_width)
            {
                string _directory = _fi.FullName.Substring(0, _fi.FullName.Length - _fi.Name.Length),
                    _prefix = _directory[_directory.Length - 1].ToString();

                _directory = _directory.Remove(_directory.Length - 1);
                p_link.Text = "..." + _prefix + _fi.Name;
                while (_graphics.MeasureString(p_link.Text, p_link.Font).Width <= p_width)
                {
                    _prefix = _directory[_directory.Length - 1] + _prefix;
                    _directory = _directory.Remove(_directory.Length - 1);
                    p_link.Text = "..." + _prefix + _fi.Name;
                }

                if (_directory.Length > 3)
                    return _directory.Substring(0, 3) + p_link.Text;
                else return _directory + p_link.Text.TrimStart('.');
            }
            return p_text;
        }

        void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(StartViewPane));
            this.gGroupBox3 = new Gordic.WinForms.Controls.GGroupBox();
            this.gToolTip = new Gordic.WinForms.Controls.GToolTip(this.components);
            this.SuspendLayout();
            // 
            // gGroupBox3
            // 
            this.gGroupBox3.BackColor = System.Drawing.SystemColors.ButtonShadow;
            resources.ApplyResources(this.gGroupBox3, "gGroupBox3");
            this.gGroupBox3.FlatStyle = System.Windows.Forms.FlatStyle.System;
            this.gGroupBox3.Name = "gGroupBox3";
            this.gGroupBox3.Label = GResources.GetResourceText(29451522); //RC 29451522 : naposledy otevřené soubory
            this.gGroupBox3.TabStop = false;
            // 
            // StartViewPane
            // 
            this.BackColor = System.Drawing.SystemColors.ButtonShadow;
            this.Controls.Add(this.gGroupBox3);
            this.Name = "StartViewPane";
            resources.ApplyResources(this, "$this");
            this.ResumeLayout(false);

        }

    }

    /// <summary>
    /// Podokno startovácí stránky
    /// </summary>
    class StartPane : DefaultAbstractViewContent
    {
        #region AbstractViewContent
        /// <summary>
        /// Je Windows.Forms ovladač pro dané zobrazení.
        /// </summary>
        public override object Control { get { return startViewPane; } }

        /// <summary>
        /// Provedé se před přepnutím ze starého zobrazení na dané.
        /// </summary>
        /// <param name="file">Primární soubor zobrazení</param>
        /// <param name="oldView">Zobrazení, ze kterého se přepínáme.</param>
        public override void SwitchToThisWithoutSaveLoad(OpenedFile file, IViewContent oldView)
        {
            base.SwitchToThisWithoutSaveLoad(file, oldView);
            StartViewPane.RefreshRecentOpen();
        }
        #endregion

        StartViewPane startViewPane;
        /// <summary>
        /// Ovladač obsahu startovací stránky
        /// </summary>
        public StartViewPane StartViewPane { get { return startViewPane; } }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public StartPane() { }

        /// <summary>
        /// Inicializace objektu
        /// </summary>
        public override IViewContent Initialize()
        {
            base.Initialize();
            startViewPane = new StartViewPane();
            startViewPane.Closed += PaneClosed;
            Services.FileAgent.RecentOpen.RecentFileChanged += RecentOpen_RecentFileChanged;
            Services.FileAgent.RecentOpen.RecentProjectChanged += RecentOpen_RecentFileChanged;
            TitleName = GResources.GetResourceText(29450256); //RC 29450256 : startovací stránka
            return this;
        }
        void RecentOpen_RecentFileChanged(object sender, EventArgs e)
        {
            StartViewPane.RefreshRecentOpen();
        }

        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje uvolnění objektu</param>
        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);

            if (disposing)
            {
                if (startViewPane != null)
                    startViewPane.Dispose();
                Services.FileAgent.RecentOpen.RecentFileChanged -= RecentOpen_RecentFileChanged;
            }
        }

        void PaneClosed(object sender, EventArgs e)
        {
            DesktopWindow.CloseWindow(true);
        }
    }
}

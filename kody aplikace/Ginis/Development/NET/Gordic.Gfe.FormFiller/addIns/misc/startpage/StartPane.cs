//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.StartPane.cs                          </Name>
//    <Description> Obsah startovacího okna                                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;
using System.IO;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.Gfe.FormFiller.FileCommands;
using Gordic.Gfe.FormFiller.Gui;
using Gordic.WinForms.Controls;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Utils;
using Gordic.General;

namespace Gordic.Gfe.FormFiller.StartPage
{
    /// <summary>
    /// Obsah startovacího okna
    /// </summary>
    class StartViewPane : UserControl
    {
        const string addInRecentOpenContextMenu = "/FormFiller/StartTab/RecentOpen/ContextMenu";

        private GGroupBox gGroupBox3;
        private System.ComponentModel.IContainer components;
        GToolTip gToolTip;

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
            gGroupBox3.Controls.Clear();

            _location = new Point(4, 15);

            _controlsHeight = 0;
            LoggingService.Info(GResources.GetResourceText(29450008)); //RC 29450008 : Zobrazíme potřebný počet naposledy otevřených souborů.
            for (int _index = 0; _index < FileAgent.RecentOpen.RecentFileOrProject.Count; _index++)
            {
                LoggingService.Info(GResources.GetResourceText(29450009)); //RC 29450009 : Zafixujeme položku naposledy otevřeného souboru.
                RecentOpenFile file = FileAgent.RecentOpen.RecentFileOrProject[_index];

                GLinkLabel _link = new GLinkLabel();

                ContextMenuStrip strip = MenuService.CreateContextMenu(_link, new GFE.Parsers.EventArgsContextMenu(addInRecentOpenContextMenu));
                if (strip != null)
                    _link.ContextMenuStrip = strip;

                _link.Location = _location;
                _link.Height = 17;
                _link.Anchor = AnchorStyles.Left | AnchorStyles.Right | AnchorStyles.Top;
                _link.Width = gGroupBox3.Width - 10;

                _link.Tag = file;

                _link.Text = GetTextByWidth(file.Path, gGroupBox3.Width - 25, _link);
                _link.Click += new EventHandler(OpenFile.OnOpen);
                _link.PreviewKeyDown += new PreviewKeyDownEventHandler((sender, pe) =>
                {
                    if (pe.KeyValue == 13)
                        OpenFile.OnOpen(sender, new EventArgs());
                });

                if (!string.IsNullOrEmpty(_link.Text))
                {
                    _location = new Point(_location.X, _location.Y + _link.Height);
                    _controlsHeight = _location.Y + _link.Height;
                    this.gGroupBox3.Controls.Add(_link);
                }
                if (this.gGroupBox3.Controls.Count == FormFillerProperties.Instance.RecentOpenMaxCount)
                    break;
            }

            LoggingService.Info(GResources.GetResourceText(29450010)); //RC 29450010 : pokud se všechny naposledy otevřené soubory nevlezou do seznámu, pak ho roztahneme
            if (_controlsHeight > 0 && this.gGroupBox3.Height != _controlsHeight)
                this.Height = _controlsHeight + this.gGroupBox3.Top;
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

        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(StartViewPane));
            this.gGroupBox3 = new Gordic.WinForms.Controls.GGroupBox();
            this.gToolTip = new Gordic.WinForms.Controls.GToolTip(this.components);
            this.SuspendLayout();
            // 
            // gGroupBox3
            // 
            resources.ApplyResources(this.gGroupBox3, "gGroupBox3");
            this.gGroupBox3.BackColor = System.Drawing.SystemColors.ButtonShadow;
            this.gGroupBox3.FlatStyle = System.Windows.Forms.FlatStyle.System;
            this.gGroupBox3.Name = "gGroupBox3";
            this.gGroupBox3.TabStop = false;
            this.gGroupBox3.Dock = DockStyle.Fill;
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
        public StartPane()
        {
            startViewPane = new StartViewPane();
            startViewPane.Closed += PaneClosed;
            FileAgent.RecentOpen.RecentFileChanged += RecentOpen_RecentFileChanged;
            FileAgent.RecentOpen.RecentProjectChanged += RecentOpen_RecentFileChanged;
            TitleName = GResources.GetResourceText(29450011); //RC 29450011 : startovácí stránka
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

                FileAgent.RecentOpen.RecentFileChanged -= RecentOpen_RecentFileChanged;
            }
        }

        void PaneClosed(object sender, EventArgs e)
        {
            DesktopWindow.CloseWindow(true);
        }
    }


}

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DockContent.cs                         </Name>
//    <Description> Dokovátelný obsah                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2013                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using System.Drawing;
using System.Windows.Forms;
using System.Runtime.InteropServices;
using System.Diagnostics.CodeAnalysis;

namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Dokovátelný obsah
    /// </summary>
	public class DockContent : Form, IDockContent
	{
        static readonly object DockStateChangedEvent = new object();
        /// <summary>
        /// Seznam reakcí na zmìnu dokovacího stavu
        /// </summary>
        [LocalizedCategory("Vlastnost pozmìnìná")]
        [LocalizedDescription("Pane_DockStateChanged_Description")]
        public event EventHandler DockStateChanged
        {
            add { Events.AddHandler(DockStateChangedEvent, value); }
            remove { Events.RemoveHandler(DockStateChangedEvent, value); }
        }

		DockContentHandler m_dockHandler = null;
        /// <summary>
        /// Manipulátor pro práci s dokovatelným obsahem
        /// </summary>
        [Browsable(false)]
        public DockContentHandler DockHandler { get { return m_dockHandler; } }

        /// <summary>
        /// Indikuje, zda uživatel mùže dokovát obsah
        /// </summary>
		[LocalizedCategory("Dokování")]
        [LocalizedDescription("Urèuje, zda pro koncového uživatele je funkce drag'n'drop dokovacích oken povolená")]
		[DefaultValue(true)]
		public bool AllowEndUserDocking
		{
			get	{	return DockHandler.AllowEndUserDocking;	}
			set	{	DockHandler.AllowEndUserDocking = value;	}
		}

        /// <summary>
        /// Možné oblasti pro dokování
        /// </summary>
		[LocalizedCategory("Dokování")]
        [LocalizedDescription("Získá nebo nastaví hodnotu oznaèující, ve které oblasti DockPanel je povoleno zobrazení obsahu.")]
		[DefaultValue(DockAreas.DockLeft|DockAreas.DockRight|DockAreas.DockTop|DockAreas.DockBottom|DockAreas.Document|DockAreas.Float)]
		public DockAreas DockAreas
		{
			get	{	return DockHandler.DockAreas;	}
			set	{	DockHandler.DockAreas = value;	}
		}

        /// <summary>
        /// Viditelná èást skrytého obsahu
        /// </summary>
		[LocalizedCategory("Dokování")]
        [LocalizedDescription("Zobrazovaná velikost obsahu v režimu automatického skrývání. Hodnota &lt; 1 urèuje velikost v procentech; hodnota &gt; 1 urèuje velikost v pixelech.")]
		[DefaultValue(0.25)]
		public double AutoHidePortion
		{
			get	{	return DockHandler.AutoHidePortion;	}
			set	{	DockHandler.AutoHidePortion = value;	}
		}

        /// <summary>
        /// Text záložky
        /// </summary>
		[Localizable(true)]
		[LocalizedCategory("Dokování")]
        [LocalizedDescription("Text záložky dokovacího podokna. Pokud text není nastaven, bude použito vlastnosti Text.")]
		[DefaultValue(null)]
		public string TabText
		{
			get	{	return DockHandler.TabText;	}
			set	{	DockHandler.TabText = value;	}
		}

        /// <summary>
        /// Tlaèítko zavøení záložky
        /// </summary>
		[LocalizedCategory("Dokování")]
        [LocalizedDescription("Povolit/Zakázat tlaèítko 'zavøít obsah'.")]
		[DefaultValue(true)]
		public bool CloseButton
		{
			get	{	return DockHandler.CloseButton;	}
			set	{	DockHandler.CloseButton = value;	}
		}
		
        /// <summary>
        /// Dokovací panel daného obsahu
        /// </summary>
		[Browsable(false)]
		public DockPanel DockPanel
		{
			get {	return DockHandler.DockPanel; }
			set	{	DockHandler.DockPanel = value;	}
		}

        /// <summary>
        /// Status dokování
        /// </summary>
		[Browsable(false)]
		public DockState DockState
		{
			get	{	return DockHandler.DockState;	}
			set	{	DockHandler.DockState = value;	}
		}

        /// <summary>
        /// Podokno daného obsahu
        /// </summary>
		[Browsable(false)]
		public DockPane Pane
		{
			get {	return DockHandler.Pane; }
			set	{	DockHandler.Pane = value;		}
		}

        /// <summary>
        /// Indikuje skrýtost objektu
        /// </summary>
		[Browsable(false)]
		public bool IsHidden
		{
			get	{	return DockHandler.IsHidden;	}
			set	{	DockHandler.IsHidden = value;	}
		}

        /// <summary>
        /// Status viditelnosti
        /// </summary>
		[Browsable(false)]
		public DockState VisibleState
		{
			get	{	return DockHandler.VisibleState;	}
			set	{	DockHandler.VisibleState = value;	}
		}

        /// <summary>
        /// Indikuje stav, kdy daný objekt je v plovoucím oknì
        /// </summary>
		[Browsable(false)]
		public bool IsFloat
		{
			get	{	return DockHandler.IsFloat;	}
			set	{	DockHandler.IsFloat = value;	}
		}

        /// <summary>
        /// Podokno panelu
        /// </summary>
		[Browsable(false)]
		public DockPane PanelPane
		{
			get	{	return DockHandler.PanelPane;	}
			set	{	DockHandler.PanelPane = value;	}
		}

        /// <summary>
        /// Plovoucí podokno
        /// </summary>
		[Browsable(false)]
		public DockPane FloatPane
		{
			get	{	return DockHandler.FloatPane;	}
			set	{	DockHandler.FloatPane = value;	}
		}

        /// <summary>
        /// Indikuje skrýti objektu pøi zavøení
        /// </summary>
		[LocalizedCategory("Dokování")]
        [LocalizedDescription("Indikuje, že obsah bude skrýt místo uzavøen.")]
		[DefaultValue(false)]
		public bool HideOnClose
		{
			get	{	return DockHandler.HideOnClose;	}
			set	{	DockHandler.HideOnClose = value;	}
		}

        /// <summary>
        /// Zobrazení skrýtéh oobjektu
        /// </summary>
		[LocalizedCategory("Dokování")]
        [LocalizedDescription("Požadovaný stav pøichycení, když první je zobrazen.")]
		[DefaultValue(DockState.Unknown)]
		public DockState ShowHint
		{
			get	{	return DockHandler.ShowHint;	}
			set	{	DockHandler.ShowHint = value;	}
		}

        /// <summary>
        /// Indikuje stav, kdy objekt je aktivován
        /// </summary>
        [Browsable(false)]
        public bool IsActivated { get { return DockHandler.IsActivated; } }

        /// <summary>
        /// Kontextové menu záložky
        /// </summary>
		[LocalizedCategory("Dokování")]
        [LocalizedDescription("Kontextové menu lišty dokovacího okna.")]
		[DefaultValue(null)]
		public ContextMenu TabPageContextMenu
		{
			get	{	return DockHandler.TabPageContextMenu;	}
			set	{	DockHandler.TabPageContextMenu = value;	}
		}

        /// <summary>
        /// Pruh kontextového menu záložky
        /// </summary>
        [LocalizedCategory("Dokování")]
        [LocalizedDescription("DockContent_TabPageContextMenuStrip_Description")]
        [DefaultValue(null)]
        public ContextMenuStrip TabPageContextMenuStrip
        {
            get { return DockHandler.TabPageContextMenuStrip; }
            set { DockHandler.TabPageContextMenuStrip = value; }
        }

        /// <summary>
        /// Nápovìda
        /// </summary>
		[Localizable(true)]
		[Category("Appearance")]
        [LocalizedDescription("Text, který se zobrazí pøi posunu myši nad kartou.")]
		[DefaultValue(null)]
		public string ToolTipText
		{
			get	{	return DockHandler.ToolTipText;	}
			set {	DockHandler.ToolTipText = value;	}
		}

        /// <summary>
        /// Vytvoøení nové instance tøídy
        /// </summary>
        public DockContent()
        {
            m_dockHandler = new DockContentHandler(this, new GetPersistStringCallback(GetPersistString));
            m_dockHandler.DockStateChanged += new EventHandler(DockHandler_DockStateChanged);
        }

        /// <summary>
        /// Aktivace dokovatelného obsahu
        /// </summary>
        public new void Activate() { DockHandler.Activate(); }
        /// <summary>
        /// Skrýtí dokovatelného obsahu
        /// </summary>
        public new void Hide() { DockHandler.Hide(); }
        /// <summary>
        /// Zobrazení dokovatelného obsahu
        /// </summary>
        public new void Show() { DockHandler.Show(); }

        /// <summary>
        /// Zobrazení dokovatelného okna na dokovatelném panelu
        /// </summary>
        /// <param name="dockPanel">Daný panel</param>
        public void Show(DockPanel dockPanel) { DockHandler.Show(dockPanel); }
        /// <summary>
        /// Zobrazení dokovatelného obsahu v dokovatelném panelu urèitého stavu
        /// </summary>
        /// <param name="dockPanel">Dokovatelný panel</param>
        /// <param name="dockState">Stav</param>
        public void Show(DockPanel dockPanel, DockState dockState) { DockHandler.Show(dockPanel, dockState); }
        /// <summary>
        /// Zobrazení obsahu v dokovatelném panelu v urèitém obdélníku
        /// </summary>
        /// <param name="dockPanel">Dokovací panel</param>
        /// <param name="floatWindowBounds">Obdelník pro zobrazení</param>
        [SuppressMessage("Microsoft.Naming", "CA1720:AvoidTypeNamesInParameters")]
        public void Show(DockPanel dockPanel, Rectangle floatWindowBounds) { DockHandler.Show(dockPanel, floatWindowBounds); }
        /// <summary>
        /// Zobrazení obsahu v podoknì
        /// </summary>
        /// <param name="pane">Podokno pro obsah</param>
        /// <param name="beforeContent"></param>
        public void Show(DockPane pane, IDockContent beforeContent) { DockHandler.Show(pane, beforeContent); }
        /// <summary>
        /// Zobrazení obshau v novém podoknì
        /// </summary>
        /// <param name="previousPane">Pøedchozí podokno</param>
        /// <param name="alignment"></param>
        /// <param name="proportion"></param>
		public void Show(DockPane previousPane, DockAlignment alignment, double proportion)
		{
			DockHandler.Show(previousPane, alignment, proportion);
		}
        /// <summary>
        /// Plovoucí okno v obdélníku
        /// </summary>
        /// <param name="floatWindowBounds">Obdélník plovoucího okna</param>
        [SuppressMessage("Microsoft.Naming", "CA1720:AvoidTypeNamesInParameters")]
        public void FloatAt(Rectangle floatWindowBounds) { DockHandler.FloatAt(floatWindowBounds); }
        /// <summary>
        /// Dokování obsahu do podokna
        /// </summary>
        /// <param name="paneTo">Podokno pro dokování obsahu</param>
        /// <param name="dockStyle">Styl dokování</param>
        /// <param name="contentIndex">Index obsahu</param>
        public void DockTo(DockPane paneTo, DockStyle dockStyle, int contentIndex)
        {
            DockHandler.DockTo(paneTo, dockStyle, contentIndex);
        }
        /// <summary>
        /// Dokování obsahu do panelu
        /// </summary>
        /// <param name="panel">Panel pro obsah</param>
        /// <param name="dockStyle">Styl dokování</param>
        public void DockTo(DockPanel panel, DockStyle dockStyle)
        {
            DockHandler.DockTo(panel, dockStyle);
        }

        /// <summary>
        /// Indikuje právost stavu dokovatelbého obsahu
        /// </summary>
        /// <param name="dockState"></param>
        /// <returns></returns>
        public bool IsDockStateValid(DockState dockState) { return DockHandler.IsDockStateValid(dockState); }
        
        /// <exclude/>
        [SuppressMessage("Microsoft.Design", "CA1024:UsePropertiesWhereAppropriate")]
        protected virtual string GetPersistString() { return GetType().ToString(); }
        /// <summary>
        /// Reace na zmìnu dokovacího stavu
        /// </summary>
        /// <param name="e"></param>
        protected virtual void OnDockStateChanged(EventArgs e)
        {
            EventHandler handler = (EventHandler)Events[DockStateChangedEvent];
            if (handler != null)
                handler(this, e);
        }

        bool ShouldSerializeTabText() { return (DockHandler.TabText != null); }

        void DockHandler_DockStateChanged(object sender, EventArgs e) { OnDockStateChanged(e); }

        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(DockContent));
            this.SuspendLayout();
            // 
            // DockContent
            // 
            resources.ApplyResources(this, "$this");
            this.Name = "DockContent";
            this.ResumeLayout(false);

        }
	}
}

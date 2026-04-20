//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DockContentHandler.cs                  </Name>
//    <Description> Manipulátor pro práci s dokovatelným obsahem                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using System.Drawing;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;
using Gordic.General;

namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// delegát pro zjištìní pøetrvávajícího øetìzce
    /// </summary>
    /// <returns></returns>
    public delegate string GetPersistStringCallback();

    /// <summary>
    /// Manipulátor pro práci s dokovatelným obsahem
    /// </summary>
	public class DockContentHandler : IDisposable, IDockDragSource
	{     
		private readonly Form m_form;
        /// <summary>
        /// Formuláø s obsahem
        /// </summary>
        public Form Form { get { return m_form; } }
        /// <summary>
        /// Obsah
        /// </summary>
        public IDockContent Content { get { return Form as IDockContent; } }

        private IDockContent m_previousActive = null;
        /// <summary>
        /// Pøedchozí aktivní obsah
        /// </summary>
        public IDockContent PreviousActive
        {
            get { return m_previousActive; }
            internal set { m_previousActive = value; }
        }

        private IDockContent m_nextActive = null;
        /// <summary>
        /// Následující aktivní obsah
        /// </summary>
        public IDockContent NextActive
        {
            get { return m_nextActive; }
            internal set { m_nextActive = value; }
        }

		private EventHandlerList m_events;
        private EventHandlerList Events { get { return m_events; } }

		private bool m_allowEndUserDocking = true;
		/// <summary>
		/// Indikuje možnost uživatelem dokovát okna
		/// </summary>
        public bool AllowEndUserDocking
		{
			get	{	return m_allowEndUserDocking;	}
			set	{	m_allowEndUserDocking = value;	}
		}

		private double m_autoHidePortion = 0.25;
        /// <summary>
        /// Velikost skrýtého objektu
        /// </summary>
		public double AutoHidePortion
		{
            get { return m_autoHidePortion; }
			set
			{
				if (value <= 0)
                    throw (new ArgumentOutOfRangeException(GResources.GetResourceText(29450042) + Convert.ToString(value) + GResources.GetResourceText(29450036))); //RC 29450036 :  je mimo rozsah!

				if (m_autoHidePortion == value)
					return;

				m_autoHidePortion = value;

				if (DockPanel == null)
					return;

				if (DockPanel.ActiveAutoHideContent == Content)
					DockPanel.PerformLayout();
			}
		}

		private bool m_closeButton = true;
        /// <summary>
        /// Tlaèítko pro zavøení obsahu
        /// </summary>
		public bool CloseButton
		{
            get { return m_closeButton; }
			set
			{
				if (m_closeButton == value)
					return;

				m_closeButton = value;
				if (Pane != null)
					if (Pane.ActiveContent.DockHandler == this)
						Pane.RefreshChanges();
			}
		}
		
		private DockState DefaultDockState
		{
			get
			{
				if (ShowHint != DockState.Unknown && ShowHint != DockState.Hidden)
					return ShowHint;

				if ((DockAreas & DockAreas.Document) != 0)
					return DockState.Document;
				if ((DockAreas & DockAreas.DockRight) != 0)
					return DockState.DockRight;
				if ((DockAreas & DockAreas.DockLeft) != 0)
					return DockState.DockLeft;
				if ((DockAreas & DockAreas.DockBottom) != 0)
					return DockState.DockBottom;
				if ((DockAreas & DockAreas.DockTop) != 0)
					return DockState.DockTop;

				return DockState.Unknown;
			}
		}

		private DockState DefaultShowState
		{
			get
			{
				if (ShowHint != DockState.Unknown)
					return ShowHint;

				if ((DockAreas & DockAreas.Document) != 0)
					return DockState.Document;
				if ((DockAreas & DockAreas.DockRight) != 0)
					return DockState.DockRight;
				if ((DockAreas & DockAreas.DockLeft) != 0)
					return DockState.DockLeft;
				if ((DockAreas & DockAreas.DockBottom) != 0)
					return DockState.DockBottom;
				if ((DockAreas & DockAreas.DockTop) != 0)
					return DockState.DockTop;
				if ((DockAreas & DockAreas.Float) != 0)
					return DockState.Float;

				return DockState.Unknown;
			}
		}

		private DockAreas m_allowedAreas = DockAreas.DockLeft | DockAreas.DockRight | DockAreas.DockTop | DockAreas.DockBottom | DockAreas.Document | DockAreas.Float;
        /// <summary>
        /// Plochy pro dokování
        /// </summary>
		public DockAreas DockAreas
		{
			get	{	return m_allowedAreas;	}
			set
			{
				if (m_allowedAreas == value)
					return;

				if (!DockHelper.IsDockStateValid(DockState, value))
                    throw (new InvalidOperationException(GResources.GetResourceText(29450049) + '\n' + GResources.GetResourceText(29450044))); //RC 29450044 : hodnota DockAreas v rozporu s aktuálním DockState!

				m_allowedAreas = value;

				if (!DockHelper.IsDockStateValid(ShowHint, m_allowedAreas))
					ShowHint = DockState.Unknown;
			}
		}

		private DockState m_dockState = DockState.Unknown;
        /// <summary>
        /// Stav dokování
        /// </summary>
		public DockState DockState
		{
			get	{	return m_dockState;	}
			set
			{
				if (m_dockState == value)
					return;

                DockPanel.SuspendLayout(true);

				if (value == DockState.Hidden)
					IsHidden = true;
				else
					SetDockState(false, value, Pane);

                DockPanel.ResumeLayout(true, true);
			}
		}

		private DockPanel m_dockPanel = null;
        /// <summary>
        /// Dokovaný panel pro obsah
        /// </summary>
		public DockPanel DockPanel
		{
			get { return m_dockPanel; }
			set
			{
				if (m_dockPanel == value)
					return;

				Pane = null;

				if (m_dockPanel != null)
					m_dockPanel.RemoveContent(Content);

				if (m_tab != null)
				{
					m_tab.Dispose();
					m_tab = null;
				}

				if (m_autoHideTab != null)
				{
					m_autoHideTab.Dispose();
					m_autoHideTab = null;
				}

				m_dockPanel = value;

				if (m_dockPanel != null)
				{
					m_dockPanel.AddContent(Content);
					Form.TopLevel = false;
					Form.FormBorderStyle = FormBorderStyle.None;
					Form.ShowInTaskbar = false;
                    Form.WindowState = FormWindowState.Normal;
                    Gordic.GFE.Parsers.Utils.NativeMethods.SetWindowPos(Form.Handle, IntPtr.Zero, 0, 0, 0, 0,
						FlagsSetWindowPos.SWP_NOACTIVATE |
						FlagsSetWindowPos.SWP_NOMOVE |
						FlagsSetWindowPos.SWP_NOSIZE |
						FlagsSetWindowPos.SWP_NOZORDER |
						FlagsSetWindowPos.SWP_NOOWNERZORDER |
						FlagsSetWindowPos.SWP_FRAMECHANGED);
				}
			}
		}
        /// <summary>
        /// Ikonka obsahu
        /// </summary>
        public Icon Icon { get { return Form.Icon; } }
        /// <summary>
        /// Podokno obsahu
        /// </summary>
		public DockPane Pane
		{
			get {	return IsFloat ? FloatPane : PanelPane; }
			set
			{
				if (Pane == value)
					return;

                DockPanel.SuspendLayout(true);

				DockPane oldPane = Pane;

				SuspendSetDockState();
				FloatPane = (value == null ? null : (value.IsFloat ? value : FloatPane));
				PanelPane = (value == null ? null : (value.IsFloat ? PanelPane : value));
				ResumeSetDockState(IsHidden, value != null ? value.DockState : DockState.Unknown, oldPane);

                DockPanel.ResumeLayout(true, true);
			}
		}

		private bool m_isHidden = true;
        /// <summary>
        /// Indikuje viditelnost obsahu
        /// </summary>
		public bool IsHidden
		{
			get	{	return m_isHidden;	}
			set
			{
				if (m_isHidden == value)
					return;

				SetDockState(value, VisibleState, Pane);
			}
		}

		private string m_tabText = null;
        /// <summary>
        /// Text záložky okna
        /// </summary>
		public string TabText
		{
			get	{	return m_tabText ?? Form.Text;	}
			set
			{
				if (m_tabText == value)
					return;

				m_tabText = value;
				if (Pane != null)
					Pane.RefreshChanges();
			}
		}

		private DockState m_visibleState = DockState.Unknown;
        /// <summary>
        /// Stav viditelnosti
        /// </summary>
		public DockState VisibleState
		{
			get	{	return m_visibleState;	}
			set
			{
				if (m_visibleState == value)
					return;

				SetDockState(IsHidden, value, Pane);
			}
		}

		private bool m_isFloat = false;
        /// <summary>
        /// Indikuje plovouci obsah
        /// </summary>
		public bool IsFloat
		{
			get	{	return m_isFloat;	}
			set
			{
				if (m_isFloat == value)
					return;

                DockState visibleState = CheckDockState(value);

				if (visibleState == DockState.Unknown)
                    throw new InvalidOperationException(GResources.GetResourceText(29450049) + '\n' + GResources.GetResourceText(29450043)); //RC 29450043 : je v rozporu s vlastnosti DockableAreas!

				SetDockState(IsHidden, visibleState, Pane);
			}
		}

        /// <summary>
        /// Nastavení stavu dokování
        /// </summary>
        /// <param name="isFloat">Indikuje plovouci obsah</param>
        /// <returns></returns>
        [SuppressMessage("Microsoft.Naming", "CA1720:AvoidTypeNamesInParameters")]
        public DockState CheckDockState(bool isFloat)
        {
            DockState dockState;

            if (isFloat)
            {
                if (!IsDockStateValid(DockState.Float))
                    dockState = DockState.Unknown;
                else
                    dockState = DockState.Float;
            }
            else
            {
                dockState = (PanelPane != null) ? PanelPane.DockState : DefaultDockState;
                if (dockState != DockState.Unknown && !IsDockStateValid(dockState))
                    dockState = DockState.Unknown;
            }

            return dockState;
        }

		private DockPane m_panelPane = null;
        /// <summary>
        /// Panel podokna
        /// </summary>
		public DockPane PanelPane
		{
			get	{	return m_panelPane;	}
			set
			{
				if (m_panelPane == value)
					return;

				if (value != null)
					if (value.IsFloat || value.DockPanel != DockPanel)
                        throw new InvalidOperationException(GResources.GetResourceText(29450045) + '\n' + GResources.GetResourceText(29450046)); //RC 29450046 : Zkontrolujte IsFloat a DockPanel vlastnosti tohoto podokna.

				DockPane oldPane = Pane;

                if (m_panelPane != null)
                    RemoveFromPane(m_panelPane);
				m_panelPane = value;
				if (m_panelPane != null)
				{
					m_panelPane.AddContent(Content);
					SetDockState(IsHidden, IsFloat ? DockState.Float : m_panelPane.DockState, oldPane);
				}
				else
					SetDockState(IsHidden, DockState.Unknown, oldPane);
			}
		}

		private DockPane m_floatPane = null;
        /// <summary>
        /// Plovoucí podokno
        /// </summary>
		public DockPane FloatPane
		{
			get	{	return m_floatPane;	}
			set
			{
				if (m_floatPane == value)
					return;

				if (value != null)
					if (!value.IsFloat || value.DockPanel != DockPanel)
                        throw new InvalidOperationException(GResources.GetResourceText(29450045) + '\n' + GResources.GetResourceText(29450046)); //RC 29450046 : Zkontrolujte IsFloat a DockPanel vlastnosti tohoto podokna.

				DockPane oldPane = Pane;

                if (m_floatPane != null)
                    RemoveFromPane(m_floatPane);
				m_floatPane = value;
				if (m_floatPane != null)
				{
					m_floatPane.AddContent(Content);
					SetDockState(IsHidden, IsFloat ? DockState.Float : VisibleState, oldPane);
				}
				else
					SetDockState(IsHidden, DockState.Unknown, oldPane);
			}
		}

		private int m_countSetDockState = 0;
        internal bool IsSuspendSetDockState { get { return m_countSetDockState != 0; } }

		internal string PersistString
		{
			get	{	return GetPersistStringCallback == null ? Form.GetType().ToString() : GetPersistStringCallback();	}
		}

		private GetPersistStringCallback m_getPersistStringCallback = null;
        /// <summary>
        /// Metoda volání zpìt
        /// </summary>
		public GetPersistStringCallback GetPersistStringCallback
		{
			get	{	return m_getPersistStringCallback;	}
			set	{	m_getPersistStringCallback = value;	}
		}


		private bool m_hideOnClose = false;
        /// <summary>
        /// Indikuje zneviditelnìní pro pøípad zavøení
        /// </summary>
		public bool HideOnClose
		{
			get	{	return m_hideOnClose;	}
			set	{	m_hideOnClose = value;	}
		}

		private DockState m_showHint = DockState.Unknown;
        /// <summary>
        /// Zviditelnìní objektu
        /// </summary>
		public DockState ShowHint
		{
			get	{	return m_showHint;	}
			set
			{	
				if (!DockHelper.IsDockStateValid(value, DockAreas))
                    throw (new InvalidOperationException(GResources.GetResourceText(29450049) + '\n' + GResources.GetResourceText(29450050))); //RC 29450050 : zkontrolujte vlastnost DockableAreas!

				if (m_showHint == value)
					return;

				m_showHint = value;
			}
		}

		private bool m_isActivated = false;
        /// <summary>
        /// Indikuje aktivnost objektu
        /// </summary>
		public bool IsActivated
		{
			get	{	return m_isActivated;	}
		    internal set
		    {
	            if (m_isActivated == value)
		            return;

	            m_isActivated = value;
		    }
		}

		private ContextMenu m_tabPageContextMenu = null;
        /// <summary>
        /// Kontextové menu záložky
        /// </summary>
		public ContextMenu TabPageContextMenu
		{
			get	{	return m_tabPageContextMenu;	}
			set	{	m_tabPageContextMenu = value;	}
		}

		private string m_toolTipText = null;
        /// <summary>
        /// Nápovìda
        /// </summary>
		public string ToolTipText
		{
			get	{	return m_toolTipText;	}
			set {	m_toolTipText = value;	}
		}

		private IntPtr m_activeWindowHandle = IntPtr.Zero;
        /// <summary>
        /// ovladaè aktivního okna
        /// </summary>
		public IntPtr ActiveWindowHandle
		{
			get	{	return m_activeWindowHandle;	}
			set	{	m_activeWindowHandle = value;	}
		}

        private IDisposable m_autoHideTab = null;
        /// <summary>
        /// auto-hide záložka
        /// </summary>
        internal IDisposable AutoHideTab
        {
            get { return m_autoHideTab; }
            set { m_autoHideTab = value; }
        }

        static readonly object DockStateChangedEvent = new object();
        /// <summary>
        /// Práce s reakcemi na zmìnu stavu dokování
        /// </summary>
        public event EventHandler DockStateChanged
        {
            add { Events.AddHandler(DockStateChangedEvent, value); }
            remove { Events.RemoveHandler(DockStateChangedEvent, value); }
        }

        bool m_flagClipWindow = false;
        internal bool FlagClipWindow
        {
            get { return m_flagClipWindow; }
            set
            {
                if (m_flagClipWindow == value)
                    return;

                m_flagClipWindow = value;
                if (m_flagClipWindow)
                    Form.Region = new Region(Rectangle.Empty);
                else
                    Form.Region = null;
            }
        }

        private ContextMenuStrip m_tabPageContextMenuStrip = null;
        /// <summary>
        /// Pruh kontextového menu okna
        /// </summary>
        public ContextMenuStrip TabPageContextMenuStrip
        {
            get { return m_tabPageContextMenuStrip; }
            set { m_tabPageContextMenuStrip = value; }
        }

        DockPaneStripBase.Tab m_tab = null;
        Control IDragSource.DragControl { get { return Form; } }

        /// <summary>
        /// Vytvoøení nové instance tøídy
        /// </summary>
        /// <param name="form">Formuláø, obsahující obsah</param>
        public DockContentHandler(Form form)
            : this(form, null)
        {
        }

        /// <summary>
        /// Vztvoøení nové instance tøídy dle formuláøe
        /// </summary>
        /// <param name="form">Formuláø pro obsah</param>
        /// <param name="getPersistStringCallback">Metoda navrácení</param>
        public DockContentHandler(Form form, GetPersistStringCallback getPersistStringCallback)
        {
            if (!(form is IDockContent))
                throw new ArgumentException(GResources.GetResourceText(29450041), "form"); //RC 29450041 : Formuláø musí být typu IDockContent!

            m_form = form;
            m_getPersistStringCallback = getPersistStringCallback;

            m_events = new EventHandlerList();
            Form.Disposed += new EventHandler(Form_Disposed);
            Form.TextChanged += new EventHandler(Form_TextChanged);
        }

        /// <summary>
        /// Uvolnìní objektu
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        /// <summary>
        /// Aktivace okna s obsahem
        /// </summary>
        public void Activate()
        {
            if (DockPanel == null)
                Form.Activate();
            else if (Pane == null)
                Show(DockPanel);
            else
            {
                IsHidden = false;
                Pane.ActiveContent = Content;
                if (DockState == DockState.Document && DockPanel.DocumentStyle == DocumentStyle.SystemMdi)
                {
                    Form.Activate();
                    return;
                }
                else if (DockHelper.IsDockStateAutoHide(DockState))
                    DockPanel.ActiveAutoHideContent = Content;

                if (!Form.ContainsFocus)
                    DockPanel.ContentFocusManager.Activate(Content);
            }
        }
        /// <summary>
        /// Získání fokusus
        /// </summary>
        public void GiveUpFocus() { DockPanel.ContentFocusManager.GiveUpFocus(Content); }
        /// <summary>
        /// Skrytí objektu
        /// </summary>
        public void Hide() { IsHidden = true; }
        /// <summary>
        /// Zobrazení okna s obsahem
        /// </summary>
        public void Show()
        {
            if (DockPanel == null)
                Form.Show();
            else
                Show(DockPanel);
        }
        /// <summary>
        /// Zobrazení okna s obsahem
        /// </summary>
        /// <param name="dockPanel">Panel s obsahem</param>
        public void Show(DockPanel dockPanel)
        {
            if (dockPanel == null)
                throw (new ArgumentNullException(GResources.GetResourceText(29450051))); //RC 29450051 : Podokno nemùže být NULL!

            if (DockState == DockState.Unknown)
                Show(dockPanel, DefaultShowState);
            else if (Pane == null)
                Show(dockPanel, DockState == DockState.Hidden ? DefaultShowState : DockState);
            else
                Activate();
        }
        /// <summary>
        /// Zobrazení okna s obsahem
        /// </summary>
        /// <param name="dockPanel">Panel s obsahem</param>
        /// <param name="dockState">Stav dokování</param>
        public void Show(DockPanel dockPanel, DockState dockState)
        {
            if (dockPanel == null)
                throw (new ArgumentNullException(GResources.GetResourceText(29450051))); //RC 29450051 : Podokno nemùže být NULL!

            if (dockState == DockState.Unknown || dockState == DockState.Hidden)
                throw (new ArgumentException(GResources.GetResourceText(29450052) + '\n' + GResources.GetResourceText(29450053))); //RC 29450053 : obsah nelze ukázal jako Unknown nebo Unvisible!

            dockPanel.SuspendLayout(true);

            DockPanel = dockPanel;

            if (dockState == DockState.Float && FloatPane == null)
                Pane = DockPanel.DockPaneFactory.CreateDockPane(Content, DockState.Float, true);
            else if (PanelPane == null)
            {
                DockPane paneExisting = null;
                foreach (DockPane pane in DockPanel.Panes)
                    if (pane.DockState == dockState)
                    {
                        paneExisting = pane;
                        break;
                    }

                if (paneExisting == null)
                    Pane = DockPanel.DockPaneFactory.CreateDockPane(Content, dockState, true);
                else
                    Pane = paneExisting;
            }

            DockState = dockState;
            Activate();

            dockPanel.ResumeLayout(true, true);
        }
        /// <summary>
        /// Zobrazení okna s obsahem
        /// </summary>
        /// <param name="dockPanel">Panel s obsahem</param>
        /// <param name="floatWindowBounds"></param>
        [SuppressMessage("Microsoft.Naming", "CA1720:AvoidTypeNamesInParameters")]
        public void Show(DockPanel dockPanel, Rectangle floatWindowBounds)
        {
            if (dockPanel == null)
                throw (new ArgumentNullException(GResources.GetResourceText(29450051)));

            dockPanel.SuspendLayout(true);

            DockPanel = dockPanel;
            if (FloatPane == null)
            {
                IsHidden = true;	// snižení blikání obrazovky
                FloatPane = DockPanel.DockPaneFactory.CreateDockPane(Content, DockState.Float, false);
                FloatPane.FloatWindow.StartPosition = FormStartPosition.Manual;
            }

            FloatPane.FloatWindow.Bounds = floatWindowBounds;

            Show(dockPanel, DockState.Float);
            Activate();

            dockPanel.ResumeLayout(true, true);
        }
        /// <summary>
        /// Zobrazení okna s obsahem
        /// </summary>
        /// <param name="pane">Podokno s obsahe</param>
        /// <param name="beforeContent">Pøed obsahem</param>
        public void Show(DockPane pane, IDockContent beforeContent)
        {
            if (pane == null)
                throw (new ArgumentNullException(GResources.GetResourceText(29450054))); //RC 29450054 : Pane nemùže být NULL!

            if (beforeContent != null && pane.Contents.IndexOf(beforeContent) == -1)
                throw (new ArgumentException(GResources.GetResourceText(29450055) + '\n' + GResources.GetResourceText(29450056))); //RC 29450056 : musí být obsažena v podoknì!

            pane.DockPanel.SuspendLayout(true);

            DockPanel = pane.DockPanel;
            Pane = pane;
            pane.SetContentIndex(Content, pane.Contents.IndexOf(beforeContent));
            Show();

            pane.DockPanel.ResumeLayout(true, true);
        }
        /// <summary>
        /// Zobrazení okna s obsahem
        /// </summary>
        /// <param name="previousPane">Pøedchozí podokno</param>
        /// <param name="alignment">Pozice</param>
        /// <param name="proportion"></param>
        public void Show(DockPane previousPane, DockAlignment alignment, double proportion)
        {
            if (previousPane == null)
                throw (new ArgumentException(GResources.GetResourceText(29450057) + '\n' + GResources.GetResourceText(29450058))); //RC 29450058 : Hodnota nemùže být NULL a jeho dokovací stav nesmí být auto-hide!

            if (DockHelper.IsDockStateAutoHide(previousPane.DockState))
                throw (new ArgumentException(GResources.GetResourceText(29450057) + '\n' + GResources.GetResourceText(29450058))); //RC 29450058 : Hodnota nemùže být NULL a jeho dokovací stav nesmí být auto-hide!

            previousPane.DockPanel.SuspendLayout(true);

            DockPanel = previousPane.DockPanel;
            DockPanel.DockPaneFactory.CreateDockPane(Content, previousPane, alignment, proportion, true);
            Show();

            previousPane.DockPanel.ResumeLayout(true, true);
        }
        /// <summary>
        /// Zavøení aktuálního okna
        /// </summary>
        public void Close()
        {
            DockPanel dockPanel = DockPanel;
            if (dockPanel != null)
                dockPanel.SuspendLayout(true);
            Form.Close();
            if (dockPanel != null)
                dockPanel.ResumeLayout(true, true);

        }
        /// <summary>
        /// Plovoucí okno dle pozice
        /// </summary>
        /// <param name="floatWindowBounds">Pozice pro plovoucí okno</param>
        public void FloatAt(Rectangle floatWindowBounds)
        {
            DockPane pane = DockPanel.DockPaneFactory.CreateDockPane(Content, floatWindowBounds, true);
        }
        /// <summary>
        /// Dokování do podokna
        /// </summary>
        /// <param name="pane">Podokno pro dokování obsahu</param>
        /// <param name="dockStyle">Styl dokování</param>
        /// <param name="contentIndex">Index dokovaného obsahu</param>
        public void DockTo(DockPane pane, DockStyle dockStyle, int contentIndex)
        {
            if (dockStyle == DockStyle.Fill)
            {
                bool samePane = (Pane == pane);
                if (!samePane)
                    Pane = pane;

                if (contentIndex == -1 || !samePane)
                    pane.SetContentIndex(Content, contentIndex);
                else
                {
                    DockContentCollection contents = pane.Contents;
                    int oldIndex = contents.IndexOf(Content);
                    int newIndex = contentIndex;
                    if (oldIndex < newIndex)
                    {
                        newIndex += 1;
                        if (newIndex > contents.Count - 1)
                            newIndex = -1;
                    }
                    pane.SetContentIndex(Content, newIndex);
                }
            }
            else
            {
                DockPane paneFrom = DockPanel.DockPaneFactory.CreateDockPane(Content, pane.DockState, true);
                INestedPanesContainer container = pane.NestedPanesContainer;
                if (dockStyle == DockStyle.Left)
                    paneFrom.DockTo(container, pane, DockAlignment.Left, 0.5);
                else if (dockStyle == DockStyle.Right)
                    paneFrom.DockTo(container, pane, DockAlignment.Right, 0.5);
                else if (dockStyle == DockStyle.Top)
                    paneFrom.DockTo(container, pane, DockAlignment.Top, 0.5);
                else if (dockStyle == DockStyle.Bottom)
                    paneFrom.DockTo(container, pane, DockAlignment.Bottom, 0.5);

                paneFrom.DockState = pane.DockState;
            }
        }
        /// <summary>
        /// Dokování obsahu do panelu
        /// </summary>
        /// <param name="panel">Panel pro dokování</param>
        /// <param name="dockStyle">Styl dokování</param>
        public void DockTo(DockPanel panel, DockStyle dockStyle)
        {
            if (panel != DockPanel)
                throw new ArgumentException(GResources.GetResourceText(29450059), "panel"); //RC 29450059 : Neplatné podokno!

            DockPane pane;

            if (dockStyle == DockStyle.Top)
                pane = DockPanel.DockPaneFactory.CreateDockPane(Content, DockState.DockTop, true);
            else if (dockStyle == DockStyle.Bottom)
                pane = DockPanel.DockPaneFactory.CreateDockPane(Content, DockState.DockBottom, true);
            else if (dockStyle == DockStyle.Left)
                pane = DockPanel.DockPaneFactory.CreateDockPane(Content, DockState.DockLeft, true);
            else if (dockStyle == DockStyle.Right)
                pane = DockPanel.DockPaneFactory.CreateDockPane(Content, DockState.DockRight, true);
            else if (dockStyle == DockStyle.Fill)
                pane = DockPanel.DockPaneFactory.CreateDockPane(Content, DockState.Document, true);
            else
                return;
        }

        /// <summary>
        /// Zjištìní platnosti dokovacího stavu
        /// </summary>
        /// <param name="dockState">Stav dokování</param>
        /// <returns></returns>
        public bool IsDockStateValid(DockState dockState)
        {
            if (DockPanel != null && dockState == DockState.Document && DockPanel.DocumentStyle == DocumentStyle.SystemMdi)
                return false;
            else
                return DockHelper.IsDockStateValid(dockState, DockAreas);
        }

        /// <exclude/>
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
                lock (this)
                {
                    DockPanel = null;
                    if (m_autoHideTab != null)
                        m_autoHideTab.Dispose();
                    if (m_tab != null)
                        m_tab.Dispose();

                    Form.Disposed -= new EventHandler(Form_Disposed);
                    Form.TextChanged -= new EventHandler(Form_TextChanged);
                    m_events.Dispose();
                }
        }
        /// <summary>
        /// Reakce na zmìnu stavu dokování
        /// </summary>
        /// <param name="e"></param>
        protected virtual void OnDockStateChanged(EventArgs e)
        {
            ((EventHandler)Events[DockStateChangedEvent])?.Invoke(this, e);
        }

        void RemoveFromPane(DockPane pane)
        {
            pane.RemoveContent(Content);
            SetPane(null);
            if (pane.Contents.Count == 0)
                pane.Dispose();
        }
        void SuspendSetDockState() { m_countSetDockState++; }
        void ResumeSetDockState()
        {
            m_countSetDockState--;
            if (m_countSetDockState < 0)
                m_countSetDockState = 0;
        }
        void ResumeSetDockState(bool isHidden, DockState visibleState, DockPane oldPane)
        {
            ResumeSetDockState();
            SetDockState(isHidden, visibleState, oldPane);
        }
        void SetParent(Control value)
        {
            if (Form.Parent == value)
                return;

            Form.Parent = value;
        }
        void SetPane(DockPane pane)
        {
            if (pane != null && pane.DockState == DockState.Document && DockPanel.DocumentStyle == DocumentStyle.DockingMdi)
            {
                if (Form.Parent is DockPane)
                    SetParent(null);
                if (Form.MdiParent != DockPanel.ParentForm)
                {
                    FlagClipWindow = true;
                    Form.MdiParent = DockPanel.ParentForm;
                }
            }
            else
            {
                FlagClipWindow = true;
                if (Form.MdiParent != null)
                    Form.MdiParent = null;
                if (Form.TopLevel)
                    Form.TopLevel = false;
                SetParent(pane);
            }
        }
        void Form_Disposed(object sender, EventArgs e) { Dispose(); }
        void Form_TextChanged(object sender, EventArgs e)
        {
            if (DockHelper.IsDockStateAutoHide(DockState))
                DockPanel.RefreshAutoHideStrip();
            else if (Pane != null)
            {
                if (Pane.FloatWindow != null)
                    Pane.FloatWindow.SetText();
                Pane.RefreshChanges();
            }
        }

        internal void SetPaneAndVisible(DockPane pane)
        {
            SetPane(pane);
            SetVisible();
        }
        internal void SetVisible()
        {
            bool visible;

            if (IsHidden)
                visible = false;
            else if (Pane != null && Pane.DockState == DockState.Document && DockPanel.DocumentStyle == DocumentStyle.DockingMdi)
                visible = true;
            else if (Pane != null && Pane.ActiveContent == Content)
                visible = true;
            else if (Pane != null && Pane.ActiveContent != Content)
                visible = false;
            else
                visible = Form.Visible;

            // když Form.Parent.Visible==false, Form.Visible nelze správnì èíst (ale vrátí vždy false),
            // takže v tìchto pøípadech vždy pøiøazujeme viditelnost
            if (Form.Visible != visible || (Form.Parent != null && !Form.Parent.Visible))
                Form.Visible = visible;
        }
        internal void SetDockState(bool isHidden, DockState visibleState, DockPane oldPane)
        {
            if (IsSuspendSetDockState)
                return;

            if (DockPanel == null && visibleState != DockState.Unknown)
                throw new InvalidOperationException(GResources.GetResourceText(29450047)); //RC 29450047 : Dock panel je NULL!

            if (visibleState == DockState.Hidden || (visibleState != DockState.Unknown && !IsDockStateValid(visibleState)))
                throw new InvalidOperationException(GResources.GetResourceText(29450048)); //RC 29450048 : Stav je neplatný!

            DockPanel dockPanel = DockPanel;
            if (dockPanel != null)
                dockPanel.SuspendLayout(true);

            SuspendSetDockState();

            DockState oldDockState = DockState;

            if (m_isHidden != isHidden || oldDockState == DockState.Unknown)
                m_isHidden = isHidden;
            m_visibleState = visibleState;
            m_dockState = isHidden ? DockState.Hidden : visibleState;

            if (visibleState == DockState.Unknown)
                Pane = null;
            else
            {
                m_isFloat = (m_visibleState == DockState.Float);

                if (Pane == null)
                    Pane = DockPanel.DockPaneFactory.CreateDockPane(Content, visibleState, true);
                else if (Pane.DockState != visibleState)
                {
                    if (Pane.Contents.Count == 1)
                        Pane.SetDockState(visibleState);
                    else
                        Pane = DockPanel.DockPaneFactory.CreateDockPane(Content, visibleState, true);
                }
            }

            if (Form.ContainsFocus)
                if (DockState == DockState.Hidden || DockState == DockState.Unknown)
                    DockPanel.ContentFocusManager.GiveUpFocus(Content);

            SetPaneAndVisible(Pane);

            if (oldPane != null && !oldPane.IsDisposed && oldDockState == oldPane.DockState)
                RefreshDockPane(oldPane);

            if (Pane != null && DockState == Pane.DockState)
                if ((Pane != oldPane) ||
                    (Pane == oldPane && oldDockState != oldPane.DockState))
                    RefreshDockPane(Pane);

            if (oldDockState != DockState)
            {
                if (DockState == DockState.Hidden || DockState == DockState.Unknown ||
                    DockHelper.IsDockStateAutoHide(DockState))
                    DockPanel.ContentFocusManager.RemoveFromList(Content);
                else
                    DockPanel.ContentFocusManager.AddToList(Content);

                OnDockStateChanged(EventArgs.Empty);
            }
            ResumeSetDockState();

            if (dockPanel != null)
                dockPanel.ResumeLayout(true, true);
        }

        internal DockPaneStripBase.Tab GetTab(DockPaneStripBase dockPaneStrip)
        {
            if (m_tab == null)
                m_tab = dockPaneStrip.CreateTab(Content);

            return m_tab;
        }

        bool IDockDragSource.CanDockTo(DockPane pane)
        {
            if (!IsDockStateValid(pane.DockState))
                return false;

            if (Pane == pane && pane.DisplayingContents.Count == 1)
                return false;

            return true;
        }

        Rectangle IDockDragSource.BeginDrag(Point ptMouse)
        {
            Size size;
            DockPane floatPane = this.FloatPane;
            if (DockState == DockState.Float || floatPane == null || floatPane.FloatWindow.NestedPanes.Count != 1)
                size = DockPanel.DefaultFloatWindowSize;
            else
                size = floatPane.FloatWindow.Size;

            Point location;
			Rectangle rectPane = Pane.ClientRectangle;
            if (DockState == DockState.Document)
                location = new Point(rectPane.Left, rectPane.Top);
            else
            {
                location = new Point(rectPane.Left, rectPane.Bottom);
                location.Y -= size.Height;
            }
            location = Pane.PointToScreen(location);

            if (ptMouse.X > location.X + size.Width)
                location.X += ptMouse.X - (location.X + size.Width) + Measures.SplitterSize;

            return new Rectangle(location, size);
        }

        static void RefreshDockPane(DockPane pane)
        {
            pane.RefreshChanges();
            pane.ValidateActiveContent();
        }
    }
}

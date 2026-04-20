//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DockPanel.cs                           </Name>
//    <Description> Deserializátor obsahu                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;
using System.Windows.Forms;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;
using System.Collections.Generic;
using Gordic.General;

// To simplify the process of finding the toolbox bitmap resource:
// #1 Create an internal class called "resfinder" outside of the root namespace.
// #2 Use "resfinder" in the toolbox bitmap attribute instead of the control name.
// #3 use the "<default namespace>.<resourcename>" string to locate the resource.
// See: http://www.bobpowell.net/toolboxbitmap.htm
internal class Resfinder
{
}

namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Deserializátor obsahu
    /// </summary>
    /// <param name="persistString">Pøetrvávající øetìzec</param>
    /// <returns></returns>
    [SuppressMessage("Microsoft.Naming", "CA1720:AvoidTypeNamesInParameters", MessageId = "0#")]
	public delegate IDockContent DeserializeDockContent(string persistString);

    /// <summary>
    /// Dokovací panel
    /// </summary>
    [LocalizedDescription("Visual Studio .Net styl dokování.")]
    [Designer(typeof(System.Windows.Forms.Design.ControlDesigner))]
    [ToolboxBitmap(typeof(Resfinder), "Gordic.GFE.Parsers.Resources.bitmaps.DockPanel.bmp")]
    [DefaultProperty("DocumentStyle")]
    [DefaultEvent("ActiveContentChanged")]
	public partial class DockPanel : Panel
	{
        private FocusManagerImpl m_focusManager;
        private DockPanelExtender m_extender;
        private DockPaneCollection m_panes;
        private FloatWindowCollection m_floatWindows;
        private AutoHideWindowControl m_autoHideWindow;
        private DockWindowCollection m_dockWindows;
        private DockContent m_dummyContent; 
        private Control m_dummyControl;
        
        /// <summary>
        /// Dokovatelný panel
        /// </summary>
		public DockPanel()
		{
            m_focusManager = new FocusManagerImpl(this);
			m_extender = new DockPanelExtender(this);
			m_panes = new DockPaneCollection();
			m_floatWindows = new FloatWindowCollection();

            SuspendLayout();

            m_autoHideWindow = new AutoHideWindowControl(this)
            {
                Visible = false
            };
            SetAutoHideWindowParent();

            m_dummyControl = new DummyControl
            {
                Bounds = new Rectangle(0, 0, 1, 1)
            };
            Controls.Add(m_dummyControl);

			m_dockWindows = new DockWindowCollection(this);
			Controls.AddRange(new Control[]	{
				DockWindows[DockState.Document],
				DockWindows[DockState.DockLeft],
				DockWindows[DockState.DockRight],
				DockWindows[DockState.DockTop],
				DockWindows[DockState.DockBottom]
				});

			m_dummyContent = new DockContent();
            ResumeLayout();
        }

		private AutoHideStripBase m_autoHideStripControl = null;
		internal AutoHideStripBase AutoHideStripControl
		{
			get
			{	
				if (m_autoHideStripControl == null)
				{
					m_autoHideStripControl = AutoHideStripFactory.CreateAutoHideStrip(this);
					Controls.Add(m_autoHideStripControl);
				}
				return m_autoHideStripControl;
			}
		}
        internal void ResetAutoHideStripControl()
        {
            if (m_autoHideStripControl != null)
                m_autoHideStripControl.Dispose();

            m_autoHideStripControl = null;
        }

		private void MdiClientHandleAssigned(object sender, EventArgs e)
		{
			SetMdiClient();
			PerformLayout();
		}

		private void MdiClient_Layout(object sender, LayoutEventArgs e)
		{
			if (DocumentStyle != DocumentStyle.DockingMdi)
				return;

			foreach (DockPane pane in Panes)
				if (pane.DockState == DockState.Document)
					pane.SetContentBounds();

			InvalidateWindowRegion();
		}

        readonly object syncLock = new object();
		bool m_disposed;
        /// <exclude/>
		protected override void Dispose(bool disposing)
		{
			lock (syncLock)
			{
				if (!m_disposed && disposing)
				{
                    if (m_focusManager != null)
                        m_focusManager.Dispose();

					if (m_mdiClientController != null)
					{
						m_mdiClientController.HandleAssigned -= new EventHandler(MdiClientHandleAssigned);
						m_mdiClientController.MdiChildActivate -= new EventHandler(ParentFormMdiChildActivate);
						m_mdiClientController.Layout -= new LayoutEventHandler(MdiClient_Layout);
						m_mdiClientController.Dispose();
					}

                    if (FloatWindows != null)
                        FloatWindows.Dispose();

                    if (Panes != null)
                        Panes.Dispose();

                    if (DummyContent != null)
                        DummyContent.Dispose();

					m_disposed = true;
				}
				
				base.Dispose(disposing);
			}
		}

        /// <summary>
        /// Aktivní samoskrývající se obsah
        /// </summary>
		[Browsable(false)]
		public IDockContent ActiveAutoHideContent
		{
			get	{	return AutoHideWindow.ActiveContent;	}
			set	{	AutoHideWindow.ActiveContent = value;	}
		}

        private bool m_allowEndUserDocking = true;
        /// <summary>
        /// Indikuje povolení dokování okna uživatelem
        /// </summary>
		[LocalizedCategory("Dokování")]
        [LocalizedDescription("Urèuje, zda je drag'n'drop povoleno.")]
		[DefaultValue(true)]
		public bool AllowEndUserDocking
		{
			get	{	return m_allowEndUserDocking;	}
			set	{	m_allowEndUserDocking = value;	}
		}

        private bool m_allowEndUserNestedDocking = true;
        /// <summary>
        /// Povoluje sousední dokování
        /// </summary>
        [LocalizedCategory("Dokování")]
        [LocalizedDescription("Urèuje, zda je drag'n'drop vnoøeného podokna povoleno.")]
        [DefaultValue(true)]
        public bool AllowEndUserNestedDocking
        {
            get { return m_allowEndUserNestedDocking; }
            set { m_allowEndUserNestedDocking = value; }
        }

        private DockContentCollection m_contents = new DockContentCollection();
        /// <summary>
        /// Kolekce obsahù panelu
        /// </summary>
		[Browsable(false)]
		public DockContentCollection Contents
		{
			get	{	return m_contents;	}
		}

		internal DockContent DummyContent
		{
			get	{	return m_dummyContent;	}
		}

        private bool m_rightToLeftLayout = false;
        /// <summary>
        /// Rozložení zprava doleva
        /// </summary>
        [DefaultValue(false)]
        [LocalizedCategory("Appearance")]
        [LocalizedDescription("Urèuje, zda ovládací rozložení je zprava doleva, když je RightToLeft vlastnost nastavena na hodnotu TRUE.")]
        public bool RightToLeftLayout
        {
            get { return m_rightToLeftLayout; }
            set
            {
                if (m_rightToLeftLayout == value)
                    return;

                m_rightToLeftLayout = value;
                foreach (FloatWindow floatWindow in FloatWindows)
                    floatWindow.RightToLeftLayout = value;
            }
        }

        /// <summary>
        /// Zmìna rozložení
        /// </summary>
        /// <param name="e"></param>
        protected override void OnRightToLeftChanged(EventArgs e)
        {
            base.OnRightToLeftChanged(e);
            foreach (FloatWindow floatWindow in FloatWindows)
            {
                if (floatWindow.RightToLeft != RightToLeft)
                    floatWindow.RightToLeft = RightToLeft;
            }
        }

		private bool m_showDocumentIcon = false;
        /// <summary>
        /// Indiuje zobrazení ikonky dokumentu
        /// </summary>
		[DefaultValue(false)]
		[LocalizedCategory("Dokování")]
        [LocalizedDescription("Urèuje, zda ikona dokumentu se zobrazí v lištì karet.")]
		public bool ShowDocumentIcon
		{
			get	{	return m_showDocumentIcon;	}
			set
			{
				if (m_showDocumentIcon == value)
					return;

				m_showDocumentIcon = value;
				Refresh();
			}
		}

        /// <summary>
        /// Prodloužení dokovacího panelu
        /// </summary>
		[Browsable(false)]
		public DockPanelExtender Extender
		{
			get	{	return m_extender;	}
		}

        /// <summary>
        /// Fabrika dokovatelných panelù
        /// </summary>
		public DockPanelExtender.IDockPaneFactory DockPaneFactory
		{
			get	{	return Extender.DockPaneFactory;	}
		}

        /// <summary>
        /// Fabrika plovoucích oken
        /// </summary>
		public DockPanelExtender.IFloatWindowFactory FloatWindowFactory
		{
			get	{	return Extender.FloatWindowFactory;	}
		}

		internal DockPanelExtender.IDockPaneCaptionFactory DockPaneCaptionFactory
		{
			get	{	return Extender.DockPaneCaptionFactory;	}
		}

		internal DockPanelExtender.IDockPaneStripFactory DockPaneStripFactory
		{
			get	{	return Extender.DockPaneStripFactory;	}
		}

		internal DockPanelExtender.IAutoHideStripFactory AutoHideStripFactory
		{
			get	{	return Extender.AutoHideStripFactory;	}
		}

        /// <summary>
        /// Podokna panelu
        /// </summary>
		[Browsable(false)]
		public DockPaneCollection Panes
		{
			get	{	return m_panes;	}
		}

		internal Rectangle DockArea
		{
			get
			{
				return new Rectangle(DockPadding.Left, DockPadding.Top,
					ClientRectangle.Width - DockPadding.Left - DockPadding.Right,
					ClientRectangle.Height - DockPadding.Top - DockPadding.Bottom);
			}
		}

		private double m_dockBottomPortion = 0.25;
        /// <summary>
        /// Pozice dole
        /// </summary>
		[LocalizedCategory("Dokování")]
        [LocalizedDescription("Velikost spodního dokovacího podokna. Hodnota &lt;1 urèit velikost v èásti, hodnota&gt; 1 urèit velikost v pixelech.")]
		[DefaultValue(0.25)]
		public double DockBottomPortion
		{
			get	{	return m_dockBottomPortion;	}
			set
			{
				if (value <= 0)
					throw new ArgumentOutOfRangeException("value");

				if (value == m_dockBottomPortion)
					return;

				m_dockBottomPortion = value;

                if (m_dockBottomPortion < 1 && m_dockTopPortion < 1)
                {
                    if (m_dockTopPortion + m_dockBottomPortion > 1)
                        m_dockTopPortion = 1 - m_dockBottomPortion;
                }

				PerformLayout();
			}
		}

		private double m_dockLeftPortion = 0.25;
        /// <summary>
        /// Pozice zleva
        /// </summary>
		[LocalizedCategory("Dokování")]
        [LocalizedDescription("Velikost levého dokovacího podokna. Hodnota &lt;1 urèit velikost v èásti, hodnota&gt; 1 urèit velikost v pixelech.")]
		[DefaultValue(0.25)]
		public double DockLeftPortion
		{
			get	{	return m_dockLeftPortion;	}
			set
			{
				if (value <= 0)
					throw new ArgumentOutOfRangeException("value");

				if (value == m_dockLeftPortion)
					return;

				m_dockLeftPortion = value;

                if (m_dockLeftPortion < 1 && m_dockRightPortion < 1)
                {
                    if (m_dockLeftPortion + m_dockRightPortion > 1)
                        m_dockRightPortion = 1 - m_dockLeftPortion;
                }
				PerformLayout();
			}
		}

		private double m_dockRightPortion = 0.25;
        /// <summary>
        /// Velikost zprava
        /// </summary>
		[LocalizedCategory("Dokování")]
        [LocalizedDescription("Velikost pravého dokovacího podokna. Hodnota &lt;1 urèit velikost v èásti, hodnota&gt; 1 urèit velikost v pixelech.")]
		[DefaultValue(0.25)]
		public double DockRightPortion
		{
			get	{	return m_dockRightPortion;	}
			set
			{
				if (value <= 0)
					throw new ArgumentOutOfRangeException("value");

				if (value == m_dockRightPortion)
					return;

				m_dockRightPortion = value;

                if (m_dockLeftPortion < 1 && m_dockRightPortion < 1)
                {
                    if (m_dockLeftPortion + m_dockRightPortion > 1)
                        m_dockLeftPortion = 1 - m_dockRightPortion;
                }
				PerformLayout();
			}
		}

		private double m_dockTopPortion = 0.25;
        /// <summary>
        /// Velikost zleva
        /// </summary>
		[LocalizedCategory("Dokování")]
        [LocalizedDescription("Velikost horního dokovacího podokna. Hodnota &lt;1 urèit velikost v èásti, hodnota&gt; 1 urèit velikost v pixelech.")]
		[DefaultValue(0.25)]
		public double DockTopPortion
		{
			get	{	return m_dockTopPortion;	}
			set
			{
				if (value <= 0)
					throw new ArgumentOutOfRangeException("value");

				if (value == m_dockTopPortion)
					return;

				m_dockTopPortion = value;

                if (m_dockTopPortion < 1 && m_dockBottomPortion < 1)
                {
                    if (m_dockTopPortion + m_dockBottomPortion > 1)
                        m_dockBottomPortion = 1 - m_dockTopPortion;
                }
				PerformLayout();
			}
		}

        /// <summary>
        /// Dokovatelné okno
        /// </summary>
		[Browsable(false)]
		public DockWindowCollection DockWindows
		{
			get	{	return m_dockWindows;	}
		}

        /// <summary>
        /// Aktualizace Z indexù oken
        /// </summary>
        /// <param name="dockStyle"></param>
        /// <param name="fullPanelEdge"></param>
        public void UpdateDockWindowZOrder(DockStyle dockStyle, bool fullPanelEdge)
        {
            if (dockStyle == DockStyle.Left)
            {
                if (fullPanelEdge)
                    DockWindows[DockState.DockLeft].SendToBack();
                else
                    DockWindows[DockState.DockLeft].BringToFront();
            }
            else if (dockStyle == DockStyle.Right)
            {
                if (fullPanelEdge)
                    DockWindows[DockState.DockRight].SendToBack();
                else
                    DockWindows[DockState.DockRight].BringToFront();
            }
            else if (dockStyle == DockStyle.Top)
            {
                if (fullPanelEdge)
                    DockWindows[DockState.DockTop].SendToBack();
                else
                    DockWindows[DockState.DockTop].BringToFront();
            }
            else if (dockStyle == DockStyle.Bottom)
            {
                if (fullPanelEdge)
                    DockWindows[DockState.DockBottom].SendToBack();
                else
                    DockWindows[DockState.DockBottom].BringToFront();
            }
        }
        /// <summary>
        /// Poèet dokumentù
        /// </summary>
        public int DocumentsCount
        {
            get
            {
                int count = 0;
                foreach (IDockContent content in Documents)
                    count++;

                return count;
            }
        }
        /// <summary>
        /// Pøevod odkumentu do pole
        /// </summary>
        /// <returns></returns>
        public IDockContent[] DocumentsToArray()
        {
            int count = DocumentsCount;
            IDockContent[] documents = new IDockContent[count];
            int i = 0;
            foreach (IDockContent content in Documents)
            {
                documents[i] = content;
                i++;
            }

            return documents;
        }

        /// <summary>
        /// Seznam dokumentù
        /// </summary>
		public IEnumerable<IDockContent> Documents
		{
            get
            {
                foreach (IDockContent content in Contents)
                    if (content.DockHandler.DockState == DockState.Document)
                        yield return content;
            }
		}

		private Rectangle DocumentRectangle
		{
			get
			{
				Rectangle rect = DockArea;
				if (DockWindows[DockState.DockLeft].VisibleNestedPanes.Count != 0)
				{
					rect.X += (int)(DockArea.Width * DockLeftPortion);
					rect.Width -= (int)(DockArea.Width * DockLeftPortion);
				}
				if (DockWindows[DockState.DockRight].VisibleNestedPanes.Count != 0)
					rect.Width -= (int)(DockArea.Width * DockRightPortion);
				if (DockWindows[DockState.DockTop].VisibleNestedPanes.Count != 0)
				{
					rect.Y += (int)(DockArea.Height * DockTopPortion);
					rect.Height -= (int)(DockArea.Height * DockTopPortion);
				}
				if (DockWindows[DockState.DockBottom].VisibleNestedPanes.Count != 0)
					rect.Height -= (int)(DockArea.Height * DockBottomPortion);

				return rect;
			}
		}

		private Control DummyControl
		{
			get	{	return m_dummyControl;	}
		}

        /// <summary>
        /// Kolekce plovoucích oken
        /// </summary>
		[Browsable(false)]
		public FloatWindowCollection FloatWindows
		{
			get	{	return m_floatWindows;	}
		}

        private Size m_defaultFloatWindowSize = new Size(300, 300);
        /// <summary>
        /// Výchozí velikost plovoucího okna
        /// </summary>
        [Category("Layout")]
        [LocalizedDescription("Výchozí velikost plovoucího okna.")]
        public Size DefaultFloatWindowSize
        {
            get { return m_defaultFloatWindowSize; }
            set { m_defaultFloatWindowSize = value; }
        }
        private bool ShouldSerializeDefaultFloatWindowSize()
        {
            return DefaultFloatWindowSize != new Size(300, 300);
        }

		private DocumentStyle m_documentStyle = DocumentStyle.DockingMdi;
        /// <summary>
        /// Styl dokumentu
        /// </summary>
		[LocalizedCategory("Dokování")]
        [LocalizedDescription("Styl okna dokumentu.")]
		[DefaultValue(DocumentStyle.DockingMdi)]
		public DocumentStyle DocumentStyle
		{
			get	{	return m_documentStyle;	}
			set
			{
				if (value == m_documentStyle)
					return;

				if (!Enum.IsDefined(typeof(DocumentStyle), value))
					throw new InvalidEnumArgumentException();

				if (value == DocumentStyle.SystemMdi && DockWindows[DockState.Document].VisibleNestedPanes.Count > 0)
					throw new InvalidEnumArgumentException();

				m_documentStyle = value;

				SuspendLayout(true);

                SetAutoHideWindowParent();
				SetMdiClient();
				InvalidateWindowRegion();

				foreach (IDockContent content in Contents)
					if (content.DockHandler.DockState == DockState.Document)
						content.DockHandler.SetPaneAndVisible(content.DockHandler.Pane);

                PerformMdiClientLayout();

				ResumeLayout(true, true);
			}
		}

        private int GetDockWindowSize(DockState dockState)
        {
            if (dockState == DockState.DockLeft || dockState == DockState.DockRight)
            {
                int width = ClientRectangle.Width - DockPadding.Left - DockPadding.Right;
                int dockLeftSize = m_dockLeftPortion >= 1 ? (int)m_dockLeftPortion : (int)(width * m_dockLeftPortion);
                int dockRightSize = m_dockRightPortion >= 1 ? (int)m_dockRightPortion : (int)(width * m_dockRightPortion);

                if (dockLeftSize < MeasurePane.MinSize)
                    dockLeftSize = MeasurePane.MinSize;
                if (dockRightSize < MeasurePane.MinSize)
                    dockRightSize = MeasurePane.MinSize;

                if (dockLeftSize + dockRightSize > width - MeasurePane.MinSize)
                {
                    int adjust = (dockLeftSize + dockRightSize) - (width - MeasurePane.MinSize);
                    dockLeftSize -= adjust / 2;
                    dockRightSize -= adjust / 2;
                }

                return dockState == DockState.DockLeft ? dockLeftSize : dockRightSize;
            }
            else if (dockState == DockState.DockTop || dockState == DockState.DockBottom)
            {
                int height = ClientRectangle.Height - DockPadding.Top - DockPadding.Bottom;
                int dockTopSize = m_dockTopPortion >= 1 ? (int)m_dockTopPortion : (int)(height * m_dockTopPortion);
                int dockBottomSize = m_dockBottomPortion >= 1 ? (int)m_dockBottomPortion : (int)(height * m_dockBottomPortion);

                if (dockTopSize < MeasurePane.MinSize)
                    dockTopSize = MeasurePane.MinSize;
                if (dockBottomSize < MeasurePane.MinSize)
                    dockBottomSize = MeasurePane.MinSize;

                if (dockTopSize + dockBottomSize > height - MeasurePane.MinSize)
                {
                    int adjust = (dockTopSize + dockBottomSize) - (height - MeasurePane.MinSize);
                    dockTopSize -= adjust / 2;
                    dockBottomSize -= adjust / 2;
                }

                return dockState == DockState.DockTop ? dockTopSize : dockBottomSize;
            }
            else
                return 0;
        }

        /// <exclude/>
        protected override void OnLayout(LayoutEventArgs levent)
		{
			SuspendLayout(true);

			AutoHideStripControl.Bounds = ClientRectangle;

			CalculateDockPadding();

            DockWindows[DockState.DockLeft].Width = GetDockWindowSize(DockState.DockLeft);
			DockWindows[DockState.DockRight].Width = GetDockWindowSize(DockState.DockRight);
			DockWindows[DockState.DockTop].Height = GetDockWindowSize(DockState.DockTop);
			DockWindows[DockState.DockBottom].Height = GetDockWindowSize(DockState.DockBottom);

			AutoHideWindow.Bounds = GetAutoHideWindowBounds(AutoHideWindowRectangle);

			DockWindows[DockState.Document].BringToFront();
			AutoHideWindow.BringToFront();

			base.OnLayout(levent);

            if (DocumentStyle == DocumentStyle.SystemMdi && MdiClientExists)
            {
                SetMdiClientBounds(SystemMdiClientBounds);
                InvalidateWindowRegion();
            }
            else if (DocumentStyle == DocumentStyle.DockingMdi)
                InvalidateWindowRegion();

			ResumeLayout(true, true);
		}

		internal Rectangle GetTabStripRectangle(DockState dockState)
		{
			return AutoHideStripControl.GetTabStripRectangle(dockState);
		}

        /// <summary>
        /// Kreslení objektu
        /// </summary>
        /// <param name="e"></param>
		protected override void OnPaint(PaintEventArgs e)
		{
			base.OnPaint(e);

			Graphics g = e.Graphics;
			g.FillRectangle(SystemBrushes.AppWorkspace, ClientRectangle);
		}

		internal void AddContent(IDockContent content)
		{
			if (content == null)
				throw(new ArgumentNullException());

			if (!Contents.Contains(content))
			{
				Contents.Add(content);
				OnContentAdded(new DockContentEventArgs(content));
			}
		}

		internal void AddPane(DockPane pane)
		{
			if (Panes.Contains(pane))
				return;

			Panes.Add(pane);
		}

		internal void AddFloatWindow(FloatWindow floatWindow)
		{
			if (FloatWindows.Contains(floatWindow))
				return;

			FloatWindows.Add(floatWindow);
		}

		private void CalculateDockPadding()
		{
			DockPadding.All = 0;

			int height = AutoHideStripControl.MeasureHeight();

			if (AutoHideStripControl.GetNumberOfPanes(DockState.DockLeftAutoHide) > 0)
				DockPadding.Left = height;
			if (AutoHideStripControl.GetNumberOfPanes(DockState.DockRightAutoHide) > 0)
				DockPadding.Right = height;
			if (AutoHideStripControl.GetNumberOfPanes(DockState.DockTopAutoHide) > 0)
				DockPadding.Top = height;
			if (AutoHideStripControl.GetNumberOfPanes(DockState.DockBottomAutoHide) > 0)
				DockPadding.Bottom = height;
		}

		internal void RemoveContent(IDockContent content)
		{
			if (content == null)
				throw(new ArgumentNullException());
			
			if (Contents.Contains(content))
			{
				Contents.Remove(content);
				OnContentRemoved(new DockContentEventArgs(content));
			}
		}

		internal void RemovePane(DockPane pane)
		{
			if (!Panes.Contains(pane))
				return;

			Panes.Remove(pane);
		}

		internal void RemoveFloatWindow(FloatWindow floatWindow)
		{
			if (!FloatWindows.Contains(floatWindow))
				return;

			FloatWindows.Remove(floatWindow);
		}

        /// <summary>
        /// Natsvení podokna na danou pozici
        /// </summary>
        /// <param name="pane">Podokno</param>
        /// <param name="index">Pozice</param>
		public void SetPaneIndex(DockPane pane, int index)
		{
			int oldIndex = Panes.IndexOf(pane);
			if (oldIndex == -1)
                throw (new ArgumentException(GResources.GetResourceText(29450527)));

			if (index < 0 || index > Panes.Count - 1)
				if (index != -1)
                    throw (new ArgumentOutOfRangeException(GResources.GetResourceText(29450528)));
				
			if (oldIndex == index)
				return;
			if (oldIndex == Panes.Count - 1 && index == -1)
				return;

			Panes.Remove(pane);
			if (index == -1)
				Panes.Add(pane);
			else if (oldIndex < index)
				Panes.AddAt(pane, index - 1);
			else
				Panes.AddAt(pane, index);
		}

        /// <exclude/>
        public void SuspendLayout(bool allWindows)
		{
            FocusManager.SuspendFocusTracking();
			SuspendLayout();
			if (allWindows)
				SuspendMdiClientLayout();
		}

        /// <exclude/>
        public void ResumeLayout(bool performLayout, bool allWindows)
		{
            FocusManager.ResumeFocusTracking();
            ResumeLayout(performLayout);
            if (allWindows)
                ResumeMdiClientLayout(performLayout);
		}

	    internal Form ParentForm
		{
			get
			{	
				if (!IsParentFormValid())
                    throw new InvalidOperationException(GResources.GetResourceText(29450529));

				return GetMdiClientController().ParentForm;
			}
		}

		private bool IsParentFormValid()
		{
			if (DocumentStyle == DocumentStyle.DockingRdi || DocumentStyle == DocumentStyle.DockingWindow)
				return true;

            if (!MdiClientExists)
                GetMdiClientController().RenewMdiClient();

            return (MdiClientExists);
		}

        /// <exclude/>
        protected override void OnParentChanged(EventArgs e)
		{
            SetAutoHideWindowParent();
            GetMdiClientController().ParentForm = (this.Parent as Form);
			base.OnParentChanged (e);
		}

        private void SetAutoHideWindowParent()
        {
            Control parent;
            if (DocumentStyle == DocumentStyle.DockingMdi ||
                DocumentStyle == DocumentStyle.SystemMdi)
                parent = this.Parent;
            else
                parent = this;
            if (AutoHideWindow.Parent != parent)
            {
                AutoHideWindow.Parent = parent;
                AutoHideWindow.BringToFront();
            }
        }

        /// <exclude/>
        protected override void OnVisibleChanged(EventArgs e)
		{
			base.OnVisibleChanged (e);

			if (Visible)
				SetMdiClient();
		}

		private Rectangle SystemMdiClientBounds
		{
			get
			{
				if (!IsParentFormValid() || !Visible)
					return Rectangle.Empty;

				Rectangle rect = ParentForm.RectangleToClient(RectangleToScreen(DocumentWindowBounds));
				return rect;
			}
		}

		internal Rectangle DocumentWindowBounds
		{
			get
			{
				Rectangle rectDocumentBounds = DisplayRectangle;
				if (DockWindows[DockState.DockLeft].Visible)
				{
					rectDocumentBounds.X += DockWindows[DockState.DockLeft].Width;
					rectDocumentBounds.Width -= DockWindows[DockState.DockLeft].Width;
				}
				if (DockWindows[DockState.DockRight].Visible)
					rectDocumentBounds.Width -= DockWindows[DockState.DockRight].Width;
				if (DockWindows[DockState.DockTop].Visible)
				{
					rectDocumentBounds.Y += DockWindows[DockState.DockTop].Height;
					rectDocumentBounds.Height -= DockWindows[DockState.DockTop].Height;
				}
				if (DockWindows[DockState.DockBottom].Visible)
					rectDocumentBounds.Height -= DockWindows[DockState.DockBottom].Height;

				return rectDocumentBounds;

			}
		}

        private PaintEventHandler m_dummyControlPaintEventHandler = null;
        private void InvalidateWindowRegion()
        {
            if (DesignMode)
                return;

            if (m_dummyControlPaintEventHandler == null)
                m_dummyControlPaintEventHandler = new PaintEventHandler(DummyControl_Paint);

            DummyControl.Paint += m_dummyControlPaintEventHandler;
            DummyControl.Invalidate();
        }

        void DummyControl_Paint(object sender, PaintEventArgs e)
        {
            DummyControl.Paint -= m_dummyControlPaintEventHandler;
            UpdateWindowRegion();
        }

		private void UpdateWindowRegion()
		{
			if (this.DocumentStyle == DocumentStyle.DockingMdi)
				UpdateWindowRegion_ClipContent();
			else if (this.DocumentStyle == DocumentStyle.DockingRdi ||
				this.DocumentStyle == DocumentStyle.DockingWindow)
				UpdateWindowRegion_FullDocumentArea();
			else if (this.DocumentStyle == DocumentStyle.SystemMdi)
				UpdateWindowRegion_EmptyDocumentArea();
		}

		private void UpdateWindowRegion_FullDocumentArea()
		{
			SetRegion(null);
		}

		private void UpdateWindowRegion_EmptyDocumentArea()
		{
			Rectangle rect = DocumentWindowBounds;
			SetRegion(new Rectangle[] { rect });
		}

		private void UpdateWindowRegion_ClipContent()
		{
			int count = 0;
			foreach (DockPane pane in this.Panes)
			{
				if (!pane.Visible || pane.DockState != DockState.Document)
					continue;

				count ++;
			}

            if (count == 0)
            {
                SetRegion(null);
                return;
            }

			Rectangle[] rects = new Rectangle[count];
			int i = 0;
			foreach (DockPane pane in this.Panes)
			{
				if (!pane.Visible || pane.DockState != DockState.Document)
					continue;

                rects[i] = RectangleToClient(pane.RectangleToScreen(pane.ContentRectangle));
				i++;
			}

			SetRegion(rects);
		}

		private Rectangle[] m_clipRects = null;
		private void SetRegion(Rectangle[] clipRects)
		{
			if (!IsClipRectsChanged(clipRects))
				return;

			m_clipRects = clipRects;

			if (m_clipRects == null || m_clipRects.GetLength(0) == 0)
				Region = null;
			else
			{
				Region region = new Region(new Rectangle(0, 0, this.Width, this.Height));
				foreach (Rectangle rect in m_clipRects)
					region.Exclude(rect);
				Region = region;
			}
		}

		private bool IsClipRectsChanged(Rectangle[] clipRects)
		{
			if (clipRects == null && m_clipRects == null)
				return false;
			else if ((clipRects == null) != (m_clipRects == null))
				return true;

			foreach (Rectangle rect in clipRects)
			{
				bool matched = false;
				foreach (Rectangle rect2 in m_clipRects)
					if (rect == rect2)
					{
						matched = true;
						break;
					}
				if (!matched)
					return true;
			}

			foreach (Rectangle rect2 in m_clipRects)
			{
				bool matched = false;
				foreach (Rectangle rect in clipRects)
					if (rect == rect2)
					{
						matched = true;
						break;
					}
				if (!matched)
					return true;
			}
			return false;
		}

		private static readonly object ContentAddedEvent = new object();
        /// <summary>
        /// Reakce na zmìnu obsahu
        /// </summary>
        [LocalizedCategory("Oznámení kotvení")]
        [LocalizedDescription("Dochází tehdy, když obsah pøidán do DockPanel.")]
		public event EventHandler<DockContentEventArgs> ContentAdded
		{
			add	{	Events.AddHandler(ContentAddedEvent, value);	}
			remove	{	Events.RemoveHandler(ContentAddedEvent, value);	}
		}
        /// <summary>
        /// Reakce na pøidání obsahu
        /// </summary>
        /// <param name="e"></param>
		protected virtual void OnContentAdded(DockContentEventArgs e)
		{
            ((EventHandler<DockContentEventArgs>)Events[ContentAddedEvent])?.Invoke(this, e);
        }

		private static readonly object ContentRemovedEvent = new object();
        /// <summary>
        /// Událost, která se volá po odstranìní obsahu z panelu
        /// </summary>
		[LocalizedCategory("Oznámení kotvení")]
        [LocalizedDescription("Dochází tehdy, když obsah odebrán z DockPanel.")]
		public event EventHandler<DockContentEventArgs> ContentRemoved
		{
			add	{	Events.AddHandler(ContentRemovedEvent, value);	}
			remove	{	Events.RemoveHandler(ContentRemovedEvent, value);	}
		}
        /// <summary>
        /// Reakce na odstranìní obsahu z panelu
        /// </summary>
        /// <param name="e"></param>
		protected virtual void OnContentRemoved(DockContentEventArgs e)
		{
            ((EventHandler<DockContentEventArgs>)Events[ContentRemovedEvent])?.Invoke(this, e);
        }
    }
}

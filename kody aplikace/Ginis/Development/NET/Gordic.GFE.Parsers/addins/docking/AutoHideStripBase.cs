//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AutoHideStripBase.cs                   </Name>
//    <Description> Základní tøída samoskrývacího pásu události                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Windows.Forms;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using Gordic.General;

namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Základní tøída samoskrývacího pásu události
    /// </summary>
    abstract public partial class AutoHideStripBase : Control
	{
        /// <summary>
        /// Záložka
        /// </summary>
        [SuppressMessage("Microsoft.Design", "CA1034:NestedTypesShouldNotBeVisible")]
        protected class Tab : IDisposable
        {
            #region IDisposable
            /// <summary>
            /// Uvolnìní objektu
            /// </summary>
            public void Dispose()
            {
                Dispose(true);
                GC.SuppressFinalize(this);
            }
            /// <summary>
            /// uvolnìní objektu
            /// </summary>
            /// <param name="disposing">indikátor uvolnìní</param>
            protected virtual void Dispose(bool disposing) { }
            /// <summary>
            /// finalizer objektu
            /// </summary>
            ~Tab() { Dispose(false); }
            #endregion

            readonly IDockContent m_content;
            /// <summary>
            /// Obsah záložky
            /// </summary>
            public IDockContent Content { get { return m_content; } }
            /// <summary>
            /// Vytvoøení nové instance tøídy
            /// </summary>
            /// <param name="content">Dokoátelný obsah záložky</param>
            protected internal Tab(IDockContent content) { m_content = content; }
        }

        /// <summary>
        /// Kolekce záložek
        /// </summary>
        [SuppressMessage("Microsoft.Design", "CA1034:NestedTypesShouldNotBeVisible")]
        protected sealed class TabCollection : IEnumerable<Tab>
        {
            #region IEnumerable èleny
            IEnumerator<Tab> IEnumerable<Tab>.GetEnumerator()
            {
                for (int i = 0; i < Count; i++)
                    yield return this[i];
            }

            IEnumerator IEnumerable.GetEnumerator()
            {
                for (int i = 0; i < Count; i++)
                    yield return this[i];
            }
            #endregion

            readonly DockPane m_dockPane = null;
            /// <summary>
            /// Podokno ve kterém se nachází kolekce záložek
            /// </summary>
            public DockPane DockPane { get { return m_dockPane; } }
            /// <summary>
            /// Dokovátelný panel
            /// </summary>
            public DockPanel DockPanel { get { return DockPane.DockPanel; } }

            /// <summary>
            /// Poèet zobrazených obsahu okna
            /// </summary>
            public int Count { get { return DockPane.DisplayingContents.Count; } }

            /// <summary>
            /// Získání záložky dle pozice
            /// </summary>
            /// <param name="index">Pozice záložky</param>
            /// <returns></returns>
            public Tab this[int index]
            {
                get
                {
                    IDockContent content = DockPane.DisplayingContents[index];
                    if (content == null)
                        throw (new ArgumentOutOfRangeException(GResources.GetResourceText(29450038) + Convert.ToString(index) + GResources.GetResourceText(29450036))); //RC 29450038 : Index 
                    if (content.DockHandler.AutoHideTab == null)
                        content.DockHandler.AutoHideTab = (DockPanel.AutoHideStripControl.CreateTab(content));
                    return content.DockHandler.AutoHideTab as Tab;
                }
            }

            /// <summary>
            /// Zjištìní, zda kolekce obsahuje záložku
            /// </summary>
            /// <param name="tab">Záložka ke zjištìní</param>
            /// <returns></returns>
            public bool Contains(Tab tab) { return (IndexOf(tab) != -1); }

            /// <summary>
            /// Zjištìní, zda kolekce obsahuje obsah
            /// </summary>
            /// <param name="content">Obsah ke zjištìní</param>
            /// <returns></returns>
            public bool Contains(IDockContent content) { return (IndexOf(content) != -1); }

            /// <summary>
            /// Index záložky
            /// </summary>
            /// <param name="tab">Daná záložka</param>
            /// <returns></returns>
            public int IndexOf(Tab tab)
            {
                if (tab == null)
                    return -1;

                return IndexOf(tab.Content);
            }

            /// <summary>
            /// Získání pozice obsahu
            /// </summary>
            /// <param name="content">Daný obsah</param>
            /// <returns></returns>
            public int IndexOf(IDockContent content) { return DockPane.DisplayingContents.IndexOf(content); }

            /// <summary>
            /// Vytvoøení kolekce dle podokna
            /// </summary>
            /// <param name="pane">Podokno</param>
            internal TabCollection(DockPane pane) { m_dockPane = pane; }
        }

        /// <summary>
        /// Podokno
        /// </summary>
        [SuppressMessage("Microsoft.Design", "CA1034:NestedTypesShouldNotBeVisible")]
        protected class Pane : IDisposable
        {
            #region IDisposable
            /// <summary>
            /// uvolnìní objektu
            /// </summary>
            public void Dispose()
            {
                Dispose(true);
                GC.SuppressFinalize(this);
            }
            /// <summary>
            /// uvolnìní objektu
            /// </summary>
            /// <param name="disposing">indikátor uvolnìní</param>
            void Dispose(bool disposing)
            {
                if (disposing)
                    if (m_dockPane != null)
                        m_dockPane = null;
            }
            /// <summary>
            /// Uvolnění objektu
            /// </summary>
            ~Pane() { Dispose(false); }
            #endregion

            DockPane m_dockPane;
            /// <summary>
            /// Dokovatelné podokno daného okna
            /// </summary>
            public DockPane DockPane { get { return m_dockPane; } }

            /// <summary>
            /// kolekce samoskrývajících se záložek
            /// </summary>
            public TabCollection AutoHideTabs
            {
                get
                {
                    if (DockPane.AutoHideTabs == null)
                        DockPane.AutoHideTabs = new TabCollection(DockPane);
                    return DockPane.AutoHideTabs as TabCollection;
                }
            }

            /// <summary>
            /// Vytvoøení nové instance tøídy
            /// </summary>
            /// <param name="dockPane">Dokovatelné podokno</param>
            protected internal Pane(DockPane dockPane) { m_dockPane = dockPane; }
        }

        /// <summary>
        /// Kolekce podoken
        /// </summary>
        [SuppressMessage("Microsoft.Design", "CA1034:NestedTypesShouldNotBeVisible")]
        protected sealed class PaneCollection : IEnumerable<Pane>
        {
            class AutoHideState
            {
                public DockState m_dockState;
                public bool m_selected = false;
                /// <summary>
                /// vytvoøení nové instance tøídy
                /// </summary>
                /// <param name="dockState">stav dokování</param>
                public AutoHideState(DockState dockState) { m_dockState = dockState; }

                /// <summary>
                /// aktuální stav dokování
                /// </summary>
                public DockState DockState { get { return m_dockState; } }
                /// <summary>
                /// indikuje, vybranost 
                /// </summary>
                public bool Selected
                {
                    get { return m_selected; }
                    set { m_selected = value; }
                }
            }
            /// <summary>
            /// kolekce auto-hide stavù
            /// </summary>
            class AutoHideStateCollection
            {
                private AutoHideState[] m_states;
                /// <summary>
                /// vytvoøení nové instance tøídy
                /// </summary>
                public AutoHideStateCollection()
                {
                    m_states = new AutoHideState[]	{	
												new AutoHideState(DockState.DockTopAutoHide),
												new AutoHideState(DockState.DockBottomAutoHide),
												new AutoHideState(DockState.DockLeftAutoHide),
												new AutoHideState(DockState.DockRightAutoHide)
											};
                }
                /// <summary>
                /// získání auto-hide stavu dle stavu
                /// </summary>
                /// <param name="dockState"></param>
                /// <returns></returns>
                public AutoHideState this[DockState dockState]
                {
                    get
                    {
                        for (int i = 0; i < m_states.Length; i++)
                            if (m_states[i].DockState == dockState)
                                return m_states[i];
                        
                        throw new ArgumentOutOfRangeException("DockState" + Convert.ToString(dockState) + GResources.GetResourceText(29450037)); //RC 29450037 :  není v dané kolekcí!
                    }
                }
                /// <summary>
                /// indikuje existencí podokna
                /// </summary>
                /// <param name="pane"></param>
                /// <returns></returns>
                public bool ContainsPane(DockPane pane)
                {
                    if (pane.IsHidden)
                        return false;

                    for (int i = 0; i < m_states.Length; i++)
                        if (m_states[i].DockState == pane.DockState && m_states[i].Selected)
                            return true;
                    return false;
                }
            }

            /// <summary>
            /// Vytvoøení nové instance tøídy
            /// </summary>
            /// <param name="panel">Dokovací panel, kterému patøí tato kolekce</param>
            /// <param name="dockState">Status dokování</param>
            internal PaneCollection(DockPanel panel, DockState dockState)
            {
                m_dockPanel = panel;
                m_states = new AutoHideStateCollection();
                States[DockState.DockTopAutoHide].Selected = (dockState == DockState.DockTopAutoHide);
                States[DockState.DockBottomAutoHide].Selected = (dockState == DockState.DockBottomAutoHide);
                States[DockState.DockLeftAutoHide].Selected = (dockState == DockState.DockLeftAutoHide);
                States[DockState.DockRightAutoHide].Selected = (dockState == DockState.DockRightAutoHide);
            }

            private readonly DockPanel m_dockPanel;
            /// <summary>
            /// Dokovací panel, kterému patøí tato kolekce
            /// </summary>
            public DockPanel DockPanel { get { return m_dockPanel; } }

            private readonly AutoHideStateCollection m_states;
            /// <summary>
            /// Status dokování
            /// </summary>
            private AutoHideStateCollection States { get { return m_states; } }

            /// <summary>
            /// Poèet podoken dané kolece daného statusu
            /// </summary>
            public int Count
            {
                get
                {
                    int count = 0;
                    foreach (DockPane pane in DockPanel.Panes)
                        if (States.ContainsPane(pane))
                            count++;

                    return count;
                }
            }

            /// <summary>
            /// Získání podokna dle indexu
            /// </summary>
            /// <param name="index">Index hledaného podokna</param>
            /// <returns></returns>
            public Pane this[int index]
            {
                get
                {
                    int count = 0;
                    foreach (DockPane pane in DockPanel.Panes)
                    {
                        if (!States.ContainsPane(pane))
                            continue;

                        if (count == index)
                        {
                            if (pane.AutoHidePane == null)
                                pane.AutoHidePane = DockPanel.AutoHideStripControl.CreatePane(pane);
                            return pane.AutoHidePane as Pane;
                        }

                        count++;
                    }
                    throw new ArgumentOutOfRangeException(GResources.GetResourceText(29450038) + Convert.ToString(index) + GResources.GetResourceText(29450036)); //RC 29450036 :  je mimo rozsah!
                }
            }

            /// <summary>
            /// Zjištìní, zda kolekce obsahuje dané podokno
            /// </summary>
            /// <param name="pane">Dané podokno</param>
            /// <returns></returns>
            public bool Contains(Pane pane) { return (IndexOf(pane) != -1); }

            /// <summary>
            /// Pozice daného podokna v kolekci
            /// </summary>
            /// <param name="pane">Dané podokno</param>
            /// <returns></returns>
            public int IndexOf(Pane pane)
            {
                if (pane == null)
                    return -1;

                int index = 0;
                foreach (DockPane dockPane in DockPanel.Panes)
                {
                    if (!States.ContainsPane(pane.DockPane))
                        continue;

                    if (pane == dockPane.AutoHidePane)
                        return index;

                    index++;
                }
                return -1;
            }

            #region IEnumerable Members

            IEnumerator<Pane> IEnumerable<Pane>.GetEnumerator()
            {
                for (int i = 0; i < Count; i++)
                    yield return this[i];
            }

            IEnumerator IEnumerable.GetEnumerator()
            {
                for (int i = 0; i < Count; i++)
                    yield return this[i];
            }

            #endregion
        }

        /// <summary>
        /// Vytvoøení nové instance tøídy
        /// </summary>
        /// <param name="panel">Dokovací panel, kterému patøí pruh</param>
		protected AutoHideStripBase(DockPanel panel)
		{
			m_dockPanel = panel;
			m_panesTop = new PaneCollection(panel, DockState.DockTopAutoHide);
			m_panesBottom = new PaneCollection(panel, DockState.DockBottomAutoHide);
			m_panesLeft = new PaneCollection(panel, DockState.DockLeftAutoHide);
			m_panesRight = new PaneCollection(panel, DockState.DockRightAutoHide);

			SetStyle(ControlStyles.OptimizedDoubleBuffer, true);
			SetStyle(ControlStyles.Selectable, false);
		}

		private DockPanel m_dockPanel;
        /// <summary>
        /// Dokovací panel, kterému patøí daný pruh
        /// </summary>
        protected DockPanel DockPanel { get { return m_dockPanel; } }

		private PaneCollection m_panesTop;
        /// <summary>
        /// Kolekce podoken v horní èásti
        /// </summary>
        protected PaneCollection PanesTop { get { return m_panesTop; } }

		private PaneCollection m_panesBottom;
        /// <summary>
        /// Kolekce podoken dolní èásti
        /// </summary>
        protected PaneCollection PanesBottom { get { return m_panesBottom; } }

		private PaneCollection m_panesLeft;
        /// <summary>
        /// Kolekce levých podoken
        /// </summary>
        protected PaneCollection PanesLeft { get { return m_panesLeft; } }

		private PaneCollection m_panesRight;
        /// <summary>
        /// Kolekce pravých podoken
        /// </summary>
        protected PaneCollection PanesRight { get { return m_panesRight; } }

        /// <summary>
        /// Získání kolekce dle statusu
        /// </summary>
        /// <param name="dockState">Daný status</param>
        /// <returns></returns>
		protected PaneCollection GetPanes(DockState dockState)
		{
			if (dockState == DockState.DockTopAutoHide)
				return PanesTop;
			else if (dockState == DockState.DockBottomAutoHide)
				return PanesBottom;
			else if (dockState == DockState.DockLeftAutoHide)
				return PanesLeft;
			else if (dockState == DockState.DockRightAutoHide)
				return PanesRight;
			else
                throw new ArgumentOutOfRangeException(GResources.GetResourceText(29450039)); //RC 29450039 : DockState je nepodporovaného typu!
		}

        /// <summary>
        /// Získání poèet podoken daného statusu
        /// </summary>
        /// <param name="dockState">Dokovací status</param>
        /// <returns></returns>
        internal int GetNumberOfPanes(DockState dockState) { return GetPanes(dockState).Count; }

        /// <summary>
        /// Získání horního obdélníku
        /// </summary>
		protected Rectangle RectangleTopLeft
		{
			get
			{	
				int height = MeasureHeight();
				return PanesTop.Count > 0 && PanesLeft.Count > 0 ? new Rectangle(0, 0, height, height) 
                    : Rectangle.Empty;
			}
		}
        /// <summary>
        /// Získání pravého horního obdélníku
        /// </summary>
		protected Rectangle RectangleTopRight
		{
			get
			{
				int height = MeasureHeight();
				return PanesTop.Count > 0 && PanesRight.Count > 0 ? new Rectangle(Width - height, 0, height, height) 
                    : Rectangle.Empty;
			}
		}
        /// <summary>
        /// Získání levého dolního obdélníku
        /// </summary>
		protected Rectangle RectangleBottomLeft
		{
			get
			{
				int height = MeasureHeight();
				return PanesBottom.Count > 0 && PanesLeft.Count > 0 ? new Rectangle(0, Height - height, height, height) 
                    : Rectangle.Empty;
			}
		}
        /// <summary>
        /// Získání pravého dolního obdélníku
        /// </summary>
		protected Rectangle RectangleBottomRight
		{
			get
			{
				int height = MeasureHeight();
				return PanesBottom.Count > 0 && PanesRight.Count > 0 ? new Rectangle(Width - height, Height - height, height, height)
                    : Rectangle.Empty;
			}
		}
        /// <summary>
        /// Získání obdélníku záložky pruhu
        /// </summary>
        /// <param name="dockState">Status záložky</param>
        /// <returns></returns>
		protected internal Rectangle GetTabStripRectangle(DockState dockState)
		{
			int height = MeasureHeight();
			if (dockState == DockState.DockTopAutoHide && PanesTop.Count > 0)
				return new Rectangle(RectangleTopLeft.Width, 0, Width - RectangleTopLeft.Width - RectangleTopRight.Width, height);
			else if (dockState == DockState.DockBottomAutoHide && PanesBottom.Count > 0)
				return new Rectangle(RectangleBottomLeft.Width, Height - height, Width - RectangleBottomLeft.Width - RectangleBottomRight.Width, height);
			else if (dockState == DockState.DockLeftAutoHide && PanesLeft.Count > 0)
				return new Rectangle(0, RectangleTopLeft.Width, height, Height - RectangleTopLeft.Height - RectangleBottomLeft.Height);
			else if (dockState == DockState.DockRightAutoHide && PanesRight.Count > 0)
				return new Rectangle(Width - height, RectangleTopRight.Width, height, Height - RectangleTopRight.Height - RectangleBottomRight.Height);
			else
				return Rectangle.Empty;
		}

		private GraphicsPath m_displayingArea = null;
		private GraphicsPath DisplayingArea
		{
			get
			{
				if (m_displayingArea == null)
					m_displayingArea = new GraphicsPath();

				return m_displayingArea;
			}
		}

		private void SetRegion()
		{
			DisplayingArea.Reset();
			DisplayingArea.AddRectangle(RectangleTopLeft);
			DisplayingArea.AddRectangle(RectangleTopRight);
			DisplayingArea.AddRectangle(RectangleBottomLeft);
			DisplayingArea.AddRectangle(RectangleBottomRight);
			DisplayingArea.AddRectangle(GetTabStripRectangle(DockState.DockTopAutoHide));
			DisplayingArea.AddRectangle(GetTabStripRectangle(DockState.DockBottomAutoHide));
			DisplayingArea.AddRectangle(GetTabStripRectangle(DockState.DockLeftAutoHide));
			DisplayingArea.AddRectangle(GetTabStripRectangle(DockState.DockRightAutoHide));
			Region = new Region(DisplayingArea);
		}

        /// <exclude/>
        protected override void OnMouseDown(MouseEventArgs e)
		{
			base.OnMouseDown(e);

			if (e.Button != MouseButtons.Left)
				return;

			IDockContent content = HitTest();
			if (content == null)
				return;

			content.DockHandler.Activate();
		}

        /// <exclude/>
        protected override void OnMouseHover(EventArgs e)
		{
			base.OnMouseHover(e);

			IDockContent content = HitTest();
			if (content != null && DockPanel.ActiveAutoHideContent != content)
				DockPanel.ActiveAutoHideContent = content;
            
            ResetMouseEventArgs();
		}
        /// <exclude/>
		protected override void OnLayout(LayoutEventArgs levent)
		{
			RefreshChanges();
			base.OnLayout (levent);
		}
        /// <summary>
        /// Aktualizace zmìn
        /// </summary>
		internal void RefreshChanges()
		{
            if (IsDisposed)
                return;

			SetRegion();
			OnRefreshChanges();
		}

        /// <summary>
        /// Aktualizace zmìn
        /// </summary>
        protected virtual void OnRefreshChanges() { }

        /// <summary>
        /// Mìøení výšky
        /// </summary>
        /// <returns></returns>
		protected internal abstract int MeasureHeight();

		private IDockContent HitTest()
		{
			Point ptMouse = PointToClient(Control.MousePosition);
			return HitTest(ptMouse);
		}
        /// <summary>
        /// Vytvoøení záložky s daným obsahem
        /// </summary>
        /// <param name="content">Obsah záložky</param>
        /// <returns></returns>
        protected virtual Tab CreateTab(IDockContent content) { return new Tab(content); }
        /// <summary>
        /// Vytvoøení podokna s obsahem
        /// </summary>
        /// <param name="dockPane">Dokovací podokno</param>
        /// <returns></returns>
        protected virtual Pane CreatePane(DockPane dockPane) { return new Pane(dockPane); }
        /// <exclude/>
		protected abstract IDockContent HitTest(Point point);

        private void InitializeComponent()
        {
            this.SuspendLayout();
            this.ResumeLayout(false);

        }
	}
}

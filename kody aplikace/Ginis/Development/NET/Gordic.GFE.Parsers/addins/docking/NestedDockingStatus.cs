//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.NestedDockingStatus.cs                 </Name>
//    <Description> Dokovatelné stavy vnoøených objektu                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System.Drawing;

namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Dokovatelné stavy vnoøených objektu
    /// </summary>
    public sealed class NestedDockingStatus
    {
        internal NestedDockingStatus(DockPane pane)
        {
            m_dockPane = pane;
        }

        private readonly DockPane m_dockPane = null;
        /// <summary>
        /// Dokovací podokno
        /// </summary>
        public DockPane DockPane
        {
            get { return m_dockPane; }
        }

        private NestedPaneCollection m_nestedPanes = null;
        /// <summary>
        /// Vnoøené podokna
        /// </summary>
        public NestedPaneCollection NestedPanes
        {
            get { return m_nestedPanes; }
        }

        private DockPane m_previousPane = null;
        /// <summary>
        /// Pøedchozí podokno
        /// </summary>
        public DockPane PreviousPane
        {
            get { return m_previousPane; }
        }

        private DockAlignment m_alignment = DockAlignment.Left;
        /// <summary>
        /// Zarovnání
        /// </summary>
        public DockAlignment Alignment
        {
            get { return m_alignment; }
        }

        private double m_proportion = 0.5;
        /// <summary>
        /// Proporce
        /// </summary>
        public double Proportion
        {
            get { return m_proportion; }
        }

        private bool m_isDisplaying = false;
        /// <summary>
        /// Je zbrazeno
        /// </summary>
        public bool IsDisplaying
        {
            get { return m_isDisplaying; }
        }

        private DockPane m_displayingPreviousPane = null;
        /// <summary>
        /// Zobrazené pøedchozí podokno
        /// </summary>
        public DockPane DisplayingPreviousPane
        {
            get { return m_displayingPreviousPane; }
        }

        private DockAlignment m_displayingAlignment = DockAlignment.Left;
        /// <summary>
        /// Zobrazené zarovnání
        /// </summary>
        public DockAlignment DisplayingAlignment
        {
            get { return m_displayingAlignment; }
        }

        private double m_displayingProportion = 0.5;
        /// <summary>
        /// Zobrazené proporce
        /// </summary>
        public double DisplayingProportion
        {
            get { return m_displayingProportion; }
        }

        private Rectangle m_logicalBounds = Rectangle.Empty;
        /// <summary>
        /// Locální meze
        /// </summary>
        public Rectangle LogicalBounds
        {
            get { return m_logicalBounds; }
        }

        private Rectangle m_paneBounds = Rectangle.Empty;
        /// <summary>
        /// Meze podokna
        /// </summary>
        public Rectangle PaneBounds
        {
            get { return m_paneBounds; }
        }

        private Rectangle m_splitterBounds = Rectangle.Empty;
        /// <summary>
        /// meze splitteru
        /// </summary>
        public Rectangle SplitterBounds
        {
            get { return m_splitterBounds; }
        }

        internal void SetStatus(NestedPaneCollection nestedPanes, DockPane previousPane, DockAlignment alignment, double proportion)
        {
            m_nestedPanes = nestedPanes;
            m_previousPane = previousPane;
            m_alignment = alignment;
            m_proportion = proportion;
        }

        internal void SetDisplayingStatus(bool isDisplaying, DockPane displayingPreviousPane, DockAlignment displayingAlignment, double displayingProportion)
        {
            m_isDisplaying = isDisplaying;
            m_displayingPreviousPane = displayingPreviousPane;
            m_displayingAlignment = displayingAlignment;
            m_displayingProportion = displayingProportion;
        }

        internal void SetDisplayingBounds(Rectangle logicalBounds, Rectangle paneBounds, Rectangle splitterBounds)
        {
            m_logicalBounds = logicalBounds;
            m_paneBounds = paneBounds;
            m_splitterBounds = splitterBounds;
        }
    }
}

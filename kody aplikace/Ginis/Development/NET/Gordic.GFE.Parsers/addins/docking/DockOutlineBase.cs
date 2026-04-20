//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DockOutlineBase.cs                     </Name>
//    <Description> Základní tøída pro dokování ohranièení                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System.Drawing;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Základní tøída pro dokování ohranièení
    /// </summary>
    abstract class DockOutlineBase
    {
        private Rectangle m_oldFloatWindowBounds;
        protected Rectangle OldFloatWindowBounds { get => m_oldFloatWindowBounds; }

        private Control m_oldDockTo;
        protected Control OldDockTo { get => m_oldDockTo; }

        private DockStyle m_oldDock;
        protected DockStyle OldDock { get => m_oldDock; }

        private int m_oldContentIndex;
        protected int OldContentIndex { get => m_oldContentIndex; }

        protected bool SameAsOldValue
        {
            get => FloatWindowBounds == OldFloatWindowBounds &&
                    DockTo == OldDockTo &&
                    Dock == OldDock &&
                    ContentIndex == OldContentIndex;
        }

        private Rectangle m_floatWindowBounds;
        /// <summary>
        /// Rámec plovoucího okna
        /// </summary>
        public Rectangle FloatWindowBounds { get => m_floatWindowBounds; }

        private Control m_dockTo;
        /// <summary>
        /// Ovladaè do kterého se provádí dokování
        /// </summary>
        public Control DockTo { get => m_dockTo; }

        private DockStyle m_dock;
        /// <summary>
        /// Styl dokování
        /// </summary>
        public DockStyle Dock { get => m_dock; }

        private int m_contentIndex;
        /// <summary>
        /// Index zobrazeného obsahu
        /// </summary>
        public int ContentIndex { get => m_contentIndex; }

        public bool FlagFullEdge { get => m_contentIndex != 0; }

        bool m_flagTestDrop = false;
        public bool FlagTestDrop
        {
            get => m_flagTestDrop;
            set { m_flagTestDrop = value; }
        }

        /// <summary>
        /// Zobrazení
        /// </summary>
        protected abstract void OnShow();
        /// <summary>
        /// Zavøení
        /// </summary>
        protected abstract void OnClose();

        /// <summary>
        /// Vytvoøení nové instance tøídy
        /// </summary>
        public DockOutlineBase() { Init(); }

        /// <summary>
        /// Zobrazení dokovaného obsahu
        /// </summary>
        public void Show()
        {
            SaveOldValues();
            SetValues(Rectangle.Empty, null, DockStyle.None, -1);
            TestChange();
        }
        /// <summary>
        /// Zobrazení dokovaného obsahu
        /// </summary>
        /// <param name="pane">Podokno pro zobrazení</param>
        /// <param name="dock">Styl dokování</param>
        public void Show(DockPane pane, DockStyle dock)
        {
            SaveOldValues();
            SetValues(Rectangle.Empty, pane, dock, -1);
            TestChange();
        }
        /// <summary>
        /// Zobrazení obsahu
        /// </summary>
        /// <param name="pane">Podokno pro zobrazení</param>
        /// <param name="contentIndex">Pozice obsahu pro zobrazení</param>
        public void Show(DockPane pane, int contentIndex)
        {
            SaveOldValues();
            SetValues(Rectangle.Empty, pane, DockStyle.Fill, contentIndex);
            TestChange();
        }
        /// <summary>
        /// Zobrazení obsahu
        /// </summary>
        /// <param name="dockPanel">Panel pro zobrazovaný obsah</param>
        /// <param name="dock">Styl dokování</param>
        /// <param name="fullPanelEdge"></param>
        public void Show(DockPanel dockPanel, DockStyle dock, bool fullPanelEdge)
        {
            SaveOldValues();
            SetValues(Rectangle.Empty, dockPanel, dock, fullPanelEdge ? -1 : 0);
            TestChange();
        }
        /// <summary>
        /// Zobrazení obsahu
        /// </summary>
        /// <param name="floatWindowBounds">Hranice plovoucího okna</param>
        public void Show(Rectangle floatWindowBounds)
        {
            SaveOldValues();
            SetValues(floatWindowBounds, null, DockStyle.None, -1);
            TestChange();
        }
        /// <summary>
        /// Zavøení obsahu
        /// </summary>
        public void Close() { OnClose(); }

        void SetValues(Rectangle floatWindowBounds, Control dockTo, DockStyle dock, int contentIndex)
        {
            m_floatWindowBounds = floatWindowBounds;
            m_dockTo = dockTo;
            m_dock = dock;
            m_contentIndex = contentIndex;
            FlagTestDrop = true;
        }
        void TestChange()
        {
            if (m_floatWindowBounds != m_oldFloatWindowBounds ||
                m_dockTo != m_oldDockTo ||
                m_dock != m_oldDock ||
                m_contentIndex != m_oldContentIndex)
                OnShow();
        }
        void SaveOldValues()
        {
            m_oldDockTo = m_dockTo;
            m_oldDock = m_dock;
            m_oldContentIndex = m_contentIndex;
            m_oldFloatWindowBounds = m_floatWindowBounds;
        }
        void Init()
        {
            SetValues(Rectangle.Empty, null, DockStyle.None, -1);
            SaveOldValues();
        }
    }
}

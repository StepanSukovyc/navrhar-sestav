//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DockPanelExtender.cs                   </Name>
//    <Description> Tøída prodloužení dokovacího panelu                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;
using System.Diagnostics.CodeAnalysis;

namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Tøída prodloužení dokovacího panelu
    /// </summary>
	public sealed class DockPanelExtender
	{
        /// <summary>
        /// Rozhraní pro fabriku na dokované podokna
        /// </summary>
        [SuppressMessage("Microsoft.Design", "CA1034:NestedTypesShouldNotBeVisible")]
        public interface IDockPaneFactory
		{
            /// <summary>
            /// Vytvoøení dokovaného podokna
            /// </summary>
            /// <param name="content">Obsah podokna</param>
            /// <param name="visibleState">Vizuální stav</param>
            /// <param name="show">Indikuje zobrazení po vytvoøení</param>
            /// <returns></returns>
			DockPane CreateDockPane(IDockContent content, DockState visibleState, bool show);
            /// <summary>
            /// Vytvoøení dokovaného podokna
            /// </summary>
            /// <param name="content">Obsah podokna</param>
            /// <param name="floatWindow">Plovoucí okno</param>
            /// <param name="show">Indikuje zobrazení po vytvoøení</param>
            /// <returns></returns>
            [SuppressMessage("Microsoft.Naming", "CA1720:AvoidTypeNamesInParameters", MessageId = "1#")]            
			DockPane CreateDockPane(IDockContent content, FloatWindow floatWindow, bool show);
            /// <summary>
            /// Vytvoøení dokovaného podokna
            /// </summary>
            /// <param name="content">Obsah podokna</param>
            /// <param name="previousPane">Pøedchozí podokno</param>
            /// <param name="alignment">Pozice</param>
            /// <param name="proportion"></param>
            /// <param name="show">Indikuje zobrazení po vytvoøení</param>
            /// <returns></returns>
			DockPane CreateDockPane(IDockContent content, DockPane previousPane, DockAlignment alignment, double proportion, bool show);
            /// <summary>
            /// Vytvoøení dokovaného podokna
            /// </summary>
            /// <param name="content">Obsah podokna</param>
            /// <param name="floatWindowBounds">Rámec plovoucího okna</param>
            /// <param name="show">Indikuje zobrazení po vytvoøení</param>
            /// <returns></returns>
            [SuppressMessage("Microsoft.Naming", "CA1720:AvoidTypeNamesInParameters", MessageId = "1#")]
			DockPane CreateDockPane(IDockContent content, Rectangle floatWindowBounds, bool show);
		}

        /// <summary>
        /// Rozhraní pro fabriku plovoucích oken
        /// </summary>
        [SuppressMessage("Microsoft.Design", "CA1034:NestedTypesShouldNotBeVisible")]
        public interface IFloatWindowFactory
		{
            /// <summary>
            /// Vytvoøení plovoucího okna
            /// </summary>
            /// <param name="dockPanel">Dokovací panel</param>
            /// <param name="pane">Podokno</param>
            /// <returns></returns>
			FloatWindow CreateFloatWindow(DockPanel dockPanel, DockPane pane);
            /// <summary>
            /// Vytvoøení plovoucího okna
            /// </summary>
            /// <param name="dockPanel">Panel</param>
            /// <param name="pane">Podokno</param>
            /// <param name="bounds">Rámec</param>
            /// <returns></returns>
			FloatWindow CreateFloatWindow(DockPanel dockPanel, DockPane pane, Rectangle bounds);
		}

        /// <summary>
        /// Rozhraní pro fabriku na dokovácí titulek
        /// </summary>
        [SuppressMessage("Microsoft.Design", "CA1034:NestedTypesShouldNotBeVisible")]
        public interface IDockPaneCaptionFactory
		{
            /// <summary>
            /// Vytvoøení dokovacího titulku
            /// </summary>
            /// <param name="pane">Podokno</param>
            /// <returns></returns>
			DockPaneCaptionBase CreateDockPaneCaption(DockPane pane);
		}

        /// <summary>
        /// Rozhraní pro dokovací pruh
        /// </summary>
        [SuppressMessage("Microsoft.Design", "CA1034:NestedTypesShouldNotBeVisible")]
        public interface IDockPaneStripFactory
		{
            /// <summary>
            /// Vytvoøení dokovacího pruhu
            /// </summary>
            /// <param name="pane">Dokovací podokno</param>
            /// <returns></returns>
			DockPaneStripBase CreateDockPaneStrip(DockPane pane);
		}

        /// <summary>
        /// Rozhraní pro fabriku na samoskrývající pruhy
        /// </summary>
        [SuppressMessage("Microsoft.Design", "CA1034:NestedTypesShouldNotBeVisible")]
        public interface IAutoHideStripFactory
		{
            /// <summary>
            /// Vytvoøení samoskrývajícího pruhu
            /// </summary>
            /// <param name="panel">Dokovací panel</param>
            /// <returns></returns>
			AutoHideStripBase CreateAutoHideStrip(DockPanel panel);
		}

		#region DefaultDockPaneFactory
		private class DefaultDockPaneFactory : IDockPaneFactory
		{
			public DockPane CreateDockPane(IDockContent content, DockState visibleState, bool show)
			{
				return new DockPane(content, visibleState, show);
			}

			public DockPane CreateDockPane(IDockContent content, FloatWindow floatWindow, bool show)
			{
				return new DockPane(content, floatWindow, show);
			}

			public DockPane CreateDockPane(IDockContent content, DockPane prevPane, DockAlignment alignment, double proportion, bool show)
			{
				return new DockPane(content, prevPane, alignment, proportion, show);
			}

			public DockPane CreateDockPane(IDockContent content, Rectangle floatWindowBounds, bool show)
			{
				return new DockPane(content, floatWindowBounds, show);
			}
		}
		#endregion

		#region DefaultFloatWindowFactory
		private class DefaultFloatWindowFactory : IFloatWindowFactory
		{
			public FloatWindow CreateFloatWindow(DockPanel dockPanel, DockPane pane)
			{
				return new FloatWindow(dockPanel, pane);
			}

			public FloatWindow CreateFloatWindow(DockPanel dockPanel, DockPane pane, Rectangle bounds)
			{
				return new FloatWindow(dockPanel, pane, bounds);
			}
		}
		#endregion

		#region DefaultDockPaneCaptionFactory
		private class DefaultDockPaneCaptionFactory : IDockPaneCaptionFactory
		{
			public DockPaneCaptionBase CreateDockPaneCaption(DockPane pane)
			{
				return new VS2005DockPaneCaption(pane);
			}
		}
		#endregion

		#region DefaultDockPaneTabStripFactory
		private class DefaultDockPaneStripFactory : IDockPaneStripFactory
		{
			public DockPaneStripBase CreateDockPaneStrip(DockPane pane)
			{
				return new VS2005DockPaneStrip(pane);
			}
		}
		#endregion

		#region DefaultAutoHideStripFactory
		private class DefaultAutoHideStripFactory : IAutoHideStripFactory
		{
			public AutoHideStripBase CreateAutoHideStrip(DockPanel panel)
			{
				return new VS2005AutoHideStrip(panel);
			}
		}
		#endregion

		internal DockPanelExtender(DockPanel dockPanel)
		{
			m_dockPanel = dockPanel;
		}

		private readonly DockPanel m_dockPanel;
		private DockPanel DockPanel
		{
			get	{	return m_dockPanel;	}
		}

		private IDockPaneFactory m_dockPaneFactory = null;
        /// <summary>
        /// Fabrika na dokovací podokna
        /// </summary>
		public IDockPaneFactory DockPaneFactory
		{
			get
			{
				if (m_dockPaneFactory == null)
					m_dockPaneFactory = new DefaultDockPaneFactory();

				return m_dockPaneFactory;
			}
			set
			{
				if (DockPanel.Panes.Count > 0)
					throw new InvalidOperationException();

				m_dockPaneFactory = value;
			}
		}

		private IFloatWindowFactory m_floatWindowFactory = null;
        /// <summary>
        /// Fabrika na plovoucí okna
        /// </summary>
		public IFloatWindowFactory FloatWindowFactory
		{
			get
			{
				if (m_floatWindowFactory == null)
					m_floatWindowFactory = new DefaultFloatWindowFactory();

				return m_floatWindowFactory;
			}
			set
			{
				if (DockPanel.FloatWindows.Count > 0)
					throw new InvalidOperationException();

				m_floatWindowFactory = value;
			}
		}

		private IDockPaneCaptionFactory m_dockPaneCaptionFactory = null;
        /// <summary>
        /// Fabrika na plovoucí titulek
        /// </summary>
		public IDockPaneCaptionFactory DockPaneCaptionFactory
		{	
			get
			{
				if (m_dockPaneCaptionFactory == null)
					m_dockPaneCaptionFactory = new DefaultDockPaneCaptionFactory();

				return m_dockPaneCaptionFactory;
			}
			set
			{
				if (DockPanel.Panes.Count > 0)
					throw new InvalidOperationException();

				m_dockPaneCaptionFactory = value;
			}
		}

		private IDockPaneStripFactory m_dockPaneStripFactory = null;
        /// <summary>
        /// Fabrika na dokovatelný pruh
        /// </summary>
		public IDockPaneStripFactory DockPaneStripFactory
		{
			get
			{
				if (m_dockPaneStripFactory == null)
					m_dockPaneStripFactory = new DefaultDockPaneStripFactory();

				return m_dockPaneStripFactory;
			}
			set
			{
				if (DockPanel.Contents.Count > 0)
					throw new InvalidOperationException();

				m_dockPaneStripFactory = value;
			}
		}

		private IAutoHideStripFactory m_autoHideStripFactory = null;
        /// <summary>
        /// Fabrika na samoskrývající pruh
        /// </summary>
		public IAutoHideStripFactory AutoHideStripFactory
		{	
			get
			{
				if (m_autoHideStripFactory == null)
					m_autoHideStripFactory = new DefaultAutoHideStripFactory();

				return m_autoHideStripFactory;
			}
			set
			{
				if (DockPanel.Contents.Count > 0)
					throw new InvalidOperationException();

				if (m_autoHideStripFactory == value)
					return;

				m_autoHideStripFactory = value;
                DockPanel.ResetAutoHideStripControl();
			}
		}
	}
}

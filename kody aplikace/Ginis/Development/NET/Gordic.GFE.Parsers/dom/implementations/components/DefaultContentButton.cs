//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DefaultContentButton.cs                  </Name>
//    <Description> Button                                                      </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2016-10-19                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.Report.Implementation;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Button
    /// </summary>
    public class DefaultContentButton : DefaultAbstractContent, IScriptable, IDefaultDataBound, IMouseComponent
    {
        #region Init

        DefaultDataManager m_manager;
        System.Data.DataRow m_datarow;

        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="item">položka s informaci o objektu</param>
        /// <param name="view">pohled objektu</param>
        public override void Initialize(GFEFormatTag item, IViewContent view)
        {
            base.Initialize(item, view);
            ComponentType = ComponentType.button;
            LoadInformation();
        }
        /// <summary>Správce skriptů</summary>
        public ScriptManager ScriptManager { get { return m_manager.ScriptManager; } }

        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            if (isLoaded)
                return;

            base.LoadInformation();

            Text.Align.Horizontal = HAlign.center;
            Text.Align.Vertical = VAlign.center;

            if (FormatTag != null)
            {
                //čtení textu tlačítka
                Text.Text = FormatTag.Attributes.GetValueDefault("text");
                if (string.IsNullOrEmpty(Text.Text))
                    if (FormatTag is GFEFormatUnknownContent but)
                        Text.Text = but.InnerText;
                if (string.IsNullOrEmpty(Text.Text))
                    Text.Text = FormatTag.Attributes.GetValueDefault("value");
            }
            isLoaded = true;
        }
        /// <summary>
        /// napojení dat k objektu
        /// </summary>
        /// <param name="dataRegion">region s daty</param>
        protected override void AttachData(IDataRegion dataRegion)
        {
            if (dataRegion != null)
            {
                m_manager = dataRegion.Manager;
                m_datarow = dataRegion.GetDataRow(AttrList, out _);
            }
        }
        #endregion

        #region IMouseComponent
        /// <summary>
        /// kliknutí tlačítka
        /// </summary>
        /// <param name="x">abscissa kliknutí</param>
        /// <param name="y">ordinata kliknutí</param>
        public void Click(float x, float y)
        {
            OnClickEvent(EventArgs.Empty);
            GScript s;
            var l_script = Scripts.GetValueDefault("onClick", string.Empty);
            if (l_script.Length == 0) return;
            s = ScriptManager.PrepareScript(FormatTag, "onClick", l_script, this);
            if (s == null) return;
            try { ScriptManager.RunScript(s); }
            finally { s.Dispose(); }
        }

        //---------------------------------------------------------------------
        public event EventHandler ClickEvent;
        /// <exclude/>
        protected virtual void OnClickEvent(EventArgs e)
        {
            ClickEvent?.Invoke(this, e);
        }


        void IMouseComponent.HoverEnd()
        {
            (PagePanel as FillerPagePanel).TkHoverEnd(this);
        }
        void IMouseComponent.Hover(float x, float y)
        {
            (PagePanel as FillerPagePanel).TkHover(this, x, y, true);
        }
        #endregion

        #region IScriptable Members

        int IScriptable.getProperty(string name, out IDataScriptable value)
        {
            return base.GetProperty(ScriptManager, name, out value);
        }

        int IScriptable.setProperty(string name, IDataScriptable value)
        {
            return base.SetProperty(ScriptManager, name, value);
        }

        #endregion
        #region IDefaultDataBound Members
        System.Data.DataRow IDefaultDataBound.DataRow
        {
            get { return m_datarow; }
        }
        DefaultDataManager IDefaultDataBound.DataManager
        {
            get { return m_manager; }
        }
        #endregion

        public override void OnPaint(Graphics graphics, PaintArgs args)
        {
            base.OnPaint(graphics, args);
        }
        //[System.Runtime.InteropServices.DllImport("gdi32.dll", EntryPoint = "Rectangle")]
        //static extern bool WinApiRectangle(IntPtr hdc, int nLeftRect, int nTopRect, int nRightRect, int nBottomRect);
        protected override void DrawClear(Graphics graphics, IDefaultDataItem item)
        {
            base.DrawClear(graphics, item);
            if (ContentBounds.IsEmpty) return;

            if (this.PagePanel == null)
            {
                graphics.FillRectangle(Brushes.Silver, ContentBounds.X, ContentBounds.Y, ContentBounds.Width, ContentBounds.Height);
                graphics.DrawRectangle(Pens.Gray, ContentBounds.X, ContentBounds.Y, ContentBounds.Width, ContentBounds.Height);
            }
            else
                PaintTk(graphics);
        }
        private void PaintTk(Graphics graphics)
        {
            System.Windows.Forms.ButtonRenderer.DrawButton(graphics, Rectangle.Truncate(ContentBounds), System.Windows.Forms.VisualStyles.PushButtonState.Normal);

            //graphics.DrawLine(Pens.Red, LeftZoom, TopZoom, LeftZoom + WidthZoom, TopZoom + HeightZoom);
            //try
            //{
            //    IntPtr dc = graphics.GetHdc();
            //    WinApiRectangle(dc, (int)LeftZoom + 5, (int)TopZoom + 5, (int)LeftZoom + (int)WidthZoom - 10, (int)TopZoom + (int)HeightZoom - 10);
            //}
            //finally
            //{
            //    graphics.ReleaseHdc();
            //}
        }
    }
}

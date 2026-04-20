//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DockAreasEditor.cs                     </Name>
//    <Description> Editor dokovatelné plochy                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using System.Drawing;
using System.Drawing.Design;
using System.Windows.Forms;
using System.Windows.Forms.Design;
using Gordic.General;

namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Editor dokovatelné plochy
    /// </summary>
    class DockAreasEditor : UITypeEditor, IDisposable
    {
        #region IDisposable
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
                if (m_ui != null)
                {
                    m_ui.Dispose();
                    m_ui = null;
                }
        }
        ~DockAreasEditor() { Dispose(false); }
        #endregion
        class DockAreasEditorControl : System.Windows.Forms.UserControl
        {
            private readonly CheckBox checkBoxFloat, checkBoxDockLeft, checkBoxDockRight, checkBoxDockTop, checkBoxDockBottom, checkBoxDockFill;
            private DockAreas m_oldDockAreas;
            /// <summary>
            /// dokovatelná plocha
            /// </summary>
			public DockAreas DockAreas
            {
                get
                {
                    DockAreas dockAreas = 0;
                    if (checkBoxFloat.Checked)
                        dockAreas |= DockAreas.Float;
                    if (checkBoxDockLeft.Checked)
                        dockAreas |= DockAreas.DockLeft;
                    if (checkBoxDockRight.Checked)
                        dockAreas |= DockAreas.DockRight;
                    if (checkBoxDockTop.Checked)
                        dockAreas |= DockAreas.DockTop;
                    if (checkBoxDockBottom.Checked)
                        dockAreas |= DockAreas.DockBottom;
                    if (checkBoxDockFill.Checked)
                        dockAreas |= DockAreas.Document;

                    if (dockAreas == 0)
                        return m_oldDockAreas;
                    else
                        return dockAreas;
                }
            }
            /// <summary>
            /// vytvoøení nové instance tøídy
            /// </summary>
			public DockAreasEditorControl()
            {
                checkBoxFloat = new CheckBox();
                checkBoxDockLeft = new CheckBox();
                checkBoxDockRight = new CheckBox();
                checkBoxDockTop = new CheckBox();
                checkBoxDockBottom = new CheckBox();
                checkBoxDockFill = new CheckBox();

                SuspendLayout();

                checkBoxFloat.Appearance = Appearance.Button;
                checkBoxFloat.Dock = DockStyle.Top;
                checkBoxFloat.Height = 24;
                checkBoxFloat.Text = GResources.GetResourceText(29450040); //RC 29450040 : (text plovoucího zaškrtávajícího políèka)
                checkBoxFloat.TextAlign = ContentAlignment.MiddleCenter;
                checkBoxFloat.FlatStyle = FlatStyle.System;

                checkBoxDockLeft.Appearance = System.Windows.Forms.Appearance.Button;
                checkBoxDockLeft.Dock = System.Windows.Forms.DockStyle.Left;
                checkBoxDockLeft.Width = 24;
                checkBoxDockLeft.FlatStyle = FlatStyle.System;

                checkBoxDockRight.Appearance = System.Windows.Forms.Appearance.Button;
                checkBoxDockRight.Dock = System.Windows.Forms.DockStyle.Right;
                checkBoxDockRight.Width = 24;
                checkBoxDockRight.FlatStyle = FlatStyle.System;

                checkBoxDockTop.Appearance = System.Windows.Forms.Appearance.Button;
                checkBoxDockTop.Dock = System.Windows.Forms.DockStyle.Top;
                checkBoxDockTop.Height = 24;
                checkBoxDockTop.FlatStyle = FlatStyle.System;

                checkBoxDockBottom.Appearance = System.Windows.Forms.Appearance.Button;
                checkBoxDockBottom.Dock = System.Windows.Forms.DockStyle.Bottom;
                checkBoxDockBottom.Height = 24;
                checkBoxDockBottom.FlatStyle = FlatStyle.System;

                checkBoxDockFill.Appearance = System.Windows.Forms.Appearance.Button;
                checkBoxDockFill.Dock = System.Windows.Forms.DockStyle.Fill;
                checkBoxDockFill.FlatStyle = FlatStyle.System;

                this.Controls.AddRange(new Control[] {
                                                         checkBoxDockFill,
                                                         checkBoxDockBottom,
                                                         checkBoxDockTop,
                                                         checkBoxDockRight,
                                                         checkBoxDockLeft,
                                                         checkBoxFloat});

                Size = new System.Drawing.Size(160, 144);
                BackColor = SystemColors.Control;
                ResumeLayout();
            }
            /// <summary>
            /// nastavení stavu dle dokovatelné plochy
            /// </summary>
            /// <param name="dockAreas">daná dokovatelná plocha</param>
			public void SetStates(DockAreas dockAreas)
            {
                m_oldDockAreas = dockAreas;
                if ((dockAreas & DockAreas.DockLeft) != 0)
                    checkBoxDockLeft.Checked = true;
                if ((dockAreas & DockAreas.DockRight) != 0)
                    checkBoxDockRight.Checked = true;
                if ((dockAreas & DockAreas.DockTop) != 0)
                    checkBoxDockTop.Checked = true;
                if ((dockAreas & DockAreas.DockTop) != 0)
                    checkBoxDockTop.Checked = true;
                if ((dockAreas & DockAreas.DockBottom) != 0)
                    checkBoxDockBottom.Checked = true;
                if ((dockAreas & DockAreas.Document) != 0)
                    checkBoxDockFill.Checked = true;
                if ((dockAreas & DockAreas.Float) != 0)
                    checkBoxFloat.Checked = true;
            }
        }

        private DockAreasEditor.DockAreasEditorControl m_ui = null;
        /// <summary>
        /// Získání stylu eidtace
        /// </summary>
        /// <param name="context">Kontext</param>
        /// <returns></returns>
		public override UITypeEditorEditStyle GetEditStyle(ITypeDescriptorContext context)
        {
            return UITypeEditorEditStyle.DropDown;
        }
        /// <summary>
        /// Editace hodnoty
        /// </summary>
        /// <param name="context">Kontext</param>
        /// <param name="sp">Poskytovatel služby</param>
        /// <param name="value">Nová hodnota</param>
        /// <returns></returns>
		public override object EditValue(ITypeDescriptorContext context, IServiceProvider sp, object value)
        {
            if (m_ui == null)
                m_ui = new DockAreasEditor.DockAreasEditorControl();

            m_ui.SetStates((DockAreas)value);

            IWindowsFormsEditorService edSvc = (IWindowsFormsEditorService)sp.GetService(typeof(IWindowsFormsEditorService));
            edSvc.DropDownControl(m_ui);

            return m_ui.DockAreas;
        }
    }
}

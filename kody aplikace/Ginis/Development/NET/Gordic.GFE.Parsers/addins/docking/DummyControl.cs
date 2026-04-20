//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DummyControl.cs                        </Name>
//    <Description> Ovladaè dummy                                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-04                                                  </Created>
//  </FileHeader>

using System.Windows.Forms;

namespace Gordic.GFE.Parsers.Docking
{
    /// <summary>
    /// Ovladaè dummy
    /// </summary>
	class DummyControl : Control
	{
        /// <summary>
        /// Vytvoøení nové instance tøídy
        /// </summary>
		public DummyControl()
		{
			SetStyle(ControlStyles.Selectable, false);
		}

        private void InitializeComponent()
        {
            this.SuspendLayout();
            this.ResumeLayout(false);

        }
	}
}

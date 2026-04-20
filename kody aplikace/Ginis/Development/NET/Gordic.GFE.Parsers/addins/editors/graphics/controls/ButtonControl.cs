//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ButtonControl.cs                         </Name>
//    <Description> Vlastní Button používaný na stránkách                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2012                            </Copyright>
//    <Created>     2012-03-21                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using Gordic.WinForms.Controls;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Vlastní Button používaný na stránkách
    /// </summary>
    public class ButtonControl : GButton, IEditControl
    {
        string IEditControl.GetString() { return Text; }

        /// <summary>
        /// 
        /// </summary>
        public object Content
        {
            get;
            set;
        }


        /// <summary>
        /// 
        /// </summary>
        public BorderStyle BorderStyle
        {
            get;
            set;
        }

        /// <summary>
        /// 
        /// </summary>
        public float ZoomFactor
        {
            get;
            set;
        }

        void IEditControl.Focus()
        {
            this.Focus();
        }

        /// <summary>
        /// 
        /// </summary>
        public new HorizontalAlignment TextAlign
        {
            get { return HorizontalAlignment.Left; }
            set { }
        }
        /// <summary>
        /// 
        /// </summary>
        public bool Multiline
        {
            get { return false; }
            set { }
        }
    }
}

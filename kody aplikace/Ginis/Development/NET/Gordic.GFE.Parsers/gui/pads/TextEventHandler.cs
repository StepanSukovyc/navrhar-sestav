//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TextEventHandler.cs                    </Name>
//    <Description> Delegát metod s textovým argumentem                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Delegát metod s textovým argumentem
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    public delegate void TextEventHandler(object sender, TextEventArgs e);
    /// <summary>
    /// Textový argument
    /// </summary>
    public class TextEventArgs : EventArgs
    {
        readonly string text;
        /// <summary>
        /// Text
        /// </summary>
        public string Text { get { return text; } }

        /// <summary>
        /// Vytvoření textového argumentu
        /// </summary>
        /// <param name="text">Text argumentu</param>
        public TextEventArgs(string text)
        {
            this.text = text;
        }
    }
}

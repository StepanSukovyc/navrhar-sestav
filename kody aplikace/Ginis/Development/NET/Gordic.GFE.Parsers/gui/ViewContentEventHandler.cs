//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ViewContentEventHandler.cs               </Name>
//    <Description> Delegát funkce                                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-10                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Delegát funkce
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    public delegate void ViewContentEventHandler(object sender, ViewContentEventArgs e);
    /// <summary>
    /// Argument s pohledem na obsah
    /// </summary>
    public class ViewContentEventArgs : System.EventArgs
    {
        /// <summary>
        /// Obsah
        /// </summary>
        public IViewContent Content { get; set; }
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="content">Pohled na obsah</param>
        public ViewContentEventArgs(IViewContent content)
        {
            Content = content;
        }
    }
}

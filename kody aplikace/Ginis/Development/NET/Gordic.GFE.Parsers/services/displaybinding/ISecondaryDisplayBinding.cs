//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ISecondaryDisplayBinding.cs              </Name>
//    <Description> Třída sekundárních vazeb na pohled.                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-10                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.Parsers.Services
{
    /// <summary>
    /// Třída sekundárních vazeb na pohled.
    /// Vytváří pole IViewContents
    /// </summary>
    public interface ISecondaryDisplayBinding
    {
        /// <summary>
        /// True - pokud dané zobrazení lze připojit k IViewContent.
        /// </summary>
        bool CanAttachTo(IViewContent content);

        /// <summary>
        /// Vytvoření sekundárních pohledu pro daný pohled.
        /// </summary>
        IViewContent[] CreateSecondaryViewContent(IViewContent viewContent);
    }
}

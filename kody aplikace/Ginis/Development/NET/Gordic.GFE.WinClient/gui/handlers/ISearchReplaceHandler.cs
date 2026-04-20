//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.IFindReplaceHandler.cs                 </Name>
//    <Description> Rozhraní pro hledání a nahrazení                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-12-06                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.WinClient.Gui
{
    /// <summary>
    /// Rozhraní pro hledání a nahrazení
    /// </summary>
    interface ISearchReplaceHandler
    {
        /// <summary>
        /// Hledání řetězce
        /// </summary>
        void Search();
        /// <summary>
        /// Nahrazení řetězce
        /// </summary>
        void Replace();
    }
}

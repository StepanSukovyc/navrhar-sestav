//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.grflistbox.cs                          </Name>
//    <Description> list kontainerů s popisem dat                               </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2016                            </Copyright>
//    <Created>     2016-09-23                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;

namespace Gordic.GFE.WinClient.Box
{
    /// <summary>
    /// list kontainerů s popisem dat
    /// </summary>
    class GrfListBox : UndoRedoList<IBox>
    {

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="lObject">stránka zóny</param>
        public GrfListBox(ILabledObject lObject)
            : base(UndoRedoService.Manager)
        {
        }
    }
}

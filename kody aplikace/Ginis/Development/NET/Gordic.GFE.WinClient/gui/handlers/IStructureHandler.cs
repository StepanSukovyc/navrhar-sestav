//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.IHasStructure.cs                       </Name>
//    <Description> Rozhraní struktury dat                                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-04-03                                                  </Created>
//  </FileHeader>

using Gordic.GFE.WinClient.StructureView;

namespace Gordic.GFE.WinClient.Gui
{
    /// <summary>
    /// Rozhraní struktury dat
    /// </summary>
    interface IStructureHandler
    {
        /// <summary>
        /// Strom struktury dat
        /// </summary>
        StructureViewTreeControl StructureView { get; set; }

        /// <summary>
        /// Synchroniyace struktury
        /// </summary>
        /// <param name="structureview"></param>
        void SynchronizeStructure(StructureViewTreeControl structureview);
    }
}

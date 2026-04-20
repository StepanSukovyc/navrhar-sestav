//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IContainerComponent.cs                   </Name>
//    <Description> Komponenta s podobsahy                                      </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2015-12-14                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Komponenta s podobsahy
    /// </summary>
    public interface IContainerComponent
    {
        int Count { get; }
        object this[int index] { get; }
        int IndexOf(object item);
        IContainerComponent Parent { get; }
    }
}

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IBuildItemsModifier.cs                   </Name>
//    <Description> Když <see cref="IMaker">maker</see> vrácí objekt prezentující</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-21                                                  </Created>
//  </FileHeader>

using System.Collections;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Když maker vrácí objekt prezentující
    /// toto rozhraní, <see cref="Apply"/> metoda se volá nad seznamem položek, které budou vytvořené.
    /// </summary>
    public interface IBuildItemsModifier
    {
        /// <summary>
        /// Metoda pro vytvoření položek
        /// </summary>
        /// <param name="items">Seznam položek k vytvoření</param>
        void Apply(IList items);
    }
}

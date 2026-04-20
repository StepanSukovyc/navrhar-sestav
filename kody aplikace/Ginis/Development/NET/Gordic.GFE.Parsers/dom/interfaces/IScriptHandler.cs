//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IScriptHandler.cs                     </Name>
//    <Description> Vlastní slovník atributů                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Rozhraní objektů obsahujících skripty
    /// </summary>
    public interface IScriptHandler
    {
        /// <summary>
        /// Skripty
        /// </summary>
        GFEScriptList Scripts { get; set; }
    }
}

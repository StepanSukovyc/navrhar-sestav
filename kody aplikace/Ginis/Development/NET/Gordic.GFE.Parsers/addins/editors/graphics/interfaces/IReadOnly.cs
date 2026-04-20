//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IReadOnly.cs                             </Name>
//    <Description> rozhraní pomocné indikace možnosti manipulace s objektem    </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-03-12                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers
{    
    /// <summary>
    /// rozhraní pomocné indikace možnosti manipulace s objektem 
    /// </summary>
    public interface IReadOnly
    {
        /// <summary>
        /// indikuje možnost manipulace s objektem
        /// </summary>
        bool ReadOnly { get; }
    }

}

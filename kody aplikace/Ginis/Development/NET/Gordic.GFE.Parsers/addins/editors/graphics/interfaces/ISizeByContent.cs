//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IGRR.cs                                </Name>
//    <Description> rozhraní specifických objektů  GRR sestav                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-16                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Editor
{
    /// <summary>
    /// velikost GRR objektů
    /// </summary>
    public interface ISizeByContent
    {
        /// <summary>
        /// indikuje, že výška je dle obsahu
        /// </summary>
        bool IsHeightByContent { get; set; }
        /// <summary>
        /// indikuje, že šířka je dle pozůstalé velikosti řádku
        /// </summary>
        bool IsWidthByContent { get; set; }
        /// <summary>
        /// nastavení velikosti dle obsahu
        /// </summary>
        void SetHeightByContent();
    }
    /// <summary>
    /// rozhraní specifických objektů  GRR sestav
    /// </summary>
    public interface IGRR : ISizeByContent
    {
        /// <summary>
        /// řádek objektu
        /// </summary>
        IGRRLine Line { get; }
    }
}

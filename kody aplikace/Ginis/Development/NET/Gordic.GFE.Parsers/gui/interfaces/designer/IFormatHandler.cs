//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ITextFormatHandler.cs                    </Name>
//    <Description> Rozhraní pro práci s textem                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rozhraní pro práci s textem
    /// </summary>
    public interface IFormatHandler
    {
        /// <summary>
        /// Formát lze kopírovat
        /// </summary>
        bool EnableCopyFormat { get; }
        /// <summary>
        /// Formát lze aplikovat
        /// </summary>
        bool EnableApplyFormat { get; }

        /// <summary>
        /// Kopírovat formát
        /// </summary>
        void CopyFormat();
        /// <summary>
        /// Aplikovat formát
        /// </summary>
        /// <param name="copiedFormat">kopírovaný formát</param>
        bool ApplyFormat(object copiedFormat = null);
    }
}

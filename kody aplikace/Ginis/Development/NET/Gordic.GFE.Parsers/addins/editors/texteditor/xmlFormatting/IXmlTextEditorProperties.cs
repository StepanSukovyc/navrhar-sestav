//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IXmlTextEditorProperies.cs               </Name>
//    <Description> Rozhraní formátování xml </Description>
//    <Author>      Jan Hrabec                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-11-23                                                  </Created>
//  </FileHeader>

using Gordic.TextEditor.Document;

namespace Gordic.GFE.Parsers.addins.editors.texteditor.xmlFormatting
{
    /// <summary>
    /// Možnosti formátování XML atributů
    /// </summary>
    public enum XmlAttributesAlign
    {
        /// <summary>
        /// Zachovat aktuální (neformátovat)
        /// </summary>
        KeepLine,
        /// <summary>
        /// Všechny atributy na stejný řádek
        /// </summary>
        SameLine,
        /// <summary>
        /// Kaž´dy atribut na nový řádek
        /// </summary>
        NewLine,
    }

    /// <summary>
    /// Možnosti text editoru pro formát XML
    /// </summary>
    public interface IXmlTextEditorProperties : ITextEditorProperties
    {
        /// <summary>
        /// Způsob formátování atributů
        /// </summary>
        XmlAttributesAlign XmlAttributesAlign { get; }
    }
}

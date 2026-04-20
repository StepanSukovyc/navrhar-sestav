//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ivalidate.cs                             </Name>
//    <Description> typ validace - hodnoty číselníku                            </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2017-02-24                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.UndoRedoFramework;
using System.Xml;

namespace Gordic.GFE.Parsers.Gui
{
    public enum ValidType
    {
        required = 0,
        length = 1,
        characters = 2,
        type = 3,
        count = 4
    }

    public interface IValidate
    {
        /// <summary>
        /// typ validace - hodnoty číselníku
        /// </summary>
        ValidType Type { get; set; }
        /// <summary>
        /// chybová zprava validace
        /// </summary>
        string Message { get; set; }
        /// <summary>
        /// povoleno
        /// </summary>
        string Allowed { get; set; }
        /// <summary>
        /// nepovoleno
        /// </summary>
        string Disallowed { get; set; }
        /// <summary>
        /// koncovka souborů
        /// </summary>
        string Ext { get; set; }

        /// <summary>
        /// minimální hodnota validace
        /// </summary>
        string MinValue { get; set; }
        /// <summary>
        /// maximální hodnota validace
        /// </summary>
        string MaxValue { get; set; }

        /// <summary>
        /// generování obsahu objektu
        /// </summary>
        /// <param name="xmlDoc"></param>
        /// <param name="namespaceUri"></param>
        /// <returns></returns>
        XmlNode GetDataContent(XmlDocumentPosition xmlDoc, string namespaceUri);
    }

    /// <summary>
    /// Rozhraní pro práci s proměnnými
    /// </summary>
    public interface IValidateHandler
    {
        /// <summary>
        /// Validace
        /// </summary>
        IListComponent<IValidate> Validates { get; }
    }
}

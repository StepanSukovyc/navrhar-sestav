//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IFormationDocumentProperty.cs            </Name>
//    <Description> rozhraní vlastnosti dokumentu                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-17                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using System.Xml;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// rozhraní dokumentu sestavy
    /// </summary>
    public interface IFormationDocument
    {
        /// <summary>
        /// seznam stránek dokumentu
        /// </summary>
        IPages Pages { get; }
        /// <summary>
        /// načtení stránek z formátu <paramref name="format"/>.
        /// </summary>
        /// <param name="format">formát sestavy</param>
        void LoadPages(GFEFormat format);
        /// <summary>
        /// načtení formátu XML
        /// </summary>
        /// <param name="xml">obsah formátu XML</param>
        void Load(string xml);
    }

    /// <summary>
    /// rozhraní vlastnosti dokumentu
    /// </summary>
    public interface IFormationDocumentProperty
    {
        /// <summary>
        /// aktualizace obsahu dokumentu
        /// </summary>
        void RefreshContent();
        /// <summary>
        /// Načtení obsahu
        /// </summary>
        /// <param name="document">dokument</param>
        /// <param name="enc">Kódování</param>
        /// <param name="xml">obsah</param>
        /// <param name="filename">jméno souboru</param>
        void LoadContent(object document, Encoding enc, string xml, string filename);

        /// <summary>
        /// Inicializace dokumentu
        /// </summary>
        /// <param name="xmlFormat">Formát</param>
        /// <param name="unit">kompilační jednotka dokumentu</param>
        void SetData(ref XmlElement xmlFormat, ICompilationUnit unit);

        /// <summary>
        /// Neznáme formáty
        /// </summary>
        ReadOnlyCollection<GFEFormatTag> Unknowns { get; }
        /// <summary>
        /// Komentáře sestavy
        /// </summary>
        ReadOnlyCollection<DefaultComment> Comments { get; }
        /// <summary>
        /// Komentáře sestavy
        /// </summary>
        List<string> GlobalScripts { get; }
        /// <summary>
        /// Formát sestavy - nutný pro generování fragmentů
        /// </summary>
        GFEFormat Format { get; }
    }

}

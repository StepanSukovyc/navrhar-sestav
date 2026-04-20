//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.CreateItemFactory.cs                   </Name>
//    <Description> Farma vytváření objektů grafických sestav                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-11                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Xml.Linq;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.GrfEditor;

namespace Gordic.GFE.WinClient.CreateItem
{
    /// <summary>
    /// Farma vytváření objektů grafických sestav
    /// </summary>
    class CreateItemFactory
    {
        /// <summary>
        /// vytvoření objektu dle konfigurační jednotky
        /// </summary>
        /// <param name="entry">konfigurační jednotka objektu</param>
        /// <param name="format">Formát sestavy</param>
        /// <returns></returns>
        internal static dynamic Create(Parsers.Gui.ComponentTemplateEntry entry, GFEFormat format = null)
        {
            var p = entry?.Element?["part"]; //first <part> element
            if (p == null) return null;
            return new GFETemplate(p).Instantiate(format); 
        }

        //static GFEFormatTag GetTags(object fragment)
        //{
        //    return null;
        //}
        //static GFEFormatTag GetTags(string fragment, GFEFormat format)
        //{
        //    return new GFETemplate(XDocument.Parse(fragment).Root).Instantiate(format);
        //}

    }
}

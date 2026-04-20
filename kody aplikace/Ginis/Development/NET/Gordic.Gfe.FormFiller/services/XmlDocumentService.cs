//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.XmlDocumentService.cs                 </Name>
//    <Description> Služba pro práci s XML dokumentem                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System.IO;
using System.Xml;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.Gfe.FormFiller
{
    /// <summary>
    /// Služba pro práci s XML dokumentem
    /// </summary>
    static class XmlDocumentService
    {
        /// <summary>
        /// kolpírování sekce INFO z dokumetu <paramref name="xmlOldDoc"/> 
        /// do větve <paramref name="xmlFormat"/> dokumentu <paramref name="xmlDoc"/>
        /// </summary>
        /// <param name="xmlOldDoc">Zdrojový dokument</param>
        /// <param name="xmlFormat">Větev cílového dokumentu</param>
        /// <param name="xmlDoc">Cílový dokument</param>
        internal static void CopyInfoSection(XmlDocument xmlOldDoc, XmlElement xmlFormat, XmlDocumentPosition xmlDoc)
        {
            XmlNodeList lis = xmlOldDoc.GetElementsByTagName("info");
            foreach (XmlNode item in lis)
            {
                XmlNode elo = xmlDoc.ImportNode(item, true);
                xmlFormat.AppendChild(elo);
            }
        }
        /// <summary>
        /// kolpírování sekce TEMPLATE z dokumetu <paramref name="xmlOldDoc"/> 
        /// do větve <paramref name="xmlFormat"/> dokumentu <paramref name="xmlDoc"/>
        /// </summary>
        /// <param name="xmlOldDoc">Zdrojový dokument</param>
        /// <param name="xmlFormat">Větev cílového dokumentu</param>
        /// <param name="xmlDoc">Cílový dokument</param>
        internal static void CopyTemplateSection(XmlDocument xmlOldDoc, XmlElement xmlFormat, XmlDocumentPosition xmlDoc)
        {
            XmlNodeList lis = xmlOldDoc.GetElementsByTagName("template");
            foreach (XmlNode item in lis)
            {
                XmlNode elo = xmlDoc.ImportNode(item, true);
                xmlFormat.AppendChild(elo);
            }
        }
        /// <summary>
        /// Získání pěkné schodišťové struktury
        /// </summary>
        /// <param name="xmlDoc">Xml dokument s obsahem</param>
        /// <returns></returns>
        internal static string GetXmlAsString(XmlDocument xmlDoc)
        {
            bool pws = xmlDoc.PreserveWhitespace;
            xmlDoc.PreserveWhitespace = true;
            using (StringWriter tw = new StringWriter())
            {
                using (XmlTextWriter xw = new XmlTextWriter(tw))
                {
                    xw.Formatting = Formatting.Indented;
                    xw.Indentation = 2;
                    xmlDoc.WriteTo(xw);
                    xw.Flush();
                }
                xmlDoc.PreserveWhitespace = pws;
                // ... a načteme nový
                return tw.ToString();
            }
        }

    }
}

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.XmlDocumentService.cs                    </Name>
//    <Description> Služba pro práci s XML dokumentem                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;

namespace Gordic.GFE.WinClient.Services
{
    /// <summary>
    /// Služba pro práci s XML dokumentem
    /// </summary>
    static class XmlDocumentService
    {
        /// <summary>
        /// Vložení komentářů změn do dokumentu
        /// </summary>
        /// <param name="readOnlyCollection">Kolekce komentářů</param>
        /// <param name="xmlDoc">Dokument, do kterého se komentáře vkládají</param>
        internal static void SetChangesComments(ReadOnlyCollection<DefaultComment> readOnlyCollection, XmlDocumentPosition xmlDoc)
        {
            if (readOnlyCollection == null || readOnlyCollection.FirstOrDefault(cm => cm.IsChanges) == null)
                return;

            // indikuje, že hledáme komentáře změn
            string _textComment = string.Empty;

            foreach (DefaultComment item in readOnlyCollection)
                if (item.IsChanges)
                    _textComment += string.IsNullOrEmpty(_textComment) ? string.Format("{0}", item.CommentString) : string.Format("\n{0}", item.CommentString);

            xmlDoc.AppendChild(xmlDoc.CreateComment(string.Format("\n#ZMENY\n{0}\n#ZMENY\n", _textComment)));
        }
        /// <summary>
        /// Vložení globálních skriptů
        /// </summary>
        /// <param name="collection">kolekce skriptů</param>
        /// <param name="format">větev, do které se vkládá</param>
        internal static void SetGlobalScripts(List<string> collection, XmlElement format)
        {
            if (collection == null || collection.FirstOrNull(scr => !string.IsNullOrEmpty(scr)) == null)
                return;

            foreach (string item in collection)
                SetInnerText(format.OwnerDocument
                    , format.AppendChild(format.OwnerDocument.CreateElement("script", format.NamespaceURI)) as XmlElement
                    , string.Format("\n{0}\n", item.Trim('\n')), "<![CDATA[{1}]]>");
        }
        /// <summary>
        /// Vložení vlastnosti stránky do dokumentu
        /// </summary>
        /// <param name="pages">kolekce stránek</param>
        /// <param name="xmlFormat">větev formát dokumentu</param>
        /// <param name="namespaceURI">namespace</param>
        internal static void SetPaperSetting(IPages pages, System.Xml.XmlElement xmlFormat, string namespaceURI)
        {
            //Vytvoříme sekci PAPER-SETTING
            XmlElement xmlElement = xmlFormat.OwnerDocument.CreateElement("paper-setting", namespaceURI);
            if (pages.PageWidth != SizeValue.MM210
                || pages.PageHeight != SizeValue.MM297)
            {
                xmlElement.SetAttribute("paper-width", pages.PageWidth.MathRoundValue(0));
                xmlElement.SetAttribute("paper-height", pages.PageHeight.MathRoundValue(0));
            }

            double _10mm = Gordic.GFE.Parsers.CommonService.GetRoundedValue(SizeValue.MM10, 2);

            //výchozí hodnoty jsou 10mm z každé strany, takže je odfiltrujeme
            //Uložíme pouze hodnoty odlišné od výchozích
            //ale pokud už byly ve vstupním ALF, tak necháme i když jsou default (MAL 2020/04/08)
            if (pages.AttrList.ContainsKey("left-margin") || Gordic.GFE.Parsers.CommonService.GetRoundedValue(pages.MarginLeft, 2) != _10mm)
                xmlElement.SetAttribute("left-margin", pages.MarginLeft.MathRoundValue(2).Replace(",", "."));

            if (pages.AttrList.ContainsKey("right-margin") || Gordic.GFE.Parsers.CommonService.GetRoundedValue(pages.MarginRight, 2) != _10mm)
                xmlElement.SetAttribute("right-margin", pages.MarginRight.MathRoundValue(2).Replace(",", "."));

            if (pages.AttrList.ContainsKey("top-margin") || Gordic.GFE.Parsers.CommonService.GetRoundedValue(pages.MarginTop, 2) != _10mm)
                xmlElement.SetAttribute("top-margin", pages.MarginTop.MathRoundValue(2).Replace(",", "."));

            if (pages.AttrList.ContainsKey("bottom-margin") || Gordic.GFE.Parsers.CommonService.GetRoundedValue(pages.MarginBottom, 2) != _10mm)
                xmlElement.SetAttribute("bottom-margin", pages.MarginBottom.MathRoundValue(2).Replace(",", "."));

            if (pages.Count > 1)
                xmlElement.SetAttribute("page-count", pages.Count.ToString());

            foreach (var item in pages.Unknowns)
                xmlElement.SetAttribute(item.Key, item.Value);

            if (xmlElement.HasAttributes)
                xmlFormat.AppendChild(xmlElement);
        }
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
            string result;
            if (xmlDoc is XmlDocumentPosition)
            {
                StringWriterCounter tw = new StringWriterCounter();
                (xmlDoc as XmlDocumentPosition).Counter = tw;
                using (XmlTextWriter xw = new XmlTextWriter(tw))
                {
                    xw.Formatting = Formatting.Indented;
                    xw.Indentation = 2;
                    xmlDoc.WriteTo(xw);
                    xw.Flush();
                }
                xmlDoc.PreserveWhitespace = pws;
                // ... a načteme nový
                result = tw.ToString();
            }
            else
            {
                StringWriter tw = new StringWriter();
                using (XmlTextWriter xw = new XmlTextWriter(tw))
                {
                    xw.Formatting = Formatting.Indented;
                    xw.Indentation = 2;
                    xmlDoc.WriteTo(xw);
                    xw.Flush();
                }
                xmlDoc.PreserveWhitespace = pws;
                // ... a načteme nový
                result = tw.ToString();
            }
            return result;
        }
        /// <summary>
        /// uložení seznamu proměnných štítku
        /// </summary>
        /// <param name="xmlElement">element štítku</param>
        /// <param name="xmlDoc">dokument, do kterého se ukládá</param>
        /// <param name="list">seznam proměnných</param>
        /// <param name="qualifiedName">název větve proměnných</param>
        /// <param name="atrKey">název atributu proměnné</param>
        /// <param name="atrValue">název hodnoty atributu proměnné</param>
        /// <param name="atrTyp">název typu proměnné</param>
        internal static void SetVariables(XmlElement xmlElement, XmlDocumentPosition xmlDoc, IListComponent<IVariable> list, string qualifiedName, string atrKey, string atrValue, string atrTyp)
        {
            if (list != null && (list as System.Collections.ICollection).Count != 0)
                foreach (var item in list)
                {
                    XmlElement xmlVar = xmlDoc.CreateElement(qualifiedName, xmlElement.NamespaceURI);
                    if (!string.IsNullOrEmpty(item.Name))
                        xmlVar.SetAttribute(atrKey, item.Name);
                    if (!string.IsNullOrEmpty(item.ValueScript))
                        xmlVar.SetAttribute(atrValue, item.ValueScript);
                    if (!string.IsNullOrEmpty(item.DataType))
                        xmlVar.SetAttribute(atrTyp, item.DataType);
                    xmlElement.AppendChild(xmlVar);
                }
        }

        /// <summary>
        /// uložení InnerText hodnoty do větve <paramref name="xmlElement"/> dokumentu <paramref name="xmlDoc"/>.
        /// </summary>
        /// <param name="xmlDoc">Dokument</param>
        /// <param name="xmlElement">větev dokumentu <paramref name="xmlDoc"/>, do které vkládá hodnota <paramref name="innerText"/>.</param>
        /// <param name="innerText">hodnota vnitřního textu</param>
        /// <param name="formatInnerText">string.Format text vnitřku</param>
        public static void SetInnerText(System.Xml.XmlDocument xmlDoc, XmlElement xmlElement, string innerText, string formatInnerText = "{1}")
        {
            if (!string.IsNullOrEmpty(innerText))
            {
                XmlDocument doc = new XmlDocument(xmlDoc.NameTable);
                //doc.LoadXml(string.Format("<root xmlns=\"{0}\">{1}</root>", xmlElement.NamespaceURI, innerText));
                doc.LoadXml(string.Format("<root xmlns=\"{0}\">" + (string.IsNullOrEmpty(formatInnerText) ? "{1}" : formatInnerText) + "</root>", xmlElement.NamespaceURI, innerText));

                XmlNodeList lis = doc.GetElementsByTagName("root");
                foreach (XmlNode item in lis)
                    foreach (XmlNode subItem in item.ChildNodes)
                        xmlElement.AppendChild(xmlDoc.ImportNode(subItem, true));
            }
        }

        /// <summary>
        /// uložení seznamu atributů
        /// pokud nějaký atribut ve větvi již existuje, pak nebude uložen
        /// </summary>
        /// <param name="xmlNode">větev, do které se atributy ukládají</param>
        /// <param name="attributes">seznam atributů k uložení</param>
        /// <param name="styles">seznam aktuálních stylů</param>
        internal static void SetListOfDictionaryItems(XmlElement xmlNode, Dictionary<string, string> attributes, List<GFEList> styles)
        {
            GFEList actualStyle = styles != null && styles.Count != 0 ? styles.Last() : null;
            if (attributes.Count != 0)
                foreach (var item in attributes)
                {
                    string key = CommonService.NormalizeKey(item.Key);
                    if (!string.IsNullOrEmpty(item.Value)
                        && xmlNode.Attributes.GetNamedItem(key) == null)
                        if (actualStyle != null)
                        {
                            if (actualStyle.ContainsKey(key))
                                actualStyle[key] = item.Value.Replace("\r\n", "\n");
                            else
                                xmlNode.SetAttribute(key, item.Value.Replace("\r\n", "\n"));
                        }
                        else
                            xmlNode.SetAttribute(key, item.Value.Replace("\r\n", "\n"));
                }
        }

        /// <summary>
        /// uložení seznamu atributů
        /// pokud nějaký atribut ve větvi již existuje, pak nebude uložen
        /// </summary>
        /// <param name="xmlNode">větev, do které se atributy ukládají</param>
        /// <param name="attributes">seznam atributů k uložení</param>
        /// <param name="styles">seznam aktuálních stylů</param>
        internal static void SetListOfDictionaryItems(XmlElement xmlNode, UndoRedoList<DictionaryItem> attributes, List<GFEList> styles)
        {
            GFEList actualStyle = styles != null && styles.Count != 0 ? styles.Last() : null;
            if (attributes.Count != 0)
                foreach (var item in attributes)
                {
                    string key = CommonService.NormalizeKey(item.Key);
                    if (!string.IsNullOrEmpty(item.Value)
                        && xmlNode.Attributes.GetNamedItem(key) == null)
                        if (actualStyle != null)
                        {
                            if (actualStyle.ContainsKey(key))
                                actualStyle[key] = item.Value;
                            else
                                xmlNode.SetAttribute(key, item.Value);
                        }
                        else
                            xmlNode.SetAttribute(key, item.Value);
                }
        }
    }
}

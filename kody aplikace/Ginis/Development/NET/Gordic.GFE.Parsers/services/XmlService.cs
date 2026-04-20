//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlService.cs                            </Name>
//    <Description> služba pro práci s XML obsahem                              </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-05-14                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Hosting;
using Gordic.TextEditor;
using System;
using System.IO;
using System.Xml;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// služba pro práci s XML obsahem
    /// </summary>
    public static class XmlService
    {
        /// <summary>
        /// vytvoření XML zapisovače
        /// </summary>
        /// <param name="textWriter"></param>
        /// <param name="convertTabsToSpaces"></param>
        /// <param name="indentationSize"></param>
        /// <returns></returns>
        public static XmlTextWriter CreateXmlTextWriter(TextWriter textWriter, bool convertTabsToSpaces, int indentationSize)
        {
            XmlTextWriter writer = new XmlTextWriter(textWriter);
            if (convertTabsToSpaces)
            {
                writer.Indentation = indentationSize;
                writer.IndentChar = ' ';
            }
            else
            {
                writer.Indentation = 1;
                writer.IndentChar = '\t';
            }
            writer.Formatting = Formatting.Indented;
            return writer;
        }

        /// <summary>
        /// odsazení obsahu
        /// </summary>
        /// <param name="xmlDoc">xml dokument</param>
        /// <param name="convertTabsToSpaces">indikuje převod tabulátoru na odsazení</param>
        /// <param name="indentationSize">velikost odsazení</param>
        /// <returns></returns>
        public static string IndentedFormat(XmlDocumentPosition xmlDoc, bool convertTabsToSpaces = true, int indentationSize = 4)
        {
            string indentedText = String.Empty;

            try
            {
                using (StringWriterCounter indentedXmlWriter = new StringWriterCounter())
                {
                    xmlDoc.Counter = indentedXmlWriter;

                    XmlTextWriter writer = CreateXmlTextWriter(indentedXmlWriter, convertTabsToSpaces, indentationSize);
                    xmlDoc.WriteTo(writer);
                    writer.Flush();

                    indentedText = indentedXmlWriter.ToString();
                }
            }
            catch (Exception) { indentedText = xmlDoc.OuterXml; }

            return indentedText;
        }

        /// <summary>
        /// odsazení obsahu
        /// </summary>
        /// <param name="xml">xml obsah</param>
        /// <param name="convertTabsToSpaces">indikuje převod tabulátoru na odsazení</param>
        /// <param name="indentationSize">velikost odsazení</param>
        /// <returns></returns>
        public static string IndentedFormat(string xml, bool convertTabsToSpaces = true, int indentationSize = 4)
        {
            string indentedText = String.Empty;

            try
            {
                XmlTextReader reader = new XmlTextReader(new StringReader(xml))
                {
                    WhitespaceHandling = WhitespaceHandling.None
                };

                StringWriter indentedXmlWriter = new StringWriter();
                XmlTextWriter writer = CreateXmlTextWriter(indentedXmlWriter, convertTabsToSpaces, indentationSize);
                writer.WriteNode(reader, false);
                writer.Flush();

                indentedText = indentedXmlWriter.ToString();
            }
            catch (Exception) { indentedText = xml; }

            return indentedText;
        }

        /// <summary>
        /// převod XML obsahu na jednoduše formátovaný text
        /// </summary>
        /// <param name="xml">xml obsah</param>
        /// <param name="service">služba výběru</param>
        /// <returns></returns>
        public static string SimpleFormat(string xml, SelectionService service = null)
        {
            string text = xml.Replace("><", ">\r\n<");
            int len = (int)((text.Length - xml.Length) / 2);

            if (service != null)
                foreach (var item in service.SelectedComponents)
                    if (item is IPositionHandler handler)
                    {
                        handler.StartPosition += len;
                        handler.EndPosition += len;
                    }
            return text;
        }

        /// <summary>
        /// aktualizace odstupu
        /// </summary>
        /// <param name="xmlEditor">editor XML obsahu</param>
        static void RefreshMargin(TextEditorControl xmlEditor)
        {
            if (xmlEditor.ActiveTextAreaControl.TextArea != null)
                xmlEditor.ActiveTextAreaControl.TextArea.Refresh(xmlEditor.ActiveTextAreaControl.TextArea.FoldMargin);
        }
        /// <summary>
        /// Aktualizace skládání
        /// </summary>
        /// <param name="xmlEditor">editor XML obsahu</param>
        public static void UpdateFolding(TextEditorControl xmlEditor)
        {
            ThreadService.SafeThreadAsyncCall(delegate
            {
                xmlEditor.Document.FoldingManager.UpdateFoldings(String.Empty, null);
                RefreshMargin(xmlEditor);
            });
        }
    }
}

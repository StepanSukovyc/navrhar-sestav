//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlFoldingStrategy.cs                  </Name>
//    <Description> Udržuje informaci o startu skládání v XML řádku             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-25                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using System.Xml;
using Gordic.TextEditor.Document;
using System.IO;
using System.Collections;
using Gordic.GFE.Parsers.AlfEditor;

namespace Gordic.GFE.Parsers.XmlEditor
{
    /// <summary>
    /// Určuje skládání XML řádů v editoru
    /// </summary>
    public class XmlFoldingStrategy : IFoldingStrategy
    {
        #region IFoldingStrategy

        /// <summary>
        /// Přidá skládíní do textového editoru kolem každého start-end páru elementů.
        /// </summary>
        /// <param name="document">Dokument se kterým se pracuje</param>
        /// <param name="fileName">Název souboru dokumentu</param>
        /// <param name="parseInformation">Informace o analýze</param>
        /// <returns></returns>
        public List<FoldMarker> GenerateFoldMarkers(IDocument document, string fileName, object parseInformation)
        {
            showAttributesWhenFolded = AlfEditorAddInOptions.ShowAttributesWhenFolded;

            List<FoldMarker> foldMarkers = new List<FoldMarker>();
            Stack stack = new Stack();
            if (ParserService.IsWellFormedXML(document.TextContent, out string errorMessage))
            {
                string xml = document.TextContent;
                XmlTextReader reader = new XmlTextReader(new StringReader(xml));
                while (reader.Read())
                {
                    switch (reader.NodeType)
                    {
                        case XmlNodeType.Element:
                            if (!reader.IsEmptyElement)
                            {
                                FoldStart newFoldStart = CreateElementFoldStart(reader);
                                stack.Push(newFoldStart);
                            }
                            break;

                        case XmlNodeType.EndElement:
                            FoldStart foldStart = (FoldStart)stack.Pop();
                            CreateElementFold(document, foldMarkers, reader, foldStart);
                            break;

                        case XmlNodeType.Comment:
                            CreateCommentFold(document, foldMarkers, reader);
                            break;
                    }
                }
            }
            else
                return new List<FoldMarker>(document.FoldingManager.FoldMarker);

            return foldMarkers;
        }

        #endregion

        /// <summary>
        /// Indikuje, kdy mají být atributy zobrazené při skládání
        /// </summary>
        bool showAttributesWhenFolded = false;
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public XmlFoldingStrategy() { }

        /// <summary>
        /// Vytvoření skládání komentáře, pokud komentář se roztáhuje na více než jeden řádek
        /// </summary>
        void CreateCommentFold(IDocument document, List<FoldMarker> foldMarkers, XmlTextReader reader)
        {
            if (reader.Value != null)
            {
                string comment = reader.Value.Replace("\r\n", "\n");
                string[] lines = comment.Split('\n');
                if (lines.Length > 1)
                {
                    int startCol = reader.LinePosition - 5;
                    int startLine = reader.LineNumber - 1;

                    // přidání '-->'
                    int endCol = lines[lines.Length - 1].Length + startCol + 3;
                    int endLine = startLine + lines.Length - 1;
                    string foldText = String.Concat("<!--", lines[0], "-->");
                    FoldMarker foldMarker = new FoldMarker(document, startLine, startCol, endLine, endCol, FoldType.TypeBody, foldText);
                    foldMarkers.Add(foldMarker);
                }
            }
        }

        /// <summary>
        /// Vytvoření XmlFoldStart pro počáteční tag elementu.
        /// </summary>
        FoldStart CreateElementFoldStart(XmlTextReader reader)
        {
            FoldStart newFoldStart = new FoldStart(reader.Prefix, reader.LocalName, reader.LineNumber - 1, reader.LinePosition - 2);

            newFoldStart.FoldText = showAttributesWhenFolded && reader.HasAttributes ? String.Concat("<", newFoldStart.Name, " ", GetAttributeFoldText(reader), ">")
                : String.Concat("<", newFoldStart.Name, ">");

            return newFoldStart;
        }

        void CreateElementFold(IDocument document, List<FoldMarker> foldMarkers, XmlTextReader reader, FoldStart foldStart)
        {
            int endLine = reader.LineNumber - 1;
            if (endLine > foldStart.Line)
            {
                int endCol = reader.LinePosition + foldStart.Name.Length;
                FoldMarker foldMarker = new FoldMarker(document, foldStart.Line, foldStart.Column, endLine, endCol, FoldType.TypeBody, foldStart.FoldText);
                foldMarkers.Add(foldMarker);
            }
        }

        string GetAttributeFoldText(XmlTextReader reader)
        {
            StringBuilder text = new StringBuilder();

            for (int i = 0; i < reader.AttributeCount; ++i)
            {
                reader.MoveToAttribute(i);

                text.Append(reader.Name);
                text.Append("=");
                text.Append(reader.QuoteChar.ToString());
                text.Append(XmlEncodeAttributeValue(reader.Value, reader.QuoteChar));
                text.Append(reader.QuoteChar.ToString());

                if (i < reader.AttributeCount - 1)
                    text.Append(" ");
            }

            return text.ToString();
        }

        static string XmlEncodeAttributeValue(string attributeValue, char quoteChar)
        {
            StringBuilder encodedValue = new StringBuilder(attributeValue);

            encodedValue.Replace("&", "&amp;");
            encodedValue.Replace("<", "&lt;");
            encodedValue.Replace(">", "&gt;");

            if (quoteChar == '"')
                encodedValue.Replace("\"", "&quot;");
            else
                encodedValue.Replace("'", "&apos;");

            return encodedValue.ToString();
        }

    }
}

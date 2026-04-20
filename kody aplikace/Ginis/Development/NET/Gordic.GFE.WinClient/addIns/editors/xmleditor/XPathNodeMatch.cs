//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XPathNodeMatch.cs                      </Name>
//    <Description> Uložení XmlNode a asociovanné čísla řádků a pozice po hodnocení XPath příkazu</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System;
using System.Xml;
using System.Xml.XPath;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Uložení XmlNode a asociovanná čísla řádků a pozice po hodnocení XPath příkazu
    /// </summary>
    public class XPathNodeMatch : IXmlLineInfo
    {
        int? lineNumber;
        int linePosition;
        string value;
        string displayValue;
        readonly XPathNodeType nodeType;

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="currentNavigator">Aktuální navigátor</param>
        /// <remarks>
        /// </remarks>
        public XPathNodeMatch(XPathNavigator currentNavigator)
        {
            SetLineNumbers(currentNavigator as IXmlLineInfo);
            nodeType = currentNavigator.NodeType;
            switch (nodeType)
            {
                case XPathNodeType.Text:
                    SetTextValue(currentNavigator);
                    break;
                case XPathNodeType.Comment:
                    SetCommentValue(currentNavigator);
                    break;
                case XPathNodeType.Namespace:
                    SetNamespaceValue(currentNavigator);
                    break;
                case XPathNodeType.Element:
                    SetElementValue(currentNavigator);
                    break;
                case XPathNodeType.ProcessingInstruction:
                    SetProcessingInstructionValue(currentNavigator);
                    break;
                case XPathNodeType.Attribute:
                    SetAttributeValue(currentNavigator);
                    break;
                default:
                    value = currentNavigator.LocalName;
                    displayValue = value;
                    break;
            }
        }

        /// <summary>
        /// číslo řádku.
        /// </summary>
        public int LineNumber { get { return lineNumber.GetValueOrDefault(0); } }

        /// <summary>
        /// pozice řádku.
        /// </summary>
        public int LinePosition { get { return linePosition; } }
        /// <summary>
        /// Indikuje existenci informaci
        /// </summary>
        /// <returns></returns>
        public bool HasLineInfo() { return lineNumber.HasValue; }

        /// <summary>
        /// Textová hodnota větve.
        /// </summary>
        public string Value { get { return value; } }

        /// <summary>
        /// Zobrazovací hodnota (včetně závorek).
        /// </summary>
        public string DisplayValue { get { return displayValue; } }

        /// <summary>
        /// Typ větve
        /// </summary>
        public XPathNodeType NodeType { get { return nodeType; } }

        void SetElementValue(XPathNavigator navigator)
        {
            value = navigator.Name;
            if (navigator.IsEmptyElement)
                displayValue = String.Concat("<", value, "/>");
            else
                displayValue = String.Concat("<", value, ">");
        }

        void SetTextValue(XPathNavigator navigator)
        {
            value = navigator.Value;
            displayValue = value;
        }

        void SetCommentValue(XPathNavigator navigator)
        {
            value = navigator.Value;
            displayValue = navigator.OuterXml;
        }

        void SetNamespaceValue(XPathNavigator navigator)
        {
            value = navigator.OuterXml;
            displayValue = value;
        }

        void SetProcessingInstructionValue(XPathNavigator navigator)
        {
            value = navigator.Name;
            displayValue = navigator.OuterXml;
        }

        void SetAttributeValue(XPathNavigator navigator)
        {
            value = navigator.Name;
            displayValue = String.Concat("@", value);
        }

        void SetLineNumbers(IXmlLineInfo lineInfo)
        {
            if (lineInfo.HasLineInfo() && lineInfo.LineNumber > 0)
            {
                lineNumber = lineInfo.LineNumber - 1;
                linePosition = lineInfo.LinePosition - 1;
            }
        }
    }
}

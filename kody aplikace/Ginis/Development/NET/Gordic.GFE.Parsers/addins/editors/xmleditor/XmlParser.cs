//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlParser.cs                           </Name>
//    <Description> Třída, která obsahuje nástroj pro zpracovávání XML,         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-25                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using System.IO;
using System.Xml;

namespace Gordic.GFE.Parsers.XmlEditor
{
    /// <summary>
    /// Třída, která obsahuje nástroj pro zpracovávání XML, 
    /// stanovení aktuálně vybraný prvků, takže jsme schopni zajistit IntelliSense
    /// </summary>
    public class XmlParser
    {
        /// <summary>
        /// Pomocná třídy.
        /// Obsahuje URI jmenného prostoru a prefix aktuálně používaný v daném jmenném prostoru
        /// </summary>
        class NamespaceURI
        {
            string prefix = String.Empty;
            /// <summary>
            /// Vytvoření nové instance třídy
            /// </summary>
            public NamespaceURI()
            {
                Namespace = String.Empty;
            }
            /// <summary>
            /// Vytvoření nové instance třídy
            /// </summary>
            /// <param name="namespaceURI">URI jmenného prostoru</param>
            /// <param name="prefix">prefix</param>
            public NamespaceURI(string namespaceURI, string prefix)
            {
                Namespace = namespaceURI;
                this.prefix = prefix;
            }

            /// <summary>
            /// Jmenný prostor
            /// </summary>
            public string Namespace { get; set; }
            /// <summary>
            /// Prefix
            /// </summary>
            public string Prefix
            {
                get { return prefix; }
                set
                {
                    prefix = value;
                    if (prefix == null)
                        prefix = String.Empty;
                }
            }
            /// <summary>
            /// řetězcová prezentace objektu
            /// </summary>
            /// <returns></returns>
            public override string ToString()
            {
                return !String.IsNullOrEmpty(prefix) ? prefix + ":" + Namespace : Namespace;
            }
        }

        static readonly char[] whitespaceCharacters = new char[] { ' ', '\n', '\t', '\r' };
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        XmlParser() { }

        /// <summary>
        /// Získává cestu xml tagu prvku startu, že daný <paramref name="index"/> je uvnitř.
        /// </summary>
        /// <param name="xml">XML text</param>
        /// <param name="index">index</param>
        /// <returns></returns>
        public static XmlElementPath GetActiveElementStartPath(string xml, int index)
        {
            QualifiedNameCollection namespaces = new QualifiedNameCollection();
            return GetActiveElementStartPath(xml, index, namespaces);
        }

        /// <summary>
        /// Získává cestu xml tagu prvku startu, že daný <paramref name="index"/> je uvnitř.
        /// Liší se od GetActiveElementStartPath metody tím, že index může být uvnitř názvu elementu
        /// </summary>
        /// <param name="xml">XML text</param>
        /// <param name="index">index</param>
        /// <returns></returns>
        public static XmlElementPath GetActiveElementStartPathAtIndex(string xml, int index)
        {
            QualifiedNameCollection namespaces = new QualifiedNameCollection();
            return GetActiveElementStartPathAtIndex(xml, index, namespaces);
        }

        /// <summary>
        /// Získání nadřazeného objektu objektu na pozicí indexu
        /// </summary>
        /// <param name="xml">XML text</param>
        public static XmlElementPath GetParentElementPath(string xml)
        {
            QualifiedNameCollection namespaces = new QualifiedNameCollection();
            XmlElementPath path = GetFullParentElementPath(xml, namespaces);
            path.Compact();
            return path;
        }

        /// <summary>
        /// Kontroluje, zda atribut na konci řetězce je deklarac9 jmenn0ho prostoru
        /// </summary>
        /// <param name="xml">XML text</param>
        /// <param name="index">index</param>
        /// <returns></returns>
        public static bool IsNamespaceDeclaration(string xml, int index)
        {
            if (String.IsNullOrEmpty(xml))
                return false;

            index = GetCorrectedIndex(xml.Length, index);

            // Přesun zpět o jeden znak, pokud poslední znak je '='
            if (xml[index] == '=')
            {
                xml = xml.Substring(0, xml.Length - 1);
                --index;
            }

            // Od konce řetězce jdeme pozpátku, dokud nebudeme mít
            // poslední atribut a nějakou mezeru
            StringBuilder reversedAttributeName = new StringBuilder();

            bool ignoreWhitespace = true;
            int currentIndex = index;
            for (int i = 0; i < index; ++i)
            {

                char currentChar = xml[currentIndex];

                if (Char.IsWhiteSpace(currentChar))
                {
                    if (ignoreWhitespace == false)
                        // Dosáhli jsme začátek názvu atributu.
                        break;
                }
                else if (Char.IsLetterOrDigit(currentChar) || (currentChar == ':'))
                {
                    ignoreWhitespace = false;
                    reversedAttributeName.Append(currentChar);
                }
                else
                    // neplatný řetězec.
                    break;

                --currentIndex;
            }

            // dostali jsme se k názvu jmenného prostoru?
            bool isNamespace = false;

            if ((reversedAttributeName.ToString() == "snlmx") || (reversedAttributeName.ToString().EndsWith(":snlmx")))
                isNamespace = true;

            return isNamespace;
        }

        /// <summary>
        /// Získání názvu atributu a nějakého prefixu
        /// Jmenný prostor není definován
        /// </summary>
        /// <param name="xml">XML text</param>
        /// <param name="index">index</param>
        /// <returns><see langword="null"/> pokud nelze najit atributy.</returns>
        public static QualifiedName GetQualifiedAttributeName(string xml, int index)
        {
            string name = GetAttributeName(xml, index);
            return GetQualifiedName(name);
        }

        /// <summary>
        /// Získání atributu uvnitř ale před specificým indexem
        /// </summary>
        /// <param name="xml">XML text</param>
        /// <param name="index">index</param>
        public static string GetAttributeName(string xml, int index)
        {
            if (String.IsNullOrEmpty(xml))
                return String.Empty;

            index = GetCorrectedIndex(xml.Length, index);
            return GetAttributeName(xml, index, true, true, true);
        }

        /// <summary>
        /// Získá název atributu a jeho předpony na určeném indexu. 
        /// Index může být kdekoliv uvnitř názvu tributu nebo hodnoty atributu.
        /// </summary>
        /// <param name="xml">XML text</param>
        /// <param name="index">index</param>
        /// <param name="includeNamespace">včetně jmenného prostoru</param>
        /// <returns></returns>
        public static QualifiedName GetQualifiedAttributeNameAtIndex(string xml, int index, bool includeNamespace)
        {
            string name = GetAttributeNameAtIndex(xml, index);
            QualifiedName qualifiedName = GetQualifiedName(name);
            if (qualifiedName != null && String.IsNullOrEmpty(qualifiedName.Namespace) && includeNamespace)
            {
                QualifiedNameCollection namespaces = new QualifiedNameCollection();
                XmlElementPath path = GetActiveElementStartPathAtIndex(xml, index, namespaces);
                qualifiedName.Namespace = GetNamespaceForPrefix(namespaces, path.Elements.LastPrefix);
            }
            return qualifiedName;
        }

        /// <summary>
        /// Získá název atributu a jeho předpony na určeném indexu. 
        /// Index může být kdekoliv uvnitř názvu tributu nebo hodnoty atributu.
        /// </summary>
        /// <param name="xml">XML text</param>
        /// <param name="index">index</param>
        public static QualifiedName GetQualifiedAttributeNameAtIndex(string xml, int index)
        {
            return GetQualifiedAttributeNameAtIndex(xml, index, false);
        }

        /// <summary>
        /// Získá název atributu a jeho předpony na určeném indexu. 
        /// Index může být kdekoliv uvnitř názvu tributu nebo hodnoty atributu.
        /// </summary>
        /// <param name="xml">XML text</param>
        /// <param name="index">index</param>
        public static string GetAttributeNameAtIndex(string xml, int index)
        {
            if (String.IsNullOrEmpty(xml))
                return String.Empty;

            index = GetCorrectedIndex(xml.Length, index);

            bool ignoreWhitespace = true;
            bool ignoreEqualsSign = false;
            bool ignoreQuote = false;

            if (IsInsideAttributeValue(xml, index))
            {
                // nalezneme začátek názvu atributu.
                int elementStartIndex = GetActiveElementStartIndex(xml, index);
                if (elementStartIndex == -1)
                    return String.Empty;

                // najdeme znak =.
                for (int i = index; i > elementStartIndex; --i)
                {
                    char ch = xml[i];
                    if (ch == '=')
                    {
                        index = i;
                        ignoreEqualsSign = true;
                        break;
                    }
                }
            }
            else
            {
                // najdeme konec názvu atributu.
                for (; index < xml.Length; ++index)
                {
                    char ch = xml[index];
                    if (!IsXmlNameChar(ch))
                    {
                        if (ch == '\'' || ch == '\"')
                        {
                            ignoreQuote = true;
                            ignoreEqualsSign = true;
                        }
                        break;
                    }
                }
                --index;
            }

            return GetAttributeName(xml, index, ignoreWhitespace, ignoreQuote, ignoreEqualsSign);
        }

        /// <summary>
        /// Kontrola platností XML znaku v názvu atributu
        /// </summary>
        /// <param name="ch">kontrolovaný znak</param>
        public static bool IsAttributeValueChar(char ch)
        {
            return !((ch == '<') || (ch == '>'));
        }

        /// <summary>
        /// Kontrola platností XML znaku v názvu atributu nebo elementu
        /// </summary>
        /// <param name="ch">kontrolovaný znak</param>
        public static bool IsXmlNameChar(char ch)
        {
            return (Char.IsLetterOrDigit(ch) ||
                (ch == ':') ||
                (ch == '/') ||
                (ch == '_') ||
                (ch == '.') ||
                (ch == '-'));
        }

        /// <summary>
        /// Určuje, zda index je uvnitř hodnoty atributu.
        /// </summary>
        /// <param name="xml">XML text</param>
        /// <param name="index">index</param>
        public static bool IsInsideAttributeValue(string xml, int index)
        {
            if (String.IsNullOrEmpty(xml))
                return false;

            if (index > xml.Length)
                index = xml.Length;

            int elementStartIndex = GetActiveElementStartIndex(xml, index);
            if (elementStartIndex == -1)
                return false;

            bool foundEqualsSign = false;
            int doubleQuotesCount = 0;
            int singleQuotesCount = 0;
            char lastQuoteChar = ' ';
            for (int i = index - 1; i > elementStartIndex; --i)
            {
                char ch = xml[i];
                if (ch == '=')
                {
                    foundEqualsSign = true;
                    break;
                }
                else if (ch == '\"')
                {
                    lastQuoteChar = ch;
                    ++doubleQuotesCount;
                }
                else if (ch == '\'')
                {
                    lastQuoteChar = ch;
                    ++singleQuotesCount;
                }
            }

            bool isInside = false;

            if (foundEqualsSign)
            {
                // Lichý počet uvozovek?
                if ((lastQuoteChar == '\"') && ((doubleQuotesCount % 2) > 0))
                    isInside = true;
                else if ((lastQuoteChar == '\'') && ((singleQuotesCount % 2) > 0))
                    isInside = true;
            }

            return isInside;
        }

        /// <summary>
        /// Získání hodnoty atributu na specifickém umístění
        /// </summary>
        /// <param name="xml">XML text</param>
        /// <param name="index">index</param>
        /// <returns></returns>
        public static string GetAttributeValueAtIndex(string xml, int index)
        {
            if (!IsInsideAttributeValue(xml, index))
                return String.Empty;

            index = GetCorrectedIndex(xml.Length, index);

            int elementStartIndex = GetActiveElementStartIndex(xml, index);
            if (elementStartIndex == -1)
                return String.Empty;

            // najdeme znak =.
            int equalsSignIndex = -1;
            for (int i = index; i > elementStartIndex; --i)
            {
                char ch = xml[i];
                if (ch == '=')
                {
                    equalsSignIndex = i;
                    break;
                }
            }

            if (equalsSignIndex == -1)
                return String.Empty;

            // najdeme hodnotu atributu.
            char quoteChar = ' ';
            bool foundQuoteChar = false;
            StringBuilder attributeValue = new StringBuilder();
            for (int i = equalsSignIndex; i < xml.Length; ++i)
            {
                char ch = xml[i];
                if (!foundQuoteChar)
                {
                    if (ch == '\"' || ch == '\'')
                    {
                        quoteChar = ch;
                        foundQuoteChar = true;
                    }
                }
                else
                {
                    if (ch == quoteChar)
                        return attributeValue.ToString();
                    else if (IsAttributeValueChar(ch) || (ch == '\"' || ch == '\''))
                        attributeValue.Append(ch);
                    else
                        return String.Empty;
                }
            }

            return String.Empty;
        }

        /// <summary>
        /// Získání textu počátečníh otagu elementu uvnitř kterého se nachází index.
        /// </summary>
        /// <param name="xml">XML text</param>
        /// <param name="index">index</param>
        /// <returns>
        /// </returns>
        static string GetActiveElementStartText(string xml, int index)
        {
            int elementStartIndex = GetActiveElementStartIndex(xml, index);
            if (elementStartIndex >= 0 && elementStartIndex < index)
            {
                int elementEndIndex = GetActiveElementEndIndex(xml, index);
                if (elementEndIndex >= index)
                    return xml.Substring(elementStartIndex, elementEndIndex - elementStartIndex);
            }
            return null;
        }

        static int GetActiveElementStartIndex(string xml, int index)
        {
            int elementStartIndex = -1;
            int currentIndex = index - 1;

            for (int i = 0; i < index; ++i)
            {

                char currentChar = xml[currentIndex];
                if (currentChar == '<')
                {
                    elementStartIndex = currentIndex;
                    break;
                }
                else if (currentChar == '>')
                    break;

                --currentIndex;
            }

            return elementStartIndex;
        }

        static int GetActiveElementEndIndex(string xml, int index)
        {
            int elementEndIndex = index;

            for (int i = index; i < xml.Length; ++i)
            {
                char currentChar = xml[i];
                if (currentChar == '>')
                {
                    elementEndIndex = i;
                    break;
                }
                else if (currentChar == '<')
                {
                    elementEndIndex = -1;
                    break;
                }
            }

            return elementEndIndex;
        }

        static QualifiedName GetElementName(string xml)
        {
            string name = String.Empty;

            // nalezení konce názvu elementu
            xml = xml.Replace("\r\n", " ");
            int index = xml.IndexOf(' ');
            name = index > 0 ? xml.Substring(1, index - 1) : xml.Substring(1);

            return GetQualifiedName(name);
        }

        static NamespaceURI GetElementNamespace(string xml)
        {
            NamespaceURI namespaceURI = new NamespaceURI();

            Match match = Regex.Match(xml, ".*?(xmlns\\s*?|xmlns:.*?)=\\s*?['\\\"](.*?)['\\\"]");
            if (match.Success)
            {
                namespaceURI.Namespace = match.Groups[2].Value;

                string xmlns = match.Groups[1].Value.Trim();
                int prefixIndex = xmlns.IndexOf(':');
                if (prefixIndex > 0)
                    namespaceURI.Prefix = xmlns.Substring(prefixIndex + 1);
            }

            return namespaceURI;
        }

        static string ReverseString(string text)
        {
            StringBuilder reversedString = new StringBuilder(text);

            int index = text.Length;
            foreach (char ch in text)
            {
                --index;
                reversedString[index] = ch;
            }

            return reversedString.ToString();
        }

        static int GetCorrectedIndex(int length, int index)
        {
            if (index >= length)
                index = length - 1;
            return index;
        }

        static XmlElementPath GetActiveElementStartPath(string xml, int index, string elementText, QualifiedNameCollection namespaces)
        {
            QualifiedName elementName = GetElementName(elementText);
            if (elementName == null)
                return new XmlElementPath();

            NamespaceURI elementNamespace = GetElementNamespace(elementText);

            XmlElementPath path = GetFullParentElementPath(xml.Substring(0, index), namespaces);

            if (elementName.Prefix.Length > 0 && elementNamespace.Namespace.Length == 0)
            {
                elementName.Namespace = GetNamespaceForPrefix(namespaces, elementName.Prefix);
                elementNamespace.Namespace = elementName.Namespace;
                elementNamespace.Prefix = elementName.Prefix;
            }

            if (elementNamespace.Namespace.Length == 0 && path.Elements.Count > 0)
            {
                QualifiedName parentName = path.Elements[path.Elements.Count - 1];
                elementNamespace.Namespace = parentName.Namespace;
                elementNamespace.Prefix = parentName.Prefix;
            }
            path.Elements.Add(new QualifiedName(elementName.Name, elementNamespace.Namespace, elementNamespace.Prefix));
            path.Compact();
            return path;
        }

        static string GetAttributeName(string xml, int index, bool ignoreWhitespace, bool ignoreQuote, bool ignoreEqualsSign)
        {
            string name = String.Empty;

            StringBuilder reversedAttributeName = new StringBuilder();

            int currentIndex = index;
            bool invalidString = true;

            for (int i = 0; i <= index; ++i)
            {

                char currentChar = xml[currentIndex];

                if (IsXmlNameChar(currentChar))
                {
                    if (!ignoreEqualsSign)
                    {
                        ignoreWhitespace = false;
                        reversedAttributeName.Append(currentChar);
                    }
                }
                else if (Char.IsWhiteSpace(currentChar))
                {
                    if (ignoreWhitespace == false)
                    {
                        invalidString = false;
                        break;
                    }
                }
                else if ((currentChar == '\'') || (currentChar == '\"'))
                {
                    if (ignoreQuote)
                        ignoreQuote = false;
                    else
                        break;
                }
                else if (currentChar == '=')
                {
                    if (ignoreEqualsSign)
                        ignoreEqualsSign = false;
                    else
                        break;
                }
                else if (IsAttributeValueChar(currentChar))
                {
                    if (!ignoreQuote)
                        break;
                }
                else
                    break;

                --currentIndex;
            }

            if (!invalidString)
                name = ReverseString(reversedAttributeName.ToString());

            return name;
        }

        static string GetElementNameAtIndex(string xml, int index)
        {
            int elementStartIndex = GetActiveElementStartIndex(xml, index);
            if (elementStartIndex >= 0 && elementStartIndex < index)
            {
                int elementEndIndex = GetActiveElementEndIndex(xml, index);
                if (elementEndIndex == -1)
                    elementEndIndex = xml.IndexOfAny(whitespaceCharacters, elementStartIndex);
                if (elementEndIndex >= elementStartIndex)
                    return xml.Substring(elementStartIndex, elementEndIndex - elementStartIndex);
            }
            return null;
        }

        static QualifiedName GetQualifiedName(string name)
        {
            if (name.Length == 0)
                return null;

            QualifiedName qualifiedName = new QualifiedName();
            int prefixIndex = name.IndexOf(':');
            if (prefixIndex > 0)
            {
                qualifiedName.Prefix = name.Substring(0, prefixIndex);
                qualifiedName.Name = name.Substring(prefixIndex + 1);
            }
            else
                qualifiedName.Name = name;
            return qualifiedName;
        }

        static XmlElementPath GetFullParentElementPath(string xml, QualifiedNameCollection namespaces)
        {
            XmlElementPath path = new XmlElementPath();
            IDictionary<string, string> namespacesInScope = null;
            using (StringReader reader = new StringReader(xml))
            {
                using (XmlTextReader xmlReader = new XmlTextReader(reader))
                {
                    try
                    {
                        xmlReader.XmlResolver = null;
                        while (xmlReader.Read())
                        {
                            switch (xmlReader.NodeType)
                            {
                                case XmlNodeType.Element:
                                    if (!xmlReader.IsEmptyElement)
                                    {
                                        QualifiedName elementName = new QualifiedName(xmlReader.LocalName, xmlReader.NamespaceURI, xmlReader.Prefix);
                                        path.Elements.Add(elementName);
                                    }
                                    break;
                                case XmlNodeType.EndElement:
                                    path.Elements.RemoveLast();
                                    break;
                            }
                        }
                    }
                    catch (XmlException)
                    {
                        namespacesInScope = xmlReader.GetNamespacesInScope(XmlNamespaceScope.All);
                    }
                }
            }

            if (namespacesInScope != null)
                foreach (KeyValuePair<string, string> ns in namespacesInScope)
                    namespaces.Add(new QualifiedName(String.Empty, ns.Value, ns.Key));

            return path;
        }

        static string GetNamespaceForPrefix(QualifiedNameCollection namespaces, string prefix)
        {
            foreach (QualifiedName name in namespaces)
                if (name.Prefix == prefix)
                    return name.Namespace;
            return String.Empty;
        }

        static XmlElementPath GetActiveElementStartPath(string xml, int index, QualifiedNameCollection namespaces)
        {
            XmlElementPath path = new XmlElementPath();
            string elementText = GetActiveElementStartText(xml, index);
            if (elementText != null)
                path = GetActiveElementStartPath(xml, index, elementText, namespaces);
            return path;
        }

        static XmlElementPath GetActiveElementStartPathAtIndex(string xml, int index, QualifiedNameCollection namespaces)
        {
            index = GetCorrectedIndex(xml.Length, index);
            if (index < 0)
                return new XmlElementPath();
            int currentIndex = index;
            for (; currentIndex < xml.Length; ++currentIndex)
            {
                char ch = xml[currentIndex];
                if (!IsXmlNameChar(ch))
                    break;
            }

            string elementText = GetElementNameAtIndex(xml, currentIndex);
            if (elementText != null)
                return GetActiveElementStartPath(xml, currentIndex, elementText, namespaces);
            return new XmlElementPath();
        }
    }
}

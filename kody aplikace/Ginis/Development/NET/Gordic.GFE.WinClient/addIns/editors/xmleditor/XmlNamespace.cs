//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlNamespace.cs                        </Name>
//    <Description> Namespace Uri a prefix.                                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Namespace Uri a prefix.
    /// </summary>
    public class XmlNamespace
    {
        readonly string prefix = String.Empty;
        readonly string uri = String.Empty;

        const string prefixToStringStart = "Prefix [";
        const string uriToStringMiddle = "] Uri [";

        /// <summary>
        /// Vytvřenín ové instance třídy
        /// </summary>
        /// <param name="prefix">Prefix</param>
        /// <param name="uri">URI</param>
        public XmlNamespace(string prefix, string uri)
        {
            this.prefix = prefix;
            this.uri = uri;
        }
        /// <summary>
        /// Prefix
        /// </summary>
        public string Prefix
        {
            get
            {
                return prefix;
            }
        }
        /// <summary>
        /// URI
        /// </summary>
        public string Uri
        {
            get
            {
                return uri;
            }
        }

        /// <exclude/>
        public override string ToString()
        {
            return String.Concat(prefixToStringStart, prefix, uriToStringMiddle, uri, "]");
        }

        /// <summary>
        /// Vytvoření XmlNamespace instance z řetězce
        /// </summary>
        /// <param name="s">řetězec pro vytvoření</param>
        public static XmlNamespace FromString(string s)
        {
            int prefixIndex = s.IndexOf(prefixToStringStart);
            if (prefixIndex >= 0)
            {
                prefixIndex += prefixToStringStart.Length;
                int uriIndex = s.IndexOf(uriToStringMiddle, prefixIndex);
                if (uriIndex >= 0)
                {
                    string prefix = s.Substring(prefixIndex, uriIndex - prefixIndex);
                    uriIndex += uriToStringMiddle.Length;
                    string uri = s.Substring(uriIndex, s.Length - (uriIndex + 1));
                    return new XmlNamespace(prefix, uri);
                }
            }
            return new XmlNamespace(String.Empty, String.Empty);
        }
    }
}

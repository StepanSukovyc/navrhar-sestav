//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlCharacterDataTreeNode.cs            </Name>
//    <Description> Základní třída XmlTextTreeNodes a XmlCommentTreeNodes       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System;
using System.Xml;
using Gordic.GFE.Parsers.AddIns;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Základní třída XmlTextTreeNodes a XmlCommentTreeNodes
    /// </summary>
    abstract class XmlCharacterDataTreeNode : ExtTreeNode
    {
        XmlCharacterData characterData;

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="characterData">XML data</param>
        public XmlCharacterDataTreeNode(XmlCharacterData characterData)
        {
            this.characterData = characterData;
        }

        /// <summary>
        /// Aktualizace textu větve
        /// </summary>
        public void Update()
        {
            Text = GetDisplayText(characterData.InnerText);
        }

        static string GetDisplayText(string s)
        {
            string[] lines = s.Trim().Split('\n');
            for (int i = 0; i < lines.Length; ++i)
            {
                string line = lines[i].Trim();
                if (line.Length > 0)
                    if (lines.Length == 1)
                        return line;
                    else
                        return String.Concat(line, "...");
            }
            return String.Empty;
        }
    }
}

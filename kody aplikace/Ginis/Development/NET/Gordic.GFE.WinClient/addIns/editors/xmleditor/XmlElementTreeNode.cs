//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlElementTreeNode.cs                  </Name>
//    <Description> Prezentace XmlElement v XML stromu.                         </Description>
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
    /// Prezentace XmlElement v XML stromu.
    /// </summary>
    class XmlElementTreeNode : ExtTreeNode
    {
        /// <summary>
        /// Klíč k obrázku větve stromu
        /// </summary>
        public const string XmlElementTreeNodeImageKey = "XmlElementTreeNodeImage";
        /// <summary>
        /// Klíč ke stínovému obrázku větve stromu
        /// </summary>
        public const string XmlElementTreeNodeGhostImageKey = "XmlElementTreeNodeGhostImage";

        XmlElement element;
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="element">Xml element</param>
        public XmlElementTreeNode(XmlElement element)
        {
            this.element = element;
            Text = GetDisplayText(element);
            Tag = element;
            ImageKey = XmlElementTreeNodeImageKey;

            if (element.HasChildNodes)
                Nodes.Add(new ExtTreeNode());
        }

        /// <summary>
        /// XmlElement asociovaný z danou větví.
        /// </summary>
        public XmlElement XmlElement
        {
            get
            {
                return element;
            }
        }

        /// <summary>
        /// Indikuje zobarzení stínového obrázku
        /// </summary>
        public bool ShowGhostImage
        {
            get
            {
                return ImageKey == XmlElementTreeNodeGhostImageKey;
            }
            set
            {
                if (value)
                    ImageKey = XmlElementTreeNodeGhostImageKey;
                else
                    ImageKey = XmlElementTreeNodeImageKey;
                SelectedImageKey = ImageKey;
            }
        }

        /// <summary>
        /// Přidání vnitřních elementů do stromu.
        /// </summary>
        protected override void Initialize()
        {
            Nodes.Clear();
            foreach (XmlNode childNode in element.ChildNodes)
            {
                XmlText text = childNode as XmlText;
                XmlComment comment = childNode as XmlComment;
                if (childNode is XmlElement childElement)
                {
                    XmlElementTreeNode treeNode = new XmlElementTreeNode(childElement);
                    treeNode.AddTo(this);
                }
                else if (text != null)
                {
                    XmlTextTreeNode treeNode = new XmlTextTreeNode(text);
                    treeNode.AddTo(this);
                }
                else if (comment != null)
                {
                    XmlCommentTreeNode treeNode = new XmlCommentTreeNode(comment);
                    treeNode.AddTo(this);
                }
            }
        }

        static string GetDisplayText(XmlElement element)
        {
            if (element.Prefix.Length > 0)
                return String.Concat(element.Prefix, ":", element.LocalName);
            return element.LocalName;
        }
    }
}

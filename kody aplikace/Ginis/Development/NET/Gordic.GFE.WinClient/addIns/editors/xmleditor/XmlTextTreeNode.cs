//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlTextTreeNode.cs                     </Name>
//    <Description> Prezentuje XmlText větev stromu.                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System.Xml;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Prezentuje XmlText větev stromu.
    /// </summary>
    class XmlTextTreeNode : XmlCharacterDataTreeNode
    {
        /// <summary>
        /// Klíč k obrázku
        /// </summary>
        public const string XmlTextTreeNodeImageKey = "XmlTextTreeNodeImage";
        /// <summary>
        /// Klíč ke stínobému obrázku větve
        /// </summary>
        public const string XmlTextTreeNodeGhostImageKey = "XmlTextTreeNodeGhostImage";
        readonly XmlText xmlText;

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="xmlText">Xml text</param>
        public XmlTextTreeNode(XmlText xmlText)
            : base(xmlText)
        {
            this.xmlText = xmlText;
            ImageKey = XmlTextTreeNodeImageKey;
            SelectedImageKey = ImageKey;
            Update();
        }

        /// <summary>
        /// XmlText asociovaný z danou větví.
        /// </summary>
        public XmlText XmlText
        {
            get
            {
                return xmlText;
            }
        }

        /// <summary>
        /// Indikuje zobrazení stínového obrázku.
        /// </summary>
        public bool ShowGhostImage
        {
            get
            {
                return ImageKey == XmlTextTreeNodeGhostImageKey;
            }
            set
            {
                if (value)
                    ImageKey = XmlTextTreeNodeGhostImageKey;
                else
                    ImageKey = XmlTextTreeNodeImageKey;
                SelectedImageKey = ImageKey;
            }
        }
    }
}

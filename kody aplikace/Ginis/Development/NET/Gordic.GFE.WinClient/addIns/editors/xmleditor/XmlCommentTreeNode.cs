//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.XmlCommentTreeNode.cs                  </Name>
//    <Description> Prezentuje xml komentář stromu.                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System.Xml;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Prezentuje xml komentář stromu.
    /// </summary>
    class XmlCommentTreeNode : XmlCharacterDataTreeNode
    {
        /// <summary>
        /// Klíč k obrázku komentáře
        /// </summary>
        public const string XmlCommentTreeNodeImageKey = "XmlCommentTreeNodeImage";
        /// <summary>
        /// Klíč stínového obrázku
        /// </summary>
        public const string XmlCommentTreeNodeGhostImageKey = "XmlCommentTreeNodeGhostImage";
        readonly XmlComment comment;
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="comment">Koentář</param>
        public XmlCommentTreeNode(XmlComment comment)
            : base(comment)
        {
            this.comment = comment;
            ImageKey = XmlCommentTreeNodeImageKey;
            SelectedImageKey = ImageKey;
            Update();
        }

        /// <summary>
        ///  XmlComment asociovaný z daným elementem stromu.
        /// </summary>
        public XmlComment XmlComment
        {
            get
            {
                return comment;
            }
        }

        /// <summary>
        /// Indikuje zobrazení stínového obrázku
        /// </summary>
        public bool ShowGhostImage
        {
            get
            {
                return ImageKey == XmlCommentTreeNodeGhostImageKey;
            }
            set
            {
                if (value)
                    ImageKey = XmlCommentTreeNodeGhostImageKey;
                else
                    ImageKey = XmlCommentTreeNodeImageKey;
                SelectedImageKey = ImageKey;
            }
        }
    }
}

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ContentComment.cs                        </Name>
//    <Description> Komentář GRF sestavy                                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Editor;

namespace Gordic.GFE.WinClient.GrfEditor
{
    /// <summary>
    /// Komentář GRF sestavy
    /// </summary>
    class GrfContentComment : AbstractContent, IComment
    {
        #region AbstractContent
        /// <summary>
        /// Načtení informaci o objektu z formátu objektu
        /// </summary>
        public override void LoadInformation()
        {
            Left = new SizeValue(0);
            Top = new SizeValue(0);
            Height = new SizeValue(0);
            Width = new SizeValue(0);

            //Zafixujeme datovou položku
            GFEFormatComment content = (GFEFormatComment)FormatTag;

            //Pokud se nejedná o datovou položku pak není co řešit 
            if (content == null)
                return;

            //pozice řádku, ve kterém začíná Tag
            StartPosition = content.LinePosition - 1;
            CommentText = content.CommentText;
            TagName = content.TagName;
        }
        /// <exclude/>
        /// <remarks>Komentář není zapotřebí kreslit</remarks>
        public override void OnPaint(Graphics graphics, PaintArgs args) { }
        /// <exclude/>
        /// <remarks>Komentář není zapotřebí kreslit</remarks>
        public override void OnPaintBorder(Graphics graphics, bool isSelected) { }
        #endregion

        #region IComment
        UndoRedo<string> commenttext;
        /// <summary>
        /// Text komentáře
        /// </summary>
        [Category("Komentář")]
        [DisplayName("text")]
        [Description("Text komentáře")]
        public string CommentText { get { return commenttext.Value; } set { commenttext.Value = value; } }

        UndoRedo<string> tagname;
        /// <summary>
        /// Název větve
        /// </summary>
        [Category("Komentář")] //RC  : Komentář
        [DisplayName("název větve")] //RC  : název větve
        [Description("Název větve komentáře v souboru sestavy")] //RC  : Název větve komentáře v souboru sestavy
        public string TagName { get { return tagname.Value; } set { tagname.Value = value; } }
        #endregion

        /// <summary>
        /// inicializace objektu
        /// </summary>
        public override AbstractContent Initialize()
        {
            base.Initialize();
            commenttext = new UndoRedo<string>();
            tagname = new UndoRedo<string>();
            ComponentType = ComponentType.comment;
            return this;
        }

        /// <summary>
        /// Metoda uložení XML struktury samotného elementu
        /// </summary>
        /// <param name="xmlDoc">Dokument, do kterého se struktura vkládá</param>
        /// <param name="xmlItems">Element, do kterého se struktura vkládá</param>
        /// <returns></returns>
        internal void SetXmlData(XmlDocument xmlDoc, XmlElement xmlItems)
        {
            xmlItems.AppendChild(xmlDoc.CreateComment(CommentText));
        }

        public override XmlLinkedNode GetDataComponent(XmlDocumentPosition xmlDoc, bool withRect = true, string namespaceUri = null, List<GFEList> styles = null, string regionFullName = null)
        {
            return xmlDoc.CreateComment(CommentText);
        }

    }
}

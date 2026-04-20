//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrrContentComment.cs                   </Name>
//    <Description> komentář grr objektu                                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-24                                                  </Created>
//  </FileHeader>

using System.ComponentModel;
using System.Drawing;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Utils;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// komentář grr objektu
    /// </summary>
    class GrrContentComment : AbstractContentLineable, IComment
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
        /// <param name="isSelected">indikátor vybranosti objektu</param>
        /// <param name="graphics">ovladač grafiky</param>
        public override void OnPaintBorder(Graphics graphics, bool isSelected) { }
        /// <summary>
        /// nastavení výšky dle obsahu
        /// </summary>
        public override void SetHeightByContent() { }
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
        [Category("Komentář")]
        [DisplayName("název větve")]
        [Description("Název větve komentáře v souboru sestavy")]
        public string TagName { get { return tagname.Value; } set { tagname.Value = value; } }
        #endregion

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
    }
}

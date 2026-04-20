//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrfContentBox.cs                       </Name>
//    <Description> jednotka kontaineru                                         </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2016-09-23                                                  </Created>
//  </FileHeader>

using System.Drawing;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.WinClient.Editor;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.Box
{
    /// <summary>
    /// jednotka kontaineru
    /// </summary>
    class GrfContentBox : AbstractContent, IBox
    {
        #region IBox
        readonly UndoRedo<string> guid = new UndoRedo<string>();
        /// <summary>
        /// Jednoznačný identifikátor objektu
        /// </summary>
        public string GUID { get { return guid.Value; } set { guid.Value = value; } }
        #endregion

        #region IPaintable
        /// <summary>
        /// kreslení ohraničení objektu
        /// </summary>
        /// <param name="graphics">ovladač grafiky</param>
        /// <param name="isSelected"></param>
        public override void OnPaintBorder(Graphics graphics, bool isSelected)
        {
            graphics.DrawRectangle(new Pen(new SolidBrush(Surround.FrameColor.AllValue.Color), 1), LeftZoom, TopZoom, BoundsInPixels.Width, BoundsInPixels.Height);
        }
        #endregion

        /// <summary>
        /// Načtení informaci o objektu z formátu objektu
        /// </summary>
        public override void LoadInformation()
        {
            // pokud se nejedná o datovou položku pak není co řešit 
            if (FormatTag is GFEFormatUnknownContent)
                base.LoadInformation();
            else
                CommonService.ApplayStyle(this, AttrList);

            if (FormatTag != null)
                //pozice řádku, ve kterém začíná Tag
                StartPosition = FormatTag.LinePosition - 1;

            if (AttrList.ContainsKey("rect"))
                TagService.SetRectByAttribute(this, AttrList["rect"]);

            if (AttrList.ContainsKey("guid"))
                GUID = AttrList["guid"];
        }
    }
}

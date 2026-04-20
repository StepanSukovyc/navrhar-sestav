//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ContentUnknown.cs                     </Name>
//    <Description> Obsah neznámých větví GRF sestav                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System.Drawing;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Obsah neznámých větví GRF sestav
    /// </summary>
    [ComVisible(false)]
    public class DefaultContentUnknown : DefaultContentRegion
    {
        /// <summary>
        /// Načtení informaci o objektu z formátu objektu
        /// </summary>
        public override void LoadInformation()
        {
            //pozice řádku, ve kterém začíná Tag
            StartPosition = FormatTag.LinePosition;

            TagService.SetRectByTag(this, FormatTag);

            TagName = FormatTag.TagName;
            //Text = new TagText((FormatTag as GFEFormatUnknown).Text);

            if (FormatTag.Attributes.ContainsKey("format"))
                Text.Format = FormatTag.Attributes["format"];
        }

        /// <summary>
        /// Kreslení objektu
        /// </summary>
        /// <param name="graphics">Ovladač grafiky</param>
        /// <param name="args">Upřesnení co a jak vykreslovat</param>
        public override void OnPaint(Graphics graphics, PaintArgs args) { }
        /// <summary>
        /// Název větve
        /// </summary>
        public string TagName { get; set; }

        /// <summary>
        /// inicializace třídy
        /// </summary>
        public override void Initialize()
        {
            base.Initialize();
            ComponentType = ComponentType.none;
        }
    }
}

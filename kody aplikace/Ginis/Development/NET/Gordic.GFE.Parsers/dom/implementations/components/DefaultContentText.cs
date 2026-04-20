//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ContentText.cs                        </Name>
//    <Description> Textová položka GRF sestavy                                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Textová položka GRF sestavy
    /// </summary>
    public class DefaultContentText : DefaultAbstractContent, IInlineContent
    {
        #region AbstractContent
        /// <summary>
        /// Načtení informaci o objektu z formátu daného objektu
        /// </summary>
        public override void LoadInformation()
        {
            if (isLoaded)
                return;

            //Pokud to není textové pole pak není co řešit
            if (!(FormatTag is GFEFormatContentText t)) return;
            Text.Text = t.Text;

            base.LoadInformation();
        }
        #endregion

        /// <summary>
        /// inicializace objektu
        /// </summary>
        /// <param name="item">položka s informaci o objektu</param>
        /// <param name="view">pohled objektu</param>
        public override void Initialize(GFEFormatTag item, IViewContent view)
        {
            base.Initialize(item, view);
            ComponentType = ComponentType.text;
            LoadInformation();
        }
        InlineText IInlineContent.InlineText => Text.Inline;

    }
}

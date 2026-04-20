//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ImageContext.cs                        </Name>
//    <Description> Jedná se o kontext větve 'image'.                           </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-12-01                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Lexer;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Jedná se o kontext větve 'image'.
    /// </summary>
    class ImageContext : Gordic.GFE.Parsers.Binding.ExpressionContext.DefaultExpressionContext
    {
        static ImageContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static ImageContext Instance
        {
            get
            {
                if (instance == null)
                    new ImageContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public ImageContext()
            : base("image")
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text větve 'image'
    /// </summary>
    sealed class ImageTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
    {
        /// <summary>
        /// položky klíče
        /// </summary>
        public override System.Collections.ArrayList Items
        {
            get
            {
                _Initialize();
                return base.Items;
            }
        }
        /// <summary>
        /// inicializace seznamu klíčů
        /// </summary>
        protected override void _Initialize()
        {
            items = new System.Collections.ArrayList
            {
                new TokenObject("file", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451323)),
                new TokenObject("global", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451324)),
                new TokenObject("image-width", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451325)),
                new TokenObject("image-height", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451325)),
                new TokenObject("onLoad", Gordic.GFE.Parsers.Services.ClassBrowserIconService.ScriptIndex, GResources.GetResourceText(29451326)),
                new TokenObject("width", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451327)),
                new TokenObject("height", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451327)),
                new TokenObject("rect", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451328)),
                new TokenObject("page", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451329)),
                new TokenObject("row", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451330)),
                new TokenObject("style", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451331))
            };
        }
    }

    /// <summary>
    /// Jedná se o kontext vnitřních větví větve 'image'
    /// </summary>
    class AreaImageContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AreaExpressionContext
    {
        static AreaImageContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static AreaImageContext Instance
        {
            get
            {
                if (instance == null)
                    new AreaImageContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public AreaImageContext()
            : base("image area")
        {
            instance = this;
        }
    }
}

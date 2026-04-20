//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.PaperSettingContext.cs                 </Name>
//    <Description> Jedná se o kontext větve 'paper-setting'.                   </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-12-01                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Lexer;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Jedná se o kontext větve 'paper-setting'.
    /// </summary>
    class PaperSettingContext : Gordic.GFE.Parsers.Binding.ExpressionContext.DefaultExpressionContext
    {
        static PaperSettingContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static PaperSettingContext Instance
        {
            get
            {
                if (instance == null)
                    new GroupContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public PaperSettingContext()
            : base("paper-setting")
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text větve 'paper-setting'
    /// </summary>
    sealed class PaperSettingTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
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
                new TokenObject("paper-width", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451349)),
                new TokenObject("paper-height", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451350)),
                new TokenObject("left-margin", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451351)),
                new TokenObject("right-margin", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451352)),
                new TokenObject("top-margin", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451353)),
                new TokenObject("bottom-margin", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451354)),
                new TokenObject("page-count", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451355)),
                new TokenObject("interactive-media", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451356)),
                new TokenObject("media", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451357))
            };
        }
    }

    /// <summary>
    /// Jedná se o kontext vnitřních větví větve 'paper-setting'
    /// </summary>
    class AreaPaperSettingContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AreaExpressionContext
    {
        static AreaPaperSettingContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static AreaPaperSettingContext Instance
        {
            get
            {
                if (instance == null)
                    new AreaPaperSettingContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public AreaPaperSettingContext()
            : base("paper-setting area")
        {
            instance = this;
        }
    }
}

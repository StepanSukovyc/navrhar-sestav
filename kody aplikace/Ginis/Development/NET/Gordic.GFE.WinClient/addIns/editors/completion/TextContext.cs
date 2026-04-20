//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.TextContext.cs                         </Name>
//    <Description> Jedná se o kontext větve 'text'.                            </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-12-01                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Lexer;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Jedná se o kontext větve 'text'.
    /// </summary>
    class TextContext : Gordic.GFE.Parsers.Binding.ExpressionContext.DefaultExpressionContext
    {
        static TextContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static TextContext Instance
        {
            get
            {
                if (instance == null)
                    new TextContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public TextContext()
            : base("text")
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text větve 'text'
    /// </summary>
    sealed class TextTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
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
                new TokenObject("value", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451417)),
                new TokenObject("onLoad", Gordic.GFE.Parsers.Services.ClassBrowserIconService.ScriptIndex, GResources.GetResourceText(29451418)),
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
    /// Jedná se o kontext vnitřních větví větve 'text'
    /// </summary>
    class AreaTextContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AreaExpressionContext
    {
        static AreaTextContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static AreaTextContext Instance
        {
            get
            {
                if (instance == null)
                    new AreaTextContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public AreaTextContext()
            : base("text area")
        {
            instance = this;
        }
    }
}

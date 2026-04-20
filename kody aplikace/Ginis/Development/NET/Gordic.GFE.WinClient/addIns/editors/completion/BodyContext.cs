//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.BodyContext.cs                         </Name>
//    <Description> Jedná se o kontext větve 'body'.                            </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-12-02                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Lexer;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Jedná se o kontext větve 'body'.
    /// </summary>
    class BodyContext : Gordic.GFE.Parsers.Binding.ExpressionContext.DefaultExpressionContext
    {
        static BodyContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static BodyContext Instance
        {
            get
            {
                if (instance == null)
                    new BodyContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public BodyContext()
            : base("body")
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text větve 'body'
    /// </summary>
    sealed class BodyTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
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
            items = new System.Collections.ArrayList();
        }
    }

    /// <summary>
    /// Jedná se o kontext vnitřních větví větve 'body'
    /// </summary>
    class AreaBodyContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AreaExpressionContext
    {
        static AreaBodyContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static AreaBodyContext Instance
        {
            get
            {
                if (instance == null)
                    new AreaBodyContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public AreaBodyContext()
            : base("body area")
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text větve 'body'
    /// </summary>
    sealed class AreaBodyTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
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
                new TokenObject("region", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29451296)),
                new TokenObject("style", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29451297)),
                new TokenObject("line", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29451298)),
                new TokenObject("rtfref", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29451299)),
                new TokenObject("rtf", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29451300)),
                new TokenObject("value-of", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29451301)),
                new TokenObject("image", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29450937)),
                new TokenObject("button", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29451302)),
                new TokenObject("chart", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29450946)),
                new TokenObject("table", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29451303)),
                new TokenObject("grid", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29451304)),
                new TokenObject("drawing", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29451305)),
                new TokenObject("barcode", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29451306)),
                new TokenObject("attachment", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29451307))
            };
        }
    }

}

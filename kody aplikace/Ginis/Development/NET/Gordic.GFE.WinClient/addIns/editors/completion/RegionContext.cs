//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.RegionContext.cs                       </Name>
//    <Description> Jedná se o kontext větve 'region'.                          </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-12-02                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Lexer;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Jedná se o kontext větve 'region'.
    /// </summary>
    class RegionContext : Gordic.GFE.Parsers.Binding.ExpressionContext.DefaultExpressionContext
    {
        static RegionContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static RegionContext Instance
        {
            get
            {
                if (instance == null)
                    new RegionContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public RegionContext()
            : base("region")
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text větve 'region'
    /// </summary>
    sealed class RegionTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
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
                new TokenObject("name", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451358)),
                new TokenObject("only-if", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451345)),
                new TokenObject("filter-out", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451345)),
                new TokenObject("filter-in", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451345)),
                new TokenObject("order-by", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451359))
            };
        }
    }

    /// <summary>
    /// Jedná se o kontext vnitřních větví větve 'region'
    /// </summary>
    class AreaRegionContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AreaExpressionContext
    {
        static AreaRegionContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static AreaRegionContext Instance
        {
            get
            {
                if (instance == null)
                    new AreaRegionContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public AreaRegionContext()
            : base("region area")
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text větve 'region'
    /// </summary>
    sealed class AreaRegionTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
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
                new TokenObject("body", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29451360)),
                new TokenObject("head", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29451361)),
                new TokenObject("foot", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29451362)),
                new TokenObject("group", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29451014)),
                new TokenObject("variable", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29451363))
            };
        }
    }
}

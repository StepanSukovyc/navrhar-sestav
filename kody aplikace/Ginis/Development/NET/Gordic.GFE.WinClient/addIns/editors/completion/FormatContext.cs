//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FormatContext.cs                       </Name>
//    <Description> Jedná se o kontext větve 'format'.                          </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-12-02                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Lexer;
using Gordic.GFE.Parsers.Services;
using System.Collections;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Jedná se o kontext větve 'format'.
    /// </summary>
    class FormatContext : Gordic.GFE.Parsers.Binding.ExpressionContext.DefaultExpressionContext
    {
        static FormatContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static FormatContext Instance
        {
            get
            {
                if (instance == null)
                    new FormatContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public FormatContext()
            : base("format")
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text větve 'format'
    /// </summary>
    sealed class FormatTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
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
                new TokenObject("xmlns", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451311)),
                new TokenObject("type", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451312))
            };
        }
    }

    /// <summary>
    /// Jedná se o kontext vnitřních větví větve 'format'
    /// </summary>
    class AreaFormatContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AreaExpressionContext
    {
        static AreaFormatContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static AreaFormatContext Instance
        {
            get
            {
                if (instance == null)
                    new AreaFormatContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public AreaFormatContext()
            : base("format area")
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text větve 'format'
    /// </summary>
    sealed class AreaFormatTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
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
                new TokenObject("info", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29451313)),
                new TokenObject("region", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29451296)),
                new TokenObject("template", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29450173)),
                new TokenObject("rtfref", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29451299)),
                new TokenObject("rtf", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29451300)),
                new TokenObject("script", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29451314)),
                new TokenObject("paper-setting", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29451315))
            };
        }
    }

    /// <summary>
    /// Jedná se o kontext atributu 'type'.
    /// </summary>
    class FormatTypeContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AttributeExpressionContext
    {
        static FormatTypeContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static FormatTypeContext Instance
        {
            get
            {
                if (instance == null)
                    new FormatTypeContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public FormatTypeContext()
            : base(true)
        {
            instance = this;
        }
    }

    /// <summary>
    /// klíče pro nápovědný text typu sestavy
    /// </summary>
    public sealed class FormatTypeTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
    {
        /// <summary>
        /// inicializace seznamu klíčů
        /// </summary>
        protected override void _Initialize()
        {
            items = new ArrayList
            {
                new TokenObject("grr", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451316)),
                new TokenObject("grf", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451317)),
                new TokenObject("mse", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451318)),
                new TokenObject("oxs", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451319)),
                new TokenObject("rtf", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451320))
            };
        }
    }

    /// <summary>
    /// Jedná se o kontext atributu 'xmlns'.
    /// </summary>
    class FormatXmlnsContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AttributeExpressionContext
    {
        static FormatXmlnsContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static FormatXmlnsContext Instance
        {
            get
            {
                if (instance == null)
                    new FormatXmlnsContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public FormatXmlnsContext()
            : base(true)
        {
            instance = this;
        }
    }

    /// <summary>
    /// klíče pro nápovědný text XMLNS sestavy
    /// </summary>
    sealed class FormatXmlnsTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
    {
        /// <summary>
        /// inicializace seznamu klíčů
        /// </summary>
        protected override void _Initialize()
        {
            items = new ArrayList
            {
                new TokenObject("http://www.gordic.cz/TR/alf/1.3/", ClassBrowserIconService.ParameterIndex, "http://www.gordic.cz/TR/alf/1.3/"),
                new TokenObject("http://www.gordic.cz/TR/alf/1.4/", ClassBrowserIconService.ParameterIndex, "http://www.gordic.cz/TR/alf/1.4/")
            };
        }
    }

}

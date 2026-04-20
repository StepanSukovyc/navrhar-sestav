//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.LineContext.cs                         </Name>
//    <Description> Jedná se o kontext větve 'line'.                            </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-12-01                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Lexer;
using Gordic.GFE.Parsers.Services;
using System.Collections;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Jedná se o kontext větve 'line'.
    /// </summary>
    class LineContext : Gordic.GFE.Parsers.Binding.ExpressionContext.DefaultExpressionContext
    {
        static LineContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static LineContext Instance
        {
            get
            {
                if (instance == null)
                    new LineContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public LineContext()
            : base("line", true)
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text větve 'line'
    /// </summary>
    sealed class LineTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
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
                new TokenObject("on-each-page", ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451341)),
                new TokenObject("break-page-before", ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451342)),
                new TokenObject("break-page-after", ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451343)),
                new TokenObject("endpage", ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451344)),
                new TokenObject("only-if", ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451345))
            };
        }
    }

    /// <summary>
    /// Jedná se o kontext vnitřních větví větve 'line'
    /// </summary>
    class AreaLineContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AreaExpressionContext
    {
        static AreaLineContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static AreaLineContext Instance
        {
            get
            {
                if (instance == null)
                    new AreaLineContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public AreaLineContext()
            : base("line area")
        {
            instance = this;
        }
    }

    /// <summary>
    /// Jedná se o kontext atributu 'break-page-before' a 'break-page-after'
    /// </summary>
    class LineBreakPageContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AttributeExpressionContext
    {
        static LineBreakPageContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static LineBreakPageContext Instance
        {
            get
            {
                if (instance == null)
                    new LineBreakPageContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public LineBreakPageContext()
            : base(true)
        {
            instance = this;
        }
    }

    /// <summary>
    /// klíče pro nápovědný text atributu 'break-page-before' a 'break-page-after'
    /// </summary>
    sealed class LineBreakPageTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
    {
        /// <summary>
        /// inicializace seznamu klíčů
        /// </summary>
        protected override void _Initialize()
        {
            items = new ArrayList
            {
                new TokenObject("none", ClassBrowserIconService.ParameterIndex, "none = false"),
                new TokenObject("always", ClassBrowserIconService.ParameterIndex, "always = true"),
                new TokenObject("avoid", ClassBrowserIconService.ParameterIndex, "")
            };
        }
    }

    /// <summary>
    /// Jedná se o kontext atributu 'on-each-page'
    /// </summary>
    class OnEachPageContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AttributeExpressionContext
    {
        static OnEachPageContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static OnEachPageContext Instance
        {
            get
            {
                if (instance == null)
                    new OnEachPageContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public OnEachPageContext()
            : base(true)
        {
            instance = this;
        }
    }

    /// <summary>
    /// klíče pro nápovědný text atributu 'on-each-page'
    /// </summary>
    sealed class OnEachPageTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
    {
        /// <summary>
        /// inicializace seznamu klíčů
        /// </summary>
        protected override void _Initialize()
        {
            items = new ArrayList
            {
                new TokenObject("true", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451346)),
                new TokenObject("false", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451347)),
                new TokenObject("middle", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451348))
            };
        }
    }

}

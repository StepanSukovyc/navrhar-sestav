//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ValueOfContext.cs                      </Name>
//    <Description> Jedná se o kontext větve 'value-of'.                        </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-12-01                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Lexer;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Jedná se o kontext větve 'value-of'.
    /// </summary>
    class ValueOfContext : Gordic.GFE.Parsers.Binding.ExpressionContext.DefaultExpressionContext
    {
        static ValueOfContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static ValueOfContext Instance
        {
            get
            {
                if (instance == null)
                    new ValueOfContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public ValueOfContext()
            : base("value-of")
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text větve 'image'
    /// </summary>
    sealed class ValueOfTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
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
                new TokenObject("name", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451419)),
                new TokenObject("format", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451420)),
                new TokenObject("onPrint", Gordic.GFE.Parsers.Services.ClassBrowserIconService.ScriptIndex, GResources.GetResourceText(29451421)),
                new TokenObject("onEnter", Gordic.GFE.Parsers.Services.ClassBrowserIconService.ScriptIndex, GResources.GetResourceText(29451422)),
                new TokenObject("onData", Gordic.GFE.Parsers.Services.ClassBrowserIconService.ScriptIndex, GResources.GetResourceText(29451423)),
                new TokenObject("onLoad", Gordic.GFE.Parsers.Services.ClassBrowserIconService.ScriptIndex, GResources.GetResourceText(29451424)),
                new TokenObject("width", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451327)),
                new TokenObject("height", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451327)),
                new TokenObject("rect", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451328)),
                new TokenObject("page", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451329)),
                new TokenObject("row", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451330)),
                new TokenObject("style", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451331)),
                new TokenObject("cell", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451425)),
                new TokenObject("type", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451426)),
                new TokenObject("rtf", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451427)),
                new TokenObject("instance", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451428))
            };
        }
    }

    /// <summary>
    /// Jedná se o kontext vnitřních větví větve 'value-of'
    /// </summary>
    class AreaValueOfContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AreaExpressionContext
    {
        static AreaValueOfContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static AreaValueOfContext Instance
        {
            get
            {
                if (instance == null)
                    new AreaValueOfContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public AreaValueOfContext()
            : base("value-of area")
        {
            instance = this;
        }
    }

}

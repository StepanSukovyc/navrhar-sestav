//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.StyleContext.cs                        </Name>
//    <Description> Jedná se o kontext větve 'style'.                           </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-12-01                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Lexer;
using Gordic.GFE.Parsers.Services;
using System.Collections;
using System.Drawing;
using System.Drawing.Text;
using System.Linq;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Jedná se o kontext větve 'style'.
    /// </summary>
    class StyleContext : Gordic.GFE.Parsers.Binding.ExpressionContext.DefaultExpressionContext
    {
        static StyleContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static StyleContext Instance
        {
            get
            {
                if (instance == null)
                    new StyleContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public StyleContext()
            : base("style", true)
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text větve 'style'
    /// </summary>
    sealed class StyleTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
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
                new TokenObject("id", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451366)),
                new TokenObject("width", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451367)),
                new TokenObject("height", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451368)),
                new TokenObject("font-face", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29450753)),
                new TokenObject("font-name", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451369)),
                new TokenObject("font-charset", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451370)),
                new TokenObject("font-size", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29450754)),
                new TokenObject("font-bold", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451371)),
                new TokenObject("font-italic", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29450711)),
                new TokenObject("font-underline", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451372)),
                new TokenObject("font-strikeout", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451373)),
                new TokenObject("font-color", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29450752)),
                new TokenObject("border-width", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451374)),
                new TokenObject("left-border-width", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451375)),
                new TokenObject("right-border-width", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451376)),
                new TokenObject("top-border-width", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451377)),
                new TokenObject("bottom-border-width", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451378)),
                new TokenObject("border-color", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451379)),
                new TokenObject("left-border-color", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451380)),
                new TokenObject("right-border-color", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451381)),
                new TokenObject("top-border-color", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451382)),
                new TokenObject("bottom-border-color", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451383)),
                new TokenObject("border-style", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451384)),
                new TokenObject("left-border-style", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451385)),
                new TokenObject("right-border-style", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451386)),
                new TokenObject("top-border-style", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451387)),
                new TokenObject("bottom-border-style", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451388)),
                new TokenObject("horizontal-align", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451389)),
                new TokenObject("align", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451389)),
                new TokenObject("vertical-align", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451390)),
                new TokenObject("ellipsis-style", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451391)),
                new TokenObject("ellipsis-char", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451392)),
                new TokenObject("multiline", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451278)),
                new TokenObject("spacing", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451393)),
                new TokenObject("left-spacing", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451394)),
                new TokenObject("right-spacing", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451395)),
                new TokenObject("top-spacing", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451396)),
                new TokenObject("bottom-spacing", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451397)),
                new TokenObject("padding", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451398)),
                new TokenObject("left-padding", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451399)),
                new TokenObject("right-padding", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451400)),
                new TokenObject("top-padding", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451401)),
                new TokenObject("bottom-padding", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451402)),
                new TokenObject("background-color", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451403)),
                new TokenObject("text-orientation", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451404)),
                new TokenObject("inside-border", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451405))
            };
        }
    }
    /// <summary>
    /// Jedná se o kontext vnitřních větví větve 'style'
    /// </summary>
    class AreaStyleContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AreaExpressionContext
    {
        static AreaStyleContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static AreaStyleContext Instance
        {
            get
            {
                if (instance == null)
                    new AreaStyleContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public AreaStyleContext()
            : base("style area")
        {
            instance = this;
        }
    }

    /// <summary>
    /// Jedná se o kontext atributu 'horizontal-align', 'align'
    /// </summary>
    class StyleAlignContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AttributeExpressionContext
    {
        static StyleAlignContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static StyleAlignContext Instance
        {
            get
            {
                if (instance == null)
                    new StyleAlignContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public StyleAlignContext()
            : base(true)
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text horizontálního zarovnání
    /// </summary>
    sealed class StyleAlignTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
    {
        /// <summary>
        /// inicializace seznamu klíčů
        /// </summary>
        protected override void _Initialize()
        {
            items = new ArrayList
            {
                new TokenObject("left", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451406)),
                new TokenObject("right", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451407)),
                new TokenObject("center", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451408)),
                new TokenObject("justify", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451409))
            };
        }
    }

    /// <summary>
    /// Jedná se o kontext atributu 'font-face'.
    /// </summary>
    class StyleFontFaceContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AttributeExpressionContext
    {
        static StyleFontFaceContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static StyleFontFaceContext Instance
        {
            get
            {
                if (instance == null)
                    new StyleFontFaceContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public StyleFontFaceContext()
            : base(true)
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text
    /// </summary>
    sealed class StyleFontFaceTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
    {
        /// <summary>
        /// inicializace seznamu klíčů
        /// </summary>
        protected override void _Initialize()
        {
            items = new ArrayList();

            foreach (var item in CommonService.Fonts.Values.ToList())
                items.Add(new TokenObject(item, ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451410)));

            items.Add(new TokenObject("custom", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451410)));
        }
    }

    /// <summary>
    /// Jedná se o kontext atributu 'vertical-align'.
    /// </summary>
    class StyleVerticalAlignContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AttributeExpressionContext
    {
        static StyleVerticalAlignContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static StyleVerticalAlignContext Instance
        {
            get
            {
                if (instance == null)
                    new StyleVerticalAlignContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public StyleVerticalAlignContext()
            : base(true)
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text
    /// </summary>
    sealed class StyleVerticalAlignTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
    {
        /// <summary>
        /// inicializace seznamu klíčů
        /// </summary>
        protected override void _Initialize()
        {
            items = new ArrayList
            {
                new TokenObject("bottom", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451411)),
                new TokenObject("center", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451412)),
                new TokenObject("top", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451413))
            };
        }
    }

    /// <summary>
    /// Jedná se o kontext atributu 'font-name'.
    /// </summary>
    class StyleFontNameContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AttributeExpressionContext
    {
        static StyleFontNameContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static StyleFontNameContext Instance
        {
            get
            {
                if (instance == null)
                    new StyleFontNameContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public StyleFontNameContext()
            : base(true)
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text názvu písma
    /// </summary>
    sealed class StyleFontNameTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
    {
        /// <summary>
        /// inicializace seznamu klíčů
        /// </summary>
        protected override void _Initialize()
        {
            items = new ArrayList();

            foreach (var item in CommonService.Fonts)
                items.Add(new TokenObject(item.Key, ClassBrowserIconService.ParameterIndex, item.Value));

            InstalledFontCollection ifc = new InstalledFontCollection();
            foreach (FontFamily item in ifc.Families)
                if (item.IsStyleAvailable(FontStyle.Regular)
                    && item.IsStyleAvailable(FontStyle.Bold)
                    && item.IsStyleAvailable(FontStyle.Italic))
                    items.Add(new TokenObject(item.Name, ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451414)));
        }
    }

    /// <summary>
    /// Jedná se o kontext atributu 'font-charset'.
    /// </summary>
    class StyleFontCharsetContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AttributeExpressionContext
    {
        static StyleFontCharsetContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static StyleFontCharsetContext Instance
        {
            get
            {
                if (instance == null)
                    new StyleFontCharsetContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public StyleFontCharsetContext()
            : base(true)
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text množiny symbolů
    /// </summary>
    sealed class StyleFontCharsetTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
    {
        /// <summary>
        /// inicializace seznamu klíčů
        /// </summary>
        protected override void _Initialize()
        {
            items = new ArrayList
            {
                new TokenObject("default", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451415)),
                new TokenObject("ansi", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451415)),
                new TokenObject("symbol", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451415)),
                new TokenObject("oem", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451415)),
                new TokenObject("easteurope", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451415)),
                new TokenObject("mac", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451415)),
                new TokenObject("baltic", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451415)),
                new TokenObject("chinesebig5", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451415)),
                new TokenObject("gb2312", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451415)),
                new TokenObject("hangul", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451415)),
                new TokenObject("greek", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451415)),
                new TokenObject("russian", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451415)),
                new TokenObject("shiftjis", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451415)),
                new TokenObject("turkish", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451415)),
                new TokenObject("vietnamese", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451415))
            };
        }
    }

    /// <summary>
    /// Jedná se o kontext atributu s argumenty 'true/false'
    /// </summary>
    class StyleTrueFalseContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AttributeExpressionContext
    {
        static StyleTrueFalseContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static StyleTrueFalseContext Instance
        {
            get
            {
                if (instance == null)
                    new StyleTrueFalseContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public StyleTrueFalseContext()
            : base(true)
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text
    /// </summary>
    sealed class StyleTrueFalseTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
    {
        /// <summary>
        /// inicializace seznamu klíčů
        /// </summary>
        protected override void _Initialize()
        {
            items = new ArrayList
            {
                new TokenObject("true", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451346)),
                new TokenObject("false", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451347))
            };
        }
    }

    /// <summary>
    /// Jedná se o kontext atributu barvy
    /// </summary>
    class StyleColorContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AttributeExpressionContext
    {
        static StyleColorContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static StyleColorContext Instance
        {
            get
            {
                if (instance == null)
                    new StyleColorContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public StyleColorContext()
            : base(true)
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text barvy
    /// </summary>
    sealed class StyleColorTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
    {
        /// <summary>
        /// inicializace seznamu klíčů
        /// </summary>
        protected override void _Initialize()
        {
            items = new ArrayList();

            foreach (var item in ColorService.ColorNameCzEn)
                items.Add(new TokenObject(item.Value, ClassBrowserIconService.ParameterIndex, item.Key));
        }
    }

}

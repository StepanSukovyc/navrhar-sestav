//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.XmlContext.cs                          </Name>
//    <Description> Jedná se o kontext větve 'xml'.                             </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-12-02                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Lexer;
using Gordic.GFE.Parsers.Services;
using System.Collections;
using System.Text;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Jedná se o kontext větve 'xml'.
    /// </summary>
    class XmlContext : Gordic.GFE.Parsers.Binding.ExpressionContext.DefaultExpressionContext
    {
        static XmlContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static XmlContext Instance
        {
            get
            {
                if (instance == null)
                    new XmlContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public XmlContext()
            : base("xml")
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text větve 'xml'
    /// </summary>
    sealed class XmlTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
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
                new TokenObject("version", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451432)),
                new TokenObject("encoding", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451433))
            };
        }
    }

    /// <summary>
    /// Jedná se o kontext vnitřních větví větve 'xml'
    /// </summary>
    class AreaXmlContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AreaExpressionContext
    {
        static AreaXmlContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static AreaXmlContext Instance
        {
            get
            {
                if (instance == null)
                    new AreaXmlContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public AreaXmlContext()
            : base("xml area")
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text větve 'xml'
    /// </summary>
    sealed class AreaXmlTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
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
                new TokenObject("format", Gordic.GFE.Parsers.Services.ClassBrowserIconService.NodeIndex, GResources.GetResourceText(29451434))
            };
        }
    }

    /// <summary>
    /// Kontext deklarace dokumentu.
    /// Jedná se o kontext atributu 'encoding'.
    /// </summary>
    class XmlEncodingContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AttributeExpressionContext
    {
        static XmlEncodingContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static XmlEncodingContext Instance
        {
            get
            {
                if (instance == null)
                    new XmlEncodingContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public XmlEncodingContext()
            : base(true)
        {
            instance = this;
        }
    }

    /// <summary>
    /// klíče pro nápovědný text kódování
    /// </summary>
    sealed class XmlEncodingTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
    {
        /// <summary>
        /// inicializace seznamu klíčů
        /// </summary>
        protected override void _Initialize()
        {
            items = new ArrayList();

            foreach (var item in Encoding.GetEncodings())
                items.Add(new TokenObject(item.Name, ClassBrowserIconService.ParameterIndex, item.DisplayName));
        }
    }

}

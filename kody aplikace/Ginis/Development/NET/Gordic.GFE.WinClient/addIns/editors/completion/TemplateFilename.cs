//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.TemplateFilenameContext.cs             </Name>
//    <Description> Jedná se o kontext atributu 'filename'.                     </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-11-27                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Lexer;
using Gordic.GFE.Parsers.Refactoring;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.LinkedFiles;
using System.Collections;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Jedná se o kontext větve 'template'.
    /// </summary>
    class TemplateContext : Gordic.GFE.Parsers.Binding.ExpressionContext.DefaultExpressionContext
    {
        static TemplateContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static TemplateContext Instance
        {
            get
            {
                if (instance == null)
                    new TemplateContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public TemplateContext()
            : base("template")
        {
            instance = this;
        }
    }

    /// <summary>
    /// klíče pro nápovědný text větve 'template'
    /// </summary>
    sealed class TemplateTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
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
                new TokenObject("filename", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451416))
            };
        }
    }

    /// <summary>
    /// Jedná se o kontext atributu 'filename'.
    /// </summary>
    class TemplateFilenameContext: ExpressionContext.AttributeExpressionContext
    {
        /// <summary>
        /// indikuje, že context je cachovatelný
        /// </summary>
        public override bool Cach { get { return false; } }

        static TemplateFilenameContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static TemplateFilenameContext Instance
        {
            get
            {
                if (instance == null)
                    new TemplateFilenameContext(); 
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public TemplateFilenameContext()
            : base(true)
        {
            instance = this;
        }
    }

    /// <summary>
    /// klíče pro nápovědný text názvu vázaných souborů
    /// </summary>
    sealed class ALFTemplateFilenameTokens : ALFAVTokens
    {
        /// <summary>
        /// položky klíče
        /// </summary>
        public override ArrayList Items
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
            items = new ArrayList();
            foreach (var item in LinkedFilesPad.Instance.Files)
                items.Add(new TokenObject(item, ClassBrowserIconService.ParameterIndex, item));

            //foreach (var item in CommonService.DashStyles)
            //    items.Add(new TokenObject(item.Key, ClassBrowserIconService.ParameterIndex, item.Value));
        }
    }

}

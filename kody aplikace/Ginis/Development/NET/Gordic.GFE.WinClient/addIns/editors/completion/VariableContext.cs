//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.VariableContext.cs                     </Name>
//    <Description> Jedná se o kontext větve 'variable'.                        </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-12-01                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Lexer;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Jedná se o kontext větve 'variable'.
    /// </summary>
    class VariableContext : Gordic.GFE.Parsers.Binding.ExpressionContext.DefaultExpressionContext
    {
        static VariableContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static VariableContext Instance
        {
            get
            {
                if (instance == null)
                    new VariableContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public VariableContext()
            : base("variable")
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text větve 'text'
    /// </summary>
    sealed class VariableTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
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
                new TokenObject("name", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451429)),
                new TokenObject("value", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451430)),
                new TokenObject("datatype", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451431))
            };
        }
    }

}

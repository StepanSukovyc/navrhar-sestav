//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.BorderStyleContext.cs                  </Name>
//    <Description> Jedná se o kontext atributu 'border-style'.                 </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-12-01                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Lexer;
using Gordic.GFE.Parsers.Refactoring;
using Gordic.GFE.Parsers.Services;
using System.Collections;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Jedná se o kontext atributu 'border-style'.
    /// </summary>
    class BorderStyleContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AttributeExpressionContext
    {
        static BorderStyleContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static BorderStyleContext Instance
        {
            get
            {
                if (instance == null)
                    new BorderStyleContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public BorderStyleContext()
            : base(true)
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text stylu rámečku
    /// </summary>
    sealed class BorderStyleTokens : ALFAVTokens
    {
        /// <summary>
        /// inicializace seznamu klíčů
        /// </summary>
        protected override void _Initialize()
        {
            items = new ArrayList();

            foreach (var item in CommonService.DashStyles)
                items.Add(new TokenObject(item.Key, ClassBrowserIconService.ParameterIndex, item.Value));
        }
    }

}

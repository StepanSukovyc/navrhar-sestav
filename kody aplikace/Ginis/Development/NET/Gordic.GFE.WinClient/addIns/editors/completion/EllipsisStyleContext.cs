//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.BorderStyleContext - Copy.cs           </Name>
//    <Description> Jedná se o kontext atributu 'ellipsis-style'.               </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-12-01                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Lexer;
using Gordic.GFE.Parsers.Refactoring;
using Gordic.GFE.Parsers.Services;
using System.Collections;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Jedná se o kontext atributu 'ellipsis-style'.
    /// </summary>
    class EllipsisStyleContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AttributeExpressionContext
    {
        static EllipsisStyleContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static EllipsisStyleContext Instance
        {
            get
            {
                if (instance == null)
                    new EllipsisStyleContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public EllipsisStyleContext()
            : base(true)
        {
            instance = this;
        }
    }

    /// <summary>
    /// klíče pro nápovědný text stylu zakončení při přetečení textu
    /// </summary>
    sealed class EllipsisStyleTokens : ALFAVTokens
    {
        /// <summary>
        /// inicializace seznamu klíčů
        /// </summary>
        protected override void _Initialize()
        {
            items = new ArrayList
            {
                new TokenObject("three-dots", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451308)),
                new TokenObject("cut", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451309)),
                new TokenObject("fill", ClassBrowserIconService.ParameterIndex, GResources.GetResourceText(29451310))
            };
        }
    }

}

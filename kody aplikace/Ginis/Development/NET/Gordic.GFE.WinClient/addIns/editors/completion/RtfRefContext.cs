//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.RtfRefContext.cs                       </Name>
//    <Description> Jedná se o kontext větve 'rtfref'.                          </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-12-02                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Lexer;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Jedná se o kontext větve 'rtfref'.
    /// </summary>
    class RtfRefContext : Gordic.GFE.Parsers.Binding.ExpressionContext.DefaultExpressionContext
    {
        static RtfRefContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static RtfRefContext Instance
        {
            get
            {
                if (instance == null)
                    new RtfRefContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public RtfRefContext()
            : base("rtfref")
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text větve 'rtfref'
    /// </summary>
    sealed class RtfRefTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
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
                new TokenObject("start", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451364)),
                new TokenObject("end", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451365))
            };
        }
    }

}

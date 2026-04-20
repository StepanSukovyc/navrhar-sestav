//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DeclarationContext.cs                  </Name>
//    <Description> Jedná se o kontext větve '?'                                </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-12-02                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Lexer;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Jedná se o kontext větve '?'
    /// </summary>
    class DeclarationContext : Gordic.GFE.Parsers.Binding.ExpressionContext.DefaultExpressionContext
    {
        static DeclarationContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static DeclarationContext Instance
        {
            get
            {
                if (instance == null)
                    new DeclarationContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public DeclarationContext()
            : base("?")
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text větve '?'
    /// </summary>
    sealed class DeclarationTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
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
                new TokenObject("xml", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, "xml")
            };
        }
    }

}

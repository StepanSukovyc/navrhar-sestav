//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GroupContext.cs                        </Name>
//    <Description> Jedná se o kontext větve 'group'.                           </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-12-01                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Lexer;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Jedná se o kontext větve 'group'.
    /// </summary>
    class GroupContext : Gordic.GFE.Parsers.Binding.ExpressionContext.DefaultExpressionContext
    {
        static GroupContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static GroupContext Instance
        {
            get
            {
                if (instance == null)
                    new GroupContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public GroupContext()
            : base("group")
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text větve 'group'
    /// </summary>
    sealed class GroupTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
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
                new TokenObject("by", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451321)),
                new TokenObject("name", Gordic.GFE.Parsers.Services.ClassBrowserIconService.AttributeIndex, GResources.GetResourceText(29451322))
            };
        }
    }

    /// <summary>
    /// Jedná se o kontext vnitřních větví větve 'group'
    /// </summary>
    class AreaGroupContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AreaExpressionContext
    {
        static AreaGroupContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static AreaGroupContext Instance
        {
            get
            {
                if (instance == null)
                    new AreaGroupContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public AreaGroupContext()
            : base("group area")
        {
            instance = this;
        }
    }
}

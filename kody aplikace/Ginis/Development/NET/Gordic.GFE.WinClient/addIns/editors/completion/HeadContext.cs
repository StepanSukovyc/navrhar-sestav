//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.HeadContext.cs                         </Name>
//    <Description> Jedná se o kontext větve 'head'.                            </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-12-02                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Jedná se o kontext větve 'head'.
    /// </summary>
    class HeadContext : Gordic.GFE.Parsers.Binding.ExpressionContext.DefaultExpressionContext
    {
        static HeadContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static HeadContext Instance
        {
            get
            {
                if (instance == null)
                    new HeadContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public HeadContext()
            : base("head")
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text větve 'head'
    /// </summary>
    sealed class HeadTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
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
            items = new System.Collections.ArrayList();
        }
    }

    /// <summary>
    /// Jedná se o kontext vnitřních větví větve 'head'
    /// </summary>
    class AreaHeadContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AreaExpressionContext
    {
        static AreaHeadContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static AreaHeadContext Instance
        {
            get
            {
                if (instance == null)
                    new AreaHeadContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public AreaHeadContext()
            : base("head area")
        {
            instance = this;
        }
    }
}

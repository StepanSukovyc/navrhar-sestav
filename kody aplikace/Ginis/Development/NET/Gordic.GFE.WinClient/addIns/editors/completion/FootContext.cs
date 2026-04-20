//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FootContext.cs                         </Name>
//    <Description> Jedná se o kontext větve 'foot'.                            </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-12-02                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Jedná se o kontext větve 'foot'.
    /// </summary>
    class FootContext : Gordic.GFE.Parsers.Binding.ExpressionContext.DefaultExpressionContext
    {
        static FootContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static FootContext Instance
        {
            get
            {
                if (instance == null)
                    new FootContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public FootContext()
            : base("foot")
        {
            instance = this;
        }
    }
    /// <summary>
    /// klíče pro nápovědný text větve 'foot'
    /// </summary>
    sealed class FootTokens : Gordic.GFE.Parsers.Refactoring.ALFAVTokens
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
    /// Jedná se o kontext vnitřních větví větve 'foot'
    /// </summary>
    class AreaFootContext : Gordic.GFE.Parsers.Binding.ExpressionContext.AreaExpressionContext
    {
        static AreaFootContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static AreaFootContext Instance
        {
            get
            {
                if (instance == null)
                    new AreaFootContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public AreaFootContext()
            : base("foot area")
        {
            instance = this;
        }
    }
}

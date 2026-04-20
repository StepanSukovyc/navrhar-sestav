//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.CommentContext.cs                       </Name>
//    <Description> Jedná se o kontext větve 'rtfref'.                          </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-12-02                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Jedná se o kontext větve komentáře
    /// </summary>
    class CommentContext : Gordic.GFE.Parsers.Binding.ExpressionContext.DefaultExpressionContext
    {
        static CommentContext instance;
        /// <summary>
        /// instance daného objektu
        /// </summary>
        public static CommentContext Instance
        {
            get
            {
                if (instance == null)
                    new CommentContext();
                return instance;
            }
        }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        public CommentContext()
            : base("comment")
        {
            instance = this;
        }
    }
}

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IExpressionFinder.cs                     </Name>
//    <Description> nástroj hedání výrazů                                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-27                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Binding
{
    /// <summary>
    /// nástroj hedání výrazů
    /// </summary>
    public interface IExpressionFinder
    {
        /// <summary>
        /// Nalezení výrazu před aktuálním offsetem.
        /// </summary>
        /// <param name="text">hledaný výraz</param>
        /// <param name="offset">aktuální offset</param>
        ExpressionResult FindExpression(string text, int offset);
    }

    /// <summary>
    /// Struktura obsahující výsledek volání nástroje nalezení výrazů
    /// </summary>
    public struct ExpressionResult
    {
        /// <summary>
        /// prázdný výsledek
        /// </summary>
        public static readonly ExpressionResult Empty = new ExpressionResult(null);

        /// <summary>Výraz, který byl nalezen dle zadaného offsetu.</summary>
        public string Expression;
        /// <summary>Přesné místo ve zdrojovém kódu obsahující výraz.</summary>
        public DomRegion Region;
        /// <summary>Určuje kontext, ve kterém byl nalezen výraz.</summary>
        public ExpressionContext Context;
        /// <summary>Další údaje.</summary>
        public object Tag;
        /// <summary>
        /// konstruktor
        /// </summary>
        /// <param name="expression">výraz</param>
        public ExpressionResult(string expression) : this(expression, DomRegion.Empty, ExpressionContext.Default, null) { }
        /// <summary>
        /// konstruktor
        /// </summary>
        /// <param name="expression">výraz</param>
        /// <param name="context">kontext hledání</param>
        public ExpressionResult(string expression, ExpressionContext context) : this(expression, DomRegion.Empty, context, null) { }
        /// <summary>
        /// konstruktor
        /// </summary>
        /// <param name="expression">výraz</param>
        /// <param name="region">přesné místo v kódu</param>
        /// <param name="context">kontext výrazu</param>
        /// <param name="tag">specifický objekt</param>
        public ExpressionResult(string expression, DomRegion region, ExpressionContext context, object tag)
        {
            this.Expression = expression;
            this.Region = region;
            this.Context = context;
            this.Tag = tag;
        }
        /// <exclude/>
        public override string ToString()
        {
            if (Context == ExpressionContext.Default)
                return "<" + Expression + ">";
            else if (Context != null)
                return "<" + Expression + "> (" + Context.ToString() + ")";
            else return "<" + Expression + ">";
        }
    }
}

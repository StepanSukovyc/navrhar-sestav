//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Token.cs                                 </Name>
//    <Description> prvek prezentující klíč k řetězcům                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-08-02                                                  </Created>
//  </FileHeader>

using Gordic.General;

namespace Gordic.GFE.Parsers.Refactoring.Lexer
{
    /// <summary>
    /// formát řetězce
    /// </summary>
    public enum LiteralFormat : byte
    {
        /// <exclude/>
        None,
        /// <exclude/>
        DecimalNumber,
        /// <exclude/>
        HexadecimalNumber,
        /// <exclude/>
        OctalNumber,
        /// <exclude/>
        StringLiteral,
        /// <exclude/>
        VerbatimStringLiteral,
        /// <exclude/>
        CharLiteral,
        /// <exclude/>
        DateTimeLiteral
    }
    /// <summary>
    /// prvek prezentující klíč k řetězcům
    /// </summary>
    public class Token
    {
        internal readonly int kind;

        internal readonly int col;
        internal readonly int line;

        internal readonly LiteralFormat literalFormat;
        internal readonly object literalValue;
        internal readonly string val;
        internal Token next;
        readonly Location endLocation;

        /// <summary>
        /// druh kllíče nápovědného textu
        /// </summary>
        public int Kind { get { return kind; } }

        /// <summary>
        /// formát řetězce
        /// </summary>
        public LiteralFormat LiteralFormat { get { return literalFormat; } }
        /// <summary>
        /// hodnota řetězce
        /// </summary>
        public object LiteralValue { get { return literalValue; } }
        /// <summary>
        /// hodnota klíče
        /// </summary>
        public string Value { get { return val; } }
        /// <summary>
        /// konec pozice
        /// </summary>
        public Location EndLocation { get { return endLocation; } }
        /// <summary>
        /// začátek pozice
        /// </summary>
        public Location Location { get { return new Location(col, line); } }
        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="kind">druh klíče</param>
        public Token(int kind)
            : this(kind, 0, 0)
        {
        }
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="kind"></param>
        /// <param name="col"></param>
        /// <param name="line"></param>
        public Token(int kind, int col, int line)
            : this(kind, col, line, null)
        {
        }
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="kind"></param>
        /// <param name="col"></param>
        /// <param name="line"></param>
        /// <param name="val"></param>
        public Token(int kind, int col, int line, string val)
        {
            this.kind = kind;
            this.col = col;
            this.line = line;
            this.val = val;
            this.endLocation = new Location(col + (string.IsNullOrEmpty(val) ? 1 : val.Length), line);
        }
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="kind"></param>
        /// <param name="x"></param>
        /// <param name="y"></param>
        /// <param name="val"></param>
        /// <param name="literalValue"></param>
        /// <param name="literalFormat"></param>
        internal Token(int kind, int x, int y, string val, object literalValue, LiteralFormat literalFormat)
            : this(kind, new Location(x, y), new Location(x + val.Length, y), val, literalValue, literalFormat)
        {
        }
        /// <summary>
        /// úplný konstruktor třídy
        /// </summary>
        /// <param name="kind"></param>
        /// <param name="startLocation"></param>
        /// <param name="endLocation"></param>
        /// <param name="val"></param>
        /// <param name="literalValue"></param>
        /// <param name="literalFormat"></param>
        public Token(int kind, Location startLocation, Location endLocation, string val, object literalValue, LiteralFormat literalFormat)
        {
            this.kind = kind;
            this.col = startLocation.Column;
            this.line = startLocation.Line;
            this.endLocation = endLocation;
            this.val = val;
            this.literalValue = literalValue;
            this.literalFormat = literalFormat;

        }

        /// <exclude/>
        public override string ToString()
        {
            return string.Format(string.Join(" ", "[Grf {0}", GResources.GetResourceText(29450227), "={1};", GResources.GetResourceText(29450174), "={2};", GResources.GetResourceText(29450228), "={3}]"), //RC 29450228 : hodnota
                                 ALFTokens.ThisInstance.GetTokenString(kind),
                                 Location, EndLocation, val);
        }
    }
}

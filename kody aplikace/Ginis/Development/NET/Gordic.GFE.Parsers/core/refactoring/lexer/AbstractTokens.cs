//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AbstractTokens.cs                        </Name>
//    <Description> klíčová slova                                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-08-30                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Lexer;
using Gordic.GFE.Parsers.Services;
using System.Collections;
using System.Collections.Generic;

namespace Gordic.GFE.Parsers.Refactoring
{
    /// <summary>
    /// položka s informaci o klíčovem slově
    /// </summary>
    public sealed class TokenItem
    {
        readonly string word;
        /// <summary>
        /// slovo klíče
        /// </summary>
        public string Word { get { return word; } }

        readonly string desc;
        /// <summary>
        /// popis klíče
        /// </summary>
        public string Description { get { return desc; } }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="word">klíčové slovo</param>
        /// <param name="desc">popis klíčového slova</param>
        public TokenItem(string word, string desc = null)
        {
            this.word = word;
            this.desc = desc ?? GResources.GetResourceText(29450519); //RC 29450519 : <popis chybí>
        }
    }

    /// <summary>
    /// štítky
    /// </summary>
    public class AbstractTokens
    {
        // ----- speciální třídy -----
        /// <exclude/>
        public const int EOF = 0;
        /// <exclude/>
        public const int Identifier = 1;
        /// <exclude/>
        public const int Literal = 2;
        /// <exclude/>
        public const int SPACE = 255;
        /// <exclude/>
        public const int TAB = 256;

        // ----- speciální symboly -----
        /// <exclude/>
        public const int Assign = 3;
        /// <exclude/>
        public const int Plus = 4;
        /// <exclude/>
        public const int Minus = 5;
        /// <exclude/>
        public const int Times = 6;
        /// <exclude/>
        public const int Div = 7;
        /// <exclude/>
        public const int Mod = 8;
        /// <exclude/>
        public const int Colon = 9;
        /// <exclude/>
        public const int DoubleColon = 10;
        /// <exclude/>
        public const int Semicolon = 11;
        /// <exclude/>
        public const int Question = 12;
        /// <exclude/>
        public const int DoubleQuestion = 13;
        /// <exclude/>
        public const int Comma = 14;
        /// <exclude/>
        public const int Dot = 15;
        /// <exclude/>
        public const int OpenCurlyBrace = 16;
        /// <exclude/>
        public const int CloseCurlyBrace = 17;
        /// <exclude/>
        public const int OpenSquareBracket = 18;
        /// <exclude/>
        public const int CloseSquareBracket = 19;
        /// <exclude/>
        public const int OpenParenthesis = 20;
        /// <exclude/>
        public const int CloseParenthesis = 21;
        /// <exclude/>
        public const int GreaterThan = 22;
        /// <exclude/>
        public const int LessThan = 23;
        /// <exclude/>
        public const int Not = 24;
        /// <exclude/>
        public const int LogicalAnd = 25;
        /// <exclude/>
        public const int LogicalOr = 26;
        /// <exclude/>
        public const int BitwiseComplement = 27;
        /// <exclude/>
        public const int BitwiseAnd = 28;
        /// <exclude/>
        public const int BitwiseOr = 29;
        /// <exclude/>
        public const int Xor = 30;
        /// <exclude/>
        public const int Increment = 31;
        /// <exclude/>
        public const int Decrement = 32;
        /// <exclude/>
        public const int Equal = 33;
        /// <exclude/>
        public const int NotEqual = 34;
        /// <exclude/>
        public const int GreaterEqual = 35;
        /// <exclude/>
        public const int LessEqual = 36;
        /// <exclude/>
        public const int ShiftLeft = 37;
        /// <exclude/>
        public const int PlusAssign = 38;
        /// <exclude/>
        public const int MinusAssign = 39;
        /// <exclude/>
        public const int TimesAssign = 40;
        /// <exclude/>
        public const int DivAssign = 41;
        /// <exclude/>
        public const int ModAssign = 42;
        /// <exclude/>
        public const int BitwiseAndAssign = 43;
        /// <exclude/>
        public const int BitwiseOrAssign = 44;
        /// <exclude/>
        public const int XorAssign = 45;
        /// <exclude/>
        public const int ShiftLeftAssign = 46;
        /// <exclude/>
        public const int Pointer = 47;
        /// <exclude/>
        public const int LambdaArrow = 48;

        /// <exclude/>
        public virtual int MaxToken { get { return 49; } }

        /// <exclude/>
        protected BitArray NewSet(params int[] values)
        {
            BitArray bitArray = new BitArray(MaxToken);
            foreach (int val in values)
                bitArray[val] = true;

            return bitArray;
        }

        protected BitArray keyWords, global, identifierTokens, empty;

        // hodnoty atributů
        protected BitArray xmlEncodingValue;

        /// <summary>
        /// identifikátory
        /// </summary>
        public BitArray IdentifierTokens { get { return identifierTokens; } }

        readonly Dictionary<string, int> tokenIcons = new Dictionary<string, int>()
            {
                //12, 13, 16, 19, 34, 38, 58
                {"xml", 18},
                {"format", 18},

                // skripty
                {"onLoad", 54},
                {"onEnter", 54},
                {"onPrint", 54},
                {"onData", 54},

                {"info", 18},
                {"region", 18},
                {"head", 18},
                {"body", 18},
                {"foot", 18},
                {"variable", 18},
                {"paper-setting", 18},
                {"table", 18},
                {"value-of", 18},
                {"text", 18},
                {"image-of", 18},
                {"style", 18},
                {"button", 18},
                {"item", 18},
                {"group", 18},
                {"script", 18},
                {"template", 18},
                {"copy-and-fill", 18},
                {"rtfref", 18},
                {"chart", 18},
                {"drawing", 18},
                {"grid", 18},
                {"image", 18},
                {"line", 18},
                {"attachment", 18},
                {"barcode", 18},

                // atributy
                {"version", ClassBrowserIconService.AttributeIndex},
                {"encoding", ClassBrowserIconService.AttributeIndex},
                {"start", ClassBrowserIconService.AttributeIndex},
                {"end", ClassBrowserIconService.AttributeIndex},
                {"filename", ClassBrowserIconService.AttributeIndex}
            };
        /// <summary>
        /// ikonky klíčových slov
        /// </summary>
        protected Dictionary<string, int> TokenIcons { get { return tokenIcons; } }

        protected List<TokenItem> tokenList;

        /// <summary>
        /// inicializace objektu
        /// </summary>
        public virtual void Initialize()
        {
            empty = NewSet();
            global = NewSet(LessThan);
            identifierTokens = NewSet(Identifier);
            tokenList = new List<TokenItem> {
                // ----- speciální třídy -----
                new TokenItem("<EOF>", GResources.GetResourceText(29450579)),
                new TokenItem("<Identifier>", GResources.GetResourceText(29450580)),
                new TokenItem("<Literal>", GResources.GetResourceText(29450581)),
                // ----- speciální symboly -----
                new TokenItem("="),
                new TokenItem("+"),
                new TokenItem("-"),
                new TokenItem("*"),
                new TokenItem("/"),
                new TokenItem("%"),
                new TokenItem(":"),
                new TokenItem("::"),
                new TokenItem(";"),
                new TokenItem("?"),
                new TokenItem("??"),
                new TokenItem(","),
                new TokenItem("."),
                new TokenItem("{"),
                new TokenItem("}"),
                new TokenItem("["),
                new TokenItem("]"),
                new TokenItem("("),
                new TokenItem(")"),
                new TokenItem(">"),
                new TokenItem("<"),
                new TokenItem("!"),
                new TokenItem("&&"),
                new TokenItem("||"),
                new TokenItem("~"),
                new TokenItem("&"),
                new TokenItem("|"),
                new TokenItem("^"),
                new TokenItem("++"),
                new TokenItem("--"),
                new TokenItem("=="),
                new TokenItem("!="),
                new TokenItem(">="),
                new TokenItem("<="),
                new TokenItem("<<"),
                new TokenItem("+="),
                new TokenItem("-="),
                new TokenItem("*="),
                new TokenItem("/="),
                new TokenItem("%="),
                new TokenItem("&="),
                new TokenItem("|="),
                new TokenItem("^="),
                new TokenItem("<<="),
                new TokenItem("->"),
                new TokenItem("=>")
            };
        }

        /// <summary>
        /// Získání řetězce dle klíče
        /// </summary>
        /// <param name="token">klíč</param>
        /// <returns></returns>
        public string GetTokenString(int token)
        {
            if (token >= 0 && token < tokenList.Count)
                return tokenList[token].Word;
            throw new System.NotSupportedException(string.Format(GResources.GetResourceText(29450226) + ": {0}!", token)); //RC 29450226 : Neznámý klíč
        }

        /// <summary>
        /// Objektu nápovědy dle klíče
        /// </summary>
        /// <param name="token">klíč nápovědy</param>
        /// <param name="context"></param>
        /// <returns></returns>
        public object GetTokenObject(int token, ExpressionContext context = null)
        {
            if (token >= 0 && token < tokenList.Count)
            {
                if ((context is ExpressionContext.AreaExpressionContext)
                    && TokenIcons.ContainsKey(tokenList[token].Word))
                    return new TokenObject(tokenList[token], TokenIcons[tokenList[token].Word]);

                return new TokenObject(tokenList[token]);

            }
            throw new System.NotSupportedException(string.Format(GResources.GetResourceText(29450226) + ": {0}!", token)); //RC 29450226 : Neznámý klíč
        }

        /// <summary>
        /// získání klíčových slov dle kontextu
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public virtual BitArray GetKeywordsByContext(ExpressionContext context) { return keyWords; }
    }
}

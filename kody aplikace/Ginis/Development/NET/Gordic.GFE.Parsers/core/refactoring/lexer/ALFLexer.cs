//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Lexer.cs                                 </Name>
//    <Description> lexer GRF sestav                                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-08-02                                                  </Created>
//  </FileHeader>

using System;
using System.Globalization;
using System.IO;
using System.Text;
using Gordic.GFE.Parsers.Refactoring.Lexer;
using Gordic.GFE.Parsers.Refactoring.Special;
using Gordic.General;

namespace Gordic.GFE.Parsers.Refactoring
{
    /// <summary>
    /// lexer ALF sestav
    /// </summary>
    internal class ALFLexer : AbstractLexer
    {
        #region AbstractLexer
        /// <exclude/>
        protected override Token Next()
        {
            int nextChar;
            char ch;
            bool hadLineEnd = false;
            if (Line == 1 && Col == 1)
            {
                isAtLineBegin = true;
                hadLineEnd = true; // začátek dokumentu
            }

            Token token = null;

            while ((nextChar = ReaderRead()) != -1)
            {
                switch (nextChar)
                {
                    case ' ':
                    case '\t':
                        continue;
                    case '\r':
                    case '\n':
                        if (hadLineEnd)
                            // konec druhého řádku před získáním klíče
                            // -> zde je prázdný řádek
                            specialTracker.AddEndOfLine(new Location(Col, Line));
                        HandleLineEnd((char)nextChar);
                        hadLineEnd = true;
                        isAtLineBegin = true;
                        continue;
                    case '/':
                        int peek = ReaderPeek();
                        if (peek == '/' || peek == '*')
                        {
                            ReadComment();
                            continue;
                        }
                        else
                        {
                            isAtLineBegin = false;
                            token = ReadOperator('/');
                        }
                        break;
                    case '#':
                        ReadPreProcessingDirective();
                        isAtLineBegin = false;
                        continue;
                    case '"':
                        token = ReadString();
                        isAtLineBegin = false;
                        break;
                    case '\'':
                        token = ReadChar();
                        isAtLineBegin = false;
                        break;
                    case '<':

                        //token = ReadToken();
                        token = new Lexer.Token(ALFTokens.LessThan, Col - 1, Line);
                        isAtLineBegin = true;
                        break;
                    case '@':
                        isAtLineBegin = false;
                        int next = ReaderRead();
                        if (next == -1)
                        {
                            errors.Error(Line, Col, String.Join(" ", "EOF", GResources.GetResourceText(29450200), "@!")); //RC 29450200 : po
                            continue;
                        }
                        else
                        {
                            int x = Col - 1;
                            int y = Line;
                            ch = (char)next;
                            if (ch == '"')
                                token = ReadVerbatimString();
                            else if (Char.IsLetterOrDigit(ch) || ch == '_')
                                token = new Token(ALFTokens.Identifier, x - 1, y, ReadIdent(ch, out bool canBeKeyword));
                            else
                            {
                                HandleLineEnd(ch);
                                errors.Error(y, x, String.Format(String.Join(" ", GResources.GetResourceText(29450199), "Lexer.Next(): {0}!"), ch)); //RC 29450199 : Nespecifikovaný symbol v
                                continue;
                            }
                        }
                        break;
                    default:
                        isAtLineBegin = false; // nespecifikované znaky
                        ch = (char)nextChar;
                        if (Char.IsLetter(ch) || ch == '_' || ch == '\\')
                        {
                            int x = Col - 1; // Col byl zvýšen, ale chceme začátek identifikátoru
                            int y = Line;
                            string s = ReadIdent(ch, out bool canBeKeyword);
                            if (canBeKeyword)
                            {
                                //int keyWordToken = Keywords.GetToken(s);
                                int keyWordToken = ALFTokens.GetToken(s);
                                if (keyWordToken >= 0)
                                    return new Token(keyWordToken, x, y, s);
                            }
                            return new Token(ALFTokens.Identifier, x, y, s);
                        }
                        else if (Char.IsDigit(ch))
                            token = ReadDigit(ch, Col - 1);
                        else
                            token = ReadOperator(ch);
                        break;
                }

                // pokus o odstranění chyby (token = null -> pokračování následujícím symbolem)
                if (token != null)
                    return token;
            }

            if (token != null && (token.Kind == ALFTokens.SPACE || token.Kind == ALFTokens.TAB))
                return token;

            return new Token(ALFTokens.EOF, Col, Line, String.Empty);
        }

        /// <summary>
        /// čtení klíčového slova
        /// </summary>
        /// <returns>TAG za znakem 'menší'</returns>
        Token ReadToken()
        {
            // jedná se o případ, kdy na začátku formátu je deklarace sestavy <?xml....
            if (ReaderPeek() == '?')
                ReaderRead();

            return NextToken();
        }

        /// <exclude/>
        public override void SkipCurrentBlock(int targetToken)
        {
            int braceCount = 0;
            while (curToken != null)
            {
                if (curToken.kind == ALFTokens.OpenCurlyBrace)
                    ++braceCount;
                else if (curToken.kind == ALFTokens.CloseCurlyBrace)
                    if (--braceCount < 0)
                        return;
                lastToken = curToken;
                curToken = curToken.next;
            }
            isAtLineBegin = true;
            int nextChar;
            while ((nextChar = ReaderRead()) != -1)
            {
                switch (nextChar)
                {
                    case '{':
                        isAtLineBegin = false;
                        braceCount++;
                        break;
                    case '}':
                        isAtLineBegin = false;
                        if (--braceCount < 0)
                        {
                            curToken = new Token(ALFTokens.CloseCurlyBrace, Col - 1, Line);
                            return;
                        }
                        break;
                    case '/':
                        int peek = ReaderPeek();
                        if (peek == '/' || peek == '*')
                            ReadComment();
                        isAtLineBegin = false;
                        break;
                    case '#':
                        ReadPreProcessingDirective();
                        isAtLineBegin = false;
                        break;
                    case '"':
                        ReadString();
                        isAtLineBegin = false;
                        break;
                    case '\'':
                        ReadChar();
                        isAtLineBegin = false;
                        break;
                    case '\r':
                    case '\n':
                        HandleLineEnd((char)nextChar);
                        isAtLineBegin = true;
                        break;
                    case '@':
                        int next = ReaderRead();
                        if (next == -1)
                            errors.Error(Line, Col, String.Join(" ", "EOF", GResources.GetResourceText(29450200), "@!")); //RC 29450200 : po
                        else if (next == '"')
                            ReadVerbatimString();
                        isAtLineBegin = false;
                        break;
                }
            }
            curToken = new Token(ALFTokens.EOF, Col, Line);
        }
        #endregion

        protected bool isAtLineBegin = true;
        protected const int MAX_IDENTIFIER_LENGTH = 512;
        protected char[] identBuffer = new char[MAX_IDENTIFIER_LENGTH];
        protected readonly char[] escapeSequenceBuffer = new char[12];

        protected virtual void ReadComment()
        {
            switch (ReaderRead())
            {
                case '*':
                    ReadMultiLineComment();
                    isAtLineBegin = false;
                    break;
                case '/':
                    //if (ReaderPeek() == '/')
                    //{
                    //    ReaderRead();
                    //    ReadSingleLineComment(CommentType.Documentation);
                    //}
                    //else
                    ReaderPeek();
                    ReadSingleLineComment(CommentType.SingleLine);
                    isAtLineBegin = true;
                    break;
                default:
                    errors.Error(Line, Col, GResources.GetResourceText(29450201)); //RC 29450201 : Chyba při čtení komentáře!
                    break;
            }
        }
        protected virtual void ReadSingleLineComment(CommentType commentType)
        {
            if (this.SkipAllComments)
                SkipToEndOfLine();
            else
            {
                specialTracker.StartComment(commentType, isAtLineBegin, new Location(Col, Line));
                specialTracker.AddString(ReadCommentToEOL());
                specialTracker.FinishComment(new Location(Col, Line));
            }
        }
        protected virtual void ReadMultiLineComment()
        {
            int nextChar;
            if (this.SkipAllComments)
                while ((nextChar = ReaderRead()) != -1)
                {
                    char ch = (char)nextChar;
                    if (ch == '*' && ReaderPeek() == '/')
                    {
                        ReaderRead();
                        return;
                    }
                    else
                        HandleLineEnd(ch);
                }
            else
            {
                specialTracker.StartComment(CommentType.Block, isAtLineBegin, new Location(Col, Line));

                string scTag = null; // je nastaven na nenulovou hodnotu, když jsme uvnitř značky komentáře
                StringBuilder scCurWord = new StringBuilder(); // aktuální slovo, (scTag == null) nebo komentář (když scTag != null)
                Location scStartLocation = Location.Empty;

                while ((nextChar = ReaderRead()) != -1)
                {
                    char ch = (char)nextChar;

                    if (HandleLineEnd(ch))
                    {
                        if (scTag != null)
                        {
                            this.TagComments.Add(new TagComment(scTag, scCurWord.ToString(), isAtLineBegin, scStartLocation, new Location(Col, Line)));
                            scTag = null;
                        }
                        scCurWord.Length = 0;
                        specialTracker.AddString(Environment.NewLine);
                        continue;
                    }

                    // dosažení konce víceřádkového komentáře?
                    if (ch == '*' && ReaderPeek() == '/')
                    {
                        if (scTag != null)
                            this.TagComments.Add(new TagComment(scTag, scCurWord.ToString(), isAtLineBegin, scStartLocation, new Location(Col, Line)));
                        ReaderRead();
                        specialTracker.FinishComment(new Location(Col, Line));
                        return;
                    }
                    specialTracker.AddChar(ch);
                    if (scTag != null || IsIdentifierPart(ch))
                        scCurWord.Append(ch);
                    else
                    {
                        if (specialCommentHash != null && specialCommentHash.ContainsKey(scCurWord.ToString()))
                        {
                            scTag = scCurWord.ToString();
                            scStartLocation = new Location(Col, Line);
                        }
                        scCurWord.Length = 0;
                    }
                }
                specialTracker.FinishComment(new Location(Col, Line));
            }
            // dosaženo EOF před koncem víceřádkového komentáře.
            errors.Error(Line, Col, GResources.GetResourceText(29450225)); //RC 29450225 : Dosaženo EOF před koncem víceřádkového komentáře!
        }
        protected virtual void ReadPreProcessingDirective()
        {
            //PreprocessingDirective d = ReadPreProcessingDirectiveInternal(true, true);
            //this.specialTracker.AddPreprocessingDirective(d);

            //if (EvaluateConditionalCompilation)
            //{
            //    switch (d.Cmd)
            //    {
            //        case "#define":
            //            conditionalCompilation.Define(d.Arg);
            //            break;
            //        case "#undef":
            //            conditionalCompilation.Undefine(d.Arg);
            //            break;
            //        case "#if":
            //            if (!conditionalCompilation.Evaluate(d.Expression))
            //            {
            //                // skip to valid #elif or #else or #endif
            //                int level = 1;
            //                while (true)
            //                {
            //                    d = SkipToPreProcessingDirective(false, level == 1);
            //                    if (d == null)
            //                        break;
            //                    if (d.Cmd == "#if")
            //                        level++;
            //                    else if (d.Cmd == "#endif")
            //                    {
            //                        level--;
            //                        if (level == 0)
            //                            break;
            //                    }
            //                    else if (level == 1 && (d.Cmd == "#else"
            //                                             || d.Cmd == "#elif" && conditionalCompilation.Evaluate(d.Expression)))
            //                        break;
            //                }
            //                if (d != null)
            //                    this.specialTracker.AddPreprocessingDirective(d);
            //            }
            //            break;
            //        case "#elif":
            //        case "#else":
            //            // už jsme navštívili část #if nebo předchozí část #elif, takže vše vynecháme do #endif
            //            {
            //                int level = 1;
            //                while (true)
            //                {
            //                    d = SkipToPreProcessingDirective(false, false);
            //                    if (d == null)
            //                        break;
            //                    if (d.Cmd == "#if")
            //                        level++;
            //                    else if (d.Cmd == "#endif")
            //                    {
            //                        level--;
            //                        if (level == 0)
            //                            break;
            //                    }
            //                }
            //                if (d != null)
            //                    this.specialTracker.AddPreprocessingDirective(d);
            //            }
            //            break;
            //    }
            //}
        }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="reader">čtečka</param>
        public ALFLexer(TextReader reader)
            : base(reader)
        {
        }

        string ReadCommentToEOL()
        {
            if (specialCommentHash == null)
                return ReadToEndOfLine();
            sb.Length = 0;
            StringBuilder curWord = new StringBuilder();

            int nextChar;
            while ((nextChar = ReaderRead()) != -1)
            {
                char ch = (char)nextChar;

                if (HandleLineEnd(ch))
                    break;

                sb.Append(ch);
                if (IsIdentifierPart(nextChar))
                    curWord.Append(ch);
                else
                {
                    string tag = curWord.ToString();
                    curWord.Length = 0;
                    if (specialCommentHash.ContainsKey(tag))
                    {
                        Location p = new Location(Col, Line);
                        string comment = ch + ReadToEndOfLine();
                        this.TagComments.Add(new TagComment(tag, comment, isAtLineBegin, p, new Location(Col, Line)));
                        sb.Append(comment);
                        break;
                    }
                }
            }
            return sb.ToString();
        }
        string ReadIdent(char ch, out bool canBeKeyword)
        {
            int peek;
            int curPos = 0;
            canBeKeyword = true;
            while (true)
            {
                if (ch == '\\')
                {
                    peek = ReaderPeek();
                    if (peek != 'u' && peek != 'U')
                        errors.Error(Line, Col, GResources.GetResourceText(29450219)); //RC 29450219 : Identifikátory mohou obsahovat pouze unicode escape sekvence!
                    canBeKeyword = false;
                    ReadEscapeSequence(out ch, out string surrogatePair);
                    if (surrogatePair != null)
                    {
                        if (!char.IsLetterOrDigit(surrogatePair, 0))
                            errors.Error(Line, Col, GResources.GetResourceText(29450220));
                        for (int i = 0; i < surrogatePair.Length - 1; i++)
                            if (curPos < MAX_IDENTIFIER_LENGTH)
                                identBuffer[curPos++] = surrogatePair[i];
                        ch = surrogatePair[surrogatePair.Length - 1];
                    }
                    else
                        if (!IsIdentifierPart(ch))
                            errors.Error(Line, Col, GResources.GetResourceText(29450220)); //RC 29450220 : Unicode escape sekvence v identifikátorech nelze použít k reprezentaci znaků, které nejsou platné v identifikátorech!
                }

                if (curPos < MAX_IDENTIFIER_LENGTH)
                    identBuffer[curPos++] = ch;
                else
                {
                    errors.Error(Line, Col, GResources.GetResourceText(29450221)); //RC 29450221 : Identifikátor je moc dlouhý!
                    while (IsIdentifierPart(ReaderPeek()))
                        ReaderRead();

                    break;
                }
                peek = ReaderPeek();
                if (IsIdentifierPart(peek) || peek == '\\' || (peek == '-' && Char.IsLetter(ch)))
                    ch = (char)ReaderRead();
                else
                    break;
            }
            return new String(identBuffer, 0, curPos);
        }
        /// <summary>
        /// Načtení escape sekvence
        /// </summary>
        /// <param name="ch">Symbol, prezentující escape sekvence,
        /// nebo '\0' pokud nastala chyba nebo escape sekvencí prezentuje symbol který se může používát pouze v páru
        /// </param>
        /// <param name="surrogatePair">NULL, výjímaje párových symbolů.</param>
        /// <returns>Escape sekvencí</returns>
        string ReadEscapeSequence(out char ch, out string surrogatePair)
        {
            surrogatePair = null;

            int nextChar = ReaderRead();
            if (nextChar == -1)
            {
                errors.Error(Line, Col, GResources.GetResourceText(29450222)); //RC 29450222 : Konec řádku se nachází uvnitř escape sekvnce!
                ch = '\0';
                return String.Empty;
            }
            int number;
            char c = (char)nextChar;
            int curPos = 1;
            escapeSequenceBuffer[0] = c;
            switch (c)
            {
                case '\'':
                    ch = '\'';
                    break;
                case '\"':
                    ch = '\"';
                    break;
                case '\\':
                    ch = '\\';
                    break;
                case '0':
                    ch = '\0';
                    break;
                case 'a':
                    ch = '\a';
                    break;
                case 'b':
                    ch = '\b';
                    break;
                case 'f':
                    ch = '\f';
                    break;
                case 'n':
                    ch = '\n';
                    break;
                case 'r':
                    ch = '\r';
                    break;
                case 't':
                    ch = '\t';
                    break;
                case 'v':
                    ch = '\v';
                    break;
                case 'u':
                case 'x':
                    // 16 bit unicode symbol
                    c = (char)ReaderRead();
                    number = GetHexNumber(c);
                    escapeSequenceBuffer[curPos++] = c;

                    if (number < 0)
                        errors.Error(Line, Col - 1, String.Format(string.Join(" ", GResources.GetResourceText(29450223), ":{0}!"), c)); //RC 29450223 : Neplatný znak
                    for (int i = 0; i < 3; ++i)
                        if (IsHex((char)ReaderPeek()))
                        {
                            c = (char)ReaderRead();
                            int idx = GetHexNumber(c);
                            escapeSequenceBuffer[curPos++] = c;
                            number = 16 * number + idx;
                        }
                        else
                            break;
                    ch = (char)number;
                    break;
                case 'U':
                    // 32 bit unicode symbol
                    number = 0;
                    for (int i = 0; i < 8; ++i)
                        if (IsHex((char)ReaderPeek()))
                        {
                            c = (char)ReaderRead();
                            int idx = GetHexNumber(c);
                            escapeSequenceBuffer[curPos++] = c;
                            number = 16 * number + idx;
                        }
                        else
                        {
                            errors.Error(Line, Col - 1, String.Format(string.Join(" ", GResources.GetResourceText(29450223), ":{0}!"), (char)ReaderPeek())); //RC 29450223 : Neplatný znak
                            break;
                        }
                    if (number > 0xffff)
                    {
                        ch = '\0';
                        surrogatePair = char.ConvertFromUtf32(number);
                    }
                    else
                        ch = (char)number;
                    break;
                default:
                    errors.Error(Line, Col, String.Format(string.Join(" ", GResources.GetResourceText(29450224), ":{0}!"), c)); //RC 29450224 : Nespecifikovaná escape sekvence
                    ch = '\0';
                    break;
            }
            return new String(escapeSequenceBuffer, 0, curPos);
        }

        Token ReadVerbatimString()
        {
            sb.Length = 0;
            originalValue.Length = 0;
            originalValue.Append("@\"");
            Location startLocation = new Location(Col - 2, Line); // symboly @ a " jsou již načteny
            int nextChar;
            while ((nextChar = ReaderRead()) != -1)
            {
                char ch = (char)nextChar;

                if (ch == '"')
                {
                    if (ReaderPeek() != '"')
                    {
                        originalValue.Append('"');
                        break;
                    }
                    originalValue.Append("\"\"");
                    sb.Append('"');
                    ReaderRead();
                }
                else if (HandleLineEnd(ch))
                {
                    sb.Append("\r\n");
                    originalValue.Append("\r\n");
                }
                else
                {
                    sb.Append(ch);
                    originalValue.Append(ch);
                }
            }

            if (nextChar == -1)
                errors.Error(startLocation.Line, startLocation.Column, GResources.GetResourceText(29450208)); //RC 29450208 : Konec řádku se nachází uvnitř hodnoty řetězce!

            return new Token(ALFTokens.Literal, startLocation, new Location(Col, Line), originalValue.ToString(), sb.ToString(), LiteralFormat.VerbatimStringLiteral);
        }
        Token ReadString()
        {
            int x = Col - 1;
            int y = Line;

            sb.Length = 0;
            originalValue.Length = 0;
            originalValue.Append('"');
            bool doneNormally = false;
            int nextChar;
            while ((nextChar = ReaderRead()) != -1)
            {
                char ch = (char)nextChar;

                if (ch == '"')
                {
                    doneNormally = true;
                    originalValue.Append('"');
                    break;
                }

                if (ch == '\\')
                {
                    originalValue.Append('\\');
                    originalValue.Append(ReadEscapeSequence(out ch, out string surrogatePair));
                    if (surrogatePair != null)
                        sb.Append(surrogatePair);
                    else
                        sb.Append(ch);
                }
                else if (HandleLineEnd(ch))
                {
                    // voláme HandleLineEnd abychom se přesvědčili o správnosti čísel řádku po chybě
                    errors.Error(y, x, GResources.GetResourceText(29450203)); //RC 29450203 : Žádné nové řádky nejsou povolené!
                    break;
                }
                else
                {
                    originalValue.Append(ch);
                    sb.Append(ch);
                }
            }

            if (!doneNormally)
                errors.Error(y, x, GResources.GetResourceText(29450204)); //RC 29450204 : Konec řádku se nachází v řetězci!

            return new Token(ALFTokens.Literal, x, y, originalValue.ToString(), sb.ToString(), LiteralFormat.StringLiteral);
        }
        Token ReadOperator(char ch)
        {
            int x = Col - 1;
            int y = Line;
            switch (ch)
            {
                case '+':
                    switch (ReaderPeek())
                    {
                        case '+':
                            ReaderRead();
                            return new Token(ALFTokens.Increment, x, y);
                        case '=':
                            ReaderRead();
                            return new Token(ALFTokens.PlusAssign, x, y);
                    }
                    return new Token(ALFTokens.Plus, x, y);
                case '-':
                    switch (ReaderPeek())
                    {
                        case '-':
                            ReaderRead();
                            return new Token(ALFTokens.Decrement, x, y);
                        case '=':
                            ReaderRead();
                            return new Token(ALFTokens.MinusAssign, x, y);
                        case '>':
                            ReaderRead();
                            return new Token(ALFTokens.Pointer, x, y);
                    }
                    return new Token(ALFTokens.Minus, x, y);
                case '*':
                    switch (ReaderPeek())
                    {
                        case '=':
                            ReaderRead();
                            return new Token(ALFTokens.TimesAssign, x, y);
                        default:
                            break;
                    }
                    return new Token(ALFTokens.Times, x, y);
                case '/':
                    switch (ReaderPeek())
                    {
                        case '=':
                            ReaderRead();
                            return new Token(ALFTokens.DivAssign, x, y);
                    }
                    return new Token(ALFTokens.Div, x, y);
                case '%':
                    switch (ReaderPeek())
                    {
                        case '=':
                            ReaderRead();
                            return new Token(ALFTokens.ModAssign, x, y);
                    }
                    return new Token(ALFTokens.Mod, x, y);
                case '&':
                    switch (ReaderPeek())
                    {
                        case '&':
                            ReaderRead();
                            return new Token(ALFTokens.LogicalAnd, x, y);
                        case '=':
                            ReaderRead();
                            return new Token(ALFTokens.BitwiseAndAssign, x, y);
                    }
                    return new Token(ALFTokens.BitwiseAnd, x, y);
                case '|':
                    switch (ReaderPeek())
                    {
                        case '|':
                            ReaderRead();
                            return new Token(ALFTokens.LogicalOr, x, y);
                        case '=':
                            ReaderRead();
                            return new Token(ALFTokens.BitwiseOrAssign, x, y);
                    }
                    return new Token(ALFTokens.BitwiseOr, x, y);
                case '^':
                    switch (ReaderPeek())
                    {
                        case '=':
                            ReaderRead();
                            return new Token(ALFTokens.XorAssign, x, y);
                        default:
                            break;
                    }
                    return new Token(ALFTokens.Xor, x, y);
                case '!':
                    switch (ReaderPeek())
                    {
                        case '=':
                            ReaderRead();
                            return new Token(ALFTokens.NotEqual, x, y);
                    }
                    return new Token(ALFTokens.Not, x, y);
                case '~':
                    return new Token(ALFTokens.BitwiseComplement, x, y);
                case '=':
                    switch (ReaderPeek())
                    {
                        case '=':
                            ReaderRead();
                            return new Token(ALFTokens.Equal, x, y);
                        case '>':
                            ReaderRead();
                            return new Token(ALFTokens.LambdaArrow, x, y);
                    }
                    return new Token(ALFTokens.Assign, x, y);
                case '<':
                    switch (ReaderPeek())
                    {
                        case '<':
                            ReaderRead();
                            switch (ReaderPeek())
                            {
                                case '=':
                                    ReaderRead();
                                    return new Token(ALFTokens.ShiftLeftAssign, x, y);
                                default:
                                    break;
                            }
                            return new Token(ALFTokens.ShiftLeft, x, y);
                        case '=':
                            ReaderRead();
                            return new Token(ALFTokens.LessEqual, x, y);
                    }
                    return new Token(ALFTokens.LessThan, x, y);
                case '>':
                    switch (ReaderPeek())
                    {
                        // Odstraněn, protože:
                        //						case '>':
                        //							ReaderRead();
                        //							if (ReaderPeek() != -1) {
                        //								switch ((char)ReaderPeek()) {
                        //									case '=':
                        //										ReaderRead();
                        //										return new Token(ALFTokens.ShiftRightAssign, x, y);
                        //									default:
                        //										break;
                        //								}
                        //							}
                        //							return new Token(ALFTokens.ShiftRight, x, y);
                        case '=':
                            ReaderRead();
                            return new Token(ALFTokens.GreaterEqual, x, y);
                    }
                    return new Token(ALFTokens.GreaterThan, x, y);
                case '?':
                    if (ReaderPeek() == '?')
                    {
                        ReaderRead();
                        return new Token(ALFTokens.DoubleQuestion, x, y);
                    }
                    return new Token(ALFTokens.Question, x, y);
                case ';':
                    return new Token(ALFTokens.Semicolon, x, y);
                case ':':
                    if (ReaderPeek() == ':')
                    {
                        ReaderRead();
                        return new Token(ALFTokens.DoubleColon, x, y);
                    }
                    return new Token(ALFTokens.Colon, x, y);
                case ',':
                    return new Token(ALFTokens.Comma, x, y);
                case '.':
                    // preventivě OverflowException když ReaderPeek vráti -1
                    int tmp = ReaderPeek();
                    if (tmp > 0 && Char.IsDigit((char)tmp))
                        return ReadDigit('.', Col - 1);
                    return new Token(ALFTokens.Dot, x, y);
                case ')':
                    return new Token(ALFTokens.CloseParenthesis, x, y);
                case '(':
                    return new Token(ALFTokens.OpenParenthesis, x, y);
                case ']':
                    return new Token(ALFTokens.CloseSquareBracket, x, y);
                case '[':
                    return new Token(ALFTokens.OpenSquareBracket, x, y);
                case '}':
                    return new Token(ALFTokens.CloseCurlyBrace, x, y);
                case '{':
                    return new Token(ALFTokens.OpenCurlyBrace, x, y);
                default:
                    return null;
            }
        }
        Token ReadChar()
        {
            int x = Col - 1;
            int y = Line;
            int nextChar = ReaderRead();
            if (nextChar == -1 || HandleLineEnd((char)nextChar))
            {
                errors.Error(y, x, GResources.GetResourceText(29450205)); //RC 29450205 : Konec řádku se nachází uvnitř řetězce symbolů!
                return null;
            }
            char ch = (char)nextChar;
            char chValue = ch;
            string escapeSequence = String.Empty;
            if (ch == '\\')
            {
                escapeSequence = ReadEscapeSequence(out chValue, out string surrogatePair);
                if (surrogatePair != null)
                    errors.Error(y, x, GResources.GetResourceText(29450206)); //RC 29450206 : Chyba unicode symbolu!
            }

            unchecked
            {
                if ((char)ReaderRead() != '\'')
                    errors.Error(y, x, GResources.GetResourceText(29450207)); //RC 29450207 : Symbol není ukončen!
            }
            return new Token(ALFTokens.Literal, x, y, "'" + ch + escapeSequence + "'", chValue, LiteralFormat.CharLiteral);
        }
        Token ReadDigit(char ch, int x)
        {
            unchecked
            { // zabráníme výjimce při ReaderPeek () = -1 přetypováním na char
                int y = Line;
                sb.Length = 0;
                sb.Append(ch);
                string prefix = null;
                string suffix = null;

                bool ishex = false;
                bool isunsigned = false;
                bool islong = false;
                bool isfloat = false;
                bool isdouble = false;
                bool isdecimal = false;

                char peek = (char)ReaderPeek();

                if (ch == '.')
                {
                    isdouble = true;

                    while (Char.IsDigit((char)ReaderPeek()))
                        // čtení decimálních číslic za tečkou
                        sb.Append((char)ReaderRead());
                    peek = (char)ReaderPeek();
                }
                else if (ch == '0' && (peek == 'x' || peek == 'X'))
                {
                    ReaderRead(); // přejdeme 'x'
                    sb.Length = 0; // odstraníme '0' z prefixu 0x 
                    while (IsHex((char)ReaderPeek()))
                        sb.Append((char)ReaderRead());
                    if (sb.Length == 0)
                    {
                        sb.Append('0');
                        errors.Error(y, x, GResources.GetResourceText(29450209)); //RC 29450209 : Neplatná hexadecimální hodnota!
                    }
                    ishex = true;
                    prefix = "0x";
                    peek = (char)ReaderPeek();
                }
                else
                {
                    while (Char.IsDigit((char)ReaderPeek()))
                        sb.Append((char)ReaderRead());
                    peek = (char)ReaderPeek();
                }

                Token nextToken = null; // pokud načteme tečku
                if (peek == '.')
                {
                    ReaderRead();
                    peek = (char)ReaderPeek();
                    if (!Char.IsDigit(peek))
                    {
                        nextToken = new Token(ALFTokens.Dot, Col - 1, Line);
                        peek = '.';
                    }
                    else
                    {
                        isdouble = true; // double - výchozí
                        if (ishex)
                            errors.Error(y, x, GResources.GetResourceText(29450210)); //RC 29450210 : Žádné hexadecimální hodnoty s plovoucí desetinnou čárkou nejsoou povolena!
                        sb.Append('.');

                        while (Char.IsDigit((char)ReaderPeek()))
                            // čtení decimálních číslic za tečkou
                            sb.Append((char)ReaderRead());
                        peek = (char)ReaderPeek();
                    }
                }

                if (peek == 'e' || peek == 'E')
                {
                    isdouble = true;
                    sb.Append((char)ReaderRead());
                    peek = (char)ReaderPeek();
                    if (peek == '-' || peek == '+')
                        sb.Append((char)ReaderRead());

                    while (Char.IsDigit((char)ReaderPeek()))
                        sb.Append((char)ReaderRead());

                    isunsigned = true;
                    peek = (char)ReaderPeek();
                }

                if (peek == 'f' || peek == 'F')
                {
                    ReaderRead();
                    suffix = "f";
                    isfloat = true;
                }
                else if (peek == 'd' || peek == 'D')
                {
                    ReaderRead();
                    suffix = "d";
                    isdouble = true;
                }
                else if (peek == 'm' || peek == 'M')
                { // decimal hodnota
                    ReaderRead();
                    suffix = "m";
                    isdecimal = true;
                }
                else if (!isdouble)
                {
                    if (peek == 'u' || peek == 'U')
                    {
                        ReaderRead();
                        suffix = "u";
                        isunsigned = true;
                        peek = (char)ReaderPeek();
                    }

                    if (peek == 'l' || peek == 'L')
                    {
                        ReaderRead();
                        peek = (char)ReaderPeek();
                        islong = true;
                        if (!isunsigned && (peek == 'u' || peek == 'U'))
                        {
                            ReaderRead();
                            suffix = "Lu";
                            isunsigned = true;
                        }
                        else
                            suffix = isunsigned ? "uL" : "L";
                    }
                }

                string digit = sb.ToString();
                string stringValue = prefix + digit + suffix;

                if (isfloat)
                {
                    if (float.TryParse(digit, NumberStyles.Any, CultureInfo.InvariantCulture, out float num))
                        return new Token(ALFTokens.Literal, x, y, stringValue, num, LiteralFormat.DecimalNumber);
                    else
                    {
                        errors.Error(y, x, String.Format(string.Join(" ", GResources.GetResourceText(29450211), "{0}!"), digit)); //RC 29450211 : Nelze analyzovat float
                        return new Token(ALFTokens.Literal, x, y, stringValue, 0f, LiteralFormat.DecimalNumber);
                    }
                }
                if (isdecimal)
                {
                    if (decimal.TryParse(digit, NumberStyles.Any, CultureInfo.InvariantCulture, out decimal num))
                        return new Token(ALFTokens.Literal, x, y, stringValue, num, LiteralFormat.DecimalNumber);
                    else
                    {
                        errors.Error(y, x, String.Format(string.Join(" ", GResources.GetResourceText(29450212), "{0}!"), digit)); //RC 29450212 : Nelze analyzovat decimal
                        return new Token(ALFTokens.Literal, x, y, stringValue, 0m, LiteralFormat.DecimalNumber);
                    }
                }
                if (isdouble)
                {
                    if (double.TryParse(digit, NumberStyles.Any, CultureInfo.InvariantCulture, out double num))
                        return new Token(ALFTokens.Literal, x, y, stringValue, num, LiteralFormat.DecimalNumber);
                    else
                    {
                        errors.Error(y, x, String.Format(string.Join(" ", GResources.GetResourceText(29450213), "{0}!"), digit)); //RC 29450213 : Nelze analyzovat double
                        return new Token(ALFTokens.Literal, x, y, stringValue, 0d, LiteralFormat.DecimalNumber);
                    }
                }

                ulong result;
                if (ishex)
                {
                    if (!ulong.TryParse(digit, NumberStyles.HexNumber, null, out result))
                    {
                        errors.Error(y, x, String.Format(string.Join(" ", GResources.GetResourceText(29450214), "{0}!"), digit)); //RC 29450214 : Nelze analyzovat hexadecimální konstantu
                        return new Token(ALFTokens.Literal, x, y, stringValue.ToString(), 0, LiteralFormat.HexadecimalNumber);
                    }
                }
                else
                    if (!ulong.TryParse(digit, NumberStyles.Integer, null, out result))
                    {
                        errors.Error(y, x, String.Format(string.Join(" ", GResources.GetResourceText(29450215), "{0}!"), digit)); //RC 29450215 : Nelze analyzovat integrační konstantu
                        return new Token(ALFTokens.Literal, x, y, stringValue.ToString(), 0, LiteralFormat.DecimalNumber);
                    }

                if (result > long.MaxValue)
                {
                    islong = true;
                    isunsigned = true;
                }
                else if (result > uint.MaxValue)
                    islong = true;
                else if (islong == false && result > int.MaxValue)
                    isunsigned = true;

                Token token;

                LiteralFormat literalFormat = ishex ? LiteralFormat.HexadecimalNumber : LiteralFormat.DecimalNumber;
                if (islong)
                {
                    if (isunsigned)
                    {
                        if (ulong.TryParse(digit, ishex ? NumberStyles.HexNumber : NumberStyles.Number, CultureInfo.InvariantCulture, out ulong num))
                            token = new Token(ALFTokens.Literal, x, y, stringValue, num, literalFormat);
                        else
                        {
                            errors.Error(y, x, String.Format(string.Join(" ", GResources.GetResourceText(29450216), "{0}!"), digit)); //RC 29450216 : Nelze analyzovat hodnotu unsigned long
                            token = new Token(ALFTokens.Literal, x, y, stringValue, 0UL, literalFormat);
                        }
                    }
                    else
                    {
                        if (long.TryParse(digit, ishex ? NumberStyles.HexNumber : NumberStyles.Number, CultureInfo.InvariantCulture, out long num))
                            token = new Token(ALFTokens.Literal, x, y, stringValue, num, literalFormat);
                        else
                        {
                            errors.Error(y, x, String.Format(string.Join(" ", GResources.GetResourceText(29450217), "{0}!"), digit)); //RC 29450217 : Nelze analyzovat hodnotu long
                            token = new Token(ALFTokens.Literal, x, y, stringValue, 0L, literalFormat);
                        }
                    }
                }
                else
                {
                    if (isunsigned)
                    {
                        if (uint.TryParse(digit, ishex ? NumberStyles.HexNumber : NumberStyles.Number, CultureInfo.InvariantCulture, out uint num))
                            token = new Token(ALFTokens.Literal, x, y, stringValue, num, literalFormat);
                        else
                        {
                            errors.Error(y, x, String.Format(string.Join(" ", GResources.GetResourceText(29450218), "{0}!"), digit)); //RC 29450218 : Nelze analyzovat hodnotu int
                            token = new Token(ALFTokens.Literal, x, y, stringValue, (uint)0, literalFormat);
                        }
                    }
                    else
                    {
                        if (int.TryParse(digit, ishex ? NumberStyles.HexNumber : NumberStyles.Number, CultureInfo.InvariantCulture, out int num))
                            token = new Token(ALFTokens.Literal, x, y, stringValue, num, literalFormat);
                        else
                        {
                            errors.Error(y, x, String.Format(string.Join(" ", GResources.GetResourceText(29450218), "{0}!"), digit)); //RC 29450218 : Nelze analyzovat hodnotu int
                            token = new Token(ALFTokens.Literal, x, y, stringValue, 0, literalFormat);
                        }
                    }
                }
                token.next = nextToken;
                return token;
            }
        }
    }
}

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AbstractLexer.cs                         </Name>
//    <Description> abstraktní lexer                                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-08-02                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Gordic.GFE.Parsers.Refactoring.Lexer;
using Gordic.GFE.Parsers.Refactoring.Parser;
using Gordic.GFE.Parsers.Refactoring.Special;
using Gordic.General;

namespace Gordic.GFE.Parsers.Refactoring
{
    /// <summary>
    /// abstraktní lexer
    /// </summary>
    public abstract class AbstractLexer : ILexer
    {
        #region ILexer
        /// <exclude/>
        public Errors Errors { get { return errors; } }
        /// <exclude/>
        public List<TagComment> TagComments { get { return tagComments; } }
        /// <exclude/>
        public SpecialTracker SpecialTracker { get { return specialTracker; } }
        /// <exclude/>
        public bool SkipAllComments { get; set; }
        /// <exclude/>
        public bool EvaluateConditionalCompilation { get; set; }
        /// <exclude/>
        public virtual IDictionary<string, object> ConditionalCompilationSymbols
        {
            get { throw new NotSupportedException(); }
        }
        /// <exclude/>
        public virtual void SetConditionalCompilationSymbols(string symbols)
        {
            throw new NotSupportedException();
        }
        /// <exclude/>
        public string[] SpecialCommentTags
        {
            get { return specialCommentTags; }
            set
            {
                specialCommentTags = value;
                specialCommentHash = null;
                if (specialCommentTags != null && specialCommentTags.Length > 0)
                {
                    specialCommentHash = new Hashtable();
                    foreach (string str in specialCommentTags)
                        specialCommentHash.Add(str, null);
                }
            }
        }
        /// <exclude/>
        public Token Token { get { return lastToken; } }
        /// <exclude/>
        public Token LookAhead { get { return curToken; } }

        #endregion
        
        TextReader reader;
        int col = 1;
        int line = 1;

        protected Errors errors = new Errors();

        protected Token lastToken = null;
        protected Token curToken = null;
        protected Token peekToken = null;

        string[] specialCommentTags = null;
        protected Hashtable specialCommentHash = null;
        List<TagComment> tagComments = new List<TagComment>();
        protected StringBuilder sb = new StringBuilder();
        protected SpecialTracker specialTracker = new SpecialTracker();

        // používá se pro původní hodnotu řetězce (včetně všech sekvencí)
        protected StringBuilder originalValue = new StringBuilder();

        /// <exclude/>
        protected static IEnumerable<string> GetSymbols(string symbols)
        {
            if (!string.IsNullOrEmpty(symbols))
                foreach (string symbol in symbols.Split(';', ' ', '\t'))
                {
                    string s = symbol.Trim();
                    if (s.Length == 0)
                        continue;
                    yield return s;
                }
        }

        protected int Line { get { return line; } }
        protected int Col { get { return col; } }

        protected bool recordRead = false;
        protected StringBuilder recordedText = new StringBuilder();

        protected int ReaderRead()
        {
            ++col;
            int val = reader.Read();
            if (recordRead && val >= 0)
                recordedText.Append((char)val);
            if ((val == '\r' && reader.Peek() != '\n') || val == '\n')
            {
                ++line;
                col = 1;
                LineBreak();
            }
            return val;
        }
        protected int ReaderPeek() { return reader.Peek(); }

        /// <summary>
        /// Vytvoření nové instance třídy.
        /// </summary>
        protected AbstractLexer(TextReader reader)
        {
            this.reader = reader;
        }

        #region System.IDisposable interface implementation
        /// <summary>
        /// uvolnění objektu
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                reader.Close();
                reader = null;
                errors = null;
                lastToken = curToken = peekToken = null;
                specialCommentHash = null;
                tagComments = null;
                sb = originalValue = null;
            }
        }
        ~AbstractLexer() { Dispose(false); }
        #endregion

        /// <summary>
        /// Se musí volat před operací Peek.
        /// </summary>
        public void StartPeek() { peekToken = curToken; }

        /// <exclude/>
        public Token Peek()
        {
            if (peekToken.next == null)
                peekToken.next = Next();
            peekToken = peekToken.next;
            return peekToken;
        }

        /// <summary>
        /// Reads the next token and gives it back.
        /// </summary>
        /// <returns>An <see cref="Token"/> object.</returns>
        public virtual Token NextToken()
        {
            if (curToken == null)
            {
                curToken = Next();
                return curToken;
            }

            lastToken = curToken;

            if (curToken.next == null)
                curToken.next = Next();

            curToken = curToken.next;
            return curToken;
        }

        protected abstract Token Next();

        protected static bool IsIdentifierPart(int ch)
        {
            if (ch == 95) return true;  // 95 = '_'
            if (ch == -1) return false;
            return char.IsLetterOrDigit((char)ch); // akceptace unicode symblů
        }
        protected static bool IsHex(char digit)
        {
            return Char.IsDigit(digit) || ('A' <= digit && digit <= 'F') || ('a' <= digit && digit <= 'f');
        }
        protected bool HandleLineEnd(char ch)
        {
            // Handle MS-DOS or MacOS line ends.
            if (ch == '\r')
            {
                if (reader.Peek() == '\n')
                { // MS-DOS line end '\r\n'
                    ReaderRead();
                    return true;
                }
                else
                { // předpokládaný konec řádku MacOS, což je '\r'
                    LineBreak();
                    return true;
                }
            }
            if (ch == '\n')
            {
                LineBreak();
                return true;
            }
            return false;
        }

        protected int GetHexNumber(char digit)
        {
            if (Char.IsDigit(digit))
                return digit - '0';
            if ('A' <= digit && digit <= 'F')
                return digit - 'A' + 0xA;
            if ('a' <= digit && digit <= 'f')
                return digit - 'a' + 0xA;
            errors.Error(line, col, GResources.GetResourceText(29450233) + "'" + digit + "'"); //RC 29450233 : Neplatné hexadecimální číslo
            return 0;
        }
        
        protected Location lastLineEnd = new Location(1, 1);
        protected Location curLineEnd = new Location(1, 1);

        protected void LineBreak()
        {
            lastLineEnd = curLineEnd;
            curLineEnd = new Location(col - 1, line);
        }
        protected void SkipToEndOfLine()
        {
            int nextChar;
            while ((nextChar = reader.Read()) != -1)
            {
                if (nextChar == '\r')
                {
                    if (reader.Peek() == '\n')
                        reader.Read();
                    nextChar = '\n';
                }
                if (nextChar == '\n')
                {
                    ++line;
                    col = 1;
                    break;
                }
            }
        }

        protected string ReadToEndOfLine()
        {
            sb.Length = 0;
            int nextChar;
            while ((nextChar = reader.Read()) != -1)
            {
                char ch = (char)nextChar;

                if (nextChar == '\r')
                {
                    if (reader.Peek() == '\n')
                        reader.Read();
                    nextChar = '\n';
                }
                // vrátíme načtený řetězec, pokud EOL je docíleno
                if (nextChar == '\n')
                {
                    ++line;
                    col = 1;
                    return sb.ToString();
                }

                sb.Append(ch);
            }

            string retStr = sb.ToString();
            col += retStr.Length;
            return retStr;
        }

        /// <exclude/>
        public abstract void SkipCurrentBlock(int targetToken);
    }
}

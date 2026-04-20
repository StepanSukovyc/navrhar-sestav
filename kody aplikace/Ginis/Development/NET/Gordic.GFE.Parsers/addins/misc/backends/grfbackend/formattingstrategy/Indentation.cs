//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Indentation.cs                           </Name>
//    <Description> nastavení odsazení dané strategie                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-27                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;

namespace Gordic.GFE.Parsers.Binding
{
    /// <summary>
    /// nastavení odsazení dané strategie
    /// </summary>
    public sealed class IndentationSettings
    {
        /// <summary>
        /// symbol odsazení
        /// </summary>
        public string IndentString = "\t";
        /// <summary>Indikuje, že prázdné řádky se mají ponechat</summary>
        public bool LeaveEmptyLines = true;
    }

    /// <summary>
    /// preformátování odsazení
    /// </summary>
    public sealed class IndentationReformatter
    {
        /// <summary>
        /// blok (jednotka) odsazení.
        /// Sleduje stav odsazení
        /// </summary>
        public struct Block
        {
            /// <summary>
            /// Odsazení mimo blok.
            /// </summary>
            public string OuterIndent;

            /// <summary>
            /// Odsazení uvnitř bloku.
            /// </summary>
            public string InnerIndent;

            /// <summary>
            /// Poslední slovo, které bylo vidět uvnitř tohoto bloku.
            /// </summary>
            public string LastWord;

            /// <summary>
            /// Typ závorky, která otevřelá tento blok.
            /// </summary>
            public char Bracket;

            /// <summary>
            /// Zjištění, zda existuje pokračování uvnitř tohoto bloku.
            /// </summary>
            public bool Continuation;

            /// <summary>
            /// Jednořádkový blok.
            /// Vlastnost je integer, protože mohou existovat více jednořádkových bloků.
            /// </summary>
            public int OneLineBlock;

            /// <summary>
            /// Předchozí hodnota jednořádkového bloku, před tím, než byla resetováná.
            /// </summary>
            public int PreviousOneLineBlock;
            /// <summary>
            /// resetování jednořádkového bloku
            /// </summary>
            public void ResetOneLineBlock()
            {
                PreviousOneLineBlock = OneLineBlock;
                OneLineBlock = 0;
            }

            /// <summary>
            /// Řádek začátku bloku.
            /// </summary>
            public int StartLine;
            /// <summary>
            /// Vytvoření nové instance třídy
            /// </summary>
            /// <param name="set">nastavení odsazení</param>
            public void Indent(IndentationSettings set)
            {
                Indent(set, set.IndentString);
            }
            /// <summary>
            /// Vytvoření nové instance třídy
            /// </summary>
            /// <param name="set">nastavení odsazení</param>
            /// <param name="str">řádek odsazení</param>
            public void Indent(IndentationSettings set, string str)
            {
                OuterIndent = InnerIndent;
                InnerIndent += str;
                Continuation = false;
                ResetOneLineBlock();
                LastWord = "";
            }
            /// <exclude/>
            public override string ToString()
            {
                return string.Format("[Block StartLine={0}, LastWord='{1}', Continuation={2}, OneLineBlock={3}, PreviousOneLineBlock={4}]",
                                     this.StartLine, this.LastWord, this.Continuation, this.OneLineBlock, this.PreviousOneLineBlock);
            }
        }

        StringBuilder wordBuilder;
        Stack<Block> blocks; // seznam bloků, obsahuje všechny bloky mimo aktuální
        Block block;  // blok, je aktuální blok

        bool inString = false;
        bool inChar = false;
        bool verbatim = false;
        bool escape = false;

        bool lineComment = false;
        bool blockComment = false;

        char lastRealChar = ' '; // poslední symbol mimo komentář

        /// <summary>
        /// přeformátování dokumentu <paramref name="doc"/>
        /// </summary>
        /// <param name="doc">Dokument k přeformátování</param>
        /// <param name="set">Nastavení odsazení</param>
        public void Reformat(IDocumentAccessor doc, IndentationSettings set)
        {
            Init();

            while (doc.Next())
                Step(doc, set);
        }
        /// <summary>
        /// inicializace třídy
        /// </summary>
        public void Init()
        {
            wordBuilder = new StringBuilder();
            blocks = new Stack<Block>();
            block = new Block
            {
                InnerIndent = "",
                OuterIndent = "",
                Bracket = '{',
                Continuation = false,
                LastWord = "",
                OneLineBlock = 0,
                PreviousOneLineBlock = 0,
                StartLine = 0
            };

            inString = false;
            inChar = false;
            verbatim = false;
            escape = false;

            lineComment = false;
            blockComment = false;

            lastRealChar = ' '; // poslední symbol mimo komentář
        }
        /// <summary>
        /// krok odsazení dokumentu <paramref name="doc"/>
        /// </summary>
        /// <param name="doc">Dokument, s kterým se pracuje</param>
        /// <param name="set">Nastavení odsazení</param>
        public void Step(IDocumentAccessor doc, IndentationSettings set)
        {
            string line = doc.Text;
            if (set.LeaveEmptyLines && line.Length == 0) return; // ponechání prázdných řádků prázdnými
            line = line.TrimStart();

            StringBuilder indent = new StringBuilder();
            if (line.Length == 0)
            {
                // speciální ošetření prázdných řádků:
                if (blockComment || (inString && verbatim))
                    return;
                indent.Append(block.InnerIndent);
                indent.Append(Repeat(set.IndentString, block.OneLineBlock));
                if (block.Continuation)
                    indent.Append(set.IndentString);
                if (doc.Text != indent.ToString())
                    doc.Text = indent.ToString();
                return;
            }

            if (TrimEnd(doc))
                line = doc.Text.TrimStart();

            Block oldBlock = block;
            bool startInComment = blockComment;
            bool startInString = (inString && verbatim);

            #region analýza po symbol za symbolem
            lineComment = false;
            inChar = false;
            escape = false;
            if (!verbatim) inString = false;

            lastRealChar = '\n';

            char lastchar = ' ';
            char c = ' ';
            char nextchar = line[0];
            for (int i = 0; i < line.Length; i++)
            {
                if (lineComment) break; // přerušení analýzy aktuálního řádku

                lastchar = c;
                c = nextchar;
                if (i + 1 < line.Length)
                    nextchar = line[i + 1];
                else
                    nextchar = '\n';

                if (escape)
                {
                    escape = false;
                    continue;
                }

                #region kontrola komentářových zanků
                switch (c)
                {
                    case '/':
                        if (blockComment && lastchar == '*')
                            blockComment = false;
                        if (!inString && !inChar)
                        {
                            if (!blockComment && nextchar == '/')
                                lineComment = true;
                            if (!lineComment && nextchar == '*')
                                blockComment = true;
                        }
                        break;
                    case '#':
                        if (!(inChar || blockComment || inString))
                            lineComment = true;
                        break;
                    case '"':
                        if (!(inChar || lineComment || blockComment))
                        {
                            inString = !inString;
                            if (!inString && verbatim)
                            {
                                if (nextchar == '"')
                                {
                                    escape = true; // přerušení závorky
                                    inString = true;
                                }
                                else
                                    verbatim = false;
                            }
                            else if (inString && lastchar == '@')
                                verbatim = true;
                        }
                        break;
                    case '\'':
                        if (!(inString || lineComment || blockComment))
                            inChar = !inChar;
                        break;
                    case '\\':
                        if ((inString && !verbatim) || inChar)
                            escape = true; // ponechání dalšího symbolu
                        break;
                }
                #endregion

                if (lineComment || blockComment || inString || inChar)
                {
                    if (wordBuilder.Length > 0)
                        block.LastWord = wordBuilder.ToString();
                    wordBuilder.Length = 0;
                    continue;
                }

                if (!Char.IsWhiteSpace(c) && c != '[' && c != '/')
                    if (block.Bracket == '{')
                        block.Continuation = true;

                if (Char.IsLetterOrDigit(c))
                    wordBuilder.Append(c);
                else
                {
                    if (wordBuilder.Length > 0)
                        block.LastWord = wordBuilder.ToString();
                    wordBuilder.Length = 0;
                }

                #region bloky
                switch (c)
                {
                    case '{':
                        block.ResetOneLineBlock();
                        blocks.Push(block);
                        block.StartLine = doc.LineNumber;
                        if (block.LastWord == "switch")
                            block.Indent(set, set.IndentString + set.IndentString);
                        else
                            block.Indent(set);
                        block.Bracket = '{';
                        break;
                    case '}':
                        while (block.Bracket != '{')
                        {
                            if (blocks.Count == 0) break;
                            block = blocks.Pop();
                        }
                        if (blocks.Count == 0) break;
                        block = blocks.Pop();
                        block.Continuation = false;
                        block.ResetOneLineBlock();
                        break;
                    case '(':
                    case '[':
                        blocks.Push(block);
                        if (block.StartLine == doc.LineNumber)
                            block.InnerIndent = block.OuterIndent;
                        else
                            block.StartLine = doc.LineNumber;
                        block.Indent(set,
                                     Repeat(set.IndentString, oldBlock.OneLineBlock) +
                                     (oldBlock.Continuation ? set.IndentString : "") +
                                     (i == line.Length - 1 ? set.IndentString : new String(' ', i + 1)));
                        block.Bracket = c;
                        break;
                    case ')':
                        if (blocks.Count == 0) break;
                        if (block.Bracket == '(')
                        {
                            block = blocks.Pop();
                            if (IsSingleStatementKeyword(block.LastWord))
                                block.Continuation = false;
                        }
                        break;
                    case ']':
                        if (blocks.Count == 0) break;
                        if (block.Bracket == '[')
                            block = blocks.Pop();
                        break;
                    case ';':
                    case ',':
                        block.Continuation = false;
                        block.ResetOneLineBlock();
                        break;
                    case ':':
                        if (block.LastWord == "case" || line.StartsWith("case ") || line.StartsWith(block.LastWord + ":"))
                        {
                            block.Continuation = false;
                            block.ResetOneLineBlock();
                        }
                        break;
                }

                if (!Char.IsWhiteSpace(c))
                    // registrujeme tento symbol jako poslední mimo komentář
                    lastRealChar = c;
                #endregion
            }
            #endregion

            if (wordBuilder.Length > 0)
                block.LastWord = wordBuilder.ToString();
            wordBuilder.Length = 0;

            if (startInString) return;
            if (startInComment && line[0] != '*') return;
            if (doc.Text.StartsWith("//\t") || doc.Text == "//")
                return;

            if (line[0] == '}')
            {
                indent.Append(oldBlock.OuterIndent);
                oldBlock.ResetOneLineBlock();
                oldBlock.Continuation = false;
            }
            else
                indent.Append(oldBlock.InnerIndent);

            if (indent.Length > 0 && oldBlock.Bracket == '(' && line[0] == ')')
                indent.Remove(indent.Length - 1, 1);
            else if (indent.Length > 0 && oldBlock.Bracket == '[' && line[0] == ']')
                indent.Remove(indent.Length - 1, 1);

            if (line[0] == ':')
                oldBlock.Continuation = true;
            else if (lastRealChar == ':' && indent.Length >= set.IndentString.Length)
            {
                if (block.LastWord == "case" || line.StartsWith("case ") || line.StartsWith(block.LastWord + ":"))
                    indent.Remove(indent.Length - set.IndentString.Length, set.IndentString.Length);
            }
            else if (lastRealChar == ')')
            {
                if (IsSingleStatementKeyword(block.LastWord))
                    block.OneLineBlock++;
            }
            else if (lastRealChar == 'e' && block.LastWord == "else")
            {
                block.OneLineBlock = Math.Max(1, block.PreviousOneLineBlock);
                block.Continuation = false;
                oldBlock.OneLineBlock = block.OneLineBlock - 1;
            }

            if (doc.ReadOnly)
            {
                // nemůžeme změnit aktuální řádek, ale měli bychom uskutečnit odsazení pokud je to možné
                // (pokud aktuální stav není víceřádkový).
                if (!oldBlock.Continuation && oldBlock.OneLineBlock == 0 &&
                    oldBlock.StartLine == block.StartLine &&
                    block.StartLine < doc.LineNumber && lastRealChar != ':')
                {
                    // použijeme StringBuilder pro odsazení aktuálního řádku
                    indent.Length = 0;
                    line = doc.Text;
                    for (int i = 0; i < line.Length; ++i)
                    {
                        if (!Char.IsWhiteSpace(line[i]))
                            break;
                        indent.Append(line[i]);
                    }
                    // /* */ víceřádkový komentář by měl mít extra prostor 
                    // - proto nepočítáme do odsazení
                    if (startInComment && indent.Length > 0 && indent[indent.Length - 1] == ' ')
                        indent.Length -= 1;
                    block.InnerIndent = indent.ToString();
                }
                return;
            }

            if (line[0] != '{')
            {
                if (line[0] != ')' && oldBlock.Continuation && oldBlock.Bracket == '{')
                    indent.Append(set.IndentString);
                indent.Append(Repeat(set.IndentString, oldBlock.OneLineBlock));
            }

            // pouze pro bloky komentářů řádků, začínajících na *,
            // u všech ostatních zachováme jejích původní odsazení
            if (startInComment)
                indent.Append(' ');

            if (indent.Length != (doc.Text.Length - line.Length) ||
                !doc.Text.StartsWith(indent.ToString()) ||
                Char.IsWhiteSpace(doc.Text[indent.Length]))
                doc.Text = indent.ToString() + line;
        }

        static string Repeat(string text, int count)
        {
            if (count == 0)
                return string.Empty;
            if (count == 1)
                return text;
            StringBuilder b = new StringBuilder(text.Length * count);
            for (int i = 0; i < count; i++)
                b.Append(text);
            return b.ToString();
        }

        bool IsSingleStatementKeyword(string keyword)
        {
            switch (keyword)
            {
                case "format":
                case "info":
                case "script":
                case "region":
                case "head":
                case "copy-and-fill":
                case "body":
                    return true;
                default:
                    return false;
            }
        }

        bool TrimEnd(IDocumentAccessor doc)
        {
            string line = doc.Text;
            if (!Char.IsWhiteSpace(line[line.Length - 1])) return false;

            // jedno prázdé políčko pro komentář je povoleno
            if (line.EndsWith("// ") || line.EndsWith("* "))
                return false;

            doc.Text = line.TrimEnd();
            return true;
        }
    }
}

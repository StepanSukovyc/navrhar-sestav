//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ALFExpressionFinder.cs                 </Name>
//    <Description> nástroj nalezení kontextu a umístění aktuáílního výrazu     </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-01-21                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Refactoring;
using Gordic.GFE.Parsers.Refactoring.Lexer;
using System;
using System.Collections.Generic;
using System.Text;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// nástroj nalezení kontextu a umístění aktuáílního výrazu
    /// </summary>
    class ALFExpressionFinder : IExpressionFinder
    {
        /// <summary>
        /// stav frame objektu při jeho sestavení (metoda TrackCurrentContext)
		/// </summary>
        enum FrameState
        {
            /// <summary>
            /// stav při úplném objektu
            /// </summary>
            Normal,
            /// <summary>
            /// stav při úplném objektu ZA znakem 'rovná se' - hodnota parametru
            /// </summary>
            Value,
            /// <summary>
            /// je ve větví - konstrukce obsahu větve
            /// u atributů znamená, že jsme 'uvnitř uvozovek'
            /// </summary>
            Attribute,
            /// <summary>
            /// očekávání konce větve
            /// </summary>
            EndTag
        }

        /// <summary>
        /// obálka kontextů
        /// </summary>
        sealed class FrameContext
        {
            FrameContext parent;
            /// <summary>
            /// vlastník daného kontextu
            /// </summary>
            internal FrameContext Parent { get { return parent; } set { parent = value; if (parent != null) parent.next = this; } }

            FrameContext next;

            /// <summary>
            /// nástupce daného kontextu
            /// </summary>
            internal FrameContext Next { get { return next; } set { next = value; if (next != null) next.parent = this; } }

            /// <summary>
            /// prezentovaný kontext
            /// </summary>
            internal ExpressionContext Context { get; set; }

            /// <summary>
            /// prázdný konstruktor třídy
            /// </summary>
            /// <param name="context">prezentovaný kontext</param>
            public FrameContext(ExpressionContext context) { Context = context; }

            /// <summary>
            /// prázdný konstruktor třídy
            /// </summary>
            /// <param name="context">prezentovaný kontext</param>
            /// <param name="nextContext">kontext následujícího obalu</param>
            public FrameContext(ExpressionContext context, ExpressionContext nextContext)
            {
                Context = context;
                Next = new FrameContext(nextContext);
            }

            /// <summary>
            /// krok dovnitř kontextem
            /// </summary>
            internal void SetInner()
            {
                parent = this;
                if (next != null)
                {
                    Context = next.Context;
                    next = next.Next;
                }
                else Context = null;
            }

            /// <summary>
            /// vnoření se do další větve
            /// </summary>
            /// <param name="expressionContext"></param>
            internal void InnerStep(ExpressionContext expressionContext)
            {
                Next = new FrameContext(expressionContext);
                SetInner();
            }
        }

        /// <summary>
        /// Při analýze kódu, každý blok startuje jedním z následujících symbolu "(", "[", "{" nebo "&lt;" (pro generované)
        /// čímž vytváříme instancí Frame objektu
        /// </summary>
        sealed class Frame
        {
            /// <summary>
            /// vlastník daného framu
            /// </summary>
            internal Frame parent;
            /// <summary>
            /// stav aktuálního objektu
            /// </summary>
            internal FrameState state = FrameState.Normal;

            /// <summary>
            /// aktuální kontext
            /// </summary>
            public FrameContext FrameContext { get; set; }

            /// <summary>
            /// kontext daného objektu
            /// </summary>
            internal ExpressionContext Context { get { return FrameContext != null ? FrameContext.Context : ExpressionContext.Default; } }

            /// <summary>záčátek klíče ke sledování</summary>
            internal Location lastTokenStart;
            /// <summary>poslední výraz před daným</summary>
            internal Token lastExpressionToken;

            /// <summary>
            /// prázdný konstruktor třídy
            /// </summary>
            public Frame() : this(null) { }

            /// <summary>
            /// vytvoření nové instance třídy
            /// </summary>
            /// <param name="parent">vlastník daného okna</param>
            public Frame(Frame parent) { this.parent = parent; }
        }

        protected ILexer lexer;
        protected AbstractTokens tokens;
        protected Location targetPosition;
        protected int lastToken;
        Frame frame;
        protected List<int> lineOffsets;
        int initialOffset;
        ParseInformation parseInformation;
        IFileContent fileContent;

        #region IExpressionFinder
        /// <exclude/>
        public ExpressionResult FindExpression(string text, int offset)
        {
            Init(text, offset);
            Token token;
            Location lastError = Location.Empty;
            lexer.Errors.Error = delegate (int errorLine, int errorCol, string errorMsg)
            {
                lastError = new Location(errorCol, errorLine);
            };
            while ((token = lexer.NextToken()) != null)
            {
                if (token.Kind == ALFTokens.EOF) break;

                if (targetPosition <= token.Location && token.Kind != AbstractTokens.SPACE)
                    break;
                ApplyToken(token);
                //if (targetPosition <= token.EndLocation)
                //{
                //    if (token.Kind == ALFTokens.Literal)
                //        // nevracíme jako výraz pokud offset byl uvnitř,
                //        // nebo když offset je na konci nekorektně vytvořeného řetězce
                //        if (targetPosition < token.EndLocation || lastError == token.Location)
                //            frame.lastTokenStart = Location.Empty;
                //    break;
                //}
                lastToken = token.Kind;
            }

            int tokenOffset;
            if (token == null || token.Kind == ALFTokens.EOF)
                tokenOffset = text.Length;
            else
                tokenOffset = LocationToOffset(token.Location);
            // pokud poslední Token není '>'
            int lastExpressionStartOffset = (frame != null && lastToken != AbstractTokens.GreaterThan) ? LocationToOffset(frame.lastTokenStart) : tokenOffset;

            if (lastExpressionStartOffset >= 0)
            {
                if (offset < tokenOffset)
                    // offset je na začátku
                    return MakeResult(text, lastExpressionStartOffset, tokenOffset, (frame != null && frame.state != FrameState.EndTag) ? frame.Context : null);
                else
                    // offset je UVNITŘ
                    return MakeResult(text, lastExpressionStartOffset, offset, (frame != null && frame.state != FrameState.EndTag) ? frame.Context : null);
            }
            else
                return new ExpressionResult(null, (frame != null && frame.state != FrameState.EndTag) ? frame.Context : null);
        }
        #endregion

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        public ALFExpressionFinder() { }

        /// <summary>
        /// aktualizace informace o obsahu analýzeru
        /// </summary>
        /// <param name="parseInformation">Nové informace</param>
        public void SetInformation(ParseInformation parseInformation)
        {
            this.parseInformation = parseInformation;
            if (parseInformation != null && parseInformation.MostRecentCompilationUnit != null)
                fileContent = parseInformation.MostRecentCompilationUnit.FileContent;
            else
                fileContent = DefaultFileContent.DummyFileContent;
        }

        /// <exclude/>
        public string FilterComments(string text, ref int offset)
        {
            if (text.Length <= offset)
                return null;
            this.initialOffset = offset;
            StringBuilder outText = new StringBuilder();
            int curOffset = 0;

            while (curOffset <= initialOffset)
            {
                char ch = text[curOffset];

                switch (ch)
                {
                    case '@':
                        if (curOffset + 1 < text.Length && text[curOffset + 1] == '"')
                        {
                            outText.Append(text[curOffset++]); // @
                            outText.Append(text[curOffset++]); // "
                            if (!ReadVerbatimString(outText, text, ref curOffset))
                                return null;
                        }
                        else
                        {
                            outText.Append(ch);
                            ++curOffset;
                        }
                        break;
                    case '\'':
                        outText.Append(ch);
                        curOffset++;
                        if (!ReadChar(outText, text, ref curOffset))
                            return null;
                        break;
                    case '"':
                        outText.Append(ch);
                        curOffset++;
                        if (!ReadString(outText, text, ref curOffset))
                            return null;
                        break;
                    case '/':
                        if (curOffset + 1 < text.Length && text[curOffset + 1] == '/')
                        {
                            offset -= 2;
                            curOffset += 2;
                            if (!ReadToEOL(text, ref curOffset, ref offset))
                                return null;
                        }
                        else if (curOffset + 1 < text.Length && text[curOffset + 1] == '*')
                        {
                            offset -= 2;
                            curOffset += 2;
                            if (!ReadMultiLineComment(text, ref curOffset, ref offset))
                                return null;
                        }
                        else
                            goto default;
                        break;
                    case '#':
                        if (!ReadToEOL(text, ref curOffset, ref offset))
                            return null;
                        break;
                    default:
                        outText.Append(ch);
                        ++curOffset;
                        break;
                }
            }

            return outText.ToString();
        }

        /// <summary>
        /// inicializace lexeru
        /// </summary>
        /// <param name="text">text inicializace</param>
        protected virtual void InitLexer(string text) { }
        /// <summary>
        /// aktualizujeme výraz a obálku klíče 
        /// </summary>
        /// <param name="token">daný klíč</param>
        protected virtual void TrackCurrentFrameAndExpression(Token token)
        {
            switch (token.Kind)
            {
                #region atributy větve
                // je to ihned ZA atributem 'encoding' 
                case 51:
                    if (frame != null && frame.Context == XmlContext.Instance)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(XmlEncodingContext.Instance),
                            lastTokenStart = token.Location
                        };
                    break;
                // je to atribut 'xmlns'
                case 70:
                    if (frame != null && frame.Context == FormatContext.Instance)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(FormatXmlnsContext.Instance),
                            lastTokenStart = token.Location
                        };
                    break;
                // je to atribut 'type'
                case 71:
                    if (frame != null && frame.Context == FormatContext.Instance)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(FormatTypeContext.Instance),
                            lastTokenStart = token.Location
                        };
                    break;
                // je to atribut 'font-face'
                case 106:
                    if (frame != null && frame.Context.IsComponent)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(StyleFontFaceContext.Instance),
                            lastTokenStart = token.Location
                        };
                    break;
                // je to atribut 'font-name'
                case 107:
                    if (frame != null && frame.Context.IsComponent)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(StyleFontNameContext.Instance),
                            lastTokenStart = token.Location
                        };
                    break;
                // je to atribut 'font-charset'
                case 108:
                    if (frame != null && frame.Context.IsComponent)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(StyleFontCharsetContext.Instance),
                            lastTokenStart = token.Location
                        };
                    break;
                // je to atribut 'font-bold'
                case 110:
                // je to atribut 'font-italic'
                case 111:
                // je to atribut 'font-underline'
                case 112:
                // je to atribut 'font-strikeout'
                case 113:
                // je to atribut 'multiline'
                case 135:
                // je to atribut 'endpage'
                case 153:
                // je to atribut 'inside-border'
                case 198:
                    if (frame != null && frame.Context.IsComponent)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(StyleTrueFalseContext.Instance),
                            lastTokenStart = token.Location
                        };
                    break;
                // je to atribut 'font-color'
                case 114:
                // je to atribut 'border-color'
                case 120:
                // je to atribut 'left-border-color'
                case 121:
                // je to atribut 'right-border-color'
                case 122:
                // je to atribut 'top-border-color'
                case 123:
                // je to atribut 'bottom-border-color'
                case 124:
                // je to atribut 'background-color'
                case 141:
                    if (frame != null && frame.Context.IsComponent)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(StyleColorContext.Instance),
                            lastTokenStart = token.Location
                        };
                    break;
                // je to atribut 'border-style'
                case 125:
                // je to atribut 'left-border-style'
                case 126:
                // je to atribut 'right-border-style'
                case 127:
                // je to atribut 'top-border-style'
                case 128:
                // je to atribut 'bottom-border-style'
                case 129:
                    if (frame != null && frame.Context.IsComponent)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(BorderStyleContext.Instance),
                            lastTokenStart = token.Location
                        };
                    break;
                // je to atribut 'horizontal-align'
                case 130:
                // je to atribut 'align'
                case 131:
                    if (frame != null && frame.Context.IsComponent)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(StyleAlignContext.Instance),
                            lastTokenStart = token.Location
                        };
                    break;
                // je to atribut 'vertical-align'
                case 132:
                    if (frame != null && frame.Context.IsComponent)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(StyleVerticalAlignContext.Instance),
                            lastTokenStart = token.Location
                        };
                    break;
                // je to atribut 'ellipsis-style'
                case 133:
                    if (frame != null && frame.Context.IsComponent)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(EllipsisStyleContext.Instance),
                            lastTokenStart = token.Location
                        };
                    break;
                // je to atribut 'on-each-page'
                case 150:
                    if (frame != null && frame.Context.IsComponent)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(OnEachPageContext.Instance),
                            lastTokenStart = token.Location
                        };
                    break;
                // je to atribut 'break-page-before'
                case 151:
                // je to atribut 'break-page-after'
                case 152:
                    if (frame != null && frame.Context.IsComponent)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(LineBreakPageContext.Instance),
                            lastTokenStart = token.Location
                        };
                    break;
                // je to atribut 'filename'
                case 155:
                    if (frame != null && frame.Context == TemplateContext.Instance)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(TemplateFilenameContext.Instance),
                            lastTokenStart = token.Location
                        };
                    break;
                #endregion

                #region uvnitř větve
                // je to větev 'xml'
                case 49:
                    // pokud se jedná o větev 'xml', což znamená, že máme zápis '<?xml '
                    if (lastToken == ALFTokens.Question)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(XmlContext.Instance, AreaXmlContext.Instance),
                            lastTokenStart = token.Location
                        };
                    break;
                // je to větev 'format'
                case 52:
                // je to atribut 'format' větve 'value-of'
                case 173:
                    // pokud se jedná o větev 'format', což znamená, že máme zápis '<format '
                    if (lastToken == ALFTokens.LessThan
                        && frame != null && frame.state != FrameState.EndTag)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(FormatContext.Instance, AreaFormatContext.Instance)
                        };
                    if (frame != null)
                        frame.lastTokenStart = token.Location;
                    break;
                // je to větev 'info'
                case 53:
                    // pokud se jedná o větev 'info', což znamená, že máme zápis '<info '
                    if (lastToken == ALFTokens.LessThan
                        && frame != null && frame.state != FrameState.EndTag)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(InfoContext.Instance)
                        };
                    if (frame != null)
                        frame.lastTokenStart = token.Location;
                    break;
                // je to větev 'region'
                case 54:
                    // pokud se jedná o větev 'region', což znamená, že máme zápis '<region '
                    if (lastToken == ALFTokens.LessThan
                        && frame != null && frame.state != FrameState.EndTag)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(RegionContext.Instance, AreaRegionContext.Instance)
                        };
                    if (frame != null)
                        frame.lastTokenStart = token.Location;
                    break;
                // je to větev 'head'
                case 55:
                    // pokud se jedná o větev 'head', což znamená, že máme zápis '<head '
                    if (lastToken == ALFTokens.LessThan
                        && frame != null && frame.state != FrameState.EndTag)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(HeadContext.Instance, AreaHeadContext.Instance)
                        };
                    if (frame != null)
                        frame.lastTokenStart = token.Location;
                    break;
                // je to větev 'body'
                case 56:
                    // pokud se jedná o větev 'body', což znamená, že máme zápis '<body '
                    if (lastToken == ALFTokens.LessThan
                        && frame != null && frame.state != FrameState.EndTag)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(BodyContext.Instance, AreaBodyContext.Instance)
                        };
                    if (frame != null)
                        frame.lastTokenStart = token.Location;
                    break;
                // je to větev 'foot'
                case 57:
                    // pokud se jedná o větev 'foot', což znamená, že máme zápis '<foot '
                    if (lastToken == ALFTokens.LessThan
                        && frame != null && frame.state != FrameState.EndTag)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(FootContext.Instance, AreaFootContext.Instance)
                        };
                    if (frame != null)
                        frame.lastTokenStart = token.Location;
                    break;
                // je to větev 'variable'
                case 58:
                    // pokud se jedná o větev 'variable', což znamená, že máme zápis '<variable '
                    if (lastToken == ALFTokens.LessThan
                        && frame != null && frame.state != FrameState.EndTag)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(VariableContext.Instance)
                        };
                    if (frame != null)
                        frame.lastTokenStart = token.Location;
                    break;
                // je to větev 'paper-setting'
                case 59:
                    // pokud se jedná o větev 'paper-setting', což znamená, že máme zápis '<paper-setting '
                    if (lastToken == ALFTokens.LessThan
                        && frame != null && frame.state != FrameState.EndTag)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(PaperSettingContext.Instance, AreaPaperSettingContext.Instance)
                        };
                    if (frame != null)
                        frame.lastTokenStart = token.Location;
                    break;
                // je to větev 'value-of'
                case 61:
                    // pokud se jedná o větev 'value-of', což znamená, že máme zápis '<value-of '
                    if (lastToken == ALFTokens.LessThan
                        && frame != null && frame.state != FrameState.EndTag)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(ValueOfContext.Instance, AreaValueOfContext.Instance)
                        };
                    if (frame != null)
                        frame.lastTokenStart = token.Location;
                    break;
                // je to větev 'text'
                case 62:
                    // pokud se jedná o větev 'text', což znamená, že máme zápis '<text '
                    if (lastToken == ALFTokens.LessThan
                        && frame != null && frame.state != FrameState.EndTag)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(TextContext.Instance, AreaTextContext.Instance)
                        };
                    if (frame != null)
                        frame.lastTokenStart = token.Location;
                    break;
                // je to větev 'image'
                case 63:
                    // pokud se jedná o větev 'image', což znamená, že máme zápis '<image '
                    if (lastToken == ALFTokens.LessThan
                        && frame != null && frame.state != FrameState.EndTag)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(ImageContext.Instance, AreaImageContext.Instance)
                        };
                    if (frame != null)
                        frame.lastTokenStart = token.Location;
                    break;
                // je to větev 'style'
                case 64:
                // je to atribut 'style'
                case 171:
                    // pokud se jedná o větev 'style', což znamená, že máme zápis '<style '
                    if (lastToken == ALFTokens.LessThan
                        && frame != null && frame.state != FrameState.EndTag)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(StyleContext.Instance, AreaStyleContext.Instance)
                        };
                    if (frame != null)
                        frame.lastTokenStart = token.Location;
                    break;
                // je to větev 'group'
                case 68:
                    // pokud se jedná o větev 'group', což znamená, že máme zápis '<group '
                    if (lastToken == ALFTokens.LessThan
                        && frame != null && frame.state != FrameState.EndTag)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(GroupContext.Instance, AreaGroupContext.Instance)
                        };
                    if (frame != null)
                        frame.lastTokenStart = token.Location;
                    break;
                // je to větev 'line'
                case 90:
                    // pokud se jedná o větev 'line', což znamená, že máme zápis '<line '
                    if (lastToken == ALFTokens.LessThan
                        && frame != null && frame.state != FrameState.EndTag)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(LineContext.Instance, AreaLineContext.Instance)
                        };
                    if (frame != null)
                        frame.lastTokenStart = token.Location;
                    break;
                // je to větev 'template'
                case 166:
                    // pokud se jedná o větev 'template', což znamená, že máme zápis '<template '
                    if (lastToken == ALFTokens.LessThan
                        && frame != null && frame.state != FrameState.EndTag)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(TemplateContext.Instance)
                        };
                    if (frame != null)
                        frame.lastTokenStart = token.Location;
                    break;
                // je to větev 'rtfref'
                case 179:
                    // pokud se jedná o větev 'rtfref', což znamená, že máme zápis '<rtfref '
                    if (lastToken == ALFTokens.LessThan
                        && frame != null && frame.state != FrameState.EndTag)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(RtfRefContext.Instance)
                        };
                    if (frame != null)
                        frame.lastTokenStart = token.Location;
                    break;
                #endregion

                case AbstractTokens.LessThan:
                    //if (frame.parent != null && frame.parent.state != FrameState.InnerObject)
                    //    frame.type = FrameType.Error;
                    if (frame != null)
                        frame.lastTokenStart = token.Location;
                    break;
                case AbstractTokens.Question:
                    // neaktualizujeme kontext - TrackCurrentContext se o to postárá
                    if (lastToken == ALFTokens.LessThan)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(DeclarationContext.Instance),
                            lastTokenStart = token.Location
                        };
                    else if (frame != null)
                        frame.lastTokenStart = Location.Empty;
                    break;
                case AbstractTokens.GreaterThan:
                    if (lastToken == ALFTokens.Div)
                        frame = frame != null && frame.parent != null ? frame.parent.parent : frame;
                    else if (frame != null && frame.state == FrameState.EndTag)
                        frame = frame != null ? frame.parent : frame;
                    // jedná se o ukončení větve komentáře
                    else if (lastToken == ALFTokens.Minus)
                        frame = frame != null ? frame.parent : frame;
                    else if (lastToken == ALFTokens.Question || (frame != null && frame.Context != ExpressionContext.Default))
                        frame.FrameContext.SetInner();
                    break;
                case AbstractTokens.Not:
                    // jedná se o kontext komentáře
                    if (lastToken == AbstractTokens.LessThan)
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(CommentContext.Instance),
                            lastTokenStart = token.Location
                        };
                    break;
                case AbstractTokens.Assign:
                case AbstractTokens.TAB:
                case AbstractTokens.SPACE:
                    break;
                case AbstractTokens.Literal:
                    // pokud literál začíná na uvozovky, pak se jedná o hodnotu atributu
                    if (token.Value.StartsWith("\""))
                    {
                        // pokud nejsme ZA ukončenou hodnotou, pak jsme "uvnitř" hodnoty
                        if (!token.Value.EndsWith("\"")
                            // pokud jsme ihned za uvozovkou
                            || token.Value.Length == 1)
                        {
                            if (frame != null && frame.Context.HasValues)
                            {
                                //frame.FrameContext.InnerStep(ExpressionContext.ValueContext);
                                //frame = new Frame(frame);
                                //frame.FrameContext = new FrameContext(ExpressionContext.ValueContext);
                                // jsme uvnitř atributu, ale TOKEN začíná uvozovkou, a proto +1
                                frame.lastTokenStart =
                                    new Location(token.Location.Column + 1, token.Location.Line);
                                //frame.SetBracketContext(frame.parent.context);
                            }
                            else if (frame != null)
                            {
                                frame.FrameContext.InnerStep(ExpressionContext.ValueContext);
                                frame.lastTokenStart = token.Location;
                            }
                            break;
                        }
                        else if (frame != null)
                            // posuneme se od hodnoty atributu do větve
                            frame = frame.parent;
                    }

                    // jsme ZA atributem
                    if (frame != null)
                        frame.lastTokenStart =
                            new Location(token.Location.Column + token.Value.Length, token.Location.Line);
                    break;
                default:
                    // nejedná se o začátek nějakého tokenu
                    if (token.Kind != AbstractTokens.Identifier
                        && (frame == null || !(frame.Context is Gordic.GFE.Parsers.Binding.ExpressionContext.AreaExpressionContext)))
                        // jsme-li v nějakém kontextu, pak se zřejmě jedná o kontext atributů
                        frame = new Frame(frame)
                        {
                            FrameContext = new FrameContext(ExpressionContext.Attribute)
                        };
                    if (frame != null)
                    {
                        frame.lastTokenStart = token.Location;
                        frame.lastExpressionToken = token;
                    }
                    break;
            }
        }
        /// <summary>
        /// aktualizujeme kontext klíče
        /// </summary>
        /// <param name="token"></param>
        protected virtual void TrackCurrentContext(Token token)
        {
            switch (token.Kind)
            {
                case AbstractTokens.Assign:
                    if (frame != null && frame.state == FrameState.Normal)
                        frame.state = FrameState.Value;
                    else
                    {
                        // jedná se o operátor
                    }
                    break;
                case AbstractTokens.LessThan:
                    //if (frame.parent == null)
                    //{
                    //    frame.SetContext(ALFExpressionContext.XmlInicialization);
                    //    frame.state = FrameState.Initializer;
                    //}
                    //else
                    //{
                    //    frame.SetContext(ALFExpressionContext.BranchMain);
                    //    frame.type = FrameType.Unknown;
                    //}
                    break;
                case AbstractTokens.Question:
                    // jak vyřešit druhý otázník v deklaraci?
                    // ?xml version="1.0" encoding="windows-1250"?
                    break;
                case AbstractTokens.Literal:
                    break;
                // pokud předchozí znak je <, pak se zřejmě jedná o ukončení větve
                case AbstractTokens.Div:
                    if (lastToken == AbstractTokens.LessThan)
                    {
                        frame = frame.parent;
                        if (frame != null)
                            frame.state = FrameState.EndTag;
                    }
                    break;
                case AbstractTokens.Identifier:
                    if (frame != null && frame.state == FrameState.Attribute)
                    { }
                    break;
                default:
                    //if (lastToken == ALFTokens.LessThan
                    //    && frame.context == ALFExpressionContext.BranchMain)
                    //{
                    //    frame.context = ExpressionContext.Attribute;
                    //    frame.state = FrameState.Attribute;
                    //}
                    break;
            }
        }
        int LocationToOffset(Location location)
        {
            if (location.Line <= 0) return -1;
            return lineOffsets[location.Line - 1] + location.Column - 1;
        }

        Location OffsetToLocation(int offset)
        {
            int lineNumber = lineOffsets.BinarySearch(offset);
            if (lineNumber < 0)
                lineNumber = (~lineNumber) - 1;
            return new Location(offset - lineOffsets[lineNumber] + 1, lineNumber + 1);
        }

        ExpressionResult MakeResult(string text, int startOffset, int endOffset, ExpressionContext context)
        {
            return new ExpressionResult(text.Substring(startOffset, endOffset - startOffset),
                                        DomRegion.FromLocation(OffsetToLocation(startOffset), OffsetToLocation(endOffset)),
                                        context, null);
        }

        bool ReadToEOL(string text, ref int curOffset, ref int offset)
        {
            while (curOffset <= initialOffset)
            {
                char ch = text[curOffset++];
                --offset;
                if (ch == '\n')
                    return true;
            }
            return false;
        }
        bool ReadChar(StringBuilder outText, string text, ref int curOffset)
        {
            if (curOffset > initialOffset)
                return false;
            char first = text[curOffset++];
            outText.Append(first);
            if (curOffset > initialOffset)
                return false;
            char second = text[curOffset++];
            outText.Append(second);
            if (first == '\\')
            {
                char next;
                do
                {
                    if (curOffset > initialOffset)
                        return false;
                    next = text[curOffset++];
                    outText.Append(next);
                } while ((second == 'u' || second == 'x') && char.IsLetterOrDigit(next));
            }
            return text[curOffset - 1] == '\'';
        }
        bool ReadString(StringBuilder outText, string text, ref int curOffset)
        {
            while (curOffset <= initialOffset)
            {
                char ch = text[curOffset++];
                outText.Append(ch);
                if (ch == '"')
                    return true;
                else if (ch == '\\')
                    if (curOffset <= initialOffset)
                        outText.Append(text[curOffset++]);
            }
            return false;
        }
        bool ReadVerbatimString(StringBuilder outText, string text, ref int curOffset)
        {
            while (curOffset <= initialOffset)
            {
                char ch = text[curOffset++];
                outText.Append(ch);
                if (ch == '"')
                {
                    if (curOffset < text.Length && text[curOffset] == '"')
                        outText.Append(text[curOffset++]);
                    else
                        return true;
                }
            }
            return false;
        }
        bool ReadMultiLineComment(string text, ref int curOffset, ref int offset)
        {
            while (curOffset <= initialOffset)
            {
                char ch = text[curOffset++];
                --offset;
                if (ch == '*')
                    if (curOffset < text.Length && text[curOffset] == '/')
                    {
                        ++curOffset;
                        --offset;
                        return true;
                    }
            }
            return false;
        }

        void ApplyToken(Token token) { TrackCurrentFrameAndExpression(token); TrackCurrentContext(token); }
        void Init(string text, int offset)
        {
            if (offset < 0 || offset > text.Length)
                throw new ArgumentOutOfRangeException("offset", offset, GResources.GetResourceText(29450036) + ' ' + text.Length); //RC 29450036 : offset musí být mezi 0 a

            InitLexer(text);

            lexer.SkipAllComments = true;
            lineOffsets = new List<int>
            {
                0
            };
            for (int i = 0; i < text.Length; i++)
            {
                if (i == offset)
                    targetPosition = new Location(offset - lineOffsets[lineOffsets.Count - 1] + 1, lineOffsets.Count);
                if (text[i] == '\n')
                    lineOffsets.Add(i + 1);
                else if (text[i] == '\r')
                    if (i + 1 < text.Length && text[i + 1] != '\n')
                        lineOffsets.Add(i + 1);
            }
            if (offset == text.Length)
                targetPosition = new Location(offset - lineOffsets[lineOffsets.Count - 1] + 1, lineOffsets.Count);

            frame = new Frame();
            lastToken = ALFTokens.EOF;
        }
    }
}

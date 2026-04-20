//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrfExpressionFinder.cs                 </Name>
//    <Description> získání výrazu včetně kontextu dle umístění pozice          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-26                                                  </Created>
//  </FileHeader>

using System.IO;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Refactoring;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// získání výrazu včetně kontextu dle umístění pozice
    /// </summary>
    class GrfExpressionFinder : ALFExpressionFinder
    {
        /// <summary>
        /// inicializace lexeru
        /// </summary>
        /// <param name="text">text inicializace</param>
        protected override void InitLexer(string text)
        {
            lexer = ParserFactory.CreateLexer(SupportedLanguage.GRF, new StringReader(text));
        }

                /// <summary>
        /// prázdný konstruktor třídy
        /// </summary>
        public GrfExpressionFinder()
            :base()
        {
            tokens = new ALFTokens();
            tokens.Initialize();
        }
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="parseInformation"></param>
        public GrfExpressionFinder(ParseInformation parseInformation)
            : this()
        {
            SetInformation(parseInformation);
        }
    }
}

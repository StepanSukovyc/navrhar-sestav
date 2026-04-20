//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ILexer.cs                                </Name>
//    <Description> rozhraní lexeru                                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-08-02                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using Gordic.GFE.Parsers.Refactoring.Parser;
using Gordic.GFE.Parsers.Refactoring.Special;

namespace Gordic.GFE.Parsers.Refactoring.Lexer
{
    /// <summary>
    /// rozhraní lexeru
    /// </summary>
    public interface ILexer : IDisposable
    {
        /// <summary>
        /// chyby analýzy
        /// </summary>
        Errors Errors { get; }

        /// <summary>
        /// Aktuální klíč. 
        /// <seealso cref="Gordic.GFE.Parsers.Refactoring.Lexer.Token"/>
        /// </summary>
        Token Token { get; }

        /// <summary>
        /// Následující klíč (klíč <see cref="Token"/> se volá po <see cref="NextToken"/>).
        /// <seealso cref="Gordic.GFE.Parsers.Refactoring.Lexer.Token"/>
        /// </summary>
        Token LookAhead { get; }

        /// <summary>
        /// Speciální štítky komentáře TODO, HACK nebo UNDONE 
        /// které se nachází v lexeru a jsou uložené v <see cref="TagComments"/>.
        /// </summary>
        string[] SpecialCommentTags { get; set; }

        /// <summary>
        /// Indikuje stav, kdy lexer přeskakuje komentáře.
        /// </summary>
        bool SkipAllComments { get; set; }

        /// <summary>
        /// Podmíněná kompilace znaků.
        /// </summary>
        bool EvaluateConditionalCompilation { get; set; }

        /// <summary>
        /// Slovník speciálních kompilačních symbolů.
        /// </summary>
        IDictionary<string, object> ConditionalCompilationSymbols { get; }

        /// <summary>
        /// Nastavení speciálních podmínek kompialce. 
        /// </summary>
        /// <param name="symbols">
        /// <see cref="System.String"/> obsahuje symboly oddělené ';'.
        /// </param>
        void SetConditionalCompilationSymbols(string symbols);

        /// <summary>
        /// seznam načtených komentářů a obsahujících speciální klíčová slova.
        /// </summary>
        List<TagComment> TagComments { get; }

        /// <summary>
        /// hlídač speciálů
        /// </summary>
        SpecialTracker SpecialTracker { get; }

        /// <summary>
        /// počátek načtení
        /// </summary>
        void StartPeek();

        /// <summary>
        /// Získání nasledujícího klíče. 
        /// </summary>
        /// <returns>Objekt klíče <see cref="Token"/>.</returns>
        Token Peek();

        /// <summary>
        /// Načtení následujícího klíče a vrácení posuvníku zpět.
        /// </summary>
        /// <returns>Objekt <see cref="Token"/>.</returns>
        Token NextToken();

        /// <summary>
        /// Přeskočení aktuálního bloku.
        /// </summary>
        void SkipCurrentBlock(int targetToken);
    }
}

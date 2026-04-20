//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ParserFactory.cs                         </Name>
//    <Description> podporované jazyky                                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-08-02                                                  </Created>
//  </FileHeader>

using System.IO;
using Gordic.GFE.Parsers.Refactoring.Lexer;
using Gordic.General;

namespace Gordic.GFE.Parsers.Refactoring
{
    /// <summary>
    /// podporované jazyky
    /// </summary>
    public enum SupportedLanguage
    {
        /// <summary>
        /// grf formát
        /// </summary>
        GRF,
        /// <summary>
        /// grr formát
        /// </summary>
        GRR,
        /// <summary>
        /// rtf formát
        /// </summary>
        RTF,
        /// <summary>
        /// mse formát
        /// </summary>
        MSE,
        /// <summary>
        /// oxs formát
        /// </summary>
        OXS
    }

    /// <summary>
    /// Staticá pomocná třída pro analýzu lexerů a objektů
	/// </summary>
    public static class ParserFactory
    {
        /// <summary>
        /// vytvření lexeru
        /// </summary>
        /// <param name="language">jazyk</param>
        /// <param name="textReader">čtečka obsahu</param>
        /// <returns></returns>
        public static ILexer CreateLexer(SupportedLanguage language, TextReader textReader)
        {
            switch (language)
            {
                case SupportedLanguage.GRF:
                case SupportedLanguage.GRR:
                case SupportedLanguage.RTF:
                case SupportedLanguage.MSE:
                    return new ALFLexer(textReader);
            }
            throw new System.NotSupportedException(string.Format(GResources.GetResourceText(29450234) + " {0} " + GResources.GetResourceText(29450164), language)); //RC 29450234 : jazyk
        }

    }
}

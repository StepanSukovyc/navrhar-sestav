//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.OutputTextLineParser.cs                </Name>
//    <Description> Analyzuje výstupní text v podložce Output okna.             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System;
using System.Text.RegularExpressions;

namespace Gordic.GFE.WinClient.MessageView
{
    /// <summary>
    /// Analyzuje výstupní text v podložce Output okna.
    /// </summary>
    /// <remarks></remarks>
    static class OutputTextLineParser
    {
        /// <summary>
        /// Reference z kompilátoru.
        /// </summary>
        /// <param name="lineText">řádek pro analýzu.</param>
        /// <returns></returns>
        public static FileLineReference GetCSharpCompilerFileLineReference(string lineText)
        {
            if (lineText != null)
            {
                Match match = Regex.Match(lineText, @"\b(\w:[/\\].*?)\((\d+),(\d+)\)");
                if (match.Success)
                    try
                    {
                        int line = Convert.ToInt32(match.Groups[2].Value) - 1;
                        int col = Convert.ToInt32(match.Groups[3].Value) - 1;

                        return new FileLineReference(match.Groups[1].Value, line, col);
                    }
                    catch (FormatException) { }
                    catch (OverflowException) { }
            }

            return null;
        }

        /// <summary>
        /// Reference souboru.
        /// </summary>
        /// <param name="lineText">obsah řádku pro analýzu.</param>
        /// <returns></returns>
        public static FileLineReference GetFileLineReference(string lineText)
        {
            FileLineReference lineReference = GetCSharpCompilerFileLineReference(lineText);

            if (lineReference == null)
                lineReference = GetNUnitOutputFileLineReference(lineText, false);

            if (lineReference == null)
                lineReference = GetCppCompilerFileLineReference(lineText);

            return lineReference;
        }

        /// <summary>
        /// Reference souboru NUnit.
        /// </summary>
        /// <param name="lineText">obsah řádku pro analýzu.</param>
        /// <param name="multiline">Je víceřádkový.</param>
        /// <returns></returns>
        public static FileLineReference GetNUnitOutputFileLineReference(string lineText, bool multiline)
        {
            RegexOptions regexOptions = multiline ? RegexOptions.Multiline : RegexOptions.None;

            FileLineReference result = null;

            if (lineText != null)
            {
                Match match = Regex.Match(lineText, @"\sin\s(.*?):line\s(\d+)?\r?$", regexOptions);
                while (match.Success)
                {
                    try
                    {
                        int line = Convert.ToInt32(match.Groups[2].Value) - 1;
                        result = new FileLineReference(match.Groups[1].Value, line);
                    }
                    catch (FormatException) { }
                    catch (OverflowException) { }
                    match = match.NextMatch();
                }
            }

            return result;
        }

        /// <summary>
        /// Reference souboru c++ nebo VB.Net.
        /// </summary>
        /// <param name="lineText">obsah řádku pro analýzu.</param>
        /// <returns></returns>
        public static FileLineReference GetCppCompilerFileLineReference(string lineText)
        {
            if (lineText != null)
            {
                Match match = Regex.Match(lineText, @"\b(\w:[/\\].*?)\((\d+)\)");

                if (match.Success)
                    try
                    {
                        int line = Convert.ToInt32(match.Groups[2].Value) - 1;

                        return new FileLineReference(match.Groups[1].Value.Trim(), line);
                    }
                    catch (FormatException) { }
                    catch (OverflowException) { }
            }

            return null;
        }
    }
}

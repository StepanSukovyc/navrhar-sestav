//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.FileUtility.Minimum.cs                   </Name>
//    <Description> Minimální verze FileUtility.                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Text;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Minimální verze FileUtility. 
    /// </summary>
    static partial class FileUtility
    {
        /// <summary>
        /// Normalizovaná verze fileName.
        /// Lomítka jsou nahrazeny zpětnýma,
        /// "." a ".." jsou 'zhodnocené'.
        /// </summary>
        /// <param name="fileName">Cesta k normalizací</param>
        public static string NormalizePath(string fileName)
        {
            if (string.IsNullOrEmpty(fileName)) return fileName;

            int i;

            bool isWeb = false;
            for (i = 0; i < fileName.Length; i++)
            {
                if (fileName[i] == '/' || fileName[i] == '\\')
                    break;
                if (fileName[i] == ':')
                {
                    if (i > 1)
                        isWeb = true;
                    break;
                }
            }

            char outputSeparator = isWeb ? '/' : System.IO.Path.DirectorySeparatorChar;

            StringBuilder result = new StringBuilder();
            if (isWeb == false && fileName.StartsWith(@"\\") || fileName.StartsWith("//"))
            {
                i = 2;
                result.Append(outputSeparator);
            }
            else
                i = 0;
            int segmentStartPos = i;
            for (; i <= fileName.Length; i++)
            {
                if (i == fileName.Length || fileName[i] == '/' || fileName[i] == '\\')
                {
                    int segmentLength = i - segmentStartPos;
                    switch (segmentLength)
                    {
                        case 0:
                            // ignorujeme prázdný segment
                            if (isWeb || (i == 0 && Environment.OSVersion.Platform == PlatformID.Unix))
                                result.Append(outputSeparator);
                            break;
                        case 1:
                            // ignorace segmentu /./
                            if (fileName[segmentStartPos] != '.')
                            {
                                if (result.Length > 0) result.Append(outputSeparator);
                                result.Append(fileName[segmentStartPos]);
                            }
                            break;
                        case 2:
                            if (fileName[segmentStartPos] == '.' && fileName[segmentStartPos + 1] == '.')
                            {
                                // odstranění předchozího segmentu
                                int j;
                                for (j = result.Length - 1; j >= 0 && result[j] != outputSeparator; j--) ;
                                if (j > 0)
                                    result.Length = j;
                                break;
                            }
                            else
                                // přidání normálního segmentu
                                goto default;
                        default:
                            if (result.Length > 0) result.Append(outputSeparator);
                            result.Append(fileName, segmentStartPos, segmentLength);
                            break;
                    }
                    segmentStartPos = i + 1; // pamatujeme si startovací pozici dalšího segmentu
                }
            }
            if (isWeb == false)
            {
                if (result.Length > 0 && result[result.Length - 1] == outputSeparator)
                    result.Length -= 1;
                if (result.Length == 2 && result[1] == ':')
                    result.Append(outputSeparator);
            }
            return result.ToString();
        }

        /// <summary>
        /// Porovnání dvou názvu souborů
        /// </summary>
        /// <param name="fileName1">Název prvního souboru</param>
        /// <param name="fileName2">Název druhého souboru</param>
        /// <returns></returns>
        public static bool IsEqualFileName(string fileName1, string fileName2)
        {
            return string.Equals(NormalizePath(fileName1),
                                 NormalizePath(fileName2),
                                 StringComparison.OrdinalIgnoreCase);
        }
    }
}

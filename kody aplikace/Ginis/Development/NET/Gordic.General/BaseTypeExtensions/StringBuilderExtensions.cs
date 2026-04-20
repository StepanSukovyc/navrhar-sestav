//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.StringBuilderExtensions.cs   </Name>
//    <Description> Rozšížení interního typu StringBuilder o nové funkce        </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-03-22                                                  </Created>
//  </FileHeader>



using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Rozšížení interního typu StringBuilder o nové funkce
    /// </summary>
    public static class StringBuilderExtensions
    {
        /// <summary>
        /// Otestuje konec textu obsaženého ve stringBuilderu aniž by se celý text musel převádět na string
        /// </summary>
        /// <param name="sb"></param>
        /// <param name="test"></param>
        /// <returns></returns>
        public static bool EndsWith(this StringBuilder sb, string test)
        {
            return EndsWith(sb, test, StringComparison.CurrentCulture);
        }

        /// <summary>
        /// Otestuje konec textu obsaženého ve stringBuilderu aniž by se celý text musel převádět na string
        /// </summary>
        /// <param name="sb"></param>
        /// <param name="test"></param>
        /// <param name="comparison"></param>
        /// <returns></returns>
        public static bool EndsWith(this StringBuilder sb, string test, StringComparison comparison)
        {
            if (sb.Length < test.Length)
                return false;

            string end = sb.ToString(sb.Length - test.Length, test.Length);
            return end.Equals(test, comparison);
        }

        /// <summary>
        /// Z textu obsaženého ve StringBuilder odřízne z prava všechny WhiteSpace
        /// </summary>
        /// <param name="sb"></param>
        /// <returns></returns>
        public static StringBuilder TrimEnd(this StringBuilder sb)
        {
            int i = sb.Length - 1;
            for (; i > 0; i--)
            {
                if (!char.IsWhiteSpace(sb[i]))
                    break;
            }
            sb.Length = i + 1;
            return sb;
        }
        /// <summary>
        /// Z textu obsaženého ve StringBuilder odřízne z prava zadaný počet znaků
        /// </summary>
        /// <param name="sb"></param>
        /// <param name="charCount">Počet znaků, které se mají zprava odstranit - pokud je počet znaků pro odstranění větší jak délka, potom se vyhlásí chyba ArgumentException</param>
        /// <returns></returns>
        /// <exception cref="ArgumentException">Zadaný počet znaků pro odebrání z konce textu je větší jak délka textu obsaženého ve StringBuilder</exception>
        public static StringBuilder RemoveFromEnd(this StringBuilder sb, int charCount)
        {
            if (sb.Length < charCount)
                throw new ArgumentException("Zadaný počet znaků pro odebrání z konce textu je větší jak délka textu obsaženého ve StringBuilder");
            sb.Length = sb.Length - charCount;
            return sb;
        }

        /// <summary>
        /// Z textu obsaženého ve StringBuilder odřízne z prava znaky tak, aby výsledný text obsahovat zadaný počet znaků
        /// Ponechá zadaný počet znaků
        /// </summary>
        /// <param name="sb"></param>
        /// <param name="charCount">Počet znaků, které se mají zleva ponechat - pokud je zadáno větší číslo, tak se to nebude pokládat za chybu, pouze výsledný text nebude dlouhý podle požadavku</param>
        /// <returns></returns>
        public static StringBuilder Left(this StringBuilder sb, int charCount)
        {
            if (sb.Length > charCount)
                sb.Length = charCount;
            return sb;
        }

    }
}

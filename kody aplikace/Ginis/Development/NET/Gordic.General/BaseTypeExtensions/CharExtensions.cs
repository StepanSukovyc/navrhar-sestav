//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.CharExtensions.cs                            </Name>
//    <Description> Rozšíření funkcí pro char                                   </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-01-17                                                  </Created>
//  </FileHeader>


using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Rozšíření funkcí pro char
    /// </summary>
    public static class CharExtensions
    {
        /// <summary>
        /// Převede zadaný znak na jeho unicodový HEX code
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string ToUnicodeHexCode(this char value)
        {
            StringBuilder vysledek = new StringBuilder();
            string str = new string( value, 1 );
            TextElementEnumerator teEnum = StringInfo.GetTextElementEnumerator(str);
            while (teEnum.MoveNext())
            {
                vysledek.Append( ShowHexValues((string)(teEnum.Current)));
            }
            return vysledek.ToString();
        }
        private static string ShowHexValues(string s)
        {
            string hexString = "";
            foreach (var ch in s)
                hexString += $"{(ushort)ch:X4} ";

            return hexString;
        }
    }
}

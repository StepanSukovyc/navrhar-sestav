//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GHashSha256Utils.cs                          </Name>
//    <Description> Pomocné funkce pro práci s SHA256                           </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2021                            </Copyright>
//    <Created>     2021-05-31                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Pomocné funkce pro práci s SHA256
    /// </summary>
    public static class GHashSha256Utils
    {
        /// <summary>
        /// Výpočet kontrolního součtu zadaného textu - převod je přes UTF8
        /// </summary>
        /// <param name="text">string ze kterých se součet počítá</param>
        /// <returns>řetězec HEXADECIMAL s výsledkem výpočtu</returns>
        public static string ComputeToHexa(string text)
        {
            byte[] hash = ComputeToBytes(Encoding.UTF8.GetBytes(text));
            return BytesToHexaString(hash);
        }

        /// <summary>
        /// Výpočet kontrolního součtu
        /// </summary>
        /// <param name="data2hash">data ze kterých se součet počítá</param>
        /// <returns>řetězec HEXADECIMAL s výsledkem výpočtu</returns>
        public static string ComputeToHexa(byte[] data2hash)
        {
            byte[] hash = ComputeToBytes(data2hash);
            return BytesToHexaString(hash);
        }

        /// <summary>
        /// Výpočet kontrolního součtu
        /// </summary>
        /// <param name="stream">strem ze kterého se součet počítá</param>
        /// <returns>řetězec HEXADECIMAL s výsledkem výpočtu</returns>
        public static string ComputeToHexa(Stream stream)
        {
            stream.Seek(0, SeekOrigin.Begin);
            byte[] buffer = new byte[stream.Length];
            stream.Read(buffer, 0, (int)stream.Length);
            return ComputeToHexa(buffer);
        }

        /// <summary>
        /// Výpočet kontrolního součtu
        /// </summary>
        /// <param name="data2hash">data ze kterých se součet počítá</param>
        /// <returns>pole BYTE s výsledkem výpočtu</returns>
        public static byte[] ComputeToBytes(byte[] data2hash)
        {
            System.Security.Cryptography.SHA256 sha256 = new System.Security.Cryptography.SHA256Managed();
            byte[] hashBuffer = sha256.ComputeHash(data2hash);
            return (hashBuffer);
        }


        /// <summary>
        /// Funkce pro převod pole bytů na hexa string, kde každému bytu odpovídají přesně dva znaky podle HEX hodnoty bytu
        /// </summary>
        /// <param name="Buffer">Vstupní pole bytů</param>
        /// <returns>String obsahující odpovídající HEX hodnotu pole zadaných bytů.</returns>
        public static string BytesToHexaString(byte[] Buffer)
        {
            string sHexa = String.Empty;
            foreach (byte letter in Buffer)
            {
                int value = Convert.ToInt32(letter);
                sHexa = sHexa + String.Format("{0:X2}", value);
            }
            return sHexa;
        }


    }
}

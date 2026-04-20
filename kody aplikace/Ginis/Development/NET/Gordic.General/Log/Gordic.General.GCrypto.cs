//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GCrypto.cs                      </Name>
//    <Description> Tøída pro šifrování/dešifrování logovacích zpráv            </Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                  </Copyright>
//    <Created>     2008-12-03                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.ComponentModel;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.IO;
using NLog;

namespace Gordic.General
{
    /// <summary>
    /// Tøída pro šifrování/dešifrování logovacích zpráv
    /// </summary>
    [System.Security.SecuritySafeCritical]
    public class GCrypto : IGObject //[System.Security.SecurityCritical]
    {


        /// <summary>
        /// Zašifruje text
        /// </summary>
        /// <param name="text">text, který má být zašifrován</param>
        /// <param name="key">klíè</param>
        /// <param name="inputVector">vstupní vektor</param>
        /// <returns>Zašifrovaný text</returns>
        public static string EncryptText(string text, byte[] key, byte[] inputVector)
        {   // Thread Safe - snad ano, díky využívání lokálních instancí a parametrù
            string l_sOutputString = null;
            // poøadí using dle https://docs.microsoft.com/en-us/dotnet/api/system.security.cryptography.cryptostream?view=netframework-4.8
            using (var l_oRijndaelAlg = Rijndael.Create())
            { // default KeySize 256bit
                var l_oEncryptor = l_oRijndaelAlg.CreateEncryptor(key, inputVector);
                using (var l_oMemoryStream = new MemoryStream())
                {
                    using (var l_oCryptoStream = new CryptoStream(
                        l_oMemoryStream,
                        l_oEncryptor,
                        CryptoStreamMode.Write))
                    {
                        var l_oUtf8Encoding = new UTF8Encoding();   // UTF8
                        byte[] l_anData = l_oUtf8Encoding.GetBytes(text);

                        l_oCryptoStream.Write(l_anData, 0, l_anData.Length);
                        l_oCryptoStream.Flush();
                        l_oCryptoStream.FlushFinalBlock();

                        l_oMemoryStream.Seek(0, SeekOrigin.Begin);

                        byte[] l_nOutputArray = l_oMemoryStream.ToArray();
                        l_sOutputString = Convert.ToBase64String(l_nOutputArray);

                        //l_oRijndaelAlg.Clear(); // aby nezùstalo v pamìti - ponecháno pro GC
                    }
                }
            }

            return l_sOutputString;
        }

        /// <summary>
        /// Rozkóduje text
        /// </summary>
        /// <param name="text">text, který má být rozkódován</param>
        /// <param name="key">klíè</param>
        /// <param name="inputVector">vstupní vektor</param>
        /// <returns>Rozkódovaný text</returns>
        public static string DecryptText(string text, byte[] key, byte[] inputVector)
        {   // Thread Safe - snad ano, díky využívání lokálních instancí a parametrù
            string l_sOutputString = null;
            byte[] l_nInputArray = Convert.FromBase64String(text);
            
            // poøadí using dle https://docs.microsoft.com/en-us/dotnet/api/system.security.cryptography.cryptostream?view=netframework-4.8
            using (var l_oRijndaelAlg = Rijndael.Create())    // default KeySize 256bit
            {
                var l_oDecryptor = l_oRijndaelAlg.CreateDecryptor(key, inputVector);
                using (var l_oMemoryStream = new MemoryStream(l_nInputArray))
                {
                    using (var l_oCryptoStream = new CryptoStream(
                        l_oMemoryStream,
                        l_oDecryptor,
                        CryptoStreamMode.Read))
                    {
                        using (var l_oReader = new StreamReader(l_oCryptoStream)) // default UTF8
                        {
                            l_sOutputString = l_oReader.ReadToEnd();
                        }

                        //l_oRijndaelAlg.Clear(); // aby nezùstalo v pamìti - ponecháno pro GC
                    }
                }
            }

            return l_sOutputString;
        }


        /// <summary>
        /// Vygeneruje klíè a vstupní vektor
        /// </summary>
        public static void CreateKeyAndVector(System.Security.SecureString salt, out byte[] key, out byte[] inputVector)
        {   // Thread Safe - snad ano, díky využívání lokálních instancí a parametrù
            // vygenerovaný klíè a vstupní vektor
            key = new byte[32] { 101, 2, 110, 121, 187, 28, 84, 83, 197, 10, 10, 34, 247, 173, 107, 47, 89, 22, 104, 230, 67, 142, 16, 42, 14, 192, 85, 253, 143, 49, 237, 134 };
            inputVector = new byte[16] { 184, 197, 11, 102, 169, 178, 195, 226, 11, 224, 253, 85, 70, 78, 202, 110 };

            byte[] l_abAsciiLic = new byte[4] { 88, 88, 88, 88 };   // XXXX
            if (salt != null && salt.Length == 4)
            {
                ASCIIEncoding l_oAsciiEncoding = new ASCIIEncoding();
                for (int i = 0; i < 4; i++)
                    l_abAsciiLic[i] = l_oAsciiEncoding.GetBytes(new char[] { salt.ToString()[i] })[0];   // zde byla pøedtím licence lic[i]
            }

            // vloží licenci do vygenerovaného klíèe (na pozici LicIndex)
            int l_nLicIndex = 9;
            for (int i = 0; i < 4; i++)
                key[l_nLicIndex++] = l_abAsciiLic[i];
        }

        private static readonly string SecureTextMark = "~^~";

        /// <summary>
        /// Vrací zakryptovaný text
        /// </summary>
        /// <param name="message">Vstupní text v bìžné podobì</param>
        /// <returns>Zakryptovaný text</returns>
        /// 
        public static string EncryptedMessage(string message)
        {   // Thread Safe - snad ano, díky využívání lokálních instancí a parametrù
            byte[] l_anKey;
            byte[] l_anInputVector;
            using (var l_oSaltString = new System.Security.SecureString())
            {
                l_oSaltString.AppendChar('h');
                l_oSaltString.AppendChar('a');
                l_oSaltString.AppendChar('u');
                l_oSaltString.AppendChar('s');
                GCrypto.CreateKeyAndVector(l_oSaltString, out l_anKey, out l_anInputVector);
            }

            string l_sEncryptedMessage = GCrypto.EncryptText(message, l_anKey, l_anInputVector);
            return SecureTextMark + l_sEncryptedMessage + SecureTextMark;
        }

    }
}

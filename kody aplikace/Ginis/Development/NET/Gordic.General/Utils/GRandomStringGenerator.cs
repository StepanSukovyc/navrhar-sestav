//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GRandomStringGenerator.cs                    </Name>
//    <Description> podpora práce s náhodnými stringy (tokeny, atp)             </Description>
//    <Author>      maliger                                                     </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-10-31                                                  </Created>
//  </FileHeader>

using System;
using System.Text;

namespace Gordic.General
{

    /// <summary>podpora práce s náhodnými stringy (tokeny, atp)</summary>
    public static class GRandomStringGenerator
    {
        /// <summary>
        /// Generates a random string of specified length with optional prefix
        /// </summary>
        /// <param name="len">Total length of the generated string including prefix</param>
        /// <param name="prefix">Optional prefix for the generated string</param>
        /// <param name="acceptFunc">Optional function to validate the generated string</param>
        /// <param name="alphabet">Optional custom alphabet for the generated string</param>
        public static string Generate(int len, string prefix = "", Func<string, bool> acceptFunc = null, string alphabet = null)
        {
            int size = len - prefix.Length;
            if (size <= 0) return prefix;
            char[] chars = (alphabet ?? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_").ToCharArray();
            byte[] buffer = new byte[size];
            using (var rng = System.Security.Cryptography.RandomNumberGenerator.Create())
            {
                while (true)
                {
                    rng.GetBytes(buffer);
                    var sb = new StringBuilder(size);
                    foreach (byte b in buffer) sb.Append(chars[b % chars.Length]);
                    var result = prefix + sb.ToString();
                    if (acceptFunc == null || acceptFunc(result)) return result;
                }
            }
        }
        //public static string RandomStringGenerator_old(int len, string prefix = "", Func<string, bool> acceptFunc = null)
        //{
        //    int size = len - prefix.Length;
        //    char[] chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_".ToCharArray();
        //    byte[] array = new byte[size];
        //    System.Security.Cryptography.RNGCryptoServiceProvider rNGCryptoServiceProvider = null;
        //    try
        //    {
        //        rNGCryptoServiceProvider = new System.Security.Cryptography.RNGCryptoServiceProvider();
        //    again:
        //        rNGCryptoServiceProvider.GetBytes(array);
        //        StringBuilder result = new StringBuilder(size);
        //        foreach (byte b in array) result.Append(chars[b % (chars.Length)]);
        //        var res = prefix + result.ToString();
        //        if (acceptFunc != null && acceptFunc(res) == false) goto again;
        //        return res;
        //    }
        //    finally
        //    {
        //        rNGCryptoServiceProvider?.Dispose();
        //    }
        //}


    }

}


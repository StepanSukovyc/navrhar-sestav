//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.SecureStringExtensions.cs                    </Name>
//    <Description> Rozšíření základního typu SecureString o nové funkce        </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-03-08                                                  </Created>
//  </FileHeader>



using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Rozšíření základního typu SecureString o nové funkce
    /// </summary>
    public static class SecureStringExtensions
    {
        /// <summary>
        /// Převede SecureString na string 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [System.Security.SecuritySafeCritical]
        public static string ConvertSecureStringToString(this SecureString data)
        {
            if (data == null)
                return null;

            var pointer = IntPtr.Zero;
            try
            {
                pointer = Marshal.SecureStringToGlobalAllocUnicode(data);
                return Marshal.PtrToStringUni(pointer);
            }
            finally
            {
                Marshal.ZeroFreeGlobalAllocUnicode(pointer);
            }
        }

        /// <summary>
        /// Převede SecureString na hash hexa string 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [System.Security.SecuritySafeCritical]
        public static string ConvertSecureStringToHashHexaString(this SecureString data)
        {
            if (data == null)
                return null;

            var pointer = IntPtr.Zero;
            try
            {
                pointer = Marshal.SecureStringToGlobalAllocUnicode(data);
                return GHashSha256Utils.ComputeToHexa( Marshal.PtrToStringUni(pointer));
            }
            finally
            {
                Marshal.ZeroFreeGlobalAllocUnicode(pointer);
            }
        }

        ///// <summary>
        ///// Připojí do secure string zadaný text na konec
        ///// </summary>
        ///// <param name="secure"></param>
        ///// <param name="data"></param>
        ///// <returns></returns>
        //public static SecureString AppendString(this SecureString secure, string data)
        //{
        //    foreach (var character in data.ToCharArray())
        //        secure.AppendChar(character);
        //    return secure;
        //}
    }
}

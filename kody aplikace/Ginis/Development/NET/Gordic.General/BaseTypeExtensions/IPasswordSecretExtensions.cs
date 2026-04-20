//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IPasswordSecretExtensions.cs                 </Name>
//    <Description> Doplnění PasswordSecret o získání HASH                      </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-03-11                                                  </Created>
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
    /// Doplnění PasswordSecret o získání HASH, funkce  IsNullOrEmpty, IsNullOrWhiteSpace, Cover
    /// </summary>

    public static class IPasswordSecretExtensions
    {
        /// <summary>
        /// Převede SecureString na hash hexa string 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [System.Security.SecuritySafeCritical]
        public static string ConvertSecureStringToHashHexaString(this IPasswordSecret data)
        {
            if (data == null || !data.Exists)
                return null;
            return GHashSha256Utils.ComputeToHexa(data.Secret);
        }

        /// <summary>
        /// Test zda je null nebo nebylo nastaveno nebo string má hodnotu null, nebo je prázdný 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [System.Security.SecuritySafeCritical]
        public static bool IsNullOrEmpty(this IPasswordSecret data)
        {
            if (data == null || !data.Exists)
                return true;
            return data.Secret.IsNullOrEmpty();
        }

        /// <summary>
        /// Test zda je null nebo nebylo nastaveno nebo string má hodnotu null, nebo je prázdný nebo obsahu je pouze White znaky
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [System.Security.SecuritySafeCritical]
        public static bool IsNullOrWhiteSpace(this IPasswordSecret data)
        {
            if (data == null || !data.Exists)
                return true;
            return data.Secret.IsNullOrWhiteSpace();
        }

        /// <summary>zakódování tajemství - např. pro uložení tajemství do XML</summary>
        /// <param name="data"></param>
        /// <returns>zakódovaný text</returns>
        [SecurityCritical]
        public static string Cover(this IPasswordSecret data)
        {
            if (data == null || !data.Exists)
                return null;
            return GCover.Cover(data.Secret);
        }

    }
}

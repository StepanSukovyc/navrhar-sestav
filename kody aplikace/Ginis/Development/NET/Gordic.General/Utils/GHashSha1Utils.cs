//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GHashSha1Utils.cs                            </Name>
//    <Description> Pomocná utilita převede zadaný string na UFT8 pole byte a vypočítá SHA1 a to vrátí jako HEX string</Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-06-23                                                  </Created>
//  </FileHeader>

namespace Gordic.General
{
    /// <summary>
    /// Pomocná utilita pro práci se SHA1
    /// </summary>
    public static class GHashSha1Utils
    {
        /// <summary>
        /// Pomocná utilita převede zadaný string na UFT8 pole byte a vypočítá SHA1 a to vrátí jako HEX string
        /// </summary>
        /// <param name="a_text">Text pro který se má vypočítat SHA1</param>
        /// <returns>String obsahující HEX podobu vypočítaného SHA1</returns>
        public static string StringToSha1HexString(string a_text)
        {
            var sha1 = System.Security.Cryptography.SHA1.Create();
            var l_abHash = sha1.ComputeHash(System.Text.Encoding.UTF8.GetBytes(a_text));
            return l_abHash?.ToHexString();
        }

    }
}

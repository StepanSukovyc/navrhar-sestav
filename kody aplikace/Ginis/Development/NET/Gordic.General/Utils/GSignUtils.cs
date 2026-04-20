//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GSignUtils.cs                                </Name>
//    <Description> Pomůcky pro práci s podpisy                                 </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-05-20                                                  </Created>
//  </FileHeader>


using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.Pkcs;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{

    /// <summary>
    /// Pomůcky pro práci s podpisy
    /// </summary>
    public static class GSignUtils
    {
        /// <summary>
        /// Pro externí podpis souboru vrátí požadovanou popisnou položku certifikátu - Požadovaná položka je určena na základě stringového enum - ten je převzat ze staršího PowerBuilder a nebo z Gordic.Install.Tool.exe
        /// </summary>
        /// <param name="a_in_file">Podepsaný soubor</param>
        /// <param name="a_sign_file">Soubor s externím podpisem</param>
        /// <param name="a_Thumbprint">Otisk certifikátu, který se hledá</param>
        /// <returns>true pokud existuje podpis s hledaným otiskem</returns>
        static public bool CheckSignThumbprint(string a_in_file, string a_sign_file, string a_Thumbprint)
        {
            byte[] v_tst_content = null;
            if (!String.IsNullOrWhiteSpace(a_in_file))
                v_tst_content = GFileUtils.FileToByteArray(a_in_file);
            byte[] v_p7s_content = GFileUtils.FileToByteArray(a_sign_file);
            bool v_vysledek = CheckSignThumbprint(v_tst_content, v_p7s_content, a_Thumbprint);
            return v_vysledek;
        }

        /// <summary>
        /// Pro externí podpis souboru vrátí požadovanou popisnou položku certifikátu - Požadovaná položka je určena na základě stringového enum - ten je převzat ze staršího PowerBuilder a nebo z Gordic.Install.Tool.exe
        /// </summary>
        /// <param name="v_tst_content">Buffer s podepsaným souborem</param>
        /// <param name="v_p7s_content">Buffer s externím podpisem</param>
        /// <param name="a_Thumbprint">Otisk certifikátu, který se hledá</param>
        /// <returns>true pokud existuje podpis s hledaným otiskem</returns>
        static public bool CheckSignThumbprint(byte[] v_tst_content, byte[] v_p7s_content, string a_Thumbprint)
        {
            bool v_vysledek = false;

            SignedCms v_Cms = null;
            try
            {
                if (v_tst_content == null)
                {
                    v_Cms = new SignedCms();
                }
                else
                {
                    ContentInfo contentInfo = new ContentInfo(v_tst_content);
                    v_Cms = new SignedCms(contentInfo, true);
                }
                v_Cms.Decode(v_p7s_content);
                foreach (var signer in v_Cms.SignerInfos)
                {
                    X509Certificate2 MSCert = signer.Certificate;
                    if (MSCert.Thumbprint.Equals(a_Thumbprint, StringComparison.InvariantCultureIgnoreCase))
                        v_vysledek = true;
                }
            }
            catch
            {
                v_vysledek = false;
            }
            return (v_vysledek);
        }

        /// <summary>
        /// Converts an X509Certificate2 to a PEM-encoded string.
        /// </summary>
        /// <param name="certificate">The X509Certificate2 instance.</param>
        /// <returns>PEM-encoded string of the certificate.</returns>
        public static string ToPem(System.Security.Cryptography.X509Certificates.X509Certificate2 certificate)
        {
            var builder = new StringBuilder();
            builder.AppendLine("-----BEGIN CERTIFICATE-----");
            builder.AppendLine(Convert.ToBase64String(certificate.RawData, Base64FormattingOptions.InsertLineBreaks));
            builder.AppendLine("-----END CERTIFICATE-----");
            return builder.ToString();
        }
        /// <summary>
        /// Converts a PEM-encoded string to an X509Certificate2 instance.
        /// </summary>
        /// <param name="pem">PEM-encoded string of the certificate.</param>
        /// <returns>X509Certificate2 instance.</returns>
        public static System.Security.Cryptography.X509Certificates.X509Certificate2 FromPem(string pem)
        {
            var base64 = pem.Replace("-----BEGIN CERTIFICATE-----", "")
                            .Replace("-----END CERTIFICATE-----", "")
                            .Replace("\n", "")
                            .Replace("\r", "");
            var rawData = Convert.FromBase64String(base64);
            return new System.Security.Cryptography.X509Certificates.X509Certificate2(rawData);
        }
    }
}

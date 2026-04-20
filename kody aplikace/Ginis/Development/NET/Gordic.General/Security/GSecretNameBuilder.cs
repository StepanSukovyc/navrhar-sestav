//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GSecretNameBuilder.cs                        </Name>
//    <Description> Secret name builder                                         </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-11-29                                                  </Created>
//  </FileHeader>

namespace Gordic.General
{
    /// <summary>
    /// Secret name builder
    /// </summary>
    public static class GSecretNameBuilder
    {
        const char DIRECT_VALUE = '=';

        /// <summary>
        /// ContainsDirectValue - special IDS2 per-request credentials
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static bool ContainsDirectPath(string path) =>
            path.Contains(DIRECT_VALUE.ToString());

        /// <summary>
        /// GetDirectValue
        /// </summary>
        /// <param name="certificateSecretPath"></param>
        /// <returns></returns>
        public static string GetDirectPath(string certificateSecretPath) =>
            certificateSecretPath.Split(DIRECT_VALUE)[1];

        /// <summary>
        /// Is secret path handled by module?
        /// </summary>
        public interface IGSecretPathMatcher
        {
            /// <summary>
            /// Is handled by module?
            /// </summary>
            /// <param name="splitPath"></param>
            /// <returns></returns>
            bool IsHandledByPath(string[] splitPath);

            /// <summary>
            /// Is this vault handling secrets? (DO NOT RECURSE)
            /// </summary>
            /// <param name="path"></param>
            /// <param name="vaultId"></param>
            /// <returns></returns>
            bool IsRecursiveCredential(string path, string vaultId);
        }

        /// <summary>
        /// DatabaseParams
        /// </summary>
        public sealed class DatabaseParams : IGSecretPathMatcher
        {
            static readonly IGLogger LOG = GLogManager.CurrentClassLogger();

            bool IGSecretPathMatcher.IsRecursiveCredential(string path, string vaultId) => false;

            internal static bool IsDbParameterNameInvalid(string parameterName)
                => (parameterName = parameterName.NotNullTrimmed()) == string.Empty || parameterName.Length > 15;

            /// <summary>
            /// gin_gms_mailbox
            /// </summary>
            /// <param name="splitPath"></param>
            /// <returns></returns>
            bool IGSecretPathMatcher.IsHandledByPath(string[] splitPath)
            {
                var lengthOK = splitPath.Length == 1;
                var toLowerOK = splitPath[0].ToLower() == splitPath[0];
                // splitPath[0].Contains("_") && // rozhodnnuti J.Cech, 30.11.2022 - composite by mnel vyresit
                var dbParameterNameValid = !IsDbParameterNameInvalid(splitPath[0]);

                var result = lengthOK && toLowerOK && dbParameterNameValid;
                LOG.Trace("IsHandledByPath(lengthOK: {lengthOK}, toLowerOK: {toLowerOK}, dbParameterNameValid: {dbParameterNameValid}) => {result}",
                    lengthOK,
                    toLowerOK,
                    dbParameterNameValid,
                    result
                );

                return result;
            }
        }

        /// <summary>
        /// ELE
        /// </summary>
        public sealed class ELE : IGSecretPathMatcher
        {
            const string Prefix = "Ele";
            /// <summary>
            /// Build ELE.Server secret path
            /// </summary>
            /// <returns></returns>
            public static string Server(string server_name) =>
                $"{Prefix}.Server.{server_name}";

            /// <summary>
            /// Build ELE.Mirror secret path
            /// </summary>
            /// <returns></returns>
            public static string Mirror(string server_name) =>
                $"{Prefix}.Mirror.{server_name}";

            bool IGSecretPathMatcher.IsRecursiveCredential(string path, string vaultId) => false;

            bool IGSecretPathMatcher.IsHandledByPath(string[] splitPath) =>
                splitPath.Length >= 3 && splitPath[0] == Prefix;
        }

        /// <summary>
        /// Mailbox
        /// </summary>
        public sealed class Mailbox : IGSecretPathMatcher
        {
            const string Prefix = "Mailbox";
            /// <summary>
            /// Build Mailbox.Server secret path
            /// </summary>
            /// <returns></returns>
            public static string Server(string mailbox) =>
                $"{Prefix}.Server.{mailbox}";

            /// <summary>
            /// Build Mailbox.Certificate secret path
            /// </summary>
            /// <param name="mailbox"></param>
            /// <param name="thumbprint"></param>
            /// <returns></returns>
            public static string Certificate(string mailbox, string thumbprint = "") =>
                string.IsNullOrEmpty(thumbprint)
                    ? $"{Prefix}.Certificate.{mailbox}"
                    : $"{Prefix}.Certificate.{mailbox}{DIRECT_VALUE}{thumbprint}";

            /// <summary>
            /// Build Mailbox.CertificateEpa secret path
            /// </summary>
            /// <returns></returns>
            public static string CertificateEpa(string ixsEpa) =>
                $"{Prefix}.CertificateEpa.{ixsEpa}";

            /// <summary>
            /// Build Mailbox.Smtp secret path
            /// </summary>
            /// <returns></returns>
            public static string Smtp(string mailbox) =>
                $"{Prefix}.Smtp.{mailbox}";

            /// <summary>
            /// Build Mailbox.SmtpEpa secret path
            /// </summary>
            /// <returns></returns>
            public static string SmtpEpa(string ixsEpa) =>
                $"{Prefix}.SmtpEpa.{ixsEpa}";

            bool IGSecretPathMatcher.IsRecursiveCredential(string path, string vaultId) => false;

            bool IGSecretPathMatcher.IsHandledByPath(string[] splitPath) =>
                splitPath.Length >= 3 && splitPath[0] == Prefix;
        }


        /// <summary>
        /// ZUD
        /// </summary>
        public sealed class ZUD : IGSecretPathMatcher
        {
            const string Prefix = "Zud";

            bool IGSecretPathMatcher.IsRecursiveCredential(string path, string vaultId) => false;

            /// <summary>
            /// Build ZUD secret path
            /// </summary>
            /// <returns></returns>
            public static string UdaAkuParameter(GString id_uda, GString typ_aku, GInt32 por_aku, GString param_uda) =>
                $"{Prefix}.{id_uda.BaseValueTrimmed}.{typ_aku.BaseValueTrimmed}.{por_aku.BaseValue}.{param_uda.BaseValueTrimmed}";

            // Zud.ade_uda_nackurl.ade_aku_nackurl.1.ProxyHeslo
            bool IGSecretPathMatcher.IsHandledByPath(string[] splitPath) =>
                splitPath.Length == 5 && splitPath[0] == Prefix;
        }

        /// <summary>
        /// OAuth
        /// </summary>
        public sealed class OAuth : IGSecretPathMatcher
        {
            /// <summary>
            /// OAuth
            /// </summary>
            const string Prefix = "OAuth";

            /// <summary>
            /// ClientSecret OAuth secret path
            /// </summary>
            /// <param name="ixs_oap"></param>
            /// <returns></returns>
            public static string ClientSecret(string ixs_oap) =>
                $"{Prefix}.ClientSecret.{ixs_oap}";

            bool IGSecretPathMatcher.IsRecursiveCredential(string path, string vaultId)
            {
                var split = path.Split(new[] { '.' });
                if (split.Length == 0)
                {
                    return false;
                }

                return split.Length >= 3 && vaultId == split[2];
            }

            bool IGSecretPathMatcher.IsHandledByPath(string[] splitPath) =>
                splitPath.Length == 3 &&
                splitPath[0] == Prefix;
        }

        /// <summary>
        /// LangAI
        /// </summary>
        public sealed class LangAI : IGSecretPathMatcher
        {
            /// <summary>
            /// LangAI
            /// </summary>
            const string Prefix = "LangAI";

            /// <summary>
            /// Middle subpath for ginslps.psw Subscription secret
            /// in Prefix.MiddleSubpath.ixs_lps
            /// </summary>
            public const string SubpathSubscription = "Subscription";

            /// <summary>
            /// Middle subpath for ginsldz.psw Datasource secret
            /// in Prefix.MiddleSubpath.ixs_ldz
            /// </summary>
            public const string SubpathRagDataSource = "RagDataSource";

            /// <summary>
            /// Vault path for ginslps.psw
            /// </summary>
            /// <param name="ixs_lps"></param>
            /// <returns></returns>
            public static string SubscriptionSecret(string ixs_lps) => $"{Prefix}.{SubpathSubscription}.{ixs_lps}";
            
            /// <summary>
            /// Vault path for ginsldz.psw
            /// </summary>
            /// <param name="ixs_ldz"></param>
            /// <returns></returns>
            public static string RagDataSourceSecret(string ixs_ldz) => $"{Prefix}.{SubpathRagDataSource}.{ixs_ldz}";

            bool IGSecretPathMatcher.IsHandledByPath(string[] splitPath) =>
                splitPath.Length == 3
                && splitPath[0] == Prefix
                && (splitPath[1] == SubpathSubscription || splitPath[1] == SubpathRagDataSource);


            bool IGSecretPathMatcher.IsRecursiveCredential(string path, string vaultId) => false;

        }

        /// <summary>
        /// CSAS
        /// </summary>
        public sealed class CSAS : IGSecretPathMatcher
        {
            /// <summary>
            /// CSAS
            /// </summary>
            const string Prefix = "CSAS";

            /// <summary>
            /// ApiKey CSAS secret path
            /// </summary>
            /// <param name="ixs_oap"></param>
            /// <returns></returns>
            public static string ApiKey(string ixs_oap) =>
                $"{Prefix}.ApiKey.{ixs_oap}";

            bool IGSecretPathMatcher.IsRecursiveCredential(string path, string vaultId) => false;

            bool IGSecretPathMatcher.IsHandledByPath(string[] splitPath) =>
                splitPath.Length == 3 &&
                splitPath[0] == Prefix;
        }

        /// <summary>
        /// SAB
        /// </summary>
        public sealed class SAB : IGSecretPathMatcher
        {
            /// <summary>
            /// Prefix
            /// </summary>
            const string Prefix = "SAB";

            bool IGSecretPathMatcher.IsRecursiveCredential(string path, string vaultId)
            {
                var split = path.Split(new[] { '.' });
                if (split.Length == 0)
                {
                    return false;
                }

                return split.Length >= 3 && vaultId == split[2];
            }

            /// <summary>
            /// SABAccessCode for SAB.AccessCode.ixs_vau
            /// </summary>
            /// <param name="ixs_vau"></param>
            /// <returns></returns>
            public static string SABAccessCode(string ixs_vau) =>
                $"{Prefix}.AccessCode.{ixs_vau}";

            bool IGSecretPathMatcher.IsHandledByPath(string[] splitPath) =>
                splitPath.Length == 3 &&
                splitPath[0] == Prefix;
        }

        /// <summary>
        /// DatabaseProfile
        /// </summary>
        public sealed class DatabaseProfile : IGSecretPathMatcher
        {
            const string Prefix = "DatabaseProfile";
            /// <summary>
            /// Build ELE.Server secret path
            /// </summary>
            /// <returns></returns>
            public static string Klic(string dbprofil, string dbp_klic) =>
                $"{Prefix}.{dbprofil}.{dbp_klic}";

            bool IGSecretPathMatcher.IsRecursiveCredential(string path, string vaultId) => false;

            bool IGSecretPathMatcher.IsHandledByPath(string[] splitPath) =>
                splitPath.Length >= 3 && splitPath[0] == Prefix;
        }

        /// <summary>
        /// AutCertifikat
        /// </summary>
        public sealed class AutCertifikat : IGSecretPathMatcher
        {
            /// <summary>
            /// AutCertifikat
            /// </summary>
            const string Prefix = "AutCertifikat";

            /// <summary>
            /// ClientSecret AutCertifikat secret path
            /// </summary>
            /// <param name="ico"></param>
            /// <returns></returns>
            public static string ApiKey(string ico) =>
                $"{Prefix}.ClientSecret.{ico}";

            bool IGSecretPathMatcher.IsRecursiveCredential(string path, string vaultId) => false;

            bool IGSecretPathMatcher.IsHandledByPath(string[] splitPath) =>
                splitPath.Length == 3 &&
                splitPath[0] == Prefix;
        }
    }
}

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GParamNames.cs                               </Name>
//    <Description> Parameter names                                             </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-04-28                                                  </Created>
//  </FileHeader>

namespace Gordic.General
{
    /// <summary>
    /// Parameter names
    /// </summary>
    public static class GParamNames
    {
        /// <summary>
        /// AllowUnstrustedSslCertificate
        /// </summary>
        public const string AllowUnstrustedSslCertificate = "AllowUnstrustedSslCertificate";

        /// <summary>
        /// Vault
        /// </summary>
        public const string Vault = "Vaults";

        /// <summary>
        /// Faze
        /// </summary>
        public const string Faze = "Faze";

        /// <summary>
        /// Revize
        /// </summary>
        public const string Revize = "Revize";

        /// <summary>
        /// ApplicationType
        /// </summary>
        public const string ApplicationType = "ApplicationType";

        /// <summary>
        /// Profile
        /// </summary>
        public const string Profile = "Profile";

        /// <summary>
        /// RootDir
        /// </summary>
        public const string RootDir = "RootDir";

        /// <summary>
        /// ComputerName
        /// </summary>
        public const string ComputerName = "ComputerName";

        /// <summary>
        /// ArchivePath
        /// </summary>
        public const string ArchivePath = "Archive-path";

        /// <summary>
        /// ArchivePath2
        /// </summary>
        public const string ArchivePath2 = "Archive-path2";
        
        /// <summary>
        /// RequestID
        /// </summary>
        public const string RequestID = "RequestID";

        /// <summary>
        /// HttpProxy
        /// </summary>
        public const string HttpProxy = "HttpProxy";

        /// <summary>
        /// DatetimeAkt
        /// </summary>
        public const string DatetimeAkt = "DatetimeAkt";

        static IGSystemConfiguration SystemConfiguration => GComponentCatalog.Mediate<IGSystemConfiguration>();

        /// <summary>
        /// GetFaze
        /// </summary>
        /// <returns></returns>
        public static string GetFaze(string faze = "") => SystemConfiguration.GetSystemParameter(Faze, faze);

        /// <summary>
        /// GetRevize
        /// </summary>
        /// <returns></returns>
        public static string GetRevize(string revize = "") => SystemConfiguration.GetSystemParameter(Revize, revize);

        /// <summary>
        /// GetRevize
        /// </summary>
        /// <returns></returns>
        public static string GetDatetimeAkt(string datetimeAkt = "") => SystemConfiguration.GetSystemParameter(DatetimeAkt, datetimeAkt);

        /// <summary>
        /// GetRootDir
        /// </summary>
        /// <returns></returns>
        public static string GetRootDir() => SystemConfiguration.GetSystemParameter(RootDir, string.Empty);
    }
}

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GServicePointManager48.cs                    </Name>
//    <Description> Náhrada za System.Net.ServicePointManager                   </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-06-13                                                  </Created>
//  </FileHeader>

using System;
using System.Linq;
using System.Net;
using System.Threading;

namespace Gordic.General
{
    /// <summary>
    /// Náhrada za System.Net.ServicePointManager
    /// </summary>
    public static class GServicePointManager48
    {
        static readonly SecurityProtocolType[] DeprecatedProtocols = new SecurityProtocolType[]
        {
            SecurityProtocolType.Tls,
            SecurityProtocolType.Tls11
        };

        static readonly IGLogger Logger = GLogManager.CurrentClassLogger();
        static long Counter = 0;

        static IGSystemConfiguration SystemConfiguration => GComponentCatalog.Mediate<IGSystemConfiguration>();
        static string Revize => SystemConfiguration.GetSystemParameter(GParamNames.Revize, "?Revize?");
        static readonly object ProtocolTraceLock = new object();
        static SecurityProtocolType Previous = System.Net.ServicePointManager.SecurityProtocol;

        /// <summary>
        /// Náhrada za System.Net.ServicePointManager
        /// </summary>
        public static SecurityProtocolType SecurityProtocol
        {
            set => SetSecurityProtocol_Internal(value, GetSafeRevize());
            get
            {
                lock (ProtocolTraceLock)
                {
                    return System.Net.ServicePointManager.SecurityProtocol;
                }
            }
        }

        /// <summary>nastavení typu bezpečnostního protokolu z DNP</summary>
        /// <param name="securityProtocol">požadovaný typ bezpečnostního protokolu</param>
        /// <param name="revize">revize</param>
        public static void SetSecurityProtocol(SecurityProtocolType securityProtocol, string revize)
        {
            SetSecurityProtocol_Internal(securityProtocol, revize.NotNullTrimmed());
        }

        static void SetSecurityProtocol_Internal(SecurityProtocolType value, string revize)
        {
            Interlocked.Increment(ref Counter);
            lock (ProtocolTraceLock)
            {
                foreach (var deprecatedProtocol in DeprecatedProtocols.Where(p => (p & value) == p))
                {
                    var protocolName = Enum.GetName(typeof(SecurityProtocolType), deprecatedProtocol);
                    Logger.Warn("ServicePointManager.SecurityProtocol - usage of deprecated protocol detected: [{Protocol} = {ProtocolName}]",
                        deprecatedProtocol,
                        protocolName
                    );
                }

                Logger.Warn("ServicePointManager.SecurityProtocol requested: [{securityProtocol}], current: [{current}], previous-requested: [{Previous}] - [{revize}], {Counter}x",
                    value,
                    System.Net.ServicePointManager.SecurityProtocol,
                    Previous,
                    revize,
                    Counter
                );
                Previous = value;
                System.Net.ServicePointManager.SecurityProtocol = value;
            }
        }

        static string GetSafeRevize()
        {
            try
            {
                return Revize;
            }
            catch(Exception)
            {
                // nepodarilo se zjistit, kde kod bezi (klient/server...)
                return "!Revize!";
            }
        }
    }
}

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GAibGlobals.cs                               </Name>
//    <Description> AIB constants                                               </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-06-11                                                  </Created>
//  </FileHeader>

using Newtonsoft.Json;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;

namespace Gordic.General
{
    /// <summary>
    /// AIB constants
    /// </summary>
    public static class GAibGlobals
    {
        // (?<!\S)(?:\S+\/\S+|\/)\s*\d+\s+(?<method>\S+)\s+(?<level>Debug|Info|Trace|Warning|Warn|Error|Fatal|Critical)
        static readonly IGLogger Logger = GLogManager.CurrentClassLogger();
        public const string CWSAIB01 = "CWSAIB01";
        public const string GWSIDS02 = "GWSIDS02";

        /// <summary>
        /// IsExecutedOnAib
        /// </summary>
        /// <returns></returns>
        public static bool IsExecutedOnAib()
        {
            var faze = GParamNames.GetFaze(string.Empty);
            return faze == CWSAIB01 || faze == GWSIDS02;
        }

#if NETFRAMEWORK
        public const string Faze = GWSIDS02;
#else
        public const string Faze = CWSAIB01;
#endif

        public enum AibProtocolSubVersions
        {
            /// <summary>
            /// Basic version
            /// </summary>
            V2 = 2,

            /// <summary>
            /// 3 - with request secrets support
            /// </summary>
            V3 = 3,

            /// <summary>
            /// 4 - with telemetry support
            /// </summary>
            V4 = 4
        }

        /// <summary>
        /// Nastavení JSON pro potřeby serializace interních zpráv AIB
        /// </summary>
        public static JsonSerializerSettings AibJsonSettings
        {
            get
            {
                var aibJsonSettings = JsonConvert.DefaultSettings();
                aibJsonSettings.TypeNameHandling = TypeNameHandling.Auto;
                aibJsonSettings.TypeNameAssemblyFormatHandling = TypeNameAssemblyFormatHandling.Simple;
                return aibJsonSettings;
            }
        }

        /// <summary>
        /// Try to get Aib version from response
        /// </summary>
        /// <param name="response"></param>
        /// <returns></returns>
        public static string TryGetAibVersion(object response)
        {
            switch (response)
            {
                case WebResponse webResponse:
                    try
                    {
                        if (webResponse.Headers.AllKeys.Contains("x-gordic-revize"))
                        {
                            return webResponse.Headers["x-gordic-revize"];
                        }
                    }
                    catch (Exception ex)
                    {
                        Logger.Error(ex, "Cannot extract AIB-Revize from x-gordic-revize header");
                    }
                    break;

                case HttpResponseMessage responseMessage:
                    try
                    {
                        if (responseMessage.Headers.Contains("x-gordic-revize"))
                        {
                            return responseMessage.Headers.GetValues("x-gordic-revize").FirstOrDefault();
                        }
                    }
                    catch (Exception ex)
                    {
                        Logger.Error(ex, "Cannot extract AIB-Revize from x-gordic-revize header");
                    }

                    break;
            }

            return "---";
        }
    }
}

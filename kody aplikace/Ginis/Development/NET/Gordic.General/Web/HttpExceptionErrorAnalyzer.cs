//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.HttpExceptionErrorAnalyzer.cs</Name>
//    <Description> Analyze http-related exceptions and return reason and exception to log</Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-08-29                                                  </Created>
//  </FileHeader>

using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Sockets;
using System.Reflection;
using System.Security.Authentication;
using System.Text.RegularExpressions;

namespace Gordic.General
{
    /// <summary>
    /// Analyze http-related exceptions and return reason and exception to log
    /// </summary>
    public static class HttpExceptionErrorAnalyzer
    {
        /// <summary>
        /// Documentation links - KNOWLEDGE BASE
        /// </summary>
        public enum KnownErrors
        {
            /// <summary>
            /// None - no error
            /// </summary>
            HTTP_NoError,

            /// <summary>
            /// Chyba sítě - nedostupná síť (firewall, infrastruktura, špatná url)
            /// </summary>
            HTTP_1,

            /// <summary>
            /// Na AIB není požadovaná licence
            /// </summary>
            HTTP_2,

            /// <summary>
            /// AIB na zadané URL neodpovídá
            /// </summary>
            HTTP_3,

            /// <summary>
            /// Administrátor nastavil nevalidní Url (DNS) adresu
            /// </summary>
            HTTP_4,

            /// <summary>
            /// AIB není dostupná
            /// </summary>
            HTTP_5,

            /// <summary>
            /// AIB vrací nesmyslný JSON - asi nastaveno na www.kdesi.cosi.cz
            /// </summary>
            HTTP_6,

            /// <summary>
            /// Chybně zadaná url adresa AIB (špatný protokol, překlep, ...)
            /// </summary>
            HTTP_7,

            /// <summary>
            /// HttpRequestException
            /// </summary>
            HTTP_8,

            /// <summary>
            /// SSL/TLS chyba
            /// </summary>
            HTTP_9,

            /// <summary>
            /// Obecná chyba sítě - nepodařilo se určit detailnější příčinu
            /// </summary>
            HTTP_10,
            
            /// <summary>
            /// Chyba při zpracování HTTP požadavku na straně AIB
            /// </summary>
            HTTP_11,

            /// <summary>
            /// Zakázaná revize AIB
            /// </summary>
            HTTP_ProhibitedAibVersion,

            /// <summary>
            /// Nějaká obecná chyba
            /// </summary>
            Generic_Error,

            /// <summary>
            /// K chybě došlo v modulu GINIS lokálně -  !!!!!! BEZ !!!!! aib
            /// </summary>
            LocalError,

            /// <summary>
            /// K chybě došlo v modulu GINIS lokálně -  !!!!!! BEZ !!!!! aib
            /// </summary>
            LocalGenericError
        }

        public static string FormatKB(KnownErrors knownError)
        {
            return $"[doc::{knownError}]";
        }

        static readonly Lazy<Regex> ErrorRE = new Lazy<Regex>(() =>
            new Regex(@"\[doc::(HTTP_\d+)\]", RegexOptions.Compiled | RegexOptions.IgnoreCase)
        );

        /// <summary>
        /// Parse known error from log line
        /// </summary>
        /// <param name="line"></param>
        /// <returns></returns>
        public static KnownErrors ParseKnownError(string line)
        {
            var match = ErrorRE.Value.Match(line);
            if (match.Success && Enum.TryParse(match.Groups[1].Value, out KnownErrors knownError))
            {
                return knownError;
            }

            return KnownErrors.HTTP_NoError;
        }

        public static string Analyze(Exception ex)
        {
            var (knownError, message) = AnalyzeDetail(ex);
            return $"{FormatKB(knownError)} {message}";
        }

        public static (KnownErrors, string) AnalyzeDetail(Exception ex)
        {
            switch (ex)
            {
                case GException gex:
                    return FindRealCause(gex.InnerException);

                case TargetInvocationException tex:
                    return FindRealCause(tex.InnerException);

                case AggregateException aex:
                    var cause = aex.InnerExceptions.Select(inner => FindRealCause(inner)).FirstOrDefault();
                    if (cause != default)
                    {
                        return cause;
                    }
                    return FindRealCause(aex.InnerException);

                case HttpRequestException httpEx:
                    return FindRealCause(httpEx);

                case System.Net.WebException webException:
                    return FindRealCause(webException);

                case UriFormatException uriException:
                    return (KnownErrors.HTTP_4, "Nesprávný formát url");

                default:
                    return (KnownErrors.HTTP_10, "Neznámá chyba (sítě/konfigurace/PC)?");
            }
        }

        static (KnownErrors, string) FindRealCause(Exception root)
        {
            Exception ex = root;
            do
            {
                switch (ex)
                {
                    case AuthenticationException auth:
                        return (
                            KnownErrors.HTTP_9,
                            $"Chyba zabezpečení - SSL/TLS handshake: {auth.Message}. Zkontrolujte certifikáty a protokoly."
                        );

                    case SocketException sock:
                        return (
                            KnownErrors.HTTP_1,
                            $"Nedostupná síť[{sock.NativeErrorCode} - {sock.SocketErrorCode}] - chyba firewallu, infrastruktury, nebo špatná url."
                        );

                    case UriFormatException uriException:
                        return (KnownErrors.HTTP_4, "Nesprávný formát url " + uriException.Message);

                    case HttpRequestException rex:
                        if (rex.InnerException == null)
                        {
                            return (
                                KnownErrors.HTTP_8,
                                $"Požadavek[HT] se nepodařilo odeslat[{rex.Message}] - chyba firewallu, infrastruktury, nebo špatná url."
                            );
                        }
                        break;

                    case WebException wex:
                        if (wex.InnerException == null)
                        {
                            return (
                                KnownErrors.HTTP_11,
                                $"Požadavek[WR] se nepodařilo odeslat[{wex.Message} - {wex.Status}] - chyba firewallu, infrastruktury, nebo špatná url."
                            );
                        }
                        return FindRealCause(wex.InnerException);
                }

                // we need to go deeper
                if (ex != null)
                {
                    ex = ex.InnerException;
                }
            }
            while (ex != null);

            return (
                KnownErrors.HTTP_10,
                "Nedostupná síť(neznámá chyba) - chyba firewallu, infrastruktury, nebo špatná url."
            );
        }

    }
}

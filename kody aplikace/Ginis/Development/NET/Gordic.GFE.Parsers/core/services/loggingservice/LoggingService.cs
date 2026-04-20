//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.LoggingService.cs                        </Name>
//    <Description> Třída pro jednoduché logování                               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Core.Services;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Třída pro jednoduché logování
    /// </summary>
    public static class LoggingService
    {
        /// <summary>
        /// Debug
        /// </summary>
        /// <param name="message">Zprava ladění</param>
        public static void Debug(object message)
        {
            ServiceManager.LoggingDebug(message);
        }
        /// <summary>
        /// Formátováné ladění
        /// </summary>
        /// <param name="format">Formátovaná zprava</param>
        /// <param name="args">Argumenty formátované zprávy</param>
        public static void DebugFormatted(string format, params object[] args)
        {
            ServiceManager.LoggingDebugFormatted(format, args);
        }
        /// <summary>
        /// Logování varování
        /// </summary>
        /// <param name="message">Zprava varování</param>
        /// <param name="exception">Logovaná vyjímka</param>
        public static void Warning(object message, Exception exception)
        {
            ServiceManager.LoggingWarn(message, exception);
        }
        /// <summary>
        /// Protokolování varovné zprávy
        /// </summary>
        /// <param name="message">Varovná zpráva</param>
        public static void Warning(object message)
        {
            ServiceManager.LoggingWarn(message);
        }

        /// <summary>
        /// Kritická chyba
        /// </summary>
        /// <param name="message">Zpráva kritické chyby</param>
        public static void Fatal(object message)
        {
            ServiceManager.LoggingFatal(message);
        }
        /// <summary>
        /// Informační zpráva
        /// </summary>
        /// <param name="message">Obsah protokolu</param>
        public static void Info(object message)
        {
            ServiceManager.LoggingInfo(message);
        }
        /// <summary>
        /// Protokolování chybové zprávy
        /// </summary>
        /// <param name="message">Zpráva chyby</param>
        /// <param name="exception">Výjimka</param>
        public static void Error(object message, Exception exception)
        {
            ServiceManager.LoggingError(message, exception);
        }
        /// <summary>
        /// Protokolování chybové zprávy
        /// </summary>
        /// <param name="message">Chybová zpráva</param>
        public static void Error(object message)
        {
            ServiceManager.LoggingError(message);
        }
        /// <summary>
        /// Formátováné protokolování informace
        /// </summary>
        /// <param name="format">Formát</param>
        /// <param name="args">Argumenty</param>
        public static void InfoFormatted(string format, params object[] args)
        {
            ServiceManager.LoggingInfoFormatted(format, args);
        }

        /// <summary>
        /// Uložení logu do souboru
        /// </summary>
        /// <param name="path">Cesta ke složce </param>
        public static void Save(string path)
        {
            ServiceManager.LoggingSave(FileUtility.Combine(path, "log", DateTime.UtcNow.ToString().Replace('.', '_').Replace(':', '_') + ".log"));
        }
    }
}

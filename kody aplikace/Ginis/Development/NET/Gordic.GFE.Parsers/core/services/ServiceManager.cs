//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ServiceManager.cs                        </Name>
//    <Description> Udržuje odkazy na implementace základních služeb            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Utils;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.Core.Services
{
    /// <summary>
    /// Udržuje odkazy na implementace základních služeb
    /// </summary>
    public static class ServiceManager
    {
        static IDictionary<int, List<ILoggingService>> logginsCach = new ConcurrentDictionary<int, List<ILoggingService>>();
        static IDictionary<int, IMessageService> messagesCach = new ConcurrentDictionary<int, IMessageService>();
        static IDictionary<int, IGraphicSettingService> settingsCach = new ConcurrentDictionary<int, IGraphicSettingService>();

        /// <summary>
        /// Protokolování ladění
        /// </summary>
        /// <param name="message">Zprava ladění</param>
        internal static void LoggingDebug(object message)
        {
            LoggingService.ForEach(item => item.Debug(message));
        }

        /// <summary>
        /// Protokolování formátovaného ladění
        /// </summary>
        /// <param name="format">Formátovaná zprava</param>
        /// <param name="args">Argumenty formátované zprávy</param>
        internal static void LoggingDebugFormatted(string format, params object[] args)
        {
            LoggingService.ForEach(item => item.DebugFormatted(format, args));
        }

        /// <summary>
        /// Varovná zpráva
        /// </summary>
        /// <param name="message">Text varovné zpravy</param>
        /// <param name="exception">Logovaná vyjímka</param>
        internal static void LoggingWarn(object message, Exception exception)
        {
            LoggingService.ForEach(item => item.Warn(message, exception));
        }

        /// <summary>
        /// Protokolování varovné zprávy
        /// </summary>
        /// <param name="message">Varovná zpráva</param>
        internal static void LoggingWarn(object message)
        {
            LoggingService.ForEach(item => item.Warn(message));
        }

        /// <summary>
        /// Kritická chyba
        /// </summary>
        /// <param name="message">Zprava kritické chyby</param>
        internal static void LoggingFatal(object message)
        {
            LoggingService.ForEach(item => item.Fatal(message));
        }

        /// <summary>
        /// Informační zpráva
        /// </summary>
        /// <param name="message">Obsah zprávy do potokolu</param>
        internal static void LoggingInfo(object message)
        {
            LoggingService.ForEach(item => item.Info(message));
        }

        /// <summary>
        /// Protokolování výjimky
        /// </summary>
        /// <param name="message">Zpráva výjimky</param>
        /// <param name="exception">Výjimka</param>
        internal static void LoggingError(object message, Exception exception)
        {
            LoggingService.ForEach(item => item.Error(message, exception));
        }

        /// <summary>
        /// Protokolování chyby
        /// </summary>
        /// <param name="message">Zpráva chyby</param>
        internal static void LoggingError(object message)
        {
            LoggingService.ForEach(item => item.Error(message));
        }

        /// <summary>
        /// Formátováné protokolování informace
        /// </summary>
        /// <param name="format">Formát</param>
        /// <param name="args">Argumenty formátu</param>
        internal static void LoggingInfoFormatted(string format, object[] args)
        {
            LoggingService.ForEach(item => item.InfoFormatted(format, args));
        }

        /// <summary>
        /// Uložení obsahu logu do souboru
        /// </summary>
        /// <param name="fileName">Název souboru pro uložení</param>
        internal static void LoggingSave(string fileName)
        {
            LoggingService.ForEach(item => item.Save(fileName));
        }

        /// <summary>
        /// Služba protokolování
        /// </summary>
        public static List<ILoggingService> LoggingService
        {
            get
            {
                int prcId = Thread.CurrentThread.ManagedThreadId;

                if (!logginsCach.ContainsKey(prcId))
                {
                    List<ILoggingService> l = new List<ILoggingService>
                    {
                        new TextWriterLoggingService(new FileTextWriter())
                    };
                    logginsCach.Add(prcId, l);
                }

                return logginsCach[prcId];
            }
            set
            {
                int prcId = Thread.CurrentThread.ManagedThreadId;
                if (value == null)
                    logginsCach.Remove(prcId);
                else
                    logginsCach[prcId] = value;
            }
        }
        /// <summary>
        /// Služba zobrazení zpráv
        /// </summary>
        public static IMessageService MessageService
        {
            get
            {
                int prcId = Thread.CurrentThread.ManagedThreadId;

                if (!messagesCach.ContainsKey(prcId))
                    messagesCach.Add(prcId, new TextWriterMessageService(Console.Out));

                return messagesCach[prcId];
            }
            set
            {
                int prcId = Thread.CurrentThread.ManagedThreadId;
                if (value == null)
                    messagesCach.Remove(prcId);
                else
                    messagesCach[prcId] = value;
            }
        }
        /// <summary>
        /// Služba zobrazení zpráv
        /// </summary>
        public static IGraphicSettingService GraphicSettingService
        {
            get
            {
                int prcId = Thread.CurrentThread.ManagedThreadId;

                if (!settingsCach.ContainsKey(prcId))
                    settingsCach.Add(prcId, new DefaultGraphicSettingService());

                return settingsCach[prcId];
            }
            set
            {
                int prcId = Thread.CurrentThread.ManagedThreadId;
                if (value == null)
                    settingsCach.Remove(prcId);
                else
                    settingsCach[prcId] = value;
            }
        }

    }
}

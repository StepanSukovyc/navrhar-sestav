//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GLoggerExtensions.cs                         </Name>
//    <Description> IGLogger rozšiøující metody pro bìžné použití               </Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2020                            </Copyright>
//    <Created>     2020-09-21                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General
{
    /// <summary>
    /// IGLogger rozšiøující metody pro bìžné použití
    /// </summary>
    public static class GLoggerExtensions
    {
        //private static readonly Func<FormattedLogValues, Exception, string> _messageFormatter = MessageFormatter;

        //------------------------------------------DEBUG------------------------------------------//

        /// <summary>
        /// Naformátuje a zapíše debug logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Debug(this IGLogger logger, bool secret, Exception exception, string message, params object[] args)
        {
            logger.Log(GLogLevel.Debug, secret, exception, message, args);
        }

        /// <summary>
        /// Naformátuje a zapíše debug logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Debug(this IGLogger logger, bool secret, string message, params object[] args)
        {
            logger.Log(GLogLevel.Debug, secret, null, message, args);
        }

        /// <summary>
        /// Naformátuje a zapíše debug logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Debug(this IGLogger logger, Exception exception, string message, params object[] args)
        {
            logger.Log(GLogLevel.Debug, false, exception, message, args);
        }

        /// <summary>
        /// Naformátuje a zapíše debug logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Debug(this IGLogger logger, string message, params object[] args)
        {
            logger.Log(GLogLevel.Debug, false, null, message, args);
        }

        //------------------------------------------TRACE------------------------------------------//

        /// <summary>
        /// Naformátuje a zapíše trace logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Trace(this IGLogger logger, bool secret, Exception exception, string message, params object[] args)
        {
            logger.Log(GLogLevel.Trace, secret, exception, message, args);
        }

        /// <summary>
        /// Naformátuje a zapíše trace logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Trace(this IGLogger logger, bool secret, string message, params object[] args)
        {
            logger.Log(GLogLevel.Trace, secret, null, message, args);
        }

        /// <summary>
        /// Naformátuje a zapíše trace logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Trace(this IGLogger logger, Exception exception, string message, params object[] args)
        {
            logger.Log(GLogLevel.Trace, false, exception, message, args);
        }

        /// <summary>
        /// Naformátuje a zapíše trace log message.
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Trace(this IGLogger logger, string message, params object[] args)
        {
            logger.Log(GLogLevel.Trace, false, null, message, args);
        }

        //------------------------------------------INFORMATION------------------------------------------//

        /// <summary>
        /// Formats and writes an informational log message.
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Info(this IGLogger logger, bool secret, Exception exception, string message, params object[] args)
        {
            logger.Log(GLogLevel.Info, secret, exception, message, args);
        }

        /// <summary>
        /// Formats and writes an informational log message.
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Info(this IGLogger logger, bool secret, string message, params object[] args)
        {
            logger.Log(GLogLevel.Info, secret, null, message, args);
        }

        /// <summary>
        /// Formats and writes an informational log message.
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Info(this IGLogger logger, Exception exception, string message, params object[] args)
        {
            logger.Log(GLogLevel.Info, false, exception, message, args);
        }

        /// <summary>
        /// Formats and writes an informational log message.
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Info(this IGLogger logger, string message, params object[] args)
        {
            logger.Log(GLogLevel.Info, false, null, message, args);
        }

        //------------------------------------------WARNING------------------------------------------//

        /// <summary>
        /// Naformátuje a zapíše warning log message.
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Warn(this IGLogger logger, bool secret, Exception exception, string message, params object[] args)
        {
            logger.Log(GLogLevel.Warn, secret, exception, message, args);
        }

        /// <summary>
        /// Naformátuje a zapíše warning log message.
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Warn(this IGLogger logger, bool secret, string message, params object[] args)
        {
            logger.Log(GLogLevel.Warn, secret, null, message, args);
        }

        /// <summary>
        /// Naformátuje a zapíše warning log message.
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Warn(this IGLogger logger, Exception exception, string message, params object[] args)
        {
            logger.Log(GLogLevel.Warn, false, exception, message, args);
        }

        /// <summary>
        /// Naformátuje a zapíše warning log message.
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Warn(this IGLogger logger, string message, params object[] args)
        {
            logger.Log(GLogLevel.Warn, false, null, message, args);
        }

        //------------------------------------------ERROR------------------------------------------//

        /// <summary>
        /// Formats and writes an error log message.
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Error(this IGLogger logger, bool secret, Exception exception, string message, params object[] args)
        {
            logger.Log(GLogLevel.Error, secret, exception, message, args);
        }

        /// <summary>
        /// Formats and writes an error log message.
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Error(this IGLogger logger, bool secret, string message, params object[] args)
        {
            logger.Log(GLogLevel.Error, secret, null, message, args);
        }

        /// <summary>
        /// Formats and writes an error log message.
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Error(this IGLogger logger, Exception exception, string message, params object[] args)
        {
            logger.Log(GLogLevel.Error, false, exception, message, args);
        }

        /// <summary>
        /// Formats and writes an error log message.
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Error(this IGLogger logger, string message, params object[] args)
        {
            logger.Log(GLogLevel.Error, false, null, message, args);
        }

        //------------------------------------------CRITICAL------------------------------------------//

        /// <summary>
        /// Naformátuje a zapíše fatal log message.
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Fatal(this IGLogger logger, bool secret, Exception exception, string message, params object[] args)
        {
            logger.Log(GLogLevel.Fatal, secret, exception, message, args);
        }

        /// <summary>
        /// Naformátuje a zapíše fatal log message.
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Fatal(this IGLogger logger, bool secret, string message, params object[] args)
        {
            logger.Log(GLogLevel.Fatal, secret, null, message, args);
        }

        /// <summary>
        /// Naformátuje a zapíše fatal log message.
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Fatal(this IGLogger logger, Exception exception, string message, params object[] args)
        {
            logger.Log(GLogLevel.Fatal, false, exception, message, args);
        }

        /// <summary>
        /// Naformátuje a zapíše fatal log message.
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Fatal(this IGLogger logger, string message, params object[] args)
        {
            logger.Log(GLogLevel.Fatal, false, null, message, args);
        }

        /// <summary>
        /// Naformátuje a zapíše log message at the specified log level.
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="logLevel">Entry will be written on this level.</param>
        /// <param name="message">Format string of the log message.</param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Log(this IGLogger logger, GLogLevel logLevel, string message, params object[] args)
        {
            logger.Log(logLevel, false, null, message, args);
        }

        /// <summary>
        /// Naformátuje a zapíše log message at the specified log level.
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="logLevel">entry will be written on this level.</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="message">format string of the log message.</param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void log(this IGLogger logger, GLogLevel logLevel, bool secret, string message, params object[] args)
        {
            logger.log(logLevel, secret, null, message, args);
        }

        /// <summary>
        /// Naformátuje a zapíše log message at the specified log level.
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="logLevel">Entry will be written on this level.</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Format string of the log message.</param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Log(this IGLogger logger, GLogLevel logLevel, Exception exception, string message, params object[] args)
        {
            logger.Log(logLevel, false, exception, message, args);
        }

        /// <summary>
        /// Naformátuje a zapíše log message at the specified log level.
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="logLevel">Entry will be written on this level.</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Format string of the log message.</param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Log(this IGLogger logger, GLogLevel logLevel, bool secret, Exception exception, string message, params object[] args)
        {
            logger.Log(logLevel, secret, exception, message, args);
        }

        //------------------------------------------Scope------------------------------------------//

        ///// <summary>
        ///// Formats the message and creates a scope.
        ///// </summary>
        ///// <param name="logger">The <see cref="IGLogger"/> to create the scope in.</param>
        ///// <param name="messageFormat">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        ///// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        ///// <returns>A disposable scope object. Can be null.</returns>
        ///// <example>
        ///// using(logger.BeginScope("Processing request from {Address}", address))
        ///// {
        ///// }
        ///// </example>
        //public static IDisposable BeginScope(
        //    this IGLogger logger,
        //    string messageFormat,
        //    params object[] args)
        //{
        //    if (logger == null)
        //    {
        //        throw new ArgumentNullException(nameof(logger));
        //    }

        //    return logger.BeginScope(new FormattedLogValues(messageFormat, args));
        //}

        ////------------------------------------------HELPERS------------------------------------------//

        //private static string MessageFormatter(FormattedLogValues state, Exception error)
        //{
        //    return state.ToString();
        //}
    }
}

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GLoggerExtensions.cs                         </Name>
//    <Description> IGLogger rozšiøující metody pro bìžné použití               </Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-09-21                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace Gordic.General
{
    /// <summary>
    /// IGLogger rozšiøující metody pro bìžné použití
    /// </summary>
    public static class GLoggerExtensions
    {
        //private static readonly Func<FormattedLogValues, Exception, string> _messageFormatter = MessageFormatter;

        #region Debug
        /// <summary>
        /// Naformátuje a zapíše Debug logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Debug(this IGLogger logger, bool secret, Exception exception, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Debug))
            {
                logger.LogFull(GLogLevel.Debug, secret, exception, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Debug logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Debug(this IGLogger logger, bool secret, Exception exception, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Debug))
            {
                logger.LogFull(GLogLevel.Debug, secret, exception, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Debug logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Debug(this IGLogger logger, bool secret, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Debug))
            {
                logger.LogFull(GLogLevel.Debug, secret, null, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Debug logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Debug(this IGLogger logger, bool secret, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Debug))
            {
                logger.LogFull(GLogLevel.Debug, secret, null, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Debug logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="properties">Pole vlastností, které bude pøedáno v této logovací zprávì</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Debug(this IGLogger logger, IDictionary<object, object> properties, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Debug))
            {
                logger.LogFullProperties(GLogLevel.Debug, false, null, message, properties, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Debug logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="properties">Pole vlastností, které bude pøedáno v této logovací zprávì</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Debug(this IGLogger logger, IDictionary<object, object> properties, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Debug))
            {
                logger.LogFullProperties(GLogLevel.Debug, false, null, message.ToString(), properties, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Debug logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Debug(this IGLogger logger, Exception exception, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Debug))
            {
                logger.LogFull(GLogLevel.Debug, false, exception, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Debug logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Debug(this IGLogger logger, Exception exception, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Debug))
            {
                logger.LogFull(GLogLevel.Debug, false, exception, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Debug logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Debug(this IGLogger logger, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Debug))
            {
                logger.LogFull(GLogLevel.Debug, false, null, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Debug logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Debug(this IGLogger logger, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Debug))
            {
                logger.LogFull(GLogLevel.Debug, false, null, message.ToString(), args);
            }
        }

        private static object SafeMessage(Func<GLogString> message)
        {
            try
            {                                               // aby to nevrátilo Gordic.General.GLogString
                string l_sMessage = message?.Invoke() ?? String.Empty;      // deklaruje se string l_sMessage - díky tomu se zavolá implicitní pøetypování na string
                return l_sMessage;
            }
            catch (Exception x)
            { return x; }
        }

        private static object SafeMessage(Func<FormattableString> message)
        {
            try
            { return message?.Invoke()?.ToString() ?? String.Empty; }         // navíc ToString() - dìlá odložené složení formátovatelného øetìzce
            catch (Exception x)
            { return x; }
        }


        private static IEnumerable<object> SafeParams(Func<object>[] args)
        {
            return args.Select(arg =>       // získání výsledných parametrù
            {
                try                             // parametr mùže být null - tady žádné ošetøení není
                { return arg?.Invoke(); }       // parametr se získá jako výsledek volání funkce
                catch (Exception x)
                { return x; }                   // !pozor v pøípadì výjimky vrací jako parametr pøímo výjimku
            });
        }

        /// <summary>
        /// Naformátuje a zapíše Debug logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Debug(this IGLogger logger, Func<GLogString> message, params Func<object>[] args)
        {
            if (logger.IsEnabled(GLogLevel.Debug))
            {
                string l_sErrMessage = null;
                try
                {
                    var l_oMessage = SafeMessage(message);

                    if (l_oMessage is Exception l_oMsgException)
                    {
                        l_sErrMessage = GResources.GetResourceText(23320011); //RC 23320011 : Pøi logování zprávy došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, l_oMsgException, l_sErrMessage, null);
                        return;     // když nemám žádnou zprávu, nesmím pokraèovat - se získáváním parametrù
                    }

                    // !pozor v pøípadì výjimky vrací jako parametr pøímo výjimku
                    var l_aoParams = SafeParams(args).ToArray();

                    logger.LogFull(GLogLevel.Debug, false, null, l_oMessage.ToString(), l_aoParams);

                    foreach (Exception ex in l_aoParams.Where(param => param is Exception))
                    {   // pøípadná výjimka bude zalogována ještì jednou, tentokrát 1. vždy jako Error, 2. s plným stacktrace a Gordickým kontextem
                        l_sErrMessage = GResources.GetResourceText(23320012); //RC 23320012 : Pøi logování parametru došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                    }
                }
                catch(Exception ex)
                {
                    l_sErrMessage = GResources.GetResourceText(23320013); //RC 23320013 : Pøi logování došlo k neošetøené výjimce.
                    logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                }
            }
        }


        /// <summary>
        /// Naformátuje a zapíše Debug logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Debug(this IGLogger logger, Func<FormattableString> message, params Func<object>[] args)
        {
            if (logger.IsEnabled(GLogLevel.Debug))
            {
                string l_sErrMessage = null;
                try
                {
                    var l_oMessage = SafeMessage(message);

                    if (l_oMessage is Exception l_oMsgException)
                    {
                        l_sErrMessage = GResources.GetResourceText(23320011); //RC 23320011 : Pøi logování zprávy došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, l_oMsgException, l_sErrMessage, null);
                        return;     // když nemám žádnou zprávu, nesmím pokraèovat - se získáváním parametrù
                    }

                    // !pozor v pøípadì výjimky vrací jako parametr pøímo výjimku
                    var l_aoParams = SafeParams(args).ToArray();

                    logger.LogFull(GLogLevel.Debug, false, null, l_oMessage.ToString(), l_aoParams);

                    foreach (Exception ex in l_aoParams.Where(param => param is Exception))
                    {   // pøípadná výjimka bude zalogována ještì jednou, tentokrát 1. vždy jako Error, 2. s plným stacktrace a Gordickým kontextem
                        l_sErrMessage = GResources.GetResourceText(23320012); //RC 23320012 : Pøi logování parametru došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                    }
                }
                catch (Exception ex)
                {
                    l_sErrMessage = GResources.GetResourceText(23320013); //RC 23320013 : Pøi logování došlo k neošetøené výjimce.
                    logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                }
            }
        }

        /*/// <summary>
        /// Naformátuje a zapíše Debug logovací zprávu tak, že pøípadné výjimky zaloguje a pokraèuje dál. Pøedanou logovací funkci zavolá jen v pøípadì, kdy je logování zapnuté.
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="logMsgFunc">Logovací funkce, jejíž výsledek se zaloguje. Pøedanou logovací funkci zavolá jen v pøípadì, kdy je logování zapnuté. </param>
        public static void Debug(this IGLogger logger, Func<GLogMsg> logMsgFunc)
        {
            if (logger.IsEnabled(GLogLevel.Debug))
            {
                try
                {
                    var l_oLogMsg = logMsgFunc.Invoke();
                    logger.LogFull(GLogLevel.Debug, false, l_oLogMsg.Exception, l_oLogMsg.Message, l_oLogMsg.Args);
                }
                catch (Exception ex)
                {
                    logger.LogFull(GLogLevel.Error, false, ex, null, null);
                }
            }
        }*/
                
        #endregion

        #region Trace
        /// <summary>
        /// Naformátuje a zapíše Trace logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Trace(this IGLogger logger, bool secret, Exception exception, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Trace))
            {
                logger.LogFull(GLogLevel.Trace, secret, exception, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Trace logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Trace(this IGLogger logger, bool secret, Exception exception, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Trace))
            {
                logger.LogFull(GLogLevel.Trace, secret, exception, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Trace logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Trace(this IGLogger logger, bool secret, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Trace))
            {
                logger.LogFull(GLogLevel.Trace, secret, null, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Trace logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Trace(this IGLogger logger, bool secret, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Trace))
            {
                logger.LogFull(GLogLevel.Trace, secret, null, message.ToString(), args);
            }
        }


        /// <summary>
        /// Naformátuje a zapíše Trace logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="properties">Pole vlastností, které bude pøedáno v této logovací zprávì</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Trace(this IGLogger logger, IDictionary<object, object> properties, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Trace))
            {
                logger.LogFullProperties(GLogLevel.Trace, false, null, message, properties, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Trace logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="properties">Pole vlastností, které bude pøedáno v této logovací zprávì</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Trace(this IGLogger logger, IDictionary<object, object> properties, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Trace))
            {
                logger.LogFullProperties(GLogLevel.Trace, false, null, message.ToString(), properties, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Trace logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Trace(this IGLogger logger, Exception exception, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Trace))
            {
                logger.LogFull(GLogLevel.Trace, false, exception, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Trace logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Trace(this IGLogger logger, Exception exception, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Trace))
            {
                logger.LogFull(GLogLevel.Trace, false, exception, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Trace logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Trace(this IGLogger logger, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Trace))
            {
                logger.LogFull(GLogLevel.Trace, false, null, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Trace logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Trace(this IGLogger logger, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Trace))
            {
                logger.LogFull(GLogLevel.Trace, false, null, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Trace logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Trace(this IGLogger logger, Func<GLogString> message, params Func<object>[] args)
        {
            if (logger.IsEnabled(GLogLevel.Trace))
            {
                string l_sErrMessage = null;
                try
                {
                    var l_oMessage = SafeMessage(message);

                    if (l_oMessage is Exception l_oMsgException)
                    {
                        l_sErrMessage = GResources.GetResourceText(23320011); //RC 23320011 : Pøi logování zprávy došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, l_oMsgException, l_sErrMessage, null);
                        return;     // když nemám žádnou zprávu, nesmím pokraèovat - se získáváním parametrù
                    }

                    // !pozor v pøípadì výjimky vrací jako parametr pøímo výjimku
                    var l_aoParams = SafeParams(args).ToArray();

                    logger.LogFull(GLogLevel.Trace, false, null, l_oMessage.ToString(), l_aoParams);

                    foreach (Exception ex in l_aoParams.Where(param => param is Exception))
                    {   // pøípadná výjimka bude zalogována ještì jednou, tentokrát 1. vždy jako Error, 2. s plným stacktrace a Gordickým kontextem
                        l_sErrMessage = GResources.GetResourceText(23320012); //RC 23320012 : Pøi logování parametru došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                    }
                }
                catch (Exception ex)
                {
                    l_sErrMessage = GResources.GetResourceText(23320013); //RC 23320013 : Pøi logování došlo k neošetøené výjimce.
                    logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                }
            }
        }


        /// <summary>
        /// Naformátuje a zapíše Trace logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Trace(this IGLogger logger, Func<FormattableString> message, params Func<object>[] args)
        {
            if (logger.IsEnabled(GLogLevel.Trace))
            {
                string l_sErrMessage = null;
                try
                {
                    var l_oMessage = SafeMessage(message);

                    if (l_oMessage is Exception l_oMsgException)
                    {
                        l_sErrMessage = GResources.GetResourceText(23320011); //RC 23320011 : Pøi logování zprávy došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, l_oMsgException, l_sErrMessage, null);
                        return;     // když nemám žádnou zprávu, nesmím pokraèovat - se získáváním parametrù
                    }

                    // !pozor v pøípadì výjimky vrací jako parametr pøímo výjimku
                    var l_aoParams = SafeParams(args).ToArray();

                    logger.LogFull(GLogLevel.Trace, false, null, l_oMessage.ToString(), l_aoParams);

                    foreach (Exception ex in l_aoParams.Where(param => param is Exception))
                    {   // pøípadná výjimka bude zalogována ještì jednou, tentokrát 1. vždy jako Error, 2. s plným stacktrace a Gordickým kontextem
                        l_sErrMessage = GResources.GetResourceText(23320012); //RC 23320012 : Pøi logování parametru došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                    }
                }
                catch (Exception ex)
                {
                    l_sErrMessage = GResources.GetResourceText(23320013); //RC 23320013 : Pøi logování došlo k neošetøené výjimce.
                    logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                }
            }
        }

        #endregion

        #region Info

        /// <summary>
        /// Naformátuje a zapíše Info logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Info(this IGLogger logger, bool secret, Exception exception, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Info))
            {
                logger.LogFull(GLogLevel.Info, secret, exception, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Info logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Info(this IGLogger logger, bool secret, Exception exception, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Info))
            {
                logger.LogFull(GLogLevel.Info, secret, exception, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Info logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Info(this IGLogger logger, bool secret, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Info))
            {
                logger.LogFull(GLogLevel.Info, secret, null, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Info logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Info(this IGLogger logger, bool secret, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Info))
            {
                logger.LogFull(GLogLevel.Info, secret, null, message.ToString(), args);
            }
        }


        /// <summary>
        /// Naformátuje a zapíše Info logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="properties">Pole vlastností, které bude pøedáno v této logovací zprávì</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Info(this IGLogger logger, IDictionary<object, object> properties, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Info))
            {
                logger.LogFullProperties(GLogLevel.Info, false, null, message, properties, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Info logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="properties">Pole vlastností, které bude pøedáno v této logovací zprávì</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Info(this IGLogger logger, IDictionary<object, object> properties, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Info))
            {
                logger.LogFullProperties(GLogLevel.Info, false, null, message.ToString(), properties, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Info logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Info(this IGLogger logger, Exception exception, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Info))
            {
                logger.LogFull(GLogLevel.Info, false, exception, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Info logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Info(this IGLogger logger, Exception exception, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Info))
            {
                logger.LogFull(GLogLevel.Info, false, exception, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Info logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Info(this IGLogger logger, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Info))
            {
                logger.LogFull(GLogLevel.Info, false, null, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Info logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Info(this IGLogger logger, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Info))
            {
                logger.LogFull(GLogLevel.Info, false, null, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Info logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Info(this IGLogger logger, Func<GLogString> message, params Func<object>[] args)
        {
            if (logger.IsEnabled(GLogLevel.Info))
            {
                string l_sErrMessage = null;
                try
                {
                    var l_oMessage = SafeMessage(message);

                    if (l_oMessage is Exception l_oMsgException)
                    {
                        l_sErrMessage = GResources.GetResourceText(23320011); //RC 23320011 : Pøi logování zprávy došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, l_oMsgException, l_sErrMessage, null);
                        return;     // když nemám žádnou zprávu, nesmím pokraèovat - se získáváním parametrù
                    }

                    // !pozor v pøípadì výjimky vrací jako parametr pøímo výjimku
                    var l_aoParams = SafeParams(args).ToArray();

                    logger.LogFull(GLogLevel.Info, false, null, l_oMessage.ToString(), l_aoParams);

                    foreach (Exception ex in l_aoParams.Where(param => param is Exception))
                    {   // pøípadná výjimka bude zalogována ještì jednou, tentokrát 1. vždy jako Error, 2. s plným stacktrace a Gordickým kontextem
                        l_sErrMessage = GResources.GetResourceText(23320012); //RC 23320012 : Pøi logování parametru došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                    }
                }
                catch (Exception ex)
                {
                    l_sErrMessage = GResources.GetResourceText(23320013); //RC 23320013 : Pøi logování došlo k neošetøené výjimce.
                    logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                }
            }
        }


        /// <summary>
        /// Naformátuje a zapíše Info logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Info(this IGLogger logger, Func<FormattableString> message, params Func<object>[] args)
        {
            if (logger.IsEnabled(GLogLevel.Info))
            {
                string l_sErrMessage = null;
                try
                {
                    var l_oMessage = SafeMessage(message);

                    if (l_oMessage is Exception l_oMsgException)
                    {
                        l_sErrMessage = GResources.GetResourceText(23320011); //RC 23320011 : Pøi logování zprávy došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, l_oMsgException, l_sErrMessage, null);
                        return;     // když nemám žádnou zprávu, nesmím pokraèovat - se získáváním parametrù
                    }

                    // !pozor v pøípadì výjimky vrací jako parametr pøímo výjimku
                    var l_aoParams = SafeParams(args).ToArray();

                    logger.LogFull(GLogLevel.Info, false, null, l_oMessage.ToString(), l_aoParams);

                    foreach (Exception ex in l_aoParams.Where(param => param is Exception))
                    {   // pøípadná výjimka bude zalogována ještì jednou, tentokrát 1. vždy jako Error, 2. s plným stacktrace a Gordickým kontextem
                        l_sErrMessage = GResources.GetResourceText(23320012); //RC 23320012 : Pøi logování parametru došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                    }
                }
                catch (Exception ex)
                {
                    l_sErrMessage = GResources.GetResourceText(23320013); //RC 23320013 : Pøi logování došlo k neošetøené výjimce.
                    logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                }
            }
        }

        #endregion

        #region Warn
        /// <summary>
        /// Naformátuje a zapíše Warn logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Warn(this IGLogger logger, bool secret, Exception exception, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Warn))
            {
                logger.LogFull(GLogLevel.Warn, secret, exception, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Warn logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Warn(this IGLogger logger, bool secret, Exception exception, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Warn))
            {
                logger.LogFull(GLogLevel.Warn, secret, exception, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Warn logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Warn(this IGLogger logger, bool secret, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Warn))
            {
                logger.LogFull(GLogLevel.Warn, secret, null, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Warn logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Warn(this IGLogger logger, bool secret, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Warn))
            {
                logger.LogFull(GLogLevel.Warn, secret, null, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Warn logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="properties">Pole vlastností, které bude pøedáno v této logovací zprávì</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Warn(this IGLogger logger, IDictionary<object, object> properties, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Warn))
            {
                logger.LogFullProperties(GLogLevel.Warn, false, null, message, properties, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Warn logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="properties">Pole vlastností, které bude pøedáno v této logovací zprávì</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Warn(this IGLogger logger, IDictionary<object, object> properties, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Warn))
            {
                logger.LogFullProperties(GLogLevel.Warn, false, null, message.ToString(), properties, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Warn logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Warn(this IGLogger logger, Exception exception, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Warn))
            {
                logger.LogFull(GLogLevel.Warn, false, exception, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Warn logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Warn(this IGLogger logger, Exception exception, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Warn))
            {
                logger.LogFull(GLogLevel.Warn, false, exception, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Warn logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Warn(this IGLogger logger, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Warn))
            {
                logger.LogFull(GLogLevel.Warn, false, null, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Warn logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Warn(this IGLogger logger, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Warn))
            {
                logger.LogFull(GLogLevel.Warn, false, null, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Warn logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Warn(this IGLogger logger, Func<GLogString> message, params Func<object>[] args)
        {
            if (logger.IsEnabled(GLogLevel.Warn))
            {
                string l_sErrMessage = null;
                try
                {
                    var l_oMessage = SafeMessage(message);

                    if (l_oMessage is Exception l_oMsgException)
                    {
                        l_sErrMessage = GResources.GetResourceText(23320011); //RC 23320011 : Pøi logování zprávy došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, l_oMsgException, l_sErrMessage, null);
                        return;     // když nemám žádnou zprávu, nesmím pokraèovat - se získáváním parametrù
                    }

                    // !pozor v pøípadì výjimky vrací jako parametr pøímo výjimku
                    var l_aoParams = SafeParams(args).ToArray();

                    logger.LogFull(GLogLevel.Warn, false, null, l_oMessage.ToString(), l_aoParams);

                    foreach (Exception ex in l_aoParams.Where(param => param is Exception))
                    {   // pøípadná výjimka bude zalogována ještì jednou, tentokrát 1. vždy jako Error, 2. s plným stacktrace a Gordickým kontextem
                        l_sErrMessage = GResources.GetResourceText(23320012); //RC 23320012 : Pøi logování parametru došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                    }
                }
                catch (Exception ex)
                {
                    l_sErrMessage = GResources.GetResourceText(23320013); //RC 23320013 : Pøi logování došlo k neošetøené výjimce.
                    logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                }
            }
        }


        /// <summary>
        /// Naformátuje a zapíše Warn logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Warn(this IGLogger logger, Func<FormattableString> message, params Func<object>[] args)
        {
            if (logger.IsEnabled(GLogLevel.Warn))
            {
                string l_sErrMessage = null;
                try
                {
                    var l_oMessage = SafeMessage(message);

                    if (l_oMessage is Exception l_oMsgException)
                    {
                        l_sErrMessage = GResources.GetResourceText(23320011); //RC 23320011 : Pøi logování zprávy došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, l_oMsgException, l_sErrMessage, null);
                        return;     // když nemám žádnou zprávu, nesmím pokraèovat - se získáváním parametrù
                    }

                    // !pozor v pøípadì výjimky vrací jako parametr pøímo výjimku
                    var l_aoParams = SafeParams(args).ToArray();

                    logger.LogFull(GLogLevel.Warn, false, null, l_oMessage.ToString(), l_aoParams);

                    foreach (Exception ex in l_aoParams.Where(param => param is Exception))
                    {   // pøípadná výjimka bude zalogována ještì jednou, tentokrát 1. vždy jako Error, 2. s plným stacktrace a Gordickým kontextem
                        l_sErrMessage = GResources.GetResourceText(23320012); //RC 23320012 : Pøi logování parametru došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                    }
                }
                catch (Exception ex)
                {
                    l_sErrMessage = GResources.GetResourceText(23320013); //RC 23320013 : Pøi logování došlo k neošetøené výjimce.
                    logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                }
            }
        }

        #endregion

        #region Error
        /// <summary>
        /// Naformátuje a zapíše Error logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Error(this IGLogger logger, bool secret, Exception exception, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Error))
            {
                logger.LogFull(GLogLevel.Error, secret, exception, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Error logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        public static void Error(this IGLogger logger, Exception exception)
        {
            if (logger.IsEnabled(GLogLevel.Error))
            {
                logger.LogFull(GLogLevel.Error, false, exception, "Interní chyba systému");
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Error logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Error(this IGLogger logger, bool secret, Exception exception, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Error))
            {
                logger.LogFull(GLogLevel.Error, secret, exception, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Error logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Error(this IGLogger logger, bool secret, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Error))
            {
                logger.LogFull(GLogLevel.Error, secret, null, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Error logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Error(this IGLogger logger, bool secret, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Error))
            {
                logger.LogFull(GLogLevel.Error, secret, null, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Error logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="properties">Pole vlastností, které bude pøedáno v této logovací zprávì</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Error(this IGLogger logger, IDictionary<object, object> properties, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Error))
            {
                logger.LogFullProperties(GLogLevel.Error, false, null, message, properties, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Error logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="properties">Pole vlastností, které bude pøedáno v této logovací zprávì</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Error(this IGLogger logger, IDictionary<object, object> properties, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Error))
            {
                logger.LogFullProperties(GLogLevel.Error, false, null, message.ToString(), properties, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Error logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Error(this IGLogger logger, Exception exception, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Error))
            {
                logger.LogFull(GLogLevel.Error, false, exception, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Error logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Error(this IGLogger logger, Exception exception, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Error))
            {
                logger.LogFull(GLogLevel.Error, false, exception, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Error logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Error(this IGLogger logger, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Error))
            {
                logger.LogFull(GLogLevel.Error, false, null, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Error logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Error(this IGLogger logger, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Error))
            {
                logger.LogFull(GLogLevel.Error, false, null, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Error logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Error(this IGLogger logger, Func<GLogString> message, params Func<object>[] args)
        {
            if (logger.IsEnabled(GLogLevel.Error))
            {
                string l_sErrMessage = null;
                try
                {
                    var l_oMessage = SafeMessage(message);

                    if (l_oMessage is Exception l_oMsgException)
                    {
                        l_sErrMessage = GResources.GetResourceText(23320011); //RC 23320011 : Pøi logování zprávy došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, l_oMsgException, l_sErrMessage, null);
                        return;     // když nemám žádnou zprávu, nesmím pokraèovat - se získáváním parametrù
                    }

                    // !pozor v pøípadì výjimky vrací jako parametr pøímo výjimku
                    var l_aoParams = SafeParams(args).ToArray();

                    logger.LogFull(GLogLevel.Error, false, null, l_oMessage.ToString(), l_aoParams);

                    foreach (Exception ex in l_aoParams.Where(param => param is Exception))
                    {   // pøípadná výjimka bude zalogována ještì jednou, tentokrát 1. vždy jako Error, 2. s plným stacktrace a Gordickým kontextem
                        l_sErrMessage = GResources.GetResourceText(23320012); //RC 23320012 : Pøi logování parametru došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                    }
                }
                catch (Exception ex)
                {
                    l_sErrMessage = GResources.GetResourceText(23320013); //RC 23320013 : Pøi logování došlo k neošetøené výjimce.
                    logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                }
            }
        }


        /// <summary>
        /// Naformátuje a zapíše Error logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Error(this IGLogger logger, Func<FormattableString> message, params Func<object>[] args)
        {
            if (logger.IsEnabled(GLogLevel.Error))
            {
                string l_sErrMessage = null;
                try
                {
                    var l_oMessage = SafeMessage(message);

                    if (l_oMessage is Exception l_oMsgException)
                    {
                        l_sErrMessage = GResources.GetResourceText(23320011); //RC 23320011 : Pøi logování zprávy došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, l_oMsgException, l_sErrMessage, null);
                        return;     // když nemám žádnou zprávu, nesmím pokraèovat - se získáváním parametrù
                    }

                    // !pozor v pøípadì výjimky vrací jako parametr pøímo výjimku
                    var l_aoParams = SafeParams(args).ToArray();

                    logger.LogFull(GLogLevel.Error, false, null, l_oMessage.ToString(), l_aoParams);

                    foreach (Exception ex in l_aoParams.Where(param => param is Exception))
                    {   // pøípadná výjimka bude zalogována ještì jednou, tentokrát 1. vždy jako Error, 2. s plným stacktrace a Gordickým kontextem
                        l_sErrMessage = GResources.GetResourceText(23320012); //RC 23320012 : Pøi logování parametru došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                    }
                }
                catch (Exception ex)
                {
                    l_sErrMessage = GResources.GetResourceText(23320013); //RC 23320013 : Pøi logování došlo k neošetøené výjimce.
                    logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                }
            }
        }

        #endregion

        #region Fatal

        /// <summary>
        /// Naformátuje a zapíše Fatal logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Fatal(this IGLogger logger, bool secret, Exception exception, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Fatal))
            {
                logger.LogFull(GLogLevel.Fatal, secret, exception, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Fatal logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Fatal(this IGLogger logger, bool secret, Exception exception, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Fatal))
            {
                logger.LogFull(GLogLevel.Fatal, secret, exception, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Fatal logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Fatal(this IGLogger logger, bool secret, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Fatal))
            {
                logger.LogFull(GLogLevel.Fatal, secret, null, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Fatal logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Fatal(this IGLogger logger, bool secret, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Fatal))
            {
                logger.LogFull(GLogLevel.Fatal, secret, null, message.ToString(), args);
            }
        }


        /// <summary>
        /// Naformátuje a zapíše Fatal logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="properties">Pole vlastností, které bude pøedáno v této logovací zprávì</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Fatal(this IGLogger logger, IDictionary<object, object> properties, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Fatal))
            {
                logger.LogFullProperties(GLogLevel.Fatal, false, null, message, properties, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Fatal logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="properties">Pole vlastností, které bude pøedáno v této logovací zprávì</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Fatal(this IGLogger logger, IDictionary<object, object> properties, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Fatal))
            {
                logger.LogFullProperties(GLogLevel.Fatal, false, null, message.ToString(), properties, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Fatal logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Fatal(this IGLogger logger, Exception exception, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Fatal))
            {
                logger.LogFull(GLogLevel.Fatal, false, exception, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Fatal logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Fatal(this IGLogger logger, Exception exception, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Fatal))
            {
                logger.LogFull(GLogLevel.Fatal, false, exception, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Fatal logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Fatal(this IGLogger logger, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Fatal))
            {
                logger.LogFull(GLogLevel.Fatal, false, null, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Fatal logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Fatal(this IGLogger logger, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Fatal))
            {
                logger.LogFull(GLogLevel.Fatal, false, null, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Fatal logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Fatal(this IGLogger logger, Func<GLogString> message, params Func<object>[] args)
        {
            if (logger.IsEnabled(GLogLevel.Fatal))
            {
                string l_sErrMessage = null;
                try
                {
                    var l_oMessage = SafeMessage(message);

                    if (l_oMessage is Exception l_oMsgException)
                    {
                        l_sErrMessage = GResources.GetResourceText(23320011); //RC 23320011 : Pøi logování zprávy došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, l_oMsgException, l_sErrMessage, null);
                        return;     // když nemám žádnou zprávu, nesmím pokraèovat - se získáváním parametrù
                    }

                    // !pozor v pøípadì výjimky vrací jako parametr pøímo výjimku
                    var l_aoParams = SafeParams(args).ToArray();

                    logger.LogFull(GLogLevel.Fatal, false, null, l_oMessage.ToString(), l_aoParams);

                    foreach (Exception ex in l_aoParams.Where(param => param is Exception))
                    {   // pøípadná výjimka bude zalogována ještì jednou, tentokrát 1. vždy jako Error, 2. s plným stacktrace a Gordickým kontextem
                        l_sErrMessage = GResources.GetResourceText(23320012); //RC 23320012 : Pøi logování parametru došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                    }
                }
                catch (Exception ex)
                {
                    l_sErrMessage = GResources.GetResourceText(23320013); //RC 23320013 : Pøi logování došlo k neošetøené výjimce.
                    logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                }
            }
        }


        /// <summary>
        /// Naformátuje a zapíše Fatal logovací zprávu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Fatal(this IGLogger logger, Func<FormattableString> message, params Func<object>[] args)
        {
            if (logger.IsEnabled(GLogLevel.Fatal))
            {
                string l_sErrMessage = null;
                try
                {
                    var l_oMessage = SafeMessage(message);

                    if (l_oMessage is Exception l_oMsgException)
                    {
                        l_sErrMessage = GResources.GetResourceText(23320011); //RC 23320011 : Pøi logování zprávy došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, l_oMsgException, l_sErrMessage, null);
                        return;     // když nemám žádnou zprávu, nesmím pokraèovat - se získáváním parametrù
                    }

                    // !pozor v pøípadì výjimky vrací jako parametr pøímo výjimku
                    var l_aoParams = SafeParams(args).ToArray();

                    logger.LogFull(GLogLevel.Fatal, false, null, l_oMessage.ToString(), l_aoParams);

                    foreach (Exception ex in l_aoParams.Where(param => param is Exception))
                    {   // pøípadná výjimka bude zalogována ještì jednou, tentokrát 1. vždy jako Error, 2. s plným stacktrace a Gordickým kontextem
                        l_sErrMessage = GResources.GetResourceText(23320012); //RC 23320012 : Pøi logování parametru došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                    }
                }
                catch (Exception ex)
                {
                    l_sErrMessage = GResources.GetResourceText(23320013); //RC 23320013 : Pøi logování došlo k neošetøené výjimce.
                    logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                }
            }
        }

        #endregion

        #region Log
        /// <summary>
        /// Naformátuje a zapíše logovací zprávu na zadané úrovni
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="logLevel">Úroveò závažnosti logovací zprávy</param>
        /// <param name="message">Format string of the log message.</param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Log(this IGLogger logger, GLogLevel logLevel, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(logLevel))
            {
                logger.LogFull(logLevel, false, null, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše logovací zprávu na zadané úrovni
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="logLevel">Úroveò závažnosti logovací zprávy</param>
        /// <param name="message">Format string of the log message.</param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Log(this IGLogger logger, GLogLevel logLevel, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(logLevel))
            {
                logger.LogFull(logLevel, false, null, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše logovací zprávu na zadané úrovni
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="logLevel">Úroveò závažnosti logovací zprávy</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="message">format string of the log message.</param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Log(this IGLogger logger, GLogLevel logLevel, bool secret, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(logLevel))
            {
                logger.LogFull(logLevel, secret, null, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše logovací zprávu na zadané úrovni
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="logLevel">Úroveò závažnosti logovací zprávy</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="message">format string of the log message.</param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Log(this IGLogger logger, GLogLevel logLevel, bool secret, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(logLevel))
            {
                logger.LogFull(logLevel, secret, null, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše logovací zprávu na zadané úrovni
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="logLevel">Úroveò závažnosti logovací zprávy</param>
        /// <param name="properties">Pole vlastností, které bude pøedáno v této logovací zprávì</param>
        /// <param name="message">format string of the log message.</param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Log(this IGLogger logger, GLogLevel logLevel, IDictionary<object, object> properties, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(logLevel))
            {
                logger.LogFullProperties(logLevel, false, null, message, properties, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše logovací zprávu na zadané úrovni
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="logLevel">Úroveò závažnosti logovací zprávy</param>
        /// <param name="properties">Pole vlastností, které bude pøedáno v této logovací zprávì</param>
        /// <param name="message">format string of the log message.</param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Log(this IGLogger logger, GLogLevel logLevel, IDictionary<object, object> properties, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(logLevel))
            {
                logger.LogFullProperties(logLevel, false, null, message.ToString(), properties, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše logovací zprávu na zadané úrovni
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="logLevel">Úroveò závažnosti logovací zprávy</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Format string of the log message.</param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Log(this IGLogger logger, GLogLevel logLevel, Exception exception, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(logLevel))
            {
                logger.LogFull(logLevel, false, exception, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše logovací zprávu na zadané úrovni
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="logLevel">Úroveò závažnosti logovací zprávy</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Format string of the log message.</param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Log(this IGLogger logger, GLogLevel logLevel, Exception exception, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(logLevel))
            {
                logger.LogFull(logLevel, false, exception, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše logovací zprávu na zadané úrovni
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="logLevel">Úroveò závažnosti logovací zprávy</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Format string of the log message.</param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Log(this IGLogger logger, GLogLevel logLevel, bool secret, Exception exception, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(logLevel))
            {
                logger.LogFull(logLevel, secret, exception, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše logovací zprávu na zadané úrovni
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="logLevel">Úroveò závažnosti logovací zprávy</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Format string of the log message.</param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Log(this IGLogger logger, GLogLevel logLevel, bool secret, Exception exception, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(logLevel))
            {
                logger.LogFull(logLevel, secret, exception, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše logovací zprávu na zadané úrovni
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="logLevel">Úroveò závažnosti logovací zprávy</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Log(this IGLogger logger, GLogLevel logLevel, Func<GLogString> message, params Func<object>[] args)
        {
            if (logger.IsEnabled(logLevel))
            {
                string l_sErrMessage = null;
                try
                {
                    var l_oMessage = SafeMessage(message);

                    if (l_oMessage is Exception l_oMsgException)
                    {
                        l_sErrMessage = GResources.GetResourceText(23320011); //RC 23320011 : Pøi logování zprávy došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, l_oMsgException, l_sErrMessage, null);
                        return;     // když nemám žádnou zprávu, nesmím pokraèovat - se získáváním parametrù
                    }

                    // !pozor v pøípadì výjimky vrací jako parametr pøímo výjimku
                    var l_aoParams = SafeParams(args).ToArray();

                    logger.LogFull(logLevel, false, null, l_oMessage.ToString(), l_aoParams);

                    foreach (Exception ex in l_aoParams.Where(param => param is Exception))
                    {   // pøípadná výjimka bude zalogována ještì jednou, tentokrát 1. vždy jako Error, 2. s plným stacktrace a Gordickým kontextem
                        l_sErrMessage = GResources.GetResourceText(23320012); //RC 23320012 : Pøi logování parametru došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                    }
                }
                catch (Exception ex)
                {
                    l_sErrMessage = GResources.GetResourceText(23320013); //RC 23320013 : Pøi logování došlo k neošetøené výjimce.
                    logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                }
            }
        }

        /// <summary>
        /// Naformátuje a zapíše logovací zprávu na zadané úrovni
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="logLevel">Úroveò závažnosti logovací zprávy</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        public static void Log(this IGLogger logger, GLogLevel logLevel, Func<FormattableString> message, params Func<object>[] args)
        {
            if (logger.IsEnabled(logLevel))
            {
                string l_sErrMessage = null;
                try
                {
                    var l_oMessage = SafeMessage(message);

                    if (l_oMessage is Exception l_oMsgException)
                    {
                        l_sErrMessage = GResources.GetResourceText(23320011); //RC 23320011 : Pøi logování zprávy došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, l_oMsgException, l_sErrMessage, null);
                        return;     // když nemám žádnou zprávu, nesmím pokraèovat - se získáváním parametrù
                    }

                    // !pozor v pøípadì výjimky vrací jako parametr pøímo výjimku
                    var l_aoParams = SafeParams(args).ToArray();

                    logger.LogFull(logLevel, false, null, l_oMessage.ToString(), l_aoParams);

                    foreach (Exception ex in l_aoParams.Where(param => param is Exception))
                    {   // pøípadná výjimka bude zalogována ještì jednou, tentokrát 1. vždy jako Error, 2. s plným stacktrace a Gordickým kontextem
                        l_sErrMessage = GResources.GetResourceText(23320012); //RC 23320012 : Pøi logování parametru došlo k výjimce.
                        logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                    }
                }
                catch (Exception ex)
                {
                    l_sErrMessage = GResources.GetResourceText(23320013); //RC 23320013 : Pøi logování došlo k neošetøené výjimce.
                    logger.LogFull(GLogLevel.Error, false, ex, l_sErrMessage, null);
                }
            }
        }

        #endregion

        #region ConditionalDebug

        /// <summary>
        /// Naformátuje a zapíše Debug logovací zprávu, když je nastaven DEBUG symbol pøekladaèe
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        [Conditional("DEBUG")]
        public static void ConditionalDebug(this IGLogger logger, bool secret, Exception exception, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Debug))
            {
                logger.LogFull(GLogLevel.Debug, secret, exception, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Debug logovací zprávu, když je nastaven DEBUG symbol pøekladaèe
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        [Conditional("DEBUG")]
        public static void ConditionalDebug(this IGLogger logger, bool secret, Exception exception, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Debug))
            {
                logger.LogFull(GLogLevel.Debug, secret, exception, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Debug logovací zprávu, když je nastaven DEBUG symbol pøekladaèe
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        [Conditional("DEBUG")]
        public static void ConditionalDebug(this IGLogger logger, bool secret, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Debug))
            {
                logger.LogFull(GLogLevel.Debug, secret, null, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Debug logovací zprávu, když je nastaven DEBUG symbol pøekladaèe
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        [Conditional("DEBUG")]
        public static void ConditionalDebug(this IGLogger logger, bool secret, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Debug))
            {
                logger.LogFull(GLogLevel.Debug, secret, null, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Debug logovací zprávu, když je nastaven DEBUG symbol pøekladaèe
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        [Conditional("DEBUG")]
        public static void ConditionalDebug(this IGLogger logger, Exception exception, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Debug))
            {
                logger.LogFull(GLogLevel.Debug, false, exception, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Debug logovací zprávu, když je nastaven DEBUG symbol pøekladaèe
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        [Conditional("DEBUG")]
        public static void ConditionalDebug(this IGLogger logger, Exception exception, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Debug))
            {
                logger.LogFull(GLogLevel.Debug, false, exception, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Debug logovací zprávu, když je nastaven DEBUG symbol pøekladaèe
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        [Conditional("DEBUG")]
        public static void ConditionalDebug(this IGLogger logger, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Debug))
            {
                logger.LogFull(GLogLevel.Debug, false, null, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Debug logovací zprávu, když je nastaven DEBUG symbol pøekladaèe
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        [Conditional("DEBUG")]
        public static void ConditionalDebug(this IGLogger logger, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Debug))
            {
                logger.LogFull(GLogLevel.Debug, false, null, message.ToString(), args);
            }
        }
        #endregion

        #region ConditionalTrace

        /// <summary>
        /// Naformátuje a zapíše Trace logovací zprávu, když je nastaven DEBUG symbol pøekladaèe
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        [Conditional("DEBUG")]
        public static void ConditionalTrace(this IGLogger logger, bool secret, Exception exception, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Trace))
            {
                logger.LogFull(GLogLevel.Trace, secret, exception, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Trace logovací zprávu, když je nastaven DEBUG symbol pøekladaèe
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        [Conditional("DEBUG")]
        public static void ConditionalTrace(this IGLogger logger, bool secret, Exception exception, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Trace))
            {
                logger.LogFull(GLogLevel.Trace, secret, exception, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Trace logovací zprávu, když je nastaven DEBUG symbol pøekladaèe
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        [Conditional("DEBUG")]
        public static void ConditionalTrace(this IGLogger logger, bool secret, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Trace))
            {
                logger.LogFull(GLogLevel.Trace, secret, null, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Trace logovací zprávu, když je nastaven DEBUG symbol pøekladaèe
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        [Conditional("DEBUG")]
        public static void ConditionalTrace(this IGLogger logger, bool secret, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Trace))
            {
                logger.LogFull(GLogLevel.Trace, secret, null, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Trace logovací zprávu, když je nastaven DEBUG symbol pøekladaèe
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        [Conditional("DEBUG")]
        public static void ConditionalTrace(this IGLogger logger, Exception exception, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Trace))
            {
                logger.LogFull(GLogLevel.Trace, false, exception, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Trace logovací zprávu, když je nastaven DEBUG symbol pøekladaèe
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        [Conditional("DEBUG")]
        public static void ConditionalTrace(this IGLogger logger, Exception exception, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Trace))
            {
                logger.LogFull(GLogLevel.Trace, false, exception, message.ToString(), args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Trace logovací zprávu, když je nastaven DEBUG symbol pøekladaèe
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        [Conditional("DEBUG")]
        public static void ConditionalTrace(this IGLogger logger, GLogString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Trace))
            {
                logger.LogFull(GLogLevel.Trace, false, null, message, args);
            }
        }

        /// <summary>
        /// Naformátuje a zapíše Trace logovací zprávu, když je nastaven DEBUG symbol pøekladaèe
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy ve formátu 1) message template nebo 2) tradièní formátovací øetìzec. Ukázka 1) message template: <code>"Uživatel {User} se pøihlásil z adresy {Address}"</code> Ukázka 2) tradièní formátovací øetìzec: <code>"Uživatel {0} se pøihlásil z adresy {1}"</code></param>
        /// <param name="args">Pole objektù, které se použije pøi formátování (mùže být prázdné)</param>
        [Conditional("DEBUG")]
        public static void ConditionalTrace(this IGLogger logger, FormattableString message, params object[] args)
        {
            if (logger.IsEnabled(GLogLevel.Trace))
            {
                logger.LogFull(GLogLevel.Trace, false, null, message.ToString(), args);
            }
        }
        #endregion

        #region Scope
        ///// <summary>
        ///// Nastaví do logického kontextu vlastní hodnotu <paramref name="traceId"/>.
        ///// </summary>
        ///// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        ///// <param name="traceId">Hodnota definující kompletní zanoøení</param>
        ///// <param name="traceparent">Hodnota kvùli trasování</param>
        ///// <param name="tracestate">Hodnota kvùli trasování</param>
        ///// <returns>Disposable objek, který se uvolní ze zásobníku pøi volání dispose.</returns>
        //[System.Security.SecuritySafeCritical]
        //public static IDisposable SetTrace(this IGLogger logger, string traceId, string traceparent, string tracestate)
        //{
        //    return GScopeStack.SetTrace(logger, traceId, traceparent, tracestate);
        //}
/*
        /// <summary>
        /// Uloží do logického kontextu novou hodnotu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="scope">Hodnota urèující aktuální scope</param>
        /// <returns>Disposable objek <see cref="GScope"/>, který se uvolní ze zásobníku pøi volání dispose.</returns>
        [System.Security.SecuritySafeCritical]
        public static GScope CreateScope(this IGLogger logger, string scope)
        {
            return GScopeLogic.CreateScope(logger, scope);
        }

        /// <summary>
        /// Uloží do logického kontextu novou hodnotu
        /// </summary>
        /// <param name="logger">Zdroj logovací zprávy <see cref="IGLogger"/>, který bude použit pøi zápisu logu</param>
        /// <param name="scope">Hodnota urèující aktuální scope</param>
        /// <param name="metric">Hodnota urèující aktuálnì použitý identifikátor metriky (pokud je nastaven bude se mìøit a logovat výsledný èas)</param>
        /// <param name="message">Volitelná zpráva, která se zapíše do logu</param>
        /// <param name="parameters">Volitelné parametry, které se zapíší do logu</param>
        /// <returns>Disposable objek <see cref="GScope"/>, který se uvolní ze zásobníku pøi volání dispose.</returns>
        [System.Security.SecuritySafeCritical]
        public static GScope CreateScope(this IGLogger logger, string scope, string metric, string message = null, params string[] parameters)
        {
            return GScopeLogic.CreateScope(logger, scope, metric, message, parameters);
        }
*/        
        #endregion

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

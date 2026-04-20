//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GLoggerInt.cs                                </Name>
//    <Description> Pøedstavuje interní implementaci tøídy <see cref="IGLogger"/></Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-09-21                                                  </Created>
//  </FileHeader>


// tento pøepínaè je možné zapnout kvùli testování pro celý Gordic.General - zapnutý znamená napojení našich logovacích objektù na MS_EL / vypnutý znamená, že se nesmí použít (ani reference ?)
#if MS_EXTENSIONS_LOGGING
using Microsoft.Extensions.Logging;
//using Microsoft.Extensions.Internal;
#endif
using NLog;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Web;

namespace Gordic.General
{
    /// <summary>
    /// Pøedstavuje interní implementaci tøídy <see cref="IGLogger"/>
    /// </summary>
    [System.Diagnostics.DebuggerTypeProxy(typeof(GDebugView))]
    [System.Diagnostics.DebuggerDisplay("Logger {Logger.Name,nq}")]
    internal class GLoggerInt : IGLoggerInt
    {
        // díky vlastnosti readonly - mìlo by být thread safe (stejnì bez zámkù je i NLog.LogManager)

        private readonly NLog.Logger m_oLogger;    // volatile a readonly zároveò - to není možné

        [System.Diagnostics.DebuggerBrowsable(System.Diagnostics.DebuggerBrowsableState.RootHidden)]
        public NLog.Logger Logger
        {
            get { return m_oLogger; }
            //set { m_oLogger = value; }
        }

        internal GLoggerInt(NLog.Logger logger)
        {
            m_oLogger = logger;
        }

#if MS_EXTENSIONS_LOGGING
        /// <inheritdoc />
        IDisposable ILogger.BeginScope<TState>(TState state)
        {
            return _logger.BeginScope(state);
        }
#else
        /*IDisposable IGLogger.BeginScope<TState>(TState state)
        {
            return null;
         //   return _logger.BeginScope(state);
        }*/
#endif
        bool IGLogger.IsEnabled(GLogLevel logLevel)
        {
            return m_oLogger.IsEnabled(NLog.LogLevel.FromOrdinal(logLevel.Ordinal));
            //return _logger.IsEnabled(logLevel);
        }

        /// <summary>
        /// Gets a value indicating whether logging is enabled for the <c>Trace</c> level.
        /// </summary>
        /// <returns>A value of <see langword="true" /> if logging is enabled for the <c>Trace</c> level, otherwise it returns <see langword="false" />.</returns>
        public bool IsTraceEnabled {
#if MS_EXTENSIONS_LOGGING
            get { return _logger.IsEnabled( LogLevel.Trace ); }
#else
            get { return m_oLogger.IsTraceEnabled; }
#endif
        }

        /// <summary>
        /// Gets a value indicating whether logging is enabled for the <c>Debug</c> level.
        /// </summary>
        /// <returns>A value of <see langword="true" /> if logging is enabled for the <c>Debug</c> level, otherwise it returns <see langword="false" />.</returns>
        public bool IsDebugEnabled {
#if MS_EXTENSIONS_LOGGING
            get { return _logger.IsEnabled( LogLevel.Debug ); }
#else
            get { return m_oLogger.IsDebugEnabled; }
#endif
        }

        /// <summary>
        /// Gets a value indicating whether logging is enabled for the <c>Info</c> level.
        /// </summary>
        /// <returns>A value of <see langword="true" /> if logging is enabled for the <c>Info</c> level, otherwise it returns <see langword="false" />.</returns>
        public bool IsInfoEnabled {
#if MS_EXTENSIONS_LOGGING
            get { return _logger.IsEnabled( LogLevel.Information); }
#else
            get { return m_oLogger.IsInfoEnabled; }
#endif
        }
        /// <summary>
        /// Gets a value indicating whether logging is enabled for the <c>Warn</c> level.
        /// </summary>
        /// <returns>A value of <see langword="true" /> if logging is enabled for the <c>Warn</c> level, otherwise it returns <see langword="false" />.</returns>
        public bool IsWarnEnabled
        {
#if MS_EXTENSIONS_LOGGING
            get { return _logger.IsEnabled( LogLevel.Warning); }
#else
            get { return m_oLogger.IsWarnEnabled; }
#endif
        }
        /// <summary>
        /// Gets a value indicating whether logging is enabled for the <c>Error</c> level.
        /// </summary>
        /// <returns>A value of <see langword="true" /> if logging is enabled for the <c>Error</c> level, otherwise it returns <see langword="false" />.</returns>
        public bool IsErrorEnabled
        {
#if MS_EXTENSIONS_LOGGING
            get { return _logger.IsEnabled( LogLevel.Error); }
#else
            get { return m_oLogger.IsErrorEnabled; }
#endif
        }
        /// <summary>
        /// Gets a value indicating whether logging is enabled for the <c>Fatal</c> level.
        /// </summary>
        /// <returns>A value of <see langword="true" /> if logging is enabled for the <c>Fatal</c> level, otherwise it returns <see langword="false" />.</returns>
        public bool IsFatalEnabled
        {
#if MS_EXTENSIONS_LOGGING
            get { return _logger.IsEnabled( LogLevel.Critical); }
#else
            get { return m_oLogger.IsFatalEnabled; }
#endif
        }




#if MS_EXTENSIONS_LOGGING
        /// <inheritdoc />
        bool ILogger.IsEnabled(LogLevel logLevel)
        {
            return _logger.IsEnabled(logLevel);
        }
#endif

        // zmìnìn název z Log na LogFull, aby nedocházelo ke kolizím s metodou Log (a aby lidi používali spíše metodu Log)

        /// <summary>
        /// Zformátuje a zapíše logovací zprávu na zadané logovací úrovni
        /// </summary>
        /// <param name="logLevel">Záznam bude zapsán s toutu logovací úrovní</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy</param>
        /// <param name="args">Pole objektù, které obsahuje 0 nebo více objektù, které budou využity pøi formátování zprávy</param>
        public void LogFull(GLogLevel logLevel, bool secret, Exception exception, string message, params object[] args)
        {
            var l_nLevel = NLog.LogLevel.FromOrdinal(logLevel.Ordinal);
            /*tady už je test zbyteèný - dìlá se pøímo v extension metodách
            if (m_oLogger.IsEnabled(l_nLevel))
            {*/

            //var l_sCallClass = GetCallClass();
            //if (exception != null)    
            //    message = NLogExceptionText(exception); // u výjimky mùžeme použít message, žádné message a parameters se totiž u výjimkových pøetížení nepoužívají
            if (exception != null)          // rychlý test (bez pøetypování), velmi èasto to vùbec neprojede dál
                message = GLogComposer.ResultExceptionMessage(exception, message, GLogContext.ApplicationInfo, GLogContext.Configuration, GLogContext.LoginInfo, GLogContext.SessionInfo);

            var l_oLogEvent = new NLog.LogEventInfo(l_nLevel, m_oLogger.Name, CultureInfo.CurrentCulture, message, args);

            // nové kódování se kvùli výkonu provádí pouze u souboru, až v okamžiku zápisu ${gcondencode:inner=${message}}
            m_oLogger.Log(secret, l_oLogEvent);     // moje extension metoda    // parametr secret nastaví jen property

            /*}*/
            //if (!secret)
            //    m_oLogger.Log(l_nLevel, exception, message, args);
            //else
            //    // TODO: doplnit secret a exception
            //    m_oLogger.Log(l_nLevel, exception, message, args);
        }

        /// <summary>
        /// Zformátuje a zapíše logovací zprávu na zadané logovací úrovni
        /// </summary>
        /// <param name="logLevel">Záznam bude zapsán s toutu logovací úrovní</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy</param>
        /// <param name="properties">Pole vlastností, které bude pøedáno v této logovací zprávì</param>
        /// <param name="args">Pole objektù, které obsahuje 0 nebo více objektù, které budou využity pøi formátování zprávy</param>
        public void LogFullProperties(GLogLevel logLevel, bool secret, Exception exception, string message, IDictionary<object, object> properties, params object[] args)
        {
            var l_nLevel = NLog.LogLevel.FromOrdinal(logLevel.Ordinal);
            /*tady už je test zbyteèný - dìlá se pøímo v extension metodách
            if (m_oLogger.IsEnabled(l_nLevel))
            {*/

            //var l_sCallClass = GetCallClass();
            //if (exception != null)    
            //    message = NLogExceptionText(exception); // u výjimky mùžeme použít message, žádné message a parameters se totiž u výjimkových pøetížení nepoužívají
            if (exception != null)          // rychlý test (bez pøetypování), velmi èasto to vùbec neprojede dál
                message = GLogComposer.ResultExceptionMessage(exception, message, GLogContext.ApplicationInfo, GLogContext.Configuration, GLogContext.LoginInfo, GLogContext.SessionInfo);

            var l_oLogEvent = new NLog.LogEventInfo(l_nLevel, m_oLogger.Name, CultureInfo.CurrentCulture, message, args);

            foreach (var property in properties)
            {
                l_oLogEvent.Properties.Add(property);
            }

            //taky nefunguje l_oLogEvent.Properties.Union(properties);            
            //pøidalo divne jen jednu vlastnost l_oLogEvent.Properties.Add(properties.Keys, properties.Values);

            // nové kódování se kvùli výkonu provádí pouze u souboru, až v okamžiku zápisu ${gcondencode:inner=${message}}
            m_oLogger.Log(secret, l_oLogEvent);     // moje extension metoda    // parametr secret nastaví jen property

            /*}*/
            //if (!secret)
            //    m_oLogger.Log(l_nLevel, exception, message, args);
            //else
            //    // TODO: doplnit secret a exception
            //    m_oLogger.Log(l_nLevel, exception, message, args);
        }

        //void IGLogger.Log<TState>(GLogLevel logLevel, GEventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        //{
        //   m_oLogger.Log(NLog.LogLevel.FromOrdinal(logLevel.Ordinal), state, exception, formatter);
        //    //_logger.Log(logLevel, eventId, state, exception, formatter);
        //}

#if MS_EXTENSIONS_LOGGING
        /// <inheritdoc />
        void ILogger.Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            _logger.Log(logLevel, eventId, state, exception, formatter);
        }
#endif

        internal class GDebugView
        {
            private readonly GLoggerInt l;
            public GDebugView(GLoggerInt l) { this.l = l; }
            public string Name => l.Logger.Name;
            public bool IsFatalEnabled => l.Logger.IsFatalEnabled;
            public bool IsErrorEnabled => l.Logger.IsErrorEnabled;
            public bool IsWarnEnabled => l.Logger.IsWarnEnabled;
            public bool IsInfoEnabled => l.Logger.IsInfoEnabled;
            public bool IsDebugEnabled => l.Logger.IsDebugEnabled;
            public bool IsTraceEnabled => l.Logger.IsTraceEnabled;
        }
    }
}

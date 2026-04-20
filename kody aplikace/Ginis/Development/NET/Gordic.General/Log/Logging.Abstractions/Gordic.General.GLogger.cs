//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GLoggerInt.cs                                </Name>
//    <Description> Pøedstavuje interní implementaci tøídy <see cref="IGLogger"/></Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-09-21                                                  </Created>
//  </FileHeader>

// MP pøídavek
#define NET45

// tento pøepínaè je možné zapnout kvùli testování pro celý Gordic.General - zapnutý znamená napojení našich logovacích objektù na MS_EL / vypnutý znamená, že se nesmí použít (ani reference ?)
#if MS_EXTENSIONS_LOGGING
using Microsoft.Extensions.Logging;
//using Microsoft.Extensions.Internal;
#endif
using NLog;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
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
    [System.Security.SecuritySafeCritical]

    public class GLogger : IGLogger/*IGLoggerInt, IGNestedDomain, */, IGObject 
    {
        // díky vlastnosti readonly - mìlo by být thread safe (stejnì bez zámkù je i NLog.LogManager)

        private readonly NLog.Logger m_oLogger;    // volatile a readonly zároveò - to není možné

        [System.Diagnostics.DebuggerBrowsable(System.Diagnostics.DebuggerBrowsableState.RootHidden)]
        internal NLog.Logger Logger
        {
            get { return m_oLogger; }
            //set { m_oLogger = value; }
        }

        internal GLogger(NLog.Logger logger)
        {
            m_oLogger = logger;
        }

        /// <summary>
        /// Urèuje, zda je zadaná úroveò <paramref name="logLevel"/> zapnutá pro tento <see cref="IGLogger"/>
        /// </summary>
        /// <param name="logLevel">Logovací úroveò, která se kontroluje</param>
        /// <returns><c>true</c> v pøípadì zapnutí úrovnì</returns>
        public bool IsEnabled(GLogLevel logLevel)
        {
            return m_oLogger.IsEnabled(NLog.LogLevel.FromOrdinal(logLevel.Ordinal));
            //return _logger.IsEnabled(logLevel);
        }

#if MS_EXTENSIONS_LOGGING
        /// <inheritdoc />
        bool ILogger.IsEnabled(LogLevel logLevel)
        {
            return _logger.IsEnabled(logLevel);
        }
#endif

        #region Push Contextu

        ///// <summary>
        ///// Updates the <see cref="GScopeContext"/> with provided property
        ///// </summary>
        ///// <param name="propertyName">Name of property</param>
        ///// <param name="propertyValue">Value of property</param>
        ///// <returns>A disposable object that removes the properties from logical context scope on dispose.</returns>
        ///// <remarks><see cref="GScopeContext"/> property-dictionary-keys are case-insensitive</remarks>
        //[System.Security.SecuritySafeCritical]
        //public IDisposable PushScopeProperty(string propertyName, object propertyValue)
        //{
        //    return GScopeContext.PushProperty(propertyName, propertyValue);
        //}

        ///// <summary>
        ///// Updates the <see cref="GScopeContext"/> with provided property
        ///// </summary>
        ///// <param name="propertyName">Name of property</param>
        ///// <param name="propertyValue">Value of property</param>
        ///// <returns>A disposable object that removes the properties from logical context scope on dispose.</returns>
        ///// <remarks><see cref="GScopeContext"/> property-dictionary-keys are case-insensitive</remarks>
        //[System.Security.SecuritySafeCritical]
        //public IDisposable PushScopeProperty<TValue>(string propertyName, TValue propertyValue)
        //{
        //    return GScopeContext.PushProperty(propertyName, propertyValue);
        //}

#if !NET35 && !NET40
        ///// <summary>
        ///// Updates the <see cref="GScopeContext"/> with provided properties
        ///// </summary>
        ///// <param name="scopeProperties">Properties being added to the scope dictionary</param>
        ///// <returns>A disposable object that removes the properties from logical context scope on dispose.</returns>
        ///// <remarks><see cref="GScopeContext"/> property-dictionary-keys are case-insensitive</remarks>
        //[System.Security.SecuritySafeCritical]
        //public IDisposable PushScopeProperties(IReadOnlyCollection<KeyValuePair<string, object>> scopeProperties)
        //{
        //    return GScopeContext.PushProperties(scopeProperties);
        //}

        ///// <summary>
        ///// Updates the <see cref="GScopeContext"/> with provided properties
        ///// </summary>
        ///// <param name="scopeProperties">Properties being added to the scope dictionary</param>
        ///// <returns>A disposable object that removes the properties from logical context scope on dispose.</returns>
        ///// <remarks><see cref="GScopeContext"/> property-dictionary-keys are case-insensitive</remarks>
        //[System.Security.SecuritySafeCritical]
        //public IDisposable PushScopeProperties<TValue>(IReadOnlyCollection<KeyValuePair<string, TValue>> scopeProperties)
        //{
        //    return GScopeContext.PushProperties(scopeProperties);
        //}
#endif

        // metody pro SCOPE pøesunuty do GLoggerExtensions
#if OLD_NOT_USED
        /// <summary>
        /// Uloží do logického kontextu novou hodnotu
        /// </summary>
        /// <param name="scope">Hodnota urèující aktuální scope</param>
        /// <param name="metric">Hodnota urèující aktuálnì použitý identifikátor metriky</param>
        /// <param name="timer">Umožòuje pøidat mìøení èasu díky èasovaèi</param>
        /// <returns>Disposable objek, který se uvolní ze zásobníku pøi volání dispose.</returns>
        [System.Security.SecuritySafeCritical]
        public IDisposable PushValue<T>(T scope, string metric, bool timer = false)
        {
            return GScopeStack.PushValue<T>(this, scope, metric, timer);
        }

        /// <summary>
        /// Uloží do logického kontextu novou hodnotu
        /// </summary>
        /// <param name="scope">Hodnota urèující aktuální scope</param>
        /// <param name="metric">Hodnota urèující aktuálnì použitý identifikátor metriky</param>
        /// <param name="timer">Umožòuje pøidat mìøení èasu díky èasovaèi</param>
        /// <returns>Disposable objek, který se uvolní ze zásobníku pøi volání dispose.</returns>
        [System.Security.SecuritySafeCritical]
        public IDisposable PushValue(string scope, string metric, bool timer = false)
        {
            return GScopeStack.PushValue(this, scope, metric, timer);
        }

        /// <summary>
        /// Uloží do logického kontextu novou hodnotu
        /// </summary>
        /// <param name="scope">Hodnota urèující aktuální scope</param>
        /// <param name="metric">Hodnota urèující aktuálnì použitý identifikátor metriky</param>
        /// <param name="message">Volitelná zpráva, která se zapíše do logu</param>
        /// <param name="timer">Umožòuje pøidat mìøení èasu díky èasovaèi</param>
        /// <param name="parameters">Volitelné parametry, které se zapíší do logu</param>
        /// <returns>Disposable objek, který se uvolní ze zásobníku pøi volání dispose.</returns>
        [System.Security.SecuritySafeCritical]
        public IDisposable PushValue(string scope, string metric, string message, bool timer = false, params string[] parameters)
        {
            return GScopeStack.PushValue(this, scope, metric, message, timer, parameters);
        }
#endif


        ///// <summary>
        ///// Pushes new state on the logical context scope stack
        ///// </summary>
        ///// <param name="scope">Value to added to the scope stack</param>
        ///// <param name="timer">Umožòuje pøidat mìøení díky èasovaèi</param>
        ///// <returns>A disposable object that pops the nested scope state on dispose.</returns>
        //[System.Security.SecuritySafeCritical]
        //public IDisposable PushValue<T>(T scope, bool timer = false)
        //{
        //    return GScopeStack.PushNestedState(this, scope, timer);
        //}

        ///// <summary>
        ///// Pushes new state on the logical context scope stack
        ///// </summary>
        ///// <param name="scope">Value to added to the scope stack</param>
        ///// <param name="timer">Umožòuje pøidat mìøení díky èasovaèi</param>
        ///// <returns>A disposable object that pops the nested scope state on dispose.</returns>
        //[System.Security.SecuritySafeCritical]
        //public IDisposable PushValue(object scope, bool timer = false)
        //{
        //    return GScopeStack.PushNestedState(this, scope, timer);
        //}

        #endregion
        // nastavovat doménu novì nebude možné

/*        /// <summary>
        /// Nastaví aktuální doménu aplikace pro bližší urèení kontextu
        /// </summary>
        /// <param name="domain">Aktuální doména typu napø: B (browser), T (TK), L (LK), W (WK), I (ISL).</param>
        /// <remarks>Je možné nastavit null (pro vyrušení aktuální domény)</remarks>
        [System.Security.SecuritySafeCritical]
        void IGNestedDomain.NestedDomain(char? domain)
        {   // aby tuto metodu nevolali bìžní uživatelé logování, zámìrnì využívá explicitní interface, tzn. nejdøíve je nutné provést pøetypování
            GDomainRegister.Add(domain);
        }*/

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
            
            if (exception != null)          // rychlý test (bez pøetypování), velmi èasto to vùbec neprojede dál
                message = GLogComposer.ResultExceptionMessage(exception, message, GLogContext.ApplicationInfo, GLogContext.Configuration, GLogContext.LoginInfo, GLogContext.SessionInfo);

            var l_oLogEvent = new NLog.LogEventInfo(l_nLevel, m_oLogger.Name, CultureInfo.CurrentCulture, message, args);
            if (properties != null)
            {
                foreach(var property in properties)
                {
                    l_oLogEvent.Properties.Add(property);
                }
            }

            // nové kódování se kvùli výkonu provádí pouze u souboru, až v okamžiku zápisu ${gcondencode:inner=${message}}
            m_oLogger.Log(secret, l_oLogEvent);     // moje extension metoda    // parametr secret nastaví jen property
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
            private readonly GLogger l;
            public GDebugView(GLogger l)  { this.l = l; }
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

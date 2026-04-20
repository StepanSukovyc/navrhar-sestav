//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GLoggerInt.cs                                </Name>
//    <Description> Pøedstavuje interní implementaci tøídy <see cref="IGLogger"/></Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2020                            </Copyright>
//    <Created>     2020-09-21                                                  </Created>
//  </FileHeader>


// tento pøepínaè je možné zapnout kvùli testování pro celý Gordic.General - zapnutý znamená napojení našich logovacích objektù na MS_EL / vypnutý znamená, že se nesmí použít (ani reference ?)
#if MS_EXTENSIONS_LOGGING
using Microsoft.Extensions.Logging;
//using Microsoft.Extensions.Internal;
#endif
using System;
using System.Globalization;
using System.Web;

namespace Gordic.General
{
    /// <summary>
    /// Pøedstavuje interní implementaci tøídy <see cref="IGLogger"/>
    /// </summary>
    internal class GLoggerInt : IGLoggerInt
    {
        //private readonly IGLogger _logger;
        
        private readonly NLog.Logger m_oLogger;
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

#if MS_EXTENSIONS_LOGGING
        /// <inheritdoc />
        bool ILogger.IsEnabled(LogLevel logLevel)
        {
            return _logger.IsEnabled(logLevel);
        }
#endif

        /// <summary>
        /// Formats and writes a log message at the specified log level.
        /// </summary>
        /// <param name="logLevel">Entry will be written on this level.</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">The exception to log.</param>
        /// <param name="message">Format string of the log message.</param>
        /// <param name="args">An object array that contains zero or more objects to format.</param>
        public void Log(GLogLevel logLevel, bool secret, Exception exception, string message, params object[] args)
        {
            var l_nLevel = NLog.LogLevel.FromOrdinal(logLevel.Ordinal);

            if (m_oLogger.IsEnabled(l_nLevel))
            {
                //var l_sCallClass = GetCallClass();
                //if (exception != null)    // TODO:
                //    message = NLogExceptionText(exception); // u výjimky mùžeme použít message, žádné message a parameters se totiž u výjimkových pøetížení nepoužívají
                
                var l_oLogEvent = new NLog.LogEventInfo(l_nLevel, m_oLogger.Name, CultureInfo.CurrentCulture, message, args);

                // nové kódování se kvùli výkonu provádí pouze u souboru, až v okamžiku zápisu ${gcondencode:inner=${message}}
                m_oLogger.Log(secret, l_oLogEvent);     // moje extension metoda    // parametr secret nastaví jen property
            }
            
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
    }
}

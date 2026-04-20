
// tento pøepínaè je možné zapnout kvùli testování pro celý Gordic.General - zapnutý znamená napojení našich logovacích objektù na MS_EL / vypnutý znamená, že se nesmí použít (ani reference ?)
#if MS_EXTENSIONS_LOGGING
using Microsoft.Extensions.Logging;
//using Microsoft.Extensions.Internal;
#endif
using System;
using System.Web;
using NLog;
#if OLD

namespace Gordic.General
{
    /// <summary>
    /// Delegates to a new <see cref="ILogger"/> instance using the full name of the given type, created by the
    /// provided <see cref="IGLoggerFactory"/>.
    /// </summary>
    /// <typeparam name="T">The type.</typeparam>
    public class GLogger<T> : IGLogger<T>
    {
#if MS_EXTENSIONS_LOGGING
        private readonly IGLogger _logger;
#else
        private readonly IGLogger _logger;
#endif
        
        private NLog.Logger m_oLogger;
        internal protected NLog.Logger Logger
        {
            get { return m_oLogger; }
        }

        /// <summary>
        /// Creates a new <see cref="GLogger{T}"/>.
        /// </summary>
        /// <param name="factory">The factory.</param>
        public GLogger(IGLoggerFactory factory)
        {
            if (factory == null)
            {
                throw new ArgumentNullException(nameof(factory));
            }

            //TODO: název typu pøesnìji pøes TypeNameHelper?
            m_oLogger = new NLog.LogFactory().GetLogger(typeof(T).ToString());
            
            //_logger = factory.CreateLogger(TypeNameHelper.GetTypeDisplayName(typeof(T), includeGenericParameters: false, nestedTypeDelimiter: '.'));
        }

#if MS_EXTENSIONS_LOGGING
        /// <inheritdoc />
        IDisposable ILogger.BeginScope<TState>(TState state)
        {
            return _logger.BeginScope(state);
        }
#else
        IDisposable IGLogger.BeginScope<TState>(TState state)
        {
            return _logger.BeginScope(state);
        }
#endif
        bool IGLogger.IsEnabled(GLogLevel logLevel)
        {
            return _logger.IsEnabled(logLevel);
        }

#if MS_EXTENSIONS_LOGGING
        /// <inheritdoc />
        bool ILogger.IsEnabled(LogLevel logLevel)
        {
            return _logger.IsEnabled(logLevel);
        }
#endif

        void IGLogger.Log<TState>(GLogLevel logLevel, GEventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            _logger.Log(logLevel, eventId, state, exception, formatter);
        }

#if MS_EXTENSIONS_LOGGING
        /// <inheritdoc />
        void ILogger.Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            _logger.Log(logLevel, eventId, state, exception, formatter);
        }
#endif
    }
}
#endif

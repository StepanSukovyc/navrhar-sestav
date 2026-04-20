//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGLogger.cs                                  </Name>
//    <Description> Zdroj logovacích zpráv a hlavní rozhraní pro logování       </Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-09-10                                                  </Created>
//  </FileHeader>

// tento pøepínaè je možné zapnout kvùli testování pro celý Gordic.General - zapnutý znamená napojení našich logovacích objektù na MS_EL / vypnutý znamená, že se nesmí použít (ani reference ?)
#if MS_EXTENSIONS_LOGGING
using Microsoft.Extensions.Logging;
#endif
using NLog;
using System;
using System.Collections.Generic;
using System.Diagnostics;

namespace Gordic.General
{
    /// <summary>
    /// Zdroj logovacích zpráv a hlavní rozhraní pro logování
    /// </summary>
    /// <remarks>Shlukuje vìtšinou logovacích vzorù do jediné metody.</remarks>    
#if MS_EXTENSIONS_LOGGING
    public interface IGLogger : Microsoft.Extensions.Logging.ILogger
    {


#else

    
    public interface IGLogger   // nedìdit nic - nechceme být závislí na Microsoft.Extensions.Logging (MEL).
    {   // nahrazeno LogLevel -> GLogLevel a EventId -> GEventId
#endif
        // pøi pøechodu na MEL by se musela udìlat typová konverze z GLogLevel na LogLevel

        // zmìnìn název z Log na LogFull, aby nedocházelo ke kolizím s metodou Log (a aby lidi používali spíše metodu Log)

        /// <summary>
        /// Zformátuje a zapíše logovací zprávu na zadané logovací úrovni
        /// </summary>
        /// <param name="logLevel">Záznam bude zapsán s toutu logovací úrovní</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy</param>
        /// <param name="args">Pole objektù, které obsahuje 0 nebo více objektù, které budou využity pøi formátování zprávy</param>
        void LogFull(GLogLevel logLevel, bool secret, Exception exception, string message, params object[] args);

        /// <summary>
        /// Zformátuje a zapíše logovací zprávu na zadané logovací úrovni
        /// </summary>
        /// <param name="logLevel">Záznam bude zapsán s toutu logovací úrovní</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy</param>
        /// <param name="properties">Pole vlastností, které bude pøedáno v této logovací zprávì</param>
        /// <param name="args">Pole objektù, které obsahuje 0 nebo více objektù, které budou využity pøi formátování zprávy</param>
        void LogFullProperties(GLogLevel logLevel, bool secret, Exception exception, string message, IDictionary<object, object> properties, params object[] args);

        /// <summary>
        /// Urèuje, zda je zadaná úroveò <paramref name="logLevel"/> zapnutá pro tento <see cref="IGLogger"/>
        /// </summary>
        /// <param name="logLevel">Logovací úroveò, která se kontroluje</param>
        /// <returns><c>true</c> v pøípadì zapnutí úrovnì</returns>
        bool IsEnabled(GLogLevel logLevel);

        /// <summary>
        /// Gets a value indicating whether logging is enabled for the <c>Trace</c> level.
        /// </summary>
        /// <returns>A value of <see langword="true" /> if logging is enabled for the <c>Trace</c> level, otherwise it returns <see langword="false" />.</returns>
        bool IsTraceEnabled { get; }
        /// <summary>
        /// Gets a value indicating whether logging is enabled for the <c>Debug</c> level.
        /// </summary>
        /// <returns>A value of <see langword="true" /> if logging is enabled for the <c>Debug</c> level, otherwise it returns <see langword="false" />.</returns>
        bool IsDebugEnabled { get; }
        /// <summary>
        /// Gets a value indicating whether logging is enabled for the <c>Info</c> level.
        /// </summary>
        /// <returns>A value of <see langword="true" /> if logging is enabled for the <c>Info</c> level, otherwise it returns <see langword="false" />.</returns>
        bool IsInfoEnabled { get; }
        /// <summary>
        /// Gets a value indicating whether logging is enabled for the <c>Warn</c> level.
        /// </summary>
        /// <returns>A value of <see langword="true" /> if logging is enabled for the <c>Warn</c> level, otherwise it returns <see langword="false" />.</returns>
        bool IsWarnEnabled { get; }
        /// <summary>
        /// Gets a value indicating whether logging is enabled for the <c>Error</c> level.
        /// </summary>
        /// <returns>A value of <see langword="true" /> if logging is enabled for the <c>Error</c> level, otherwise it returns <see langword="false" />.</returns>
        bool IsErrorEnabled { get; }
        /// <summary>
        /// Gets a value indicating whether logging is enabled for the <c>Fatal</c> level.
        /// </summary>
        /// <returns>A value of <see langword="true" /> if logging is enabled for the <c>Fatal</c> level, otherwise it returns <see langword="false" />.</returns>
        bool IsFatalEnabled { get; }


        // aby tam metoda nebyla 2x - warning na new
#if !MS_EXTENSIONS_LOGGING

        /*        /// <summary>
                /// Begins a logical operation scope.
                /// </summary>
                /// <param name="state">The identifier for the scope.</param>
                /// <typeparam name="TState">The type of the state to begin scope for.</typeparam>
                /// <returns>An <see cref="IDisposable"/> that ends the logical operation scope on dispose.</returns>
                IDisposable BeginScope<TState>(TState state); */
#endif
        /* stará verze
        /// <summary>
        /// Writes a log entry.
        /// </summary>
        /// <param name="logLevel">Entry will be written on this level.</param>
        /// <param name="eventId">Id of the event.</param>
        /// <param name="state">The entry to be written. Can be also an object.</param>
        /// <param name="exception">The exception related to this entry.</param>
        /// <param name="formatter">Function to create a <see cref="string"/> message of the <paramref name="state"/> and <paramref name="exception"/>.</param>
        /// <typeparam name="TState">The type of the object to be written.</typeparam>
        void Log<TState>(GLogLevel logLevel, GEventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter);*/

    }






}

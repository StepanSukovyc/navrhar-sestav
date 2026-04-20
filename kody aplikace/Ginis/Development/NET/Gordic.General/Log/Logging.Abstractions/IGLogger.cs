//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGLogger.cs                                  </Name>
//    <Description> Zdroj logovacích zpráv a hlavní rozhraní pro logování       </Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2020                            </Copyright>
//    <Created>     2020-09-10                                                  </Created>
//  </FileHeader>

// tento pøepínaè je možné zapnout kvùli testování pro celý Gordic.General - zapnutý znamená napojení našich logovacích objektù na MS_EL / vypnutý znamená, že se nesmí použít (ani reference ?)
#if MS_EXTENSIONS_LOGGING
using Microsoft.Extensions.Logging;
#endif
using System;

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

        /// <summary>
        /// Zformátuje z zapíše logovací zprávu na zadané logovací úrovni
        /// </summary>
        /// <param name="logLevel">Záznam bude zapsán s toutu logovací úrovní</param>
        /// <param name="secret">Pøíznak, zda je logovací správa utajovaná</param>
        /// <param name="exception">Výjimka, která bude zalogována</param>
        /// <param name="message">Formátovací øetìzec logovací zprávy</param>
        /// <param name="args">Pole objektù, které obsahuje 0 nebo více objektù, které budou využity pøi formátování zprávy</param>
        void Log(GLogLevel logLevel, bool secret, Exception exception, string message, params object[] args);

        /// <summary>
        /// Urèuje, zda je zadaná úroveò <paramref name="logLevel"/> zapnutá
        /// </summary>
        /// <param name="logLevel">Logovací úroveò, která se kontroluje</param>
        /// <returns><c>true</c> v pøípadì zapnutí úrovnì</returns>
        bool IsEnabled(GLogLevel logLevel);

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

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ILoggingService.cs                       </Name>
//    <Description> Rozhraní služby logování                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.Parsers.Core.Services
{
    /// <summary>
    /// Rozhraní služby logování
    /// </summary>
    public interface ILoggingService
    {
        /// <summary>
        /// Ladění
        /// </summary>
        /// <param name="message">Zprava ladění</param>
        void Debug(object message);
        /// <summary>
        /// Formátované ladění
        /// </summary>
        /// <param name="format">Formátovaná zprava</param>
        /// <param name="args">Argumenty formátované zprávy</param>
        void DebugFormatted(string format, params object[] args);
        /// <summary>
        /// Varovná zpráva
        /// </summary>
        /// <param name="message">Text varovné zpravy</param>
        /// <param name="exception">Logovaná vyjímka</param>
        void Warn(object message, Exception exception);

        /// <summary>
        /// Indikuje povolení logování ladění
        /// </summary>
        bool IsDebugEnabled { get; }
        /// <summary>
        /// Indikuje povolení logování Informačních zprav
        /// </summary>
        bool IsInfoEnabled { get; }
        /// <summary>
        /// Indikuje povolení logování upozornění
        /// </summary>
        bool IsWarnEnabled { get; }
        /// <summary>
        /// indikuje povolení logování chybových hlášení
        /// </summary>
        bool IsErrorEnabled { get; }
        /// <summary>
        /// Indikuje povolení logování fatáních chyb
        /// </summary>
        bool IsFatalEnabled { get; }

        /// <summary>
        /// Kritická chyba
        /// </summary>
        /// <param name="message">Zprava kritické chyby</param>
        void Fatal(object message);
        /// <summary>
        /// Kritická chyba
        /// </summary>
        /// <param name="message">Zprava kritické chyby</param>
        /// <param name="exception">Výjimka</param>
        void Fatal(object message, Exception exception);
        /// <summary>
        /// Informační zpráva
        /// </summary>
        /// <param name="message">Obsah zprávy do potokolu</param>
        void Info(object message);
        /// <summary>
        /// Protokolování chyby
        /// </summary>
        /// <param name="message">Zpráva chyby</param>
        void Error(object message);
        /// <summary>
        /// Protokolování výjimky
        /// </summary>
        /// <param name="message">Zpráva výjimky</param>
        /// <param name="exception">Výjimka</param>
        void Error(object message, Exception exception);
        /// <summary>
        /// Protokolování varovné zprávy
        /// </summary>
        /// <param name="message">Varovná zpráva</param>
        void Warn(object message);

        /// <summary>
        /// Formátováné protokolování informace
        /// </summary>
        /// <param name="format">Formát</param>
        /// <param name="args">Argumenty formátu</param>
        void InfoFormatted(string format, params object[] args);
        /// <summary>
        /// Uložení obsahu logu do souboru
        /// </summary>
        /// <param name="fileName">Název souboru pro uložení</param>
        void Save(string fileName);
    }
}

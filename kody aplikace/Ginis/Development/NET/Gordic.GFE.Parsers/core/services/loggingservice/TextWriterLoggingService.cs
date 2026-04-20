//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TextWriterLoggingService.cs              </Name>
//    <Description> Implementace rozhraní LoggingService, která zapisuje pomocí TextWriter objektu</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using Gordic.General;
using System;
using System.IO;

namespace Gordic.GFE.Parsers.Core.Services
{
    /// <summary>
    /// Implementace rozhraní LoggingService, která zapisuje pomocí TextWriter objektu
    /// </summary>
    public class TextWriterLoggingService : ILoggingService
    {

        //private static readonly IGLogger Log = GLogManager.CurrentClassLogger();
        private static readonly IGLogger Log = GLogManager.GetLogger("Gordic.Gfe");

        #region ILoggingService
        /// <summary>
        /// Ladění 
        /// </summary>
        /// <param name="message">Zpráva pro ladění</param>
        public void Debug(object message)
        {
            Log.Debug(message?.ToString());
            if (IsDebugEnabled)
                Write(message, null);
        }

        /// <summary>
        /// Formátované ladění
        /// </summary>
        /// <param name="format">Formátovaná zprava</param>
        /// <param name="args">Argumenty formátované zprávy</param>
        public void DebugFormatted(string format, params object[] args)
        {
            Debug(string.Format(format, args));
        }
        /// <summary>
        /// Varovná zpráva
        /// </summary>
        /// <param name="message">Text varovné zpravy</param>
        /// <param name="exception">Logovaná vyjímka</param>
        public void Warn(object message, Exception exception)
        {
            Log.Warn(exception, message?.ToString());
            if (IsWarnEnabled)
                Write(message, exception);
        }
        /// <summary>
        /// POznamenání varovné zprávy
        /// </summary>
        /// <param name="message">Vrovná zpráva</param>
        public void Warn(object message)
        {
            Warn(message, null);
        }

        /// <summary>
        /// Kritická chyba
        /// </summary>
        /// <param name="message">Zpráva kritické chyby</param>
        public void Fatal(object message)
        {
            Fatal(message, null);
        }
        /// <summary>
        /// Kritická chyba
        /// </summary>
        /// <param name="message">Zprava kritické chyby</param>
        /// <param name="exception">Výjimka</param>
        public void Fatal(object message, Exception exception)
        {
            Log.Fatal(exception, message?.ToString());
            if (IsFatalEnabled)
                Write(message, exception);
        }

        /// <summary>
        /// Informační zpráva
        /// </summary>
        /// <param name="message">Obsah zprávy do potokolu</param>
        public void Info(object message)
        {
            Log.Info(message?.ToString());
            if (IsInfoEnabled)
                Write(message, null);
        }
        /// <summary>
        /// Formátováné protokolování informaci
        /// </summary>
        /// <param name="format">Formát</param>
        /// <param name="args">Parametry formátu</param>
        public void InfoFormatted(string format, params object[] args)
        {
            Info(string.Format(format, args));
        }

        /// <summary>
        /// Indikuje povolení logování ladění
        /// </summary>
        public bool IsDebugEnabled { get; set; }
        /// <summary>
        /// Indikuje povolení logování Informačních zprav
        /// </summary>
        public bool IsInfoEnabled { get; set; }
        /// <summary>
        /// Indikuje povolení logování upozornění
        /// </summary>
        public bool IsWarnEnabled { get; set; }
        /// <summary>
        /// indikuje povolení logování chybových hlášení
        /// </summary>
        public bool IsErrorEnabled { get; set; }
        /// <summary>
        /// Indikuje povolení logování fatáních chyb
        /// </summary>
        public bool IsFatalEnabled { get; set; }
        /// <summary>
        /// Protokolování výjimky
        /// </summary>
        /// <param name="message">Zpráva výjimky</param>
        /// <param name="exception">Výjimka</param>
        public void Error(object message, Exception exception)
        {
            Log.Error(exception, message?.ToString());
            if (IsErrorEnabled)
                Write(message, exception);
        }
        /// <summary>
        /// Protokolování chyby
        /// </summary>
        /// <param name="message">Zpráva chyby</param>
        public void Error(object message)
        {
            Error(message, null);
        }
        #endregion

        readonly TextWriter writer;
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="writer">TextWriter daného ogovacího nástroju</param>
        public TextWriterLoggingService(TextWriter writer)
        {
            this.writer = writer ?? throw new ArgumentNullException(GResources.GetResourceText(29450244));
            this.IsFatalEnabled = true;
            this.IsErrorEnabled = true;
            this.IsWarnEnabled = true;
            this.IsInfoEnabled = true;
            this.IsDebugEnabled = true;
        }

        void Write(object message, Exception exception)
        {
            if (message != null)
                writer.WriteLine(message.ToString());
            if (exception != null)
                writer.WriteLine(exception.ToString());
        }

        /// <summary>
        /// Uložení obsahu logu do souboru
        /// </summary>
        /// <param name="fileName">Název souboru pro uložení</param>
        public void Save(string fileName)
        {
            if (!(writer is FileTextWriter))
                return;

            (writer as FileTextWriter).Save(fileName);
        }
    }
}

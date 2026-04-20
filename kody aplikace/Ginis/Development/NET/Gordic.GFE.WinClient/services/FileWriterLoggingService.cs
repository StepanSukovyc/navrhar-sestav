//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FileWriterLoggingService.cs            </Name>
//    <Description> Služba logování do souboru                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-15                                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using Gordic.GFE.Parsers.Core.Services;
using Gordic.GFE.WinClient.MessageView;
using Gordic.General;

namespace Gordic.GFE.WinClient.Services
{
    /// <summary>
    /// Služba logování do souboru
    /// </summary>
    class FileWriterLoggingService : ILoggingService
    {
        #region ILoggingService
        /// <summary>
        /// Ladění 
        /// </summary>
        /// <param name="message">Zpráva pro ladění</param>
        public void Debug(object message)
        {
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
            if (IsWarnEnabled)
                Write(message, exception);
        }
        /// <summary>
        /// POznamenání varovné zprávy
        /// </summary>
        /// <param name="message">Vrovná zpráva</param>
        public void Warn(object message) { Warn(message, null); }

        /// <summary>
        /// Kritická chyba
        /// </summary>
        /// <param name="message">Zpráva kritické chyby</param>
        public void Fatal(object message) { Fatal(message, null); }
        /// <summary>
        /// Kritická chyba
        /// </summary>
        /// <param name="message">Zprava kritické chyby</param>
        /// <param name="exception">Výjimka</param>
        public void Fatal(object message, Exception exception)
        {
            if (IsFatalEnabled)
                Write(message, exception);
        }

        /// <summary>
        /// Informační zpráva
        /// </summary>
        /// <param name="message">Obsah zprávy do potokolu</param>
        public void Info(object message)
        {
            if (IsInfoEnabled)
                Write(message, null, false);
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

        MessageViewCategory category;
        MessageViewCategory Category
        {
            get
            {
                if (category == null)
                    MessageViewCategory.Create(ref category, GResources.GetResourceText(29450585)); //RC 29450585 : logování
                return category;
            }
        }

        string cachFileName = null;
        readonly TextWriter writer;
        /// <summary>
        /// klíč, u kterého je cesta k naposledy použitému souboru záznamů
        /// </summary>
        static readonly string loggingKey = "LoggingKey";
        readonly string guid = Guid.NewGuid().ToString();

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="writer">TextWriter daného ogovacího nástroju</param>
        public FileWriterLoggingService(TextWriter writer)
        {
            this.writer = writer ?? throw new ArgumentNullException(GResources.GetResourceText(29450586));
            this.IsFatalEnabled = true;
            this.IsErrorEnabled = true;
            this.IsWarnEnabled = true;
            this.IsInfoEnabled = true;
            this.IsDebugEnabled = true;
            LoadLastLog();
        }

        /// <summary>
        /// načtení naposledy NE uložených záznamů
        /// </summary>
        void LoadLastLog()
        {
            string fileName = Gordic.GFE.Parsers.Services.RegistryService.GetAppValueFromRegistry(loggingKey);
            if (!string.IsNullOrEmpty(fileName)
                && File.Exists(fileName))
                try
                {
                    writer.WriteLine(GResources.GetResourceText(29451519));
                    writer.Write(Gordic.GFE.Parsers.Services.FileReader.ReadFileContent(fileName));
                    writer.WriteLine(GResources.GetResourceText(29451520));
                }
                catch { }
        }

        void Write(object message, Exception exception, bool doEvents = true)
        {
            MessageViewCategory mvc = CompilerMessageView.Instance?.SelectedMessageViewCategory;

            try
            {
                if (message != null)
                {
                    writer.WriteLine(message.ToString());
                    if (Category != null)
                        Category.AppendLine(message.ToString());
                }
            }
            catch (Exception ex) { exception = ex; }

            try
            {
                if (exception != null)
                {
                    writer.WriteLine(exception.ToString());
                    if (Category != null)
                        Category.AppendLine(exception.ToString());
                }
                exception = null;
            }
            catch (Exception ex) { exception = ex; }
            if (exception == null)
                Parsers.ThreadService.SafeThreadAsyncCall(Save, guid, true);

            if (Category != mvc && mvc != null)
                CompilerMessageView.Instance.SelectCategory(mvc.Category);
        }

        /// <summary>
        /// Uložení obsahu logu do souboru
        /// </summary>
        /// <param name="fileName">Název souboru pro uložení</param>
        public void Save(string fileName) { Save(fileName, false); }

        /// <summary>
        /// Uložení obsahu logu do souboru
        /// </summary>
        /// <param name="fileName">Název souboru pro uložení</param>
        /// <param name="isTemp">indikuje, že se jedná o dočasný soubor</param>
        public void Save(string fileName, bool isTemp)
        {
            if (!(writer is FileTextWriter))
                return;

            if (isTemp)
                fileName = Path.Combine(Parsers.Services.TemporaryService.TempDirectory, fileName);

            if (!string.IsNullOrEmpty((writer as FileTextWriter).Save(fileName, false)) && isTemp && string.IsNullOrEmpty(cachFileName))
            {
                Parsers.Services.RegistryService.SetRegistryAppValue(loggingKey, fileName);
                cachFileName = fileName;
            }

            if (!isTemp)
            {
                Parsers.Services.RegistryService.SetRegistryAppValue(loggingKey, string.Empty);
                Parsers.Core.FileUtility.ObservedDelete(new System.Collections.Generic.List<string>() { cachFileName });
            }
        }
    }
}

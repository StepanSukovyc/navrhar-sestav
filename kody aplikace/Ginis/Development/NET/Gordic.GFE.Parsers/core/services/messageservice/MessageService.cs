//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.MessageService.cs                        </Name>
//    <Description> Třída ze statickými metodami pro zobrazení zpráv.           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Core.Services;
using Gordic.General;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Třída ze statickými metodami pro zobrazení zpráv.
    /// Veškerý text zobrazen s použitím MessageService je předán
    /// StringParser pro záměnu ${res} značky.
    /// </summary>
    public static class MessageService
    {
        /// <summary>
        /// Název aplikace
        /// </summary>
        public static string ProductName
        {
            get { return ServiceManager.MessageService.ProductName; }
            set { ServiceManager.MessageService.ProductName = value; }
        }
        /// <summary>
        /// Výchozí titulek dialogových oken.
        /// </summary>
        public static string DefaultMessageBoxTitle
        {
            get { return ServiceManager.MessageService.DefaultMessageBoxTitle; }
            set { ServiceManager.MessageService.DefaultMessageBoxTitle = value; }
        }

        /// <summary>
        /// Získání/Nastavení delegáta vlastního reportéru zobrazení chybových hlášení.
        /// </summary>
        public static ShowErrorDelegate CustomErrorReporter
        {
            get { return ServiceManager.MessageService.CustomErrorReporter; }
            set { ServiceManager.MessageService.CustomErrorReporter = value; }
        }

        /// <summary>
        /// Zobrazení chybové výjimky s použitím <see cref="CustomErrorReporter"/>.
        /// </summary>
        /// <param name="ex">Chybová výjimka</param>
        public static void ShowError(Exception ex)
        {
            ShowError(ex, null);
        }

        /// <summary>
        /// Zobrazení chyby
        /// pokud <paramref name="ex"/> je NULL, zpráva se zobrazí uvnitř Message Box.
        /// Jinak, se použije vlastní reportér.
        /// </summary>
        /// <param name="ex">Chybová výjimka</param>
        /// <param name="message">Zráva</param>
        public static void ShowError(Exception ex, string message)
        {
            AsynchronousWaitDialog.Pause();
            try
            {
                if (message == null)
                    message = ex == null ? string.Empty : ex.Message;

                if (ex != null)
                {
                    LoggingService.Error(message, ex);
                    LoggingService.Warning(GResources.GetResourceText(29450245) + ":\n" + Environment.StackTrace); //RC 29450245 : Trasování zásobníku poslední chyby protokolu
                    if (CustomErrorReporter != null)
                    {
                        CustomErrorReporter(ex, message);
                        return;
                    }
                }
                else
                    LoggingService.Error(message);
                ServiceManager.MessageService.ShowError(ex, message);
            }
            finally
            {
                AsynchronousWaitDialog.ReStart();
            }
        }
        /// <summary>
        /// Zobrazení formátováné chyby.
        /// </summary>
        /// <param name="formatstring">Formátovácí řádek</param>
        /// <param name="formatitems">Položky formátovácího řádku</param>
        public static void ShowErrorFormatted(string formatstring, params object[] formatitems)
        {
            AsynchronousWaitDialog.Pause();
            ServiceManager.MessageService.ShowErrorFormatted(formatstring, formatitems);
            AsynchronousWaitDialog.ReStart();
        }

        /// <summary>
        /// Yes/No dotaz na uživatele, "Yes" je výchozí tlačítko.
        /// Vráci <c>TRUE</c> pokud tlačítko bylo stisknuto, <c>FALSE</c> pokud nebylo.
        /// </summary>
        /// <param name="question">Zpráva dotazu</param>
        public static bool AskQuestion(string question)
        {
            return AskQuestion(StringParser.Parse(question), GResources.GetResourceText(29450246)); //RC 29450246 : Dotaz
        }

        /// <summary>
        /// Yes/No dotaz na uživatele, "Yes" je výchozí tlačítko.
        /// Vráci <c>TRUE</c> pokud tlačítko bylo stisknuto, <c>FALSE</c> pokud nebylo.
        /// </summary>
        /// <param name="question">Zpráva dotazu</param>
        /// <param name="caption">Titulek okna</param>
        public static bool AskQuestion(string question, string caption)
        {
            AsynchronousWaitDialog.Pause();
            bool res = ServiceManager.MessageService.AskQuestion(question, caption);
            AsynchronousWaitDialog.ReStart();
            return res;
        }

        /// <summary>
        /// Dotaz typu Yes/No na uživatele, s použitím "Yes" jako výchozího tlačítka.
        /// Take obsahuje dotaz na zobrazení stejného dialogu i příště
        /// </summary>
        /// <param name="caption">Titulek okna</param>
        /// <param name="question">Obsah dotazu</param>
        /// <param name="asksNext">Zaškrtávatko Příště se již neptat</param>
        /// <returns></returns>
        public static bool AskCustomQuestion(string question, string caption, ref bool asksNext)
        {
            AsynchronousWaitDialog.Pause();
            bool res = ServiceManager.MessageService.AskCustomQuestion(question, caption, ref asksNext);
            AsynchronousWaitDialog.ReStart();
            return res;
        }

        /// <summary>
        /// Zobrazení chybové hlášky s použitím boxu.
        /// </summary>
        /// <param name="message">Text chybové hlášky</param>
        public static void ShowError(string message)
        {
            ShowError(null, message);
        }

        /// <summary>
        /// Zobrazení upozornění.
        /// </summary>
        /// <param name="message">Obsah zprávy upozornění</param>
        public static void ShowWarning(string message)
        {
            AsynchronousWaitDialog.Pause();
            LoggingService.Warning(message);
            ServiceManager.MessageService.ShowWarning(message);
            AsynchronousWaitDialog.ReStart();
        }
        /// <summary>
        /// Zobrazení upozornění.
        /// </summary>
        /// <param name="formatstring">Formátovácí řádek</param>
        /// <param name="formatitems">Položky formátovácího řádku</param>
        public static void ShowWarningFormatted(string formatstring, params object[] formatitems)
        {
            ServiceManager.MessageService.ShowWarningFormatted(formatstring, formatitems);
        }

        /// <summary>
        /// Zobrazení zprávy
        /// </summary>
        /// <param name="message">Obsah zprávy</param>
        /// <param name="caption">Titulek okna zprávy</param>
        public static void ShowMessage(string message, string caption)
        {
            AsynchronousWaitDialog.Pause();
            LoggingService.Info(message);
            ServiceManager.MessageService.ShowMessage(message, caption);
            AsynchronousWaitDialog.ReStart();
        }

        /// <summary>
        /// Zobrazení zprávy
        /// </summary>
        /// <param name="message">Obsah zprávy</param>
        public static void ShowMessage(string message)
        {
            ShowMessage(message, DefaultMessageBoxTitle);
        }

        /// <summary>
        /// Zobrazení vlastního dialogu.
        /// </summary>
        /// <param name="caption">Název v dialogovém okně.</param>
        /// <param name="dialogText">Popis zobrazený přímo v dialogu.</param>
        /// <param name="acceptButtonIndex">
        /// číslo přimého akceptačního tlačítka.
        /// Použijte hodnotu -1, pokud nechcete mít tlačítko Přijmout.
        /// </param>
        /// <param name="cancelButtonIndex">
        /// číslo přimého tlačítka pro zrušení.
        /// Použijte hodnotu -1, pokud nechcete mít tlačítko Zrušit.
        /// </param>
        /// <param name="buttontexts">Texty tlačítek.</param>
        /// <returns>Číslo stisknutého tlačítka, nebo -1, pokud dialog byl uzavřen bez kliknutí na tlačítko</returns>
        public static int ShowCustomDialog(string caption, string dialogText, int acceptButtonIndex, int cancelButtonIndex, params string[] buttontexts)
        {
            AsynchronousWaitDialog.Pause();
            int res = ServiceManager.MessageService.ShowCustomDialog(caption, dialogText, acceptButtonIndex, cancelButtonIndex, buttontexts);
            AsynchronousWaitDialog.ReStart();
            return res;
        }

        /// <summary>
        /// Zobrazení informačního okna
        /// </summary>
        /// <param name="message">Zprava pro zobrazení</param>
        public static void ShowInformation(string message)
        {
            AsynchronousWaitDialog.Pause();
            LoggingService.Info(message);
            ServiceManager.MessageService.ShowInformation(message);
            AsynchronousWaitDialog.ReStart();
        }
    }
}

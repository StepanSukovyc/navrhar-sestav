//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.TextWriterMessageService.cs              </Name>
//    <Description> Implementace rozhraní IMessageService které ukládá zprávy do textového writeru.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using Gordic.General;
using System;
using System.IO;
using System.Text;

namespace Gordic.GFE.Parsers.Core.Services
{
    /// <summary>
    /// Implementace rozhraní IMessageService které ukládá zprávy do textového writeru.
    /// Uživatelský vstup není implementován.
    /// </summary>
    class TextWriterMessageService : IMessageService
    {
        string productName = GResources.GetResourceText(29450247); //RC 29450247 : Název aplikace
        /// <summary>
        /// Název aplikace
        /// </summary>
        public string ProductName
        {
            get { return productName; }
            set { productName = value; }
        }

        string defaultMessageBoxTitle = GResources.GetResourceText(29450248); //RC 29450248 : Zpráva
        /// <summary>
        /// Výchozí titulek dialogových oken.
        /// </summary>
        public string DefaultMessageBoxTitle
        {
            get { return defaultMessageBoxTitle; }
            set { defaultMessageBoxTitle = value; }
        }

        /// <summary>
        /// Získá/Nastaví delegáta vlastního reportéru zobrazení chybových hlášení.
        /// </summary>
        public ShowErrorDelegate CustomErrorReporter { get; set; }

        readonly TextWriter writer;
        /// <summary>
        /// Vytvoření nové třídy
        /// </summary>
        /// <param name="writer">Writer</param>
        public TextWriterMessageService(TextWriter writer)
        {
            this.writer = writer ?? throw new ArgumentNullException(GResources.GetResourceText(29450249));
        }
        /// <summary>
        /// Zobrazení chybové hlášky
        /// </summary>
        /// <param name="ex">Výjimka</param>
        /// <param name="message">Chybová zpráva</param>
        public void ShowError(Exception ex, string message)
        {
            if (message != null)
                writer.WriteLine(message);

            if (ex != null)
                writer.WriteLine(ex.ToString());
        }
        /// <summary>
        /// Zobrazení varvání
        /// </summary>
        /// <param name="message">Zpráva varpvání</param>
        public void ShowWarning(string message)
        {
            writer.WriteLine(message);
        }

        /// <summary>
        /// Zobrazení dotazu
        /// </summary>
        /// <param name="question">Text dotazu</param>
        /// <param name="caption">Titulek okna</param>
        /// <returns></returns>
        public bool AskQuestion(string question, string caption)
        {
            writer.WriteLine(caption + ": " + question);
            return false;
        }
        /// <summary>
        /// Dotaz typu Yes/No na uživatele, s použitím "Yes" jako výchozího tlačítka.
        /// Take obsahuje dotaz na zobrazení stejného dialogu i příště
        /// </summary>
        /// <param name="caption">Titulek okna</param>
        /// <param name="question">Obsah dotazu</param>
        /// <param name="asksNext">Zaškrtávatko Příště se již neptat</param>
        /// <returns></returns>
        public bool AskCustomQuestion(string question, string caption, ref bool asksNext)
        {
            asksNext = true;
            writer.WriteLine(caption + ": " + question);
            return false;
        }

        /// <summary>
        /// Zobrazení vlastního dialogu
        /// </summary>
        /// <param name="caption">Titulek</param>
        /// <param name="dialogText">Text dialogového okna</param>
        /// <param name="acceptButtonIndex">Tlačítka výchozí akceptace</param>
        /// <param name="cancelButtonIndex">Cancel tlačítka</param>
        /// <param name="buttontexts">Texty tlačítek</param>
        /// <returns></returns>
        public int ShowCustomDialog(string caption, string dialogText, int acceptButtonIndex, int cancelButtonIndex, params string[] buttontexts)
        {
            writer.WriteLine(caption + ": " + dialogText);
            return cancelButtonIndex;
        }
        /// <summary>
        /// Zobrazení uživatelského vstupu
        /// </summary>
        /// <param name="caption">Titulek</param>
        /// <param name="dialogText">Text dialogového okna</param>
        /// <param name="defaultValue">Výchozí hodnota</param>
        /// <returns></returns>
        public string ShowInputBox(string caption, string dialogText, string defaultValue)
        {
            writer.WriteLine(caption + ": " + dialogText);
            return defaultValue;
        }
        /// <summary>
        /// Zobrazení zprávy
        /// </summary>
        /// <param name="message">Text zprávy</param>
        /// <param name="caption">Text titulku</param>
        public void ShowMessage(string message, string caption)
        {
            writer.WriteLine(caption + ": " + message);
        }
        /// <summary>
        /// Chybová hláška při uložení souboru
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <param name="message">Zpráva</param>
        /// <param name="dialogName">Název dialogového okna</param>
        /// <param name="exceptionGot">Výjimka</param>
        public void InformSaveError(string fileName, string message, string dialogName, Exception exceptionGot)
        {
            writer.WriteLine(dialogName + ": " + message + " (" + fileName + ")");
            if (exceptionGot != null)
                writer.WriteLine(exceptionGot.ToString());
        }

        /// <summary>
        /// Dialog z možnosti výběru alternativního uložení
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <param name="message">Zpráva</param>
        /// <param name="dialogName">Název dialogového okna</param>
        /// <param name="exceptionGot">Výjimka</param>
        /// <param name="chooseLocationEnabled">Indikuje možnost výběru nového umístění</param>
        /// <returns></returns>
        public ChooseSaveErrorResult ChooseSaveError(string fileName, string message, string dialogName, Exception exceptionGot, bool chooseLocationEnabled)
        {
            writer.WriteLine(dialogName + ": " + message + " (" + fileName + ")");
            if (exceptionGot != null)
                writer.WriteLine(exceptionGot.ToString());
            return ChooseSaveErrorResult.Ignore;
        }

        /// <summary>
        /// Zpracování informační zprávy
        /// </summary>
        /// <param name="message">Zpráva</param>
        public void ShowInformation(string message)
        {
            writer.WriteLine(message);
        }

        /// <summary>
        /// Zobrazení formátováné chyby.
        /// </summary>
        /// <param name="formatstring">Formátovácí řádek</param>
        /// <param name="formatitems">Položky formátovácího řádku</param>
        public void ShowErrorFormatted(string formatstring, object[] formatitems)
        {
            ShowError(null, Format(formatstring, formatitems));
        }
        string Format(string formatstring, object[] formatitems)
        {
            try { return String.Format(StringParser.Parse(formatstring), formatitems); }
            catch (FormatException)
            {
                StringBuilder b = new StringBuilder(StringParser.Parse(formatstring));
                foreach (string formatitem in formatitems)
                {
                    b.Append("\nItem: ");
                    b.Append(formatitem);
                }
                return b.ToString();
            }
        }


        /// <summary>
        /// Zobrazení formátového upozornění
        /// </summary>
        /// <param name="message">maska</param>
        /// <param name="formatitems">parametry</param>
        public void ShowWarningFormatted(string message, object[] formatitems)
        {
            ShowWarning(Format(message, formatitems));
        }
    }
}

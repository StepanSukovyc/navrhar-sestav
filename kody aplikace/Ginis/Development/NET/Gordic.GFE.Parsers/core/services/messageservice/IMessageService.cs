//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IMessageService.cs                       </Name>
//    <Description> Popis rozhraní IMessageService.                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.Parsers.Core.Services
{
    /// <summary>
    /// Povolení změny názvu souboru
    /// </summary>
    public sealed class ChooseSaveErrorResult
    {
        /// <summary>
        /// Je opakování
        /// </summary>
        public bool IsRetry { get; private set; }
        /// <summary>
        /// Ignorované
        /// </summary>
        public bool IsIgnore { get; private set; }
        /// <summary>
        /// Uložit alternativu
        /// </summary>
        public bool IsSaveAlternative { get { return AlternativeFileName != null; } }
        /// <summary>
        /// Nový název souboru
        /// </summary>
        public string AlternativeFileName { get; private set; }

        private ChooseSaveErrorResult() { }

        /// <summary>
        /// Opakovat
        /// </summary>
        public readonly static ChooseSaveErrorResult Retry = new ChooseSaveErrorResult { IsRetry = true };
        /// <summary>
        /// Ignorovat
        /// </summary>
        public readonly static ChooseSaveErrorResult Ignore = new ChooseSaveErrorResult { IsIgnore = true };
        /// <summary>
        /// Uložit s jiným názvem
        /// </summary>
        /// <param name="alternativeFileName">Nový název souboru</param>
        /// <returns></returns>
        public static ChooseSaveErrorResult SaveAlternative(string alternativeFileName)
        {
            return new ChooseSaveErrorResult { AlternativeFileName = alternativeFileName };
        }
    }

    /// <summary>
    /// Delegát používaný pro zpětné volání chybových hlášení.
    /// </summary>
    public delegate void ShowErrorDelegate(Exception ex, string message);

    /// <summary>
    /// Popis rozhraní IMessageService.
    /// </summary>
    public interface IMessageService
    {
        /// <summary>
        /// Dotaz typu Yes/No na uživatele, s použitím "Yes" jako výchozího tlačítky.
        /// Vrácí <c>TRUE</c> pokud stisknuto Yes, <c>FALSE</c> pokud Yes neni kliknuto.
        /// </summary>
        /// <param name="caption">Záhlaví okna</param>
        /// <param name="question">Znění dotazu</param>
        bool AskQuestion(string question, string caption);
        /// <summary>
        /// Dotaz typu Yes/No na uživatele, s použitím "Yes" jako výchozího tlačítka.
        /// Take obsahuje dotaz na zobrazení stejného dialogu i příště
        /// </summary>
        /// <param name="caption">Titulek okna</param>
        /// <param name="question">Obsah dotazu</param>
        /// <param name="asksNext">Zaškrtávatko Příště se již neptat</param>
        /// <returns></returns>
        bool AskCustomQuestion(string question, string caption, ref bool asksNext);

        /// <summary>
        /// Zobrazení vlastního dialogu.
        /// </summary>
        /// <param name="caption">Titulek dialogu.</param>
        /// <param name="dialogText">Popis zobrazený v dialogu.</param>
        /// <param name="acceptButtonIndex">
        /// číslo přimého akceptačního tlačítka.
        /// Použijte hodnotu -1, pokud nechcete mít tlačítko Přijmout.
        /// </param>
        /// <param name="cancelButtonIndex">
        /// číslo přimého tlačítka pro zrušení.
        /// Použijte hodnotu -1, pokud nechcete mít tlačítko Zrušit.
        /// </param>
        /// <param name="buttontexts">Texty tlačítek.</param>
        /// <returns>Číslo stisknutého tlačítka, nebo -1 pokud dialogové okno bylo zavřeno bez stisknutí jakéhokoliv tlačítka.</returns>
        int ShowCustomDialog(string caption, string dialogText, int acceptButtonIndex, int cancelButtonIndex, params string[] buttontexts);

        /// <summary>
        /// Zobrazení ziskávácího dialogového okna
        /// </summary>
        /// <param name="caption">Titulek okna</param>
        /// <param name="dialogText">Obsah okna</param>
        /// <param name="defaultValue">Výchozí hodnota</param>
        /// <returns></returns>
        string ShowInputBox(string caption, string dialogText, string defaultValue);
        /// <summary>
        /// Název aplikace
        /// </summary>
        string ProductName { get; set; }
        /// <summary>
        /// Výchozí titulek dialogových oken.
        /// </summary>
        string DefaultMessageBoxTitle { get; set; }

        /// <summary>
        /// Zobrazení zprávy
        /// </summary>
        /// <param name="message">Obsah zprávy</param>
        /// <param name="caption">Titulek okna zobrazení zpráv</param>
        void ShowMessage(string message, string caption);
        /// <summary>
        /// Zobrazení zprávy informující uživatele o uložené chybě.
        /// </summary>
        /// <param name="fileName">Název suboru</param>
        /// <param name="message">Zpráva</param>
        /// <param name="dialogName">Název dialogového okna</param>
        /// <param name="exceptionGot">Výjimka</param>
        void InformSaveError(string fileName, string message, string dialogName, Exception exceptionGot);
        /// <summary>
        /// Zobrazení okna s informací
        /// </summary>
        /// <param name="message">Zpráva</param>
        void ShowInformation(string message);
        /// <summary>
        /// Zobrazení chyby.
        /// Pokud <paramref name="ex"/> je NULL, zpráva se zobrazí uvnitř message box.
        /// </summary>
        /// <param name="ex">Výjimka</param>
        /// <param name="message">Zpráva chybové hlášky</param>
        void ShowError(Exception ex, string message);
        /// <summary>
        /// Zobrazení formátovné chyby
        /// </summary>
        /// <param name="formatstring">maska</param>
        /// <param name="formatitems">parametry</param>
        void ShowErrorFormatted(string formatstring, object[] formatitems);
        /// <summary>
        /// Zobrazení varovné zprávy
        /// </summary>
        /// <param name="message">Text varovné zprávy</param>
        void ShowWarning(string message);
        /// <summary>
        /// Zobrazení formátového upozornění
        /// </summary>
        /// <param name="formatstring">maska</param>
        /// <param name="formatitems">parametry</param>
        void ShowWarningFormatted(string formatstring, object[] formatitems);

        /// <summary>
        /// Získání/Nastavení delegáta vlastního reportéru zobrazení chybových hlášení.
        /// </summary>
        ShowErrorDelegate CustomErrorReporter { get; set; }
    
        /// <summary>
        /// Zobrazení zprávy informující uživatele o chybě uložení,
        /// a umožňující uživateli vrátit/uložit soubor s alternativním názvěm
        /// </summary>
        /// <param name="fileName">Název souboru pro uložení</param>
        /// <param name="message">Zpráva</param>
        /// <param name="dialogName">Název dialogového okna</param>
        /// <param name="exceptionGot">Výjimka</param>
        /// <param name="chooseLocationEnabled">Indikuje o možnosti změny umístění souboru</param>
        /// <returns></returns>
        ChooseSaveErrorResult ChooseSaveError(string fileName, string message, string dialogName, Exception exceptionGot, bool chooseLocationEnabled);
    }
}

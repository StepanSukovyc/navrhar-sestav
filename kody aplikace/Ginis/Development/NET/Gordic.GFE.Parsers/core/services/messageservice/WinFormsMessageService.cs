//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.WinFormsMessageService.cs                </Name>
//    <Description> Dialogová služba formulářů                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using System.Windows.Forms;
using Gordic.GFE.Parsers.WinForms;
using Gordic.WinForms.Controls;
using Gordic.General;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.Parsers.Core.Services
{
    /// <summary>
    /// Dialogová služba formulářů
    /// </summary>
    public class WinFormsMessageService : IMessageService
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

        static IWin32Window dialogowner;
        /// <summary>
        /// vlastník dialogového okýnka
        /// </summary>
        public static IWin32Window DialogOwner
        {
            get
            {
                if (dialogowner != null) return dialogowner;
                IDesktop desktop = ProcessService.Desktop;
                return desktop?.MainForm;
            }
            set { dialogowner = value; }
        }

        /// <exclude/>
        public static ISynchronizeInvoke DialogSynchronizeInvoke { get; set; }

        /// <exclude/>
        public static readonly WinFormsMessageService Instance = new WinFormsMessageService();

        private WinFormsMessageService() { }

        static void BeginInvoke(MethodInvoker method)
        {
            ISynchronizeInvoke si = DialogSynchronizeInvoke;
            if (si == null || !si.InvokeRequired)
                method();
            else
                si.BeginInvoke(method, null);
        }

        static void Invoke(MethodInvoker method)
        {
            ISynchronizeInvoke si = DialogSynchronizeInvoke;
            if (si == null || !si.InvokeRequired)
                method();
            else
                si.Invoke(method, null);
        }

        //void ShowError(Exception ex, string message, string title)
        //{
        //    string msg = message + "\n\n";

        //    if (ex != null)
        //        msg += GResources.GetResourceText(29450250) + ": " + ex.ToString(); //RC 29450250 : Došlo k výjimce

        //    BeginInvoke(
        //        delegate
        //        {
        //            using (ErrorInformDialog dlg = new ErrorInformDialog(title, message, ex))
        //                dlg.ShowDialog(DialogOwner);
        //        });
        //}

        /// <exclude/>
        public void ShowError(Exception ex, string message)
        {
            //if (ex != null && ex.Message != message)
            //    message = message + "\n" + ex.Message;
            //else
            //{
            //    //vyjimecne chovani pro GExceptiony -> vezmu kratsi text, ktery je uzivateli lepe ukazovat
            //    //TODO: presto to bude jen obycejny Messagebox. Asi by to chtelo ErrorDialog?
            //    //(presun cele teto Service do projektu GFE?)
            //    var gex = ex as GException;
            //    if (gex != null) message = gex.ShortMessage;
            //}

            //BeginInvoke(delegate { GMessageBox.ShowError(StringParser.Parse(message), DialogOwner); });

            if (message != null && (ex == null || (ex != null && ex.Message != message)))
                ex = new GException(message, ex);
            General.WinApplication.GErrorDialog.DisplayError(ex);
        }

        /// <exclude/>
        public void ShowWarning(string message)
        {
            message = message + "\n\n";
            BeginInvoke(
            delegate
            {
                GMessageBox.ShowWarning(StringParser.Parse(message), DialogOwner);
            });
        }

        /// <summary>
        /// Jednoduchý dotaz
        /// </summary>
        /// <param name="question">Obsah dotazu</param>
        /// <param name="caption">Titulek dialogu</param>
        /// <returns>TRUE - stisknuto tlačítko Yes, jinak FALSE</returns>
        public bool AskQuestion(string question, string caption)
        {
            DialogResult result = DialogResult.None;//GMessageBox.ShowQuestion(StringParser.Parse(question), DialogOwner);

            Invoke(
                delegate
                {
                    result = MessageBox.Show(DialogOwner,
                                            StringParser.Parse(question),
                                            StringParser.Parse(caption),
                                            MessageBoxButtons.YesNo,
                                            MessageBoxIcon.Question,
                                            MessageBoxDefaultButton.Button1,
                                            0);
                });
            return result == DialogResult.Yes;
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
            DialogResult result = DialogResult.None;
            bool asks = true;
            Invoke(
                delegate
                {
                    using (CustomAskQuestion messageBox = new CustomAskQuestion(question, caption))
                    {
                        messageBox.ShowDialog(DialogOwner);
                        result = messageBox.Result;
                        asks = messageBox.AsksNext;
                    }
                });

            asksNext = asks;
            return result == DialogResult.Yes;
        }
        /// <summary>
        /// Vlastní dialogové okno
        /// </summary>
        /// <param name="caption"></param>
        /// <param name="dialogText"></param>
        /// <param name="acceptButtonIndex"></param>
        /// <param name="cancelButtonIndex"></param>
        /// <param name="buttontexts"></param>
        /// <returns></returns>
        public int ShowCustomDialog(string caption, string dialogText, int acceptButtonIndex, int cancelButtonIndex, params string[] buttontexts)
        {
            int result = 0;
            Invoke(
                delegate
                {
                    using (CustomDialog messageBox = new CustomDialog(caption, dialogText, acceptButtonIndex, cancelButtonIndex, buttontexts))
                    {
                        messageBox.ShowDialog(DialogOwner);
                        result = messageBox.Result;
                    }
                });
            return result;
        }

        /// <exclude/>
        public string ShowInputBox(string caption, string dialogText, string defaultValue)
        {
            string result = null;
            Invoke(
                delegate
                {
                    using (InputBox inputBox = new InputBox(dialogText, caption, defaultValue))
                    {
                        inputBox.ShowDialog(DialogOwner);
                        result = inputBox.Result;
                    }
                });
            return result;
        }

        /// <exclude/>
        public void ShowMessage(string message, string caption)
        {
            BeginInvoke(
                delegate
                {
                    GMessageBox.Show(DialogOwner, StringParser.Parse(message), StringParser.Parse(caption));
                });
        }

        /// <exclude/>
        public void InformSaveError(string fileName, string message, string dialogName, Exception exceptionGot)
        {
            BeginInvoke(
                delegate
                {
                    using (ErrorInformDialog dlg = new ErrorInformDialog(fileName, message, dialogName, exceptionGot))
                        dlg.ShowDialog(DialogOwner);
                });
        }

        /// <exclude/>
        public ChooseSaveErrorResult ChooseSaveError(string fileName, string message, string dialogName, Exception exceptionGot, bool chooseLocationEnabled)
        {
            ChooseSaveErrorResult r = ChooseSaveErrorResult.Ignore;
            Invoke(
                delegate
                {
                restartlabel:
                    using (SaveErrorChooseDialog dlg = new SaveErrorChooseDialog(fileName, message, dialogName, exceptionGot, chooseLocationEnabled))
                    {
                        switch (dlg.ShowDialog(DialogOwner))
                        {
                            case DialogResult.OK:
                                // změna umístění:
                                using (SaveFileDialog fdiag = new SaveFileDialog())
                                {
                                    fdiag.OverwritePrompt = true;
                                    fdiag.AddExtension = true;
                                    fdiag.CheckFileExists = false;
                                    fdiag.CheckPathExists = true;
                                    fdiag.Title = GResources.GetResourceText(29450251); //RC 29450251 : Vyberte si alternativní název souboru
                                    fdiag.FileName = fileName;
                                    if (fdiag.ShowDialog() == DialogResult.OK)
                                    {
                                        r = ChooseSaveErrorResult.SaveAlternative(fdiag.FileName);
                                        break;
                                    }
                                    else
                                        goto restartlabel;
                                }
                            case DialogResult.Retry:
                                r = ChooseSaveErrorResult.Retry;
                                break;
                            default:
                                r = ChooseSaveErrorResult.Ignore;
                                break;
                        }
                    }
                });
            return r;
        }

        /// <summary>
        /// Zobrazení informační zprávy
        /// </summary>
        /// <param name="message">Zpráva pro zobrazení</param>
        public void ShowInformation(string message)
        {
            message = message + "\n";
            BeginInvoke(
            delegate
            {
                GMessageBox.ShowInformation(StringParser.Parse(message), DialogOwner);
            });
        }

        /// <summary>
        /// Zobrazení formátováné chyby.
        /// </summary>
        /// <param name="message">Formátovácí řádek</param>
        /// <param name="formatitems">Položky formátovácího řádku</param>
        public void ShowErrorFormatted(string message, object[] formatitems)
        {
            message = message + "\n";
            BeginInvoke(
            delegate
            {
                GMessageBox.ShowErrorFmt(StringParser.Parse(message), formatitems);
            });
        }

        /// <summary>
        /// Zobrazení formátového upozornění
        /// </summary>
        /// <param name="message">maska</param>
        /// <param name="formatitems">parametry</param>
        public void ShowWarningFormatted(string message, object[] formatitems)
        {
            message = message + "\n";
            BeginInvoke(
            delegate
            {
                GMessageBox.ShowWarningFmt(StringParser.Parse(message), formatitems);
            });
        }
    }
}

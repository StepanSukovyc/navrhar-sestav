//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ClipboardHandling.cs                   </Name>
//    <Description> Vložení textu do schránky.                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-13                                                  </Created>
//  </FileHeader>

using System;
using Gordic.TextEditor;
using System.Threading;
using Gordic.General;
using Gordic.GFE.Parsers.WinForm;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Utils;

namespace Gordic.GFE.WinClient.DefaultEditor
{
    /// <summary>
    /// Vložení textu do schránky.
    /// </summary>
    static class ClipboardHandling
    {
        /// <summary>
        /// Inicializace
        /// </summary>
        public static void Initialize()
        {
            TextAreaClipboardHandler.GetClipboardContainsText = GetClipboardContainsText;
            if (SimpleDesktop.MainForm != null)
                SimpleDesktop.MainForm.Activated += MainForm_Activated;
            else
                SimpleDesktop.DesktopCreated += delegate { SimpleDesktop.MainForm.Activated += MainForm_Activated; };
        }

        static void MainForm_Activated(object sender, EventArgs e)
        {
            UpdateClipboardContainsText();
        }

        static volatile bool clipboardContainsText;
        /// <summary>
        /// získání obsahu schránky
        /// </summary>
        /// <returns></returns>
        public static bool GetClipboardContainsText()
        {
            ThreadService.DebugAssertMainThread();
            if (SimpleDesktop.Desktop != null && SimpleDesktop.Desktop.IsActiveWindow)
                UpdateClipboardContainsText();
            return clipboardContainsText;
        }

        static WorkerThread workerThread;
        static IAsyncResult currentWorker;

        static void UpdateClipboardContainsText()
        {
            if (currentWorker != null && !currentWorker.IsCompleted)
                return;

            if (workerThread == null)
            {
                workerThread = new WorkerThread();
                Thread t = new Thread(new ThreadStart(workerThread.RunLoop));
                t.SetApartmentState(ApartmentState.STA);
                t.IsBackground = true;
                t.Name = GResources.GetResourceText(29450202); //RC 29450202 : do schránky
                t.Start();
            }
            currentWorker = workerThread.Enqueue(DoUpdate);
            // čekáme několik vteřín v případě, že schránka je bezproblémově dostupná
            NativeMethods.WaitForSingleObject(currentWorker.AsyncWaitHandle.SafeWaitHandle, 50);
        }

        /// <summary>
        /// aktualizace obsahu schránky
        /// </summary>
        static void DoUpdate() { clipboardContainsText = ClipboardWrapper.ContainsText; }
    }
}

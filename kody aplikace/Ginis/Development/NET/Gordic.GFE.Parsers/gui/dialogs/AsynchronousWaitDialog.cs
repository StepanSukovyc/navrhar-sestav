//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.AsynchronousWaitDialog.cs                </Name>
//    <Description> Zobrazení čekacího dialogu v separovaném vlákně.            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Gordic.WinForms.Controls;
using Gordic.General;
using Gordic.GFE.Parsers.Services;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Zobrazení čekacího dialogu v separovaném vlákně.
    /// </summary>
    public sealed class AsynchronousWaitDialog : IDisposable
    {
        readonly object lockObject = new object();
        static volatile List<string> tasks = new List<string>();
        /// <summary>
        /// Get/Set - Název úkolu
        /// </summary>
        public string TaskName
        {
            get { return tasks.Last(); }
            set
            {
                if (tasks.Last() != value)
                {
                    lock (lockObject)
                        tasks.Add(value);

                    Start();
                }
            }
        }

        /// <summary>
        /// TRUE - dialog zobrazen
        /// </summary>
        public static bool IsStarted { get { return tasks.Count != 0; } }

        bool showingDialog;
        /// <summary>
        /// Zobrazení dialogu
        /// </summary>
        public bool ShowingDialog
        {
            get { return showingDialog; }
            set
            {
                if (showingDialog != value)
                {
                    lock (lockObject)
                        showingDialog = value;

                    if (!showingDialog)
                        Stop();
                    else
                        Start();
                }
            }
        }

        /// <summary>
        /// Zobrazení čekacího dialogu.
        /// </summary>
        /// <param name="titleName">Titulek dialogu</param>
        /// <returns></returns>
        public static AsynchronousWaitDialog ShowWaitDialog(string titleName)
        {
            if (titleName == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450516)); //RC 29450516 : Titulek okna nesmí být NULL!

            AsynchronousWaitDialog h = new AsynchronousWaitDialog(titleName);
            h.Start();
            return h;
        }
        /// <summary>
        /// Prázdný dialog
        /// </summary>
        public static AsynchronousWaitDialog Empty { get => null; }
        static bool pause = false;
        /// <summary>
        /// Prázdný dialog
        /// </summary>
        public static void Pause() { GWaitForm.HideWaitForm(); pause = true; }

        /// <summary>
        /// Prázdný dialog
        /// </summary>
        public static void ReStart()
        {
            if (tasks.Count != 0)
            {
                pause = false;
                AsynchronousWaitDialog h = new AsynchronousWaitDialog();
                h.Start();
            }
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public AsynchronousWaitDialog() { }
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="titleName">Titulek</param>
        public AsynchronousWaitDialog(string titleName)
        {
            tasks.Add(titleName);
        }

        /// <summary>
        /// Zavření dialogu.
        /// </summary>
        public void Dispose()
        {
            lock (lockObject)
            {
                GWaitForm.HideWaitForm();
                if (tasks.Count != 0)
                    tasks.Remove(tasks.Last());

                ReStart();
            }
        }

        /// <summary>
        /// Spuštění čekacího dialogu
        /// </summary>
        public void Start()
        {
            if (ProcessService.Assembly != null)
            {
                pause = false;
                Thread newThread = new Thread(Run)
                {
                    Name = string.Join(" ", GResources.GetResourceText(29450405), "AsynchronousWaitDialog") //RC 29450405 : Vlákno
                };
                newThread.Start();
                Thread.Sleep(0); // umožňuje nový start vlákna
            }
        }
        /// <summary>
        /// Spuštění čekacího dialogu
        /// </summary>
        public void Stop()
        {
            if (tasks.Count != 0)
                tasks.Remove(tasks.Last());

            if (tasks.Count == 0)
            {
                GWaitForm.HideWaitForm();
                showingDialog = false;
            }
        }
        [STAThread]
        void Run()
        {
            lock (lockObject)
            {
                if (tasks.Count != 0 && !pause && tasks.Last() != null)
                {
                    GWaitForm.ShowWaitForm(tasks.Last());
                    showingDialog = true;
                }
            }
        }
    }
}

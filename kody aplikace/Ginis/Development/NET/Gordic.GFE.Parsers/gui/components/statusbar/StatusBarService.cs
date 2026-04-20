//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.StatusBarService.cs                    </Name>
//    <Description> Služba práci se status bar                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-12-27                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Služba práci se status bar
    /// </summary>
    public static class StatusBarService
    {
        static DesignerStatusBar statusBar = null;
        static readonly bool wasError = false;
        static string lastMessage = string.Empty;

        /// <summary>
        /// Indikuje viditelnost lišty
        /// </summary>
        public static bool Visible
        {
            get
            {
                System.Diagnostics.Debug.Assert(statusBar != null);
                return statusBar != null ? statusBar.Visible : false;
            }
            set
            {
                System.Diagnostics.Debug.Assert(statusBar != null);
                if (statusBar != null)
                    statusBar.Visible = value;
            }
        }
        /// <summary>
        /// Ovladač lišty
        /// </summary>
        public static Control Control
        {
            get
            {
                System.Diagnostics.Debug.Assert(statusBar != null);
                return statusBar;
            }
        }

        /// <summary>
        /// Inicializace služby
        /// </summary>
        public static void Initialize() { statusBar = new DesignerStatusBar(); }
        /// <summary>
        /// Nastavení aktuální pozice
        /// </summary>
        /// <param name="x">Pozice X</param>
        /// <param name="y">Pozice Y</param>
        /// <param name="charOffset">symbol offsetu</param>
        public static void SetCaretPosition(int x, int y, int charOffset)
        {
            if (statusBar != null)
                statusBar.CursorStatusBarPanel.Text = StringParser.Parse(
                    GResources.GetResourceText(29450229) + " ${Line} " + GResources.GetResourceText(29450230) + " ${Column} " + GResources.GetResourceText(29450371) + " ${Character}", //RC 29450371 : symbol
                    new string[,] {
                    {"Line", String.Format("{0,-10}", y)},
                    {"Column", String.Format("{0,-5}", x)},
                    {"Character", String.Format("{0,-5}", charOffset)}
                    });
        }
        /// <summary>
        /// Nastavení režimu vložení
        /// </summary>
        /// <param name="insertMode">Indikuje režim vložení</param>
        public static void SetInsertMode(bool insertMode)
        {
            if (statusBar != null)
                statusBar.ModeStatusBarPanel.Text = insertMode
                    ? StringParser.Parse("INS")
                    : StringParser.Parse("OVR");
        }
        /// <summary>
        /// Zobrazení chyby
        /// </summary>
        /// <param name="message">Zpráva chyby</param>
        public static void ShowErrorMessage(string message)
        {
            System.Diagnostics.Debug.Assert(statusBar != null);
            if (statusBar != null)
                statusBar.ShowErrorMessage(StringParser.Parse(message));
        }
        /// <summary>
        /// Nastavení zprávy
        /// </summary>
        /// <param name="message">Zpráva</param>
        public static void SetMessage(string message)
        {
            //System.Diagnostics.Debug.Assert(statusBar != null);
            lastMessage = message;
            if (statusBar != null)
                statusBar.SetMessage(StringParser.Parse(message));
        }
        /// <summary>
        /// Nastavení zprávy s obrázkem
        /// </summary>
        /// <param name="image">Obrázek zprávy</param>
        /// <param name="message">Obsah zprávy</param>
        public static void SetMessage(Image image, string message)
        {
            System.Diagnostics.Debug.Assert(statusBar != null);
            if (statusBar != null)
                statusBar.SetMessage(image, StringParser.Parse(message));
        }
        /// <summary>
        /// Nastavení zprávy
        /// </summary>
        /// <param name="message">Obsah zprávy</param>
        /// <param name="highlighted">Zvýraznění</param>
        public static void SetMessage(string message, bool highlighted)
        {
            if (statusBar != null)
                statusBar.SetMessage(message, highlighted);
        }
        /// <summary>
        /// Překreslení lišty
        /// </summary>
        public static void RedrawStatusbar()
        {
            if (wasError)
                ShowErrorMessage(lastMessage);
            else
                SetMessage(lastMessage);

            Visible = PropertyService.Get("Gui.StatusBarVisible", true);
        }
        /// <summary>
        /// Aktualizace lišty
        /// </summary>
        public static void Update()
        {
            System.Diagnostics.Debug.Assert(statusBar != null);
        }

        #region Progress Monitor
        static HashSet<StatusBarProgressMonitor> activeProgressMonitors = new HashSet<StatusBarProgressMonitor>();
        static StatusBarProgressMonitor currentProgressMonitor;
        /// <summary>
        /// Vytvoření sledovače průběhu
        /// </summary>
        /// <returns></returns>
        public static IProgressMonitor CreateProgressMonitor()
        {
            System.Diagnostics.Debug.Assert(statusBar != null);
            return new StatusBarProgressMonitor();
        }

        sealed class StatusBarProgressMonitor : IProgressMonitor
        {
            int workDone, totalWork;

            public int WorkDone
            {
                get { return workDone; }
                set
                {
                    if (workDone == value)
                        return;
                    workDone = value;
                    lock (activeProgressMonitors)
                    {
                        if (currentProgressMonitor == this)
                            UpdateDisplay();
                    }
                }
            }

            void UpdateDisplay() { if (statusBar != null) statusBar.DisplayProgress(taskName, workDone, totalWork); }

            string taskName;
            /// <summary>
            /// název úkolu
            /// </summary>
            public string TaskName
            {
                get { return taskName; }
                set
                {
                    if (taskName == value)
                        return;
                    taskName = value;
                    lock (activeProgressMonitors)
                    {
                        if (currentProgressMonitor == this)
                            UpdateDisplay();
                    }
                }
            }
            /// <summary>
            /// indikuje, že dialog je již zobrazen
            /// </summary>
            public bool ShowingDialog { get; set; }
            /// <summary>
            /// indikuje přerušení
            /// </summary>
            public bool IsCancelled { get { return false; } }

            /// <summary>
            /// začátek provedení úkolu
            /// </summary>
            /// <param name="name">název</param>
            /// <param name="totalWork">celkový pčet práce</param>
            /// <param name="allowCancel">indikuje povolení přerušení úkolu</param>
            public void BeginTask(string name, int totalWork, bool allowCancel)
            {
                lock (activeProgressMonitors)
                {
                    activeProgressMonitors.Add(this);
                    currentProgressMonitor = this;
                    taskName = name;
                    workDone = 0;
                    this.totalWork = totalWork;
                    UpdateDisplay();
                }
            }
            /// <summary>
            /// provedení
            /// </summary>
            public void Done()
            {
                lock (activeProgressMonitors)
                {
                    activeProgressMonitors.Remove(this);
                    if (currentProgressMonitor == this)
                    {
                        if (activeProgressMonitors.Count > 0)
                        {
                            currentProgressMonitor = activeProgressMonitors.First();
                            currentProgressMonitor.UpdateDisplay();
                        }
                        else
                        {
                            currentProgressMonitor = null;
                            if (statusBar != null)
                                statusBar.HideProgress();
                        }
                    }
                }
            }

            /// <summary>
            /// přerušení úkolu
            /// </summary>
            public event EventHandler Cancelled { add { } remove { } }
        }
        #endregion
    }
}

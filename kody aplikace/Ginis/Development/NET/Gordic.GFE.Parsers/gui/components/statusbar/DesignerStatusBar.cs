//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DesignerStatusBar.cs                         </Name>
//    <Description> Report designer status bar                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-12-27                                                  </Created>
//  </FileHeader>

using System;
using System.Drawing;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Report designer status bar
    /// </summary>
    class DesignerStatusBar : StatusStrip
    {
        ToolStripProgressBar statusProgressBar = new ToolStripProgressBar();

        ToolStripStatusLabel jobNamePanel = new ToolStripStatusLabel();
        ToolStripStatusLabel txtStatusBarPanel = new ToolStripStatusLabel();
        ToolStripStatusLabel cursorStatusBarPanel = new ToolStripStatusLabel();
        ToolStripStatusLabel modeStatusBarPanel = new ToolStripStatusLabel();
        ToolStripStatusLabel springLabel = new ToolStripStatusLabel();
        
        // zobrazení sledování
        bool statusProgressBarIsVisible;
        string currentTaskName;

        /// <summary>
        /// Status bar pro zobrazení stavu kurzóru
        /// </summary>
        public ToolStripStatusLabel CursorStatusBarPanel { get { return cursorStatusBarPanel; } }
        /// <summary>
        /// Status bar pro zobrazení režimu
        /// </summary>
        public ToolStripStatusLabel ModeStatusBarPanel { get { return modeStatusBarPanel; } }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public DesignerStatusBar()
        {
            springLabel.Spring = true;
            cursorStatusBarPanel.AutoSize = false;
            cursorStatusBarPanel.Width = 250;
            modeStatusBarPanel.AutoSize = false;
            modeStatusBarPanel.Width = 25;
            statusProgressBar.Visible = false;
            statusProgressBar.Width = 100;

            Items.AddRange(new ToolStripItem[] { txtStatusBarPanel, springLabel, jobNamePanel, statusProgressBar, cursorStatusBarPanel, modeStatusBarPanel });
        }

        /// <summary>
        /// Zobrazení chybové zprávy
        /// </summary>
        /// <param name="message">Obsah zprávy</param>
        public void ShowErrorMessage(string message) { SetMessage(GResources.GetResourceText(29450270) + ": " + message); } //RC 29450270 : Chyba

        /// <summary>
        /// Zobrazení zprávy s obrázkem
        /// </summary>
        /// <param name="image">Obrázek zprávy</param>
        /// <param name="message">Obsah zprávy</param>
        public void ShowErrorMessage(Image image, string message) { SetMessage(image, GResources.GetResourceText(29450270) + ": " + message); } //RC 29450270 : Chyba

        /// <summary>
        /// Nastavení zprávy
        /// </summary>
        /// <param name="message">Obsah zprávy</param>
        public void SetMessage(string message) { SetMessage(message, false); }

        /// <summary>
        /// Nastavení zprávy s výrazněním
        /// </summary>
        /// <param name="message">Obsah zprávy</param>
        /// <param name="highlighted">Indikuje zvýraznení</param>
        public void SetMessage(string message, bool highlighted)
        {
            void setMessageAction()
            {
                if (highlighted)
                {
                    txtStatusBarPanel.BackColor = SystemColors.Highlight;
                    txtStatusBarPanel.ForeColor = Color.White;
                }
                else if (txtStatusBarPanel.BackColor == SystemColors.Highlight)
                {
                    txtStatusBarPanel.BackColor = SystemColors.Control;
                    txtStatusBarPanel.ForeColor = SystemColors.ControlText;
                }
                txtStatusBarPanel.Text = message;
            }
            if (ThreadService.InvokeRequired)
                ThreadService.SafeThreadAsyncCall(setMessageAction);
            else
                setMessageAction();
        }
        /// <summary>
        /// Nastavení zprávy s obrázkem
        /// </summary>
        /// <param name="image">Obrázek zprávy</param>
        /// <param name="message">Obsah zprávy</param>
        public void SetMessage(Image image, string message) { SetMessage(message); }

        /// <summary>
        /// Zobrazení sledování
        /// </summary>
        /// <param name="taskName">Název úlohy</param>
        /// <param name="workDone">prácnost</param>
        /// <param name="totalWork">celková prácnost</param>
        public void DisplayProgress(string taskName, int workDone, int totalWork)
        {
            if (taskName == null)
                taskName = string.Empty;
            if (totalWork < 0)
                totalWork = 0;
            if (workDone < 0)
                workDone = 0;
            if (workDone > totalWork)
                workDone = totalWork;

            ThreadService.SafeThreadAsyncCall(
                delegate
                {
                    if (!statusProgressBarIsVisible)
                    {
                        statusProgressBar.Visible = true;
                        statusProgressBarIsVisible = true;
                    }

                    if (totalWork == 0)
                        statusProgressBar.Style = ProgressBarStyle.Marquee;
                    else
                    {
                        statusProgressBar.Style = ProgressBarStyle.Continuous;
                        if (statusProgressBar.Maximum != totalWork)
                        {
                            if (statusProgressBar.Value > totalWork)
                                statusProgressBar.Value = 0;
                            statusProgressBar.Maximum = totalWork;
                        }
                        statusProgressBar.Value = workDone;
                    }

                    if (currentTaskName != taskName)
                    {
                        currentTaskName = taskName;
                        jobNamePanel.Text = StringParser.Parse(taskName);
                    }
                });
        }
        /// <summary>
        /// skrytí sledování
        /// </summary>
        public void HideProgress()
        {
            ThreadService.SafeThreadAsyncCall(
                delegate
                {
                    statusProgressBarIsVisible = false;
                    statusProgressBar.Visible = false;
                    jobNamePanel.Text = currentTaskName = string.Empty;
                });
        }
    }
}

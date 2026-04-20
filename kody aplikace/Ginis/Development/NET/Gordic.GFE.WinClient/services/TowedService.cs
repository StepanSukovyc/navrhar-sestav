//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.TowedService.cs                        </Name>
//    <Description> služba pro práci s objekty pod kurzorem                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-05-02                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;
using Gordic.WinForms.Controls;

namespace Gordic.GFE.WinClient.Services
{
    /// <summary>
    /// služba pro práci s objekty pod kurzorem
    /// </summary>
    static class TowedService
    {
        #region Objekty pod myši
        /// <summary>
        /// Container pod taženým objektem
        /// </summary>
        public static URAbstractContainer TowedComponent { get; set; }

        // tento delegat povoluje asynchronní volání nastavení textové hodnoty ovladače ToolStrip
        public delegate void SetShowHintCallback(GHintText text, Control parent, Point location, int duration, bool baloon);
        static object towedObject = new object();
        static Control control;
        static Point location;
        /// <summary>
        /// seznam úkolů hledání objektu pod daným
        /// </summary>
        static readonly List<Task> tasks = new List<Task>();
        /// <summary>
        /// umožňuje synchronní přístup
        /// </summary>
        static readonly object syncRoot = new object();
        static volatile bool abortTowedTasksThread = false;

        /// <summary>
        /// spuštění služby hledání objektu
        /// </summary>
        public static void StartTowedService()
        {
            if (tasks.Count != 0)
            {
                abortTowedTasksThread = false;
                Thread tasksThread = new Thread(new ThreadStart(TowedTasksThread));
                tasksThread.Name = "TowedTasks";
                tasksThread.Priority = ThreadPriority.BelowNormal;
                tasksThread.IsBackground = true;
                tasksThread.Start();
            }
        }
        /// <summary>
        /// Zastavení služby analýzy obsahu
        /// </summary>
        public static void StopTowedThread()
        {
            // zabráníme vytváření nových úloh
            abortTowedTasksThread = true;
            tokenSource.Cancel();
        }

        static void TowedTasksThread()
        {
            while (!abortTowedTasksThread)
            {
                try { refreshTasks(); }
                catch (Exception e)
                {
                    MessageService.ShowError(e);
                    // počkáme, až si uživatel přečte vyjímku
                    Thread.Sleep(10000);
                }
            }
        }

        static void refreshTasks()
        {
            lock (syncRoot)
            {
                int index = 0;
                while (index < tasks.Count)
                    if (tasks[index].IsCompleted)
                        tasks.RemoveAt(index);
                    else index++;
            }
        }
        readonly static CancellationTokenSource tokenSource = new CancellationTokenSource();

        /// <summary>
        /// přetížení delegatem
        /// </summary>
        delegate void HideHint();
        /// <summary>
        /// Objekt, nad kterým se pohybujeme myši
        /// </summary>
        public static object TowedObject
        {
            get => towedObject;
            set => SetTowedObject(value);
        }

        /// <summary>
        /// Nastvaí objekt, nad kterým se pohybujeme mýši
        /// </summary>
        /// <param name="value">Objekt k nastavení</param>
        /// <param name="withCompare">TRUE - nastaví nový objekt pouze pokud je jiný, než původní</param>
        public static void SetTowedObject(object value, bool withCompare = true)
        {
            if (withCompare && Equal(towedObject, value)) 
                return;
            bool _isToolTipAllow = ReportDesignerProperties.Instance.ShowToolTip && control != null
                , _isCtrlToolTipAllow = _isToolTipAllow && (Control.ModifierKeys & Keys.Control) != Keys.Control;
            // pokud nápověda je aktivovaná ale není stisknutá klávesa Ctrl
            if (towedObject != null && _isToolTipAllow && !Equal(towedObject, value))
            {
                //příprava pro Nápovědný text
                // skryjeme již existující
                HideHint ehna = GToolTipService.HideHint;
                control.Invoke(ehna);
            }

            towedObject = value;
            if (_isCtrlToolTipAllow)
            {
                IToolTip toolTip = towedObject as IToolTip;

                if (toolTip == null && towedObject is List<object>)
                    toolTip = (towedObject as List<object>).FindLast(itm => itm is IToolTip) as IToolTip;

                if (toolTip != null)
                {
                    SetShowHintCallback sshc = new SetShowHintCallback(GToolTipService.ShowHint);
                    if (toolTip.Control == null)
                        toolTip.Control = control as ScrollableControl;

                    if (!toolTip.ToolTipText.IsEmpty)
                        control.Invoke(sshc, new object[] { toolTip.ToolTipText, toolTip.Control, location, ReportDesignerProperties.Instance.Duration, true });
                }

                control?.Invalidate();
            }
        }

        static bool Equal(object towedObject, object value)
        {
            if (towedObject is List<object> && value is List<object>)
            {
                List<object> list_towed = towedObject as List<object>, list_value = value as List<object>;
                foreach (var item in list_towed)
                    if (list_value.Find(itm => itm == item) == null)
                        return false;

                return list_towed.Count == list_value.Count;
            }
            else return towedObject == value;
        }

        /// <summary>
        /// Metoda startující vlákno zjištění objektu nachazejícího se POD kurzorem
        /// </summary>
        /// <param name="e">Poloha kurzoru v momentě volání</param>
        /// <param name="setTowedObject">Metoda hledání objektu pod myši</param>
        /// <param name="panel">Ovladač, nad kterým se pohybujeme</param>
        public static void StartTowedObjectThread(MouseEventArgs e, EventHandlerObjectArgument setTowedObject, ScrollableControl panel)
        {
            location = new Point(e.Location.X - panel.HorizontalScroll.Value, e.Location.Y - panel.VerticalScroll.Value);
            control = panel;

            if (setTowedObject != null)
                ThreadService.SafeThreadAsyncCall(delegate { try { setTowedObject(e); } catch (Exception ex) { LoggingService.Error(ex); } });
        }
        #endregion
    }
}

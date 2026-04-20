//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ThreadService.cs                         </Name>
//    <Description> Služba pro práci s vlákny                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.General;
using Excel = Microsoft.Office.Interop.Excel;
using Gordic.GFE.Parsers.AddIns;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Služba pro práci s vlákny
    /// </summary>
    public static class ThreadService
    {
        static Dictionary<IDesktop, STAThreadCaller> callers = new Dictionary<IDesktop, STAThreadCaller>();

        /// <summary>
        /// Vynucené volání
        /// </summary>
        public static bool InvokeRequired
        {
            get
            {
                IDesktop desktop = ProcessService.Desktop;
                return desktop == null ? false : desktop.MainForm.InvokeRequired;
            }
        }

        public static Dictionary<object, Task> TasksT => tasksT;

        static List<object> methods = new List<object>();
        static readonly Dictionary<Action, Task> tasks = new Dictionary<Action, Task>();
        static readonly Dictionary<object, Task> tasksT = new Dictionary<object, Task>();
        static readonly Dictionary<object, Task> tasksTT = new Dictionary<object, Task>();
        readonly static object[] emptyObjectArray = new object[0];

        /// <summary>
        /// služba je inicializovaná
        /// </summary>
        static bool Initialized(IDesktop desktop) { return desktop != null && callers.ContainsKey(desktop); }

        /// <summary>
        /// Připojení pracovní plochy a správce volání metod ke službě
        /// </summary>
        /// <param name="desktop">Pracovní plocha</param>
        public static void ActivateCaller(IDesktop desktop)
        {
            if (desktop == null)
            {
                MessageService.ShowError(GResources.GetResourceText(29450470)); //RC 29450470 : Nedostatek informace pro připojení pracovní plochy do služby zpracování vláken!
                return;
            }

            if (!callers.ContainsKey(desktop))
            {
                callers.Add(desktop, new STAThreadCaller(desktop.MainForm));
                if (callers.Count == 1)
                    ProcessService.AfterDetach += ProcessServiceAfterDetach;
            }
        }

        static Dictionary<IDesktop, List<object>> lockers = new Dictionary<IDesktop, List<object>>();
        /// <summary>
        /// Asynchronní volání GUI podprocesů bez čekání na výsledek
        /// </summary>
        /// <param name="method">Volaná metoda</param>
        /// <param name="syncLocker">zámek</param>
        /// <param name="objectArray">zámek</param>
        public static void SafeThreadAsyncCall(System.Action method, object syncLocker = null, object[] objectArray = null)
        {
            IDesktop desktop = ProcessService.Desktop;
            if (Initialized(desktop))
            {
                if (syncLocker != null)
                    AddLocker(syncLocker, desktop);
                callers[desktop].BeginCall(method, objectArray ?? emptyObjectArray);
            }
        }

        /// <summary>
        /// Bezpečné volání GUI metody. 
        /// POZOR: tato metoda čeká na výsledek operace
        /// </summary>
        /// <param name="method">Volaná metoda</param>
        /// <param name="syncLocker">zámek</param>
        public static void SafeThreadLockCall(Action method, object syncLocker = null)
        {
            IDesktop desktop = ProcessService.Desktop;
            if (Initialized(desktop))
            {
                if (syncLocker != null)
                    AddLocker(syncLocker, desktop);
                callers[desktop].Call(method, emptyObjectArray);
            }
            if (syncLocker != null)
                LoggingService.Info("IS ENDED");
        }

        static void AddLocker(object syncLocker, IDesktop desktop)
        {
            if (!lockers.ContainsKey(desktop))
                lockers.Add(desktop, new List<object>());

            AddLock(lockers[desktop], syncLocker);
        }

        static void AddLock(List<object> list, object syncLocker)
        {
            if (!list.Contains(syncLocker))
                list.Add(syncLocker);
        }

        /// <summary>
        /// čekání na registrované zámky
        /// </summary>
        public static void WaitForLockers()
        {
            IDesktop desktop = ProcessService.Desktop;
            if (Initialized(desktop) && lockers.ContainsKey(desktop))
            {
                foreach (var item in lockers[desktop])
                    if (CommonService.IsLocked(item))
                        Monitor.Wait(item);

                lockers[desktop].Clear();
            }
        }

        //static bool CanCall(Action method)
        //{
        //    int index = methods.IndexOf(method);
        //    return index == -1;
        //    //if (index != -1)
        //    //    if ((methods[index] is Action) && (methods[index] as Action))
        //    //        methods.Remove(method);
        //    //    else
        //    //        return false;
        //    //return true;

        //    //if (tasks.ContainsKey(method))
        //    //{
        //    //    if (tasks[method].IsCompleted)
        //    //    {
        //    //        tasks.Remove(method);
        //    //        return true;
        //    //    }
        //    //    return false;
        //    //}
        //    //return true;
        //}
        //static bool CanCall<T>(Action<T> method)
        //{
        //    int index = methods.IndexOf(method);
        //    if (index != -1)
        //        if ((methods[index] is Action<T>) && (methods[index] as Action<T>).Method.IsFinal)
        //            methods.Remove(method);
        //        else
        //            return false;
        //    return true;
        //}
        //static bool CanCall<A, B>(Action<A, B> method)
        //{
        //    int index = methods.IndexOf(method);
        //    if (index != -1)
        //        if ((methods[index] is Action<A, B>) && (methods[index] as Action<A, B>).Method.IsFinal)
        //            methods.Remove(method);
        //        else
        //            return false;
        //    return true;
        //}
        ///// <summary>
        ///// zjištění, zda se může volát daná funkce
        ///// </summary>
        ///// <typeparam name="R"></typeparam>
        ///// <param name="method"></param>
        ///// <returns></returns>
        //public static bool CanCall<R>(Func<R> method)
        //{
        //    int index = methods.IndexOf(method);
        //    if (index != -1)
        //        if ((methods[index] is Func<R>) && (methods[index] as Func<R>).Method.IsFinal)
        //            methods.Remove(method);
        //        else
        //            return false;
        //    return true;
        //}


        public static void SafeThreadAsyncCall<A>(AbstractPagePanel parent, Action<A> method, A arg1)
        {
            var res = ThreadService.SafeThreadAsyncCall(method, arg1);
            if (res == false) parent.BeginInvoke(method, new object[] { arg1 });
        }

        /// <summary>
        /// Asynchronní volání GUI podprocesů bez čekání na výsledek
        /// </summary>
        /// <typeparam name="A">Typ prvního parametru</typeparam>
        /// <param name="method">Volaná metoda</param>
        /// <param name="arg1">První parametr</param>
        public static bool SafeThreadAsyncCall<A>(Action<A> method, A arg1)
        {
            var res = false;
            IDesktop desktop = ProcessService.Desktop;
            if (Initialized(desktop))
            { callers[desktop].BeginCall(method, new object[] { arg1 }); res = true; }
            //if (desktop != null && callers.ContainsKey(desktop) && CanCall(method))
            //    tasksT.Add(method, Task.Factory.StartNew(() => callers[desktop].BeginCall(method, new object[] { arg1 })));

            //IDesktop desktop = ProcessService.Desktop;

            //if (desktop != null && callers.ContainsKey(desktop) && CanCall(method))
            //{
            //    callers[desktop].BeginCall(method, new object[] { arg1 });
            //    methods.Add(method);
            //}
            return res;
        }

        /// <summary>
        /// Bezpečné volání GUI metody. 
        /// POZOR: tato metoda čeká na výsledek operace
        /// </summary>
        /// <typeparam name="A">Typ proměnné</typeparam>
        /// <param name="method">Volaná metoda</param>
        /// <param name="arg1">Argument volané metody</param>
        public static void SafeThreadCall<A>(Action<A> method, A arg1)
        {
            IDesktop desktop = ProcessService.Desktop;
            if (Initialized(desktop))
                callers[desktop].Call(method, new object[] { arg1 });
            //if (desktop != null && callers.ContainsKey(desktop) && CanCall(method))
            //{
            //    callers[desktop].Call(method, new object[] { arg1 });
            //    methods.Add(method);
            //}
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="method"></param>
        /// <param name="treeNode"></param>
        /// <param name="excelDocument"></param>
        /// <param name="parentHandle"></param>
        /// <param name="officeWnd"></param>
        /// <param name="document"></param>
        public static void SafeThreadOfficeCall(Action<StructExtNode, Excel._Workbook, IntPtr, IntPtr, IOfficeDocument> method, StructExtNode treeNode, Excel._Workbook excelDocument, IntPtr parentHandle, IntPtr officeWnd, IOfficeDocument document)
        {
            IDesktop desktop = ProcessService.Desktop;
            if (Initialized(desktop))
                callers[desktop].Call(method, new object[] { treeNode, excelDocument, parentHandle, officeWnd, document });
        }

        /// <summary>
        /// Bezpečné asynchronní volání GUI metody. 
        /// </summary>
        /// <typeparam name="A">Typ prvního parametru</typeparam>
        /// <typeparam name="B">Typ druhého parametru</typeparam>
        /// <param name="method">Volaná metoda</param>
        /// <param name="arg1">První argument metody</param>
        /// <param name="arg2">Druhý argument metody</param>
        public static void SafeThreadAsyncCall<A, B>(Action<A, B> method, A arg1, B arg2)
        {
            IDesktop desktop = ProcessService.Desktop;

            if (Initialized(desktop))
                callers[desktop].Call(method, new object[] { arg1, arg2 });
            //if (desktop != null && callers.ContainsKey(desktop) && CanCall(method))
            //    tasksTT.Add(method, Task.Factory.StartNew(() => callers[desktop].Call(method, new object[] { arg1, arg2 })));

            //if (desktop != null && callers.ContainsKey(desktop) && CanCall(method))
            //{
            //    callers[desktop].Call(method, new object[] { arg1, arg2 });
            //    methods.Add(method);
            //}
        }

        /// <summary>
        /// Generuje vyjímku v případě, že vlákno není hlávní vlákno.
        /// </summary>
        [Conditional("DEBUG")]
        public static void DebugAssertMainThread() { AssertMainThread(); }

        /// <summary>
        /// Generuje vyjímku v případě, že vlákno není hlávní vlákno.
        /// </summary>
        public static void AssertMainThread()
        {
            if (InvokeRequired)
                throw new InvalidOperationException(GResources.GetResourceText(29450471)); //RC 29450471 : Tato operace může být voláná pouze v hlavním vlákně!
        }

        /// <summary>
        /// Bezpečné volání GUI funkce.
        /// POZOR: tato metoda čeká na výsledek operace
        /// </summary>
        /// <typeparam name="R">Typ proměnné</typeparam>
        /// <param name="method">Volaná metoda</param>
        /// <returns>Výsledek funkce</returns>
        public static R SafeThreadFunction<R>(Func<R> method)
        {
            methods.Add(method);
            return (R)callers[ProcessService.Desktop].Call(method, emptyObjectArray);
        }


        static Dictionary<string, Action> actions = new Dictionary<string, Action>();
        /// <summary>
        /// Volání GUI metody s menším zpožděním.
        /// </summary>
        /// <param name="delayMilliseconds">Délka zpoždění</param>
        /// <param name="method">Volaná metoda</param>
        /// <param name="methodGUID">identifikátor metody</param>
        public static void UniqueCallLater(int delayMilliseconds, Action method, string methodGUID)
        {
            if (delayMilliseconds <= 0)
                throw new ArgumentOutOfRangeException("delayMilliseconds", delayMilliseconds, GResources.GetResourceText(29450472)); //RC 29450472 : Hodnota musí být pozitivní!
            if (method == null)
                throw new ArgumentNullException("CallLater: " + GResources.GetResourceText(29450277)); //RC 29450277 : metoda je prázdná!

            if (!actions.ContainsKey(methodGUID))
            {
                actions.Add(methodGUID, method);
                SafeThreadAsyncCall(
                    delegate
                    {
                        System.Windows.Forms.Timer t = new System.Windows.Forms.Timer
                        {
                            Interval = delayMilliseconds
                        };
                        t.Tick += delegate
                        {
                            t.Stop();
                            t.Dispose();
                            method();
                            actions.Remove(methodGUID);
                        };
                        t.Start();
                    });
            }
        }

        /// <summary>
        /// Volání GUI metody s menším zpožděním.
        /// </summary>
        /// <param name="delayMilliseconds">Délka zpoždění</param>
        /// <param name="method">Volaná metoda</param>
        public static void CallLater(int delayMilliseconds, Action method)
        {
            if (delayMilliseconds <= 0)
                throw new ArgumentOutOfRangeException("delayMilliseconds", delayMilliseconds, GResources.GetResourceText(29450472)); //RC 29450472 : Hodnota musí být pozitivní!
            if (method == null)
                throw new ArgumentNullException("CallLater: " + GResources.GetResourceText(29450277)); //RC 29450277 : metoda je prázdná!
            SafeThreadAsyncCall(
                delegate
                {
                    System.Windows.Forms.Timer t = new System.Windows.Forms.Timer
                    {
                        Interval = delayMilliseconds
                    };
                    t.Tick += delegate
                    {
                        t.Stop();
                        t.Dispose();
                        method();
                    };
                    t.Start();
                });
        }

        /// <summary>
        /// Bezpečné volání GUI metody
        /// </summary>
        /// <param name="method">Volaná metoda</param>
        public static void SafeThreadCall(Action method)
        {
            IDesktop desktop = ProcessService.Desktop;
            if (Initialized(desktop))
                callers[desktop].Call(method, emptyObjectArray);
        }

        /// <summary>
        /// Připojení pracovní plochy a správce volání metod ke službě
        /// </summary>
        /// <param name="desktop">Pracovní plocha</param>
        public static void DeactivateCaller(IDesktop desktop)
        {
            if (Initialized(desktop))
                callers.Remove(desktop);
            else
                LoggingService.Error(GResources.GetResourceText(29450473)); //RC 29450473 : Nedostatek informace pro odpojení pracovní plochy od služby zpracování vláken!
        }

        static void ProcessServiceAfterDetach(object sender, EventArgs e)
        {
            IDesktop desktop = ProcessService.Desktop;
            if (Initialized(desktop))
            {
                callers.Remove(desktop);
                if (callers.Count == 0)
                    ProcessService.AfterDetach -= ProcessServiceAfterDetach;
            }
        }
    }
}

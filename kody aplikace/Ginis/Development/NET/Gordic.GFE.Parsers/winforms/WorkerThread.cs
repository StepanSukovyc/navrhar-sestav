//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.WorkerThread.cs                        </Name>
//    <Description> Pracovní vlákno - normálně spí, ale může běžet.             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Threading;
using Gordic.General;

namespace Gordic.GFE.Parsers.WinForm
{
    /// <summary>
    /// Pracovní vlákno - normálně spí, ale může běžet.
    /// 
    /// Tato třída nevytváří vlastní pracovní vlákno, ale
    /// pouze spravuje úkoly pro pracovní vlákno, který volá <see cref="RunLoop"/>.
    /// </summary>
    public class WorkerThread
    {
        sealed class AsyncTask : IAsyncResult, IDisposable
        {
            #region IDisposable
            public void Dispose()
            {
                Dispose(true);
                GC.SuppressFinalize(this);
            }
            void Dispose(bool disposing)
            {
                if (disposing)
                    manualResetEvent?.Dispose();
            }
            ~AsyncTask() { Dispose(false); }
            #endregion

            /// <summary>
            /// manuální aktualizace událostis
            /// </summary>
            internal readonly ManualResetEvent manualResetEvent = new ManualResetEvent(false);
            /// <summary>
            /// metoda události
            /// </summary>
            internal readonly System.Action method;
            volatile bool isCompleted;
            /// <summary>
            /// vytvoření asynchronní úlohy
            /// </summary>
            /// <param name="method">metoda úlohy</param>
            internal AsyncTask(System.Action method) { this.method = method; }
            /// <summary>
            /// nastavení dokončení metody
            /// </summary>
            internal void SetCompleted()
            {
                isCompleted = true;
                manualResetEvent.Set();
            }

            /// <summary>
            /// indikuje, že metoda 
            /// </summary>
            public bool IsCompleted { get => isCompleted; }
            /// <summary>
            /// čekání
            /// </summary>
            public WaitHandle AsyncWaitHandle { get => manualResetEvent; }
            /// <summary>
            /// status asynchonní úlohy
            /// </summary>
            public object AsyncState { get; set; }
            /// <exclude/>
            public bool CompletedSynchronously { get => false; }
        }

        /// <summary>
        /// Spuštění <paramref name="method"/> v pracovním vlákně.
        /// </summary>
        /// <param name="method">Metoda pro spuštění.</param>
        /// <returns></returns>
        public IAsyncResult Enqueue(System.Action method)
        {
            if (method == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450512)); //RC 29450512 : Metoda je prázdná!
            AsyncTask task = new AsyncTask(method);
            lock (lockObject)
            {
                taskQueue.Enqueue(task);
                Monitor.Pulse(lockObject);
            }
            return task;
        }

        readonly object lockObject = new object();
        readonly Queue<AsyncTask> taskQueue = new Queue<AsyncTask>();
        bool workerRunning, exitWorker, isStopped;

        /// <summary>
        /// Je pozastaven
        /// </summary>
        public bool IsStopped { get => isStopped; }

        /// <summary>
        /// Spuštění pracovního vlákna vázaného na aktuální vlákno.
        /// </summary>
        public void RunLoop()
        {
            lock (lockObject)
            {
                if (workerRunning)
                    throw new InvalidOperationException(GResources.GetResourceText(29450513));  //RC 29450513 : Pracovní vlákno je již spuštěné!
                workerRunning = true;
            }
            try
            {
                exitWorker = false;
                while (!exitWorker)
                {
                    AsyncTask task;
                    lock (lockObject)
                    {
                        while (taskQueue.Count == 0)
                            // uvolnění CPU
                            Monitor.Wait(lockObject);
                        task = taskQueue.Dequeue();
                    }
                    task.method();
                    task.SetCompleted();
                    isStopped = taskQueue.Count == 0;
                }
            }
            finally { lock (lockObject) { workerRunning = false; } }
        }

        /// <summary>
        /// Ukončí běh vlákna po vykonání všech aktuálních metod
        /// </summary>
        public void ExitWorkerThread() { Enqueue(delegate { exitWorker = true; }); }
    }
}
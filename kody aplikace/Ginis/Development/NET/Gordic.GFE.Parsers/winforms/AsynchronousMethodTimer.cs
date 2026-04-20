//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AsynchronousTimer.cs                     </Name>
//    <Description> asynchronní časovač                                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-04                                                  </Created>
//  </FileHeader>

using Gordic.General;
using System;
using System.Threading;

namespace Gordic.GFE.Parsers.WinForm
{
    /// <summary>
    /// asynchronní časovač
    /// </summary>
    public class AsynchronousMethodTimer
    {
        /// <summary>
        /// je spuštěn
        /// </summary>
        public bool IsStarted { get => !disposed; }
        bool disposed;
        /// <summary>
        /// zastavení časovače
        /// </summary>
        public void Stop() { disposed = true; isCompleted = false; }

        bool isCompleted = false;
        /// <summary>
        /// indikuje ukončení metody
        /// </summary>
        public bool IsCompleted { get => isCompleted; }

        [STAThread]
        void Run(object t)
        {
            if (CallMethod != null)
            {
                int value = 0;
                while (!disposed && value < Miliseconds)
                {
                    value++;
                    Thread.Sleep(1);
                }

                if (!disposed)
                    try { CallMethod(); isCompleted = true; }
                    catch { CallMethod = null; isCompleted = true; }
            }
        }
        /// <summary>
        /// interval spuštění metody
        /// </summary>
        public int Miliseconds { get; set; }

        /// <summary>
        /// metoda, která se volá po uplynutí intervalu
        /// </summary>
        public Action CallMethod { get; set; }

        /// <summary>
        /// Spuštění časovače 
        /// </summary>
        /// <param name="callMethod">metoda, která se spustí po uplynutí intervalu <paramref name="miliseconds"/>.</param>
        /// <param name="e">argument běžící metody</param>
        /// <param name="miliseconds">počet milivteřín po který vlákno je blokované</param>
        public void Start<T>(Action<T> callMethod, T e, int miliseconds)
        {
            isCompleted = false;
            disposed = false;
            Miliseconds = miliseconds;
            CallMethod = delegate { callMethod(e); };
            Thread newThread = new Thread(Run)
            {
                Name = GResources.GetResourceText(29450511) //RC 29450511 : vlákno časovače
            };
            newThread.Start();
            Thread.Sleep(0); // umožňuje nový start vlákna            
        }
    }
}

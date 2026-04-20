//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationInterface.GAsyncTask.cs           </Name>
//    <Description> Zakladni asynchronni uloha                                  </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-09-11                                                  </Created>
//  </FileHeader>

using System;
using System.Security;
using System.Threading;
using System.Threading.Tasks;

namespace Gordic.General.ApplicationInterface
{
    [SecuritySafeCritical]
    public static class GCallContextExtensions
    {
        /// <summary>Pomocna trida zamezujici volani serveroveho kontextu v mistech, kde toto neni povolene (napr. GAsyncTask)</summary>
        private class NoCallContext : IGObject
        {
            /// <summary>ToString pretizeni</summary>
            public override string ToString()
            {
                throw new GException(21000106, 21090075); //RC-EX 21090075 : Tento thread nesmí používat ServerContext.
            }
        }

        public static Task StartNewGinisNoContext(this TaskFactory taskFactory, Action action, CancellationToken token = default, TaskCreationOptions creationOptions = TaskCreationOptions.None)
        {
            var tCulture = Thread.CurrentThread.CurrentCulture;
            var tUiCulture = Thread.CurrentThread.CurrentUICulture;
            return taskFactory.StartNew(() => {
                Thread.CurrentThread.CurrentCulture = tCulture;
                Thread.CurrentThread.CurrentUICulture = tUiCulture;
                GCallContext.Internal_SetAsyncId(new NoCallContext());
                action();
            },
            token, creationOptions | TaskCreationOptions.LongRunning, taskFactory.Scheduler);
        }
        public static Task<TResult> StartNewGinisNoContext<TResult>(this TaskFactory taskFactory, Func<TResult> action, CancellationToken token = default, TaskCreationOptions creationOptions = TaskCreationOptions.None)
        {
            var tCulture = Thread.CurrentThread.CurrentCulture;
            var tUiCulture = Thread.CurrentThread.CurrentUICulture;
            return taskFactory.StartNew(() => {
                Thread.CurrentThread.CurrentCulture = tCulture;
                Thread.CurrentThread.CurrentUICulture = tUiCulture;
                GCallContext.Internal_SetAsyncId(new NoCallContext());
                return action();
            },
            token, creationOptions | TaskCreationOptions.LongRunning, taskFactory.Scheduler);
        }

        public static Task CreateNewGinisNoContext(this TaskFactory task, Action action, CancellationToken token = default, TaskCreationOptions creationOptions = TaskCreationOptions.None)
        {
            var tCulture = Thread.CurrentThread.CurrentCulture;
            var tUiCulture = Thread.CurrentThread.CurrentUICulture;
            return new Task(() => {
                Thread.CurrentThread.CurrentCulture = tCulture;
                Thread.CurrentThread.CurrentUICulture = tUiCulture;
                GCallContext.Internal_SetAsyncId(new NoCallContext());
                action();
            },
            token, creationOptions | TaskCreationOptions.LongRunning);
        }
        public static Task<TResult> CreateNewGinisNoContext<TResult>(this TaskFactory task, Func<TResult> action, CancellationToken token = default, TaskCreationOptions creationOptions = TaskCreationOptions.None)
        {
            var tCulture = Thread.CurrentThread.CurrentCulture;
            var tUiCulture = Thread.CurrentThread.CurrentUICulture;
            return new Task<TResult>(() => {
                Thread.CurrentThread.CurrentCulture = tCulture;
                Thread.CurrentThread.CurrentUICulture = tUiCulture;
                GCallContext.Internal_SetAsyncId(new NoCallContext());
                return action();
            },
            token, creationOptions | TaskCreationOptions.LongRunning);
        }



        public static Task StartNewGinisNoContextNoThread(this TaskFactory taskFactory, Action action, CancellationToken token = default, TaskCreationOptions creationOptions = TaskCreationOptions.None)
        {
            return taskFactory.StartNew(() => {
                GCallContext.Internal_SetAsyncId(new NoCallContext());
                action();
            },
            token, creationOptions, taskFactory.Scheduler);
        }
        public static Task CreateNewGinisNoContextNoThread(this TaskFactory task, Action action, CancellationToken token = default, TaskCreationOptions creationOptions = TaskCreationOptions.None)
        {
            return new Task(() => {
                GCallContext.Internal_SetAsyncId(new NoCallContext());
                action();
            },
            token, creationOptions);
        }
    }

}

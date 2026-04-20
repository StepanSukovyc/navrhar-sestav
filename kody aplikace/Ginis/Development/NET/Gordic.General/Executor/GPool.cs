//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GPool.cs                                     </Name>
//    <Description> Factory pro action executory                                </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-01-24                                                  </Created>
//  </FileHeader>

using System;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Factory pro action executory
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public sealed class GPool<T>
    {
        static readonly IGLogger LOG = GLogManager.CurrentClassLogger();

        /// <summary>
        /// PoolStep
        /// </summary>
        public abstract class PoolStep
        {
            internal sealed class ReturnStep : PoolStep
            {
                internal ReturnStep(T value)
                {
                    Value = value;
                }

                internal readonly T Value;
            }

            internal sealed class WaitStep : PoolStep
            {
                internal WaitStep(TimeSpan span)
                {
                    Span = span;
                }

                readonly TimeSpan Span;

                internal void Wait()
                {
                    if (Span != TimeSpan.Zero)
                    {
                        Task.Delay(Span).Wait();
                    }
                }
            }
        }


        /// <summary>
        /// Wait
        /// </summary>
        /// <param name="span"></param>
        /// <returns></returns>
        public static PoolStep Wait(TimeSpan span) => new PoolStep.WaitStep(span);

        /// <summary>
        /// Return
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static PoolStep Return(T value) => new PoolStep.ReturnStep(value);

        /// <summary>
        /// RepeatImmediatelly
        /// </summary>
        /// <returns></returns>
        public static PoolStep RepeatImmediatelly() => new PoolStep.WaitStep(TimeSpan.Zero);

        /// <summary>
        /// Pool
        /// </summary>
        /// <typeparam name="EX"></typeparam>
        /// <param name="io"></param>
        /// <param name="onError"></param>
        /// <returns></returns>
        public static T Pool<EX>(Func<int, PoolStep> io, Func<EX, int, PoolStep> onError = null)
            where EX : Exception
        {
            for (var n = 0; ; n++)
            {
                PoolStep poolStep;
                try
                {
                    poolStep = io(n);
                }
                catch (Exception ex) when (typeof(EX).IsAssignableFrom(ex.GetType()))
                {
                    LOG.Error($"Pool[{n}]", ex);
                    if (onError != null)
                    {
                        poolStep = onError(ex as EX, n);
                    }
                    else
                    {
                        LOG.Error($"Unhandled exception in Pool: {ex.GetType().FullName} != {typeof(EX).GetType()}");
                        throw;
                    }
                }

                switch (poolStep)
                {
                    case PoolStep.ReturnStep returnStep:
                        return returnStep.Value;

                    case PoolStep.WaitStep waitStep:
                        waitStep.Wait();
                        break;
                }
            }
        }
    }
}

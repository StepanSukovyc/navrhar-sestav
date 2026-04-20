//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.NotNull.cs                                   </Name>
//    <Description> Simple generic returns                                      </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-11-07                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;

namespace Gordic.General
{
    /// <summary>
    /// Simple if
    /// </summary>
    /// <typeparam name="R"></typeparam>
    public static class Return<R>
    {
        static readonly IGLogger LOG = GLogManager.CurrentClassLogger();

        /// <summary>
        /// Runtime ,,conditional compile''
        /// </summary>
        /// <param name="net48"></param>
        /// <param name="core"></param>
        /// <returns></returns>
        public static R WhenCoreRuntime(Func<R> net48, Func<R> core)
        {
            if (Environment.Version.Major <= 4)
            {
                return net48();
            }

            // .CORE
            return core();
        }

        /// <summary>
        /// WhenKeyIsPresent
        /// </summary>
        /// <typeparam name="Tkey"></typeparam>
        /// <param name="dict"></param>
        /// <param name="key"></param>
        /// <param name="elseReturn"></param>
        /// <param name="ifExists"></param>
        /// <returns></returns>
        public static R WhenKeyIsPresent<Tkey>(IDictionary<Tkey, R> dict, Tkey key, Func<R> elseReturn, Func<R, R> ifExists)
        {
            if(dict.TryGetValue(key, out var val))
            {
                return ifExists != null
                    ? ifExists(val)
                    : val;
            }

            return elseReturn();
        }

        /// <summary>
        /// WhenKeyIsPresent
        /// </summary>
        /// <typeparam name="Tkey"></typeparam>
        /// <param name="dict"></param>
        /// <param name="key"></param>
        /// <param name="elseReturn"></param>
        /// <returns></returns>
        public static R WhenKeyIsPresent<Tkey>(IDictionary<Tkey, R> dict, Tkey key, Func<R> elseReturn) =>
            WhenKeyIsPresent(dict, key, elseReturn, null);

        /// <summary>
        /// WhenNotNull
        /// </summary>
        /// <param name="io"></param>
        /// <param name="ifNotNull"></param>
        /// <param name="elseReturn"></param>
        /// <returns></returns>
        public static R WhenNotNull<O>(Func<O> io, Func<O, R> ifNotNull, Func<R> elseReturn)
        {
            var ioResult = io.Invoke();
            return ioResult != null ? ifNotNull(ioResult) : elseReturn();
        }

        /// <summary>
        /// WhenExists
        /// </summary>
        /// <param name="io"></param>
        /// <param name="ifExists"></param>
        /// <param name="elseReturn"></param>
        /// <returns></returns>
        public static R WhenExists<O>(Func<O> io, Func<O, R> ifExists, Func<R> elseReturn)
            where O : IExistable
        {
            var ioResult = io.Invoke();
            return ioResult is IExistable existable && existable.Exists
                ? ifExists(ioResult)
                : elseReturn();
        }


        /// <summary>
        /// WhenNotNullable
        /// </summary>
        /// <typeparam name="N"></typeparam>
        /// <param name="io"></param>
        /// <param name="ifNotNull"></param>
        /// <param name="elseReturn"></param>
        /// <exception cref="NotImplementedException"></exception>
        public static R WhenNotNullable<N>(Func<N?> io, Func<N, R> ifNotNull, Func<R> elseReturn) where N : struct
        {
            var ioResult = io();
            return ioResult.HasValue
                ? ifNotNull(ioResult.Value) 
                : elseReturn();
        }

        /// <summary>
        /// WhenCondition
        /// </summary>
        /// <param name="condition"></param>
        /// <param name="io"></param>
        /// <param name="elseReturn"></param>
        /// <returns></returns>
        public static R WhenCondition(Func<bool> condition, Func<R> io, Func<R> elseReturn)
        {
            try
            {
                if (condition())
                {
                    return io();
                }
            }
            catch(Exception ex)
            {
                LOG.Error(ex, "WhenCondition.io failed");
            }

            return elseReturn();
        }

        /// <summary>
        /// WhenConditionAndNotException
        /// </summary>
        /// <param name="condition"></param>
        /// <param name="io"></param>
        /// <param name="elseReturn"></param>
        /// <param name="exception"></param>
        /// <returns></returns>
        public static R WhenConditionAndNotException(Func<bool> condition, Func<R> io, Func<R> elseReturn, Action<Exception> exception)
        {
            try
            {
                if (condition())
                {
                    return io();
                }
            }
            catch (Exception ex)
            {
                LOG.Error(ex, "WhenConditionAndNotException[condition/io] failed");
                exception(ex);
            }

            return elseReturn();
        }

        /// <summary>
        /// WhenNotNullOrEmpty - for string only
        /// </summary>
        /// <param name="io"></param>
        /// <param name="ifNotNull"></param>
        /// <param name="elseReturn"></param>
        /// <returns></returns>
        public static R WhenNotNullOrEmpty(Func<string> io, Func<string, R> ifNotNull, Func<R> elseReturn)
        {
            var ioResult = io.Invoke();
            return !string.IsNullOrEmpty(ioResult) ? ifNotNull(ioResult) : elseReturn();
        }

        /// <summary>
        /// Return value, if there is no exception
        /// </summary>
        /// <typeparam name="X">Exception type</typeparam>
        /// <param name="io"></param>
        /// <param name="elseReturn"></param>
        /// <returns></returns>
        public static R WhenNotException<X>(Func<R> io, Func<X, R> elseReturn) where X : Exception
        {
            try
            {
                return io.Invoke();
            }
            catch (X ex) when(ex.GetType() == typeof(X))
            {
                return elseReturn(ex);
            }
            catch (Exception ex)
            {
                return elseReturn(ex as X);
            }
        }


        /// <summary>
        /// WhenNotException
        /// </summary>
        /// <typeparam name="EX"></typeparam>
        /// <typeparam name="T"></typeparam>
        /// <param name="io"></param>
        /// <param name="ifNotException"></param>
        /// <param name="elseReturn"></param>
        /// <returns></returns>
        public static R WhenNotException<EX, T>(Func<T> io, Func<T, R> ifNotException, Func<EX, R> elseReturn) where EX : Exception
        {
            try
            {
                return ifNotException(io.Invoke());
            }
            catch (EX ex) when (ex.GetType() == typeof(EX))
            {
                LOG.Error(ex, "WhenNotException");
                return elseReturn(ex);
            }
        }
    }
}

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GRepeatedActionExecutor.cs                   </Name>
//    <Description> Factory pro action executory                                </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-02-13                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General
{
    /// <summary>
    /// Factory pro action executory
    /// </summary>
    public sealed class GActionExecutor : IGActionExecutor
    {
        static readonly IGLogger LOG = GLogManager.CurrentClassLogger();

        readonly int MaxRetryCount = 10;

        /// <summary>
        /// RepeatUntil
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <typeparam name="X"></typeparam>
        /// <param name="fn"></param>
        /// <param name="onError"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        T IGActionExecutor.RepeatUntil<T, X>(Func<T> fn, Func<X, int, bool> onError)
        {
            for(int n=0; n < MaxRetryCount; n++)
            {
                try
                {
                    return fn();
                }
                catch (Exception ex) when (typeof(X).IsAssignableFrom(ex.GetType()))
                {
                    LOG.Error($"RepeatUntil[{n}]", ex);
                    if (!onError.Invoke(ex as X, n))
                    {
                        break;
                    }
                }
            }

            throw new Exception("Cannot continue in repeated action");
        }
    }
}

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGActionExecutorFactory.cs                   </Name>
//    <Description> Factory pro exekutory akcí                                  </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-02-18                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General
{
    /// <summary>
    /// Factory pro exekutory akcí
    /// </summary>
    public interface IGActionExecutor
    {
        /// <summary>
        /// Repeat until not exception
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <typeparam name="X"></typeparam>
        /// <param name="fn"></param>
        /// <param name="onError"></param>
        /// <returns></returns>
        T RepeatUntil<T, X>(Func<T> fn, Func<X, int, bool> onError)
            where X : Exception;
    }
}

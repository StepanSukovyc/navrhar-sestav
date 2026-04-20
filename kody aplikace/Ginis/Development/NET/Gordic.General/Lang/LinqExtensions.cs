//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.LinqExtensions.cs                            </Name>
//    <Description> LinqExtensions                                              </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-03-02                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;

namespace Gordic.General
{
    /// <summary>
    /// LinqExtensions
    /// </summary>
    public static class LinqExtensions
    {
        /// <summary>
        /// Optimized DefaultIfEmpty - do not create the instance of object when not needed
        /// </summary>
        /// <typeparam name="TSource"></typeparam>
        /// <param name="source"></param>
        /// <param name="defaultValue"></param>
        /// <returns></returns>
        public static IEnumerable<TSource> DefaultIfEmpty<TSource>(this IEnumerable<TSource> source, Func<TSource> defaultValue)
        {
            if (source == null)
            {
                throw new Exception("Source cannot be null");
            }

            using (var e = source.GetEnumerator())
            {
                if (e.MoveNext())
                {
                    do
                    {
                        yield return e.Current;
                    }
                    while (e.MoveNext());
                }
                else
                {
                    yield return defaultValue();
                }
            }
        }

        /// <summary>
        /// Contains
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source"></param>
        /// <param name="contains"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public static bool Contains<T>(this IEnumerable<T> source, Func<T, bool> contains)
        {
            if (source == null)
            {
                throw new Exception("Source cannot be null");
            }

            return source
                .Select(item => contains(item))
                .DefaultIfEmpty(false)
                .FirstOrDefault(r => r);
        }

        /// <summary>
        /// Concat multiple enumerables
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="enumerables"></param>
        /// <returns></returns>
        public static IEnumerable<T> ConcatMultiple<T>(params IEnumerable<T>[] enumerables)
        {
            return enumerables == null ? Enumerable.Empty<T>() : enumerables.SelectMany(e => e);
        }
    }
}

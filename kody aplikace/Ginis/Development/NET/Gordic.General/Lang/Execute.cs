//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.When.cs                                      </Name>
//    <Description> Simple if                                                   </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-11-16                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General
{
    /// <summary>
    /// Simple if
    /// </summary>
    public static class Execute
    {
        /// <summary>
        /// Runtime ,,conditional compile''
        /// </summary>
        /// <param name="net48"></param>
        /// <param name="core"></param>
        public static void WhenCore(Action net48, Action core)
        {
            if (Environment.Version.Major <= 4)
            {
                net48();
            }

            // .CORE
            core();
        }

        /// <summary>
        /// Exists
        /// </summary>
        /// <param name="io"></param>
        /// <param name="thenDo"></param>
        /// <param name="elseDo"></param>
        /// <returns></returns>
        public static void WhenExists<T>(Func<T> io, Action<T> thenDo, Action elseDo = null)
            where T : IExistable
        {
            var ioResult = io.Invoke();

            if(ioResult != null && ioResult.Exists)
            {
                thenDo(ioResult);
            }
            else
            {
                elseDo?.Invoke();
            }

            if (ioResult is IDisposable disposable)
            {
                disposable.Dispose();
            }
        }

        /// <summary>
        /// Exists
        /// </summary>
        /// <param name="io"></param>
        /// <param name="thenDo"></param>
        /// <returns></returns>
        public static void WhenExists<T>(Func<T> io, Action<T> thenDo) 
            where T : IExistable =>
            WhenExists<T>(io: io, thenDo: thenDo, elseDo: null);
    }
}

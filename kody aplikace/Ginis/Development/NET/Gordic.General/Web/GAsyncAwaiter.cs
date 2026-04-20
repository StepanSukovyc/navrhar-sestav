//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GAsyncAwaiter.cs                             </Name>
//    <Description> Get (blocking) result from Task without deadlock risk       </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-10-29                                                  </Created>
//  </FileHeader>

using System.Threading.Tasks;

namespace Gordic.General
{
    public static class GAsyncAwaiter
    {
        /// <summary>
        /// Get (blocking) result from Task without deadlock risk
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="task"></param>
        /// <returns></returns>
        public static T GetResult<T>(this Task<T> task)
        {
#if NETFRAMEWORK
            return task.Result;
#else
            // možná bude potřeba (false) - ale až bude reálná DB v core
            // 29.10.2025 - zatím OK
            return task.GetAwaiter().GetResult();
#endif
        }
    }
}

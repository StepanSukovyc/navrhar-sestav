//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DebugTimer.cs                          </Name>
//    <Description> Pomocná třída logování                                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-16                                                  </Created>
//  </FileHeader>

using System;
using System.Diagnostics;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Pomocná třída logování
    /// </summary>
    public static class DebugTimer
    {
        [ThreadStatic]
        static Stopwatch stopWatch;

        /// <summary>
        /// Start
        /// </summary>
        [Conditional("DEBUG")]
        public static void Start()
        {
            if (stopWatch == null)
                stopWatch = new Stopwatch();
            stopWatch.Start();
        }

        /// <summary>
        /// Stop
        /// </summary>
        /// <param name="desc"></param>
        [Conditional("DEBUG")]
        public static void Stop(string desc)
        {
            stopWatch.Stop();
            stopWatch.Reset();
        }
    }
}

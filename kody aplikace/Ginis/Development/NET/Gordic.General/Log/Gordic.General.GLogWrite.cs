//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GLogSupport.cs                               </Name>
//    <Description> Třída pro podporu zápisu jednotlivých logovacích zpráv přes nlog</Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2018-08-09                                                  </Created>
//  </FileHeader>



using NLog;
using NLog.Config;
using NLog.LayoutRenderers;
using NLog.Layouts;
using NLog.Targets;
using System;

namespace Gordic.General
{
    /// <summary>
    /// Třída pro podporu zápisu jednotlivých logovacích zpráv přes nlog
    /// </summary>
    public class GLogWrite
    {

        /// <summary>
        /// Indikátor (prefix) u logId/message logování, že se nemá dělat zápis do NLog
        /// </summary>
        public static volatile string NoNLog;

        /// <summary>
        /// Délka indikátoru
        /// </summary>
        public static volatile int NoNLogLength;

        // TODO: délka logu NoNLog.Length vlastnost (předpočítáno dopředu)

        static GLogWrite()
        {
            NoNLog = "_nonlog,";
            NoNLogLength = NoNLog.Length;
        }

    }
}

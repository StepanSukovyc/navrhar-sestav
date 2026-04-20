//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GMemoryTarget.cs                             </Name>
//    <Description> Výstup pro uchovávání logů v paměti                         </Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-07-27                                                  </Created>
//  </FileHeader>

using NLog.Targets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NLog;
using System.Collections.Concurrent;

namespace Gordic.General
{
    

    /// <summary>
    /// Výstup pro uchovávání logů v paměti
    /// </summary>
    [System.Security.SecuritySafeCritical]
    public class GMemoryTarget : Target
    {
        
        /// <summary>Událost informující o zápisu logu.</summary>
        public event LogWriteHandler LogWrite;

        // ty logy by enormně narůstaly, co s tím?

        /*private ConcurrentDictionary<int, LogEventInfo> m_oLogEvents = new ConcurrentDictionary<int, LogEventInfo>();
         
        /// <summary>
        /// Seznam zachycených logovacích zápisů
        /// </summary>
        public ConcurrentDictionary<int, LogEventInfo> LogEvents
        {   // zatím záměrně umožňuju zápis
            get { return m_oLogEvents; }
        }*/

        /// <summary>
        /// Nastane při zápisu logu
        /// </summary>
        /// <param name="logEvent">Logovací událost</param>
        [System.Security.SecuritySafeCritical]
        protected override void Write(LogEventInfo logEvent)
        {
            /*m_oLogEvents[logEvent.SequenceID] = logEvent; */

            LogWrite?.Invoke(logEvent);

            //base.Write(logEvent);
        }

        /// <summary>
        /// Ošetření uzavření logu
        /// </summary>
        protected override void CloseTarget()
        {
            base.CloseTarget();

            LogWrite = null;
        }

        /// <summary>
        /// Ošetření uvolnění logu
        /// </summary>
        /// <param name="disposing">True to release both managed and unmanaged resources; false to release only unmanaged  resources</param>
        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);

            LogWrite = null;
        }

    }

    /// <summary>
    /// Delegát pro zachytávání logovacích zpráv
    /// </summary>
    /// <param name="logMessage">Zapsaná logovací zpráva</param>
    public delegate void LogWriteHandler(LogEventInfo logMessage);
}

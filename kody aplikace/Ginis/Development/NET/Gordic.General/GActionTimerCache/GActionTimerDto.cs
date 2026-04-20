//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationServer.GActionTimerDto.cs         </Name>
//    <Description> Objekt pro uchování celkového trvání měřené akce            </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-01-17                                                  </Created>
//  </FileHeader>


using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Objekt pro uchování celkového trvání měřené akce
    /// </summary>
    public class GActionTimerDto
    {
        /// <summary>
        /// Pojmenování akce - pro uživatele
        /// </summary>
        public string ActionName { set; get; }

        /// <summary>
        /// Počet spuštění akce
        /// </summary>
        public int Count { set; get; }

        /// <summary>
        /// Celkové trvání všech spuštění této akce
        /// </summary>
        public TimeSpan Duration { set; get; }

        /// <summary>
        /// Nejdelší trvání akce
        /// </summary>
        public TimeSpan MaxDuration { set; get; }

        /// <summary>
        /// Nejkratší trvání akce
        /// </summary>
        public TimeSpan MinDuration { set; get; }

        /// <summary>
        /// Celkové trvání akce v sekundách 
        /// </summary>
        public double TotalSeconds { get { return Duration.TotalSeconds;  } }

        /// <summary>
        /// Průměrné trvání akce
        /// </summary>
        public double AverageSeconds { get { return ( Duration.TotalSeconds / Count ); } }

#if DEBUG
        /// <summary>
        /// 
        /// </summary>
        public PerformanceCounter performanceCounter { set; get; }
        /// <summary>
        /// 
        /// </summary>
        public PerformanceCounter performanceNumber { set; get; }
        /// <summary>
        /// 
        /// </summary>
        public PerformanceCounter performanceAverageCounter { set; get; }
#endif    


        /// <summary>
        /// Konstruktor s inicializací při prvním výskytu akce
        /// </summary>
        /// <param name="duration"></param>
        /// <param name="actionName"></param>
        public GActionTimerDto(TimeSpan duration, string actionName )
        {
            ActionName = actionName;
            Count = 1;
            Duration = duration;
            MaxDuration = duration;
            MinDuration = duration;
#if DEBUG
            performanceCounter = null;
#endif    
        }

        /// <summary>
        /// Textová podoba trvání v sekundách s přesností na 3 místa - použitélné přímo pro zápis do logů
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return String.Format( "{1}/{2}", Duration.TotalSeconds.ToString("G3"), Count.ToString()); 
        }
    }
}

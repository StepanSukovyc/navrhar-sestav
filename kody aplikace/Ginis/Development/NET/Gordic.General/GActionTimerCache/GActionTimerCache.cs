//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationServer.GActionTimerCache.cs       </Name>
//    <Description> Globálně sdílené úložiště pro všechna počítadla - GActionTimerDto</Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-01-17                                                  </Created>
//  </FileHeader>




using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Globálně sdílené úložiště pro všechna počítadla - GActionTimerDto
    /// </summary>
    public static class GActionTimerCache
    {
        /// <summary>
        /// Sdílená paměť pro uchování všech počítadel
        /// </summary>
        private static readonly Dictionary<string, GActionTimerDto> _ActionTimers = new Dictionary<string, GActionTimerDto>();

        /// <summary>
        /// Příznak, že se metriky mají sbírat
        /// </summary>
        internal static bool _ActionTimersEnabled = true;

        /// <summary>synchronizační objekt pro uzamčení celé třídy</summary>
        private static readonly object _lock = new object();

        /// <summary>
        /// Vymazání všech počítadel z paměti
        /// </summary>
        public static void ClearActionTimers()
        {
            lock (_lock)
            {
                _ActionTimers.Clear();
            }
        }

        /// <summary>
        /// Vrátí dictionary jednotlivých počítadel
        /// </summary>
        /// <returns></returns>
        public static Dictionary<string, GActionTimerDto> GetActionTimers()
        {
            lock (_lock)
            {
                return new Dictionary<string, GActionTimerDto>(_ActionTimers);
            }
        }

        /// <summary>
        /// Získání stavu povolení sbírat metriky aplikace
        /// </summary>
        /// <returns></returns>
        public static bool GetActionTimersEnabled()
        { 
            lock (_lock)
            {
                return _ActionTimersEnabled;
            }
        }

        /// <summary>
        /// Nastavení povolení sbírat metriky aplikace
        /// </summary>
        /// <param name="actionTimersEnabled">Nový stav povolení sbírat metriky</param>
        /// <returns>Původní stav nastavení</returns>
        public static bool SetActionTimersEnabled(bool actionTimersEnabled)
        {
            lock (_lock)
            {
                bool orig_ActionTimersEnabled = _ActionTimersEnabled;
                _ActionTimersEnabled = actionTimersEnabled;
                return _ActionTimersEnabled;
            }
        }

        /// <summary>
        /// Vrátí požadovaný DataSet z cache - nebo null, když tam není obsažen
        /// </summary>
        /// <param name="timer_id">ID počítadla</param>
        /// <returns></returns>
        public static GActionTimerDto GetActionTimer(string timer_id)
        {
            lock (_lock)
            {
                if (_ActionTimers.ContainsKey(timer_id))
                    return (_ActionTimers[timer_id]);
                else
                    return null;

            }
        }

        /// <summary>
        /// Uloží do cache pod id počítadle 
        /// </summary>
        /// <param name="timer_id"></param>
        /// <param name="actionTimer"></param>
        public static void SetActionTimer(string timer_id, GActionTimerDto actionTimer )
        {
            lock (_lock)
            {
                if (_ActionTimersEnabled)
                {
                    if (_ActionTimers.ContainsKey(timer_id))
                        _ActionTimers[timer_id] = actionTimer;
                    else
                        _ActionTimers.Add(timer_id, actionTimer);
                }
            }
        }
        /// <summary>
        /// Přidání dalšího měření do kolekce
        /// </summary>
        /// <param name="timer_id">ID akce </param>
        /// <param name="timer_name">Pojmenování akce</param>
        /// <param name="duration">Trvání akce</param>
        public static void AddToTimer(string timer_id, string timer_name, TimeSpan duration )
        {
            lock (_lock)
            {
                if (_ActionTimersEnabled)
                {
                    GActionTimerDto timerDto = null;
                    if (_ActionTimers.ContainsKey(timer_id))
                    {
                        timerDto = _ActionTimers[timer_id];
                        timerDto.Duration = timerDto.Duration + duration;
                        timerDto.Count++;
                        if (timerDto.MinDuration > duration)
                            timerDto.MinDuration = duration;
                        if (timerDto.MaxDuration < duration)
                            timerDto.MaxDuration = duration;
                    }
                    else
                    {
                        timerDto = new GActionTimerDto(duration, timer_name);
                        _ActionTimers.Add(timer_id, timerDto);
                    }

//#if DEBUG
//                    if (timer_id.StartsWith("DB."))
//                    {
//                        string categoryName = "GINIS_DB";
//                        if (timerDto.performanceAverageCounter != null)
//                        {
//                            timerDto.performanceCounter.Increment();
//                            timerDto.performanceAverageCounter.IncrementBy(timerDto.Duration.Milliseconds);
//                            timerDto.performanceNumber.Increment();
//                        }
//                        else
//                        {
//                            string counterName = "DB_AverageDuration";
//                            PerformanceCounter counter = new PerformanceCounter(categoryName, counterName, false);
//                            counter.RawValue = 0;
//                            timerDto.performanceAverageCounter = counter;
//                            timerDto.performanceAverageCounter.IncrementBy(timerDto.Duration.Milliseconds);

//                            string counterNameCount = "DB_Duration";
//                            PerformanceCounter counterCount = new PerformanceCounter(categoryName, counterNameCount, false);
//                            counterCount.RawValue = 0;
//                            timerDto.performanceCounter = counterCount;
//                            timerDto.performanceCounter.Increment();

//                            string counterNumberName = "DB_Number";
//                            PerformanceCounter counterNumber = new PerformanceCounter(categoryName, counterNumberName, false);
//                            counterNumber.RawValue = 0;
//                            timerDto.performanceNumber = counterNumber;
//                            timerDto.performanceNumber.Increment();


//                        }
//                    }
//#endif

                }


            }
        }

    }
}


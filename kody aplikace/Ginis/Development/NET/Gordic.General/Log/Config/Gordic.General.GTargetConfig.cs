//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GTargetConfig.cs                             </Name>
//    <Description> Konfigurace obecného logovacího výstupu                     </Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-10-09                                                  </Created>
//  </FileHeader>

using NLog;
using System.Collections.Generic;

namespace Gordic.General
{
    /// <summary>
    /// Konfigurace obecného logovacího výstupu
    /// </summary>
    public class GTargetConfig
    {
        readonly Dictionary<LogLevel, bool> m_oLogLevels;

        /// <summary>
        /// Zapnutí/vypnutí logů na jednotlivých úrovních
        /// </summary>
        public Dictionary<LogLevel, bool> LogLevels
        {
            get { return m_oLogLevels; }
        }

        private bool m_bDbLogs;

        /// <summary>
        /// Zapisovat databázové operace
        /// </summary>
        public bool DbLogs
        {
            get { return m_bDbLogs; }
            set { m_bDbLogs = value; }
        }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        public GTargetConfig()
        {
            m_oLogLevels = new Dictionary<LogLevel, bool>();

            foreach (LogLevel level in LogLevel.AllLoggingLevels)
            {
                m_oLogLevels.Add(level, true);
                m_oLogLevels[LogLevel.Trace] = false;           // všechno kromě trace
                // TODO: asi by nemělo být možné z kolekce něco smazat...
            }
        }

    }
}

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.NLogExtension.cs                             </Name>
//    <Description> Třída s rozšiřujícími metodami pro NLog                     </Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-10-02                                                  </Created>
//  </FileHeader>

using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Třída s rozšiřujícími metodami pro NLog
    /// </summary>
    public static class GNLogExtensionMethods
    {

        private const string m_csSecret = "Secret";

        /// <summary>
        /// Zapíše logovací zprávu včetně příznaku, zda je logovací zpráva utajovaná
        /// </summary>
        /// <param name="logger">Představuje základní logovací objekt</param>
        /// <param name="secret">Příznak, zda je logovací zpráva utajovaná</param>
        /// <param name="logEvent">Logovací zpráva (událost)</param>
        public static void Log(this Logger logger, bool secret, LogEventInfo logEvent)
        {
            // pozor! tato metoda se volá často!
            // při každém starém vyvolání .Log.Write

            // kvůli rychlosti a možná by logování nemělo padat na výjimky
            //if (logger == null)
            //    throw new GArgumentNullException(23300002);
            //if (logEvent == null)
            //    throw new GArgumentNullException(23300003);

            if (secret)     // je zbytečné tam vlastnost secret dávat pokaždé, z pohledu rychlosti logování tam stačí pouze u zpráv, které jsou tajné
                logEvent.Properties[m_csSecret] = secret;
            if (logEvent.LoggerName == null)
                logEvent.LoggerName = logger.Name;  

            logger.Log(logEvent);
        } 
    }
}

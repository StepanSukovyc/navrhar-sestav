//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GLogComposer.cs                              </Name>
//    <Description> Třída pro sestavování logovacích zpráv                      </Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-10-13                                                  </Created>
//  </FileHeader>

using System;
using System.Reflection;

namespace Gordic.General
{
    /// <summary>
    /// Třída pro sestavování logovacích zpráv
    /// </summary>
    [System.Security.SecuritySafeCritical]
    public class GLogComposer : IGObject
    {
        private static readonly IGLogger Log = GLogManager.CurrentClassLogger();

        /// <summary>
        /// Získá výslednou logovací zprávu na základě výjimky, logovací zprávy a předaného kontextu
        /// </summary>
        /// <param name="exception"></param>
        /// <param name="message"></param>
        /// <param name="applicationInfo"></param>
        /// <param name="configuration"></param>
        /// <param name="loginInfo"></param>
        /// <param name="sessionInfo"></param>
        /// <returns>Výsledná složená logovací zpráva</returns>
        public static string ResultExceptionMessage(Exception exception, string message, IGApplicationInfo applicationInfo,/*IGConfiguration*/object configuration, IGLoginInfo loginInfo, IGSessionInfo sessionInfo)
        {
            try
            {
                #region Inspirace
                /*public void WriteToLog(Exception exception,out GInt32 serCisErr,bool forceSystemLog = false,bool skipDatabaseLog = false) {
                serCisErr = GInt32.Null;
                try {
                // kontrola vstupního parametru
                if(exception == null || (ProcessType == GCommon.ApplicationType.WebApplication && exception.GetType() == typeof(ThreadAbortException))) return;
                // získání informací o výjimce
                GException l_oException = exception as GException;
                if(l_oException == null) l_oException = new GException(23200113,ThisAssembly,exception); // v aplikaci došlo k neočekávané výjimce
                GExceptionInfo l_oExceptionInfo = GetExceptionInfo(l_oException);
                // zalogování informací o výjimce
                l_oExceptionInfo = WriteToLog(l_oExceptionInfo,forceSystemLog,skipDatabaseLog);
                if(l_oExceptionInfo.SerCisErr != 0) serCisErr = l_oExceptionInfo.SerCisErr;
                } // end try*/
                #endregion
                bool l_bGException = true;
                // získání informací o výjimce
                if (!(exception is GException l_oException))
                {
                    l_bGException = false;
                    l_oException = new GException(23320002, ThisAssembly, exception); //RC-EX 23320002 : obalení systémové výjimky pomocí GException
                }
                //GExceptionInfo l_oExceptionInfo = GetExceptionInfo(l_oException);
                // zalogování informací o výjimce
                //l_oExceptionInfo = WriteToLog(l_oExceptionInfo, forceSystemLog, skipDatabaseLog);

                // Alík:! exception.ToString(); je špatný! Neobsahuje snad ani oba call stacky - jen jeden
                // Kuťa: Já to dělám tak, že pokud zjistím, že to není GException tak si ji nejprve zabalím do nějaké obecné GException.

                var l_sException = new GExceptionDetails(l_oException, applicationInfo, configuration, loginInfo, sessionInfo).Text; // u výjimky můžeme použít message, žádné message a parameters se totiž u výjimkových přetížení nepoužívají

                if (!l_bGException)
                {   // RC-EX 23320002 : obalení systémové výjimky pomocí GException
                    // snažím se ze začátku textu odstranit vše, až po samotnou vnitřní výjimku
                    if (l_oException?.InnerException?.Message != null)
                    {
                        // oprava - mělo by fungovat i v případě, kdy je GException zabalena do System.Exception
                        int l_nInnerExceptionPosition = l_sException.IndexOf(l_oException.InnerException.Message);
                        if (l_nInnerExceptionPosition > 0)
                            l_sException = l_sException.Remove(0, l_nInnerExceptionPosition);
                    }

                }

                if (!String.IsNullOrEmpty(l_sException))
                {
                    if (!String.IsNullOrEmpty(message))
                        message = $"{message}\n{l_sException}";
                    else
                        message = l_sException;
                }
            }
            catch (Exception ex)
            {
                Log.Warn(GResources.GetResourceText(23320004, exception?.ToString() ?? "null", ex?.ToString() ?? "null")); //RC 23320004 : Při získávání podrobných informací o výjimce {0} došlo k chybě {1}.
            }

            return message;
        }

        private static Assembly ThisAssembly
        {
            get { return typeof(GLogComposer).Assembly; }
        }
    }
}

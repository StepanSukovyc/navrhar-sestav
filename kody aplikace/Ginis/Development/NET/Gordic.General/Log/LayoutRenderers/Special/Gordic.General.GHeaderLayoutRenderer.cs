//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GHeaderLayoutRenderer.cs                     </Name>
//    <Description> Renderer pro výstup mnoha kontextových informací používaných v hlavičce logovacího souboru</Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-10-30                                                  </Created>
//  </FileHeader>


using NLog;
using NLog.LayoutRenderers;
using System;
using System.Reflection;
using System.Text;

namespace Gordic.General
{
    /* Ve výchozím nastavení od NLog 5 LayoutRenderer JE threadově bezpečný a obsahuje:
    protected virtual void WriteAsyncThreadSafe(AsyncLogEventInfo logEvent)
    {
        lock (SyncRoot)
        {
            // ...
            Write(logEvent);
        }
    } */

    /// <summary>Renderer pro výstup mnoha kontextových informací používaných v hlavičce logovacího souboru</summary>
    [LayoutRenderer("header")]
    public class GHeaderLayoutRenderer : LayoutRenderer, IGObject
    {

        private const string s_csDefaultHeader = "";

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                StringBuilder l_oHeader = GetIntroLogMessage();
                if (l_oHeader == null)
                {
                    builder.Append(s_csDefaultHeader);
                    return;
                }
                builder.Append(l_oHeader);
        }

        /// <summary>
        /// Získá celý text hlavičky
        /// </summary>
        public /*GLogMessage*/StringBuilder GetIntroLogMessage()
        {
            //var l_oServerContext = new GServerContext();

            // vytvoření logovací zprávy (pro zapisovač nebo naslouchač)
            var l_oSessionInfo = GLogContext.SessionInfo; // GetSessionInfo();
            var l_oLoginInfo = GLogContext.LoginInfo; // GetLoginInfo();
            var l_oApplicationInfo = GLogContext.ApplicationInfo; // GetApplicationInfo();

            var l_oOSInfo = new GOSInfo();

            //string l_sMessage = GResources.GetResourceText
            string l_sMessageFormat = GResources.GetResourceText(ThisAssembly, 23320006);  //RC 23320006 : Databáze;čas:        {0};typ DB:     {1};verze DB:   {2};DB profil:  {3};login:      {4};server:     {5};;Aplikace;fáze:       {10};revize:     {11};;Systém;{20};;Prostředí;verze .net:   {30};počítač:      {31};uživatel:     {32};64bit proces: {33};64bit OS:     {34};;Uživatel;ixs_ref:      {40};ixs_fun:      {41};ixs_usr:      {42};ixs_su:       {43};logPorCislo:  {44};session ID:   {45};lic:          {46}

            // SessionInfo není přístupné u aplikací bez přihlášení k databázi
            var l_nVerzeDb = l_oSessionInfo != null ? l_oSessionInfo.VerzeDb.BaseValue : 0;
            var l_nSubVerzeDb = l_oSessionInfo != null ? l_oSessionInfo.SubVerzeDb.BaseValue : 0;
            var l_nRevizeAdz = l_oSessionInfo != null ? l_oSessionInfo.RevizeAdz.BaseValue : 0;
            var l_sIxsRef = l_oSessionInfo != null ? l_oSessionInfo.IxsRef.BaseValueTrimmed : "";
            var l_sNazevRef = l_oSessionInfo != null ? l_oSessionInfo.NazevRef.BaseValueTrimmed : "";
            var l_sIxsFun = l_oSessionInfo != null ? l_oSessionInfo.IxsFun.BaseValueTrimmed : "";
            var l_sNazevFun = l_oSessionInfo != null ? l_oSessionInfo.NazevFun.BaseValueTrimmed : "";
            var l_sIxsUsrExu = l_oSessionInfo != null ? l_oSessionInfo.IxsUsrExu.BaseValueTrimmed : "";
            var l_sIxsSu = l_oSessionInfo != null ? l_oSessionInfo.IxsSu.BaseValueTrimmed : "";
            var l_sNazevSu = l_oSessionInfo != null ? l_oSessionInfo.NazevSu.BaseValueTrimmed : "";
            var l_nLogPorCislo = l_oSessionInfo != null ? l_oSessionInfo.LogPorCislo.BaseValue : 0;
            var l_nSessid = l_oSessionInfo != null ? l_oSessionInfo.Sessid.BaseValue : 0;
            var l_sLicAdr = l_oSessionInfo != null ? l_oSessionInfo.LicAdr.BaseValueTrimmed : "";

            // LoginInfo není přístupné u aplikací bez přihlášení k databázi
            var l_sDatabaseType = l_oLoginInfo != null ? l_oLoginInfo.DatabaseType.ToString() : "";
            var l_sProfile = l_oLoginInfo != null ? l_oLoginInfo.Profile.BaseValueTrimmed : "";
            var l_sLoginDb = l_oLoginInfo != null ? l_oLoginInfo.LoginDb.BaseValueTrimmed : "";
            var l_sDataSource = l_oLoginInfo != null ? l_oLoginInfo.DataSource.BaseValueTrimmed : "";
            var l_sLoginWin = l_oLoginInfo != null ? l_oLoginInfo.LoginWin.BaseValueTrimmed : "";

            // pro jistotu také ApplicationInfo
            var l_sFaze = l_oApplicationInfo != null ? l_oApplicationInfo.Faze.BaseValueTrimmed : "?";
            var l_sRevize = l_oApplicationInfo != null ? l_oApplicationInfo.Revize.BaseValueTrimmed : "?";

            var l_oMessage = new StringBuilder(1024);

            //l_sMessage = string.Format(l_sMessage,
            l_oMessage.AppendFormat(l_sMessageFormat,
                // 0
                DateTime.Now, l_sDatabaseType, l_nVerzeDb + "." + l_nSubVerzeDb + "." + l_nRevizeAdz, l_sProfile, l_sLoginDb,
                l_sDataSource, l_sLoginWin, string.Empty, string.Empty, string.Empty,
                // 10
                l_sFaze, l_sRevize, string.Empty, string.Empty, string.Empty,
                string.Empty, string.Empty, string.Empty, string.Empty, string.Empty,
                // 20
                l_oOSInfo.FullName, string.Empty, string.Empty, string.Empty, string.Empty,
                string.Empty, string.Empty, string.Empty, string.Empty, string.Empty,
                // 30
                Environment.Version, Environment.MachineName, Environment.UserName, Environment.Is64BitProcess, Environment.Is64BitOperatingSystem,
                string.Empty, string.Empty, string.Empty, string.Empty, string.Empty,
                // 40
                l_sIxsRef + " " + l_sNazevRef, l_sIxsFun + " " + l_sNazevFun, l_sIxsUsrExu, l_sIxsSu + " " + l_sNazevSu, l_nLogPorCislo,
                l_nSessid, l_sLicAdr, string.Empty, string.Empty, string.Empty
                );

            //GLogMessage l_oLogMessage = new GLogMessage(
            //        "intro", DateTime.Now, ApplicationInterface.LogLevel.Info, l_nLogPorCislo,
            //        l_sNazevRef, l_sFaze, l_sIxsRef, false, l_sMessage);
            //return l_oLogMessage;

            return l_oMessage;
        }


        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly
        {
            get { return typeof(GHeaderLayoutRenderer).Assembly; }
        }

    }


}

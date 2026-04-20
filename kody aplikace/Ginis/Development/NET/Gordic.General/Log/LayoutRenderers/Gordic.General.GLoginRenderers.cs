//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GLoginRenderers.cs                           </Name>
//    <Description> Obsahuje renderery z LoginInfo                              </Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-10-02                                                  </Created>
//  </FileHeader>

using NLog;
using NLog.LayoutRenderers;
using System;
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

    /// <summary>název databázového profilu</summary>
    [LayoutRenderer("profile")]
    public class GProfileLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oLoginInfo = GLogContext.LoginInfo;
                if (l_oLoginInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oLoginInfo.Profile);
        }
    }

    /// <summary>login uživatele</summary>
    [LayoutRenderer("user")]
    public class GUserLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oLoginInfo = GLogContext.LoginInfo;
                if (l_oLoginInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oLoginInfo.User);
        }
    }

    // /// <summary>heslo uživatele</summary>
    // GString Password

    /* duplicitní - výskyt v SessionInfo
    /// <summary>režim přihlášení (1=funkce, 2=zástup, 3=funkce+zástup, 4=pouze první položka funkce+zástup)</summary>
    [LayoutRenderer("rezim")]
    public class GRezimLayoutRenderer : LayoutRenderer, IGObject
    {
        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
            var l_oLoginInfo = GLogContext.LoginInfo;
            if (l_oLoginInfo == null)
            {
                builder.Append(GLogContext.DefaultValue);
                return;
            }
            GLogContext.Int32Value(builder, l_oLoginInfo.Rezim);
        }
    }*/

    /// <summary>uživatel systému</summary>
    [LayoutRenderer("loginwin")]
    public class GLoginWinLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oLoginInfo = GLogContext.LoginInfo;
                if (l_oLoginInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oLoginInfo.LoginWin);
        }
    }

    /// <summary>název klientského počítače</summary>
    [LayoutRenderer("compname")]
    public class GCompNameLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oLoginInfo = GLogContext.LoginInfo;
                if (l_oLoginInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oLoginInfo.CompName);
        }
    }

    /* duplicitní - výskyt v SessionInfo
    /// <summary>identifikátor instance</summary>
    [LayoutRenderer("ixsins")]
    public class GIxsInsLayoutRenderer : LayoutRenderer, IGObject
    {
        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
            var l_oLoginInfo = GLogContext.LoginInfo;
            if (l_oLoginInfo == null)
            {
                builder.Append(GLogContext.DefaultValue);
                return;
            }
            GLogContext.StringValue(builder, l_oLoginInfo.IxsIns);
        }
    }*/

    /* duplicitní - výskyt v SessionInfo
    /// <summary>identifikátor původce změny</summary>
    [LayoutRenderer("ixszmp")]
    public class GIxsZmpLayoutRenderer : LayoutRenderer, IGObject
    {
        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
            var l_oLoginInfo = GLogContext.LoginInfo;
            if (l_oLoginInfo == null)
            {
                builder.Append(GLogContext.DefaultValue);
                return;
            }
            GLogContext.StringValue(builder, l_oLoginInfo.IxsZmp);
        }
    }*/

    /// <summary>příznak přihlášení jako uživatel s oprávněním DBA</summary>
    [LayoutRenderer("loginasdba")]
    public class GLoginAsDBALayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oLoginInfo = GLogContext.LoginInfo;
                if (l_oLoginInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.BoolValue(builder, l_oLoginInfo.LoginAsDBA);
        }
    }

    /// <summary>typ databáze</summary>
    [LayoutRenderer("databasetype")]
    public class GDatabaseTypeLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oLoginInfo = GLogContext.LoginInfo;
                if (l_oLoginInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, Enum.GetName(typeof(GCommon.DatabaseType), l_oLoginInfo.DatabaseType));  // mělo by vrátit název z enumu
        }
    }

    /// <summary>název databáze (hodnota má smysl pouze pro Informix a SQL Server)</summary>
    [LayoutRenderer("database")]
    public class GDatabaseLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oLoginInfo = GLogContext.LoginInfo;
                if (l_oLoginInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oLoginInfo.Database);
        }
    }

    /// <summary>název datového zdroje (tj. údaj server pro Informix a SQL Server, anebo údaj SID pro Oracle)</summary>
    [LayoutRenderer("datasource")]
    public class GDataSourceLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oLoginInfo = GLogContext.LoginInfo;
                if (l_oLoginInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oLoginInfo.DataSource);
        }
    }

    /// <summary>jméno pro přihlášení k databázi</summary>
    /// <remarks>v případě vyplnění má přednost před loginem uživatele</remarks>
    [LayoutRenderer("logindb")]
    public class GLoginDbLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oLoginInfo = GLogContext.LoginInfo;
                if (l_oLoginInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oLoginInfo.LoginDb);
        }
    }

    ///// <summary>heslo pro přihlášení k databázi</summary>
    //GString PasswordDb

    ///// <summary>vstupenka do systému</summary>
    //IGTicket Ticket

    /// <summary>typ autentizace do systému</summary>
    [LayoutRenderer("authenticationtype")]
    public class GAuthenticationTypeLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oLoginInfo = GLogContext.LoginInfo;
                if (l_oLoginInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, Enum.GetName(typeof(GCommon.AuthenticationType), l_oLoginInfo.AuthenticationType));  // mělo by vrátit název z enumu
        }
    }

    /// <summary>typ poskytovatele databázového připojení</summary>
    [LayoutRenderer("providertype")]
    public class GLayoutProviderTypeRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oLoginInfo = GLogContext.LoginInfo;
                if (l_oLoginInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, Enum.GetName(typeof(GCommon.ProviderType), l_oLoginInfo.ProviderType));  // mělo by vrátit název z enumu
        }
    }

    /// <summary>nazev poskytovatele databázového připojení</summary>
    [LayoutRenderer("providername")]
    public class GLayoutProviderNameRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oLoginInfo = GLogContext.LoginInfo;
                if (l_oLoginInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oLoginInfo.ProviderName);
        }
    }
    /// <summary>příznak databáze v Unicode</summary>
    [LayoutRenderer("useunicode")]
    public class GUseUnicodeLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oLoginInfo = GLogContext.LoginInfo;
                if (l_oLoginInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.BoolValue(builder, l_oLoginInfo.UseUnicode);
        }
    }

    /// <summary>příznak porpory pro Azure</summary>
    [LayoutRenderer("isazure")]
    public class GIsAzureLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oLoginInfo = GLogContext.LoginInfo;
                if (l_oLoginInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.BoolValue(builder, l_oLoginInfo.IsAzure);
        }
    }

}

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GSessionRenderers.cs                         </Name>
//    <Description> Obsahuje renderery z SessionInfo                            </Description>
//    <Author>      Marek Pokorný                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-10-02                                                  </Created>
//  </FileHeader>

using NLog;
using NLog.LayoutRenderers;
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

    /// <summary>číslo chyby v autorizační proceduře</summary>
    [LayoutRenderer("errcode")]
    public class GErrCodeLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oSessionInfo.ErrCode);
        }
    }

    /// <summary>číslo SQL chyby v autorizační proceduře</summary>
    [LayoutRenderer("sqlerr")]
    public class GSqlErrLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oSessionInfo.SqlErr);
        }
    }

    /// <summary>číslo ISAM chyby v autorizační proceduře</summary>    
    [LayoutRenderer("isamerr")]
    public class GIsamErrLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oSessionInfo.IsamErr);
        }
    }

    /// <summary>text databázové chyby v autorizační proceduře</summary>
    [LayoutRenderer("errtext")]
    public class GErrTextLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.ErrText);
        }
    }

    /// <summary>pořadové číslo přihlášení</summary>
    [LayoutRenderer("logporcislo")]
    [System.Security.SecuritySafeCritical]
    public class GLogPorCisloLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        [System.Security.SecuritySafeCritical]
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oSessionInfo.LogPorCislo);
        }
    }

    /// <summary>id referenta</summary>
    [LayoutRenderer("ixsref")]
    public class GIxsRefLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.IxsRef);
        }
    }

    /// <summary>název referenta</summary>
    [LayoutRenderer("nazevref")]
    public class GNazevRefLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.NazevRef);
        }
    }

    /// <summary>zkratka referenta</summary>
    [LayoutRenderer("zkratka")]
    public class GZkratkaLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.Zkratka);
        }
    }

    /// <summary>id funkce</summary>
    [LayoutRenderer("ixsfun")]
    public class GIxsFunLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.IxsFun);
        }
    }

    /// <summary>název funkce</summary>
    [LayoutRenderer("nazevfun")]
    public class GNazevFunLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.NazevFun);
        }
    }

    /// <summary>id původce změny</summary>
    [LayoutRenderer("ixszmp")]
    public class GIxsZmpLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.IxsZmp);
        }
    }

    /// <summary>priorita max</summary>
    [LayoutRenderer("prioritamax")]
    public class GPrioritaMaxLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oSessionInfo.PrioritaMax);
        }
    }

    /// <summary>fc</summary>
    [LayoutRenderer("fc")]
    public class GFcLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.Fc);
        }
    }

    /// <summary>id organizační jednotky</summary>
    [LayoutRenderer("ixsorj")]
    public class GIxsOrjLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.IxsOrj);
        }
    }

    /// <summary>název organizační jednotky</summary>
    [LayoutRenderer("nazevorj")]
    public class GNazevOrjLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.NazevOrj);
        }
    }

    /// <summary>kódovaný název silného uživatele</summary>
    [LayoutRenderer("Ldb")]
    public class GLdbLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.Ldb);
        }
    }

    /// <summary>kódované heslo silného uživatele</summary>
    [LayoutRenderer("Pdb")]
    public class GPdbLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.Pdb);
        }
    }

    /// <summary>id instance</summary>
    [LayoutRenderer("ixsins")]
    public class GIxsInsLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.IxsIns);
        }
    }

    /// <summary>id spisového uzlu</summary>
    [LayoutRenderer("ixssu")]
    public class GIxsSuLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.IxsSu);
        }
    }

    /// <summary>licence databáze</summary>
    [LayoutRenderer("licadr")]
    public class GLicAdrLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.LicAdr);
        }
    }

    /// <summary>příznak cs</summary>
    [LayoutRenderer("csdb")]
    public class GCsDbLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oSessionInfo.CsDb);
        }
    }

    /// <summary>typ instalace hodnota odpovídá číselníku ginctyi (10=AČR, 20=civil, 30=ISTA, 40=ÚP, 50=OkÚ)</summary>
    [LayoutRenderer("typinst")]
    public class GTypInstLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oSessionInfo.TypInst);
        }
    }

    /// <summary>příznak archivace</summary>
    [LayoutRenderer("prizarchiv")]
    public class GPrizArchivLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oSessionInfo.PrizArchiv);
        }
    }

    /// <summary>příznak blobů</summary>
    [LayoutRenderer("prizblob")]
    public class GPrizBlobLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oSessionInfo.PrizBlob);
        }
    }

    /// <summary>id isu</summary>
    [LayoutRenderer("ixsisu")]
    public class GIxsIsuLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.IxsIsu);
        }
    }

    /// <summary>vzkaz</summary>
    [LayoutRenderer("vzkazy")]
    public class GVzkazyLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.Vzkazy);
        }
    }

    /// <summary>datum aktualizace</summary>
    [LayoutRenderer("datakt")]
    public class GDatAktLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.DateTimeValue(builder, l_oSessionInfo.DatAkt);
        }
    }

    /// <summary>verze databáze</summary>
    [LayoutRenderer("verzedb")]
    public class GVerzeDbLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oSessionInfo.VerzeDb);
        }
    }

    /// <summary>sub verze databáze</summary>
    [LayoutRenderer("subverzedb")]
    public class GSubVerzeDbLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oSessionInfo.SubVerzeDb);
        }
    }

    /// <summary>název rf</summary>
    [LayoutRenderer("nazevrf")]
    public class GNazevRfLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.NazevRf);
        }
    }

    /// <summary>projekt</summary>
    [LayoutRenderer("project")]
    public class GProjectLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.Project);
        }
    }

    /// <summary>příznak d</summary>
    [LayoutRenderer("prizd")]
    public class GPrizDLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oSessionInfo.PrizD);
        }
    }

    /// <summary>název spisového uzlu</summary>
    [LayoutRenderer("nazevsu")]
    public class GNazevSuLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.NazevSu);
        }
    }

    /// <summary>datum přihlášení</summary>
    [LayoutRenderer("datlogin")]
    public class GDatLoginLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.DateTimeValue(builder, l_oSessionInfo.DatLogin);
        }
    }

    /// <summary>název instance</summary>
    [LayoutRenderer("nazevins")]
    public class GNazevInsLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.NazevIns);
        }
    }

    /// <summary>datum vypršení platnosti</summary>
    [LayoutRenderer("datexp")]
    public class GDatExpLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.DateTimeValue(builder, l_oSessionInfo.DatExp);
        }
    }

    /// <summary>režim</summary>
    [LayoutRenderer("rezim")]
    public class GRezimLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oSessionInfo.Rezim);
        }
    }

    /// <summary>pořadí pro třídění</summary>
    [LayoutRenderer("poradilog")]
    public class GPoradiLogLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oSessionInfo.PoradiLog);
        }
    }

    /// <summary>aktuální počet přihlášených funkcí na fázi</summary>
    [LayoutRenderer("aktuz")]
    public class GAktuzLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oSessionInfo.Aktuz);
        }
    }

    /// <summary>typ agendy</summary>
    [LayoutRenderer("typag")]
    public class GTypAgLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oSessionInfo.TypAg);
        }
    }

    /// <summary>identifikátor přihlášení</summary>
    [LayoutRenderer("ixslpc")]
    public class GIxsLpcLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.IxsLpc);
        }
    }

    /// <summary>výsledek autorizační procedury</summary>
    [LayoutRenderer("vysledek")]
    public class GVysledekLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oSessionInfo.Vysledek);
        }
    }

    /// <summary>seznam fází k reinstalaci</summary>
    [LayoutRenderer("fazetoreinst")]
    public class GFazeToReinstLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.FazeToReinst);
        }
    }

    /// <summary>příznak privilegované funkce</summary>
    [LayoutRenderer("prizf")]
    public class GPrizFLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int16Value(builder, l_oSessionInfo.PrizF);
        }
    }

    /// <summary>expirace vstupenky do systému</summary>
    [LayoutRenderer("exptic")]
    public class GExpTicLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oSessionInfo.ExpTic);
        }
    }

    /// <summary>identifikátor relace databázového stroje</summary>
    [LayoutRenderer("sessid")]
    public class GSessidLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int64Value(builder, l_oSessionInfo.Sessid);
        }
    }

    /// <summary>pořadové číslo konkurenčního přihlášení</summary>
    [LayoutRenderer("logporcislokon")]
    public class GLogPorCisloKonLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oSessionInfo.LogPorCisloKon);
        }
    }

    /// <summary>název referenta s konkurenčním přihlášením</summary>
    [LayoutRenderer("nazevrefkon")]
    public class GNazevRefKonLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.NazevRefKon);
        }
    }

    /// <summary>adresa počítače s konkurenčním přihlášením</summary>
    [LayoutRenderer("ipadrkon")]
    public class GIpAdrKonLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.IpAdrKon);
        }
    }

    /// <summary>datum přihlášení uživatele s konkurenčním přihlášením</summary>
    [LayoutRenderer("datloginkon")]
    public class GDatLoginKonLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.DateTimeValue(builder, l_oSessionInfo.DatLoginKon);
        }
    }

    /// <summary>přihlašovací jméno uživatele s konkurenčním přihlášením</summary>
    [LayoutRenderer("loginuzivkon")]
    public class GLoginUzivKonLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.LoginUzivKon);
        }
    }

    /// <summary>sub verze ADZ</summary>
    [LayoutRenderer("subverzeadz")]
    public class GSubVerzeAdzLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int16Value(builder, l_oSessionInfo.SubVerzeAdz);
        }
    }

    /// <summary>vodotisk</summary>
    [LayoutRenderer("vodotisk")]
    public class GVodotiskLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.Vodotisk);
        }
    }

    /// <summary>příznak testovací databáze</summary>
    [LayoutRenderer("priztest")]
    public class GPrizTestLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oSessionInfo.PrizTest);
        }
    }

    /// <summary>vzkaz pro testovací databázi</summary>
    [LayoutRenderer("vzkaztest")]
    public class GVzkazTestLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.VzkazTest);
        }
    }

    /// <summary>identifikátor externího uživatele typu veřejnost (tj. občana)</summary>
    [LayoutRenderer("ixsexu")]
    public class GIxsExuLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.IxsExu);
        }
    }

    /// <summary>pořadové číslo přihlášení externího uživatele typu veřejnost (tj. občana)</summary>
    [LayoutRenderer("porcisexu")]
    public class GPorCisExuLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oSessionInfo.PorCisExu);
        }
    }

    /// <summary>identifikátor externího subjektu odpovídajícího aktuálně přihlášenému uživateli typu veřejnost (tj. občanu)</summary>
    [LayoutRenderer("ixsesuexu")]
    public class GIxsEsuExuLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.IxsEsuExu);
        }
    }

    /// <summary>licence zástupné osoby odpovídající aktuálně přihlášenému uživateli typu veřejnost (tj. občanu)</summary>
    [LayoutRenderer("licesuexu")]
    public class GLicEsuExuLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.LicEsuExu);
        }
    }

    /// <summary>pořadové číslo zástupné osoby odpovídající aktuálně přihlášenému uživateli typu veřejnost (tj. občanu)</summary>
    [LayoutRenderer("porzasexu")]
    public class GPorZasExuLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oSessionInfo.PorZasExu);
        }
    }

    /// <summary>stupeň přidělené důvěryhodnosti uživatele typu veřejnost (tj. občana)</summary>
    [LayoutRenderer("stuverexu")]
    public class GStuVerExuLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int16Value(builder, l_oSessionInfo.StuVerExu);
        }
    }

    /// <summary>identifikátor konfigurační skupiny uživatele typu veřejnost (tj. občana)</summary>
    [LayoutRenderer("ixsusrexu")]
    public class GIxsUsrExuLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oSessionInfo.IxsUsrExu);
        }
    }

    /// <summary>čas minulého úspěšného přihlášení uživatele typu veřejnost (tj. občana)</summary>
    [LayoutRenderer("lastloginexu")]
    public class GLastLoginExuLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.DateTimeValue(builder, l_oSessionInfo.LastLoginExu);
        }
    }

    /// <summary>revize databáze</summary>
    [LayoutRenderer("revizeadz")]
    public class GRevizeAdzLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oSessionInfo = GLogContext.SessionInfo;
                if (l_oSessionInfo == null ||
                    l_oSessionInfo.LogPorCislo.BaseValue == -1)    // u TK vracela session před přihlášením - logporcislo: -1, ixs_fun: 0000SF00000Z...
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oSessionInfo.RevizeAdz);
        }
    }

    /// <summary>revize databáze</summary>
    [LayoutRenderer("dbsession")]
    public class GDbSessionLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                GLogContext.StringValue(builder, GLogContext.DbSession);
        }
    }
}

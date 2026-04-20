//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GApplicationRenders.cs                       </Name>
//    <Description> Obsahuje renderery z ApplicationInfo                        </Description>
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

    /// <summary>fáze aplikace Ginis</summary>
    [LayoutRenderer("faze")]
    [System.Security.SecuritySafeCritical]
    public class GFazeLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        [System.Security.SecuritySafeCritical]
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oApplicationInfo = GLogContext.ApplicationInfo;
                if (l_oApplicationInfo == null)
                {
                    // přídavek - pokud fázi nezjistím z kontextu (ApplicationInfo), pokusím se ji získat bez potřeby kontextu (uvnitř je try-catch)
                    var l_sFazeNoContextValue = new GFazeLayoutRendererSupport().GetFaze();
                    if (!String.IsNullOrEmpty(l_sFazeNoContextValue))
                    {
                        builder.Append(l_sFazeNoContextValue);
                        return;
                    }   // přídavek


                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oApplicationInfo.Faze);
        }
    }

    /// <summary>fáze společných komponent aplikace Ginis</summary>
    [LayoutRenderer("fazegin")]
    public class GFazeGinLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oApplicationInfo = GLogContext.ApplicationInfo;
                if (l_oApplicationInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oApplicationInfo.FazeGin);
        }
    }

    /// <summary>fáze sestav aplikace Ginis</summary>
    [LayoutRenderer("fazeses")]
    public class GFazeSesLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oApplicationInfo = GLogContext.ApplicationInfo;
                if (l_oApplicationInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oApplicationInfo.FazeSes);
        }
    }

    /// <summary>verze aplikace Ginis</summary>
    [LayoutRenderer("verze")]
    public class GVerzeLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oApplicationInfo = GLogContext.ApplicationInfo;
                if (l_oApplicationInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oApplicationInfo.Verze);
        }
    }

    /// <summary>sub verze aplikace Ginis</summary>
    [LayoutRenderer("subverze")]
    public class GSubVerzeLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oApplicationInfo = GLogContext.ApplicationInfo;
                if (l_oApplicationInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oApplicationInfo.SubVerze);
        }
    }

    /// <summary>revize aplikace Ginis</summary>
    [LayoutRenderer("revize")]
    public class GRevizeLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oApplicationInfo = GLogContext.ApplicationInfo;
                if (l_oApplicationInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oApplicationInfo.Revize);
        }
    }

    /// <summary>revize společných komponent aplikace Ginis</summary>
    [LayoutRenderer("revizegin")]
    public class GRevizeGinLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                      var l_oApplicationInfo = GLogContext.ApplicationInfo;
                if (l_oApplicationInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oApplicationInfo.RevizeGin);
        }
    }

    /// <summary>revize sestav aplikace Ginis</summary>
    [LayoutRenderer("revizeses")]
    public class GRevizeSesLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oApplicationInfo = GLogContext.ApplicationInfo;
                if (l_oApplicationInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oApplicationInfo.RevizeSes);
        }
    }

    /// <summary>minimální požadovaná verze distribuční databáze</summary>
    /// <remarks>v případě současného nastavení VerzeDbMin2, je tato verze ta nižší</remarks>
    [LayoutRenderer("verzedbmin")]
    public class GVerzeDbMinLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oApplicationInfo = GLogContext.ApplicationInfo;
                if (l_oApplicationInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oApplicationInfo.VerzeDbMin);
        }
    }

    /// <summary>minimální požadovaná subverze distribuční databáze</summary>
    /// <remarks>v případě současného nastavení SubVerzeDbMin2, je tato subverze ta nižší</remarks>
    [LayoutRenderer("subverzedbmin")]
    public class GSubVerzeDbMinLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oApplicationInfo = GLogContext.ApplicationInfo;
                if (l_oApplicationInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oApplicationInfo.SubVerzeDbMin);
        }
    }

    /// <summary>minimální požadovaná revize distribuční databáze</summary>
    /// <remarks>v případě současného nastavení RevizeAdzMin2, je tato revize ta nižší</remarks>
    [LayoutRenderer("revizeadzmin")]
    public class GRevizeAdzMinLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oApplicationInfo = GLogContext.ApplicationInfo;
                if (l_oApplicationInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oApplicationInfo.RevizeAdzMin);
        }
    }

    /// <summary>minimální požadovaná verze databáze v testovací distribuci</summary>
    /// <remarks>v případě současného nastavení VerzeDbMin, je tato verze ta vyšší</remarks>
    [LayoutRenderer("verzedbmin2")]
    public class GVerzeDbMin2LayoutRenderer : LayoutRenderer, IGObject
    {
        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oApplicationInfo = GLogContext.ApplicationInfo;
                if (l_oApplicationInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oApplicationInfo.VerzeDbMin2);
        }
    }

    /// <summary>minimální požadovaná subverze databáze v testovací distribuci</summary>
    /// <remarks>v případě současného nastavení SubVerzeDbMin, je tato subverze ta vyšší</remarks>
    [LayoutRenderer("subverzedbmin2")]
    public class GSubVerzeDbMin2LayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oApplicationInfo = GLogContext.ApplicationInfo;
                if (l_oApplicationInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oApplicationInfo.SubVerzeDbMin2);
        }
    }

    /// <summary>minimální požadovaná revize databáze v testovací distribuci</summary>
    /// <remarks>v případě současného nastavení RevizeAdzMin, je tato revize ta vyšší</remarks>
    [LayoutRenderer("revizeadzmin2")]
    public class GRevizeAdzMin2LayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oApplicationInfo = GLogContext.ApplicationInfo;
                if (l_oApplicationInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.Int32Value(builder, l_oApplicationInfo.RevizeAdzMin2);
        }
    }

    /// <summary>seznam závislých fází oddělených čárkami</summary>
    [LayoutRenderer("dependantmodules")]
    public class GDependantModulesLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oApplicationInfo = GLogContext.ApplicationInfo;
                if (l_oApplicationInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oApplicationInfo.DependantModules);
        }
    }

    /// <summary>seznam závislých revizí oddělených čárkami</summary>
    [LayoutRenderer("dependantrevisions")]
    public class GDependantRevisionsLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oApplicationInfo = GLogContext.ApplicationInfo;
                if (l_oApplicationInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oApplicationInfo.DependantRevisions);
        }
    }

    /// <summary>subsystém aplikace Ginis</summary>
    [LayoutRenderer("subsystem")]
    public class GSubsystemLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oApplicationInfo = GLogContext.ApplicationInfo;
                if (l_oApplicationInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, Enum.GetName(typeof(GCommon.Subsystem), l_oApplicationInfo.Subsystem));  // mělo by vrátit název z enumu
        }
    }

    /// <summary>zkrácený název aplikace</summary>
    [LayoutRenderer("shortname")]
    public class GShortNameLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oApplicationInfo = GLogContext.ApplicationInfo;
                if (l_oApplicationInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oApplicationInfo.ShortName);
        }
    }

    /// <summary>název aplikace</summary>
    [LayoutRenderer("name")]
    public class GNameLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oApplicationInfo = GLogContext.ApplicationInfo;
                if (l_oApplicationInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.StringValue(builder, l_oApplicationInfo.Name);
        }
    }

    /// <summary>příznak provádění testu verze databáze</summary>
    [LayoutRenderer("testverzedb")]
    public class GTestVerzeDbLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var l_oApplicationInfo = GLogContext.ApplicationInfo;
                if (l_oApplicationInfo == null)
                {
                    builder.Append(GLogContext.DefaultValue);
                    return;
                }
                GLogContext.BoolValue(builder, l_oApplicationInfo.TestVerzeDb);
        }
    }

}

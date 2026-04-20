//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GJsRenderers.cs                              </Name>
//    <Description> Kod autora                                                  </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2018-08-29                                                  </Created>
//  </FileHeader>

using NLog;
using NLog.LayoutRenderers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

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

    ///// <summary>Kod autora</summary>
    //[LayoutRenderer("authorCode")]
    //[System.Security.SecuritySafeCritical]
    //public class GAuthorCodeLayoutRenderer : LayoutRenderer, IGObject
    //{
    //    /// <summary>Zapíše výstup rendereru</summary>
    //    protected override void Append(StringBuilder builder, LogEventInfo logEvent)
    //    {
    //        var authorCode = GLogContext.DefaultValue;
    //        if (logEvent.HasProperties && logEvent.Properties.ContainsKey("authorCode"))
    //            authorCode = logEvent.Properties["authorCode"].ToString();

    //        GLogContext.StringValue(builder, authorCode);
    //    }
    //}



    /// <summary>Zaserializovana data z klienta</summary>
    [LayoutRenderer(GClientDataLayoutRenderer.m_csClientData)]
    [System.Security.SecuritySafeCritical]
    public class GClientDataLayoutRenderer : LayoutRenderer, IGObject
    {

        /// <summary>Nazev property v LogEventInfo.Properties</summary>
        public const string m_csClientData = "clientData";

        /// <summary>Zapíše výstup rendereru</summary>
        protected override void Append(StringBuilder builder, LogEventInfo logEvent)
        {
                var clientData = string.Empty;
                if (logEvent.HasProperties && logEvent.Properties.ContainsKey(m_csClientData) && logEvent.Properties[m_csClientData] != null)
                    clientData = JsonConvert.SerializeObject(logEvent.Properties[m_csClientData].ToString());

                GLogContext.StringValue(builder, clientData);
        }
    }

    //NOTE: Nastavuji primo
    ///// <summary>Cas klienta</summary>
    //[LayoutRenderer("clientDateTime")]
    //[System.Security.SecuritySafeCritical]
    //public class GClientDateTimeLayoutRenderer : LayoutRenderer, IGObject
    //{
    //    /// <summary>Zapíše výstup rendereru</summary>
    //    protected override void Append(StringBuilder builder, LogEventInfo logEvent)
    //    {
    //        var clientDateTime = GLogContext.DefaultValue;
    //        if (logEvent.HasProperties && logEvent.Properties.ContainsKey("clientDateTime"))
    //            clientDateTime = logEvent.Properties["clientDateTime"].ToString();

    //        GLogContext.StringValue(builder, clientDateTime);
    //    }
    //}
}

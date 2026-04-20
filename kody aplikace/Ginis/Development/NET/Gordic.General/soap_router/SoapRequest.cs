//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.SoapRequest.cs                               </Name>
//    <Description> Lagacy SOAP-request                                         </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2026-02-10                                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Xml;
using System.Xml.Linq;
using System.Xml.XPath;

namespace Gordic.General;

/// <summary>
/// Lagacy SOAP-request
/// </summary>
public sealed class SoapRequest(string action, XElement body)
{
    public readonly string Action = action;
    public readonly XElement Body = body;

    public static SoapRequest Load(IGHttpContextAdapter adapter, SoapRoute route)
    {
        using var ms = new MemoryStream();
        adapter.GetInputStream().CopyTo(ms);
        ms.Position = 0;

        //// Force FileBufferingReadStream to buffer all content by reading to end then seeking back
        //if (ms is Microsoft.AspNetCore.WebUtilities.FileBufferingReadStream && ms.Length == 0)
        //{
        //    // Read a byte to trigger buffering, then seek back
        //    var buffer = new byte[1];
        //    while (ms.Read(buffer, 0, 1) > 0) { }
        //    ms.Position = 0;
        //}


        using var xmlReader = XmlReader.Create(
            ms,
            new XmlReaderSettings
            {
                Async = false,
                IgnoreComments = false,
                IgnoreWhitespace = false,
                CloseInput = false
            });

        var soapEnvelope = XDocument.Load(
            xmlReader,
            LoadOptions.PreserveWhitespace | LoadOptions.SetLineInfo
        );

        // Prepare namespaces for XPath
        var ns = new XmlNamespaceManager(new NameTable());
        ns.AddNamespace("s11", "http://schemas.xmlsoap.org/soap/envelope/");
        ns.AddNamespace("s12", "http://www.w3.org/2003/05/soap-envelope");
        ns.AddNamespace("wsa04", "http://schemas.xmlsoap.org/ws/2004/08/addressing");
        ns.AddNamespace("wsa05", "http://www.w3.org/2005/08/addressing");

        // Find the Envelope using known SOAP namespaces or local-name fallback
        var envelopeNode = soapEnvelope
            .XPathSelectElement(
                "/s11:Envelope | /s12:Envelope | /*[local-name()='Envelope']",
                ns
            );

        if (envelopeNode is null)
        {
            // No envelope found – keep behavior: just return nulls
            return new SoapRequest(null, null);
        }

        // Header and Body by local-name (namespace-agnostic)
        var body = envelopeNode.XPathSelectElement("./*[local-name()='Body']");

        // Action from WS-Addressing 2005, 2004, or any Action by local-name
        switch (route.ActionLocation)
        {
            case SoapRoute.SoapActionLocation.Body:
                var header = envelopeNode.XPathSelectElement("./*[local-name()='Header']");
                var actionElement =
                    header?.XPathSelectElement("./wsa05:Action", ns) ??
                    header?.XPathSelectElement("./wsa04:Action", ns) ??
                    header?.XPathSelectElement("./*[local-name()='Action']");

                return new SoapRequest(actionElement?.Value, body);

            case SoapRoute.SoapActionLocation.Header:
                return new SoapRequest(adapter.GetRequestHeader("SOAPAction"), body);

            default:
                return new SoapRequest(null, null);
        }
    }
}
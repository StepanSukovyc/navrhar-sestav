//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GSOAPGenericSerializer.cs                    </Name>
//    <Description> Generic SOAP serializer                                     </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-06-13                                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Xml;

namespace Gordic.General
{
    /// <summary>
    /// Generic SOAP serializer
    /// </summary>
    public class GSoapGenericSerializer : IGSoapSerializer
    {
        readonly static IGLogger Logger = GLogManager.CurrentClassLogger();
        readonly Func<string, string, GSoapClientException> CreateGSoapException;
        public string Url
        {
            get;
        }

        public GSoapGenericSerializer(Func<string , string, GSoapClientException> createGSoapException, string url)
        {
            CreateGSoapException = createGSoapException;
            Url = url;
        }

        /// <summary>
        /// MakeSOAPDocument
        /// </summary>
        /// <param name="soapObject"></param>
        /// <returns></returns>
        /// <exception cref="GException"></exception>
        public virtual string MakeSoapDocument(object soapObject)
        {
            try
            {
                using (var sw = new StringWriter())
                {
                    sw.WriteLine(@"<?xml version=""1.0""?>");
                    sw.WriteLine(@"<soapenv:Envelope xmlns:soapenv=""http://schemas.xmlsoap.org/soap/envelope/"">");
                    sw.WriteLine("<soapenv:Header/>");
                    sw.WriteLine("<soapenv:Body>");
                    sw.Write(SoapObjectAsString(soapObject));
                    sw.WriteLine("</soapenv:Body>");
                    sw.WriteLine("</soapenv:Envelope>");
                    sw.Flush();
                    return sw.ToString();
                }
            }
            catch (Exception ex)
            {
                throw new GException(24700006, 21090088, ex, soapObject == null ? "null" : soapObject.ToString()); //RC-EX 21090088 : Požadavek: {0} se nepodařilo serializovat na SOAP objekt
            }
        }

        /// <summary>
        /// ParseSOAPResponse
        /// </summary>
        /// <param name="soapXml"></param>
        /// <param name="responseType"></param>
        /// <returns></returns>
        public virtual object ParseSoapObject(string soapXml, Type responseType)
        {
            var soapDoc = new XmlDocument();
            soapDoc.LoadXml(soapXml);

            var mgr = new XmlNamespaceManager(soapDoc.NameTable);
            mgr.AddNamespace("soapenv", "http://schemas.xmlsoap.org/soap/envelope/");

            var soapFAULT = soapDoc.SelectSingleNode("/soapenv:Envelope/soapenv:Body/soapenv:Fault", mgr);
            if (soapFAULT != null)
            {
                var soapFault = soapFAULT.SelectSingleNode("faultcode");
                var soapFaultString = soapFAULT.SelectSingleNode("faultstring");
                // ** osetreni chyboveho stavu SOAP
                Logger.Error($"SOAP-Fault is present: {(soapFault == null ? "null" : soapFault.InnerText)}\r\n{(soapFaultString == null ? "null" : soapFaultString.InnerText)}");
                return CreateGSoapException(soapFault.InnerText, soapFaultString.InnerText);
            }

            var soapBody = soapDoc.SelectSingleNode("/soapenv:Envelope/soapenv:Body", mgr);
            if(soapBody == null)
            {
                return CreateGSoapException("SOAP-Body is NULL", "");
            }

            try
            {
                using (var sr = new StringReader(soapBody.InnerXml))
                {
                    return GSerializerFactory.GetXmlSerializer(responseType).Deserialize(sr);
                }
            }
            catch(Exception ex)
            {
                Logger.Error(ex, $"SOAP-Deserialize error - {Url}");
                return CreateGSoapException(
                    $"SOAP-Body is not deserializable with: {responseType.FullName}, [{Url}]",
                    ex.ToString()
                );
            }
        }

        /// <summary>
        /// SoapObjectAsString
        /// </summary>
        /// <param name="soapObject"></param>
        /// <returns></returns>
        protected virtual string SoapObjectAsString(object soapObject)
        {
            var xmlWriterSettings = new XmlWriterSettings
            {
                Indent = true,
                OmitXmlDeclaration = true
            };

            using (var sw = new StringWriter())
            using (var xmlWriter = XmlWriter.Create(sw, xmlWriterSettings))
            {
                GSerializerFactory
                    .GetXmlSerializer(soapObject.GetType())
                    .Serialize(xmlWriter, soapObject);
                return sw.ToString();
            }
        }
    }
}

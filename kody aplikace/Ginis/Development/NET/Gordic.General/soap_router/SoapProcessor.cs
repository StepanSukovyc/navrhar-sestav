//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.SoapProcessor.cs                             </Name>
//    <Description> Legacy SOAP-server processor                                </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2026-02-10                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General;

/// <summary>
/// Legacy SOAP-server processor
/// Do not use - only for 3.rd party
/// </summary>
public abstract class SoapProcessor(SoapRoute route, Func<IGSoapSerializer> soapSerializerFactory)
{
    protected readonly SoapRoute Route = route;
    protected readonly Func<IGSoapSerializer> SoapSerializerFactory = soapSerializerFactory;
    public abstract void Process(SoapRequest soapRequest, SoapMethod soapMethod, IGHttpContextAdapter adapter);
    public abstract SoapMethod BuildSoapMethod(SoapRequest soapRequest);
}
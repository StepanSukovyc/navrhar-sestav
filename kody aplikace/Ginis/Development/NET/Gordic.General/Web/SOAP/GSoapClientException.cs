//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GSoapClientException.cs                      </Name>
//    <Description> SOAP exception                                              </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-06-14                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General
{
    /// <summary>
    /// SOAP exception
    /// </summary>
    public class GSoapClientException : Exception
    {
        public GSoapClientException(string requestID, string soapFault, string soapFaultString) : base(soapFault)
        {
            SoapFault = soapFault;
            SoapFaultString  = soapFaultString;
            RequestID = requestID;
        }

        public GSoapClientException() : base()
        {
        }

        public GSoapClientException(string message, Exception innerException) : base(message, innerException)
        {
        }

        public readonly string RequestID;
        public readonly string SoapFault;
        public readonly string SoapFaultString;
    }
}

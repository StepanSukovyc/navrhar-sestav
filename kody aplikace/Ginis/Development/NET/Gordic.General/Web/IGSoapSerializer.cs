//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGSoapSerializer.cs                          </Name>
//    <Description> SOAP objects serializer                                     </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-08-12                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General
{
    /// <summary>
    /// SOAP objects serializer
    /// </summary>
    public interface IGSoapSerializer
    {
        /// <summary>
        /// MakeSOAPDocument
        /// </summary>
        /// <param name="soapObject"></param>
        /// <returns></returns>
        string MakeSoapDocument(object soapObject);

        /// <summary>
        /// ParseSOAPResponse
        /// </summary>
        /// <param name="soapXml"></param>
        /// <param name="responseType"></param>
        /// <returns></returns>
        object ParseSoapObject(string soapXml, Type responseType);

        /// <summary>
        /// Ssource url - diagnostics info
        /// </summary>
        string Url
        {
            get;
        }
    }
}

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.SoapActionAttribute.cs                       </Name>
//    <Description> Atribut pro serverovou třídu implementující komunikaci se SOAP</Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-08-09                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;

namespace Gordic.General
{
    /// <summary>
    /// Atribut pro serverovou třídu implementující komunikaci se SOAP
    /// </summary>
    [AttributeUsage(AttributeTargets.Class)]
    public class SoapActionAttribute : Attribute
    {
        /// <summary>
        /// SoapAction
        /// </summary>
        public readonly string SoapAction;

        /// <summary>
        /// Konstruktor
        /// </summary>
        /// <param name="soapAction"></param>
        public SoapActionAttribute(string soapAction = "")
        {
            SoapAction = soapAction;
        }

        static IEnumerable<SoapActionAttribute> FindAttribute(Type t) =>
            t
                .GetCustomAttributes(true)
                .OfType<SoapActionAttribute>();

        /// <summary>
        /// FindInObject
        /// </summary>
        /// <param name="carrier"></param>
        /// <param name="defaultValue"></param>
        /// <returns></returns>
        public static string FindInObject(object carrier, string defaultValue = "") =>
            FindAttribute(carrier.GetType())
                .Select(attr => attr.SoapAction)
                .DefaultIfEmpty(defaultValue)
                .First();
    }
}

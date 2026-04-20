//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GSerializerFactory.cs                        </Name>
//    <Description> SOAP-XML serializers                                        </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>  © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2020-06-19                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace Gordic.General
{
    /// <summary>
    /// XML serializer factory - cache XmlSerializers
    /// .net48 has bug with XmlSerializer creation - https://stackoverflow.com/questions/23897145/memory-leak-using-streamreader-and-xmlserializer
    /// </summary>
    public static class GSerializerFactory
    {
        private static readonly ConcurrentDictionary<string, XmlSerializer> XmlSerializers = new ConcurrentDictionary<string, XmlSerializer>();


        /// <summary>
        /// GetXmlSerializer - returns cached xml serializer
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public static XmlSerializer GetXmlSerializer<T>() => GetXmlSerializer(typeof(T));

        /// <summary>
        /// GetXmlSerializer - returns cached xml serializer
        /// </summary>
        /// <param name="objectType">SOAP type</param>
        /// <returns></returns>
        public static XmlSerializer GetXmlSerializer(Type objectType)
        {
            return GetXmlSerializer(
                objectType: objectType,
                rootAtr: "",
                defNs: "",
                createFn: () => new XmlSerializer(objectType)
            );
        }

        /// <summary>
        /// GetXmlSerializer - returns cached xml serializer
        /// </summary>
        /// <param name="objectType"></param>
        /// <param name="rootAtr"></param>
        /// <param name="defNs"></param>
        /// <returns></returns>
        public static XmlSerializer GetXmlSerializer(Type objectType, string rootAtr, string defNs)
        {
            return GetXmlSerializer(
                objectType: objectType,
                rootAtr: rootAtr,
                defNs: defNs,
                createFn: () => new XmlSerializer(
                    type: objectType,
                    overrides: null,
                    extraTypes: null,
                    root: new XmlRootAttribute(rootAtr),
                    defaultNamespace: defNs
                )
            );
        }

        /// <summary>
        /// GetXmlSerializer - returns cached xml serializer
        /// </summary>
        /// <param name="objectType">SOAP type</param>
        /// <param name="defNs"></param>
        /// <returns></returns>
        public static XmlSerializer GetXmlSerializer(Type objectType, string defNs)
        {
            return GetXmlSerializer(
                objectType: objectType,
                rootAtr: "",
                defNs: defNs,
                createFn: () => new XmlSerializer(objectType, defNs)
            );
        }

        /// <summary>
        /// GetXmlSerializer - returns cached xml serializer
        /// </summary>
        /// <param name="objectType">SOAP type</param>
        /// <param name="rootAtr">nazev root atributu</param>
        /// <param name="defNs">default namespace</param>
        /// <param name="createFn"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"><paramref name="objectType"/> is <c>null</c>.</exception>
        private static XmlSerializer GetXmlSerializer(Type objectType, string rootAtr, string defNs, Func<XmlSerializer> createFn)
        {
            if (objectType == null)
            {
                throw new ArgumentNullException(nameof(objectType));
            }

            return XmlSerializers.GetOrAdd(
                key: $"{objectType.AssemblyQualifiedName}#{rootAtr}#{defNs}",
                valueFactory: (_) => createFn.Invoke()
            );
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Obsolete("GetCurrentSerializers - test pouziti")]
        public static IEnumerable<string> GetCurrentSerializers() => XmlSerializers.Keys;
    }
}

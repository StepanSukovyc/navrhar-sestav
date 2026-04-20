//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.TemplateLoadException.cs               </Name>
//    <Description> Výjimka při načítání neplatné šablony.                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using System;
using System.Runtime.Serialization;
using System.Xml;
using Gordic.General;

namespace Gordic.GFE.WinClient.Internal.Templates
{
    /// <summary>
    /// Výjimka při načítání neplatné šablony.
    /// </summary>
    [Serializable()]
    public class TemplateLoadException : Exception
    {
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public TemplateLoadException()
            : base()
        {
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="message">Zprava</param>
        public TemplateLoadException(string message)
            : base(message)
        {
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="message">zpráva</param>
        /// <param name="innerException">vnitřní vyjímka</param>
        public TemplateLoadException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        /// <exclude/>
        protected TemplateLoadException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }

        /// <exclude/>
        internal static void AssertAttributeExists(XmlElement element, string attributeName)
        {
            if (string.IsNullOrEmpty(element.GetAttribute(attributeName)))
                throw new TemplateLoadException(string.Format(string.Join(" ", GResources.GetResourceText(29450542), "'{0}':;", GResources.GetResourceText(29450541), "'{1}'", GResources.GetResourceText(29450540)), element.Name, attributeName)); //RC 29450542 : Chyba v šabloně ve větví
        }
    }
}

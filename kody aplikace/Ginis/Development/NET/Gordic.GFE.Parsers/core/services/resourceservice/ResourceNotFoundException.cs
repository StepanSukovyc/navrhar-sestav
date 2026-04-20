//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ResourceNotFoundException.cs             </Name>
//    <Description> Vyhazuje se v případě nenalezení zdroje dat                 </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using Gordic.General;
using System;
using System.Runtime.Serialization;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Vyhazuje se v případě nenalezení zdroje dat
    /// </summary>
    [Serializable()]
    public class ResourceNotFoundException : CoreException
    {
        /// <summary>
        /// Konstruktor třídy dle zdroje
        /// </summary>
        /// <param name="resource">Hledaný zdroj</param>
        public ResourceNotFoundException(string resource)
            : base(string.Format(string.Join(" ", GResources.GetResourceText(29450252), "'{0}'", Gordic.General.GResources.GetResourceText(29450143)), resource)) //RC 29450252 : Zdroj
        {
        }

        /// <summary>
        /// Prázdný konstruktor třídy
        /// </summary>
        public ResourceNotFoundException()
            : base()
        {
        }

        /// <summary>
        /// Konstruktor
        /// </summary>
        /// <param name="message">Zpráva</param>
        /// <param name="innerException">Vnitřní vyjímka</param>
        public ResourceNotFoundException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        /// <summary>
        /// Deserializator vyjímky
        /// </summary>
        /// <param name="info"></param>
        /// <param name="context"></param>
        protected ResourceNotFoundException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }
    }
}

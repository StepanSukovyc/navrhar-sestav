//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.CoreException.cs                         </Name>
//    <Description> Základní třída výjímek vyvolaných v jádře Návrháře sestav   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System;
using System.Runtime.Serialization;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Základní třída výjímek vyvolaných v jádře Návrháře sestav
    /// </summary>
    [Serializable()]
    public class CoreException : Exception
    {
        /// <summary>
        /// Základní konstruktor třídy
        /// </summary>
        public CoreException()
            : base()
        {
        }

        /// <summary>
        /// Konstruktor se zprávou
        /// </summary>
        /// <param name="message">Posílaná zpráva</param>
        public CoreException(string message)
            : base(message)
        {
        }

        /// <summary>
        /// Konstruktor se zprávou a vnitřní vyjímkou
        /// </summary>
        /// <param name="message">Posílaná zpráva</param>
        /// <param name="innerException">Vnitřní výjímka</param>
        public CoreException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        /// <summary>
        /// Deserializace
        /// </summary>
        /// <param name="info"></param>
        /// <param name="context"></param>
        protected CoreException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }
    }
}

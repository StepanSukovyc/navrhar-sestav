//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.OxsValidateException.cs                   </Name>
//    <Description> Chyba validace                                              </Description>
//    <Author>      Mgr. Stepan Sukovyč                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2016-09-01                                                  </Created>
//  </FileHeader>

using System;
using System.Runtime.Serialization;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Chyba validace
    /// </summary>
    [Serializable]
    class OxsValidateException : Exception
    {
        /// <summary>
        /// Základní konstruktor třídy
        /// </summary>
        public OxsValidateException()
            : base()
        {
        }

        /// <summary>
        /// Konstruktor se zprávou
        /// </summary>
        /// <param name="message">Posílaná zpráva</param>
        public OxsValidateException(string message)
            : base(message)
        {
        }

        /// <summary>
        /// Konstruktor se zprávou a vnitřní vyjímkou
        /// </summary>
        /// <param name="message">Posílaná zpráva</param>
        /// <param name="innerException">Vnitřní výjímka</param>
        public OxsValidateException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        /// <summary>
        /// Deserializace
        /// </summary>
        /// <param name="info"></param>
        /// <param name="context"></param>
        protected OxsValidateException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }

    }
}

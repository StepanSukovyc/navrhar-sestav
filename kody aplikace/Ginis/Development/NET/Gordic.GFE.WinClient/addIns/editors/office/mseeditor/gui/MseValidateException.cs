//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ValidateException.cs                   </Name>
//    <Description> Chyba validace                                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Runtime.Serialization;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Chyba validace
    /// </summary>
    [Serializable]
    class MseValidateException : Exception
    {
        /// <summary>
        /// Základní konstruktor třídy
        /// </summary>
        public MseValidateException()
            : base()
        {
        }

        /// <summary>
        /// Konstruktor se zprávou
        /// </summary>
        /// <param name="message">Posílaná zpráva</param>
        public MseValidateException(string message)
            : base(message)
        {
        }

        /// <summary>
        /// Konstruktor se zprávou a vnitřní vyjímkou
        /// </summary>
        /// <param name="message">Posílaná zpráva</param>
        /// <param name="innerException">Vnitřní výjímka</param>
        public MseValidateException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        /// <summary>
        /// Deserializace
        /// </summary>
        /// <param name="info"></param>
        /// <param name="context"></param>
        protected MseValidateException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }

    }
}

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GrfValidateException.cs                </Name>
//    <Description>                                                             </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-02-28                                                  </Created>
//  </FileHeader>

using Gordic.GFE.WinClient.Editor;
using Microsoft.Office.Interop.Word;
using System;
using System.ComponentModel.Design;
using System.Runtime.Serialization;

namespace Gordic.GFE.WinClient.GrfEditor
{
    /// <summary>
    /// Chyba validace
    /// </summary>
    [Serializable]
    class GrfValidateException : Exception
    {
        /// <summary>
        /// Základní konstruktor třídy
        /// </summary>
        public GrfValidateException()
            : base()
        {
        }

        /// <summary>
        /// Konstruktor se zprávou
        /// </summary>
        /// <param name="message">Posílaná zpráva</param>
        public GrfValidateException(string message)
            : base(message)
        {
        }

        /// <summary>
        /// Konstruktor se zprávou a vnitřní vyjímkou
        /// </summary>
        /// <param name="message">Posílaná zpráva</param>
        /// <param name="innerException">Vnitřní výjímka</param>
        public GrfValidateException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        /// <summary>
        /// Deserializace
        /// </summary>
        /// <param name="info"></param>
        /// <param name="context"></param>
        protected GrfValidateException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }

        /// <summary>
        /// Konstruktor se zprávou
        /// </summary>
        /// <param name="message">Zpráva uživateli</param>
        /// <param name="item">Chybně umístěná položka</param>
        public GrfValidateException(string message, AbstractTextContent item)
            : base(message)
        {
            item?.ServiceSelection.SetSelectedComponents(item, SelectionTypes.Replace);
        }

    }
}

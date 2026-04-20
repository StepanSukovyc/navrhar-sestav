//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.RunDesktopException.cs                 </Name>
//    <Description> Oštření chyby spuštění pracovního stolu                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-22                                                  </Created>
//  </FileHeader>

using System;
using System.Runtime.Serialization;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Oštření chyby spuštění pracovního stolu
    /// </summary>
    [Serializable()]
    public class RunDesktopException : Exception
    {
        /// <summary>
        /// Vytvoření nové instance třídy RunDesktopException.
        /// </summary>
        public RunDesktopException()
            : base()
        {
        }

        /// <summary>
        /// Vytvoření nové instance třídy RunDesktopException
        /// </summary>
        public RunDesktopException(string message)
            : base(message)
        {
        }

        /// <summary>
        /// Vytvoření nové instance třídy RunDesktopException.
        /// </summary>
        public RunDesktopException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        /// <summary>
        /// Vytvoření nové instance třídy RunDesktopException.
        /// </summary>
        protected RunDesktopException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }
    }
}

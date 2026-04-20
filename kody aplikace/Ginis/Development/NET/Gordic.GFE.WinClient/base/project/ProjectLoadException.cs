//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ProjectLoadException.cs                </Name>
//    <Description> Chyba načtení projektu                                      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using System;
using System.Runtime.Serialization;

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// Chyba načtení projektu
    /// </summary>
    [Serializable]
    class ProjectLoadException : Exception
    {
        /// <summary>
        /// Prázdný konstruktor třídy
        /// </summary>
        public ProjectLoadException()
            : base()
        {
        }
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="message">Chybová hláška</param>
        public ProjectLoadException(string message)
            : base(message)
        {
        }
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="message">Chybová hláška</param>
        /// <param name="innerException">Vnitřní chyba</param>
        public ProjectLoadException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
        /// <exclude/>
        protected ProjectLoadException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }
    }
}

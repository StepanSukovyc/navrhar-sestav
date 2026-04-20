//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GEventChannel.cs                             </Name>
//    <Description>                                                             </Description>
//    <Author>      Vlastimil Máca                                              </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-01-12                                                  </Created>
//  </FileHeader>

using System;
using System.Linq;

namespace Gordic.General
{
    /// <summary>
    /// Channel for same type of events (or events of same interest)
    /// </summary>
    public class GEventChannel : IGDto
    {
        /// <summary>
        /// channel prefix
        /// </summary>
        public string[] prefixes;

        /// <summary>
        /// ID of event
        /// </summary>
        public string eventId;

        /// <summary>
        /// Subject filtering parts
        /// </summary>
        [GTypeScript(Type ="Primitive[]")]
        public IGDbType[] subjectParts;

        /// <summary>
        /// Domain of event
        /// </summary>
        public string domain;

        /// <summary>
        /// To Channel name
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return String.Join("/", String.Join("/",prefixes), domain, eventId, subjectParts != null ? String.Join("/",subjectParts.Select(it=>it.ToString().Trim())) : String.Empty);
        }

    }
}

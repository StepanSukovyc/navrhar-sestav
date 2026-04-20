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
    public static class GEventChannelExtensions
    {
        

        /// <summary>
        /// To Channel name
        /// </summary>
        /// <returns></returns>
        public static string ToCloudEventType(this GEventChannel ec)
        {
            return "cz.gordic.developer."+String.Join(".", String.Join(".", ec.prefixes),/* ec.domain,*/ ec.eventId).TrimEnd('.').ToLower();
        }

    }
}

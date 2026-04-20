//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGMessageObjectArchiver.cs                   </Name>
//    <Description> Object request/response archiver                            </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-06-22                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;

namespace Gordic.General
{
    /// <summary>
    /// Object request/response archiver
    /// </summary>
    public interface IGMessageObjectArchiver
    {
        /// <summary>
        /// Store request
        /// </summary>
        /// <param name="messageObject"></param>
        /// <param name="metaInfo"></param>
        /// <returns>ArchiveCounter id. Store to metadata as ArchiveCounter = ArchiveCounter.ToString()</returns>
        long StoreRequest(object messageObject, IDictionary<string, string> metaInfo = null);

        /// <summary>
        /// Store response
        /// </summary>
        /// <param name="messageObject"></param>
        /// <param name="metaInfo"></param>
        void StoreResponse(object messageObject, IDictionary<string, string> metaInfo = null);
    }
}

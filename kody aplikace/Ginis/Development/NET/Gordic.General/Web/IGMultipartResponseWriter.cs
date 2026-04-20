//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGMultipartResponseWriter.cs                 </Name>
//    <Description> Interface for multipart response writer.                    </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-06-03                                                  </Created>
//  </FileHeader>

using System.IO;

namespace Gordic.General
{
    /// <summary>
    /// Interface for multipart response writer.
    /// </summary>
    public interface IGMultipartResponseWriter
    {
        /// <summary>
        /// Write message + streams as MTOM to http stream.
        /// </summary>
        /// <param name="outputStream"></param>
        /// <param name="responseMessage"></param>
        /// <param name="transportStreams"></param>
        void WriteMultipartFormData(Stream outputStream, byte[] responseMessage, GTransportStreams transportStreams);
    }
}

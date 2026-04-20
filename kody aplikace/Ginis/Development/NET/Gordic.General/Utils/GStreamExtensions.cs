//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GStreamExtensions.cs                         </Name>
//    <Description> Stream extensions                                           </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-08-19                                                  </Created>
//  </FileHeader>

using System.IO;

namespace Gordic.General
{
    /// <summary>
    /// Stream extensions
    /// </summary>
    public static class GStreamExtensions
    {
        /// <summary>
        /// Read stream as byte array
        /// </summary>
        /// <param name="stream"></param>
        /// <returns></returns>
        public static byte[] ReadAsByteArray(this Stream stream)
        {
            using (var ms = new MemoryStream())
            {
                stream.CopyTo(ms);
                ms.Flush();
                ms.Seek(0, SeekOrigin.Begin);
                return ms.ToArray();
            }
        }

        /// <summary>
        /// Obsah tohoto stream převede na nový memory stream
        /// </summary>
        /// <param name="stream"></param>
        /// <returns></returns>
        public static MemoryStream ToMemoryStream(this Stream stream)
        {
            MemoryStream memoryStream = new MemoryStream();
            stream.CopyTo(memoryStream);
            return memoryStream;
        }
    }
}

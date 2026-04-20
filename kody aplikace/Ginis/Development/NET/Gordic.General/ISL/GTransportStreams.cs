//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GTransportStreams.cs                                </Name>
//    <Description> GBlobFiles                                                  </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-08-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;

namespace Gordic.General
{
    public class GOutputStream__488 : IGDto
    {
        public GTransportStreams Streams;

        public static GOutputStream__488 Create(Stream stream)
        {
            var streams = new GTransportStreams();
            streams.Add(GTransportStream.OpenRead(stream));
            return new GOutputStream__488() { Streams = streams };
        }
    }

    /// <summary>
    /// GTransportStreams
    /// </summary>
    [Serializable]
    public sealed class GTransportStreams : List<GTransportStream>, IDisposable
    {
        /// <summary>
        /// GTransportStreams
        /// </summary>
        public GTransportStreams()
        {
            Tag = null;
            Id = null;
        }

        /// <summary>
        /// GTransportStreams
        /// </summary>
        public GTransportStreams(string tag, string id)
        {
            Tag = tag;
            Id = id;
        }

        readonly string Tag;
        readonly string Id;

        private GTransportStreams(string tag, string id, IEnumerable<GTransportStream> streams)
            : this(tag, id)
        {
            AddRange(streams);
        }

        /// <summary>
        /// Prepare files for transfer via AIB
        /// </summary>
        public static GTransportStreams Create(string tag, string id, IEnumerable<GTransportStream> streams) =>
            new GTransportStreams(tag, id, streams ?? Enumerable.Empty<GTransportStream>());

        /// <summary>
        /// Prepare files for transfer via AIB
        /// </summary>
        public static GTransportStreams Create(string tag, string id, params GTransportStream[] streams) =>
            new GTransportStreams(tag, id, streams ?? Enumerable.Empty<GTransportStream>());

        /// <summary>
        /// EnsureWriteableStreamByName
        /// </summary>
        /// <param name="shortName"></param>
        /// <returns></returns>
        GTransportStream EnsureWriteableStreamByName(string shortName)
        {
            GTransportStream stream;
            if ((stream = Find(s => s.ShortName == shortName)) == null)
            {
                stream = GTransportStream.OpenWrite(
                    path: GTransportStream.GenerateStreamPath(
                        tag: Tag,
                        n: Count,
                        id: Id,
                        isFile: false
                    ),
                    shortName: shortName
                );
                Add(stream);
            }

            return stream;
        }

        /// <summary>
        /// Prepare files for transfer via AIB
        /// </summary>
        public static GTransportStreams Create(
            IEnumerable<string> fileNames,
            bool deleteOnClose
        ) =>
            new GTransportStreams(tag: null, id: null, 
                fileNames
                .Select(fileName => GTransportStream.OpenRead(
                    fileName,
                    deleteOnClose
                ))
            );

        /// <summary>
        /// Dispose
        /// </summary>
        public void Dispose()
        {
            foreach (var stream in this)
            {
                stream.Dispose();
            }
        }

        /// <summary>
        /// Add streams to multipart content as StreamContent
        /// </summary>
        /// <param name="mpc"></param>
        /// <returns></returns>
        public MultipartContent FillMultipartContent(MultipartContent mpc)
        {
            for (int i = 0; i < Count; i++)
            {
                mpc.Add(this[i].AsHttpContent(i));
            }

            return mpc;
        }

        /// <summary>
        /// Finish write operation (for http stream parser)
        /// </summary>
        /// <returns>array of path to temp files</returns>
        public string[] Release()
        {
            return this.Select((s, n) =>
                s.ReadOnly ? s.ReleaseRead(Tag, n, Id) : s.ReleaseWrite()
            ).ToArray();
        }


        /// <summary>
        /// Prepare collection to write
        /// </summary>
        public static GTransportStreams BeginWrite(
            string tag,
            string id
        ) => new GTransportStreams(tag, id);

        /// <summary>
        /// WriteBuffer
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="buffer"></param>
        /// <param name="count"></param>
        /// <exception cref="NotImplementedException"></exception>
        public void WriteBuffer(string fileName, byte[] buffer, int count) =>
            EnsureWriteableStreamByName(fileName)
                .GetStream()
                .Write(buffer, 0, count);
    }
}

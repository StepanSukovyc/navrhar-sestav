//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GTransportStream.cs                                 </Name>
//    <Description> GBlobFile                                                   </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-08-08                                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;

namespace Gordic.General
{
    /// <summary>
    /// GTransportStream
    /// </summary>
    [Serializable]
    public sealed class GTransportStream : IDisposable
    {
        static readonly IGLogger LOG = GLogManager.CurrentClassLogger();

        /// <summary>
        /// GBlobFile
        /// </summary>
        /// <param name="fullName"></param>
        /// <param name="shortName"></param>
        /// <param name="readOnly"></param>
        /// <param name="deleteOnClose"></param>
        public GTransportStream(
            string fullName,
            string shortName,
            bool readOnly,
            bool deleteOnClose)
        {
            FullName = fullName;
            ShortName = shortName;
            ReadOnly = readOnly;
            DeleteOnClose = deleteOnClose;
        }

        [NonSerialized]
        Stream _Stream;

        const int BufferSize = 32 * 1024;

        /// <summary>
        /// GetStream
        /// </summary>
        public Stream GetStream() =>
            _Stream ??
                (_Stream = ReadOnly
                    ? File.OpenRead(FullName)
                    : File.Create(
                        FullName,
                        BufferSize,
                        FileOptions.SequentialScan
                    )
            );

        sealed class ApgStream : FileStream
        {
            readonly static IGLogger LOG = GLogManager.CurrentClassLogger();

            public ApgStream(string path) : base(path, FileMode.Open)
            {
            }

            protected override void Dispose(bool disposing)
            {
                base.Dispose(disposing);
                File.Delete(Name);
                LOG.Info($"GTransportStream.ApgStream[R]: [{Name}] deleted");
            }
        }

        /// <summary>
        /// GetStream
        /// </summary>
        public Stream GetStreamAPG() => new ApgStream(FullName);

        /// <summary>
        /// FullName
        /// </summary>
        [NonSerialized]
        public readonly string FullName;

        /// <summary>
        /// DeleteOnClose
        /// </summary>
        [NonSerialized]
        private readonly bool DeleteOnClose;

        /// <summary>
        /// ShortName
        /// </summary>
        [NonSerialized]
        public readonly string ShortName;

        /// <summary>
        /// ReadOnly
        /// </summary>
        public readonly bool ReadOnly;

        /// <summary>
        /// Length
        /// </summary>
        public long Length
        {
            get;
            private set;
        }

        /// <summary>
        /// FromStream
        /// </summary>
        /// <param name="stream"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public static GTransportStream OpenRead(Stream stream) =>
            new GTransportStream(
                fullName: null,
                shortName: null,
                readOnly: true,
                deleteOnClose: false
            )
            {
                _Stream = stream
            };

        /// <summary>
        /// OpenRead
        /// </summary>
        /// <param name="filePath"></param>
        /// <param name="deleteOnClose"></param>
        /// <returns></returns>
        public static GTransportStream OpenRead(string filePath, bool deleteOnClose)
        {
            if (filePath.Contains("@"))
            {
                var split = filePath.Split(new char[] { '@' });
                filePath = split[1];
                deleteOnClose = bool.Parse(split[0]);
            }

            var fi = new FileInfo(filePath);
            if (!fi.Exists)
            {
                throw new FileNotFoundException($"File not exists: {filePath}");
            }


            if(IsTempFile(fi))
            {
                deleteOnClose = true;
            }

            return new GTransportStream(
                fullName: fi.FullName,
                shortName: null,
                readOnly: true,
                deleteOnClose: deleteOnClose
            )
            {
                Length = fi.Length
            };
        }

        static bool IsTempFile(FileInfo fi) => fi.FullName.StartsWith(TempRootDir, StringComparison.OrdinalIgnoreCase);

        /// <summary>
        /// OpenWrite
        /// </summary>
        /// <param name="path"></param>
        /// <param name="shortName"></param>
        /// <returns></returns>
        public static GTransportStream OpenWrite(
            string path,
            string shortName
        ) =>
            new GTransportStream(
                fullName: path,
                shortName: shortName,
                readOnly: false,
                deleteOnClose: false
            );

        /// <summary>
        /// Dispose
        /// </summary>
        public void Dispose()
        {
            _Stream?.Close();
            LOG.Info($"GTransportStream[{(ReadOnly ? "R" : "W")}]: [{FullName}] closed");

            if (FullName != null && DeleteOnClose)
            {
                File.Delete(FullName);
                LOG.Info($"GTransportStream[{(ReadOnly ? "R" : "W")}]: [{FullName}] deleted");
            }
        }

        /// <summary>
        /// AsHttpContent
        /// </summary>
        internal HttpContent AsHttpContent(int n)
        {
            var stream = GetStream();
            var content = new StreamContent(stream);

            content.Headers.ContentLength = stream.Length;
            content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            content.Headers.ContentEncoding.Add("binary");
            content.Headers.ContentDisposition = new ContentDispositionHeaderValue("GBlobFile")
            {
                FileName = $"gstream_{n}"
            };
            return content;
        }

        internal string ReleaseRead(string tag, int n, string id)
        {
            if (!ReadOnly)
            {
                throw new Exception("Cannot release read only stream");
            }

            if (FullName != null)
            {
                return $"{DeleteOnClose}@{FullName}";
            }

            var fullName = GenerateStreamPath(
                tag,
                n,
                id,
                false
            );
            GIOSupport.StreamToFile(
                GetStream(),
                fullName
            );
            return fullName;
        }

        internal string ReleaseWrite()
        {
            if (ReadOnly)
            {
                throw new Exception("Cannot commit write to readonly stream");
            }

            using (var stream = GetStream())
            {
                stream.Flush();
                Length = stream.Length;
            }
            return FullName;
        }

        static string TempRootDir => GTempFiles.GetTempDirectory();

        internal static string GenerateStreamPath(string tag, int n, string id, bool isFile)
        {
            if (tag == null || id == null) throw new GArgumentNullException(21000101);
            return Path.Combine(
                TempRootDir,
                $"{tag}_{n}_{id}.{(isFile ? "F" : "S")}.stream"
            );
        }
    }
}

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GZipFile.cs                                  </Name>
//    <Description> podpora pro komprimaci a dekomprimaci metodou ZIP           </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-01-06                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
//using SBArcZip;

namespace Gordic.General {

    /// <summary>podpora pro komprimaci a dekomprimaci metodou ZIP</summary>
    public interface IGZipFile : IGObject, IDisposable
    {
        string Name { get; }
        void Save();
        //int Count { get; }
        IEnumerable<IGZipFileEntry> Entries { get; }
        IGZipFileEntry AddFile(string fileName, string directoryPathInArchive);
        IGZipFileEntry AddEntry(string entryName, Stream content);
        IGZipFileEntry UpdateEntry(string entryName, Stream content);
    }
    public interface IGZipFileEntry
    {
        string FileName { get; }
        string Extract(string extractToDirectory);
    }
    public abstract class GZipFileOptions
    {
        protected internal Func<FileInfo, IGZipFile> OpenRead;
        protected internal Func<FileInfo, IGZipFile> OpenUpdate;
        protected internal Func<FileInfo, IGZipFile> CreateNew;

        /// <summary>Stupeň komprese 0-9. null pro default</summary>
        public int? CompressionLevel { get; set; } = null;
    }

    public static class GZipFile
    {
        public static GZipFileOptions DefaultOptions = GZipFile_Ionic.DefaultOptions;

        public static IGZipFile OpenRead(string zipFileName, GZipFileOptions options)
        {
            return OpenRead(new FileInfo(zipFileName), options);
        }
        public static IGZipFile OpenUpdate(string zipFileName, GZipFileOptions options)
        {
            return OpenUpdate(new FileInfo(zipFileName), options);
        }
        public static IGZipFile CreateNew(string zipFileName, GZipFileOptions options)
        {
            return CreateNew(new FileInfo(zipFileName), options);
        }

        public static IGZipFile OpenRead(FileInfo zipFileInfo, GZipFileOptions options)
        {
            return options.OpenRead(zipFileInfo);
        }

        public static IGZipFile OpenUpdate(FileInfo zipFileInfo, GZipFileOptions options)
        {
            return options.OpenUpdate(zipFileInfo);
        }

        public static IGZipFile CreateNew(FileInfo zipFileInfo, GZipFileOptions options)
        {
            return options.CreateNew(zipFileInfo);
        }
    }

#if GZipFile_IpWorks_needs_new_reference
    public class GZipFile_IpWorks : IGZipFile
    {
        private class Options : GZipFileOptions
        {
            public Options()
            {
                OpenRead = GZipFile_IpWorks.OpenExisting;
                OpenUpdate = GZipFile_IpWorks.OpenExisting;
                CreateNew = GZipFile_IpWorks.CreateNew;
            }
            public override string ToString() => "GZipFile_ZIP";
        }
        public static GZipFileOptions DefaultOptions => new Options();

        private readonly nsoftware.IPWorksZip.Zip Zip;
        private GZipFile_IpWorks()
        {
            Zip = new nsoftware.IPWorksZip.Zip();

            const string LicenseKey2024 = "315A4E4A41443153554232303235313032375241315355424156523635313532004556464E565A003030303030303030000058414D5A5338395A35584B550000";
            Zip.RuntimeLicense = LicenseKey2024;

            Zip.CompressionLevel = 2;
            Zip.CompressionMethod = nsoftware.IPWorksZip.ZipCompressionMethods.cmDeflate;

            Zip.RecurseSubdirectories = false;
            Zip.OverwriteFiles = true;

            //Zip.EncryptionAlgorithm = nsoftware.IPWorksZip.ZipEncryptionAlgorithms.eaAESMaximum;
            //Zip.Password = "";
            //Zip.Config("AESGenerateUniqueKeys=false");

            //Zip.Config("WriteToProgressEvent=true");
            //Zip.Config("CloseArchiveAfterCompress=false");
            //Zip.Config("CloseStreamAfterCompress=false");
        }
        public void Dispose()
        {
            Zip.Dispose();
            //GC.SuppressFinalize(this);
        }

        public string Name => Zip.ArchiveFile;

        public static GZipFile_IpWorks OpenExisting(FileInfo zipFileInfo)
        {
            var z = new GZipFile_IpWorks();
            z.Zip.ArchiveFile = zipFileInfo.FullName;
            z.Zip.Scan();
            return z;
        }
        public static GZipFile_IpWorks CreateNew(FileInfo zipFileInfo)
        {
            var z = new GZipFile_IpWorks();
            z.Zip.ArchiveFile = zipFileInfo.FullName;
            return z;
        }

        /// <summary>
        /// Saves the Zip archive to a file, specified by the Name property of the ZipFile.
        /// </summary>
        public void Save()
        {
            Zip.Config("CloseArchiveAfterCompress=true");
            Zip.Files.Clear();
            Zip.Compress();
        }
        /// <summary>
        /// Save the file to a new file
        /// </summary>
        public void Save(string zipFileName)
        {
            Zip.ArchiveFile = zipFileName;
            Save();
        }

        public class Entry : IGZipFileEntry
        {
            private readonly nsoftware.IPWorksZip.Zip _zip;
            private readonly nsoftware.IPWorksZip.ZIPFile _entry;

            internal Entry(nsoftware.IPWorksZip.Zip zip, nsoftware.IPWorksZip.ZIPFile entry)
            {
                _zip = zip;
                _entry = entry;
            }
            /// <summary>
            /// The name of the file contained in the Entry
            /// </summary>
            public string FileName => _entry.CompressedName;

            /// <summary>
            /// Extract the entry to the filesystem, starting at the specified base directory.
            /// </summary>
            public string Extract(string extractToDirectory)
            {
                var fn = Path.Combine(extractToDirectory, Path.GetFileName(_entry.CompressedName));
                using (_entry.OutputStream = File.Create(fn))
                {
                    _zip.Extract(_entry.CompressedName);
                }
                return fn;
            }

        }
        /// <summary>
        /// Returns the readonly collection of entries in the Zip archive.
        /// </summary>
        public IEnumerable<IGZipFileEntry> Entries => Zip.Files.Where(e => e.CompressedName.EndsWith("/", StringComparison.Ordinal) == false).Select(e => new Entry(Zip, e));

        /// <summary>
        /// Adds a File to a Zip file archive
        /// </summary>
        public IGZipFileEntry AddFile(string fileName, string directoryPathInArchive)
        {
            var e = new nsoftware.IPWorksZip.ZIPFile(Path.Combine(directoryPathInArchive, Path.GetFileName(fileName)), fileName);
            Zip.Files.Clear();
            Zip.Files.Add(e);
            Zip.Compress();
            return new Entry(Zip, e);
        }

        /// <summary>
        /// Create an entry in the ZipFile using the given Stream as input
        /// </summary>
        public IGZipFileEntry AddEntry(string entryName, Stream stream)
        {
            var e = new nsoftware.IPWorksZip.ZIPFile(entryName, stream);
            Zip.Files.Clear();
            Zip.Files.Add(e);
            Zip.Compress();
            return new Entry(Zip, e);
        }
        /// <summary>
        /// Updates the given entry in the ZipFile, using the given stream as input
        /// </summary>
        public IGZipFileEntry UpdateEntry(string entryName, Stream content)
        {
            //throw new NotSupportedException();
            var e = Zip.Files.FirstOrDefault(f => f.CompressedName == entryName);
            //if (e == null)
            //{
            //    throw new FileNotFoundException($"Entry '{entryName}' not found in the zip archive.");
            //}
            e.InputStream = content;
            Zip.Update(entryName);
            return new Entry(Zip, e);
        }
    } // end class
#endif

    //public class GZipFile_SBB : IGZipFile
    //{
    //    private class Options : GZipFileOptions
    //    {
    //        public Options()
    //        {
    //            OpenRead = zipFileInfo => new GZipFile_SBB(zipFileInfo, true).SetOpts(this);
    //            OpenUpdate = zipFileInfo => new GZipFile_SBB(zipFileInfo, false, true).SetOpts(this);
    //            CreateNew = zipFileInfo => new GZipFile_SBB(zipFileInfo, false).SetOpts(this);
    //        }
    //        public string Password = null;
    //        public bool BasicEncrypt = false;
    //        public bool WinZipAes256Encrypt = false;
    //        public override string ToString() => "SBB_ZIP";
    //    }
    //    public static GZipFileOptions DefaultOptions => new Options();
    //    public static GZipFileOptions BasicEncrypted(string password) => new Options()
    //    {
    //        BasicEncrypt = true,
    //        Password = password 
    //    };
    //    public static GZipFileOptions WinZipAes256Encrypted(string password) => new Options()
    //    {
    //        WinZipAes256Encrypt = true,
    //        Password = password
    //    };
        

    //    //private readonly nsoftware.SecureBlackbox.ArchiveWriter Zip;
    //    private readonly TElZipReader Zip;
    //    private TElZipWriter Zw;
    //    private FileInfo File;
    //    private FileInfo FileSaving;
    //    public GZipFile_SBB(FileInfo file, bool readOnly, bool update = false)
    //    {
    //        if (readOnly)
    //        {
    //            Zip = new TElZipReader();
    //        }
    //        else
    //        {
    //            Zip = Zw = new TElZipWriter();
    //            //https://cdn.nsoftware.com/help/legacy/sbb/ref_cl_zipwriter_prp_compressionalgorithm.html
    //            Zw.CompressionAlgorithm = 8;//ZIP_COMPRESSION_DEFLATE
    //            //https://cdn.nsoftware.com/help/legacy/sbb/ref_cl_zipwriter_prp_compressionlevel.html
    //            Zw.CompressionLevel = 6; //The values range from 1 (lowest compression) to 9 (highest compression).
    //        }

    //        const string LicenseKey2022 = "53424E48414431535542323032353130323752413153554241565236353135320050485958535600303030303030303000003532374247474858505647450000";
    //        const string LicenseKey2024 = "53424E4A41443153554232303235313032375241315355424156523635313532004D415A4A4E5A003030303030303030000037413641394E5A4D56484D430000";
    //        Zip.RuntimeLicense = LicenseKey2024;
    //        Zip.OnUserActionNeeded += Zip_OnUserActionNeeded;

    //        if (readOnly)
    //            Zip.Open(file.FullName, true);
    //        else
    //        {
    //            if (update)
    //            {
    //                Zip.Open(file.FullName, false);
    //                FileSaving = new FileInfo(Path.ChangeExtension(file.FullName, ".gor.zip"));
    //                Zw.BeginCompression(FileSaving.FullName);
    //            }
    //            else
    //            {
    //                Zw.CreateArchive();
    //                FileSaving = file;
    //                Zw.BeginCompression(FileSaving.FullName);
    //            }
    //        }

    //        File = file;
    //    }

    //    //public delegate void TSBZipUserActionNeededEvent(object Sender, int ForEvent, string Description, TElZipArchiveDirectoryEntry Param, string DestPath, ref int UserAction);

    //    private void Zip_OnUserActionNeeded(object Sender, int ForEvent, string Description, TElZipArchiveDirectoryEntry Param, string DestPath, ref int UserAction)
    //    //private void Zip_OnUserActionNeeded(object Sender, int ForEvent, string Description, TElZipArchiveDirectoryEntry Param, ref int UserAction)
    //    {
    //        switch(ForEvent)
    //        {
    //            case 4100: UserAction = 4097;break;
    //        }
    //    }

    //    public void Dispose()
    //    {
    //        Zip.Dispose();
    //    }

    //    public string Name => File.Name;

    //    private GZipFile_SBB SetOpts(Options options)
    //    {
    //        if (Zw != null)
    //        {
    //            if (options.CompressionLevel.HasValue)
    //                Zw.CompressionLevel = (uint)options.CompressionLevel.Value;
    //        }
    //        if (options.BasicEncrypt)
    //            EncryptBasic(options.Password);
    //        if (options.WinZipAes256Encrypt)
    //            EncryptWinZipAes256(options.Password);
    //        return this;
    //    }
    //    public void EncryptBasic(string password)
    //    {
    //        Zip.Password = password;
    //        if (Zw != null)
    //        {
    //            Zw.Encrypt = true;
    //        }
    //    }
    //    public void EncryptWinZipAes256(string password)
    //    {
    //        Zip.Password = password;
    //        if (Zw != null)
    //        {
    //            Zw.Encrypt = true;
    //            Zw.WinZipEncryption = true;
    //            Zw.WinZipAesKeySize = 256;
    //        }
    //    }
    //    public void EncryptPKWareStrongEncryption(string password)
    //    {
    //        Zip.Password = password;
    //        if (Zw != null)
    //        {
    //            Zw.Encrypt = true;
    //            Zw.StrongEncryption = true;
    //            Zw.StrongEncryptionInfo.UsePassword = true;
    //            Zw.StrongEncryptionInfo.UseCertificates = false;
    //        }
    //    }

    //    /// <summary>
    //    /// Saves the Zip archive to a file, specified by the Name property of the ZipFile.
    //    /// </summary>
    //    public void Save()
    //    {
    //        //Zw.Compress(File.FullName);
    //        if (FileSaving != null)
    //        {
    //            Zw.EndCompression();
    //            Zip.Close();
    //            if (FileSaving != File) { File.Delete(); FileSaving.MoveTo(File.FullName); }
    //            FileSaving = null;
    //        }
    //    }

    //    /// <summary>
    //    /// Save the file to a new file
    //    /// </summary>
    //    public void Save(string zipFileName)
    //    {
    //        //Zw.Compress(File.FullName);
    //        if (FileSaving != null)
    //        {
    //            Zw.EndCompression();
    //            System.IO.File.Delete(zipFileName);
    //            FileSaving.MoveTo(zipFileName);
    //            FileSaving = null;
    //        }
    //        else 
    //            File.MoveTo(zipFileName);
    //        File = new FileInfo(zipFileName);
    //    }

    //    public class Entry : IGZipFileEntry
    //    {
    //        private readonly TElZipReader Parent;
    //        private readonly TElZipArchiveDirectoryEntry Zip;
    //        internal Entry(TElZipReader parent, TElZipArchiveDirectoryEntry zipEntry)
    //        {
    //            Parent = parent;
    //            Zip = zipEntry;
    //        }
    //        /// <summary>
    //        /// The name of the file contained in the Entry
    //        /// </summary>
    //        public string FileName => Zip.UnparsedPath;

    //        /// <summary>
    //        /// Extract the entry to the filesystem, starting at the specified base directory.
    //        /// </summary>
    //        public string Extract(string extractToDirectory)
    //        {
    //            Parent.Extract(Zip, extractToDirectory);
    //            return Path.Combine(extractToDirectory, Zip.FileName);
    //        }
    //    }
    //    /// <summary>
    //    /// Returns the number of entries in the Zip archive.
    //    /// </summary>
    //    public int Count => Zip.Directory.EntriesCount;
    //    /// <summary>
    //    /// Returns the readonly collection of entries in the Zip archive.
    //    /// </summary>
    //    public IEnumerable<IGZipFileEntry> Entries
    //    {
    //        get
    //        {
    //            var s = new Stack<TElZipArchiveDirectoryEntry>();
    //            s.Push(Zip.Directory);
    //            while (s.Count > 0)
    //            {
    //                var d = s.Pop();
    //                for (int i = 0; i < d.EntriesCount; i++)
    //                {
    //                    var e = d.get_Entries(i);
    //                    if (e.IsDirectory) s.Push(e);
    //                    else yield return new Entry(Zip, e);
    //                }
    //            }
    //        }
    //    }

    //    /// <summary>
    //    /// Adds a File to a Zip file archive
    //    /// </summary>
    //    public IGZipFileEntry AddFile(string fileName, string directoryPathInArchive)
    //    {
    //        var entryName = string.IsNullOrEmpty(directoryPathInArchive)
    //            ? Path.GetFileName(fileName)
    //            : directoryPathInArchive + "/" + Path.GetFileName(fileName);
    //        var e = Zip.Directory.AddUnparsedEntry(entryName);
    //        e.InputPath = fileName;
    //        SetupEntry(e, fileName);
    //        Zw.UpdateCompression();
    //        return new Entry(Zip, e);
    //    }

    //    private void SetupEntry(TElZipArchiveDirectoryEntry e, string fileName)
    //    {
    //        e.IsDirectory = false;
    //        e.FileAttributesCompatibility = 0;
    //        e.Attributes.RawAttributes = 0; //? (byte)((uint)tElVFSEntryInformation.Attributes & 0xFFu);
    //        e.Attributes.Directory = false;
    //        if (fileName != null)
    //            e.Attributes.ModTime = System.IO.File.GetLastWriteTime(fileName).ToUniversalTime();
    //        else
    //            e.Attributes.ModTime = DateTime.UtcNow;  //DateTime.Now;

    //        //CreationTime = System.IO.File.GetCreationTime(path).ToUniversalTime();
    //        //LastAccessTime = System.IO.File.GetLastAccessTime(path).ToUniversalTime();
    //        //ModificationTime = System.IO.File.GetLastWriteTime(path).ToUniversalTime();
    //        //EntryInfo.DateAccessed = LastAccessTime;
    //        //EntryInfo.DateCreated = CreationTime;
    //        //EntryInfo.DateModified = ModificationTime



    //        //je potreba? e.FileSize = (ulong)tElVFSEntryInformation.Size;
    //        //tElZipArchiveDirectoryEntry.FileSize = (ulong)Stream.Length;

    //        if (Zw != null)
    //        {

    //            e.CompressionMethod = Zw.CompressionAlgorithm;
    //            e.CompressionLevel = Zw.CompressionLevel;
    //            e.Encrypted = Zw.Encrypt;
    //            e.StrongEncryption = Zw.StrongEncryption;
    //            e.WinZipEncryption = Zw.WinZipEncryption;
    //            if (Zw.Encrypt && Zw.StrongEncryption)
    //            {
    //                e.StrongEncryptionInfoLoaded = true;
    //                e.StrongEncryptionInfo.Assign(Zw.StrongEncryptionInfo);
    //            }

    //            if (Zw.WinZipEncryption)
    //            {
    //                e.WinZipEncryptionVersion = 2u;
    //                e.WinZipAesKeySize = Zw.WinZipAesKeySize;
    //            }
    //        }
    //    }

    //    /// <summary>
    //    /// Create an entry in the ZipFile using the given Stream as input
    //    /// </summary>
    //    public IGZipFileEntry AddEntry(string entryName, Stream content)
    //    {
    //        var e = Zip.Directory.AddUnparsedEntry(entryName);
    //        e.InputStream = content;
    //        e.FreeInputStream = false;
    //        SetupEntry(e, null);
    //        Zw.UpdateCompression();
    //        return new Entry(Zip, e);
    //    }
    //    /// <summary>
    //    /// Updates the given entry in the ZipFile, using the given stream as input
    //    /// </summary>
    //    public IGZipFileEntry UpdateEntry(string entryName, Stream content)
    //    {
    //        var e = Zip.Directory.EntryWithPath(entryName);
    //        e.Parent.RemoveEntry(e);
    //        e = Zip.Directory.AddUnparsedEntry(entryName);
    //        e.InputStream = content;
    //        e.FreeInputStream = false;
    //        SetupEntry(e, null);
    //        Zw.UpdateCompression();
    //        return new Entry(Zip, e);
    //    }
    //} // end class


    public class GZipFile_IoCompression : IGZipFile
    {
        private class Options : GZipFileOptions
        {
            public Options()
            {
                OpenRead = GZipFile_IoCompression.OpenRead;
                OpenUpdate = GZipFile_IoCompression.OpenUpdate;
                CreateNew = GZipFile_IoCompression.CreateNew;
            }
            public override string ToString() => "IoCompression_ZIP";
        }
        public static GZipFileOptions DefaultOptions => new Options();

        private readonly System.IO.Compression.ZipArchive Zip;
        private FileInfo File;
        private GZipFile_IoCompression(System.IO.Compression.ZipArchive zip, FileInfo file)
        {
            Zip = zip;
            File = file;
        }
        public void Dispose()
        {
            Zip.Dispose();
            //GC.SuppressFinalize(this);
        }

        public string Name => File.Name;

        public static GZipFile_IoCompression OpenRead(FileInfo zipFileInfo)
        {
            return new GZipFile_IoCompression(
                new System.IO.Compression.ZipArchive(System.IO.File.OpenRead(zipFileInfo.FullName), mode: System.IO.Compression.ZipArchiveMode.Read)
                , zipFileInfo);
        }
        public static GZipFile_IoCompression OpenRead(string zipFileName)
        {
            return OpenRead(new FileInfo(zipFileName));
        }

        public static GZipFile_IoCompression OpenUpdate(FileInfo zipFileInfo)
        {
            return new GZipFile_IoCompression(
                new System.IO.Compression.ZipArchive(System.IO.File.Open(zipFileInfo.FullName, FileMode.Open, FileAccess.ReadWrite), mode: System.IO.Compression.ZipArchiveMode.Update)
                , zipFileInfo);
        }
        public static GZipFile_IoCompression OpenUpdate(string zipFileName)
        {
            return OpenUpdate(new FileInfo(zipFileName));
        }


        public static GZipFile_IoCompression CreateNew(FileInfo zipFileInfo)
        {
            return new GZipFile_IoCompression(
                new System.IO.Compression.ZipArchive(System.IO.File.Create(zipFileInfo.FullName), mode: System.IO.Compression.ZipArchiveMode.Create)
                , zipFileInfo);
        }
        public static GZipFile_IoCompression CreateNew(string zipFileName)
        {
            return CreateNew(new FileInfo(zipFileName));
        }

        /// <summary>
        /// Saves the Zip archive to a file, specified by the Name property of the ZipFile.
        /// </summary>
        public void Save()
        {
            Zip.Dispose();
        }
        /// <summary>
        /// Save the file to a new file
        /// </summary>
        public void Save(string zipFileName)
        {
            Zip.Dispose();
            System.IO.File.Move(File.FullName, zipFileName);
            File = new FileInfo(zipFileName);
        }

        public class Entry : IGZipFileEntry
        {
            private readonly System.IO.Compression.ZipArchiveEntry Zip;
            private Entry(System.IO.Compression.ZipArchiveEntry zipEntry)
            {
                Zip = zipEntry;
            }
            public static implicit operator Entry(System.IO.Compression.ZipArchiveEntry zipEntry)
            {
                return new Entry(zipEntry);
            }
            /// <summary>
            /// The name of the file contained in the Entry
            /// </summary>
            public string FileName => Zip.FullName;

            /// <summary>
            /// Extract the entry to the filesystem, starting at the specified base directory.
            /// </summary>
            public string Extract(string extractToDirectory)
            {
                var fn = Path.Combine(extractToDirectory, Zip.Name);
                using (var s = Zip.Open())
                {
                    GIOSupport.StreamToFile(s, fn);
                }
                return fn;
            }

        }
        /// <summary>
        /// Returns the number of entries in the Zip archive.
        /// </summary>
        public int Count => Zip.Entries.Count;
        /// <summary>
        /// Returns the readonly collection of entries in the Zip archive.
        /// </summary>
        public IEnumerable<IGZipFileEntry> Entries => Zip.Entries.Where(e => e.Name.Length > 0).Select(e => (Entry)e);

        /// <summary>
        /// Adds a File to a Zip file archive
        /// </summary>
        public IGZipFileEntry AddFile(string fileName, string directoryPathInArchive)
        {
            var entryName = string.IsNullOrEmpty(directoryPathInArchive)
                ? Path.GetFileName(fileName)
                : directoryPathInArchive + "/" + Path.GetFileName(fileName);
            var e = Zip.CreateEntry(entryName);
            using (var s = e.Open())
            {
                GIOSupport.FileToStream(fileName, s);
            }
            return (Entry)e;
        }

        /// <summary>
        /// Create an entry in the ZipFile using the given Stream as input
        /// </summary>
        public IGZipFileEntry AddEntry(string entryName, Stream content)
        {
            var e = Zip.CreateEntry(entryName);
            using (var s = e.Open())
            {
                GIOSupport.CopyStream(content, s);
            }
            return (Entry)e;
        }
        /// <summary>
        /// Updates the given entry in the ZipFile, using the given stream as input
        /// </summary>
        public IGZipFileEntry UpdateEntry(string entryName, Stream content)
        {
            var e = Zip.GetEntry(entryName);
            using (var s = e.Open())
            {
                GIOSupport.CopyStream(content, s);
                s.SetLength(s.Position);
            }
            return (Entry)e;
        }
    } // end class

    public class GZipFile_Ionic : IGZipFile
    {
        private class Options : GZipFileOptions
        {
            public Options()
            {
                OpenRead = z => GZipFile_Ionic.OpenExisting(z, Encoding);
                OpenUpdate = z => GZipFile_Ionic.OpenExisting(z, Encoding);
                CreateNew = z => GZipFile_Ionic.CreateNew(z, Encoding);
            }
            public override string ToString() => "Ionic_ZIP";

            /// <summary>Character encoding used for compressing and decompressing filenames.</summary>
            public Encoding Encoding { get; set; } = GZip.DefaultEncoding;
        }
        public static GZipFileOptions DefaultOptions => new Options();

        private readonly Ionic.Zip.ZipFile Zip;

        private GZipFile_Ionic(Ionic.Zip.ZipFile zip)
        {
            Zip = zip;
        }
        public void Dispose()
        {
            Zip.Dispose();
            //GC.SuppressFinalize(this);
        }

        public string Name => Zip.Name;

        public static GZipFile_Ionic OpenExisting(FileInfo zipFileInfo, Encoding encoding)
        {
            return new GZipFile_Ionic(Ionic.Zip.ZipFile.Read(zipFileInfo.FullName, new Ionic.Zip.ReadOptions { Encoding = encoding }));
        }
        public static GZipFile_Ionic OpenExisting(string zipFileName, Encoding encoding)
        {
            return new GZipFile_Ionic(Ionic.Zip.ZipFile.Read(zipFileName, new Ionic.Zip.ReadOptions { Encoding = encoding }));
        }

        public static GZipFile_Ionic CreateNew(FileInfo zipFileInfo, Encoding encoding)
        {
            File.Delete(zipFileInfo.FullName);
            return new GZipFile_Ionic(new Ionic.Zip.ZipFile(zipFileInfo.FullName, encoding));
        }
        public static GZipFile_Ionic CreateNew(string zipFileName, Encoding encoding)
        {
            File.Delete(zipFileName);
            return new GZipFile_Ionic(new Ionic.Zip.ZipFile(zipFileName, encoding));
        }

        /// <summary>
        /// Saves the Zip archive to a file, specified by the Name property of the ZipFile.
        /// </summary>
        public void Save()
        {
            Zip.Save();
        }
        /// <summary>
        /// Save the file to a new file
        /// </summary>
        public void Save(string zipFileName)
        {
            Zip.Save(zipFileName);
        }

        public class Entry : IGZipFileEntry
        {
            private readonly Ionic.Zip.ZipEntry Zip;
            private Entry(Ionic.Zip.ZipEntry zipEntry)
            {
                Zip = zipEntry;
            }
            public static implicit operator Entry(Ionic.Zip.ZipEntry zipEntry)
            {
                return new Entry(zipEntry);
            }
            /// <summary>
            /// The name of the file contained in the Entry
            /// </summary>
            public string FileName => Zip.FileName;

            /// <summary>
            /// Extract the entry to the filesystem, starting at the specified base directory.
            /// </summary>
            public string Extract(string extractToDirectory)
            {
                var fn = Path.Combine(extractToDirectory, Path.GetFileName(Zip.FileName));
                using (var fs = File.Create(fn))
                {
                    Zip.Extract(fs);
                }
                return fn;
            }

        }
        /// <summary>
        /// Returns the number of entries in the Zip archive.
        /// </summary>
        public int Count => Zip.Count;
        /// <summary>
        /// Returns the readonly collection of entries in the Zip archive.
        /// </summary>
        public IEnumerable<IGZipFileEntry> Entries => Zip.Entries.Where(e => e.IsDirectory == false).Select(e => (Entry)e);

        /// <summary>
        /// Adds a File to a Zip file archive
        /// </summary>
        public IGZipFileEntry AddFile(string fileName, string directoryPathInArchive)
        {
            return (Entry)Zip.AddFile(fileName, directoryPathInArchive);
        }

        /// <summary>
        /// Create an entry in the ZipFile using the given Stream as input
        /// </summary>
        public IGZipFileEntry AddEntry(string entryName, Stream stream)
        {
            return (Entry)Zip.AddEntry(entryName, stream);
        }
        /// <summary>
        /// Updates the given entry in the ZipFile, using the given stream as input
        /// </summary>
        public IGZipFileEntry UpdateEntry(string entryName, Stream content)
        {
            return (Entry)Zip.UpdateEntry(entryName, content);
        }
    } // end class

} // end namespace

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.GFETempDir.cs                            </Name>
//    <Description>                                                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025                  </Copyright>
//    <Created>     2011-03-25                                                  </Created>
//  </FileHeader>

using System;
using Gordic.General;
using System.IO;
using Gordic.GFE.Parsers.Services;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Třída pro práci s dočasnýmí složkami
    /// </summary>
    public class GFETempDir : IDisposable
    {
        #region IDisposable
        /// <summary>
        /// uvolnění objektu
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikátor uvolnění</param>
        void Dispose(bool disposing)
        {
            if (disposing)
            {
                TemporaryService.UnregisterDirectory(path);
                path = null;
            }
        }

        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        ~GFETempDir() { Dispose(false); }
        #endregion

        string path;
        /// <summary>
        /// cesta k dočasné složce
        /// </summary>
        public string Path => path;

        readonly String error;
        /// <summary>
        /// Chyba vytvoření dočasné složky projektu/řešení
        /// </summary>
        public String Error => error;
        /// <summary>
        /// Vytvoření a registrace dočasné složky
        /// </summary>
        public GFETempDir()
        {
            path = GTempFiles.CreateTempDirectory(TemporaryService.TempDirectory);
            TemporaryService.RegisterDirectory(path);
        }

        /// <summary>
        /// Vytvoření dočasné složky
        /// </summary>
        /// <param name="zipname"></param>
        public GFETempDir(string zipname)
            : this()
        {
            if (Directory.Exists(zipname))
                path = zipname;
            else if (FileUtility.TestFileExists(zipname))
                try
                {
                    if (File.Exists(zipname))
                    {
                        FileInfo info = new FileInfo(zipname);
                        if (info.Extension == ".doc")
                            path = System.IO.Path.GetDirectoryName(zipname);
                        else
                            GZip.Unzip(zipname, path);
                    }
                }
                catch (Exception ex)
                {
                    LoggingService.Error("ERROR:", ex);
                    // tato chyba porušuje konzistenci souborù a zpùsobí nenaètení projektu
                    error = ex.Message;
                }
        }

        /// <summary>
        /// konstruktor třídy dle archivovaného obsahu
        /// </summary>
        /// <param name="zip">obsah archivu</param>
        public GFETempDir(byte[] zip)
            : this()
        {
            string l_zipname = GTempFiles.CreateTempFile(path, ".zip");
            try
            {
                using (FileStream fs = System.IO.File.Create(l_zipname))
                    fs.Write(zip, 0, zip.Length);
                GZip.Unzip(l_zipname, path);
            }
            finally { GTempFiles.DeleteTempFile(l_zipname, true); } // end finally
        }

        /// <summary>
        /// Zavření dočasné složky
        /// </summary>
        public void Close() { Dispose(); }

        /// <summary>
        /// získání seznamu souborů dané složky
        /// </summary>
        /// <returns></returns>
        public FileInfo[] GetFiles()
        {
            try
            {
                if (!string.IsNullOrEmpty(Path))
                    return (new DirectoryInfo(Path)).GetFiles();
            }
            catch { }

            return null;
        }
    }
}

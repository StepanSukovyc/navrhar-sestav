//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GTempFile.cs                                 </Name>
//    <Description> podpora pro práci s doèasnými soubory                       </Description>
//    <Author>      Martin Aliger, Jan Kuttich                                  </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                          </Copyright>
//    <Created>     2007-01-26                                                  </Created>
//  </FileHeader>

using System;
using System.IO;

namespace Gordic.General {

    /// <summary>podpora pro práci s doèasnými soubory</summary>
    public class GTempFile : IDisposable, IGObject {

        #region soukromé konstanty

        /// <summary>název aktuální tøídy</summary>
        private const string m_csClassName = "GTempFile";

        #endregion

        #region soukromé èleny

        /// <summary>plná cesta k doèasnému souboru</summary>
        private readonly string m_sPath = String.Empty;

        /// <summary>pøíznak zrušení souboru</summary>
        private bool m_bDisposed = false;

        /// <summary>pøíznak registrace souboru</summary>
        private readonly bool m_bRegistered = false;

        #endregion

        #region vlastnosti

        /// <summary>plná cesta k doèasnému souboru</summary>
        public string Path {
            get { return m_sPath; }
        } // end property

        /// <summary>název doèasného souboru</summary>
        public string Name {
            get { return System.IO.Path.GetFileName(m_sPath); }
        } // end property

        /// <summary>pøíznak registrace souboru</summary>
        public bool Registered {
            get { return m_bRegistered; }
        } // end property

        #endregion

        #region konstruktory

        /// <summary>veøejný konstruktor</summary>
        public GTempFile() : this(false) { }

        /// <summary>veøejný konstruktor</summary>
        /// <param name="path">cesta pro založení doèasného souboru</param>
        public GTempFile(string path) : this(path,false) { }

        /// <summary>veøejný konstruktor</summary>
        /// <param name="path">cesta pro založení doèasného souboru</param>
        /// <param name="extension">pøípona doèasného souboru</param>
        public GTempFile(string path,string extension) : this(path,extension,false) { }

        /// <summary>veøejný konstruktor</summary>
        /// <param name="path">cesta pro založení doèasného souboru</param>
        /// <param name="namePrefix">pøedpona názvu doèasného souboru</param>
        /// <param name="extension">pøípona doèasného souboru</param>
        public GTempFile(string path,string namePrefix,string extension) : this(path,namePrefix,extension,false) { }

        /// <summary>veøejný konstruktor</summary>
        /// <param name="registered">pøíznak registrace souboru pro možnost jeho pozdìjšího zrušení</param>
        public GTempFile(bool registered) {
            m_sPath = registered ? GTempFiles.CreateRegisteredTempFile() : GTempFiles.CreateTempFile();
            m_bRegistered = registered;
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="path">cesta pro založení doèasného souboru</param>
        /// <param name="registered">pøíznak registrace souboru pro možnost jeho pozdìjšího zrušení</param>
        public GTempFile(string path,bool registered) {
            m_sPath = registered ? GTempFiles.CreateRegisteredTempFile(path) : GTempFiles.CreateTempFile(path);
            m_bRegistered = registered;
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="path">cesta pro založení doèasného souboru</param>
        /// <param name="extension">pøípona doèasného souboru</param>
        /// <param name="registered">pøíznak registrace souboru pro možnost jeho pozdìjšího zrušení</param>
        public GTempFile(string path,string extension,bool registered) {
            m_sPath = registered ? GTempFiles.CreateRegisteredTempFile(path,extension) : GTempFiles.CreateTempFile(path,extension);
            m_bRegistered = registered;
        } // end method

        /// <summary>veøejný konstruktor</summary>
        /// <param name="path">cesta pro založení doèasného souboru</param>
        /// <param name="namePrefix">pøedpona názvu doèasného souboru</param>
        /// <param name="extension">pøípona doèasného souboru</param>
        /// <param name="registered">pøíznak registrace souboru pro možnost jeho pozdìjšího zrušení</param>
        public GTempFile(string path,string namePrefix,string extension,bool registered) {
            m_sPath = registered ? GTempFiles.CreateRegisteredTempFile(path,namePrefix,extension) : GTempFiles.CreateTempFile(path,namePrefix,extension);
            m_bRegistered = registered;
        } // end method

        /// <summary>destruktor</summary>
        ~GTempFile() {
            Dispose(false);
        } // end method

        #endregion

        #region chránìné metody

        /// <summary>zrušení souboru</summary>
        /// <param name="disposing">pøíznak pøímého volání metody z kódu aplikace</param>
        protected virtual void Dispose(bool disposing) {
            try {
                if(Registered) GTempFiles.DeleteRegisteredTempFile(Path);
                else GTempFiles.DeleteTempFile(Path);
            } // end try 
            catch {
                // všechny výjimky jsou ignorovány
            } // end catch
            finally {
                m_bDisposed = true;
            } // end finally
        } // end method

        #endregion

        #region veøejné metody

        /// <summary>otevøení doèasného souboru pro ètení i zápis</summary>
        /// <returns>instance objektu pro ètení a zápis do souboru</returns>
        public FileStream Open() {
            if(m_bDisposed) throw new ObjectDisposedException(m_csClassName);
            return new FileStream(Path,FileMode.Create,FileAccess.ReadWrite,FileShare.ReadWrite);
        } // end method

        /// <summary>otevøení doèasného souboru pouze pro ètení</summary>
        /// <returns>instance objektu pro ètení ze souboru</returns>
        public FileStream OpenRead() {
            if(m_bDisposed) throw new ObjectDisposedException(m_csClassName);
            return new FileStream(Path,FileMode.Open,FileAccess.Read,FileShare.ReadWrite);
        } // end method

        /// <summary>zápis do doèasného souboru</summary>
        /// <param name="inputStream">vstupní proud s daty k zápisu do doèasného souboru</param>
        public void SaveStream(Stream inputStream) {
            byte[] l_abBuffer = new byte[64 * 1024];
            int l_nBytesRead = 0;
            using(FileStream l_oOutputStream = Open()) {
                while(true) {
                    l_nBytesRead = inputStream.Read(l_abBuffer,0,l_abBuffer.Length);
                    if(l_nBytesRead == 0) break;
                    else l_oOutputStream.Write(l_abBuffer,0,l_nBytesRead);
                } // end while
            } // end using
        } // end method

        /// <summary>ètení z doèasného souboru</summary>
        /// <param name="outputStream">výstupní proud pro data naètená z doèasného souboru</param>
        public void ReadStream(Stream outputStream) {
            byte[] l_abBuffer = new byte[64 * 1024];
            int l_nBytesRead = 0;
            using(FileStream l_oInputStream = OpenRead()) {
                while(true) {
                    l_nBytesRead = l_oInputStream.Read(l_abBuffer,0,l_abBuffer.Length);
                    if(l_nBytesRead == 0) break;
                    else outputStream.Write(l_abBuffer,0,l_nBytesRead);
                } // end while
            } // end using
        } // end method
        
        /// <summary>zrušení souboru</summary>
        public void Dispose() {
            Dispose(true);
            GC.SuppressFinalize(this);
        } // end method

        #endregion

    } // end class

} // end namespace

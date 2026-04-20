//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GTempFileStream.cs                           </Name>
//    <Description> FileStream, který při svém uzavření smaže z disku použitý soubor - na Dispose po sobě uklidí</Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-05-10                                                  </Created>
//  </FileHeader>

using Microsoft.Win32.SafeHandles;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Security.AccessControl;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// FileStream, který při svém uzavření smaže z disku použitý soubor - na Dispose po sobě uklidí
    /// </summary>
    public class GTempFileStream : FileStream, IDisposable
    {
        /// <summary>
        /// Vytvoří a otevře zcela nový temp stream na disku - toto má logiku pouze pokud se tento stream použije pro zápis i čtení dat v jednom procesu, protože při vzniku je soubor prázdný a při svém uzavření je smazán z disku.
        /// </summary>
        /// <returns>Vytvořený stream určený nejprve pro zápis a později pro čtení.</returns>
        public static GTempFileStream Create( )
        {
            string tempFile = GTempFiles.CreateTempFile();
            GTempFileStream stream = new GTempFileStream(tempFile, FileMode.Create, FileAccess.ReadWrite, FileShare.Read);
            return stream;
        }

        #region Standardní konstruktory
        
        
        //public GTempFileStream() 
        //{
        //    // zde udělat vygenerování nového jména temp souboru
        //}

        public GTempFileStream(string path, FileMode mode) : base(path, mode)
        {
        }

        //public GTempFileStream(IntPtr handle, FileAccess access) : base(handle, access)
        //{
        //}

        public GTempFileStream(SafeFileHandle handle, FileAccess access) : base(handle, access)
        {
        }

        public GTempFileStream(string path, FileMode mode, FileAccess access) : base(path, mode, access)
        {
        }

        //public GTempFileStream(IntPtr handle, FileAccess access, bool ownsHandle) : base(handle, access, ownsHandle)
        //{
        //}

        public GTempFileStream(SafeFileHandle handle, FileAccess access, int bufferSize) : base(handle, access, bufferSize)
        {
        }

        public GTempFileStream(string path, FileMode mode, FileAccess access, FileShare share) : base(path, mode, access, share)
        {
        }

        //public GTempFileStream(IntPtr handle, FileAccess access, bool ownsHandle, int bufferSize) : base(handle, access, ownsHandle, bufferSize)
        //{
        //}

        public GTempFileStream(SafeFileHandle handle, FileAccess access, int bufferSize, bool isAsync) : base(handle, access, bufferSize, isAsync)
        {
        }

        public GTempFileStream(string path, FileMode mode, FileAccess access, FileShare share, int bufferSize) : base(path, mode, access, share, bufferSize)
        {
        }

        //public GTempFileStream(IntPtr handle, FileAccess access, bool ownsHandle, int bufferSize, bool isAsync) : base(handle, access, ownsHandle, bufferSize, isAsync)
        //{
        //}

        public GTempFileStream(string path, FileMode mode, FileAccess access, FileShare share, int bufferSize, FileOptions options) : base(path, mode, access, share, bufferSize, options)
        {
        }

        public GTempFileStream(string path, FileMode mode, FileAccess access, FileShare share, int bufferSize, bool useAsync) : base(path, mode, access, share, bufferSize, useAsync)
        {
        }
#if NETFRAMEWORK
        public GTempFileStream(string path, FileMode mode, FileSystemRights rights, FileShare share, int bufferSize, FileOptions options) : base(path, mode, rights, share, bufferSize, options)
        {
        }

        public GTempFileStream(string path, FileMode mode, FileSystemRights rights, FileShare share, int bufferSize, FileOptions options, FileSecurity fileSecurity) : base(path, mode, rights, share, bufferSize, options, fileSecurity)
        {
        }
#endif
        #endregion



        #region Dispose
        // To detect redundant calls
        //private bool _disposed = false;


        /// <summary>
        /// 
        /// </summary>
        ~GTempFileStream() => Dispose(false);

        // Následující kód je v rodiči - takže volání Dispose uzavře stream a v rámci uzavření se volá Dispose(true) - takže tam udělám svůj úklid - mazání temp souboru
        //public void Dispose()
        //{
        //    Close();
        //}

        /// <summary>
        /// 
        /// </summary>
        /// <param name="disposing"></param>
        protected override void Dispose(bool disposing)
        {
            // uzavře a uklidí samotný stream
            base.Dispose(disposing);

            // Standardní konstrukci nepoužiji, pokusím se smazat soubor z disku vždy
            //if (_disposed)
            //{
            //    return;
            //}
            //if (disposing)
            //{
            //}

            // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
            // TODO: set large fields to null.

            try
            {
                if (File.Exists(Name))
                    File.Delete(Name);
            }
            catch 
            {
                Debug.WriteLine("GTempFileStream. Dispose(bool disposing) - došlo k chybě při pokusu o smazání souboru: {0}", Name);
            }

            //_disposed = true;
        }
        #endregion
    }
}

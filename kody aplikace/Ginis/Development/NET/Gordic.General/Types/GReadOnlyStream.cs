//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GReadOnlyStream.cs                           </Name>
//    <Description> Stream pro čtení - především pro čtení obsahu souboru       </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-05-10                                                  </Created>
//  </FileHeader>



using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Stream pro čtení - především pro čtení obsahu souboru - pro malé soubory se načte do paměti, pro velké soubory zůstane otevřený FileStream nad zadaným souborem
    /// </summary>
    public class GReadOnlyStream : Stream, IDisposable
    {
        /// <summary>
        /// Interní objekt realizující samotný Stream
        /// </summary>
        private Stream _stream = null;

        /// <summary>
        /// Otevření streamu nad zadaným souborem - pokud bude malý, potom se z něj udělá MemoryStream, pokud bude velký, potom se otevře jako FileStream
        /// </summary>
        /// <param name="fileName">Plná cesta k souboru</param>
        /// <param name="maxSizeForReadToMemoryStream">Maximální velikost pro načtení obsahu souboru do paměti. Výchozí velikost je 1MB</param>
        public GReadOnlyStream( string fileName, int maxSizeForReadToMemoryStream = 1000000)
        {
            FileInfo fileInfo = new FileInfo(fileName);
            if (!fileInfo.Exists)
                throw new FileNotFoundException("Zadaný soubor na disku neexistuje.",fileName);

            if (fileInfo.Length > maxSizeForReadToMemoryStream)
                _stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
            else
            {
                using (FileStream stream = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite ))
                using (BinaryReader reader = new BinaryReader(stream))
                {
                    byte[] buffer = reader.ReadBytes((int)fileInfo.Length); // zde vím, že velikost souboru je menší jak int.MaxValue
                    _stream = new MemoryStream(buffer);
                }
            }
        }

        /// <summary>
        /// Vytvoří stream nad byte[]
        /// </summary>
        /// <param name="buffer"></param>
        public GReadOnlyStream(byte[] buffer)
        {
            _stream = new MemoryStream(buffer);
        }

        /// <summary>
        /// Konstruktor s převzetím již existujícího stream-u
        /// </summary>
        /// <param name="stream"></param>
        public GReadOnlyStream(Stream stream)
        {
            _stream = stream;
        }

        /// <summary>
        /// Konstruktor s převzetím již existujícího stream-u a nastavení pozice
        /// </summary>
        /// <param name="stream"></param>
        /// <param name="position"></param>
        public GReadOnlyStream(Stream stream, long position)
        {
            _stream = stream;
            Position = position;
        }


        #region Implementace povinných rozhraní Stream
        public override bool CanRead => _stream.CanRead;

        public override bool CanSeek => _stream.CanSeek;

        public override bool CanWrite => false;

        public override long Length => _stream.Length;

        public override long Position { get => _stream.Position; set => _stream.Position = value; }

        public override void Close()
        { 
            _stream.Close();
        }

        public override void Flush()
        {
            _stream.Flush();
        }

        public override int Read(byte[] buffer, int offset, int count)
        {
            return _stream.Read(buffer, offset,count);
        }

        public override long Seek(long offset, SeekOrigin origin)
        {
            return _stream.Seek(offset, origin);
        }

        public override void SetLength(long value)
        {
            throw new NotSupportedException();
        }

        public override void Write(byte[] buffer, int offset, int count)
        {
           throw new NotSupportedException();
        }
        #endregion


        #region Dispose
        // To detect redundant calls
        private bool _disposed = false;

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

            // Standardní konstrukci napoužiji, pokusím se smazat soubor z disku vždy
            if (_disposed)
            {
                return;
            }
            if (disposing)
            {
                if(_stream != null )
                    _stream = null;
            }

            // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
            // TODO: set large fields to null.

            _disposed = true;
        }
        #endregion
    }
}


/*
 using System.IO;
using System.Security.Cryptography;

// Copyright 2018 Steve Streeting
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

/// <summary>
/// Passthrough stream which calculates a hash on all the bytes read or written.
/// This is a useful alternative to CryptoStream if you don't want the data to be
/// encrypted, but still want to calculate a hash on the data in a transparent way.
/// </summary>
public class HashStream : Stream {

    protected Stream target;
    protected HashAlgorithm hash;

    /// <summary>
    /// Standard constructor
    /// </summary>
    /// <param name="targetStream">The stream to pass data to, or read data from</param>
    /// <param name="hashAlgorithm">The hash algorithm to use, e.g. SHA256Managed</param>
    public HashStream(Stream targetStream, HashAlgorithm hashAlgorithm) {
        target = targetStream;
        hash = hashAlgorithm;
    }

    /// <see cref="Stream"/>
    public override bool CanRead {
        get { return target.CanRead; }
    }

    /// <see cref="Stream"/>
    public override bool CanSeek  {
        get { return target.CanSeek; }
    }

    /// <see cref="Stream"/>
    public override bool CanWrite {
        get { return target.CanWrite; }
    }

    /// <see cref="Stream"/>
    public override long Length {
        get { return target.Length; }
    }

    /// <see cref="Stream"/>
    public override long Position {
        get { return target.Position; }
        set { target.Position = value; }
    }

    /// <see cref="Stream"/>
    public override void Flush() {
        target.Flush();
    }

    /// <see cref="Stream"/>
    public override int Read(byte[] buffer, int offset, int count) {
        int ret = target.Read(buffer, offset, count);
        hash.TransformBlock(buffer, offset, ret, buffer, offset);
        return ret;
    }

    /// <see cref="Stream"/>
    public override long Seek(long offset, SeekOrigin origin) {
        return target.Seek(offset, origin);
    }

    /// <see cref="Stream"/>
    public override void SetLength(long value) {
        target.SetLength(value);
    }

    /// <see cref="Stream"/>
    public override void Write(byte[] buffer, int offset, int count) {
        target.Write(buffer, offset, count);
        hash.TransformBlock(buffer, offset, count, buffer, offset);
    }

    /// <summary>
    /// Calculate final hash for the content which has been written or read to
    /// the target stream so far.
    /// </summary>
    /// <param name="passphraseBytes">Additional secret bytes not written to the stream
    /// which should be used to calculate the hash.</param>
    /// <returns>The hash value</returns>
    public byte[] Hash(byte[] passphraseBytes) {
        hash.TransformFinalBlock(passphraseBytes, 0, passphraseBytes.Length);
        return hash.Hash;
    }

    /// <summary>
    /// Calculate final hash for the content which has been written or read to
    /// the target stream so far.
    /// </summary>
    /// <remarks>
    /// Consider using the overloaded method which takes a passphrase if you want
    /// an additional factor other than just the stream data.
    /// </remarks>
    /// <returns>The hash value</returns>
    public byte[] Hash() {
        return Hash(new byte[0]);
    }
} 
 */
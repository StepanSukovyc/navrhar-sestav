//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GHashStream.cs                               </Name>
//    <Description> Passthrough stream which calculates a hash on all the bytes read or written.</Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-05-10                                                  </Created>
//  </FileHeader>


using System;
using System.Diagnostics;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using HashAlgorithm = System.Security.Cryptography.HashAlgorithm;

namespace Gordic.General
{
    /// <summary>
    /// Passthrough stream which calculates a hash on all the bytes read or written.
    /// This is a useful alternative to CryptoStream if you don't want the data to be
    /// encrypted, but still want to calculate a hash on the data in a transparent way.
    /// </summary>
    public class GHash2Stream : Stream
    {

        protected Stream target;
        protected HashAlgorithm hash1;
        protected HashAlgorithm hash2;


        private void CreateNewHashAlgorithm1()
        {
            HashAlgorithm instance = null;
            try
            {
                instance = (HashAlgorithm)Activator.CreateInstance(hash1.GetType());
            }
            catch
            {
                Debug.WriteLine("Nepodařilo se vytvořit novou instanci HASH objektu.");
            }
            if (instance == null)
                throw new InvalidDataException($"Pro objekt typu  {nameof(GHashStream)} lze nastavit pozici pouze na hodnotu 0.");
            else
                hash1 = instance;
        }
        private void CreateNewHashAlgorithm2()
        {
            HashAlgorithm instance = null;
            try
            {
                instance = (HashAlgorithm)Activator.CreateInstance(hash2.GetType());
            }
            catch
            {
                Debug.WriteLine("Nepodařilo se vytvořit novou instanci HASH objektu.");
            }
            if (instance == null)
                throw new InvalidDataException($"Pro objekt typu  {nameof(GHashStream)} lze nastavit pozici pouze na hodnotu 0.");
            else
                hash2 = instance;
        }

        /// <summary>
        /// Převezme původní stream a hash algoritmus.
        /// Pozor! U zadaného stream-u nastaví pozici vždy na 0 !!!!
        /// </summary>
        /// <param name="targetStream">The stream to pass data to, or read data from</param>
        /// <param name="hashAlgorithm1">The hash algorithm to use, e.g. SHA256Managed</param>
        /// <param name="hashAlgorithm2">The hash algorithm to use, e.g. SHA256Managed</param>
        public GHash2Stream(Stream targetStream, HashAlgorithm hashAlgorithm1, HashAlgorithm hashAlgorithm2)
        {
            if( targetStream == null)
                throw new InvalidDataException($"Pro konstruktor typu  {nameof(GHash2Stream)} musí být zadány povinné vstupní parametry. Chyba u {nameof(targetStream)}");
            if (hashAlgorithm1 == null)
                throw new InvalidDataException($"Pro konstruktor typu  {nameof(GHash2Stream)} musí být zadány povinné vstupní parametry. Chyba u {nameof(hashAlgorithm1)}");
            if (hashAlgorithm2 == null)
                throw new InvalidDataException($"Pro konstruktor typu  {nameof(GHash2Stream)} musí být zadány povinné vstupní parametry. Chyba u {nameof(hashAlgorithm2)}");

            target = targetStream;
            hash1 = hashAlgorithm1;
            hash2 = hashAlgorithm2;
            target.Position = 0;
        }

        /// <see cref="Stream"/>
        public override bool CanRead
        {
            get { return target.CanRead; }
        }

        /// <see cref="Stream"/>
        public override bool CanSeek
        {
            get { return target.CanSeek; }
        }

        /// <see cref="Stream"/>
        public override bool CanWrite
        {
            get { return target.CanWrite; }
        }

        /// <see cref="Stream"/>
        public override long Length
        {
            get { return target.Length; }
        }


        /// <summary>
        /// Při výpočtu hash by asi mělo jít nastavit pouze pozici 0 s tím, že se výpočet hash vynuluje?
        /// </summary>
        /// <see cref="Stream"/>
        public override long Position
        {
            get
            { 
                return target.Position; 
            }
            set 
            { 
                if( value != 0 )
                    throw new InvalidDataException($"Pro objekt typu  {nameof(GHashStream)} lze nastavit pozici pouze na hodnotu 0.");
                
                CreateNewHashAlgorithm1();
                CreateNewHashAlgorithm2();

                target.Position = value;
            }
        }

        /// <see cref="Stream"/>
        public override void Flush()
        {
            target.Flush();
        }

        /// <see cref="Stream"/>
        public override int Read(byte[] buffer, int offset, int count)
        {
            int ret = target.Read(buffer, offset, count);
            hash1.TransformBlock(buffer, offset, ret, buffer, offset);
            hash2.TransformBlock(buffer, offset, ret, buffer, offset);
            return ret;
        }

        /// <see cref="Stream"/>
        public override long Seek(long offset, SeekOrigin origin)
        {
            long position = target.Seek(offset, origin);
            if( position != 0 )
                throw new InvalidDataException($"Pro objekt typu  {nameof(GHashStream)} lze nastavit pozici pouze na hodnotu 0.");

            CreateNewHashAlgorithm1();
            CreateNewHashAlgorithm2();

            return position;
        }

        /// <see cref="Stream"/>
        public override void SetLength(long value)
        {
            target.SetLength(value);
        }

        /// <see cref="Stream"/>
        public override void Write(byte[] buffer, int offset, int count)
        {
            target.Write(buffer, offset, count);
            hash1.TransformBlock(buffer, offset, count, buffer, offset);
            hash2.TransformBlock(buffer, offset, count, buffer, offset);
        }

        /// <summary>
        /// Calculate final hash for the content which has been written or read to
        /// the target stream so far.
        /// </summary>
        /// <param name="passphraseBytes">Additional secret bytes not written to the stream
        /// which should be used to calculate the hash.</param>
        /// <returns>The hash value</returns>
        public byte[] Hash1(byte[] passphraseBytes)
        {
            hash1.TransformFinalBlock(passphraseBytes, 0, passphraseBytes.Length);
            return hash1.Hash;
        }

        /// <summary>
        /// Calculate final hash for the content which has been written or read to
        /// the target stream so far.
        /// </summary>
        /// <param name="passphraseBytes">Additional secret bytes not written to the stream
        /// which should be used to calculate the hash.</param>
        /// <returns>The hash value</returns>
        public byte[] Hash2(byte[] passphraseBytes)
        {
            hash2.TransformFinalBlock(passphraseBytes, 0, passphraseBytes.Length);
            return hash2.Hash;
        }

        /// <summary>
        /// Calculate final hash for the content which has been written or read to
        /// the target stream so far.
        /// Pokud není stream načten až do konce, tak ani HASH nebude odpovídat celému obsahu stream-u.
        /// </summary>
        /// <remarks>
        /// Consider using the overloaded method which takes a passphrase if you want
        /// an additional factor other than just the stream data.
        /// </remarks>
        /// <returns>The hash value</returns>
        public byte[] Hash1()
        {
            if (Position != target.Length)
                throw new InvalidDataException($"Pro výpočet HASH se musí stream dočíst až do konce.");
            return Hash1(new byte[0]);
        }

        /// <summary>
        /// Calculate final hash for the content which has been written or read to
        /// the target stream so far.
        /// Pokud není stream načten až do konce, tak ani HASH nebude odpovídat celému obsahu stream-u.
        /// </summary>
        /// <remarks>
        /// Consider using the overloaded method which takes a passphrase if you want
        /// an additional factor other than just the stream data.
        /// </remarks>
        /// <returns>The hash value</returns>
        public byte[] Hash2()
        {
            if (Position != target.Length)
                throw new InvalidDataException($"Pro výpočet HASH se musí stream dočíst až do konce.");
            return Hash2(new byte[0]);
        }

        /// <summary>
        /// Calculate final hash for the content which has been written or read to
        /// the target stream so far.
        /// Pokud není stream načten až do konce, tak ani HASH nebude odpovídat celému obsahu stream-u.
        /// </summary>
        /// <remarks>
        /// Consider using the overloaded method which takes a passphrase if you want
        /// an additional factor other than just the stream data.
        /// </remarks>
        /// <returns>The string hexa hash value</returns>
        public string Hash1Hex()
        {
            return BytesToHex(Hash1());
        }

        /// <summary>
        /// Calculate final hash for the content which has been written or read to
        /// the target stream so far.
        /// Pokud není stream načten až do konce, tak ani HASH nebude odpovídat celému obsahu stream-u.
        /// </summary>
        /// <remarks>
        /// Consider using the overloaded method which takes a passphrase if you want
        /// an additional factor other than just the stream data.
        /// </remarks>
        /// <returns>The string hexa hash value</returns>
        public string Hash2Hex()
        {
            return BytesToHex(Hash2());
        }

        public static string BytesToHex(byte[] Buffer)
        {
            StringBuilder text = new StringBuilder();
            foreach (byte value in Buffer)
                text.AppendFormat("{0:X2}", Convert.ToInt32(value));
            return text.ToString();
        }

    }
}
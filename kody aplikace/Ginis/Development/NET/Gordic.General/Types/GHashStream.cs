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
    public class GHashStream : Stream
    {

        protected Stream target;
        protected HashAlgorithm hash;

        private void CreateNewHashAlgorithm()
        {
            HashAlgorithm instance = null;
            try
            {
                instance = (HashAlgorithm)Activator.CreateInstance(hash.GetType());
            }
            catch
            {
                Debug.WriteLine("Nepodařilo se vytvořit novou instanci HASH objektu.");
            }
            if (instance == null)
                throw new InvalidDataException($"Pro objekt typu  {nameof(GHashStream)} lze nastavit pozici pouze na hodnotu 0.");
            else
                hash = instance;
        }

        /// <summary>
        /// Převezme původní stream a hash algoritmus.
        /// Pozor! U zadaného stream-u nastaví pozici vždy na 0 !!!!
        /// </summary>
        /// <param name="targetStream">The stream to pass data to, or read data from</param>
        /// <param name="hashAlgorithm">The hash algorithm to use, e.g. SHA256Managed</param>
        public GHashStream(Stream targetStream, HashAlgorithm hashAlgorithm)
        {
            if (targetStream == null)
                throw new InvalidDataException($"Pro konstruktor typu  {nameof(GHash2Stream)} musí být zadány povinné vstupní parametry. Chyba u {nameof(targetStream)}");
            if (hashAlgorithm == null)
                throw new InvalidDataException($"Pro konstruktor typu  {nameof(GHash2Stream)} musí být zadány povinné vstupní parametry. Chyba u {nameof(hashAlgorithm)}");

            target = targetStream;
            hash = hashAlgorithm;
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
                
                CreateNewHashAlgorithm();

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
            hash.TransformBlock(buffer, offset, ret, buffer, offset);
            return ret;
        }

        /// <see cref="Stream"/>
        public override long Seek(long offset, SeekOrigin origin)
        {
            long position = target.Seek(offset, origin);
            if( position != 0 )
                throw new InvalidDataException($"Pro objekt typu  {nameof(GHashStream)} lze nastavit pozici pouze na hodnotu 0.");

            CreateNewHashAlgorithm();

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
            hash.TransformBlock(buffer, offset, count, buffer, offset);
        }

        /// <summary>
        /// Calculate final hash for the content which has been written or read to
        /// the target stream so far.
        /// </summary>
        /// <param name="passphraseBytes">Additional secret bytes not written to the stream
        /// which should be used to calculate the hash.</param>
        /// <returns>The hash value</returns>
        public byte[] Hash(byte[] passphraseBytes)
        {
            hash.TransformFinalBlock(passphraseBytes, 0, passphraseBytes.Length);
            return hash.Hash;
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
        public byte[] Hash()
        {
            if (Position != target.Length)
                throw new InvalidDataException($"Pro výpočet HASH se musí stream dočíst až do konce.");
            return Hash(new byte[0]);
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
        public string HashHex()
        {
            return BytesToHex(Hash());
        }

        public static string BytesToHex(byte[] Buffer)
        {
            StringBuilder text = new StringBuilder();
            foreach (byte value in Buffer)
                text.AppendFormat( "{0:X2}", Convert.ToInt32(value));
            return text.ToString();
        }
    }
}
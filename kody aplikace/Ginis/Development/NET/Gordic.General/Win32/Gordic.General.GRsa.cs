//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GRsa.cs                       </Name>
//    <Description> asymetrické kódování a dekódování pomocí RSA </Description>
//    <Author>      Jan Kuttich                                  </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021           </Copyright>
//    <Created>     2019-07-26                                   </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Reflection;
using System.Security;
using System.Security.Cryptography;
using System.Security.Permissions;
using System.Text;

namespace Gordic.General {

    /// <summary>asymetrické kódování a dekódování pomocí RSA</summary>
    [
    StrongNameIdentityPermission(
        SecurityAction.Demand,
        PublicKey = "0x0024000004800000940000000602000000240000525341310004000001000100B1C17D23E70B92" +
                    "E4075E36FD307F011D116287FB414A5D231AD6AC9355602AC0ACAC3EF2005FE462C0366176C1CDBE" +
                    "C8A2E4EB21B49331894F2B682F52B5AAFEB1178B7826E4E51551D193AF629656EC385F8170EFB359" +
                    "DA1B3EFBB114660C12DB2309FA6E711225312E35E220BF401010942A4558ABBBD01CB5824641BCFAF0"
        )
    ]
    [SecuritySafeCritical]
    public class GRsa : IGObject {

        #region vlastnosti

        /// <summary>podpora pro šifrování a dešifrování</summary>
        private RSACryptoServiceProvider Rsa { get; }

        /// <summary>veřejný klíč ve formátu PEM</summary>
        public string PemKey { get; }

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get { return typeof(GRsa).Assembly; }
        } // end property

        #endregion

        #region konstruktor a destruktor

        /// <summary>konstruktor</summary>
        public GRsa() {
            Rsa = new RSACryptoServiceProvider(2048);
            PemKey = GetPemKey();
        } // end method

        /// <summary>destruktor</summary>
        ~GRsa() {
            try {
                if(Rsa != null) {
                    Rsa.PersistKeyInCsp = false;
                    Rsa.Clear();
                } // end if
            } // end try
            catch {
                // všechny výjimky jsou ignorovány
            } // end catch
        } // end method

        #endregion

        #region veřejné metody

        /// <summary>zakódování textu</summary>
        /// <param name="input">vstup</param>
        /// <returns>výstup</returns>
        public string Encrypt(string input) {
            try {
                if(String.IsNullOrEmpty(input)) return input;
                else {
                    byte[] l_abyOutput = Rsa.Encrypt(Encoding.UTF8.GetBytes(input),false);
                    return Convert.ToBase64String(l_abyOutput);
                } // end if
            } // end try
            catch(Exception e) {
                throw new GException(23200582,ThisAssembly,e); // selhal pokus o zakódování textu
            } // end catch
        } // end method

        /// <summary>dekódování textu</summary>
        /// <param name="input">vstup</param>
        /// <returns>výstup</returns>
        public string Decrypt(string input) {
            try {
                if(String.IsNullOrWhiteSpace(input)) return input;
                else {
                    byte[] l_abyOutput = Rsa.Decrypt(Convert.FromBase64String(input.Trim()),false);
                    return Encoding.UTF8.GetString(l_abyOutput,0,l_abyOutput.Length);
                } // end if
            } // end try
            catch(Exception e) {
                throw new GException(23200583,ThisAssembly,e); // selhal pokus o dekódování textu
            } // end catch
        } // end method

        /// <summary>pokus o dekódování textu s ošetřením případného neúspěchu</summary>
        /// <param name="input">vstup</param>
        /// <param name="output">v případě úspěchu dekódovaná hodnota, jinak hodnota odpovídající vstupu</param>
        /// <returns>příznak úspěšného dekódování</returns>
        public bool TryDecrypt(string input,out string output) {
            try {
                if(String.IsNullOrWhiteSpace(input)) {
                    output = input;
                    return false;
                } else {
                    byte[] l_abyOutput = Rsa.Decrypt(Convert.FromBase64String(input.Trim()), false);
                    output = Encoding.UTF8.GetString(l_abyOutput, 0, l_abyOutput.Length);
                    return true;
                } // end if
            } // end try
            catch {
                output = input;
                return false;
            } // end catch
        } // end method
        
        #endregion

        #region soukromé metody

        /// <summary>získání veřejného klíče ve formátu PEM</summary>
        /// <returns>veřejný klíč ve formátu PEM</returns>
        private string GetPemKey() {
            char[] l_acBase64Key = GetBase64Key();
            using(TextWriter l_oWriter = new StringWriter()) {
                l_oWriter.WriteLine("-----BEGIN PUBLIC KEY-----");
                for(int i = 0; i < l_acBase64Key.Length; i += 64) {
                    l_oWriter.WriteLine(l_acBase64Key,i,Math.Min(64,l_acBase64Key.Length - i));
                } // end for
                l_oWriter.WriteLine("-----END PUBLIC KEY-----");
                return l_oWriter.ToString();
            } // end using
        } // end method

        /// <summary>získání veřejného klíče ve formátu Base64</summary>
        /// <returns>veřejný klíč ve formátu Base64</returns>
        private char[] GetBase64Key() {
            using(MemoryStream l_oStream = new MemoryStream()) {
                BinaryWriter l_oWriter = new BinaryWriter(l_oStream);
                l_oWriter.Write((byte) 0x30);
                WriteRsaParameters(l_oWriter);
                return Convert.ToBase64String(l_oStream.GetBuffer(),0,(int) l_oStream.Length).ToCharArray();
            } // end using
        } // end method

        /// <summary>zápis RSA parametrů</summary>
        /// <param name="writer">objekt pro zápis</param>
        private void WriteRsaParameters(BinaryWriter writer) {
            using(MemoryStream l_oStream = new MemoryStream()) {
                var l_oRsaParametes = Rsa.ExportParameters(false);
                var l_oWriter = new BinaryWriter(l_oStream);
                WriteBigEndianInteger(l_oWriter,new byte[] { 0x00 });
                WriteBigEndianInteger(l_oWriter,l_oRsaParametes.Modulus);
                WriteBigEndianInteger(l_oWriter,l_oRsaParametes.Exponent);
                WriteBigEndianInteger(l_oWriter,l_oRsaParametes.Exponent);
                WriteBigEndianInteger(l_oWriter,l_oRsaParametes.Exponent);
                WriteBigEndianInteger(l_oWriter,l_oRsaParametes.Exponent);
                WriteBigEndianInteger(l_oWriter,l_oRsaParametes.Exponent);
                WriteBigEndianInteger(l_oWriter,l_oRsaParametes.Exponent);
                WriteBigEndianInteger(l_oWriter,l_oRsaParametes.Exponent);
                WriteLength(writer,(int) l_oStream.Length);
                writer.Write(l_oStream.GetBuffer(),0,(int) l_oStream.Length);
            } // end using
        } // end method

        /// <summary>zápis číselné hodnoty v kódování big endian</summary>
        /// <param name="writer">objekt pro zápis</param>
        /// <param name="value">binární hodnota typu integer</param>
        /// <param name="forceUnsigned">příznak unsigned</param>
        private void WriteBigEndianInteger(BinaryWriter writer,byte[] value,bool forceUnsigned = true) {
            var l_nPrefixZeros = 0;
            for(var i = 0; i < value.Length; i++) {
                if(value[i] != 0) break;
                l_nPrefixZeros++;
            } // end for
            writer.Write((byte) 0x02);
            if(value.Length - l_nPrefixZeros == 0) {
                WriteLength(writer,1);
                writer.Write((byte) 0);
            } else {
                if(forceUnsigned && value[l_nPrefixZeros] > 0x7f) {
                    WriteLength(writer,value.Length - l_nPrefixZeros + 1);
                    writer.Write((byte) 0);
                } else {
                    WriteLength(writer,value.Length - l_nPrefixZeros);
                } // end if
                for(var i = l_nPrefixZeros; i < value.Length; i++) {
                    writer.Write(value[i]);
                } // end for
            } // end if
        } // end method

        /// <summary>zápis délky údaje</summary>
        /// <param name="writer">objekt pro zápis</param>
        /// <param name="length">délka</param>
        private static void WriteLength(BinaryWriter writer,int length) {
            if(length < 0) throw new GArgumentOutOfRangeException(23200581,nameof(length));
            if(length < 0x80) writer.Write((byte) length);
            else {
                int l_nTemp = length;
                int l_nBytesRequired = 0;
                while(l_nTemp > 0) {
                    l_nTemp >>= 8;
                    l_nBytesRequired++;
                } // end while
                writer.Write((byte) (l_nBytesRequired | 0x80));
                for(var i = l_nBytesRequired - 1; i >= 0; i--) {
                    writer.Write((byte) (length >> (8 * i) & 0xff));
                } // end for
            } // end if
        } // end method

        #endregion

    } // end class

} // end namespace

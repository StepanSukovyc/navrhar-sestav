//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//      <Name>        Gordic.General.GAesGcmSupport.cs   </Name>
//      <Description> podpora šifrování pomocí AES GCM   </Description>
//      <Author>      Jan Kuttich                        </Author>
//      <Copyright>   © GORDIC spol. s r. o. 1993 - 2023 </Copyright>
//      <Created>     2023-07-26                         </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Reflection;
using System.Text;
using Org.BouncyCastle.Crypto.Engines;
using Org.BouncyCastle.Crypto.Modes;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.Security;

namespace Gordic.General {

    /// <summary> metody pro kódování a dekódování textu </summary>
    [System.Security.SecurityCritical]
    public class GAesGcmSupport : IGObject {

        #region soukromé konstanty

        /// <summary>velikost klíèe v bitech</summary>
        private const int m_cnKeySize = 256;

        /// <summary>velikost inicializaèního vektoru v bitech</summary>
        private const int m_cnNonceSize = 128;

        /// <summary>velikost bloku v bitech</summary>
        private const int m_cnBlockSize = 128;

        #endregion

        #region vlastnosti

        /// <summary>velikost klíèe v bytech</summary>
        public static int KeyLength { get { return m_cnKeySize / 8; } }

        /// <summary>velikost inicializaèního vektoru v bytech</summary>
        public static int NonceLength { get { return m_cnNonceSize / 8; } }

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get {return typeof(GAesGcmSupport).Assembly;}
        } // end property

        #endregion

        #region veøejné metody

        /// <summary>zašifrování textu</summary>
        /// <param name="input">vstupní data</param>
        /// <param name="key">klíè</param>
        /// <returns>výstupní data</returns>
        public static byte[] Encrypt(string input,byte[] key) {
            try {
                if((input = input.NotNullTrimmed()) == String.Empty) return new byte[0];
                using(MemoryStream l_oIntput = new MemoryStream(Encoding.UTF8.GetBytes(input))) {
                    using(MemoryStream l_oOutput = new MemoryStream()) {
                        Encrypt(l_oIntput,l_oOutput,key);
                        return l_oOutput.ToArray();
                    } // end using
                } // end using
            } // end try
            catch(Exception e) {
                throw new GException(23200630,ThisAssembly,e); // selhal pokus o zašifrování textu
            } // end catch
        } // end method

        /// <summary>dešifrování textu</summary>
        /// <param name="input">vstupní data</param>
        /// <param name="key">klíè</param>
        /// <returns>výstupní data</returns>
        public static string Decrypt(byte[] input,byte[] key) {
            try {
                if(input == null || input.Length < 1) return String.Empty;
                using(MemoryStream l_oIntput = new MemoryStream(input)) {
                    using(MemoryStream l_oOutput = new MemoryStream()) {
                        Decrypt(l_oIntput,l_oOutput,key);
                        return Encoding.UTF8.GetString(l_oOutput.ToArray());
                    } // end using
                } // end using
            } // end try
            catch(Exception e) {
                throw new GException(23200635,ThisAssembly,e); // selhal pokus o dešifrování textu
            } // end catch
        } // end method

        /// <summary>zašifrování souboru</summary>
        /// <param name="inputPath">vstupní soubor</param>
        /// <param name="outputPath">výstupní soubor</param>
        /// <param name="key">klíè</param>
        public static void Encrypt(string inputPath,string outputPath,byte[] key) {
            try {
                Encrypt(inputPath,outputPath,key,true);
            } // end try
            catch(Exception e) {
                throw new GException(23200596,23200598,ThisAssembly,e); // selhal pokus o zašifrování souboru
            } // end catch
        } // end method

        /// <summary>dešifrování souboru</summary>
        /// <param name="inputPath">vstupní soubor</param>
        /// <param name="outputPath">výstupní soubor</param>
        /// <param name="key">klíè</param>
        public static void Decrypt(string inputPath,string outputPath,byte[] key) {
            try {
                Decrypt(inputPath,outputPath,key,true);
            } // end try
            catch(Exception e) {
                throw new GException(23200597,23200607,ThisAssembly,e); // selhal pokus o dešifrování souboru 
            } // end catch
        } // end method

        #endregion

        #region interní metody

        /// <summary>zašifrování souboru</summary>
        /// <param name="inputPath">vstupní soubor</param>
        /// <param name="outputPath">výstupní soubor</param>
        /// <param name="key">klíè</param>
        /// <param name="checkParams">pøíznak kontroly vstupních parametrù</param>
        internal static void Encrypt(string inputPath,string outputPath,byte[] key,bool checkParams) {
            // kontrola vstupních parametrù
            if(checkParams) {
                if((inputPath = inputPath.NotNullTrimmed()) == String.Empty) throw new GArgumentNullException(23200626,nameof(inputPath));
                if(File.Exists(inputPath = Path.GetFullPath(inputPath)) == false) throw new GException(23200627,23200516,ThisAssembly,inputPath); // nenalezen soubor {0}
                if((outputPath = outputPath.NotNullTrimmed()) == String.Empty) throw new GArgumentNullException(23200628,nameof(outputPath));
                if(Directory.Exists(Path.GetDirectoryName(outputPath = Path.GetFullPath(outputPath))) == false) throw new GException(23200629,23200517,ThisAssembly,Path.GetDirectoryName(outputPath)); // nenalezen adresáø {0}
            } // end if
            // zašifrování
            using(FileStream l_oIntput = File.Open(inputPath,FileMode.Open)) {
                using(FileStream l_oOutput = File.Open(outputPath,FileMode.Create)) {
                    Encrypt(l_oIntput,l_oOutput,key);
                    l_oOutput.Flush();
                } // end using
            } // end using
        } // end method

        /// <summary>dešifrování souboru</summary>
        /// <param name="inputPath">vstupní soubor</param>
        /// <param name="outputPath">výstupní soubor</param>
        /// <param name="key">klíè</param>
        /// <param name="checkParams">pøíznak kontroly vstupních parametrù</param>
        internal static void Decrypt(string inputPath,string outputPath,byte[] key,bool checkParams) {
            // kontrola vstupních parametrù
            if(checkParams) {
                if((inputPath = inputPath.NotNullTrimmed()) == String.Empty) throw new GArgumentNullException(23200631,nameof(inputPath));
                if(File.Exists(inputPath = Path.GetFullPath(inputPath)) == false) throw new GException(23200632,23200516,ThisAssembly,inputPath); // nenalezen soubor {0}
                if((outputPath = outputPath.NotNullTrimmed()) == String.Empty) throw new GArgumentNullException(23200633,nameof(outputPath));
                if(Directory.Exists(Path.GetDirectoryName(outputPath = Path.GetFullPath(outputPath))) == false) throw new GException(23200634,23200517,ThisAssembly,Path.GetDirectoryName(outputPath)); // nenalezen adresáø {0}
            } // end if
            // dešifrování
            using(FileStream l_oIntput = File.Open(inputPath,FileMode.Open)) {
                using(FileStream l_oOutput = File.Open(outputPath,FileMode.Create)) {
                    Decrypt(l_oIntput,l_oOutput,key);
                    l_oOutput.Flush();
                } // end using
            } // end using
        } // end method

        #endregion

        #region soukromé metody

        /// <summary>dešifrování</summary>
        /// <param name="input">vstupní data</param>
        /// <param name="output">výstupní data</param>
        /// <param name="key">klíè</param>
        private static void Encrypt(Stream input,Stream output,byte[] key) {
            if(input == null) throw new GArgumentNullException(23200637,nameof(input));
            if(output == null) throw new GArgumentNullException(23200638,nameof(output));
            if(key == null) throw new GArgumentNullException(23200639,nameof(key));
            if(key.Length != KeyLength) throw new GException(23200595,ThisAssembly); // nesprávná délka klíèe
            if(input.Length > 0) {
                // vytvoøení iniciaèního vektoru
                byte[] l_abyNonce = new byte[NonceLength];
                SecureRandom l_oRandom = new SecureRandom();
                l_oRandom.NextBytes(l_abyNonce,0,l_abyNonce.Length);
                // inicializace
                GcmBlockCipher l_oCipher = new GcmBlockCipher(new AesEngine());
                l_oCipher.Init(true,new AeadParameters(new KeyParameter(key),m_cnBlockSize,l_abyNonce));
                // zašifrování
                byte[] l_abyOutput = new byte[l_oCipher.GetOutputSize((int) input.Length)];
                using(BinaryReader l_oReader = new BinaryReader(input)) {
                    l_oCipher.DoFinal(
                        l_abyOutput,
                        l_oCipher.ProcessBytes(l_oReader.ReadBytes((int) input.Length),0,(int) input.Length,l_abyOutput,0)
                    );
                } // end using
                // uložení výsledku
                output.Write(l_abyNonce,0,l_abyNonce.Length);
                output.Write(l_abyOutput,0,l_abyOutput.Length);
            } // end if
        } // end method

        /// <summary>dešifrování</summary>
        /// <param name="input">vstupní data</param>
        /// <param name="output">výstupní data</param>
        /// <param name="key">klíè</param>
        private static void Decrypt(Stream input,Stream output,byte[] key) {
            if(input == null) throw new GArgumentNullException(23200640,nameof(input));
            if(input.Length > 0 && input.Length <= NonceLength) throw new GException(23200636,ThisAssembly); // vstupní data nelze dešifrovat
            if(output == null) throw new GArgumentNullException(23200641,nameof(output));
            if(key == null) throw new GArgumentNullException(23200642,nameof(key));
            if(key.Length != KeyLength) throw new GException(23200604,23200595,ThisAssembly); // nesprávná délka klíèe
            if(input.Length > 0) {
                using(BinaryReader l_oReader = new BinaryReader(input)) {
                    // naètení inicializaèního vektoru
                    byte[] l_abyNonce = l_oReader.ReadBytes(NonceLength);
                    // inicializace
                    GcmBlockCipher l_oCipher = new GcmBlockCipher(new AesEngine());
                    l_oCipher.Init(false,new AeadParameters(new KeyParameter(key),m_cnBlockSize,l_abyNonce));
                    // dešifrování
                    int l_nInputLength = (int) input.Length - l_abyNonce.Length;
                    int l_nOutputLength = l_oCipher.GetOutputSize(l_nInputLength);
                    byte[] l_abyOutput = new byte[l_nOutputLength];
                    l_oCipher.DoFinal(
                        l_abyOutput,
                        l_oCipher.ProcessBytes(l_oReader.ReadBytes(l_nInputLength),0,l_nInputLength,l_abyOutput,0)
                    );
                    // uložení výsledku
                    output.Write(l_abyOutput,0,l_nOutputLength);
                } // end using
            } // end if
        } // end method

        #endregion

    } // end class

} // end namespace


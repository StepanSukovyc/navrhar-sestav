//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//      <Name>        Gordic.General.GCover.cs                   </Name>
//      <Description> metody pro kódování a dekódování textu     </Description>
//      <Author>      Jan Kuttich                                </Author>
//      <Copyright>   © GORDIC spol. s r. o. 1993 - 2021 </Copyright>
//      <Created>     2003-03-24                                 </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Security.Cryptography;
using System.Security.Permissions;
using System.Reflection;

namespace Gordic.General {

    /// <summary> metody pro kódování a dekódování textu </summary>
    [
        StrongNameIdentityPermission(SecurityAction.Demand,
        PublicKey="0x0024000004800000940000000602000000240000525341310004000001000100B1C17D23E70B92" +
        "E4075E36FD307F011D116287FB414A5D231AD6AC9355602AC0ACAC3EF2005FE462C0366176C1CDBE" +
        "C8A2E4EB21B49331894F2B682F52B5AAFEB1178B7826E4E51551D193AF629656EC385F8170EFB359" +
        "DA1B3EFBB114660C12DB2309FA6E711225312E35E220BF401010942A4558ABBBD01CB5824641BCFAF0")
    ]
    [System.Security.SecurityCritical]
    public class GCover : IGObject {

        #region soukromé konstanty

        /// <summary>pøednastavená velikost pamìti pro kódovaný nebo dekódovaný text</summary>
        private const int m_cnDefaultBufferSize = 1024;

        /// <summary>pøednastavená velikost pamìti pro kódovaný nebo dekódovaný soubor</summary>
        private const int m_cnDefaultFileBufferSize = 1024 * 10;

        /// <summary>pøednastavená metoda pro kódování nebo dekódování textu</summary>
        private const CoverMethod m_ceDefaultCoverMethod = CoverMethod.Rijndael;

        /// <summary>tabulka pro získání klíèe a inicializaèního vektoru ke kódování nebo dekódování textu</summary>
        private static byte[] m_anKey = {
            0xf7, 0xa0, 0x57, 0x76, 0xd7, 0xde, 0x19, 0xe3, 0xb0, 0x80, 0x54, 0xa7, 0x1a, 0x7b, 0x74, 0xf1, 
            0xb4, 0xd6, 0x58, 0x62, 0xe5, 0x8c, 0x5e, 0xf9, 0x8b, 0xe3, 0x0f, 0xf1, 0xc3, 0xfd, 0xe5, 0x53, 
            0xf1, 0x66, 0xaf, 0x66, 0x1e, 0x5c, 0x90, 0x1d, 0x14, 0xb9, 0xf9, 0x3f, 0x52, 0xda, 0xed, 0xb6, 
            0x86, 0xbf, 0xe7, 0xab, 0xc4, 0x05, 0xf3, 0x6b, 0x42, 0x5d, 0xe9, 0xf2, 0xce, 0x26, 0x1f, 0xb1, 
            0x99, 0x00, 0xb5, 0xb2, 0xca, 0x0e, 0xd3, 0x57, 0x46, 0x3a, 0x4d, 0x2b, 0x91, 0x1f, 0xa6, 0xaf, 
            0xf5, 0x57, 0x6b, 0x04, 0x16, 0x39, 0x8e, 0xec, 0x71, 0x44, 0x24, 0xbf, 0x72, 0x9c, 0x4e, 0xec, 
            0x99, 0x48, 0xa4, 0x51, 0x25, 0x3a, 0xeb, 0x77, 0xea, 0x90, 0x64, 0x89, 0xb6, 0xc7, 0xd9, 0x22, 
            0xb5, 0x3a, 0xfc, 0x76, 0xba, 0x1b, 0x9b, 0x5f, 0x71, 0xc7, 0x41, 0x85, 0xe9, 0x13, 0xe4, 0xa9, 
            0xeb, 0x5f, 0x90, 0x48, 0x7a, 0x54, 0x89, 0xba, 0x6b, 0xf2, 0x18, 0x85, 0xd3, 0x05, 0x35, 0xa8, 
            0x6a, 0x01, 0x0a, 0x37, 0x9f, 0xd6, 0x32, 0x7e, 0xac, 0x44, 0xdf, 0x5d, 0xf8, 0x65, 0x8d, 0xd6, 
            0xaa, 0xba, 0x9d, 0x56, 0x36, 0x90, 0xa7, 0x61, 0xaf, 0x42, 0x0b, 0xc7, 0x02, 0x15, 0x8a, 0x6b, 
            0x92, 0x97, 0x1b, 0xe7, 0x09, 0xac, 0x0a, 0x15, 0x2d, 0x12, 0x9b, 0x35, 0x73, 0x2c, 0xc0, 0x05, 
            0x65, 0x41, 0xd9, 0x19, 0x67, 0xdd, 0x71, 0xd9, 0x59, 0xa7, 0x87, 0x5c, 0xca, 0x6a, 0x7c, 0x96, 
            0xb9, 0x74, 0xca, 0x60, 0x4a, 0xa4, 0xcc, 0xfd, 0xb0, 0x87, 0x29, 0x24, 0xf3, 0x72, 0xec, 0x83, 
            0x80, 0x05, 0x62, 0xc0, 0x3b, 0x71, 0x04, 0xb3, 0x26, 0x41, 0x8e, 0x61, 0x25, 0xac, 0x49, 0xc2, 
            0x94, 0x05, 0x7a, 0xfe, 0x61, 0x60, 0xba, 0xbf, 0x73, 0xdb, 0x67, 0xde, 0xb4, 0x4c, 0xe4, 0xe6
        }; // end array

        #endregion

        #region výètové typy

        /// <summary>metoda pro kódování nebo dekódování textu</summary>
        public enum CoverMethod {
            /// <summary>Rijndael</summary>
            Rijndael = 0,
            /// <summary>RC2</summary>
            RC2 = 1,
            /// <summary>DES</summary>
            DES = 2,
            /// <summary>TripleDES</summary>
            TripleDES = 3
        } // end enum
        
        #endregion

        #region vlastnosti

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get {return typeof(GCover).Assembly;}
        } // end property

        #endregion

        #region veøejné statické metody

        /// <summary>zakódování textu</summary>
        /// <param name="input">vstupní text</param>
        /// <returns>zakódovaný text</returns>
        public static string Cover(string input) {
            return Cover(input,m_ceDefaultCoverMethod,m_cnDefaultBufferSize);
        } // end method
        
        /// <summary>dekódování textu</summary>
        /// <param name="input">vstupní text</param>
        /// <returns>dekódovaný text</returns>
        public static string Uncover(string input) {
            return Uncover(input,m_ceDefaultCoverMethod,m_cnDefaultBufferSize);
        } // end method

        /// <summary>zakódování textu</summary>
        /// <param name="input">vstupní text</param>
        /// <param name="coverMethod">metoda použtá pro kódování</param>
        /// <param name="bufferSize">velikost pamìti pro zakódovaný text</param>
        /// <returns>zakódovaný text</returns>
        public static string Cover(string input,CoverMethod coverMethod,int bufferSize) {
            CryptoStream l_oBase64Stream = null;
            CryptoStream l_oCryptoStream = null;
            StreamWriter l_oStreamWriter = null;
            MemoryStream l_oMemoryStream = null;
            byte[] l_anBuffer = null;
            string l_sOutput = String.Empty;
            try {
                if(input!=null && input!=String.Empty) {
                    l_anBuffer = new byte[bufferSize>256 ? bufferSize : 256];
                    l_oMemoryStream = new MemoryStream(l_anBuffer);
                    l_oBase64Stream = new CryptoStream(l_oMemoryStream,new ToBase64Transform(),CryptoStreamMode.Write);
                    l_oCryptoStream = new CryptoStream(l_oBase64Stream,GetProvider(coverMethod).CreateEncryptor(GetKey(coverMethod),GetVector(coverMethod)),CryptoStreamMode.Write);
                    l_oStreamWriter = new StreamWriter(l_oCryptoStream);
                    l_oStreamWriter.Write(input);
                    l_oStreamWriter.Close();
                    l_oCryptoStream.Close();
                    l_oBase64Stream.Close();
                    l_oMemoryStream.Close();
                    l_sOutput = System.Text.Encoding.UTF8.GetString(l_anBuffer);
                    l_sOutput = l_sOutput.Substring(0,l_sOutput.IndexOf('\0'));
                } // end if
            } // end try
            catch(Exception e) {
                throw new GException(23200219,ThisAssembly,e); // selhalo kódování textu
            } // end catch
            return l_sOutput;    
        } // end method

        /// <summary>dekódování textu</summary>
        /// <param name="input">vstupní text</param>
        /// <param name="coverMethod">metoda použtá pro dekódování</param>
        /// <param name="bufferSize">velikost pamìti pro dekódovaný text</param>
        /// <returns>zakódovaný text</returns>
        public static string Uncover(string input,CoverMethod coverMethod,int bufferSize) {
            CryptoStream l_oBase64Stream = null;
            CryptoStream l_oCryptoStream = null;
            MemoryStream l_oMemoryStream = null;
            byte[] l_anBuffer = null;
            string l_sOutput = String.Empty;
            try {
                if(input!=null && input!=String.Empty) {
                    l_anBuffer = new byte[bufferSize>256 ? bufferSize : 256];
                    l_oMemoryStream = new MemoryStream(l_anBuffer);
                    l_oCryptoStream = new CryptoStream(l_oMemoryStream,GetProvider(coverMethod).CreateDecryptor(GetKey(coverMethod),GetVector(coverMethod)),CryptoStreamMode.Write);
                    l_oBase64Stream = new CryptoStream(l_oCryptoStream,new FromBase64Transform(),CryptoStreamMode.Write);
                    l_oBase64Stream.Write(System.Text.Encoding.UTF8.GetBytes(input),0,input.Length);
                    l_oBase64Stream.Close();
                    l_oCryptoStream.Close();
                    l_oMemoryStream.Close();
                    l_sOutput = System.Text.Encoding.UTF8.GetString(l_anBuffer);
                    l_sOutput = l_sOutput.Substring(0,l_sOutput.IndexOf('\0'));
                } // end if
            } // end try
            catch(Exception e) {
                throw new GException(23200220,ThisAssembly,e); // selhalo dekódování textu
            } // end catch
            return l_sOutput;
        } // end method

        /// <summary>zašifrování souboru</summary>
        /// <param name="inputPath">vstupní soubor</param>
        /// <param name="outputPath">výstupní soubor</param>
        /// <param name="key">klíè</param>
        public static void CoverFile(string inputPath,string outputPath,string key) {
            GTempFile l_oTempFile = null;
            try {
                // kontrola vstupních parametrù
                if((inputPath = inputPath.NotNullTrimmed()) == String.Empty) throw new GArgumentNullException(23200590,nameof(inputPath));
                if(File.Exists(inputPath = Path.GetFullPath(inputPath)) == false) throw new GException(23200591,23200516,ThisAssembly,inputPath); // nenalezen soubor {0}
                if((outputPath = outputPath.NotNullTrimmed()) == String.Empty) throw new GArgumentNullException(23200592,nameof(outputPath));
                if(Directory.Exists(Path.GetDirectoryName(outputPath = Path.GetFullPath(outputPath))) == false) throw new GException(23200593,23200517,ThisAssembly,Path.GetDirectoryName(outputPath)); // nenalezen adresáø {0}
                if((key = key.NotNullTrimmed()) == String.Empty) throw new GArgumentNullException(23200594,nameof(key));
                // zašifrování
                l_oTempFile = new GTempFile(Path.GetDirectoryName(outputPath));
                GAesGcmSupport.Encrypt(inputPath,l_oTempFile.Path,GCommon.FromBase64Url(key),false);
                // konverze do Base64URL
                GIOSupport.ConvertFileToBase64Url(l_oTempFile.Path,outputPath,false);
            } // end try
            catch(Exception e) {
                throw new GException(23200598,ThisAssembly,e); // selhal pokus o zašifrování souboru
            } // end catch
            finally {
                if(l_oTempFile != null) GTempFiles.DeleteTempFile(l_oTempFile.Path);
            } // end finally
        } // end method

        /// <summary>dešifrování souboru</summary>
        /// <param name="inputPath">vstupní soubor</param>
        /// <param name="outputPath">výstupní soubor</param>
        /// <param name="key">klíè</param>
        public static void UncoverFile(string inputPath,string outputPath,string key) {
            GTempFile l_oTempFile = null;
            try {
                // kontrola vstupních parametrù
                if((inputPath = inputPath.NotNullTrimmed()) == String.Empty) throw new GArgumentNullException(23200599,nameof(inputPath));
                if(File.Exists(inputPath = Path.GetFullPath(inputPath)) == false) throw new GException(23200600,23200516,ThisAssembly,inputPath); // nenalezen soubor {0}
                if((outputPath = outputPath.NotNullTrimmed()) == String.Empty) throw new GArgumentNullException(23200601,nameof(outputPath));
                if(Directory.Exists(Path.GetDirectoryName(outputPath = Path.GetFullPath(outputPath))) == false) throw new GException(23200602,23200517,ThisAssembly,Path.GetDirectoryName(outputPath)); // nenalezen adresáø {0}
                if((key = key.NotNullTrimmed()) == String.Empty) throw new GArgumentNullException(23200603,nameof(key));
                // konverze z Base64URL
                l_oTempFile = new GTempFile(Path.GetDirectoryName(outputPath));
                GIOSupport.ConvertFileFromBase64Url(inputPath,l_oTempFile.Path,false);
                // rozšifrování
                GAesGcmSupport.Decrypt(l_oTempFile.Path,outputPath,GCommon.FromBase64Url(key),false);
            } // end try
            catch(Exception e) {
                throw new GException(23200607,ThisAssembly,e); // selhal pokus o dešifrování souboru
            } // end catch
            finally {
                if(l_oTempFile != null) GTempFiles.DeleteTempFile(l_oTempFile.Path);
            } // end finally
        } // end method

        #endregion

        #region soukromé statické metody

        /// <summary>získání klíèe pro kódování nebo dekódování textu</summary>
        /// <param name="coverMethod">metoda pro kódování nebo dekódování</param>
        /// <returns>klíè pro kódování nebo dekódování textu</returns>
        private static byte[] GetKey(CoverMethod coverMethod) {
            int l_nKeySize = coverMethod==CoverMethod.DES ? 8 : 16; 
            byte[] l_anKey = new byte [l_nKeySize];
            int l_nStart = ((int) coverMethod * 32) + (((int) coverMethod + 1) * 3);
            for(int i=0; i<l_nKeySize; i++) l_anKey[i] = m_anKey[l_nStart+i];
            return l_anKey;
        } // end method

        /// <summary>získání inicializaèního vektoru pro kódování nebo dekódování textu</summary>
        /// <param name="coverMethod">metoda pro kódování nebo dekódování</param>
        /// <returns>inicializaèní vektor pro kódování nebo dekódování textu</returns>
        private static byte[] GetVector(CoverMethod coverMethod) {
            int l_nVectorSize = coverMethod==CoverMethod.DES ? 8 : 16; 
            byte[] l_anKey = new byte [l_nVectorSize];
            int l_nStart = 128 + ((int) coverMethod * 32) - (((int) coverMethod + 1) * 5);
            for(int i=0; i<l_nVectorSize; i++) l_anKey[i] = m_anKey[l_nStart-i];
            return l_anKey;
        } // end method

        /// <summary>získání objektu pro kódování nebo dekódování textu</summary>
        /// <param name="coverMethod">metoda pro kódování nebo dekódování</param>
        /// <returns>instance objektu pro kódování nebo dekódování textu</returns>
        private static SymmetricAlgorithm GetProvider(CoverMethod coverMethod) {
            SymmetricAlgorithm l_oSymmetricAlgorithm = null;
            switch(coverMethod) {
            case CoverMethod.Rijndael  : l_oSymmetricAlgorithm = new RijndaelManaged(); break;
            case CoverMethod.RC2       : l_oSymmetricAlgorithm = new RC2CryptoServiceProvider(); break;
            case CoverMethod.DES       : l_oSymmetricAlgorithm = new DESCryptoServiceProvider(); break;
            case CoverMethod.TripleDES : l_oSymmetricAlgorithm = new TripleDESCryptoServiceProvider(); break;
            } // end switch
            return l_oSymmetricAlgorithm;
        } // end method

        #endregion

    } // end class

} // end namespace


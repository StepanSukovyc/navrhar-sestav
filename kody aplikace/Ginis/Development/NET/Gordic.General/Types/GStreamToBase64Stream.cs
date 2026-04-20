//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GStreamToBase64Stream.cs                  </Name>
//    <Description> pomocná třída pro konverzi velkého binárního souboru na textový soubor s odpovídajícím obsahem BASE64</Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-05-22                                                  </Created>
//  </FileHeader>

// další varianta jak to přepsat je uvedena zde https://learn.microsoft.com/cs-cz/dotnet/api/system.security.cryptography.tobase64transform?view=net-8.0

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// pomocná třída pro konverzi velkého binárního souboru na textový soubor s odpovídajícím obsahem BASE64
    /// </summary>
    public class GStreamToBase64Stream
    {
        // https://stackoverflow.com/questions/19134062/encode-a-filestream-to-base64-with-c-sharp
            private const int base64LineBreakPosition = 64;

            internal static readonly char[] base64Table = {'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O',
                                                       'P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d',
                                                       'e','f','g','h','i','j','k','l','m','n','o','p','q','r','s',
                                                       't','u','v','w','x','y','z','0','1','2','3','4','5','6','7',
                                                       '8','9','+','/','=' };

            public static void FileToBase64File(string inputFile, string outputFile)
            {
                // const int BUFFER_SIZE = 4032; // 4032%3=0 && 4032%64=0
                // const int BUFFER_SIZE = 4080; // 4080%3=0 && 4080%8=0
                const int BUFFER_SIZE = 4095; // 4095%3=0 && 4095~=4096 (pageSize) 
                byte[] buffer = new byte[BUFFER_SIZE];
                int lastCharCount = 0;

                // using (System.IO.FileStream outputStream = System.IO.File.OpenWrite(outputFile,))
                using (System.IO.FileStream outputStream = new System.IO.FileStream(outputFile, System.IO.FileMode.Create, System.IO.FileAccess.Write, System.IO.FileShare.Read))
                {

                    using (System.IO.StreamWriter sw = new System.IO.StreamWriter(outputStream, System.Text.Encoding.ASCII))
                    {
                        //sw.Write("-----BEGIN CERTIFICATE-----");
                        //sw.Write(System.Environment.NewLine);

                        using (System.IO.FileStream inputStream = System.IO.File.OpenRead(inputFile))
                        {
                            using (System.IO.BinaryReader br = new System.IO.BinaryReader(inputStream))
                            {
                                br.BaseStream.Seek(0, System.IO.SeekOrigin.Begin);
                                long totalLength = inputStream.Length;

                                long totalRead = 0;
                                int bytesRead;
                                while ((bytesRead = br.Read(buffer, 0, BUFFER_SIZE)) > 0)
                                {
                                    totalRead += bytesRead;

                                    bool isFinal = (bytesRead < BUFFER_SIZE || totalRead == totalLength);
                                    lastCharCount = ConvertToBase64Array(sw, buffer, 0, bytesRead, true, isFinal, lastCharCount);
                                } // Whend 

                                br.Close();
                            } // End Using br 

                        } // End Using inputStream 

                        //sw.Write(System.Environment.NewLine);
                        //sw.Write("-----END CERTIFICATE-----");
                        //sw.Write(System.Environment.NewLine);
                        sw.Flush();
                        outputStream.Flush();
                    } // End Using sw 

                } // End Using outputStream 

            } // End Sub ToCertUtil 


            // public static int ConvertToBase64Array(System.IO.StreamWriter sw, byte[] inData, int offset, int length, int totalLength, bool insertLineBreaks)
            // https://www.codeproject.com/Articles/5483/Base-Encoder-Decoder-in-C
            // https://github.com/mono/mono/blob/master/mcs/class/referencesource/mscorlib/system/convert.cs
            public static int ConvertToBase64Array(System.IO.StreamWriter sw, byte[] inData, int offset, int length, bool insertLineBreaks, bool isFinal, int lastCharCount)
            {
                int lengthmod3 = length % 3;
                int calcLength = offset + (length - lengthmod3);
                int j = 0;
                int charCount = lastCharCount; // if one block is done, we need to reset the charCount to the previous position 
                int i;

                // Convert three bytes at a time to base64 notation.
                // This will consume 4 chars.
                // get a pointer to the base64Table to avoid unnecessary range checking
                {
                    for (i = offset; i < calcLength; i += 3)
                    {
                        if (insertLineBreaks)
                        {
                            if (charCount == base64LineBreakPosition)
                            {
                                sw.Write("\r\n");
#if DEBUGFLUSH
                            sw.Flush();
#endif

                                j += 2;
                                charCount = 0;
                            } // End if (charCount == base64LineBreakPosition) 

                            charCount += 4; // We only need the charCount if we do line-breaks  
                        } // End if (insertLineBreaks) 

                        sw.Write(base64Table[(inData[i] & 0xfc) >> 2]);
                        sw.Write(base64Table[((inData[i] & 0x03) << 4) | ((inData[i + 1] & 0xf0) >> 4)]);
                        sw.Write(base64Table[((inData[i + 1] & 0x0f) << 2) | ((inData[i + 2] & 0xc0) >> 6)]);
                        sw.Write(base64Table[(inData[i + 2] & 0x3f)]);

                        j += 4;
                    } // Next i 

                    //Where we left off before
                    i = calcLength;

                    if (insertLineBreaks && (lengthmod3 != 0 || !isFinal) && (charCount == base64LineBreakPosition))
                    {
                        sw.Write("\r\n");
#if DEBUGFLUSH
                    sw.Flush();
#endif
                        j += 2;
                    } // End if (insertLineBreaks && (lengthmod3 != 0 || !isFinal) && (charCount == base64LineBreakPosition)) 

                    switch (lengthmod3)
                    {
                        // One character padding needed
                        case 2:
                            // char char1 = base64Table[(inData[i] & 0xfc) >> 2];
                            // char char2 = base64Table[((inData[i] & 0x03) << 4) | ((inData[i + 1] & 0xf0) >> 4)];
                            // char char3 = base64Table[(inData[i + 1] & 0x0f) << 2];
                            // char char4 = base64Table[64]; //Pad

                            // string e = new string(new char[] { char1, char2, char3, char4 });
                            // System.Console.WriteLine(e);


                            sw.Write(base64Table[(inData[i] & 0xfc) >> 2]);
                            sw.Write(base64Table[((inData[i] & 0x03) << 4) | ((inData[i + 1] & 0xf0) >> 4)]);
                            sw.Write(base64Table[(inData[i + 1] & 0x0f) << 2]);
                            sw.Write(base64Table[64]); //Pad
                            j += 4;
                            break;

                        // Two character padding needed
                        case 1:
                            // char char11 = base64Table[(inData[i] & 0xfc) >> 2];
                            // char char12 = base64Table[(inData[i] & 0x03) << 4];
                            // char char13 = base64Table[64]; //Pad
                            // char char14 = base64Table[64]; //Pad

                            // string ee = new string(new char[] { char11, char12, char13, char14 });
                            // System.Console.WriteLine(ee);

                            sw.Write(base64Table[(inData[i] & 0xfc) >> 2]);
                            sw.Write(base64Table[(inData[i] & 0x03) << 4]);
                            sw.Write(base64Table[64]); //Pad
                            sw.Write(base64Table[64]); //Pad
                            j += 4;
                            break;
                    } // End Switch 

                } // End empty scope block 

                // return j;
                return charCount;
            } // End Function ConvertToBase64Array 

}
}

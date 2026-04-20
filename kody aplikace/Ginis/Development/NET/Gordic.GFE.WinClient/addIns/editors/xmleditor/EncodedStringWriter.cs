//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.EncodedStringWriter.cs                 </Name>
//    <Description> Textový zápisnik umožňujíc specifikácí kódování             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System.IO;
using System.Text;

namespace Gordic.GFE.WinClient.XmlEditor
{
    /// <summary>
    /// Textový zápisnik umožňujíc specifikácí kódování
    /// </summary>
    /// <remarks></remarks>
    public class EncodedStringWriter : StringWriter
    {
        readonly Encoding encoding = Encoding.UTF8;

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="encoding">Kódování</param>
        /// <remarks></remarks>
        public EncodedStringWriter(Encoding encoding)
        {
            this.encoding = encoding;
        }

        /// <summary>
        /// Kódování
        /// </summary>
        public override Encoding Encoding
        {
            get
            {
                return encoding;
            }
        }
    }
}

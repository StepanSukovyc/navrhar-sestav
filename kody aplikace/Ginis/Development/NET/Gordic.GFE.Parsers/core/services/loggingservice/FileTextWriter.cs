//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DebugTextWriter.cs                       </Name>
//    <Description> TextWriter zápisovač do System.Diagnostics.Debug            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.IO;
using System.Text;

namespace Gordic.GFE.Parsers.Core.Services
{
    /// <summary>
    /// TextWriter zápisovač do souboru 
    /// </summary>
    public class FileTextWriter : TextWriter
    {
        StringBuilder builder = new StringBuilder();
        /// <summary>
        /// Kódování
        /// </summary>
        public override Encoding Encoding { get { return Encoding.Unicode; } }
        /// <summary>
        /// Zápis písmenka
        /// </summary>
        /// <param name="value">Zapisované písmenko</param>
        public override void Write(char value)
        {
            builder.Append(value.ToString());
        }
        /// <summary>
        /// Zapsaní určitého počtu písmen z pole začínaje daným.
        /// </summary>
        /// <param name="buffer">pole písmen</param>
        /// <param name="index">Počáteční index</param>
        /// <param name="count">Počet písmen k zápisu</param>
        public override void Write(char[] buffer, int index, int count)
        {
            builder.Append(new string(buffer, index, count));
        }

        /// <summary>
        /// Zapsaní daného řetězce
        /// </summary>
        /// <param name="value">Řetězec</param>
        public override void Write(string value)
        {
            builder.Append(value);
        }
        /// <summary>
        /// Zapsaní prázdnéh ořádku
        /// </summary>
        public override void WriteLine()
        {
            builder.AppendLine(string.Empty);
        }
        /// <summary>
        /// Zapsaní řetězce z následným skokem na nový řádek
        /// </summary>
        /// <param name="value">Řetězec k zápisu</param>
        public override void WriteLine(string value)
        {
            builder.AppendLine(value);
        }

        /// <summary>
        /// Uložení obsahu logu do souboru
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <param name="createUniqueName">TRUE - nevytváří unikátní název</param>
        public string Save(string fileName, bool createUniqueName = true)
        {
            try
            {
                if (createUniqueName)
                    fileName = FileUtility.GetUniqueName(fileName);

                FileUtility.GetOrCreateDirectory(Path.GetDirectoryName(fileName));

                using (StreamWriter stream = File.CreateText(fileName))
                    stream.Write(builder.ToString());

                return fileName;
            }
            // chybu nikam nepoznamenáme
            catch { }

            return null;
        }
    }
}

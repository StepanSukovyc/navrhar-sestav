//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DebugTextWriter.cs                       </Name>
//    <Description> TextWriter zápisovač do System.Diagnostics.Debug            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Diagnostics;
using System.IO;
using System.Text;

namespace Gordic.GFE.Parsers.Core.Services
{
    /// <summary>
    /// TextWriter zápisovač do System.Diagnostics.Debug 
    /// </summary>
    class DebugTextWriter : TextWriter
    {
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
            Debug.Write(value.ToString());
        }
        /// <summary>
        /// Zapsaní určitého počtu písmen z pole začínaje daným.
        /// </summary>
        /// <param name="buffer">pole písmen</param>
        /// <param name="index">Počáteční index</param>
        /// <param name="count">Počet písmen k zápisu</param>
        public override void Write(char[] buffer, int index, int count)
        {
            Debug.Write(new string(buffer, index, count));
        }

        /// <summary>
        /// Zapsaní daného řetězce
        /// </summary>
        /// <param name="value">Řetězec</param>
        public override void Write(string value)
        {
            Debug.Write(value);
        }
        /// <summary>
        /// Zapsaní prázdnéh ořádku
        /// </summary>
        public override void WriteLine()
        {
            Debug.WriteLine(string.Empty);
        }
        /// <summary>
        /// Zapsaní řetězce z následným skokem na nový řádek
        /// </summary>
        /// <param name="value">Řetězec k zápisu</param>
        public override void WriteLine(string value)
        {
            Debug.WriteLine(value);
        }
    }
}

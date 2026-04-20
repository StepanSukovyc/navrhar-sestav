//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.TextEditor.Document.FoldStart.cs                             </Name>
//    <Description> Udržuje informaci o startu skládání v řádku editoru         </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-05-15                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.TextEditor.Document
{
    /// <summary>
    /// Udržuje informaci o startu skládání v řádku editoru
    /// </summary>
    public class FoldStart
    {
        int line = 0;
        /// <summary>
        /// Řádek na kterém začíná skládání
        /// řádky začínají od 0.
        /// </summary>
        public int Line { get { return line; } }

        int col = 0;
        /// <summary>
        /// Sloupec kde začíná skládání.  
        /// Sloupce začínají od 0.
        /// </summary>
        public int Column { get { return col; } }

        string prefix = String.Empty, name = String.Empty;
        /// <summary>
        /// Název XML položky s prefixem, pokud existuje
        /// </summary>
        public string Name { get { return prefix.Length > 0 ? String.Concat(prefix, ":", name) : name; } }

        object bind;
        /// <summary>
        /// vázaný objekt
        /// </summary>
        public object Bind { get { return bind; } }

        /// <summary>
        /// Text, který se zobrazí po složení položky
        /// </summary>
        public string FoldText { get; set; }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="prefix">Prefix</param>
        /// <param name="name">název</param>
        /// <param name="line">řádek</param>
        /// <param name="col">sloupec</param>
        /// <param name="bound">vázaný objekt</param>
        public FoldStart(string prefix, string name, int line, int col, object bound = null)
        {
            this.line = line;
            this.col = col;
            this.prefix = prefix;
            this.name = name;
            this.bind = bound;
            FoldText = string.Empty;
        }
    }
}

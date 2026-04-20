//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FileLineReference.cs                   </Name>
//    <Description> Prezentuje referencí na řádek a pozici v souboru            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-09                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.WinClient.MessageView
{
    /// <summary>
    /// Prezentuje referencí na řádek a pozici v souboru
    /// </summary>
    class FileLineReference
    {
        /// <summary>
        /// Referencovaný soubor
        /// </summary>
        string fileName = String.Empty;

        /// <summary>
        /// řádek souboru
        /// </summary>
        int line = 0;

        /// <summary>
        /// sloupec řádku
        /// </summary>
        int column = 0;


        /// <summary>
        /// Název souboru 
        /// </summary>
        public string FileName
        {
            get { return fileName; }
            set { fileName = value; }
        }

        /// <summary>
        /// číslo řádku 
        /// </summary>
        public int Line
        {
            get { return line; }
            set { line = value; }
        }

        /// <summary>
        /// číslo sloupce. 
        /// </summary>
        public int Column
        {
            get { return column; }
            set { column = value; }
        }
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="fileName">Název referncovaného souboru.</param>
        /// <param name="line">číslo řádku</param>
        /// <param name="column">číslo sloupce.</param>
        public FileLineReference(string fileName, int line, int column)
        {
            this.fileName = fileName;
            this.line = line;
            this.column = column;
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="fileName">Název referncovaného souboru.</param>
        /// <param name="line">číslo řádku.</param>
        public FileLineReference(string fileName, int line)
            : this(fileName, line, 0)
        {
        }

        /// <summary>
        /// Vytvoření nové instance třídy.
        /// </summary>
        public FileLineReference()
        {
        }
    }
}

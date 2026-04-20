//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.FileNameEventHandler.cs                  </Name>
//    <Description> Událost se souborem                                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-22                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Událost se souborem
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    public delegate void FileNameEventHandler(object sender, FileNameEventArgs e);

    /// <summary>
    /// Popis FileEventHandler.
    /// </summary>
    public class FileNameEventArgs : System.EventArgs
    {
        readonly string fileName;
        /// <summary>
        /// Název souboru
        /// </summary>
        public string FileName { get { return fileName; } }

        readonly bool addToRecentOpen;
        /// <summary>
        /// Pomocný indikátor.
        /// TRUE - indikuje, že je zapotřebí přidát soubor do seznamu naposledy otevřených
        /// </summary>
        public bool AddToRecentOpen { get { return addToRecentOpen; } }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        public FileNameEventArgs(string fileName)
        {
            this.fileName = fileName;
            addToRecentOpen = true;
        }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <param name="addToRecentOpen">Indikuje, že název souboru je zapotřebí přidat do seznamu naposledy otevřených souborů</param>
        public FileNameEventArgs(string fileName, bool addToRecentOpen)
        {
            this.fileName = fileName;
            this.addToRecentOpen = addToRecentOpen;
        }
    }
}

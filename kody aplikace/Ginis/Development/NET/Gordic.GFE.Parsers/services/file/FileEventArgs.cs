//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.FileEventArgs.cs                         </Name>
//    <Description> Parametr pro rušení akce se souborem                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.Parsers.Services
{
    /// <summary>
    /// Chyba obrázku
    /// </summary>
    public class ErrorFileNameException : Exception
    {
        /// <summary>
        /// Prázdný konstruktor třídy
        /// </summary>
        public ErrorFileNameException()
            : base()
        {
        }

        /// <summary>
        /// Konstruktor s chybovou hláškou
        /// </summary>
        /// <param name="message">Hláška</param>
        public ErrorFileNameException(string message)
            : base(message)
        {
        }

    }

    /// <summary>
    /// Parametr pro práci se soubory
    /// </summary>
    public class FileEventArgs : EventArgs
    {
        readonly string fileName = null;
        readonly bool isDirectory;

        /// <summary>
        /// Název souboru/složky
        /// </summary>
        public string FileName { get { return fileName; } }

        /// <summary>
        /// Indikuje, že parametr je složka
        /// </summary>
        public bool IsDirectory { get { return isDirectory; } }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="fileName">Název parametru</param>
        /// <param name="isDirectory">Indikuje, že parametr je složka nebo není</param>
        public FileEventArgs(string fileName, bool isDirectory)
        {
            this.fileName = fileName;
            this.isDirectory = isDirectory;
        }
    }

    /// <summary>
    /// EventArgs přejmenování souboru
    /// </summary>
    public class FileRenameEventArgs : EventArgs
    {
        readonly bool isDirectory;
        readonly string sourceFile = null;
        readonly string targetFile = null;

        /// <summary>
        /// Zdrojový soubor
        /// </summary>
        public string SourceFile { get { return sourceFile; } }

        /// <summary>
        /// Cílový soubor
        /// </summary>
        public string TargetFile { get { return targetFile; } }

        /// <summary>
        /// Je složkou
        /// </summary>
        public bool IsDirectory { get { return isDirectory; } }

        /// <summary>
        /// Konstrultor třídy
        /// </summary>
        /// <param name="sourceFile">Zdrojový soubor</param>
        /// <param name="targetFile">Cílový soubor</param>
        /// <param name="isDirectory">Je složka</param>
        public FileRenameEventArgs(string sourceFile, string targetFile, bool isDirectory)
        {
            this.sourceFile = sourceFile;
            this.targetFile = targetFile;
            this.isDirectory = isDirectory;
        }
    }

    /// <summary>
    /// Parametr pro rušení akce se souborem
    /// </summary>
    public class FileCancelEventArgs : FileEventArgs
    {
        /// <summary>
        /// Indikuej potřebu zrušit akci
        /// </summary>
        public bool Cancel { get; set; }

        /// <summary>
        /// Indikuje, zda akce již byla provedená nebo nikoli
        /// </summary>
        public bool OperationAlreadyDone { get; set; }

        /// <summary>
        /// Konstruktor parametru
        /// </summary>
        /// <param name="fileName">Název parametru</param>
        /// <param name="isDirectory">Indikuje, zda parametr je složka či nikoli</param>
        public FileCancelEventArgs(string fileName, bool isDirectory)
            : base(fileName, isDirectory)
        {
        }
    }

    /// <summary>
    /// EventArgs přejmenování souboru
    /// </summary>
    public class FileRenamingEventArgs : FileRenameEventArgs
    {
        /// <summary>
        /// Zrušení
        /// </summary>
        public bool Cancel { get; set; }
        /// <exclude/>
        public bool OperationAlreadyDone { get; set; }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="sourceFile">Zdrojový soubor</param>
        /// <param name="targetFile">Cílový soubor</param>
        /// <param name="isDirectory">Indikuje, že to je složka</param>
        public FileRenamingEventArgs(string sourceFile, string targetFile, bool isDirectory)
            : base(sourceFile, targetFile, isDirectory)
        {
        }
    }

}

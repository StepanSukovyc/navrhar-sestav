//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.DocumentAccessor.cs                      </Name>
//    <Description> Rozhraní slouží k odsazení třídy pro přístup k dokumentu.   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-27                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using Gordic.TextEditor.Document;
using Gordic.TextEditor.Util;

namespace Gordic.GFE.Parsers.Binding
{
    /// <summary>
    /// Rozhraní slouží k odsazení třídy pro přístup k dokumentu.
    /// </summary>
    public interface IDocumentAccessor
    {
        /// <summary>indikuje změny v dokumentu</summary>
        bool Dirty { get; }
        /// <summary>
        /// Indikuje, kdy aktuální řádek je pouze pro čtení
        /// (není ve vybraném regionu)
        /// </summary>
        bool ReadOnly { get; }
        /// <summary>číslo aktuálního řádku.</summary>
        int LineNumber { get; }
        /// <summary>text v aktuálním řádku.</summary>
        string Text { get; set; }
        /// <summary>přechod na další řádek.</summary>
        bool Next();
    }

    #region DocumentAccessor
    /// <summary>
    /// trochu jiný přístup k dokumentu
    /// </summary>
    public sealed class DocumentAccessor : IDocumentAccessor
    {
        IDocument doc;
        readonly int minLine;
        readonly int maxLine;
        int changedLines = 0;
        bool lineDirty = false;
        LineSegment line;
        
        #region IDocumentAccessor
        /// <summary>
        /// Indikuje, kdy aktuální řádek je pouze pro čtení
        /// (není ve vybraném regionu)
        /// </summary>
        public bool ReadOnly { get { return num < minLine; } }
        bool dirty;
        /// <summary>indikuje změny v dokumentu</summary>
        public bool Dirty { get { return dirty; } }
        int num = -1;
        /// <summary>číslo aktuálního řádku.</summary>
        public int LineNumber { get { return num; } }
        string text;
        /// <summary>text v aktuálním řádku.</summary>
        public string Text
        {
            get { return text; }
            set
            {
                if (num < minLine) return;
                text = value;
                dirty = true;
                lineDirty = true;
            }
        }
        /// <summary>
        /// přechod na další řádek
        /// </summary>
        /// <returns></returns>
        public bool Next()
        {
            if (lineDirty)
            {
                DefaultFormattingStrategy.SmartReplaceLine(doc, line, text);
                lineDirty = false;
                ++changedLines;
            }
            ++num;
            if (num > maxLine) return false;
            line = doc.GetLineSegment(num);
            text = doc.GetText(line);
            return true;
        }
        #endregion

        /// <summary>
        /// pozměněný řádek
        /// </summary>
        public int ChangedLines { get { return changedLines; } }
        /// <summary>
        /// vytvoření nové instance třídy dle dokumentu
        /// </summary>
        /// <param name="document">uvedený dokument pohledu</param>
        public DocumentAccessor(IDocument document)
        {
            doc = document;
            this.minLine = 0;
            this.maxLine = doc.TotalNumberOfLines - 1;
        }
        /// <summary>
        /// vytvoření nové instance třídy dle dokumentu a daných řádku
        /// </summary>
        /// <param name="document">uvedený dokument</param>
        /// <param name="minLine">počáteční řádek</param>
        /// <param name="maxLine">koncový řádek</param>
        public DocumentAccessor(IDocument document, int minLine, int maxLine)
        {
            doc = document;
            this.minLine = minLine;
            this.maxLine = maxLine;
        }

    }
    #endregion

    #region FileAccessor
    public sealed class FileAccessor : IDocumentAccessor, IDisposable
    {
        #region IDocumentAccessor
        bool dirty = false;
        /// <summary>indikuje změny v dokumentu</summary>
        public bool Dirty { get { return dirty; } }
        /// <summary>
        /// Indikuje, kdy aktuální řádek je pouze pro čtení
        /// (není ve vybraném regionu)
        /// </summary>
        public bool ReadOnly { get { return false; } }
        string text = string.Empty;
        /// <summary>text v aktuálním řádku.</summary>
        public string Text
        {
            get { return text; }
            set
            {
                dirty = true;
                text = value;
            }
        }
        int num = 0;
        /// <summary>číslo aktuálního řádku.</summary>
        public int LineNumber { get { return num; } }
        /// <summary>přechod na další řádek.</summary>
        public bool Next()
        {
            if (num > 0)
                lines.Add(text);
            text = r.ReadLine();
            ++num;
            return text != null;
        }
        #endregion

        #region IDisposable
        /// <summary>
        /// uvolnění objektu
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikátor uvolnění</param>
        void Dispose(bool disposing)
        {
            if (disposing)
                Close();
        }
        /// <summary>
        /// finalizer objektu
        /// </summary>
        ~FileAccessor() { Dispose(false); }
        #endregion

        FileStream f;
        StreamReader r;
        List<string> lines = new List<string>();
        readonly string filename;
        /// <summary>
        /// vytvoření nové přístupu k souboru
        /// </summary>
        /// <param name="filename">úplný název souboru</param>
        public FileAccessor(string filename)
        {
            this.filename = filename;
            f = new FileStream(filename, FileMode.Open, FileAccess.Read);
            r = FileReader.OpenStream(f, ParserService.DefaultFileEncoding);
        }
        /// <summary>
        /// zavření přístupu k souboru
        /// </summary>
        public void Close()
        {
            System.Text.Encoding encoding = r.CurrentEncoding;
            r.Close();
            f.Close();
            if (dirty)
            {
                f = new FileStream(filename, FileMode.Create, FileAccess.Write, FileShare.None);
                using (StreamWriter w = new StreamWriter(f, encoding))
                    foreach (string line in lines)
                        w.WriteLine(line);
                f.Close();
            }
        }
    }
    #endregion
}

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AbstractFormationDocument.cs             </Name>
//    <Description> abstraktní implementace rozhraní IFormationDocument         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-25                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Utils;
using System;

namespace Gordic.GFE.Parsers.Editor
{
    /// <summary>
    /// abstraktní implementace rozhraní IFormationDocument
    /// </summary>
    abstract public class AbstractFormationDocument : IFormationDocument, IDisposable
    {
        #region IDisposable
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
                if (pages != null)
                {
                    pages.Dispose();
                    pages = null;
                }
        }
        ~AbstractFormationDocument() { Dispose(false); }
        #endregion

        #region IFormationDocument
        IPages pages;
        /// <summary>
        /// Kolekce stránek dokumentu.
        /// </summary>
        public IPages Pages { get { return pages; } }
        /// <summary>
        /// načtení stránek z formátu <paramref name="format"/>.
        /// </summary>
        /// <param name="format">formát sestavy</param>
        public virtual void LoadPages(GFEFormat format)
        {
            pages.PageHeight = new SizeValue((format.PageSize.Height == 0 ? 297 : format.PageSize.Height) + "mm");
            pages.PageWidth = new SizeValue((format.PageSize.Width == 0 ? 210 : format.PageSize.Width) + "mm");
            pages.MarginLeft = new SizeValue((format.PageMargins.left == 0 ? 10 : format.PageMargins.left) + "mm");
            pages.MarginRight = new SizeValue((format.PageMargins.right == 0 ? 10 : format.PageMargins.right) + "mm");
            pages.MarginTop = new SizeValue((format.PageMargins.top == 0 ? 10 : format.PageMargins.top) + "mm");
            pages.MarginBottom = new SizeValue((format.PageMargins.bottom == 0 ? 10 : format.PageMargins.bottom) + "mm");
            format.EditorSettings.ForEach((item) => pages.AttrList.Add(item.Key.StartsWith("paper-") ? item.Key.Substring(6) : item.Key, item.Value));
        }
        /// <summary>
        /// načtení formátu XML
        /// </summary>
        /// <param name="xml">obsah formátu XML</param>
        public virtual void Load(string xml) { pages = new URPages(Gordic.GFE.Parsers.Services.UndoRedoService.Manager); }
        #endregion
    }
}

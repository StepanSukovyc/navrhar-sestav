//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GraphicFormationDocument.cs            </Name>
//    <Description> abstraktní mezí-třída grafických sestav                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-25                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.WinClient.Services;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// abstraktní mezí-třída grafických sestav
    /// </summary>
    abstract class GraphicFormationDocument : AbstractFormationDocument, IDisposable
    {
        #region IDisposable
        /// <summary>
        /// uvolnění objektu
        /// </summary>
        /// <param name="disposing">faktor uvolnění</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && Pages != null)
            {
                Pages.ListChanged -= ActualizeScrollScope;
                Pages.FormatChanged -= FormatChanged;
                if (UndoRedoService.Manager != null)
                    UndoRedoService.Manager.CommandDone -= ManagerCommandDone;
            }
            base.Dispose(disposing);
        }
        #endregion

        /// <summary>
        /// nastavení objektu pod kurzorem
        /// </summary>
        /// <param name="point">pozice kurzoru</param>
        internal void SetTowedObject(System.Drawing.Point point)
        {
            foreach (var item in Pages)
            {
                object result = item.GetTowedObject(point);
                if (result != null && (!(result is List<object> l) || l.Count != 0))
                {
                    TowedService.TowedObject = result;
                    return;
                }
            }
        }

        /// <summary>
        /// volá se po načtení sestavy
        /// </summary>
        protected void OnFormationLoaded()
        {
            Pages.ListChanged += ActualizeScrollScope;
            Pages.FormatChanged += FormatChanged;
            if (UndoRedoService.Manager != null)
                UndoRedoService.Manager.CommandDone += ManagerCommandDone;
        }

        /// <summary>
        /// Vlastností sestavy
        /// </summary>
        public abstract IFormationDocumentProperty _FormationProperty { get; }
        /// <summary>
        /// pohled na dokument
        /// </summary>
        protected IDocumentView document;
        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="document">pohled na dokument</param>
        public GraphicFormationDocument(IDocumentView document) { this.document = document; }
        void FormatChanged(object sender, EventArgs e)
        {
            (document.Control as Parsers.IPagePanel).PositionCachNeedRefresh = true;
            ActualizeScrollScope(this, EventArgs.Empty);
        }
        void ActualizeScrollScope(object sender, EventArgs e) { (document.Control as Gordic.GFE.Parsers.IPagePanel).ActualizeScrollScope(this, EventArgs.Empty); }
        void ManagerCommandDone(object sender, CommandDoneEventArgs e)
        {
            if (e.CommandDoneType != CommandDoneType.Commit)
                FormatChanged(this, EventArgs.Empty);
            document.IsDirty = true;
        }
    }
}

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.DocfrmFormationDocument.cs            </Name>
//    <Description> Jednotka GRF sestavy                                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.Services;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;

namespace Gordic.Gfe.FormFiller.Gui
{
    /// <summary>
    /// Dokument obsahující informace o stránkách a vlastnostech sestavy.
    /// Přes tuto třídu probíha aktuálizace obsahu stránek.
    /// </summary>
    class DocfrmFormationDocument : IDisposable
    {
        #region IDisposable
        /// <summary>
        /// Uvolnění dokumentu
        /// </summary>
        public void Dispose()
        {
            DisposePages();
            ServiceManager.GraphicSettingService.RemoveZoomChanged(SimpleDesktop.Desktop.ActiveViewContent, ZoomChanged);
        }
        #endregion

        ICurrentDocumentView documentView;
        ///// <summary>
        ///// Vlastnosti dokumentu
        ///// </summary>
        //DocfrmFormationProperties formationProperty { get { return (CompilationService.Units[documentView.PrimaryFile] as DocfrmCompilationUnit).FormationProperty; } }

        /// <summary>
        /// Volá se po načtení documentu
        /// </summary>
        public event EventHandler Loaded;

        IPages pages;
        /// <summary>
        /// Kolekce stránek dokumentu.
        /// </summary>
        public IPages Pages { get { return pages; } }

        readonly IViewContent view;
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="documentView"></param>
        /// <param name="view"></param>
        public DocfrmFormationDocument(ICurrentDocumentView documentView, IViewContent view)
        {
            this.documentView = documentView;
            this.view = view;
            ServiceManager.GraphicSettingService.AddZoomChanged(SimpleDesktop.Desktop.ActiveViewContent, ZoomChanged);
        }

        ///// <summary>
        ///// Načtení datového souboru sestavy
        ///// </summary>
        ///// <param name="dataData">Obsah datového souboru</param>
        ///// <param name="formatFileData">Obsah šablony (alf souboru)</param>
        ///// <param name="manager">Správce dat</param>
        //internal void Load(string dataData, byte[] formatFileData, DefaultDataManager manager)
        //{
        //    try
        //    {
        //        if (documentView.PrimaryFile != null)
        //        {
        //            // načteme vlastností dokumentu
        //            formationProperty.Load(this, formatFileData, view);
        //            DisposePages();

        //            pages = new Pages();
        //            formationProperty.RefreshPages(manager);
        //            (documentView.Control as IPagePanel).ActualizeScrollScope(this, EventArgs.Empty);
        //            OnLoaded();
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        LoggingService.Debug(ex.ToString());
        //        documentView.ShowErrorMessage(ex.Message);
        //    }
        //}

        private void OnLoaded()
        {
            Loaded?.Invoke(this, EventArgs.Empty);
        }
        /// <summary>
        /// Načtení stránek z formátu.
        /// </summary>
        /// <param name="grf">Formát s informací o sestavě.</param>
        /// <param name="manager">Správce dat</param>
        internal int LoadPages(GFEFormatGRF grf, DefaultDataManager manager)
        {
            pages.PageHeight = new SizeValue((grf.PageSize.Height == 0 ? 297 : grf.PageSize.Height) + "mm");
            pages.PageWidth = new SizeValue((grf.PageSize.Width == 0 ? 210 : grf.PageSize.Width) + "mm");
            pages.MarginLeft = new SizeValue((grf.PageMargins.left == 0 ? 10 : grf.PageMargins.left) + "mm");
            pages.MarginRight = new SizeValue((grf.PageMargins.right == 0 ? 10 : grf.PageMargins.right) + "mm");
            pages.MarginTop = new SizeValue((grf.PageMargins.top == 0 ? 10 : grf.PageMargins.top) + "mm");
            pages.MarginBottom = new SizeValue((grf.PageMargins.bottom == 0 ? 10 : grf.PageMargins.bottom) + "mm");
            pages.Parent = documentView.Control as IPagePanel;

            int collectionsCount = manager == null ? 1 : manager.GetCollectionsCount();

            for (int index = 0; index < collectionsCount; index++)
                for (int i = 0; i < grf.PageCount; i++)
                {
                    DefaultPage page = new DefaultPage(pages, view);
                    page.Initialize();
                    pages.Add(page as IPage);
                }
            return collectionsCount;
        }

        void ZoomChanged(object sender, EventArgs e)
        {
            (documentView.Control as IPagePanel).ActualizeScrollScope(this, EventArgs.Empty);
        }
        void DisposePages()
        {
            // pokud se stránky nenačítají poprvé, pak je před znovu vytvořením uvolníme
            if (pages != null)
            {
                pages.Dispose();
                pages = null;
            }
        }
    }
}

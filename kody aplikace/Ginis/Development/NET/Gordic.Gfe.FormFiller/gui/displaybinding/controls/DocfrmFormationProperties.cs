////  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
////    <Name>        Gordic.Gfe.FormFiller.DocfrmFormationProperties.cs          </Name>
////    <Description> Vlastnosti sestavy dokumentu                                </Description>
////    <Author>      Mgr. Stepan Sukovych                                        </Author>
////    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
////    <Created>     2013-02-13                                                  </Created>
////  </FileHeader>

//using System;
//using System.Collections.Generic;
//using System.Collections.ObjectModel;
//using Gordic.GFE.Parsers;
//using Gordic.GFE.Parsers.Core;
//using Gordic.GFE.Parsers.Dom;
//using Gordic.GFE.Parsers.Gui;
//using Gordic.General;

//namespace Gordic.Gfe.FormFiller.Gui
//{
//    /// <summary>
//    /// Vlastnosti sestavy dokumentu
//    /// </summary>
//    class DocfrmFormationProperties
//    {
//        List<GFEFormatTag> unknowns = new List<GFEFormatTag>();
//        /// <summary>
//        /// Neznáme formáty
//        /// </summary>
//        public ReadOnlyCollection<GFEFormatTag> Unknowns { get { return unknowns.AsReadOnly(); } }

//        /// <summary>
//        /// Jednotka struktury
//        /// </summary>
//        public GFEStructure Structure { get { return (view as DocfrmViewContent).Structure; } }

//        /// <summary>
//        /// zásobník aktuálních stylů. 
//        /// používá se při ukládáni sestavy.
//        /// </summary>
//        List<GFEList> xmlStyles;

//        GFEFormat gfeFormat;
//        DocfrmFormationDocument document;
//        IViewContent view;
//        ///// <summary>
//        ///// získání formátu z proudu dat
//        ///// </summary>
//        ///// <param name="document">Dokument vlastnosti</param>
//        ///// <param name="xmlBytes">Proud dat formátu</param>
//        ///// <param name="view"></param>
//        //internal void Load(DocfrmFormationDocument document, byte[] xmlBytes, IViewContent view)
//        //{
//        //    this.document = document;
//        //    this.view = view;
//        //    xmlStyles = new List<GFEList>();

//        //    if (xmlBytes == null || xmlBytes.Length == 0)
//        //        throw new Exception();
//        //    gfeFormat = GFEFormat.LoadFromBytes(xmlBytes);
//        //}

//        DefaultDataManager manager;
//        /// <summary>
//        /// Aktualizace stránek formuláře
//        /// </summary>
//        internal void RefreshPages(DefaultDataManager manager)
//        {
//            this.manager = manager;

//            GFEFormatGRF grf = (GFEFormatGRF)gfeFormat;
//            int collectionsCount = 0;

//            using (AsynchronousWaitDialog monitor = AsynchronousWaitDialog.IsStarted
//                ? new AsynchronousWaitDialog(GResources.GetResourceText(29450052)) //RC 29450052 : aktualizace stránek
//                : null)
//            {

//                if (grf == null)
//                {
//                    MessageService.ShowError(GResources.GetResourceText(29450053)); //RC 29450053 : Chybný formát formulářové sestavy!
//                    return;
//                }

//                // lze získat i z manager.GetCollectionsCount(), ale tento počet se již určuje v metodě LoadPages
//                collectionsCount = document.LoadPages(grf, manager);
//            }

//            using (AsynchronousWaitDialog monitor = AsynchronousWaitDialog.IsStarted
//                    ? new AsynchronousWaitDialog(GResources.GetResourceText(29450054)) //RC 29450054 : načtení regionů
//                    : null)
//                for (int index = 0; index < collectionsCount; index++)
//                    LoadRegions(grf.Root, manager.GetRootData(index), index * grf.PageCount);
//        }

//        /// <summary>
//        /// Načtení hlavního regionu
//        /// </summary>
//        /// <param name="reg">Formát s informaci o hlavním regionu</param>
//        /// <param name="data"></param>
//        /// <param name="pageStart"></param>
//        void LoadRegions(GFEFormatRegion reg, DataRegion data, int pageStart)
//        {
//            LoadRegions(reg, null, data, pageStart);
//        }
//        void LoadRegions(GFEFormatRegion reg, URAbstractContainer parent, DataRegion data, int pageStart)
//        {
//            reg.SetStructureItem(CommonService.GetRegionFromStructure(Structure, reg.DataFullName));

//            foreach (var item in reg.Body)
//            {
//                GFEFormatRegion re = item as GFEFormatRegion;
//                if (re != null)
//                {
//                    if (!re.GrfRect.isEmpty)
//                    {
//                        var com = new DefaultContentRegion();
//                        com.Initialize(item, view);
//                        com.Page = document.Pages[item.GrfRect.page1 - 1 + pageStart] as DefaultPage;
//                        if (parent == null)
//                            (document.Pages[re.GrfRect.page1 - 1 + pageStart] as URAbstractPage).Add(com);
//                        else
//                            parent.Add(com);
//                        LoadRegions(re, com, new DataRegion(data, re), pageStart);
//                    }
//                    else
//                        LoadRegions(re, parent, data, pageStart);
//                    continue;
//                }

//                GFEFormatGRFBlock blk = item as GFEFormatGRFBlock;
//                if (blk != null)
//                {
//                    foreach (var child in blk.Children)
//                        ParseContent(parent, child, data, pageStart);
//                    continue;
//                }

//                ParseContent(parent, item, data, pageStart);
//            }
//        }

//        void ParseContent(URAbstractContainer parent, GFEFormatTag item, DataRegion data, int pageStart)
//        {
//            var grfRect = item.GrfRect;
//            if (grfRect.isEmpty) return; //asi nic?
//            var pgNo = Math.Max(0, grfRect.page1 - 1);

//            var com = CreateContent(item, data, pageStart);
//            if (com == null) return;
//            var page = document.Pages[pgNo + pageStart] as DefaultPage;

//            if (com is DefaultAbstractContent)
//                (com as DefaultAbstractContent).Initialize(data, page, parent == null ? page : parent as ISizable);
//            else
//                com.Page = page;
            
//            if (parent == null)
//                page.Add(com);
//            else
//                parent.Add(com);
//        }
//        ITagComponent CreateContent(GFEFormatTag item, DataRegion data, int pageStart)
//        {
//            dynamic d = null;
//            if (item is GFEFormatContentText) d = new DefaultContentText();
//            if (item is GFEFormatContentValue) d = new DefaultContentValue();
//            if (item is GFEFormatContentChart) d = new DefaultContentChart();
//            if (item is GFEFormatContentBarcode) d = new DefaultContentBarcode();
//            if (item is GFEFormatContentImage) d = new DefaultContentImage();
//            if (d != null)
//            {
//                d.Initialize(item, view);
//                return d;
//            }
//            else
//            if (item is GFEFormatUnknownContent)
//            {
//                dynamic com = null;
//                if (item.TagName == "button")
//                    com = new DefaultContentButton();
//                else
//                    com = new DefaultContentUnknown();

//                com.Initialize(item, view);
//                return com;
//            }
//            GFEFormatUnknown unkn = item as GFEFormatUnknown;
//            if (unkn != null)
//            {
//                var com = new DefaultContentUnknown();
//                com.Initialize(item, view);
//                if (unkn.Children.Count != 0)
//                    LoadUnknownChildren(unkn, com, data, pageStart);
//                return com;
//            }
//            return null;
//        }
//        void LoadUnknownChildren(GFEFormatUnknown unknown, URAbstractContainer parent, DataRegion data, int pageStart)
//        {
//            if (unknown == null || unknown.Children.Count == 0)
//                return;
//            foreach (var item in unknown.Children)
//            {
//                GFEFormatRegion re = item as GFEFormatRegion;
//                if (re != null)
//                    LoadRegions(re, parent, data, pageStart);

//                GFEFormatGRFBlock blk = item as GFEFormatGRFBlock;
//                if (blk != null)
//                    foreach (var child in blk.Children)
//                        ParseContent(parent, child, data, pageStart);

//                GFEFormatUnknown childUnknown = item as GFEFormatUnknown;
//                if (unknown != null)
//                    ParseContent(parent, childUnknown, data, pageStart);
//            }
//        }
//    }
//}

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.FillerService.cs                         </Name>
//    <Description> služba pro zjednodušení práce Filleru                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-02-18                                                  </Created>
//  </FileHeader>

using System;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// služba pro zjednodušení práce Filleru
    /// </summary>
    static class FillerService
    {
        /// <summary>
        /// načtení regionu
        /// </summary>
        /// <param name="grf">formát</param>
        /// <param name="data">data regionu</param>
        /// <param name="pageStart">stránka, na které region začíná</param>
        /// <param name="view">aktuální pohled regionu</param>
        /// <param name="pages">stránky pohledu</param>
        /// <param name="structure">struktura sestavy</param>
        internal static void LoadRegions(GFEFormatGRF grf, DataRegion data, int pageStart, IViewContent view, IPages pages, GFEStructure structure)
        {
            if (structure == null)
                return;

            //loadRegions(reg, null, data, pageStart, view, pages, structure);
            var reg = grf.Root;
            
            //reg.GetStructureItem += reg_GetStructureItem;
            reg.SetStructureItem(structure.Root);

            foreach (var item in reg.Body)
            {
                switch (item)
                {
                    case GFEFormatRegion re:
                        LoadRegions(re, null, data, pageStart, view, pages, structure);
                        continue;
                    case GFEScript script:
                        using (var l_global = data.ScriptManager.PrepareScript(script, "global script", script.ScriptText, null))
                        {
                            data.ScriptManager.RunScript(l_global);
                        }
                        continue;
                }
            }
        }

        internal static ITagComponent CreateAndInitContent(ISizable parent, IPage page, GFEFormatTag item, IDataRegion data, IViewContent view)
        {
            var com = CreateContent(item, view, initialize: false);
            if (com == null) return null;

            if (com is DefaultAbstractContent)
                (com as DefaultAbstractContent).Initialize(item, view, data, page, parent);
            else
                com.Page = page;
            return com;
        }
        internal static ITagComponent CreateContent(GFEFormatTag item, IViewContent view, bool initialize = true)
        {
            dynamic dcu = null;

            if (item is GFEFormatContentText)
                dcu = new DefaultContentText();
            else if (item is GFEFormatContentValue)
                dcu = new DefaultContentValue();
            else if (item is GFEFormatContentChart)
                dcu = new DefaultContentChart();
            else if (item is GFEFormatContentBarcode)
                dcu = new DefaultContentBarcode();
            else if (item is GFEFormatContentDrawing)
                dcu = new DefaultContentDrawing();
            else if (item is GFEFormatContentImage)
                dcu = new DefaultContentImage();
            else if (item is GFEFormatContentSelect)
                dcu = new DefaultContentSelect();
            else if (item is GFEFormatContentPar)
                dcu = new DefaultContentPar();
            else if (item is GFEFormatUnknownContent)
                switch (item.TagName.ToLower())
                {
                    case "button":
                        dcu = new DefaultContentButton();
                        break;
                    case "signature":
                        dcu = new DefaultContentSignature();
                        break;
                    case "attachment":
                        dcu = new DefaultContentAttachment();
                        break;
                    case "grid":
                        dcu = new DefaultContentGrid();
                        break;
                    default:
                        dcu = new DefaultContentUnknown();
                        break;
                }

            if (initialize && dcu != null)
            {
                dcu.Initialize(item, view);
            }
            return dcu;
        }
        static ITagComponent CreateContent(URAbstractContainer parent, GFEFormatTag item, DataRegion data, int pageStart, IViewContent view, IPages pages, GFEStructure structure, bool initialize = true)
        {
            var dcu = CreateContent(item, view, initialize);
            if (dcu != null) return dcu;

            if (item is GFEFormatUnknown unkn)
            {
                var udcu = new DefaultContentUnknown();
                if (initialize) udcu.Initialize(item, view);
                LoadUnknownChildren(unkn, udcu, data, pageStart, view, pages, structure);
                return udcu;
            }
            else if (item is GFEFormatGRFPart part)
            {
                //var prt = new DefaultContentPart();
                //if (initialize) prt.Initialize(item, view);
                LoadUnknownChildren(part, parent, data, pageStart, view, pages, structure);
                return /*prt*/null;

            }

            return null;
        }

        static void LoadUnknownChildren(GFEFormatTag unknown, URAbstractContainer parent, DataRegion data, int pageStart, IViewContent view, IPages pages, GFEStructure structure)
        {
            if (unknown == null || unknown.Children.Count == 0)
                return;
            foreach (var item in unknown.Children)
            {
                if (item is GFEFormatRegion re)
                    LoadRegions(re, parent, data, pageStart, view, pages, structure);
                else if (item is GFEFormatGRFBlock blk)
                    foreach (var child in blk.Children)
                        ParseContent(parent, child, data, pageStart, view, pages, structure);
                else
                    ParseContent(parent, item, data, pageStart, view, pages, structure);
            }
        }
        static bool LoadRegions(GFEFormatRegion reg, URAbstractContainer parent, DataRegion data, int pageStart, IViewContent view, IPages pages, GFEStructure structure)
        {
            //var l_Page = pages[reg.GrfRect.page1 - 1 + pageStart] as DefaultPage;
            if (reg.RunOnlyIf(data, /*l_Page*/ null) == false) return false;

            //reg.GetStructureItem += reg_GetStructureItem;
            reg.SetStructureItem(CommonService.GetRegionFromStructure(structure, reg.DataFullName));

            foreach (var item in reg.Body)
            {
                if (item is GFEFormatRegion re)
                {
                    if (!re.GrfRect.IsEmpty)
                    {
                        var dr = new DataRegion(data, re);
                        var com = new DefaultContentRegion();
                        com.Initialize(item, view);
                        com.Page = pages[item.GrfRect.page1 - 1 + pageStart] as DefaultPage;
                        if (LoadRegions(re, com, dr, pageStart, view, pages, structure))
                            if (parent == null)
                                pages[re.GrfRect.page1 - 1 + pageStart].Add(com);
                            else
                                parent.Add(com);
                    }
                    else
                        LoadRegions(re, parent, data, pageStart, view, pages, structure);
                    continue;
                }

                if (item is GFEFormatGRFBlock blk)
                {
                    foreach (var child in blk.Children)
                        ParseContent(parent, child, data, pageStart, view, pages, structure);
                    continue;
                }

                ParseContent(parent, item, data, pageStart, view, pages, structure);
            }
            return true;
        }
        static void ParseContent(URAbstractContainer parent, GFEFormatTag item, DataRegion data, int pageStart, IViewContent view, IPages pages, GFEStructure structure)
        {
            var grfRect = item.GrfRect;
            if (grfRect.IsEmpty) return; //asi nic?
            var pgNo = Math.Max(0, grfRect.page1 - 1);

            var com = CreateContent(parent, item, data, pageStart, view, pages, structure, initialize: false);
            if (com == null) return;
            var page = pages[pgNo + pageStart] as DefaultPage;

            if (com is DefaultAbstractContent)
                (com as DefaultAbstractContent).Initialize(item, view, data, page, parent == null ? page : parent as ISizable);
            else
                com.Page = page;

            if (parent == null)
                page.Add(com);
            else
                parent.Add(com);
        }

    }
}

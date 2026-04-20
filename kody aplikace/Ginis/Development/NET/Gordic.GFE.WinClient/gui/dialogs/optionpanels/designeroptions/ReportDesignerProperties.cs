//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ReportDesignerProperties.cs            </Name>
//    <Description> Nastaveí aplikace                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Services;
using Gordic.General;
using System;

namespace Gordic.GFE.WinClient.Gui
{
    /// <summary>
    /// Nastaveí aplikace
    /// </summary>
    sealed class ReportDesignerProperties : IGraphicSettingService
    {
        static ReportDesignerProperties mainProperties;
        Property properties, pGrr, pToolTip, pLabels, pDocfrm, pRtf, pMse, pGrf, pGraphics, pAlf;

        /// <summary>
        /// Instance třídy
        /// </summary>
        public static ReportDesignerProperties Instance
        {
            get
            {
                if (mainProperties == null)
                    mainProperties = new ReportDesignerProperties();

                return mainProperties;
            }
        }

        private ReportDesignerProperties()
        {
            LoggingService.Info(GResources.GetResourceText(29451499));
            properties = PropertyService.Get("ReportDesigner.DesignerProperties", new Property());
            pGrr = PropertyService.Get("ReportDesigner.DesignerProperties.Grr", new Property());
            pGrf = PropertyService.Get("ReportDesigner.DesignerProperties.Grf", new Property());
            pToolTip = PropertyService.Get("ReportDesigner.DesignerProperties.ToolTip", new Property());
            pLabels = PropertyService.Get("ReportDesigner.DesignerProperties.Labels", new Property());
            pDocfrm = PropertyService.Get("ReportDesigner.DesignerProperties.Docfrm", new Property());
            pRtf = PropertyService.Get("ReportDesigner.DesignerProperties.Rtf", new Property());
            pAlf = PropertyService.Get("ReportDesigner.DesignerProperties.Alf", new Property());
            pMse = PropertyService.Get("ReportDesigner.DesignerProperties.Mse", new Property());
            pGraphics = PropertyService.Get("ReportDesigner.DesignerProperties.Graphics", new Property());
            ColorService.ServiceInitialized += ColorService_ServiceInitialized;

            CommonService.BorderColorNonactive = ColorService.GetColor(properties.Get("gridcolor", "#A0A0A0"), CommonService.BorderColorNonactive);

            LoggingService.Info(GResources.GetResourceText(29451500));
        }

        #region Application
        /// <summary>
        /// Cesta ke kořenové složce uživatelského nastavení
        /// </summary>
        public string AppRootDataPath
        {
            get => ApplicationHelper.AppRootDataPath;
            //get { return properties.Get("AppDataPath", string.Empty); }
            //set { properties.Set("AppDataPath", value); }
        }
        ///// <summary>
        ///// Cesta ke spouštěčí prohlížeče formulářů
        ///// </summary>
        //public string FillerPath
        //{
        //    get { return properties.Get("FillerPath", string.Empty); }
        //    set { properties.Set("FillerPath", value); }
        //}
        /// <summary>
        /// Cesta k výchozí složce sestav
        /// </summary>
        public string FormationPath
        {
            get => properties.Get("FormationPath", string.Empty);
            set => properties.Set("FormationPath", value);
        }

        /// <summary>
        /// Cesta ke složce s XME soubory
        /// </summary>
        public string XmePath
        {
            get => properties.Get("XmePath", string.Empty);
            set => properties.Set("XmePath", value);
        }

        /// <summary>
        /// Maximální počet naposledy otevřených souborů
        /// </summary>
        public int RecentOpenMaxCount
        {
            get => properties.Get("RecentOpenMaxCount", 10);
            set { properties.Set("RecentOpenMaxCount", value); FileAgent.RecentOpen.SetMaxCount(value); }
        }

        /// <summary>
        /// URI pro GRR, GRF, MSE, atd. sestavy
        /// </summary>
        public string AlfReportXmlns
        {
            get => properties.Get("AlfReportXmlns", "http://www.gordic.cz/TR/alf/1.4/");
            set => properties.Set("AlfReportXmlns", value);
        }

        /// <summary>
        /// URI pro ssr soubory
        /// </summary>
        public string SsrReportXmlns
        {
            get => properties.Get("SsrReportXmlns", "http://www.gordic.cz/TR/ssr/1.0");
            set => properties.Set("SsrReportXmlns", value);
        }

        /// <summary>
        /// VERSION pro GRR, GRF, MSE, atd. sestavy
        /// </summary>
        public string Version
        {
            get => properties.Get("Version", "1.0");
            set => properties.Set("Version", value);
        }
        #endregion

        #region Designer
        /// <summary>
        /// Rozestup mezí stránkami
        /// </summary>
        public int PageSpacing
        {
            get => properties.Get("PageSpacing", 10);
            set => properties.Set("PageSpacing", value);
        }

        /// <summary>
        /// Odstup stránky zlevá
        /// </summary>
        public int PageLeft
        {
            get => properties.Get("PageLeft", 10);
            set => properties.Set("PageLeft", value);
        }

        /// <summary>
        /// Top pozice první stránky
        /// </summary>
        public int FirstPageTop
        {
            get => properties.Get("FirstPageTop", 10);
            set => properties.Set("FirstPageTop", value);
        }

        /// <summary>
        /// Velikost černého průhu na stránce dole (simulace stránky)
        /// </summary>
        public int BottomDark
        {
            get => properties.Get("BottomDark", 3);
            set => properties.Set("BottomDark", value);
        }

        /// <summary>
        /// Velikost černého průhu po prave stráně (simulace stránky)
        /// </summary>
        public int RightDark
        {
            get => properties.Get("RightDark", 3);
            set => properties.Set("RightDark", value);
        }

        #endregion

        #region Grr
        /// <summary>
        /// Výchozí výška řádku
        /// </summary>
        public string GrrDefaultLineHeight
        {
            get => pGrr.Get("DefaultLineHeight", "20px");
            set => pGrr.Set("DefaultLineHeght", value);
        }
        /// <summary>
        /// Výchozí výška textu bez obsahu
        /// </summary>
        public string GrrDefaultTextHeight
        {
            get => pGrr.Get("DefaultTextHeight", "239tw");
            set => pGrr.Set("DefaultTextHeight", value);
        }
        #endregion

        #region ToolTip
        /// <summary>
        /// Indikuje, že nápověda objektu by se měla zobrazovat
        /// </summary>
        public bool ShowToolTip
        {
            get => pToolTip.Get("ShowToolTip", true);
            set => pToolTip.Set("ShowToolTip", value);
        }

        /// <summary>
        /// Indikuje zobrazení skriptů v nápovědě
        /// </summary>
        public bool ShowScripts
        {
            get => pToolTip.Get("ShowScripts", true);
            set => pToolTip.Set("ShowScripts", value);
        }
        /// <summary>
        /// Indikuje zobrazení zarovnání v nápovědě
        /// </summary>
        public bool ShowTextAlign
        {
            get => pToolTip.Get("ShowTextAlign", true);
            set => pToolTip.Set("ShowTextAlign", value);
        }
        /// <summary>
        /// Indikuje zobrazení název písma v nápovědě
        /// </summary>
        public bool ShowTextFont
        {
            get => pToolTip.Get("ShowTextFont", true);
            set => pToolTip.Set("ShowTextFont", value);
        }
        /// <summary>
        /// Indikuje zobrazení velikostí objektu v nápovědě
        /// </summary>
        public bool ShowSize
        {
            get => pToolTip.Get("ShowSize", true);
            set => pToolTip.Set("ShowSize", value);
        }
        /// <summary>
        /// Indikuje zobrazení velikostí objektu v nápovědě
        /// </summary>
        public bool ShowImageSize
        {
            get => pToolTip.Get("ShowImageSize", true);
            set => pToolTip.Set("ShowImageSize", value);
        }
        /// <summary>
        /// Indikuje zobrazení velikostí objektu v nápovědě
        /// </summary>
        public bool ShowTablePadding
        {
            get => pToolTip.Get("ShowTablePadding", true);
            set => pToolTip.Set("ShowTablePadding", value);
        }
        /// <summary>
        /// Indikuje zobrazení proměnných regionu v nápovědě
        /// </summary>
        public bool ShowVariables
        {
            get => pToolTip.Get("ShowVariables", true);
            set => pToolTip.Set("ShowVariables", value);
        }
        /// <summary>
        /// Indikuje, že v případě aktivní bublina nápovědy GRR objektu v nápovědě zobrazovat i Název objektu
        /// </summary>
        public bool ShowNazev
        {
            get => pGrr.Get("ShowNazev", false);
            set => pGrr.Set("ShowNazev", value);
        }
        /// <summary>
        /// Indikuje, že v případě aktivní bublina nápovědy GRR objektu v nápovědě zobrazovat i Úplný název objektu
        /// </summary>
        public bool ShowUplnyNazev
        {
            get => pGrr.Get("ShowUplnyNazev", false);
            set => pGrr.Set("ShowUplnyNazev", value);
        }
        /// <summary>
        /// Indikuje, že v případě aktivní bublina nápovědy GRR objektu v nápovědě zobrazovat i Datový typ objektu
        /// </summary>
        public bool ShowDatovyTyp
        {
            get => pGrr.Get("ShowDatovyTyp", false);
            set => pGrr.Set("ShowDatovyTyp", value);
        }
        /// <summary>
        /// Indikuje zobrazení velikostí objektu v nápovědě
        /// </summary>
        public int Duration
        {
            get => pToolTip.Get("Duration", 5000);
            set => pToolTip.Set("Duration", value);
        }
        /// <summary>
        /// Indikuje zobrazení úplného názvu položky
        /// </summary>
        public bool ShowFullName
        {
            get => pToolTip.Get("ShowFullName", true);
            set => pToolTip.Set("ShowFullName", value);
        }
        /// <summary>
        /// Indikuje zobrazení úplného názvu položky
        /// </summary>
        public bool ShowDescription
        {
            get => pToolTip.Get("ShowDescription", true);
            set => pToolTip.Set("ShowDescription", value);
        }
        /// <summary>
        /// Indikuje zobrazení nadpisu
        /// </summary>
        public bool ShowTitle
        {
            get => pToolTip.Get("ShowTitle", true);
            set => pToolTip.Set("ShowTitle", value);
        }
        #endregion

        #region Labels
        /// <summary>
        /// Indikuje krok mezí štítky
        /// </summary>
        public int StepBetween
        {
            get => pLabels.Get("StepBetween", 5);
            set => pLabels.Set("StepBetween", value);
        }
        /// <summary>
        /// Výchozí velikost štítku
        /// </summary>
        public int DefaultLabelWidth
        {
            get => pLabels.Get("DefaultLabelWidth", 20);
            set => pLabels.Set("DefaultLabelWidth", value);
        }
        /// <summary>
        /// Výchozí velikost skupiny
        /// </summary>
        public int DefaultGroupWidth
        {
            get => pLabels.Get("DefaultGroupWidth", 10);
            set => pLabels.Set("DefaultGroupWidth", value);
        }

        /// <summary>
        /// Výchozí velikost písma štítku skupiny
        /// </summary>
        public int DefaultLabelFontSize
        {
            get => pLabels.Get("DefaultLabelFontSize", 15);
            set => pLabels.Set("DefaultLabelFontSize", value);
        }
        /// <summary>
        /// Výchozí velikost písma štítku skupiny
        /// </summary>
        public int DefaultGroupFontSize
        {
            get => pLabels.Get("DefaultGroupFontSize", 7);
            set => pLabels.Set("DefaultGroupFontSize", value);
        }
        #endregion

        #region Docfrm
        /// <summary>
        /// Název structury
        /// </summary>
        public string DocfrmStructureName
        {
            get => pDocfrm.Get("StructureName", "DOCFORM: " + GResources.GetResourceText(29450453) + "XYZ");  //RC 29450453 : Formulář
            set => pDocfrm.Set("StructureName", value);
        }
        /// <summary>
        /// 
        /// </summary>
        public string DocfrmStructureNote
        {
            get => pDocfrm.Get("StructureNote", "DOCFORM");
            set => pDocfrm.Set("StructureNote", value);
        }
        /// <summary>
        /// Název structury
        /// </summary>
        public string DocfrmStructureIxsAlv
        {
            get => pDocfrm.Get("Struct_IXS_ALV", "0000ALV056IT");
            set => pDocfrm.Set("Struct_IXS_ALV", value);
        }
        /// <summary>
        /// Název structury
        /// </summary>
        public string DocfrmStructureDateFrom
        {
            get => pDocfrm.Get("StructureDateFrom", "200000");
            set => pDocfrm.Set("StructureDateFrom", value);
        }
        /// <summary>
        /// Název structury
        /// </summary>
        public string DocfrmStructureDateTo
        {
            get => pDocfrm.Get("StructureDateTo", "299999");
            set => pDocfrm.Set("StructureDateTo", value);
        }
        /// <summary>
        /// Název structury
        /// </summary>
        public string DocfrmStructureFormationOutput
        {
            get => pDocfrm.Get("StructureFormationOutput", "GFRM");
            set => pDocfrm.Set("StructureFormationOutput", value);
        }
        /// <summary>
        /// 
        /// </summary>
        public string DocfrmWflIxsXme
        {
            get => pDocfrm.Get("WflIxsXme", "0000ALX0AY2Q");
            set => pDocfrm.Set("WflIxsXme", value);
        }
        /// <summary>
        /// 
        /// </summary>
        public string DocfrmWflVla
        {
            get => pDocfrm.Get("WflVla", "0000ALX0AY1V");
            set => pDocfrm.Set("WflVla", value);
        }

        #endregion

        #region ALF
        /// <summary>
        /// indikuje automatické uložení souboru s .alf koncovkou dle uživatelského nastavení
        /// </summary>
        public bool AlfAutoSaveFormat
        {
            get => pAlf.Get("AlfAutoSaveFormat", false);
            set => pAlf.Set("AlfAutoSaveFormat", value);
        }
        /// <summary>
        /// indikuje uložení souboru s .alf koncovkou do souboru s .alf koncovkou
        /// </summary>
        public bool AlfSaveFormatOld
        {
            get => pAlf.Get("AlfSaveFormatOld", true);
            set => pAlf.Set("AlfSaveFormatOld", value);
        }
        /// <summary>
        /// indikuje uložení souboru s .alf koncovkou do souboru s .alfx koncovkou
        /// </summary>
        public bool AlfSaveFormatNew
        {
            get => pAlf.Get("AlfSaveFormatNew", false);
            set => pAlf.Set("AlfSaveFormatNew", value);
        }
        /// <summary>
        /// zobrazit zprávu o uložení sestavy
        /// </summary>
        public bool AlfShowSaveMessage
        {
            get => pAlf.Get("AlfShowSaveMessage", false);
            set => pAlf.Set("AlfShowSaveMessage", value);
        }
        #endregion

        #region Grr
        /// <summary>
        /// Výchozí výška nullových řádků
        /// </summary>
        public string GrrDefaultHiddenHeight
        {
            get => pGrr.Get("GrrDefaultHiddenHeight", "20");
            set => pGrr.Set("GrrDefaultHiddenHeight", value);
        }
        /// <summary>
        /// indikuje automatické přesunutí řádku do určité sekce
        /// </summary>
        public bool GrrAutoMove
        {
            get => pGrr.Get("GrrAutoMove", false);
            set => pGrr.Set("GrrAutoMove", value);
        }
        /// <summary>
        /// indikuje automatické přesunutí řádku do určité sekce
        /// </summary>
        public bool GrrAutoMoveRegion
        {
            get => pGrr.Get("GrrAutoMoveRegion", false);
            set => pGrr.Set("GrrAutoMoveRegion", value);
        }
        /// <summary>
        /// indikuje automatické přesunutí řádku do určité sekce
        /// </summary>
        public bool GrrAutoMoveGroup
        {
            get => pGrr.Get("GrrAutoMoveGroup", false);
            set => pGrr.Set("GrrAutoMoveGroup", value);
        }

        /// <summary>
        /// automatické rozhodnutí nahrazení obsahu buňky když je prázdná
        /// </summary>
        public bool GrrAutoReplaceEmptyCellContent
        {
            get => pGrr.Get("GrrAutoReplaceEmptyCellContent", false);
            set => pGrr.Set("GrrAutoReplaceEmptyCellContent", value);
        }
        /// <summary>
        /// dělení osbahu prázdné buňky
        /// </summary>
        public bool GrrAutoReplaceEmptyCellContentDivide
        {
            get => pGrr.Get("GrrAutoReplaceEmptyCellContentDivide", false);
            set => pGrr.Set("GrrAutoReplaceEmptyCellContentDivide", value);
        }
        /// <summary>
        /// nahrazení obsahu prázdné buňky
        /// </summary>
        public bool GrrAutoReplaceEmptyCellContentReplace
        {
            get => pGrr.Get("GrrAutoReplaceEmptyCellContentReplace", true);
            set => pGrr.Set("GrrAutoReplaceEmptyCellContentReplace", value);
        }

        /// <summary>
        /// automatické rozhodnutí začlenění řádku do vkládaného regionu
        /// </summary>
        public bool GrrAutoIncludeLineContent
        {
            get => pGrr.Get("GrrAutoIncludeLineContent", false);
            set => pGrr.Set("GrrAutoIncludeLineContent", value);
        }
        /// <summary>
        /// automatické rozhodnutí začlenění řádku do vkládaného regionu
        /// vytvoření prázdného regionu nad daným řádkem
        /// </summary>
        public bool GrrAutoIncludeLineContentNewLineBefore
        {
            get => pGrr.Get("GrrAutoIncludeLineContentNewLineBefore", false);
            set => pGrr.Set("GrrAutoIncludeLineContentNewLineBefore", value);
        }
        /// <summary>
        /// automatické rozhodnutí začlenění řádku do vkládaného regionu
        /// vytvoření prázdného regionu nad daným řádkem
        /// </summary>
        public bool GrrAutoIncludeLineContentNewLineAfter
        {
            get => pGrr.Get("GrrAutoIncludeLineContentNewLineAfter", false);
            set => pGrr.Set("GrrAutoIncludeLineContentNewLineAfter", value);
        }
        /// <summary>
        /// automatické rozhodnutí začlenění řádku do vkládaného regionu
        /// začlenění řádku do vkládaného regionu
        /// </summary>
        public bool GrrAutoIncludeLineContentIncludeLine
        {
            get => pGrr.Get("GrrAutoIncludeLineContentIncludeLine", true);
            set => pGrr.Set("GrrAutoIncludeLineContentIncludeLine", value);
        }

        /// <summary>
        /// volba uživatele, ohledně způsobu vložení buňky
        /// </summary>
        public bool GrrAutoInsertCell
        {
            get => pGrr.Get("GrrAutoInsertCell", false);
            set => pGrr.Set("GrrAutoInsertCell", value);
        }
        /// <summary>
        /// volba uživatele, ohledně způsobu vložení buňky
        /// </summary>
        public bool GrrAutoInsertCellEmpty
        {
            get => pGrr.Get("GrrAutoInsertCellEmpty", false);
            set => pGrr.Set("GrrAutoInsertCellEmpty", value);
        }
        /// <summary>
        /// vložení prázdné buňky s kpií formátu vybrané buňky
        /// </summary>
        public bool GrrAutoInsertCellEmptyFormat
        {
            get => pGrr.Get("GrrAutoInsertCellEmptyFormat", false);
            set => pGrr.Set("GrrAutoInsertCellEmptyFormat", value);
        }
        /// <summary>
        /// kopírování obsahu vybrané buňky
        /// </summary>
        public bool GrrAutoInsertCellContent
        {
            get => pGrr.Get("GrrAutoInsertCellContent", true);
            set => pGrr.Set("GrrAutoInsertCellContent", value);
        }

        /// <summary>
        /// volba uživatele, ohledně způsobu vložení řádku
        /// </summary>
        public bool GrrAutoInsertLine
        {
            get => pGrr.Get("GrrAutoInsertLine", false);
            set => pGrr.Set("GrrAutoInsertLine", value);
        }
        /// <summary>
        /// volba uživatele, ohledně způsobu vložení řádku - se vkládá prázdný řádek
        /// </summary>
        public bool GrrAutoInsertLineEmpty
        {
            get => pGrr.Get("GrrAutoInsertLineEmpty", false);
            set => pGrr.Set("GrrAutoInsertLineEmpty", value);
        }
        /// <summary>
        /// volba uživatele, ohledně způsobu vložení řádku - se vkládá kopie řádku vybraného
        /// </summary>
        public bool GrrAutoInsertLineContent
        {
            get => pGrr.Get("GrrAutoInsertLineContent", true);
            set => pGrr.Set("GrrAutoInsertLineContent", value);
        }
        #endregion

        #region Rtf
        /// <summary>
        /// Pauza před provedením další operace (v milisekundach)
        /// </summary>
        public int RtfThreadSleep
        {
            get => pRtf.Get("ThreadSleep", 100);
            set => pRtf.Set("ThreadSleep", value);
        }

        /// <summary>
        /// Automatické vložení regionu
        /// </summary>
        public bool RtfRegAutoInsert
        {
            get => pRtf.Get("RegAutoInsert", false);
            set => pRtf.Set("RegAutoInsert", value);
        }

        /// <summary>
        /// Indikuje automatické vložení hlavičky
        /// </summary>
        public bool RtfRegAutoInsertHead
        {
            get => pRtf.Get("RegAutoInsertHead", false);
            set => pRtf.Set("RegAutoInsertHead", value);
        }

        /// <summary>
        /// Indikuje automatické vložení těla
        /// </summary>
        public bool RtfRegAutoInsertBody
        {
            get => pRtf.Get("RegAutoInsertBody", false);
            set => pRtf.Set("RegAutoInsertBody", value);
        }

        /// <summary>
        /// Indikuje automatické vložení patičky
        /// </summary>
        public bool RtfRegAutoInsertFoot
        {
            get => pRtf.Get("RegAutoInsertFoot", false);
            set => pRtf.Set("RegAutoInsertFoot", value);
        }

        /// <summary>
        /// Indikuje automatické validaci dokumentu po každém vložení
        /// </summary>
        public bool RtfAutoValidateAfterInsert
        {
            get => pRtf.Get("AutoValidateAfterInsert", false);
            set => pRtf.Set("AutoValidateAfterInsert", value);
        }
        //        /// <summary>
        //        /// Indikuje automatické validaci dokumentu po každém vložení
        //        /// </summary>
        //        public bool RtfSectionAfterAsAttribute
        //        {
        //#if DEBUG
        //            get { return pRtf.Get("RtfSectionAfterAsAttribute", false); }
        //#else
        //            get { return false; }
        //#endif
        //            set { pRtf.Set("RtfSectionAfterAsAttribute", value); }
        //        }
        #endregion

        #region Mse
        /// <summary>
        /// Pauza před provedením další operace (v milisekundach)
        /// </summary>
        public int MseThreadSleep
        {
            get => pMse.Get("ThreadSleep", 100);
            set => pMse.Set("ThreadSleep", value);
        }

        /// <summary>
        /// Automatické vložení regionu
        /// </summary>
        public bool MseRegAutoInsert
        {
            get => pMse.Get("RegAutoInsert", false);
            set => pMse.Set("RegAutoInsert", value);
        }

        /// <summary>
        /// Indikuje automatické vložení hlavičky
        /// </summary>
        public bool MseRegAutoInsertHead
        {
            get => pMse.Get("RegAutoInsertHead", false);
            set => pMse.Set("RegAutoInsertHead", value);
        }

        /// <summary>
        /// Indikuje automatické vložení těla
        /// </summary>
        public bool MseRegAutoInsertBody
        {
            get => pMse.Get("RegAutoInsertBody", false);
            set => pMse.Set("RegAutoInsertBody", value);
        }

        /// <summary>
        /// Indikuje automatické vložení patičky
        /// </summary>
        public bool MseRegAutoInsertFoot
        {
            get => pMse.Get("RegAutoInsertFoot", false);
            set => pMse.Set("RegAutoInsertFoot", value);
        }

        /// <summary>
        /// Indikuje automatické validaci dokumentu po každém vložení
        /// </summary>
        public bool MseAutoValidateAfterInsert
        {
            get => pMse.Get("AutoValidateAfterInsert", false);
            set => pMse.Set("AutoValidateAfterInsert", value);
        }
        #endregion

        #region IDesignProperty

        /// <summary>
        /// Výchozí rozlíšení mřížky grf sestav
        /// </summary>
        public string DefaultResolution
        {
            get
            {
                string value = pGrf.Get("DefaultResolution", "5mm");
                if (string.IsNullOrEmpty(value))
                    value = "5mm";

                resolution = new SizeValue(value);
                return value;
            }
            set { pGrf.Set("DefaultResolution", value); resolution = new SizeValue(value); }
        }
        /// <summary>
        /// Výchozí hodnota indikátoru zobrazení mřížky
        /// </summary>
        public bool DefaultShowGrid
        {
            get => pGrf.Get("DefaultShowGrid", true);
            set => pGrf.Set("DefaultShowGrid", value);
        }
        /// <summary>
        /// Výchozí hodnota indikátoru zobrazení řazení
        /// </summary>
        public bool DefaultShowOrder
        {
            get => pGrf.Get("DefaultShowOrder", true);
            set => pGrf.Set("DefaultShowOrder", value);
        }
        /// <summary>
        /// Výchozí hodnota zvětšení
        /// </summary>
        public float DefaultZoom
        {
            get => pGrf.Get("DefaultZoom", 1);
            set => pGrf.Set("DefaultZoom", value);
        }
        /// <summary>
        /// Výchozí hodnota indikátoru zobrazení mřížky
        /// </summary>
        public bool DefaultShowColorOf
        {
            get => pGrf.Get("DefaultShowColorOf", true);
            set => pGrf.Set("DefaultShowColorOf", value);
        }
        /// <summary>
        /// Zaokrouhlení šířky po změně velikosti
        /// </summary>
        public bool AlignWidthResize
        {
            get => pGrf.Get("AlignWidthResize", true);
            set => pGrf.Set("AlignWidthResize", value);
        }
        /// <summary>
        /// Zaokrouhlení výšky po změně velikosti
        /// </summary>
        public bool AlignHeightResize
        {
            get => pGrf.Get("AlignHeightResize", true);
            set => pGrf.Set("AlignHeightResize", value);
        }
        /// <summary>
        /// Zaokrouhlení šířky po tažení objektu
        /// </summary>
        public bool AlignWidthMove
        {
            get => pGrf.Get("AlignWidthMove", true);
            set => pGrf.Set("AlignWidthMove", value);
        }
        /// <summary>
        /// Zaokrouhlení výšky po tažení objektu
        /// </summary>
        public bool AlignHeightMove
        {
            get => pGrf.Get("AlignHeightMove", true);
            set => pGrf.Set("AlignHeightMove", value);
        }

        /// <summary>
        /// Při aplikací formátu se aplikuje i rámeček
        /// </summary>
        public bool ApplyFormatSurround
        {
            get => pGrf.Get("ApplyFormatSurround", true);
            set => pGrf.Set("ApplyFormatSurround", value);
        }
        /// <summary>
        /// Při aplikací formátu se aplikuje i velikost
        /// </summary>
        public bool ApplyFormatSize
        {
            get => pGrf.Get("ApplyFormatSize", true);
            set => pGrf.Set("ApplyFormatSize", value);
        }
        /// <summary>
        /// Při aplikací formátu se aplikuje i textové nastavení
        /// </summary>
        public bool ApplyFormatText
        {
            get => pGrf.Get("ApplyFormatText", true);
            set => pGrf.Set("ApplyFormatText", value);
        }

        SizeValue resolution;
        /// <summary>
        /// Výchozí rozlíšení mřížky grf sestav
        /// </summary>
        public SizeValue Resolution
        {
            get => resolution;
            set => DefaultResolution = value.Value;
        }
        /// <summary>
        /// Získání hodnoty rozlišení z nastavení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání nastavení mřížky</param>
        /// <returns>Hodnota rozlišení</returns>
        public SizeValue GetResolution(IViewContent content)
        {
            return new SizeValue(DefaultResolution);
            //if (content == null)
            //    if (SimpleDesktop.Desktop.ActiveViewContent == null)
            //        return new SizeValue(DefaultResolution);
            //    else content = SimpleDesktop.Desktop.ActiveViewContent;
            //return CommonService.GetResolution(content, DefaultResolution);
        }
        /// <summary>
        /// Nastavení rozlišení
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        public void SetResolution(IViewContent content, SizeValue value)
        {
            DefaultResolution = value.Value;
            //if (content == null)
            //    if (SimpleDesktop.Desktop.ActiveViewContent == null)
            //        return;
            //    else content = SimpleDesktop.Desktop.ActiveViewContent;
            //CommonService.SetResolution(content, value);
        }
        /// <summary>
        /// Nastavení metody reakce na změnu rozlišení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public void AddResolutionChanged(IViewContent content, EventHandler handlerChanged)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            CommonService.AddResolutionChanged(content, handlerChanged);
        }
        /// <summary>
        /// Odstranění metody reakce na změnu rozlišení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public void RemoveResolutionChanged(IViewContent content, EventHandler handlerChanged)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;
            CommonService.RemoveResolutionChanged(content, handlerChanged);
        }

        /// <summary>
        /// Výchozí hodnota indikátoru zobrazení mřížky
        /// </summary>
        public bool ShowGrid
        {
            get => GetShowGrid(SimpleDesktop.Desktop.ActiveViewContent);
            set => SetShowGrid(SimpleDesktop.Desktop.ActiveViewContent, value);
        }
        /// <summary>
        /// Výchozí hodnota indikátoru zobrazení řazení
        /// </summary>
        public bool ShowOrder
        {
            get => GetShowOrder(SimpleDesktop.Desktop.ActiveViewContent);
            set => SetShowOrder(SimpleDesktop.Desktop.ActiveViewContent, value);
        }
        /// <summary>
        /// Get/Set barva mřížky
        /// </summary>
        public string GridColor
        {
            get => properties.Get("gridcolor", ColorService.ColorToHex(CommonService.BorderColorNonactive, false));
            set
            {
                CommonService.BorderColorNonactive = ColorService.GetColor(value, CommonService.BorderColorNonactive);
                properties.Set("gridcolor", ColorService.ColorToHex(CommonService.BorderColorNonactive, false));
            }
        }
        /// <summary>
        /// Get/Set podbarvení datové položky
        /// </summary>
        public string ValueOfColor
        {
            get => properties.Get("valueofcolor", ColorService.ColorToHex(CommonService.ValueOfColor, false)/*"#FFFFE1"*/);
            set
            {
                CommonService.ValueOfColor = ColorService.GetColor(value, CommonService.ValueOfColor);
                properties.Set("valueofcolor", ColorService.ColorToHex(CommonService.ValueOfColor, false));
            }
        }

        /// <summary>
        /// Získání hodnoty ShowGrid z nastavení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání nastavení mřížky</param>
        /// <returns>TRUE  pokud v aktuálním pohledu se má zobrazit mřížka jinak FALSE</returns>
        public bool GetShowGrid(IViewContent content)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return DefaultShowGrid;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            return CommonService.GetShowGrid(content, DefaultShowGrid);
        }
        /// <summary>
        /// Nastavení indikátoru zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        public void SetShowGrid(IViewContent content, bool value)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;
            CommonService.SetShowGrid(content, value);
        }
        /// <summary>
        /// Nastavení metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public void AddShowGridChanged(IViewContent content, EventHandler handlerChanged)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            CommonService.AddShowGridChanged(content, handlerChanged);
        }
        /// <summary>
        /// Odstranění metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public void RemoveShowGridChanged(IViewContent content, EventHandler handlerChanged)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            CommonService.RemoveShowGridChanged(content, handlerChanged);
        }

        /// <summary>
        /// Získání hodnoty ShowGrid z nastavení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání nastavení mřížky</param>
        /// <returns>TRUE  pokud v aktuálním pohledu se má zobrazit mřížka jinak FALSE</returns>
        public bool GetShowOrder(IViewContent content)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return DefaultShowOrder;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            return CommonService.GetShowOrder(content, DefaultShowOrder);
        }
        /// <summary>
        /// Nastavení indikátoru zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        public void SetShowOrder(IViewContent content, bool value)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;
            CommonService.SetShowOrder(content, value);
        }
        /// <summary>
        /// Nastavení metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public void AddShowOrderChanged(IViewContent content, EventHandler handlerChanged)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            CommonService.AddShowOrderChanged(content, handlerChanged);
        }
        /// <summary>
        /// Odstranění metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public void RemoveShowOrderChanged(IViewContent content, EventHandler handlerChanged)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            CommonService.RemoveShowOrderChanged(content, handlerChanged);
        }

        /// <summary>
        /// Výchozí hodnota zvětšení
        /// </summary>
        public float Zoom
        {
            get => GetZoom(SimpleDesktop.Desktop.ActiveViewContent);
            set => SetZoom(SimpleDesktop.Desktop.ActiveViewContent, value);
        }
        /// <summary>
        /// Získání faktoru zvětšení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání faktoru zvětšení</param>
        /// <returns>Hodnota faktoru zvětšení</returns>
        public float GetZoom(IViewContent content)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return DefaultZoom;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            return CommonService.GetZoom(content, DefaultZoom);
        }
        /// <summary>
        /// Nastavení faktoru zvětšení
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        public void SetZoom(IViewContent content, float value)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;
            CommonService.SetZoom(content, value);
        }
        /// <summary>
        /// Nastavení metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public void AddZoomChanged(IViewContent content, EventHandler handlerChanged)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            CommonService.AddZoomChanged(content, handlerChanged);
        }
        /// <summary>
        /// Odstranění metody reakce na změnu faktoru zvětšení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public void RemoveZoomChanged(IViewContent content, EventHandler handlerChanged)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            CommonService.RemoveZoomChanged(content, handlerChanged);
        }

        /// <summary>
        /// Výchozí hodnota indikátoru zobrazení mřížky
        /// </summary>
        public bool ShowColorOf
        {
            get => GetShowColorOf(SimpleDesktop.Desktop.ActiveViewContent);
            set => SetShowColorOf(SimpleDesktop.Desktop.ActiveViewContent, value);
        }
        /// <summary>
        /// Získání hodnoty podbarvení z nastavení pro daný pohled
        /// </summary>
        /// <param name="content">Pohled pro získání nastavení mřížky</param>
        /// <returns>TRUE  pokud v aktuálním pohledu se má zobrazit mřížka jinak FALSE</returns>
        public bool GetShowColorOf(IViewContent content)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return DefaultShowGrid;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            return CommonService.GetShowColorOf(content, DefaultShowColorOf);
        }
        /// <summary>
        /// Nastavení indikátoru podbarvení
        /// </summary>
        /// <param name="content">Pohled, pro který se hodnota nastavuje.
        /// Použij NULL pro aktuální pohled</param>
        /// <param name="value">Nastavovaná hodnota</param>
        public void SetShowColorOf(IViewContent content, bool value)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            CommonService.SetShowColorOf(content, value);
        }
        /// <summary>
        /// Nastavení metody reakce na změnu zobrazení mřížky
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public void AddShowColorOfChanged(IViewContent content, EventHandler handlerChanged)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            CommonService.AddShowColorOfChanged(content, handlerChanged);
        }
        /// <summary>
        /// Odstranění metody reakce na změnu zobrazení podbarvení
        /// </summary>
        /// <param name="content">Pohled, na který se váže metoda</param>
        /// <param name="handlerChanged">Reakční metoda</param>
        public void RemoveShowColorOfChanged(IViewContent content, EventHandler handlerChanged)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            CommonService.RemoveShowColorOfChanged(content, handlerChanged);
        }

        /// <summary>
        /// Uvolnění cach pro daný pohled
        /// </summary>
        /// <param name="content">Pohled</param>
        public void RemoveItem(IViewContent content)
        {
            if (content == null)
                if (SimpleDesktop.Desktop.ActiveViewContent == null)
                    return;
                else content = SimpleDesktop.Desktop.ActiveViewContent;

            CommonService.RemoveItem(content);
        }
        #endregion

        void SetUserColors(object sender, EventArgs e)
        {
            string result = "";
            foreach (var item in ColorService.UserDefineColors)
                result += !string.IsNullOrEmpty(result) ? string.Format(";{0}[{1}]", item, item) : string.Format("{0}[{1}]", item, item);
            pGrf.Set("UserDefineColors", result);
        }
        void ColorService_ServiceInitialized(object sender, EventArgs e)
        {
            Dictionary<string, string> result = new Dictionary<string, string>();
            string values = pGrf.Get("UserDefineColors", "");
            if (!string.IsNullOrEmpty(values))
            {
                string[] keyValues = values.Split(';');
                foreach (string item in keyValues)
                {
                    string key = item.Split('[')[0];
                    if (!result.ContainsKey(key))
                        result.Add(key, item.Substring(key.Length).TrimStart('[').TrimEnd(']'));
                }
            }
            ColorService.AddUserItems(result);
            ColorService.ItemAdded += SetUserColors;
        }

        //Dictionary<string, string> userdefinecolors = new Dictionary<string, string>();
        ///// <summary>
        ///// Seznam uživatelem definovaných barev
        ///// </summary>
        //public Dictionary<string, string> GetUserDefineColors() { return userdefinecolors; }
        ///// <summary>
        ///// Přidání záznamu do seznamu uživatelských barev
        ///// </summary>
        ///// <param name="key">Český název barvy</param>
        ///// <param name="value">Anglický název - dle tohoto názvu se bude volat parser</param>
        //public void AddUserDefineColors(string key, string value)
        //{
        //    if (!userdefinecolors.ContainsKey(key))
        //        userdefinecolors.Add(key, value);
        //    SetUserColors();
        //}

        /// <summary>
        /// počet milisekund čekání při stisknutí tlačítka myši nad objektem
        /// </summary>
        public int ContextMenuMouseDownWaitMiliseconds
        {
            get => pGraphics.Get("ContextMenuMouseDownWaitMiliseconds", 400);
            set => pGraphics.Set("ContextMenuMouseDownWaitMiliseconds", value);
        }
        /// <summary>
        /// TRUE - editace textu se aktivuje po stisknutí F2
        /// </summary>
        public bool F2Activation
        {
            get => pGraphics.Get("F2Activation", false);
            set => pGraphics.Set("F2Activation", value);
        }


        #region Tab Visibility
        /// <summary>
        /// indikuje viditelnost záložky Návrh/Design
        /// </summary>
        public bool TabVisibilityDesign
        {
            get => properties.Get("TabVisibilityDesign", true);
            set => properties.Set("TabVisibilityDesign", value);
        }
        /// <summary>
        /// indikuje viditelnost záložky Kód
        /// </summary>
        public bool TabVisibilityCode
        {
            get => properties.Get("TabVisibilityCode", true);
            set => properties.Set("TabVisibilityCode", value);
        }
        /// <summary>
        /// indikuje viditelnost záložky Kód
        /// </summary>
        public bool TabVisibilityTree
        {
            get => properties.Get("TabVisibilityTree", true);
            set => properties.Set("TabVisibilityTree", value);
        }
        /// <summary>
        /// index výchozího pohledu sestavy
        /// </summary>
        public int TabDefaultViewIndex
        {
            get => properties.Get("TabDefaultViewIndex", 0);
            set => properties.Set("TabDefaultViewIndex", value);
        }

        #endregion

        #region Optimalizace ALF výstupu RTF sestav
        /// <summary>
        /// sekci 'themedata' výnechat z výstupu
        /// </summary>
        public bool RtfOpt_themedata
        {
            get => properties.Get("themedata", true);
            set => properties.Set("themedata", value);
        }

        /// <summary>
        /// sekci 'datastore' výnechat z výstupu
        /// </summary>
        public bool RtfOpt_datastore
        {
            get => properties.Get("datastore", true);
            set => properties.Set("datastore", value);
        }

        /// <summary>
        /// sekci 'colorschememapping' výnechat z výstupu
        /// </summary>
        public bool RtfOpt_colorschememapping
        {
            get => properties.Get("colorschememapping", true);
            set => properties.Set("colorschememapping", value);
        }

        /// <summary>
        /// sekci 'latentstyles' výnechat z výstupu
        /// </summary>
        public bool RtfOpt_latentstyles
        {
            get => properties.Get("latentstyles", true);
            set => properties.Set("latentstyles", value);
        }

        /// <summary>
        /// sekci 'shprslt' výnechat z výstupu
        /// </summary>
        public bool RtfOpt_shprslt
        {
            get => properties.Get("shprslt", true);
            set => properties.Set("shprslt", value);
        }

        #endregion
        /// <summary>
        /// vkládání nápovědných komentářů
        /// </summary>
        public bool RtfOpt_comments
        {
            get => properties.Get("helpComments", true);
            set => properties.Set("helpComments", value);
        }
    }
}
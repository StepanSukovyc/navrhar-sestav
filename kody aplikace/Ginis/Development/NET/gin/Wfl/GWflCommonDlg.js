//(function ($) {
//    namespace("Gordic.Wfl.GWflCommonDlg", {

//        //#region Vyhodnocování ikonek podle stavu

//        //Vraceni ikonky a tooltipu pro související dokumenty
//        gridIcoSouvisejiciDokumentyOznaceniProEPK: function (priz_epk) {
//            if (priz_epk === 1) {
//                return {
//                    img: "fa-user"/*["gi-arrow  gi-stack-fw gi-stack-pos--lt ", "gi-tick  gi-stack-fw gi-stack-pos--rt", "fa-user gi-stack-fw gi-stack-pos--lb"]*/, tooltip: "jres:31926026" };  //RC 31926026 : Označeno pro EPK/schvalovací proces uživatelsky.
//            } else if (priz_epk === 2) {
//                return { img: "fa-cogs" /*["gi-arrow  gi-stack-fw gi-stack-pos--lt", "gi-tick  gi-stack-fw gi-stack-pos--rt", "fa-cogs gi-stack-fw gi-stack-pos--lb"]*/, tooltip: "jres:31926027" };  //RC 31926027 : Označeno pro EPK/schvalovací proces systémově.
//            } else {
//                return null;
//            }
//        },

//        //Vraceni ikonky a tooltipu pro související dokumenty
//        gridIcoSouvisejiciDokumentySmer: function (smer) {
//            if (smer === "<") {
//                return { img: "gi-arrow-down gi-rot90", tooltip: "" };
//            } else if (smer === ">") {
//                return { img: "gi-arrow-down gi-rot270", tooltip: "" };
//            } else {
//                return null;
//            }
//        },

//        getKPodepsaniIcon: function (markedForSigning) {
//            switch (markedForSigning) {
//                case 0: return null;
//                case 1: return { icon: "gi-epk |fa-arrow-right g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw", tooltip: "jres:31926026" }; //RC 31926026 : Označeno pro EPK/schvalovací proces uživatelsky.
//                case 2: return { icon: "gi-epk |fa-arrow-right g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw", tooltip: "jres:31926027" }; //RC 31926027 : Označeno pro EPK/schvalovací proces systémově.
//                default: return null;
//            }
//        },
     
//        //#region ikonky dokumentu do gridu 
//        /// <summary>Přidá povinné sloupce pro seznamy dokladů
//        /// Pozor - jako názvy sloupců se používají následující ("xxxxxx123", "yyyyyy456", "zzzzzz789")</summary>
//        AddGfCommonColumns: function (gridFormat, TypAg, IxsFun, light) {
//            var that = this;
//            gridFormat
//                .addIconColumn(Gordic.Wfl.Globals.ListSupport.DokumentFyzickyColumn(TypAg))
//                .addIconColumn(Gordic.Wfl.Globals.ListSupport.EleColumn())
//                .addIconColumn(Gordic.Wfl.Globals.ListSupport.VlastnictviARedistribuceColumn(IxsFun, light));
            
//        },
//        AddDokumentyColumnsDlg: function (gridFormat, extendObj) {
//            var that = this;
//            Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(extendObj.columnListObj);
//            if (extendObj && extendObj.isTreeMode) {
//                gridFormat
//                    .addStructureColumn(Gordic.Wfl.Globals.ListSupport.TypEntityColumnDlg(extendObj));
//            } else {
//                gridFormat
//                    .addIconColumn(Gordic.Wfl.Globals.ListSupport.TypEntityColumnDlg(extendObj));
//            }
//            gridFormat
//                //.addIconColumn(Gordic.Wfl.Globals.ListSupport.VlastnictviDoruceniColumnDlg(extendObj))
//                .addIconColumn(Gordic.Wfl.Globals.ListSupport.TechnickeVlastnostiColumnDlg(extendObj))
//                .addIconColumn(Gordic.Wfl.Globals.ListSupport.PoziceSpisColumnDlg(extendObj))
//                .addIconColumn(Gordic.Wfl.Globals.ListSupport.StavZpracovaniColumnDlg(extendObj))
//                .addIconColumn(Gordic.Wfl.Globals.ListSupport.TerminIcoColumnDlg(extendObj))

//                .addIconColumn(Gordic.Wfl.Globals.ListSupport.TerminDilciIcoColumnDlg(extendObj))
            
//                ;
//            if (extendObj && !extendObj.withoutDoplnujiciInformace) {
//                gridFormat.addTextColumn(Gordic.Wfl.Globals.ListSupport.DoplnujiciInformaceColumnDlg(extendObj));
//            } 
//        },
//        AddSSDDokumentyColumnsDlg: function (gridFormat, extendObj) {
//            var that = this;

//            if (extendObj && extendObj.isTreeMode) {
//                gridFormat
//                    .addStructureColumn(Gordic.Wfl.Globals.ListSupport.TypEntityColumnDlg(extendObj));
//            } else {
//                gridFormat
//                    .addIconColumn(Gordic.Wfl.Globals.ListSupport.TypEntityColumnDlg(extendObj));
//            }

//            gridFormat
//                //.addIconColumn(Gordic.Wfl.Globals.ListSupport.VlastnictviDoruceniColumnDlg(extendObj))
//                .addIconColumn(Gordic.Wfl.Globals.ListSupport.TechnickeVlastnostiColumnDlg(extendObj))
//                .addIconColumn(Gordic.Wfl.Globals.ListSupport.PoziceSpisColumnDlg(extendObj))
//                .addIconColumn(Gordic.Wfl.Globals.ListSupport.StavZpracovaniColumnDlg(extendObj))
//                .addIconColumn(Gordic.Wfl.Globals.ListSupport.TerminColumnDlg(extendObj))

//                //.addIconColumn(Gordic.Wfl.Globals.ListSupport.TerminDilciColumnDlg(extendObj)) // pro SSD odebráno

//                .addTextColumn(Gordic.Wfl.Globals.ListSupport.DoplnujiciInformaceColumnDlg(extendObj))
//                ;
//        },
//        AddDokumentySimpleColumnsDlg: function (gridFormat, extendObj) { // pouziva se u stare metodiky SSL
//            var that = this;

//            gridFormat
//                .addIconColumn(Gordic.Wfl.Globals.ListSupport.TypEntityColumnDlg(extendObj))
//                //.addIconColumn(Gordic.Wfl.Globals.ListSupport.VlastnictviDoruceniColumnDlg(extendObj))
//                .addIconColumn(Gordic.Wfl.Globals.ListSupport.TechnickeVlastnostiColumnDlg(extendObj))
//               // .addIconColumn(Gordic.Wfl.Globals.ListSupport.PoziceSpisColumnDlg(extendObj))
//                .addIconColumn(Gordic.Wfl.Globals.ListSupport.StavZpracovaniColumnDlg(extendObj))
//              //  .addIconColumn(Gordic.Wfl.Globals.ListSupport.TerminIcoColumnDlg(extendObj))

//                .addIconColumn(Gordic.Wfl.Globals.ListSupport.TerminDilciIcoColumnDlg(extendObj))

//                .addTextColumn(Gordic.Wfl.Globals.ListSupport.DoplnujiciInformaceColumnDlg(extendObj))
//                ;
//        },
//        AddGSouvisejiciDokumentyColumnsDlg: function (gridFormat, extendObj) {
//            var that = this;
//            Gordic.Wfl.GWflCommonDlg.AddDokumentyColumnsDlg(gridFormat, extendObj);
//            gridFormat
//                //.addIconColumn(Gordic.Wfl.Globals.ListSupport.VlastnictviARedistribuceColumn(extendObj.IxsFunEx, extendObj.light));
//                ;

            

//        },

//        //#endregion
        
//        //#endregion
        

//        //#region souvisejiciDokumenty

//        getGridSouvisejiciDokumentKolonky: function (lzeSchvalovaciProces, TypAg, IxsFun, light) {

//            var gridKolonky = new Gordic.Data.GridFormat();

//            Gordic.Wfl.GWflCommonDlg.AddGfCommonColumns(gridKolonky, TypAg, IxsFun, light);

//            if (lzeSchvalovaciProces) {
//                gridKolonky
//                    .addIconColumn({
//                        name: "OznEpk",
//                        caption: "jres:31926017",  //RC 31926017 : Označeno pro EPK / schvalovací proces
//                        //customClass: "center",
//                        width: 40,
//                        //fixedWidth: true,
//                        visible: light ? false : true,
//                        iconTemplate: function (data) {
//                            if (data.priz_epk) {
//                                var objImg = Gordic.Wfl.GWflCommonDlg.gridIcoSouvisejiciDokumentyOznaceniProEPK(data.priz_epk);
//                                if (objImg) {
//                                    return { icon: objImg.img, tooltip: objImg.tooltip };
//                                } else
//                                    return null;
//                            }
//                        }
//                    });
//            }



//            gridKolonky
//                .addIconColumn({
//                    name: "smer",
//                    caption: "jres:31926018", //RC 31926018 : Směr vazby
//                    //customClass: "center",
//                    width: 40,
//                    //fixedWidth: true,
//                    iconTemplate: function (data) {
//                        if (data.smer) {
//                            var objImg = Gordic.Wfl.GWflCommonDlg.gridIcoSouvisejiciDokumentySmer(data.smer);
//                            if (objImg) {
//                                return { icon: objImg.img, tooltip: objImg.tooltip };
//                            } else
//                                return null;
//                        }
//                    }
//                })

//                .addTextColumn({
//                    name: "ixp_vis",
//                    width: 120,
//                    fixedWidth: true,
//                    caption: "jres:26225442", //RC 26225442 : PID
//                })
//                .addTextColumn({
//                    name: "akt_znacka",
//                    caption: "jres:31926019", //RC 31926019 : Zn.
//                    visible: light ? false : true,
//                })
//                .addTextColumn({
//                    name: "poznamka",
//                    caption: "jres:26225465", //RC 26225465 : Poznámka k vazbě
//                    visible: light ? false : true,
//                    editor: { widget: "gstringbox" },
//                })
//                .addTextColumn({
//                    name: "nazev",
//                    caption: "jres:26225466", //RC 26225466 : Věc dokumentu
//                })
//                .addTextColumn({
//                    name: "typ_ag_txt",
//                    caption: "jres:31926020", //RC 31926020 : Navázáno v agendě
//                    visible: light ? false : true,
//                })
//                .addTextColumn({
//                    name: "typ_ag_doc_txt",
//                    caption: "jres:26225467", //RC 26225467 : Typ agendy
//                    visible: light ? false : true,
//                })
//                .addDateTimeColumn({
//                    name: "dat_zmena",
//                    caption: "jres:26225280", //RC 26225280 : Datum změny
//                    visible: light ? false : true,
//                })
//                .addTextColumn({
//                    name: "nazev_rf",
//                    caption: "jres:26225279", //RC 26225279 : Změnu provedl
//                    visible: light ? false : true,
//                })
//                .addTextColumn({
//                    name: "nazev_typ",
//                    caption: "jres:26225479", //RC 26225479 : Typ dokumentu
//                    visible: light ? false : true,
//                })
//                ;
//            return gridKolonky;

//        },

//        getGridSouvisejiciDokumentKolonkyDlg: function (extendObj) { //lzeSchvalovaciProces,TypAgEx, IxsFunEx, light

//            var gridKolonky = new Gordic.Data.GridFormat();

//            Gordic.Wfl.GWflCommonDlg.AddGSouvisejiciDokumentyColumnsDlg(gridKolonky, extendObj);
//            var light = extendObj.light;
//            var allowEpk = extendObj.allowEpk;

//            gridKolonky
//                .addIconColumn({
//                    name: "smer",
//                    caption: "jres:31926018", //RC 31926018 : Směr vazby
//                    //customClass: "center",
//                    width: 40,
//                    //fixedWidth: true,
//                    iconTemplate: function (data) {
//                        if (data.smer) {
//                            var objImg = Gordic.Wfl.GWflCommonDlg.gridIcoSouvisejiciDokumentySmer(data.smer);
//                            if (objImg) {
//                                return { icon: objImg.img, tooltip: objImg.tooltip };
//                            } else
//                                return null;
//                        }
//                    }
//                });

//            if(allowEpk) {
//                gridKolonky.addIconColumn({
//                    name: "OznacenoKPodepsani",
//                    caption: "jres:26227418", //RC 26227418 : Podepsat v EPK
//                    customClass: "center cursor_help",
//                    width: 50,
//                    fixedWidth: true,
//                    iconTemplate: function (row) {
//                        return Gordic.Wfl.GWflCommonDlg.getKPodepsaniIcon(row.priz_epk);
//                    },
//                    sortable: true,
//                });
//            };

//            gridKolonky.addTextColumn({
//                    name: "ixp_vis",
//                    width: 120,
//                    fixedWidth: true,
//                    caption: "jres:26225442", //RC 26225442 : PID
//                })
//                .addTextColumn({
//                    name: "priz_kriz_txt",
//                    fixedWidth: true,
//                    caption: "jres:31926506", //RC 31926506 : Křížový odkaz, vazba
//                })
//                .addTextColumn({
//                    name: "typ_vpp_txt",
//                    fixedWidth: true,
//                    caption: "jres:31926507", //RC 31926507 : Typ vazby
//                })
//                .addTextColumn({
//                    name: "akt_znacka",
//                    caption: "jres:31926019", //RC 31926019 : Zn.
//                    visible: light ? false : true,
//                })

//                .addTextColumn({
//                    name: "poznamka",
//                    caption: "jres:26225465", //RC 26225465 : Poznámka k vazbě
//                    visible: light ? false : true,
//                    editor: { widget: "gstringbox" },
//                })
//                .addTextColumn({
//                    name: "nazev",
//                    caption: "jres:26225466", //RC 26225466 : Věc dokumentu
//                })
//                .addTextColumn({
//                    name: "typ_ag_txt",
//                    caption: "jres:31926020", //RC 31926020 : Navázáno v agendě
//                    visible: light ? false : true,
//                })
//                .addTextColumn({
//                    name: "typ_ag_doc_txt",
//                    caption: "jres:26225467", //RC 26225467 : Typ agendy
//                    visible: light ? false : true,
//                })
//                .addDateTimeColumn({
//                    name: "dat_zmena",
//                    caption: "jres:26225280", //RC 26225280 : Datum změny
//                    visible: light ? false : true,
//                })
//                .addTextColumn({
//                    name: "nazev_rf",
//                    caption: "jres:26225279", //RC 26225279 : Změnu provedl
//                    visible: light ? false : true,
//                })
//                .addTextColumn({
//                    name: "nazev_typ",
//                    caption: "jres:26225479", //RC 26225479 : Typ dokumentu
//                    visible: light ? false : true,
//                })
//                ;
//            return gridKolonky;

//        },

//        sslsspzItemTemplate: function (opt) {

//            var fu = function (row) { 
//                // 24.11.2022 - TFeik
//                // Doplněno zabalení do spanu.
//                var ret = "<span>" +
//                    "<b>" + (row && row.spis_znak ? row.spis_znak.trim() : "") + "</b> " +
//                    "| <i>jres:31926303:</i> " + (row && row.skar_znak ? row.skar_znak.trim() : "") +  //RC 31926303 : SKZ
//                    "| <i>jres:31926304:</i> " + (row && row.skar_lhuta_txt ? row.skar_lhuta_txt.trim() : "") + //RC 31926304 : SKL
//                    "| " + (row && row.nazev ? row.nazev.trim() : "") ;
//                if (opt && opt.poznamkaVisible && row != null && row.poznamka != null && row.poznamka.trim() != "") {
//                    ret = ret + "| <i>Poz:</i> " + row.poznamka.trim();
//                }
//                ret = ret +  "</span>";
                
//                return ret;
//            }
//            return fu;
//        },

//        sslsspzItemTooltipTemplate: function (opt) {
//            debugger
//            return Gordic.Wfl.GWflCommonDlg.sslsspzItemTemplate(opt)
//        },
//        //#endregion
//    }, { pure: true });
//})(jQuery);
(function ($) {
    namespace("Gordic.Ssl.GSslCommonDlg", {

       

        //Vraceni ikonky a tooltipu pro související dokumenty

        getGridColumnsSbernyArch: function (modificationObj) {
            //modificationObj možnosti
            //modificationObj.ZnackaText = "" // text u značky
            //modificationObj.simpleMod = "" // text u značky
            //modificationObj.content
            var gridKolonky = new Gordic.Data.GridFormat();
            Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj);
            gridKolonky.addIconColumn(Gordic.Ssl.Utils.VysledekOperaceIcoColumn(modificationObj.content, modificationObj));

            if (!modificationObj.simpleMod) { 
                Gordic.Wfl.GWflCommonDlg.AddDokumentyColumnsDlg(gridKolonky, {
                    isTreeMode: modificationObj ? modificationObj.isTreeMode : undefined,
                    withoutDoplnujiciInformace: modificationObj ? modificationObj.withoutDoplnujiciInformace : undefined,
                    columnListObj: modificationObj.columnListObj
                });
            }

            var k203Params = Gordic.Gin.WebClient.GK203Handler.GetK203ParamsImmediate();

            Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "obr_1");
            gridKolonky
                .addIconColumn({
                    name: "obr_1", caption: "jres:31937308", //RC 31937308 : Vztah ke spisu
                    customClass: "center cursor_help",
                    width: 30,
                    iconTemplate: function (row) {
                        var obr_1 = "fa-fw";
                        var tooltip = "";
                        if (row.por_cislo !== null && row.por_cislo < 0) {
                            obr_1 = "gi-doc-in-folder";
                            /*
                            [
                                "gi-paper g-state-text",
                                "gi-window-close gi-stack-pos--lb g-state-error g-state-text"
                            ]; //"Wfl/dokument_neaktivni";
                            */
                            tooltip = "jres:31937443"; //RC 31937443 : Přiřazeno ke spisu
                        }
                        else if (row.aktivita !== 100) {
                            obr_1 = "gi-doc-in-folder g-state-text g-state-warning";
                            
                            tooltip = "jres:31937107"; //RC 31937107 : Dokument vyjmut ze spisu
                        } else {
                            switch (row.vztah_spis) {
                                case 10:
                                    obr_1 = [
                                        "gi-paper g-state-text",
                                        "gi-plus_bold gi-stack-pos--lt g-state-success g-state-text"
                                    ]; //"Wfl/dokument_iniciacni";
                                    tooltip = "jres:31937108"; //RC 31937108 : Iniciační dokument
                                    break;
                                case 30:
                                    obr_1 = [
                                        "gi-paper g-state-text",
                                        "gi-schvaleno gi-stack-pos--lb g-state-info g-state-text"
                                    ]; //"Wfl/dokument_vyrizujici";
                                    tooltip = "jres:31937109"; //RC 31937109 : Vyřizující dokument
                                    break;
                                case 31:
                                    obr_1 = [
                                        "gi-paper g-state-text",
                                        "gi-kruh_faze4 gi-stack-pos--rb g-state-info g-state-text"
                                    ]; // "Wfl/dokument_vyrizujici";
                                    tooltip = "jres:31937110"; //RC 31937110 : Iniciační a zároveň vyřizující
                                    break;
                                default:
                                    break;
                            }
                        }
                        return { icon: obr_1, tooltip: tooltip };
                    }
                });
            if (!modificationObj.simpleMod) {
                Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "obr_2");
                gridKolonky.addIconColumn({
                    name: "obr_2", caption: "jres:31937307", //RC 31937307 : Odesláno
                    customClass: "center cursor_help",
                    width: 30,
                    iconTemplate: function (row) {
                        var obr_2 = "fa-fw";
                        var tooltip = "";
                        if (row.odeslano_kam == null) {
                            obr_2 = "fa-fw";
                            tooltip = "";
                        }
                        else {
                            if (typeof row.odeslano_kam === "string" && row.odeslano_kam !== "") {
                                obr_2 = Gordic.Gin.Globals.Icons.Vypraveno().icon;
                                tooltip = row.odeslano_kam;
                                //obr_2 = GSharedPictures.GetIconUrl(GIconResolution.Grid, "ssl/zasilka");
                                //row["ode_dok_click"] = "$.content(this).ShowWinOdeslani('" + row["ixp"] + "');event.cancelBubble=true;";
                            }
                            else {
                                obr_2 = "fa-fw";
                                tooltip = "";
                            }
                        }
                        return { icon: obr_2, tooltip: tooltip };
                    }
                });


            }

            if (!modificationObj.simpleMod) {    
                if (modificationObj.ssl_nev_posepk != 0) {
                    Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "stav_epk_txt");
                    gridKolonky.addTextColumn({
                        name: "stav_epk_txt",
                        caption: "jres:31937240", //RC 31937240 : EPK - stav posledního úkonu
                    });
                }
            }
            if (modificationObj.content && modificationObj.content.globalSettings
            ) {
                Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "uzo");
                gridKolonky.addIconColumn(Gordic.Wfl.Globals.ListSupport.UzoColumn(
                    null,
                    function (row) {
                        if(modificationObj.ssl_uzooznacfun == 0) {
                            return row.ixs_su_akt != modificationObj.IxsSuAkt;
                        } 
                        return row.ixs_fun_akt != modificationObj.IxsFunAkt;
                    },
                    modificationObj.content.globalSettings
                ))
            }
           
            Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "por_cislo");
            gridKolonky.addNumberColumn({
                name: "por_cislo",
                width: modificationObj.simpleMod ? 40 : undefined,
                caption: "jres:26255422", //RC 26255422 : Poř.
            });
            Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "por_cislo_uziv");
            gridKolonky.addNumberColumn({
                name: "por_cislo_uziv",
                width: modificationObj.simpleMod ? 40 : undefined,
                caption: "jres:26256646", //RC 26256646 : Uživatelské pořadové číslo
            });
            Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "akt_znacka");
            gridKolonky.addTextColumn({
                name: "akt_znacka",
                width: modificationObj.simpleMod ? 150 : undefined,
                caption: modificationObj.ZnackaText || "",
            });
            Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "nazev");
            gridKolonky.addTextColumn({
                    name: "nazev",
                    caption: "jres:26255425", //RC 26255425 : Věc
                })
                
            if (!modificationObj.simpleMod) {
                Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "dat_od");
                gridKolonky.addDateColumn({
                    name: "dat_od",
                    caption: "jres:26255424", //RC 26255424 : Vloženo
                });
                Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "ixp");
                gridKolonky
                    .addTextColumn({
                        name: "ixp",
                        caption: "jres:26255423", //RC 26255423 : Identifikátor
                    }); 
                Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "nazev");
                gridKolonky.addTextColumn({
                    name: "nazev",
                    caption: "jres:26255425", //RC 26255425 : Věc
                });
                Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "ixs_typ_txt");
                gridKolonky.addTextColumn({
                    name: "ixs_typ_txt",
                    caption: "jres:26255426", //RC 26255426 : Typ dokumentu
                });
                Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "poznamka");
                gridKolonky.addTextColumn({
                    name: "poznamka",
                    caption: "jres:26255397", //RC 26255397 : Poznámka
                });
                Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "dok_poznamka");
                gridKolonky.addTextColumn({
                    name: "dok_poznamka", // !!!!!!!!!!!!!!!!!!!!!!!!!!!! neni v DTO //  od 26.04.2021 už tam je 
                    caption: "jres:26256680", //RC 26256680 : Poznámka profilu dokumentu
                });
                Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "umisteni_txt");
                gridKolonky.addTextColumn({
                    name: "umisteni_txt",
                    caption: "jres:32170292", //RC 32170292 : Umístění
                });
                Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "dat_zmena");
                gridKolonky.addDateColumn({
                    name: "dat_zmena",
                    caption: "jres:26255404", //RC 26255404 : Datum změny
                });
                Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "dat_pod");
                gridKolonky.addDateTimeColumn({
                    name: "dat_pod",
                    caption: "jres:31937295", //RC 31937295 : Podáno
                });
                Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "dat_do");
                gridKolonky.addDateColumn({
                    name: "dat_do",
                    caption: "jres:26255427", //RC 26255427 : Vyjmuto
                });
                Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "dat_vyriz_do");
                gridKolonky.addDateColumn({
                    name: "dat_vyriz_do",
                    caption: "jres:26255561", //RC 26255561 : Termín vyřízení
                });
                Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "dat_vyriz");
                gridKolonky.addDateColumn({
                    name: "dat_vyriz",
                    caption: "jres:32170285", //RC 32170285 : Datum vyřízení
                });

                if (modificationObj.pouzivatDilciTerminy) {
                    Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "dat_dtermin");
                    gridKolonky.addDateColumn({
                        name: "dat_dtermin",
                        caption: "jres:31937317", //RC 31937317 : Dílčí termín
                        width: 100,
                        // fixedWidth: true,
                    });
                }

                Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "fun_resitel_txt");
                gridKolonky
                    .addTextColumn({
                        name: "fun_resitel_txt",
                        caption: "Zpracovatel", //RC 26255428 : Odesláno kam
                    });
                Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "odeslano_kam");
                gridKolonky.addTextColumn({
                    name: "odeslano_kam",
                    caption: "jres:26255428", //RC 26255428 : Odesláno kam
                });
                Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "zmenu_prov_txt");
                gridKolonky.addTextColumn({
                    name: "zmenu_prov_txt",
                    caption: "jres:26255429", //RC 26255429 : Změnu provedl
                });
                Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "misto_vzniku");
                gridKolonky.addTextColumn({
                    name: "misto_vzniku",
                    caption: "jres:26255430", //RC 26255430 : Odesílatel
                });
                Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "st_utaj_id_txt");
                gridKolonky.addTextColumn({
                    name: "st_utaj_id_txt",
                    caption: "jres:31937281", //RC 31937281 : Přístup
                });
                Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "zp_vyriz");
                gridKolonky.addTextColumn({
                    name: "zp_vyriz",
                    caption: k203Params.gin_n23_vedd == 1 ? "jres:31937570" : "jres:26255431", //RC 31937570 : Vyřízení     //Způsob vyřízení
                });
                Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "zasilek");
                gridKolonky.addTextColumn({
                    name: "zasilek",
                    caption: "jres:31937111", //RC 31937111 : vypraveno/doručeno
                });
                Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "spis_pl");
                if (k203Params.gin_n23_vedd == 1) {
                    /*
                    Naopak chybí nově přebrané z druhu dokumentu:
                        skartační režim(Znak / Lhůta / spouštěcí událost)
                        kontrolní termín
                        */
                    Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "skar_znak_ixs_typ");
                    gridKolonky.addTextColumn({
                        name: "skar_znak_ixs_typ",
                        width: 50,
                        caption: "jres:31937565", //RC 31937565 : Skar. znak (z druhu dokumentu)
                    });
                    Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "skar_lhuta_ixs_typ");
                    gridKolonky.addNumberColumn({
                        name: "skar_lhuta_ixs_typ",
                        width: 50,
                        caption: "jres:31937566", //RC 31937566 : Skar. lhůta (z druhu dokumentu)
                    });
                    Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "nazev_spu_ixs_typ");
                    gridKolonky.addTextColumn({
                        name: "nazev_spu_ixs_typ",
                        caption: "jres:31937567", //RC 31937567 : Spouštěcí událost (z druhu dokumentu)
                    });
                    Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "ktg_spu_ixs_typ");
                    gridKolonky.addNumberColumn({
                        name: "ktg_spu_ixs_typ",
                        width: 50,
                        caption: "jres:31937568", //RC 31937568 : Kategorie spouštěcí události (z druhu dokumentu)
                    });
                } else {
                    gridKolonky.addTextColumn({
                        name: "spis_pl",
                        width: 60,
                        caption: "jres:26255612", //RC 26255612 : Spis. pl.
                    });
                    Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "spis_znak");
                    gridKolonky.addTextColumn({
                        name: "spis_znak",
                        width: 60,
                        caption: "jres:26255613", //RC 26255613 : Spis. znak
                        filter: [new Gordic.Wfl.Utils.GTextFilterFullTextStartsWithAndUseCommaForDot("spis_znak"), new Gordic.Data.Filters.GSelectionFilterVariant("spis_znak", { columnName: "spis_znak", columnType: "text" })]
                    });
                    Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "skar_znak");
                    gridKolonky.addTextColumn({
                        name: "skar_znak",
                        width: 50,
                        caption: "jres:31937309", //RC 31937309 : Skar. znak (dle spisového plánu a znaku)
                    });
                    Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "skar_lhuta");
                    gridKolonky.addNumberColumn({
                        name: "skar_lhuta",
                        width: 50,
                        caption: "jres:31937310", //RC 31937310 : Skar. lhůta (dle spisového plánu a znaku)
                    });
                    Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "skar_znak2");
                    gridKolonky.addTextColumn({
                        name: "skar_znak2",
                        width: 50,
                        caption: "jres:31937311", //RC 31937311 : Skar. znak
                    });
                    Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "skar_lhuta2");
                    gridKolonky.addNumberColumn({
                        name: "skar_lhuta2",
                        width: 50,
                        caption: "jres:31937312", //RC 31937312 : Skar. lhůta
                    });
                }
                Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "sp_zn_odes");
                gridKolonky.addTextColumn({
                    name: "sp_zn_odes",
                    caption: "jres:31937313", //RC 31937313 : Sp.Zn. odesílatele
                });

                gridKolonky.addNumberColumn({
                    name: "zas_vyprav",
                    width: 50,
                    caption: "jres:31937444", //RC 31937444 : Zásilky vypraveno
                });

                gridKolonky.addNumberColumn({
                    name: "zas_doruc",
                    width: 50,
                    caption: "jres:31937445",  //RC 31937445 : Zásilky doručeny
                });

              
            }
            return gridKolonky;
        },

        getGridColumnsObsahTS: function (modificationObj) {
            var gridKolonky = new Gordic.Data.GridFormat();

            Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj);
            gridKolonky.addIconColumn(Gordic.Ssl.Utils.VysledekOperaceIcoColumn(modificationObj.content, modificationObj));

            gridKolonky
                .addStructureColumn(Gordic.Wfl.Globals.ListSupport.TypEntityColumnDlg(modificationObj));  

            gridKolonky.addIconColumn(Gordic.Wfl.Globals.ListSupport.StavZpracovaniColumnDlg(modificationObj));
            Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "stav_pis");


            Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "ixp");
            gridKolonky
                .addTextColumn({
                    name: "ixp",
                    caption: "jres:26255423", //RC 26255423 : Identifikátor
                    width: 120,
                });

            Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "akt_znacka");
            gridKolonky.addTextColumn({
                name: "akt_znacka",
                width: modificationObj.simpleMod ? 150 : undefined,
                caption: modificationObj.ZnackaText || "",
                width: 150,
            });

            Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "nazev");
            gridKolonky.addTextColumn({
                name: "nazev",
                caption: "jres:26257349", //RC 26257349 : Věc/název
                width: 300,
            });

            Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "vsk_nazev");
            gridKolonky.addTextColumn({
                name: "vsk_nazev",
                caption: "jres:26257222", //RC 26257222 : Věcná skupina - Název
                width: 300,
            });

            Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "vsk_spis_znak");
            gridKolonky.addTextColumn({
                name: "vsk_spis_znak",
                caption: "jres:26257223", //RC 26257223 : Věcná skupina - Spis. znak
                width: 190,
                tooltipTemplate: (value) => {
                    return value.vsk_spis_znak;
                },
            });

            Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "vsk_skar_znak");
            gridKolonky.addTextColumn({
                name: "vsk_skar_znak",
                caption: "jres:26257265", //RC 26257265 : Skar. znak
                width: 30,
            });

            Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "vsk_skar_lhuta");
            gridKolonky.addNumberColumn({
                name: "vsk_skar_lhuta",
                caption: "jres:26257266", //RC 26257266 : Skar. lhůta
                width: 30,
            });

            Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "dat_zmena");
            gridKolonky.addDateColumn({
                name: "dat_zmena",
                caption: "jres:26255404", //RC 26255404 : Datum změny
            });

            Gordic.Wfl.Globals.ListSupport.RozsirNeboInicializujColumnList(modificationObj.columnListObj, "zmenu_prov_txt");
            gridKolonky.addTextColumn({
                name: "zmenu_prov_txt",
                caption: "jres:26255429", //RC 26255429 : Změnu provedl
            });

            return gridKolonky;
        },

        getGridColumnSSLVzory: function () {
            /**
             * Creates format for grid - DS.
             * 
             * @returns {Gordic.Data.GridFormat} grid format
             */
            return new Gordic.Data.GridFormat()
                .addTextColumn({
                    name: "Ixp",
                    caption: "jres:31937145" //RC 31937145 : Pid
                })
                .addTextColumn({
                    name: "AktZnacka",
                    caption: "jres:32000048" //RC 32000048 : Značka
                })
                //if componentDto.CjExtVisible
            
                .addTextColumn({ // spis
                    name: "Cj",
                    caption: "jres:26256768", //RC 26256768 : Spisová značka
                })

                .addTextColumn({
                    name: "CjExt",
                    caption: "",
                })
                //endif
                .addTextColumn({
                    name: "Nazev",
                    caption: "jres:26255425", //RC 26255425 : Věc
                })

                .addDateColumn({ // spis
                    name: "DatPrijPod",
                    caption: "jres:31937113" //RC 31937113 : Dat.pod.inic.
                })
                .addTextColumn({ // spis
                    name: "ZnackaOdes",
                    caption: "jres:26255731", //RC 26255731 : Značka odes.
                })

                //if componentDto.CjZnVisible
                .addTextColumn({
                    name: "CjZn",
                    caption: "CjZn", //componentDto.CjZnLabelText
                })
                .addNumberColumn({
                    name: "PorSpis",
                    caption: "",
                })
                //endif

                .addTextColumn({
                    name: "TypAgTxt",
                    caption: "jres:26255365" //RC 26255365 : Agenda
                })
                .addTextColumn({
                    name: "ExtId",
                    caption: "jres:26256529" //RC 26256529 : Ext. Id
                })
                .addTextColumn({
                    name: "NazevSchval",
                    caption: "jres:26255826" //RC 26255826 : Schvalovatel
                })
                .addTextColumn({
                    name: "NazevResitel",
                    caption: "jres:26255517" //RC 26255517 : Zpracovatel
                })
                .addTextColumn({
                    name: "IxsFunAktText",
                    caption: "jres:26256770" //RC 26256770 : Vlastnik
                })

                //profil
                .addTextColumn({
                    name: "EsuText",
                    caption: "jres:26255430" //RC 26255430 : Odesílatel
                })
                .addTextColumn({
                    name: "MistoVzniku",
                    caption: "jres:26255730" //RC 26255730 : Místo vzniku
                })
                .addTextColumn({
                    name: "ObsahText",
                    caption: "jres:26255458" //RC 26255458 : Věc podrobně
                })

                .addTextColumn({
                    name: "Poznamka",
                    caption: "jres:26255397" //RC 26255397 : Poznámka
                })
                .addTextColumn({
                    name: "IxstTypText",
                    caption: "jres:26255426" //RC 26255426 : Typ dokumentu
                })
                .addTextColumn({
                    name: "UmisteniText",
                    caption: "jres:26255482" //RC 26255482 : Umístění
                })
                .addTextColumn({
                    name: "SpisPl",
                    caption: "jres:26255820" //RC 26255820 : Spisový znak
                })
                .addTextColumn({
                    name: "SpisZnak",
                    caption: ""
                })
                .addTextColumn({
                    name: "StUtajIdWflText",
                    caption: "jres:26255496" //RC 26255496 : Přístup
                })
                //.addDateColumn({
                //    name: "TerminDate",
                //    caption: "Termín"
                //})
                //.addTextColumn({
                //    name: "TerminDuvod",
                //    caption: ""
                //})
                .addDateColumn({
                    name: "DatPodano",
                    caption: "jres:26255493" //RC 26255493 : Podáno
                })
                .addDateColumn({
                    name: "DatEvidovano",
                    caption: "jres:26255494" //RC 26255494 : Evidováno
                })
                .addDateColumn({
                    name: "DatVyrizeno",
                    caption: "jres:26255357" //RC 26255357 : Vyřízeno
                })
                
                ;            
        },
        
    }, { pure: true });
})(jQuery);
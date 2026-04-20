(function ($) {
    "use strict";
    namespace("Gordic.Maj.WebClient.GKartyJsGrid", {  //  { dlg_MajMajMud }
        //data: {}
        onContentReady: function () {
            
            console.log("Gordic.Maj.WebClient.GKartyJsGrid.onContentReady", this);
            
            var that = this;

            //=================
            // AKCE
            //=================

            var actKarta = new GAction({
                name: "actKarta",
                caption: "jres:24534244", //RC 24534244 : Karta
                icon: "gi-file",
                run: function () {
                    var selectedKrt = $grid.ggrid("getSelection")[0];

                    if (selectedKrt === undefined) {
                        GDlg.alert("Vyberte záznam");
                    }
                    else {
                        that.navigate("Gordic.Maj.WebClient.GMajKarta", {
                            IxsMaj: selectedKrt.ixs_maj,
                            SkupinaId: selectedKrt.skupina_id,
                            DrhId: selectedKrt.drh_id
                        });
                    } // end if-else
                }
            });

            //===============================================

            actKarta.enabled(this.cvActKartaEnabled);

            //===============================================
            // MENU
            //===============================================


            //this.menuBar([
            //    {
            //        action: actKarta,
            //        favorite: true
            //    }               
            //]);
           
            
            //============================================
            //LK20170110_1, vytvoreni gridu + definice
            //============================================

            var colWidthIcon = 25;
            var colWidthSmall = 40;
            var colWidth3Char = 55;
            var colWidthSuAu = 80;
            var colWidthAc = 85;
            var colWidthDate = 90;
            var colWidthShortText = 100;
            var colWidthMoney = 110;
            var colWidthPid = 115;
            var colWidthDateTime = 140;
            var colWidthEsuTxt = 150;
            var colWidthLongText = 250; 


            var $grid = $("<div class='js-mujGrid'>")
                
                .gautofit()
                .appendTo(this.element)
                .ggrid({
                    columnMode: "full",     // fit (defaultne by melo byt toto), full
                    data:this.data,
                    defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                        name: "gridRowSelectedAct",
                        run: function (ev, ctx) {
                            //data, ze kterych byl vytvoren radek
                            var row = ctx.cellInfo.data;
                            // volání detailu
                            //that.navigate('Gordic.Maj.WebClient.GMajKarta', {
                            //    IxsMaj: row.ixs_maj,
                            //    SkupinaId: row.skupina_id,
                            //    DrhId: row.drh_id                                
                            //});
                        }
                    }),                                     
                    //==========================================================
                    // SLOUPCE GRIDU  { ctbl_MajMaj } - t.j. stejná data jako v kartotéce
                    //==========================================================
                    columns: new Gordic.Data.GridFormat()

                        .addTextColumn({
                            name: "skupina_zkr",  // Skupina
                            caption: that.cvColSkupTitle,
                            description: that.cvColSkupTitle,
                            width: 75,
                            hidden: that.cvColSkupHide
                        })
                        .addTextColumn({
                            name: "drh_zkr",   // Druh
                            caption: that.cvColDrhTitle,
                            description: that.cvColDrhTitle,
                            width: 65,
                            hidden: that.cvColDrhHide
                        })
                        .addTextColumn({
                            name: "dev_zkr",
                            caption: that.cvColDevTitle,
                            description: "jres:24534045", //RC 24534045 : Druh evidence
                            width: colWidth3Char,
                            hidden: that.cvColDevHide
                        })
                        .addTextColumn({
                            name: "tka_zkr",
                            caption: that.cvColTkaTitle,
                            description: "jres:24534088", //RC 24534088 : Typ karty
                            width: colWidthSmall,
                            hidden: that.cvColTkaHide,
                            cellTemplate: function (data, metarow, info) {
                                var text = "";
                                var tooltip = "";
                                var customClass = "";
                                var font = "font-weight: bold;";
                                switch (data.tka) {
                                    case 0:
                                        text = "";
                                        tooltip = "";
                                        break;
                                    case 10:
                                        text = "";
                                        tooltip = "";
                                        break;
                                    case 20:
                                        text = data.tka_zkr;
                                        tooltip = "Soubor"; // TODO: dotáhnout lokalizovaně z DB
                                        break;
                                    case 30:
                                        text = data.tka_zkr;
                                        tooltip = "Prvek soupravy"; // TODO: dotáhnout lokalizovaně z DB
                                        //customClass = "g-state-inactive g-state-text";
                                        break;
                                    default: throw "tka = " + data.tka + " - nepodporovaná hodnota";
                                }
                                return $("<span>", { text: text, title: tooltip, "class": customClass, "style": font });
                            }
                        })
                        .addTextColumn({
                            name: "tev_zkr",
                            caption: that.cvColTevTitle,
                            description: "jres:24534091", //RC 24534091 : Typ evidence
                            width: colWidthSmall,
                            hidden: that.cvColTevHide,
                            cellTemplate: function (data, metarow, info) {
                                var text = "";
                                var tooltip = "";
                                var customClass = "";
                                var font = ""; // "font-weight: bold;";
                                switch (data.tev) {
                                    case 0:
                                        text = "";
                                        tooltip = "";
                                        break;
                                    case 10:
                                        text = data.tev_zkr;
                                        tooltip = "Účetní"; // TODO: dotáhnout lokalizovaně z DB
                                        break;
                                    case 20:
                                        text = data.tev_zkr;
                                        tooltip = "Operativní"; // TODO: dotáhnout lokalizovaně z DB
                                        //customClass = "g-state-error g-state-text";
                                        break;
                                    default: throw "tev = " + data.tev + " - nepodporovaná hodnota";
                                }
                                return $("<span>", { text: text, title: tooltip, "class": customClass, "style": font });
                            }
                        })
                        .addTextColumn({
                            name: "mat_akt_txt",
                            caption: "jres:24534325", //RC 24534325 : Stav
                            description: "jres:24534325",
                            width: colWidthShortText - 10,
                            cellTemplate: function (data, metarow, info) {
                                var text = "";
                                var tooltip = "";
                                var customClass = "";
                                var font = ""; // "font-weight: bold;";
                                switch (data.mat_akt) {
                                    case 0:
                                        text = "";
                                        tooltip = ""; // neurčeno
                                        break;
                                    case 10:
                                        text = "Návrh"; // TODO: dotáhnout lokalizovaně z DB
                                        tooltip = text;
                                        break;
                                    case 18:
                                        text = "V pořízení"; // TODO: dotáhnout lokalizovaně z DB
                                        tooltip = text;
                                        break;
                                    case 20:
                                        text = "Evidence"; // TODO: dotáhnout lokalizovaně z DB
                                        tooltip = text;
                                        break;
                                    case 30:
                                        text = "Vyřazeno"; // TODO: dotáhnout lokalizovaně z DB
                                        tooltip = text;
                                        break;
                                    case 35:
                                        text = "Vydáno"; // TODO: dotáhnout lokalizovaně z DB
                                        tooltip = text;
                                        break;
                                    case 40:
                                        text = "Storno"; // TODO: dotáhnout lokalizovaně z DB
                                        tooltip = text;
                                        break;
                                    default: throw "mat_akt = " + data.mat_akt + " - nepodporovaná hodnota";
                                }
                                return $("<span>", { text: text, title: tooltip, "class": customClass, "style": font });
                            }
                        })
                        .addTextColumn({
                            name: "inv_cis",
                            caption: that.cvColInvCisTitle,
                            description: "jres:24534058", //RC 24534058 : Inventární číslo
                            width: colWidthAc,
                            hidden: that.cvColInvCisHide
                        })
                        .addTextColumn({
                            name: "mat_cis",
                            caption: that.cvColMatCisTitle,
                            description: "jres:24534060", //RC 24534060 : Materiálové číslo
                            width: colWidthPid - 10,
                            hidden: that.cvColMatCisHide
                        })
                        .addTextColumn({
                            name: "skp",
                            caption: that.cvColSkpTitle,
                            description: that.cvColSkpTitle, //RC 24534093 : Klasifikace                            
                            width: colWidthPid - 10,
                            hidden: that.cvColSkpHide
                        })
                        .addTextColumn({
                            name: "nazev",
                            caption: that.cvColNazevTitle,
                            description: that.cvColNazevTitle, //RC 24534099 : Technický název
                            width: 270,
                            hidden: that.cvColNazevHide
                        })
                        .addTextColumn({
                            name: "ueab_evi",
                            caption: that.cvColUeabEviTitle,
                            description: that.cvColUeabEviTitle, //RC 24534094 : SuAu evi                            
                            width: colWidthSuAu,
                            hidden: that.cvColUeabEviHide
                        })
                        .addCurrencyColumn({
                            name: "pmj",
                            format: "N:3",
                            caption: that.cvColPmjTitle,
                            description: that.cvColPmjTitle, //RC 24534095 : Počet MJ
                            width: colWidthAc - 10,
                            hidden: that.cvColPmjHide
                        })
                        .addCurrencyColumn({
                            name: "c",
                            caption: that.cvColCTitle,
                            description: that.cvColCTitle, //RC 24534096 : Účetní cena
                            width: colWidthMoney,
                            hidden: that.cvColCHide
                        })
                        .addCurrencyColumn({
                            name: "cmj",
                            caption: that.cvColCMjTitle,
                            description: that.cvColCMjTitle, //RC 24534097 : Cena za MJ
                            width: colWidthMoney,
                            hidden: that.cvColCMjHide
                        })
                        .addCurrencyColumn({
                            name: "pmj_min",
                            format: "N:3",
                            caption: that.cvColPmjMinTitle,
                            description: that.cvColPmjMinTitle,  //RC 24534101 : Min. počet
                            width: colWidthAc - 10,
                            hidden: that.cvColPMjMinHide
                        })
                        .addCurrencyColumn({
                            name: "pmj_max",
                            format: "N:3",
                            caption: that.cvColPmjMaxTitle,
                            description: that.cvColPmjMaxTitle, //RC 24534120 : Max. počet
                            width: colWidthAc - 10,
                            hidden: that.cvColPMjMaxHide
                        })
                        .addCurrencyColumn({
                            name: "pmj_res",
                            format: "N:3",
                            caption: that.cvColPmjResTitle,
                            description: that.cvColPmjResTitle, //RC 24534100 : Res. počet
                            width: colWidthAc - 10,
                            hidden: that.cvColPMjResHide
                        })
                        .addTextColumn({
                            name: "ueab_por",
                            caption: that.cvColUeabPorTitle,
                            description: that.cvColUeabPorTitle, //RC 24534102 : SuAu por
                            width: colWidthSuAu,
                            hidden: that.cvColUeabPorHide
                        })
                        .addTextColumn({
                            name: "ueab_opr",
                            caption: that.cvColUeabOprTitle,
                            description: that.cvColUeabOprTitle, //RC 24534103 : SuAu opr
                            width: colWidthSuAu,
                            hidden: that.cvColUeabOprHide
                        })
                        .addDateColumn({
                            name: "dat_por",
                            caption: that.cvColDatPorTitle,
                            description: that.cvColDatPorTitle, //RC 24534104 : Dat. pořízení
                            width: colWidthDate,
                            hidden: that.cvColDatPorHide
                        })
                        .addDateColumn({
                            name: "dat_zar",
                            caption: that.cvColDatZarTitle,
                            description: that.cvColDatZarTitle, //RC 24534105 : Dat. zařazení
                            width: colWidthDate,
                            hidden: that.cvColDatZarHide
                        })
                        .addDateColumn({
                            name: "dat_vyr",
                            caption: that.cvColDatVyrTitle,
                            description: that.cvColDatVyrTitle, //RC 24534106 : Dat. vyřazení
                            width: colWidthDate,
                            hidden: that.cvColDatVyrHide
                        })
                        .addDateColumn({
                            name: "dat_uct_0123",
                            caption: that.cvColDatUctTitle,
                            description: that.cvColDatUctTitle, // Dat. zaúčtování
                            width: colWidthDate,
                            hidden: that.cvColDatUctHide
                        })
                        .addTextColumn({
                            name: "mj",
                            caption: that.cvColMjTitle,
                            description: that.cvColMjTitle, //RC 24534107 : MJ
                            width: colWidth3Char,
                            hidden: that.cvColMjHide
                        })
                        .addNumberColumn({
                            name: "rok_vyr",
                            caption: that.cvColRokVyrTitle,
                            description: that.cvColRokVyrTitle, // Rok výr.
                            width: colWidth3Char,
                            hidden: that.cvColRokVyrHide
                        })
                        .addTextColumn({
                            name: "trida",
                            caption: that.cvColTridaTitle,
                            description: that.cvColTridaTitle, //RC 24534108 : Třída
                            width: colWidthDate,
                            hidden: that.cvColTridaHide
                        })
                        .addTextColumn({
                            name: "evi_cis",
                            caption: that.cvColEviCisTitle,
                            description: that.cvColEviCisTitle, //RC 24534109 : Evid. č.
                            width: colWidthAc,
                            hidden: that.cvColEviCisHide
                        })
                        .addTextColumn({
                            name: "vyr_cis",
                            caption: that.cvColVyrCisTitle,
                            description: that.cvColVyrCisTitle, //RC 24534110 : Výrob. č.
                            width: colWidthAc,
                            hidden: that.cvColVyrCisHide
                        })
                        .addTextColumn({
                            name: "ser_cis",
                            caption: that.cvColSerCisTitle,
                            description: that.cvColSerCisTitle, //RC 24534111 : Sér. č.
                            width: colWidthAc,
                            hidden: that.cvColSerCisHide
                        })
                        .addTextColumn({
                            name: "sarze",
                            caption: that.cvColSarzeTitle,
                            description: that.cvColSarzeTitle, //RC 24534112 : Šarže
                            width: colWidthAc,
                            hidden: that.cvColSarzeHide
                        })   
                        .addTextColumn({
                            name: "nazev_skp",
                            caption: that.cvColNazevSkpTitle,
                            description: that.cvColNazevSkpTitle,  //RC 24534059 : Název
                            width: colWidthLongText,
                            hidden: that.cvColNazevSkpHide
                        })
                        .addTextColumn({
                            name: "nks",
                            caption: that.cvColNksTitle,
                            description: that.cvColNksTitle,  //RC 24534113 : Nks
                            width: colWidthShortText - 15,
                            hidden: that.cvColNksHide
                        })

                        // Topologie (na BIS může být i prázdná)
                        .addTextColumn({
                            name: "ixs_orj_txt",
                            caption: that.cvColIxsOrjTitle,
                            description: that.cvColIxsOrjTitle, //RC 24534114 : Referát
                            width: colWidthEsuTxt,
                            hidden: that.cvColIxsOrjHide
                        })
                        .addTextColumn({
                            name: "stredisko",
                            caption: that.cvColStrediskoTitle,
                            description: that.cvColStrediskoTitle, //RC 24534066 : Středisko
                            width: 65,
                            hidden: that.cvColStrediskoHide
                        })
                        .addTextColumn({
                            name: "budova_kod",
                            caption: that.cvColBudovaKodTitle,
                            description: that.cvColBudovaKodTitle,  //RC 24534115 : Budova
                            width: 55,
                            hidden: that.cvColBudovaKodHide
                        })
                        .addTextColumn({
                            name: "segment_kod",
                            caption: that.cvColSegmentKodTitle,
                            description: that.cvColSegmentKodTitle,  // Segment
                            width: 55,
                            hidden: that.cvColSegmentKodHide
                        })
                        .addTextColumn({
                            name: "mistnost_kod",
                            caption: that.cvColMistnostKodTitle,
                            description: that.cvColMistnostKodTitle,  //RC 24534116 : Místnost
                            width: 55,
                            hidden: that.cvColMistnostKodHide
                        })
                        .addTextColumn({
                            name: "ixs_ref_txt",
                            caption: that.cvColIxsRefTitle,
                            description: that.cvColIxsRefTitle, //RC 24534117 : Odpovědný pracovník  cvColIxsRefTitle
                            width: colWidthEsuTxt,
                            hidden: that.cvColIxsRefHide
                        })


                        .addTextColumn({
                            name: "jmeno_soubor",
                            caption: that.cvColJmenoSouborTitle,
                            description: that.cvColJmenoSouborTitle, //RC 24534118 : Jméno souboru
                            width: colWidthDate + 10,
                            hidden: that.cvColJmenoSouborHide
                        })
                        .addTextColumn({
                            name: "inv_cis_soubor",
                            caption: that.cvColInvCisSoubTitle,
                            description: that.cvColInvCisSoubTitle, //RC 24534119 : Inv. číslo souboru
                            width: 75,
                            hidden: that.cvColInvCisSoubHide
                        })
                        .addTextColumn({
                            name: "poznamka",
                            caption: that.cvColIxsRefTitle,
                            description: that.cvColIxsRefTitle,  //RC 24534121 : Poznámka
                            width: colWidthLongText,
                            hidden: that.cvColIxsRefHide
                        })
                        .addNumberColumn({
                            name: "kod_por",
                            caption: that.cvColKodPorTitle,
                            description: that.cvColKodPorTitle,   //RC 24534122 : Kód pořízení
                            width: colWidth3Char,
                            hidden: that.cvColKodPorHide
                        })
                        .addNumberColumn({
                            name: "kod_vyr",
                            caption: that.cvColKodVyrTitle,
                            description: that.cvColKodVyrTitle,   //RC 24534123 : Kód vyřazení
                            width: colWidth3Char,
                            hidden: that.cvColKodVyrHide
                        })
                        .addTextColumn({
                            name: "expirace",
                            caption: that.cvColExpiraceTitle,
                            description: that.cvColExpiraceTitle, // Datum exp.
                            width: colWidthDate,
                            hidden: that.cvColExpiraceHide
                        })
                        .addTextColumn({
                            name: "ean",
                            caption: that.cvColEANTitle,
                            description: that.cvColEANTitle, //RC 24534125 : EAN
                            width: colWidthPid + 5,
                            hidden: that.cvColEANHide
                        })
                        .addNumberColumn({
                            name: "kod_vyu", // TODO: proč klíč a nikoli hodnota?
                            caption: that.cvColKodVyuTitle,
                            description: that.cvColKodVyuTitle, // Kód způsobu využití (VAS.GINSKOV)
                            width: 40,
                            hidden: that.cvColKodVyuHide
                        })
                        .addTextColumn({
                            name: "akce",
                            caption: that.cvColAkceTitle,
                            description: that.cvColAkceTitle, // Akce
                            width: colWidthShortText + 10,
                            hidden: that.cvColAkceHide
                        })
                        .addCurrencyColumn({
                            name: "dp_ode",
                            caption: that.cvColDpOdeTitle,
                            description: that.cvColDpOdeTitle, // Odečet ze základu DP
                            width: colWidthMoney,
                            hidden: that.cvColDpOdeHide
                        })
                        .addNumberColumn({  // TODO: proč klíč a nikoli hodnota?
                            name: "dan_typ",
                            caption: that.cvColDanTypTitle,
                            description: that.cvColDanTypTitle, // Typ DPH
                            width: 40,
                            hidden: that.cvColDanTypHide
                        })
                        .addCurrencyColumn({
                            name: "c_dph",
                            caption: that.cvColCDphTitle,
                            description: that.cvColCDphTitle, // DPH
                            width: colWidthMoney,
                            hidden: that.cvColCDphHide
                        })
                        .addCurrencyColumn({
                            name: "c_dph_odpocet",
                            caption: that.cvColCDphOdpocetTitle,
                            description: that.cvColCDphOdpocetTitle, // Odpočet z DPH
                            width: colWidthMoney,
                            hidden: that.cvColCDphOdpocetHide
                        })
                        .addCurrencyColumn({
                            name: "c_c_dph",
                            caption: that.cvColCcDphTitle,
                            description: that.cvColCcDphTitle, // Cena s DPH
                            width: colWidthMoney,
                            hidden: that.cvColCcDphHide
                        })
                        .addDateTimeColumn({
                            name: "dat_zmena",
                            caption: that.cvColDatZmenaTitle,
                            description: that.cvColDatZmenaTitle, //RC 24534036 : Datum změny                            
                            width: colWidthDateTime,
                            hidden: that.cvColDatZmenaHide
                        })
                        .addTextColumn({
                            name: "zmenu_prov_txt",
                            caption: "jres:24534126", //RC 24534126 : Změnu provedl
                            description: "jres:24534126", //RC 24534126 : Změnu provedl
                            width: colWidthEsuTxt
                        })
                        .addNumberColumn({
                            name: "lhuta_zaruka",
                            caption: that.cvColLhutaZarukaTitle,
                            description: that.cvColLhutaZarukaTitle, // . //RC 24534127 : Záruční lhůta
                            width: colWidth3Char,
                            hidden: that.cvColLhutaZarukaHide
                        })
                        .addTextColumn({
                            name: "objekt",
                            caption: that.cvColObjektTitle,
                            description: that.cvColObjektTitle, //RC 24534128 : Objekt
                            width: colWidthSuAu,
                            hidden: that.cvColObjektHide
                        })
                        .addTextColumn({
                            name: "stat_puvod_txt",
                            caption: that.cvColStatPuvodTxtTitle,
                            description: that.cvColStatPuvodTxtTitle, //RC 24534129 : Země původu
                            width: colWidthShortText,
                            hidden: that.cvColStatPuvodTxtHide
                        })
                        .addTextColumn({
                            name: "ixs_esu_vyr_txt",
                            caption: that.cvColIxsEsuVyrTitle,
                            description: that.cvColIxsEsuVyrTitle, //RC 24534130 : Výrobce
                            width: colWidthEsuTxt,
                            hidden: that.cvColIxsEsuVyrHide
                        })
                        // TODO: GDPR nad esu_vyr, esu_dod, esu_servis
                        .addTextColumn({
                            name: "ixs_esu_dod_txt",
                            caption: that.cvColIxsEsuDodTitle,
                            description: that.cvColIxsEsuDodTitle, //RC 24534072 : Dodavatel
                            width: colWidthEsuTxt,
                            hidden: that.cvColIxsEsuDodHide
                        })
                        .addTextColumn({
                            name: "ixs_esu_servis_txt",
                            caption: that.cvColIxsEsuServisTitle,
                            description: that.cvColIxsEsuServisTitle, //RC 24534131 : Servisní orgán
                            width: colWidthEsuTxt,
                            hidden: that.cvColIxsEsuServisHide
                        })
                        .addTextColumn({
                            name: "typ_maj",
                            caption: that.cvColTypMajTitle,
                            description: that.cvColTypMajTitle, //RC 24534132 : Typ výrobku
                            width: colWidthShortText,
                            hidden: that.cvColTypMajHide
                        })
                        .addTextColumn({
                            name: "ktg_zar_txt",
                            caption: that.cvColKtgZarTitle,
                            description: that.cvColKtgZarTitle, //RC 24534133 : Kategorie zařízení
                            width: colWidthShortText,
                            hidden: that.cvColKtgZarHide
                        })
                        .addTextColumn({
                            name: "rozmer_l",
                            caption: that.cvColDelkaTitle,
                            description: that.cvColDelkaTitle, //RC 24534134 : Délka
                            width: colWidthSuAu,
                            hidden: that.cvColDelkaHide
                        })
                        .addTextColumn({
                            name: "rozmer_w",
                            caption: that.cvColSirkaTitle,
                            description: that.cvColSirkaTitle, //RC 24534135 : Šířka
                            width: colWidthSuAu,
                            hidden: that.cvColSirkaHide
                        })
                        .addTextColumn({
                            name: "rozmer_h",
                            caption: that.cvColVyskaTitle,
                            description: that.cvColVyskaTitle, //RC 24534136 : Výška
                            width: colWidthSuAu,
                            hidden: that.cvColVyskaHide
                        })
                        .addTextColumn({
                            name: "hmotnost",
                            caption: that.cvColHmotnostTitle,
                            description: that.cvColHmotnostTitle, //RC 24534137 : Hmotnost
                            width: colWidthSuAu,
                            hidden: that.cvColHmotnostHide
                        })
                        .addTextColumn({
                            name: "prev_stav_txt",
                            caption: that.cvColPrevStavTitle,
                            description: that.cvColPrevStavTitle, //RC 24534138 : Stav při převzetí
                            width: colWidthShortText,
                            hidden: that.cvColPrevStavHide
                        })
                        .addTextColumn({
                            name: "mobilita_txt",
                            caption: that.cvColMobilitaTitle,
                            description: that.cvColMobilitaTitle, //RC 24534139 : Mobilita
                            width: colWidthShortText,
                            hidden: that.cvColMobilitaHide
                        })
                        .addTextColumn({
                            name: "riziko_por_txt",
                            caption: that.cvColRizikoPorTitle,
                            description: that.cvColRizikoPorTitle, //RC 24534140 : Riziko při poruše
                            width: colWidthShortText,
                            hidden: that.cvColRizikoPorHide
                        })
                        .addTextColumn({
                            name: "trida_bezp_txt",
                            caption: that.cvColTridaBezpTitle,
                            description: that.cvColTridaBezpTitle, //RC 24534141 : Třída bezpečnosti
                            width: colWidthShortText,
                            hidden: that.cvColTridaBezpHide
                        })
                        .addTextColumn({
                            name: "ixs_esu_vla_txt",
                            caption: that.cvColIxsEsuVlaTitle,
                            description: that.cvColIxsEsuVlaTitle, //RC 24534142 : Vlastník
                            width: colWidthEsuTxt,
                            hidden: that.cvColIxsEsuVlaHide
                        })
                        .addTextColumn({
                            name: "ext_1_txt",
                            caption: that.cvColExt1Title,
                            description: that.cvColExt1Title, //RC 24534143 : Externí lokace
                            width: 70,
                            hidden: that.cvColExt1Hide
                        })
                        .addTextColumn({
                            name: "ext_2_txt",
                            caption: that.cvColExt2Title,
                            description: that.cvColExt2Title, //RC 24534143 : Externí lokace
                            width: 70,
                            hidden: that.cvColExt2Hide
                        })
                        .addTextColumn({
                            name: "ext_3_txt",
                            caption: that.cvColExt3Title,
                            description: that.cvColExt3Title, //RC 24534143 : Externí lokace
                            width: 70,
                            hidden: that.cvColExt3Hide
                        })
                        .addTextColumn({
                            name: "gps_sirka",
                            caption: that.cvColGpsSirkaTitle,
                            description: that.cvColGpsSirkaTitle, //RC 24534144 : Zeměpisná š.
                            width: 84,
                            hidden: that.cvColGpsSirkaHide
                        })
                        .addTextColumn({
                            name: "gps_delka",
                            caption: that.cvColGpsDelkaTitle,
                            description: that.cvColGpsDelkaTitle, //RC 24534145 : Zeměpisná d.
                            width: 84,
                            hidden: that.cvColGpsDelkaHide
                        })

                        // 364.1 10.12.09 ceny

                        .addCurrencyColumn({
                            name: "c_poriz",
                            caption: that.cvColCPorizTitle,
                            description: that.cvColCPorizTitle, //RC 24534146 : Pořizovací cena
                            width: colWidthMoney,
                            hidden: that.cvColCPorizHide
                        })
                        .addCurrencyColumn({
                            name: "c_opr_pol",
                            caption: that.cvColCOprPolTitle,
                            description: that.cvColCOprPolTitle, //RC 24534146 : Cena opravné položky
                            width: colWidthMoney,
                            hidden: that.cvColCOprPolHide
                        })
                        .addCurrencyColumn({
                            name: "c_real",
                            caption: that.cvColCRealTitle,
                            description: that.cvColCRealTitle, //RC 24534146 : Reálná cena
                            width: colWidthMoney,
                            hidden: that.cvColCRealHide
                        })
                        .addCurrencyColumn({
                            name: "c_dotace",
                            caption: that.cvColCDotaceTitle,
                            description: that.cvColCDotaceTitle, //RC 24534146 : Pořizovací cena
                            width: colWidthMoney,
                            hidden: that.cvColCDotaceHide
                        })

                        // 376.3 06.11.15 - prodejní ceny 

                        .addCurrencyColumn({
                            name: "cmj_pro1",
                            caption: that.cvColCmjPro1Title,
                            description: that.cvColCmjPro1Title, // Prodejní cena
                            width: colWidthMoney,
                            hidden: that.cvColCmjPro1Hide
                        })
                        .addCurrencyColumn({
                            name: "cmj_pro2",
                            caption: that.cvColCmjPro2Title,
                            description: that.cvColCmjPro2Title, // Prodejní cena
                            width: colWidthMoney,
                            hidden: that.cvColCmjPro2Hide
                        })
                        .addCurrencyColumn({
                            name: "cmj_pro3",
                            caption: that.cvColCmjPro3Title,
                            description: that.cvColCmjPro3Title, // Prodejní cena
                            width: colWidthMoney,
                            hidden: that.cvColCmjPro3Hide
                        })

                        // 366.15 07.12.11 PAP

                        .addTextColumn({
                            name: "ke_pap",
                            caption: that.cvColKePapTitle,
                            description: that.cvColKePapTitle, //RC 24534147 : Analytika PAP
                            width: colWidthDate,
                            hidden: that.cvColKePapHide
                        })

                        
                        // ==============================================================================
                        // 342.18 15.01.02 - přidány detaily o reservaci  - viditelné pouze tehdy, je-li v ctbl_MajMaj.sFrom majsres

                        //.addTextColumn({
                        //    name: "subjekt_txt",
                        //    caption: "jres:24534400", //RC 24534400 : Zapůjčeno komu
                        //    description: "jres:24534400", //RC 24534400 : Zapůjčeno komu
                        //    width: colWidthEsuTxt,
                        //    hidden: that.cvMajResHide
                        //})
                        //.addTextColumn({
                        //    name: "prevzal_txt",
                        //    caption: "jres:24534401", //RC 24534401 : Převzal
                        //    description: "jres:24534401", //RC 24534401 : Převzal
                        //    width: colWidthEsuTxt,
                        //    hidden: that.cvMajResHide
                        //})
                        //.addCurrencyColumn({
                        //    name: "pmj_res_res",
                        //    format: "N:3",
                        //    caption: "jres:24534402", //RC 24534402 : Zapůjčené množství
                        //    description: "jres:24534402", //RC 24534402 : Zapůjčené množství
                        //    width: colWidthSmall,
                        //    hidden: that.cvMajResHide
                        //})
                        //.addCurrencyColumn({
                        //    name: "c_res_res",
                        //    caption: "jres:24534403", //RC 24534403 : Cena zapůjčky
                        //    description: "jres:24534403", //RC 24534403 : Cena zapůjčky
                        //    width: colWidthMoney,
                        //    hidden: that.cvMajResHide
                        //})
                        //.addDateColumn({
                        //    name: "dat_res",
                        //    caption: "jres:24534404", //RC 24534404 : Půjčeno
                        //    description: "jres:24534404", //RC 24534404 : Půjčeno
                        //    width: colWidthDate,
                        //    hidden: that.cvMajResHide
                        //})
                        //.addDateColumn({
                        //    name: "dat_termin",
                        //    caption: "jres:24534405", //RC 24534405 : Termín vrácení
                        //    description: "jres:24534405", //RC 24534405 : Termín vrácení
                        //    width: colWidthDate,
                        //    hidden: that.cvMajResHide
                        //})

                        // ==============================================================================
                        // 370.12 id_maj

                        .addTextColumn({
                            name: "id_maj",
                            caption: that.cvColIdMajTitle,
                            description: that.cvColIdMajTitle, // Identifikátor majetku
                            width: colWidthShortText,
                            hidden: that.cvColIdMajHide
                        })
                        .addTextColumn({
                            name: "ktg_kp", // ktg_kp_txt
                            caption: that.cvColKtgKpTitle, //RC 24534393 : Typ KP
                            description: that.cvColKtgKpTitle, //RC 24534394 : Typ kulturní památky
                            width: colWidthDate,
                            hidden: that.cvColKtgKpHide,
                            cellTemplate: function (data, metarow, info) { // ctbl_MajMaj._fetchRowDone( )
                                var text = "";
                                var tooltip = "";
                                var customClass = "";
                                var font = "";

                                if (data.ktg_kp > 0) {
                                    if (data.ktg_kp === 10) {
                                        // Movitá KP
                                        text = "Movitá KP";
                                        tooltip = "Movitá kulturní památka"; // TODO: lokalizaci dotáhnout z DB
                                    }
                                    else {
                                        text = "Nemovitá KP";
                                        tooltip = "Nemovitá kulturní památka";
                                    }
                                }

                                return $("<span>", { text: text, title: tooltip, "class": customClass, "style": font });
                            }
                        })
                        .addTextColumn({
                            name: "cis_rejstrik_kp",
                            caption: that.cvColCisRKpTitle,
                            description: that.cvColCisRKpTitle, // Číslo RKP
                            width: colWidthAc,
                            hidden: that.cvColCisRKpHide
                        })
                        .addTextColumn({
                            name: "id_rejstrik_kp",
                            caption: that.cvColIdRKpTitle,
                            description: that.cvColIdRKpTitle, // Identifikátor RKP
                            width: colWidthPid,
                            hidden: that.cvColIdRKpHide
                        })

                        // 352.18 08.06.05 - odpisové hodnoty ----------------------------START
                        // ÚČETNÍ ==============================================================================
                        .addTextColumn({
                            name: "skupina_odp_u",
                            caption: "jres:24534406" + " " + //RC 24534406 : U
                                "jres:24534176", //RC 24534176 : Odpisová skupina
                            description: "jres:24534406" + " " +
                                "jres:24534176", //RC 24534176 : Odpisová skupina
                            width: colWidthSmall,
                            hidden: that.cvMajOdpUcet10Hide
                        })
                        .addCurrencyColumn({
                            name: "c_vstup_u",
                            caption: "jres:24534406" + " " +
                                "jres:24534184", //RC 24534184 : Vstupní cena
                            description: "jres:24534406" + " " +
                                "jres:24534184", //RC 24534184 : Vstupní cena
                            width: colWidthMoney,
                            hidden: that.cvMajOdpUcet10Hide
                        })
                        .addCurrencyColumn({
                            name: "c_zbytek_u",
                            caption: "jres:24534406" + " " +
                                "jres:24534187", //RC 24534187 : Zbytková hodnota
                            description: "jres:24534406" + " " +
                                "jres:24534187", //RC 24534187 : Zbytková hodnota
                            width: colWidthMoney,
                            hidden: that.cvMajOdpUcet10Hide
                        })
                        .addCurrencyColumn({
                            name: "c_opr_u",
                            caption: "jres:24534406" + " " +
                                "jres:24534185", //RC 24534185 : Oprávky
                            description: "jres:24534406" + " " +
                                "jres:24534185", //RC 24534185 : Oprávky
                            width: colWidthMoney,
                            hidden: that.cvMajOdpUcet10Hide
                        })
                        .addCurrencyColumn({
                            name: "c_zust_u",
                            caption: "jres:24534406" + " " +
                                "jres:24534186", //RC 24534186 : Zůstatková cena
                            description: "jres:24534406" + " " +
                                "jres:24534186", //RC 24534186 : Zůstatková cena
                            width: colWidthMoney,
                            hidden: that.cvMajOdpUcet10Hide
                        })
                        .addCurrencyColumn({
                            name: "c_rok_odp_u",
                            caption: "jres:24534406" + " " +
                                "jres:24534408", //RC 24534408 : Odpis v akt. roce
                            description: "jres:24534406" + " " +
                                "jres:24534408", //RC 24534408 : Odpis v akt. roce
                            width: colWidthMoney,
                            hidden: that.cvMajOdpUcet10Hide
                        })
                        .addNumberColumn({
                            name: "rok_start_odp_u",
                            caption: "jres:24534406" + " " +
                                "jres:24534202", //RC 24534202 : Rok počátku odpisu
                            description: "jres:24534406" + " " +
                                "jres:24534202", //RC 24534202 : Rok počátku odpisu
                            width: colWidthSmall,
                            hidden: that.cvMajOdpUcet10Hide
                        })
                        .addTextColumn({
                            name: "typ_odp_u_txt",
                            caption: "jres:24534406" + " " +
                                "jres:24534177", //RC 24534177 : Typ odpisu
                            description: "jres:24534406" + " " +
                                "jres:24534177", //RC 24534177 : Typ odpisu
                            width: colWidthAc,
                            hidden: that.cvMajOdpUcet10Hide
                        })
                        .addNumberColumn({
                            name: "doba_uziti_u",
                            caption: "jres:24534406" + " " +
                                "jres:24534409", //RC 24534409 : Doba používání // TODO: sjednotit s detailem (tam je asi "doba užití")
                            description: "jres:24534406" + " " +
                                "jres:24534409", //RC 24534409 : Doba používání
                            width: colWidthSmall,
                            hidden: that.cvMajOdpUcet10Hide
                        })
                        .addCurrencyColumn({
                            name: "c_sazba_odp_u",
                            caption: "jres:24534406" + " " +
                                "jres:24534183", //RC 24534183 : Sazba
                            description: "jres:24534406" + " " +
                                "jres:24534183", //RC 24534183 : Sazba
                            width: colWidthMoney,
                            hidden: that.cvMajOdpUcet10Hide
                        })
                        .addCurrencyColumn({
                            name: "c_last_odp_u",
                            caption: "jres:24534406" + " " +
                                "jres:24534188", //RC 24534188 : Poslední odpis
                            description: "jres:24534406" + " " +
                                "jres:24534188", //RC 24534188 : Poslední odpis
                            width: colWidthMoney,
                            hidden: that.cvMajOdpUcet10Hide
                        })
                        .addTextColumn({
                            name: "obd_odp_u",
                            caption: "jres:24534406" + " " +
                                "jres:24534182", //RC 24534182 : Období odpisu
                            description: "jres:24534406" + " " +
                                "jres:24534182", //RC 24534182 : Období odpisu
                            width: colWidthShortText,
                            hidden: that.cvMajOdpUcet10Hide
                        })
                        .addNumberColumn({
                            name: "rok_zvys_vc_u",
                            caption: "jres:24534406" + " " +
                                "jres:24534410", //RC 24534410 : Období
                            description: "jres:24534406" + " " +
                                "jres:24534410", //RC 24534410 : Rok registru nedokončeného majetku 
                            width: colWidthSmall,
                            hidden: that.cvMajOdpUcet0Hide
                        })

                        // DAŇOVÉ  ==============================================================================

                        .addTextColumn({
                            name: "skp_d",
                            caption: "jres:24534407" + " " + //RC 24534407 : D
                                "jres:24534182", //RC 24534182 : Období odpisu
                            description: "jres:24534407" + " " +
                                "jres:24534182", //RC 24534182 : Období odpisu
                            width: colWidthShortText,
                            hidden: that.cvMajOdpDan0Hide
                        })
                        .addTextColumn({
                            name: "skupina_odp_d",
                            caption: "jres:24534407" + " " + //RC 24534407 : D
                                "jres:24534176", //RC 24534176 : Odpisová skupina
                            description: "jres:24534407" + " " +
                                "jres:24534176", //RC 24534176 : Odpisová skupina
                            width: colWidthSmall,
                            hidden: that.cvMajOdpDan0Hide
                        })
                        .addCurrencyColumn({
                            name: "c_vstup_d",
                            caption: "jres:24534407" + " " +
                                "jres:24534184", //RC 24534184 : Vstupní cena
                            description: "jres:24534407" + " " +
                                "jres:24534184", //RC 24534184 : Vstupní cena
                            width: colWidthMoney,
                            hidden: that.cvMajOdpDan0Hide
                        })
                        .addCurrencyColumn({
                            name: "c_opr_d",
                            caption: "jres:24534407" + " " +
                                "jres:24534185", //RC 24534185 : Oprávky
                            description: "jres:24534407" + " " +
                                "jres:24534185", //RC 24534185 : Oprávky
                            width: colWidthMoney,
                            hidden: that.cvMajOdpDan0Hide
                        })
                        .addCurrencyColumn({
                            name: "c_zust_d",
                            caption: "jres:24534407" + " " +
                                "jres:24534186", //RC 24534186 : Zůstatková cena
                            description: "jres:24534407" + " " +
                                "jres:24534186", //RC 24534186 : Zůstatková cena
                            width: colWidthMoney,
                            hidden: that.cvMajOdpDan0Hide
                        })
                        .addCurrencyColumn({
                            name: "c_rok_odp_d",
                            caption: "jres:24534407" + " " +
                                "jres:24534408", //RC 24534408 : Odpis v akt. roce
                            description: "jres:24534407" + " " +
                                "jres:24534408", //RC 24534408 : Odpis v akt. roce
                            width: colWidthMoney,
                            hidden: that.cvMajOdpDan0Hide
                        })
                        .addNumberColumn({
                            name: "rok_start_odp_d",
                            caption: "jres:24534407" + " " +
                                "jres:24534202", //RC 24534202 : Rok počátku odpisu
                            description: "jres:24534407" + " " +
                                "jres:24534202", //RC 24534202 : Rok počátku odpisu
                            width: colWidthSmall,
                            hidden: that.cvMajOdpDan0Hide
                        })
                        .addTextColumn({
                            name: "typ_odp_d_txt",
                            caption: "jres:24534407" + " " +
                                "jres:24534177", //RC 24534177 : Typ odpisu
                            description: "jres:24534407" + " " +
                                "jres:24534177", //RC 24534177 : Typ odpisu
                            width: colWidthAc,
                            hidden: that.cvMajOdpDan0Hide
                        })
                        .addCurrencyColumn({
                            name: "c_sazba_odp_d",
                            caption: "jres:24534407" + " " +
                                "jres:24534183", //RC 24534183 : Sazba
                            description: "jres:24534407" + " " +
                                "jres:24534183", //RC 24534183 : Sazba
                            width: colWidthMoney,
                            hidden: that.cvMajOdpDan0Hide
                        })
                        .addCurrencyColumn({
                            name: "c_last_odp_d",
                            caption: "jres:24534407" + " " +
                                "jres:24534188", //RC 24534188 : Poslední odpis
                            description: "jres:24534407" + " " +
                                "jres:24534188", //RC 24534188 : Poslední odpis
                            width: colWidthMoney,
                            hidden: that.cvMajOdpDan0Hide
                        })
                        .addTextColumn({
                            name: "obd_odp_d",
                            caption: "jres:24534407" + " " +
                                "jres:24534182", //RC 24534182 : Období odpisu
                            description: "jres:24534407" + " " +
                                "jres:24534182", //RC 24534182 : Období odpisu
                            width: colWidthShortText,
                            hidden: that.cvMajOdpDan0Hide
                        })
                        .addNumberColumn({
                            name: "rok_zvys_vc_d",
                            caption: "jres:24534407" + " " +
                                "jres:24534410", //RC 24534410 : Rok TZH
                            description: "jres:24534407" + " " +
                                "jres:24534410", //RC 24534410 : Rok TZH
                            width: colWidthSmall,
                            hidden: that.cvMajOdpDan0Hide
                        })
                        //======================================
                        // neviditelné odpisové - rokobd_odp_u, mesobd_odp_u, rokobd_odp_d, mesobd_odp_d, typ_odp_u, rok_start_typ_u
                        //======================================

                        // 353.1 17.08.05 - hodnoty RP REN    

                        .addNumberColumn({
                            name: "exists_rpren",
                            caption: "# " + "jres:24534411", //RC 24534411 : REN 
                            description: "# " + "jres:24534411", //RC 24534411 : REN 
                            width: colWidthSmall,
                            hidden: that.cvRenHide
                        })

                    // pouze pro historii

                        //.addDateColumn({
                        //    name: "dat_uup",
                        //    caption: "jres:24534284", //RC 24534284 : Datum UÚP
                        //    description: "jres:24534284", //RC 24534284 : Datum UÚP
                        //    width: colWidthDate                            
                        //})

                    // TODO: id_mnoz (viz ccol_Uej) - viditelnost a titulek řízen ekonomikou (EkoInit, ccol_Uej.urovenCol = ng_colUej)

                    //==============
                    // neviditelné
                    //==============
                    // ucs, id_top, ixs_maj, lic, zev, drh_id, skupina_id, skupina_odp, tev, dev, tka, mat_akt, typ_soubor
                    // ixs_maj_nad, ser_hst_maj, priz_odp
                    // 12.09.00 - kvůli násobným pohledům na zápůjčky
                    // poradi
                    // inv_in, ixs_orj, ixs_ref, ixs_esu_vyr, ixs_esu_dod, ixs_esu_servis, ktg_zar, stat_puvod, prev_stav, mobilita, riziko_por, trida_bezp
                    // ext_1, ext_2, ext_3, ixs_esu_vla, id_krt_dev, ktg_kp, 
                    // 376.3 12.11.15 příznaky prodejnocti skupiny, druhu
                    // s_prodej_skm, s_prodej_drm
                    // 378.11 19.06.17 GDPR - typy ESU
                    // typ_esu_vyr, typ_esu_dod, typ_esu_servis
                    //==============

                });
        }, // end (prepareContent)

        

    }, { extendIntellisense: GContent });
    
    
})(jQuery);
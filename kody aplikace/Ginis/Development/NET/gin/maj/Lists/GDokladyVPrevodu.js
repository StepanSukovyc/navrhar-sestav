(function ($) {
    //  Grid s majetkovými doklady v převodu { dlg_DokPP }
    "use strict";
    namespace("Gordic.Maj.WebClient.GDokladyVPrevodu", {       
        //data: {}
        onContentReady: function () {
            
            console.log("Gordic.Maj.WebClient.GDokladyVPrevodu.onContentReady", this);
            
            var that = this;

            //=================
            // AKCE
            //=================

            this.actions.addRange({
                // TODO: texty do resource                
                actOk: { caption: "OK", icon: "gi-tick", run: function (ev, ctx) { that.jsVyberDoklad(); } },                
                actCancel: { caption: "Zrušit", icon: "gi-window-close", run: function (ev, ctx) { that.close(); } } 
            });


            var actPolozky = new GAction({
                name: "actShowKarta",
                caption: "jres:24534007", //RC 24534007 : Položky
                icon: "gi-file",
                run: function () {
                    
                    var vyber = $grid.ggrid("getSelection")[0];

                    if (vyber === undefined) {
                        GDlg.alert("Vyberte záznam");
                    }
                    else {
                        //console.log(selection);

                        // SalModalDialog( dlg_PolPPList,hWndForm,tbl_DokPP.ixp, tbl_DokPP.ac_ext , direct_p, typ_com_p )                       
                        that.navigate('Gordic.Maj.WebClient.GPolozkyVPrevodu', {
                            Ixp: vyber.ixp,
                            argSmer: that.argSmer,
                            argAc: vyber.ac_ext
                        });
                        
                    } // end if-else
                }
            });
            

            //===============================================

            actPolozky.enabled(this.cvDataFound);            

            //===============================================
            // MENU
            //===============================================


            this.menuBar([
                {
                    action: actPolozky, // pbDetail
                    favorite: true
                }                
            ]);

            if (this.cvModeFrmSel === 5) // pouze v režimu výběru dokladu v převodu
                this.commandBar([
                    { action: this.actions.actOk },
                    { action: this.actions.actCancel }
                ]);
           
            
            //============================================
            //vytvoreni gridu + definice
            //============================================
           
            var colWidthPid = 115;               
            var colWidthAc = 85; 
            var colWidthMoney = 110;
            var colWidthDate = 90;
            var colWidthDateTime = 140;
            var colWidthSmall = 40;
            var colWidthStatus = 40;
            var colWidthIcon = 25;

            this.$grid = $("<div class='js-mujGrid'>")
                
                //.gautofit()
                .appendTo(this.element)
                .ggrid({
                    columnMode: "full",     // fit (defaultne by melo byt toto), full
                    data: this.data,
                    //defaultAction: 
                    
                    //==========================================================
                    // SLOUPCE GRIDU { ctbl_MajPid } - tabulka je zde trochu redukovaná - zakomentováno s textem " dlg_DokPP.tbl_DokPP"
                    //==========================================================
                    columns: new Gordic.Data.GridFormat()

                        // tyto 2 sloupce jsou v případě použití na 1. a 2. pozici - použijí se při volání seznamu PID fulltextem
                        .addTextColumn({
                            name: "typ_elp_txt",
                            caption: "Typ el. dok.",
                            description: "Typ elektronického dokumentu" + ".",
                            width: 80,
                            hidden: that.cvColEleHidden
                        })
                        .addTextColumn({
                            name: "popis_ixb",
                            caption: "Popis el. dok.",
                            description: "Popis elektronického dokumentu" + ".",
                            width: 110,
                            hidden: that.cvColEleHidden
                        })

                        .addIconColumn({  // vlastnictví agendy -  ctbl_MajPid._showPicDocFyzAgd
                            name: "pic_fyzagd",
                            caption: ".",
                            description: "Dokument fyzický / elektronický" + ".",
                            width: colWidthIcon,
                            customClass: "center",
                            fixedWidth: true,
                            iconTemplate: function (row) {
                                switch (row.s_ele) {
                                    case 0: return { icon: "gi-paper" };
                                    case 1: return { icon: "gi-edoc" };
                                    case 2: return { icon: "gi-edoc" }; // todo rozlisit stav 1 a 2                                    
                                    default: return null;
                                }
                            }
                        })
                        //.addIconColumn(Gordic.Wfl.Globals.ListSupport.EleColumn())                        
                        .addIconColumn({  // ctbl_MajPid._showPicDocEleFyzSgn  (s_sgn)
                            name: "pic_elefyzsgn",
                            caption: ".",
                            description: "El. podpisy" + ".",
                            width: colWidthIcon,
                            customClass: "center",
                            fixedWidth: true,
                            iconTemplate: function (row) {
                                switch (row.s_sgn) {
                                    case 0: return { icon: "gi-nic" };
                                    // TODO: viz wflcsgn - lze rozlišit razítka apod.
                                    default: return { icon: "gi-elektronicky_podpis" };
                                }
                            }
                        })
                        .addIconColumn({   // ctbl_MajPid._showPicDocRedist
                            name: "pic_stavdist",
                            caption: "R",
                            description: "jres:24534373" + ".", //RC 24534373 : Vlastnictví a redistribuce
                            width: colWidthIcon,
                            customClass: "center",
                            fixedWidth: true,
                            iconTemplate: function (row) {
                                switch (row.stav_dist) {
                                    case 0: return { icon: "gi-nic" };
                                    case -1: return { icon: "gi-lock" };   // cizí dokument
                                    default: return { icon: "gi-redistribuce" };
                                }
                            }
                        })
                        .addNumberColumn({
                            name: "poc_epri",
                            caption: "# e",
                            width: 35,
                            description: "jres:24534019" + ".", //RC 24534019 : Počet elektronických příloh
                            // fixedWidth: true,
                            // customClass: "ui-disabled"
                            hidden: that.cvColPocElPriHidden
                        })

                        // TODO: number_row, pořadí 

                        // skryto - dlg_DokPP.tbl_DokPP
                        //.addTextColumn({
                        //    name: "ac",
                        //    caption: "jres:24534017",  //RC 24534017 : Evidenční číslo
                        //    description: "jres:24534017" + ".",  //RC 24534017 : Evidenční číslo
                        //    width: colWidthAc,                       
                        //})
                        // skryto - dlg_DokPP.tbl_DokPP
                        //.addTextColumn({
                        //    name: "ac_ag",
                        //    caption: "jres:24534018", //RC 24534018 : Agendové číslo
                        //    description: "jres:24534018" + ".",  //RC 24534018 : Agendové číslo
                        //    width: colWidthAc,                        
                        //})
                        .addIconColumn({
                            name: "pic_prizview",
                            field: "color_pview",
                            caption: ".",
                            description: "Nepřečteno / neshlédnuto" + ".",
                            width: colWidthIcon,
                            iconTemplate: function (data) {
                                switch (data.color_pview) {
                                    case 10: return {
                                        icon: "gi-detail g-state-important g-state-text",
                                        tooltip: "jres:24534367" //RC 24534367 : Nepřečteno
                                    };
                                    default: return null;
                                }
                            }
                        })
                        .addTextColumn({
                            name: "ixp",
                            caption: "jres:24534020", //RC 24534020 : Identifikátor
                            description: "jres:24534020" + ".",  //RC 24534020 : Identifikátor
                            width: colWidthPid,
                            cellTemplate: function (data, metarow, info) {
                                var text = data.ixp;
                                var tooltip = "";
                                var customClass = ""; // customClass = "g-state-error g-state-text";
                                var font = "";
                                if (data.color_pview === 10) font = "font-weight: bold;";
                                //return $("<span>", { text: text, title: tooltip, "class": customClass, "style": "background-color: #0066CC" });
                                return $("<span>", { text: text, title: tooltip, "class": customClass, "style": font });
                            }
                        })
                        // skryto - dlg_DokPP.tbl_DokPP
                        //.addIconColumn({
                        //    name: "pic_storno",
                        //    field: "mp_stav",
                        //    caption: "jres:24534325", //RC 24534325 : Stav
                        //    description: "jres:24534021" + ".", //RC 24534021 : Stav dokladu
                        //    width: colWidthStatus + 5,
                        //    iconTemplate: function (data) {
                        //        switch (data.mp_stav) {
                        //            case 0: return {
                        //                icon: "gi-question g-state-important g-state-text",
                        //                text: "",
                        //                tooltip: "Neurčeno"
                        //            };
                        //            case 10: return {
                        //                icon: "gi-nic",
                        //                text: "N",
                        //                tooltip: "jres:24534368" //RC 24534368 : Návrh
                        //            };
                        //            case 20: return {
                        //                icon: "gi-nic",
                        //                text: "E",
                        //                tooltip: "jres:24534369" //RC 24534369 : Evidence
                        //            };
                        //            case 30: return {
                        //                icon: "gi-nic",
                        //                text: "KU",
                        //                tooltip: "jres:24534370" //RC 24534370 : K proúčtování
                        //            };
                        //            case 35: return {
                        //                icon: "gi-nic",
                        //                text: "CU",
                        //                tooltip: "jres:24534371" //RC 24534371 : Částečně proúčtováno
                        //            };
                        //            case 40: return {
                        //                icon: "gi-nic",
                        //                text: "U",
                        //                tooltip: "jres:24534034" //RC 24534034 : Proúčtováno
                        //            };
                        //            case 50: return {
                        //                icon: "gi-nic",
                        //                text: "Z",
                        //                tooltip: "jres:24534372" //RC 24534372 : Uzavřeno
                        //            };
                        //            case 90: return {
                        //                icon: "fa-trash g-state-warning g-state-text",
                        //                text: "S",
                        //                tooltip: "jres:24534358" //RC 24534358 : Stornovaná položka
                        //            };
                        //            default: return {
                        //                icon: "gi-exclam g-state-warning g-state-text",
                        //                text: "!",
                        //                tooltip: "Neznámý stav"
                        //            };
                        //        }
                        //    }
                        //})
                        .addTextColumn({
                            name: "stav_preevid",
                            caption: "P",
                            description: "jres:24534022" + ".", //RC 24534022 : Stav přeevidence dokladu
                            width: colWidthIcon
                        })
                        // skryto - dlg_DokPP.tbl_DokPP
                        //.addDateColumn({
                        //    name: "dat_prij_pod",
                        //    caption: "jres:24534023", //RC 24534023 : Evidováno
                        //    description: "jres:24534385" + ".", //RC 24534385 : Datum evidence
                        //    width: colWidthDate
                        //})
                        .addDateColumn({
                            name: "dat_uup",
                            caption: "jres:24534024", //RC 24534024 : Datum UUP
                            description: "jres:24534386" + ".", //RC 24534386 : Datum uskutečnění účet. pohybu
                            width: colWidthDate
                        })                       
                        .addDateColumn({
                            name: "dat_zdan",
                            caption: "jres:24534383", //RC 24534383 : Datum ZP
                            description: "jres:24534384" + ".", //RC 24534384 : Datum zdanitelného plnění
                            width: colWidthDate                          
                        })
                        // skryto - dlg_DokPP.tbl_DokPP
                        //.addTextColumn({
                        //    name: "typ_dok_zkr",
                        //    caption: "jres:24534025", //  //RC 24534025 : Typ   
                        //    description: "jres:24534043" + ".", //RC 24534043 : Typ dokladu
                        //    width: 50
                        //})
                        .addNumberColumn({
                            name: "kod_poh",
                            caption: "jres:24534026", //  //RC 24534026 : Kód
                            description: "jres:24534044" + ".", //RC 24534044 : Kód pohybu
                            width: 40
                        })
                        .addTextColumn({
                            name: "dev_zkr",
                            caption: "jres:24534027", //  //RC 24534027 : DEV
                            description: "jres:24534045" + ".", //RC 24534045 : Druh evidence
                            width: 45
                        })
                        .addTextColumn({
                            name: "popis",
                            caption: "jres:24534028", //  //RC 24534028 : Popis
                            width: 200
                        })
                        .addTextColumn({
                            name: "id_top",
                            caption: "jres:24534351", //RC 24534351 : EVS vlastní
                            description: "jres:24534351" + ".", //RC 24534351 : EVS vlastní
                            width: colWidthPid - 20,
                            hidden: this.cvColEvsHidden
                        })
                        // TODO: výdejce
                        .addTextColumn({
                            name: "nks_ext",
                            caption: that.cvColNksExtTitle,
                            description: that.cvColNksExtDesc + ".",
                            width: colWidthPid - 20
                        })       
                        // skryto - dlg_DokPP.tbl_DokPP
                        //.addTextColumn({
                        //    name: "esu_txt",
                        //    caption: "jres:24534029", //  //RC 24534029 : Dodavatel, odběratel    
                        //    description: "jres:24534029" + ".", //RC 24534029 : Dodavatel, odběratel    
                        //    width: 200
                        //})
                        // skryto - dlg_DokPP.tbl_DokPP
                        //.addTextColumn({
                        //    name: "ico_esu",
                        //    caption: "jres:24534030", //  //RC 24534030 : IČO D/O
                        //    description: "jres:24534048" + ".", //RC 24534048 : IČ dodavatele, odběratele
                        //    width: 85
                        //})
                        // skryto - dlg_DokPP.tbl_DokPP
                        //.addTextColumn({
                        //    name: "rc_esu",
                        //    caption: "jres:24534375", //  //RC 24534375 : RČ D/O
                        //    description: "jres:24534376" + ".", //RC 24534376 : Rodné č. dodavatele, odběratele
                        //    width: 85,
                        //    hidden: that.cvColRcEsuHidden
                        //})
                        .addTextColumn({
                            name: "ac_ext",
                            caption: "jres:24534389",  //RC 24534389 : Číslo
                            description: "jres:24534340" + ".", //RC 24534340 : Číslo dokladu
                            width: colWidthAc
                        })
                        .addDateColumn({
                            name: "dat_ext",
                            caption: "jres:24534390", //RC 24534390 : Vydáno
                            description: "jres:24534390" + ".",
                            width: colWidthDate
                        })
                        .addNumberColumn({
                            name: "pocet_pol",
                            caption: "# pol",
                            description: "jres:24534377" + ".", //RC 24534377 : Počet položek
                            width: colWidthSmall + 5
                        })
                        // 380.10 14.03.18 měna a další sloupce související s měnou
                        .addTextColumn({
                            name: "mena_zkr",
                            caption: "jres:24534342", //RC 24534342 : Měna
                            description: "jres:24534342" + ".", //RC 24534342 : Měna
                            width: colWidthSmall,
                            hidden: that.cvColUsdHidden    // GM_SetVisible
                        })
                        .addNumberColumn({
                            name: "kurz",
                            caption: "jres:24534343", //RC 24534343 : Kurz
                            description: "jres:24534343" + ".", //RC 24534343 : Kurz
                            width: colWidthMoney,
                            hidden: that.cvColUsdHidden   // GM_SetVisible
                        })
                        .addCurrencyColumn({
                            name: "c_c_mena",
                            caption: "jres:24534378", //RC 24534378 : Cena za doklad v měně
                            description: "jres:24534378" + ".", //RC 24534378 : Cena za doklad v měně
                            width: colWidthMoney,
                            hidden: that.cvColUsdHidden
                        })
                        // skryto - dlg_DokPP.tbl_DokPP
                        //.addCurrencyColumn({ // TODO: v novějším kódu se asi bude měnit na "Cena za doklad v CZK"
                        //    name: "c_c",
                        //    caption: "jres:24534033", //RC 24534033 : Cena za doklad
                        //    description: "jres:24534387" + ".", //RC 24534387 : Cena za doklad v CZK
                        //    width: colWidthMoney
                        //})    
                        // skryto - dlg_DokPP.tbl_DokPP
                        //.addCurrencyColumn({
                        //    name: "c_1",
                        //    caption: "jres:24534379", //RC 24534379 : Cena za příjem
                        //    description: "jres:24534379" + ".", //RC 24534379 : Cena za příjem
                        //    width: colWidthMoney                          
                        //})
                        // skryto - dlg_DokPP.tbl_DokPP
                        //.addTextColumn({
                        //    name: "dat_uct",
                        //    caption: "jres:24534034", //RC 24534034 : Proúčtováno
                        //    description: "jres:24534388" + ".", //RC 24534388 : Datum proúčtování
                        //    width: colWidthDate
                        //})
                        // skryto - dlg_DokPP.tbl_DokPP
                        //.addTextColumn({
                        //    name: "ps_fak",
                        //    caption: "jres:24534035", //  //RC 24534035 : Párovací symbol
                        //    description: "jres:24534035" + ".", //RC 24534035 : Párovací symbol
                        //    width: 90
                        //})
                        // skryto - dlg_DokPP.tbl_DokPP
                        //.addDateTimeColumn({
                        //    name: "dat_zmena",
                        //    caption: "jres:24534036", //RC 24534036 : Datum změny
                        //    description: "jres:24534036" + ".",
                        //    width: colWidthDateTime
                        //})
                        .addTextColumn({
                            name: "nks",
                            caption: "jres:24534391", //  //RC 24534391 : Příjemce
                            description: "jres:24534391" + ".", 
                            width: colWidthPid - 20
                        })
                        // skryto - dlg_DokPP.tbl_DokPP
                        //.addCurrencyColumn({
                        //    name: "c_dph_s",
                        //    caption: "jres:24534038", //RC 24534038 : DPH snížená
                        //    description: "jres:24534380" + ".", //RC 24534380 : DPH snížená sazba
                        //    width: colWidthMoney
                        //})
                        // skryto - dlg_DokPP.tbl_DokPP
                        //.addCurrencyColumn({
                        //    name: "c_dph_n",
                        //    caption: "jres:24534039", //RC 24534039 : DPH normální
                        //    description: "jres:24534381" + ".", //RC 24534381 : DPH normální sazba
                        //    width: colWidthMoney
                        //})
                        // skryto - dlg_DokPP.tbl_DokPP
                        //.addCurrencyColumn({
                        //    name: "c_dph_3",
                        //    caption: "DPH 2. snížená",
                        //    description: "DPH 2. snížená sazba" + ".",
                        //    width: colWidthMoney,
                        //    hidden: true
                        //})
                        // skryto - dlg_DokPP.tbl_DokPP
                        //.addCurrencyColumn({
                        //    name: "c_dph_4",
                        //    caption: "DPH 3. snížená",
                        //    description: "DPH 3. snížená sazba" + ".",
                        //    width: colWidthMoney,
                        //    hidden: true
                        //})
                        // skryto - dlg_DokPP.tbl_DokPP
                        //.addCurrencyColumn({
                        //    name: "c_c_dph",
                        //    caption: "jres:24534040", //RC 24534040 : Celkem za doklad s DPH
                        //    description: "jres:24534040" + ".",
                        //    width: colWidthMoney
                        //})
                        .addTextColumn({
                            name: "ucs",
                            caption: "jres:24534041", //  //RC 24534041 : UCS
                            description: "jres:24534382" + ".", //RC 24534382 : Účetní středisko
                            width: 50
                        })
                        .addNumberColumn({
                            name: "rok_obd",
                            caption: "jres:24534042", //  //RC 24534042 : Rok
                            description: "jres:24534042" + ".",
                            width: colWidthSmall
                        })
                        // změněno - dlg_DokPP.tbl_DokPP, dat_zmena_vp <=> dat_zmena, viz tbl_DokPP.setCommand( )
                        .addDateTimeColumn({
                            name: "dat_zmena",
                            caption: "jres:24534392", //RC 24534392 : Okamžik výdeje
                            description: "jres:24534392" + ".",
                            width: colWidthDateTime
                        })

                });
        }, // end (prepareContent)


        //---------------------------------------------------------
        // Obsluha výběru dokladu a ukončení okna                 
        //---------------------------------------------------------
        jsVyberDoklad: function () {

            var selectedDkl =  this.$grid.ggrid("getSelection")[0];
            if (selectedDkl !== null) {
                //alert(selectedDkl);
                this.close(selectedDkl);
            }
        } // end (jsVyberDoklad)
        //---------------------------------------------------------
        

    }, { extendIntellisense: GContent });
    
    
})(jQuery);
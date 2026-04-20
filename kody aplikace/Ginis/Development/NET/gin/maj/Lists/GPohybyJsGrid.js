(function ($) {
    //==========================================
    //  Grid s majetkovými pohyby { dlg_MajPep }
    //==========================================
    "use strict";
    namespace("Gordic.Maj.WebClient.GPohybyJsGrid", {
        //data: {}
        onContentReady: function () {
            
            console.log("Gordic.Maj.WebClient.GPohybyJsGrid.onContentReady", this);
            
            var that = this;

            //=================
            // AKCE
            //=================

            // dlg_MajPep.showKarta( ) 
            var actShowKarta = new GAction({
                name: "actShowKarta",
                caption: "jres:24534244", //RC 24534244 : Karta
                icon: "gi-file",
                run: function () {
                    var row = $grid.ggrid("getSelection")[0];

                    if (row === undefined) {
                        GDlg.alert("Vyberte záznam");
                    }
                    else {
                        // majpol.init( )
                        var majpol = {};
                        majpol.maj = {};
                        majpol.maj.zev = 0;


                        //  tblPep.getRow(  )
                        majpol.maj.ixs_maj = row.ixs_maj;
                        majpol.maj.inv_cis = row.inv_cis;
                        majpol.maj.skupina_id = row.skupina_id;
                        majpol.maj.drh_id = row.drh_id;
                        majpol.maj.mat_cis = row.mat_cis;
                        majpol.maj.dev = row.dev;


                        //zobrazení karty
                        that.dialogs.showModalWindow("Gordic.Maj.WebClient.GMajKarta", {
                            argMode: 1, // ng_modefrmView (0) - prohlížení. Zapnutí = dlg_MajKarta.editKarta( ) => ng_modefrmEdit (1)
                            argMajpol: majpol,
                            argParent: 10, // ng_parentwinDlg
                            argModeReq: 0,
                            //argTypZdroj: ""
                        }, "", 1024, 768, true);

                    } // end if-else
                }
            });


            // dlg_MajPep.showDoklad( )
            var actShowDoklad = new GAction({
                name: "actShowDoklad",
                caption: "jres:24534348", //RC 24534348 : Doklad
                icon: "gi-file",
                run: function () {
                    var selectedKrt = $grid.ggrid("getSelection")[0];

                    if (selectedKrt === undefined) {
                        GDlg.alert("Vyberte záznam");
                    }
                    else {

                        // TODO: ověřit, zda při zobrazení dokladu bereme v úvahu stav knihy!
                        // If aktivita = ng_aktsubClose
                        //     Set id_table = 'xx'

                        that.navigate("Gordic.Maj.WebClient.GMajDokladDetail", {
                            Ixp: selectedKrt.ixp
                        });
                    } // end if-else
                }
            });

            //===============================================

            actShowKarta.enabled(this.cvActKartaEnabled);
            actShowDoklad.enabled(this.cvActDokladEnabled);

            //===============================================
            // MENU
            //===============================================


            this.menuBar([
                {
                    action: actShowKarta,
                    favorite: true
                },
                {
                    action: actShowDoklad,
                    favorite: true
                }   
            ]);
           
            
            //============================================
            //vytvoreni gridu + definice
            //============================================
            that = this;

            var colWidthAc = 85; 
            var colWidthPid = 115;   
            var colWidthSuAu = 80;
            var colWidthMoney = 110;
            var colWidthDate = 90;
            var colWidthDateTime = 140;
            var colWidthSmall = 40;
            var colWidthIcon = 18;
            var colWidthChar3 = 33; // zkratky
            //var colWidthChar10 = 85;
            that.tblTable = "majspep"; // na dialogu dlg_MajPep je tabulka iniciována: Call dlg_MajPep.tblPep._put( mode_p,'majspep' ) 

            var $grid = $("<div class='js-mujGrid'>")
                
                //.gautofit()
                .appendTo(this.element)
                .ggrid({
                    columnMode: "full",
                    data:this.data,
                    //defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                    //    name: "gridRowSelectedAct",
                    //    run: function (ev, ctx) {
                    //        //data, ze kterych byl vytvoren radek
                    //        var row = ctx.cellInfo.data;
                    //        // volání detailu
                    //        that.navigate('Gordic.Maj.WebClient.GMajKarta', {
                    //            IxsMaj: row.ixs_maj,
                    //            SkupinaId: row.skupina_id,
                    //            DrhId: row.drh_id                                
                    //        });
                    //    }
                    //}),                                     
                    //==========================================================
                    // SLOUPCE GRIDU { ctbl_MajPep } - stejný grid je v GMajDokladDetail a GMajPohyby
                    //==========================================================
                    columns: new Gordic.Data.GridFormat()
                        .addIconColumn({  // ctbl_MajPep.fetchRowDone( ):
                            name: "pic_color",
                            field: "st_stav",
                            caption: "",
                            description: "jres:24534594", //RC 24534594 : Příznaky
                            width: colWidthIcon,
                            iconTemplate: function (data) {
                                switch (data.st_stav) {
                                    case 90: return {
                                        icon: "fa-trash g-state-important g-state-text",
                                        text: "jres:24534357", //RC 24534357 : Storno
                                        tooltip: "jres:24534358" //RC 24534358 : Stornovaná položka
                                    };
                                    default: return null;
                                }
                            }
                        })
                        .addTextColumn({
                            name: "ac",
                            caption: "jres:24534340", //RC 24534340 : Číslo dokladu
                            width: colWidthAc,
                            hidden: (that.tblMode == 3 || that.tblMode == 1) // ng_modepepPol OR ng_modepepDok
                        })
                        .addTextColumn({
                            name: "typ_dok_zkr",
                            caption: "jres:24534025", //RC 24534025 : Typ
                            width: colWidthChar3,
                            fixedWidth: true,
                        })
                        .addNumberColumn({
                            name: "kod_poh",
                            caption: "jres:24534026", //RC 24534026 : Kód
                            width: colWidthSmall
                                                         
                        })
                        .addNumberColumn({
                            name: "ser_cislo",
                            caption: "# pol",
                            width: colWidthSmall,
                            hidden: that.tblMode == 1 // ng_modepepPol = 1
                        })                       
                        .addNumberColumn({
                            name: "ser_pcislo",
                            caption: "# poh",
                            width: colWidthSmall,
                            hidden: that.tblTable == "majspol"  // pro položky schovat
                        })
                        .addTextColumn({
                            name: "mp_stav_zkr",
                            caption: "jres:24534580", //RC 24534580 : Stav
                            headerTemplate: "jres:24534581", //RC 24534581 : S
                            width: colWidthSmall,
                            fixedWidth: true
                        })
                        .addTextColumn({
                            name: "skupina_zkr",
                            caption: "jres:24534086", //RC 24534086 : Skupina
                            headerTemplate: "jres:24534602", //RC 24534602 : Skup
                            width: 60
                        })
                        .addTextColumn({
                            name: "dev_zkr",
                            caption: "jres:24534027", //RC 24534027 : DEV
                            width: 80,
                        })
                        .addTextColumn({
                            name: "inv_cis",
                            caption: that.tblPepItemInvCis.Title,
                            width: 120,
                            hidden: that.tblPepItemInvCis.Visible === false
                        })
                        .addTextColumn({
                            name: "mat_cis",
                            caption: that.tblPepItemMatCis.Title,
                            width: 120,
                            hidden: that.tblPepItemMatCis.Visible === false
                        })
                        .addTextColumn({
                            name: "ueab_evi",
                            caption: that.tblPepItemUeabEvi.Title,
                            width: colWidthSuAu,
                            hidden: that.tblPepItemUeabEvi.Visible === false
                        })
                        .addTextColumn({
                            name: "nazev",
                            caption: that.tblPolItemNazev.Title,
                            width: 150,
                            hidden: that.tblPolItemNazev.Visible === false
                        })
                        .addCurrencyColumn({
                            name: "m",
                            caption: "jres:24534423",  //RC 24534423 : Množství
                            width: 90,
                            decimals: 3
                        })
                        .addCurrencyColumn({
                            name: "c_mena",
                            caption: "jres:24534341", //RC 24534341 : Cena v měně
                            width: colWidthMoney,
                            hidden: that.HideCiziMena   // GM_SetVisible - 380.21 12.07.18 zobrazení měny, ceny v měně  - pokud budou všechny záznamy v CZK, sloupce nebudou vidět
                        })
                        .addTextColumn({
                            name: "mena_zkr",
                            caption: "jres:24534342", //RC 24534342 : Měna
                            width: colWidthSmall,
                            hidden: that.HideCiziMena    // GM_SetVisible
                        })
                        .addNumberColumn({
                            name: "kurz",
                            caption: "jres:24534343", //RC 24534343 : Kurz
                            width: colWidthMoney,
                            hidden: that.HideCiziMena   // GM_SetVisible
                        })
                        .addCurrencyColumn({
                            name: "c",
                            caption: "jres:24534061", //RC 24534061 : Cena
                            width: colWidthMoney
                        })
                        .addCurrencyColumn({
                            name: "cmj",
                            caption: "jres:24534097", //RC 24534097 : Cena za MJ
                            width: colWidthMoney - 10
                        })
                        .addCurrencyColumn({
                            name: "c_dph",
                            caption: "jres:24534169", //RC 24534169 : DPH
                            width: colWidthMoney,
                            hidden: that.cvDphPlatce == 0 // TODO: zatím nemám událost, ošetřující "PlaceDph" k datu UUP
                        })
                        .addCurrencyColumn({
                            name: "c_c_dph",
                            caption: "jres:24534350", //RC 24534350 : Cena včetně DPH
                            width: colWidthMoney,
                            hidden: that.cvDphPlatce == 0 // TODO: zatím nemám událost, ošetřující "PlaceDph" k datu UUP
                        })
                        .addTextColumn({
                            name: "skp",
                            caption: that.tblPolItemSkp.Title,
                            width: 100
                        })
                        .addTextColumn({
                            name: "mj",
                            caption: that.tblPolItemMj.Title,
                            width: colWidthChar3 + 10
                        })
                        .addTextColumn({
                            name: "vyr_cis",
                            caption: "jres:24534151", //RC 24534151 : Výrobní číslo
                            width: 120
                        })
                        .addDateColumn({
                            name: "dat_uup",
                            caption: "jres:24534284", //RC 24534284 : Datum UÚP
                            width: colWidthDate
                        })
                        .addDateTimeColumn({
                            name: "dat_poh",
                            caption: "jres:24534344", //RC 24534344 : Datum pohybu
                            width: colWidthDateTime
                        })
                        .addDateColumn({
                            name: "dat_uct",
                            caption: "jres:24534034", //RC 24534034 : Proúčtováno
                            width: colWidthDate
                        })
                        .addTextColumn({
                            name: "nazev_poh",
                            caption: "jres:24534345", //RC 24534345 : Název pohybu
                            width: 140
                        })
                        .addTextColumn({
                            name: "druh_poh_zkr",
                            caption: "jres:24534087", //RC 24534087 : Druh
                            width: colWidthSmall + 10

                        })
                        // SKRYTÉ klíče ctbl_MajPep:
                        // typ_dok, skupina_id, drh_id, dev, por_poh, ixs_maj, typ_poh, druh_poh, ico, ucs
                        .addTextColumn({
                            name: "nks",
                            caption: "jres:24534037", //RC 24534037 : NS
                            width: colWidthPid - 20
                        })
                        .addTextColumn({
                            name: "id_top",
                            caption: "jres:24534351", //RC 24534351 : EVS vlastní
                            width: colWidthPid - 20,
                            hidden: that.cvMajInitIdTop === "NKS"
                        })
                        .addTextColumn({
                            name: "nks_ext",
                            caption: that.cvColNsExtTitle,
                            width: colWidthPid - 20
                        })
                        // SKRYTÉ klíče ctbl_MajPep:
                        // tka, mp_stav, st_stav, status_com 
                        .addTextColumn({
                            name: "ueab_por",
                            caption: that.tblPolItemUeabPor.Title,
                            width: colWidthSuAu,  // TODO: ccol_ItemNoEditUeab.SAM_Create( ) - nastavení šířky sloupce podle délky CFU
                            hidden: that.tblPolItemUeabPor.Visible === false
                        })
                        .addTextColumn({
                            name: "ueab_opr",
                            caption: that.tblPolItemUeabOpr.Title,
                            width: colWidthSuAu,
                            hidden: that.tblPolItemUeabOpr.Visible === false
                        })
                        // SKRYTÉ klíče ctbl_MajPep:
                        // skupina_odp, trida, ser_hst_maj, ser_hst_odp, typ_soubor, ixs_maj_nad
                        .addTextColumn({
                            name: "ixp",
                            caption: "jres:24534020", //RC 24534020 : Identifikátor
                            width: colWidthPid
                        })
                        // nákladové položky
                        .addTextColumn({
                            name: "naklad_p1",
                            caption: "jres:24534346" + " 1", //RC 24534346 : Spotřeba
                            width: 135  // char 16
                        })
                        .addTextColumn({
                            name: "naklad_p2",
                            caption: "jres:24534346" + " 2", //RC 24534346 : Spotřeba
                            width: 135 // char 16
                        })
                        .addTextColumn({
                            name: "naklad_p3",
                            caption: "jres:24534346" + " 3", //RC 24534346 : Spotřeba
                            width: 135 // char 16
                        })
                        // SKRYTÉ klíče ctbl_MajPep:
                        // mena
                    

                });
        }, // end (prepareContent)

        

    }, { extendIntellisense: GContent });
    
    
})(jQuery);
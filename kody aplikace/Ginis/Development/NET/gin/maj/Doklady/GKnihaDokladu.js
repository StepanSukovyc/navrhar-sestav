(function ($) {
    "use strict";
    namespace("Gordic.Maj.WebClient.GKnihaDokladu", {
        taskId: "actDklBook",       

        onContentReady: function () {

            console.log("Gordic.Maj.WebClient.GKnihaDokladu.onContentReady", this);
            var that = this;

            //===============================================
            // AKCE
            //===============================================

            var actDetail = new GAction({ // pbPol
                name: "actDetail",
                caption: "jres:24534347", //RC 24534347 : Detail
                tooltip: "jres:24534437", //RC 24534437 : Přehled majetkového dokladu a jeho položek
                icon: "gi-detail",
                run: function (ev, ctx) { // frmMUDDen.showDoklad( ) => openDoklad( ng_modeporShow )  "0=prohlížení"
                    var selectedDkl = $grid.ggrid("getSelection")[0];

                    if (selectedDkl === undefined) {
                        GDlg.alert("jres:24534362"); //RC 24534362 : Vyberte záznam
                    }
                    else {
                        that.openDoklad(selectedDkl.ixp, 0);  // volání detailu - frmMUDDen.openDoklad( ng_modeporShow = 0 )
                    } // end if-else
                }
            });

            var actPodani = new GAction({ // pbNew
                name: "actPodani",
                caption: "jres:24534050", //RC 24534050 : Podat
                tooltip: "jres:24534436", //RC 24534436 : Podání nového majetkového dokladu
                icon: "gi-plus", 
                run: function (ev, ctx) { // frmMUDDen.newDoklad( )

                    // openDoklad( ng_modeporInsert )
                                        
                    var options = {
                        TypDok: Gordic.Wfl.Globals.Enums.TypDok.Vlastni,
                        TypId: Gordic.Wfl.Globals.Enums.TypId.Ixp,
                        ZpusobGenerovaniIxp: Gordic.Wfl.Globals.Enums.ZpusobGenerovaniIxp.Opisem
                    };

                    Gordic.Wfl.Dialogs.GenerovaniIxp(that, options, Gordic.Gin.Globals.Enums.ModOtevreni.showModalWindow).done(function (retVal, content) {
                        //window.alert(retVal);
                        if (retVal) {
                            that.call("Podani", { ixpRec: retVal.Ixp })
                                .done(function (retVal2, content) {
                                    that.openDoklad(retVal.Ixp, 2);   // ng_modeporInsert = 2
                                    //that.navigate('Gordic.Maj.WebClient.GMajDokladDetail', {
                                    //    argIxp: retVal.Ixp
                                    //});
                                });
                        }
                    });                   
                }
            });

            var actPohyby = new GAction({
                name: "actPohyby",
                caption: "jres:24534008", //RC 24534008 : Pohyby
                tooltip: "jres:24534439", //RC 24534439 : Přehled pohybů majetkového dokladu
                icon: "gi-list",
                run: function (ev, ctx) { // frmMUDDen.showPohyb( )   - Call SalModalDialog( dlg_MajPep,hWndForm,ng_modepepDok,tbl_Mud.ixp,tbl_Mud.ac,0,'','','', 0 )
                    var selectedDkl = $grid.ggrid("getSelection")[0];

                    if (selectedDkl === undefined) {
                        GDlg.alert("Vyberte záznam");
                    }
                    else {
                        that.navigate('Gordic.Maj.WebClient.GPohybyJsGrid', {
                            argIxp: selectedDkl.ixp,
                            argMode: 3,
                            argAc: selectedDkl.ac
                        });
                    } // end if-else
                }
            });

            var actKarty = new GAction({
                name: "actKarty",
                caption: "jres:24534339", //RC 24534339 : Karty
                tooltip: "jres:24534438", //RC 24534438 : Přehled karet evidovaného majetku k majetkovému dokladu
                icon: "gi-file",
                run: function (ev, ctx) { // frmMUDDen.showKarty( )    - Call SalModalDialog( dlg_MajMajMud,hWndForm,tbl_Mud.ixp,tbl_Mud.ac )
                    var selectedDkl = $grid.ggrid("getSelection")[0];

                    if (selectedDkl === undefined) {
                        GDlg.alert("Vyberte záznam");
                    }
                    else {
                        that.navigate('Gordic.Maj.WebClient.GKartyJsGrid', {
                            argIxp: selectedDkl.ixp,
                            argAc: selectedDkl.ac
                        });
                    } // end if-else
                }
            });

            //===============================================

            actPodani.enabled(this.cvPbNewEnabled);

            //===============================================
            // MENU
            //===============================================


            this.menuBar([
                {
                    action: actDetail,
                    favorite: true
                },
                {
                    action: actPodani,
                    favorite: true
                },
                {
                    action: actPohyby,
                    favorite: true
                },
                {
                    action: actKarty, // Přehled karet evidovaného majetku k majetkovému dokladu
                    favorite: true
                }
            ]);
          

            // nastaveni dynamicky vytvorenych breadcrumbs; vice breadcrumbs na content
            this.setBreadcrumbs([
                { caption: "Kniha dokladů" },
                {
                    caption: "Výběrový filtr - zobrazit režim knih????", action: new GAction({ name: "actBack", run: function () { that.tryCloseAllChildContents(); } }),
                    //children: [
                    //    { type: "static", caption: "Kniha 1" },
                    //    { type: "static", caption: "Kniha 2" }
                    //]
                } // pokus o uzavreni vsech podrizenych oken 
            ]);

            //sluzba pro pristup k datum ze serveru //{className:"", params: {}}
            this.srv = new GContent({ className: "Gordic.Maj.WebClient.GKnihaDokladu", params: { } });  //sluzba pro pristup k datum na serveru + predani parametru

            

            //==============================================================================================
            //   HLAVIČKA - formulář 1/2 pro GKnihaDokladuFilterDto   
            //==============================================================================================

            var FormHlavickaDkl = new Gordic.Forms.Form({
                tabLabel: "jres:24534440", //RC 24534440 : Hlavička dokladu
                name: "formHLA",
                layoutDescriptor: "L2M2S1, L-4-8-0, M-4-8-0, S-12-12-0, breaks-900"
            })
               .addSection("Identifikace a stavy dokladu")

                    .addRow("jres:24534020").addField("gstringbox", Gordic.Prefabs.String.ixs(), { //RC 24534020 : Identifikátor
                        name: "ixp",
                        model: "Identifikator"
                    })

                    .addRow("jres:24534018").addField("gstringbox", { //RC 24534018 : Agendové číslo
                        name: "ac_ag",
                        model: "AgendoveCislo",
                        allowedChars: "0123456789"                      
                    })

                    .addRow("jres:24534017").addField("gstringbox", { //RC 24534017 : Evidenční číslo
                        name: "ac",
                        model: "EvidenciCislo",
                        allowedChars: "0123456789"
                    })                    

                    .addRow("jres:24534441").addField("gselectbox", {   //RC 24534441 : Stav evidence
                        name: "stav_evi",
                        model: "StavEvidence = id",
                        dropdown: true,                       
                        itemTemplate: "{nazev}",                        
                        data: new Gordic.Data.View([ // TODO: Domluvit se s Honzou, zda nedat do DB
                            { nazev: "evidované", id: 10 },
                            { nazev: "neevidované", id: 20 },
                            { nazev: "aktuálně evidované", id: 30 },
                            { nazev: "přeevidované z", id: 40 },
                            { nazev: "přeevidované do", id: 50 },
                            { nazev: "původní", id: 60 }
                        ], { key: "id" }),
                        emptyValue: { id: 10 },
                        initialValue: { nazev: "evidované", id: 10 }                     
                    })

                    .addRow("jres:24534021").addField("gselectbox", { //RC 24534021 : Stav dokladu
                        name: "mp_stav",
                        model: "Stav = mp_stav",
                        dropdown: true,
                        itemTemplate: "{mp_stav_txt}",
                        helperColumns: ["mp_stav_txt"],
                        data: new Gordic.Data.View(this.majccsv, { key: "mp_stav" }),
                    })                    
                                   
                    .addRow("jres:24534142").addField("gselectbox", "w-10", { //RC 24534142 : Vlastník
                        name: "ixs_fun",
                        model: "Vlastnik = ixs_fun",
                        dropdown: false,
                        itemTemplate: "{nazev_rf}",
                        helperColumns: ["nazev_rf"],
                        data: new Gordic.Data.View(this.vlastnici, { key: "ixs_fun" }),
                    }).
                        addField("gcheck", "w-2", {
                            name: "ixs_fun_Hst",
                            model: "JeVlastnikHistoricky",
                            tooltip:"Zohlední i vlastnictví, které již není aktuální.",
                            label: "Hist."
                        })

                    .addRow("jres:24534442").addField("gselectbox", { //RC 24534442 : Příznak přečtení
                        name: "sbPrizView",
                        model: "PriznakPrecteni = id",
                        dropdown: true,
                        itemTemplate: "{nazev}",
                        data: new Gordic.Data.View([
                          //  { nazev: "neurčeno", id: 1 },
                            { nazev: "přečteno", id: 0 }, // TODO: napojit na vas.gincvie 
                            { nazev: "nepřečteno", id: 10 }
                        ], { key: "id" }),
                        emptyValue: null
                    })

                //RC 24534443 : od-do
                    .addRow("jres:24534444" + " " +"jres:24534443") //RC 24534444 : Celková cena
                               .addField("gnumberbox", "w-5", { //, Gordic.Prefabs.Number.currency()
                                   name: "nbCCena0",
                                   model: "CelkovaCenaOd",
                                   decimals: 2,
                                   fixed: true,
                                   thousandsSeparator: " ",
                                   emptyValue: null
                               })
                               .addField("gnumberbox", "w-5", { //, Gordic.Prefabs.Number.currency()
                                   name: "nbCCena1",
                                   model: "CelkovaCenaDo",
                                   decimals: 2,
                                   fixed: true,
                                   thousandsSeparator: " ",
                                   emptyValue: null
                               })
                                .addField("gcheck", "w-2", {
                                    name: "chbCCenaNon",
                                    model: "CelkovaCenaNegace",
                                    label: "jres:24534445" //RC 24534445 : Non
                                })

                     .addRow("jres:24534028").addField("gstringbox", { //RC 24534028 : Popis
                         name: "tbPopis",
                         model: "Popis"
                     })

                    .addRow("jres:24534447").addField("gselectbox", { //RC 24534447 : Zprávy dohledového systému
                        name: "sbDsg",
                        model: "ZpravyDohledSystemu = id",
                        dropdown: true,
                        itemTemplate: "{nazev}",
                        helperColumns: ["nazev"],
                        data: new Gordic.Data.View([
                           // { nazev: "neurčeno", id: -1 },
                            { nazev: "ano", id: 1 }, // TODO: napojit na číselník vas.gincisp 
                            { nazev: "ne", id: 0 }
                        ], { key: "id" }),
                        emptyValue: { id: -1 }
                    })

                    .addRow("jres:24534446").addField("gselectbox", Gordic.Prefabs.Select.wflKlicSlova(), { //RC 24534446 : Klíčová slova
                        name: "sbKlicSlova",
                        model: "model.KlicovaSlova = value.kl_slovo",
                    })

                //==============================================================================================
                .addSection("jres:24534450") //RC 24534450 : Údaje pohybu

                .addRow("jres:24534026" + " " + "jres:24534443") //RC 24534026 : Kód
                .addField("gselectbox", "w-6", Gordic.Prefabs.Select.majspoh(), {
                            name: "sbKodPohOd",
                            model: "KodPohybuOd",                                                        
                            helperItemTemplate: "<b>{kod_poh}</b> | Typ: <b>{typ_dok_zkr}</b> | DEV: <b>{dev_zkr}</b> | <b>{nazev}</b>"                                                        
                        })
                .addField("gselectbox", "w-6", Gordic.Prefabs.Select.majspoh(), {
                            name: "sbKodPohDo",
                            model: "KodPohybuDo",                            
                            helperItemTemplate: "<b>{kod_poh}</b> | Typ: <b>{typ_dok_zkr}</b> | DEV: <b>{dev_zkr}</b> | <b>{nazev}</b>"                            
                        })

                    .addRow("jres:24534043").addField("gselectbox", { //RC 24534043 : Typ dokladu
                        name: "typ_dok",
                        model: "Typ = typ_dok",
                        dropdown: true,
                        itemTemplate: "{typ_dok_txt}",
                        helperColumns: ["typ_dok_txt"],
                        data: new Gordic.Data.View(this.majcstp, { key: "typ_dok" }),
                    })                   

                .addRow("jres:24534284" + " " + "jres:24534443") //RC 24534284 : Datum UÚP
                    .addField("gdatebox", "w-6", {
                        name: "dat_uup_od",
                        model: "DatumUupOd",
                    }).addField("gdatebox", "w-6", {
                        name: "dat_uup_do",
                        model: "DatumUupDo",
                    })

                // TODO: Na přehledu je "Datum evidence", na filtru "Datum podání" (?)
                .addRow("jres:24534451" + " " + "jres:24534443").addField("gdatebox", "w-6", { //RC 24534451 : Datum podání
                        name: "dat_pod_od",
                        model: "DatumPodaniOd",
                    }).addField("gdatebox", "w-6", {
                        name: "dat_pod_do",
                        model: "DatumPodaniDo",
                    })

                .addRow("jres:24534452" + " " + "jres:24534443").addField("gdatebox", "w-6", { //RC 24534452 : Datum zaúčtování
                        name: "dat_uct_od",
                        model: "DatumZauctovaniOd"
                    }).addField("gdatebox", "w-6", {
                        name: "dat_uct_do",
                        model: "DatumZauctovaniDo"
                    })
                              
                //  NS vlastní
                    .addRow("jres:24534453").addField("gselectbox", Gordic.Prefabs.Select.ekosnks(), { //RC 24534453 : NKS vlastní
                        name: "sbNsVlastni",
                        model: "NksVlastni= nks",
                        serverFilters: {
                            ico: this.cvEkoIco
                            //rok_od: "<=2014", // + this.cvEkoRok,
                            //rok_do: ">=2014", // + this.cvEkoRok,
                        },
                        dropdown: false,                    
                    })
                    
                // ES vlastní
                    .addRow("jres:24534351").addField("gselectbox",  Gordic.Prefabs.Select.ekosstr(), { //RC 24534351 : EVS vlastní
                        name: "sbEsVlastni",
                        model: "NksVlastni = stredisko",
                        helperItemTemplate: "<b>{stredisko}</b> - {nazev} | Vzd.přístup: {priz_isl_txt} | [<i>{aktivita_txt}</i>]",
                        serverFilters: {                            
                            aktivita: 100
                        },
                        dropdown: false,
                    })

                .addRow("jres:24534046").addField("gselectbox", Gordic.Prefabs.Select.ekosnks(), {
                        name: "sbNksPrijemVydej",
                        model: "NksPrijemVydej = nks",
                        serverFilters: {
                            ico: this.cvEkoIco
                            //  rok_od: 2016,
                        },
                        tooltip:"jres:24534047",
                        dropdown: false                      
                    })

                .addRow("jres:24534352").addField("gselectbox", Gordic.Prefabs.Select.ekosstr(), {
                        name: "sbEvsPrijemVydej",
                        model: "NksPrijemVydej = stredisko",
                        helperItemTemplate: "<b>{stredisko}</b> - {nazev} | Vzd.přístup: {priz_isl_txt} | [<i>{aktivita_txt}</i>]",
                        serverFilters: {                            
                            aktivita: 100
                        },
                        dropdown: false
                    })
                                
                //==============================================================================================
                .addSection("jres:24534454") //RC 24534454 : Externí vazby

                    .addRow("jres:24534035").addField("gstringbox", { //RC 24534035 : Párovací symbol
                        name: "ps_fak",
                        model: "ParovaciSymbol"
                    })                    

                .addRow("jres:24534029").addField("gselectbox", Gordic.Prefabs.Select.ginsesu(), {
                        name: "ixs_esu",
                        model: "DodavatelIxsEko = ixs_eko; DodavatelIxsEsu = ixs_esu",
                        dropdown: false
                    })
                      
                    .addRow("jres:24534458").addField("gstringbox", { //RC 24534458 : Externí číslo dokladu
                        name: "ac_ext",
                        model: "DokladCizi"
                    })

                    .addRow("jres:24534455").addField("gselectbox", Gordic.Prefabs.Select.ginsref(), "w-10", { //RC 24534455 : Osoba
                        name: "sbGinsrefOsb",
                        model: "ZodpovednyRef = ixs_ref",
                        dropdown: false
                    })
                        .addField("gcheck", "w-2", {
                            name: "ixs_ref_non",
                            model: "ZodpovednyRefNegace",
                            label: "jres:24534445"
                        })

                     .addRow("jres:24534456").addField("gstringbox", { //RC 24534456 : Identifikátor v ext. systému
                         name: "tbIdExt",
                         model: "IdentifikatorExterni"
                     })
                
                    .addRow("jres:24534457").addField("gselectbox",  {                         //RC 24534457 : Vznik ze žádosti ext. systému
                        name: "sbZadostExt",
                        model: "VznikExterni = id",
                        dropdown: true,
                        itemTemplate: "{nazev}",
                        helperColumns: ["nazev"],
                        data: new Gordic.Data.View([
                          //  { nazev: "neurčeno", id: -1 },
                            { nazev: "ano", id: 1 },
                            { nazev: "ne", id: 0 },                            
                        ], { key: "id" }),
                        emptyValue: { id: -1 }
                    })                                   

                //==============================================================================================                

                .addSection("jres:24534346") //RC 24534346 : Spotřeba
                    
                    //.addRow("Posledních").addField("gnumberbox", "w-4", {
                    //    name: "nbLastN",                        
                    //    model: "PoslednichN",
                    //    allowedChars: "0123456789",
                    //    emptyValue: null,
                    //})                          

                    

                    .addRow("jres:24534114").addField("gselectbox", Gordic.Prefabs.Select.ginsorj(), "w-10", { //RC 24534114 : Referát
                        name: "sbGinsorj",
                        model: "ReferatOrj = ixs_orj",
                        serverFilters: { aktivita: [100, 300, 500, 600] },
                        tooltip: "jres:24534114" + " / " + //RC 24534114 : Referát
                            "24534448", //RC 24534448 : Organizační jednotka
                        dropdown: false
                    })
                        .addField("gcheck", "w-2", {
                            name: "chbReferatNon",
                            model: "ReferatOrjNegace",
                            label: "jres:24534445"
                        })

                    .addRow("jres:24534210").addField("gselectbox", Gordic.Prefabs.Select.ginsref(), "w-10", { //RC 24534210 : Zodpovídá
                        name: "sbGinsref",
                        model: "ZodpovednyRef = ixs_ref",
                        dropdown: false,
                    })
                        .addField("gcheck", "w-2", {
                            name: "ixs_ref_non",
                            model: "ZodpovednyRefNegace",
                            label: "jres:24534445"
                        })

                    // Evidenční středisko OD-DO
                    .addRow("jres:24534209") //RC 24534209 : Evidenční středisko
                        .addField("gselectbox", "w-10", Gordic.Prefabs.Select.ekosstr(), {
                            name: "sbEvs1",
                            model: "EvStrediskoOd = stredisko",
                            helperItemTemplate: "<b>{stredisko}</b> - {nazev} | Vzd.přístup: {priz_isl_txt} | [<i>{aktivita_txt}</i>]",
                            serverFilters: {                                
                                aktivita: null
                            },
                            dropdown: false,
                        })
                        //.addField("gselectbox", "w-6", Gordic.Prefabs.Select.ekosstr(), {
                        //    name: "sbEvs2",
                        //    model: "EvStrediskoDo = stredisko",
                        //    helperItemTemplate: "<b>{stredisko}</b> - {nazev} | Vzd.přístup: {priz_isl_txt} | [<i>{aktivita_txt}</i>]",
                        //    serverFilters: {
                        //        ico: this.cvEkoIco,
                        //        aktivita: null
                        //    },
                        //    dropdown: false,
                        //})
                        .addField("gcheck", "w-2", {
                            name: "chbEvsNon",
                            model: "EvStrediskoNegace",
                            label: "jres:24534445"
                        })
                    
                    // Objekt OD-DO
                .addRow("jres:24534128" + " " + "jres:24534443") //RC 24534128 : Objekt
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.ekosobj(), {
                            name: "sbObjekt1",
                            model: "ObjektOd = objekt",
                            helperItemTemplate: "<b>{objekt}</b> - {nazev}  (<i>{aktivita_txt}</i>)",
                            serverFilters: {                                
                                aktivita: [100, 500] // v7běrová maska má rozšířenou aktivitu - 380.13 16.05.18 sjednoceno v rámci systému na 100, 500
                            },
                            dropdown: false
                        })
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.ekosobj(), {
                            name: "sbObjekt2",
                            model: "ObjektDo = objekt",
                            helperItemTemplate: "<b>{objekt}</b> - {nazev} (<i>{aktivita_txt}</i>)",
                            serverFilters: { aktivita: [100, 500] },
                            dropdown: false
                        })
                        .addField("gcheck", "w-2", {
                            name: "chbObjektNon",
                            model: "ObjektNegace",
                            label: "jres:24534445"
                        })

                .addRow("jres:24534108" + " " + "jres:24534443") //RC 24534108 : Třída
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.majstri(), {
                            name: "sbMajstri0",
                            model: "TridaOd = trida",
                            serverFilters: { ico: this.cvEkoIco, aktivita: 100 }                           
                        })
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.majstri(), {
                            name: "sbMajstri1",
                            model: "TridaDo = trida",
                            serverFilters: { ico: this.cvEkoIco, aktivita: 100 }                           
                        })                        
                        .addField("gcheck", "w-2", {
                            name: "chbTridaNon",
                            model: "TridaNegace",
                            label: "jres:24534445"
                        })                                                        

                .addRow("jres:24534143" + " 1" + " " + "jres:24534443") //RC 24534143 : Externí lokace
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.majsel1(), {
                            name: "sbMajsel1_0",
                            model: "ExterniLokace1Od = ext_1",                            
                            serverFilters: { ico: this.cvEkoIco, aktivita: [100,500] }
                        })
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.majsel1(), {
                            name: "sbMajsel1_1",
                            model: "ExterniLokace1Do = ext_1",
                            serverFilters: { ico: this.cvEkoIco, aktivita: [100, 500] }
                        })
                        .addField("gcheck", "w-2", {
                            name: "chbExt1Non",
                            model: "ExterniLokace1Negace",
                            label: "jres:24534445"
                        })

                .addRow("jres:24534143" + " 2" + " " + "jres:24534443")
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.majsel2(), {
                            name: "sbMajsel2_0",
                            model: "ExterniLokace2Od = ext_2",
                            serverFilters: { ico: this.cvEkoIco, aktivita: [100, 500] }
                        })
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.majsel2(), {
                            name: "sbMajsel2_1",
                            model: "ExterniLokace2Do = ext_2",
                            serverFilters: { ico: this.cvEkoIco, aktivita: [100, 500] }
                        })
                        .addField("gcheck", "w-2", {
                            name: "chbExt2Non",
                            model: "ExterniLokace2Negace",
                            label: "jres:24534445"
                        })

                .addRow("jres:24534143" + " 3" + " " + "jres:24534443")
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.majsel3(), {
                            name: "sbMajsel3_0",
                            model: "ExterniLokace3Od = ext_3",
                            serverFilters: { ico: this.cvEkoIco, aktivita: [100, 500] }
                        })
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.majsel3(), {
                            name: "sbMajsel3_1",
                            model: "ExterniLokace3Do = ext_3",
                            serverFilters: { ico: this.cvEkoIco, aktivita: [100, 500] }
                        })
                        .addField("gcheck", "w-2", {
                            name: "chbExt3Non",
                            model: "ExterniLokace3Negace",
                            label: "jres:24534445"
                        })
           
            ; // end form
            
            //FormHlavickaDkl.form.sections[0].rows[10].addField("gcheck", "w-2", {
            //    name: "text1",
            //    label:"TEST",                
            //});
           

            //==============================================================================================
            //   POLOŽKY 
            //==============================================================================================

            var FormPolozkyDkl = new Gordic.Forms
            .Form({ tabLabel: "jres:24534007", name: "formPOL", layoutDescriptor: "L2M2S1, L-4-8-0, M-4-8-0, S-12-12-0, breaks-900" }) //RC 24534007 : Položky
               .addSection()

                .addRow("jres:24534459" + " " + "jres:24534443") //RC 24534459 : Skupina majetku
                        .addField("gselectbox", "w-5", {
                            name: "sbMajcsmk0",
                            model: "SkupinaMajetkuOd = skupina_id",
                            dropdown: false,
                            itemTemplate: "{skupina_zkr}",
                            helperItemTemplate: "<b>{skupina_id}</b> | <b>{skupina_zkr}</b> - {skupina_txt}",
                            helperColumns: ["skupina_id", "skupina_txt", "skupina_zkr"],                            
                            data: new Gordic.Data.View(this.majcskm, { key: "skupina_id" }),
                        })
                        .addField("gselectbox", "w-5", {
                            name: "sbMajcsmk1",
                            model: "SkupinaMajetkuDo = skupina_id",
                            dropdown: false,
                            itemTemplate: "{skupina_zkr}",
                            helperItemTemplate: "<b>{skupina_id}</b> | <b>{skupina_zkr}</b> - {skupina_txt}",
                            helperColumns: ["skupina_id", "skupina_txt", "skupina_zkr"],                            
                            data: new Gordic.Data.View(this.majcskm, { key: "skupina_id" }),
                        })
                        .addField("gcheck", "w-2", {
                            name: "skm_non",
                            model: "SkupinaMajetkuNegace",
                            label: "jres:24534445"
                        })

                .addRow("jres:24534149" + " " + "jres:24534443") //RC 24534149 : Druh majetku
                        .addField("gselectbox", "w-5", {
                            name: "sbDrm0",
                            model: "DruhMajetkuOd = drh_id",
                            dropdown: false,
                            itemTemplate: "{drh_zkr}",
                            helperItemTemplate: "<b>{drh_id}</b> | <b>{skupina_zkr}</b> | <b>{drh_txt}</b> &nbsp;(Odpis: {mode_odp_txt}, &nbsp;{s_prodej_txt})",
                            helperColumns: ["drh_id", "drh_txt", "drh_zkr"],                            
                            data: new Gordic.Data.View(this.majcdrm, { key: "drh_id" }),
                        })
                        .addField("gselectbox", "w-5", {
                            name: "sbDrm1",
                            model: "DruhMajetkuDo = drh_id",
                            dropdown: false,
                            itemTemplate: "{drh_zkr}",
                            helperItemTemplate: "<b>{drh_id}</b> | <b>{skupina_zkr}</b> | <b>{drh_txt}</b> &nbsp;(Odpis: {mode_odp_txt}, &nbsp;{s_prodej_txt})",
                            helperColumns: ["drh_id", "drh_txt", "drh_zkr"],                            
                            data: new Gordic.Data.View(this.majcdrm, { key: "drh_id" }),
                        })
                        .addField("gcheck", "w-2", {
                            name: "chbDrmNon",
                            model: "DruhMajetkuNegace",
                            label: "jres:24534445",
                        })

                    .addRow("jres:24534058") //RC 24534058 : Inventární číslo
                        .addField("gstringbox", "w-10", {
                            name: "tbInvCis",
                            model: "InventarniCislo",
                        })
                       .addField("gcheck", "w-2", {
                           name: "chbInvCisNon",
                           model: "InventarniCisloNegace",
                           label: "jres:24534445"
                       })

                // TODO: Prefab MAJSCIM - už je napojen na kartotéce
                .addRow("jres:24534060" + " " + "jres:24534443") //RC 24534060 : Materiálové číslo
                        .addField("gstringbox", "w-5", { placeholder:"prefab!" })
                        .addField("gstringbox", "w-5", { placeholder: "prefab!" })
                        .addField("gcheck", "w-2", { name: "mat_cis_non", label: "jres:24534445" })

                    .addRow("jres:24534151") //RC 24534151 : Výrobní číslo
                        .addField("gstringbox", "w-10", {
                            name: "tbVyrCis",
                            model: "VyrobniCislo",
                        })
                       .addField("gcheck", "w-2", {
                           name: "chbVyrCisNon",
                           model: "VyrobniCisloNegace",
                           label: "jres:24534445"
                       })

                .addRow("jres:24534093" + " " + "jres:24534443") //RC 24534093 : Klasifikace
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.ekoskla(), {
                            name: "sbEkoskla0",
                            model: "KlasifikaceOd = skp",
                            tooltip: "jres:24534449", //RC 24534449 : Klasifikace produkce, služeb a stavebních děl
                            dropdown: false,
                        })
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.ekoskla(), {
                            name: "sbEkoskla1",
                            model: "KlasifikaceDo = skp",
                            dropdown: false,
                        })
                        .addField("gcheck", "w-2", {
                            name: "chbSkpNon",
                            model: "KlasifikaceNegace",
                            label: "jres:24534445"
                        })

                // TODO: napojit vas.majsuea a vas.majsvue + jak na výběr varianty?
                .addRow("jres:24534461" + " " + "jres:24534443") //RC 24534461 : SuAu evidence
                        .addField("gselectbox", "w-5", {
                            placeholder: "prefab!"
                        })
                        .addField("gselectbox", "w-5", { placeholder: "prefab!" })
                        .addField("gcheck", "w-2", { name: "suauevi_non", label: "jres:24534445" })                                        

                .addRow("jres:24534108" + " " + "jres:24534443") //RC 24534108 : Třída                        
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.majstri(), {
                            name: "pol_trida",
                            //model: "TridaOd = trida",
                            serverFilters: { ico: this.cvEkoIco, aktivita: [100,500] }                            
                        })
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.majstri(),{
                            name: "pol_trida2",                            
                            //helperItemTemplate: "<b>{trida}</b> - {nazev} | &nbsp;{aktivita_txt}",
                            serverFilters: { ico: this.cvEkoIco, aktivita: [100, 500] }                            
                        })
                        .addField("gcheck", "w-2", { name: "pol_trida_non", label: "jres:24534445" })

                //==============================================================================================

                .addSection()

                .addRow("jres:24534417" + " " + "jres:24534443") //RC 24534417 : Cena položky
                           .addField("gnumberbox", "w-5", {
                               name: "nbCenaPol0",
                               model: "CenaPolOd",
                               decimals: 2,
                               fixed: true,
                               thousandsSeparator: " ",
                               emptyValue: null,
                           })
                           .addField("gnumberbox", "w-5", {
                               name: "nbCenaPol0",
                               model: "CenaPolDo",
                               decimals: 2,
                               fixed: true,
                               thousandsSeparator: " ",
                               emptyValue: null,
                           })
                            .addField("gcheck", "w-2", {
                                name: "chbCenaPolNon",
                                model: "CenaPolNegace",
                                label: "jres:24534445"
                            })

                .addRow("jres:24534460" + " " + "jres:24534443") //RC 24534460 : Množství položky
                           .addField("gnumberbox", "w-5", {
                               model: "MnozstviPolOd",
                               emptyValue: null,
                           })
                           .addField("gnumberbox", "w-5", {
                               model: "MnozstviPolDo",
                               emptyValue: null,
                           })
                            .addField("gcheck", "w-2", {
                                model: "MnozstviPolNegace",
                                label: "jres:24534445"
                            })

                    // Evidenční středisko OD-DO
                .addRow("jres:24534209" + " " + "jres:24534443") //RC 24534209 : Evidenční středisko
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.ekosstr(), {
                            name: "sbEvsPol1",
                            model: "EvidStrediskoOd = stredisko",
                            helperItemTemplate: "<b>{stredisko}</b> - {nazev} | Vzd.přístup: {priz_isl_txt} | [<i>{aktivita_txt}</i>]",
                            serverFilters: {                               
                                aktivita: null
                            },
                            dropdown: false,
                        })
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.ekosstr(), {
                            name: "sbEvsPol2",
                            model: "EvidStrediskoDo = stredisko",
                            helperItemTemplate: "<b>{stredisko}</b> - {nazev} | Vzd.přístup: {priz_isl_txt} | [<i>{aktivita_txt}</i>]",
                            serverFilters: {                               
                                aktivita: null
                            },
                            dropdown: false,
                        })
                        .addField("gcheck", "w-2", {
                            name: "chbEvsPolNon",
                            model: "EvidStrediskoNegace",
                            label: "jres:24534445"
                        })

                    // Objekt OD-DO
                    .addRow("jres:24534128" + " " + "jres:24534443") //RC 24534128 : Objekt
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.ekosobj(), {
                            name: "sbObjektPol1",
                            model: "ObjektPolOd = objekt",
                            helperItemTemplate: "<b>{objekt}</b> - {nazev}  (<i>{aktivita_txt}</i>)",
                            serverFilters: {                                
                                aktivita: [100, 500]
                            },
                            dropdown: false
                        })
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.ekosobj(), {
                            name: "sbObjektPol2",
                            model: "ObjektPolDo = objekt",
                            helperItemTemplate: "<b>{objekt}</b> - {nazev} (<i>{aktivita_txt}</i>)",
                            serverFilters: {                                
                                aktivita: [100, 500]
                            },
                            dropdown: false
                        })
                        .addField("gcheck", "w-2", {
                            name: "chbObjektPolNon",
                            model: "ObjektPolNegace",
                            label: "jres:24534445"
                        })

                    .addRow("jres:24534114") //RC 24534114 : Referát
                        .addField("gselectbox", Gordic.Prefabs.Select.ginsorj(), "w-10", {
                            name: "sbGinsorjPol",
                            model: "ReferatPol = ixs_orj",
                            serverFilters: { aktivita: [100, 300, 500, 600] },
                            tooltip: "jres:24534114" + " / " + "jres:24534448", //RC 24534448 : Organizační jednotka
                            dropdown: false,
                        })
                        .addField("gcheck", "w-2", {
                                name: "chbReferatNon",
                                model: "ReferatPolNegace",
                            label: "jres:24534445"
                        })

                .addRow("Sklad / Budova" + " " + "jres:24534443")
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.ginsbudmaj(), {
                            name: "sbGinsbud0",
                            model: "BudovaOd = budova_kod",
                            serverFilters: { ico: this.cvEkoIco, },
                            dropdown: false,
                        })
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.ginsbudmaj(), {
                            name: "sbGinsbud1",
                            model: "BudovaDo = budova_kod",
                            serverFilters: { ico: this.cvEkoIco, },
                            dropdown: false,
                        })
                        .addField("gcheck", "w-2", {                           
                            model: "BudovaNegace",
                            label: "jres:24534445"
                        })
            
                .addRow("Regál / Segment" + " " + "jres:24534443")
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.ginssbumaj(), {
                            name: "sbGinssbu0",
                            model: "SegmentOd = segment_kod",
                            serverFilters: { ico: this.cvEkoIco, },                           
                            dropdown: false,
                        })
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.ginssbumaj(), {
                            name: "sbGinssbu1",
                            model: "SegmentDo = segment_kod",
                            serverFilters: { ico: this.cvEkoIco, },
                            dropdown: false,
                        })
                        .addField("gcheck", "w-2", {                          
                            model: "SegmentNegace",
                            label: "jres:24534445"
                        })

                    .addRow("Police / Místnost" + " " + "jres:24534443")
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.ginsmismaj(), {
                            name: "sbGinsmis0",
                            model: "MistnostOd = mistnost_kod",
                            serverFilters: { ico: this.cvEkoIco, },
                            dropdown: false,
                        })
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.ginsmismaj(), {
                            name: "sbGinsmis1",
                            model: "MistnostDo = mistnost_kod",
                            serverFilters: { ico: this.cvEkoIco, },
                            dropdown: false,
                        })
                        .addField("gcheck", "w-2", {                            
                            model:"MistnostNegace",
                            label: "jres:24534445"
                        })

            ; // end form


            // ukázkové definice formuláře který se zobrazí při ukládání
            var formInSaveDialog = new Gordic.Forms
            .Form({ tabLabel: "Parametry", name: "savingDialog", layoutDescriptor: "L1M1S1" })
             .addSection({ customClass: "w-L-8 w-M-7 w-S-12", layoutDescriptor: "L2M2S1, L-3-9-0, M-12-12-0, S-12-12-0" })
                //.addRow("Pojmenovaný filtr").addField("gstringbox", { name: "userFilterInSaveDialog"})
                .addRow("Jméno Filtru").addField("gstringbox", { name: "name" })
                .addRow("Poznámka").addField("gstringbox", { name: "poznamka" })
                .addSection({ customClass: "w-L-1 w-M-2 w-S-6", layoutDescriptor: "L2M2S1, L-0-12-0, M-12-12-0, S-12-12-0" })
                    .addRow().addField("gcheck", { name: "aktivita", label: "Aktivní" })
                    .addRow().addField("gcheck", { name: "vlastni", label: "Vlastní" })
                .addSection({ customClass: "w-L-3 w-M-3 w-S-6", layoutDescriptor: "L2M2S1, L-0-12-0, M-12-12-0, S-12-12-0" })
                    .addRow().addField("gradio", {
                        name: "typ",
                        initialValue: 'a',
                        itemClass: "w-12",
                        radios: [
                          { value: 'a', label: 'Osobní' },
                          { value: 'b', label: 'Veřejná' },
                          { value: 'c', label: 'Za spisový uzel' },
                        ]
                    });


            // simulace uložiště filterStorageService
            var filters = [{ name: "Příklad 1", description: "Moje poznámečka, aktivní", cislo1: { o: "!=", v: 12345 }, Zkratka: "zkr", aktivita: true, poznamka: "Moje poznámečka" }
                            , { name: "Příklad 2 ", description: "Poznámečka jejich, neaktivní", cislo1: { o: ">=", v: 987654 }, Zkratka: "PPH", aktivita: false, poznamka: "Poznámečka do větru" }
            ];

            // simulace  filterStorageService lze využít pro vývoj (později bude vytvořena společná servica, kdo jí bude chtít používat, vymění/ vymaže pouze option filterStorageService  u gfilterpanelu)
            var filterStorageService = function () { };
            filterStorageService.prototype.getFilters = function () {
                var deferred = $.Deferred();
                window.setTimeout(function () {
                    deferred.resolve(filters);      // vracím pole objectu s filtry s následujícím {name:"", hidden:bool, parametersText: "infoText" ,model:{data do folrmulářů} ,parameters: {model s daty do ukladacího formu}}
                }, 200);
                return deferred.promise();
            };

            filterStorageService.prototype.saveFilter = function (obj) {

                var filter = obj.filter;
                console.log("Ukládaný filter: ", obj);
                filter.description = filter.poznamka + ", " + (filter.aktivita ? "Aktivní" : "Neaktivní")
                //filters = jQuery.grep(filters, function (value) {
                //    return value.name != filter.name;
                //});
                filters.push(filter);

                var deferred = $.Deferred();    // promise s timrem pro ükazku
                window.setTimeout(function () {
                    deferred.resolve(filter, filters); //filter, filters    // Vresolvu je nutné vrátit kompletně upravený object s pojmenovaným  filtrem
                }, 200);
                deferred.promise().loadAll = true;
                return deferred.promise();

            };
            filterStorageService.prototype.removeFilter = function (obj) {

                var filter = obj.filter;
                console.log("Mazaný filter: ", obj);

                filters = jQuery.grep(filters, function (value) {
                    return value.name !== filter.name;
                });

                var deferred = $.Deferred();    // promise s timrem pro ukazky
                window.setTimeout(function () {
                    deferred.resolve(true);     // vracím true false zda byl odstraněn
                }, 200);
                return deferred.promise();
            };


            //============================================
            // vytvoreni filtru (gfilterpanel)
            //============================================
            var $filterForm = $("<div>").appendTo(this.element)
               .gfilterpanel({
                   forms: [FormHlavickaDkl, FormPolozkyDkl],                // pole formulářů, které budou použity pro podmínky
                   saveOptionsForm: formInSaveDialog,                       // Form v ukládacím dialogu
                   favorites:[], //["ac_ag", "ac", "ixp"],                       // defaultní oblíbené
                   filterStorageService: new filterStorageService(),        // service pro ukládání filtru, zde pro vývoj použita jednoduchá simulace .. později bude stačit tutu option vymazat či změnit a mělo by vše fungivat bez dálších změn
                   textItemTemplate: function (row) {                       // templete pro vygenerování komentáře u filtru
                       return row.poznamka + ", " + (row.aktivita ? "Aktivní" : "Neaktivní");
                   },
               })
                   .on("gfilterpanelapply", function (event, obj) {         // eventa která je vyvolána při vyhledávání. obj.filter -> hledaný seznam podmínek
                       console.log("Aplikuji filtr: ", obj);
                       that.loadData($grid, obj.filter);
                   });
            
            
            //==========================================================
            // DATAGRID
            //==========================================================

            var colWidthPid = 125; // 115 je málo
            var colWidthAc = 85;
            var colWidthMoney = 110;
            var colWidthDate = 90;
            var colWidthDateTime = 140;
            var colWidthSmall = 40;
            var colWidthStatus = 40;
            var colWidthIcon = 25;

            var $grid = $("<div class='js-mujGrid'>")
                .css("height", "calc(100% - " + $filterForm.height() + "px)")
                .appendTo(this.element)
                .ggrid({
                    columnMode: "full",     // fit (defaultne by melo byt toto), full

                    defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                        name: "gridRowSelectedAct",
                        run: function (ev, ctx) {
                            //data, ze kterych byl vytvoren radek
                            var row = ctx.cellInfo.data;
                            // volání detailu - frmMUDDen.openDoklad( ng_modeporShow = 0 )
                            that.openDoklad(row.ixp, 0);
                        }
                    }),

                    
                    columns: new Gordic.Data.GridFormat()   // { ctbl_MajPid: tbl_Mud }

                        // OPTIM: mp_stav_txt, typ_dok_txt, dev_txt - nemusím asi tahat joinem na serveru

                        // tyto 2 sloupce jsou v případě použití na 1. a 2. pozici - použijí se při volání seznamu PID fulltextem
                        .addTextColumn({
                            name: "typ_elp_txt",
                            caption: "Typ el. dok.",
                            description: "Typ elektronického dokumentu",
                            width: 80,
                            hidden: that.cvColEleHidden
                        })
                        .addTextColumn({
                            name: "popis_ixb",
                            caption: "Popis el. dok.",
                            description: "Popis elektronického dokumentu",
                            width: 110,
                            hidden: that.cvColEleHidden
                        })      
                        
                        .addIconColumn({  // vlastnictví agendy -  ctbl_MajPid._showPicDocFyzAgd
                            name: "pic_fyzagd",
                            caption: ".",
                            description: "Dokument fyzický / elektronický",
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
                            description: "El. podpisy",
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
                            description: "jres:24534373", //RC 24534373 : Vlastnictví a redistribuce
                            width: colWidthIcon,
                            customClass: "center",
                            fixedWidth: true,
                            iconTemplate: function (row) {
                                switch (row.stav_dist) {
                                    case 0: return { icon: "gi-nic" };   
                                    case -1: return { icon: "fa-user-secret" };   // cizí dokument, jiný vlastník
                                    default: return { icon: "gi-redistribuce" };
                                }
                            }
                        })
                        .addNumberColumn({
                            name: "poc_epri",
                            caption: "# e",
                            width: 35,
                            description: "jres:24534019", //RC 24534019 : Počet elektronických příloh
                            // fixedWidth: true,
                            // customClass: "ui-disabled"
                            hidden: that.cvColPocElPriHidden
                        })

                        // TODO: number_row, pořadí 

                        .addTextColumn({
                            name: "ac",
                            caption: "jres:24534396",  //RC 24534396 : Ev. č.
                            description: "jres:24534017",  //RC 24534017 : Evidenční číslo
                            width: colWidthAc
                        })
                        .addTextColumn({
                            name: "ac_ag",
                            caption: "jres:24534395", //RC 24534395 : Ag. č.
                            description: "jres:24534018",  //RC 24534018 : Agendové číslo
                            width: colWidthAc
                        })
                        .addIconColumn({
                            name: "pic_prizview",
                            field: "color_pview",
                            caption: ".",
                            description: "Nepřečteno / neshlédnuto",
                            width: colWidthIcon,
                            iconTemplate: function (data) {
                                switch (data.color_pview) {
                                    case 10: return { // // ctbl_MajPid._setRowColor( )
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
                            description: "jres:24534020",  //RC 24534020 : Identifikátor
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
                        .addTextColumn({
                            name: "zkr_stav",
                            //caption: "jres:24534325", //RC 24534325 : Stav
                            caption: "jres:24534630", //RC 24534630 : S
                            description: "jres:24534021", //RC 24534021 : Stav dokladu
                            width: 30,
                            cellTemplate: function (data, metarow, info) {
                                var text = "";
                                var tooltip = "";
                                var customClass = ""; // customClass = "g-state-error g-state-text";
                                var font = "";
                                switch (data.mp_stav) {  // vas.majccsv 
                                    case 0: {                                        
                                        text = "";
                                        tooltip = "Neurčeno";
                                        break;
                                    };
                                    case 10: {                                        
                                        text = "N";
                                        tooltip = "jres:24534368"; //RC 24534368 : Návrh
                                        break;
                                    };
                                    case 20: {                                        
                                        text = "E";                                        
                                        tooltip = "jres:24534369"; //RC 24534369 : Evidence                                        
                                        break;
                                    };
                                    case 30: {                                        
                                        text = "KU";
                                        tooltip = "jres:24534370"; //RC 24534370 : K proúčtování
                                        break;
                                    };
                                    case 35: {                                        
                                        text = "CU";
                                        tooltip = "jres:24534371"; //RC 24534371 : Částečně proúčtováno
                                        break;
                                    };
                                    case 40: {                                        
                                        text = "U";
                                        tooltip = "jres:24534034"; //RC 24534034 : Proúčtováno
                                        break;
                                    };
                                    case 50: {                                        
                                        text = "Z";
                                        tooltip = "jres:24534372"; //RC 24534372 : Uzavřeno
                                        break;
                                    };
                                    case 90: {                                        
                                        text = "S";                                        
                                        tooltip = "jres:24534632"; //RC 24534632 : Stornováno
                                        customClass = "g-state-important g-state-text"; // ctbl_MajPid._setRowColor( )
                                        break;
                                    };
                                    default: {                                        
                                        text = "!";
                                        tooltip = "Neznámý stav";
                                    };
                                } // end switch
                                return $("<span>", { text: text, title: tooltip, "class": customClass, "style": font });
                            }
                        })   
                        //.addIconColumn({
                        //    name: "pic_stav", 
                        //    //field: "mp_stav",
                        //    caption: "jres:24534325", //RC 24534325 : Stav
                        //    description: "jres:24534021", //RC 24534021 : Stav dokladu
                        //    width: colWidthStatus + 5,
                        //    iconTemplate: function (data) {
                        //        switch (data.mp_stav) {  // vas.majccsv 
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
                            caption: "jres:24534631", //  //RC 24534631 : P
                            description: "jres:24534022", //RC 24534022 : Stav přeevidence dokladu
                            width: colWidthIcon
                        })
                        .addDateColumn({
                            name: "dat_prij_pod",
                            caption: "jres:24534023", //RC 24534023 : Evidováno
                            description: "jres:24534385", //RC 24534385 : Datum evidence
                            width: colWidthDate
                        })
                        .addDateColumn({
                            name: "dat_uup",
                            caption: "jres:24534024", //RC 24534024 : Datum UUP
                            description: "jres:24534386", //RC 24534386 : Datum uskutečnění účet. pohybu
                            width: colWidthDate
                        })

                        // TODO: proč není vidět v MAJ32 dat_zdan ?
                        .addDateColumn({
                            name: "dat_zdan",
                            caption: "jres:24534383", //RC 24534383 : Datum ZP
                            description: "jres:24534384", //RC 24534384 : Datum zdanitelného plnění
                            width: colWidthDate,
                            hidden: true
                        })

                        .addTextColumn({
                            name: "typ_dok_zkr",
                            caption: "jres:24534025", //  //RC 24534025 : Typ   
                            description: "jres:24534043", //RC 24534043 : Typ dokladu
                            width: 50
                        })
                        .addNumberColumn({
                            name: "kod_poh",
                            caption: "jres:24534026", //  //RC 24534026 : Kód
                            description: "jres:24534044", //RC 24534044 : Kód pohybu
                            width: 50
                        })
                        .addTextColumn({
                            name: "dev_zkr",
                            caption: "jres:24534027", //  //RC 24534027 : DEV
                            description: "jres:24534045", //RC 24534045 : Druh evidence
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
                            description: "jres:24534351", //RC 24534351 : EVS vlastní
                            width: colWidthPid - 20,
                            hidden: this.cvColEvsHidden
                        })
                        .addTextColumn({
                            name: "nks_ext",
                            caption: that.cvColNksExtTitle,
                            description: that.cvColNksExtDesc,
                            width: colWidthPid - 20
                        })

                        // TODO: BOOKMARK: logování GDPR - s tím asi souvisí i výběr typ_esu na serveru - viz. _fetchRowDone()

                        .addTextColumn({
                            name: "esu_txt",
                            caption: "jres:24534029", //  //RC 24534029 : Dodavatel, odběratel    
                            description: "jres:24534029", //RC 24534029 : Dodavatel, odběratel    
                            width: 200
                        })
                        .addTextColumn({
                            name: "ico_esu",
                            caption: "jres:24534030", //  //RC 24534030 : IČO D/O
                            description: "jres:24534048", //RC 24534048 : IČ dodavatele, odběratele
                            width: 85
                        })
                        .addTextColumn({
                            name: "rc_esu",
                            caption: "jres:24534375", //  //RC 24534375 : RČ D/O
                            description: "jres:24534376", //RC 24534376 : Rodné č. dodavatele, odběratele
                            width: 85,
                            hidden: that.cvColRcEsuHidden
                        })
                        .addTextColumn({
                            name: "ac_ext",
                            caption: "jres:24534031",  //RC 24534031 : Doklad cizí
                            description: "jres:24534031", //RC 24534031 : Doklad cizí
                            width: colWidthAc
                        })
                        .addDateColumn({
                            name: "dat_ext",
                            caption: "jres:24534032", //RC 24534032 : Dat. cizí
                            description: "jres:24534032", //RC 24534032 : Dat. cizí
                            width: colWidthDate
                        })
                        .addNumberColumn({
                            name: "pocet_pol",
                            caption: "# pol",
                            description: "jres:24534377", //RC 24534377 : Počet položek
                            width: colWidthSmall + 5
                        })
                        // 380.10 14.03.18 měna a další sloupce související s měnou
                        .addTextColumn({
                            name: "mena_zkr",
                            caption: "jres:24534342", //RC 24534342 : Měna
                            description: "jres:24534342", //RC 24534342 : Měna
                            width: colWidthSmall,
                            hidden: that.cvColCizMenaHidden    // GM_SetVisible
                        })
                        .addNumberColumn({
                            name: "kurz",
                            caption: "jres:24534343", //RC 24534343 : Kurz
                            description: "jres:24534343", //RC 24534343 : Kurz
                            width: colWidthMoney,
                            hidden: that.cvColCizMenaHidden   // GM_SetVisible
                        })
                        .addCurrencyColumn({
                            name: "c_c_mena",
                            caption: "jres:24534378", //RC 24534378 : Cena za doklad v měně
                            description: "jres:24534378", //RC 24534378 : Cena za doklad v měně
                            width: colWidthMoney,
                            hidden: that.cvColCizMenaHidden
                        })                            
                        .addCurrencyColumn({ // TODO: v novějším kódu se asi bude měnit na "Cena za doklad v CZK"
                             name: "c_c",
                             caption: "jres:24534033", //RC 24534033 : Cena za doklad
                             description: "jres:24534387", //RC 24534387 : Cena za doklad v CZK
                             width: colWidthMoney
                        })                        
                        // frmMUDDen.tbl_Mud - na tomto formuláři je skryto
                        //.addCurrencyColumn({
                        //    name: "c_1",
                        //    caption: "jres:24534379", //RC 24534379 : Cena za příjem
                        //    description: "jres:24534379", //RC 24534379 : Cena za příjem
                        //    width: colWidthMoney,                        
                        //})
                        .addTextColumn({
                            name: "dat_uct",
                            caption: "jres:24534034", //RC 24534034 : Proúčtováno
                            description: "jres:24534388", //RC 24534388 : Datum proúčtování
                            width: colWidthDate
                        })
                        .addTextColumn({
                            name: "ps_fak",
                            caption: "jres:24534035", //  //RC 24534035 : Párovací symbol
                            description: "jres:24534035", //RC 24534035 : Párovací symbol
                            width: 90
                        })
                        .addDateTimeColumn({
                            name: "dat_zmena",
                            caption: "jres:24534036", //RC 24534036 : Datum změny
                            description: "jres:24534036",
                            width: colWidthDateTime
                        })                                               
                        .addTextColumn({
                            name: "nks",
                            caption: "jres:24534037", //  //RC 24534037 : NS
                            description: "jres:24534049", //RC 24534049 : Nákladové středisko
                            width: colWidthPid - 20
                        })                       
                        .addCurrencyColumn({
                            name: "c_dph_s",
                            caption: "jres:24534038", //RC 24534038 : DPH snížená
                            description: "jres:24534380", //RC 24534380 : DPH snížená sazba
                            width: colWidthMoney
                        })
                        .addCurrencyColumn({
                            name: "c_dph_n",
                            caption: "jres:24534039", //RC 24534039 : DPH normální
                            description: "jres:24534381", //RC 24534381 : DPH normální sazba
                            width: colWidthMoney
                        })
                        .addCurrencyColumn({
                            name: "c_dph_3",
                            caption: "DPH 2. snížená",
                            description: "DPH 2. snížená sazba",
                            width: colWidthMoney,
                            hidden: true
                        })
                        .addCurrencyColumn({
                            name: "c_dph_4",
                            caption: "DPH 3. snížená",
                            description: "DPH 3. snížená sazba",
                            width: colWidthMoney,
                            hidden: true
                        })
                        .addCurrencyColumn({
                            name: "c_c_dph",
                            caption: "jres:24534040", //RC 24534040 : Celkem za doklad s DPH
                            description: "jres:24534040", 
                            width: colWidthMoney
                        })                       
                        .addTextColumn({
                            name: "ucs",
                            caption: "jres:24534041", //  //RC 24534041 : UCS
                            description: "jres:24534382", //RC 24534382 : Účetní středisko
                            width: 50
                        })
                        .addNumberColumn({
                            name: "rok_obd",
                            caption: "jres:24534042", //  //RC 24534042 : Rok
                            description: "jres:24534042",
                            width: colWidthSmall
                        })

                });
            

        }, // end onContentReady


        /// <summary>Nacteni dat do gridu</summary>
        /// <param name='$grid' type='jQuery'>Reference na ggrid</param>
        /// <param name='filterModel' type='Object'>Model (DTO) s filtrem</param>
        loadData: function ($grid, filterModel) {
            filterModel = filterModel || {};            
            var that = this;
            this.beginOperation("Nacitam data");
            this.srv.call("KoukniDoKnihy", { filter: filterModel })
                .done(function (data) {
                    var view = new Gordic.Data.View(data, { key: "ixp" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                    $grid.ggrid("setData", view);
                    that.setWndTitle(); // nastavení titulku okna s vyhledanými záznamy
                })
                .always(function () { that.endOperation(); });            
        }, // end loadData()
       

        // Naplnění titulku okna
        setWndTitle: function () {            
            var that = this;
            // nastavení titulku okna a breadcrumbs
            this.call("NazevDoNavigace")
            .done(function (title) {
                that.newOps({ title: title});
                that.breadcrumbs[1].caption = title;
                that.setBreadcrumbs();
            });

        },

        // frmMUDDen.openDoklad( )
        openDoklad: function (ixp, mode_por) {
            console.log("Gordic.Maj.WebClient.GKnihaDokladu.js.openDoklad() - Otevírám doklad ", ixp);

            this.navigate('Gordic.Maj.WebClient.GMajDokladDetail', { // SalCreateWindow( frmMUDPor,hWndMDI, mode_por_p,0,0 )
                id: "frmMUDPor",
                argIxp: ixp
                //argMode: mode_por                                                         
            });

        },

    }, { extendIntellisense: GContent });
})(jQuery);
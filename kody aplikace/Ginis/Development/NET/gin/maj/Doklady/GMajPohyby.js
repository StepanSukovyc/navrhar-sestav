(function ($) {
    //==================================
    // { frm_MajPep } 
    //==================================
    "use strict";
    namespace("Gordic.Maj.WebClient.GMajPohyby", {
        taskId: "actDklPep", 

        onContentReady: function () {

            console.log("Gordic.Maj.WebClient.GMajPohyby.onContentReady", this);
            var that = this;

            //===============================================
            // AKCE
            //===============================================
                       
            
                      

            //===============================================
            // MENU
            //===============================================


            this.menuBar([]);
          

            // nastaveni dynamicky vytvorenych breadcrumbs; vice breadcrumbs na content
            this.setBreadcrumbs([
                { caption: "jres:24534361" }, //RC 24534361 : Přehled pohybů maj. dokladů aktuální knihy
                {
                    caption: "jres:24534355",   //RC 24534355 : Výběrový filtr   
                    action: new GAction({ name: "actBack", run: function () { that.tryCloseAllChildContents(); } })                 
                } // pokus o uzavreni vsech podrizenych oken 
            ]);

            //sluzba pro pristup k datum ze serveru //{className:"", params: {}}
            this.srv = new GContent({ className: "Gordic.Maj.WebClient.GMajPohyby", params: { } });  //sluzba pro pristup k datum na serveru + predani parametru

            

            //==============================================================================================
            //   HLAVIČKA    
            //==============================================================================================

            var FormHlavicka = new Gordic.Forms.Form({
                tabLabel: "Hlavička",
                name: "formHLA",
                layoutDescriptor: "L2M2S1, L-4-8-0, M-4-8-0, S-12-12-0, breaks-900"
            })
               .addSection("1)")               

                    .addRow("Identifikátor").addField("gstringbox", Gordic.Prefabs.String.ixs(), {
                        name: "ixp",
                        model: "Identifikator",
                    })

                    .addRow("Agendové číslo").addField("gstringbox", {
                        name: "ac_ag",
                        model: "AgendoveCislo",
                        allowedChars: "0123456789",                        
                    })

                    .addRow("Evidenční číslo").addField("gstringbox", {
                        name: "ac",
                        model: "EvidenciCislo",
                        allowedChars: "0123456789",
                    })                    
                                  
                    //.addRow("Celková cena od-do")
                    //           .addField("gnumberbox", "w-5", { //, Gordic.Prefabs.Number.currency()
                    //               name: "nbCCena0",
                    //               model: "CelkovaCenaOd",
                    //               decimals: 2,
                    //               fixed: true,
                    //               thousandsSeparator: " ",
                    //               emptyValue: null,
                    //           })
                    //           .addField("gnumberbox", "w-5", { //, Gordic.Prefabs.Number.currency()
                    //               name: "nbCCena1",
                    //               model: "CelkovaCenaDo",
                    //               decimals: 2,
                    //               fixed: true,
                    //               thousandsSeparator: " ",
                    //               emptyValue: null,
                    //           })
                    //            .addField("gcheck", "w-2", {
                    //                name: "chbCCenaNon",
                    //                model: "CelkovaCenaNegace",
                    //                label: "Non"
                    //            })

                .addRow("Typ dokladu").addField("gselectbox", {
                    name: "typ_dok",
                    model: "Typ = typ_dok",
                    dropdown: true,
                    itemTemplate: "{typ_dok_txt}",
                    helperColumns: ["typ_dok_txt"],
                    data: new Gordic.Data.View(this.majcstp, { key: "typ_dok" }),
                })      

                //  NS vlastní
                .addRow("NS Vlastní").addField("gselectbox", Gordic.Prefabs.Select.ekosnks(), {
                    name: "sbNsVlastni",
                    model: "NksVlastni= nks",
                    serverFilters: {
                        ico: this.cvEkoIco,
                        //rok_od: "<=2014", // + this.cvEkoRok,
                        //rok_do: ">=2014", // + this.cvEkoRok,
                    },
                    dropdown: false,
                })

                // ES vlastní
                .addRow("ES Vlastní").addField("gselectbox", Gordic.Prefabs.Select.ekosstr(), {
                    name: "sbEsVlastni",
                    model: "NksVlastni = stredisko",
                    helperItemTemplate: "<b>{stredisko}</b> - {nazev} | Vzd.přístup: {priz_isl_txt} | [<i>{aktivita_txt}</i>]",
                    serverFilters: {                        
                        aktivita: 100
                    },
                    dropdown: false,
                })

                .addRow("NS Příjemce / Výdejce").addField("gselectbox", Gordic.Prefabs.Select.ekosnks(), {
                    name: "sbNksPrijemVydej",
                    model: "NksPrijemVydej = nks",
                    serverFilters: {
                        ico: this.cvEkoIco,
                        //  rok_od: 2016,
                    },
                    dropdown: false,
                })

                .addRow("ES Příjemce / Výdejce").addField("gselectbox", Gordic.Prefabs.Select.ekosstr(), {
                    name: "sbEvsPrijemVydej",
                    model: "NksPrijemVydej = stredisko",
                    helperItemTemplate: "<b>{stredisko}</b> - {nazev} | Vzd.přístup: {priz_isl_txt} | [<i>{aktivita_txt}</i>]",
                    serverFilters: {                        
                        aktivita: 100
                    },
                    dropdown: false,
                })

                .addRow("Dodavatel / Odběratel").addField("gselectbox", Gordic.Prefabs.Select.ginsesu(), {
                    name: "ixs_esu",
                    model: "DodavatelIxsEko = ixs_eko; DodavatelIxsEsu = ixs_esu",
                    dropdown: false,
                })
                     

                //==============================================================================================
               // .addSection("Údaje pohybu")

                    .addRow("Kód od-do")
                        .addField("gselectbox", "w-6", {
                            name: "sbKodPohOd",
                            model: "KodPohybuOd",
                            dropdown: false,
                            itemTemplate: "{kod_poh}",
                            helperItemTemplate: "<b>{kod_poh}</b> | Typ: <b>{typ_dok_zkr}</b> | DEV: <b>{dev_zkr}</b> | <b>{nazev}</b>",
                            helperColumns: ["kod_poh", "nazev"],
                            data: new Gordic.Data.View(this.majspoh, { key: "kod_poh" }),
                        })
                        .addField("gselectbox", "w-6", {
                            name: "sbKodPohDo",
                            model: "KodPohybuDo",
                            serverFilters: {
                                ico: this.cvEkoIco,
                            },
                            dropdown: false,
                            itemTemplate: "{kod_poh}",
                            helperItemTemplate: "<b>{kod_poh}</b> | Typ: <b>{typ_dok_zkr}</b> | DEV: <b>{dev_zkr}</b> | <b>{nazev}</b>",
                            helperColumns: ["kod_poh", "nazev"],
                            data: new Gordic.Data.View(this.majspoh, { key: "kod_poh" }),
                        })

                                 

                    .addRow("Datum UÚP od-do").addField("gdatebox", "w-6", {
                        name: "dat_uup_od",
                        model: "DatumUupOd",
                    }).addField("gdatebox", "w-6", {
                        name: "dat_uup_do",
                        model: "DatumUupDo",
                    })

                // TODO: Na přehledu je "Datum evidence", na filtru "Datum podání" (?)
                    .addRow("Datum podání od-do").addField("gdatebox", "w-6", {
                        name: "dat_pod_od",
                        model: "DatumPodaniOd",
                    }).addField("gdatebox", "w-6", {
                        name: "dat_pod_do",
                        model: "DatumPodaniDo",
                    })

                    .addRow("Datum zaúčtování od-do").addField("gdatebox", "w-6", {
                        name: "dat_uct_od",
                        model: "DatumZauctovaniOd",
                    }).addField("gdatebox", "w-6", {
                        name: "dat_uct_do",
                        model: "DatumZauctovaniDo",
                    })
                              
                
                                
                //==============================================================================================
                //.addSection("Externí vazby")

                              

                   

                    //.addRow("Osoba").addField("gselectbox", Gordic.Prefabs.Select.ginsref(), "w-10", {
                    //    name: "sbGinsrefOsb",
                    //    model: "ZodpovednyRef = ixs_ref",
                    //    dropdown: false,
                    //})
                    //    .addField("gcheck", "w-2", {
                    //        name: "ixs_ref_non",
                    //        model: "ZodpovednyRefNegace",
                    //        label: "Non"
                    //    })

                    
                //==============================================================================================                

                //.addSection("Spotřeba")
                    
                    //.addRow("Posledních").addField("gnumberbox", "w-4", {
                    //    name: "nbLastN",                        
                    //    model: "PoslednichN",
                    //    allowedChars: "0123456789",
                    //    emptyValue: null,
                    //})                          

                    

                    .addRow("Referát").addField("gselectbox", Gordic.Prefabs.Select.ginsorj(), "w-10", {
                        name: "sbGinsorj",
                        model: "ReferatOrj = ixs_orj",
                        serverFilters: { aktivita: [100, 300, 500, 600] },
                        tooltip: "Referát / Organizační jednotka",
                        dropdown: false,
                    })
                        .addField("gcheck", "w-2", {
                            name: "chbReferatNon",
                            model: "ReferatOrjNegace",
                            label: "Non"
                        })

                    //.addRow("Zodpovídá").addField("gselectbox", Gordic.Prefabs.Select.ginsref(), "w-10", {
                    //    name: "sbGinsref",
                    //    model: "ZodpovednyRef = ixs_ref",
                    //    dropdown: false,
                    //})
                    //    .addField("gcheck", "w-2", {
                    //        name: "ixs_ref_non",
                    //        model: "ZodpovednyRefNegace",
                    //        label: "Non"
                    //    })

                    // Evidenční středisko OD-DO
                    .addRow("Evidenční středisko")
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
                        //        aktivita: null
                        //    },
                        //    dropdown: false,
                        //})
                        .addField("gcheck", "w-2", {
                            name: "chbEvsNon",
                            model: "EvStrediskoNegace",
                            label: "Non"
                        })
                    
                    // Objekt OD-DO
                    .addRow("Objekt od-do")
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.ekosobj(), {
                            name: "sbObjekt1",
                            model: "ObjektOd = objekt",
                            helperItemTemplate: "<b>{objekt}</b> - {nazev}  (<i>{aktivita_txt}</i>)",
                            serverFilters: {                                
                                aktivita: [100, 500]
                            },
                            dropdown: false
                        })
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.ekosobj(), {
                            name: "sbObjekt2",
                            model: "ObjektDo = objekt",
                            helperItemTemplate: "<b>{objekt}</b> - {nazev} (<i>{aktivita_txt}</i>)",
                            serverFilters: {                               
                                aktivita: [100, 500]
                            },
                            dropdown: false
                        })
                        .addField("gcheck", "w-2", {
                            name: "chbObjektNon",
                            model: "ObjektNegace",
                            label: "Non"
                        })

                    .addRow("Třída od-do")
                        .addField("gselectbox", "w-5", {
                            name: "sbMajstri0",
                            model: "TridaOd = trida",
                            dropdown: false,
                            itemTemplate: "{trida}",
                            helperItemTemplate: "<b>{trida}</b> - {nazev}",
                            helperColumns: ["trida", "nazev"],                            
                            data: new Gordic.Data.View(this.majstri, { key: "trida" }),
                        })
                        .addField("gselectbox", "w-5", {
                            name: "sbMajstri1",
                            model: "TridaDo = trida",
                            dropdown: false,
                            itemTemplate: "{trida}",
                            helperItemTemplate: "<b>{trida}</b> - {nazev}",
                            helperColumns: ["trida", "nazev"],                            
                            data: new Gordic.Data.View(this.majstri, { key: "trida" }),
                        })
                        .addField("gcheck", "w-2", {
                            name: "chbTridaNon",
                            model: "TridaNegace",
                            label: "Non"
                        })                                                        

                    .addRow("Externí lokace 1 od-do")
                        .addField("gselectbox", "w-5", {
                            name: "sbMajsel1_0",
                            model: "ExterniLokace1Od = ext_1",
                            dropdown: false,
                            itemTemplate: "{ext_1_txt}",
                            helperItemTemplate: "<b>{ext_1}</b> - {ext_1_txt}",
                            helperColumns: ["ext_1", "ext_1_txt"],                            
                            data: new Gordic.Data.View(this.majsel1, { key: "ext_1" }),
                        })
                        .addField("gselectbox", "w-5", {
                            name: "sbMajsel1_1",
                            model: "ExterniLokace1Do = ext_1",
                            dropdown: false,
                            itemTemplate: "{ext_1_txt}",
                            helperItemTemplate: "<b>{ext_1}</b> - {ext_1_txt}",
                            helperColumns: ["ext_1", "ext_1_txt"],                            
                            data: new Gordic.Data.View(this.majsel1, { key: "ext_1" }),
                        })
                        .addField("gcheck", "w-2", {
                            name: "chbExt1Non",
                            model: "ExterniLokace1Negace",
                            label: "Non"
                        })

                    .addRow("Externí lokace 2 od-do")
                        .addField("gselectbox", "w-5", {
                            name: "sbMajsel2_0",
                            model: "ExterniLokace2Od = ext_2",
                            dropdown: false,
                            itemTemplate: "{ext_2_txt}",
                            helperItemTemplate: "<b>{ext_2}</b> - {ext_2_txt}",
                            helperColumns: ["ext_2", "ext_2_txt"],                            
                            data: new Gordic.Data.View(this.majsel2, { key: "ext_2" }),
                        })
                        .addField("gselectbox", "w-5", {
                            name: "sbMajsel2_1",
                            model: "ExterniLokace2Do = ext_2",
                            dropdown: false,
                            itemTemplate: "{ext_2_txt}",
                            helperItemTemplate: "<b>{ext_2}</b> - {ext_2_txt}",
                            helperColumns: ["ext_2", "ext_2_txt"],                           
                            data: new Gordic.Data.View(this.majsel2, { key: "ext_2" }),
                        })
                        .addField("gcheck", "w-2", {
                            name: "chbExt2Non",
                            model: "ExterniLokace2Negace",
                            label: "Non"
                        })

                        .addRow("Externí lokace 3 od-do")
                        .addField("gselectbox", "w-5", {
                            name: "sbMajsel3_0",
                            model: "ExterniLokace3Od = ext_3",
                            dropdown: false,
                            itemTemplate: "{ext_3_txt}",
                            helperItemTemplate: "<b>{ext_3}</b> - {ext_3_txt}",
                            helperColumns: ["ext_3", "ext_3_txt"],                            
                            data: new Gordic.Data.View(this.majsel3, { key: "ext_3" }),
                        })
                        .addField("gselectbox", "w-5", {
                            name: "sbMajsel3_1",
                            model: "ExterniLokace3Do = ext_3",
                            dropdown: false,
                            itemTemplate: "{ext_3_txt}",
                            helperItemTemplate: "<b>{ext_3}</b> - {ext_3_txt}",
                            helperColumns: ["ext_3", "ext_3_txt"],                            
                            data: new Gordic.Data.View(this.majsel3, { key: "ext_3" }),
                        })
                        .addField("gcheck", "w-2", {
                            name: "chbExt3Non",
                            model: "ExterniLokace3Negace",
                            label: "Non"
                        })
           
            ; // end form                       
           

            //==============================================================================================
            //   ÚDAJE MAJETKU 
            //==============================================================================================

            var FormUdajeMaj = new Gordic.Forms
            .Form({ tabLabel: "Údaje majetku", name: "formPOL", layoutDescriptor: "L2M2S1, L-4-8-0, M-4-8-0, S-12-12-0, breaks-900" })
               .addSection()

                    .addRow("Skupina majetku od-do")
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
                            label: "Non"
                        })

                    .addRow("Druh majetku od-do")
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
                            label: "Non",
                        })

                    .addRow("Inventární číslo")
                        .addField("gstringbox", "w-10", {
                            name: "tbInvCis",
                            model: "InventarniCislo",
                        })
                       .addField("gcheck", "w-2", {
                           name: "chbInvCisNon",
                           model: "InventarniCisloNegace",
                           label: "Non"
                       })

                // TODO: Prefab MAJSCIM
                    .addRow("Materiálové číslo od-do")
                        .addField("gstringbox", "w-5", { placeholder:"prefab!" })
                        .addField("gstringbox", "w-5", { placeholder: "prefab!" })
                        .addField("gcheck", "w-2", { name: "mat_cis_non", label: "Non" })

                    .addRow("Výrobní číslo")
                        .addField("gstringbox", "w-10", {
                            name: "tbVyrCis",
                            model: "VyrobniCislo",
                        })
                       .addField("gcheck", "w-2", {
                           name: "chbVyrCisNon",
                           model: "VyrobniCisloNegace",
                           label: "Non"
                       })

                    .addRow("Klasifikace od-do")
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.ekoskla(), {
                            name: "sbEkoskla0",
                            model: "KlasifikaceOd = skp",
                            tooltip: "Klasifikace produkce, služeb a stavebních děl",
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
                            label: "Non"
                        })

                // TODO: napojit vas.majsuea a vas.majsvue + jak na výběr varianty?
                     .addRow("SuAu Evidence od-do")
                        .addField("gselectbox", "w-5", {
                            placeholder: "prefab!"
                        })
                        .addField("gselectbox", "w-5", { placeholder: "prefab!" })
                        .addField("gcheck", "w-2", { name: "suauevi_non", label: "Non" })                                        

                    .addRow("Třída od-do")
                        .addField("gselectbox", "w-5", {
                            name: "pol_trida",
                            dropdown: false,
                            itemTemplate: "{trida}",
                            helperItemTemplate: "<b>{trida}</b> - {nazev} | &nbsp;{aktivita_txt}",
                            helperColumns: ["trida", "nazev"],
                            //helperCustomizer:  ,
                            data: new Gordic.Data.View(this.majstriPol, { key: "trida" }),
                        })
                        .addField("gselectbox", "w-5", {
                            name: "pol_trida2",
                            dropdown: false,
                            itemTemplate: "{trida}",
                            helperItemTemplate: "<b>{trida}</b> - {nazev} | &nbsp;{aktivita_txt}",
                            helperColumns: ["trida", "nazev"],
                            //helperCustomizer:  ,
                            data: new Gordic.Data.View(this.majstriPol, { key: "trida" }),
                        })
                        .addField("gcheck", "w-2", { name: "pol_trida_non", label: "Non" })

                //==============================================================================================

                //.addSection()

                    //.addRow("Cena položky od-do")
                    //       .addField("gnumberbox", "w-5", {
                    //           name: "nbCenaPol0",
                    //           model: "CenaPolOd",
                    //           decimals: 2,
                    //           fixed: true,
                    //           thousandsSeparator: " ",
                    //           emptyValue: null,
                    //       })
                    //       .addField("gnumberbox", "w-5", {
                    //           name: "nbCenaPol0",
                    //           model: "CenaPolDo",
                    //           decimals: 2,
                    //           fixed: true,
                    //           thousandsSeparator: " ",
                    //           emptyValue: null,
                    //       })
                    //        .addField("gcheck", "w-2", {
                    //            name: "chbCenaPolNon",
                    //            model: "CenaPolNegace",
                    //            label: "Non"
                    //        })

                    //.addRow("Množství položky od-do")
                    //       .addField("gnumberbox", "w-5", {
                    //           model: "MnozstviPolOd",
                    //           emptyValue: null,
                    //       })
                    //       .addField("gnumberbox", "w-5", {
                    //           model: "MnozstviPolDo",
                    //           emptyValue: null,
                    //       })
                    //        .addField("gcheck", "w-2", {
                    //            model: "MnozstviPolNegace",
                    //            label: "Non"
                    //        })

                    // Evidenční středisko OD-DO
                    .addRow("Evidenční středisko od-do")
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
                            label: "Non"
                        })

                    // Objekt OD-DO
                    .addRow("Objekt od-do")
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
                            label: "Non"
                        })

                    .addRow("Referát")
                        .addField("gselectbox", Gordic.Prefabs.Select.ginsorj(), "w-10", {
                            name: "sbGinsorjPol",
                            model: "ReferatPol = ixs_orj",
                            serverFilters: { aktivita: [100, 300, 500, 600] },
                            tooltip: "Referát / Organizační jednotka",
                            dropdown: false,
                        })
                        .addField("gcheck", "w-2", {
                                name: "chbReferatNon",
                                model: "ReferatPolNegace",
                                label: "Non"
                        })

                    .addRow("Sklad / Budova od-do")
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
                            label: "Non"
                        })
            
                    .addRow("Regál / Segment od-do")
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
                            label: "Non"
                        })

                    .addRow("Police / Místnost od-do")
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
                            label: "Non"
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
                    return value.name != filter.name;
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
                   forms: [FormHlavicka, FormUdajeMaj],                // pole formulářů, které budou použity pro podmínky
                   saveOptionsForm: formInSaveDialog,                       // Form v ukládacím dialogu
                   favorites: [],                       // defaultní oblíbené
                   filterStorageService: new filterStorageService(),        // service pro ukládání filtru, zde pro vývoj použita jednoduchá simulace .. později bude stačit tutu option vymazat či změnit a mělo by vše fungivat bez dálších změn
                   textItemTemplate: function (row) {                       // templete pro vygenerování komentáře u filtru
                       return row.poznamka + ", " + (row.aktivita ? "Aktivní" : "Neaktivní");
                   },
                   autoLoadAfterCreatePanel: true,
               })
                   .on("gfilterpanelapply", function (event, obj) {         // eventa která je vyvolána při vyhledávání. obj.filter -> hledaný seznam podmínek
                       console.log("Aplikuji filtr: ", obj);
                       that.loadData($grid, obj.filter);
                   });
            
            
            //==========================================================
            // DATAGRID
            //==========================================================
            var that = this;

            var colWidthPid = 115;
            var colWidthAc = 85;
            var colWidthMoney = 110;
            var colWidthSuAu = 80;
            var colWidthDate = 90;
            var colWidthDateTime = 140;
            var colWidthSmall = 40;
            var colWidthIcon = 18;
            var colWidthChar3 = 33; // zkratky

            //  frm_MajPep.init( )
            that.tblMode = 4; // ng_modepepBook - pohyby knihy/NS
            that.tblTable = "majspep";  // Call frm_MajPep.tblPol._put( ng_modepepBook, 'majspep' )
           

            var $grid = $("<div class='js-mujGrid'>")
                .css("height", "calc(100% - " + $filterForm.height() + "px)")
                .appendTo(this.element)
                .ggrid({
                    columnMode: "full",

                    defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                        name: "gridRowSelectedAct",
                        run: function (ev, ctx) {
                            // nop
                        }
                    }),

                    //==========================================================
                    // SLOUPCE GRIDU { ctbl_MajPep },  stejn7 grid je v GMajDokladDetail a GPohybyJsGrid
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
            

        }, // end onContentReady


        /// <summary>Nacteni dat do gridu</summary>
        /// <param name='$grid' type='jQuery'>Reference na ggrid</param>
        /// <param name='filterModel' type='Object'>Model (DTO) s filtrem</param>
        loadData: function ($grid, filterModel) {
            filterModel = filterModel || {};            
            var that = this;
            this.beginOperation("Nacitam data");
            
            this.srv.call("GenerujPrehled", { filter: filterModel })
                .done(function (data) {
                    var view = new Gordic.Data.View(data, { key: "ixp" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                    $grid.ggrid("setData", view, true);                     //true = prekresleni gridu                    
                })
                .always(function () { that.endOperation(); });            
        }, // end loadData()
               

    }, { extendIntellisense: GContent });
})(jQuery);
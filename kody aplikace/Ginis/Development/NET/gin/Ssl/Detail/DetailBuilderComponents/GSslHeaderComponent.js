//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ssl.WebClient.gsslheadercomponent.js                 </Name>
//    <Description>                                                             </Description>
//    <Author>      Šebesta David                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2017                            </Copyright>
//    <Created>     2017-12-22                                                  </Created>
//  </FileHeader>

(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslHeader: {
            create: function (content, componentDto) {

                //#region dokument
                var vygenerujRadkyVHlavickuDokument = function () {
                    //var headerForm = Gordic.Wfl.DetailBuilderComponents.WflHeaderForm.create({
                    //    dataSectionsCount: 2,
                    //    IkonBarDto: componentDto.IkonBarDto,
                    //    pid: componentDto.ixp
                    //}).headerForm;

                    var rezimEditacepolicek = false;
                    if (content.EditMode === true || (content.RezimPodani != null && content.RezimPodani !== 0)) {
                        rezimEditacepolicek = true;
                    }


                    var headerFormNew = new Gordic.Forms.Form({
                        name: "formHeader",
                        layoutDescriptor: "L3M3S1, L-3-9-0, M-3-9-0, S-12-12-0"

                    });
                    var l_B = "w-12";
                    if (componentDto.CjExtVisible) {
                        l_B = "w-9";
                    }

                    headerFormNew.addSection()
                        .addRow(componentDto.ZnackaLabelText)
                        .addField("gstringbox", l_B, {
                            name: "Znacka",
                            customClass: "bold",
                            model: "model.AktZnacka=value",
                            disabled: true
                        });

                    if (componentDto.CjExtVisible) {
                        // ref T35482
                        headerFormNew.addField("gselectbox", "w-3", {
                            model: "model.CjExt=value.data",
                            disabled: true,
                            customClass: "bold"
                        }, Gordic.Gin.Prefabs.gmemorySelectbox({
                            userSettings: content.userSettings, // todo - predelat spolecne s dialogem na hromadnou zmenu na spolecny/globalni usersettings
                            name: "CjExt",
                            type: "string",
                            rememberLast: false,
                            countOfRemembered: 10
                        }));

                        //headerFormNew.addField("gstringbox", "w-3", {
                        //    name: "CjExt",
                        //    model: "model.CjExt=value",
                        //    customClass: "bold",
                        //    disabled: true
                        //});
                    }
                    if (componentDto.CjZnVisible) {
                        headerFormNew.addRow(componentDto.CjZnLabelText)
                            .addField("gstringbox", "w-9", {
                                name: "CjZn",
                                model: "model.CjZn=value",
                                disabled: true
                            })
                            .addField("gnumberbox", "w-3", {
                                name: "PorSpis",
                                model: "model.PorSpis=value",
                                customClass: componentDto.PorCisloSpisVisible ? "" : "autohide" ,
                                disabled: true
                            });
                    }

                    if (componentDto.ExtIdVisible) {
                        headerFormNew.addRow("jres:26256529") //RC 26256529 : Ext. Id
                            .addField("gstringbox", {
                                name: "ExtId",
                                model: "model.ExtId=value",
                                disabled: true

                            });
                    }

                    headerFormNew.addSection();

                    headerFormNew.addPrefab(Gordic.Wfl.Prefabs.GIdentifikatorDokumnetuSpisu(
                        {
                            fieldOpt: {
                                model: "model.pid=value",
                                disabled: true
                            }
                        }, {
                            label: "jres:26255423", //RC 26255423 : Identifikátor
                            hint:"jres:31937489" //RC 31937489 : Jednoznačná identifikace každé entity. Například dokument je při svém vzniku (podání) označen;PID, který je neměnný po celou dobu životního cyklu dokumentu.
                        }
                    ));

                    if (componentDto.AgendaVisible) {
                        headerFormNew.addRow("jres:31937115") //RC 31937115 : Agendové číslo/Agenda
                            .addField("gstringbox", "w-7", {
                                name: "AgendaCislo",
                                model: "model.AktZnacka=>value",
                                disabled: true
                            })

                            .addField("gselectbox", "w-5", Gordic.Prefabs.Select.ginctag(), {
                                name: "Agenda",
                                model: "model.TypAg=value.typ_ag", //Ginctag
                                disabled: true
                            }
                        );
                    }

                    // v ts lze pouzit Ginis.DbModel.GWflctysEnum
                    var isTypovaEntita = componentDto.TypSpis == 2 || componentDto.TypSpis == 3 || componentDto.TypSpis == 4 || componentDto.TypSpis == 5;
                    var typLabel = componentDto.gin_n23_vecsk == 0 ? "jres:31937199" : "jres:26257359"; //RC 31937199 : Typ RC 26257359 : Druh
                    var typTooltip = componentDto.gin_n23_vecsk == 0 ? "jres:26255426" : "jres:26257360"; //RC 26255426 : Typ dokumentu RC 26257360 : Druh dokumentu

                    if(!isTypovaEntita) {
                        headerFormNew
                            .addRow({
                                label: typLabel,
                                hint: "jres:31937490"//RC 31937490 : Číselník nesoucí uživatelské zatřídění entity včetně možnosti předdefinovat další metadata entity na základě vybraného typu. (přístup, věcnou skupinu,…)
                            })
                            .addField("gselectbox", Gordic.Prefabs.Select.sslstyp(),
                                {
                                    name: "IxsTyp",
                                    tooltip: typTooltip,
                                    model: "model.IxsTyp = value.ixs_typ",
                                    serverFilters: {
                                        aktivita_ssl: [100],
                                        ktg_typ: (componentDto.TypDokumentuFilterDto != null && componentDto.TypDokumentuFilterDto.ktg_typ != null) ? componentDto.TypDokumentuFilterDto.ktg_typ : undefined
                                    },
                                    disabled: true,
                                    modelOptions: {
                                        initialValues: true
                                    },
                                    change: function (ev, item) {
                                        var cnt = $.content(this);
                                        if (item && item.value && item.value.st_utaj_id !== null && item.value.st_utaj_id !== undefined) {
                                            if (cnt.RezimPodani != null && cnt.RezimPodani !== 0) {
                                                var mod = {
                                                    StUtajIdWfl: item.value.st_utaj_id
                                                };
                                                cnt.findFields("StUtajIdWfl").gfield("model", "apply", mod);
                                            }
                                        }
                                        if (item && item.value) {
                                            content.predplnSpisZnakDleTypu();
                                        }
                                    }
                                });
                    }
                    
                    headerFormNew.addSection();
                    headerFormNew
                        .addRow({
                            label: "jres:26255496",//RC 26255496 : Přístup
                            hint: "jres:31937116",//RC 31937116 : Definice práv  přístupu k entitám.
                        })
                        .addField("gselectbox", Gordic.Prefabs.Select.gincstu(),
                            {
                                name: "StUtajIdWfl",
                                model: "model.StUtajIdWfl=value.st_utaj_id",
                                serverFilters: {
                                    st_utaj_id_orig: componentDto.IRPUzivatelMaIRPNesmiPrepnoutNaRizenyPristup ? "!= 40" : undefined,
                                    gintreu: componentDto.PrizRezimUtaj ? true : undefined,
                                    st_utaj_id: componentDto.PrizRezimUtaj ? componentDto.FilterPristupProDrmsUtaj : undefined
                                },
                                disabled: true,
                                buttons: [{
                                    requireEdit: false,
                                    tooltip: "jres:31937084", //RC 31937084 : Otevře dialog řízení přístupu
                                    
                                    action: new GAction({
                                        caption: "jres:26255496", //RC 26255496 : Přístup
                                        name: "actPristupHlavicka",
                                        visible: componentDto.JeButtonUPRstupuViditelny,
                                        run: function (ev, obj) {
                                            content.actions.actPristup.run();
                                        }
                                    })
                                },
                                    {
                                        requireEdit: false,
                                        tooltip: componentDto.PrizZobZast == 1 
                                            ? "jres:31937498" //RC 31937498 : Zobrazitelnost zástupem je nastavena na hodnotu ANO
                                            : "jres:31937499", //RC 31937499 : Zobrazitelnost zástupem je nastavena na hodnotu NE

                                        action: new GAction({
                                            //caption: "", //RC 26255496 : Přístup
                                            name: "actPrizZobZast",
                                            customClass: componentDto.PrizZobZast == 1 ? "g-state-text " + Gordic.Global.Enums.ColorStateClass.info : "g-state-text " + Gordic.Global.Enums.ColorStateClass.important, 
                                            icon: "fa-users", 
                                            visible: componentDto.NastavitPriznakZobrazitelnostiVisible,
                                            run: function (ev, obj) {
                                                content.actions.actNastavitPriznakZobrazitelnostiZastupemIRP.run();
                                            }
                                        })
                                    }


                                ]
                            });
                    headerFormNew
                        .addRow({
                            label: "jres:26255398",
                            hint: "jres:31937491" //RC 31937491 : Vlastník entity
                        }) //RC 26255398 : Vlastník
                        .addField("gselectbox",
                            Gordic.Gin.Fields.ginsfunSSU(
                                {
                                    name: "IxsFunAkt",
                                    model: "model.IxsFunAkt = value.ixs_fun",
                                    disabled: true,
                                    serverFilters: {
                                        aktivita: [100],
                                        ixs_su: componentDto.IxsFunAktIxsSU
                                    }
                                }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO)
                        );

                    var vecLabel = "jres:26257346"; //RC 26257346 : Věc

                    switch(componentDto.TypSpis) {
                        case 2: { // TS
                            vecLabel = "jres:26257347"; //RC 26257347 : Název

                            break;
                        }
                        case 3: { // Součást koncová
                            vecLabel = "jres:26257348"; //RC 26257348 : Název - obsah

                            break;
                        }
                        case 5: { // Součást
                            vecLabel = "jres:26257348"; //RC 26257348 : Název - obsah

                            break;
                        }
                    }

                    // Deformovana Sekce
                    headerFormNew.addSection({ layoutDescriptor: "L-1-11-0, M-1-11-0, S-12-12-0", customClass: "w-L-12 w-M-12 w-S-12" }); //"w-L-8 w-M-6 w-S-12
                    //dsebesta 30.05.2019  předelano na GVec 
                    headerFormNew.addPrefab(Gordic.Wfl.Prefabs.GVec(
                        content.userSettings,
                        {
                            model: "model.Nazev=value.data",
                            disabled: true,
                            customClass: (rezimEditacepolicek ? "js-VlastaFocus " : "") + " bold",
                            change: function (ev, item) {
                                if (item && item.value && item.value.data) {
                                    content.sslHeaderSetniVecPodrobnePokudJePrazdna(item.value.data);
                                }
                            },
                            validators: [
                                {
                                    validate: function (value, source) {
                                        if (value && value.data && value.data.length > componentDto.Validators.Nazev[1].max) {
                                            return false;
                                        }
                                        return true;
                                    },
                                    getMessage: function (value) {
                                        return "jres:31937149"; //RC 31937149 : Zadaný text je příliš dlouhý.
                                    }
                                }
                            ],
                            tagByValue:
                                componentDto.Validators && componentDto.Validators.Nazev && componentDto.Validators.Nazev[1] && componentDto.Validators.Nazev[1].max
                                    ? Gordic.Prefabs.Field.charCounter(componentDto.Validators.Nazev[1].max).tagByValue
                                    : undefined
                            /*
                            tagByValue: function (x, y) { // Gordic.Prefabs.Field.charCounter(componentDto.VecPodrobneMaxLength)
                               
                                // {
                                //    text: string;
                                //    state?: GState;
                                //    customClass?: string;
                                //}
                                 
                                return {text: "david"};
                            },
                            */
                        },
                        {
                            label: vecLabel,
                            hint: "jres:31937492" //RC 31937492 : Zpravidla stručný, ale výstižný popis obsahu evidované entity, nesmí obsahovat osobní údaje.
                        }
                    ));
                    if (componentDto.UzivSlJVisible === true || componentDto.UzivSlKVisible === true) {
                        

                        if (componentDto.UzivSlJVisible === true) {
                            headerFormNew.addSection({ layoutDescriptor: "L-2-10-0, M-2-10-0, S-12-12-0", customClass: "w-L-6 w-M-6 w-S-12" }); 
                            headerFormNew
                                .addRow(componentDto.UzivSlJLabelText)
                                .addField("gstringbox", { name: "uzivSlJ", model: "model.UzivSl1=value", disabled: true });
                        }


                        if (componentDto.UzivSlKVisible === true) {
                            headerFormNew.addSection({ layoutDescriptor: "L-2-10-0, M-2-10-0, S-12-12-0", customClass: "w-L-6 w-M-6 w-S-12" }); 
                            headerFormNew
                                .addRow(componentDto.UzivSlKLabelText)
                                .addField("gstringbox", { name: "uzivSlK", model: "model.UzivSl2=value", disabled: true });

                        }
                        //doplnění prázdné sekce
                        if (componentDto.UzivSlJVisible !== componentDto.UzivSlKVisible) {
                            headerFormNew.addSection({ customClass: "w-L-6 w-M-6 w-S-12" }); 
                        }
                    }
                  
                    
                    //headerFormNew.addSection({ customClass: "w-L-4 w-M-4 w-S-12" });
                    //headerFormNew
                    //    .addRow("jres:26255398") //RC 26255398 : Vlastník
                    //    .addField("gselectbox",
                    //        Gordic.Gin.Fields.ginsfunSSU(
                    //            {
                    //                name: "IxsFunAkt",
                    //                model: "model.IxsFunAkt = value.ixs_fun",
                    //                disabled: true,
                    //                serverFilters: {
                    //                    aktivita: [100],
                    //                },
                    //            }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO)
                    //        );
                  


                   

                 

                    ////od radka
                    //headerForm.form.sections[1].rows = headerFormNew.form.sections[0].rows;

                    //// přesunuto na žádost michala 
                    //headerForm.form.sections[2].rows = headerFormNew.form.sections[1].rows;
                    return headerFormNew;
                };

                //#endregion
                //#region spis
                //SPIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                var vygenerujRadkyVHlavickuSpis = function () {

                    //var headerForm = Gordic.Wfl.DetailBuilderComponents.WflHeaderForm.create({
                    //    dataSectionsCount: 2,
                    //    IkonBarDto: componentDto.IkonBarDto,
                    //    pid: componentDto.ixp
                    //}).headerForm;

                    var rezimEditacepolicek = false;
                    if (content.EditMode === true || (content.RezimPodani != null && content.RezimPodani !== 0)) {
                        rezimEditacepolicek = true;
                    }

                    var headerFormNew = new Gordic.Forms.Form({
                        name: "formHeader",
                        layoutDescriptor: "L3M3S1, L-3-9-0, M-3-9-0, S-12-12-0"
                    });

                    headerFormNew.addSection()
                        .addRow(componentDto.CisJednaciLabelText)
                        .addField("gstringbox", "w-8", {
                            name: "CjSpis",
                            model: "model.CjSpis=value",
                            customClass: "bold",
                            disabled: true
                        });
 
                    if(componentDto.ssl_edi_szecis === 1) {
                        // jen u spisu protože parametr se jmenuje SSL - možnost editovat doplněk spisové značky výběrem z číselníku
                        // default je 0, a používají třeba UOHS, MOCR). ref T35482

                        // používat CjExt nad adminem spravovanou tabulkou
                        headerFormNew.addField("gselectbox", Gordic.Prefabs.Select.ginvpsu(), "w-4", {
                            name: "CjExt",
                            model: "model.CjExt=value.cj_ext",
                            modelDefaults: { ixs_su: componentDto.IxsSuAkt },
                            serverFilters: {
                                ixs_su: componentDto.IxsSuAkt,
                            },
                            dropdown: true,
                            disabled: true,
                            customClass: "bold"
                        })

                    } else {
                        // jinak využít volné editační pole, zde ponechávám možnost gmemorySelectbox, což je bonus pro uživatele

                        // používat CjExt oblíbené
                        headerFormNew.addField("gselectbox", "w-4", {
                            model: "model.CjExt=value.data",
                            disabled: true,
                            customClass: "bold"
                        }, Gordic.Gin.Prefabs.gmemorySelectbox({
                            userSettings: content.userSettings, // todo - predelat spolecne s dialogem na hromadnou zmenu na spolecny/globalni usersettings
                            name: "CjExt",
                            type: "string",
                            rememberLast: false,
                            countOfRemembered: 10
                        }));

                        //headerFormNew.addField("gstringbox", "w-4", {
                        //    name: "CjExt",
                        //    model: "model.CjExt=value",
                        //    customClass: "bold",
                        //    disabled: true
                        //});
                    }

                    headerFormNew
                        .addRow({
                            label: "jres:31937085",//RC 31937085 : Dat.pod.inic./Značka odes.
                            hint: "jres:31937175" //RC 31937175 : Datum podání iniciační / Značka odesilatele
                        }) 
                        .addField("gdatebox", "w-8", {
                            name: "DatPrijPod",
                            model: "model.DatPrijPod=value",
                            disabled: true
                        });


                    headerFormNew.addField("gstringbox", "w-4", {
                        name: "ZnackaOdes",
                        model: "model.ZnackaOdes=value",
                        disabled: true
                    });



                    headerFormNew.addSection();

                    headerFormNew.addPrefab(Gordic.Wfl.Prefabs.GIdentifikatorDokumnetuSpisu(
                        {
                            fieldOpt: {
                                model: "model.pid=value",
                                disabled: true
                            }
                        }, {
                            label: "jres:26255423", //RC 26255423 : Identifikátor
                            hint: "jres:31937489" //RC 31937489 : Jednoznačná identifikace každé entity. Například dokument je při svém vzniku (podání) označen;PID, který je neměnný po celou dobu životního cyklu dokumentu.

                    }
                    ));

                    // v ts lze pouzit Ginis.DbModel.GWflctysEnum
                    var isTypovaEntita = componentDto.TypSpis == 2 || componentDto.TypSpis == 3 || componentDto.TypSpis == 4 || componentDto.TypSpis == 5;
                    var typLabel = componentDto.gin_n23_vecsk == 0 ? "jres:31937199" : "jres:26257359"; //RC 31937199 : Typ RC 26257359 : Druh

                    if (!isTypovaEntita) {
                        headerFormNew
                            .addRow({
                                label: typLabel,
                                hint: "jres:31937490"//RC 31937490 : Číselník nesoucí uživatelské zatřídění entity včetně možnosti předdefinovat další metadata entity na základě vybraného typu. (přístup, věcnou skupinu,…)
                            })

                            .addField("gselectbox", Gordic.Prefabs.Select.sslstyp(),
                                {
                                    name: "IxsTyp",
                                    model: "model.IxsTyp = value.ixs_typ",
                                    graphicInput: "oninput",
                                    itemTemplate: Gordic.Wfl.GWflCommonDlg.sslstypItemTemplate({ skartacniRezimVisible: false }),
                                    serverFilters: {
                                        aktivita_ssl: [100]
                                    },
                                    disabled: true
                                });
                    }

                    headerFormNew.addSection();
                    headerFormNew
                        .addRow({
                            label: "jres:26255496",//RC 26255496 : Přístup
                            hint: "jres:31937116",//RC 31937116 : Definice práv  přístupu k entitám.
                        }) 
                        .addField("gselectbox", Gordic.Prefabs.Select.gincstu(),
                            {
                                name: "StUtajIdWfl",
                                model: "model.StUtajIdWfl=value.st_utaj_id",
                                serverFilters: {
                                    st_utaj_id_orig: componentDto.IRPUzivatelMaIRPNesmiPrepnoutNaRizenyPristup ? "!= 40" : undefined,
                                    gintreu: componentDto.PrizRezimUtaj ? true : undefined
                                },
                                disabled: true,
                                buttons: [{
                                    requireEdit: false,
                                    tooltip: "jres:31937084", //RC 31937084 : Otevře dialog řízení přístupu
                                    action: new GAction({
                                        caption: "jres:26255496", //RC 26255496 : Přístup
                                        name: "actPristupHlavicka",
                                        visible: componentDto.JeButtonUPRstupuViditelny,
                                        run: function (ev, obj) {
                                            content.actions.actPristup.run();
                                        }
                                    })


                                }]
                            })
                        ;

                    headerFormNew
                        .addRow({
                            label: "jres:26255398",
                            hint: "jres:31937491" //RC 31937491 : Vlastník entity
                        }) 
                        .addField("gselectbox",
                            Gordic.Gin.Fields.ginsfunSSU(
                                {
                                    name: "IxsFunAkt",
                                    model: "model.IxsFunAkt = value.ixs_fun",
                                    disabled: true,
                                    serverFilters: {
                                        aktivita: [100],
                                        ixs_su: componentDto.IxsFunAktIxsSU
                                    },
                                }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO)
                        );


                    //dsebesta 30.05.2019  předelano na GVec 
                    headerFormNew.addSection({ layoutDescriptor: "L-1-11-0, M-1-11-0, S-12-12-0", customClass: "w-L-12 w-M-12 w-S-12" });
                    headerFormNew.addPrefab(Gordic.Wfl.Prefabs.GVec(
                        content.userSettings,
                        {
                            model: "model.Nazev=value.data",
                            disabled: true,
                            customClass: (rezimEditacepolicek ? "js-VlastaFocus " : "") + " bold",
                            change: function (ev, item) {
                                if (item && item.value && item.value.data) {
                                    content.sslHeaderSetniVecPodrobnePokudJePrazdna(item.value.data);
                                }
                            },
                            validators: [
                                {
                                    validate: function (value, source) {
                                        if (value && value.data && value.data.length > componentDto.Validators.Nazev[1].max) {
                                            return false;
                                        }
                                        return true;
                                    },
                                    getMessage: function (value) {
                                        return "jres:31937149"; //RC 31937149 : Zadaný text je příliš dlouhý.
                                    }
                                }
                            ],
                            tagByValue:
                                componentDto.Validators && componentDto.Validators.Nazev && componentDto.Validators.Nazev[1] && componentDto.Validators.Nazev[1].max
                                    ? Gordic.Prefabs.Field.charCounter(componentDto.Validators.Nazev[1].max).tagByValue
                                    : undefined
                        },
                        {
                            hint: "jres:31937492" //RC 31937492 : Zpravidla stručný, ale výstižný popis obsahu evidované entity, nesmí obsahovat osobní údaje.
                        }
                    ));

                    /*
                    headerFormNew.addRow("jres:26255425") //RC 26255425 : Věc
                        //.addField("gstringbox", {
                        //    name: "vec",
                        //    model: "model.Nazev=value",
                        //    disabled: true
                        //})
                        .addField("gselectbox", {
                            model: "model.Nazev=value.data",
                            disabled: true,
                            change: function (ev, item) {
                                if (item && item.value && item.value.data) {
                                    content.sslHeaderSetniVecPodrobnePokudJePrazdna(item.value.data);
                                }
                            }

                        }, Gordic.Gin.Prefabs.gmemorySelectbox({
                            userSettings: content.userSettings,
                            name: "vec",
                            type: "string",
                            rememberLast: false,
                            countOfRemembered: 10
                        }))
                        ;
                    */
               
                    if (componentDto.UzivSlLVisible === true || componentDto.UzivSlMVisible === true) { 
                        if (componentDto.UzivSlLVisible === true) {
                            headerFormNew.addSection({ layoutDescriptor: "L-2-10-0, M-2-10-0, S-12-12-0", customClass: "w-L-6 w-M-6 w-S-12" }); 
                            headerFormNew
                                .addRow(componentDto.UzivSlLLabelText)
                                .addField("gstringbox", { name: "UzivSlL", model: "model.UzivSl1=value", disabled: true });
                        }

                        if (componentDto.UzivSlMVisible === true) {
                            headerFormNew.addSection({ layoutDescriptor: "L-2-10-0, M-2-10-0, S-12-12-0", customClass: "w-L-6 w-M-6 w-S-12" }); 
                            headerFormNew
                                .addRow(componentDto.UzivSlMLabelText)
                                .addField("gstringbox", { name: "UzivSlM", model: "model.UzivSl2=value", disabled: true });
                        }
                        //doplnění prázdné sekce
                        if (componentDto.UzivSlLVisible !== componentDto.UzivSlMVisible) {
                            headerFormNew.addSection({ customClass: "w-L-6 w-M-6 w-S-12" });
                        }
                    }



                    ////od radka
                    //headerForm.form.sections[1].rows = headerFormNew.form.sections[0].rows;

                    //// přesunuto na žádost michala 
                    //headerForm.form.sections[2].rows = headerFormNew.form.sections[1].rows;
                    return headerFormNew;
                };

                //#endregion
                var result = {
                    headerForm: componentDto.IsSpis ? vygenerujRadkyVHlavickuSpis() : vygenerujRadkyVHlavickuDokument(this)
                    ,
                    onBuild: [
                        function () {
                            this.enableHeader();
                            
                            this.nasetujHlavicku();
                            

                            if (this.ReadOnlyEko) {
                                this.enableReadOnlyEkoSslHeader();
                            }
                            if (this.ReadOnlySSL) {
                                this.enableReadOnlySslProfil();
                            }
                            // ztučnění políčka věc

                            //HOT FIX na obsluhu focusu TODO VMACA musí vyřešit 
                            
                            var l_bActionEnabled = true;
                            if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani !== 0)) {
                                l_bActionEnabled = false;
                            }
                            if (!l_bActionEnabled) {
                                content.findFields("Vec").find("input").focus();
                            }
                            var WFLSettBarevneRozliseniEntit = this.globalSettings.get("Global.Wfl.AppSettings.OthersSettings.WFLSettBarevneRozliseniEntit")
                            if (WFLSettBarevneRozliseniEntit != null && WFLSettBarevneRozliseniEntit > 0) {
                                var hlavickaDiv = this.find(".db-header");
                                if (componentDto.IsSpis) {
                                    hlavickaDiv.addClass("SslHeaderColorMode-Spis");
                                } else if (WFLSettBarevneRozliseniEntit === 1 ) {
                                    hlavickaDiv.addClass("SslHeaderColorMode-Dokument");
                                }
                            }
                            this.setAILinkHeader();

                        },
                    ],
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                        nasetujHlavicku: function () {
                            var form = this.findForms("formHeader");
                            var fields = form.findFields();
                            fields.gfield("model", "apply", componentDto);
                            fields.gfield("model", "validators", componentDto.Validators);
                            Utils.Form.markRequired(fields);
                            form.gform("waitForValues").done(function () {
                                if (Gordic.Utils.WidgetExists("gfield", fields)) {
                                    fields.gfield("confirm");
                                }
                            });
                            
                        },

                        setAILinkHeader: function () {
                            var form = this.findForms("formHeader");
                            this.aiAttachments?.upsert({
                                id: "formHeader",
                                caption: "Hlavička dokumentu",
                                dataWrapper: {
                                    kind: "form",
                                    form: form // source formulář typu JQuery<HTMLElement>
                                }
                            });

                        },
                        
                        enableHeader: function () {
                            var l_bActionEnabled = true;
                            var IsPodani = this.RezimPodani != null && this.RezimPodani !== 0; 
                            if (this.EditMode === true || IsPodani) {
                                l_bActionEnabled = false;
                            }

                            var form = this.findForms("formHeader");
                            if (componentDto.IsSpis) {

                                this.findFields(Gordic.Wfl.Prefabs.FieldNames.vec).gfield("option", "disabled", !componentDto.LzeEditovatVec || l_bActionEnabled);
                                //componentDto.LzeEditovatCjExt
                                this.findFields("CjExt").gfield("option", "disabled", !componentDto.LzeEditovatSpZnExt || l_bActionEnabled); //dsebesta 14.12.2022 ref T24085
                                //this.findFields("IxsFunSchval").gfield("option", "disabled", l_bActionEnabled);
                                //this.findFields("IxsFunResitel").gfield("option", "disabled", l_bActionEnabled);
                                
                                this.findFields("IxsFunAkt").gfield("option", "disabled", l_bActionEnabled);
                                if (componentDto.LzeEditovatTypSpisu && !l_bActionEnabled) {
                                    this.findFields("IxsTyp").gfield("option", "disabled", false);
                                }

                                //dsebesta 24.06.2021 nahrazeno
                                //if (componentDto.LzeEditovatPristup && !l_bActionEnabled) {
                                //    this.findFields("StUtajIdWfl").gfield("option", "disabled", false);
                                //}


                              
                    // ALF 24.6.2021 sjednoceno s dokumentem, totiž spis a shodná agenda která jej zobrazila neměla právo editovat přístup ref T13089 - konec
                               
                               
                            } else {
                                //LzeEditovatCjExt
                                
                                this.findFields(Gordic.Wfl.Prefabs.FieldNames.vec).gfield("option", "disabled", l_bActionEnabled);
                                /* // puvodni Chování //dsebesta 14.12.2022 ref T24085
                                this.findFields("Znacka").gfield("option", "disabled", l_bActionEnabled);
                                if (!l_bActionEnabled){ 
                                    if (componentDto.CjExtVisible) {// pokud je cj prideleno, zakazu jeho editaci v edit modu
                                        this.findFields("Znacka").gfield("option", "disabled", true);
                                        if (componentDto.LzeEditovatCjExt) { //dsebesta 14.12.2022 ref T24085
                                            this.findFields("CjExt").gfield("option", "disabled", false);
                                        }
                                    } else {
                                        if (componentDto.ssl_edit_znacka === "0") {
                                            this.findFields("Znacka").gfield("option", "disabled", true);
                                        }
                                    }
                                }
                                }
                                */
                                this.findFields("Znacka").gfield("option", "disabled", l_bActionEnabled || (!IsPodani && !componentDto.LzeEditovatAktZnacku));
                                this.findFields("CjExt").gfield("option", "disabled", l_bActionEnabled || (!IsPodani && !componentDto.LzeEditovatCjExt));

                                //this.findFields("IxsFunResitel").gfield("option", "disabled", l_bActionEnabled);
                                this.findFields("IxsFunAkt").gfield("option", "disabled", l_bActionEnabled || componentDto.PrizSpis === 2 || componentDto.usu_predani === 0);
                                this.findFields("IxsTyp").gfield("option", "disabled", l_bActionEnabled);



                                //dsebesta 24.06.2021 nahrazeno
                                //if (componentDto.LzeEditovatPristup && !l_bActionEnabled) {
                                //    this.findFields("StUtajIdWfl").gfield("option", "disabled", false);
                                //}
                                
                                

                            }

                            /*
                            var irpBezMoznostiPrepnuti = false;
                            // ALF uživatel má IRP ale nemá možnost přepnout na řízený, pokud již byl vybrán řízený pak readOnly
                            if (componentDto.IRPUzivatelMaIRPNesmiPrepnoutNaRizenyPristup)
                                if ((componentDto.StUtajIdWfl != null) && componentDto.StUtajIdWfl === 40)
                                    irpBezMoznostiPrepnuti = true;
                            // ALF 19.11.2015 uživatel má IRP ale nemá možnost přepnout na jiný než řízený, pokud již byl vybrán řízený pak readOnly
                            if (componentDto.IRPUzivatelMaIRPNesmiZrusitRizenyPristup)
                                if ((componentDto.StUtajIdWfl != null) && componentDto.StUtajIdWfl === 40)
                                    irpBezMoznostiPrepnuti = true;

                            // ALF 24.6.2021 sjednoceno s dokumentem, totiž spis a shodná agenda která jej zobrazila neměla právo editovat přístup ref T13089 - začátek
                            if (componentDto.TypAg === componentDto.TypAgUserProcess && componentDto.TypAgEKO) {     // ALF 13.4.2017 detail dokumentu: profil - editovatelnost pole přístup pro dokumenty vlastní agendy i v EKO požadavek J. Palánová EKO [REQ-40070-17]
                                if (!l_bActionEnabled && !irpBezMoznostiPrepnuti && !(componentDto.ssl_editprisdok === 0)) {
                                    this.findFields("StUtajIdWfl").gfield("option", "disabled", false);
                                }
                            }
                            else {
                                if (!l_bActionEnabled && !irpBezMoznostiPrepnuti && componentDto.LzeEditovatPristup2) {
                                    this.findFields("StUtajIdWfl").gfield("option", "disabled", false);
                                }
                            }

                            */
                            var stavNeuzavreno = (componentDto.StavPis == 0 || componentDto.StavPis == 10);
                            var readOnlySslProfil = !stavNeuzavreno;

                            if (componentDto.TypAg === componentDto.TypAgUserProcess && componentDto.TypAgEKO) {     // ALF 13.4.2017 detail dokumentu: profil - editovatelnost pole přístup pro dokumenty vlastní agendy i v EKO požadavek J. Palánová EKO [REQ-40070-17]
                                if (!l_bActionEnabled && componentDto.LzeEditovatPristup2) {
                                    this.findFields("StUtajIdWfl").gfield("option", "disabled", false);
                                }
                            }
                            else {
                                if (!l_bActionEnabled && componentDto.LzeEditovatPristup2 && !(readOnlySslProfil && componentDto.IsSpis) ) {
                                    this.findFields("StUtajIdWfl").gfield("option", "disabled", false);
                                }
                            }



                            if (this.RezimPodani != null && this.RezimPodani !== 0) {
                                this.findFields("StUtajIdWfl").gfield("option", "disabled", false);
                            }
                            
                        },
                        enableReadOnlyEkoSslHeader: function () {
                            
                            if (componentDto.IsSpis) {
                                //m_oTbDataVlastnikAg.FunReadOnly = readOnlyEkoProfil || readOnlySslProfil;     // ALF 30.3.2016
                                this.findFields("IxsFunAkt").gfield("option", "disabled", true);
                            } else {
                                //tbCj.ReadOnly = readOnlyEkoProfil;
                                this.findFields("CjZn").gfield("option", "disabled", true);
                            }
                        },
                        enableReadOnlySslProfil: function () {
                            if (componentDto.IsSpis) {
                                //m_oTbDataSchvalovatel.ReadOnly = readOnlySslProfil;
                                //m_oTbDataZpracovatel.ReadOnly = readOnlySslProfil;
                                //m_oTbDataVlastnikAg.FunReadOnly = readOnlyEkoProfil || readOnlySslProfil;     // ALF 30.3.2016
                                //this.findFields("IxsFunAkt,IxsFunResitel,IxsFunSchval").gfield("option", "disabled", true);
                            } else {
                                ;
                            }
                            this.findFields("IxsFunAkt").gfield("option", "disabled", true);

                        },
                        sslHeaderSetniVecPodrobnePokudJePrazdna: function (vec) {
                            var vypnoutPredplnovaniVeci = this.globalSettings.get("Global.Ssl.AppSettings.DetailSettings.VypnoutPredplnovaniVeci");
                            var fieldVecPodrobne = this.findFields("VecPodrobne");
                            if (fieldVecPodrobne.length > 0) {
                                var disabled = fieldVecPodrobne.gfield("option", "disabled");
                                if (!disabled) {
                                    var value = fieldVecPodrobne.gfield("getValue");
                                    if (value == null || value === "" || (!vypnoutPredplnovaniVeci && this.SslHeaderLastVec != null && this.SslHeaderLastVec === value)) {
                                        fieldVecPodrobne.gfield("setValue", vec);
                                    }
                                }
                            }
                          
                            this.SslHeaderLastVec = vec;
                        },

                        saveSslHeader: function () {
                            var that = this;
                            var headerModel = {
                                IsSslHeader: true
                            };
                            var promis = $.Deferred();
                            var headerForm = this.findForms("formHeader");
                            headerForm.gform("waitForValues")
                                .then(function () {
                                    headerForm.findFields().gfield("model", "collect", headerModel);
                                    if (headerForm.gform("hasChanged")) { //
                                        headerModel.MetadataChanged = true;
                                    }
                                    

                                    //kontrola delky na u Vec

                                    var vlastnik = that.findFields("IxsFunAkt").gfield("getValue");
                                    if (vlastnik) {
                                        headerModel.IxsFunAktIxsSU = vlastnik.ixs_su;
                                    }

                                    if (headerModel.StUtajIdWfl === 40 && headerModel.StUtajIdWfl != componentDto.StUtajIdWfl && componentDto.IsSpis) {
                                        content.dialogs.confirm("jres:26256644", "jres:26256449").on("closed", function (ev, retValConfirm) { //RC 26256644 : Řízený přístup
                                            //RC 26256449 : Přejete si nastavit řízený přístup i u vložených dokumentů?
                                            if (retValConfirm === "yes") {
                                                headerModel.NastavitRPVlozDokHidden = "1";

                                            }
                                            that.saveSslHeader_step2(promis, headerModel);
                                        });
                                    } else {
                                        that.saveSslHeader_step2(promis, headerModel);
                                    }
                            });
                            return promis;
                        },

                        saveSslHeader_step2: function (promis, headerModel) {
                            var that = this;
                            if (!componentDto.IsSpis && componentDto.ssl_typ_inst !== 0) {
                                /* // dsebesta 30.08.2022 ref T21303  
                                var StUtajIdWfl = this.findFields("StUtajIdWfl").gfield("getValue");
                                if (StUtajIdWfl && StUtajIdWfl.st_utaj_id_orig === 40 ) {
                                    var stupenUtajeniDto = {
                                        StuUtajId: headerModel.StUtajIdWfl
                                    };
                                    Gordic.Wfl.Dialogs.StupenUtajeniDlg({ parentContent: that, opt: { dto: stupenUtajeniDto }, ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow })
                                        .done(function (data) {
                                            if (data && data.stupenUtajeniDto) {
                                                //"StUtajId": data.stupenUtajeniDto.StuUtajId,
                                                //"Duvod": data.stupenUtajeniDto.Duvod,
                                                //"Platnost": data.stupenUtajeniDto.Platnost
                                                headerModel.StUtajIdWfl = data.stupenUtajeniDto.StuUtajId;
                                                headerModel.StupenUtajeniDuvod = data.stupenUtajeniDto.Duvod;
                                                headerModel.StupenUtajeniPlatnost = data.stupenUtajeniDto.Platnost;
                                                promis.resolve(headerModel);
                                            } else {
                                                promis.reject();
                                            }
                                        })
                                        .fail(function () {
                                            promis.reject();
                                        });

                                } else {
                                    promis.resolve(headerModel);
                                }
                                */

                                promis.resolve(headerModel);
                            } else {
                                promis.resolve(headerModel);
                            }

                        },

                        predplnSpisZnakDleTypu: function () {
                            var that = this;
                            var SpisZnakSpisPlanFields = this.findFields("SpisPl,SpisZnak");
                            var ixsTypField = this.findFields("IxsTyp");
                            var IxsTypValue = ixsTypField.gfield("getValue");
                            if (SpisZnakSpisPlanFields.length > 0 && ixsTypField.length > 0 && !ixsTypField.gfield("option", "disabled") && componentDto.ssl_editspznpr !== 0) {
                                if (IxsTypValue.spis_znak != null) {
                                    if ((this.EditMode && componentDto.LzeEditovatSpisPlanAZnak) || componentDto.IsNovePodani) { // dsebesta 31.01.2022 přidána podmínka, aby fungovalo i při podání na žádost Petra Juříka. 
                                        SpisZnakSpisPlanFields.gfield("model", "apply", { SpisPl: IxsTypValue.spis_pl, SpisZnak: IxsTypValue.spis_znak})
                                    }
                                }
                            }

                        }

                    },
                };


                //result.menuBar = [

                //    Gordic.Wfl.Globals.MenuDefinitions.detailDokument(),
                //    { action: "actPristupHlavicka", parent: "menuDokument" }
                //];

                return result;
            }
        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);
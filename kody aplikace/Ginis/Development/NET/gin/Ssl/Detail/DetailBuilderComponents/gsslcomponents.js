/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       gsslcomponents.js
*    project     q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gordic.Ssl.WebClient.csproj
*    created     2026-02-16 14:43:24
*    files       Gin\Ssl\Detail\DetailBuilderComponents\GSslHeaderComponent.js
*                Gin\Ssl\Detail\DetailBuilderComponents\GSslProfilDokumentComponent.js
*                Gin\Ssl\Detail\DetailBuilderComponents\GSslProfilSpisComponent.js
*                Gin\Ssl\Detail\DetailBuilderComponents\GSslDetailComponent.js
*                Gin\Ssl\Detail\DetailBuilderComponents\GSslDetailDokumentuComponent.js
*                Gin\Ssl\Detail\DetailBuilderComponents\GSslDetailDoruceniComponent.js
*                Gin\Ssl\Detail\DetailBuilderComponents\GSslDetailEklepPredplneniComponent.js
*                Gin\Ssl\Detail\DetailBuilderComponents\GSslDetailEklepMaterialComponent.js
*                Gin\Ssl\Detail\DetailBuilderComponents\GSslDetailEklepPripominkaComponent.js
*                Gin\Ssl\Detail\DetailBuilderComponents\GSslPrilohyComponent.js
*                Gin\Ssl\Detail\DetailBuilderComponents\GSslDetailSbernyArchComponent.js
*                Gin\Ssl\Detail\DetailBuilderComponents\GSslDetailObsahTSComponent.js
*                Gin\Ssl\Detail\DetailBuilderComponents\GSslDetailObsahDiluComponent.js
*                Gin\Ssl\Detail\DetailBuilderComponents\GSslDetailSpisuComponent.js
*                Gin\Ssl\Detail\DetailBuilderComponents\GSslSidePanels.js
*                Gin\Ssl\Detail\DetailBuilderComponents\GSslVzoryComponent.js
*                Gin\Ssl\Detail\DetailBuilderComponents\GSslKpiComponent.js
*                Gin\Ssl\Detail\DetailBuilderComponents\GSslKpiDokumentComponent.js
*                Gin\Ssl\Detail\DetailBuilderComponents\GSslKpiSpisComponent.js
*                Gin\Ssl\Detail\DetailBuilderComponents\GSslDetailVlastnostiComponent.js
*                Gin\Ssl\Detail\DetailBuilderComponents\GSslDetailKatastrComponent.js
*/

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\DetailBuilderComponents\GSslHeaderComponent.js 

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

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\DetailBuilderComponents\GSslProfilDokumentComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslProfilDokument: {

            create: function (componentDto) {
                
                var result = {
                    onMenuBuild: [
                        function (builder, menus) {
                           this.enableProfilActions();
                        }
                    ],
                    onbuild: [
                        function () {
                            this.isSimpleModeProfil();
                            //if (componentDto.RezimPodani === 0) {
                               //this.vytvoritKlicvaSlova();
                            //}
                            this.nasetujProfil(this.SslProfilDokument_Dto); // dsebesta 2.05.2022 prohozeni pořadí s enableprofil
                            this.enableProfil(); // enable profilu
                            this.kontrolaPoctuPriloh();
                            this.eventaProUpdatePoctuPriloh();
                            this.setAILinkProfil();

                        }
                    ],
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                        saveSslProfil: function () {
                            var profilModel = {
                                IsSslProfil: true
                            };
                            var profilForm = this.findForms("formWflDokument");
                            profilForm.findFields().gfield("model", "collect", profilModel);
                            if (profilForm.gform("hasChanged")) { //
                                profilModel.MetadataChanged = true;
                            }


                            var odesilatel = this.findFields("Odesilatel");
                            if (odesilatel.length > 0) {
                                var valueOdesilatel = odesilatel.gfield("getValue");
                                if (valueOdesilatel) {
                                    profilModel.IxsEsu_zast_txt = valueOdesilatel.zast_txt;
                                }
                            }
                            //this.findFields("Keywords").gkeywordsbar("save"); // přesunuto do dokument.js
                            return profilModel;
                        },

                        predUlozenimSslDetailVyrizeni: function () {
                            var promis = $.Deferred();
                            var retVal = {};
                            this.findForms("formWflDokument").findFields("DatVyrDo").gfield("model", "collect", retVal);
                            var ZmTerVyrRealized = this.zmenaTerVyrizeni(this.findFields("DatVyrDo"), componentDto.DatVyrizDoOrig, componentDto.LhutaTypDok);
                            if (ZmTerVyrRealized && componentDto.ssl_zmeterspidu === 1) {
                                var that = this;
                                var options = {
                                    winTitle: "jres:26255153"
                                };
                                var $div = Gordic.Ssl.Dialogs.AddDuvodDlg(that, options, Gordic.Global.Enums.ModOtevreni.showModalWindow); //RC 26255153 : Důvod změny termínu
                                $div.on("closed", function (ev, retValDuvod) {
                                    if (retValDuvod) {
                                        retVal.MetadataChanged = true;
                                        that.DuvodZmenyTerminuCj = retValDuvod.duvod;
                                        retVal.DuvodZmenyTerminuCj = retValDuvod.duvod;
                                        promis.resolve(retVal);
                                    } else {
                                        promis.reject(retVal);
                                    }
                                });
                            } else {
                                promis.resolve(retVal);
                            }
                            return promis;
                        },
                        

                        sslProfProfFieldsName:
                            "VecPodrobne,Poznamka,VecnaSkupina,SpisPl,SpisZnak,SkartRezim,SkartZnak,SkartLhuta,Umisteni,IxsFunResitel,IxsFunWfl," +
                            "PocListu,PocStran,PocPriloh,PocListuPriloh,PocKopii," +
                            "TerminDate,TerminDuvod,DatPodano,DatEvidovano,DatPredpUzav,DatVyrizeno,UlozeniHodnota,DatPrMoc,DatVykonav,FieldUloz,FieldUlozDatum,IdExtArch,PorCisloObd,PorCisloVSpisu," +
                            "DatDel"
                        ,

                        sslProfVyrizFieldsName: "DatVyrDo,DatUzav,ZpusobVyrizeni,InicDok,VyrizDok,DatVyr,Schvalovatel,Zpracovatel,Komentar,IxsFunUzavrel," +
                            "SkartRezim,RokSpUdal,RokKonSpu,PopisSpousteciUdalosti,IxpTss,DuvodPozSkar,PrizPozSkar,RokDoPozSkar,SkartRizeni,UlozenoNlPriloh,UlozenoListuDok" //, SkartZnak, SkartLhuta   -> tyhle přesunuty do profil Fields aby se neschvoaval row
                        ,

                        nasetujProfil: function (dto) {
                            var form = this.findForms("formWflDokument");
                            var SslProfProfVyrizFields = form.findFields(this.sslProfProfFieldsName + "," + this.sslProfVyrizFieldsName);
                            SslProfProfVyrizFields.gfield("model", "apply", dto);
                            this.zkusNasetovatOdesilatele(dto);
                            
                            SslProfProfVyrizFields.gfield("model", "validators", componentDto.Validators);
                            form.gform("waitForValues").done(function () {
                                var fieldyVConfirmu = form.findFields();
                                if (!Gordic.Utils.WidgetExists("gform", form)) {
                                    return;
                                }
                                Utils.Form.markRequired(fieldyVConfirmu);
                                fieldyVConfirmu.gfield("confirm");
                                
                            });
                            this.nastavPosledniUzivatelskouPoznamu();

                        },
                        setAILinkProfil: function () {
                            var form = this.findForms("formWflDokument");
                            this.aiAttachments?.upsert({
                                id: "formWflDokument",
                                caption: "Profil dokumtu",
                                dataWrapper: {
                                    kind: "form",
                                    form: form // source formulář typu JQuery<HTMLElement>
                                }
                            });
                            // předávání konkrétních informací například z KPI
                            //this.aiAttachments?.upsert({
                            //    id: "form", caption: "Něco", dataWrapper: {
                            //        kind: "delegate",
                            //        dataFn: function () {
                            //            return [{ popis: "Stav dokumentu", hodnota: "Stornováno" }];
                            //        }
                            //    }


                            //});

                            //attachment
                            //this.aiAttachments?.upsert({
                            //    id: "form",
                            //    caption: "Něco",
                            //    dataWrapper: {
                            //        kind: "promise",
                            //        dataPromise: this.isl.Dokument.read({ data: { Ixp: this.DetailDto.ixp } }).get().then(o => { FileInfoDto: "o.xxxx"})
                            //    }
                            //})
                            //;



                        },
                        zmenaPoznamkyVUzivatelskychPoznamkach: function (param, data) { //param: "create" | "update" | "delete" | "changeColor", data: IGNoteDto | null
                            this.nastavPosledniUzivatelskouPoznamu();
                        },
                        nastavPosledniUzivatelskouPoznamu: function () {
                            var that = this;
                            if (componentDto.RezimPodani === 0 && this.globalSettings.get("Global.Ssl.AppSettings.DetailSettings.ZobrazUzivPozn") ) { 
                                var uzivPoznamkaField = this.findFields("UzivPoznamka");
                                uzivPoznamkaField.gfield("clear");
                                if (!this.closed) {
                                    this.createServiceContent({ className: "Gordic.Wfl.WebClient,Gordic.Wfl.WebClient.GWfldpozContent", serverParams: { Ixp: componentDto.ixp } }).call("ReadLastOne")
                                        .then(function (res) {
                                            if (res && res.text) {
                                                var newText = res.text.replace(/(?:<br>)/g, ' \r\n');
                                                if (!Gordic.Utils.WidgetExists("gfield", uzivPoznamkaField)) {
                                                    return;
                                                }
                                                uzivPoznamkaField.gfield("setValue", newText);
                                            }

                                        });
                                }
                            }
                        },

                        zkusNasetovatOdesilatele: function (dto) {
                            if (dto.SPrij === 1) {
                                var field = this.findFields("Odesilatel");
                                field.gfield("model", "apply", dto, { setFlags: { uvodniNastaveni: true } });
                                field.gfield("confirm");
                            } else {
                                if (dto.MistoVzniku) {
                                    var mistoVznikuField = this.findFields("MistoVzniku");
                                    mistoVznikuField.gfield("setValue", dto.MistoVzniku);
                                    mistoVznikuField.gfield("confirm");
                                }
                            }
                        },
                        enableProfil: function () {
                            this.setPodaniMode();
                            this.enableProfilBase();
                            /*
                            if (this.ReadOnlyEko) {
                                this.enableReadOnlyEkoProfil();
                            }
                            */
                            this.enableSslDetailVyrizeni();
                        },

                        setPodaniMode: function () {
                            if(componentDto.RezimPodani !== 0){
                                this.findFields(this.sslProfVyrizFieldsName).gformrow().hide();
                                if (componentDto.RezimPodani === 1) {
                                    this.element.addHelpContext("NovyVlastni");
                                } else if (componentDto.RezimPodani === 2) {
                                    this.element.addHelpContext("NovyCizi");
                                }
                            }
                        },
                        //#endregion
                        enableSslDetailVyrizeni: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true) {
                                l_bActionEnabled = false;
                            }

                            this.findFields("IxsFunResitel").gfield("option", "disabled", l_bActionEnabled); // dsebesta přidáno protože nevím ty podmínky kdy mužu editovat
                            var fieldEnabled = (this.EditMode !== false) && !componentDto.DatVyrDoDisabled;
                            var field = this.findFields("DatVyrDo");
                            if (field) {
                                field.gfield("option", "disabled", !fieldEnabled);
                            }
                            if (componentDto.gin_n23_vedd != 0) { // 12.05.2025 nové skrývačky podle TK
                                if (!componentDto.PrizPozSkarRokDoPozSkarVisible) {
                                    this.findFields("PrizPozSkar").gformrow().hide();
                                }
                                if (!componentDto.DuvodPozSkarVisible) {
                                    this.findFields("DuvodPozSkar").gformrow().hide();
                                }
                                if (!componentDto.DatVyrizenoVisible) {
                                   // this.findFields("DatVyrizeno").gformrow().hide(); // zatím si nejsem uplně jistej jestli skrývat i tenhledatum, protože oproti TK je spojenej s více hodnotama
                                }
                                if (!componentDto.InicDokVisible) {
                                    this.findFields("InicDok").gformrow().hide();
                                }
                                if (!componentDto.VyrizDokVisible) {
                                    this.findFields("VyrizDok").gformrow().hide();
                                }
                                if (!componentDto.KomentarVisible) {
                                    this.findFields("Komentar").gformrow().hide();
                                }
                                if (!componentDto.ZpusobVyrizeniVisible) {
                                    this.findFields("ZpusobVyrizeni").gformrow().hide();
                                }
                               


                            }


                        },
                        isSimpleModeProfil: function () {
                            var isSoucast = componentDto.TypSpis == 3 || componentDto.TypSpis == 5;
                            var isTS = componentDto.TypSpis == 2;
                            var isDil = componentDto.TypSpis == 4;

                            if (this.SimpleMode) {
                                this.findFields("TerminDate").gformrow().hide();
                                //this.findFields("DatVyrDo").gformrow().hide(); // dodělat jen pro SSD ale s Radek říkal nedávat, Tak nedávat
                                this.findFields("Umisteni").gformrow().hide();
                                //this.findFields("StUtajIdWfl").gformrow().hide(); // dsebesta 31.08.2020 nově přístup i pro SSD
                                this.find(".js-labelDatEvidovano").hide();
                                this.findFields("DatEvidovano").hide(); //  dsebesta 22.12.2020 na řádku je společně s datPod proto skrývám pouze Datum evidence
                                this.findFields("Zpracovatel").gformrow().hide(); // Pozor nyni je políčko v hlavičce
                                //jakysi stav nejspíš ještě
                                var visible = this.isSetPodrobnostiSSD ? true : false;
                                this.showhideSSDPodrobnosti(visible);
                            }

                            if (isTS || isSoucast || isDil) {
                                this.findFields("PocPriloh").gformrow().hide();
                              //  this.findFields("Umisteni").gformrow().hide();
                            }
                        },
                        showhideSSDPodrobnosti: function (visible) {
                            if (visible) {
                                this.findFields("SpisZnak").gformrow().show();
                               // this.findFields("IxsFunWfl").gformrow().show(); 
                            } else {
                               
                                //if (UserProcess.Configuration.GetParameter("ssd_det_spznak", 1) == 0) { // TODO
                                //    componentDto.SSDSpisZnakVisible = false; // už nachystano
                                //}

                                if (!componentDto.SSDSpisZnakVisible) {
                                    this.findFields("SpisZnak").gformrow().hide();
                                }

                                //if (!componentDto.SSDVlastnikVisible) {
                                //    this.findFields("IxsFunWfl").gformrow().hide(); //vlastnik
                                //}//end if
                            }
                        },

                        enableProfilActions: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true) {
                                l_bActionEnabled = false;
                            }
                            this.actions.actSSLPodrobnostiDokumentu.update({ enabled: l_bActionEnabled });

                            if (this.SimpleMode) {
                                this.actions.actSSLPodrobnostiDokumentu.update({ visible: true });
                            }

                            this.actions.actAddDilciTermin.update({ enabled: l_bActionEnabled && componentDto.AddTerminEnabled });
                            this.actions.actSplnitDilciTermin.update({ enabled: l_bActionEnabled && componentDto.SplnitTerminEnabled });

                        },

                        enableProfilBase: function () {
                            var that = this;
                            var l_bActionEnabled = true;
                            if (this.EditMode === true) {
                                l_bActionEnabled = false;
                            }
                            
                            // OdesilatelFlagPredplneniOdesilatele ???????
                            this.findFields("Odesilatel,MistoVzniku").gfield("option", "disabled", componentDto.BaseEnabledDto.OdesilatelRO);
                            if ($.content("main").wflDBParams.gin_poc_priloa > 0 && ((!l_bActionEnabled) || (componentDto.RezimPodani !== 0))) {
                                //this.findFields("PocPriloh").gfield("option", "disabled", componentDto.BaseEnabledDto.PoctyListuAllElementsRO); 
                            } else {
                                this.findFields("PocPriloh").gfield("option", "disabled", componentDto.BaseEnabledDto.PoctyListuAllElementsRO); 
                            }
                            this.findFields("PocListu,PocStran,PocListuPriloh,PocKopii").gfield("option", "disabled", componentDto.BaseEnabledDto.PoctyListuAllElementsRO); 
                            this.findFields("Poznamka").gfield("option", "disabled", (componentDto.BaseEnabledDto.PoznamkaRO || (this.SSl == 0)));
                           // this.findFields("VecnaSkupina").gfield("option", "disabled", componentDto.BaseEnabledDto.VecnaSkupinaRO);
                            this.findFields("SpisPl").gfield("option", "disabled", componentDto.BaseEnabledDto.SpisPlanRO);
                            this.findFields("SpisZnak").gfield("option", "disabled", componentDto.BaseEnabledDto.SpisZnakRO);
                            //this.findFields("StUtajIdWfl").gfield("option", "disabled", componentDto.BaseEnabledDto.StupUtajRO);
                            //this.findFields("IxsTyp").gfield("option", "disabled", componentDto.BaseEnabledDto.TypPisRO);
                            this.findFields("Umisteni").gfield("option", "disabled", (componentDto.BaseEnabledDto.UmisteniRO || (this.SSl == 0)));
                            this.findFields("VecPodrobne").gfield("option", "disabled", (componentDto.BaseEnabledDto.VecPodrobneRO || (this.SSl == 0) || !componentDto.JePovolenaPraceVAgendeAVlastnikAStavMaxUzavreno));
     
                            if (componentDto.RezimPodani === 0) {
                                var disabledKeyWords = !(l_bActionEnabled === false && !componentDto.BaseEnabledDto.KeywordsRO);
                                var keyWordsField = this.findFields("Keywords");
                                keyWordsField.gfield("option", "disabled", disabledKeyWords); // natvrdo KeyWord   měl jsem Keywords
                                if (disabledKeyWords) {
                                    Gordic.Ssl.WebClient.GDetailUtils.UpravKeywordsProOtevreniDialogu(this, keyWordsField, componentDto.LzeKlicovaSlova);
                                }
                            }
                            this.findFields("DatPodano").gfield("option", "disabled", componentDto.BaseEnabledDto.DatPodanoRO);

                            var form = this.findForms("formWflDokument");
                            form.gform("waitForValues").done(function () {
                                var valueUmisteni = that.findFields("Umisteni").gfield("getValue");
                                if (valueUmisteni && componentDto.LzeOperativneUlozit && valueUmisteni.priz_oper !== 0) {
                                    that.actions.actDocasneUloziste.update({ visible: true });
                                } else {
                                    that.actions.actDocasneUloziste.update({ visible: false });
                                }
                            });
                            this.actions.actDocasneUloziste.update({ enabled: l_bActionEnabled });
                            

                            
                            //butonek pro předvyplnění
                            this.pridejButonekDoOdesilatel();
                        },
                        /*
                        enableReadOnlyEkoProfil: function () { //ReadOnlyEkoProfil
                            //this.SSL
                            //tbEsu.ReadOnly = readOnlyEkoProfil;
                            this.findFields("Odesilatel,MistoVzniku").gfield("option", "disabled", true);
                            //tbVecPodrobne.ReadOnly = readOnlyEkoProfil || DocInfo.SSl == 0;
                            this.findFields("VecPodrobne").gfield("option", "disabled", true);
                            //tbSpZn.ReadOnly = readOnlyEkoProfil;
                            this.findFields("SpisZnak").gfield("option", "disabled", true);
                           
                            //tbPoznamka.ReadOnly = readOnlyEkoProfil || DocInfo.SSl == 0; 
                            this.findFields("Poznamka").gfield("option", "disabled", true);
                            //tbPocetListuStran.tbListu.ReadOnly = readOnlyEkoProfil;
                            //tbPocetListuStran.tbStran.ReadOnly = readOnlyEkoProfil;
                            //tbPocetListuStran.tbPriloh.ReadOnly = readOnlyEkoProfil;
                            //tbPocetListuStran.tbKopii.ReadOnly = readOnlyEkoProfil;
                            //tbPocetListuStran.tbListuPriloh.ReadOnly = readOnlyEkoProfil;
                            this.findFields("PocListu,PocStran,PocPriloh,PocListuPriloh,PocKopii").gfield("option", "disabled", true); 
                            //tbTypDok.ReadOnly = readOnlyEkoProfil;
                            this.findFields("IxsTyp").gfield("option", "disabled", true);
                            //cbPristup.ReadOnly = readOnlyEkoProfil
                            this.findFields("StUtajIdWfl").gfield("option", "disabled", true);
                            
                         
                            //tbUmisteni.ReadOnly = readOnlyEkoProfil || DocInfo.SSl == 0;
                            this.findFields("Umisteni").gfield("option", "disabled", true);
                        },
                        */
                        pridejButonekDoOdesilatel: function () {
                            
                            if (componentDto.SPrij === 1 && !componentDto.BaseEnabledDto.OdesilatelRO) {
                                var jeVyplneno = Gordic.Gin.Globals.GetUserSettings("Global.Ssl.AppSettings.DetailSettings.Odesilatel.IxsEsu", null);
                                if (jeVyplneno) { 
                                    var field = this.findFields("Odesilatel");
                                    field.gfield("addButton", {
                                        icon: 'gi-take',
                                        tooltip:"jres:31937019", //RC 31937019 : Předplní pole z uživatelského nastavení
                                        action: new GAction({
                                            name: 'actPredplnitSub', run: function (ev, ctx) {
                                                var obj = {
                                                    IxsEsu: Gordic.Gin.Globals.GetUserSettings("Global.Ssl.AppSettings.DetailSettings.Odesilatel.IxsEsu", null),
                                                    LicZast: Gordic.Gin.Globals.GetUserSettings("Global.Ssl.AppSettings.DetailSettings.Odesilatel.LicZast", null),
                                                    PorZast: Gordic.Gin.Globals.GetUserSettings("Global.Ssl.AppSettings.DetailSettings.Odesilatel.PorZast", null)
                                                };
                                                if (obj.IxsEsu) {
                                                    $(ctx.field).gfield("model", "apply", obj);
                                                }
                                            }
                                        })
                                    });
                                }

                            }

                        },
                        addDilciTermin: function () {
                            var that = this;
                            var options = {
                                Ixp: componentDto.ixp
                            };
                            Gordic.Ssl.Dialogs.AddDilciTerminDlg(that, options,"showModalWindow")
                                .on("closed", function (ev, retVal) {
                                    if (retVal) {
                                        that.reloadDetail();
                                    }
                                });
                        },
                        splnitDilciTermin: function () {
                            var that = this;
                            this.dialogs.confirm("jres:26256504").on("closed", function (ev, retVal) { //RC 26256504 : Chcete zaznamenat splnění dílčího termínu?
                                if (retVal) {
                                    if (retVal === "yes") {
                                        var colect = {};
                                        that.findFields("TerminDate,TerminDuvod").gfield("model", "collect", colect);
                                        var opt = {
                                            Ixp: componentDto.ixp,
                                            DatZmena: componentDto.DatZmena, //??
                                            DatTermin: colect.TerminDate,
                                            Duvod: colect.TerminDuvod,
                                            Mode: 2
                                        };
                                        var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                        srv.call("ZpracovatDilciTermin", opt )
                                            .done(function (rv) {
                                                if (rv) {
                                                    that.reloadDetail();
                                                } else {
                                                    that.dialogs.alert("jres:31937098");  //RC 31937098 : Splnění termínu se nepodařilo.
                                                }
                                                
                                            })
                                            .fail(function (rv) {
                                                that.dialogs.alert("jres:31937098"); //RC 31937098 : Splnění termínu se nepodařilo.
                                            }).always(function () { srv.close(); });
                                    }
                                }
                            });
                        },

                         // ##################### !!!!!!! Vyřízení !!!!!!!!!!!!!!!! #####################
                        showInicVyrizDokument: function (flagInicVyriz) {
                            var that = this;
                            var aIxp = null;
                            if (flagInicVyriz == 0) {
                                aIxp = this.findFields("InicDok").gfield("getValue");
                            } else {
                                aIxp = this.findFields("VyrizDok").gfield("getValue");
                            }
                            if (aIxp) {
                                that.otevriNovyDetail(
                                    {
                                        DetailDto: { ixp: aIxp }
                                    });
                            } else {
                                that.showFlash("jres:31937075", "g-state-warning"); //RC 31937075 : Není vyplněný identifikátor
                            }

                        },

                        removeVyrizDok: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var VyrizDok = this.findFields("VyrizDok").gfield("getValue");
                            if (VyrizDok) {
                                var options = {
                                    "Ixp": l_sIxp,
                                    "IxpVyriz": VyrizDok
                                };
                                var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                srv.call("RemoveVyrizujiciDokumentCj", options)
                                    .done(function (retVal) {
                                        if (retVal.StavBool) {
                                            that.tryReloadDetail(undefined, {
                                                flashMessage: "jres:31937077", //RC 31937077 : Vyřizující dokument byl odebrán
                                                flashMessageClass: "g-state-success"
                                            });
                                        }
                                    }).always(function () { srv.close(); });

                            }

                        },

                        sslPodrobnostiDokumentu: function () {
                            var that = this;
                            var options = {
                                Ixp: componentDto.ixp,
                            };
                            var $div = Gordic.Ssl.Dialogs.PodrobnostiDockumentuDlg(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow);

                            $div.on("closed", function (ev, retVal) {
                                if (retVal) {
                                    that.tryReloadDetail(undefined, {
                                        flashMessage: "jres:31937173", //RC 31937173 : V podrobnostech dokumentu došlo ke změně.
                                        flashMessageClass: "g-state-success",
                                    });
                                }
                            });

                        },

                        kontrolaPoctuPriloh: function () {
                            if (componentDto.ssl_kon_poc_pri === 1
                                && $.content("main").wflDBParams.gin_poc_priloa == 0) {  // ALF 29.1.2016 SSL - kontrolovat shodu na počet příloh v evidenční položce na detailu dokumentu a v seznamu příloh
                                //componentDto.PocetPrilohPisemnosti
                                var field = this.findFields("PocPriloh");
                                var pocPrilohInDetail = field.gfield("getValue");
                                if (componentDto.PocetPrilohPisemnosti !== null && componentDto.PocetPrilohPisemnosti !== undefined
                                    && pocPrilohInDetail !== null && pocPrilohInDetail !== undefined
                                    && pocPrilohInDetail !== componentDto.PocetPrilohPisemnosti) {
                                    var warningText = "jres:31937239".format(componentDto.PocetPrilohPisemnosti) //RC 31937239 : Rozpor v počtu příloh, v dialogu příloh jich je zadáno {0}

                                    field.gfield("addState", {
                                        id: "IdKontrolaPoctuPriloh",     // nepovinný, pouze pokud bude potřeba ikonu adresovat/měnit
                                        icon: "fa-exclamation-triangle g-state-text g-state-warning",
                                        //customClass: "g-state-warning",
                                        tooltip: warningText
                                    });
                                } else {
                                    var prilohyState = field.gfield("getState", "IdKontrolaPoctuPriloh");
                                    if (prilohyState != null && prilohyState.length > 0 ) {
                                        prilohyState.remove();
                                    }
                                }
                            }
                            // pridani noveho stavu
                            // odstraneni stavové ikony
                                
                        },
                        kontrolaESUVRegistrech: function() {
                            var that = this;
                            var usSetting = this.globalSettings.get("Global.Ssl.AppSettings.DetailSettings.OveritOdesilateleVSZR")
                            if (usSetting == undefined) { usSetting = true; }
                            var gin_esu_n23ao = $.content("main").wflDBParams.gin_esu_n23ao;
                            if (gin_esu_n23ao > 0
                                && componentDto.SPrij === 1
                                && (gin_esu_n23ao == 1 || (gin_esu_n23ao == 2 && usSetting))
                                && (this.EditMode || componentDto.RezimPodani !== 0)
                            ) {
                                var dtoOdesilatel= {};
                                var fieldSubjekt = this.findFields("Odesilatel");

                                fieldSubjekt.gfield("model", "collect", dtoOdesilatel);
                                if (dtoOdesilatel.IxsEsu != null
                                    && dtoOdesilatel.IxsEsu != this.IxsEsuOdesilatelePoKontrole
                                ) {
                                    this.beginOperation("jres:31937530") //RC 31937530 : Probíhá ověření ESU v egistrech
                                    var fieldSubjektValue = fieldSubjekt.gfield("getValue");

                                    var opt  = {
                                        ZpusDor: 0,
                                        IxsEsuOdesilatele: dtoOdesilatel.IxsEsu,
                                        ESUStupenVer: fieldSubjektValue.stupen_ver,
                                        ESUIdDs: fieldSubjektValue.id_ds
                                    };
                                    Gordic.Wfl.Utils.KontrolaESUVRegistrech(this, opt)
                                        .then(function (retVal) {
                                            if (retVal) {
                                                if (retVal.NewIxsEsuOdesilatele != null) {
                                                    that.IxsEsuOdesilatelePoKontrole = retVal.NewIxsEsuOdesilatele;
                                                    dtoOdesilatel.IxsEsu = retVal.NewIxsEsuOdesilatele;
                                                    fieldSubjekt.gfield("model", "apply", dtoOdesilatel);
                                                    that.notification("add", { icon: "gi-info", content: "jres:31937531", state: "success" }); //RC 31937531 : Na základě ověření ESU v regisrech bylo ESU aktualizováno
                                                } else {
                                                    that.IxsEsuOdesilatelePoKontrole = retVal.IxsEsuOdesilatele;
                                                }
                                                if (retVal.OtevritDetailEsu) {
                                                    var vyberESUDetBut = fieldSubjekt.gfield("getButton", "actDetail");
                                                    if (vyberESUDetBut != null && vyberESUDetBut.length > 0) {
                                                        vyberESUDetBut.click();
                                                    }
                                                }
                                            }
                                        })
                                        .fail(function (msg) {

                                        })
                                        .always(function (msg) {
                                            that.endOperation();
                                        })
                                        ;

                                }
                            }
                        },

                        eventaProUpdatePoctuPriloh: function () {
                            var that = this;
                            if($.content("main").wflDBParams.gin_poc_priloa > 0) { 
                                this.element.on("attachmentscountchange", function (ev, ctx) {
                                    if (ctx && ctx.firstTimeLoad) {
                                        ;
                                     //první načtení nedělám asi nic
                                    }
                                    else { 
                                        var opt = {
                                            ixp: componentDto.ixp
                                        };
                                        var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                        srv.call("ZjistiAktualniPocetPriloh", opt)
                                            .done(function (retVal) {
                                                if (retVal && retVal.StavBool) {
                                                    componentDto.PocetPrilohPisemnosti = retVal.NumParam1;
                                                    that.findFields("PocPriloh").gfield("setValue", retVal.NumParam1);
                                                } 

                                            })
                                            .fail(function (rv) {
                                            }).always(function () { srv.close(); });
                                    }
                                    /*
                                    // starý postup z eventy
                                    if (ctx && ctx.attachmentsCount != null) { //ctx.mainAttachmentCount, ctx.attachmentsCount
                                        // Poznamka RTOMES: Davide, nyní se už nemůžeš spolehnout, že zde bude správný počet pro pole Počet příloh. Musíš si to líznout z db - T13193
                                        componentDto.PocetPrilohPisemnosti = ctx.attachmentsCount;
                                        that.findFields("PocPriloh").gfield("setValue", ctx.attachmentsCount);
                                    }
                                    */
                                });
                            }
                        }

                        
                    },
                    tabs: {
                        SslProfil: {
                            tabParams: {
                                title: componentDto.Title, 
                                opened: true,  //1. tab je pro agednovou hlavičku, ta je pro dokumenty, spisy, zakázky atp. vždy L2M2S1. BO detaily mimo wfl (tzn. dokumenty, spisy) jsou v L1M1S1 //RC 26255308 : Dokument
                                group: Gordic.Prefabs.TabGroups.Dokument(componentDto.Title),
                                headerClass: "hidden"
                                /*
                                menuBar:  [
                                    { action: "actAddVyrizDok", favorite: true },
                                    { action: "actRemoveVyrizDok", favorite: true },
                                    { action: "actVyriditDok", favorite: true },
                                    { action: "actSSLPodrobnostiDokumentu", favorite: true }
                                ]
                                */
                            },
                            init: function (tab) {
                                //#region definice tab dokumentu
                                var that = $.content(tab);

                                var isSoucast = componentDto.TypSpis == 3 || componentDto.TypSpis == 5;
                                var isTS = componentDto.TypSpis == 2;
                                var isDil = componentDto.TypSpis == 4;
                                var isSpis = componentDto.TypSpis == 1; // na tomto formuláři by nemělo nastat
                                var isDokument = componentDto.TypSpis == 0;

                                var profilForm = new Gordic.Forms
                                    .Form({
                                        name: "formWflDokument",
                                        layoutDescriptor: "L2M2S1, L-3-9-0, M-3-9-0, S-12-12-0"
                                    })
                                    .addSection({ label: componentDto.Title, layoutDescriptor: "L-2-10-0, M-3-9-0, S-12-12-0", customClass: "w-L-7 w-M-7 w-S-12" });
                                if (componentDto.SPrij === 1) {
                                    profilForm
                                        .addRow("jres:26255430") //RC 26255430 : Odesílatel
                                        .addField("gselectbox", {
                                            name: "Odesilatel",
                                            model: "model.IxsEsu=value.ixs_esu;model.LicZast=value.lic;model.PorZast=value.por_zast",
                                            change: function (ev, changeObj) {
                                                if (changeObj && changeObj.value && !(changeObj.flags && changeObj.flags.uvodniNastaveni)) {
                                                    that.kontrolaESUVRegistrech();
                                                }
                                            },

                                            disabled: false,
                                            validators: componentDto.usu_povin_odes === 1 ? [new Gordic.Validators.Required()] : undefined,

                                        }, Gordic.Esu.Prefabs.vyberEsu({
                                            typ: 2,// 2 a 3 puvodně 2 
                                            Logovani: that.Logovani,
                                            VyberESUDialogClose: function (opt, retVal) {
                                                debugger;
                                            },
                                            //FieldsToFilterpanel: [Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Nazev]
                                            //ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow
                                            //strictEnableChangeZoInDisabled:true
                                        })
                                        );
                                } else {
                                    profilForm
                                        .addRow("jres:26255430") //RC 26255430 : Odesílatel)
                                        .addField("gstringbox", {
                                            name: "MistoVzniku",
                                            model: "model.MistoVzniku=value",
                                            validators: componentDto.usu_povin_odes === 1 ? [new Gordic.Validators.Required()] : undefined,
                                        });
                                }

                                var vecPodrobneLabel = "jres:26255458"; //RC 26255458 : Věc podrobně

                                switch (componentDto.TypSpis) {
                                    case 2: { // TS
                                        vecPodrobneLabel = "jres:26257350"; //RC 26257350 : Název - podrobně
                                        break;
                                    }
                                    case 3: { // Součást koncová
                                        vecPodrobneLabel = "jres:26257351"; //RC 26257351 : Obsah podrobně
                                        break;
                                    }
                                    case 5: { // Součást
                                        vecPodrobneLabel = "jres:26257351"; //RC 26257351 : Obsah podrobně
                                        break;
                                    }
                                }

                                profilForm
                                    .addRow(vecPodrobneLabel) //RC 26255458 : Věc podrobně
                                    .addField("gstringbox", Gordic.Prefabs.Field.charCounter(componentDto.VecPodrobneMaxLength), {
                                        name: "VecPodrobne",
                                        model: "model.ObsahText=value",
                                        rows: 4,
                                        validators: [new Gordic.Validators.Length({ max: componentDto.VecPodrobneMaxLength, message: "jres:31937028" })], //RC 31937028 : Hodnota v poli je moc dlouhá
                                    });

                                var podanoLabel = "jres:26255493"; //RC 26255493 : Podáno

                                if(isTS || isSoucast || isSpis) {
                                    podanoLabel = "jres:26257386"; //RC 26257386 : Dat. založení
                                } else if(isDil) {
                                    podanoLabel = "jres:26257293"; //RC 26257293 : Dat. otevření
                                }

                                profilForm.addRow(podanoLabel)
                                    .addField("gdatebox", "w-5",
                                        {
                                            name: "DatPodano",
                                            valueType: isDokument ? "datetime" : "date",
                                            disabled: true,
                                            validators: [
                                                new Gordic.Validators.Range({
                                                    max: new Date(new Date().getTime() + 86400000) // přidán validátor na maximální datum dneska + jeden den
                                                })
                                            ],
                                            minValue: Gordic.Ssl.Utils.MinimalDate

                                        });

                                if(isDil) { // jen díly a dokumenty s odlišným obsahem
                                    if(componentDto.StavPis >= 20) {
                                        profilForm
                                            .addText("jres:26257357", "w-3 right js-labelDatEvidovano") //RC 26257357 : Dat. uzavření
                                            .addField("gdatebox", "w-4",
                                                {
                                                    name: "DatUzav",
                                                    disabled: true,
                                                    minValue: Gordic.Ssl.Utils.MinimalDate
                                                });
                                    } else {
                                        profilForm
                                            .addText("jres:26257294", "w-3 right js-labelDatEvidovano") //RC 26257294 : Předp. uzavření
                                            .addField("gdatebox", "w-4",
                                                {
                                                    name: "DatPredpUzav",
                                                    disabled: true,
                                                    minValue: Gordic.Ssl.Utils.MinimalDate
                                                });
                                    }
                                    
                                } else if (!isTS && !isSoucast) {
                                    profilForm
                                        .addText(componentDto.DatEvidovanoLabel, "w-3 right js-labelDatEvidovano")
                                        .addField("gdatebox", "w-4",
                                            {
                                                name: "DatEvidovano",
                                                disabled: true,
                                                minValue: Gordic.Ssl.Utils.MinimalDate
                                            });
                                }


                                var spznRequired = componentDto.ssl_povin_spzn === 2 || (that.EditMode === true && componentDto.ssl_povin_spzn === 1)

                                if(componentDto.gin_n23_vecsk == 1) {

                                    profilForm
                                        .addRow("jres:26257232") //RC 26257232 : Věcná skupina
                                        .addField("gselectbox", Gordic.Prefabs.Select.ginsvsk(), {
                                            name: "VecnaSkupina",
                                            model: "model.IxsVsk=value.ixs_vsk",
                                            disabled: true,
                                            graphicInput: "oninput",
                                            itemTemplate: Gordic.Wfl.GWflCommonDlg.ginsvskItemTemplate({ casObdobiVisible: isSoucast, nezobrazovatTucnyNazev: true }), // mozna doplnit isKoncovaSoucast, ale policko si s tím poradí i tak
                                            itemTooltipTemplate: Gordic.Wfl.GWflCommonDlg.ginsvskItemTooltipTemplate({ casObdobiVisible: isSoucast, nezobrazovatTucnyNazev: true }), // mozna doplnit isKoncovaSoucast, ale policko si s tím poradí i tak

                                            //validators: spznRequired ? [new Gordic.Validators.Required()] : undefined, 
                                            serverFilters: {
                                                JenKoncove: !isTS, 
                                                urceni_spis_z: isSoucast ? [6] : [1, 3]
                                            }

                                        })
                                } else {
                                    var prefabSslsspzOptions = Gordic.Prefabs.Select.sslsspz();

                                    if(spznRequired) {
                                        prefabSslsspzOptions.validators.push(new Gordic.Validators.Required());
                                    } 

                                    profilForm
                                        .addRow("jres:26255820") //RC 26255820 : Spisový znak
                                        .addField("gselectbox", "w-3", Gordic.Prefabs.Select.sslsspl(), { //"w-2"
                                            name: "SpisPl",
                                            model: "model.SpisPl=value.spis_pl",
                                            validators: spznRequired ? [new Gordic.Validators.Required()] : undefined,
                                            /* serverFilters: {
                                                    aktivita: [100]
                                                }*/

                                        })
                                        .addField("gselectbox", "w-9", prefabSslsspzOptions, { //"w-6"
                                            name: "SpisZnak",
                                            graphicInput: "oninput",
                                            itemTemplate: Gordic.Wfl.GWflCommonDlg.sslsspzItemTemplate(),
                                            itemTooltipTemplate: Gordic.Wfl.GWflCommonDlg.sslsspzItemTooltipTemplate(),
                                            model: function (operation, dto, modelOptions) {
                                                switch (operation) {
                                                    case "apply": $(this).gfield("setValue", { spis_pl: dto.SpisPl, spis_znak: dto.SpisZnak }, { valid: false }); return;
                                                    case "collect": dto.SpisZnak = ($(this).gfield("getValue") ? $(this).gfield("getValue").spis_znak : null); return;
                                                    default: return "SpisZnak ";
                                                }
                                            },
                                            //model:"model.SpisPl=value.spis_pl;model.SpisZnak=value.spis_znak",
                                            serverFilters: {
                                                //  aktivita: [100],
                                                spis_pl: new Gordic.Forms.Dependency("SpisPl", "spis_pl") //, true)
                                            },
                                        });
                                }

                                if (componentDto.UsingDilciTermin === true) {
                                    profilForm
                                        .addRow("jres:26255478") //RC 26255478 : Termín
                                        .addField("gdatebox", "w-4",
                                            {
                                                name: "TerminDate",
                                                disabled: true,
                                                minValue: Gordic.Ssl.Utils.MinimalDate
                                            })
                                        .addField("gstringbox", "w-8",
                                            {
                                                name: "TerminDuvod",
                                                disabled: true,

                                                buttons: [
                                                    { requireEdit: false, action: that.actions.actAddDilciTermin },
                                                    { requireEdit: false, action: that.actions.actSplnitDilciTermin }

                                                ]
                                            });
                                }

                                if (componentDto.RezimPodani === 0 && componentDto.gin_n23_vedd === 1) {
                                    profilForm
                                        .addRow({
                                            label: "jres:31937552",//RC 31937552 : Poř. č. ve spisu
                                            hint: "jres:31937549"//RC 31937549 : Pořadové číslo ve spisu
                                        })
                                        .addField("gnumberbox", {
                                            name: "PorCisloVSpisu",
                                            tooltip: "jres:31937550", //RC 31937550 : Pořadové číslo ve spisu
                                            disabled: true,

                                        })
                                        .addRow({
                                            label: "jres:31937553", //RC 31937553 : Poř. č. v období
                                            hint: "jres:31937554", //RC 31937554 : Pořadové číslo dokumentu v rámci určeného časového období
                                        })
                                        .addField("gnumberbox", {
                                            name: "PorCisloObd",
                                            tooltip: "jres:31937554", //RC 31937554 : Pořadové číslo dokumentu v rámci určeného časového období
                                            disabled: true,

                                        });
                                }


                                profilForm.addSection({ label: "jres:31937118", layoutDescriptor: "L-3-9-0, M-3-9-0, S-12-12-0", customClass: "w-L-5 w-M-5 w-S-12" }); //RC 31937118 : Další údaje




                                if (componentDto.RezimPodani === 0) {
                                    profilForm.addRow({ label: "jres:26255342" })
                                        //.addText("", "js-budouciKlicovaSlova"); //RC 26255342 : Klíčová slova
                                        .addField("gkeywordsbar", {
                                            ixp: componentDto.ixp,
                                            parentGcontent: that,
                                            name: "Keywords",
                                            disabled: true,
                                            saveData: "save",
                                            tooltip: "jres:26255342" //RC 26255342 : Klíčová slova
                                        }
                                        );
                                }

                                profilForm
                                    .addRow("jres:26255397") //RC 26255397 : Poznámka
                                    .addField("gstringbox", Gordic.Prefabs.Field.charCounter(
                                        componentDto.Validators && componentDto.Validators.Poznamka && componentDto.Validators.Poznamka[0] && componentDto.Validators.Poznamka[0].max
                                            ? componentDto.Validators.Poznamka[0].max
                                            : undefined
                                    ),
                                        {
                                            name: "Poznamka"
                                        });

                                if (componentDto.RezimPodani === 0 && that.globalSettings.get("Global.Ssl.AppSettings.DetailSettings.ZobrazUzivPozn")) {
                                    profilForm
                                        .addRow({
                                            label: "jres:31937451", //RC 31937451 : Uživatelská poznámka
                                            hint: "jres:31937452" //RC 31937452 : Poslední uživatelská poznámka
                                        }) //RC 26255397 : Poznámka
                                        .addField("gstringbox",
                                            {
                                                name: "UzivPoznamka",
                                                tooltip: "jres:31937453", //RC 31937453 : Poslední uživatelská poznámka
                                                disabled: true,
                                                rows: 2,
                                            });
                                }

                                var jeTypovaEntitaAVypnemeRequiredUPoctu = componentDto.TypSpis > 1;

                                var prefab = Gordic.Wfl.Prefabs.GPocetListu(

                                    $.content("main").wflDBParams, // nejde zatím číst z mainu protože se používá i v hybridu
                                    {
                                        model: "model.PocListu=value",
                                        // defaultValue: (componentDto.PocListu === "" || componentDto.PocListu === null) ? null : 0, // ref T37589
                                        defaultValue: null, // ref T37589
                                    },
                                    {
                                        model: "model.PocStran=value",
                                        // defaultValue: componentDto.PocStran === null ? null : 0, // ref T37589
                                        defaultValue: null, // ref T37589
                                    },
                                    {
                                        model: "model.PocPriloh=value",
                                        change: function (ev, changeObj) {

                                            that.kontrolaPoctuPriloh();
                                        },
                                        // defaultValue: componentDto.PocPriloh === null ? null : 0, // ref T37589
                                        defaultValue: null, // ref T37589
                                    },
                                    {
                                        model: "model.PocListuPriloh=value",
                                        // defaultValue: (componentDto.PocListuPriloh === "" || componentDto.PocListuPriloh === null) ? null : 0, // ref T37589
                                        defaultValue: null, // ref T37589
                                    },
                                    {
                                        model: "model.PocKopii=value",
                                        // defaultValue: componentDto.PocKopii === null ? null : 0, // ref T37589
                                        defaultValue: null, // ref T37589
                                    },
                                    {

                                    },
                                    componentDto.SFyz,
                                    false,
                                    jeTypovaEntitaAVypnemeRequiredUPoctu
                                );

                                profilForm.addPrefab(prefab);

                                if (componentDto.ssl_dok_zprac === 1) {
                                    profilForm
                                        .addRow("jres:26255517") //RC 26255517 : Zpracovatel
                                        .addField("gselectbox",
                                            Gordic.Gin.Fields.ginsfunSSU(
                                                {
                                                    name: "IxsFunResitel",
                                                    model: "model.IxsFunResitel = value.ixs_fun",
                                                    disabled: true,
                                                    serverFilters: {
                                                        aktivita: [100],
                                                    },
                                                }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO)
                                        );
                                    /*
                                         Gordic.Gin.Fields.ginspodSSU(
                                         {
                                             name: "IxsFunAktIxsSU",
                                             model: "model.IxsFunAktIxsSU = value.ixs_su",
                                             disabled: true,
                                             serverFilters: {
                                                 aktivita: [100],
                                             },
                                         }, false))
                                        .addField("gselectbox",//"w-8",
                                            Gordic.Gin.Fields.ginsfunSSU(
                                            {
                                                name: "IxsFunResitel",
                                                disabled: true,
                                                model: "model.IxsFunResitel = value.ixs_fun",
                                                serverFilters: {
                                                    aktivita: [100],
                                                    //DlePovolenychAgend: true,
                                                    ixs_su: new Gordic.Forms.Dependency("IxsFunAktIxsSU", "ixs_su")
                                                },
                                            }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO, "IxsFunAktIxsSU"));
                                            */
                                }

                                //profilForm
                                //    .addRow("jres:31937119") //RC 31937119 : Agendový vlastník
                                //    .addField("gselectbox", Gordic.Prefabs.Select.ginsfun(),
                                //        {
                                //            name: "IxsFunWfl",
                                //            model: "model.IxsFunWfl = value.ixs_fun",
                                //            disabled: true
                                //        });

                                profilForm
                                    .addRow("jres:26255482") //RC 26255482 : Umístění
                                    .addField("gselectbox", Gordic.Prefabs.Select.sslsumi(),
                                        {
                                            name: "Umisteni",
                                            model: "model.Umisteni=value.umisteni",
                                            //itemTemplate: function (value) {
                                            //    if (value && value.umisteni_txt) {
                                            //        return "" + value.umisteni_txt + (value.poznamka ? (" - " + value.poznamka) : "");
                                            //    } else {
                                            //        return null
                                            //    }
                                            //}, 
                                            serverFilters: {
                                                aktivita: [100],
                                                ixs_su: componentDto.IxsSuAkt
                                            },
                                            buttons: [
                                                {
                                                    icon: 'gi-detail',
                                                    requireEdit: false,
                                                    action: that.actions.add(
                                                        new GAction({
                                                            name: 'actDocasneUloziste',
                                                            caption: '',
                                                            //tooltip: "jres:31937099", //RC 31937099 : Zobrazit balík
                                                            icon: 'gi-detail',
                                                            visible: false,
                                                            run: function (ev, ctx) {
                                                                var field = $(ctx.field);
                                                                var opt = {
                                                                    parentContent: that,
                                                                    opt: {
                                                                        Ixp: componentDto.ixp,
                                                                        AktUmisteni: undefined
                                                                    },
                                                                    ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow
                                                                };
                                                                Gordic.Wfl.Dialogs.DocasneUlozisteDlg(opt).done(function (retVal) {
                                                                    if (retVal && retVal.DosloKeZmene) {
                                                                        that.reloadDetail();
                                                                    }
                                                                });
                                                            }
                                                        }
                                                        ))
                                                }]
                                        });

                                if(!isTS && !isSoucast && !isDil) {
                                    profilForm
                                        .addRow("jres:26255513") //RC 26255513 : Stav
                                        .addText(componentDto.VyrizenoLabel, "w-6")
                                        .addField("gdatebox", "w-6",
                                            {
                                                name: "DatVyrizeno",
                                                disabled: true,
                                                minValue: Gordic.Ssl.Utils.MinimalDate
                                            });
                                }

                                var buttons = [
                                    {
                                        icon: 'gi-detail',
                                        requireEdit: false,
                                        action: that.actions.add(new GAction(Gordic.Spi.PreActions.OtevriDetailBaliku({
                                            inputData: {
                                                parentContent: that,
                                                opt: {
                                                    IxsZup: componentDto.IxsZup
                                                }
                                            },
                                            actionParams: {
                                                name: 'actBalik',
                                                caption: '',
                                                tooltip: "jres:31937099", //RC 31937099 : Zobrazit balík
                                                icon: 'fa-archive '
                                            }
                                        })))
                                    }];
                                if (componentDto.FieldUlozDatumVisible) {
                                    profilForm.addRow(componentDto.FieldUlozLabel)
                                    profilForm
                                        .addField("gdatebox",
                                            {
                                                name: "FieldUlozDatum",
                                                valueType: "datetime",
                                                disabled: true,
                                                buttons: componentDto.TlacitkoBalikVisible ? buttons : undefined,
                                                minValue: Gordic.Ssl.Utils.MinimalDate
                                            });
                                }
                                if (componentDto.FieldUlozVisible) {
                                    profilForm.addRow(componentDto.FieldUlozLabel)
                                    profilForm
                                        .addField("gstringbox",
                                            {
                                                name: "FieldUloz",
                                                disabled: true,
                                                buttons: componentDto.TlacitkoBalikVisible ? buttons : undefined,
                                                minValue: Gordic.Ssl.Utils.MinimalDate
                                            });
                                }
                                if (componentDto.IdExtArch) {
                                    profilForm.addRow("jres:31937483")   //RC 31937483 : Id archivu
                                        .addField("gstringbox", {
                                            name: "IdExtArch",
                                            disabled: true,
                                        })
                                }

                                if (componentDto.DatPrMocVisible) {
                                    profilForm
                                        .addRow("jres:26256668")  //RC 26256668 : Nabytí právní moci
                                        .addField("gdatebox",
                                            {
                                                name: "DatPrMoc",
                                                valueType: "datetime",
                                                disabled: true,
                                                minValue: Gordic.Ssl.Utils.MinimalDate
                                            });
                                }
                                if (componentDto.DatVykonavVisible) {
                                    profilForm
                                        .addRow("jres:31937462")  //RC 31937462 : Vykonavatelnost
                                        .addField("gdatebox",
                                            {
                                                name: "DatVykonav",
                                                valueType: "datetime",
                                                disabled: true,
                                                minValue: Gordic.Ssl.Utils.MinimalDate
                                            });
                                }

                                if (isDil) {
                                    profilForm
                                        .addRow('jres:32170475') //RC 32170475 : Datum zničení
                                        .addField('gdatebox', {
                                            name: 'DatDel',
                                            valueType: 'datetime',
                                            disabled: true
                                        })
                                        ;
                                }

                                if (componentDto.IsSSLVyrizeni) {

                                    profilForm.addSection({ label: "jres:26255161", layoutDescriptor: "L-2-10-0, M-3-9-0, S-12-12-0", customClass: "w-L-7 w-M-7 w-S-12" }); //RC 26255161 : Vyřízení

                                    profilForm
                                        .addRow("jres:26255561") //RC 26255561 : Termín vyřízení
                                        .addField("gdatebox", {
                                            name: "DatVyrDo",
                                            disabled: true,
                                            minValue: Gordic.Ssl.Utils.MinimalDate
                                        })

                                        .addRow("jres:26255431") //RC 26255431 : Způsob vyřízení
                                        .addField("gstringbox", {
                                            name: "ZpusobVyrizeni",
                                            disabled: true
                                        })

                                        .addRow("jres:26255503") //RC 26255503 : Iniciační dok.
                                        .addField("gstringbox", {
                                            name: "InicDok",
                                            buttons: [
                                                { icon: 'gi-detail', action: that.actions.actShowInicDokument, requireEdit: false }
                                            ],
                                            disabled: true
                                        })
                                        .addRow("jres:26255504") //RC 26255504 : Vyřizující dok.
                                        .addField("gstringbox", {
                                            name: "VyrizDok",
                                            buttons: [
                                                { icon: 'gi-detail', action: that.actions.actShowVyrizDokument, requireEdit: false }
                                            ],
                                            disabled: true
                                        })
                                        //.addRow("jres:31937124") //RC 31937124 : Schválil
                                        //.addField("gselectbox", Gordic.Prefabs.Select.ginsfun(),
                                        //    {
                                        //        name: "Schvalovatel",
                                        //        model: "model.Schvalovatel = value.ixs_fun",
                                        //        disabled: true
                                        //    })





                                        ////.addRow("jres:26255517") //RC 26255517 : Zpracovatel
                                        //.addField("gselectbox", "w-8", Gordic.Prefabs.Select.ginsfun(),
                                        //    {
                                        //        name: "Zpracovatel",
                                        //        model: "model.Zpracovatel = value.ixs_fun",
                                        //        disabled: true
                                        //    })

                                        .addRow({ label: "jres:31937126", hint: "jres:31937126" }) //RC 31937126 : Datum uzavření, uzavřel
                                        .addField("gdatebox", "w-4",
                                            {
                                                name: "DatUzav",
                                                disabled: true,
                                                minValue: Gordic.Ssl.Utils.MinimalDate
                                            })

                                        .addField("gselectbox", "w-8",

                                            Gordic.Gin.Fields.ginsfunSSU(
                                                {
                                                    name: "IxsFunUzavrel",
                                                    model: "model.IxsFunUzavrel = value.ixs_fun",
                                                    disabled: true,
                                                    serverFilters: {
                                                        aktivita: [100],
                                                    },
                                                }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO)

                                        )
                                        .addRow("jres:26255507") //RC 26255507 : Komentář
                                        .addField("gstringbox", {
                                            name: "Komentar",
                                            rows: 2,
                                            disabled: true
                                        })
                                        ;
                                    //.addRow("jres:26255660") //RC 26255660 : Datum vyřízení
                                    //.addField("gdatebox", {
                                    //    name: "DatVyr",
                                    //    disabled: true
                                    //})
                                    if (componentDto.UlozenoNlPrilohAUlozenoListuDokVisible) {
                                        profilForm
                                            .addRow({ label: "jres:31937416" }) //RC 31937416 : Uloženo listů
                                            .addField("gnumberbox", {
                                                name: "UlozenoListuDok",
                                                disabled: true,

                                            });
                                        profilForm
                                            .addRow({ label: "jres:31937417", hint: "jres:31937417" }) //RC 31937417 : Uloženo nelistinných příloh
                                            .addField("gstringbox", {
                                                name: "UlozenoNlPriloh",
                                                disabled: true
                                            });
                                    }

                                }

                                if(componentDto.IsSSLVyrizeni) {

                                    profilForm.addSection({label:"jres:31937081", layoutDescriptor: "L-3-9-0, M-3-9-0, S-12-12-0", customClass: "w-L-5 w-M-5 w-S-12" }); //RC 31937081 : Skartace

                                    if(componentDto.gin_n23_vecsk > 0) {
                                        profilForm
                                            .addRow({ label: "jres:26257353", hint: "jres:26257353" }) //RC 26257353 : Skartační režim
                                            .addField("gselectbox", Gordic.Prefabs.Select.ginsskr(), {
                                                name: "SkartRezim",
                                                placeholder: 'jres:26257354', //RC 26257354 : Sk. režim
                                                model: "model.IxsSkr=value.ixs_skr",
                                                disabled: true
                                            });
                                    } else {
                                        profilForm
                                            .addRow({ label: "jres:31937162", hint: "jres:31937162" }) //RC 31937162 : Skartační znak, lhůta
                                            .addField("gselectbox", "w-6", Gordic.Prefabs.Select.sslcskz(), { //"w-2"
                                                name: "SkartZnak",
                                                placeholder: 'jres:31937146', //RC 31937146 : Sk. znak
                                                model: "model.SkartZnak=value.skar_znak",
                                                disabled: true
                                            })
                                            // .addRow("jres:32000028") //RC 32000028 : Skartační lhůta //"w-2"
                                            .addField("gnumberbox", "w-6", {
                                                name: "SkartLhuta",
                                                placeholder: 'jres:31937147', //RC 31937147 : Sk. lhůta
                                                disabled: true,
                                                emptyValue: null
                                            });
                                    }

                                    profilForm
                                        .addRow({ label: "jres:32000031", hint: "jres:32000031" }) //RC 32000031 : Rok spouštěcí události
                                        .addField("gnumberbox", {
                                            name: "RokSpUdal",
                                            disabled: true,
                                            emptyValue: null
                                        })
                                        .addRow({
                                            label: "jres:31937535", //RC 31937535 : Rok kontroly spouštěcí události
                                            hint: "jres:31937534" //RC 31937534 : Rok kontroly spouštěcí události
                                        }) //RC 32000031 : Rok spouštěcí události
                                        .addField("gnumberbox", {
                                            name: "RokKonSpu",
                                            disabled: true,
                                            emptyValue: null
                                        });

                                    if(componentDto.IsSkartaceMet2023) {
                                        profilForm
                                            .addRow({
                                                label: "jres:31937082",//RC 31937082 : Popis spoušť. u.
                                                hint: "jres:31937403" //RC 31937403 : Popis spouštěcí události.
                                            })
                                            .addField("gstringbox", {
                                                name: "PopisSpousteciUdalosti",
                                                disabled: true
                                            });
                                    }

                                    if(componentDto.gin_n23_vecsk == 0) {
                                        profilForm
                                            .addRow({ label: "jres:32000030", hint: "jres:32000030" }) //RC 32000030 : Popis spouštěcí události
                                            .addField("gstringbox", {
                                                name: "PopisSpousteciUdalosti",
                                                disabled: true
                                            });
                                    }

                                    if (componentDto.IxpTssVisible) {
                                        profilForm
                                            .addRow({ label: "jres:31937571"})  //RC 31937571 : PID TSS
                                            .addField("gstringbox", {
                                                name: "IxpTss",
                                                disabled: true
                                            });
                                    }



                                    profilForm
                                        .addRow({ label: "jres:31937402", hint: "jres:31937402" }) //RC 31937402 : Pozastavení skartační operace do roku

                                        .addField("gcheck", "w-4", {
                                            name: "PrizPozSkar",
                                            disabled: true,
                                            modelValueTransform: {
                                                apply: function (modelValue) { return modelValue === 1; },
                                                collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                                            }
                                        })
                                        .addField("gnumberbox", "w-8", {
                                            name: "RokDoPozSkar",
                                            disabled: true,
                                        })

                                        .addRow({ label: "jres:31937122", hint: "jres:31937122" }) //RC 31937122 : Důvod pozastavení skartační operace
                                        .addField("gstringbox", {
                                            name: "DuvodPozSkar",
                                            disabled: true
                                        })
                                        .addRow({ label: "jres:26257362", hint: "jres:26257363" })  //RC 26257363 : Rok skartačního řízení / Rok vyřazení
                                        .addField("gnumberbox", { // "w-4",
                                            name: "SkartRizeni",
                                            disabled: true,
                                            emptyValue: null,
                                            customClass: " bold",
                                        });

                                    if (componentDto.PrizKonfliktSka) {
                                        profilForm
                                            .addRow()
                                            .addText("jres:31937546", //RC 31937546 : Nevypořádaný konflikt skartační události
                                                " g-state-text" // g-state-important
                                            );
                                    }

                                        /*
                                        .addText(componentDto.SkartaceArchivaceLabel, "w-4 right") 
                                        .addField("gdatebox", "w-4", {
                                            name: "DatSkartace",
                                            valueType: "datetime",
                                            disabled: true
                                        })
                                        */

                                        ;

                                }
                              
                                $.newDiv()
                                    .appendTo(tab)
                                    .gform("createFrom", profilForm);
                                //#endregion

                            
                            }
                        }
                    },

                    actions: { //může být zadáno jako pole nebo jako objekt
                        
                        actSplnitDilciTermin: {
                            caption: null,
                            icon: "gi-tick g-state-text " + (componentDto.StavTermin === 10 ? "g-state-success " : "g-state-info"),
                            tooltip: (componentDto.StavTermin === 10 ? "Splněn" : "jres:26256503")
                                + ((componentDto.EditMode === true) ? " (jres:31937279)" : ""), //RC 31937279 : akci nelze provést při otevřené editaci dokumentu
                            //customclass: "g-state-text " + (componentDto.StavTermin === 10 ? "g-state-success " : "g-state-info") ,
                            enabled:  componentDto.SplnitTerminEnabled,
                            visible: componentDto.SplnitTerminVisible,
                            run: function () {
                                
                                $.content(this).splnitDilciTermin();
                            }
                        },
                        actAddDilciTermin: {
                            caption: "jres:26255478", //RC 26255478 : Termín
                            enabled: componentDto.AddTerminEnabled,
                            tooltip: "jres:26255478" //RC 26255478 : Termín
                                + ((componentDto.EditMode === true) ? " (jres:31937280)" : ""), //RC 31937280 : akci nelze provést při otevřené editaci dokumentu
                            run: function (event, actionContext) {
                                
                                $.content(this).addDilciTermin();
                            }
                        },

                           // ##################### !!!!!!! Vyřízení !!!!!!!!!!!!!!!! #####################

                        actShowInicDokument: {
                            tooltip: "jres:31937078",  //RC 31937078 : Zobrazit iniciační dok.
                            enabled: componentDto.InicDokEnable,
                            visible: componentDto.InicDokEnable,
                            run: function () {
                                $.content(this).showInicVyrizDokument(0);
                            }
                        },
                        actShowVyrizDokument: {
                            tooltip: "jres:31937079", //RC 31937079 : Zobrazit vyřizujíci dok.
                            enabled: componentDto.VyrizDokEnable, 
                            visible: componentDto.VyrizDokEnable,
                            run: function () {
                                $.content(this).showInicVyrizDokument(1);
                            }
                        },
                        /*,
                   
                        actRemoveVyrizDok: {
                            caption: "jres:26255269", //RC 26255269 : Odebrat vyřiz.
                            run: function () {
                                $.content(this).removeVyrizDok();
                            }
                        },
                        actVyriditDok: {
                            caption: "jres:26255323", //RC 26255323 : Vyřídit ČJ
                            run: function () {
                                var content = $.content(this);
                                if (componentDto.LzeVyriditDokumentSOhledemNaEpkDotaz) {
                                    this.dialogs.confirm("jres:31937143").on("closed", function (ev, retVal) { //RC 31937143 : Existuje nevyřízená žádost v EPK, přejete si pokračovat?
                                        if (retVal) {
                                            if (retVal === "yes") {
                                                content.vyridit("Vyridit");
                                            }
                                        }
                                    });
                                } else {
                                    content.vyridit("Vyridit");
                                }
                            }
                        },
                         */
                        actSSLPodrobnostiDokumentu: {
                            caption: "jres:26256222", //RC 26256222 : Podrobnosti
                            visible: false,
                            run: function () {
                                $.content(this).sslPodrobnostiDokumentu();
                            }
                        }
                       
                    },
                    menuBar: [
                        { action: "actSSLPodrobnostiDokumentu" }
                    //    {
                    //        id: "menuWflPraceSCJ", parent: "menuWflCinnosti", before: "menuWflCinnostiOdeslani", type: "static", caption: "jres:31937174", //RC 31937174 : Práce s ČJ
                    //        children: [
                    //            { action: "actAddVyrizDok" },
                    //            { action: "actRemoveVyrizDok" },
                    //            { action: "actVyriditDok"},
                    //            { action: "actSSLPodrobnostiDokumentu"}
                    //        ]
                    //    }
                    ]
                 
                    
                };

                return result;
            }

        //#region zmeny Dsebesta
        // ixsTyp přsunut do hlavičky
        // StUtajIdWfl přesunut do hlavičky
        //#endregion
        }
    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\DetailBuilderComponents\GSslProfilSpisComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslProfilSpis: {

            create: function (content, componentDto) {

                //#region asdasd
                var getTabGroupsProProfil = function () {
                    var ret = Gordic.Prefabs.TabGroups.Spis();

                    if (componentDto.IsTypovySpis) {
                        ret.caption = "jres:31937183"; //RC 31937183 : Typový spis
                    } else if (componentDto.IsSoucast) {
                        ret.caption = "jres:31937184"; //RC 31937184 : Součást
                    } else if (componentDto.IsDil) {
                        ret.caption = "jres:31937185"; //RC 31937185 : Díl
                    }
                    return ret;
                };

                //#endregion

                var result = {
                    onMenuBuild: [
                        function (builder, menus) {
                            this.enableProfilActions();
                        }
                    ],
                    onbuild: [
                        function () {
                            this.isSimpleModeProfil();
                            this.nasetujProfil(this.SslProfilSpis_Dto);
                            this.enableProfil(); // enable profilu
                        
                            //Z vyrizenis 
                            //this.enableSslDetailVyrizeniSpis();
                            this.nasetujVyrizeniSpis(this.SslProfilSpis_Dto);
                        }
                    ],
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                        saveSslProfilSpis: function () {
                            var that = this;
                            var promis = $.Deferred();
                            
                            var profilModel = {
                                IsSslProfil: true
                            };
                            var profilForm = this.findForms("formWflSpis");
                            profilForm.findFields().gfield("model", "collect", profilModel);

                            var ulozenoListuField = this.findFields("UlozenoListu");
                            if (profilForm.gform("hasChanged") || (Gordic.Utils.WidgetExists("gfield", ulozenoListuField) && ulozenoListuField.gfield('hasChanged'))) { //
                                profilModel.MetadataChanged = true;
                            }

                            var odesilatel = this.findFields("Odesilatel");
                            if (odesilatel.length > 0) {
                                var valueOdesilatel = odesilatel.gfield("getValue");
                                if (valueOdesilatel) {
                                    profilModel.IxsEsu_zast_txt = valueOdesilatel.zast_txt;
                                }
                            }

                            var schvalovatel = this.findFields("IxsFunSchval").gfield("getValue");
                            if (schvalovatel) {
                                profilModel.IxsFunSchvalIxsSU = schvalovatel.ixs_su;
                            }

                            if (Gordic.Utils.WidgetExists("gfield", ulozenoListuField)) {
                                var ulozenoListu = ulozenoListuField.gfield("getValue");
                                if (ulozenoListu != null) {
                                    profilModel.UlozenoListu = ulozenoListu;
                                }
                            }

                            //if (profilModel.StUtajIdWfl === 40 && profilModel.StUtajIdWfl != componentDto.StUtajIdWfl) {
                            //    that.dialogs.confirm("Řízený přístup", "jres:26256449").on("closed", function (ev, retValConfirm) {
                            //        //RC 26256449 : Přejete si nastavit řízený přístup i u vložených dokumentů?
                            //        if (retValConfirm === "yes") {
                            //            profilModel.NastavitRPVlozDokHidden = "1";
                            //            that.saveSslProfilSpis_step2(promis,profilModel);
                            //        }
                            //    });
                            //} else {
                                that.saveSslProfilSpis_step2(promis, profilModel);
                            //}

                            //this.findFields("Keywords").gkeywordsbar("save"); // uložení klírovích slov PŘESUNUTO do spis.js

                            return promis;
                        },
                        saveSslProfilSpis_step2: function (promis, profilModel) {

                            //var retVal = {};
                            //this.findForms("formWflSpis").findFields("DatVyrizDo").gfield("model", "collect", retVal);
                            var ZmTerVyrRealized = this.zmenaTerVyrizeni(this.findForms("formWflSpis").findFields("DatVyrizDo"), componentDto.DatVyrizDo, componentDto.LhutaTypDok);
                            if (ZmTerVyrRealized && componentDto.ssl_zmeterspidu === 1) {
                                var that = this;

                                var options = {
                                    winTitle: "jres:26255153"
                                };
                                var $div = Gordic.Ssl.Dialogs.AddDuvodDlg(that, options, Gordic.Global.Enums.ModOtevreni.showModalWindow); //RC 26255153 : Důvod změny termínu

                                

                                $div.on("closed", function (ev, retValDuvod) {
                                    if (retValDuvod) {
                                        profilModel.MetadataChanged = true;
                                        that.DuvodZmenyTerminuHidden = retValDuvod.duvod;

                                        profilModel.DuvodZmenyTerminuHidden = retValDuvod.duvod;

                                        promis.resolve(profilModel);
                                    } else {
                                        promis.reject();
                                    }
                                });
                            } else {
                                promis.resolve(profilModel);
                            }

                        },
                        nasetujProfil: function (dto) {
                            
                            var form = this.findForms("formWflSpis");
                            
                            var fields = form.findFields();

                            fields.gfield("model", "apply", dto);
                            fields.gfield("model", "validators", dto.Validators);
                            this.zkusNasetovatOdesilatele(dto);

                            Utils.Form.markRequired(fields);

                            form.gform("waitForValues").done(function () {
                                if (Gordic.Utils.WidgetExists("gfield", fields)) {
                                    fields.gfield("confirm");
                                }
                            });
                            this.nastavPosledniUzivatelskouPoznamu();
                        },

                        zmenaPoznamkyVUzivatelskychPoznamkach: function (param, data) { //param: "create" | "update" | "delete" | "changeColor", data: IGNoteDto | null
                            this.nastavPosledniUzivatelskouPoznamu();
                        },
                        nastavPosledniUzivatelskouPoznamu: function () {
                            var that = this;
                            if (this.globalSettings.get("Global.Ssl.AppSettings.DetailSettings.ZobrazUzivPozn")) {
                                var uzivPoznamkaField = this.findFields("UzivPoznamka");
                                uzivPoznamkaField.gfield("clear");
                                if (!this.closed) { 
                                    this.createServiceContent({ className: "Gordic.Wfl.WebClient,Gordic.Wfl.WebClient.GWfldpozContent", serverParams: { Ixp: componentDto.ixp } }).call("ReadLastOne")
                                        .then(function (res) {
                                            if (res && res.text) {
                                                var newText = res.text.replace(/(?:<br>)/g, ' \r\n');
                                                if (!Gordic.Utils.WidgetExists("gfield", uzivPoznamkaField)) {
                                                    return;
                                                }
                                                uzivPoznamkaField.gfield("setValue", newText);
                                            }

                                        });
                                }
                            }
                        },

                        zkusNasetovatOdesilatele: function (dto) {
                            if (dto.SPrij === 1) {
                                var field = this.findFields("Odesilatel");
                                field.gfield("model", "apply", dto, { setFlags: { uvodniNastaveni: true } });
                                field.gfield("confirm");
                            } else {
                                if (dto.MistoVzniku) {
                                    var mistoVznikuField = this.findFields("MistoVzniku");
                                    mistoVznikuField.gfield("setValue", dto.MistoVzniku);
                                    mistoVznikuField.gfield("confirm");
                                }
                            }

                        },
                        enableProfil: function () {
                            this.enableProfilBase();
                            if (this.ReadOnlyEko) {
                                this.enableReadOnlyEkoProfil();
                            }
                            if (this.ReadOnlySSL) {
                                this.enableReadOnlySslProfil();
                            }
                            if (componentDto.IsTypovySpis || componentDto.IsSoucast || componentDto.IsDil) {
                                this.enableTypSoucastDil();
                            }
                            
                        },
                        enableProfilActions: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true) {
                                l_bActionEnabled = false;
                            }
                            this.actions.actSSLPodrobnostiSpisu.update({ enabled: l_bActionEnabled });

                            if (this.SimpleMode) {
                                this.actions.actSSLPodrobnostiSpisu.update({ visible: true });
                            }
                        },
                        enableProfilBase: function () {
                           // this.findFields("DatPodano").gfield("option", "disabled", componentDto.BaseEnabledDto.DatPodanoRO);
                            var l_bActionEnabled = true;
                            if (this.EditMode === true) {
                                l_bActionEnabled = false;
                            }
                           
                           
                            var disabledKeyWords = !(l_bActionEnabled === false && componentDto.LzeKlicovaSlova);
                            var keyWordsField = this.findFields("Keywords");
                            keyWordsField.gfield("option", "disabled", disabledKeyWords); // natvrdo KeyWord   měl jsem Keywords
                            if (disabledKeyWords) {
                                Gordic.Ssl.WebClient.GDetailUtils.UpravKeywordsProOtevreniDialogu(this, keyWordsField, componentDto.LzeKlicovaSlova);
                            }
                            
                            var stavNeuzavreno = (componentDto.StavPis == 0 || componentDto.StavPis == 10);
                            var readOnlySslProfil = !stavNeuzavreno;
                            ; if (componentDto.EditMode && componentDto.LzeEditacniRezimPovolit) {

                                /*if (componentDto.JePovolenaPraceVAgendeAVlastnikAStavMaxUzavreno) {
                                    this.findFields("VecPodrobne").gfield("option", "disabled", false);
                                }*/

                                this.findFields("VecPodrobne").gfield("option", "disabled", !componentDto.LzeEditovatVecPodrobne);
                                this.findFields("Poznamka").gfield("option", "disabled", false);
                                this.findFields("SpisZnak").gfield("option", "disabled", false);
                                this.findFields("SpisPl").gfield("option", "disabled", false);
                                this.findFields("VecnaSkupina").gfield("option", "disabled", false);
                                this.findFields("Umisteni").gfield("option", "disabled", !componentDto.LzeEditovatUmisteni);

                                if (componentDto.LzeEditovatTerminSpisuJenKontrolaParam) {
                                    this.findFields("DatVyrizDo").gfield("option", "disabled", readOnlySslProfil);
                                }

                                this.findFields("IxsFunSchval").gfield("option", "disabled", readOnlySslProfil);
                                this.findFields("IxsFunResitel").gfield("option", "disabled", readOnlySslProfil);

                                //this.findFields("Keywords").gfield("option", "disabled", false);

                                //this.findFields("IxsFunResitel").gfield("option", "disabled", false);

                                //if (componentDto.LzeEditovatTypSpisu) {
                                
                                //    this.findFields("IxsTyp").gfield("option", "disabled", false);
                                //}
                                    
                                //var aPristup = this.findFields("IxsTyp"); // přístup
                                //if (aPristup) {

                                //    for (i = 0; i < PristupDropDownList.options.length; i++) {
                                //        if (PristupDropDownList.options[i].value == aPristup) {
                                //            PristupDropDownList.options[i].selected = true;
                                //        }
                                //    }
                                //}
                              

                                //if (componentDto.LzeEditovatPristup) {
                                //    this.findFields("StUtajIdWfl").gfield("option", "disabled", false);
                                //}
                                //if (!m_oTypPis.ReadOnly) {
                                //    m_oTypPis.OnChangeClientFunction = "function() { $.content(this).NastavPristup(); }";
                                //}

                                this.findFields("UlozenoListu").gfield("option", "disabled", !componentDto.LzeEditovatUlozenoListu);
                            }
                        },
                        enableReadOnlyEkoProfil: function () {
                          
                            //tbEsu.ReadOnly = readOnlyEkoProfil;
                            this.findFields("Odesilatel,MistoVzniku").gfield("option", "disabled", true);
                            //tbTypDok.ReadOnly = readOnlyEkoProfil;
                            this.findFields("IxsTyp").gfield("option", "disabled", true);
                            //cbPristup.ReadOnly = readOnlySslProfil || irpBezMoznostiPrepnuti || readOnlyEkoProfil || !DocInfo.LzeEditovatPristup;
                            //this.findFields("StUtajIdWfl").gfield("option", "disabled", true); // dsebesta 24.06.2021 odstraněno přesunuto do componenty hlavicky

                        },
                        enableReadOnlySslProfil: function () {
       
                            //tbVecPodrobne.ReadOnly = readOnlySslProfil;
                            this.findFields("VecPodrobne").gfield("option", "disabled", true);
                            //tbPoznamka.ReadOnly = readOnlySslProfil;// = readOnlyEkoProfil || DocInfo.SSl == 0;
                            this.findFields("Poznamka").gfield("option", "disabled", true);
                            //bPristup.ReadOnly = readOnlySslProfil || irpBezMoznostiPrepnuti || readOnlyEkoProfil || !DocInfo.LzeEditovatPristup;
                            //this.findFields("StUtajIdWfl").gfield("option", "disabled", true); // dsebesta 24.06.2021 odstraněno přesunuto do componenty hlavicky
                            this.findFields("IxsFunResitel").gfield("option", "disabled", true);
                            
                        },    
                        enableTypSoucastDil: function () {

                            var l_bActionEnabled = true;
                            if (this.EditMode === true) {
                                l_bActionEnabled = false;
                            }
                            this.findFields("SpisZnak").gfield("option", "disabled", true);
                            //gSpisControl.TbDataSpisZnak.PoleSkartZnak.Visible = false;
                            //gSpisControl.TbDataSpisZnak.Visible = true;    
                            //this.findFields("StUtajIdWfl").gfield("option", "disabled", true); // dsebesta 24.06.2021 odstraněno přesunuto do componenty hlavicky
                            this.findFields("DatVyrizDo").gfield("option", "disabled", true);
                            
                            this.findFields("IxsFunSchval").gformrow().hide();
                          

                            if (componentDto.IsTypovySpis) {
                                this.findFields("Odesilatel").gformrow().hide();
                                this.findFields("MistoVzniku").gformrow().hide();

                               
                                this.findFields("DatVyrizDo").gformrow().hide();
                                this.findFields("IxsFunResitel").gformrow().hide();
                                this.findFields("IxsTyp").gformrow().hide();
                                this.findFields("IxsTyp").gfield("option", "disabled", true);

                                this.findFields("PocetVlozenychDok").gformrow("setLabel", "jres:31937179"); //RC 31937179 : Počet součástí
                            } else if (componentDto.IsSoucast) {

                                this.findFields("DatVyrizDo").gformrow().hide();
                                this.findFields("IxsFunResitel").gformrow().hide();
                                this.findFields("IxsTyp").gformrow().hide();
                                this.findFields("IxsTyp").gfield("option", "disabled", true);

                                this.findFields("PocetVlozenychDok").gformrow("setLabel", "jres:31937198"); //RC 31937198 : Počet dílů
                            } else if (componentDto.IsDil) {
                                ;
                            }

                        },

                        isSimpleModeProfil: function () {
                            if (this.SimpleMode) {
                                this.findFields("Umisteni").gformrow().hide();
                                //this.findFields("StUtajIdWfl").gformrow().hide();
                                this.findFields("PriorovanoKam").gformrow().hide();
                                this.findFields("IxsFunResitel").gformrow().hide(); // Pozor nyni je políčko v hlavičce
                                this.findFields("IxsFunSchval").gformrow().hide(); // Pozor nyni je políčko v hlavičce
                                //schvalovatel myslím že byl vykopanej na žádost Vojty
                                
                                

                                this.findFields("TerminDate").gformrow().hide();
                                //this.findFields("DatVyrDo").gformrow().hide(); // dodělat jen pro SSD ale s Radek říkal nedávat, Tak nedávat
                                
                              
                                this.findFields("DatEvidovano").gformrow().hide();

                                var visible = this.isSetPodrobnostiSSD ? true : false;
                                this.showhideSSDPodrobnosti(visible);

                            }
                        },

                        showhideSSDPodrobnosti: function (visible) {
                            // po domluvě rtomes,aprasil,pjurik se v SSD zobrazuje pole Vlastnik vždy ref T38168

                            if (visible) {
                                this.findFields("SpisZnak").gformrow().show();
                              //  this.findFields("IxsFunAkt").gformrow().show(); 
                                this.findFields("Umisteni").gformrow().show();
                            } else {

                                //if (UserProcess.Configuration.GetParameter("ssd_det_spznak", 1) == 0) { // TODO
                                //    componentDto.SSDSpisZnakVisible = false; // už nachystano
                                //}

                                if (!componentDto.SSDSpisZnakVisible) {
                                  //  this.findFields("SpisZnak").gformrow().hide(); //u spisu není proto koment
                                }

                             //   if (!componentDto.SSDVlastnikVisible) {
                             //       this.findFields("IxsFunAkt").gformrow().hide(); //vlastnik
                             //   }//end if
                            }
                        },

                       



                        //#region Z vyrizeni

                        nasetujVyrizeniSpis: function (dto) {
                            var form = this.findForms("formSslVyrizeniSpis"); 
                            var fields = form.findFields();
                            fields.gfield("model", "apply", dto);
                            fields.gfield("model", "validators", dto.Validators);
                            if (fields.length > 0) { 
                                Utils.Form.markRequired(fields);
                            }
                        },

                        sslVyriditSpis_VyriditSpis: function () {
                            this.sslSpisVyridit();      // ssldetailspisucomponent -> sslDetailComponent
                        },

                        sslVyriditSpis_Ulozit: function () {
                            this.SSLUlozitSpis();           // ssldetailspisucomponent
                        },

                        sslVyriditSpis_NabytPravniMoc: function () {
                            this.nabytPravniMoc();               // ssldetailspisucomponent
                        },
                        sslVyriditSpis_ZmenaLhuty: function () {
                            this.zmenaLhuty();              // ssldetailspisucomponent
                        },

                        sslPodrobnostiSpisu: function () {
                            var that = this;
                            var options = {
                                Ixp: componentDto.ixp,
                            };
                            var $div = Gordic.Ssl.Dialogs.PodrobnostiSpisuDlg(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow);

                            $div.on("closed", function (ev, retVal) {
                                if (retVal) {
                                    that.tryReloadDetail(undefined, {
                                        flashMessage: "jres:31937172", //RC 31937172 : V podrobnostech spisu došlo ke změně.
                                        flashMessageClass: "g-state-success",
                                    });
                                }
                            });

                        },
                        otevriDetailBaliku: function (IxsZup) {
                            
                            var opt = {
                                IxsZup: IxsZup
                            };
                            Gordic.Spi.Dialogs.GDetailBalikuDlg(this, opt, Gordic.Global.Enums.ModOtevreni.navigate);
                        },
                        kontrolaESUVRegistrech: function () {
                            var that = this;
                            var usSetting = this.globalSettings.get("Global.Ssl.AppSettings.DetailSettings.OveritOdesilateleVSZR")
                            if (usSetting == undefined) { usSetting = true; }
                            var gin_esu_n23ao = $.content("main").wflDBParams.gin_esu_n23ao;
                            if (gin_esu_n23ao > 0
                                && componentDto.SPrij === 1
                                && (gin_esu_n23ao == 1 || (gin_esu_n23ao == 2 && usSetting))
                                && this.EditMode
                            ) {
                                var dtoOdesilatel = {};
                                var fieldSubjekt = this.findFields("Odesilatel");

                                fieldSubjekt.gfield("model", "collect", dtoOdesilatel);
                                if (dtoOdesilatel.IxsEsu != null
                                    && dtoOdesilatel.IxsEsu != this.IxsEsuOdesilatelePoKontrole
                                ) {
                                    this.beginOperation("jres:31937530") //RC 31937530 : Probíhá ověření ESU v egistrech
                                    var fieldSubjektValue = fieldSubjekt.gfield("getValue");

                                    var opt = {
                                        ZpusDor: 0,
                                        IxsEsuOdesilatele: dtoOdesilatel.IxsEsu,
                                        ESUStupenVer: fieldSubjektValue.stupen_ver,
                                        ESUIdDs: fieldSubjektValue.id_ds
                                    };
                                    Gordic.Wfl.Utils.KontrolaESUVRegistrech(this, opt)
                                        .then(function (retVal) {
                                            if (retVal) {
                                                if (retVal.NewIxsEsuOdesilatele != null) {
                                                    that.IxsEsuOdesilatelePoKontrole = retVal.NewIxsEsuOdesilatele;
                                                    dtoOdesilatel.IxsEsu = retVal.NewIxsEsuOdesilatele;
                                                    fieldSubjekt.gfield("model", "apply", dtoOdesilatel);
                                                    that.notification("add", { icon: "gi-info", content: "jres:31937531", state: "success" }); //RC 31937531 : Na základě ověření ESU v regisrech bylo ESU aktualizováno
                                                } else {
                                                    that.IxsEsuOdesilatelePoKontrole = retVal.IxsEsuOdesilatele;
                                                }
                                                if (retVal.OtevritDetailEsu) {
                                                    var vyberESUDetBut = fieldSubjekt.gfield("getButton", "actDetail");
                                                    if (vyberESUDetBut != null && vyberESUDetBut.length > 0) {
                                                        vyberESUDetBut.click();
                                                    }
                                                }
                                            }
                                        })
                                        .fail(function (msg) {

                                        })
                                        .always(function (msg) {
                                            that.endOperation();
                                        })
                                        ;

                                }
                            }
                        }
                        
                       /*
                        enableSslDetailVyrizeniSpis: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true) {
                                l_bActionEnabled = false;
                            }
                            this.actions.actSSLVyriditSpisVyridit.update({
                                enabled:
                                    l_bActionEnabled
                                    && componentDto.LzeVyridit
                                    && (componentDto.LzeVyriditDokumentSOhledemNaEpk || componentDto.LzeVyriditDokumentSOhledemNaEpkDotaz)
                            });
                            this.actions.actSSLVyriditSpisUlozit.update({ enabled: l_bActionEnabled && componentDto.LzeZmenitUlozeni });
                            this.actions.actSSLVyriditSpisPravMoc.update({ enabled: l_bActionEnabled && componentDto.LzeNabytPravniMoc });
                            this.actions.actSSLVyriditSpisZmenaLhuty.update({ enabled: l_bActionEnabled && componentDto.ZmenaLhutyEnabled });
                            
                            
                        }
                        */
                        //#endregion
                    },

                    actions: { //může být zadáno jako pole nebo jako objekt
                        /*
                        actSSLVyriditSpisVyridit: {
                            caption: "jres:26255275",  //RC 26255275 : Vyřídit/uzavřít
                            run: function () {

                                var content = $.content(this);
                                if (componentDto.LzeVyriditDokumentSOhledemNaEpkDotaz) {
                                    this.dialogs.confirm("jres:31937143").on("closed", function (ev, retVal) { //RC 31937143 : Existuje nevyřízená žádost v EPK, přejete si pokračovat?
                                        if (retVal) {
                                            if (retVal === "yes") {
                                                content.sslVyriditSpis_VyriditSpis();
                                            }
                                        }
                                    });
                                } else {
                                    content.sslVyriditSpis_VyriditSpis();
                                }
                            }
                        },
                        actSSLVyriditSpisUlozit: {
                            caption: "jres:26255270", //RC 26255270 : Uložit
                            run: function () {
                                $.content(this).sslVyriditSpis_Ulozit();
                            }
                        },
                        actSSLVyriditSpisPravMoc: {
                            caption: "jres:26255276", //RC 26255276 : Právní moc
                            run: function () {
                                $.content(this).sslVyriditSpis_NabytPravniMoc();
                            }
                        },
                        actSSLVyriditSpisZmenaLhuty: {
                            caption: "jres:26255277", //RC 26255277 : Změna lhůty
                            run: function () {
                                $.content(this).sslVyriditSpis_ZmenaLhuty();
                            }
                        },
                        */
                        actSSLPodrobnostiSpisu: {
                            caption: "jres:26256222", //RC 26256222 : Podrobnosti
                            visible: false,
                            run: function () {
                                $.content(this).sslPodrobnostiSpisu();
                            }
                        }
                        
                    },

                    tabs: {
                        SslProfil: {
                            tabParams: {
                                title: componentDto.Title,
                                opened: true,  //1. tab je pro agednovou hlavičku, ta je pro dokumenty, spisy, zakázky atp. vždy L2M2S1. BO detaily mimo wfl (tzn. dokumenty, spisy) jsou v L1M1S1 //RC 26255308 : Dokument
                                group: getTabGroupsProProfil(),//Gordic.Prefabs.TabGroups.Spis(),
                                headerClass: "hidden",
                                //menuBar: content.isSSLVyrizeni ? [
                                //    { action: "actSSLVyriditSpisVyridit", favorite: true },
                                //    { action: "actSSLVyriditSpisUlozit", favorite: true },
                                //    { action: "actSSLVyriditSpisPravMoc", favorite: true },
                                //    //,{ action: "actSSLVyriditSpisZmenaLhuty", favorite: true }
                                //    { action: "actSSLPodrobnostiSpisu", favorite: true }

                                    
                                //] : undefined,
                            },
                            init: function (tab) {
                                //#region definice tab dokumentu
                                var that = $.content(tab);
                                var profilForm = new Gordic.Forms
                                    .Form({
                                        name: "formWflSpis",
                                        layoutDescriptor: "L2M2S1, L-3-9-0, M-3-9-0, S-12-12-0"
                                    })
                                    .addSection({label:"jres:26255257", layoutDescriptor: "L-2-10-0, M-3-9-0, S-12-12-0", customClass: "w-L-7 w-M-7 w-S-12" }); //RC 26255257 : Spis
                                if (componentDto.SPrij === 1) {
                                    profilForm
                                        .addRow("jres:26255430") //RC 26255430 : Odesílatel
                                        .addField("gselectbox", Gordic.Esu.Prefabs.vyberEsu({
                                            typ: 2,
                                            Logovani: that.Logovani
                                        })
                                        , {
                                            name: "Odesilatel",
                                            model: "model.IxsEsu=value.ixs_esu;model.LicZast=value.lic;model.PorZast=value.por_zast",
                                            change: function (ev, changeObj) {
                                                if (changeObj && changeObj.value && !(changeObj.flags && changeObj.flags.uvodniNastaveni)) {
                                                    that.kontrolaESUVRegistrech();
                                                }
                                            },
                                            disabled: true,
                                        });
                                } else {
                                    profilForm
                                        .addRow("jres:26255430") //RC 26255430 : Odesílatel)
                                        .addField("gstringbox", { name: "MistoVzniku", model: "model.MistoVzniku=value", disabled: true, });
                                }

                                profilForm
                                    .addRow("jres:26255458") //RC 26255458 : Věc podrobně
                                    .addField("gstringbox", Gordic.Prefabs.Field.charCounter(componentDto.VecPodrobneMaxLength), {
                                        name: "VecPodrobne",
                                        model: "model.ObsahText=value",
                                        rows: 4,
                                        disabled: true,
                                        validators: [
                                            new Gordic.Validators.Length({ max: componentDto.VecPodrobneMaxLength, message: "jres:31937028" }), //RC 31937028 : Hodnota v poli je moc dlouhá
                                            spznRequired ? [new Gordic.Validators.Required()] : undefined
                                        ],
                                    })

                                var spznRequired = componentDto.ssl_povin_spzs === 1;

                                if(componentDto.gin_n23_vecsk == 1) {
                                    var prefabGinsvskOptions = Gordic.Prefabs.Select.ginsvsk();
                                    prefabGinsvskOptions.validators.push(new Gordic.Validators.Required());

                                    profilForm
                                        .addRow("jres:26257232") //RC 26257232 : Věcná skupina
                                        .addField("gselectbox", prefabGinsvskOptions, {
                                            name: "VecnaSkupina",
                                            model: "model.IxsVsk=value.ixs_vsk",
                                            graphicInput: "oninput",
                                            itemTemplate: Gordic.Wfl.GWflCommonDlg.ginsvskItemTemplate({ casObdobiVisible: false }),
                                            itemTooltipTemplate: Gordic.Wfl.GWflCommonDlg.ginsvskItemTooltipTemplate({ casObdobiVisible: false }),
                                          //  validators: [new Gordic.Validators.Required()],
                                            serverFilters: {
                                                JenKoncove: true, 
                                                urceni_spis_z: [2, 3]
                                            },
                                            disabled: true
                                        })
                                } else {
                                    var prefabSslsspzOptions = Gordic.Prefabs.Select.sslsspz();

                                    if(spznRequired) {
                                        prefabSslsspzOptions.validators.push(new Gordic.Validators.Required());
                                    } 

                                    profilForm
                                        .addRow("jres:26255820") //RC 26255820 : Spisový znak
                                        .addField("gselectbox", "w-3", Gordic.Prefabs.Select.sslsspl(), {
                                            name: "SpisPl",
                                            model: "model.SpisPl=value.spis_pl",
                                            disabled: true

                                        })
                                        .addField("gselectbox", "w-9", prefabSslsspzOptions, {
                                            name: "SpisZnak",
                                            graphicInput: "oninput",
                                            itemTemplate: Gordic.Wfl.GWflCommonDlg.sslsspzItemTemplate({ poznamkaVisible: true }),
                                            itemTooltipTemplate: Gordic.Wfl.GWflCommonDlg.sslsspzItemTooltipTemplate({ poznamkaVisible: true }),
                                            model: "model.SpisPl=>value.spis_pl;model.SpisZnak=value.spis_znak",
                                            serverFilters: {
                                                spis_pl: new Gordic.Forms.Dependency("SpisPl", "spis_pl")
                                            },
                                            disabled: true
                                        })


                                    /*
                                    .addRow("jres:26255820") //RC 26255820 : Spisový znak
                                    .addField("gselectbox", "w-3", Gordic.Prefabs.Select.sslsspl(), {
                                        name: "SpisPl",
                                        disabled: true,
                                        model: "model.SpisPl=value.spis_pl",
                                        
                                    })
                                    .addField("gselectbox", "w-9", Gordic.Prefabs.Select.sslsspz(), {
                                        name: "SpisZnak",
                                        disabled: true,
                                        graphicInput: "oninput",
                                        itemTemplate: Gordic.Wfl.GWflCommonDlg.sslsspzItemTemplate(),
                                        itemTooltipTemplate: Gordic.Wfl.GWflCommonDlg.sslsspzItemTooltipTemplate(),
                                        model: function (operation, dto, modelOptions) {
                                            switch (operation) {
                                                case "apply": $(this).gfield("setValue", { spis_pl: dto.SpisPl, spis_znak: dto.SpisZnak, }, { valid: false }); return;
                                                case "collect": dto.SpisZnak = ($(this).gfield("getValue") ? $(this).gfield("getValue").spis_znak : null); return;
                                                default: return "SpisZnak ";
                                            }
                                        },
                                        //model:"model.SpisPl=value.spis_pl;model.SpisZnak=value.spis_znak",
                                        serverFilters: {
                                            //  aktivita: [100],
                                            spis_pl: new Gordic.Forms.Dependency("SpisPl", "spis_pl")
                                        }
                                    })
                                    */
                                }

                                profilForm
                                    .addRow("jres:26256081") //RC 26256081 : Počet dokumentů
                                    .addField("gnumberbox", {
                                        name: "PocetVlozenychDok",
                                        disabled: true
                                    })

                                    .addRow("jres:26255511") //RC 26255511 : Dat.vyř.do.
                                    .addField("gdatebox", "w-5",
                                        {
                                            name: "DatVyrizDo",
                                            disabled: true,
                                            minValue: Gordic.Ssl.Utils.MinimalDate
                                        })

                                    .addText(componentDto.DatVyrizLabel, "w-2 right")
                                    .addField("gdatebox", "w-5",
                                        {
                                            name: "DatVyriz",
                                            disabled: true,
                                            minValue: Gordic.Ssl.Utils.MinimalDate
                                        })

                                    .addRow("jres:32170288") //RC 32170288 : Datum založení
                                    .addField("gdatebox", {
                                        name: "DatZal",
                                        disabled: true,
                                        minValue: Gordic.Ssl.Utils.MinimalDate
                                    })

                                    .addSection({ label: "jres:31937118", layoutDescriptor: "L-3-9-0, M-3-9-0, S-12-12-0", customClass: "w-L-5 w-M-5 w-S-12" }); //RC 31937118 : Další údaje

                                profilForm
                                    .addRow({ label: "jres:26255342" })
                                    .addField("gkeywordsbar", {
                                        ixp: componentDto.ixp,
                                        name: "Keywords",
                                        parentGcontent: that,
                                        disabled: true,
                                        saveData: "save",
                                        tooltip: "jres:26255342" //RC 26255342 : Klíčová slova
                                    })

                                    .addRow("jres:26255397") //RC 26255397 : Poznámka
                                    .addField("gstringbox", Gordic.Prefabs.Field.charCounter(
                                            componentDto.Validators && componentDto.Validators.Poznamka && componentDto.Validators.Poznamka[0] && componentDto.Validators.Poznamka[0].max
                                                ? componentDto.Validators.Poznamka[0].max
                                                : undefined
                                        ),
                                        {
                                            name: "Poznamka",
                                            disabled: true
                                        });
                                if (that.globalSettings.get("Global.Ssl.AppSettings.DetailSettings.ZobrazUzivPozn")) {
                                    profilForm
                                        .addRow({
                                            label: "jres:31937451", //RC 31937451 : Uživatelská poznámka
                                            hint: "jres:31937452" //RC 31937452 : Poslední uživatelská poznámka
                                        }) //RC 26255397 : Poznámka
                                        .addField("gstringbox",
                                            {
                                                name: "UzivPoznamka",
                                                tooltip: "jres:31937453", //RC 31937453 : Poslední uživatelská poznámka
                                                disabled: true,
                                                rows: 2,
                                            });
                                }




                                profilForm
                                    .addRow("jres:26255826") //RC 26255826 : Schvalovatel
                                    .addField("gselectbox",
                                        Gordic.Gin.Fields.ginsfunSSU(
                                            {
                                                name: "IxsFunSchval",
                                                model: "model.IxsFunSchval = value.ixs_fun",
                                                disabled: true,
                                                serverFilters: {
                                                    aktivita: [100],
                                                },
                                            }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO)
                                );




                                profilForm
                                    .addRow("jres:26255517") //RC 26255517 : Zpracovatel
                                    .addField("gselectbox",
                                        Gordic.Gin.Fields.ginsfunSSU(
                                            {
                                                name: "IxsFunResitel",
                                                model: "model.IxsFunResitel = value.ixs_fun",
                                                disabled: true,
                                                serverFilters: {
                                                    aktivita: [100],
                                                },
                                            }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO)
                                        );
                      
                                if (componentDto.PriorovanoKamVisible) {
                                    profilForm
                                        .addRow("jres:31937100") //RC 31937100 : Přesunuto kam
                                        .addField("gstringbox",
                                            {
                                                name: "PriorovanoKam",
                                                disabled: true,
                                                buttons: [
                                                    {
                                                        icon: 'gi-detail', requireValue: true, requireEdit: false, action: new GAction({
                                                            name: 'actOtevriDetail',
                                                            run: function (ev, ctx) {
                                                                var field = $(ctx.field);
                                                                var val = $(ctx.field).gfield("getValue");
                                                                that.otevriNovyDetail({ DetailDto: { ixp: val } });
                                                            }
                                                        })
                                                    }
                                                ]
                                            })
                                        ;
                                }
                              
                                profilForm
                                    .addRow("jres:26255482") //RC 26255482 : Umístění
                                    .addField("gselectbox", Gordic.Prefabs.Select.sslsumi(),
                                        {
                                            name: "Umisteni",
                                            disabled: true,
                                            model: "model.Umisteni=value.umisteni",
                                            //itemTemplate: function (value) {
                                            //    if (value && value.umisteni_txt) {
                                            //        return "" + value.umisteni_txt + (value.poznamka ? (" - " + value.poznamka) : "");
                                            //    } else {
                                            //        return null
                                            //    }
                                            //}, 
                                            serverFilters: {
                                                aktivita: [100],
                                                ixs_su: componentDto.IxsSuAkt
                                            }
                                        });


                                profilForm
                                    .addRow("jres:26255513") //RC 26255513 : Stav
                                    .addField("gstringbox",
                                        {
                                            name: "StavSpisu",
                                            disabled: true,
                                        });

                                var buttons = [
                                    {
                                        icon: 'gi-detail',
                                        requireEdit: false,
                                        action: that.actions.add(new GAction(Gordic.Spi.PreActions.OtevriDetailBaliku({
                                            inputData: {
                                                parentContent: that,
                                                opt: {
                                                    IxsZup: componentDto.IxsZup
                                                }
                                            },
                                            actionParams: {
                                                name: 'actBalik',
                                                caption: '',
                                                tooltip: "jres:31937099", //RC 31937099 : Zobrazit balík
                                                icon: 'fa-archive '
                                            }
                                        })))
                                    }];
                              
                                if (componentDto.FieldUlozDatumVisible) {
                                    profilForm.addRow(componentDto.FieldUlozLabel)
                                    profilForm
                                        .addField("gdatebox",
                                            {
                                                name: "FieldUlozDatum",
                                                valueType: "datetime",
                                                disabled: true,
                                                buttons: componentDto.TlacitkoBalikVisible ? buttons : undefined,
                                                minValue: Gordic.Ssl.Utils.MinimalDate
                                            });
                                }
                                if (componentDto.FieldUlozVisible) {
                                    profilForm.addRow(componentDto.FieldUlozLabel)
                                    profilForm
                                        .addField("gstringbox",
                                            {
                                                name: "FieldUloz",
                                                disabled: true,
                                                buttons: componentDto.TlacitkoBalikVisible ? buttons : undefined
                                            });
                                }
                                if (componentDto.IdExtArch) {
                                    profilForm.addRow("jres:31937483")   //RC 31937483 : Id archivu
                                        .addField("gstringbox", {
                                            name: "IdExtArch",
                                            disabled: true,
                                        })
                                }
                                if (componentDto.DatPrMocVisible) {
                                    profilForm
                                        .addRow("jres:26256668")  //RC 26256668 : Nabytí právní moci
                                        .addField("gdatebox",
                                            {
                                                name: "DatPrMoc",
                                                valueType: "datetime",
                                                disabled: true,
                                                minValue: Gordic.Ssl.Utils.MinimalDate
                                            });
                                }
                                if (componentDto.DatVykonavVisible) {
                                    profilForm
                                        .addRow("jres:31937462")  //RC 31937462 : Vykonavatelnost
                                        .addField("gdatebox",
                                            {
                                                name: "DatVykonav",
                                                valueType: "datetime",
                                                disabled: true,
                                                minValue: Gordic.Ssl.Utils.MinimalDate
                                            });
                                }



                                $("<div>").appendTo(tab)
                                    .gform("createFrom", profilForm);




                                // Vyřízení
                                if (componentDto.IsSSLVyrizeni ) {
                                    var vyrizeniForm = new Gordic.Forms
                                        .Form({
                                            name: "formSslVyrizeniSpis",
                                            layoutDescriptor: "L2M2S1, L-3-9-0, M-3-9-0, S-12-12-0"
                                        })
                                        .addSection({label:"jres:26255161", layoutDescriptor: "L-2-10-0, M-3-9-0, S-12-12-0", customClass: "w-L-7 w-M-7 w-S-12" }); //RC 26255161 : Vyřízení

                                    vyrizeniForm
                                        //1
                                        .addRow("jres:26255431") //RC 26255431 : Způsob vyřízení
                                        .addField("gstringbox", {
                                            name: "ZpusobVyrizeni",
                                            disabled: true
                                        })


                                        .addRow("jres:26255660") //RC 26255660 : Datum vyřízení
                                        .addField("gdatebox", {
                                            name: "DatVyr",
                                            disabled: true,
                                            minValue: Gordic.Ssl.Utils.MinimalDate
                                        })

                                        //2

                                        .addRow("jres:26255506") //RC 26255506 : Datum uzavření
                                        .addField("gdatebox", {
                                            name: "DatUzav",
                                            disabled: true,
                                            minValue: Gordic.Ssl.Utils.MinimalDate
                                        })



                                        .addRow("jres:31937083") //RC 31937083 : Svazků příloh
                                        .addField("gnumberbox", {
                                            name: "SvPriloh",
                                            disabled: true,
                                            emptyValue: null

                                        });
                                    if (componentDto.OdeslanoListuVisible) {
                                        vyrizeniForm
                                            .addRow("jres:32000025") //RC 32000025 : Odesláno listů
                                            .addField("gnumberbox", {
                                                name: "OdeslanoListu",
                                                disabled: true,
                                                emptyValue: null

                                            });
                                    }
                                    if (componentDto.UlozenoListuVisible) {
                                        vyrizeniForm
                                            .addRow("jres:26256582") //RC 26256582 : Uloženo listů
                                            .addField("gnumberbox", {
                                                name: "UlozenoListu",
                                                disabled: true,
                                                emptyValue: null
                                            });
                                    }
                                    vyrizeniForm
                                        //sekce 2
                                        
                                        .addRow("jres:26255507") //RC 26255507 : Komentář
                                        .addField("gstringbox", {
                                            name: "Komentar",
                                            rows: 2,
                                            disabled: true
                                        });

                             


                                    vyrizeniForm
                                        .addRow("jres:26256055") //RC 26256055 : Uzavřel
                                        .addField("gselectbox",
                                            Gordic.Gin.Fields.ginsfunSSU(
                                                {
                                                    name: "IxsZmpUzav",
                                                    model: "model.IxsZmpUzav = value.ixs_fun",
                                                    disabled: true,
                                                    serverFilters: {
                                                        aktivita: [100],
                                                    },
                                                }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO)
                                        )
                                        .addSection({ label: "jres:31937081", layoutDescriptor: "L-3-9-0, M-3-9-0, S-12-12-0", customClass: "w-L-5 w-M-5 w-S-12" }); //RC 31937081 : Skartace

                                    if(componentDto.gin_n23_vecsk > 0) {
                                        vyrizeniForm
                                            .addRow({ label: "jres:26257353", hint: "jres:26257353" }) //RC 26257353 : Skartační režim
                                            .addField("gselectbox", Gordic.Prefabs.Select.ginsskr(), {
                                                name: "SkartRezim",
                                                placeholder: 'jres:26257354', //RC 26257354 : Sk. režim
                                                model: "model.IxsSkr=value.ixs_skr",
                                                disabled: true
                                            });
                                    } else {
                                        vyrizeniForm
                                            .addRow({ label: "jres:31937162", hint: "jres:31937162" }) //RC 31937162 : Skartační znak, lhůta
                                            .addField("gselectbox", "w-6", Gordic.Prefabs.Select.sslcskz(), {
                                                name: "SkartZnak",
                                                placeholder: 'jres:31937146', //RC 31937146 : Sk. znak
                                                model: "model.SkartZnak=value.skar_znak",
                                                //tooltip: "Nadřazený skartační znak",
                                                disabled: true
                                            })
                                            //.addRow("jres:32000028") //RC 32000028 : Skartační lhůta
                                            .addField("gnumberbox", "w-6", {
                                                name: "SkartLhuta",
                                                disabled: true,
                                                placeholder: 'jres:31937147', //RC 31937147 : Sk. lhůta
                                                // tooltip: "Nadřazená skartační lhůta",
                                                emptyValue: null
                                            });
                                    }

                                    vyrizeniForm
                                        .addRow({ label: "jres:32000031", hint: "jres:32000031" }) //RC 32000031 : Rok spouštěcí události
                                        .addField("gnumberbox", {
                                            name: "RokSpUdal",
                                            disabled: true,
                                            emptyValue: null
                                        })
                                        .addRow({
                                            label: "jres:31937535", //RC 31937535 : Rok kontroly spouštěcí události
                                            hint: "jres:31937534" //RC 31937534 : Rok kontroly spouštěcí události
                                        }) //RC 32000031 : Rok spouštěcí události
                                        .addField("gnumberbox", {
                                            name: "RokKonSpu",
                                            disabled: true,
                                            emptyValue: null
                                        });

                                    if(componentDto.gin_n23_vecsk == 0) {
                                        vyrizeniForm
                                            .addRow({
                                                label: "jres:31937082",//RC 31937082 : Popis spoušť. u.
                                                hint: "jres:31937403" //RC 31937403 : Popis spouštěcí události.
                                            })
                                            .addField("gstringbox", {
                                                name: "PopisSpousteciUdalosti",
                                                disabled: true
                                            });
                                    }

                                    vyrizeniForm
                                        .addRow({ label: "jres:31937404", hint: "jres:31937404" }) //RC 31937404 : Pozastavení skartační operace do roku

                                        .addField("gcheck", "w-4", {
                                            name: "PrizPozSkar",
                                            disabled: true,
                                            modelValueTransform: {
                                                apply: function (modelValue) { return modelValue === 1; },
                                                collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                                            }
                                        })
                                        .addField("gnumberbox", "w-8", {
                                            name: "RokDoPozSkar",
                                            disabled: true,
                                        })
                                        .addRow({ label: "jres:31937122", hint: "jres:31937122" }) //RC 31937122 : Důvod pozastavení skartační operace
                                        .addField("gstringbox", {
                                            name: "DuvodPozSkar",
                                            disabled: true
                                        })
                                        .addRow({ label: "jres:26257362", hint: "jres:26257363" })  //RC 26257363 : Rok skartačního řízení / Rok vyřazení
                                        .addField("gnumberbox", { //"w-4",
                                            name: "SkartRizeni",
                                            disabled: true,
                                            emptyValue: null,
                                            customClass: " bold",
                                        });
                                    if (componentDto.PrizKonfliktSka) {
                                        vyrizeniForm
                                            .addRow()  
                                            .addText("jres:31937546", //RC 31937546 : Nevypořádaný konflikt skartační události
                                                " g-state-text" // g-state-important
                                            );
                                    }
                                        
                                        
                                        //.addText(componentDto.SkartaceArchivaceLabel, "w-4 right")
                                        //.addField("gdatebox", "w-4", {
                                        //    name: "DatSkartace",
                                        //    valueType: "datetime",
                                        //    disabled: true
                                        //})
                                        ;


                                    $("<div>").appendTo(tab)
                                        .gform("createFrom", vyrizeniForm);

                                    //#region definice gridu

                                    var gridKolonky = new Gordic.Data.GridFormat();
                                    gridKolonky
                                        .addTextColumn({
                                            name: "s_dor_txt",
                                            caption: "jres:26255409" //RC 26255409 : Stav doručení
                                        })
                                        .addTextColumn({
                                            name: "esu_txt",
                                            caption: "jres:26255410" //RC 26255410 : Externí subjekt
                                        })
                                        .addDateColumn({
                                            name: "dat_odes",
                                            caption: "jres:26255411" //RC 26255411 : Datum odeslání
                                        })
                                        .addTextColumn({
                                            name: "pod_cislo",
                                            caption: "jres:26255412" //RC 26255412 : Podací číslo
                                        })
                                        .addTextColumn({
                                            name: "zpusob_dor_txt",
                                            caption: "jres:26255413" //RC 26255413 : Způsob doručení
                                        })
                                        .addTextColumn({
                                            name: "komb_sluzeb_txt",
                                            caption: "jres:26255974" //RC 26255974 : Služby
                                        })
                                        .addTextColumn({
                                            name: "druh_zas_zach_txt",
                                            caption: "jres:26255415" //RC 26255415 : Druh zacházení se zásilkou
                                        })
                                        .addTextColumn({
                                            name: "id_dorucenky",
                                            caption: "jres:26255416", //RC 26255416 : Id doručenky
                                            width: 110,
                                            fixedWidth: true
                                        })
                                        .addDateColumn({
                                            name: "dat_potvrz",
                                            caption: "jres:26255417" //RC 26255417 : Datum doručování
                                        })

                                        ;


                                    /*
                                    $.content(this).actions.add({
                                        name: "actOtevriDetailEsu",
                                        run: function (ev, ctx) {
                                            console.log(ctx.cellInfo.data);
                                            that.detailEditace();
    
                                        }
                                    });
                                    */
                                    // that.viewVyrizeniSpis = new Gordic.Data.View(componentDto.DataSource, { key: "id_dorucenky" });
                                    that.viewVyrizeniSpis = new Gordic.Data.View(componentDto.DataSource);
                                    that.gridVyrizeniSpis = $("<div>").appendTo(tab)
                                        //.height(900)
                                        .gautofit()
                                        .ggrid({
                                            name: "GridVyrizeniSpis",
                                            data: that.viewVyrizeniSpis,
                                            renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                                            columnMode: "fit",  // fit, full
                                            navigationMode: "row", // row, cell
                                            //defaultAction: $.content(this).actions.actOtevriDetailEsu, //selectAction
                                            //rowsClass: function (dataRow) {
                                            //    if (dataRow && dataRow.data && dataRow.data.trideni === 0) {
                                            //        return "bold";
                                            //    } else return "  ";
                                            //},
                                            //selection: 
                                            //cellActivate: function (ev, row) {

                                            //    that.sslSbernyArchNastavEnableAkceZRadkuGridu(row);

                                            //},

                                            multi: false,

                                            scrollHelperTemplate: "{esu_txt}",  // "{ixs_esu} - {nazev}",
                                            //searchColumns: ["nazev_ext"],

                                            columns: gridKolonky
                                        });
                                }
                            }
                        }
                        
                    },
                    menuBar: [
                        { action: "actSSLPodrobnostiSpisu" }
                        //{
                            //id: "menuWflPraceSCJ", parent: "menuWflCinnosti", before: "actWflCinnostiOdeslani"/*menuWflCinnostiOdeslani*/, type: "static", caption: "jres:31937174", //RC 31937174 : Práce s ČJ
                            //children: [
                            //    { action: "actSSLVyriditSpisVyridit" },
                            //    { action: "actSSLVyriditSpisUlozit" },
                            //    { action: "actSSLVyriditSpisPravMoc" },
                            //    { action: "actSSLPodrobnostiSpisu" }
                            //]
                        //}
                    ]
               
                   
                };

                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\DetailBuilderComponents\GSslDetailComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {
        SslDetail: {

            create: function (content, componentDto) {
                var result = {
                    onMenuBuild: [
                        function (builder, menus) {
                            this.enableSslDetail();
                        },
                        function (builder, menus) {
                            content.element.addHelpContext('PostraniPanelVzory');
                        }
                    ],

                    onBuild: [
                        function () {
                            if (this.RezimPodani == null || this.RezimPodani === 0) {
                                this.ulozNavstivenyDokument();
                            }
                            this.hideFlash("idflashBalik");
                        }
                    ],
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady
                        VlozitDoSpisuVyriditRequest: "jres:26255224", //RC 26255224 : Přejete si před vložením do spisu dokument vyřídit?
                        PolozkyDoplnenyZeSpisuRequest: "jres:26255225", //RC 26255225 : V případě, že nejsou vyplněny povinné položky, budou doplněny ze spisu.
                        SpisNovyDokErrText: "jres:26255206", //RC 26255206 : Do tohoto spisu nelze vložit nový dokument.
                        VlastniDokErrText: "jres:26255203", //RC 26255203 : V editačním módu nelze vytvářet vlastní dokument.
                        CiziDokErrText: "jres:26255204", //RC 26255204 : V editačním módu nelze vytvořit cizí dokument.
                        VyrizujiciDokErrText: "jres:26255205", //RC 26255205 : V editačním módu nelze vytvářet vyřizující dokument.
                        PrevzetiRequestText: "jres:26255169", //RC 26255169 : Opravdu chcete převzít dokument, když je ve vlastnictví jiného spisového uzlu?
                        VyrizeniDokumentuWinTitle: "jres:26255198", //RC 26255198 : Vyřízení dokumentu
                        VyriditSpisJineAgendyRequest: "jres:26255236", //RC 26255236 : Přejete si opravdu vyřídit spis? Ve spise jsou vloženy dokumenty jiných agend. Počet:
                        // VyrizeniSpZnMessage: "jres:26255106", //RC 26255106 : Některý z dokumentů vložených ve spisu má silnější skartační znak nebo delší skartační lhůtu než spis!
                        UlozeniSpisuWinTitle: "jres:26255200", //RC 26255200 : Uložení spisu
                        VyrizeniVyplnitVecText: "jres:26255238", //RC 26255238 : Před vyřízením dokumentu je potřeba vyplnit věc!
                        ZrusitPrideleniRequest: "jres:26255111", //RC 26255111 : Opravdu chcete zrušit redistribuci a provést akci?
                       // DuvodZtratyDokumentuSpisuWinTitle: "jres:26256361", //RC 26256361 : Důvod ztráty dokumentu/spisu
                        DuvodZtratyDokumentuSpisuWinTitle: "jres:26257253", //RC 26257253 : Záznam o ztrátě / poškození.
                        PreruseniVyrizovaniWinTitle: "jres:26255185", //RC 26255185 : Přerušení vyřizování dokumentu
                        PravniMocWinTitle: "jres:26255186", //RC 26255186 : Nabytí právní moci dokumentu
                        DuvodStornaSpisuWinTitle: componentDto.gin_n23_vedd == 0 ? "jres:26255183" : "jres:26257240", //RC 26257240 : Důvod znepřístupnění (storna) spisu
                        DuvodStornaDokumentuWinTitle: componentDto.gin_n23_vedd == 0 ? "jres:26255184" : "jres:26257241", //RC 26257241 : Důvod znepřístupnění (storna) dokumentu
                        StornoSpisuRequest: "jres:26255228", //RC 26255228 : Opravdu chcete spis stornovat? Budou stornovány i všechny dokumenty vložené!
                        StornoVyrizDokRequestText: "jres:26255531", //RC 26255531 : Opravdu chcete stornovat tento dokument (bude stornován i vyřizující
                        ZnovupodatRequest: "jres:26255229", //RC 26255229 : Opravdu chcete dokument znovupodat?
                        VyriditAdActaRequest: "jres:26255235", //RC 26255235 : Chcete opravdu vyřídit dokument?

                        // přidané funkce s thisem


                        hotfixi: function () {

                            //#region HotFixi
                            // odstranění mezer u hlaviček
                            this.findFormSections().eq(3).css("padding-top", "0rem");
                            //this.findFormSections().eq(4).css("padding-top", "0rem");
                            //#endregion
                        },

                        ulozNavstivenyDokument: function () {
                            if (!componentDto.IsZastup) {
                                var obj = {
                                    Ixp: componentDto.ixp,
                                    //SEle: componentDto.SEle,
                                    //PrizSpis: componentDto.PrizSpis,
                                    //Nazev: componentDto.Nazev,
                                    //AktZnacka: componentDto.AktZnacka
                                };
                                Gordic.Ssl.Globals.PosledniNavstiveny.pridejPosledniNavstivenyDoc(this.globalSettings, obj);
                            }

                        },



                        zmenaEditace: function (opt) {
                            var that = this;
                            var param = this.dataProZmnenuEditace();
                            //this.element.trigger('rememberinitialopen');
                            this.tryReloadDetail(param, opt);
                        },
                        /*
                        obcerstvit: function () {
                            var that = this;
                            this.tryReloadDetail(undefined, {
                                flashMessage: "jres:31937163", //RC 31937163 : Občerstveno
                                flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                            });
                        },
                        */
                        dataProZmnenuEditace: function () {
                            var param = {
                                DetailDto: this.DetailDto,
                                RezimPodani: 0,
                                InicDok: this.InicDok,
                                EditMode: !this.EditMode

                            };

                            if (param.EditMode) {

                                var activeTab = this.element.find('.gtabmanager').gtabmanager('getActive')
                                if (activeTab === Gordic.Prefabs.TabGroups.PopisneVlastnosti().id) { 
                                    param.IdZalozkyNeboPaneluKOtevreni = Gordic.Prefabs.TabGroups.PopisneVlastnosti().id;
                                }
                                else if (activeTab === Gordic.Prefabs.TabGroups.RozsirujiciVlastnosti().id) {
                                    param.IdZalozkyNeboPaneluKOtevreni = Gordic.Prefabs.TabGroups.RozsirujiciVlastnosti().id;
                                }
                                else if (activeTab === Gordic.Prefabs.TabGroups.Zverejneni().id) {
                                    param.IdZalozkyNeboPaneluKOtevreni = Gordic.Prefabs.TabGroups.Zverejneni().id;
                                }
                                else if (activeTab === Gordic.Prefabs.TabGroups.Doruceni().id) {
                                    param.IdZalozkyNeboPaneluKOtevreni = Gordic.Prefabs.TabGroups.Doruceni().id;
                                }
                                else if (activeTab === Gordic.Prefabs.TabGroups.EklepPredplneni().id) {
                                    param.IdZalozkyNeboPaneluKOtevreni = Gordic.Prefabs.TabGroups.EklepPredplneni().id;
                                }
                                else {
                                    if (componentDto.IsSpis) {
                                        param.IdZalozkyNeboPaneluKOtevreni = Gordic.Prefabs.TabGroups.Spis().id;
                                    } else {
                                        param.IdZalozkyNeboPaneluKOtevreni = Gordic.Prefabs.TabGroups.Dokument().id;
                                    }
                                }
                           //     param.IdZalozkyNeboPaneluKOtevreni = "SslProfil";
                            }

                            return param;
                        },
                        ulozitZmeny: function (model) {
                            var that = this;
                            this.pockejNaVerifyPolicek().then(function () {
                                if (that.validuj()) {
                                    model = model ? model : {};
                                    //this.findForms("formSpisHeader").findFields().gfield("model", "collect", model);
                                    that.zkontrolujComponenty(model);
                                }
                            });
                        },


                        zkontrolujComponenty: function (model) {
                            var that = this;

                            var arrOfPromise = [];
                            var all = {};
                            //header
                            //if (this.saveSslHeader) {
                            //    $.extend(all, this.saveSslHeader());
                            //}
                            if (this.saveSslHeader) {

                                var promisHeader = this.saveSslHeader();
                                promisHeader.done(function (retVal) {
                                    $.extend(all, retVal);
                                });
                                arrOfPromise.push(promisHeader);

                            }


                            //vyrizeni
                            if (this.predUlozenimSslDetailVyrizeni) {
                                var promisVyrizeni = this.predUlozenimSslDetailVyrizeni();
                                promisVyrizeni.done(function (retVal) {
                                    $.extend(all, retVal);
                                });
                                arrOfPromise.push(promisVyrizeni);
                            }
                            //doruceni
                            if (this.saveSslDetailDoruceni) {
                                $.extend(all, this.saveSslDetailDoruceni());
                            }
                            //profil dokument
                            if (this.saveSslProfil) {
                                $.extend(all, this.saveSslProfil());
                            }
                            if (this.saveEkoProfil) {
                                $.extend(all, this.saveEkoProfil());
                            }

                            //profil spis
                            if (this.saveSslProfilSpis) {

                                var promisProfilSpis= this.saveSslProfilSpis();
                                promisProfilSpis.done(function (retVal) {
                                    $.extend(all, retVal);
                                });
                                arrOfPromise.push(promisProfilSpis);

                            }

                            //vlastnosti
                            if (this.predUlozenimSslDetailVlastnosti) {
                                var promisVlastnosti = this.predUlozenimSslDetailVlastnosti();
                                promisVlastnosti.done(function (retVal) {
                                    $.extend(all, retVal);
                                });
                                arrOfPromise.push(promisVlastnosti);
                            }

                            //zveřejnění
                            if (this.saveZverejneni) {
                                var promisZverejneni = this.saveZverejneni();
                                promisZverejneni.done(function (retVal) {
                                    $.extend(all, retVal);
                                });
                                arrOfPromise.push(promisZverejneni);
                            }

                            //doruceni
                            if (this.saveSslDetailEklepPredplneni) {
                                $.extend(all, this.saveSslDetailEklepPredplneni());
                            }

                            //ruzne
                            this.sezbirejPromenne(model);


                            //čekání až se splní všechny
                            if (arrOfPromise.length > 0) {
                                $.when.apply(null, arrOfPromise).done(function () {
                                    $.extend(model, all);
                                    that.ulozitZmenyFinal(model);
                                });
                            } else {
                                $.extend(model, all);
                                that.ulozitZmenyFinal(model);
                            }
                        },
                        sezbirejPromenne: function (model) {
                            model.FlagEvidovat = this.flagEvidovat;
                            //model.SelectedDenik = this.selectedDenikToSave; dsebesta nyní tady není potřeba 

                        },

                        pockejNaVerifyPolicek: function () {
                            var that = this;
                            var formy = this.findForms();
                            return formy.gform("waitForValues")

                        },

                        validuj: function () {
                            var formy = this.findForms();
                            return formy.gform("isValid");
                        },


                        closing: function () { // podmineny userClose 
                            var def = $.Deferred();
                            var naDetailuDosloKeZmene = false;
                            if (this.indikaceZdaDosloKReloaduContentu || this.naDetailuDosloKeZmene) {
                                naDetailuDosloKeZmene = true;
                            }
                            var retVal = {
                                naDetailuDosloKeZmene: naDetailuDosloKeZmene
                            };


                            if (!this.zavritBezKontrolyZmen && (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0))) {
                                var dosloKeZmene = false;
                                var formy = this.findForms();
                                for (var i = 0; i < formy.length; i++) {
                                    if (formy.eq(i).gform("hasChanged")) {
                                        dosloKeZmene = true;
                                    }
                                }
                                if (dosloKeZmene) {
                                    this.dialogs.messageBox("jres:26255319", //RC 26255319 : Zavřít
                                        "jres:31937152", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 31937152 : Na detailu jsou neuložené změny, přejete si přesto detail zavřít?
                                        .on("yes",
                                            function () {
                                                def.resolve(retVal);
                                            })
                                        .on("closed",
                                            function () {
                                                def.reject();
                                            });
                                } else {
                                    def.resolve(retVal);
                                }
                            } else {
                                def.resolve(retVal);
                            }
                       
                            
                            return def.promise();
                        },



                        //#region Dokument
                        //vlastni pisemnost
                        vlastniPisemnost: function () {
                            var that = this;
                            var optVlastni = {};
                            var showDialog = true;
                            if (!this.EditMode) {
                                if (componentDto.IsSpis) {
                                    if (componentDto.LzeVlozitDoSpisu) {
                                        if (componentDto.IsSpisVyrizen) {
                                            showDialog = false;
                                            this.dialogs.confirm("?", this.VlozitDoSpisuVyriditRequest + "\n" + this.PolozkyDoplnenyZeSpisuRequest).on("closed", function (ev, retVal) {
                                                if (retVal) {
                                                    if (retVal === "yes") {
                                                        optVlastni.FlagVyridit = 1;
                                                        that.zadaniIdNovehoDokumentuVlastni(optVlastni); // dsebesta 16.11.2022 přesunuto do ifu protože peklo T23434
                                                    }
                                                    //that.zadaniIdNovehoDokumentuVlastni(optVlastni);
                                                }
                                            });
                                        } 
                                    } else {
                                        this.dialogs.alert("jres:31937042", this.SpisNovyDokErrText); //RC 31937042 : Pozor
                                        return;
                                    }
                                }
                                if (showDialog) {
                                    that.zadaniIdNovehoDokumentuVlastni(optVlastni);
                                }
                            } else {
                                this.dialogs.alert("jres:31937042", this.VlastniDokErrText); //RC 31937042 : Pozor
                            }
                        },
                        zadaniIdNovehoDokumentuVlastni: function (optVlastni) {
                            var that = this;
                            var options = {
                                TypDok: Gordic.Wfl.Globals.Enums.TypDok.Vlastni,
                                TypId: Gordic.Wfl.Globals.Enums.TypId.Ixp
                            };
                            Gordic.Wfl.Dialogs.GenerovaniIxp(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow).done(function (retVal, content) {
                                that.zadaniIdNovehoDokumentuOnCompleteFunction(retVal, optVlastni);  //l_oZadaniIdNovehoDokumentuOnCompleteFunction(retVal);
                            });
                        },
                        zadaniIdNovehoDokumentuOnCompleteFunction: function (retVal, optVlastni) {
                            var that = this;
                            if (retVal != null) {
                                if (retVal.IxpExist === false) {
                                    if (!componentDto.IsSpis) {
                                        var params = {
                                            DetailDto: { ixp: retVal.Ixp },
                                            RezimPodani: 1
                                        };
                                        //that.tryReloadDetail(params); //puvodně se reloadoval  aktualni dokument
                                        that.otevriNovyDetail(params);
                                    } else {
                                        var l_sIxpSpis = componentDto.ixp;

                                        optVlastni.DetailDto = { ixp: retVal.Ixp };
                                        optVlastni.RezimPodani = 1;
                                        optVlastni.IxpSpisProNovePodani = l_sIxpSpis;
                                        optVlastni.StUtajIdProNovePodaniDoSpisu = componentDto.StUtajIdWfl; // T39512
                                        optVlastni.PredplneniDatProPodani = { // T39512
                                            st_utaj_id: componentDto.StUtajIdWfl 
                                        };
                                        that.otevriNovyDetail(optVlastni);
                                    }
                                } else { // pokud ixp jiz existuje zobrazim detail
                                    that.otevriNovyDetail(
                                        {
                                            DetailDto: { ixp: retVal.Ixp }
                                        }
                                    );
                                }
                            }
                        },

                        //cizi pisemnost
                        ciziPisemnost: function () {
                            var that = this;
                            var optCizi = {};
                            var showDialog = true;
                           
                            if (!this.EditMode) {
                                if (componentDto.IsSpis) {
                                    if (componentDto.LzeVlozitDoSpisu) {
                                        if (componentDto.IsSpisVyrizen) {
                                            showDialog = false;
                                            this.dialogs.confirm("?", this.VlozitDoSpisuVyriditRequest + "\n" + this.PolozkyDoplnenyZeSpisuRequest).on("closed", function (ev, retVal) {
                                                if (retVal) {
                                                    if (retVal === "yes") {
                                                        optCizi.FlagVyridit = 1;
                                                        that.zadaniIdNovehoDokumentuCizi(optCizi);// dsebesta 16.11.2022 přesunuto do ifu protože peklo T23434
                                                    }
                                                    //that.zadaniIdNovehoDokumentuCizi(optCizi);// dsebesta 16.11.2022 přesunuto do ifu protože peklo T23434
                                                }
                                            });
                                        }
                                    } else {
                                        this.dialogs.alert("jres:31937042", this.SpisNovyDokErrText); //RC 31937042 : Pozor
                                        return;
                                    }
                                }
                                if (showDialog) {
                                    that.zadaniIdNovehoDokumentuCizi(optCizi);
                                }
                            } else {
                                this.dialogs.alert("jres:31937042", this.VlastniDokErrText); //RC 31937042 : Pozor
                            }
                        },
                        zadaniIdNovehoDokumentuCizi: function (optCizi) {
                            var that = this;
                            var options = {
                                TypDok: Gordic.Wfl.Globals.Enums.TypDok.Cizi,
                                TypId: Gordic.Wfl.Globals.Enums.TypId.Ixp
                            };
                            Gordic.Wfl.Dialogs.GenerovaniIxp(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow).done(function (retVal, content) {
                                that.zadaniIdNovehoDokumentuOnCompleteFunctionCizi(retVal, optCizi);
                            });
                        },
                        zadaniIdNovehoDokumentuOnCompleteFunctionCizi: function (retVal, optCizi) {
                            var that = this;
                            if (retVal != null) {
                                if (retVal.IxpExist === false) {
                                    if (!componentDto.IsSpis) {
                                        var params = {
                                            DetailDto: { ixp: retVal.Ixp },
                                            RezimPodani: 2
                                        };
                                        //that.tryReloadDetail(params); //puvodně se reloadoval  aktualni dokument
                                        that.otevriNovyDetail(params);
                                    } else {
                                        var l_sIxpSpis = componentDto.ixp;
                                        optCizi.DetailDto = { ixp: retVal.Ixp };
                                        optCizi.RezimPodani = 2;
                                        optCizi.IxpSpisProNovePodani = l_sIxpSpis;
                                        optCizi.StUtajIdProNovePodaniDoSpisu = componentDto.StUtajIdWfl; // T39512
                                        optCizi.PredplneniDatProPodani = { // T39512
                                            st_utaj_id: componentDto.StUtajIdWfl
                                        };
                                        that.otevriNovyDetail(optCizi);
                                    }
                                } else { // pokud ixp jiz existuje zobrazim detail
                                    that.otevriNovyDetail(
                                        {
                                            DetailDto: { ixp: retVal.Ixp }
                                        }
                                    );
                                }
                            }
                        },
                        //souvisejiciUkol
                        souvisejiciUkol: function () {
                            var that = this;
                           
                           
                            var isUko = false;
                            for (var i = 0; i < Gordic.Consts.Apps.length; i++) {
                                if (Gordic.Consts.Apps[i].faze === "GWAUKO05") {
                                    isUko = true;
                                }
                            }
                            if (isUko) {
                                Gordic.WebApp.Utility.openApp(
                                    "GWAUKO05",
                                    'VytvorUkolZDokumentu',
                                    {
                                        ixx1: componentDto.ixp,
                                        ixx2: null,
                                        ixx3: null
                                    }
                                    /*
                                    ,
                                    {
                                        ticketType: Gordic.Enums.TicketType.WithLoginAndContext
                                    }
                                    */
                                );
                            } else {
                                this.dialogs.warning(
                                    "jres:31937246", //RC 31937246 : Modul UKO nenalezen
                                    "jres:31937245"); //RC 31937245 : Modul UKO nelze otevřít, kontaktujte prosím správce.
                            }

                        },
                        /*
                        souvisejiciUkolZalozit: function (selectedDenik) {
                            var that = this;
                            var opt = {
                                Ixp: componentDto.ixp,
                                SelectedDenik: selectedDenik
                            };
                            var srv = this.createServiceContent({ className: "Gordic.Ssl.WebClient.GDetailUtils", params: {} });  //servisni sluzba/content
                            srv.call("ZalozitSouvisejiciUkol", opt)
                                .done(function (rv) {
                                    if (rv.Message) {
                                        that.showFlash(rv.Message, Gordic.Global.Enums.ColorStateClass.success, that.flashTimer);
                                    } else if (rv.ErrorMessage) {
                                        that.showFlash(rv.ErrorMessage, Gordic.Global.Enums.ColorStateClass.important, that.flashTimer);
                                    }
                                });
                        },
                        */
                        ulozitDoPoznamkovehoBloku: function () {
                            var that = this;
                            
                            let vyberPoznBloku = this.globalSettings.get("Global.Wfl.AppSettings.OthersSettings.PoznBlokViceBloku");

                            if(vyberPoznBloku === true) {
                                let opt = { TypBlp: Gordic.Wfl.Globals.Enums.TypBlp.dokspis };
                                Gordic.Wfl.Dialogs.PracovniBlokyDlg(that, opt).done(function (retVal) {
                                    if(retVal) {
                                        that.pridatIxpDoPoznamkovehoBloku(componentDto.ixp, retVal.ixsBlp);
                                    }
                                });
                            } else {
                                that.pridatIxpDoPoznamkovehoBloku(componentDto.ixp, "");
                            }

                        },
                        pridatIxpDoPoznamkovehoBloku: function (ixp, ixsBlp) {
                            var that = this;
                            var opt = {
                                ixp: ixp,
                                ixsBlp: ixsBlp
                            };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("PridatIxpDoPoznamkovehoBloku", opt)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {
                                        that.showFlash("jres:26256860", Gordic.Global.Enums.ColorStateClass.success, that.flashTimer);//RC 26256860 : Dokument byl vložen do pracovního bloku
                                    }
                                }).always(function () { srv.close(); });
                        },

                        poslatDokumentEmailem: function () {
                            var flashId = 'poslatDokumentEmailem';
                            var l_sIxp = componentDto.ixp;
                            var l_oJSONPars = { Ixp: l_sIxp };
                            var that = this;

                            Gordic.Wfl.Dialogs.GOdeslaniEmailNedokladoveDlg(this, l_oJSONPars)
                                .done(function (retVal) {
                                    // 29.12.2022 - TFeik
                                    // State není enum / číslo, ale jeden ze stringů 'canceled' | 'done' | 'failed'.
                                    // Pro TS to je Gordic.Wfl.WebClient.GOdeslaniPredpisBaseDlgResult.
                                    if (retVal && retVal.state === 'done') {
                                        that.showFlash('jres:26255237', Gordic.Global.Enums.ColorStateClass.success, flashId); //RC 26255237 : Email byl úspěšně odeslán.
                                    } else if (retVal && retVal.state === 'canceled') {
                                        that.showFlash('jres:32170010', Gordic.Global.Enums.ColorStateClass.warning, flashId); //RC 32170010 : Odeslání emailu zrušeno uživatelem.
                                    } else {
                                        that.showFlash('jres:31937021', Gordic.Global.Enums.ColorStateClass.error, flashId); //RC 31937021 : Email se nepodařilo odeslat.
                                    }
                                })
                                .fail(function (retFail) {
                                    that.showFlash("jres:31937021", Gordic.Global.Enums.ColorStateClass.error, flashId); //RC 31937021 : Email se nepodařilo odeslat.
                                    // možná l_sErrMessage.
                                });
                        },

                        //#endregion

                        //#region Zobrazit

                        zmenyDulezitychPolozek: function () {
                            var options = {
                                Ixp: componentDto.ixp
                            };
                            var retVal = Gordic.Ssl.Dialogs.ZmenyDulezitychPolozekDlg(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                if (retVal) {
                                    // netřeba  that.tryReloadDetail();
                                }
                            });
                        },

                        //#endregion


                        //#region Cinnosti

                        nabytPravniMoc: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var l_sId = "Pisemnost";
                            if (componentDto.IsSpis) {
                                l_sId = "Spis";
                            }
                            var l_oParamsJSON = { Ixp: l_sIxp, Dokument: l_sId };

                            Gordic.Ssl.Dialogs.NabytPravniMocDlg(that, l_oParamsJSON, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                if (retVal) {
                                    that.tryReloadDetail();
                                }
                            });

                        },

                        zmenaSpouUdalosti: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            
                            var l_oParamsJSON = { Ixp: l_sIxp};

                            Gordic.Wfl.Dialogs.ZmenaSpouUdalostiDlg({ parentContent: this, opt: l_oParamsJSON, ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow })
                                .done(function (retVal) {
                                    if (retVal && retVal.zmena) {
                                        that.tryReloadDetail();
                                    }
                            });

                        },

                        stornovat: function () {
                            var that = this;

                            var winTitle = "";

                            if (componentDto.IsSpis) {
                                winTitle = this.DuvodStornaSpisuWinTitle;

                                this.dialogs.confirm("jres:26255281", this.StornoSpisuRequest).on("closed", function (ev, retVal) { //RC 26255281 : Storno
                                    if (retVal) {
                                        if (retVal === "yes") {
                                            that.zadatDuvodStorna(winTitle);
                                        }
                                    }
                                });

                            } else {
                                winTitle = this.DuvodStornaDokumentuWinTitle;
                                this.zadatDuvodStorna(winTitle);
                            }
                        },

                        zadatDuvodStorna: function (winTitle) {
                            var that = this;
                            var options = {
                                winTitle: winTitle
                            };
                            var $div = Gordic.Ssl.Dialogs.AddDuvodDlg(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                if (retVal && retVal.duvod) {
                                    that.zkontrolovatZdaIniciacni_Storno(retVal.duvod);
                                }
                            });

                        },
                        zkontrolovatZdaIniciacni_Storno: function (duvod) {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var provadetHned = true;
                            if (!componentDto.IsSpis) { // jedna se o dokument
                                if (componentDto.PrizCj != 0) {
                                    if (componentDto.IxpInit == l_sIxp && componentDto.IxpVyriz) { // pokud se jedna o iniciacni dok a zaroven ma i vyrizujici dokument
                                        provadetHned = false;

                                        this.dialogs.confirm("Storno", that.StornoVyrizDokRequestText + " " + componentDto.IxpVyriz + ")?").on("closed", function (ev, retVal) {
                                            if (retVal) {
                                                if (retVal === "yes") {
                                                    that.provedStorno(duvod);
                                                }
                                            }
                                        });
                                    }
                                }
                            }

                            if (provadetHned) {
                                that.provedStorno(duvod);
                            }
                        },
                        provedStorno: function (duvod) {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var opt = {
                                "Ixp": l_sIxp,
                                "Duvod": duvod
                            };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("StornovatDokument", opt)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {
                                        that.tryReloadDetail(undefined, {
                                            flashMessage: componentDto.gin_n23_vedd == 0 ? "jres:31937044" : "jres:26257242", //RC 26257242 : Úspěšně znepřístupněno (stornováno)
                                            flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                        });
                                    }
                                }).always(function () { srv.close(); });
                        },

                        zrusitStorno: function () {
                            var that = this;
                            var options = {
                                winTitle: componentDto.gin_n23_vedd == 0 ? "jres:26257257" : "jres:26257256" //RC 26257256 : Zrušení znepřístupnění (storna) dokumentu/spisu
                            };
                            var $div = Gordic.Ssl.Dialogs.AddDuvodDlg(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                if (retVal && retVal.duvod) {
                                    var opt = {
                                        "Ixp": componentDto.ixp,
                                        "Duvod": retVal.duvod,
                                        "DatZmena": componentDto.DatZmena
                                    };
                                    var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                    srv.call("ZrusitStornoDokumentu", opt)
                                        .done(function (retVal) {
                                            if (retVal.StavBool) {
                                                that.tryReloadDetail(undefined, {
                                                    flashMessage: componentDto.gin_n23_vedd == 0 ? "jres:31937449" : "jres:26257243", //RC 26257243 : Znepřístupnění (storno) bylo úspěšně zrušeno
                                                    flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                                });
                                            }
                                        }).always(function () { srv.close(); });
                                }
                            });


                        },

                        predatPrevzitExtAg: function (FlagPredatPrevzit) {
                            var that = this;

                            if (FlagPredatPrevzit == "Predat") { // predani
                                Gordic.Wfl.Dialogs.VyberExtAgDlg(that, { IxsTyp: componentDto.IxsTyp, TypSpis: componentDto.TypSpis }, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                    if (retVal && retVal.IxsExt) {
                                        that.predatPrevzitExtAg_AgendaVybrana(retVal.IxsExt);
                                    }
                                });
                            } else { // prevzeti
                                if (componentDto.gin_n23_vedd > 0) {
                                    let dotaz = "jres:26257384"; //RC 26257384 : Dotaz

                                    that.dialogs.prompt(dotaz, "jres:26257382") //RC 26257382 : Zadejte důvod převzetí z externí agendy
                                        .on("ok", function (ev, duvod) {
                                            if (duvod != null && duvod.trim() != "") {
                                                that.predatPrevzitExtAg_AgendaVybrana("", duvod);
                                            } else {
                                                that.dialogs.alert("jres:26257383"); //RC 26257383 : Musíte uvést důvod převzetí z externí agendy
                                            }
                                        })
                                } else {
                                    that.predatPrevzitExtAg_AgendaVybrana("");
                                }
                            }
                        },
                        predatPrevzitExtAg_AgendaVybrana: function (selectedEA, duvod) {
                            var that = this;
                            var l_sIxp = componentDto.ixp;

                            var opt = {
                                "Ixp": l_sIxp,
                                "IxsExt": selectedEA,
                                "Duvod": duvod ? duvod : undefined
                            };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("PredaniDoExtAgendy", opt)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {

                                        that.tryReloadDetail(undefined, {
                                            flashMessage: retVal.Message,
                                            flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                        });
                                    }
                                }).always(function () { srv.close(); });
                        },
                        InformovatExtAgendu: function () {
                            var that = this;
                       
                            Gordic.Wfl.Dialogs.InformovatExtAgenduDlg(this, { IxsTyp: componentDto.IxsTyp }, Gordic.Global.Enums.ModOtevreni.showModalWindow)

                                .done(function (retVal) {
                                    if (retVal && retVal.IxsExt) {
                                        var opt = {
                                            Ixp: componentDto.ixp,
                                            IxsExt: retVal.IxsExt
                                        };

                                        var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                        srv.call("InformovatExtAgendu", opt)
                                            .done(function (retVal) {
                                                if (retVal.StavBool) {
                                                    that.tryReloadDetail(undefined, {
                                                        flashMessage: "jres:31937326", //RC 31937326 : Informace externí agendy / systému byla dokončena
                                                        flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                                    });
                                                }
                                            }).always(function () { srv.close(); });
                                    }
                            });
                         
                        },

                        znovupodatDokument: function () {
                            var l_sIxp = componentDto.ixp;
                            var that = this;
                            this.dialogs.confirm("jres:31937045", this.ZnovupodatRequest).on("closed", function (ev, retVal) { //RC 31937045 : Znovu podat
                                if (retVal) {
                                    if (retVal === "yes") {
                                        var opt = {
                                            "Ixp": l_sIxp
                                        };
                                        var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                        srv.call("ZnovupodatDokument", opt)
                                            .done(function (retVal) {
                                                if (retVal.StavBool) {
                                                    that.tryReloadDetail(undefined, {
                                                        flashMessage: "jres:31937046", //RC 31937046 : Úspěšně podáno
                                                        flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                                    });
                                                }
                                            }).always(function () { srv.close(); });
                                    }
                                }
                            });
                        },
                        prerusit: function (behaviour) {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var l_sId = "Pisemnost";

                            if (componentDto.IsSpis) {
                                l_sId = "Spis";
                            }
                            if (behaviour == "Prerusit") {
                                var options = {
                                    Ixp: l_sIxp,
                                    Dokument: l_sId,
                                    FlagHromadne: false,
                                    winTitle: this.PreruseniVyrizovaniWinTitle
                                };
                                var $div = Gordic.Ssl.Dialogs.PrerusitDokumentDlg(that, options, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                    if (retVal) {
                                        that.tryReloadDetail(undefined, {
                                            flashMessage: "jres:31937047", //RC 31937047 : Úspěšně přerušeno
                                            flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                        });
                                    }
                                });

                            } else {
                                var opt = { "Ixp": l_sIxp };

                                var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                srv.call("ObnovitDokument", opt)
                                    .done(function (retVal) {
                                        if (retVal.StavBool) {
                                            that.tryReloadDetail(undefined, {
                                                flashMessage: "jres:31937048", //RC 31937048 : Úspěšně obnoveno
                                                flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                            });
                                        }
                                    }).always(function () { srv.close(); });
                            }
                        },
                        ztratit: function (behaviour) {

                            var that = this;
                            var l_sIxp = componentDto.ixp;

                            if (behaviour == 'Ztratit') {

                                var options = {
                                    winTitle: this.DuvodZtratyDokumentuSpisuWinTitle,
                                    fieldLabel: "jres:26257254", //RC 26257254 : Číslo dokumentu, kterým je ztráta/poškození řešena
                                };
                                var $div = Gordic.Ssl.Dialogs.AddDuvodDlg(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                    if (retVal) {
                                        var options = { "Ixp": l_sIxp, "FlagZtratit": true, "Duvod": retVal.duvod };
                                        that.ztratit_call(options);
                                    }
                                });

                            } else {
                                var options = { "Ixp": l_sIxp, "FlagZtratit": false, "Duvod": "" };
                                that.ztratit_call(options);
                            }
                        },
                        ztratit_call: function (options) {
                            var that = this;
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("Ztratit", options)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {
                                        that.tryReloadDetail(undefined, {
                                            flashMessage: retVal.Message,
                                            flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                        });
                                    }
                                }).always(function () { srv.close(); });;
                        },

                        // 18.06.2019 - TFeik
                        // Pro vkládání do balíku použita preakce ze Spi.
                        //vlozitDoBaliku: function () {
                        //    var that = this;
                        //    var l_sIxp = componentDto.ixp;
                        //    // 18.06.2019 - TFeik
                        //    // Zapojení hledání balíku dle identifikátoru.
                        //    Gordic.Spi.Dialogs.GHledaniBalikuDleIdentifikatoruDlg(that)
                        //        .done(function (retValHledaniBalikuDleIdentifikatoru) {
                        //            if (retValHledaniBalikuDleIdentifikatoru) {
                        //                var l_sIxsZup;
                        //                if (retValHledaniBalikuDleIdentifikatoru[0]
                        //                    && !Gordic.Utils.GString.IsNullOrWhiteSpace(retValHledaniBalikuDleIdentifikatoru[0].ixs_zup))
                        //                {
                        //                    l_sIxsZup = retValHledaniBalikuDleIdentifikatoru[0].ixs_zup;
                        //                }
                        //                var options = { "Ixp": l_sIxp, "IxsZup": l_sIxsZup };

                        //                var srv = this.createServiceContent({ className: "Gordic.Ssl.WebClient.GDetailUtils", params: {} });  //servisni sluzba/content
                        //                srv.call("DotazZdaVlozitDoBalikuIParovyDokument", options)
                        //                    .done(function (retVal) {
                        //                        if (retVal.StavTxt) {
                        //                            retVal.l_sIxsZup = l_sIxsZup;
                        //                            retVal.l_sIxp = l_sIxp;
                        //                            that.vlozitDoBaliku_dotaz(retVal);
                        //                        }
                        //                    });
                        //            }
                        //        });

                        //},
                        //vlozitDoBaliku_dotaz: function (opt) {
                        //    var that = this;
                        //    if (opt.StavTxt && opt.Message) {
                        //        this.dialogs.confirm("?", opt.Message).on("closed", function (ev, retVal) {
                        //            if (retVal) {
                        //                if (retVal === "yes") {
                        //                    that.vlozitDoBaliku_work(opt);
                        //                }
                        //            }
                        //        });
                        //    }


                        //},
                        //vlozitDoBaliku_work: function (opt) {
                        //    var that = this;
                        //    var options = {
                        //        "Ixp": opt.l_sIxp,
                        //        "IxsZup": opt.l_sIxsZup,
                        //        "IxpParovehoDokumentu": opt.StavTxt
                        //    };

                        //    var srv = this.createServiceContentt({ className: "Gordic.Ssl.WebClient.GDetailUtils", params: {} });  //servisni sluzba/content
                        //    srv.call("VlozitDoBaliku", options)
                        //        .done(function (retVal) {
                        //            if (retVal.StavBool) {
                        //                that.tryReloadDetail(undefined, {
                        //                    flashMessage: "jres:31937049", //RC 31937049 : Vloženo do balíku
                        //                    flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                        //                });
                        //            }
                        //        });
                        //},
                        vyjmoutZBaliku: function () {
                            // 18.06.2019 - TFeik
                            // that nebylo definované.
                            var that = this;
                            var l_sIxp = componentDto.ixp;

                            var options = {
                                "Ixp": l_sIxp
                            };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("VyjmoutZBaliku", options)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {
                                        that.tryReloadDetail(undefined, {
                                            flashMessage: "jres:31937050", //RC 31937050 : Vyjmuto z balíku
                                            flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                        });
                                    }
                                })
                                .fail(function () {
                                    that.showFlash("jres:32170003", Gordic.Global.Enums.ColorStateClass.error); //RC 32170003 : Vyjmutí z balíku se nezdařilo.
                                }).always(function () { srv.close(); });
                        },
                        //vytvorBalik: function () {
                        //    //TODO
                        //    console.log("TODO vytvorBalik")
                        //    /*
                        //    var det = this.contentDiv;
                        //    var QueryString = "?Novy=a&CloseWin=a" + this.PrepareSpisPlanZnakQueryString();
                        //    var retVal = Spi_OtevriDetailBaliku(1, QueryString);
                        //    if (retVal != null) {
                        //        var l_sIxp = this.PIDTextBox.value;
                        //        var l_sIxsZup = retVal.values[0];
                        //        var l_oUserContext = { ctx: this, IxsZup: l_sIxsZup };
                        //        var l_oJSONPars = { "Ixp": l_sIxp, "IxsZup": l_sIxsZup };
                        //        callAsync("~/Gin/Ssl/WS/WSOperationSSL.asmx/DotazZdaVlozitDoBalikuIParovyDokument", l_oJSONPars, this.DotazVlozitDoBalikuIParovyDokumentOnSucceeded, null, l_oUserContext);
                        //    }
                        //    */
                        //},
                        kontrolaMetadat: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var options = { "Ixp": l_sIxp };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("KontrolaMetadatPrepare", options)
                                .done(function (retVal) {
                                    that.kontrolaMetadat_succes(retVal);
                                }).always(function () { srv.close(); });

                        },
                        kontrolaMetadat_succes: function (retVal) {
                            
                            this.hideFlash("KontrolaMetadatIdFlash");
                            if (!retVal.StavBool) {
                                this.actions[Gordic.Ssl.PreActions.Names.OpravitMetadataPoKontroleSeznam].update({ enabled: true });
                                this.actions[Gordic.Ssl.PreActions.Names.OpravitMetadataPoKontroleSeznam].run();

                                /* nejspíš 
                                this.showFlash({
                                    id: "KontrolaMetadatIdFlash",
                                    state: "error",
                                    content: retVal.Message
                                });
                                */


                                //var l_sIxp = componentDto.ixp;
                                //// thazmuka (24.05.2021) - úprava předání typu režimu
                                //// 3 - spis, 2 - dokument   
                                //var TypRezimu = componentDto.IsSpis == null ? 0 : componentDto.IsSpis === true ? 3 : 2; 
                                //var opt = {
                                //    Ixp: l_sIxp,
                                //    TypRezimu: TypRezimu
                                //};
                                //Gordic.Wfl.Dialogs.KontrolaMetadatDlg(that, opt).done(function (retVal) {
                                //    if (retVal && retVal.stav) {
                                //        that.tryReloadDetail(undefined, {
                                //            flashMessage: "jres:31937051", //RC 31937051 : Kontrola metadat dokončena.
                                //            flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                //        });
                                //    }
                                //});
                            }
                            else if (retVal.StavBool) {
                                this.tryReloadDetail(undefined, {
                                    flashMessage: "jres:26256691", //RC 26256691 : Kontrola metadat proběhla bez chyb.
                                    flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                });
                               
                            }
                            //_this.Reload();
                        },

                        // volano z vysich
                        vyridit: function (behaviour) {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            if (behaviour != "") {
                                var showDialog = true;
                                var aDokumentUrl = "";

                                var isDokument = componentDto.TypSpis == 0;
                                var isSpis = componentDto.TypSpis == 1;
                                var isSoucast = componentDto.TypSpis == 3 || componentDto.TypSpis == 5;
                                var isTS = componentDto.TypSpis == 2;
                                var isDil = componentDto.TypSpis == 4;


                                if(isDil) {
                                    this.dialogs.alert(26257295); //RC 26257295 : Díly jsou dle NSESSS vyřizovány automaticky na základě období zadané na věcné skupině.
                                    return;
                                } else if (isSoucast) {
                                    this.dialogs.confirm("?", "jres:26257296").on("closed", function (ev, retVal) { //RC 26257296 : Opravdu chcete uzavřít součást?
                                        if(retVal === "yes") {
                                            //that.vyriditSoucast();
                                        }
                                    });
                                } else if(isDokument) { // dokument

                                    var wflDBParams = Gordic.Wfl.WebClient.GetGWflDBParams();

                                    // SSL - Povinnost vyplnění spisového plánu a znaku na dokumentu
                                    if (wflDBParams.ssl_povin_spzn != null && wflDBParams.ssl_povin_spzn > 0) {
                                        if (componentDto.SpisZnak == null || componentDto.SpisZnak === "") {
                                            //RC 31937042 : Pozor
                                            this.dialogs.alert("jres:31937042", "jres:32000135");   //RC 32000135 : Není vyplněna povinná položka Spisový znak.
                                            return;
                                        }
                                    }

                                    var l_sVec = null;
                                    var field = this.findFields("vec");
                                    if (field) {
                                        l_sVec = field.gfield("getValue");
                                    }
                                    if (componentDto.PrizCj == 0) {
                                        this.dialogs.alert("jres:31937042", "jres:26256541");  //RC 31937042 : Pozor
                                        return;
                                    }

                                    if (!l_sVec) {
                                        showDialog = false;
                                        this.dialogs.alert("jres:31937042", this.VyrizeniVyplnitVecText); //RC 31937042 : Pozor

                                    }
                                } else { // spis
                                    if (this.VyrizeniSpZnWarnText) {
                                        this.dialogs.alert("jres:31937042", this.VyrizeniSpZnWarnText); //RC 31937042 : Pozor
                                    }

                                    var pocJinoagDok = this.JinoagDokCount;

									if (pocJinoagDok && pocJinoagDok != 0) {

                                        this.dialogs.confirm("?", this.VyriditSpisJineAgendyRequest + pocJinoagDok).on("closed", function (ev, retVal) { //RC 26256696 : Opravdu vytvořit duplikát s následným vložením do spisu?
                                            if (retVal === "yes") {
                                                that.vyriditShowDialog();
                                            }
                                        });
                                    }
                                }

                                if (showDialog) {
                                    that.vyriditShowDialog();
                                }
                            }
                        },
                        vyriditShowDialog: function () {

                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var opt = {
                                Ixp: l_sIxp
                            };

                            var promise  = Gordic.Ssl.Dialogs.GVyrizeniDlg(this, opt);
                            promise.done(function (retVal) {
                                if (retVal) {
                                    that.tryReloadDetail(undefined, {
                                        flashMessage: retVal.message, 
                                        flashMessageClass: retVal.stav === true ? Gordic.Global.Enums.ColorStateClass.success : Gordic.Global.Enums.ColorStateClass.important
                                    });
                                } else {
                                    that.tryReloadDetail();
                                }
								

                            });
                        },


                        zmenaTerVyrizeni: function (DatVyrizDoField, DatVyrizDoOrig, LhutaTypDok) { // vola se jako static (nejsou k dispozici content values)
                            //(DatVyrizDoTextBox, DatVyrizDoOrigTxt, LhutaTypDok)
                            /*  ZmenaTerVyrizeni: function (pSpis) {
                                  var DatVyrizIdTxt = "";
                                  if (pSpis == 1) {
                                      DatVyrizIdTxt = m_oDatVyrizDoTextBoxCID;
                                  } else {
                                      DatVyrizIdTxt = m_oDatVyrDoTextBoxCID;
                                  }

                                  var DatVyrizDoTextBox = document.getElementById(DatVyrizIdTxt);*/

                            var ZmTerVyrRealized = false;
                            var DatVyrizDo = DatVyrizDoField.gfield("getValue");
                            if (DatVyrizDoField && DatVyrizDoField.length > 0 &&  DatVyrizDo) {
                                if (DatVyrizDoOrig) {
                                    // porovná zda došlo ke změněn  funguje nějak divně žýe nebere v potaz časové pásma ale v momentě psaní jsme přesně todle potřebovali.
                                    if (new Date(DatVyrizDoOrig).toDateString() !== DatVyrizDo.toDateString()) {
                                        ZmTerVyrRealized = true;
                                    }
                                } else {
                                    ZmTerVyrRealized = false;
                                }
                                if (ZmTerVyrRealized) {
                                    var OneDayMiliSeconds = 24 * 60 * 60 * 100;
                                    var ParSslZmenaLhuty = componentDto.ssl_zmena_lhuty;

                                    if (ParSslZmenaLhuty == 1) { // Povolena zmena max. do lhuty zadane na typu pisemnosti.
                                        if (LhutaTypDok != 0) { // pokud je typ dok bez terminu, umoznim neomezenou zmenu terminu, jinak provedu kontrolu
                                            if ((DatVyrizDoOrig.getTime() + (LhutaTypDok * OneDayMiliSeconds)) < DatVyrizDo.getTime()) {
                                                DatVyrizDoField.gfield("setValue", DatVyrizDoOrig);
                                                ZmTerVyrRealized = false;
                                                $.content(DatVyrizDoField).dialogs.alert("jres:26255239" + LhutaTypDok + "jres:26255240"); //RC 26255239 : Není povoleno měnit termín vyřízení dokumentu/spisu o více než
                                            }
                                        }
                                    }
                                    if (ParSslZmenaLhuty == 2) { // Povolena zmena do 60 dnu.
                                        if ((DatVyrizDoOrig.getTime() + (60 * OneDayMiliSeconds)) < DatVyrizDo.getTime()) {
                                            DatVyrizDoField.gfield("setValue", DatVyrizDoOrig);
                                            ZmTerVyrRealized = false;
                                            $.content(DatVyrizDoField).dialogs.alert("jres:26255241"); //RC 26255241 : Není povoleno měnit termín vyřízení dokumentu/spisu o více než 60 dnů!
                                        }
                                    }
                                    if (ParSslZmenaLhuty == 3) { // Zmena neni povolena.
                                        DatVyrizDoField.gfield("setValue", DatVyrizDoOrig);
                                        ZmTerVyrRealized = false;
                                        $.content(DatVyrizDoField).dialogs.alert("jres:26255242"); //RC 26255242 : Není povoleno měnit termín vyřízení dokumentu/spisu!
                                    }
                                }
                            }
                            return ZmTerVyrRealized;
                        },

                        //#endregion

                        //#region společné funkce pro Sbernyarch na spisu a dokument



                        dotazIRPNaVlozeniDokumentuDoSpisu: function (IxpSpis, IxpDok) { // toto bych mel nejak sdilet s contentem sberneho archu
                            var that = this;
                            var opt = {
                                "IxpSpis": IxpSpis,
                                "IxpDok": IxpDok
                            };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("ZobrazitDotazIRPPriVkladaniDokumentuDoSpisu", opt)
                                .done(function (retVal) {
                                    that.dotazIRPNaVlozeniDokumentuDoSpisuOnSucceeded(retVal, opt);
                                }).always(function () { srv.close(); });

                        },
                        dotazIRPNaVlozeniDokumentuDoSpisuOnSucceeded: function (result, opt) {
                            var that = this;
                            //var l_sCes = userContext.ces;


                            var succesFun = function (l_nSetRP, opt, prebratZeSpisu) {
                                that.vlozitDoSpisuSubmit(l_nSetRP, opt, prebratZeSpisu);
                            };

                            var dotazNaPrevzatiIrpPrav = function (l_nSetRP, options) {

                                var prebratZeSpisu = 0;
                                if (result.BoolParam1
                                    && ((!result.StavBool) || (result.StavBool && l_nSetRP == 1)) // tady pokud by si to uživatel rozmyslel, a v předchozí otázce máčkl ne, tak to nebude dávat smysl tato otázka 
                                ) {
                                    options.content.dialogs.confirm("jres:31937466", //RC 31937466 : Dotaz
                                        "jres:31937465").on("closed", function (ev, retVal) { //RC 31937465 : Přejete si převzít všechna práva ze spisu do kterého je dokument vkládán?
                                            if (retVal === "yes") {
                                                prebratZeSpisu = 1;
                                            }
                                            succesFun(l_nSetRP, options, prebratZeSpisu);
                                        });
                                } else {
                                    succesFun(l_nSetRP, options, prebratZeSpisu);
                                }
                            };


                            var l_nSetRP = 0;
                            if (result.StavBool) {
                                that.dialogs.confirm("jres:26256644", "jres:Gordic.Ssl.WebClient:26256444").on("closed", function (ev, retVal) { //RC 26256644 : Řízený přístup
                                    if (retVal === "yes") {
                                        l_nSetRP = 1;
                                    }
                                    dotazNaPrevzatiIrpPrav(l_nSetRP, opt);
                                });
                            } else {
                                dotazNaPrevzatiIrpPrav(l_nSetRP, opt);
                            }

                        },

                        vlozitDoSpisuSubmit: function (pNastaveniRP, opt, prebratZeSpisu) {
                            var that = this;
                            var l_sSetRPValue = "";

                            if (pNastaveniRP == 1) {
                                l_sSetRPValue = "NastaveniRP";
                            }

                            this.IDSpisVlozitDoSpisu = this.IDSpisVlozitDoSpisu + "|" + l_sSetRPValue;
                            var l_sIxp = opt.IxpDok;
                            this.vlozitVyjmoutZeSpisu(true, l_sIxp, prebratZeSpisu);
                        },

                        vlozitVyjmoutZeSpisu: function (FlagVlozit, ixpDok, prebratZeSpisu) {
                            var that = this;

                            var opt = {
                                "Ixp": ixpDok,
                                "FlagVlozit": FlagVlozit,
                                "IDSpisVlozitDoSpisu": this.IDSpisVlozitDoSpisu,
                                "PrebratZeSpisu": prebratZeSpisu != null ? prebratZeSpisu : 0
                            };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("VlozitVyjmoutZeSpisu", opt)
                                .done(function (retVal) {
                                    that.vlozitVyjmoutZeSpisuOnSucceeded(retVal, FlagVlozit);
                                }).always(function () { srv.close(); });
                        },
                        vlozitVyjmoutZeSpisuOnSucceeded: function (retVal, FlagVlozit) {
                            var that = this;
                            this.IDSpisVlozitDoSpisu = "";
                            var l_bReloadEnabled = false;
                            if (retVal.StavBool) {
                                var l_bReloadEnabled = true;
                                if (retVal.Script) {
                                    l_bReloadEnabled = false;
                                    switch (retVal.Script) {
                                        case "vlozitVyjmoutParovyDokumentDoSpisu":
                                            that.dialogs.confirm("jres:31937052", retVal.StrParam1).on("closed", function (ev, odpoved) { //RC 31937052 : Párový dokument
                                                if (odpoved === "yes") {
                                                    that.vlozitVyjmoutParovyDokumentDoSpisu(retVal.StrParam2, retVal.StrParam3, retVal.BoolParam1);
                                                }
                                            });
                                            break;
                                    }
                                }
                            } else {
                                that.dialogs.alert("jres:31937053", //RC 31937053 : Nepovedlo se
                                    FlagVlozit ? "jres:31937054" //RC 31937054 : Písemnost nelze vložit do spisu.
                                        : "jres:31937055"); //RC 31937055 : Písemnost nelze vyjmout ze spisu.
                                l_bReloadEnabled = false;
                            }
                            if (l_bReloadEnabled) {
                                that.tryReloadDetail();
                            }
                        },

                        vlozitVyjmoutParovyDokumentDoSpisu: function (ixpDok, ixpSpis, flagVlozit) {
                            var that = this;
                            var opt = { "IxpDok": ixpDok, "IxpSpis": ixpSpis, "FlagVlozit": flagVlozit };

                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("VlozitVyjmoutParovyDokumentDoSpisu", opt)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {
                                        that.tryReloadDetail();
                                    }
                                }).always(function () { srv.close(); });

                        },

                        ulozitSpis: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;

                            var options = {
                                Ixp: l_sIxp,
                                winTitle: this.UlozeniSpisuWinTitle
                            };
                            Gordic.Ssl.Dialogs.DetailUlozitSpisDlg(this, options).on("closed", function (ev, retVal) {
                                if (retVal) {
                                    that.tryReloadDetail();
                                }
                            });
                        },

                        showWinVyberDeniku: function (model) {
                            var that = this;
                            var def = $.Deferred();
                            Gordic.Ssl.Dialogs.VyberDenikuDlg(this, {}, 'showWindow').on("closed", function (ev, retVal) {
                                if (retVal) {
                                    var denikToSave = retVal.denik + "|" + retVal.poradi + "|" + retVal.rok;
                                    //that.selectedDenikToSave = denikToSave;
                                   
                                    // znovu pustím funkci evidovat
                                    //that.evidovat(); // puvodni řešení

                                    that.flagEvidovat = true;
                                    // přeuložím do modelu
                                    model.FlagEvidovat = that.flagEvidovat;
                                    model.SelectedDenik = denikToSave;
                                    def.resolve(model);
                                } else {
                                    that.flagEvidovat = false;
                                    def.reject();
                                }
                            });
                            return def.promise();
                        },

                        //pridavatAOdebiratFormulare: function () {
                        //    var that = this;
                        //    var opt = {
                        //        Ixp: componentDto.ixp
                        //    };

                        //    Gordic.Wfl.Dialogs.NastavFormulareKDokumentuDlg(this, opt, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                        //        .done(function (retval) {
                        //            if (retval && retval.isSaved) {
                        //                that.tryReloadDetail();
                        //            }
                        //        }
                        //    );

                        //},

                        zmenitStupenUtajeni: function () {
                            
                            var that = this;
                            var stupenUtajeniDto = {
                                StuUtajId: componentDto.StUtajIdWfl,
                                Duvod: undefined,
                                VsechnyStupneUtajeni: componentDto.IsSpis ? true : false
                            };
                            Gordic.Wfl.Dialogs.StupenUtajeniDlg({ parentContent: this, opt: { dto: stupenUtajeniDto }, ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow })
                                .done(function (data) {
                                    if (data && data.stupenUtajeniDto) {
                                        var opt = {
                                            "Ixp": componentDto.ixp,
                                            "DatZmena": componentDto.DatZmena,
                                            "StUtajId": data.stupenUtajeniDto.StuUtajId,
                                            "Duvod": data.stupenUtajeniDto.Duvod,
                                            "Platnost": data.stupenUtajeniDto.Platnost
                                        };
                                        var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                        srv.call("ZmenitStupenUtajeni", opt)
                                            .done(function (retVal) {
                                                if (retVal.StavBool) {
                                                    var mess = "jres:31937218"; //RC 31937218 : Došlo ke změně stupně utajení. 
                                                    if (data.stupenUtajeniDto.ZmenilaSePouzePlatnostNeboDuvod) {
                                                        mess = "jres:31937420" //RC 31937420 : Došlo ke změně platnosti nebo důvodu stupně utajení.
                                                    }
                                                    that.tryReloadDetail(undefined, {
                                                        flashMessage: mess, //RC 31937218 : Došlo ke změně stupně utajení. 
                                                        flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                                    });
                                                }
                                            }).always(function () { srv.close(); });
                                    }
                                });
                        },

                        nastavitPriznakZobrazitelnostiZastupemIRP: function () {
                            var that = this;
                            var dtoinput = {
                                PrizZobZast: componentDto.PrizZobZast,
                                Duvod: undefined
                            };
                            Gordic.Wfl.Dialogs.NastaveniPrizZobZastupemDlg({ parentContent: this, opt: { dto: dtoinput }, ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow })
                                .done(function (data) {
                                    if (data && data.outputDto != null && data.outputDto.PrizZobZast != null) {
                                        var opt = {
                                            "Ixp": componentDto.ixp,
                                            "DatZmena": componentDto.DatZmena,
                                            "PrizZobZast": data.outputDto.PrizZobZast,
                                            "Duvod": data.outputDto.Duvod
                                        };
                                        var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                        srv.call("NastavitPriznakZobrazitelnostiZastupemIRP", opt)
                                            .done(function (retVal) {
                                                if (retVal.StavBool) {
                                                    var mess = "jres:31937497"; //RC 31937497 : Došlo k nastavení příznaku zobrazitelnosti zastupem IRP
                                                    that.tryReloadDetail(undefined, {
                                                        flashMessage: mess, //RC 31937218 : Došlo ke změně stupně utajení. 
                                                        flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                                    });
                                                }
                                            }).always(function () { srv.close(); });
                                    }
                                });
                        },

                        tiskSablonyKonvenceGoridc: function () {
                            var that = this;
                            this.beginOperation();
                            var opt = {
                                ixp: componentDto.ixp,
                            };
                            var type = componentDto.IsSpis ? 1 : 0;
                            var srv = that.createServiceContent( "Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("GetDataGDocumentDataSet", opt)
                                .done(function (retVal) {
                                    if (retVal && retVal.Main && retVal.Main.length > 0) {
                                        var dataProTeplates = retVal.Main[0];
                                        var dialogSablony = that.dialogs.showModalWindow(['Gordic.Report.WebClient.GTemplatesControl'], { ID: "GTemplatesControl", data: JSON.stringify(dataProTeplates), type: type }, "", 800, 500);

                                        dialogSablony.on("closed", function (retValZESablon, retValzZeSablon) {
                                            if (retValzZeSablon != null && (retValzZeSablon.isMainAttachment || retValzZeSablon.isNewAttachment)){
                                                var textdoFlashe = "jres:31937237"; //RC 31937237 : Šablona byla uložena jako příloha
                                                if (retValzZeSablon.isMainAttachment) {
                                                    textdoFlashe = "jres:31937238"; //RC 31937238 : Šablona byla uložena jako hlavní příloha
                                                }

                                                that.tryReloadDetail(undefined, {
                                                    flashMessage: textdoFlashe,
                                                    flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                                });

                                            }
                                        });
                                    }
                                })
                                .always(function () {
                                    that.endOperation();
                                    srv.close();
                                })
                                ;


                           

                            //<Templates-directory>C:\test\GINIS_FRM_sablony_konvence_gordic_ukazka_new</Templates-directory>
                        },

                        zrusitOdeslaniJakoOriginalu: function () {

                            var that = this;
                            var options = {
                                winTitle: "jres:31937293" //RC 31937293 : Důvod zrušení odeslání
                            };
                            Gordic.Ssl.Dialogs.AddDuvodDlg(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                if (retVal && retVal.duvod) {
                                    var opt = {
                                        ixp: componentDto.ixp,
                                        duvod: retVal.duvod,
                                        datZmena: componentDto.DatZmena

                                    };
                                    var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                    srv.call("ZrusOdeslaniJakoOriginal", opt)
                                        .done(function (retValZrus) {
                                            if (retValZrus.StavBool) {
                                                that.tryReloadDetail(undefined, {
                                                    flashMessage: "jres:31937294", //RC 31937294 : Proběhlo zrušení odeslání jako originál
                                                    flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                                });
                                            }
                                        }).always(function () { srv.close(); });
                                }
                            });
                        },


                        doloznkaNabytiPravniMoci: function () {
                            var that = this;
                            this.beginOperation();
                            var opt = {
                                ixp: componentDto.ixp,
                            };
                            var type = 2;
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");
                            this.beginOperation("jres:31937597") //RC 31937597 : Probíhá vytvoření doložky
                            srv.call("GetDataGDocumentDataSet", opt)
                                .done(function (retVal) {
                                    that.endOperation();
                                    if (retVal && retVal.Main && retVal.Main.length > 0) {
                                        var dataProTeplates = retVal.Main[0];
                                        var dialogSablony = that.dialogs.showModalWindow(['Gordic.Report.WebClient.GTemplatesControl'], { ID: "GTemplatesControl", data: JSON.stringify(dataProTeplates), type: type }, "", 800, 500);

                                        dialogSablony.on("closed", function (retValZESablon, retValzZeSablon) {
                                            var dto = {
                                                DownloaderType: "Gordic.Wfl.WebClient.WflGuidDownloader",
                                                UploaderType: "Gordic.Wfl.WebClient.WflGuidUploader",
                                                EnableSaving: true,
                                                AutoUpload: true,
                                                Context: { "signer": Gordic.Gin.WebClient.DefaultSigner },
                                                CustomData: {
                                                    "Guid": retValzZeSablon.guid
                                                }
                                            };

                                            var doc = new GDocument(that);
                                            that.log.trace("zobrazitZpravuFinalPresDoplnek guid:" + retValzZeSablon.guid);
                                            that.beginOperation("jres:31937598");    //RC 31937598 : Dokument doložky se zpracovává
                                            doc.downloadDocument(dto)
                                                .then(function (ret1) {
                                                    that.endOperation();
                                                    that.hideFlash("pfupdwn");
                                                    if (ret1 != null && ret1.CustomData != null && ret1.CustomData.GuidEditovany != null) {
                                                        that.beginOperation("jres:31937598") //RC 31937598 : Dokument doložky se zpracovává
                                                        return Gordic.Isl.Sslspid.pripravSouborDolozky({
                                                            Data: {
                                                                FileinfoInput: {
                                                                    guid: ret1.CustomData.GuidEditovany,
                                                                    filename: ret1.CustomData.fileName
                                                                },
                                                                Ixp: componentDto.ixp
                                                            }
                                                        }).get()

                                                        //that.tryReloadDetail(undefined, {
                                                        //    flashMessage: textdoFlashe,
                                                        //    flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                                        //});
                                                    } else {
                                                        that.dialogs.alert(
                                                            "jres:31937603", //RC 31937603 : Tvorba doložky
                                                            "jres:31937605" //RC 31937605 : Doložku se nepodařilo vytvořit
                                                        );
                                                        return $.Deferred().reject().promise();
                                                    }

                                                })
                                                .then(function (ret2) {
                                                    that.endOperation();
                                                    if (ret2 != null && ret2.Data != null && ret2.Data.FileinfoResponse != null && ret2.Data.FileinfoResponse.guid != null) {
                                                        that.beginOperation("jres:31937600"); //RC 31937600 : Probíhá pdepsání nově vytvořené hlavní přílohy s doložkou.
                                                        var localGsgn = new Gordic.Wfl.WebClient.GByteSigner();
                                                        return localGsgn.sign
                                                            ({
                                                                file: ret2.Data.FileinfoResponse.guid,
                                                                fileName: ret2.Data.FileinfoResponse.filename,
                                                                signTime: new Date(),
                                                                //signWithTimeStamp: dto.SignWithTimeStamp ? true : false,

                                                                idSigningReason: componentDto.IxsDpoDolozka,
                                                            }, { title: "jres:31937596" }) //RC 31937596 : Výběr certifikátu pro tvorbu doložky
                                                    } else {
                                                        that.dialogs.alert(
                                                            "jres:31937603", //RC 31937603 : Tvorba doložky
                                                            "jres:31937604" //RC 31937604 : Spojení doložky s původním dokumentem se nezdařilo
                                                        );
                                                        return $.Deferred().reject().promise();
                                                    }

                                                })
                                                .then((signedConfig) => {
                                                    that.endOperation();
                                                    that.beginOperation("jres:31937599") //RC 31937599 : Dokument se ukládá jako hlavní příloha
                                                    if (signedConfig != null && signedConfig.guid != null) { 
                                                        return Gordic.Isl.Sslspid.ulozeniSouboruDolozky({
                                                            Data: {
                                                                FileinfoInput: {
                                                                    guid: signedConfig.guid
                                                                },
                                                                Ixp: componentDto.ixp
                                                            }
                                                        }).get();
                                                    } else {
                                                        that.dialogs.alert(
                                                            "jres:31937603", //RC 31937603 : Tvorba doložky
                                                            "jres:31937606" //RC 31937606 : Podepsání doložky se nezdařilo
                                                        );
                                                        return $.Deferred().reject().promise();
                                                    }
                                                })
                                                .then((retVys) => {
                                                    that.endOperation();
                                                    if (retVys != null && retVys.Data != null && retVys.Data.Vysledek != null && retVys.Data.Vysledek) {
                                                        that.tryReloadDetail(undefined, {
                                                            flashMessage: "jres:31937601", //RC 31937601 : Doložka byla uložena jako nová verze hlavní přílohy
                                                            flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                                                        });
                                                    } else {
                                                        that.dialogs.alert(
                                                            "jres:31937603", //RC 31937603 : Tvorba doložky
                                                            "jres:31937607" //RC 31937607 : Finální uložení doložky se nezdařilo
                                                        );
                                                    }
                                                })
                                                .fail(function () {
                                                    that.endOperation();
                                                });
                                        });
                                    }
                                })
                                .always(function () {
                                    that.endOperation();
                                    srv.close();
                                })
                                ;




                            //<Templates-directory>C:\test\GINIS_FRM_sablony_konvence_gordic_ukazka_new</Templates-directory>
                        },
                        //#endregion


                        enableSslDetail: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }
                            var wflDBParams = Gordic.Wfl.WebClient.GetGWflDBParams();
                            this.actions.actEditovat.update({
                                caption: !l_bActionEnabled ? "jres:26255621" : "jres:31937001", //this.EditMode ? //RC 31937001 : Editovat
                                icon: !l_bActionEnabled ? "gi-window-close" : "gi-pencil" //this.EditMode ?
                            });
                            //, customclass: obj.EditMode ? "gi-save g-button--primary" : "gi-save"
                            
                            this.actions.actUlozitZmeny.update({ enabled: !l_bActionEnabled /* primary: this.EditMode ? true : false*/ });

                            //#region Dokument
                            if (l_bActionEnabled && componentDto.IsSpis) {
                                this.actions.actPodaniVlastni.update({
                                    caption: "jres:31937241", //RC 31937241 : Nový vlastní
                                    tooltip: "jres:26255487" //RC 26255487 : Nové podání vlastního dokumentu s následným vložením do spisu
                                }); 
                                this.actions.actPodaniCizi.update({
                                    caption: "jres:31937242", //RC 31937242 : Nový doručený (cizí)
                                    tooltip: "jres:26255488" //RC 26255488 : Nové podání doručeného (cizího) dokumentu s následným vložením do spisu
                                }); 
                            }
                            this.actions.actPodaniVlastni.update({ enabled: (l_bActionEnabled && !componentDto.ZakazatPodaniSSLComponent && ((wflDBParams && wflDBParams.gin_rad_konao === 1) ? true : false) ) });
                            this.actions.actPodaniCizi.update({ enabled: (l_bActionEnabled && !componentDto.ZakazatPodaniSSLComponent && ((wflDBParams && wflDBParams.gin_rad_konao === 1 && wflDBParams.usu_pod_cizi === 1) ? true : false) ) });

                            this.actions.actSouvisejiciUkol.update({ enabled: (l_bActionEnabled && componentDto.LzeVytvoritSouvisejiciUkol) });
                            this.actions.actPridatDoPoznamkovehoBloku.update({ enabled: l_bActionEnabled });
                            this.actions.actOdeslatEmailem.update({ enabled: l_bActionEnabled && componentDto.LzeOdeslatNedokladovane });

                            // sekce pro SSD 

                            this.actions.actPridatDoPoznamkovehoBloku.update({ visible: this.SimpleMode ? false : true });
                            this.actions.actSouvisejiciUkol.update({ visible: this.SimpleMode ? false : true });
                            //#endregion

                            //#region Zobrazit
                            this.actions.actZmenyPolozek.update({ enabled: l_bActionEnabled });
                            //#endregion

                            //#region Činnosti
                            this.actions.actNabytPravMoc.update({ enabled: (l_bActionEnabled && componentDto.LzeNabytPravniMoc) });

                            this.actions.actDoloznkaNabytiPravniMoci.update({ enabled: (l_bActionEnabled && componentDto.LzeElObrazVytvoritDolozkuAPodepsatDoPdf) });
                            this.actions.actDoloznkaNabytiPravniMoci.update({ visible: (l_bActionEnabled && componentDto.LzeElObrazVytvoritDolozkuAPodepsatDoPdf) });

                            this.actions.actStornovat.update({ enabled: (l_bActionEnabled && componentDto.LzeStornovat) });

                            this.actions.actZrusitStorno.update({ enabled: (l_bActionEnabled && componentDto.LzeOdStornovat) });
                            this.actions.actZrusitStorno.update({ visible: componentDto.LzeOdStornovat ? true : false });


                            //actPredatPrevzitExtAg
                            var captionPrevzitPredat = "jres:31937254"; //RC 31937254 : Předat/převzít externí agenda
                            var actPredatPrevzitEnabled = true;
                            var rezim = 'Predat';
                            if (l_bActionEnabled && componentDto.LzePrevzitZEA) {
                                captionPrevzitPredat = "jres:26255971"; //RC 26255971 : Převzít z externí agendy
                                rezim = 'Prevzit';
                            } else if (l_bActionEnabled && componentDto.LzePredatDoEA) {
                                captionPrevzitPredat = "jres:26255969"; //RC 26255969 : Předat do externí agendy
                                rezim = 'Predat';
                            } else {
                                actPredatPrevzitEnabled = false;
                            }
                            this.actions.actPredatPrevzitExtAg.rezim = rezim;
                            this.actions.actPredatPrevzitExtAg.update({ enabled: actPredatPrevzitEnabled, caption: captionPrevzitPredat });

                            this.actions.actInformovatExtAgendu.update({ enabled: (l_bActionEnabled && componentDto.LzeInformovatEA) });

                            this.actions.actZnovupodat.update({ enabled: (l_bActionEnabled && componentDto.LzeZnovupodat) });
                            this.actions.actZnovupodat.update({ visible: !componentDto.IsSpis});

                            //actPrerusitObnovit
                            var captionPrerusit = "jres:26255158"; //RC 26255158 : Přerušit
                            var icon = "fa-pause-circle-o";
                            var actPrerusitEnabled = true;
                            var rezimPrerusit = 'Obnovit';
                            if(l_bActionEnabled && componentDto.LzeObnovit) {
                                captionPrerusit = "jres:26255326"; //RC 26255326 : Obnovit
                                icon = ["fa-pause-circle-o", "fa-remove g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"];
                                rezimPrerusit = 'Obnovit';
                            } else if(l_bActionEnabled && componentDto.LzePrerusit) {
                                captionPrerusit = "jres:26255158"; //RC 26255158 : Přerušit
                                rezimPrerusit = 'Prerusit';
                            } else {
                                actPrerusitEnabled = false;
                            }
                            this.actions.actPrerusitObnovit.rezim = rezimPrerusit;
                            this.actions.actPrerusitObnovit.update({ enabled: actPrerusitEnabled, icon: icon, caption: captionPrerusit });

                            //actZtratitNalezt
                            var captionZtratit = "jres:26255333"; //RC 26255333 : Ztratit
                            var icon = "fa-ban";
                            var actZtratitEnabled = true;
                            var rezimZtratit = '';
                            if (l_bActionEnabled && componentDto.LzeNalezt) {
                                captionZtratit = "jres:26255332"; //RC 26255332 : Nalézt
                                icon = ["fa-ban", "fa-remove g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"];
                                rezimZtratit = '';
                            } else if (l_bActionEnabled && componentDto.LzeZtratit) {
                                captionZtratit = "jres:26255333"; //RC 26255333 : Ztratit
                                rezimZtratit = 'Ztratit';
                            } else {
                                actZtratitEnabled = false;
                            }
                            this.actions.actZtratitNalezt.rezim = rezimZtratit;
                            this.actions.actZtratitNalezt.update({ enabled: actZtratitEnabled, icon: icon, caption: captionZtratit, rezim: rezimZtratit });

                        

                            this.actions.actVlozitDoBaliku.update({ enabled: (l_bActionEnabled && componentDto.LzeVlozitDoBaliku) });
                            this.actions.actVyjmoutZBaliku.update({ enabled: (l_bActionEnabled && componentDto.LzeVyjmoutZBaliku) });
                            this.actions.actVytvoritBalik.update({ enabled: (l_bActionEnabled && componentDto.LzeVlozitDoBaliku) });


                           
                            this.actions.actZmenaSpouUdalosti.update({
                                enabled: (
                                    l_bActionEnabled
                                    && (
                                        (componentDto.gin_n23_vecsk == 0 && componentDto.LzeEditovatSpousteciUdalostPoUzavreni)
                                        || (componentDto.gin_n23_vecsk == 1 && componentDto.LzeEditovatSpousteciUdalostNsesss2023)
                                    )
                                )
                            });

                            this.actions.actKontrolaMetadat.update({ visible: (l_bActionEnabled && componentDto.KontrolaMetadatEnabled && (wflDBParams.IsUkraine !== true)) });
                            this.actions[Gordic.Ssl.PreActions.Names.OpravitMetadataPoKontroleSeznam].update({ visible: (l_bActionEnabled && componentDto.KontrolaMetadatEnabled && (wflDBParams.IsUkraine !== true)) });

                            //this.actions.actPridavatAOdebiratFormulare.update({ visible: (l_bActionEnabled && componentDto.LzePridavatAOdebiratFormulare) });
                            

                            this.actions.actZmenitStupenUtajeni.update({ visible: componentDto.ZmenitStupenUtajeniVisible });
                            this.actions.actZmenitStupenUtajeni.update({ enabled: (l_bActionEnabled && componentDto.ZmenitStupenUtajeniEnabled) });

                            this.actions.actNastavitPriznakZobrazitelnostiZastupemIRP.update({ visible: componentDto.ZmenitStupenUtajeniVisible });
                            this.actions.actNastavitPriznakZobrazitelnostiZastupemIRP.update({ enabled: (l_bActionEnabled && componentDto.ZmenitStupenUtajeniEnabled) });

                            this.actions.actTiskSablonyGordic.update({ visible: (l_bActionEnabled && componentDto.Usu_rp_sablony == 1) });
                            this.actions.actTiskSablonyGordic.update({ enabled: ((l_bActionEnabled && componentDto.Usu_rp_sablony == 1) && (wflDBParams && wflDBParams.gin_rad_konao === 1) ? true : false) });

                            this.actions.actZrusitOdeslaniOriginalu.update({ visible: (l_bActionEnabled && componentDto.LzeZrusOdeslaniJakoOriginalVisible) });
                            this.actions.actZrusitOdeslaniOriginalu.update({ enabled: (l_bActionEnabled && componentDto.LzeZrusOdeslaniJakoOriginalEnable) });

                          
                            this.actions.actTiskSablonyWord.update({ enabled: (wflDBParams && wflDBParams.gin_rad_konao === 1) ? true : false });

                            this.actions.actVystupAct.update({ enabled: l_bActionEnabled });
                            this.actions.actVystupActSpis.update({ enabled: l_bActionEnabled }); 
                            if (componentDto.TypSpis == 1 && componentDto.gin_n23_vedd == 1) {
                                this.actions.actVystupAct.update({ visible: false });
                            } else {
                                this.actions.actVystupActSpis.update({ visible: false}); 
                            }

                            

                            //#endregion

                            var isTS = componentDto.TypSpis == 2;
                            var isSoucast = componentDto.TypSpis == 3 || componentDto.TypSpis == 5;
                            var isDil = componentDto.TypSpis == 4;

                            if(isTS || isSoucast || isDil) {
                              //  this.actions.actEditovat.update({ visible: false, enabled: false });
                              //  this.actions.actUlozitZmeny.update({ visible: false, enabled: false });

                                //#region Dokument
                                this.actions.actPodaniVlastni.update({ visible: false, enabled: false });
                                this.actions.actPodaniCizi.update({ visible: false, enabled: false });

                                this.actions.actSouvisejiciUkol.update({ visible: false, enabled: false });
                                this.actions.actPridatDoPoznamkovehoBloku.update({ visible: false, enabled: false });
                                this.actions.actOdeslatEmailem.update({ visible: false, enabled: false });

                                // sekce pro SSD 
                                this.actions.actSouvisejiciUkol.update({ visible: false, enabled: false });
                                //#endregion

                                //#region Zobrazit
                                this.actions.actZmenyPolozek.update({ enabled: l_bActionEnabled });
                                //#endregion

                                //#region Činnosti
                                this.actions.actNabytPravMoc.update({ visible: false, enabled: false });
                                this.actions.actDoloznkaNabytiPravniMoci.update({ visible: false, enabled: false });
                                this.actions.actStornovat.update({ visible: false, enabled: false });
                                this.actions.actZrusitStorno.update({ visible: false, enabled: false });
                                this.actions.actPredatPrevzitExtAg.update({ visible: false, enabled: false });
                                this.actions.actInformovatExtAgendu.update({ visible: false, enabled: false });
                                this.actions.actZnovupodat.update({ visible: false, enabled: false });
                                this.actions.actPrerusitObnovit.update({ visible: false, enabled: false });
                                this.actions.actZtratitNalezt.update({ visible: false, enabled: false });
                                this.actions.actVlozitDoBaliku.update({ visible: false, enabled: false });
                                this.actions.actVyjmoutZBaliku.update({ visible: false, enabled: false });
                                this.actions.actVytvoritBalik.update({ visible: false, enabled: false });
                                this.actions.actZmenaSpouUdalosti.update({ visible: false, enabled: false });

                                this.actions.actKontrolaMetadat.update({ visible: false, enabled: false });
                                this.actions[Gordic.Ssl.PreActions.Names.OpravitMetadataPoKontroleSeznam].update({ visible: false, enabled: false });

                                this.actions.actZmenitStupenUtajeni.update({ visible: false, enabled: false });
                                this.actions.actZmenitStupenUtajeni.update({ visible: false, enabled: false });

                                this.actions.actNastavitPriznakZobrazitelnostiZastupemIRP.update({ visible: false, enabled: false });
                                this.actions.actNastavitPriznakZobrazitelnostiZastupemIRP.update({ visible: false, enabled: false });

                                this.actions.actTiskSablonyGordic.update({ visible: false, enabled: false });
                                this.actions.actTiskSablonyWord.update({ visible: false, enabled: false });

                                this.actions.actZrusitOdeslaniOriginalu.update({ visible: false, enabled: false });
                                this.actions.actZrusitOdeslaniOriginalu.update({ visible: false, enabled: false });

                            }
                        }

                    },

                    actions: { //může být zadáno jako pole nebo jako objekt
                        actEditovat: {
                            caption: "jres:31937001", //RC 31937001 : Editovat
                            icon: "gi-pencil",
                            enabled: componentDto.LzeEditacniRezimPovolen,
                            run: function () {
                                $.content(this).zmenaEditace();
                            }
                        },
                        /*
                        actObcerstvit: {
                            caption: "jres:26255299", //RC 26255299 : Občerstvit
                            icon: "gi-refresh",
                            run: function () {
                                $.content(this).obcerstvit();
                            }
                        },
                        */
                        actUlozitZmeny: {
                            caption: "jres:26255270", //RC 26255270 : Uložit
                            icon: "gi-save",
                            //customClass: /*this.EditMode */ true ? " g-button--primary " : "" ,
                            run: function () {
                                $.content(this).ulozitZmeny();
                            }
                        },

                        //#region Dokument
                        actPodaniVlastni: {
                            caption: "jres:26255314", //RC 26255314 :  Podání vlastního dokumentu
                            icon: "gi-doc_vlastni |fa-plus g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw",
                            run: function () {
                                $.content(this).vlastniPisemnost();
                            }
                        },
                        actPodaniCizi: {
                            caption: "jres:26255315", //RC 26255315 : Podání doručeného dokumentu
                            icon: "gi-doc_ciz |fa-plus g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw",
                            run: function () {
                                $.content(this).ciziPisemnost();
                            }
                        },
                        actSouvisejiciUkol: {
                            caption: "jres:26256364", //RC 26256364 :  Vytvořit související úkol
                            icon: "gi-paper |gi-bell gi-bgw gi-stack-pos--rb",
                            run: function () {
                                $.content(this).souvisejiciUkol();
                            }
                        },
                        actPridatDoPoznamkovehoBloku: {
                            caption: "jres:26256859", //RC 26256859 : Přidat do pracovního bloku
                            icon: ["gi-calendar-interval", "fa-plus g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            run: function () {
                                $.content(this).ulozitDoPoznamkovehoBloku();
                            }
                        },
                        actOdeslatEmailem: {
                            caption: "jres:26255251", //RC 26255251 : Odeslat elektronickou poštou
                            icon: Gordic.Gin.Globals.Icons.Email().icon,
                            run: function () {
                                $.content(this).poslatDokumentEmailem();
                            }
                        },
                        //#endregion

                        //#region Zobrazit
                        actZmenyPolozek: {
                            caption: "jres:26256106", //RC 26256106 : Změny důležitých položek
                            icon: [
                                'gi-list',
                                //'gi-exclam gi-stack-pos--lb g-state-text g-state-important gi-bgw',
                                'gi-save gi-stack-pos--rb gi-bgw--rect g-state-text g-state-info'
                            ],
                            run: function () {
                                $.content(this).zmenyDulezitychPolozek();
                            }
                        },
                        //#endregion

                        //#region Činnosti
                        actNabytPravMoc: {
                            caption: "jres:26255327", //RC 26255327 : Nabýt právní moc
                            icon: ["gi-justice", "gi-arrow-down gi-rot180 g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            run: function () {
                                $.content(this).nabytPravniMoc();
                            }
                        },
                        actZmenaSpouUdalosti: {
                            caption: "jres:31937405", //RC 31937405 : Spouštěcí událost
                            icon: ["gi-paper_bell", "gi-arrow-down gi-rot180 g-state-text g-state-success gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            run: function () {
                                $.content(this).zmenaSpouUdalosti();
                            }
                        },
                        actStornovat: {
                            caption: componentDto.gin_n23_vedd == 0 ? "jres:26256654" : "jres:26257244", //RC 26257244 : Znepřístupnit (stornovat)
                            icon: Gordic.Gin.Globals.Icons.Stornovano().icon,
                            run: function () {
                                $.content(this).stornovat();
                            }
                        },
                        actZrusitStorno: {
                            caption: componentDto.gin_n23_vedd == 0 ? "jres:31937448" : "jres:26257245", //RC 26257245 : Zrušit znepřístupnění (storno)
                            icon: Gordic.Gin.Globals.Icons.ZrusitStorno().icon,
                            run: function () {
                                $.content(this).zrusitStorno();
                            }
                        },
                        actPredatPrevzitExtAg: {
                            caption: "jres:26255969", //RC 26255969 : Předat do externí agendy
                            rezim: "Predat",
                            icon: ["gi-predat", "gi-arrow-down gi-rot270 g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            //icon: "gi-save",
                            run: function () {
                                $.content(this).predatPrevzitExtAg(this.rezim);
                            }
                        },
                        actInformovatExtAgendu: {
                            caption: "jres:31937327", //RC 31937327 : Avizace externí agendě
                            tooltip: "jres:31937324", //RC 31937324 : Avizace synchronizace dat externí agendě / systému
                            icon: ["gi-bell", "gi-arrow-down gi-rot270 g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            //icon: "gi-save",
                            run: function () {
                                $.content(this).InformovatExtAgendu();
                            }
                        },
                        actZnovupodat: {
                            caption: "jres:26255331", //RC 26255331 : Znovupodat
                            icon: "gi-podatelna",
                            run: function () {
                                $.content(this).znovupodatDokument();
                            }
                        },

                        actPrerusitObnovit: {
                            caption: "jres:26255158", //RC 26255158 : Přerušit
                            rezim: "Prerusit",
                            run: function () {
                                $.content(this).prerusit(this.rezim);
                            }
                        },
                        actZtratitNalezt: {
                            caption: "jres:26255333", //RC 26255333 : Ztratit
                            rezim: '',
                            run: function () {
                                $.content(this).ztratit(this.rezim);
                            }
                        },

                        // 18.06.2019 - TFeik
                        // Pro vkládání do balíku použita preakce ze Spi.
                        actVlozitDoBaliku: Gordic.Spi.PreActions.VlozitDokumentSpisDoBaliku({
                            // 12.11.2021 - TFeik
                            // Předávání režimu spisovny do hledání balíku.
                            inputData: function () {
                                var isRezimSpisovna;
                                if (componentDto.SUloz != null) {
                                    // Hodnota 0 je přípravna, vše ostatní (aktuálně pouze hodnota 1) spisovna.
                                    isRezimSpisovna = componentDto.SUloz !== 0;
                                }

                                return {
                                    //parentContent: content,   // Nejsem schopen zde najít content, ale preakce či dialogs se o to postarají a dokáží jej najít.
                                    ModOtevreni: Gordic.Global.Enums.ModOtevreni.navigate,
                                    opt: {
                                        Ixps: [componentDto.ixp],
                                        //ContinueWhenInsertFails: true,
                                        SelectedGDataAkceSslProfil: [{
                                            ixp: componentDto.ixp,
                                            SpPlan: componentDto.SpisPl,// o.spis_pl,
                                            SpZnak: componentDto.SpisZnak, //o.spis_znak,
                                            SkartZnak: componentDto.SkarZnak, // o.skar_znak,
                                            SkartLhuta: componentDto.SkarLhuta, // o.skar_lhuta,
                                            SkartLhutaSpra: componentDto.SkartLhutaSpra, //   o.skar_lhuta_spra,
                                            RokSkartace: componentDto.RokSkartace,
                                            IxsVsk: componentDto.IxsVsk
                                        }],
                                        IsRezimSpisovna: isRezimSpisovna
                                    }
                                }
                            },
                            done: function () {
                                $.content(this).tryReloadDetail();
                            },
                            actionParams: {
                                name: "actVlozitDoBaliku",
                                caption: "jres:26255569" //RC 26255569 : Vložit do balíku
                            }
                        }),

                        actVyjmoutZBaliku: {
                            caption: "jres:26256491", //RC 26256491 : Vyjmout z balíku
                            //rezim: '',
                            icon: ["gi-vlozit_do_baliku", "gi-window-close  g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            run: function () {
                                $.content(this).vyjmoutZBaliku();
                            }
                        },

                        // 13.08.2019 - TFeik
                        // Použita preakce pro vytvoření a vložení do balíku.
                        actVytvoritBalik: Gordic.Ssl.PreActions.VytvoritBalikAVlozitSeznam({
                            // 05.11.2021 - TFeik
                            // Předávání režimu spisovny do balíku.
                            inputData: function () {
                                var isRezimSpisovna;
                                if (componentDto.SUloz != null) {
                                    // Hodnota 0 je přípravna, vše ostatní (aktuálně pouze hodnota 1) spisovna.
                                    isRezimSpisovna = componentDto.SUloz !== 0;
                                }

                                return {
                                    ListSelectedRowsInfo: [
                                        { Ixp: componentDto.ixp }
                                    ],
                                    isRezimSpisovna: isRezimSpisovna,
                                    spisovyZnakDisabled: true
                                };
                            },
                            done: function (retVal) {
                                var content = $.content(this);
                                if (retVal && retVal.GroupResult && retVal.GroupResult[0]) {
                                    if (retVal.GroupResult[0].IsError) {
                                        content.showFlash(
                                            retVal.GroupResult[0].Error,
                                            Gordic.Global.Enums.ColorStateClass.error,
                                            undefined,
                                            "actVytvoritBalikFlashId"
                                        );
                                    } else {
                                        content.showFlash(
                                            "jres:32170007", //RC 32170007 : Vytvoření a vložení do balíku je úspěšné.
                                            Gordic.Global.Enums.ColorStateClass.success,
                                            undefined,
                                            "actVytvoritBalikFlashId"
                                        );
                                        content.tryReloadDetail();
                                    }
                                }
                                else {
                                    content.showFlash(
                                        "jres:32170006", //RC 32170006 : Vytváření a vkládání do balíku se nezdařilo.
                                        Gordic.Global.Enums.ColorStateClass.error,
                                        undefined,
                                        "actVytvoritBalikFlashId"
                                    );
                                }
                            },
                            fail: function () {
                                $.content(this).showFlash(
                                    "jres:32170006", //RC 32170006 : Vytváření a vkládání do balíku se nezdařilo.
                                    Gordic.Global.Enums.ColorStateClass.error,
                                    undefined,
                                    "actVytvoritBalikFlashId"
                                );
                            },
                            actionParams: {
                                name: "actVytvoritBalik",
                                caption: "jres:26255568" //RC 26255568 : Vytvořit balík a vložit
                            }
                        }),
                        //actVytvoritBalik: {
                        //    caption: "jres:26255568", //RC 26255568 : Vytvořit balík a vložit
                        //    //rezim: '',
                        //    //icon: "gi-save",
                        //    run: function () {
                        //        $.content(this).vytvorBalik();
                        //    }
                        //},

                        actKontrolaMetadat: {
                            caption: "jres:26256830", //RC 26256830 : Kontrola metadat
                            icon: Gordic.Gin.Icons.ActionEnum.kontrolaMetadat ,//Gordic.Gin.Icons.ActionEnum.kontrolaMetadat,
                            run: function () {
                                $.content(this).kontrolaMetadat();
                            },
                            visible: Gordic.Wfl.WebClient.GetGWflDBParams().IsUkraine !== true
                        },
                        actOpravitMetadataPoKontroleSeznam:
                            Gordic.Ssl.PreActions.OpravitMetadataPoKontroleSeznam({  //(Gordic as any).Ssl.PreActions.Names.OpravitMetadataPoKontroleSeznam
                                inputData: function () {
                                    var IxpArray = [componentDto.ixp];
                                    return { IxpArray: IxpArray, CallingSource: "DetailSSL" };
                                },
                                done: function (retVal) {
                                    content.tryReloadDetail();
                                },
                                fail: function () {
                                    content.tryReloadDetail();
                                    //$.content(this).showFlash(
                                    //    "jres:31937298", //RC 31937298 : Oprava metadat se nezdařila
                                    //    Gordic.Global.Enums.ColorStateClass.error,
                                    //    undefined,
                                    //    "idOpravitMetadataPoKontrole"
                                    //);
                                },
                            })
                        ,

                        actTiskSablonyWord: GAction.createPrintAction({
                            name: "actTiskSablonyWord",
                            icon: "gi-print|fa-file-word-o gi-bgw gi-stack-pos--rb g-state-text g-state-info",
                            tema: !componentDto.IsSpis ? "usu_ptm_sdetpis" : "usu_ptm_sdetspi",    //nazev tematu
                            caption: "jres:26255343", //RC 26255343 : Šablony (Word,..)
                            serverRestrictionAlfMethod: "Gordic.Ssl.WebClient.GSslDetailComponent:GetRestrictionAlfTiskSablonyWord",
                            reportStarting: function (rep) {
                                var def = $.Deferred();
                                rep.params.X0000 = $.content(this).DetailDto.ixp;
                                rep.params.Preselect = false;
                                rep.params.IXP = $.content(this).DetailDto.ixp;
                                //if (componentDto.Ssl_tnazev_dok && componentDto.Ssl_tnazev_dok !== "") {
                                //    rep.params.EleFilename = componentDto.Ssl_tnazev_dok;

                                //}
                               
                                rep.params.OBSAH = rep.originalName;

                                var srv = $.content(this).createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                var optGenerujNazev = {
                                    ixp: rep.params.X0000,
                                    param: "ssl_tnazev_dok",
                                    alvName: rep.originalName ? rep.originalName:""  // originalName  name
                                };
                               
                                srv.call("GenerujNazevFileNameTisk", optGenerujNazev)
                                    .done(function (retVal) {
                                        if (retVal.StrParam1 && retVal.StrParam1 !== "") {
                                            rep.params.EleFilename = retVal.StrParam1;

                                        }
                                        def.resolve();
                                    }).always(function () { srv.close(); });
                                return def.promise();
                            },
                            reportFinished: function (ev, ri) {
                                var cnt = $.content(this);
                                if (ri) {
                                    const zpUloz = parseInt(ri.customData["zpUloz"] != null ? ri.customData["zpUloz"] : "0");
                                    Gordic.Ginis.DbModel.GGinczulEnumValues()
                                        .then(function (vals) {
                                            //const zpUlozDto = vals.find((v) => v.value === zpUloz);
  
                                            const zpUlozDto = vals.find(function (v) {
                                                 return v.value === zpUloz
                                            });
                                            var textFlash = "jres:31937394"; //RC 31937394 : Šablona byla vygenerována.
                                            if (zpUlozDto && zpUlozDto.meta.zpus_uloz_txt && zpUlozDto.meta.zpus_uloz != 0) { // neevidovaný výstup 0 se neukládá do ULO
                                                var zpusob = zpUlozDto.meta.zpus_uloz_txt;
                                                textFlash = textFlash + " " + String.Format("jres:31937397", zpusob); //RC 31937397 : Způsob uložení: {0}
                                                cnt.tryReloadDetail(undefined, {
                                                    flashMessage: textFlash,
                                                    flashMessageClass: "g-state-success",
                                                });
                                            } else {
                                                cnt.tryReloadDetail(undefined, {
                                                    flashMessage: textFlash,
                                                    flashMessageClass: "g-state-success",
                                                });
                                            }
                                        });
                                }
                            }
                        }),
                        actVystupAct: GAction.createPrintAction({
                            name: "actVystupAct",
                            tema: componentDto.VystupActTema,        
                            //tema: "ssl_ptm_ztvspi",
                            caption: "jres:31937562", //RC 31937562 : Ztvárnění metadat
                            title: "jres:31937561", //RC 31937561 : Ztvárnění metadat
                            //dialogOpening: () => {
                            //    var dfd = $.Deferred();
                            //    this.waitForValues(this.element)
                            //        .then((isValid) => { isValid === true ? dfd.resolve() : dfd.reject(); })
                            //        .fail(() => { dfd.reject(); })
                            //    return dfd.promise();
                            //},
                            //serverParameterMethod: "Gordic.Ved.WebControls.GVedReportParamConverter:ServerParameterMethod",
                            reportStarting: (rep) => {
                                rep.params["X0000"] = componentDto.ixp;   // Předat ID 
                                rep.params["X0001"] = componentDto.NazevRf; 
                            },
                            parentContent: content,
                            fullScreen: true,
                            reportFinished: function (rep, dva) {
                                const srv = content.createServiceContent({ className: "Gordic.Ssl.WebClient.GSslUtils", params: {} });  //servisni sluzba/content
                                srv.call("AddToHistory", { Ixp: componentDto.ixp });
                            },
                        }),

                        actVystupActSpis:
                            Gordic.Wfl.PreActions.ZtvarneniMetadatSpisuHromadne({  //(Gordic as any).Ssl.PreActions.Names.OpravitMetadataPoKontroleSeznam
                                inputData: function () {
                                    var IxpArray = [componentDto.ixp];
                                    return {
                                        parentContent: content,
                                        opt: IxpArray
                                    };
                                },
                                done: function (retVal) {
                                    //content.tryReloadDetail();
                                },
                                fail: function () {
                                    //content.tryReloadDetail();
                                   
                                },
                                actionParams: {
                                    name: "actVystupActSpis",
                                    icon: "gi-print"
                                }
                            })
                        ,


                        //actPridavatAOdebiratFormulare: {
                        //    caption: "jres:31937142",   //RC 31937142 : Přidat nebo odebrat formulář
                        //    icon: "gi-formular_plus",
                        //    run: function () {
                        //        $.content(this).pridavatAOdebiratFormulare();
                        //    }
                        //},
                        actZmenitStupenUtajeni: {
                            caption: "jres:31937419", //RC 31937419 : Stupeň utajení (změnit,zrušit,platnost)
                            tittle: "jres:31937418", //RC 31937418 : Změnit nebo zrušit stupeň utajení nebo nastavit platnost
                            icon:"fa-user-secret",
                            run: function () {
                                $.content(this).zmenitStupenUtajeni();
                            }
                        },
                        actNastavitPriznakZobrazitelnostiZastupemIRP: {
                            caption: "jres:31937495", //RC 31937495 : Zobrazitelnost zástupem
                            tittle: "jres:31937494", //RC 31937494 : Nastavit příznak zobrazitelnosti zástupem
                            icon: "fa-users",
                            run: function () {
                                $.content(this).nastavitPriznakZobrazitelnostiZastupemIRP();
                            }
                        },
                        actTiskSablonyGordic: {
                            caption: "jres:31937223", //RC 31937223 : Šablony konvence Gordic
                            icon: "gi-print|gi-gordic gi-bgw gi-stack-pos--rb g-state-text g-state-infog-state-text g-state-info",
                            run: function () {
                                $.content(this).tiskSablonyKonvenceGoridc();
                            }
                        },
                        actZrusitOdeslaniOriginalu: {
                            caption: "jres:31937291", //RC 31937291 : Zrušit odeslání jako originálu
                            icon: ["gi-send", "gi-window-close g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            run: function () {
                                $.content(this).zrusitOdeslaniJakoOriginalu();
                            }
                        },

                        actDoloznkaNabytiPravniMoci: {
                            caption: "jres:31937608", //RC 31937608 : Doložka nabytí právní moci
                            icon: ["gi-justice", "gi-paper2 gi-rot180 g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            tooltip:"jres:31937602", //RC 31937602 : Do hlavní přílohy bude na první stranu vložena doložka nabytí právní moci
                            run: function () {
                                $.content(this).doloznkaNabytiPravniMoci();
                            }
                        },
                     
                        //#endregion
                    },

                    menuBar: [
                        
                        { action: "actEditovat", favorite: true, after: "menuObnovit" }, //actObnovit
                        { action: "actUlozitZmeny", favorite: true, after: "menuObnovit" },
                        //{ action: "actObcerstvit", favorite: true },
                        //#region Dokument
                        Gordic.Wfl.Globals.MenuDefinitions.detailDokument(),
                        { id: "menuDokumentSeparator1", type: "separator", parent: "menuDokument", after: "menuFindRecord" },
                        { action: "actPodaniVlastni", parent: "menuDokument", after: "menuDokumentSeparator1"},
                        { action: "actPodaniCizi", parent: "menuDokument", after: "menuPodaniVlastni" },
                        { id: "menuDokumentSeparator2", type: "separator", parent: "menuDokument", after: "menuPodaniCizi" },
                        { action: "actSouvisejiciUkol", parent: "menuDokument", after: "menuDokumentSeparator2"},
                        { action: "actPridatDoPoznamkovehoBloku", parent: "menuDokument", after: "menuSouvisejiciUkol" },
                        { action: "actOdeslatEmailem", parent: "menuDokument", after: "menuPridatDoPoznamkovehoBloku" },
                        //#endregion

                        //#region Zobrazit
                        Gordic.Wfl.Globals.MenuDefinitions.detailZobrazit(),
                        { action: "actZmenyPolozek", parent: "menuZobrazit", after: "menuObnovit" },
                        //#endregion

                        $.extend({}, Gordic.Wfl.Globals.MenuDefinitions.detailTisk(), { favorite: true }),
                        { action: "actTiskSablonyWord", parent: "menuTisk" },
                        { action: "actTiskSablonyGordic", parent: "menuTisk" },
                        { action: "actVystupAct", parent: "menuTisk" },
                        { action: "actVystupActSpis", parent: "menuTisk" },
                        

                        

                        //$.extend({}, Gordic.Wfl.Globals.MenuDefinitions.detailVazby(), { favorite: true }),
                        //{ action: "actPridavatAOdebiratFormulare", parent: "menuWflVazby" },

                        ////#region Činnosti

                        Gordic.Wfl.Globals.MenuDefinitions.detailCinnosti(),
                        { id: "menuCinnostiSeparator1", type: "separator", parent: "menuWflCinnosti", before: "menuWflCinnostiOdeslani" },
                        { action: "actNabytPravMoc", parent: "menuWflCinnosti", after: "menuCinnostiSeparator1" },
                        { action: "actDoloznkaNabytiPravniMoci", parent: "menuWflCinnosti", after: "menuStornovat" },
                        { action: "actZmenaSpouUdalosti", parent: "menuWflCinnosti", after: "menuNabytPravMoc" },
                        { action: "actStornovat", parent: "menuWflCinnosti", after: "menuZmenaSpouUdalosti" },
                        { action: "actZrusitStorno", parent: "menuWflCinnosti", after: "menuStornovat" },
                        { action: "actPredatPrevzitExtAg", parent: "menuWflCinnosti", after: "menuZrusitStorno" },
                        { action: "actInformovatExtAgendu", parent: "menuWflCinnosti", after: "menuStornovat" },
                        { id: "menuCinnostiSeparator2", type: "separator", parent: "menuWflCinnosti", after: "menuPredatPrevzitExtAg" },
                        { action: "actZnovupodat", parent: "menuWflCinnosti", after: "menuCinnostiSeparator2" },
                        { id: "menuCinnostiSeparator3", type: "separator", parent: "menuWflCinnosti", after: "menuZnovupodat" },
                        { action: "actPrerusitObnovit", parent: "menuWflCinnosti", after: "menuCinnostiSeparator3" },
                        { action: "actZtratitNalezt", parent: "menuWflCinnosti", after: "menuPrerusitObnovit" },
                        { id: "menuCinnostiSeparator4", type: "separator", parent: "menuWflCinnosti", after: "menuZtratitNalezt" },
                        {
                            id: "menuBaliky", type: "static", parent: "menuWflCinnosti", icon: Gordic.Gin.Globals.Icons.Balik().icon, caption: "jres:26256241", after: "menuCinnostiSeparator4", //RC 26256241 : Balíky
                            children: [
                                { action: "actVlozitDoBaliku", favorite: true },
                                { action: "actVyjmoutZBaliku" },
                                { action: "actVytvoritBalik" }
                            ]
                        },
                        { action: "actKontrolaMetadat", parent: "menuWflCinnosti", after: "menuBaliky", favorite: true },
                        //{ action: Gordic.Ssl.PreActions.Names.OpravitMetadataPoKontroleSeznam, parent: "menuWflCinnosti", after: "menuBaliky", favorite: true },

                        { action: "actZmenitStupenUtajeni", parent: "menuWflCinnosti", after: "menuStornovat" },
                        { action: "actNastavitPriznakZobrazitelnostiZastupemIRP", parent: "menuWflCinnosti", after: "menuStornovat" },
                        { action: "actZrusitOdeslaniOriginalu", parent: "menuWflCinnosti", after: "menuStornovat" },
                        //#endregion

                        //{
                        //    id: "menuCinnosti", caption: "jres:26255309", type: "static", children: [ //RC 26255309 : Činnosti
                        //{ action: "actOdeslaniTest", caption: "BOO", after: "menuWflCinnostiZadostOPodpis" }, //actWflCinnostiZadostOPodpis   //menuWflCinnosti
                        //    ]
                        //}

                        //// 12.06.2020 - TFeik
                        //// Sdílení detailu přesunuto z ssl ddo wfl.
                        //// 08.04.2020 - TFeik
                        //// Přidáno sdílení detailu.
                        //Gordic.Gin.Prefabs.MenuParams && Gordic.Gin.Prefabs.MenuParams.ShareCommandUrl
                        //    ? Gordic.Gin.Prefabs.MenuParams.ShareCommandUrl({
                        //        commandUrl: Gordic.WebApp.Utility.createCommandUrl(null, 'OpenDetail', {
                        //            ixx1: componentDto.ixp
                        //        }),
                        //        vlozitDoKalendareOptions: {
                        //            ixx: componentDto.ixp,
                        //            ixs_fun: componentDto.IxsFunPrihlasenehoUzivatele
                        //        },
                        //        prehledUdalostiOptions: {
                        //            ixp: componentDto.ixp
                        //        }
                        //    })
                        //    : undefined
                    ],
                    statusBar: [
                        {
                            type: "widget",
                            init: function () {
                                return $("<div>").gcolorpicker({
                                    globalSettings: content.globalSettings,
                                    uzo: componentDto.Uzo,//this.options.dto.uzo,
                                    readonly: !componentDto.ZmenaBarvyDokumetuEnable,
                                    change: function (uzo) {
                                        Gordic.Isl.ColorpickerService.setUzo({ Opt: { Ixp: componentDto.ixp, Type: 0, Uzo: uzo } }).getData();
                                        content.naDetailuDosloKeZmene = true;
                                    }
                                });
                                // nahradím //Gordic.Isl.ColorpickerService.setUzo({ Opt: { Ixp: componentDto.ixp, Type: 0, Uzo: uzo } }).getData();
                            }
                            //action: "actVybratBarvu"
                        }
                    ],

                    commandBar: [
                        // 13.05.2024 - TFeik
                        // Jako primary nově označuju i pokud je režim podání.
                        { action: "actUlozitZmeny", before: "commandCloseButtonClick", primary: (content.EditMode || content.RezimPodani) ? true : false }
                        //"actUlozitZmeny"
                    ]/*,
                    
                    statusBar: { //ukázka zadání jako objektu
                        statusMyComponentObjednano: {
                            "caption": "OBJEDNANO",
                            "type": "static",
                            "customClass": "g-state-warning g-state-text"
                        },

                        statusMyComponentSeparator1: {
                            "type": "separator"
                        },

                        statusMyComponentZaplaceno: {
                            "caption": "ZAPLACENO",
                            "type": "static",
                            "customClass": "g-state-info g-state-text"
                        },


                        statusMyComponentSeparator2: {
                            "type": "separator"
                        },

                        statusMyComponentVyrizeno: {
                            "caption": "VYRIZENO",
                            "type": "static",
                            "customClass": "g-state-success g-state-text"
                        }
                    },
                    */
                };


                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\DetailBuilderComponents\GSslDetailDokumentuComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslDetailDokumentu: {

            create: function (content, componentDto) {

                var pocetKopiistatusBarBadge = new GObservableObject({
                    value: "?",
                    tooltip: "jres:31937475" //RC 31937475 : Počet kopií dokumentu.
                });
                var result = {
                    flagEvidovat: false,

                    onMenuBuild: [
                        function (builder, menus) {
                            this.enableSslDetailDokumentu();

                            var isTypovaEntita = componentDto.TypSpis > 1;

                            if(isTypovaEntita) {
                                this.enableSslDetailTypoveEntity();
                            }
                        }
                    ],
                    onBuild: [
                        function () {
                            this.nactiPocetKopiiStatusbar();
                        },
                    ],
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                        MakeSpisConfirmStatus: {
                            None: 0,
                            Confirm: 1,
                            Confirmed: 2,
                            ConfirmedAndPrepared: 3
                        },

                        //VyrizujiciDokErrText: "jres:26255205",  //RC 26255205 : V editačním módu nelze vytvářet vyřizující dokument.
                        OpravduVytvoritNovySpisRequest: "jres:26255234", //RC 26255234 : Opravdu chcete vytvořit nový spis?
                        NovySpisRequest: "jres:26255233", //RC 26255233 : Tento dokument (nebo jeho mateřský) již byl vložen v jiném spisu, chcete opravdu vytvořit nový spis?

                        vyrizujiciDokument: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var options = {
                                TypDok: Gordic.Wfl.Globals.Enums.TypDok.Vlastni,
                                TypId: Gordic.Wfl.Globals.Enums.TypId.Ixp
                            };
                            Gordic.Wfl.Dialogs.GenerovaniIxp(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                                .done(function (retVal, content) {
                                if (retVal) {
                                    var opt = {
                                        DetailDto: { ixp: retVal.Ixp },
                                        RezimPodani: 1, // Vlastni
                                        InicDok: l_sIxp
                                    };
                                    that.otevriNovyDetail(opt);
                                }
                            });

                        },

                       
                        vytvoritDuplikat: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;

                            if (componentDto.PrizDupli == 1) {
                                var title = l_sIxp + " - " + "jres:Gordic.Ssl.WebClient:26256571"; //RC 26256571 : tvorba nového duplikátu.

                                var options = { Ixp: l_sIxp };
                                Gordic.Ssl.Dialogs.DuplikatNovyDlg(that, options).on("closed", function (ev, retVal) {
                                    if(retVal) {
                                        that.tryReloadDetail();
                                    }
                                });
                            } else {
                                this.dialogs.confirm("jres:26256789", "jres:Gordic.Ssl.WebClient:26256696").on("closed", function (ev, retVal) { //RC 26256789 : Duplikát
                                    if (retVal === "yes") {
                                        Gordic.Ssl.Utils.GetInfoProZalozeniCjSKontrolouTvorbyCjProDokument(undefined,undefined,that).done(function (cjInfo) {
                                            var denikInfo = cjInfo.DenikInfo;
                                            if (denikInfo.Poradi == '') {
                                                denikInfo.Poradi = null; // osetreni pro starsi dialogy, ktere vracely string
                                            }

                                            var opt = {
                                                "Ixp": l_sIxp,
                                                "PridelitCj": cjInfo.PridelitCj,
                                                "CjInfo": denikInfo
                                            };
                                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                            srv.call("VytvoritDuplikat", opt)
                                                .done(function (retVal) {
                                                    if (retVal.StavBool) {
                                                        if (retVal.StavTxt) {
                                                            var opt = {
                                                                DetailDto: { ixp: retVal.StavTxt },
                                                            };
                                                            that.otevriNovyDetail(opt);
                                                        } else {
                                                            that.tryReloadDetail();
                                                        }
                                                    }
                                                }).always(function () { srv.close(); });
                                        });
                                    }
                                });
                            }
                        },

                        sslDetailDokumentu_oznaceniPreevidovani: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;

                            var options = { Ixp: l_sIxp, OznaceniPreevidovaneho: true };

                            Gordic.Ssl.Dialogs.PreevidenceDoSamostatneEvidenceDlg(that, options, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                if (retVal) {
                                    that.tryReloadDetail();
                                }
                            });

                        },

                        //#region vytvorit spis
                        vytvoritSpis: function (VytvoreniSpisuDto) {
                            var that = this;
                            if (VytvoreniSpisuDto == null) VytvoreniSpisuDto = {};
                            var l_sIxp = componentDto.ixp;
                            if(componentDto.ShowMsgBoxMakeSpis) {
                                this.dialogs.confirm("jres:26256038", this.OpravduVytvoritNovySpisRequest).on("closed", function (ev, retVal) { //RC 26256038 : Nový spis
                                    if(retVal === "yes") {
                                        that.vytvoritSpisWS(l_sIxp, "", that.MakeSpisConfirmStatus.None, false, VytvoreniSpisuDto);
                                    }
                                });
                            } else {
                                this.vytvoritSpisWS(l_sIxp, "", this.MakeSpisConfirmStatus.None, false, VytvoreniSpisuDto);
                            }
                        },
                        vytvoritSpisWS: function (IxpDok, SelectedDenik, StatusConfirmVytvoreniSpisu, FlagDirect, VytvoreniSpisuDto) {
                            var that = this;
                            var opt = {
                                "IxpDok": IxpDok,
                                "SelectedDenik": SelectedDenik,
                                "StatusConfirmVytvoreniSpisu": StatusConfirmVytvoreniSpisu,
                                "FlagDirect": FlagDirect,
                                "DtovytvoreniSpisu": VytvoreniSpisuDto
                            };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("VytvoritSpis", opt)
                                .done(function (retVal) {
                                    that.vytvoritSpisOnSucceeded(retVal, VytvoreniSpisuDto);
                                }).always(function () { srv.close(); });

                        },
                        vytvoritSpisOnSucceeded: function (retVal, VytvoreniSpisuDto) {
                            var that = this;
                            var l_bReloadEnabled = true;

                            if (retVal.StavBool) {
                                if (retVal.ErrorMessage) {
                                    that.dialogs.alert(retVal.ErrorMessage); // zobrazim pripadnou vyjimku
                                }
                                if (retVal.Script) { //Script
                                    l_bReloadEnabled = false;
                                    switch (retVal.Script) {
                                        case "makeSpisConfirmInSpisHistory": that.makeSpisConfirmInSpisHistory(VytvoreniSpisuDto); break;
                                        case "vytvoritSpisSelectDenik": that.vytvoritSpisSelectDenik(VytvoreniSpisuDto);  break;
                                        case "vytvoritSpisNespojRadaDirect": that.vytvoritSpisNespojRadaDirect(retVal.StrParam1, retVal.StrParam2, retVal.StrParam3, VytvoreniSpisuDto ); break; // StrParam1 StrParam2 StrParam3 
                                        case "vytvoritSpisInsertInputValues": that.vytvoritSpisInsertInputValues(VytvoreniSpisuDto); break;
                                        case "vlozitVyjmoutParovyDokumentDoSpisu":
                                            that.dialogs.confirm("jres:31937052", retVal.StrParam1).on("closed", function (ev, odpoved) {  //RC 31937052 : Párový dokument
                                                if (odpoved === "yes") {
                                                    that.vlozitVyjmoutParovyDokumentDoSpisu(retVal.StrParam2, retVal.StrParam3, retVal.BoolParam1);
                                                }
                                            });
                                            break; 
                                    }
                                    
                                }
                            } else if (retVal.ErrorMessage) {
                                that.dialogs.alert(retVal.ErrorMessage); // zobrazim pripadnou vyjimku
                            }
                            if (l_bReloadEnabled && VytvoreniSpisuDto && VytvoreniSpisuDto.PokracujSvytvorenimOdpovedi) {
                                l_bReloadEnabled = false;
                                this.odpovedVeSpisuPokracuj();

                            }
                            if (l_bReloadEnabled) {
                                that.tryReloadDetail(undefined, {
                                    flashMessage: "jres:31937114", //RC 31937114 : Spis byl vytvořen.
                                    flashMessageClass: "g-state-success"
                                });
                            }
                        },
                        makeSpisConfirmInSpisHistory: function (VytvoreniSpisuDto) {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            this.dialogs.confirm("jres:26256038", this.NovySpisRequest).on("closed", function (ev, retVal) {  //RC 26256038 : Nový spis
                                if (retVal === "yes") {
                                    var statusConfirm = that.MakeSpisConfirmStatus.ConfirmedAndPrepared;

                                    if(componentDto.gin_n23_vecsk != 0) {
                                        statusConfirm = that.MakeSpisConfirmStatus.Confirmed;
                                    }

                                    that.vytvoritSpisWS(l_sIxp, "", statusConfirm, false, VytvoreniSpisuDto);
                                }
                            });
                        },

                        vytvoritSpisSelectDenik: function (VytvoreniSpisuDto) {
                            var that = this;
                            //TODO dialog 
                            Gordic.Ssl.Dialogs.VyberDenikuSpzDlg(this, { RezimNakl: componentDto.RezimNakl }, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                if (retVal) {
                                    that.functionOnSelectDenikSpz(retVal.sslden, retVal.typDen, retVal.prizDenCj, VytvoreniSpisuDto);
                                }
                            });
                        },
                        functionOnSelectDenikSpz: function (sslden, typDen, prizDenCj, VytvoreniSpisuDto) {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var l_oVytvSpisuOnCompleteFunction = function (VytvoreniSpisuDto) {
                                var l_sSsldenSerialized = sslden + "|" + typDen + "|" + prizDenCj;

                                that.vytvoritSpisWS(l_sIxp, l_sSsldenSerialized, that.MakeSpisConfirmStatus.ConfirmedAndPrepared, true, VytvoreniSpisuDto);
                            };

                            if (((typDen == "10" || typDen == "20") && prizDenCj != "3") || componentDto.gin_n23_vecsk != 0) { // nespojita rada nebo kombinovana (a nejsou odvozeny od rady dokumentu), nutno zobrazit okno pro zadani poradi

                                var l_oParamsJSON = {
                                    "Sslden": sslden,
                                    Ixp: componentDto.ixp
                                };
                                var $div = Gordic.Ssl.Dialogs.VytvSpisBezInicPisDlg(that, l_oParamsJSON, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                                    .done(function (VytvoreniSpisuDtoIn) {

                                        if (VytvoreniSpisuDtoIn) {
                                            if (VytvoreniSpisuDto) {
                                                $.extend(VytvoreniSpisuDtoIn, VytvoreniSpisuDto);
                                            }
                                            l_oVytvSpisuOnCompleteFunction($.extend(VytvoreniSpisuDtoIn));
                                        }
                                });

                                // POZOR!!! Neni dodelan RefreshDetail(); pri zavreni dialogu pres krizek nebo tl. Zavrit
                            } else {
                                l_oVytvSpisuOnCompleteFunction(VytvoreniSpisuDto);
                            }

                        },

                        vytvoritSpisNespojRadaDirect: function (sslden, typDen, prizDenCj, VytvoreniSpisuDto) {
                           
                            var that = this;
                            var l_sIxp = componentDto.ixp;

                            var l_oVytvSpisuOnCompleteFunction = function (VytvoreniSpisuDtoInIn) {
                                var l_sSsldenSerialized = sslden + "|" + typDen + "|" + prizDenCj;

                                that.vytvoritSpisWS(l_sIxp, l_sSsldenSerialized, that.MakeSpisConfirmStatus.ConfirmedAndPrepared, true, VytvoreniSpisuDtoInIn);
                            }
                            var l_oParamsJSON = {
                                "Sslden": sslden,
                                Ixp: componentDto.ixp
                            };
                            Gordic.Ssl.Dialogs.VytvSpisBezInicPisDlg(that, l_oParamsJSON, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                                .done(function (VytvoreniSpisuDtoIn) {
                                    if (VytvoreniSpisuDtoIn) {
                                        if (VytvoreniSpisuDto) {
                                            $.extend(VytvoreniSpisuDtoIn, VytvoreniSpisuDto);
                                        }
                                        l_oVytvSpisuOnCompleteFunction(VytvoreniSpisuDtoIn);
                                    }
                             });
                            // POZOR!!! Neni dodelan RefreshDetail(); pri zavreni dialogu pres krizek nebo tl. Zavrit
                        },

                        vytvoritSpisInsertInputValues: function (VytvoreniSpisuDto) {
                            var that = this;
                            var l_sIxp = componentDto.ixp;

                            var l_oVytvSpisuOnCompleteFunction = function (VytvoreniSpisuDtoInIn) {

                                that.vytvoritSpisWS(l_sIxp, "", that.MakeSpisConfirmStatus.ConfirmedAndPrepared, false, VytvoreniSpisuDtoInIn);
                            }
                            var l_oParamsJSON = {
                                Ixp: componentDto.ixp
                            };
                            Gordic.Ssl.Dialogs.VytvSpisBezInicPisDlg(that, l_oParamsJSON, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                                .done(function (VytvoreniSpisuDtoIn) {
                                    if (VytvoreniSpisuDtoIn) {
                                        if (VytvoreniSpisuDto) {
                                            $.extend(VytvoreniSpisuDtoIn, VytvoreniSpisuDto);
                                        }
                                        l_oVytvSpisuOnCompleteFunction(VytvoreniSpisuDtoIn);
                                    }
                            });
                        },

                        vytvoritSpisDoSoucasti: function () {
                            var that = this;

                            var l_oParamsJSON = {
                                Ixp: componentDto.ixp,
                                BezInicPis: false,
                                DoSoucasti: true,
                                NezakladatMistoTohoVratitHodnoty: true
                            };

                            Gordic.Ssl.Dialogs.VytvSpisBezInicPisDlg(that, l_oParamsJSON, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                                .done(function (newSpisDto) {
                                    if(newSpisDto) {
                                        var ixpSoucasti = componentDto.ixp;
                                
                                        var opt = {
                                            "IxpDok": "",
                                            "IxpSoucasti": ixpSoucasti,
                                            "NewSpisDto": newSpisDto
                                        };

                                        var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                        srv.call("VytvoritSpisDoSoucasti", opt)
                                            .done(function (retVal) {

                                                if(retVal.StavBool && retVal.StrParam1) {
                                                    var opt = {
                                                        DetailDto: { ixp: retVal.StrParam1 },
                                                        EditMode: false
                                                    };
                                                    that.otevriNovyDetail(opt);
                                                }

                                                //that.tryReloadDetail(undefined, {
                                                //    flashMessage: "jres:31937114", //RC 31937114 : Spis byl vytvořen.
                                                //    flashMessageClass: "g-state-success"
                                                //});
                                            }).always(function () { srv.close(); });
                                    }
                                });

                        },
                        odpovedVeSpisu: function () {
                            var that = this;
                            if (componentDto.PrizSpis === 2) {
                                this.odpovedVeSpisuPokracuj();
                            } else {
                                this.vytvoritSpis({ PokracujSvytvorenimOdpovedi: true });
                            }
                            
                        },
                        odpovedVeSpisuPokracuj: function () {
                            var that = this;
                            var l_oJSONPars = {
                                Ixp: componentDto.ixp
                            };
                            this.beginOperation();
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("OdpovedVeSpisu", l_oJSONPars)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {
                                        if (retVal.StrParam1) {
                                            var opt = {
                                                DetailDto: { ixp: retVal.StrParam1 },
                                                EditMode:true
                                            };
                                            that.otevriNovyDetail(opt);
                                        }

                                        //that.tryReloadDetail(undefined, {
                                        //    flashMessage: "paráda", //RC 31937056 : Vyřízení bylo zrušeno
                                        //    flashMessageClass: "g-state-success",
                                        //});
                                    } else {
                                        that.tryReloadDetail(undefined, {
                                            flashMessage: "jres:31937487", //RC 31937487 : Nelze vytvořit odpověď
                                            flashMessageClass: "g-state-error",
                                        });
                                    }
                                }).always(function () {
                                    that.endOperation();
                                    srv.close();
                                });
                        },

                        //#endregion

                        //#region vlozit do spisu

                        sslVlozitDoSoucasti: function () {
                            var that = this;

                            if (componentDto.wfl_typspisy != 0) {
                                var typSpis = 3;
                                if (componentDto.TypSpis === 3) {
                                    typSpis = 2; //new GInt16(2);
                                }   // ALF 6.8.2019 pro součást by se měl nabídnout typový spisy
                                //ok = l_oHledatDokumentTab.VyhledejPosledniNadrizenouEntitu(typSpis, DocInfo.Ixp);

                                Gordic.Wfl.Dialogs.GHledatIdentDokSpisDlg(this, { IxpVkladanehoDok: componentDto.Ixp, TypSpis: typSpis }) 
                                    .then(function (retVal) {
                                        if (retVal && retVal.ixp) {
                                            var opt = {
                                                Ixp: componentDto.ixp,
                                                IxpDo: retVal.ixp
                                            };
                                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                            srv.call("VlozitDoSoucasti", opt)
                                                .done(function (retVal) {
                                                    if (retVal.StavBool) {
                                                        that.tryReloadDetail(undefined, {
                                                            flashMessage: "jres:31937192", //RC 31937192 : Úspěšně vložení
                                                            flashMessageClass: "g-state-success",
                                                        });
                                                    }
                                                }).always(function () { srv.close(); });
                                        }
                                    });
                            }
                        },

                        sslVyjmoutZeSoucasti: function () {
                            var that = this;
     
                            var opt = {
                                IxpNadrazeneEntity: componentDto.IxpSpis, // Ixp nadřízené entity. U dílu ixp soucasti (IxpSpis)
                                IxpVyjimaneEntity: componentDto.ixp,
                                IxsVskSpisu: "" 
                            };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("VyjmoutZNadrizeneEntity", opt)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {
                                        that.tryReloadDetail(undefined, {
                                            flashMessage: "jres:31937191", //RC 31937191 : Úspěšně vyjmuto
                                            flashMessageClass: "g-state-success",
                                        });
                                    }
                                }).always(function () { srv.close(); });
                        },

                        vlozitDoSpisu: function (FlagVlozit) {
                         
                            var that = this;
                            var opt = {
                                IxpDok: componentDto.ixp,
                                PIDSpisZnovuVlozit: componentDto.PIDSpisZnovuVlozit,
                                content: this,
                                SVyriz: componentDto.SVyriz,
                                ssl_rem_dokd: componentDto.ssl_rem_dokd
                            };
                            if (this.SimpleMode) {
                                opt.HledaniSpisuProVlozeniDokumentuSimpleDlg = true;
                            }
                            this.beginOperation();
                            Gordic.Ssl.Utils.vlozitDoSpisuUtils(FlagVlozit, opt)
                                .done(function (rv) {
                                    that.tryReloadDetail(undefined, {
                                        flashMessage:
                                            FlagVlozit
                                                ? "jres:31937318" //RC 31937318 : Dokument byl vložen do spisu
                                                : "jres:31937319", //RC 31937319 : Dokument byl vyjmut ze spisu
                                        flashMessageClass: "g-state-success"
                                    });

                                }).fail(function () {
                                    that.tryReloadDetail(undefined, {
                                        flashMessage:
                                            FlagVlozit
                                                ? "jres:31937320" //RC 31937320 : Vkládání do spisu nebylo dokončeno
                                                : "jres:31937321", //RC 31937321 : Vyjmutí ze spisu nebylo dokončeno
                                        flashMessageClass: "g-state-error"
                                    });
                                })
                                .always(function () {
                                 
                                    that.endOperation();
                                   
                                });
                        },


                        zrusitVyrizeniCJ: function () {
                           
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var options = {
                                winTitle: "jres:26255182" //RC 26255182 : Důvod zrušení vyřízení ČJ
                            };
                            var $div = Gordic.Ssl.Dialogs.AddDuvodDlg(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                if (retVal) {
                                    var l_oJSONPars = {
                                        "Ixp": l_sIxp,
                                        "Duvod": retVal.duvod
                                    };
                                    var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                    srv.call("ZrusitVyrizeniCj", l_oJSONPars)
                                        .done(function (retVal) {
                                            if (retVal.StavBool) {
                                                that.tryReloadDetail(undefined, {
                                                    flashMessage: "jres:31937056", //RC 31937056 : Vyřízení bylo zrušeno
                                                    flashMessageClass: "g-state-success",
                                                });
                                            } else {
                                                that.tryReloadDetail(undefined, {
                                                    flashMessage: "jres:31937132", //RC 31937132 : Vyřízení nelze zrušit
                                                    flashMessageClass: "g-state-error",
                                                });
                                            }
                                        }).always(function () { srv.close(); });
                                }
                            });

                        },
                         // VyriditAdActa
                        vyriditAdActa: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            if (componentDto.ssl_vyrkonmet != 0) {
                                var l_oJSONPars = { "ixp": l_sIxp };
                                var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                srv.call("KontrolaMetadatProIxp", l_oJSONPars)
                                    .done(function (retVal) {
                                        that.kontrolaMetadatDokSpisOnSucceeded(retVal);
                                    }).always(function () { srv.close(); });
                                
                            } else {
                                this.vyriditPisemnostInternal();
                            }
                        },

                        uzavritTypovySpis: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var l_oJSONPars = { Ixp: l_sIxp };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("UzavritTypovySpis", l_oJSONPars)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {
                                        that.tryReloadDetail();
                                    }
                                }).always(function () { srv.close(); });
                        },

                        uzavritSoucast: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var l_oJSONPars = { Ixp: l_sIxp };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("UzavritSoucast", l_oJSONPars)
                                .done(function (retVal) {
                                    if(retVal.StavBool) {
                                        that.tryReloadDetail();
                                    }
                                }).always(function () { srv.close(); });
                        },

                        kontrolaMetadatDokSpisOnSucceeded: function (retVal) {

                            var that = this;
                            var l_bIsValid = retVal.Result;
                            var l_sKontrolaMetadatHlaska = retVal.Message;
                            var l_sIxp = retVal.Ixp;

                            if (l_sKontrolaMetadatHlaska) {
                                this.dialogs.alert("jres:31937042",l_sKontrolaMetadatHlaska); //RC 31937042 : Pozor
                            }
                            if (!l_bIsValid) {

								var opt = {
                                    Ixp: l_sIxp,
                                    TypKontrolySpisZnakuProp: 0
								};

                                Gordic.Wfl.Dialogs.OpravaMetadatDlg(that, opt).done(function (retVal) {

									if ((retVal && retVal.stav) || componentDto.ssl_vyrkonmet === 1) {
										that.vyriditPisemnostInternal();
									}
								});
                               
                                
                            } else {
                                that.vyriditPisemnostInternal();
                            }
                        },
                        vyriditPisemnostInternal: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var l_oVyrizeniDokumentuAdActaFunction = function (selectedTermin) {
                                var l_oJSONPars = { "Ixp": l_sIxp, "DatVyrAdActa": selectedTermin };
                                var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                srv.call("VyrizeniDokumentuAdActa", l_oJSONPars)
                                    .done(function (retVal) {
                                        if (retVal.StavBool) {
                                            that.tryReloadDetail();
                                        }
                                    }).always(function () { srv.close(); });
                            };
  
                            if (this.RezimPodani == 0 && (componentDto.LzeVyriditDokumentVeSpisuVeStareMetodice || (componentDto.PrizSpis == 2 && componentDto.ssl_smvyrivespi == 1 && componentDto.gin_n23_vedd > 0))) { // T42963
                                // volani okna pro MVCR
                                var l_sTitle = "jres:Gordic.Ssl.WebClient:26256549"; //RC 26256549 : Vyřízení dokumentu vloženého ve spisu
                                var l_oParamsJSON = { Ixp: l_sIxp };
                                Gordic.Ssl.Dialogs.VyrizeniDokVeSpisuDlg(that, l_oParamsJSON).then(function (retVal) {
                                    if (retVal) {
                                        that.tryReloadDetail();
                                    }
                                });
                            } else if (componentDto.ssl_adac_datvy == 1) {
                                var options = {
                                    winTitle: "jres:31937305", //RC 31937305 : Vyřízení dokumentu
                                    LabelText: "jres:31937306", //RC 31937306 : Datum vyřízení
                                    Using: Gordic.Ssl.Dialogs.ZmenaTerminuDlgUsing.VYRIZENI_AD_ACTA
                                };
                                Gordic.Ssl.Dialogs.ZmenaTerminuDlg(that, options, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                    if (retVal) {
                                        var l_oSelectedDate = retVal.TerminField;

                                        var l_nYear = new Number(l_oSelectedDate.getYear());

                                        if (l_nYear < 1900) {
                                            l_nYear = l_nYear + 1900;
                                        }

                                        var l_sSelectedDate = l_oSelectedDate.getDate() + "." + (l_oSelectedDate.getMonth() + 1) + "." + l_nYear;

                                        l_oVyrizeniDokumentuAdActaFunction(l_sSelectedDate);
                                    }
                                });
                            } else {
                                this.dialogs.confirm("jres:26255260", this.VyriditAdActaRequest).on("closed", function (ev, retVal) {  //RC 26255260 : Vyřídit
                                    if (retVal === "yes") {
                                        l_oVyrizeniDokumentuAdActaFunction("");
                                    }
                                });
                            }
                        },

                        // zruseniUzavreniTypovehoSpisu
                        zruseniUzavreniTypovehoSpisu: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;

                            var l_oJSONPars = {
                                "Ixp": l_sIxp
                            };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("ZruseniUzavreniTypovehoSpisu", l_oJSONPars)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {
                                        that.tryReloadDetail();
                                    }
                                }).always(function () { srv.close(); });
                        },

                        // ZruseniVyrizeniDokumentu
                        zruseniVyrizeniDokumentu: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;

                            var l_oJSONPars = {
                                "Ixp": l_sIxp
                            };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("ZruseniVyrizeniDokumentu", l_oJSONPars)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {
                                        that.tryReloadDetail();
                                    }
                                }).always(function () { srv.close(); });
                        },
                        detailSpisu: function () {
                            var that = this;
                            if (componentDto.IxpSpisPrir) {
                                var opt = {
                                    DetailDto: {
                                        ixp: componentDto.IxpSpisPrir
                                    },
                                };
                                this.otevriNovyDetail(opt);

                            } else if (componentDto.IxpSpis) {
                                var opt = {
                                    DetailDto: {
                                        ixp: componentDto.IxpSpis
                                    },
                                };
                                this.otevriNovyDetail(opt);
                            }  
                        },


                        addVyrizDok: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;

                            this.hledatIdentDokSpi(
                                function (retVal) {
                                    if (retVal) {
                                        var options = { "Ixp": l_sIxp, "IxpVyriz": retVal.ixp };
                                        var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                        srv.call("AddVyrizujiciDokumentCj", options)
                                            .done(function (retValAdd) {
                                                if (retValAdd.StavBool) {
                                                    that.tryReloadDetail(undefined, {
                                                        flashMessage: "jres:31937076", //RC 31937076 : Vyřizující dokument byl přidán
                                                        flashMessageClass: "g-state-success"
                                                    });
                                                }
                                            }).always(function () { srv.close(); });
                                    }
                                }
                            );


                        },

                        //#endregion
                        kopieDokumentu: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var options = {
                                Ixp: l_sIxp
                            };
                            Gordic.Ssl.Dialogs.KopieDlg(this, options).on("closed", function (ev, retVal) { 
                                that.nactiPocetKopiiStatusbar();
                            });;
                        },
                        katastralniProfil: function () {
                            var that = this;
                            var l_sIxp = componentDto.ixp;
                            var options = { "Ixp": l_sIxp };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("ZalozitKatastralniProfil", options)
                                .done(function (retValAdd) {
                                    if (retValAdd.StavBool) {
                                        that.tryReloadDetail(undefined, {
                                            flashMessage: "jres:26257418", //RC 26257418 : Katastrální profil byl vytvořen.
                                            flashMessageClass: "g-state-success"
                                        });
                                    }
                                }).always(function () { srv.close(); });
                        },
                        //#region commandbar
                        evidovat: function () {
                            
                            var that = this;
                            if (componentDto.LzeEvidovatCj) {
                                this.flagEvidovat = true;
                                this.ulozitZmeny();
                                // spuštění save detail na serveru.
                                //this.postCall(["SaveDetail", null]).done(function (retVal, content) { if (retVal) { _this.ReloadWithNewContent(); } });
                            } else {
                                this.showFlash("jres:31937469", "warning", "idFlashInfo") //RC 31937469 : Nepovolená akce
                            }
                        },

                        //#endregion


                        priraditKeSpisu: function () {
                            var that = this;
                            var opt = {
                                DisableCJ: true,
                                IxpVkladanehoDok: componentDto.ixp,
                                TypSpis: 1,
                                CustomTitle: "jres:31937400", //RC 31937400 : Přiřadit ke spisu
                                CustomActionButtonCaption:"jres:31937401" //RC 31937401 : Přiřadit
                            };

                            Gordic.Wfl.Dialogs.GHledatIdentDokSpisDlg(this, opt)
                                .done(function(retVal){
                                    if (retVal && retVal.ixp && (retVal.ixp !== componentDto.ixp)) {
                                        var opt = {
                                            "IxpSpis": retVal.ixp,
                                            "IxpDoc": componentDto.ixp,
                                            "DatZmena": componentDto.DatZmena
                                        };
                                        var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                        srv.call("PriraditDokumentKeSpisu", opt)
                                            .done(function (retVal) {
                                                if (retVal.StavBool) {
                                                    that.tryReloadDetail(undefined, {
                                                        flashMessage: "jres:31937283", //RC 31937283 : Dokument byl přiřazen ke spisu
                                                        flashMessageClass: "g-state-success"
                                                    });
                                                }
                                            }).always(function () { srv.close(); });
                                    } 
                                })
                                .fail(function () {
                                    
                                });
                        },

                        priraditKeSpisuZrusit: function () {
                            var that = this;
                            var opt = {
                                "IxpSpisPrir": componentDto.IxpSpisPrir,
                                "Ixp": componentDto.ixp,
                                "DatZmena": componentDto.DatZmena
                            };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("PriraditDokumentKeSpisuZrusit", opt)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {
                                        that.tryReloadDetail(undefined, {
                                            flashMessage: "jres:31937285", //RC 31937285 : Přiřazení dokumentu ke spisu bylo zrušeno.
                                            flashMessageClass: "g-state-success"
                                        });
                                    }
                                }).always(function () { srv.close(); });
                        },
                      
                        vytvoritVlastniDokumentsVazbou: function () {
                            var that = this;
                            var options = {
                                TypDok: Gordic.Wfl.Globals.Enums.TypDok.Vlastni,
                                TypId: Gordic.Wfl.Globals.Enums.TypId.Ixp
                            };
                            Gordic.Wfl.Dialogs.GenerovaniIxp(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow)

                                .done(function (retVal, content) {
                                    var optNewDok = {};
                                    optNewDok.DetailDto = { ixp: retVal.Ixp };
                                    optNewDok.RezimPodani = 1;
                                    optNewDok.IxpInitProVazbuSouvisejicich = componentDto.ixp;
                                    var nazevObj = that.findFields("Vec").gfield("getValue");
                                    var saveSslProfil = that.saveSslProfil();
                                    optNewDok.PredplneniDatProPodani = {
                                        nazev: nazevObj && nazevObj.data ? nazevObj.data : undefined ,
                                        obsah_text: saveSslProfil.ObsahText,
                                        spis_pl: saveSslProfil.SpisPl,
                                        spis_znak: saveSslProfil.SpisZnak
                                    };
                                    that.otevriNovyDetail(optNewDok);
                                }); 

                        },
                        pocetKopiistatusBarBadge: pocetKopiistatusBarBadge,
                        nactiPocetKopiiStatusbar: function () {
                            if (Gordic.Isl.Sslspid && !content.SimpleMode && (this.RezimPodani == null || this.RezimPodani == 0)) {
                                Gordic.Isl.Sslspid.getPocetKopii({ Data: { IxpOriginalu: componentDto.IxpOriginalu } }).get()
                                    .done(function (ret) {
                                        if (ret != null && ret.Data != null && ret.Data.Pocet != null && ret.Data.Pocet > 0 ) {
                                            content.pocetKopiistatusBarBadge.value = ret.Data.Pocet;
                                            content.pocetKopiistatusBarBadge.update();
                                            content.actions.actPocetKopiiStatusBar.update({ visible: true });
                                        } else {
                                            content.actions.actPocetKopiiStatusBar.update({ visible: false });
                                        }


                                    });
                            }
                        },

                        odeslatPripominku: function () {
                            var that = this;
                            var options = {
                                parentContent: that,
                                opt: { Ixp: componentDto.ixp }
                            };
                            Gordic.Ssl.Dialogs.GSslEklepPripominkaDlg(options)
                                .then(function (retVal) {
                                    if (retVal) {
                                        //that.tryReloadDetail();
                                    }
                            });

                        }, 
                        odeslatNovePripominkoveRizeni: function () {
                            var that = this;
                            var options = {
                                parentContent: that,
                                opt: { Ixp: componentDto.ixp }
                            };
                            Gordic.Ssl.Dialogs.GSslEklepNovePripominkoveRizeniDlg(options)
                                .then(function (retVal) {
                                    if (retVal) {
                                        //that.tryReloadDetail();
                                    }
                                });

                        }, 

                        odeslanepripominky: function () {
                            var that = this;
                            
                            Gordic.Ssl.Dialogs.GEklepPripominkyPripominkovehoRizeniSeznamDlg({
                                parentContent: this,
                                opt: {
                                    StartFilter: {
                                        ixp_vyriz_eklep: componentDto.ixp
                                    }
                                }
                            })

                        }, 

                        sslDetailDokumentu_preevidence: function () {
                            var that = this;

                            Gordic.Ssl.Dialogs.PreevidenceDoSamostatneEvidenceDlg(that, { Ixp: componentDto.ixp }, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("closed", function (ev, retVal) {
                                if(retVal) {
                                    that.tryReloadDetail();
                                }
                            });

                        },

                        enableSslDetailDokumentu: function () {

                            var l_bActionEnabled = true;
                            if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }

                             //#region Dokument
                            this.actions.actVyrizujiciDokument.update({ enabled: (l_bActionEnabled && componentDto.LzeZalozitVyrizujiciDok) });
                            this.actions.actVytvoritDuplikat.update({ enabled: (l_bActionEnabled && componentDto.LzeVytvoritDuplikat) });
                            this.actions.actOznaceniPreevidovaniNahradniEvidence.update({ enabled: (l_bActionEnabled && componentDto.LzeOznacitJakoPreevidovaniZNahradniEvidence) });
                            this.actions.actVytvoritSpis.update({ enabled: (l_bActionEnabled && componentDto.LzeVytvoritSpis) });
                            this.actions.actVytvoritSpisDoSoucasti.update({ visible: false, enabled: (l_bActionEnabled && componentDto.actVytvoritSpisDoSoucasti) }); // u dokumentu neviditelné a disabled
                            
                            //#endregion

                            //#region Činnosti
                            //actVlozitDoSpisu
                            
                            var captionVlozitDoSpisu = "jres:26255159"; //RC 26255159 : Vložit do spisu
                            var icon = "gi-vlozit_do_spisu";
                            var actVlozitDoSpisuEnabled = true;
                            var rezim = true;
                            if (l_bActionEnabled && componentDto.LzePisemnostVyjmout) {
                                captionVlozitDoSpisu = "jres:26255325"; //RC 26255325 : Vyjmout ze spisu
                                icon = "gi-vyjmout_do_spisu";
                                rezim = false;
                            } else if (l_bActionEnabled && componentDto.LzePisemnostVlozit) {
                                captionVlozitDoSpisu = "jres:26255159"; //RC 26255159 : Vložit do spisu
                                rezim = true;
                            } else {
                                actVlozitDoSpisuEnabled = false;
                            }

                            this.actions.actVlozitDoSpisu.rezim = rezim;
                            this.actions.actVlozitDoSpisu.update({ enabled: actVlozitDoSpisuEnabled, icon: icon, caption: captionVlozitDoSpisu });
                            this.actions.actOdpovedVeSpisu.update({
                                enabled: (l_bActionEnabled && componentDto.LzeOdpovedVeSpisu),
                                visible: (l_bActionEnabled && componentDto.LzeOdpovedVeSpisu)
                            });

                            this.actions.actVyriditCJ.update({ enabled: (l_bActionEnabled && componentDto.LzeVyriditCj) });
                            this.actions.actZrusitVyrizeniCJ.update({ enabled: (l_bActionEnabled && componentDto.LzeOdvyriditCj) });
                            this.actions.actVyridit.update({ enabled: (l_bActionEnabled && componentDto.LzeVyriditAdActa) });
                            this.actions.actZrusitVyrizeni.update({ enabled: (l_bActionEnabled && componentDto.LzeZrusitVyrizeniAdActa) });
    
                            this.actions.actPriraditKeSpisu.update({ enabled: (l_bActionEnabled && componentDto.LzeDokumentPriraditKeSpisu) });
                            this.actions.actPriraditKeSpisuZrusit.update({ enabled: (l_bActionEnabled && componentDto.LzeDokumentPriraditKeSpisuZrusit) });

                            //#endregion

                            //#region Vazby
                            this.actions.actKopie.update({ enabled: l_bActionEnabled });
                            this.actions.actKatastralniProfil.update({ enabled: l_bActionEnabled && componentDto.LzeVytvoritKatastralniProfil });
                            //#endregion

                            //#region Tisk
                            this.actions.actTiskSablony.update({ enabled: (l_bActionEnabled && (componentDto.IxsSuAkt === componentDto.IxsSu)) });
                            //#endregion

                            //#region Ostatni
                            this.actions.actSpis.update({ enabled: (l_bActionEnabled && ((componentDto.PrizSpis === 2) || (componentDto.IxpSpisPrir != null))) });
                            //#endregion

                            //#region comandbar
                            this.actions.actEvidovat.update({ enabled: (l_bActionEnabled && componentDto.LzeEvidovatCj) });
                            this.actions.actEvidovatComandBar.update({ visible: (l_bActionEnabled && componentDto.LzeEvidovatCj) });
                            //#endregion


                            var permisionActAddVyrizDok = l_bActionEnabled  && componentDto.AddVyrizDokEnabled;
                            this.actions.actAddVyrizDok.update({ enabled: permisionActAddVyrizDok });
                            this.actions.actSouboryNearchivniFormat.update({ enabled: l_bActionEnabled && componentDto.SouboryNearchivniFormatEnabled });


                            this.actions.actVytvoritVlastniDokumentsVazbou.update({ enabled: l_bActionEnabled && componentDto.LzeVytvoritVlastniDokumentsVazbou });

                            // připomínky
                            this.actions.actOdeslatPripominku.update({ enabled: l_bActionEnabled && componentDto.OdeslatPripominkuEnabled });
                            this.actions.actOdeslatPripominku.update({ visible: l_bActionEnabled && componentDto.IsEKlepPripominka && (componentDto.gin_eklep_role > 1) });

                            this.actions.actOdeslanePripominky.update({ enabled: l_bActionEnabled && componentDto.IsEKlepPripominka });
                            this.actions.actOdeslanePripominky.update({ visible: l_bActionEnabled && componentDto.IsEKlepPripominka });

                            this.actions.actVytvorenePripominkoveRizeni.update({ enabled: l_bActionEnabled && componentDto.IsEKlepPripominka });
                            this.actions.actVytvorenePripominkoveRizeni.update({ visible: l_bActionEnabled && componentDto.IsEKlepPripominka });

                            // připomínkové žízení
                            this.actions.actOdeslatNovePripominkoveRizeni.update({ enabled: l_bActionEnabled && componentDto.OdeslatNovePripominkoveRizeniEnabled });
                            this.actions.actOdeslatNovePripominkoveRizeni.update({ visible: l_bActionEnabled && componentDto.IsEKlepPripominka && (componentDto.gin_eklep_mrol > 1) });

                        },

                        enableSslDetailTypoveEntity: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }

                            this.actions.actVyrizujiciDokument.update({ visible: false, enabled: false });
                            this.actions.actVytvoritDuplikat.update({ visible: false, enabled: false });
                            this.actions.actOznaceniPreevidovaniNahradniEvidence.update({ visible: false, enabled: false });

                            //#region Činnosti
                            this.actions.actVytvoritSpis.update({ visible: false, enabled: false });

                            var isTS = componentDto.TypSpis == 2;
                            var isSoucast = componentDto.TypSpis == 3 || componentDto.TypSpis == 5;
                            var isDil = componentDto.TypSpis == 4;

                            if(isSoucast) {
                                this.actions.actVytvoritSpisDoSoucasti.update({ visible: true, enabled: (l_bActionEnabled && componentDto.LzeVytvoritSpisDoSoucasti) });
                            } else {
                                this.actions.actVytvoritSpisDoSoucasti.update({ visible: false, enabled: false });
                            }

                            if(isSoucast || isDil) {
                                this.actions.actVlozitDoSpisu.update({ caption: "jres:26257277" }); //RC 26257277 : Vložit do součásti
                                this.actions.actVlozitDoSpisu.update({ visible: true, enabled: (l_bActionEnabled && isDil) }); // TODO pridat spravne lze. Aktualne v TK u soucasti false a u dilu se neomezuje vůbec

                                this.actions.actVyjmoutZeSoucasti.update({ visible: true, enabled: (l_bActionEnabled && isDil) }); // TODO lze
                            } else {
                                this.actions.actVlozitDoSpisu.update({ visible: false, enabled: false });
                            }

                            this.actions.actOdpovedVeSpisu.update({ visible: false, enabled: false });

                            this.actions.actVyriditCJ.update({ visible: false, enabled: false });
                            this.actions.actZrusitVyrizeniCJ.update({ visible: false, enabled: false });

                            if(isSoucast) {
                                this.actions.actVyridit.update({ visible: true, enabled: l_bActionEnabled && componentDto.LzeUzavritSoucast, icon: "gi-vyrizenouza", caption: "jres:26257298" }); //RC 26257298 : Uzavřít součást
                            } else if(isTS) {
                                this.actions.actVyridit.update({ visible: true, enabled: l_bActionEnabled && componentDto.LzeUzavritTypovySpis, icon: "gi-vyrizenouza", caption: "jres:26257301" }); //RC 26257301 : Uzavřít typový spis
                            } else {
                                this.actions.actVyridit.update({ visible: false, enabled: false });
                            }
                           
                            if(isTS) {
                                this.actions.actZrusitVyrizeni.update({ visible: true, enabled: l_bActionEnabled && componentDto.LzeZrusitUzavreniTypovehoSpisu, icon: ["gi-vyrizenouza", "fa-remove g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"], caption: "jres:26257327" }); //RC 26257327 : Zrušit uzavření typového spisu
                            } else {
                                this.actions.actZrusitVyrizeni.update({ visible: false, enabled: false });
                            }

                            this.actions.actPriraditKeSpisu.update({ visible: false, enabled: false });
                            this.actions.actPriraditKeSpisuZrusit.update({ visible: false, enabled: false });

                            //#endregion

                            //#region Vazby
                            this.actions.actKopie.update({ visible: false, enabled: false });
                            this.actions.actKatastralniProfil.update({ visible: false, enabled: false });
                            //#endregion

                            //#region Tisk
                            this.actions.actTiskSablony.update({ visible: false, enabled: false });
                            //#endregion

                            //#region Ostatni
                            this.actions.actSpis.update({ visible: false, enabled: false });// TODO odkaz na nadrizenou entitu
                            //#endregion

                            //#region comandbar
                            this.actions.actEvidovat.update({ visible: false, enabled: false });
                            this.actions.actEvidovatComandBar.update({ visible: false, enabled: false });
                            //#endregion

                            this.actions.actAddVyrizDok.update({ visible: false, enabled: false });
                            this.actions.actSouboryNearchivniFormat.update({ visible: false, enabled: false });

                            this.actions.actVytvoritVlastniDokumentsVazbou.update({ visible: false, enabled: false });

                            this.actions.actOdeslatPripominku.update({ visible: false, enabled: false });
                            this.actions.actOdeslanePripominky.update({ visible: false, enabled: false });
                            this.actions.actVytvorenePripominkoveRizeni.update({ visible: false, enabled: false });

                            this.actions.actOdeslatNovePripominkoveRizeni.update({ visible: false, enabled: false });
                            
                            this.actions.actSslDetailDokumentuPreevidence.update({ visible: false, enabled: false });
                        },
                    },

                    actions: { //může být zadáno jako pole nebo jako objekt
                        //#region Dokument
                        actVyrizujiciDokument: {
                            caption: "jres:26255246", //RC 26255246 : Nové podání vyřizujícího dokumentu
                            icon: "gi-paper |gi-tick gi-bgw gi-stack-pos--rb",
                            run: function () {
                                $.content(this).vyrizujiciDokument();
                            }
                        },
                        actVytvoritDuplikat: {
                            caption: "jres:26256695",  //RC 26256695 : Vytvořit duplikát
                            icon: "gi-copy",
                            run: function () {
                                $.content(this).vytvoritDuplikat();
                            }
                        },
                        actOznaceniPreevidovaniNahradniEvidence: {
                            caption: "jres:26257258", //RC 26257258 : Označení jako přeevidování z náhradní evidence
                            // icon: "gi-paper_question",
                            run: function () {
                                $.content(this).sslDetailDokumentu_oznaceniPreevidovani();
                            }
                        },
                        //#endregion

                        //#region Činnosti
                        actVytvoritSpis: {
                            caption: "jres:26255262", //RC 26255262 : Vytvořit spis
                            icon: "gi-spis gi-stack-bg|fa-plus g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw",
                            run: function () {
                                $.content(this).vytvoritSpis();
                            }
                        },
                        actVytvoritSpisDoSoucasti: {
                            caption: "jres:26257274", //RC 26257274 : Vytvořit spis do součásti
                            icon: "gi-spis gi-stack-bg|fa-plus g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw",
                            run: function () {
                                $.content(this).vytvoritSpisDoSoucasti();
                            }
                        },
                        actOdpovedVeSpisu: {
                            caption: "jres:31937485", //RC 31937485 : Odpověď ve spisu
                            icon: "gi-spis gi-stack-bg|gi-arrow g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw",
                            toolip:"jres:31937488", //RC 31937488 : Vytvoření vlastního dokumentu do spisu - odpověď na podání
                            run: function () {
                                $.content(this).odpovedVeSpisu();
                            }
                        },
                        actVlozitDoSpisu: {
                            caption: "jres:26255159",  //RC 26255159 : Vložit do spisu
                            //icon: "gi-pencil",
                            rezim:true,
                            run: function () {
                                var isSoucast = componentDto.TypSpis == 3 || componentDto.TypSpis == 5;
                                var isDil = componentDto.TypSpis == 4;

                                if(componentDto.wfl_typspisy != 0 && (isSoucast || isDil)) {
                                    $.content(this).sslVlozitDoSoucasti();
                                } else {
                                    $.content(this).vlozitDoSpisu(this.rezim);
                                }
                            }
                        },
                        actVyjmoutZeSoucasti: {
                            caption: "jres:26257325",  //RC 26257325 : Vyjmout
                            //icon: "gi-pencil",
                            visible: false,
                            run: function () {
                                $.content(this).sslVyjmoutZeSoucasti();
                            }
                        },
                        actVyriditCJ: {
                            caption: "jres:26255323",  //RC 26255323 : Vyřídit ČJ
                            icon: "gi-vyrizeno",
                            run: function () {
                                $.content(this).vyridit('Vyridit');
                            }
                        },
                        actZrusitVyrizeniCJ: {
                            caption: "jres:26255324",  //RC 26255324 : Zrušit vyřízení ČJ
                            icon: ["gi-vyrizeno", "fa-remove g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            run: function () {
                                $.content(this).zrusitVyrizeniCJ();
                            }
                        },
                        actVyridit: {
                            caption: "jres:26255260", //RC 26255260 : Vyřídit
                            icon: "gi-vyrizeno",
                            run: function () {
                                var that = $.content(this);

                                var isDokument = componentDto.TypSpis == 0;
                                var isSoucast = componentDto.TypSpis == 3 || componentDto.TypSpis == 5;
                                var isTS = componentDto.TypSpis == 2;
                                var isDil = componentDto.TypSpis == 4;

                                if (isDokument) {
                                    that.vyriditAdActa();
                                } else if (isTS) {
                                    that.dialogs.confirm("?", "jres:26257302").on("closed", function (ev, retVal) { //RC 26257302 : Opravdu chcete uzavřít typový spis?
                                        if (retVal === "yes") {
                                            that.uzavritTypovySpis();
                                        }
                                    });
                                } else if (isSoucast) {
                                    that.dialogs.confirm("?", "jres:26257296").on("closed", function (ev, retVal) { //RC 26257296 : Opravdu chcete uzavřít součást?
                                        if (retVal === "yes") {
                                            that.uzavritSoucast();
                                        }
                                    });
                                } else if (isDil) {
                                    that.dialogs.alert("jres:26257295"); //RC 26257295 : Díly jsou dle NSESSS vyřizovány automaticky na základě období zadané na věcné skupině.
                                    return;
                                } else {
                                    return;
                                }
                            }
                        },
                        actZrusitVyrizeni: {
                            caption: "jres:26255330",  //RC 26255330 : Zrušit vyřízení
                            icon: ["gi-vyrizeno", "fa-remove g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            run: function () {
                                var isTS = componentDto.TypSpis == 2;

                                if(isTS) {
                                    $.content(this).zruseniUzavreniTypovehoSpisu();
                                } else {
                                    $.content(this).zruseniVyrizeniDokumentu();
                                }

                            }
                        },

                        actPriraditKeSpisu: {
                            caption: "jres:31937286",  //RC 31937286 : Přiřadit ke spisu
                            tooltip: "jres:31937286",  //RC 31937286 : Přiřadit ke spisu
                            icon: Gordic.Gin.Globals.Icons.EntitaPrirazenaKeSpisu().icon,
                            run: function () {
                                $.content(this).priraditKeSpisu();
                            }
                        },
                        actPriraditKeSpisuZrusit: {
                            caption: "jres:31937287",  //RC 31937287 : Zrušit přiřazení ke spisu
                            tooltip: "jres:31937287",  //RC 31937287 : Zrušit přiřazení ke spisu
                            icon: [
                                Gordic.Gin.Globals.Icons.EntitaPrirazenaKeSpisu().icon[0],
                                "fa-remove g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"
                            ],
                            run: function () {
                                $.content(this).priraditKeSpisuZrusit();
                            }
                        },


                        //#endregion

                        //#region Vazby
                        actKopie: {
                            caption: "jres:26255193",  //RC 26255193 : Kopie dokumentu
                            icon: "gi-copy",
                            run: function () {
                                $.content(this).kopieDokumentu();
                            }
                        },

                        actKatastralniProfil: {
                            caption: "jres:26257416",  //RC 26257416 : Katastrální profil
                            //icon: "gi-copy",
                            run: function () {
                                $.content(this).katastralniProfil();
                            }
                        },
                        //#endregion

                        //#region Tisk
                        actTiskSablony: GAction.createPrintAction({
                            name: "actTiskSablony",
                            tema: "usu_ptm_pisdet",
                            icon: "gi-print|gi-index gi-bgw gi-stack-pos--rb g-state-text g-state-info",
                            caption: "jres:26255344", //RC 26255344 : Šablony
                            reportStarting: function (rep) {
                                var def = $.Deferred();
                                rep.params.X0000 = componentDto.ixp;
                                rep.params.Preselect = false;
                                rep.params.IXP = componentDto.ixp;

                                //if (componentDto.Ssl_tnazev_doko && componentDto.Ssl_tnazev_doko !== "") {
                                //    rep.params.EleFilename = componentDto.Ssl_tnazev_doko;
                                //}
                                rep.params.OBSAH = rep.originalName;
                                var srv = $.content(this).createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                var optGenerujNazev = {
                                    ixp: rep.params.X0000,
                                    param: "ssl_tnazev_doko",
                                    alvName: rep.originalName ? rep.originalName : ""  // originalName  name
                                };
                                srv.call("GenerujNazevFileNameTisk", optGenerujNazev)
                                    .done(function (retVal) {
                                        if (retVal.StrParam1 && retVal.StrParam1 !== "") {
                                            rep.params.EleFilename = retVal.StrParam1;

                                        }
                                        def.resolve();
                                    }).always(function () { srv.close(); });
                                return def.promise();


                            },
                            reportFinished: function (ev, ri) {
                                var cnt = $.content(this);
                                if (ri) {
                                    const zpUloz = parseInt(ri.customData["zpUloz"] != null ? ri.customData["zpUloz"] : "0");
                                    Gordic.Ginis.DbModel.GGinczulEnumValues()
                                        .then(function (vals) {
                                            const zpUlozDto = vals.find(function (v) {
                                                return v.value === zpUloz
                                            });
                                            var textFlash = "jres:31937394"; //RC 31937394 : Šablona byla vygenerována.
                                            if (zpUlozDto && zpUlozDto.meta.zpus_uloz_txt && zpUlozDto.meta.zpus_uloz != 0) { // neevidovaný výstup 0 se neukládá do ULO
                                                var zpusob = zpUlozDto.meta.zpus_uloz_txt;
                                                textFlash = textFlash + " " + String.Format("jres:31937396", zpusob); //RC 31937396 : Způsob uložení: {0}
                                                cnt.tryReloadDetail(undefined, {
                                                    flashMessage: textFlash,
                                                    flashMessageClass: "g-state-success",
                                                });
                                            } else {
                                                cnt.tryReloadDetail(undefined, {
                                                    flashMessage: textFlash,
                                                    flashMessageClass: "g-state-success",
                                                });
                                            }
                                        });
                                }
                            }
                            
                        }),
                        //#endregion

                        //#region Ostatni
                        actSpis: {
                            caption: "jres:31937057",  //RC 31937057 : Detail spisu
                            icon: "gi-spis",
                            run: function () {
                                $.content(this).detailSpisu();
                            }
                        },
                         //#endregion

                        //#region comandbar
                        actEvidovat: {
                            caption: "jres:26255346", //RC 26255346 : Evidovat
                            icon: Gordic.Gin.Icons.ActionEnum.evidovatCj,
                            run: function () {
                                $.content(this).evidovat();
                            }
                        },
                        actEvidovatComandBar: {
                            caption: "jres:26255346", //RC 26255346 : Evidovat
                            //icon: "gi-pencil",
                            customClass: "g-button--primary",
                            run: function () {
                                $.content(this).evidovat();
                            }
                        },
                        actAddVyrizDok: {
                            caption: "jres:31937315", //RC 31937315 : Přidat vyřizující dokument
                            toolip: "jres:31937316", //RC 31937316 : Přidat existující vyřizující dokument
                            icon: ["gi-vyrizeno", "gi-plus_bold g-state-text g-state-success gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            run: function () {
                                $.content(this).addVyrizDok();
                            }
                        },

                        actSouboryNearchivniFormat: new GAction(Gordic.Ssl.PreActions.SouboryNearchivniFormat({
                            inputData: function (action, event, ctx, param) {
                              
                                var def = $.Deferred();
                                def.resolve(
                                    {
                                        ListSelectedRowsInfo: [
                                            {
                                            Ixp: componentDto.ixp,
                                            DatZmena: componentDto.DatZmena,
                                            PrizSpis: componentDto.PrizSpis
                                            }
                                        ]
                                });
                                return def.promise();

                            },
                            done: function (retVal) {
                                
                                //if (retVal != null) {
                                //    content.zpracujResultSGroupResult(retVal);

                                //}

                            },
                        })),

                        actVytvoritVlastniDokumentsVazbou: {
                            caption: "jres:31937407", //RC 31937407 : Podání dokumentu s vazbou
                            toolip: "jres:31937406", //RC 31937406 : Podání vlastního dokumentu s vazbou
                            icon: ["gi-navazany_zaznam", "gi-plus g-state-text g-state-success gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            run: function () {
                                $.content(this).vytvoritVlastniDokumentsVazbou();
                            }
                        },
                        actPocetKopiiStatusBar: {
                            caption: "jres:31937476", //RC 31937476 : KOPIÍ
                            tooltip: "jres:31937477", //RC 31937477 : Počet kopií dokumentu
                            visible: false,
                            //badge: new GObservableObject({
                            //    value: "0",
                            //    tooltip: "jres:31937472" //RC 31937472 : Počet kopií dokumentu.
                            //}),
                            run: function (ev, cv) {
                                if (content.actions.actKopie) {
                                    content.actions.actKopie.run();
                                }
                            }
                        },
                        actOdeslatPripominku: {
                            caption: "jres:31937501", //RC 31937501 : Odeslat připomínku
                            toolip: "jres:31937502", //RC 31937502 : Odeslat připomínku do eKLEP
                            icon: ["gi-budova", "gi-send g-state-text g-state-success gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            run: function () {
                                $.content(this).odeslatPripominku();
                            }
                        },

                        
                        actOdeslanePripominky: new GAction(Gordic.Ssl.PreActions.OtevriEklepPripominkyPripominkovehoRizeni({
                            actionParams: {
                                name: "actOdeslanePripominky",
                            },
                            inputData: function (action, event, ctx, param) {
                                var def = $.Deferred();
                                def.resolve(
                                    {
                                        parentContent: content,
                                        requestDto: {
                                            StartFilter: {
                                                ixp_vyriz_eklep: componentDto.ixp
                                                //pid_eklep
                                            }
                                        }
                                    });
                                return def.promise();

                            },
                            done: function (retVal) {
                                ;
                            },
                        })),
                        
                        actVytvorenePripominkoveRizeni: new GAction(Gordic.Ssl.PreActions.OtevriEklepPripominkovaRizeni({
                            actionParams: {
                                name: "actVytvorenePripominkoveRizeni",
                            },
                            inputData: function (action, event, ctx, param) {
                                var def = $.Deferred();

                                def.resolve({
                                    parentContent: content,
                                    opt: {
                                        StartFilter: {
                                            ixp_doc: componentDto.ixp
                                        }
                                    }
                                });

                                return def.promise();
                            }
                        })),

                        actOdeslatNovePripominkoveRizeni: {
                            caption: "jres:31937572",  //RC 31937572 : Odeslání připomínkového řízení
                            toolip: "jres:31937572.",  //RC 31937572 : Odeslání připomínkového řízení
                            icon: ["gi-budova", "gi-plus g-state-text g-state-success gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            run: function () {
                                $.content(this).odeslatNovePripominkoveRizeni();
                            }
                        },


                        actSslDetailDokumentuPreevidence: {
                            caption: "jres:26257213", //RC 26257213 : Přeevidence do samostatné evidence
                            toolip: "jres:26257213", //RC 26257213 : Přeevidence do samostatné evidence
                            icon: ["gi-CJ", "fa-times-circle g-state-text g-state-success gi-stack-fw gi-stack-pos--rb gi-bgw"],
                            visible: componentDto.gin_n23_vedd == 1, // + případně rozšířit o verzi DB, která je uvedena v dialogu
                            run: function () {
                                $.content(this).sslDetailDokumentu_preevidence();
                            }
                        },
                       
                        //#endregion

 
                    },

                    menuBar: [

                        //#region Dokument
                        Gordic.Wfl.Globals.MenuDefinitions.detailDokument(),
                        { action: "actSpis", parent: "menuDokument", before: "menuDokumentSeparator1", favorite: true  },
                        { id:"menuDokumentSeparator4", type: "separator", parent: "menuDokument", after: "menuPodaniCizi" }, 
                        { action: "actVyrizujiciDokument", parent: "menuDokument", after: "menuDokumentSeparator4" },
                        { action: "actVytvoritDuplikat", parent: "menuDokument", after: "menuVyrizujiciDokument" },
                        { action: "actOznaceniPreevidovaniNahradniEvidence", parent: "menuDokument", after: "menuVytvoritDuplikat" },
                        //#endregion

                        //#region Činnosti
                        Gordic.Wfl.Globals.MenuDefinitions.detailCinnosti(),
                        
                       
                        { action: "actVytvoritSpis", parent: "menuWflCinnosti", before: "menuCinnostiSeparator1", favorite: true },
                        { action: "actVytvoritSpisDoSoucasti", parent: "menuWflCinnosti", before: "menuCinnostiSeparator1", favorite: true },
                        { action: "actVlozitDoSpisu", parent: "menuWflCinnosti", after: "menuVytvoritSpis", favorite: true },
                        { action: "actVyjmoutZeSoucasti", parent: "menuWflCinnosti", after: "menuVytvoritSpis", favorite: true },
                        { action: "actOdpovedVeSpisu", parent: "menuWflCinnosti", after: "menuVytvoritSpis", favorite: true },

                        { action: "actPriraditKeSpisu", parent: "menuWflCinnosti", after: "menuVlozitDoSpisu", favorite: true },
                        { action: "actPriraditKeSpisuZrusit", parent: "menuWflCinnosti", after: "menuPriraditKeSpisu", favorite: true },

                        { action: "actSouboryNearchivniFormat", parent: "menuWflCinnosti", after: "menuPriraditKeSpisuZrusit"},
                        { id: "menuCinnostiSeparator6", type: "separator", parent: "menuWflCinnosti", after: "menuSouboryNearchivniFormat" },
                        { action: "actAddVyrizDok", parent: "menuWflCinnosti", after: "menuCinnostiSeparator6" },
                        { action: "actVyriditCJ", parent: "menuWflCinnosti", after: "menuCinnostiSeparator6" },
                        { action: "actZrusitVyrizeniCJ", parent: "menuWflCinnosti", after: "menuVyriditCJ" },
                        { id: "menuCinnostiSeparator7", type: "separator", parent: "menuWflCinnosti", after: "menuZrusitVyrizeniCJ" }, 
                        { action: "actVyridit", parent: "menuWflCinnosti", after: "menuCinnostiSeparator7" },
                        { action: "actZrusitVyrizeni", parent: "menuWflCinnosti", after: "menuVyridit" },
                        { action: "actEvidovat", parent: "menuWflCinnosti", before: "menuZrusitVyrizeni" },
                        { action: "actSslDetailDokumentuPreevidence", parent: "menuWflCinnosti", after: "menuEvidovat" },
                        //#endregion

                        //#region Vazby

                        $.extend({}, Gordic.Wfl.Globals.MenuDefinitions.detailVazby(), { favorite: true }),
                        { action: "actVytvoritVlastniDokumentsVazbou", parent: "menuWflVazby", favorite: true }, /*after: "menuSouvisejici",*/

                        { action: "actKopie", parent: "menuWflVazby", after: "menuDotcSubjekty", favorite: true }, 
                        { action: "actKatastralniProfil", parent: "menuWflVazby", after: "menuKopie", favorite: true }, 
                        //#endregion

                        //#region Tisk
                        $.extend({}, Gordic.Wfl.Globals.MenuDefinitions.detailTisk(), { favorite: true }),
                        { action: "actTiskSablony", parent: "menuTisk", after: "menuTiskSablonyWord" }

                        
                        
                        //#endregion

                    
                    ],
                    commandBar: [
                         { action: "actEvidovatComandBar", before: "commandCloseButtonClick", primary: true }
                    ],
                    statusBar: [
                        {
                            action: "actPocetKopiiStatusBar", badge: pocetKopiistatusBarBadge, after: "statusDoplnujiciInformaceStatus" } //actDoplnujiciInformaceStatus
                    ],

                };

                if (componentDto.IsEKlepPripominka) {
                    result.menuBar.push($.extend({}, Gordic.Wfl.Globals.MenuDefinitions.detailEKlep()));
                    result.menuBar.push({ action: "actOdeslatPripominku", parent: "menuEKlep" });
                    result.menuBar.push({ action: "actOdeslanePripominky", parent: "menuEKlep" });
                    result.menuBar.push({ id: "menuDokumentSeparator41", type: "separator", parent: "menuEKlep" });
                    result.menuBar.push({ action: "actOdeslatNovePripominkoveRizeni", parent: "menuEKlep" });
                    result.menuBar.push({ action: "actVytvorenePripominkoveRizeni", parent: "menuEKlep" });

                }

               
                //#endregion


                return result;
               
            }

        }

    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\DetailBuilderComponents\GSslDetailDoruceniComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslDetailDoruceni: {

            create: function (componentDto) {
                var result = {
                    onMenuBuild: [
                        function (builder, menus) {
                            this.enableSslDetailDoruceniActions();
                        }
                    ],
                    onBuild: [
                        function () {
                            this.enableSslDetailDoruceni();
                            this.nasetujDoruceni(this.SslDetailDoruceni_Dto);

                            if (this.ReadOnlyEko && this.JinaAgenda) {
                                this.enableReadOnlyEkoDoruceni();
                            }
                            this.setAILinkDoruceni();
                        },
                    ],
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                        nasetujDoruceni: function (dto) {
                            var that = this;
                            var form = this.findForms("formSslDoruceni");
                            //form.addHelpContext("DetailDoruceni");

                            var fields = form.findFields();

                            fields.gfield("model", "apply", dto);
                            fields.gfield("model", "validators", componentDto.Validators);
                            form.gform("waitForValues").done(function () {
                                if (Gordic.Utils.WidgetExists("gfield", fields)) {
                                    Utils.Form.markRequired(fields);
                                    fields.gfield("confirm");
                                }
                            });
                        },

                        

                        saveSslDetailDoruceni: function () {
                            var doruceniModel = {
                                IsDetailDoruceni: true
                            };
                            var doruceniForm = this.findForms("formSslDoruceni");
                            doruceniForm.findFields().gfield("model", "collect", doruceniModel);
                            if (doruceniForm.gform("hasChanged")) {
                                doruceniModel.MetadataChanged = true;
                            }
                            return doruceniModel;
                        },

                        saveSslDetailDoruceniEko: function () {

                            var doruceniModel = {
                                IsDetailDoruceni: true
                            };
                            var doruceniForm = this.findForms("formSslDoruceni");
                            doruceniForm.findFields().gfield("model", "collect", doruceniModel);
                            if (doruceniForm.gform("hasChanged")) {
                                doruceniModel.MetadataChanged = true;
                            }

                            var retDto = {};

                            retDto.Doruceni = retDto.Doruceni ? retDto.Doruceni : {};
                            retDto.Doruceni.stat = doruceniModel.StatDoruceni;
                            retDto.Doruceni.psc = doruceniModel.PscDoruceni;
                            retDto.Doruceni.dat_odes = doruceniModel.DatOdes;
                            retDto.Doruceni.znacka_odes = doruceniModel.ZnackaOdesilateleDoruceni;
                            retDto.Doruceni.dat_ze_dne = doruceniModel.DatZeDneDoruceni;
                            retDto.Doruceni.pod_cis = doruceniModel.PodaciCislo;
                            retDto.Doruceni.pod_cis = doruceniModel.SKMessageId;
                            retDto.Doruceni.zpusob_dor = doruceniModel.ZpusobDoruceni;
                            retDto.Doruceni.druh_zas = doruceniModel.DruhZasilkyDoruceni;
                            retDto.Doruceni.druh_zas_zach = doruceniModel.ZachazeniDoruceni;
                            retDto.Doruceni.poznamka = doruceniModel.PoznamkaDoruceni;
                            retDto.Doruceni.dat_prij_pod = componentDto.DatPrijPod;
                            retDto.Doruceni.sp_zn_odes = doruceniModel.SpZnOdes;
                            retDto.Doruceni.dat_doruc = componentDto.DatDoruc;



                            return retDto;
                        },

                        setAILinkDoruceni: function () {
                            var form = this.findForms("formSslDoruceni");
                            this.aiAttachments?.upsert({
                                id: "formSslDoruceni",
                                caption: "Doručení",
                                dataWrapper: {
                                    kind: "form",
                                    form: form // source formulář typu JQuery<HTMLElement>
                                }
                            });

                        },

                        //#region akce
                        //Detail DZ
                        detailDZClick: function (prizNadr) {
                            var that = this;
                            var ixp = componentDto.ixp;
                            var opt = {
                                "Ixp": ixp,
                                "PrizNadr": prizNadr
                            };
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("GetScriptShowDetailDZ", opt)
                                .done(function (retVal) {
                                    if (retVal) {
                                        // telo presunout do spolecne funkce wfl utils nebo attachments utils
                                        // pridat dotaz na duvod otevirani atd.
                                        var dto = {
                                            DownloaderType: "Gordic.Wfl.WebClient.Prilohy.GFileDownloader",
                                            AutoDownload: true,
                                            DisablePluginDownload: true,
                                            CustomData: {
                                                "ixp": ixp,
                                                "ixb": retVal,
                                                //"verze": porCislo,
                                            }
                                        };
                                        var doc = new GDocument(that);
                                        doc.downloadDocument(dto, function (args) {
                                            // console.log("doc.downloadCompleted", this, args);
                                        });
                                    }
                                }).always(function () { srv.close(); });
                        },
                       

                        otevriOknoInfoDZ: function () {
                            var that = this;
                            var ixp = componentDto.ixp;

                            //Wfl_OtevriOknoInfoDZ(componentDto.MessageId, componentDto.Mailbox, ixp, false);
                            // dialog Jirky Š.
                            /*
                            var opt = {
                                idZpravy: componentDto.MessageId,
                                mailbox: componentDto.Mailbox,
                                ixp: componentDto.ixp,
                            };
                            Gordic.Wfl.Dialogs.DatovaZpravaInfoDlg(this, opt, Gordic.Gin.Globals.Enums.ModOtevreni.showModalWindow);
                            */
                            // dialog Tomáše
                            var opt = {
                                IdDatoveZpravy: componentDto.MessageId,
                                IdDatoveSchranky: componentDto.Mailbox,
                                Ixp: componentDto.ixp,
                                PovolitTiskDorucenky: true
                            };
                            var optDialog = {
                                parentContent: this,
                                opt: opt,
                                ModOtevreni: Gordic.Gin.Globals.Enums.ModOtevreni.showModalWindow
                            };

                            Gordic.Wfl.Dialogs.GDatovaZpravaIsdsInfoDlg(optDialog);

                        },
                        //OpravaMetadat
                        //opravaMetadat: function () {
                        //    var that = this;
                        //    var ixp = componentDto.ixp;
                        //    console.log("TODO");
                        //    var url = encodeURI("~/ElPodani/OpravaMetadatElPodani.aspx?ixp=" + ixp);
                        //    var retVal = ShowModalWindowEx(url, "Oprava", 700, 600, false, false, false);
                        //},
                        //#endregion
                        enableSslDetailDoruceniActions: function () {
                            var l_bActionEnabled = true;
                            if (componentDto.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }
                            this.actions.actTiskPruvodkyDoruceni.update({ enabled: componentDto.TiskPruvodkyEnabled, visible: componentDto.TiskPruvodkyVisible });
                            this.actions.actDetailDZDoruceni.update({ enabled: componentDto.DetailDZEnabled, visible: componentDto.DetailDZVisible });
                            this.actions.actDetailNadrDZDoruceni.update({ enabled: componentDto.DetailNadrDZEnabled, visible: componentDto.DetailNadrDZEnabled });
                            this.actions.actInfoISDSDoruceni.update({ enabled: componentDto.InfoISDSEnabled, visible: componentDto.InfoISDSVisible });
                            // this.actions.actOpravaMetadatDoruceni.update({ enabled: componentDto.OpravaMetadatEnabled, visible: componentDto.OpravaMetadatVisible });

                        },
                        enableSslDetailDoruceni: function () {

                            var l_bActionEnabled = true;
                            if (componentDto.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }

                            var fieldEnabled = componentDto.EditMode || this.RezimPodani != 0;
                            this.findFields("ZpusobDoruceni,ZachazeniDoruceni,DruhZasilkyDoruceni,PodaciCislo,SKMessageId,PscDoruceni,StatDoruceni,DatDoruc,DatZeDneDoruceni," +
                                "DatOdeslDoruceni,ZnackaOdesilateleDoruceni,SpZnOdes,PoznamkaDoruceni"
                            ).gfield("option", "disabled", !fieldEnabled);

                        },
                        enableReadOnlyEkoDoruceni: function () {
                            //m_oCbZpusDoruceni.ReadOnly = readOnlyEkoProfil;
                            //cbDruhZachazeni.ReadOnly = readOnlyEkoProfil;
                            //m_oCbDruhZasilky.ReadOnly = readOnlyEkoProfil;
                            //m_oTbPodaciCislo.ReadOnly = readOnlyEkoProfil;
                            //m_oTbDatumOdeslani.ReadOnly = readOnlyEkoProfil;
                            //m_oTbDatumZeDne.ReadOnly = readOnlyEkoProfil;  // ALF 14.11.2014 - proč by nemělo jít editovat datum ze dne? || DocInfo.SSl == 1;
                            //tbZnOdesilatele.ReadOnly =
                            //    tbSpisZnOdes.ReadOnly = readOnlyEkoProfil; // ALF 14.11.2014 || DocInfo.SSl == 1;
                            //m_oTPostaStatPsc.ReadOnly = readOnlyEkoProfil; // ALF 14.11.2014 || DocInfo.SSl == 1;
                            //m_oTbPoznamka.ReadOnly = readOnlyEkoProfil; // ALF 14.11.2014 || DocInfo.SSl == 1;

                            this.findFields("ZpusobDoruceni,ZachazeniDoruceni,DruhZasilkyDoruceni,PodaciCislo,SKMessageId,PscDoruceni,StatDoruceni,DatDoruc,DatZeDneDoruceni," +
                                "DatOdeslDoruceni,ZnackaOdesilateleDoruceni,SpZnOdes,PoznamkaDoruceni"
                            ).gfield("option", "disabled", true);


                            //?? nevím zda jde editovat
                            //m_oTbDatDoruceni.Enabled = !readOnlyEkoProfil;  // ALF 14.11.2014 - proč by nemělo jít editovat datum ze dne? || DocInfo.SSl == 1;
                            //this.findFields("DatOdeslDoruceni").gfield("option", "disabled", true);






                        }
                    },

                    actions: { //může být zadáno jako pole nebo jako objekt

                        actTiskPruvodkyDoruceni: GAction.createPrintAction({
                            name: "actTiskPruvodkyDoruceni",
                            tema: "pod_ptm_pruelpo",
                            caption: "jres:26255551", //RC 26255551 : Tisk průvodky
                            reportStarting: function (rep) {
                                rep.params.X0000 = $.content(this).findFields("IdElPodani").gfield("getValue");
                                rep.params.X0001 = componentDto.IxsIsu;
                                rep.params.X0002 = componentDto.ixp;
                                rep.params.Preselect = false;
                                rep.params.IXP = componentDto.ixp;
                            },
                        }),
                        actDetailDZDoruceni: {
                            caption: "jres:31937540",  //RC 31937540 : Původní zpráva
                            tittle: "jres:31937541", //RC 31937541 : Původní podoba zprávy elektronického podání
                            
                            run: function () {
                                $.content(this).detailDZClick(false);
                            }
                        },
                        actDetailNadrDZDoruceni: {
                            caption: "jres:31937542", //RC 31937542 : Původní zpráva nerozebraná
                            tittle: "jres:31937543", //RC 31937543 : Původní podoba zprávy nerozebraného/nerozloženého podání
                            run: function () {
                                $.content(this).detailDZClick(true);
                            }
                        },
                        actInfoISDSDoruceni: {
                            caption: "jres:31937061", //RC 31937061 : Info z ISDS
                            run: function () {
                                $.content(this).otevriOknoInfoDZ();
                            }
                        },
                        //actOpravaMetadatDoruceni: {
                        //    caption: "jres:31937062", //RC 31937062 : Oprava metadat
                        //    run: function () {
                        //        $.content(this).opravaMetadat();
                        //    }
                        //},

                   
                    },

                    tabs: {
                        SslDoruceni: {
                            tabParams: {
                                title: "jres:26255294" //RC 26255294 : Doručení
                                , opened: true,  //1. tab je pro agednovou hlavičku, ta je pro dokumenty, spisy, zakázky atp. vždy L2M2S1. BO detaily mimo wfl (tzn. dokumenty, spisy) jsou v L1M1S1 //RC 26255308 : Dokument
                                menuBar: [
                                    { action: "actTiskPruvodkyDoruceni", favorite: true },
                                    { action: "actDetailDZDoruceni", favorite: true },
                                    { action: "actDetailNadrDZDoruceni", favorite: true },
                                    { action: "actInfoISDSDoruceni", favorite: true },
                                  // { action: "actOpravaMetadatDoruceni", favorite: true },
                                ],
                                group: Gordic.Prefabs.TabGroups.Doruceni()
                            },
                            /*{
                    id: "tabAttachments",
                        tabParams: { title: "Přílohy" },
            contentParams: { className: componentDto.attachmentMainContent, serverParams: componentDto.attachmentMainContentDto || { Ixp: inputDto.ixp, NazevUDA: componentDto.NazevUDA, PopisUda: componentDto.PopisUda } }
        }*/
                            init: function (tab) {
                                //#region definice tab dokumentu
                                var that = $.content(tab);

                                var doruceniForm = new Gordic.Forms
                                    .Form({ 
                                            name: "formSslDoruceni", 
                                              layoutDescriptor: "L2M2S1, L-3-9-0, M-3-9-0, S-12-12-0"
                                        });
                              
                                doruceniForm
                                    .addSection("jres:32170293") //RC 32170293 : Způsob doručení
                                    .addRow("jres:26255413")  //RC 26255413 : Způsob doručení
                                    .addField("gselectbox", Gordic.Prefabs.Select.wflczpd(), {
                                        name: "ZpusobDoruceni",
                                        model: "model.ZpusobDoruceni=value.zpusob_dor",
                                        validators: [
                                            new Gordic.Validators.Base({
                                                message: "jres:26257184", //RC 26257184 : Nelze zadat hodnotu neurčeno.
                                                validate: function (value) {
                                                    /// <summary>s the specified value.</summary>
                                                    /// <param name="value">The value.</param>
                                                    /// <returns></returns>
                                                    if (componentDto.ssl_pod_zpdorp === 1 && value && value.zpusob_dor === 0) {
                                                        return false;
                                                    }
                                                    return true;
                                                },

                                            })
                                        ],
                                        // 06.06.2024 - TFeik
                                        // Přidán filtr priz_pro_doruc.
                                        // https://phabricator.gordic.cz/T35255
                                        serverFilters: {
                                            priz_pro_doruc: 1,
                                            zpusob_dor: componentDto.ssl_pod_zpdorp === 1 ? "!= 0" : undefined
                                        }
                                        //serverFilters: componentDto.ssl_pod_zpdorp === 1 ? { zpusob_dor: "!= 0" } : undefined,
                                        //(UserProcess.Configuration.GetDatabaseParameter("ssl_pod_zpdorp", 0) == 1) && (o.ZpusobDoruceni.ZpusobDor.IsNull || o.ZpusobDoruceni.ZpusobDor== 0);
                                    })
                                    .addRow("jres:26255497") //RC 26255497 : Druh zacházení
                                    .addField("gselectbox", Gordic.Prefabs.Select.wflcdzz(), {
                                        name: "ZachazeniDoruceni",
                                        model: "model.ZachazeniDoruceni=value.druh_zas_zach"
                                    })
                                    .addRow("jres:26255498") //RC 26255498 : Druh zásilky dor. poš.
                                    .addField("gselectbox", Gordic.Prefabs.Select.wflcdrz(), {
                                        name: "DruhZasilkyDoruceni",
                                        model: "model.DruhZasilkyDoruceni=value.druh_zas"
                                    });
                                if (componentDto.SKMessageId != null) { // Místo podacího čísla zobrazím message ID
                                    doruceniForm.addRow("jres:31937482") //RC 31937482 : Identifikátor zprávy
                                        .addField("gstringbox", {
                                            name: "SKMessageId",
                                        });    
                                } 
                                else {
                                    doruceniForm.addRow("jres:26255412") //RC 26255412 : Podací číslo
                                        .addField("gstringbox", {
                                            name: "PodaciCislo",
                                        });
                                }
                                doruceniForm
                                    .addRow("jres:26255411") //RC 26255411 : Datum odeslání
                                    .addField("gdatebox", {
                                        name: "DatOdeslDoruceni",
                                        valueType: "datetime",
                                        hideZeroTime: false,
                                        minValue: Gordic.Ssl.Utils.MinimalDate,
                                    })

                                    .addRow("jres:31937127") //RC 31937127 : PSČ, Stát
                                    .addField("gselectbox", "w-7", Gordic.Prefabs.Select.ginspsc(componentDto.DbCulture === 10 ? { props: { menuBar: { model: { stat: "235", aktivita: 100 } } } } : undefined), {
                                        name: "PscDoruceni",
                                        model: "model.StatDoruceni=value.stat;model.PscDoruceni=value.psc",
                                    })
                                    // .addRow("jres:26255611") //RC 26255611 : Stát
                                    .addField("gselectbox", "w-5", Gordic.Prefabs.Select.gincsta(), {
                                        name: "StatDoruceni",
                                        model: "model.StatDoruceni=value.stat",
                                    });
 
                                if(componentDto.gin_ssl_ddoruc === 1) {
                                    doruceniForm
                                        .addRow("jres:26257215") //RC 26257215 : Datum doručení
                                        .addField("gdatebox", {
                                            name: "DatDoruc",
                                            valueType: "datetime",
                                            minValue: Gordic.Ssl.Utils.MinimalDate,
                                            //disabled: true,
                                            //validators: componentDto.ssl_pod_zpdorp === 1 ? [new Gordic.Validators.Required()] : undefined, 
                                        });
                                }

                                doruceniForm
                                    .addSection("jres:31937128") //RC 31937128 : Identifikátory odesílatele

                                    .addRow("jres:26256223") //RC 26256223 : Identifikátor el. podání
                                    .addField("gstringbox", {
                                        name: "IdElPodani",
                                        disabled: true
                                    })
                                    .addRow("jres:26256580") //RC 26256580 : Identifikátor původního el. podání
                                    .addField("gstringbox", {
                                        name: "IdRozlElPodani",
                                        disabled: true
                                    })
                                    .addRow("jres:26255501") //RC 26255501 : Datum ze dne
                                    .addField("gdatebox", {
                                        name: "DatZeDneDoruceni",
                                        valueType: "datetime",
                                        minValue: Gordic.Ssl.Utils.MinimalDate
                                    })
                                   // .addSection()
                                    .addRow("jres:26255502") //RC 26255502 : Značka odesílatele
                                    .addField("gstringbox",{
                                        name: "ZnackaOdesilateleDoruceni",
                                    })
                                    .addRow("jres:26256228") //RC 26256228 : Sp.Zn. odesílatele
                                    .addField("gstringbox", {
                                        name: "SpZnOdes",
                                    })
                                    .addRow("jres:31937129") //RC 31937129 : Původní značka
                                    .addField("gstringbox", {
                                        name: "ZnackaNase",
                                        disabled: true
                                    })
                                    .addRow("jres:31937130") //RC 31937130 : Sp.Zn. Původní
                                    .addField("gstringbox", {
                                        name: "SpZnNase",
                                        disabled: true
                                    })
                                    ;

                                doruceniForm
                                    .addRow("jres:26255397") //RC 26255397 : Poznámka
                                    .addField("gstringbox", {
                                        name: "PoznamkaDoruceni",
                                    })
                                    ;
                      

                                if (componentDto.ZPORowDivVisible) {

                                    doruceniForm
                                        .addSection(" ") 
                                        .addRow("jres:26256257") //RC 26256257 : K rukám
                                        .addField("gstringbox", {
                                            name: "KRukam",
                                            disabled: true
                                        })
                                        ;
                                    //7
                                    doruceniForm
                                        .addRow("jres:26256258") //RC 26256258 : Zákon (rok/číslo)
                                        .addField("gnumberbox", "w-6", {
                                            name: "ZakonRok",
                                            disabled: true
                                        })
                                        .addField("gnumberbox", "w-6", {
                                            name: "ZakonCislo",
                                            disabled: true
                                        })
                                        .addRow("jres:26256260") //RC 26256260 : Paragraf
                                        .addField("gstringbox", {
                                            name: "Paragraf",
                                            disabled: true
                                        })
                                        .addRow("jres:26256259") //RC 26256259 : Odstavec, písmeno
                                        .addField("gstringbox", "w-6", {
                                            name: "Odstavec",
                                            disabled: true
                                        })
                                        .addField("gstringbox", "w-6", {
                                            name: "OdstavecPismeno ",
                                            disabled: true
                                        })
                                        .addRow("jres:31937589") //RC 31937589 : Útvar
                                        .addField("gstringbox", {
                                            name: "Utvar",
                                            disabled: true
                                        })
                                        .addSection() 
                                        ;
                                }
                               // doruceniForm.addSection();

                                $("<div>").appendTo(tab)
                                    .gform("createFrom", doruceniForm);
                                //#endregion
                            }
                        }
                    },

                };

                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\DetailBuilderComponents\GSslDetailEklepPredplneniComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslDetailEklepPredplneni: {

            create: function (componentDto) {
                var result = {
                    onMenuBuild: [
                        function (builder, menus) {
                            this.enableSslDetailEklepPredplneniActions();
                        }
                    ],
                    onBuild: [
                        function () {
                            this.enableSslDetailEklepPredplneni();
                            this.nasetujEklepPredplneni();

                        },
                    ],
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                        nasetujEklepPredplneni: function () {
                            var that = this;
                            var form = this.findForms("formSslEklepPredplneni");
                            //form.addHelpContext("DetailEklepPredplneni");

                            var fields = form.findFields();

                            fields.gfield("model", "apply", componentDto.DataPredplneni);
                            //fields.gfield("model", "validators", componentDto.Validators);
                            form.gform("waitForValues").done(function () {
                                if (Gordic.Utils.WidgetExists("gfield", fields)) {
                                    Utils.Form.markRequired(fields);
                                    fields.gfield("confirm");
                                }
                            });
                        },

                        saveSslDetailEklepPredplneni: function () {
                            
                            var EklepPredplneniForm = this.findForms("formSslEklepPredplneni");
                            EklepPredplneniForm.findFields().gfield("model", "collect", componentDto.DataPredplneni);

                            var EklepPredplneniModel = {
                                IsDetailEklepPredplneni: true,
                                DataPredplneniEklep: componentDto.DataPredplneni
                            };

                            //if (EklepPredplneniForm.gform("hasChanged")) {
                            //    EklepPredplneniModel.MetadataChanged = true;
                            //}
                            var grid = this.$GridPredplneniEklep;
                            if (Gordic.Utils.WidgetExists('ggrid', grid)) {
                                
                                // verze s getSelection
                                /*
                                var selectionGrid = grid.ggrid("getSelection");
                                if (selectionGrid != null && selectionGrid.length > 0) {
                                    EklepPredplneniModel.EklepPredplneniPrilohy = [];
                                    for (var i = 0; i < selectionGrid.length; i++) {
                                        EklepPredplneniModel.EklepPredplneniPrilohy.push({
                                            ixb: selectionGrid[i].ixb,
                                            ser_cislo: selectionGrid[i].PrilohaElektronicka.ElektronickySoubor.ser_cislo,
                                            file_name: selectionGrid[i].PrilohaElektronicka.ElektronickySoubor.soubor,
                                            typ_pril: selectionGrid[i].typ_pril,

                                        });
                                    }
                                }

                                */
                                
                                //verze se všemi co jsou vyplněné
                                var selectionGrid = grid.ggrid('getView').getDataRows(false);;
                                if (selectionGrid != null && selectionGrid.length > 0) {
                                    EklepPredplneniModel.EklepPredplneniPrilohy = [];
                                    for (var i = 0; i < selectionGrid.length; i++) {
                                        if (selectionGrid[i].typ_pril != null) { 
                                            EklepPredplneniModel.EklepPredplneniPrilohy.push({
                                                ixb: selectionGrid[i].ixb,
                                                ser_cislo: selectionGrid[i].PrilohaElektronicka.ElektronickySoubor.ser_cislo,
                                                file_name: selectionGrid[i].PrilohaElektronicka.ElektronickySoubor.soubor,
                                                typ_pril: selectionGrid[i].typ_pril,

                                            });
                                        }
                                    }
                                }

                                // grid.ggrid('getView').getDataRows(false);
                            }

                            return EklepPredplneniModel;
                        },

                        //#endregion
                        enableSslDetailEklepPredplneniActions: function () {
                            var l_bActionEnabled = true;
                            if (componentDto.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }
                            //this.actions.actTiskPruvodkyEklepPredplneni.update({ enabled: componentDto.TiskPruvodkyEnabled, visible: componentDto.TiskPruvodkyVisible });
                     

                        },
                        enableSslDetailEklepPredplneni: function () {

                            var l_bActionEnabled = true;

                            if (componentDto.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }

                            var fieldEnabled = componentDto.EditMode || this.RezimPodani != 0;
                            this.findForms("formSslEklepPredplneni").findFields().gfield("option", "disabled", !fieldEnabled);

                        },
                        
                    },

                    actions: { 

                        //actDetailDZEklepPredplneni: {
                        //    caption: "Původní zpráva",  //RC 31937540 : Původní zpráva
                        //    tittle: "Původní podoba zprávy elektronického podání", //RC 31937541 : Původní podoba zprávy elektronického podání
                            
                        //    run: function () {
                        //        $.content(this).detailDZClick(false);
                        //    }
                        //},
                    

                   
                    },

                    tabs: {
                        SslEklepPredplneni: {
                            tabParams: {
                                title: "jres:31937581" //RC 31937581 : Eklep odeslání
                                , opened: true,  //1. tab je pro agednovou hlavičku, ta je pro dokumenty, spisy, zakázky atp. vždy L2M2S1. BO detaily mimo wfl (tzn. dokumenty, spisy) jsou v L1M1S1 //RC 26255308 : Dokument
                                //menuBar: [
                                //    { action: "actTiskPruvodkyEklepPredplneni", favorite: true },
                                //],
                                group: Gordic.Prefabs.TabGroups.EklepPredplneni()
                            },
                            /*{
                    id: "tabAttachments",
                        tabParams: { title: "Přílohy" },
            contentParams: { className: componentDto.attachmentMainContent, serverParams: componentDto.attachmentMainContentDto || { Ixp: inputDto.ixp, NazevUDA: componentDto.NazevUDA, PopisUda: componentDto.PopisUda } }
        }*/
                            init: function (tab) {
                                //#region definice tab dokumentu
                                var that = $.content(tab);
                                var EklepPredplneniForm = new Gordic.Forms
                                    .Form({ 
                                            name: "formSslEklepPredplneni", 
                                              layoutDescriptor: "L1M1S1, L-3-9-0, M-3-9-0, S-12-12-0"
                                        });
                                if (componentDto.DataPredplneni && componentDto.DataPredplneni.documenttype == "request") {

                                    EklepPredplneniForm
                                        .addRow("jres:32170505") //RC 32170505 : Název materiálu
                                        .addField('gstringbox', {
                                            name: 'title',
                                            validators: [new Gordic.Validators.Required()],
                                        })
                                        .addRow("jres:32170506") //RC 32170506 : Popis materiálu
                                        .addField('gstringbox', {
                                            name: 'description',
                                            validators: [new Gordic.Validators.Required()],
                                        })
                                        .addRow("jres:32170507") //RC 32170507 : Důvod předložení materiálu
                                        .addField('gstringbox', {
                                            name: 'mandate',
                                            validators: [new Gordic.Validators.Required()],
                                        })

                                        .addRow("jres:32170508") //RC 32170508 : Číslo jednací předkladatele
                                        .addField('gstringbox', {
                                            name: 'idno_ext',
                                            disabled: true
                                        });

          

                                    EklepPredplneniForm
                                        .addRow({
                                            label: "jres:32170509" //RC 32170509 : Typ materiálu
                                        })
                                        .addField('gselectbox', Gordic.Prefabs.Select.sslcekm(), {
                                            name: 'typ_materialu',
                                            model: "model.typ_materialu=value.typ_materialu",
                                            //validators: [new Gordic.Validators.Required()],
                                        }
                                        );

                                    EklepPredplneniForm
                                        .addRow("jres:32170510") //RC 32170510 : Začátek připomínkového řízení
                                        .addField("gdatebox", {
                                            name: "dat_rev_proc_start",
                                            valueType: "datetime",

                                        })
                                        .addRow("jres:32170511") //RC 32170511 : Konec připomínkového řízení
                                        .addField("gdatebox", {
                                            name: "dat_rev_proc_finis",
                                            valueType: "datetime",
                                            //validators: [new Gordic.Validators.Required()],
                                        })
                                    
                                        .addRow("jres:32170512") //RC 32170512 : Klíčové slova
                                        .addField("gselectbox", {
                                            name: "keywords",
                                            itemTemplate: "{Code}",
                                            helperColumns: ["Code"],
                                            data: function () {
                                                return Gordic.Isl.Eklep.getSubjectEntries({ SubjectType: "keywordList" }).get().then(function (retVal) {
                                                    return retVal.result.data.Data;
                                                });
                                            },
                                            multi: true,
                                            //validators: [new Gordic.Validators.Required({ message: "Je nutné vyplnit typ připomínky" })],
                                            model: "model.KeyWords[kl_slovo_eklep]=value.Code",
                                            modelOptions: {
                                                verificationNeeded: false
                                            },
                                            change: function (ev, ChObj) {

                                            }
                                        })
                                        .addRow("jres:32170513") //RC 32170513 : Oblasti práva
                                        .addField("gselectbox", {
                                            name: "law_areas",
                                            itemTemplate: "{Code}",
                                            data: function () {
                                                return Gordic.Isl.Eklep.getSubjectEntries({ SubjectType: "lawAreaList" }).get().then(function (retVal) {
                                                    return retVal.result.data.Data;
                                                });
                                            },
                                            helperColumns: ["Code"],
                                            multi: true,
                                            //validators: [new Gordic.Validators.Required({ message: "Je nutné vyplnit typ připomínky" })],
                                            model: "model.LawAreas[law_area_eklep]=value.Code",
                                            modelOptions: {
                                                verificationNeeded: false
                                            },
                                            change: function (ev, ChObj) {

                                            }

                                        })
                                        

                                        .addRow("jres:32170514") //RC 32170514 : Povinné připomínkové místa
                                        .addField("gselectbox", {
                                            name: "mandatory_reviewers",
                                            itemTemplate: "{Value}",
                                            data: function () { //mandatoryReviewers   mandatoryReviewList mandatoryReviewerList
                                                return Gordic.Isl.Eklep.getSubjectEntries({ SubjectType: "mandatoryReviewerList" }).get().then(function (retVal) {
                                                    return retVal.result.data.Data;
                                                });
                                            },
                                            helperColumns: ["Value"],
                                            multi: true,
                                            //validators: [new Gordic.Validators.Required()],
                                            model: "model.MandatoryReviewers[reviewers]=value.Code;model.MandatoryReviewers[reviewers_txt]=value.Value",
                                            modelOptions: {
                                                verificationNeeded: false
                                            },
                                            change: function (ev, ChObj) {

                                            }

                                        })

                                        .addRow("jres:32170515") //RC 32170515 : Nepovinné připomínkové místa
                                        .addField("gselectbox", {
                                            name: "other_reviewers",
                                            itemTemplate: "{Value}",
                                            data: function () { //otherReviewers otherTypeList otherReviewerList
                                                return Gordic.Isl.Eklep.getSubjectEntries({ SubjectType: "otherReviewerList" }).get().then(function (retVal) {
                                                    return retVal.result.data.Data;
                                                });
                                            },
                                            helperColumns: ["Value"],
                                            multi: true,
                                            //validators: [new Gordic.Validators.Required({ message: "Je nutné vyplnit typ připomínky" })],
                                            model: "model.OtherReviewers[reviewers]=value.Code;model.OtherReviewers[reviewers_txt]=value.Value",
                                            modelOptions: {
                                                verificationNeeded: false
                                            },
                                            change: function (ev, ChObj) {

                                            }

                                        })
                                         
                                        ;

                                } else if (componentDto.DataPredplneni && componentDto.DataPredplneni.documenttype == "review") {
                                    var data = [
                                        { label: "jres:32170516", key: "D" }, //RC 32170516 : Doporučující připomínka
                                        { label: "jres:32170517", key: "Z" }, //RC 32170517 : Zásadní připomínka
                                        { label: "jres:32170518", key: "BP" }, //RC 32170518 : Bez připomínek
                                    ];
                                    EklepPredplneniForm
                                        .addRow("jres:32170519") //RC 32170519 : Typ připomínky
                                        .addField("gselectbox", {
                                            name: "typ_pripominky",
                                            itemTemplate: "{label}",
                                            data: new Gordic.Data.View(data, { key: "key" }),
                                            list: true,
                                            //validators: [new Gordic.Validators.Required({ message: "Je nutné vyplnit typ připomínky" })],
                                            model: "model.typ_pripominky=value.key",
                                            change: function (ev, ChObj) {
                                            }

                                        });
                                }
                               // EklepPredplneniForm.addSection();

                                $.newDiv()
                                    .appendTo(tab)
                                    .gform("createFrom", EklepPredplneniForm)
                                    ;
                                //#endregion
                            }
                        },

                        SslEklepPredplneniPrilohy: {
                            tabParams: {
                                title: "jres:32170482", //RC 32170482 : Přílohy
                                group: Gordic.Prefabs.TabGroups.EklepPredplneni(),
                                opened: true
                            },
                            init: function (tab) {
                                var content = $.content(tab);
                                /*
                                var columns = new Gordic.Data.GridFormat()
                                    .addTextColumn({
                                        //width: 125,
                                        name: "typ_pril",
                                        caption: "jres:32170483", //RC 32170483 : Typ přílohy eKLEP
                                        field: "TypPrilohy.typ_pril_txt",
                                        editor: {
                                            widget: "gselectbox",
                                            options: [
                                                {
                                                    model: "model.typ_pril=value.typ_pril;model.TypPrilohy.typ_pril_txt<=value.typ_pril_txt",
                                                    change: (event, value) => {

                                                    }
                                                },
                                                Gordic.Prefabs.Select.sslcekp()
                                            ]
                                        }
                                    })
                                    .addTextColumn({
                                        //width: 125,
                                        name: "popis",
                                        caption: "jres:32170484", //RC 32170484 : Popis
                                        field: "PrilohaElektronicka.popis"
                                    })
                                    .addTextColumn({
                                        //width: 125,
                                        name: "soubor",
                                        caption: "jres:32170485", //RC 32170485 : Soubor
                                        field: "PrilohaElektronicka.ElektronickySoubor.soubor"
                                    })
                                    ;
                                var grid = $.newDiv()
                                    .appendTo(tab)
                                    .height(600)
                                    .ggrid({
                                        renderMode: "auto",
                                        data: new Gordic.Isl.View(
                                            content.isl.Sslspep.listPrilohy({
                                                filters: {
                                                    ixs_ekp: componentDto.DataPredplneni.ixs_ekp
                                                },
                                                fragments: [
                                                    "*",
                                                    "PERMISSIONS"
                                                ]
                                            }),
                                            {
                                                key: [
                                                    'ixs_ekp',
                                                    'ixb',
                                                    'ser_cislo'
                                                ],
                                                startEmpty: false
                                            }
                                        ),
                                        columns: columns
                                    })
                                    .gautofit()
                                    ;
                                    */
                                
                                var islAttachment = content.isl.Attachment;
                                islAttachment
                                    .getAttachementDialogParameters({
                                        data: {}
                                    })
                                    .getData()
                                    .then(
                                        (dialogParameters) => {

                                            content.dialogDbParameters = dialogParameters;


                                            var columns = Gordic.Wfl.WebClient.GAttachmentsDlg.CreateGridColumns({
                                                gin_pdf_pictpos: dialogParameters?.gin_pdf_pictpos,
                                                epk_povumipod: dialogParameters?.epk_povumipod,
                                                gin_ele_prifc: dialogParameters?.gin_ele_prifc,
                                                gin_ele_prifp: dialogParameters?.gin_ele_prifp,
                                                gin_ele_okprepk: dialogParameters?.gin_ele_okprepk
                                            })
                                            columns.addTextColumn({
                                                //width: 125,
                                                name: "typ_pril",
                                                caption: "Typ přílohy eKLEP",
                                                field: "typ_pril_txt",
                                                editor: {
                                                    widget: "gselectbox",
                                                    options: [
                                                        {
                                                            model: "model.typ_pril=value.typ_pril;model.typ_pril_txt<=value.typ_pril_txt",
                                                            change: (event, value) => {

                                                            },
                                                        },
                                                        Gordic.Prefabs.Select.sslcekp()
                                                    ]
                                                }
                                            });
                                            var columnList = Gordic.Wfl.WebClient.GAttachmentsDlg.CreateGridColumnListDefault({
                                                gin_ele_priktza: dialogParameters?.gin_ele_priktza,
                                                gin_ele_infkofo: dialogParameters?.gin_ele_infkofo,
                                                gin_ele_okprepk: dialogParameters?.gin_ele_okprepk
                                            });

                                            columnList = "typ_pril," + columnList

                                            //let tab = $("<div>").appendTo(this.element).gtab({
                                            //    title: "jres:31937505", //RC 31937505 : Přílohy
                                            //    opened: true,
                                            //    //menuBar: that.actions.createBar(["actOtevrit*"])
                                            //});
                                            content.$GridPredplneniEklep = $.newDiv()
                                                .appendTo(tab).height(600) /* this.element */
                                                //.gautofit({ resizersOnTab: false })
                                                .ggrid({
                                                    renderMode: "auto",
                                                    columnMode: "full",  // fit (defaultne by melo byt toto), full
                                                    rowsChecked: "IsChecked",
                                                    data: new Gordic.Isl.View(
                                                        islAttachment.list({ filters: { ixp: componentDto.ixp }, fragments: ["PERMISSIONS"] }),
                                                        {
                                                            // filterPanel: $filterpanel,
                                                            key: [
                                                                "ixp",//Gordic.Ssl.Interface.GAttachment2EklepDtoNames.ixp,
                                                                "por_cislo" //Gordic.Ssl.Interface.GAttachment2EklepDtoNames.por_cislo
                                                            ],
                                                            startEmpty: false,
                                                            onResponse: (data) => {
                                                                if (data != null && data.data != null && componentDto.EklepPredplneniPrilohy != null) {
                                                                    for (var i = 0; i < data.data.length; i++) {
                                                                        var arrPredplneni = componentDto.EklepPredplneniPrilohy.filter((y) => y.ixb == data.data[i].ixb);
                                                                        if (arrPredplneni.length > 0) {
                                                                            data.data[i].typ_pril = arrPredplneni[0].TypPrilohy.typ_pril;
                                                                            data.data[i].typ_pril_txt = arrPredplneni[0].TypPrilohy.typ_pril_txt;
                                                                            data.data[i].IsChecked = true;
                                                                        }
                                                                    }
                                                                }
                                                                return data
                                                            }
                                                        }
                                                    ),
                                                    columns: columns,
                                                    defaultProfile: {
                                                        columnList: columnList,
                                                    },
                                                    //defaultAction: new GAction({
                                                    //    name: "openFileAttachmentAct",
                                                    //    run: function (ev, ctx) {
                                                    //        that.actions.actOtevrit?.run();
                                                    //    }
                                                    //}),
                                                    //selection: function (ev, selectionInfo) {
                                                    //    if (selectionInfo.count === 1) { // u single modu vzdy 1 ale pro jistotu testuji
                                                    //        var rowData = that.$Grid?.ggrid("getSelection");

                                                    //        if (rowData && rowData.length > 0) {
                                                    //            var row = rowData[0];

                                                    //            that.nastavOpravneniAkce(row);

                                                    //            // zobrazeni nahledu
                                                    //            that.enablePreview(true);
                                                    //            that.loadPreview(row);
                                                    //        }
                                                    //    }
                                                    //},
                                                    multi: true,

                                                })
                                                    .ggridcelleditor({
                                                        beforeStart: () => {
                                                            return (componentDto.EditMode || content.RezimPodani != 0);
                                                        },
                                                        stop: function (ev, ci) {
                                                            /** refresh zaokrouhlení a částky celkem */

                                                        },
                                                    })
                                                    .gautofit()
                                                ;

                                            //if (componentDto.EditMode || content.RezimPodani != 0) {
                                            //    grid.ggridcelleditor({});
                                            //}

                                            //that.createSideBar();

                                            content.endOperation();
                                        },
                                        () => {
                                            content.endOperation();
                                        }
                                    );







































                                
                            }
                        }
                    },

                };

                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\DetailBuilderComponents\GSslDetailEklepMaterialComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslDetailEklepMaterialComponent: {

            create: function (componentDto) {
                var result = {
                    onMenuBuild: [
                        function (builder, menus) {
                            this.enableSslDetailEklepMaterialActions();
                            this.nasetujEklepVyberMaterial();
                        }
                    ],
                    onBuild: [
                        function () {
                            this.enableSslDetailEklepMaterial();
                            

                        },
                    ],
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady
                        nasetujEklepVyberMaterial: function () {
                            var that = this;
                            //form.addHelpContext("DetailEklepMaterial");
                            if (componentDto.DataMaterialy != null && componentDto.DataMaterialy.length > 0) {
                                var fields = this.findFields("vyber_materialu");
                                fields.gfield("model", "apply", componentDto.DataMaterialy[0]);
                            }
                       
                        },

                        nasetujEklepMaterial: function (data) {
                            var that = this;
                            var form = this.findForms("formSslEklepMaterial");
                            //form.addHelpContext("DetailEklepMaterial");

                            var fields = form.findFields();
                            fields.gfield("clear")
                            if (data != null) { 
                                fields.gfield("model", "apply", data);
                                //fields.gfield("model", "validators", componentDto.Validators);
                                form.gform("waitForValues").done(function () {
                                    if (Gordic.Utils.WidgetExists("gfield", fields)) {
                                        Utils.Form.markRequired(fields);
                                        fields.gfield("confirm");
                                    }
                                });
                                
                            }

                        },

                        nasetujGrid: function (data) {
                            var that = this;
                            if (data != null) {
                                var datViw = new Gordic.Isl.View(
                                    that.isl.Sslspem.listPrilohy({
                                        data: {
                                            Ixp: componentDto.ixp,
                                            PidEklep: data.pid_eklep
                                        },
                                        fragments: [
                                            "*",
                                            "PERMISSIONS"
                                        ]
                                    }),
                                    {
                                        key: [
                                            'ixs_ekp',
                                            'ixb',
                                            'ser_cislo'
                                        ],
                                        startEmpty: false
                                    }
                                );
                                this.gridEklepMaterialComp.ggrid("setData", datViw, true);

                            } else {
                                this.gridEklepMaterialComp.ggrid("setData", null, true);
                            }
                            

                        }, 

                        saveSslDetailEklepMaterial: function () {

                            var fieldVyberMaterialu = form.findFields("vyber_materialu");
                            var vyberMaterialuValue = fieldVyberMaterialu.gfield("getValue");

                            if (vyberMaterialuValue == null) {
                                vyberMaterialuValue = {};
                            }

                            var eklepMaterialForm = this.findForms("formSslEklepMaterial");
                            eklepMaterialForm.findFields().gfield("model", "collect", vyberMaterialuValue);

                            var EklepMaterialModel = {
                                IsDetailEklepMaterial: true,
                                DataMaterialEklep: vyberMaterialuValue
                            };

                            //if (eklepMaterialForm.gform("hasChanged")) {
                            //    EklepMaterialModel.MetadataChanged = true;
                            //}

                            var grid = this.gridEklepMaterialComp;
                            if (Gordic.Utils.WidgetExists('ggrid', grid)) {
                                EklepMaterialModel.EklepMaterialPrilohy = grid.ggrid('getView').getDataRows(false);
                            }

                            return EklepMaterialModel;
                        },

                        enableSslDetailEklepMaterialActions: function () {
                            //var l_bActionEnabled = true;
                            //if (componentDto.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                            //    l_bActionEnabled = false;
                            //}
                            //this.actions.actTiskPruvodkyEklepMaterial.update({ enabled: componentDto.TiskPruvodkyEnabled, visible: componentDto.TiskPruvodkyVisible });


                        },
                        enableSslDetailEklepMaterial: function () {
                            //var fieldEnabled = componentDto.EditMode || this.RezimPodani != 0;
                            var fieldEnabled = false;
                            this.findForms("formSslEklepMaterial").findFields().gfield("option", "disabled", !fieldEnabled);
                            this.findFields("vyber_materialu").gfield("option", "disabled", false);
                        },
                    },

                    actions: {
                        //actDetailDZEklepMaterial: {
                        //    caption: "Původní zpráva",  //RC 31937540 : Původní zpráva
                        //    tittle: "Původní podoba zprávy elektronického podání", //RC 31937541 : Původní podoba zprávy elektronického podání

                        //    run: function () {
                        //        $.content(this).detailDZClick(false);
                        //    }
                        //},
                    },

                    tabs: {

                        SslEklepVyberMaterialu: {
                            tabParams: {
                                title: "Výběr z materiálů", //RC 31937581 : Eklep odeslání
                                opened: true,
                                group: Gordic.Prefabs.TabGroups.EklepMaterial()
                            },
                            init: function (tab) {
                                var that = $.content(tab);

                                var eklepVyberForm = new Gordic.Forms.Form({
                                    name: "formSslEklepVyber",
                                    layoutDescriptor: "L1M1S1, L-3-9-0, M-3-9-0, S-12-12-0"
                                });

                                eklepVyberForm
                                    .addRow("Materialy") //RC 32170500 : Typ připomínky
                                    .addField("gselectbox", {
                                        name: "vyber_materialu",
                                        itemTemplate: "{title} - {TypMaterialu.typ_materialu_txt}",
                                        dropdown: true,
                                        data: new Gordic.Data.View(componentDto.DataMaterialy, { key: "pid_eklep" }),
                                        //validators: [new Gordic.Validators.Required({ message: "Je nutné vyplnit typ připomínky" })],
                                        model: "model.pid_eklep=value.pid_eklep",
                                        change: function (ev, ChObj) {
                                            that.nasetujEklepMaterial(ChObj.value);
                                            that.nasetujGrid(ChObj.value);
                                        }
                                    });
                                //}

                                $.newDiv()
                                    .appendTo(tab)
                                    .gform("createFrom", eklepVyberForm)
                                    ;
                            }
                        },


                        SslEklepMaterial: {
                            tabParams: {
                                title: "Eklep materiál", //RC 31937581 : Eklep odeslání
                                opened: true,
                                group: Gordic.Prefabs.TabGroups.EklepMaterial()
                            },
                            init: function (tab) {
                                //#region definice tab dokumentu
                                var that = $.content(tab);


                                var eklepMaterialForm = new Gordic.Forms.Form({
                                    name: "formSslEklepMaterial",
                                    layoutDescriptor: "L1M1S1, L-3-9-0, M-3-9-0, S-12-12-0"
                                });

                                //if (componentDto.DataMaterial && componentDto.DataMaterial.documenttype == "request") {
                                    eklepMaterialForm
                                        .addRow("jres:32170486") //RC 32170486 : Název materiálu
                                        .addField('gstringbox', {
                                            name: 'title',
                                            validators: [new Gordic.Validators.Required()],
                                        })
                                        .addRow("jres:32170487") //RC 32170487 : Popis materiálu
                                        .addField('gstringbox', {
                                            name: 'description',
                                            validators: [new Gordic.Validators.Required()],
                                        })
                                        .addRow("jres:32170488") //RC 32170488 : Důvod předložení materiálu
                                        .addField('gstringbox', {
                                            name: 'mandate',
                                            validators: [new Gordic.Validators.Required()],
                                        })
                                        .addRow("jres:32170489") //RC 32170489 : Číslo jednací předkladatele
                                        .addField('gstringbox', {
                                            name: 'idno_ext',
                                            disabled: true
                                        })
                                        .addRow({
                                            label: "jres:32170490" //RC 32170490 : Typ materiálu
                                        })
                                        .addField('gselectbox', Gordic.Prefabs.Select.sslcekm(), {
                                            name: 'typ_materialu',
                                            model: "model.typ_materialu=value.typ_materialu",
                                            //validators: [new Gordic.Validators.Required()],
                                        })
                                        .addRow("jres:32170491") //RC 32170491 : Začátek připomínkového řízení
                                        .addField("gdatebox", {
                                            name: "dat_rev_proc_start",
                                            valueType: "datetime",

                                        })
                                        .addRow("jres:32170492") //RC 32170492 : Konec připomínkového řízení
                                        .addField("gdatebox", {
                                            name: "dat_rev_proc_finis",
                                            valueType: "datetime",
                                            //validators: [new Gordic.Validators.Required()],
                                        })
                                        .addRow("jres:32170493") //RC 32170493 : Klíčové slova
                                        .addField("gselectbox", {
                                            name: "keywords",
                                            itemTemplate: "{Code}",
                                            helperColumns: ["Code"],
                                            data: function () {
                                                return Gordic.Isl.Eklep.getSubjectEntries({ SubjectType: "keywordList" }).get().then(function (retVal) {
                                                    return retVal.result.data.Data;
                                                });
                                            },
                                            multi: true,
                                            //validators: [new Gordic.Validators.Required({ message: "Je nutné vyplnit typ připomínky" })],
                                            model: "model.KeyWords[kl_slovo_eklep]=value.Code",
                                            modelOptions: {
                                                verificationNeeded: false
                                            },
                                            change: function (ev, ChObj) {

                                            }
                                        })
                                        .addRow("jres:32170494") //RC 32170494 : Oblasti práva
                                        .addField("gselectbox", {
                                            name: "law_areas",
                                            itemTemplate: "{Code}",
                                            data: function () {
                                                return Gordic.Isl.Eklep.getSubjectEntries({ SubjectType: "lawAreaList" }).get().then(function (retVal) {
                                                    return retVal.result.data.Data;
                                                });
                                            },
                                            helperColumns: ["Code"],
                                            multi: true,
                                            //validators: [new Gordic.Validators.Required({ message: "Je nutné vyplnit typ připomínky" })],
                                            model: "model.LawAreas[law_area_eklep]=value.Code",
                                            modelOptions: {
                                                verificationNeeded: false
                                            },
                                            change: function (ev, ChObj) {

                                            }

                                        })
                                        .addRow("jres:32170495") //RC 32170495 : Povinné připomínkové místa
                                        .addField("gselectbox", {
                                            name: "mandatory_reviewers",
                                            itemTemplate: "{Value}",
                                            data: function () { //mandatoryReviewers   mandatoryReviewList mandatoryReviewerList
                                                return Gordic.Isl.Eklep.getSubjectEntries({ SubjectType: "mandatoryReviewerList" }).get().then(function (retVal) {
                                                    return retVal.result.data.Data;
                                                });
                                            },
                                            helperColumns: ["Value"],
                                            multi: true,
                                            //validators: [new Gordic.Validators.Required()],
                                            model: "model.MandatoryReviewers[reviewers]=value.Code;model.MandatoryReviewers[reviewers_txt]=value.Value",
                                            modelOptions: {
                                                verificationNeeded: false
                                            },
                                            change: function (ev, ChObj) {

                                            }

                                        })
                                        .addRow("jres:32170496") //RC 32170496 : Nepovinné připomínkové místa
                                        .addField("gselectbox", {
                                            name: "other_reviewers",
                                            itemTemplate: "{Value}",
                                            data: function () { //otherReviewers otherTypeList otherReviewerList
                                                return Gordic.Isl.Eklep.getSubjectEntries({ SubjectType: "otherReviewerList" }).get().then(function (retVal) {
                                                    return retVal.result.data.Data;
                                                });
                                            },
                                            helperColumns: ["Value"],
                                            multi: true,
                                            //validators: [new Gordic.Validators.Required({ message: "Je nutné vyplnit typ připomínky" })],
                                            model: "model.OtherReviewers[reviewers]=value.Code;model.OtherReviewers[reviewers_txt]=value.Value",
                                            modelOptions: {
                                                verificationNeeded: false
                                            },
                                            change: function (ev, ChObj) {

                                            }

                                        })
                                        ;
                                //} else if (componentDto.DataMaterial && componentDto.DataMaterial.documenttype == "review") {
                                    /*
                                    var data = [
                                        { label: "jres:32170497", key: "D" }, //RC 32170497 : Doporučující připomínka
                                        { label: "jres:32170498", key: "Z" }, //RC 32170498 : Zásadní připomínka
                                        { label: "jres:32170499", key: "BP" }, //RC 32170499 : Bez připomínek
                                    ];

                                    eklepMaterialForm
                                        .addRow("jres:32170500") //RC 32170500 : Typ připomínky
                                        .addField("gselectbox", {
                                            name: "typ_pripominky",
                                            itemTemplate: "{label}",
                                            data: new Gordic.Data.View(data, { key: "key" }),
                                            list: true,
                                            //validators: [new Gordic.Validators.Required({ message: "Je nutné vyplnit typ připomínky" })],
                                            model: "model.typ_pripominky=value.key",
                                            change: function (ev, ChObj) {
                                            }
                                        });
                                        */
                                //}

                                $.newDiv()
                                    .appendTo(tab)
                                    .gform("createFrom", eklepMaterialForm)
                                    ;

                                //#endregion
                            }
                        },

                        SslEklepMaterialPrilohy: {
                            tabParams: {
                                title: "jres:32170501", //RC 32170501 : Přílohy
                                group: Gordic.Prefabs.TabGroups.EklepMaterial(),
                                opened: true
                            },
                            init: function (tab) {
                                var content = $.content(tab);

                                var columns = new Gordic.Data.GridFormat()
                                    .addTextColumn({
                                        //width: 125,
                                        name: "typ_pril",
                                        caption: "jres:32170502", //RC 32170502 : Typ přílohy eKLEP
                                        field: "TypPrilohy.typ_pril_txt",
                                        editor: {
                                            widget: "gselectbox",
                                            options: [
                                                {
                                                    model: "model.typ_pril=value.typ_pril;model.TypPrilohy.typ_pril_txt<=value.typ_pril_txt",
                                                    change: (event, value) => {

                                                    }
                                                },
                                                Gordic.Prefabs.Select.sslcekp()
                                            ]
                                        }
                                    })
                                    .addTextColumn({
                                        //width: 125,
                                        name: "popis",
                                        caption: "jres:32170503", //RC 32170503 : Popis
                                        field: "PrilohaElektronicka.popis"
                                    })
                                    .addTextColumn({
                                        //width: 125,
                                        name: "soubor",
                                        caption: "jres:32170504", //RC 32170504 : Soubor
                                        field: "PrilohaElektronicka.ElektronickySoubor.soubor"
                                    })
                                    ;
                                content.gridEklepMaterialComp = $.newDiv()
                                    .appendTo(tab)
                                    .height(600)
                                    .ggrid({
                                        renderMode: "auto",
                                        //columnMode: "full",  // fit (defaultne by melo byt toto), full
                                        
                                        data: undefined,
                                        
                                        columns: columns
                                    })
                                    .gautofit()
                                    ;

                                //if (componentDto.EditMode || content.RezimPodani != 0) {
                                //    grid.ggridcelleditor({});
                                //}
                            }
                        }
                    },

                };

                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\DetailBuilderComponents\GSslDetailEklepPripominkaComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslDetailEklepPripominkaComponent: {

            create: function (componentDto) {
                var result = {
                    onMenuBuild: [
                        function (builder, menus) {
                            this.enableSslDetailEklepPripominkaActions();
                            this.nasetujEklepVyberPripominka();
                        }
                    ],
                    onBuild: [
                        function () {
                            this.enableSslDetailEklepPripominka();
                            

                        },
                    ],
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady
                        nasetujEklepVyberPripominka: function () {
                            var that = this;
                            if (componentDto.DataPripominky != null && componentDto.DataPripominky.length > 0) {
                                var fields = this.findFields("vyber_pripominky");
                                fields.gfield("model", "apply", componentDto.DataPripominky[0]);
                            }
                       
                        },

                        nasetujEklepPripominka: function (data) {
                            var that = this;
                            var form = this.findForms("formSslEklepPripominka");

                            var fields = form.findFields();
                            fields.gfield("clear")
                            if (data != null) { 
                                fields.gfield("model", "apply", data);
                                //fields.gfield("model", "validators", componentDto.Validators);
                                form.gform("waitForValues").done(function () {
                                    if (Gordic.Utils.WidgetExists("gfield", fields)) {
                                        Utils.Form.markRequired(fields);
                                        fields.gfield("confirm");
                                    }
                                });
                                
                            }

                        },

                        nasetujGrid: function (data) {
                            var that = this;
                            if (data != null) {
                                var datViw = new Gordic.Isl.View(
                                    that.isl.Sslspek.list({
                                        filters: {
                                            pid_eklep_pripomin: data.pid_eklep_pripomin
                                        },
                                        //data: {
                                        //    Ixp: componentDto.ixp,
                                        //    PidEklep: data.pid_eklep_pripomin
                                        //},
                                        fragments: [
                                            "*",
                                            "PERMISSIONS"
                                        ]
                                    }),
                                    {
                                        key: [
                                            'pid_eklep_pripomin',
                                            'ixb',
                                            'ser_cislo'
                                        ],
                                        startEmpty: false
                                    }
                                );
                                this.gridEklepPripominkaComp.ggrid("setData", datViw, true);

                            } else {
                                this.gridEklepPripominkaComp.ggrid("setData", null, true);
                            }
                            

                        }, 

                        enableSslDetailEklepPripominkaActions: function () {
                            //var l_bActionEnabled = true;
                            //if (componentDto.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                            //    l_bActionEnabled = false;
                            //}
                            //this.actions.actTiskPruvodkyEklepPripominka.update({ enabled: componentDto.TiskPruvodkyEnabled, visible: componentDto.TiskPruvodkyVisible });


                        },
                        enableSslDetailEklepPripominka: function () {
                            //var fieldEnabled = componentDto.EditMode || this.RezimPodani != 0;
                            var fieldEnabled = false;
                            this.findForms("formSslEklepPripominka").findFields().gfield("option", "disabled", !fieldEnabled);
                            this.findFields("vyber_pripominky").gfield("option", "disabled", false);
                        },
                    },

                    actions: {
                        //actDetailDZEklepPripominka: {
                        //    caption: "Původní zpráva",  //RC 31937540 : Původní zpráva
                        //    tittle: "Původní podoba zprávy elektronického podání", //RC 31937541 : Původní podoba zprávy elektronického podání

                        //    run: function () {
                        //        $.content(this).detailDZClick(false);
                        //    }
                        //},
                    },

                    tabs: {

                        SslEklepVyberPripominkyu: {
                            tabParams: {
                                title: "Výběr z připomínek", //RC 31937581 : Eklep odeslání
                                opened: true,
                                group: Gordic.Prefabs.TabGroups.EklepPripominka()
                            },
                            init: function (tab) {
                                var that = $.content(tab);

                                var eklepVyberForm = new Gordic.Forms.Form({
                                    name: "formSslEklepVyber",
                                    layoutDescriptor: "L1M1S1, L-3-9-0, M-3-9-0, S-12-12-0"
                                });

                                eklepVyberForm
                                    .addRow("Připomínky") //RC 32170500 : Typ připomínky
                                    .addField("gselectbox", {
                                        name: "vyber_pripominky",
                                        //itemTemplate: "{akt_znacka} - {dat_vytvoreni}", 
                                        itemTemplate: function (data) {
                                            var txt = data.akt_znacka + " - " + new Date(data.dat_vytvoreni).toLocaleString();
                                            return txt;
                                        },
                                        dropdown: true,
                                        data: new Gordic.Data.View(componentDto.DataPripominky, { key: "pid_eklep_pripomin" }),
                                        //validators: [new Gordic.Validators.Required({ message: "Je nutné vyplnit typ připomínky" })],
                                        model: "model.pid_eklep_pripomin=value.pid_eklep_pripomin",
                                        change: function (ev, ChObj) {
                                            that.nasetujEklepPripominka(ChObj.value);
                                            that.nasetujGrid(ChObj.value);
                                        }
                                    });
                                //}

                                $.newDiv()
                                    .appendTo(tab)
                                    .gform("createFrom", eklepVyberForm)
                                    ;
                            }
                        },


                        SslEklepPripominka: {
                            tabParams: {
                                title: "Eklep připomínka", //RC 31937581 : Eklep odeslání
                                opened: true,
                                group: Gordic.Prefabs.TabGroups.EklepPripominka()
                            },
                            init: function (tab) {
                                //#region definice tab dokumentu
                                var that = $.content(tab);


                                var eklepPripominkyForm = new Gordic.Forms.Form({
                                    name: "formSslEklepPripominka",
                                    layoutDescriptor: "L1M1S1, L-3-9-0, M-3-9-0, S-12-12-0"
                                });

                                eklepPripominkyForm

                                    .addRow("jres:32170489") //RC 32170489 : Číslo jednací předkladatele
                                    .addField('gstringbox', {
                                        name: 'akt_znacka',
                                        disabled: true
                                    });
                                        
                                    var data = [
                                        { label: "jres:32170497", key: "D" }, //RC 32170497 : Doporučující připomínka
                                        { label: "jres:32170498", key: "Z" }, //RC 32170498 : Zásadní připomínka
                                        { label: "jres:32170499", key: "BP" }, //RC 32170499 : Bez připomínek
                                    ];

                                eklepPripominkyForm
                                    .addRow("jres:32170500") //RC 32170500 : Typ připomínky
                                    .addField("gselectbox", {
                                        name: "typ_pripominky",
                                        itemTemplate: "{label}",
                                        data: new Gordic.Data.View(data, { key: "key" }),
                                        list: true,
                                        //validators: [new Gordic.Validators.Required({ message: "Je nutné vyplnit typ připomínky" })],
                                        model: "model.typ_pripominky=value.key",
                                        change: function (ev, ChObj) {
                                        }
                                    });

                                eklepPripominkyForm
                                    .addRow("jres:31937587") //RC 31937587 : Datum vytvoření
                                    .addField("gdatebox", {
                                        name: "dat_vytvoreni",
                                        valueType: "datetime"
                                    });
                                       
                                //}

                                $.newDiv()
                                    .appendTo(tab)
                                    .gform("createFrom", eklepPripominkyForm)
                                    ;

                                //#endregion
                            }
                        },

                        SslEklepPripominkaPrilohy: {
                            tabParams: {
                                title: "jres:32170501", //RC 32170501 : Přílohy
                                group: Gordic.Prefabs.TabGroups.EklepPripominka(),
                                opened: true
                            },
                            init: function (tab) {
                                var content = $.content(tab);

                                var columns = new Gordic.Data.GridFormat()
                                    .addTextColumn({
                                        //width: 125,
                                        name: "typ_pril",
                                        caption: "jres:32170502", //RC 32170502 : Typ přílohy eKLEP
                                        field: "TypPrilohy.typ_pril_txt",
                                        editor: {
                                            widget: "gselectbox",
                                            options: [
                                                {
                                                    model: "model.typ_pril=value.typ_pril;model.TypPrilohy.typ_pril_txt<=value.typ_pril_txt",
                                                    change: (event, value) => {

                                                    }
                                                },
                                                Gordic.Prefabs.Select.sslcekp()
                                            ]
                                        }
                                    })
                                    .addTextColumn({
                                        //width: 125,
                                        name: "file_name",
                                        caption: "Soubor", //RC 32170503 : Popis
                                        field: "file_name"
                                    })
                                    /*
                                    .addTextColumn({
                                        //width: 125,
                                        name: "popis",
                                        caption: "jres:32170503", //RC 32170503 : Popis
                                        field: "PrilohaElektronicka.popis"
                                    })
                                    .addTextColumn({
                                        //width: 125,
                                        name: "soubor",
                                        caption: "jres:32170504", //RC 32170504 : Soubor
                                        field: "PrilohaElektronicka.ElektronickySoubor.soubor"
                                    })
                                    */
                                    ;
                                content.gridEklepPripominkaComp = $.newDiv()
                                    .appendTo(tab)
                                    .height(600)
                                    .ggrid({
                                        renderMode: "auto",
                                        //columnMode: "full",  // fit (defaultne by melo byt toto), full
                                        
                                        data: undefined,
                                        
                                        columns: columns
                                    })
                                    .gautofit()
                                    ;

                                //if (componentDto.EditMode || content.RezimPodani != 0) {
                                //    grid.ggridcelleditor({});
                                //}
                            }
                        }
                    },

                };
              
                if (componentDto.BudeSeVykreslovatZalozkaEklep == false) {
                    return null;
                }

                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\DetailBuilderComponents\GSslPrilohyComponent.js 

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

        SslPrilohy: {
          
            create: function (inputDto,componentDto) {
                return Gordic.Wfl.DetailBuilderComponents.WflPrilohy.create(inputDto, componentDto);
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\DetailBuilderComponents\GSslDetailSbernyArchComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {
        SslDetailSbernyArch: {
            create: function (content, componentDto) {
                //definice badge ve sběrném archu
                content.sbernyArchBadge = new GObservableObject({
                    id: "wflSbernyArchBadge",
                    value: "0",
                    tooltip: "0",
                    customClass: "g-state-info" //zobrazeni, akt. moznosti: g-state-info, g-state-important, g-state-warning, g-state-error
                });
                content.statusSbernyArchStatusVelikostSouboru = new GObservableObject({
                  
                    type: "static",
                    id: "statusSbernyArchStatusVelikostSouboru",
                    caption: undefined,
                });


                var result = {
                    onInit: [
                        function () {
                            this.GroupResult = undefined;

                            this.zaregistrujHromadneAkce();
                            this.visibleHromadneAkce();
                        }
                    ],
                    onBuild: [
                        function () {
                            this.sslArchIsMoved = false;

                            this.enableSslDetailSbernyArch();

                            //  this.nasetujSbernyArch(this.SslDetailSbernyArch_Dto);
                            this.sslSbernyArchNastavEnableAkceZRadkuGridu();
                            this.updatePocetAVelikostiSouboru(componentDto.KpiVelikostaPocetSoboru);
                        }
                    ],

                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                        setSslDetailSbernyArch_Dto: function (newDto) {
                            var that = this;
                            if (newDto != null) {
                                this.SslDetailSbernyArch_Dto = newDto;
                                this.refreshGridSslSbernyArch();
                            }
                        },

                        createSbernyArchGrid: function (createEmptyGrid) {
                            var that = this;
                            if (Gordic.Utils.WidgetExists("ggrid", this.gridSbernyArch)) {
                                this.gridSbernyArch.ggrid("destroy");
                                this.gridSbernyArch.remove();
                                this.gridSbernyArch = $("<div>").appendTo(this.gridSbernyArchTab).gautofit({ resizersOnTab: false });
                            }
                            var viewOpt = {
                                key: "por_cislo"
                            };
                            var data = this.SslDetailSbernyArch_Dto.ListSbernyArchSpisu;
                            if (this.isTreeActivated()) {
                                data = this.SslDetailSbernyArch_Dto.ListTreeSbernyArchSpisu;
                                viewOpt.key = "ixp";
                                viewOpt.processors = {
                                    //provider: new Gordic.Data.Provider(function (req) {
                                    //    if (!req.data) return [_this.newItem(0, null)]; // root

                                    //    var d = [];   // random data
                                    //    for (var i = 0; i < Math.random() * 10; i++)
                                    //        d.push(_this.newItem(id++, req.data.index));
                                    //    return req.data.index < 10 ? d : [];
                                    //}),
                                    tree: new Gordic.Data.Tree(
                                        Gordic.Data.Tree.parentIdOrganizer("ixp_spis"),
                                        {
                                            defaultState: "open"
                                        }
                                    ) //,  // defaultnistav radku je „nenacteno“, tzn [+] ale bez children
                                };
                            }

                            if (createEmptyGrid) { // při přepínání modu je potřeba vytvořit prázdný grid
                               data = [];
                            }

                            this.viewSbernyArch = new Gordic.Data.View(
                                data,
                                viewOpt
                            );

                            if (componentDto.IsSoucast && this.isSbernyArchTreeModeEnable() && !this.isTreeActivated()) {
                                this.sslArchIDily();
                            }
                            var columnListObj = {columnList:""};
                            var gridKolonky = Gordic.Ssl.GSslCommonDlg.getGridColumnsSbernyArch(
                                {
                                    ZnackaText: this.SslDetailSbernyArch_Dto.ZnackaText,
                                    isTreeMode: this.isTreeActivated(),
                                    ssl_nev_posepk: this.SslDetailSbernyArch_Dto.ssl_nev_posepk,
                                    ssl_uzooznacfun: this.SslDetailSbernyArch_Dto.ssl_uzooznacfun,
                                    content: this,
                                    pouzivatDilciTerminy: this.SslDetailSbernyArch_Dto.PouzivatDilciTerminy,
                                    withoutDoplnujiciInformace: true,
                                    IxsFunAkt: componentDto.IxsFunAkt,
                                    IxsSuAkt: componentDto.IxsSuAkt,
                                    columnListObj: columnListObj
                                }
                            );
                            var hromadneAkce = that.actions.createBar([{ type: "static", caption: "jres:31937273", favorite: true, children: that.menuHromadneAKceSbernyarch }]);
                            //var opt = {
                            //    content: that,
                            //    menuParamsArr: hromadneAkce
                            //};
                            //Gordic.Wfl.Globals.ListSupport.NastavHiddenZbytecnymSeparatorumZMenuParams(opt); // mělo by stačit volat na tu eventu
                            this.gridSbernyArch.ggrid({
                                name: "GridSbernyArch",
                                data: this.viewSbernyArch,
                                renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                                columnMode: "full",  // fit, full
                                navigationMode: "row", // row, cell
                                sort: "por_cislo_uziv",
                                defaultAction: this.actions.actSbernyArchOtevriNovyDetail, //selectAction
                                cellActivate: function (ev, row) {
                                    that.sslSbernyArchNastavEnableAkceZRadkuGridu(row);
                                },
                                multi: !this.isTreeActivated(),
                                scrollHelperTemplate: "{nazev_ext}",  // "{ixs_esu} - {nazev}",
                                //searchColumns: ["nazev_ext"],
                                columns: gridKolonky,
                                defaultProfile: {
                                    //condFormats: condFormats,
                                    columnList: columnListObj.columnList
                                },
                                rowsClass: function (dataRow) {
                                    if (dataRow && dataRow.data && dataRow.data.aktivita !== 100 ) { // přiřazená 300  
                                        return " ui-disabled data-deleted ";// + Gordic.Global.Enums.ColorStateClass.inactive; //g-state-inactive data-deleted  
                                    } else return "  ";
                                },
                                contextMenu: [
                                    { action: this.actions.actSbernyArchOtevriNovyDetail, favorite: true },
                                    { action: this.actions.actOtevriDokumentDoNoveZalozkyVeStejneFazi, favorite: true },
                                    { action: this.actions.actOtevreniElObrazuDokumentu },
                                    { action: this.actions.actSslArchPosunUplneNahoru, favorite: true },
                                    { action: this.actions.actSslArchPosunNahoru, favorite: true },
                                    { action: this.actions.actSslArchPosunDolu, favorite: true },
                                    { action: this.actions.actSslArchPosunUplneDolu, favorite: true },
                                    { action: this.actions.actSslArchUlozitMoves, favorite: true },
                                    { action: this.actions.actSslArchZrusitMoves, favorite: true },
                                    { action: this.actions.actSslArchZnovuVlozit, favorite: true },
                                    { action: this.actions.actSslArchVlozit, favorite: true },
                                    { action: this.actions.actSslArchVyjmout, favorite: true },
                                    { action: this.actions.actSslArchVyrizujici, favorite: true },
                                    { action: this.actions.actSslArchZmenitDatVlozeni, favorite: true },
                                    { action: this.actions.actSslArchPrilohy, favorite: false },
                                    //{ action: this.actions.actPoznamkovyBlokPridat, favorite: true },
                                    { action: this.actions.actTiskArchu, favorite: true },
                                    hromadneAkce[0]//RC 31937273 : Hromadné akce
                                ]
                            });

                        },


                        refreshGridSslSbernyArch: function () {
                            var that = this;
                            var opt = {
                                SSLDetail: null,
                                IxpSpis: this.SslDetailSbernyArch_Dto.ixp
                            };
                            this.beginOperation();
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            if (this.isTreeActivated()) {
                                srv.call("SeznamSbernyArchTypovehoSpisuTree", opt)
                                    .done(function (retVal) {
                                        if (retVal) {
                                            that.SslDetailSbernyArch_Dto.ListTreeSbernyArchSpisu = retVal;
                                            that.sslArchIsMoved = false;
                                            that.setGridSbernyArch();
                                        }
                                    })
                                    .always(function () {
                                        that.endOperation();
                                        srv.close();
                                    })
                                    ;
                            } else {
                                srv.call("SeznamSbernyArchSpisuNeboTypovehoSpisu", opt) //dsebesta dříve // SeznamSbernyArchSpisu
                                    .done(function (retVal) {
                                        if (retVal) {
                                            that.SslDetailSbernyArch_Dto.ListSbernyArchSpisu = retVal;
                                            that.sslArchIsMoved = false;
                                            that.setGridSbernyArch();
                                        }
                                    })
                                    .always(function () {
                                        that.endOperation();
                                        srv.close();
                                    })
                                    ;
                            }



                        },
                        setGridSbernyArch: function () {
                            var that = this;
                            if (Gordic.Utils.WidgetExists("ggrid", this.gridSbernyArch)) {
                                var data = this.SslDetailSbernyArch_Dto.ListSbernyArchSpisu;
                                if (this.isTreeActivated()) {
                                    data = that.SslDetailSbernyArch_Dto.ListTreeSbernyArchSpisu;
                                }
                                this.viewSbernyArch.updateData(data, "set", true); // dsebesta ref T19864 po update tam zustavali vyset řádky co u jsem nechtěl dříve byl "update"
                                //update //"add" | "update" | "extend" | "refresh" | "delete" | "set" | "reset"  dříve "update"
                                if (!Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                                    return;
                                }
                                this.gridSbernyArch.ggrid("refreshRows");


                                this.sslSbernyArchNastavEnableAkceZRadkuGridu();
                                this.znovuNactiPocetAVelikostiSouboru();
                            }
                        },
                        sslSbernyArchNastavEnableAkceZRadkuGridu: function (row) {
                            var that = this;
                            var trueRow = null;
                            if (!Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                                return;
                            }
                            if (row == null) {
                                trueRow = that.gridSbernyArch.ggrid("activeRow");
                            } else {
                                if (row != null && row.cellInfo != null && row.cellInfo.data != null) {
                                    trueRow = row.cellInfo.data;
                                }
                            }

                            var treeActivated = this.isTreeActivated();

                            this.actions.actSslArchVyjmout.update({ enabled: false });
                            this.actions.actSslArchVyrizujici.update({ enabled: false });
                            this.actions.actSslArchZmenitDatVlozeni.update({ enabled: false });
                            this.actions.actSslArchZnovuVlozit.update({ enabled: false });
                            this.actions.actSslArchPrepniNaStromAZpet.update({ visible: this.isSbernyArchTreeModeEnable() });

                            this.actions.actSslArchIDily.update({ visible: componentDto.IsSoucast && this.isSbernyArchTreeModeEnable() && !treeActivated });

                            this.actions.actSslArchVyjmout.update({ visible: this.sslArchIsMoved ? false : true });
                            this.actions.actSslArchVyrizujici.update({ visible: this.sslArchIsMoved ? false : true });
                            this.actions.actSslArchZmenitDatVlozeni.update({ visible: this.sslArchIsMoved ? false : true });
                            this.actions.actSslArchZnovuVlozit.update({ visible: this.sslArchIsMoved ? false : true });
                            //this.actions.actSslArchVlozit.update({ visible: this.sslArchIsMoved ? false : true }); //  dsebesta 14.6 Netřeba vypořítávat z řádku
                            this.actions.actTiskArchu.update({ visible: this.sslArchIsMoved ? false : true });

                            this.actions.actSslArchUlozitMoves.update({ visible: this.sslArchIsMoved && !treeActivated ? true : false });
                            this.actions.actSslArchZrusitMoves.update({ visible: this.sslArchIsMoved && !treeActivated ? true : false });

                            this.actions.actSslArchPosunUplneDolu.update({ visible: !treeActivated });
                            this.actions.actSslArchPosunUplneNahoru.update({ visible: !treeActivated });
                            this.actions.actSslArchPosunDolu.update({ visible: !treeActivated });
                            this.actions.actSslArchPosunNahoru.update({ visible: !treeActivated });

                            if (trueRow && trueRow.aktivita != null && trueRow.ixp != null) {

                                var opt = {
                                    IxpSpis: trueRow.ixp_spis,
                                    IxpDok: trueRow.ixp,
                                    Aktivita: trueRow.aktivita,
                                    // VztahSpis: trueRow.vztah_spis
                                };

                                var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                //this.beginOperation();
                                this.promisSbernyArchSpisuEnabledActions = srv.call("SbernyArchSpisuEnabledActions", opt, null, { progressState: false }) // srv.call("SbernyArchSpisuEnabledActions", opt, null, { progressState: false } 
                                    .done(function (retVal) {
                                        if (retVal.StavBool) {
                                            that.SslDetailSbernyArch_Dto.nastavenoZRadkuGridu = true;
                                            that.actions.actSslArchVyrizujici.update({ enabled: retVal.BoolParam1 && that.SslDetailSbernyArch_Dto.VyrizujiciEnabled && trueRow.aktivita === 100 }); //ActionNastavitVyrizujiciEnabled 
                                            that.actions.actSslArchZmenitDatVlozeni.update({ enabled: retVal.BoolParam2 }); //ActionaZmenitDatVlozeniEnabled
                                            that.actions.actSslArchVyjmout.update({ enabled: retVal.BoolParam3 }); //LzeVyjmoutPisemnost

                                            //that.actions.actSslArchVlozit.update({ enabled: retVal.BoolParam4 }); //  dsebesta 14.6 Netřeba vypořítávat z řádku
                                            that.actions.actSslArchZnovuVlozit.update({ enabled: retVal.BoolParam5 }); // toto
                                        }
                                        //that.endOperation();
                                    }).always(function () { srv.close(); });
                                this.actions.actSslArchZnovuVlozit.update({ enabled: that.SslDetailSbernyArch_Dto.ZnovuVlozitEnabled && (trueRow.aktivita === 500 || trueRow.aktivita === 300) });
                            }


                        },

                        zpracujResultSGroupResult: function (retVal) {
                            var that = this;
                            if (retVal != null) {
                                if (retVal.GroupResult) {
                                    this.GroupResult = retVal.GroupResult;
                                } else if (retVal.groupResult) {
                                    this.GroupResult = retVal.groupResult;
                                } else if (retVal.GroupResultList) {
                                    this.GroupResult = retVal.GroupResultList;
                                } else {
                                    this.GroupResult = undefined;
                                }
                                if (retVal.PrintProtocol != undefined && retVal.PrintProtocol === true) { // Prevzit

                                    this.tiskPredavacihoProtokolu(); // TODO
                                }

                                else {
                                    this.refreshGridSslSbernyArch();
                                }
                            }
                        },
                        tiskPredavacihoProtokolu: function () {
                            var that = this;
                            var predavaciProtokolAkce = GAction.createPrintAction({
                                name: 'actTiskPredavaciProtokolSbernyArch',
                                caption: 'Tisk předávacího protokolu',
                                tema: 'ssl_ptm_predpro',
                                reportStarting: function (reportInfo) {
                                    return Gordic.Wfl.GWflListUtils.CreatePredavaciProtokolPrintParams({
                                        parentContent: that
                                    })
                                        .then(function (printParams) {
                                            if (printParams.LogPorCislo == null
                                                || printParams.IxsFunPredavajici == null
                                                || printParams.IxsFunPrebirajici == null
                                            ) {
                                                return $.Deferred().reject().promise();
                                            }

                                            reportInfo.params.X0000 = printParams.LogPorCislo.toString();
                                            reportInfo.params.X0001 = printParams.IxsFunPredavajici;
                                            reportInfo.params.X0002 = printParams.IxsFunPrebirajici;

                                            return $.Deferred().resolve().promise();
                                        });
                                },
                                reportFinished: function () {
                                    that.refreshGridSslSbernyArch();
                                }
                            });
                            var ImplicitneTisknoutPredProt = this.globalSettings.getDef(Gordic.Wfl.AppSettings.ImplicitneTisknoutPredProtSettingsKey, false);
                            var DotazatSePredTiskem = this.globalSettings.getDef(Gordic.Wfl.AppSettings.DotazatSePredTiskemSettingsKey, false);
                            if (ImplicitneTisknoutPredProt) {
                                if (DotazatSePredTiskem) {
                                    let l_sQuestion = "jres:31937276"; //RC 31937276 : Přejete si vytisknout předávací protokol?
                                    that.dialogs.confirm("jres:31937277", l_sQuestion).on("close", function (ev, retVal) { //RC 31937277 : Dotaz
                                        if (retVal) {
                                            if (retVal === "yes") {
                                                predavaciProtokolAkce.run();
                                            }
                                        }
                                    });
                                } else {
                                    predavaciProtokolAkce.run();
                                }
                            }

                        },

                        CreateGroupResult: function (error, isError, key, rowState) {
                            return { Error: error, IsError: isError, Key: key, RowState: rowState }
                        },

                        //sslArchZnovuVlozitDoSpisu: function () {

                        //    var that = this;

                        //    var selection = this.gridSbernyArch.ggrid("getSelection");
                        //    if (selection.length === 1) {

                        //        var idDokumentu = selection[0].ixp;

                        //        var IDSpisVlozitDoSpisu = this.SslDetailSbernyArch_Dto.ixp + "|" + "empty";
                        //        //_this.onDoneFunction = this.ZnovuVlozitDoSpisuSubmit;
                        //        var opt = {
                        //            IxpSpis: that.SslDetailSbernyArch_Dto.ixp,
                        //            IxpDok: idDokumentu,
                        //            IDSpisVlozitDoSpisu: IDSpisVlozitDoSpisu,
                        //            content: this,

                        //        };
                        //        that.beginOperation();
                        //        Gordic.Ssl.Utils.dotazIRPNaVlozeniDokumentuDoSpisu(opt)
                        //            .done(function (rv) {
                        //                that.refreshGridSslSbernyArch();
                        //            })
                        //            .always(function () {
                        //                that.endOperation();
                        //            })
                        //            ;

                        //    } else {
                        //        this.dialogs.alert("jres:31937042", "jres:31937064"); //RC 31937064 : Je označeno příliš mnoho řádků
                        //    }
                        //},

                        //sslArchVyjmoutZeSpisu: function () {
                        //    var that = this;

                        //    var selection = this.gridSbernyArch.ggrid("getSelection");
                        //    if (selection.length === 1) {

                        //        var idDokumentu = selection[0].ixp;

                        //        var IDSpisVlozitDoSpisu = this.SslDetailSbernyArch_Dto.ixp + "|" + "empty";
                        //        //_this.onDoneFunction = this.ZnovuVlozitDoSpisuSubmit;

                        //        var def = $.Deferred();

                        //        var optVlozit = {
                        //            def: def,
                        //            IDSpisVlozitDoSpisu: IDSpisVlozitDoSpisu,
                        //            content: this
                        //        };
                        //        that.beginOperation();
                        //        Gordic.Ssl.Utils.vlozitVyjmoutZeSpisu(false, idDokumentu, optVlozit);

                        //        def.done(function () {
                        //            that.refreshGridSslSbernyArch();
                        //        })
                        //            .always(function () {
                        //                that.endOperation();
                        //            })
                        //            ;

                        //    } else {
                        //        this.dialogs.alert("jres:31937042", "jres:31937064"); //RC 31937064 : Je označeno příliš mnoho řádků
                        //    }
                        //},
                        sslArchVlozitZaznam: function () {
                            var that = this;
                            var options =
                            {
                                IxpVkladanehoDok: this.SslDetailSbernyArch_Dto.ixp,
                                TypSpis: 0
                            };

                            this.GroupResult = [];

                            this.hledatIdentDokSpi(
                                function (retVal) { // 
                                    var idDokumentu = retVal.ixp;
                                    if (idDokumentu) {
                                        var IDSpisVlozitDoSpisu = that.SslDetailSbernyArch_Dto.ixp + "|" + "empty";
                                        //_this.onDoneFunction = this.ZnovuVlozitDoSpisuSubmit;
                                        var opt = {
                                            IxpSpis: that.SslDetailSbernyArch_Dto.ixp,
                                            IxpDok: idDokumentu,
                                            IDSpisVlozitDoSpisu: IDSpisVlozitDoSpisu,
                                            content: that,

                                        };
                                        that.beginOperation();
                                        Gordic.Ssl.Utils.dotazIRPNaVlozeniDokumentuDoSpisu(opt)
                                            .done(function (rv) {
                                                 var gr = that.CreateGroupResult("", false, idDokumentu, 0);
                                                 that.GroupResult.push(gr);

                                                that.refreshGridSslSbernyArch();
                                            })
                                            .always(function () {
                                                that.endOperation();
                                            })
                                            ;

                                    }
                                }
                                , options
                            );
                        },
                        sslArchVyrizujiciPisemnostSpisu: function () {
                            var that = this;
                            if (!Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                                return;
                            }

                            this.GroupResult = [];

                            var selection = this.gridSbernyArch.ggrid("getSelection");
                            if (selection.length === 1) {

                                var idDokumentu = selection[0].ixp;
                                var opt = {
                                    IxpSpis: this.SslDetailSbernyArch_Dto.ixp,
                                    IxpDok: idDokumentu

                                };
                                var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                this.beginOperation();
                                srv.call("VyrizujiciPisemnostSpisu", opt)
                                    .done(function (retVal) {
                                        if (retVal.StavBool) {
                                            var gr = that.CreateGroupResult("", false, idDokumentu, 0);
                                            that.GroupResult.push(gr);

                                            that.refreshGridSslSbernyArch();
                                        } else {
                                            that.dialogs.alert("jres:31937043"); //RC 31937043 : Něco se nepovedlo.
                                        }
                                    })
                                    .always(function () {
                                        that.endOperation();
                                        srv.close();
                                    })
                                    ;

                            } else {
                                this.dialogs.alert("jres:31937042", "jres:31937064"); //RC 31937064 : Je označeno příliš mnoho řádků
                            }

                        },

                        //sslArchVlozitDoBloku: function () {
                        //    var that = this;

                        //    var selection = this.gridSbernyArch.ggrid("getSelection");
                        //    if (selection.length > 0) {

                        //        var idDokumentu = selection[0].ixp;
                        //        var opt = {
                        //            IxpSpis: this.SslDetailSbernyArch_Dto.ixp,
                        //            IxpDok: idDokumentu

                        //        };
                        //        var srv = this.createServiceContent({ className: "Gordic.Ssl.WebClient.GDetailUtils", params: {} });  //servisni sluzba/content
                        //        this.beginOperation();
                        //        srv.call("VyrizujiciPisemnostSpisu", opt)
                        //            .done(function (retVal) {
                        //                if (retVal.StavBool) {
                        //                    that.refreshGridSslSbernyArch();
                        //                } else {
                        //                    that.dialogs.alert("jres:31937043"); //RC 31937043 : Něco se nepovedlo.
                        //                }
                        //            })
                        //            .always(function () {
                        //                that.endOperation();
                        //            })
                        //            ;

                        //    } else {
                        //        this.dialogs.alert("jres:31937042", "jres:26257032"); //RC 26257032 : Označte řádek.
                        //    }

                        //},

                        sslArchZmenitDatVlozeni: function () {
                            var that = this;
                            if (!Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                                return;
                            }

                            this.GroupResult = [];

                            var selection = this.gridSbernyArch.ggrid("getSelection");
                            if (selection.length === 1) {

                                var idDokumentu = selection[0].ixp;

                                var form = new Gordic.Forms.Form()
                                    .addRow("jres:26256683") //RC 26256683 : Datum vložení do spisu
                                    .addField("gdatebox", { name: "date", valueType: "date" });
                                var simpeForm = this.dialogs.simpleForm("jres:26256683", form, null, { width: 400, height: 230 });  //RC 26256683 : Datum vložení do spisu

                                simpeForm.on("ok", function (ev, data) {
                                    if (data && data.date) {
                                        var opt = {
                                            "IxpSpis": that.SslDetailSbernyArch_Dto.ixp,
                                            "IxpDok": idDokumentu,
                                            "SpisDatZmena": that.datZmena,
                                            "DatOd": data.date
                                        };
                                        var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                        that.beginOperation();
                                        srv.call("ZmenitDatVlozeniDoSpisu", opt) // nevyvolá se preloader   
                                            .done(function (retVal) {
                                                if (retVal) {
                                                    var gr = that.CreateGroupResult("", false, idDokumentu, 0);

                                                    that.GroupResult.push(gr);

                                                    that.refreshGridSslSbernyArch();
                                                }
                                            })
                                            .always(function () {
                                                that.endOperation();
                                                srv.close();
                                            })
                                            ;
                                    }
                                });
                            } else {
                                this.dialogs.alert("jres:31937042", "jres:31937064"); //RC 31937064 : Je označeno příliš mnoho řádků
                            }
                        },

                        sslArchPrilohySpisu: function () {

                            var that = this;
                            if (!Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                                return;
                            }

                            var opt = {
                                IxpSpis: this.SslDetailSbernyArch_Dto.ixp
                            };

                            Gordic.Ssl.Dialogs.PrilohyObsahSpisuDlg(this, opt, Gordic.Global.Enums.ModOtevreni.navigate);
                        },

                        //#region pole

                        sslArchMoveInList: function (typ) {

                            this.sslArchIsMoved = true;
                            if (!Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                                return;
                            }
                            var selection = this.gridSbernyArch.ggrid("getSelection");
                            switch (typ) {
                                case 0: //0 dolu
                                    this.sslArchPosunDoluPripravit(selection);
                                    this.setGridSbernyArch();
                                    break;
                                case 1: //1nahoru
                                    this.sslArchPosunNahoruPripravit(selection);
                                    this.setGridSbernyArch();
                                    break;
                                case 2: // uplne dolu
                                    this.sslArchPosunUplneDoluPripravit(selection);
                                    this.setGridSbernyArch();
                                    break;
                                case 3:// uplne nahoru
                                    this.sslArchPosunUplneNahoruPripravit(selection);
                                    this.setGridSbernyArch();
                                    break;

                                default:
                            }
                            this.sslSbernyArchNastavEnableAkceZRadkuGridu();

                        },


                        //Dolu
                        sslArchPosunDoluPripravit: function (selection) {
                            var that = this;
                            $(selection.reverse()).each(function (index, element) {
                                that.sslArchPosunDolu(that.SslDetailSbernyArch_Dto.ListSbernyArchSpisu, element.por_cislo_uziv);

                            });
                        },
                        sslArchPosunDolu: function (input, por_cislo_uziv) {
                            //var index = input.findIndex(item => item.por_cislo_uziv === por_cislo_uziv);
                            var index = -1;
                            for (var i = 0; i < input.length; ++i) {
                                if (input[i].por_cislo_uziv === por_cislo_uziv) {
                                    index = i;
                                    break;
                                }
                            }

                            //var indexDolu = input.findIndex(item => item.por_cislo_uziv === por_cislo_uziv + 1); 
                            var indexDolu = -1;
                            for (var i = 0; i < input.length; ++i) {
                                if (input[i].por_cislo_uziv === por_cislo_uziv + 1) {
                                    indexDolu = i;
                                    break;
                                }
                            }
                            if (index !== -1 && indexDolu !== -1) {
                                this.sslArchSwapIndex(input, index, indexDolu)
                            }
                        },
                        //nahoru
                        sslArchPosunNahoruPripravit: function (selection) {
                            var that = this;
                            $(selection).each(function (index, element) {
                                that.sslArchPosunNahoru(that.SslDetailSbernyArch_Dto.ListSbernyArchSpisu, element.por_cislo_uziv);
                            });
                        },
                        sslArchPosunNahoru: function (input, por_cislo_uziv) {
                            //var index = input.findIndex(item => item.por_cislo_uziv === por_cislo_uziv);
                            var index = -1;
                            for (var i = 0; i < input.length; ++i) {
                                if (input[i].por_cislo_uziv === por_cislo_uziv) {
                                    index = i;
                                    break;
                                }
                            }
                            //var indexNahoru = input.findIndex(item => item.por_cislo_uziv === por_cislo_uziv - 1);
                            var indexNahoru = -1;
                            for (var i = 0; i < input.length; ++i) {
                                if (input[i].por_cislo_uziv === por_cislo_uziv - 1) {
                                    indexNahoru = i;
                                    break;
                                }
                            }
                            if (index !== -1 && indexNahoru !== -1) {
                                this.sslArchSwapIndex(input, index, indexNahoru)
                            }
                        },

                        //uplne dolu
                        sslArchPosunUplneDoluPripravit: function (selection) {
                            var that = this;
                            var maxIndex = that.SslDetailSbernyArch_Dto.ListSbernyArchSpisu.length;

                            $(selection.reverse()).each(function (index, element) {
                                for (var i = 0; i < maxIndex; i++) {
                                    that.sslArchPosunDolu(that.SslDetailSbernyArch_Dto.ListSbernyArchSpisu, element.por_cislo_uziv);
                                }
                            });
                        },

                        //uplne nahoru
                        sslArchPosunUplneNahoruPripravit: function (selection) {
                            var that = this;
                            var maxIndex = that.SslDetailSbernyArch_Dto.ListSbernyArchSpisu.length;

                            $(selection).each(function (index, element) {
                                for (var i = 0; i < maxIndex; i++) {
                                    that.sslArchPosunNahoru(that.SslDetailSbernyArch_Dto.ListSbernyArchSpisu, element.por_cislo_uziv);
                                }
                            });
                        },

                        //společne
                        sslArchSwapIndex: function (input, index_A, index_B) {

                            var temp = input[index_A].por_cislo_uziv;

                            input[index_A].por_cislo_uziv = input[index_B].por_cislo_uziv;
                            input[index_B].por_cislo_uziv = temp;
                            input.sort(this.sslArchSortByPor_cislo_uziv);
                        },
                        sslArchSortByPor_cislo_uziv: function (a, b) {
                            var aNum = a.por_cislo_uziv;
                            var bNum = b.por_cislo_uziv;
                            return ((aNum < bNum) ? -1 : ((aNum > bNum) ? 1 : 0));
                        },
                        sslArchSaveMoves: function () {
                            var that = this;
                            var opt = {
                                IxpSpis: this.SslDetailSbernyArch_Dto.ixp,
                                List: this.SslDetailSbernyArch_Dto.ListSbernyArchSpisu,
                            };

                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            this.beginOperation();
                            srv.call("UlozitPoradiRadku", opt) // nevyvolá se preloader   
                                .done(function (retVal) {
                                    if (retVal) {
                                        that.refreshGridSslSbernyArch();
                                    }
                                })
                                .always(function () {
                                    that.endOperation();
                                    srv.close();
                                })
                                ;


                        },
                        sslArchStornoMoves: function () {
                            this.refreshGridSslSbernyArch();
                        },

                        isSbernyArchTreeModeEnable: function () {
                            var ret = false;
                            if (componentDto.IsTypovySpis || componentDto.IsSoucast) { // componentDto.IsDil už není stromovej
                                ret = true;
                            }
                            return ret;
                        },
                        isTreeActivated: function () {
                            var ret = false;
                            if (this.treeSbernyArchIsActive) { // componentDto.IsDil už není stromovej
                                ret = true;
                            }
                            return ret;
                        },
                        sslArchPrepniNaStromAZpet: function () {
                            if (this.isTreeActivated()) {
                                this.actions.actSslArchPrepniNaStromAZpet.update({
                                    caption: "jres:31937186", //RC 31937186 : Strom    
                                    icon: "gi-uzel"
                                });
                                this.treeSbernyArchIsActive = false;
                            } else {
                                this.actions.actSslArchPrepniNaStromAZpet.update({
                                    caption: "jres:31937187", //RC 31937187 : Seznam
                                    icon: "gi-list"
                                });
                                this.treeSbernyArchIsActive = true;
                            }
                            this.createSbernyArchGrid(true);
                            this.refreshGridSslSbernyArch();

                        },
                        sslArchIDily: function () {
                            this.viewSbernyArch.process({
                                filterTypSpis4: new Gordic.Data.FilterProcessor(
                                    function (row) {
                                        return row.data.typ_spis != 4;
                                    }
                                )
                            });

                            var checked = this.actions.actSslArchIDily.checked();

                            if (this.viewSbernyArch && this.viewSbernyArch.processors && this.viewSbernyArch.processors.filterTypSpis4) {
                                this.viewSbernyArch.processors.filterTypSpis4.setEnabled(!checked);
                            }
                            this.viewSbernyArch.refresh();
                        },


                        /*

                        saveSslDetailSbernyArch: function () {
                            
                            var sbernyArchModel = {
                                IsSbernyArch:true
                            };
                            this.findForms("formSslSbernyArch").findFields().gfield("model", "collect", sbernyArchModel);
                            return sbernyArchModel;
                        },
                        */
                        //#region akce

                        zaregistrujHromadneAkce: function () {
                            var opt = {
                                content: this,
                                getSelectedRowsInfoFromList: this.getSelectedRowsInfoFromList, // WflListBase
                                getIxpArrayFromSelection: this.getIxpArrayFromSelection,// WflListBase
                                zpracujResultSGroupResult: this.zpracujResultSGroupResult, //WflListBase
                                getIxpOfActiveRow: this.getIxpOfActiveRow, // WflListBase
                                reload: this.refreshGridSslSbernyArch, // WflListBase // reload
                                isNutnyVyberDenikuCj: componentDto.IsNutnyVyberDenikuCj, //WflListBase
                                // IxsBlp: string, nakonec bráno z kontentu aktualní hodnota
                                // AlternativeIxpArray?: any[], // bráno z kontentu
                                ssl_rem_dokd: componentDto.ssl_rem_dokd, //WflListBase,
                                actNameSufix: "DetailSbernyArch",
                                //getSelectedGDataAkceSslProfil: this.getSelectedGDataAkceSslProfil
                            };

                            // registruju akce na kontent
                            Gordic.Wfl.Globals.ListSupport.HromadneAkceZaregistrujnaContent(opt);

                            this.menuHromadneAKceSbernyarch = Gordic.Wfl.Globals.ListSupport.HromadneAkceVratMenu({ content: content, actNameSufix: "DetailSbernyArch" });
                        },
                        getSelectedRowsInfoFromList: function () {
                            var that = this;
                            var l_asSelectedRows = [];

                            if (Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {

                                var l_aoSelections = this.gridSbernyArch.ggrid("getSelection", true);

                                if (l_aoSelections.length > 0) {
                                    l_aoSelections.forEach(function (entry) {
                                        var rowData = entry.data;
                                        // 11.06.2024 - TFeik
                                        // Datum změny dokumentu je ve vlastnosti dat_zmena_dok a ne v dat_zmena.
                                        l_asSelectedRows.push({
                                            Ixp: rowData.ixp,
                                            //DatZmena: rowData.dat_zmena,
                                            DatZmena: rowData.dat_zmena_dok,
                                            PrizSpis: rowData.priz_spis,
                                            SPrij: rowData.s_prij
                                        });
                                    });
                                }
                            }

                            if (l_asSelectedRows.length == 0) {
                                this.showFlash("jres:31937271", "g-state-error", this.flashPanelTimer); //RC 31937271 : Není vybrán žádný záznam.
                            }

                            return l_asSelectedRows;
                        },
                        getIxpArrayFromSelection: function () {
                            var ixpArray = [];

                            if (Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                                var selection = this.gridSbernyArch.ggrid("getSelection");

                                if (selection.length > 0) {
                                    selection.forEach(function (entry) {
                                        ixpArray.push(entry.ixp);
                                    });
                                }
                            }

                            if (ixpArray.length == 0) {
                                this.showFlash("jres:31937272", "g-state-error", this.flashPanelTimer); //RC 31937272 : Není vybrán žádný záznam.
                            }

                            return ixpArray;
                        },
                        //getSelectedGDataAkceSslProfil: function(){
                        //    if (Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                        //        return this.gridSbernyArch.ggrid("getSelection").map((o) => { return { ixp: o.ixp, SpPlan: o.spis_pl, SpZnak: o.spis_znak, SkartZnak: o.skar_znak, SkartLhuta: o.skar_lhuta, SkartLhutaSpra: o.skar_lhuta_spra, RokSkartace: o.rok_skartace, }; });
                        //    }
                        //},

                        getIxpOfActiveRow: function () {
                            if (!Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                                return;
                            }
                            var activeRow = this.gridSbernyArch.ggrid("activeRow");
                            var ixp = null;
                            if (activeRow) {
                                ixp = activeRow.ixp;
                            }
                            return ixp;
                        },

                        visibleHromadneAkce: function () {
                            var dto = this.getVisibleHromadneAkceDto();

                            var optHideShowHromadneAkce = {
                                content: this,
                                hromadneAkceWflDto: dto,
                                actNameSufix: "DetailSbernyArch"
                            };
                            // určím kterí budou vidět a které ne
                            Gordic.Wfl.Globals.ListSupport.HideShowHromadneAkce(optHideShowHromadneAkce);
                        },
                        znovuNactiPocetAVelikostiSouboru: function () {
                            var that = this;
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            var opt = {
                                ixp: componentDto.ixp
                            }
                            srv.call("ZnovuNactiPocetAVelikostiSouboru", opt)
                                .done(function (retVal) {
                                    that.updatePocetAVelikostiSouboru(retVal);
                                })
                                .always(function () {
                                })
                                ;
                        },
                        updatePocetAVelikostiSouboru: function (dto) {
                            this.updateSbernyArchBadge(dto.VelikostPocetSoboruPocetDok, dto.VelikostaPocetSoboruVarovani);
                            this.updateStatusSbernyArchStatusVelikostSouboru(dto.VelikostaPocetSoboruVelikost, dto.VelikostaPocetSoboruVarovani);
                            
                        },
                        updateSbernyArchBadge: function (VelikostPocetSoboruPocetDok, VelikostaPocetSoboruVarovani) {
                            var that = this;
                            var tooltip = "jres:31937440 " + (VelikostPocetSoboruPocetDok ? VelikostPocetSoboruPocetDok : "0"); //RC 31937440 : Počet dokumentů:
                            if (VelikostaPocetSoboruVarovani) {
                                tooltip = tooltip + ".<br> " + VelikostaPocetSoboruVarovani;
                            }
                            
                            content.sbernyArchBadge.update( {
                                id: "statusWflPrilohyBadge",
                                value: VelikostPocetSoboruPocetDok ? VelikostPocetSoboruPocetDok : "0",
                                tooltip: tooltip,
                                customClass: VelikostaPocetSoboruVarovani ? "g-state-important"  :  "g-state-info" //zobrazeni, akt. moznosti: g-state-info, g-state-important, g-state-warning, g-state-error
                            });

                        },

                        updateStatusSbernyArchStatusVelikostSouboru: function (velikostaPocetSoboruVelikost, velikostaPocetSoboruVarovani) {
                            content.statusSbernyArchStatusVelikostSouboru.update({
                                caption: velikostaPocetSoboruVelikost ? "jres:31937442: " + velikostaPocetSoboruVelikost : "", //RC 31937442 : VELIKOST
                                tooltip: "jres:31937441 " + velikostaPocetSoboruVelikost + (velikostaPocetSoboruVarovani ? "<br>" + velikostaPocetSoboruVarovani : ""), //RC 31937441 : Velikost el. dokumentů (kB):
                                customClass: velikostaPocetSoboruVarovani ? "g-state-text g-state-important" : ""
                            });

                        },

                        getVisibleHromadneAkceDto: function () {
                            var defaultDto = Gordic.Wfl.Globals.ListSupport.GetDefaultGHromadneWflAkceDto();

                            var visible = true;
                            var simpleMode = componentDto.SimpleMode;
                            if (simpleMode) {
                                visible = false;
                            }
                            //tato sekce je specifická pro každá content. vybereš si které chceš a které ne
                            // Defaultně jsou všechny true.

                            defaultDto.PredatPrimo = simpleMode ? true : visible;
                            defaultDto.PridelitHromadne = visible;
                            defaultDto.PrevzitHromadne = visible;
                            defaultDto.PrevzitVRedistribuciHromadne = false;
                            defaultDto.ZrusitPrideleniHromadne = visible;
                            defaultDto.ZmenitPrideleniHromadne = visible;
                            defaultDto.EvidovatRozsirenyProfilHromadne = visible;
                            defaultDto.EvidovatHromadne = visible;
                            defaultDto.OdeslatHromadne = visible;
                            defaultDto.VyjmoutZeSpisuHromadne = visible;
                            defaultDto.VlozitDoSpisuSslHromadne = visible;
                            defaultDto.SouboryNearchivniFormat = visible;
                            defaultDto.SouboryRozpoznaniFormatu = visible;
                            defaultDto.OpravaMetadatSeznamNew = simpleMode ? true : visible;
                            defaultDto.OpravitMetadataPoKontroleSeznam = simpleMode ? true : visible;
                            defaultDto.ZmenitFormuHromadne = visible;
                            defaultDto.ZtvarneniMetadatSpisuHromadne = false;
                            defaultDto.ZmenitDilciDokTerminHromadne = visible;
                            defaultDto.ZmenitDoplnekZnackyHromadne = visible;
                            defaultDto.ZmenitPocetListu = visible;
                            defaultDto.ZmenitPocetPriloh = visible;
                            defaultDto.ZmenitPocetListuPriloh = visible;
                            defaultDto.ZmenitPoznamkuHromadne = visible;
                            defaultDto.ZmenitPristupHromadne = visible;
                            defaultDto.ZmenitSpisZnakHromadne = visible;
                            defaultDto.ZmenitTerminSpisuHromadne = visible;
                            defaultDto.ZmenitTypDokHromadne = visible;
                            defaultDto.ZmenitVecHromadne = visible;
                            defaultDto.ZmenitUmisteniHromadne = visible;
                            defaultDto.ZmenitZpusobDoruceniHromadne = visible;
                            defaultDto.ZmenitSchvalovateleHromadne = visible;
                            defaultDto.ZmenitZpracovateleHromadne = visible;
                            defaultDto.VlozitDokEpkHromadne = visible;
                            defaultDto.VlozitSpisEpkHromadne = false;
                            defaultDto.VyriditAdActaHromadne = simpleMode ? true : visible;
                            defaultDto.VyriditDokumentyHromadne = simpleMode ? true : visible;
                            defaultDto.VyriditSpisyHromadne = false;
                            defaultDto.ZrusitVyrizeniDokumentuHromadne = visible;
                            defaultDto.ZrusitVyrizeniSpisuHromadne = false;
                            defaultDto.ZrusitUzavreniSpisuHromadne = false;
                            defaultDto.PrerusitHromadne = visible;
                            defaultDto.PriorovatHromadne = false;
                            defaultDto.PredatDokumentyExtAgHromadne = visible;
                            defaultDto.PredatSpisyExtAgHromadne = false;
                            defaultDto.PrevzitExtAgHromadne = visible;
                            defaultDto.PridatKlSlovaHromadne = visible;
                            defaultDto.OdebratKlSlovaHromadne = visible;
                            defaultDto.VlozitDokumentSpisDoBaliku = false;
                            defaultDto.VyjmoutDokumentSpisZBaliku = false;
                            defaultDto.VytvoritBalikAVlozitSeznam = false;
                            defaultDto.PridatSpisyZDokumentuHromadne = false;
                            defaultDto.PridatDokumentyVlozeneDoSpisuHromadne = false;
                            defaultDto.PoznamkovyBlokPridatHromadne = visible;
                            defaultDto.OznacitJakoPrecteneHromadne = visible;
                            defaultDto.OznacitJakoNeprecteneHromadne = visible;
                            defaultDto.TiskListWfl = visible;
                            defaultDto.TiskPevny = visible;
                            defaultDto.TiskSpisObalky = false;
                            defaultDto.TiskSbernyArch = false;
                            defaultDto.Obcerstvit = visible;
                            defaultDto.UzivatelskeSloupceVlastnosti = false;
                            defaultDto.UlozitDoClipboardu = true;
                            // konec specifické sekce

                            return defaultDto;
                        },


                        //#endregion
                        enableSslDetailSbernyArch: function () {
                            var that = this;
                            var l_bActionEnabled = true;
                            if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }

                            this.actions.actSslArchZnovuVlozit.update({ enabled: false });
                            this.actions.actSslArchVlozit.update({ enabled: this.SslDetailSbernyArch_Dto.VlozitEnabled });
                            this.actions.actSslArchVyjmout.update({ enabled: false });
                            this.actions.actTiskArchu.update({ enabled: this.SslDetailSbernyArch_Dto.TiskArchuEnabled });
                            this.actions.actSslArchPrilohy.update({ enabled: this.SslDetailSbernyArch_Dto.PrilohySpisuEnabled });

                            this.actions.actSslArchPrilohy.update({ visible: this.SslDetailSbernyArch_Dto.PrilohySpisuVisible });

                            this.actions.actSslArchVyrizujici.update({ enabled: false });
                            this.actions.actSslArchZmenitDatVlozeni.update({ enabled: false });
                            //this.actions.actPoznamkovyBlokPridat.visible(componentDto.SimpleMode? false: true);
                            //this.visibleHromadneAkce();
                        }


                    },

                    actions: { //může být zadáno jako pole nebo jako objekt

                        actTiskArchu: GAction.createPrintAction({
                            name: "actTiskArchu",
                            icon: "gi-print|gi-spis_bold gi-bgw gi-stack-pos--rb g-state-text g-state-info",
                            tema: "usu_ptm_spisarc",
                            caption: "jres:31937065",  //RC 31937065 : Tisk archu
                            reportStarting: function (rep) {
                                rep.params.X0000 = $.content(this).SslDetailSbernyArch_Dto.ixp;
                                rep.params.Preselect = false;
                            },
                        }),
                        //actSslArchZnovuVlozit: {
                        //    caption: "jres:31937066",  //RC 31937066 : Znovu vložit
                        //    run: function () {
                        //        $.content(this).sslArchZnovuVlozitDoSpisu();
                        //    }
                        //},
                        actSslArchZnovuVlozit: Gordic.Wfl.PreActions.VlozitDoSpisuSslHromadne({
                            inputData: function () {
                                return {
                                    parentContent: content,
                                    opt: { rows: content.getSelectedRowsInfoFromList(), ixpSpisuProVlozeni: componentDto.ixp }
                                };
                            },
                            done: function (retVal) {
                                content.zpracujResultSGroupResult(retVal);
                            },
                            fail: function (retVal) {
                                content.showFlash("jres:31937455", "g-state-error"); //RC 31937455 : Nepodařilo se vložit dokumenty do spisu.
                            },
                            actionParams: {
                                caption: "jres:31937066",  //RC 31937066 : Znovu vložit
                                tooltip: "jres:31937066",  //RC 31937066 : Znovu vložit
                                name: "actSslArchZnovuVlozit"
                            }
                        }),
                        actSslArchVlozit: {
                            caption: "jres:31937470", //RC 31937470 : Vložit nový
                            tooltip: "jres:31937471", //RC 31937471 : Otevře hledání nového dokumentu, který bude vložen do spisu.
                            run: function () {
                                $.content(this).sslArchVlozitZaznam();
                            }
                        },
                        //actSslArchVyjmout: {
                        //    caption: "jres:26255302", //RC 26255302 : Vyjmout
                        //    run: function () {
                        //        $.content(this).sslArchVyjmoutZeSpisu();
                        //    }
                        //},
                        actSslArchVyjmout: Gordic.Wfl.PreActions.VyjmoutZeSpisuHromadne({
                            inputData: function () {
                                var def = $.Deferred();
                                var inputData = {
                                    data: content.getSelectedRowsInfoFromList(),
                                    ssl_rem_dokd: componentDto.ssl_rem_dokd,
                                };

                                return def.resolve(inputData).promise();
                            },
                            done: function (retVal) {
                                content.zpracujResultSGroupResult(retVal);
                            },
                            fail: function (retVal) {
                                if (retVal && retVal !== "") {
                                    var rows = content.getSelectedRowsInfoFromList();
                                    var GroupResult = Gordic.Wfl.Globals.createGroupResultForErrorBulkOperation(rows, retVal);

                                    content.zpracujResultSGroupResult({ GroupResult: GroupResult });
                                }
                            },
                            actionParams: {
                                caption: "jres:26255302", //RC 26255302 : Vyjmout
                                tooltip: "jres:26255302", //RC 26255302 : Vyjmout
                                name: "actSslArchVyjmout"
                            }
                        }),
                        actSslArchVyrizujici: {
                            caption: "jres:26255300", //RC 26255300 : Vyřizující
                            run: function () {
                                $.content(this).sslArchVyrizujiciPisemnostSpisu();
                            }
                        },
                        actSslArchZmenitDatVlozeni: {
                            caption: "jres:26256682", //RC 26256682 : Změnit datum vložení do spisu
                            run: function () {
                                $.content(this).sslArchZmenitDatVlozeni();
                            }
                        },
                        actSslArchPrilohy: {
                            caption: "jres:26257250", //RC 26257250 : Přílohy spisu
                            tooltip: "jres:26257251", //RC 26257251 : Všechny přílohy v rámci spisu
                            icon: "gi-attachment|gi-spis_bold gi-bgw gi-stack-pos--rb g-state-text g-state-info",
                            run: function () {
                                $.content(this).sslArchPrilohySpisu();
                            },
                        },
                        /*
                        actPoznamkovyBlokPridat: new GAction(Gordic.Wfl.PreActions.PoznamkovyBlokPridatHromadne({
                            inputData: function (action, event, ctx, param) {
                                var deferred = $.Deferred();
                                
                                //var cnt = $.content(event.target); 
                                
                                
                                var selection = content.gridSbernyArch.ggrid("getSelection");
                                if (selection.length > 0) {
                                    return deferred.resolve({
                                        IxpArr: Gordic.Ssl.WebClient.GDokumentIsl.DocumentDtosToIxps(selection)
                                    }).promise();
                                } else {
                                    content.dialogs.error("jres:26257034"); //RC 26257034 : Označte řádek pro provedení akce.
                                    return deferred.reject();
                                }
                               
                            },
                            done: function (retVal) {
                                
                                if (retVal != null) {
                                    content.zpracujResultSGroupResult(retVal);
                                    //if(retVal.GroupResult) {
                                    //    cnt.GroupResult = retVal.GroupResult;
                                    //} else {
                                    //    cnt.GroupResult = undefined;
                                    //}
                                   
                                }

                            },
                            })),
                        */
                        //actSslArchRefresh: {
                        //    caption: "Občerstvit",
                        //    run: function () {
                        //        $.content(this).sslArchRefreshList();
                        //    }
                        //},
                        actSslArchPosunNahoru: {
                            caption: "jres:26255304", //RC 26255304 : Posunout nahoru
                            tooltip: "jres:26255304", //RC 26255304 : Posunout nahoru
                            captionVisible: "never",
                            icon: "gi-arrow-down gi-rot180",
                            run: function () {
                                $.content(this).sslArchMoveInList(1);
                            }
                        },
                        actSslArchPosunDolu: {
                            caption: "jres:26255305", //RC 26255305 : Posunout dolů
                            tooltip: "jres:26255305", //RC 26255305 : Posunout dolů
                            captionVisible: "never",
                            icon: "gi-arrow-down",
                            run: function () {
                                $.content(this).sslArchMoveInList(0);
                            }
                        },
                        actSslArchPosunUplneNahoru: {
                            caption: "jres:31937067", //RC 31937067 : Posunout úplně nahoru
                            tooltip: "jres:31937067", //RC 31937067 : Posunout úplně nahoru
                            captionVisible: "never",
                            icon: "gi-arrow-double gi-rot90",
                            run: function () {
                                $.content(this).sslArchMoveInList(3);
                            }
                        },
                        actSslArchPosunUplneDolu: {
                            caption: "jres:31937068", //RC 31937068 : Posunout úplně dolů
                            tooltip: "jres:31937068", //RC 31937068 : Posunout úplně dolů
                            captionVisible: "never",
                            icon: "gi-arrow-double gi-rot270",
                            run: function () {
                                $.content(this).sslArchMoveInList(2);
                            }
                        },
                        actSslArchUlozitMoves: {
                            caption: "jres:31937069", //RC 31937069 : Uložit posunutí
                            icon: "gi-save",
                            run: function () {
                                $.content(this).sslArchSaveMoves();
                            }
                        },
                        actSslArchZrusitMoves: {
                            caption: "jres:31937070", //RC 31937070 : Zrušit posunutí
                            icon: "gi-window-close",
                            run: function () {
                                $.content(this).sslArchStornoMoves();
                            }
                        },
                        actSslArchPrepniNaStromAZpet: {
                            caption: "jres:31937186", //RC 31937186 : Strom
                            icon: "gi-uzel", //gi-list
                            visible: false,
                            run: function () {
                                $.content(this).sslArchPrepniNaStromAZpet();
                            }
                        },
                        actSslArchIDily: {
                            caption: "jres:31937200", //RC 31937200 : I díly
                            icon: "gi-folder_bold_D", //gi-list
                            tooltip: "jres:31937201", //RC 31937201 : V seznamu se zobrazí i díly
                            visible: false,
                            checked: false,
                            run: function () {
                                if (!this.checked()) {
                                    this.checked(true);
                                    $.content(this).sslArchIDily();
                                } else {
                                    this.checked(false);
                                    $.content(this).sslArchIDily();
                                }


                            }
                        },
                        actSbernyArchOtevriNovyDetail: {
                            caption: "jres:26257273",  //RC 26257273 : Detail
                            icon: "gi-detail", //gi-list
                            tooltip: "jres:26257272",  //RC 26257272 : Otevře detail do nové záložky
                            run: function (ev, ctx) {
                                var cnt = $.content(this);
                                var gridSbernyArch = cnt.gridSbernyArch;
                                var ixp = cnt.getIxpOfActiveRow();
                                if (ixp) {
                                    if (cnt.promisSbernyArchSpisuEnabledActions) {
                                        cnt.promisSbernyArchSpisuEnabledActions
                                            .always(function (retVal) {
                                                cnt.otevriNovyDetail({
                                                    DetailDto: {
                                                        ixp: ixp
                                                    },
                                                    grid: gridSbernyArch
                                                });
                                            });
                                    }
                                    else {
                                        cnt.otevriNovyDetail({
                                            DetailDto: {
                                                ixp: ixp
                                            },
                                            grid: gridSbernyArch
                                        });
                                    }
                                }
                            }
                        },
                        actOtevriDokumentDoNoveZalozkyVeStejneFazi: Gordic.Wfl.PreActions.OtevriDokumentDoNoveZalozkyVeStejneFazi({
                            inputData: function (x, y) {
                                var optinput = { ixp: content.getIxpOfActiveRow() };
                                return optinput;
                            },
                            done: function (retVal) {
                                //var content = $.content(this);
                            },
                            fail: function () {
                                content.showFlash(
                                    "jres:31937314", //RC 31937314 : Novou záložku se nepodařilo otevřít.
                                    Gordic.Global.Enums.ColorStateClass.error,
                                    undefined,
                                    "actOteveniNoveZalozky"
                                );
                            },
                            /*
                            actionParams: {
                                name: "actVytvoritBalik",
                                caption: "jres:26255568" //RC 26255568 : Vytvořit balík a vložit
                            }
                            */
                        }),
                        actOtevreniElObrazuDokumentu: {
                            caption: "jres:26257431", //RC 26257431 : Otevřít hlavní přílohu
                            icon: "gi-eattachment",
                            tooltip: "jres:26257431", //RC 26257431 : Otevřít hlavní přílohu
                            run: function (ev, ctx) {
                                var cnt = $.content(this);
                                var ixp = cnt.getIxpOfActiveRow();
                                if (ixp) {
                                    Gordic.Wfl.AttachmentUtils.ShowMainAttachment(cnt, ixp, false);
                                }
                                
                            }
                        },



                    },

                    tabs: {
                        SslSbernyArch: {
                            tabParams: {
                                title: componentDto.NadpisTabu,

                                // opened: true,  //1. tab je pro agednovou hlavičku, ta je pro dokumenty, spisy, zakázky atp. vždy L2M2S1. BO detaily mimo wfl (tzn. dokumenty, spisy) jsou v L1M1S1 //RC 26255308 : Dokument
                                //menuBar: [
                                //   // { action: "actSslArchRefresh", favorite: true },
                                //    { action: "actSslArchPosunUplneNahoru", favorite: true },
                                //    { action: "actSslArchPosunNahoru", favorite: true },
                                //    { action: "actSslArchPosunDolu", favorite: true },
                                //    { action: "actSslArchPosunUplneDolu", favorite: true },
                                //    { action: "actSslArchUlozitMoves", favorite: true },
                                //    { action: "actSslArchZrusitMoves", favorite: true },
                                //    { action: "actSslArchZnovuVlozit", favorite: true },
                                //    { action: "actSslArchVlozit", favorite: true },
                                //    { action: "actSslArchVyjmout", favorite: true },
                                //    { action: "actSslArchVyrizujici", favorite: true },
                                //    { action: "actSslArchZmenitDatVlozeni", favorite: true },
                                //    { action: "actPoznamkovyBlokPridat", favorite: true },
                                //    { action: "actTiskArchu", favorite: true },
                                //    { action: "actSslArchIDily", favorite: true, align: "opposite" },
                                //    { action: "actSslArchPrepniNaStromAZpet", favorite: true, align: "opposite" }
                                //],
                                group: $.extend(
                                    Gordic.Prefabs.TabGroups.SbernyArch(componentDto.NadpisTabu), {
                                    badge: content.sbernyArchBadge
                                })
                            },
                           
                            init: function (tab) {
                                //#region definice tab dokumentu
                                var that = $.content(tab);
                                    //.addNumberColumn({
                                
                                //var menuHromadneAKce = Gordic.Wfl.Globals.ListSupport.HromadneAkceVratMenu({ content: content });
                                var menubarSbernyArch = [
                                    // { action: "actSslArchRefresh", favorite: true },
                                    { action: "actSbernyArchOtevriNovyDetail"},
                                    { action: "actOtevriDokumentDoNoveZalozkyVeStejneFazi"},
                                    { action: "actOtevreniElObrazuDokumentu"},
                                    { action: "actSslArchPosunUplneNahoru", favorite: true },
                                    { action: "actSslArchPosunNahoru", favorite: true },
                                    { action: "actSslArchPosunDolu", favorite: true },
                                    { action: "actSslArchPosunUplneDolu", favorite: true },
                                    { action: "actSslArchUlozitMoves", favorite: true },
                                    { action: "actSslArchZrusitMoves", favorite: true },
                                    { action: "actSslArchZnovuVlozit", favorite: true },
                                    { action: "actSslArchVlozit", favorite: true },
                                    { action: "actSslArchVyjmout", favorite: true },
                                    { action: "actSslArchVyrizujici", favorite: true },
                                    { action: "actSslArchZmenitDatVlozeni", favorite: true },
                                    { action: "actSslArchPrilohy", favorite: false },
                                    //{ action: "actPoznamkovyBlokPridat", favorite: true },
                                    { action: "actTiskArchu", favorite: true },
                                    { action: "actSslArchIDily", favorite: true, align: "opposite" },
                                    { action: "actSslArchPrepniNaStromAZpet", favorite: true, align: "opposite" }
                                    , { type: "static", caption: "jres:31937273", favorite: true, children: that.menuHromadneAKceSbernyarch }//favoriteHromadneAkceDto: favoriteHromadneAkceDto //RC 31937273 : Hromadné akce
                                ]
                                /*
                                tab.one('gtabopen', (ev, ctx) => { // Vlastův života zachraný zlepšovák
                                    var bar = that.actions.createBar(menubarSbernyArch);
                                    tab.gtab("setMenuBar", bar);
                                })
                                */


                                tab.one('gtabopen', function (ev, ctx) { // Vlastův života zachraný zlepšovák
                                    var bar = that.actions.createBar(menubarSbernyArch);
                                    var opt = {
                                        content: that,
                                        menuParamsArr: bar
                                    };
                                    Gordic.Wfl.Globals.ListSupport.NastavHiddenZbytecnymSeparatorumZMenuParams(opt);

                                    tab.gtab("setMenuBar", bar, that.userSettings.sub("menuBarSbernyArchTab"));
                                });


                                /*
                                that.actions.add({
                                    name: "actSbernyArchOtevriNovyDetail",
                                    run: function (ev, ctx) {
                                      
                                        var gridSbernyArch = that.gridSbernyArch;
                                        if (that.promisSbernyArchSpisuEnabledActions) {
                                            that.promisSbernyArchSpisuEnabledActions
                                                .always(function (retVal) {
                                                    that.otevriNovyDetail({
                                                        DetailDto: {
                                                            ixp: ctx.cellInfo.data.ixp
                                                        },
                                                        grid: gridSbernyArch
                                                    });
                                                });
                                        }
                                        else {
                                            that.otevriNovyDetail({
                                                DetailDto: {
                                                    ixp: ctx.cellInfo.data.ixp
                                                },
                                                grid: gridSbernyArch
                                            });
                                        }
                                       
                                    }
                                });
                                */
                                that.gridSbernyArchTab = tab;
                                that.gridSbernyArch = $("<div>").appendTo(tab).gautofit({ resizersOnTab: false });
                                that.createSbernyArchGrid();
                                //#endregion
                                
                            }
                        }
                    },

                    statusBar: [content.statusSbernyArchStatusVelikostSouboru]

                };

                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\DetailBuilderComponents\GSslDetailObsahTSComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {
        SslDetailObsahTS: {
            create: function (content, componentDto) {
                //definice badge v obsahu spisu
                //content.sbernyArchBadge = new GObservableObject({
                //    id: "wflObsahSpisuBadge",
                //    value: "0",
                //    tooltip: "0",
                //    customClass: "g-state-info" //zobrazeni, akt. moznosti: g-state-info, g-state-important, g-state-warning, g-state-error
                //});

                //content.statusSbernyArchStatusVelikostSouboru = new GObservableObject({
                  
                //    type: "static",
                //    id: "statusSbernyArchStatusVelikostSouboru",
                //    caption: undefined,
                //});
                
                var result = {
                    onInit: [
                        function () {
                           // this.zaregistrujHromadneAkce();
                           // this.visibleHromadneAkce();
                        }
                    ],
                    onBuild: [
                        function () {

                            this.enableSslDetailSbernyArch();

                            //  this.nasetujSbernyArch(this.SslDetailObsahTS_Dto);
                            this.sslSbernyArchNastavEnableAkceZRadkuGridu();
                          //  this.updatePocetAVelikostiSouboru(componentDto.KpiVelikostaPocetSoboru);
                        }
                    ],

                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                        setSslDetailObsahTS_Dto: function (newDto) {
                            var that = this;
                            if (newDto != null) {
                                this.SslDetailObsahTS_Dto = newDto;
                                this.refreshGridSslSbernyArch(this.actions.actSslArchIDily.checked());
                            }
                        },

                        createSbernyArchGrid: function (createEmptyGrid) {
                            var that = this;
                            if (Gordic.Utils.WidgetExists("ggrid", this.gridSbernyArch)) {
                                this.gridSbernyArch.ggrid("destroy");
                                this.gridSbernyArch.remove();
                                this.gridSbernyArch = $("<div>").appendTo(this.gridSbernyArchTab).gautofit({ resizersOnTab: false });
                            }

                            var data = this.SslDetailObsahTS_Dto.ListSbernyArchSpisu;

                            //if (createEmptyGrid) { // při přepínání modu je potřeba vytvořit prázdný grid
                            //    data = [];
                            //}

                            var viewOpt = {
                                key: "ixp",
                            };

                            viewOpt.processors = {
                                tree: new Gordic.Data.Tree(
                                    Gordic.Data.Tree.parentIdOrganizer("ixp_parent"),
                                    {
                                        defaultState: function (row) {
                                            var state = "open"; // "closed" | "open" | "empty" | "unknown" | "loading";

                                            //if (row.data.typ_spis == 3 || row.data.typ_spis == 5) {
                                            //    state = "open"; // případně "unknown", pokud nechci mít díly hned viditelné
                                            //}
                                            return state;
                                        },
                                        filterKeepStructure: false,
                                        filterIncludeChildren: true
                                    }
                                ),
                                filterObsahSoucasti: new Gordic.Data.FilterProcessor(
                                    function (row) {
                                        return row.data.ixp_soucast == componentDto.ixp;
                                    }
                                )
                            };
      
                            this.viewSbernyArch = new Gordic.Data.View(
                                data,
                                viewOpt
                            );

                            this.viewSbernyArch.processors.filterObsahSoucasti.setEnabled(false); // ve výchozím stavu se nepoužívá


                            var columnListObj = { columnList: "" };
                            var gridKolonky = Gordic.Ssl.GSslCommonDlg.getGridColumnsObsahTS(
                                {
                                    // 03.04.2025 - TFeik
                                    // Změnba návu značky.
                                    //ZnackaText: this.SslDetailObsahTS_Dto.ZnackaText,
                                    ZnackaText: 'jres:32170447', //RC 32170447 : Značka entity
                                    isTreeMode: true,
                                    ssl_nev_posepk: this.SslDetailObsahTS_Dto.ssl_nev_posepk,
                                    content: this,
                                    pouzivatDilciTerminy: this.SslDetailObsahTS_Dto.PouzivatDilciTerminy,
                                    withoutDoplnujiciInformace: true,
                                    IxsFunAkt: componentDto.IxsFunAkt,
                                    columnListObj: columnListObj
                                }
                            );

                            var hromadneAkce = that.actions.createBar([{ type: "static", caption: "jres:31937273", favorite: true, children: that.menuHromadneAKceSbernyarch }]);

                            this.gridSbernyArch.ggrid({
                                name: "GridSbernyArch",
                                data: this.viewSbernyArch,
                                renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                                columnMode: "full",  // fit, full
                                navigationMode: "row", // row, cell
                              //  sort: "por_cislo_uziv",
                                defaultAction: this.actions.actSbernyArchOtevriNovyDetail, //selectAction
                                cellActivate: function (ev, row) {
                                    that.sslSbernyArchNastavEnableAkceZRadkuGridu(row);
                                },
                                multi: true,
                                scrollHelperTemplate: "{nazev_ext}",  // "{ixs_esu} - {nazev}",
                                //searchColumns: ["nazev_ext"],
                                columns: gridKolonky,
                                defaultProfile: {
                                    //condFormats: condFormats,
                                    columnList: columnListObj.columnList
                                },
                                rowsClass: function (dataRow) {
                                    if (dataRow && dataRow.data && dataRow.data.priz_spis == 0 ) { // 0 u nevložených/vyjmutých Dokumentů/Součástí/Dilů:
                                        return " ui-disabled data-deleted ";// + Gordic.Global.Enums.ColorStateClass.inactive; //g-state-inactive data-deleted  
                                    } else return "  ";
                                },
                                contextMenu: [
                                    { action: this.actions.actSbernyArchOtevriNovyDetail, favorite: true },
                                    { action: this.actions.actOtevriDokumentDoNoveZalozkyVeStejneFazi, favorite: true },
                                 //   { action: this.actions.actOtevreniElObrazuDokumentu },
                                 //   { action: this.actions.actTiskArchu, favorite: true },
                                 //   hromadneAkce[0]//RC 31937273 : Hromadné akce
                                ]
                            });

                            this.gridSbernyArch.ggrid("activeRow", this.SslDetailObsahTS_Dto.ixp);
                        },

                        refreshGridSslSbernyArch: function (vcetneDilu) {
                            var that = this;

                            var opt = {
                                SSLDetail: null,
                                IxpTypovySpis: componentDto.ixp_top,
                                VcetneDilu: vcetneDilu
                            };
                            this.beginOperation();
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content

                            srv.call("SeznamObsahTypovehoSpisu", opt)
                                .done(function (retVal) {
                                    if (retVal) {
                                        that.SslDetailObsahTS_Dto.ListSbernyArchSpisu = retVal;
                                        that.setGridSbernyArch();
                                    }
                                })
                                .always(function () {
                                    that.endOperation();
                                    srv.close();
                                })
                                ;

                        },
                        setGridSbernyArch: function () {
                            var that = this;
                            if (Gordic.Utils.WidgetExists("ggrid", this.gridSbernyArch)) {
                                var data = this.SslDetailObsahTS_Dto.ListSbernyArchSpisu;
    
                                this.viewSbernyArch.updateData(data, "reset"); // hotfix. Update mi od nějaké doby přestal spolehlivě fungovat. Resetem a následným updatem zajistím zobrazení správných dat. I když je možné, že reset může resetovat víc věcí, než si přeji.
                                this.viewSbernyArch.updateData(data, "update", true); // update na rozdíl od set zde funguje u stromogridu
                                //update //"add" | "update" | "extend" | "refresh" | "delete" | "set" | "reset"  dříve "update"
                                if (!Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                                    return;
                                }
                                this.gridSbernyArch.ggrid("refreshRows");


                          //      this.sslSbernyArchNastavEnableAkceZRadkuGridu();
                              //  this.znovuNactiPocetAVelikostiSouboru();
                            }
                        },
                        sslSbernyArchNastavEnableAkceZRadkuGridu: function (row) {
                            var that = this;
                            var trueRow = null;
                            if (!Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                                return;
                            }
                            if (row == null) {
                                trueRow = that.gridSbernyArch.ggrid("activeRow");
                            } else {
                                if (row != null && row.cellInfo != null && row.cellInfo.data != null) {
                                    trueRow = row.cellInfo.data;
                                }
                            }

                            var treeActivated = true;

                            if(trueRow && trueRow.aktivita != null && trueRow.ixp != null) {
                                var opt = {
                                    IxpSpis: trueRow.ixp,
                                    IxpDok: trueRow.ixp,
                                    Aktivita: trueRow.aktivita,
                                    // VztahSpis: trueRow.vztah_spis
                                };

                                var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                //this.beginOperation();
                                this.promisSbernyArchSpisuEnabledActions = srv.call("SbernyArchTypoveEntityEnabledActions", opt, null, { progressState: false }) // srv.call("SbernyArchSpisuEnabledActions", opt, null, { progressState: false } 
                                    .done(function (retVal) {
                                        if (retVal.StavBool) {
                                            that.SslDetailObsahTS_Dto.nastavenoZRadkuGridu = true;
                                        }
                                        //that.endOperation();
                                    }).always(function () { srv.close(); });

                            }

                        },

                        zpracujResultSGroupResult: function (retVal) {
                            var that = this;
                            if (retVal != null) {
                                if (retVal.GroupResult) {
                                    this.GroupResult = retVal.GroupResult;
                                } else if (retVal.groupResult) {
                                    this.GroupResult = retVal.groupResult;
                                } else if (retVal.GroupResultList) {
                                    this.GroupResult = retVal.GroupResultList;
                                } else {
                                    this.GroupResult = undefined;
                                }
                                if (retVal.PrintProtocol != undefined && retVal.PrintProtocol === true) { // Prevzit

                                    this.tiskPredavacihoProtokolu(); // TODO
                                }

                                else {
                                    this.refreshGridSslSbernyArch(this.actions.actSslArchIDily.checked());
                                }
                            }
                        },
                        tiskPredavacihoProtokolu: function () {
                            var that = this;
                            var predavaciProtokolAkce = GAction.createPrintAction({
                                name: 'actTiskPredavaciProtokolSbernyArch',
                                caption: 'Tisk předávacího protokolu',
                                tema: 'ssl_ptm_predpro',
                                reportStarting: function (reportInfo) {
                                    return Gordic.Wfl.GWflListUtils.CreatePredavaciProtokolPrintParams({
                                        parentContent: that
                                    })
                                        .then(function (printParams) {
                                            if (printParams.LogPorCislo == null
                                                || printParams.IxsFunPredavajici == null
                                                || printParams.IxsFunPrebirajici == null
                                            ) {
                                                return $.Deferred().reject().promise();
                                            }

                                            reportInfo.params.X0000 = printParams.LogPorCislo.toString();
                                            reportInfo.params.X0001 = printParams.IxsFunPredavajici;
                                            reportInfo.params.X0002 = printParams.IxsFunPrebirajici;

                                            return $.Deferred().resolve().promise();
                                        });
                                },
                                reportFinished: function () {
                                    that.refreshGridSslSbernyArch(this.actions.actSslArchIDily.checked());
                                }
                            });
                            var ImplicitneTisknoutPredProt = this.globalSettings.getDef(Gordic.Wfl.AppSettings.ImplicitneTisknoutPredProtSettingsKey, false);
                            var DotazatSePredTiskem = this.globalSettings.getDef(Gordic.Wfl.AppSettings.DotazatSePredTiskemSettingsKey, false);
                            if (ImplicitneTisknoutPredProt) {
                                if (DotazatSePredTiskem) {
                                    let l_sQuestion = "jres:31937276"; //RC 31937276 : Přejete si vytisknout předávací protokol?
                                    that.dialogs.confirm("jres:31937277", l_sQuestion).on("close", function (ev, retVal) { //RC 31937277 : Dotaz
                                        if (retVal) {
                                            if (retVal === "yes") {
                                                predavaciProtokolAkce.run();
                                            }
                                        }
                                    });
                                } else {
                                    predavaciProtokolAkce.run();
                                }
                            }

                        },

                        sslArchVlozitZaznam: function () {
                            var that = this;
                            var options =
                            {
                                IxpVkladanehoDok: this.SslDetailObsahTS_Dto.ixp,
                                TypSpis: 0
                            };

                            this.hledatIdentDokSpi(
                                function (retVal) { // 
                                    var idDokumentu = retVal.ixp;
                                    if (idDokumentu) {
                                        var IDSpisVlozitDoSpisu = that.SslDetailObsahTS_Dto.ixp + "|" + "empty";
                                        //_this.onDoneFunction = this.ZnovuVlozitDoSpisuSubmit;
                                        var opt = {
                                            IxpSpis: that.SslDetailObsahTS_Dto.ixp,
                                            IxpDok: idDokumentu,
                                            IDSpisVlozitDoSpisu: IDSpisVlozitDoSpisu,
                                            content: that,

                                        };
                                        that.beginOperation();
                                        Gordic.Ssl.Utils.dotazIRPNaVlozeniDokumentuDoSpisu(opt)
                                            .done(function (rv) {
                                                that.refreshGridSslSbernyArch(that.actions.actSslArchIDily.checked());
                                            })
                                            .always(function () {
                                                that.endOperation();
                                            })
                                            ;

                                    }
                                }
                                , options
                            );
                        },
                        sslArchIDily: function () {
                            var checked = this.actions.actSslArchIDily.checked();

                           /* if (this.viewSbernyArch && this.viewSbernyArch.processors && this.viewSbernyArch.processors.filterTypSpis4) {
                                this.viewSbernyArch.processors.filterTypSpis4.setEnabled(!checked);
                            }
                            this.viewSbernyArch.refresh();*/
 
                            // TODO volani serveru
                            this.refreshGridSslSbernyArch(checked);
                        },
                        sslJenObsahSoucasti: function () {
                            var checked = this.actions.actSslJenObsahSoucasti.checked();

                            if(this.viewSbernyArch && this.viewSbernyArch.processors && this.viewSbernyArch.processors.filterObsahSoucasti) {
                                this.viewSbernyArch.processors.filterObsahSoucasti.setEnabled(checked);
                            }
                            this.viewSbernyArch.refresh();
                        },

                        //#region akce

                        //zaregistrujHromadneAkce: function () {
                        //    var opt = {
                        //        content: this,
                        //        getSelectedRowsInfoFromList: this.getSelectedRowsInfoFromList, // WflListBase
                        //        getIxpArrayFromSelection: this.getIxpArrayFromSelection,// WflListBase
                        //        zpracujResultSGroupResult: this.zpracujResultSGroupResult, //WflListBase
                        //        getIxpOfActiveRow: this.getIxpOfActiveRow, // WflListBase
                        //        reload: this.refreshGridSslSbernyArch, // WflListBase // reload
                        //        isNutnyVyberDenikuCj: componentDto.IsNutnyVyberDenikuCj, //WflListBase
                        //        // IxsBlp: string, nakonec bráno z kontentu aktualní hodnota
                        //        // AlternativeIxpArray?: any[], // bráno z kontentu
                        //        ssl_rem_dokd: componentDto.ssl_rem_dokd, //WflListBase,
                        //        actNameSufix: "DetailSbernyArch",
                        //        //getSelectedGDataAkceSslProfil: this.getSelectedGDataAkceSslProfil
                        //    };

                        //    // registruju akce na kontent
                        //    Gordic.Wfl.Globals.ListSupport.HromadneAkceZaregistrujnaContent(opt);

                        //    this.menuHromadneAKceSbernyarch = Gordic.Wfl.Globals.ListSupport.HromadneAkceVratMenu({ content: content, actNameSufix: "DetailSbernyArch" });
                        //},
                        getSelectedRowsInfoFromList: function () {
                            var that = this;
                            var l_asSelectedRows = [];

                            if (Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {

                                var l_aoSelections = this.gridSbernyArch.ggrid("getSelection", true);

                                if (l_aoSelections.length > 0) {
                                    l_aoSelections.forEach(function (entry) {
                                        var rowData = entry.data;
                                        // 11.06.2024 - TFeik
                                        // Datum změny dokumentu je ve vlastnosti dat_zmena_dok a ne v dat_zmena.
                                        l_asSelectedRows.push({
                                            Ixp: rowData.ixp,
                                            //DatZmena: rowData.dat_zmena,
                                            DatZmena: rowData.dat_zmena_dok,
                                            PrizSpis: rowData.priz_spis,
                                            SPrij: rowData.s_prij
                                        });
                                    });
                                }
                            }

                            if (l_asSelectedRows.length == 0) {
                                this.showFlash("jres:31937271", "g-state-error", this.flashPanelTimer); //RC 31937271 : Není vybrán žádný záznam.
                            }

                            return l_asSelectedRows;
                        },
                        getIxpArrayFromSelection: function () {
                            var ixpArray = [];

                            if (Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                                var selection = this.gridSbernyArch.ggrid("getSelection");

                                if (selection.length > 0) {
                                    selection.forEach(function (entry) {
                                        ixpArray.push(entry.ixp);
                                    });
                                }
                            }

                            if (ixpArray.length == 0) {
                                this.showFlash("jres:31937272", "g-state-error", this.flashPanelTimer); //RC 31937272 : Není vybrán žádný záznam.
                            }

                            return ixpArray;
                        },

                        getIxpOfActiveRow: function () {
                            if (!Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                                return;
                            }
                            var activeRow = this.gridSbernyArch.ggrid("activeRow");
                            var ixp = null;
                            if (activeRow) {
                                ixp = activeRow.ixp;
                            }
                            return ixp;
                        },

                        //visibleHromadneAkce: function () {
                        //    var dto = this.getVisibleHromadneAkceDto();

                        //    var optHideShowHromadneAkce = {
                        //        content: this,
                        //        hromadneAkceWflDto: dto,
                        //        actNameSufix: "DetailSbernyArch"
                        //    };
                        //    // určím kterí budou vidět a které ne
                        //    Gordic.Wfl.Globals.ListSupport.HideShowHromadneAkce(optHideShowHromadneAkce);
                        //},

                        //getVisibleHromadneAkceDto: function () {
                        //    var defaultDto = Gordic.Wfl.Globals.ListSupport.GetDefaultGHromadneWflAkceDto();

                        //    var visible = false;
                        //    var simpleMode = componentDto.SimpleMode;
                        //    if (simpleMode) {
                        //        visible = false;
                        //    }
                        //    //tato sekce je specifická pro každá content. vybereš si které chceš a které ne
                        //    // Defaultně jsou všechny true.

                        //    defaultDto.PredatPrimo = simpleMode ? true : visible;
                        //    defaultDto.PridelitHromadne = visible;
                        //    defaultDto.PrevzitHromadne = visible;
                        //    defaultDto.PrevzitVRedistribuciHromadne = false;
                        //    defaultDto.ZrusitPrideleniHromadne = visible;
                        //    defaultDto.ZmenitPrideleniHromadne = visible;
                        //    defaultDto.EvidovatRozsirenyProfilHromadne = visible;
                        //    defaultDto.EvidovatHromadne = visible;
                        //    defaultDto.OdeslatHromadne = visible;
                        //    defaultDto.VyjmoutZeSpisuHromadne = visible;
                        //    defaultDto.VlozitDoSpisuSslHromadne = visible;
                        //    defaultDto.SouboryNearchivniFormat = visible;
                        //    defaultDto.SouboryRozpoznaniFormatu = visible;
                        //    defaultDto.OpravaMetadatSeznamNew = simpleMode ? true : visible;
                        //    defaultDto.OpravitMetadataPoKontroleSeznam = simpleMode ? true : visible;
                        //    defaultDto.ZmenitFormuHromadne = visible;
                        //    defaultDto.ZtvarneniMetadatSpisuHromadne = false;
                        //    defaultDto.ZmenitDilciDokTerminHromadne = visible;
                        //    defaultDto.ZmenitDoplnekZnackyHromadne = visible;
                        //    defaultDto.ZmenitPocetListu = visible;
                        //    defaultDto.ZmenitPocetPriloh = visible;
                        //    defaultDto.ZmenitPocetListuPriloh = visible;
                        //    defaultDto.ZmenitPoznamkuHromadne = visible;
                        //    defaultDto.ZmenitPristupHromadne = visible;
                        //    defaultDto.ZmenitSpisZnakHromadne = visible;
                        //    defaultDto.ZmenitTerminSpisuHromadne = visible;
                        //    defaultDto.ZmenitTypDokHromadne = visible;
                        //    defaultDto.ZmenitVecHromadne = visible;
                        //    defaultDto.ZmenitUmisteniHromadne = visible;
                        //    defaultDto.ZmenitZpusobDoruceniHromadne = visible;
                        //    defaultDto.ZmenitSchvalovateleHromadne = visible;
                        //    defaultDto.ZmenitZpracovateleHromadne = visible;
                        //    defaultDto.VlozitDokEpkHromadne = visible;
                        //    defaultDto.VlozitSpisEpkHromadne = false;
                        //    defaultDto.VyriditAdActaHromadne = simpleMode ? true : visible;
                        //    defaultDto.VyriditDokumentyHromadne = simpleMode ? true : visible;
                        //    defaultDto.VyriditSpisyHromadne = false;
                        //    defaultDto.ZrusitVyrizeniDokumentuHromadne = visible;
                        //    defaultDto.ZrusitVyrizeniSpisuHromadne = false;
                        //    defaultDto.ZrusitUzavreniSpisuHromadne = false;
                        //    defaultDto.PrerusitHromadne = visible;
                        //    defaultDto.PriorovatHromadne = false;
                        //    defaultDto.PredatDokumentyExtAgHromadne = visible;
                        //    defaultDto.PredatSpisyExtAgHromadne = visible;
                        //    defaultDto.PrevzitExtAgHromadne = visible;
                        //    defaultDto.PridatKlSlovaHromadne = visible;
                        //    defaultDto.OdebratKlSlovaHromadne = visible;
                        //    defaultDto.VlozitDokumentSpisDoBaliku = false;
                        //    defaultDto.VyjmoutDokumentSpisZBaliku = false;
                        //    defaultDto.VytvoritBalikAVlozitSeznam = false;
                        //    defaultDto.PridatSpisyZDokumentuHromadne = false;
                        //    defaultDto.PridatDokumentyVlozeneDoSpisuHromadne = false;
                        //    defaultDto.PoznamkovyBlokPridatHromadne = visible;
                        //    defaultDto.OznacitJakoPrecteneHromadne = visible;
                        //    defaultDto.OznacitJakoNeprecteneHromadne = visible;
                        //    defaultDto.TiskListWfl = visible;
                        //    defaultDto.TiskPevny = visible;
                        //    defaultDto.TiskSpisObalky = false;
                        //    defaultDto.TiskSbernyArch = false;
                        //    defaultDto.Obcerstvit = visible;
                        //    defaultDto.UzivatelskeSloupceVlastnosti = false;
                        //    defaultDto.UlozitDoClipboardu = true;
                        //    // konec specifické sekce

                        //    return defaultDto;
                        //},


                        //#endregion
                        enableSslDetailSbernyArch: function () {
                            var that = this;
                            var l_bActionEnabled = true;
                            if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }

                          //  this.actions.actTiskArchu.update({ enabled: this.SslDetailObsahTS_Dto.TiskArchuEnabled });
  
                            //this.actions.actPoznamkovyBlokPridat.visible(componentDto.SimpleMode? false: true);
                            //this.visibleHromadneAkce();
                        }
                    },

                    actions: { //může být zadáno jako pole nebo jako objekt

                        //actTiskArchu: GAction.createPrintAction({
                        //    name: "actTiskArchu",
                        //    icon: "gi-print|gi-spis_bold gi-bgw gi-stack-pos--rb g-state-text g-state-info",
                        //    tema: "usu_ptm_spisarc",
                        //    caption: "jres:31937065",  //RC 31937065 : Tisk archu
                        //    reportStarting: function (rep) {
                        //        rep.params.X0000 = $.content(this).SslDetailObsahTS_Dto.ixp;
                        //        rep.params.Preselect = false;
                        //    },
                        //}),

                        actSslArchIDily: {
                            caption: "jres:31937200", //RC 31937200 : I díly
                            icon: "gi-folder_bold_D", //gi-list
                            tooltip: "jres:31937201", //RC 31937201 : V seznamu se zobrazí i díly
                            checked: false,
                            run: function () {
                                if (!this.checked()) {
                                    this.checked(true);
                                    $.content(this).sslArchIDily();
                                } else {
                                    this.checked(false);
                                    $.content(this).sslArchIDily();
                                }
                            }
                        },
                        actSslJenObsahSoucasti: {
                            caption: "jres:26257279", //RC 26257279 : Jen obsah součásti
                            icon: "gi-folder_bold_S", //gi-list
                            tooltip: "jres:26257280", //RC 26257280 : V seznamu se zobrazí jen obsah součásti
                            checked: false,
                            run: function () {
                                if (!this.checked()) {
                                    this.checked(true);
                                    $.content(this).sslJenObsahSoucasti();
                                } else {
                                    this.checked(false);
                                    $.content(this).sslJenObsahSoucasti();
                                }
                            },
                            visible: componentDto.IsSoucast,
                        },
                        actSbernyArchOtevriNovyDetail: {
                            caption: "jres:26257273",  //RC 26257273 : Detail
                            icon: "gi-detail", //gi-list
                            tooltip: "jres:26257272",  //RC 26257272 : Otevře detail do nové záložky
                            run: function (ev, ctx) {
                                var cnt = $.content(this);
                                var gridSbernyArch = cnt.gridSbernyArch;
                                var ixp = cnt.getIxpOfActiveRow();
                                if (ixp) {
                                    if (cnt.promisSbernyArchSpisuEnabledActions) {
                                        cnt.promisSbernyArchSpisuEnabledActions
                                            .always(function (retVal) {
                                                cnt.otevriNovyDetail({
                                                    DetailDto: {
                                                        ixp: ixp
                                                    },
                                                    grid: gridSbernyArch
                                                });
                                            });
                                    }
                                    else {
                                        cnt.otevriNovyDetail({
                                            DetailDto: {
                                                ixp: ixp
                                            },
                                            grid: gridSbernyArch
                                        });
                                    }
                                }
                            }
                        },
                        actOtevriDokumentDoNoveZalozkyVeStejneFazi: Gordic.Wfl.PreActions.OtevriDokumentDoNoveZalozkyVeStejneFazi({
                            inputData: function (x, y) {
                                var optinput = { ixp: content.getIxpOfActiveRow() };
                                return optinput;
                            },
                            done: function (retVal) {
                                //var content = $.content(this);
                            },
                            fail: function () {
                                content.showFlash(
                                    "jres:31937314", //RC 31937314 : Novou záložku se nepodařilo otevřít.
                                    Gordic.Global.Enums.ColorStateClass.error,
                                    undefined,
                                    "actOteveniNoveZalozky"
                                );
                            },
                        }),
                        //actOtevreniElObrazuDokumentu: {
                        //    caption: "Otevřít hlavní přílohu",
                        //    icon: "gi-eattachment",
                        //    tooltip: "Otevřít hlavní přílohu",
                        //    run: function (ev, ctx) {
                        //        var cnt = $.content(this);
                        //        var ixp = cnt.getIxpOfActiveRow();
                        //        if (ixp) {
                        //            Gordic.Wfl.AttachmentUtils.ShowMainAttachment(cnt, ixp, false);
                        //        }
                                
                        //    }
                        //},

                    },

                    tabs: {
                        SslSbernyArch: {
                            tabParams: {
                                title: componentDto.NadpisTabu,

                                group: $.extend(
                                    Gordic.Prefabs.TabGroups.SbernyArch(componentDto.NadpisTabu), {
                                  //  badge: content.sbernyArchBadge
                                })
                            },
                           
                            init: function (tab) {
                                //#region definice tab dokumentu
                                var that = $.content(tab);
                                    //.addNumberColumn({
  
                                //var menuHromadneAKce = Gordic.Wfl.Globals.ListSupport.HromadneAkceVratMenu({ content: content });
                                var menubarSbernyArch = [
                                    { action: "actSbernyArchOtevriNovyDetail"},
                                    { action: "actOtevriDokumentDoNoveZalozkyVeStejneFazi"},
                                    { action: "actSslJenObsahSoucasti", favorite: true, align: "opposite" },
                                    { action: "actSslArchIDily", favorite: true, align: "opposite" },
                                   // , { type: "static", caption: "jres:31937273", favorite: true, children: that.menuHromadneAKceSbernyarch }//favoriteHromadneAkceDto: favoriteHromadneAkceDto //RC 31937273 : Hromadné akce
                                ]
 
                                tab.one('gtabopen', function (ev, ctx) { // Vlastův života zachraný zlepšovák
                                    var bar = that.actions.createBar(menubarSbernyArch);
                                    var opt = {
                                        content: that,
                                        menuParamsArr: bar
                                    };
                                //    Gordic.Wfl.Globals.ListSupport.NastavHiddenZbytecnymSeparatorumZMenuParams(opt);

                                    tab.gtab("setMenuBar", bar, that.userSettings.sub("menuBarObsahTSTab"));
                                });

                                that.gridSbernyArchTab = tab;
                                that.gridSbernyArch = $("<div>").appendTo(tab).gautofit({ resizersOnTab: false });
                                that.createSbernyArchGrid();
                                //#endregion
                                
                            }
                        }
                    },

                   // statusBar: [content.statusSbernyArchStatusVelikostSouboru]

                };

                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\DetailBuilderComponents\GSslDetailObsahDiluComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {
        SslDetailObsahDilu: {
            create: function (content, componentDto) {
                //definice badge v obsahu spisu
                //content.sbernyArchBadge = new GObservableObject({
                //    id: "wflObsahDiluBadge",
                //    value: "0",
                //    tooltip: "0",
                //    customClass: "g-state-info" //zobrazeni, akt. moznosti: g-state-info, g-state-important, g-state-warning, g-state-error
                //});

                //content.statusSbernyArchStatusVelikostSouboru = new GObservableObject({
                  
                //    type: "static",
                //    id: "statusSbernyArchStatusVelikostSouboru",
                //    caption: undefined,
                //});
                
                var result = {
                    onInit: [
                        function () {
                            this.zaregistrujHromadneAkce();
                            this.visibleHromadneAkce();
                        }
                    ],
                    onBuild: [
                        function () {
                            this.sslArchIsMoved = false;

                            this.enableSslDetailSbernyArch();

                            //  this.nasetujSbernyArch(this.SslDetailObsahDilu_Dto);
                            this.sslSbernyArchNastavEnableAkceZRadkuGridu();
                        }
                    ],

                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                        setSslDetailObsahDilu_Dto: function (newDto) {
                            var that = this;
                            if (newDto != null) {
                                this.SslDetailObsahDilu_Dto = newDto;
                                this.refreshGridSslSbernyArch();
                            }
                        },

                        createSbernyArchGrid: function (createEmptyGrid) {
                            var that = this;
                            if (Gordic.Utils.WidgetExists("ggrid", this.gridSbernyArch)) {
                                this.gridSbernyArch.ggrid("destroy");
                                this.gridSbernyArch.remove();
                                this.gridSbernyArch = $("<div>").appendTo(this.gridSbernyArchTab).gautofit({ resizersOnTab: false });
                            }
                            var viewOpt = {
                                key: "ixp",
                            };

                            var data = this.SslDetailObsahDilu_Dto.ListObsahDilu;

                            if (createEmptyGrid) { // při přepínání modu je potřeba vytvořit prázdný grid
                               data = [];
                            }

                            this.viewSbernyArch = new Gordic.Data.View(
                                data,
                                viewOpt
                            );

                            var columnListObj = { columnList: "" };
                            var gridKolonky = Gordic.Ssl.GSslCommonDlg.getGridColumnsObsahTS( // TODO
                                {
                                    ZnackaText: this.SslDetailObsahDilu_Dto.ZnackaText,
                                    isTreeMode: true,
                                    ssl_nev_posepk: this.SslDetailObsahDilu_Dto.ssl_nev_posepk,
                                    content: this,
                                    pouzivatDilciTerminy: this.SslDetailObsahDilu_Dto.PouzivatDilciTerminy,
                                    withoutDoplnujiciInformace: true,
                                    IxsFunAkt: componentDto.IxsFunAkt,
                                    columnListObj: columnListObj
                                }
                            );
                            var hromadneAkce = that.actions.createBar([{ type: "static", caption: "jres:31937273", favorite: true, children: that.menuHromadneAKceSbernyarch }]);
                            //var opt = {
                            //    content: that,
                            //    menuParamsArr: hromadneAkce
                            //};
                            //Gordic.Wfl.Globals.ListSupport.NastavHiddenZbytecnymSeparatorumZMenuParams(opt); // mělo by stačit volat na tu eventu
                            this.gridSbernyArch.ggrid({
                                name: "GridSbernyArch",
                                data: this.viewSbernyArch,
                                renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                                columnMode: "full",  // fit, full
                                navigationMode: "row", // row, cell
                              //  sort: "por_cislo_uziv",
                                defaultAction: this.actions.actSbernyArchOtevriNovyDetail, //selectAction
                                cellActivate: function (ev, row) {
                                    that.sslSbernyArchNastavEnableAkceZRadkuGridu(row);
                                },
                                multi: true,
                                scrollHelperTemplate: "{nazev_ext}",  // "{ixs_esu} - {nazev}",
                                //searchColumns: ["nazev_ext"],
                                columns: gridKolonky,
                                defaultProfile: {
                                    //condFormats: condFormats,
                                    columnList: columnListObj.columnList
                                },
                                rowsClass: function (dataRow) {
                                    if(dataRow && dataRow.data && dataRow.data.aktivita !== 100 ) {
                                        return " ui-disabled data-deleted ";// + Gordic.Global.Enums.ColorStateClass.inactive; //g-state-inactive data-deleted  
                                    } else return "  ";
                                },
                                contextMenu: [
                                    { action: this.actions.actSbernyArchOtevriNovyDetail, favorite: true },
                                    { action: this.actions.actOtevriDokumentDoNoveZalozkyVeStejneFazi, favorite: true },
                                  //  { action: this.actions.actOtevreniElObrazuDokumentu },
                                  //  { action: this.actions.actSslArchVlozit, favorite: true },
                                  //  { action: this.actions.actSslArchVyjmout, favorite: true },
                                    hromadneAkce[0]//RC 31937273 : Hromadné akce
                                ]
                            });

                        },


                        refreshGridSslSbernyArch: function () {
                            var that = this;
                            var opt = {
                                SSLDetail: null,
                                IxpSpis: this.SslDetailObsahDilu_Dto.ixp
                            };
                            this.beginOperation();
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content

                            srv.call("SeznamObsahDilu", opt) // TODO
                                .done(function (retVal) {
                                    if (retVal) {
                                        that.SslDetailObsahDilu_Dto.ListObsahDilu = retVal;
                                        that.sslArchIsMoved = false;
                                        that.setGridSbernyArch();
                                    }
                                })
                                .always(function () {
                                    that.endOperation();
                                    srv.close();
                                })
                                ;

                        },
                        setGridSbernyArch: function () {
                            var that = this;
                            if (Gordic.Utils.WidgetExists("ggrid", this.gridSbernyArch)) {
                                var data = this.SslDetailObsahDilu_Dto.ListObsahDilu;
                                this.viewSbernyArch.updateData(data, "set", true); // dsebesta ref T19864 po update tam zustavali vyset řádky co u jsem nechtěl dříve byl "update"
                                //update //"add" | "update" | "extend" | "refresh" | "delete" | "set" | "reset"  dříve "update"
                                if (!Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                                    return;
                                }
                                this.gridSbernyArch.ggrid("refreshRows");


                                this.sslSbernyArchNastavEnableAkceZRadkuGridu();
                                this.znovuNactiPocetAVelikostiSouboru();
                            }
                        },
                        sslSbernyArchNastavEnableAkceZRadkuGridu: function (row) {
                            var that = this;
                            var trueRow = null;
                            if (!Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                                return;
                            }
                            if (row == null) {
                                trueRow = that.gridSbernyArch.ggrid("activeRow");
                            } else {
                                if (row != null && row.cellInfo != null && row.cellInfo.data != null) {
                                    trueRow = row.cellInfo.data;
                                }
                            }

                            var treeActivated = true;

                            this.actions.actSslArchVyjmout.update({ enabled: false });
                            this.actions.actSslArchVyjmout.update({ visible: this.sslArchIsMoved ? false : true });

                            if (trueRow && trueRow.aktivita != null && trueRow.ixp != null) {

                                var opt = {
                                    IxpSpis: trueRow.ixp,
                                    IxpDok: trueRow.ixp,
                                    Aktivita: trueRow.aktivita,
                                    // VztahSpis: trueRow.vztah_spis
                                };

                                var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                //this.beginOperation();
                                this.promisSbernyArchSpisuEnabledActions = srv.call("SbernyArchTypoveEntityEnabledActions", opt, null, { progressState: false })  
                                    .done(function (retVal) {
                                        if (retVal.StavBool) {
                                            that.SslDetailObsahDilu_Dto.nastavenoZRadkuGridu = true;
                                            that.actions.actSslArchVyjmout.update({ enabled: retVal.BoolParam3 }); //LzeVyjmoutPisemnost

                                        }
                                        //that.endOperation();
                                    }).always(function () { srv.close(); });
                            }
                        },

                        zpracujResultSGroupResult: function (retVal) {
                            var that = this;
                            if (retVal != null) {
                                if (retVal.GroupResult) {
                                    this.GroupResult = retVal.GroupResult;
                                } else if (retVal.groupResult) {
                                    this.GroupResult = retVal.groupResult;
                                } else if (retVal.GroupResultList) {
                                    this.GroupResult = retVal.GroupResultList;
                                } else {
                                    this.GroupResult = undefined;
                                }
                                if (retVal.PrintProtocol != undefined && retVal.PrintProtocol === true) { // Prevzit

                                    this.tiskPredavacihoProtokolu(); // TODO
                                }

                                else {
                                    this.refreshGridSslSbernyArch();
                                }
                            }
                        },
                        tiskPredavacihoProtokolu: function () {
                            var that = this;
                            var predavaciProtokolAkce = GAction.createPrintAction({
                                name: 'actTiskPredavaciProtokolSbernyArch',
                                caption: 'Tisk předávacího protokolu',
                                tema: 'ssl_ptm_predpro',
                                reportStarting: function (reportInfo) {
                                    return Gordic.Wfl.GWflListUtils.CreatePredavaciProtokolPrintParams({
                                        parentContent: that
                                    })
                                        .then(function (printParams) {
                                            if (printParams.LogPorCislo == null
                                                || printParams.IxsFunPredavajici == null
                                                || printParams.IxsFunPrebirajici == null
                                            ) {
                                                return $.Deferred().reject().promise();
                                            }

                                            reportInfo.params.X0000 = printParams.LogPorCislo.toString();
                                            reportInfo.params.X0001 = printParams.IxsFunPredavajici;
                                            reportInfo.params.X0002 = printParams.IxsFunPrebirajici;

                                            return $.Deferred().resolve().promise();
                                        });
                                },
                                reportFinished: function () {
                                    that.refreshGridSslSbernyArch();
                                }
                            });
                            var ImplicitneTisknoutPredProt = this.globalSettings.getDef(Gordic.Wfl.AppSettings.ImplicitneTisknoutPredProtSettingsKey, false);
                            var DotazatSePredTiskem = this.globalSettings.getDef(Gordic.Wfl.AppSettings.DotazatSePredTiskemSettingsKey, false);
                            if (ImplicitneTisknoutPredProt) {
                                if (DotazatSePredTiskem) {
                                    let l_sQuestion = "jres:31937276"; //RC 31937276 : Přejete si vytisknout předávací protokol?
                                    that.dialogs.confirm("jres:31937277", l_sQuestion).on("close", function (ev, retVal) { //RC 31937277 : Dotaz
                                        if (retVal) {
                                            if (retVal === "yes") {
                                                predavaciProtokolAkce.run();
                                            }
                                        }
                                    });
                                } else {
                                    predavaciProtokolAkce.run();
                                }
                            }

                        },
                        sslArchVlozitZaznam: function () {
                            var that = this;
                            var options =
                            {
                                IxpVkladanehoDok: this.SslDetailObsahDilu_Dto.ixp,
                                TypSpis: 0
                            };

                            this.hledatIdentDokSpi(
                                function (retVal) { // 
                                    var idDokumentu = retVal.ixp;
                                    if (idDokumentu) {
                                        var IDSpisVlozitDoSpisu = that.SslDetailObsahDilu_Dto.ixp + "|" + "empty";
                                        //_this.onDoneFunction = this.ZnovuVlozitDoSpisuSubmit;
                                        var opt = {
                                            IxpSpis: that.SslDetailObsahDilu_Dto.ixp,
                                            IxpDok: idDokumentu,
                                            IDSpisVlozitDoSpisu: IDSpisVlozitDoSpisu,
                                            content: that,

                                        };
                                        that.beginOperation();
                                        Gordic.Ssl.Utils.dotazIRPNaVlozeniDokumentuDoSpisu(opt)
                                            .done(function (rv) {
                                                that.refreshGridSslSbernyArch();
                                            })
                                            .always(function () {
                                                that.endOperation();
                                            })
                                            ;

                                    }
                                }
                                , options
                            );
                        },

                        //#region akce

                        zaregistrujHromadneAkce: function () {
                            var opt = {
                                content: this,
                                getSelectedRowsInfoFromList: this.getSelectedRowsInfoFromList, // WflListBase
                                getIxpArrayFromSelection: this.getIxpArrayFromSelection,// WflListBase
                                zpracujResultSGroupResult: this.zpracujResultSGroupResult, //WflListBase
                                getIxpOfActiveRow: this.getIxpOfActiveRow, // WflListBase
                                reload: this.refreshGridSslSbernyArch, // WflListBase // reload
                                isNutnyVyberDenikuCj: componentDto.IsNutnyVyberDenikuCj, //WflListBase
                                // IxsBlp: string, nakonec bráno z kontentu aktualní hodnota
                                // AlternativeIxpArray?: any[], // bráno z kontentu
                                ssl_rem_dokd: componentDto.ssl_rem_dokd, //WflListBase,
                                actNameSufix: "DetailSbernyArch",
                                //getSelectedGDataAkceSslProfil: this.getSelectedGDataAkceSslProfil
                            };

                            // registruju akce na kontent
                            Gordic.Wfl.Globals.ListSupport.HromadneAkceZaregistrujnaContent(opt);

                            this.menuHromadneAKceSbernyarch = Gordic.Wfl.Globals.ListSupport.HromadneAkceVratMenu({ content: content, actNameSufix: "DetailSbernyArch" });
                        },
                        getSelectedRowsInfoFromList: function () {
                            var that = this;
                            var l_asSelectedRows = [];

                            if (Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {

                                var l_aoSelections = this.gridSbernyArch.ggrid("getSelection", true);

                                if (l_aoSelections.length > 0) {
                                    l_aoSelections.forEach(function (entry) {
                                        var rowData = entry.data;
                                        // 11.06.2024 - TFeik
                                        // Datum změny dokumentu je ve vlastnosti dat_zmena_dok a ne v dat_zmena.
                                        l_asSelectedRows.push({
                                            Ixp: rowData.ixp,
                                            //DatZmena: rowData.dat_zmena,
                                            DatZmena: rowData.dat_zmena_dok,
                                            PrizSpis: rowData.priz_spis,
                                            SPrij: rowData.s_prij
                                        });
                                    });
                                }
                            }

                            if (l_asSelectedRows.length == 0) {
                                this.showFlash("jres:31937271", "g-state-error", this.flashPanelTimer); //RC 31937271 : Není vybrán žádný záznam.
                            }

                            return l_asSelectedRows;
                        },
                        getIxpArrayFromSelection: function () {
                            var ixpArray = [];

                            if (Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                                var selection = this.gridSbernyArch.ggrid("getSelection");

                                if (selection.length > 0) {
                                    selection.forEach(function (entry) {
                                        ixpArray.push(entry.ixp);
                                    });
                                }
                            }

                            if (ixpArray.length == 0) {
                                this.showFlash("jres:31937272", "g-state-error", this.flashPanelTimer); //RC 31937272 : Není vybrán žádný záznam.
                            }

                            return ixpArray;
                        },
                        //getSelectedGDataAkceSslProfil: function(){
                        //    if (Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                        //        return this.gridSbernyArch.ggrid("getSelection").map((o) => { return { ixp: o.ixp, SpPlan: o.spis_pl, SpZnak: o.spis_znak, SkartZnak: o.skar_znak, SkartLhuta: o.skar_lhuta, SkartLhutaSpra: o.skar_lhuta_spra, RokSkartace: o.rok_skartace, }; });
                        //    }
                        //},

                        getIxpOfActiveRow: function () {
                            if (!Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                                return;
                            }
                            var activeRow = this.gridSbernyArch.ggrid("activeRow");
                            var ixp = null;
                            if (activeRow) {
                                ixp = activeRow.ixp;
                            }
                            return ixp;
                        },

                        visibleHromadneAkce: function () {
                            var dto = this.getVisibleHromadneAkceDto();

                            var optHideShowHromadneAkce = {
                                content: this,
                                hromadneAkceWflDto: dto,
                                actNameSufix: "DetailSbernyArch"
                            };
                            // určím kterí budou vidět a které ne
                            Gordic.Wfl.Globals.ListSupport.HideShowHromadneAkce(optHideShowHromadneAkce);
                        },

                        getVisibleHromadneAkceDto: function () {
                            var defaultDto = Gordic.Wfl.Globals.ListSupport.GetDefaultGHromadneWflAkceDto();

                            var visible = true;
                            var simpleMode = componentDto.SimpleMode;
                            if (simpleMode) {
                                visible = false;
                            }
                            //tato sekce je specifická pro každá content. vybereš si které chceš a které ne
                            // Defaultně jsou všechny true.

                            defaultDto.PredatPrimo = simpleMode ? true : visible;
                            defaultDto.PridelitHromadne = visible;
                            defaultDto.PrevzitHromadne = visible;
                            defaultDto.PrevzitVRedistribuciHromadne = false;
                            defaultDto.ZrusitPrideleniHromadne = visible;
                            defaultDto.ZmenitPrideleniHromadne = visible;
                            defaultDto.EvidovatRozsirenyProfilHromadne = visible;
                            defaultDto.EvidovatHromadne = visible;
                            defaultDto.OdeslatHromadne = visible;
                            defaultDto.VyjmoutZeSpisuHromadne = visible;
                            defaultDto.VlozitDoSpisuSslHromadne = visible;
                            defaultDto.SouboryNearchivniFormat = visible;
                            defaultDto.SouboryRozpoznaniFormatu = visible;
                            defaultDto.OpravaMetadatSeznamNew = simpleMode ? true : visible;
                            defaultDto.OpravitMetadataPoKontroleSeznam = simpleMode ? true : visible;
                            defaultDto.ZmenitFormuHromadne = visible;
                            defaultDto.ZtvarneniMetadatSpisuHromadne = false;
                            defaultDto.ZmenitDilciDokTerminHromadne = visible;
                            defaultDto.ZmenitDoplnekZnackyHromadne = visible;
                            defaultDto.ZmenitPocetListu = visible;
                            defaultDto.ZmenitPocetPriloh = visible;
                            defaultDto.ZmenitPocetListuPriloh = visible;
                            defaultDto.ZmenitPoznamkuHromadne = visible;
                            defaultDto.ZmenitPristupHromadne = visible;
                            defaultDto.ZmenitSpisZnakHromadne = visible;
                            defaultDto.ZmenitTerminSpisuHromadne = visible;
                            defaultDto.ZmenitTypDokHromadne = visible;
                            defaultDto.ZmenitVecHromadne = visible;
                            defaultDto.ZmenitUmisteniHromadne = visible;
                            defaultDto.ZmenitZpusobDoruceniHromadne = visible;
                            defaultDto.ZmenitSchvalovateleHromadne = visible;
                            defaultDto.ZmenitZpracovateleHromadne = visible;
                            defaultDto.VlozitDokEpkHromadne = visible;
                            defaultDto.VlozitSpisEpkHromadne = false;
                            defaultDto.VyriditAdActaHromadne = simpleMode ? true : visible;
                            defaultDto.VyriditDokumentyHromadne = simpleMode ? true : visible;
                            defaultDto.VyriditSpisyHromadne = false;
                            defaultDto.ZrusitVyrizeniDokumentuHromadne = visible;
                            defaultDto.ZrusitVyrizeniSpisuHromadne = false;
                            defaultDto.ZrusitUzavreniSpisuHromadne = false;
                            defaultDto.PrerusitHromadne = visible;
                            defaultDto.PriorovatHromadne = false;
                            defaultDto.PredatDokumentyExtAgHromadne = visible;
                            defaultDto.PredatSpisyExtAgHromadne = visible;
                            defaultDto.PrevzitExtAgHromadne = visible;
                            defaultDto.PridatKlSlovaHromadne = visible;
                            defaultDto.OdebratKlSlovaHromadne = visible;
                            defaultDto.VlozitDokumentSpisDoBaliku = false;
                            defaultDto.VyjmoutDokumentSpisZBaliku = false;
                            defaultDto.VytvoritBalikAVlozitSeznam = false;
                            defaultDto.PridatSpisyZDokumentuHromadne = false;
                            defaultDto.PridatDokumentyVlozeneDoSpisuHromadne = false;
                            defaultDto.PoznamkovyBlokPridatHromadne = visible;
                            defaultDto.OznacitJakoPrecteneHromadne = visible;
                            defaultDto.OznacitJakoNeprecteneHromadne = visible;
                            defaultDto.TiskListWfl = visible;
                            defaultDto.TiskPevny = visible;
                            defaultDto.TiskSpisObalky = false;
                            defaultDto.TiskSbernyArch = false;
                            defaultDto.Obcerstvit = visible;
                            defaultDto.UzivatelskeSloupceVlastnosti = false;
                            defaultDto.UlozitDoClipboardu = true;
                            // konec specifické sekce

                            return defaultDto;
                        },


                        //#endregion
                        enableSslDetailSbernyArch: function () {
                            var that = this;
                            var l_bActionEnabled = true;
                            if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }

                            this.actions.actSslArchVlozit.update({ enabled: this.SslDetailObsahDilu_Dto.VlozitEnabled });
                            this.actions.actSslArchVyjmout.update({ enabled: false });
                        }
                    },

                    actions: { //může být zadáno jako pole nebo jako objekt

                        actSslArchVlozit: {
                            caption: "jres:31937470", //RC 31937470 : Vložit nový
                            tooltip: "jres:31937471", //RC 31937471 : Otevře hledání nového dokumentu, který bude vložen do spisu.
                            run: function () {
                                $.content(this).sslArchVlozitZaznam();
                            }
                        },
                        actSslArchVyjmout: Gordic.Wfl.PreActions.VyjmoutZeSpisuHromadne({
                            inputData: function () {
                                var def = $.Deferred();
                                var inputData = {
                                    data: content.getSelectedRowsInfoFromList(),
                                    ssl_rem_dokd: componentDto.ssl_rem_dokd,
                                };

                                return def.resolve(inputData).promise();
                            },
                            done: function (retVal) {
                                content.zpracujResultSGroupResult(retVal);
                            },
                            fail: function (retVal) {
                                if (retVal && retVal !== "") {
                                    var rows = content.getSelectedRowsInfoFromList();
                                    var GroupResult = Gordic.Wfl.Globals.createGroupResultForErrorBulkOperation(rows, retVal);

                                    content.zpracujResultSGroupResult({ GroupResult: GroupResult });
                                }
                            },
                            actionParams: {
                                caption: "jres:26255302", //RC 26255302 : Vyjmout
                                tooltip: "jres:26255302", //RC 26255302 : Vyjmout
                                name: "actSslArchVyjmout"
                            }
                        }),

                        actSbernyArchOtevriNovyDetail: {
                            caption: "jres:26257273",  //RC 26257273 : Detail
                            icon: "gi-detail", //gi-list
                            tooltip: "jres:26257272",  //RC 26257272 : Otevře detail do nové záložky
                            run: function (ev, ctx) {
                                var cnt = $.content(this);
                                var gridSbernyArch = cnt.gridSbernyArch;
                                var ixp = cnt.getIxpOfActiveRow();
                                if (ixp) {
                                    if (cnt.promisSbernyArchSpisuEnabledActions) {
                                        cnt.promisSbernyArchSpisuEnabledActions
                                            .always(function (retVal) {
                                                cnt.otevriNovyDetail({
                                                    DetailDto: {
                                                        ixp: ixp
                                                    },
                                                    grid: gridSbernyArch
                                                });
                                            });
                                    }
                                    else {
                                        cnt.otevriNovyDetail({
                                            DetailDto: {
                                                ixp: ixp
                                            },
                                            grid: gridSbernyArch
                                        });
                                    }
                                }
                            }
                        },
                        actOtevriDokumentDoNoveZalozkyVeStejneFazi: Gordic.Wfl.PreActions.OtevriDokumentDoNoveZalozkyVeStejneFazi({
                            inputData: function (x, y) {
                                var optinput = { ixp: content.getIxpOfActiveRow() };
                                return optinput;
                            },
                            done: function (retVal) {
                                //var content = $.content(this);
                            },
                            fail: function () {
                                content.showFlash(
                                    "jres:31937314", //RC 31937314 : Novou záložku se nepodařilo otevřít.
                                    Gordic.Global.Enums.ColorStateClass.error,
                                    undefined,
                                    "actOteveniNoveZalozky"
                                );
                            },
                        }),
                        actOtevreniElObrazuDokumentu: {
                            caption: "jres:26257431", //RC 26257431 : Otevřít hlavní přílohu
                            icon: "gi-eattachment",
                            tooltip: "jres:26257431", //RC 26257431 : Otevřít hlavní přílohu
                            run: function (ev, ctx) {
                                var cnt = $.content(this);
                                var ixp = cnt.getIxpOfActiveRow();
                                if (ixp) {
                                    Gordic.Wfl.AttachmentUtils.ShowMainAttachment(cnt, ixp, false);
                                }
                            }
                        },

                    },

                    tabs: {
                        SslSbernyArch: {
                            tabParams: {
                                title: componentDto.NadpisTabu,

                                group: $.extend(
                                    Gordic.Prefabs.TabGroups.SbernyArch(componentDto.NadpisTabu), {
                                   // badge: content.sbernyArchBadge
                                })
                            },
                           
                            init: function (tab) {
                                //#region definice tab dokumentu
                                var that = $.content(tab);
                                    //.addNumberColumn({
                                
                                //var menuHromadneAKce = Gordic.Wfl.Globals.ListSupport.HromadneAkceVratMenu({ content: content });
                                var menubarSbernyArch = [
                                    // { action: "actSslArchRefresh", favorite: true },
                                    { action: "actSbernyArchOtevriNovyDetail"},
                                    { action: "actOtevriDokumentDoNoveZalozkyVeStejneFazi"},
                                  //  { action: "actOtevreniElObrazuDokumentu"},
                                  //  { action: "actSslArchVlozit", favorite: true },
                                  //  { action: "actSslArchVyjmout", favorite: true },
                                    , { type: "static", caption: "jres:31937273", favorite: true, children: that.menuHromadneAKceSbernyarch }//favoriteHromadneAkceDto: favoriteHromadneAkceDto //RC 31937273 : Hromadné akce
                                ]
                                /*
                                tab.one('gtabopen', (ev, ctx) => { // Vlastův života zachraný zlepšovák
                                    var bar = that.actions.createBar(menubarSbernyArch);
                                    tab.gtab("setMenuBar", bar);
                                })
                                */

                                tab.one('gtabopen', function (ev, ctx) { // Vlastův života zachraný zlepšovák
                                    var bar = that.actions.createBar(menubarSbernyArch);
                                    var opt = {
                                        content: that,
                                        menuParamsArr: bar
                                    };
                                    Gordic.Wfl.Globals.ListSupport.NastavHiddenZbytecnymSeparatorumZMenuParams(opt);

                                    tab.gtab("setMenuBar", bar, that.userSettings.sub("menuBarSbernyArchTab"));
                                });


                                that.gridSbernyArchTab = tab;
                                that.gridSbernyArch = $("<div>").appendTo(tab).gautofit({ resizersOnTab: false });
                                that.createSbernyArchGrid();
                                //#endregion
                                
                            }
                        }
                    },

                   // statusBar: [content.statusSbernyArchStatusVelikostSouboru]

                };

                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\DetailBuilderComponents\GSslDetailSpisuComponent.js 

(function ($) {
	"use strict";
	namespace("Gordic.Ssl.DetailBuilderComponents", {

		SslDetailSpisu: {

			create: function (content, componentDto) {
				var result = {
					flagEvidovat: false,
					onMenuBuild: [
						function (builder, menus) {
							this.enableSslDetailSpisu();
						}
					],
					onBuild: [
						function () {
							
						},
					],
					contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

						prioraceSpisu: function (behaviour) {
							var l_sIxp = componentDto.ixp;
							var that = this;
							if (behaviour != "") {
								var l_oOnVyhledaniFunction = function (retVal) {
									if (retVal && retVal.ixp) {
										var optZjistiZdaJdeOPrioraciVyrizenehoSpisu = { "PriorovatDoIxp": retVal.ixp };
										var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
										srv.call("ZjistiZdaJdeOPrioraciVyrizenehoSpisu", optZjistiZdaJdeOPrioraciVyrizenehoSpisu)
											.done(function (retValZjistiZdaJdeOPrioraciVyrizenehoSpisu) {
												var hlaska = "";
												if (retValZjistiZdaJdeOPrioraciVyrizenehoSpisu.StavBool) {
													hlaska = "jres:31937399"; //RC 31937399 : Všechny vložené dokumenty budou přesunuty do zadaného spisu a ty co jsou nevyřízené, budou vyřízeny. Opravdu přesunout do spisu?
												} else {
													hlaska = "jres:26255231"; //RC 26255231 : Všechny vložené dokumenty budou přesunuty do spisu se zadaným ČJ. Opravdu přesunout?
												}
												that.dialogs.confirm("jres:31937037", hlaska).on("closed", function (ev, retValConfirm) {
													if (retValConfirm === "yes") {
														var opt = { "Ixp": l_sIxp, "PriorovatDoIxp": retVal.ixp };
														var srv2 = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
														srv2.call("PrioraceSpisu", opt)
															.done(function (retVal) {
																if (retVal.StavBool) {
																	that.tryReloadDetail(undefined, {
																		flashMessage: "jres:31937038", //RC 31937038 : Úspěšně přesunuto do spisu 
																		flashMessageClass: "g-state-success",
																	});
																} else {
																	that.detailDocSpisShowFlash("asd", "g-state-error");
																}
															}).always(function () { srv2.close(); });
													}
												});



											}).always(function () { srv.close(); });
                                      
									}
								}
                                that.hledatIdentDokSpi(l_oOnVyhledaniFunction);

							} else {
								that.dialogs.confirm("jres:26255378", "jres:26255232").on("closed", function (ev, retValConfirm) { //RC 26255232 : Opravdu chcete Zrušit přesun obsahu spisu?
									//RC 26255232 : Opravdu chcete spis odpriorovat?
									if (retValConfirm === "yes") {
										var opt = { "Ixp": l_sIxp, "PriorovatDoIxp": "" };
										var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
										srv.call("PrioraceSpisu", opt)
											.done(function (retVal) {
												if (retVal.StavBool) {
													that.tryReloadDetail(undefined, {
														flashMessage: "jres:31937071", //RC 31937071 : Úspěšně odpriorováno
														flashMessageClass: "g-state-success",
													});
												}
											}).always(function () { srv.close(); });
									}

								});
							}
						},

						spr_ZalozitRizeni: function (ixpZdroj) {
							console.log("TODO"); // nevím zda furt potřeba 
							//if (ixpZdroj != "") {
							//    var oReturn = ShowModalWindowEx("~/Gin/Spr/Detail/SeznamDruhuRizeniProFunkci.aspx?TypSprSpisu=NeniSpravniSpis&TestIxpSpis=Ano&IxpSpis=" + ixpZdroj, "jres:26256469", 562, 400, false, true, true); //RC 26256469 : Výběr druhu správního postupu
							//    if (oReturn != null) {
							//        if (oReturn.values[0] == "EXIST")
							//            window.alert("jres:Gordic.Ssl.WebClient:26256468") //RC 26256468 : Zadaný spis je již evidován.
							//        else {
							//            var dialogResult1 = MessageBox("jres:Gordic.Ssl.WebClient:26256470" + " :\n\n " + oReturn.values[2] + "\n\n" + "jres:Gordic.Ssl.WebClient:26256471", GetGlobalManager().GetValue('GinFaze'), MessageBoxButtons.YesNo, MessageBoxIcon.Question); //RC 26256471 : Přejete si pokračovat?

							//            if (dialogResult1 == DialogResult.Yes) {
							//                var url = "~/Gin/Spr/Detail/DetailRizeni.aspx?ixp=" + ixpZdroj + "&Akce=NoveRizeni" + "&Zdroj=Spis" + "&TypSr=" + oReturn.values[1] + "&DruhRizeni=" + oReturn.values[0];
							//                var oReturn = ShowModalWindowEx(url, "DetailRizeni", 870, 550, false, true, true);
							//            }
							//        }
							//    }
							//}
						},
						SSLUlozitSpis: function () {
							this.ulozitSpis();

						},

						zruseniVyrizeniSpisu: function () {
							var that = this;
							var l_sIxp = componentDto.ixp;

							var opt = { "Ixp": l_sIxp };
							var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
							srv.call("ZruseniVyrizeniSpisu", opt)
								.done(function (retVal) {
									if (retVal.StavBool) {
										that.tryReloadDetail(undefined, {
											flashMessage: "jres:31937072", //RC 31937072 : Úspěšně zrušeno vyřízení
											flashMessageClass: "g-state-success",
										});
									}
								}).always(function () { srv.close(); });
						},

						zruseniUzavreniSpisu: function () {
							var that = this;

							var fceZruseniUzavreniSpisu = function (ixsVsk) {
								var l_sIxp = componentDto.ixp;
								var opt = {
									Ixp: l_sIxp,
									IxsVsk: ixsVsk != null ? ixsVsk : undefined
								};
								var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
								srv.call("ZruseniUzavreniSpisu", opt)
									.done(function (retVal) {
										if (retVal.StavBool) {
											that.tryReloadDetail(undefined, {
												flashMessage: "jres:31937073", //RC 31937073 : Úspěšně zrušeno uzavření
												flashMessageClass: "g-state-success",
											});
										}
									}).always(function () { srv.close(); });
							}

							if(componentDto.IxsVsk != null && (componentDto.IxpDil == null || componentDto.IxpDil == "")) { // ref T40380, T40971 , jen pokud není v dílu (spis totiž buď zůstane v původním otevřeném dílu nebo se automaticky přesune do nového neuzavřeného)

								var dataVsk = Gordic.Isl.VecnaSkupina.list({
									filters: { ixs_vsk: componentDto.IxsVsk },
									fragments: ['FRAGMENT_GINSVSK_BASE']
								}).getData({}).then(function (data) {

									if (data != null && data.length == 1) {
										var aktivita = data[0].aktivita;
										var ixsVskNext = data[0].ixs_vsk_next;

										if (aktivita !== 100) { //Pokud není VSK aktivní, nabídnu uživateli výběr nové s přednastavením
											Gordic.Ssl.Dialogs.GZmenaSpisovehoZnakuDlg(that, { IxsVskProPredplneni: ixsVskNext != null ? ixsVskNext : undefined }, Gordic.Global.Enums.ModOtevreni.showModalWindow)
												.then(function (retVal) {
													if (retVal) {
														fceZruseniUzavreniSpisu(retVal.IxsVskSelected);
													}
												});
										} else {
											fceZruseniUzavreniSpisu();
										}
									}
								});

							} else {
								fceZruseniUzavreniSpisu();
							}

						},

						zmenaLhuty: function () {
							var l_sIxp = componentDto.ixp;
							var that = this;
							var options = {
								Ixp: l_sIxp
							};
							var $div = Gordic.Ssl.Dialogs.ZmenaTerminuSpisuDlg(this, options);

							$div.on("closed", function (ev, retVal) {
								if (retVal) {
									that.tryReloadDetail();
								}
							});
						   
						},
						sslSpisVyridit: function () {
							this.vyridit('Vyridit', 'Spis'); // sslDetailComponent
						},

						sslSpisUzavrit: function () {

							this.vyridit('Vyridit', 'Spis'); // sslDetailComponent
						},

						sslVyjmoutSpisZeSoucasti: function () {
							var that = this;

							Gordic.Ssl.Dialogs.GZmenaSpisovehoZnakuDlg(this, {}, Gordic.Global.Enums.ModOtevreni.showModalWindow)
								.then(function (retVal) {
									if(retVal) {
										var opt = {
											IxpNadrazeneEntity: componentDto.IxpDil,// Pozor!!! U spisu musí být Ixp dílu (ixp_dil nebo ixp_nad ???). Na jiných entitách pak IxpSpisWfl
											IxpVyjimaneEntity: componentDto.ixp,
											IxsVskSpisu: retVal.IxsVskSelected,
										};

										var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
										srv.call("VyjmoutZNadrizeneEntity", opt)
											.done(function (retVal) {
												if (retVal.StavBool) {
													that.tryReloadDetail(undefined, {
														flashMessage: "jres:31937191", //RC 31937191 : Úspěšně vyjmuto
														flashMessageClass: "g-state-success",
													});
												}
											}).always(function () { srv.close(); });
									}

								});
						},

						sslVlozitDoSoucasti: function () {
							var that = this;
							
							if (componentDto.wfl_typspisy != 0) {
								var typSpis = 3;
								if (componentDto.TypSpis === 3) {
									typSpis = 2; //new GInt16(2);
								}   // ALF 6.8.2019 pro součást by se měl nabídnout typový spisy
								//ok = l_oHledatDokumentTab.VyhledejPosledniNadrizenouEntitu(typSpis, DocInfo.Ixp);

								Gordic.Wfl.Dialogs.GHledatIdentDokSpisDlg(this, { IxpVkladanehoDok: componentDto.IxpSpisWfl, TypSpis: typSpis }) // dříve IxpSpis
									.then(function (retVal) {
										if (retVal  && retVal.ixp) {
											var opt = {
												Ixp: componentDto.IxpSpisWfl, // dříve IxpSpis
												IxpDo: retVal.ixp
											};
											var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
											srv.call("VlozitDoSoucasti", opt)
												.done(function (retVal) {
													if (retVal.StavBool) {
														that.tryReloadDetail(undefined, {
															flashMessage: "jres:31937192", //RC 31937192 : Úspěšně vložení
															flashMessageClass: "g-state-success",
														});
													}
												}).always(function () { srv.close(); });
										}
									});
							}
						},

						sslOdstranitPosledniDil: function () {
							var that = this;
							var opt = {
								Ixp: componentDto.ixp
							};
							var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
							srv.call("OdstranitPosledniDil", opt)
								.done(function (retVal) {
									if (retVal.StavBool) {
										that.tryReloadDetail(undefined, {
											flashMessage: "jres:31937193", //RC 31937193 : Úspěšně odstraněno
											flashMessageClass: "g-state-success",
										});
									}
								}).always(function () { srv.close(); });
						},

						sslExportovatDoSlozky: function () {
							var options = {
								Ixp: componentDto.ixp
							};
							Gordic.Wfl.Dialogs.GExportElDokumentuDlg(this, options)
								.done(function (retVal, cnt) {
									;
							});
						},

						pozastaveniSkartacniOperace: function () {
							var that = this;
							var l_sIxp = componentDto.ixp;

							var l_oParamsJSON = { Ixp: l_sIxp };

							Gordic.Wfl.Dialogs.PozastSkartacniOperaceDlg({ parentContent: this, opt: l_oParamsJSON, ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow })
								.done(function (retVal) {
									if (retVal && retVal.zmena) {
										that.tryReloadDetail();
									}
								});

						},

						
						enableSslDetailSpisu: function () {

							var l_bActionEnabled = true;
							if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
								l_bActionEnabled = false;
							}
							//#region Entita
							this.actions.actZobrazitTypovySpis.update({ enabled: (l_bActionEnabled && componentDto.LzeZobrazitTypovySpis) });
							this.actions.actZobrazitSoucast.update({ enabled: (l_bActionEnabled && componentDto.LzeZobrazitSoucast) });
							this.actions.actZobrazitDil.update({ enabled: (l_bActionEnabled && componentDto.LzeZobrazitDil) });
							this.actions.actExportovatDoSlozky.update({ enabled: (l_bActionEnabled && componentDto.LzeExportovatSpis) });

							
							//#endregion

							//#region Činnosti
							this.actions.actPriorovat.update({ enabled: (l_bActionEnabled && (componentDto.LzePriorovat || componentDto.LzeZrusitPrioraci)) });
							this.actions.actVytvoritSpisSPR.update({ enabled: (l_bActionEnabled) });
							this.actions.actVytvoritSpisSPR.update({ visible: ("GWASPR05GWARLS05".indexOf(componentDto.Faze) != -1) });
							this.actions.actVytvoritSpisSPR.update({ visible: false }); //14.04.2022 dsebesta  Schováno na žádost Jaroslava Šíra 

							this.actions.actVyriditSpis.update({ enabled: (l_bActionEnabled && componentDto.LzeVyriditAUzavrit) });
							this.actions.actUzavrit.update({ enabled: (l_bActionEnabled && !componentDto.LzeVyriditAUzavrit && componentDto.LzeUzavrit) });
							this.actions.actSSLUlozitSpis.update({ enabled: (l_bActionEnabled && componentDto.LzeZmenitUlozeni) });

							var lzeZrusitVyrizeni = (l_bActionEnabled && componentDto.LzeZrusitVyrizeni);
							if (componentDto.TypSpis > 1){ // součást typový spis díl
								lzeZrusitVyrizeni = (l_bActionEnabled && componentDto.LzeZrusitUzavreni);
							}
							this.actions.actZrusitVyrizeni.update({ enabled: lzeZrusitVyrizeni });

							var lzeZrusitUzavreni = (l_bActionEnabled && componentDto.LzeZrusitUzavreni);
							if (componentDto.TypSpis > 1) { // součást typový spis díl
								lzeZrusitUzavreni = false;
							}
							this.actions.actZrusitUzavreni.update({ enabled: lzeZrusitUzavreni });

							//this.actions.actVyjmoutSoucastZeSoucasti.update({ enabled: (l_bActionEnabled && componentDto.LzeVyjmoutZTypovehoSpisu) });
							this.actions.actVyjmoutSpisZeSoucasti.update({ enabled: (l_bActionEnabled && componentDto.LzeSpisVyjmoutZeSoucasti) });
							this.actions.actVlozitDoSoucasti.update({ enabled: (l_bActionEnabled && componentDto.LzeVlozitDoSoucasti) });
							this.actions.actOdstranitPosledniDil.update({ enabled: (l_bActionEnabled && componentDto.LzeOdstranitPosledniDil) });

							var wflDBParams = Gordic.Wfl.WebClient.GetGWflDBParams();

							this.actions.actSpisovaObalkaTisk.update({ enabled: (l_bActionEnabled && ((wflDBParams && wflDBParams.gin_rad_konao === 1) ? true : false) ) });
							this.actions.actSbernyArchTisk.update({ enabled: (l_bActionEnabled && ((wflDBParams && wflDBParams.gin_rad_konao === 1) ? true : false)) });

							this.actions.actPozastaveniSkartacniOperace.update({ enabled: (l_bActionEnabled && componentDto.LzeEditovatPozastaveniSkartacniOperace) });

							this.actions.actOdeslanePripominky.update({ enabled: l_bActionEnabled && componentDto.IsEKlepPripominka });
							this.actions.actOdeslanePripominky.update({ visible: l_bActionEnabled && componentDto.IsEKlepPripominka });
							this.actions.actVytvorenePripominkoveRizeni.update({ enabled: l_bActionEnabled && componentDto.IsEKlepPripominka });
							this.actions.actVytvorenePripominkoveRizeni.update({ visible: l_bActionEnabled && componentDto.IsEKlepPripominka });
						
							//#endregion

							//#region Vazby
							//#endregion

							//#region Tisk
							//#endregion

							//#region Ostatni
							//#endregion

							//m_oVec.ReadOnly = !EditMode;
							//m_oSpZnExt.ReadOnly = !EditMode;
							//if (EditMode) {
							//    // editace doplnku spzn
							//    int l_nSslEdiSzecis = UserProcess.Configuration.GetDatabaseParameter("ssl_edi_szecis", 0);

							//    if (l_nSslEdiSzecis == 1) {
							//        m_oSpZnExt.Visible = false;
							//        m_oSpZnExtFavourite.Visible = true;
							//    }
							//}


						},

						
					},

					actions: { //může být zadáno jako pole nebo jako objekt
						//#region Dokument
						actZobrazitTypovySpis: {
							caption: "jres:31937195", //RC 31937195 : Zobrazit typový spis
							visible:false,
							run: function () {
								$.content(this).otevriNovyDetail({ DetailDto: { ixp: componentDto.IxpTop } }); //DocInfo.IxpTop
							}
						},
						actZobrazitSoucast: {
							caption: "jres:31937196", //RC 31937196 : Zobrazit součást
							visible: false,
							run: function () {
								$.content(this).otevriNovyDetail({ DetailDto: { ixp: componentDto.IxpSpisWfl } }); // dříve IxpSpis
							}
						},
						actZobrazitDil: {
							caption: "jres:31937197", //RC 31937197 : Zobrazit díl
							visible: false,
							run: function () {
								$.content(this).otevriNovyDetail({ DetailDto: { ixp: componentDto.IxpSpisWfl } }); // dříve IxpSpis
							}
						},
						actExportovatDoSlozky: {
							caption: "jres:31937203", //RC 31937203 : Exportovat do složky
							//icon: "gi-pencil",
							//visible:false,
							run: function () {
								$.content(this).sslExportovatDoSlozky();
							}
						},
						//#endregion

						//#region Činnosti
						actPriorovat: {
                            caption: componentDto.LzeZrusitPrioraci ? "jres:31937074" :"jres:31937037", //RC 31937037 : Přesunout do spisu
                            icon: "gi-folder |gi-folder g-state-text gi-bgw |fa-level-down g-state-text g-state-info gi-stack-pos--rt gi-bgw",
							run: function () {
								if (componentDto.LzeZrusitPrioraci) {
									$.content(this).prioraceSpisu('');
								} else {
									$.content(this).prioraceSpisu('Priorovat');
								}
							}
						},
						actVytvoritSpisSPR: {
							caption: "jres:26256467", //RC 26256467 : Vytvořit spis SPR
							icon: "gi-spis_skladani|fa-usd g-state-text g-state-info gi-stack-fw gi-stack-pos--rt gi-bgw",
							run: function () {
								$.content(this).spr_ZalozitRizeni(componentDto.ixp);
							}
						},
						actVyriditSpis: {
							caption: "jres:26255379", //RC 26255379 : Vyřídit / Uzavřít
                            icon: "gi-vyrizeno",
							run: function () {
								$.content(this).sslSpisVyridit();
							}
						},
						actUzavrit: {
							caption: "jres:26255380", //RC 26255380 : Uzavřít
                            icon: "gi-vyrizenouza",
							run: function () {
								$.content(this).sslSpisUzavrit();
							}
						},
						actSSLUlozitSpis: {
							caption: "jres:26255270", //RC 26255270 : Uložit
                            icon: "fa-archive",
							run: function () {
								$.content(this).SSLUlozitSpis();
							}
						},
						actZrusitVyrizeni: {
							caption: "jres:26255330", //RC 26255330 : Zrušit vyřízení
                            icon: ["gi-vyrizeno", "fa-remove g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"],
							run: function () {
								$.content(this).zruseniVyrizeniSpisu();
							}
						},
						actZrusitUzavreni: {
							caption: "jres:26255382", //RC 26255382 : Zrušit uzavření
                            icon: ["gi-vyrizenouza", "fa-remove g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"],
							run: function () {
								$.content(this).zruseniUzavreniSpisu();
							}
						},
						actVyjmoutSpisZeSoucasti: {
							caption: "jres:26257331", //RC 26257331 : Vyjmout ze součásti
							icon: "gi-vyjmout_do_spisu",
							visible: componentDto.wfl_typspisy != 0,
							run: function () {
								$.content(this).sslVyjmoutSpisZeSoucasti();
							}
						},

						actVlozitDoSoucasti: {
							caption: "jres:26257281", //RC 26257281 : Vložit do součásti
							icon: "gi-vlozit_do_spisu",
							visible: componentDto.wfl_typspisy != 0,
							run: function () {
								$.content(this).sslVlozitDoSoucasti();
							}
						},

						actOdstranitPosledniDil: {
							caption: "jres:31937194", //RC 31937194 : Odstranit poslední díl
							//icon: "fa-archive",
							visible: false,
							run: function () {
								$.content(this).sslOdstranitPosledniDil();
							}
						},

						actPozastaveniSkartacniOperace: {
							caption: "jres:31937408", //RC 31937408 : Pozastavit skartační op.
							tooltip: "jres:31937409", //RC 31937409 : Pozastavit skartační operaci
							icon: ["gi-skartace", "fa-pause g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw"],
							run: function () {
								$.content(this).pozastaveniSkartacniOperace();
							}
						},

						
						//#endregion

						//#region Vazby
						//#endregion

						//#region Tisk
						actSpisovaObalkaTisk: GAction.createPrintAction({
							name: "actSpisovaObalkaTisk",
							tema: "usu_ptm_spisdet",
							icon: "gi-print|gi-mail gi-bgw gi-stack-pos--rb g-state-text g-state-info",
							caption: "jres:26255383", //RC 26255383 : Spisová obálka
							reportStarting: function (rep) {
								rep.params.IXP = componentDto.ixp;
								rep.params.X0000 = componentDto.ixp;
								rep.params.Preselect = false;
							},
							reportFinished: function (ev, ri) {
								var cnt = $.content(this);
								if (ri) { 
									const zpUloz = parseInt(ri.customData["zpUloz"] != null ? ri.customData["zpUloz"] : "0");
									Gordic.Ginis.DbModel.GGinczulEnumValues()
										.then(function (vals) {
											const zpUlozDto = vals.find(function (v) {
												return v.value === zpUloz
											});
											var textFlash = "jres:31937278."; //RC 31937278 : Spisová obálka byla vygenerována
											if (zpUlozDto && zpUlozDto.meta.zpus_uloz_txt) {
												var zpusob = zpUlozDto.meta.zpus_uloz_txt;
												textFlash = textFlash + " " + String.Format("jres:31937395", zpusob); //RC 31937395 : Způsob uložení: {0}
												cnt.tryReloadDetail(undefined, {
													flashMessage: textFlash,
													flashMessageClass: "g-state-success",
												});
											} else {
												cnt.tryReloadDetail(undefined, {
													flashMessage: textFlash,
													flashMessageClass: "g-state-success",
												});
											}
										});
								}
							}
						}),
						actSbernyArchTisk: GAction.createPrintAction({
							name: "actSbernyArchTisk",
							tema: "usu_ptm_spisarc",
							icon: "gi-print|gi-spis_bold gi-bgw gi-stack-pos--rb g-state-text g-state-info",
							caption: "jres:26255384", //RC 26255384 : Sběrný arch (GRR)
							reportStarting: function (rep) {
								rep.params.X0000 = componentDto.ixp;
								rep.params.Preselect = false;
							},
						}),

						//#endregion

						//#region Ostatni
						actPriorovanoKam: {
							caption: "jres:26255257", //RC 26255257 : Spis
							//icon: "gi-pencil",
							run: function () {
								$.content(this).DetailSpisuPrirovanoKam();
							}
						},

						actOdeslanePripominky: new GAction(Gordic.Ssl.PreActions.OtevriEklepPripominkyPripominkovehoRizeni({
							actionParams: {
								name: "actOdeslanePripominky",
							},
							inputData: function (action, event, ctx, param) {
								var def = $.Deferred();
								def.resolve(
									{
										parentContent: content,
										requestDto: {
											StartFilter: {
												PripominkoveRizeniZpracovane_ixp_spis: componentDto.ixp
												//pid_eklep
											}
										}
									});
								return def.promise();

							},
							done: function (retVal) {
								;
							},
						})),

						actVytvorenePripominkoveRizeni: new GAction(Gordic.Ssl.PreActions.OtevriEklepPripominkovaRizeni({
							actionParams: {
								name: "actVytvorenePripominkoveRizeni",
							},
							inputData: function (action, event, ctx, param) {
								var def = $.Deferred();

								def.resolve({
									parentContent: content,
									opt: {
										StartFilter: {
											ixp_spis: componentDto.ixp
										}
									}
								});

								return def.promise();
							}
						})),

						//#endregion

						//#region comandbar
						//#endregion
					},

					menuBar: [

						//#region Dokument
						Gordic.Wfl.Globals.MenuDefinitions.detailDokument(),
						//{ id: "menuDokumentSeparator1", type: "separator", parent: "menuDokument", after: "menuFindRecord" },
						{ action: "actZobrazitTypovySpis", parent: "menuDokument" }, //after: "menuDokumentSeparator1"
						{ action: "actZobrazitSoucast", parent: "menuDokument" },
						{ action: "actZobrazitDil", parent: "menuDokument" },
						{ action: "actExportovatDoSlozky", parent: "menuDokument" },
						
						//#endregion

						//#region Činnosti
						Gordic.Wfl.Globals.MenuDefinitions.detailCinnosti(),
						{ action: "actVyriditSpis", parent: "menuWflCinnosti", before: "menuCinnostiSeparator1", favorite: true }, //menuCinnostiSeparator1
						{ action: "actUzavrit", parent: "menuWflCinnosti", after: "menuVyriditSpis" },
						{ action: "actSSLUlozitSpis", parent: "menuWflCinnosti", after: "menuUzavrit" },
						{ id: "menuCinnostiSeparator6", type: "separator", parent: "menuWflCinnosti", after: "menuSSLUlozitSpis" },
						{ action: "actZrusitVyrizeni", parent: "menuWflCinnosti", after: "menuCinnostiSeparator6" },
						{ action: "actZrusitUzavreni", parent: "menuWflCinnosti", after: "menuZrusitVyrizeni" },
						{ id: "menuCinnostiSeparator7", type: "separator", parent: "menuWflCinnosti", after: "menuZrusitUzavreni" },
						{ action: "actPriorovat", parent: "menuWflCinnosti", after: "menuCinnostiSeparator7" },
						//{ id: "menuCinnostiSeparator99", type: "separator", parent: "menuWflCinnosti", after: "menuPriorovat" },
						{ action: "actVyjmoutSpisZeSoucasti", parent: "menuWflCinnosti", favorite: true },
						{ action: "actVlozitDoSoucasti", parent: "menuWflCinnosti", favorite: true },
						{ action: "actOdstranitPosledniDil", parent: "menuWflCinnosti" },
						{ action: "actPozastaveniSkartacniOperace", parent: "menuWflCinnosti", before: "menuZmenaSpouUdalosti" }, //actZmenaSpouUdalosti menuZmenaSpouUdalosti
						
						//GWASPR01 
						{ action: "actVytvoritSpisSPR", parent: "menuWflCinnosti", before: "menuCinnostiSeparator1" }, //menuCinnostiSeparator1
						

						//#endregion

						//#region Vazby
						
						//#endregion

						//#region Tisk
						$.extend({}, Gordic.Wfl.Globals.MenuDefinitions.detailTisk(), { favorite: true }),
						{ action: "actSpisovaObalkaTisk", parent: "menuTisk", after: "menuTiskSablonyWord" },
						{ action: "actSbernyArchTisk", parent: "menuTisk", after: "menuSpisovaObalkaTisk" },

						//#endregion
						
					],

				};
				if (componentDto.IsEKlepPripominka) {
					result.menuBar.push($.extend({}, Gordic.Wfl.Globals.MenuDefinitions.detailEKlep()));
					result.menuBar.push({ action: "actOdeslanePripominky", parent: "menuEKlep" });
					//result.menuBar.push({ action: "actVytvorenePripominkoveRizeni", parent: "menuEKlep" });

				}

				return result;
			}

		}


	}, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\DetailBuilderComponents\GSslSidePanels.js 

(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslSidePanels: {

            create: function (detailContent, componentDto) {
                /// <summary> Creates a definition of button and openAction for wflHistorie.</summary>
                /// <remarks> Vmaca, 02.03.2017. </remarks>
                /// <param name="data"> The data with following properties. 
                ///                     TargetContent[string] - namespace of target AjaxContent/AjaxContentControl. 
                ///                     TargetContentDto[object] - dto with data required by TargetContent, 
                ///                     Title[string] - name of button and dialogWindow. </param>
                /// <returns> Object with actionDefinitions and statusBarDefinitions ready for insert into content. </returns>
                //var badge = new GObservableObject({ value: "?" });
                var result = {};
                    
                result.onBuild = [function () {

                    this.vytvorKPIEpkHistorieSchvalovani();
                }];

                //#region parovy Dokument
                if (componentDto.IsParovyDokument) {
                    
                    var settingsforPanel = {};
                    if (componentDto.VyrizDok !== componentDto.ixp) {
                        settingsforPanel.paroveIxp = componentDto.VyrizDok;
                        settingsforPanel.tittle = "jres:31937101" //RC 31937101 : Párový dokument vyřizující
                    } else {
                        settingsforPanel.paroveIxp = componentDto.InicDok;
                        settingsforPanel.tittle = "jres:31937102" //RC 31937102 : Párový dokument iniciační
                    }
                    result.sidePanels = result.sidePanels ? result.sidePanels : {};
                    result.sidePanels.panelParovyDokument = {
                            side: "right",
                            leaf: { caption: "jres:31937052" }, //, badge: badge //RC 31937052 : Párový dokument
                            caption: settingsforPanel.tittle,
                            customClass: "gssl-parovy-dokument",
                            minWidth: 300,
                            icon: "gi-copy_plus",
                            width: 400,
                            open: function () {
                                if (!detailContent.parovyDokumentPreviewDiv) { 
                                    detailContent.parovyDokumentPreviewDiv = $(this);

                                    var actNovyDetail = new GAction({
                                        name: "actOpenDetailFromParovyDokument", caption: "jres:26255831", run: function () { //RC 26255831 : Detail
                                            detailContent.otevriNovyDetail(
                                                {
                                                    DetailDto: { ixp: settingsforPanel.paroveIxp }
                                                }
                                            );
                                        },
                                    });

                                    detailContent.parovyDokumentPreviewDiv.gsbpanel("menuBar", [
                                        { icon: "gi-detail", action: actNovyDetail }
                                    ])

                                    detailContent.parovyDokumentPreviewDiv.gpreview(
                                        {
                                            tabs: [
                                                {
                                                    caption: "jres:31937103", //RC 31937103 : Souhrn
                                                    customLoad: function (loadParams) {
                                                        if (Gordic.Previews != null && Gordic.Previews.render != null)

                                                            Gordic.Previews.render("wfl:Dokument", this.customDiv, { ixp: settingsforPanel.paroveIxp }); 
                                                    }//"Gordic.Wfl.WebClient.GWflDetailPreview"

                                                }, {

                                                    caption: "jres:31937104", //RC 31937104 : Náhled
                                                    customLoad: function () { //subtask was clicked
                                                        if (this.customDiv.hasClass("gfilepreview")) {
                                                            this.customDiv.gwflfilepreview("displayElDoc", settingsforPanel.paroveIxp);
                                                        }
                                                    },

                                                    content: {
                                                        onPrepareContent: function () {
                                                            if (!this.element.hasClass("gfilepreview")) {
                                                                this.element.gwflfilepreview();
                                                            }
                                                        }
                                                    }
                                                }]
                                        });

                                    detailContent.sslParovyDokLoadPreview(settingsforPanel.paroveIxp);
                                }
                            }
                    };
                }
                //#endregion

                //#region Spis
                
                if (!componentDto.IsSpis && componentDto.IxpSpis && (componentDto.IxpSpis != componentDto.ixp)) { // pokud jde o dokument ve spisu

                    result.sidePanels = result.sidePanels ? result.sidePanels : {};
                    result.sidePanels.panelSpis = {
                        side: "right",
                        icon: "gi-folder",
                        leaf: { caption: "jres:26255257" }, //, badge: badge //RC 26255257 : Spis
                        caption: "jres:26255257", //RC 26255257 : Spis
                        customClass: "gssl-spis",
                        minWidth: 300,
                        width: 400,
                        open: function () {
                            if (detailContent.spisPreviewDiv == null || !detailContent.spisPreviewDiv.hasClass("gcontent")) {
                                detailContent.spisPreviewDiv = $(this);

                                var actNovyDetail = new GAction({
                                    name: "actOpenDetailFromSpisPreview", caption: "jres:26255831", run: function () { //RC 26255831 : Detail
                                        detailContent.otevriNovyDetail(
                                            {
                                                DetailDto: { ixp: componentDto.IxpSpis }
                                            }
                                        );
                                    },
                                });


                              

                                detailContent.spisPreviewDiv.gsbpanel("menuBar", [
                                    { icon: "gi-detail", action: actNovyDetail }
                                ]);

                                var tabsDoGpreview = [];
                                tabsDoGpreview.push({
                                    caption: "jres:31937103", //RC 31937103 : Souhrn
                                    customLoad: function (loadParams) {
                                        if (Gordic.Previews != null && Gordic.Previews.render != null)
                                            Gordic.Previews.render("ssl:DetailDokumentu", this.customDiv, { detailContent: detailContent, ixp: componentDto.IxpSpis });
                                    }//"Gordic.Wfl.WebClient.GWflDetailPreview"

                                });

                                //if (true) {
                                   // UserProcess.Configuration.GetDatabaseParameter("ssl_zodetelo", 0) == 1;
                                    tabsDoGpreview.push({

                                        caption: "jres:31937104", //RC 31937104 : Náhled
                                        customLoad: function () { //subtask was clicked
                                            if (this.customDiv.hasClass("gfilepreview")) {
                                                this.customDiv.gwflfilepreview("displayElDoc", componentDto.IxpSpis);
                                            }
                                        }

                                        ,

                                        content: {
                                            onPrepareContent: function () {
                                                if (!this.element.hasClass("gfilepreview")) {
                                                    this.element.gwflfilepreview();
                                                }
                                            }
                                        }
                                    });
                              // }



                                detailContent.spisPreviewDiv.gpreview(
                                    {
                                        tabs: tabsDoGpreview
                                    });

                                detailContent.sslSpisPreviewLoadPreview(componentDto.IxpSpis);
                            }
                        }
                    };
                   
                } else //if (detailContent.spisPreviewDiv && componentDto.IxpSpis === componentDto.ixp)  // v momentě kdy tam zustal vyset panel po reloadu
                {
                    if (!detailContent.closed) { 
                        var panelSeSpisem = detailContent.element.gsidebar("getPanel", "panelSpis");
                        if (panelSeSpisem && panelSeSpisem.element && panelSeSpisem.length > 0) {
                            detailContent.element.gsidebar("removePanel", "panelSpis"); 
                        }
                    }
                    
                }

                //#region EPK kpi
                //if (componentDto.KPIEpkHistorieSchvalovaniVisible) {  //componentDto.SerCislo && componentDto.SerCislo >0
                    /*
                    result.sidePanels = result.sidePanels ? result.sidePanels : {};
                    result.sidePanels.panelEpk = {
                        side: "right",
                        leaf: { caption: "jres:26256378" }, //, badge: badge //RC 26256378 : Schvalovací proces
                        caption: "jres:26256378", //RC 26256378 : Schvalovací proces
                        customClass: "gssl-epk",
                        minWidth: 300,
                        width: 400,
                        icon: "gi-epk",
                        open: function () {
                            var this_ = $(this);
                            if (this_.hasClass("gcontent") === false) {
                                this_.gcontent("Gordic.Wfl.WebClient.GHistorieSchvalovani");
                            }

                            this_.gcontent("load", {
                                ID: "IDEpkHistorieSchvalovani",
                                taskId: "EpkHistorieSchvalovaniDetail",
                                Ixp: componentDto.ixp,
                            });

                        }
                    };
                    */
                    result.kpis = result.kpis ? result.kpis : [];
                    result.kpis.push(
                        new GObservableObject({
                            name: "kpiIsEpkPanel",
                            icon: "gi-epk g-state-text g-state-warning", // gi-epk gi-info
                            //meaning: "warning",
                            visible: false,
                            primaryText: "jres:26256378", //RC 26256378 : Schvalovací proces
                            //secondaryText: "jres:31937151", //RC 31937151 : Ve schvalovacím procesu
                            action: new GAction({
                                name: "actKpiIsEpkPanel", caption: "", run: function () { //RC 29250138 : Vybrat
                                    var panelSEPK = detailContent.element.gsidebar("getPanel", "panelEpk");
                                    if (panelSEPK && panelSEPK.length > 0) {
                                        panelSEPK.gsbpanel("show");
                                    }
                                }
                            })
                           
                        })
                    );

                //} else //if (detailContent.spisPreviewDiv && componentDto.IxpSpis === componentDto.ixp)  // v momentě kdy tam zustal vyset panel po reloadu
                //{
                if (!detailContent.closed) {
                    var panelSEPK = detailContent.element.gsidebar("getPanel", "panelEpk");
                    if (panelSEPK && panelSEPK.element && panelSEPK.length > 0) {
                        panelSEPK.element.gsidebar("removePanel", "panelEpk");
                    }
                }
                //}
               
                //#region Text Podani
                if (componentDto.ISTextPodani) {

                    result.sidePanels = result.sidePanels ? result.sidePanels : {};
                    result.sidePanels.panelTextPodani = {
                        side: "right",
                        leaf: {
                            caption: "jres:31937249", //RC 31937249 : El. podání
                        },
                        id: "panelTextElPodani",
                        icon:"gi-podatelna",
                        customClass: "gssl-text-podani",
                        open: function () {
                            if (componentDto.IxbPodani != null) {

                                if (detailContent.parovyDokumentPreviewDiv == null) {

                                    detailContent.parovyDokumentPreviewDiv = $(this);
                                    detailContent.parovyDokumentPreviewDiv.html("jres:31937250"); //RC 31937250 : Probíhá načítání dat...
                                    Gordic.Isl.EmlBodyService.read({
                                        IxBEml: componentDto.IxbPodani
                                    }).getData()
                                        .then(function (retDto) {
                                            if (retDto && retDto.ErrorMessage != null && retDto.ErrorMessage !== "") {
                                                detailContent.parovyDokumentPreviewDiv.html(retDto.ErrorMessage);
                                            }
                                            else if (retDto && retDto.BodyText != null && retDto.BodyText !== "") {
                                                detailContent.parovyDokumentPreviewDiv.html(retDto.BodyText);
                                            }
                                            else if (retDto && retDto.BodyHtml != null && retDto.BodyHtml !== "") {
                                                detailContent.parovyDokumentPreviewDiv.html(retDto.BodyHtml);
                                            }

                                        });
                                }
                                else if ($(this).html() === "") { // po refreshi tam zustane div vyset
                                    $(this).html(detailContent.parovyDokumentPreviewDiv.html());
                                }
                            }
                        }
                    };
                }
                //#endregion

                //#region NadrizeneEntity
                var k203Params = Gordic.Gin.WebClient.GK203Handler.GetK203ParamsImmediate();
                if (k203Params && k203Params.gin_n23_vedd === 1) {

                    result.sidePanels = result.sidePanels ? result.sidePanels : {};
                    result.sidePanels.strukturaNadrazenychEntity = {
                        side: "right",
                        icon: "gi-papiry",
                        leaf: { caption: "Nadřazené" }, //, badge: badge //RC 26255257 : Spis
                        caption: "Nadřazené", //RC 26255257 : Spis
                        minWidth: 300,
                        width: 400,
                        open: function () {
                            var this_ = $(this);
                            if (!this_.hasClass("StrukturaNadrazenychEntityDlg")) {
                                var cnt = $.content(this_);
                                var opt = {
                                    Ixp: componentDto.ixp
                                };

                                // Možnost 1
                                var panelContent = new GContent(GContent.createInitializer(["Gordic.Wfl.WebClient.StrukturaNadrazenychEntityDlg", { serverParams: opt, parentContent: cnt }]), this)
                                panelContent.load();

                                this_.addClass("StrukturaNadrazenychEntityDlg");
                            }
                        }
                    };

                    result.sidePanels.SouhrnDetail = {
                        side: "right",
                        icon: "gi-info_bold",
                        leaf: { caption: "jres:31937558" },  //RC 31937558 : Souhrn
                        caption: "jres:31937557", //RC 31937557 : Souhrn
                        minWidth: 300,
                        width: 400,
                        open: function () {
                            var this_ = $(this);
                            if (!this_.hasClass("GPanelSouhrnDlg")) {
                                var cnt = $.content(this_);
                                var opt = {
                                    Ixp: componentDto.ixp,
                                    AktZnacka: componentDto.AktZnacka
                                };

                                // Možnost 1
                                var panelContent = new GContent(GContent.createInitializer([Gordic.Wfl.WebClient.GPanelSouhrnDlg, { inputOpt: opt, parentContent: cnt }]), this)
                                //panelContent.load();

                                this_.addClass("GPanelSouhrnDlg");
                            }
                        }
                    };

                }


                //#endregion 




                //#endregion
                result.contentExtensions = { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                    vytvorKPIEpkHistorieSchvalovani: function () {

                        var that = this;
                        Gordic.Isl.ElectronicSignatureBookRequest.existEpkRequestLabel({ Ixp: componentDto.ixp }).get()
                            .then(function (output) {

                                if (output == null || output.data == null)
                                    return;

                                var res = output.data;

                                //res.ApprovalProcess     res.SingleRequest
                                if (res && ((res.ApprovalProcess != null && res.ApprovalProcess !== "") || (res.SingleRequest != null && res.SingleRequest !== ""))) { 
                                    

                                    //ApprovalProcess: "Ve schvalovacím procesu"  SingleRequest: "Jednotlivá žádost v EPK" 
                                    if (that.kpis.kpiIsEpkPanel) {

                                        if ((res.ApprovalProcess != null && res.ApprovalProcess !== "") && (res.SingleRequest != null && res.SingleRequest !== "")) {
                                            that.kpis.kpiIsEpkPanel.primaryText = res.ApprovalProcess + "<br>" + res.SingleRequest ;
                                            //that.kpis.kpiIsEpkPanel.secondaryText = res.SingleRequest;
                                        } else {
                                            that.kpis.kpiIsEpkPanel.primaryText = res.ApprovalProcess ? res.ApprovalProcess : "" + res.SingleRequest ? res.SingleRequest : "";
                                        }

                                        //that.kpis.kpiIsEpkPanel.icon = entitaIcon;
                                        //that.kpis.kpiIsEpkPanel.primaryText = "Test";
                                        //that.kpis.kpiIsEpkPanel.secondaryText = txt;
                                        that.kpis.kpiIsEpkPanel.visible = true;
                                        that.kpis.kpiIsEpkPanel.update();
                                    }
                                   

                                }

                                if (res != null && res.State === 0) {
                                    return;
                                }

                                if (!that.closed) {

                                    var badge = undefined;

                                    if (res != null && res.State === 1) {   // ActiveProcess
                                        badge = { value: "*", tooltip: "jres:32000137", state: "success" }; //RC 32000137 : Existuje aktivní proces
                                    }
                                    else if (res != null && res.State === 2) {   // HistoricalProcess
                                        badge = { value: "*", tooltip: "jres:32000138", state: "info" }; //RC 32000138 : Pouze historické procesy
                                    }

                                    that.element.gsidebar("addPanel", "right", {
                                        side: "right",
                                        name: "panelEpk",
                                        id: "panelEpk",
                                        leaf: { caption: "jres:26256378", badge: badge }, //, badge: badge //RC 26256378 : Schvalovací proces
                                        caption: "jres:26256378", //RC 26256378 : Schvalovací proces
                                        customClass: "gssl-epk",
                                        minWidth: 300,
                                        width: 400,
                                        icon: "gi-epk",
                                        open: function () {
                                            var this_ = $(this);
                                            // původní řešení než className začal být problém
                                            /*
                                            if (this_.hasClass("gcontent") === false) {
                                                this_.gcontent("Gordic.Wfl.WebClient.GHistorieSchvalovani");
                                            }

                                            // hotfix for 490
                                            $.content(this_).className = "Gordic.Wfl.WebClient.GHistorieSchvalovani";

                                            this_.gcontent("load", {
                                                ID: "IDEpkHistorieSchvalovani",
                                                taskId: "EpkHistorieSchvalovaniDetail",
                                                Ixp: componentDto.ixp,
                                                //SerCislo: componentDto.SerCislo           // thazmuka (12.04.2020) - vzhledem k tomu, že chci načíst všechny probíhající procesy, tak serCislo nepotřebuji
                                                //IxsSpd: this.row.ixs_spd
                                            });
                                            */
                                            if (!this_.hasClass("GHistorieSchvalovaniLoaded")) {
                                                var cnt = $.content(this_);
                                                var opt = {
                                                    Ixp: componentDto.ixp
                                                };

                                                // Možnost 1
                                                var panelContent = new GContent(GContent.createInitializer(["Gordic.Wfl.WebClient.GHistorieSchvalovani", { serverParams: opt, parentContent: cnt }]), this)
                                                panelContent.load();

                                                this_.addClass("GHistorieSchvalovaniLoaded");
                                            }



                                        }
                                    });
                                }

                            })



                    },



                    //parovy dok
                    sslParovyDokLoadPreview: function (ixp) {
                        if (detailContent.parovyDokumentPreviewDiv)
                        detailContent.parovyDokumentPreviewDiv.gpreview("loadAll", { ixp: ixp } /*nebo jiné dto, klidně celé row*/, true/*okamžitý reload*/);
                    },
                    sslParovyDokEnablePreview: function (enabled) {
                        if (detailContent.parovyDokumentPreviewDiv)
                        detailContent.parovyDokumentPreviewDiv.gpreview("option", { disabled: !enabled });
                    },
                    // spis
                    sslSpisPreviewLoadPreview: function (ixp) {
                        if (detailContent.spisPreviewDiv)
                            detailContent.spisPreviewDiv.gpreview("loadAll", { ixp: ixp } /*nebo jiné dto, klidně celé row*/, true/*okamžitý reload*/);
                    },
                    sslSpisPreviewEnablePreview: function (enabled) {
                        if (detailContent.spisPreviewDiv)
                            detailContent.spisPreviewDiv.gpreview("option", { disabled: !enabled });
                    },

                };
                
                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\DetailBuilderComponents\GSslVzoryComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslVzory: {

            create: function (content,componentDto) {
                var result = {
                    onBuild: [
                        function () {
                         
                        }
                    ],
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady
                     
                        //#region akce

                        sslVzory_createTemplateGridFormat: function () {//příprava gridformatu pro gcomparator
                            var promis = $.Deferred();

                            var format = Gordic.Ssl.GSslCommonDlg.getGridColumnSSLVzory();
                            // na tyto definice gridFormatů, které jsou použity ve více scriptech je dobré mít nějaký script "globals.js", a tyto společné funkce do něj střádat.

                           var formMappings = {};
                            //header
                            formMappings["AktZnacka"] = "Znacka";
                            formMappings["Cj"] = "CjSpis"; //  spiss
                            formMappings["CjExt"] = "CjExt";
                            formMappings["Nazev"] = "Vec";

                            formMappings["DatPrijPod"] = "DatPrijPod";//  spis
                            formMappings["ZnackaOdes"] = "ZnackaOdes";//  spis

                            formMappings["CjZn"] = "CjZn";
                            formMappings["PorSpis"] = "PorSpis";
                            formMappings["TypAgTxt"] = "Agenda";
                            formMappings["ExtId"] = "ExtId";
                            
                            //formMappings["NazevSchval"] = "IxsFunSchval";//  spis
                            //formMappings["NazevResitel"] = "IxsFunResitel";
                            //formMappings["IxsFunAktText"] = "IxsFunAkt";

                            //profil
                            //formMappings["EsuText"] = "Odesilatel";
                            formMappings["MistoVzniku"] = "MistoVzniku";
                            formMappings["ObsahText"] = "VecPodrobne";
                            formMappings["Poznamka"] = "Poznamka";
                            formMappings["IxstTypText"] = "IxsTyp";
                            //formMappings["UmisteniText"] = "Umisteni";
                            //formMappings["SpisPl"] = "SpisPl";
                            //formMappings["SpisZnak"] = "SpisZnak";
                            formMappings["StUtajIdWflText"] = "StUtajIdWfl";
                            formMappings["DatPodano"] = "DatPodano";
                            formMappings["DatEvidovano"] = "DatEvidovano";
                            formMappings["DatVyrizeno"] = "DatVyrizeno";

                            promis.resolve({ format: format, formMappings: formMappings });
                            return promis.promise();
                        },
                        
                        //funkce pro vybudování vzorů pomocí widgetu gcomparator
                        sslVzory_buildTemplate: function (data) {
                            var that = this;
                            var panel = this.element.gsidebar("getPanel", "sslVzory");
                            if (panel) { 
                                var comparator = panel.hasClass("gcomparator") ? panel : null;
                                if (comparator == null || comparator.length == 0) {
                                    
                                    that.sslVzory_createTemplateGridFormat().done(function (tgformat) {
                                        panel.height("100%")
                                            .gcomparator({
                                                items: data.length != null ? data : [data], //pole DTO objektů
                                                columns: tgformat.format, //Grid format
                                                formMappings: tgformat.formMappings,
                                                watchForHighlight: that.element, // element, na kterém se odchytává .gfield focus - umožní označování řádků
                                                clickable: (that.EditMode || (that.RezimPodani != null && that.RezimPodani != 0)), // umožnit klikací režim
                                                //2.11.2022 - vmaca - použití setValue místo defaultního modelApply - ale nevím proč, když modelApply funguje dobře, ale toto nefunguje ... proto zakomentovávám
                                                //formApply: function (dto, columnFormat) {
                                                //    const fieldName = columnFormat.field == null ? columnFormat.name : columnFormat.field;
                                                //    var activeFields = this.watchForHighlight.findFields(tgformat.formMappings[fieldName] ?? fieldName);
                                                //    if (!activeFields.gfield("option", "disabled")) { //pokud se do fieldů dá zadávat
                                                //        activeFields.gfield("setValue", columnFormat.cellTemplate.render(dto), false);//model-apply se nepodařil, zkusit přes setValue
                                                //        activeFields.first().gfield("focus");
                                                //    }
                                                //},
                                                itemremove: function (ev, obj) {
                                                    if (obj && obj.item && obj.item.Ixp) {
                                                        that.sslVzory_removeUsersettings(obj.item.Ixp);
                                                    }
                                                }
                                            });
                                        //panel.element.addHelpContext('vzory');
                                    });

                                } else if (data != null) { //comparator už existuje -> přidávat položky
                                    
                                    comparator.gcomparator("addItems", data.length != null ? data : [data]);
                                }
                                this.sslVzoryPridejDoLastPole(data);
                            }

                        },
                        sslVzory_ReadDetails: function (arrayWithIxp) {
                            var that = this;
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            //var resultData = [];
                            //var promises = [];
                            var arrOnlyStr = [];
                            for (var i = 0; i < arrayWithIxp.length; i++) {
                                arrOnlyStr.push(arrayWithIxp[i].ixp);
                            }

                            srv.call("GetSslDetailVzory", { ixpList: arrOnlyStr })
                                .done(function (resultData) {
                                    
                                    //resultData.push(detailDto); //push($.extend(data, detailDto)
                                    that.sslVzory_buildTemplate(resultData);

                                }).always(function () { srv.close(); });
                           
                         
                            //$.when.apply(null, promises)
                            //    .then(function () {
                            
                            //        that.sslVzory_buildTemplate(resultData);
                            //    });
                        },
                    

                        //#endregion
                        sslVzory_enables: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true) {
                                l_bActionEnabled = false;
                            }
                            //this.actions.actAddVyrizDok.update({ enabled: l_bActionEnabled });
                        },
                        sslVzoryPridejDoLastPole: function (data) {

                            if (!Array.isArray(data)) {
                                data = [data];
                            }
                            var newData = [];
                            for (var i = 0; i < data.length; i++) {
                                newData.push(data[i].Ixp);
                            }

                            // uložení více vzoru
                            var storedData = this.userSettings.get("sslVzory.last") || [];

                            var vys = storedData.concat(newData);
                            var finalToSave = vys.concat();
                            for (var i = 0; i < finalToSave.length; ++i) {
                                for (var j = i + 1; j < finalToSave.length; ++j) {
                                    if (finalToSave[i] === finalToSave[j])
                                        finalToSave.splice(j--, 1);
                                }
                            }
                            finalToSave = finalToSave.slice(-10); // veme posledních 10
                            
                            this.sslVzory_setUsersettings(finalToSave); //newData
                        },
                        sslVzory_removeUsersettings: function (removedIxp) {
                            var storedData = this.userSettings.get("sslVzory.last") || [];
                            for (var i = 0; i < storedData.length; ++i) {
                                if (storedData[i] === removedIxp)
                                    storedData.splice(i--, 1);
                            }
                            this.sslVzory_setUsersettings(storedData);
                        },
                        sslVzory_removeAll: function () {
                            // vymazání panelu
                            var panel = this.element.gsidebar("getPanel", "sslVzory");
                            if (panel && panel.length > 0) {
                                var comparator = panel.hasClass("gcomparator") ? panel : null;
                                if (comparator != null && comparator.length > 0) {
                                    comparator.gcomparator("clear");
                                }
                            }

                            // vymazání zapamatovaných
                            this.sslVzory_setUsersettings([]);
                        },
                        sslVzory_setUsersettings: function (data) {
                            this.userSettings.set("sslVzory.last", data);
                        },

                         
                    },

                    actions: { //může být zadáno jako pole nebo jako objekt
                        actSelectTemplate: { //selector pro vzory
                            caption: "jres:31937105", //RC 31937105 : Přidat vzor
                            icon: "gi-plus",
                            tooltip: "jres:31937301".format(10), //RC 31937301 : Přidá vzor do kolekce. (zapamatováno maximálně {0} posledních přidaných vzorů)
                            run: function (ev, ctx) {
                                var actThis = this;

                                actThis.content.hledatIdentDokSpi(function (retVal) {
                                    //retVal.ixp
                                    if (retVal.ixp) {
                                        var arrayWithIxp = [{ ixp: retVal.ixp }];
                                        actThis.content.sslVzory_ReadDetails(arrayWithIxp);

                                    }
                                });

                            }
                        }

                    },

                    //přidání záložky do pravého panelu
                    sidePanels: {
                        sslVzory: {
                            side: "right",
                            leaf: "jres:31937106", //RC 31937106 : Vzory
                            caption: "jres:31937106", //RC 31937106 : Vzory
                            icon:"gi-paper_vzory",
                            menuBar: ["actSelectTemplate*"],
                            open: function (ev, ctx) {
                               // vzory na vstupu detailu
                                var panel = content.element.gsidebar("getPanel", ctx.id);
                                if (panel != null) {
                                    panel.addHelpContext('PostraniPanelVzory');
                                }
                                
                                if (componentDto.VzoryArray && componentDto.VzoryArray.length > 0) {
                                    //var panel = content.element.gsidebar("getPanel", ctx.id); //21.08.2023 dsebesta posunuto nad if
                                    
                                    if (panel && !panel.hasClass("js-vzoryArrayAdded")) { // kontrola přidání statických vzoru
                                        var newArr = [];
                                        for (var itemIndex = 0, l = componentDto.VzoryArray.length; itemIndex < l; itemIndex++) {
                                            newArr.push({ ixp: componentDto.VzoryArray[itemIndex] });
                                        }
                                        panel.addClass("js-vzoryArrayAdded"); // přidám indikaci že už jsem přidal statické vzory 
                                        content.sslVzory_ReadDetails(newArr);
                                    }
                                }
                                // zapamatované vzory
                                var storedData = content.userSettings.get("sslVzory.last") || [];
                                if (storedData.length > 0) {
                                    var zapamatovaneArr = [];
                                    for (var itemIndex2 = 0, l = storedData.length; itemIndex2 < l; itemIndex2++) {
                                        zapamatovaneArr.push({ ixp: storedData[itemIndex2] });
                                    }
                                    content.sslVzory_ReadDetails(zapamatovaneArr);
                                }
                            } 
                        }
                    }
                };

                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\DetailBuilderComponents\GSslKpiComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslKpi: {

            create: function (detailContent, componentDto) {

                var result = {};
                result.onInit = [function (builder) {

                    var that = this;
                    // defaulní akce pro kpi panel, zde je nutné oifovat všechny panely včetně potonků
                    builder.kpiPanelOptions = $.extend({}, builder.kpiPanelOptions,  Gordic.Prefabs.Panels.kpiIconTwoRowsTextTemplate() ,
                        {
                            toolbarOptions: {
                                top: {
                                    allowMenuButton: true
                                }
                            },

                            tooltipOptions: function (kpiparam) {
                                if (kpiparam.name === "kpiTechnickeVlastnosti") {

                                    return { tooltip: componentDto.KpiTooltip };
                                }
                                if (kpiparam.name === "kpiKopieAPoznamka") {

                                    return { tooltip: componentDto.TextJeKopieAPoznamka };
                                }
                                if (kpiparam.name === "kpiPrizVBaliku") {
                                    
                                    return { tooltip: Gordic.Gin.Globals.Icons.VBaliku().tooltip };
                                }
                                if (kpiparam.name === "kpiDotceneSubjekty") {

                                    return { tooltip: componentDto.KpiDotceneSubjektyTooltip };
                                }
                                if (kpiparam.name === "kpiOdeslaneZasilky") {

                                    return { tooltip: "jres:31937433" }; //RC 31937433 : Zásilky celkem / Odeslané / Vypravené / Doručené
                                }
                            },
                            toolbar: {
                                top: function (menuParams) {

                                    //#region -- nastavení analogové formy --
                                    var menu = [];
                                    if (menuParams.name === "kpiEntita" && componentDto.IsDocWithoutForm === true) {
                                        
                                        var paramSetAnalog = {
                                            action: new GAction({
                                                name: "selectBtnAnalogForm",
                                                icon: "gi-paper",
                                                caption: "",
                                                tooltip: 'jres:32000106', //RC 32000106 : Nastavit analogovou formu
                                                run: function (ev, ctx) {

                                                    if (that.gcontentForma == null) 
                                                        that.gcontentForma = detailContent.createServiceContent("Gordic.Wfl.WebClient.GFormaDokSpis");

                                                    that.gcontentForma.call("Save", {
                                                        Ixp: componentDto.ixp,
                                                        SFyz: 2,
                                                        SEle: 0
                                                    }).then(function () {
                                                        that.tryReloadDetail();
                                                    });
                                                }
                                            })
                                        };
                                        menu.push(paramSetAnalog);
                                        return menu;
                                    }
                                    else if (menuParams.name === "kpiTechnickeVlastnosti") {
                                       
                                        var paramsPocetPodpisu = {
                                            action: new GAction({
                                                name: "actPocetPodpisu",
                                                //icon: "gi-paper",
                                                //caption: componentDto.KpiSignCount,
                                                tooltip: componentDto.KpiTooltip, 
                                                run: function (ev, ctx) {
                                                    that.clickKpiTechnickeVlastnosti(); 
                                                }
                                            }),
                                            badge: {  //ref T24079
                                                id: "badgePocetPodpisu",
                                                value: componentDto.KpiSignCount,
                                                tooltip: componentDto.KpiTooltip,
                                                customClass: "g-state-info" //zobrazeni, akt. moznosti: g-state-info, g-state-important, g-state-warning, g-state-error
                                            }
                                        };
                                        menu.push(paramsPocetPodpisu);
                                        return menu;
                                    }
                                    else if (menuParams.name === "kpiDotceneSubjekty") {
                                        if (componentDto.JeVeSpisu || componentDto.PrirazenoKeSpisu || componentDto.JeVSoucastiNeboTypovemSpisu) {
                                            var ixp = null;
                                            if (componentDto.IxpSpisPrir) {
                                                ixp = componentDto.IxpSpisPrir;
                                            }
                                            else if (componentDto.TypSpis == 0 && componentDto.IxpSpisWfl) { // dokument ve spisu
                                                ixp = componentDto.IxpSpisWfl;
                                            } else if (componentDto.TypSpis == 1 && componentDto.IxpSoucast) {// spis v součásti
                                                ixp = componentDto.IxpSoucast;
                                            } else if (componentDto.TypSpis == 4 && componentDto.IxpSoucast) { // díl v součásti
                                                ixp = componentDto.IxpSoucast;
                                            } else if ((componentDto.TypSpis == 3 || componentDto.TypSpis == 5) && componentDto.IxpSpisWfl) { // součást v součásti nebo typovém spisu
                                                ixp = componentDto.IxpSpisWfl;
                                            }
                                            var paramsPocetPodpisu = {
                                                action: new GAction({
                                                    name: "actkpiDotceneSubjektySpis",
                                                    icon: "gi-spis",
                                                    //caption: componentDto.KpiSignCount,
                                                    tooltip: "jres:31937468", //RC 31937468 : Dotčené subjekty spisu
                                                    run: function (ev, ctx) {

                                                        if (detailContent.dotceneSubjekty) {
                                                            detailContent.dotceneSubjekty(ixp);
                                                        }
                                                    }
                                                })
                                            };
                                            menu.push(paramsPocetPodpisu);
                                            return menu;
                                        }
                                    }
                                    
                                    
                                    return [];
                                 
                                    //#endregion
                                }
                            },
                         
                            defaultAction: new GAction({
                                name: "actEntitaKpis",
                                run: function (ev, ctx) {
                                    //if (ctx.item.data.name === "kpiEntita") {
                                    //    detailContent.formaDokumentu(); //, Gordic.Global.Enums.ModOtevreni.navigateTask
                                    //}

                                    if (ctx.item.data.name === "kpiIsEpkPanel") {
                                        if (detailContent && detailContent.schvalovaciProces) {
                                            detailContent.schvalovaciProces();
                                        }

                                        /*
                                        var panelSEPK = detailContent.element.gsidebar("getPanel", "panelEpk");
                                        if (panelSEPK && panelSEPK.length > 0) {
                                            panelSEPK.gsbpanel("show");
                                        }
                                        */
                                    }

                                    //if (ctx.item.data.name === "kpiPoziceSpis") {
                                    //    detailContent.detailSpisu(); //, Gordic.Global.Enums.ModOtevreni.navigateTask
                                    //}
                                    
                                    //if (ctx.item.data.name === "kpiTechnickeVlastnosti") {
                                    //    detailContent.clickKpiTechnickeVlastnosti();                                     
                                    //}
                                    
                                }
                            }),
                        }
                    );
                    this.moveKpiPosouzeni(builder);
                }];
                    
                result.onBuild = [function (builder) {
                    this.showFlashJinaAgenda();
                    this.SslKpisNastavKpi();
                    this.SslKpisnastavKorokyFlash();
                    

                }];
                result.contentExtensions = { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady
                    moveKpiPosouzeni: function (builder) {
                        if (builder && builder.kpiDefinitions) {
                            //builder.kpiDefinitions.map((elem, index) => {
                            //    if (elem.name === "kpiPosouzeni") {
                            //        builder.kpiDefinitions.splice(index, 1);
                            //        builder.kpiDefinitions.push(elem);
                            //    }
                            //})
                            var indexKpi = null;
                            for (var i = 0; i < builder.kpiDefinitions.length; i++) {
                                if (builder.kpiDefinitions[i].name === "kpiPosouzeni") {
                                    indexKpi = i;
                                }
                            }
                            if (indexKpi != null) { 
                                builder.kpiDefinitions.push(builder.kpiDefinitions.splice(indexKpi, 1)[0]);
                            }
                        }
                    },


                    SslKpisNastavKpi: function () {

                        //ukazka
                        //if (this.kpis.kpiOne) {
                        //    this.kpis.kpiOne.value = 25;
                        //    this.kpis.kpiOne.data = 25;
                        //    //this.kpis.kpiOne.update();
                        //    this.kpis.kpiOne.update();
                        //}

                        var ikonaStav = "fa-fw";
                        var textStav = "";
                        var entitaTextRow1 = "";
                        var entitaTextRow2 = "";
                        var entitaIcon = "fa-fw";
                        var technickeVlastnostiText = "";
                        var technickeVlastnostiIcon = "fa-fw";

                        var poziceSpisText = "";
                        var poziceSpisIcon = "fa-fw";
                        
                        var polestavu = null;
                        if (this.WflStatusBar_Dto) {
                            polestavu = this.WflStatusBar_Dto.koleckeIkonDoStatusBaru;
                        }
                        
                        if (polestavu) {
                            for (var i = 0; i < polestavu.length; i++) {
                                //stav
                                if (polestavu[i].name === "actStavZpracovaniStatus") {
                                    ikonaStav = polestavu[i].icon;
                                    textStav = polestavu[i].tooltip;
                                }

                                // typ entity
                                if (polestavu[i].name === "actTypEntityStatus") {
                                    entitaIcon = polestavu[i].icon;
                                    entitaTextRow1 = polestavu[i].txtRow1;
                                    entitaTextRow2 = polestavu[i].txtRow2;
                                }

                                // technicke vlastnosti
                                if (polestavu[i].name === "actTechnickeVlastnostiStatus") {
                                    technickeVlastnostiIcon = polestavu[i].icon;
                                    technickeVlastnostiText = polestavu[i].tooltip;
                                }

                                // pozice spis
                                if (polestavu[i].name === "actPoziceSpisStatus") {
                                    poziceSpisIcon = polestavu[i].icon;
                                    poziceSpisText = polestavu[i].tooltip;
                                }
                            }
                        }

                        if (this.kpis.kpiStav) {
                            this.kpis.kpiStav.icon = ((ikonaStav === "fa-fw") || (ikonaStav && (ikonaStav.length > 0) && ( ikonaStav[0] === "fa-fw" )) ) ? undefined : ikonaStav ;
                            var temIcoText = null;
                            if (ikonaStav && Array.isArray(ikonaStav)) {
                                temIcoText = ikonaStav[0];
                            } else {
                                temIcoText = ikonaStav;
                            }
                            var meaning = undefined;
                            if (temIcoText) { //g-state-info, g-state-important, g-state-warning, g-state-error
                                if (temIcoText.indexOf("g-state-info") !== -1) {
                                    meaning = "info";
                                }
                                if ((temIcoText.indexOf("g-state-important") !== -1) || (temIcoText.indexOf("g-state-error") !== -1)) {
                                    meaning = "negative";
                                }
                                if (temIcoText.indexOf("g-state-success") !== -1) {
                                    meaning = "positive";
                                }
                            }

                            this.kpis.kpiStav.meaning = meaning;//componentDto.stav_pisColour;
                            this.kpis.kpiStav.primaryText = textStav;    
                            //this.kpis.kpiStav.secondaryText = componentDto.stav_pisTxt;              
                            this.kpis.kpiStav.update();
                        }
                        if (this.kpis.kpiEntita) {
                            this.kpis.kpiEntita.icon = entitaIcon;
                            this.kpis.kpiEntita.primaryText = entitaTextRow1;
                            this.kpis.kpiEntita.secondaryText = entitaTextRow2;
                            this.kpis.kpiEntita.update();
                        }

                        if (this.kpis.kpiPoziceSpis) {
                            if (poziceSpisText != null && poziceSpisText != "") {
                                this.kpis.kpiPoziceSpis.action.visible(true);
                                this.kpis.kpiPoziceSpis.icon = poziceSpisIcon;
                                this.kpis.kpiPoziceSpis.primaryText = poziceSpisText;
                                //this.kpis.kpiPoziceSpis.secondaryText = poziceSpisText;
                                this.kpis.kpiPoziceSpis.update();
                            } else {
                                this.kpis.kpiPoziceSpis.action.visible(false);
                            }
                            
                        }
                        
                        if (this.kpis.kpiKopieAPoznamka) {
                            //this.kpis.kpiKopieAPoznamka.icon = poziceSpisIcon;
                            //this.kpis.kpiKopieAPoznamka.primaryText = poziceSpisText;
                            var textKpiPoznamka = componentDto.TextJeKopieAPoznamka;
                            if (textKpiPoznamka && textKpiPoznamka.length > 26) {
                                textKpiPoznamka = textKpiPoznamka.substr(0, 25) + "...";
                            }
                            this.kpis.kpiKopieAPoznamka.secondaryText = textKpiPoznamka;
                            this.kpis.kpiKopieAPoznamka.update();
                        }

                        if (this.kpis.kpiTechnickeVlastnosti) {
                            this.kpis.kpiTechnickeVlastnosti.icon = technickeVlastnostiIcon;
                             
                            //this.kpis.kpiTechnickeVlastnosti.primaryText = componentDto.KpiPodpisText1;
                            //this.kpis.kpiTechnickeVlastnosti.secondaryText = componentDto.KpiPodpisText2; 

                            //this.kpis.kpiTechnickeVlastnosti.primaryText = componentDto.KpiSignCount;
                            //this.kpis.kpiTechnickeVlastnosti.secondaryText = componentDto.KpiSignCount;
                            //this.kpis.kpiTechnickeVlastnosti.bigValue = componentDto.KpiSignCount;
                            this.kpis.kpiTechnickeVlastnosti.details = [];
                            if (componentDto.KpiPodpisText1 != null || componentDto.KpiPodpisText2 != null) {
                                if (componentDto.KpiPodpisText1) this.kpis.kpiTechnickeVlastnosti.details.push({ description: componentDto.KpiPodpisText1 });
                                if (componentDto.KpiPodpisText2) this.kpis.kpiTechnickeVlastnosti.details.push({ description: componentDto.KpiPodpisText2 });
                            } else {
                                this.kpis.kpiTechnickeVlastnosti.details.push({ description: "jres:31937178"}); //RC 31937178 : Podpis neověřen
                            }
                            this.kpis.kpiTechnickeVlastnosti.update();
                        }

                        if (this.kpis.kpiDilciTermin) {
                            var dat_spl_Dil = Gordic.Utils.DateTime.getStartOfDay(new Date(componentDto.TerminDilciDate))                                                                          // datum splatnosti
                            var dat_dns_Dil = Gordic.Utils.DateTime.getStartOfDay(new Date());
                            // dnešní datum
                            var prekrocenTermin = false;
                            var rozdil = Gordic.Utils.DateTime.diff(dat_dns_Dil, dat_spl_Dil, 'days');
                            if (rozdil < 0) {
                                prekrocenTermin = true;
                            }

                            var rozdilAbs = Math.abs(rozdil);                                                                   // rozdíl dnů - absolutní hodnota

                            this.kpis.kpiDilciTermin.value = rozdilAbs;                                                                                        // naplnění value

                            this.kpis.kpiDilciTermin.icon = prekrocenTermin ? "gi-vyrizenopo_bold  g-state-text g-state-error" : "gi-vyrizenopred_bold  g-state-text g-state-warning";
                            this.kpis.kpiDilciTermin.primaryText = prekrocenTermin ? "jres:31937092" : "jres:31937091";             //RC 31937092 : Počet dní <b>po dílčím termínu</b>
                            this.kpis.kpiDilciTermin.secondaryText = rozdilAbs;
                            this.kpis.kpiDilciTermin.secondaryText = "<b>" + Gordic.Templates.Formatters.datetime(new Date(componentDto.TerminDilciDate), "d.M.yyyy") + "</b>"
                                + " jres:31937171"  //RC 31937171 : to je
                                + " <b>" + rozdilAbs + "</b>"
                                + " jres:26256072"; //RC 26256072 : dní
                            this.kpis.kpiDilciTermin.meaning = prekrocenTermin ? "negative" : "warning"; //"positive" "info"
                            this.kpis.kpiDilciTermin.update();
                        }
                        if (this.kpis.kpiDotceneSubjekty) {
                            var textDotceneSubjekty = componentDto.PocetSubjektuEntity;

                            if (componentDto.PocetSubjektuNaSpisuVeKteremJeEntitaVlozena != null) {
                                textDotceneSubjekty = textDotceneSubjekty + " / " + componentDto.PocetSubjektuNaSpisuVeKteremJeEntitaVlozena;
                            }
                            this.kpis.kpiDotceneSubjekty.secondaryText = textDotceneSubjekty;
                            this.kpis.kpiDotceneSubjekty.update();
                        }

                        if (this.kpis.kpiOdeslaneZasilky) {
                            var textOdeslaneZasilky = "0 / 0 / 0 / 0";
                            
                            var meaning = undefined;
                            /*
                                case Meaning.positive:
                                case Meaning.success:
                                element.addClass("positive-value"); break;
                                case Meaning.negative:
                                case Meaning.error:
                                element.addClass("negative-value"); break;
                                case Meaning.info:
                                element.addClass("neutral-value"); break;
                                case Meaning.important:
                                element.addClass("important-value"); break;
                                case Meaning.warning:
                                element.addClass("warning-value"); break;
                                case Meaning.normal:
                                element.addClass("neutral-value-black"); break;
                                case Meaning.purple:
                                element.addClass("purple-value"); break;
                                case Meaning.yellow:
                                element.addClass("yellow-value"); break;
                            */

                            
                            if (componentDto.KpiOdeslaneZasilkyDto) {
                                textOdeslaneZasilky =
                                    (componentDto.KpiOdeslaneZasilkyDto.celkem ? componentDto.KpiOdeslaneZasilkyDto.celkem : "0") + " / " +
                                    (componentDto.KpiOdeslaneZasilkyDto.odeslane ? componentDto.KpiOdeslaneZasilkyDto.odeslane : "0") + " / " +
                                    (componentDto.KpiOdeslaneZasilkyDto.vypravene ? componentDto.KpiOdeslaneZasilkyDto.vypravene : "0") + " / " +
                                    (componentDto.KpiOdeslaneZasilkyDto.dorucene ? componentDto.KpiOdeslaneZasilkyDto.dorucene : "0");


                                if (componentDto.KpiOdeslaneZasilkyDto.celkem > 0) {
                                    meaning = "warning";
                                    if (componentDto.KpiOdeslaneZasilkyDto.celkem === componentDto.KpiOdeslaneZasilkyDto.dorucene) {
                                        meaning = "positive";
                                        textOdeslaneZasilky =
                                            "<b>" + (componentDto.KpiOdeslaneZasilkyDto.celkem ? componentDto.KpiOdeslaneZasilkyDto.celkem : "0") + "</b> / " +
                                            (componentDto.KpiOdeslaneZasilkyDto.odeslane ? componentDto.KpiOdeslaneZasilkyDto.odeslane : "0") + " / " +
                                            (componentDto.KpiOdeslaneZasilkyDto.vypravene ? componentDto.KpiOdeslaneZasilkyDto.vypravene : "0") + " / " +
                                            "<b>" + (componentDto.KpiOdeslaneZasilkyDto.dorucene ? componentDto.KpiOdeslaneZasilkyDto.dorucene : "0") + "</b>";
                                    }
                                } 
                            }
                            this.kpis.kpiOdeslaneZasilky.meaning = meaning;
                            this.kpis.kpiOdeslaneZasilky.secondaryText = textOdeslaneZasilky;
                            this.kpis.kpiOdeslaneZasilky.update();
                        }
                        
                    },

                    SslKpisnastavKorokyFlash: function () {
                       
                        //componentDto.TrasaUserInfoOAktualnimKrokuTrasyPisemnosti 
                        //componentDto.PorCisloTrasy
                        //componentDto.LzeTrasy 
                        //componentDto.ButtonSplnitEnabled
                        //componentDto.ButtonAnoEnabled
                        //componentDto.ButtonNeEnabled
                        //componentDto.ButtonSplnitVisible 
                        //componentDto.ButtonAnoNeVisible 
                        if (componentDto.LzeTrasy) { 
                            //label
                            var label = $("<a>").html(componentDto.TrasaUserInfoOAktualnimKrokuTrasyPisemnosti);

                            if (componentDto.ButtonSplnitVisible) { 
                                //label = label.add($("&nbsp; &nbsp; &nbsp;"));
                                this.actions.actSslKpisTrasaSplnit.enabled(componentDto.ButtonSplnitEnabled);
                                label = label.add($("<a>").glink({
                                    params: {
                                        action: this.actions.actSslKpisTrasaSplnit
                                    },
                                    }));
                            }

                            if (componentDto.ButtonAnoNeVisible) {
                                
                                this.actions.actSslKpisTrasaAno.enabled(componentDto.ButtonAnoEnabled);
                                this.actions.actSslKpisTrasaNe.enabled(componentDto.ButtonNeEnabled);
                                label = label.add($("<a>").glink({
                                    params: {
                                        action: this.actions.actSslKpisTrasaAno
                                    },
                                    
                                }));
                                label = label.add($("<a>").glink({
                                    params: {
                                        action: this.actions.actSslKpisTrasaNe
                                    },
                                }));
                            }
                            var divik = $("<div>").gflashpanel({ icon: "fa-plane", label: label, noClose: true, customClass: undefined });; //g-state-warning
                            this.element.find(".header-form").before(divik);
                        }
                    },
                    SslKpisSplnitClick: function (event) {
                        this.SslKpisGIAT_UserClickInternal(1);
                    },
                    SslKpisAnoClick: function () {

                        this.SslKpisGIAT_UserClickInternal(1);
                    },
                    SslKpisNeClick: function (clientID) {

                        SslKpisGIAT_UserClickInternal(0, clientID);
                    },
                    SslKpisGIAT_UserClickInternal: function (UserChoice) {  // internal
                        var that = this;
                        this.beginOperation("jres:26256622"); //RC 26256622 : Realizuje se aktuální krok trasy.
                        var opt = {
                            "ixp": componentDto.ixp,
                            "porCislo": componentDto.PorCisloTrasy,
                            "response": UserChoice
                        };
                        var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                        srv.call("RealizaceKrokuTrasy", opt)
                            .done(function (retVal) {
                                that.endOperation();
                                if (retVal.StavBool) {

                                    that.tryReloadDetail(undefined, {
                                        flashMessage: "jres:31937024", //RC 31937024 : Proběhla realizace kroku trasy
                                        flashMessageClass: "g-state-success",
                                    });
                                } else {
                                    that.dialogs.alert("jres:31937087"); //RC 31937087 : Nelze provést realizaci kroku trasy
                                }
                            }).fail(function () {
                                that.endOperation();
                                that.dialogs.alert("jres:31937087"); //RC 31937087 : Nelze provést realizaci kroku trasy
                            }).always(function () { srv.close(); });
                    },

                    //akce po kliku na technické vlastnosti, takže nejčastěji podpis
                    clickKpiTechnickeVlastnosti: function () {
                        //actOveritPodpis
                        var that = this;
                        if (componentDto.Ixb) { 
                            Gordic.Wfl.Dialogs.HistorieOvereniDlg(this, { Ixb: componentDto.Ixb, mode: 0 });
                        }
                        /* // dřívější postup, kdy se pouštělo ověření podpisu
                        this.beginOperation();
                        var prilohyDiv = this.find('[data-param-id="tabAttachments"]').gtab("open");
                        if (prilohyDiv && prilohyDiv.length > 0) {
                            prilohyDiv.gtab("open");
                            prilohyDiv.gcontent('loadingAwait').done(function (o1, o2) {
                                var contentPriloh = $.content(prilohyDiv);
                                var grid = contentPriloh.element.find('.gattachmentgrid');
                                if (grid.length > 0) {
                                    var updateActionsDeferred = grid.gattachmentgrid('getUpdateActionsDeferred');
                                    updateActionsDeferred.done(function () {
                                        if (contentPriloh && contentPriloh.actions && contentPriloh.actions.actOveritPodpis && contentPriloh.actions.actOveritPodpis.enabled()) {
                                            contentPriloh.actions.actOveritPodpis.run(); // spustí akci ověření podpisů
                                            that.endOperation();
                                        }
                                    });
                                }
                            });
                        }
                        */
                    },

                    clickKpiPosouzeni: function () {
                        var that = this;
                        if (componentDto.gin_epk_schval != null && componentDto.gin_epk_schval !== 0) {
                            var opt = {
                                Ixp: componentDto.ixp
                            };
                            Gordic.Wfl.Dialogs.GSchvalovaciProcesPozadavekDlg(this, opt)
                                .done(function (retval) {
                                    //if (retval && retval.stav) {
                                    //    that.element.trigger(eventName, Gordic.Wfl.WebClient.WflOps.prepareOpts(ops.schvalovaciProces));
                                    //}
                                    that.tryReloadDetail();
                                });
                        }
                        else {
                            if (componentDto.JeEpkPosouzeni) {
                                var opt = {
                                    Ixp: componentDto.ixp,
                                    IxsFun: componentDto.IxsFun
                                }
                                Gordic.Wfl.WebClient.GWflDetailUtils.Posoudit(this, opt);
                            } else {
                                var options = {
                                    ListIxp: [componentDto.ixp],
                                    HromadnaAkceDokumenty: true
                                };
                                Gordic.Wfl.Dialogs.ZadostOPodpisDlg(this, options, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                                    .on("closed", function (ev, retVal) {
                                        that.tryReloadDetail();
                                    });
                            }
                        }
                    },
                    
                    showFlashJinaAgenda: function () {
                        this.hideFlash("jinaAgendaFlash");
                        if (componentDto.JinaAgenda || componentDto.JinejExterniSystem) {
                            var label = $("<a>").html("");
                            if (componentDto.JinaAgenda) { 
                                label = label.add($("<a>").html("jres:31937575 ")); //RC 31937575 : Vedeno v jiné agendě
                                //this.actions.actOtevriAgenduVNoveZalozceFlash.enabled(true);
                                if (componentDto.TextJinaAgenda) { 
                                    this.actions.actOtevriAgenduVNoveZalozceFlash.update({ caption: componentDto.TextJinaAgenda });
                                    label = label.add($("<a>").glink({
                                        params: {
                                            action: this.actions.actOtevriAgenduVNoveZalozceFlash
                                        },
                                    }));
                                }
                            }
                            if (componentDto.JinejExterniSystem) {
                                label = label.add($("<a>").html(" jres:31937576 ")); //RC 31937576 : Externí systém:
                                //this.actions.actOtevriAgenduVNoveZalozceFlash.enabled(true);
                                this.actions.actOtevriExterniSystemVNoveZalozceFlash.update({ caption: componentDto.TextJinejExterniSystem });
                                label = label.add($("<a>").glink({
                                    params: {
                                        action: this.actions.actOtevriExterniSystemVNoveZalozceFlash
                                    },
                                }));
                            }


                            this.showFlash(
                                //"jres:31937206".format(componentDto.TextJinaAgenda), //RC 31937206 : Vedeno v jiné agendě {0}
                                label,
                                "warning",
                                "jinaAgendaFlash");
                        }
                        
                        
                    },

                    clickKopieAPoznamka: function () {
                        
                        var that = this;

                        /*
                        this.beginOperation();
                        var prilohyDiv = this.find('[data-param-id="tabAttachments"]').gtab("open");
                        if (prilohyDiv && prilohyDiv.length > 0) {
                            prilohyDiv.gtab("open");
                            prilohyDiv.gcontent('loadingAwait').done(function (o1, o2) {
                                that.endOperation();
                            });

                        }
                        */
                        var tabManager = this.find('.' + Gordic.Gin.DetailBuilder.classes.tabmanager); //.gtabmanager("GetActive")
                        if (tabManager.hasClass('gtabmanager')) {
                            tabManager.gtabmanager("setActive", "tgPrilohy");
                          
                        }
                    },

                    detailSpisuKpiComponent: function () {
                        var that = this;
                        var ixp = null;
                        if (componentDto.IxpSpisPrir) {
                            ixp = componentDto.IxpSpisPrir;
                        }
                        else if (componentDto.TypSpis == 0 && componentDto.IxpSpisWfl) { // dokument ve spisu
                            ixp = componentDto.IxpSpisWfl;
                        } else if (componentDto.TypSpis == 1 && componentDto.IxpSoucast) {// spis v součásti
                            ixp = componentDto.IxpSoucast;
                        } else if (componentDto.TypSpis == 4 && componentDto.IxpSoucast) { // díl v součásti
                            ixp = componentDto.IxpSoucast;
                        } else if ((componentDto.TypSpis == 3 || componentDto.TypSpis == 5) && componentDto.IxpSpisWfl) { // součást v součásti nebo typovém spisu
                            ixp = componentDto.IxpSpisWfl;
                        }

                        if (ixp) {
                            var opt = {
                                DetailDto: {
                                    ixp: ixp
                                },
                            };
                            this.otevriNovyDetail(opt);
                        }
                    }
                };
                //bar = 0,
                //pie = 1,
                //line = 2,
                //area = 3,
                //liquid = 4,
                //gauge = 5,
                //gauge2 = 6,
                //valueCard = 7
                result.kpis = [];
                /*
                // trasy
                if (componentDto.TrasaUserInfoOAktualnimKrokuTrasyPisemnosti) {
                    var valueTxt = "";
                    if (componentDto.ButtonSplnitVisible) {
                        valueTxt = valueTxt + "Splňit";
                    }
                    if (componentDto.ButtonAnoNeVisible) {
                        valueTxt = valueTxt + "Ano    Ne";
                    }
                    result.kpis.push(
                        new GObservableObject({
                            name: "kpiSteps",
                            //chartType: "valueCard",
                            icon: "gi-group g-state-text g-state-warning",
                            //titlePosition: "left", //right left
                            title: "jres:31937088", //RC 31937088 : Krok trasy
                            //chartVisible: false,
                            //meaning: "positive",
                            unit: " ",
                            text: componentDto.TrasaUserInfoOAktualnimKrokuTrasyPisemnosti.replace("jres:31937089",""),//, //RC 31937089 : Krok trasy:
                            isCurrency: false,
                            value: valueTxt,
                           
                            actionOnTitle: false,
                            action: new GAction({
                                name: "selectTermSpiPredKpi",
                                caption: "asdasdasdasd", //RC 26256752 : Vybrat
                                run: function (ev, ctx) {
                                    var dlg = null;
                                    var closeFun = function () {
                                        dlg.ginlinedialog("close");
                                    }

                                    var arrayofAct = [];
                                    arrayofAct.push({
                                        actionContext: { inlineDlgClsoeFun: closeFun },
                                        action: detailContent.actions.actSslKpisTrasaOkno
                                    });

                                    if (componentDto.ButtonSplnitVisible) {
                                        //label = label.add($("&nbsp; &nbsp; &nbsp;"));
                                        detailContent.actions.actSslKpisTrasaSplnit.enabled(componentDto.ButtonSplnitEnabled);
                                        arrayofAct.push({
                                            actionContext: { inlineDlgClsoeFun: closeFun },
                                            action: detailContent.actions.actSslKpisTrasaSplnit
                                        });
                                    }

                                    if (componentDto.ButtonAnoNeVisible) {

                                        detailContent.actions.actSslKpisTrasaAno.enabled(componentDto.ButtonAnoEnabled);
                                        detailContent.actions.actSslKpisTrasaNe.enabled(componentDto.ButtonNeEnabled);
                                        arrayofAct.push({
                                            actionContext: { inlineDlgClsoeFun: closeFun },
                                            action: detailContent.actions.actSslKpisTrasaAno
                                        });
                                        arrayofAct.push({
                                            actionContext: { inlineDlgClsoeFun: closeFun },
                                            action: detailContent.actions.actSslKpisTrasaNe
                                        });

                                    }


                                    var frmPoznamka = new Gordic.Forms.Form("L-0-12-0 M-0-12-0 S-0-12-0")
                                        .addRow()
                                        .addField("gbuttonpanel", {
                                            mode: "link",
                                            customClass: "gbuttonpanel--transparent",
                                            params: arrayofAct
                                        });
                                        
                                    
                                    var dialogOpts ={
                                        autoClose: true,
                                        related: $(ev.currentTarget), // this.element NOTE: Musi byt table, jinak zlobi padding a pozice. V UCR je lehce posunute (asi o 1px)
                                    }
                                    var isImmediateClose = true;
                                    if (isImmediateClose) {
                                        dialogOpts.commandBar = [];
                                        dialogOpts.closeButton = null;
                                        dialogOpts.createClosed = true; //NOTE: Musi byt vytvoreno skryte a az po vytvoreni otevrit, aby se vyvolala udalost 'open' v momente, kdy jsou jiz registrovane ev. handlery
                                    }

                                    dlg = Gordic.InlineDialogs.simpleForm({
                                        formDescriptor: frmPoznamka,
                                        data: {as:"asssss"},
                                        options: dialogOpts
                                    });

                                    dlg.ginlinedialog("open");
                                }
                            })
                        })
                    );
                }
                */

                //entita
                result.kpis.push(
                    new GObservableObject({ //observable object bude přidán do this.kpis.kpiOne 
                        name: "kpiEntita",
                        //icon: "fa-fw",
                        primaryText: "jres:31937144",  //RC 31937144 : Entita
                        action: new GAction({
                            name: "actKpiEntita", caption:"", run: function () { //RC 29250138 : Vybrat
                                detailContent.formaDokumentu();
                            }
                        })
                        //secondaryText: "",
                    })
                );
                if (componentDto.JeVeSpisu || componentDto.PrirazenoKeSpisu || componentDto.JeVSoucastiNeboTypovemSpisu) {
                    result.kpis.push(
                        new GObservableObject({ //observable object bude přidán do this.kpis.kpiOne 
                            name: "kpiPoziceSpis",
                            icon: "fa-fw",
                            primaryText: "",  //RC 31937159 : Ve spisu
                            //secondaryText: "",
                            action: new GAction({
                                name: "actKpiPoziceSpis", caption: "", run: function () { //RC 29250138 : Vybrat
                                    detailContent.detailSpisuKpiComponent(); //, Gordic.Global.Enums.ModOtevreni.navigateTask
                                }
                            }),
                            toolbar: {
                                top: function () {
                                    return [ {
                                        action: new GAction(
                                                Gordic.Wfl.PreActions.OtevriDokumentDoNoveZalozkyVeStejneFazi({
                                                //inputData: {
                                                //    ixp: componentDto.ixp
                                                //},
                                                inputData: function () {
                                                    var ixp = null;
                                                    if (componentDto.IxpSpisPrir) {
                                                        ixp = componentDto.IxpSpisPrir;
                                                    }
                                                    else if (componentDto.TypSpis == 0 && componentDto.IxpSpisWfl) { // dokument ve spisu
                                                        ixp = componentDto.IxpSpisWfl;
                                                    } else if (componentDto.TypSpis == 1 && componentDto.IxpSoucast) {// spis v součásti
                                                        ixp = componentDto.IxpSoucast;
                                                    } else if (componentDto.TypSpis == 4 && componentDto.IxpSoucast) { // díl v součásti
                                                        ixp = componentDto.IxpSoucast;
                                                    } else if ((componentDto.TypSpis == 3 || componentDto.TypSpis == 5) && componentDto.IxpSpisWfl) { // součást v součásti nebo typovém spisu
                                                        ixp = componentDto.IxpSpisWfl;
                                                    }
                                                    return { ixp: ixp };
                                                },
                                                done: function (retVal) {
                                                    ;
                                                },
                                                fail: function () {
                                                    $.content(this).showFlash(
                                                        "jres:31937457", //RC 31937457 : Novou záložku se nepodařilo otevřít.
                                                        Gordic.Global.Enums.ColorStateClass.error,
                                                        undefined,
                                                        "actOteveniNoveZalozky"
                                                    );
                                                },
                                                actionParams: {
                                                    name: "actOtevreSpisDoNoveZalozky",
                                                    icon: "fa-external-link",
                                                    captionVisible: "never",
                                                    tooltip: 'jres:31937456', //RC 31937456 : Otevře spis do nové záložky
                                                }
                                           
                                            })
                                        )
                                    }];
                                }
                            }
                        })
                    );
                }
                
                if (componentDto.JsouTechnickeVlastnosti) {
                    result.kpis.push(
                        new GObservableObject({ //observable object bude přidán do this.kpis.kpiOne 
                            name: "kpiTechnickeVlastnosti",
                            icon: "fa-fw",
                            //primaryText: componentDto.KpiSignCount, //"jres:26256014", //RC 26256014 : Podpis
                            //secondaryText: componentDto.KpiSignCount,
                            customClass: "kpi-technickeVlastnosti",
                            detailsDirection: "vertical",//"horizontal",
                            meaning:"important",
                            //details:[
                            //    {
                            //        description: componentDto.KpiPodpisText1
                            //    },
                            //    {
                            //        description: componentDto.KpiPodpisText2
                            //    }
                            //],

                            //details: [{ description: " " }, { description: " " }],
                        
                            //secondaryText: ""
                            action: new GAction({
                                name: "actKpiTechnickeVlastnosti", caption: "", run: function () { //RC 29250138 : Vybrat
                                    detailContent.clickKpiTechnickeVlastnosti(); 
                                }
                            })
                        })
                    );
                }
                result.kpis.push(
                    new GObservableObject({ //observable object bude přidán do this.kpis.kpiOne 
                        name: "kpiStav",
                        icon: "gi-detail",
                        primaryText: "jres:26255513", //RC 26255513 : Stav
                        //secondaryText: ""
                        action: new GAction({
                            name: "actkpiStav", caption: "", run: function () { //RC 29250138 : Vybrat
                                if (componentDto.StavPis === 90) {
                                    if (componentDto.IxpPrior != null) {
                                        
                                        var opt = {
                                            DetailDto: {
                                                ixp: componentDto.IxpPrior
                                            }
                                        };
                                        detailContent.otevriNovyDetail(opt);
                                    }
                                }
                            }
                        })
                    })
                );
                
                // trasy
                if (componentDto.psDsgZpravyVisible) {
                    var valueTxt = componentDto.pocetDsgZprav;
                    result.kpis.push(
                        new GObservableObject({
                            name: "kpiDsg",
                            icon: "gi-mail",
                            meaning:"info",
                            primaryText: "jres:31937090", //RC 31937090 : Zprávy DSG
                            secondaryText: valueTxt
                            /*
                            action: new GAction({
                                name: "selectTermSpiPredKpi",
                                caption: "x", //RC 26256752 : Vybrat
                                run: function (ev, ctx) {
                                    //GControlsResultsTab tab = new GControlsResultsTab(
                                    //    new GFilter < GControlsSystemCommon.GControlsResultsFilter > []
                                    //        {
                                    //        new GFilter<GControlsSystemCommon.GControlsResultsFilter>(GControlsSystemCommon.GControlsResultsFilter.ixx_1, OperatorEnum.Equal, Ixp), // pid oteviraneho dokladu
                                    //        new GFilter<GControlsSystemCommon.GControlsResultsFilter>(GControlsSystemCommon.GControlsResultsFilter.typ_ag, OperatorEnum.Equal, UserProcess.SessionInfo.TypAg), // výsledek je určen pro aktuální agendu
                                    //        // Zobrazovat vsechny zpravy tykajici se dokladu (pidu)
                                    //        //new GFilter<GControlsSystemCommon.GControlsResultsFilter>(GControlsSystemCommon.GControlsResultsFilter.ixs_fun_akt, OperatorEnum.Equal, UserProcess.SessionInfo.IxsFun), // výsledek je určen pro aktuální funkci
                                    //        new GFilter<GControlsSystemCommon.GControlsResultsFilter>(GControlsSystemCommon.GControlsResultsFilter.dat_navedomi, OperatorEnum.Equal, GDate.Null), // výsledek dosud nebyl vzat na vědomí
                                    //        new GFilter<GControlsSystemCommon.GControlsResultsFilter>(GControlsSystemCommon.GControlsResultsFilter.typ_vkon, OperatorEnum.NotEqual, new GInt16(10)), // nejedná se o eskalaci
                                    //        new GFilter<GControlsSystemCommon.GControlsResultsFilter>(GControlsSystemCommon.GControlsResultsFilter.typ_vkon, OperatorEnum.NotEqual, new GInt16(900)), // nejedná se o technologický záznam
                                    //        new GFilter<GControlsSystemCommon.GControlsResultsFilter>(GControlsSystemCommon.GControlsResultsFilter.aktivita, OperatorEnum.Equal, new GInt16(100)) // výsledek je aktivní
                                    //    }
                                    //);
                                    //GTab.FindTab(this).Task.AddModalWin("Zprávy DSG", tab, false, FormWindowState.Normal);
                                    //tab.Closed += delegate {
                                    //    OnStateChanged();
                                    //};
                                }
                            })
                            */
                        })
                    );
                }

                if (componentDto.JeKopieAPoznamka) {
                    result.kpis.push(
                        new GObservableObject({ //observable object bude přidán do this.kpis.kpiOne 
                            name: "kpiKopieAPoznamka",
                            icon: "gi-copy",
                            primaryText: "jres:31937255",  //RC 31937255 : Interní úřadování
                            action: new GAction({
                                name: "actKopieAPoznamka", caption: "", run: function () { //RC 29250138 : Vybrat
                                    detailContent.clickKopieAPoznamka(); //, Gordic.Global.Enums.ModOtevreni.navigateTask
                                }
                            })
                        })
                    );
                }

                if (componentDto.PrizVBaliku > 0) {
                    var iconTemplateVBaliku = Gordic.Gin.Globals.Icons.VBaliku();
                    result.kpis.push(
                        new GObservableObject({ //observable object bude přidán do this.kpis.kpiOne 
                            name: "kpiPrizVBaliku",
                            icon: iconTemplateVBaliku.icon,
                            primaryText: iconTemplateVBaliku.text,  //RC 31937255 : Interní úřadování
                            action:
                                new GAction({
                                    name: "actkpiPrizVBaliku",
                                    caption: "",
                                    run: function () { //RC 29250138 : Vybrat
                                        if (detailContent.actions.actBalik) {
                                            detailContent.actions.actBalik.run(); 
                                        }
                                }
                            })
                            
                        })
                    );
                }

                if (componentDto.JeEpkPosouzeni && !componentDto.IsSpis) {
                    result.kpis.push(
                        new GObservableObject({ 
                            name: "kpiPosouzeni",
                            customClass: "kpi-posouzeni" + componentDto.PosouzeniCustomClass ? componentDto.PosouzeniCustomClass : "" ,
                            icon: Gordic.Gin.Icons.ActionEnum.posoudit,
                            meaning: componentDto.PosouzeniColour, // TODO zkontrolovat
                            primaryText: "jres:31937414", //RC 31937414 : Posouzení
                            secondaryText: componentDto.PosouzeniText,

                            action: new GAction({
                                name: "actkpiPosouzeni",
                                caption: "",
                                run: function () { 
                                    detailContent.clickKpiPosouzeni();
                                }
                            })
                        })
                    );
                }

                if (componentDto.TerminDilciDate) {
                    result.kpis.push(new GObservableObject({
                        name: "kpiDilciTermin",
                        icon: "gi-detail",
                        primaryText: "jres:31937428", //RC 31937428 : Dilčí termín
                        secondaryText: ""
                    }));
                }

                if (componentDto.KpiDotceneSubjekty) {
                    result.kpis.push(new GObservableObject({
                        name: "kpiDotceneSubjekty",
                        icon: "gi-group |fa-link g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw",
                        primaryText: "jres:31937427", //RC 31937427 : Dotč. subjekty
                        secondaryText: "",
                        action: new GAction({
                            name: "actDotceneSubjektyKpi", caption: "", run: function () { //RC 29250138 : Vybrat
                                if (detailContent.dotceneSubjekty) {
                                    detailContent.dotceneSubjekty(); 
                                }
                            }
                        })
                    }));
                }

                if (componentDto.IsKpiOdeslaneZasilky) {
                    result.kpis.push(new GObservableObject({
                        name: "kpiOdeslaneZasilky",
                        icon: Gordic.Gin.Globals.Icons.Odeslani().icon,
                        primaryText: "jres:31937432",  //RC 31937432 : Zásilky
                        secondaryText: "0/0/0/0",
                        action: new GAction({
                            name: "actOdeslaneZasilkyKpi", caption: "", run: function () { 
                                if (detailContent.actions.actWflCinnostiOdeslani) {
                                    detailContent.actions.actWflCinnostiOdeslani.run()
                                }
                            }
                        })
                    }));
                }

                if(componentDto.PrizKonfliktSka) {
                    result.kpis.push(new GObservableObject({
                        name: "KpiKonfliktSkartace",
                        icon: "gi-skartace",
                        //meaning: "important",
                        primaryText: "jres:31937547", //RC 31937547 : Skartační konflikt
                        tooltip: "jres:31937548", //RC 31937548 : Nevypořádaný konflikt skartační události
                        secondaryText: ""
                    }));
                }
               

                result.actions = { //může být zadáno jako pole nebo jako objekt

                    actSslKpisTrasaOkno: {
                        caption: "jres:26255201", //RC 26255201 : Trasy
                        run: function (event, actionContext) {
                            if (actionContext.inlineDlgClsoeFun) {
                                actionContext.inlineDlgClsoeFun();
                            }
                            $.content(this).trasyDokumentu();
                        }
                    },

                    actSslKpisTrasaSplnit: {
                        caption: "jres:26256625",  //RC 26256625 : Splnit
                        enabled: true,// componentDto.ButtonSplnitEnabled,
                        visible: true,// componentDto.ButtonSplnitVisible,
                        run: function (event, actionContext) {
                            if (actionContext.inlineDlgClsoeFun) {
                                actionContext.inlineDlgClsoeFun();
                            }
                            $.content(this).SslKpisSplnitClick();
                        }
                    },
                    actSslKpisTrasaAno: {
                        caption: "jres:26256626",  //RC 26256626 : Ano
                        enabled: true,//componentDto.ButtonAnoEnabled,
                        visible: true,// componentDto.ButtonAnoNeVisible,
                        run: function (event, actionContext) {
                            if (actionContext.inlineDlgClsoeFun) {
                                actionContext.inlineDlgClsoeFun();
                            }
                            $.content(this).SslKpisAnoClick();
                        }
                    },
                    actSslKpisTrasaNe: {
                        caption: "jres:26256627",  //RC 26256627 : Ne
                        enabled: true,// componentDto.ButtonNeEnabled,
                        visible: true,//componentDto.ButtonAnoNeVisible,
                        run: function (event, actionContext) {
                            if (actionContext.inlineDlgClsoeFun) {
                                actionContext.inlineDlgClsoeFun();
                            }
                            $.content(this).SslKpisNeClick();
                        }
                    },
                    actOtevriAgenduVNoveZalozceFlash: {
                        caption: "jres:31937251",  //RC 31937251 : Agenda
                        enabled: true,
                        visible: true,
                        run: function (event, actionContext) {
                            var opt = {
                                content: $.content(this),
                                ixx1: componentDto.ixp
                            }
                            Gordic.Wfl.Utils.ZkusOtevritPrislusnyModulVNoveZalozce(opt);
                        }
                    },
                    actOtevriExterniSystemVNoveZalozceFlash: {
                        caption: " ",  //RC 31937251 : Agenda
                        enabled: true,
                        visible: true,
                        run: function (event, actionContext) {
                            var opt = {
                                content: $.content(this),
                                ixx1: componentDto.ixp
                            }
                            Gordic.Wfl.Utils.ZkusOtevritPrislusnyModulVNoveZalozce(opt);
                        }
                    }
                };
                return result;
            }
        }

    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\DetailBuilderComponents\GSslKpiDokumentComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslKpiDokument: {

            create: function (detailContent, componentDto) {

                var result = {};
                result.onInit = [function (builder) {
                    builder.kpiTabOptions = null;

                }];
                result.onBuild = [function () {
                   
                    this.SslKpisDokumentNastavKpi();
                }];
              
                result.contentExtensions = { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                    SslKpisDokumentNastavKpi: function () {

                        var terminText = "";
                        var terminIcon = "fa-fw";
                        var polestavu = this.WflStatusBar_Dto.koleckeIkonDoStatusBaru;
                        if (polestavu) { 
                            for (var i = 0; i < polestavu.length; i++) {
                            
                                // termin
                                if (polestavu[i].name === "actTerminStatus") {
                                    terminIcon = polestavu[i].icon;
                                    terminText = polestavu[i].tooltip;
                                }
                            }
                        }
                        //dílčítermín

                        //if (this.kpis.kpiDilciTermin) { 
                        //    var dat_spl_Dil = Gordic.Utils.DateTime.getStartOfDay(new Date(componentDto.TerminDilciDate))                                                                          // datum splatnosti
                        //    var dat_dns_Dil = Gordic.Utils.DateTime.getStartOfDay(new Date());
                        //    // dnešní datum
                        //    var prekrocenTermin = false;
                        //    var rozdil = Gordic.Utils.DateTime.diff(dat_dns_Dil, dat_spl_Dil,  'days');
                        //    if (rozdil < 0) {
                        //        prekrocenTermin = true;
                        //    }

                        //    var rozdilAbs = Math.abs(rozdil);                                                                   // rozdíl dnů - absolutní hodnota

                        //    this.kpis.kpiDilciTermin.value = rozdilAbs;                                                                                        // naplnění value
                          
                        //    this.kpis.kpiDilciTermin.icon = prekrocenTermin ? "gi-vyrizenopo_bold  g-state-text g-state-error" : "gi-vyrizenopred_bold  g-state-text g-state-warning"  ;
                        //    this.kpis.kpiDilciTermin.primaryText = prekrocenTermin ? "jres:31937092" :  "jres:31937091" ;             //RC 31937092 : Počet dní <b>po dílčím termínu</b>
                        //    this.kpis.kpiDilciTermin.secondaryText = rozdilAbs;
                        //    this.kpis.kpiDilciTermin.secondaryText = "<b>" + Gordic.Templates.Formatters.datetime(new Date(componentDto.TerminDilciDate), "d.M.yyyy") + "</b>"
                        //        + " jres:31937171"  //RC 31937171 : to je
                        //        + " <b>" + rozdilAbs + "</b>"
                        //        + " jres:26256072"; //RC 26256072 : dní


                        //    this.kpis.kpiDilciTermin.meaning = prekrocenTermin ? "negative" : "warning"; //"positive" "info"
                        //    this.kpis.kpiDilciTermin.update();

                        //}
                        
                        //termín
                        if (this.kpis.kpiTermin) {

                            this.kpis.kpiTermin.icon = terminIcon;
                            this.kpis.kpiTermin.primaryText = terminText;

                            if (componentDto.dat_vyriz_do && componentDto.dat_vyriz) {
                                var dat_spl = Gordic.Utils.DateTime.getStartOfDay(new Date(componentDto.dat_vyriz_do));                                                                              // datum splatnosti
                                var dat_dns = Gordic.Utils.DateTime.getStartOfDay(new Date(componentDto.dat_vyriz));                                                                                       // dnešní datum
                                var rozdil = Math.abs(Gordic.Utils.DateTime.diff(dat_dns, dat_spl, 'days'));                                                                   // rozdíl dnů - absolutní hodnota

                                this.kpis.kpiTermin.value = rozdil;                                                                                        // naplnění value

                                this.kpis.kpiTermin.secondaryText = "<b>" + Gordic.Templates.Formatters.datetime(new Date(componentDto.dat_vyriz_do), "d.M.yyyy") + "</b>"
                                    + " jres:31937459" //RC 31937459 : rozdíl byl
                                    + " <b>" + rozdil + "</b>"
                                    + " jres:26256072"; //RC 26256072 : dní
                            } else {
                                var dat_spl = Gordic.Utils.DateTime.getStartOfDay(new Date(componentDto.dat_vyriz_do));                                                                              // datum splatnosti
                                var dat_dns = Gordic.Utils.DateTime.getStartOfDay(new Date());                                                                                       // dnešní datum
                                var rozdil = Math.abs(Gordic.Utils.DateTime.diff(dat_dns, dat_spl, 'days'));                                                                   // rozdíl dnů - absolutní hodnota

                                this.kpis.kpiTermin.value = rozdil;                                                                                        // naplnění value

                                this.kpis.kpiTermin.secondaryText = "<b>" + Gordic.Templates.Formatters.datetime(new Date(componentDto.dat_vyriz_do), "d.M.yyyy") + "</b>"
                                    + " jres:31937171" //RC 31937171 : to je
                                    + " <b>" + rozdil + "</b>"
                                    + " jres:26256072"; //RC 26256072 : dní
                            }
                           

                            this.kpis.kpiTermin.update();
                        }

                        // pčidat upozornění na projití třeba ikonku do stavoveho Kpi

                        // ssl_upoztermdni pro spis
                        // ssl_upterdokdni pro dokument

                    }

                };
                result.kpis = [];
                //if (componentDto.TerminDilciDate) {
                //    result.kpis.push(new GObservableObject({
                //        name:"kpiDilciTermin",
                //        icon:"gi-detail",
                //        primaryText: "Dilčí termín",
                //        secondaryText: ""
                //    }));
                //}

                if (componentDto.dat_vyriz_do) {
                    result.kpis.push(new GObservableObject({
                        name: "kpiTermin",
                        icon: "gi-plus",
                        primaryText: "Termín",
                        secondaryText: ""
                    }));
                }

                if (componentDto.EntitaJeKopie) {
                    result.kpis.push(new GObservableObject({
                        name: "kpiEntitaJeKopie",
                        icon: "gi-copy",
                        primaryText: "Kopie",
                        meaning: "info",
                        //,secondaryText: ""
                        action: new GAction({
                            name: "actkpiEntitaJeKopie", caption: "", run: function () { 
                                if (typeof detailContent.kopieDokumentu === 'function') {
                                    detailContent.kopieDokumentu();
                                }
                            }
                        })
                    }));
                }
                 
                
                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\DetailBuilderComponents\GSslKpiSpisComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslKpiSpis: {

            create: function (detailContent, componentDto) {

                var result = {};
                //result.onInit = [function (builder) {
                    
                //}];
                result.onBuild = [function () {
                    this.SslKpisSpisNastavKpi();
                }];

                result.contentExtensions = { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                    SslKpisSpisNastavKpi: function () {
                        //termín
                        var terminText = "";
                        var terminIcon = "fa-fw";
                        var polestavu = this.WflStatusBar_Dto.koleckeIkonDoStatusBaru;
                        if (polestavu) { 
                            for (var i = 0; i < polestavu.length; i++) {

                                // termin
                                if (polestavu[i].name === "actTerminStatus") {
                                    terminIcon = polestavu[i].icon;
                                    terminText = polestavu[i].tooltip;
                                }
                            }
                        }
                        if (this.kpis.kpiTermin) {

                            this.kpis.kpiTermin.icon = terminIcon;
                            //this.kpis.kpiTermin.meaning = componentDto.stav_pisColour;
                            this.kpis.kpiTermin.primaryText = terminText;

                            if (componentDto.dat_vyriz_do && componentDto.dat_vyriz) {
                                var dat_spl = Gordic.Utils.DateTime.getStartOfDay(new Date(componentDto.dat_vyriz_do));                                                                              // datum splatnosti
                                var dat_dns = Gordic.Utils.DateTime.getStartOfDay(new Date(componentDto.dat_vyriz));                                                                                       // dnešní datum
                                var rozdil = Math.abs(Gordic.Utils.DateTime.diff(dat_dns, dat_spl, 'days'));
                                // rozdíl dnů - absolutní hodnota

                                this.kpis.kpiTermin.value = rozdil;                                                                                        // naplnění value
                                //this.kpis.kpiTermin.secondaryText = rozdil;
                                this.kpis.kpiTermin.secondaryText = "<b>" + Gordic.Templates.Formatters.datetime(new Date(componentDto.dat_vyriz_do), "d.M.yyyy") + "</b>"
                                    + " jres:31937459" //RC 31937459 : rozdíl byl
                                    + " <b>" + rozdil + "</b>"
                                    + " jres:26256072"; //RC 26256072 : dní
                            }
                            else {
                                var dat_spl = Gordic.Utils.DateTime.getStartOfDay(new Date(componentDto.dat_vyriz_do));                                                                              // datum splatnosti
                                var dat_dns = Gordic.Utils.DateTime.getStartOfDay(new Date());                                                                                       // dnešní datum
                                var rozdil = Math.abs(Gordic.Utils.DateTime.diff(dat_dns, dat_spl, 'days'));
                                // rozdíl dnů - absolutní hodnota

                                this.kpis.kpiTermin.value = rozdil;                                                                                        // naplnění value
                                //this.kpis.kpiTermin.secondaryText = rozdil;
                                this.kpis.kpiTermin.secondaryText = "<b>" + Gordic.Templates.Formatters.datetime(new Date(componentDto.dat_vyriz_do), "d.M.yyyy") + "</b>"
                                    + " jres:31937171" //RC 31937171 : to je
                                    + " <b>" + rozdil + "</b>"
                                    + " jres:26256072"; //RC 26256072 : dní
                            }

                            this.kpis.kpiTermin.update();
                        }
                    },
                    detailDiluKpiSpisComponent: function () {
                        var that = this;
                        if (componentDto.IxpDil) {
                            var opt = {
                                DetailDto: {
                                    ixp: componentDto.IxpDil
                                },
                            };
                            this.otevriNovyDetail(opt);
                        }
                    }
                };
                result.kpis = [];

                if (componentDto.dat_vyriz_do) {
                    result.kpis.push(new GObservableObject({
                        name: "kpiTermin",
                        icon: "gi-plus",
                        primaryText: "jres:31937434", //RC 31937434 : Termín
                        secondaryText: ""
                    }));
                }

                if (componentDto.IxpDil) {
                    result.kpis.push(
                        new GObservableObject({ //observable object bude přidán do this.kpis.kpiOne 
                            name: "kpiPoziceDil",
                            icon: 'gi-spis_dil',
                            //icon: "gi-folder_bold_D",
                            primaryText: "jres:31937544", //RC 31937544 : Vloženo v dílu
                            //secondaryText: "",
                            action: new GAction({
                                name: "actKpiPoziceDil", caption: "", run: function () { //RC 29250138 : Vybrat
                                    detailContent.detailDiluKpiSpisComponent(); //, Gordic.Global.Enums.ModOtevreni.navigateTask
                                }
                            }),
                            toolbar: {
                                top: function () {
                                    return [{
                                        action: new GAction(
                                            Gordic.Wfl.PreActions.OtevriDokumentDoNoveZalozkyVeStejneFazi({
                                                //inputData: {
                                                //    ixp: componentDto.ixp
                                                //},
                                                inputData: function () {
                                                    var ixp = null;
                                                    if (componentDto.IxpDil) {
                                                        ixp = componentDto.IxpDil;
                                                    }
                                                    return { ixp: ixp };
                                                },
                                                done: function (retVal) {
                                                    ;
                                                },
                                                fail: function () {
                                                    $.content(this).showFlash(
                                                        "jres:31937457", //RC 31937457 : Novou záložku se nepodařilo otevřít.
                                                        Gordic.Global.Enums.ColorStateClass.error,
                                                        undefined,
                                                        "actOteveniNoveZalozky"
                                                    );
                                                },
                                                actionParams: {
                                                    name: "actOtevreDilDoNoveZalozky",
                                                    icon: "fa-external-link",
                                                    captionVisible: "never",
                                                    tooltip: 'jres:31937545', //RC 31937545 : Otevře díl do nové záložky
                                                }

                                            })
                                        )
                                    }];
                                }
                            }
                        })
                    );

                }

                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\DetailBuilderComponents\GSslDetailVlastnostiComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslDetailVlastnosti: {
            create: function (componentDto) {
                var result = {
                    onBuild: [
                        function () {
                            var cnt = this;

                            // thazmuka (01.07.2020) - přenos vlastností přes hledačku PIDu
                            this.descProps_setup({
                                readOnly: !this.EditMode,
                                selectIxx: function () {
                                    //#region -- selector Ixx --
                                    var dfd = $.Deferred();
                                    Gordic.Wfl.Dialogs.GHledatIdentDokSpisDlg(cnt)
                                        .then(function (result) {
                                            if (result == null) {
                                                dfd.reject();
                                            }
                                            else {
                                                dfd.resolve({ ixx: result.ixp })
                                            }
                                        })
                                    return dfd.promise();
                                    //#endregion
                                }
                            });

                            this.enableSslDetailVlastnosti();
                            this.nasetujVlastnosti(this.SslDetailVlastnosti_Dto);
                        },
                    ],
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady
                        predUlozenimSslDetailVlastnosti: function () {
                            var promis = $.Deferred();
                            var obj = {};
                            var retVal = Gordic.PopisneVlastnosti.collectValues(this);
                            if (retVal) {
                                obj.Vlastnosti = retVal;
                            }
                            promis.resolve(obj);
                            return promis;
                            
                        },
                        nasetujVlastnosti: function (dto) {
                            Gordic.PopisneVlastnosti.applyValues(this, dto.dataVlastnosti);
                        },
                        //#region akce
                        
                        //#endregion
                        enableSslDetailVlastnosti: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true) {
                                l_bActionEnabled = false;
                            }
                        }
                    },
                };
                return result;
            }
        }
    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.WebClient\Gin\Ssl\Detail\DetailBuilderComponents\GSslDetailKatastrComponent.js 

(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {

        SslDetailKatastr: {

            create: function (componentDto) {
                var result = {
                    onMenuBuild: [
                        function (builder, menus) {
                            this.enableSslDetailKatastrActions();
                        }
                    ],
                    onBuild: [
                        function () {
                            this.enableSslDetailKatastr();
                            this.nasetujKatastr(this.SslDetailKatastr_Dto);

                            if (this.ReadOnlyEko && this.JinaAgenda) {
                                this.enableReadOnlyEkoKatastr();
                            }
                        },
                    ],
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                        nasetujKatastr: function (dto) {
                            var that = this;
                            var form = this.findForms("formSslKatastr");
                            //form.addHelpContext("DetailKatastr");

                            var fields = form.findFields();

                            fields.gfield("model", "apply", dto);
                            fields.gfield("model", "validators", componentDto.Validators);
                            form.gform("waitForValues").done(function () {
                                if (Gordic.Utils.WidgetExists("gfield", fields)) {
                                    Utils.Form.markRequired(fields);
                                    fields.gfield("confirm");
                                }
                            });
                        },

                        saveSslDetailKatastr: function () {
                            var katastrModel = {
                                IsDetailKatastr: true
                            };
                            var katastrForm = this.findForms("formSslKatastr");
                            katastrForm.findFields().gfield("model", "collect", katastrModel);
                            if (katastrForm.gform("hasChanged")) {
                                katastrModel.MetadataChanged = true;
                            }
                            return katastrModel;
                        },

                        saveSslDetailKatastrEko: function () {

                            var katastrModel = {
                                IsDetailKatastr: true
                            };
                            var katastrForm = this.findForms("formSslKatastr");
                            katastrForm.findFields().gfield("model", "collect", katastrModel);
                            if (katastrForm.gform("hasChanged")) {
                                katastrModel.MetadataChanged = true;
                            }

                            var retDto = {};

                            retDto.Katastr = retDto.Katastr ? retDto.Katastr : {};
                            retDto.Katastr.poznamka = katastrModel.PoznamkaDoruceni;

                            return retDto;
                        },

                        //#region akce
                        //Detail DZ
                        pridatClick: function (prizNadr) {
                            var that = this;
                            var ixp = componentDto.ixp;

                            var l_oParamsJSON = {
                                Ixp: ixp
                            };
                            Gordic.Ssl.Dialogs.EditKatastrDlg(that, l_oParamsJSON).on("closed", function (ev, retVal) {
                                that.Reload();
                            });
                        },
                       
                        upravitClick: function () {
                            var that = this;
                            var ixp = componentDto.ixp;

                            var selection = this.gridKatastry.ggrid("getSelection", true);

                            if(selection.length === 1) {
                                var row = selection[0].data;

                                var l_oParamsJSON = {
                                    Ixp: ixp,
                                    Row: row
                                };
                                Gordic.Ssl.Dialogs.EditKatastrDlg(that, l_oParamsJSON).on("closed", function (ev, retVal) {
                                    if (retVal) {
                                        that.Reload();
                                    }
                                });
                            } else {
                                this.dialogs.alert("jres:26257407"); //RC 26257407 : Vyberte jeden řádek
                            }
                        },

                        odstranitClick: function () {
                            var that = this;
                            var ixp = componentDto.ixp;

                            var selection = this.gridKatastry.ggrid("getSelection", true);

                            if (selection.length === 1) {

                                this.dialogs.confirm("jres:26257406", "jres:26257405", 500, 150).on("close", function (ev, retVal) { //RC 26257405 : Opravdu si přejete odstranit tento záznam z databáze?
                                    if (retVal === "yes") {

                                        var row = selection[0].data;

                                        var opt = {
                                            "Ixp": row.ixp,
                                            "PorCislo": row.por_cislo
                                        };

                                        var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                        srv.call(["OdstranitKatastr", opt])
                                            .always(function (rv) {
                                                if (rv != null && rv.ErrorMessage != null && rv.ErrorMessage != "") {
                                                    that.dialogs.error(rv.ErrorMessage);
                                                }
                                                that.Reload();
                                            });
                                    }
                                });

                            } else {
                                this.dialogs.alert("jres:26257407"); //RC 26257407 : Vyberte jeden řádek
                            }
                        },

                        //#endregion
                        enableSslDetailKatastrActions: function () {
                            var l_bActionEnabled = true;
                            if (componentDto.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }
                            this.actions.actPridat.update({ /*enabled: componentDto.TiskPruvodkyEnabled,*/ visible: true });
                            this.actions.actUpravit.update({ /*enabled: componentDto.DetailDZEnabled,*/ visible: true });
                            this.actions.actOdstranit.update({ /*enabled: componentDto.DetailNadrDZEnabled,*/ visible: true });
                           // this.actions.actTisk.update({/* enabled: componentDto.InfoISDSEnabled,*/ visible: true });
                        },
                        enableSslDetailKatastr: function () {

                            var l_bActionEnabled = true;
                            if (componentDto.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }

                            var fieldEnabled = componentDto.EditMode || this.RezimPodani != 0;
                            this.findFields("Poznamka"
                            ).gfield("option", "disabled", !fieldEnabled);

                        },
                        enableReadOnlyEkoKatastr: function () {
 
                            this.findFields("Poznamka"
                            ).gfield("option", "disabled", true);

                        },
                        LoadGrid: function () {
                            var that = this;

                            var gridColumnsDefinition = new Gordic.Data.GridFormat();

                            gridColumnsDefinition
                                .addTextColumn({
                                    name: "cis_katastr_txt",
                                    caption: "jres:26257396", //RC 26257396 : Katastrální území
                                })
                                .addTextColumn({
                                    name: "cis_cam_txt",
                                    caption: "jres:26257397", //RC 26257397 : Praha 1 - 10
                                })
                                .addTextColumn({
                                    name: "cis_mc_txt",
                                    caption: "jres:26257398", //RC 26257398 : Městská část
                                })
                                .addTextColumn({
                                    name: "cis_parcelni",
                                    caption: "jres:26257399", //RC 26257399 : Číslo parcelní
                                })
                                .addTextColumn({
                                    name: "poznamka",
                                    caption: "jres:26257400", //RC 26257400 : Poznámka
                                })
                                .addTextColumn({
                                    name: "cis_pop",
                                    caption: "jres:26257403", //RC 26257403 : Číslo popisné
                                })
                                .addTextColumn({
                                    name: "esu_txt",
                                    caption: "jres:26257401", //RC 26257401 : Vlastník
                                });


                            this.gridKatastry = $("<div>").appendTo(this.element)
                                .gautofit()
                                .ggrid({
                                    name: "GridKatastry",
                                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                                    columnMode: "fit",  // fit (defaultne by melo byt toto), full
                                    customClass: "js-gridKartoteka",
                                    navigationMode: "row", // row, cell
                                    rowsChecked: "checked",
                                    //rowsEnabled: function (dataRow) {
                                    //    if(dataRow && dataRow.data && dataRow.data.dat_pozadavku != null) {
                                    //        return false;
                                    //    }
                                    //    return true;
                                    //},
                                    rowsClass: function (dataRow) {
                                        if (dataRow && dataRow.data && dataRow.data.dat_pozadavku != null) {
                                            return " grid-noview-wfl-list ";
                                        } else return "  ";
                                    },
                                    searchColumns: ["nazev_rf", "dat_pozadavku"], //sloupce, podle kterych se vyhledava v searchboxu
                                    columns: gridColumnsDefinition,
                                    selection: function (ev, ctx) {
                                      //  var selection = ctx.getSelection();
                                    },
                                });

                            this.LoadData();
                        },
                        LoadData: function () {
                            var that = this;

                            //nacteni dat do gridu
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            srv.call("SeznamKatastruProDokument", { "Ixp": this.DetailDto.ixp })
                                .done(function (retVal) {
                                    if (retVal) {
                                        debugger;

                                        var view = new Gordic.Data.View(retVal, { key: "por_cislo" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                                        that.gridKatastry.ggrid("setData", view, true);     //true = prekresleni gridu
                                    }
                                });
                        },
                        Reload: function () {
                            this.LoadData();
                        },


                    },

                    actions: { //může být zadáno jako pole nebo jako objekt

                        actPridat: {
                            caption: "jres:26257393", //RC 26257393 : Přidat
                            icon: "fa-plus",
                            run: function () {
                                $.content(this).pridatClick(); // TODO
                            }
                        },
                        actUpravit: {
                            caption: "jres:26257394",  //RC 26257394 : Upravit  
                            icon: "gi-pencil",
                            run: function () {
                                $.content(this).upravitClick(); // TODO
                            }
                        },
                        actOdstranit: {
                            caption: "jres:26257395", //RC 26257395 : Odstranit
                            icon: "gi-bin",
                            run: function () {
                                $.content(this).odstranitClick(); // TODO
                            }
                        }
                        //actTisk: GAction.createPrintAction({ // TODO
                        //    name: "actTisk", 
                        // //   tema: "pod_ptm_pruelpo",
                        //    caption: "jres:26257392", //RC 26257392 : Tisk
                        //    reportStarting: function (rep) {
                        //        //rep.params.X0000 = $.content(this).findFields("IdElPodani").gfield("getValue");
                        //        //rep.params.X0001 = componentDto.IxsIsu;
                        //        //rep.params.X0002 = componentDto.ixp;
                        //        //rep.params.Preselect = false;
                        //    },
                        //})
                    },

                    tabs: {
                        SslKatastr: {
                            tabParams: {
                                title: "jres:26257388" //RC 26257388 : Katastr
                                , opened: true,  //1. tab je pro agednovou hlavičku, ta je pro dokumenty, spisy, zakázky atp. vždy L2M2S1. BO detaily mimo wfl (tzn. dokumenty, spisy) jsou v L1M1S1 //RC 26255308 : Dokument
                                menuBar: [
                                    { action: "actPridat", favorite: true },
                                    { action: "actUpravit", favorite: true },
                                    { action: "actOdstranit", favorite: true },
                                  //  { action: "actTisk", favorite: true },
                                ],
                                group: Gordic.Prefabs.TabGroups.Katastr()
                            },

                            init: function (tab) {
                                //#region definice tab dokumentu
                                var that = $.content(tab);

                                var katastrForm = new Gordic.Forms
                                    .Form({ 
                                            name: "formSslKatastr", 
                                              layoutDescriptor: "L2M2S1, L-3-9-0, M-3-9-0, S-12-12-0"
                                        });
                              
                                katastrForm
                                    .addSection()
                                    .addRow("jres:26257391") //RC 26257391 : Poznámka
                                        .addField("gstringbox", {
                                            name: "Poznamka",
                                        });
                               

                                katastrForm.addSection();

                                $("<div>").appendTo(tab)
                                    .gform("createFrom", katastrForm);

                                that.LoadGrid();
                                //#endregion
                            }
                        }
                    },

                };

                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);

//#endregion


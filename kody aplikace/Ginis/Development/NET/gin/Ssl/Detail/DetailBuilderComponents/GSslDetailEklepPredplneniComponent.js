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
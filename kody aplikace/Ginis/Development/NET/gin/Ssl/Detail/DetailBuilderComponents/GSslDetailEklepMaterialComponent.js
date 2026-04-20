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
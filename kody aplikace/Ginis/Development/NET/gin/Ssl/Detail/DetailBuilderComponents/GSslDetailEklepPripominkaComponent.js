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
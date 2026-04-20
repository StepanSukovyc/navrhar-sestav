
(function ($) {
    "use strict";
    namespace("Gordic.Esu.WebClient.ZastupyGridDlg", {
        title: "jres:26265468", //RC 26265468 : Zástupné osoby
        _jenAktivni: false,
        prepareContent: function (value) {

            var that = this;
            this.enablePrevzit = false;
            var tooltip = "jres:31900492"; //RC 31900492 : V tomto výběru nelze převzít zástupnou osobu
            if (value.EditMode > 1) {
                this.enablePrevzit = true;
                tooltip = "jres:31900493"; //RC 31900493 : Převzít zástupnou osobu
            }
            this.EditMode = value.EditMode;
            this.ixs_esu = value.Ixs_esu;
            this.Logovani = value.Logovani;
            this.others = value.others;

            if(this.userSettings) {
                this._jenAktivni = this.userSettings.get("ShowOnlyActiveRows") === true;
            }

            this.actions.addRange({
                actPrevzit: {
                    name: "actPrevzit",
                    caption: "jres:26265114", //RC 26265114 : Převzít
                    enabled: (this.enablePrevzit && value.PoleZastupu != null && value.PoleZastupu.length > 0) ? true : false,
                    tooltip: tooltip,
                    icon: "gi-accept",
                    customClass: "g-button--primary",
                    run: function (ev, ctx) {
                        that.prevzit();
                    }
                },
                actClose: {
                    name: "actClose",
                    caption: "jres:26265415", //RC 26265415 : Zavřít
                    icon:"gi-window-close",
                    tooltip: "jres:26265415", //RC 26265415 : Zavřít
                    run: function (ev, ctx) {
                        that.closeDet();
                    }
                },
                actvybrat: {
                    name: "actvybrat",
                    run: function (ev, ctx) {
                        that.prevzit();
                    }
                },
                actDetailNovy: {
                    name: "actDetailNovy",
                    caption: "Nový", 
                    enabled: true,//this.enablePrevzit,
                    icon: "gi-detail",

                    run: function (ev, ctx) {
                        that.detailESUNovy();
                    }
                },
                actDetailEditace: {
                    name: "actDetailEditace",
                    caption: "Editovat",
                    enabled: true,
                    icon: "gi-pencil",
                    run: function (ev, ctx) {
                        that.detailESUEditace();
                    }
                },
                actJenAktivni: {
                    name: "actJenAktivni",
                    caption: that._jenAktivni === true ? "jres:26265471" : "jres:26265469",  //RC 26265471 : I neaktivní
                    tooltip: that._jenAktivni === true ? "jres:26265472" : "jres:26265470", //RC 26265472 : Zobrazit i neaktivní
                    enabled: true,
                    icon: undefined,
                    run: function (ev, ctx) {
                        that._jenAktivni = !that._jenAktivni;
                        const newActivityState = that._jenAktivni;

                        that.userSettings.set("ShowOnlyActiveRows", newActivityState);

                        this.update({ /*icon: newActivityState ? "gi-tick" : undefined,*/ checked: newActivityState, caption: newActivityState ? "jres:26265473" : "jres:26265474", tooltip: newActivityState ? "jres:26265475" : "jres:26265476" }) //RC 26265476 : Zobrazit jen aktivní
                        // that.refresh(false);
                        that.refreshGridu();
                    }
                },

            });

            Gordic.Gin.WebClient.GK203Handler.GetK203Params(that)
                .then((k203Params) => {
                    that.actions.actDetailNovy.enabled(k203Params.gin_esu_rp_new === 1);
                    that.actions.actDetailEditace.enabled(((value.PoleZastupu != null && value.PoleZastupu.length > 0) ? true : false) && ((k203Params.ssl_opra_esu === "ano") || k203Params.PrizEko));
                });

            this.menuBar([
                { action: "actDetailNovy", favorite: true },
                { action: "actDetailEditace", favorite: true },

                { action: "actJenAktivni", favorite: true, align: "opposite", visible: true }
            ]);
            
            this.commandBar([
                { action: "actPrevzit" },
                { action: "actClose" },
            ]);
           

            //#region Grid Zastupne osoby

            this.dataProGrid = new Gordic.Data.View(value.PoleZastupu, { key: "por_zast" });

            that.gridZastupy = $("<div>").appendTo(this.element)
                .gautofit()
                .ggrid({
                    name: "GridZastupy",
                    data: this.dataProGrid,
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "full",  // fit, full
                    customClass: "js-gridZastupy",
                    navigationMode: "row", // row, cell
                    defaultAction: $.content(this).actions.actvybrat,
                    rowsClass: function (dataRow) {
                        if (dataRow && dataRow.data && dataRow.data.aktivita !== 100) {
                            return " ui-disabled data-deleted ";
                        } else return " ";
                    },
                    // multi: true,

                    //scrollHelperTemplate: "{obec}-{ulice}",  // "{ixs_esu} - {nazev}",
                    /*
                    searchColumns: ["por_zast"],
                    */
                    columns: new Gordic.Data.GridFormat()
                        .addNumberColumn({
                            name: "por_zast",
                            caption: "jres:26265162", //RC 26265162 : Pořadí
                            description: "jres:26265162", //RC 26265162 : Pořadí
                            //customClass: "ui-disabled center",
                            cellTemplate: "{por_zast:number:D6}",
                            //sortOrder: Gordic.Data.Sorting.Inline.number("por_zast", false),
                            width: 40,
                            //  fixedWidth: true,

                        })
                        .addTextColumn({
                            width: 100,
                            name: "utvar",
                            caption: "jres:31900393", //RC 31900393 : Útvar/Funkce pro DS
                        })
                        .addTextColumn({
                            width: 90,
                            name: "tit_pred",
                            caption: "jres:31900388", //RC 31900388 : Titul Před
                        })

                        .addTextColumn({
                            width: 150,
                            name: "jmeno",
                            caption: "jres:26265153", //RC 26265153 : Jméno
                        })
                        .addTextColumn({
                            width: 150,
                            name: "prijmeni",
                            caption: "jres:26265152", //RC 26265152 : Příjmení
                        })
                        .addTextColumn({
                            width: 80,
                            name: "tit_za",
                            caption: "jres:31900389", //RC 31900389 : Titul Za
                        })
                        .addTextColumn({
                            width: 100,
                            name: "funkce",
                            caption: "jres:26265165", //RC 26265165 : Funkce
                        })
                        .addTextColumn({
                            name: "tel",
                            caption: "jres:26265166", //RC 26265166 : Tel.
                        })
                        .addTextColumn({
                            name: "mail",
                            caption: "jres:26265155", //RC 26265155 : Mail
                        })
                        .addTextColumn({
                            name: "fax",
                            caption: "jres:26265167", //RC 26265167 : Fax
                        })
                        .addTextColumn({
                            name: "st0",
                            description: "jres:31900494", //RC 31900494 : Řádek 1 v obalkové adrese
                            caption: "jres:31900495", //RC 31900495 : Ř.1
                        })
                        .addTextColumn({
                            name: "st1",
                            description: "jres:31900496", //RC 31900496 : Řádek 2 v obalkové adrese
                            caption: "jres:31900497", //RC 31900497 : Ř.2
                        })
                        .addTextColumn({
                            name: "st2",
                            description: "jres:31900498", //RC 31900498 : Řádek 3 v obalkové adrese
                            caption: "jres:31900499", //RC 31900499 : Ř.3
                        })
                        .addTextColumn({
                            name: "st3",
                            caption: "jres:31900673", //RC 31900673 : Ř.4
                            description: "jres:31900672", //RC 31900672 : Řádek 4 v obalkové adrese
                        })
                        .addTextColumn({
                            name: "st4",
                            caption: "jres:31900500", //RC 31900500 : Ř.5
                            description: "jres:31900501", //RC 31900501 : Řádek 5 v obalkové adrese
                        })
                        .addTextColumn({
                            name: "st5",
                            caption: "jres:31900503", //RC 31900503 : Ř.6
                            description: "jres:31900502", //RC 31900502 : Řádek 6 v obalkové adrese
                        })
                        .addTextColumn({
                            name: "st6",
                            caption: "jres:31900505", //RC 31900505 : Ř.7
                            description: "jres:31900504", //RC 31900504 : Řádek 7 v obalkové adrese
                        })
                        .addTextColumn({
                            name: "st7",
                            caption: "jres:31900506", //RC 31900506 : Ř.8
                            description: "jres:31900507", //RC 31900507 : Řádek 8 v obalkové adrese
                        })
                        .addTextColumn({
                            name: "zmenu_prov_txt",
                            caption: "jres:26265161", //RC 26265161 : Změnu provedl
                            width: 150,
                        })
                        .addTextColumn({
                            name: "zmenu_prov_pristup_txt",
                            caption: "jres:31900394", //RC 31900394 : Přístup
                            width: 150,
                        })
                        .addTextColumn({
                            width: 150,
                            name: "id_vnitr_adr",
                            caption: "jres:31900395", //RC 31900395 : ID vnitřní adresy
                        })
                        .addIconColumn({
                            name: "aktivita",
                            caption: "",
                            width: 70,
                            iconTemplate: function (data) {
                                switch (data.aktivita) {
                                    case 100: return {
                                        icon: "fa-check-circle-o g-state-text g-state-success",
                                        text: "jres:26265299", //RC 26265299 : Aktivní
                                        tooltip: "jres:26265299" //RC 26265299 : Aktivní
                                    };
                                    case 500: return {
                                        icon: "fa-times g-state-text g-state-error",
                                        text: "jres:32115009", //RC 32115009 : Neaktivní
                                        tooltip: "jres:32115009" //RC 32115009 : Neaktivní
                                    };
                                    default: return null;
                                }
                            }
                        })
                });


            this.oznacVybraneho(value);
            //#endregion
        },
        oznacVybraneho: function (value) {
            if (value.PoleZastupu != null && value.PoleZastupu.length > 0 && value.others != null && value.others.filterMail != null) {
                for (var i = 0; i < value.PoleZastupu.length; i++) {
                    if (value.PoleZastupu[i].mail === value.others.filterMail) {
                        var porZastSeStejnymMail = value.PoleZastupu[i].por_zast;
                        this.gridZastupy.ggrid("activeRow", porZastSeStejnymMail);
                    }
                }
            }
            else if (value.por_zastVybraneho != null) {
                this.gridZastupy.ggrid("activeRow", value.por_zastVybraneho);
            }
        },

        prevzit: function () {
            var that = this;
            if (this.enablePrevzit) { 
                var sel = that.gridZastupy.ggrid("getSelection");
                if (sel.length === 1 && sel[0].aktivita !== 100) {
                    this.dialogs.alert("jres:31900508"); //RC 31900508 : Nelze převzít neaktivní zástup.
                    return;
                }
                this.close({ zastupy: sel }); //tryClose
            }
        },
        closeDet: function () {
            $.content(this).tryClose();
        },

        refreshGridu: function () {
            var that = this;
            this.beginOperation();

            Gordic.Esu.Utils.NactiZastupneOsoby(this.ixs_esu, this.Logovani, this._jenAktivni, this)
                .then(function (ListZastupu) {
                    that.dataProGrid.updateData(ListZastupu, "set");
                    that.actions.actDetailEditace.update({ enabled: (ListZastupu != null && ListZastupu.length > 0) ? true : false });
                    that.actions.actPrevzit.update({ enabled: (that.enablePrevzit && ListZastupu != null && ListZastupu.length > 0) ? true : false });
                    that.endOperation();

                });
        },

        detailESUNovy: function () {
            var that = this;
            var opt = {
                IxsEsu: this.ixs_esu,
                //Ucel: this.enablePrevzit? 2: 1 ,
                Ucel: 2,
                Logovani: this.Logovani,
                EditaceNeboZalozeniZastupneOsobyDto: {
                    ixs_esu: this.ixs_esu,
                    lic: "###VytvorNovyZastup###"
                }
                //EnableChangeZOInTypZobrazeniDetail: this.enablePrevzit ? true :false,
            };
            Gordic.Esu.Dialogs.DetailEsuDlg(this, opt)
                .on("closed", function (ev, retVal) {
                    //if (retVal && retVal.ulozeno) {
                   
                    //}
                    that.refreshGridu();
            });
        },
        detailESUEditace: function () {
            var that = this;
            var vybranaZo = this.gridZastupy.ggrid("activeRow");
            if (vybranaZo) { 
                var opt = {
                    IxsEsu: this.ixs_esu,
                    //Ucel: this.enablePrevzit? 2: 1 ,
                    Ucel: 2,
                    Logovani: this.Logovani,
                    EditaceNeboZalozeniZastupneOsobyDto: {
                        ixs_esu: this.ixs_esu,
                        lic: vybranaZo.lic,
                        por_zast: vybranaZo.por_zast
                    }
                    //EnableChangeZOInTypZobrazeniDetail: this.enablePrevzit ? true :false,
                };
                Gordic.Esu.Dialogs.DetailEsuDlg(this, opt)
                    .on("closed", function (ev, retVal) {
                        //if (retVal && retVal.ulozeno) {

                        //}
                        that.refreshGridu();
                    });
            }
        },

        closing: function () { // podmineny userClose 
            var def = $.Deferred();
            def.resolve();
            return def.promise();
        }

    }, { extendIntellisense: GContent });
})(jQuery);
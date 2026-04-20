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
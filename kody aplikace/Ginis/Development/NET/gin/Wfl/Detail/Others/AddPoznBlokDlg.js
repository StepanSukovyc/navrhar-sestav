(function ($) {
    "use strict";
    namespace("Gordic.Wfl.AddPoznBlokDlg", {
        editMode: false,
        editedRow: null,

        onContentReady: function () {
            var that = this;
            this.title = "jres:26227410"; //RC 26227410 : Pracovní bloky

            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            this.actions.addRange({
                actOdstranit: {
                    icon: "fa-remove",
                    caption: "jres:26225261", //RC 26225261 : Odstranit
                    run: function (ev, ctx) { 
                        var selection = that.gridPoznBloky.ggrid("getSelection");
                        that.RemoveClick(selection);
                    }
                },
                actEditovat: {
                    icon: "gi-pencil",
                    caption: "jres:26227646", //RC 26227646 : Editovat
                    run: function (ev, ctx) {
                        var selection = that.gridPoznBloky.ggrid("getSelection");
                        that.EditClick(selection);
                    }
                },
                actVychozi: {
                    icon: "gi-pencil",
                    caption: "jres:26228019", //RC 26228019 : Výchozí
                    run: function (ev, ctx) {
                        var selection = that.gridPoznBloky.ggrid("getSelection");
                        that.DefaultClick(selection);
                    }
                },
                /*   act2: { icon: "fa-bookmark", run: $.noop },
                   act3: { icon: "fa-book", run: $.noop },*/
            });

            this.menuBar([
                {
                    action: this.actions.actOdstranit,
                    favorite: true
                },
                {
                    action: this.actions.actEditovat,
                    favorite: true
                },
                {
                    action: this.actions.actVychozi,
                    favorite: true
                }
            ]);

            var form = new Gordic.Forms
                .Form({ name: "FormPoznBloky", layoutDescriptor: "L1M1S1" })
                    .addSection()
                        .addRow("jres:26225282") //RC 26225282 : Název
                            .addField("gstringbox", "w-12", { name: "nazevField", model: "Nazev" })
                        .addRow("jres:26225604") //RC 26225604 : Popis
                            .addField("gstringbox", "w-12", { name: "popisField", model: "Popis" })
                        .addRow({ name: "pridatRow" })
                            .addField("gbutton", "w-3", {
                                params: {
                                    action: new GAction({
                                        customClass: "w100",
                                        name: "btnPridat",
                                        caption: "jres:26225238", //RC 26225238 : Přidat
                                        run: function (event, actionContext) {
                                            that.AddClick();
                                        }
                                    }),
                                    //align: "opposite"
                                }
                            })
                        .addRow({ name: "saveRow" })
                            .addField("gbutton", "w-3", {
                                params: {
                                    action: new GAction({
                                        customClass: "w100",
                                        name: "btnSave",
                                        caption: "jres:26227647", //RC 26227647 : Uložit
                                        run: function (event, actionContext) {
                                            that.SaveClick();
                                        }
                                    }),
                                    //align: "opposite"
                                }
                            });

            // vytvoření  formuláře    
            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            this.findFormRows("saveRow").hide();

            var fields = this.findFields();
            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }

            this.LoadGrid();
        },
        LoadGrid: function () {
            var that = this;

            var gridColumnsDefinition = new Gordic.Data.GridFormat()
                .addIconColumn({
                    name: "ico_default",
                    caption: "jres:26228020", //RC 26228020 : Výchozí
                    width: 30,
                    customClass: "center",
                    fixedWidth: true,
                    iconTemplate: function (row) {
                        if(row.ixs_blp == that.model.IxsBlpDefault) {
                            return { icon: "gi-radio2", tooltip: "jres:26228020" }; //RC 26228020 : Výchozí
                        }
                        return null;
                    }
                })
                .addTextColumn({
                    name: "nazev",
                    caption: "jres:26225282", //RC 26225282 : Název
                })
                .addTextColumn({
                    name: "poznamka",
                    caption: "jres:26225312", //RC 26225312 : Poznámka
                  //  width: 50,
                });

            this.gridPoznBloky = $("<div>").appendTo(this.element)
                .css("height", "calc(100% - " + this.defaultForm.height() + "px)")
                .ggrid({
                    name: "GridPoznBloky",
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "fit",  // fit (defaultne by melo byt toto), full
                    navigationMode: "row", // row, cell
                    searchColumns: ["nazev", "poznamka"], //sloupce, podle kterych se vyhledava v searchboxu
                    columns: gridColumnsDefinition,
                    defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                        name: "gridRowSelectedAct",
                        run: function (ev, ctx) {
                            var rowData = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek

                            that.userSettings.set("LastUsedPoznBlok", rowData.ixs_blp);

                            that.retValue = { ixsBlp: rowData.ixs_blp, nazev: rowData.nazev };
                            that.tryClose();

                            //that.close({ ixsBlp: rowData.ixs_blp });
                        }
                    }),
                    selection: function (ev, selectionInfo) {
                        if(that.editMode === true) {
                            if(selectionInfo.count === 1) {
                                that.SetEditFields(selectionInfo.getSelection()[0]);
                            }
                        }
                    },
                    multi: true,
                });

            this.LoadData();
        },
        LoadData: function () {
            var that = this;
            var dfd = $.Deferred();	

            //nacteni dat do gridu
            return Gordic.Wfl.Utils.SeznamPracovnichBloku(this.TypBlp, this)
                .done(function (data) {
                    var view = new Gordic.Data.View(data, { key: "ixs_blp" });  //key je dulezity kvuli pripadnemu vyhledavani radku

                    var rows = view.getDataRows(true, "data");
                    var filteredRows = [];
                    var lastUsedIxsBlp = that.userSettings.get("LastUsedPoznBlok");

                    if(lastUsedIxsBlp != null) {
                        filteredRows = rows.filter(function (meta) {
                            var data = meta.data;

                            if(data.ixs_blp && data.ixs_blp == lastUsedIxsBlp) {
                                return true;
                            }
                            return false;
                        });
                    }

                    that.gridPoznBloky.ggrid("setData", view);

                    if(filteredRows.length > 0) {
                        that.gridPoznBloky.ggrid("activeRow", filteredRows[0]);
                    } else if (rows.length > 0) { // pokud v datech není vybraný řádek, pak musím jako aktivní nastavit první řádek aktuálních dat. Jinak dojde k označení aktivního řádku gridu dle indexu předchozího seznamu před nasetováním nových dat
                        that.gridPoznBloky.ggrid("activeRow", rows[0]);
                    }
                })
                .always(function () {
                    dfd.resolve();
                });

            return dfd;
        },
        Reload: function () {
            return this.LoadData();
        },
        AddClick: function () {
            var that = this;
            this.findFields().gfield("model", "collect", this.model);

            if(this.defaultForm.gform("isValid")) {
                that.call("Add", { model: this.model }).done(function (data) {
                    that.Reload().done(function (data) {
                        //that.model.Nazev = null;
                        //that.model.Popis = null;
                        //that.findFields().gfield("model", "apply", that.model);

                        that.findFields().gfield("resetValidations");
                        that.findFields().gfield("reset"); 
                    });
                });
            }
        },
        SaveClick: function () {
            var that = this;
            this.findFields().gfield("model", "collect", this.model);

            if(this.editedRow == null) {
                return;
            }

            if(this.defaultForm.gform("isValid")) {
                that.call("Edit", { ixsBlp: this.editedRow.ixs_blp, aktivita: this.editedRow.aktivita, model: this.model }).done(function (data) {
                    that.Reload().done(function (data) {
                        that.ZrusitEditaci();

                        that.findFields().gfield("resetValidations");
                        that.findFields().gfield("reset");
                    });
                });
            }
        },
        OKClick: function () {
            var that = this;
            var selection = this.gridPoznBloky.ggrid("getSelection");

            if(selection && selection.length == 1) {
                let selectedRow = selection[0];

                that.userSettings.set("LastUsedPoznBlok", selectedRow.ixs_blp);

                this.retValue = { ixsBlp: selectedRow.ixs_blp, nazev: selectedRow.nazev };
                this.tryClose();
            } else {
                GDlg.alert("jres:26227208") //RC 26227208 : Vyberte jeden řádek.
            }

        },
        RemoveClick: function (selection) {
            var that = this;

            if(selection.length > 0) {
                var l_sMsg = "jres:26227411"; //RC 26227411 : Opravdu chcete smazat vybrané pracovní bloky?
                GDlg.confirm("jres:26227134", l_sMsg).on("close", function (ev, retVal) { //RC 26227134 : Varování
                    if(retVal) {
                        if(retVal === "yes") {
                            that.call("Remove", { selection: selection }).done(function (data) {
                                that.Reload();
                            });
                        }
                    }
                });
            } else {
                GDlg.alert("jres:26225103"); //RC 26225103 : Není vybrán žádný řádek.
            }

        },

        EditClick: function (selection) {
            var that = this;

            if(this.editMode !== true) {
                if(selection.length > 0) {
                    this.editMode = true;
                    this.SetEditFields(selection[0]);

                    this.findFormRows("pridatRow").hide();
                    this.findFormRows("saveRow").show();

                    this.actions.actEditovat.update({ caption: "jres:26227648", icon: "gi-pencil|fa-times gi-bgw gi-stack-pos--rb" });
                } else {
                    GDlg.alert("jres:26225103"); //RC 26225103 : Není vybrán žádný řádek.
                }
            } else { // zrusit editaci
                this.ZrusitEditaci();
            }
        },
        ZrusitEditaci: function () {
            this.editMode = false;
            this.SetEditFields(null);

            this.findFormRows("saveRow").hide();
            this.findFormRows("pridatRow").show();

            this.actions.actEditovat.update({ caption: "jres:26227646", icon: "gi-pencil" }); //RC 26227646 : Editovat
        },
        SetEditFields: function (row) {
            var that = this;

            if(row !== null) {
                this.findFields("nazevField").gfield("setValue", row.nazev);
                this.findFields("popisField").gfield("setValue", row.poznamka);
            } else {
                this.findFields("nazevField").gfield("setValue", "");
                this.findFields("popisField").gfield("setValue", "");
            }

            this.editedRow = row;
        },

        DefaultClick: function (selection) {
            var that = this;

            if(selection.length == 1) {
                var l_sMsg = "jres:26228017"; //RC 26228017 : Opravdu chcete nastavit pracovní blok jako výchozí?
                GDlg.confirm("jres:26227134", l_sMsg).on("close", function (ev, retVal) { //RC 26227134 : Varování
                    if(retVal) {
                        if(retVal === "yes") {
                            var ixsBlp = selection[0].ixs_blp;

                            that.globalSettings?.set("Global.Ssl.AppSettings.ListNotepadDokSpis.IdDefault", ixsBlp);
                            that.globalSettings?.save(true);
                         //   window.gstor.save(true);

                            that.model.IxsBlpDefault = ixsBlp;
                            that.Reload();
                        }
                    }
                });
            } else {
                GDlg.alert("jres:26228018"); //RC 26228018 : Vyberte jeden záznam
            }
        },

        closing: function () {
            var def = $.Deferred();

            if (this.retValue) {
                def.resolve(this.retValue);
            } else {
                def.resolve();
            }

            return def.promise();
        },
    }, { pure: true });
})(jQuery);
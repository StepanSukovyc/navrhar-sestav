(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DuplikatNovyDlg", {
        flashPanelTimer: 3000,
        grid1: null,
        grid2: null,
        attachments1: [],
        attachments2: [],
        categories: {}, // mapa { [key: string]: string }
        dataNonSaved: false,
        dataChanged: false,
        GroupResult: null,

        onContentReady: function () {
            var that = this;
            this.title = "jres:26256786"; //RC 26256786 : tvorba nového duplikátu

            this.actions.addRange({
                actOdebratVse: {
                    icon: "gi-minus",
                    caption: "jres:26256572", //RC 26256572 : Odebrat vše
                    run: function (ev, ctx) {
                        that.OdebratVse();
                    }
                },
                actPridatVse: {
                    icon: "gi-plus",
                    caption: "jres:26256573", //RC 26256573 : Přidat vše
                    run: function (ev, ctx) {
                        that.PridatVse();
                    }
                },
                actPridatJakoElObraz: {
                    icon: ["gi-plus", "gi-electr g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw"],
                    caption: "jres:26256574", //RC 26256574 : Přidat jako obraz
                   // enabled: that.GinSslPduplPar !== 0,
                    run: function (ev, ctx) {
                        that.PridatJakoElObraz();
                    }
                },
                actPridatJakoElPrilohy: {
                    icon: ["gi-plus", "gi-eattachment g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw"],
                    caption: "jres:26256575", //RC 26256575 : Přidat jako přílohy
                    run: function (ev, ctx) {
                        that.PridatJakoPrilohu();
                    }
                },
                actOk: {
                    icon: undefined,
                    caption: "jres:26255265", //RC 26255265 : OK
                    run: function (ev, ctx) {
                        that.OKClick();
                    }
                },
                actCancel: {
                    icon: undefined,
                    caption: "jres:26256543", //RC 26256543 : Zavří­t
                    run: function (ev, ctx) {
                        that.content.close();
                    }
                },
            });

            this.menuBar([
                { action: this.actions.actOdebratVse, favorite: true },
                { action: this.actions.actPridatVse, favorite: true },
                { action: this.actions.actPridatJakoElObraz, favorite: true },
                { action: this.actions.actPridatJakoElPrilohy, favorite: true }
            ]);

            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            this.ViewOriginal = new Gordic.Data.View(this.OriginalTable, {});
            this.ViewDuplikat = new Gordic.Data.View(this.DuplikatTable, {});

            var formOriginal = new Gordic.Forms
                .Form({ name: "FormOriginal", layoutDescriptor: "L2M2S2" })
                .addSection("jres:26256788") //RC 26256788 : Zdrojový dokument
                .addRow("jres:26255367" + "/" + this.ZnackaLabelText)  //RC 26255367 : PID
                .addField("gstringbox", "w-6", {
                    name: "IxpField",
                    //label: "jres:26255541", //RC 26255541 : Generovat ident.
                    model: "Ixp",
                    disabled: true,
                })
                .addField("gstringbox", "w-6", {
                    name: "ZnackaField",
                  //  label: this.ZnackaLabelText,
                    model: "Znacka",
                    disabled: true,
                })
                .addRow("jres:26255425") //RC 26255425 : Věc
                .addField("gstringbox", {
                    name: "SpZnField",
                    model: "Vec",
                    disabled: true
                });

            // vytvoření 1. casti formuláře    
            this.formOrig = $("<div>").appendTo(this.element).gform("createFrom", formOriginal);

            formOriginal.addSection();

           // this.LoadGridOriginal();
            this.AddGrid1();

            var formDuplikat = new Gordic.Forms
                .Form({ name: "FormDuplikat", layoutDescriptor: "L2M2S2" })
                .addSection("jres:26256789"); //RC 26256789 : Duplikát

            if(that.GinSslDuplpPar !== 0) {
                this.model.PregenerovatElObrazChecked = this.userSettings.get("PregenerovatElObrazChecked", false);

                formDuplikat.addRow()
                    .addField("gcheck", {
                        name: 'pregenerovatElObrazCheck',
                        label: "jres:26257024", //RC 26257024 : Přegenerovat el. obraz
                        model: "PregenerovatElObrazChecked",
                    });
            }

            // vytvoření 2. casti formuláře   
            this.formDupl = $("<div>").appendTo(this.element).gform("createFrom", formDuplikat);

          //  this.LoadGridDuplikat();
            this.AddGrid2();

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.formOrig);
            }

            this.beginOperation("jres:26257038"); //RC 26257038 : Probíhá načítání dat

            Gordic.Wfl.AttachmentUtils.GetCategories(this.Ixp, that)
                .then(function (categories) {
                    if (categories) {
                        that.categories = categories;
                    }

                    that.LoadGridFromDB(false);
                })
                .fail(function (msg) {
                    that.endOperation();
                });
        },
        LoadGridFromDB: function (showCover) {
            var that = this;

            if (showCover) {
                this.beginOperation("jres:26257038"); //RC 26257038 : Probíhá načítání dat
            }

            this.GroupResult = [];

            Gordic.Wfl.AttachmentUtils.GetListAttachments(this.Ixp, true, true, this)
                .then(function (attachments) {
                    that.attachments1 = attachments;

                    that.ReloadGrid1();
                    that.ReloadGrid2();

                    that.endOperation();
                })
                .fail(function (msg) {
                    that.endOperation();
                });
        },
        AddGrid1: function () {
            var that = this;

            this.grid1 = $("<div>").appendTo(this.element)
                .css("height", "100px)")
                .ggrid({
                    name: "Grid1",
                    // data: that.ViewOriginal,
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "full",  // fit (defaultne by melo byt toto), full
                    customClass: "js-gridKartoteka",
                    navigationMode: "row", // row, cell
                    defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                        name: "gridRowSelectedAct",
                        run: function (ev, ctx) {
                            var rowData = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek

                            that.Download(rowData);
                        }
                    }),
                    /*selection: function (ev, selectionInfo) {
                        if (selectionInfo.count === 1) { // u single modu vzdy 1 ale pro jistotu testuji
                            var rowData = that.gridTrasy.ggrid("getSelection");
                            that.VyberRadkuClick(rowData[0]);
                        }
                    },*/
                    multi: true,
                    //     scrollHelperTemplate: "{nazev}",  // "{ixs_esu} - {nazev}",
                    searchColumns: ["Type", "Nazev", "FileType", "Description", "FileName", "Category"], //sloupce, podle kterych se vyhledava v searchboxu
                    columns: Gordic.Wfl.AttachmentUtils.GetGridColumnsDefinition(that, that.OptionsForColumns, false),
                });

        },
        AddGrid2: function () {
            var that = this;

            this.grid2 = $("<div>").appendTo(this.element)
                .css("height", "100px)")
                .ggrid({
                    name: "Grid2",
                    data: that.ViewDuplikat,
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "full",  // fit (defaultne by melo byt toto), full
                    customClass: "js-gridKartoteka",
                    navigationMode: "row", // row, cell
                    defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                        name: "gridRowSelectedAct",
                        run: function (ev, ctx) {
                            var rowData = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek

                            that.Download(rowData);
                        }
                    }),
                    /*selection: function (ev, selectionInfo) {
                        if (selectionInfo.count === 1) { // u single modu vzdy 1 ale pro jistotu testuji
                            var rowData = that.gridTrasy.ggrid("getSelection");
                            that.VyberRadkuClick(rowData[0]);
                        }
                    },*/
                    multi: true,
                    rowsEnabled: function (dataRow) {
                        if (dataRow && dataRow.data && dataRow.data.inDB === true) {
                            return false;
                        }
                        return true;
                    },
                    //     scrollHelperTemplate: "{nazev}",  // "{ixs_esu} - {nazev}",
                    searchColumns: ["Type", "Nazev", "FileType", "Description", "FileName", "Category"], //sloupce, podle kterych se vyhledava v searchboxu
                    columns: Gordic.Wfl.AttachmentUtils.GetGridColumnsDefinition(that, that.OptionsForColumns, false),
                });

        },
        Reload: function () {
            var that = this;

            this.ReloadGrid1();
            this.ReloadGrid2();
        },
        ReloadGrid1: function () {
            var that = this;

            var view = new Gordic.Data.View(that.attachments1, { key: "Id" });  //key je dulezity kvuli pripadnemu vyhledavani radku
            this.grid1.ggrid("setData", view);
        },
        ReloadGrid2: function () {
            var that = this;

            var view = new Gordic.Data.View(that.attachments2, { key: "Id" });  //key je dulezity kvuli pripadnemu vyhledavani radku
            this.grid2.ggrid("setData", view);
        },
        OdebratVse: function () {
            var that = this;

            this.attachments2 = [];
            this.ReloadGrid2();
        },
        PridatVse: function () {
            var that = this;

            this.attachments2 = $.extend(true, [], this.attachments1); // kopie puvodniho pole, abych nezmenil original

            this.ReloadGrid2();
        },
        PridatJakoElObraz: function () {
            var that = this;
            var selection = this.grid1.ggrid("getSelection");

            if(selection.length == 1) {
                var mySelection = $.extend(true, [], selection); // kopie puvodniho pole, abych nezmenil original
                var newElObrazRow = mySelection[0];
                var rowForDelete = null;

                // pokud je radek souboru v seznamu, odeberu ho
                this.attachments2.forEach(function (entry) {
                    if(entry.File.Ixb == newElObrazRow.File.Ixb) {
                        rowForDelete = entry;
                    }
                });

                if(rowForDelete != null) {
                    this.attachments2.splice($.inArray(rowForDelete, this.attachments2), 1);
                }

                that.attachments2.forEach(function (entry) {
                    entry.IsFavorite = false;
                });

                // nastavim priznaky obrazu a vlozim na prvni pozici v seznamu
                newElObrazRow.IsFavorite = true;

                this.attachments2.unshift(newElObrazRow);
                this.ReloadGrid2();
            } else {
                this.dialogs.alert("jres:26256793"); //RC 26256793 : Vyberte jen jeden řádek.
            }
        },
        PridatJakoPrilohu: function () {
            var that = this;
            var selection = this.grid1.ggrid("getSelection");

            if(selection.length > 0) {
                var mySelection = $.extend(true, [], selection); // kopie puvodniho pole, abych nezmenil original
                var rowsForDelete = [];
                var duplikatMaObraz = false;

                // pokud je radek souboru v seznamu, odeberu ho
                mySelection.forEach(function (entrySel) {

                    that.attachments2.forEach(function (entryDupl) {
                         // zjistim, zda je v seznamu obraz
                        if(!duplikatMaObraz && entryDupl.IsFavorite === true) {
                            duplikatMaObraz = true;
                        }
                        // zjistim, zda jiz seznam neobsahuje vybrane prilohy a pripadne je odstranim
                        if(entrySel.File.Ixb == entryDupl.File.Ixb && entryDupl.IsFavorite !== true) {
                            rowsForDelete.push(entryDupl);
                        }
                    });
                });

                // odstraneni priloh
                rowsForDelete.forEach(function (entry) {
                    that.attachments2.splice($.inArray(entry, that.attachments2), 1);
                });

                // pridam nove prilohy na konec a pokracuji v iteraci cislovani z predchoziho cyklu
                mySelection.forEach(function (entry) {
                    entry.IsFavorite = false;
                    that.attachments2.push(entry);
                });

                this.ReloadGrid2();
            } else {
                this.dialogs.alert("jres:26256794"); //RC 26256794 : Není vybrán řádek.
            }
        },
        OKClick: function () {
            var that = this;
            var ixbElObraz = null;
            var ixbElPrilohy = [];

            this.attachments2.forEach(function (entry) {
                if(entry.IsFavorite === true) {
                    ixbElObraz = entry.File.Ixb;
                } else {
                    ixbElPrilohy.push(entry.File.Ixb);
                }
            });

            this.findFields().gfield("model", "collect", this.model);

            this.userSettings.set("PregenerovatElObrazChecked", this.model.PregenerovatElObrazChecked);

            //nacteni dat do gridu
            this.call("NovyDuplikat", { model: this.model, ixbElObraz: ixbElObraz, ixbElPrilohy: ixbElPrilohy })
                .done(function (data) {
                    that.retValue = data.IxpDuplikat;
                    that.tryClose();
                });
        },
        Download: function(row) {
            var that = this;

            Gordic.Wfl.AttachmentUtils.OpenAttachment(this, row, false, false, false).done(function (args) {
                // console.log("doc.downloadCompleted", this, args);
            });

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
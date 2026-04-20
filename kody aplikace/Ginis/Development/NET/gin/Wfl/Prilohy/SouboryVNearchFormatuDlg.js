(function ($) {
    "use strict";
    namespace("Gordic.Wfl.SouboryVNearchFormatuDlg", {
       // flashPanelTimer: 5000,

        onContentReady: function () {
            var that = this;
            this.title = "jres:26227302"; //RC 26227302 : El. soubory v nearchivním formátu
            this.actions.addRange({
                actZadostZDF: {
                    icon: undefined,
                    caption: "jres:23900128", //RC 23900128 : Žádost o ZDF
                    tooltip: "jres:23900128", //RC 23900128 : Žádost o ZDF
                    enabled: that.ActionVygenerovatZadostOZmenuFormatuEnabled,
                    run: function (ev, ctx) {
                        that.ZadostZDF();
                    }
                },
                // chybi akce ZmenitDF - az si nekdo vyzada, hybrid ji take nema. Celkove tento dialog by si mel prevzit JSindelka a obslouzit si vysledky hromadnych operaci po svem
                actCancel: {
                    icon: undefined,
                    caption: "jres:26225591", //RC 26225591 : Zavřít
                    run: function (ev, ctx) {
                        that.close();
                    }
                },
            });

            this.menuBar([
                { action: this.actions.actZadostZDF, favorite: true }
            ]);

            this.commandBar([
                { action: this.actions.actCancel },
            ]);

            var lastIxsFunKonvPrac = window.gstor.get("Global.Ssl.SouboryNearchFormat.LastIxsFunKonvPrac");
            var povolenyTypZdfChecked = window.gstor.get("Global.Ssl.SouboryNearchFormat.PovolenyTypZdfChecked");

            if(lastIxsFunKonvPrac) {
                this.model.ixsFunKonvPrac = lastIxsFunKonvPrac;
            }
            if(povolenyTypZdfChecked) {
                this.model.povolenyTypZdfChecked = povolenyTypZdfChecked;
            }

            var form = new Gordic.Forms
                .Form({ name: "FormSouboryNearch", layoutDescriptor: "L2M2S2" })
                .addSection()
                .addRow("jres:26227291") //RC 26227291 : Funkce konverzního pracoviště
                .addField("gselectbox",
                    Gordic.Gin.Fields.ginsfunSSU(
                        {
                            name: "IxsFunKP",
                            model: "model.ixsFunKonvPrac = value.ixs_fun",
                            serverFilters: {
                                aktivita: [100],
                                DlePovolenychFazi: ["GSARAK01", "GWARAK05"]
                            },
                            change: function (ev, data) {
                                window.gstor.set("Global.Ssl.SouboryNearchFormat.LastIxsFunKonvPrac", data.value.ixs_fun);
                            }
                        }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO))
                .addRow()
                .addField("gcheck", {
                    name: "PovolenyTypCheck",
                    label: "jres:26227304", //RC 26227304 : Zobrazovat jen povolený typ souborů pro ZDF
                    model: "povolenyTypZdfChecked",
                    change: function (ev, data) {
                        window.gstor.set("Global.Ssl.SouboryNearchFormat.PovolenyTypZdfChecked", data.value);
                        that.Reload();
                    }
                })

            form.addSection();

            // vytvoření  formuláře    
            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

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
                .addIconColumn(Gordic.Gin.Globals.GridIconOptResulInfo())
                .add(Gordic.Wfl.Prefabs.Column.TypPrilohy({
                    gridColumn: {
                        name: "image_typ_elp"
                    },
                    getData: function (row) {
                        if(row.typ_elp === 0) {
                            return Gordic.Wfl.Prefabs.Column.TypPrilohyEnum.ElektronickyObraz;
                        } else {
                            return Gordic.Wfl.Prefabs.Column.TypPrilohyEnum.PrilohaElektronicka;
                        }
                    }
                }))
                .addIconColumn({ // presunout do WflGlobals
                    name: "Type", caption: "jres:26226696", //RC 26226696 : Typ souboru
                    customClass: "center cursor_help",
                    width: 30,
                    fixedWidth: true,
                    iconTemplate: function (row) {
                        return Utils.File.getFileTypeIconClass(row.soubor_pri);
                    }
                })
                .addTextColumn({
                    name: "soubor",
                    caption: "jres:26225952", //RC 26225952 : Soubor
                    width: 300,
                })
                .addNumberColumn({
                    name: "pronom_id",
                    caption: "jres:26227289", //RC 26227289 : Pronom ID
                    width: 120,
                    //fixedWidth: true,
                })
                .addTextColumn({
                    name: "ixp",
                    caption: "jres:26226029", //RC 26226029 : Identifikátor dok./spisu
                    width: 120,
                })
                .addTextColumn({
                    name: "m_err",
                    caption: "jres:26227288", //RC 26227288 : Informace o provedené operaci
                    width: 300,
                });


            this.gridSoubory = $("<div>").appendTo(this.element)
                .css("height", "calc(100% - " + this.defaultForm.height() + "px)")
                .ggrid({
                    name: "GridSoubNearch",
                    //    data: that.ViewTabulkaSubjektu,
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "full",  // fit (defaultne by melo byt toto), full
                    customClass: "js-gridKartoteka",
                    navigationMode: "row", // row, cell
                    defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                        name: "gridRowSelectedAct",
                        run: function (ev, ctx) {
                          /*  var rowData = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek
                            var options = {
                                ixp: rowData.ixp_kop,
                                grid: that.gridSoubory
                            };
                            Gordic.Ssl.MainApp.ShowDetail(that, options);*/
                        }
                    }),
                    /*selection: function (ev, selectionInfo) {
                        if (selectionInfo.count === 1) { // u single modu vzdy 1 ale pro jistotu testuji
                            var rowData = that.gridTrasy.ggrid("getSelection");
                            that.VyberRadkuClick(rowData[0]);
                        }
                    },*/
                    // multi: true,

                    //     scrollHelperTemplate: "{nazev}",  // "{ixs_esu} - {nazev}",
                    searchColumns: ["image_typ_elp", "soubor", "pronom_id", "ixp"], //sloupce, podle kterych se vyhledava v searchboxu
                    columns: gridColumnsDefinition,
                });

            this.LoadData();
        },
        LoadData: function () {
            var that = this;

            if(this.SouboryNearchivniFormat != null) {
                var data = this.SouboryNearchivniFormat;
                var l_bPovolenyTypZdfChecked = this.findFields("PovolenyTypCheck").gfield("getValue");

                if(l_bPovolenyTypZdfChecked) {
                    data = this.SouboryNearchivniFormatZDF;
                }

                var view = new Gordic.Data.View(data, { key: "pronom_id" }); //key je dulezity kvuli pripadnemu vyhledavani radku
                Gordic.Gin.Globals.ResolveResultData(view); // pro nastaveni sloupcu vysledku operace 
                that.gridSoubory.ggrid("setData", view, true); //true = prekresleni gridu
            } else {
                this.dialogs.alert("jres:26227305"); //RC 26227305 : Nenalezena data pro seznam. Opakujte akci, prosím.
            }
        },
        Reload: function () {
            if(this.gridSoubory) {
                this.LoadData();
            }
        },

        ZadostZDF: function () {
            var that = this;
            this.findFields().gfield("model", "collect", this.model);

            var l_sIxsFun = this.model.ixsFunKonvPrac;

            if (l_sIxsFun == null || l_sIxsFun == "") {
                GDlg.alert("jres:26227293") //RC 26227293 : Vyberte funkci konverzního pracoviště
                    .on("ok", function (ev) {
                        return;
                    }).on("close", function (ev) {
                        return;
                    });
            } else if (this.gridSoubory != null) {

                var l_aoSelections = this.gridSoubory.ggrid("getSelection", true);

                if(l_aoSelections.length != 0) {
                    var prilohyArray = [];

                    for (var i = 0; i < l_aoSelections.length; i++) {
                        var selected = l_aoSelections[i].data;

                        prilohyArray.push({ ixp: selected.ixp, ixb: selected.ixb, ixs_ulo: selected.ixs_ulo, soubor: selected.soubor, typ_elp: selected.typ_elp, por_cislo: selected.por_cislo, soubor_pri: selected.soubor_pri });
                    }

                    var l_oParamsJSON = { "Prilohy": prilohyArray, "IxsFun": l_sIxsFun };

                    this.call(["ZadostZDF", l_oParamsJSON]).done(
                        function (data, content) {
                            for (var i = 0; i < data.length; i++) {
                                var ixb = data[i].ixb;
                                var errMsg = data[i].err_message;

                                for(var j = 0; j < that.SouboryNearchivniFormat.length; j++) {
                                    if (that.SouboryNearchivniFormat[j].ixb === ixb) {
                                        that.SouboryNearchivniFormat[j].err_message = errMsg;
                                    }
                                }
                            }

                            that.Reload();
                        }
                    );
                } else {
                    GDlg.alert("jres:26227294").on("ok", function (ev) { //RC 26227294 : Vyberte řádek
                        return;
                    }).on("close", function (ev) {
                        return;
                    });
                }
            }
        },

    }, { pure: true });
})(jQuery);
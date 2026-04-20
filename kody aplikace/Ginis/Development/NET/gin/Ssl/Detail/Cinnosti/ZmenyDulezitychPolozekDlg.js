(function ($) {
    "use strict";
    namespace("Gordic.Ssl.ZMDPOL", {

        onContentReady: function () {
            var that = this;

            var form = new Gordic.Forms
                 .Form({ name: "FormZMDPOL", layoutDescriptor: "L1M1S1" })
                   .addSection();


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
                .addNumberColumn({
                    name: "por_cislo",
                    caption: "jres:31937564", //RC 31937564 : Poř. č.
                })
                .addTextColumn({
                    name: "ixp",
                    caption: "jres:31937227", //RC 31937227 : PID
                })
                .addTextColumn({
                    name: "nazev",
                    caption: "jres:26255425", //RC 26255425 : Věc
                })
                .addTextColumn({
                    name: "akt_znacka",
                    caption: "jres:31937225", //RC 31937225 : Značka
                    sortOrder: Gordic.Ssl.Utils.SortSpzn
                })
                .addTextColumn({
                    name: "misto_vzniku",
                    caption: "jres:31937226", //RC 31937226 : Odesílatel
                })
                .addTextColumn({
                    name: "ixs_typ_txt",
                    caption: this.gin_n23_vecsk == 0 ? "jres:31937228" : "jres:26257355", //RC 31937228 : Typ dokumentu RC 26257355 : Druh dokumentu
                })
                .addTextColumn({
                    name: "st_utaj_id_txt",
                    caption: "jres:31937229", //RC 31937229 : Přístup
                })
                .addTextColumn({
                    name: "poc_listu",
                    caption: "jres:26256108", //RC 26256108 : Poč. listů
                    width: 50,
                })
                .addNumberColumn({
                    name: "poc_priloh",
                    caption: "jres:26256109", //RC 26256109 : Poč. příloh
                    width: 50,
                })
                .addTextColumn({
                    name: "poc_l_priloh",
                    caption: "jres:31937230", //RC 31937230 : Počet listů příloh
                    width: 50,
                });


            if (this.gin_n23_vecsk == 0) {
                gridColumnsDefinition
                    .addTextColumn({
                        name: "spis_pl",
                        caption: "jres:31937231", //RC 31937231 : Spisový plán
                    })
                    .addTextColumn({
                        name: "spis_znak",
                        caption: "jres:31937232", //RC 31937232 : Spis. znak
                        filter: [new Gordic.Wfl.Utils.GTextFilterFullTextStartsWithAndUseCommaForDot("spis_znak"), new Gordic.Data.Filters.GSelectionFilterVariant("spis_znak", { columnName: "spis_znak", columnType: "text" })]
                    })
                    .addTextColumn({
                        name: "skar_znak",
                        caption: "jres:31937233", //RC 31937233 : Skartační znak
                    })
                    .addNumberColumn({
                        name: "skar_lhuta",
                        caption: "jres:31937234", //RC 31937234 : Skartační lhůta
                    });
            } else {
                gridColumnsDefinition
                    .addTextColumn({
                        name: "vsk_spis_znak",
                        caption: "jres:26257223", //RC 26257223 : Věcná skupina - Spis. znak
                        tooltipTemplate: (value) => {
                            return value.vsk_spis_znak;
                        },
                    })
                    .addTextColumn({
                        name: "vsk_nazev",
                        caption: "jres:26257222", //RC 26257222 : Věcná skupina - Název
                    })
                   
                    .addTextColumn({
                        name: "vsk_skar_znak",
                        caption: "jres:31937233", //RC 31937233 : Skartační znak
                    })
                    .addNumberColumn({
                        name: "vsk_skar_lhuta",
                        caption: "jres:31937234", //RC 31937234 : Skartační lhůta
                    })
                    .addTextColumn({
                        name: "skr_nazev",
                        caption: "jres:31937563", //RC 31937563 : Skartační režim (po uzavření)
                    });
            }

            gridColumnsDefinition

                .addNumberColumn({
                    name: "rok_spo_uda",
                    caption: "jres:31937235", //RC 31937235 : Rok spouštěcí události
                })
                .addTextColumn({
                    name: "typ_ag_txt",
                    caption: "jres:31937236", //RC 31937236 : Typ agendy
                })
                .addDateTimeColumn({
                    name: "dat_zmena",
                    caption: "jres:26255404", //RC 26255404 : Datum změny
                    width: 130,
                    fixedWidth: false
                })
                .addTextColumn({
                    name: "nazev_rf",
                    caption: "jres:26255429", //RC 26255429 : Změnu provedl
                });

            this.gridZmeny = $("<div>").appendTo(this.element)
                .css("height", "calc(100% - " + this.defaultForm.height() + "px)")
                .ggrid({
                    name: "GridZmeny",
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "full",  // fit (defaultne by melo byt toto), full
                    navigationMode: "row", // row, cell
                    searchColumns: ["nazev", "spis_znak", "misto_vzniku", "poc_listu", "poc_priloh", "dat_zmena", "nazev_rf", "akt_znacka", "ixs_typ_txt", "st_utaj_id_txt", "poc_l_priloh",
                        "spis_pl", "skar_znak", "skar_lhuta", "rok_spo_uda", "typ_ag_txt", "nazev_rf"], //sloupce, podle kterych se vyhledava v searchboxu
                    columns: gridColumnsDefinition,
                });


            this.LoadData();
        },
        LoadData: function () {
            var that = this;
          //  this.findFields().gfield("model", "collect", this.model);

            //nacteni dat do gridu
            this.call("SeznamZmen", { IxsTra: this.Ixp })
                .done(function (data) {
                    var view = new Gordic.Data.View(data, { key: "nazev" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                    that.gridZmeny.ggrid("setData", view, true);           //true = prekresleni gridu
                });
        },
        Reload: function () {
            this.LoadData();
        },
    }, { pure: true });
})(jQuery);
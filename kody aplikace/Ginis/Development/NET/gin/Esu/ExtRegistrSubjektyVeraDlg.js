

$(function () {
        "use strict";
        
        namespace("Gordic.Esu.WebClient.ExtRegistrSubjektyVeraDlg", {

            onContentReady: function () {
                console.log("Zacatek Scriptu");
                var that = this;
               
                var gridKolonky;

                this.inicializaceDataView();

                if (this.mod === "organizace") {

                    gridKolonky = new Gordic.Data.GridFormat()
                        .addTextColumn({
                            name: "name",
                            caption: "jres:26265146", //RC 26265146 : Název
                        })
                        .addTextColumn({
                            name: "official_name",
                            caption: "jres:32100017", //RC 32100017 : Obchodní jméno
                        })
                        .addTextColumn({
                            name: "street",
                            caption: "jres:26265147", //RC 26265147 : Ulice
                        })
                        .addTextColumn({
                            name: "house_number",
                            caption: "jres:31900510", //RC 31900510 : Číslo
                        })
                        .addTextColumn({
                            name: "city",
                            caption: "jres:26265149", //RC 26265149 : Obec
                        });
                } else {
                    gridKolonky = new Gordic.Data.GridFormat()
                        .addTextColumn({
                            name: "firstname",
                            caption: "jres:26265153", //RC 26265153 : Jméno
                        })
                        .addTextColumn({
                            name: "lastname",
                            caption: "jres:26265152", //RC 26265152 : Příjmení
                        })
                        .addTextColumn({
                            name: "street",
                            caption: "jres:26265147", //RC 26265147 : Ulice
                        })
                        .addTextColumn({
                            name: "house_number",
                            caption: "jres:31900510", //RC 31900510 : Číslo
                        })
                        .addTextColumn({
                            name: "city",
                            caption: "jres:26265149", //RC 26265149 : Obec
                        });
                }

               
                  
                $.content(this).actions.add({
                    name: "actDvojklik",
                    run: function (ev, ctx) {
                        that.prevzit();
                    }
                });

                that.gridSubjekty = $("<div>").appendTo(this.element)
                    //.height(900)
                    .gautofit()
                    .ggrid({
                        name: "GridSubjekty",
                        data: this.ViewTabulkaSubjekty,
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit",  // fit, full
                        customClass: "js-gridSubjekty",
                        navigationMode: "row", // row, cell
                        defaultAction: $.content(this).actions.actDvojklik, //selectAction
                       
                        //selection: 
                    

                        multi: false,
                        scrollHelperTemplate: this.mod === "organizace" ? "{official_name}" : "{lastname}",  // "{ixs_esu} - {nazev}",
                       // searchColumns: ["official_name"],
                        columns: gridKolonky,
                    });
            },

            inicializaceDataView: function () {
                if (this.mod === "organizace") {
                    this.ViewTabulkaSubjekty = new Gordic.Data.View(this.serverParams.Organizace); //, { key: "" }
                } else {
                    this.ViewTabulkaSubjekty = new Gordic.Data.View(this.serverParams.Obyvatele); //, { key: "" }
                }
            },


            neprevzit: function () {
                this.close();

            },

            prevzit: function () {
             
                // ve VyberRadku je vždy dvojice - položka a hodnota_ext oddělená čárkou

                var that = this;

                var sel = that.gridSubjekty.ggrid("getSelection");
                if (sel.length > 0) {
                    this.zjistitRozdily(sel[0]);
                } else {
                    that.dialogs.alert("jres:31900144"); //RC 31900144 : Nebyl označen řádek
                }
            },

            zjistitRozdily: function (vybranySubjekt) {
                var that = this;
                this.beginOperation();
                var fun = "";
                if (this.mod === "organizace") {
                    fun = "PorovnejSubjektOrganizaci";
                } else {
                    fun = "PorovnejSubjektObyvatele";
                }
                that.call(fun, { subjekt: vybranySubjekt, DetailEsuItems: this.serverParams.EsuDto })
                    .done(function (retval) {
                        that.close({ rozdily: retval });
                    })
                    .always(function (val) {
                        that.endOperation();
                    });

            },

    }, { extendIntellisense: GContent });
    
       

});

   
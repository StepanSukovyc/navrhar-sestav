

$(function () {
        "use strict";
        
        namespace("Gordic.Esu.WebClient.ExtRegistrSubjektyDlg", {

            onContentReady: function () {
                console.log("Zacatek Scriptu");
                var that = this;
               

                this.inicializaceDataView();
                var gridKolonky = new Gordic.Data.GridFormat()
                      
                    .addIconColumn({
                        name: "rozdil_img",
                        caption: "jres:26265328", //RC 26265328 : Stav
                        //customClass: "center",
                        width: 40,
                        //fixedWidth: true,
                        iconTemplate: function (data) {
                            if (data.dbID) {
                                return { icon: "gi-ds", tooltip: "jres:26265401" }; //RC 26265401 : Subjekt má datovou schránku
                            }
                            else{
                                return null;
                            }
                        }
                    })
                    .addTextColumn({
                        width: 80,

                        name: "dbID",
                        caption: "jres:31900512", //RC 31900512 : DS
                    })
                    .addTextColumn({
                        width: 80,
                        name: "aktivita",
                        caption: "jres:26265270", //RC 26265270 : Aktivita
                    })
                    .addTextColumn({
                        width: 300,
                        name: "firmName",
                        caption: "jres:31900171", //RC 31900171 : Název - obchodní jméno
                    })
                    .addTextColumn({
                        width: 130,
                        name: "pnFirstName",
                        caption: "jres:26265153", //RC 26265153 : Jméno
                    })
                    .addTextColumn({
                        width: 130,
                        name: "pnLastName",
                        caption: "jres:26265152", //RC 26265152 : Příjmení
                    })
                    .addTextColumn({
                        width: 50,
                        name: "biDateYear",
                        caption: "jres:31901113", //RC 31901113 : Rok narození
                    })
                    .addTextColumn({
                        width: 130,
                        name: "adCity",
                        caption: "jres:26265149", //RC 26265149 : Obec
                    })
                    .addTextColumn({
                        width: 130,
                        name: "adStreet",
                        caption: "jres:26265147", //RC 26265147 : Ulice
                    })
                    .addTextColumn({
                        width: 130,
                        name: "dbID",
                        caption: "jres:31900366", //RC 31900366 : ID DS
                    })
                    .addTextColumn({
                        width: 130,
                        name: "adDistrict",
                        caption: "jres:31901103", //RC 31901103 : Část obce
                    })
                    .addTextColumn({
                        width: 80,
                        name: "adZipCode",
                        caption: "jres:26265200", //RC 26265200 : Psč
                    })
                    .addTextColumn({
                        width: 60,
                        name: "adNumberInStreet",
                        caption: "jres:31900172", //RC 31900172 : Číslo orientační
                    })
                    .addTextColumn({
                        width: 60,
                        name: "adNumberInMunicipality",
                        caption: "jres:31900173", //RC 31900173 : Číslo popisné
                    })
                    .addTextColumn({
                        name: "ic",
                        width: 100,
                        caption: "jres:26265195", //RC 26265195 : Ičo
                    })
                    .addTextColumn({
                        name: "dbType",
                        width: 90,
                        caption: "jres:31900194", //RC 31900194 : Typ
                    })
                    ;
                  
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
                        columnMode: "full",  // fit, full
                        customClass: "js-gridSubjekty",
                        rowsChecked: "checked",
                        navigationMode: "row", // row, cell
                        defaultAction: $.content(this).actions.actDvojklik, //selectAction
                       
                        //selection: 
                    

                        multi: false,
                        scrollHelperTemplate: "{firmName}",  // "{ixs_esu} - {nazev}",
                        /*
                        searchColumns: ["firmName"],
                        */
                        columns: gridKolonky,
                    });
            },

            inicializaceDataView: function () {
                this.ViewTabulkaSubjekty = new Gordic.Data.View(this.serverParams.NalezeneSubjekty); //, { key: "" }
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
                that.call("PorovnejSubjekt", { subjekt: vybranySubjekt, DetailEsuItems: this.serverParams.EsuDto })
                    .done(function (retval) {
                        that.close({ rozdily: retval });
                    })
                    .always(function (val) {
                        that.endOperation();
                    });

            },

    }, { extendIntellisense: GContent });
    
       

});

   


$(function () {
        "use strict";
        
        namespace("Gordic.Esu.WebClient.ExtRegistrRozdilyDlg", {

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
                            if (data.rozdil_img === "fajfka_seda" ) {
                                return { icon: "gi-tick", tooltip: "" };
                            }
                            else if (data.rozdil_img === "fajfka_modra") {
                                return { icon: "gi-tick g-state-text g-state-success", tooltip: "" };
                            }
                            else if (data.rozdil_img === "okno_napoveda") {
                                return { icon: "gi-question", tooltip: "" };
                            }
                            else{ //data.rozdil_img = "vymazat"
                                return { icon: "gi-window-close g-state-text g-state-important", tooltip: "" };
                            }
                        }
                    })
                    
                    .addTextColumn({
                        name: "rozdil_txt",
                        caption: "jres:31900514", //RC 31900514 : Rozdíl
                    })
                    .addTextColumn({
                        name: "polozka_txt",
                        caption: "jres:31900515", //RC 31900515 : Položka
                    })
                    .addTextColumn({
                        name: "hodnota_ginis",
                        caption: "jres:31900516", //RC 31900516 : Hodnota
                    })
                    .addTextColumn({
                        name: "hodnota_ext",
                        caption: "jres:31900517", //RC 31900517 : Hodnota v registru
                    })
                    ;
                  
                $.content(this).actions.add({
                    name: "actDvojklik",
                    run: function (ev, ctx) {
                        console.log(ctx.cellInfo.data);
                    }
                });

                that.gridRozdily = $("<div>").appendTo(this.element)
                    //.height(900)
                    .gautofit()
                    .ggrid({
                        name: "GridRozdily",
                        data: this.ViewTabulkaRozdily,
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit",  // fit, full
                        customClass: "js-gridRozdily",
                        rowsChecked: "checked",
                        navigationMode: "row", // row, cell
                        defaultAction: $.content(this).actions.actDvojklik, //selectAction
                        rowsClass: function (dataRow) {
                            
                            if (dataRow && dataRow.data && dataRow.data.blue_look) {
                                if (dataRow.data.blue_look === "gray") {
                                    return " ui-disabled data-deleted ";
                                } else if (dataRow.data.blue_look === "black") {
                                    return " data-deleted ";
                                } else {
                                    return "";
                                }
                            } else return "";
                        },
                        rowsEnabled: function (dataRow) {
                            if (dataRow && dataRow.data && dataRow.data.checkbox_readonly) {
                                return false;
                            }
                            return true;
                        },
                        //selection: 
                    

                        multi: true,
                        scrollHelperTemplate: "{polozka_txt}",  // "{ixs_esu} - {nazev}",
                        /*
                        searchColumns: ["polozka_txt"],
                        */
                        columns: gridKolonky,
                    });
            },

            inicializaceDataView: function () {
                this.ViewTabulkaRozdily = new Gordic.Data.View(this.serverParams.PolozekKPorovnani, { key: "polozka_txt" });
            },

            linkDoRegistru: function () {
                //this.serverParams.UrlEsuVReg
                // 
                var aUrl = this.serverParams.UrlEsuVReg;
                if (aUrl.length > 3) {
                    if (aUrl.substring(0, 3) == 'www') {
                        aUrl = "http://" + aUrl;
                    }
                }
                if (aUrl.length > 0) {
                    window.open(aUrl, null, "left=100,top=100,height=590,width=790,menubar=yes,resizable=yes,titlebar=yes,toolbar=yes,scrolable=yes");
                }
            },

            neprevzit: function () {
                this.close();

            },

            prevzitOmezene: function () {
                var that = this;
                var sel = that.gridRozdily.ggrid("getSelection");

                var temp = $.grep(sel, function (value) {
                    return value.polozka === "id_ds" || value.polozka === "dic" || value.polozka === "prizdph" ;
                });
                this.prevzit(temp);
            },
            prevzit: function (sel) {
             
                // ve VyberRadku je vždy dvojice - položka a hodnota_ext oddělená čárkou

                var that = this;
                if (sel == null) { 
                    sel = that.gridRozdily.ggrid("getSelection");
                }
                if (sel) { //sel.length > 0

                    if (this.serverParams.PrevzitVOkne) {
                        if (this.serverParams.ExtReg === "0") {

                        }
                        else if (this.serverParams.ExtReg === "1") { 
                            this.prevzitISDS(sel);
                        }
                        else if (this.serverParams.ExtReg === "2") {

                        }
                    } else {
                        that.close({ stav:"prevzato", prevzit: sel });
                    }
                } else {
                    that.dialogs.alert("jres:31900144"); //RC 31900144 : Nebyl označen řádek
                }
            },

            prevzitISDS: function (polozkyKPrevzeti) {
                var that = this;

                this.beginOperation();
                that.call("PrevzitExtRegIsds", { IdEsu: this.serverParams.IdEsu, PolozkyKPrevzeti: polozkyKPrevzeti })
                    .done(function (retval) {
                        that.close(retval);
                    })
                    .always(function (val) {
                        that.endOperation();
                    });

            }

         

    }, { extendIntellisense: GContent });
    
       

});

   
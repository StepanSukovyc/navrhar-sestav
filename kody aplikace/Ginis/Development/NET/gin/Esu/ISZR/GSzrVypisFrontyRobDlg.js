

$(function () {
    "use strict";
    //  $("#test").gform("setup", { layoutDescriptor: "L2M2S1, L-4-8-0, M-12-12-0, S-12-12-0" }).

    namespace("Gordic.Esu.WebClient.GSzrVypisFrontyRobDlg", {
        onContentReady: function () {
            
            var that = this;
            //#region grid
            console.log("list", this.listDto);
            var gridformat1 = new Gordic.Data.GridFormat()
                //gridformat
                .addIconColumn({
                    name: "IszrIkonka",
                    caption: "jres:31900290", //RC 31900290 : Ověřeno
                    //customClass: "center",
                    width: 40,
                    //fixedWidth: true,
                    iconTemplate: function (value) {
                        if (value) {
                            var objImg = Gordic.Esu.Function.getColorDleTypRegistr(value.typ_registr);
                            if (objImg.ico) {
                                return { icon: objImg.ico, tooltip: objImg.text }; 
                            }
                        }
                    }
                })
                .addTextColumn({
                    name: "ixs_esu",
                    caption: "jres:31900142", //RC 31900142 : ID ESU
                }).addTextColumn({
                    name: "typ_registr_txt",
                    caption: "jres:31900194", //RC 31900194 : Typ
                }).addTextColumn({
                    name: "typ_sluzby_txt",
                    caption: "jres:31900619", //RC 31900619 : Typ služby
                }).addTextColumn({
                    name: "stav_async_txt",
                    caption: "jres:26265328", //RC 26265328 : Stav
                }).addTextColumn({
                    name: "agenda",
                    caption: "jres:26265327", //RC 26265327 : Agenda
                }).addTextColumn({
                    name: "nazev",
                    caption: "jres:26265146", //RC 26265146 : Název
                }).addTextColumn({
                    name: "ico",
                    caption: "jres:26265288", //RC 26265288 : IČO
                }).addDateTimeColumn({
                    name: "dat_zmena",
                    caption: "jres:26265272", //RC 26265272 : Datum změny
                }).addTextColumn({
                    name: "zmenu_prov_txt",
                    caption: "jres:26265161", //RC 26265161 : Změnu provedl
                });

            
            
            this.grid = $("<div>").appendTo(this.element)
                //.height(250)
                .gautofit()
                .ggrid({
                    name: "Grid",
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "fit",  // fit, full
                    navigationMode: "row", // row, cell
                    cellActivate: function (ev, row) {
                        if (row && row.cellInfo && row.cellInfo.data) { // u single modu vzdy 1 ale pro jistotu testuji
                            that.updateActions();
                        }
                    },
                    scrollHelperTemplate: "{nazev}",  // "{ixs_esu} - {nazev}",
                    /*
                    searchColumns: ["nazev", "ico"],
                    */
                    multi:true,
                    columns: gridformat1
                });

            this.updateActions();
            this.setujDataDoGridu(this.listDto);

            //#endregion
           

            // gDataGridView.DataView.Sort = "dat_zmena DESC";
        },
        loadData: function () {
            var that = this;

            this.beginOperation();
            this.call("LoadData")
                .done(function (retVal) {
                    
                    that.listDto = retVal;
                    that.setujDataDoGridu(retVal);
                    that.endOperation();
                })
                .fail(function (xhr, type, vobj) {
                    console.log("typ exception: ", type, vobj);
                    that.endOperation();
                });

        },
        setujDataDoGridu: function (poleDat) {
            var that = this;
            this.ViewTabulkaSZRDotazu = new Gordic.Data.View(poleDat || [], { key: "ixs_esu" });
            if (this.actions.actZpracovane.checked()) {
                this.ViewTabulkaSZRDotazu.applyView({
                    filter: function (row) {
                        return row.data.stav_async === 10
                            || row.data.stav_async === 15
                            || row.data.stav_async === 20
                            || row.data.stav_async === 30
                            || row.data.stav_async === 90;
                    }
                });

            } else {
                this.ViewTabulkaSZRDotazu.applyView({
                    filter: function (row) {
                        return row.data.stav_async === 10
                            || row.data.stav_async === 15;
                    }
                });
            }
            this.grid.ggrid("setData", this.ViewTabulkaSZRDotazu, true);
            this.updateActions();

        },

        detailEsu: function () {
            var that = this;
            var sel = that.grid.ggrid("activeRow");
            if (sel) {
                var opt = {
                    IxsEsu: sel.ixs_esu,
                    Ucel: 2,
                    Logovani: this.Logovani,
                };
                Gordic.Esu.Dialogs.DetailEsuDlg(that, opt);
            } else {
                that.dialogs.alert("jres:31900144"); //RC 31900144 : Nebyl označen řádek
            }
        },
        

        obcerstvit: function () {

            this.loadData();
        },

        updateActions: function () {
            var that = this;
            var sel = that.grid.ggrid("activeRow");
            this.actions.actDetailEsu.update({ enabled: sel && (sel.typ_sluzby_txt !== "OrgOdhlasAifo") ? true: false });
            this.actions.actVyzvednout.update({ enabled: sel && (sel.typ_sluzby_txt === "OrgOdhlasAifo") ? true : false });
        },

        
        zmenCheckedZpracovane: function() {
            this.actions.actZpracovane.checked(!this.actions.actZpracovane.checked());
            this.setujDataDoGridu(this.listDto);
        },


        cancel:function() {
            //TODO
            //(UserProcess.Configuration.GetDatabaseParameter("gin_iszr_esvynu", 0) == 0)||!stejnaPrijmeni;
        },


        closeDet: function(){
            $.content(this).close(false);

        },

     

        

    }, { extendIntellisense: GContent });
    

});

   
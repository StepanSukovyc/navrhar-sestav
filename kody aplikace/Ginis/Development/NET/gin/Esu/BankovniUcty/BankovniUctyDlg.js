

$(function () {
    "use strict";
    namespace("Gordic.Esu.WebClient.BankovniUctyDlg", {
        /// <field type='server.GEsuParamsDto'>adfasdf</field> 
        GEsuParamsDto: this.GEsuParamsDto, // dto interlicense
        /// <field type='server.GDetailEsuItemsDto'>asdfasdf</field> 
        model: this.model,
        onContentReady: function () {
            /// <summary>
            /// Vytvoření formuláře
            /// </summary>
            var that = this;
            that.inicializace();

            console.log("TabulkaBankovnichUctuDet: ", $.content(this).TabulkaBankovnichUctu);


    //#region Grid Bankovní účty

            $.content(this).actions.add({
                name: "actOtevriDetailBankovnichUctu",
                run: function (ev, ctx) {
                    console.log(ctx.cellInfo.data);
                }
            });

            var colonky = new Gordic.Data.GridFormat();
            if (that.RegDphKontrola) { 
                colonky.addIconColumn({
                    name: "reg_dph_ok",
                    caption: "jres:31900037", //RC 31900037 : Stav ověření v registru plátců DPH
                    width: 40,
                    fixedWidth: true,
                    iconTemplate: function (data) {
                        switch (data.reg_dph_ok) {
                            case 0: return { icon: "fa-check-circle g-state-text g-state-success", text: "", tooltip: "jres:31900030" }; //RC 31900030 : Účet je v pořádku - shoduje se s účtem v registru plátců DPH.
                            case -1: return { icon: "fa-exclamation-triangle g-state-text", text: "", tooltip: "jres:31900031" }; //RC 31900031 : Účet se nepodařilo ověřit proti účtům z registru plátců DPH.
                            case -3: return { icon: "fa-exclamation-triangle g-state-text g-state-warning", text: "", tooltip: "jres:31900032" }; //RC 31900032 : Účet byl nalezen v registru plátců DPH, ale není aktuálně platný.
                            default: return { icon: "fa-exclamation-triangle g-state-text g-state-important", text: "", tooltip: "jres:31900033" }; //RC 31900033 : Účet nebyl nalezen v registru plátců DPH. // default = -2
                        }
                    }
                });
            }
            colonky.addTextColumn({
                    name: "bu_ci",
                    caption: "jres:26265258", //RC 26265258 : Číslo účtu
                    description: "jres:26265258", //RC 26265258 : Číslo účtu
                    customClass: "",
                    cellTemplate: "{bu_ci}", //:number:D9
                    //sortOrder: Gordic.Data.Sorting.Inline.number("por_zast", false),
                    //width: 40,
                    //  fixedWidth: true,

                })
                .addTextColumn({
                    name: "sk_ci",
                    caption: "jres:31900038", //RC 31900038 : Směrový kód
                    description: "jres:31900038", //RC 31900038 : Směrový kód
                    customClass: "",
                    cellTemplate: "{sk_ci}", //:number:D4
                    //sortOrder: Gordic.Data.Sorting.Inline.number("por_zast", false),
                    //width: 40,
                    //  fixedWidth: true,

                })
                .addTextColumn({
                    // width: 100,
                    name: "mena_zkr",
                    caption: "jres:26265257", //RC 26265257 : Měna
                })
                .addHtmlColumn({

                    name: "priz_fu",
                    caption: "jres:31900039", //RC 31900039 : Typ účtu
                    cellTemplate: function (data) {
                        switch (data.priz_fu) {
                            case 1: return $("<span title='jres:31900042'>jres:31900040<span>");  //RC 31900042 : Účet finančního úřadu.
                            default: return $("<span title='jres:31900034'>jres:31900041<span>"); //RC 31900041 : ESU
                        }
                    }
                })
                .addTextColumn({
                    // width: 100,
                    name: "nazev_uctu",
                    caption: "jres:31900043", //RC 31900043 : Název účtu
                })
                .addTextColumn({
                    // width: 100,
                    name: "nazev",
                    caption: "jres:26265263", //RC 26265263 : Název banky
                })
                .addTextColumn({
                    // width: 100,
                    name: "bic",
                    caption: "jres:31900044", //RC 31900044 : BIC
                })
                .addTextColumn({
                    // width: 100,
                    name: "obec",
                    caption: "jres:26265266", //RC 26265266 : Sídlo banky
                })
                .addDateTimeColumn({
                    name: "dat_zmena",
                    caption: "jres:31900045", //RC 31900045 : Datum změny
                })
                .addTextColumn({
                    // width: 100,
                    name: "zmenu_prov_rf",
                    caption: "jres:26265161", //RC 26265161 : Změnu provedl
                })
                .addIconColumn({
                    name: "aktivita",
                    caption: "",
                    width: 90,
                    fixedWidth: true,
                    iconTemplate: function (data) {
                        switch (data.aktivita) {
                            case 100: return { icon: "fa-check-circle-o g-state-text g-state-success", text: "jres:26265299", tooltip: "jres:26265299" }; //RC 26265299 : Aktivní
                            case 900: return { icon: "fa-times g-state-text g-state-error", text: "jres:26265300", tooltip: "jres:26265300" }; //RC 26265300 : Odstraněn
                            default: return null;
                        }
                    }
                });

            that.gridUcty = $("<div>").appendTo(this.element).gautofit()
                .ggrid({
                    name: "GridBankovniUcty",
                    data: that.ViewTabulkaBankovnichUctu,
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "full",  // fit, full
                    customClass: "js-gridUcty",
                    navigationMode: "row", // row, cell
                    defaultAction: this.Prevzit ? $.content(this).actions.actPrevzit : $.content(this).actions.actDetailUcet,
                    // multi: true,

                    //scrollHelperTemplate: "{obec}-{ulice}",  // "{ixs_esu} - {nazev}",
                    /*
                    searchColumns: ["bu_ci", "sk_ci"],
                    */
                    columns: colonky 
                });

          
            that.VyplnDataDoGridu(); // vyplní data do gridu
            
          //  that.zakladniNastaveniPodleParametru();
        },
    //#endregion
    //#region Oblsuha policek

        inicializace: function () {
            var that = this;


            if ($.content(that).upozorneni) { // pokud přišlo upozornění z C# zobrazí jej
                GDlg.alert($.content(that).upozorneni);
            }

            //that.ZobrazSkryjNeaktivni(false); // přesunuto n a load na tab až po otevření tabu

        },

        VyplnDataDoGridu: function () {
            var that = this;
            that.ViewTabulkaBankovnichUctu = new Gordic.Data.View(this.TabulkaBankovnichUctu, { key: "bu_ci, sk_ci" });
            that.ZobrazSkryjNeaktivniBankovniUcty(false);   //vyhledani policek, naplneni pomoci DTO
            that.gridUcty.ggrid("setData", that.ViewTabulkaBankovnichUctu, true);
        },
      
        //#endregion


    //#region Metody grid Účty

        nactiNovySeznamBankovnichUctu: function () {
            var that = this;
            var opt = {
                LogovatGDPR:true
            };
            that.call("NactiSeznamBankovnichUctuZJS",opt)       //LK20170110_4, nacteni obsahu zalozky az na udalost otevreni
                        .done(function (dto) {
                            that.TabulkaBankovnichUctu = dto;
                            console.log("Tabulka Bankovnich Uctu", that.TabulkaBankovnichUctu);
                            that.ViewTabulkaBankovnichUctu = new Gordic.Data.View(that.TabulkaBankovnichUctu, { key: "bu_ci, sk_ci" });
                            that.ZobrazSkryjNeaktivniBankovniUcty(that.gridUcty.aktivita);   //vyhledani policek, naplneni pomoci DTO  //false
                            that.gridUcty.ggrid("setData", that.ViewTabulkaBankovnichUctu, true);
                        })

                        //.fail(function (xhr, type, vobj) {
                        //    console.log("typ exception: ", type);

                        //    var msg = "Chyba (server):<br/>";
                        //    $.each(vobj, function (k, v) {
                        //        for (var i = 0; i < v.length; i++)
                        //            msg += k + ": " + v[i].message + "<br/>";
                        //    });
                        //    GDlg.error(msg);

                        //})
                        .always(function () {
                        });

        },

        ZobrazitSkrytNeaktivniUcty:function(akce){
            var that =this;
            that.ZobrazSkryjNeaktivniBankovniUcty(!that.gridUcty.aktivita);
            //that.gridUcty.ggrid("setData", that.ViewTabulkaBankovnichUctu, true);
            that.gridUcty.aktivita = !that.gridUcty.aktivita;
            akce.update({ icon: that.gridUcty.aktivita ? "fa-eye-slash" : "fa-eye", caption: that.gridUcty.aktivita ? "jres:31900036" : "jres:31900035" }); //RC 31900035 : Zobrazit odstraněné
        
        },

        ZobrazSkryjNeaktivniBankovniUcty:function(zobrazit){ // zoobrazi skryje neaktivní záznamy v gridu Zastupnych osob
            var that=this;
            //var tempView = new Gordic.Data.View(that.TabulkaBankovnichUctu, { key: "bu_ci, sk_ci" });
            if(zobrazit)
            {
                that.ViewTabulkaBankovnichUctu.process({
                    filterAktivita: null
                });
            }
            else
            {
                // Původní:
                //tempView.applyView({
                //    filter: function (row) {
                //        return row.data.aktivita === 100;
                //    }
                //});
                
                //(that.GridView as any).applyView({ "filter": that._createClientFilterExpression(filter) });

                // Nové:
                that.ViewTabulkaBankovnichUctu.process({
                    filterAktivita: new Gordic.Data.FilterProcessor(
                        function (row) {
                            return row.data.aktivita === 100;
                        }
                    )
                });

            }
            //that.ViewTabulkaBankovnichUctu = new Gordic.Data.View(tempView.getRows(), { key: "bu_ci, sk_ci" });
        },

        //#endregion

        //#region Vyskakovací Detailiky
        DetailUCet: function () {
            var that = this;
            var dto = that.gridUcty.ggrid("getSelection")[0];
            if (dto) {
                that.OtevriDetail(dto);
            } else {
                that.dialogs.alert("jres:31900348"); //RC 31900348 : Nebyl označen řádek
            }

        },

        OtevriDetail:function(dto){
            var that = this;
            var opt = {
                IxsEsu: that.IxsEsu,
                UcetDto: dto,
            };
            Gordic.Esu.Dialogs.BankovniUcetDlg(that,opt,Gordic.Global.Enums.ModOtevreni.showModalWindow).on("close", function (ev, retVal) {
                if (retVal) {
                    if (retVal.stav === "Ok") {
                        that.nactiNovySeznamBankovnichUctu();

                    }
                }
            });

        
        },
        NovyUcet:function(){
            var that = this;
            var opt = {
                IxsEsu: that.IxsEsu,
            };
            Gordic.Esu.Dialogs.BankovniUcetDlg(that, opt, Gordic.Global.Enums.ModOtevreni.showModalWindow).on("close", function (ev, retVal) {
                if (retVal) {
                    if (retVal.stav === "Ok") {
                        that.nactiNovySeznamBankovnichUctu();
                    }
                }
            });

        },

        OdstranitUCet: function () {
            var that = this;
            var dto = that.gridUcty.ggrid("getSelection")[0];
            if (dto) {
                this.dialogs.messageBox("jres:31900349",//RC 31900349 : Dotaz
                    "jres:31900350", GDlg.mbbYesNo, GDlg.mbiQuestion)  //RC 31900350 : Přejete si opravdu vymazat vybraný účet?
                       .on("yes", function(){
                           that.call("OdstranitUCet", { ucetDto: dto })       //LK20170110_4, nacteni obsahu zalozky az na udalost otevreni
                          .done(function (retVal) {
                              if (retVal && retVal.stav === "ok") {
                                  that.nactiNovySeznamBankovnichUctu();
                              } else {
                                  GDlg.alert(retVal.zprava);
                              }
                          });
                       })
                       .on("close");
            } else {
                that.dialogs.alert("jres:31900144"); //RC 31900144 : Nebyl označen řádek
            }

        },
        //#end region

        
        RegistrPlatcuDPH: function () {
            var that = this;
            var dic = this.Dic;
            var nazev = this.ObchodniJmeno;
            var options = {
                dic: dic,
                nazev: nazev,
                ixs_esu: this.IxsEsu
            };
            Gordic.Esu.Dialogs.InfoNespPlatceDphDlg(that, options).on("close", function (ev, retVal) {
                
                that.nactiNovySeznamBankovnichUctu();
                
            });
        },

        prevzit: function () {
            var that = this;
            var sel = that.gridUcty.ggrid("getSelection");
            if (sel.length > 0) {
                this.tryCloseAllChildContents().done(function () {
                    that.close({ bankovniUcet: sel["0"] });
                });
            } else {
                that.dialogs.alert("jres:31900351"); //RC 31900351 : Nebyl vybrán žádný účet.
            }

        },

        closeDet: function () {
            this.tryClose();
        },
        closing: function () {
            var pocet = this.ViewTabulkaBankovnichUctu.getCount("data");
            return { pocetUctu: pocet };
        },
        saveAndCloseDet: function () {
            var that = this;
        },


   
    }, { extendIntellisense: GContent });
    

});



////  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
////  //    <Name>        Gordic.Esu.WebClient.infonespplatcedphdlg.js                </Name>
////  //    <Description> Dialog nespolehlivého plátce                               </Description>
////  //    <Author>      Šebesta David                                               </Author>
////  //    <Copyright>   © GORDIC spol. s r. o. 1993-2017                            </Copyright>
////  //    <Created>     2017-07-25                                                  </Created>
////  //  </FileHeader>


//$(function () {
//    "use strict";
//    namespace("Gordic.Esu.WebClient.InfoNespPlatceDphDlg", {

//        onContentReady: function () {

//            var that = this;

//            var Formik = new Gordic.Forms
//                .Form({ name: "HlavniForm", layoutDescriptor: "L2M1S1" })
//                .addRow("jres:32100016").addField("gstringbox", { name: "dic", disabled: true }) //RC 32100016 : DIČ
//                .addRow("jres:26265146").addField("gstringbox", { name: "nazev", disabled: true }) //RC 26265146 : Název
//                .addSection()
//                .addRow("jres:31900155").addField("gstringbox", { name: "nespolehlivyPlatce", disabled: true }) //RC 31900155 : Spolehlivost plátce
//                .addRow("jres:31900156").addField("gdatebox", {
//                    name: "datZver", tooltip: "jres:31900157", disabled: true //RC 31900157 : Datum zveřejnění nespolehlivosti
//                }) //RC 31900156 : Datum zveřejnění nesp.


//            $("<div>").appendTo(this.element).gform("createFrom", Formik);


//            // akce gridu
//            $.content(this).actions.add({
//                name: "actKliknutoNaRadek",
//                run: function (ev, ctx) {
//                    console.log(ctx.cellInfo.data);
//                }
//            });

//            // grid
//            that.gridPlatceDPH = $("<div>").appendTo(this.element)
//                .ggrid({
//                    name: "GridRegistrPlatcu",
//                    data: this.viewGridPlatcu,
//                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
//                    columnMode: "fit",  // fit, full
//                    customClass: "js-gridPlatce",
//                    navigationMode: "row", // row, cell
//                    defaultAction: $.content(this).actions.actKliknutoNaRadek,

//                    //scrollHelperTemplate: "{obec}-{ulice}",  // "{ixs_esu} - {nazev}",
//                    /*
//                    searchColumns: ["bu_ci", "sk_ci"],
//                    */
//                    columns: new Gordic.Data.GridFormat()

//                        .addTextColumn({
//                            name: "bu_ci",
//                            caption: "jres:26265258", //RC 26265258 : Číslo účtu
//                            description: "jres:26265258", //RC 26265258 : Číslo účtu
//                            customClass: "",
//                            cellTemplate: "{bu_ci}", //:number:D9


//                        })
//                        .addTextColumn({
//                            name: "sk_ci",
//                            caption: "jres:31900038", //RC 31900038 : Směrový kód
//                            description: "jres:31900038", //RC 31900038 : Směrový kód
//                            customClass: "",
//                            cellTemplate: "{sk_ci}", //:number:D4

//                        })

//                        .addTextColumn({
//                            name: "bu_txt",
//                            caption: "jres:31900152", //RC 31900152 : BÚ ke zveřejnění
//                        })

//                        .addDateTimeColumn({
//                            // width: 100,
//                            name: "dat_zverejneni_od",
//                            caption: "jres:31900153", //RC 31900153 : Datum zveřejnění
//                        })
//                        .addDateTimeColumn({
//                            // width: 100,
//                            name: "dat_zverejneni_do",
//                            caption: "jres:31900154", //RC 31900154 : Datum ukončení zveřejnění
//                        })
//                        .addDateTimeColumn({
//                            // width: 100,
//                            name: "dat_zmena",
//                            caption: "jres:26265272", //RC 26265272 : Datum změny
//                        })
//                        .addTextColumn({
//                            name: "zmenu_prov_rf",
//                            caption: "jres:26265161", //RC 26265161 : Změnu provedl
//                        })
                       
//                });


//            this.nastavData();
//        },

//        /**
//         * Nnastaví data do formu a do gridu
//         *
//         * @author  Dsebesta
//         * @date    25.07.2017
//         *
//         * @return  .
//         */

//        nastavData: function () {

//            this.findFields().gfield("model", "apply", this.dtoInfo);
//            this._pridejIkonku();
//            this.viewGridPlatcu = new Gordic.Data.View(this.listDto, { key: "bu_ci, sk_ci" });
//            this.gridPlatceDPH.ggrid("setData", this.viewGridPlatcu, true);
//        },


//        /**
//         * edituje text ve status panelu
//         *
//         * @author  Dsebesta
//         * @date    25.07.2017
//         *
//         * @return  .
//         */

//        _pridejIkonku: function () {
//            var but = $(".js-RegistrPlatcuTxtStatBar");
//            but.html(this.dtoInfo.nespolehlivyPlatce);
//            but.removeClass("g-state-text g-state-important g-state-success "); 
//            if (this.dtoInfo.imgStaryNazev === "Icons__Gin__stav_overeni_pozitivni") {
//                but.addClass("g-state-text g-state-success ");
//            }
//            else if (this.dtoInfo.imgStaryNazev === "Resources.Icons__Gin__stav_overeni_negativni") {
//                but.addClass("g-state-text g-state-important ");
//            }
//        },

//        /**
//         * aktualizace dat za mfčr
//         *
//         * @author  Dsebesta
//         * @date    25.07.2017
//         *
//         */

//        aktualizaceZMFCR: function () {
//            var that = this;
//            this.beginOperation();
//            that.call("Aktualizovat", { dtoinfo: this.dtoInfo })       //LK20170110_4, nacteni obsahu zalozky az na udalost otevreni
//                .done(function (data) {
//                    if (data){
//                        that.dtoInfo = data.dtoInfo;
//                        that.listDto = data.listDtoDoGridu;
//                        that.nastavData();
//                    }
//                })
//                .always(function () {
//                    that.endOperation();
//                });
//        },

//        /**
//         * otevře www stránky registru
//         *
//         * @author  Dsebesta
//         * @date    25.07.2017
//         *
//         * @return  .
//         */

//        jitnaWWW: function () {
//            var newdic = this.dtoInfo.dic;
//            newdic = newdic.replace("CZ", "");
//            var url = "http://adisreg.mfcr.cz/adistc/DphReg?ZPRAC=RDPHI1&id=1&pocet=2&fu=&dic=@(dic)&OK=+Hledej+&fu=&dic=";
//            url = url.replace("@(dic)", newdic);

//            window.open(url, null, "left=100,top=100,height=590,width=790,menubar=yes,resizable=yes,titlebar=yes,toolbar=yes,scrolable=yes");

//        },


//        /**
//         * zavře okno
//         *
//         * @author  Dsebesta
//         * @date    25.07.2017
//         *
//         * @return  .
//         */

//        closeDet: function () {
//            $.content(this).tryClose();
//        },

        
   


   
//    }, { extendIntellisense: GContent });
    

//});



(function ($) {
    //  Přehled zápůjček majetku { dlg_MajRes }
    "use strict";
    namespace("Gordic.Maj.WebClient.GReservaceMaj", {
        //data: {}
        onContentReady: function () {

            console.log("Gordic.Maj.WebClient.GReservaceMaj.onContentReady", this);

            var that = this;

            //=================
            // AKCE
            //=================


            // žádné akce


            //===============================================
            // MENU
            //===============================================


            this.menuBar([]);


            //============================================
            //vytvoreni gridu + definice
            //============================================

            var colWidthIcon = 25;
            var colWidthSmall = 40;
            var colWidth3Char = 55;
            var colWidthSuAu = 80;
            var colWidthAc = 85;
            var colWidthDate = 90;
            var colWidthShortText = 100;
            var colWidthMoney = 110;
            var colWidthPid = 115;
            var colWidthDateTime = 140;
            var colWidthEsuTxt = 150;
            var colWidthLongText = 250;

            var $grid = $("<div class='js-mujGrid'>")

                //.gautofit()
                .appendTo(this.element)
                .ggrid({
                    columnMode: "full",     // fit (defaultne by melo byt toto), full
                    data: this.data,
                    //defaultAction: 

                    //==========================================================
                    // SLOUPCE GRIDU { ctbl_MajRes } 
                    //==========================================================
                    columns: new Gordic.Data.GridFormat()

                        .addIconColumn({
                            name: "pic_res_txt",
                            field: "stav_res",
                            caption: ".", //RC 24534325 : Stav
                            description: "jres:24534422" + " (" + "jres:24534428" + ")", //RC 24534428 : Ikona
                            width: colWidthIcon,
                            iconTemplate: function (data) {
                                switch (data.stav_res) {
                                    case 0: return {
                                        icon: "gi-nic",
                                        text: "",
                                        tooltip: data.stav_res_txt
                                    };
                                    case 10: return {
                                        icon: "gi-kuryr", // rezervováno
                                        text: "",
                                        tooltip: data.stav_res_txt
                                    };
                                    case 20: return {
                                        icon: "gi-arrow-double", // vráceno
                                        text: "",
                                        tooltip: data.stav_res_txt
                                    };
                                    default: return {
                                        icon: "gi-exclam g-state-warning g-state-text",
                                        text: "!",
                                        tooltip: "Neznámý stav"
                                    };
                                }
                            }
                        })
                        .addTextColumn({
                            name: "stav_res_txt",
                            caption: "jres:24534325", //RC 24534325 : Stav
                            description: "jres:24534422", //RC 24534422 : Stav reservace
                            width: colWidthShortText,
                        })

                        .addIconColumn({
                            name: "typ_res_txt",
                            field: "typ_res",
                            caption: "jres:24534025", //RC 24534025 : Typ
                            description: "jres:24534421", //RC 24534421 : Typ reservace
                            width: colWidthShortText + 15,
                            iconTemplate: function (data) {
                                switch (data.typ_res) {
                                    case 0: return {
                                        icon: "gi-nic",
                                        text: data.typ_res_txt,
                                        tooltip: data.typ_res_txt
                                    };
                                    case 10: return {
                                        icon: "gi-predat", // zápůjčka
                                        text: data.typ_res_txt,
                                        tooltip: data.typ_res_txt
                                    };
                                    case 20: return {
                                        icon: "gi-inactive", // rezervace
                                        text: data.typ_res_txt,
                                        tooltip: data.typ_res_txt
                                    };
                                    case 30: return {
                                        icon: "gi-prep", // oprava
                                        text: data.typ_res_txt,
                                        tooltip: data.typ_res_txt
                                    };
                                    default: return {
                                        icon: "gi-exclam g-state-warning g-state-text",
                                        text: "!",
                                        tooltip: "Neznámý stav"
                                    };
                                }
                            }
                        })

                        .addTextColumn({
                            name: "druh_res_txt",
                            caption: ".",
                            description: "Druh reservace",
                            width: colWidthIcon,
                            cellTemplate: function (data, metarow, info) {
                                var text = "O";
                                var tooltip = "";
                                var customClass = "";
                                var font = "";
                                if (data.ixp !== null && data.ixp.length > 0) text = "U";
                                return $("<span>", { text: text, title: tooltip, "class": customClass, "style": font });
                            }
                        })

                        .addTextColumn({
                            name: "subjekt_txt",
                            caption: "jres:24534400", //  //RC 24534400 : Zapůjčeno komu
                            description: "jres:24534400",
                            width: colWidthLongText
                        })

                        .addNumberColumn({
                            name: "pmj",
                            caption: "jres:24534423", //  //RC 24534423 : Množství
                            description: "jres:24534423",
                            format: "N:3",
                            width: colWidthSmall + 30
                        })

                        .addCurrencyColumn({
                            name: "c",
                            caption: "jres:24534061", //  //RC 24534061 : Cena                            
                            description: "jres:24534061",
                            width: colWidthMoney
                        })

                        .addDateColumn({
                            name: "dat_zmena",
                            caption: "jres:24534424", //RC 24534424 : Zapůjčeno
                            description: "jres:24534424",
                            width: colWidthDate
                        })

                        .addDateColumn({
                            name: "dat_zmena",
                            caption: "jres:24534405", //RC 24534405 : Termín vrácení
                            description: "jres:24534405",
                            width: colWidthDate
                        })

                        .addDateColumn({
                            name: "dat_zmena",
                            caption: "jres:24534425", //RC 24534425 : Vráceno
                            description: "jres:24534425",
                            width: colWidthDate
                        })

                        .addTextColumn({
                            name: "prevzal_txt",
                            caption: "jres:24534401", //  //RC 24534401 : Převzal
                            description: "jres:24534401",
                            width: colWidthLongText
                        })

                });
        }, // end (prepareContent)



    }, { extendIntellisense: GContent });


})(jQuery);
(function ($) {
    //  Seznam položek příjmového/výdajového dokladu { dlg_PolPPList }
    "use strict";
    namespace("Gordic.Maj.WebClient.GPolozkyVPrevodu", {
        //data: {}
        onContentReady: function () {
            
            console.log("Gordic.Maj.WebClient.GPolozkyVPrevodu.onContentReady", this);
            
            var that = this;

            //=================
            // AKCE
            //=================
            
            // ... žádné akce

                        
            //===============================================
            // MENU
            //===============================================

            // ... žádné menu
           
            
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
                    // SLOUPCE GRIDU { ctbl_PolPP } 
                    //==========================================================
                    columns: new Gordic.Data.GridFormat()

                        .addNumberColumn({
                            name: "ser_cislo",
                            caption: "#",
                            width: colWidthSmall - 5,                           
                            fixedWidth: true,
                            customClass: "ui-disabled"                            
                        })
                        .addNumberColumn({
                            name: "kod_poh",
                            caption: "jres:24534026", //  //RC 24534026 : Kód
                            description: "jres:24534044", //RC 24534044 : Kód pohybu
                            width: 40
                        })
                    // 380.17 09.08.18 přidána skupina a druh
                        .addTextColumn({
                            name: "skupina_zkr",
                            caption: that.cvColSkupinaTitle, //RC 24534086 : Skupina
                            description: that.cvColSkupinaTitle,
                            width: 60,
                            hidden: that.cvColSkupinaHide
                        })
                        .addTextColumn({
                            name: "drh_zkr",
                            caption: that.cvColDrhTitle, // Druh
                            description: that.cvColDrhTitle,
                            width: 60,
                            hidden: that.cvColDrhHide
                        })
                        // TODO: 23.08.00 - řízení změny pozice sloupce
                        .addTextColumn({
                            name: "inv_cis",
                            caption: that.cvColInvCisTitle,
                            description: that.cvColInvCisTitle,
                            width: colWidthMoney,
                            hidden: that.cvColInvCisHide
                        })
                        .addTextColumn({
                            name: "skp",
                            caption: that.cvColSkpTitle,
                            description: that.cvColSkpTitle, //RC 24534093 : Klasifikace                            
                            width: colWidthPid - 10,
                            hidden: that.cvColSkpHide
                        })
                        .addTextColumn({
                            name: "ueab_evi",
                            caption: that.cvColUeabEviTitle,
                            description: that.cvColUeabEviTitle,
                            width: colWidthSuAu,
                            hidden: that.cvColUeabEviHide
                        })
                        .addTextColumn({
                            name: "mj",
                            caption: that.cvColMjTitle,
                            description: that.cvColMjTitle,
                            width: colWidthSmall,
                            hidden: that.cvColMjHide
                        })
                        .addCurrencyColumn({
                            name: "m",                            
                            caption: "jres:24534095",  //RC 24534095 : Počet MJ
                            width: 90
                        })
                        .addCurrencyColumn({
                            name: "c",
                            caption: "jres:24534417", //RC 24534417 : Cena položky
                            width: colWidthMoney
                        })
                        .addTextColumn({
                            name: "nazev_skp",
                            caption: that.cvColNazevSkpTitle,
                            description: that.cvColNazevSkpTitle,  //RC 24534059 : Název
                            width: colWidthLongText,
                            hidden: that.cvColNazevSkpHide
                        })
                        .addTextColumn({
                            name: "nazev",
                            caption: that.cvColNazevTitle, // Technický název
                            description: that.cvColNazevTitle,
                            width: colWidthLongText,
                            hidden: that.cvColNazevHide
                        })
                        .addTextColumn({
                            name: "vyr_cis",
                            caption: that.cvColVyrCisTitle,
                            description: that.cvColVyrCisTitle, //RC 24534110 : Výrob. č.
                            width: colWidthAc,
                            hidden: that.cvColVyrCisHide
                        })
                        .addTextColumn({
                            name: "evi_cis",
                            caption: that.cvColEviCisTitle,
                            description: that.cvColEviCisTitle, //RC 24534109 : Evid. č.
                            width: colWidthAc,
                            hidden: that.cvColEviCisHide
                        })
                        .addDateColumn({
                            name: "dat_por",
                            caption: that.cvColDatPorTitle,
                            description: that.cvColDatPorTitle, //RC 24534104 : Dat. pořízení
                            width: colWidthDate,
                            hidden: that.cvColDatPorHide
                        })
                        .addNumberColumn({
                            name: "rok_vyr",
                            caption: that.cvColRokVyrTitle,
                            description: that.cvColRokVyrTitle, // Rok výr.
                            width: colWidth3Char,
                            hidden: that.cvColRokVyrHide
                        })
                    // END GRID 
                    //==========================================================

                });
        }, // end (prepareContent)

        

    }, { extendIntellisense: GContent });
    
    
})(jQuery);
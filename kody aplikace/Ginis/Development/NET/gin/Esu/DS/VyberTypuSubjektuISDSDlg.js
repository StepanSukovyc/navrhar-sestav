/////<reference path="../Scripts/_references.js" />

(function ($) {
    "use strict";
    namespace("Gordic.Esu.WebClient.VyberTypuSubjektuISDSDlg", {
        title: "jres:26265412", //RC 26265412 : Ověření externího subjektu v ISDS
        prepareContent: function (value) {
            this.value = value;
            var Form = new Gordic.Forms
                .Form({ name: "HlavniForm", layoutDescriptor: "L1M1S1, L-4-8-0, M-12-12-0, S-12-12-0, breaks-500-1000" })
                .addSection()
                .addRow({ label: "jres:26265098" }).addField("gstringbox", { name: "esuTxt",disabled:true }) //RC 26265098 : Externí subjekt
                ;

            $("<div>").appendTo(this.element).gform("createFrom", Form);

            this.findFields("esuTxt").gfield("setValue", value && value.nazev ? value.nazev : null);


            var that = this;
            this.actions.addRange({
                actPrevzit: {
                    name: "actPrevzit",
                    caption: "jres:31900632", //RC 31900632 : Potvrdit
                    tooltip: "jres:31900633", //RC 31900633 : Potvrdit výběr
                    icon: "gi-accept",
                    customClass: "g-button--primary",
                    run: function (ev, ctx) {
                        that.prevzit();
                    }
                },
                actClose: {
                    name: "actClose",
                    caption: "jres:26265415", //RC 26265415 : Zavřít
                    icon: "gi-window-close",
                    tooltip: "jres:26265415", //RC 26265415 : Zavřít
                    run: function (ev, ctx) {
                        that.closeDet();
                    }
                },
                actvybrat: {
                    name: "actvybrat",
                    run: function (ev, ctx) {
                        that.prevzit();
                    }
                }
            });


            this.commandBar([
                { action: "actPrevzit" },
                { action: "actClose" },
            ]);


            //#region Grid Zastupne osoby

            var pole = [
                { zkratka: "FO", popis: "jres:31900203" }, //RC 31900203 : Fyzická osoba
                { zkratka: "PFO", popis: "jres:31900636" } //RC 31900636 : Podnikající fyzická osoba
            ];
            if (Gordic.Esu.Params.gin_esu_isds_vj === 0) {
                pole.push({ zkratka: "PFO_ADVOK", popis: "jres:31900638" }); //RC 31900638 : Advokáti
                pole.push({ zkratka: "PFO_DANPOR", popis: "jres:31900640" }); //RC 31900640 : Daňoví poradci
                pole.push({ zkratka: "PFO_INSSPR", popis: "jres:31900642" }); //RC 31900642 : Insolvenční správci
                pole.push({ zkratka: "PFO_AUDITOR", popis: "jres:31900897" }); //RC 31900897 : Auditoři
                pole.push({ zkratka: "PFO_ZNALEC", popis: "jres:31900898" }); //RC 31900898 : Znalci
                pole.push({ zkratka: "PFO_TLUMOCNIK", popis: "jres:31900899" }); //RC 31900899 : Soudní překladatelé nebo tlumočníci
                pole.push({ zkratka: "PFO_REQ", popis: "jres:31901124" });  //RC 31901124 : PFO na žádost
                pole.push({ zkratka: "PFO_ARCH", popis: "jres:31901125" });  //RC 31901125 : PFO architekt
                pole.push({ zkratka: "PFO_AIAT", popis: "jres:31901126" });  //RC 31901126 : PFO inženýr / technik
                pole.push({ zkratka: "PFO_AZI", popis: "jres:31901127" });  //RC 31901127 : PFO zeměměřický inženýr
            }
            pole.push({ zkratka: "PO", popis: "Právnická osoba" });
            if (Gordic.Esu.Params.gin_esu_isds_vj === 0 ) {
                pole.push({ zkratka: "PO_ZAK", popis: "jres:31900645" }); //RC 31900645 : DS jiné PO vzniklé ze zákona
                pole.push({ zkratka: "PO_REQ", popis: "jres:31900647" }); //RC 31900647 : DS jiné PO vzniklé na žádost

            }
            pole.push({ zkratka: "OVM", popis: "jres:31900649" }); //RC 31900649 : Orgány veřejné moci
            if (Gordic.Esu.Params.gin_esu_isds_vj === 0) {
                pole.push({ zkratka: "OVM_NOTAR", popis: "jres:31900650" }); //RC 31900650 : Notáři
                pole.push({ zkratka: "OVM_EXEKUT", popis: "jres:31900651" }); //RC 31900651 : Exekutoři
                pole.push({ zkratka: "OVM_REQ", popis: "jres:31900652" }); //RC 31900652 : Podřízené DS vzniklé na žádost
                pole.push({ zkratka: "OVM_FO", popis: "jres:31901143" });  //RC 31901143 : DS OVM typu PFO (např. notář, exekutor)
                pole.push({ zkratka: "OVM_PFO", popis: "jres:31901144" });  //RC 31901144 : DS OVM vzniklá z již dříve existující schránky PO nebo PO_REQ
                pole.push({ zkratka: "OVM_PO", popis: "jres:31901145" });  //RC 31901145 : DS statutárního auditora (OSVČ nebo zaměstnance)

            }




            that.gridZastupy = $("<div>").appendTo(this.element)
                .gautofit()
                .ggrid({
                    name: "GridZastupy",
                    data: new Gordic.Data.View(pole, { key: "zkratka" }),
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "fit",  // fit, full
                    customClass: "js-gridZastupy",
                    navigationMode: "row", // row, cell
                    selectAction: $.content(this).actions.actvybrat,
                    cellActivate: function (ev, row, xxx) {
                        if (row && row.cellInfo && row.cellInfo.data && row.cellInfo.data.zkratka) { // u single modu vzdy 1 ale pro jistotu testuji
                            //var x = selectionInfo.getSelection();
                            that.setTextToField(row.cellInfo.data.zkratka);
                        }
                    },
                    /*
                    searchColumns: ["zkratka"],
                    */
                    columns: new Gordic.Data.GridFormat()

                        .addTextColumn({
                            width: 100,
                            name: "zkratka",
                            caption: "jres:26265145", //RC 26265145 : Zkratka
                        })
                        .addTextColumn({
                            width: 90,
                            name: "popis",
                            caption: "jres:26265310", //RC 26265310 : Popis
                        })
                });


            //#endregion

            var Form2 = new Gordic.Forms
                .Form({ name: "HlavniForm", layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                .addSection()
                .addRow({ label: "" }).addField("gstringbox", { name: "InfoTxt", disabled: true, rows:4 })
                ;
            $("<div>").appendTo(this.element).gform("createFrom", Form2);
            this.inicializace();
        },

        inicializace: function () {
            this.gridZastupy.ggrid("activeRow", { zkratka: this.value.TypIsds });

        },
        prevzit: function () {
            var that = this;
            var sel = that.gridZastupy.ggrid("getSelection");
            if (sel.length > 0) {
                var ret = sel[0].zkratka;
                this.close(ret); //tryClose
                return;
            }
            this.close(); //tryClose
        },
        setTextToField: function (typ) {
            var text = "";
            if (typ) {
                text = this.getText(typ);
            }
            this.findFields("InfoTxt").gfield("setValue", text);
        },
        getText: function (typ) {

            var l_Parametry = "";
            var l_ParamText = "";

            if (typ.startsWith("FO")
                || typ.startsWith("PFO")) {   // Fyzicka osoba
                l_Parametry = Gordic.Esu.Params.gin_esu_isdsof;
            }
            else if (typ.startsWith("OVM")
                || typ.startsWith("PO")) {   // Pravnicka osoba
                l_Parametry = Gordic.Esu.Params.gin_esu_isdsop;
            }
            else {   // Neurceno
                l_Parametry = Gordic.Esu.Params.gin_esu_isdson;
            }

            l_Parametry = l_Parametry.replace(" ", "");
            var arr = l_Parametry.split(',');
            $(arr).each(function (index, element) {
                if (l_ParamText === "") {
                    l_ParamText += Gordic.Esu.Function.DejNazevDBSloupceTxt(element);
                }
                else {
                    l_ParamText += ", " + Gordic.Esu.Function.DejNazevDBSloupceTxt(element);
                }
            });
            return "jres:31900653: " + l_ParamText; //RC 31900653 : V systému ISDS se bude hledat dle položek

        },

       
        closeDet: function () {
            $.content(this).tryClose();
        },

        closing: function () { // podmineny userClose 
            var def = $.Deferred();
            def.resolve();
            return def.promise();
        }

    }, { extendIntellisense: GContent });
})(jQuery);
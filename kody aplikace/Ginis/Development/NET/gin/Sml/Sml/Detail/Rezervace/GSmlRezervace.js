"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GSmlRezervace.ts   	                </Name>
//    <Description>                                                             </Description>
//    <Author>      Adam Černý                                                  </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2021                            </Copyright>
//    <Created>     2021-07-22                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Sml;
    (function (Sml) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GSmlRezervace = class GSmlRezervace extends Gordic.GContentBase {
                onContentReady() {
                    this._createCondFormat();
                    this.tabFinancovani = $("<div>").appendTo(this.element);
                    this.$tabKDFPOUPREKOF = $("<div>")
                        .appendTo(this.tabFinancovani)
                        .gtab({
                        title: "jres:33500400", //RC 33500400 : KDF, POU, PRE, KOF
                        opened: false,
                    });
                    this._AddGrids();
                }
                _AddGrids() {
                    $("<div class='Grid'>")
                        .css("max-height", "100%")
                        //.appendTo(this.element)
                        .appendTo(this.$tabKDFPOUPREKOF)
                        .ggrid({
                        columnMode: "full",
                        columns: this.createColumnsRezervaceKDFPOUPREKOF(),
                        defaultProfile: {
                            columnList: this.columnListKDFPOUPREKOF(),
                            condFormats: this.my_CondFormats,
                        },
                        data: new Gordic.Isl.View(Gordic.Isl.DetailRezervace.list({
                            filters: {
                                ixp_sml: this.model.ixp_sml_pri,
                                tab: 1,
                                ktg_sml: this.model?.findoc?.ktg_sml,
                                ktg_typ: this.model.ktg_typ,
                            },
                        })),
                    });
                    let $tabPOKPOZ = $("<div>")
                        .appendTo(this.tabFinancovani)
                        .gtab({
                        title: "jres:33500401", //RC 33500401 : POK, POZ
                        opened: false,
                    });
                    $("<div class='Grid'>")
                        .css("max-height", "100%")
                        //.appendTo(this.element)
                        .appendTo($tabPOKPOZ)
                        .ggrid({
                        columnMode: "full",
                        defaultProfile: {
                            columnList: this.columnListKDFPOUPREKOF2(),
                            condFormats: this.my_CondFormats,
                        },
                        columns: this.createColumnsRezervaceKDFPOUPREKOF2(2),
                        data: new Gordic.Isl.View(Gordic.Isl.DetailRezervace.list({
                            filters: {
                                ixp_sml: this.model.ixp_sml_pri,
                                tab: 2,
                                ktg_typ: this.model.ktg_typ,
                                ktg_sml: this.model?.findoc?.ktg_sml,
                            },
                        })),
                    });
                    let $tabUCT = $("<div>")
                        .appendTo(this.tabFinancovani)
                        .gtab({
                        title: "jres:33500402", //RC 33500402 : UCT
                        opened: false,
                    });
                    $("<div class='Grid'>")
                        .css("max-height", "100%")
                        //.appendTo(this.element)
                        .appendTo($tabUCT)
                        .ggrid({
                        columnMode: "full",
                        defaultProfile: {
                            columnList: this.columnListKDFPOUPREKOF2(),
                            condFormats: this.my_CondFormats,
                        },
                        columns: this.createColumnsRezervaceKDFPOUPREKOF2(3),
                        data: new Gordic.Isl.View(Gordic.Isl.DetailRezervace.list({
                            filters: {
                                ixp_sml: this.model.ixp_sml_pri,
                                ktg_typ: this.model.ktg_typ,
                                ktg_sml: this.model?.findoc?.ktg_sml,
                                tab: 3,
                            },
                        })),
                    });
                    let $tabFUC = $("<div>")
                        .appendTo(this.tabFinancovani)
                        .gtab({
                        title: "jres:33500403", //RC 33500403 : FUC
                        opened: false,
                    });
                    $("<div class='Grid'>")
                        .css("max-height", "100%")
                        //.appendTo(this.element)
                        .appendTo($tabFUC)
                        .ggrid({
                        columnMode: "full",
                        defaultProfile: {
                            columnList: this.columnListKDFPOUPREKOF2(),
                            condFormats: this.my_CondFormats,
                        },
                        columns: this.createColumnsRezervaceKDFPOUPREKOF2(4),
                        data: new Gordic.Isl.View(Gordic.Isl.DetailRezervace.list({
                            filters: {
                                ixp_sml: this.model.ixp_sml_pri,
                                ktg_typ: this.model.ktg_typ,
                                ktg_sml: this.model?.findoc?.ktg_sml,
                                tab: 4,
                            },
                        })),
                    });
                    let $tabBUC = $("<div>")
                        .appendTo(this.tabFinancovani)
                        .gtab({
                        title: "BUC",
                        opened: false,
                    });
                    $("<div class='Grid'>")
                        .css("max-height", "100%")
                        //.appendTo(this.element)
                        .appendTo($tabBUC)
                        .ggrid({
                        columnMode: "full",
                        defaultProfile: {
                            columnList: this.columnListKDFPOUPREKOF2(),
                            condFormats: this.my_CondFormats,
                        },
                        columns: this.createColumnsRezervaceKDFPOUPREKOF2(5),
                        data: new Gordic.Isl.View(Gordic.Isl.DetailRezervace.list({
                            filters: {
                                ixp_sml: this.model.ixp_sml_pri,
                                ktg_sml: this.model?.findoc?.ktg_sml,
                                tab: 5,
                                ktg_typ: this.model.ktg_typ,
                            },
                        })),
                    });
                }
                columnListKDFPOUPREKOF() {
                    return [
                        "col_s",
                        "col_rok_sml",
                        "col_cislo_sml",
                        "col_ixp",
                        "col_ac",
                        "col_ac_esu",
                        "col_ico_esu",
                        "col_esu_txt",
                        "col_c",
                        "col_c_rez",
                        "col_dat_spl",
                        "col_dat_uhr",
                        "col_dat_zau",
                        "col_vs",
                        "col_ks",
                        "col_ss",
                        "col_bu_vl",
                        "col_sk_vl",
                        "col_bu_ci",
                        "col_sk_ci",
                        "col_zp_zkr",
                        "col_nazev_den",
                        "col_nazev_ref",
                        "col_dat_zmena",
                        "col_agd"
                    ].toString();
                }
                columnListKDFPOUPREKOF2() {
                    return [
                        "col_s",
                        "col_stav",
                        "col_rok_sml",
                        "col_cislo_sml",
                        "col_ixp",
                        "col_ac",
                        "col_ac_ag",
                        "col_ico_esu",
                        "col_esu_txt",
                        "col_popis",
                        "col_dat_evid",
                        "col_c_celkem",
                        "col_c_rez",
                        "col_kod_kon",
                        "col_vs",
                        "col_ss",
                        "col_zp_zkr",
                        "col_ixp_den_txt",
                        "col_ixs_fun_akt_txt",
                        "col_dat_zmena",
                    ].toString();
                }
                createColumnsRezervaceKDFPOUPREKOF() {
                    return new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "col_s",
                        caption: "S",
                        description: "jres:33500404", //RC 33500404 : Stav
                    })
                        .addTextColumn({
                        name: "col_rok_sml",
                        caption: "jres:33500405", //RC 33500405 : Rok
                        description: "jres:33500405",
                    })
                        .addTextColumn({
                        name: "col_cislo_sml",
                        caption: "jres:33500406", //RC 33500406 : Číslo
                        description: "jres:33500407", //RC 33500407 : Číslo
                    })
                        .addTextColumn({
                        name: "col_ixp",
                        caption: "jres:33500408", //RC 33500408 : Identifikátor dokladu
                        description: "jres:33500408",
                    })
                        .addTextColumn({
                        name: "col_ac",
                        caption: "jres:33500409", //RC 33500409 : Evidenční číslo
                        description: "jres:33500409",
                    })
                        .addTextColumn({
                        name: "col_ac_esu",
                        caption: "jres:33500410", //RC 33500410 : Číslo dodavatele
                        description: "jres:33500410",
                    })
                        .addTextColumn({
                        name: "col_ico_esu",
                        caption: "jres:33500411", //RC 33500411 : IČO
                        description: "jres:33500412", //RC 33500412 : IČO dodavatele
                    })
                        .addTextColumn({
                        name: "col_esu_txt",
                        caption: "jres:33500413", //RC 33500413 : Název subjektu
                        description: "jres:33500413",
                    })
                        .addCurrencyColumn({
                        name: "col_c",
                        caption: "jres:33500414", //RC 33500414 : Částka v CZK
                        description: "jres:33500414",
                    })
                        .addCurrencyColumn({
                        name: "col_c_rez",
                        caption: "jres:33500415", //RC 33500415 : Rezervováno
                        description: "jres:33500416", //RC 33500416 : Částka rezervováno
                    })
                        .addDateColumn({
                        name: "col_dat_spl",
                        caption: "jres:33500417", //RC 33500417 : Datum splatnosti
                        description: "jres:33500417",
                    })
                        .addDateColumn({
                        name: "col_dat_uhr",
                        caption: "jres:33500418", //RC 33500418 : Datum úhrady
                        description: "jres:33500418",
                    })
                        .addDateColumn({
                        name: "col_dat_zau",
                        caption: "jres:33500419", //RC 33500419 : Datum účtování
                        description: "jres:33500419",
                    })
                        .addTextColumn({
                        name: "col_vs",
                        caption: "jres:33500420", //RC 33500420 : VS
                        description: "jres:33500421", //RC 33500421 : Variabilní symbol
                    })
                        .addTextColumn({
                        name: "col_ks",
                        caption: "jres:33500422", //RC 33500422 : KS
                        description: "jres:33500424", //RC 33500424 : Konstantní symbol
                    })
                        .addTextColumn({
                        name: "col_ss",
                        caption: "jres:33500425", //RC 33500425 : SS
                        description: "jres:33500426", //RC 33500426 : Specifický symbol
                    })
                        .addTextColumn({
                        name: "col_bu_vl",
                        caption: "jres:33500427", //RC 33500427 : Účet vlastní
                        description: "jres:33500427",
                    })
                        .addTextColumn({
                        name: "col_sk_vl",
                        caption: "jres:33500428", //RC 33500428 : S. kód
                        description: "jres:33500428",
                    })
                        .addTextColumn({
                        name: "col_bu_ci",
                        caption: "jres:33500429", //RC 33500429 : Účet cizí
                        description: "jres:33500429",
                    })
                        .addTextColumn({
                        name: "col_sk_ci",
                        caption: "jres:33500428", //RC 33500428 : S. kód
                        description: "jres:33500428",
                    })
                        .addTextColumn({
                        name: "col_zp_zkr",
                        caption: "jres:33500430", //RC 33500430 : ZP
                        description: "jres:33500430",
                    })
                        .addTextColumn({
                        name: "col_nazev_den",
                        caption: "jres:33500431", //RC 33500431 : ID knihy
                        description: "jres:33500431",
                    })
                        .addTextColumn({
                        name: "col_nazev_ref",
                        caption: "jres:33500432", //RC 33500432 : Referent
                        description: "jres:33500433", //RC 33500433 : Vyřizující referent
                    })
                        .addDateColumn({
                        name: "col_dat_zmena",
                        caption: "jres:33500434", //RC 33500434 : Datum změny
                        description: "jres:33500434",
                    })
                        .addTextColumn({
                        name: "col_agd",
                        caption: "jres:33500435", //RC 33500435 : Kategorie
                        description: "jres:33500435",
                    });
                }
                createColumnsRezervaceKDFPOUPREKOF2(tab_p) {
                    let tab = this.GetAgenda(tab_p);
                    return new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "col_s",
                        caption: "S",
                        description: "jres:33500404", //RC 33500404 : Stav
                    })
                        .addTextColumn({
                        name: "col_stav",
                        caption: "Stav",
                        hidden: !this.VisibleColumnKof2(tab, "col_ico_esu"),
                        description: "jres:33500404", //RC 33500404 : Stav
                    })
                        .addTextColumn({
                        name: "col_rok_sml",
                        caption: "jres:33500405", //RC 33500405 : Rok
                        description: "jres:33500405",
                    })
                        .addTextColumn({
                        name: "col_cislo_sml",
                        caption: "jres:33500406", //RC 33500406 : Číslo
                        description: "jres:33500407", //RC 33500407 : Číslo
                    })
                        .addTextColumn({
                        name: "col_ixp",
                        caption: "jres:33500408", //RC 33500408 : Identifikátor dokladu
                        description: "jres:33500408",
                    })
                        .addTextColumn({
                        name: "col_ac",
                        caption: "jres:33500409", //RC 33500409 : Evidenční číslo
                        description: "jres:33500409",
                    })
                        .addTextColumn({
                        name: "col_ac_ag",
                        caption: "Agendové číslo",
                        description: "Agendové číslo",
                    })
                        .addTextColumn({
                        name: "col_ico_esu",
                        hidden: !this.VisibleColumnKof2(tab, "col_ico_esu"),
                        caption: "jres:33500411", //RC 33500411 : IČO
                        description: "jres:33500412", //RC 33500412 : IČO dodavatele
                    })
                        .addTextColumn({
                        name: "col_esu_txt",
                        hidden: !this.VisibleColumnKof2(tab, "col_ico_esu"),
                        caption: "jres:33500413", //RC 33500413 : Název subjektu
                        description: "jres:33500413",
                    })
                        .addTextColumn({
                        name: "col_popis",
                        caption: "Popis",
                        description: "Popis",
                    })
                        .addDateColumn({
                        name: "col_dat_evid",
                        caption: "Evidováno",
                        description: "Evidováno",
                    })
                        .addCurrencyColumn({
                        name: "col_c_celkem",
                        caption: "Částka v CZK",
                        description: "Částka v CZK",
                    })
                        .addCurrencyColumn({
                        name: "col_c_rez",
                        caption: "jres:33500415", //RC 33500415 : Rezervováno
                        description: "jres:33500416", //RC 33500416 : Částka rezervováno
                    })
                        .addNumberColumn({
                        name: "col_kod_kon",
                        caption: tab == 90 ? "Kontace" : "Řádek",
                        description: tab == 90 ? "Kontace" : "Řádek",
                    })
                        .addTextColumn({
                        name: "col_vs",
                        hidden: !this.VisibleColumnKof2(tab, "col_ico_esu"),
                        caption: "jres:33500420", //RC 33500420 : VS
                        description: "jres:33500421", //RC 33500421 : Variabilní symbol
                    })
                        .addTextColumn({
                        name: "col_ss",
                        hidden: !this.VisibleColumnKof2(tab, "col_ico_esu"),
                        caption: "jres:33500425", //RC 33500425 : SS
                        description: "jres:33500426", //RC 33500426 : Specifický symbol
                    })
                        .addTextColumn({
                        name: "col_zp_zkr",
                        hidden: !this.VisibleColumnKof2(tab, "col_ico_esu"),
                        caption: "jres:33500430", //RC 33500430 : ZP
                        description: "jres:33500430",
                    })
                        .addTextColumn({
                        name: "col_ixp_den_txt",
                        caption: "Kniha",
                        description: "Kniha",
                    })
                        .addTextColumn({
                        name: "col_ixs_fun_akt_txt",
                        caption: "Referent",
                        description: "Referent",
                    })
                        .addDateColumn({
                        name: "col_dat_zmena",
                        caption: "jres:33500434", //RC 33500434 : Datum změny
                        description: "jres:33500434",
                    });
                }
                VisibleColumnKof2(tab, col) {
                    if (col == "col_stav") {
                        if (tab == 90) {
                            return true;
                        }
                        else if (tab == 40) {
                            return false;
                        }
                        else if (tab == 330) {
                            return false;
                        }
                        else if (tab == 100) {
                            return false;
                        }
                    }
                    else if (col == "col_ico_esu") {
                        if (tab == 90) {
                            return true;
                        }
                        else if (tab == 40) {
                            return false;
                        }
                        else if (tab == 330) {
                            return true;
                        }
                        else if (tab == 100) {
                            return true;
                        }
                    }
                    else if (col == "col_esu_txt") {
                        if (tab == 90) {
                            return true;
                        }
                        else if (tab == 40) {
                            return false;
                        }
                        else if (tab == 330) {
                            return true;
                        }
                        else if (tab == 100) {
                            return true;
                        }
                    }
                    else if (col == "col_vs") {
                        if (tab == 90) {
                            return true;
                        }
                        else if (tab == 40) {
                            return false;
                        }
                        else if (tab == 330) {
                            return true;
                        }
                        else if (tab == 100) {
                            return true;
                        }
                    }
                    else if (col == "col_ss") {
                        if (tab == 90) {
                            return true;
                        }
                        else if (tab == 40) {
                            return false;
                        }
                        else if (tab == 330) {
                            return true;
                        }
                        else if (tab == 100) {
                            return true;
                        }
                    }
                    else if (col == "col_zp_zkr") {
                        if (tab == 90) {
                            return true;
                        }
                        else if (tab == 40) {
                            return false;
                        }
                        else if (tab == 330) {
                            return false;
                        }
                        else if (tab == 100) {
                            return true;
                        }
                    }
                    return true;
                }
                GetAgenda(tab_p) {
                    if (tab_p == 2)
                        return 90;
                    else if (tab_p == 3)
                        return 40;
                    else if (tab_p == 4)
                        return 330;
                    else if (tab_p == 5)
                        return 100;
                    else
                        return -1;
                }
                _createCondFormat() {
                    this.my_CondFormats = [];
                    this.my_CondFormats.push({ description: "col_c_rez nulové", formula: "@col_c_rez == 0", text: Gordic.Components.Grid.CondFormats.CondFormatText.red });
                }
            };
            GSmlRezervace = __decorate([
                gcontent
            ], GSmlRezervace);
            WebClient.GSmlRezervace = GSmlRezervace;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NtbFJlemVydmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTbWxSZXplcnZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSxvRkFBb0Y7QUFDcEYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUdqQixJQUFVLE1BQU0sQ0FrbUJmO0FBbG1CRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FrbUJuQjtJQWxtQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWttQjdCO1FBbG1Cb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFTbkMsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYyxTQUFRLE9BQUEsWUFBWTtnQkFPM0MsY0FBYztvQkFDVixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztvQkFFekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFFeEQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7eUJBQzdCLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO3lCQUM3QixJQUFJLENBQUM7d0JBQ0YsS0FBSyxFQUFFLGVBQWUsRUFBc0Isa0NBQWtDO3dCQUM5RSxNQUFNLEVBQUUsS0FBSztxQkFDaEIsQ0FBQyxDQUFDO29CQUVQLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFFckIsQ0FBQztnQkFFTyxTQUFTO29CQUNiLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQzt5QkFDbEIsR0FBRyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUM7d0JBQzFCLHlCQUF5Qjt5QkFDeEIsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQzt5QkFD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TyxFQUFFLENBQUM7eUJBQ1QsSUFBSSxLQUFLLElBQUksQ0FBQzt3QkFDZixPQUFPLEVBQUUsQ0FBQzt5QkFFVCxJQUFJLEtBQUssSUFBSSxDQUFDO3dCQUNmLE9BQU8sR0FBRyxDQUFDO3lCQUVWLElBQUksS0FBSyxJQUFJLENBQUM7d0JBQ2YsT0FBTyxHQUFHLENBQUM7O3dCQUVYLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7Z0JBQ08saUJBQWlCO29CQUdyQixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztvQkFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBRzNKLENBQUM7YUFDSixDQUFBO1lBdmxCWSxhQUFhO2dCQUR6QixRQUFRO2VBQ0ksYUFBYSxDQXVsQnpCO1lBdmxCWSx1QkFBYSxnQkF1bEJ6QixDQUFBO1FBQ0wsQ0FBQyxFQWxtQm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWttQjdCO0lBQUQsQ0FBQyxFQWxtQmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWttQm5CO0FBQUQsQ0FBQyxFQWxtQlMsTUFBTSxLQUFOLE1BQU0sUUFrbUJmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5TbWwuV2ViQ2xpZW50LkdTbWxSZXplcnZhY2UudHMgICBcdCAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBBZGFtIMSMZXJuw70gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIxLTA3LTIyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5TbWwuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHU21sUmV6ZXJ2YWNlSW5wdXRQYXJhbXMge1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1NtbFJlemVydmFjZVJldHVyblZhbHVlIHtcclxuICAgIH1cclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU21sUmV6ZXJ2YWNlIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb2RlbDogSW50ZXJmYWNlLkdTbWxfRGV0YWlsRHRvO1xyXG4gICAgICAgIHByaXZhdGUgbXlfQ29uZEZvcm1hdHM6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFtdO1xyXG4gICAgICAgIHRhYkZpbmFuY292YW5pOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgICR0YWJLREZQT1VQUkVLT0Y6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUNvbmRGb3JtYXQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGFiRmluYW5jb3ZhbmkgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJHRhYktERlBPVVBSRUtPRiA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMudGFiRmluYW5jb3ZhbmkpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzUwMDQwMFwiLCAgICAgICAgICAgICAgICAgICAgIC8vUkMgMzM1MDA0MDAgOiBLREYsIFBPVSwgUFJFLCBLT0ZcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9BZGRHcmlkcygpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX0FkZEdyaWRzKCkge1xyXG4gICAgICAgICAgICAkKFwiPGRpdiBjbGFzcz0nR3JpZCc+XCIpXHJcbiAgICAgICAgICAgICAgICAuY3NzKFwibWF4LWhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC8vLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLiR0YWJLREZQT1VQUkVLT0YpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlQ29sdW1uc1JlemVydmFjZUtERlBPVVBSRUtPRigpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IHRoaXMuY29sdW1uTGlzdEtERlBPVVBSRUtPRigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25kRm9ybWF0czogdGhpcy5teV9Db25kRm9ybWF0cyxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuSXNsLlZpZXcoR29yZGljLklzbC5EZXRhaWxSZXplcnZhY2UubGlzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9zbWw6IHRoaXMubW9kZWwuaXhwX3NtbF9wcmksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWI6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdGdfc21sOiB0aGlzLm1vZGVsPy5maW5kb2M/Lmt0Z19zbWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdGdfdHlwOiB0aGlzLm1vZGVsLmt0Z190eXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSkpLFxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkdGFiUE9LUE9aID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy50YWJGaW5hbmNvdmFuaSlcclxuICAgICAgICAgICAgICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzNTAwNDAxXCIsIC8vUkMgMzM1MDA0MDEgOiBQT0ssIFBPWlxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAkKFwiPGRpdiBjbGFzcz0nR3JpZCc+XCIpXHJcbiAgICAgICAgICAgICAgICAuY3NzKFwibWF4LWhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC8vLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbygkdGFiUE9LUE9aKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiB0aGlzLmNvbHVtbkxpc3RLREZQT1VQUkVLT0YyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRGb3JtYXRzOiB0aGlzLm15X0NvbmRGb3JtYXRzLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVDb2x1bW5zUmV6ZXJ2YWNlS0RGUE9VUFJFS09GMigyKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLklzbC5WaWV3KEdvcmRpYy5Jc2wuRGV0YWlsUmV6ZXJ2YWNlLmxpc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBfc21sOiB0aGlzLm1vZGVsLml4cF9zbWxfcHJpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga3RnX3R5cDogdGhpcy5tb2RlbC5rdGdfdHlwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga3RnX3NtbDogdGhpcy5tb2RlbD8uZmluZG9jPy5rdGdfc21sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pKSxcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJHRhYlVDVCA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMudGFiRmluYW5jb3ZhbmkpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzUwMDQwMlwiLCAvL1JDIDMzNTAwNDAyIDogVUNUXHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJChcIjxkaXYgY2xhc3M9J0dyaWQnPlwiKVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcIm1heC1oZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAvLy5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8oJHRhYlVDVClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogdGhpcy5jb2x1bW5MaXN0S0RGUE9VUFJFS09GMigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25kRm9ybWF0czogdGhpcy5teV9Db25kRm9ybWF0cyxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlQ29sdW1uc1JlemVydmFjZUtERlBPVVBSRUtPRjIoMyksXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5Jc2wuVmlldyhHb3JkaWMuSXNsLkRldGFpbFJlemVydmFjZS5saXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX3NtbDogdGhpcy5tb2RlbC5peHBfc21sX3ByaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGt0Z190eXA6IHRoaXMubW9kZWwua3RnX3R5cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGt0Z19zbWw6IHRoaXMubW9kZWw/LmZpbmRvYz8ua3RnX3NtbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYjogMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9KSksXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0ICR0YWJGVUMgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLnRhYkZpbmFuY292YW5pKVxyXG4gICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzM1MDA0MDNcIiwgLy9SQyAzMzUwMDQwMyA6IEZVQ1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoXCI8ZGl2IGNsYXNzPSdHcmlkJz5cIilcclxuICAgICAgICAgICAgICAgIC5jc3MoXCJtYXgtaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgLy8uYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKCR0YWJGVUMpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IHRoaXMuY29sdW1uTGlzdEtERlBPVVBSRUtPRjIoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZEZvcm1hdHM6IHRoaXMubXlfQ29uZEZvcm1hdHMsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUNvbHVtbnNSZXplcnZhY2VLREZQT1VQUkVLT0YyKDQpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuSXNsLlZpZXcoR29yZGljLklzbC5EZXRhaWxSZXplcnZhY2UubGlzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9zbWw6IHRoaXMubW9kZWwuaXhwX3NtbF9wcmksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdGdfdHlwOiB0aGlzLm1vZGVsLmt0Z190eXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdGdfc21sOiB0aGlzLm1vZGVsPy5maW5kb2M/Lmt0Z19zbWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWI6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSkpLFxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkdGFiQlVDID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy50YWJGaW5hbmNvdmFuaSlcclxuICAgICAgICAgICAgICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJCVUNcIixcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiPGRpdiBjbGFzcz0nR3JpZCc+XCIpXHJcbiAgICAgICAgICAgICAgICAuY3NzKFwibWF4LWhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC8vLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbygkdGFiQlVDKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiB0aGlzLmNvbHVtbkxpc3RLREZQT1VQUkVLT0YyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRGb3JtYXRzOiB0aGlzLm15X0NvbmRGb3JtYXRzLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVDb2x1bW5zUmV6ZXJ2YWNlS0RGUE9VUFJFS09GMig1KSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLklzbC5WaWV3KEdvcmRpYy5Jc2wuRGV0YWlsUmV6ZXJ2YWNlLmxpc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBfc21sOiB0aGlzLm1vZGVsLml4cF9zbWxfcHJpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga3RnX3NtbDogdGhpcy5tb2RlbD8uZmluZG9jPy5rdGdfc21sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiOiA1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga3RnX3R5cDogdGhpcy5tb2RlbC5rdGdfdHlwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29sdW1uTGlzdEtERlBPVVBSRUtPRigpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgXCJjb2xfc1wiLFxyXG4gICAgICAgICAgICAgICAgXCJjb2xfcm9rX3NtbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb2xfY2lzbG9fc21sXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbF9peHBcIixcclxuICAgICAgICAgICAgICAgIFwiY29sX2FjXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbF9hY19lc3VcIixcclxuICAgICAgICAgICAgICAgIFwiY29sX2ljb19lc3VcIixcclxuICAgICAgICAgICAgICAgIFwiY29sX2VzdV90eHRcIixcclxuICAgICAgICAgICAgICAgIFwiY29sX2NcIixcclxuICAgICAgICAgICAgICAgIFwiY29sX2NfcmV6XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbF9kYXRfc3BsXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbF9kYXRfdWhyXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbF9kYXRfemF1XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbF92c1wiLFxyXG4gICAgICAgICAgICAgICAgXCJjb2xfa3NcIixcclxuICAgICAgICAgICAgICAgIFwiY29sX3NzXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbF9idV92bFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb2xfc2tfdmxcIixcclxuICAgICAgICAgICAgICAgIFwiY29sX2J1X2NpXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbF9za19jaVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb2xfenBfemtyXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbF9uYXpldl9kZW5cIixcclxuICAgICAgICAgICAgICAgIFwiY29sX25hemV2X3JlZlwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb2xfZGF0X3ptZW5hXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbF9hZ2RcIlxyXG4gICAgICAgICAgICBdLnRvU3RyaW5nKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbHVtbkxpc3RLREZQT1VQUkVLT0YyKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICBcImNvbF9zXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbF9zdGF2XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbF9yb2tfc21sXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbF9jaXNsb19zbWxcIixcclxuICAgICAgICAgICAgICAgIFwiY29sX2l4cFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb2xfYWNcIixcclxuICAgICAgICAgICAgICAgIFwiY29sX2FjX2FnXCIsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXCJjb2xfaWNvX2VzdVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb2xfZXN1X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb2xfcG9waXNcIixcclxuICAgICAgICAgICAgICAgIFwiY29sX2RhdF9ldmlkXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbF9jX2NlbGtlbVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb2xfY19yZXpcIixcclxuICAgICAgICAgICAgICAgIFwiY29sX2tvZF9rb25cIixcclxuICAgICAgICAgICAgICAgIFwiY29sX3ZzXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbF9zc1wiLFxyXG4gICAgICAgICAgICAgICAgXCJjb2xfenBfemtyXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbF9peHBfZGVuX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb2xfaXhzX2Z1bl9ha3RfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbF9kYXRfem1lbmFcIixcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBdLnRvU3RyaW5nKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUNvbHVtbnNSZXplcnZhY2VLREZQT1VQUkVLT0YoKTogR0dyaWRDb2x1bW48SW50ZXJmYWNlLkdEZXRhaWxSZXplcnZhY2VEdG8+W10gfCBEYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkdEZXRhaWxSZXplcnZhY2VEdG8+IHwgdW5kZWZpbmVkIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvbF9zXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDQwNFwiLCAvL1JDIDMzNTAwNDA0IDogU3RhdlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvbF9yb2tfc21sXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNDA1XCIsIC8vUkMgMzM1MDA0MDUgOiBSb2tcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNDA1XCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvbF9jaXNsb19zbWxcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA0MDZcIiwgLy9SQyAzMzUwMDQwNiA6IMSMw61zbG9cclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNDA3XCIsIC8vUkMgMzM1MDA0MDcgOiDEjMOtc2xvXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvbF9peHBcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA0MDhcIiwgLy9SQyAzMzUwMDQwOCA6IElkZW50aWZpa8OhdG9yIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNDA4XCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY29sX2FjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNDA5XCIsIC8vUkMgMzM1MDA0MDkgOiBFdmlkZW7EjW7DrSDEjcOtc2xvXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDQwOVwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjb2xfYWNfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNDEwXCIsIC8vUkMgMzM1MDA0MTAgOiDEjMOtc2xvIGRvZGF2YXRlbGVcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNDEwXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvbF9pY29fZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNDExXCIsIC8vUkMgMzM1MDA0MTEgOiBJxIxPXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDQxMlwiLCAvL1JDIDMzNTAwNDEyIDogScSMTyBkb2RhdmF0ZWxlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvbF9lc3VfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNDEzXCIsIC8vUkMgMzM1MDA0MTMgOiBOw6F6ZXYgc3ViamVrdHVcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNDEzXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvbF9jXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNDE0XCIsIC8vUkMgMzM1MDA0MTQgOiDEjMOhc3RrYSB2IENaS1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA0MTRcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY29sX2NfcmV6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNDE1XCIsIC8vUkMgMzM1MDA0MTUgOiBSZXplcnZvdsOhbm9cclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNDE2XCIsIC8vUkMgMzM1MDA0MTYgOiDEjMOhc3RrYSByZXplcnZvdsOhbm9cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjb2xfZGF0X3NwbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDQxN1wiLCAvL1JDIDMzNTAwNDE3IDogRGF0dW0gc3BsYXRub3N0aVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA0MTdcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjb2xfZGF0X3VoclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDQxOFwiLCAvL1JDIDMzNTAwNDE4IDogRGF0dW0gw7pocmFkeVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA0MThcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY29sX2RhdF96YXVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA0MTlcIiwgLy9SQyAzMzUwMDQxOSA6IERhdHVtIMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA0MTlcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY29sX3ZzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNDIwXCIsIC8vUkMgMzM1MDA0MjAgOiBWU1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA0MjFcIiwgLy9SQyAzMzUwMDQyMSA6IFZhcmlhYmlsbsOtIHN5bWJvbFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjb2xfa3NcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA0MjJcIiwgLy9SQyAzMzUwMDQyMiA6IEtTXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDQyNFwiLCAvL1JDIDMzNTAwNDI0IDogS29uc3RhbnRuw60gc3ltYm9sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY29sX3NzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNDI1XCIsIC8vUkMgMzM1MDA0MjUgOiBTU1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA0MjZcIiwgLy9SQyAzMzUwMDQyNiA6IFNwZWNpZmlja8O9IHN5bWJvbFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvbF9idV92bFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDQyN1wiLCAvL1JDIDMzNTAwNDI3IDogw5rEjWV0IHZsYXN0bsOtXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDQyN1wiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvbF9za192bFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDQyOFwiLCAvL1JDIDMzNTAwNDI4IDogUy4ga8OzZFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA0MjhcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY29sX2J1X2NpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNDI5XCIsIC8vUkMgMzM1MDA0MjkgOiDDmsSNZXQgY2l6w61cclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNDI5XCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY29sX3NrX2NpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNDI4XCIsIC8vUkMgMzM1MDA0MjggOiBTLiBrw7NkXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDQyOFwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvbF96cF96a3JcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA0MzBcIiwgLy9SQyAzMzUwMDQzMCA6IFpQXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDQzMFwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjb2xfbmF6ZXZfZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNDMxXCIsIC8vUkMgMzM1MDA0MzEgOiBJRCBrbmloeVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA0MzFcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjb2xfbmF6ZXZfcmVmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNDMyXCIsIC8vUkMgMzM1MDA0MzIgOiBSZWZlcmVudFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA0MzNcIiwgLy9SQyAzMzUwMDQzMyA6IFZ5xZlpenVqw61jw60gcmVmZXJlbnRcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjb2xfZGF0X3ptZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNDM0XCIsIC8vUkMgMzM1MDA0MzQgOiBEYXR1bSB6bcSbbnlcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNDM0XCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvbF9hZ2RcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA0MzVcIiwgLy9SQyAzMzUwMDQzNSA6IEthdGVnb3JpZVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA0MzVcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVDb2x1bW5zUmV6ZXJ2YWNlS0RGUE9VUFJFS09GMih0YWJfcCA6IG51bWJlcik6IEdHcmlkQ29sdW1uPEludGVyZmFjZS5HRGV0YWlsUmV6ZXJ2YWNlRHRvPltdIHwgRGF0YS5HcmlkRm9ybWF0PEludGVyZmFjZS5HRGV0YWlsUmV6ZXJ2YWNlRHRvPiB8IHVuZGVmaW5lZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGFiIDogbnVtYmVyID0gdGhpcy5HZXRBZ2VuZGEodGFiX3ApO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjb2xfc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA0MDRcIiwgLy9SQyAzMzUwMDQwNCA6IFN0YXZcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjb2xfc3RhdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3RhdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbjogIXRoaXMuVmlzaWJsZUNvbHVtbktvZjIodGFiLCBcImNvbF9pY29fZXN1XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA0MDRcIiwgLy9SQyAzMzUwMDQwNCA6IFN0YXZcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjb2xfcm9rX3NtbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDQwNVwiLCAvL1JDIDMzNTAwNDA1IDogUm9rXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDQwNVwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjb2xfY2lzbG9fc21sXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNDA2XCIsIC8vUkMgMzM1MDA0MDYgOiDEjMOtc2xvXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDQwN1wiLCAvL1JDIDMzNTAwNDA3IDogxIzDrXNsb1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjb2xfaXhwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNDA4XCIsIC8vUkMgMzM1MDA0MDggOiBJZGVudGlmaWvDoXRvciBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDQwOFwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvbF9hY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDQwOVwiLCAvL1JDIDMzNTAwNDA5IDogRXZpZGVuxI1uw60gxI3DrXNsb1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA0MDlcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY29sX2FjX2FnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJBZ2VuZG92w6kgxI3DrXNsb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkFnZW5kb3bDqSDEjcOtc2xvXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvbF9pY29fZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiAhdGhpcy5WaXNpYmxlQ29sdW1uS29mMih0YWIsIFwiY29sX2ljb19lc3VcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNDExXCIsIC8vUkMgMzM1MDA0MTEgOiBJxIxPXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDQxMlwiLCAvL1JDIDMzNTAwNDEyIDogScSMTyBkb2RhdmF0ZWxlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY29sX2VzdV90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBoaWRkZW46ICF0aGlzLlZpc2libGVDb2x1bW5Lb2YyKHRhYiwgXCJjb2xfaWNvX2VzdVwiKSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA0MTNcIiwgLy9SQyAzMzUwMDQxMyA6IE7DoXpldiBzdWJqZWt0dVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA0MTNcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY29sX3BvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQb3Bpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvbF9kYXRfZXZpZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRXZpZG92w6Fub1wiLCBcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJFdmlkb3bDoW5vXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvbF9jX2NlbGtlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwixIzDoXN0a2EgdiBDWktcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwixIzDoXN0a2EgdiBDWktcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY29sX2NfcmV6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNDE1XCIsIC8vUkMgMzM1MDA0MTUgOiBSZXplcnZvdsOhbm9cclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNDE2XCIsIC8vUkMgMzM1MDA0MTYgOiDEjMOhc3RrYSByZXplcnZvdsOhbm9cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjb2xfa29kX2tvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRhYiA9PSA5MCA/IFwiS29udGFjZVwiIDogXCLFmMOhZGVrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRhYiA9PSA5MCA/IFwiS29udGFjZVwiIDogXCLFmMOhZGVrXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvbF92c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbjogIXRoaXMuVmlzaWJsZUNvbHVtbktvZjIodGFiLCBcImNvbF9pY29fZXN1XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDQyMFwiLCAvL1JDIDMzNTAwNDIwIDogVlNcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNDIxXCIsIC8vUkMgMzM1MDA0MjEgOiBWYXJpYWJpbG7DrSBzeW1ib2xcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvbF9zc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbjogIXRoaXMuVmlzaWJsZUNvbHVtbktvZjIodGFiLCBcImNvbF9pY29fZXN1XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDQyNVwiLCAvL1JDIDMzNTAwNDI1IDogU1NcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNDI2XCIsIC8vUkMgMzM1MDA0MjYgOiBTcGVjaWZpY2vDvSBzeW1ib2xcclxuICAgICAgICAgICAgICAgIH0pICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY29sX3pwX3prclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbjogIXRoaXMuVmlzaWJsZUNvbHVtbktvZjIodGFiLCBcImNvbF9pY29fZXN1XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDQzMFwiLCAvL1JDIDMzNTAwNDMwIDogWlBcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNDMwXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY29sX2l4cF9kZW5fdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJLbmloYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIktuaWhhXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY29sX2l4c19mdW5fYWt0X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUmVmZXJlbnRcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSZWZlcmVudFwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY29sX2RhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDQzNFwiLCAvL1JDIDMzNTAwNDM0IDogRGF0dW0gem3Em255XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDQzNFwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBWaXNpYmxlQ29sdW1uS29mMih0YWI6IG51bWJlciwgY29sOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgaWYgKGNvbCA9PSBcImNvbF9zdGF2XCIpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0YWIgPT0gOTApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRhYiA9PSA0MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRhYiA9PSAzMzApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0YWIgPT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbCA9PSBcImNvbF9pY29fZXN1XCIpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0YWIgPT0gOTApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRhYiA9PSA0MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRhYiA9PSAzMzApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRhYiA9PSAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjb2wgPT0gXCJjb2xfZXN1X3R4dFwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFiID09IDkwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0YWIgPT0gNDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0YWIgPT0gMzMwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0YWIgPT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY29sID09IFwiY29sX3ZzXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0YWIgPT0gOTApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRhYiA9PSA0MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRhYiA9PSAzMzApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRhYiA9PSAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjb2wgPT0gXCJjb2xfc3NcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhYiA9PSA5MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGFiID09IDQwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGFiID09IDMzMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGFiID09IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbCA9PSBcImNvbF96cF96a3JcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhYiA9PSA5MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGFiID09IDQwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGFiID09IDMzMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRhYiA9PSAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdldEFnZW5kYSh0YWJfcDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgaWYgKHRhYl9wID09IDIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gOTA7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRhYl9wID09IDMpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gNDA7XHJcblxyXG4gICAgICAgICAgICBlbHNlIGlmICh0YWJfcCA9PSA0KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDMzMDtcclxuXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRhYl9wID09IDUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTAwO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX2NyZWF0ZUNvbmRGb3JtYXQoKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5teV9Db25kRm9ybWF0cyA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLm15X0NvbmRGb3JtYXRzLnB1c2goeyBkZXNjcmlwdGlvbjogXCJjb2xfY19yZXogbnVsb3bDqVwiLCBmb3JtdWxhOiBcIkBjb2xfY19yZXogPT0gMFwiLCB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LnJlZCB9KTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
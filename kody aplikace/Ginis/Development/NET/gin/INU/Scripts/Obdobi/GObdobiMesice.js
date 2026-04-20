"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Inu.WebClient.GObdobiMesice.js                                                        </Name>
//    <Description> GPrepoctyStavu                                                                                  </Description>
//    <Author>      Jiří Ileček                                                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2016                                                                </Copyright>
//    <Created>     2016-03-03                                                                                      </Created>
//  </FileHeader>
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Inu;
    (function (Inu) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GObdobiMesice = class GObdobiMesice extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    //protected max_uzavreny_mesic: number;
                    this.celkem_neprepocteno = 0;
                    this.globals = Gordic.Inu.Globals.GInuGlobals;
                    this.MesiceData = [];
                    /**
                     * Vybrany radek
                     * */
                    this.selectedRow = null;
                }
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    if (this.agenda == "UCT") {
                        this.title = "jres:30450009"; //RC 30450009 : Měsíční období účetnictví
                    }
                    else {
                        this.title = "jres:30450010"; //RC 30450010 : Měsíční období rozpočtu
                    }
                    $tab.empty();
                    var cnt = this;
                    //nastavení akcí
                    this.actions.addRange({
                        actOtevrit: {
                            caption: "jres:30250288", icon: "gi-plus", //RC 30250288 : Nové období
                            tooltip: "jres:30450012", //RC 30450012 : Otevření nového období. Automaticky otevře měsíc, který následuje po nejvyšším dosud otevřeném měsíci v rámci účetního střediska.
                            favorite: true,
                            enabled: false,
                            run: function () {
                                that.ProvedAkce(10 /* Gordic.Inu.Interface.GEOperaceSObdobim.OtevreniObdobi */);
                            }
                        },
                        actHromadneOtevrit: {
                            caption: "jres:30450006".format(Gordic.Consts.DbShortcuts.ucs), icon: "gi-plus", //RC 30450006 : Nové období pro všechna {0}
                            tooltip: "jres:30450018", //RC 30450018 : Otevření nového období účtování pro všechna účetní střediska. Automaticky se otevře první měsíc, který následuje po nejvyšším dosud otevřeném měsíci v rámci účetního střediska.
                            favorite: true,
                            enabled: false,
                            run: function () {
                                that.ProvedHromadneAkce(10 /* Gordic.Inu.Interface.GEOperaceSObdobim.OtevreniObdobi */);
                            }
                        },
                        actHromadneUzavrit: {
                            caption: "jres:30450007".format(Gordic.Consts.DbShortcuts.ucs), icon: "gi-vyrizenouza", //RC 30450007 : Uzavřít pro všechna {0}
                            tooltip: "jres:30450019", //RC 30450019 : Uzavření období účtování pro všechna účetní střediska. Automaticky se uzavře první neuzavřený měsíc, který následuje po nejvyšším uzavřeném měsíci v rámci účetního střediska.
                            favorite: true,
                            enabled: false,
                            run: function () {
                                that.ProvedHromadneAkce(20 /* Gordic.Inu.Interface.GEOperaceSObdobim.UzavreniObdobi */);
                            }
                        },
                        actDetail: Gordic.Eko.Action.actionDetail({
                            enabled: false,
                            run: () => {
                                var radek = that.selectedRow;
                                if (typeof radek !== undefined && radek != null)
                                    that.ProvedAkce(47 /* Gordic.Inu.Interface.GEOperaceSObdobim.DetailObdobi */);
                            }
                        }),
                        actUzavrit: {
                            caption: "jres:30250107", //RC 30250107 : Uzavřít
                            icon: "gi-vyrizenouza",
                            tooltip: "jres:30450017", //RC 30450017 : Uzavření období
                            favorite: true,
                            enabled: false,
                            run: function () {
                                that.ProvedAkce(20 /* Gordic.Inu.Interface.GEOperaceSObdobim.UzavreniObdobi */);
                            }
                        },
                        actAktualizovat: {
                            caption: "jres:30250078", //RC 30250078 : Aktualizovat nastavení období
                            tooltip: "jres:30450013", //RC 30450013 : Promítne nové nastavení pro účtování(nově povolené druhy dokladů, nově založené účetní subřady) do již otevřeného období účtování.
                            icon: "gi-refresh",
                            favorite: true,
                            enabled: false,
                            run: function () {
                                if (that.selectedRow != null)
                                    that.ProvedAkce(32 /* Gordic.Inu.Interface.GEOperaceSObdobim.AktualizaceObdobi */);
                            }
                        },
                        actStavKontroly: {
                            caption: "jres:30250370", //RC 30250370 : Stav kontroly
                            favorite: true,
                            enabled: false,
                            run: function () {
                                if (that.selectedRow != null)
                                    that.ProvedAkce(48 /* Gordic.Inu.Interface.GEOperaceSObdobim.StavKontroly */);
                            }
                        },
                        actZpetneOtevrit: {
                            caption: "jres:30250080", //RC 30250080 : Zpětně otevřít
                            favorite: true,
                            enabled: false,
                            run: function () {
                                if (that.selectedRow != null) {
                                    Gordic.Eko.WebClient.Common.Dotaz(that, "jres:30250376".format(that.selectedRow.mesic, that.selectedRow.rok)) //RC 30250376 : Opravdu chcete zpětně otevřít období {0}/{1}?
                                        .done(function (parametr) {
                                        if (parametr === "YES")
                                            that.ProvedAkce(30 /* Gordic.Inu.Interface.GEOperaceSObdobim.ZpetneOtevritUzavreniObdobi */, that.selectedRow);
                                    });
                                }
                                //that.zpetne_otevrit_mesic(akt_mesic_i);
                            }
                        },
                        actAktualizovatStv: {
                            caption: "jres:30250082", icon: "gi-refresh", //RC 30250082 : Aktualizovat stavy
                            favorite: true,
                            enabled: false,
                            run: function () {
                                //console.log("Aktualizovat stavy " + that.akt_mesic.mesic_txt);
                                that.ProvedAkce(33 /* Gordic.Inu.Interface.GEOperaceSObdobim.AktualizaceStavu */);
                            }
                        },
                        actPredatKeSchvaleni: {
                            caption: "jres:30250373", //RC 30250373 : Předat ke schválení
                            favorite: true,
                            enabled: false,
                            visible: that.sendToAuthorizePermit.value,
                            run: function () {
                                if (that.selectedRow != null) {
                                    Gordic.Eko.WebClient.Common.Dotaz(that, "jres:30250377".format(that.selectedRow?.mesic, that.GlobalParams.EkoParams?.ROK)) //RC 30250377 : Předáním uzávěrky měsíčního období {0}/{1} ke schválení již nebude možné dané období zpětně otevřít.;Opravdu chcete uzávěrku daného měsíčního období předat ke schválení?
                                        .done(function (parametr) {
                                        if (parametr === "YES")
                                            that.ProvedAkce(40 /* Gordic.Inu.Interface.GEOperaceSObdobim.PredatKeSchvaleni */, that.selectedRow);
                                    });
                                }
                                //that.zpetne_otevrit_mesic(akt_mesic_i);
                            }
                        },
                        actZrusitSchvaleni: {
                            caption: "jres:30250374", //RC 30250374 : Zrušit schválení
                            favorite: true,
                            enabled: false,
                            visible: that.cancelSendToAuthorizePermit.visible,
                            run: function () {
                                if (that.selectedRow != null) {
                                    Gordic.Eko.WebClient.Common.Dotaz(that, "jres:30250378".format(that.selectedRow?.mesic, that.GlobalParams.EkoParams?.ROK)) //RC 30250378 : Opravdu chcete uzávěrku měsíčního období {0}/{1} vrátit k přepracování?
                                        .done(function (parametr) {
                                        if (parametr === "YES")
                                            that.ProvedAkce(41 /* Gordic.Inu.Interface.GEOperaceSObdobim.ZrusitPredatKeSchvaleni */, that.selectedRow);
                                    });
                                }
                            }
                        },
                        actSchvalit: {
                            caption: "jres:30250375", //RC 30250375 : Schválit
                            favorite: true,
                            enabled: false,
                            visible: that.authorizePermit.visible,
                            run: function () {
                                if (that.selectedRow != null) {
                                    Gordic.Eko.WebClient.Common.Dotaz(that, "jres:30250379".format(that.selectedRow?.mesic, that.GlobalParams.EkoParams?.ROK)) //RC 30250379 : Schválením uzávěrky měsíčního období {0}/{1} již nebude možné dané období zpětně otevřít. Opravdu chcete schválit uzávěrku daného měsíčního období?
                                        .done(function (parametr) {
                                        if (parametr === "YES")
                                            that.ProvedAkce(42 /* Gordic.Inu.Interface.GEOperaceSObdobim.SchvalitUzaverku */, that.selectedRow);
                                    });
                                }
                            }
                        },
                        actBlokOkruhy: {
                            caption: "jres:30250383", //RC 30250383 : Blokační okruhy
                            favorite: true,
                            enabled: false,
                            run: function () {
                                if (that.selectedRow != null) {
                                    that.ProvedAkce(31 /* Gordic.Inu.Interface.GEOperaceSObdobim.BlokacniOkruhy */, that.selectedRow);
                                }
                            }
                        },
                        //actSepBlokOkruhy: {
                        //    type: "separator",
                        //    caption: "jres:30250383",  //RC 30250383 : Blokační okruhy
                        //    visible: true,
                        //    run: ()=>{}
                        //},
                    });
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actOtevrit*", "actDetail*", "actUzavrit*", "actAktualizovat*", "actZpetneOtevrit*", // "actAktualizovatStv*", 
                        { type: "separator" },
                        { id: "menuOtevrit", action: that.actions.actHromadneOtevrit, favorite: false },
                        { id: "menuUzavrit", action: that.actions.actHromadneUzavrit, favorite: false },
                        //{
                        //    id: "menuHromadOperace", caption: "jres:30250358", type: "static", favorite: false, children: [ //RC 30250358 : Hromadné operace
                        //        { id: "menuOtevrit", action: that.actions.actHromadneOtevrit, favorite: false },
                        //        { id: "menuUzavrit", action: that.actions.actHromadneUzavrit, favorite: false },
                        //    ]
                        //}
                        ,
                        { type: "separator" },
                        "actStavKontroly*",
                        { type: "separator" },
                        "actBlokOkruhy",
                        { type: "separator" },
                        "actPredatKeSchvaleni",
                        "actZrusitSchvaleni",
                        "actSchvalit"
                    ]));
                    //var itemtemplate_mesic = "<div style='border:1px solid LightGray; padding: 5px; width:230px; height:250px;'>" +
                    //    //"<div style='background-color: {barva_txt}; padding: 5px;'>" +
                    //    "<div style='padding: 5px;'>" +
                    //    "<h3><i class='fa {sl1}' style='color: gray;' aria-hidden='true'></i>       {mesic} - {mesic_txt}</h3>" +
                    //    "</div><div style='width:219px; padding: 5px;'>" +
                    //    "<h3 style='color: {aktivita_color};'>{aktivita_txt}</h3>" +
                    //    "<p>" + Gordic.Consts.DbShortcuts.ucs+": {ucs}</p>" +
                    //    "<p>Zápisů celkem: {pocet_zapisu_celkem_txt}</p>" +                
                    //    "<p>Zápisů nepřepočteno: {pocet_zapisu_neprepocteno_txt}</p><p class='fa {aktualni_stavy_ikona}' style='color: gray;' aria-hidden='true'></p><br><br>" +
                    //    //                "<div><button name='tlacitko'>&nbsp</button><button name='tlacitko2'></button></div>" +
                    //    "</div></div>";
                    //that.DataView = new Gordic.Data.View(that.MesiceData, { key: "id", processors: { provider: provider, treeProcessor: treeProcessor } });
                    that.DataView = new Gordic.Data.View(that.MesiceData, { key: "rok,lic,ico,ucs,mesic" });
                    // vytvoreni fitru panelu
                    this.createFilterPanel(this);
                    //that.gridFormatSeznam = new Gordic.Data.GridFormat()
                    //    .addIconColumn({
                    //        name: "aktivita",
                    //        field: "aktivita",
                    //        caption: "Stav",
                    //        formatPreset: Gordic.Global.Enums.GridColumnFormatIcon.full,
                    //        width: 240,
                    //        iconTemplate: function (data) {
                    //            //return { icon: data.sl1, text: data.aktivita_txt, caption: data.aktivita_txt, tooltip: data.aktivita_txt };
                    //            switch (data.akt_obd) {
                    //                case 100: return { icon: data.sl1 + " g-state-success g-state-text", text: data.aktivita_txt, caption: data.aktivita_txt, tooltip: data.aktivita_txt };
                    //                case 500: return { icon: data.sl1 + " g-state-error g-state-text", text: data.aktivita_txt, caption: data.aktivita_txt, tooltip: data.aktivita_txt };
                    //                default: return null;
                    //            }
                    //        }
                    //    })
                    //    .addTextColumn({
                    //        name: "aktivita_zkr",
                    //        caption: " S",
                    //        width: 30
                    //    })
                    //    .addNumberColumn({
                    //        name: "rok",
                    //        caption: "Rok",
                    //        width: 60
                    //    })
                    //    //.addTextColumn({
                    //    //    name: "ico",
                    //    //    caption: "IČ",
                    //    //    width: 100
                    //    //})
                    //    .addTextColumn({
                    //        name: "ucs",
                    //        caption: Gordic.Consts.DbShortcuts.ucs,//this.GlobalParams.Zkratky?.Ucs,
                    //        width: 100
                    //    })
                    //    .addNumberColumn({
                    //        name: "mesic",
                    //        caption: "Měsíc",
                    //        width: 70
                    //    })
                    //    .addNumberColumn({
                    //        name: "pocet_zapisu_neprepocteno",
                    //        caption: "Zápisů nepřepočteno",
                    //        width: 170
                    //    })
                    //    .addNumberColumn({
                    //        name: "pocet_zapisu_celkem",
                    //        caption: "Celkem zápisů",
                    //        width: 170
                    //    });
                    //if (that.agenda == "UCT" ) {
                    //    that.gridFormatSeznam
                    //        .addIconColumn({
                    //            name: "blok",
                    //            field: "blok",
                    //            caption: " B",
                    //            width: 20, 
                    //            formatPreset: Gordic.Global.Enums.GridColumnFormatIcon.text,
                    //            iconTemplate: function (data) {
                    //                switch (data!.blok) {
                    //                    case 0: return { icon: "fa-fw", text: " ", caption: "Neblokováno", tooltip: "Neblokováno" };
                    //                    default: return { icon: "gi-tick", text: "B", caption: "Blokováno", tooltip: "Blokováno" };
                    //                }
                    //            }
                    //        })
                    //}
                    that.gridFormatSeznam = new Gordic.Data.GridFormat();
                    that.gridFormatSeznam
                        .addTextColumn({
                        name: "aktivita_zkr",
                        field: "aktivita_zkr",
                        caption: " S",
                        description: "Stav období",
                        width: 30,
                    });
                    if (that.agenda == "UCT") {
                        that.gridFormatSeznam
                            .addTextColumn({
                            name: "blokace_zkr",
                            field: "blokace_zkr",
                            caption: " B",
                            description: "Stav blokace",
                            width: 30,
                        });
                    }
                    that.gridFormatSeznam
                        //.addTextColumn({
                        //    name: "aktivita_txt",
                        //    field: "aktivita_txt",
                        //    caption: "Stav období",
                        //    width: 160,
                        //})
                        .addTextColumn({
                        name: "ucs",
                        caption: Gordic.Consts.DbShortcuts.ucs, //this.GlobalParams.Zkratky?.Ucs,
                        width: 100
                    })
                        .addTextColumn({
                        name: "lic",
                        caption: "Lic",
                        width: 100
                    })
                        .addNumberColumn({
                        name: "mesic",
                        caption: "Měsíc",
                        width: 70
                    })
                        .addNumberColumn({
                        name: "rok",
                        caption: "Rok",
                        width: 70
                    })
                        .addNumberColumn({
                        name: "pocet_zapisu_neprepocteno",
                        caption: "Nepřepočteno zápisů",
                        width: 170
                    })
                        .addNumberColumn({
                        name: "pocet_zapisu_celkem",
                        caption: "Celkem zápisů",
                        width: 170
                    })
                        .addTextColumn({
                        name: "schvaleni_zkr",
                        field: "schvaleni_zkr",
                        caption: "Schv",
                        description: "Stav schválení",
                        width: 50,
                    });
                    //naplnění do gridu
                    this.elem = $("<div>").appendTo(cnt.element);
                    this.elem.gautofit()
                        .ggrid({
                        columnMode: "full",
                        //multi: true,
                        selection: function (ev, o) {
                            //if (o.count == 1) cnt.actions.actEditAkce!.updatePermission(o.getSelection()[0].Permissions, "LzeEditovat");
                            var vybraneRadky = o.getSelection(true);
                            if (vybraneRadky.length === 1) {
                                var v_radek_meta = vybraneRadky[0]; // $(this).ggrid("activeRow", true);
                                if (v_radek_meta && !v_radek_meta._isVirtual) {
                                    var v_radek = v_radek_meta.data;
                                    if (typeof v_radek.ico !== "undefined")
                                        that.selectedRow = v_radek;
                                    else
                                        that.selectedRow = null;
                                    that.RefreshAction(that.selectedRow);
                                }
                            }
                        },
                        cellActivate(ev, ctx) {
                        },
                        defaultAction: this.actions.actDetail,
                        searchColumns: ["mesic"],
                        columns: that.gridFormatSeznam
                    });
                    this.elem.ggrid("setData", that.DataView);
                    //this.elem.gcardpanel({
                    //    editable: false,
                    //    title: "jres:30250083".format(this.agenda), //RC 30250083 : Seznam období {0}
                    //    data: that.DataView, //that.MesiceData,
                    //    itemTemplate: itemtemplate_mesic,
                    //        //form: this.obdForm,
                    //    //createTab: false,
                    //    defaultAction: this.actions.actDetail,               
                    //    selection: function (ev, data: Gordic.Inu.Interface.GInuObdobiDto) {
                    //        if (typeof data.ico !== "undefined")
                    //            that.selectedRow = data;
                    //        else
                    //            that.selectedRow = null;
                    //        that.RefreshAction(that.selectedRow);
                    //      }
                    //});
                    that.findFields("ucs").gfield("setValue", { ucs: this.GlobalParams.EkoParams?.UCS, ico: this.GlobalParams.EkoParams?.ICO }, true);
                    that.RefreshAction();
                    //that.Reload({ ucs: this.GlobalParams.EkoParams?.UCS});
                }
                /**
                 * function CreateFilterZalozka
                 *
                 * Obecna zalozka
                 * @param {GContent} content
                 * @returns {any}
                 */
                CreateFilterZalozka() {
                    var that = this;
                    var filterFormDef = new Gordic.Forms.Form({ /*opened: true, layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1",*/ tabLabel: "jres:30250438",
                        //    complete: function (a) {
                        //        new Gordic.Data.Readers.Ekosucs()
                        //            .getData({
                        //                    ico: that.serverContext.ico,
                        //                    rok_od: "<= " + that.serverContext.rok,
                        //                    rok_do: ">= " + that.serverContext.rok,
                        //            }).then((data) => {
                        //                if (data.length == 2) {
                        //                    $(that).findFields("ucs").gfield("option", "disabled", true);
                        //                }
                        //                console.log(data.length)
                        //            })
                        //    }
                    })
                        .addSection()
                        .addRow(Gordic.Consts.DbShortcuts.ucs).addField("gselectbox", Gordic.Prefabs.Select.ekosucs(), {
                        name: "ucs",
                        dropdown: false,
                        model: "model.ico1=value.ico;model.ucs=value.ucs",
                        itemTemplate: "{ucs:trim:encode}",
                        serverFilters: {
                            aktivita: 100,
                            ico: this.gpc.ico,
                            rok_od: "<= " + this.gpc.rok,
                            rok_do: ">= " + this.gpc.rok,
                        },
                        change: function (ev, changeObj) {
                            var form = $(this).closest(".gform");
                            new Gordic.Data.Readers.Ekosucs()
                                .getData({
                                ico: that.gpc.ico,
                                rok_od: "<= " + that.gpc.rok,
                                rok_do: ">= " + that.gpc.rok,
                            }).then((data) => {
                                if (changeObj.value != null) {
                                    // v poli ucs je hodnota
                                    if (data.length == 1) {
                                        form.findFields("ucs").gfield("option", "disabled", true);
                                        form.findFields("vsechnaucs").gfield("option", "disabled", true);
                                    }
                                    that.actions.actHromadneOtevrit.update({ enabled: false });
                                    that.actions.actHromadneUzavrit.update({ enabled: false });
                                }
                                else {
                                    // v poli ucs je prázdno - budu povolovat hromadné operace, ale pouze pokud je více dostupných ucs
                                    if (data.length == 1) {
                                        that.actions.actHromadneOtevrit.update({ enabled: false });
                                        that.actions.actHromadneUzavrit.update({ enabled: false });
                                    }
                                    else {
                                        that.actions.actHromadneOtevrit.update({
                                            enabled: (that.agenda === "UCT" ?
                                                that.globals.Globalni_Parametry.PovoleniOtevreniMesiceUCT : that.globals.Globalni_Parametry.PovoleniOtevreniMesiceROZ)
                                        });
                                        that.actions.actHromadneUzavrit.update({
                                            enabled: (that.agenda === "UCT" ?
                                                that.globals.Globalni_Parametry.PovoleniUzavreniMesiceUCT : that.globals.Globalni_Parametry.PovoleniUzavreniMesiceROZ)
                                        });
                                    }
                                }
                                //XXXJI that.Reload();
                            });
                        }
                    })
                        .addField("gcheck", {
                        name: "vsechnaucs",
                        label: "Všechna UCS",
                        change: function (ev, changeObj) {
                            if (changeObj) {
                                if (changeObj.value == true) {
                                    that.findFields("ucs").gfield("setValue", {});
                                    that.findFields("ucs").gfield("option", "disabled", true);
                                }
                                else {
                                    that.findFields("ucs").gfield("setValue", { ucs: that.GlobalParams.EkoParams?.UCS, ico: that.GlobalParams.EkoParams?.ICO }, false);
                                    that.findFields("ucs").gfield("option", "disabled", false);
                                }
                            }
                            //XXXJI that.Reload();
                        }
                    })
                        .addRow({ label: "jres:30450011" }) //RC 30450011 : Měsíc (od- do)
                        //.addPrefab(Gordic.Gin.Prefabs.interval({ label: "Financování OD", name: "fin_od", type: "rok" }))
                        .addField("gselectbox", "w-12", {
                        name: "obdobiOd",
                        dropdown: true,
                        data: that.rozsahObdobi,
                        change: function (ev, changeObj) {
                            if (changeObj.flags.valid) {
                                that.findFields("obdobiDo").gfield("setValue", changeObj.value);
                                //XXXJI that.Reload();
                            }
                        }
                    })
                        .addField("gselectbox", "w-12", {
                        name: "obdobiDo",
                        dropdown: true,
                        data: that.rozsahObdobi,
                        change: function (ev, changeObj) {
                            if (changeObj.flags.valid) {
                                //XXXJI that.Reload();
                            }
                        }
                    })
                        .addRow({ label: "Stav období" })
                        .addField("gcheck", {
                        name: "otevrene",
                        label: "jres:30250368",
                        change: function (ev, changeObj) {
                            //XXXJI that.Reload();
                        }
                    }) //RC 30250368 : Otevřené
                        .addField("gcheck", {
                        name: "uzavrene",
                        label: "jres:30250369",
                        change: function (ev, changeObj) {
                            //XXXJI that.Reload();
                        }
                    }) //RC 30250369 : Uzavřené
                    ;
                    return filterFormDef;
                }
                /**
                 * Vytvoreni filtrovaciho panelu
                 * @param that
                 */
                createFilterPanel(that) {
                    this.$filterPanel = $("<div class='js-filtr'>")
                        .appendTo(this.element)
                        .gfilterpanel({
                        helperCustomizer: function (data) {
                            var polSort = data.sort(function (a, b) { return a.name >= b.name; });
                            return polSort;
                        },
                        forms: [that.CreateFilterZalozka()],
                        //filterViewMode: defFiltru,// FilterViewMode.Detail,                 
                        //favorites: ["ixp", "ixs_typ", "vlastni_doklady"],
                        autoLoadAfterChoseFilter: true,
                        //XXXJI                    detailActionAsCheckbox: false,
                        //saveOptionsForm: "eko",
                        filterStorageService: new Gordic.Gin.FilterStorageService.Store(),
                        //filterViewModeUserSettings: "Deny",
                        // filterViewMode: FilterViewMode.Simple,
                        // 20.05.2022 - TFeik
                        // Oprava filter view módů.
                        filterViewModeUserSettings: [FilterViewMode.Simple, FilterViewMode.Normal, FilterViewMode.Detail],
                        filterViewMode: FilterViewMode.Simple,
                        // 01.03.2021 - TFeik
                        // Nahrazení obsolete parametrů.
                        autoLoadAfterCreatePanel: true,
                        //userDefaultFilter: true,
                        //simpleMode: true,
                        favoriteLayoutDescriptor: "L4M3S1",
                        //filterHelperItemTemplate: "<b>{nazev}</b>",
                        //textItemTemplate: "{nazev}",
                        apply: function (event, obj) {
                            console.log("filterForm.apply", obj);
                            that.log.trace("filterForm.apply", obj);
                            //that.DataView.requestData/*<Gordic.Ucr.WebClient.GUcrTreeDoplnUdajeDto>*/(obj);
                            that.Reload(obj.filter);
                        }
                    });
                }
                createColumns() {
                    var columns = new Gordic.Data.GridFormat();
                    Gordic.Eko.Grid.Column.addMesic(columns);
                    Gordic.Eko.Grid.Column.addRok(columns);
                    columns.addTextColumn({ name: "aktivita_txt", caption: "jres:30250362", width: 90 }); //RC 30250362 : Stav
                    //            Gordic.Eko.Grid.Column.addIcoSubjektu(columns);
                    //            columns.addTextColumn({ name: "ico", caption: "jres:30250367", width: 80 }); //RC 30250367 : IČO
                    columns.addTextColumn({ name: "ucs", caption: Gordic.Consts.DbShortcuts.ucs, width: 100 });
                    columns.addTextColumn({ name: "lic", caption: "jres:30250361", width: 60 }); //RC 30250361 : Lic
                    return columns;
                }
                /**
                 * Hromadne operace s obdobim
                 * @param operace
                 * @param data
                 */
                ProvedHromadneAkce(operace) {
                    var def = $.Deferred();
                    var that = this;
                    var filter = this.$filterPanel.gfilterpanel('getCurrentData');
                    var hodnota1 = filter != null && typeof filter.obdobiOd !== "undefined" && filter.obdobiOd != null ? filter.obdobiOd : null;
                    var hodnota2 = filter != null && typeof filter.obdobiDo !== "undefined" && filter.obdobiDo != null ? filter.obdobiDo : null;
                    if (typeof hodnota1 === "undefined" || typeof hodnota2 === "undefined" || hodnota1 === null || hodnota2 === null) {
                        //    that.dialogs.warning("jres:30250364" //RC 30250364 : Varování
                        //        , "jres:30250363"); //RC 30250363 : Musí být zadáno jednoznačné období pro provedení akce
                        //    return def.reject().promise();
                    }
                    else if (hodnota1 !== hodnota2) {
                        that.dialogs.warning("jres:30250364" //RC 30250364 : Varování
                        , "jres:30250363"); //RC 30250363 : Musí být zadáno jednoznačné období pro provedení akce
                        return def.reject().promise();
                    }
                    let formParams = new Gordic.Forms.Form({ name: "formDetailObdobi" })
                        .addField("gselectbox", Gordic.Prefabs.Select.reports({
                        //reportsOptions: () => { return this.vystupAct.getReportTreeControlParams(); },
                        reportsOptions: { Tema: "inu_ptm_inukchd" }
                    }), {
                        name: "Wrid",
                        disabled: false,
                        model: "model.Wrid=value.reportId,model.ReportInfo.reportInfo.nazev=>value.name,model.ReportInfo.reportInfo.idSes=>value.idSes",
                        strict: true, validators: [new Gordic.Validators.Required()],
                        modelOptions: { verificationNeeded: true },
                        flag: Gordic.Prefabs.Field.Flags.required,
                        change: (ev, v) => {
                            //if (v.value) {
                            //    this.findFields("OutputStyleName,elements,ixs_msk_uzi").gfield("enable").gselectbox("clearClientCache");
                            //    this.setOutput(
                            //        v.value.meta ? v.value.meta : Gordic.Report.WebClient.GReportTreeControlTS.ToIGPrintActionReportInfo(v.value)!
                            //    );
                            //}
                            //else {
                            //    //this.pozadavek.Wrid = null;
                            //    //this.pozadavek.OutputStyle = null;
                            //    //this.pozadavek.OutputStyleName = null;
                            //    delete this.pozadavek.ReportInfo;
                            //    delete this.pozadavek.OutputStyle;
                            //    delete this.pozadavek.elements;
                            //    this.findFields("OutputStyleName,elements,ixs_msk_uzi").gfield("clear").gfield("disable");
                            //}
                            //this.updateActionsState();
                        }
                    });
                    // kontrola, zda se ma zobrazit vyber sestav
                    if (that.getAgenda() == 40 /* Gordic.Inu.Interface.GEInuAgenda.UCT */) {
                        if (!that.globals.Globalni_Parametry.PovoleniKontrolnihoChoduPriUzaverkyMesiceUCT)
                            formParams = undefined;
                    }
                    else if (!that.globals.Globalni_Parametry.PovoleniKontrolnihoChoduPriUzaverkyMesiceROZ)
                        formParams = undefined;
                    var jmenoAkce = "jres:30250422"; //RC 30250422 : Uzavření období
                    var title = "jres:30250424"; //RC 30250424 : Uzavřít období
                    if (operace == 10 /* Interface.GEOperaceSObdobim.OtevreniObdobi */) {
                        formParams = undefined;
                        jmenoAkce = "jres:30250423"; //RC 30250423 : Otevření období
                        title = "jres:30250425"; //RC 30250425 : Otevřít období
                    }
                    that.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        // titulek v breadcrumbu
                        title: title,
                        // formát gridu
                        gridFormat: that.createColumns(),
                        // primární klíč dat v gridu
                        keys: "ixp",
                        // data pro grid (pro první krok)
                        data: Gordic.Isl.InuObdobi.seznamObdobiProAkce({ typAg: that.getAgenda(), akce: operace, obdobi: hodnota1 }).getData(),
                        // typ indikátorů nad gridem (KPI nebo badge)
                        indicatorType: "KPI",
                        // první krok - zadání parametrů a kontrola, při přechodu na další krok se zavolá spuštění vlastní operace
                        firstStep: {
                            // název kroku
                            title: "jres:30250417", //RC 30250417 : Zadání
                            // popis operace
                            description: jmenoAkce,
                            // nad gridem zobrazit KPI/badge s počty záznamů
                            showIndicator: true,
                            // formulář s parametry
                            form: formParams,
                            // model pro parametry
                            //modelData: modelData,
                            // nadpis tabu s parametry
                            //formTabTitle: "Parametry storna",
                            // nadpis tabu s gridem
                            gridTabTitle: "jres:30250359", //RC 30250359 : Období ke zpracování
                            // obsluha změny parametru
                            //fieldChangeDelegate: undefined,
                            //preCheckAction: ()=>{
                            //    return def.reject().promise();
                            //},
                            // akce pro spusteni kontrolu uzivatelem
                            // název akce, která provede požadovanou operaci (tlačítko vpravo dole)
                            nextActionName: title,
                            // metoda volaná při přechodu na další krok (provedení vlastní operace) (pracuje nad daty ze vstupu, vrací aktuální data z databáze + výsledek operace)
                            nextAction: (model, data) => {
                                var deffer = $.Deferred();
                                let reportID = "";
                                if (typeof (model.Wrid) != "undefined")
                                    reportID = model.Wrid;
                                //if (operace === Gordic.Inu.Interface.GEOperaceSObdobim.UzavreniObdobi) {
                                //that.beginOperation("jres:30250416"); //RC 30250416 : Probíhá uzavření
                                var task = Gordic.Async.GTaskManager.start("Gordic.Inu.Server.GInuHromadneOperaceAsync", {
                                    Seznam: data,
                                    ReportID: reportID,
                                    Operace: operace,
                                    TypAg: that.getAgenda(),
                                });
                                that.beginOperation({
                                    progress: 0, total: 100, text: "jres:30250420".format(jmenoAkce.toLowerCase()), //RC 30250420 : Start {0} období
                                    cancelAction: new GAction({ caption: "jres:30250332", run: () => { task.cancel(); }, name: "cancelAct" }) //RC 30250332 : Storno
                                }); //RC 30250332 : Storno
                                task.getPromise()
                                    .then((result) => {
                                    return deffer.resolve(result.result);
                                    //return result as any;
                                }).progress((a) => {
                                    if (a.progress)
                                        that.progressOperation({ progress: a.progress.current, total: a.progress.total, text: a.progress.text });
                                }).always(() => { that.endOperation(); })
                                    .fail(() => { deffer.reject(); });
                                //}
                                //else if (operace === Gordic.Inu.Interface.GEOperaceSObdobim.OtevreniObdobi) {
                                //    //that.beginOperation("jres:30250416"); //RC 30250416 : Probíhá uzavření
                                //    var task = Gordic.Async.GTaskManager.start<Gordic.Async.IGTaskProgress, any>("Gordic.Inu.Server.GInuOtevreniAsync", {
                                //        Seznam: data,
                                //        ReportID: reportID,
                                //        TypAg: that.getAgenda(),
                                //    });
                                //    that.beginOperation({
                                //        progress: 0, total: 100, text: "jres:30250421", //RC 30250421 : Start otevření období
                                //        cancelAction: new GAction({ caption: "jres:30250332", run: () => { task.cancel() }, name: "cancelAct" }) //RC 30250332 : Storno
                                //    }); //RC 30250332 : Storno
                                //    task.getPromise()
                                //        .then((result) => {
                                //            return deffer.resolve(result.result);
                                //            //return result as any;
                                //        }).progress((a: { progress?: Gordic.Async.IGTaskProgress }) => {
                                //            if (a.progress)
                                //                that.progressOperation({ progress: a.progress.current, total: a.progress.total, text: a.progress.text });
                                //        }).always(() => { that.endOperation() })
                                //        .fail(() => { deffer.reject() })
                                //        ;
                                //}
                                //modelData = model;
                                return deffer.promise();
                            },
                            // akce na tabu s gridem
                            //menuGridBar: [
                            //    {
                            //        // detail
                            //        favorite: true,
                            //        action: that.actions.actDetail
                            //    },
                            //],
                            //// akce volaná na dvojklik v gridu
                            //defaultAction: {
                            //    name: "detailObdobi", captionVisible: "normal", tooltip: ""
                            //    caption: "DetailObdobi", run: () => { }
                            //}// that.actions.actDetail
                        },
                        // druhý (poslední) krok - zobrazení výsledku operace
                        lastStep: {
                            // název kroku
                            title: "jres:30250418", //RC 30250418 : Výsledek
                            // parametry jsou v tomto kroku již needitovatelné
                            enableFormFields: false,
                            // nadpis tabu s gridem
                            gridTabTitle: "jres:30250419", //RC 30250419 : Zpracované období
                        },
                        // obsluha úspěšného ukončení průvodce (na rozdíl od zrušení průvodce přeselektovává seznam)
                        completeDelegate: (view) => {
                        },
                        // obsluha zrušení průvodce
                        cancelDelegate: () => {
                        },
                    })
                        .on("close", function (content, par) {
                        that.Reload();
                    });
                    ;
                    return def.promise();
                }
                /**
                 * Operace s obdobim
                 * @param operace
                 * @param data
                 */
                ProvedAkce(operace, data) {
                    var def = $.Deferred();
                    var that = this;
                    var obdobi = "jres:30250351"; //RC 30250351 : období účtování
                    if (that.getAgenda() == 50 /* Interface.GEInuAgenda.ROZ */)
                        obdobi = "jres:30250352"; //RC 30250352 : období rozpočtu
                    if ((this.selectedRow == null || that.MesiceData.length === 0)
                        && operace !== 10 /* Gordic.Inu.Interface.GEOperaceSObdobim.OtevreniObdobi */
                    //&& operace !== Gordic.Inu.Interface.GEOperaceSObdobim.AktualizaceStavu
                    )
                        return def.reject("");
                    if (!data)
                        data = this.selectedRow;
                    var title = "";
                    if (operace == 10 /* Gordic.Inu.Interface.GEOperaceSObdobim.OtevreniObdobi */)
                        title = "jres:30250341".format(obdobi); //RC 30250341 : Nové {0}
                    else if (operace == 20 /* Gordic.Inu.Interface.GEOperaceSObdobim.UzavreniObdobi */)
                        title = "jres:30250342".format(obdobi); //RC 30250342 : Uzavření {0}
                    else if (operace == 30 /* Gordic.Inu.Interface.GEOperaceSObdobim.ZpetneOtevritUzavreniObdobi */)
                        return that.ZpetneOtevrit(data);
                    //title = "jres:30250354".format(obdobi); //RC 30250354 : Znovuotevření uzavřeného {0}
                    else if (operace == 47 /* Gordic.Inu.Interface.GEOperaceSObdobim.DetailObdobi */)
                        title = "jres:30250353".format(obdobi); //RC 30250353 : Detail {0}
                    else if (operace == 33 /* Gordic.Inu.Interface.GEOperaceSObdobim.AktualizaceStavu */) {
                        that.AktualizaceStavu(data);
                        return def.promise();
                    }
                    else if (operace == 32 /* Gordic.Inu.Interface.GEOperaceSObdobim.AktualizaceObdobi */) {
                        that.AktualizavatMesic(data);
                        return def.promise();
                    }
                    else if (operace == 40 /* Gordic.Inu.Interface.GEOperaceSObdobim.PredatKeSchvaleni */) {
                        return that.PredatKeSchvaleni(data);
                    }
                    else if (operace == 42 /* Gordic.Inu.Interface.GEOperaceSObdobim.SchvalitUzaverku */) {
                        return that.Schvalit(data);
                    }
                    else if (operace == 41 /* Gordic.Inu.Interface.GEOperaceSObdobim.ZrusitPredatKeSchvaleni */) {
                        return that.OdSchvalit(data);
                    }
                    else if (operace == 48 /* Gordic.Inu.Interface.GEOperaceSObdobim.StavKontroly */) {
                        // zobrazeni formulare stavu kontroly
                        this.navigate("Gordic.Inu.WebClient.GKontrolaObdobi", {
                            Mesic: data.mesic, Ucs: data.ucs, MesicTxt: that.getMontName(data.mesic), StavObdobi: data.akt_obd,
                            Lokalita: data.lic
                        });
                        return def.resolve().promise();
                    }
                    else if (operace == 31 /* Gordic.Inu.Interface.GEOperaceSObdobim.BlokacniOkruhy */) {
                        return that.BlokacniOkruhy(data);
                    }
                    this.dialogs.showModalWindow(Gordic.Inu.WebClient.GDetailObdobi, {
                        rok: this.GlobalParams.EkoParams?.ROK, agenda: that.getAgenda(), ico: this.GlobalParams.EkoParams?.ICO,
                        data: data, operace: operace, globalParams: this.GlobalParams
                    }, title, 500, 350, true)
                        .on("close", function (res) {
                        if (res.returnValue && res.returnValue.cancel !== true && res.returnValue.data) {
                            if (operace == 10 /* Gordic.Inu.Interface.GEOperaceSObdobim.OtevreniObdobi */) {
                                that.OtevritMesic(res.returnValue.data);
                            }
                            else if (operace == 20 /* Interface.GEOperaceSObdobim.UzavreniObdobi */) {
                                that.UzavritMesic(res.returnValue.data);
                            }
                        }
                        return def.resolve();
                    });
                    return def.promise();
                }
                /**
                 * Nastaveni blokacnich okruhu
                 * @param data
                 */
                BlokacniOkruhy(data) {
                    let that = this;
                    let defer = $.Deferred();
                    Gordic.Isl.InuBlokacniOkruhy.list({ ucs: data.ucs, mesic: data.mesic })
                        .getData()
                        .done((result) => {
                        this.dialogs.showModalWindow(Gordic.Inu.WebClient.GBlokacniOkruhy, { data: result, mesic: data.mesic }, "jres:30250387", 800, 600, true) //RC 30250387 : Blokační okruhy
                            .on("close", function (res) {
                            if (res.returnValue.result == "REFRESH")
                                that.Reload();
                            defer.resolve();
                        });
                    });
                    return defer.promise();
                }
                /**
                 * Prepocet celkovych neprepoctenych zepisu
                 * @param data
                 */
                PrepocetNeprepocteno(data) {
                    var that = this;
                    data.forEach(function (radek) {
                        radek = that.NaplnObdobi(radek);
                        that.celkem_neprepocteno = that.celkem_neprepocteno + radek.pocet_zapisu_neprepocteno;
                    });
                    that.MesiceData = data;
                    that.DataView.updateData(that.MesiceData);
                    //that.DataView = new Gordic.Data.View(that.MesiceData, { key: "rok,lic,ico,ucs,mesic" });
                }
                /**
                 *  Znovunacteni dat
                 */
                Reload(filter) {
                    var that = this;
                    that.selectedRow = null;
                    if (typeof this.elem === "undefined" || this.elem == null) {
                        that.PrepocetNeprepocteno(that.model);
                        that.DataView.updateData(that.MesiceData);
                        var data = that.GetRozsahObdobi();
                        //this.findFields("obdobiOd,obdobiDo").gfield("option","")
                        this.findFields("obdobiOd,obdobiDo").gfield("option", "data", data);
                        //that.DataView = new Gordic.Data.View(that.MesiceData, { key: "rok,lic,ico,ucs,mesic" });
                    }
                    else {
                        // nacteni dat z db
                        that.beginOperation("jres:30250004"); //RC 30250004 : Načítám...
                        let ucs = null;
                        let obdobiOd = null;
                        let obdobiDo = null;
                        let otevrene = false;
                        let uzavrene = false;
                        if (!filter)
                            filter = this.$filterPanel.gfilterpanel('getCurrentData');
                        if (filter) {
                            if (filter.ucs != null)
                                ucs = filter.ucs;
                            if (filter.obdobiOd != null)
                                obdobiOd = filter.obdobiOd;
                            if (filter.obdobiDo != null)
                                obdobiDo = filter.obdobiDo;
                            if (filter.otevrene)
                                otevrene = filter.otevrene;
                            else
                                otevrene = null;
                            if (filter.uzavrene)
                                uzavrene = filter.uzavrene;
                            else
                                uzavrene = null;
                        }
                        that.isl.InuObdobi.seznam({ typAg: that.getAgenda(), ucs: ucs, obdobiOd: obdobiOd, obdobiDo: obdobiDo, obdobiOtevrene: otevrene, obdobiUzavrene: uzavrene })
                            .get()
                            .done(function (result) {
                            // aktualizace neprepoctenych 
                            that.PrepocetNeprepocteno(result.data);
                            //that.MesiceData = result.data;
                            //XXX JI                        that.elem.gcardpanel("option", { data: that.DataView });
                            that.DataView.updateData(result.data, "update");
                            Gordic.Isl.InuObdobi.pouziteObdobi()
                                .get()
                                .done((rozsah) => { that.findFields("obdobiOd,obdobiDo").gfield("option", "data", rozsah); });
                            //var data = that.GetRozsahObdobi();
                            //this.findFields("obdobiOd,obdobiDo").gfield("option","")
                        })
                            .always(function () {
                            that.endOperation();
                        });
                    }
                }
                // metoda pro doplnění DTo obdobi pro zobrazení
                NaplnObdobi(data_obdobi) {
                    //data_obdobi.dat_inp_txt = "";
                    //if (data_isp.dat_inp != null) {
                    //    data_isp.dat_inp_txt = '(' + Gordic.Templates.Formatters.datetime(data_isp.dat_inp, "dd.MM.yyyy") + ')';
                    //}
                    data_obdobi.sl1 = (data_obdobi.akt_obd == 100 /* Interface.GEAktivitaObdobi.Otevrene */ ? 'fa-pencil' : 'fa-ban');
                    data_obdobi.barva_txt = (data_obdobi.akt_obd == 100 /* Interface.GEAktivitaObdobi.Otevrene */ ? 'SeaGreen' : 'IndianRed');
                    data_obdobi.aktivita_txt = 'jres:30250084'; //RC 30250084 : Otevřeno
                    if (data_obdobi.akt_obd === 500 /* Interface.GEAktivitaObdobi.Uzavrene */) {
                        //                if (data_obdobi.stav == 0)
                        data_obdobi.aktivita_txt = 'jres:30250085'; //RC 30250085 : Uzavřeno
                        //    else if (data_obdobi.stav == 2)
                        //        data_obdobi.aktivita_txt = 'jres:30250371'; //RC 30250371 : Kontrola
                        //    else
                        //        data_obdobi.aktivita_txt = 'jres:30250372'; //RC 30250372 : Schváleno
                    }
                    if (this.getAgenda() == 40 /* Interface.GEInuAgenda.UCT */) {
                        if (typeof data_obdobi.blok !== "undefined" && data_obdobi.blok !== null && data_obdobi.blok > 0)
                            data_obdobi.aktivita_txt += " [" + "jres:30250389" + "]"; //RC 30250389 : Blokováno
                    }
                    data_obdobi.aktivita_color = (data_obdobi.akt_obd == 100 /* Interface.GEAktivitaObdobi.Otevrene */ ? 'green' : 'red');
                    data_obdobi.aktualni_stavy_ikona = (data_obdobi.pocet_zapisu_neprepocteno == 0 ? '' : 'fa-magic');
                    data_obdobi.pocet_zapisu_celkem_txt = Gordic.Templates.Formatters.number(data_obdobi.pocet_zapisu_celkem, "N").toString();
                    data_obdobi.pocet_zapisu_neprepocteno_txt = Gordic.Templates.Formatters.number(data_obdobi.pocet_zapisu_neprepocteno, "N").toString();
                    data_obdobi.mesic_txt = this.getMontName(data_obdobi.mesic);
                    //["jres:30250390", //RC 30250390 : Leden
                    //"jres:30250391", //RC 30250391 : Únor
                    //"jres:30250392", //RC 30250392 : Březen
                    //"jres:30250402", //RC 30250402 : Duben
                    //"jres:30250401", //RC 30250401 : Květen
                    //"jres:30250400", //RC 30250400 : Červen
                    //"jres:30250399", //RC 30250399 : Červenec
                    //"jres:30250398", //RC 30250398 : Srpen
                    //"jres:30250397", //RC 30250397 : Září
                    //"jres:30250396", //RC 30250396 : Říjen
                    //"jres:30250395", //RC 30250395 : Listopad
                    //"jres:30250394", //RC 30250394 : Prosinec
                    //"jres:30250393", //RC 30250393 : Uzávěrka
                    //"", ""][data_obdobi.mesic as number - 1];
                    return data_obdobi;
                }
                /**
                 * Jmeno mesice
                 * @param mesic
                 */
                getMontName(mesic) {
                    return ["jres:30250390", //RC 30250390 : Leden
                        "jres:30250391", //RC 30250391 : Únor
                        "jres:30250392", //RC 30250392 : Březen
                        "jres:30250402", //RC 30250402 : Duben
                        "jres:30250401", //RC 30250401 : Květen
                        "jres:30250400", //RC 30250400 : Červen
                        "jres:30250399", //RC 30250399 : Červenec
                        "jres:30250398", //RC 30250398 : Srpen
                        "jres:30250397", //RC 30250397 : Září
                        "jres:30250396", //RC 30250396 : Říjen
                        "jres:30250395", //RC 30250395 : Listopad
                        "jres:30250394", //RC 30250394 : Prosinec
                        "jres:30250393", //RC 30250393 : Uzávěrka
                        "", ""][mesic - 1];
                }
                /**
                 * Aktualizace stavu
                 *
                 */
                AktualizaceStavu(data) {
                    var that = this;
                    //var $cDiv = $(this.contentDiv);
                    console.log(data.ico);
                    console.log(data.ucs);
                    var i_mesic = 0;
                    var i_text = "";
                    i_mesic = 0;
                    i_text = "jres:30250086".format(this.agenda); //RC 30250086 : Aktualizace stavů {0}
                    var v_data = {};
                    v_data.agenda = that.getAgenda();
                    v_data.operace = "AKT";
                    v_data.mesic = i_mesic;
                    v_data.ico = data.ico;
                    v_data.ucs = data.ucs;
                    v_data.lic = data.lic;
                    v_data.o_hlaska = i_text;
                    if ((v_data.mesic > 0) && (v_data.mesic <= 13))
                        v_data.o_hlaska = v_data.o_hlaska + " od měsíce " + v_data.mesic;
                    Gordic.Async.GTaskManager.init({ delay: 10000 }); //NOTE: Toto je zde pro testovaci ucely, v budoucnu bude k odstraneni
                    Gordic.Async.GTaskManager.start("Gordic.Inu.Server.GInuStavyAsync", v_data);
                }
                /**
                 * Zjisteni agendy
                 * */
                getAgenda() {
                    return this.agenda == "UCT" ? 40 /* Gordic.Inu.Interface.GEInuAgenda.UCT */ : 50 /* Gordic.Inu.Interface.GEInuAgenda.ROZ */;
                }
                /**
                 *  Uzavreni mesice
                 *
                 * */
                UzavritMesic(mesiRadek, vstup, deffer) {
                    var that = this;
                    if (typeof vstup === "undefined") {
                        deffer = $.Deferred(); //.promise().always(() => { content.endOperation() });
                        that.beginOperation("jres:30250002"); //RC 30250002 : Probíhá uzavírání
                        vstup = {
                            agenda: that.getAgenda(),
                            mesic: mesiRadek.mesic,
                            ucs: mesiRadek.ucs,
                            lic: mesiRadek.lic
                        };
                    }
                    // @ts-ignore: docasne pro moznost prekladu 84
                    return that.isl.InuObdobi.close(vstup)
                        .get()
                        .then((result) => {
                        //console.log("ret", result);
                        if (result !== null && result.akt_obd > 0) {
                            result = that.NaplnObdobi(result);
                            that.MesiceData[result.mesic - 1] = result;
                            //XXX JI                            $(that.element).find(".gcardpanel").gcardpanel("updateData", result as any);
                            that.DataView.updateData(result, "update");
                            that.RefreshAction(result);
                            that.dialogs.messageBox("Informace", "jres:30250355".format(result.mesic, result.rok), [GDlg.mbbOk], GDlg.mbiSuccess);
                            //that.showFlash("jres:30250355".format(result.mesic!, result.rok!), "g-state-success", 5000, "msgFlash"); //RC 30250355 : Období {0} {1} bylo uzavřeno                            
                        }
                        else {
                            that.dialogs.messageBox("Informace", "jres:30250356".format(result.mesic, result.rok), [GDlg.mbbOk], GDlg.mbiError);
                            //that.showFlash("jres:30250356".format(result.mesic!, result.rok!), "g-state-error", 5000, "msgFlash"); //RC 30250356 : Období {0} {1} se nepodařilo uzavřít
                        }
                        that.endOperation();
                        that.Reload();
                        return deffer.resolve();
                    }, function (jqXHR, type, obj) {
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, vstup, null);
                        if (typeof returnMessage === "object") {
                            returnMessage
                                .done(function (returnValue) {
                                if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                    vstup.IdMessage = returnValue.IdMessage;
                                    vstup.Nastaveni = returnValue.Nastaveni;
                                    return that.UzavritMesic(mesiRadek, vstup, deffer);
                                }
                                else if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                    that.endOperation();
                                    return deffer.reject();
                                }
                                else {
                                    that.endOperation();
                                    that.showFlash({ id: "flashErrorUzavreni", icon: "gi-tick", label: "jres:30250001", customClass: "g-state-error" }); //RC 30250001 : Nastala chyba při zpracování
                                    return deffer.resolve();
                                }
                            })
                                .always(function () {
                                that.endOperation();
                            });
                            return deffer.promise();
                        }
                        that.endOperation();
                    }).always(function () {
                        that.endOperation();
                    });
                }
                /**
                 *  Otevreni mesice
                 *
                 * */
                OtevritMesic(mesiRadek, vstup, deffer) {
                    var that = this;
                    if (typeof vstup === "undefined") {
                        deffer = $.Deferred(); //.promise().always(() => { content.endOperation() });
                        that.beginOperation("jres:30250003"); //RC 30250003 : Probíhá otevírání
                        vstup = {
                            agenda: that.getAgenda(),
                            mesic: mesiRadek.mesic,
                            ucs: mesiRadek.ucs,
                            lic: mesiRadek.lic
                        };
                    }
                    // @ts-ignore: docasne pro moznost prekladu 84
                    return that.isl.InuObdobi.open(vstup)
                        .get()
                        .then((result) => {
                        console.log("ret", result);
                        if (result != null && result.akt_obd > 0) {
                            // doplneni mesice
                            result = that.NaplnObdobi(result);
                            // pridani noveho zaznamu do pole
                            that.MesiceData.push(result);
                            // po oprave chyby bude vraceo zpet
                            //$(that.element).find(".g-cardpanel").gcardpanel("updateData", ret);
                            //$(that.element).find(".g-cardpanel").parent().gcardpanel("addData", ret);                            
                            // aktualizace seznamu
                            //XXX JI                            $(that.element).find(".gcardpanel").gcardpanel("option", "data", that.MesiceData);
                            that.DataView.updateData(that.MesiceData, "update");
                            that.RefreshAction(result);
                            that.dialogs.messageBox("Informace", "jres:30250349".format(result.mesic, result.rok), [GDlg.mbbOk], GDlg.mbiSuccess);
                            //that.showFlash("jres:30250349".format(result.mesic!, result.rok!), "g-state-success", 5000, "msgFlash"); //RC 30250349 : Období {0} {1} bylo otevřeno
                        }
                        else {
                            that.dialogs.messageBox("Informace", "jres:30250350".format(result.mesic, result.rok), [GDlg.mbbOk], GDlg.mbiError);
                            //that.showFlash("jres:30250350".format(result.mesic!, result.rok!), "g-state-error", 5000, "msgFlash"); //RC 30250350 : Období {0} {1} se nepodařilo otevřít
                            //                            that.showFlash("Období " + mesiRadek.mesic_txt + " " + mesiRadek.rok + " se nepodařilo otevřít", "g-state-error", 5000, "msgFlash");
                        }
                        that.endOperation();
                        return deffer.resolve();
                    }, function (jqXHR, type, obj) {
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, vstup, null);
                        if (typeof returnMessage === "object") {
                            returnMessage
                                .done(function (returnValue) {
                                if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                    vstup.IdMessage = returnValue.IdMessage;
                                    vstup.Nastaveni = returnValue.Nastaveni;
                                    return that.OtevritMesic(mesiRadek, vstup, deffer);
                                }
                                else if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                    that.endOperation();
                                    return deffer.reject();
                                }
                                else {
                                    that.endOperation();
                                    that.showFlash({ id: "flashErrorOtevreni", icon: "gi-tick", label: "jres:30250001", customClass: "g-state-error" }); //RC 30250001 : Nastala chyba při zpracování
                                    return deffer.resolve();
                                }
                            })
                                .always(function () {
                                that.endOperation();
                            });
                            return deffer.promise();
                        }
                        that.endOperation();
                    }).always(function () {
                        that.endOperation();
                    });
                }
                AktualizavatMesic(data_akt) {
                    var that = this;
                    that.isl.InuObdobi.aktualizovat({ agenda: that.getAgenda(), ucs: data_akt.ucs, lokalita: data_akt.lic })
                        .get()
                        //that.call<boolean>("Aktualizovat", { data_mesic: data_akt, data_agenda: that.agenda })
                        .done(function () {
                        that.dialogs.messageBox("Informace", "jres:30250345".format(data_akt.mesic, data_akt.rok), [GDlg.mbbOk], GDlg.mbiSuccess);
                        //that.showFlash("jres:30250345".format(data_akt.mesic!, data_akt.rok!)  //RC 30250345 : Období {0} {1} bylo aktualizováno
                        //    /*"Období " + data_akt.mesic_txt + " " + data_akt.rok + " bylo aktualizováno"*/, "g-state-success", 5000, "msgFlash"); 
                    });
                }
                /**
                 *  Zpetne otevreni mesice
                 *
                 * */
                ZpetneOtevrit(mesiRadek, vstup, deffer) {
                    var that = this;
                    if (typeof vstup === "undefined") {
                        deffer = $.Deferred(); //.promise().always(() => { content.endOperation() });
                        that.beginOperation("jres:30250003"); //RC 30250003 : Probíhá otevírání
                        vstup = {
                            agenda: that.getAgenda(), mesic: mesiRadek.mesic, ucs: mesiRadek.ucs, lic: mesiRadek.lic
                        };
                    }
                    // XXX@ts-ignore: docasne pro moznost prekladu 84
                    return that.isl.InuObdobi.unClose({ rq: vstup })
                        .get()
                        .then((result) => {
                        if (result.akt_obd > 0) {
                            that.NaplnObdobi(result);
                            that.MesiceData[result.mesic - 1] = result;
                            //that.max_uzavreny_mesic = result.mesic! - 1;                            
                            //XXX JI                            $(that.element).find(".gcardpanel").gcardpanel("updateData", result as any);
                            that.DataView.updateData(result, "update");
                            that.RefreshAction(result);
                            that.dialogs.messageBox("Informace", "jres:30250346".format(result.mesic, result.rok), [GDlg.mbbOk], GDlg.mbiSuccess);
                            //that.showFlash("jres:30250346".format(result.mesic!, result.rok!), "g-state-success", 5000, "msgFlash"); //RC 30250346 : Období {0} {1} bylo zpětně otevřeno
                            //that.
                        }
                        else {
                            that.dialogs.messageBox("Informace", "jres:30250347".format(result.mesic, result.rok), [GDlg.mbbOk], GDlg.mbiError);
                            //that.showFlash("jres:30250347".format(result.mesic!, result.rok!), "g-state-error", 5000, "msgFlash");  //RC 30250347 : Období {0} {1} se nepodařilo zpětně otevřit
                        }
                        that.endOperation();
                        that.Reload();
                        return deffer.resolve();
                    }, function (jqXHR, type, obj) {
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, vstup, null);
                        if (typeof returnMessage === "object") {
                            returnMessage
                                .done(function (returnValue) {
                                if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                    vstup.IdMessage = returnValue.IdMessage;
                                    vstup.Nastaveni = returnValue.Nastaveni;
                                    return that.ZpetneOtevrit(mesiRadek, vstup, deffer);
                                }
                                else if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                    that.endOperation();
                                    return deffer.reject();
                                }
                                else {
                                    that.endOperation();
                                    that.showFlash({ id: "flashErrorUzavreni", icon: "gi-tick", label: "jres:30250001", customClass: "g-state-error" }); //RC 30250001 : Nastala chyba při zpracování
                                    return deffer.resolve();
                                }
                            })
                                .always(function () {
                                that.endOperation();
                            });
                            return deffer.promise();
                        }
                        that.endOperation();
                    }).always(function () {
                        that.endOperation();
                    });
                }
                /**
                 *  Predat ke schvaleni
                 *
                 * */
                PredatKeSchvaleni(mesiRadek, vstup, deffer) {
                    var that = this;
                    if (typeof vstup === "undefined") {
                        deffer = $.Deferred(); //.promise().always(() => { content.endOperation() });
                        that.beginOperation("jres:30250003"); //RC 30250003 : Probíhá otevírání
                        vstup = {
                            agenda: that.getAgenda(), mesic: mesiRadek.mesic, ucs: mesiRadek.ucs, lic: mesiRadek.lic
                        };
                    }
                    // XXX@ts-ignore: docasne pro moznost prekladu 84
                    return that.isl.InuObdobi.predatKeSchvaleni({ rq: vstup })
                        .get()
                        .then((result) => {
                        that.NaplnObdobi(result);
                        that.MesiceData[result.mesic - 1] = result;
                        //that.max_uzavreny_mesic = result.mesic! - 1;                            
                        //XXX JI                        $(that.element).find(".gcardpanel").gcardpanel("updateData", result as any);
                        that.DataView.updateData(result, "update");
                        that.RefreshAction(result);
                        that.dialogs.messageBox("Informace", "jres:30250380".format(result.mesic, result.rok), [GDlg.mbbOk], GDlg.mbiSuccess);
                        //that.showFlash("jres:30250380".format(result.mesic!, result.rok!), "g-state-success", 5000, "msgFlash"); //RC 30250380 : Období {0} {1} bylo předáno ke schválení
                        that.endOperation();
                        that.Reload();
                        return deffer.resolve();
                    }, function (jqXHR, type, obj) {
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, vstup, null);
                        if (typeof returnMessage === "object") {
                            returnMessage
                                .done(function (returnValue) {
                                if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                    vstup.IdMessage = returnValue.IdMessage;
                                    vstup.Nastaveni = returnValue.Nastaveni;
                                    return that.PredatKeSchvaleni(mesiRadek, vstup, deffer);
                                }
                                else if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                    that.endOperation();
                                    return deffer.reject();
                                }
                                else {
                                    that.endOperation();
                                    that.showFlash({ id: "flashErrorUzavreni", icon: "gi-tick", label: "jres:30250001", customClass: "g-state-error" }); //RC 30250001 : Nastala chyba při zpracování
                                    return deffer.resolve();
                                }
                            })
                                .always(function () {
                                that.endOperation();
                            });
                            return deffer.promise();
                        }
                        that.endOperation();
                    }).always(function () {
                        that.endOperation();
                    });
                }
                /**
                 *  Schvalit
                 *
                 * */
                Schvalit(mesiRadek, vstup, deffer) {
                    var that = this;
                    if (typeof vstup === "undefined") {
                        deffer = $.Deferred(); //.promise().always(() => { content.endOperation() });
                        that.beginOperation("jres:30250003"); //RC 30250003 : Probíhá otevírání
                        vstup = {
                            agenda: that.getAgenda(), mesic: mesiRadek.mesic, ucs: mesiRadek.ucs, lic: mesiRadek.lic
                        };
                    }
                    // XXX@ts-ignore: docasne pro moznost prekladu 84
                    return that.isl.InuObdobi.schvalit({ rq: vstup })
                        .get()
                        .then((result) => {
                        that.NaplnObdobi(result);
                        that.MesiceData[result.mesic - 1] = result;
                        //that.max_uzavreny_mesic = result.mesic! - 1;                            
                        //XXX JI                        $(that.element).find(".gcardpanel").gcardpanel("updateData", result as any);
                        that.DataView.updateData(result, "update");
                        that.RefreshAction(result);
                        that.dialogs.messageBox("Informace", "jres:30250381".format(result.mesic, result.rok), [GDlg.mbbOk], GDlg.mbiSuccess);
                        //that.showFlash("jres:30250381".format(result.mesic!, result.rok!), "g-state-success", 5000, "msgFlash"); //RC 30250381 : Období {0} {1} bylo schváleno
                        that.endOperation();
                        that.Reload();
                        return deffer.resolve();
                    }, function (jqXHR, type, obj) {
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, vstup, null);
                        if (typeof returnMessage === "object") {
                            returnMessage
                                .done(function (returnValue) {
                                if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                    vstup.IdMessage = returnValue.IdMessage;
                                    vstup.Nastaveni = returnValue.Nastaveni;
                                    return that.Schvalit(mesiRadek, vstup, deffer);
                                }
                                else if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                    that.endOperation();
                                    return deffer.reject();
                                }
                                else {
                                    that.endOperation();
                                    that.showFlash({ id: "flashErrorUzavreni", icon: "gi-tick", label: "jres:30250001", customClass: "g-state-error" }); //RC 30250001 : Nastala chyba při zpracování
                                    return deffer.resolve();
                                }
                            })
                                .always(function () {
                                that.endOperation();
                            });
                            return deffer.promise();
                        }
                        that.endOperation();
                    }).always(function () {
                        that.endOperation();
                    });
                }
                /**
                 *  Odschvalit
                 *
                 * */
                OdSchvalit(mesiRadek, vstup, deffer) {
                    var that = this;
                    if (typeof vstup === "undefined") {
                        deffer = $.Deferred(); //.promise().always(() => { content.endOperation() });
                        that.beginOperation("jres:30250003"); //RC 30250003 : Probíhá otevírání
                        vstup = {
                            agenda: that.getAgenda(), mesic: mesiRadek.mesic, ucs: mesiRadek.ucs, lic: mesiRadek.lic
                        };
                    }
                    // XXX@ts-ignore: docasne pro moznost prekladu 84
                    return that.isl.InuObdobi.odSchvalit({ rq: vstup })
                        .get()
                        .then((result) => {
                        that.NaplnObdobi(result);
                        that.MesiceData[result.mesic - 1] = result;
                        //that.max_uzavreny_mesic = result.mesic! - 1;                            
                        //XXX JI                        $(that.element).find(".gcardpanel").gcardpanel("updateData", result as any);
                        that.DataView.updateData(result, "update");
                        that.RefreshAction(result);
                        that.dialogs.messageBox("Informace", "jres:30250382".format(result.mesic, result.rok), [GDlg.mbbOk], GDlg.mbiSuccess);
                        //that.showFlash("jres:30250382".format(result.mesic!, result.rok!), "g-state-success", 5000, "msgFlash"); //RC 30250382 : V období {0} {1} bylo zrušeno předání ke schválení
                        that.endOperation();
                        that.Reload();
                        return deffer.resolve();
                    }, function (jqXHR, type, obj) {
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, vstup, null);
                        if (typeof returnMessage === "object") {
                            returnMessage
                                .done(function (returnValue) {
                                if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                    vstup.IdMessage = returnValue.IdMessage;
                                    vstup.Nastaveni = returnValue.Nastaveni;
                                    return that.OdSchvalit(mesiRadek, vstup, deffer);
                                }
                                else if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                    that.endOperation();
                                    return deffer.reject();
                                }
                                else {
                                    that.endOperation();
                                    that.showFlash({ id: "flashErrorUzavreni", icon: "gi-tick", label: "jres:30250001", customClass: "g-state-error" }); //RC 30250001 : Nastala chyba při zpracování
                                    return deffer.resolve();
                                }
                            })
                                .always(function () {
                                that.endOperation();
                            });
                            return deffer.promise();
                        }
                        that.endOperation();
                    }).always(function () {
                        that.endOperation();
                    });
                }
                /**
                 * Aktualizace pristupnosti akci
                 *
                 * */
                RefreshAction(data) {
                    var that = this;
                    let agendaUct = this.getAgenda() == 40 /* Interface.GEInuAgenda.UCT */;
                    //// hromadne otevrit
                    //that.actions.actHromadneOtevrit!.update({
                    //    enabled: (that.agenda === "UCT" ?
                    //        that.globals.Globalni_Parametry.PovoleniOtevreniMesiceUCT! 
                    //        : that.globals.Globalni_Parametry.PovoleniOtevreniMesiceROZ!)
                    //});
                    //// hromadne uzavrit
                    //that.actions.actHromadneUzavrit!.update({
                    //    enabled:
                    //        (that.agenda === "UCT" ? that.globals.Globalni_Parametry.PovoleniUzavreniMesiceUCT! : that.globals.Globalni_Parametry.PovoleniUzavreniMesiceROZ!)
                    //});
                    that.actions.actStavKontroly?.updatePermission(that.controlStatusPermit);
                    //that.actions.actSepBlokOkruhy!.update({ visible: agendaUct });
                    if (data === null || typeof data === "undefined") {
                        // nejsou zadna vybrana data
                        //--------------------------
                        // uzavrit
                        that.actions.actUzavrit.update({ enabled: false });
                        // zpetne otevrit
                        that.actions.actZpetneOtevrit.update({ enabled: false });
                        // otevrit
                        that.actions.actOtevrit.update({
                            enabled: (that.agenda === "UCT" ?
                                that.globals.Globalni_Parametry.PovoleniOtevreniMesiceUCT
                                : that.globals.Globalni_Parametry.PovoleniOtevreniMesiceROZ)
                        });
                        // detail
                        that.actions.actDetail.update({ enabled: false });
                        // aktualiovat
                        that.actions.actAktualizovat.update({ enabled: false });
                        // aktualizace stavu
                        that.actions.actAktualizovatStv.update({ enabled: false });
                        that.actions.actBlokOkruhy.update({ enabled: false, visible: agendaUct });
                        that.actions.actBlokOkruhy.update({ enabled: false, visible: agendaUct });
                        // predat ke schvaleni schvaleni
                        that.actions.actZrusitSchvaleni.update({ enabled: false });
                        // zrusit schvaleni
                        that.actions.actPredatKeSchvaleni.update({ enabled: false });
                        //  schvaleni
                        that.actions.actSchvalit.update({ enabled: false });
                        // stav kontroly
                        that.actions.actStavKontroly.update({ enabled: false });
                    }
                    else {
                        that.akt_mesic = data;
                        if (that.akt_mesic.mesic == that.MinOtevrenyMesic(data.ucs) /*(that.max_uzavreny_mesic + 1)*/) {
                            that.actions.actUzavrit.update({
                                enabled: (that.agenda === "UCT" ? that.globals.Globalni_Parametry.PovoleniUzavreniMesiceUCT && data.akt_obd == 100 /* Interface.GEAktivitaObdobi.Otevrene */ : that.globals.Globalni_Parametry.PovoleniUzavreniMesiceROZ && data.akt_obd == 100 /* Interface.GEAktivitaObdobi.Otevrene */)
                            });
                        }
                        else {
                            that.actions.actUzavrit.update({ enabled: false });
                        }
                        ;
                        // predat ke schvaleni
                        that.actions.actPredatKeSchvaleni.update({
                            enabled: that.IsAlloweSubmitForApproval(data)
                            //(that.agenda === "UCT" ? that.globals.Globalni_Parametry.PovoleniSchvaleniUzaverkyObdobiUCT! && data.akt_obd == 100 : that.globals.Globalni_Parametry.PovoleniSchvaleniUzaverkyObdobiROZ! && data.akt_obd == 100)
                        });
                        that.actions.actZrusitSchvaleni.update({
                            enabled: that.IsAlloweCancelSubmitForApproval(data)
                        });
                        that.actions.actSchvalit.update({
                            enabled: that.IsAlloweCancelSubmitForApproval(data)
                        });
                        // detail
                        that.actions.actDetail.update({ enabled: that.selectedRow != null });
                        // otevrit
                        that.actions.actOtevrit.update({
                            enabled: (that.agenda === "UCT" ?
                                that.globals.Globalni_Parametry.PovoleniOtevreniMesiceUCT && (typeof data.ucs === "undefined" || that.PocetOtevrenychObdobi(data.ucs) < that.globals.Globalni_Parametry.MaxPocetOtevrenychObdobiUct)
                                : that.globals.Globalni_Parametry.PovoleniOtevreniMesiceROZ && (typeof data.ucs === "undefined" || that.PocetOtevrenychObdobi(data.ucs) < that.globals.Globalni_Parametry.MaxPocetOtevrenychObdobiRoz))
                        });
                        if (that.akt_mesic.mesic == that.MaxUzavrenyMesic(data.ucs) /*(that.max_uzavreny_mesic)*/) {
                            that.actions.actZpetneOtevrit.update({
                                enabled: (that.agenda === "UCT" ?
                                    that.globals.Globalni_Parametry.PovoleniZnovuOtevreniMesiceUCT && data.akt_obd == 500 /* Interface.GEAktivitaObdobi.Uzavrene */ && data.stav == 0
                                    : that.globals.Globalni_Parametry.PovoleniZnovuOtevreniMesiceROZ && data.akt_obd == 500 /* Interface.GEAktivitaObdobi.Uzavrene */ && data.stav == 0)
                            });
                        }
                        else {
                            that.actions.actZpetneOtevrit.update({ enabled: false });
                        }
                        ;
                        // aktualizovat 
                        that.actions.actAktualizovat.update({ enabled: (that.agenda === "UCT" ? that.globals.Globalni_Parametry.PovoleniOtevreniMesiceUCT : that.globals.Globalni_Parametry.PovoleniOtevreniMesiceROZ) });
                        // aktualizovat stavy
                        that.actions.actAktualizovatStv.update({ enabled: that.globals.Globalni_Parametry.PovoleniAktualizaceStavu });
                        // blok. okruhy
                        that.actions.actBlokOkruhy.update({ enabled: that.globals.Globalni_Parametry.PovoleniBlokacnichOkruhu, visible: agendaUct });
                        // stav kontroly
                        that.actions.actStavKontroly.update({ enabled: true });
                    }
                }
                /**
                 * Zjisteni pocet otevrenych obdobich za stredisko
                 *
                 * */
                PocetOtevrenychObdobi(ucs) {
                    let pocet = 0;
                    for (var i = 0; i < this.MesiceData.length; i++) {
                        var item = this.MesiceData[i];
                        if ((item.ucs == ucs) && (item.akt_obd == 100 /* Interface.GEAktivitaObdobi.Otevrene */))
                            pocet++;
                    }
                    return pocet;
                }
                /**
                 * Zjisteni min. otevreneho mesice pro dane ucs
                 *
                 * */
                MinOtevrenyMesic(ucs) {
                    let mesic = 100;
                    for (var i = 0; i < this.MesiceData.length; i++) {
                        var item = this.MesiceData[i];
                        if (item.ucs == ucs && item.akt_obd == 100 /* Interface.GEAktivitaObdobi.Otevrene */)
                            if (mesic > item.mesic)
                                mesic = item.mesic;
                    }
                    return mesic;
                }
                /**
                 * Povoleni k predani ke schvaleni
                 *
                 * */
                IsAlloweSubmitForApproval(item) {
                    let mesic = 0;
                    let ucs = item.ucs;
                    let result = false;
                    let permit = true;
                    for (var i = 0; i < this.MesiceData.length; i++) {
                        var itemr = this.MesiceData[i];
                        if (itemr.ucs == ucs && itemr.mesic > item.mesic && itemr.akt_obd == 500 /* Interface.GEAktivitaObdobi.Uzavrene */ && itemr.stav !== 0) {
                            permit = false;
                            break;
                        }
                        if (itemr.ucs == ucs && itemr.mesic < item.mesic && itemr.akt_obd == 500 /* Interface.GEAktivitaObdobi.Uzavrene */ && (itemr.stav === 0 || itemr.stav === 2)) {
                            permit = false;
                            break;
                        }
                        if (itemr.ucs == ucs && itemr.akt_obd == 500 /* Interface.GEAktivitaObdobi.Uzavrene */ && itemr.stav === 0)
                            if (mesic < itemr.mesic) {
                                mesic = itemr.mesic;
                            }
                    }
                    if (item.akt_obd === 500 /* Interface.GEAktivitaObdobi.Uzavrene */ && item.stav === 0) {
                        result = permit;
                    }
                    return result;
                }
                /**
                 * Povoleni ke zruseni predani ke schvaleni
                 *
                 * */
                IsAlloweCancelSubmitForApproval(item) {
                    let mesic = 0;
                    let ucs = item.ucs;
                    let result = false;
                    // dohledeni max. obdobi k predani ke schvaleni
                    for (var i = 0; i < this.MesiceData.length; i++) {
                        var itemr = this.MesiceData[i];
                        if (itemr.ucs == ucs && itemr.akt_obd == 500 /* Interface.GEAktivitaObdobi.Uzavrene */ && itemr.stav === 2) {
                            if (mesic < itemr.mesic) {
                                mesic = itemr.mesic;
                            }
                        }
                    }
                    if (item.akt_obd === 500 /* Interface.GEAktivitaObdobi.Uzavrene */ && item.stav === 2) {
                        if (item.mesic === mesic)
                            result = true;
                    }
                    return result;
                }
                /**
                 * Zjisteni max. uzavreny mesic pro dane ucs
                 *
                 * */
                MaxUzavrenyMesic(ucs) {
                    let mesic = 0;
                    for (var i = 0; i < this.MesiceData.length; i++) {
                        var item = this.MesiceData[i];
                        if (item.ucs == ucs && item.akt_obd == 500 /* Interface.GEAktivitaObdobi.Uzavrene */)
                            if (mesic < item.mesic)
                                mesic = item.mesic;
                    }
                    return mesic;
                }
                /**
                 * Zjisteni max. otevreneho mesice pro dane ucs
                 *
                 * */
                GetRozsahObdobi() {
                    let maxMesic = 0;
                    let minMesic = 100;
                    let rozsahObdobi = [];
                    for (var i = 0; i < this.MesiceData.length; i++) {
                        var item = this.MesiceData[i];
                        if (maxMesic < item.mesic)
                            maxMesic = item.mesic;
                        if (minMesic > item.mesic)
                            minMesic = item.mesic;
                    }
                    if (maxMesic > 0) {
                        for (var i = minMesic; i <= maxMesic; i++) {
                            rozsahObdobi.push(i);
                        }
                    }
                    return rozsahObdobi;
                }
            };
            GObdobiMesice = __decorate([
                gcontent
            ], GObdobiMesice);
            WebClient.GObdobiMesice = GObdobiMesice;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR09iZG9iaU1lc2ljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdPYmRvYmlNZXNpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0VBT0U7Ozs7Ozs7QUFFRixJQUFVLE1BQU0sQ0F3N0RmO0FBeDdERCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F3N0RuQjtJQXg3RGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXc3RDdCO1FBeDdEb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYyxTQUFRLE9BQUEsWUFBWTtnQkFBL0M7O29CQVFJLHVDQUF1QztvQkFDN0Isd0JBQW1CLEdBQVcsQ0FBQyxDQUFDO29CQUVsQyxZQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO29CQUN2QyxlQUFVLEdBQXlDLEVBQUUsQ0FBQztvQkFjaEU7O3lCQUVLO29CQUNHLGdCQUFXLEdBQXlDLElBQUksQ0FBQztnQkFzNURyRSxDQUFDO2dCQW41REcsY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzlCLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQzt3QkFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsQ0FBQyx5Q0FBeUM7b0JBQzNFLENBQUM7eUJBQ0ksQ0FBQzt3QkFDRixJQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQyxDQUFDLHVDQUF1QztvQkFDekUsQ0FBQztvQkFFRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBRWIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO29CQUVmLGdCQUFnQjtvQkFDaEIsSUFBSSxD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QkFDRCxPQUFPLFlBQVksQ0FBQztnQkFDeEIsQ0FBQzthQUdKLENBQUE7WUFuN0RZLGFBQWE7Z0JBRHpCLFFBQVE7ZUFDSSxhQUFhLENBbTdEekI7WUFuN0RZLHVCQUFhLGdCQW03RHpCLENBQUE7UUFDTCxDQUFDLEVBeDdEb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBdzdEN0I7SUFBRCxDQUFDLEVBeDdEZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBdzdEbkI7QUFBRCxDQUFDLEVBeDdEUyxNQUFNLEtBQU4sTUFBTSxRQXc3RGYiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkludS5XZWJDbGllbnQuR09iZG9iaU1lc2ljZS5qcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEdQcmVwb2N0eVN0YXZ1ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSmnFmcOtIElsZcSNZWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAxNiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE2LTAzLTAzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbiovXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkludS5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHT2Jkb2JpTWVzaWNlIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgLy8gZmlsdGVyIHBhbmVsXHJcbiAgICAgICAgcHJpdmF0ZSAkZmlsdGVyUGFuZWw6IEpRdWVyeTtcclxuICAgICAgICBwcm90ZWN0ZWQgbW9kZWw6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVPYmRvYmlEdG9bXTtcclxuICAgICAgICAvL3Byb3RlY3RlZCBtb2RlbF9kZWY6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVPYmRvYmlEdG87XHJcbiAgICAgICAgcHJvdGVjdGVkIHR5cDogc3RyaW5nO1xyXG4gICAgICAgIHByb3RlY3RlZCBhZ2VuZGE6IHN0cmluZztcclxuICAgICAgICAvL3Byb3RlY3RlZCBtYXhfdXphdnJlbnlfbWVzaWM6IG51bWJlcjtcclxuICAgICAgICBwcm90ZWN0ZWQgY2Vsa2VtX25lcHJlcG9jdGVubzogbnVtYmVyID0gMDtcclxuICAgICAgICBwcm90ZWN0ZWQgYWt0X21lc2ljOiBHb3JkaWMuSW51LkludGVyZmFjZS5HSW51T2Jkb2JpRHRvO1xyXG4gICAgICAgIHByaXZhdGUgZ2xvYmFscyA9IEdvcmRpYy5JbnUuR2xvYmFscy5HSW51R2xvYmFscztcclxuICAgICAgICBwcm90ZWN0ZWQgTWVzaWNlRGF0YTogR29yZGljLkludS5JbnRlcmZhY2UuR0ludU9iZG9iaUR0b1tdID0gW107XHJcbiAgICAgICAgcHJpdmF0ZSBEYXRhVmlldzogR29yZGljLkRhdGEuVmlldztcclxuICAgICAgICBwcml2YXRlIHJvenNhaE9iZG9iaTogbnVtYmVyW107XHJcbiAgICAgICAgcHJpdmF0ZSBzZW5kVG9BdXRob3JpemVQZXJtaXQ6IEdvcmRpYy5HZW5lcmFsLkFwcGxpY2F0aW9uSW50ZXJmYWNlLkdQZXJtaXNzaW9uO1xyXG4gICAgICAgIHByaXZhdGUgYXV0aG9yaXplUGVybWl0OiBHb3JkaWMuR2VuZXJhbC5BcHBsaWNhdGlvbkludGVyZmFjZS5HUGVybWlzc2lvbjtcclxuICAgICAgICBwcml2YXRlIGNhbmNlbFNlbmRUb0F1dGhvcml6ZVBlcm1pdDogR29yZGljLkdlbmVyYWwuQXBwbGljYXRpb25JbnRlcmZhY2UuR1Blcm1pc3Npb247XHJcbiAgICAgICAgcHJpdmF0ZSBjb250cm9sU3RhdHVzUGVybWl0OiBHb3JkaWMuR2VuZXJhbC5BcHBsaWNhdGlvbkludGVyZmFjZS5HUGVybWlzc2lvbjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkRm9ybWF0U2V6bmFtOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVPYmRvYmlEdG8+O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHbG9iYWxuaSBuYXN0YXZlbmlcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHJlYWRvbmx5IEdsb2JhbFBhcmFtczogR29yZGljLkludS5XZWJDbGllbnQuR0ludUdsb2JhbER0bztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeWJyYW55IHJhZGVrXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIHNlbGVjdGVkUm93OkdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVPYmRvYmlEdG98bnVsbD1udWxsO1xyXG4gICAgICAgIHByaXZhdGUgZWxlbTogSlF1ZXJ5O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgJHRhYiA9ICQodGhpcy5jb250ZW50RGl2KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYWdlbmRhID09IFwiVUNUXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcImpyZXM6MzA0NTAwMDlcIjsgLy9SQyAzMDQ1MDAwOSA6IE3Em3PDrcSNbsOtIG9iZG9iw60gw7rEjWV0bmljdHbDrVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwianJlczozMDQ1MDAxMFwiOyAvL1JDIDMwNDUwMDEwIDogTcSbc8OtxI1uw60gb2Jkb2LDrSByb3pwb8SNdHVcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJHRhYi5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNudCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gYWtjw61cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdE90ZXZyaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyODhcIiwgaWNvbjogXCJnaS1wbHVzXCIsIC8vUkMgMzAyNTAyODggOiBOb3bDqSBvYmRvYsOtXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMwNDUwMDEyXCIsIC8vUkMgMzA0NTAwMTIgOiBPdGV2xZllbsOtIG5vdsOpaG8gb2Jkb2LDrS4gQXV0b21hdGlja3kgb3RldsWZZSBtxJtzw61jLCBrdGVyw70gbsOhc2xlZHVqZSBwbyBuZWp2ecWhxaHDrW0gZG9zdWQgb3RldsWZZW7DqW0gbcSbc8OtY2kgdiByw6FtY2kgw7rEjWV0bsOtaG8gc3TFmWVkaXNrYS5cclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5Qcm92ZWRBa2NlKEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFT3BlcmFjZVNPYmRvYmltLk90ZXZyZW5pT2Jkb2JpKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0SHJvbWFkbmVPdGV2cml0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwNDUwMDA2XCIuZm9ybWF0KEdvcmRpYy5Db25zdHMuRGJTaG9ydGN1dHMudWNzKSwgaWNvbjogXCJnaS1wbHVzXCIsIC8vUkMgMzA0NTAwMDYgOiBOb3bDqSBvYmRvYsOtIHBybyB2xaFlY2huYSB7MH1cclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzA0NTAwMThcIiwgLy9SQyAzMDQ1MDAxOCA6IE90ZXbFmWVuw60gbm92w6lobyBvYmRvYsOtIMO6xI10b3bDoW7DrSBwcm8gdsWhZWNobmEgw7rEjWV0bsOtIHN0xZllZGlza2EuIEF1dG9tYXRpY2t5IHNlIG90ZXbFmWUgcHJ2bsOtIG3Em3PDrWMsIGt0ZXLDvSBuw6FzbGVkdWplIHBvIG5lanZ5xaHFocOtbSBkb3N1ZCBvdGV2xZllbsOpbSBtxJtzw61jaSB2IHLDoW1jaSDDusSNZXRuw61obyBzdMWZZWRpc2thLlxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlByb3ZlZEhyb21hZG5lQWtjZShHb3JkaWMuSW51LkludGVyZmFjZS5HRU9wZXJhY2VTT2Jkb2JpbS5PdGV2cmVuaU9iZG9iaSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdEhyb21hZG5lVXphdnJpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDQ1MDAwN1wiLmZvcm1hdChHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLnVjcyksIGljb246IFwiZ2ktdnlyaXplbm91emFcIiwgLy9SQyAzMDQ1MDAwNyA6IFV6YXbFmcOtdCBwcm8gdsWhZWNobmEgezB9XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMwNDUwMDE5XCIsIC8vUkMgMzA0NTAwMTkgOiBVemF2xZllbsOtIG9iZG9iw60gw7rEjXRvdsOhbsOtIHBybyB2xaFlY2huYSDDusSNZXRuw60gc3TFmWVkaXNrYS4gQXV0b21hdGlja3kgc2UgdXphdsWZZSBwcnZuw60gbmV1emF2xZllbsO9IG3Em3PDrWMsIGt0ZXLDvSBuw6FzbGVkdWplIHBvIG5lanZ5xaHFocOtbSB1emF2xZllbsOpbSBtxJtzw61jaSB2IHLDoW1jaSDDusSNZXRuw61obyBzdMWZZWRpc2thLlxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5Qcm92ZWRIcm9tYWRuZUFrY2UoR29yZGljLkludS5JbnRlcmZhY2UuR0VPcGVyYWNlU09iZG9iaW0uVXphdnJlbmlPYmRvYmkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0RGV0YWlsOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25EZXRhaWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkZWsgPSB0aGF0LnNlbGVjdGVkUm93XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmFkZWsgIT09IHVuZGVmaW5lZCAmJiByYWRlayAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5Qcm92ZWRBa2NlKEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFT3BlcmFjZVNPYmRvYmltLkRldGFpbE9iZG9iaSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICBhY3RVemF2cml0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTA3XCIsICAvL1JDIDMwMjUwMTA3IDogVXphdsWZw610XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS12eXJpemVub3V6YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMDQ1MDAxN1wiLCAvL1JDIDMwNDUwMDE3IDogVXphdsWZZW7DrSBvYmRvYsOtXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuUHJvdmVkQWtjZShHb3JkaWMuSW51LkludGVyZmFjZS5HRU9wZXJhY2VTT2Jkb2JpbS5VemF2cmVuaU9iZG9iaSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgYWN0QWt0dWFsaXpvdmF0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDc4XCIsICAvL1JDIDMwMjUwMDc4IDogQWt0dWFsaXpvdmF0IG5hc3RhdmVuw60gb2Jkb2LDrVxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMDQ1MDAxM1wiLCAvL1JDIDMwNDUwMDEzIDogUHJvbcOtdG5lIG5vdsOpIG5hc3RhdmVuw60gcHJvIMO6xI10b3bDoW7DrShub3bEmyBwb3ZvbGVuw6kgZHJ1aHkgZG9rbGFkxa8sIG5vdsSbIHphbG/FvmVuw6kgw7rEjWV0bsOtIHN1YsWZYWR5KSBkbyBqacW+IG90ZXbFmWVuw6lobyBvYmRvYsOtIMO6xI10b3bDoW7DrS5cclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXJlZnJlc2hcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnNlbGVjdGVkUm93ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlByb3ZlZEFrY2UoR29yZGljLkludS5JbnRlcmZhY2UuR0VPcGVyYWNlU09iZG9iaW0uQWt0dWFsaXphY2VPYmRvYmkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RTdGF2S29udHJvbHk6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNzBcIiwgIC8vUkMgMzAyNTAzNzAgOiBTdGF2IGtvbnRyb2x5XHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnNlbGVjdGVkUm93ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlByb3ZlZEFrY2UoR29yZGljLkludS5JbnRlcmZhY2UuR0VPcGVyYWNlU09iZG9iaW0uU3RhdktvbnRyb2x5KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFpwZXRuZU90ZXZyaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwODBcIiwgIC8vUkMgMzAyNTAwODAgOiBacMSbdG7EmyBvdGV2xZnDrXRcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnNlbGVjdGVkUm93ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5Eb3Rheih0aGF0LCBcImpyZXM6MzAyNTAzNzZcIi5mb3JtYXQodGhhdC5zZWxlY3RlZFJvdy5tZXNpYyBhcyBudW1iZXIsIHRoYXQuc2VsZWN0ZWRSb3cucm9rIGFzIG51bWJlcikpIC8vUkMgMzAyNTAzNzYgOiBPcHJhdmR1IGNoY2V0ZSB6cMSbdG7EmyBvdGV2xZnDrXQgb2Jkb2LDrSB7MH0vezF9P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChwYXJhbWV0cikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1ldHIgPT09IFwiWUVTXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlByb3ZlZEFrY2UoR29yZGljLkludS5JbnRlcmZhY2UuR0VPcGVyYWNlU09iZG9iaW0uWnBldG5lT3RldnJpdFV6YXZyZW5pT2Jkb2JpLCB0aGF0LnNlbGVjdGVkUm93IGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuenBldG5lX290ZXZyaXRfbWVzaWMoYWt0X21lc2ljX2kpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgYWN0QWt0dWFsaXpvdmF0U3R2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDgyXCIsIGljb246IFwiZ2ktcmVmcmVzaFwiLCAvL1JDIDMwMjUwMDgyIDogQWt0dWFsaXpvdmF0IHN0YXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJBa3R1YWxpem92YXQgc3RhdnkgXCIgKyB0aGF0LmFrdF9tZXNpYy5tZXNpY190eHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5Qcm92ZWRBa2NlKEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFT3BlcmFjZVNPYmRvYmltLkFrdHVhbGl6YWNlU3RhdnUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RQcmVkYXRLZVNjaHZhbGVuaToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM3M1wiLCAgLy9SQyAzMDI1MDM3MyA6IFDFmWVkYXQga2Ugc2NodsOhbGVuw61cclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0aGF0LnNlbmRUb0F1dGhvcml6ZVBlcm1pdC52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuc2VsZWN0ZWRSb3cgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkRvdGF6KHRoYXQsIFwianJlczozMDI1MDM3N1wiLmZvcm1hdCh0aGF0LnNlbGVjdGVkUm93Py5tZXNpYyBhcyBudW1iZXIsIHRoYXQuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uUk9LIGFzIG51bWJlcikpIC8vUkMgMzAyNTAzNzcgOiBQxZllZMOhbsOtbSB1esOhdsSbcmt5IG3Em3PDrcSNbsOtaG8gb2Jkb2LDrSB7MH0vezF9IGtlIHNjaHbDoWxlbsOtIGppxb4gbmVidWRlIG1vxb5uw6kgZGFuw6kgb2Jkb2LDrSB6cMSbdG7EmyBvdGV2xZnDrXQuO09wcmF2ZHUgY2hjZXRlIHV6w6F2xJtya3UgZGFuw6lobyBtxJtzw63EjW7DrWhvIG9iZG9iw60gcMWZZWRhdCBrZSBzY2h2w6FsZW7DrT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocGFyYW1ldHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtZXRyID09PSBcIllFU1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5Qcm92ZWRBa2NlKEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFT3BlcmFjZVNPYmRvYmltLlByZWRhdEtlU2NodmFsZW5pLCB0aGF0LnNlbGVjdGVkUm93IGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC56cGV0bmVfb3RldnJpdF9tZXNpYyhha3RfbWVzaWNfaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFpydXNpdFNjaHZhbGVuaToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM3NFwiLCAgLy9SQyAzMDI1MDM3NCA6IFpydcWhaXQgc2NodsOhbGVuw61cclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0aGF0LmNhbmNlbFNlbmRUb0F1dGhvcml6ZVBlcm1pdC52aXNpYmxlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5zZWxlY3RlZFJvdyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uRG90YXoodGhhdCwgXCJqcmVzOjMwMjUwMzc4XCIuZm9ybWF0KHRoYXQuc2VsZWN0ZWRSb3c/Lm1lc2ljIGFzIG51bWJlciwgdGhhdC5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5ST0sgYXMgbnVtYmVyKSkgLy9SQyAzMDI1MDM3OCA6IE9wcmF2ZHUgY2hjZXRlIHV6w6F2xJtya3UgbcSbc8OtxI1uw61obyBvYmRvYsOtIHswfS97MX0gdnLDoXRpdCBrIHDFmWVwcmFjb3bDoW7DrT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocGFyYW1ldHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtZXRyID09PSBcIllFU1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5Qcm92ZWRBa2NlKEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFT3BlcmFjZVNPYmRvYmltLlpydXNpdFByZWRhdEtlU2NodmFsZW5pLCB0aGF0LnNlbGVjdGVkUm93IGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0U2NodmFsaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNzVcIiwgIC8vUkMgMzAyNTAzNzUgOiBTY2h2w6FsaXRcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0aGF0LmF1dGhvcml6ZVBlcm1pdC52aXNpYmxlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuc2VsZWN0ZWRSb3cgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkRvdGF6KHRoYXQsIFwianJlczozMDI1MDM3OVwiLmZvcm1hdCh0aGF0LnNlbGVjdGVkUm93Py5tZXNpYyBhcyBudW1iZXIsIHRoYXQuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uUk9LIGFzIG51bWJlcikpIC8vUkMgMzAyNTAzNzkgOiBTY2h2w6FsZW7DrW0gdXrDoXbEm3JreSBtxJtzw63EjW7DrWhvIG9iZG9iw60gezB9L3sxfSBqacW+IG5lYnVkZSBtb8W+bsOpIGRhbsOpIG9iZG9iw60genDEm3RuxJsgb3RldsWZw610LiBPcHJhdmR1IGNoY2V0ZSBzY2h2w6FsaXQgdXrDoXbEm3JrdSBkYW7DqWhvIG3Em3PDrcSNbsOtaG8gb2Jkb2LDrT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocGFyYW1ldHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtZXRyID09PSBcIllFU1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5Qcm92ZWRBa2NlKEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFT3BlcmFjZVNPYmRvYmltLlNjaHZhbGl0VXphdmVya3UsIHRoYXQuc2VsZWN0ZWRSb3cgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RCbG9rT2tydWh5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzgzXCIsICAvL1JDIDMwMjUwMzgzIDogQmxva2HEjW7DrSBva3J1aHlcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnNlbGVjdGVkUm93ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuUHJvdmVkQWtjZShHb3JkaWMuSW51LkludGVyZmFjZS5HRU9wZXJhY2VTT2Jkb2JpbS5CbG9rYWNuaU9rcnVoeSwgdGhhdC5zZWxlY3RlZFJvdyBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vYWN0U2VwQmxva09rcnVoeToge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgdHlwZTogXCJzZXBhcmF0b3JcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwianJlczozMDI1MDM4M1wiLCAgLy9SQyAzMDI1MDM4MyA6IEJsb2thxI1uw60gb2tydWh5XHJcbiAgICAgICAgICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgcnVuOiAoKT0+e31cclxuICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gbWVudUJhcnVcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0T3RldnJpdCpcIiwgXCJhY3REZXRhaWwqXCIsIFwiYWN0VXphdnJpdCpcIiwgXCJhY3RBa3R1YWxpem92YXQqXCIsIFwiYWN0WnBldG5lT3RldnJpdCpcIiwgIC8vIFwiYWN0QWt0dWFsaXpvdmF0U3R2KlwiLCBcclxuICAgICAgICAgICAgICAgIHsgdHlwZTogXCJzZXBhcmF0b3JcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwibWVudU90ZXZyaXRcIiwgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0SHJvbWFkbmVPdGV2cml0LCBmYXZvcml0ZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiBcIm1lbnVVemF2cml0XCIsIGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdEhyb21hZG5lVXphdnJpdCwgZmF2b3JpdGU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgICAgIC8vICAgIGlkOiBcIm1lbnVIcm9tYWRPcGVyYWNlXCIsIGNhcHRpb246IFwianJlczozMDI1MDM1OFwiLCB0eXBlOiBcInN0YXRpY1wiLCBmYXZvcml0ZTogZmFsc2UsIGNoaWxkcmVuOiBbIC8vUkMgMzAyNTAzNTggOiBIcm9tYWRuw6kgb3BlcmFjZVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHsgaWQ6IFwibWVudU90ZXZyaXRcIiwgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0SHJvbWFkbmVPdGV2cml0LCBmYXZvcml0ZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB7IGlkOiBcIm1lbnVVemF2cml0XCIsIGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdEhyb21hZG5lVXphdnJpdCwgZmF2b3JpdGU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICBdXHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICwgeyB0eXBlOiBcInNlcGFyYXRvclwiIH1cclxuICAgICAgICAgICAgICAgICwgXCJhY3RTdGF2S29udHJvbHkqXCJcclxuICAgICAgICAgICAgICAgICwgeyB0eXBlOiBcInNlcGFyYXRvclwiIH1cclxuICAgICAgICAgICAgICAgICxcImFjdEJsb2tPa3J1aHlcIlxyXG4gICAgICAgICAgICAgICAgLHsgdHlwZTogXCJzZXBhcmF0b3JcIiB9XHJcbiAgICAgICAgICAgICAgICAsIFwiYWN0UHJlZGF0S2VTY2h2YWxlbmlcIlxyXG4gICAgICAgICAgICAgICAgLCBcImFjdFpydXNpdFNjaHZhbGVuaVwiXHJcbiAgICAgICAgICAgICAgICAsIFwiYWN0U2NodmFsaXRcIlxyXG4gICAgICAgICAgICBdKSk7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciBpdGVtdGVtcGxhdGVfbWVzaWMgPSBcIjxkaXYgc3R5bGU9J2JvcmRlcjoxcHggc29saWQgTGlnaHRHcmF5OyBwYWRkaW5nOiA1cHg7IHdpZHRoOjIzMHB4OyBoZWlnaHQ6MjUwcHg7Jz5cIiArXHJcbiAgICAgICAgICAgIC8vICAgIC8vXCI8ZGl2IHN0eWxlPSdiYWNrZ3JvdW5kLWNvbG9yOiB7YmFydmFfdHh0fTsgcGFkZGluZzogNXB4Oyc+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICBcIjxkaXYgc3R5bGU9J3BhZGRpbmc6IDVweDsnPlwiICtcclxuICAgICAgICAgICAgLy8gICAgXCI8aDM+PGkgY2xhc3M9J2ZhIHtzbDF9JyBzdHlsZT0nY29sb3I6IGdyYXk7JyBhcmlhLWhpZGRlbj0ndHJ1ZSc+PC9pPiAgICAgICB7bWVzaWN9IC0ge21lc2ljX3R4dH08L2gzPlwiICtcclxuICAgICAgICAgICAgLy8gICAgXCI8L2Rpdj48ZGl2IHN0eWxlPSd3aWR0aDoyMTlweDsgcGFkZGluZzogNXB4Oyc+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICBcIjxoMyBzdHlsZT0nY29sb3I6IHtha3Rpdml0YV9jb2xvcn07Jz57YWt0aXZpdGFfdHh0fTwvaDM+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICBcIjxwPlwiICsgR29yZGljLkNvbnN0cy5EYlNob3J0Y3V0cy51Y3MrXCI6IHt1Y3N9PC9wPlwiICtcclxuICAgICAgICAgICAgLy8gICAgXCI8cD5aw6FwaXPFryBjZWxrZW06IHtwb2NldF96YXBpc3VfY2Vsa2VtX3R4dH08L3A+XCIgKyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gICAgXCI8cD5aw6FwaXPFryBuZXDFmWVwb8SNdGVubzoge3BvY2V0X3phcGlzdV9uZXByZXBvY3Rlbm9fdHh0fTwvcD48cCBjbGFzcz0nZmEge2FrdHVhbG5pX3N0YXZ5X2lrb25hfScgc3R5bGU9J2NvbG9yOiBncmF5OycgYXJpYS1oaWRkZW49J3RydWUnPjwvcD48YnI+PGJyPlwiICtcclxuICAgICAgICAgICAgLy8gICAgLy8gICAgICAgICAgICAgICAgXCI8ZGl2PjxidXR0b24gbmFtZT0ndGxhY2l0a28nPiZuYnNwPC9idXR0b24+PGJ1dHRvbiBuYW1lPSd0bGFjaXRrbzInPjwvYnV0dG9uPjwvZGl2PlwiICtcclxuICAgICAgICAgICAgLy8gICAgXCI8L2Rpdj48L2Rpdj5cIjtcclxuXHJcbiAgICAgICAgICAgIC8vdGhhdC5EYXRhVmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHRoYXQuTWVzaWNlRGF0YSwgeyBrZXk6IFwiaWRcIiwgcHJvY2Vzc29yczogeyBwcm92aWRlcjogcHJvdmlkZXIsIHRyZWVQcm9jZXNzb3I6IHRyZWVQcm9jZXNzb3IgfSB9KTtcclxuICAgICAgICAgICAgdGhhdC5EYXRhVmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHRoYXQuTWVzaWNlRGF0YSwgeyBrZXk6IFwicm9rLGxpYyxpY28sdWNzLG1lc2ljXCIgfSk7XHJcbiAgICAgICAgICAgIC8vIHZ5dHZvcmVuaSBmaXRydSBwYW5lbHVcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGaWx0ZXJQYW5lbCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhhdC5ncmlkRm9ybWF0U2V6bmFtID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcImFrdGl2aXRhXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBmaWVsZDogXCJha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgY2FwdGlvbjogXCJTdGF2XCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBmb3JtYXRQcmVzZXQ6IEdvcmRpYy5HbG9iYWwuRW51bXMuR3JpZENvbHVtbkZvcm1hdEljb24uZnVsbCxcclxuICAgICAgICAgICAgLy8gICAgICAgIHdpZHRoOiAyNDAsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy9yZXR1cm4geyBpY29uOiBkYXRhLnNsMSwgdGV4dDogZGF0YS5ha3Rpdml0YV90eHQsIGNhcHRpb246IGRhdGEuYWt0aXZpdGFfdHh0LCB0b29sdGlwOiBkYXRhLmFrdGl2aXRhX3R4dCB9O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHN3aXRjaCAoZGF0YS5ha3Rfb2JkKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGNhc2UgMTAwOiByZXR1cm4geyBpY29uOiBkYXRhLnNsMSArIFwiIGctc3RhdGUtc3VjY2VzcyBnLXN0YXRlLXRleHRcIiwgdGV4dDogZGF0YS5ha3Rpdml0YV90eHQsIGNhcHRpb246IGRhdGEuYWt0aXZpdGFfdHh0LCB0b29sdGlwOiBkYXRhLmFrdGl2aXRhX3R4dCB9O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBjYXNlIDUwMDogcmV0dXJuIHsgaWNvbjogZGF0YS5zbDEgKyBcIiBnLXN0YXRlLWVycm9yIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBkYXRhLmFrdGl2aXRhX3R4dCwgY2FwdGlvbjogZGF0YS5ha3Rpdml0YV90eHQsIHRvb2x0aXA6IGRhdGEuYWt0aXZpdGFfdHh0IH07XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAgICAgLy8gICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJha3Rpdml0YV96a3JcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGNhcHRpb246IFwiIFNcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIHdpZHRoOiAzMFxyXG4gICAgICAgICAgICAvLyAgICB9KVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgLy8gICAgICAgIG5hbWU6IFwicm9rXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjYXB0aW9uOiBcIlJva1wiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgd2lkdGg6IDYwXHJcbiAgICAgICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgIC8vLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAvLyAgICAvLyAgICBuYW1lOiBcImljb1wiLFxyXG4gICAgICAgICAgICAvLyAgICAvLyAgICBjYXB0aW9uOiBcIknEjFwiLFxyXG4gICAgICAgICAgICAvLyAgICAvLyAgICB3aWR0aDogMTAwXHJcbiAgICAgICAgICAgIC8vICAgIC8vfSlcclxuICAgICAgICAgICAgLy8gICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJ1Y3NcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGNhcHRpb246IEdvcmRpYy5Db25zdHMuRGJTaG9ydGN1dHMudWNzLC8vdGhpcy5HbG9iYWxQYXJhbXMuWmtyYXRreT8uVWNzLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgd2lkdGg6IDEwMFxyXG4gICAgICAgICAgICAvLyAgICB9KVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgLy8gICAgICAgIG5hbWU6IFwibWVzaWNcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGNhcHRpb246IFwiTcSbc8OtY1wiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgd2lkdGg6IDcwXHJcbiAgICAgICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJwb2NldF96YXBpc3VfbmVwcmVwb2N0ZW5vXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjYXB0aW9uOiBcIlrDoXBpc8WvIG5lcMWZZXBvxI10ZW5vXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICB3aWR0aDogMTcwXHJcbiAgICAgICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJwb2NldF96YXBpc3VfY2Vsa2VtXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjYXB0aW9uOiBcIkNlbGtlbSB6w6FwaXPFr1wiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgd2lkdGg6IDE3MFxyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL2lmICh0aGF0LmFnZW5kYSA9PSBcIlVDVFwiICkge1xyXG4gICAgICAgICAgICAvLyAgICB0aGF0LmdyaWRGb3JtYXRTZXpuYW1cclxuICAgICAgICAgICAgLy8gICAgICAgIC5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBuYW1lOiBcImJsb2tcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBmaWVsZDogXCJibG9rXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY2FwdGlvbjogXCIgQlwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHdpZHRoOiAyMCwgXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgZm9ybWF0UHJlc2V0OiBHb3JkaWMuR2xvYmFsLkVudW1zLkdyaWRDb2x1bW5Gb3JtYXRJY29uLnRleHQsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWNvblRlbXBsYXRlOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBzd2l0Y2ggKGRhdGEhLmJsb2spIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIHsgaWNvbjogXCJmYS1md1wiLCB0ZXh0OiBcIiBcIiwgY2FwdGlvbjogXCJOZWJsb2tvdsOhbm9cIiwgdG9vbHRpcDogXCJOZWJsb2tvdsOhbm9cIiB9O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIHsgaWNvbjogXCJnaS10aWNrXCIsIHRleHQ6IFwiQlwiLCBjYXB0aW9uOiBcIkJsb2tvdsOhbm9cIiwgdG9vbHRpcDogXCJCbG9rb3bDoW5vXCIgfTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgdGhhdC5ncmlkRm9ybWF0U2V6bmFtID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZEZvcm1hdFNlem5hbVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWt0aXZpdGFfemtyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwiYWt0aXZpdGFfemtyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCIgU1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlN0YXYgb2Jkb2LDrVwiLCBcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LmFnZW5kYSA9PSBcIlVDVFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmdyaWRGb3JtYXRTZXpuYW1cclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYmxva2FjZV96a3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwiYmxva2FjZV96a3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCIgQlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTdGF2IGJsb2thY2VcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMCxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhhdC5ncmlkRm9ybWF0U2V6bmFtXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiYWt0aXZpdGFfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBmaWVsZDogXCJha3Rpdml0YV90eHRcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwiU3RhdiBvYmRvYsOtXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICB3aWR0aDogMTYwLFxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogR29yZGljLkNvbnN0cy5EYlNob3J0Y3V0cy51Y3MsLy90aGlzLkdsb2JhbFBhcmFtcy5aa3JhdGt5Py5VY3MsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImxpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTGljXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVzaWNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk3Em3PDrWNcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDcwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb2NldF96YXBpc3VfbmVwcmVwb2N0ZW5vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOZXDFmWVwb8SNdGVubyB6w6FwaXPFr1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNzBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvY2V0X3phcGlzdV9jZWxrZW1cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkNlbGtlbSB6w6FwaXPFr1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNzBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzY2h2YWxlbmlfemtyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwic2NodmFsZW5pX3prclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU2NodlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlN0YXYgc2NodsOhbGVuw61cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDUwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDtcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vbmFwbG7Em27DrSBkbyBncmlkdVxyXG4gICAgICAgICAgICB0aGlzLmVsZW0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8oY250LmVsZW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW0uZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICAvL211bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogZnVuY3Rpb24gKGV2LCBvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKG8uY291bnQgPT0gMSkgY250LmFjdGlvbnMuYWN0RWRpdEFrY2UhLnVwZGF0ZVBlcm1pc3Npb24oby5nZXRTZWxlY3Rpb24oKVswXS5QZXJtaXNzaW9ucywgXCJMemVFZGl0b3ZhdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZ5YnJhbmVSYWRreSA9IG8uZ2V0U2VsZWN0aW9uKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZ5YnJhbmVSYWRreS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2X3JhZGVrX21ldGEgPSB2eWJyYW5lUmFka3lbMF07IC8vICQodGhpcykuZ2dyaWQoXCJhY3RpdmVSb3dcIiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZfcmFkZWtfbWV0YSAmJiAhdl9yYWRla19tZXRhLl9pc1ZpcnR1YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdl9yYWRlayA9IHZfcmFkZWtfbWV0YS5kYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZfcmFkZWsuaWNvICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNlbGVjdGVkUm93ID0gdl9yYWRlaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlJlZnJlc2hBY3Rpb24odGhhdC5zZWxlY3RlZFJvdyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbEFjdGl2YXRlKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCJtZXNpY1wiXSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGF0LmdyaWRGb3JtYXRTZXpuYW1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lbGVtLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LkRhdGFWaWV3KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuZWxlbS5nY2FyZHBhbmVsKHtcclxuICAgICAgICAgICAgLy8gICAgZWRpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAvLyAgICB0aXRsZTogXCJqcmVzOjMwMjUwMDgzXCIuZm9ybWF0KHRoaXMuYWdlbmRhKSwgLy9SQyAzMDI1MDA4MyA6IFNlem5hbSBvYmRvYsOtIHswfVxyXG4gICAgICAgICAgICAvLyAgICBkYXRhOiB0aGF0LkRhdGFWaWV3LCAvL3RoYXQuTWVzaWNlRGF0YSxcclxuICAgICAgICAgICAgLy8gICAgaXRlbVRlbXBsYXRlOiBpdGVtdGVtcGxhdGVfbWVzaWMsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvL2Zvcm06IHRoaXMub2JkRm9ybSxcclxuICAgICAgICAgICAgLy8gICAgLy9jcmVhdGVUYWI6IGZhbHNlLFxyXG4gICAgICAgICAgICAvLyAgICBkZWZhdWx0QWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsLCAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICBzZWxlY3Rpb246IGZ1bmN0aW9uIChldiwgZGF0YTogR29yZGljLkludS5JbnRlcmZhY2UuR0ludU9iZG9iaUR0bykge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgaWYgKHR5cGVvZiBkYXRhLmljbyAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LnNlbGVjdGVkUm93ID0gZGF0YTtcclxuICAgICAgICAgICAgLy8gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LnNlbGVjdGVkUm93ID0gbnVsbDtcclxuICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuUmVmcmVzaEFjdGlvbih0aGF0LnNlbGVjdGVkUm93KTtcclxuICAgICAgICAgICAgLy8gICAgICB9XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJ1Y3NcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyB1Y3M6IHRoaXMuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uVUNTLCBpY286IHRoaXMuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uSUNPIH0sIHRydWUpO1xyXG4gICAgICAgICAgICB0aGF0LlJlZnJlc2hBY3Rpb24oKTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhhdC5SZWxvYWQoeyB1Y3M6IHRoaXMuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uVUNTfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgIC8qKlxyXG4gICAgICAgICogZnVuY3Rpb24gQ3JlYXRlRmlsdGVyWmFsb3prYVxyXG4gICAgICAgICogICAgICBcclxuICAgICAgICAqIE9iZWNuYSB6YWxvemthXHJcbiAgICAgICAgKiBAcGFyYW0ge0dDb250ZW50fSBjb250ZW50XHJcbiAgICAgICAgKiBAcmV0dXJucyB7YW55fVxyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBDcmVhdGVGaWx0ZXJaYWxvemthKCk6IGFueSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgZmlsdGVyRm9ybURlZiA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IC8qb3BlbmVkOiB0cnVlLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMSwgTC0zLTgtMSwgTS0xMi0xMS0xLCBTLTEyLTExLTFcIiwqLyB0YWJMYWJlbDogXCJqcmVzOjMwMjUwNDM4XCIsXHJcbiAgICAgICAgICAgIC8vICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoYSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgbmV3IEdvcmRpYy5EYXRhLlJlYWRlcnMuRWtvc3VjcygpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLmdldERhdGEoe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGF0LnNlcnZlckNvbnRleHQuaWNvLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgcm9rX29kOiBcIjw9IFwiICsgdGhhdC5zZXJ2ZXJDb250ZXh0LnJvayxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHJva19kbzogXCI+PSBcIiArIHRoYXQuc2VydmVyQ29udGV4dC5yb2ssXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfSkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT0gMikge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgJCh0aGF0KS5maW5kRmllbGRzKFwidWNzXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEubGVuZ3RoKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KEdvcmRpYy5Db25zdHMuRGJTaG9ydGN1dHMudWNzKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc3VjcygpLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaWNvMT12YWx1ZS5pY287bW9kZWwudWNzPXZhbHVlLnVjc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3Vjczp0cmltOmVuY29kZX1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5ncGMuaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rX29kOiBcIjw9IFwiICsgdGhpcy5ncGMucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rX2RvOiBcIj49IFwiICsgdGhpcy5ncGMucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9ICQodGhpcykuY2xvc2VzdChcIi5nZm9ybVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLkRhdGEuUmVhZGVycy5Fa29zdWNzKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhhdC5ncGMuaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2tfb2Q6IFwiPD0gXCIgKyB0aGF0LmdwYy5yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJva19kbzogXCI+PSBcIiArIHRoYXQuZ3BjLnJvayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChkYXRhKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZU9iai52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2IHBvbGkgdWNzIGplIGhvZG5vdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwidWNzXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcInZzZWNobmF1Y3NcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0SHJvbWFkbmVPdGV2cml0IS51cGRhdGUoeyBlbmFibGVkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RIcm9tYWRuZVV6YXZyaXQhLnVwZGF0ZSh7IGVuYWJsZWQ6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdiBwb2xpIHVjcyBqZSBwcsOhemRubyAtIGJ1ZHUgcG92b2xvdmF0IGhyb21hZG7DqSBvcGVyYWNlLCBhbGUgcG91emUgcG9rdWQgamUgdsOtY2UgZG9zdHVwbsO9Y2ggdWNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RIcm9tYWRuZU90ZXZyaXQhLnVwZGF0ZSh7IGVuYWJsZWQ6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RIcm9tYWRuZVV6YXZyaXQhLnVwZGF0ZSh7IGVuYWJsZWQ6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdEhyb21hZG5lT3RldnJpdCEudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogKHRoYXQuYWdlbmRhID09PSBcIlVDVFwiID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ2xvYmFscy5HbG9iYWxuaV9QYXJhbWV0cnkuUG92b2xlbmlPdGV2cmVuaU1lc2ljZVVDVCEgOiB0aGF0Lmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlBvdm9sZW5pT3RldnJlbmlNZXNpY2VST1ohKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RIcm9tYWRuZVV6YXZyaXQhLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6ICh0aGF0LmFnZW5kYSA9PT0gXCJVQ1RcIiA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlBvdm9sZW5pVXphdnJlbmlNZXNpY2VVQ1QhIDogdGhhdC5nbG9iYWxzLkdsb2JhbG5pX1BhcmFtZXRyeS5Qb3ZvbGVuaVV6YXZyZW5pTWVzaWNlUk9aISlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9YWFhKSSB0aGF0LlJlbG9hZCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlOiB7IGljbzogdGhpcy5la29QYXJhbXMuSWNvLCB1Y3M6IHRoaXMuZWtvUGFyYW1zLlVjcyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgYWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgaWNvOiB0aGlzLmVrb1BhcmFtcy5JY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vcm9rX29kOiBcIjw9IFwiICt0aGlzLmVrb1BhcmFtcy5Sb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vcm9rX2RvOiBcIj49IFwiICt0aGlzLmVrb1BhcmFtcy5Sb2ssXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZzZWNobmF1Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVsWhZWNobmEgVUNTXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZU9iai52YWx1ZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInVjc1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInVjc1wiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInVjc1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IHVjczogdGhhdC5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5VQ1MsIGljbzogdGhhdC5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5JQ08gfSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJ1Y3NcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1hYWEpJIHRoYXQuUmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwNDUwMDExXCIgfSkgLy9SQyAzMDQ1MDAxMSA6IE3Em3PDrWMgKG9kLSBkbylcclxuICAgICAgICAgICAgICAgIC8vLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoeyBsYWJlbDogXCJGaW5hbmNvdsOhbsOtIE9EXCIsIG5hbWU6IFwiZmluX29kXCIsIHR5cGU6IFwicm9rXCIgfSkpXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwib2Jkb2JpT2RcIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGF0LnJvenNhaE9iZG9iaSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VPYmouZmxhZ3MudmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcIm9iZG9iaURvXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGNoYW5nZU9iai52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1hYWEpJIHRoYXQuUmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwib2Jkb2JpRG9cIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGF0LnJvenNhaE9iZG9iaSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VPYmouZmxhZ3MudmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vWFhYSkkgdGhhdC5SZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIlN0YXYgb2Jkb2LDrVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIixcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwib3RldnJlbmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczozMDI1MDM2OFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vWFhYSkkgdGhhdC5SZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pIC8vUkMgMzAyNTAzNjggOiBPdGV2xZllbsOpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIixcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXphdnJlbmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczozMDI1MDM2OVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1hYWEpJIHRoYXQuUmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSAvL1JDIDMwMjUwMzY5IDogVXphdsWZZW7DqVxyXG5cclxuICAgICAgICAgICAgICAgIDtcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyRm9ybURlZjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGZpbHRyb3ZhY2lobyBwYW5lbHVcclxuICAgICAgICAgKiBAcGFyYW0gdGhhdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyUGFuZWwodGhhdDogdGhpcyk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kZmlsdGVyUGFuZWwgPSAkKFwiPGRpdiBjbGFzcz0nanMtZmlsdHInPlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZmlsdGVycGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlckN1c3RvbWl6ZXI6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb2xTb3J0ID0gZGF0YS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhLm5hbWUgPj0gYi5uYW1lOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBvbFNvcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmb3JtczogW3RoYXQuQ3JlYXRlRmlsdGVyWmFsb3prYSgpXSxcclxuICAgICAgICAgICAgICAgICAgICAvL2ZpbHRlclZpZXdNb2RlOiBkZWZGaWx0cnUsLy8gRmlsdGVyVmlld01vZGUuRGV0YWlsLCAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9mYXZvcml0ZXM6IFtcIml4cFwiLCBcIml4c190eXBcIiwgXCJ2bGFzdG5pX2Rva2xhZHlcIl0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Mb2FkQWZ0ZXJDaG9zZUZpbHRlcjogdHJ1ZSxcclxuLy9YWFhKSSAgICAgICAgICAgICAgICAgICAgZGV0YWlsQWN0aW9uQXNDaGVja2JveDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zYXZlT3B0aW9uc0Zvcm06IFwiZWtvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RvcmFnZVNlcnZpY2U6IG5ldyBHb3JkaWMuR2luLkZpbHRlclN0b3JhZ2VTZXJ2aWNlLlN0b3JlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgLy9maWx0ZXJWaWV3TW9kZVVzZXJTZXR0aW5nczogXCJEZW55XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZmlsdGVyVmlld01vZGU6IEZpbHRlclZpZXdNb2RlLlNpbXBsZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAyMC4wNS4yMDIyIC0gVEZlaWtcclxuICAgICAgICAgICAgICAgICAgICAvLyBPcHJhdmEgZmlsdGVyIHZpZXcgbcOzZMWvLlxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlVXNlclNldHRpbmdzOiBbRmlsdGVyVmlld01vZGUuU2ltcGxlLCBGaWx0ZXJWaWV3TW9kZS5Ob3JtYWwsIEZpbHRlclZpZXdNb2RlLkRldGFpbF0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVmlld01vZGU6IEZpbHRlclZpZXdNb2RlLlNpbXBsZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gMDEuMDMuMjAyMSAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTmFocmF6ZW7DrSBvYnNvbGV0ZSBwYXJhbWV0csWvLlxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Mb2FkQWZ0ZXJDcmVhdGVQYW5lbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL3VzZXJEZWZhdWx0RmlsdGVyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2ltcGxlTW9kZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZUxheW91dERlc2NyaXB0b3I6IFwiTDRNM1MxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9maWx0ZXJIZWxwZXJJdGVtVGVtcGxhdGU6IFwiPGI+e25hemV2fTwvYj5cIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHRJdGVtVGVtcGxhdGU6IFwie25hemV2fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5OiBmdW5jdGlvbiAoZXZlbnQsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbHRlckZvcm0uYXBwbHlcIiwgb2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2cudHJhY2UoXCJmaWx0ZXJGb3JtLmFwcGx5XCIsIG9iaik7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5EYXRhVmlldy5yZXF1ZXN0RGF0YS8qPEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdVY3JUcmVlRG9wbG5VZGFqZUR0bz4qLyhvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlJlbG9hZChvYmouZmlsdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29sdW1ucygpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVPYmRvYmlWeWFicmFuZUR0bz4ge1xyXG4gICAgICAgICAgICB2YXIgY29sdW1ucyA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVPYmRvYmlWeWFicmFuZUR0bz4oKTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRNZXNpYyhjb2x1bW5zKTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRSb2soY29sdW1ucyk7XHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiYWt0aXZpdGFfdHh0XCIsIGNhcHRpb246IFwianJlczozMDI1MDM2MlwiLCB3aWR0aDogOTAgfSk7IC8vUkMgMzAyNTAzNjIgOiBTdGF2XHJcblxyXG4vLyAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkSWNvU3ViamVrdHUoY29sdW1ucyk7XHJcbi8vICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJpY29cIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzY3XCIsIHdpZHRoOiA4MCB9KTsgLy9SQyAzMDI1MDM2NyA6IEnEjE9cclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ1Y3NcIiwgY2FwdGlvbjogR29yZGljLkNvbnN0cy5EYlNob3J0Y3V0cy51Y3MsIHdpZHRoOiAxMDAgfSk7XHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwibGljXCIsIGNhcHRpb246IFwianJlczozMDI1MDM2MVwiLCB3aWR0aDogNjAgfSk7IC8vUkMgMzAyNTAzNjEgOiBMaWNcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29sdW1ucztcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSHJvbWFkbmUgb3BlcmFjZSBzIG9iZG9iaW1cclxuICAgICAgICAgKiBAcGFyYW0gb3BlcmFjZVxyXG4gICAgICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBQcm92ZWRIcm9tYWRuZUFrY2Uob3BlcmFjZTogR29yZGljLkludS5JbnRlcmZhY2UuR0VPcGVyYWNlU09iZG9iaW0pOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZpbHRlciA9IHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbCgnZ2V0Q3VycmVudERhdGEnKSBhcyBhbnk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgaG9kbm90YTEgPSBmaWx0ZXIgIT0gbnVsbCAmJiB0eXBlb2YgZmlsdGVyLm9iZG9iaU9kICE9PSBcInVuZGVmaW5lZFwiICYmIGZpbHRlci5vYmRvYmlPZCEgIT0gbnVsbCA/IGZpbHRlciEub2Jkb2JpT2QgOiBudWxsO1xyXG4gICAgICAgICAgICB2YXIgaG9kbm90YTIgPSBmaWx0ZXIgIT0gbnVsbCAmJiB0eXBlb2YgZmlsdGVyLm9iZG9iaURvICE9PSBcInVuZGVmaW5lZFwiICYmIGZpbHRlci5vYmRvYmlEbyEgIT0gbnVsbCA/IGZpbHRlciEub2Jkb2JpRG8gOiBudWxsO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGhvZG5vdGExID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBob2Rub3RhMiA9PT0gXCJ1bmRlZmluZWRcIiB8fCBob2Rub3RhMSA9PT0gbnVsbCB8fCBob2Rub3RhMiA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAvLyAgICB0aGF0LmRpYWxvZ3Mud2FybmluZyhcImpyZXM6MzAyNTAzNjRcIiAvL1JDIDMwMjUwMzY0IDogVmFyb3bDoW7DrVxyXG4gICAgICAgICAgICAvLyAgICAgICAgLCBcImpyZXM6MzAyNTAzNjNcIik7IC8vUkMgMzAyNTAzNjMgOiBNdXPDrSBiw710IHphZMOhbm8gamVkbm96bmHEjW7DqSBvYmRvYsOtIHBybyBwcm92ZWRlbsOtIGFrY2VcclxuICAgICAgICAgICAgLy8gICAgcmV0dXJuIGRlZi5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaG9kbm90YTEgIT09IGhvZG5vdGEyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Mud2FybmluZyhcImpyZXM6MzAyNTAzNjRcIiAvL1JDIDMwMjUwMzY0IDogVmFyb3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICwgXCJqcmVzOjMwMjUwMzYzXCIpOyAvL1JDIDMwMjUwMzYzIDogTXVzw60gYsO9dCB6YWTDoW5vIGplZG5vem5hxI1uw6kgb2Jkb2LDrSBwcm8gcHJvdmVkZW7DrSBha2NlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlamVjdCgpLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGZvcm1QYXJhbXM6IEdvcmRpYy5Gb3Jtcy5Gb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtRGV0YWlsT2Jkb2JpXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJlZmFicy5TZWxlY3QucmVwb3J0cyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVwb3J0c09wdGlvbnM6ICgpID0+IHsgcmV0dXJuIHRoaXMudnlzdHVwQWN0LmdldFJlcG9ydFRyZWVDb250cm9sUGFyYW1zKCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcG9ydHNPcHRpb25zOiB7IFRlbWE6XCJpbnVfcHRtX2ludWtjaGRcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIldyaWRcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLldyaWQ9dmFsdWUucmVwb3J0SWQsbW9kZWwuUmVwb3J0SW5mby5yZXBvcnRJbmZvLm5hemV2PT52YWx1ZS5uYW1lLG1vZGVsLlJlcG9ydEluZm8ucmVwb3J0SW5mby5pZFNlcz0+dmFsdWUuaWRTZXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaWN0OiB0cnVlLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsT3B0aW9uczogeyB2ZXJpZmljYXRpb25OZWVkZWQ6IHRydWUgfSwgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgdikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmICh2LnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoaXMuZmluZEZpZWxkcyhcIk91dHB1dFN0eWxlTmFtZSxlbGVtZW50cyxpeHNfbXNrX3V6aVwiKS5nZmllbGQoXCJlbmFibGVcIikuZ3NlbGVjdGJveChcImNsZWFyQ2xpZW50Q2FjaGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoaXMuc2V0T3V0cHV0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdi52YWx1ZS5tZXRhID8gdi52YWx1ZS5tZXRhIDogR29yZGljLlJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydFRyZWVDb250cm9sVFMuVG9JR1ByaW50QWN0aW9uUmVwb3J0SW5mbyh2LnZhbHVlKSFcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vdGhpcy5wb3phZGF2ZWsuV3JpZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vdGhpcy5wb3phZGF2ZWsuT3V0cHV0U3R5bGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvL3RoaXMucG96YWRhdmVrLk91dHB1dFN0eWxlTmFtZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGRlbGV0ZSB0aGlzLnBvemFkYXZlay5SZXBvcnRJbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBkZWxldGUgdGhpcy5wb3phZGF2ZWsuT3V0cHV0U3R5bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGRlbGV0ZSB0aGlzLnBvemFkYXZlay5lbGVtZW50cztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoaXMuZmluZEZpZWxkcyhcIk91dHB1dFN0eWxlTmFtZSxlbGVtZW50cyxpeHNfbXNrX3V6aVwiKS5nZmllbGQoXCJjbGVhclwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLnVwZGF0ZUFjdGlvbnNTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAvLyBrb250cm9sYSwgemRhIHNlIG1hIHpvYnJheml0IHZ5YmVyIHNlc3RhdlxyXG4gICAgICAgICAgICBpZiAodGhhdC5nZXRBZ2VuZGEoKSA9PSBHb3JkaWMuSW51LkludGVyZmFjZS5HRUludUFnZW5kYS5VQ1QpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhhdC5nbG9iYWxzLkdsb2JhbG5pX1BhcmFtZXRyeS5Qb3ZvbGVuaUtvbnRyb2xuaWhvQ2hvZHVQcmlVemF2ZXJreU1lc2ljZVVDVClcclxuICAgICAgICAgICAgICAgICAgICBmb3JtUGFyYW1zID0gdW5kZWZpbmVkIGFzIGFueTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoYXQuZ2xvYmFscy5HbG9iYWxuaV9QYXJhbWV0cnkuUG92b2xlbmlLb250cm9sbmlob0Nob2R1UHJpVXphdmVya3lNZXNpY2VST1opXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybVBhcmFtcyA9IHVuZGVmaW5lZCBhcyBhbnk7XHJcbiAgICAgICAgICAgIHZhciBqbWVub0FrY2UgPSBcImpyZXM6MzAyNTA0MjJcIjsgLy9SQyAzMDI1MDQyMiA6IFV6YXbFmWVuw60gb2Jkb2LDrVxyXG4gICAgICAgICAgICB2YXIgdGl0bGUgPSBcImpyZXM6MzAyNTA0MjRcIjsgLy9SQyAzMDI1MDQyNCA6IFV6YXbFmcOtdCBvYmRvYsOtXHJcbiAgICAgICAgICAgIGlmIChvcGVyYWNlID09IEludGVyZmFjZS5HRU9wZXJhY2VTT2Jkb2JpbS5PdGV2cmVuaU9iZG9iaSkge1xyXG4gICAgICAgICAgICAgICAgZm9ybVBhcmFtcyA9IHVuZGVmaW5lZCBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICBqbWVub0FrY2UgPSBcImpyZXM6MzAyNTA0MjNcIjsgLy9SQyAzMDI1MDQyMyA6IE90ZXbFmWVuw60gb2Jkb2LDrVxyXG4gICAgICAgICAgICAgICAgdGl0bGUgPSBcImpyZXM6MzAyNTA0MjVcIjsgLy9SQyAzMDI1MDQyNSA6IE90ZXbFmcOtdCBvYmRvYsOtXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZTxHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNPcHRpb25zPEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVPYmRvYmlWeWFicmFuZUR0bz4+KEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc0NvbnRlbnQsIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0aXR1bGVrIHYgYnJlYWRjcnVtYnVcclxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSwgXHJcbiAgICAgICAgICAgICAgICAvLyBmb3Jtw6F0IGdyaWR1XHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiB0aGF0LmNyZWF0ZUNvbHVtbnMoKSxcclxuICAgICAgICAgICAgICAgIC8vIHByaW3DoXJuw60ga2zDrcSNIGRhdCB2IGdyaWR1XHJcbiAgICAgICAgICAgICAgICBrZXlzOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gZGF0YSBwcm8gZ3JpZCAocHJvIHBydm7DrSBrcm9rKVxyXG4gICAgICAgICAgICAgICAgZGF0YTogR29yZGljLklzbC5JbnVPYmRvYmkuc2V6bmFtT2Jkb2JpUHJvQWtjZSh7IHR5cEFnOiB0aGF0LmdldEFnZW5kYSgpLCBha2NlOiBvcGVyYWNlLCBvYmRvYmk6IGhvZG5vdGExIH0pLmdldERhdGEoKSxcclxuICAgICAgICAgICAgICAgIC8vIHR5cCBpbmRpa8OhdG9yxa8gbmFkIGdyaWRlbSAoS1BJIG5lYm8gYmFkZ2UpXHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JUeXBlOiBcIktQSVwiLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIHBydm7DrSBrcm9rIC0gemFkw6Fuw60gcGFyYW1ldHLFryBhIGtvbnRyb2xhLCBwxZlpIHDFmWVjaG9kdSBuYSBkYWzFocOtIGtyb2sgc2UgemF2b2zDoSBzcHXFoXTEm27DrSB2bGFzdG7DrSBvcGVyYWNlXHJcbiAgICAgICAgICAgICAgICBmaXJzdFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuw6F6ZXYga3Jva3VcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwNDE3XCIsIC8vUkMgMzAyNTA0MTcgOiBaYWTDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBvcGlzIG9wZXJhY2VcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogam1lbm9Ba2NlLCBcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYWQgZ3JpZGVtIHpvYnJheml0IEtQSS9iYWRnZSBzIHBvxI10eSB6w6F6bmFtxa9cclxuICAgICAgICAgICAgICAgICAgICBzaG93SW5kaWNhdG9yOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvcm11bMOhxZkgcyBwYXJhbWV0cnlcclxuICAgICAgICAgICAgICAgICAgICBmb3JtOiBmb3JtUGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG1vZGVsIHBybyBwYXJhbWV0cnlcclxuICAgICAgICAgICAgICAgICAgICAvL21vZGVsRGF0YTogbW9kZWxEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hZHBpcyB0YWJ1IHMgcGFyYW1ldHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgLy9mb3JtVGFiVGl0bGU6IFwiUGFyYW1ldHJ5IHN0b3JuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hZHBpcyB0YWJ1IHMgZ3JpZGVtXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcImpyZXM6MzAyNTAzNTlcIiwgLy9SQyAzMDI1MDM1OSA6IE9iZG9iw60ga2UgenByYWNvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gb2JzbHVoYSB6bcSbbnkgcGFyYW1ldHJ1XHJcbiAgICAgICAgICAgICAgICAgICAgLy9maWVsZENoYW5nZURlbGVnYXRlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9wcmVDaGVja0FjdGlvbjogKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4gZGVmLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWtjZSBwcm8gc3B1c3Rlbmkga29udHJvbHUgdXppdmF0ZWxlbVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG7DoXpldiBha2NlLCBrdGVyw6EgcHJvdmVkZSBwb8W+YWRvdmFub3Ugb3BlcmFjaSAodGxhxI3DrXRrbyB2cHJhdm8gZG9sZSlcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uTmFtZTogdGl0bGUsIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG1ldG9kYSB2b2xhbsOhIHDFmWkgcMWZZWNob2R1IG5hIGRhbMWhw60ga3JvayAocHJvdmVkZW7DrSB2bGFzdG7DrSBvcGVyYWNlKSAocHJhY3VqZSBuYWQgZGF0eSB6ZSB2c3R1cHUsIHZyYWPDrSBha3R1w6FsbsOtIGRhdGEgeiBkYXRhYsOhemUgKyB2w71zbGVkZWsgb3BlcmFjZSlcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlZmZlciA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXBvcnRJRCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKG1vZGVsLldyaWQpICE9IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBvcnRJRCA9IG1vZGVsLldyaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKG9wZXJhY2UgPT09IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFT3BlcmFjZVNPYmRvYmltLlV6YXZyZW5pT2Jkb2JpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwNDE2XCIpOyAvL1JDIDMwMjUwNDE2IDogUHJvYsOtaMOhIHV6YXbFmWVuw61cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXNrID0gR29yZGljLkFzeW5jLkdUYXNrTWFuYWdlci5zdGFydDxHb3JkaWMuQXN5bmMuSUdUYXNrUHJvZ3Jlc3MsIGFueT4oXCJHb3JkaWMuSW51LlNlcnZlci5HSW51SHJvbWFkbmVPcGVyYWNlQXN5bmNcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlem5hbTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXBvcnRJRDogcmVwb3J0SUQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3BlcmFjZTogb3BlcmFjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUeXBBZzogdGhhdC5nZXRBZ2VuZGEoKSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzczogMCwgdG90YWw6IDEwMCwgdGV4dDogXCJqcmVzOjMwMjUwNDIwXCIuZm9ybWF0KGptZW5vQWtjZS50b0xvd2VyQ2FzZSgpKSwgLy9SQyAzMDI1MDQyMCA6IFN0YXJ0IHswfSBvYmRvYsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsQWN0aW9uOiBuZXcgR0FjdGlvbih7IGNhcHRpb246IFwianJlczozMDI1MDMzMlwiLCBydW46ICgpID0+IHsgdGFzay5jYW5jZWwoKSB9LCBuYW1lOiBcImNhbmNlbEFjdFwiIH0pIC8vUkMgMzAyNTAzMzIgOiBTdG9ybm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOyAvL1JDIDMwMjUwMzMyIDogU3Rvcm5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrLmdldFByb21pc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmZlci5yZXNvbHZlKHJlc3VsdC5yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiByZXN1bHQgYXMgYW55O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5wcm9ncmVzcygoYTogeyBwcm9ncmVzcz86IEdvcmRpYy5Bc3luYy5JR1Rhc2tQcm9ncmVzcyB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhLnByb2dyZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcm9ncmVzc09wZXJhdGlvbih7IHByb2dyZXNzOiBhLnByb2dyZXNzLmN1cnJlbnQsIHRvdGFsOiBhLnByb2dyZXNzLnRvdGFsLCB0ZXh0OiBhLnByb2dyZXNzLnRleHQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHsgdGhhdC5lbmRPcGVyYXRpb24oKSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHsgZGVmZmVyLnJlamVjdCgpIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Vsc2UgaWYgKG9wZXJhY2UgPT09IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFT3BlcmFjZVNPYmRvYmltLk90ZXZyZW5pT2Jkb2JpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTA0MTZcIik7IC8vUkMgMzAyNTA0MTYgOiBQcm9iw61ow6EgdXphdsWZZW7DrVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFyIHRhc2sgPSBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLnN0YXJ0PEdvcmRpYy5Bc3luYy5JR1Rhc2tQcm9ncmVzcywgYW55PihcIkdvcmRpYy5JbnUuU2VydmVyLkdJbnVPdGV2cmVuaUFzeW5jXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIFNlem5hbTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIFJlcG9ydElEOiByZXBvcnRJRCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIFR5cEFnOiB0aGF0LmdldEFnZW5kYSgpLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgcHJvZ3Jlc3M6IDAsIHRvdGFsOiAxMDAsIHRleHQ6IFwianJlczozMDI1MDQyMVwiLCAvL1JDIDMwMjUwNDIxIDogU3RhcnQgb3RldsWZZW7DrSBvYmRvYsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBjYW5jZWxBY3Rpb246IG5ldyBHQWN0aW9uKHsgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzMyXCIsIHJ1bjogKCkgPT4geyB0YXNrLmNhbmNlbCgpIH0sIG5hbWU6IFwiY2FuY2VsQWN0XCIgfSkgLy9SQyAzMDI1MDMzMiA6IFN0b3Jub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9KTsgLy9SQyAzMDI1MDMzMiA6IFN0b3Jub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0YXNrLmdldFByb21pc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiBkZWZmZXIucmVzb2x2ZShyZXN1bHQucmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvL3JldHVybiByZXN1bHQgYXMgYW55O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH0pLnByb2dyZXNzKChhOiB7IHByb2dyZXNzPzogR29yZGljLkFzeW5jLklHVGFza1Byb2dyZXNzIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAoYS5wcm9ncmVzcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5wcm9ncmVzc09wZXJhdGlvbih7IHByb2dyZXNzOiBhLnByb2dyZXNzLmN1cnJlbnQsIHRvdGFsOiBhLnByb2dyZXNzLnRvdGFsLCB0ZXh0OiBhLnByb2dyZXNzLnRleHQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9KS5hbHdheXMoKCkgPT4geyB0aGF0LmVuZE9wZXJhdGlvbigpIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAuZmFpbCgoKSA9PiB7IGRlZmZlci5yZWplY3QoKSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL21vZGVsRGF0YSA9IG1vZGVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZmVyLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFrY2UgbmEgdGFidSBzIGdyaWRlbVxyXG4gICAgICAgICAgICAgICAgICAgIC8vbWVudUdyaWRCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vIGRldGFpbFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvL10sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBha2NlIHZvbGFuw6EgbmEgZHZvamtsaWsgdiBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVmYXVsdEFjdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiZGV0YWlsT2Jkb2JpXCIsIGNhcHRpb25WaXNpYmxlOiBcIm5vcm1hbFwiLCB0b29sdGlwOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJEZXRhaWxPYmRvYmlcIiwgcnVuOiAoKSA9PiB7IH1cclxuICAgICAgICAgICAgICAgICAgICAvL30vLyB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGRydWjDvSAocG9zbGVkbsOtKSBrcm9rIC0gem9icmF6ZW7DrSB2w71zbGVka3Ugb3BlcmFjZVxyXG4gICAgICAgICAgICAgICAgbGFzdFN0ZXA6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbsOhemV2IGtyb2t1XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDQxOFwiLCAvL1JDIDMwMjUwNDE4IDogVsO9c2xlZGVrXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBhcmFtZXRyeSBqc291IHYgdG9tdG8ga3Jva3UgamnFviBuZWVkaXRvdmF0ZWxuw6lcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVGb3JtRmllbGRzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYWRwaXMgdGFidSBzIGdyaWRlbVxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJqcmVzOjMwMjUwNDE5XCIsIC8vUkMgMzAyNTA0MTkgOiBacHJhY292YW7DqSBvYmRvYsOtXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIG9ic2x1aGEgw7pzcMSbxaFuw6lobyB1a29uxI1lbsOtIHByxa92b2RjZSAobmEgcm96ZMOtbCBvZCB6cnXFoWVuw60gcHLFr3ZvZGNlIHDFmWVzZWxla3RvdsOhdsOhIHNlem5hbSlcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlRGVsZWdhdGU6ICh2aWV3KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIG9ic2x1aGEgenJ1xaFlbsOtIHByxa92b2RjZVxyXG4gICAgICAgICAgICAgICAgY2FuY2VsRGVsZWdhdGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoY29udGVudCwgcGFyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5SZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT3BlcmFjZSBzIG9iZG9iaW1cclxuICAgICAgICAgKiBAcGFyYW0gb3BlcmFjZVxyXG4gICAgICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBQcm92ZWRBa2NlKG9wZXJhY2U6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFT3BlcmFjZVNPYmRvYmltLCBkYXRhPzogR29yZGljLkludS5JbnRlcmZhY2UuR0ludU9iZG9iaUR0byk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgdmFyIGRlZiAgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIG9iZG9iaSA9IFwianJlczozMDI1MDM1MVwiOyAvL1JDIDMwMjUwMzUxIDogb2Jkb2LDrSDDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgaWYgKHRoYXQuZ2V0QWdlbmRhKCkgPT0gSW50ZXJmYWNlLkdFSW51QWdlbmRhLlJPWilcclxuICAgICAgICAgICAgICAgIG9iZG9iaSA9IFwianJlczozMDI1MDM1MlwiOyAvL1JDIDMwMjUwMzUyIDogb2Jkb2LDrSByb3pwb8SNdHVcclxuXHJcbiAgICAgICAgICAgIGlmICgodGhpcy5zZWxlY3RlZFJvdyA9PSBudWxsIHx8IHRoYXQuTWVzaWNlRGF0YS5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgICAgICAmJiBvcGVyYWNlICE9PSBHb3JkaWMuSW51LkludGVyZmFjZS5HRU9wZXJhY2VTT2Jkb2JpbS5PdGV2cmVuaU9iZG9iaVxyXG4gICAgICAgICAgICAgICAgLy8mJiBvcGVyYWNlICE9PSBHb3JkaWMuSW51LkludGVyZmFjZS5HRU9wZXJhY2VTT2Jkb2JpbS5Ba3R1YWxpemFjZVN0YXZ1XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVqZWN0KFwiXCIpO1xyXG4gICAgICAgICAgICBpZiAoIWRhdGEpXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5zZWxlY3RlZFJvdyE7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGl0bGUgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZiAob3BlcmFjZSA9PSBHb3JkaWMuSW51LkludGVyZmFjZS5HRU9wZXJhY2VTT2Jkb2JpbS5PdGV2cmVuaU9iZG9iaSlcclxuICAgICAgICAgICAgICAgIHRpdGxlID0gXCJqcmVzOjMwMjUwMzQxXCIuZm9ybWF0KG9iZG9iaSk7IC8vUkMgMzAyNTAzNDEgOiBOb3bDqSB7MH1cclxuICAgICAgICAgICAgZWxzZSBpZiAob3BlcmFjZSA9PSBHb3JkaWMuSW51LkludGVyZmFjZS5HRU9wZXJhY2VTT2Jkb2JpbS5VemF2cmVuaU9iZG9iaSlcclxuICAgICAgICAgICAgICAgIHRpdGxlID0gXCJqcmVzOjMwMjUwMzQyXCIuZm9ybWF0KG9iZG9iaSk7IC8vUkMgMzAyNTAzNDIgOiBVemF2xZllbsOtIHswfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChvcGVyYWNlID09IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFT3BlcmFjZVNPYmRvYmltLlpwZXRuZU90ZXZyaXRVemF2cmVuaU9iZG9iaSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LlpwZXRuZU90ZXZyaXQoZGF0YSk7XHJcbiAgICAgICAgICAgIC8vdGl0bGUgPSBcImpyZXM6MzAyNTAzNTRcIi5mb3JtYXQob2Jkb2JpKTsgLy9SQyAzMDI1MDM1NCA6IFpub3Z1b3RldsWZZW7DrSB1emF2xZllbsOpaG8gezB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9wZXJhY2UgPT0gR29yZGljLkludS5JbnRlcmZhY2UuR0VPcGVyYWNlU09iZG9iaW0uRGV0YWlsT2Jkb2JpKVxyXG4gICAgICAgICAgICAgICAgdGl0bGUgPSBcImpyZXM6MzAyNTAzNTNcIi5mb3JtYXQob2Jkb2JpKTsgLy9SQyAzMDI1MDM1MyA6IERldGFpbCB7MH1cclxuXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9wZXJhY2UgPT0gR29yZGljLkludS5JbnRlcmZhY2UuR0VPcGVyYWNlU09iZG9iaW0uQWt0dWFsaXphY2VTdGF2dSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5Ba3R1YWxpemFjZVN0YXZ1KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9wZXJhY2UgPT0gR29yZGljLkludS5JbnRlcmZhY2UuR0VPcGVyYWNlU09iZG9iaW0uQWt0dWFsaXphY2VPYmRvYmkpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuQWt0dWFsaXphdmF0TWVzaWMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChvcGVyYWNlID09IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFT3BlcmFjZVNPYmRvYmltLlByZWRhdEtlU2NodmFsZW5pKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuUHJlZGF0S2VTY2h2YWxlbmkoZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAob3BlcmFjZSA9PSBHb3JkaWMuSW51LkludGVyZmFjZS5HRU9wZXJhY2VTT2Jkb2JpbS5TY2h2YWxpdFV6YXZlcmt1KSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LlNjaHZhbGl0KGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9wZXJhY2UgPT0gR29yZGljLkludS5JbnRlcmZhY2UuR0VPcGVyYWNlU09iZG9iaW0uWnJ1c2l0UHJlZGF0S2VTY2h2YWxlbmkpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuT2RTY2h2YWxpdChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3BlcmFjZSA9PSBHb3JkaWMuSW51LkludGVyZmFjZS5HRU9wZXJhY2VTT2Jkb2JpbS5TdGF2S29udHJvbHkpIHtcclxuICAgICAgICAgICAgICAgIC8vIHpvYnJhemVuaSBmb3JtdWxhcmUgc3RhdnUga29udHJvbHlcclxuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGUoXCJHb3JkaWMuSW51LldlYkNsaWVudC5HS29udHJvbGFPYmRvYmlcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIE1lc2ljOiBkYXRhLm1lc2ljLCBVY3M6IGRhdGEudWNzLCBNZXNpY1R4dDogdGhhdC5nZXRNb250TmFtZShkYXRhLm1lc2ljIGFzIG51bWJlciksIFN0YXZPYmRvYmk6IGRhdGEuYWt0X29iZFxyXG4gICAgICAgICAgICAgICAgICAgICwgTG9rYWxpdGE6IGRhdGEubGljXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3BlcmFjZSA9PSBHb3JkaWMuSW51LkludGVyZmFjZS5HRU9wZXJhY2VTT2Jkb2JpbS5CbG9rYWNuaU9rcnVoeSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LkJsb2thY25pT2tydWh5KGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coR29yZGljLkludS5XZWJDbGllbnQuR0RldGFpbE9iZG9iaSwge1xyXG4gICAgICAgICAgICAgICAgcm9rOiB0aGlzLkdsb2JhbFBhcmFtcy5Fa29QYXJhbXM/LlJPSywgYWdlbmRhOiB0aGF0LmdldEFnZW5kYSgpLCBpY286IHRoaXMuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uSUNPLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSwgb3BlcmFjZTogb3BlcmFjZSwgZ2xvYmFsUGFyYW1zOiB0aGlzLkdsb2JhbFBhcmFtc1xyXG4gICAgICAgICAgICB9LCB0aXRsZSwgNTAwLCAzNTAsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAocmVzOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnJldHVyblZhbHVlICYmIHJlcy5yZXR1cm5WYWx1ZS5jYW5jZWwgIT09IHRydWUgJiYgcmVzLnJldHVyblZhbHVlLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhY2UgPT0gR29yZGljLkludS5JbnRlcmZhY2UuR0VPcGVyYWNlU09iZG9iaW0uT3RldnJlbmlPYmRvYmkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk90ZXZyaXRNZXNpYyhyZXMucmV0dXJuVmFsdWUuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob3BlcmFjZSA9PSBJbnRlcmZhY2UuR0VPcGVyYWNlU09iZG9iaW0uVXphdnJlbmlPYmRvYmkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlV6YXZyaXRNZXNpYyhyZXMucmV0dXJuVmFsdWUuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuaSBibG9rYWNuaWNoIG9rcnVodVxyXG4gICAgICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBCbG9rYWNuaU9rcnVoeShkYXRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HSW51T2Jkb2JpRHRvKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICBHb3JkaWMuSXNsLkludUJsb2thY25pT2tydWh5Lmxpc3QoeyB1Y3M6IGRhdGEudWNzIGFzIHN0cmluZywgbWVzaWM6IGRhdGEubWVzaWMgYXMgbnVtYmVyIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhHb3JkaWMuSW51LldlYkNsaWVudC5HQmxva2FjbmlPa3J1aHksIHsgZGF0YTogcmVzdWx0LCBtZXNpYzogZGF0YS5tZXNpYyB9LCBcImpyZXM6MzAyNTAzODdcIiwgODAwLCA2MDAsIHRydWUpIC8vUkMgMzAyNTAzODcgOiBCbG9rYcSNbsOtIG9rcnVoeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAocmVzOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMucmV0dXJuVmFsdWUucmVzdWx0ID09IFwiUkVGUkVTSFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuUmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJlcG9jZXQgY2Vsa292eWNoIG5lcHJlcG9jdGVueWNoIHplcGlzdVxyXG4gICAgICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBQcmVwb2NldE5lcHJlcG9jdGVubyhkYXRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HSW51T2Jkb2JpRHRvW10pOnZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAocmFkZWspIHtcclxuICAgICAgICAgICAgICAgIHJhZGVrID0gdGhhdC5OYXBsbk9iZG9iaShyYWRlayk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNlbGtlbV9uZXByZXBvY3Rlbm8gPSB0aGF0LmNlbGtlbV9uZXByZXBvY3Rlbm8gKyByYWRlay5wb2NldF96YXBpc3VfbmVwcmVwb2N0ZW5vITtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuTWVzaWNlRGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIHRoYXQuRGF0YVZpZXcudXBkYXRlRGF0YSh0aGF0Lk1lc2ljZURhdGEpO1xyXG4gICAgICAgICAgICAvL3RoYXQuRGF0YVZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyh0aGF0Lk1lc2ljZURhdGEsIHsga2V5OiBcInJvayxsaWMsaWNvLHVjcyxtZXNpY1wiIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgWm5vdnVuYWN0ZW5pIGRhdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgUmVsb2FkKGZpbHRlcj8pOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnNlbGVjdGVkUm93ID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmVsZW0gPT09IFwidW5kZWZpbmVkXCIgfHwgdGhpcy5lbGVtID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuUHJlcG9jZXROZXByZXBvY3Rlbm8odGhhdC5tb2RlbCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LkRhdGFWaWV3LnVwZGF0ZURhdGEodGhhdC5NZXNpY2VEYXRhKTtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gdGhhdC5HZXRSb3pzYWhPYmRvYmkoKTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5maW5kRmllbGRzKFwib2Jkb2JpT2Qsb2Jkb2JpRG9cIikuZ2ZpZWxkKFwib3B0aW9uXCIsXCJcIilcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcyhcIm9iZG9iaU9kLG9iZG9iaURvXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRhdGFcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAvL3RoYXQuRGF0YVZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyh0aGF0Lk1lc2ljZURhdGEsIHsga2V5OiBcInJvayxsaWMsaWNvLHVjcyxtZXNpY1wiIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gbmFjdGVuaSBkYXQgeiBkYlxyXG4gICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAwMDRcIik7IC8vUkMgMzAyNTAwMDQgOiBOYcSNw610w6FtLi4uXHJcbiAgICAgICAgICAgICAgICBsZXQgdWNzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGxldCBvYmRvYmlPZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2Jkb2JpRG8gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgbGV0IG90ZXZyZW5lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXphdnJlbmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmICghZmlsdGVyKVxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlciA9IHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbCgnZ2V0Q3VycmVudERhdGEnKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIudWNzIT1udWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1Y3MgPSBmaWx0ZXIudWNzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIub2Jkb2JpT2QgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2Jkb2JpT2QgPSBmaWx0ZXIub2Jkb2JpT2Q7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci5vYmRvYmlEbyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmRvYmlEbyA9IGZpbHRlci5vYmRvYmlEbztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLm90ZXZyZW5lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdGV2cmVuZSA9IGZpbHRlci5vdGV2cmVuZTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG90ZXZyZW5lID0gbnVsbCBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci51emF2cmVuZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXphdnJlbmUgPSBmaWx0ZXIudXphdnJlbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1emF2cmVuZSA9IG51bGwgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuSW51T2Jkb2JpLnNlem5hbSh7IHR5cEFnOiB0aGF0LmdldEFnZW5kYSgpLCB1Y3M6IHVjcyBhcyBhbnksIG9iZG9iaU9kOiBvYmRvYmlPZCBhcyBhbnksIG9iZG9iaURvOiBvYmRvYmlEbyBhcyBhbnksIG9iZG9iaU90ZXZyZW5lOiBvdGV2cmVuZSBhcyBhbnksIG9iZG9iaVV6YXZyZW5lOiB1emF2cmVuZSBhcyBhbnl9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIG5lcHJlcG9jdGVueWNoIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlByZXBvY2V0TmVwcmVwb2N0ZW5vKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0Lk1lc2ljZURhdGEgPSByZXN1bHQuZGF0YTtcclxuLy9YWFggSkkgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW0uZ2NhcmRwYW5lbChcIm9wdGlvblwiLCB7IGRhdGE6IHRoYXQuRGF0YVZpZXcgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuRGF0YVZpZXcudXBkYXRlRGF0YShyZXN1bHQuZGF0YSwgXCJ1cGRhdGVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuSXNsLkludU9iZG9iaS5wb3V6aXRlT2Jkb2JpKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJvenNhaCkgPT4geyB0aGF0LmZpbmRGaWVsZHMoXCJvYmRvYmlPZCxvYmRvYmlEb1wiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkYXRhXCIsIHJvenNhaCk7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIGRhdGEgPSB0aGF0LkdldFJvenNhaE9iZG9iaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZmluZEZpZWxkcyhcIm9iZG9iaU9kLG9iZG9iaURvXCIpLmdmaWVsZChcIm9wdGlvblwiLFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpOyBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG1ldG9kYSBwcm8gZG9wbG7Em27DrSBEVG8gb2Jkb2JpIHBybyB6b2JyYXplbsOtXHJcbiAgICAgICAgcHJpdmF0ZSBOYXBsbk9iZG9iaShkYXRhX29iZG9iaTogR29yZGljLkludS5JbnRlcmZhY2UuR0ludU9iZG9iaUR0byk6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVPYmRvYmlEdG8ge1xyXG5cclxuICAgICAgICAgICAgLy9kYXRhX29iZG9iaS5kYXRfaW5wX3R4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIC8vaWYgKGRhdGFfaXNwLmRhdF9pbnAgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAvLyAgICBkYXRhX2lzcC5kYXRfaW5wX3R4dCA9ICcoJyArIEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5kYXRldGltZShkYXRhX2lzcC5kYXRfaW5wLCBcImRkLk1NLnl5eXlcIikgKyAnKSc7XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgZGF0YV9vYmRvYmkuc2wxID0gKGRhdGFfb2Jkb2JpLmFrdF9vYmQgPT0gSW50ZXJmYWNlLkdFQWt0aXZpdGFPYmRvYmkuT3RldnJlbmUgPyAnZmEtcGVuY2lsJyA6ICdmYS1iYW4nKTtcclxuICAgICAgICAgICAgZGF0YV9vYmRvYmkuYmFydmFfdHh0ID0gKGRhdGFfb2Jkb2JpLmFrdF9vYmQgPT0gSW50ZXJmYWNlLkdFQWt0aXZpdGFPYmRvYmkuT3RldnJlbmUgPyAnU2VhR3JlZW4nIDogJ0luZGlhblJlZCcpO1xyXG5cclxuICAgICAgICAgICAgZGF0YV9vYmRvYmkuYWt0aXZpdGFfdHh0ID0gJ2pyZXM6MzAyNTAwODQnOyAgLy9SQyAzMDI1MDA4NCA6IE90ZXbFmWVub1xyXG4gICAgICAgICAgICBpZiAoZGF0YV9vYmRvYmkuYWt0X29iZCA9PT0gSW50ZXJmYWNlLkdFQWt0aXZpdGFPYmRvYmkuVXphdnJlbmUpIHtcclxuLy8gICAgICAgICAgICAgICAgaWYgKGRhdGFfb2Jkb2JpLnN0YXYgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICBkYXRhX29iZG9iaS5ha3Rpdml0YV90eHQgPSAnanJlczozMDI1MDA4NSc7IC8vUkMgMzAyNTAwODUgOiBVemF2xZllbm9cclxuICAgICAgICAgICAgLy8gICAgZWxzZSBpZiAoZGF0YV9vYmRvYmkuc3RhdiA9PSAyKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgZGF0YV9vYmRvYmkuYWt0aXZpdGFfdHh0ID0gJ2pyZXM6MzAyNTAzNzEnOyAvL1JDIDMwMjUwMzcxIDogS29udHJvbGFcclxuICAgICAgICAgICAgLy8gICAgZWxzZVxyXG4gICAgICAgICAgICAvLyAgICAgICAgZGF0YV9vYmRvYmkuYWt0aXZpdGFfdHh0ID0gJ2pyZXM6MzAyNTAzNzInOyAvL1JDIDMwMjUwMzcyIDogU2NodsOhbGVub1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdldEFnZW5kYSgpID09IEludGVyZmFjZS5HRUludUFnZW5kYS5VQ1QpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YV9vYmRvYmkuYmxvayAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkYXRhX29iZG9iaS5ibG9rICE9PSBudWxsICYmIGRhdGFfb2Jkb2JpLmJsb2sgPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFfb2Jkb2JpLmFrdGl2aXRhX3R4dCArPSBcIiBbXCIrXCJqcmVzOjMwMjUwMzg5XCIrXCJdXCI7IC8vUkMgMzAyNTAzODkgOiBCbG9rb3bDoW5vXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRhdGFfb2Jkb2JpLmFrdGl2aXRhX2NvbG9yID0gKGRhdGFfb2Jkb2JpLmFrdF9vYmQgPT0gSW50ZXJmYWNlLkdFQWt0aXZpdGFPYmRvYmkuT3RldnJlbmUgPyAnZ3JlZW4nIDogJ3JlZCcpO1xyXG5cclxuICAgICAgICAgICAgZGF0YV9vYmRvYmkuYWt0dWFsbmlfc3RhdnlfaWtvbmEgPSAoZGF0YV9vYmRvYmkucG9jZXRfemFwaXN1X25lcHJlcG9jdGVubyA9PSAwID8gJycgOiAnZmEtbWFnaWMnKTtcclxuXHJcbiAgICAgICAgICAgIGRhdGFfb2Jkb2JpLnBvY2V0X3phcGlzdV9jZWxrZW1fdHh0ID0gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcihkYXRhX29iZG9iaS5wb2NldF96YXBpc3VfY2Vsa2VtISwgXCJOXCIpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGRhdGFfb2Jkb2JpLnBvY2V0X3phcGlzdV9uZXByZXBvY3Rlbm9fdHh0ID0gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcihkYXRhX29iZG9iaS5wb2NldF96YXBpc3VfbmVwcmVwb2N0ZW5vISwgXCJOXCIpLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICBkYXRhX29iZG9iaS5tZXNpY190eHQgPSB0aGlzLmdldE1vbnROYW1lKGRhdGFfb2Jkb2JpLm1lc2ljIGFzIG51bWJlcik7XHJcbiAgICAgICAgICAgICAgICAvL1tcImpyZXM6MzAyNTAzOTBcIiwgLy9SQyAzMDI1MDM5MCA6IExlZGVuXHJcbiAgICAgICAgICAgICAgICAvL1wianJlczozMDI1MDM5MVwiLCAvL1JDIDMwMjUwMzkxIDogw5pub3JcclxuICAgICAgICAgICAgICAgIC8vXCJqcmVzOjMwMjUwMzkyXCIsIC8vUkMgMzAyNTAzOTIgOiBCxZllemVuXHJcbiAgICAgICAgICAgICAgICAvL1wianJlczozMDI1MDQwMlwiLCAvL1JDIDMwMjUwNDAyIDogRHViZW5cclxuICAgICAgICAgICAgICAgIC8vXCJqcmVzOjMwMjUwNDAxXCIsIC8vUkMgMzAyNTA0MDEgOiBLdsSbdGVuXHJcbiAgICAgICAgICAgICAgICAvL1wianJlczozMDI1MDQwMFwiLCAvL1JDIDMwMjUwNDAwIDogxIxlcnZlblxyXG4gICAgICAgICAgICAgICAgLy9cImpyZXM6MzAyNTAzOTlcIiwgLy9SQyAzMDI1MDM5OSA6IMSMZXJ2ZW5lY1xyXG4gICAgICAgICAgICAgICAgLy9cImpyZXM6MzAyNTAzOThcIiwgLy9SQyAzMDI1MDM5OCA6IFNycGVuXHJcbiAgICAgICAgICAgICAgICAvL1wianJlczozMDI1MDM5N1wiLCAvL1JDIDMwMjUwMzk3IDogWsOhxZnDrVxyXG4gICAgICAgICAgICAgICAgLy9cImpyZXM6MzAyNTAzOTZcIiwgLy9SQyAzMDI1MDM5NiA6IMWYw61qZW5cclxuICAgICAgICAgICAgICAgIC8vXCJqcmVzOjMwMjUwMzk1XCIsIC8vUkMgMzAyNTAzOTUgOiBMaXN0b3BhZFxyXG4gICAgICAgICAgICAgICAgLy9cImpyZXM6MzAyNTAzOTRcIiwgLy9SQyAzMDI1MDM5NCA6IFByb3NpbmVjXHJcbiAgICAgICAgICAgICAgICAvL1wianJlczozMDI1MDM5M1wiLCAvL1JDIDMwMjUwMzkzIDogVXrDoXbEm3JrYVxyXG4gICAgICAgICAgICAgICAgLy9cIlwiLCBcIlwiXVtkYXRhX29iZG9iaS5tZXNpYyBhcyBudW1iZXIgLSAxXTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhX29iZG9iaVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSm1lbm8gbWVzaWNlXHJcbiAgICAgICAgICogQHBhcmFtIG1lc2ljXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRNb250TmFtZShtZXNpYzogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICAgICByZXR1cm4gIFtcImpyZXM6MzAyNTAzOTBcIiwgLy9SQyAzMDI1MDM5MCA6IExlZGVuXHJcbiAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTAzOTFcIiwgLy9SQyAzMDI1MDM5MSA6IMOabm9yXHJcbiAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTAzOTJcIiwgLy9SQyAzMDI1MDM5MiA6IELFmWV6ZW5cclxuICAgICAgICAgICAgICAgIFwianJlczozMDI1MDQwMlwiLCAvL1JDIDMwMjUwNDAyIDogRHViZW5cclxuICAgICAgICAgICAgICAgIFwianJlczozMDI1MDQwMVwiLCAvL1JDIDMwMjUwNDAxIDogS3bEm3RlblxyXG4gICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwNDAwXCIsIC8vUkMgMzAyNTA0MDAgOiDEjGVydmVuXHJcbiAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTAzOTlcIiwgLy9SQyAzMDI1MDM5OSA6IMSMZXJ2ZW5lY1xyXG4gICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwMzk4XCIsIC8vUkMgMzAyNTAzOTggOiBTcnBlblxyXG4gICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwMzk3XCIsIC8vUkMgMzAyNTAzOTcgOiBaw6HFmcOtXHJcbiAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTAzOTZcIiwgLy9SQyAzMDI1MDM5NiA6IMWYw61qZW5cclxuICAgICAgICAgICAgICAgIFwianJlczozMDI1MDM5NVwiLCAvL1JDIDMwMjUwMzk1IDogTGlzdG9wYWRcclxuICAgICAgICAgICAgICAgIFwianJlczozMDI1MDM5NFwiLCAvL1JDIDMwMjUwMzk0IDogUHJvc2luZWNcclxuICAgICAgICAgICAgICAgIFwianJlczozMDI1MDM5M1wiLCAvL1JDIDMwMjUwMzkzIDogVXrDoXbEm3JrYVxyXG4gICAgICAgICAgICAgICAgXCJcIiwgXCJcIl1bbWVzaWMgLSAxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dWFsaXphY2Ugc3RhdnVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgQWt0dWFsaXphY2VTdGF2dShkYXRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HSW51T2Jkb2JpRHRvKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vdmFyICRjRGl2ID0gJCh0aGlzLmNvbnRlbnREaXYpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmljbyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEudWNzKTtcclxuICAgICAgICAgICAgICAgIHZhciBpX21lc2ljID0gMDtcclxuICAgICAgICAgICAgICAgIHZhciBpX3RleHQgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGlfbWVzaWMgPSAwO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlfdGV4dCA9IFwianJlczozMDI1MDA4NlwiLmZvcm1hdCh0aGlzLmFnZW5kYSk7IC8vUkMgMzAyNTAwODYgOiBBa3R1YWxpemFjZSBzdGF2xa8gezB9XHJcblxyXG4gICAgICAgICAgICB2YXIgdl9kYXRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HUHJlcG9jZXRTdGF2dUR0byA9IHt9O1xyXG4gICAgICAgICAgICB2X2RhdGEuYWdlbmRhID0gdGhhdC5nZXRBZ2VuZGEoKTtcclxuICAgICAgICAgICAgICAgIHZfZGF0YS5vcGVyYWNlID0gXCJBS1RcIjtcclxuICAgICAgICAgICAgICAgIHZfZGF0YS5tZXNpYyA9IGlfbWVzaWM7XHJcbiAgICAgICAgICAgIHZfZGF0YS5pY28gPSBkYXRhLmljbztcclxuICAgICAgICAgICAgdl9kYXRhLnVjcyA9IGRhdGEudWNzO1xyXG4gICAgICAgICAgICB2X2RhdGEubGljID0gZGF0YS5saWM7XHJcbiAgICAgICAgICAgICAgICB2X2RhdGEub19obGFza2EgPSBpX3RleHQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHZfZGF0YS5tZXNpYyEgPiAwKSAmJiAodl9kYXRhLm1lc2ljISA8PSAxMykpIHZfZGF0YS5vX2hsYXNrYSA9IHZfZGF0YS5vX2hsYXNrYSArIFwiIG9kIG3Em3PDrWNlIFwiICsgdl9kYXRhLm1lc2ljO1xyXG5cclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Bc3luYy5HVGFza01hbmFnZXIuaW5pdCh7IGRlbGF5OiAxMDAwMCB9KTsgLy9OT1RFOiBUb3RvIGplIHpkZSBwcm8gdGVzdG92YWNpIHVjZWx5LCB2IGJ1ZG91Y251IGJ1ZGUgayBvZHN0cmFuZW5pXHJcblxyXG4gICAgICAgICAgICAgICAgR29yZGljLkFzeW5jLkdUYXNrTWFuYWdlci5zdGFydChcIkdvcmRpYy5JbnUuU2VydmVyLkdJbnVTdGF2eUFzeW5jXCIsIHZfZGF0YSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpqaXN0ZW5pIGFnZW5keVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRBZ2VuZGEoKTogR29yZGljLkludS5JbnRlcmZhY2UuR0VJbnVBZ2VuZGEge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hZ2VuZGEgPT0gXCJVQ1RcIiA/IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFSW51QWdlbmRhLlVDVCA6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFSW51QWdlbmRhLlJPWlxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgVXphdnJlbmkgbWVzaWNlXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIFV6YXZyaXRNZXNpYyhtZXNpUmFkZWs6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVPYmRvYmlEdG8sIHZzdHVwPzogR29yZGljLkludS5JbnRlcmZhY2UuR0ludU9wZW5DbG9zZVJlcXVlc3REdG8sIGRlZmZlcj86IGFueSk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdnN0dXAgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIGRlZmZlciA9ICQuRGVmZXJyZWQoKTsvLy5wcm9taXNlKCkuYWx3YXlzKCgpID0+IHsgY29udGVudC5lbmRPcGVyYXRpb24oKSB9KTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMDAyXCIpOyAvL1JDIDMwMjUwMDAyIDogUHJvYsOtaMOhIHV6YXbDrXLDoW7DrVxyXG5cclxuICAgICAgICAgICAgICAgIHZzdHVwID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFnZW5kYTogdGhhdC5nZXRBZ2VuZGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICwgbWVzaWM6IG1lc2lSYWRlay5tZXNpY1xyXG4gICAgICAgICAgICAgICAgICAgICwgdWNzOiBtZXNpUmFkZWsudWNzXHJcbiAgICAgICAgICAgICAgICAgICAgLCBsaWM6IG1lc2lSYWRlay5saWNcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZTogZG9jYXNuZSBwcm8gbW96bm9zdCBwcmVrbGFkdSA4NFxyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuSW51T2Jkb2JpLmNsb3NlKHZzdHVwKVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwicmV0XCIsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQhPT1udWxsICYmIHJlc3VsdC5ha3Rfb2JkISA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0PXRoYXQuTmFwbG5PYmRvYmkocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuTWVzaWNlRGF0YSFbcmVzdWx0Lm1lc2ljISAtIDFdID0gcmVzdWx0O1xyXG5cclxuLy9YWFggSkkgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGF0LmVsZW1lbnQpLmZpbmQoXCIuZ2NhcmRwYW5lbFwiKS5nY2FyZHBhbmVsKFwidXBkYXRlRGF0YVwiLCByZXN1bHQgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuRGF0YVZpZXcudXBkYXRlRGF0YShyZXN1bHQsIFwidXBkYXRlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuUmVmcmVzaEFjdGlvbihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJJbmZvcm1hY2VcIiwgXCJqcmVzOjMwMjUwMzU1XCIuZm9ybWF0KHJlc3VsdC5tZXNpYyEsIHJlc3VsdC5yb2shKSwgW0dEbGcubWJiT2tdLCBHRGxnLm1iaVN1Y2Nlc3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuc2hvd0ZsYXNoKFwianJlczozMDI1MDM1NVwiLmZvcm1hdChyZXN1bHQubWVzaWMhLCByZXN1bHQucm9rISksIFwiZy1zdGF0ZS1zdWNjZXNzXCIsIDUwMDAsIFwibXNnRmxhc2hcIik7IC8vUkMgMzAyNTAzNTUgOiBPYmRvYsOtIHswfSB7MX0gYnlsbyB1emF2xZllbm8gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcIkluZm9ybWFjZVwiLCBcImpyZXM6MzAyNTAzNTZcIi5mb3JtYXQocmVzdWx0Lm1lc2ljISwgcmVzdWx0LnJvayEpLCBbR0RsZy5tYmJPa10sIEdEbGcubWJpRXJyb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuc2hvd0ZsYXNoKFwianJlczozMDI1MDM1NlwiLmZvcm1hdChyZXN1bHQubWVzaWMhLCByZXN1bHQucm9rISksIFwiZy1zdGF0ZS1lcnJvclwiLCA1MDAwLCBcIm1zZ0ZsYXNoXCIpOyAvL1JDIDMwMjUwMzU2IDogT2Jkb2LDrSB7MH0gezF9IHNlIG5lcG9kYcWZaWxvIHV6YXbFmcOtdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuUmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZmZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGpxWEhSLCB0eXBlLCBvYmopIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVybk1lc3NhZ2UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uUmVzb2x2ZUV4ZXB0aW9uKHRoYXQsIG9iaiwgdHlwZSwgdnN0dXAsIG51bGwgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldHVybk1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuTWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLlJlcGVhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2c3R1cCEuSWRNZXNzYWdlID0gcmV0dXJuVmFsdWUuSWRNZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2c3R1cCEuTmFzdGF2ZW5pID0gcmV0dXJuVmFsdWUuTmFzdGF2ZW5pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5VemF2cml0TWVzaWMobWVzaVJhZGVrLCB2c3R1cCwgZGVmZmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmZlci5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHsgaWQ6IFwiZmxhc2hFcnJvclV6YXZyZW5pXCIsIGljb246IFwiZ2ktdGlja1wiLCBsYWJlbDogXCJqcmVzOjMwMjUwMDAxXCIsIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtZXJyb3JcIiB9KSAgLy9SQyAzMDI1MDAwMSA6IE5hc3RhbGEgY2h5YmEgcMWZaSB6cHJhY292w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmZlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZmVyLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKS5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBPdGV2cmVuaSBtZXNpY2VcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgT3RldnJpdE1lc2ljKG1lc2lSYWRlazogR29yZGljLkludS5JbnRlcmZhY2UuR0ludU9iZG9iaUR0bywgdnN0dXA/OiBHb3JkaWMuSW51LkludGVyZmFjZS5HSW51T3BlbkNsb3NlUmVxdWVzdER0bywgZGVmZmVyPzogYW55KTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2c3R1cCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgZGVmZmVyID0gJC5EZWZlcnJlZCgpOy8vLnByb21pc2UoKS5hbHdheXMoKCkgPT4geyBjb250ZW50LmVuZE9wZXJhdGlvbigpIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAwMDNcIik7IC8vUkMgMzAyNTAwMDMgOiBQcm9iw61ow6Egb3RldsOtcsOhbsOtXHJcblxyXG4gICAgICAgICAgICAgICAgdnN0dXAgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWdlbmRhOiB0aGF0LmdldEFnZW5kYSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLCBtZXNpYzogbWVzaVJhZGVrLm1lc2ljXHJcbiAgICAgICAgICAgICAgICAgICAgLCB1Y3M6IG1lc2lSYWRlay51Y3NcclxuICAgICAgICAgICAgICAgICAgICAsIGxpYzogbWVzaVJhZGVrLmxpY1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlOiBkb2Nhc25lIHBybyBtb3pub3N0IHByZWtsYWR1IDg0XHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5JbnVPYmRvYmkub3Blbih2c3R1cClcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXRcIiwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCE9bnVsbCAmJiByZXN1bHQuYWt0X29iZCEgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkb3BsbmVuaSBtZXNpY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoYXQuTmFwbG5PYmRvYmkocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByaWRhbmkgbm92ZWhvIHphem5hbXUgZG8gcG9sZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5NZXNpY2VEYXRhLnB1c2gocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvIG9wcmF2ZSBjaHlieSBidWRlIHZyYWNlbyB6cGV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyQodGhhdC5lbGVtZW50KS5maW5kKFwiLmctY2FyZHBhbmVsXCIpLmdjYXJkcGFuZWwoXCJ1cGRhdGVEYXRhXCIsIHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyQodGhhdC5lbGVtZW50KS5maW5kKFwiLmctY2FyZHBhbmVsXCIpLnBhcmVudCgpLmdjYXJkcGFuZWwoXCJhZGREYXRhXCIsIHJldCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIHNlem5hbXVcclxuLy9YWFggSkkgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGF0LmVsZW1lbnQpLmZpbmQoXCIuZ2NhcmRwYW5lbFwiKS5nY2FyZHBhbmVsKFwib3B0aW9uXCIsIFwiZGF0YVwiLCB0aGF0Lk1lc2ljZURhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5EYXRhVmlldy51cGRhdGVEYXRhKHRoYXQuTWVzaWNlRGF0YSwgXCJ1cGRhdGVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5SZWZyZXNoQWN0aW9uKHJlc3VsdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJJbmZvcm1hY2VcIiwgXCJqcmVzOjMwMjUwMzQ5XCIuZm9ybWF0KHJlc3VsdC5tZXNpYyEsIHJlc3VsdC5yb2shKSwgW0dEbGcubWJiT2tdLCBHRGxnLm1iaVN1Y2Nlc3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuc2hvd0ZsYXNoKFwianJlczozMDI1MDM0OVwiLmZvcm1hdChyZXN1bHQubWVzaWMhLCByZXN1bHQucm9rISksIFwiZy1zdGF0ZS1zdWNjZXNzXCIsIDUwMDAsIFwibXNnRmxhc2hcIik7IC8vUkMgMzAyNTAzNDkgOiBPYmRvYsOtIHswfSB7MX0gYnlsbyBvdGV2xZllbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwiSW5mb3JtYWNlXCIsIFwianJlczozMDI1MDM1MFwiLmZvcm1hdChyZXN1bHQubWVzaWMhLCByZXN1bHQucm9rISksIFtHRGxnLm1iYk9rXSwgR0RsZy5tYmlFcnJvcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5zaG93Rmxhc2goXCJqcmVzOjMwMjUwMzUwXCIuZm9ybWF0KHJlc3VsdC5tZXNpYyEsIHJlc3VsdC5yb2shKSwgXCJnLXN0YXRlLWVycm9yXCIsIDUwMDAsIFwibXNnRmxhc2hcIik7IC8vUkMgMzAyNTAzNTAgOiBPYmRvYsOtIHswfSB7MX0gc2UgbmVwb2RhxZlpbG8gb3RldsWZw610XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKFwiT2Jkb2LDrSBcIiArIG1lc2lSYWRlay5tZXNpY190eHQgKyBcIiBcIiArIG1lc2lSYWRlay5yb2sgKyBcIiBzZSBuZXBvZGHFmWlsbyBvdGV2xZnDrXRcIiwgXCJnLXN0YXRlLWVycm9yXCIsIDUwMDAsIFwibXNnRmxhc2hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmZlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoanFYSFIsIHR5cGUsIG9iaikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVybk1lc3NhZ2UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uUmVzb2x2ZUV4ZXB0aW9uKHRoYXQsIG9iaiwgdHlwZSwgdnN0dXAsIG51bGwgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5NZXNzYWdlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5NZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5SZXBlYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZzdHVwIS5JZE1lc3NhZ2UgPSByZXR1cm5WYWx1ZS5JZE1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2c3R1cCEuTmFzdGF2ZW5pID0gcmV0dXJuVmFsdWUuTmFzdGF2ZW5pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuT3RldnJpdE1lc2ljKG1lc2lSYWRlaywgdnN0dXAsIGRlZmZlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZmVyLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHsgaWQ6IFwiZmxhc2hFcnJvck90ZXZyZW5pXCIsIGljb246IFwiZ2ktdGlja1wiLCBsYWJlbDogXCJqcmVzOjMwMjUwMDAxXCIsIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtZXJyb3JcIiB9KSAgLy9SQyAzMDI1MDAwMSA6IE5hc3RhbGEgY2h5YmEgcMWZaSB6cHJhY292w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZmZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICkuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBBa3R1YWxpemF2YXRNZXNpYyhkYXRhX2FrdDogR29yZGljLkludS5JbnRlcmZhY2UuR0ludU9iZG9iaUR0bykge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGF0LmlzbC5JbnVPYmRvYmkuYWt0dWFsaXpvdmF0KHsgYWdlbmRhOiB0aGF0LmdldEFnZW5kYSgpLCB1Y3M6IGRhdGFfYWt0LnVjcyBhcyBhbnksIGxva2FsaXRhOiBkYXRhX2FrdC5saWMhIH0pXHJcbiAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAvL3RoYXQuY2FsbDxib29sZWFuPihcIkFrdHVhbGl6b3ZhdFwiLCB7IGRhdGFfbWVzaWM6IGRhdGFfYWt0LCBkYXRhX2FnZW5kYTogdGhhdC5hZ2VuZGEgfSlcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJJbmZvcm1hY2VcIiwgXCJqcmVzOjMwMjUwMzQ1XCIuZm9ybWF0KGRhdGFfYWt0Lm1lc2ljISwgZGF0YV9ha3Qucm9rISksIFtHRGxnLm1iYk9rXSwgR0RsZy5tYmlTdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuc2hvd0ZsYXNoKFwianJlczozMDI1MDM0NVwiLmZvcm1hdChkYXRhX2FrdC5tZXNpYyEsIGRhdGFfYWt0LnJvayEpICAvL1JDIDMwMjUwMzQ1IDogT2Jkb2LDrSB7MH0gezF9IGJ5bG8gYWt0dWFsaXpvdsOhbm9cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAvKlwiT2Jkb2LDrSBcIiArIGRhdGFfYWt0Lm1lc2ljX3R4dCArIFwiIFwiICsgZGF0YV9ha3Qucm9rICsgXCIgYnlsbyBha3R1YWxpem92w6Fub1wiKi8sIFwiZy1zdGF0ZS1zdWNjZXNzXCIsIDUwMDAsIFwibXNnRmxhc2hcIik7IFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgWnBldG5lIG90ZXZyZW5pIG1lc2ljZVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBacGV0bmVPdGV2cml0KG1lc2lSYWRlazogR29yZGljLkludS5JbnRlcmZhY2UuR0ludU9iZG9iaUR0bywgdnN0dXA/OiBHb3JkaWMuSW51LkludGVyZmFjZS5HSW51T3BlbkNsb3NlUmVxdWVzdER0bywgZGVmZmVyPzogYW55KTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2c3R1cCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgZGVmZmVyID0gJC5EZWZlcnJlZCgpOy8vLnByb21pc2UoKS5hbHdheXMoKCkgPT4geyBjb250ZW50LmVuZE9wZXJhdGlvbigpIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAwMDNcIik7IC8vUkMgMzAyNTAwMDMgOiBQcm9iw61ow6Egb3RldsOtcsOhbsOtXHJcblxyXG4gICAgICAgICAgICAgICAgdnN0dXAgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWdlbmRhOiB0aGF0LmdldEFnZW5kYSgpLCBtZXNpYzogbWVzaVJhZGVrLm1lc2ljLCB1Y3M6IG1lc2lSYWRlay51Y3MsIGxpYzogbWVzaVJhZGVrLmxpY1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBYWFhAdHMtaWdub3JlOiBkb2Nhc25lIHBybyBtb3pub3N0IHByZWtsYWR1IDg0XHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5JbnVPYmRvYmkudW5DbG9zZSh7IHJxOiB2c3R1cH0gKVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmFrdF9vYmQhID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5OYXBsbk9iZG9iaShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5NZXNpY2VEYXRhIVtyZXN1bHQubWVzaWMhIC0gMV0gPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQubWF4X3V6YXZyZW55X21lc2ljID0gcmVzdWx0Lm1lc2ljISAtIDE7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuLy9YWFggSkkgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGF0LmVsZW1lbnQpLmZpbmQoXCIuZ2NhcmRwYW5lbFwiKS5nY2FyZHBhbmVsKFwidXBkYXRlRGF0YVwiLCByZXN1bHQgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuRGF0YVZpZXcudXBkYXRlRGF0YShyZXN1bHQsIFwidXBkYXRlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuUmVmcmVzaEFjdGlvbihyZXN1bHQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwiSW5mb3JtYWNlXCIsIFwianJlczozMDI1MDM0NlwiLmZvcm1hdChyZXN1bHQubWVzaWMhLCByZXN1bHQucm9rISksIFtHRGxnLm1iYk9rXSwgR0RsZy5tYmlTdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5zaG93Rmxhc2goXCJqcmVzOjMwMjUwMzQ2XCIuZm9ybWF0KHJlc3VsdC5tZXNpYyEsIHJlc3VsdC5yb2shKSwgXCJnLXN0YXRlLXN1Y2Nlc3NcIiwgNTAwMCwgXCJtc2dGbGFzaFwiKTsgLy9SQyAzMDI1MDM0NiA6IE9iZG9iw60gezB9IHsxfSBieWxvIHpwxJt0bsSbIG90ZXbFmWVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJJbmZvcm1hY2VcIiwgXCJqcmVzOjMwMjUwMzQ3XCIuZm9ybWF0KHJlc3VsdC5tZXNpYyEsIHJlc3VsdC5yb2shKSwgW0dEbGcubWJiT2tdLCBHRGxnLm1iaUVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5zaG93Rmxhc2goXCJqcmVzOjMwMjUwMzQ3XCIuZm9ybWF0KHJlc3VsdC5tZXNpYyEsIHJlc3VsdC5yb2shKSwgXCJnLXN0YXRlLWVycm9yXCIsIDUwMDAsIFwibXNnRmxhc2hcIik7ICAvL1JDIDMwMjUwMzQ3IDogT2Jkb2LDrSB7MH0gezF9IHNlIG5lcG9kYcWZaWxvIHpwxJt0bsSbIG90ZXbFmWl0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5SZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmZlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoanFYSFIsIHR5cGUsIG9iaikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVybk1lc3NhZ2UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uUmVzb2x2ZUV4ZXB0aW9uKHRoYXQsIG9iaiwgdHlwZSwgdnN0dXAsIG51bGwgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5NZXNzYWdlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5NZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5SZXBlYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZzdHVwIS5JZE1lc3NhZ2UgPSByZXR1cm5WYWx1ZS5JZE1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2c3R1cCEuTmFzdGF2ZW5pID0gcmV0dXJuVmFsdWUuTmFzdGF2ZW5pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuWnBldG5lT3RldnJpdChtZXNpUmFkZWssIHZzdHVwLCBkZWZmZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmZlci5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaCh7IGlkOiBcImZsYXNoRXJyb3JVemF2cmVuaVwiLCBpY29uOiBcImdpLXRpY2tcIiwgbGFiZWw6IFwianJlczozMDI1MDAwMVwiLCBjdXN0b21DbGFzczogXCJnLXN0YXRlLWVycm9yXCIgfSkgIC8vUkMgMzAyNTAwMDEgOiBOYXN0YWxhIGNoeWJhIHDFmWkgenByYWNvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZmZXIucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIFByZWRhdCBrZSBzY2h2YWxlbmlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgUHJlZGF0S2VTY2h2YWxlbmkobWVzaVJhZGVrOiBHb3JkaWMuSW51LkludGVyZmFjZS5HSW51T2Jkb2JpRHRvLCB2c3R1cD86IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVPcGVuQ2xvc2VSZXF1ZXN0RHRvLCBkZWZmZXI/OiBhbnkpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZzdHVwID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZmZXIgPSAkLkRlZmVycmVkKCk7Ly8ucHJvbWlzZSgpLmFsd2F5cygoKSA9PiB7IGNvbnRlbnQuZW5kT3BlcmF0aW9uKCkgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDAwM1wiKTsgLy9SQyAzMDI1MDAwMyA6IFByb2LDrWjDoSBvdGV2w61yw6Fuw61cclxuXHJcbiAgICAgICAgICAgICAgICB2c3R1cCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBhZ2VuZGE6IHRoYXQuZ2V0QWdlbmRhKCksIG1lc2ljOiBtZXNpUmFkZWsubWVzaWMsIHVjczogbWVzaVJhZGVrLnVjcywgbGljOiBtZXNpUmFkZWsubGljXHJcblxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBYWFhAdHMtaWdub3JlOiBkb2Nhc25lIHBybyBtb3pub3N0IHByZWtsYWR1IDg0XHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5JbnVPYmRvYmkucHJlZGF0S2VTY2h2YWxlbmkoeyBycTogdnN0dXAgfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5OYXBsbk9iZG9iaShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk1lc2ljZURhdGEhW3Jlc3VsdC5tZXNpYyEgLSAxXSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0Lm1heF91emF2cmVueV9tZXNpYyA9IHJlc3VsdC5tZXNpYyEgLSAxOyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbi8vWFhYIEpJICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGF0LmVsZW1lbnQpLmZpbmQoXCIuZ2NhcmRwYW5lbFwiKS5nY2FyZHBhbmVsKFwidXBkYXRlRGF0YVwiLCByZXN1bHQgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5EYXRhVmlldy51cGRhdGVEYXRhKHJlc3VsdCwgXCJ1cGRhdGVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlJlZnJlc2hBY3Rpb24ocmVzdWx0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwiSW5mb3JtYWNlXCIsIFwianJlczozMDI1MDM4MFwiLmZvcm1hdChyZXN1bHQubWVzaWMhLCByZXN1bHQucm9rISksIFtHRGxnLm1iYk9rXSwgR0RsZy5tYmlTdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnNob3dGbGFzaChcImpyZXM6MzAyNTAzODBcIi5mb3JtYXQocmVzdWx0Lm1lc2ljISwgcmVzdWx0LnJvayEpLCBcImctc3RhdGUtc3VjY2Vzc1wiLCA1MDAwLCBcIm1zZ0ZsYXNoXCIpOyAvL1JDIDMwMjUwMzgwIDogT2Jkb2LDrSB7MH0gezF9IGJ5bG8gcMWZZWTDoW5vIGtlIHNjaHbDoWxlbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuUmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZmZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGpxWEhSLCB0eXBlLCBvYmopIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbih0aGF0LCBvYmosIHR5cGUsIHZzdHVwLCBudWxsIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0dXJuTWVzc2FnZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuTWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuUmVwZWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2c3R1cCEuSWRNZXNzYWdlID0gcmV0dXJuVmFsdWUuSWRNZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnN0dXAhLk5hc3RhdmVuaSA9IHJldHVyblZhbHVlLk5hc3RhdmVuaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LlByZWRhdEtlU2NodmFsZW5pKG1lc2lSYWRlaywgdnN0dXAsIGRlZmZlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZmVyLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHsgaWQ6IFwiZmxhc2hFcnJvclV6YXZyZW5pXCIsIGljb246IFwiZ2ktdGlja1wiLCBsYWJlbDogXCJqcmVzOjMwMjUwMDAxXCIsIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtZXJyb3JcIiB9KSAgLy9SQyAzMDI1MDAwMSA6IE5hc3RhbGEgY2h5YmEgcMWZaSB6cHJhY292w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZmZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICkuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgU2NodmFsaXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgU2NodmFsaXQobWVzaVJhZGVrOiBHb3JkaWMuSW51LkludGVyZmFjZS5HSW51T2Jkb2JpRHRvLCB2c3R1cD86IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVPcGVuQ2xvc2VSZXF1ZXN0RHRvLCBkZWZmZXI/OiBhbnkpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZzdHVwID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZmZXIgPSAkLkRlZmVycmVkKCk7Ly8ucHJvbWlzZSgpLmFsd2F5cygoKSA9PiB7IGNvbnRlbnQuZW5kT3BlcmF0aW9uKCkgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDAwM1wiKTsgLy9SQyAzMDI1MDAwMyA6IFByb2LDrWjDoSBvdGV2w61yw6Fuw61cclxuXHJcbiAgICAgICAgICAgICAgICB2c3R1cCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBhZ2VuZGE6IHRoYXQuZ2V0QWdlbmRhKCksIG1lc2ljOiBtZXNpUmFkZWsubWVzaWMsIHVjczogbWVzaVJhZGVrLnVjcywgbGljOiBtZXNpUmFkZWsubGljXHJcblxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBYWFhAdHMtaWdub3JlOiBkb2Nhc25lIHBybyBtb3pub3N0IHByZWtsYWR1IDg0XHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5JbnVPYmRvYmkuc2NodmFsaXQoeyBycTogdnN0dXAgfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5OYXBsbk9iZG9iaShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk1lc2ljZURhdGEhW3Jlc3VsdC5tZXNpYyEgLSAxXSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0Lm1heF91emF2cmVueV9tZXNpYyA9IHJlc3VsdC5tZXNpYyEgLSAxOyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbi8vWFhYIEpJICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGF0LmVsZW1lbnQpLmZpbmQoXCIuZ2NhcmRwYW5lbFwiKS5nY2FyZHBhbmVsKFwidXBkYXRlRGF0YVwiLCByZXN1bHQgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5EYXRhVmlldy51cGRhdGVEYXRhKHJlc3VsdCwgXCJ1cGRhdGVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlJlZnJlc2hBY3Rpb24ocmVzdWx0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwiSW5mb3JtYWNlXCIsIFwianJlczozMDI1MDM4MVwiLmZvcm1hdChyZXN1bHQubWVzaWMhLCByZXN1bHQucm9rISksIFtHRGxnLm1iYk9rXSwgR0RsZy5tYmlTdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnNob3dGbGFzaChcImpyZXM6MzAyNTAzODFcIi5mb3JtYXQocmVzdWx0Lm1lc2ljISwgcmVzdWx0LnJvayEpLCBcImctc3RhdGUtc3VjY2Vzc1wiLCA1MDAwLCBcIm1zZ0ZsYXNoXCIpOyAvL1JDIDMwMjUwMzgxIDogT2Jkb2LDrSB7MH0gezF9IGJ5bG8gc2NodsOhbGVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChqcVhIUiwgdHlwZSwgb2JqKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuTWVzc2FnZSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5SZXNvbHZlRXhlcHRpb24odGhhdCwgb2JqLCB0eXBlLCB2c3R1cCwgbnVsbCBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldHVybk1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLlJlcGVhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnN0dXAhLklkTWVzc2FnZSA9IHJldHVyblZhbHVlLklkTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZzdHVwIS5OYXN0YXZlbmkgPSByZXR1cm5WYWx1ZS5OYXN0YXZlbmk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5TY2h2YWxpdChtZXNpUmFkZWssIHZzdHVwLCBkZWZmZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmZlci5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaCh7IGlkOiBcImZsYXNoRXJyb3JVemF2cmVuaVwiLCBpY29uOiBcImdpLXRpY2tcIiwgbGFiZWw6IFwianJlczozMDI1MDAwMVwiLCBjdXN0b21DbGFzczogXCJnLXN0YXRlLWVycm9yXCIgfSkgIC8vUkMgMzAyNTAwMDEgOiBOYXN0YWxhIGNoeWJhIHDFmWkgenByYWNvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZmZXIucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIE9kc2NodmFsaXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgT2RTY2h2YWxpdChtZXNpUmFkZWs6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVPYmRvYmlEdG8sIHZzdHVwPzogR29yZGljLkludS5JbnRlcmZhY2UuR0ludU9wZW5DbG9zZVJlcXVlc3REdG8sIGRlZmZlcj86IGFueSk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdnN0dXAgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIGRlZmZlciA9ICQuRGVmZXJyZWQoKTsvLy5wcm9taXNlKCkuYWx3YXlzKCgpID0+IHsgY29udGVudC5lbmRPcGVyYXRpb24oKSB9KTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMDAzXCIpOyAvL1JDIDMwMjUwMDAzIDogUHJvYsOtaMOhIG90ZXbDrXLDoW7DrVxyXG5cclxuICAgICAgICAgICAgICAgIHZzdHVwID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFnZW5kYTogdGhhdC5nZXRBZ2VuZGEoKSwgbWVzaWM6IG1lc2lSYWRlay5tZXNpYywgdWNzOiBtZXNpUmFkZWsudWNzLCBsaWM6IG1lc2lSYWRlay5saWNcclxuXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFhYWEB0cy1pZ25vcmU6IGRvY2FzbmUgcHJvIG1vem5vc3QgcHJla2xhZHUgODRcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkludU9iZG9iaS5vZFNjaHZhbGl0KHsgcnE6IHZzdHVwIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuTmFwbG5PYmRvYmkocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5NZXNpY2VEYXRhIVtyZXN1bHQubWVzaWMhIC0gMV0gPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5tYXhfdXphdnJlbnlfbWVzaWMgPSByZXN1bHQubWVzaWMhIC0gMTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4vL1hYWCBKSSAgICAgICAgICAgICAgICAgICAgICAgICQodGhhdC5lbGVtZW50KS5maW5kKFwiLmdjYXJkcGFuZWxcIikuZ2NhcmRwYW5lbChcInVwZGF0ZURhdGFcIiwgcmVzdWx0IGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuRGF0YVZpZXcudXBkYXRlRGF0YShyZXN1bHQsIFwidXBkYXRlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5SZWZyZXNoQWN0aW9uKHJlc3VsdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcIkluZm9ybWFjZVwiLCBcImpyZXM6MzAyNTAzODJcIi5mb3JtYXQocmVzdWx0Lm1lc2ljISwgcmVzdWx0LnJvayEpLCBbR0RsZy5tYmJPa10sIEdEbGcubWJpU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5zaG93Rmxhc2goXCJqcmVzOjMwMjUwMzgyXCIuZm9ybWF0KHJlc3VsdC5tZXNpYyEsIHJlc3VsdC5yb2shKSwgXCJnLXN0YXRlLXN1Y2Nlc3NcIiwgNTAwMCwgXCJtc2dGbGFzaFwiKTsgLy9SQyAzMDI1MDM4MiA6IFYgb2Jkb2LDrSB7MH0gezF9IGJ5bG8genJ1xaFlbm8gcMWZZWTDoW7DrSBrZSBzY2h2w6FsZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChqcVhIUiwgdHlwZSwgb2JqKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuTWVzc2FnZSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5SZXNvbHZlRXhlcHRpb24odGhhdCwgb2JqLCB0eXBlLCB2c3R1cCwgbnVsbCBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldHVybk1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLlJlcGVhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnN0dXAhLklkTWVzc2FnZSA9IHJldHVyblZhbHVlLklkTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZzdHVwIS5OYXN0YXZlbmkgPSByZXR1cm5WYWx1ZS5OYXN0YXZlbmk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5PZFNjaHZhbGl0KG1lc2lSYWRlaywgdnN0dXAsIGRlZmZlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZmVyLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHsgaWQ6IFwiZmxhc2hFcnJvclV6YXZyZW5pXCIsIGljb246IFwiZ2ktdGlja1wiLCBsYWJlbDogXCJqcmVzOjMwMjUwMDAxXCIsIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtZXJyb3JcIiB9KSAgLy9SQyAzMDI1MDAwMSA6IE5hc3RhbGEgY2h5YmEgcMWZaSB6cHJhY292w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZmZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICkuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa3R1YWxpemFjZSBwcmlzdHVwbm9zdGkgYWtjaVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIFJlZnJlc2hBY3Rpb24oZGF0YT86IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVPYmRvYmlEdG98bnVsbCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgYWdlbmRhVWN0ID0gdGhpcy5nZXRBZ2VuZGEoKSA9PSBJbnRlcmZhY2UuR0VJbnVBZ2VuZGEuVUNUO1xyXG5cclxuICAgICAgICAgICAgLy8vLyBocm9tYWRuZSBvdGV2cml0XHJcbiAgICAgICAgICAgIC8vdGhhdC5hY3Rpb25zLmFjdEhyb21hZG5lT3RldnJpdCEudXBkYXRlKHtcclxuICAgICAgICAgICAgLy8gICAgZW5hYmxlZDogKHRoYXQuYWdlbmRhID09PSBcIlVDVFwiID9cclxuICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuZ2xvYmFscy5HbG9iYWxuaV9QYXJhbWV0cnkuUG92b2xlbmlPdGV2cmVuaU1lc2ljZVVDVCEgXHJcbiAgICAgICAgICAgIC8vICAgICAgICA6IHRoYXQuZ2xvYmFscy5HbG9iYWxuaV9QYXJhbWV0cnkuUG92b2xlbmlPdGV2cmVuaU1lc2ljZVJPWiEpXHJcbiAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgIC8vLy8gaHJvbWFkbmUgdXphdnJpdFxyXG4gICAgICAgICAgICAvL3RoYXQuYWN0aW9ucy5hY3RIcm9tYWRuZVV6YXZyaXQhLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgIC8vICAgIGVuYWJsZWQ6XHJcbiAgICAgICAgICAgIC8vICAgICAgICAodGhhdC5hZ2VuZGEgPT09IFwiVUNUXCIgPyB0aGF0Lmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlBvdm9sZW5pVXphdnJlbmlNZXNpY2VVQ1QhIDogdGhhdC5nbG9iYWxzLkdsb2JhbG5pX1BhcmFtZXRyeS5Qb3ZvbGVuaVV6YXZyZW5pTWVzaWNlUk9aISlcclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RTdGF2S29udHJvbHk/LnVwZGF0ZVBlcm1pc3Npb24odGhhdC5jb250cm9sU3RhdHVzUGVybWl0KTtcclxuICAgICAgICAgICAgLy90aGF0LmFjdGlvbnMuYWN0U2VwQmxva09rcnVoeSEudXBkYXRlKHsgdmlzaWJsZTogYWdlbmRhVWN0IH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGRhdGEgPT09IG51bGwgfHwgdHlwZW9mIGRhdGEgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vIG5lanNvdSB6YWRuYSB2eWJyYW5hIGRhdGFcclxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgICAgIC8vIHV6YXZyaXRcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RVemF2cml0IS51cGRhdGUoeyBlbmFibGVkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIC8vIHpwZXRuZSBvdGV2cml0XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0WnBldG5lT3RldnJpdCEudXBkYXRlKHsgZW5hYmxlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBvdGV2cml0XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0T3RldnJpdCEudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiAodGhhdC5hZ2VuZGEgPT09IFwiVUNUXCIgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlBvdm9sZW5pT3RldnJlbmlNZXNpY2VVQ1QhIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRoYXQuZ2xvYmFscy5HbG9iYWxuaV9QYXJhbWV0cnkuUG92b2xlbmlPdGV2cmVuaU1lc2ljZVJPWiEpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIGRldGFpbFxyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdERldGFpbCEudXBkYXRlKHsgZW5hYmxlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBha3R1YWxpb3ZhdFxyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdEFrdHVhbGl6b3ZhdCEudXBkYXRlKHsgZW5hYmxlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBzdGF2dVxyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdEFrdHVhbGl6b3ZhdFN0diEudXBkYXRlKHsgZW5hYmxlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0Qmxva09rcnVoeSEudXBkYXRlKHsgZW5hYmxlZDogZmFsc2UsIHZpc2libGU6IGFnZW5kYVVjdCB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0Qmxva09rcnVoeSEudXBkYXRlKHsgZW5hYmxlZDogZmFsc2UsIHZpc2libGU6IGFnZW5kYVVjdCB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBwcmVkYXQga2Ugc2NodmFsZW5pIHNjaHZhbGVuaVxyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFpydXNpdFNjaHZhbGVuaSEudXBkYXRlKHsgZW5hYmxlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyB6cnVzaXQgc2NodmFsZW5pXHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJlZGF0S2VTY2h2YWxlbmkhLnVwZGF0ZSh7ZW5hYmxlZDogZmFsc2V9KTtcclxuICAgICAgICAgICAgICAgIC8vICBzY2h2YWxlbmlcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RTY2h2YWxpdCEudXBkYXRlKHsgZW5hYmxlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBzdGF2IGtvbnRyb2x5XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0U3RhdktvbnRyb2x5IS51cGRhdGUoeyBlbmFibGVkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWt0X21lc2ljID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LmFrdF9tZXNpYy5tZXNpYyA9PSB0aGF0Lk1pbk90ZXZyZW55TWVzaWMoZGF0YS51Y3MhKS8qKHRoYXQubWF4X3V6YXZyZW55X21lc2ljICsgMSkqLykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RVemF2cml0IS51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRoYXQuYWdlbmRhID09PSBcIlVDVFwiID8gdGhhdC5nbG9iYWxzLkdsb2JhbG5pX1BhcmFtZXRyeS5Qb3ZvbGVuaVV6YXZyZW5pTWVzaWNlVUNUISAmJiBkYXRhLmFrdF9vYmQgPT0gSW50ZXJmYWNlLkdFQWt0aXZpdGFPYmRvYmkuT3RldnJlbmUgOiB0aGF0Lmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlBvdm9sZW5pVXphdnJlbmlNZXNpY2VST1ohICYmIGRhdGEuYWt0X29iZCA9PSBJbnRlcmZhY2UuR0VBa3Rpdml0YU9iZG9iaS5PdGV2cmVuZSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RVemF2cml0IS51cGRhdGUoeyBlbmFibGVkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcHJlZGF0IGtlIHNjaHZhbGVuaVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQcmVkYXRLZVNjaHZhbGVuaSEudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhhdC5Jc0FsbG93ZVN1Ym1pdEZvckFwcHJvdmFsKGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyh0aGF0LmFnZW5kYSA9PT0gXCJVQ1RcIiA/IHRoYXQuZ2xvYmFscy5HbG9iYWxuaV9QYXJhbWV0cnkuUG92b2xlbmlTY2h2YWxlbmlVemF2ZXJreU9iZG9iaVVDVCEgJiYgZGF0YS5ha3Rfb2JkID09IDEwMCA6IHRoYXQuZ2xvYmFscy5HbG9iYWxuaV9QYXJhbWV0cnkuUG92b2xlbmlTY2h2YWxlbmlVemF2ZXJreU9iZG9iaVJPWiEgJiYgZGF0YS5ha3Rfb2JkID09IDEwMClcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RacnVzaXRTY2h2YWxlbmkhLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhhdC5Jc0FsbG93ZUNhbmNlbFN1Ym1pdEZvckFwcHJvdmFsKGRhdGEpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RTY2h2YWxpdCEudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGF0LklzQWxsb3dlQ2FuY2VsU3VibWl0Rm9yQXBwcm92YWwoZGF0YSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBkZXRhaWxcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3REZXRhaWwhLnVwZGF0ZSh7IGVuYWJsZWQ6IHRoYXQuc2VsZWN0ZWRSb3chPW51bGwgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gb3RldnJpdFxyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdE90ZXZyaXQhLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogKHRoYXQuYWdlbmRhID09PSBcIlVDVFwiID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5nbG9iYWxzLkdsb2JhbG5pX1BhcmFtZXRyeS5Qb3ZvbGVuaU90ZXZyZW5pTWVzaWNlVUNUISAmJiAodHlwZW9mIGRhdGEudWNzID09PSBcInVuZGVmaW5lZFwifHwgdGhhdC5Qb2NldE90ZXZyZW55Y2hPYmRvYmkoZGF0YS51Y3MhKSA8IHRoYXQuZ2xvYmFscy5HbG9iYWxuaV9QYXJhbWV0cnkuTWF4UG9jZXRPdGV2cmVueWNoT2Jkb2JpVWN0ISlcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGF0Lmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlBvdm9sZW5pT3RldnJlbmlNZXNpY2VST1ohICYmICh0eXBlb2YgZGF0YS51Y3MgPT09IFwidW5kZWZpbmVkXCIgfHwgdGhhdC5Qb2NldE90ZXZyZW55Y2hPYmRvYmkoZGF0YS51Y3MhKSA8IHRoYXQuZ2xvYmFscy5HbG9iYWxuaV9QYXJhbWV0cnkuTWF4UG9jZXRPdGV2cmVueWNoT2Jkb2JpUm96ISkpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5ha3RfbWVzaWMubWVzaWMgPT0gdGhhdC5NYXhVemF2cmVueU1lc2ljKGRhdGEudWNzISkgIC8qKHRoYXQubWF4X3V6YXZyZW55X21lc2ljKSovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFpwZXRuZU90ZXZyaXQhLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6ICh0aGF0LmFnZW5kYSA9PT0gXCJVQ1RcIiA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlBvdm9sZW5pWm5vdnVPdGV2cmVuaU1lc2ljZVVDVCEgJiYgZGF0YS5ha3Rfb2JkID09IEludGVyZmFjZS5HRUFrdGl2aXRhT2Jkb2JpLlV6YXZyZW5lICYmIGRhdGEuc3RhdiA9PSAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoYXQuZ2xvYmFscy5HbG9iYWxuaV9QYXJhbWV0cnkuUG92b2xlbmlabm92dU90ZXZyZW5pTWVzaWNlUk9aISAmJiBkYXRhLmFrdF9vYmQgPT0gSW50ZXJmYWNlLkdFQWt0aXZpdGFPYmRvYmkuVXphdnJlbmUgJiYgZGF0YS5zdGF2ID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0WnBldG5lT3RldnJpdCEudXBkYXRlKHsgZW5hYmxlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgLy8gYWt0dWFsaXpvdmF0IFxyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdEFrdHVhbGl6b3ZhdCEudXBkYXRlKHsgZW5hYmxlZDogKHRoYXQuYWdlbmRhID09PSBcIlVDVFwiID8gdGhhdC5nbG9iYWxzLkdsb2JhbG5pX1BhcmFtZXRyeS5Qb3ZvbGVuaU90ZXZyZW5pTWVzaWNlVUNUISA6IHRoYXQuZ2xvYmFscy5HbG9iYWxuaV9QYXJhbWV0cnkuUG92b2xlbmlPdGV2cmVuaU1lc2ljZVJPWiEpIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gYWt0dWFsaXpvdmF0IHN0YXZ5XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0QWt0dWFsaXpvdmF0U3R2IS51cGRhdGUoeyBlbmFibGVkOiB0aGF0Lmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlBvdm9sZW5pQWt0dWFsaXphY2VTdGF2dSBhcyBib29sZWFuIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gYmxvay4gb2tydWh5XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0Qmxva09rcnVoeSEudXBkYXRlKHsgZW5hYmxlZDogdGhhdC5nbG9iYWxzLkdsb2JhbG5pX1BhcmFtZXRyeS5Qb3ZvbGVuaUJsb2thY25pY2hPa3J1aHUgYXMgYm9vbGVhbiwgdmlzaWJsZTogYWdlbmRhVWN0IH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gc3RhdiBrb250cm9seVxyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFN0YXZLb250cm9seSEudXBkYXRlKHsgZW5hYmxlZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaamlzdGVuaSBwb2NldCBvdGV2cmVueWNoIG9iZG9iaWNoIHphIHN0cmVkaXNrb1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBQb2NldE90ZXZyZW55Y2hPYmRvYmkodWNzOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgICAgICBsZXQgcG9jZXQ6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5NZXNpY2VEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXMuTWVzaWNlRGF0YVtpXTtcclxuICAgICAgICAgICAgICAgIGlmICgoaXRlbS51Y3MgPT0gdWNzKSAmJiAoaXRlbS5ha3Rfb2JkID09IEludGVyZmFjZS5HRUFrdGl2aXRhT2Jkb2JpLk90ZXZyZW5lKSlcclxuICAgICAgICAgICAgICAgICAgICBwb2NldCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwb2NldFxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmppc3RlbmkgbWluLiBvdGV2cmVuZWhvIG1lc2ljZSBwcm8gZGFuZSB1Y3NcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgTWluT3RldnJlbnlNZXNpYyh1Y3M6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIGxldCBtZXNpYzogbnVtYmVyID0gMTAwO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuTWVzaWNlRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLk1lc2ljZURhdGFbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS51Y3MgPT0gdWNzICYmIGl0ZW0uYWt0X29iZCA9PSBJbnRlcmZhY2UuR0VBa3Rpdml0YU9iZG9iaS5PdGV2cmVuZSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWVzaWMgPiBpdGVtLm1lc2ljISlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzaWMgPSBpdGVtLm1lc2ljITtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbWVzaWNcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBvdm9sZW5pIGsgcHJlZGFuaSBrZSBzY2h2YWxlbmlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgSXNBbGxvd2VTdWJtaXRGb3JBcHByb3ZhbChpdGVtOiBHb3JkaWMuSW51LkludGVyZmFjZS5HSW51T2Jkb2JpRHRvKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGxldCBtZXNpYzogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgbGV0IHVjcyA9IGl0ZW0udWNzO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBwZXJtaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuTWVzaWNlRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW1yID0gdGhpcy5NZXNpY2VEYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1yLnVjcyA9PSB1Y3MgJiYgKGl0ZW1yLm1lc2ljIGFzIG51bWJlcikgPiAoaXRlbS5tZXNpYyBhcyBudW1iZXIpICYmIGl0ZW1yLmFrdF9vYmQgPT0gSW50ZXJmYWNlLkdFQWt0aXZpdGFPYmRvYmkuVXphdnJlbmUgJiYgaXRlbXIuc3RhdiAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1yLnVjcyA9PSB1Y3MgJiYgKGl0ZW1yLm1lc2ljIGFzIG51bWJlcikgPCAoaXRlbS5tZXNpYyBhcyBudW1iZXIpICYmIGl0ZW1yLmFrdF9vYmQgPT0gSW50ZXJmYWNlLkdFQWt0aXZpdGFPYmRvYmkuVXphdnJlbmUgJiYgKGl0ZW1yLnN0YXYgPT09IDAgfHwgaXRlbXIuc3RhdiA9PT0gMikpIHtcclxuICAgICAgICAgICAgICAgICAgICBwZXJtaXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbXIudWNzID09IHVjcyAmJiBpdGVtci5ha3Rfb2JkID09IEludGVyZmFjZS5HRUFrdGl2aXRhT2Jkb2JpLlV6YXZyZW5lICYmIGl0ZW1yLnN0YXY9PT0wKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNpYyA8IGl0ZW1yLm1lc2ljISkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNpYyA9IGl0ZW1yLm1lc2ljITtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGl0ZW0uYWt0X29iZCA9PT0gSW50ZXJmYWNlLkdFQWt0aXZpdGFPYmRvYmkuVXphdnJlbmUgJiYgaXRlbS5zdGF2ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBwZXJtaXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUG92b2xlbmkga2UgenJ1c2VuaSBwcmVkYW5pIGtlIHNjaHZhbGVuaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBJc0FsbG93ZUNhbmNlbFN1Ym1pdEZvckFwcHJvdmFsKGl0ZW06IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVPYmRvYmlEdG8pOiBib29sZWFuIHtcclxuICAgICAgICAgICAgbGV0IG1lc2ljOiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBsZXQgdWNzID0gaXRlbS51Y3M7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gZG9obGVkZW5pIG1heC4gb2Jkb2JpIGsgcHJlZGFuaSBrZSBzY2h2YWxlbmlcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLk1lc2ljZURhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBpdGVtciA9IHRoaXMuTWVzaWNlRGF0YVtpXTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtci51Y3MgPT0gdWNzICYmIGl0ZW1yLmFrdF9vYmQgPT0gSW50ZXJmYWNlLkdFQWt0aXZpdGFPYmRvYmkuVXphdnJlbmUgJiYgaXRlbXIuc3RhdiA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNpYyA8IGl0ZW1yLm1lc2ljISkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNpYyA9IGl0ZW1yLm1lc2ljITtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmFrdF9vYmQgPT09IEludGVyZmFjZS5HRUFrdGl2aXRhT2Jkb2JpLlV6YXZyZW5lICYmIGl0ZW0uc3RhdiA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubWVzaWM9PT1tZXNpYylcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpqaXN0ZW5pIG1heC4gdXphdnJlbnkgbWVzaWMgcHJvIGRhbmUgdWNzXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIE1heFV6YXZyZW55TWVzaWModWNzOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgICAgICBsZXQgbWVzaWM6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5NZXNpY2VEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXMuTWVzaWNlRGF0YVtpXTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLnVjcyA9PSB1Y3MgJiYgaXRlbS5ha3Rfb2JkID09IEludGVyZmFjZS5HRUFrdGl2aXRhT2Jkb2JpLlV6YXZyZW5lKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNpYyA8IGl0ZW0ubWVzaWMhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNpYyA9IGl0ZW0ubWVzaWMhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNpY1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaamlzdGVuaSBtYXguIG90ZXZyZW5laG8gbWVzaWNlIHBybyBkYW5lIHVjc1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBHZXRSb3pzYWhPYmRvYmkoKTogbnVtYmVyW10ge1xyXG4gICAgICAgICAgICBsZXQgbWF4TWVzaWM6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGxldCBtaW5NZXNpYzogbnVtYmVyID0gMTAwO1xyXG4gICAgICAgICAgICBsZXQgcm96c2FoT2Jkb2JpOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuTWVzaWNlRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLk1lc2ljZURhdGFbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAobWF4TWVzaWMgPCBpdGVtLm1lc2ljISlcclxuICAgICAgICAgICAgICAgICAgICBtYXhNZXNpYyA9IGl0ZW0ubWVzaWMhO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1pbk1lc2ljID4gaXRlbS5tZXNpYyEpXHJcbiAgICAgICAgICAgICAgICAgICAgbWluTWVzaWMgPSBpdGVtLm1lc2ljITtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWF4TWVzaWMgPjApIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBtaW5NZXNpYzsgaSA8PSBtYXhNZXNpYzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm96c2FoT2Jkb2JpLnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJvenNhaE9iZG9iaTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH0gICAgXHJcbn0iXX0=
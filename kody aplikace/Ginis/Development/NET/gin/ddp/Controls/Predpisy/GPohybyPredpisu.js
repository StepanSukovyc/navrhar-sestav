"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPohybyPredpisu.ts                             </Name>
//    <Description> Úprava pohybů předpisů                                      </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-03-09                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            // ? https://phabricator.gordic.cz/T4557
            let GPohybyPredpisu = class GPohybyPredpisu extends Gordic.GContentBase {
                /**
                 * Povolené znaky ve slovech účetní věty (0 - jen číslice, 1 - číslice i písmena kromě X a Y)
                 * @type {number}
                 */
                //##########################################################################################
                /** Hlavní metoda okna */
                onContentReady() {
                    const that = this;
                    // načtení cache pro datovou větu
                    //Gordic.Eko.WebClient.DataSentenceAdapter.getCacheContent(this.IxsRoz, this.IxsSax);
                    //that.setBreadcrumbs([{ caption: that.title, defaultAction: true }])
                    that.createActions();
                    that.createMainButtons();
                    that.createCastkyForm();
                    //that.createPohybForm(); // OBSOLETE -> sloučeno do jednoho formu
                    that.viewKontace = new Gordic.Isl.View(that.isl.PohybyPredpisu.listNahledKont(rq => {
                        return {
                            filters: {
                                typ_upr: that.modelPhl.Nastaveni?.typ_upr,
                                rok: new Date(that.modelPredpisu?.dat_vzniku).getFullYear(),
                                ktg_upo: that.modelPredpisu?.ktg_upo,
                            }
                        };
                    }));
                    that.viewKontace.getLoadingPromise().done(function () {
                        that.nastavDataSentence();
                        that.createCastkyGrid();
                        that.createPredkontaceGrid();
                        that.nactiData();
                    });
                }
                //########################################################################################
                //#region S E S T A V E N Í   O K N A
                /**
                 * Metoda pro vytvoření spodních tlačítek okna
                 * @method createMainButtons()
                 */
                createMainButtons() {
                    const that = this;
                    that.commandBar([
                        { action: that.actions["actMainOk"], position: "right", primary: true },
                        { action: that.actions["actMainClose"], position: "right" }
                    ]);
                }
                /**
                 * Metoda pro vytvoření formuláře s častkami a rozpisem předpisu
                 * @method createCastkyForm()
                 */
                createCastkyForm() {
                    const that = this;
                    let castkyForm = new Gordic.Forms.Form({ name: "GPohybyPredpisuCastkyForm", layoutDescriptor: "L3M3S3, L-4-8-0, M-4-8-0, S-12-12-0" }) // , customClass:"ddp-section-castky" 
                        //#region Sekce částek předpisu
                        .addSection({ name: "sectionCastkyPredpisu", label: "Částky předpisu", customClass: "ddp-section-width-big" }) //! Částky předpisu
                        .addRow()
                        .addText("Základ", "w-4 center")
                        .addText("Daň", "w-4 center")
                        .addText("Celkem", "w-4 center")
                        .addRow("Bez daně")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z0",
                        disabled: true,
                    })
                        .addText("", "w-4")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z0", // df_c_celk_bezdan
                        disabled: true
                    })
                        .addRow("Osvobozeno")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d0",
                        disabled: true,
                    })
                        .addText("", "w-4")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d0", // df_c_celk_osvob 
                        disabled: true,
                        //change: function (ev, input) {
                        //    that.prv_soucet_polozky();
                        //}
                    })
                        .addRow("První snížená")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z1",
                        disabled: true,
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd1").gfield("model", "apply", null);
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d1",
                        disabled: true,
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd1").gfield("model", "apply", null);
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_zd1", // df_c_celk_sniz
                        disabled: true,
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    let z = $(this).gform().findFields("c_z1").gfield("getValue");
                                    let d = $(this).gform().findFields("c_d1").gfield("getValue");
                                    let sum = z.add(d);
                                    $(this).gfield("setInitial", sum);
                                    return;
                                case "collect": return;
                                default: return "c_zd1";
                            }
                        }
                    })
                        .addRow("Druhá snížená")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z3",
                        disabled: true,
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd3").gfield("model", "apply", null);
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d3",
                        disabled: true,
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd3").gfield("model", "apply", null);
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_zd3", // df_c_celk_treti
                        disabled: true,
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    let z = $(this).gform().findFields("c_z3").gfield("getValue");
                                    let d = $(this).gform().findFields("c_d3").gfield("getValue");
                                    let sum = z.add(d);
                                    $(this).gfield("setInitial", sum);
                                    return;
                                case "collect": return;
                                default: return "c_zd3";
                            }
                        }
                    })
                        .addRow("Základní sazba")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z2",
                        disabled: true,
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd2").gfield("model", "apply", null);
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d2",
                        disabled: true,
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd2").gfield("model", "apply", null);
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_zd2", // df_c_celk_zakl 
                        disabled: true,
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    let z = $(this).gform().findFields("c_z2").gfield("getValue");
                                    let d = $(this).gform().findFields("c_d2").gfield("getValue");
                                    let sum = z.add(d);
                                    $(this).gfield("setInitial", sum);
                                    return;
                                case "collect": return;
                                default: return "c_zd2";
                            }
                        }
                    })
                        .addRow("Zaokrouhlení")
                        .addText("", "w-4")
                        .addText("", "w-4")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_zao",
                        disabled: true,
                    })
                        .addRow({ label: "Celkem", customClass: "right ddp-blue-text" })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_celkem", // Set df_c = df_c_celk_bezdan + df_c_celk_osvob + df_c_celk_sniz + df_c_celk_zakl + df_c_zao + df_c_celk_treti + df_c_celk_ctvrta
                        disabled: true,
                    })
                        //#endregion Sekce částek předpisu
                        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        //#region Sekce rozpis předpisu
                        .addSection({ name: "sectionRozpisPredpisu", label: "Rozpis předpisu", customClass: "ddp-section-width-big" }) //! Rozpis předpisu
                        .addRow()
                        .addText("Základ", "w-4 center")
                        .addText("Daň", "w-4 center")
                        .addText("Celkem", "w-4 center")
                        .addRow("Bez daně")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z0_polozky",
                        disabled: true,
                    })
                        .addText("", "w-4")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z0_polozky",
                        disabled: true,
                    })
                        .addRow("Osvobozeno")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d0_polozky",
                        disabled: true,
                    })
                        .addText("", "w-4")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d0_polozky",
                        disabled: true
                    })
                        .addRow("První snížená")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z1_polozky",
                        disabled: true,
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd1_polozky").gfield("model", "apply", null);
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d1_polozky",
                        disabled: true,
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd1_polozky").gfield("model", "apply", null);
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_zd1_polozky",
                        disabled: true,
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    let z = $(this).gform().findFields("c_z1_polozky").gfield("getValue");
                                    let d = $(this).gform().findFields("c_d1_polozky").gfield("getValue");
                                    let sum = z.add(d);
                                    $(this).gfield("setInitial", sum);
                                    return;
                                case "collect": return;
                                default: return "c_zd1_polozky";
                            }
                        }
                    })
                        .addRow("Druhá snížená")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z3_polozky",
                        disabled: true,
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd3_polozky").gfield("model", "apply", null);
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d3_polozky",
                        disabled: true,
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd3_polozky").gfield("model", "apply", null);
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_zd3_polozky",
                        disabled: true,
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    let z = $(this).gform().findFields("c_z3_polozky").gfield("getValue");
                                    let d = $(this).gform().findFields("c_d3_polozky").gfield("getValue");
                                    let sum = z.add(d);
                                    $(this).gfield("setInitial", sum);
                                    return;
                                case "collect": return;
                                default: return "c_zd3_polozky";
                            }
                        }
                    })
                        .addRow("Základní sazba")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z2_polozky",
                        disabled: true,
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd2_polozky").gfield("model", "apply", null);
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d2_polozky",
                        disabled: true,
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd2_polozky").gfield("model", "apply", null);
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_zd2_polozky",
                        disabled: true,
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    let z = $(this).gform().findFields("c_z2_polozky").gfield("getValue");
                                    let d = $(this).gform().findFields("c_d2_polozky").gfield("getValue");
                                    let sum = z.add(d);
                                    $(this).gfield("setInitial", sum);
                                    return;
                                case "collect": return;
                                default: return "c_zd2_polozky";
                            }
                        }
                    })
                        .addRow("Zaokrouhlení")
                        .addText("", "w-4")
                        .addText("", "w-4")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_zao_polozky",
                        disabled: true,
                    })
                        .addRow({ label: "Celkem", customClass: "right ddp-blue-text" })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_polozky", // Set df_c = df_c_celk_bezdan + df_c_celk_osvob + df_c_celk_sniz + df_c_celk_zakl + df_c_zao + df_c_celk_treti + df_c_celk_ctvrta
                        disabled: true,
                    })
                        //#endregion Sekce rozpis předpisu
                        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        //#region Sekce rozdíl částek
                        .addSection({ name: "sectionRozdilCastek", label: "Rozdíl", layoutDescriptor: "L-0-12-0, M-0-12-0, S-0-12-0", customClass: "ddp-section-width-small" }) //! Rozdíl
                        .addRow().addText("&nbsp;")
                        .addRow({ customClass: "left" })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_z0_rozdil", // Bez daně
                        disabled: true,
                    })
                        .addRow({ customClass: "left" })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_d0_rozdil", // Osvobozeno
                        disabled: true,
                    })
                        .addRow({ customClass: "left" })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_zd1_rozdil", // 1. snížená
                        disabled: true,
                    })
                        .addRow({ customClass: "left" })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_zd3_rozdil", // 2. snížená
                        disabled: true,
                    })
                        .addRow({ customClass: "left" })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_zd2_rozdil", // Základní
                        disabled: true,
                    })
                        .addRow({ customClass: "left" })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_zao_rozdil", // Zaokrouhleno
                        disabled: true,
                    })
                        .addRow({ customClass: "left" })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_rozdil", // Celkem
                        disabled: true,
                    })
                        //#endregion Sekce rozdíl částek
                        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        //#region Sekce PohybyPredpisuPohyby
                        .addSection({ name: "GPohybyPredpisuPohybySection", layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                        .addRow()
                        .addText("Typ účetního případu", "w-5")
                        .addText("Kategorie pohybu", "w-4")
                        .addText("Datum vzniku", "w-2")
                        .addText("Období", "w-1")
                        .addRow()
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.fucstup(), {
                        name: "typ_upr",
                        model: "model.typ_upr=value.typ_upr",
                        itemTemplate: "{typ_upr}-{nazev_upr}",
                        dropdown: true,
                        disabled: true,
                    })
                        .addField("gselectbox", "w-4", Gordic.Prefabs.Select.fuccupo(), {
                        name: "ktg_upo",
                        model: "model.ktg_upo=value.ktg_upo",
                        itemTemplate: "{ktg_upo}-{ktg_upo_txt}",
                        dropdown: true,
                        disabled: true,
                    })
                        .addField("gdatebox", "w-2", {
                        name: "dat_vzniku",
                        disabled: true,
                    })
                        .addField("gnumberbox", "w-1", {
                        name: "rok",
                        disabled: true,
                    });
                    that.$castkyFormDiv = $.newDiv("castkyFormDiv").appendTo(that.element).gform("createFrom", castkyForm);
                    //const form = that.element.findForms("GPohybyPredpisuCastkyForm")
                    //form.findFormSections("sectionCastkyPredpisu").css("width", "40% !important")
                    //form.findFormSections("sectionRozpisPredpisu").css("width", "40% !important")
                    //form.findFormSections("sectionRozdilCastek").css("width", "20% !important")           
                }
                /**
                 * Metoda pro vytvoření gridu s řádkama částek předpisu
                 * @method createCastkyGrid()
                 */
                createCastkyGrid() {
                    const that = this;
                    that.$gridCastky = $.newDiv("gridCastkyDiv")
                        //.css("height", "20%")
                        //.css("min-height", "15%")
                        .appendTo(this.element)
                        .gautofit({ minimalHeight: 200 })
                        .ggrid({
                        name: "gridCastky",
                        columnMode: "full",
                        navigationMode: "row", // row, cell
                        columns: WebClient.Common.GridFormats.PohybyPredpisuCastky(that, that.modelPhl, that.Ico),
                        //profileChange: function (ev, obj) {
                        //    // informace (varování), pokud změna v profilu může způsobit nemožnost editace. v takovém případě není povolena editace
                        //    if (that.$gridCastky) {
                        //        that.EditaceZapisu = Gordic.Eko.Grid.isStateForEditing(that.$grid1ZapisyPohybu, obj, true, that.$grid1ZapisyPohybuFlash, undefined, that.GridFormatZapisyPohybu, that.SortedCfuSet);
                        //    }
                        //},
                        //profileBeforeChange: (ev, obj) => {
                        //    // pokud se edituje, nejsou povoleny změny v gridu
                        //    return (this.$gridCastky?.find(".row.editing")?.length ?? 0) < 1;
                        //},
                    })
                        .gtab({
                        title: "Úč. pohyby",
                        opened: true,
                        menuBar: [
                            {
                                action: that.actions["actNovyRadek"],
                                favorite: true
                            },
                            {
                                action: that.actions["actOdstranitRadek"],
                                favorite: true
                            },
                            {
                                action: that.actions["actUlozPohyby"],
                                favorite: true,
                                align: "opposite",
                            }
                        ]
                    })
                        .ggridroweditor({
                        allowCopy: true,
                        beforeStart: function (ev, obj) {
                            // povolení editace se řídí stavem gridu a povolením příslušné akce na nový zápis nebo opravu zápisu
                            //return that.PovolenaEditaceZapisu && (that.actions.actNovyZapis!.enabled() || that.actions.actOpravaZapisu!.enabled());
                            return that.editable;
                        },
                        start: (ev, info) => {
                            //aktualizace prvků po začátku editace
                            debugger;
                        },
                        save: function (data, info) {
                            // uložení změn
                            debugger;
                        },
                        commit: function (ev, info) {
                            // znovunačtení seznamu (kvůli možné změně pohybu)                        
                            debugger;
                        },
                        cancel: (ev, info) => {
                            // aktualizace prvků po ukončení editace
                            that.soucetCastek();
                        }
                    });
                }
                /**
                 * Metoda pro vytvoření gridu s předkontacemi pohybu předpisu
                 * @method createPredkontaceGrid()
                 */
                createPredkontaceGrid() {
                    const that = this;
                    that.$gridPredkontace = $.newDiv("gridPredkontaceDiv")
                        //.css("height", "20%")
                        //.css("min-height", "15%")
                        .gautofit({ minimalHeight: 200 })
                        .appendTo(this.element)
                        .ggrid({
                        name: "gridPredkontace",
                        columnMode: "full",
                        columns: WebClient.Common.GridFormats.PohybyPredpisuPredkontace(that)
                    })
                        .gtab({
                        title: "Předkontace",
                        opened: true,
                        menuBar: [
                            {
                                action: that.actions["actNahledKont"],
                                favorite: true
                            },
                            {
                                action: that.actions["actNahledUcto"],
                                favorite: true
                            },
                        ]
                    });
                    if (that.viewKontace)
                        that.$gridPredkontace.ggrid("setData", that.viewKontace);
                }
                //#endregion S E S T A V E N Í   O K N A
                //########################################################################################
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actMainOk: Gordic.Eko.Action.actionOk({
                            enabled: true, //TODO: opravdu vždy TRUE ?
                            run: function () {
                                that.ok();
                            },
                            permission: undefined,
                        }),
                        actMainClose: Gordic.Eko.Action.actionZavrit({
                            enabled: true,
                            run: function () {
                                that.close(); // Metoda pro uzavření okna
                            },
                            permission: undefined,
                        }),
                        actNovyRadek: Gordic.Eko.Action.actionNovy({
                            description: "Nový řádek",
                            enabled: true,
                            run: function (ev, ctx) {
                                let dto = {
                                    novy_zapis: true,
                                    c: new Decimal(0),
                                    c_z0: new Decimal(0),
                                    c_z1: new Decimal(0),
                                    c_z2: new Decimal(0),
                                    c_z3: new Decimal(0),
                                    c_z4: new Decimal(0),
                                    c_d0: new Decimal(0),
                                    c_d1: new Decimal(0),
                                    c_d2: new Decimal(0),
                                    c_d3: new Decimal(0),
                                    c_d4: new Decimal(0),
                                    c_zao: new Decimal(0),
                                    //ulozeno: 0,
                                };
                                // spuštění editace nového řádku
                                that.$gridCastky?.ggridroweditor("addRow", dto);
                            },
                            permission: undefined,
                        }),
                        actOdstranitRadek: Gordic.Eko.Action.actionOdstranit({
                            description: "Odstranit řádek",
                            enabled: true,
                            run: function (ev, ctx) {
                                that.dialogs.messageBox("Upozornění", "Akce ještě není implementovaná");
                            },
                            permission: undefined,
                        }),
                        actUlozPohyby: Gordic.Eko.Action.actionUlozit({
                            description: "Uložit pohyby",
                            enabled: true,
                            run: function (ev, ctx) {
                                that.dialogs.messageBox("Upozornění", "Akce ještě není implementovaná");
                            },
                            permission: undefined,
                        }),
                        actNahledKont: {
                            caption: "Náhled kon.",
                            description: "Náhled kontací",
                            enabled: true,
                            run: function (ev, ctx) {
                                that.nactiDataGriduKontace(0);
                            },
                            permission: undefined,
                        },
                        actNahledUcto: {
                            caption: "Náhled účt.",
                            description: "Náhled účtování",
                            enabled: true,
                            run: function (ev, ctx) {
                                that.nactiDataGriduKontace(1);
                            },
                            permission: undefined,
                        },
                    });
                }
                nactiData() {
                    const that = this;
                    const form1 = that.element.findForms("GPohybyPredpisuCastkyForm");
                    //const form2 = that.element.findForms("GPohybyPredpisuPohybyForm")
                    form1.findFields().gfield("model", "apply", that.modelPredpisu, { initialValues: true }); // c_z0, c_z1, c_z2, c_z3, c_z4, c_d0, c_d1, c_d2, c_d3, c_d4, c_zao
                    form1.findFormSections("GPohybyPredpisuPohybySection").findFields("typ_upr").gfield("model", "apply", { typ_upr: that.modelPhl?.Nastaveni?.typ_upr }, { initialValues: true });
                    form1.findFormSections("GPohybyPredpisuPohybySection").findFields("ktg_upo").gfield("model", "apply", { ktg_upo: that.modelPredpisu?.ktg_upo }, { initialValues: true });
                    form1.findFormSections("GPohybyPredpisuPohybySection").findFields("dat_vzniku").gfield("setValue", that.modelPredpisu?.dat_vzniku, { initialValues: true });
                    form1.findFormSections("GPohybyPredpisuPohybySection").findFields("rok").gfield("setValue", new Date(that.modelPredpisu?.dat_vzniku).getFullYear(), { initialValues: true });
                    that.nactiDataGriduCastek();
                    //that.nactiDataGriduKontace(0);
                    //TODO: toto...
                    //if (!that.editable) {
                    //    that.actions.getActions().find(e => e.name == "actNovyRadek")?.enabled(false);
                    //    that.actions.getActions().find(e => e.name == "actOdstranitRadek")?.enabled(false);
                    //    that.actions.getActions().find(e => e.name == "actUlozPohyby")?.enabled(false);
                    //    that.actions.getActions().find(e => e.name == "actMainOk")?.enabled(false);
                    //}
                }
                nactiDataGriduCastek() {
                    const that = this;
                    //if (!that.viewPohyby) {
                    that.viewPohyby = new Gordic.Isl.View(that.isl.PohybyPredpisu.list(rq => {
                        return {
                            filters: {
                                ixp: that.Ixp,
                                radek_uhr: that.Radek_uhr
                            },
                        };
                    }));
                    that.$gridCastky.ggrid("setData", that.viewPohyby);
                    that.viewPohyby.getLoadingPromise().done(function () {
                        that.soucetCastek();
                    });
                    //} else {
                    //    that.viewPohyby.requestData().done(function (ret) {
                    //        /**/
                    //    });
                    //}            
                }
                nactiDataGriduKontace(mod_zobrazeni) {
                    const that = this;
                    if (mod_zobrazeni == 0) {
                        that.viewKontace = new Gordic.Isl.View(that.isl.PohybyPredpisu.listNahledKont(rq => {
                            return {
                                filters: {
                                    typ_upr: that.modelPhl.Nastaveni?.typ_upr,
                                    rok: new Date(that.modelPredpisu?.dat_vzniku).getFullYear(),
                                    ktg_upo: that.modelPredpisu?.ktg_upo,
                                }
                            };
                        }));
                        that.$gridPredkontace.ggrid("setData", that.viewKontace);
                        that.viewKontace.getLoadingPromise().done(function () {
                        });
                    }
                    else {
                        that.viewKontace = new Gordic.Isl.View(that.isl.PohybyPredpisu.listNahledUct(rq => {
                            return {
                                filters: {
                                    ixp: that.Ixp,
                                },
                            };
                        }));
                        that.$gridPredkontace.ggrid("setData", that.viewKontace);
                        that.viewKontace.getLoadingPromise().done(function () {
                        });
                    }
                }
                soucetCastek() {
                    const that = this;
                    const form = that.element.findForms("GPohybyPredpisuCastkyForm");
                    let c_z0 = form.findFields("c_z0").gfield("getValue");
                    let c_z1 = form.findFields("c_z1").gfield("getValue");
                    let c_z2 = form.findFields("c_z2").gfield("getValue");
                    let c_z3 = form.findFields("c_z3").gfield("getValue");
                    //let c_z4 = form.findFields("c_z4").gfield<Decimal>("getValue");
                    let c_d0 = form.findFields("c_d0").gfield("getValue");
                    let c_d1 = form.findFields("c_d1").gfield("getValue");
                    let c_d2 = form.findFields("c_d2").gfield("getValue");
                    let c_d3 = form.findFields("c_d3").gfield("getValue");
                    //let c_d4: Decimal = form.findFields("c_d4").gfield<Decimal>("getValue");
                    let c_zao = form.findFields("c_zao").gfield("getValue");
                    let l_celk;
                    l_celk = c_z0.plus(c_d0).plus(c_z1).plus(c_d1).plus(c_z2).plus(c_d2).plus(c_z3).plus(c_d3).plus(c_zao) /*.plus(c_z4).plus(c_d4)*/;
                    form.findFields("c_celkem").gfield("setValue", l_celk, { initialValues: true });
                    that.soucetPohybu();
                }
                soucetPohybu() {
                    const that = this;
                    const form = that.element.findForms("GPohybyPredpisuCastkyForm");
                    let c_z0_p = form.findFields("c_z0_polozky").gfield("getValue");
                    let c_z1_p = form.findFields("c_z1_polozky").gfield("getValue");
                    let c_z2_p = form.findFields("c_z2_polozky").gfield("getValue");
                    let c_z3_p = form.findFields("c_z3_polozky").gfield("getValue");
                    //let c_z4_p: Decimal = form.findFields("c_z4_polozky").gfield<Decimal>("getValue");
                    let c_d0_p = form.findFields("c_d0_polozky").gfield("getValue");
                    let c_d1_p = form.findFields("c_d1_polozky").gfield("getValue");
                    let c_d2_p = form.findFields("c_d2_polozky").gfield("getValue");
                    let c_d3_p = form.findFields("c_d3_polozky").gfield("getValue");
                    //let c_d4_p: Decimal = form.findFields("c_d4_polozky").gfield<Decimal>("getValue");
                    let c_zao_p = form.findFields("c_zao_polozky").gfield("getValue");
                    let c_p = new Decimal(0);
                    let pohyby = that.$gridCastky.ggrid("getView");
                    if (pohyby.getCount() > 0) { // if (pohyby.length > 0)
                        pohyby.getDataRows().forEach((item) => {
                            //pohyby.forEach((item) => {
                            if (item.c_z0)
                                c_z0_p = c_z0_p.plus(item.c_z0);
                            if (item.c_z1)
                                c_z1_p = c_z1_p.plus(item.c_z1);
                            if (item.c_z2)
                                c_z2_p = c_z2_p.plus(item.c_z2);
                            if (item.c_z3)
                                c_z3_p = c_z3_p.plus(item.c_z3);
                            // if (item.c_z4) c_z4_p = c_z4_p.plus(item.c_z4);
                            if (item.c_d0)
                                c_d0_p = c_d0_p.plus(item.c_d0);
                            if (item.c_d1)
                                c_d1_p = c_d1_p.plus(item.c_d1);
                            if (item.c_d2)
                                c_d2_p = c_d2_p.plus(item.c_d2);
                            if (item.c_d3)
                                c_d3_p = c_d3_p.plus(item.c_d3);
                            // if (item.c_d4) c_d4_p = c_d4_p.plus(item.c_d4);
                            if (item.c_zao)
                                c_zao_p = c_zao_p.plus(item.c_zao);
                            if (item.c)
                                c_p = c_p.plus(item.c);
                        });
                        form.findFields("c_z0_polozky").gfield("setValue", c_z0_p, { initialValues: true });
                        form.findFields("c_z1_polozky").gfield("setValue", c_z1_p, { initialValues: true });
                        form.findFields("c_z2_polozky").gfield("setValue", c_z2_p, { initialValues: true });
                        form.findFields("c_z3_polozky").gfield("setValue", c_z3_p, { initialValues: true });
                        //form.findFields("c_z4_polozky").gfield("setValue", c_z4_p, { initialValues: true });
                        form.findFields("c_d0_polozky").gfield("setValue", c_d0_p, { initialValues: true });
                        form.findFields("c_d1_polozky").gfield("setValue", c_d1_p, { initialValues: true });
                        form.findFields("c_d2_polozky").gfield("setValue", c_d2_p, { initialValues: true });
                        form.findFields("c_d3_polozky").gfield("setValue", c_d3_p, { initialValues: true });
                        //form.findFields("c_d4_polozky").gfield("setValue", c_d4_p, { initialValues: true });
                        form.findFields("c_zao_polozky").gfield("setValue", c_zao_p, { initialValues: true });
                        let l_celk_polozky;
                        l_celk_polozky = c_z0_p.plus(c_d0_p).plus(c_z1_p).plus(c_d1_p).plus(c_z2_p).plus(c_d2_p).plus(c_z3_p).plus(c_d3_p).plus(c_zao_p) /*.plus(c_z4_p).plus(c_d4_p)*/;
                        if (l_celk_polozky != c_p)
                            l_celk_polozky = c_p;
                        form.findFields("c_polozky").gfield("setValue", l_celk_polozky, { initialValues: true });
                        that.rozdilyCastek(pohyby.getCount());
                    }
                }
                rozdilyCastek(pocet) {
                    const that = this;
                    const form = that.element.findForms("GPohybyPredpisuCastkyForm");
                    const nula = new Decimal(0);
                    //
                    let c_z0 = form.findFields("c_z0").gfield("getValue");
                    let c_d0 = form.findFields("c_d0").gfield("getValue");
                    let c_zd1 = form.findFields("c_zd1").gfield("getValue");
                    let c_zd2 = form.findFields("c_zd2").gfield("getValue");
                    let c_zd3 = form.findFields("c_zd3").gfield("getValue");
                    //let c_zd4: Decimal = form.findFields("c_zd4").gfield<Decimal>("getValue");
                    let c_zao = form.findFields("c_zao").gfield("getValue");
                    let c_celkem = form.findFields("c_celkem").gfield("getValue");
                    //
                    let c_z0_p = form.findFields("c_z0_polozky").gfield("getValue");
                    let c_d0_p = form.findFields("c_d0_polozky").gfield("getValue");
                    let c_zd1_p = form.findFields("c_zd1_polozky").gfield("getValue");
                    let c_zd2_p = form.findFields("c_zd2_polozky").gfield("getValue");
                    let c_zd3_p = form.findFields("c_zd3_polozky").gfield("getValue");
                    //let c_zd4_p: Decimal = form.findFields("c_zd4_polozky").gfield<Decimal>("getValue");
                    let c_zao_p = form.findFields("c_zao_polozky").gfield("getValue");
                    let c_polozky = form.findFields("c_polozky").gfield("getValue");
                    //
                    let c_z0_rozdil = c_z0.minus(c_z0_p);
                    let c_d0_rozdil = c_d0.minus(c_d0_p);
                    let c_zd1_rozdil = c_zd1.minus(c_zd1_p);
                    let c_zd2_rozdil = c_zd2.minus(c_zd2_p);
                    let c_zd3_rozdil = c_zd3.minus(c_zd3_p);
                    //let c_zd4_rozdil: Decimal = c_zd4.minus(c_zd4_p); 
                    let c_zao_rozdil = c_zao.minus(c_zao_p);
                    let c_rozdil = c_celkem.minus(c_polozky);
                    //
                    form.findFields("c_z0_rozdil").gfield("setValue", c_z0_rozdil, { initialValues: true });
                    form.findFields("c_d0_rozdil").gfield("setValue", c_d0_rozdil, { initialValues: true });
                    form.findFields("c_zd1_rozdil").gfield("setValue", c_zd1_rozdil, { initialValues: true });
                    form.findFields("c_zd2_rozdil").gfield("setValue", c_zd2_rozdil, { initialValues: true });
                    form.findFields("c_zd3_rozdil").gfield("setValue", c_zd3_rozdil, { initialValues: true });
                    //form.findFields("c_zd4_rozdil").gfield("setValue", c_zd4_rozdil, { initialValues: true });
                    form.findFields("c_zao_rozdil").gfield("setValue", c_zao_rozdil, { initialValues: true });
                    form.findFields("c_rozdil").gfield("setValue", c_rozdil, { initialValues: true });
                    //
                    if (pocet > 0 || (c_z0_rozdil.equals(nula) && c_d0_rozdil.equals(nula) && c_zd1_rozdil.equals(nula) && c_zd3_rozdil.equals(nula) && c_zd2_rozdil.equals(nula) && c_zao_rozdil.equals(nula) && c_rozdil.equals(nula))) {
                        that.actions.getActions().find(e => e.name == "actMainOk")?.enabled(true);
                        that.actions.getActions().find(e => e.name == "actMainClose")?.enabled(true);
                    }
                    else {
                        that.actions.getActions().find(e => e.name == "actMainOk")?.enabled(false);
                        that.actions.getActions().find(e => e.name == "actMainClose")?.enabled(false);
                    }
                    that.nastavBarvuPriRozdilu("c_z0_rozdil", c_z0_rozdil);
                    that.nastavBarvuPriRozdilu("c_d0_rozdil", c_d0_rozdil);
                    that.nastavBarvuPriRozdilu("c_zd1_rozdil", c_zd1_rozdil);
                    that.nastavBarvuPriRozdilu("c_zd2_rozdil", c_zd2_rozdil);
                    that.nastavBarvuPriRozdilu("c_zd3_rozdil", c_zd3_rozdil);
                    //that.nastavBarvuPriRozdilu("c_zd4_rozdil", c_zd4_rozdil);
                    that.nastavBarvuPriRozdilu("c_zao_rozdil", c_zao_rozdil);
                    that.nastavBarvuPriRozdilu("c_rozdil", c_rozdil);
                }
                nastavBarvuPriRozdilu(nazev, castka) {
                    const that = this;
                    const form = that.element.findForms("GPohybyPredpisuCastkyForm");
                    const nula = new Decimal(0);
                    var fieldSet = form.findFields(nazev);
                    if (!castka.eq(nula)) {
                        fieldSet.css("color", "#FF0000");
                    }
                    else {
                        fieldSet.removeAttr("style");
                    }
                }
                nastavDataSentence() {
                    const that = this;
                    const editableFields = ['uea', 'ueb', 'uec', 'ued', 'uee', 'uef', 'ueg', 'ueh', 'uei', 'uej', 'te0', 'te1', 'te2', 'te3', 'te4', 'uek', 'uel', 'uem', 'uen', 'te5', 'te6', 'te7', 'te8', 'te9'];
                    that["dataSentence"].rok = that.Rok;
                    //nejprve nastavím všechny řádky ne needitovatelné
                    that["dataSentence"].allSortedDataWords?.forEach((radek) => {
                        radek.CanEdit = false;
                    });
                    //poté projedu načtené kontace a porovnám jednotlivé sloupce zda se mohou editovat
                    that.viewKontace.getDataRows().forEach((radek) => {
                        editableFields.forEach((fieldName) => {
                            const value = radek[fieldName]?.trim?.();
                            if (value && value[0] === '#') {
                                const word = that["dataSentence"].allSortedDataWords?.find(w => w.DbNazev === fieldName);
                                if (word) {
                                    word.CanEdit = true;
                                }
                            }
                        });
                    });
                }
                ///**
                // * Zjištění maximálního čísla řádku
                // * @returns {number} maximální číslo řádku (0 pokud žádný neexistuje)
                // */
                //private maxRadekUhr(): number {
                //    // cykl přes všechny existující zápisy
                //    let maxRadek = 0;
                //    if (this.$gridCastky) {
                //        let data = this.$gridCastky.ggrid<Gordic.Ddp.Interface.GPohybyPredpisuDto>("getView").getDataRows(true, "view");
                //        for (let i = 0, l = data.length; i < l; i++) {
                //            maxRadek = Math.max(maxRadek, data[i].data.radek_uhr!);
                //        }
                //    }
                //    return maxRadek;
                //}
                /**
                 * Metoda pro kladné uzavření okna
                 * @method ok()
                 */
                ok() {
                    const that = this;
                    return that.dialogs.alert("OK", "OK");
                }
                /**
                 * Metoda pro vytvoření formuláře s detailem pohybu předpisu
                 * @method createPohybForm()
                 * @obsolete
                 */
                createPohybForm() {
                    const that = this;
                    let pohybyForm = new Gordic.Forms.Form({ name: "GPohybyPredpisuPohybyForm", layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                        .addSection()
                        .addRow()
                        .addText("Typ účetního případu", "w-5")
                        .addText("Kategorie pohybu", "w-4")
                        .addText("Datum vzniku", "w-2")
                        .addText("Období", "w-1")
                        .addRow()
                        .addField("gselectbox", "w-5", Gordic.Prefabs.Select.fucstup(), {
                        name: "typ_upr",
                        model: "model.typ_upr=value.typ_upr",
                        itemTemplate: "{typ_upr}-{nazev_upr}",
                        dropdown: true,
                        disabled: true,
                    })
                        .addField("gselectbox", "w-4", Gordic.Prefabs.Select.fuccupo(), {
                        name: "ktg_upo",
                        model: "model.ktg_upo=value.ktg_upo",
                        itemTemplate: "{ktg_upo}-{ktg_upo_txt}",
                        dropdown: true,
                        disabled: true,
                    })
                        .addField("gdatebox", "w-2", {
                        name: "dat_vzniku",
                        disabled: true,
                    })
                        .addField("gnumberbox", "w-1", {
                        name: "rok",
                        disabled: true,
                    });
                    that.$pohybyFormDiv = $.newDiv("pohybyFormDiv").appendTo(that.element).gform("createFrom", pohybyForm);
                }
            };
            GPohybyPredpisu = __decorate([
                Decorators.gcontent
            ], GPohybyPredpisu);
            WebClient.GPohybyPredpisu = GPohybyPredpisu;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1BvaHlieVByZWRwaXN1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1BvaHlieVByZWRwaXN1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsK0ZBQStGO0FBQy9GLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBdytCZjtBQXgrQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBdytCbkI7SUF4K0JnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F3K0I3QjtRQXgrQm9CLFdBQUEsU0FBUztZQUMxQix3Q0FBd0M7WUFFeEMsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxPQUFBLFlBQVk7Z0JBNkY3Qzs7O21CQUdHO2dCQUNILDRGQUE0RjtnQkFDNUYseUJBQXlCO2dCQUN6QixjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsaUNBQWlDO29CQUNqQyxxRkFBcUY7b0JBQ3JGLHFFQUFxRTtvQkFDckUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztvQkFDekIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLGtFQUFrRTtvQkFDbEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUU7d0JBQ3hFLE9BQU87NEJBQ0gsT0FBTyxFQUFFO2dDQUNMLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxPQUFPO2dDQUN6QyxHQUFHLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxVQUFXLENBQUMsQ0FBQyxXQUFXLEVB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LEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkMsQ0FBQyxDQUFDLENBQUE7d0JBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO3dCQUNwRixJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7d0JBQ3BGLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzt3QkFDcEYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO3dCQUNwRixzRkFBc0Y7d0JBQ3RGLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzt3QkFDcEYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO3dCQUNwRixJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7d0JBQ3BGLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFB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LENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRTt3QkFDM0IsSUFBSSxFQUFFLEtBQUs7d0JBQ1gsUUFBUSxFQUFFLElBQUk7cUJBQ2pCLENBQUMsQ0FpQkQ7b0JBQ0wsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDM0csQ0FBQzthQUVKLENBQUE7WUFwK0JZLGVBQWU7Z0JBRDNCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsZUFBZSxDQW8rQjNCO1lBcCtCWSx5QkFBZSxrQkFvK0IzQixDQUFBO1FBQ0wsQ0FBQyxFQXgrQm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXcrQjdCO0lBQUQsQ0FBQyxFQXgrQmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXcrQm5CO0FBQUQsQ0FBQyxFQXgrQlMsTUFBTSxLQUFOLE1BQU0sUUF3K0JmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdQb2h5YnlQcmVkcGlzdS50cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IMOacHJhdmEgcG9oeWLFryBwxZllZHBpc8WvICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIyLTAzLTA5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG4gICAgLy8gPyBodHRwczovL3BoYWJyaWNhdG9yLmdvcmRpYy5jei9UNDU1N1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUG9oeWJ5UHJlZHBpc3UgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIC8vIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIElkZW50aWZpa8OhdG9yIHDFmcOtcGFkdSBERFAgXHJcbiAgICAgICAgICogQHR5cGUge3N0cmluZ30gXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgSXhwOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIMWYw6FkZWsgw7pocmFkeSAoSUQgcMWZZWRwaXN1KSBcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfSBcclxuICAgICAgICAgKi9cclxuICAgICAgICBSYWRla191aHI6IG51bWJlcjtcclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICogSUQgVHlwdSBwb2hsZWTDoXZreSBcclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfSBcclxuICAgICAgICAgKi9cclxuICAgICAgICBUeXBfcGhsOiBzdHJpbmc7ICAgIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJvayAoZGxlIGRhdGEgdnpuaWt1IHDFmWVkcGlzdSlcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgUm9rOiBudW1iZXI7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dcOhbG7DrSBJxIxPXHJcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEljbzogc3RyaW5nO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEl4cyByb3p2cmh1XHJcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEl4c1Jvejogc3RyaW5nO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEl4cyBDRlNcclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSXhzU2F4OiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIFprcmF0a2EgTktTIFxyXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBOa3Naa3I6IHN0cmluZztcclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICogUG92b2xlbsOpIHpuYWt5IHYgw7rEjS4gdsSbdMSbIFxyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBQb3ZvbGVuZVpuYWt5VlVlVGU6IG51bWJlcjtcclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICogRGF0YSBwcm8gbmFzdGF2ZW7DrSBrb250YWPDrSB2IGdyaWRkdSBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGRhdGFTZW50ZW5jZTogR29yZGljLkVrby5XZWJDbGllbnQuR0RhdGFTZW50ZW5jZUR0bztcclxuICAgICAgICAvKiogUMWZw616bmFrIGVkaXRhY2UgKi9cclxuICAgICAgICBlZGl0YWJsZTogYm9vbGVhbjtcclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICogRGl2IGRyxb7DrWPDrSBmb3JtdWzDocWZIMSNw6FzdGVrIFxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnk8SFRNTEVsZW1lbnQ+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgJGNhc3RreUZvcm1EaXY6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGl2IGRyxb7DrWPDrSBmb3JtdWzDocWZIHBvaHlidSBcclxuICAgICAgICAgKiBAdHlwZSB7SlF1ZXJ5PEhUTUxFbGVtZW50Pn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlICRwb2h5YnlGb3JtRGl2OiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdyaWQgcMWZZWRrb250YWNlXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlICRncmlkUHJlZGtvbnRhY2U6IEpRdWVyeTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHcmlkIHDFmWVka29udGFjZVxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZENhc3RreTogSlF1ZXJ5O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIElTTCBWaWV3IFBybyDEjcOhc3RreSBwb2h5YnVcclxuICAgICAgICAgKiBAdHlwZSB7SXNsLlZpZXc8Pn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHZpZXdQb2h5Ynk6IElzbC5WaWV3PERkcC5JbnRlcmZhY2UuR1BvaHlieVByZWRwaXN1RHRvPjtcclxuICAgICAgICAvKipcclxuICAgICAgICAqIElTTCBWaWV3IFBybyBrb250YWNlXHJcbiAgICAgICAgKiBAdHlwZSB7SXNsLlZpZXc8Pn1cclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgdmlld0tvbnRhY2U6IElzbC5WaWV3PERkcC5JbnRlcmZhY2UuR1BvaHlieVByZWRwaXN1S29udGFjZUR0bz47IFxyXG4gICAgICAgIC8qKiBcclxuICAgICAgICAgKiAgRFRPIFR5cHUgcG9obGVkw6F2a3lcclxuICAgICAgICAgKiAgQHR5cGUge0dvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVHlwUG9obGVkYXZreUR0b31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgbW9kZWxQaGw6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVHlwUG9obGVkYXZreUR0bztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgRFRPIHDFmWVkcGlzdVxyXG4gICAgICAgICAqICBAdHlwZSB7R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmVkcGlzRHRvfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBtb2RlbFByZWRwaXN1OiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByZWRwaXNEdG87XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUG92b2xlbsOpIHpuYWt5IHZlIHNsb3ZlY2ggw7rEjWV0bsOtIHbEm3R5ICgwIC0gamVuIMSNw61zbGljZSwgMSAtIMSNw61zbGljZSBpIHDDrXNtZW5hIGtyb23EmyBYIGEgWSlcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqLyAgICAgICAgXHJcbiAgICAgICAgLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuICAgICAgICAvKiogSGxhdm7DrSBtZXRvZGEgb2tuYSAqL1xyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy8gbmHEjXRlbsOtIGNhY2hlIHBybyBkYXRvdm91IHbEm3R1XHJcbiAgICAgICAgICAgIC8vR29yZGljLkVrby5XZWJDbGllbnQuRGF0YVNlbnRlbmNlQWRhcHRlci5nZXRDYWNoZUNvbnRlbnQodGhpcy5JeHNSb3osIHRoaXMuSXhzU2F4KTtcclxuICAgICAgICAgICAgLy90aGF0LnNldEJyZWFkY3J1bWJzKFt7IGNhcHRpb246IHRoYXQudGl0bGUsIGRlZmF1bHRBY3Rpb246IHRydWUgfV0pXHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZU1haW5CdXR0b25zKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlQ2FzdGt5Rm9ybSgpO1xyXG4gICAgICAgICAgICAvL3RoYXQuY3JlYXRlUG9oeWJGb3JtKCk7IC8vIE9CU09MRVRFIC0+IHNsb3XEjWVubyBkbyBqZWRub2hvIGZvcm11XHJcbiAgICAgICAgICAgIHRoYXQudmlld0tvbnRhY2UgPSBuZXcgSXNsLlZpZXcodGhhdC5pc2wuUG9oeWJ5UHJlZHBpc3UubGlzdE5haGxlZEtvbnQocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cF91cHI6IHRoYXQubW9kZWxQaGwuTmFzdGF2ZW5pPy50eXBfdXByLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2s6IG5ldyBEYXRlKHRoYXQubW9kZWxQcmVkcGlzdT8uZGF0X3Z6bmlrdSEpLmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGt0Z191cG86IHRoYXQubW9kZWxQcmVkcGlzdT8ua3RnX3VwbyxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgdGhhdC52aWV3S29udGFjZS5nZXRMb2FkaW5nUHJvbWlzZSgpLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZEYXRhU2VudGVuY2UoKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuY3JlYXRlQ2FzdGt5R3JpZCgpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoYXQuY3JlYXRlUHJlZGtvbnRhY2VHcmlkKCk7IFxyXG4gICAgICAgICAgICAgICAgdGhhdC5uYWN0aURhdGEoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuICAgICAgICAvLyNyZWdpb24gUyBFIFMgVCBBIFYgRSBOIMONICAgTyBLIE4gQVxyXG4gICAgICAgIC8qKiBcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHZ5dHZvxZllbsOtIHNwb2Ruw61jaCB0bGHEjcOtdGVrIG9rbmEgXHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVNYWluQnV0dG9ucygpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNYWluQnV0dG9ucygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcihbXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0TWFpbk9rXCJdLCBwb3NpdGlvbjogXCJyaWdodFwiLCBwcmltYXJ5OiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0TWFpbkNsb3NlXCJdLCBwb3NpdGlvbjogXCJyaWdodFwiIH1cclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHZ5dHZvxZllbsOtIGZvcm11bMOhxZllIHMgxI1hc3RrYW1pIGEgcm96cGlzZW0gcMWZZWRwaXN1IFxyXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlQ2FzdGt5Rm9ybSgpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDYXN0a3lGb3JtKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGNhc3RreUZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIkdQb2h5YnlQcmVkcGlzdUNhc3RreUZvcm1cIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMM00zUzMsIEwtNC04LTAsIE0tNC04LTAsIFMtMTItMTItMFwiIH0pIC8vICwgY3VzdG9tQ2xhc3M6XCJkZHAtc2VjdGlvbi1jYXN0a3lcIiBcclxuICAgICAgICAgICAgICAgIC8vI3JlZ2lvbiBTZWtjZSDEjcOhc3RlayBwxZllZHBpc3VcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgbmFtZTogXCJzZWN0aW9uQ2FzdGt5UHJlZHBpc3VcIiwgbGFiZWw6IFwixIzDoXN0a3kgcMWZZWRwaXN1XCIsIGN1c3RvbUNsYXNzOiBcImRkcC1zZWN0aW9uLXdpZHRoLWJpZ1wiIH0pIC8vISDEjMOhc3RreSBwxZllZHBpc3VcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJaw6FrbGFkXCIsIFwidy00IGNlbnRlclwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJEYcWIXCIsIFwidy00IGNlbnRlclwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJDZWxrZW1cIiwgXCJ3LTQgY2VudGVyXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiQmV6IGRhbsSbXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfejBcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlwiLCBcInctNFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3owXCIsIC8vIGRmX2NfY2Vsa19iZXpkYW5cclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJPc3ZvYm96ZW5vXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfZDBcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlwiLCBcInctNFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX2QwXCIsIC8vIGRmX2NfY2Vsa19vc3ZvYiBcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2NoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHRoYXQucHJ2X3NvdWNldF9wb2xvemt5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBydm7DrSBzbsOtxb5lbsOhXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfejFcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3pkMVwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfZDFcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3pkMVwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfemQxXCIsIC8vIGRmX2NfY2Vsa19zbml6XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcGVyYXRpb24sIGR0bywgbW9kZWxPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgeiA9ICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196MVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZCA9ICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY19kMVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3VtID0gei5hZGQoZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJzZXRJbml0aWFsXCIsIHN1bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvbGxlY3RcIjogcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIFwiY196ZDFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRHJ1aMOhIHNuw63FvmVuw6FcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY196M1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfemQzXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19kM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfemQzXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY196ZDNcIiwgLy8gZGZfY19jZWxrX3RyZXRpXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcGVyYXRpb24sIGR0bywgbW9kZWxPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgeiA9ICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196M1wiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZCA9ICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY19kM1wiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3VtID0gei5hZGQoZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJzZXRJbml0aWFsXCIsIHN1bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvbGxlY3RcIjogcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIFwiY196ZDNcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiWsOha2xhZG7DrSBzYXpiYVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3oyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196ZDJcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX2QyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196ZDJcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3pkMlwiLCAvLyBkZl9jX2NlbGtfemFrbCBcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogZnVuY3Rpb24gKG9wZXJhdGlvbiwgZHRvLCBtb2RlbE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJhcHBseVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB6ID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3oyXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX2QyXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdW0gPSB6LmFkZChkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInNldEluaXRpYWxcIiwgc3VtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY29sbGVjdFwiOiByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gXCJjX3pkMlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJaYW9rcm91aGxlbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlwiLCBcInctNFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJcIiwgXCJ3LTRcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY196YW9cIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIkNlbGtlbVwiLCBjdXN0b21DbGFzczogXCJyaWdodCBkZHAtYmx1ZS10ZXh0XCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19jZWxrZW1cIiwgLy8gU2V0IGRmX2MgPSBkZl9jX2NlbGtfYmV6ZGFuICsgZGZfY19jZWxrX29zdm9iICsgZGZfY19jZWxrX3NuaXogKyBkZl9jX2NlbGtfemFrbCArIGRmX2NfemFvICsgZGZfY19jZWxrX3RyZXRpICsgZGZfY19jZWxrX2N0dnJ0YVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vI2VuZHJlZ2lvbiBTZWtjZSDEjcOhc3RlayBwxZllZHBpc3VcclxuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAgICAgLy8jcmVnaW9uIFNla2NlIHJvenBpcyBwxZllZHBpc3VcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgbmFtZTogXCJzZWN0aW9uUm96cGlzUHJlZHBpc3VcIiwgbGFiZWw6IFwiUm96cGlzIHDFmWVkcGlzdVwiLCBjdXN0b21DbGFzczogXCJkZHAtc2VjdGlvbi13aWR0aC1iaWdcIiB9KSAvLyEgUm96cGlzIHDFmWVkcGlzdVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlrDoWtsYWRcIiwgXCJ3LTQgY2VudGVyXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIkRhxYhcIiwgXCJ3LTQgY2VudGVyXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIkNlbGtlbVwiLCBcInctNCBjZW50ZXJcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJCZXogZGFuxJtcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY196MF9wb2xvemt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJcIiwgXCJ3LTRcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY196MF9wb2xvemt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk9zdm9ib3plbm9cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19kMF9wb2xvemt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJcIiwgXCJ3LTRcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19kMF9wb2xvemt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUHJ2bsOtIHNuw63FvmVuw6FcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY196MV9wb2xvemt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196ZDFfcG9sb3preVwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfZDFfcG9sb3preVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfemQxX3BvbG96a3lcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3pkMV9wb2xvemt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcGVyYXRpb24sIGR0bywgbW9kZWxPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgeiA9ICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196MV9wb2xvemt5XCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX2QxX3BvbG96a3lcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN1bSA9IHouYWRkKGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwic2V0SW5pdGlhbFwiLCBzdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsZWN0XCI6IHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBcImNfemQxX3BvbG96a3lcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRHJ1aMOhIHNuw63FvmVuw6FcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY196M19wb2xvemt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196ZDNfcG9sb3preVwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfZDNfcG9sb3preVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfemQzX3BvbG96a3lcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3pkM19wb2xvemt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcGVyYXRpb24sIGR0bywgbW9kZWxPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgeiA9ICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196M19wb2xvemt5XCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX2QzX3BvbG96a3lcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN1bSA9IHouYWRkKGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwic2V0SW5pdGlhbFwiLCBzdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsZWN0XCI6IHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBcImNfemQzX3BvbG96a3lcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiWsOha2xhZG7DrSBzYXpiYVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3oyX3BvbG96a3lcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3pkMl9wb2xvemt5XCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19kMl9wb2xvemt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196ZDJfcG9sb3preVwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfemQyX3BvbG96a3lcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogZnVuY3Rpb24gKG9wZXJhdGlvbiwgZHRvLCBtb2RlbE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJhcHBseVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB6ID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3oyX3BvbG96a3lcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGQgPSAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfZDJfcG9sb3preVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3VtID0gei5hZGQoZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJzZXRJbml0aWFsXCIsIHN1bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvbGxlY3RcIjogcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIFwiY196ZDJfcG9sb3preVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJaYW9rcm91aGxlbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlwiLCBcInctNFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJcIiwgXCJ3LTRcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY196YW9fcG9sb3preVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDpcIkNlbGtlbVwiLCBjdXN0b21DbGFzczogXCJyaWdodCBkZHAtYmx1ZS10ZXh0XCIgfSkgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfcG9sb3preVwiLCAvLyBTZXQgZGZfYyA9IGRmX2NfY2Vsa19iZXpkYW4gKyBkZl9jX2NlbGtfb3N2b2IgKyBkZl9jX2NlbGtfc25peiArIGRmX2NfY2Vsa196YWtsICsgZGZfY196YW8gKyBkZl9jX2NlbGtfdHJldGkgKyBkZl9jX2NlbGtfY3R2cnRhXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8jZW5kcmVnaW9uIFNla2NlIHJvenBpcyBwxZllZHBpc3VcclxuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAgICAgLy8jcmVnaW9uIFNla2NlIHJvemTDrWwgxI3DoXN0ZWtcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgbmFtZTogXCJzZWN0aW9uUm96ZGlsQ2FzdGVrXCIsIGxhYmVsOiBcIlJvemTDrWxcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMLTAtMTItMCwgTS0wLTEyLTAsIFMtMC0xMi0wXCIsIGN1c3RvbUNsYXNzOiBcImRkcC1zZWN0aW9uLXdpZHRoLXNtYWxsXCIgfSkgLy8hIFJvemTDrWxcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKS5hZGRUZXh0KFwiJm5ic3A7XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgY3VzdG9tQ2xhc3M6IFwibGVmdFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfejBfcm96ZGlsXCIsIC8vIEJleiBkYW7Em1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBjdXN0b21DbGFzczogXCJsZWZ0XCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19kMF9yb3pkaWxcIiwgLy8gT3N2b2JvemVub1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBjdXN0b21DbGFzczogXCJsZWZ0XCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY196ZDFfcm96ZGlsXCIsIC8vIDEuIHNuw63FvmVuw6FcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgY3VzdG9tQ2xhc3M6IFwibGVmdFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfemQzX3JvemRpbFwiLCAvLyAyLiBzbsOtxb5lbsOhXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGN1c3RvbUNsYXNzOiBcImxlZnRcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3pkMl9yb3pkaWxcIiwgLy8gWsOha2xhZG7DrVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBjdXN0b21DbGFzczogXCJsZWZ0XCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY196YW9fcm96ZGlsXCIsIC8vIFphb2tyb3VobGVub1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBjdXN0b21DbGFzczogXCJsZWZ0XCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19yb3pkaWxcIiwgLy8gQ2Vsa2VtXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8jZW5kcmVnaW9uIFNla2NlIHJvemTDrWwgxI3DoXN0ZWtcclxuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAgICAgLy8jcmVnaW9uIFNla2NlIFBvaHlieVByZWRwaXN1UG9oeWJ5XHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IG5hbWU6IFwiR1BvaHlieVByZWRwaXN1UG9oeWJ5U2VjdGlvblwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0wLTEyLTAsIE0tMC0xMi0wLCBTLTAtMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiVHlwIMO6xI1ldG7DrWhvIHDFmcOtcGFkdVwiLCBcInctNVwiLClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiS2F0ZWdvcmllIHBvaHlidVwiLCBcInctNFwiLClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiRGF0dW0gdnpuaWt1XCIsIFwidy0yXCIsKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJPYmRvYsOtXCIsIFwidy0xXCIsKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy01XCIsIFByZWZhYnMuU2VsZWN0LmZ1Y3N0dXAoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3VwclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnR5cF91cHI9dmFsdWUudHlwX3VwclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7dHlwX3Vwcn0te25hemV2X3Vwcn1cIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy00XCIsIFByZWZhYnMuU2VsZWN0LmZ1Y2N1cG8oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3RnX3Vwb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmt0Z191cG89dmFsdWUua3RnX3Vwb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7a3RnX3Vwb30te2t0Z191cG9fdHh0fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy0yXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF92em5pa3VcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0xXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vI2VuZHJlZ2lvbiBTZWtjZSBQb2h5YnlQcmVkcGlzdVBvaHlieVxyXG4gICAgICAgICAgICAgICAgOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC4kY2FzdGt5Rm9ybURpdiA9ICQubmV3RGl2KFwiY2FzdGt5Rm9ybURpdlwiKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBjYXN0a3lGb3JtKTtcclxuICAgICAgICAgICAgLy9jb25zdCBmb3JtID0gdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcIkdQb2h5YnlQcmVkcGlzdUNhc3RreUZvcm1cIilcclxuICAgICAgICAgICAgLy9mb3JtLmZpbmRGb3JtU2VjdGlvbnMoXCJzZWN0aW9uQ2FzdGt5UHJlZHBpc3VcIikuY3NzKFwid2lkdGhcIiwgXCI0MCUgIWltcG9ydGFudFwiKVxyXG4gICAgICAgICAgICAvL2Zvcm0uZmluZEZvcm1TZWN0aW9ucyhcInNlY3Rpb25Sb3pwaXNQcmVkcGlzdVwiKS5jc3MoXCJ3aWR0aFwiLCBcIjQwJSAhaW1wb3J0YW50XCIpXHJcbiAgICAgICAgICAgIC8vZm9ybS5maW5kRm9ybVNlY3Rpb25zKFwic2VjdGlvblJvemRpbENhc3Rla1wiKS5jc3MoXCJ3aWR0aFwiLCBcIjIwJSAhaW1wb3J0YW50XCIpICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgRWRpdGFjZVphcGlzdTogYm9vbGVhbjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHZ5dHZvxZllbsOtIGdyaWR1IHMgxZnDoWRrYW1hIMSNw6FzdGVrIHDFmWVkcGlzdVxyXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlQ2FzdGt5R3JpZCgpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDYXN0a3lHcmlkKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC4kZ3JpZENhc3RreSA9ICQubmV3RGl2KFwiZ3JpZENhc3RreURpdlwiKVxyXG4gICAgICAgICAgICAgICAgLy8uY3NzKFwiaGVpZ2h0XCIsIFwiMjAlXCIpXHJcbiAgICAgICAgICAgICAgICAvLy5jc3MoXCJtaW4taGVpZ2h0XCIsIFwiMTUlXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KHsgbWluaW1hbEhlaWdodDogMjAwIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuR1BvaHlieVByZWRwaXN1RHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkQ2FzdGt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsIC8vIHJvdywgY2VsbFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IENvbW1vbi5HcmlkRm9ybWF0cy5Qb2h5YnlQcmVkcGlzdUNhc3RreSh0aGF0LCB0aGF0Lm1vZGVsUGhsLCB0aGF0LkljbyksXHJcbiAgICAgICAgICAgICAgICAgICAgLy9wcm9maWxlQ2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC8vIGluZm9ybWFjZSAodmFyb3bDoW7DrSksIHBva3VkIHptxJtuYSB2IHByb2ZpbHUgbcWvxb5lIHpwxa9zb2JpdCBuZW1vxb5ub3N0IGVkaXRhY2UuIHYgdGFrb3bDqW0gcMWZw61wYWTEmyBuZW7DrSBwb3ZvbGVuYSBlZGl0YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKHRoYXQuJGdyaWRDYXN0a3kpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5FZGl0YWNlWmFwaXN1ID0gR29yZGljLkVrby5HcmlkLmlzU3RhdGVGb3JFZGl0aW5nKHRoYXQuJGdyaWQxWmFwaXN5UG9oeWJ1LCBvYmosIHRydWUsIHRoYXQuJGdyaWQxWmFwaXN5UG9oeWJ1Rmxhc2gsIHVuZGVmaW5lZCwgdGhhdC5HcmlkRm9ybWF0WmFwaXN5UG9oeWJ1LCB0aGF0LlNvcnRlZENmdVNldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgICAgICAvL3Byb2ZpbGVCZWZvcmVDaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gcG9rdWQgc2UgZWRpdHVqZSwgbmVqc291IHBvdm9sZW55IHptxJtueSB2IGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuICh0aGlzLiRncmlkQ2FzdGt5Py5maW5kKFwiLnJvdy5lZGl0aW5nXCIpPy5sZW5ndGggPz8gMCkgPCAxO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfSxcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIsOaxI0uIHBvaHlieVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtZW51QmFyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3ROb3Z5UmFkZWtcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RPZHN0cmFuaXRSYWRla1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdFVsb3pQb2h5YnlcIl0sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbjogXCJvcHBvc2l0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkcm93ZWRpdG9yPERkcC5JbnRlcmZhY2UuR1BvaHlieVByZWRwaXN1RHRvICYgeyBub3Z5X3phcGlzPzogYm9vbGVhbiB9Pih7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dDb3B5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZVN0YXJ0OiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwb3ZvbGVuw60gZWRpdGFjZSBzZSDFmcOtZMOtIHN0YXZlbSBncmlkdSBhIHBvdm9sZW7DrW0gcMWZw61zbHXFoW7DqSBha2NlIG5hIG5vdsO9IHrDoXBpcyBuZWJvIG9wcmF2dSB6w6FwaXN1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoYXQuUG92b2xlbmFFZGl0YWNlWmFwaXN1ICYmICh0aGF0LmFjdGlvbnMuYWN0Tm92eVphcGlzIS5lbmFibGVkKCkgfHwgdGhhdC5hY3Rpb25zLmFjdE9wcmF2YVphcGlzdSEuZW5hYmxlZCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZWRpdGFibGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdGFydDogKGV2LCBpbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vYWt0dWFsaXphY2UgcHJ2a8WvIHBvIHphxI3DoXRrdSBlZGl0YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNhdmU6IGZ1bmN0aW9uIChkYXRhLCBpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVsb8W+ZW7DrSB6bcSbblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1pdDogZnVuY3Rpb24gKGV2LCBpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHpub3Z1bmHEjXRlbsOtIHNlem5hbXUgKGt2xa9saSBtb8W+bsOpIHptxJtuxJsgcG9oeWJ1KSAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbDogKGV2LCBpbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIHBydmvFryBwbyB1a29uxI1lbsOtIGVkaXRhY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zb3VjZXRDYXN0ZWsoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gdnl0dm/FmWVuw60gZ3JpZHUgcyBwxZllZGtvbnRhY2VtaSBwb2h5YnUgcMWZZWRwaXN1XHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVQcmVka29udGFjZUdyaWQoKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlUHJlZGtvbnRhY2VHcmlkKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC4kZ3JpZFByZWRrb250YWNlID0gJC5uZXdEaXYoXCJncmlkUHJlZGtvbnRhY2VEaXZcIilcclxuICAgICAgICAgICAgICAgIC8vLmNzcyhcImhlaWdodFwiLCBcIjIwJVwiKVxyXG4gICAgICAgICAgICAgICAgLy8uY3NzKFwibWluLWhlaWdodFwiLCBcIjE1JVwiKVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KHsgbWluaW1hbEhlaWdodDogMjAwIH0pXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHsgLy8gPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdVZVRlTmtzVXVzRHRvPlxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFByZWRrb250YWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuUG9oeWJ5UHJlZHBpc3VQcmVka29udGFjZSh0aGF0KSBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUMWZZWRrb250YWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdE5haGxlZEtvbnRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3ROYWhsZWRVY3RvXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICBpZiAodGhhdC52aWV3S29udGFjZSlcclxuICAgICAgICAgICAgICAgIHRoYXQuJGdyaWRQcmVka29udGFjZS5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3S29udGFjZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvbiBTIEUgUyBUIEEgViBFIE4gw40gICBPIEsgTiBBXHJcbiAgICAgICAgLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICAgICAgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RNYWluT2s6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk9rKHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLCAvL1RPRE86IG9wcmF2ZHUgdsW+ZHkgVFJVRSA/XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub2soKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RNYWluQ2xvc2U6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblphdnJpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZSgpOyAvLyBNZXRvZGEgcHJvIHV6YXbFmWVuw60gb2tuYVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3ROb3Z5UmFkZWs6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk5vdnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk5vdsO9IMWZw6FkZWtcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGR0bzogR29yZGljLkRkcC5JbnRlcmZhY2UuR1BvaHlieVByZWRwaXN1RHRvICYgeyBub3Z5X3phcGlzPzogYm9vbGVhbiB9ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm92eV96YXBpczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGM6IG5ldyBEZWNpbWFsKDApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY196MDogbmV3IERlY2ltYWwoMCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjX3oxOiBuZXcgRGVjaW1hbCgwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfejI6IG5ldyBEZWNpbWFsKDApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY196MzogbmV3IERlY2ltYWwoMCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjX3o0OiBuZXcgRGVjaW1hbCgwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfZDA6IG5ldyBEZWNpbWFsKDApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY19kMTogbmV3IERlY2ltYWwoMCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjX2QyOiBuZXcgRGVjaW1hbCgwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfZDM6IG5ldyBEZWNpbWFsKDApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY19kNDogbmV3IERlY2ltYWwoMCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjX3phbzogbmV3IERlY2ltYWwoMCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Vsb3plbm86IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3B1xaF0xJtuw60gZWRpdGFjZSBub3bDqWhvIMWZw6Fka3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZENhc3RreT8uZ2dyaWRyb3dlZGl0b3IoXCJhZGRSb3dcIiwgZHRvKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0T2RzdHJhbml0UmFkZWs6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk9kc3RyYW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiT2RzdHJhbml0IMWZw6FkZWtcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJVcG96b3JuxJtuw61cIiwgXCJBa2NlIGplxaF0xJsgbmVuw60gaW1wbGVtZW50b3ZhbsOhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RVbG96UG9oeWJ5OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25VbG96aXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlVsb8W+aXQgcG9oeWJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwiVXBvem9ybsSbbsOtXCIsIFwiQWtjZSBqZcWhdMSbIG5lbsOtIGltcGxlbWVudG92YW7DoVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0TmFobGVkS29udDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTsOhaGxlZCBrb24uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTsOhaGxlZCBrb250YWPDrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hY3RpRGF0YUdyaWR1S29udGFjZSgwKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3ROYWhsZWRVY3RvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOw6FobGVkIMO6xI10LlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk7DoWhsZWQgw7rEjXRvdsOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmFjdGlEYXRhR3JpZHVLb250YWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgbmFjdGlEYXRhKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3QgZm9ybTEgPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwiR1BvaHlieVByZWRwaXN1Q2FzdGt5Rm9ybVwiKVxyXG4gICAgICAgICAgICAvL2NvbnN0IGZvcm0yID0gdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcIkdQb2h5YnlQcmVkcGlzdVBvaHlieUZvcm1cIilcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvcm0xLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoYXQubW9kZWxQcmVkcGlzdSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pOyAvLyBjX3owLCBjX3oxLCBjX3oyLCBjX3ozLCBjX3o0LCBjX2QwLCBjX2QxLCBjX2QyLCBjX2QzLCBjX2Q0LCBjX3phb1xyXG4gICAgICAgICAgICBmb3JtMS5maW5kRm9ybVNlY3Rpb25zKFwiR1BvaHlieVByZWRwaXN1UG9oeWJ5U2VjdGlvblwiKS5maW5kRmllbGRzKFwidHlwX3VwclwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsgdHlwX3VwcjogdGhhdC5tb2RlbFBobD8uTmFzdGF2ZW5pPy50eXBfdXByIH0sIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgZm9ybTEuZmluZEZvcm1TZWN0aW9ucyhcIkdQb2h5YnlQcmVkcGlzdVBvaHlieVNlY3Rpb25cIikuZmluZEZpZWxkcyhcImt0Z191cG9cIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7IGt0Z191cG86IHRoYXQubW9kZWxQcmVkcGlzdT8ua3RnX3VwbyB9LCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIGZvcm0xLmZpbmRGb3JtU2VjdGlvbnMoXCJHUG9oeWJ5UHJlZHBpc3VQb2h5YnlTZWN0aW9uXCIpLmZpbmRGaWVsZHMoXCJkYXRfdnpuaWt1XCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHRoYXQubW9kZWxQcmVkcGlzdT8uZGF0X3Z6bmlrdSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICBmb3JtMS5maW5kRm9ybVNlY3Rpb25zKFwiR1BvaHlieVByZWRwaXN1UG9oeWJ5U2VjdGlvblwiKS5maW5kRmllbGRzKFwicm9rXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIG5ldyBEYXRlKHRoYXQubW9kZWxQcmVkcGlzdT8uZGF0X3Z6bmlrdSEpLmdldEZ1bGxZZWFyKCksIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQubmFjdGlEYXRhR3JpZHVDYXN0ZWsoKTtcclxuICAgICAgICAgICAgLy90aGF0Lm5hY3RpRGF0YUdyaWR1S29udGFjZSgwKTtcclxuICAgICAgICAgICAgLy9UT0RPOiB0b3RvLi4uXHJcbiAgICAgICAgICAgIC8vaWYgKCF0aGF0LmVkaXRhYmxlKSB7XHJcbiAgICAgICAgICAgIC8vICAgIHRoYXQuYWN0aW9ucy5nZXRBY3Rpb25zKCkuZmluZChlID0+IGUubmFtZSA9PSBcImFjdE5vdnlSYWRla1wiKT8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIC8vICAgIHRoYXQuYWN0aW9ucy5nZXRBY3Rpb25zKCkuZmluZChlID0+IGUubmFtZSA9PSBcImFjdE9kc3RyYW5pdFJhZGVrXCIpPy5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgLy8gICAgdGhhdC5hY3Rpb25zLmdldEFjdGlvbnMoKS5maW5kKGUgPT4gZS5uYW1lID09IFwiYWN0VWxvelBvaHlieVwiKT8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIC8vICAgIHRoYXQuYWN0aW9ucy5nZXRBY3Rpb25zKCkuZmluZChlID0+IGUubmFtZSA9PSBcImFjdE1haW5Pa1wiKT8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgIH1cclxuICAgICAgICBuYWN0aURhdGFHcmlkdUNhc3RlaygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vaWYgKCF0aGF0LnZpZXdQb2h5YnkpIHtcclxuICAgICAgICAgICAgdGhhdC52aWV3UG9oeWJ5ID0gbmV3IElzbC5WaWV3KHRoYXQuaXNsLlBvaHlieVByZWRwaXN1Lmxpc3QocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogdGhhdC5JeHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrX3VocjogdGhhdC5SYWRla191aHJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIHRoYXQuJGdyaWRDYXN0a3kuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlld1BvaHlieSk7XHJcbiAgICAgICAgICAgIHRoYXQudmlld1BvaHlieS5nZXRMb2FkaW5nUHJvbWlzZSgpLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zb3VjZXRDYXN0ZWsoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgdGhhdC52aWV3UG9oeWJ5LnJlcXVlc3REYXRhKCkuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAvKiovXHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAvL30gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgbmFjdGlEYXRhR3JpZHVLb250YWNlKG1vZF96b2JyYXplbmk6IG51bWJlcikge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKG1vZF96b2JyYXplbmkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC52aWV3S29udGFjZSA9IG5ldyBJc2wuVmlldyh0aGF0LmlzbC5Qb2h5YnlQcmVkcGlzdS5saXN0TmFobGVkS29udChycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3VwcjogdGhhdC5tb2RlbFBobC5OYXN0YXZlbmk/LnR5cF91cHIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2s6IG5ldyBEYXRlKHRoYXQubW9kZWxQcmVkcGlzdT8uZGF0X3Z6bmlrdSEpLmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdGdfdXBvOiB0aGF0Lm1vZGVsUHJlZHBpc3U/Lmt0Z191cG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICB0aGF0LiRncmlkUHJlZGtvbnRhY2UuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlld0tvbnRhY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC52aWV3S29udGFjZS5nZXRMb2FkaW5nUHJvbWlzZSgpLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgfSk7ICBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQudmlld0tvbnRhY2UgPSBuZXcgSXNsLlZpZXcodGhhdC5pc2wuUG9oeWJ5UHJlZHBpc3UubGlzdE5haGxlZFVjdChycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiB0aGF0Lkl4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICB0aGF0LiRncmlkUHJlZGtvbnRhY2UuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlld0tvbnRhY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC52aWV3S29udGFjZS5nZXRMb2FkaW5nUHJvbWlzZSgpLmRvbmUoZnVuY3Rpb24gKCkgeyAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzb3VjZXRDYXN0ZWsoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtID0gdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcIkdQb2h5YnlQcmVkcGlzdUNhc3RreUZvcm1cIilcclxuICAgICAgICAgICAgbGV0IGNfejA6IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX3owXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQgY196MTogRGVjaW1hbCA9IGZvcm0uZmluZEZpZWxkcyhcImNfejFcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGxldCBjX3oyOiBEZWNpbWFsID0gZm9ybS5maW5kRmllbGRzKFwiY196MlwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgbGV0IGNfejM6IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX3ozXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAvL2xldCBjX3o0ID0gZm9ybS5maW5kRmllbGRzKFwiY196NFwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgbGV0IGNfZDA6IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX2QwXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQgY19kMTogRGVjaW1hbCA9IGZvcm0uZmluZEZpZWxkcyhcImNfZDFcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGxldCBjX2QyOiBEZWNpbWFsID0gZm9ybS5maW5kRmllbGRzKFwiY19kMlwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgbGV0IGNfZDM6IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX2QzXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAvL2xldCBjX2Q0OiBEZWNpbWFsID0gZm9ybS5maW5kRmllbGRzKFwiY19kNFwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgbGV0IGNfemFvOiBEZWNpbWFsID0gZm9ybS5maW5kRmllbGRzKFwiY196YW9cIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGxldCBsX2NlbGs6IERlY2ltYWw7XHJcbiAgICAgICAgICAgIGxfY2VsayA9IGNfejAucGx1cyhjX2QwKS5wbHVzKGNfejEpLnBsdXMoY19kMSkucGx1cyhjX3oyKS5wbHVzKGNfZDIpLnBsdXMoY196MykucGx1cyhjX2QzKS5wbHVzKGNfemFvKS8qLnBsdXMoY196NCkucGx1cyhjX2Q0KSovO1xyXG4gICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJjX2NlbGtlbVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBsX2NlbGssIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgdGhhdC5zb3VjZXRQb2h5YnUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc291Y2V0UG9oeWJ1KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoYXQuZWxlbWVudC5maW5kRm9ybXMoXCJHUG9oeWJ5UHJlZHBpc3VDYXN0a3lGb3JtXCIpXHJcbiAgICAgICAgICAgIGxldCBjX3owX3A6IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX3owX3BvbG96a3lcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGxldCBjX3oxX3A6IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX3oxX3BvbG96a3lcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGxldCBjX3oyX3A6IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX3oyX3BvbG96a3lcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGxldCBjX3ozX3A6IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX3ozX3BvbG96a3lcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIC8vbGV0IGNfejRfcDogRGVjaW1hbCA9IGZvcm0uZmluZEZpZWxkcyhcImNfejRfcG9sb3preVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgbGV0IGNfZDBfcDogRGVjaW1hbCA9IGZvcm0uZmluZEZpZWxkcyhcImNfZDBfcG9sb3preVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgbGV0IGNfZDFfcDogRGVjaW1hbCA9IGZvcm0uZmluZEZpZWxkcyhcImNfZDFfcG9sb3preVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgbGV0IGNfZDJfcDogRGVjaW1hbCA9IGZvcm0uZmluZEZpZWxkcyhcImNfZDJfcG9sb3preVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgbGV0IGNfZDNfcDogRGVjaW1hbCA9IGZvcm0uZmluZEZpZWxkcyhcImNfZDNfcG9sb3preVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgLy9sZXQgY19kNF9wOiBEZWNpbWFsID0gZm9ybS5maW5kRmllbGRzKFwiY19kNF9wb2xvemt5XCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQgY196YW9fcDogRGVjaW1hbCA9IGZvcm0uZmluZEZpZWxkcyhcImNfemFvX3BvbG96a3lcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGxldCBjX3A6IERlY2ltYWwgPSBuZXcgRGVjaW1hbCgwKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBwb2h5YnkgPSB0aGF0LiRncmlkQ2FzdGt5LmdncmlkPERkcC5JbnRlcmZhY2UuR1BvaHlieVByZWRwaXN1RHRvPihcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgIGlmIChwb2h5YnkuZ2V0Q291bnQoKSA+IDApIHsgLy8gaWYgKHBvaHlieS5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgcG9oeWJ5LmdldERhdGFSb3dzKCkuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9wb2h5YnkuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmNfejApIGNfejBfcCA9IGNfejBfcC5wbHVzKGl0ZW0uY196MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uY196MSkgY196MV9wID0gY196MV9wLnBsdXMoaXRlbS5jX3oxKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5jX3oyKSBjX3oyX3AgPSBjX3oyX3AucGx1cyhpdGVtLmNfejIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmNfejMpIGNfejNfcCA9IGNfejNfcC5wbHVzKGl0ZW0uY196Myk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGl0ZW0uY196NCkgY196NF9wID0gY196NF9wLnBsdXMoaXRlbS5jX3o0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5jX2QwKSBjX2QwX3AgPSBjX2QwX3AucGx1cyhpdGVtLmNfZDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmNfZDEpIGNfZDFfcCA9IGNfZDFfcC5wbHVzKGl0ZW0uY19kMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uY19kMikgY19kMl9wID0gY19kMl9wLnBsdXMoaXRlbS5jX2QyKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uY19kMykgY19kM19wID0gY19kM19wLnBsdXMoaXRlbS5jX2QzKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoaXRlbS5jX2Q0KSBjX2Q0X3AgPSBjX2Q0X3AucGx1cyhpdGVtLmNfZDQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmNfemFvKSBjX3phb19wID0gY196YW9fcC5wbHVzKGl0ZW0uY196YW8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmMpIGNfcCA9IGNfcC5wbHVzKGl0ZW0uYyk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY196MF9wb2xvemt5XCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGNfejBfcCwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY196MV9wb2xvemt5XCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGNfejFfcCwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY196Ml9wb2xvemt5XCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGNfejJfcCwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY196M19wb2xvemt5XCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGNfejNfcCwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgLy9mb3JtLmZpbmRGaWVsZHMoXCJjX3o0X3BvbG96a3lcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgY196NF9wLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJjX2QwX3BvbG96a3lcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgY19kMF9wLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJjX2QxX3BvbG96a3lcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgY19kMV9wLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJjX2QyX3BvbG96a3lcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgY19kMl9wLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJjX2QzX3BvbG96a3lcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgY19kM19wLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAvL2Zvcm0uZmluZEZpZWxkcyhcImNfZDRfcG9sb3preVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBjX2Q0X3AsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNfemFvX3BvbG96a3lcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgY196YW9fcCwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxfY2Vsa19wb2xvemt5OiBEZWNpbWFsO1xyXG4gICAgICAgICAgICAgICAgbF9jZWxrX3BvbG96a3kgPSBjX3owX3AucGx1cyhjX2QwX3ApLnBsdXMoY196MV9wKS5wbHVzKGNfZDFfcCkucGx1cyhjX3oyX3ApLnBsdXMoY19kMl9wKS5wbHVzKGNfejNfcCkucGx1cyhjX2QzX3ApLnBsdXMoY196YW9fcCkvKi5wbHVzKGNfejRfcCkucGx1cyhjX2Q0X3ApKi87XHJcbiAgICAgICAgICAgICAgICBpZiAobF9jZWxrX3BvbG96a3kgIT0gY19wKSBsX2NlbGtfcG9sb3preSA9IGNfcDtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJjX3BvbG96a3lcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbF9jZWxrX3BvbG96a3ksIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnJvemRpbHlDYXN0ZWsocG9oeWJ5LmdldENvdW50KCkpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByb3pkaWx5Q2FzdGVrKHBvY2V0OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwiR1BvaHlieVByZWRwaXN1Q2FzdGt5Rm9ybVwiKVxyXG4gICAgICAgICAgICBjb25zdCBudWxhOiBEZWNpbWFsID0gbmV3IERlY2ltYWwoMCk7XHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIGxldCBjX3owOiBEZWNpbWFsID0gZm9ybS5maW5kRmllbGRzKFwiY196MFwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgbGV0IGNfZDA6IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX2QwXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQgY196ZDE6IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX3pkMVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgbGV0IGNfemQyOiBEZWNpbWFsID0gZm9ybS5maW5kRmllbGRzKFwiY196ZDJcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGxldCBjX3pkMzogRGVjaW1hbCA9IGZvcm0uZmluZEZpZWxkcyhcImNfemQzXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAvL2xldCBjX3pkNDogRGVjaW1hbCA9IGZvcm0uZmluZEZpZWxkcyhcImNfemQ0XCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQgY196YW86IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX3phb1wiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgbGV0IGNfY2Vsa2VtOiBEZWNpbWFsID0gZm9ybS5maW5kRmllbGRzKFwiY19jZWxrZW1cIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIGxldCBjX3owX3A6IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX3owX3BvbG96a3lcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGxldCBjX2QwX3A6IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX2QwX3BvbG96a3lcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGxldCBjX3pkMV9wOiBEZWNpbWFsID0gZm9ybS5maW5kRmllbGRzKFwiY196ZDFfcG9sb3preVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgbGV0IGNfemQyX3A6IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX3pkMl9wb2xvemt5XCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQgY196ZDNfcDogRGVjaW1hbCA9IGZvcm0uZmluZEZpZWxkcyhcImNfemQzX3BvbG96a3lcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIC8vbGV0IGNfemQ0X3A6IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX3pkNF9wb2xvemt5XCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQgY196YW9fcDogRGVjaW1hbCA9IGZvcm0uZmluZEZpZWxkcyhcImNfemFvX3BvbG96a3lcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGxldCBjX3BvbG96a3k6IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX3BvbG96a3lcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIGxldCBjX3owX3JvemRpbDogRGVjaW1hbCA9IGNfejAubWludXMoY196MF9wKTsgXHJcbiAgICAgICAgICAgIGxldCBjX2QwX3JvemRpbDogRGVjaW1hbCA9IGNfZDAubWludXMoY19kMF9wKTsgXHJcbiAgICAgICAgICAgIGxldCBjX3pkMV9yb3pkaWw6IERlY2ltYWwgPSBjX3pkMS5taW51cyhjX3pkMV9wKTsgXHJcbiAgICAgICAgICAgIGxldCBjX3pkMl9yb3pkaWw6IERlY2ltYWwgPSBjX3pkMi5taW51cyhjX3pkMl9wKTsgXHJcbiAgICAgICAgICAgIGxldCBjX3pkM19yb3pkaWw6IERlY2ltYWwgPSBjX3pkMy5taW51cyhjX3pkM19wKTsgXHJcbiAgICAgICAgICAgIC8vbGV0IGNfemQ0X3JvemRpbDogRGVjaW1hbCA9IGNfemQ0Lm1pbnVzKGNfemQ0X3ApOyBcclxuICAgICAgICAgICAgbGV0IGNfemFvX3JvemRpbDogRGVjaW1hbCA9IGNfemFvLm1pbnVzKGNfemFvX3ApOyBcclxuICAgICAgICAgICAgbGV0IGNfcm96ZGlsOiBEZWNpbWFsID0gY19jZWxrZW0ubWludXMoY19wb2xvemt5KTsgXHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNfejBfcm96ZGlsXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGNfejBfcm96ZGlsLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNfZDBfcm96ZGlsXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGNfZDBfcm96ZGlsLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNfemQxX3JvemRpbFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBjX3pkMV9yb3pkaWwsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY196ZDJfcm96ZGlsXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGNfemQyX3JvemRpbCwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJjX3pkM19yb3pkaWxcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgY196ZDNfcm96ZGlsLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIC8vZm9ybS5maW5kRmllbGRzKFwiY196ZDRfcm96ZGlsXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGNfemQ0X3JvemRpbCwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJjX3phb19yb3pkaWxcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgY196YW9fcm96ZGlsLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNfcm96ZGlsXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGNfcm96ZGlsLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIGlmIChwb2NldCA+IDAgfHwgKGNfejBfcm96ZGlsLmVxdWFscyhudWxhKSAmJiBjX2QwX3JvemRpbC5lcXVhbHMobnVsYSkgJiYgY196ZDFfcm96ZGlsLmVxdWFscyhudWxhKSAmJiBjX3pkM19yb3pkaWwuZXF1YWxzKG51bGEpICYmIGNfemQyX3JvemRpbC5lcXVhbHMobnVsYSkgJiYgY196YW9fcm96ZGlsLmVxdWFscyhudWxhKSAmJiBjX3JvemRpbC5lcXVhbHMobnVsYSkpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuZ2V0QWN0aW9ucygpLmZpbmQoZSA9PiBlLm5hbWUgPT0gXCJhY3RNYWluT2tcIik/LmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuZ2V0QWN0aW9ucygpLmZpbmQoZSA9PiBlLm5hbWUgPT0gXCJhY3RNYWluQ2xvc2VcIik/LmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuZ2V0QWN0aW9ucygpLmZpbmQoZSA9PiBlLm5hbWUgPT0gXCJhY3RNYWluT2tcIik/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmdldEFjdGlvbnMoKS5maW5kKGUgPT4gZS5uYW1lID09IFwiYWN0TWFpbkNsb3NlXCIpPy5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGF0Lm5hc3RhdkJhcnZ1UHJpUm96ZGlsdShcImNfejBfcm96ZGlsXCIsIGNfejBfcm96ZGlsKTtcclxuICAgICAgICAgICAgdGhhdC5uYXN0YXZCYXJ2dVByaVJvemRpbHUoXCJjX2QwX3JvemRpbFwiLCBjX2QwX3JvemRpbCk7XHJcbiAgICAgICAgICAgIHRoYXQubmFzdGF2QmFydnVQcmlSb3pkaWx1KFwiY196ZDFfcm96ZGlsXCIsIGNfemQxX3JvemRpbCk7XHJcbiAgICAgICAgICAgIHRoYXQubmFzdGF2QmFydnVQcmlSb3pkaWx1KFwiY196ZDJfcm96ZGlsXCIsIGNfemQyX3JvemRpbCk7XHJcbiAgICAgICAgICAgIHRoYXQubmFzdGF2QmFydnVQcmlSb3pkaWx1KFwiY196ZDNfcm96ZGlsXCIsIGNfemQzX3JvemRpbCk7XHJcbiAgICAgICAgICAgIC8vdGhhdC5uYXN0YXZCYXJ2dVByaVJvemRpbHUoXCJjX3pkNF9yb3pkaWxcIiwgY196ZDRfcm96ZGlsKTtcclxuICAgICAgICAgICAgdGhhdC5uYXN0YXZCYXJ2dVByaVJvemRpbHUoXCJjX3phb19yb3pkaWxcIiwgY196YW9fcm96ZGlsKTtcclxuICAgICAgICAgICAgdGhhdC5uYXN0YXZCYXJ2dVByaVJvemRpbHUoXCJjX3JvemRpbFwiLCBjX3JvemRpbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5hc3RhdkJhcnZ1UHJpUm96ZGlsdShuYXpldjogc3RyaW5nLCBjYXN0a2E6IERlY2ltYWwpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwiR1BvaHlieVByZWRwaXN1Q2FzdGt5Rm9ybVwiKSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBudWxhOiBEZWNpbWFsID0gbmV3IERlY2ltYWwoMCk7XHJcbiAgICAgICAgICAgIHZhciBmaWVsZFNldCA9IGZvcm0uZmluZEZpZWxkcyhuYXpldilcclxuICAgICAgICAgICAgaWYgKCFjYXN0a2EuZXEobnVsYSkpIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkU2V0LmNzcyhcImNvbG9yXCIsIFwiI0ZGMDAwMFwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkU2V0LnJlbW92ZUF0dHIoXCJzdHlsZVwiKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBuYXN0YXZEYXRhU2VudGVuY2UoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBlZGl0YWJsZUZpZWxkcyA9IFsndWVhJywgJ3VlYicsICd1ZWMnLCAndWVkJywgJ3VlZScsICd1ZWYnLCAndWVnJywgJ3VlaCcsICd1ZWknLCAndWVqJywgJ3RlMCcsICd0ZTEnLCAndGUyJywgJ3RlMycsICd0ZTQnLCAndWVrJywgJ3VlbCcsICd1ZW0nLCAndWVuJywgJ3RlNScsICd0ZTYnLCAndGU3JywgJ3RlOCcsICd0ZTknXTtcclxuICAgICAgICAgICAgdGhhdFtcImRhdGFTZW50ZW5jZVwiXS5yb2sgPSB0aGF0LlJvaztcclxuICAgICAgICAgICAgLy9uZWpwcnZlIG5hc3RhdsOtbSB2xaFlY2hueSDFmcOhZGt5IG5lIG5lZWRpdG92YXRlbG7DqVxyXG4gICAgICAgICAgICB0aGF0W1wiZGF0YVNlbnRlbmNlXCJdLmFsbFNvcnRlZERhdGFXb3Jkcz8uZm9yRWFjaCgocmFkZWspID0+IHtcclxuICAgICAgICAgICAgICAgIHJhZGVrLkNhbkVkaXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy9wb3TDqSBwcm9qZWR1IG5hxI10ZW7DqSBrb250YWNlIGEgcG9yb3Zuw6FtIGplZG5vdGxpdsOpIHNsb3VwY2UgemRhIHNlIG1vaG91IGVkaXRvdmF0XHJcbiAgICAgICAgICAgIHRoYXQudmlld0tvbnRhY2UuZ2V0RGF0YVJvd3MoKS5mb3JFYWNoKChyYWRlaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgZWRpdGFibGVGaWVsZHMuZm9yRWFjaCgoZmllbGROYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSByYWRla1tmaWVsZE5hbWVdPy50cmltPy4oKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWVbMF0gPT09ICcjJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3b3JkID0gdGhhdFtcImRhdGFTZW50ZW5jZVwiXS5hbGxTb3J0ZWREYXRhV29yZHM/LmZpbmQodyA9PiB3LkRiTmF6ZXYgPT09IGZpZWxkTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3b3JkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JkLkNhbkVkaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLy8qKlxyXG4gICAgICAgIC8vICogWmppxaF0xJtuw60gbWF4aW3DoWxuw61obyDEjcOtc2xhIMWZw6Fka3VcclxuICAgICAgICAvLyAqIEByZXR1cm5zIHtudW1iZXJ9IG1heGltw6FsbsOtIMSNw61zbG8gxZnDoWRrdSAoMCBwb2t1ZCDFvsOhZG7DvSBuZWV4aXN0dWplKVxyXG4gICAgICAgIC8vICovXHJcbiAgICAgICAgLy9wcml2YXRlIG1heFJhZGVrVWhyKCk6IG51bWJlciB7XHJcbiAgICAgICAgLy8gICAgLy8gY3lrbCBwxZllcyB2xaFlY2hueSBleGlzdHVqw61jw60gesOhcGlzeVxyXG4gICAgICAgIC8vICAgIGxldCBtYXhSYWRlayA9IDA7XHJcbiAgICAgICAgLy8gICAgaWYgKHRoaXMuJGdyaWRDYXN0a3kpIHtcclxuICAgICAgICAvLyAgICAgICAgbGV0IGRhdGEgPSB0aGlzLiRncmlkQ2FzdGt5LmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkdQb2h5YnlQcmVkcGlzdUR0bz4oXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKHRydWUsIFwidmlld1wiKTtcclxuICAgICAgICAvLyAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBkYXRhLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbWF4UmFkZWsgPSBNYXRoLm1heChtYXhSYWRlaywgZGF0YVtpXS5kYXRhLnJhZGVrX3VociEpO1xyXG4gICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgfVxyXG4gICAgICAgIC8vICAgIHJldHVybiBtYXhSYWRlaztcclxuICAgICAgICAvL31cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIGtsYWRuw6kgdXphdsWZZW7DrSBva25hXHJcbiAgICAgICAgICogQG1ldGhvZCBvaygpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb2soKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLmFsZXJ0KFwiT0tcIiwgXCJPS1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gdnl0dm/FmWVuw60gZm9ybXVsw6HFmWUgcyBkZXRhaWxlbSBwb2h5YnUgcMWZZWRwaXN1XHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVQb2h5YkZvcm0oKVxyXG4gICAgICAgICAqIEBvYnNvbGV0ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlUG9oeWJGb3JtKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IHBvaHlieUZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIkdQb2h5YnlQcmVkcGlzdVBvaHlieUZvcm1cIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMC0xMi0wLCBNLTAtMTItMCwgUy0wLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlR5cCDDusSNZXRuw61obyBwxZnDrXBhZHVcIiwgXCJ3LTVcIiwpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIkthdGVnb3JpZSBwb2h5YnVcIiwgXCJ3LTRcIiwpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIkRhdHVtIHZ6bmlrdVwiLCBcInctMlwiLClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiT2Jkb2LDrVwiLCBcInctMVwiLClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctNVwiLCBQcmVmYWJzLlNlbGVjdC5mdWNzdHVwKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF91cHJcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC50eXBfdXByPXZhbHVlLnR5cF91cHJcIixcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3R5cF91cHJ9LXtuYXpldl91cHJ9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KSAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy00XCIsIFByZWZhYnMuU2VsZWN0LmZ1Y2N1cG8oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3RnX3Vwb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmt0Z191cG89dmFsdWUua3RnX3Vwb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7a3RnX3Vwb30te2t0Z191cG9fdHh0fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy0yXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF92em5pa3VcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0xXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSkgICBcclxuICAgICAgICAgICAgICAgIC8vLmFkZFNlY3Rpb24oeyBuYW1lOiBcIkdUZXN0U2VjdGlvblwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwzTTNTMywgTC04LTQtMCwgTS04LTQtMCwgUy04LTQtMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRSb3coeyBsYWJlbDogXCJDZWxrZW1cIiwgY3VzdG9tQ2xhc3M6IFwiZGRwLXNlY3Rpb24td2lkdGgtYmlnIHJpZ2h0IGRkcC1ibHVlLXRleHRcIiB9KVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiY19wb2xvemt5XCIsIC8vIFNldCBkZl9jID0gZGZfY19jZWxrX2JlemRhbiArIGRmX2NfY2Vsa19vc3ZvYiArIGRmX2NfY2Vsa19zbml6ICsgZGZfY19jZWxrX3pha2wgKyBkZl9jX3phbyArIGRmX2NfY2Vsa190cmV0aSArIGRmX2NfY2Vsa19jdHZydGFcclxuICAgICAgICAgICAgICAgIC8vICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkUm93KHsgbGFiZWw6IFwiQ2Vsa2VtXCIsIGN1c3RvbUNsYXNzOiBcImRkcC1zZWN0aW9uLXdpZHRoLWJpZyByaWdodCBkZHAtYmx1ZS10ZXh0XCIgfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcImNfY2Vsa2VtXCIsIC8vIFNldCBkZl9jID0gZGZfY19jZWxrX2JlemRhbiArIGRmX2NfY2Vsa19vc3ZvYiArIGRmX2NfY2Vsa19zbml6ICsgZGZfY19jZWxrX3pha2wgKyBkZl9jX3phbyArIGRmX2NfY2Vsa190cmV0aSArIGRmX2NfY2Vsa19jdHZydGFcclxuICAgICAgICAgICAgICAgIC8vICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkUm93KHsgY3VzdG9tQ2xhc3M6IFwiZGRwLXNlY3Rpb24td2lkdGgtc21hbGwgbGVmdFwiIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJjX3JvemRpbFwiLCAvLyBDZWxrZW1cclxuICAgICAgICAgICAgICAgIC8vICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICB0aGF0LiRwb2h5YnlGb3JtRGl2ID0gJC5uZXdEaXYoXCJwb2h5YnlGb3JtRGl2XCIpLmFwcGVuZFRvKHRoYXQuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIHBvaHlieUZvcm0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iXX0=
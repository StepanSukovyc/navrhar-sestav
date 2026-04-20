"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GOpravaPredpisu.ts                     </Name>
//    <Description> Okno pro opravu předpisu                                    </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-08-29                                                  </Created>
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
            let GOpravaPredpisu = 
            /**
             * Okno pro opravu předpisu
             * @author Martin Hanuš
             * @copyright © GORDIC spol. s r. o. 1993-2024
             * @created 2024-12-12
             * @lastModified 2024-12-12
             */
            class GOpravaPredpisu extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.prvniNastaveni = true;
                    //########################################################################################
                    //#region starý gform
                    //private createMainForm2() {
                    //    const that = this;
                    //    var form = new Forms.Form("L1M1S1, L-12-12-0, M-12-12-0, S-12-12-0")
                    //        /////////////////////////////////////////////////////////////////////////////////
                    //        /////////////////////////////////////////////////////////////////////////////////
                    //        .addSection("Opravovaný předpis")
                    //        //.addRow()
                    //        //.addText("Částka předpisu:", "w-6")
                    //        //.addText("z toho neuhrazeno:", "w-6")
                    //        .addRow("Částka předpisu, z toho neuhrazeno")
                    //        .addField("gnumberbox", "w-6", Prefabs.Number.currency(), {
                    //            name: "c", disabled: true,
                    //        })
                    //        .addField("gnumberbox", "w-6", Prefabs.Number.currency(), {
                    //            name: "c_neuhr", disabled: true,
                    //        })
                    //        .addRow()
                    //        .addText("Datum splatnosti:", "w-5")
                    //        .addText("Kategorie pohybu:", "w-5")
                    //        .addText("Pri. uhr.:" /*"Priorita úhrady"*/, "w-2")
                    //        .addRow()
                    //        .addField("gdatebox", "w-5", {
                    //            name: "dat_spl", disabled: true,
                    //        })
                    //        .addField("gselectbox", "w-5", Prefabs.Select.fuccupo(), {
                    //            name: "ktg_upo", disabled: true,
                    //            model: "model.ktg_upo=value.ktg_upo",
                    //            serverFilters: {
                    //                bez_nula_upo: 1,
                    //                ktg_upo: {
                    //                    o: "<",
                    //                    v: 200
                    //                }
                    //            },
                    //            itemTemplate: "{ktg_upo} - {ktg_upo_txt:trim:encode}"
                    //        })
                    //        .addField("gnumberbox", "w-2", {
                    //            name: "pri_uhr_old", disabled: true,
                    //            initialValue: 0,
                    //        })
                    //        /////////////////////////////////////////////////////////////////////////////////
                    //        /////////////////////////////////////////////////////////////////////////////////
                    //        .addSection("Změna výše předpisu")
                    //        .addRow()
                    //        .addText("Návýšení/Snížení částky:", "w-6")
                    //        .addText("Datum vzniku:", "w-6")
                    //        .addField("gnumberbox", "w-6", Prefabs.Number.currency(), {
                    //            name: "c_zmena",
                    //            change: function (ev, input) {
                    //                if (!that.prvniNastaveni) {
                    //                    if (input.value != null) {
                    //                        that.zmenaDatumu(false);
                    //                    }
                    //                }
                    //            }
                    //        })
                    //        .addField("gdatebox", "w-6", {
                    //            name: "dat_vzniku",
                    //            change: function (ev, input) {
                    //                if (!that.prvniNastaveni) {
                    //                    if (input.value != null) {
                    //                        that.zmenaDatumu(true);
                    //                    }
                    //                }
                    //            }
                    //        })
                    //        .addRow()
                    //        .addText("kategorie pohybu - nová:", "w-10")
                    //        .addText("Pri. uhr.:" /*"Priorita úhrady"*/, "w-2")
                    //        .addRow()
                    //        .addField("gselectbox", "w-10", Prefabs.Select.fuccupo(), {
                    //            name: "ktg_upo_novy",
                    //            disabled: true,
                    //            model: "model.ktg_upo=value.ktg_upo",
                    //            serverFilters: {
                    //                bez_nula_upo: 1,
                    //                ktg_upo: {
                    //                    o: "<",
                    //                    v: 200
                    //                }
                    //            },
                    //            itemTemplate: "{ktg_upo} - {ktg_upo_txt:trim:encode}"
                    //        })
                    //        .addField("gnumberbox", "w-2", {
                    //            name: "pri_uhr",
                    //            initialValue: 0,
                    //        })
                    //        .addRow("Poznámka")
                    //        .addField("gstringbox", "w-12", { name: "poznamka" })
                    //        .addRow()
                    //        .addField("gcheck", "w-12", { name: "vyznmna_castka", label: "Opravy předcházejících účetních období - významná částka" })
                    //        .addRow()
                    //        .addText("Zákl. bez DPH:", "w-3").addText("Osv. od DPH:", "w-3").addText("Zákl.sníž.:", "w-3").addText("Daň sníž.:", "w-3")
                    //        .addRow()
                    //        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
                    //            name: "c_z0",
                    //            disabled: false,
                    //            change: function (ev, input) {
                    //                if (!that.prvniNastaveni) {
                    //                    if (input.value != null) {
                    //                        that.prepocetCastek(1)
                    //                    }
                    //                }
                    //            }
                    //        }) // Zákl. bez DPH
                    //        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
                    //            name: "c_d0",
                    //            disabled: !that.permsDto.c_d0!,
                    //            change: function (ev, input) {
                    //                if (!that.prvniNastaveni) {
                    //                    if (input.value != null) {
                    //                        that.prepocetCastek(0)
                    //                    }
                    //                }
                    //            }
                    //        }) // Osv. od DPH
                    //        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
                    //            name: "c_z1",
                    //            disabled: !that.permsDto.c_z1!,
                    //            change: function (ev, input) {
                    //                if (!that.prvniNastaveni) {
                    //                    if (input.value != null) {
                    //                        that.prepocetCastek(1)
                    //                    }
                    //                }
                    //            }
                    //        }) // Zákl.sníž. D.
                    //        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
                    //            name: "c_d1",
                    //            disabled: !that.permsDto.c_d1!,
                    //            change: function (ev, input) {
                    //                if (!that.prvniNastaveni) {
                    //                    if (input.value != null) {
                    //                        that.prepocetCastek(0)
                    //                    }
                    //                }
                    //            }
                    //        }) // Daň sníž. D.
                    //        .addRow()
                    //        .addText("Zákl. DPH:", "w-3").addText("Daň zákl. DPH:", "w-3").addText("Zákl.2.sníž:", "w-2").addText("Daň 2.sníž:", "w-2").addText("Zaok.:", "w-2")
                    //        .addRow()
                    //        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
                    //            name: "c_z2",
                    //            disabled: !that.permsDto.c_z2!,
                    //            change: function (ev, input) {
                    //                if (!that.prvniNastaveni) {
                    //                    if (input.value != null) {
                    //                        that.prepocetCastek(1)
                    //                    }
                    //                }
                    //            }
                    //        }) // Zákl. DPH
                    //        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
                    //            name: "c_d2",
                    //            disabled: !that.permsDto.c_d2!,
                    //            change: function (ev, input) {
                    //                if (!that.prvniNastaveni) {
                    //                    if (input.value != null) {
                    //                        that.prepocetCastek(0)
                    //                    }
                    //                }
                    //            }
                    //        }) // Daň zákl. DPH
                    //        .addField("gnumberbox", "w-2", Prefabs.Number.currency(), {
                    //            name: "c_z3",
                    //            disabled: !that.permsDto.c_z3!,
                    //            change: function (ev, input) {
                    //                if (!that.prvniNastaveni) {
                    //                    if (input.value != null) {
                    //                        that.prepocetCastek(1)
                    //                    }
                    //                }
                    //            }
                    //        }) // Zákl.2.sníž. D.
                    //        .addField("gnumberbox", "w-2", Prefabs.Number.currency(), {
                    //            name: "c_d3",
                    //            disabled: !that.permsDto.c_d3!,
                    //            change: function (ev, input) {
                    //                if (!that.prvniNastaveni) {
                    //                    if (input.value != null) {
                    //                        that.prepocetCastek(0)
                    //                    }
                    //                }
                    //            }
                    //        }) // Daň 2.sníž. D.
                    //        .addField("gnumberbox", "w-2", Prefabs.Number.currency(), {
                    //            name: "c_zao",
                    //            disabled: !that.permsDto.c_zao!,
                    //            change: function (ev, input) {
                    //                if (!that.prvniNastaveni) {
                    //                    if (input.value != null) {
                    //                        that.prepocetCastek(0)
                    //                    }
                    //                }
                    //            }
                    //        }) //  Zaokrouhleno
                    //        .addSection("Opravná položka")
                    //        .addRow()
                    //        .addText("Opr. pol.- exist.:", "w-6").addText("Proc. opr.:", "w-6")
                    //        .addRow()
                    //        .addField("gnumberbox", "w-6", Prefabs.Number.currency(), {
                    //            name: "c_opr", disabled: true,
                    //        })
                    //        .addField("gnumberbox", "w-6", Prefabs.Number.currency(), {
                    //            name: "opr_proc", disabled: true,
                    //        })
                    //        .addRow()
                    //        .addText("Opr. pol. - změna:", "w-6").addText("Dat. posl.gen. opr.:", "w-6")
                    //        .addRow()
                    //        .addField("gnumberbox", "w-6", Prefabs.Number.currency(), {
                    //            name: "c_opr_zmena", disabled: true,
                    //        })
                    //        .addField("gdatebox", "w-6", {
                    //            name: "dat_opr", disabled: true,
                    //        })
                    //    this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);
                    //    //this.defaultForm.findFields().gfield("model", "validators", this.validators);
                    //}
                    //#endregion starý gform
                }
                //private sazbyDPH: Gordic.Ddp.Interface.LK.Isl.GEkocdapDto[];
                //private kurzyMenyDto: Gordic.Ddp.Interface.LK.Isl.GEkodkurDto[];
                //#endregion
                //########################################################################################
                onContentReady() {
                    const that = this;
                    that.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    if (this.warning) {
                        this.dialogs.warning("Upozornění", this.warning);
                    }
                    that.today = parseDate(that.today);
                    that.createActions();
                    that.createMainButtons();
                    that.createMainForm();
                    that.nastavPole();
                    this.prvniNastaveni = false;
                    that.element.findFields('c_zmena').gfield('focus');
                }
                //########################################################################################
                //#region Sestavení okna
                /**
                 * Metoda pro vytvoření hlavního formuláře detailu předpisu
                 * @method createMainForm()
                 */
                createMainForm() {
                    const that = this;
                    var form = new Gordic.Forms.Form("L2M2S1, L-12-12-0, M-12-12-0, S-12-12-0")
                        /////////////////////////////////////////////////////////////////////////////////
                        /////////////////////////////////////////////////////////////////////////////////
                        .addSection("Změna výše předpisu")
                        .addRow("Návýšení/Snížení částky")
                        .addField("gnumberbox", "w-12", Gordic.Prefabs.Number.currency(), {
                        name: "c_zmena",
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                if (input.value != null) {
                                    that.zmenaDatumu(false);
                                }
                            }
                        }
                    })
                        .addRow("Datum vzniku, Priorita úhrady")
                        .addField("gdatebox", "w-10", {
                        name: "dat_vzniku",
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                if (input.value != null) {
                                    that.zmenaDatumu(true);
                                }
                            }
                        }
                    })
                        .addField("gnumberbox", "w-2", {
                        name: "pri_uhr",
                        initialValue: 0,
                    })
                        .addRow("Kategorie pohybu - nová")
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.fuccupo(), {
                        name: "ktg_upo_novy",
                        disabled: true,
                        model: "model.ktg_upo=value.ktg_upo",
                        serverFilters: {
                            bez_nula_upo: 1,
                            ktg_upo: {
                                o: "<",
                                v: 200
                            }
                        },
                        itemTemplate: "{ktg_upo} - {ktg_upo_txt:trim:encode}"
                    })
                        .addRow("Poznámka")
                        .addField("gstringbox", "w-12", { name: "poznamka" })
                        /////////////////////////////////////////////////////////////////////////////////
                        /////////////////////////////////////////////////////////////////////////////////
                        .addSection("Opravovaný předpis")
                        .addRow("Částka předpisu")
                        .addField("gnumberbox", "w-12", Gordic.Prefabs.Number.currency(), {
                        name: "c", disabled: true,
                    })
                        .addRow("Z toho neuhrazeno")
                        .addField("gnumberbox", "w-12", Gordic.Prefabs.Number.currency(), {
                        name: "c_neuhr", disabled: true,
                    })
                        .addRow("Kategorie pohybu")
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.fuccupo(), {
                        name: "ktg_upo", disabled: true,
                        model: "model.ktg_upo=value.ktg_upo",
                        serverFilters: {
                            bez_nula_upo: 1,
                            ktg_upo: {
                                o: "<",
                                v: 200
                            }
                        },
                        itemTemplate: "{ktg_upo} - {ktg_upo_txt:trim:encode}"
                    })
                        .addRow("Datum splatnosti, Priorita úhrady")
                        .addField("gdatebox", "w-10", {
                        name: "dat_spl", disabled: true,
                    })
                        .addField("gnumberbox", "w-2", {
                        name: "pri_uhr_old", disabled: true,
                        initialValue: 0,
                    })
                        /////////////////////////////////////////////////////////////////////////////////
                        /////////////////////////////////////////////////////////////////////////////////
                        .addSection("Rozpis DPH")
                        .addRow("Zákl. bez DPH, Osv. od DPH")
                        .addField("gnumberbox", "w-6", Gordic.Prefabs.Number.currency(), {
                        name: "c_z0",
                        tooltip: "Základní částka bez DPH",
                        disabled: false,
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                if (input.value != null) {
                                    that.prepocetCastek(1);
                                }
                            }
                        }
                    }) // Zákl. bez DPH
                        .addField("gnumberbox", "w-6", Gordic.Prefabs.Number.currency(), {
                        name: "c_d0",
                        tooltip: "Částka osvobozena od DPH",
                        disabled: !that.permsDto.c_d0,
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                if (input.value != null) {
                                    that.prepocetCastek(0);
                                }
                            }
                        }
                    }) // Osv. od DPH
                        .addRow("Zákl.sníž., Daň sníž.")
                        .addField("gnumberbox", "w-6", Gordic.Prefabs.Number.currency(), {
                        name: "c_z1",
                        tooltip: "Částka základu pro výpočet snížené sazby DPH",
                        disabled: !that.permsDto.c_z1,
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                if (input.value != null) {
                                    that.prepocetCastek(1);
                                }
                            }
                        }
                    }) // Zákl.sníž. D.
                        .addField("gnumberbox", "w-6", Gordic.Prefabs.Number.currency(), {
                        name: "c_d1",
                        tooltip: "Částka daně pro výpočet snížené sazby DPH",
                        disabled: !that.permsDto.c_d1,
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                if (input.value != null) {
                                    that.prepocetCastek(0);
                                }
                            }
                        }
                    }) // Daň sníž. D.
                        .addRow("Zákl. DPH, Daň zákl. DPH")
                        .addField("gnumberbox", "w-6", Gordic.Prefabs.Number.currency(), {
                        name: "c_z2",
                        tooltip: "Částka základu pro výpočet základní sazby DPH",
                        disabled: !that.permsDto.c_z2,
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                if (input.value != null) {
                                    that.prepocetCastek(1);
                                }
                            }
                        }
                    }) // Zákl. DPH
                        .addField("gnumberbox", "w-6", Gordic.Prefabs.Number.currency(), {
                        name: "c_d2",
                        tooltip: "Částka daně pro výpočet základní sazby DPH",
                        disabled: !that.permsDto.c_d2,
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                if (input.value != null) {
                                    that.prepocetCastek(0);
                                }
                            }
                        }
                    }) // Daň zákl. DPH
                        .addRow("Zákl.2.sníž, Daň 2.sníž")
                        .addField("gnumberbox", "w-6", Gordic.Prefabs.Number.currency(), {
                        name: "c_z3",
                        tooltip: "Základ v druhé snížené sazbě DPH",
                        disabled: !that.permsDto.c_z3,
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                if (input.value != null) {
                                    that.prepocetCastek(1);
                                }
                            }
                        }
                    }) // Zákl.2.sníž. D.
                        .addField("gnumberbox", "w-6", Gordic.Prefabs.Number.currency(), {
                        name: "c_d3",
                        tooltip: "Daň v druhé snížené sazbě DPH",
                        disabled: !that.permsDto.c_d3,
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                if (input.value != null) {
                                    that.prepocetCastek(0);
                                }
                            }
                        }
                    }) // Daň 2.sníž. D.
                        .addRow("Zákl.2.sníž, Daň 2.sníž, Zaokrouhleno")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z4",
                        tooltip: "Základ ve třetí snížené sazbě DPH",
                        disabled: !that.permsDto.c_z4,
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                if (input.value != null) {
                                    that.prepocetCastek(1);
                                }
                            }
                        }
                    }) // Zákl.2.sníž. D.
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d4",
                        tooltip: "Daň ve třetí snížené sazbě DPH",
                        disabled: !that.permsDto.c_d4,
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                if (input.value != null) {
                                    that.prepocetCastek(0);
                                }
                            }
                        }
                    }) // Daň 2.sníž. D.
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_zao",
                        tooltip: "Částka zaokrouhlení předpisu DPH",
                        disabled: !that.permsDto.c_zao,
                        change: function (ev, input) {
                            if (!that.prvniNastaveni) {
                                if (input.value != null) {
                                    that.prepocetCastek(0);
                                }
                            }
                        }
                    }) //  Zaokrouhleno
                        /////////////////////////////////////////////////////////////////////////////////
                        /////////////////////////////////////////////////////////////////////////////////
                        .addSection("Opravná položka")
                        .addRow("Opr. pol.- exist.")
                        .addField("gnumberbox", "w-12", Gordic.Prefabs.Number.currency(), {
                        name: "c_opr",
                        disabled: true,
                    })
                        .addRow("Proc. opr.")
                        .addField("gnumberbox", "w-12", Gordic.Prefabs.Number.currency(), {
                        name: "opr_proc",
                        disabled: true,
                    })
                        .addRow("Opr. pol. - změna")
                        .addField("gnumberbox", "w-12", Gordic.Prefabs.Number.currency(), {
                        name: "c_opr_zmena",
                        disabled: true,
                    })
                        .addRow("Dat. posl.gen. opr.")
                        .addField("gdatebox", "w-12", {
                        name: "dat_opr",
                        disabled: true,
                    })
                        .addRow()
                        .addField("gcheck", "w-12", { name: "vyznmna_castka", label: "Opravy předcházejících účetních období - významná částka" });
                    this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);
                    //this.defaultForm.findFields().gfield("model", "validators", this.validators);
                }
                //########################################################################################
                /**
                 * Metoda pro vytvoření spodních tlačítek okna
                 * @method createMainButtons()
                 */
                createMainButtons() {
                    const that = this;
                    that.actions.addRange([
                        new GAction({
                            name: "actSave",
                            caption: "Uložit",
                            icon: "fa-floppy-o",
                            run: function () {
                                that.ok();
                            }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () {
                                that.close(false);
                            }
                        }),
                    ]);
                    that.commandBar([
                        { action: that.actions["actSave"], position: "right", primary: true },
                        { action: that.actions["actClose"], position: "right" }
                    ]);
                }
                //########################################################################################
                /**
                 * Metoda pro vytvoření akcí na Detailu předpisu
                 * @method createActions()
                 */
                createActions() {
                    this.actions.addRange([{
                            name: "actGOpravnyPredpisZavritPotomky",
                            run: () => {
                                this.tryCloseAllSignificants();
                            }
                        }]);
                }
                //#endregion
                //########################################################################################
                //#region Funkce
                prepocetCastek(index) {
                    const that = this;
                    if (!(that.modelPhl.priz_dph_zakl == 1 ||
                        that.modelPhl.priz_dph_sniz == 1 ||
                        that.modelPhl.priz_dph_sniz2 == 1 ||
                        that.modelPhl.priz_osvob == 1 ||
                        that.modelPhl.priz_dph2 == 0)) { // Pokud není daňový příjem nic se nemusí dopočítávat
                        that.prvniNastaveni = true;
                        that.findFields("c_z0").gfield("setValue", new Decimal(0), { initialValues: that.prvniNastaveni });
                        that.findFields("c_z1").gfield("setValue", new Decimal(0), { initialValues: that.prvniNastaveni });
                        that.findFields("c_z2").gfield("setValue", new Decimal(0), { initialValues: that.prvniNastaveni });
                        that.findFields("c_z3").gfield("setValue", new Decimal(0), { initialValues: that.prvniNastaveni });
                        that.findFields("c_z4").gfield("setValue", new Decimal(0), { initialValues: that.prvniNastaveni });
                        that.findFields("c_d0").gfield("setValue", new Decimal(0), { initialValues: that.prvniNastaveni });
                        that.findFields("c_d1").gfield("setValue", new Decimal(0), { initialValues: that.prvniNastaveni });
                        that.findFields("c_d2").gfield("setValue", new Decimal(0), { initialValues: that.prvniNastaveni });
                        that.findFields("c_d3").gfield("setValue", new Decimal(0), { initialValues: that.prvniNastaveni });
                        that.findFields("c_d4").gfield("setValue", new Decimal(0), { initialValues: that.prvniNastaveni });
                        that.prvniNastaveni = false;
                        return;
                    }
                    if (index > 0) {
                        var predpisDto = {};
                        that.findFields().gfield("model", "collect", predpisDto);
                        let dat_vzniku = that.findFields("dat_vzniku").gfield("getValue");
                        var n_zakladni = new Decimal(this.zDph);
                        //var n_zakladni: Decimal = new Decimal(Common.Base.getProcentoDane(10, that.sazbyDPH, dat_vzniku) ?? 5);
                        var n_snizena = new Decimal(this.sDph);
                        //var n_snizena: Decimal = new Decimal(Common.Base.getProcentoDane(20, that.sazbyDPH, dat_vzniku) ?? 19);
                        var n_treti = new Decimal(this.s2Dph);
                        //var n_treti: Decimal = new Decimal(Common.Base.getProcentoDane(30, that.sazbyDPH, dat_vzniku) ?? 0);
                        //var n_treti: Decimal = new Decimal(this.s2Dph);
                        //var n_ctvrta: Decimal = new Decimal(Common.Base.getProcentoDane(40, that.sazbyDPH, dat_vzniku) ?? 0);
                        let c_dph_rp, c_bez_dph_rp; // návratové proměnné
                        // Výpočet sníženéhp DPH
                        let c_z1 = that.findFields("c_z1").gfield("getValue") ?? new Decimal(0);
                        if (!c_z1.eq(0)) {
                            [c_bez_dph_rp, c_dph_rp] = WebClient.Common.Base.vypocet_dph(c_z1, false, n_snizena, this.vypocetDPHpoNovu);
                            if (predpisDto.c_d1?.toString() == "0") {
                                predpisDto.c_d1 = c_bez_dph_rp;
                                that.findFields("c_d1").gfield("setValue", c_bez_dph_rp);
                            }
                        }
                        // Výpočet normalního DPH
                        let c_z2 = that.findFields("c_z2").gfield("getValue") ?? new Decimal(0);
                        if (!c_z2.eq(0)) {
                            [c_bez_dph_rp, c_dph_rp] = WebClient.Common.Base.vypocet_dph(c_z2, false, n_zakladni, this.vypocetDPHpoNovu);
                            if (predpisDto.c_d2?.toString() == "0") {
                                predpisDto.c_d2 = c_bez_dph_rp;
                                that.findFields("c_d2").gfield("setValue", c_bez_dph_rp);
                            }
                        }
                        // Výpočet třetího DPH
                        let c_z3 = that.findFields("c_z3").gfield("getValue") ?? new Decimal(0);
                        if (!c_z3.eq(0)) {
                            [c_bez_dph_rp, c_dph_rp] = WebClient.Common.Base.vypocet_dph(c_z3, false, n_treti, this.vypocetDPHpoNovu);
                            if (predpisDto.c_d3?.toString() == "0") {
                                predpisDto.c_d3 = c_bez_dph_rp;
                                that.findFields("c_d3").gfield("setValue", c_bez_dph_rp);
                            }
                        }
                        //// Výpočet čtvrtého DPH
                        //let c_z4: Decimal = that.findFields("c_z4").gfield<Decimal>("getValue") ?? new Decimal(0);
                        //if (!c_z4.eq(0)) {
                        //    [c_bez_dph_rp, c_dph_rp] = Common.Base.vypocet_dph(c_z4, false, n_ctvrta, this.vypocetDPHpoNovu);
                        //    if (predpisDto.c_d4?.toString() == "0") {//TEST
                        //        predpisDto.c_d4 = c_bez_dph_rp;
                        //        that.findFields("c_d4").gfield("setValue", c_bez_dph_rp);
                        //    }
                        //}
                    }
                }
                //########################################################################################
                zmenaDatumu(zmena) {
                    const that = this;
                    let c_zmena = that.findFields("c_zmena").gfield("getValue");
                    let opr_proc = that.findFields("opr_proc").gfield("getValue");
                    let ktg_upo = that.findFields("ktg_upo").gfield("getValue").ktg_upo;
                    let dat_spl = that.findFields("dat_spl").gfield("getValue");
                    let dat_vzniku = that.findFields("dat_vzniku").gfield("getValue");
                    if (!(that.modelPhl.priz_dph_zakl == 1 || that.modelPhl.priz_dph_sniz == 1 || that.modelPhl.priz_dph_sniz2 == 1)) {
                        let c_opr = c_zmena.mul(opr_proc).div(100);
                        that.prvniNastaveni = true;
                        that.findFields("c_z0").gfield("setValue", new Decimal(c_zmena), { initialValues: that.prvniNastaveni });
                        that.findFields("c_opr_zmena").gfield("setValue", new Decimal(c_opr), { initialValues: that.prvniNastaveni });
                        that.prvniNastaveni = false;
                    }
                    if (zmena) {
                        that.call("ZjistiSazbyDph", { datum: dat_vzniku }).done((ret) => {
                            //var test1 = ret;
                        });
                        that.call("GetVypocetDPHpoNovu", { datum: dat_vzniku }).done((ret) => {
                            //var test2 = ret;
                        });
                    }
                    that.NastavPriznakVyznamnaCastka(c_zmena, dat_vzniku, dat_spl);
                    that.NastavNovyKtgUpoNove(ktg_upo, dat_spl, dat_vzniku);
                }
                //########################################################################################
                NastavPriznakVyznamnaCastka(c_zmena, dat_vzniku, dat_spl) {
                    const that = this;
                    //let dat_spl = that.findFields("dat_spl").gfield<Date>("getValue");
                    //let dat_vzniku = that.findFields("dat_vzniku").gfield<Date>("getValue");
                    //let c_zmena: Decimal = that.findFields("c_zmena").gfield<Decimal>("getValue");
                    if (dat_spl.getFullYear() >= that.modelPhl.Nastaveni?.rok) {
                        that.findFields("vyznmna_castka").gfield("option", "disabled", true);
                        that.findFields("vyznmna_castka").gfield("setValue", false);
                    }
                    else {
                        that.findFields("vyznmna_castka").gfield("option", "disabled", false);
                        if (c_zmena > new Decimal(260000) && dat_spl.getFullYear() < dat_vzniku.getFullYear()) {
                            that.findFields("vyznmna_castka").gfield("setValue", true);
                        }
                        else {
                            that.findFields("vyznmna_castka").gfield("setValue", false);
                        }
                    }
                }
                //########################################################################################
                NastavNovyKtgUpoNove(ktg_upo, dat_spl, dat_vzniku) {
                    const that = this;
                    let def = $.Deferred();
                    that.ktg_upo_nova = ktg_upo;
                    if (dat_spl.getFullYear() < dat_vzniku.getFullYear() || dat_spl.getFullYear() == dat_vzniku.getFullYear()) {
                        let c_zmena = that.findFields("c_zmena").gfield("getValue");
                        let zpusob = dat_spl.getFullYear() == dat_vzniku.getFullYear() ? 1 : 0; // 0 - rovná se, 1 - menší
                        Gordic.Isl.Predpisy.nastavNovyKtgUpoNove({ ktg_upo: ktg_upo, c_zmena: c_zmena, zpusob: zpusob })
                            .get()
                            .done((ret) => {
                            that.ktg_upo_nova = ret;
                            that.findFields("ktg_upo_novy").gfield("model", "apply", { ktg_upo: that.ktg_upo_nova });
                            def.resolve(ret);
                        })
                            .fail((jqXHR, typ, obj) => {
                            def.reject(jqXHR, typ, obj);
                        });
                        return def.promise();
                    }
                    else {
                        that.findFields("ktg_upo_novy").gfield("model", "apply", { ktg_upo: that.ktg_upo_nova });
                        return def.resolve().promise();
                    }
                }
                //########################################################################################
                nastavPole() {
                    const that = this;
                    let opr = that.nactenaData;
                    let pre = that.puvodniPredpis;
                    let neuhr = Decimal.sub(opr.c, opr.c_uhr);
                    that.findFields("c").gfield("setValue", opr.c);
                    that.findFields("c_neuhr").gfield("setValue", neuhr);
                    that.findFields("ktg_upo").gfield("model", "apply", { ktg_upo: pre.ktg_upo });
                    that.findFields("dat_vzniku").gfield("setValue", that.today);
                    that.findFields("dat_spl").gfield("setValue", pre.dat_spl);
                    that.findFields("c_zmena").gfield("setValue", opr.c_zmena);
                    that.findFields("c_z0").gfield("setValue", new Decimal(0));
                    that.findFields("c_d0").gfield("setValue", new Decimal(0));
                    that.findFields("c_z1").gfield("setValue", new Decimal(0));
                    that.findFields("c_d1").gfield("setValue", new Decimal(0));
                    that.findFields("c_z2").gfield("setValue", new Decimal(0));
                    that.findFields("c_d2").gfield("setValue", new Decimal(0));
                    that.findFields("c_z3").gfield("setValue", new Decimal(0));
                    that.findFields("c_d3").gfield("setValue", new Decimal(0));
                    that.findFields("c_z4").gfield("setValue", new Decimal(0));
                    that.findFields("c_d4").gfield("setValue", new Decimal(0));
                    that.findFields("c_zao").gfield("setValue", new Decimal(0));
                    that.findFields("vyznmna_castka").gfield("setValue", opr.vyznamna_castka);
                    that.findFields("poznamka").gfield("setValue", opr.poznamka);
                    that.findFields("pri_uhr").gfield("setValue", pre.pri_uhr);
                    that.findFields("pri_uhr_old").gfield("setValue", pre.pri_uhr);
                    that.findFields("c_opr").gfield("setValue", opr.c_opr);
                    that.findFields("opr_proc").gfield("setValue", opr.opr_proc);
                    that.findFields("c_opr_zmena").gfield("setValue", opr.c_opr_zmena);
                    that.findFields("dat_opr").gfield("setValue", opr.dat_opr_posl);
                    that.NastavPriznakVyznamnaCastka(parseDecimal(opr.c_zmena), that.today, parseDate(pre.dat_spl));
                    that.NastavNovyKtgUpoNove(pre.ktg_upo, parseDate(pre.dat_spl), that.today);
                    //	Call gf_ZobrazVarovani('Pro předpisy s datem splatnosti ' || gf_FormatujDatum(ip_dat_spl) || ' a kategorii pohybu ' || gf_NumberToStr(ip_ktg_upo) || ' již existuje oprava výše předpisu! 
                    //			Opravu lze pořídit, je ale zobrazena pouze původní výše předpisu.' )
                    //Return TRUE
                }
                //#endregion
                //########################################################################################
                ulozeniOpravyPredpisu(dataOpravyPredpisu) {
                    const that = this;
                    WebClient.Common.Base.ProcessResponse(that.isl.Predpisy.ulozOpravuPredpisu({ d: dataOpravyPredpisu }).get(), this, false, false)
                        .done(function (ret) {
                        // Všecko ok mohu pokračovat...
                        that.endOperation({ id: "ulozeniPredpisu" });
                        that.close();
                        // Zavřít okno? etc...
                    })
                        .fail(function (jqXHR, typ, obj) {
                        that.endOperation({ id: "ulozeniPredpisu" });
                        //TODO: ProcessResponse - zde upraveno -> k testu
                        //if (typ === "exception") {
                        //    obj.handled = true;
                        //    return that.dialogs.error("Chyba", obj.baseMessage);
                        //}
                    });
                }
                //########################################################################################
                /**
                 * Akce po kliknutí na tlačítko OK
                 * @method ok()
                 * @returns Uložení uložení předpisu v případě úspěchu
                 */
                ok() {
                    const that = this;
                    that.beginOperation({ id: "ulozeniPredpisu", text: "Probíhá ukládání opravy předpisu..." });
                    var hasChanged = this.findForms().gform("hasChanged");
                    if (!hasChanged) {
                        that.endOperation({ id: "ulozeniPredpisu" });
                        return that.dialogs.warning("Upozornění", "Nedošlo k žádné změně - není co uložit");
                    }
                    let validTest = this.findForms().gform("isValid", true);
                    if (validTest === false) {
                        that.endOperation({ id: "ulozeniPredpisu" });
                        return that.dialogs.error("Chyba", "Některá pole nejsou správně vyplněna");
                    }
                    //#region Načtení dat z okna do DTO objektu pro uložení
                    let d = that.nactenaData;
                    d.radek_uhr = that.Radek_uhr;
                    d.c = that.findFields("c").gfield("getValue");
                    d.c_neuhr = that.findFields("c_neuhr").gfield("getValue");
                    d.dat_spl = that.findFields("dat_spl").gfield("getValue");
                    d.ktg_upo = that.findFields("ktg_upo").gfield("getValue").ktg_upo;
                    d.pri_uhr_old = that.findFields("pri_uhr_old").gfield("getValue");
                    d.c_zmena = that.findFields("c_zmena").gfield("getValue");
                    d.dat_vzniku = that.findFields("dat_vzniku").gfield("getValue");
                    d.ktg_upo_novy = that.findFields("ktg_upo_novy").gfield("getValue").ktg_upo;
                    d.pri_uhr = that.findFields("pri_uhr").gfield("getValue");
                    d.poznamka = that.findFields("poznamka").gfield("getValue");
                    d.vyznamna_castka = that.findFields("vyznmna_castka").gfield("getValue");
                    d.c_z0 = that.findFields("c_z0").gfield("getValue");
                    d.c_d0 = that.findFields("c_d0").gfield("getValue");
                    d.c_z1 = that.findFields("c_z1").gfield("getValue");
                    d.c_d1 = that.findFields("c_d1").gfield("getValue");
                    d.c_z2 = that.findFields("c_z2").gfield("getValue");
                    d.c_d2 = that.findFields("c_d2").gfield("getValue");
                    d.c_z3 = that.findFields("c_z3").gfield("getValue");
                    d.c_d3 = that.findFields("c_d3").gfield("getValue");
                    d.c_z4 = that.findFields("c_z4").gfield("getValue");
                    d.c_d4 = that.findFields("c_d4").gfield("getValue");
                    d.c_zao = that.findFields("c_zao").gfield("getValue");
                    d.c_opr = that.findFields("c_opr").gfield("getValue");
                    d.opr_proc = that.findFields("opr_proc").gfield("getValue");
                    d.c_opr_zmena = that.findFields("c_opr_zmena").gfield("getValue");
                    d.dat_opr = that.findFields("dat_opr").gfield("getValue");
                    //#endregion
                    //#region kontrola částek před uložením
                    let nula = new Decimal(0);
                    //TODO: kontrola dat
                    if (!d.c_z0.equals(nula) || // != nula ||
                        !d.c_z1.equals(nula) || // != nula ||
                        !d.c_z2.equals(nula) || // != nula ||
                        !d.c_z3.equals(nula) || // != nula ||
                        !d.c_z4.equals(nula) || // != nula ||
                        !d.c_d0.equals(nula) || // != nula ||
                        !d.c_d1.equals(nula) || // != nula ||
                        !d.c_d2.equals(nula) || // != nula ||
                        !d.c_d3.equals(nula) || // != nula ||
                        !d.c_d4.equals(nula)) { // != nula) {
                        let suma_dph = d.c_zao.plus(d.c_d0).plus(d.c_d1).plus(d.c_d2).plus(d.c_d3).plus(d.c_d4).plus(d.c_z0).plus(d.c_z1).plus(d.c_z2).plus(d.c_z3).plus(d.c_z4);
                        //if (d.c_zmena.toNumber() != suma_dph.toNumber()) {
                        if (!d.c_zmena.equals(suma_dph)) {
                            that.endOperation({ id: "ulozeniPredpisu" });
                            return that.dialogs.error("Chyba", `Nesouhlasí rozpis DPH a částky v CZK! <br> <br> Suma částek DPH je ${suma_dph} CZK <br> Částka případu v CZK je ${d.c_zmena} CZK <br> Rozdíl je ${d.c_zmena.minus(suma_dph)} CZK`)
                                .on("ok", function () {
                                that.element.findFields('c_zmena').gfield('focus');
                            });
                        }
                    }
                    if (d.c_zmena < new Decimal(0)) {
                        if (d.c_zmena.abs() > d.c) {
                            that.endOperation({ id: "ulozeniPredpisu" });
                            return that.dialogs.error("Chyba", "Částku předpisu nelze sníží více než o " + d.c.abs() + " CZK !")
                                .on("ok", function () {
                                that.element.findFields('c_zmena').gfield('focus');
                            });
                        }
                    }
                    if (d.c_zmena.equals(nula)) { // == nula) {
                        that.endOperation({ id: "ulozeniPredpisu" });
                        return that.dialogs.error("Chyba", "Opravou musí být nenulová částka!")
                            .on("ok", function () {
                            that.element.findFields('c_zmena').gfield('focus');
                        });
                    }
                    //#endregion
                    // Kontrola zda se nejedná o uzavřené období
                    if (d.dat_vzniku < that.modelPhl.Nastaveni?.dat_uzav) {
                        that.dialogs.confirm("Upozornění", "Datum vzniku předpisu je zadán do uzavřeného období - vytvořený předpis se uzavře <br> <br> Chcete pokračovat ?")
                            .on("close", (ev, retVal) => {
                            if (retVal === "yes") {
                                // Souhlasím s tím, že chci uložit i přesto, že je to uzavřené období
                                that.ulozeniOpravyPredpisu(d);
                            }
                            else {
                                // Nesouhlasím -> focus na datum vzniku které můžu změnit
                                that.element.findFields('dat_vzniku').gfield('focus');
                                return 0;
                            }
                        });
                    }
                    // Všechno proběhlo v pohodě, mohu přistoupit k samotnému uložení
                    that.ulozeniOpravyPredpisu(d);
                }
            };
            GOpravaPredpisu = __decorate([
                Decorators.gcontent
                /**
                 * Okno pro opravu předpisu
                 * @author Martin Hanuš
                 * @copyright © GORDIC spol. s r. o. 1993-2024
                 * @created 2024-12-12
                 * @lastModified 2024-12-12
                 */
            ], GOpravaPredpisu);
            WebClient.GOpravaPredpisu = GOpravaPredpisu;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR09wcmF2YVByZWRwaXN1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR09wcmF2YVByZWRwaXN1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBdzhCZjtBQXg4QkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBdzhCbkI7SUF4OEJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F3OEI3QjtRQXg4Qm9CLFdBQUEsU0FBUztZQVMxQixJQUFhLGVBQWU7WUFQNUI7Ozs7OztlQU1HO1lBQ0gsTUFBYSxlQUFnQixTQUFRLE9BQUEsWUFBWTtnQkFBakQ7O29CQUtJLG1CQUFjLEdBQVksSUFBSSxDQUFDO29CQStzQi9CLDBGQUEwRjtvQkFFMUYscUJBQXFCO29CQUNyQiw2QkFBNkI7b0JBQzdCLHdCQUF3QjtvQkFDeEIsMEVBQTBFO29CQUMxRSwyRkFBMkY7b0JBQzNGLDJGQUEyRjtvQkFDM0YsMkNBQTJDO29CQUMzQyxxQkFBcUI7b0JBQ3JCLCtDQUErQztvQkFDL0MsaURBQWlEO29CQUNqRCx1REFBdUQ7b0JBQ3ZELHFFQUFxRTtvQkFDckUsd0NBQXdDO29CQUN4QyxZQUFZO29CQUNaLHFFQUFxRTtvQkFDckUsOENBQThDO29CQUM5QyxZQUFZO29CQUVaLG1CQUFtQjtvQkFDbkIsOENBQThDO29CQUM5Qyw4Q0FBOEM7b0JBQzlDLDZEQUE2RDtvQkFDN0QsbUJBQW1CO29CQUNuQix3Q0FBd0M7b0JBQ3hDLDhDQUE4QztvQkFDOUMsWUFBWTtvQkFDWixvRUFBb0U7b0JBQ3BFLDhDQUE4QztvQkFDOUMsbURBQW1EO29CQUNuRCw4QkFBOEI7b0JBQzlCLGtDQUFrQztvQkFDbEMsNEJBQTRCO29CQUM1Qiw2QkFBNkI7b0JBQzdCLDRCQUE0Qjtv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QyxNQUFNLENBQVUsVUFBVSxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO3dCQUM1RyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBVSxVQUFVLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7d0JBQzVHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFVLFVBQVUsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQzt3QkFDNUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQVUsVUFBVSxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO3dCQUM1RyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBVSxVQUFVLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7d0JBQzVHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFVLFVBQVUsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQzt3QkFDNUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQVUsVUFBVSxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxj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QyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7b0JBQzdFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7b0JBQzVELElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7b0JBQzFELElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7b0JBQzFELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUMxRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtvQkFDMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQzFELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUMxRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtvQkFDMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQzFELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUMxRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtvQkFDMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQzFELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUMxRCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtvQkFDM0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO29CQUN6RSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO29CQUM1RCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO29CQUMxRCxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO29CQUM5RCxJQUFJLENBQUMsVUFB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QVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztvQkFDNUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDMUQsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDNUQsQ0FBQyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN6RSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFVLFVBQVUsQ0FBQyxDQUFDO29CQUM3RCxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFVLFVBQVUsQ0FBQyxDQUFDO29CQUM3RCxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFVLFVBQVUsQ0FBQyxDQUFDO29CQUM3RCxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFVLFVBQVUsQ0FBQyxDQUFDO29CQUM3RCxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFVLFVBQVUsQ0FBQyxDQUFDO29CQUM3RCxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFVLFVBQVUsQ0FBQyxDQUFDO29CQUM3RCxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFVLFVBQVUsQ0FBQyxDQUFDO29CQUM3RCxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFVLFVBQVUsQ0FBQyxDQUFDO29CQUM3RCxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFVLFVBQVUsQ0FBQyxDQUFDO29CQUM3RCxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFVLFVBQVUsQ0FBQyxDQUFDO29CQUM3RCxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFVLFVBQVUsQ0FBQyxDQUFDO29CQUMvRCxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFVLFVBQVUsQ0FBQyxDQUFDO29CQUMvRCxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFVLFVBQVUsQ0FBQyxDQUFDO29CQUNyRSxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFVLFVBQVUsQ0FBQyxDQUFDO29CQUMzRSxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFPLFVBQVUsQ0FBQyxDQUFDO29CQUNoRSxZQUFZO29CQUVaLHVDQUF1QztvQkFDdkMsSUFBSSxJQUFJLEdBQVksSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQ2xDLG9CQUFvQjtvQkFDcEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWE7d0JBQ3JDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksYUFBYTt3QkFDckMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFhO3dCQUNyQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWE7d0JBQ3JDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksYUFBYTt3QkFDckMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFhO3dCQUNyQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWE7d0JBQ3JDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksYUFBYTt3QkFDckMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFhO3dCQUNyQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxhQUFhO3dCQUNyQyxJQUFJLFFBQVEsR0FBWSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxD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SixDQUFBO1lBOTdCWSxlQUFlO2dCQVIzQixVQUFVLENBQUMsUUFBUTtnQkFDcEI7Ozs7OzttQkFNRztlQUNVLGVBQWUsQ0E4N0IzQjtZQTk3QlkseUJBQWUsa0JBODdCM0IsQ0FBQTtRQUNMLENBQUMsRUF4OEJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUF3OEI3QjtJQUFELENBQUMsRUF4OEJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUF3OEJuQjtBQUFELENBQUMsRUF4OEJTLE1BQU0sS0FBTixNQUFNLFFBdzhCZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HT3ByYXZhUHJlZHBpc3UudHMgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gT2tubyBwcm8gb3ByYXZ1IHDFmWVkcGlzdSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjQtMDgtMjkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgLyoqXHJcbiAgICAgKiBPa25vIHBybyBvcHJhdnUgcMWZZWRwaXN1IFxyXG4gICAgICogQGF1dGhvciBNYXJ0aW4gSGFudcWhXHJcbiAgICAgKiBAY29weXJpZ2h0IMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNFxyXG4gICAgICogQGNyZWF0ZWQgMjAyNC0xMi0xMlxyXG4gICAgICogQGxhc3RNb2RpZmllZCAyMDI0LTEyLTEyXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBHT3ByYXZhUHJlZHBpc3UgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIC8vIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG4gICAgICAgIC8vI3JlZ2lvbiBWc3R1cG7DrSBwYXJhbWV0cnkgICAgICAgXHJcbiAgICAgICAgSXhwOiBzdHJpbmc7XHJcbiAgICAgICAgUmFkZWtfdWhyOiBudW1iZXI7XHJcbiAgICAgICAgcHJ2bmlOYXN0YXZlbmk6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgIGt0Z191cG9fbm92YTogbnVtYmVyO1xyXG4gICAgICAgIHRvZGF5OiBEYXRlO1xyXG5cclxuICAgICAgICAvKiogU27DrcW+ZW7DoSBzYXpiYSBEUEggeiBkb2tsYWR1ICovXHJcbiAgICAgICAgcHVibGljIHNEcGg6IERlY2ltYWw7XHJcblxyXG4gICAgICAgIC8qKiAyLiBzbsOtxb5lbsOhIHNhemJhIERQSCB6IGRva2xhZHUgKi9cclxuICAgICAgICBwdWJsaWMgczJEcGg6IERlY2ltYWw7XHJcblxyXG4gICAgICAgIC8qKiBaw6FrbGFkbsOtIHNhemJhIERQSCB6IGRva2xhZHUgKi9cclxuICAgICAgICBwdWJsaWMgekRwaDogRGVjaW1hbDtcclxuXHJcbiAgICAgICAgLyoqIEluZGlrw6F0b3IsIHpkYSBzZSBwb8SNw610w6EgRFBIICh6aG9yYSBuZWJvIHplc3BvZGEpIHBvIG5vdnUgwqczNy8yMDE5IHMgKi9cclxuICAgICAgICBwcml2YXRlIHZ5cG9jZXREUEhwb05vdnU6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIC8qKiBVcG96b3JuxJtuw60gemppxaF0xJtuw6kgcMWZaSBuYcSNw610w6Fuw60gbmEgYyMgc3RyYW7EmyAqL1xyXG4gICAgICAgIHByaXZhdGUgd2FybmluZzogc3RyaW5nO1xyXG5cclxuICAgICAgICAvKiogVnN0dXBuw60gZGF0YSBwcm8gb3ByYXZ1ICovXHJcbiAgICAgICAgcHJvdGVjdGVkIG5hY3RlbmFEYXRhOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0RhdGFPcHJhdnlQcmVkcGlzdUR0bztcclxuXHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqICBEVE8gcMWZZWRwaXN1XHJcbiAgICAgICAgICogIEB0eXBlIHtHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByZWRwaXNEdG99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIG1vZGVsUHJlZHBpc3U6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJlZHBpc0R0bztcclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICogIERUTyBwxZnDrXBhZHVcclxuICAgICAgICAgKiAgQHR5cGUge0dvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJlZHBpc0R0b31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgcHV2b2RuaVByZWRwaXM6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJlZHBpc0R0bztcclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICogIERUTyBUeXB1IHBvaGxlZMOhdmt5XHJcbiAgICAgICAgICogIEB0eXBlIHtHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1R5cFBvaGxlZGF2a3lEdG99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIG1vZGVsUGhsOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1R5cFBvaGxlZGF2a3lEdG87XHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIER0byBzIHBhcmFtZXRyeSBhcGxpa2FjZSBERFAgXHJcbiAgICAgICAgICogQHR5cGUge0dvcmRpYy5EZHAuSW50ZXJmYWNlLkdEZHBQYXJhbWV0cnlEdG99XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIERiUGFyYW1zOiBHb3JkaWMuRGRwLkludGVyZmFjZS5HRGRwUGFyYW1ldHJ5RHRvO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBEVE8gUMWZw61zdHVwxa8gayBqZWRub3RsaXbDvW0gcG9sw63EjWt1bSBwxZllZHBpc3VcclxuICAgICAgICAgKiAgQHR5cGUge0dvcmRpYy5EZHAuSW50ZXJmYWNlLkdQcmlwYWRQcmVkcGlzUGVybXNEdG99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIHBlcm1zRHRvOiBHb3JkaWMuRGRwLkludGVyZmFjZS5HUHJpcGFkUHJlZHBpc1Blcm1zRHRvO1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgc2F6YnlEUEg6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HRWtvY2RhcER0b1tdO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBrdXJ6eU1lbnlEdG86IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HRWtvZGt1ckR0b1tdO1xyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuc2V0QnJlYWRjcnVtYnMoW3sgY2FwdGlvbjogdGhpcy50aXRsZSwgZGVmYXVsdEFjdGlvbjogdHJ1ZSB9XSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy53YXJuaW5nKSB7IHRoaXMuZGlhbG9ncy53YXJuaW5nKFwiVXBvem9ybsSbbsOtXCIsIHRoaXMud2FybmluZyk7IH0gXHJcbiAgICAgICAgICAgIHRoYXQudG9kYXkgPSBwYXJzZURhdGUodGhhdC50b2RheSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVNYWluQnV0dG9ucygpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZU1haW5Gb3JtKCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0Lm5hc3RhdlBvbGUoKTsgIFxyXG4gICAgICAgICAgICB0aGlzLnBydm5pTmFzdGF2ZW5pID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRmllbGRzKCdjX3ptZW5hJykuZ2ZpZWxkKCdmb2N1cycpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIC8vIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG4gICAgICAgIC8vI3JlZ2lvbiBTZXN0YXZlbsOtIG9rbmFcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHZ5dHZvxZllbsOtIGhsYXZuw61obyBmb3JtdWzDocWZZSBkZXRhaWx1IHDFmWVkcGlzdVxyXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlTWFpbkZvcm0oKSBcclxuICAgICAgICAgKi8gICAgIFxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWFpbkZvcm0oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBGb3Jtcy5Gb3JtKFwiTDJNMlMxLCBMLTEyLTEyLTAsIE0tMTItMTItMCwgUy0xMi0xMi0wXCIpXHJcbiAgICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJabcSbbmEgdsO9xaFlIHDFmWVkcGlzdVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk7DoXbDvcWhZW7DrS9TbsOtxb5lbsOtIMSNw6FzdGt5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0xMlwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3ptZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnptZW5hRGF0dW11KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gdnpuaWt1LCBQcmlvcml0YSDDumhyYWR5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctMTBcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3Z6bmlrdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQucHJ2bmlOYXN0YXZlbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56bWVuYURhdHVtdSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0yXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaV91aHJcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkthdGVnb3JpZSBwb2h5YnUgLSBub3bDoVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwgUHJlZmFicy5TZWxlY3QuZnVjY3VwbygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdGdfdXBvX25vdnlcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5rdGdfdXBvPXZhbHVlLmt0Z191cG9cIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlel9udWxhX3VwbzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAga3RnX3Vwbzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbzogXCI8XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2OiAyMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntrdGdfdXBvfSAtIHtrdGdfdXBvX3R4dDp0cmltOmVuY29kZX1cIlxyXG4gICAgICAgICAgICAgICAgfSkgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3puw6Fta2FcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTEyXCIsIHsgbmFtZTogXCJwb3puYW1rYVwiIH0pICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJPcHJhdm92YW7DvSBwxZllZHBpc1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIsSMw6FzdGthIHDFmWVkcGlzdVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctMTJcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY1wiLCBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiWiB0b2hvIG5ldWhyYXplbm9cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTEyXCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfbmV1aHJcIiwgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkthdGVnb3JpZSBwb2h5YnVcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTEyXCIsIFByZWZhYnMuU2VsZWN0LmZ1Y2N1cG8oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3RnX3Vwb1wiLCBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5rdGdfdXBvPXZhbHVlLmt0Z191cG9cIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlel9udWxhX3VwbzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAga3RnX3Vwbzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbzogXCI8XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2OiAyMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntrdGdfdXBvfSAtIHtrdGdfdXBvX3R4dDp0cmltOmVuY29kZX1cIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBzcGxhdG5vc3RpLCBQcmlvcml0YSDDumhyYWR5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctMTBcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3NwbFwiLCBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpX3Vocl9vbGRcIiwgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlJvenBpcyBEUEhcIilcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiWsOha2wuIGJleiBEUEgsIE9zdi4gb2QgRFBIXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy02XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfejBcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlrDoWtsYWRuw60gxI3DoXN0a2EgYmV6IERQSFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJlcG9jZXRDYXN0ZWsoMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pIC8vIFrDoWtsLiBiZXogRFBIXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy02XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfZDBcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIsSMw6FzdGthIG9zdm9ib3plbmEgb2QgRFBIXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLmNfZDAhLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQucHJ2bmlOYXN0YXZlbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmVwb2NldENhc3RlaygwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkgLy8gT3N2LiBvZCBEUEhcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiWsOha2wuc27DrcW+LiwgRGHFiCBzbsOtxb4uXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy02XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfejFcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIsSMw6FzdGthIHrDoWtsYWR1IHBybyB2w71wb8SNZXQgc27DrcW+ZW7DqSBzYXpieSBEUEhcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uY196MSEsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXBvY2V0Q2FzdGVrKDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSAvLyBaw6FrbC5zbsOtxb4uIEQuXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy02XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfZDFcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIsSMw6FzdGthIGRhbsSbIHBybyB2w71wb8SNZXQgc27DrcW+ZW7DqSBzYXpieSBEUEhcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uY19kMSEsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXBvY2V0Q2FzdGVrKDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSAvLyBEYcWIIHNuw63Fvi4gRC5cclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiWsOha2wuIERQSCwgRGHFiCB6w6FrbC4gRFBIXCIpICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy02XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfejJcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIsSMw6FzdGthIHrDoWtsYWR1IHBybyB2w71wb8SNZXQgesOha2xhZG7DrSBzYXpieSBEUEhcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uY196MiEsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXBvY2V0Q2FzdGVrKDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSAvLyBaw6FrbC4gRFBIXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy02XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfZDJcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIsSMw6FzdGthIGRhbsSbIHBybyB2w71wb8SNZXQgesOha2xhZG7DrSBzYXpieSBEUEhcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uY19kMiEsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXBvY2V0Q2FzdGVrKDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSAvLyBEYcWIIHrDoWtsLiBEUEhcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiWsOha2wuMi5zbsOtxb4sIERhxYggMi5zbsOtxb5cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTZcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY196M1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiWsOha2xhZCB2IGRydWjDqSBzbsOtxb5lbsOpIHNhemLEmyBEUEhcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uY196MyEsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXBvY2V0Q2FzdGVrKDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSAvLyBaw6FrbC4yLnNuw63Fvi4gRC5cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTZcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19kM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiRGHFiCB2IGRydWjDqSBzbsOtxb5lbsOpIHNhemLEmyBEUEhcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uY19kMyEsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXBvY2V0Q2FzdGVrKDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSAvLyBEYcWIIDIuc27DrcW+LiBELlxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJaw6FrbC4yLnNuw63FviwgRGHFiCAyLnNuw63FviwgWmFva3JvdWhsZW5vXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfejRcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlrDoWtsYWQgdmUgdMWZZXTDrSBzbsOtxb5lbsOpIHNhemLEmyBEUEhcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uY196NCEsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXBvY2V0Q2FzdGVrKDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSAvLyBaw6FrbC4yLnNuw63Fvi4gRC5cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19kNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiRGHFiCB2ZSB0xZlldMOtIHNuw63FvmVuw6kgc2F6YsSbIERQSFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by5jX2Q0ISxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJlcG9jZXRDYXN0ZWsoMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pIC8vIERhxYggMi5zbsOtxb4uIEQuXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfemFvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCLEjMOhc3RrYSB6YW9rcm91aGxlbsOtIHDFmWVkcGlzdSBEUEhcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uY196YW8hLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQucHJ2bmlOYXN0YXZlbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmVwb2NldENhc3RlaygwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkgLy8gIFphb2tyb3VobGVub1xyXG4gICAgICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiT3ByYXZuw6EgcG9sb8W+a2FcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJPcHIuIHBvbC4tIGV4aXN0LlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctMTJcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19vcHJcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUHJvYy4gb3ByLlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctMTJcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwib3ByX3Byb2NcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiT3ByLiBwb2wuIC0gem3Em25hXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0xMlwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX29wcl96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXQuIHBvc2wuZ2VuLiBvcHIuXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X29wclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctMTJcIiwgeyBuYW1lOiBcInZ5em5tbmFfY2FzdGthXCIsIGxhYmVsOiBcIk9wcmF2eSBwxZllZGNow6F6ZWrDrWPDrWNoIMO6xI1ldG7DrWNoIG9iZG9iw60gLSB2w716bmFtbsOhIMSNw6FzdGthXCIgfSlcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG4gICAgICAgICAgICAvL3RoaXMuZGVmYXVsdEZvcm0uZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwidmFsaWRhdG9yc1wiLCB0aGlzLnZhbGlkYXRvcnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gdnl0dm/FmWVuw60gc3BvZG7DrWNoIHRsYcSNw610ZWsgb2tuYSBcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZU1haW5CdXR0b25zKClcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZU1haW5CdXR0b25zKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFNhdmVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVsb8W+aXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWZsb3BweS1vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub2soKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlphdsWZw610XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcihbXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0U2F2ZVwiXSwgcG9zaXRpb246IFwicmlnaHRcIiwgcHJpbWFyeTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdENsb3NlXCJdLCBwb3NpdGlvbjogXCJyaWdodFwiIH1cclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBha2PDrSBuYSBEZXRhaWx1IHDFmWVkcGlzdVxyXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlQWN0aW9ucygpIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKFt7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdPcHJhdm55UHJlZHBpc1phdnJpdFBvdG9ta3lcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2VBbGxTaWduaWZpY2FudHMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuICAgICAgICAvLyNyZWdpb24gRnVua2NlXHJcbiAgICAgICAgcHJpdmF0ZSBwcmVwb2NldENhc3RlayhpbmRleDogbnVtYmVyKSB7IFxyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmICghKHRoYXQubW9kZWxQaGwucHJpel9kcGhfemFrbCA9PSAxIHx8XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsUGhsLnByaXpfZHBoX3NuaXogPT0gMSB8fFxyXG4gICAgICAgICAgICAgICAgdGhhdC5tb2RlbFBobC5wcml6X2RwaF9zbml6MiA9PSAxIHx8XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsUGhsLnByaXpfb3N2b2IgPT0gMSB8fFxyXG4gICAgICAgICAgICAgICAgdGhhdC5tb2RlbFBobC5wcml6X2RwaDIgPT0gMCkpIHsgLy8gUG9rdWQgbmVuw60gZGHFiG92w70gcMWZw61qZW0gbmljIHNlIG5lbXVzw60gZG9wb8SNw610w6F2YXRcclxuICAgICAgICAgICAgICAgIHRoYXQucHJ2bmlOYXN0YXZlbmkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiY196MFwiKS5nZmllbGQ8RGVjaW1hbD4oXCJzZXRWYWx1ZVwiLCBuZXcgRGVjaW1hbCgwKSwgeyBpbml0aWFsVmFsdWVzOiB0aGF0LnBydm5pTmFzdGF2ZW5pIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiY196MVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJzZXRWYWx1ZVwiLCBuZXcgRGVjaW1hbCgwKSwgeyBpbml0aWFsVmFsdWVzOiB0aGF0LnBydm5pTmFzdGF2ZW5pIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiY196MlwiKS5nZmllbGQ8RGVjaW1hbD4oXCJzZXRWYWx1ZVwiLCBuZXcgRGVjaW1hbCgwKSwgeyBpbml0aWFsVmFsdWVzOiB0aGF0LnBydm5pTmFzdGF2ZW5pIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiY196M1wiKS5nZmllbGQ8RGVjaW1hbD4oXCJzZXRWYWx1ZVwiLCBuZXcgRGVjaW1hbCgwKSwgeyBpbml0aWFsVmFsdWVzOiB0aGF0LnBydm5pTmFzdGF2ZW5pIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiY196NFwiKS5nZmllbGQ8RGVjaW1hbD4oXCJzZXRWYWx1ZVwiLCBuZXcgRGVjaW1hbCgwKSwgeyBpbml0aWFsVmFsdWVzOiB0aGF0LnBydm5pTmFzdGF2ZW5pIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiY19kMFwiKS5nZmllbGQ8RGVjaW1hbD4oXCJzZXRWYWx1ZVwiLCBuZXcgRGVjaW1hbCgwKSwgeyBpbml0aWFsVmFsdWVzOiB0aGF0LnBydm5pTmFzdGF2ZW5pIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiY19kMVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJzZXRWYWx1ZVwiLCBuZXcgRGVjaW1hbCgwKSwgeyBpbml0aWFsVmFsdWVzOiB0aGF0LnBydm5pTmFzdGF2ZW5pIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiY19kMlwiKS5nZmllbGQ8RGVjaW1hbD4oXCJzZXRWYWx1ZVwiLCBuZXcgRGVjaW1hbCgwKSwgeyBpbml0aWFsVmFsdWVzOiB0aGF0LnBydm5pTmFzdGF2ZW5pIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiY19kM1wiKS5nZmllbGQ8RGVjaW1hbD4oXCJzZXRWYWx1ZVwiLCBuZXcgRGVjaW1hbCgwKSwgeyBpbml0aWFsVmFsdWVzOiB0aGF0LnBydm5pTmFzdGF2ZW5pIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiY19kNFwiKS5nZmllbGQ8RGVjaW1hbD4oXCJzZXRWYWx1ZVwiLCBuZXcgRGVjaW1hbCgwKSwgeyBpbml0aWFsVmFsdWVzOiB0aGF0LnBydm5pTmFzdGF2ZW5pIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wcnZuaU5hc3RhdmVuaSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJlZHBpc0R0bzogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmVkcGlzRHRvID0ge307XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgcHJlZHBpc0R0byk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRhdF92em5pa3UgPSB0aGF0LmZpbmRGaWVsZHMoXCJkYXRfdnpuaWt1XCIpLmdmaWVsZDxEYXRlPihcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBuX3pha2xhZG5pOiBEZWNpbWFsID0gbmV3IERlY2ltYWwodGhpcy56RHBoKTtcclxuICAgICAgICAgICAgICAgIC8vdmFyIG5femFrbGFkbmk6IERlY2ltYWwgPSBuZXcgRGVjaW1hbChDb21tb24uQmFzZS5nZXRQcm9jZW50b0RhbmUoMTAsIHRoYXQuc2F6YnlEUEgsIGRhdF92em5pa3UpID8/IDUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5fc25pemVuYTogRGVjaW1hbCA9IG5ldyBEZWNpbWFsKHRoaXMuc0RwaCk7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBuX3NuaXplbmE6IERlY2ltYWwgPSBuZXcgRGVjaW1hbChDb21tb24uQmFzZS5nZXRQcm9jZW50b0RhbmUoMjAsIHRoYXQuc2F6YnlEUEgsIGRhdF92em5pa3UpID8/IDE5KTtcclxuICAgICAgICAgICAgICAgIHZhciBuX3RyZXRpOiBEZWNpbWFsID0gbmV3IERlY2ltYWwodGhpcy5zMkRwaCk7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBuX3RyZXRpOiBEZWNpbWFsID0gbmV3IERlY2ltYWwoQ29tbW9uLkJhc2UuZ2V0UHJvY2VudG9EYW5lKDMwLCB0aGF0LnNhemJ5RFBILCBkYXRfdnpuaWt1KSA/PyAwKTtcclxuICAgICAgICAgICAgICAgIC8vdmFyIG5fdHJldGk6IERlY2ltYWwgPSBuZXcgRGVjaW1hbCh0aGlzLnMyRHBoKTtcclxuICAgICAgICAgICAgICAgIC8vdmFyIG5fY3R2cnRhOiBEZWNpbWFsID0gbmV3IERlY2ltYWwoQ29tbW9uLkJhc2UuZ2V0UHJvY2VudG9EYW5lKDQwLCB0aGF0LnNhemJ5RFBILCBkYXRfdnpuaWt1KSA/PyAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgY19kcGhfcnA6IERlY2ltYWwsIGNfYmV6X2RwaF9ycDogRGVjaW1hbDsgLy8gbsOhdnJhdG92w6kgcHJvbcSbbm7DqVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFbDvXBvxI1ldCBzbsOtxb5lbsOpaHAgRFBIXHJcbiAgICAgICAgICAgICAgICBsZXQgY196MTogRGVjaW1hbCA9IHRoYXQuZmluZEZpZWxkcyhcImNfejFcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIikgPz8gbmV3IERlY2ltYWwoMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNfejEuZXEoMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBbY19iZXpfZHBoX3JwLCBjX2RwaF9ycF0gPSBDb21tb24uQmFzZS52eXBvY2V0X2RwaChjX3oxLCBmYWxzZSwgbl9zbml6ZW5hLCB0aGlzLnZ5cG9jZXREUEhwb05vdnUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJlZHBpc0R0by5jX2QxPy50b1N0cmluZygpID09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWRwaXNEdG8uY19kMSA9IGNfYmV6X2RwaF9ycDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiY19kMVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBjX2Jlel9kcGhfcnApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBWw71wb8SNZXQgbm9ybWFsbsOtaG8gRFBIXHJcbiAgICAgICAgICAgICAgICBsZXQgY196MjogRGVjaW1hbCA9IHRoYXQuZmluZEZpZWxkcyhcImNfejJcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIikgPz8gbmV3IERlY2ltYWwoMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNfejIuZXEoMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBbY19iZXpfZHBoX3JwLCBjX2RwaF9ycF0gPSBDb21tb24uQmFzZS52eXBvY2V0X2RwaChjX3oyLCBmYWxzZSwgbl96YWtsYWRuaSwgdGhpcy52eXBvY2V0RFBIcG9Ob3Z1KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZWRwaXNEdG8uY19kMj8udG9TdHJpbmcoKSA9PSBcIjBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVkcGlzRHRvLmNfZDIgPSBjX2Jlel9kcGhfcnA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNfZDJcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgY19iZXpfZHBoX3JwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVsO9cG/EjWV0IHTFmWV0w61obyBEUEhcclxuICAgICAgICAgICAgICAgIGxldCBjX3ozOiBEZWNpbWFsID0gdGhhdC5maW5kRmllbGRzKFwiY196M1wiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKSA/PyBuZXcgRGVjaW1hbCgwKTtcclxuICAgICAgICAgICAgICAgIGlmICghY196My5lcSgwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIFtjX2Jlel9kcGhfcnAsIGNfZHBoX3JwXSA9IENvbW1vbi5CYXNlLnZ5cG9jZXRfZHBoKGNfejMsIGZhbHNlLCBuX3RyZXRpLCB0aGlzLnZ5cG9jZXREUEhwb05vdnUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJlZHBpc0R0by5jX2QzPy50b1N0cmluZygpID09IFwiMFwiKSB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVkcGlzRHRvLmNfZDMgPSBjX2Jlel9kcGhfcnA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNfZDNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgY19iZXpfZHBoX3JwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8vLyBWw71wb8SNZXQgxI10dnJ0w6lobyBEUEhcclxuICAgICAgICAgICAgICAgIC8vbGV0IGNfejQ6IERlY2ltYWwgPSB0aGF0LmZpbmRGaWVsZHMoXCJjX3o0XCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpID8/IG5ldyBEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICAgICAgLy9pZiAoIWNfejQuZXEoMCkpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIFtjX2Jlel9kcGhfcnAsIGNfZHBoX3JwXSA9IENvbW1vbi5CYXNlLnZ5cG9jZXRfZHBoKGNfejQsIGZhbHNlLCBuX2N0dnJ0YSwgdGhpcy52eXBvY2V0RFBIcG9Ob3Z1KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICBpZiAocHJlZHBpc0R0by5jX2Q0Py50b1N0cmluZygpID09IFwiMFwiKSB7Ly9URVNUXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgcHJlZHBpc0R0by5jX2Q0ID0gY19iZXpfZHBoX3JwO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNfZDRcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgY19iZXpfZHBoX3JwKTtcclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICAgICAgem1lbmFEYXR1bXUoem1lbmE6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBsZXQgY196bWVuYTogRGVjaW1hbCA9IHRoYXQuZmluZEZpZWxkcyhcImNfem1lbmFcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGxldCBvcHJfcHJvYzogRGVjaW1hbCA9IHRoYXQuZmluZEZpZWxkcyhcIm9wcl9wcm9jXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQga3RnX3VwbyA9IHRoYXQuZmluZEZpZWxkcyhcImt0Z191cG9cIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikua3RnX3VwbzsgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGRhdF9zcGwgPSB0aGF0LmZpbmRGaWVsZHMoXCJkYXRfc3BsXCIpLmdmaWVsZDxEYXRlPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQgZGF0X3Z6bmlrdSA9IHRoYXQuZmluZEZpZWxkcyhcImRhdF92em5pa3VcIikuZ2ZpZWxkPERhdGU+KFwiZ2V0VmFsdWVcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoISh0aGF0Lm1vZGVsUGhsLnByaXpfZHBoX3pha2wgPT0gMSB8fCB0aGF0Lm1vZGVsUGhsLnByaXpfZHBoX3NuaXogPT0gMSB8fCB0aGF0Lm1vZGVsUGhsLnByaXpfZHBoX3NuaXoyID09IDEpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY19vcHI6IERlY2ltYWwgPSBjX3ptZW5hLm11bChvcHJfcHJvYykuZGl2KDEwMCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBydm5pTmFzdGF2ZW5pID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNfejBcIikuZ2ZpZWxkPERlY2ltYWw+KFwic2V0VmFsdWVcIiwgbmV3IERlY2ltYWwoY196bWVuYSksIHsgaW5pdGlhbFZhbHVlczogdGhhdC5wcnZuaU5hc3RhdmVuaSB9KTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNfb3ByX3ptZW5hXCIpLmdmaWVsZDxEZWNpbWFsPihcInNldFZhbHVlXCIsIG5ldyBEZWNpbWFsKGNfb3ByKSwgeyBpbml0aWFsVmFsdWVzOiB0aGF0LnBydm5pTmFzdGF2ZW5pIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wcnZuaU5hc3RhdmVuaSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoem1lbmEpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuY2FsbChcIlpqaXN0aVNhemJ5RHBoXCIsIHsgZGF0dW06IGRhdF92em5pa3UgfSkuZG9uZSgocmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgdGVzdDEgPSByZXQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoYXQuY2FsbChcIkdldFZ5cG9jZXREUEhwb05vdnVcIiwgeyBkYXR1bTogZGF0X3Z6bmlrdSB9KS5kb25lKChyZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL3ZhciB0ZXN0MiA9IHJldDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGF0Lk5hc3RhdlByaXpuYWtWeXpuYW1uYUNhc3RrYShjX3ptZW5hLCBkYXRfdnpuaWt1LCBkYXRfc3BsKTtcclxuICAgICAgICAgICAgdGhhdC5OYXN0YXZOb3Z5S3RnVXBvTm92ZShrdGdfdXBvLCBkYXRfc3BsLCBkYXRfdnpuaWt1KSBcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuICAgICAgICBOYXN0YXZQcml6bmFrVnl6bmFtbmFDYXN0a2EoY196bWVuYTogRGVjaW1hbCwgZGF0X3Z6bmlrdTogRGF0ZSwgZGF0X3NwbDogRGF0ZSkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy9sZXQgZGF0X3NwbCA9IHRoYXQuZmluZEZpZWxkcyhcImRhdF9zcGxcIikuZ2ZpZWxkPERhdGU+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIC8vbGV0IGRhdF92em5pa3UgPSB0aGF0LmZpbmRGaWVsZHMoXCJkYXRfdnpuaWt1XCIpLmdmaWVsZDxEYXRlPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAvL2xldCBjX3ptZW5hOiBEZWNpbWFsID0gdGhhdC5maW5kRmllbGRzKFwiY196bWVuYVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRfc3BsLmdldEZ1bGxZZWFyKCkgPj0gdGhhdC5tb2RlbFBobC5OYXN0YXZlbmk/LnJvayEpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInZ5em5tbmFfY2FzdGthXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpXHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJ2eXpubW5hX2Nhc3RrYVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBmYWxzZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInZ5em5tbmFfY2FzdGthXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgaWYgKGNfem1lbmEgPiBuZXcgRGVjaW1hbCgyNjAwMDApICYmIGRhdF9zcGwuZ2V0RnVsbFllYXIoKSA8IGRhdF92em5pa3UuZ2V0RnVsbFllYXIoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInZ5em5tbmFfY2FzdGthXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJ2eXpubW5hX2Nhc3RrYVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG4gICAgICAgIE5hc3Rhdk5vdnlLdGdVcG9Ob3ZlKGt0Z191cG86IG51bWJlciwgZGF0X3NwbDogRGF0ZSwgZGF0X3Z6bmlrdTogRGF0ZSkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgdGhhdC5rdGdfdXBvX25vdmEgPSBrdGdfdXBvXHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0X3NwbC5nZXRGdWxsWWVhcigpIDwgZGF0X3Z6bmlrdS5nZXRGdWxsWWVhcigpIHx8IGRhdF9zcGwuZ2V0RnVsbFllYXIoKSA9PSBkYXRfdnpuaWt1LmdldEZ1bGxZZWFyKCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjX3ptZW5hOiBEZWNpbWFsID0gdGhhdC5maW5kRmllbGRzKFwiY196bWVuYVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgIGxldCB6cHVzb2I6IG51bWJlciA9IGRhdF9zcGwuZ2V0RnVsbFllYXIoKSA9PSBkYXRfdnpuaWt1LmdldEZ1bGxZZWFyKCkgPyAxIDogMDsgLy8gMCAtIHJvdm7DoSBzZSwgMSAtIG1lbsWhw61cclxuICAgICAgICAgICAgICAgIElzbC5QcmVkcGlzeS5uYXN0YXZOb3Z5S3RnVXBvTm92ZSh7IGt0Z191cG86IGt0Z191cG8sIGNfem1lbmE6IGNfem1lbmEsIHpwdXNvYjogenB1c29iIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lmt0Z191cG9fbm92YSA9IHJldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwia3RnX3Vwb19ub3Z5XCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyBrdGdfdXBvOiB0aGF0Lmt0Z191cG9fbm92YSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShyZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmZhaWwoKGpxWEhSLCB0eXAsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KGpxWEhSLCB0eXAsIG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImt0Z191cG9fbm92eVwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsga3RnX3VwbzogdGhhdC5rdGdfdXBvX25vdmEgfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbiAgICAgICAgcHJpdmF0ZSBuYXN0YXZQb2xlKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGxldCBvcHIgPSB0aGF0Lm5hY3RlbmFEYXRhO1xyXG4gICAgICAgICAgICBsZXQgcHJlID0gdGhhdC5wdXZvZG5pUHJlZHBpcztcclxuXHJcbiAgICAgICAgICAgIGxldCBuZXVociA9IERlY2ltYWwuc3ViKG9wci5jISwgb3ByLmNfdWhyISk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJjXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIG9wci5jKVxyXG4gICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJjX25ldWhyXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIG5ldWhyKVxyXG4gICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJrdGdfdXBvXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyBrdGdfdXBvOiBwcmUua3RnX3VwbyB9KVxyXG4gICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJkYXRfdnpuaWt1XCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHRoYXQudG9kYXkpXHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImRhdF9zcGxcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgcHJlLmRhdF9zcGwpXHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNfem1lbmFcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgb3ByLmNfem1lbmEpXHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNfejBcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbmV3IERlY2ltYWwoMCkpXHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNfZDBcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbmV3IERlY2ltYWwoMCkpXHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNfejFcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbmV3IERlY2ltYWwoMCkpXHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNfZDFcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbmV3IERlY2ltYWwoMCkpXHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNfejJcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbmV3IERlY2ltYWwoMCkpXHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNfZDJcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbmV3IERlY2ltYWwoMCkpXHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNfejNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbmV3IERlY2ltYWwoMCkpXHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNfZDNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbmV3IERlY2ltYWwoMCkpXHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNfejRcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbmV3IERlY2ltYWwoMCkpIFxyXG4gICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJjX2Q0XCIpLmdmaWVsZChcInNldFZhbHVlXCIsIG5ldyBEZWNpbWFsKDApKSBcclxuICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiY196YW9cIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbmV3IERlY2ltYWwoMCkpXHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInZ5em5tbmFfY2FzdGthXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIG9wci52eXpuYW1uYV9jYXN0a2EpXHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInBvem5hbWthXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIG9wci5wb3puYW1rYSlcclxuICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwicHJpX3VoclwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBwcmUucHJpX3VocilcclxuICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwicHJpX3Vocl9vbGRcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgcHJlLnByaV91aHIpXHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNfb3ByXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIG9wci5jX29wcilcclxuICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwib3ByX3Byb2NcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgb3ByLm9wcl9wcm9jKVxyXG4gICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJjX29wcl96bWVuYVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBvcHIuY19vcHJfem1lbmEpXHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImRhdF9vcHJcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgb3ByLmRhdF9vcHJfcG9zbClcclxuXHJcbiAgICAgICAgICAgIHRoYXQuTmFzdGF2UHJpem5ha1Z5em5hbW5hQ2FzdGthKHBhcnNlRGVjaW1hbChvcHIuY196bWVuYSEpLCB0aGF0LnRvZGF5LCBwYXJzZURhdGUocHJlLmRhdF9zcGwhKSk7XHJcbiAgICAgICAgICAgIHRoYXQuTmFzdGF2Tm92eUt0Z1Vwb05vdmUocHJlLmt0Z191cG8hLCBwYXJzZURhdGUocHJlLmRhdF9zcGwhKSwgdGhhdC50b2RheSlcclxuXHJcbiAgICAgICAgICAgIC8vXHRDYWxsIGdmX1pvYnJhelZhcm92YW5pKCdQcm8gcMWZZWRwaXN5IHMgZGF0ZW0gc3BsYXRub3N0aSAnIHx8IGdmX0Zvcm1hdHVqRGF0dW0oaXBfZGF0X3NwbCkgfHwgJyBhIGthdGVnb3JpaSBwb2h5YnUgJyB8fCBnZl9OdW1iZXJUb1N0cihpcF9rdGdfdXBvKSB8fCAnIGppxb4gZXhpc3R1amUgb3ByYXZhIHbDvcWhZSBwxZllZHBpc3UhIFxyXG4gICAgICAgICAgICAvL1x0XHRcdE9wcmF2dSBsemUgcG/FmcOtZGl0LCBqZSBhbGUgem9icmF6ZW5hIHBvdXplIHDFr3ZvZG7DrSB2w73FoWUgcMWZZWRwaXN1LicgKVxyXG4gICAgICAgICAgICAvL1JldHVybiBUUlVFXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIC8vIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG4gICAgICAgIHVsb3plbmlPcHJhdnlQcmVkcGlzdShkYXRhT3ByYXZ5UHJlZHBpc3U6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HRGF0YU9wcmF2eVByZWRwaXN1RHRvKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBDb21tb24uQmFzZS5Qcm9jZXNzUmVzcG9uc2UodGhhdC5pc2wuUHJlZHBpc3kudWxvek9wcmF2dVByZWRwaXN1KHsgZDogZGF0YU9wcmF2eVByZWRwaXN1IH0pLmdldCgpLCB0aGlzLCBmYWxzZSwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVsWhZWNrbyBvayBtb2h1IHBva3JhxI1vdmF0Li4uXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJ1bG96ZW5pUHJlZHBpc3VcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gWmF2xZnDrXQgb2tubz8gZXRjLi4uXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0eXAsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwidWxvemVuaVByZWRwaXN1XCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiBQcm9jZXNzUmVzcG9uc2UgLSB6ZGUgdXByYXZlbm8gLT4gayB0ZXN0dVxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKHR5cCA9PT0gXCJleGNlcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4gdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgb2JqLmJhc2VNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFrY2UgcG8ga2xpa251dMOtIG5hIHRsYcSNw610a28gT0sgXHJcbiAgICAgICAgICogQG1ldGhvZCBvaygpXHJcbiAgICAgICAgICogQHJldHVybnMgVWxvxb5lbsOtIHVsb8W+ZW7DrSBwxZllZHBpc3UgdiBwxZnDrXBhZMSbIMO6c3DEm2NodVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9rKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcInVsb3plbmlQcmVkcGlzdVwiLCB0ZXh0OiBcIlByb2LDrWjDoSB1a2zDoWTDoW7DrSBvcHJhdnkgcMWZZWRwaXN1Li4uXCIgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgaGFzQ2hhbmdlZDogYm9vbGVhbiA9IHRoaXMuZmluZEZvcm1zKCkuZ2Zvcm0oXCJoYXNDaGFuZ2VkXCIpO1xyXG4gICAgICAgICAgICBpZiAoIWhhc0NoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwidWxvemVuaVByZWRwaXN1XCIgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLndhcm5pbmcoXCJVcG96b3JuxJtuw61cIiwgXCJOZWRvxaFsbyBrIMW+w6FkbsOpIHptxJtuxJsgLSBuZW7DrSBjbyB1bG/Fvml0XCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsaWRUZXN0ID0gdGhpcy5maW5kRm9ybXMoKS5nZm9ybShcImlzVmFsaWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmICh2YWxpZFRlc3QgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInVsb3plbmlQcmVkcGlzdVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIFwiTsSba3RlcsOhIHBvbGUgbmVqc291IHNwcsOhdm7EmyB2eXBsbsSbbmFcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBOYcSNdGVuw60gZGF0IHogb2tuYSBkbyBEVE8gb2JqZWt0dSBwcm8gdWxvxb5lbsOtXHJcbiAgICAgICAgICAgIGxldCBkID0gdGhhdC5uYWN0ZW5hRGF0YTtcclxuICAgICAgICAgICAgZC5yYWRla191aHIgPSB0aGF0LlJhZGVrX3VocjtcclxuICAgICAgICAgICAgZC5jID0gdGhhdC5maW5kRmllbGRzKFwiY1wiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgZC5jX25ldWhyID0gdGhhdC5maW5kRmllbGRzKFwiY19uZXVoclwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgZC5kYXRfc3BsID0gdGhhdC5maW5kRmllbGRzKFwiZGF0X3NwbFwiKS5nZmllbGQ8RGF0ZT4oXCJnZXRWYWx1ZVwiKTsgXHJcbiAgICAgICAgICAgIGQua3RnX3VwbyA9IHRoYXQuZmluZEZpZWxkcyhcImt0Z191cG9cIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikua3RnX3VwbzsgXHJcbiAgICAgICAgICAgIGQucHJpX3Vocl9vbGQgPSB0aGF0LmZpbmRGaWVsZHMoXCJwcmlfdWhyX29sZFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgZC5jX3ptZW5hID0gdGhhdC5maW5kRmllbGRzKFwiY196bWVuYVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTsgXHJcbiAgICAgICAgICAgIGQuZGF0X3Z6bmlrdSA9IHRoYXQuZmluZEZpZWxkcyhcImRhdF92em5pa3VcIikuZ2ZpZWxkPERhdGU+KFwiZ2V0VmFsdWVcIik7IFxyXG4gICAgICAgICAgICBkLmt0Z191cG9fbm92eSA9IHRoYXQuZmluZEZpZWxkcyhcImt0Z191cG9fbm92eVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKS5rdGdfdXBvOyBcclxuICAgICAgICAgICAgZC5wcmlfdWhyID0gdGhhdC5maW5kRmllbGRzKFwicHJpX3VoclwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTsgXHJcbiAgICAgICAgICAgIGQucG96bmFta2EgPSB0aGF0LmZpbmRGaWVsZHMoXCJwb3puYW1rYVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgZC52eXpuYW1uYV9jYXN0a2EgPSB0aGF0LmZpbmRGaWVsZHMoXCJ2eXpubW5hX2Nhc3RrYVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTsgXHJcbiAgICAgICAgICAgIGQuY196MCA9IHRoYXQuZmluZEZpZWxkcyhcImNfejBcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7IFxyXG4gICAgICAgICAgICBkLmNfZDAgPSB0aGF0LmZpbmRGaWVsZHMoXCJjX2QwXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpOyBcclxuICAgICAgICAgICAgZC5jX3oxID0gdGhhdC5maW5kRmllbGRzKFwiY196MVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTsgXHJcbiAgICAgICAgICAgIGQuY19kMSA9IHRoYXQuZmluZEZpZWxkcyhcImNfZDFcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7IFxyXG4gICAgICAgICAgICBkLmNfejIgPSB0aGF0LmZpbmRGaWVsZHMoXCJjX3oyXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpOyBcclxuICAgICAgICAgICAgZC5jX2QyID0gdGhhdC5maW5kRmllbGRzKFwiY19kMlwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTsgXHJcbiAgICAgICAgICAgIGQuY196MyA9IHRoYXQuZmluZEZpZWxkcyhcImNfejNcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7IFxyXG4gICAgICAgICAgICBkLmNfZDMgPSB0aGF0LmZpbmRGaWVsZHMoXCJjX2QzXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpOyBcclxuICAgICAgICAgICAgZC5jX3o0ID0gdGhhdC5maW5kRmllbGRzKFwiY196NFwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgZC5jX2Q0ID0gdGhhdC5maW5kRmllbGRzKFwiY19kNFwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgZC5jX3phbyA9IHRoYXQuZmluZEZpZWxkcyhcImNfemFvXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBkLmNfb3ByID0gdGhhdC5maW5kRmllbGRzKFwiY19vcHJcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7IFxyXG4gICAgICAgICAgICBkLm9wcl9wcm9jID0gdGhhdC5maW5kRmllbGRzKFwib3ByX3Byb2NcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7IFxyXG4gICAgICAgICAgICBkLmNfb3ByX3ptZW5hID0gdGhhdC5maW5kRmllbGRzKFwiY19vcHJfem1lbmFcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7IFxyXG4gICAgICAgICAgICBkLmRhdF9vcHIgPSB0aGF0LmZpbmRGaWVsZHMoXCJkYXRfb3ByXCIpLmdmaWVsZDxEYXRlPihcImdldFZhbHVlXCIpOyBcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24ga29udHJvbGEgxI3DoXN0ZWsgcMWZZWQgdWxvxb5lbsOtbVxyXG4gICAgICAgICAgICBsZXQgbnVsYTogRGVjaW1hbCA9IG5ldyBEZWNpbWFsKDApXHJcbiAgICAgICAgICAgIC8vVE9ETzoga29udHJvbGEgZGF0XHJcbiAgICAgICAgICAgIGlmICghZC5jX3owLmVxdWFscyhudWxhKSB8fCAvLyAhPSBudWxhIHx8XHJcbiAgICAgICAgICAgICAgICAhZC5jX3oxLmVxdWFscyhudWxhKSB8fCAvLyAhPSBudWxhIHx8XHJcbiAgICAgICAgICAgICAgICAhZC5jX3oyLmVxdWFscyhudWxhKSB8fCAvLyAhPSBudWxhIHx8XHJcbiAgICAgICAgICAgICAgICAhZC5jX3ozLmVxdWFscyhudWxhKSB8fCAvLyAhPSBudWxhIHx8XHJcbiAgICAgICAgICAgICAgICAhZC5jX3o0LmVxdWFscyhudWxhKSB8fCAvLyAhPSBudWxhIHx8XHJcbiAgICAgICAgICAgICAgICAhZC5jX2QwLmVxdWFscyhudWxhKSB8fCAvLyAhPSBudWxhIHx8XHJcbiAgICAgICAgICAgICAgICAhZC5jX2QxLmVxdWFscyhudWxhKSB8fCAvLyAhPSBudWxhIHx8XHJcbiAgICAgICAgICAgICAgICAhZC5jX2QyLmVxdWFscyhudWxhKSB8fCAvLyAhPSBudWxhIHx8XHJcbiAgICAgICAgICAgICAgICAhZC5jX2QzLmVxdWFscyhudWxhKSB8fCAvLyAhPSBudWxhIHx8XHJcbiAgICAgICAgICAgICAgICAhZC5jX2Q0LmVxdWFscyhudWxhKSkgeyAvLyAhPSBudWxhKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3VtYV9kcGg6IERlY2ltYWwgPSBkLmNfemFvLnBsdXMoZC5jX2QwKS5wbHVzKGQuY19kMSkucGx1cyhkLmNfZDIpLnBsdXMoZC5jX2QzKS5wbHVzKGQuY19kNCkucGx1cyhkLmNfejApLnBsdXMoZC5jX3oxKS5wbHVzKGQuY196MikucGx1cyhkLmNfejMpLnBsdXMoZC5jX3o0KTtcclxuICAgICAgICAgICAgICAgIC8vaWYgKGQuY196bWVuYS50b051bWJlcigpICE9IHN1bWFfZHBoLnRvTnVtYmVyKCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICghZC5jX3ptZW5hLmVxdWFscyhzdW1hX2RwaCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInVsb3plbmlQcmVkcGlzdVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBgTmVzb3VobGFzw60gcm96cGlzIERQSCBhIMSNw6FzdGt5IHYgQ1pLISA8YnI+IDxicj4gU3VtYSDEjcOhc3RlayBEUEggamUgJHtzdW1hX2RwaH0gQ1pLIDxicj4gxIzDoXN0a2EgcMWZw61wYWR1IHYgQ1pLIGplICR7ZC5jX3ptZW5hfSBDWksgPGJyPiBSb3pkw61sIGplICR7ZC5jX3ptZW5hLm1pbnVzKHN1bWFfZHBoKX0gQ1pLYCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwib2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGaWVsZHMoJ2Nfem1lbmEnKS5nZmllbGQoJ2ZvY3VzJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZC5jX3ptZW5hIDwgbmV3IERlY2ltYWwoMCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkLmNfem1lbmEuYWJzKCkgPiBkLmMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInVsb3plbmlQcmVkcGlzdVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBcIsSMw6FzdGt1IHDFmWVkcGlzdSBuZWx6ZSBzbsOtxb7DrSB2w61jZSBuZcW+IG8gXCIgKyBkLmMuYWJzKCkgKyBcIiBDWksgIVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oXCJva1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZpZWxkcygnY196bWVuYScpLmdmaWVsZCgnZm9jdXMnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkLmNfem1lbmEuZXF1YWxzKG51bGEpKSB7IC8vID09IG51bGEpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwidWxvemVuaVByZWRwaXN1XCIgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgXCJPcHJhdm91IG11c8OtIGLDvXQgbmVudWxvdsOhIMSNw6FzdGthIVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbihcIm9rXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGaWVsZHMoJ2Nfem1lbmEnKS5nZmllbGQoJ2ZvY3VzJylcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgLy8gS29udHJvbGEgemRhIHNlIG5lamVkbsOhIG8gdXphdsWZZW7DqSBvYmRvYsOtXHJcbiAgICAgICAgICAgIGlmIChkLmRhdF92em5pa3UgPCB0aGF0Lm1vZGVsUGhsLk5hc3RhdmVuaT8uZGF0X3V6YXYhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShcIlVwb3pvcm7Em27DrVwiLCBcIkRhdHVtIHZ6bmlrdSBwxZllZHBpc3UgamUgemFkw6FuIGRvIHV6YXbFmWVuw6lobyBvYmRvYsOtIC0gdnl0dm/FmWVuw70gcMWZZWRwaXMgc2UgdXphdsWZZSA8YnI+IDxicj4gQ2hjZXRlIHBva3JhxI1vdmF0ID9cIilcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTb3VobGFzw61tIHMgdMOtbSwgxb5lIGNoY2kgdWxvxb5pdCBpIHDFmWVzdG8sIMW+ZSBqZSB0byB1emF2xZllbsOpIG9iZG9iw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudWxvemVuaU9wcmF2eVByZWRwaXN1KGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmVzb3VobGFzw61tIC0+IGZvY3VzIG5hIGRhdHVtIHZ6bmlrdSBrdGVyw6kgbcWvxb51IHptxJtuaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRmllbGRzKCdkYXRfdnpuaWt1JykuZ2ZpZWxkKCdmb2N1cycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KSAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gVsWhZWNobm8gcHJvYsSbaGxvIHYgcG9ob2TEmywgbW9odSBwxZlpc3RvdXBpdCBrIHNhbW90bsOpbXUgdWxvxb5lbsOtXHJcbiAgICAgICAgICAgIHRoYXQudWxvemVuaU9wcmF2eVByZWRwaXN1KGQpOyAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG5cclxuICAgICAgICAvLyNyZWdpb24gc3RhcsO9IGdmb3JtXHJcbiAgICAgICAgLy9wcml2YXRlIGNyZWF0ZU1haW5Gb3JtMigpIHtcclxuICAgICAgICAvLyAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAvLyAgICB2YXIgZm9ybSA9IG5ldyBGb3Jtcy5Gb3JtKFwiTDFNMVMxLCBMLTEyLTEyLTAsIE0tMTItMTItMCwgUy0xMi0xMi0wXCIpXHJcbiAgICAgICAgLy8gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIC8vICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAvLyAgICAgICAgLmFkZFNlY3Rpb24oXCJPcHJhdm92YW7DvSBwxZllZHBpc1wiKVxyXG4gICAgICAgIC8vICAgICAgICAvLy5hZGRSb3coKVxyXG4gICAgICAgIC8vICAgICAgICAvLy5hZGRUZXh0KFwixIzDoXN0a2EgcMWZZWRwaXN1OlwiLCBcInctNlwiKVxyXG4gICAgICAgIC8vICAgICAgICAvLy5hZGRUZXh0KFwieiB0b2hvIG5ldWhyYXplbm86XCIsIFwidy02XCIpXHJcbiAgICAgICAgLy8gICAgICAgIC5hZGRSb3coXCLEjMOhc3RrYSBwxZllZHBpc3UsIHogdG9obyBuZXVocmF6ZW5vXCIpXHJcbiAgICAgICAgLy8gICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTZcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbmFtZTogXCJjXCIsIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy02XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIG5hbWU6IFwiY19uZXVoclwiLCBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgIC8vICAgICAgICAuYWRkVGV4dChcIkRhdHVtIHNwbGF0bm9zdGk6XCIsIFwidy01XCIpXHJcbiAgICAgICAgLy8gICAgICAgIC5hZGRUZXh0KFwiS2F0ZWdvcmllIHBvaHlidTpcIiwgXCJ3LTVcIilcclxuICAgICAgICAvLyAgICAgICAgLmFkZFRleHQoXCJQcmkuIHVoci46XCIgLypcIlByaW9yaXRhIMO6aHJhZHlcIiovLCBcInctMlwiKVxyXG4gICAgICAgIC8vICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAvLyAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTVcIiwge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbmFtZTogXCJkYXRfc3BsXCIsIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy01XCIsIFByZWZhYnMuU2VsZWN0LmZ1Y2N1cG8oKSwge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbmFtZTogXCJrdGdfdXBvXCIsIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwua3RnX3Vwbz12YWx1ZS5rdGdfdXBvXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgYmV6X251bGFfdXBvOiAxLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGt0Z191cG86IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgbzogXCI8XCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHY6IDIwMFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgIH0sXHJcbiAgICAgICAgLy8gICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie2t0Z191cG99IC0ge2t0Z191cG9fdHh0OnRyaW06ZW5jb2RlfVwiXHJcbiAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTJcIiwge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbmFtZTogXCJwcmlfdWhyX29sZFwiLCBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogMCxcclxuICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgLy8gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIC8vICAgICAgICAuYWRkU2VjdGlvbihcIlptxJtuYSB2w73FoWUgcMWZZWRwaXN1XCIpXHJcbiAgICAgICAgLy8gICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgIC8vICAgICAgICAuYWRkVGV4dChcIk7DoXbDvcWhZW7DrS9TbsOtxb5lbsOtIMSNw6FzdGt5OlwiLCBcInctNlwiKVxyXG4gICAgICAgIC8vICAgICAgICAuYWRkVGV4dChcIkRhdHVtIHZ6bmlrdTpcIiwgXCJ3LTZcIilcclxuICAgICAgICAvLyAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNlwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBuYW1lOiBcImNfem1lbmFcIixcclxuICAgICAgICAvLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56bWVuYURhdHVtdShmYWxzZSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIG5hbWU6IFwiZGF0X3Z6bmlrdVwiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnptZW5hRGF0dW11KHRydWUpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgLy8gICAgICAgIC5hZGRUZXh0KFwia2F0ZWdvcmllIHBvaHlidSAtIG5vdsOhOlwiLCBcInctMTBcIilcclxuICAgICAgICAvLyAgICAgICAgLmFkZFRleHQoXCJQcmkuIHVoci46XCIgLypcIlByaW9yaXRhIMO6aHJhZHlcIiovLCBcInctMlwiKVxyXG4gICAgICAgIC8vICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAvLyAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTBcIiwgUHJlZmFicy5TZWxlY3QuZnVjY3VwbygpLCB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBuYW1lOiBcImt0Z191cG9fbm92eVwiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5rdGdfdXBvPXZhbHVlLmt0Z191cG9cIixcclxuICAgICAgICAvLyAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBiZXpfbnVsYV91cG86IDEsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAga3RnX3Vwbzoge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBvOiBcIjxcIixcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdjogMjAwXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgfSxcclxuICAgICAgICAvLyAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7a3RnX3Vwb30gLSB7a3RnX3Vwb190eHQ6dHJpbTplbmNvZGV9XCJcclxuICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctMlwiLCB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBuYW1lOiBcInByaV91aHJcIixcclxuICAgICAgICAvLyAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogMCxcclxuICAgICAgICAvLyAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gICAgICAgIC5hZGRSb3coXCJQb3puw6Fta2FcIilcclxuICAgICAgICAvLyAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMTJcIiwgeyBuYW1lOiBcInBvem5hbWthXCIgfSlcclxuXHJcbiAgICAgICAgLy8gICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgIC8vICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTEyXCIsIHsgbmFtZTogXCJ2eXpubW5hX2Nhc3RrYVwiLCBsYWJlbDogXCJPcHJhdnkgcMWZZWRjaMOhemVqw61jw61jaCDDusSNZXRuw61jaCBvYmRvYsOtIC0gdsO9em5hbW7DoSDEjcOhc3RrYVwiIH0pXHJcblxyXG4gICAgICAgIC8vICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAvLyAgICAgICAgLmFkZFRleHQoXCJaw6FrbC4gYmV6IERQSDpcIiwgXCJ3LTNcIikuYWRkVGV4dChcIk9zdi4gb2QgRFBIOlwiLCBcInctM1wiKS5hZGRUZXh0KFwiWsOha2wuc27DrcW+LjpcIiwgXCJ3LTNcIikuYWRkVGV4dChcIkRhxYggc27DrcW+LjpcIiwgXCJ3LTNcIilcclxuICAgICAgICAvLyAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgLy8gICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbmFtZTogXCJjX3owXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBpZiAoIXRoYXQucHJ2bmlOYXN0YXZlbmkpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJlcG9jZXRDYXN0ZWsoMSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgfSkgLy8gWsOha2wuIGJleiBEUEhcclxuICAgICAgICAvLyAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBuYW1lOiBcImNfZDBcIixcclxuICAgICAgICAvLyAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by5jX2QwISxcclxuICAgICAgICAvLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmVwb2NldENhc3RlaygwKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICB9KSAvLyBPc3YuIG9kIERQSFxyXG4gICAgICAgIC8vICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0zXCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIG5hbWU6IFwiY196MVwiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLmNfejEhLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXBvY2V0Q2FzdGVrKDEpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgIH0pIC8vIFrDoWtsLnNuw63Fvi4gRC5cclxuICAgICAgICAvLyAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBuYW1lOiBcImNfZDFcIixcclxuICAgICAgICAvLyAgICAgICAgICAgIGRpc2FibGVkOiAhdGhhdC5wZXJtc0R0by5jX2QxISxcclxuICAgICAgICAvLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmVwb2NldENhc3RlaygwKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICB9KSAvLyBEYcWIIHNuw63Fvi4gRC5cclxuICAgICAgICAvLyAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgLy8gICAgICAgIC5hZGRUZXh0KFwiWsOha2wuIERQSDpcIiwgXCJ3LTNcIikuYWRkVGV4dChcIkRhxYggesOha2wuIERQSDpcIiwgXCJ3LTNcIikuYWRkVGV4dChcIlrDoWtsLjIuc27DrcW+OlwiLCBcInctMlwiKS5hZGRUZXh0KFwiRGHFiCAyLnNuw63FvjpcIiwgXCJ3LTJcIikuYWRkVGV4dChcIlphb2suOlwiLCBcInctMlwiKVxyXG4gICAgICAgIC8vICAgICAgICAuYWRkUm93KClcclxuXHJcbiAgICAgICAgLy8gICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbmFtZTogXCJjX3oyXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBkaXNhYmxlZDogIXRoYXQucGVybXNEdG8uY196MiEsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBpZiAoIXRoYXQucHJ2bmlOYXN0YXZlbmkpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJlcG9jZXRDYXN0ZWsoMSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgfSkgLy8gWsOha2wuIERQSFxyXG4gICAgICAgIC8vICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0zXCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIG5hbWU6IFwiY19kMlwiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLmNfZDIhLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXBvY2V0Q2FzdGVrKDApXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgIH0pIC8vIERhxYggesOha2wuIERQSFxyXG4gICAgICAgIC8vICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0yXCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIG5hbWU6IFwiY196M1wiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLmNfejMhLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXBvY2V0Q2FzdGVrKDEpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgIH0pIC8vIFrDoWtsLjIuc27DrcW+LiBELlxyXG4gICAgICAgIC8vICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0yXCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIG5hbWU6IFwiY19kM1wiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLmNfZDMhLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXBvY2V0Q2FzdGVrKDApXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgIH0pIC8vIERhxYggMi5zbsOtxb4uIEQuXHJcbiAgICAgICAgLy8gICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTJcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbmFtZTogXCJjX3phb1wiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLmNfemFvISxcclxuICAgICAgICAvLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGlmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmVwb2NldENhc3RlaygwKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICB9KSAvLyAgWmFva3JvdWhsZW5vXHJcblxyXG5cclxuICAgICAgICAvLyAgICAgICAgLmFkZFNlY3Rpb24oXCJPcHJhdm7DoSBwb2xvxb5rYVwiKVxyXG4gICAgICAgIC8vICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAvLyAgICAgICAgLmFkZFRleHQoXCJPcHIuIHBvbC4tIGV4aXN0LjpcIiwgXCJ3LTZcIikuYWRkVGV4dChcIlByb2MuIG9wci46XCIsIFwidy02XCIpXHJcbiAgICAgICAgLy8gICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgIC8vICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy02XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIG5hbWU6IFwiY19vcHJcIiwgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTZcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbmFtZTogXCJvcHJfcHJvY1wiLCBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgLy8gICAgICAgIC5hZGRUZXh0KFwiT3ByLiBwb2wuIC0gem3Em25hOlwiLCBcInctNlwiKS5hZGRUZXh0KFwiRGF0LiBwb3NsLmdlbi4gb3ByLjpcIiwgXCJ3LTZcIilcclxuICAgICAgICAvLyAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgLy8gICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTZcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbmFtZTogXCJjX29wcl96bWVuYVwiLCBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbmFtZTogXCJkYXRfb3ByXCIsIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICAgICB9KVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAvLyAgICB0aGlzLmRlZmF1bHRGb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG4gICAgICAgIC8vICAgIC8vdGhpcy5kZWZhdWx0Rm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0b3JzXCIsIHRoaXMudmFsaWRhdG9ycyk7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uIHN0YXLDvSBnZm9ybVxyXG4gICAgfVxyXG59Il19
"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GSaldaVymDr.ts                         </Name>
//    <Description> Okno pro zobrazení Vymáhacího salda dle DŘ pro případ DDP   </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-09-30                                                  </Created>
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
            /**
             * Okno pro zobrazení Vymáhacího salda dle DŘ (daňového řádu) pro případ DDP
             * @author Martni Hanuš
             * @copyright © GORDIC spol. s r. o. 1993-2026
             * @created 2025-09-30
             * @lastModified 2025-09-30
             */
            let GSaldaVymDr = class GSaldaVymDr extends Gordic.GContentBase {
                constructor() {
                    //=======================================================
                    //#region P R O P E R T I E S
                    super(...arguments);
                    this.ixpDenFilter = {};
                    this.typPhlFilter = {};
                    this.radekCtvrtFilter = {};
                    this.pripadyEsuFilter = {};
                    //#endregion T E S T O V Á N Í
                    //=======================================================
                }
                //#endregion P R O P E R T I E S 
                //=======================================================
                //#region O N C O N T E N T R E A D Y
                onContentReady() {
                    const that = this;
                    if (that.ZpusobPrevodu != 99) {
                        that.DatumOd = new Date(that.DatOd);
                        that.DatumDo = new Date(that.DatDo);
                    }
                    that.createActions();
                    that.createForm();
                    that.createGrid();
                    that.setDefaultData();
                    Ddp.WebClient.Common.Base.setDateBoxShortcuts(that);
                }
                //#endregion O N C O N T E N T R E A D Y
                //=======================================================
                //#region S E S T A V E N Í   O K N A
                /**
                 * Vytvoření jednotlivých akcí a nastavenáí command/menu baru
                 * @method createActions()
                 * @returns {void} - Ukončení metody void
                 */
                createActions() {
                    const that = this;
                    that.actions.addRange([
                        {
                            name: "actSave",
                            caption: "OK", // "Uložit", // 
                            icon: "fa-floppy-o",
                            run: function () {
                                that.ok()
                                    .done(() => {
                                    that.CyklusTisku();
                                    //TODO: Opravit tisk a vyřešit dotazové okne o (ne)úspěchu tisku
                                    //that.close();
                                })
                                    .fail((ret) => {
                                    that.dialogs.error("Chyba", ret);
                                })
                                    .always(() => {
                                    that.endOperation();
                                });
                            }
                        },
                        {
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); } // Zavření okna
                        },
                        {
                            name: "actReset",
                            caption: "Občerstvit",
                            icon: "gi-refresh",
                            run: function () {
                                that.nactiUhrady();
                            }
                        },
                        {
                            name: "actTisk",
                            caption: "Tisk",
                            icon: "gi-print",
                            visible: true,
                            enabled: true,
                            run: function () {
                                if (that.ZpusobPrevodu == 0)
                                    that.tiskDokladuSaldaDr();
                                else
                                    that.tiskDokladuPrevod()
                                        .fail((ret) => {
                                        that.dialogs.error("Chyba", ret);
                                    });
                            }
                        },
                        //#region --- Akce pro testování  ---
                        {
                            name: "actChangeCaptionPreplatek_VariantyZmeny",
                            caption: "Zmena přeplatek",
                            description: "Zmena Popisku přeplatek",
                            run: function () {
                                //! Varianta 1
                                that.gridSaldaVymDrCastky.find(".grid-captions .cell.c4 .caption").text("Přeplatek vč. napoj.");
                                //! Varianta 2
                                const captions = that.gridSaldaVymDrCastky.find(".grid-captions .cell .caption");
                                captions.eq(4).text("Přeplatek vč. napoj.");
                                //! Varianta 3
                                const gridElement = that.gridSaldaVymDrCastky[0]; // první DOM element z jQuery
                                const caption = gridElement.querySelector(".grid-captions .cell.c4 .caption");
                                if (caption) {
                                    caption.textContent = "Přeplatek vč. napoj.";
                                }
                            }
                        },
                        {
                            name: "actChangeCondFormat",
                            caption: "Zmena Profilu gridu",
                            description: "Změna podmíněného formátování v gridu",
                            run: function () {
                                that.setPrifileCondFormat();
                            }
                        },
                        //#endregion --- Akce pro testování  ---
                    ]);
                    that.NastavDostupnostAkce(false); // Nastavuji FALSE protože v tuto chvíli ještě není ani formulář definovaný ve kterém by mohla být potřebná data načtena
                    that.menuBar(that.actions.createBar(["actTisk*", "<actReset*"]));
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                }
                /**
                 * Metoda pro vytvoření hlavičky okna
                 * @method createForm()
                 */
                createForm() {
                    const that = this;
                    var layoutDatumy = "L2M2S2, L-12-12-0, M-12-12-0, S-12-12-0";
                    var datForm = new Gordic.Forms.Form({ name: "GSaldaVymDrForm1", layoutDescriptor: layoutDatumy })
                        .addSection({ name: "GSaldaVymDrForm1SectionDatumOd" })
                        .addRow("Datum od")
                        .addField("gdatebox", "w-12", {
                        name: "dat_od",
                        initialValue: that.DatumOd,
                        change: function (ev, input) {
                            that.zmenaDatumOdDo(input.value, 0);
                        }
                    })
                        .addSection({ name: "GSaldaVymDrForm1SectionDatumDo" })
                        .addRow("Datum do")
                        .addField("gdatebox", "w-12", {
                        name: "dat_do",
                        initialValue: that.DatumDo,
                        change: function (ev, input) {
                            that.zmenaDatumOdDo(input.value, 1);
                        }
                    });
                    var form1 = $.newDiv("GSaldaVymDrForm1Div").appendTo(that.element).gform("createFrom", datForm);
                    that.viewCastky = [{
                            poc_stav: new Decimal(0),
                            predpisy: new Decimal(0),
                            uhrazeno: new Decimal(0),
                            dluh: new Decimal(0),
                            preplatek: new Decimal(0)
                        }, {
                            poc_stav: null,
                            predpisy: new Decimal(0),
                            uhrazeno: new Decimal(0),
                            dluh: new Decimal(0),
                            preplatek: null
                        }];
                    that.gridSaldaVymDrCastky = $.newDiv()
                        .appendTo(that.element)
                        .css("width", "100%")
                        .ggrid({
                        name: "gridPripadUhradyDetail",
                        data: that.viewCastky,
                        columns: Ddp.WebClient.Common.GridFormats.SaldaVymDrCastky(),
                        columnMode: "fit",
                        showBottomPanel: false,
                        showTopPanel: false,
                        filtering: false,
                    });
                    that.createFormPrevod(); // Pro převody dovytvořím formulář - kontrola zda se jendá o převod je uvnitř metody
                }
                /**
                 * Metoda pro vytvoření a definování seznamu (=gridu)
                 * @method createGrid()
                 * @returns {void} - Ukončení metody void
                 */
                createGrid() {
                    const that = this;
                    var formGridSetting = new Gordic.Forms.Form({ name: "GSaldaVymDrForm3", layoutDescriptor: "L1M1S1 L-0-12-0, M-0-12-0, S-0-12-0" })
                        .addSection({ name: "GSaldaVymDrSectionCheck1", label: "Předpisy" })
                        .addRow()
                        .addField("gcheck", "w-4", {
                        name: "napojene",
                        label: "Saldo včetně návaz. popl.",
                        initialValue: true,
                        change: function (ev, input) {
                            that.nactiUhrady();
                        }
                    })
                        .addField("gcheck", "w-4", {
                        name: "jenNeuhrazene",
                        label: "Pouze neuhrazené předp.",
                        initialValue: false,
                        change: function (ev, input) {
                            that.nactiUhrady();
                        }
                    });
                    var form3 = $.newDiv("GSaldaVymDrForm3Div").appendTo(that.element).gform("createFrom", formGridSetting);
                    that.createCondFormats();
                    that.gridPripadUhrady = $.newDiv()
                        .appendTo(that.element)
                        .css("width", "100%")
                        .gautofit()
                        .ggrid({
                        name: "gridPripadUhrady",
                        columnMode: "full",
                        multi: that.ZpusobPrevodu != 0,
                        defaultProfile: {
                            columnList: "stav,dat_spl,ktg_upo,pri_uhr,c,c_uhr,c_dluh,dat_uhr,zaplaceno_po_splatnosti,dni_po_splatnosti,ixp,esu_txt,typ_phl",
                            condFormats: that.mainCondFormats,
                        },
                        columns: Ddp.WebClient.Common.GridFormats.UhradyPripadu(true),
                        cellActivate: (ev, ctx) => {
                            //#region Načtení dat bočního gridu
                            if (that.ZpusobPrevodu == 0) { // Nastavení bočního panelu pouze pro Vymáhací Saldo dle DŘ 
                                if (!that.closed) {
                                    if (ctx != null && ctx.cellInfo != null && ctx.cellInfo.data != null) {
                                        that.viewPripadUhradyDetail = new Gordic.Isl.View(Gordic.Isl.PripadUhrady.detailUhradyList(rq => {
                                            return {
                                                filters: {
                                                    ixp: ctx.cellInfo.data.ixp,
                                                    dat_spl: ctx.cellInfo.data.dat_spl,
                                                    ktg_upo: ctx.cellInfo.data.ktg_upo,
                                                    pri_uhr: ctx.cellInfo.data.pri_uhr,
                                                }
                                            };
                                        }));
                                        that.gridPripadUhradyDetail.ggrid("setData", that.viewPripadUhradyDetail);
                                    }
                                    else {
                                        that.viewPripadUhradyDetail = undefined;
                                        that.gridPripadUhradyDetail.ggrid("setData", [], true);
                                    }
                                }
                            }
                            //#endregion
                        }
                    });
                    if (that.ZpusobPrevodu == 0) { // Boční panel pouze pro Vymáhací Saldo dle DŘ 
                        that.element.gsidebar("addPanel", "right", {
                            leaf: { caption: "Úhrady" },
                            id: "panelPripadUhradyDetail",
                            pinned: true,
                            icon: "fa-balance-scale",
                        });
                        var panelPripadUhradyDetail = that.element.gsidebar("getPanel", "panelPripadUhradyDetail");
                        that.gridPripadUhradyDetail = $.newDiv()
                            .appendTo(panelPripadUhradyDetail)
                            .css("width", "100%")
                            .gautofit()
                            .ggrid({
                            name: "gridPripadUhradyDetail",
                            defaultProfile: {
                                columnList: "c_uhr, dat_uhr"
                            },
                            filtering: false,
                            columns: Ddp.WebClient.Common.GridFormats.UhradyPripaduSalda()
                        });
                    }
                }
                /**
                 * Metoda pro vytvoření dodatečných políček v hlavičce při převodu
                 * 1-převod k exekuci, 2-převod k insolvenci, 3-převod na podrozvahu, 4-přesun, 5-převod k vymáhání celnímu úřadu, (Default - 0 - zobrazení Vymáhacího salda dle DŘ)
                 * @method createFormPrevod()
                 */
                createFormPrevod() {
                    const that = this;
                    if (that.ZpusobPrevodu == 0)
                        return; // Při zobrazení Vymáhacího salda dle DŘ se metoda ukončí a vytváření formuláře vůbec nezačne
                    if (that.ZpusobPrevodu == 99) {
                        var prevodyForm = new Gordic.Forms.Form({ name: "prevodDluhuForm", layoutDescriptor: "L1M1S1, L-12-12-0, M-12-12-0, S-12-12-0" })
                            .addSection()
                            .addRow("Datum vzniku")
                            .addField("gdatebox", "w-6", {
                            name: "dat_vzniku",
                            initialValue: new Date(),
                            change: function (ev, input) {
                                $(this).gfield("validate");
                            },
                            validators: [
                                new Gordic.Validators.Required(),
                                new Gordic.Validators.Base({
                                    stopping: true,
                                    validate: function (MyValue, source) {
                                        let val;
                                        let txt;
                                        [val, txt] = that.updateDatVznikuPrevodDluhu(MyValue);
                                        if (val == false) {
                                            this.errorType = "error";
                                            this.message = txt;
                                            this.stopping = true; // evidence bude zakázána
                                            return false;
                                        }
                                        return true;
                                    }
                                })
                            ],
                        })
                            .addSection("Přebrat z původní pohledávky")
                            .addRow()
                            .addField("gcheck", "w-2", {
                            name: "m_bKopirovatSpisy",
                            label: "Vazbu na spisy",
                            initialValue: false,
                            change: function (ev, input) {
                            }
                        })
                            .addField("gcheck", "w-2", {
                            name: "m_bKopirovatPisemnosti",
                            label: "Vazbu písemností",
                            initialValue: false,
                            change: function (ev, input) {
                            }
                        })
                            .addField("gcheck", "w-2", {
                            name: "m_bKopirovatPopisy",
                            label: "Popis případu",
                            initialValue: false,
                            change: function (ev, input) {
                            }
                        })
                            .addField("gcheck", "w-2", {
                            name: "m_bKopirovatPoznamky",
                            label: "Poznámky",
                            initialValue: false,
                            change: function (ev, input) {
                            }
                        })
                            .addField("gcheck", "w-2", {
                            name: "m_bPrevestDotcene",
                            label: "Dotčené subjekty",
                            initialValue: false,
                            change: function (ev, input) {
                            }
                        });
                        let form_prevodDluhuForm = $.newDiv("GSaldaVymDrFormPrevodyDiv").appendTo(that.element).gform("createFrom", prevodyForm);
                        return;
                    }
                    var typPhlCaption = "";
                    switch (that.ZpusobPrevodu) {
                        case 1:
                            typPhlCaption = "Typ pohledávky - exekuce";
                            break;
                        case 2:
                            typPhlCaption = "Typ pohledávky - insolvence";
                            break;
                        case 3:
                            typPhlCaption = "Typ pohledávky - podrozvaha";
                            break;
                        case 4:
                            typPhlCaption = "Typ pohledávky"; // - převod
                            break;
                        case 5:
                            typPhlCaption = "Typ pohledávky - celní úřad"; // - převod
                            break;
                    }
                    var prevodyForm = new Gordic.Forms.Form({ name: "prevodForm", layoutDescriptor: "L2M1S1, L-12-12-0, M-12-12-0, S-12-12-0" }) // L2M2S1
                        .addSection()
                        .addRow("Kniha")
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.kniha(), {
                        name: "ixp_den",
                        model: "model.ixp_den=value.ixp_den",
                        //disabled: true,
                        change: (ev, ctx) => {
                            that.setRadekCtvrtPripadyFilter();
                        }
                    })
                        .addRow(typPhlCaption + "Datum vzniku") // Typ pohledávky
                        .addField("gselectbox", "w-6", Gordic.Prefabs.Select.typPohledavky(), {
                        name: "typ_phl",
                        dropdown: false,
                        model: "model.typ_phl=value.typ_phl",
                        change: (ev, ctx) => {
                            that.setRadekCtvrtPripadyFilter();
                        },
                        validators: [new Gordic.Validators.Required()],
                    })
                        .addField("gdatebox", "w-6", {
                        name: "dat_vzniku",
                        initialValue: new Date(),
                        change: function (ev, input) {
                            //that.updateDatVzniku(input.value);
                            $(this).gfield("validate");
                        },
                        validators: [
                            new Gordic.Validators.Required(),
                            new Gordic.Validators.Base({
                                stopping: true,
                                validate: function (MyValue, source) {
                                    let val;
                                    let txt;
                                    [val, txt] = that.updateDatVzniku(MyValue);
                                    if (val == false) {
                                        this.errorType = "error";
                                        this.message = txt;
                                        this.stopping = true; // evidence bude zakázána
                                        return false;
                                    }
                                    return true;
                                }
                            })
                        ],
                    })
                        .addSection()
                        .addRow("Případy poplatníka")
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.pripadyEsuLk(), {
                        name: "pripEsu", //TODO: název
                        dropdown: false,
                        model: "model.ixp=value.ixp,moded.vs=value.vs,model.nazev=value.nazev", // model.ixp_den=value.ixp_den,model.typ_phl=value.typ_phl
                        //change: () => { }
                    })
                        .addRow("Řádek,Čtvrť")
                        .addField("gselectbox", "w-6", Gordic.Prefabs.Select.ciselnikRadku(), {
                        name: "ddp_radek",
                        model: "model.ixp_den=value.ixp_den,model.typ_phl=value.typ_phl,model.ddp_radek=value.ddp_radek",
                        validators: [new Gordic.Validators.Required()],
                        //serverFilters: {},
                        //change: () => { }
                    })
                        .addField("gselectbox", "w-6", Gordic.Prefabs.Select.ciselnikCtvrti(), {
                        name: "ddp_ctvrt",
                        model: "model.ixp_den=value.ixp_den,model.typ_phl=value.typ_phl,model.ddp_ctvrt=value.ddp_ctvrt",
                        validators: [new Gordic.Validators.Required()],
                        //serverFilters: {},
                        //change: () => { }
                    })
                        .addSection()
                        .addField("gcheck", "w-12", {
                        name: "m_bPrevzitRC",
                        label: "Převzít RČ do náhradního VS",
                        initialValue: false,
                        change: function (ev, input) {
                        }
                    })
                        .addField("gcheck", "w-12", {
                        name: "m_bPrevzitVsDoSs",
                        label: "Převzít VS do SS",
                        initialValue: false,
                        change: function (ev, input) {
                        }
                    })
                        .addSection()
                        .addField("gcheck", "w-12", {
                        name: "m_bPrevzitPriUhrZPhl",
                        label: "Přebírat prioritu úhrady z nastavení typu pohledávky",
                        initialValue: false,
                        change: function (ev, input) {
                        }
                    })
                        .addField("gcheck", "w-12", {
                        name: "m_bPouzeVym",
                        label: "Převést pouze vymáhané předpisy",
                        initialValue: false,
                        change: function (ev, input) {
                        }
                    })
                        //var prebratForm = new Gordic.Forms.Form({ name: "", layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                        .addSection("Přebrat z původní pohledávky")
                        .addRow()
                        .addField("gcheck", "w-2", {
                        name: "m_bKopirovatSpisy",
                        label: "Vazbu na spisy",
                        initialValue: false,
                        change: function (ev, input) {
                        }
                    })
                        .addField("gcheck", "w-2", {
                        name: "m_bKopirovatPisemnosti",
                        label: "Vazbu písemností",
                        initialValue: false,
                        change: function (ev, input) {
                        }
                    })
                        .addField("gcheck", "w-2", {
                        name: "m_bKopirovatPopisy",
                        label: "Popis případu",
                        initialValue: false,
                        change: function (ev, input) {
                        }
                    })
                        .addField("gcheck", "w-2", {
                        name: "m_bKopirovatPoznamky",
                        label: "Poznámky",
                        initialValue: false,
                        change: function (ev, input) {
                        }
                    })
                        .addField("gcheck", "w-2", {
                        name: "m_bPrevestDotcene",
                        label: "Dotčené subjekty",
                        initialValue: false,
                        change: function (ev, input) {
                        }
                    });
                    let form_prevodyForm = $.newDiv("GSaldaVymDrFormPrevodyDiv").appendTo(that.element).gform("createFrom", prevodyForm);
                    //let form_prebratForm = $.newDiv("GSaldaVymDrFormPrebratDiv").appendTo(that.element).gform("createFrom", prebratForm);
                }
                //#endregion S E S T A V E N Í   O K N A
                //=======================================================
                //#region M E D O T Y  A  F U N K C E
                /**
                 * Metoda pro načtení základního obsahu okna
                 * @method nactiUhrady()
                 */
                nactiUhrady() {
                    const that = this;
                    let dat_od = that.element.findForms().findFields("dat_od").gfield("getValue");
                    let dat_do = that.element.findForms().findFields("dat_do").gfield("getValue");
                    let napojeneField = that.element.findForms().findFields("napojene").gfield("getValue");
                    let jenNeuhrazene = that.element.findForms().findFields("jenNeuhrazene").gfield("getValue");
                    that.NastavDostupnostAkce(false); //----- Začíná načítáné => Deatkivuju ukládání
                    that.viewPripadUhrady = new Gordic.Isl.View(that.isl.PripadUhrady.list(rq => {
                        return {
                            filters: {
                                ixp: that.Ixp,
                                napojene: napojeneField,
                                jenNeuhrazene: jenNeuhrazene,
                                pepocitatSaldo: true,
                            }
                        };
                    }));
                    that.gridPripadUhrady.ggrid("setData", that.viewPripadUhrady);
                    that.isl.Salda.stavPripadu({ ixpDdp: that.Ixp, napojene: napojeneField }).get()
                        .done((data) => {
                        const napojField = that.element.findForms().findFields("preplatek");
                        var stav = new Decimal(data);
                        if (stav.lessThan(0)) {
                            that.viewCastky[0].preplatek = Decimal.abs(stav);
                            that.gridSaldaVymDrCastky.ggrid("setData", that.viewCastky);
                        }
                        if (napojeneField) {
                            that.gridSaldaVymDrCastky.find(".grid-captions .cell.c4 .caption").text("Přeplatek vč. napoj.");
                        }
                        else {
                            that.gridSaldaVymDrCastky.find(".grid-captions .cell.c4 .caption").text("Přeplatek");
                        }
                    });
                    that.viewPripadUhrady.getLoadingPromise().done(function () {
                        let polozky = that.viewPripadUhrady.getDataRows();
                        var vIntervalu = polozky
                            .filter(a => {
                            const d = new Date(a.dat_spl);
                            return (!dat_od || d >= dat_od) && (!dat_do || d <= dat_do);
                        });
                        var predIntervalemDataRows = polozky
                            .filter(a => {
                            return (dat_od !== null) && new Date(a.dat_spl) < dat_od;
                        });
                        var predpisyCelkem = polozky.reduce((acc, curr) => acc.plus(new Decimal(curr.c)), new Decimal(0));
                        var uhrazenoCelkem = polozky.reduce((acc, curr) => acc.plus(new Decimal(curr.c_uhr)), new Decimal(0));
                        var dluhCelkem = polozky.reduce((acc, curr) => acc.plus(new Decimal(curr.c_dluh)), new Decimal(0));
                        var pocatecniStav = predIntervalemDataRows.reduce((acc, curr) => acc.plus(new Decimal(curr.c_dluh)), new Decimal(0));
                        var predpisy = vIntervalu.reduce((acc, curr) => acc.plus(new Decimal(curr.c)), new Decimal(0));
                        var uhrazeno = vIntervalu.reduce((acc, curr) => acc.plus(new Decimal(curr.c_uhr)), new Decimal(0));
                        var dluh = vIntervalu.reduce((acc, curr) => acc.plus(new Decimal(curr.c_dluh)), new Decimal(0));
                        that.viewCastky[0].poc_stav = pocatecniStav;
                        that.viewCastky[0].predpisy = predpisy;
                        that.viewCastky[0].uhrazeno = uhrazeno;
                        that.viewCastky[0].dluh = dluh;
                        that.viewCastky[1].predpisy = predpisyCelkem;
                        that.viewCastky[1].uhrazeno = uhrazenoCelkem;
                        that.viewCastky[1].dluh = dluhCelkem;
                        that.gridSaldaVymDrCastky.ggrid("setData", that.viewCastky);
                        that.NastavDostupnostAkce(true); //----- Skončilo načítáné => Atkivuju ukládání
                    });
                }
                NastavDostupnostAkce(inValue) {
                    const that = this;
                    if (that.ZpusobPrevodu == 0) { // AKCE OK/SAVE zrušení v režimu zobrazení Salda =)
                        const noVisibleSave = { visible: false, value: false, message: "V tomto režimu prohlížení není co uložit." };
                        that.actions.actSave.updatePermission(noVisibleSave);
                        return;
                    }
                    if (that.ZpusobPrevodu == 99) { // AKCE TISK zrušení v režimu převodu dluhu =)
                        const noVisibleTisk = { visible: false, value: false, message: "V tomto režimu není co tisknout." };
                        that.actions.actTisk.updatePermission(noVisibleTisk);
                        return;
                    }
                    var permValue;
                    if (!inValue) {
                        permValue = { visible: true, value: false, message: "Načítájí se částky...!" };
                    }
                    else {
                        permValue = { visible: true, value: true, message: undefined };
                    }
                    that.actions.actSave.updatePermission(permValue);
                    return;
                }
                /** Metoda pro nastavení tisku Salda Vym DŘ
                 * @method tiskyDokladu()
                 */
                tiskDokladuSaldaDr() {
                    let that = this;
                    let dat_od = that.element.findForms().findFields("dat_od").gfield("getValue");
                    let dat_do = that.element.findForms().findFields("dat_do").gfield("getValue");
                    let napojene = that.element.findForms().findFields("napojene").gfield("getValue");
                    let jenNeuhrazene = that.element.findForms().findFields("jenNeuhrazene").gfield("getValue");
                    //let poc_stav = that.element.findForms().findFields("poc_stav").gfield<Decimal>("getValue");
                    //let predpisy = that.element.findForms().findFields("predpisy").gfield<Decimal>("getValue");
                    //let predpisyCelkem = that.element.findForms().findFields("predpisyCelkem").gfield<Decimal>("getValue");
                    //let uhrazeno = that.element.findForms().findFields("uhrazeno").gfield<Decimal>("getValue");
                    //let uhrazenoCelkem = that.element.findForms().findFields("uhrazenoCelkem").gfield<Decimal>("getValue");
                    //let dluh = that.element.findForms().findFields("dluh").gfield<Decimal>("getValue");
                    //let dluhCelkem = that.element.findForms().findFields("dluhCelkem").gfield<Decimal>("getValue");
                    //let preplatek = that.element.findForms().findFields("preplatek").gfield<Decimal>("getValue");
                    const actTiskDokladuSaldaDr = GAction.createPrintAction({
                        name: "actTiskSaldaDr",
                        tema: "ddp_ptm_saldr",
                        serverParameterMethod: "Gordic.Ddp.WebClient.GDdpWebTisk:SaldaDr",
                        reportStarting: function (rep) {
                            rep.customDto = {
                                ixp: that.Ixp,
                                datumOd: dat_od,
                                datumDo: dat_do,
                                napojeno: napojene ? 1 : 0,
                                neuhrazene: jenNeuhrazene ? 1 : 0,
                                poc_stav: that.viewCastky[0].poc_stav,
                                predpisy: that.viewCastky[0].predpisy,
                                predpisyCelkem: that.viewCastky[1].predpisy,
                                uhrazeno: that.viewCastky[0].uhrazeno,
                                uhrazenoCelkem: that.viewCastky[1].uhrazeno,
                                dluh: that.viewCastky[0].dluh,
                                dluhCelkem: that.viewCastky[1].dluh,
                                preplatek: that.viewCastky[0].preplatek,
                            };
                        },
                    });
                    actTiskDokladuSaldaDr.run();
                }
                CyklusTisku() {
                    const that = this;
                    that.tiskDokladuPrevod()
                        .done(() => {
                        that.dialogs.confirm("Upozornění", "Byl tisk úspěšný a přejete si okno zavřít?")
                            .on("close", (ev, valRet) => {
                            if (valRet == "no")
                                that.CyklusTisku();
                            else
                                that.close();
                        });
                    });
                }
                /** Metoda pro nastavení tisku pří převodu pohledávky
                 * @method tiskDokladuPrevod()
                 */
                tiskDokladuPrevod() {
                    let that = this;
                    var def = $.Deferred();
                    if (!that.findForms().gform("isValid"))
                        return def.reject().promise();
                    let dat_od = that.element.findForms().findFields("dat_od").gfield("getValue");
                    let typ_phl_field = that.element.findForms().findFields("typ_phl").gfield("getValue");
                    if (!dat_od)
                        return def.reject("Není vyplněné datum od").promise();
                    let typPrevoduNum;
                    switch (that.ZpusobPrevodu) {
                        case 1:
                            typPrevoduNum = 2;
                            break;
                        case 2:
                            typPrevoduNum = 3;
                            break;
                        case 3:
                            typPrevoduNum = 4;
                            break;
                        case 4:
                            typPrevoduNum = 1;
                            break;
                        case 5:
                            typPrevoduNum = 5;
                            break;
                    }
                    let rows = this.gridPripadUhrady.ggrid("getSelection");
                    let suma = new Decimal(0);
                    rows.forEach((x) => {
                        if (x.c)
                            suma = suma.plus(x.c);
                    });
                    const actTiskDokladuPrevod = GAction.createPrintAction({
                        name: "actTiskPrevod",
                        tema: "ddp_ptm_predphl",
                        serverParameterMethod: "Gordic.Ddp.WebClient.GDdpWebTisk:PrevodPohledavky",
                        reportStarting: function (rep) {
                            rep.customDto = {
                                ixp_novy: that.NewIxp,
                                typ_phl: typ_phl_field?.typ_phl,
                                nazev: typ_phl_field?.nazev,
                                datumOd: dat_od,
                                ixp: that.Ixp,
                                zpusob: typPrevoduNum,
                                predpisy: that.viewCastky[0].predpisy,
                            };
                        },
                        reportFinished: function () {
                        },
                        dialogClosed: function () {
                            def.resolve();
                        }
                    });
                    actTiskDokladuPrevod.run();
                    return def.promise();
                }
                /**
                 * Metoda pro vytvoření podmíněného formátování gridu -> condFormatu
                 * @method createCondFormat
                 */
                createCondFormats() {
                    const that = this;
                    var datumOd = that.DatumOd ? that.DatumOd.toDateString() : "";
                    var datumDo = that.DatumDo ? that.DatumDo.toDateString() : "";
                    var intervalFormula = `
            IF((
                NOT(EQUALS(\"{0}\", \"\"))
                and 
                DATEDIFF(@dat_spl, \"{0}\") < 0
            )or(
                NOT(EQUALS(\"{1}\", \"\"))
                and 
                DATEDIFF(@dat_spl, \"{1}\") > 0
            ), true, false, false)`
                        .format(datumOd, datumDo);
                    that.mainCondFormats = [
                        {
                            description: "Interval",
                            //formula: "IF(DATEDIFF(@dat_spl, DATEVALUE(\"{0}\")) < 0 or DATEDIFF(@dat_spl, DATEVALUE(\"{1}\")) > 0, true, false, false)".format(that.DatOdText, that.DatDoText),
                            formula: intervalFormula,
                            text: Gordic.Components.Grid.CondFormats.CondFormatText.gray,
                            bg: Gordic.Components.Grid.CondFormats.CondFormatBg.lightgray
                        },
                        {
                            description: "Zaplaceno po splatnosti",
                            applyTo: "zaplaceno_po_splatnosti",
                            formula: "@zaplaceno_po_splatnosti>0",
                            text: Gordic.Components.Grid.CondFormats.CondFormatText.red
                        },
                        {
                            description: "Dluh",
                            applyTo: "c_dluh",
                            formula: "IF((NOT(EQUALS(\"{0}\", \"\")) and DATEDIFF(@dat_spl, \"{0}\") > 0) and @c_dluh!=0, true, false, false)".format(datumOd),
                            text: Gordic.Components.Grid.CondFormats.CondFormatText.red
                        },
                        {
                            description: "Napojený případ",
                            applyTo: "ixp",
                            formula: "NOT(EQUALS(@ixp,\"{0}\"))".format(that.Ixp),
                            italic: true
                        },
                        // Starý zakomentovaný formát dle GSaldoVymDRControl.cs
                        //If col_c_zbyva!=0 AND col_dat_spl.Datum()>df_dat_od.Datum()
                        //    Call SalTblSetCellTextColor( tbl_seznam.col_c_zbyva, COLOR_Red,TRUE)    
                    ];
                }
                /**
                 * Metoda pro nastavení condFormatu při změně datumu
                 * @method setPrifileCondFormat
                 */
                setPrifileCondFormat() {
                    const that = this;
                    that.createCondFormats();
                    // Získám profil
                    const profile = that.gridPripadUhrady.ggrid("getCurrentProfile"); // as GridProfile<any>;
                    // Zajistím, že condFormats není null/undefined
                    profile.condFormats = profile.condFormats ?? [];
                    // Najdu index prvku s description === "Interval" a "Dluh"
                    const indexIn = profile.condFormats.findIndex(cf => cf.description === that.mainCondFormats[0].description);
                    const indexDl = profile.condFormats.findIndex(cf => cf.description === that.mainCondFormats[2].description);
                    if (indexIn >= 0) {
                        // prvek existuje → upravím jeho formuly
                        profile.condFormats[indexIn].formula = that.mainCondFormats[0].formula;
                    }
                    else {
                        // prvek neexistuje → přidám nový
                        profile.condFormats.push(that.mainCondFormats[0]);
                    }
                    if (indexDl >= 0) {
                        // prvek existuje → upravím jeho formuly
                        profile.condFormats[indexDl].formula = that.mainCondFormats[2].formula;
                    }
                    else {
                        // prvek neexistuje → přidám nový
                        profile.condFormats.push(that.mainCondFormats[2]);
                    }
                    // Nakonec aplikuji profil zpět na grid
                    that.gridPripadUhrady.ggrid("useProfile", profile);
                }
                /**
                 * Metoda při změne Datumů Od/Do
                 * @method zmenaDatumOdDo()
                 * @param inputDate Datum získáne z políčka
                 * @param typ Typ políčka: 0 - Datum Od | 1 - Datom Do
                 */
                zmenaDatumOdDo(inputDate, typ) {
                    const that = this;
                    that.setTiskEnabled();
                    if (inputDate != null) {
                        switch (typ) {
                            case 0:
                                that.DatumOd = new Date(inputDate);
                                break;
                            case 1:
                                that.DatumDo = new Date(inputDate);
                                break;
                        }
                        that.setPrifileCondFormat();
                    }
                    that.nactiUhrady();
                }
                /**
                 * Zkontroluje zda je nastaveno datum od/do a podle toho zaktivní/zneaktivní akci TISK
                 * @method setTiskEnabled()
                 */
                setTiskEnabled() {
                    const that = this;
                    if (that.ZpusobPrevodu != 0 && that.ZpusobPrevodu != 99) {
                        var permTisk = { visible: true, value: true };
                        let dat_od = that.element.findForms().findFields("dat_od").gfield("getValue");
                        let dat_do = that.element.findForms().findFields("dat_do").gfield("getValue");
                        if (!dat_od) {
                            permTisk.value = false;
                            permTisk.message = "Není vyplněno Datum Od";
                        }
                        if (!dat_do) {
                            permTisk.value = false;
                            permTisk.message = "Není vyplněno Datum Dd";
                        }
                        that.actions.actTisk.updatePermission(permTisk);
                    }
                }
                setDefaultData() {
                    const that = this;
                    that.nactiUhrady(); // Nejprve si načtu základní data pro všechny režimy , poté pokračuju jen při převodech
                    if (that.ZpusobPrevodu == 0)
                        return; // Při zobrazení Vymáhacího salda dle DŘ se metoda ukončí a vytváření formuláře vůbec nezačne
                    if (that.ZpusobPrevodu == 99)
                        return; // Při zobrazení Vymáhacího salda dle DŘ se metoda ukončí a vytváření formuláře vůbec nezačne
                    // Nastavení políčka Knihy - IXP DEN
                    if (that.DdpParams.ddp_rad_zmekni == 0) {
                        //  m_cbIxpDen.SetValidData(UserProcess.EkoParams.IxpDen);
                        that.findFields("ixp_den").gfield("model", "apply", { ixp_den: that.IxpDen });
                        that.ixpDenFilter = { ixp_den: that.IxpDen };
                    }
                    else {
                        that.ixpDenFilter = { ico: that.Ico, ucs: that.Ucs, rok: that.Rok, aktivita: 100, ixs_fun: that.IxsFun };
                    }
                    that.findFields("ixp_den").gfield("option", "serverFilters", that.ixpDenFilter);
                    // Nastavení filtru políčka TYP PHL
                    that.setTypPhlFilter(that.IxpDen);
                    if (that.TypPhlExeIns != null) {
                        that.findFields("typ_phl").gfield("model", "apply", { typ_phl: that.TypPhlExeIns });
                        that.findFields("typ_phl").gfield("option", "disabled", true);
                    }
                    that.findFields("ddp_radek").gfield("model", "apply", { ddp_radek: that.PripadPuv.ddp_radek, typ_phl: that.TypPhl, ixp_den: that.IxpDen });
                    that.findFields("ddp_ctvrt").gfield("model", "apply", { ddp_ctvrt: that.PripadPuv.ddp_ctvrt, typ_phl: that.TypPhl, ixp_den: that.IxpDen });
                    that.setRadekCtvrtPripadyFilter();
                    if (that.DdpParams.ddp_rad_zmekni == 0) {
                        that.findFields("ixp_den").gfield("option", "disabled", true); //m_cbIxpDen.Visible = false;
                    }
                    if (that.PovolitSlucovani) {
                        that.pripadyEsuFilter = {
                            ixs_esu_prev: that.PripadPuv.ixs_esu,
                            aktivita: 100,
                            eko_akt: 100
                        };
                        that.findFields("pripEsu").gfield("option", "serverFilters", that.pripadyEsuFilter);
                    }
                    else {
                        that.findFields("pripEsu").gfield("option", "disabled", true);
                        //m_tbPripadyESU.Visible = false;
                        // l_velikostEsu = m_tbPripadyESU.Size.Height + m_tbPripadyESU.Margin.Bottom + m_tbPripadyESU.Margin.Top;
                    }
                }
                setRadekCtvrtPripadyFilter() {
                    const that = this;
                    const fieldKniha = that.findFields("ixp_den");
                    const fieldPohl = that.findFields("typ_phl");
                    const fieldPripady = that.findFields("pripEsu");
                    const fieldRadek = that.findFields("ddp_radek");
                    const fieldCtvrt = that.findFields("ddp_ctvrt");
                    let ixpDen = fieldKniha.gfield("getValue");
                    let typPhl = fieldPohl.gfield("getValue");
                    if (ixpDen == null) {
                        fieldPohl.gfield("option", "disabled", true);
                        fieldPohl.gfield("clear");
                    }
                    else {
                        fieldPohl.gfield("option", "disabled", false);
                        that.setTypPhlFilter(ixpDen);
                    }
                    if (typPhl != null) {
                        that.pripadyEsuFilter.typ_phl = typPhl.typ_phl;
                        fieldPripady.gfield("option", "serverFilters", that.pripadyEsuFilter);
                    }
                    if (typPhl == null || ixpDen == null) {
                        fieldPripady.gfield("clear");
                        fieldRadek.gfield("clear");
                        fieldCtvrt.gfield("clear");
                        fieldPripady.gfield("option", "disabled", true);
                        fieldRadek.gfield("option", "disabled", true);
                        fieldCtvrt.gfield("option", "disabled", true);
                        return;
                    }
                    fieldPripady.gfield("option", "disabled", false);
                    fieldRadek.gfield("option", "disabled", false);
                    fieldCtvrt.gfield("option", "disabled", false);
                    that.radekCtvrtFilter = {
                        typ_phl: typPhl.typ_phl,
                        ixp_den: ixpDen.ixp_den,
                        aktivita: 100
                    };
                    fieldRadek.gfield("option", "serverFilters", that.radekCtvrtFilter);
                    fieldCtvrt.gfield("option", "serverFilters", that.radekCtvrtFilter);
                }
                setTypPhlFilter(ixp_den) {
                    const that = this;
                    //if (!ixp_den) ixp_den = that.IxpDen;
                    if (that.ZpusobPrevodu == 4) {
                        that.typPhlFilter = { ixs_fun: that.IxsFun, pomocneProPrevod: true };
                    }
                    else {
                        that.typPhlFilter = {
                            //ne_kesovat: true,
                            phl_pro_roky: true,
                            povolene_pro_knihu: ixp_den,
                            test_kniha_funkce: false,
                            pomocneProPrevod: true
                        };
                        if (that.DdpParams.ddp_phl_preoth == 1) {
                            that.typPhlFilter.povolene_pro_funkci = that.IxsFun;
                        }
                    }
                    that.findFields("typ_phl").gfield("option", "serverFilters", that.typPhlFilter);
                }
                updateDatVzniku(datValue) {
                    const that = this;
                    let valid = true;
                    let text = "";
                    if (datValue != null) {
                        var typ_phl = that.findFields("typ_phl").gfield("getValue");
                        if (typ_phl == null) {
                            valid = false;
                            text = "Datum vzniku nelze validovat. Není vybrán Typ pohledávky!";
                        }
                        else {
                            let valDataPhlzPolicka = that.nastavDatumUzaverkyPhl(typ_phl);
                            if (valDataPhlzPolicka.validPhl == false) {
                                valid = valDataPhlzPolicka.validPhl;
                                text = valDataPhlzPolicka.textPhl;
                            }
                            else {
                                //    let l_datVznikuMoznyZNove: Date = m_oPohledavky.DatumUzaverkyPhl(m_tbTypPhl.TypPhl, GString.Null, UserProcess.EkoParams.CisSpr, m_tbDatVzniku.Value);
                                //    let l_datVznikuMoznyZeStare: Date = m_oPohledavky.DatumUzaverkyPhl(m_TypPhlPuv, GString.Null, UserProcess.EkoParams.CisSpr, m_tbDatVzniku.Value);
                                let l_datVznikuMoznyZNove = new Date(valDataPhlzPolicka.datumPhl);
                                let l_datVznikuMoznyZeStare = new Date(that.DatUzavPuvPohl);
                                if (l_datVznikuMoznyZNove > datValue) {
                                    l_datVznikuMoznyZNove.setDate(l_datVznikuMoznyZNove.getDate() + 1);
                                }
                                else {
                                    l_datVznikuMoznyZNove = datValue;
                                }
                                if (l_datVznikuMoznyZeStare > datValue) {
                                    l_datVznikuMoznyZeStare.setDate(l_datVznikuMoznyZeStare.getDate() + 1);
                                }
                                else {
                                    l_datVznikuMoznyZeStare = datValue;
                                }
                                let l_datVznikuMozny = (l_datVznikuMoznyZNove > l_datVznikuMoznyZeStare ? l_datVznikuMoznyZNove : l_datVznikuMoznyZeStare);
                                if (l_datVznikuMozny > datValue) {
                                    text = "Zadané datum vzniku pro předpisy spadá do uzavřeného období. Nejnižší možné datum je: " + l_datVznikuMozny.toDateString(); //.ToString("dd.MM.yyyy");
                                    valid = false;
                                }
                            }
                        }
                    }
                    else {
                        text = "Není vyplněno pole Datum Vzniku";
                    }
                    //m_oValidProvider.SetText(m_tbDatVzniku, l_bValid ? null : l_text);
                    //m_oValidProvider.SetTipStyle(m_tbDatVzniku, l_bValid ? TipStyle.None : TipStyle.Error);
                    return [valid, text];
                }
                updateDatVznikuPrevodDluhu(datValue) {
                    const that = this;
                    let valid = true;
                    let text = "";
                    if (datValue != null) {
                        let l_datVznikuMoznyZNove = new Date(that.DatUzavNovPohl);
                        let l_datVznikuMoznyZeStare = new Date(that.DatUzavPuvPohl);
                        let l_datVznikuMozny = (l_datVznikuMoznyZNove > l_datVznikuMoznyZeStare ? l_datVznikuMoznyZNove : l_datVznikuMoznyZeStare);
                        if (l_datVznikuMozny > datValue) {
                            text = "Zadané datum vzniku pro předpisy spadá do uzavřeného období. Nejnižší možné datum je: " + l_datVznikuMozny.toDateString(); //.ToString("dd.MM.yyyy");
                            valid = false;
                        }
                    }
                    else {
                        text = "Není vyplněno pole Datum Vzniku";
                    }
                    return [valid, text];
                }
                nastavDatumUzaverkyPhl(typ_phl) {
                    const that = this;
                    let retDatum; // Date|JsonDate // |null|undefined;
                    let retValid = true;
                    let retText = "";
                    if (typ_phl.typ_phl == null) {
                        retValid = false;
                        retText = "Dohledání data uzávěrky není možné. Není uveden Typ pohledávky!";
                    }
                    if (that.Rok == null) { //if (that.RokPhl == null) {
                        retValid = false;
                        retText = "Rok pohledávky není nastaven. Proveďte znovu změnu pohledávky!";
                    }
                    if (typ_phl.Nastaveni.rok == null) {
                        if (typ_phl.pom_rok == null) {
                            retValid = false;
                            retText = "Typ pohledávky pro aktuální období neexistuje!";
                        }
                    }
                    if (typ_phl.pom_priz_spr == 1) {
                        retDatum = typ_phl.pom_spr_dat_uzav;
                    }
                    else {
                        retDatum = typ_phl.pom_dat_uzav;
                    }
                    if (retDatum == null) {
                        if (typ_phl.pom_priz_spr == 1) {
                            retValid = false;
                            retText = `Datum uzávěrky spravované pohledávky ${typ_phl.typ_phl}, roku ${typ_phl.rok} není u pohledávky uvedeno!`;
                        }
                        else {
                            retValid = false;
                            retText = `Datum uzávěrky pohledávky ${typ_phl.typ_phl}, roku ${typ_phl.rok} není u pohledávky uvedeno!`;
                        }
                    }
                    let retData = { datumPhl: retDatum, validPhl: retValid, textPhl: retText };
                    return retData;
                    //return { datumPhl: retDatum, validPhl: retValid, textPhl: retText };
                }
                //#endregion M E D O T Y  A  F U N K C E
                //=======================================================
                //#region T E S T O V Á N Í
                ok() {
                    const that = this;
                    var def = $.Deferred();
                    switch (that.ZpusobPrevodu) {
                        case 99:
                            {
                                that.predpisyKPrevedeni();
                            }
                            break;
                        case 1: // 1 - převod k exekuci,
                        case 2: // 2 - převod k insolvenci,
                        case 3: // 3 - převod na podrozvahu,
                        case 4: // 4 - přesun-přesun
                        case 5: // 5 - převod k vymáhání celnímu úřadu,
                            that.AkcePrevodu()
                                .always((ret) => {
                                that.endOperation();
                            })
                                .fail((ret) => {
                                def.reject(ret);
                            })
                                .done((ret) => {
                                def.resolve();
                            });
                            return def.promise();
                        default: // (Default - 0 - zobrazení Vymáhacího salda dle DŘ)
                            return def.reject("Akce není implementována").promise();
                            break;
                    }
                    return def.promise();
                }
                predpisyKPrevedeni() {
                    const that = this;
                    var def = $.Deferred();
                    if (!that.findForms().gform("isValid"))
                        return def.reject().promise(); //TODO: if (!UpdateDataValid()) {
                    that.beginOperation("Kontroluji data...");
                    that.dataValid()
                        .always((ret) => {
                        that.endOperation();
                    })
                        .fail((ret) => {
                        def.reject(ret);
                    })
                        .done((ret) => {
                        that.beginOperation("Probíhá převod předpisů mezi případy...");
                    });
                    //m_oPripady.PrevodPredpisuKPhl(
                    //    Ixp,
                    //    m_sIxpPrevod,
                    //    m_bPrevestDotcene.Checked,
                    //    m_bKopirovatSpisy.Checked,
                    //    m_bKopirovatPisemnosti.Checked,
                    //    m_bKopirovatPopisy.Checked,
                    //    m_bKopirovatPoznamky.Checked,
                    //    m_gvSeznam.GroupOperationRows.Cast<GSaldoDRDataSet.SeznamRow>().ToArray(),
                    //    GDate.Null,
                    //    GDate.Null,
                    //    m_tbDatVzniku.Value
                    //);
                    return def.promise();
                }
                AkcePrevodu() {
                    const that = this;
                    var def = $.Deferred();
                    if (!that.findForms().gform("isValid"))
                        return def.reject().promise();
                    that.beginOperation("Kontroluji data...");
                    that.dataValid()
                        .always((ret) => {
                        that.endOperation();
                    })
                        .fail((ret) => {
                        def.reject(ret);
                    })
                        .done((ret) => {
                        const f_TypPhl = that.findFields("typ_phl").gfield("getValue");
                        if (f_TypPhl == null || f_TypPhl.typ_phl == null)
                            return def.reject("Není vyplněno pole Typ pohledávky").promise();
                        let l_TypPhl = f_TypPhl.typ_phl;
                        var selection = this.gridPripadUhrady.ggrid("getSelection");
                        var l_PouzeVym = that.findFields("m_bPouzeVym").gfield("getValue");
                        that.beginOperation("Kontroluji data...");
                        that.pouzeVymValid(selection, l_PouzeVym)
                            .always((ret) => {
                            that.endOperation();
                        })
                            .fail((ret) => {
                            def.reject(ret);
                        })
                            .done((ret) => {
                            that.beginOperation("Kontroluji data...");
                            that.krokyVymahaniValid()
                                .always((ret) => {
                                that.endOperation();
                            })
                                .fail((ret) => {
                                def.reject(ret);
                            })
                                .done((ret) => {
                                const f_IxpDen = that.findFields("ixp_den").gfield("getValue");
                                let l_IxpDen = f_IxpDen.ixp_den;
                                that.beginOperation("Kontroluji data...");
                                // kontrola zda existuje radek a ctvrt v cilovem typu pohledavky
                                that.isl.TypPohledavky.jeValidniTypPohledavky({ typPhl: l_TypPhl, ico: that.Ico, ucs: that.Ucs, rok: that.Rok, ixpDen: l_IxpDen, ixsFun: that.IxsFun }).get()
                                    .always((ret) => {
                                    that.endOperation();
                                })
                                    .fail(() => {
                                    def.reject("Chyba při validaci typu pohledávky - chyba na serveru"); // TODO: vrátit serverové chyby ? i když tam je chyba pouze pokud na vstupu nejsou data - asi netřeba...
                                })
                                    .done((data) => {
                                    if (!data) {
                                        def.reject("Vyberte validní typ pohledávky!");
                                    }
                                    const f_DdpRadek = that.findFields("ddp_radek").gfield("getValue");
                                    if (f_DdpRadek == null || f_DdpRadek.ddp_radek == null)
                                        return def.reject("Není vyplněn Řádek").promise();
                                    let l_DdpRadek = f_DdpRadek.ddp_radek;
                                    that.beginOperation("Kontroluji data...");
                                    that.isl.CiselnikRadku.jeValidniRadek({ ixpDen: l_IxpDen, typPhl: l_TypPhl, ddpRadek: l_DdpRadek }).get()
                                        .always((ret) => {
                                        that.endOperation();
                                    })
                                        .fail(function (jqXHR, typ, obj) {
                                        //něco se pokazilo tak vrátim hlášku o důvodu neúspěchu
                                        if (typ === "exception") {
                                            obj.handled = true;
                                            that.dialogs.error("Chyba", obj.baseMessage);
                                        }
                                        def.reject("Chyba při validaci řádku typu pohledávky - chyba na serveru");
                                    })
                                        .done((data) => {
                                        if (!data) {
                                            def.reject("V cílovém typu pohledávky není povolený ŘÁDEK použitý na případu DDP!");
                                        }
                                        const f_DdpCtvrt = that.findFields("ddp_ctvrt").gfield("getValue");
                                        if (f_DdpCtvrt == null || f_DdpCtvrt.ddp_ctvrt == null)
                                            return def.reject("Není vyplněna Čtvrť").promise();
                                        let l_DdpCtvrt = f_DdpCtvrt.ddp_ctvrt;
                                        that.beginOperation("Kontroluji data...");
                                        that.isl.CiselnikCtvrti.jeValidniCtvrt({ ixpDen: l_IxpDen, typPhl: l_TypPhl, ddpCtvrt: l_DdpCtvrt }).get()
                                            .always((ret) => {
                                            that.endOperation();
                                        })
                                            .fail(function (jqXHR, typ, obj) {
                                            //něco se pokazilo tak vrátim hlášku o důvodu neúspěchu
                                            if (typ === "exception") {
                                                obj.handled = true;
                                                that.dialogs.error("Chyba", obj.baseMessage);
                                            }
                                            def.reject("Chyba při validaci čtvrti typu pohledávky - chyba na serveru");
                                        })
                                            .done((data) => {
                                            if (!data) {
                                                def.reject("V cílovém typu pohledávky není povolená ČTVRŤ použitá na případu DDP!");
                                            }
                                            that.beginOperation("Kontroluji data...");
                                            that.castkyValid(selection)
                                                .always((ret) => {
                                                that.endOperation();
                                            })
                                                .fail((ret) => {
                                                def.reject(ret);
                                            })
                                                .done((data) => {
                                                const f_PripadEsu = that.findFields("pripEsu").gfield("getValue");
                                                if (f_PripadEsu != null && f_PripadEsu.ixp != null) {
                                                    that.IxpPrevod = f_PripadEsu.Ixp;
                                                }
                                                else {
                                                    that.IxpPrevod = that.NewIxp;
                                                }
                                                const l_bPrevzitRC = that.findFields("m_bPrevzitRC").gfield("getValue");
                                                const l_bPrevzitVsDoSs = that.findFields("m_bPrevzitVsDoSs").gfield("getValue");
                                                const l_bPrevzitPriUhrZPhl = that.findFields("m_bPrevzitPriUhrZPhl").gfield("getValue");
                                                const l_bPouzeVym = that.findFields("m_bPouzeVym").gfield("getValue");
                                                const l_bKopirovatSpisy = that.findFields("m_bKopirovatSpisy").gfield("getValue");
                                                const l_bKopirovatPisemnosti = that.findFields("m_bKopirovatPisemnosti").gfield("getValue");
                                                const l_bKopirovatPopisy = that.findFields("m_bKopirovatPopisy").gfield("getValue");
                                                const l_bKopirovatPoznamky = that.findFields("m_bKopirovatPoznamky").gfield("getValue");
                                                const l_bPrevestDotcene = that.findFields("m_bPrevestDotcene").gfield("getValue");
                                                const l_DatOd = that.findFields("dat_od").gfield("getValue");
                                                const l_DatDo = that.findFields("dat_do").gfield("getValue");
                                                const l_DatVzniku = that.findFields("dat_vzniku").gfield("getValue");
                                                that.beginOperation(that.InfoTextPriPrevodu);
                                                that.call("ProvestPrevod", {
                                                    o_Ixp: that.Ixp,
                                                    o_IxpPrevod: that.IxpPrevod,
                                                    o_TypPhl: l_TypPhl,
                                                    o_PouzeVym: l_bPouzeVym,
                                                    o_seznamUhrad: selection,
                                                    o_ZpusobPrevodu: that.ZpusobPrevodu,
                                                    o_PrevestDotcene: l_bPrevestDotcene,
                                                    o_PrevzitRC: l_bPrevzitRC,
                                                    o_PrevzitVsDoSs: l_bPrevzitVsDoSs,
                                                    o_PrevzitPriUhrZPhl: l_bPrevzitPriUhrZPhl,
                                                    o_KopirovatSpisy: l_bKopirovatSpisy,
                                                    o_KopirovatPisemnosti: l_bKopirovatPisemnosti,
                                                    o_KopirovatPopisy: l_bKopirovatPopisy,
                                                    o_KopirovatPoznamky: l_bKopirovatPoznamky,
                                                    o_DatOd: l_DatOd,
                                                    o_DatDo: l_DatDo,
                                                    o_DatVzniku: l_DatVzniku,
                                                    o_DdpRadek: l_DdpRadek,
                                                    o_DdpCtvrt: l_DdpCtvrt,
                                                })
                                                    .done(function (data) {
                                                    def.resolve();
                                                })
                                                    .fail(function (jqXHR, typ, obj) {
                                                    //něco se pokazilo tak vrátim hlášku o důvodu neúspěchu
                                                    if (typ === "exception") {
                                                        obj.handled = true;
                                                        that.dialogs.error("Chyba", obj.baseMessage);
                                                    }
                                                    def.reject(data);
                                                })
                                                    .always((ret) => {
                                                    that.endOperation();
                                                });
                                                //?-------------------------------------------------------------------------------------
                                            }); //! castkyValid()
                                            //return def.promise();
                                        }); //! isl.CiselnikCtvrti.jeValidniCtvrt()
                                        //return def.promise();
                                    }); //! isl.CiselnikRadku.jeValidniRadek()
                                    //return def.promise();
                                }); //! isl.TypPohledavky.jeValidniTypPohledavky()
                                //return def.promise();
                            }); //! krokyVymahaniValid()
                            //return def.promise();
                        }); //! pouzeVymValid()
                        //return def.promise();
                    }); //! dataValid()
                    return def.promise();
                }
                castkyValid(selection) {
                    const that = this;
                    var def = $.Deferred();
                    let l_bMaPrevadenyVetsiNezDluh = false;
                    var BreakException = {};
                    try {
                        selection.forEach((row) => {
                            if ((row.c - row.c_uhr) < row.c_dluh) {
                                l_bMaPrevadenyVetsiNezDluh = true;
                                throw BreakException;
                                ;
                            }
                        });
                    }
                    catch (e) {
                        if (e !== BreakException)
                            throw e;
                    }
                    if (l_bMaPrevadenyVetsiNezDluh) {
                        that.dialogs.confirm("Upozornění", "Jeden z převáděných předpisů převádí částku větší než je aktuální dluh. Chcete pokračovat?")
                            .on("close", (ev, ret) => {
                            if (ret == "yes") {
                                def.resolve();
                            }
                            else {
                                def.reject("");
                            }
                        });
                        return def.promise();
                    }
                    return def.resolve().promise();
                }
                krokyVymahaniValid() {
                    const that = this;
                    var def = $.Deferred();
                    if (that.DdpParams.ddp_rez_plvexe != 0 && !that.ExistujeKrokVymVymer) {
                        if (that.DdpParams.ddp_rez_plvexe == 1) { // Upozornit na neexistenci platebního výměru
                            that.endOperation();
                            that.dialogs.confirm("Upozornění", "Případ nemá platební výměr. Chcete ho převést?")
                                .on("close", (ev, ret) => {
                                if (ret == "yes") {
                                    def.resolve();
                                }
                                else {
                                    def.reject(""); //? Ukončeno uživatelem
                                }
                            });
                            return def.promise();
                        }
                        else if (that.DdpParams.ddp_rez_plvexe == 2) { // Nepovolit převod nez platebního výměru
                            return def.reject("Případ není možné převést. Neexistuje platební výměr.").promise();
                        }
                    }
                    return def.resolve().promise();
                }
                pouzeVymValid(selection, pouzeVym) {
                    const that = this;
                    var def = $.Deferred();
                    if (pouzeVym == true) {
                        let l_bJenVymOk = true;
                        var BreakException = {};
                        try {
                            selection.forEach((row) => {
                                if (row.je_vym != 1) {
                                    l_bJenVymOk = false;
                                    throw BreakException;
                                }
                            });
                        }
                        catch (e) {
                            if (e !== BreakException)
                                throw e;
                        }
                        if (!l_bJenVymOk) {
                            that.endOperation();
                            that.dialogs.confirm("Upozornění", "Budou se převádět pouze vymáhané předpisy. Některé z vybraných tuto podmínku nesplňují. Chcete pokračovat?")
                                .on("close", (ev, ret) => {
                                if (ret == "yes") {
                                    def.resolve();
                                }
                                else {
                                    def.reject("");
                                }
                            });
                            return def.promise();
                        }
                        return def.resolve().promise();
                    }
                    return def.resolve().promise();
                }
                dataValid() {
                    const that = this;
                    var def = $.Deferred();
                    //TODO: updateDataValid()
                    if (that.viewCastky[0].dluh?.lessThanOrEqualTo(0)) {
                        return def.reject("Případ za zadané období nemá dluh!").promise();
                    }
                    return def.resolve().promise();
                }
                testVyplnenychPolicek() {
                    const that = this;
                    const fieldKniha = that.findFields("ixp_den");
                    const fieldPohl = that.findFields("typ_phl");
                    const fieldPripady = that.findFields("pripEsu");
                    const fieldRadek = that.findFields("ddp_radek");
                    const fieldCtvrt = that.findFields("ddp_ctvrt");
                    if (fieldKniha.gfield("getValue") == null) {
                        fieldPohl.gfield("option", "disabled", true);
                        fieldPripady.gfield("option", "disabled", true);
                        fieldRadek.gfield("option", "disabled", true);
                        fieldCtvrt.gfield("option", "disabled", true);
                        fieldPohl.gfield("clear");
                        fieldPripady.gfield("clear");
                        fieldRadek.gfield("clear");
                        fieldCtvrt.gfield("clear");
                        return;
                    }
                    if (fieldPohl.gfield("getValue") == null) {
                        fieldPripady.gfield("option", "disabled", true);
                        fieldRadek.gfield("option", "disabled", true);
                        fieldCtvrt.gfield("option", "disabled", true);
                        fieldPripady.gfield("clear");
                        fieldRadek.gfield("clear");
                        fieldCtvrt.gfield("clear");
                        return;
                    }
                    fieldPohl.gfield("option", "disabled", false);
                    fieldPripady.gfield("option", "disabled", false);
                    fieldRadek.gfield("option", "disabled", false);
                    fieldCtvrt.gfield("option", "disabled", false);
                }
            };
            GSaldaVymDr = __decorate([
                Decorators.gcontent
            ], GSaldaVymDr);
            WebClient.GSaldaVymDr = GSaldaVymDr;
            //#endregion POMOCNÉ OBJEKTY
            //=======================================================
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NhbGRhVnltRHIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU2FsZGFWeW1Eci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQW1tRGY7QUFubURELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQW1tRG5CO0lBbm1EZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBbW1EN0I7UUFubURvQixXQUFBLFNBQVM7WUFDMUI7Ozs7OztlQU1HO1lBRUgsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBWSxTQUFRLE9BQUEsWUFBWTtnQkFBN0M7b0JBRUkseURBQXlEO29CQUN6RCw2QkFBNkI7O29CQStHN0IsaUJBQVksR0FBUSxFQUFFLENBQUM7b0JBQ3ZCLGlCQUFZLEdBQVEsRUFBRSxDQUFDO29CQUN2QixxQkFBZ0IsR0FBUSxFQUFFLENBQUM7b0JBQzNCLHFCQUFnQixHQUFRLEVBQUUsQ0FBQztvQkFpOUMzQiw4QkFBOEI7b0JBQzlCLHlEQUF5RDtnQkFDN0QsQ0FBQztnQkFqOUNHLGlDQUFpQztnQkFDakMseURBQXlEO2dCQUN6RCxxQ0FBcUM7Z0JBQ3JDLGNBQWM7b0JBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksRUFBRSxFQUFFLENBQUM7d0JBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDeEMsQ0FBQztvQkFFRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUks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WSxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFZLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBRXZJLElBQUksUUFBUSxHQUFZLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFZLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pILElBQUksUUFBUSxHQUFZLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFZLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3JILElBQUksSUFBSSxHQUFZLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFZLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBRWxILElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQzt3QkFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO3dCQUN2QyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7d0JBQ3ZDLElBQUksQ0FBQyxVQUFVLENB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RFMsTUFBTSxLQUFOLE1BQU0sUUFtbURmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdTYWxkYVZ5bURyLnRzICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBPa25vIHBybyB6b2JyYXplbsOtIFZ5bcOhaGFjw61obyBzYWxkYSBkbGUgRMWYIHBybyBwxZnDrXBhZCBERFAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTA5LTMwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBPa25vIHBybyB6b2JyYXplbsOtIFZ5bcOhaGFjw61obyBzYWxkYSBkbGUgRMWYIChkYcWIb3bDqWhvIMWZw6FkdSkgcHJvIHDFmcOtcGFkIEREUFxyXG4gICAgICogQGF1dGhvciBNYXJ0bmkgSGFudcWhXHJcbiAgICAgKiBAY29weXJpZ2h0IMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNlxyXG4gICAgICogQGNyZWF0ZWQgMjAyNS0wOS0zMCBcclxuICAgICAqIEBsYXN0TW9kaWZpZWQgMjAyNS0wOS0zMCBcclxuICAgICAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU2FsZGFWeW1EciBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgIC8vI3JlZ2lvbiBQIFIgTyBQIEUgUiBUIEkgRSBTXHJcblxyXG4gICAgICAgIC8qKiBcclxuICAgICAgICAgKiBJZGVudGlmaWvDoXRvciBwxZnDrXBhZHUgQHR5cGUge3N0cmluZ30gKi9cclxuICAgICAgICBJeHA6IHN0cmluZztcclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICogUElEIG5vdsOpaG8gcMWZw61wYWR1IHDFmWkgcMWZZXZvZHUgQHR5cGUge3N0cmluZ30gKi9cclxuICAgICAgICBOZXdJeHA6IHN0cmluZztcclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICogUElEIHDFmcOtcGFkdSwgbmEga3RlcsO9IHNlIHNrdXRlxI1uxJsgcMWZZXbDoWTDrSBAdHlwZSB7c3RyaW5nfSAqL1xyXG4gICAgICAgIEl4cFByZXZvZDogc3RyaW5nO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIElkZW50aWZpa8OhdG9yIHR5cHUgcG9obGVkw6F2a3kgKG5hIHDFmcOtcGFkdSkgQHR5cGUge3N0cmluZ30gKi9cclxuICAgICAgICBUeXBQaGxQdXY6IHN0cmluZztcclxuXHJcbiAgICAgICAgUHJpcGFkUHV2OiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZER0bztcclxuXHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIERhdHVtIE9kIEB0eXBlIHtEYXRlfSAqL1xyXG4gICAgICAgIHJlYWRvbmx5IERhdE9kOiBEYXRlO1xyXG4gICAgICAgIC8qKiBcclxuICAgICAgICAgKiBEYXR1bSBEbyBAdHlwZSB7RGF0ZX0gKi9cclxuICAgICAgICByZWFkb25seSBEYXREbzogRGF0ZTtcclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICogRGF0dW0gdXphdsWZZW7DrSBwxa92b2Ruw61obyB0eXB1IHBvaGxlZMOhdmt5ICovXHJcbiAgICAgICAgcmVhZG9ubHkgRGF0VXphdlB1dlBvaGw6IERhdGU7XHJcbiAgICAgICAgcmVhZG9ubHkgRGF0VXphdk5vdlBvaGw6IERhdGU7XHJcbiAgICAgICBcclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICogUG9tb2Nuw6kgRGF0dW0gT2QgQHR5cGUge0RhdGV8bnVsbH0gKi9cclxuICAgICAgICBEYXR1bU9kOiBEYXRlfG51bGw7XHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIFBvbW9jbsOpIERhdHVtIERvIEB0eXBlIHtEYXRlfG51bGx9ICovXHJcbiAgICAgICAgRGF0dW1EbzogRGF0ZSB8IG51bGw7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFR5cCBwxZlldm9kdSBwxZnDrXBhZHUgbWV6aSBwb2hsZWTDoXZrYW1pIFxyXG4gICAgICAgICAqIDEtcMWZZXZvZCBrIGV4ZWt1Y2ksIDItcMWZZXZvZCBrIGluc29sdmVuY2ksIDMtcMWZZXZvZCBuYSBwb2Ryb3p2YWh1LCA0LXDFmWVzdW4sIDUtcMWZZXZvZCBrIHZ5bcOhaMOhbsOtIGNlbG7DrW11IMO6xZlhZHUsIChEZWZhdWx0IC0gMCAtIHpvYnJhemVuw60gVnltw6FoYWPDrWhvIHNhbGRhIGRsZSBExZgpXHJcbiAgICAgICAgICogQHR5cGUge0RkcC5JbnRlcmZhY2UuR0RkcEdsb2JhbHNCYXNlLlR5cFByZXZvZHVQb2hsZWRhdmt5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFpwdXNvYlByZXZvZHU6IERkcC5JbnRlcmZhY2UuR0RkcEdsb2JhbHNCYXNlLlR5cFByZXZvZHVQb2hsZWRhdmt5O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQYXJhbWV0cnkgYXBsaWthY2UgRERQXHJcbiAgICAgICAgICogT2JqZWt0IG9ic2FodWplIGNlbG91IMWha8OhbHUgcGFyYW1ldHLFrywgYWxlIG5hxI10ZW55IGpzb3UgcG91emUgdHksIGt0ZXLDqSBzZSB2eXXFvsOtdmFqw60gemRlIG5hIGRldGFpbHVcclxuICAgICAgICAgKiBKZWppY2ggbmHEjXRlbsOtIGplIGRlZmlub3bDoW5vIHYgR1NhbGRhVnltRHIuY3Mga2RlIGx6ZSBwxZlpZGF0IGRhbMWhw60gamUtbGkgdG8gcG90xZllYmFcclxuICAgICAgICAgKi9cclxuICAgICAgICBEZHBQYXJhbXM6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkdEZHBQYXJhbWV0cnlEdG87XHJcblxyXG4gICAgICAgIC8qKiBaZGEgcG92b2xpdCBzbHXEjW92w6Fuw60gZXhla3Vjw60vaW5zb2x2ZW5jw60vcG9kcm96dmFoeS9jZWxuw61jaSAqL1xyXG4gICAgICAgIFBvdm9saXRTbHVjb3Zhbmk6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqIFRleHQsIGt0ZXLDvSBzZSBtw6Egem9icmF6b3ZhdCBwxZlpIMSNZWvDoW7DrSwga2R5xb4gc2UgcHJvdsOhZMOtIHDFmWV2b2QgKi9cclxuICAgICAgICBJbmZvVGV4dFByaVByZXZvZHU6IHN0cmluZztcclxuXHJcbiAgICAgICAgLyoqIElkZW50aWZpa8OhdG9yIGtuaWh5IC0gZWtvcGFyYW1zICAqL1xyXG4gICAgICAgIHJlYWRvbmx5IEl4cERlbjogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBSb2sgLSBla29wYXJhbXMgKi9cclxuICAgICAgICByZWFkb25seSBSb2s6IG51bWJlcjtcclxuICAgICAgICAvKiogVUNTIC0gZWtvcGFyYW1zICovXHJcbiAgICAgICAgcmVhZG9ubHkgVWNzOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIEnEjE8gLSBla29wYXJhbXMgICovXHJcbiAgICAgICAgcmVhZG9ubHkgSWNvOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIElkZW50aWZpa8OhdG9yIGZ1bmtjZSAtIHNlc3Npb25pbmZvICovXHJcbiAgICAgICAgcmVhZG9ubHkgSXhzRnVuOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIFR5cCBQb2hsZWTDoXZreSAtIGVrb3BhcmFtcyAqL1xyXG4gICAgICAgIHJlYWRvbmx5IFR5cFBobDogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBSb2sgUG9obGVkw6F2a3kgLSBla29wYXJhbXMgKi9cclxuICAgICAgICByZWFkb25seSBSb2tQaGw6IG51bWJlcnxudWxsfHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgLyoqIFR5cCBwb2hsZWTDoXZreSBFWEUgKi9cclxuICAgICAgICBUeXBQaGxFeGVJbnM6IHN0cmluZyB8IG51bGw7XHJcbiAgICAgICAgLyoqICovXHJcbiAgICAgICAgRXhpc3R1amVLcm9rVnltVnltZXI6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdyaWQgcHJvIFDFmcOtcGFkIMO6aHJhZHlcclxuICAgICAgICAgKiBAdHlwZSB7SlF1ZXJ5PD59IEpRdWVyeTxIVE1MRWxlbWVudD5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdyaWRQcmlwYWRVaHJhZHk6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JpZCBwcm8gUMWZw61wYWQgw7pocmFkeSAocm96cGlzIMO6aHJhZClcclxuICAgICAgICAgKiBAdHlwZSB7SlF1ZXJ5PD59IEpRdWVyeTxIVE1MRWxlbWVudD5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdyaWRQcmlwYWRVaHJhZHlEZXRhaWw6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JpZCBzIHJvenBpc2VtIMSNw6FzdGVrIFNhbGRhIFZ5bS4gRMWZLlxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnk8Pn0gSlF1ZXJ5PEhUTUxFbGVtZW50PlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZFNhbGRhVnltRHJDYXN0a3k6IEpRdWVyeTxIVE1MRWxlbWVudD47IFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIElzbCBWaWV3IHBybyBQxZnDrXBhZCDDumhyYWR5XHJcbiAgICAgICAgICogQHR5cGUge0lzbC5WaWV3PD59IElzbC5WaWV3PGFueSwgSXNsLkdTZXJ2aWNlTGlzdFJlcXVlc3QsIElzbC5HU2VydmljZUxpc3RSZXNwb25zZTxJbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWRVaHJhZHlEdG8+PlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgdmlld1ByaXBhZFVocmFkeTogSXNsLlZpZXc8YW55LCBJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCwgSXNsLkdTZXJ2aWNlTGlzdFJlc3BvbnNlPEludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZFVocmFkeUR0bz4+O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIElzbCBWaWV3IHBybyBQxZnDrXBhZCDDumhyYWR5IChyb3pwaXMgw7pocmFkKVxyXG4gICAgICAgICAqIEB0eXBlIHtJc2wuVmlldzw+fHVuZGVmaW5lZH0gSXNsLlZpZXc8YW55LCBJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCwgSXNsLkdTZXJ2aWNlTGlzdFJlc3BvbnNlPEludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZFVocmFkeUR0bz4+IHwgdW5kZWZpbmVkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3UHJpcGFkVWhyYWR5RGV0YWlsOiBJc2wuVmlldzxhbnksIElzbC5HU2VydmljZUxpc3RSZXF1ZXN0LCBJc2wuR1NlcnZpY2VMaXN0UmVzcG9uc2U8SW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkVWhyYWR5RHRvPj4gfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSXNsIFZpZXcgcHJvIHJvenBpcyDEjcOhc3RlayBTYWxkYSBWeW0uIETFmS5cclxuICAgICAgICAgKiBAdHlwZSB7aUNhc3RreVtdfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgdmlld0Nhc3RreTogaUNhc3RreVtdO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFDFmWVkZGVmaW5vdmFuw6kgY29uZEZvcm3DoXR5IC0gcG9sb8W+a3kgcG9kbcOtbsSbbsOpaG8gZm9ybcOhdG92w6Fuw60gaGwuIGdyaWR1XHJcbiAgICAgICAgICogU2xvdcW+w60gcHJvIHpub3Z1LW5hc3RhdmVuw60gcG9kbWnFiGVuw6lobyBmb3Jtw6F0b3bDoW7DrSBncmlkdSBwxZlpIHptxJtuw6FjaCBkYXR1bcWvXHJcbiAgICAgICAgICogQHR5cGUge0dvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFtdfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgbWFpbkNvbmRGb3JtYXRzOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRbXTtcclxuXHJcbiAgICAgICAgaXhwRGVuRmlsdGVyOiBhbnkgPSB7fTtcclxuICAgICAgICB0eXBQaGxGaWx0ZXI6IGFueSA9IHt9O1xyXG4gICAgICAgIHJhZGVrQ3R2cnRGaWx0ZXI6IGFueSA9IHt9O1xyXG4gICAgICAgIHByaXBhZHlFc3VGaWx0ZXI6IGFueSA9IHt9O1xyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb24gUCBSIE8gUCBFIFIgVCBJIEUgUyBcclxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICAvLyNyZWdpb24gTyBOIEMgTyBOIFQgRSBOIFQgUiBFIEEgRCBZXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQuWnB1c29iUHJldm9kdSAhPSA5OSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5EYXR1bU9kID0gbmV3IERhdGUodGhhdC5EYXRPZCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LkRhdHVtRG8gPSBuZXcgRGF0ZSh0aGF0LkRhdERvKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUdyaWQoKTsgXHJcblxyXG4gICAgICAgICAgICB0aGF0LnNldERlZmF1bHREYXRhKClcclxuXHJcbiAgICAgICAgICAgIERkcC5XZWJDbGllbnQuQ29tbW9uLkJhc2Uuc2V0RGF0ZUJveFNob3J0Y3V0cyh0aGF0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uIE8gTiBDIE8gTiBUIEUgTiBUIFIgRSBBIEQgWVxyXG4gICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgIC8vI3JlZ2lvbiBTIEUgUyBUIEEgViBFIE4gw40gICBPIEsgTiBBXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZllbsOtIGplZG5vdGxpdsO9Y2ggYWtjw60gYSBuYXN0YXZlbsOhw60gY29tbWFuZC9tZW51IGJhcnVcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZUFjdGlvbnMoKVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfSAtIFVrb27EjWVuw60gbWV0b2R5IHZvaWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT0tcIiwgLy8gXCJVbG/Fvml0XCIsIC8vIFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtZmxvcHB5LW9cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vaygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5DeWtsdXNUaXNrdSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETzogT3ByYXZpdCB0aXNrIGEgdnnFmWXFoWl0IGRvdGF6b3bDqSBva25lIG8gKG5lKcO6c3DEm2NodSB0aXNrdVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCgocmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgcmV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlphdsWZw610XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5jbG9zZSgpOyB9IC8vIFphdsWZZW7DrSBva25hXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0UmVzZXRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9ixI1lcnN0dml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1yZWZyZXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmFjdGlVaHJhZHkoKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFRpc2tcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlRpc2tcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXByaW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5acHVzb2JQcmV2b2R1ID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRpc2tEb2tsYWR1U2FsZGFEcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRpc2tEb2tsYWR1UHJldm9kKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCgocmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8jcmVnaW9uIC0tLSBBa2NlIHBybyB0ZXN0b3bDoW7DrSAgLS0tXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDaGFuZ2VDYXB0aW9uUHJlcGxhdGVrX1ZhcmlhbnR5Wm1lbnlcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlptZW5hIHDFmWVwbGF0ZWtcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJabWVuYSBQb3Bpc2t1IHDFmWVwbGF0ZWtcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8hIFZhcmlhbnRhIDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkU2FsZGFWeW1EckNhc3RreS5maW5kKFwiLmdyaWQtY2FwdGlvbnMgLmNlbGwuYzQgLmNhcHRpb25cIikudGV4dChcIlDFmWVwbGF0ZWsgdsSNLiBuYXBvai5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vISBWYXJpYW50YSAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhcHRpb25zID0gdGhhdC5ncmlkU2FsZGFWeW1EckNhc3RreS5maW5kKFwiLmdyaWQtY2FwdGlvbnMgLmNlbGwgLmNhcHRpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb25zLmVxKDQpLnRleHQoXCJQxZllcGxhdGVrIHbEjS4gbmFwb2ouXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyEgVmFyaWFudGEgM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBncmlkRWxlbWVudCA9IHRoYXQuZ3JpZFNhbGRhVnltRHJDYXN0a3lbMF07IC8vIHBydm7DrSBET00gZWxlbWVudCB6IGpRdWVyeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjYXB0aW9uID0gZ3JpZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5ncmlkLWNhcHRpb25zIC5jZWxsLmM0IC5jYXB0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FwdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbi50ZXh0Q29udGVudCA9IFwiUMWZZXBsYXRlayB2xI0uIG5hcG9qLlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdENoYW5nZUNvbmRGb3JtYXRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlptZW5hIFByb2ZpbHUgZ3JpZHVcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJabcSbbmEgcG9kbcOtbsSbbsOpaG8gZm9ybcOhdG92w6Fuw60gdiBncmlkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFByaWZpbGVDb25kRm9ybWF0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vI2VuZHJlZ2lvbiAtLS0gQWtjZSBwcm8gdGVzdG92w6Fuw60gIC0tLVxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuTmFzdGF2RG9zdHVwbm9zdEFrY2UoZmFsc2UpOyAvLyBOYXN0YXZ1amkgRkFMU0UgcHJvdG/FvmUgdiB0dXRvIGNodsOtbGkgamXFoXTEmyBuZW7DrSBhbmkgZm9ybXVsw6HFmSBkZWZpbm92YW7DvSB2ZSBrdGVyw6ltIGJ5IG1vaGxhIGLDvXQgcG90xZllYm7DoSBkYXRhIG5hxI10ZW5hXHJcblxyXG4gICAgICAgICAgICB0aGF0Lm1lbnVCYXIodGhhdC5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RUaXNrKlwiLCBcIjxhY3RSZXNldCpcIl0pKTtcclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKHRoYXQuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0U2F2ZSFcIiwgXCJhY3RDbG9zZVwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBobGF2acSNa3kgb2tuYVxyXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlRm9ybSgpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGxheW91dERhdHVteTogc3RyaW5nID0gXCJMMk0yUzIsIEwtMTItMTItMCwgTS0xMi0xMi0wLCBTLTEyLTEyLTBcIjtcclxuICAgICAgICAgICAgdmFyIGRhdEZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIkdTYWxkYVZ5bURyRm9ybTFcIiwgbGF5b3V0RGVzY3JpcHRvcjogbGF5b3V0RGF0dW15IH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IG5hbWU6IFwiR1NhbGRhVnltRHJGb3JtMVNlY3Rpb25EYXR1bU9kXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBvZFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9vZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhhdC5EYXR1bU9kLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnptZW5hRGF0dW1PZERvKGlucHV0LnZhbHVlLCAwKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IG5hbWU6IFwiR1NhbGRhVnltRHJGb3JtMVNlY3Rpb25EYXR1bURvXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBkb1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9kb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhhdC5EYXR1bURvLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnptZW5hRGF0dW1PZERvKGlucHV0LnZhbHVlLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIGZvcm0xID0gJC5uZXdEaXYoXCJHU2FsZGFWeW1EckZvcm0xRGl2XCIpLmFwcGVuZFRvKHRoYXQuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGRhdEZvcm0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC52aWV3Q2FzdGt5ID0gW3tcclxuICAgICAgICAgICAgICAgIHBvY19zdGF2OiBuZXcgRGVjaW1hbCgwKSxcclxuICAgICAgICAgICAgICAgIHByZWRwaXN5OiBuZXcgRGVjaW1hbCgwKSxcclxuICAgICAgICAgICAgICAgIHVocmF6ZW5vOiBuZXcgRGVjaW1hbCgwKSxcclxuICAgICAgICAgICAgICAgIGRsdWg6IG5ldyBEZWNpbWFsKDApLFxyXG4gICAgICAgICAgICAgICAgcHJlcGxhdGVrOiBuZXcgRGVjaW1hbCgwKVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBwb2Nfc3RhdjogbnVsbCxcclxuICAgICAgICAgICAgICAgIHByZWRwaXN5OiBuZXcgRGVjaW1hbCgwKSxcclxuICAgICAgICAgICAgICAgIHVocmF6ZW5vOiBuZXcgRGVjaW1hbCgwKSxcclxuICAgICAgICAgICAgICAgIGRsdWg6IG5ldyBEZWNpbWFsKDApLFxyXG4gICAgICAgICAgICAgICAgcHJlcGxhdGVrOiBudWxsXHJcbiAgICAgICAgICAgIH1dO1xyXG4gICAgICAgICAgICB0aGF0LmdyaWRTYWxkYVZ5bURyQ2FzdGt5ID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoYXQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5jc3MoXCJ3aWR0aFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkUHJpcGFkVWhyYWR5RGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhhdC52aWV3Q2FzdGt5LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IERkcC5XZWJDbGllbnQuQ29tbW9uLkdyaWRGb3JtYXRzLlNhbGRhVnltRHJDYXN0a3koKSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dCb3R0b21QYW5lbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd1RvcFBhbmVsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSk7ICAgXHJcblxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUZvcm1QcmV2b2QoKTsgLy8gUHJvIHDFmWV2b2R5IGRvdnl0dm/FmcOtbSBmb3JtdWzDocWZIC0ga29udHJvbGEgemRhIHNlIGplbmTDoSBvIHDFmWV2b2QgamUgdXZuaXTFmSBtZXRvZHlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gdnl0dm/FmWVuw60gYSBkZWZpbm92w6Fuw60gc2V6bmFtdSAoPWdyaWR1KVxyXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlR3JpZCgpXHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9IC0gVWtvbsSNZW7DrSBtZXRvZHkgdm9pZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBmb3JtR3JpZFNldHRpbmcgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIkdTYWxkYVZ5bURyRm9ybTNcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTC0wLTEyLTAsIE0tMC0xMi0wLCBTLTAtMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IG5hbWU6IFwiR1NhbGRhVnltRHJTZWN0aW9uQ2hlY2sxXCIsIGxhYmVsOiBcIlDFmWVkcGlzeVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXBvamVuZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlNhbGRvIHbEjWV0bsSbIG7DoXZhei4gcG9wbC5cIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmFjdGlVaHJhZHkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy00XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImplbk5ldWhyYXplbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQb3V6ZSBuZXVocmF6ZW7DqSBwxZllZHAuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYWN0aVVocmFkeSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHZhciBmb3JtMyA9ICQubmV3RGl2KFwiR1NhbGRhVnltRHJGb3JtM0RpdlwiKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtR3JpZFNldHRpbmcpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVDb25kRm9ybWF0cygpO1xyXG4gICAgICAgICAgICB0aGF0LmdyaWRQcmlwYWRVaHJhZHkgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcIndpZHRoXCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZFVocmFkeUR0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFByaXBhZFVocmFkeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0aGF0LlpwdXNvYlByZXZvZHUgIT0gMCxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiBcInN0YXYsZGF0X3NwbCxrdGdfdXBvLHByaV91aHIsYyxjX3VocixjX2RsdWgsZGF0X3Vocix6YXBsYWNlbm9fcG9fc3BsYXRub3N0aSxkbmlfcG9fc3BsYXRub3N0aSxpeHAsZXN1X3R4dCx0eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRGb3JtYXRzOiB0aGF0Lm1haW5Db25kRm9ybWF0cyxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IERkcC5XZWJDbGllbnQuQ29tbW9uLkdyaWRGb3JtYXRzLlVocmFkeVByaXBhZHUodHJ1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbEFjdGl2YXRlOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyNyZWdpb24gTmHEjXRlbsOtIGRhdCBib8SNbsOtaG8gZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuWnB1c29iUHJldm9kdSA9PSAwKSB7IC8vIE5hc3RhdmVuw60gYm/EjW7DrWhvIHBhbmVsdSBwb3V6ZSBwcm8gVnltw6FoYWPDrSBTYWxkbyBkbGUgRMWYIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LmNsb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHggIT0gbnVsbCAmJiBjdHguY2VsbEluZm8gIT0gbnVsbCAmJiBjdHguY2VsbEluZm8uZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld1ByaXBhZFVocmFkeURldGFpbCA9IG5ldyBJc2wuVmlldyhJc2wuUHJpcGFkVWhyYWR5LmRldGFpbFVocmFkeUxpc3QocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogY3R4LmNlbGxJbmZvLmRhdGEuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRfc3BsOiBjdHguY2VsbEluZm8uZGF0YS5kYXRfc3BsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdGdfdXBvOiBjdHguY2VsbEluZm8uZGF0YS5rdGdfdXBvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmlfdWhyOiBjdHguY2VsbEluZm8uZGF0YS5wcmlfdWhyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkUHJpcGFkVWhyYWR5RGV0YWlsLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXdQcmlwYWRVaHJhZHlEZXRhaWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld1ByaXBhZFVocmFkeURldGFpbCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkUHJpcGFkVWhyYWR5RGV0YWlsLmdncmlkKFwic2V0RGF0YVwiLCBbXSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pICBcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LlpwdXNvYlByZXZvZHUgPT0gMCkgeyAvLyBCb8SNbsOtIHBhbmVsIHBvdXplIHBybyBWeW3DoWhhY8OtIFNhbGRvIGRsZSBExZggXHJcbiAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZ3NpZGViYXIoXCJhZGRQYW5lbFwiLCBcInJpZ2h0XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBsZWFmOiB7IGNhcHRpb246IFwiw5pocmFkeVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwicGFuZWxQcmlwYWRVaHJhZHlEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBwaW5uZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1iYWxhbmNlLXNjYWxlXCIsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcGFuZWxQcmlwYWRVaHJhZHlEZXRhaWwgPSB0aGF0LmVsZW1lbnQuZ3NpZGViYXIoXCJnZXRQYW5lbFwiLCBcInBhbmVsUHJpcGFkVWhyYWR5RGV0YWlsXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQuZ3JpZFByaXBhZFVocmFkeURldGFpbCA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8ocGFuZWxQcmlwYWRVaHJhZHlEZXRhaWwpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcyhcIndpZHRoXCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkVWhyYWR5RHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFByaXBhZFVocmFkeURldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogXCJjX3VociwgZGF0X3VoclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmluZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IERkcC5XZWJDbGllbnQuQ29tbW9uLkdyaWRGb3JtYXRzLlVocmFkeVByaXBhZHVTYWxkYSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gdnl0dm/FmWVuw60gZG9kYXRlxI1uw71jaCBwb2zDrcSNZWsgdiBobGF2acSNY2UgcMWZaSBwxZlldm9kdVxyXG4gICAgICAgICAqIDEtcMWZZXZvZCBrIGV4ZWt1Y2ksIDItcMWZZXZvZCBrIGluc29sdmVuY2ksIDMtcMWZZXZvZCBuYSBwb2Ryb3p2YWh1LCA0LXDFmWVzdW4sIDUtcMWZZXZvZCBrIHZ5bcOhaMOhbsOtIGNlbG7DrW11IMO6xZlhZHUsIChEZWZhdWx0IC0gMCAtIHpvYnJhemVuw60gVnltw6FoYWPDrWhvIHNhbGRhIGRsZSBExZgpXHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVGb3JtUHJldm9kKClcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm1QcmV2b2QoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQuWnB1c29iUHJldm9kdSA9PSAwKSByZXR1cm47IC8vIFDFmWkgem9icmF6ZW7DrSBWeW3DoWhhY8OtaG8gc2FsZGEgZGxlIETFmCBzZSBtZXRvZGEgdWtvbsSNw60gYSB2eXR2w6HFmWVuw60gZm9ybXVsw6HFmWUgdsWvYmVjIG5lemHEjW5lXHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5acHVzb2JQcmV2b2R1ID09IDk5KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJldm9keUZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcInByZXZvZERsdWh1Rm9ybVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0xMi0xMi0wLCBNLTEyLTEyLTAsIFMtMTItMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSB2em5pa3VcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3Z6bmlrdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJ2YWxpZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcHBpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uIChNeVZhbHVlLCBzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbDogYm9vbGVhbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHR4dDogc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdmFsLCB0eHRdID0gdGhhdC51cGRhdGVEYXRWem5pa3VQcmV2b2REbHVodShNeVZhbHVlISk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JUeXBlID0gXCJlcnJvclwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gdHh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wcGluZyA9IHRydWU7IC8vIGV2aWRlbmNlIGJ1ZGUgemFrw6F6w6FuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlDFmWVicmF0IHogcMWvdm9kbsOtIHBvaGxlZMOhdmt5XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTJcIiwgeyAvLyBcInctMTJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibV9iS29waXJvdmF0U3Bpc3lcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlZhemJ1IG5hIHNwaXN5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1fYktvcGlyb3ZhdFBpc2Vtbm9zdGlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlZhemJ1IHDDrXNlbW5vc3TDrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtX2JLb3Bpcm92YXRQb3Bpc3lcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlBvcGlzIHDFmcOtcGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtX2JLb3Bpcm92YXRQb3puYW1reVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUG96bsOhbWt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1fYlByZXZlc3REb3RjZW5lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJEb3TEjWVuw6kgc3ViamVrdHlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGxldCBmb3JtX3ByZXZvZERsdWh1Rm9ybSA9ICQubmV3RGl2KFwiR1NhbGRhVnltRHJGb3JtUHJldm9keURpdlwiKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBwcmV2b2R5Rm9ybSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciB0eXBQaGxDYXB0aW9uID0gXCJcIjtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGF0LlpwdXNvYlByZXZvZHUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTogdHlwUGhsQ2FwdGlvbiA9IFwiVHlwIHBvaGxlZMOhdmt5IC0gZXhla3VjZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOiB0eXBQaGxDYXB0aW9uID0gXCJUeXAgcG9obGVkw6F2a3kgLSBpbnNvbHZlbmNlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6IHR5cFBobENhcHRpb24gPSBcIlR5cCBwb2hsZWTDoXZreSAtIHBvZHJvenZhaGFcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogdHlwUGhsQ2FwdGlvbiA9IFwiVHlwIHBvaGxlZMOhdmt5XCI7IC8vIC0gcMWZZXZvZFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiB0eXBQaGxDYXB0aW9uID0gXCJUeXAgcG9obGVkw6F2a3kgLSBjZWxuw60gw7rFmWFkXCI7IC8vIC0gcMWZZXZvZFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgcHJldm9keUZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcInByZXZvZEZvcm1cIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0xUzEsIEwtMTItMTItMCwgTS0xMi0xMi0wLCBTLTEyLTEyLTBcIiB9KSAvLyBMMk0yUzFcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJLbmloYVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwgUHJlZmFicy5TZWxlY3Qua25paGEoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwX2RlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4cF9kZW49dmFsdWUuaXhwX2RlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFJhZGVrQ3R2cnRQcmlwYWR5RmlsdGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3codHlwUGhsQ2FwdGlvbiArIFwiRGF0dW0gdnpuaWt1XCIpIC8vIFR5cCBwb2hsZWTDoXZreVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctNlwiLCBQcmVmYWJzLlNlbGVjdC50eXBQb2hsZWRhdmt5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9waGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX3BobD12YWx1ZS50eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFJhZGVrQ3R2cnRQcmlwYWR5RmlsdGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF92em5pa3VcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC51cGRhdGVEYXRWem5pa3UoaW5wdXQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInZhbGlkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcHBpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKE15VmFsdWUsIHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWw6IGJvb2xlYW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHR4dDogc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt2YWwsIHR4dF0gPSB0aGF0LnVwZGF0ZURhdFZ6bmlrdShNeVZhbHVlISk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yVHlwZSA9IFwiZXJyb3JcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gdHh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BwaW5nID0gdHJ1ZTsgLy8gZXZpZGVuY2UgYnVkZSB6YWvDoXrDoW5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUMWZw61wYWR5IHBvcGxhdG7DrWthXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMlwiLCBQcmVmYWJzLlNlbGVjdC5wcmlwYWR5RXN1TGsoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpcEVzdVwiLCAvL1RPRE86IG7DoXpldlxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHA9dmFsdWUuaXhwLG1vZGVkLnZzPXZhbHVlLnZzLG1vZGVsLm5hemV2PXZhbHVlLm5hemV2XCIsIC8vIG1vZGVsLml4cF9kZW49dmFsdWUuaXhwX2Rlbixtb2RlbC50eXBfcGhsPXZhbHVlLnR5cF9waGxcclxuICAgICAgICAgICAgICAgICAgICAvL2NoYW5nZTogKCkgPT4geyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIsWYw6FkZWssxIx0dnLFpVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctNlwiLCBQcmVmYWJzLlNlbGVjdC5jaXNlbG5pa1JhZGt1KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRkcF9yYWRla1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4cF9kZW49dmFsdWUuaXhwX2Rlbixtb2RlbC50eXBfcGhsPXZhbHVlLnR5cF9waGwsbW9kZWwuZGRwX3JhZGVrPXZhbHVlLmRkcF9yYWRla1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXJzOiB7fSxcclxuICAgICAgICAgICAgICAgICAgICAvL2NoYW5nZTogKCkgPT4geyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctNlwiLCBQcmVmYWJzLlNlbGVjdC5jaXNlbG5pa0N0dnJ0aSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZHBfY3R2cnRcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHBfZGVuPXZhbHVlLml4cF9kZW4sbW9kZWwudHlwX3BobD12YWx1ZS50eXBfcGhsLG1vZGVsLmRkcF9jdHZydD12YWx1ZS5kZHBfY3R2cnRcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyczoge30sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jaGFuZ2U6ICgpID0+IHsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibV9iUHJldnppdFJDXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUMWZZXZ6w610IFLEjCBkbyBuw6FocmFkbsOtaG8gVlNcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1fYlByZXZ6aXRWc0RvU3NcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQxZlldnrDrXQgVlMgZG8gU1NcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1fYlByZXZ6aXRQcmlVaHJaUGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUMWZZWLDrXJhdCBwcmlvcml0dSDDumhyYWR5IHogbmFzdGF2ZW7DrSB0eXB1IHBvaGxlZMOhdmt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtX2JQb3V6ZVZ5bVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlDFmWV2w6lzdCBwb3V6ZSB2eW3DoWhhbsOpIHDFmWVkcGlzeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vdmFyIHByZWJyYXRGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMC0xMi0wLCBNLTAtMTItMCwgUy0wLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJQxZllYnJhdCB6IHDFr3ZvZG7DrSBwb2hsZWTDoXZreVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTJcIiwgeyAvLyBcInctMTJcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1fYktvcGlyb3ZhdFNwaXN5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVmF6YnUgbmEgc3Bpc3lcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibV9iS29waXJvdmF0UGlzZW1ub3N0aVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlZhemJ1IHDDrXNlbW5vc3TDrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtX2JLb3Bpcm92YXRQb3Bpc3lcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQb3BpcyBwxZnDrXBhZHVcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibV9iS29waXJvdmF0UG96bmFta3lcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQb3puw6Fta3lcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibV9iUHJldmVzdERvdGNlbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJEb3TEjWVuw6kgc3ViamVrdHlcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBsZXQgZm9ybV9wcmV2b2R5Rm9ybSA9ICQubmV3RGl2KFwiR1NhbGRhVnltRHJGb3JtUHJldm9keURpdlwiKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBwcmV2b2R5Rm9ybSk7XHJcbiAgICAgICAgICAgIC8vbGV0IGZvcm1fcHJlYnJhdEZvcm0gPSAkLm5ld0RpdihcIkdTYWxkYVZ5bURyRm9ybVByZWJyYXREaXZcIikuYXBwZW5kVG8odGhhdC5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgcHJlYnJhdEZvcm0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvbiBTIEUgUyBUIEEgViBFIE4gw40gICBPIEsgTiBBXHJcbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgLy8jcmVnaW9uIE0gRSBEIE8gVCBZICBBICBGIFUgTiBLIEMgRVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIG5hxI10ZW7DrSB6w6FrbGFkbsOtaG8gb2JzYWh1IG9rbmFcclxuICAgICAgICAgKiBAbWV0aG9kIG5hY3RpVWhyYWR5KClcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG5hY3RpVWhyYWR5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGxldCBkYXRfb2Q6IERhdGUgPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcImRhdF9vZFwiKS5nZmllbGQ8RGF0ZT4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgbGV0IGRhdF9kbzogRGF0ZSA9IHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiZGF0X2RvXCIpLmdmaWVsZDxEYXRlPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQgbmFwb2plbmVGaWVsZDogYm9vbGVhbiA9IHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwibmFwb2plbmVcIikuZ2ZpZWxkPGJvb2xlYW4+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGxldCBqZW5OZXVocmF6ZW5lOiBib29sZWFuID0gdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJqZW5OZXVocmF6ZW5lXCIpLmdmaWVsZDxib29sZWFuPihcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5OYXN0YXZEb3N0dXBub3N0QWtjZShmYWxzZSk7IC8vLS0tLS0gWmHEjcOtbsOhIG5hxI3DrXTDoW7DqSA9PiBEZWF0a2l2dWp1IHVrbMOhZMOhbsOtXHJcbiAgICAgICAgICAgIHRoYXQudmlld1ByaXBhZFVocmFkeSA9IG5ldyBJc2wuVmlldyh0aGF0LmlzbC5QcmlwYWRVaHJhZHkubGlzdChycSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiB0aGF0Lkl4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFwb2plbmU6IG5hcG9qZW5lRmllbGQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGplbk5ldWhyYXplbmU6IGplbk5ldWhyYXplbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcG9jaXRhdFNhbGRvOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB0aGF0LmdyaWRQcmlwYWRVaHJhZHkuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlld1ByaXBhZFVocmFkeSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmlzbC5TYWxkYS5zdGF2UHJpcGFkdSh7IGl4cERkcDogdGhhdC5JeHAsIG5hcG9qZW5lOiBuYXBvamVuZUZpZWxkfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmFwb2pGaWVsZCA9IHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwicHJlcGxhdGVrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGF2ID0gbmV3IERlY2ltYWwoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXYubGVzc1RoYW4oMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3Q2FzdGt5WzBdLnByZXBsYXRlayA9IERlY2ltYWwuYWJzKHN0YXYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWRTYWxkYVZ5bURyQ2FzdGt5LmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXdDYXN0a3kpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAobmFwb2plbmVGaWVsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWRTYWxkYVZ5bURyQ2FzdGt5LmZpbmQoXCIuZ3JpZC1jYXB0aW9ucyAuY2VsbC5jNCAuY2FwdGlvblwiKS50ZXh0KFwiUMWZZXBsYXRlayB2xI0uIG5hcG9qLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWRTYWxkYVZ5bURyQ2FzdGt5LmZpbmQoXCIuZ3JpZC1jYXB0aW9ucyAuY2VsbC5jNCAuY2FwdGlvblwiKS50ZXh0KFwiUMWZZXBsYXRla1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQudmlld1ByaXBhZFVocmFkeS5nZXRMb2FkaW5nUHJvbWlzZSgpLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvbG96a3kgPSB0aGF0LnZpZXdQcmlwYWRVaHJhZHkuZ2V0RGF0YVJvd3MoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdkludGVydmFsdSA9IHBvbG96a3lcclxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkID0gbmV3IERhdGUoYS5kYXRfc3BsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICghZGF0X29kIHx8IGQgPj0gZGF0X29kKSAmJiAoIWRhdF9kbyB8fCBkIDw9IGRhdF9kbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJlZEludGVydmFsZW1EYXRhUm93cyA9IHBvbG96a3lcclxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGRhdF9vZCAhPT0gbnVsbCkgJiYgbmV3IERhdGUoYS5kYXRfc3BsKSA8IGRhdF9vZDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcHJlZHBpc3lDZWxrZW06IERlY2ltYWwgPSBwb2xvemt5LnJlZHVjZSgoYWNjOiBEZWNpbWFsLCBjdXJyKSA9PiBhY2MucGx1cyhuZXcgRGVjaW1hbChjdXJyLmMpKSwgbmV3IERlY2ltYWwoMCkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHVocmF6ZW5vQ2Vsa2VtOiBEZWNpbWFsID0gcG9sb3preS5yZWR1Y2UoKGFjYzogRGVjaW1hbCwgY3VycikgPT4gYWNjLnBsdXMobmV3IERlY2ltYWwoY3Vyci5jX3VocikpLCBuZXcgRGVjaW1hbCgwKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGx1aENlbGtlbTogRGVjaW1hbCA9IHBvbG96a3kucmVkdWNlKChhY2M6IERlY2ltYWwsIGN1cnIpID0+IGFjYy5wbHVzKG5ldyBEZWNpbWFsKGN1cnIuY19kbHVoKSksIG5ldyBEZWNpbWFsKDApKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcG9jYXRlY25pU3RhdjogRGVjaW1hbCA9IHByZWRJbnRlcnZhbGVtRGF0YVJvd3MucmVkdWNlKChhY2M6IERlY2ltYWwsIGN1cnIpID0+IGFjYy5wbHVzKG5ldyBEZWNpbWFsKGN1cnIuY19kbHVoKSksIG5ldyBEZWNpbWFsKDApKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcHJlZHBpc3k6IERlY2ltYWwgPSB2SW50ZXJ2YWx1LnJlZHVjZSgoYWNjOiBEZWNpbWFsLCBjdXJyKSA9PiBhY2MucGx1cyhuZXcgRGVjaW1hbChjdXJyLmMpKSwgbmV3IERlY2ltYWwoMCkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHVocmF6ZW5vOiBEZWNpbWFsID0gdkludGVydmFsdS5yZWR1Y2UoKGFjYzogRGVjaW1hbCwgY3VycikgPT4gYWNjLnBsdXMobmV3IERlY2ltYWwoY3Vyci5jX3VocikpLCBuZXcgRGVjaW1hbCgwKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGx1aDogRGVjaW1hbCA9IHZJbnRlcnZhbHUucmVkdWNlKChhY2M6IERlY2ltYWwsIGN1cnIpID0+IGFjYy5wbHVzKG5ldyBEZWNpbWFsKGN1cnIuY19kbHVoKSksIG5ldyBEZWNpbWFsKDApKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnZpZXdDYXN0a3lbMF0ucG9jX3N0YXYgPSBwb2NhdGVjbmlTdGF2O1xyXG4gICAgICAgICAgICAgICAgdGhhdC52aWV3Q2FzdGt5WzBdLnByZWRwaXN5ID0gcHJlZHBpc3k7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnZpZXdDYXN0a3lbMF0udWhyYXplbm8gPSB1aHJhemVubztcclxuICAgICAgICAgICAgICAgIHRoYXQudmlld0Nhc3RreVswXS5kbHVoID0gZGx1aDtcclxuICAgICAgICAgICAgICAgIHRoYXQudmlld0Nhc3RreVsxXS5wcmVkcGlzeSA9IHByZWRwaXN5Q2Vsa2VtO1xyXG4gICAgICAgICAgICAgICAgdGhhdC52aWV3Q2FzdGt5WzFdLnVocmF6ZW5vID0gdWhyYXplbm9DZWxrZW07XHJcbiAgICAgICAgICAgICAgICB0aGF0LnZpZXdDYXN0a3lbMV0uZGx1aCA9IGRsdWhDZWxrZW1cclxuICAgICAgICAgICAgICAgIHRoYXQuZ3JpZFNhbGRhVnltRHJDYXN0a3kuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlld0Nhc3RreSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdkRvc3R1cG5vc3RBa2NlKHRydWUpOyAvLy0tLS0tIFNrb27EjWlsbyBuYcSNw610w6Fuw6kgPT4gQXRraXZ1anUgdWtsw6Fkw6Fuw61cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIE5hc3RhdkRvc3R1cG5vc3RBa2NlKGluVmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LlpwdXNvYlByZXZvZHUgPT0gMCkgeyAvLyBBS0NFIE9LL1NBVkUgenJ1xaFlbsOtIHYgcmXFvmltdSB6b2JyYXplbsOtIFNhbGRhID0pXHJcbiAgICAgICAgICAgICAgICBjb25zdCBub1Zpc2libGVTYXZlOiBHb3JkaWMuR2VuZXJhbC5BcHBsaWNhdGlvbkludGVyZmFjZS5HUGVybWlzc2lvbiA9IHsgdmlzaWJsZTogZmFsc2UsIHZhbHVlOiBmYWxzZSwgbWVzc2FnZTogXCJWIHRvbXRvIHJlxb5pbXUgcHJvaGzDrcW+ZW7DrSBuZW7DrSBjbyB1bG/Fvml0LlwiIH1cclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RTYXZlIS51cGRhdGVQZXJtaXNzaW9uKG5vVmlzaWJsZVNhdmUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGF0LlpwdXNvYlByZXZvZHUgPT0gOTkpIHsgLy8gQUtDRSBUSVNLIHpydcWhZW7DrSB2IHJlxb5pbXUgcMWZZXZvZHUgZGx1aHUgPSlcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5vVmlzaWJsZVRpc2s6IEdvcmRpYy5HZW5lcmFsLkFwcGxpY2F0aW9uSW50ZXJmYWNlLkdQZXJtaXNzaW9uID0geyB2aXNpYmxlOiBmYWxzZSwgdmFsdWU6IGZhbHNlLCBtZXNzYWdlOiBcIlYgdG9tdG8gcmXFvmltdSBuZW7DrSBjbyB0aXNrbm91dC5cIiB9XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VGlzayEudXBkYXRlUGVybWlzc2lvbihub1Zpc2libGVUaXNrKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcGVybVZhbHVlOiBHb3JkaWMuR2VuZXJhbC5BcHBsaWNhdGlvbkludGVyZmFjZS5HUGVybWlzc2lvbjtcclxuICAgICAgICAgICAgaWYgKCFpblZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBwZXJtVmFsdWUgPSB7IHZpc2libGU6IHRydWUsIHZhbHVlOiBmYWxzZSwgbWVzc2FnZTogXCJOYcSNw610w6Fqw60gc2UgxI3DoXN0a3kuLi4hXCIgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGVybVZhbHVlID0geyB2aXNpYmxlOiB0cnVlLCB2YWx1ZTogdHJ1ZSwgbWVzc2FnZTogdW5kZWZpbmVkIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0U2F2ZSEudXBkYXRlUGVybWlzc2lvbihwZXJtVmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogTWV0b2RhIHBybyBuYXN0YXZlbsOtIHRpc2t1IFNhbGRhIFZ5bSBExZhcclxuICAgICAgICAgKiBAbWV0aG9kIHRpc2t5RG9rbGFkdSgpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB0aXNrRG9rbGFkdVNhbGRhRHIoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGxldCBkYXRfb2Q6IERhdGUgPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcImRhdF9vZFwiKS5nZmllbGQ8RGF0ZT4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgbGV0IGRhdF9kbzogRGF0ZSA9IHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiZGF0X2RvXCIpLmdmaWVsZDxEYXRlPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQgbmFwb2plbmU6IGJvb2xlYW4gPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcIm5hcG9qZW5lXCIpLmdmaWVsZDxib29sZWFuPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQgamVuTmV1aHJhemVuZTogYm9vbGVhbiA9IHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiamVuTmV1aHJhemVuZVwiKS5nZmllbGQ8Ym9vbGVhbj4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgLy9sZXQgcG9jX3N0YXYgPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcInBvY19zdGF2XCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAvL2xldCBwcmVkcGlzeSA9IHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwicHJlZHBpc3lcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIC8vbGV0IHByZWRwaXN5Q2Vsa2VtID0gdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJwcmVkcGlzeUNlbGtlbVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgLy9sZXQgdWhyYXplbm8gPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcInVocmF6ZW5vXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAvL2xldCB1aHJhemVub0NlbGtlbSA9IHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwidWhyYXplbm9DZWxrZW1cIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIC8vbGV0IGRsdWggPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcImRsdWhcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIC8vbGV0IGRsdWhDZWxrZW0gPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcImRsdWhDZWxrZW1cIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIC8vbGV0IHByZXBsYXRlayA9IHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwicHJlcGxhdGVrXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYWN0VGlza0Rva2xhZHVTYWxkYURyID0gR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFRpc2tTYWxkYURyXCIsXHJcbiAgICAgICAgICAgICAgICB0ZW1hOiBcImRkcF9wdG1fc2FsZHJcIiwgXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0RkcFdlYlRpc2s6U2FsZGFEclwiLFxyXG4gICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHRoYXQuSXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXR1bU9kOiBkYXRfb2QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdHVtRG86IGRhdF9kbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFwb2plbm86IG5hcG9qZW5lID8gMSA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldWhyYXplbmU6IGplbk5ldWhyYXplbmUgPyAxIDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9jX3N0YXY6IHRoYXQudmlld0Nhc3RreVswXS5wb2Nfc3RhdiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWRwaXN5OiB0aGF0LnZpZXdDYXN0a3lbMF0ucHJlZHBpc3ksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVkcGlzeUNlbGtlbTogdGhhdC52aWV3Q2FzdGt5WzFdLnByZWRwaXN5LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWhyYXplbm86IHRoYXQudmlld0Nhc3RreVswXS51aHJhemVubywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVocmF6ZW5vQ2Vsa2VtOiB0aGF0LnZpZXdDYXN0a3lbMV0udWhyYXplbm8sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkbHVoOiB0aGF0LnZpZXdDYXN0a3lbMF0uZGx1aCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRsdWhDZWxrZW06IHRoYXQudmlld0Nhc3RreVsxXS5kbHVoLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlcGxhdGVrOiB0aGF0LnZpZXdDYXN0a3lbMF0ucHJlcGxhdGVrLCBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYWN0VGlza0Rva2xhZHVTYWxkYURyLnJ1bigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIEN5a2x1c1Rpc2t1KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC50aXNrRG9rbGFkdVByZXZvZCgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmNvbmZpcm0oXCJVcG96b3JuxJtuw61cIiwgXCJCeWwgdGlzayDDunNwxJvFoW7DvSBhIHDFmWVqZXRlIHNpIG9rbm8gemF2xZnDrXQ/XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldix2YWxSZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWxSZXQgPT0gXCJub1wiKSB0aGF0LkN5a2x1c1Rpc2t1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHRoYXQuY2xvc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKiBNZXRvZGEgcHJvIG5hc3RhdmVuw60gdGlza3UgcMWZw60gcMWZZXZvZHUgcG9obGVkw6F2a3lcclxuICAgICAgICAgKiBAbWV0aG9kIHRpc2tEb2tsYWR1UHJldm9kKClcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHRpc2tEb2tsYWR1UHJldm9kKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKSAgICAgXHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoYXQuZmluZEZvcm1zKCkuZ2Zvcm0oXCJpc1ZhbGlkXCIpKSByZXR1cm4gZGVmLnJlamVjdCgpLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkYXRfb2Q6IERhdGUgPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcImRhdF9vZFwiKS5nZmllbGQ8RGF0ZT4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgbGV0IHR5cF9waGxfZmllbGQgPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcInR5cF9waGxcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWRhdF9vZCkgcmV0dXJuIGRlZi5yZWplY3QoXCJOZW7DrSB2eXBsbsSbbsOpIGRhdHVtIG9kXCIpLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0eXBQcmV2b2R1TnVtOiBudW1iZXI7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhhdC5acHVzb2JQcmV2b2R1KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6IHR5cFByZXZvZHVOdW0gPSAyXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6IHR5cFByZXZvZHVOdW0gPSAzXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6IHR5cFByZXZvZHVOdW0gPSA0XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IHR5cFByZXZvZHVOdW0gPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IHR5cFByZXZvZHVOdW0gPSA1XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCByb3dzID0gdGhpcy5ncmlkUHJpcGFkVWhyYWR5LmdncmlkPERkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWRVaHJhZHlEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBsZXQgc3VtYTogRGVjaW1hbCA9IG5ldyBEZWNpbWFsKDApO1xyXG5cclxuICAgICAgICAgICAgcm93cy5mb3JFYWNoKCh4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeC5jKSBzdW1hID0gc3VtYS5wbHVzKHguYyk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBjb25zdCBhY3RUaXNrRG9rbGFkdVByZXZvZCA9IEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrUHJldm9kXCIsXHJcbiAgICAgICAgICAgICAgICB0ZW1hOiBcImRkcF9wdG1fcHJlZHBobFwiLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEZHBXZWJUaXNrOlByZXZvZFBvaGxlZGF2a3lcIixcclxuICAgICAgICAgICAgICAgIHJlcG9ydFN0YXJ0aW5nOiBmdW5jdGlvbiAocmVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhwX25vdnk6IHRoYXQuTmV3SXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiB0eXBfcGhsX2ZpZWxkPy50eXBfcGhsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXpldjogdHlwX3BobF9maWVsZD8ubmF6ZXYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdHVtT2Q6IGRhdF9vZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiB0aGF0Lkl4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgenB1c29iOiB0eXBQcmV2b2R1TnVtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVkcGlzeTogdGhhdC52aWV3Q2FzdGt5WzBdLnByZWRwaXN5LFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICByZXBvcnRGaW5pc2hlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRpYWxvZ0Nsb3NlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhY3RUaXNrRG9rbGFkdVByZXZvZC5ydW4oKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHZ5dHZvxZllbsOtIHBvZG3DrW7Em27DqWhvIGZvcm3DoXRvdsOhbsOtIGdyaWR1IC0+IGNvbmRGb3JtYXR1IFxyXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlQ29uZEZvcm1hdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29uZEZvcm1hdHMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0dW1PZDogc3RyaW5nID0gdGhhdC5EYXR1bU9kID8gdGhhdC5EYXR1bU9kLnRvRGF0ZVN0cmluZygpIDogXCJcIjtcclxuICAgICAgICAgICAgdmFyIGRhdHVtRG86IHN0cmluZyA9IHRoYXQuRGF0dW1EbyA/IHRoYXQuRGF0dW1Eby50b0RhdGVTdHJpbmcoKSA6IFwiXCI7XHJcblxyXG4gICAgICAgICAgICB2YXIgaW50ZXJ2YWxGb3JtdWxhID0gYFxyXG4gICAgICAgICAgICBJRigoXHJcbiAgICAgICAgICAgICAgICBOT1QoRVFVQUxTKFxcXCJ7MH1cXFwiLCBcXFwiXFxcIikpXHJcbiAgICAgICAgICAgICAgICBhbmQgXHJcbiAgICAgICAgICAgICAgICBEQVRFRElGRihAZGF0X3NwbCwgXFxcInswfVxcXCIpIDwgMFxyXG4gICAgICAgICAgICApb3IoXHJcbiAgICAgICAgICAgICAgICBOT1QoRVFVQUxTKFxcXCJ7MX1cXFwiLCBcXFwiXFxcIikpXHJcbiAgICAgICAgICAgICAgICBhbmQgXHJcbiAgICAgICAgICAgICAgICBEQVRFRElGRihAZGF0X3NwbCwgXFxcInsxfVxcXCIpID4gMFxyXG4gICAgICAgICAgICApLCB0cnVlLCBmYWxzZSwgZmFsc2UpYFxyXG4gICAgICAgICAgICAgICAgLmZvcm1hdChkYXR1bU9kLCBkYXR1bURvKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQubWFpbkNvbmRGb3JtYXRzID0gWyAvLyEhISBQb2t1ZCBieSBzZSBtxJtuaWxvIHBvxZlhZMOtLCBqZSBwb3TFmWViYSB1cHJhdml0IGkgbWV0b2R1IHNldFByaWZpbGVDb25kRm9ybWF0KClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJJbnRlcnZhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZm9ybXVsYTogXCJJRihEQVRFRElGRihAZGF0X3NwbCwgREFURVZBTFVFKFxcXCJ7MH1cXFwiKSkgPCAwIG9yIERBVEVESUZGKEBkYXRfc3BsLCBEQVRFVkFMVUUoXFxcInsxfVxcXCIpKSA+IDAsIHRydWUsIGZhbHNlLCBmYWxzZSlcIi5mb3JtYXQodGhhdC5EYXRPZFRleHQsIHRoYXQuRGF0RG9UZXh0KSxcclxuICAgICAgICAgICAgICAgICAgICBmb3JtdWxhOiBpbnRlcnZhbEZvcm11bGEsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5ncmF5LFxyXG4gICAgICAgICAgICAgICAgICAgIGJnOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRCZy5saWdodGdyYXlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiWmFwbGFjZW5vIHBvIHNwbGF0bm9zdGlcIixcclxuICAgICAgICAgICAgICAgICAgICBhcHBseVRvOiBcInphcGxhY2Vub19wb19zcGxhdG5vc3RpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybXVsYTogXCJAemFwbGFjZW5vX3BvX3NwbGF0bm9zdGk+MFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQucmVkXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRsdWhcIixcclxuICAgICAgICAgICAgICAgICAgICBhcHBseVRvOiBcImNfZGx1aFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm11bGE6IFwiSUYoKE5PVChFUVVBTFMoXFxcInswfVxcXCIsIFxcXCJcXFwiKSkgYW5kIERBVEVESUZGKEBkYXRfc3BsLCBcXFwiezB9XFxcIikgPiAwKSBhbmQgQGNfZGx1aCE9MCwgdHJ1ZSwgZmFsc2UsIGZhbHNlKVwiLmZvcm1hdChkYXR1bU9kKSxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LnJlZFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJOYXBvamVuw70gcMWZw61wYWRcIixcclxuICAgICAgICAgICAgICAgICAgICBhcHBseVRvOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm11bGE6IFwiTk9UKEVRVUFMUyhAaXhwLFxcXCJ7MH1cXFwiKSlcIi5mb3JtYXQodGhhdC5JeHApLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0YWxpYzogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vIFN0YXLDvSB6YWtvbWVudG92YW7DvSBmb3Jtw6F0IGRsZSBHU2FsZG9WeW1EUkNvbnRyb2wuY3NcclxuICAgICAgICAgICAgICAgIC8vSWYgY29sX2NfemJ5dmEhPTAgQU5EIGNvbF9kYXRfc3BsLkRhdHVtKCk+ZGZfZGF0X29kLkRhdHVtKClcclxuICAgICAgICAgICAgICAgIC8vICAgIENhbGwgU2FsVGJsU2V0Q2VsbFRleHRDb2xvciggdGJsX3Nlem5hbS5jb2xfY196Ynl2YSwgQ09MT1JfUmVkLFRSVUUpICAgIFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyBuYXN0YXZlbsOtIGNvbmRGb3JtYXR1IHDFmWkgem3Em27EmyBkYXR1bXVcclxuICAgICAgICAgKiBAbWV0aG9kIHNldFByaWZpbGVDb25kRm9ybWF0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRQcmlmaWxlQ29uZEZvcm1hdCgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlQ29uZEZvcm1hdHMoKTtcclxuICAgICAgICAgICAgLy8gWsOtc2vDoW0gcHJvZmlsXHJcbiAgICAgICAgICAgIGNvbnN0IHByb2ZpbGUgPSB0aGF0LmdyaWRQcmlwYWRVaHJhZHkuZ2dyaWQoXCJnZXRDdXJyZW50UHJvZmlsZVwiKTsgLy8gYXMgR3JpZFByb2ZpbGU8YW55PjtcclxuXHJcbiAgICAgICAgICAgIC8vIFphamlzdMOtbSwgxb5lIGNvbmRGb3JtYXRzIG5lbsOtIG51bGwvdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIHByb2ZpbGUuY29uZEZvcm1hdHMgPSBwcm9maWxlLmNvbmRGb3JtYXRzID8/IFtdO1xyXG5cclxuICAgICAgICAgICAgLy8gTmFqZHUgaW5kZXggcHJ2a3UgcyBkZXNjcmlwdGlvbiA9PT0gXCJJbnRlcnZhbFwiIGEgXCJEbHVoXCJcclxuICAgICAgICAgICAgY29uc3QgaW5kZXhJbiA9IHByb2ZpbGUuY29uZEZvcm1hdHMuZmluZEluZGV4KGNmID0+IGNmLmRlc2NyaXB0aW9uID09PSB0aGF0Lm1haW5Db25kRm9ybWF0c1swXS5kZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4RGwgPSBwcm9maWxlLmNvbmRGb3JtYXRzLmZpbmRJbmRleChjZiA9PiBjZi5kZXNjcmlwdGlvbiA9PT0gdGhhdC5tYWluQ29uZEZvcm1hdHNbMl0uZGVzY3JpcHRpb24pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGluZGV4SW4gPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gcHJ2ZWsgZXhpc3R1amUg4oaSIHVwcmF2w61tIGplaG8gZm9ybXVseVxyXG4gICAgICAgICAgICAgICAgcHJvZmlsZS5jb25kRm9ybWF0c1tpbmRleEluXS5mb3JtdWxhID0gdGhhdC5tYWluQ29uZEZvcm1hdHNbMF0uZm9ybXVsYTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIHBydmVrIG5lZXhpc3R1amUg4oaSIHDFmWlkw6FtIG5vdsO9XHJcbiAgICAgICAgICAgICAgICBwcm9maWxlLmNvbmRGb3JtYXRzLnB1c2godGhhdC5tYWluQ29uZEZvcm1hdHNbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpbmRleERsID49IDApIHtcclxuICAgICAgICAgICAgICAgIC8vIHBydmVrIGV4aXN0dWplIOKGkiB1cHJhdsOtbSBqZWhvIGZvcm11bHlcclxuICAgICAgICAgICAgICAgIHByb2ZpbGUuY29uZEZvcm1hdHNbaW5kZXhEbF0uZm9ybXVsYSA9IHRoYXQubWFpbkNvbmRGb3JtYXRzWzJdLmZvcm11bGE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBwcnZlayBuZWV4aXN0dWplIOKGkiBwxZlpZMOhbSBub3bDvVxyXG4gICAgICAgICAgICAgICAgcHJvZmlsZS5jb25kRm9ybWF0cy5wdXNoKHRoYXQubWFpbkNvbmRGb3JtYXRzWzJdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTmFrb25lYyBhcGxpa3VqaSBwcm9maWwgenDEm3QgbmEgZ3JpZFxyXG4gICAgICAgICAgICB0aGF0LmdyaWRQcmlwYWRVaHJhZHkuZ2dyaWQoXCJ1c2VQcm9maWxlXCIsIHByb2ZpbGUpOyAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHDFmWkgem3Em25lIERhdHVtxa8gT2QvRG9cclxuICAgICAgICAgKiBAbWV0aG9kIHptZW5hRGF0dW1PZERvKClcclxuICAgICAgICAgKiBAcGFyYW0gaW5wdXREYXRlIERhdHVtIHrDrXNrw6FuZSB6IHBvbMOtxI1rYVxyXG4gICAgICAgICAqIEBwYXJhbSB0eXAgVHlwIHBvbMOtxI1rYTogMCAtIERhdHVtIE9kIHwgMSAtIERhdG9tIERvXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB6bWVuYURhdHVtT2REbyhpbnB1dERhdGU6IERhdGUgfCBudWxsLCB0eXA6IG51bWJlcikge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5zZXRUaXNrRW5hYmxlZCgpXHJcbiAgICAgICAgICAgIGlmIChpbnB1dERhdGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0eXApIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuRGF0dW1PZCA9IG5ldyBEYXRlKGlucHV0RGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5EYXR1bURvID0gbmV3IERhdGUoaW5wdXREYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldFByaWZpbGVDb25kRm9ybWF0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhhdC5uYWN0aVVocmFkeSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIFprb250cm9sdWplIHpkYSBqZSBuYXN0YXZlbm8gZGF0dW0gb2QvZG8gYSBwb2RsZSB0b2hvIHpha3Rpdm7DrS96bmVha3Rpdm7DrSBha2NpIFRJU0sgXHJcbiAgICAgICAgICogQG1ldGhvZCBzZXRUaXNrRW5hYmxlZCgpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRUaXNrRW5hYmxlZCgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LlpwdXNvYlByZXZvZHUgIT0gMCAmJiB0aGF0LlpwdXNvYlByZXZvZHUgIT0gOTkgKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGVybVRpc2s6IEdvcmRpYy5HZW5lcmFsLkFwcGxpY2F0aW9uSW50ZXJmYWNlLkdQZXJtaXNzaW9uID0geyB2aXNpYmxlOiB0cnVlLCB2YWx1ZTogdHJ1ZSB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRhdF9vZDogRGF0ZSA9IHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiZGF0X29kXCIpLmdmaWVsZDxEYXRlPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdF9kbzogRGF0ZSA9IHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiZGF0X2RvXCIpLmdmaWVsZDxEYXRlPihcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghZGF0X29kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVybVRpc2sudmFsdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBwZXJtVGlzay5tZXNzYWdlID0gXCJOZW7DrSB2eXBsbsSbbm8gRGF0dW0gT2RcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghZGF0X2RvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVybVRpc2sudmFsdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBwZXJtVGlzay5tZXNzYWdlID0gXCJOZW7DrSB2eXBsbsSbbm8gRGF0dW0gRGRcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VGlzayEudXBkYXRlUGVybWlzc2lvbihwZXJtVGlzayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2V0RGVmYXVsdERhdGEoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5uYWN0aVVocmFkeSgpOyAvLyBOZWpwcnZlIHNpIG5hxI10dSB6w6FrbGFkbsOtIGRhdGEgcHJvIHbFoWVjaG55IHJlxb5pbXkgLCBwb3TDqSBwb2tyYcSNdWp1IGplbiBwxZlpIHDFmWV2b2RlY2hcclxuICAgICAgICAgICAgaWYgKHRoYXQuWnB1c29iUHJldm9kdSA9PSAwKSByZXR1cm47IC8vIFDFmWkgem9icmF6ZW7DrSBWeW3DoWhhY8OtaG8gc2FsZGEgZGxlIETFmCBzZSBtZXRvZGEgdWtvbsSNw60gYSB2eXR2w6HFmWVuw60gZm9ybXVsw6HFmWUgdsWvYmVjIG5lemHEjW5lXHJcbiAgICAgICAgICAgIGlmICh0aGF0LlpwdXNvYlByZXZvZHUgPT0gOTkpIHJldHVybjsgLy8gUMWZaSB6b2JyYXplbsOtIFZ5bcOhaGFjw61obyBzYWxkYSBkbGUgRMWYIHNlIG1ldG9kYSB1a29uxI3DrSBhIHZ5dHbDocWZZW7DrSBmb3JtdWzDocWZZSB2xa9iZWMgbmV6YcSNbmVcclxuXHJcbiAgICAgICAgICAgIC8vIE5hc3RhdmVuw60gcG9sw63EjWthIEtuaWh5IC0gSVhQIERFTlxyXG4gICAgICAgICAgICBpZiAodGhhdC5EZHBQYXJhbXMuZGRwX3JhZF96bWVrbmkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gIG1fY2JJeHBEZW4uU2V0VmFsaWREYXRhKFVzZXJQcm9jZXNzLkVrb1BhcmFtcy5JeHBEZW4pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiaXhwX2RlblwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsgaXhwX2RlbjogdGhhdC5JeHBEZW4gfSlcclxuICAgICAgICAgICAgICAgIHRoYXQuaXhwRGVuRmlsdGVyID0geyBpeHBfZGVuOiB0aGF0Lkl4cERlbiB9O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5peHBEZW5GaWx0ZXIgPSB7IGljbzogdGhhdC5JY28sIHVjczogdGhhdC5VY3MsIHJvazogdGhhdC5Sb2ssIGFrdGl2aXRhOiAxMDAsIGl4c19mdW46IHRoYXQuSXhzRnVuIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiaXhwX2RlblwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJzZXJ2ZXJGaWx0ZXJzXCIsIHRoYXQuaXhwRGVuRmlsdGVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE5hc3RhdmVuw60gZmlsdHJ1IHBvbMOtxI1rYSBUWVAgUEhMXHJcbiAgICAgICAgICAgIHRoYXQuc2V0VHlwUGhsRmlsdGVyKHRoYXQuSXhwRGVuKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LlR5cFBobEV4ZUlucyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJ0eXBfcGhsXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyB0eXBfcGhsOiB0aGF0LlR5cFBobEV4ZUlucyB9KVxyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwidHlwX3BobFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJkZHBfcmFkZWtcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7IGRkcF9yYWRlazogdGhhdC5QcmlwYWRQdXYuZGRwX3JhZGVrLCB0eXBfcGhsOiB0aGF0LlR5cFBobCwgaXhwX2RlbjogdGhhdC5JeHBEZW4gfSk7XHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImRkcF9jdHZydFwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsgZGRwX2N0dnJ0OiB0aGF0LlByaXBhZFB1di5kZHBfY3R2cnQsIHR5cF9waGw6IHRoYXQuVHlwUGhsLCBpeHBfZGVuOiB0aGF0Lkl4cERlbiB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuc2V0UmFkZWtDdHZydFByaXBhZHlGaWx0ZXIoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LkRkcFBhcmFtcy5kZHBfcmFkX3ptZWtuaSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJpeHBfZGVuXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpIC8vbV9jYkl4cERlbi5WaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LlBvdm9saXRTbHVjb3ZhbmkpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQucHJpcGFkeUVzdUZpbHRlciA9IHtcclxuICAgICAgICAgICAgICAgICAgICBpeHNfZXN1X3ByZXY6IHRoYXQuUHJpcGFkUHV2Lml4c19lc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICBla29fYWt0OiAxMDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInByaXBFc3VcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwic2VydmVyRmlsdGVyc1wiLCB0aGF0LnByaXBhZHlFc3VGaWx0ZXIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwicHJpcEVzdVwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgLy9tX3RiUHJpcGFkeUVTVS5WaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyBsX3ZlbGlrb3N0RXN1ID0gbV90YlByaXBhZHlFU1UuU2l6ZS5IZWlnaHQgKyBtX3RiUHJpcGFkeUVTVS5NYXJnaW4uQm90dG9tICsgbV90YlByaXBhZHlFU1UuTWFyZ2luLlRvcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRSYWRla0N0dnJ0UHJpcGFkeUZpbHRlcigpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkS25paGEgPSB0aGF0LmZpbmRGaWVsZHMoXCJpeHBfZGVuXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBmaWVsZFBvaGwgPSB0aGF0LmZpbmRGaWVsZHMoXCJ0eXBfcGhsXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBmaWVsZFByaXBhZHkgPSB0aGF0LmZpbmRGaWVsZHMoXCJwcmlwRXN1XCIpO1xyXG4gICAgICAgICAgICBjb25zdCBmaWVsZFJhZGVrID0gdGhhdC5maW5kRmllbGRzKFwiZGRwX3JhZGVrXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBmaWVsZEN0dnJ0ID0gdGhhdC5maW5kRmllbGRzKFwiZGRwX2N0dnJ0XCIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGl4cERlbiA9IGZpZWxkS25paGEuZ2ZpZWxkKFwiZ2V0VmFsdWVcIilcclxuICAgICAgICAgICAgbGV0IHR5cFBobCA9IGZpZWxkUG9obC5nZmllbGQoXCJnZXRWYWx1ZVwiKVxyXG5cclxuICAgICAgICAgICAgaWYgKGl4cERlbiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZFBvaGwuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBmaWVsZFBvaGwuZ2ZpZWxkKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZFBvaGwuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zZXRUeXBQaGxGaWx0ZXIoaXhwRGVuKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHR5cFBobCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnByaXBhZHlFc3VGaWx0ZXIudHlwX3BobCA9IHR5cFBobC50eXBfcGhsITtcclxuICAgICAgICAgICAgICAgIGZpZWxkUHJpcGFkeS5nZmllbGQoXCJvcHRpb25cIiwgXCJzZXJ2ZXJGaWx0ZXJzXCIsIHRoYXQucHJpcGFkeUVzdUZpbHRlcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBQaGwgPT0gbnVsbCB8fCBpeHBEZW4gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZmllbGRQcmlwYWR5LmdmaWVsZChcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICAgICAgZmllbGRSYWRlay5nZmllbGQoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgICAgIGZpZWxkQ3R2cnQuZ2ZpZWxkKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgICAgICBmaWVsZFByaXBhZHkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBmaWVsZFJhZGVrLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZmllbGRDdHZydC5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZmllbGRQcmlwYWR5LmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgZmllbGRSYWRlay5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGZpZWxkQ3R2cnQuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5yYWRla0N0dnJ0RmlsdGVyID0ge1xyXG4gICAgICAgICAgICAgICAgdHlwX3BobDogdHlwUGhsLnR5cF9waGwhLFxyXG4gICAgICAgICAgICAgICAgaXhwX2RlbjogaXhwRGVuLml4cF9kZW4hLFxyXG4gICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpZWxkUmFkZWsuZ2ZpZWxkKFwib3B0aW9uXCIsIFwic2VydmVyRmlsdGVyc1wiLCB0aGF0LnJhZGVrQ3R2cnRGaWx0ZXIpO1xyXG4gICAgICAgICAgICBmaWVsZEN0dnJ0LmdmaWVsZChcIm9wdGlvblwiLCBcInNlcnZlckZpbHRlcnNcIiwgdGhhdC5yYWRla0N0dnJ0RmlsdGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2V0VHlwUGhsRmlsdGVyKGl4cF9kZW4/OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vaWYgKCFpeHBfZGVuKSBpeHBfZGVuID0gdGhhdC5JeHBEZW47XHJcbiAgICAgICAgICAgIGlmICh0aGF0LlpwdXNvYlByZXZvZHUgPT0gNCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC50eXBQaGxGaWx0ZXIgPSB7IGl4c19mdW46IHRoYXQuSXhzRnVuLCBwb21vY25lUHJvUHJldm9kOiB0cnVlIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnR5cFBobEZpbHRlciA9IHtcclxuICAgICAgICAgICAgICAgICAgICAvL25lX2tlc292YXQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGhsX3Byb19yb2t5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvdm9sZW5lX3Byb19rbmlodTogaXhwX2RlbixcclxuICAgICAgICAgICAgICAgICAgICB0ZXN0X2tuaWhhX2Z1bmtjZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9tb2NuZVByb1ByZXZvZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuRGRwUGFyYW1zLmRkcF9waGxfcHJlb3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnR5cFBobEZpbHRlci5wb3ZvbGVuZV9wcm9fZnVua2NpID0gdGhhdC5JeHNGdW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwidHlwX3BobFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJzZXJ2ZXJGaWx0ZXJzXCIsIHRoYXQudHlwUGhsRmlsdGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdXBkYXRlRGF0VnpuaWt1KGRhdFZhbHVlOiBEYXRlIHwgbnVsbCk6IFtib29sZWFuLCBzdHJpbmddIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCB2YWxpZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZiAoZGF0VmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHR5cF9waGwgPSB0aGF0LmZpbmRGaWVsZHMoXCJ0eXBfcGhsXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cF9waGwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9IFwiRGF0dW0gdnpuaWt1IG5lbHplIHZhbGlkb3ZhdC4gTmVuw60gdnlicsOhbiBUeXAgcG9obGVkw6F2a3khXCI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsRGF0YVBobHpQb2xpY2thOiBkYXRhUGhsRmllbGQgPSB0aGF0Lm5hc3RhdkRhdHVtVXphdmVya3lQaGwodHlwX3BobCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbERhdGFQaGx6UG9saWNrYS52YWxpZFBobCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IHZhbERhdGFQaGx6UG9saWNrYS52YWxpZFBobDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHZhbERhdGFQaGx6UG9saWNrYS50ZXh0UGhsO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGxldCBsX2RhdFZ6bmlrdU1vem55Wk5vdmU6IERhdGUgPSBtX29Qb2hsZWRhdmt5LkRhdHVtVXphdmVya3lQaGwobV90YlR5cFBobC5UeXBQaGwsIEdTdHJpbmcuTnVsbCwgVXNlclByb2Nlc3MuRWtvUGFyYW1zLkNpc1NwciwgbV90YkRhdFZ6bmlrdS5WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGxldCBsX2RhdFZ6bmlrdU1vem55WmVTdGFyZTogRGF0ZSA9IG1fb1BvaGxlZGF2a3kuRGF0dW1VemF2ZXJreVBobChtX1R5cFBobFB1diwgR1N0cmluZy5OdWxsLCBVc2VyUHJvY2Vzcy5Fa29QYXJhbXMuQ2lzU3ByLCBtX3RiRGF0VnpuaWt1LlZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxfZGF0VnpuaWt1TW96bnlaTm92ZTogRGF0ZSA9IG5ldyBEYXRlKHZhbERhdGFQaGx6UG9saWNrYS5kYXR1bVBobCEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbF9kYXRWem5pa3VNb3pueVplU3RhcmU6IERhdGUgPSBuZXcgRGF0ZSh0aGF0LkRhdFV6YXZQdXZQb2hsISk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobF9kYXRWem5pa3VNb3pueVpOb3ZlID4gZGF0VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxfZGF0VnpuaWt1TW96bnlaTm92ZS5zZXREYXRlKGxfZGF0VnpuaWt1TW96bnlaTm92ZS5nZXREYXRlKCkgKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxfZGF0VnpuaWt1TW96bnlaTm92ZSA9IGRhdFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobF9kYXRWem5pa3VNb3pueVplU3RhcmUgPiBkYXRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbF9kYXRWem5pa3VNb3pueVplU3RhcmUuc2V0RGF0ZShsX2RhdFZ6bmlrdU1vem55WmVTdGFyZS5nZXREYXRlKCkgKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxfZGF0VnpuaWt1TW96bnlaZVN0YXJlID0gZGF0VmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsX2RhdFZ6bmlrdU1vem55OiBEYXRlID0gKGxfZGF0VnpuaWt1TW96bnlaTm92ZSA+IGxfZGF0VnpuaWt1TW96bnlaZVN0YXJlID8gbF9kYXRWem5pa3VNb3pueVpOb3ZlIDogbF9kYXRWem5pa3VNb3pueVplU3RhcmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobF9kYXRWem5pa3VNb3pueSA+IGRhdFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gXCJaYWRhbsOpIGRhdHVtIHZ6bmlrdSBwcm8gcMWZZWRwaXN5IHNwYWTDoSBkbyB1emF2xZllbsOpaG8gb2Jkb2LDrS4gTmVqbmnFvsWhw60gbW/Fvm7DqSBkYXR1bSBqZTogXCIgKyBsX2RhdFZ6bmlrdU1vem55LnRvRGF0ZVN0cmluZygpOyAvLy5Ub1N0cmluZyhcImRkLk1NLnl5eXlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGV4dCA9IFwiTmVuw60gdnlwbG7Em25vIHBvbGUgRGF0dW0gVnpuaWt1XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL21fb1ZhbGlkUHJvdmlkZXIuU2V0VGV4dChtX3RiRGF0VnpuaWt1LCBsX2JWYWxpZCA/IG51bGwgOiBsX3RleHQpO1xyXG4gICAgICAgICAgICAvL21fb1ZhbGlkUHJvdmlkZXIuU2V0VGlwU3R5bGUobV90YkRhdFZ6bmlrdSwgbF9iVmFsaWQgPyBUaXBTdHlsZS5Ob25lIDogVGlwU3R5bGUuRXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gW3ZhbGlkLCB0ZXh0XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdXBkYXRlRGF0VnpuaWt1UHJldm9kRGx1aHUoZGF0VmFsdWU6IERhdGUgfCBudWxsKTogW2Jvb2xlYW4sIHN0cmluZ10ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IHZhbGlkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IHRleHQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgIGlmIChkYXRWYWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBsX2RhdFZ6bmlrdU1vem55Wk5vdmU6IERhdGUgPSBuZXcgRGF0ZSh0aGF0LkRhdFV6YXZOb3ZQb2hsISk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbF9kYXRWem5pa3VNb3pueVplU3RhcmU6IERhdGUgPSBuZXcgRGF0ZSh0aGF0LkRhdFV6YXZQdXZQb2hsISk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGxfZGF0VnpuaWt1TW96bnk6IERhdGUgPSAobF9kYXRWem5pa3VNb3pueVpOb3ZlID4gbF9kYXRWem5pa3VNb3pueVplU3RhcmUgPyBsX2RhdFZ6bmlrdU1vem55Wk5vdmUgOiBsX2RhdFZ6bmlrdU1vem55WmVTdGFyZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobF9kYXRWem5pa3VNb3pueSA+IGRhdFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9IFwiWmFkYW7DqSBkYXR1bSB2em5pa3UgcHJvIHDFmWVkcGlzeSBzcGFkw6EgZG8gdXphdsWZZW7DqWhvIG9iZG9iw60uIE5lam5pxb7FocOtIG1vxb5uw6kgZGF0dW0gamU6IFwiICsgbF9kYXRWem5pa3VNb3pueS50b0RhdGVTdHJpbmcoKTsgLy8uVG9TdHJpbmcoXCJkZC5NTS55eXl5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0ID0gXCJOZW7DrSB2eXBsbsSbbm8gcG9sZSBEYXR1bSBWem5pa3VcIlxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gW3ZhbGlkLCB0ZXh0XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbmFzdGF2RGF0dW1VemF2ZXJreVBobCh0eXBfcGhsKTogZGF0YVBobEZpZWxkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCByZXREYXR1bTogYW55OyAvLyBEYXRlfEpzb25EYXRlIC8vIHxudWxsfHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgbGV0IHJldFZhbGlkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IHJldFRleHQ6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwX3BobC50eXBfcGhsID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldFZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXRUZXh0ID0gXCJEb2hsZWTDoW7DrSBkYXRhIHV6w6F2xJtya3kgbmVuw60gbW/Fvm7DqS4gTmVuw60gdXZlZGVuIFR5cCBwb2hsZWTDoXZreSFcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhhdC5Sb2sgPT0gbnVsbCkgey8vaWYgKHRoYXQuUm9rUGhsID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldFZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXRUZXh0ID0gXCJSb2sgcG9obGVkw6F2a3kgbmVuw60gbmFzdGF2ZW4uIFByb3ZlxI90ZSB6bm92dSB6bcSbbnUgcG9obGVkw6F2a3khXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBfcGhsLk5hc3RhdmVuaS5yb2sgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cF9waGwucG9tX3JvayA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXRUZXh0ID0gXCJUeXAgcG9obGVkw6F2a3kgcHJvIGFrdHXDoWxuw60gb2Jkb2LDrSBuZWV4aXN0dWplIVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBfcGhsLnBvbV9wcml6X3NwciA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXREYXR1bSA9IHR5cF9waGwucG9tX3Nwcl9kYXRfdXphdlxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0RGF0dW0gPSB0eXBfcGhsLnBvbV9kYXRfdXphdlxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocmV0RGF0dW0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cF9waGwucG9tX3ByaXpfc3ByID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXRWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldFRleHQgPSBgRGF0dW0gdXrDoXbEm3JreSBzcHJhdm92YW7DqSBwb2hsZWTDoXZreSAke3R5cF9waGwudHlwX3BobH0sIHJva3UgJHt0eXBfcGhsLnJva30gbmVuw60gdSBwb2hsZWTDoXZreSB1dmVkZW5vIWBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXRUZXh0ID0gYERhdHVtIHV6w6F2xJtya3kgcG9obGVkw6F2a3kgJHt0eXBfcGhsLnR5cF9waGx9LCByb2t1ICR7dHlwX3BobC5yb2t9IG5lbsOtIHUgcG9obGVkw6F2a3kgdXZlZGVubyFgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCByZXREYXRhOiBkYXRhUGhsRmllbGQgPSB7IGRhdHVtUGhsOiByZXREYXR1bSwgdmFsaWRQaGw6IHJldFZhbGlkLCB0ZXh0UGhsOiByZXRUZXh0IH07XHJcbiAgICAgICAgICAgIHJldHVybiByZXREYXRhO1xyXG4gICAgICAgICAgICAvL3JldHVybiB7IGRhdHVtUGhsOiByZXREYXR1bSwgdmFsaWRQaGw6IHJldFZhbGlkLCB0ZXh0UGhsOiByZXRUZXh0IH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb24gTSBFIEQgTyBUIFkgIEEgIEYgVSBOIEsgQyBFXHJcbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgLy8jcmVnaW9uIFQgRSBTIFQgTyBWIMOBIE4gw41cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvaygpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKSAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhhdC5acHVzb2JQcmV2b2R1KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDk5OiB7IHRoYXQucHJlZHBpc3lLUHJldmVkZW5pKCkgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTogLy8gMSAtIHDFmWV2b2QgayBleGVrdWNpLFxyXG4gICAgICAgICAgICAgICAgY2FzZSAyOiAvLyAyIC0gcMWZZXZvZCBrIGluc29sdmVuY2ksXHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6IC8vIDMgLSBwxZlldm9kIG5hIHBvZHJvenZhaHUsXHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IC8vIDQgLSBwxZllc3VuLXDFmWVzdW5cclxuICAgICAgICAgICAgICAgIGNhc2UgNTogLy8gNSAtIHDFmWV2b2QgayB2eW3DoWjDoW7DrSBjZWxuw61tdSDDusWZYWR1LFxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuQWtjZVByZXZvZHUoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKChyZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKChyZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QocmV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IC8vIChEZWZhdWx0IC0gMCAtIHpvYnJhemVuw60gVnltw6FoYWPDrWhvIHNhbGRhIGRsZSBExZgpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoXCJBa2NlIG5lbsOtIGltcGxlbWVudG92w6FuYVwiKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHByZWRwaXN5S1ByZXZlZGVuaSgpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKVxyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGF0LmZpbmRGb3JtcygpLmdmb3JtKFwiaXNWYWxpZFwiKSkgcmV0dXJuIGRlZi5yZWplY3QoKS5wcm9taXNlKCk7ICAvL1RPRE86IGlmICghVXBkYXRlRGF0YVZhbGlkKCkpIHtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJLb250cm9sdWppIGRhdGEuLi5cIik7XHJcbiAgICAgICAgICAgIHRoYXQuZGF0YVZhbGlkKClcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QocmV0KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZG9uZSgocmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcIlByb2LDrWjDoSBwxZlldm9kIHDFmWVkcGlzxa8gbWV6aSBwxZnDrXBhZHkuLi5cIik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy9tX29QcmlwYWR5LlByZXZvZFByZWRwaXN1S1BobChcclxuICAgICAgICAgICAgICAgIC8vICAgIEl4cCxcclxuICAgICAgICAgICAgICAgIC8vICAgIG1fc0l4cFByZXZvZCxcclxuICAgICAgICAgICAgICAgIC8vICAgIG1fYlByZXZlc3REb3RjZW5lLkNoZWNrZWQsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBtX2JLb3Bpcm92YXRTcGlzeS5DaGVja2VkLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgbV9iS29waXJvdmF0UGlzZW1ub3N0aS5DaGVja2VkLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgbV9iS29waXJvdmF0UG9waXN5LkNoZWNrZWQsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBtX2JLb3Bpcm92YXRQb3puYW1reS5DaGVja2VkLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgbV9ndlNlem5hbS5Hcm91cE9wZXJhdGlvblJvd3MuQ2FzdDxHU2FsZG9EUkRhdGFTZXQuU2V6bmFtUm93PigpLlRvQXJyYXkoKSxcclxuICAgICAgICAgICAgICAgIC8vICAgIEdEYXRlLk51bGwsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBHRGF0ZS5OdWxsLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgbV90YkRhdFZ6bmlrdS5WYWx1ZVxyXG4gICAgICAgICAgICAgICAgLy8pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBBa2NlUHJldm9kdSgpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKVxyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGF0LmZpbmRGb3JtcygpLmdmb3JtKFwiaXNWYWxpZFwiKSkgcmV0dXJuIGRlZi5yZWplY3QoKS5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiS29udHJvbHVqaSBkYXRhLi4uXCIpO1xyXG4gICAgICAgICAgICB0aGF0LmRhdGFWYWxpZCgpXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKChyZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKChyZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KHJldCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZfVHlwUGhsID0gdGhhdC5maW5kRmllbGRzKFwidHlwX3BobFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZfVHlwUGhsID09IG51bGwgfHwgZl9UeXBQaGwudHlwX3BobCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlamVjdChcIk5lbsOtIHZ5cGxuxJtubyBwb2xlIFR5cCBwb2hsZWTDoXZreVwiKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxfVHlwUGhsID0gZl9UeXBQaGwudHlwX3BobDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHRoaXMuZ3JpZFByaXBhZFVocmFkeS5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZFVocmFkeUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxfUG91emVWeW0gPSB0aGF0LmZpbmRGaWVsZHMoXCJtX2JQb3V6ZVZ5bVwiKS5nZmllbGQ8Ym9vbGVhbj4oXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcIktvbnRyb2x1amkgZGF0YS4uLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnBvdXplVnltVmFsaWQoc2VsZWN0aW9uLCBsX1BvdXplVnltKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKChyZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKChyZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QocmV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcIktvbnRyb2x1amkgZGF0YS4uLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQua3Jva3lWeW1haGFuaVZhbGlkKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKChyZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKChyZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdChyZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmX0l4cERlbiA9IHRoYXQuZmluZEZpZWxkcyhcIml4cF9kZW5cIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsX0l4cERlbiA9IGZfSXhwRGVuLml4cF9kZW47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiS29udHJvbHVqaSBkYXRhLi4uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBrb250cm9sYSB6ZGEgZXhpc3R1amUgcmFkZWsgYSBjdHZydCB2IGNpbG92ZW0gdHlwdSBwb2hsZWRhdmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlR5cFBvaGxlZGF2a3kuamVWYWxpZG5pVHlwUG9obGVkYXZreSh7IHR5cFBobDogbF9UeXBQaGwsIGljbzogdGhhdC5JY28sIHVjczogdGhhdC5VY3MsIHJvazogdGhhdC5Sb2ssIGl4cERlbjogbF9JeHBEZW4sIGl4c0Z1bjogdGhhdC5JeHNGdW4gfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoXCJDaHliYSBwxZlpIHZhbGlkYWNpIHR5cHUgcG9obGVkw6F2a3kgLSBjaHliYSBuYSBzZXJ2ZXJ1XCIpOyAvLyBUT0RPOiB2csOhdGl0IHNlcnZlcm92w6kgY2h5YnkgPyBpIGtkecW+IHRhbSBqZSBjaHliYSBwb3V6ZSBwb2t1ZCBuYSB2c3R1cHUgbmVqc291IGRhdGEgLSBhc2kgbmV0xZllYmEuLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KFwiVnliZXJ0ZSB2YWxpZG7DrSB0eXAgcG9obGVkw6F2a3khXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmX0RkcFJhZGVrID0gdGhhdC5maW5kRmllbGRzKFwiZGRwX3JhZGVrXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmX0RkcFJhZGVrID09IG51bGwgfHwgZl9EZHBSYWRlay5kZHBfcmFkZWsgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoXCJOZW7DrSB2eXBsbsSbbiDFmMOhZGVrXCIpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbF9EZHBSYWRlayA9IGZfRGRwUmFkZWsuZGRwX3JhZGVrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiS29udHJvbHVqaSBkYXRhLi4uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLkNpc2VsbmlrUmFka3UuamVWYWxpZG5pUmFkZWsoeyBpeHBEZW46IGxfSXhwRGVuLCB0eXBQaGw6IGxfVHlwUGhsLCBkZHBSYWRlazogbF9EZHBSYWRlayB9KS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKChyZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdHlwLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbsSbY28gc2UgcG9rYXppbG8gdGFrIHZyw6F0aW0gaGzDocWha3UgbyBkxa92b2R1IG5lw7pzcMSbY2h1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwID09PSBcImV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDaHliYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouYmFzZU1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KFwiQ2h5YmEgcMWZaSB2YWxpZGFjaSDFmcOhZGt1IHR5cHUgcG9obGVkw6F2a3kgLSBjaHliYSBuYSBzZXJ2ZXJ1XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdChcIlYgY8OtbG92w6ltIHR5cHUgcG9obGVkw6F2a3kgbmVuw60gcG92b2xlbsO9IMWYw4FERUsgcG91xb5pdMO9IG5hIHDFmcOtcGFkdSBERFAhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZl9EZHBDdHZydCA9IHRoYXQuZmluZEZpZWxkcyhcImRkcF9jdHZydFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmX0RkcEN0dnJ0ID09IG51bGwgfHwgZl9EZHBDdHZydC5kZHBfY3R2cnQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlamVjdChcIk5lbsOtIHZ5cGxuxJtuYSDEjHR2csWlXCIpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsX0RkcEN0dnJ0ID0gZl9EZHBDdHZydC5kZHBfY3R2cnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcIktvbnRyb2x1amkgZGF0YS4uLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLkNpc2VsbmlrQ3R2cnRpLmplVmFsaWRuaUN0dnJ0KHsgaXhwRGVuOiBsX0l4cERlbiwgdHlwUGhsOiBsX1R5cFBobCwgZGRwQ3R2cnQ6IGxfRGRwQ3R2cnQgfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKChyZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdHlwLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9uxJtjbyBzZSBwb2themlsbyB0YWsgdnLDoXRpbSBobMOhxaFrdSBvIGTFr3ZvZHUgbmXDunNwxJtjaHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cCA9PT0gXCJleGNlcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ2h5YmFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouYmFzZU1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KFwiQ2h5YmEgcMWZaSB2YWxpZGFjaSDEjXR2cnRpIHR5cHUgcG9obGVkw6F2a3kgLSBjaHliYSBuYSBzZXJ2ZXJ1XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KFwiViBjw61sb3bDqW0gdHlwdSBwb2hsZWTDoXZreSBuZW7DrSBwb3ZvbGVuw6EgxIxUVlLFpCBwb3XFvml0w6EgbmEgcMWZw61wYWR1IEREUCFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJLb250cm9sdWppIGRhdGEuLi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2FzdGt5VmFsaWQoc2VsZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygocmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCgocmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdChyZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZl9QcmlwYWRFc3UgPSB0aGF0LmZpbmRGaWVsZHMoXCJwcmlwRXN1XCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmX1ByaXBhZEVzdSAhPSBudWxsICYmIGZfUHJpcGFkRXN1Lml4cCAhPSBudWxsICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lkl4cFByZXZvZCA9IGZfUHJpcGFkRXN1Lkl4cDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lkl4cFByZXZvZCA9IHRoYXQuTmV3SXhwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbF9iUHJldnppdFJDID0gdGhhdC5maW5kRmllbGRzKFwibV9iUHJldnppdFJDXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxfYlByZXZ6aXRWc0RvU3MgPSB0aGF0LmZpbmRGaWVsZHMoXCJtX2JQcmV2eml0VnNEb1NzXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxfYlByZXZ6aXRQcmlVaHJaUGhsID0gdGhhdC5maW5kRmllbGRzKFwibV9iUHJldnppdFByaVVoclpQaGxcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbF9iUG91emVWeW0gPSB0aGF0LmZpbmRGaWVsZHMoXCJtX2JQb3V6ZVZ5bVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsX2JLb3Bpcm92YXRTcGlzeSA9IHRoYXQuZmluZEZpZWxkcyhcIm1fYktvcGlyb3ZhdFNwaXN5XCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxfYktvcGlyb3ZhdFBpc2Vtbm9zdGkgPSB0aGF0LmZpbmRGaWVsZHMoXCJtX2JLb3Bpcm92YXRQaXNlbW5vc3RpXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxfYktvcGlyb3ZhdFBvcGlzeSA9IHRoYXQuZmluZEZpZWxkcyhcIm1fYktvcGlyb3ZhdFBvcGlzeVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsX2JLb3Bpcm92YXRQb3puYW1reSA9IHRoYXQuZmluZEZpZWxkcyhcIm1fYktvcGlyb3ZhdFBvem5hbWt5XCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxfYlByZXZlc3REb3RjZW5lID0gdGhhdC5maW5kRmllbGRzKFwibV9iUHJldmVzdERvdGNlbmVcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbF9EYXRPZCA9IHRoYXQuZmluZEZpZWxkcyhcImRhdF9vZFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsX0RhdERvID0gdGhhdC5maW5kRmllbGRzKFwiZGF0X2RvXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxfRGF0VnpuaWt1ID0gdGhhdC5maW5kRmllbGRzKFwiZGF0X3Z6bmlrdVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih0aGF0LkluZm9UZXh0UHJpUHJldm9kdSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbGwoXCJQcm92ZXN0UHJldm9kXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb19JeHA6IHRoYXQuSXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvX0l4cFByZXZvZDogdGhhdC5JeHBQcmV2b2QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9fVHlwUGhsOiBsX1R5cFBobCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb19Qb3V6ZVZ5bTogbF9iUG91emVWeW0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9fc2V6bmFtVWhyYWQ6IHNlbGVjdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb19acHVzb2JQcmV2b2R1OiB0aGF0LlpwdXNvYlByZXZvZHUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9fUHJldmVzdERvdGNlbmU6IGxfYlByZXZlc3REb3RjZW5lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvX1ByZXZ6aXRSQzogIGxfYlByZXZ6aXRSQyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb19QcmV2eml0VnNEb1NzOiBsX2JQcmV2eml0VnNEb1NzICxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb19QcmV2eml0UHJpVWhyWlBobDogbF9iUHJldnppdFByaVVoclpQaGwgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvX0tvcGlyb3ZhdFNwaXN5OiBsX2JLb3Bpcm92YXRTcGlzeSAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9fS29waXJvdmF0UGlzZW1ub3N0aTogbF9iS29waXJvdmF0UGlzZW1ub3N0aSAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9fS29waXJvdmF0UG9waXN5OiBsX2JLb3Bpcm92YXRQb3Bpc3kgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvX0tvcGlyb3ZhdFBvem5hbWt5OiBsX2JLb3Bpcm92YXRQb3puYW1reSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb19EYXRPZDogbF9EYXRPZCAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9fRGF0RG86IGxfRGF0RG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9fRGF0VnpuaWt1OiBsX0RhdFZ6bmlrdSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb19EZHBSYWRlazogbF9EZHBSYWRlayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb19EZHBDdHZydDogbF9EZHBDdHZydCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0eXAsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9uxJtjbyBzZSBwb2themlsbyB0YWsgdnLDoXRpbSBobMOhxaFrdSBvIGTFr3ZvZHUgbmXDunNwxJtjaHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXAgPT09IFwiZXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNoeWJhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5iYXNlTWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkvLyEgY2FzdGt5VmFsaWQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLy8hIGlzbC5DaXNlbG5pa0N0dnJ0aS5qZVZhbGlkbmlDdHZydCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSAvLyEgaXNsLkNpc2VsbmlrUmFka3UuamVWYWxpZG5pUmFkZWsoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSAvLyEgaXNsLlR5cFBvaGxlZGF2a3kuamVWYWxpZG5pVHlwUG9obGVkYXZreSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7IC8vISBrcm9reVZ5bWFoYW5pVmFsaWQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7IC8vISBwb3V6ZVZ5bVZhbGlkKClcclxuICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7IC8vISBkYXRhVmFsaWQoKVxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2FzdGt5VmFsaWQoc2VsZWN0aW9uKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKClcclxuXHJcbiAgICAgICAgICAgIGxldCBsX2JNYVByZXZhZGVueVZldHNpTmV6RGx1aCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgQnJlYWtFeGNlcHRpb24gPSB7fTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5mb3JFYWNoKChyb3cpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKHJvdy5jIC0gcm93LmNfdWhyKSA8IHJvdy5jX2RsdWgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbF9iTWFQcmV2YWRlbnlWZXRzaU5lekRsdWggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBCcmVha0V4Y2VwdGlvbjs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlICE9PSBCcmVha0V4Y2VwdGlvbikgdGhyb3cgZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGxfYk1hUHJldmFkZW55VmV0c2lOZXpEbHVoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShcIlVwb3pvcm7Em27DrVwiLCBcIkplZGVuIHogcMWZZXbDoWTEm27DvWNoIHDFmWVkcGlzxa8gcMWZZXbDoWTDrSDEjcOhc3RrdSB2xJt0xaHDrSBuZcW+IGplIGFrdHXDoWxuw60gZGx1aC4gQ2hjZXRlIHBva3JhxI1vdmF0P1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXQgPT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBrcm9reVZ5bWFoYW5pVmFsaWQoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpXHJcbiAgICAgICAgICAgIGlmICh0aGF0LkRkcFBhcmFtcy5kZHBfcmV6X3BsdmV4ZSAhPSAwICYmICF0aGF0LkV4aXN0dWplS3Jva1Z5bVZ5bWVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5EZHBQYXJhbXMuZGRwX3Jlel9wbHZleGUgPT0gMSkgeyAvLyBVcG96b3JuaXQgbmEgbmVleGlzdGVuY2kgcGxhdGVibsOtaG8gdsO9bcSbcnVcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFwiVXBvem9ybsSbbsOtXCIsIFwiUMWZw61wYWQgbmVtw6EgcGxhdGVibsOtIHbDvW3Em3IuIENoY2V0ZSBobyBwxZlldsOpc3Q/XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0ID09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KFwiXCIpOyAvLz8gVWtvbsSNZW5vIHXFvml2YXRlbGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGF0LkRkcFBhcmFtcy5kZHBfcmV6X3BsdmV4ZSA9PSAyKSB7IC8vIE5lcG92b2xpdCBwxZlldm9kIG5leiBwbGF0ZWJuw61obyB2w71txJtydVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVqZWN0KFwiUMWZw61wYWQgbmVuw60gbW/Fvm7DqSBwxZlldsOpc3QuIE5lZXhpc3R1amUgcGxhdGVibsOtIHbDvW3Em3IuXCIpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHBvdXplVnltVmFsaWQoc2VsZWN0aW9uLCBwb3V6ZVZ5bSk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpXHJcbiAgICAgICAgICAgIGlmIChwb3V6ZVZ5bSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbF9iSmVuVnltT2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdmFyIEJyZWFrRXhjZXB0aW9uID0ge307XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5mb3JFYWNoKChyb3cpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy5qZV92eW0gIT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbF9iSmVuVnltT2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IEJyZWFrRXhjZXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUgIT09IEJyZWFrRXhjZXB0aW9uKSB0aHJvdyBlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFsX2JKZW5WeW1Paykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmNvbmZpcm0oXCJVcG96b3JuxJtuw61cIiwgXCJCdWRvdSBzZSBwxZlldsOhZMSbdCBwb3V6ZSB2eW3DoWhhbsOpIHDFmWVkcGlzeS4gTsSba3RlcsOpIHogdnlicmFuw71jaCB0dXRvIHBvZG3DrW5rdSBuZXNwbMWIdWrDrS4gQ2hjZXRlIHBva3JhxI1vdmF0P1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldCA9PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdChcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGRhdGFWYWxpZCgpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKVxyXG5cclxuICAgICAgICAgICAgLy9UT0RPOiB1cGRhdGVEYXRhVmFsaWQoKVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQudmlld0Nhc3RreVswXS5kbHVoPy5sZXNzVGhhbk9yRXF1YWxUbygwKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoXCJQxZnDrXBhZCB6YSB6YWRhbsOpIG9iZG9iw60gbmVtw6EgZGx1aCFcIikucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHRlc3RWeXBsbmVueWNoUG9saWNlaygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkS25paGEgPSB0aGF0LmZpbmRGaWVsZHMoXCJpeHBfZGVuXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBmaWVsZFBvaGwgPSB0aGF0LmZpbmRGaWVsZHMoXCJ0eXBfcGhsXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBmaWVsZFByaXBhZHkgPSB0aGF0LmZpbmRGaWVsZHMoXCJwcmlwRXN1XCIpO1xyXG4gICAgICAgICAgICBjb25zdCBmaWVsZFJhZGVrID0gdGhhdC5maW5kRmllbGRzKFwiZGRwX3JhZGVrXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBmaWVsZEN0dnJ0ID0gdGhhdC5maW5kRmllbGRzKFwiZGRwX2N0dnJ0XCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZpZWxkS25paGEuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZmllbGRQb2hsLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZmllbGRQcmlwYWR5LmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZmllbGRSYWRlay5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGZpZWxkQ3R2cnQuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBmaWVsZFBvaGwuZ2ZpZWxkKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgICAgICBmaWVsZFByaXBhZHkuZ2ZpZWxkKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgICAgICBmaWVsZFJhZGVrLmdmaWVsZChcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICAgICAgZmllbGRDdHZydC5nZmllbGQoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGZpZWxkUG9obC5nZmllbGQoXCJnZXRWYWx1ZVwiKSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZFByaXBhZHkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBmaWVsZFJhZGVrLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZmllbGRDdHZydC5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGZpZWxkUHJpcGFkeS5nZmllbGQoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgICAgIGZpZWxkUmFkZWsuZ2ZpZWxkKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgICAgICBmaWVsZEN0dnJ0LmdmaWVsZChcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmaWVsZFBvaGwuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICBmaWVsZFByaXBhZHkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICBmaWVsZFJhZGVrLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgZmllbGRDdHZydC5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uIFQgRSBTIFQgTyBWIMOBIE4gw41cclxuICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIH1cclxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8jcmVnaW9uIFBPTU9DTsOJIE9CSkVLVFlcclxuICAgIC8qKiBJbnRlcmZhY2UgcHJvIMSNw6FzdGt5IFNhbGRhICovXHJcbiAgICBpbnRlcmZhY2UgaUNhc3RreSB7XHJcbiAgICAgICAgcG9jX3N0YXY6IERlY2ltYWwgfCBudWxsLFxyXG4gICAgICAgIHByZWRwaXN5OiBEZWNpbWFsIHwgbnVsbCxcclxuICAgICAgICB1aHJhemVubzogRGVjaW1hbCB8IG51bGwsXHJcbiAgICAgICAgZGx1aDogRGVjaW1hbCB8IG51bGwsXHJcbiAgICAgICAgcHJlcGxhdGVrOiBEZWNpbWFsIHwgbnVsbFxyXG4gICAgfVxyXG4gICAgaW50ZXJmYWNlIGRhdGFQaGxGaWVsZCB7XHJcbiAgICAgICAgZGF0dW1QaGw6IGFueSxcclxuICAgICAgICB2YWxpZFBobDogYm9vbGVhbixcclxuICAgICAgICB0ZXh0UGhsOiBzdHJpbmcsXHJcbiAgICB9XHJcbiAgICAvLyNlbmRyZWdpb24gUE9NT0NOw4kgT0JKRUtUWVxyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbn0iXX0=
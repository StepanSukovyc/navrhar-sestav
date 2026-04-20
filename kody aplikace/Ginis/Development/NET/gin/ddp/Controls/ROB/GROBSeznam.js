"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GROBSeznam.ts                          </Name>
//    <Description> Seznam ROB                                                  </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-09-11                                                  </Created>
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
             * Seznam ROB
             *
             * @author Vojtěch Čech
             * @date 11.09.2025
             */
            let GROBSeznam = class GROBSeznam extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    /** Příznak zda validovat druhé políčko datumu */
                    this.validateOtherField = true;
                    /** Příznak zda proběhl kontrolní chod */
                    this.kontrolniChodProbehl = false;
                    /** Příznak zda je to první načtení dat  */
                    this.firstLoad = true;
                    //#endregion
                    //#region Režim čtení
                    //#endregion
                }
                onContentReady() {
                    const that = this;
                    that.title = "ROB";
                    that.taskId = "actGROBSeznam";
                    // Register this instance globally for communication with GMainApp
                    that.registerInstance();
                    if (that.kontrolaAsyncFunkce())
                        return;
                    that.def = $.Deferred();
                    that.nastavAkci(that.Akce);
                    that.def.done(() => {
                        that.createFilter();
                        that.createActions();
                        that.createMenu();
                        that.grid = that.createGrid();
                        //that.setRezimCteni();
                    });
                    Ddp.WebClient.Common.Base.DdpEkoInit(that, that.InitErrorText);
                    WebClient.Common.Base.setDateBoxShortcuts(that);
                }
                /**
                 * Spustí pro určitou akci proceduru, která vloží do tabulky příslušné záznamy
                 * @param akce
                 */
                nastavAkci(akce) {
                    var that = this;
                    switch (akce) {
                        case 100: // Stav k datu
                            that.stavKDatu();
                            break;
                        case 200: // Zjištění změn 
                            that.zadaniDataROB(200, "Zjištění změn");
                            break;
                        case 300: // Přírůstky v ROB
                            that.zadaniDataROB(300, "Přírůstky v ROB");
                            break;
                        case 400: // Úbytky v ROB
                            that.zadaniDataROB(400, "Úbytky v ROB");
                            break;
                    }
                }
                //#region Formuláře akcí
                /** ROB - stav k datu */
                stavKDatu() {
                    var that = this;
                    let greaterThanVekValidator = that.greaterThanVekValidator("stavForm");
                    let validatorsVek = [new Gordic.Validators.Range({ min: 0, max: 136 })];
                    validatorsVek.push(greaterThanVekValidator);
                    var form = new Gordic.Forms.Form({ name: "stavForm", layoutDescriptor: "L1M1S1 LMS-3-9-0" })
                        .addSection("Zadání věku")
                        .addRow("Od")
                        .addField("gnumberbox", {
                        name: "vek_od",
                        allowedChars: "0123456789*",
                        emptyValue: null,
                        defaultValue: null,
                        validators: validatorsVek
                    })
                        .addRow("Do")
                        .addField("gnumberbox", {
                        name: "vek_do",
                        allowedChars: "0123456789*",
                        emptyValue: null,
                        defaultValue: null,
                        validators: validatorsVek
                    });
                    that.dialogs.simpleForm("Stav k datu", form)
                        .on("close", (ev, retVal) => {
                        if (retVal != undefined) {
                            that.zavolatNastaveni(100, retVal);
                        }
                    });
                }
                /** ROB - zadání data */
                zadaniDataROB(akce, title) {
                    var that = this;
                    let greaterThanDatValidator = that.greaterThanDatValidator("zmenyForm");
                    let greaterThanVekValidator = that.greaterThanVekValidator("zmenyForm");
                    let validatorsDate = [new Gordic.Validators.Required()];
                    validatorsDate.push(greaterThanDatValidator);
                    let validatorsVek = [new Gordic.Validators.Range({ min: 0, max: 136 })];
                    validatorsVek.push(greaterThanVekValidator);
                    var form = new Gordic.Forms.Form({ name: "zmenyForm", layoutDescriptor: "L1M1S1 LMS-3-9-0" })
                        .addSection("Datum")
                        .addRow("Od")
                        .addField("gdatebox", {
                        name: "dat_od",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: validatorsDate
                    })
                        .addRow("Do")
                        .addField("gdatebox", {
                        name: "dat_do",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: validatorsDate
                    })
                        .addRow()
                        .addField("gradio", {
                        name: "typ_dat",
                        radios: [
                            { value: 1, label: 'dle data události' },
                            { value: 2, label: 'dle data zápisu do ROB (data změny)' },
                        ],
                        emptyValue: 1
                    })
                        .addSection("Věk")
                        .addRow("Od")
                        .addField("gnumberbox", {
                        name: "vek_od",
                        allowedChars: "0123456789*",
                        emptyValue: null,
                        defaultValue: null,
                        validators: validatorsVek
                    })
                        .addRow("Do")
                        .addField("gnumberbox", {
                        name: "vek_do",
                        allowedChars: "0123456789*",
                        emptyValue: null,
                        defaultValue: null,
                        validators: validatorsVek
                    });
                    that.dialogs.simpleForm(title, form)
                        .on("close", (ev, retVal) => {
                        if (retVal != undefined) {
                            that.zavolatNastaveni(akce, retVal);
                        }
                    });
                }
                //#endregion
                /** Zavolá nastavení databáze, dle typu akce */
                zavolatNastaveni(akce, model) {
                    var that = this;
                    that.isl.ROB.nastaveni({ akce: akce, model: model }).get()
                        .done(() => {
                        that.def.resolve();
                    });
                }
                /** Vytvoří grid/seznam případů */
                createGrid() {
                    return $.newDiv()
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        name: "GROBGrid",
                        data: [],
                        //defaultAction: this.actions.actDetail,
                        columnMode: "full",
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        multi: true,
                        navigationMode: "row",
                        columns: WebClient.Common.GridFormats.ROB(),
                        rowNumbers: false,
                        defaultProfile: {
                            condFormats: [
                                { description: "nenal", formula: 'EQUALS(@aktivita, 100)', text: Gordic.Components.Grid.CondFormats.CondFormatText.red },
                                { description: "bezzmeny_mrtvy", formula: 'EQUALS(@aktivita, 300)', text: Gordic.Components.Grid.CondFormats.CondFormatText.blue },
                                { description: "zmena", formula: 'EQUALS(@aktivita, 600)', text: Gordic.Components.Grid.CondFormats.CondFormatText.green },
                                { description: "nal", formula: 'EQUALS(@aktivita, 900)', text: Gordic.Components.Grid.CondFormats.CondFormatText.black },
                            ]
                        }
                    });
                }
                //#region Akce a menu
                /** Vytvoření položek v menubaru*/
                createMenu() {
                    const that = this;
                    let menu = [];
                    menu.push({ action: that.actions.actKontrola, favorite: true }, { action: that.actions.actDetail, favorite: true }, { action: that.actions.actVycistit, favorite: false }, { action: that.actions.actPodani, favorite: true }, { action: that.actions.actTisk, favorite: true });
                    menu.push({
                        favorite: true,
                        type: "static",
                        caption: "Hromadné akce",
                        enabled: false,
                        children: that.createChildrenHromadneAkce()
                    });
                    that.menuBar(menu);
                }
                /** Vytvoření akcí pro položky v menubaru */
                createActions() {
                    var that = this;
                    that.actions.addRange({
                        actKontrola: {
                            name: "actKontrola",
                            caption: "Kontrola",
                            tooltip: "Kontrolní chod",
                            run: () => {
                                if (that.kontrolaAsyncFunkce())
                                    return;
                                that.kontrolniChod(false);
                            }
                        },
                        actDetail: {
                            name: "actDetail",
                            caption: "Detail",
                            tooltip: "Otevře detail případu DDP",
                            run: () => {
                                const row = that.grid?.ggrid("activeRow");
                                if (row != undefined && row.ixp != null) {
                                    WebClient.Common.Pripady.openPripadDetail(this, row.ixp);
                                }
                            }
                        },
                        actVycistit: {
                            name: "actVycistit",
                            caption: "Vyčistit",
                            tooltip: "Vymaže výsledky nastavení z databáze",
                            run: () => {
                                if (that.kontrolaAsyncFunkce())
                                    return;
                                that.vycistit();
                            }
                        },
                        actPodani: {
                            name: "actPodani",
                            caption: "Podání",
                            tooltip: "Založení nového poplatníka",
                            enabled: that.params.ddp_rad_dokpod && !that.rezimCteni, // Pokud je režim čtení tak je vždy disabled, jinak dle parametru
                            run: () => {
                                if (that.kontrolaAsyncFunkce())
                                    return;
                                that.podani();
                            }
                        },
                        actTisk: {
                            name: "actTisk",
                            caption: "Tisk",
                            run: () => {
                                if (that.kontrolaAsyncFunkce())
                                    return;
                                that.tisk();
                            }
                        }
                    });
                }
                /**
                 * Vytvoření položek do menu 'Hromadné akce'
                 */
                createChildrenHromadneAkce() {
                    const that = this;
                    const createAction = (name, caption, enabled, handler) => ({
                        action: new GAction({
                            name,
                            caption,
                            enabled,
                            run: () => {
                                if (that.kontrolaAsyncFunkce())
                                    return;
                                handler?.();
                            }
                        })
                    });
                    const menuItems = [
                        createAction("actHromPodSab", "Hromadné založení případu ze šablony", !that.rezimCteni, () => that.hromPodSab()),
                        { id: "statusSeparator0", type: "separator" },
                        createAction("actHromAkt", "Hromadné převzetí adresních údajů - změn", !that.rezimCteni, () => that.hromadnaAktualizace()),
                        createAction("actHromPrir", "Hromadné založení karet - přírustků", !that.rezimCteni, () => that.hromadneZalozeniNovych()),
                        createAction("actHromUby", "Hromadné vyřízení karet - úbytků", !that.rezimCteni, () => that.hromadneVyrizeniUbytku())
                    ];
                    return menuItems;
                }
                //#endregion
                /**
                 * Získá data pro tabulku dle filtru
                 * @param filter
                 */
                ziskejData(filter) {
                    var that = this;
                    that.beginOperation({ id: "nacitani", text: "Načítání dat..." });
                    that.isl.ROB.list({ filters: filter }).get()
                        .done((dto) => {
                        var view = new Gordic.Data.View(dto.data);
                        that.grid.ggrid("setData", view);
                        if (that.firstLoad) {
                            that.kontrolniChod(true);
                            that.firstLoad = false;
                        }
                    }).always(() => {
                        that.endOperation({ id: "nacitani" });
                    });
                }
                //#region Filtr
                /** Vytvoření filtru */
                createFilter() {
                    const that = this;
                    var formulare = [];
                    formulare.push(that.createFilterForm());
                    $.newDiv().appendTo(this.element)
                        .gfilterpanel(
                    //! Vytvoření standardních parametrů filterpanelu pro EKO moduly
                    Gordic.Eko.Filters.getFilterParams(formulare, [], // oblíbené filtry
                    "ddp_ptm_sezrob", // téma tisku
                    null, //"ixs_fun_akt", //sloupec z DTO pro filtr "*vlastní" nebo null, pokud nemá být
                    function (event, obj) {
                        that.filterData = obj.filter;
                        that.ziskejData(obj.filter);
                    }, null, // pevný filtr
                    true, // navigátor v detailu filtru
                    that //parentContent
                    ));
                }
                /**
                 * Vytvoření formuláře do filtru - Vymáhání
                 * @returns
                 */
                createFilterForm() {
                    var that = this;
                    var radObl = that.globalSettings.get("Global.Ddp.RadOblSettings.rad_obl_l" + that.ixpDen + that.typPhl);
                    var ctvObl = that.globalSettings.get("Global.Ddp.OblibeneCtvrtiSettings.ctv_obl_l" + that.ixpDen + that.typPhl);
                    var radOblArray = radObl ? radObl.split(',').map((item) => parseInt(item.trim(), 10)) : [];
                    var ctvOblArray = ctvObl ? ctvObl.split(',').map((item) => parseInt(item.trim(), 10)) : [];
                    var form = new Gordic.Forms.Form({ tabLabel: "ROB" })
                        .addSection();
                    form.addRow("Typ změny")
                        .addField("gselectbox", Gordic.Prefabs.Select.robcesu(), {
                        name: "typ_zmeny",
                        model: "model.typ_zmeny=value.typ_zmeny",
                    })
                        .addRow("Typ ESU")
                        .addField("gselectbox", Gordic.Prefabs.Select.gincesu(), {
                        name: "typ_esu"
                    })
                        .addRow("Typ pobytu") //robctpo
                        .addField("gselectbox", Gordic.Prefabs.Select.robctpo(), {
                        name: "typ_pobytu"
                    })
                        .addRow("RČ")
                        .addField("gstringbox", {
                        name: "rc",
                        validators: [new Gordic.Validators.RodneCislo({})]
                    })
                        .addRow("Jméno")
                        .addField("gstringbox", {
                        name: "jmeno"
                    })
                        .addRow("Příjmení")
                        .addField("gstringbox", {
                        name: "prijmeni"
                    })
                        .addRow("Ulice")
                        .addField("gstringbox", {
                        name: "ulice"
                    })
                        .addRow("Městská část")
                        .addField("gstringbox", {
                        name: "mestska_cast"
                    })
                        .addRow("Část obce")
                        .addField("gstringbox", {
                        name: "cast_obce"
                    })
                        .addRow("Obec")
                        .addField("gstringbox", {
                        name: "obec"
                    })
                        .addRow("Stát")
                        .addField("gstringbox", {
                        name: "stat"
                    })
                        .addRow("Věk od")
                        .addField("gnumberbox", {
                        name: "vek_od",
                        emptyValue: null,
                        defaultValue: null
                    })
                        .addRow("Věk do")
                        .addField("gnumberbox", {
                        name: "vek_do",
                        emptyValue: null,
                        defaultValue: null
                    })
                        .addRow("Datum narození od")
                        .addField("gdatebox", {
                        name: "dat_nar_od"
                    })
                        .addRow("Datum narození do")
                        .addField("gdatebox", {
                        name: "dat_nar_do"
                    })
                        .addRow("Řádek")
                        .addField("gselectbox", Gordic.Prefabs.Select.ciselnikRadku(), {
                        name: "ddp_radek",
                        model: "model.ddp_radek=value.ddp_radek",
                        serverFilters: {
                            ddp_radek: radOblArray,
                            ixp_den: that.ixpDen,
                            typ_phl: that.typPhl,
                            aktivita: 100
                        }
                    })
                        .addRow("Čtvrť")
                        .addField("gselectbox", Gordic.Prefabs.Select.ciselnikCtvrti(), {
                        name: "ddp_ctvrt",
                        model: "model.ddp_ctvrt=value.ddp_ctvrt",
                        serverFilters: {
                            ddp_ctvrt: ctvOblArray,
                            ixp_den: that.ixpDen,
                            typ_phl: that.typPhl,
                            aktivita: 100
                        }
                    })
                        .addField("gcheck", {
                        name: "nov_adr_pris",
                        label: "Hledat dle nové adresy (u osob se změnou adresy)"
                    })
                        .addField("gcheck", {
                        name: "rozlisovat_velikost",
                        label: "Rozlišovat velikost písmen"
                    })
                        .addField("gcheck", {
                        name: "dia_ignore",
                        label: "Ignorovat diakritiku"
                    })
                        .addField("gcheck", {
                        name: "zobr_vlastni",
                        label: "Zobrazit pouze vlastní případy"
                    })
                        .addField("gcheck", {
                        name: "nal",
                        label: "<b>Bez změny</b>"
                    })
                        .addField("gcheck", {
                        name: "bezzmeny_mrtvy",
                        label: "<span class='ggrid-condf-text-blue'>Odstěhovaný nebo mrtvý"
                    })
                        .addField("gcheck", {
                        name: "nenal",
                        label: "<span class='ggrid-condf-text-red'>Nenalezené</span>"
                    })
                        .addField("gcheck", {
                        name: "zmena",
                        label: "<span class='ggrid-condf-text-green'>Změněné</span>"
                    });
                    return form;
                }
                //#endregion
                //#region Kontrolní chod
                /**
                 * Spustí kontrolní chod
                 * @param dialog Parametr co určí zda se má zobrazit potvrzení
                 */
                kontrolniChod(dialog) {
                    var that = this;
                    var filter = {};
                    filter.rob_chk_ulice = that.globalSettings?.get("Global.Ddp.ROBSettings.rob_chk_ulice") ?? true;
                    filter.rob_chk_cpop = that.globalSettings?.get("Global.Ddp.ROBSettings.rob_chk_cpop") ?? true;
                    filter.rob_chk_cor = that.globalSettings?.get("Global.Ddp.ROBSettings.rob_chk_cor") ?? true;
                    filter.rob_chk_cobce = that.globalSettings?.get("Global.Ddp.ROBSettings.rob_chk_cobce") ?? true;
                    filter.rob_chk_mcast = that.globalSettings?.get("Global.Ddp.ROBSettings.rob_chk_mcast") ?? true;
                    filter.rob_chk_obec = that.globalSettings?.get("Global.Ddp.ROBSettings.rob_chk_obec") ?? true;
                    filter.rob_chk_psc = that.globalSettings?.get("Global.Ddp.ROBSettings.rob_chk_psc") ?? true;
                    var def = $.Deferred();
                    if (dialog) {
                        that.dialogs.confirm("Kontrola", "Chcete provést kontrolní chod?")
                            .on("close", (ev, retVal) => {
                            if (retVal == "yes") {
                                def.resolve();
                            }
                            else
                                def.reject();
                        });
                    }
                    else
                        def.resolve();
                    def.done(() => {
                        that.beginOperation({ id: "kontrola", text: "Probíhá kontrolní chod..." });
                        that.isl.ROB.kontrola({ userSettings: filter })
                            .get().done(() => {
                            that.kontrolniChodProbehl = true;
                            that.hideFlash("kontrolniChodReset");
                            if (that.filterData)
                                that.ziskejData(that.filterData);
                        }).always(() => {
                            that.endOperation({ id: "kontrola" });
                        });
                    });
                }
                //#endregion
                //#region Vyčištění
                vycistit() {
                    var that = this;
                    that.beginOperation({ id: "vycisteni", text: "Probíhá vyčištění..." });
                    that.isl.ROB.smazatRobtesu().get()
                        .done(() => {
                        that.ziskejData(that.filterData);
                    })
                        .always(() => {
                        that.endOperation({ id: "vycisteni" });
                    });
                }
                //#endregion
                //#region Podání (Nový)
                /** Založení nového případu dle údajů ROB  */
                podani() {
                    var that = this;
                    const row = that.grid?.ggrid("activeRow");
                    if (row != undefined && row.aktivita == 100) {
                        var defPodani = $.Deferred();
                        // kontrola na existenci stejného RČ
                        if (that.params.ddp_esu_check) {
                            if (row.rc != null) {
                                that.beginOperation({ id: "kontrola_rc", text: "Probíhá kontrola RČ..." });
                                that.isl.DdpInterfaceNew.rcJeJizEvidovano({ ixp: "XXXXXXXXXXXX", rc: row.rc, typPhl: "" })
                                    .get().done((result) => {
                                    if (result) {
                                        that.dialogs.confirm("RČ", "Vybrané RČ je již v tomto typu pohledávky již evidováno, chcete pokračovat v zakládání nového případu?")
                                            .on("close", (ev, retVal) => {
                                            if (retVal == "yes") {
                                                defPodani.resolve();
                                            }
                                            else
                                                defPodani.reject();
                                        });
                                    }
                                    else {
                                        defPodani.resolve();
                                    }
                                }).always(() => {
                                    that.endOperation({ id: "kontrola_rc" });
                                });
                            }
                            else
                                defPodani.resolve();
                        }
                        else
                            defPodani.resolve();
                        defPodani.done(() => {
                            var aktualizaceEsu = false;
                            var defEvideneceESU = $.Deferred();
                            that.beginOperation({ id: "kontrola_esu", text: "Probíhá kontrola evidence ESU..." });
                            that.isl.ROB.dohledaniESU({ ixsOso: row.ixs_oso, rc: "" })
                                .get().done((result) => {
                                if (result.length == 12) // validní esu nalezen
                                 {
                                    that.dialogs.confirm("Aktualizace", "Externí subjekt je již evidován, chcete u něj aktualizovat údaje dle ROB?")
                                        .on("close", (ev, retVal) => {
                                        if (retVal == "yes") {
                                            aktualizaceEsu = true;
                                            defEvideneceESU.resolve();
                                        }
                                        else {
                                            aktualizaceEsu = true;
                                            defEvideneceESU.resolve();
                                        }
                                    });
                                }
                                else
                                    defEvideneceESU.resolve();
                            }).always(() => {
                                that.endOperation({ id: "kontrola_esu" });
                            });
                            defEvideneceESU.done(() => {
                                that.beginOperation({ id: "podani", text: "Probíhá zakládání nového případu..." });
                                that.isl.Pripad.create((rq) => {
                                    return {
                                        rq: {
                                            Data: {
                                                ixp_den: that.ixpDen,
                                                ixp: null,
                                                gin_gen_mode: "ano",
                                                ixp_rob: row.ixs_oso,
                                                aktualizace_esu: aktualizaceEsu
                                            },
                                        },
                                    };
                                })
                                    .get().done((data) => {
                                    WebClient.Common.Pripady.openPripadDetail(that, data.Dto.ixp);
                                })
                                    .fail(function (jqXHR, typ, obj) {
                                    //něco se pokazilo, vrátím hlášku o důvodu neúspěchu
                                    if (typ === "exception") {
                                        obj.handled = true;
                                        return that.dialogs.error("Chyba", obj.baseMessage);
                                    }
                                })
                                    .always(() => {
                                    that.endOperation({ id: "podani" });
                                });
                            });
                        });
                    }
                    else {
                        that.dialogs.alert("Podání", "Nový případ lze založit pouze pro osoby, pro které ještě případ neexistuje! \n" +
                            "Pokud případ již existuje, pokračujte prosím zobrazením detailu a pořízením příslušných změn na existujícím případu!");
                    }
                }
                //#endregion
                //#region Hromadné akce
                /** Hromadné založení nového případu dle šablony */
                hromPodSab() {
                    var that = this;
                    var selection = that.grid.ggrid("getSelection");
                    if (selection.length == 0)
                        return;
                    // Create deferred objects for each confirmation
                    const kontrolniChodDeferred = $.Deferred();
                    const maskaVSDeferred = $.Deferred();
                    if (!that.kontrolniChodProbehl) {
                        that.dialogs.confirm("Kontrolní chod", "Nebyl proveden kontrolní chod, nebo se změnily data po provedení posledního! \n Chcete pokračovat?")
                            .on("close", (ev, retVal) => {
                            if (retVal == "yes")
                                kontrolniChodDeferred.resolve();
                            else
                                kontrolniChodDeferred.reject();
                        });
                    }
                    else
                        kontrolniChodDeferred.resolve();
                    kontrolniChodDeferred.done(() => {
                        if (that.maskaVS && that.maskaVS.length < 2) {
                            that.dialogs.confirm("Maska VS", "Na typu pohledávky není nastavena maska pro generování VS - VS se vygeneruje až při evidenci případu! \n Chcete pokračovat?")
                                .on("close", (ev, retVal) => {
                                if (retVal == "yes")
                                    maskaVSDeferred.resolve();
                                else
                                    maskaVSDeferred.reject();
                            });
                        }
                        else {
                            maskaVSDeferred.resolve();
                        }
                    }).fail(() => {
                        maskaVSDeferred.reject();
                    });
                    maskaVSDeferred.done(() => {
                        var windowOption = { title: `Podání ze šablony`, width: 490, height: 350 }; //nastavení okna - titulek se následně změní dle nastavení v okně
                        var ParamJSON = { ID: "DDPGPripadPodaniZeSablony#", zobraz_vyber_esu: false, rob: true }; //přenášené parametry
                        that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GPripadPodaniZeSablony", ParamJSON, windowOption)
                            .on("close", (ev, retVal) => {
                            if (retVal) {
                                if (retVal.ixs_dsa == WebClient.Common.Globals.sgNull.nullSablony) {
                                    //?? podani bez šablony
                                }
                                else {
                                    that.TaskStartHromAkce(selection, retVal, "HromPodSab");
                                }
                            }
                            else
                                return that.dialogs.error("Chyba při podání případu");
                        });
                    });
                }
                /** Hromadné převzetí adresních údajů - změn */
                hromadnaAktualizace() {
                    var that = this;
                    var selection = that.grid.ggrid("getSelection");
                    if (selection.length == 0)
                        return;
                    const kontrolniChodDeferred = $.Deferred();
                    if (!that.kontrolniChodProbehl) {
                        that.dialogs.confirm("Kontrolní chod", "Nebyl proveden kontrolní chod, nebo se změnily data po provedení posledního! \n Chcete pokračovat?")
                            .on("close", (ev, retVal) => {
                            if (retVal == "yes")
                                kontrolniChodDeferred.resolve();
                            else
                                kontrolniChodDeferred.reject();
                        });
                    }
                    else
                        kontrolniChodDeferred.resolve();
                    kontrolniChodDeferred.done(() => {
                        // Aktualizovat adresní údaje
                        that.TaskStartHromAkce(selection, {}, "HromAkt");
                    });
                }
                /** Hromadné založení karet - přírustků */
                hromadneZalozeniNovych() {
                    var that = this;
                    var selection = that.grid.ggrid("getSelection");
                    if (selection.length == 0)
                        return;
                    // Create deferred objects for each confirmation
                    const kontrolniChodDeferred = $.Deferred();
                    const maskaVSDeferred = $.Deferred();
                    if (!that.kontrolniChodProbehl) {
                        that.dialogs.confirm("Kontrolní chod", "Nebyl proveden kontrolní chod, nebo se změnily data po provedení posledního! \n Chcete pokračovat?")
                            .on("close", (ev, retVal) => {
                            if (retVal == "yes")
                                kontrolniChodDeferred.resolve();
                            else
                                kontrolniChodDeferred.reject();
                        });
                    }
                    else
                        kontrolniChodDeferred.resolve();
                    kontrolniChodDeferred.done(() => {
                        if (that.maskaVS && that.maskaVS.length < 2) {
                            that.dialogs.confirm("Maska VS", "Na typu pohledávky není nastavena maska pro generování VS - VS se vygeneruje až při evidenci případu! \n Chcete pokračovat?")
                                .on("close", (ev, retVal) => {
                                if (retVal == "yes")
                                    maskaVSDeferred.resolve();
                                else
                                    maskaVSDeferred.reject();
                            });
                        }
                        else {
                            maskaVSDeferred.resolve();
                        }
                    }).fail(() => {
                        maskaVSDeferred.reject();
                    });
                    maskaVSDeferred.done(() => {
                        that.robHromParam(selection, "0");
                    });
                }
                /** Hromadné vyřízení karet - úbytků */
                hromadneVyrizeniUbytku() {
                    var that = this;
                    var selection = that.grid.ggrid("getSelection");
                    if (selection.length == 0)
                        return;
                    const kontrolniChodDeferred = $.Deferred();
                    if (!that.kontrolniChodProbehl) {
                        that.dialogs.confirm("Kontrolní chod", "Nebyl proveden kontrolní chod, nebo se změnily data po provedení posledního! \n Chcete pokračovat?")
                            .on("close", (ev, retVal) => {
                            if (retVal == "yes")
                                kontrolniChodDeferred.resolve();
                            else
                                kontrolniChodDeferred.reject();
                        });
                    }
                    else
                        kontrolniChodDeferred.resolve();
                    kontrolniChodDeferred.done(() => {
                        that.robHromParam(selection, "1");
                    });
                }
                /** Okno pro nastavení parametrů hromadných změn */
                robHromParam(selection, typZadani) {
                    var that = this;
                    var title;
                    var nazevAkce;
                    if (typZadani == "0") {
                        title = "Hromadné přidání karet – přírustků";
                        nazevAkce = "HromPrir";
                    }
                    else if (typZadani == "1") {
                        title = "Hromadné vyřízení karet – úbytků";
                        nazevAkce = "HromUby";
                    }
                    else
                        return;
                    var windowOption = { title: title, width: 675, height: 450 };
                    var ParamsJSON = { ID: "DDPGROBHromParam#", typZadani: typZadani };
                    that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GROBHromParam", ParamsJSON, windowOption)
                        .on("close", function (ev, retVal) {
                        // pokud máme vrácený model, spustíme asynchronní akci
                        if (retVal) {
                            var result = retVal.model;
                            that.TaskStartHromAkce(selection, result, nazevAkce);
                        }
                    });
                }
                //#endregion
                //#region Tisk
                /**
                 * Tisk protokolu kontrolniho chodu proti rob
                 */
                tisk() {
                    var that = this;
                    const actTisk = GAction.createPrintAction({
                        name: "actTiskROB",
                        tema: "ddp_ptm_sezrob",
                        // ↓ Metoda, která je zavolána těsně před generováním sestavy a kde lze na straně serveru ovlivnit parametry sestavy ↓
                        serverParameterMethod: "Gordic.Ddp.WebClient.GDdpWebTisk:TiskROB", //zde se plní téma
                        reportStarting: function (rep) {
                            rep.customDto = {
                                robFilter: that.filterData,
                                typ_phl: that.typPhl,
                                ixp_den: that.ixpDen,
                                rok_den: that.rokDen
                            };
                        },
                        reportFinished: function () { },
                        dialogClosed: function () { }
                    });
                    actTisk.run();
                }
                //#endregion
                //#region Validátory
                greaterThanDatValidator(formName) {
                    var that = this;
                    var validator = new Gordic.Validators.Base();
                    validator.getMessage = (value) => {
                        return "Datum od musí být menší než datum do";
                    };
                    validator.validate = (value, source) => {
                        var parents = $(source).parents();
                        let datOdField = parents.findForms(formName).findFields("dat_od");
                        let datDoField = parents.findForms(formName).findFields("dat_do");
                        if (!datOdField.gfield("hasValue") || !datDoField.gfield("hasValue"))
                            return true;
                        var datOd = datOdField.gfield("getValue");
                        var datDo = datDoField.gfield("getValue");
                        let ret = datOd <= datDo;
                        // pokud se nebude validovat druhé políčko, 
                        // je možné že když se opraví první, druhé zůstane 'nevalidní'
                        if (that.validateOtherField) {
                            that.validateOtherField = false;
                            that.getOtherField(source, "dat").gfield("validate");
                        }
                        that.validateOtherField = !ret;
                        return ret;
                    };
                    return validator;
                }
                greaterThanVekValidator(formName) {
                    var that = this;
                    var validator = new Gordic.Validators.Base();
                    validator.getMessage = (value) => {
                        return "Věk od musí být menší než věk do";
                    };
                    validator.validate = (value, source) => {
                        var parents = $(source).parents();
                        let vekOdField = parents.findForms(formName).findFields("vek_od");
                        let vekDoField = parents.findForms(formName).findFields("vek_do");
                        if (!vekOdField.gfield("hasValue") || !vekDoField.gfield("hasValue"))
                            return true;
                        var vekOd = vekOdField.gfield("getValue");
                        var vekDo = vekDoField.gfield("getValue");
                        let ret = vekOd <= vekDo;
                        // pokud se nebude validovat druhé políčko, 
                        // je možné že když se opraví první, druhé zůstane 'nevalidní'
                        if (that.validateOtherField) {
                            that.validateOtherField = false;
                            that.getOtherField(source, "vek").gfield("validate");
                        }
                        that.validateOtherField = !ret;
                        return ret;
                    };
                    return validator;
                }
                getOtherField(field, nazev) {
                    var parents = $(field).parents();
                    let field1 = parents.findFields(nazev + "_od");
                    let field2 = parents.findFields(nazev + "_do");
                    if (field[0] === field1[0])
                        return field2;
                    else
                        return field1;
                }
                //#endregion
                //#region Asynchronní akce
                // Obsluha asynchronních akcí ROB
                TaskStartHromAkce(data, model, nazevAkce) {
                    var that = this;
                    var cnt = $.content();
                    that.showFlash("Dokud beží asynchronní akce, nelze manipulovat s daty ROB", "warning", "asyncWarning");
                    var asyncClassName = "Gordic.Ddp.Server.LK.Async.GDdpHromAkceROBAsyncTask";
                    var sessionUdaje = {
                        typ_phl: that.typPhl,
                        ixp_den: that.ixpDen,
                        log_por_cislo: that.logPorCislo
                    };
                    let parametry = {
                        pripadyROB: data,
                        modelROB: model,
                        sessionUdaje: sessionUdaje,
                        nazevAkce: nazevAkce
                    };
                    let opt = { autoClean: true, clearOnFinish: true };
                    var texty = WebClient.Common.Base.textyAkci(nazevAkce);
                    var vysledekID = WebClient.Common.Base.vysledekId(texty.id);
                    cnt.notification("remove", vysledekID);
                    cnt.notification("add", // pošlu notifikaci
                    {
                        id: texty.id,
                        title: texty.title,
                        content: texty.content,
                        icon: "fa-arrow-right  g-state-text g-state-info",
                        dateTime: new Date(),
                    });
                    Gordic.Async.GTaskManager.start(asyncClassName, parametry, opt); // a spustím
                }
                /**
                * Zjistí zda běží asynchronní úloha ROB
                * @returns true pokud běží asynchronní úloha ROB, jinak false
                */
                beziAsyncFunkce() {
                    var tasks = Gordic.Async.GTaskManager.getAllTasks();
                    var taskName = "Gordic.Ddp.Server.LK.Async.GDdpHromAkceROBAsyncTask";
                    // Použijeme some() místo forEach pro správné vrácení hodnoty
                    return tasks.some(task => {
                        // Je spuštěna asynchronní úloha ROB?
                        return task.className == taskName && task.state == 1; // state 1 = running
                    });
                }
                kontrolaAsyncFunkce() {
                    var that = this;
                    if (that.beziAsyncFunkce()) {
                        that.dialogs.alert("Probíhající operace", "Nelze spustit akci, probíhá asynchronní úloha ROB.");
                        return true;
                    }
                    else {
                        that.hideFlash("asyncWarning");
                        return false;
                    }
                }
                //#endregion
                //#region Registrace instance (pro asynchronní úlohy)
                /**
                * Register this GROBSeznam instance globally - only allows one instance at a time
                */
                registerInstance() {
                    const that = this;
                    // Initialize global registry if it doesn't exist
                    if (!window.GROBSeznamInstances) {
                        window.GROBSeznamInstances = [];
                    }
                    window.GROBSeznamInstances = [];
                    that.off('close'); // remove all existing close handlers before adding a new one (nastane pokud se změní typ pohledávky, když máme otevřeno)
                    that.on('close', () => {
                        that.unregisterInstance();
                    });
                    // Add this instance to the registry
                    window.GROBSeznamInstances.push(that);
                }
                /**
                 * Unregister this GROBSeznam instance
                 */
                unregisterInstance() {
                    const that = this;
                    that.off('close');
                    // Remove from global registry
                    if (window.GROBSeznamInstances) {
                        const instances = window.GROBSeznamInstances;
                        const index = instances.indexOf(that);
                        if (index > -1) {
                            instances.splice(index, 1);
                        }
                    }
                }
                /**
                 * Oznámení uživateli že je nutno provést kontrolní chod
                 * @param value
                 */
                setKontrolniChodProbehl(value) {
                    var that = this;
                    that.kontrolniChodProbehl = value;
                    // Update UI or notify user if needed when flag is reset
                    if (!value) {
                        // Hide any warning messages about async operations
                        that.hideFlash("asyncWarning");
                        // Show a notification that the flag was reset
                        that.showFlash("Není proveden kontrolní chod", "info", "kontrolniChodReset");
                    }
                }
            };
            GROBSeznam = __decorate([
                Decorators.gcontent
            ], GROBSeznam);
            WebClient.GROBSeznam = GROBSeznam;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1JPQlNlem5hbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdST0JTZXpuYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0Fpa0NmO0FBamtDRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0Fpa0NuQjtJQWprQ2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWlrQzdCO1FBamtDb0IsV0FBQSxTQUFTO1lBQzFCOzs7OztlQUtHO1lBRUgsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVyxTQUFRLE9BQUEsWUFBWTtnQkFBNUM7O29CQUtJLGlEQUFpRDtvQkFDakQsdUJBQWtCLEdBQVksSUFBSSxDQUFDO29CQVNuQyx5Q0FBeUM7b0JBQ3pDLHlCQUFvQixHQUFZLEtBQUssQ0FBQztvQkFDdEMsMkNBQTJDO29CQUMzQyxjQUFTLEdBQVksSUFBSSxDQUFDO29CQWlpQzFCLFlBQVk7b0JBRVoscUJBQXFCO29CQUVyQixZQUFZO2dCQUNoQixDQUFDO2dCQXBoQ0csY0FBYztvQkFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQztvQkFFOUIsa0VBQWtFO29CQUNsRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFFeEIsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7d0JBQUUsT0FBTztvQkFFdkMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMzQixJQUFJLENBQUMs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QUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDOzRCQUNiLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixDQUFDO29CQUNMLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRDs7O21CQUdHO2dCQUNJLHVCQUF1QixDQUFDLEtBQWM7b0JBQ3pDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztvQkFFbEMsd0RBQXdEO29CQUN4RCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQ1QsbURBQW1EO3dCQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO3dCQUUvQiw4Q0FBOEM7d0JBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsOEJBQThCLEVBQUUsTUFBTSxFQUFFLG9CQUFvQixDQUFDLENBQUM7b0JBQ2pGLENBQUM7Z0JBQ0wsQ0FBQzthQU1KLENBQUE7WUF4akNZLFVBQVU7Z0JBRHRCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsVUFBVSxDQXdqQ3RCO1lBeGpDWSxvQkFBVSxhQXdqQ3RCLENBQUE7UUFDTCxDQUFDLEVBamtDb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBaWtDN0I7SUFBRCxDQUFDLEVBamtDZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBaWtDbkI7QUFBRCxDQUFDLEVBamtDUyxNQUFNLEtBQU4sTUFBTSxRQWlrQ2YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1JPQlNlem5hbS50cyAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFNlem5hbSBST0IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgdmNlY2ggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMDktMTEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIFNlem5hbSBST0JcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciBWb2p0xJtjaCDEjGVjaFxyXG4gICAgICogQGRhdGUgMTEuMDkuMjAyNVxyXG4gICAgICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdST0JTZXpuYW0gZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgICAvKiogUGFyYW1ldHIgdXLEjXVqw61jw60gbyBqYWtvdSBha2NpIFJPQiBzZSBqZWRuw6EgKi9cclxuICAgICAgICBBa2NlOiBudW1iZXI7XHJcbiAgICAgICAgLyoqIFRleHQgdnLDoWNlbsO9IHBvIGluaXR1IEtuaWh5IGEgcG9obGVkw6F2a3kgKi9cclxuICAgICAgICBJbml0RXJyb3JUZXh0OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgICAgIC8qKiBQxZnDrXpuYWsgemRhIHZhbGlkb3ZhdCBkcnVow6kgcG9sw63EjWtvIGRhdHVtdSAqL1xyXG4gICAgICAgIHZhbGlkYXRlT3RoZXJGaWVsZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgLyoqIFRhYnVsa2EgUk9CICovXHJcbiAgICAgICAgZ3JpZDogSlF1ZXJ5O1xyXG4gICAgICAgIC8qKiBGaWx0ciAqL1xyXG4gICAgICAgIGZpbHRlckRhdGE6IGFueTtcclxuICAgICAgICAvKiogVsSbayBvZCAqL1xyXG4gICAgICAgIHZla09kOiBudW1iZXI7XHJcbiAgICAgICAgLyoqIFbEm2sgZG8gKi9cclxuICAgICAgICB2ZWtEbzogbnVtYmVyO1xyXG4gICAgICAgIC8qKiBQxZnDrXpuYWsgemRhIHByb2LEm2hsIGtvbnRyb2xuw60gY2hvZCAqL1xyXG4gICAgICAgIGtvbnRyb2xuaUNob2RQcm9iZWhsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgLyoqIFDFmcOtem5hayB6ZGEgamUgdG8gcHJ2bsOtIG5hxI10ZW7DrSBkYXQgICovXHJcbiAgICAgICAgZmlyc3RMb2FkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICAvKiogRGVmZmVyZWQgcHJvIGluY2lhbGl6YcSNbsOtIG5hc3RhdmVuw60gUk9CICovXHJcbiAgICAgICAgZGVmOiBKUXVlcnlEZWZlcnJlZDxhbnk+O1xyXG4gICAgICAgIC8qKiBQYXJhbWV0cnkgKi9cclxuICAgICAgICBwYXJhbXM6IGFueTtcclxuICAgICAgICAvKiogVHlwIHBvaGxlZMOhdmt5ICovXHJcbiAgICAgICAgdHlwUGhsOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIEtuaWhhICovXHJcbiAgICAgICAgaXhwRGVuOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIFJvayBrbmloeSAqL1xyXG4gICAgICAgIHJva0RlbjogbnVtYmVyO1xyXG4gICAgICAgIC8qKiBQb8WZYWRvdsOpIMSNw61zbG8gKi9cclxuICAgICAgICBsb2dQb3JDaXNsbzogbnVtYmVyO1xyXG4gICAgICAgIC8qKiBSZcW+aW0gxI10ZW7DrSAqL1xyXG4gICAgICAgIHJlemltQ3Rlbmk6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqIG1hc2thIFZTIG5hIHR5cHUgcG9obGVkw6F2a3kgKi9cclxuICAgICAgICBtYXNrYVZTOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC50aXRsZSA9IFwiUk9CXCI7XHJcbiAgICAgICAgICAgIHRoYXQudGFza0lkID0gXCJhY3RHUk9CU2V6bmFtXCI7XHJcblxyXG4gICAgICAgICAgICAvLyBSZWdpc3RlciB0aGlzIGluc3RhbmNlIGdsb2JhbGx5IGZvciBjb21tdW5pY2F0aW9uIHdpdGggR01haW5BcHBcclxuICAgICAgICAgICAgdGhhdC5yZWdpc3Rlckluc3RhbmNlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5rb250cm9sYUFzeW5jRnVua2NlKCkpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB0aGF0Lm5hc3RhdkFrY2kodGhhdC5Ba2NlKTtcclxuICAgICAgICAgICAgdGhhdC5kZWYuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNyZWF0ZUZpbHRlcigpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNyZWF0ZU1lbnUoKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZ3JpZCA9IHRoYXQuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgLy90aGF0LnNldFJlemltQ3RlbmkoKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIERkcC5XZWJDbGllbnQuQ29tbW9uLkJhc2UuRGRwRWtvSW5pdCh0aGF0LCB0aGF0LkluaXRFcnJvclRleHQpO1xyXG4gICAgICAgICAgICBDb21tb24uQmFzZS5zZXREYXRlQm94U2hvcnRjdXRzKHRoYXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU3B1c3TDrSBwcm8gdXLEjWl0b3UgYWtjaSBwcm9jZWR1cnUsIGt0ZXLDoSB2bG/FvsOtIGRvIHRhYnVsa3kgcMWZw61zbHXFoW7DqSB6w6F6bmFteVxyXG4gICAgICAgICAqIEBwYXJhbSBha2NlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBuYXN0YXZBa2NpKGFrY2U6IG51bWJlcikge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoYWtjZSkgeyBcclxuICAgICAgICAgICAgICAgIGNhc2UgMTAwOiAvLyBTdGF2IGsgZGF0dVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc3RhdktEYXR1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIwMDogLy8gWmppxaF0xJtuw60gem3Em24gXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC56YWRhbmlEYXRhUk9CKDIwMCwgXCJaamnFoXTEm27DrSB6bcSbblwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzAwOiAvLyBQxZnDrXLFr3N0a3kgdiBST0JcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnphZGFuaURhdGFST0IoMzAwLCBcIlDFmcOtcsWvc3RreSB2IFJPQlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDAwOiAvLyDDmmJ5dGt5IHYgUk9CXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC56YWRhbmlEYXRhUk9CKDQwMCwgXCLDmmJ5dGt5IHYgUk9CXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNyZWdpb24gRm9ybXVsw6HFmWUgYWtjw61cclxuICAgICAgICAvKiogUk9CIC0gc3RhdiBrIGRhdHUgKi9cclxuICAgICAgICBzdGF2S0RhdHUoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGdyZWF0ZXJUaGFuVmVrVmFsaWRhdG9yID0gdGhhdC5ncmVhdGVyVGhhblZla1ZhbGlkYXRvcihcInN0YXZGb3JtXCIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHZhbGlkYXRvcnNWZWsgPSBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJhbmdlKHsgbWluOiAwLCBtYXg6IDEzNiB9KV07XHJcbiAgICAgICAgICAgIHZhbGlkYXRvcnNWZWsucHVzaChncmVhdGVyVGhhblZla1ZhbGlkYXRvcik7XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwic3RhdkZvcm1cIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTMtOS0wXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiWmFkw6Fuw60gdsSba3VcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJPZFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2ZWtfb2RcIixcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd2VkQ2hhcnM6IFwiMDEyMzQ1Njc4OSpcIixcclxuICAgICAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiB2YWxpZGF0b3JzVmVrXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRvXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZla19kb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93ZWRDaGFyczogXCIwMTIzNDU2Nzg5KlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IHZhbGlkYXRvcnNWZWtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNpbXBsZUZvcm0oXCJTdGF2IGsgZGF0dVwiLCBmb3JtKVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lnphdm9sYXROYXN0YXZlbmkoMTAwLCByZXRWYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFJPQiAtIHphZMOhbsOtIGRhdGEgKi9cclxuICAgICAgICB6YWRhbmlEYXRhUk9CKGFrY2U6IG51bWJlciwgdGl0bGU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBsZXQgZ3JlYXRlclRoYW5EYXRWYWxpZGF0b3IgPSB0aGF0LmdyZWF0ZXJUaGFuRGF0VmFsaWRhdG9yKFwiem1lbnlGb3JtXCIpO1xyXG4gICAgICAgICAgICBsZXQgZ3JlYXRlclRoYW5WZWtWYWxpZGF0b3IgPSB0aGF0LmdyZWF0ZXJUaGFuVmVrVmFsaWRhdG9yKFwiem1lbnlGb3JtXCIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHZhbGlkYXRvcnNEYXRlID0gW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXTtcclxuICAgICAgICAgICAgdmFsaWRhdG9yc0RhdGUucHVzaChncmVhdGVyVGhhbkRhdFZhbGlkYXRvcik7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsaWRhdG9yc1ZlayA9IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmFuZ2UoeyBtaW46IDAsIG1heDogMTM2IH0pXTtcclxuICAgICAgICAgICAgdmFsaWRhdG9yc1Zlay5wdXNoKGdyZWF0ZXJUaGFuVmVrVmFsaWRhdG9yKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJ6bWVueUZvcm1cIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTMtOS0wXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiRGF0dW1cIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJPZFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X29kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogdmFsaWRhdG9yc0RhdGVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRG9cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9kb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IHZhbGlkYXRvcnNEYXRlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJncmFkaW9cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX2RhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAxLCBsYWJlbDogJ2RsZSBkYXRhIHVkw6Fsb3N0aScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMiwgbGFiZWw6ICdkbGUgZGF0YSB6w6FwaXN1IGRvIFJPQiAoZGF0YSB6bcSbbnkpJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogMVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiVsSba1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk9kXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZla19vZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93ZWRDaGFyczogXCIwMTIzNDU2Nzg5KlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IHZhbGlkYXRvcnNWZWtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRG9cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmVrX2RvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dlZENoYXJzOiBcIjAxMjM0NTY3ODkqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogdmFsaWRhdG9yc1Zla1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2ltcGxlRm9ybSh0aXRsZSwgZm9ybSlcclxuICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56YXZvbGF0TmFzdGF2ZW5pKGFrY2UsIHJldFZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgLyoqIFphdm9sw6EgbmFzdGF2ZW7DrSBkYXRhYsOhemUsIGRsZSB0eXB1IGFrY2UgKi9cclxuICAgICAgICB6YXZvbGF0TmFzdGF2ZW5pKGFrY2U6IG51bWJlciwgbW9kZWw6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlJPQi5uYXN0YXZlbmkoeyBha2NlOiBha2NlLCBtb2RlbDogbW9kZWwgfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZnDrSBncmlkL3Nlem5hbSBwxZnDrXBhZMWvICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCk6IEpRdWVyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1JPQkR0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiR1JPQkdyaWRcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAvL2RlZmF1bHRBY3Rpb246IHRoaXMuYWN0aW9ucy5hY3REZXRhaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyTW9kZTogXCJhdXRvXCIsIC8vIGF1dG8sIGFsbC1hdC1vbmNlLCBwYWdlZC1zeW5jLCBwYWdlZC1hc3luY1xyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IENvbW1vbi5HcmlkRm9ybWF0cy5ST0IoKSxcclxuICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25kRm9ybWF0czogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBkZXNjcmlwdGlvbjogXCJuZW5hbFwiLCBmb3JtdWxhOiAnRVFVQUxTKEBha3Rpdml0YSwgMTAwKScsIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQucmVkIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGRlc2NyaXB0aW9uOiBcImJlenptZW55X21ydHZ5XCIsIGZvcm11bGE6ICdFUVVBTFMoQGFrdGl2aXRhLCAzMDApJywgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5ibHVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGRlc2NyaXB0aW9uOiBcInptZW5hXCIsIGZvcm11bGE6ICdFUVVBTFMoQGFrdGl2aXRhLCA2MDApJywgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5ncmVlbiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBkZXNjcmlwdGlvbjogXCJuYWxcIiwgZm9ybXVsYTogJ0VRVUFMUyhAYWt0aXZpdGEsIDkwMCknLCB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LmJsYWNrIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIEFrY2UgYSBtZW51XHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIHBvbG/FvmVrIHYgbWVudWJhcnUqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBsZXQgbWVudTogTWVudVBhcmFtc1tdID0gW107XHJcblxyXG4gICAgICAgICAgICBtZW51LnB1c2goXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdEtvbnRyb2xhLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3REZXRhaWwsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFZ5Y2lzdGl0LCBmYXZvcml0ZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0UG9kYW5pLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RUaXNrLCBmYXZvcml0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwic3RhdGljXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkhyb21hZG7DqSBha2NlXCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiB0aGF0LmNyZWF0ZUNoaWxkcmVuSHJvbWFkbmVBa2NlKClcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0Lm1lbnVCYXIobWVudSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gYWtjw60gcHJvIHBvbG/Fvmt5IHYgbWVudWJhcnUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3RLb250cm9sYToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEtvbnRyb2xhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiS29udHJvbGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJLb250cm9sbsOtIGNob2RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5rb250cm9sYUFzeW5jRnVua2NlKCkpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQua29udHJvbG5pQ2hvZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdERldGFpbDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdERldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk90ZXbFmWUgZGV0YWlsIHDFmcOtcGFkdSBERFBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByb3cgPSB0aGF0LmdyaWQ/LmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyAhPSB1bmRlZmluZWQgJiYgcm93Lml4cCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tbW9uLlByaXBhZHkub3BlblByaXBhZERldGFpbCh0aGlzLCByb3cuaXhwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0VnljaXN0aXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RWeWNpc3RpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlZ5xI1pc3RpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlZ5bWHFvmUgdsO9c2xlZGt5IG5hc3RhdmVuw60geiBkYXRhYsOhemVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5rb250cm9sYUFzeW5jRnVua2NlKCkpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudnljaXN0aXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0UG9kYW5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0UG9kYW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUG9kw6Fuw61cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJaYWxvxb5lbsOtIG5vdsOpaG8gcG9wbGF0bsOta2FcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhhdC5wYXJhbXMuZGRwX3JhZF9kb2twb2QgJiYgIXRoYXQucmV6aW1DdGVuaSwgLy8gUG9rdWQgamUgcmXFvmltIMSNdGVuw60gdGFrIGplIHbFvmR5IGRpc2FibGVkLCBqaW5hayBkbGUgcGFyYW1ldHJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQua29udHJvbGFBc3luY0Z1bmtjZSgpKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBvZGFuaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RUaXNrOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlRpc2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5rb250cm9sYUFzeW5jRnVua2NlKCkpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGlzaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZllbsOtIHBvbG/FvmVrIGRvIG1lbnUgJ0hyb21hZG7DqSBha2NlJ1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ2hpbGRyZW5Icm9tYWRuZUFrY2UoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlQWN0aW9uID0gKG5hbWU6IHN0cmluZywgY2FwdGlvbjogc3RyaW5nLCBlbmFibGVkOiBib29sZWFuLCBoYW5kbGVyPzogKCkgPT4gdm9pZCkgPT4gKHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5rb250cm9sYUFzeW5jRnVua2NlKCkpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlcj8uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBtZW51SXRlbXMgPSBbXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVBY3Rpb24oXCJhY3RIcm9tUG9kU2FiXCIsIFwiSHJvbWFkbsOpIHphbG/FvmVuw60gcMWZw61wYWR1IHplIMWhYWJsb255XCIsICF0aGF0LnJlemltQ3RlbmksICgpID0+IHRoYXQuaHJvbVBvZFNhYigpKSxcclxuICAgICAgICAgICAgICAgIHsgaWQ6IFwic3RhdHVzU2VwYXJhdG9yMFwiLCB0eXBlOiBcInNlcGFyYXRvclwiIH0sXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVBY3Rpb24oXCJhY3RIcm9tQWt0XCIsIFwiSHJvbWFkbsOpIHDFmWV2emV0w60gYWRyZXNuw61jaCDDumRhasWvIC0gem3Em25cIiwgIXRoYXQucmV6aW1DdGVuaSwgKCkgPT4gdGhhdC5ocm9tYWRuYUFrdHVhbGl6YWNlKCkpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlQWN0aW9uKFwiYWN0SHJvbVByaXJcIiwgXCJIcm9tYWRuw6kgemFsb8W+ZW7DrSBrYXJldCAtIHDFmcOtcnVzdGvFr1wiLCAhdGhhdC5yZXppbUN0ZW5pLCAoKSA9PiB0aGF0Lmhyb21hZG5lWmFsb3plbmlOb3Z5Y2goKSksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVBY3Rpb24oXCJhY3RIcm9tVWJ5XCIsIFwiSHJvbWFkbsOpIHZ5xZnDrXplbsOtIGthcmV0IC0gw7pieXRrxa9cIiwgIXRoYXQucmV6aW1DdGVuaSwgKCkgPT4gdGhhdC5ocm9tYWRuZVZ5cml6ZW5pVWJ5dGt1KCkpXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbWVudUl0ZW1zIGFzIE1lbnVQYXJhbXNbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFrDrXNrw6EgZGF0YSBwcm8gdGFidWxrdSBkbGUgZmlsdHJ1XHJcbiAgICAgICAgICogQHBhcmFtIGZpbHRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHppc2tlakRhdGEoZmlsdGVyOiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwibmFjaXRhbmlcIiwgdGV4dDogXCJOYcSNw610w6Fuw60gZGF0Li4uXCIgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlJPQi5saXN0KHsgZmlsdGVyczogZmlsdGVyIH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZSgoZHRvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkdG8uZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5maXJzdExvYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5rb250cm9sbmlDaG9kKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpcnN0TG9hZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJuYWNpdGFuaVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBGaWx0clxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBmaWx0cnUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZpbHRlcigpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBmb3JtdWxhcmU6IGFueSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9ybXVsYXJlLnB1c2goXHJcbiAgICAgICAgICAgICAgICB0aGF0LmNyZWF0ZUZpbHRlckZvcm0oKSAgICAgICAgICBcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmaWx0ZXJwYW5lbChcclxuICAgICAgICAgICAgICAgICAgICAvLyEgVnl0dm/FmWVuw60gc3RhbmRhcmRuw61jaCBwYXJhbWV0csWvIGZpbHRlcnBhbmVsdSBwcm8gRUtPIG1vZHVseVxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uRmlsdGVycy5nZXRGaWx0ZXJQYXJhbXM8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdST0JGaWx0ZXI+KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtdWxhcmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtdLCAvLyBvYmzDrWJlbsOpIGZpbHRyeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRkcF9wdG1fc2V6cm9iXCIsIC8vIHTDqW1hIHRpc2t1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsIC8vXCJpeHNfZnVuX2FrdFwiLCAvL3Nsb3VwZWMgeiBEVE8gcHJvIGZpbHRyIFwiKnZsYXN0bsOtXCIgbmVibyBudWxsLCBwb2t1ZCBuZW3DoSBiw710XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChldmVudCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbHRlckRhdGEgPSBvYmouZmlsdGVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56aXNrZWpEYXRhKG9iai5maWx0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBudWxsLCAvLyBwZXZuw70gZmlsdHJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSwgLy8gbmF2aWfDoXRvciB2IGRldGFpbHUgZmlsdHJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQgLy9wYXJlbnRDb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm/FmWVuw60gZm9ybXVsw6HFmWUgZG8gZmlsdHJ1IC0gVnltw6Fow6Fuw61cclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyRm9ybSgpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciByYWRPYmwgPSB0aGF0Lmdsb2JhbFNldHRpbmdzIS5nZXQoXCJHbG9iYWwuRGRwLlJhZE9ibFNldHRpbmdzLnJhZF9vYmxfbFwiICsgdGhhdC5peHBEZW4gKyB0aGF0LnR5cFBobCk7XHJcbiAgICAgICAgICAgIHZhciBjdHZPYmwgPSB0aGF0Lmdsb2JhbFNldHRpbmdzIS5nZXQoXCJHbG9iYWwuRGRwLk9ibGliZW5lQ3R2cnRpU2V0dGluZ3MuY3R2X29ibF9sXCIgKyB0aGF0Lml4cERlbiArIHRoYXQudHlwUGhsKTtcclxuICAgICAgICAgICAgdmFyIHJhZE9ibEFycmF5OiBudW1iZXJbXSA9IHJhZE9ibCA/IHJhZE9ibC5zcGxpdCgnLCcpLm1hcCgoaXRlbTogc3RyaW5nKSA9PiBwYXJzZUludChpdGVtLnRyaW0oKSwgMTApKSA6IFtdO1xyXG4gICAgICAgICAgICB2YXIgY3R2T2JsQXJyYXk6IG51bWJlcltdID0gY3R2T2JsID8gY3R2T2JsLnNwbGl0KCcsJykubWFwKChpdGVtOiBzdHJpbmcpID0+IHBhcnNlSW50KGl0ZW0udHJpbSgpLCAxMCkpIDogW107XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcIlJPQlwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgZm9ybS5hZGRSb3coXCJUeXAgem3Em255XCIpIFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5yb2JjZXN1KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF96bWVueVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnR5cF96bWVueT12YWx1ZS50eXBfem1lbnlcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVHlwIEVTVVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luY2VzdSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfZXN1XCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVHlwIHBvYnl0dVwiKSAvL3JvYmN0cG9cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnJvYmN0cG8oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3BvYnl0dVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlLEjFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUm9kbmVDaXNsbyh7fSldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkptw6lub1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJqbWVub1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlDFmcOtam1lbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaWptZW5pXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVWxpY2VcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWxpY2VcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJNxJtzdHNrw6EgxI3DoXN0XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1lc3Rza2FfY2FzdFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIsSMw6FzdCBvYmNlXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNhc3Rfb2JjZVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk9iZWNcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwib2JlY1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlN0w6F0XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXRcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVsSbayBvZFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2ZWtfb2RcIixcclxuICAgICAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogbnVsbFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJWxJtrIGRvXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZla19kb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBudWxsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIG5hcm96ZW7DrSBvZFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X25hcl9vZFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIG5hcm96ZW7DrSBkb1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X25hcl9kb1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIsWYw6FkZWtcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmNpc2VsbmlrUmFka3UoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGRwX3JhZGVrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuZGRwX3JhZGVrPXZhbHVlLmRkcF9yYWRla1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGRwX3JhZGVrOiByYWRPYmxBcnJheSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2RlbjogdGhhdC5peHBEZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9waGw6IHRoYXQudHlwUGhsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCLEjHR2csWlXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5jaXNlbG5pa0N0dnJ0aSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZHBfY3R2cnRcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5kZHBfY3R2cnQ9dmFsdWUuZGRwX2N0dnJ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZHBfY3R2cnQ6IGN0dk9ibEFycmF5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBfZGVuOiB0aGF0Lml4cERlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobDogdGhhdC50eXBQaGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJub3ZfYWRyX3ByaXNcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJIbGVkYXQgZGxlIG5vdsOpIGFkcmVzeSAodSBvc29iIHNlIHptxJtub3UgYWRyZXN5KVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJvemxpc292YXRfdmVsaWtvc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJSb3psacWhb3ZhdCB2ZWxpa29zdCBww61zbWVuXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGlhX2lnbm9yZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIklnbm9yb3ZhdCBkaWFrcml0aWt1XCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiem9icl92bGFzdG5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiWm9icmF6aXQgcG91emUgdmxhc3Ruw60gcMWZw61wYWR5XCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiPGI+QmV6IHptxJtueTwvYj5cIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJiZXp6bWVueV9tcnR2eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIjxzcGFuIGNsYXNzPSdnZ3JpZC1jb25kZi10ZXh0LWJsdWUnPk9kc3TEm2hvdmFuw70gbmVibyBtcnR2w71cIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuZW5hbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIjxzcGFuIGNsYXNzPSdnZ3JpZC1jb25kZi10ZXh0LXJlZCc+TmVuYWxlemVuw6k8L3NwYW4+XCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiem1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCI8c3BhbiBjbGFzcz0nZ2dyaWQtY29uZGYtdGV4dC1ncmVlbic+Wm3Em27Em27DqTwvc3Bhbj5cIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIEtvbnRyb2xuw60gY2hvZFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNwdXN0w60ga29udHJvbG7DrSBjaG9kXHJcbiAgICAgICAgICogQHBhcmFtIGRpYWxvZyBQYXJhbWV0ciBjbyB1csSNw60gemRhIHNlIG3DoSB6b2JyYXppdCBwb3R2cnplbsOtIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGtvbnRyb2xuaUNob2QoZGlhbG9nOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBmaWx0ZXI6IGFueSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgZmlsdGVyLnJvYl9jaGtfdWxpY2UgPSB0aGF0Lmdsb2JhbFNldHRpbmdzPy5nZXQoXCJHbG9iYWwuRGRwLlJPQlNldHRpbmdzLnJvYl9jaGtfdWxpY2VcIikgPz8gdHJ1ZTtcclxuICAgICAgICAgICAgZmlsdGVyLnJvYl9jaGtfY3BvcCA9IHRoYXQuZ2xvYmFsU2V0dGluZ3M/LmdldChcIkdsb2JhbC5EZHAuUk9CU2V0dGluZ3Mucm9iX2Noa19jcG9wXCIpID8/IHRydWU7XHJcbiAgICAgICAgICAgIGZpbHRlci5yb2JfY2hrX2NvciA9IHRoYXQuZ2xvYmFsU2V0dGluZ3M/LmdldChcIkdsb2JhbC5EZHAuUk9CU2V0dGluZ3Mucm9iX2Noa19jb3JcIikgPz8gdHJ1ZTtcclxuICAgICAgICAgICAgZmlsdGVyLnJvYl9jaGtfY29iY2UgPSB0aGF0Lmdsb2JhbFNldHRpbmdzPy5nZXQoXCJHbG9iYWwuRGRwLlJPQlNldHRpbmdzLnJvYl9jaGtfY29iY2VcIikgPz8gdHJ1ZTtcclxuICAgICAgICAgICAgZmlsdGVyLnJvYl9jaGtfbWNhc3QgPSB0aGF0Lmdsb2JhbFNldHRpbmdzPy5nZXQoXCJHbG9iYWwuRGRwLlJPQlNldHRpbmdzLnJvYl9jaGtfbWNhc3RcIikgPz8gdHJ1ZTtcclxuICAgICAgICAgICAgZmlsdGVyLnJvYl9jaGtfb2JlYyA9IHRoYXQuZ2xvYmFsU2V0dGluZ3M/LmdldChcIkdsb2JhbC5EZHAuUk9CU2V0dGluZ3Mucm9iX2Noa19vYmVjXCIpID8/IHRydWU7XHJcbiAgICAgICAgICAgIGZpbHRlci5yb2JfY2hrX3BzYyA9IHRoYXQuZ2xvYmFsU2V0dGluZ3M/LmdldChcIkdsb2JhbC5EZHAuUk9CU2V0dGluZ3Mucm9iX2Noa19wc2NcIikgPz8gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIGlmIChkaWFsb2cpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFwiS29udHJvbGFcIiwgXCJDaGNldGUgcHJvdsOpc3Qga29udHJvbG7DrSBjaG9kP1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2UgZGVmLnJlc29sdmUoKTtcclxuXHJcbiAgICAgICAgICAgIGRlZi5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJrb250cm9sYVwiLCB0ZXh0OiBcIlByb2LDrWjDoSBrb250cm9sbsOtIGNob2QuLi5cIiB9KTtcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLlJPQi5rb250cm9sYSh7IHVzZXJTZXR0aW5nczogZmlsdGVyIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldCgpLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmtvbnRyb2xuaUNob2RQcm9iZWhsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5oaWRlRmxhc2goXCJrb250cm9sbmlDaG9kUmVzZXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmZpbHRlckRhdGEpIHRoYXQuemlza2VqRGF0YSh0aGF0LmZpbHRlckRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcImtvbnRyb2xhXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvLyNyZWdpb24gVnnEjWnFoXTEm27DrVxyXG4gICAgICAgIHZ5Y2lzdGl0KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwidnljaXN0ZW5pXCIsIHRleHQ6IFwiUHJvYsOtaMOhIHZ5xI1pxaF0xJtuw60uLi5cIiB9KTtcclxuICAgICAgICAgICAgdGhhdC5pc2wuUk9CLnNtYXphdFJvYnRlc3UoKS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuemlza2VqRGF0YSh0aGF0LmZpbHRlckRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwidnljaXN0ZW5pXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIFBvZMOhbsOtIChOb3bDvSlcclxuXHJcbiAgICAgICAgLyoqIFphbG/FvmVuw60gbm92w6lobyBwxZnDrXBhZHUgZGxlIMO6ZGFqxa8gUk9CICAqL1xyXG4gICAgICAgIHBvZGFuaSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCByb3cgPSB0aGF0LmdyaWQ/LmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICBpZiAocm93ICE9IHVuZGVmaW5lZCAmJiByb3cuYWt0aXZpdGEgPT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVmUG9kYW5pID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgLy8ga29udHJvbGEgbmEgZXhpc3RlbmNpIHN0ZWpuw6lobyBSxIxcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LnBhcmFtcy5kZHBfZXN1X2NoZWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy5yYyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJrb250cm9sYV9yY1wiLCB0ZXh0OiBcIlByb2LDrWjDoSBrb250cm9sYSBSxIwuLi5cIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuRGRwSW50ZXJmYWNlTmV3LnJjSmVKaXpFdmlkb3Zhbm8oeyBpeHA6IFwiWFhYWFhYWFhYWFhYXCIsIHJjOiByb3cucmMsIHR5cFBobDogXCJcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpLmRvbmUoKHJlc3VsdDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmNvbmZpcm0oXCJSxIxcIiwgXCJWeWJyYW7DqSBSxIwgamUgamnFviB2IHRvbXRvIHR5cHUgcG9obGVkw6F2a3kgamnFviBldmlkb3bDoW5vLCBjaGNldGUgcG9rcmHEjW92YXQgdiB6YWtsw6Fkw6Fuw60gbm92w6lobyBwxZnDrXBhZHU/XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZQb2RhbmkucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBkZWZQb2RhbmkucmVqZWN0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmUG9kYW5pLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwia29udHJvbGFfcmNcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGRlZlBvZGFuaS5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgZGVmUG9kYW5pLnJlc29sdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZQb2RhbmkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFrdHVhbGl6YWNlRXN1ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlZkV2aWRlbmVjZUVTVSA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwia29udHJvbGFfZXN1XCIsIHRleHQ6IFwiUHJvYsOtaMOhIGtvbnRyb2xhIGV2aWRlbmNlIEVTVS4uLlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlJPQi5kb2hsZWRhbmlFU1UoeyBpeHNPc286IHJvdy5peHNfb3NvLCByYzogXCJcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KCkuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PSAxMikgLy8gdmFsaWRuw60gZXN1IG5hbGV6ZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShcIkFrdHVhbGl6YWNlXCIsIFwiRXh0ZXJuw60gc3ViamVrdCBqZSBqacW+IGV2aWRvdsOhbiwgY2hjZXRlIHUgbsSbaiBha3R1YWxpem92YXQgw7pkYWplIGRsZSBST0I/XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBha3R1YWxpemFjZUVzdSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmRXZpZGVuZWNlRVNVLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWt0dWFsaXphY2VFc3UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZkV2aWRlbmVjZUVTVS5yZXNvbHZlKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBkZWZFdmlkZW5lY2VFU1UucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJrb250cm9sYV9lc3VcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmRXZpZGVuZWNlRVNVLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwicG9kYW5pXCIsIHRleHQ6IFwiUHJvYsOtaMOhIHpha2zDoWTDoW7DrSBub3bDqWhvIHDFmcOtcGFkdS4uLlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5QcmlwYWQuY3JlYXRlKChycSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBfZGVuOiB0aGF0Lml4cERlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdpbl9nZW5fbW9kZTogXCJhbm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9yb2I6IHJvdy5peHNfb3NvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWt0dWFsaXphY2VfZXN1OiBha3R1YWxpemFjZUVzdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb21tb24uUHJpcGFkeS5vcGVuUHJpcGFkRGV0YWlsKHRoYXQsIGRhdGEuRHRvIS5peHAhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoanFYSFIsIHR5cCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9uxJtjbyBzZSBwb2themlsbywgdnLDoXTDrW0gaGzDocWha3UgbyBkxa92b2R1IG5lw7pzcMSbY2h1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cCA9PT0gXCJleGNlcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNoeWJhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouYmFzZU1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJwb2RhbmlcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuYWxlcnQoXCJQb2TDoW7DrVwiLCBcIk5vdsO9IHDFmcOtcGFkIGx6ZSB6YWxvxb5pdCBwb3V6ZSBwcm8gb3NvYnksIHBybyBrdGVyw6kgamXFoXTEmyBwxZnDrXBhZCBuZWV4aXN0dWplISBcXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIlBva3VkIHDFmcOtcGFkIGppxb4gZXhpc3R1amUsIHBva3JhxI11anRlIHByb3PDrW0gem9icmF6ZW7DrW0gZGV0YWlsdSBhIHBvxZnDrXplbsOtbSBwxZnDrXNsdcWhbsO9Y2ggem3Em24gbmEgZXhpc3R1asOtY8OtbSBwxZnDrXBhZHUhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvLyNyZWdpb24gSHJvbWFkbsOpIGFrY2VcclxuXHJcbiAgICAgICAgLyoqIEhyb21hZG7DqSB6YWxvxb5lbsOtIG5vdsOpaG8gcMWZw61wYWR1IGRsZSDFoWFibG9ueSAqL1xyXG4gICAgICAgIGhyb21Qb2RTYWIoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdST0JEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgZGVmZXJyZWQgb2JqZWN0cyBmb3IgZWFjaCBjb25maXJtYXRpb25cclxuICAgICAgICAgICAgY29uc3Qga29udHJvbG5pQ2hvZERlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICBjb25zdCBtYXNrYVZTRGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoYXQua29udHJvbG5pQ2hvZFByb2JlaGwpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFwiS29udHJvbG7DrSBjaG9kXCIsIFwiTmVieWwgcHJvdmVkZW4ga29udHJvbG7DrSBjaG9kLCBuZWJvIHNlIHptxJtuaWx5IGRhdGEgcG8gcHJvdmVkZW7DrSBwb3NsZWRuw61obyEgXFxuIENoY2V0ZSBwb2tyYcSNb3ZhdD9cIilcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09IFwieWVzXCIpIGtvbnRyb2xuaUNob2REZWZlcnJlZC5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uga29udHJvbG5pQ2hvZERlZmVycmVkLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uga29udHJvbG5pQ2hvZERlZmVycmVkLnJlc29sdmUoKTtcclxuXHJcbiAgICAgICAgICAgIGtvbnRyb2xuaUNob2REZWZlcnJlZC5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0Lm1hc2thVlMgJiYgdGhhdC5tYXNrYVZTLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShcIk1hc2thIFZTXCIsIFwiTmEgdHlwdSBwb2hsZWTDoXZreSBuZW7DrSBuYXN0YXZlbmEgbWFza2EgcHJvIGdlbmVyb3bDoW7DrSBWUyAtIFZTIHNlIHZ5Z2VuZXJ1amUgYcW+IHDFmWkgZXZpZGVuY2kgcMWZw61wYWR1ISBcXG4gQ2hjZXRlIHBva3JhxI1vdmF0P1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PSBcInllc1wiKSBtYXNrYVZTRGVmZXJyZWQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBtYXNrYVZTRGVmZXJyZWQucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrYVZTRGVmZXJyZWQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIG1hc2thVlNEZWZlcnJlZC5yZWplY3QoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBtYXNrYVZTRGVmZXJyZWQuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgd2luZG93T3B0aW9uID0geyB0aXRsZTogYFBvZMOhbsOtIHplIMWhYWJsb255YCwgd2lkdGg6IDQ5MCwgaGVpZ2h0OiAzNTAgfTsgLy9uYXN0YXZlbsOtIG9rbmEgLSB0aXR1bGVrIHNlIG7DoXNsZWRuxJsgem3Em27DrSBkbGUgbmFzdGF2ZW7DrSB2IG9rbsSbXHJcbiAgICAgICAgICAgICAgICB2YXIgUGFyYW1KU09OID0geyBJRDogXCJERFBHUHJpcGFkUG9kYW5pWmVTYWJsb255I1wiLCB6b2JyYXpfdnliZXJfZXN1OiBmYWxzZSwgcm9iOiB0cnVlIH07IC8vcMWZZW7DocWhZW7DqSBwYXJhbWV0cnlcclxuICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HUHJpcGFkUG9kYW5pWmVTYWJsb255XCIsIFBhcmFtSlNPTiwgd2luZG93T3B0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsOiBEZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkRGF0YVByb1NhYmxvbnVEdG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbC5peHNfZHNhID09IENvbW1vbi5HbG9iYWxzLnNnTnVsbC5udWxsU2FibG9ueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vPz8gcG9kYW5pIGJleiDFoWFibG9ueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlRhc2tTdGFydEhyb21Ba2NlKHNlbGVjdGlvbiwgcmV0VmFsLCBcIkhyb21Qb2RTYWJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmEgcMWZaSBwb2TDoW7DrSBwxZnDrXBhZHVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogSHJvbWFkbsOpIHDFmWV2emV0w60gYWRyZXNuw61jaCDDumRhasWvIC0gem3Em24gKi9cclxuICAgICAgICBocm9tYWRuYUFrdHVhbGl6YWNlKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUk9CRHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPT0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qga29udHJvbG5pQ2hvZERlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGF0LmtvbnRyb2xuaUNob2RQcm9iZWhsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShcIktvbnRyb2xuw60gY2hvZFwiLCBcIk5lYnlsIHByb3ZlZGVuIGtvbnRyb2xuw60gY2hvZCwgbmVibyBzZSB6bcSbbmlseSBkYXRhIHBvIHByb3ZlZGVuw60gcG9zbGVkbsOtaG8hIFxcbiBDaGNldGUgcG9rcmHEjW92YXQ/XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PSBcInllc1wiKSBrb250cm9sbmlDaG9kRGVmZXJyZWQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGtvbnRyb2xuaUNob2REZWZlcnJlZC5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGtvbnRyb2xuaUNob2REZWZlcnJlZC5yZXNvbHZlKCk7XHJcblxyXG4gICAgICAgICAgICBrb250cm9sbmlDaG9kRGVmZXJyZWQuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBBa3R1YWxpem92YXQgYWRyZXNuw60gw7pkYWplXHJcbiAgICAgICAgICAgICAgICB0aGF0LlRhc2tTdGFydEhyb21Ba2NlKHNlbGVjdGlvbiwge30sIFwiSHJvbUFrdFwiKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBIcm9tYWRuw6kgemFsb8W+ZW7DrSBrYXJldCAtIHDFmcOtcnVzdGvFryAqL1xyXG4gICAgICAgIGhyb21hZG5lWmFsb3plbmlOb3Z5Y2goKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdST0JEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgZGVmZXJyZWQgb2JqZWN0cyBmb3IgZWFjaCBjb25maXJtYXRpb25cclxuICAgICAgICAgICAgY29uc3Qga29udHJvbG5pQ2hvZERlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICBjb25zdCBtYXNrYVZTRGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoYXQua29udHJvbG5pQ2hvZFByb2JlaGwpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFwiS29udHJvbG7DrSBjaG9kXCIsIFwiTmVieWwgcHJvdmVkZW4ga29udHJvbG7DrSBjaG9kLCBuZWJvIHNlIHptxJtuaWx5IGRhdGEgcG8gcHJvdmVkZW7DrSBwb3NsZWRuw61obyEgXFxuIENoY2V0ZSBwb2tyYcSNb3ZhdD9cIilcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09IFwieWVzXCIpIGtvbnRyb2xuaUNob2REZWZlcnJlZC5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uga29udHJvbG5pQ2hvZERlZmVycmVkLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uga29udHJvbG5pQ2hvZERlZmVycmVkLnJlc29sdmUoKTtcclxuXHJcbiAgICAgICAgICAgIGtvbnRyb2xuaUNob2REZWZlcnJlZC5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0Lm1hc2thVlMgJiYgdGhhdC5tYXNrYVZTLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShcIk1hc2thIFZTXCIsIFwiTmEgdHlwdSBwb2hsZWTDoXZreSBuZW7DrSBuYXN0YXZlbmEgbWFza2EgcHJvIGdlbmVyb3bDoW7DrSBWUyAtIFZTIHNlIHZ5Z2VuZXJ1amUgYcW+IHDFmWkgZXZpZGVuY2kgcMWZw61wYWR1ISBcXG4gQ2hjZXRlIHBva3JhxI1vdmF0P1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PSBcInllc1wiKSBtYXNrYVZTRGVmZXJyZWQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBtYXNrYVZTRGVmZXJyZWQucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrYVZTRGVmZXJyZWQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIG1hc2thVlNEZWZlcnJlZC5yZWplY3QoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBtYXNrYVZTRGVmZXJyZWQuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnJvYkhyb21QYXJhbShzZWxlY3Rpb24sIFwiMFwiKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBIcm9tYWRuw6kgdnnFmcOtemVuw60ga2FyZXQgLSDDumJ5dGvFryAqL1xyXG4gICAgICAgIGhyb21hZG5lVnlyaXplbmlVYnl0a3UoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdST0JEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBjb25zdCBrb250cm9sbmlDaG9kRGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoYXQua29udHJvbG5pQ2hvZFByb2JlaGwpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFwiS29udHJvbG7DrSBjaG9kXCIsIFwiTmVieWwgcHJvdmVkZW4ga29udHJvbG7DrSBjaG9kLCBuZWJvIHNlIHptxJtuaWx5IGRhdGEgcG8gcHJvdmVkZW7DrSBwb3NsZWRuw61obyEgXFxuIENoY2V0ZSBwb2tyYcSNb3ZhdD9cIilcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09IFwieWVzXCIpIGtvbnRyb2xuaUNob2REZWZlcnJlZC5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uga29udHJvbG5pQ2hvZERlZmVycmVkLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uga29udHJvbG5pQ2hvZERlZmVycmVkLnJlc29sdmUoKTtcclxuXHJcbiAgICAgICAgICAgIGtvbnRyb2xuaUNob2REZWZlcnJlZC5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQucm9iSHJvbVBhcmFtKHNlbGVjdGlvbiwgXCIxXCIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIE9rbm8gcHJvIG5hc3RhdmVuw60gcGFyYW1ldHLFryBocm9tYWRuw71jaCB6bcSbbiAqL1xyXG4gICAgICAgIHJvYkhyb21QYXJhbShzZWxlY3Rpb246IGFueSwgdHlwWmFkYW5pOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHRpdGxlOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIHZhciBuYXpldkFrY2U6IHN0cmluZztcclxuICAgICAgICAgICAgaWYgKHR5cFphZGFuaSA9PSBcIjBcIikge1xyXG4gICAgICAgICAgICAgICAgdGl0bGUgPSBcIkhyb21hZG7DqSBwxZlpZMOhbsOtIGthcmV0IOKAkyBwxZnDrXJ1c3Rrxa9cIjtcclxuICAgICAgICAgICAgICAgIG5hemV2QWtjZSA9IFwiSHJvbVByaXJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cFphZGFuaSA9PSBcIjFcIikge1xyXG4gICAgICAgICAgICAgICAgdGl0bGUgPSBcIkhyb21hZG7DqSB2ecWZw616ZW7DrSBrYXJldCDigJMgw7pieXRrxa9cIjtcclxuICAgICAgICAgICAgICAgIG5hemV2QWtjZSA9IFwiSHJvbVVieVwiXHJcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgd2luZG93T3B0aW9uID0geyB0aXRsZTogdGl0bGUsIHdpZHRoOiA2NzUsIGhlaWdodDogNDUwIH07XHJcbiAgICAgICAgICAgIHZhciBQYXJhbXNKU09OID0geyBJRDogXCJERFBHUk9CSHJvbVBhcmFtI1wiLCB0eXBaYWRhbmk6IHR5cFphZGFuaSB9O1xyXG4gICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuR1JPQkhyb21QYXJhbVwiLCBQYXJhbXNKU09OLCB3aW5kb3dPcHRpb24pXHJcbiAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoZXYsIHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBva3VkIG3DoW1lIHZyw6FjZW7DvSBtb2RlbCwgc3B1c3TDrW1lIGFzeW5jaHJvbm7DrSBha2NpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gcmV0VmFsLm1vZGVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlRhc2tTdGFydEhyb21Ba2NlKHNlbGVjdGlvbiwgcmVzdWx0LCBuYXpldkFrY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvLyNyZWdpb24gVGlza1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRpc2sgcHJvdG9rb2x1IGtvbnRyb2xuaWhvIGNob2R1IHByb3RpIHJvYlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRpc2soKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFjdFRpc2sgPSBHQWN0aW9uLmNyZWF0ZVByaW50QWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1JPQlwiLFxyXG4gICAgICAgICAgICAgICAgdGVtYTogXCJkZHBfcHRtX3NlenJvYlwiLFxyXG4gICAgICAgICAgICAgICAgLy8g4oaTIE1ldG9kYSwga3RlcsOhIGplIHphdm9sw6FuYSB0xJtzbsSbIHDFmWVkIGdlbmVyb3bDoW7DrW0gc2VzdGF2eSBhIGtkZSBsemUgbmEgc3RyYW7EmyBzZXJ2ZXJ1IG92bGl2bml0IHBhcmFtZXRyeSBzZXN0YXZ5IOKGk1xyXG4gICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEZHBXZWJUaXNrOlRpc2tST0JcIiwgIC8vemRlIHNlIHBsbsOtIHTDqW1hXHJcbiAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcC5jdXN0b21EdG8gPSB7ICAgLy8gcG9zw61sw6Fuw60gZGF0IG5hIHNlcnZlclBhcmFtZXRlck1ldGhvZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2JGaWx0ZXI6IHRoYXQuZmlsdGVyRGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobDogdGhhdC50eXBQaGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IHRoYXQuaXhwRGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2tfZGVuOiB0aGF0LnJva0RlblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICByZXBvcnRGaW5pc2hlZDogZnVuY3Rpb24gKCkge30sICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGRpYWxvZ0Nsb3NlZDogZnVuY3Rpb24gKCkge30gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGFjdFRpc2sucnVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvLyNyZWdpb24gVmFsaWTDoXRvcnlcclxuICAgICAgICBncmVhdGVyVGhhbkRhdFZhbGlkYXRvcihmb3JtTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHZhbGlkYXRvciA9IG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKCk7XHJcbiAgICAgICAgICAgIHZhbGlkYXRvci5nZXRNZXNzYWdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJEYXR1bSBvZCBtdXPDrSBiw710IG1lbsWhw60gbmXFviBkYXR1bSBkb1wiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YWxpZGF0b3IudmFsaWRhdGUgPSAodmFsdWUsIHNvdXJjZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudHMgPSAkKHNvdXJjZSkucGFyZW50cygpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkYXRPZEZpZWxkID0gcGFyZW50cy5maW5kRm9ybXMoZm9ybU5hbWUpLmZpbmRGaWVsZHMoXCJkYXRfb2RcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0RG9GaWVsZCA9IHBhcmVudHMuZmluZEZvcm1zKGZvcm1OYW1lKS5maW5kRmllbGRzKFwiZGF0X2RvXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghZGF0T2RGaWVsZC5nZmllbGQoXCJoYXNWYWx1ZVwiKSB8fCAhZGF0RG9GaWVsZC5nZmllbGQoXCJoYXNWYWx1ZVwiKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0T2QgPSBkYXRPZEZpZWxkLmdmaWVsZChcImdldFZhbHVlXCIpIGFzIERhdGU7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0RG8gPSBkYXREb0ZpZWxkLmdmaWVsZChcImdldFZhbHVlXCIpIGFzIERhdGU7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHJldCA9IGRhdE9kIDw9IGRhdERvO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHBva3VkIHNlIG5lYnVkZSB2YWxpZG92YXQgZHJ1aMOpIHBvbMOtxI1rbywgXHJcbiAgICAgICAgICAgICAgICAvLyBqZSBtb8W+bsOpIMW+ZSBrZHnFviBzZSBvcHJhdsOtIHBydm7DrSwgZHJ1aMOpIHrFr3N0YW5lICduZXZhbGlkbsOtJ1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQudmFsaWRhdGVPdGhlckZpZWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC52YWxpZGF0ZU90aGVyRmllbGQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmdldE90aGVyRmllbGQoc291cmNlLCBcImRhdFwiKS5nZmllbGQoXCJ2YWxpZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnZhbGlkYXRlT3RoZXJGaWVsZCA9ICFyZXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdyZWF0ZXJUaGFuVmVrVmFsaWRhdG9yKGZvcm1OYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgdmFsaWRhdG9yID0gbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2UoKTtcclxuICAgICAgICAgICAgdmFsaWRhdG9yLmdldE1lc3NhZ2UgPSAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIlbEm2sgb2QgbXVzw60gYsO9dCBtZW7FocOtIG5lxb4gdsSbayBkb1wiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YWxpZGF0b3IudmFsaWRhdGUgPSAodmFsdWUsIHNvdXJjZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudHMgPSAkKHNvdXJjZSkucGFyZW50cygpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB2ZWtPZEZpZWxkID0gcGFyZW50cy5maW5kRm9ybXMoZm9ybU5hbWUpLmZpbmRGaWVsZHMoXCJ2ZWtfb2RcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmVrRG9GaWVsZCA9IHBhcmVudHMuZmluZEZvcm1zKGZvcm1OYW1lKS5maW5kRmllbGRzKFwidmVrX2RvXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdmVrT2RGaWVsZC5nZmllbGQoXCJoYXNWYWx1ZVwiKSB8fCAhdmVrRG9GaWVsZC5nZmllbGQoXCJoYXNWYWx1ZVwiKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdmVrT2QgPSB2ZWtPZEZpZWxkLmdmaWVsZChcImdldFZhbHVlXCIpIGFzIE51bWJlcjtcclxuICAgICAgICAgICAgICAgIHZhciB2ZWtEbyA9IHZla0RvRmllbGQuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgYXMgTnVtYmVyO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCByZXQgPSB2ZWtPZCA8PSB2ZWtEbztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBwb2t1ZCBzZSBuZWJ1ZGUgdmFsaWRvdmF0IGRydWjDqSBwb2zDrcSNa28sIFxyXG4gICAgICAgICAgICAgICAgLy8gamUgbW/Fvm7DqSDFvmUga2R5xb4gc2Ugb3ByYXbDrSBwcnZuw60sIGRydWjDqSB6xa9zdGFuZSAnbmV2YWxpZG7DrSdcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LnZhbGlkYXRlT3RoZXJGaWVsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudmFsaWRhdGVPdGhlckZpZWxkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5nZXRPdGhlckZpZWxkKHNvdXJjZSwgXCJ2ZWtcIikuZ2ZpZWxkKFwidmFsaWRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC52YWxpZGF0ZU90aGVyRmllbGQgPSAhcmV0O1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB2YWxpZGF0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRPdGhlckZpZWxkKGZpZWxkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+LCBuYXpldjogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJlbnRzID0gJChmaWVsZCkucGFyZW50cygpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGZpZWxkMSA9IHBhcmVudHMuZmluZEZpZWxkcyhuYXpldiArIFwiX29kXCIpO1xyXG4gICAgICAgICAgICBsZXQgZmllbGQyID0gcGFyZW50cy5maW5kRmllbGRzKG5hemV2ICsgXCJfZG9cIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmllbGRbMF0gPT09IGZpZWxkMVswXSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmaWVsZDI7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBmaWVsZDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvLyNyZWdpb24gQXN5bmNocm9ubsOtIGFrY2VcclxuICAgICAgICAvLyBPYnNsdWhhIGFzeW5jaHJvbm7DrWNoIGFrY8OtIFJPQlxyXG4gICAgICAgIFRhc2tTdGFydEhyb21Ba2NlKGRhdGE6IGFueSwgbW9kZWw6IGFueSwgbmF6ZXZBa2NlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgY250ID0gJC5jb250ZW50KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcIkRva3VkIGJlxb7DrSBhc3luY2hyb25uw60gYWtjZSwgbmVsemUgbWFuaXB1bG92YXQgcyBkYXR5IFJPQlwiLCBcIndhcm5pbmdcIiwgXCJhc3luY1dhcm5pbmdcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgYXN5bmNDbGFzc05hbWUgPSBcIkdvcmRpYy5EZHAuU2VydmVyLkxLLkFzeW5jLkdEZHBIcm9tQWtjZVJPQkFzeW5jVGFza1wiO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNlc3Npb25VZGFqZTogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAgdHlwX3BobDogdGhhdC50eXBQaGwsXHJcbiAgICAgICAgICAgICAgICBpeHBfZGVuOiB0aGF0Lml4cERlbixcclxuICAgICAgICAgICAgICAgIGxvZ19wb3JfY2lzbG86IHRoYXQubG9nUG9yQ2lzbG9cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxldCBwYXJhbWV0cnkgPSB7XHJcbiAgICAgICAgICAgICAgICBwcmlwYWR5Uk9COiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgbW9kZWxST0I6IG1vZGVsLFxyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblVkYWplOiBzZXNzaW9uVWRhamUsXHJcbiAgICAgICAgICAgICAgICBuYXpldkFrY2U6IG5hemV2QWtjZVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IG9wdDogQXN5bmMuSUdUYXNrT3B0aW9ucyA9IHsgYXV0b0NsZWFuOiB0cnVlLCBjbGVhck9uRmluaXNoOiB0cnVlIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgdGV4dHkgPSBDb21tb24uQmFzZS50ZXh0eUFrY2kobmF6ZXZBa2NlKTtcclxuICAgICAgICAgICAgdmFyIHZ5c2xlZGVrSUQgPSBDb21tb24uQmFzZS52eXNsZWRla0lkKHRleHR5LmlkKTtcclxuXHJcbiAgICAgICAgICAgIGNudC5ub3RpZmljYXRpb24oXCJyZW1vdmVcIiwgdnlzbGVkZWtJRCk7XHJcblxyXG4gICAgICAgICAgICBjbnQubm90aWZpY2F0aW9uKFwiYWRkXCIsICAvLyBwb8WhbHUgbm90aWZpa2FjaVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiB0ZXh0eS5pZCxcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGV4dHkudGl0bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogdGV4dHkuY29udGVudCxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWFycm93LXJpZ2h0ICBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVRpbWU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIEdvcmRpYy5Bc3luYy5HVGFza01hbmFnZXIuc3RhcnQoYXN5bmNDbGFzc05hbWUsIHBhcmFtZXRyeSwgb3B0KTsgLy8gYSBzcHVzdMOtbVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBaamlzdMOtIHpkYSBixJvFvsOtIGFzeW5jaHJvbm7DrSDDumxvaGEgUk9CXHJcbiAgICAgICAgKiBAcmV0dXJucyB0cnVlIHBva3VkIGLEm8W+w60gYXN5bmNocm9ubsOtIMO6bG9oYSBST0IsIGppbmFrIGZhbHNlXHJcbiAgICAgICAgKi9cclxuICAgICAgICBiZXppQXN5bmNGdW5rY2UoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciB0YXNrcyA9IEdvcmRpYy5Bc3luYy5HVGFza01hbmFnZXIuZ2V0QWxsVGFza3MoKTtcclxuICAgICAgICAgICAgdmFyIHRhc2tOYW1lID0gXCJHb3JkaWMuRGRwLlNlcnZlci5MSy5Bc3luYy5HRGRwSHJvbUFrY2VST0JBc3luY1Rhc2tcIjtcclxuXHJcbiAgICAgICAgICAgIC8vIFBvdcW+aWplbWUgc29tZSgpIG3DrXN0byBmb3JFYWNoIHBybyBzcHLDoXZuw6kgdnLDoWNlbsOtIGhvZG5vdHlcclxuICAgICAgICAgICAgcmV0dXJuIHRhc2tzLnNvbWUodGFzayA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBKZSBzcHXFoXTEm25hIGFzeW5jaHJvbm7DrSDDumxvaGEgUk9CP1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhc2suY2xhc3NOYW1lID09IHRhc2tOYW1lICYmIHRhc2suc3RhdGUgPT0gMTsgLy8gc3RhdGUgMSA9IHJ1bm5pbmdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBrb250cm9sYUFzeW5jRnVua2NlKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LmJlemlBc3luY0Z1bmtjZSgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuYWxlcnQoXCJQcm9iw61oYWrDrWPDrSBvcGVyYWNlXCIsIFwiTmVsemUgc3B1c3RpdCBha2NpLCBwcm9iw61ow6EgYXN5bmNocm9ubsOtIMO6bG9oYSBST0IuXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmhpZGVGbGFzaChcImFzeW5jV2FybmluZ1wiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIFJlZ2lzdHJhY2UgaW5zdGFuY2UgKHBybyBhc3luY2hyb25uw60gw7psb2h5KVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogUmVnaXN0ZXIgdGhpcyBHUk9CU2V6bmFtIGluc3RhbmNlIGdsb2JhbGx5IC0gb25seSBhbGxvd3Mgb25lIGluc3RhbmNlIGF0IGEgdGltZVxyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWdpc3Rlckluc3RhbmNlKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgZ2xvYmFsIHJlZ2lzdHJ5IGlmIGl0IGRvZXNuJ3QgZXhpc3RcclxuICAgICAgICAgICAgaWYgKCEod2luZG93IGFzIGFueSkuR1JPQlNlem5hbUluc3RhbmNlcykge1xyXG4gICAgICAgICAgICAgICAgKHdpbmRvdyBhcyBhbnkpLkdST0JTZXpuYW1JbnN0YW5jZXMgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgKHdpbmRvdyBhcyBhbnkpLkdST0JTZXpuYW1JbnN0YW5jZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQub2ZmKCdjbG9zZScpOyAvLyByZW1vdmUgYWxsIGV4aXN0aW5nIGNsb3NlIGhhbmRsZXJzIGJlZm9yZSBhZGRpbmcgYSBuZXcgb25lIChuYXN0YW5lIHBva3VkIHNlIHptxJtuw60gdHlwIHBvaGxlZMOhdmt5LCBrZHnFviBtw6FtZSBvdGV2xZllbm8pXHJcbiAgICAgICAgICAgIHRoYXQub24oJ2Nsb3NlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC51bnJlZ2lzdGVySW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgdGhpcyBpbnN0YW5jZSB0byB0aGUgcmVnaXN0cnlcclxuICAgICAgICAgICAgKHdpbmRvdyBhcyBhbnkpLkdST0JTZXpuYW1JbnN0YW5jZXMucHVzaCh0aGF0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVucmVnaXN0ZXIgdGhpcyBHUk9CU2V6bmFtIGluc3RhbmNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB1bnJlZ2lzdGVySW5zdGFuY2UoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5vZmYoJ2Nsb3NlJyk7IFxyXG5cclxuICAgICAgICAgICAgLy8gUmVtb3ZlIGZyb20gZ2xvYmFsIHJlZ2lzdHJ5XHJcbiAgICAgICAgICAgIGlmICgod2luZG93IGFzIGFueSkuR1JPQlNlem5hbUluc3RhbmNlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5zdGFuY2VzID0gKHdpbmRvdyBhcyBhbnkpLkdST0JTZXpuYW1JbnN0YW5jZXMgYXMgR29yZGljLkRkcC5XZWJDbGllbnQuR1JPQlNlem5hbVtdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBpbnN0YW5jZXMuaW5kZXhPZih0aGF0KTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE96bsOhbWVuw60gdcW+aXZhdGVsaSDFvmUgamUgbnV0bm8gcHJvdsOpc3Qga29udHJvbG7DrSBjaG9kXHJcbiAgICAgICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHNldEtvbnRyb2xuaUNob2RQcm9iZWhsKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5rb250cm9sbmlDaG9kUHJvYmVobCA9IHZhbHVlO1xyXG5cclxuICAgICAgICAgICAgLy8gVXBkYXRlIFVJIG9yIG5vdGlmeSB1c2VyIGlmIG5lZWRlZCB3aGVuIGZsYWcgaXMgcmVzZXRcclxuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gSGlkZSBhbnkgd2FybmluZyBtZXNzYWdlcyBhYm91dCBhc3luYyBvcGVyYXRpb25zXHJcbiAgICAgICAgICAgICAgICB0aGF0LmhpZGVGbGFzaChcImFzeW5jV2FybmluZ1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTaG93IGEgbm90aWZpY2F0aW9uIHRoYXQgdGhlIGZsYWcgd2FzIHJlc2V0XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcIk5lbsOtIHByb3ZlZGVuIGtvbnRyb2xuw60gY2hvZFwiLCBcImluZm9cIiwgXCJrb250cm9sbmlDaG9kUmVzZXRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBSZcW+aW0gxI10ZW7DrVxyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgIH1cclxufSJdfQ==
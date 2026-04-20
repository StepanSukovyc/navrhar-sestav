"use strict";
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
            /**
             * Archivace knih
             *
             * @author tkares
             * @since 484.1.0.69
            */
            let GArchivaceKnih = class GArchivaceKnih extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    //private ekoParams: Gordic.Ucr.WebClient.GEkoParamsDto;
                    this.firstLoad = true;
                    // Editovatelny gridu
                    //private editGrid: JQuery;
                    //private myForm: Gordic.Forms.Form;
                    // nastaveni id a titulku okna
                    this.title = "jres:30250300"; //RC 30250300 : Průzkumník uzávěrek
                }
                //uid = "seznamDoplUdaje";
                //GSeznamDoplnkoveUdajeOptions
                onContentReady() {
                    var that = this;
                    // vytvoreni fitru panelu
                    //this.createFilterPanel(this);
                    that.DefinceAkci();
                    let treeProcessor = new Gordic.Data.Tree(Gordic.Data.Tree.parentIdOrganizer("parentId"), {
                        filterKeepStructure: true,
                        //defaultState: "unknown",// (m) => { return m.data.nodeState as DataStructureState || "unknown"; },
                        defaultState: (m) => {
                            //return "unknown";
                            if (m.data.level === 3) {
                                // posledni uroven bude jiz otevrena
                                return "open";
                            }
                            else
                                // nutno docist
                                return "unknown";
                        },
                        dynamicRequest: (data) => {
                            if (data.level === 0) {
                            }
                            return data;
                        }
                    });
                    let provider = new Gordic.Data.Provider((req) => {
                        return that.loadData(req);
                    });
                    let view = new Gordic.Data.View([], { key: "id", processors: { tree: treeProcessor, provider: provider } });
                    this.menuBar([
                        //{ action: that.actions.newAct, favorite: true, captionVisible: "never" },
                        { action: that.actions.actObcerstvit, favorite: true },
                        { action: that.actions.actOdliti, favorite: true },
                    ]);
                    that.$grid = $("<div>").appendTo(this.element)
                        .ggrid({
                        columnMode: "fit",
                        data: view,
                        showHeaderRow: false,
                        // delegat pro zmenu stylu radku pri vykreslovani
                        rowsClass: function (metarow) {
                            var styl = "";
                            if (metarow.data.level === 0)
                                styl = "tree_root";
                            else if (metarow.data.level === 1)
                                styl = "tree_item";
                            else if (metarow.data.level === 2)
                                styl = "tree_item_item";
                            else if (metarow.data.level === 3)
                                styl = "tree_last";
                            else
                                styl = "tree_root";
                            return styl;
                        },
                        selection: function (ev, info) {
                            var rows = info.getSelection();
                            //that.clearControls();
                            if (rows.length > 0) {
                                that.NastaveniAkci(rows[0]);
                                that.previewController.enable(true);
                                that.previewController.show({
                                    currentRow: rows[0], ico: that.GlobalParams.EkoParams?.ICO,
                                    rok: that.GlobalParams.EkoParams?.ROK, lic: that.getLic(rows[0].id),
                                    title: rows[0].popis,
                                    ucs: that.getUCS(rows[0].id),
                                    typ_ag: rows[0].typ_ag
                                });
                                //});
                                return;
                            }
                            else
                                that.previewController.enable(false);
                            that.NastaveniAkci(null);
                            //that.clearControls();
                        },
                        multi: false,
                        //#region Definice sloupcu
                        columns: new Gordic.Data.GridFormat()
                            .addStructureColumn({
                            name: "popis", caption: "  ", width: 50,
                            structureLead: true,
                            /*customClass: "ui-disabled", sysColumn: true,*/ /* forced:true,*/
                            iconTemplate: (radek, info) => {
                                if (radek.level == 3)
                                    return { icon: "gi-paper", text: radek.popis };
                                else {
                                    if (info.structure.state == "open")
                                        return { icon: "fa-folder-open g-state-text g-state-favorite", text: radek.popis };
                                    else
                                        return { icon: "gi-folder_bold g-state-text g-state-favorite", text: radek.popis };
                                }
                            },
                            formatPreset: "icon"
                        })
                        //#endregion
                    });
                    //#region Preview v sidebaru
                    this.element.gsidebar("option", "right", { userSettings: this.userSettings, width: 500, visible: true, pinned: true /* pinned: false, leafsAutoHide: false*/ });
                    this.previewController = new Gordic.Previews.GPreviewController(this.element, {
                        useSubtask: false,
                        panelOptions: {
                            caption: "jres:30250301", //RC 30250301 :  Náhled detailu
                            side: "right"
                        },
                        tabs: [{
                                caption: "jres:30250301", //RC 30250301 : Náhled detailu
                                customLoad: (tab, dto) => {
                                    let elm = $("<div>").gcontent(Gordic.Inu.WebClient.GArchivaceDetail, { parentContent: this }); //Nutne pro spravne spojeni s kontextem hlavniho contentu
                                    //let tabSettings = dto.tabSettings;
                                    //delete dto.tabSettings;                        
                                    //debugger;
                                    $.content(elm).init(dto);
                                    $(tab).empty().append(elm);
                                    //that.$grid.ggrid("focus");
                                }
                            }]
                    });
                    //#endregion
                    that.refresh();
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                NastaveniAkci(radek) {
                    if (this.closed)
                        return;
                    if (!this.$grid)
                        return;
                    //var radek = this.$grid.ggrid<Gordic.Inu.WebClient.GInuTreeArchivaceDto>("getSelection", false, true);
                    //if (radek && radek.length > 0) {
                    //}
                    if (radek == null)
                        this.actions.actOdliti?.update({ enabled: false, visible: false });
                    else
                        this.actions.actOdliti?.update({ enabled: radek.level == 3, visible: radek.level == 3 });
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
                    var filterFormDef = new Gordic.Forms.Form({ /*opened: true, layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1",*/ tabLabel: "jres:30250434" }) //RC 30250434 : Filtr
                        .addSection()
                        .addPrefab(Gordic.Gin.Prefabs.denMesicRok({
                        name: "denmesicrokdph",
                        rangeMonth: { maxValue: 13, minValue: 1, selectableMaxValue: 13 },
                        //width: { year: 7, month:5,day:0 },
                        fields: ["rok", "mesic"],
                        label: "jres:30250433", //RC 30250433 : Rok - měsíc
                        ekoDate: true,
                        yearFieldOptions: {
                            name: "rok",
                            model: "rok=value",
                            validators: [],
                            //initialValue: this.ekoParams.Rok
                        },
                        monthFieldOptions: {
                            name: "mesic",
                            itemTemplate: "{cislo}",
                            //itemTemplate: "{cislo}.  {nazev}",
                            model: "mesic=value",
                            initialValue: { id: this.currentMonth },
                            validators: [],
                        },
                        output: "singleValues"
                    }))
                        .addRow({ label: "jres:30250435" }).addField("gselectbox", //RC 30250435 : IČO
                    Gordic.Prefabs.Select.ekosico(), {
                        name: "ico",
                        //initialValue: { ico: this.ekoParams.Ico },
                        model: "model.ico=value.ico",
                    })
                        .addRow("jres:30250436").addField("gselectbox", //RC 30250436 : UCS
                    Gordic.Prefabs.Select.ekosucs(), {
                        name: "ucs", dropdown: false,
                        model: "model.ico1=value.ico;model.ucs=value.ucs",
                        itemTemplate: "{ucs:trim:encode}",
                        //initialValue: { ico: this.ekoParams.Ico, ucs: this.ekoParams.Ucs },
                        //serverFilters: {
                        //    aktivita: 100,
                        //    ico: this.ekoParams.Ico,
                        //    //rok_od: "<= " +this.ekoParams.Rok,
                        //    //rok_do: ">= " +this.ekoParams.Rok,
                        //},
                    });
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
                        filterViewModeUserSettings: "Deny",
                        // 01.03.2021 - TFeik
                        // Nahrazení obsolete parametrů.
                        autoLoadAfterCreatePanel: true,
                        //userDefaultFilter: true,
                        filterViewMode: FilterViewMode.Simple,
                        //simpleMode: true,
                        favoriteLayoutDescriptor: "L4M3S1",
                        //filterHelperItemTemplate: "<b>{nazev}</b>",
                        //textItemTemplate: "{nazev}",
                        apply: function (event, obj) {
                            console.log("filterForm.apply", obj);
                            that.log.trace("filterForm.apply", obj);
                            var view = that.$grid.ggrid("getView");
                            view.requestData /*<Gordic.Ucr.WebClient.GUcrTreeDoplnUdajeDto>*/(obj);
                            //that.loadData(obj);
                        }
                    });
                }
                getRok(vstup) {
                    return parseInt(vstup.mainId);
                }
                /**
                 * Prevod formatu textu na id (xxx_id)
                 *
                 * @param src
                 */
                getId(src) {
                    var pos = src.indexOf("_");
                    if (pos > 0) {
                        return src.substr(pos + 1);
                    }
                    return "";
                }
                /**
                 * Prevod formatu textu na id (xxx_id)
                 *
                 * @param src
                 */
                getUCS(src) {
                    var pos = src.indexOf("_UCS:");
                    if (pos > 0) {
                        var tmp = src.substr(pos + 5);
                        var pos = tmp.indexOf("_");
                        var result = tmp;
                        if (pos > 0)
                            result = tmp.substr(0, pos);
                        return result;
                    }
                    return "";
                }
                /**
                 * Prevod formatu textu na id (xxx_id)
                 *
                 * @param src
                 */
                getLic(src) {
                    var pos = src.indexOf("_LIC:");
                    if (pos >= 0) {
                        var tmp = src.substr(pos + 5);
                        var pos = tmp.indexOf("_");
                        var result = tmp;
                        if (pos > 0)
                            result = tmp.substr(0, pos);
                        return result;
                    }
                    return "";
                }
                /**
                 * Prevod formatu textu na id (xxx_id)
                 *
                 * @param src
                 */
                getICO(src) {
                    var pos = src.indexOf("_ICO:");
                    if (pos > 0) {
                        var tmp = src.substr(pos + 5);
                        var pos = tmp.indexOf("_");
                        var result = tmp;
                        if (pos > 0)
                            result = tmp.substr(0, pos);
                        return result;
                    }
                    return "";
                }
                /**
                 * Nacteni casti vykazu
                 * @param filtr
                 */
                loadCasti(filtr) {
                    var that = this;
                    var def = $.Deferred();
                    if (that.closed)
                        return def.resolve().promise();
                    let data = [];
                    var resultData;
                    if (filtr.level == 0)
                        resultData = Gordic.Isl.InuiUzaverkaUcetnihoObdobi.listRegistorvanychIC({ rok: filtr.id }).get();
                    else if (filtr.level == 1) {
                        resultData = Gordic.Isl.InuiUzaverkaUcetnihoObdobi.listUCS({ rok: filtr.parentId, ico: that.getICO(filtr.id) }).getData();
                    }
                    else if (filtr.level == 2) {
                        resultData = Gordic.Isl.InuiUzaverkaUcetnihoObdobi.listAgend({ rok: that.GlobalParams.EkoParams?.ROK, lic: that.getLic(filtr.id), ucs: that.getUCS(filtr.id), ico: that.GlobalParams.EkoParams?.ICO }).getData();
                    }
                    else
                        resultData = def.promise();
                    resultData
                        .done(function (result) {
                        for (var i = 0; i < result.length; i++) {
                            if (filtr.level == 0)
                                data.push({ id: filtr.id + "_ICO:" + result[i], popis: "jres:30250297".format(result[i]), parentId: filtr.id, level: 1, mainId: filtr.mainId }); //RC 30250297 : IČO: {0}
                            else if (filtr.level == 1) {
                                data.push({ id: filtr.id + "_LIC:" + result[i].lic + "_UCS:" + result[i].ucs, popis: "jres:30250298".format(result[i].ucs, result[i].lic), parentId: filtr.id, level: 2, mainId: filtr.mainId }); //RC 30250298 : UCS - LIC: {0} - {1}
                            }
                            else if (filtr.level == 2) {
                                data.push({ id: filtr.id + "_AG:" + result[i].typ_ag, typ_ag: result[i].typ_ag, agenda: result[i].typ_ag_txt, popis: "jres:30250299".format(result[i].typ_ag_txt), parentId: filtr.id, level: 3, mainId: filtr.mainId }); //RC 30250299 :  Agenda: {0}
                            }
                        }
                        def.resolve(data);
                    });
                    return def.promise();
                }
                /**
                 *  Nacteni dat
                 */
                loadData(filtr) {
                    var that = this;
                    if (typeof filtr.level !== "undefined") {
                        //if (filtr.level == 0)
                        return that.loadCasti(filtr);
                        //else if (filtr.level == 1)
                        //    return that.loadRadkuVykazu(filtr);
                    }
                    var def = $.Deferred();
                    if (that.closed)
                        return def.resolve().promise();
                    let data = [];
                    var myDef = $.Deferred();
                    if (that.firstLoad) {
                        that.firstLoad = false;
                        myDef.resolve({ filter: { rok: that.GlobalParams.EkoParams?.ROK, mesic: 1 } }).promise();
                    }
                    else {
                        //var result1 = this.getFilter();
                        //myDef = result1 as any;
                        myDef.resolve(filtr).promise();
                    }
                    myDef
                        .then((result) => {
                        if (result.filter)
                            result = result.filter;
                        for (var i = 0; i < that.seznamUcs.length; i++) {
                            data.push({ id: "_LIC:" + this.seznamUcs[i].lic + "_UCS:" + this.seznamUcs[i].ucs, popis: "jres:30250298".format(this.seznamUcs[i].ucs, this.seznamUcs[i].lic), parentId: filtr.id, level: 2, mainId: "_LIC:" + this.seznamUcs[i].lic + "_UCS:" + this.seznamUcs[i].ucs }); //RC 30250298 : UCS - LIC: {0} - {1}
                        }
                        //for (var i = 0; i < that.seznamObdobi.length; i++) {
                        //    data.push({ id: that.seznamObdobi[i].rok?.toString(), ico: "", rok: that.seznamObdobi[i].rok, popis: "jres:30250296".format(that.seznamObdobi[i].rok as number), mainId: that.seznamObdobi[i].rok?.toString(), parentId: null, ucs: "", level: 0 }); //RC 30250296 : ROK: {0}
                        //    }
                        //Gordic.Isl.UcrVykazAdm.list({ filters: filtr }).getData()
                        //    .done(function (result) {
                        //        for (var i = 0; i < result.length; i++) {
                        //            data.push({ id: result[i].ixs_vkz, kod: result[i].kod_vkz, pozn: result[i].poznamka, parentId: null, vykaz: result[i].nazev, level: 0 });
                        //        }
                        def.resolve(data);
                        //    });
                    });
                    return def.promise();
                }
                /**
                 * Definice akci
                 * @param that
                 */
                DefinceAkci() {
                    var that = this;
                    this.actions.addRange({
                        actObcerstvit: Gordic.Eko.Action.actionObcerstvit({ enabled: false, run: function () { that.refresh(); } }),
                        actOdliti: {
                            name: "actOdliti",
                            caption: "jres:30250321", //RC 30250321 : Archivovat
                            tooltip: "",
                            enabled: true,
                            visible: false,
                            run: function () {
                                that.OdlitiKnih();
                            }
                        },
                    });
                }
                /**
                 *  Odliti knih
                 *
                 * */
                OdlitiKnih() {
                    var that = this;
                    var radek = that.getSelectRow();
                    if (radek == null)
                        return;
                    Gordic.Isl.InuiUzaverkaUcetnihoObdobi.listKnihyProUzavreni({
                        ico: that.GlobalParams.EkoParams?.ICO, rok: that.GlobalParams.EkoParams?.ROK, ucs: that.getUCS(radek.id), typAg: radek.typ_ag
                    })
                        .getData().done((result) => {
                        that.OdlitiPruvodce(result);
                    });
                }
                /**
                 * Vybrany radek
                 * */
                getSelectRow() {
                    if (!(typeof this.$grid !== "undefined" && this.$grid.hasClass("ggrid")))
                        return null;
                    var radek = this.$grid.ggrid("getSelection", false);
                    if (radek.length > 0)
                        return radek[0];
                    else
                        return null;
                }
                getGridFormat(in_typ_ag) {
                    var gridformat = new Gordic.Data.GridFormat();
                    gridformat.addTextColumn({ name: "ico", caption: "jres:30250302", width: 80 }); //RC 30250302 : IČO
                    gridformat.addTextColumn({ name: "ucs", caption: Gordic.Consts.DbShortcuts.ucs, width: 60 });
                    gridformat.addTextColumn({ name: "uus", caption: Gordic.Consts.DbShortcuts.uus, width: 60 });
                    if (in_typ_ag = 60)
                        gridformat.addTextColumn({ name: "nks", caption: Gordic.Consts.DbShortcuts.nks, width: 60 });
                    gridformat.addTextColumn({ name: "stav_txt", caption: "jres:30250309", width: 160 }); //RC 30250309 : Stav knihy
                    gridformat.addNumberColumn({ name: "rok", caption: "jres:30250019", width: 50 }); //RC 30250019 : Rok
                    gridformat.addTextColumn({ name: "nazev", caption: "jres:30250310", width: 200 }); //RC 30250310 : Název
                    gridformat.addTextColumn({ name: "poznamka", caption: "jres:30450048", width: 200 }); //RC 30450048 : Poznámka
                    return gridformat;
                }
                /**
                 * Akce uzavrit doklady
                 * @param content
                 * @param selectedRows
                 * @param detailAkce
                 */
                OdlitiPruvodce(knihy) {
                    var that = this;
                    var radek = that.getSelectRow();
                    if (radek == null)
                        return;
                    var cnt$ = that.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        // titulek v breadcrumbu
                        title: "jres:30250330" + " - " + radek.agenda, //RC 30250330 : Archivace knih
                        // formát gridu
                        gridFormat: that.getGridFormat(radek.typ_ag),
                        // primární klíč dat v gridu
                        keys: "ixp_den",
                        // data pro grid (pro první krok)
                        data: knihy,
                        // typ indikátorů nad gridem (KPI nebo badge)
                        indicatorType: "KPI",
                        // první krok - zadání parametrů a kontrola, při přechodu na další krok se zavolá spuštění vlastní operace
                        firstStep: {
                            // název kroku
                            title: "jres:30250326" + " - " + radek.agenda, //RC 30250326 : Archivace knih
                            // popis operace
                            description: "jres:30250327" + " - " + radek.agenda, //RC 30250327 : Přesun dokladů vybraných knih do archívu
                            // nad gridem zobrazit KPI/badge s počty záznamů
                            showIndicator: true,
                            // formulář s parametry
                            //form: formParams,
                            // model pro parametry
                            //modelData: modelData,
                            // nadpis tabu s parametry
                            //formTabTitle: "Parametry storna",
                            // nadpis tabu s gridem
                            gridTabTitle: "jres:30250324" + " - " + radek.agenda, //RC 30250324 : Seznam knih
                            // obsluha změny parametru
                            fieldChangeDelegate: undefined,
                            // název akce, která provede požadovanou operaci (tlačítko vpravo dole)
                            nextActionName: "jres:30250331", //RC 30250331 : Archivovat
                            // metoda volaná při přechodu na další krok (provedení vlastní operace) (pracuje nad daty ze vstupu, vrací aktuální data z databáze + výsledek operace)
                            nextAction: (model, data) => {
                                var that = $.content(cnt$);
                                var deffer = $.Deferred();
                                Gordic.Eko.WebClient.Common.Dotaz(that, "jres:30250334") //RC 30250334 : Archivace je nevratná operace. Opravdu chcete provést archivaci knih? 
                                    .done((result) => {
                                    if (result === "YES") {
                                        var task = Gordic.Async.GTaskManager.start("Gordic.Inu.Server.GInuArchivaceKnihAsync", data);
                                        that.beginOperation({
                                            progress: 0, total: 100, text: "jres:30250333", //RC 30250333 : Start archivace
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
                                    }
                                    else {
                                        return deffer.reject();
                                    }
                                });
                                return deffer.promise();
                            },
                            // akce na tabu s gridem
                            //menuGridBar: [
                            //    {
                            //        // detail
                            //        favorite: true,
                            //        action: detailAkce
                            //    },
                            //],
                            // akce volaná na dvojklik v gridu
                            //defaultAction: detailAkce
                        },
                        // druhý (poslední) krok - zobrazení výsledku operace
                        lastStep: {
                            // název kroku
                            title: "jres:30250328", //RC 30250328 : Výsledek
                            // parametry jsou v tomto kroku již needitovatelné
                            enableFormFields: false,
                            // nadpis tabu s gridem
                            gridTabTitle: "jres:30250329" + " - " + radek.agenda, //RC 30250329 : Zpracované knihy
                        },
                        // obsluha úspěšného ukončení průvodce (na rozdíl od zrušení průvodce přeselektovává seznam)
                        completeDelegate: (view) => {
                            //FucGrid.wizardEnd(that, ikc, true, { methodCalledIfSuccess: () => { that.nacteniSeznamu(); } });
                        },
                        // obsluha zrušení průvodce
                        cancelDelegate: () => {
                            //FucGrid.wizardEnd(that, ikc, false);
                        },
                    });
                }
                /**
                 * Obnovit
                 *
                 * */
                refresh() {
                    var that = this;
                    if (typeof that.$grid !== "undefined" && that.$grid.hasClass("ggrid")) {
                        var view = that.$grid.ggrid("getView");
                        view.requestData();
                    }
                }
            };
            GArchivaceKnih = __decorate([
                Decorators.gcontent
            ], GArchivaceKnih);
            WebClient.GArchivaceKnih = GArchivaceKnih;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FyY2hpdmFjZUtuaWguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHQXJjaGl2YWNlS25paC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBa3FCZjtBQWxxQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBa3FCbkI7SUFscUJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FrcUI3QjtRQWxxQm9CLFdBQUEsU0FBUztZQUMxQjs7Ozs7Y0FLRTtZQUtGLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWUsU0FBUSxPQUFBLFlBQVk7Z0JBQWhEOztvQkFTSSx3REFBd0Q7b0JBQ2hELGNBQVMsR0FBRyxJQUFJLENBQUM7b0JBUXpCLHFCQUFxQjtvQkFDckIsMkJBQTJCO29CQUMzQixvQ0FBb0M7b0JBQ3BDLDhCQUE4QjtvQkFDOUIsVUFBSyxHQUFHLGVBQWUsQ0FBQyxDQUFDLG1DQUFtQztnQkE2bkJoRSxDQUFDO2dCQTVuQkcsMEJBQTBCO2dCQUMxQiw4QkFBOEI7Z0JBQzlCLGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQix5QkFBeUI7b0JBQ3pCLCtCQUErQjtvQkFFL0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNuQixJQUFJLGFBQWEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsRUFDOUM7d0JBQ0ksbUJBQW1CLEVBQUUsSUFBSTt3QkFDekIsb0dBQW9HO3dCQUNwRyxZQUFZLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTs0QkFDaEIsbUJBQW1COzRCQUNuQixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRSxDQUFDO2dDQUNyQixvQ0FBb0M7Z0NBQ3BDLE9BQU8sTUFBTSxDQUFDOzRCQUNsQixDQUFDOztn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cUJTLE1BQU0sS0FBTixNQUFNLFFBa3FCZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuSW51LldlYkNsaWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIEFyY2hpdmFjZSBrbmloXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgdGthcmVzXHJcbiAgICAgKiBAc2luY2UgNDg0LjEuMC42OVxyXG4gICAgKi9cclxuXHJcblxyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0FyY2hpdmFjZUtuaWggZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG5cclxuICAgICAgICAvLyBmaWx0ZXIgcGFuZWxcclxuICAgICAgICBwcml2YXRlICRmaWx0ZXJQYW5lbDogSlF1ZXJ5O1xyXG4gICAgICAgIHB1YmxpYyAkZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICAvL3ByaXZhdGUgc2V6bmFtT2Jkb2JpOiBHb3JkaWMuSW51LkludGVyZmFjZS5HSW51Um9rRHRvW107XHJcbiAgICAgICAgLy8gc2V6bmFtIHVjZXRuaWNoIHN0cmVkaXNla1xyXG4gICAgICAgIHByaXZhdGUgc2V6bmFtVWNzOiBHb3JkaWMuSW51LkludGVyZmFjZS5HSW51VWNzTGljRHRvW107XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9wcml2YXRlIGVrb1BhcmFtczogR29yZGljLlVjci5XZWJDbGllbnQuR0Vrb1BhcmFtc0R0bztcclxuICAgICAgICBwcml2YXRlIGZpcnN0TG9hZCA9IHRydWU7XHJcbiAgICAgICAgcHJpdmF0ZSBjdXJyZW50TW9udGg6IG51bWJlcjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHbG9iYWxuaSBuYXN0YXZlbmlcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHJlYWRvbmx5IEdsb2JhbFBhcmFtczogR29yZGljLkludS5XZWJDbGllbnQuR0ludUdsb2JhbER0bztcclxuICAgICAgICAvLyBwcmV2aWV3XHJcbiAgICAgICAgcHJpdmF0ZSBwcmV2aWV3Q29udHJvbGxlcjogR29yZGljLlByZXZpZXdzLkdQcmV2aWV3Q29udHJvbGxlcjxJR0RldGFpbEFyY2hpdmFjZUR0b1dpdGhUYWJTZXR0aW5ncz47XHJcbiAgICAgICAgLy8gRWRpdG92YXRlbG55IGdyaWR1XHJcbiAgICAgICAgLy9wcml2YXRlIGVkaXRHcmlkOiBKUXVlcnk7XHJcbiAgICAgICAgLy9wcml2YXRlIG15Rm9ybTogR29yZGljLkZvcm1zLkZvcm07XHJcbiAgICAgICAgLy8gbmFzdGF2ZW5pIGlkIGEgdGl0dWxrdSBva25hXHJcbiAgICAgICAgdGl0bGUgPSBcImpyZXM6MzAyNTAzMDBcIjsgLy9SQyAzMDI1MDMwMCA6IFByxa96a3VtbsOtayB1esOhdsSbcmVrXHJcbiAgICAgICAgLy91aWQgPSBcInNlem5hbURvcGxVZGFqZVwiO1xyXG4gICAgICAgIC8vR1Nlem5hbURvcGxua292ZVVkYWplT3B0aW9uc1xyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyB2eXR2b3JlbmkgZml0cnUgcGFuZWx1XHJcbiAgICAgICAgICAgIC8vdGhpcy5jcmVhdGVGaWx0ZXJQYW5lbCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuRGVmaW5jZUFrY2koKTtcclxuICAgICAgICAgICAgbGV0IHRyZWVQcm9jZXNzb3IgPSBuZXcgR29yZGljLkRhdGEuVHJlZTxHb3JkaWMuSW51LldlYkNsaWVudC5HSW51VHJlZUFyY2hpdmFjZUR0bz4oXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuRGF0YS5UcmVlLnBhcmVudElkT3JnYW5pemVyKFwicGFyZW50SWRcIiksXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyS2VlcFN0cnVjdHVyZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2RlZmF1bHRTdGF0ZTogXCJ1bmtub3duXCIsLy8gKG0pID0+IHsgcmV0dXJuIG0uZGF0YS5ub2RlU3RhdGUgYXMgRGF0YVN0cnVjdHVyZVN0YXRlIHx8IFwidW5rbm93blwiOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRTdGF0ZTogKG0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gXCJ1bmtub3duXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtLmRhdGEubGV2ZWwgPT09IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvc2xlZG5pIHVyb3ZlbiBidWRlIGppeiBvdGV2cmVuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwib3BlblwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG51dG5vIGRvY2lzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidW5rbm93blwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZHluYW1pY1JlcXVlc3Q6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxldmVsID09PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHByb3ZpZGVyID0gbmV3IEdvcmRpYy5EYXRhLlByb3ZpZGVyPEdvcmRpYy5JbnUuV2ViQ2xpZW50LkdJbnVUcmVlQXJjaGl2YWNlRHRvLyosIEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdVY3JUcmVlRG9wbG5VZGFqZVJlcXVlc3REdG8qLz4oKHJlcSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQubG9hZERhdGEocmVxKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3PEdvcmRpYy5JbnUuV2ViQ2xpZW50LkdJbnVUcmVlQXJjaGl2YWNlRHRvPihbXSwgeyBrZXk6IFwiaWRcIiwgcHJvY2Vzc29yczogeyB0cmVlOiB0cmVlUHJvY2Vzc29yLCBwcm92aWRlcjogcHJvdmlkZXIgfSB9KTtcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKFtcclxuICAgICAgICAgICAgICAgIC8veyBhY3Rpb246IHRoYXQuYWN0aW9ucy5uZXdBY3QsIGZhdm9yaXRlOiB0cnVlLCBjYXB0aW9uVmlzaWJsZTogXCJuZXZlclwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdE9iY2Vyc3R2aXQsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdE9kbGl0aSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIHRoYXQuJGdyaWQgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0hlYWRlclJvdzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVsZWdhdCBwcm8gem1lbnUgc3R5bHUgcmFka3UgcHJpIHZ5a3Jlc2xvdmFuaVxyXG4gICAgICAgICAgICAgICAgICAgIHJvd3NDbGFzczogZnVuY3Rpb24gKG1ldGFyb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0eWwgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGFyb3cuZGF0YS5sZXZlbCA9PT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWwgPSBcInRyZWVfcm9vdFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChtZXRhcm93LmRhdGEubGV2ZWwgPT09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsID0gXCJ0cmVlX2l0ZW1cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobWV0YXJvdy5kYXRhLmxldmVsID09PSAyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bCA9IFwidHJlZV9pdGVtX2l0ZW1cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobWV0YXJvdy5kYXRhLmxldmVsID09PSAzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bCA9IFwidHJlZV9sYXN0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWwgPSBcInRyZWVfcm9vdFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3R5bDtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogZnVuY3Rpb24gKGV2LCBpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3dzID0gaW5mby5nZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmNsZWFyQ29udHJvbHMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvd3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5OYXN0YXZlbmlBa2NpKHJvd3NbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLmVuYWJsZSh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLnNob3coe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRSb3c6IHJvd3NbMF0sIGljbzogdGhhdC5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5JQ08gYXMgc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvazogdGhhdC5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5ST0sgYXMgbnVtYmVyLCBsaWM6IHRoYXQuZ2V0TGljKHJvd3NbMF0uaWQgYXMgYW55KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogcm93c1swXS5wb3BpcyEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWNzOiB0aGF0LmdldFVDUyhyb3dzWzBdLmlkIGFzIGFueSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX2FnOiByb3dzWzBdLnR5cF9hZyFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5lbmFibGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2kobnVsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuY2xlYXJDb250cm9scygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8jcmVnaW9uIERlZmluaWNlIHNsb3VwY3VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkludS5XZWJDbGllbnQuR0ludVRyZWVBcmNoaXZhY2VEdG8+KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFN0cnVjdHVyZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzXCIsIGNhcHRpb246IFwiICBcIiwgd2lkdGg6IDUwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RydWN0dXJlTGVhZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qY3VzdG9tQ2xhc3M6IFwidWktZGlzYWJsZWRcIiwgc3lzQ29sdW1uOiB0cnVlLCovLyogZm9yY2VkOnRydWUsKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogKHJhZGVrLCBpbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGVrLmxldmVsID09IDMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGljb246IFwiZ2ktcGFwZXJcIiwgdGV4dDogcmFkZWsucG9waXMhIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmZvIS5zdHJ1Y3R1cmUuc3RhdGUgPT0gXCJvcGVuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcImZhLWZvbGRlci1vcGVuIGctc3RhdGUtdGV4dCBnLXN0YXRlLWZhdm9yaXRlXCIsIHRleHQ6IHJhZGVrLnBvcGlzISB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcImdpLWZvbGRlcl9ib2xkIGctc3RhdGUtdGV4dCBnLXN0YXRlLWZhdm9yaXRlXCIsIHRleHQ6IHJhZGVrLnBvcGlzISB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRQcmVzZXQ6IFwiaWNvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBQcmV2aWV3IHYgc2lkZWJhcnVcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5nc2lkZWJhcihcIm9wdGlvblwiLCBcInJpZ2h0XCIsIHsgdXNlclNldHRpbmdzOiB0aGlzLnVzZXJTZXR0aW5ncyEsIHdpZHRoOiA1MDAsIHZpc2libGU6IHRydWUsIHBpbm5lZDogdHJ1ZSAvKiBwaW5uZWQ6IGZhbHNlLCBsZWFmc0F1dG9IaWRlOiBmYWxzZSovIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnByZXZpZXdDb250cm9sbGVyID0gbmV3IEdvcmRpYy5QcmV2aWV3cy5HUHJldmlld0NvbnRyb2xsZXI8SUdEZXRhaWxBcmNoaXZhY2VEdG9XaXRoVGFiU2V0dGluZ3M+KHRoaXMuZWxlbWVudCwge1xyXG4gICAgICAgICAgICAgICAgdXNlU3VidGFzazogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBwYW5lbE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzMDFcIiwgLy9SQyAzMDI1MDMwMSA6ICBOw6FobGVkIGRldGFpbHVcclxuICAgICAgICAgICAgICAgICAgICBzaWRlOiBcInJpZ2h0XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0YWJzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDMwMVwiLCAvL1JDIDMwMjUwMzAxIDogTsOhaGxlZCBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tTG9hZDogKHRhYiwgZHRvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbG0gPSAkKFwiPGRpdj5cIikuZ2NvbnRlbnQoR29yZGljLkludS5XZWJDbGllbnQuR0FyY2hpdmFjZURldGFpbCwgeyBwYXJlbnRDb250ZW50OiB0aGlzIH0pOyAvL051dG5lIHBybyBzcHJhdm5lIHNwb2plbmkgcyBrb250ZXh0ZW0gaGxhdm5paG8gY29udGVudHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgdGFiU2V0dGluZ3MgPSBkdG8udGFiU2V0dGluZ3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVsZXRlIGR0by50YWJTZXR0aW5nczsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuY29udGVudDxHb3JkaWMuSW51LldlYkNsaWVudC5HQXJjaGl2YWNlRGV0YWlsPihlbG0pLmluaXQoZHRvKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGFiKS5lbXB0eSgpLmFwcGVuZChlbG0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuJGdyaWQuZ2dyaWQoXCJmb2N1c1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgIHRoYXQucmVmcmVzaCgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuaSBwcmlzdHVwbm9zdGkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBOYXN0YXZlbmlBa2NpKHJhZGVrOiBHb3JkaWMuSW51LldlYkNsaWVudC5HSW51VHJlZUFyY2hpdmFjZUR0b3xudWxsICkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLiRncmlkKSByZXR1cm47XHJcbiAgICAgICAgICAgIC8vdmFyIHJhZGVrID0gdGhpcy4kZ3JpZC5nZ3JpZDxHb3JkaWMuSW51LldlYkNsaWVudC5HSW51VHJlZUFyY2hpdmFjZUR0bz4oXCJnZXRTZWxlY3Rpb25cIiwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICAvL2lmIChyYWRlayAmJiByYWRlay5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgaWYgKHJhZGVrPT1udWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdE9kbGl0aT8udXBkYXRlKHsgZW5hYmxlZDogZmFsc2UsIHZpc2libGU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0T2RsaXRpPy51cGRhdGUoeyBlbmFibGVkOiByYWRlay5sZXZlbCA9PSAzLCB2aXNpYmxlOiByYWRlay5sZXZlbCA9PSAzIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBmdW5jdGlvbiBDcmVhdGVGaWx0ZXJaYWxvemthXHJcbiAgICAgICAgKiAgICAgIFxyXG4gICAgICAgICogT2JlY25hIHphbG96a2FcclxuICAgICAgICAqIEBwYXJhbSB7R0NvbnRlbnR9IGNvbnRlbnRcclxuICAgICAgICAqIEByZXR1cm5zIHthbnl9XHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIENyZWF0ZUZpbHRlclphbG96a2EoKTogYW55IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBmaWx0ZXJGb3JtRGVmID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgLypvcGVuZWQ6IHRydWUsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxLCBMLTMtOC0xLCBNLTEyLTExLTEsIFMtMTItMTEtMVwiLCovIHRhYkxhYmVsOiBcImpyZXM6MzAyNTA0MzRcIiB9KSAgLy9SQyAzMDI1MDQzNCA6IEZpbHRyXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuZGVuTWVzaWNSb2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGVubWVzaWNyb2tkcGhcIixcclxuICAgICAgICAgICAgICAgICAgICByYW5nZU1vbnRoOiB7IG1heFZhbHVlOiAxMywgbWluVmFsdWU6IDEsIHNlbGVjdGFibGVNYXhWYWx1ZTogMTMgfSxcclxuICAgICAgICAgICAgICAgICAgICAvL3dpZHRoOiB7IHllYXI6IDcsIG1vbnRoOjUsZGF5OjAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZHM6IFtcInJva1wiLCBcIm1lc2ljXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzAyNTA0MzNcIiwgLy9SQyAzMDI1MDQzMyA6IFJvayAtIG3Em3PDrWNcclxuICAgICAgICAgICAgICAgICAgICBla29EYXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHllYXJGaWVsZE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwicm9rPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2luaXRpYWxWYWx1ZTogdGhpcy5la29QYXJhbXMuUm9rXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBtb250aEZpZWxkT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1lc2ljXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7Y2lzbG99XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaXRlbVRlbXBsYXRlOiBcIntjaXNsb30uICB7bmF6ZXZ9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1lc2ljPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogeyBpZDogdGhpcy5jdXJyZW50TW9udGggfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW10sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0OiBcInNpbmdsZVZhbHVlc1wiXHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMjUwNDM1XCIgfSkuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIC8vUkMgMzAyNTA0MzUgOiBJxIxPXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3NpY28oKSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWNvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlOiB7IGljbzogdGhpcy5la29QYXJhbXMuSWNvIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmljbz12YWx1ZS5pY29cIixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDQzNlwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwvL1JDIDMwMjUwNDM2IDogVUNTXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3N1Y3MoKSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWNzXCIsIGRyb3Bkb3duOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIG1vZGVsOiBcIm1vZGVsLmljbzE9dmFsdWUuaWNvO21vZGVsLnVjcz12YWx1ZS51Y3NcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIGl0ZW1UZW1wbGF0ZTogXCJ7dWNzOnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2luaXRpYWxWYWx1ZTogeyBpY286IHRoaXMuZWtvUGFyYW1zLkljbywgdWNzOiB0aGlzLmVrb1BhcmFtcy5VY3MgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGljbzogdGhpcy5la29QYXJhbXMuSWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvL3Jva19vZDogXCI8PSBcIiArdGhpcy5la29QYXJhbXMuUm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvL3Jva19kbzogXCI+PSBcIiArdGhpcy5la29QYXJhbXMuUm9rLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlckZvcm1EZWY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBmaWx0cm92YWNpaG8gcGFuZWx1XHJcbiAgICAgICAgICogQHBhcmFtIHRoYXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZpbHRlclBhbmVsKHRoYXQ6IHRoaXMpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGZpbHRlclBhbmVsID0gJChcIjxkaXYgY2xhc3M9J2pzLWZpbHRyJz5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJDdXN0b21pemVyOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9sU29ydCA9IGRhdGEuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYS5uYW1lID49IGIubmFtZTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwb2xTb3J0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybXM6IFt0aGF0LkNyZWF0ZUZpbHRlclphbG96a2EoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9maWx0ZXJWaWV3TW9kZTogZGVmRmlsdHJ1LC8vIEZpbHRlclZpZXdNb2RlLkRldGFpbCwgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZmF2b3JpdGVzOiBbXCJpeHBcIiwgXCJpeHNfdHlwXCIsIFwidmxhc3RuaV9kb2tsYWR5XCJdLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhdXRvTG9hZEFmdGVyQ2hvc2VGaWx0ZXI6IHRydWUsXHJcbi8vWFhYSkkgICAgICAgICAgICAgICAgICAgIGRldGFpbEFjdGlvbkFzQ2hlY2tib3g6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2F2ZU9wdGlvbnNGb3JtOiBcImVrb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclN0b3JhZ2VTZXJ2aWNlOiBuZXcgR29yZGljLkdpbi5GaWx0ZXJTdG9yYWdlU2VydmljZS5TdG9yZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlVXNlclNldHRpbmdzOiBcIkRlbnlcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyAwMS4wMy4yMDIxIC0gVEZlaWtcclxuICAgICAgICAgICAgICAgICAgICAvLyBOYWhyYXplbsOtIG9ic29sZXRlIHBhcmFtZXRyxa8uXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0xvYWRBZnRlckNyZWF0ZVBhbmVsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdXNlckRlZmF1bHRGaWx0ZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVmlld01vZGU6IEZpbHRlclZpZXdNb2RlLlNpbXBsZSxcclxuICAgICAgICAgICAgICAgICAgICAvL3NpbXBsZU1vZGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVMYXlvdXREZXNjcmlwdG9yOiBcIkw0TTNTMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZmlsdGVySGVscGVySXRlbVRlbXBsYXRlOiBcIjxiPntuYXpldn08L2I+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXh0SXRlbVRlbXBsYXRlOiBcIntuYXpldn1cIixcclxuICAgICAgICAgICAgICAgICAgICBhcHBseTogZnVuY3Rpb24gKGV2ZW50LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaWx0ZXJGb3JtLmFwcGx5XCIsIG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9nLnRyYWNlKFwiZmlsdGVyRm9ybS5hcHBseVwiLCBvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmlldyA9IHRoYXQuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LnJlcXVlc3REYXRhLyo8R29yZGljLlVjci5XZWJDbGllbnQuR1VjclRyZWVEb3BsblVkYWplRHRvPiovKG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5sb2FkRGF0YShvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRSb2sodnN0dXA6IEdvcmRpYy5JbnUuV2ViQ2xpZW50LkdJbnVUcmVlQXJjaGl2YWNlRHRvKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KHZzdHVwLm1haW5JZCEpO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJldm9kIGZvcm1hdHUgdGV4dHUgbmEgaWQgKHh4eF9pZClcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gc3JjXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRJZChzcmM6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHZhciBwb3MgPSBzcmMuaW5kZXhPZihcIl9cIik7XHJcbiAgICAgICAgICAgIGlmIChwb3MgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3JjLnN1YnN0cihwb3MgKyAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJldm9kIGZvcm1hdHUgdGV4dHUgbmEgaWQgKHh4eF9pZClcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gc3JjXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRVQ1Moc3JjOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICB2YXIgcG9zID0gc3JjLmluZGV4T2YoXCJfVUNTOlwiKTtcclxuICAgICAgICAgICAgaWYgKHBvcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIHZhciB0bXAgPSBzcmMuc3Vic3RyKHBvcyArIDUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IHRtcC5pbmRleE9mKFwiX1wiKTtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0bXA7XHJcbiAgICAgICAgICAgICAgICBpZiAocG9zID4gMClcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0bXAuc3Vic3RyKDAsIHBvcyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQcmV2b2QgZm9ybWF0dSB0ZXh0dSBuYSBpZCAoeHh4X2lkKVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBzcmNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldExpYyhzcmM6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHZhciBwb3MgPSBzcmMuaW5kZXhPZihcIl9MSUM6XCIpO1xyXG4gICAgICAgICAgICBpZiAocG9zID49IDApIHtcclxuICAgICAgICAgICAgICAgIHZhciB0bXAgPSBzcmMuc3Vic3RyKHBvcyArIDUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IHRtcC5pbmRleE9mKFwiX1wiKTtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0bXA7XHJcbiAgICAgICAgICAgICAgICBpZiAocG9zID4gMClcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0bXAuc3Vic3RyKDAsIHBvcyk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJldm9kIGZvcm1hdHUgdGV4dHUgbmEgaWQgKHh4eF9pZClcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gc3JjXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRJQ08oc3JjOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICB2YXIgcG9zID0gc3JjLmluZGV4T2YoXCJfSUNPOlwiKTtcclxuICAgICAgICAgICAgaWYgKHBvcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIHZhciB0bXAgPSBzcmMuc3Vic3RyKHBvcyArIDUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IHRtcC5pbmRleE9mKFwiX1wiKTtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0bXA7XHJcbiAgICAgICAgICAgICAgICBpZihwb3M+MClcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0bXAuc3Vic3RyKDAsIHBvcyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYWN0ZW5pIGNhc3RpIHZ5a2F6dVxyXG4gICAgICAgICAqIEBwYXJhbSBmaWx0clxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGxvYWRDYXN0aShmaWx0cjogR29yZGljLkludS5XZWJDbGllbnQuR0ludVRyZWVBcmNoaXZhY2VEdG8pOiBKUXVlcnlQcm9taXNlPEdvcmRpYy5JbnUuV2ViQ2xpZW50LkdJbnVUcmVlQXJjaGl2YWNlRHRvPiB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5jbG9zZWQpIHJldHVybiBkZWYucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkYXRhOiBHb3JkaWMuSW51LldlYkNsaWVudC5HSW51VHJlZUFyY2hpdmFjZUR0b1tdID0gW11cclxuICAgICAgICAgICAgdmFyIHJlc3VsdERhdGE6IEpRdWVyeVByb21pc2U8YW55LypVY3QuSW50ZXJmYWNlLkdWeWtzdmt6RHRvW10qLz47XHJcbiAgICAgICAgICAgIGlmIChmaWx0ci5sZXZlbCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0RGF0YSA9IEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkubGlzdFJlZ2lzdG9ydmFueWNoSUMoeyByb2s6IGZpbHRyLmlkIGFzIGFueSB9KS5nZXQoKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAoZmlsdHIubGV2ZWwgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJlc3VsdERhdGEgPSBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLmxpc3RVQ1MoeyByb2s6IGZpbHRyLnBhcmVudElkIGFzIGFueSwgaWNvOiB0aGF0LmdldElDTyhmaWx0ci5pZCBhcyBhbnkpIH0pLmdldERhdGEoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChmaWx0ci5sZXZlbCA9PSAyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzdWx0RGF0YSA9IEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkubGlzdEFnZW5kKHsgcm9rOiB0aGF0Lkdsb2JhbFBhcmFtcy5Fa29QYXJhbXM/LlJPSyBhcyBhbnksIGxpYzogdGhhdC5nZXRMaWMoZmlsdHIuaWQgYXMgYW55KSwgdWNzOiB0aGF0LmdldFVDUyhmaWx0ci5pZCBhcyBhbnkpLCBpY286IHRoYXQuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uSUNPIGFzIHN0cmluZyB9KS5nZXREYXRhKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0RGF0YSA9IGRlZi5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgICAgICByZXN1bHREYXRhXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRyLmxldmVsID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnB1c2goeyBpZDogZmlsdHIuaWQgKyBcIl9JQ086XCIgKyByZXN1bHRbaV0sIHBvcGlzOiBcImpyZXM6MzAyNTAyOTdcIi5mb3JtYXQocmVzdWx0W2ldKSwgcGFyZW50SWQ6IGZpbHRyLmlkLCBsZXZlbDogMSwgbWFpbklkOiBmaWx0ci5tYWluSWQgfSk7IC8vUkMgMzAyNTAyOTcgOiBJxIxPOiB7MH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZmlsdHIubGV2ZWwgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wdXNoKHsgaWQ6IGZpbHRyLmlkICsgXCJfTElDOlwiICsgcmVzdWx0W2ldLmxpYyArIFwiX1VDUzpcIiArIHJlc3VsdFtpXS51Y3MsIHBvcGlzOiBcImpyZXM6MzAyNTAyOThcIi5mb3JtYXQocmVzdWx0W2ldLnVjcywgcmVzdWx0W2ldLmxpYyksIHBhcmVudElkOiBmaWx0ci5pZCwgbGV2ZWw6IDIsIG1haW5JZDogZmlsdHIubWFpbklkIH0pOyAvL1JDIDMwMjUwMjk4IDogVUNTIC0gTElDOiB7MH0gLSB7MX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChmaWx0ci5sZXZlbCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnB1c2goeyBpZDogZmlsdHIuaWQgKyBcIl9BRzpcIiArIHJlc3VsdFtpXS50eXBfYWcsIHR5cF9hZzogcmVzdWx0W2ldLnR5cF9hZywgYWdlbmRhOiByZXN1bHRbaV0udHlwX2FnX3R4dCwgcG9waXM6IFwianJlczozMDI1MDI5OVwiLmZvcm1hdChyZXN1bHRbaV0udHlwX2FnX3R4dCksIHBhcmVudElkOiBmaWx0ci5pZCwgbGV2ZWw6IDMsIG1haW5JZDogZmlsdHIubWFpbklkIH0pOyAvL1JDIDMwMjUwMjk5IDogIEFnZW5kYTogezB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBOYWN0ZW5pIGRhdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGxvYWREYXRhKGZpbHRyPzogYW55KTogSlF1ZXJ5UHJvbWlzZTxHb3JkaWMuSW51LldlYkNsaWVudC5HSW51VHJlZUFyY2hpdmFjZUR0bz4ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGZpbHRyLmxldmVsICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAvL2lmIChmaWx0ci5sZXZlbCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQubG9hZENhc3RpKGZpbHRyKTtcclxuICAgICAgICAgICAgICAgIC8vZWxzZSBpZiAoZmlsdHIubGV2ZWwgPT0gMSlcclxuICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiB0aGF0LmxvYWRSYWRrdVZ5a2F6dShmaWx0cik7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQuY2xvc2VkKSByZXR1cm4gZGVmLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGF0YTogR29yZGljLkludS5XZWJDbGllbnQuR0ludVRyZWVBcmNoaXZhY2VEdG9bXSA9IFtdXHJcblxyXG4gICAgICAgICAgICB2YXIgbXlEZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LmZpcnN0TG9hZCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maXJzdExvYWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIG15RGVmLnJlc29sdmUoeyBmaWx0ZXI6IHsgcm9rOiB0aGF0Lkdsb2JhbFBhcmFtcy5Fa29QYXJhbXM/LlJPSywgbWVzaWM6IDEgfSB9KS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciByZXN1bHQxID0gdGhpcy5nZXRGaWx0ZXIoKTtcclxuICAgICAgICAgICAgICAgIC8vbXlEZWYgPSByZXN1bHQxIGFzIGFueTtcclxuICAgICAgICAgICAgICAgIG15RGVmLnJlc29sdmUoZmlsdHIpLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbXlEZWZcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5maWx0ZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5maWx0ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGF0LnNlem5hbVVjcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnB1c2goeyBpZDogXCJfTElDOlwiICsgdGhpcy5zZXpuYW1VY3NbaV0ubGljICsgXCJfVUNTOlwiICsgdGhpcy5zZXpuYW1VY3NbaV0udWNzLCBwb3BpczogXCJqcmVzOjMwMjUwMjk4XCIuZm9ybWF0KHRoaXMuc2V6bmFtVWNzW2ldLnVjcyBhcyBzdHJpbmcsIHRoaXMuc2V6bmFtVWNzW2ldLmxpYyBhcyBzdHJpbmcpLCBwYXJlbnRJZDogZmlsdHIuaWQsIGxldmVsOiAyLCBtYWluSWQ6IFwiX0xJQzpcIiArIHRoaXMuc2V6bmFtVWNzW2ldLmxpYyArIFwiX1VDUzpcIiArIHRoaXMuc2V6bmFtVWNzW2ldLnVjcyB9KTsgLy9SQyAzMDI1MDI5OCA6IFVDUyAtIExJQzogezB9IC0gezF9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2ZvciAodmFyIGkgPSAwOyBpIDwgdGhhdC5zZXpuYW1PYmRvYmkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBkYXRhLnB1c2goeyBpZDogdGhhdC5zZXpuYW1PYmRvYmlbaV0ucm9rPy50b1N0cmluZygpLCBpY286IFwiXCIsIHJvazogdGhhdC5zZXpuYW1PYmRvYmlbaV0ucm9rLCBwb3BpczogXCJqcmVzOjMwMjUwMjk2XCIuZm9ybWF0KHRoYXQuc2V6bmFtT2Jkb2JpW2ldLnJvayBhcyBudW1iZXIpLCBtYWluSWQ6IHRoYXQuc2V6bmFtT2Jkb2JpW2ldLnJvaz8udG9TdHJpbmcoKSwgcGFyZW50SWQ6IG51bGwsIHVjczogXCJcIiwgbGV2ZWw6IDAgfSk7IC8vUkMgMzAyNTAyOTYgOiBST0s6IHswfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9Hb3JkaWMuSXNsLlVjclZ5a2F6QWRtLmxpc3QoeyBmaWx0ZXJzOiBmaWx0ciB9KS5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBkYXRhLnB1c2goeyBpZDogcmVzdWx0W2ldLml4c192a3osIGtvZDogcmVzdWx0W2ldLmtvZF92a3osIHBvem46IHJlc3VsdFtpXS5wb3puYW1rYSwgcGFyZW50SWQ6IG51bGwsIHZ5a2F6OiByZXN1bHRbaV0ubmF6ZXYsIGxldmVsOiAwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmljZSBha2NpXHJcbiAgICAgICAgICogQHBhcmFtIHRoYXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIERlZmluY2VBa2NpKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0T2JjZXJzdHZpdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uT2JjZXJzdHZpdCh7IGVuYWJsZWQ6IGZhbHNlLCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5yZWZyZXNoKCk7IH0gfSksXHJcbiAgICAgICAgICAgICAgICBhY3RPZGxpdGk6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE9kbGl0aVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDMyMVwiLCAvL1JDIDMwMjUwMzIxIDogQXJjaGl2b3ZhdFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk9kbGl0aUtuaWgoKTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgT2RsaXRpIGtuaWhcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgT2RsaXRpS25paCgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcmFkZWsgPSB0aGF0LmdldFNlbGVjdFJvdygpO1xyXG4gICAgICAgICAgICBpZiAocmFkZWsgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLmxpc3RLbmloeVByb1V6YXZyZW5pKHtcclxuICAgICAgICAgICAgICAgIGljbzogdGhhdC5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5JQ08gYXMgc3RyaW5nLCByb2s6IHRoYXQuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uUk9LIGFzIG51bWJlciwgdWNzOiB0aGF0LmdldFVDUyhyYWRlay5pZCEpLCB0eXBBZzogcmFkZWsudHlwX2FnIVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdldERhdGEoKS5kb25lKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lk9kbGl0aVBydXZvZGNlKHJlc3VsdCBhcyBhbnkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnlicmFueSByYWRla1xyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRTZWxlY3RSb3coKTpHb3JkaWMuSW51LldlYkNsaWVudC5HSW51VHJlZUFyY2hpdmFjZUR0b3xudWxsIHtcclxuICAgICAgICAgICAgaWYgKCEodHlwZW9mIHRoaXMuJGdyaWQgIT09IFwidW5kZWZpbmVkXCIgJiYgdGhpcy4kZ3JpZC5oYXNDbGFzcyhcImdncmlkXCIpKSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIHZhciByYWRlayA9IHRoaXMuJGdyaWQuZ2dyaWQ8R29yZGljLkludS5XZWJDbGllbnQuR0ludVRyZWVBcmNoaXZhY2VEdG8+KFwiZ2V0U2VsZWN0aW9uXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKHJhZGVrLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmFkZWtbMF07XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIGdldEdyaWRGb3JtYXQoIGluX3R5cF9hZyA6IG51bWJlciApOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0IHtcclxuICAgICAgICAgICAgdmFyIGdyaWRmb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpO1xyXG4gICAgICAgICAgICBncmlkZm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImljb1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzMDJcIiwgd2lkdGg6IDgwIH0pOyAvL1JDIDMwMjUwMzAyIDogScSMT1xyXG4gICAgICAgICAgICBncmlkZm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInVjc1wiLCBjYXB0aW9uOiBHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLnVjcywgd2lkdGg6IDYwIH0pO1xyXG4gICAgICAgICAgICBncmlkZm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInV1c1wiLCBjYXB0aW9uOiBHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLnV1cywgd2lkdGg6IDYwIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGluX3R5cF9hZyA9IDYwKVxyXG4gICAgICAgICAgICAgICAgZ3JpZGZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJua3NcIiwgY2FwdGlvbjogR29yZGljLkNvbnN0cy5EYlNob3J0Y3V0cy5ua3MsIHdpZHRoOiA2MCB9KTtcclxuXHJcbiAgICAgICAgICAgIGdyaWRmb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwic3Rhdl90eHRcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzA5XCIsIHdpZHRoOiAxNjAgfSk7IC8vUkMgMzAyNTAzMDkgOiBTdGF2IGtuaWh5XHJcbiAgICAgICAgICAgIGdyaWRmb3JtYXQuYWRkTnVtYmVyQ29sdW1uKHsgbmFtZTogXCJyb2tcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDE5XCIsIHdpZHRoOiA1MCB9KTsgLy9SQyAzMDI1MDAxOSA6IFJva1xyXG4gICAgICAgICAgICBncmlkZm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIm5hemV2XCIsIGNhcHRpb246IFwianJlczozMDI1MDMxMFwiLCB3aWR0aDogMjAwIH0pOyAvL1JDIDMwMjUwMzEwIDogTsOhemV2XHJcbiAgICAgICAgICAgIGdyaWRmb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwicG96bmFta2FcIiwgY2FwdGlvbjogXCJqcmVzOjMwNDUwMDQ4XCIsIHdpZHRoOiAyMDAgfSk7IC8vUkMgMzA0NTAwNDggOiBQb3puw6Fta2FcclxuICAgICAgICAgICAgcmV0dXJuIGdyaWRmb3JtYXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa2NlIHV6YXZyaXQgZG9rbGFkeVxyXG4gICAgICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgICAgICogQHBhcmFtIHNlbGVjdGVkUm93c1xyXG4gICAgICAgICAqIEBwYXJhbSBkZXRhaWxBa2NlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBPZGxpdGlQcnV2b2RjZShrbmloeTogSW50ZXJmYWNlLkdJbnVLbmloeUR0b1tdKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHJhZGVrID0gdGhhdC5nZXRTZWxlY3RSb3coKTtcclxuICAgICAgICAgICAgaWYgKHJhZGVrID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIGNudCQgID0gdGhhdC5uYXZpZ2F0ZTxHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNPcHRpb25zPEludGVyZmFjZS5HSW51VnlicmFuZUtuaWh5RHRvPj4oR29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzQ29udGVudCwge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHRpdHVsZWsgdiBicmVhZGNydW1idVxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDMzMFwiICsgXCIgLSBcIiArIHJhZGVrLmFnZW5kYSwgLy9SQyAzMDI1MDMzMCA6IEFyY2hpdmFjZSBrbmloXHJcbiAgICAgICAgICAgICAgICAvLyBmb3Jtw6F0IGdyaWR1XHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiB0aGF0LmdldEdyaWRGb3JtYXQocmFkZWsudHlwX2FnISksXHJcbiAgICAgICAgICAgICAgICAvLyBwcmltw6FybsOtIGtsw63EjSBkYXQgdiBncmlkdVxyXG4gICAgICAgICAgICAgICAga2V5czogXCJpeHBfZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAvLyBkYXRhIHBybyBncmlkIChwcm8gcHJ2bsOtIGtyb2spXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBrbmloeSxcclxuICAgICAgICAgICAgICAgIC8vIHR5cCBpbmRpa8OhdG9yxa8gbmFkIGdyaWRlbSAoS1BJIG5lYm8gYmFkZ2UpXHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JUeXBlOiBcIktQSVwiLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIHBydm7DrSBrcm9rIC0gemFkw6Fuw60gcGFyYW1ldHLFryBhIGtvbnRyb2xhLCBwxZlpIHDFmWVjaG9kdSBuYSBkYWzFocOtIGtyb2sgc2UgemF2b2zDoSBzcHXFoXTEm27DrSB2bGFzdG7DrSBvcGVyYWNlXHJcbiAgICAgICAgICAgICAgICBmaXJzdFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuw6F6ZXYga3Jva3VcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwMzI2XCIgKyBcIiAtIFwiICsgcmFkZWsuYWdlbmRhLCAvL1JDIDMwMjUwMzI2IDogQXJjaGl2YWNlIGtuaWhcclxuICAgICAgICAgICAgICAgICAgICAvLyBwb3BpcyBvcGVyYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDMyN1wiICsgXCIgLSBcIiArIHJhZGVrLmFnZW5kYSAsIC8vUkMgMzAyNTAzMjcgOiBQxZllc3VuIGRva2xhZMWvIHZ5YnJhbsO9Y2gga25paCBkbyBhcmNow612dVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hZCBncmlkZW0gem9icmF6aXQgS1BJL2JhZGdlIHMgcG/EjXR5IHrDoXpuYW3Fr1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3dJbmRpY2F0b3I6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9ybXVsw6HFmSBzIHBhcmFtZXRyeVxyXG4gICAgICAgICAgICAgICAgICAgIC8vZm9ybTogZm9ybVBhcmFtcyxcclxuICAgICAgICAgICAgICAgICAgICAvLyBtb2RlbCBwcm8gcGFyYW1ldHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgLy9tb2RlbERhdGE6IG1vZGVsRGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYWRwaXMgdGFidSBzIHBhcmFtZXRyeVxyXG4gICAgICAgICAgICAgICAgICAgIC8vZm9ybVRhYlRpdGxlOiBcIlBhcmFtZXRyeSBzdG9ybmFcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYWRwaXMgdGFidSBzIGdyaWRlbVxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJqcmVzOjMwMjUwMzI0XCIgKyBcIiAtIFwiICsgcmFkZWsuYWdlbmRhLCAvL1JDIDMwMjUwMzI0IDogU2V6bmFtIGtuaWhcclxuICAgICAgICAgICAgICAgICAgICAvLyBvYnNsdWhhIHptxJtueSBwYXJhbWV0cnVcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZENoYW5nZURlbGVnYXRlOiB1bmRlZmluZWQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG7DoXpldiBha2NlLCBrdGVyw6EgcHJvdmVkZSBwb8W+YWRvdmFub3Ugb3BlcmFjaSAodGxhxI3DrXRrbyB2cHJhdm8gZG9sZSlcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uTmFtZTogXCJqcmVzOjMwMjUwMzMxXCIsIC8vUkMgMzAyNTAzMzEgOiBBcmNoaXZvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbWV0b2RhIHZvbGFuw6EgcMWZaSBwxZllY2hvZHUgbmEgZGFsxaHDrSBrcm9rIChwcm92ZWRlbsOtIHZsYXN0bsOtIG9wZXJhY2UpIChwcmFjdWplIG5hZCBkYXR5IHplIHZzdHVwdSwgdnJhY8OtIGFrdHXDoWxuw60gZGF0YSB6IGRhdGFiw6F6ZSArIHbDvXNsZWRlayBvcGVyYWNlKVxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9ICQuY29udGVudChjbnQkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlZmZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkRvdGF6KHRoYXQsIFwianJlczozMDI1MDMzNFwiKSAvL1JDIDMwMjUwMzM0IDogQXJjaGl2YWNlIGplIG5ldnJhdG7DoSBvcGVyYWNlLiBPcHJhdmR1IGNoY2V0ZSBwcm92w6lzdCBhcmNoaXZhY2kga25paD8gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gXCJZRVNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFzayA9IEdvcmRpYy5Bc3luYy5HVGFza01hbmFnZXIuc3RhcnQ8R29yZGljLkFzeW5jLklHVGFza1Byb2dyZXNzLCBhbnk+KFwiR29yZGljLkludS5TZXJ2ZXIuR0ludUFyY2hpdmFjZUtuaWhBc3luY1wiLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzczogMCwgdG90YWw6IDEwMCwgdGV4dDogXCJqcmVzOjMwMjUwMzMzXCIsIC8vUkMgMzAyNTAzMzMgOiBTdGFydCBhcmNoaXZhY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbEFjdGlvbjogbmV3IEdBY3Rpb24oeyBjYXB0aW9uOiBcImpyZXM6MzAyNTAzMzJcIiwgcnVuOiAoKSA9PiB7IHRhc2suY2FuY2VsKCkgfSwgbmFtZTogXCJjYW5jZWxBY3RcIiB9KSAvL1JDIDMwMjUwMzMyIDogU3Rvcm5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOyAvL1JDIDMwMjUwMzMyIDogU3Rvcm5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2suZ2V0UHJvbWlzZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmZlci5yZXNvbHZlKHJlc3VsdC5yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIHJlc3VsdCBhcyBhbnk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkucHJvZ3Jlc3MoKGE6IHsgcHJvZ3Jlc3M/OiBHb3JkaWMuQXN5bmMuSUdUYXNrUHJvZ3Jlc3MgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhLnByb2dyZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByb2dyZXNzT3BlcmF0aW9uKHsgcHJvZ3Jlc3M6IGEucHJvZ3Jlc3MuY3VycmVudCwgdG90YWw6IGEucHJvZ3Jlc3MudG90YWwsIHRleHQ6IGEucHJvZ3Jlc3MudGV4dCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7IHRoYXQuZW5kT3BlcmF0aW9uKCkgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHsgZGVmZmVyLnJlamVjdCgpIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmZlci5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWtjZSBuYSB0YWJ1IHMgZ3JpZGVtXHJcbiAgICAgICAgICAgICAgICAgICAgLy9tZW51R3JpZEJhcjogW1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gZGV0YWlsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBhY3Rpb246IGRldGFpbEFrY2VcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vXSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBha2NlIHZvbGFuw6EgbmEgZHZvamtsaWsgdiBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVmYXVsdEFjdGlvbjogZGV0YWlsQWtjZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBkcnVow70gKHBvc2xlZG7DrSkga3JvayAtIHpvYnJhemVuw60gdsO9c2xlZGt1IG9wZXJhY2VcclxuICAgICAgICAgICAgICAgIGxhc3RTdGVwOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG7DoXpldiBrcm9rdVxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzAyNTAzMjhcIiwgLy9SQyAzMDI1MDMyOCA6IFbDvXNsZWRla1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBwYXJhbWV0cnkganNvdSB2IHRvbXRvIGtyb2t1IGppxb4gbmVlZGl0b3ZhdGVsbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlRm9ybUZpZWxkczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbmFkcGlzIHRhYnUgcyBncmlkZW1cclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwianJlczozMDI1MDMyOVwiICsgXCIgLSBcIiArIHJhZGVrLmFnZW5kYSwgLy9SQyAzMDI1MDMyOSA6IFpwcmFjb3ZhbsOpIGtuaWh5XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIG9ic2x1aGEgw7pzcMSbxaFuw6lobyB1a29uxI1lbsOtIHByxa92b2RjZSAobmEgcm96ZMOtbCBvZCB6cnXFoWVuw60gcHLFr3ZvZGNlIHDFmWVzZWxla3RvdsOhdsOhIHNlem5hbSlcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlRGVsZWdhdGU6ICh2aWV3KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9GdWNHcmlkLndpemFyZEVuZCh0aGF0LCBpa2MsIHRydWUsIHsgbWV0aG9kQ2FsbGVkSWZTdWNjZXNzOiAoKSA9PiB7IHRoYXQubmFjdGVuaVNlem5hbXUoKTsgfSB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gb2JzbHVoYSB6cnXFoWVuw60gcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxEZWxlZ2F0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vRnVjR3JpZC53aXphcmRFbmQodGhhdCwgaWtjLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9ibm92aXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVmcmVzaCgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoYXQuJGdyaWQgIT09IFwidW5kZWZpbmVkXCIgJiYgdGhhdC4kZ3JpZC5oYXNDbGFzcyhcImdncmlkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmlldyA9IHRoYXQuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICAgICAgdmlldy5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdHlwZSBJR0RldGFpbEFyY2hpdmFjZUR0b1dpdGhUYWJTZXR0aW5ncyA9IElHRGV0YWlsQXJjaGl2YWNlO1xyXG5cclxuXHJcbn0iXX0=
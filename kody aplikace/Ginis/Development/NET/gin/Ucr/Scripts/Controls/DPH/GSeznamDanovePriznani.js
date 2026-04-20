"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            /**
             * Danove priznani
             *
             * @author tkares
             * @since 484.1.0.69
             */
            let GSeznamDanovePriznani = class GSeznamDanovePriznani extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    // grid se senamem
                    //private $grid: JQuery<HTMLElement>;
                    /**
                     * trida gridu
                     */
                    this.classGrid = "js-grid-base";
                    this.loadingData = false; // atribut nacitani dat
                    this.profilName = "userProfile"; // jmeno profilu
                }
                // nastaveni id a titulku okna
                // title = "jres:30250085"; //RC 30250085 : Daňová evidence
                onContentReady() {
                    var that = this;
                    // ulozeni spustene ulohy
                    this?.parentContent?.userSettings.set("lastAction", this.taskId);
                    this.actions.add({
                        name: "zapisyAct",
                        icon: "gi-list",
                        enabled: false,
                        caption: "jres:30250089", //RC 30250089 : Zápisy
                        run: function (ev, ctx) {
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            var row = grid.ggrid("activeRow");
                            if (row === null)
                                return;
                            grid.ggrid("activeCellAddress");
                            //var column = that.$grid.ggrid("activeCellAddress").col;
                            that.showZapisy(row, "");
                        }
                    });
                    this.actions.add(GAction.createPrintAction({
                        name: "printAct",
                        tema: "inu_ptm_prizdph,inu_ptm_dandolo,inu_ptm_dphsest",
                        enabled: false,
                        parentContent: this,
                        //reportGeneratorType: "Gordic.Ucr.WebClient.GSeznamEkoZaznamuGenerator",
                        serverParameterMethod: "Gordic.Ucr.WebClient.GUcrPrintParameters:ServerParameterMethodTiskDanovaPriznani",
                        reportStarting: function (rep) {
                            // zjisteni filtru
                            var filter = that.GetFilter().gfilterpanel('getCurrentData');
                            // naplneni filtru
                            rep.customDto = { MesicDPH: filter.mesic, Ucs: filter.ucs, Uus: filter.uus };
                        }
                    }));
                    this.menuBar([
                        //{ action: that.actions.newAct, favorite: true, captionVisible: "never" },
                        { action: that.actions.zapisyAct, favorite: true },
                        { action: that.actions.printAct, favorite: true }
                    ]);
                    // vytvoreni fitru panelu
                    this.createFilterPanel(this);
                    let provider = new Gordic.Data.Provider(() => {
                        that.loadingData = true;
                        return that.loadData();
                    });
                    let view = new Gordic.Data.View([], { processors: { provider: provider } });
                    var sloupce = that.createGridFormat();
                    const grid = $.newDiv(this.classGrid)
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        data: view,
                        columns: sloupce,
                        selection: function (ev, info) {
                            var rows = info.getSelection();
                            //that.clearControls();
                            if (rows.length > 0) {
                                //that.previewController.enable(true);
                                //that.previewController.show({ currentRow: rows[0], viewMode: true, cols: that.cols });
                            }
                            //else
                            //    that.previewController.enable(false);
                        },
                        defaultProfile: { name: "default", columnList: "radek_dph,nazev,c_akt_2,c_akt_1,c_akt_3,c_akt_4" },
                        profiles: [
                            { name: that.profilName, columnList: "radek_dph,nazev,c_akt_2,c_akt_1,c_akt_3,c_akt_4" },
                        ],
                        defaultAction: new GAction({
                            name: "gridZobzaZapisyAct",
                            run: function (ev, ctx) {
                                let data;
                                let grid = that.getGrid();
                                if (grid == null)
                                    return;
                                if (ctx.cellInfo && ctx.cellInfo.data)
                                    data = ctx.cellInfo.data;
                                else
                                    data = grid.ggrid("getSelection")[0];
                                //zobrazeni detailu
                                that.showZapisy(data, ctx.cellInfo.column.field);
                            }
                        }),
                        //profileVisible: true,
                    });
                    grid.ggridserverfilter({});
                    //#region Preview v sidebaru
                    //this.element.gsidebar("option", "right", { userSettings: this.userSettings!, width: 500, visible: true, pinned: false });
                    /*
                    this.previewController = new Gordic.Previews.GPreviewController(this.element, {
                        useSubtask: false,
                        panelOptions: {
                            caption: "jres:30250097", //RC 30250097 : Náhled detailu daňové evidence
                            side: "right"
                        },
                        tabs: [{
                            caption: "jres:30250097", //RC 30250097 : Náhled detailu daňové evidence
                            customLoad: (tab, dto) => {
                                let elm = $("<div>").gcontent(Gordic.Ucr.WebClient.GDetailDanoveEvidence, { parentContent: this }); //Nutne pro spravne spojeni s kontextem hlavniho contentu
                                //let tabSettings = dto.tabSettings;
                                //delete dto.tabSettings;
                                //debugger;
                                $.content<Gordic.Ucr.WebClient.GDetailDanoveEvidence>(elm).init(dto);
        
                                $(tab).empty().append(elm);
                            }
                        }]
                    });
                    */
                    //#endregion
                    //#region Kl. zkratky
                    this.element.gshortcut({
                        key: "INSERT",
                        description: "jres:31100226", //RC 31100226 : Načtení dat
                        group: Gordic.Shortcuts.Groups.Task,
                        canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                        action: new GAction({
                            name: "LoadDataAct",
                            run: (ev, ctx) => {
                                //this.loadData();
                                let grid = that.getGrid();
                                if (grid == null)
                                    return;
                                grid.ggrid("getView").requestData(undefined);
                            }
                        }),
                    });
                    this.element.gshortcut({
                        key: "DELETE",
                        description: "jres:31100181", //RC 31100181 : Vyčistit
                        canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                        group: Gordic.Shortcuts.Groups.Task,
                        action: new GAction({
                            name: "clearFilterRowAct",
                            caption: "jres:31100267", //RC 31100267 : Vyčistit filtr seznamu
                            icon: "gi-bin",
                            run: (ev, ctx) => {
                                that.loadingData = true;
                                this.$filterPanel.gfilterpanel("clear");
                                that.loadingData = false;
                            }
                        }),
                    });
                    this.element.gshortcut({
                        key: "0",
                        description: "jres:31100228", //RC 31100228 : Vyčistit a načíst
                        canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                        group: Gordic.Shortcuts.Groups.Task,
                        action: new GAction({
                            name: "clearAndFilterAct",
                            run: (ev, ctx) => {
                                this.$filterPanel.gfilterpanel("clear");
                                let grid = that.getGrid();
                                if (grid == null)
                                    return;
                                grid.ggrid("getView").requestData(undefined);
                            }
                        }),
                    });
                    grid.gshortcut({
                        key: "ctrl+shift+lclick",
                        group: Gordic.Shortcuts.Groups.Grid,
                        description: "jres:31100229", //RC 31100229 : Přenesení hodnoty do filtru.
                        action: new GAction({
                            name: "selFilterAct",
                            run: (ev, ctx) => {
                                this.dispatchFillServerGridEvent(ev);
                            }
                        }),
                    });
                    grid.gshortcut({
                        key: "ctrl+lclick",
                        group: Gordic.Shortcuts.Groups.Grid,
                        description: "jres:31100235", //RC 31100235 : Přenesení hodnoty do filtru a vyhledání.
                        action: new GAction({
                            name: "selFilterAndSearchAct",
                            run: (ev, ctx) => {
                                this.dispatchFillServerGridEvent(ev);
                                const grid = that.getGrid();
                                if (grid == null)
                                    return;
                                grid.ggrid("getView").requestData(undefined);
                                //this.loadData();
                            }
                        }),
                    });
                    //grid.gshortcut();
                    //}
                    //#endregion
                    // nastaveni viditelnych sloupcu
                    grid.ggrid("useProfile", { name: that.profilName, columnList: that.getColsByRozpad(that.getRozpad()) + "radek_dph,nazev,c_akt_2,c_akt_1,c_akt_3,c_akt_4" });
                    //// nastaveni hodnot uus, pokud je Rezim DPH = uus, pak je problem a nic se neozbrazi
                    //if (that.Globals.Params?.RezimDPH == Gordic.Uct.Interface.GUcrRezimDph.Uus)
                    //    that.findFields("uus").gfield("setValue", { uus: that.Globals.EkoParams?.UUS });
                    //this.setVisibleColumns();
                }
                /**
                 * Vraci objekt gridu
                 * @returns
                */
                getGrid() {
                    var data = this.element.find("." + this.classGrid);
                    return (data.length == 0 ? null : data);
                }
                /**
                 * Nastaveni titulku okna
                 * @param month
                 */
                setTitle(month) {
                    let that = this;
                    //this.srv = new GContent("Gordic.Uct.WebClient.GUctDetail");  //sluzba pro pristup k datum na serveru
                    this.call("GetTitle", { month: month })
                        .then((result) => {
                        debugger;
                        that.title = result; //RC 30250595 : Daňová přiznání
                    });
                }
                /**
                 * Prevedeni kliku na bunku do filtru a nacteni
                 * @param ev
                 */
                dispatchFillServerGridEvent(ev) {
                    var $col = $(ev.target);
                    if (!ev.ctrlKey || !$col.hasClass("cell") || $col.hasClass("js-cfu-cell"))
                        return;
                    let selection = document.getSelection();
                    if (ev.shiftKey && selection)
                        selection.empty(); //Pokud se vybira pres kl. zkratku ctrl+shift+lclick, tak at se neoznacuje text
                    var colIndex = $col.attr("data-column-index");
                    const grid = this.getGrid();
                    if (grid == null)
                        return;
                    var colDef = grid.ggrid("trueColumns", false)[colIndex];
                    if (colDef.serverFilter) {
                        let value = $col.text();
                        if (!value)
                            return; //NOTE: Pokud neni hodnota, tak asi neni co resit. Resi hlavne bug s textovou hodnotou v ciselnych sloupcich
                        let sel = grid.ggrid("getSelection", false)[0];
                        //NOTE: Tohle je spatny zpusob, cele by to chtelo prepsat, aby se neslo po stringu z bunky, ale po datech. 
                        //      Poptat se Skalice, jestli exituje nejaky lepsi zpusob...
                        if (colDef.columnType === "datetime")
                            value = sel[colDef.name];
                        else if (colDef.columnType === "currency")
                            value = sel[colDef.name];
                        var $filterFrmBox = grid.ggridserverfilter("findFields", colDef.name);
                        $filterFrmBox.gfield("setValue", value, { valid: false });
                    }
                }
                /**
                 * Zobrazeni ucetnich zapisu
                 * @param row
                 */
                showZapisy(row, column) {
                    let id;
                    debugger;
                    // definice zd
                    var zd = undefined;
                    var zdStart = 1;
                    var zdEnd = 4;
                    if (column.indexOf("c_", 0) >= 0) {
                        var tmp = (column.substring(column.length - 1, 1));
                        if (isNumeric(tmp)) {
                            zd = parseInt(tmp);
                            if (zd != 1 && zd != 2 && zd != 3 && zd != 4)
                                zd = 0;
                        }
                    }
                    // pokud je zd 0, beru cely rozsah
                    if (zd == 0) {
                        zdStart = 1;
                        zdEnd = 4;
                    }
                    else {
                        zdStart = zd;
                        zdEnd = zd;
                    }
                    //NOTE: Odpovida z TK UCR: GSeznamZapisuVRadkuTab.LoadGridData()
                    let filter = {
                        //uef: { start: row.radek_dph!, end: row.radek_dph! },
                        rok_uej: { start: row.rok, end: row.rok },
                        mesic_uej: { start: row.mesic, end: row.mesic },
                        zd: { start: zdStart, end: zdEnd }
                    };
                    if (this.getRozpad()) {
                        filter.ico = { start: row.ico, end: row.ico };
                        filter.ucs = { start: row.ucs, end: row.ucs };
                        filter.uus = { start: row.uus, end: row.uus };
                    }
                    let typUlohy = 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */;
                    id = "uctZapisy#"; //NOTE: Musi byt stejne ni na MainApp.cs
                    var title = "jres:30250133" //RC 30250133 : Zápisy DPH
                        + ": " + row.radek_dph
                        + " " + row.nazev;
                    this.navigate('Gordic.Ucr.WebClient.GSeznamEkoZaznamu', {
                        ID: id,
                        TypUlohy: typUlohy,
                        Filter: filter,
                        StrictFilter: false,
                        CurrentRow: row,
                        Zapisova: true,
                        VolanoZUlohy: 6 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.DanovePriznaniZapis */,
                        Radek_DPH: row.radek_dph,
                        AutoLoadData: true,
                        UseSumCount: typeof zd === "undefined" || zd == 0 ? false : true,
                        JmenoOkna: title
                    });
                }
                /**
                 * Uprava viditelnosti akci
                 *
                 * */
                setActions(pocetRadku) {
                    // pokud neni grid, nic nedelej
                    if (this.closed)
                        return;
                    this.actions.zapisyAct.update({ enabled: pocetRadku > 0 });
                    this.actions.printAct.update({ enabled: pocetRadku > 0 });
                }
                ///**
                // *  Nastaveni titulku okna
                // * 
                // * */
                //private setFormTitle(month: any) {
                //    var that = this;
                //    this.call("GetTitle", { month: month })
                //        .done(function (result) {
                //            that.setBreadcrumbs([{ caption: result + ", " + that.rezimDPHtxt, defaultAction: true }]);                    
                //        }
                //        );
                //}
                /**
                 * Vraceni hodnota nastaveni rozpadu
                 * */
                getRozpad() {
                    var that = this;
                    var rozpad = false;
                    var filter = that.GetFilter().gfilterpanel('getCurrentData');
                    if (typeof filter.rozpad !== "undefined" && filter.rozpad.length > 0) {
                        for (var i = 0; i < filter.rozpad.length; i++)
                            if (filter.rozpad[i] == 5) {
                                rozpad = true;
                                break;
                            }
                    }
                    return rozpad;
                }
                /**
                 * Zjisteni jmena sloupce dle nastaveni rozpadu
                 *
                 * */
                getColsByRozpad(rozpad) {
                    if (!rozpad)
                        return "";
                    var that = this;
                    var columns = "";
                    if (that.Globals.Params?.Dph_Rezim == 0 /* Gordic.Uct.Interface.GUcrRezimDph.Ico */)
                        columns = "ucs,uus,";
                    else if (that.Globals.Params?.Dph_Rezim == 1 /* Gordic.Uct.Interface.GUcrRezimDph.Ucs */)
                        columns = "uus,";
                    return columns;
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
                    var vybranyMesic = undefined;
                    if (that.listMonth.length > 0)
                        vybranyMesic = that.listMonth[that.listMonth.length - 1];
                    //debugger;            
                    //that.$filterPanel.gfilterpanel("getCurrentData");
                    var filterFormDef = new Gordic.Forms.Form({ /*opened: true, layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1",*/ tabLabel: "jres:30250052" }) //RC 30250052 : Filtr
                        .addSection()
                        .addRow("jres:30250124") //RC 30250124 : Měsíc
                        .addField("gselectbox", {
                        name: "mesic",
                        multi: false,
                        list: true, itemWidth: "",
                        dropdown: false,
                        initialValue: vybranyMesic,
                        model: "model.mesic=value"
                        //, strict: true,
                        //, validators: [new Gordic.Validators.Required()]
                        //, itemTemplate: "{priz_zpl_kh_txt}"
                        //, modelDefaults: that.filtertMonth[that.filtertMonth.length                    
                        ,
                        data: that.listMonth,
                        change: function (ev, obj) {
                            //if (that.loading || (obj.flags && obj.flags.filterClear===true)) return;
                            //that.setFormTitle(obj.value);
                            //var view = that.$grid.ggrid("getView");
                            //view.requestData();
                            //that.$grid.ggrid<Gordic.Uct.Interface.GEkoSeznamDphFilterDto>("useProfile", {columnList:"" })
                        }
                    })
                        .addRow({ label: "jres:30250056" }).addField("gselectbox", //RC 30250056 : IČO
                    Gordic.Prefabs.Select.ekosico(), {
                        name: "ico",
                        initialValue: { ico: this.Globals.EkoParams?.ICO },
                        model: "model.ico=value.ico",
                        disabled: true,
                    })
                        .addRow("jres:30250055").addField("gselectbox", //RC 30250055 : UCS
                    Gordic.Prefabs.Select.ekosucs(), {
                        name: "ucs", dropdown: false, customClass: "js-ucs",
                        model: "model.ico1=value.ico;model.ucs=value.ucs",
                        itemTemplate: "{ucs:trim:encode}",
                        initialValue: (that.Globals.Params?.Dph_Rezim === 1 /* Gordic.Uct.Interface.GUcrRezimDph.Ucs */ || that.Globals.Params?.Dph_Rezim === 2 /* Gordic.Uct.Interface.GUcrRezimDph.Uus */) ? { ico: that.Globals.EkoParams?.ICO, ucs: that.Globals.EkoParams?.UCS } : undefined,
                        serverFilters: {
                            //aktivita: 100,
                            ico: this.Globals.EkoParams?.ICO,
                            //    //rok_od: "<= " +this.ekoParams.Rok,
                            //    //rok_do: ">= " +this.ekoParams.Rok,
                        },
                        change: function (ev, changeObj) {
                            if (that.Globals.Params?.Dph_Rezim !== 2 /* Gordic.Uct.Interface.GUcrRezimDph.Uus */)
                                $(this).gform().findFields("uus").gfield("clear");
                        },
                        disabled: that.Globals.Params?.Dph_Rezim == 1 /* Gordic.Uct.Interface.GUcrRezimDph.Ucs */ || that.Globals.Params?.Dph_Rezim == 2 /* Gordic.Uct.Interface.GUcrRezimDph.Uus */
                    })
                        .addRow("jres:30250122").addField("gselectbox", //RC 30250122 : UUS
                    Gordic.Prefabs.Select.ekosuus(), {
                        name: "uus", dropdown: false,
                        model: "model.ico2=value.ico;model.ucs1=value.ucs;model.uus=value.uus",
                        itemTemplate: "{uus:trim:encode}",
                        initialValue: (that.Globals.Params?.Dph_Rezim == 2 /* Gordic.Uct.Interface.GUcrRezimDph.Uus */) ? { ico: that.Globals.EkoParams?.ICO, ucs: that.Globals.EkoParams?.UCS, uus: that.Globals.EkoParams?.UUS } : undefined,
                        serverFilters: {
                            //aktivita: 100,
                            ico: this.Globals.EkoParams?.ICO,
                            ucs: function () {
                                debugger;
                                var value = $(this).gform().findFields("ucs").gfield("getValue");
                                if (value)
                                    return value.ucs;
                                return undefined;
                            }
                            //    //rok_od: "<= " +this.ekoParams.Rok,
                            //    //rok_do: ">= " +this.ekoParams.Rok,
                        },
                        disabled: that.Globals.Params?.Dph_Rezim === 2 /* Gordic.Uct.Interface.GUcrRezimDph.Uus */,
                    })
                        .addRow().addField("gselectbox", {
                        name: "rozpad", multi: true, list: true, itemWidth: "",
                        dropdown: true
                        //, model: "model.s_zau=value.s_zau", itemTemplate: "{s_zau_txt}"
                        ,
                        itemTemplate: "{rozpad_txt}",
                        model: "model.rozpad=value.rozpad",
                        helperColumns: ["rozpad_txt"],
                        data: new Gordic.Data.View([
                            { rozpad_txt: "jres:30250132", rozpad: 5 } //RC 30250132 : S rozpadem
                            //, { rozpad_txt: "jres:30250130", rozpad: 4 } //RC 30250130 : Zvýraznit                        
                        ], { key: "rozpad" })
                        //, initialValue: { vybery: 1 }
                        ,
                        change: function (ev, obj) {
                            console.log("rozpad", obj);
                            if (that.loading || (obj.flags && obj.flags.filterClear === true))
                                return;
                            if (that.loading)
                                return;
                            var columns = "";
                            if (obj && typeof obj.value !== "undefined" && obj.value.length > 0) {
                                for (var i = 0; i < obj.value.length; i++) {
                                    switch (obj.value[i].rozpad) {
                                        case 5: // S rozpadem                                        
                                            columns = that.getColsByRozpad(true);
                                            break;
                                    }
                                }
                            }
                            const grid = that.getGrid();
                            if (grid == null)
                                return;
                            var userProfil = grid.ggrid("getCurrentProfile");
                            console.log("userProfil", userProfil);
                            userProfil.columnList = userProfil.columnList?.replace("ucs,uus,", "").replace("uus,", "");
                            userProfil.columnList = columns + userProfil.columnList;
                            grid.ggrid("profileChanges", userProfil);
                            if (columns != "")
                                // nacteni dat
                                grid.ggrid("getView").requestData();
                        }
                    })
                        .addSection({ /*layoutDescriptor: "L-4-8-4, M-4-8-0, S-4-8-0",*/ customClass: "w-L-12 w-M-12 w-S-12" })
                        .addRow().addField("gselectbox", {
                        name: "vybery", multi: true, list: true, itemWidth: "",
                        dropdown: true
                        //, model: "model.s_zau=value.s_zau", itemTemplate: "{s_zau_txt}"
                        ,
                        itemTemplate: "{vyber_txt}",
                        model: "model.vybery=value.vybery",
                        helperColumns: ["vyber_txt"],
                        data: new Gordic.Data.View([
                            { vyber_txt: "jres:30250127", vybery: 1 } //RC 30250127 : Aktualni stav
                            ,
                            { vyber_txt: "jres:30250128", vybery: 2 } //RC 30250128 : Přiznáno
                            ,
                            { vyber_txt: "jres:30250129", vybery: 3 } //RC 30250129 : Zbývá přiznat
                            ,
                            { vyber_txt: "jres:30250130", vybery: 4 } //RC 30250130 : Zvýraznit                        
                            //, { vyber_txt: "jres:30250132", vybery: 5 } //RC 30250132 : S rozpadem
                        ], { key: "vybery" }),
                        initialValue: { vybery: 1 },
                        change: function (ev, obj) {
                            console.log("Vybery", obj);
                            if (that.loading)
                                return;
                            var columns = "radek_dph,nazev";
                            //if (that.Globals.RezimDPH == Gordic.Uct.Interface.GUcrRezimDph.Ico)
                            //    oolumns = "ucs,uus," + oolumns;
                            //else if (that.Globals.RezimDPH == Gordic.Uct.Interface.GUcrRezimDph.Ucs)
                            //    oolumns = "uus," + oolumns;
                            var nameProfilePostFix = "000";
                            var condFormat = undefined;
                            if (obj && typeof obj.value !== "undefined" && obj.value.length > 0) {
                                for (var i = 0; i < obj.value.length; i++) {
                                    switch (obj.value[i].vybery) {
                                        case 1: // aktualni stav
                                            columns += ",c_akt_2,c_akt_1,c_akt_3,c_akt_4";
                                            nameProfilePostFix = "1" + nameProfilePostFix.substring(1);
                                            break;
                                        case 2: // Přiznáno
                                            columns += ",c_priz_1,c_priz_2,c_priz_3,c_priz_4";
                                            nameProfilePostFix = nameProfilePostFix.substring(0, 1) + "1" + nameProfilePostFix.substring(2);
                                            break;
                                        case 3: // Přiznáno
                                            columns += ",c_diff_2,c_diff_1,c_diff_3,c_diff_4";
                                            nameProfilePostFix = nameProfilePostFix.substring(0, 2) + "1";
                                            break;
                                        case 4: // Zvyraznit
                                            condFormat = that.condFormats;
                                            break;
                                        //case 5: // S rozpadem                                        
                                        //    break;
                                    }
                                }
                            }
                            if (columns != "") {
                                let grid = that.getGrid();
                                if (grid == null)
                                    return;
                                var userProfil = grid.ggrid("getCurrentProfile");
                                console.log("userProfil", userProfil);
                                if (false && userProfil.name == that.profilName /*+ nameProfilePostFix*/) {
                                    // profil ji existuje, upravim sloupce a podminene podbarveni
                                    userProfil.columnList = that.getColsByRozpad(that.getRozpad()) + columns;
                                    userProfil.condFormats = condFormat;
                                    if (grid == null)
                                        return;
                                    //grid.ggrid<Gordic.Uct.Interface.GEkoSeznamDphFilterDto>("useProfile", { name: userProfil.name, columnList: userProfil.columnList, condFormats: condFormat });
                                }
                                else
                                    grid.ggrid("useProfile", { name: that.profilName /* + nameProfilePostFix*/, columnList: that.getColsByRozpad(that.getRozpad()) + columns, condFormats: condFormat });
                            }
                        }
                    });
                    return filterFormDef;
                }
                /**
                 * Vytvoreni filtrovaciho panelu
                 * @param that
                 */
                createFilterPanel(that) {
                    this.$filterPanel = $.newDiv("js-filtr")
                        .appendTo(this.element)
                        .gfilterpanel({
                        helperCustomizer: function (data) {
                            var polSort = data.sort(function (a, b) { return a.name >= b.name; });
                            return polSort;
                        },
                        forms: [that.CreateFilterZalozka()],
                        filterStorageService: new Gordic.Gin.FilterStorageService.Store(),
                        filterViewModeUserSettings: [FilterViewMode.Detail /*, FilterViewMode.Normal*/],
                        //simpleModeAutoLoadAfterCreatePanel: false,
                        //userDefaultFilter: true,
                        // 01.03.2021 - TFeik
                        // Nahrazení obsolete parametrů.
                        filterViewMode: FilterViewMode.Simple,
                        //simpleMode: true,
                        primaryButtonBehaviour: "AlwaysPrimary",
                        favoriteLayoutDescriptor: "L4M3S1",
                        clearFilterButtonVisible: "AlwaysVisible",
                        autoLoadAfterChoseFilter: false,
                        //filterHelperItemTemplate: "<b>{nazev}</b>",
                        //textItemTemplate: "{nazev}",
                        apply: function (event, obj) {
                            console.log("filterForm.apply", obj);
                            that.log.trace("filterForm.apply", obj);
                            if (that.loadingData)
                                return;
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            var view = grid.ggrid("getView");
                            view.requestData(obj.filter);
                        },
                        reset: (ev, data) => {
                            that.loadingData = true;
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            grid.ggridserverfilter("clear");
                            //this.$filterPanel.gfilterpanel("clear");
                            that.loadingData = false;
                        }
                    });
                }
                /**
                 * Vraci objekt filtru
                 * @param {GContent} content
                 * @returns
                 */
                GetFilter() {
                    //debugger;
                    if (Gordic.Utils.WidgetExists("gfilterpanel", this.$filterPanel))
                        return this.$filterPanel;
                    else
                        throw "Nenalezen filtr";
                    //return content?.element.find(".js-filtr.gfilterpanel");
                    //return $(".js-filtr");
                }
                /**
                 *  Nacteni dat
                 */
                loadData() {
                    let that = this;
                    let def = $.Deferred();
                    //            var view = new Gordic.Isl.View(Gordic.Isl.UcrPozadavek.list({ filters: { ixs_ses: typMsk } }));
                    let maska = {};
                    //var filterDto: Gordic.Uct.Interface.GEkoSeznamDphFilterDto = {};
                    //if (!filter) {
                    let _filter = that.GetFilter();
                    let filter = _filter.gfilterpanel('getCurrentData');
                    //}
                    maska.ico = { start: filter.ico, end: filter.ico };
                    maska.mesic = { start: filter.mesic, end: filter.mesic };
                    maska.ucs = { start: filter.ucs, end: filter.ucs };
                    maska.uus = { start: filter.uus, end: filter.uus };
                    console.log("loaddata.filter", filter);
                    let grid = this.getGrid();
                    if (grid == null)
                        return $.Deferred().reject().promise();
                    grid.ggridserverfilter("collect", maska)
                        .then((filterServer) => {
                        maska = filterServer;
                        //maska. = filter.
                        // zjisteni, zda se sumovat na serveru
                        var summary = !that.getRozpad();
                        //if (typeof filter.rozpad !== "undefined" && filter.rozpad.length > 0) {
                        //    for (var i = 0; i < filter.rozpad!.length; i++) 
                        //        if (filter.rozpad![i] == 5) {
                        //            summary = false; break;
                        //        }
                        //}
                        let filtr = {
                            Maska: maska, Limit: 0, Summary: summary
                        };
                        debugger;
                        that.isl.UcrDph.list({ rq: filtr })
                            .get()
                            .then(function (result) {
                            debugger;
                            //at.setActions(result.ListValues?.length as any);
                            that.loadingData = false;
                            that.setTitle(filter.mesic);
                            that.setActions(result.data.length);
                            return def.resolve(result);
                        })
                            .catch((error) => {
                            def.reject();
                            throw error;
                        })
                            .always(function () { that.loadingData = false; });
                        return def.promise();
                    });
                    return def.promise();
                }
                /**
                 * Vytvoreni gridformatu dle predlohy
                 *
                 * @param colDefinition
                 */
                createGridFormat() {
                    var myGridFormat = new Gordic.Data.GridFormat();
                    if (this.Globals.Params?.Dph_Rezim == 0 /* Gordic.Uct.Interface.GUcrRezimDph.Ico */) {
                        myGridFormat.addTextColumn({
                            name: "ucs",
                            caption: this.Globals.Zkratky?.Ucs,
                            description: this.Globals.Zkratky?.Ucs,
                            width: 70,
                            //group: topoGroup,
                            aggregate: Gordic.Data.Aggregates.first("ucs"),
                            //serverFilter: Gordic.Eko.Filters.ucsInterval({
                            //    onlyActive: false, dialogOptions: undefined, disabled: false, firstField: undefined, name: "uus", secondField: undefined,
                            //    model: "ucs", caption: this.Globals.Zkratky?.Uus as any, maxLength: 10, aktProhl: 100, ico: this.Globals.EkoParams?.ICO as any
                            //})
                        });
                        myGridFormat.addTextColumn({
                            name: "uus",
                            caption: this.Globals.Zkratky?.Uus,
                            description: this.Globals.Zkratky?.Uus,
                            width: 60,
                            //group: topoGroup,
                            //serverFilter: Gordic.Eko.Filters.uusInterval({
                            //    onlyActive: false, dialogOptions: undefined, disabled: false, firstField: undefined, name: "uus", secondField: undefined,
                            //    model: "uus", caption: this.Globals.Zkratky?.Uus as any, maxLength: 10, aktProhl: 100, ico: this.Globals.EkoParams?.ICO as any, ucs: this.Globals.EkoParams?.UCS as any
                            //})
                        });
                    }
                    else if (this.Globals.Params?.Dph_Rezim == 1 /* Gordic.Uct.Interface.GUcrRezimDph.Ucs */) {
                        myGridFormat.addTextColumn({
                            name: "uus",
                            caption: this.Globals.Zkratky?.Uus,
                            description: this.Globals.Zkratky?.Uus,
                            width: 60,
                            //group: topoGroup,
                            //serverFilter: Gordic.Eko.Filters.uusInterval({
                            //    onlyActive: false, dialogOptions: undefined, disabled: false, firstField: undefined, name: "uus", secondField: undefined,
                            //    model: "uus", caption: this.Globals.Zkratky?.Uus as any, maxLength: 10, aktProhl: 100, ico: this.Globals.EkoParams?.ICO as any, ucs: this.Globals.EkoParams?.UCS as any
                            //})
                        });
                    }
                    myGridFormat.addTextColumn({
                        name: "radek_dph",
                        caption: "jres:30250107", //RC 30250107 : Řádek  
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "radek_dph" }),
                        width: 60,
                    });
                    myGridFormat.addTextColumn({
                        name: "nazev",
                        caption: "jres:30250106", //RC 30250106 : Název
                        width: 590,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_akt_2",
                        caption: "jres:30250108", //RC 30250108 : Základ daně
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_akt_2" }),
                        width: 150,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_priz_2",
                        caption: "jres:30250109", //RC 30250109 : Základ daně přiznáno
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_priz_2" }),
                        width: 150,
                        //, hidden: true,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_diff_2",
                        caption: "jres:30250110", //RC 30250110 : Základ daně (-)
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_diff_2" }),
                        width: 150,
                        //,hidden: true,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_akt_1",
                        caption: "jres:30250111", //RC 30250111 : Daň
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_akt_1" }),
                        width: 150,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_priz_1",
                        caption: "jres:30250112", //RC 30250112 : Daň přiznáno
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_priz_1" }),
                        width: 150,
                        //, hidden: true,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_diff_1",
                        caption: "jres:30250113", //RC 30250113 : Daň (-)
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_diff_1" }),
                        width: 150,
                        //,hidden: true,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_akt_3",
                        caption: "jres:30250114", //RC 30250114 : Daň krácený nárok
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_akt_3" }),
                        width: 150,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_priz_3",
                        caption: "jres:30250115", //RC 30250115 : Daň KN přiznáno
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_priz_3" }),
                        width: 150,
                        //, hidden: true,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_diff_3",
                        caption: "jres:30250116", //RC 30250116 : Daň KN (-)
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_diff_3" }),
                        width: 150,
                        //, hidden: true,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_akt_4",
                        caption: "jres:30250117", //RC 30250117 : Koeficient
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_akt_4" }),
                        width: 150,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_priz_4",
                        caption: "jres:30250118", //RC 30250118 : Koeficient přiznáno
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_priz_4" }),
                        width: 150,
                        //, hidden: true,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_diff_4",
                        caption: "jres:30250119", //RC 30250119 : Koeficient (-)
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_diff_4" }),
                        width: 150,
                        //, hidden: true,
                    });
                    // podminene formatovani
                    this.condFormats = [
                        {
                            description: "jres:30250670", //RC 30250670 : Nenulová hodnota
                            applyTo: "c_akt_2", formula: "(NOT(ISBLANK(@c_akt_2) or @c_akt_2 == 0))", text: Gordic.Components.Grid.CondFormats.CondFormatText.black, bg: Gordic.Components.Grid.CondFormats.CondFormatBg.green
                        },
                        { description: "jres:30250670", applyTo: "c_akt_1", formula: "( NOT(ISBLANK(@c_akt_1) or @c_akt_1 == 0))", text: Gordic.Components.Grid.CondFormats.CondFormatText.black, bg: Gordic.Components.Grid.CondFormats.CondFormatBg.green },
                        { description: "jres:30250670", applyTo: "c_akt_3", formula: "(NOT(ISBLANK(@c_akt_3) or @c_akt_3 == 0))", text: Gordic.Components.Grid.CondFormats.CondFormatText.black, bg: Gordic.Components.Grid.CondFormats.CondFormatBg.green },
                        { description: "jres:30250670", applyTo: "c_akt_4", formula: "(NOT(ISBLANK(@c_akt_4) or @c_akt_4 == 0))", text: Gordic.Components.Grid.CondFormats.CondFormatText.black, bg: Gordic.Components.Grid.CondFormats.CondFormatBg.green },
                        { description: "jres:30250670", applyTo: "c_priz_1", formula: "(NOT(ISBLANK(@c_priz_1) or @c_priz_1 == 0))", text: Gordic.Components.Grid.CondFormats.CondFormatText.black, bg: Gordic.Components.Grid.CondFormats.CondFormatBg.green },
                        { description: "jres:30250670", applyTo: "c_priz_2", formula: "(NOT(ISBLANK(@c_priz_2) or @c_priz_2 == 0))", text: Gordic.Components.Grid.CondFormats.CondFormatText.black, bg: Gordic.Components.Grid.CondFormats.CondFormatBg.green },
                        { description: "jres:30250670", applyTo: "c_priz_3", formula: "(NOT(ISBLANK(@c_priz_3) or @c_priz_3 == 0))", text: Gordic.Components.Grid.CondFormats.CondFormatText.black, bg: Gordic.Components.Grid.CondFormats.CondFormatBg.green },
                        { description: "jres:30250670", applyTo: "c_priz_4", formula: "(NOT(ISBLANK(@c_priz_4) or @c_priz_4 == 0))", text: Gordic.Components.Grid.CondFormats.CondFormatText.black, bg: Gordic.Components.Grid.CondFormats.CondFormatBg.green },
                        { description: "jres:30250670", applyTo: "c_diff_1", formula: "(NOT(ISBLANK(@c_diff_1) or @c_diff_1 == 0))", text: Gordic.Components.Grid.CondFormats.CondFormatText.black, bg: Gordic.Components.Grid.CondFormats.CondFormatBg.green },
                        { description: "jres:30250670", applyTo: "c_diff_2", formula: "(NOT(ISBLANK(@c_diff_2) or @c_diff_2 == 0))", text: Gordic.Components.Grid.CondFormats.CondFormatText.black, bg: Gordic.Components.Grid.CondFormats.CondFormatBg.green },
                        { description: "jres:30250670", applyTo: "c_diff_3", formula: "(NOT(ISBLANK(@c_diff_3) or @c_diff_3 == 0))", text: Gordic.Components.Grid.CondFormats.CondFormatText.black, bg: Gordic.Components.Grid.CondFormats.CondFormatBg.green },
                        { description: "jres:30250670", applyTo: "c_diff_4", formula: "(NOT(ISBLANK(@c_diff_4) or @c_diff_4 == 0))", text: Gordic.Components.Grid.CondFormats.CondFormatText.black, bg: Gordic.Components.Grid.CondFormats.CondFormatBg.green }
                    ];
                    return myGridFormat;
                }
            };
            GSeznamDanovePriznani = __decorate([
                Decorators.gcontent
            ], GSeznamDanovePriznani);
            WebClient.GSeznamDanovePriznani = GSeznamDanovePriznani;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbURhbm92ZVByaXpuYW5pLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbURhbm92ZVByaXpuYW5pLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0EyN0JmO0FBMzdCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EyN0JuQjtJQTM3QmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTI3QjdCO1FBMzdCb0IsV0FBQSxTQUFTO1lBQzFCOzs7OztlQUtHO1lBRUgsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBc0IsU0FBUSxPQUFBLFlBQVk7Z0JBQXZEOztvQkFTSSxrQkFBa0I7b0JBQ2xCLHFDQUFxQztvQkFDckM7O3VCQUVHO29CQUNPLGNBQVMsR0FBVyxjQUFjLENBQUM7b0JBT3JDLGdCQUFXLEdBQVksS0FBSyxDQUFDLENBQUMsdUJBQXVCO29CQUNyRCxlQUFVLEdBQVcsYUFBYSxDQUFDLENBQUMsZ0JBQWdCO2dCQTQ1QmhFLENBQUM7Z0JBMzVCRyw4QkFBOEI7Z0JBQzlCLDJEQUEyRDtnQkFDM0QsY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLHlCQUF5QjtvQkFDekIsSUFBSSxFQUFFLGFBQWEsRUFBRSxZQUFhLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBRWxFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO3dCQUNiLElBQUksRUFBRSxXQUFXO3dCQUNqQixJQUFJLEVBQUUsU0FBUzt3QkFDZixPQUFPLEVBQUUsS0FBSzt3QkFDZCxPQUFPLEVBQUUsZUFBZSxFQUFFLHNCQUFzQjt3QkFDaEQsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7NEJBQ2xCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDMUIsSUFBSSxJQUFJLElBQUksSUFBSTtn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NEMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFO3dCQUNyTyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsMkNBQTJDLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRTt3QkFDcE8sRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLDJDQUEyQyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUU7d0JBQ3BPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSw2Q0FBNkMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFO3dCQUN2TyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsNkNBQTZDLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRTt3QkFDdk8sRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLDZDQUE2QyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUU7d0JBQ3ZPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSw2Q0FBNkMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFO3dCQUN2TyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsNkNBQTZDLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRTt3QkFDdk8sRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLDZDQUE2QyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUU7d0JBQ3ZPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSw2Q0FBNkMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFO3dCQUN2TyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsNkNBQTZDLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRTtxQkFDNU8sQ0FBQztvQkFFRixPQUFPLFlBQVksQ0FBQztnQkFDeEIsQ0FBQzthQUNKLENBQUE7WUFsN0JZLHFCQUFxQjtnQkFEakMsVUFBVSxDQUFDLFFBQVE7ZUFDUCxxQkFBcUIsQ0FrN0JqQztZQWw3QlksK0JBQXFCLHdCQWs3QmpDLENBQUE7UUFDTCxDQUFDLEVBMzdCb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBMjdCN0I7SUFBRCxDQUFDLEVBMzdCZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBMjdCbkI7QUFBRCxDQUFDLEVBMzdCUyxNQUFNLEtBQU4sTUFBTSxRQTI3QmYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlVjci5XZWJDbGllbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBEYW5vdmUgcHJpem5hbmlcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciB0a2FyZXNcclxuICAgICAqIEBzaW5jZSA0ODQuMS4wLjY5XHJcbiAgICAgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbURhbm92ZVByaXpuYW5pIGV4dGVuZHMgR0NvbnRlbnRCYXNlIGltcGxlbWVudHMgSUdDb250ZW50IHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBla29QYXJhbXM6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdFa29QYXJhbXNEdG87XHJcbiAgICAgICAgLy8gc2V6bmFtIG1lc2ljdSwgcHJlcyBrdGVyZSBsemUgdnlicmF0XHJcbiAgICAgICAgcHJpdmF0ZSBsaXN0TW9udGg6IG51bWJlcltdO1xyXG4gICAgICAgIC8vIHBvc2xhbnkgdGV4dCByZXppbXUgZHBoIHplIHNlcnZlcnVcclxuICAgICAgICAvL3ByaXZhdGUgcmV6aW1EUEh0eHQ6IHN0cmluZztcclxuICAgICAgICAvLyBmaWx0cm92YWNpIHBhbmVsXHJcbiAgICAgICAgcHJpdmF0ZSAkZmlsdGVyUGFuZWw6IEpRdWVyeTtcclxuICAgICAgICAvLyBncmlkIHNlIHNlbmFtZW1cclxuICAgICAgICAvL3ByaXZhdGUgJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogdHJpZGEgZ3JpZHVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgY2xhc3NHcmlkOiBzdHJpbmcgPSBcImpzLWdyaWQtYmFzZVwiO1xyXG4gICAgICAgIC8vIGtvbnRyb2xlciBwcm8gcHJldmllIG9rbm9cclxuICAgICAgICAvL3ByaXZhdGUgcHJldmlld0NvbnRyb2xsZXI6IEdvcmRpYy5QcmV2aWV3cy5HUHJldmlld0NvbnRyb2xsZXI7XHJcbiAgICAgICAgLy8gTmFzdGF2ZW5pXHJcbiAgICAgICAgcHJpdmF0ZSBHbG9iYWxzOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyR2xvYmFsRHRvO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBjb2xzOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRWtvY3Nrb0R0b1tdO1xyXG4gICAgICAgIHByaXZhdGUgY29uZEZvcm1hdHM6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFtdOyAvLyBwb2RtaW5lbmUgZm9ybWF0b3ZhbmlcclxuICAgICAgICBwcml2YXRlIGxvYWRpbmdEYXRhOiBib29sZWFuID0gZmFsc2U7IC8vIGF0cmlidXQgbmFjaXRhbmkgZGF0XHJcbiAgICAgICAgcHJpdmF0ZSBwcm9maWxOYW1lOiBzdHJpbmcgPSBcInVzZXJQcm9maWxlXCI7IC8vIGptZW5vIHByb2ZpbHVcclxuICAgICAgICAvLyBuYXN0YXZlbmkgaWQgYSB0aXR1bGt1IG9rbmFcclxuICAgICAgICAvLyB0aXRsZSA9IFwianJlczozMDI1MDA4NVwiOyAvL1JDIDMwMjUwMDg1IDogRGHFiG92w6EgZXZpZGVuY2VcclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyB1bG96ZW5pIHNwdXN0ZW5lIHVsb2h5XHJcbiAgICAgICAgICAgIHRoaXM/LnBhcmVudENvbnRlbnQ/LnVzZXJTZXR0aW5ncyEuc2V0KFwibGFzdEFjdGlvblwiLCB0aGlzLnRhc2tJZCk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ6YXBpc3lBY3RcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZ2ktbGlzdFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwODlcIiwgLy9SQyAzMDI1MDA4OSA6IFrDoXBpc3lcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkKFwiYWN0aXZlQ2VsbEFkZHJlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgY29sdW1uID0gdGhhdC4kZ3JpZC5nZ3JpZChcImFjdGl2ZUNlbGxBZGRyZXNzXCIpLmNvbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3daYXBpc3kocm93LCBcIlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkKEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJwcmludEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgdGVtYTogXCJpbnVfcHRtX3ByaXpkcGgsaW51X3B0bV9kYW5kb2xvLGludV9wdG1fZHBoc2VzdFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgLy9yZXBvcnRHZW5lcmF0b3JUeXBlOiBcIkdvcmRpYy5VY3IuV2ViQ2xpZW50LkdTZXpuYW1Fa29aYXpuYW11R2VuZXJhdG9yXCIsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLlVjci5XZWJDbGllbnQuR1VjclByaW50UGFyYW1ldGVyczpTZXJ2ZXJQYXJhbWV0ZXJNZXRob2RUaXNrRGFub3ZhUHJpem5hbmlcIixcclxuICAgICAgICAgICAgICAgIHJlcG9ydFN0YXJ0aW5nOiBmdW5jdGlvbiAocmVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gemppc3RlbmkgZmlsdHJ1XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpbHRlciA9IHRoYXQuR2V0RmlsdGVyKCkuZ2ZpbHRlcnBhbmVsKCdnZXRDdXJyZW50RGF0YScpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hcGxuZW5pIGZpbHRydVxyXG4gICAgICAgICAgICAgICAgICAgIHJlcC5jdXN0b21EdG8gPSB7IE1lc2ljRFBIOiBmaWx0ZXIubWVzaWMsIFVjczogZmlsdGVyLnVjcywgVXVzOiBmaWx0ZXIudXVzIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKSBhcyBHUHJpbnRBY3Rpb25UeXBlO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihbXHJcbiAgICAgICAgICAgICAgICAvL3sgYWN0aW9uOiB0aGF0LmFjdGlvbnMubmV3QWN0LCBmYXZvcml0ZTogdHJ1ZSwgY2FwdGlvblZpc2libGU6IFwibmV2ZXJcIiB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuemFwaXN5QWN0LCBmYXZvcml0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgICAgICAsIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMucHJpbnRBY3QsIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICAvLyB2eXR2b3JlbmkgZml0cnUgcGFuZWx1XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRmlsdGVyUGFuZWwodGhpcyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcHJvdmlkZXIgPSBuZXcgR29yZGljLkRhdGEuUHJvdmlkZXI8YW55LCBhbnksIGFueT4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5sb2FkaW5nRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXc8R29yZGljLlVjdC5JbnRlcmZhY2UuR0Vrb1Nlem5hbURwaER0bz4oW10sIHsgcHJvY2Vzc29yczogeyBwcm92aWRlcjogcHJvdmlkZXIgfSB9KTtcclxuICAgICAgICAgICAgdmFyIHNsb3VwY2UgPSB0aGF0LmNyZWF0ZUdyaWRGb3JtYXQoKTtcclxuICAgICAgICAgICAgY29uc3QgZ3JpZCA9ICQubmV3RGl2KHRoaXMuY2xhc3NHcmlkKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogc2xvdXBjZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBmdW5jdGlvbiAoZXYsIGluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvd3MgPSBpbmZvLmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuY2xlYXJDb250cm9scygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93cy5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnByZXZpZXdDb250cm9sbGVyLmVuYWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5wcmV2aWV3Q29udHJvbGxlci5zaG93KHsgY3VycmVudFJvdzogcm93c1swXSwgdmlld01vZGU6IHRydWUsIGNvbHM6IHRoYXQuY29scyB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKGZhbHNlKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHsgbmFtZTogXCJkZWZhdWx0XCIsIGNvbHVtbkxpc3Q6IFwicmFkZWtfZHBoLG5hemV2LGNfYWt0XzIsY19ha3RfMSxjX2FrdF8zLGNfYWt0XzRcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmFtZTogdGhhdC5wcm9maWxOYW1lLCBjb2x1bW5MaXN0OiBcInJhZGVrX2RwaCxuYXpldixjX2FrdF8yLGNfYWt0XzEsY19ha3RfMyxjX2FrdF80XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkWm9iemFaYXBpc3lBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGE6IGFueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LmNlbGxJbmZvICYmIGN0eC5jZWxsSW5mby5kYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBjdHguY2VsbEluZm8uZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3pvYnJhemVuaSBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3daYXBpc3koZGF0YSwgY3R4LmNlbGxJbmZvLmNvbHVtbi5maWVsZClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9wcm9maWxlVmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBncmlkLmdncmlkc2VydmVyZmlsdGVyKHt9KTtcclxuICAgICAgICAgICAgLy8jcmVnaW9uIFByZXZpZXcgdiBzaWRlYmFydVxyXG5cclxuICAgICAgICAgICAgLy90aGlzLmVsZW1lbnQuZ3NpZGViYXIoXCJvcHRpb25cIiwgXCJyaWdodFwiLCB7IHVzZXJTZXR0aW5nczogdGhpcy51c2VyU2V0dGluZ3MhLCB3aWR0aDogNTAwLCB2aXNpYmxlOiB0cnVlLCBwaW5uZWQ6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICB0aGlzLnByZXZpZXdDb250cm9sbGVyID0gbmV3IEdvcmRpYy5QcmV2aWV3cy5HUHJldmlld0NvbnRyb2xsZXIodGhpcy5lbGVtZW50LCB7XHJcbiAgICAgICAgICAgICAgICB1c2VTdWJ0YXNrOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHBhbmVsT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDA5N1wiLCAvL1JDIDMwMjUwMDk3IDogTsOhaGxlZCBkZXRhaWx1IGRhxYhvdsOpIGV2aWRlbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgc2lkZTogXCJyaWdodFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGFiczogW3tcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwOTdcIiwgLy9SQyAzMDI1MDA5NyA6IE7DoWhsZWQgZGV0YWlsdSBkYcWIb3bDqSBldmlkZW5jZVxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUxvYWQ6ICh0YWIsIGR0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZWxtID0gJChcIjxkaXY+XCIpLmdjb250ZW50KEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdEZXRhaWxEYW5vdmVFdmlkZW5jZSwgeyBwYXJlbnRDb250ZW50OiB0aGlzIH0pOyAvL051dG5lIHBybyBzcHJhdm5lIHNwb2plbmkgcyBrb250ZXh0ZW0gaGxhdm5paG8gY29udGVudHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgdGFiU2V0dGluZ3MgPSBkdG8udGFiU2V0dGluZ3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVsZXRlIGR0by50YWJTZXR0aW5nczsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5jb250ZW50PEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdEZXRhaWxEYW5vdmVFdmlkZW5jZT4oZWxtKS5pbml0KGR0byk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRhYikuZW1wdHkoKS5hcHBlbmQoZWxtKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgLy8jcmVnaW9uIEtsLiB6a3JhdGt5XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgIGtleTogXCJJTlNFUlRcIixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyMjZcIiwgLy9SQyAzMTEwMDIyNiA6IE5hxI10ZW7DrSBkYXRcclxuICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5UYXNrLFxyXG4gICAgICAgICAgICAgICAgY2FuRXhlY3V0ZTogKGV2KSA9PiB7IHJldHVybiBldi50YXJnZXQudGFnTmFtZSAhPT0gXCJJTlBVVFwiOyB9LFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJMb2FkRGF0YUFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZChcImdldFZpZXdcIikucmVxdWVzdERhdGEodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgIGtleTogXCJERUxFVEVcIixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAxODFcIiwgLy9SQyAzMTEwMDE4MSA6IFZ5xI1pc3RpdFxyXG4gICAgICAgICAgICAgICAgY2FuRXhlY3V0ZTogKGV2KSA9PiB7IHJldHVybiBldi50YXJnZXQudGFnTmFtZSAhPT0gXCJJTlBVVFwiOyB9LFxyXG4gICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLlRhc2ssXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNsZWFyRmlsdGVyUm93QWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjY3XCIsIC8vUkMgMzExMDAyNjcgOiBWecSNaXN0aXQgZmlsdHIgc2V6bmFtdVxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktYmluXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZGluZ0RhdGEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICBrZXk6IFwiMFwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIyOFwiLCAvL1JDIDMxMTAwMjI4IDogVnnEjWlzdGl0IGEgbmHEjcOtc3RcclxuICAgICAgICAgICAgICAgIGNhbkV4ZWN1dGU6IChldikgPT4geyByZXR1cm4gZXYudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIjsgfSxcclxuICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5UYXNrLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjbGVhckFuZEZpbHRlckFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZChcImdldFZpZXdcIikucmVxdWVzdERhdGEodW5kZWZpbmVkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZ3JpZC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAga2V5OiBcImN0cmwrc2hpZnQrbGNsaWNrXCIsXHJcbiAgICAgICAgICAgICAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuR3JpZCxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyMjlcIiwgLy9SQyAzMTEwMDIyOSA6IFDFmWVuZXNlbsOtIGhvZG5vdHkgZG8gZmlsdHJ1LlxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzZWxGaWx0ZXJBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hGaWxsU2VydmVyR3JpZEV2ZW50KGV2KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGdyaWQuZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgIGtleTogXCJjdHJsK2xjbGlja1wiLFxyXG4gICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLkdyaWQsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjM1XCIsIC8vUkMgMzExMDAyMzUgOiBQxZllbmVzZW7DrSBob2Rub3R5IGRvIGZpbHRydSBhIHZ5aGxlZMOhbsOtLlxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzZWxGaWx0ZXJBbmRTZWFyY2hBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hGaWxsU2VydmVyR3JpZEV2ZW50KGV2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLnJlcXVlc3REYXRhKHVuZGVmaW5lZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMubG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9ncmlkLmdzaG9ydGN1dCgpO1xyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgICAgIC8vIG5hc3RhdmVuaSB2aWRpdGVsbnljaCBzbG91cGN1XHJcblxyXG4gICAgICAgICAgICBncmlkLmdncmlkPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFa29TZXpuYW1EcGhGaWx0ZXJEdG8+KFwidXNlUHJvZmlsZVwiLCB7IG5hbWU6IHRoYXQucHJvZmlsTmFtZSwgY29sdW1uTGlzdDogdGhhdC5nZXRDb2xzQnlSb3pwYWQodGhhdC5nZXRSb3pwYWQoKSkgKyBcInJhZGVrX2RwaCxuYXpldixjX2FrdF8yLGNfYWt0XzEsY19ha3RfMyxjX2FrdF80XCIgfSk7XHJcbiAgICAgICAgICAgIC8vLy8gbmFzdGF2ZW5pIGhvZG5vdCB1dXMsIHBva3VkIGplIFJlemltIERQSCA9IHV1cywgcGFrIGplIHByb2JsZW0gYSBuaWMgc2UgbmVvemJyYXppXHJcbiAgICAgICAgICAgIC8vaWYgKHRoYXQuR2xvYmFscy5QYXJhbXM/LlJlemltRFBIID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbURwaC5VdXMpXHJcbiAgICAgICAgICAgIC8vICAgIHRoYXQuZmluZEZpZWxkcyhcInV1c1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IHV1czogdGhhdC5HbG9iYWxzLkVrb1BhcmFtcz8uVVVTIH0pO1xyXG4gICAgICAgICAgICAvL3RoaXMuc2V0VmlzaWJsZUNvbHVtbnMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZyYWNpIG9iamVrdCBncmlkdVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0R3JpZCgpOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHwgbnVsbCB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5lbGVtZW50LmZpbmQoXCIuXCIgKyB0aGlzLmNsYXNzR3JpZCk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZGF0YS5sZW5ndGggPT0gMCA/IG51bGwgOiBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW5pIHRpdHVsa3Ugb2tuYVxyXG4gICAgICAgICAqIEBwYXJhbSBtb250aFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc2V0VGl0bGUobW9udGg6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIC8vdGhpcy5zcnYgPSBuZXcgR0NvbnRlbnQoXCJHb3JkaWMuVWN0LldlYkNsaWVudC5HVWN0RGV0YWlsXCIpOyAgLy9zbHV6YmEgcHJvIHByaXN0dXAgayBkYXR1bSBuYSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbChcIkdldFRpdGxlXCIsIHsgbW9udGg6IG1vbnRoIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50aXRsZSA9IHJlc3VsdDsgLy9SQyAzMDI1MDU5NSA6IERhxYhvdsOhIHDFmWl6bsOhbsOtXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJldmVkZW5pIGtsaWt1IG5hIGJ1bmt1IGRvIGZpbHRydSBhIG5hY3RlbmlcclxuICAgICAgICAgKiBAcGFyYW0gZXZcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGRpc3BhdGNoRmlsbFNlcnZlckdyaWRFdmVudChldjogSlF1ZXJ5RXZlbnRPYmplY3QpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyICRjb2wgPSAkKGV2LnRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWV2LmN0cmxLZXkgfHwgISRjb2wuaGFzQ2xhc3MoXCJjZWxsXCIpIHx8ICRjb2wuaGFzQ2xhc3MoXCJqcy1jZnUtY2VsbFwiKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZWxlY3Rpb24gPSBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICAgICAgaWYgKGV2LnNoaWZ0S2V5ICYmIHNlbGVjdGlvbikgc2VsZWN0aW9uLmVtcHR5KCk7IC8vUG9rdWQgc2UgdnliaXJhIHByZXMga2wuIHprcmF0a3UgY3RybCtzaGlmdCtsY2xpY2ssIHRhayBhdCBzZSBuZW96bmFjdWplIHRleHRcclxuXHJcbiAgICAgICAgICAgIHZhciBjb2xJbmRleCA9ICRjb2wuYXR0cihcImRhdGEtY29sdW1uLWluZGV4XCIpITtcclxuICAgICAgICAgICAgY29uc3QgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciBjb2xEZWYgPSBncmlkLmdncmlkKFwidHJ1ZUNvbHVtbnNcIiwgZmFsc2UpW2NvbEluZGV4XSBhcyBHR3JpZENvbHVtbjtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb2xEZWYuc2VydmVyRmlsdGVyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWU6IGFueSA9ICRjb2wudGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdmFsdWUpIHJldHVybjsgLy9OT1RFOiBQb2t1ZCBuZW5pIGhvZG5vdGEsIHRhayBhc2kgbmVuaSBjbyByZXNpdC4gUmVzaSBobGF2bmUgYnVnIHMgdGV4dG92b3UgaG9kbm90b3UgdiBjaXNlbG55Y2ggc2xvdXBjaWNoXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHNlbCA9IGdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIiwgZmFsc2UpWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vTk9URTogVG9obGUgamUgc3BhdG55IHpwdXNvYiwgY2VsZSBieSB0byBjaHRlbG8gcHJlcHNhdCwgYWJ5IHNlIG5lc2xvIHBvIHN0cmluZ3UgeiBidW5reSwgYWxlIHBvIGRhdGVjaC4gXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgIFBvcHRhdCBzZSBTa2FsaWNlLCBqZXN0bGkgZXhpdHVqZSBuZWpha3kgbGVwc2kgenB1c29iLi4uXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChjb2xEZWYuY29sdW1uVHlwZSA9PT0gXCJkYXRldGltZVwiKSB2YWx1ZSA9IHNlbFtjb2xEZWYubmFtZSFdO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY29sRGVmLmNvbHVtblR5cGUgPT09IFwiY3VycmVuY3lcIikgdmFsdWUgPSBzZWxbY29sRGVmLm5hbWUhXTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyICRmaWx0ZXJGcm1Cb3ggPSBncmlkLmdncmlkc2VydmVyZmlsdGVyKFwiZmluZEZpZWxkc1wiLCBjb2xEZWYubmFtZSEpO1xyXG4gICAgICAgICAgICAgICAgJGZpbHRlckZybUJveC5nZmllbGQoXCJzZXRWYWx1ZVwiLCB2YWx1ZSwgeyB2YWxpZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhemVuaSB1Y2V0bmljaCB6YXBpc3VcclxuICAgICAgICAgKiBAcGFyYW0gcm93XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzaG93WmFwaXN5KHJvdzogR29yZGljLlVjdC5JbnRlcmZhY2UuR0Vrb1Nlem5hbURwaER0bywgY29sdW1uOiBzdHJpbmcpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBpZDogc3RyaW5nO1xyXG4gICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgLy8gZGVmaW5pY2UgemRcclxuICAgICAgICAgICAgdmFyIHpkOiBudW1iZXIgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHZhciB6ZFN0YXJ0ID0gMTtcclxuICAgICAgICAgICAgdmFyIHpkRW5kID0gNDtcclxuICAgICAgICAgICAgaWYgKGNvbHVtbi5pbmRleE9mKFwiY19cIiwgMCkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRtcCA9IChjb2x1bW4uc3Vic3RyaW5nKGNvbHVtbi5sZW5ndGggLSAxLCAxKSlhcyBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNOdW1lcmljKHRtcCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB6ZCA9IHBhcnNlSW50KHRtcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHpkICE9IDEgJiYgemQgIT0gMiAmJiB6ZCAhPSAzICYmIHpkICE9IDQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHpkID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBwb2t1ZCBqZSB6ZCAwLCBiZXJ1IGNlbHkgcm96c2FoXHJcbiAgICAgICAgICAgIGlmICh6ZCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB6ZFN0YXJ0ID0gMTtcclxuICAgICAgICAgICAgICAgIHpkRW5kID0gNDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHpkU3RhcnQgPSB6ZCBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICB6ZEVuZCA9IHpkIGFzIGFueTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9OT1RFOiBPZHBvdmlkYSB6IFRLIFVDUjogR1Nlem5hbVphcGlzdVZSYWRrdVRhYi5Mb2FkR3JpZERhdGEoKVxyXG4gICAgICAgICAgICBsZXQgZmlsdGVyOiBHRWtvRmlsdGVyRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgLy91ZWY6IHsgc3RhcnQ6IHJvdy5yYWRla19kcGghLCBlbmQ6IHJvdy5yYWRla19kcGghIH0sXHJcbiAgICAgICAgICAgICAgICByb2tfdWVqOiB7IHN0YXJ0OiByb3cucm9rISwgZW5kOiByb3cucm9rISB9LFxyXG4gICAgICAgICAgICAgICAgbWVzaWNfdWVqOiB7IHN0YXJ0OiByb3cubWVzaWMhLCBlbmQ6IHJvdy5tZXNpYyEgfSwgXHJcbiAgICAgICAgICAgICAgICB6ZDogeyBzdGFydDogemRTdGFydCwgZW5kOiB6ZEVuZCB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRSb3pwYWQoKSkge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyLmljbyA9IHsgc3RhcnQ6IHJvdy5pY28hLCBlbmQ6IHJvdy5pY28hIH1cclxuICAgICAgICAgICAgICAgIGZpbHRlci51Y3MgPSB7IHN0YXJ0OiByb3cudWNzISwgZW5kOiByb3cudWNzISB9XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIudXVzID0geyBzdGFydDogcm93LnV1cyEsIGVuZDogcm93LnV1cyEgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgdHlwVWxvaHkgPSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlaYXBpcztcclxuICAgICAgICAgICAgaWQgPSBcInVjdFphcGlzeSNcIjsgLy9OT1RFOiBNdXNpIGJ5dCBzdGVqbmUgbmkgbmEgTWFpbkFwcC5jc1xyXG4gICAgICAgICAgICB2YXIgdGl0bGUgPVwianJlczozMDI1MDEzM1wiICAgICAgICAgICAgICAgICAvL1JDIDMwMjUwMTMzIDogWsOhcGlzeSBEUEhcclxuICAgICAgICAgICAgKyBcIjogXCIgKyByb3cucmFkZWtfZHBoXHJcbiAgICAgICAgICAgICsgXCIgXCIgKyByb3cubmF6ZXZcclxuICAgICAgICAgICAgICAgIDsgXHJcblxyXG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRlKCdHb3JkaWMuVWNyLldlYkNsaWVudC5HU2V6bmFtRWtvWmF6bmFtdScsIHtcclxuICAgICAgICAgICAgICAgIElEOiBpZCxcclxuICAgICAgICAgICAgICAgIFR5cFVsb2h5OiB0eXBVbG9oeSxcclxuICAgICAgICAgICAgICAgIEZpbHRlcjogZmlsdGVyLFxyXG4gICAgICAgICAgICAgICAgU3RyaWN0RmlsdGVyOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIEN1cnJlbnRSb3c6IHJvdyxcclxuICAgICAgICAgICAgICAgIFphcGlzb3ZhOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgVm9sYW5vWlVsb2h5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkRhbm92ZVByaXpuYW5pWmFwaXMsXHJcbiAgICAgICAgICAgICAgICBSYWRla19EUEg6IHJvdy5yYWRla19kcGgsXHJcbiAgICAgICAgICAgICAgICBBdXRvTG9hZERhdGE6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBVc2VTdW1Db3VudDogdHlwZW9mIHpkID09PSBcInVuZGVmaW5lZFwiIHx8emQ9PTA/ZmFsc2U6dHJ1ZSxcclxuICAgICAgICAgICAgICAgIEptZW5vT2tuYTogdGl0bGVcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVcHJhdmEgdmlkaXRlbG5vc3RpIGFrY2lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgc2V0QWN0aW9ucyhwb2NldFJhZGt1OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgLy8gcG9rdWQgbmVuaSBncmlkLCBuaWMgbmVkZWxlalxyXG4gICAgICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHJldHVybjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy56YXBpc3lBY3QhLnVwZGF0ZSh7IGVuYWJsZWQ6IHBvY2V0UmFka3UgPiAwIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMucHJpbnRBY3QhLnVwZGF0ZSh7IGVuYWJsZWQ6IHBvY2V0UmFka3UgPiAwIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLy8qKlxyXG4gICAgICAgIC8vICogIE5hc3RhdmVuaSB0aXR1bGt1IG9rbmFcclxuICAgICAgICAvLyAqIFxyXG4gICAgICAgIC8vICogKi9cclxuICAgICAgICAvL3ByaXZhdGUgc2V0Rm9ybVRpdGxlKG1vbnRoOiBhbnkpIHtcclxuICAgICAgICAvLyAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgLy8gICAgdGhpcy5jYWxsKFwiR2V0VGl0bGVcIiwgeyBtb250aDogbW9udGggfSlcclxuICAgICAgICAvLyAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgdGhhdC5zZXRCcmVhZGNydW1icyhbeyBjYXB0aW9uOiByZXN1bHQgKyBcIiwgXCIgKyB0aGF0LnJlemltRFBIdHh0LCBkZWZhdWx0QWN0aW9uOiB0cnVlIH1dKTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICk7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnJhY2VuaSBob2Rub3RhIG5hc3RhdmVuaSByb3pwYWR1XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGdldFJvenBhZCgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcm96cGFkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBmaWx0ZXIgPSB0aGF0LkdldEZpbHRlcigpLmdmaWx0ZXJwYW5lbCgnZ2V0Q3VycmVudERhdGEnKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWx0ZXIucm96cGFkICE9PSBcInVuZGVmaW5lZFwiICYmIGZpbHRlci5yb3pwYWQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWx0ZXIucm96cGFkIS5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLnJvenBhZCFbaV0gPT0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3pwYWQgPSB0cnVlOyBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByb3pwYWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaamlzdGVuaSBqbWVuYSBzbG91cGNlIGRsZSBuYXN0YXZlbmkgcm96cGFkdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRDb2xzQnlSb3pwYWQocm96cGFkOiBib29sZWFuKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgaWYgKCFyb3pwYWQpIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBjb2x1bW5zID0gXCJcIjtcclxuICAgICAgICAgICAgaWYgKHRoYXQuR2xvYmFscy5QYXJhbXM/LkRwaF9SZXppbSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1EcGguSWNvKVxyXG4gICAgICAgICAgICAgICAgY29sdW1ucyA9IFwidWNzLHV1cyxcIjtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGhhdC5HbG9iYWxzLlBhcmFtcz8uRHBoX1JlemltID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbURwaC5VY3MpXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zID0gXCJ1dXMsXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBjb2x1bW5zO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAqIGZ1bmN0aW9uIENyZWF0ZUZpbHRlclphbG96a2FcclxuICAgICAgICAqICAgICAgXHJcbiAgICAgICAgKiBPYmVjbmEgemFsb3prYVxyXG4gICAgICAgICogQHBhcmFtIHtHQ29udGVudH0gY29udGVudFxyXG4gICAgICAgICogQHJldHVybnMge2FueX1cclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgQ3JlYXRlRmlsdGVyWmFsb3prYSgpOiBhbnkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciB2eWJyYW55TWVzaWMgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGlmICh0aGF0Lmxpc3RNb250aC5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgdnlicmFueU1lc2ljID0gdGhhdC5saXN0TW9udGhbdGhhdC5saXN0TW9udGgubGVuZ3RoIC0gMV0gYXMgYW55O1xyXG4gICAgICAgICAgICAvL2RlYnVnZ2VyOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3RoYXQuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImdldEN1cnJlbnREYXRhXCIpO1xyXG4gICAgICAgICAgICB2YXIgZmlsdGVyRm9ybURlZiA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IC8qb3BlbmVkOiB0cnVlLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMSwgTC0zLTgtMSwgTS0xMi0xMS0xLCBTLTEyLTExLTFcIiwqLyB0YWJMYWJlbDogXCJqcmVzOjMwMjUwMDUyXCIgfSkgIC8vUkMgMzAyNTAwNTIgOiBGaWx0clxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDEyNFwiKSAvL1JDIDMwMjUwMTI0IDogTcSbc8OtY1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtZXNpY1wiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBtdWx0aTogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAsIGxpc3Q6IHRydWUsIGl0ZW1XaWR0aDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgZHJvcGRvd246IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgLCBpbml0aWFsVmFsdWU6IHZ5YnJhbnlNZXNpY1xyXG4gICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwibW9kZWwubWVzaWM9dmFsdWVcIlxyXG4gICAgICAgICAgICAgICAgICAgIC8vLCBzdHJpY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8sIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLywgaXRlbVRlbXBsYXRlOiBcIntwcml6X3pwbF9raF90eHR9XCJcclxuICAgICAgICAgICAgICAgICAgICAvLywgbW9kZWxEZWZhdWx0czogdGhhdC5maWx0ZXJ0TW9udGhbdGhhdC5maWx0ZXJ0TW9udGgubGVuZ3RoICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAsIGRhdGE6IHRoYXQubGlzdE1vbnRoXHJcbiAgICAgICAgICAgICAgICAgICAgLCBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHRoYXQubG9hZGluZyB8fCAob2JqLmZsYWdzICYmIG9iai5mbGFncy5maWx0ZXJDbGVhcj09PXRydWUpKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5zZXRGb3JtVGl0bGUob2JqLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgdmlldyA9IHRoYXQuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LiRncmlkLmdncmlkPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFa29TZXpuYW1EcGhGaWx0ZXJEdG8+KFwidXNlUHJvZmlsZVwiLCB7Y29sdW1uTGlzdDpcIlwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMjUwMDU2XCIgfSkuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIC8vUkMgMzAyNTAwNTYgOiBJxIxPXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3NpY28oKSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWNvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogeyBpY286IHRoaXMuR2xvYmFscy5Fa29QYXJhbXM/LklDTyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5pY289dmFsdWUuaWNvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDA1NVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwvL1JDIDMwMjUwMDU1IDogVUNTXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3N1Y3MoKSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWNzXCIsIGRyb3Bkb3duOiBmYWxzZSwgY3VzdG9tQ2xhc3M6IFwianMtdWNzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBtb2RlbDogXCJtb2RlbC5pY28xPXZhbHVlLmljbzttb2RlbC51Y3M9dmFsdWUudWNzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBpdGVtVGVtcGxhdGU6IFwie3Vjczp0cmltOmVuY29kZX1cIixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogKHRoYXQuR2xvYmFscy5QYXJhbXM/LkRwaF9SZXppbSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltRHBoLlVjcyB8fCB0aGF0Lkdsb2JhbHMuUGFyYW1zPy5EcGhfUmV6aW0gPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbURwaC5VdXMpID8geyBpY286IHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LklDTywgdWNzOiB0aGF0Lkdsb2JhbHMuRWtvUGFyYW1zPy5VQ1MgfSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ha3Rpdml0YTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGlzLkdsb2JhbHMuRWtvUGFyYW1zPy5JQ08sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvL3Jva19vZDogXCI8PSBcIiArdGhpcy5la29QYXJhbXMuUm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy9yb2tfZG86IFwiPj0gXCIgK3RoaXMuZWtvUGFyYW1zLlJvayxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lkdsb2JhbHMuUGFyYW1zPy5EcGhfUmV6aW0gIT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbURwaC5VdXMpICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwidXVzXCIpLmdmaWVsZChcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhhdC5HbG9iYWxzLlBhcmFtcz8uRHBoX1JlemltID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbURwaC5VY3MgfHwgdGhhdC5HbG9iYWxzLlBhcmFtcz8uRHBoX1JlemltID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbURwaC5VdXNcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAxMjJcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsLy9SQyAzMDI1MDEyMiA6IFVVU1xyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zdXVzKCksXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInV1c1wiLCBkcm9wZG93bjogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBtb2RlbDogXCJtb2RlbC5pY28yPXZhbHVlLmljbzttb2RlbC51Y3MxPXZhbHVlLnVjczttb2RlbC51dXM9dmFsdWUudXVzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBpdGVtVGVtcGxhdGU6IFwie3V1czp0cmltOmVuY29kZX1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogKHRoYXQuR2xvYmFscy5QYXJhbXM/LkRwaF9SZXppbSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1EcGguVXVzKSA/IHsgaWNvOiB0aGF0Lkdsb2JhbHMuRWtvUGFyYW1zPy5JQ08sIHVjczogdGhhdC5HbG9iYWxzLkVrb1BhcmFtcz8uVUNTLCB1dXM6IHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LlVVUyB9IDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2FrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoaXMuR2xvYmFscy5Fa29QYXJhbXM/LklDTyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVjczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9ICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwidWNzXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnVjcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vcm9rX29kOiBcIjw9IFwiICt0aGlzLmVrb1BhcmFtcy5Sb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvL3Jva19kbzogXCI+PSBcIiArdGhpcy5la29QYXJhbXMuUm9rLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoYXQuR2xvYmFscy5QYXJhbXM/LkRwaF9SZXppbSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltRHBoLlV1cyxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb3pwYWRcIiwgbXVsdGk6IHRydWUsIGxpc3Q6IHRydWUsIGl0ZW1XaWR0aDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgZHJvcGRvd246IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAvLywgbW9kZWw6IFwibW9kZWwuc196YXU9dmFsdWUuc196YXVcIiwgaXRlbVRlbXBsYXRlOiBcIntzX3phdV90eHR9XCJcclxuICAgICAgICAgICAgICAgICAgICAsIGl0ZW1UZW1wbGF0ZTogXCJ7cm96cGFkX3R4dH1cIlxyXG4gICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwibW9kZWwucm96cGFkPXZhbHVlLnJvenBhZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBoZWxwZXJDb2x1bW5zOiBbXCJyb3pwYWRfdHh0XCJdXHJcbiAgICAgICAgICAgICAgICAgICAgLCBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyhbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcm96cGFkX3R4dDogXCJqcmVzOjMwMjUwMTMyXCIsIHJvenBhZDogNSB9IC8vUkMgMzAyNTAxMzIgOiBTIHJvenBhZGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLCB7IHJvenBhZF90eHQ6IFwianJlczozMDI1MDEzMFwiLCByb3pwYWQ6IDQgfSAvL1JDIDMwMjUwMTMwIDogWnbDvXJhem5pdCAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgeyBrZXk6IFwicm96cGFkXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAvLywgaW5pdGlhbFZhbHVlOiB7IHZ5YmVyeTogMSB9XHJcbiAgICAgICAgICAgICAgICAgICAgLCBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicm96cGFkXCIsIG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmxvYWRpbmcgfHwgKG9iai5mbGFncyAmJiBvYmouZmxhZ3MuZmlsdGVyQ2xlYXIgPT09IHRydWUpKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmxvYWRpbmcpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbHVtbnMgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqICYmIHR5cGVvZiBvYmoudmFsdWUgIT09IFwidW5kZWZpbmVkXCIgJiYgb2JqLnZhbHVlIS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iai52YWx1ZSEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9iai52YWx1ZSFbaV0ucm96cGFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTogLy8gUyByb3pwYWRlbSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnMgPXRoYXQuZ2V0Q29sc0J5Um96cGFkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXNlclByb2ZpbCA9IGdyaWQuZ2dyaWQoXCJnZXRDdXJyZW50UHJvZmlsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyUHJvZmlsXCIsIHVzZXJQcm9maWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyUHJvZmlsLmNvbHVtbkxpc3Q9IHVzZXJQcm9maWwuY29sdW1uTGlzdD8ucmVwbGFjZShcInVjcyx1dXMsXCIsIFwiXCIpLnJlcGxhY2UoXCJ1dXMsXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyUHJvZmlsLmNvbHVtbkxpc3QgPSBjb2x1bW5zICsgdXNlclByb2ZpbC5jb2x1bW5MaXN0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFa29TZXpuYW1EcGhGaWx0ZXJEdG8+KFwicHJvZmlsZUNoYW5nZXNcIiwgdXNlclByb2ZpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW5zICE9IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYWN0ZW5pIGRhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZChcImdldFZpZXdcIikucmVxdWVzdERhdGEoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oey8qbGF5b3V0RGVzY3JpcHRvcjogXCJMLTQtOC00LCBNLTQtOC0wLCBTLTQtOC0wXCIsKi8gY3VzdG9tQ2xhc3M6IFwidy1MLTEyIHctTS0xMiB3LVMtMTJcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2eWJlcnlcIiwgbXVsdGk6IHRydWUsIGxpc3Q6IHRydWUsIGl0ZW1XaWR0aDpcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBkcm9wZG93bjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vLCBtb2RlbDogXCJtb2RlbC5zX3phdT12YWx1ZS5zX3phdVwiLCBpdGVtVGVtcGxhdGU6IFwie3NfemF1X3R4dH1cIlxyXG4gICAgICAgICAgICAgICAgICAgICwgaXRlbVRlbXBsYXRlOiBcInt2eWJlcl90eHR9XCJcclxuICAgICAgICAgICAgICAgICAgICAsIG1vZGVsOiBcIm1vZGVsLnZ5YmVyeT12YWx1ZS52eWJlcnlcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgaGVscGVyQ29sdW1uczogW1widnliZXJfdHh0XCJdXHJcbiAgICAgICAgICAgICAgICAgICAgLCBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyhbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdnliZXJfdHh0OiBcImpyZXM6MzAyNTAxMjdcIiwgdnliZXJ5OiAxIH0gLy9SQyAzMDI1MDEyNyA6IEFrdHVhbG5pIHN0YXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCB7IHZ5YmVyX3R4dDogXCJqcmVzOjMwMjUwMTI4XCIsIHZ5YmVyeTogMiB9IC8vUkMgMzAyNTAxMjggOiBQxZlpem7DoW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgeyB2eWJlcl90eHQ6IFwianJlczozMDI1MDEyOVwiLCB2eWJlcnk6IDMgfSAvL1JDIDMwMjUwMTI5IDogWmLDvXbDoSBwxZlpem5hdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIHsgdnliZXJfdHh0OiBcImpyZXM6MzAyNTAxMzBcIiwgdnliZXJ5OiA0IH0gLy9SQyAzMDI1MDEzMCA6IFp2w71yYXpuaXQgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8sIHsgdnliZXJfdHh0OiBcImpyZXM6MzAyNTAxMzJcIiwgdnliZXJ5OiA1IH0gLy9SQyAzMDI1MDEzMiA6IFMgcm96cGFkZW1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgeyBrZXk6IFwidnliZXJ5XCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAsIGluaXRpYWxWYWx1ZSA6IHsgdnliZXJ5OiAxIH0gXHJcbiAgICAgICAgICAgICAgICAgICAgLCBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVnliZXJ5XCIsIG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmxvYWRpbmcpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbHVtbnMgPSBcInJhZGVrX2RwaCxuYXpldlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmICh0aGF0Lkdsb2JhbHMuUmV6aW1EUEggPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltRHBoLkljbylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgb29sdW1ucyA9IFwidWNzLHV1cyxcIiArIG9vbHVtbnM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZWxzZSBpZiAodGhhdC5HbG9iYWxzLlJlemltRFBIID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbURwaC5VY3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIG9vbHVtbnMgPSBcInV1cyxcIiArIG9vbHVtbnM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZVByb2ZpbGVQb3N0Rml4ID0gXCIwMDBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbmRGb3JtYXQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFtdfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iaiAmJiB0eXBlb2Ygb2JqLnZhbHVlICE9PSBcInVuZGVmaW5lZFwiICYmIG9iai52YWx1ZSEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmoudmFsdWUhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvYmoudmFsdWUhW2ldLnZ5YmVyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IC8vIGFrdHVhbG5pIHN0YXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnMgKz0gXCIsY19ha3RfMixjX2FrdF8xLGNfYWt0XzMsY19ha3RfNFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZVByb2ZpbGVQb3N0Rml4ID0gXCIxXCIgKyBuYW1lUHJvZmlsZVBvc3RGaXguc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjogLy8gUMWZaXpuw6Fub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1ucyArPSBcIixjX3ByaXpfMSxjX3ByaXpfMixjX3ByaXpfMyxjX3ByaXpfNFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZVByb2ZpbGVQb3N0Rml4ID0gbmFtZVByb2ZpbGVQb3N0Rml4LnN1YnN0cmluZygwLCAxKSArIFwiMVwiICsgbmFtZVByb2ZpbGVQb3N0Rml4LnN1YnN0cmluZygyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IC8vIFDFmWl6bsOhbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnMgKz0gXCIsY19kaWZmXzIsY19kaWZmXzEsY19kaWZmXzMsY19kaWZmXzRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVQcm9maWxlUG9zdEZpeCA9IG5hbWVQcm9maWxlUG9zdEZpeC5zdWJzdHJpbmcoMCwgMikgKyBcIjFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IC8vIFp2eXJhem5pdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZEZvcm1hdCA9IHRoYXQuY29uZEZvcm1hdHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jYXNlIDU6IC8vIFMgcm96cGFkZW0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGJyZWFrO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW5zICE9IFwiXCIpIHsgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuOyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1c2VyUHJvZmlsID0gZ3JpZC5nZ3JpZChcImdldEN1cnJlbnRQcm9maWxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyUHJvZmlsXCIsIHVzZXJQcm9maWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmYWxzZSAmJiB1c2VyUHJvZmlsLm5hbWUgPT0gdGhhdC5wcm9maWxOYW1lLyorIG5hbWVQcm9maWxlUG9zdEZpeCovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJvZmlsIGppIGV4aXN0dWplLCB1cHJhdmltIHNsb3VwY2UgYSBwb2RtaW5lbmUgcG9kYmFydmVuaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJQcm9maWwuY29sdW1uTGlzdCA9IHRoYXQuZ2V0Q29sc0J5Um96cGFkKHRoYXQuZ2V0Um96cGFkKCkpICsgY29sdW1ucztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyUHJvZmlsLmNvbmRGb3JtYXRzID0gY29uZEZvcm1hdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47ICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JpZC5nZ3JpZDxHb3JkaWMuVWN0LkludGVyZmFjZS5HRWtvU2V6bmFtRHBoRmlsdGVyRHRvPihcInVzZVByb2ZpbGVcIiwgeyBuYW1lOiB1c2VyUHJvZmlsLm5hbWUsIGNvbHVtbkxpc3Q6IHVzZXJQcm9maWwuY29sdW1uTGlzdCwgY29uZEZvcm1hdHM6IGNvbmRGb3JtYXQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZDxHb3JkaWMuVWN0LkludGVyZmFjZS5HRWtvU2V6bmFtRHBoRmlsdGVyRHRvPihcInVzZVByb2ZpbGVcIiwgeyBuYW1lOiB0aGF0LnByb2ZpbE5hbWUvKiArIG5hbWVQcm9maWxlUG9zdEZpeCovLCBjb2x1bW5MaXN0OiB0aGF0LmdldENvbHNCeVJvenBhZCh0aGF0LmdldFJvenBhZCgpKSArY29sdW1ucywgY29uZEZvcm1hdHM6IGNvbmRGb3JtYXQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSBcclxuXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRSb3coXCJcIilcclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy00XCIsIHsgbmFtZTogXCJha3Rfc3RhdlwiLCBsYWJlbDogXCJBa3R1YWxuaSBzdGF2XCIsIGluaXRpYWxWYWx1ZTogdHJ1ZSwgZW1wdHlWYWx1ZTogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy00XCIsIHsgbmFtZTogXCJwcml6bmFuaVwiLCBsYWJlbDogXCJQxZlpem7DoW5vXCIsIGluaXRpYWxWYWx1ZTogZmFsc2UsIGVtcHR5VmFsdWU6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNFwiLCB7IG5hbWU6IFwiemJ5dmFcIiwgbGFiZWw6IFwiWmLDvXbDoSBwxZlpem5hdFwiLCBpbml0aWFsVmFsdWU6IGZhbHNlLCBlbXB0eVZhbHVlOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTRcIiwgeyBuYW1lOiBcInp2eXJhem5pdFwiLCBsYWJlbDogXCJadsO9cmF6bml0XCIsIGluaXRpYWxWYWx1ZTogZmFsc2UsIGVtcHR5VmFsdWU6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNFwiLCB7IG5hbWU6IFwicHJpem5hbmlcIiwgbGFiZWw6IFwiUMWZaXpuw6Fub1wiLCBpbml0aWFsVmFsdWU6IGZhbHNlLCBlbXB0eVZhbHVlOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTRcIiwgeyBuYW1lOiBcInJvenBhZFwiLCBsYWJlbDogXCJTIHJvenBhZGVtXCIsIGluaXRpYWxWYWx1ZTogZmFsc2UsIGVtcHR5VmFsdWU6IGZhbHNlIH0pXHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJGb3JtRGVmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGZpbHRyb3ZhY2lobyBwYW5lbHVcclxuICAgICAgICAgKiBAcGFyYW0gdGhhdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyUGFuZWwodGhhdDogdGhpcyk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kZmlsdGVyUGFuZWwgPSAkLm5ld0RpdihcImpzLWZpbHRyXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmaWx0ZXJwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyQ3VzdG9taXplcjogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvbFNvcnQgPSBkYXRhLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEubmFtZSA+PSBiLm5hbWU7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcG9sU29ydDtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1zOiBbdGhhdC5DcmVhdGVGaWx0ZXJaYWxvemthKCldLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdG9yYWdlU2VydmljZTogbmV3IEdvcmRpYy5HaW4uRmlsdGVyU3RvcmFnZVNlcnZpY2UuU3RvcmUoKSwgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlVXNlclNldHRpbmdzOiBbRmlsdGVyVmlld01vZGUuRGV0YWlsLyosIEZpbHRlclZpZXdNb2RlLk5vcm1hbCovXSxcclxuICAgICAgICAgICAgICAgICAgICAvL3NpbXBsZU1vZGVBdXRvTG9hZEFmdGVyQ3JlYXRlUGFuZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdXNlckRlZmF1bHRGaWx0ZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gMDEuMDMuMjAyMSAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTmFocmF6ZW7DrSBvYnNvbGV0ZSBwYXJhbWV0csWvLlxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlOiBGaWx0ZXJWaWV3TW9kZS5TaW1wbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zaW1wbGVNb2RlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnlCdXR0b25CZWhhdmlvdXI6IFwiQWx3YXlzUHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlTGF5b3V0RGVzY3JpcHRvcjogXCJMNE0zUzFcIixcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckZpbHRlckJ1dHRvblZpc2libGU6IFwiQWx3YXlzVmlzaWJsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Mb2FkQWZ0ZXJDaG9zZUZpbHRlcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9maWx0ZXJIZWxwZXJJdGVtVGVtcGxhdGU6IFwiPGI+e25hemV2fTwvYj5cIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHRJdGVtVGVtcGxhdGU6IFwie25hemV2fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5OiBmdW5jdGlvbiAoZXZlbnQsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbHRlckZvcm0uYXBwbHlcIiwgb2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2cudHJhY2UoXCJmaWx0ZXJGb3JtLmFwcGx5XCIsIG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmxvYWRpbmdEYXRhKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5yZXF1ZXN0RGF0YShvYmouZmlsdGVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc2V0OiAoZXYsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkaW5nRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZHNlcnZlcmZpbHRlcihcImNsZWFyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZGluZ0RhdGEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcmFjaSBvYmpla3QgZmlsdHJ1XHJcbiAgICAgICAgICogQHBhcmFtIHtHQ29udGVudH0gY29udGVudFxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBHZXRGaWx0ZXIoKTogYW55IHtcclxuICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgaWYgKEdvcmRpYy5VdGlscy5XaWRnZXRFeGlzdHMoXCJnZmlsdGVycGFuZWxcIiwgdGhpcy4kZmlsdGVyUGFuZWwpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGZpbHRlclBhbmVsO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBcIk5lbmFsZXplbiBmaWx0clwiO1xyXG4gICAgICAgICAgICAvL3JldHVybiBjb250ZW50Py5lbGVtZW50LmZpbmQoXCIuanMtZmlsdHIuZ2ZpbHRlcnBhbmVsXCIpO1xyXG4gICAgICAgICAgICAvL3JldHVybiAkKFwiLmpzLWZpbHRyXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgTmFjdGVuaSBkYXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGxvYWREYXRhKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBHb3JkaWMuSXNsLlZpZXcoR29yZGljLklzbC5VY3JQb3phZGF2ZWsubGlzdCh7IGZpbHRlcnM6IHsgaXhzX3NlczogdHlwTXNrIH0gfSkpO1xyXG4gICAgICAgICAgICBsZXQgbWFza2E6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFa29TZXpuYW1EcGhGaWx0ZXJEdG8gPSB7fTtcclxuICAgICAgICAgICAgLy92YXIgZmlsdGVyRHRvOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRWtvU2V6bmFtRHBoRmlsdGVyRHRvID0ge307XHJcbiAgICAgICAgICAgIC8vaWYgKCFmaWx0ZXIpIHtcclxuICAgICAgICAgICAgbGV0IF9maWx0ZXIgPSB0aGF0LkdldEZpbHRlcigpO1xyXG4gICAgICAgICAgICBsZXQgZmlsdGVyID0gX2ZpbHRlci5nZmlsdGVycGFuZWwoJ2dldEN1cnJlbnREYXRhJyk7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICBtYXNrYS5pY28gPSB7IHN0YXJ0OiBmaWx0ZXIuaWNvLCBlbmQ6IGZpbHRlci5pY28gfTtcclxuICAgICAgICAgICAgbWFza2EubWVzaWMgPSB7IHN0YXJ0OiBmaWx0ZXIubWVzaWMsIGVuZDogZmlsdGVyLm1lc2ljIH07XHJcbiAgICAgICAgICAgIG1hc2thLnVjcyA9IHsgc3RhcnQ6IGZpbHRlci51Y3MsIGVuZDogZmlsdGVyLnVjcyB9O1xyXG4gICAgICAgICAgICBtYXNrYS51dXMgPSB7IHN0YXJ0OiBmaWx0ZXIudXVzLCBlbmQ6IGZpbHRlci51dXMgfTsgXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9hZGRhdGEuZmlsdGVyXCIsIGZpbHRlcik7XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICBncmlkLmdncmlkc2VydmVyZmlsdGVyPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFa29TZXpuYW1EcGhGaWx0ZXJEdG8+KFwiY29sbGVjdFwiLCBtYXNrYSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChmaWx0ZXJTZXJ2ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrYSA9IGZpbHRlclNlcnZlcjtcclxuICAgICAgICAgICAgICAgICAgICAvL21hc2thLiA9IGZpbHRlci5cclxuICAgICAgICAgICAgICAgICAgICAvLyB6amlzdGVuaSwgemRhIHNlIHN1bW92YXQgbmEgc2VydmVydVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdW1tYXJ5ID0gIXRoYXQuZ2V0Um96cGFkKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKHR5cGVvZiBmaWx0ZXIucm96cGFkICE9PSBcInVuZGVmaW5lZFwiICYmIGZpbHRlci5yb3pwYWQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsdGVyLnJvenBhZCEubGVuZ3RoOyBpKyspIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAoZmlsdGVyLnJvenBhZCFbaV0gPT0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgc3VtbWFyeSA9IGZhbHNlOyBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdHI6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFa29EYW5Qcml6bmFuaUxpc3RSZXF1ZXN0RHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXNrYTogbWFza2EsIExpbWl0OiAwLCBTdW1tYXJ5OiBzdW1tYXJ5XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlVjckRwaC5saXN0KHsgcnE6IGZpbHRyIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYXQuc2V0QWN0aW9ucyhyZXN1bHQuTGlzdFZhbHVlcz8ubGVuZ3RoIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFRpdGxlKGZpbHRlci5tZXNpYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEFjdGlvbnMocmVzdWx0LmRhdGEubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZShyZXN1bHQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkgeyB0aGF0LmxvYWRpbmdEYXRhID0gZmFsc2U7fSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgZ3JpZGZvcm1hdHUgZGxlIHByZWRsb2h5XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGNvbERlZmluaXRpb25cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdCB7XHJcbiAgICAgICAgICAgIHZhciBteUdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5HbG9iYWxzLlBhcmFtcz8uRHBoX1JlemltID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbURwaC5JY28pIHtcclxuICAgICAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuR2xvYmFscy5aa3JhdGt5Py5VY3MsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuR2xvYmFscy5aa3JhdGt5Py5VY3MsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDcwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJ1Y3NcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51Y3NJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgb25seUFjdGl2ZTogZmFsc2UsIGRpYWxvZ09wdGlvbnM6IHVuZGVmaW5lZCwgZGlzYWJsZWQ6IGZhbHNlLCBmaXJzdEZpZWxkOiB1bmRlZmluZWQsIG5hbWU6IFwidXVzXCIsIHNlY29uZEZpZWxkOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgbW9kZWw6IFwidWNzXCIsIGNhcHRpb246IHRoaXMuR2xvYmFscy5aa3JhdGt5Py5VdXMgYXMgYW55LCBtYXhMZW5ndGg6IDEwLCBha3RQcm9obDogMTAwLCBpY286IHRoaXMuR2xvYmFscy5Fa29QYXJhbXM/LklDTyBhcyBhbnlcclxuICAgICAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInV1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuR2xvYmFscy5aa3JhdGt5Py5VdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuR2xvYmFscy5aa3JhdGt5Py5VdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLCBcclxuICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51dXNJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgb25seUFjdGl2ZTogZmFsc2UsIGRpYWxvZ09wdGlvbnM6IHVuZGVmaW5lZCwgZGlzYWJsZWQ6IGZhbHNlLCBmaXJzdEZpZWxkOiB1bmRlZmluZWQsIG5hbWU6IFwidXVzXCIsIHNlY29uZEZpZWxkOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgbW9kZWw6IFwidXVzXCIsIGNhcHRpb246IHRoaXMuR2xvYmFscy5aa3JhdGt5Py5VdXMgYXMgYW55LCBtYXhMZW5ndGg6IDEwLCBha3RQcm9obDogMTAwLCBpY286IHRoaXMuR2xvYmFscy5Fa29QYXJhbXM/LklDTyBhcyBhbnksIHVjczogdGhpcy5HbG9iYWxzLkVrb1BhcmFtcz8uVUNTIGFzIGFueVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuR2xvYmFscy5QYXJhbXM/LkRwaF9SZXppbSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1EcGguVWNzKSB7XHJcbiAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1dXNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uVXVzLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uVXVzLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCwgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudXVzSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG9ubHlBY3RpdmU6IGZhbHNlLCBkaWFsb2dPcHRpb25zOiB1bmRlZmluZWQsIGRpc2FibGVkOiBmYWxzZSwgZmlyc3RGaWVsZDogdW5kZWZpbmVkLCBuYW1lOiBcInV1c1wiLCBzZWNvbmRGaWVsZDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG1vZGVsOiBcInV1c1wiLCBjYXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uVXVzIGFzIGFueSwgbWF4TGVuZ3RoOiAxMCwgYWt0UHJvaGw6IDEwMCwgaWNvOiB0aGlzLkdsb2JhbHMuRWtvUGFyYW1zPy5JQ08gYXMgYW55LCB1Y3M6IHRoaXMuR2xvYmFscy5Fa29QYXJhbXM/LlVDUyBhcyBhbnlcclxuICAgICAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicmFkZWtfZHBoXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxMDdcIiwgLy9SQyAzMDI1MDEwNyA6IMWYw6FkZWsgIFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJyYWRla19kcGhcIiB9KSxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDEwNlwiLCAvL1JDIDMwMjUwMTA2IDogTsOhemV2XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNTkwLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY19ha3RfMlwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTA4XCIsIC8vUkMgMzAyNTAxMDggOiBaw6FrbGFkIGRhbsSbXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjX2FrdF8yXCIgfSksXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY19wcml6XzJcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDEwOVwiLCAvL1JDIDMwMjUwMTA5IDogWsOha2xhZCBkYW7EmyBwxZlpem7DoW5vXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjX3ByaXpfMlwiIH0pLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgIC8vLCBoaWRkZW46IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX2RpZmZfMlwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTEwXCIsIC8vUkMgMzAyNTAxMTAgOiBaw6FrbGFkIGRhbsSbICgtKVxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiY19kaWZmXzJcIiB9KSxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICAvLyxoaWRkZW46IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX2FrdF8xXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxMTFcIiwgLy9SQyAzMDI1MDExMSA6IERhxYhcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImNfYWt0XzFcIiB9KSxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX3ByaXpfMVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTEyXCIsIC8vUkMgMzAyNTAxMTIgOiBEYcWIIHDFmWl6bsOhbm9cclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImNfcHJpel8xXCIgfSksXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICAgICAgLy8sIGhpZGRlbjogdHJ1ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfZGlmZl8xXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxMTNcIiwgLy9SQyAzMDI1MDExMyA6IERhxYggKC0pXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjX2RpZmZfMVwiIH0pLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgIC8vLGhpZGRlbjogdHJ1ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfYWt0XzNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDExNFwiLCAvL1JDIDMwMjUwMTE0IDogRGHFiCBrcsOhY2Vuw70gbsOhcm9rXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjX2FrdF8zXCIgfSksXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY19wcml6XzNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDExNVwiLCAvL1JDIDMwMjUwMTE1IDogRGHFiCBLTiBwxZlpem7DoW5vXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjX3ByaXpfM1wiIH0pLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgIC8vLCBoaWRkZW46IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX2RpZmZfM1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTE2XCIsIC8vUkMgMzAyNTAxMTYgOiBEYcWIIEtOICgtKVxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiY19kaWZmXzNcIiB9KSxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICAvLywgaGlkZGVuOiB0cnVlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY19ha3RfNFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTE3XCIsIC8vUkMgMzAyNTAxMTcgOiBLb2VmaWNpZW50XHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjX2FrdF80XCIgfSksXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY19wcml6XzRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDExOFwiLCAvL1JDIDMwMjUwMTE4IDogS29lZmljaWVudCBwxZlpem7DoW5vXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjX3ByaXpfNFwiIH0pLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgIC8vLCBoaWRkZW46IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX2RpZmZfNFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTE5XCIsIC8vUkMgMzAyNTAxMTkgOiBLb2VmaWNpZW50ICgtKVxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiY19kaWZmXzRcIiB9KSxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICAvLywgaGlkZGVuOiB0cnVlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gcG9kbWluZW5lIGZvcm1hdG92YW5pXHJcbiAgICAgICAgICAgIHRoaXMuY29uZEZvcm1hdHMgPSBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDY3MFwiLCAvL1JDIDMwMjUwNjcwIDogTmVudWxvdsOhIGhvZG5vdGFcclxuICAgICAgICAgICAgICAgICAgICBhcHBseVRvOiBcImNfYWt0XzJcIiwgZm9ybXVsYTogXCIoTk9UKElTQkxBTksoQGNfYWt0XzIpIG9yIEBjX2FrdF8yID09IDApKVwiLCB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LmJsYWNrLCBiZzogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0QmcuZ3JlZW5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICwgeyBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNjcwXCIsIGFwcGx5VG86IFwiY19ha3RfMVwiLCBmb3JtdWxhOiBcIiggTk9UKElTQkxBTksoQGNfYWt0XzEpIG9yIEBjX2FrdF8xID09IDApKVwiLCB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LmJsYWNrLCBiZzogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0QmcuZ3JlZW4gfVxyXG4gICAgICAgICAgICAgICAgLCB7IGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA2NzBcIiwgYXBwbHlUbzogXCJjX2FrdF8zXCIsIGZvcm11bGE6IFwiKE5PVChJU0JMQU5LKEBjX2FrdF8zKSBvciBAY19ha3RfMyA9PSAwKSlcIiwgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5ibGFjaywgYmc6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdEJnLmdyZWVuIH1cclxuICAgICAgICAgICAgICAgICwgeyBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNjcwXCIsIGFwcGx5VG86IFwiY19ha3RfNFwiLCBmb3JtdWxhOiBcIihOT1QoSVNCTEFOSyhAY19ha3RfNCkgb3IgQGNfYWt0XzQgPT0gMCkpXCIsIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuYmxhY2ssIGJnOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRCZy5ncmVlbiB9XHJcbiAgICAgICAgICAgICAgICAsIHsgZGVzY3JpcHRpb246IFwianJlczozMDI1MDY3MFwiLCBhcHBseVRvOiBcImNfcHJpel8xXCIsIGZvcm11bGE6IFwiKE5PVChJU0JMQU5LKEBjX3ByaXpfMSkgb3IgQGNfcHJpel8xID09IDApKVwiLCB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LmJsYWNrLCBiZzogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0QmcuZ3JlZW4gfVxyXG4gICAgICAgICAgICAgICAgLCB7IGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA2NzBcIiwgYXBwbHlUbzogXCJjX3ByaXpfMlwiLCBmb3JtdWxhOiBcIihOT1QoSVNCTEFOSyhAY19wcml6XzIpIG9yIEBjX3ByaXpfMiA9PSAwKSlcIiwgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5ibGFjaywgYmc6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdEJnLmdyZWVuIH1cclxuICAgICAgICAgICAgICAgICwgeyBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNjcwXCIsIGFwcGx5VG86IFwiY19wcml6XzNcIiwgZm9ybXVsYTogXCIoTk9UKElTQkxBTksoQGNfcHJpel8zKSBvciBAY19wcml6XzMgPT0gMCkpXCIsIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuYmxhY2ssIGJnOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRCZy5ncmVlbiB9XHJcbiAgICAgICAgICAgICAgICAsIHsgZGVzY3JpcHRpb246IFwianJlczozMDI1MDY3MFwiLCBhcHBseVRvOiBcImNfcHJpel80XCIsIGZvcm11bGE6IFwiKE5PVChJU0JMQU5LKEBjX3ByaXpfNCkgb3IgQGNfcHJpel80ID09IDApKVwiLCB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LmJsYWNrLCBiZzogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0QmcuZ3JlZW4gfVxyXG4gICAgICAgICAgICAgICAgLCB7IGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA2NzBcIiwgYXBwbHlUbzogXCJjX2RpZmZfMVwiLCBmb3JtdWxhOiBcIihOT1QoSVNCTEFOSyhAY19kaWZmXzEpIG9yIEBjX2RpZmZfMSA9PSAwKSlcIiwgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5ibGFjaywgYmc6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdEJnLmdyZWVuIH1cclxuICAgICAgICAgICAgICAgICwgeyBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNjcwXCIsIGFwcGx5VG86IFwiY19kaWZmXzJcIiwgZm9ybXVsYTogXCIoTk9UKElTQkxBTksoQGNfZGlmZl8yKSBvciBAY19kaWZmXzIgPT0gMCkpXCIsIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuYmxhY2ssIGJnOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRCZy5ncmVlbiB9XHJcbiAgICAgICAgICAgICAgICAsIHsgZGVzY3JpcHRpb246IFwianJlczozMDI1MDY3MFwiLCBhcHBseVRvOiBcImNfZGlmZl8zXCIsIGZvcm11bGE6IFwiKE5PVChJU0JMQU5LKEBjX2RpZmZfMykgb3IgQGNfZGlmZl8zID09IDApKVwiLCB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LmJsYWNrLCBiZzogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0QmcuZ3JlZW4gfVxyXG4gICAgICAgICAgICAgICAgLCB7IGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA2NzBcIiwgYXBwbHlUbzogXCJjX2RpZmZfNFwiLCBmb3JtdWxhOiBcIihOT1QoSVNCTEFOSyhAY19kaWZmXzQpIG9yIEBjX2RpZmZfNCA9PSAwKSlcIiwgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5ibGFjaywgYmc6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdEJnLmdyZWVuIH1cclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBteUdyaWRGb3JtYXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
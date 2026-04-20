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
             * Seznam pozadavku
             *
             * @author tkares
             * @since 484.1.0.69
            */
            let GSeznamDoplnkoveUdaje = class GSeznamDoplnkoveUdaje extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.firstLoad = true;
                    // Editovatelny gridu
                    //private editGrid: JQuery;
                    //private myForm: Gordic.Forms.Form;
                    // nastaveni id a titulku okna
                    this.title = "jres:30250054"; //RC 30250054 : Doplňkové údaje výkazů
                }
                //uid = "seznamDoplUdaje";
                //GSeznamDoplnkoveUdajeOptions
                onContentReady() {
                    var that = this;
                    // ulozeni spustene ulohy
                    this?.parentContent?.userSettings.set("lastAction", this.taskId);
                    that.currentRok = that.ekoParams.Rok;
                    // vytvoreni fitru panelu
                    this.createFilterPanel(this);
                    let treeProcessor = new Gordic.Data.Tree(Gordic.Data.Tree.parentIdOrganizer("parentId"), {
                        filterKeepStructure: true,
                        //defaultState: "unknown",// (m) => { return m.data.nodeState as DataStructureState || "unknown"; },
                        defaultState: (m) => {
                            //return "unknown";
                            if (m.data.level === 2) {
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
                    this.actions.addRange({
                        actDetail: Gordic.Eko.Action.actionDetail({
                            enabled: false,
                            run: function () {
                                let data;
                                data = that.$grid.ggrid("getSelection")[0];
                                if (data?.level === 2) {
                                    //zobrazeni detailu
                                    var topo = that.getTopologie();
                                    var id = "Dopl_" + data.id + "#";
                                    debugger;
                                    var okno = that.navigate(Gordic.Ucr.WebClient.GDetailDoplHodnoty, {
                                        id: id,
                                        currentRow: data, topologie: topo, viewMode: false,
                                        rok: that.currentRok, mesic: that.currentMonth
                                    }, {
                                        closeOnEscape: false,
                                        close: function (a, b) {
                                            debugger;
                                        },
                                    });
                                    okno.on("close", function (ev) {
                                        if (ev.returnValue && ev.returnValue.refresh) {
                                            // refresh dat
                                            var row = that.$grid.ggrid("activeRow");
                                            if (row && row.level === 2) {
                                                that.previewController.enable(true);
                                                that.previewController.show({ currentRow: row, viewMode: true, topologie: that.getTopologie(), rok: that.currentRok, mesic: that.currentMonth });
                                                //});
                                                return;
                                            }
                                            else
                                                that.previewController.enable(false);
                                            //that.$grid.focus();
                                        }
                                    });
                                }
                            }
                        }),
                    });
                    let tabRadky = $.newDiv()
                        .appendTo(this.element)
                        .gtab({
                        title: "jres:30250617", //RC 30250617 : Výkazy
                        locked: true,
                        opened: true,
                        menuBar: [
                            { action: that.actions.actDetail, favorite: true },
                        ]
                    });
                    this.$grid = $.newDiv("js-ucrDoplnUdaje").appendTo(tabRadky /*this.element*/)
                        .ggrid({
                        columnMode: "full",
                        data: view,
                        // delegat pro zmenu stylu radku pri vykreslovani
                        rowsClass: function (metarow) {
                            var styl = "";
                            if (metarow.data.level === 0)
                                styl = "tree_root";
                            else if (metarow.data.level === 1)
                                styl = "tree_item";
                            else if (metarow.data.level === 2)
                                styl = "tree_item_last";
                            else
                                styl = "tree_root";
                            return styl;
                        },
                        selection: function (ev, info) {
                            var rows = info.getSelection();
                            that.enableActions();
                            //that.clearControls();
                            if (rows.length > 0 && rows[0].level === 2) {
                                //that.loadSloupce(rows[0])
                                //    .done((res) => {
                                //        that.createCols(rows[0], res);
                                that.previewController.enable(true);
                                that.previewController.show({ currentRow: rows[0], viewMode: true, topologie: that.getTopologie(), rok: that.currentRok, mesic: that.currentMonth });
                                //});
                                return;
                            }
                            else
                                that.previewController.enable(false);
                            //that.clearControls();
                        },
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: function (ev, ctx) {
                                let data;
                                if (ctx.cellInfo && ctx.cellInfo.data)
                                    data = ctx.cellInfo.data;
                                else
                                    data = that.$grid.ggrid("getSelection")[0];
                                if (data?.level === 2) {
                                    //zobrazeni detailu
                                    var topo = that.getTopologie();
                                    var id = "Dopl_" + data.id + "#";
                                    debugger;
                                    var okno = that.navigate(Gordic.Ucr.WebClient.GDetailDoplHodnoty, {
                                        id: id,
                                        currentRow: data, topologie: topo, viewMode: false,
                                        rok: that.currentRok, mesic: that.currentMonth
                                    }, {
                                        closeOnEscape: false,
                                        close: function (a, b) {
                                            debugger;
                                        },
                                    });
                                    okno.on("close", function (ev) {
                                        if (ev.returnValue && ev.returnValue.refresh) {
                                            // refresh dat
                                            var row = that.$grid.ggrid("activeRow");
                                            if (row && row.level === 2) {
                                                that.previewController.enable(true);
                                                that.previewController.show({ currentRow: row, viewMode: true, topologie: that.getTopologie(), rok: that.currentRok, mesic: that.currentMonth });
                                                //});
                                                return;
                                            }
                                            else
                                                that.previewController.enable(false);
                                            //that.$grid.focus();
                                        }
                                    });
                                }
                                else
                                    ctx.cellInfo.meta.structure.interaction();
                            }
                        }),
                        //searchColumns: ["vykaz", "kod", "poz"],
                        multi: false,
                        //#region Definice sloupcu
                        columns: new Gordic.Data.GridFormat()
                            .addStructureColumn({
                            name: "vykaz", caption: "", width: 530, structureLead: true /*customClass: "ui-disabled"*/, /*sysColumn: true,*/ /* forced:true,*/
                        })
                            //.addTextColumn({
                            //    name: "vykaz",
                            //    caption: "jres:30250057",  //RC 30250057 : Výkaz
                            //    width: 550
                            //})
                            .addTextColumn({
                            name: "kod",
                            caption: "jres:30250058", //RC 30250058 : Kód
                            width: 50
                        })
                            .addTextColumn({
                            name: "poz",
                            caption: "jres:30250059", //RC 30250059 : Poznámka
                            //width: 250
                        })
                        //#endregion
                    });
                    //#region Preview v sidebaru
                    this.element.gsidebar("option", "right", { userSettings: this.userSettings, width: 500, visible: true, pinned: true /* pinned: false, leafsAutoHide: false*/ });
                    this.previewController = new Gordic.Previews.GPreviewController(this.element, {
                        useSubtask: false,
                        panelOptions: {
                            caption: "jres:31100217", //RC 31100217 : Náhled detailu
                            side: "right"
                        },
                        tabs: [{
                                caption: "jres:31100217", //RC 31100217 : Náhled detailu
                                customLoad: (tab, dto) => {
                                    let elm = $.newDiv().gcontent(Gordic.Ucr.WebClient.GDetailDoplHodnoty, { parentContent: this, rok: that.currentRok, mesic: that.currentMonth }); //Nutne pro spravne spojeni s kontextem hlavniho contentu
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
                    //// nastaveni filtru
                    //// ico
                    //that.$filterPanel.findFields("ico").gfield("setValue", { ico: that.ekoParams.Ico });
                    ////ucs
                    //that.$filterPanel.findFields("ucs").gfield("model", "apply", { ico: that.ekoParams.Ico, ucs: that.ekoParams.Ucs });
                }
                /**
                 * Nastaveni pristupnosti akci dle stavu
                 *
                 */
                enableActions() {
                    let data;
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    data = this.$grid.ggrid("getSelection")[0];
                    this.actions.actDetail?.update({ enabled: data?.level === 2 });
                }
                /**
                 *
                 * Vraceni instance gridu
                 *
                 */
                getGrid() {
                    let data = this.element.find(".ggrid.js-ucrDoplnUdaje");
                    return (data.length == 0 ? null : data);
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
                    var filterFormDef = new Gordic.Forms.Form({ /*opened: true, layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1",*/ tabLabel: "jres:30250052",
                        init: () => {
                            $(this).findFields("ico,ucs").gfield("model", "apply", { ico: this.ekoParams.Ico, ucs: this.ekoParams.Ucs });
                        }
                    }) //RC 30250052 : Filtr
                        .addSection()
                        .addPrefab(Gordic.Gin.Prefabs.denMesicRok({
                        name: "denmesicrokdph",
                        rangeMonth: { maxValue: 13, minValue: 1, selectableMaxValue: 13 },
                        //width: { year: 7, month:5,day:0 },
                        fields: ["rok", "mesic"],
                        label: "jres:30250053", //RC 30250053 : Rok - měsíc
                        ekoDate: true,
                        yearFieldOptions: {
                            name: "rok",
                            model: "rok=value",
                            validators: [],
                            initialValue: this.ekoParams.Rok,
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
                        .addRow({ label: "jres:30250056" }).addField("gselectbox", //RC 30250056 : IČO
                    Gordic.Prefabs.Select.ekosico(), {
                        name: "ico",
                        // defaultValue: { ico: this.ekoParams.Ico},
                        initialValue: { ico: this.ekoParams.Ico },
                        model: "model.ico=value.ico",
                        //change: (obj, values) => {
                        //    debugger
                        //    let data: { ico: string, rok: number, mesic: number, ucs: string } = that.$filterPanel.gfilterpanel('getCurrentData');
                        //    if (values && values.value) {
                        //        if(data.ico)
                        //        that.$filterPanel.findFields("ucs").gfield("clear");
                        //        if (values.value.ico == this.ekoParams.Ico)
                        //            that.$filterPanel.findFields("ucs").gfield("setValue", { ico: that.ekoParams.Ico, ucs: that.ekoParams.Ucs })
                        //        //that.$filterPanel.findFields("ucs").gfield("model", "apply", { ico: this.ekoParams.Ico, ucs: this.ekoParams.Ucs });
                        //    } else {
                        //        // nastaveni filtru
                        //        // ico
                        //        that.$filterPanel.findFields("ico").gfield("setValue", { ico: that.ekoParams.Ico })
                        //        //ucs
                        //        that.$filterPanel.findFields("ucs").gfield("setValue", { ico: that.ekoParams.Ico, ucs: that.ekoParams.Ucs })
                        //    }
                        //    //.gfield("model", "apply", { drd: result });
                        //},
                    })
                        .addRow("jres:30250055").addField("gselectbox", //RC 30250055 : UCS
                    Gordic.Prefabs.Select.ekosucs(), {
                        name: "ucs" //, dropdown: false
                        ,
                        model: "model.ico=>value.ico;model.ucs=value.ucs",
                        itemTemplate: "{ucs:trim:encode}",
                        //defaultValue: { ico: this.ekoParams.Ico, ucs: this.ekoParams.Ucs },
                        initialValue: { ico: this.ekoParams.Ico, ucs: this.ekoParams.Ucs },
                        change: (values, obj) => { },
                        serverFilters: {
                            ico: new Gordic.Forms.Dependency("ico", "ico")
                            //ico: function () {
                            //    //let ico = that.$filterPanel.findFields("ico").gfield("getValue");
                            //    let data: { ico: string, rok: number, mesic: number, ucs: string } = that.$filterPanel.gfilterpanel('getCurrentData');
                            //    debugger;
                            //    return data.ico;
                            //},
                            //rok_od: "<= " +this.ekoParams.Rok,
                            //rok_do: ">= " +this.ekoParams.Rok,
                        },
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
                        forms: [that.CreateFilterZalozka()],
                        filterViewMode: FilterViewMode.Simple,
                        filterViewModeUserSettings: "Deny",
                        favoriteLayoutDescriptor: "L4M3S1",
                        autoLoadAfterCreatePanel: true,
                        apply: function (event, obj) {
                            console.log("filterForm.apply", obj);
                            that.log.trace("filterForm.apply", obj);
                            // ulozeni aktualnich hodnot filtru
                            that.currentRok = obj.filter.rok;
                            that.currentMonth = obj.filter.mesic;
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            var view = that.$grid.ggrid("getView");
                            view.requestData /*<Gordic.Ucr.WebClient.GUcrTreeDoplnUdajeDto>*/(obj);
                            //that.loadData(obj);
                        }
                    });
                    //.gfilterpanel({
                    //    helperCustomizer: function (data) {
                    //        var polSort = data.sort(function (a, b) { return a.name >= b.name; });
                    //        return polSort;
                    //    },                    
                    //    forms: [that.CreateFilterZalozka()],
                    //    //filterViewMode: defFiltru,// FilterViewMode.Detail,                 
                    //    //favorites: ["ixp", "ixs_typ", "vlastni_doklady"],
                    //    autoLoadAfterChoseFilter :true,
                    //    //saveOptionsForm: "eko",
                    //    filterStorageService: new Gordic.Gin.FilterStorageService.Store(),
                    //    filterViewModeUserSettings: "Deny",
                    //    // 01.03.2021 - TFeik
                    //    // Nahrazení obsolete parametrů.
                    //    autoLoadAfterCreatePanel:true,
                    //    //userDefaultFilter: true,
                    //    filterViewMode: FilterViewMode.Simple,
                    //    favoriteLayoutDescriptor: "L4M3S1",                    
                    //    apply: function (event, obj) {                        
                    //        console.log("filterForm.apply", obj);
                    //        that.log.trace("filterForm.apply", obj);
                    //        // ulozeni aktualnich hodnot filtru
                    //        that.currentRok = obj.filter.rok;
                    //        that.currentMonth = obj.filter.mesic;
                    //        var view = that.$grid.ggrid("getView");
                    //        view.requestData/*<Gordic.Ucr.WebClient.GUcrTreeDoplnUdajeDto>*/(obj);
                    //        //that.loadData(obj);
                    //    }
                    //});
                }
                /*
                 * Zjisteni topologie
                 *
                 * */
                getTopologie() {
                    let filter = this.$filterPanel.gfilterpanel('getConfirmedData');
                    return { ico: filter.ico, mesic: filter.mesic, rok: filter.rok, ucs: filter.ucs };
                }
                /**
                 * Prevod formatu textu na id (xxx_id)
                 *
                 * @param src
                 */
                getId(src) {
                    var pos = src.indexOf("_");
                    if (pos > 0) {
                        return src.substring(pos + 1);
                        //return src.substr(pos+1);
                    }
                    return src;
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
                        resultData = that.isl.UcrVykazAdm.listCastiVykazu({ ixs_vkz: filtr.id, rok: that.currentRok, mesic: that.currentMonth }).getData();
                    else {
                        resultData = that.isl.UcrVykazAdm.listRadkuVykazu({ ixs_vkz: filtr.mainId, kod_cast_vkz: that.getId(filtr.id), rok: that.currentRok, mesic: that.currentMonth }).getData();
                    }
                    resultData
                        .then(function (result) {
                        for (var i = 0; i < result.length; i++) {
                            if (filtr.level == 0)
                                data.push({ id: filtr.id + "_" + result[i].ixs_vkz, kod: "", pozn: result[i].poznamka, parentId: filtr.id, vykaz: "  " + result[i].nazev, level: 1, mainId: filtr.id });
                            else {
                                let res = result[i];
                                data.push({
                                    id: "" + filtr.mainId + filtr.id?.replace("_", "") + "_" + res.ixs_vkz, kod: "", pozn: res.poznamka, parentId: filtr.id, vykaz: "      " + res.nazev, level: 2, mainId: filtr.mainId,
                                    delka_du: res.delka_du, delka_vaz: res.delka_vaz, delka_vaz2: res.delka_vaz2, pattern_du: res.pattern_du,
                                    nazev_vaz: res.nazev_vaz, nazev_vaz2: res.nazev_vaz2, pattern_vaz: res.pattern_vaz, pattern_vaz2: res.pattern_vaz2,
                                    poznamka_vaz: res.poznamka_vaz, poznamka_vaz2: res.poznamka_vaz2, priz_opak: res.priz_opak
                                });
                            }
                        }
                        return def.resolve(data);
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
                        myDef.resolve({ filter: { rok: this.ekoParams.Rok, mesic: this.currentMonth } }).promise();
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
                        var rokmes = "";
                        if (result.rok) {
                            rokmes = "" + result.rok.toString();
                        }
                        else
                            rokmes = "" + that.ekoParams.Rok?.toString();
                        var mesic = that.currentMonth.toString();
                        if (result.mesic) {
                            mesic = "" + result.mesic.toString();
                        }
                        if (mesic.length == 1)
                            mesic = "0" + mesic;
                        rokmes += mesic;
                        var filtr = { priz_du: 1, aktivita: 100, platnost: rokmes };
                        if (rokmes !== "")
                            filtr = $.extend(filtr, filtr);
                        that.isl.UcrVykazAdm.list({ filters: filtr }).getData()
                            .done(function (result) {
                            for (var i = 0; i < result.length; i++) {
                                data.push({ id: result[i].ixs_vkz, kod: result[i].kod_vkz, pozn: result[i].poznamka, parentId: null, vykaz: result[i].nazev, level: 0 });
                            }
                            def.resolve(data);
                        });
                    });
                    return def.promise();
                }
            };
            GSeznamDoplnkoveUdaje = __decorate([
                Decorators.gcontent
            ], GSeznamDoplnkoveUdaje);
            WebClient.GSeznamDoplnkoveUdaje = GSeznamDoplnkoveUdaje;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbURvcGxua292ZVVkYWplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbURvcGxua292ZVVkYWplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0FzbEJmO0FBdGxCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FzbEJuQjtJQXRsQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXNsQjdCO1FBdGxCb0IsV0FBQSxTQUFTO1lBQzFCOzs7OztjQUtFO1lBS0YsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBc0IsU0FBUSxPQUFBLFlBQVk7Z0JBQXZEOztvQkFNWSxjQUFTLEdBQUcsSUFBSSxDQUFDO29CQVF6QixxQkFBcUI7b0JBQ3JCLDJCQUEyQjtvQkFDM0Isb0NBQW9DO29CQUNwQyw4QkFBOEI7b0JBQzlCLFVBQUssR0FBRyxlQUFlLENBQUMsQ0FBQyxzQ0FBc0M7Z0JBcWpCbkUsQ0FBQztnQkFwakJHLDBCQUEwQjtnQkFDMUIsOEJBQThCO2dCQUM5QixjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIseUJBQXlCO29CQUN6QixJQUFJLEVBQUUsYUFBYSxFQUFFLFlBQWEsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFFbEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUksQ0FBQztvQkFFdEMseUJBQXlCO29CQUN6QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRzdCLElBQUksYUFBYSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxFQUM5Qzt3QkFDSSxtQkFBbUIsRUFBRSxJQUFJO3dCQUN6QixvR0FBb0c7d0JB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cUIsd0JBdWtCakMsQ0FBQTtRQUlMLENBQUMsRUF0bEJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFzbEI3QjtJQUFELENBQUMsRUF0bEJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFzbEJuQjtBQUFELENBQUMsRUF0bEJTLE1BQU0sS0FBTixNQUFNLFFBc2xCZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIFNlem5hbSBwb3phZGF2a3VcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciB0a2FyZXNcclxuICAgICAqIEBzaW5jZSA0ODQuMS4wLjY5XHJcbiAgICAqL1xyXG5cclxuXHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU2V6bmFtRG9wbG5rb3ZlVWRhamUgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG5cclxuICAgICAgICAvLyBmaWx0ZXIgcGFuZWxcclxuICAgICAgICBwcml2YXRlICRmaWx0ZXJQYW5lbDogSlF1ZXJ5O1xyXG4gICAgICAgIHB1YmxpYyAkZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjsgICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgZWtvUGFyYW1zOiBHb3JkaWMuVWNyLldlYkNsaWVudC5HRWtvUGFyYW1zRHRvO1xyXG4gICAgICAgIHByaXZhdGUgZmlyc3RMb2FkID0gdHJ1ZTtcclxuICAgICAgICBwcml2YXRlIGN1cnJlbnRNb250aDogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgY3VycmVudFJvazogbnVtYmVyO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBteVBhbmVsOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIC8vcHJpdmF0ZSBlZGl0Q29sczogR29yZGljLlVjdC5JbnRlcmZhY2UuR1Z5a0NvbFZhbHVlRHRvW107XHJcbiAgICAgICAgLy9wcml2YXRlIG15R3JpZEZvcm1hdDogR29yZGljLkRhdGEuR3JpZEZvcm1hdDtcclxuICAgICAgICAvLyBwcmV2aWV3XHJcbiAgICAgICAgcHJpdmF0ZSBwcmV2aWV3Q29udHJvbGxlcjogR29yZGljLlByZXZpZXdzLkdQcmV2aWV3Q29udHJvbGxlcjxJR1Nlem5hbURvcGxuVWRhamVEdG9XaXRoVGFiU2V0dGluZ3M+O1xyXG4gICAgICAgIC8vIEVkaXRvdmF0ZWxueSBncmlkdVxyXG4gICAgICAgIC8vcHJpdmF0ZSBlZGl0R3JpZDogSlF1ZXJ5O1xyXG4gICAgICAgIC8vcHJpdmF0ZSBteUZvcm06IEdvcmRpYy5Gb3Jtcy5Gb3JtO1xyXG4gICAgICAgIC8vIG5hc3RhdmVuaSBpZCBhIHRpdHVsa3Ugb2tuYVxyXG4gICAgICAgIHRpdGxlID0gXCJqcmVzOjMwMjUwMDU0XCI7IC8vUkMgMzAyNTAwNTQgOiBEb3BsxYhrb3bDqSDDumRhamUgdsO9a2F6xa9cclxuICAgICAgICAvL3VpZCA9IFwic2V6bmFtRG9wbFVkYWplXCI7XHJcbiAgICAgICAgLy9HU2V6bmFtRG9wbG5rb3ZlVWRhamVPcHRpb25zXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy8gdWxvemVuaSBzcHVzdGVuZSB1bG9oeVxyXG4gICAgICAgICAgICB0aGlzPy5wYXJlbnRDb250ZW50Py51c2VyU2V0dGluZ3MhLnNldChcImxhc3RBY3Rpb25cIiwgdGhpcy50YXNrSWQpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5jdXJyZW50Um9rID0gdGhhdC5la29QYXJhbXMuUm9rITtcclxuXHJcbiAgICAgICAgICAgIC8vIHZ5dHZvcmVuaSBmaXRydSBwYW5lbHVcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGaWx0ZXJQYW5lbCh0aGlzKTsgXHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IHRyZWVQcm9jZXNzb3IgPSBuZXcgR29yZGljLkRhdGEuVHJlZSA8R29yZGljLlVjci5XZWJDbGllbnQuR1VjclRyZWVEb3BsblVkYWplRHRvPiAoXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuRGF0YS5UcmVlLnBhcmVudElkT3JnYW5pemVyKFwicGFyZW50SWRcIiksXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyS2VlcFN0cnVjdHVyZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2RlZmF1bHRTdGF0ZTogXCJ1bmtub3duXCIsLy8gKG0pID0+IHsgcmV0dXJuIG0uZGF0YS5ub2RlU3RhdGUgYXMgRGF0YVN0cnVjdHVyZVN0YXRlIHx8IFwidW5rbm93blwiOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRTdGF0ZTogKG0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gXCJ1bmtub3duXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtLmRhdGEubGV2ZWwgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvc2xlZG5pIHVyb3ZlbiBidWRlIGppeiBvdGV2cmVuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwib3BlblwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG51dG5vIGRvY2lzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidW5rbm93blwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZHluYW1pY1JlcXVlc3Q6IChkYXRhKSA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxldmVsID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBwcm92aWRlciA9IG5ldyBHb3JkaWMuRGF0YS5Qcm92aWRlcjxHb3JkaWMuVWNyLldlYkNsaWVudC5HVWNyVHJlZURvcGxuVWRhamVEdG8sIEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdVY3JUcmVlRG9wbG5VZGFqZUR0bz4oKHJlcSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQubG9hZERhdGEocmVxKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldzxHb3JkaWMuVWNyLldlYkNsaWVudC5HVWNyVHJlZURvcGxuVWRhamVEdG8+KFtdLCB7IGtleTogXCJpZFwiLCBwcm9jZXNzb3JzOiB7IHRyZWU6IHRyZWVQcm9jZXNzb3IsIHByb3ZpZGVyOiBwcm92aWRlciB9IH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3REZXRhaWw6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbkRldGFpbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhOiBHb3JkaWMuVWNyLldlYkNsaWVudC5HVWNyVHJlZURvcGxuVWRhamVEdG8gfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSB0aGF0LiRncmlkLmdncmlkPEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdVY3JUcmVlRG9wbG5VZGFqZUR0bz4oXCJnZXRTZWxlY3Rpb25cIilbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhPy5sZXZlbCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy96b2JyYXplbmkgZGV0YWlsdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRvcG8gPSB0aGF0LmdldFRvcG9sb2dpZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlkID0gXCJEb3BsX1wiICsgZGF0YS5pZCArIFwiI1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2tubyA9IHRoYXQubmF2aWdhdGUoR29yZGljLlVjci5XZWJDbGllbnQuR0RldGFpbERvcGxIb2Rub3R5LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBjdXJyZW50Um93OiBkYXRhLCB0b3BvbG9naWU6IHRvcG8sIHZpZXdNb2RlOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgcm9rOiB0aGF0LmN1cnJlbnRSb2ssIG1lc2ljOiB0aGF0LmN1cnJlbnRNb250aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlT25Fc2NhcGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlOiBmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBva25vLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChldiBhcyBhbnkpLnJldHVyblZhbHVlICYmIChldiBhcyBhbnkpLnJldHVyblZhbHVlLnJlZnJlc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVmcmVzaCBkYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IHRoYXQuJGdyaWQuZ2dyaWQ8R29yZGljLlVjci5XZWJDbGllbnQuR1VjclRyZWVEb3BsblVkYWplRHRvPihcImFjdGl2ZVJvd1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgJiYgcm93LmxldmVsID09PSAyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5lbmFibGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLnNob3coeyBjdXJyZW50Um93OiByb3csIHZpZXdNb2RlOiB0cnVlLCB0b3BvbG9naWU6IHRoYXQuZ2V0VG9wb2xvZ2llKCksIHJvazogdGhhdC5jdXJyZW50Um9rLCBtZXNpYzogdGhhdC5jdXJyZW50TW9udGggfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LiRncmlkLmZvY3VzKCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCB0YWJSYWRreSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDYxN1wiLCAgLy9SQyAzMDI1MDYxNyA6IFbDvWthenlcclxuICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUJhcjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdERldGFpbCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy4kZ3JpZCA9ICQubmV3RGl2KFwianMtdWNyRG9wbG5VZGFqZVwiKS5hcHBlbmRUbyh0YWJSYWRreS8qdGhpcy5lbGVtZW50Ki8pICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB2aWV3LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRlbGVnYXQgcHJvIHptZW51IHN0eWx1IHJhZGt1IHByaSB2eWtyZXNsb3ZhbmlcclxuICAgICAgICAgICAgICAgICAgICByb3dzQ2xhc3M6IGZ1bmN0aW9uIChtZXRhcm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdHlsID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXRhcm93LmRhdGEubGV2ZWwgPT09IDAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bCA9IFwidHJlZV9yb290XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1ldGFyb3cuZGF0YS5sZXZlbCA9PT0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWwgPSBcInRyZWVfaXRlbVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChtZXRhcm93LmRhdGEubGV2ZWwgPT09IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsID0gXCJ0cmVlX2l0ZW1fbGFzdFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsID0gXCJ0cmVlX3Jvb3RcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0eWw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGZ1bmN0aW9uIChldiwgaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93cyA9IGluZm8uZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5hYmxlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuY2xlYXJDb250cm9scygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93cy5sZW5ndGggPiAwICYmIHJvd3NbMF0ubGV2ZWwgPT09IDIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQubG9hZFNsb3VwY2Uocm93c1swXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC5kb25lKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LmNyZWF0ZUNvbHMocm93c1swXSwgcmVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5zaG93KHsgY3VycmVudFJvdzogcm93c1swXSwgdmlld01vZGU6IHRydWUsIHRvcG9sb2dpZTogdGhhdC5nZXRUb3BvbG9naWUoKSwgcm9rOiB0aGF0LmN1cnJlbnRSb2ssIG1lc2ljOiB0aGF0LmN1cnJlbnRNb250aCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuY2xlYXJDb250cm9scygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YTogR29yZGljLlVjci5XZWJDbGllbnQuR1VjclRyZWVEb3BsblVkYWplRHRvIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC5jZWxsSW5mbyAmJiBjdHguY2VsbEluZm8uZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gY3R4LmNlbGxJbmZvLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHRoYXQuJGdyaWQuZ2dyaWQ8R29yZGljLlVjci5XZWJDbGllbnQuR1VjclRyZWVEb3BsblVkYWplRHRvPihcImdldFNlbGVjdGlvblwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhPy5sZXZlbCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vem9icmF6ZW5pIGRldGFpbHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG9wbyA9IHRoYXQuZ2V0VG9wb2xvZ2llKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlkID0gXCJEb3BsX1wiICsgIGRhdGEuaWQgKyBcIiNcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2tubyA9IHRoYXQubmF2aWdhdGUoR29yZGljLlVjci5XZWJDbGllbnQuR0RldGFpbERvcGxIb2Rub3R5LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBjdXJyZW50Um93OiBkYXRhLCB0b3BvbG9naWU6IHRvcG8sIHZpZXdNb2RlOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHJvazogdGhhdC5jdXJyZW50Um9rLCBtZXNpYzogdGhhdC5jdXJyZW50TW9udGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlT25Fc2NhcGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBva25vLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZXYgYXMgYW55KS5yZXR1cm5WYWx1ZSAmJiAoZXYgYXMgYW55KS5yZXR1cm5WYWx1ZS5yZWZyZXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZWZyZXNoIGRhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IHRoYXQuJGdyaWQuZ2dyaWQ8R29yZGljLlVjci5XZWJDbGllbnQuR1VjclRyZWVEb3BsblVkYWplRHRvPihcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyAmJiByb3cubGV2ZWwgPT09IDIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5lbmFibGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5zaG93KHsgY3VycmVudFJvdzogcm93LCB2aWV3TW9kZTogdHJ1ZSwgdG9wb2xvZ2llOiB0aGF0LmdldFRvcG9sb2dpZSgpLCByb2s6IHRoYXQuY3VycmVudFJvaywgbWVzaWM6IHRoYXQuY3VycmVudE1vbnRoIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5lbmFibGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LiRncmlkLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5jZWxsSW5mby5tZXRhLnN0cnVjdHVyZS5pbnRlcmFjdGlvbigpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZWFyY2hDb2x1bW5zOiBbXCJ2eWthelwiLCBcImtvZFwiLCBcInBvelwiXSxcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8jcmVnaW9uIERlZmluaWNlIHNsb3VwY3VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjci5XZWJDbGllbnQuR1VjclRyZWVEb3BsblVkYWplRHRvPigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTdHJ1Y3R1cmVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2eWthelwiLCBjYXB0aW9uOiBcIlwiLCB3aWR0aDogNTMwLCBzdHJ1Y3R1cmVMZWFkOiB0cnVlIC8qY3VzdG9tQ2xhc3M6IFwidWktZGlzYWJsZWRcIiovLCAvKnN5c0NvbHVtbjogdHJ1ZSwqLy8qIGZvcmNlZDp0cnVlLCovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJ2eWthelwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwNTdcIiwgIC8vUkMgMzAyNTAwNTcgOiBWw71rYXpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgd2lkdGg6IDU1MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia29kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwNThcIiwgIC8vUkMgMzAyNTAwNTggOiBLw7NkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3pcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDA1OVwiLCAvL1JDIDMwMjUwMDU5IDogUG96bsOhbWthXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3dpZHRoOiAyNTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gUHJldmlldyB2IHNpZGViYXJ1XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZ3NpZGViYXIoXCJvcHRpb25cIiwgXCJyaWdodFwiLCB7IHVzZXJTZXR0aW5nczogdGhpcy51c2VyU2V0dGluZ3MhLCB3aWR0aDogNTAwLCB2aXNpYmxlOiB0cnVlLCBwaW5uZWQ6IHRydWUgLyogcGlubmVkOiBmYWxzZSwgbGVhZnNBdXRvSGlkZTogZmFsc2UqLyB9KTtcclxuICAgICAgICAgICAgdGhpcy5wcmV2aWV3Q29udHJvbGxlciA9IG5ldyBHb3JkaWMuUHJldmlld3MuR1ByZXZpZXdDb250cm9sbGVyPElHU2V6bmFtRG9wbG5VZGFqZUR0b1dpdGhUYWJTZXR0aW5ncz4odGhpcy5lbGVtZW50LCB7XHJcbiAgICAgICAgICAgICAgICB1c2VTdWJ0YXNrOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHBhbmVsT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDIxN1wiLCAvL1JDIDMxMTAwMjE3IDogTsOhaGxlZCBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICAgICAgc2lkZTogXCJyaWdodFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGFiczogW3tcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAyMTdcIiwgLy9SQyAzMTEwMDIxNyA6IE7DoWhsZWQgZGV0YWlsdVxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUxvYWQ6ICh0YWIsIGR0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZWxtID0gJC5uZXdEaXYoKS5nY29udGVudChHb3JkaWMuVWNyLldlYkNsaWVudC5HRGV0YWlsRG9wbEhvZG5vdHksIHsgcGFyZW50Q29udGVudDogdGhpcywgcm9rOiB0aGF0LmN1cnJlbnRSb2ssIG1lc2ljOiB0aGF0LmN1cnJlbnRNb250aCB9KTsgLy9OdXRuZSBwcm8gc3ByYXZuZSBzcG9qZW5pIHMga29udGV4dGVtIGhsYXZuaWhvIGNvbnRlbnR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IHRhYlNldHRpbmdzID0gZHRvLnRhYlNldHRpbmdzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSBkdG8udGFiU2V0dGluZ3M7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuY29udGVudDxHb3JkaWMuVWNyLldlYkNsaWVudC5HRGV0YWlsRG9wbEhvZG5vdHk+KGVsbSkuaW5pdChkdG8pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0YWIpLmVtcHR5KCkuYXBwZW5kKGVsbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC4kZ3JpZC5nZ3JpZChcImZvY3VzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgICAgICAvLy8vIG5hc3RhdmVuaSBmaWx0cnVcclxuICAgICAgICAgICAgLy8vLyBpY29cclxuICAgICAgICAgICAgLy90aGF0LiRmaWx0ZXJQYW5lbC5maW5kRmllbGRzKFwiaWNvXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgaWNvOiB0aGF0LmVrb1BhcmFtcy5JY28gfSk7XHJcbiAgICAgICAgICAgIC8vLy91Y3NcclxuICAgICAgICAgICAgLy90aGF0LiRmaWx0ZXJQYW5lbC5maW5kRmllbGRzKFwidWNzXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyBpY286IHRoYXQuZWtvUGFyYW1zLkljbywgdWNzOiB0aGF0LmVrb1BhcmFtcy5VY3MgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW5pIHByaXN0dXBub3N0aSBha2NpIGRsZSBzdGF2dVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZW5hYmxlQWN0aW9ucygpOnZvaWQge1xyXG4gICAgICAgICAgICBsZXQgZGF0YTogR29yZGljLlVjci5XZWJDbGllbnQuR1VjclRyZWVEb3BsblVkYWplRHRvIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLiRncmlkLmdncmlkPEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdVY3JUcmVlRG9wbG5VZGFqZUR0bz4oXCJnZXRTZWxlY3Rpb25cIilbMF07XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3REZXRhaWw/LnVwZGF0ZSh7IGVuYWJsZWQ6ZGF0YT8ubGV2ZWwgPT09IDIgfSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIFZyYWNlbmkgaW5zdGFuY2UgZ3JpZHVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldEdyaWQoKTogSlF1ZXJ5PEhUTUxFbGVtZW50PiB8IG51bGwge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5lbGVtZW50LmZpbmQoXCIuZ2dyaWQuanMtdWNyRG9wbG5VZGFqZVwiKTtcclxuICAgICAgICByZXR1cm4gKGRhdGEubGVuZ3RoID09IDAgPyBudWxsIDogZGF0YSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAvKipcclxuICAgICAgICAqIGZ1bmN0aW9uIENyZWF0ZUZpbHRlclphbG96a2FcclxuICAgICAgICAqICAgICAgXHJcbiAgICAgICAgKiBPYmVjbmEgemFsb3prYVxyXG4gICAgICAgICogQHBhcmFtIHtHQ29udGVudH0gY29udGVudFxyXG4gICAgICAgICogQHJldHVybnMge2FueX1cclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgQ3JlYXRlRmlsdGVyWmFsb3prYSgpOiBhbnkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGZpbHRlckZvcm1EZWYgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyAvKm9wZW5lZDogdHJ1ZSwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzEsIEwtMy04LTEsIE0tMTItMTEtMSwgUy0xMi0xMS0xXCIsKi8gdGFiTGFiZWw6IFwianJlczozMDI1MDA1MlwiLFxyXG4gICAgICAgICAgICAgICAgaW5pdDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZEZpZWxkcyhcImljbyx1Y3NcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7IGljbzogdGhpcy5la29QYXJhbXMuSWNvLCB1Y3M6IHRoaXMuZWtvUGFyYW1zLlVjcyB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSAgLy9SQyAzMDI1MDA1MiA6IEZpbHRyXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuZGVuTWVzaWNSb2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGVubWVzaWNyb2tkcGhcIixcclxuICAgICAgICAgICAgICAgICAgICByYW5nZU1vbnRoOiB7IG1heFZhbHVlOiAxMywgbWluVmFsdWU6IDEsIHNlbGVjdGFibGVNYXhWYWx1ZTogMTMgfSxcclxuICAgICAgICAgICAgICAgICAgICAvL3dpZHRoOiB7IHllYXI6IDcsIG1vbnRoOjUsZGF5OjAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZHM6IFtcInJva1wiLCBcIm1lc2ljXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzAyNTAwNTNcIiwgLy9SQyAzMDI1MDA1MyA6IFJvayAtIG3Em3PDrWNcclxuICAgICAgICAgICAgICAgICAgICBla29EYXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHllYXJGaWVsZE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwicm9rPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRoaXMuZWtvUGFyYW1zLlJvaywgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoRmllbGRPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVzaWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntjaXNsb31cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pdGVtVGVtcGxhdGU6IFwie2Npc2xvfS4gIHtuYXpldn1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibWVzaWM9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IGlkOnRoaXMuY3VycmVudE1vbnRoIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtdLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dDogXCJzaW5nbGVWYWx1ZXNcIlxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMDI1MDA1NlwiIH0pLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCAvL1JDIDMwMjUwMDU2IDogScSMT1xyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zaWNvKCksXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImljb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIC8vIGRlZmF1bHRWYWx1ZTogeyBpY286IHRoaXMuZWtvUGFyYW1zLkljb30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogeyBpY286IHRoaXMuZWtvUGFyYW1zLkljb30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmljbz12YWx1ZS5pY29cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGFuZ2U6IChvYmosIHZhbHVlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBsZXQgZGF0YTogeyBpY286IHN0cmluZywgcm9rOiBudW1iZXIsIG1lc2ljOiBudW1iZXIsIHVjczogc3RyaW5nIH0gPSB0aGF0LiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoJ2dldEN1cnJlbnREYXRhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICh2YWx1ZXMgJiYgdmFsdWVzLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZihkYXRhLmljbylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuJGZpbHRlclBhbmVsLmZpbmRGaWVsZHMoXCJ1Y3NcIikuZ2ZpZWxkKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAodmFsdWVzLnZhbHVlLmljbyA9PSB0aGlzLmVrb1BhcmFtcy5JY28pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC4kZmlsdGVyUGFuZWwuZmluZEZpZWxkcyhcInVjc1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IGljbzogdGhhdC5la29QYXJhbXMuSWNvLCB1Y3M6IHRoYXQuZWtvUGFyYW1zLlVjcyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy90aGF0LiRmaWx0ZXJQYW5lbC5maW5kRmllbGRzKFwidWNzXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyBpY286IHRoaXMuZWtvUGFyYW1zLkljbywgdWNzOiB0aGlzLmVrb1BhcmFtcy5VY3MgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyBuYXN0YXZlbmkgZmlsdHJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyBpY29cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuJGZpbHRlclBhbmVsLmZpbmRGaWVsZHMoXCJpY29cIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBpY286IHRoYXQuZWtvUGFyYW1zLkljbyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy91Y3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuJGZpbHRlclBhbmVsLmZpbmRGaWVsZHMoXCJ1Y3NcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBpY286IHRoYXQuZWtvUGFyYW1zLkljbywgdWNzOiB0aGF0LmVrb1BhcmFtcy5VY3MgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8uZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7IGRyZDogcmVzdWx0IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL30sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9KSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAwNTVcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsLy9SQyAzMDI1MDA1NSA6IFVDU1xyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zdWNzKCksXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjc1wiLy8sIGRyb3Bkb3duOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIG1vZGVsOiBcIm1vZGVsLmljbz0+dmFsdWUuaWNvO21vZGVsLnVjcz12YWx1ZS51Y3NcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIGl0ZW1UZW1wbGF0ZTogXCJ7dWNzOnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlZmF1bHRWYWx1ZTogeyBpY286IHRoaXMuZWtvUGFyYW1zLkljbywgdWNzOiB0aGlzLmVrb1BhcmFtcy5VY3MgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IGljbzogdGhpcy5la29QYXJhbXMuSWNvLCB1Y3M6IHRoaXMuZWtvUGFyYW1zLlVjcyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAodmFsdWVzLCBvYmopID0+IHsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJpY29cIiwgXCJpY29cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWNvOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvL2xldCBpY28gPSB0aGF0LiRmaWx0ZXJQYW5lbC5maW5kRmllbGRzKFwiaWNvXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgbGV0IGRhdGE6IHsgaWNvOiBzdHJpbmcsIHJvazogbnVtYmVyLCBtZXNpYzogbnVtYmVyLCB1Y3M6IHN0cmluZyB9ID0gdGhhdC4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKCdnZXRDdXJyZW50RGF0YScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4gZGF0YS5pY287XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Jva19vZDogXCI8PSBcIiArdGhpcy5la29QYXJhbXMuUm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yb2tfZG86IFwiPj0gXCIgK3RoaXMuZWtvUGFyYW1zLlJvayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICA7ICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlckZvcm1EZWY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBmaWx0cm92YWNpaG8gcGFuZWx1XHJcbiAgICAgICAgICogQHBhcmFtIHRoYXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZpbHRlclBhbmVsKHRoYXQ6IHRoaXMpOnZvaWQge1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kZmlsdGVyUGFuZWwgPSAkLm5ld0RpdihcImpzLWZpbHRyXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmaWx0ZXJwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybXM6IFt0aGF0LkNyZWF0ZUZpbHRlclphbG96a2EoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVmlld01vZGU6IEZpbHRlclZpZXdNb2RlLlNpbXBsZSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZVVzZXJTZXR0aW5nczogXCJEZW55XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVMYXlvdXREZXNjcmlwdG9yOiBcIkw0TTNTMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Mb2FkQWZ0ZXJDcmVhdGVQYW5lbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBhcHBseTogZnVuY3Rpb24gKGV2ZW50LCBvYmopIHsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaWx0ZXJGb3JtLmFwcGx5XCIsIG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9nLnRyYWNlKFwiZmlsdGVyRm9ybS5hcHBseVwiLCBvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB1bG96ZW5pIGFrdHVhbG5pY2ggaG9kbm90IGZpbHRydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmN1cnJlbnRSb2sgPSBvYmouZmlsdGVyLnJvaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jdXJyZW50TW9udGggPSBvYmouZmlsdGVyLm1lc2ljO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gdGhhdC4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcucmVxdWVzdERhdGEvKjxHb3JkaWMuVWNyLldlYkNsaWVudC5HVWNyVHJlZURvcGxuVWRhamVEdG8+Ki8ob2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmxvYWREYXRhKG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLy5nZmlsdGVycGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgaGVscGVyQ3VzdG9taXplcjogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB2YXIgcG9sU29ydCA9IGRhdGEuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYS5uYW1lID49IGIubmFtZTsgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIHBvbFNvcnQ7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9LCAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyAgICBmb3JtczogW3RoYXQuQ3JlYXRlRmlsdGVyWmFsb3prYSgpXSxcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vZmlsdGVyVmlld01vZGU6IGRlZkZpbHRydSwvLyBGaWx0ZXJWaWV3TW9kZS5EZXRhaWwsICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vZmF2b3JpdGVzOiBbXCJpeHBcIiwgXCJpeHNfdHlwXCIsIFwidmxhc3RuaV9kb2tsYWR5XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgYXV0b0xvYWRBZnRlckNob3NlRmlsdGVyIDp0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgLy9zYXZlT3B0aW9uc0Zvcm06IFwiZWtvXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBmaWx0ZXJTdG9yYWdlU2VydmljZTogbmV3IEdvcmRpYy5HaW4uRmlsdGVyU3RvcmFnZVNlcnZpY2UuU3RvcmUoKSxcclxuICAgICAgICAgICAgICAgIC8vICAgIGZpbHRlclZpZXdNb2RlVXNlclNldHRpbmdzOiBcIkRlbnlcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vIDAxLjAzLjIwMjEgLSBURmVpa1xyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gTmFocmF6ZW7DrSBvYnNvbGV0ZSBwYXJhbWV0csWvLlxyXG4gICAgICAgICAgICAgICAgLy8gICAgYXV0b0xvYWRBZnRlckNyZWF0ZVBhbmVsOnRydWUsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvL3VzZXJEZWZhdWx0RmlsdGVyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZmlsdGVyVmlld01vZGU6IEZpbHRlclZpZXdNb2RlLlNpbXBsZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIGZhdm9yaXRlTGF5b3V0RGVzY3JpcHRvcjogXCJMNE0zUzFcIiwgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgYXBwbHk6IGZ1bmN0aW9uIChldmVudCwgb2JqKSB7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgY29uc29sZS5sb2coXCJmaWx0ZXJGb3JtLmFwcGx5XCIsIG9iaik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5sb2cudHJhY2UoXCJmaWx0ZXJGb3JtLmFwcGx5XCIsIG9iaik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gdWxvemVuaSBha3R1YWxuaWNoIGhvZG5vdCBmaWx0cnVcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LmN1cnJlbnRSb2sgPSBvYmouZmlsdGVyLnJvaztcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LmN1cnJlbnRNb250aCA9IG9iai5maWx0ZXIubWVzaWM7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdmFyIHZpZXcgPSB0aGF0LiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB2aWV3LnJlcXVlc3REYXRhLyo8R29yZGljLlVjci5XZWJDbGllbnQuR1VjclRyZWVEb3BsblVkYWplRHRvPiovKG9iaik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy90aGF0LmxvYWREYXRhKG9iaik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvL30pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICogWmppc3RlbmkgdG9wb2xvZ2llXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGdldFRvcG9sb2dpZSgpOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVnlrYXpUb3BvbG9naWVEdG8ge1xyXG4gICAgICAgICAgICBsZXQgZmlsdGVyOiBhbnkgPSB0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoJ2dldENvbmZpcm1lZERhdGEnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgaWNvOiBmaWx0ZXIuaWNvLCBtZXNpYzogZmlsdGVyLm1lc2ljLCByb2s6IGZpbHRlci5yb2ssIHVjczogZmlsdGVyLnVjcyB9O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQcmV2b2QgZm9ybWF0dSB0ZXh0dSBuYSBpZCAoeHh4X2lkKVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBzcmNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldElkKHNyYzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgdmFyIHBvcyA9IHNyYy5pbmRleE9mKFwiX1wiKTtcclxuICAgICAgICAgICAgaWYgKHBvcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzcmMuc3Vic3RyaW5nKHBvcyArIDEpO1xyXG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gc3JjLnN1YnN0cihwb3MrMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNyYztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hY3RlbmkgY2FzdGkgdnlrYXp1XHJcbiAgICAgICAgICogQHBhcmFtIGZpbHRyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbG9hZENhc3RpKGZpbHRyOiBHb3JkaWMuVWNyLldlYkNsaWVudC5HVWNyVHJlZURvcGxuVWRhamVEdG8pOiBKUXVlcnlQcm9taXNlPEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdVY3JUcmVlRG9wbG5VZGFqZUR0bz4ge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQuY2xvc2VkKSByZXR1cm4gZGVmLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGF0YTogR29yZGljLlVjci5XZWJDbGllbnQuR1VjclRyZWVEb3BsblVkYWplRHRvW10gPSBbXVxyXG4gICAgICAgICAgICB2YXIgcmVzdWx0RGF0YTogSlF1ZXJ5UHJvbWlzZTxVY3QuSW50ZXJmYWNlLkdWeWtzdmt6RHRvW10+O1xyXG4gICAgICAgICAgICBpZiAoZmlsdHIubGV2ZWwgPT0gMClcclxuICAgICAgICAgICAgICAgIHJlc3VsdERhdGEgPSB0aGF0LmlzbC5VY3JWeWthekFkbS5saXN0Q2FzdGlWeWthenUoeyBpeHNfdmt6OiBmaWx0ci5pZCBhcyBhbnksIHJvazogdGhhdC5jdXJyZW50Um9rLCBtZXNpYzogdGhhdC5jdXJyZW50TW9udGggfSkuZ2V0RGF0YSgpO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXN1bHREYXRhID0gdGhhdC5pc2wuVWNyVnlrYXpBZG0ubGlzdFJhZGt1VnlrYXp1KHsgaXhzX3ZrejogZmlsdHIubWFpbklkIGFzIGFueSwga29kX2Nhc3Rfdmt6OiB0aGF0LmdldElkKGZpbHRyLmlkIGFzIGFueSkgYXMgYW55LCByb2s6IHRoYXQuY3VycmVudFJvaywgbWVzaWM6IHRoYXQuY3VycmVudE1vbnRofSkuZ2V0RGF0YSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXN1bHREYXRhXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRyLmxldmVsID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnB1c2goeyBpZDogZmlsdHIuaWQrXCJfXCIrcmVzdWx0W2ldLml4c192a3osIGtvZDogXCJcIiwgcG96bjogcmVzdWx0W2ldLnBvem5hbWthLCBwYXJlbnRJZDogZmlsdHIuaWQsIHZ5a2F6OiBcIiAgXCIgKyByZXN1bHRbaV0ubmF6ZXYsIGxldmVsOiAxLCBtYWluSWQ6IGZpbHRyLmlkIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXM6IFVjdC5JbnRlcmZhY2UuR1Z5a2R2a2REdG8gPSByZXN1bHRbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIlwiICsgZmlsdHIubWFpbklkICsgZmlsdHIuaWQ/LnJlcGxhY2UoXCJfXCIsXCJcIikgKyBcIl9cIiArIHJlcy5peHNfdmt6LCBrb2Q6IFwiXCIsIHBvem46IHJlcy5wb3puYW1rYSwgcGFyZW50SWQ6IGZpbHRyLmlkLCB2eWthejogXCIgICAgICBcIiArIHJlcy5uYXpldiwgbGV2ZWw6IDIsIG1haW5JZDogZmlsdHIubWFpbklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGthX2R1OiByZXMuZGVsa2FfZHUsIGRlbGthX3ZhejogcmVzLmRlbGthX3ZheiwgZGVsa2FfdmF6MjogcmVzLmRlbGthX3ZhejIsIHBhdHRlcm5fZHU6IHJlcy5wYXR0ZXJuX2R1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hemV2X3ZhejogcmVzLm5hemV2X3ZheiwgbmF6ZXZfdmF6MjogcmVzLm5hemV2X3ZhejIsIHBhdHRlcm5fdmF6OiByZXMucGF0dGVybl92YXosIHBhdHRlcm5fdmF6MjogcmVzLnBhdHRlcm5fdmF6MixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3puYW1rYV92YXo6IHJlcy5wb3puYW1rYV92YXosIHBvem5hbWthX3ZhejI6IHJlcy5wb3puYW1rYV92YXoyLCBwcml6X29wYWs6IHJlcy5wcml6X29wYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgTmFjdGVuaSBkYXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBsb2FkRGF0YShmaWx0cj86YW55KTogSlF1ZXJ5UHJvbWlzZTxHb3JkaWMuVWNyLldlYkNsaWVudC5HVWNyVHJlZURvcGxuVWRhamVEdG8+IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWx0ci5sZXZlbCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgLy9pZiAoZmlsdHIubGV2ZWwgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5sb2FkQ2FzdGkoZmlsdHIpO1xyXG4gICAgICAgICAgICAgICAgLy9lbHNlIGlmIChmaWx0ci5sZXZlbCA9PSAxKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIHRoYXQubG9hZFJhZGt1VnlrYXp1KGZpbHRyKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5jbG9zZWQpIHJldHVybiBkZWYucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkYXRhOiBHb3JkaWMuVWNyLldlYkNsaWVudC5HVWNyVHJlZURvcGxuVWRhamVEdG9bXSA9W11cclxuXHJcbiAgICAgICAgICAgIHZhciBteURlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgaWYgKHRoYXQuZmlyc3RMb2FkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpcnN0TG9hZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbXlEZWYucmVzb2x2ZSh7ZmlsdGVyOnsgcm9rOiB0aGlzLmVrb1BhcmFtcy5Sb2ssIG1lc2ljOiB0aGlzLmN1cnJlbnRNb250aCB9fSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy92YXIgcmVzdWx0MSA9IHRoaXMuZ2V0RmlsdGVyKCk7XHJcbiAgICAgICAgICAgICAgICAvL215RGVmID0gcmVzdWx0MSBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICBteURlZi5yZXNvbHZlKGZpbHRyKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBteURlZlxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZmlsdGVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuZmlsdGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByb2ttZXMgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQucm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJva21lcyA9IFwiXCIgKyByZXN1bHQucm9rLnRvU3RyaW5nKCk7IFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJva21lcyA9IFwiXCIgKyB0aGF0LmVrb1BhcmFtcy5Sb2s/LnRvU3RyaW5nKCk7IFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtZXNpYyA9IHRoYXQuY3VycmVudE1vbnRoLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5tZXNpYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNpYyA9IFwiXCIgKyByZXN1bHQubWVzaWMudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWVzaWMubGVuZ3RoID09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc2ljID0gXCIwXCIgKyBtZXNpYztcclxuICAgICAgICAgICAgICAgICAgICByb2ttZXMgKz0gIG1lc2ljO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWx0ciA9IHsgcHJpel9kdTogMSwgYWt0aXZpdGE6IDEwMCwgcGxhdG5vc3Q6IHJva21lcyB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb2ttZXMgIT09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRyID0gJC5leHRlbmQoZmlsdHIsZmlsdHIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlVjclZ5a2F6QWRtLmxpc3QoeyBmaWx0ZXJzOiBmaWx0ciB9KS5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnB1c2goeyBpZDogcmVzdWx0W2ldLml4c192a3osIGtvZDogcmVzdWx0W2ldLmtvZF92a3osIHBvem46IHJlc3VsdFtpXS5wb3puYW1rYSwgcGFyZW50SWQ6IG51bGwsIHZ5a2F6OiByZXN1bHRbaV0ubmF6ZXYsIGxldmVsOjAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICB0eXBlIElHU2V6bmFtRG9wbG5VZGFqZUR0b1dpdGhUYWJTZXR0aW5ncyA9IElHRGV0YWlsRG9wbEhvZG5vdHlPcHRpb25zIDtcclxuXHJcblxyXG59Il19
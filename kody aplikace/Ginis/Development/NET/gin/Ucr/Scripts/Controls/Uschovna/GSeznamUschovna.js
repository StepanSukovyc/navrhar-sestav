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
            let GSeznamUschovna = class GSeznamUschovna extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.firstLoad = true;
                    // Editovatelny gridu
                    //private editGrid: JQuery;
                    //private myForm: Gordic.Forms.Form;
                    // nastaveni id a titulku okna
                    this.title = "jres:30250586"; //RC 30250586 : Úschovna záznamů
                }
                onContentReady() {
                    var that = this;
                    that.currentRok = that.ekoParams.Rok;
                    //this.setBreadcrumbs([
                    //    { action: new GAction({ name: "actBack", caption: this.title, run: function () { that.tryCloseAllChildContents(); } }) }
                    //]);
                    // vytvoreni fitru panelu
                    //this.createFilterPanel(this); 
                    let treeProcessor = new Gordic.Data.Tree(Gordic.Data.Tree.parentIdOrganizer("parentId"), {
                        filterKeepStructure: true,
                        //defaultState: "closed",
                        //defaultState: "unknown",// (m) => { return m.data.nodeState as DataStructureState || "unknown"; },
                        defaultState: (m) => {
                            //return "unknown";
                            if (m.data.level === 2) {
                                // posledni uroven bude jiz otevrena
                                return "unknown";
                            }
                            else
                                // nutno docist
                                return "closed";
                        },
                        //dynamicRequest: (data) => {                        
                        //    if (data.level === 0) {
                        //    }
                        //    return data;
                        //}
                    });
                    let provider = new Gordic.Data.Provider((req) => {
                        return that.loadData(req);
                    });
                    let view = new Gordic.Data.View([], { key: "primaryKey", processors: { tree: treeProcessor, provider: provider } });
                    this.$grid = $.newDiv().appendTo(this.element)
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
                            //that.clearControls();
                            if (rows.length > 0 && rows[0].level === 2) {
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
                                    //okno.on("closed", function (a, b) {
                                    //    debugger;
                                    //});
                                    //okno.on("contentclose", function (a, b) {
                                    //    debugger;
                                    //});
                                }
                                else
                                    ctx.cellInfo.meta.structure.interaction();
                            }
                        }),
                        //searchColumns: ["kategorie", "typ"],
                        multi: false,
                        //#region Definice sloupcu
                        columns: new Gordic.Data.GridFormat()
                            .addStructureColumn({
                            name: "kategorie", caption: "",
                            width: 350,
                            structureLead: true /*customClass: "ui-disabled"*/, /*sysColumn: true,*/ /* forced:true,*/
                        })
                            .addTextColumn({
                            name: "typ",
                            caption: "", //RC 30250058 : Kód
                            //width: 150
                        })
                        //.addTextColumn({
                        //    name: "poz",
                        //    caption: "jres:30250059", //RC 30250059 : Poznámka
                        //    //width: 250
                        //})
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
                    //this.loadData().then
                    //    ((result)=>{
                    //        that.$grid.ggrid("setData", new Gordic.Data.View(result || [], {
                    //            key: "primaryKey",
                    //            processors: {
                    //                tree: new Gordic.Data.Tree(Gordic.Data.Tree.parentIdOrganizer("parentId"), { defaultState: "open" }),
                    //            }
                    //        }))
                    //    });
                    view.requestData();
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
                            initialValue: this.ekoParams.Rok
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
                    }));
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
                            var view = that.$grid.ggrid("getView");
                            view.requestData /*<Gordic.Ucr.WebClient.GUcrTreeDoplnUdajeDto>*/(obj);
                            //that.loadData(obj);
                        }
                    });
                }
                /*
                 * Zjisteni topologie
                 *
                 * */
                getTopologie() {
                    //let filter: any = this.$filterPanel.gfilterpanel('getConfirmedData');
                    //return { ico: filter.ico, mesic: filter.mesic, rok: filter.rok, ucs: filter.ucs };
                    return {};
                }
                /**
                 * Prevod formatu textu na id (xxx_id)
                 *
                 * @param src
                 */
                getId(src) {
                    var pos = src.indexOf("_");
                    if (pos > 0) {
                        //return src.substr(pos + 1);
                        return src.substring(pos + 1);
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
                    debugger;
                    let data = [];
                    var resultData;
                    if (filtr.level == 0)
                        resultData = that.isl.UcrUschovna.list().getData();
                    else {
                        resultData = that.isl.UcrUschovna.list().getData();
                    }
                    resultData
                        .then(function (result) {
                        for (var i = 0; i < result.length; i++) {
                            if (filtr.level == 0) {
                                that.isl.UcrUschovna.list().getData();
                                result.forEach((item) => {
                                    let primaryKey = "_" + item.ktg_typ;
                                    data.push({
                                        primaryKey: primaryKey,
                                        kategorie: item.ktg_typ_txt,
                                        parentId: null,
                                        level: 1,
                                        mainId: "_" + item.ktg_typ,
                                        ixs_typ: "",
                                        ktg_typ: item.ktg_typ
                                    });
                                    that.addSubKategorie(data, primaryKey, item.SubKategorie);
                                    def.resolve(data);
                                });
                            }
                            else {
                                let res = result[i];
                                data.push({
                                    primaryKey: "_" + filtr.mainId + filtr.primaryKey?.replace("_", "") + "_" + res.ixs_vkz, parentId: filtr.primaryKey, level: 2, mainId: filtr.mainId,
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
                        return that.loadCasti(filtr);
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
                        that.isl.UcrUschovna.list().getData()
                            .then(function (result) {
                            result.forEach((item) => {
                                let primaryKey = "_" + item.ktg_typ;
                                data.push({
                                    primaryKey: primaryKey,
                                    kategorie: item.ktg_typ_txt,
                                    parentId: null,
                                    level: 1,
                                    mainId: "_" + item.ktg_typ,
                                    ixs_typ: "",
                                    ktg_typ: item.ktg_typ
                                });
                                that.addSubKategorie(data, primaryKey, item.SubKategorie);
                            });
                            return def.resolve(data);
                        });
                        //                });
                    });
                    return def.promise();
                }
                /**
                 * Doplneni subkategorie
                 * @param rootItems
                 * @param primaryKey
                 * @param subkategorie
                 */
                addSubKategorie(rootItems, primaryKey, subkategorie) {
                    if (typeof subkategorie !== "undefined" && subkategorie != null && subkategorie.length > 0) {
                        subkategorie.forEach((newItem) => {
                            rootItems.push({
                                level: 2,
                                primaryKey: primaryKey + "_" + newItem.ixs_typ,
                                mainId: primaryKey,
                                parentId: primaryKey,
                                kategorie: newItem.nazev,
                                ixs_typ: newItem.ixs_typ,
                                ktg_typ: newItem.ktg_typ
                            });
                        });
                    }
                }
            };
            GSeznamUschovna = __decorate([
                Decorators.gcontent
            ], GSeznamUschovna);
            WebClient.GSeznamUschovna = GSeznamUschovna;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbVVzY2hvdm5hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbVVzY2hvdm5hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0EwZ0JmO0FBMWdCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EwZ0JuQjtJQTFnQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTBnQjdCO1FBMWdCb0IsV0FBQSxTQUFTO1lBQzFCOzs7OztjQUtFO1lBS0YsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxPQUFBLFlBQVk7Z0JBQWpEOztvQkFNWSxjQUFTLEdBQUcsSUFBSSxDQUFDO29CQVF6QixxQkFBcUI7b0JBQ3JCLDJCQUEyQjtvQkFDM0Isb0NBQW9DO29CQUNwQyw4QkFBOEI7b0JBQzlCLFVBQUssR0FBRyxlQUFlLENBQUMsQ0FBQyxnQ0FBZ0M7Z0JBeWU3RCxDQUFDO2dCQXhlRyxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUksQ0FBQztvQkFDdEMsdUJBQXVCO29CQUN2Qiw4SEFBOEg7b0JBQzlILEtBQUs7b0JBQ0wseUJBQXlCO29CQUN6QixnQ0FBZ0M7b0JBR2hDLElBQUksYUFBYSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxFQUM5Qzt3QkFDSSxtQkFBbUIsRUFBRSxJQUFJO3dCQUN6Qix5QkFBeUI7d0JBQ3pCLG9HQUFvRzt3QkFDcEcsWUFBWSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7NEJBQ2hCLG1CQUFtQjs0QkFDbkIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUUsQ0FBQztnQ0FDckIsb0NBQW9D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QUksSUFBSSxJQUFJLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7d0JBQ3pGLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTs0QkFDN0IsU0FBUyxDQUFDLElBQUksQ0FBQztnQ0FDWCxLQUFLLEVBQUUsQ0FBQztnQ0FDUixVQUFVLEVBQUUsVUFBVSxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTztnQ0FDOUMsTUFBTSxFQUFFLFVBQVU7Z0NBQ2xCLFFBQVEsRUFBRSxVQUFVO2dDQUNwQixTQUFTLEVBQUUsT0FBTyxDQUFDLEtBQUs7Z0NBQ3hCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztnQ0FDeEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPOzZCQUczQixDQUFDLENBQUE7d0JBQ04sQ0FBQyxDQUFDLENBQUM7b0JBRVAsQ0FBQztnQkFFTCxDQUFDO2FBRUosQ0FBQTtZQTNmWSxlQUFlO2dCQUQzQixVQUFVLENBQUMsUUFBUTtlQUNQLGVBQWUsQ0EyZjNCO1lBM2ZZLHlCQUFlLGtCQTJmM0IsQ0FBQTtRQUlMLENBQUMsRUExZ0JvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUEwZ0I3QjtJQUFELENBQUMsRUExZ0JnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEwZ0JuQjtBQUFELENBQUMsRUExZ0JTLE1BQU0sS0FBTixNQUFNLFFBMGdCZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIFNlem5hbSBwb3phZGF2a3VcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciB0a2FyZXNcclxuICAgICAqIEBzaW5jZSA0ODQuMS4wLjY5XHJcbiAgICAqL1xyXG5cclxuXHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU2V6bmFtVXNjaG92bmEgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG5cclxuICAgICAgICAvLyBmaWx0ZXIgcGFuZWxcclxuICAgICAgICBwcml2YXRlICRmaWx0ZXJQYW5lbDogSlF1ZXJ5O1xyXG4gICAgICAgIHB1YmxpYyAkZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjsgICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgZWtvUGFyYW1zOiBHb3JkaWMuVWNyLldlYkNsaWVudC5HRWtvUGFyYW1zRHRvO1xyXG4gICAgICAgIHByaXZhdGUgZmlyc3RMb2FkID0gdHJ1ZTtcclxuICAgICAgICBwcml2YXRlIGN1cnJlbnRNb250aDogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgY3VycmVudFJvazogbnVtYmVyO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBteVBhbmVsOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIC8vcHJpdmF0ZSBlZGl0Q29sczogR29yZGljLlVjdC5JbnRlcmZhY2UuR1Z5a0NvbFZhbHVlRHRvW107XHJcbiAgICAgICAgLy9wcml2YXRlIG15R3JpZEZvcm1hdDogR29yZGljLkRhdGEuR3JpZEZvcm1hdDtcclxuICAgICAgICAvLyBwcmV2aWV3XHJcbiAgICAgICAgcHJpdmF0ZSBwcmV2aWV3Q29udHJvbGxlcjogR29yZGljLlByZXZpZXdzLkdQcmV2aWV3Q29udHJvbGxlcjxJR1Nlem5hbURvcGxuVWRhamVEdG9XaXRoVGFiU2V0dGluZ3M+O1xyXG4gICAgICAgIC8vIEVkaXRvdmF0ZWxueSBncmlkdVxyXG4gICAgICAgIC8vcHJpdmF0ZSBlZGl0R3JpZDogSlF1ZXJ5O1xyXG4gICAgICAgIC8vcHJpdmF0ZSBteUZvcm06IEdvcmRpYy5Gb3Jtcy5Gb3JtO1xyXG4gICAgICAgIC8vIG5hc3RhdmVuaSBpZCBhIHRpdHVsa3Ugb2tuYVxyXG4gICAgICAgIHRpdGxlID0gXCJqcmVzOjMwMjUwNTg2XCI7IC8vUkMgMzAyNTA1ODYgOiDDmnNjaG92bmEgesOhem5hbcWvXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuY3VycmVudFJvayA9IHRoYXQuZWtvUGFyYW1zLlJvayE7XHJcbiAgICAgICAgICAgIC8vdGhpcy5zZXRCcmVhZGNydW1icyhbXHJcbiAgICAgICAgICAgIC8vICAgIHsgYWN0aW9uOiBuZXcgR0FjdGlvbih7IG5hbWU6IFwiYWN0QmFja1wiLCBjYXB0aW9uOiB0aGlzLnRpdGxlLCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC50cnlDbG9zZUFsbENoaWxkQ29udGVudHMoKTsgfSB9KSB9XHJcbiAgICAgICAgICAgIC8vXSk7XHJcbiAgICAgICAgICAgIC8vIHZ5dHZvcmVuaSBmaXRydSBwYW5lbHVcclxuICAgICAgICAgICAgLy90aGlzLmNyZWF0ZUZpbHRlclBhbmVsKHRoaXMpOyBcclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgdHJlZVByb2Nlc3NvciA9IG5ldyBHb3JkaWMuRGF0YS5UcmVlPEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdVY3JUcmVlVXNjaG92bmFEdG8+IChcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5EYXRhLlRyZWUucGFyZW50SWRPcmdhbml6ZXIoXCJwYXJlbnRJZFwiKSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJLZWVwU3RydWN0dXJlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVmYXVsdFN0YXRlOiBcImNsb3NlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVmYXVsdFN0YXRlOiBcInVua25vd25cIiwvLyAobSkgPT4geyByZXR1cm4gbS5kYXRhLm5vZGVTdGF0ZSBhcyBEYXRhU3RydWN0dXJlU3RhdGUgfHwgXCJ1bmtub3duXCI7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFN0YXRlOiAobSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBcInVua25vd25cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG0uZGF0YS5sZXZlbCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9zbGVkbmkgdXJvdmVuIGJ1ZGUgaml6IG90ZXZyZW5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ1bmtub3duXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbnV0bm8gZG9jaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJjbG9zZWRcIjtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZHluYW1pY1JlcXVlc3Q6IChkYXRhKSA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKGRhdGEubGV2ZWwgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgbGV0IHByb3ZpZGVyID0gbmV3IEdvcmRpYy5EYXRhLlByb3ZpZGVyPEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdVY3JUcmVlVXNjaG92bmFEdG8sIEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdVY3JUcmVlVXNjaG92bmFEdG8+KChyZXEpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmxvYWREYXRhKHJlcSk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXc8R29yZGljLlVjci5XZWJDbGllbnQuR1VjclRyZWVVc2Nob3ZuYUR0bz4oW10sIHsga2V5OiBcInByaW1hcnlLZXlcIiwgcHJvY2Vzc29yczogeyB0cmVlOiB0cmVlUHJvY2Vzc29yLCBwcm92aWRlcjogcHJvdmlkZXIgfSB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWQgPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVsZWdhdCBwcm8gem1lbnUgc3R5bHUgcmFka3UgcHJpIHZ5a3Jlc2xvdmFuaVxyXG4gICAgICAgICAgICAgICAgICAgIHJvd3NDbGFzczogZnVuY3Rpb24gKG1ldGFyb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0eWwgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGFyb3cuZGF0YS5sZXZlbCA9PT0gMCApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsID0gXCJ0cmVlX3Jvb3RcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobWV0YXJvdy5kYXRhLmxldmVsID09PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bCA9IFwidHJlZV9pdGVtXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1ldGFyb3cuZGF0YS5sZXZlbCA9PT0gMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWwgPSBcInRyZWVfaXRlbV9sYXN0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWwgPSBcInRyZWVfcm9vdFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3R5bDtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogZnVuY3Rpb24gKGV2LCBpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3dzID0gaW5mby5nZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmNsZWFyQ29udHJvbHMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvd3MubGVuZ3RoID4gMCAmJiByb3dzWzBdLmxldmVsID09PSAyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5lbmFibGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLnNob3coeyBjdXJyZW50Um93OiByb3dzWzBdLCB2aWV3TW9kZTogdHJ1ZSwgdG9wb2xvZ2llOiB0aGF0LmdldFRvcG9sb2dpZSgpLCByb2s6IHRoYXQuY3VycmVudFJvaywgbWVzaWM6IHRoYXQuY3VycmVudE1vbnRoIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5lbmFibGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5jbGVhckNvbnRyb2xzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhOiBHb3JkaWMuVWNyLldlYkNsaWVudC5HVWNyVHJlZURvcGxuVWRhamVEdG8gfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LmNlbGxJbmZvICYmIGN0eC5jZWxsSW5mby5kYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBjdHguY2VsbEluZm8uZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gdGhhdC4kZ3JpZC5nZ3JpZDxHb3JkaWMuVWNyLldlYkNsaWVudC5HVWNyVHJlZURvcGxuVWRhamVEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGE/LmxldmVsID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy96b2JyYXplbmkgZGV0YWlsdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b3BvID0gdGhhdC5nZXRUb3BvbG9naWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWQgPSBcIkRvcGxfXCIgKyAgZGF0YS5pZCArIFwiI1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBva25vID0gdGhhdC5uYXZpZ2F0ZShHb3JkaWMuVWNyLldlYkNsaWVudC5HRGV0YWlsRG9wbEhvZG5vdHksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGN1cnJlbnRSb3c6IGRhdGEsIHRvcG9sb2dpZTogdG9wbywgdmlld01vZGU6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgcm9rOiB0aGF0LmN1cnJlbnRSb2ssIG1lc2ljOiB0aGF0LmN1cnJlbnRNb250aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VPbkVzY2FwZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlOiBmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9rbm8ub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChldiBhcyBhbnkpLnJldHVyblZhbHVlICYmIChldiBhcyBhbnkpLnJldHVyblZhbHVlLnJlZnJlc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlZnJlc2ggZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gdGhhdC4kZ3JpZC5nZ3JpZDxHb3JkaWMuVWNyLldlYkNsaWVudC5HVWNyVHJlZURvcGxuVWRhamVEdG8+KFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ICYmIHJvdy5sZXZlbCA9PT0gMikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLmVuYWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLnNob3coeyBjdXJyZW50Um93OiByb3csIHZpZXdNb2RlOiB0cnVlLCB0b3BvbG9naWU6IHRoYXQuZ2V0VG9wb2xvZ2llKCksIHJvazogdGhhdC5jdXJyZW50Um9rLCBtZXNpYzogdGhhdC5jdXJyZW50TW9udGggfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLmVuYWJsZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuJGdyaWQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL29rbm8ub24oXCJjbG9zZWRcIiwgZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vb2tuby5vbihcImNvbnRlbnRjbG9zZVwiLCBmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHguY2VsbEluZm8ubWV0YS5zdHJ1Y3R1cmUuaW50ZXJhY3Rpb24oKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogW1wia2F0ZWdvcmllXCIsIFwidHlwXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyNyZWdpb24gRGVmaW5pY2Ugc2xvdXBjdVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWNyLldlYkNsaWVudC5HVWNyVHJlZVVzY2hvdm5hRHRvPigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTdHJ1Y3R1cmVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrYXRlZ29yaWVcIiwgY2FwdGlvbjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJ1Y3R1cmVMZWFkOiB0cnVlIC8qY3VzdG9tQ2xhc3M6IFwidWktZGlzYWJsZWRcIiovLCAvKnN5c0NvbHVtbjogdHJ1ZSwqLy8qIGZvcmNlZDp0cnVlLCovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiXCIsICAvL1JDIDMwMjUwMDU4IDogS8OzZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy93aWR0aDogMTUwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcInBvelwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwNTlcIiwgLy9SQyAzMDI1MDA1OSA6IFBvem7DoW1rYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvL3dpZHRoOiAyNTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99KVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBQcmV2aWV3IHYgc2lkZWJhcnVcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5nc2lkZWJhcihcIm9wdGlvblwiLCBcInJpZ2h0XCIsIHsgdXNlclNldHRpbmdzOiB0aGlzLnVzZXJTZXR0aW5ncyEsIHdpZHRoOiA1MDAsIHZpc2libGU6IHRydWUsIHBpbm5lZDogdHJ1ZSAvKiBwaW5uZWQ6IGZhbHNlLCBsZWFmc0F1dG9IaWRlOiBmYWxzZSovIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnByZXZpZXdDb250cm9sbGVyID0gbmV3IEdvcmRpYy5QcmV2aWV3cy5HUHJldmlld0NvbnRyb2xsZXI8SUdTZXpuYW1Eb3BsblVkYWplRHRvV2l0aFRhYlNldHRpbmdzPih0aGlzLmVsZW1lbnQsIHtcclxuICAgICAgICAgICAgICAgIHVzZVN1YnRhc2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcGFuZWxPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjE3XCIsIC8vUkMgMzExMDAyMTcgOiBOw6FobGVkIGRldGFpbHVcclxuICAgICAgICAgICAgICAgICAgICBzaWRlOiBcInJpZ2h0XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0YWJzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDIxN1wiLCAvL1JDIDMxMTAwMjE3IDogTsOhaGxlZCBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tTG9hZDogKHRhYiwgZHRvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbG0gPSAkLm5ld0RpdigpLmdjb250ZW50KEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdEZXRhaWxEb3BsSG9kbm90eSwgeyBwYXJlbnRDb250ZW50OiB0aGlzLCByb2s6IHRoYXQuY3VycmVudFJvaywgbWVzaWM6IHRoYXQuY3VycmVudE1vbnRoIH0pOyAvL051dG5lIHBybyBzcHJhdm5lIHNwb2plbmkgcyBrb250ZXh0ZW0gaGxhdm5paG8gY29udGVudHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgdGFiU2V0dGluZ3MgPSBkdG8udGFiU2V0dGluZ3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVsZXRlIGR0by50YWJTZXR0aW5nczsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5jb250ZW50PEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdEZXRhaWxEb3BsSG9kbm90eT4oZWxtKS5pbml0KGR0byk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRhYikuZW1wdHkoKS5hcHBlbmQoZWxtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LiRncmlkLmdncmlkKFwiZm9jdXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgICAgIC8vLy8gbmFzdGF2ZW5pIGZpbHRydVxyXG4gICAgICAgICAgICAvLy8vIGljb1xyXG4gICAgICAgICAgICAvL3RoYXQuJGZpbHRlclBhbmVsLmZpbmRGaWVsZHMoXCJpY29cIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBpY286IHRoYXQuZWtvUGFyYW1zLkljbyB9KTtcclxuICAgICAgICAgICAgLy8vL3Vjc1xyXG4gICAgICAgICAgICAvL3RoYXQuJGZpbHRlclBhbmVsLmZpbmRGaWVsZHMoXCJ1Y3NcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7IGljbzogdGhhdC5la29QYXJhbXMuSWNvLCB1Y3M6IHRoYXQuZWtvUGFyYW1zLlVjcyB9KTtcclxuICAgICAgICAgICAgLy90aGlzLmxvYWREYXRhKCkudGhlblxyXG4gICAgICAgICAgICAvLyAgICAoKHJlc3VsdCk9PntcclxuICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuJGdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIG5ldyBHb3JkaWMuRGF0YS5WaWV3KHJlc3VsdCB8fCBbXSwge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGtleTogXCJwcmltYXJ5S2V5XCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgcHJvY2Vzc29yczoge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB0cmVlOiBuZXcgR29yZGljLkRhdGEuVHJlZShHb3JkaWMuRGF0YS5UcmVlLnBhcmVudElkT3JnYW5pemVyKFwicGFyZW50SWRcIiksIHsgZGVmYXVsdFN0YXRlOiBcIm9wZW5cIiB9KSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9KSlcclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgIHZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBmdW5jdGlvbiBDcmVhdGVGaWx0ZXJaYWxvemthXHJcbiAgICAgICAgKiAgICAgIFxyXG4gICAgICAgICogT2JlY25hIHphbG96a2FcclxuICAgICAgICAqIEBwYXJhbSB7R0NvbnRlbnR9IGNvbnRlbnRcclxuICAgICAgICAqIEByZXR1cm5zIHthbnl9XHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIENyZWF0ZUZpbHRlclphbG96a2EoKTogYW55IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBmaWx0ZXJGb3JtRGVmID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgLypvcGVuZWQ6IHRydWUsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxLCBMLTMtOC0xLCBNLTEyLTExLTEsIFMtMTItMTEtMVwiLCovIHRhYkxhYmVsOiBcImpyZXM6MzAyNTAwNTJcIixcclxuICAgICAgICAgICAgICAgIGluaXQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmRGaWVsZHMoXCJpY28sdWNzXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyBpY286IHRoaXMuZWtvUGFyYW1zLkljbywgdWNzOiB0aGlzLmVrb1BhcmFtcy5VY3MgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkgIC8vUkMgMzAyNTAwNTIgOiBGaWx0clxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmRlbk1lc2ljUm9rKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRlbm1lc2ljcm9rZHBoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2VNb250aDogeyBtYXhWYWx1ZTogMTMsIG1pblZhbHVlOiAxLCBzZWxlY3RhYmxlTWF4VmFsdWU6IDEzIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy93aWR0aDogeyB5ZWFyOiA3LCBtb250aDo1LGRheTowIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzOiBbXCJyb2tcIiwgXCJtZXNpY1wiXSxcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMwMjUwMDUzXCIsIC8vUkMgMzAyNTAwNTMgOiBSb2sgLSBtxJtzw61jXHJcbiAgICAgICAgICAgICAgICAgICAgZWtvRGF0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB5ZWFyRmllbGRPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInJvaz12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGlzLmVrb1BhcmFtcy5Sb2tcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoRmllbGRPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVzaWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntjaXNsb31cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pdGVtVGVtcGxhdGU6IFwie2Npc2xvfS4gIHtuYXpldn1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibWVzaWM9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IGlkOnRoaXMuY3VycmVudE1vbnRoIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtdLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dDogXCJzaW5nbGVWYWx1ZXNcIlxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMjUwMDU2XCIgfSkuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIC8vUkMgMzAyNTAwNTYgOiBJxIxPXHJcbiAgICAgICAgICAgICAgICAvLyAgICBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc2ljbygpLFxyXG4gICAgICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIG5hbWU6IFwiaWNvXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAvLyBkZWZhdWx0VmFsdWU6IHsgaWNvOiB0aGlzLmVrb1BhcmFtcy5JY299LFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGluaXRpYWxWYWx1ZTogeyBpY286IHRoaXMuZWtvUGFyYW1zLkljb30sXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgbW9kZWw6IFwibW9kZWwuaWNvPXZhbHVlLmljb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vICAgIH0pICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRSb3coXCJqcmVzOjMwMjUwMDU1XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLC8vUkMgMzAyNTAwNTUgOiBVQ1NcclxuICAgICAgICAgICAgICAgIC8vICAgIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zdWNzKCksXHJcbiAgICAgICAgICAgICAgICAvLyAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJ1Y3NcIi8vLCBkcm9wZG93bjogZmFsc2VcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAsIG1vZGVsOiBcIm1vZGVsLmljbz0+dmFsdWUuaWNvO21vZGVsLnVjcz12YWx1ZS51Y3NcIlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICwgaXRlbVRlbXBsYXRlOiBcInt1Y3M6dHJpbTplbmNvZGV9XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy9kZWZhdWx0VmFsdWU6IHsgaWNvOiB0aGlzLmVrb1BhcmFtcy5JY28sIHVjczogdGhpcy5la29QYXJhbXMuVWNzIH0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgaW5pdGlhbFZhbHVlOiB7IGljbzogdGhpcy5la29QYXJhbXMuSWNvLCB1Y3M6IHRoaXMuZWtvUGFyYW1zLlVjcyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBjaGFuZ2U6ICh2YWx1ZXMsIG9iaikgPT4geyB9LFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgaWNvOiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJpY29cIiwgXCJpY29cIilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAgICAgICAgIDsgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyRm9ybURlZjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGZpbHRyb3ZhY2lobyBwYW5lbHVcclxuICAgICAgICAgKiBAcGFyYW0gdGhhdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyUGFuZWwodGhhdDogdGhpcyk6dm9pZCB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRmaWx0ZXJQYW5lbCA9ICQubmV3RGl2KFwianMtZmlsdHJcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtczogW3RoYXQuQ3JlYXRlRmlsdGVyWmFsb3prYSgpXSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlVXNlclNldHRpbmdzOiBcIkRlbnlcIixcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZUxheW91dERlc2NyaXB0b3I6IFwiTDRNM1MxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0xvYWRBZnRlckNyZWF0ZVBhbmVsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5OiBmdW5jdGlvbiAoZXZlbnQsIG9iaikgeyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbHRlckZvcm0uYXBwbHlcIiwgb2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2cudHJhY2UoXCJmaWx0ZXJGb3JtLmFwcGx5XCIsIG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVsb3plbmkgYWt0dWFsbmljaCBob2Rub3QgZmlsdHJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY3VycmVudFJvayA9IG9iai5maWx0ZXIucm9rO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmN1cnJlbnRNb250aCA9IG9iai5maWx0ZXIubWVzaWM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gdGhhdC4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcucmVxdWVzdERhdGEvKjxHb3JkaWMuVWNyLldlYkNsaWVudC5HVWNyVHJlZURvcGxuVWRhamVEdG8+Ki8ob2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmxvYWREYXRhKG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICogWmppc3RlbmkgdG9wb2xvZ2llXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGdldFRvcG9sb2dpZSgpOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVnlrYXpUb3BvbG9naWVEdG8ge1xyXG4gICAgICAgICAgICAvL2xldCBmaWx0ZXI6IGFueSA9IHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbCgnZ2V0Q29uZmlybWVkRGF0YScpO1xyXG4gICAgICAgICAgICAvL3JldHVybiB7IGljbzogZmlsdGVyLmljbywgbWVzaWM6IGZpbHRlci5tZXNpYywgcm9rOiBmaWx0ZXIucm9rLCB1Y3M6IGZpbHRlci51Y3MgfTtcclxuICAgICAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQcmV2b2QgZm9ybWF0dSB0ZXh0dSBuYSBpZCAoeHh4X2lkKVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBzcmNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldElkKHNyYzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgdmFyIHBvcyA9IHNyYy5pbmRleE9mKFwiX1wiKTtcclxuICAgICAgICAgICAgaWYgKHBvcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHNyYy5zdWJzdHIocG9zICsgMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3JjLnN1YnN0cmluZyhwb3MgKyAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc3JjO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFjdGVuaSBjYXN0aSB2eWthenVcclxuICAgICAgICAgKiBAcGFyYW0gZmlsdHJcclxuICAgICAgICAgKi9cclxuICAgICAgICBsb2FkQ2FzdGkoZmlsdHI6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdVY3JUcmVlVXNjaG92bmFEdG8pOiBKUXVlcnlQcm9taXNlPEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdVY3JUcmVlVXNjaG92bmFEdG9bXT4ge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQuY2xvc2VkKSByZXR1cm4gZGVmLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgbGV0IGRhdGE6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdVY3JUcmVlVXNjaG92bmFEdG9bXSA9IFtdXHJcbiAgICAgICAgICAgIHZhciByZXN1bHREYXRhOiBKUXVlcnlQcm9taXNlPFVjdC5JbnRlcmZhY2UuR1VjdFVzY2hvdm5hS2F0ZWdvcmllRHRvW10+O1xyXG4gICAgICAgICAgICBpZiAoZmlsdHIubGV2ZWwgPT0gMClcclxuICAgICAgICAgICAgICAgIHJlc3VsdERhdGEgPSB0aGF0LmlzbC5VY3JVc2Nob3ZuYS5saXN0KCkuZ2V0RGF0YSgpO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXN1bHREYXRhID0gdGhhdC5pc2wuVWNyVXNjaG92bmEubGlzdCgpLmdldERhdGEoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmVzdWx0RGF0YVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ci5sZXZlbCA9PSAwKSB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuVWNyVXNjaG92bmEubGlzdCgpLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByaW1hcnlLZXkgPSBcIl9cIiArIGl0ZW0ua3RnX3R5cDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeUtleTogcHJpbWFyeUtleVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwga2F0ZWdvcmllOiBpdGVtLmt0Z190eXBfdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudElkOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haW5JZDogXCJfXCIgKyBpdGVtLmt0Z190eXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX3R5cDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdGdfdHlwOiBpdGVtLmt0Z190eXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hZGRTdWJLYXRlZ29yaWUoZGF0YSwgcHJpbWFyeUtleSwgaXRlbS5TdWJLYXRlZ29yaWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXM6IFVjdC5JbnRlcmZhY2UuR1Z5a2R2a2REdG8gPSByZXN1bHRbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlLZXk6IFwiX1wiICsgZmlsdHIubWFpbklkICsgZmlsdHIucHJpbWFyeUtleT8ucmVwbGFjZShcIl9cIiwgXCJcIikgKyBcIl9cIiArIHJlcy5peHNfdmt6LCBwYXJlbnRJZDogZmlsdHIucHJpbWFyeUtleSwgbGV2ZWw6IDIsIG1haW5JZDogZmlsdHIubWFpbklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBOYWN0ZW5pIGRhdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGxvYWREYXRhKGZpbHRyPzogYW55KTogSlF1ZXJ5UHJvbWlzZTxHb3JkaWMuVWNyLldlYkNsaWVudC5HVWNyVHJlZVVzY2hvdm5hRHRvW10+IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWx0ci5sZXZlbCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmxvYWRDYXN0aShmaWx0cik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQuY2xvc2VkKSByZXR1cm4gZGVmLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGF0YTogR29yZGljLlVjci5XZWJDbGllbnQuR1VjclRyZWVVc2Nob3ZuYUR0b1tdID1bXVxyXG5cclxuICAgICAgICAgICAgdmFyIG15RGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICBpZiAodGhhdC5maXJzdExvYWQpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmlyc3RMb2FkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBteURlZi5yZXNvbHZlKHtmaWx0ZXI6eyByb2s6IHRoaXMuZWtvUGFyYW1zLlJvaywgbWVzaWM6IHRoaXMuY3VycmVudE1vbnRoIH19KS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciByZXN1bHQxID0gdGhpcy5nZXRGaWx0ZXIoKTtcclxuICAgICAgICAgICAgICAgIC8vbXlEZWYgPSByZXN1bHQxIGFzIGFueTtcclxuICAgICAgICAgICAgICAgIG15RGVmLnJlc29sdmUoZmlsdHIpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG15RGVmXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5maWx0ZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5maWx0ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJva21lcyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5yb2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9rbWVzID0gXCJcIiArIHJlc3VsdC5yb2sudG9TdHJpbmcoKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9rbWVzID0gXCJcIiArIHRoYXQuZWtvUGFyYW1zLlJvaz8udG9TdHJpbmcoKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lc2ljID0gdGhhdC5jdXJyZW50TW9udGgudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lm1lc2ljKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc2ljID0gXCJcIiArIHJlc3VsdC5tZXNpYy50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNpYy5sZW5ndGggPT0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzaWMgPSBcIjBcIiArIG1lc2ljO1xyXG4gICAgICAgICAgICAgICAgICAgIHJva21lcyArPSAgbWVzaWM7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpbHRyID0geyBwcml6X2R1OiAxLCBha3Rpdml0YTogMTAwLCBwbGF0bm9zdDogcm9rbWVzIH07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJva21lcyAhPT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdHIgPSAkLmV4dGVuZChmaWx0cixmaWx0cik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuVWNyVXNjaG92bmEubGlzdCgpLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcmltYXJ5S2V5ID0gXCJfXCIgKyBpdGVtLmt0Z190eXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeUtleTogcHJpbWFyeUtleVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGthdGVnb3JpZTogaXRlbS5rdGdfdHlwX3R4dCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50SWQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluSWQ6IFwiX1wiICsgaXRlbS5rdGdfdHlwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfdHlwOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdGdfdHlwOiBpdGVtLmt0Z190eXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFkZFN1YkthdGVnb3JpZShkYXRhLCBwcmltYXJ5S2V5LCBpdGVtLlN1YkthdGVnb3JpZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbi8vICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRG9wbG5lbmkgc3Via2F0ZWdvcmllXHJcbiAgICAgICAgICogQHBhcmFtIHJvb3RJdGVtc1xyXG4gICAgICAgICAqIEBwYXJhbSBwcmltYXJ5S2V5XHJcbiAgICAgICAgICogQHBhcmFtIHN1YmthdGVnb3JpZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgYWRkU3ViS2F0ZWdvcmllKHJvb3RJdGVtczogR29yZGljLlVjci5XZWJDbGllbnQuR1VjclRyZWVVc2Nob3ZuYUR0b1tdLCBwcmltYXJ5S2V5OiBzdHJpbmcsIHN1YmthdGVnb3JpZTogVWN0LkludGVyZmFjZS5HVWN0VXNjaG92bmFTdWJLYXRlZ29yaWVEdG9bXXxudWxsfHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHN1YmthdGVnb3JpZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzdWJrYXRlZ29yaWUgIT0gbnVsbCAmJiBzdWJrYXRlZ29yaWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc3Via2F0ZWdvcmllLmZvckVhY2goKG5ld0l0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByb290SXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5S2V5OiBwcmltYXJ5S2V5ICsgXCJfXCIgKyBuZXdJdGVtLml4c190eXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5JZDogcHJpbWFyeUtleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50SWQ6IHByaW1hcnlLZXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGthdGVnb3JpZTogbmV3SXRlbS5uYXpldixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhzX3R5cDogbmV3SXRlbS5peHNfdHlwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrdGdfdHlwOiBuZXdJdGVtLmt0Z190eXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICB0eXBlIElHU2V6bmFtRG9wbG5VZGFqZUR0b1dpdGhUYWJTZXR0aW5ncyA9IElHRGV0YWlsRG9wbEhvZG5vdHlPcHRpb25zIDtcclxuXHJcblxyXG59Il19
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
             * Danove evidence
             *
             * @author tkares
             * @since 484.1.0.69
             */
            let GSeznamDanovaEvidence = class GSeznamDanovaEvidence extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    /**
                     * trida gridu
                     */
                    this.classGrid = "js-grid-base";
                    // nastaveni id a titulku okna
                    this.title = "jres:30250085"; //RC 30250085 : Daňová evidence
                }
                onContentReady() {
                    var that = this;
                    // ulozeni spustene ulohy
                    this?.parentContent?.userSettings.set("lastAction", this.taskId);
                    this.actions.add({
                        name: "selAct",
                        icon: "gi-detail",
                        caption: "jres:31100156", //RC 31100156 : Detail
                        enabled: false,
                        run: function (ev, ctx) {
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            var row = grid.ggrid("activeRow");
                            if (row === null)
                                return;
                            //zobrazeni detailu
                            that.navigate(Gordic.Ucr.WebClient.GDetailDanoveEvidence, { currentRow: row, viewMode: false, cols: that.cols }, {
                                closeOnEscape: false,
                            });
                        }
                    });
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
                            that.showZapisy(row);
                        }
                    });
                    this.menuBar([
                        //{ action: that.actions.newAct, favorite: true, captionVisible: "never" },
                        { action: that.actions.selAct, favorite: true },
                        { action: that.actions.zapisyAct, favorite: true }
                    ]);
                    // vytvoreni fitru panelu
                    this.createFilterPanel(this);
                    let provider = new Gordic.Data.Provider((filter) => {
                        return that.loadData(filter);
                    });
                    let view = new Gordic.Data.View([], { processors: { provider: provider } });
                    const grid = $.newDiv(this.classGrid)
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        data: view,
                        selection: function (ev, info) {
                            var rows = info.getSelection();
                            //that.clearControls();
                            if (rows.length > 0) {
                                that.previewController.enable(true);
                                that.previewController.show({ currentRow: rows[0], viewMode: true, cols: that.cols });
                            }
                            else
                                that.previewController.enable(false);
                        },
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
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
                                that.navigate(Gordic.Ucr.WebClient.GDetailDanoveEvidence, { currentRow: data, viewMode: false, cols: that.cols }, {
                                    closeOnEscape: false,
                                });
                            }
                        }),
                        //#region Definice sloupcu
                        //#endregion
                    });
                    // poc. nastaveni filtru
                    if (this.filterMonth.length > 0)
                        this.findFields('mesicod,mesicdo').gfield('setValue', this.filterMonth[this.filterMonth.length - 1]);
                    // schovam grid
                    grid.hide();
                    //#region Preview v sidebaru
                    this.element.gsidebar("option", "right", { userSettings: this.userSettings, width: 500, visible: true, pinned: false });
                    this.previewController = new Gordic.Previews.GPreviewController(this.element, {
                        useSubtask: false,
                        panelOptions: {
                            caption: "jres:30250097", //RC 30250097 : Náhled detailu daňové evidence
                            side: "right"
                        },
                        tabs: [{
                                caption: "jres:30250097", //RC 30250097 : Náhled detailu daňové evidence
                                customLoad: (tab, dto) => {
                                    let elm = $.newDiv().gcontent(Gordic.Ucr.WebClient.GDetailDanoveEvidence, { parentContent: this }); //Nutne pro spravne spojeni s kontextem hlavniho contentu
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
                 * Zobrazeni z8pis;
                 * @param row
                 */
                showZapisy(row) {
                    let id;
                    //NOTE: Odpovida z TK UCR: GSeznamZapisuVRadkuTab.LoadGridData()
                    let filter = {
                        rok_uej: { start: row.rok, end: row.rok },
                        mesic_uej: { start: row.mesic, end: row.mesic },
                    };
                    let typUlohy = 5 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.DanovaEvidenceZapis */;
                    id = "uctZapisy#"; //NOTE: Musi byt stejne ni na MainApp.cs
                    this.navigate('Gordic.Ucr.WebClient.GSeznamEkoZaznamu', {
                        ID: id,
                        TypUlohy: typUlohy,
                        Filter: filter,
                        StrictFilter: false,
                        Ecdd: row.ec_dd,
                        Dic: row.dic,
                        Zapisova: true,
                        //FilterStrPopis: f.filterStrPopis,
                        AutoLoadData: true,
                        JmenoOkna: "jres:30250099".format(row.ec_dd, row.dic, row.rok.toString() + "/" + row.mesic.toString()) //RC 30250099 : Zápisy DPH:{0}, {1}, {2}
                    });
                }
                /**
                 * Uprava viditelnosti akci
                 *
                 * */
                setActions(pocetRadku) {
                    // pokud neni grid, nic nedelej
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    if (this.closed)
                        return;
                    this.actions.selAct.update({ enabled: pocetRadku > 0 });
                    this.actions.zapisyAct.update({ enabled: pocetRadku > 0 });
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
                    var filterFormDef = new Gordic.Forms.Form({ /*opened: true, layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1",*/ tabLabel: "jres:30250052" }) //RC 30250052 : Filtr
                        .addSection()
                        //.addField("gformbox", {
                        //    form: frm, itemTemplate:"{mesic1}"
                        //})
                        .addRow("jres:30250120") //RC 30250120 : Měsíc DPH od
                        .addField("gselectbox", {
                        name: "mesicod",
                        multi: false,
                        list: false, itemWidth: "",
                        dropdown: true
                        //, model: "model.priz_zpl_kh=value.priz_zpl_kh"
                        //, itemTemplate: "{priz_zpl_kh_txt}"
                        //, modelDefaults: that.filtertMonth[that.filtertMonth.length                    
                        ,
                        data: that.filterMonth
                    })
                        .addRow("jres:30250121") //RC 30250121 : do
                        .addField("gselectbox", {
                        name: "mesicdo", multi: false, list: false, itemWidth: "",
                        dropdown: true
                        //, model: "model.priz_zpl_kh=value.priz_zpl_kh"
                        //, itemTemplate: "{priz_zpl_kh_txt}"
                        //, modelDefaults: that.filtertMonth[that.filtertMonth.length]
                        ,
                        data: that.filterMonth
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
                        //filterViewMode: defFiltru,// FilterViewMode.Detail,                 
                        //favorites: ["ixp", "ixs_typ", "vlastni_doklady"],
                        autoLoadAfterChoseFilter: true,
                        //saveOptionsForm: "eko",
                        filterStorageService: new Gordic.Gin.FilterStorageService.Store(),
                        filterViewModeUserSettings: "Deny",
                        // 01.03.2021 - TFeik
                        // Nahrazení obsolete parametrů.
                        autoLoadAfterCreatePanel: false,
                        //userDefaultFilter: true,
                        filterViewMode: FilterViewMode.Simple,
                        //simpleMode: true,
                        favoriteLayoutDescriptor: "L4M3S1",
                        //filterHelperItemTemplate: "<b>{nazev}</b>",
                        //textItemTemplate: "{nazev}",
                        apply: function (event, obj) {
                            console.log("filterForm.apply", obj);
                            that.log.trace("filterForm.apply", obj);
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            var view = grid.ggrid("getView");
                            view.requestData(obj.filter);
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
                loadData(filter) {
                    var that = this;
                    //            var view = new Gordic.Isl.View(Gordic.Isl.UcrPozadavek.list({ filters: { ixs_ses: typMsk } }));
                    let filtr = {
                        ico: { start: that.ekoParams.Ico, end: that.ekoParams.Ico },
                        rok: { start: that.ekoParams.Rok, end: that.ekoParams.Rok }
                    };
                    debugger;
                    if (!filter) {
                        var _filter = that.GetFilter();
                        filter = _filter.gfilterpanel('getConfirmedData');
                    }
                    filtr["mesic"] = { start: filter.mesicod, end: filter.mesicdo };
                    var def = $.Deferred();
                    that.isl.UcrDph.listDanovaEvidence({ filter: filtr })
                        .get()
                        .done(function (result) {
                        let grid = that.getGrid();
                        if (grid == null)
                            return;
                        grid.ggrid("option", "columns", that.createGridFormat(result.Cols));
                        that.cols = result.Cols;
                        that.setActions(result.ListValues?.length);
                        grid.show();
                        return def.resolve(result.ListValues);
                        //that.data = r;
                        //that.$grid.ggrid("setData", new Gordic.Data.View(result.ListValues as any[]));
                    });
                    return def.promise();
                }
                /**
                 *  Zda zobrazovat mesic DPH
                 *
                 *
                 * */
                isMesicDPH() {
                    var _filter = this.GetFilter();
                    var filter = _filter.gfilterpanel('getConfirmedData');
                    if (filter.mesicod != null && filter.mesicdo != null)
                        return filter.mesicod != filter.mesicdo;
                    return true;
                }
                /**
                 * Vytvoreni gridformatu dle predlohy
                 *
                 * @param colDefinition
                 */
                createGridFormat(colDefinition) {
                    var myGridFormat = new Gordic.Data.GridFormat();
                    // staticke sloupce
                    // myGridFormat.addTextColumn({
                    //     name: "ec_dd" ,
                    //     caption: "ec_dd",
                    //     width: 90,
                    //     visible:false
                    // })
                    //.addTextColumn({
                    //    name: "dic",
                    //    caption: "dic",
                    //    width: 90,
                    //    visible: false
                    //})
                    ;
                    if (this.isMesicDPH()) {
                        myGridFormat.addNumberColumn({
                            name: "mesic",
                            caption: "jres:30250088", //RC 30250088 : Měsíc
                        });
                    }
                    // vytvoreni definicnich sloupcu
                    for (var i = 0; i < colDefinition.length; i++) {
                        var col = colDefinition[i];
                        myGridFormat.addTextColumn({
                            name: "H_" + col.klic,
                            caption: col.klic_txt,
                        });
                    }
                    return myGridFormat;
                }
            };
            GSeznamDanovaEvidence = __decorate([
                Decorators.gcontent
            ], GSeznamDanovaEvidence);
            WebClient.GSeznamDanovaEvidence = GSeznamDanovaEvidence;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbURhbm92YUV2aWRlbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbURhbm92YUV2aWRlbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0FzWmY7QUF0WkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBc1puQjtJQXRaZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBc1o3QjtRQXRab0IsV0FBQSxTQUFTO1lBQzFCOzs7OztlQUtHO1lBRUgsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBc0IsU0FBUSxPQUFBLFlBQVk7Z0JBQXZEOztvQkFhSTs7dUJBRUc7b0JBQ08sY0FBUyxHQUFXLGNBQWMsQ0FBQztvQkFDN0MsOEJBQThCO29CQUM5QixVQUFLLEdBQUcsZUFBZSxDQUFDLENBQUMsK0JBQStCO2dCQTJYNUQsQ0FBQztnQkExWEcsY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLHlCQUF5QjtvQkFDekIsSUFBSSxFQUFFLGFBQWEsRUFBRSxZQUFhLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBRWxFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO3dCQUNiLElBQUksRUFBRSxRQUFRO3dCQUNkLElBQUksRUFBRSxXQUFXO3dCQUNqQixPQUFPLEVBQUUsZUFBZSxFQUFHLHNCQUFzQjt3QkFDakQsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7NEJBQ2xCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDMUIsSUFBSSxJQUFJLElBQUksSUFBSTtnQ0FBRSxPQUFPOzRCQUN6QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDOzRCQUNsQyxJQUFJLEdBQUcsS0FBSyxJ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QUUsQ0FBQzt3QkFDNUMsSUFBSSxHQUFHLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzQixZQUFZLENBQUMsYUFBYSxDQUFDOzRCQUN2QixJQUFJLEVBQUUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJOzRCQUNyQixPQUFPLEVBQUUsR0FBRyxDQUFDLFFBQWU7eUJBQy9CLENBQUMsQ0FBQztvQkFDUCxDQUFDO29CQUNELE9BQU8sWUFBWSxDQUFDO2dCQUN4QixDQUFDO2FBQ0osQ0FBQTtZQTdZWSxxQkFBcUI7Z0JBRGpDLFVBQVUsQ0FBQyxRQUFRO2VBQ1AscUJBQXFCLENBNllqQztZQTdZWSwrQkFBcUIsd0JBNllqQyxDQUFBO1FBQ0wsQ0FBQyxFQXRab0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBc1o3QjtJQUFELENBQUMsRUF0WmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXNabkI7QUFBRCxDQUFDLEVBdFpTLE1BQU0sS0FBTixNQUFNLFFBc1pmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5VY3IuV2ViQ2xpZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogRGFub3ZlIGV2aWRlbmNlXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgdGthcmVzXHJcbiAgICAgKiBAc2luY2UgNDg0LjEuMC42OVxyXG4gICAgICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1EYW5vdmFFdmlkZW5jZSBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZWtvUGFyYW1zOiBHb3JkaWMuVWNyLldlYkNsaWVudC5HRWtvUGFyYW1zRHRvO1xyXG4gICAgICAgIC8vIHNlem5hbSBtZXNpY3UsIHByZXMga3RlcmUgbHplIGZpbHRyb3ZhdFxyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyTW9udGg6IG51bWJlcltdOyBcclxuICAgICAgICAvLyBmaWx0cm92YWNpIHBhbmVsXHJcbiAgICAgICAgcHJpdmF0ZSAkZmlsdGVyUGFuZWw6IEpRdWVyeTtcclxuICAgICAgICAvLyBncmlkIHNlIHNlbmFtZW1cclxuICAgICAgICAvL3ByaXZhdGUgJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47ICAgICAgICBcclxuICAgICAgICAvLyBrb250cm9sZXIgcHJvIHByZXZpZSBva25vXHJcbiAgICAgICAgcHJpdmF0ZSBwcmV2aWV3Q29udHJvbGxlcjogR29yZGljLlByZXZpZXdzLkdQcmV2aWV3Q29udHJvbGxlcjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjb2xzOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRWtvY3Nrb0R0b1tdO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHRyaWRhIGdyaWR1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGNsYXNzR3JpZDogc3RyaW5nID0gXCJqcy1ncmlkLWJhc2VcIjtcclxuICAgICAgICAvLyBuYXN0YXZlbmkgaWQgYSB0aXR1bGt1IG9rbmFcclxuICAgICAgICB0aXRsZSA9IFwianJlczozMDI1MDA4NVwiOyAvL1JDIDMwMjUwMDg1IDogRGHFiG92w6EgZXZpZGVuY2VcclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyB1bG96ZW5pIHNwdXN0ZW5lIHVsb2h5XHJcbiAgICAgICAgICAgIHRoaXM/LnBhcmVudENvbnRlbnQ/LnVzZXJTZXR0aW5ncyEuc2V0KFwibGFzdEFjdGlvblwiLCB0aGlzLnRhc2tJZCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic2VsQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTU2XCIsICAvL1JDIDMxMTAwMTU2IDogRGV0YWlsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL3pvYnJhemVuaSBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShHb3JkaWMuVWNyLldlYkNsaWVudC5HRGV0YWlsRGFub3ZlRXZpZGVuY2UsIHsgY3VycmVudFJvdzogcm93LCB2aWV3TW9kZTogZmFsc2UsIGNvbHM6IHRoYXQuY29scyB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlT25Fc2NhcGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiemFwaXN5QWN0XCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImdpLWxpc3RcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDg5XCIsIC8vUkMgMzAyNTAwODkgOiBaw6FwaXN5XHJcbiAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IGdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PT0gbnVsbCApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3daYXBpc3kocm93KVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAgLy97IGFjdGlvbjogdGhhdC5hY3Rpb25zLm5ld0FjdCwgZmF2b3JpdGU6IHRydWUsIGNhcHRpb25WaXNpYmxlOiBcIm5ldmVyXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuc2VsQWN0LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy56YXBpc3lBY3QsIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICAvLyB2eXR2b3JlbmkgZml0cnUgcGFuZWx1XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRmlsdGVyUGFuZWwodGhpcyk7IFxyXG5cclxuICAgICAgICAgICAgbGV0IHByb3ZpZGVyID0gbmV3IEdvcmRpYy5EYXRhLlByb3ZpZGVyPGFueSxhbnksYW55PigoZmlsdGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5sb2FkRGF0YShmaWx0ZXIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoW10sIHsgcHJvY2Vzc29yczogeyBwcm92aWRlcjogcHJvdmlkZXIgfSB9KTtcclxuICAgICAgICAgICAgY29uc3QgZ3JpZCA9ICQubmV3RGl2KHRoaXMuY2xhc3NHcmlkKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBmdW5jdGlvbiAoZXYsIGluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvd3MgPSBpbmZvLmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuY2xlYXJDb250cm9scygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93cy5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5lbmFibGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLnNob3coeyBjdXJyZW50Um93OiByb3dzWzBdLCB2aWV3TW9kZTogdHJ1ZSwgY29sczogdGhhdC5jb2xzIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLmVuYWJsZShmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9LCAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YTogYW55O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHguY2VsbEluZm8gJiYgY3R4LmNlbGxJbmZvLmRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGN0eC5jZWxsSW5mby5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy96b2JyYXplbmkgZGV0YWlsdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShHb3JkaWMuVWNyLldlYkNsaWVudC5HRGV0YWlsRGFub3ZlRXZpZGVuY2UsIHsgY3VycmVudFJvdzogZGF0YSwgdmlld01vZGU6IGZhbHNlLCBjb2xzOiB0aGF0LmNvbHMgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlT25Fc2NhcGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8jcmVnaW9uIERlZmluaWNlIHNsb3VwY3VcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIHBvYy4gbmFzdGF2ZW5pIGZpbHRydVxyXG4gICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJNb250aC5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKCdtZXNpY29kLG1lc2ljZG8nKS5nZmllbGQoJ3NldFZhbHVlJywgdGhpcy5maWx0ZXJNb250aFt0aGlzLmZpbHRlck1vbnRoLmxlbmd0aCAtIDFdKTtcclxuICAgICAgICAgICAgLy8gc2Nob3ZhbSBncmlkXHJcbiAgICAgICAgICAgIGdyaWQuaGlkZSgpO1xyXG4gICAgICAgICAgICAvLyNyZWdpb24gUHJldmlldyB2IHNpZGViYXJ1XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZ3NpZGViYXIoXCJvcHRpb25cIiwgXCJyaWdodFwiLCB7IHVzZXJTZXR0aW5nczogdGhpcy51c2VyU2V0dGluZ3MhLCB3aWR0aDogNTAwLCB2aXNpYmxlOiB0cnVlLCBwaW5uZWQ6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnByZXZpZXdDb250cm9sbGVyID0gbmV3IEdvcmRpYy5QcmV2aWV3cy5HUHJldmlld0NvbnRyb2xsZXIodGhpcy5lbGVtZW50LCB7XHJcbiAgICAgICAgICAgICAgICB1c2VTdWJ0YXNrOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHBhbmVsT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDA5N1wiLCAvL1JDIDMwMjUwMDk3IDogTsOhaGxlZCBkZXRhaWx1IGRhxYhvdsOpIGV2aWRlbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgc2lkZTogXCJyaWdodFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGFiczogW3tcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwOTdcIiwgLy9SQyAzMDI1MDA5NyA6IE7DoWhsZWQgZGV0YWlsdSBkYcWIb3bDqSBldmlkZW5jZVxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUxvYWQ6ICh0YWIsIGR0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZWxtID0gJC5uZXdEaXYoKS5nY29udGVudChHb3JkaWMuVWNyLldlYkNsaWVudC5HRGV0YWlsRGFub3ZlRXZpZGVuY2UsIHsgcGFyZW50Q29udGVudDogdGhpcyB9KTsgLy9OdXRuZSBwcm8gc3ByYXZuZSBzcG9qZW5pIHMga29udGV4dGVtIGhsYXZuaWhvIGNvbnRlbnR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IHRhYlNldHRpbmdzID0gZHRvLnRhYlNldHRpbmdzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSBkdG8udGFiU2V0dGluZ3M7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuY29udGVudDxHb3JkaWMuVWNyLldlYkNsaWVudC5HRGV0YWlsRGFub3ZlRXZpZGVuY2U+KGVsbSkuaW5pdChkdG8pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0YWIpLmVtcHR5KCkuYXBwZW5kKGVsbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC4kZ3JpZC5nZ3JpZChcImZvY3VzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZyYWNpIG9iamVrdCBncmlkdVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0R3JpZCgpOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHwgbnVsbCB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5lbGVtZW50LmZpbmQoXCIuXCIgKyB0aGlzLmNsYXNzR3JpZCk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZGF0YS5sZW5ndGggPT0gMCA/IG51bGwgOiBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW5pIHo4cGlzO1xyXG4gICAgICAgICAqIEBwYXJhbSByb3dcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHNob3daYXBpc3kocm93OmFueSk6IHZvaWQge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgaWQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgICAgIC8vTk9URTogT2Rwb3ZpZGEgeiBUSyBVQ1I6IEdTZXpuYW1aYXBpc3VWUmFka3VUYWIuTG9hZEdyaWREYXRhKClcclxuICAgICAgICAgICAgbGV0IGZpbHRlcjogR0Vrb0ZpbHRlckR0byA9IHtcclxuICAgICAgICAgICAgICAgIHJva191ZWo6IHsgc3RhcnQ6IHJvdy5yb2shLCBlbmQ6IHJvdy5yb2shIH0sXHJcbiAgICAgICAgICAgICAgICBtZXNpY191ZWo6IHsgc3RhcnQ6IHJvdy5tZXNpYywgZW5kOiByb3cubWVzaWMgfSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0eXBVbG9oeSA9IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuRGFub3ZhRXZpZGVuY2VaYXBpcztcclxuICAgICAgICAgICAgaWQgPSBcInVjdFphcGlzeSNcIjsgLy9OT1RFOiBNdXNpIGJ5dCBzdGVqbmUgbmkgbmEgTWFpbkFwcC5jc1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGUoJ0dvcmRpYy5VY3IuV2ViQ2xpZW50LkdTZXpuYW1Fa29aYXpuYW11Jywge1xyXG4gICAgICAgICAgICAgICAgSUQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgVHlwVWxvaHk6IHR5cFVsb2h5LFxyXG4gICAgICAgICAgICAgICAgRmlsdGVyOiBmaWx0ZXIsXHJcbiAgICAgICAgICAgICAgICBTdHJpY3RGaWx0ZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgRWNkZDogcm93LmVjX2RkLFxyXG4gICAgICAgICAgICAgICAgRGljOnJvdy5kaWMsXHJcbiAgICAgICAgICAgICAgICBaYXBpc292YTp0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy9GaWx0ZXJTdHJQb3BpczogZi5maWx0ZXJTdHJQb3BpcyxcclxuICAgICAgICAgICAgICAgIEF1dG9Mb2FkRGF0YTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIEptZW5vT2tuYTogXCJqcmVzOjMwMjUwMDk5XCIuZm9ybWF0KHJvdy5lY19kZCwgcm93LmRpYywgcm93LnJvay50b1N0cmluZygpICsgXCIvXCIgKyByb3cubWVzaWMudG9TdHJpbmcoKSkgLy9SQyAzMDI1MDA5OSA6IFrDoXBpc3kgRFBIOnswfSwgezF9LCB7Mn1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVcHJhdmEgdmlkaXRlbG5vc3RpIGFrY2lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgc2V0QWN0aW9ucyhwb2NldFJhZGt1OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgLy8gcG9rdWQgbmVuaSBncmlkLCBuaWMgbmVkZWxlalxyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsb3NlZCApIHJldHVybjsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLnNlbEFjdCEudXBkYXRlKHsgZW5hYmxlZDogcG9jZXRSYWRrdSA+IDAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy56YXBpc3lBY3QhLnVwZGF0ZSh7IGVuYWJsZWQ6IHBvY2V0UmFka3UgPiAwIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAqIGZ1bmN0aW9uIENyZWF0ZUZpbHRlclphbG96a2FcclxuICAgICAgICAqICAgICAgXHJcbiAgICAgICAgKiBPYmVjbmEgemFsb3prYVxyXG4gICAgICAgICogQHBhcmFtIHtHQ29udGVudH0gY29udGVudFxyXG4gICAgICAgICogQHJldHVybnMge2FueX1cclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgQ3JlYXRlRmlsdGVyWmFsb3prYSgpOiBhbnkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgdmFyIGZpbHRlckZvcm1EZWYgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyAvKm9wZW5lZDogdHJ1ZSwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzEsIEwtMy04LTEsIE0tMTItMTEtMSwgUy0xMi0xMS0xXCIsKi8gdGFiTGFiZWw6IFwianJlczozMDI1MDA1MlwiIH0pICAvL1JDIDMwMjUwMDUyIDogRmlsdHJcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdmb3JtYm94XCIsIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIGZvcm06IGZybSwgaXRlbVRlbXBsYXRlOlwie21lc2ljMX1cIlxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAxMjBcIikgLy9SQyAzMDI1MDEyMCA6IE3Em3PDrWMgRFBIIG9kXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtZXNpY29kXCJcclxuICAgICAgICAgICAgICAgICAgICAsIG11bHRpOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICwgbGlzdDogZmFsc2UsIGl0ZW1XaWR0aDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgZHJvcGRvd246IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLywgbW9kZWw6IFwibW9kZWwucHJpel96cGxfa2g9dmFsdWUucHJpel96cGxfa2hcIlxyXG4gICAgICAgICAgICAgICAgICAgIC8vLCBpdGVtVGVtcGxhdGU6IFwie3ByaXpfenBsX2toX3R4dH1cIlxyXG4gICAgICAgICAgICAgICAgICAgIC8vLCBtb2RlbERlZmF1bHRzOiB0aGF0LmZpbHRlcnRNb250aFt0aGF0LmZpbHRlcnRNb250aC5sZW5ndGggICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICwgZGF0YTogdGhhdC5maWx0ZXJNb250aFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMTIxXCIpIC8vUkMgMzAyNTAxMjEgOiBkb1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7IFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVzaWNkb1wiLCBtdWx0aTogZmFsc2UsIGxpc3Q6IGZhbHNlLCBpdGVtV2lkdGg6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAsIGRyb3Bkb3duOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8sIG1vZGVsOiBcIm1vZGVsLnByaXpfenBsX2toPXZhbHVlLnByaXpfenBsX2toXCJcclxuICAgICAgICAgICAgICAgICAgICAvLywgaXRlbVRlbXBsYXRlOiBcIntwcml6X3pwbF9raF90eHR9XCJcclxuICAgICAgICAgICAgICAgICAgICAvLywgbW9kZWxEZWZhdWx0czogdGhhdC5maWx0ZXJ0TW9udGhbdGhhdC5maWx0ZXJ0TW9udGgubGVuZ3RoXVxyXG4gICAgICAgICAgICAgICAgICAgICwgZGF0YTogdGhhdC5maWx0ZXJNb250aFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIDtcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyRm9ybURlZjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGZpbHRyb3ZhY2lobyBwYW5lbHVcclxuICAgICAgICAgKiBAcGFyYW0gdGhhdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyUGFuZWwodGhhdDogdGhpcyk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kZmlsdGVyUGFuZWwgPSAkLm5ld0RpdihcImpzLWZpbHRyXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmaWx0ZXJwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyQ3VzdG9taXplcjogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvbFNvcnQgPSBkYXRhLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEubmFtZSA+PSBiLm5hbWU7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcG9sU29ydDtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1zOiBbdGhhdC5DcmVhdGVGaWx0ZXJaYWxvemthKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZmlsdGVyVmlld01vZGU6IGRlZkZpbHRydSwvLyBGaWx0ZXJWaWV3TW9kZS5EZXRhaWwsICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL2Zhdm9yaXRlczogW1wiaXhwXCIsIFwiaXhzX3R5cFwiLCBcInZsYXN0bmlfZG9rbGFkeVwiXSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0xvYWRBZnRlckNob3NlRmlsdGVyOiB0cnVlLCAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zYXZlT3B0aW9uc0Zvcm06IFwiZWtvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RvcmFnZVNlcnZpY2U6IG5ldyBHb3JkaWMuR2luLkZpbHRlclN0b3JhZ2VTZXJ2aWNlLlN0b3JlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVmlld01vZGVVc2VyU2V0dGluZ3M6IFwiRGVueVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIDAxLjAzLjIwMjEgLSBURmVpa1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5haHJhemVuw60gb2Jzb2xldGUgcGFyYW1ldHLFry5cclxuICAgICAgICAgICAgICAgICAgICBhdXRvTG9hZEFmdGVyQ3JlYXRlUGFuZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdXNlckRlZmF1bHRGaWx0ZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVmlld01vZGU6IEZpbHRlclZpZXdNb2RlLlNpbXBsZSxcclxuICAgICAgICAgICAgICAgICAgICAvL3NpbXBsZU1vZGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVMYXlvdXREZXNjcmlwdG9yOiBcIkw0TTNTMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZmlsdGVySGVscGVySXRlbVRlbXBsYXRlOiBcIjxiPntuYXpldn08L2I+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXh0SXRlbVRlbXBsYXRlOiBcIntuYXpldn1cIixcclxuICAgICAgICAgICAgICAgICAgICBhcHBseTogZnVuY3Rpb24gKGV2ZW50LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaWx0ZXJGb3JtLmFwcGx5XCIsIG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9nLnRyYWNlKFwiZmlsdGVyRm9ybS5hcHBseVwiLCBvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gZ3JpZC5nZ3JpZChcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcucmVxdWVzdERhdGEob2JqLmZpbHRlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcmFjaSBvYmpla3QgZmlsdHJ1XHJcbiAgICAgICAgICogQHBhcmFtIHtHQ29udGVudH0gY29udGVudFxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBHZXRGaWx0ZXIoKTogYW55IHtcclxuICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgaWYgKEdvcmRpYy5VdGlscy5XaWRnZXRFeGlzdHMoXCJnZmlsdGVycGFuZWxcIiwgdGhpcy4kZmlsdGVyUGFuZWwpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGZpbHRlclBhbmVsO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBcIk5lbmFsZXplbiBmaWx0clwiO1xyXG4gICAgICAgICAgICAvL3JldHVybiBjb250ZW50Py5lbGVtZW50LmZpbmQoXCIuanMtZmlsdHIuZ2ZpbHRlcnBhbmVsXCIpO1xyXG4gICAgICAgICAgICAvL3JldHVybiAkKFwiLmpzLWZpbHRyXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgTmFjdGVuaSBkYXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBsb2FkRGF0YShmaWx0ZXI/OiBhbnkpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLklzbC5WaWV3KEdvcmRpYy5Jc2wuVWNyUG96YWRhdmVrLmxpc3QoeyBmaWx0ZXJzOiB7IGl4c19zZXM6IHR5cE1zayB9IH0pKTtcclxuICAgICAgICAgICAgbGV0IGZpbHRyOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRWtvU2V6bmFtRHBoRmlsdGVyRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgaWNvOiB7IHN0YXJ0OiB0aGF0LmVrb1BhcmFtcy5JY28gYXMgc3RyaW5nLCBlbmQ6IHRoYXQuZWtvUGFyYW1zLkljbyBhcyBzdHJpbmcgfVxyXG4gICAgICAgICAgICAgICAgLCByb2s6IHsgc3RhcnQ6IHRoYXQuZWtvUGFyYW1zLlJvayBhcyBudW1iZXIsIGVuZDogdGhhdC5la29QYXJhbXMuUm9rIGFzIG51bWJlciB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgIGlmICghZmlsdGVyKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2ZpbHRlciA9IHRoYXQuR2V0RmlsdGVyKCk7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIgPSBfZmlsdGVyLmdmaWx0ZXJwYW5lbCgnZ2V0Q29uZmlybWVkRGF0YScpOyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpbHRyW1wibWVzaWNcIl0gPSB7IHN0YXJ0OiBmaWx0ZXIubWVzaWNvZCBhcyBhbnksIGVuZDogZmlsdGVyLm1lc2ljZG8gYXMgYW55IH07XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlVjckRwaC5saXN0RGFub3ZhRXZpZGVuY2UoeyBmaWx0ZXI6IGZpbHRyIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWQoXCJvcHRpb25cIiwgXCJjb2x1bW5zXCIsIHRoYXQuY3JlYXRlR3JpZEZvcm1hdChyZXN1bHQuQ29scyEpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNvbHMgPSByZXN1bHQuQ29scyE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRBY3Rpb25zKHJlc3VsdC5MaXN0VmFsdWVzPy5sZW5ndGggYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICBncmlkLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUocmVzdWx0Lkxpc3RWYWx1ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5kYXRhID0gcjtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuJGdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIG5ldyBHb3JkaWMuRGF0YS5WaWV3KHJlc3VsdC5MaXN0VmFsdWVzIGFzIGFueVtdKSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIFpkYSB6b2JyYXpvdmF0IG1lc2ljIERQSFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBpc01lc2ljRFBIKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgX2ZpbHRlciA9IHRoaXMuR2V0RmlsdGVyKCk7XHJcbiAgICAgICAgICAgIHZhciBmaWx0ZXIgPSBfZmlsdGVyLmdmaWx0ZXJwYW5lbCgnZ2V0Q29uZmlybWVkRGF0YScpOyAgICAgXHJcbiAgICAgICAgICAgIGlmIChmaWx0ZXIubWVzaWNvZCAhPSBudWxsICYmIGZpbHRlci5tZXNpY2RvICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyLm1lc2ljb2QgIT0gZmlsdGVyLm1lc2ljZG87XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGdyaWRmb3JtYXR1IGRsZSBwcmVkbG9oeVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBjb2xEZWZpbml0aW9uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KGNvbERlZmluaXRpb246IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFa29jc2tvRHRvW10pOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0IHtcclxuICAgICAgICAgICAgdmFyIG15R3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBzdGF0aWNrZSBzbG91cGNlXHJcbiAgICAgICAgICAgLy8gbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgIC8vICAgICBuYW1lOiBcImVjX2RkXCIgLFxyXG4gICAgICAgICAgIC8vICAgICBjYXB0aW9uOiBcImVjX2RkXCIsXHJcbiAgICAgICAgICAgLy8gICAgIHdpZHRoOiA5MCxcclxuICAgICAgICAgICAvLyAgICAgdmlzaWJsZTpmYWxzZVxyXG4gICAgICAgICAgIC8vIH0pXHJcbiAgICAgICAgICAgLy8uYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgLy8gICAgbmFtZTogXCJkaWNcIixcclxuICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcImRpY1wiLFxyXG4gICAgICAgICAgIC8vICAgIHdpZHRoOiA5MCxcclxuICAgICAgICAgICAvLyAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc01lc2ljRFBIKCkpIHtcclxuICAgICAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVzaWNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwODhcIiwgLy9SQyAzMDI1MDA4OCA6IE3Em3PDrWNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyB2eXR2b3JlbmkgZGVmaW5pY25pY2ggc2xvdXBjdVxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbERlZmluaXRpb24ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb2wgPSBjb2xEZWZpbml0aW9uW2ldO1xyXG4gICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiSF9cIiArIGNvbC5rbGljLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IGNvbC5rbGljX3R4dCBhcyBhbnksXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbXlHcmlkRm9ybWF0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
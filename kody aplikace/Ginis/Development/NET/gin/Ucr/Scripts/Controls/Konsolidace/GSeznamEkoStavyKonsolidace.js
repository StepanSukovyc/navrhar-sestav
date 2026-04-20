"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            class GSeznamEkoStavyKonsolidace extends WebClient.GSeznamEkoZaznamuBase {
                constructor(content) {
                    super(content);
                    /** Limit poctu nacitanych zaznamu, pokud nedojde k potvrzeni, ze uzivatel chce jit pres limit */
                    this.logOptions = { name: "GSeznamEkoStavyKonsolidace", authorCode: 302, file: "GSeznamEkoStavyKonsolidace.ts" };
                    this.pouzivanStrukPopis = false;
                    this.povolenNahled = false;
                    this.soucetVeStatusBaru = true;
                    this.rememberHistory = true;
                    // definice tasku pro seznam a nacteni poctu
                    this.taskList = this.parentCnt.isl.UcrKonsolidaceStavy.list();
                    this.taskCount = this.parentCnt.isl.UcrKonsolidaceStavy.count();
                    this.AutoLoadData = false;
                }
                onContentReady() {
                    super.onContentReady();
                    if (this.parentCnt["selectedMonth"] > 0)
                        this.parentCnt.findFields("Mesic").gfield("setValue", { mesic: this.parentCnt["selectedMonth"] }, false);
                }
                //protected moveFilter(currFilter: GSeznamEkoZaznamuGetDataFilterDto): void {
                //    this.addFilterToHistory = false;
                //    debugger;
                //    this.$grid.ggridserverfilter("apply", currFilter.filter!);
                //    let mesic = this.parentCnt.findFields("Mesic").gfield("getValue");
                //    let newmesic = currFilter.filter!["Mesic"];
                //    //if (typeof newmesic == undefined) {
                //    //    this.doFilterClick();
                //    //}
                //    if (mesic != newmesic)
                //        this.parentCnt.findFields("Mesic").gfield("setValue", { mesic: newmesic }, false);
                //    this.doFilterClick();
                //}
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                nastaveniAkci(grid, pocetRadku) {
                }
                createGridFormat() {
                    var myGridFormat = new Gordic.Data.GridFormat();
                    myGridFormat.addTextColumn({
                        name: "ico_kons",
                        caption: "jres:30250312", //RC 30250312 : Partner
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "ico_kons", caption: "jres:30250312" }), //RC 30250312 : Partner
                        width: 150,
                    });
                    myGridFormat.addTextColumn({
                        name: "id_kons",
                        caption: "jres:30250314", //RC 30250314 : Okruh
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "id_kons", caption: "jres:30250314" }), //RC 30250314 : Okruh
                        width: 150,
                    });
                    myGridFormat.addTextColumn({
                        name: "ucs",
                        caption: this.Globals.Zkratky?.Ucs,
                        description: this.Globals.Texty?.Ucs,
                        width: 60,
                        //group: topoGroup,
                        aggregate: Gordic.Data.Aggregates.first("ucs"),
                        //serverFilter: Gordic.Eko.Filters.ucsInterval(this.filterOptions.ucs)
                        serverFilter: Gordic.Eko.Filters.ucsInterval({
                            ico: this.filterOptions.ucs.ico, aktProhl: this.filterOptions.ucs.aktProhl,
                            onlyActive: this.filterOptions.ucs.onlyActive, caption: this.filterOptions.ucs.caption, name: "ucs", firstField: undefined, secondField: undefined,
                            model: "ucs",
                            disabled: false
                        })
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c0_kons",
                        caption: "jres:30250211", //RC 30250211 : MD                
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0_kons", caption: "jres:30250211" }) //RC 30250211 : MD
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c1_kons",
                        caption: "jres:30250212", //RC 30250212 : Dal                
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c1_kons", caption: "jres:30250212" }) //RC 30250212 : Dal
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c0c1_kons",
                        caption: "jres:30250213", //RC 30250213 : MD - Dal
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0c1_kons", caption: "jres:30250213" }) //RC 30250213 : MD - Dal
                    });
                    return myGridFormat;
                }
                createProfiles(gf) {
                    let profiles = {
                        default: { name: "jres:31100232", columns: {} } //RC 31100232 : Výchozí
                    };
                    gf.columns.filter((c) => { return !c.hidden; })
                        .forEach((c) => { profiles.default.columns[c.name] = { hidden: false }; });
                    return profiles;
                }
                createActions() {
                    super.createActions();
                    let that = this;
                    this.parentCnt.actions.addRange({
                        actPrepocet: {
                            name: "actPrepocet",
                            //icon: "gi-list",
                            enabled: Ucr.Globals.GUcrGlobals.Rad_Konsolidace === 2 /* Gordic.Uct.Interface.GUcrZobrazeniVdu.AnoEditace */,
                            visible: Ucr.Globals.GUcrGlobals.Rad_Konsolidace === 2 /* Gordic.Uct.Interface.GUcrZobrazeniVdu.AnoEditace */,
                            caption: "jres:30250315", //RC 30250315 : Přepočet úplný
                            run: function (ev, ctx) {
                                that.Recalculation();
                            }
                        },
                    });
                }
                /**
                 * Nastaveni sumacniho radku
                 * @param sumRow
                 * @param $souctySpn
                 */
                setSumBar(sumRow, $souctySpn) {
                    let radek = sumRow;
                    this.formatSumy("jres:31100056", radek.data?.c0_kons, $souctySpn, ", "); //RC 31100056 : MD
                    this.formatSumy("jres:31100057", radek.data?.c1_kons, $souctySpn, ", "); //RC 31100057 : Dal
                    this.formatSumy("jres:31100058", radek.data?.c0c1_kons, $souctySpn, ""); //RC 31100058 : MD - Dal
                }
                /**
                  * Nacti filtry
                  * @param that
                  * @param req
                  * @param next
                  */
                getFilterData(that, req, next) {
                    return that.getFilter(that.$filterPanel.gfilterpanel("getCurrentData"))
                        .then((newFilter) => {
                        if (that.addFilterToHistory) {
                            if (that.currFilterHistoryIndex !== that.filterHistory.length - 1)
                                that.filterHistory.splice(that.currFilterHistoryIndex + 1);
                            that.filterHistory.push(newFilter);
                            that.currFilterHistoryIndex++;
                        }
                        that.addFilterToHistory = true;
                        that.parentCnt.actions["nextFilterAct"]?.enabled(that.currFilterHistoryIndex < that.filterHistory.length - 1);
                        that.parentCnt.actions["prevFilterAct"]?.enabled(that.currFilterHistoryIndex > 0);
                        let mesic = newFilter.filter["Mesic"];
                        if (mesic === null)
                            mesic = -1;
                        let myfilter = $.extend(true, {}, newFilter);
                        myfilter.filter["Mesic"] = undefined;
                        let req = { rok: { o: "=", v: that.Globals.EkoParams?.Rok }, ico: { o: "=", v: that.Globals.EkoParams?.ICO }, mesic: { o: "<=", v: mesic }, Maska: myfilter.filter };
                        var newRequest = $.extend(true, {}, req);
                        return next(newRequest);
                    });
                    //var newRequest = $.extend(true, {}, req);
                    //var maska: Gordic.Uct.Interface.GUcrKonsolidaceStavyListFilterDto = {};
                    //var filter = that.GetFilter().gfilterpanel('getCurrentData') || {};
                    //return this.$grid.ggridserverfilter<Gordic.Uct.Interface.GUcrKonsolidaceStavyListFilterDto>("collect", maska)
                    //    .then((newFilter) => {
                    //        if (that.addFilterToHistory) {
                    //            if (that.currFilterHistoryIndex !== that.filterHistory.length - 1)
                    //                that.filterHistory.splice(that.currFilterHistoryIndex + 1);
                    //            that.filterHistory.push(maska as any);
                    //            that.currFilterHistoryIndex++;
                    //        }
                    //        that.addFilterToHistory = true;
                    //        that.parentCnt.actions["nextFilterAct"]?.enabled(that.currFilterHistoryIndex < that.filterHistory.length - 1);
                    //        that.parentCnt.actions["prevFilterAct"]?.enabled(that.currFilterHistoryIndex > 0);
                    //        let maska = newFilter;
                    //        if (filter.Mesic === null)
                    //            filter.Mesic = -1;
                    //        let myfiltr = { rok: { o: "=", v: that.Globals.EkoParams?.Rok }, ico: { o: "=", v: that.Globals.EkoParams?.ICO }, mesic: { o: "<=", v: filter.Mesic }, Maska: newFilter } as any;
                    //        newRequest.filters = myfiltr;
                    //        return next(newRequest);
                    //    }
                    //    );
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
                        throw "Filtr nenalezen";
                    //return content?.element.find(".js-filtr.gfilterpanel");
                    //return $(".js-filtr");
                }
                /**
                 * Vytvoreni filtrovaciho panelu
                 * @param that
                 */
                createFilterPanel(that) {
                    this.$filterPanel = $.newDiv("js-filtr")
                        .appendTo(this.parentCnt.element)
                        .gfilterpanel({
                        helperCustomizer: function (data) {
                            var polSort = data.sort(function (a, b) { return a.name <= b.name; });
                            return polSort;
                        },
                        forms: [that.CreateFilterZalozka()],
                        favoriteLayoutDescriptor: "L4M3S1 L12-12-0 M-12-12-0 S-12-12-0",
                        //favoriteLayoutDescriptor:"L1M1S1 L12-12-0 M-12-12-0 S-12-12-0",
                        filterStorageService: new Gordic.Gin.FilterStorageService.Store(),
                        filterViewModeUserSettings: [FilterViewMode.Detail /*, FilterViewMode.Normal*/],
                        //simpleModeAutoLoadAfterCreatePanel: false,
                        //userDefaultFilter: true,
                        // 01.03.2021 - TFeik
                        // Nahrazení obsolete parametrů.
                        filterViewMode: FilterViewMode.Simple,
                        //simpleMode: true,
                        primaryButtonBehaviour: "AlwaysPrimary",
                        //favoriteLayoutDescriptor: "L4M3S1",
                        clearFilterButtonVisible: "AlwaysVisible",
                        //autoLoadAfterChoseFilter: true,
                        autoLoadAfterCreatePanel: false,
                        //autoLoadAfterClearFilter: true,
                        //filterHelperItemTemplate: "<b>{nazev}</b>",
                        //textItemTemplate: "{nazev}",
                        //apply: function (event, obj) {
                        //    console.log("filterForm.apply", obj);
                        //    that.parentCnt.log.trace("filterForm.apply", obj);
                        //    if (that.loadingData) return;
                        //    var view = that.$grid.ggrid("getView");
                        //    view.requestData(obj.filter);
                        //    view.getLoadingPromise().always(() => {
                        //        that.loadingData = false
                        //    });
                        //},
                        reset: (ev, data) => {
                            //that.loadingData = true;
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            grid.ggridserverfilter("clear");
                            //this.$filterPanel.gfilterpanel("clear");
                            //that.loadingData = false;
                        }
                    });
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
                    var filterFormDef = new Gordic.Forms.Form({ opened: true, layoutDescriptor: "L4M3S12, L-12-12-0, M-12-11-1, S-12-11-1", tabLabel: "jres:30250052" }) //RC 30250052 : Filtr
                        .addSection()
                        .addRow({ label: "jres:30250124" }) //RC 30250124 : Měsíc
                        .addField("gselectbox", Gordic.Prefabs.Select.ucrMesic(), {
                        name: "Mesic",
                        //customClass: "w-4",
                        model: "model.Mesic=value.mesic",
                        emptyValue: { mesic: null, mesic_txt: " " },
                        serverFilters: { rok: that.Globals.EkoParams?.Rok, mesic: "< 13", pseudo: false /*new Gordic.Forms.Dependency("Rok", "rok", true) */ },
                        dropdown: true,
                        change: (ev, ctx) => {
                            //    this.onObdobiChanged();
                            //if (that.loading) return;
                            if (ctx.flags.valid) {
                                let grid = that.getGrid();
                                if (grid == null)
                                    return;
                                let view = grid.ggrid("getView");
                                view.requestData();
                                view.getLoadingPromise().always(() => {
                                    that.loadingData = false;
                                });
                            }
                        },
                        flag: Gordic.Prefabs.Field.Flags.required
                    });
                    return filterFormDef;
                }
                /**
                 * Prepocet
                 * */
                Recalculation() {
                    let that = this;
                    that.parentCnt.beginOperation("jres:30250316"); //RC 30250316 : Probíhá přepočet...
                    that.parentCnt.isl.UcrKonsolidaceStavy.recalculation()
                        .get()
                        .then(() => {
                        that.parentCnt.showFlash({ label: "jres:30250317", state: "success" }); //RC 30250317 : Přepočet úspěšně proveden
                        return;
                        return;
                    })
                        .always(() => that.parentCnt.endOperation());
                }
                /**
                 * Definice menu
                 * @param typUlohy
                 */
                DefineMenuBar(typUlohy) {
                    let menu = new Array();
                    if (this.rememberHistory) {
                        menu.push({ action: this.parentCnt.actions.prevFilterAct, favorite: true, align: "opposite" });
                        menu.push({ action: this.parentCnt.actions.nextFilterAct, favorite: true, align: "opposite" });
                    }
                    menu.push({ action: this.parentCnt.actions.actPrepocet, favorite: true });
                    return menu;
                }
                /**
                 * Zobrazeni detailu - budu zobrazovat zapisy
                 * @param row
                 */
                showDetail(row) {
                    return;
                }
            }
            WebClient.GSeznamEkoStavyKonsolidace = GSeznamEkoStavyKonsolidace;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUVrb1N0YXZ5S29uc29saWRhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU2V6bmFtRWtvU3RhdnlLb25zb2xpZGFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxNQUFNLENBeVhmO0FBelhELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXlYbkI7SUF6WGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXlYN0I7UUF6WG9CLFdBQUEsU0FBUztZQUUxQixNQUFhLDBCQUEyQixTQUFRLFVBQUEscUJBQXFCO2dCQU1qRSxZQUFZLE9BQXFDO29CQUM3QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBSG5CLGlHQUFpRztvQkFDakcsZUFBVSxHQUFHLEVBQUUsSUFBSSxFQUFFLDRCQUE0QixFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLCtCQUErQixFQUFFLENBQUM7b0JBR3hHLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO29CQUMzQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO29CQUMvQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztvQkFDNUIsNENBQTRDO29CQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxDQUFDO29CQUM5RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNoRSxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDOUIsQ0FBQztnQkFDTSxjQUFjO29CQUNqQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUE7b0JBQ3RCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDO3dCQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQTtnQkFHaEgsQ0FBQztnQkFDRCw2RUFBNkU7Z0JBQzdFLHNDQUFzQztnQkFDdEMsZUFBZTtnQkFDZixnRUFBZ0U7Z0JBQ2hFLHdFQUF3RTtnQkFFeEUsaURBQWlEO2dCQUNqRCwyQ0FBMkM7Z0JBQzNDLGlDQUFpQztnQkFDakMsU0FBUztnQkFDVCw0QkFBNEI7Z0JBQzVCLDRGQUE0RjtnQkFDNUYsMkJBQTJCO2dCQUMzQixHQUFHO2dCQUNIOzs7cUJBR0s7Z0JBQ0UsYUFBYSxDQUFDLElBQXlCLEVBQUUsVUFBa0I7Z0JBRWxFLENBQUM7Z0JBRU0sZ0JBQWdCO29CQUduQixJQUFJLFlBQVksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFzQyxDQUFDO29CQUVwRixZQUFZLENBQUMsYUFBYSxDQUFDO3dCQUN2QixJQUFJLEVBQUUsVUFBVTt3QkFDaEIsT0FBTyxFQUFFLGVBQWUsRUFBRSx1QkFBdUI7d0JBQ2pELFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxFQUFFLHVCQUF1Qjt3QkFDekgsS0FBSyxFQUFFLEdBQUc7cUJBQ2IsQ0FBQyxDQUFDO29CQUNILFlBQVksQ0FBQyxhQUFhLENBQUM7d0JBQ3ZCLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxlQUFlLEVBQUUscUJBQXFCO3dCQUMvQyxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxxQkFBcUI7d0JBQ3RILEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUMsQ0FBQztvQkFDSCxZQUFZLENBQUMsYUFBYSxDQUFDO3dCQUN2QixJQUFJLEVBQUUsS0FBSzt3QkFDWCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRzt3QkFDbEMsV0FBVyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUc7d0JBQ3BDLEtBQUssRUFBRSxFQUFFO3dCQUNULG1CQUFtQjt3QkFDbkIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7d0JBQzlDLHNFQUFzRTt3QkFDdEUsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQzs0QkFDekMsR0FBRyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsUUFBUTs0QkFDeEUsVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUzs0QkFDbEosS0FBSyxFQUFFLEtBQUs7NEJBQ1osUUFBUSxFQUFFLEtBQUs7eUJBQ3BCLENBQUM7cUJBQ0wsQ0FBQyxDQUFDO29CQU1ILFlBQVksQ0FBQyxpQkFBaUIsQ0FBQzt3QkFDM0IsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsT0FBTyxFQUFFLGVBQWUsRUFBRSxrQ0FBa0M7d0JBQzVELEtBQUssRUFBRSxHQUFHO3dCQUNWLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLGtCQUFrQjtxQkFDdEgsQ0FBQyxDQUFDO29CQUNILFlBQVksQ0FBQyxpQkFBaUIsQ0FBQzt3QkFDM0IsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsT0FBTyxFQUFFLGVBQWUsRUFBRSxtQ0FBbUM7d0JBQzdELEtBQUssRUFBRSxHQUFHO3dCQUNWLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLG1CQUFtQjtxQkFDdkgsQ0FBQyxDQUFDO29CQUNILFlBQVksQ0FBQyxpQkFBaUIsQ0FBQzt3QkFDM0IsSUFBSSxFQUFFLFdBQVc7d0JBQ2pCLE9BQU8sRUFBRSxlQUFlLEVBQUUsd0JBQXdCO3dCQUNsRCxLQUFLLEVBQUUsR0FBRzt3QkFDVixZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyx3QkFBd0I7cUJBQzlILENBQUMsQ0FBQztvQkFJSCxPQUFPLFlBQW1CLENBQUM7Z0JBQy9CLENBQUM7Z0JBRU0sY0FBYyxDQUFDLEVBQW1HO29CQUNySCxJQUFJLFFBQVEsR0FBMkI7d0JBQ25DLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLHVCQUF1QjtxQkFDMUUsQ0FBQTtvQkFFRCxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQzFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFRLENBQUMsQ0FBQyxDQUFDLElBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBR2hGLE9BQU8sUUFBUSxDQUFDO2dCQUNwQixDQUFDO2dCQUVNLGFBQWE7b0JBQ2hCLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFFdEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQzVCLFdBQVcsRUFBRTs0QkFDVCxJQUFJLEVBQUUsYUFBYTs0QkFDbkIsa0JBQWtCOzRCQUNsQixPQUFPLEVBQUUsSUFBQSxPQUFPLENBQUMsV0FBVyxDQUFDLGVBQWUsNkRBQXFEOzRCQUNqRyxPQUFPLEVBQUUsSUFBQSxPQUFPLENBQUMsV0FBVyxDQUFDLGVBQWUsNkRBQXFEOzRCQUNqRyxPQUFPLEVBQUUsZUFBZSxFQUFFLDhCQUE4Qjs0QkFDeEQsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7Z0NBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs0QkFDekIsQ0FBQzt5QkFDSjtxQkFHSixDQUNBLENBQUM7Z0JBR04sQ0FBQztnQkFFRDs7OzttQkFJRztnQkFDTyxTQUFTLENBQUMsTUFBc0QsRUFBRSxVQUErQjtvQkFDdkcsSUFBSSxLQUFLLEdBQUcsTUFBbUQsQ0FBQztvQkFDaEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsa0JBQWtCO29CQUM1RixJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLE9BQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxtQkFBbUI7b0JBQzdGLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLHdCQUF3QjtnQkFFdEcsQ0FBQztnQkFDRDs7Ozs7b0JBS0k7Z0JBQ00sYUFBYSxDQUFDLElBQVUsRUFBRSxHQUE0QixFQUFFLElBQXdJO29CQUV0TSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzt5QkFDbEUsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7d0JBQ2hCLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7NEJBQzFCLElBQUksSUFBSSxDQUFDLHNCQUFzQixLQUFLLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUM7Z0NBQzdELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFFL0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQ25DLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO3dCQUNsQyxDQUFDO3dCQUNELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7d0JBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQzlHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ2xGLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxNQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3ZDLElBQUksS0FBSyxLQUFLLElBQUk7NEJBQ2QsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNmLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQzt3QkFDN0MsUUFBUSxDQUFDLE1BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTLENBQUM7d0JBQ3RDLElBQUksR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxNQUFNLEVBQVMsQ0FBQzt3QkFDNUssSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUN6QyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDNUIsQ0FBQyxDQUNBLENBQUM7b0JBQ04sMkNBQTJDO29CQUMzQyx5RUFBeUU7b0JBQ3pFLHFFQUFxRTtvQkFDckUsK0dBQStHO29CQUMvRyw0QkFBNEI7b0JBRTVCLHdDQUF3QztvQkFDeEMsZ0ZBQWdGO29CQUNoRiw2RUFBNkU7b0JBRTdFLG9EQUFvRDtvQkFDcEQsNENBQTRDO29CQUM1QyxXQUFXO29CQUNYLHlDQUF5QztvQkFDekMsd0hBQXdIO29CQUN4SCw0RkFBNEY7b0JBQzVGLGdDQUFnQztvQkFHaEMsb0NBQW9DO29CQUNwQyxnQ0FBZ0M7b0JBRWhDLDJMQUEyTDtvQkFFM0wsdUNBQXVDO29CQUN2QyxrQ0FBa0M7b0JBQ2xDLE9BQU87b0JBQ1AsUUFBUTtnQkFFWixDQUFDO2dCQUVEOzs7O21CQUlHO2dCQUNLLFNBQVM7b0JBQ2IsV0FBVztvQkFDWCxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDO3dCQUM1RCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7O3dCQUV6QixNQUFNLGlCQUFpQixDQUFDO29CQUM1Qix5REFBeUQ7b0JBQ3pELHdCQUF3QjtnQkFDNUIsQ0FBQztnQkFDRDs7O21CQUdHO2dCQUNJLGlCQUFpQixDQUFDLElBQVU7b0JBRS9CLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7eUJBQ25DLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQzt5QkFDaEMsWUFBWSxDQUFDO3dCQUNWLGdCQUFnQixFQUFFLFVBQVUsSUFBSTs0QkFDNUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDdEUsT0FBTyxPQUFPLENBQUM7d0JBQ25CLENBQUM7d0JBRUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7d0JBQ3JDLHdCQUF3QixFQUFFLHFDQUFxQzt3QkFDL0QsaUVBQWlFO3dCQUNqRSxvQkFBb0IsRUFBRSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsS0FBSyxFQUFFO3dCQUNqRSwwQkFBMEIsRUFBRSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUEsMkJBQTJCLENBQUM7d0JBQzlFLDRDQUE0Qzt3QkFDNUMsMEJBQTBCO3dCQUMxQixxQkFBcUI7d0JBQ3JCLGdDQUFnQzt3QkFDaEMsY0FBYyxFQUFFLGNBQWMsQ0FBQyxNQUFNO3dCQUNyQyxtQkFBbUI7d0JBQ25CLHNCQUFzQixFQUFFLGVBQWU7d0JBQ3ZDLHFDQUFxQzt3QkFDckMsd0JBQXdCLEVBQUUsZUFBZTt3QkFDekMsaUNBQWlDO3dCQUNqQyx3QkFBd0IsRUFBRSxLQUFLO3dCQUMvQixpQ0FBaUM7d0JBQ2pDLDZDQUE2Qzt3QkFDN0MsOEJBQThCO3dCQUM5QixnQ0FBZ0M7d0JBQ2hDLDJDQUEyQzt3QkFDM0Msd0RBQXdEO3dCQUN4RCxtQ0FBbUM7d0JBQ25DLDZDQUE2Qzt3QkFDN0MsbUNBQW1DO3dCQUNuQyw2Q0FBNkM7d0JBQzdDLGtDQUFrQzt3QkFDbEMsU0FBUzt3QkFFVCxJQUFJO3dCQUNKLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRTs0QkFDaEIsMEJBQTBCOzRCQUMxQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQzFCLElBQUksSUFBSSxJQUFJLElBQUk7Z0NBQUUsT0FBUTs0QkFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFBOzRCQUMvQiwwQ0FBMEM7NEJBQzFDLDJCQUEyQjt3QkFFL0IsQ0FBQztxQkFDSixDQUFDLENBQUM7Z0JBQ1gsQ0FBQztnQkFDRDs7Ozs7O2tCQU1FO2dCQUNNLG1CQUFtQjtvQkFDdkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLGFBQWEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSwwQ0FBMEMsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBRSxxQkFBcUI7eUJBRXRLLFVBQVUsRUFBRTt5QkFDWixNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxxQkFBcUI7eUJBQ3hELFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7d0JBQ3RELElBQUksRUFBRSxPQUFPO3dCQUViLHFCQUFxQjt3QkFDckIsS0FBSyxFQUFFLHlCQUF5Qjt3QkFDaEMsVUFBVSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO3dCQUMzQyxhQUFhLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQSxvREFBb0QsRUFBRTt3QkFDckksUUFBUSxFQUFFLElBQUk7d0JBQ2QsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFOzRCQUNoQiw2QkFBNkI7NEJBQzdCLDJCQUEyQjs0QkFDM0IsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO2dDQUNsQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0NBQzFCLElBQUksSUFBSSxJQUFJLElBQUk7b0NBQUUsT0FBUTtnQ0FDMUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztnQ0FDakMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dDQUNuQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO29DQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQTtnQ0FDNUIsQ0FBQyxDQUFDLENBQUM7NEJBQ1AsQ0FBQzt3QkFDTCxDQUFDO3dCQUNELElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUTtxQkFDNUMsQ0FDQSxDQUVBO29CQUdMLE9BQU8sYUFBYSxDQUFDO2dCQUN6QixDQUFDO2dCQUNEOztxQkFFSztnQkFDRyxhQUFhO29CQUNqQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsbUNBQW1DO29CQUNuRixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUU7eUJBQ2pELEdBQUcsRUFBRTt5QkFDTCxJQUFJLENBQUMsR0FBRyxFQUFFO3dCQUNQLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLHlDQUF5Qzt3QkFDakgsT0FBTzt3QkFDUCxPQUFPO29CQUNYLENBQUMsQ0FBQzt5QkFDRCxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUMzQztnQkFDVCxDQUFDO2dCQUNEOzs7bUJBR0c7Z0JBQ08sYUFBYSxDQUFDLFFBQXFEO29CQUN6RSxJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssRUFBYyxDQUFDO29CQUNuQyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzt3QkFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQzt3QkFDL0YsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztvQkFDbkcsQ0FBQztvQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFFMUUsT0FBTyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7Z0JBRUQ7OzttQkFHRztnQkFDTyxVQUFVLENBQUMsR0FBeUM7b0JBQzFELE9BQU87Z0JBQ1gsQ0FBQzthQUtKO1lBbFhZLG9DQUEwQiw2QkFrWHRDLENBQUE7UUFLTCxDQUFDLEVBelhvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUF5WDdCO0lBQUQsQ0FBQyxFQXpYZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBeVhuQjtBQUFELENBQUMsRUF6WFMsTUFBTSxLQUFOLE1BQU0sUUF5WGYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlVjci5XZWJDbGllbnQge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBHU2V6bmFtRWtvU3RhdnlLb25zb2xpZGFjZSBleHRlbmRzIEdTZXpuYW1Fa29aYXpuYW11QmFzZSBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcbiAgXHJcbiAgICAgICBcclxuXHJcbiAgICAgICAgLyoqIExpbWl0IHBvY3R1IG5hY2l0YW55Y2ggemF6bmFtdSwgcG9rdWQgbmVkb2pkZSBrIHBvdHZyemVuaSwgemUgdXppdmF0ZWwgY2hjZSBqaXQgcHJlcyBsaW1pdCAqL1xyXG4gICAgICAgIGxvZ09wdGlvbnMgPSB7IG5hbWU6IFwiR1Nlem5hbUVrb1N0YXZ5S29uc29saWRhY2VcIiwgYXV0aG9yQ29kZTogMzAyLCBmaWxlOiBcIkdTZXpuYW1Fa29TdGF2eUtvbnNvbGlkYWNlLnRzXCIgfTtcclxuICAgICAgICBjb25zdHJ1Y3Rvcihjb250ZW50OiBHU2V6bmFtRWtvWmF6bmFtdUJhc2VDb250ZW50KSB7XHJcbiAgICAgICAgICAgIHN1cGVyKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLnBvdXppdmFuU3RydWtQb3BpcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnBvdm9sZW5OYWhsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zb3VjZXRWZVN0YXR1c0JhcnUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnJlbWVtYmVySGlzdG9yeSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNlIHRhc2t1IHBybyBzZXpuYW0gYSBuYWN0ZW5pIHBvY3R1XHJcbiAgICAgICAgICAgIHRoaXMudGFza0xpc3QgPSB0aGlzLnBhcmVudENudC5pc2wuVWNyS29uc29saWRhY2VTdGF2eS5saXN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudGFza0NvdW50ID0gdGhpcy5wYXJlbnRDbnQuaXNsLlVjcktvbnNvbGlkYWNlU3RhdnkuY291bnQoKTtcclxuICAgICAgICAgICAgdGhpcy5BdXRvTG9hZERhdGEgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5vbkNvbnRlbnRSZWFkeSgpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudENudFtcInNlbGVjdGVkTW9udGhcIl0gPiAwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuZmluZEZpZWxkcyhcIk1lc2ljXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgbWVzaWM6IHRoaXMucGFyZW50Q250W1wic2VsZWN0ZWRNb250aFwiXSB9LCBmYWxzZSlcclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvL3Byb3RlY3RlZCBtb3ZlRmlsdGVyKGN1cnJGaWx0ZXI6IEdTZXpuYW1Fa29aYXpuYW11R2V0RGF0YUZpbHRlckR0byk6IHZvaWQge1xyXG4gICAgICAgIC8vICAgIHRoaXMuYWRkRmlsdGVyVG9IaXN0b3J5ID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgZGVidWdnZXI7XHJcbiAgICAgICAgLy8gICAgdGhpcy4kZ3JpZC5nZ3JpZHNlcnZlcmZpbHRlcihcImFwcGx5XCIsIGN1cnJGaWx0ZXIuZmlsdGVyISk7XHJcbiAgICAgICAgLy8gICAgbGV0IG1lc2ljID0gdGhpcy5wYXJlbnRDbnQuZmluZEZpZWxkcyhcIk1lc2ljXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAvLyAgICBsZXQgbmV3bWVzaWMgPSBjdXJyRmlsdGVyLmZpbHRlciFbXCJNZXNpY1wiXTtcclxuICAgICAgICAvLyAgICAvL2lmICh0eXBlb2YgbmV3bWVzaWMgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgLy8gICAgLy8gICAgdGhpcy5kb0ZpbHRlckNsaWNrKCk7XHJcbiAgICAgICAgLy8gICAgLy99XHJcbiAgICAgICAgLy8gICAgaWYgKG1lc2ljICE9IG5ld21lc2ljKVxyXG4gICAgICAgIC8vICAgICAgICB0aGlzLnBhcmVudENudC5maW5kRmllbGRzKFwiTWVzaWNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBtZXNpYzogbmV3bWVzaWMgfSwgZmFsc2UpO1xyXG4gICAgICAgIC8vICAgIHRoaXMuZG9GaWx0ZXJDbGljaygpO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuaSBwcmlzdHVwbm9zdGkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIG5hc3RhdmVuaUFrY2koZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PiwgcG9jZXRSYWRrdTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxhbnk+IHtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgbXlHcmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkVrby5JbnRlcmZhY2UuR1JlZ2lzdHJaUER0bz4oKTtcclxuXHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaWNvX2tvbnNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDMxMlwiLCAvL1JDIDMwMjUwMzEyIDogUGFydG5lclxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpY29fa29uc1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzMTJcIiB9KSwgLy9SQyAzMDI1MDMxMiA6IFBhcnRuZXJcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImlkX2tvbnNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDMxNFwiLCAvL1JDIDMwMjUwMzE0IDogT2tydWhcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaWRfa29uc1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzMTRcIiB9KSwgLy9SQyAzMDI1MDMxNCA6IE9rcnVoXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ1Y3NcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuR2xvYmFscy5aa3JhdGt5Py5VY3MsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5HbG9iYWxzLlRleHR5Py5VY3MsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJ1Y3NcIiksXHJcbiAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnVjc0ludGVydmFsKHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MpXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51Y3NJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLmljbywgYWt0UHJvaGw6IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MuYWt0UHJvaGxcclxuICAgICAgICAgICAgICAgICAgICAsIG9ubHlBY3RpdmU6IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3Mub25seUFjdGl2ZSwgY2FwdGlvbjogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5jYXB0aW9uLCBuYW1lOiBcInVjc1wiLCBmaXJzdEZpZWxkOiB1bmRlZmluZWQsIHNlY29uZEZpZWxkOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAsIG1vZGVsOiBcInVjc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBkaXNhYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImMwX2tvbnNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDIxMVwiLCAvL1JDIDMwMjUwMjExIDogTUQgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBfa29uc1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAyMTFcIiB9KSAvL1JDIDMwMjUwMjExIDogTURcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImMxX2tvbnNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDIxMlwiLCAvL1JDIDMwMjUwMjEyIDogRGFsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMxX2tvbnNcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjEyXCIgfSkgLy9SQyAzMDI1MDIxMiA6IERhbFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBjMV9rb25zXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyMTNcIiwgLy9SQyAzMDI1MDIxMyA6IE1EIC0gRGFsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBjMV9rb25zXCIsIGNhcHRpb246IFwianJlczozMDI1MDIxM1wiIH0pIC8vUkMgMzAyNTAyMTMgOiBNRCAtIERhbFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG15R3JpZEZvcm1hdCBhcyBhbnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlUHJvZmlsZXMoZ2Y6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbVphcGlzdVN0YXZ1RHRvLyomR1Nlem5hbVphcGlzdVN0YXZ1RHRvKi8+KTogSUdTZXpuYW1aYXBpc3VQcm9maWxlcyB7XHJcbiAgICAgICAgICAgIGxldCBwcm9maWxlczogSUdTZXpuYW1aYXBpc3VQcm9maWxlcyA9IHtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHsgbmFtZTogXCJqcmVzOjMxMTAwMjMyXCIsIGNvbHVtbnM6IHt9IH0gLy9SQyAzMTEwMDIzMiA6IFbDvWNob3rDrVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZi5jb2x1bW5zLmZpbHRlcigoYykgPT4geyByZXR1cm4gIWMuaGlkZGVuOyB9KVxyXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGMpID0+IHsgcHJvZmlsZXMuZGVmYXVsdC5jb2x1bW5zIVtjLm5hbWUhXSA9IHsgaGlkZGVuOiBmYWxzZSB9IH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9maWxlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVBY3Rpb25zKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0UHJlcG9jZXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFByZXBvY2V0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pY29uOiBcImdpLWxpc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBHbG9iYWxzLkdVY3JHbG9iYWxzLlJhZF9Lb25zb2xpZGFjZSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclpvYnJhemVuaVZkdS5Bbm9FZGl0YWNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IEdsb2JhbHMuR1Vjckdsb2JhbHMuUmFkX0tvbnNvbGlkYWNlID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyWm9icmF6ZW5pVmR1LkFub0VkaXRhY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzE1XCIsIC8vUkMgMzAyNTAzMTUgOiBQxZllcG/EjWV0IMO6cGxuw71cclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuUmVjYWxjdWxhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbmkgc3VtYWNuaWhvIHJhZGt1XHJcbiAgICAgICAgICogQHBhcmFtIHN1bVJvd1xyXG4gICAgICAgICAqIEBwYXJhbSAkc291Y3R5U3BuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIHNldFN1bUJhcihzdW1Sb3c6IE1ldGFSb3c8SUdTZXpuYW1aYXBpc3VTdGF2dUR0b1dpdGhUYWJTZXR0aW5ncz4sICRzb3VjdHlTcG46IEpRdWVyeTxIVE1MRWxlbWVudD4pIHtcclxuICAgICAgICAgICAgbGV0IHJhZGVrID0gc3VtUm93IGFzIE1ldGFSb3c8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdGFrb25EdG8+O1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1hdFN1bXkoXCJqcmVzOjMxMTAwMDU2XCIsIHJhZGVrLmRhdGE/LmMwX2tvbnMhLCAkc291Y3R5U3BuLCBcIiwgXCIpOyAvL1JDIDMxMTAwMDU2IDogTURcclxuICAgICAgICAgICAgdGhpcy5mb3JtYXRTdW15KFwianJlczozMTEwMDA1N1wiLCByYWRlay5kYXRhPy5jMV9rb25zISwgJHNvdWN0eVNwbiwgXCIsIFwiKTsgLy9SQyAzMTEwMDA1NyA6IERhbFxyXG4gICAgICAgICAgICB0aGlzLmZvcm1hdFN1bXkoXCJqcmVzOjMxMTAwMDU4XCIsIHJhZGVrLmRhdGE/LmMwYzFfa29ucyEsICRzb3VjdHlTcG4sIFwiXCIpOyAvL1JDIDMxMTAwMDU4IDogTUQgLSBEYWxcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgKiBOYWN0aSBmaWx0cnlcclxuICAgICAgICAgICogQHBhcmFtIHRoYXRcclxuICAgICAgICAgICogQHBhcmFtIHJlcVxyXG4gICAgICAgICAgKiBAcGFyYW0gbmV4dFxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0RmlsdGVyRGF0YSh0aGF0OiB0aGlzLCByZXE6IElzbC5HU2VydmljZUxpc3RSZXF1ZXN0LCBuZXh0OiBJc2wuVGFza1J1bnRpbWVOZXh0PElzbC5HU2VydmljZUxpc3RSZXF1ZXN0LCBJc2wuR1NlcnZpY2VMaXN0UmVzcG9uc2U8YW55Pj4gfCBJc2wuVGFza1J1bnRpbWVOZXh0PElzbC5HU2VydmljZUxpc3RSZXF1ZXN0LCBudW1iZXI+KTogSXNsLkdTZXJ2aWNlTGlzdFJlc3BvbnNlPGFueT4gfCBKUXVlcnlQcm9taXNlPElzbC5HU2VydmljZUxpc3RSZXNwb25zZTxhbnk+PiB8IEpRdWVyeVByb21pc2U8bnVtYmVyPiB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5nZXRGaWx0ZXIodGhhdC4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q3VycmVudERhdGFcIikpXHJcbiAgICAgICAgICAgICAgICAudGhlbigobmV3RmlsdGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuYWRkRmlsdGVyVG9IaXN0b3J5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmN1cnJGaWx0ZXJIaXN0b3J5SW5kZXggIT09IHRoYXQuZmlsdGVySGlzdG9yeS5sZW5ndGggLSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maWx0ZXJIaXN0b3J5LnNwbGljZSh0aGF0LmN1cnJGaWx0ZXJIaXN0b3J5SW5kZXggKyAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmlsdGVySGlzdG9yeS5wdXNoKG5ld0ZpbHRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY3VyckZpbHRlckhpc3RvcnlJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFkZEZpbHRlclRvSGlzdG9yeSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuYWN0aW9uc1tcIm5leHRGaWx0ZXJBY3RcIl0/LmVuYWJsZWQodGhhdC5jdXJyRmlsdGVySGlzdG9yeUluZGV4IDwgdGhhdC5maWx0ZXJIaXN0b3J5Lmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmFjdGlvbnNbXCJwcmV2RmlsdGVyQWN0XCJdPy5lbmFibGVkKHRoYXQuY3VyckZpbHRlckhpc3RvcnlJbmRleCA+IDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtZXNpYyA9IG5ld0ZpbHRlci5maWx0ZXIhW1wiTWVzaWNcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1lc2ljID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNpYyA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBteWZpbHRlciA9ICQuZXh0ZW5kKHRydWUsIHt9LCBuZXdGaWx0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG15ZmlsdGVyLmZpbHRlciFbXCJNZXNpY1wiXSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVxID0geyByb2s6IHsgbzogXCI9XCIsIHY6IHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LlJvayB9LCBpY286IHsgbzogXCI9XCIsIHY6IHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LklDTyB9LCBtZXNpYzogeyBvOiBcIjw9XCIsIHY6IG1lc2ljIH0sIE1hc2thOiBteWZpbHRlci5maWx0ZXIgfSBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1JlcXVlc3QgPSAkLmV4dGVuZCh0cnVlLCB7fSwgcmVxKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dChuZXdSZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIC8vdmFyIG5ld1JlcXVlc3QgPSAkLmV4dGVuZCh0cnVlLCB7fSwgcmVxKTtcclxuICAgICAgICAgICAgLy92YXIgbWFza2E6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JLb25zb2xpZGFjZVN0YXZ5TGlzdEZpbHRlckR0byA9IHt9O1xyXG4gICAgICAgICAgICAvL3ZhciBmaWx0ZXIgPSB0aGF0LkdldEZpbHRlcigpLmdmaWx0ZXJwYW5lbCgnZ2V0Q3VycmVudERhdGEnKSB8fCB7fTtcclxuICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy4kZ3JpZC5nZ3JpZHNlcnZlcmZpbHRlcjxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyS29uc29saWRhY2VTdGF2eUxpc3RGaWx0ZXJEdG8+KFwiY29sbGVjdFwiLCBtYXNrYSlcclxuICAgICAgICAgICAgLy8gICAgLnRoZW4oKG5ld0ZpbHRlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgICAgICBpZiAodGhhdC5hZGRGaWx0ZXJUb0hpc3RvcnkpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAodGhhdC5jdXJyRmlsdGVySGlzdG9yeUluZGV4ICE9PSB0aGF0LmZpbHRlckhpc3RvcnkubGVuZ3RoIC0gMSlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5maWx0ZXJIaXN0b3J5LnNwbGljZSh0aGF0LmN1cnJGaWx0ZXJIaXN0b3J5SW5kZXggKyAxKTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5maWx0ZXJIaXN0b3J5LnB1c2gobWFza2EgYXMgYW55KTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmN1cnJGaWx0ZXJIaXN0b3J5SW5kZXgrKztcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuYWRkRmlsdGVyVG9IaXN0b3J5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgICAgIHRoYXQucGFyZW50Q250LmFjdGlvbnNbXCJuZXh0RmlsdGVyQWN0XCJdPy5lbmFibGVkKHRoYXQuY3VyckZpbHRlckhpc3RvcnlJbmRleCA8IHRoYXQuZmlsdGVySGlzdG9yeS5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIHRoYXQucGFyZW50Q250LmFjdGlvbnNbXCJwcmV2RmlsdGVyQWN0XCJdPy5lbmFibGVkKHRoYXQuY3VyckZpbHRlckhpc3RvcnlJbmRleCA+IDApO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgbGV0IG1hc2thID0gbmV3RmlsdGVyO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICBpZiAoZmlsdGVyLk1lc2ljID09PSBudWxsKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGZpbHRlci5NZXNpYyA9IC0xO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgIGxldCBteWZpbHRyID0geyByb2s6IHsgbzogXCI9XCIsIHY6IHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LlJvayB9LCBpY286IHsgbzogXCI9XCIsIHY6IHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LklDTyB9LCBtZXNpYzogeyBvOiBcIjw9XCIsIHY6IGZpbHRlci5NZXNpYyB9LCBNYXNrYTogbmV3RmlsdGVyIH0gYXMgYW55O1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgIG5ld1JlcXVlc3QuZmlsdGVycyA9IG15ZmlsdHI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gbmV4dChuZXdSZXF1ZXN0KTtcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvLyAgICApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZyYWNpIG9iamVrdCBmaWx0cnVcclxuICAgICAgICAgKiBAcGFyYW0ge0dDb250ZW50fSBjb250ZW50XHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIEdldEZpbHRlcigpOiBKUXVlcnkge1xyXG4gICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICBpZiAoR29yZGljLlV0aWxzLldpZGdldEV4aXN0cyhcImdmaWx0ZXJwYW5lbFwiLCB0aGlzLiRmaWx0ZXJQYW5lbCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kZmlsdGVyUGFuZWw7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRocm93IFwiRmlsdHIgbmVuYWxlemVuXCI7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIGNvbnRlbnQ/LmVsZW1lbnQuZmluZChcIi5qcy1maWx0ci5nZmlsdGVycGFuZWxcIik7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuICQoXCIuanMtZmlsdHJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBmaWx0cm92YWNpaG8gcGFuZWx1XHJcbiAgICAgICAgICogQHBhcmFtIHRoYXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY3JlYXRlRmlsdGVyUGFuZWwodGhhdDogdGhpcyk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kZmlsdGVyUGFuZWwgPSAkLm5ld0RpdihcImpzLWZpbHRyXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5wYXJlbnRDbnQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZmlsdGVycGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlckN1c3RvbWl6ZXI6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb2xTb3J0ID0gZGF0YS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhLm5hbWUgPD0gYi5uYW1lOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBvbFNvcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAsIGZvcm1zOiBbdGhhdC5DcmVhdGVGaWx0ZXJaYWxvemthKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlTGF5b3V0RGVzY3JpcHRvcjogXCJMNE0zUzEgTDEyLTEyLTAgTS0xMi0xMi0wIFMtMTItMTItMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZmF2b3JpdGVMYXlvdXREZXNjcmlwdG9yOlwiTDFNMVMxIEwxMi0xMi0wIE0tMTItMTItMCBTLTEyLTEyLTBcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdG9yYWdlU2VydmljZTogbmV3IEdvcmRpYy5HaW4uRmlsdGVyU3RvcmFnZVNlcnZpY2UuU3RvcmUoKSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZVVzZXJTZXR0aW5nczogW0ZpbHRlclZpZXdNb2RlLkRldGFpbC8qLCBGaWx0ZXJWaWV3TW9kZS5Ob3JtYWwqL10sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zaW1wbGVNb2RlQXV0b0xvYWRBZnRlckNyZWF0ZVBhbmVsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvL3VzZXJEZWZhdWx0RmlsdGVyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIDAxLjAzLjIwMjEgLSBURmVpa1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5haHJhemVuw60gb2Jzb2xldGUgcGFyYW1ldHLFry5cclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2ltcGxlTW9kZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5QnV0dG9uQmVoYXZpb3VyOiBcIkFsd2F5c1ByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2Zhdm9yaXRlTGF5b3V0RGVzY3JpcHRvcjogXCJMNE0zUzFcIixcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckZpbHRlckJ1dHRvblZpc2libGU6IFwiQWx3YXlzVmlzaWJsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vYXV0b0xvYWRBZnRlckNob3NlRmlsdGVyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Mb2FkQWZ0ZXJDcmVhdGVQYW5lbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hdXRvTG9hZEFmdGVyQ2xlYXJGaWx0ZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9maWx0ZXJIZWxwZXJJdGVtVGVtcGxhdGU6IFwiPGI+e25hemV2fTwvYj5cIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHRJdGVtVGVtcGxhdGU6IFwie25hemV2fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vYXBwbHk6IGZ1bmN0aW9uIChldmVudCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgY29uc29sZS5sb2coXCJmaWx0ZXJGb3JtLmFwcGx5XCIsIG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5wYXJlbnRDbnQubG9nLnRyYWNlKFwiZmlsdGVyRm9ybS5hcHBseVwiLCBvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICh0aGF0LmxvYWRpbmdEYXRhKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFyIHZpZXcgPSB0aGF0LiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB2aWV3LnJlcXVlc3REYXRhKG9iai5maWx0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHZpZXcuZ2V0TG9hZGluZ1Byb21pc2UoKS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc2V0OiAoZXYsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmxvYWRpbmdEYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZHNlcnZlcmZpbHRlcihcImNsZWFyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5sb2FkaW5nRGF0YSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBmdW5jdGlvbiBDcmVhdGVGaWx0ZXJaYWxvemthXHJcbiAgICAgICAgKiAgICAgIFxyXG4gICAgICAgICogT2JlY25hIHphbG96a2FcclxuICAgICAgICAqIEBwYXJhbSB7R0NvbnRlbnR9IGNvbnRlbnRcclxuICAgICAgICAqIEByZXR1cm5zIHthbnl9XHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIENyZWF0ZUZpbHRlclphbG96a2EoKTogYW55IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZpbHRlckZvcm1EZWYgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBvcGVuZWQ6IHRydWUsIGxheW91dERlc2NyaXB0b3I6IFwiTDRNM1MxMiwgTC0xMi0xMi0wLCBNLTEyLTExLTEsIFMtMTItMTEtMVwiLCB0YWJMYWJlbDogXCJqcmVzOjMwMjUwMDUyXCIgfSkgIC8vUkMgMzAyNTAwNTIgOiBGaWx0clxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMjUwMTI0XCIgfSkgLy9SQyAzMDI1MDEyNCA6IE3Em3PDrWNcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnVjck1lc2ljKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIk1lc2ljXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vY3VzdG9tQ2xhc3M6IFwidy00XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuTWVzaWM9dmFsdWUubWVzaWNcIixcclxuICAgICAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiB7IG1lc2ljOiBudWxsLCBtZXNpY190eHQ6IFwiIFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogeyByb2s6IHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LlJvaywgbWVzaWM6IFwiPCAxM1wiLCBwc2V1ZG86IGZhbHNlLypuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJSb2tcIiwgXCJyb2tcIiwgdHJ1ZSkgKi8gfSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoaXMub25PYmRvYmlDaGFuZ2VkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHRoYXQubG9hZGluZykgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LmZsYWdzLnZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gZ3JpZC5nZ3JpZChcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmdldExvYWRpbmdQcm9taXNlKCkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgICAgICAgIDtcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyRm9ybURlZjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJlcG9jZXRcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgUmVjYWxjdWxhdGlvbigpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnBhcmVudENudC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAzMTZcIik7IC8vUkMgMzAyNTAzMTYgOiBQcm9iw61ow6EgcMWZZXBvxI1ldC4uLlxyXG4gICAgICAgICAgICB0aGF0LnBhcmVudENudC5pc2wuVWNyS29uc29saWRhY2VTdGF2eS5yZWNhbGN1bGF0aW9uKClcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LnNob3dGbGFzaCh7IGxhYmVsOiBcImpyZXM6MzAyNTAzMTdcIiwgc3RhdGU6IFwic3VjY2Vzc1wiIH0pOyAvL1JDIDMwMjUwMzE3IDogUMWZZXBvxI1ldCDDunNwxJvFoW7EmyBwcm92ZWRlblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB0aGF0LnBhcmVudENudC5lbmRPcGVyYXRpb24oKSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVmaW5pY2UgbWVudVxyXG4gICAgICAgICAqIEBwYXJhbSB0eXBVbG9oeVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBEZWZpbmVNZW51QmFyKHR5cFVsb2h5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlKTogTWVudVBhcmFtc1tdIHtcclxuICAgICAgICAgICAgbGV0IG1lbnUgPSBuZXcgQXJyYXk8TWVudVBhcmFtcz4oKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmVtZW1iZXJIaXN0b3J5KSB7XHJcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMucHJldkZpbHRlckFjdCwgZmF2b3JpdGU6IHRydWUsIGFsaWduOiBcIm9wcG9zaXRlXCIgfSk7XHJcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMubmV4dEZpbHRlckFjdCwgZmF2b3JpdGU6IHRydWUsIGFsaWduOiBcIm9wcG9zaXRlXCIgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFjdFByZXBvY2V0LCBmYXZvcml0ZTogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtZW51O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW5pIGRldGFpbHUgLSBidWR1IHpvYnJhem92YXQgemFwaXN5XHJcbiAgICAgICAgICogQHBhcmFtIHJvd1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBzaG93RGV0YWlsKHJvdz86IFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG5cclxuIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gXHJcbn0iXX0=
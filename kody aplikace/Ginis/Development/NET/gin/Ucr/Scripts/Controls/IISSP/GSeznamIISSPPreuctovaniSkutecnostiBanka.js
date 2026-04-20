"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            /**
             * Stavy konsolidace
             *
             * @author tkares
             * @since 484.1.0.69
             */
            class GSeznamIISSPPreuctovaniSkutecnostiBanka extends WebClient.GSeznamIISSPBase {
                onContentReady() {
                    super.onContentReady();
                }
                /**
                 * Vytvoreni akci
                 *
                 * */
                createActions() {
                    let that = this;
                    that.parentCnt.actions.addRange({
                        actStavy: {
                            name: "actStavy",
                            //icon: "gi-list",
                            enabled: false,
                            caption: "jres:30250405", //RC 30250405 : Stavy
                            run: (ev, ctx) => {
                                that.showStavy();
                            }
                        },
                        actDavky: {
                            name: "actDavky",
                            //icon: "gi-list",
                            enabled: false,
                            caption: "jres:30250406", //RC 30250406 : Dávky
                            run: (ev, ctx) => {
                                that.showDavky();
                            }
                        }
                    });
                }
                /**
                 * Zobrazeni stavu
                 *
                 * */
                showStavy() {
                    let title = "jres:31100224"; //RC 31100224 : Zápisy stavu
                    let that = this;
                    debugger;
                    //var filtr= this.getFilter();
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    let sel = grid.ggrid("getSelection", false);
                    if (sel.length !== 1)
                        return;
                    let row = sel[0];
                    //let typUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType;
                    let id;
                    let filter;
                    filter = {
                        bu_vl: { start: row.bu_vl?.trim(), end: row.bu_vl?.trim() },
                        sk_vl: { start: row.sk_vl?.trim(), end: row.sk_vl?.trim() },
                    };
                    id = "seznamIISSPPreuctovaniBankUcty#"; //NOTE: Musi byt stejne na MainApp.cs
                    that.parentCnt.navigate('Gordic.Ucr.WebClient.GSeznamIISSPBaseContent', {
                        ID: id,
                        TypUlohy: 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */,
                        FilterStavy: filter,
                        VolanoZUlohyUlohy: 18 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_BankovniUcty */,
                        CurrentRow: row,
                        StrictFilter: false,
                        //FilterStrPopis: f.filterStrPopis,
                        AutoLoadData: true,
                        title: title
                    });
                }
                /**
                 * Zobrazeni stavu
                 *
                 * */
                showDavky() {
                    let title = "jres:31100224"; //RC 31100224 : Zápisy stavu
                    let that = this;
                    //var filtr= this.getFilter();
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    let sel = grid.ggrid("getSelection", false);
                    if (sel.length !== 1)
                        return;
                    let row = sel[0];
                    //let typUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType;
                    let id;
                    let filter;
                    filter = {};
                    id = "seznamIISSPPreuctovaniRegistr#"; //NOTE: Musi byt stejne na MainApp.cs
                    that.parentCnt.navigate('Gordic.Ucr.WebClient.GSeznamIISSPBaseContent', {
                        ID: id,
                        TypUlohy: 19 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_RegistrDavek */,
                        FilterStavy: filter,
                        VolanoZUlohyUlohy: 18 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_BankovniUcty */,
                        CurrentRow: row,
                        StrictFilter: false,
                        //FilterStrPopis: f.filterStrPopis,
                        AutoLoadData: true,
                        title: title
                    });
                }
                /**
                 * Definice menubaru
                 * */
                DefineMenuBar() {
                    let menuPar = [{ action: this.parentCnt.actions.actStavy, favorite: true },
                        { action: this.parentCnt.actions.actDavky, favorite: true },
                    ];
                    return menuPar;
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                nastaveniAkci() {
                    let that = this;
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    // pokud neni grid, nic nedelej
                    if (that.parentCnt.closed)
                        return;
                    var view = grid.ggrid("getView");
                    let pocet = view.getCount();
                    // stavy
                    that.parentCnt.actions.actStavy?.update({
                        enabled: pocet > 0
                    });
                    // davky
                    that.parentCnt.actions.actDavky?.update({
                        enabled: pocet > 0
                    });
                }
                /**
                 *  Vytvoreni gridu
                 *
                 * */
                createGrid() {
                    let that = this;
                    let provider = new Gordic.Data.Provider(() => {
                        that.loadingData = true;
                        return that.loadData();
                    });
                    let view = new Gordic.Data.View([], {
                        processors: { provider: provider },
                        key: "rok,bu_vl,sk_vl"
                    });
                    var sloupce = that.createGridFormat();
                    //var defaultProfile = sloupce.columns;//sloupce.columns.filter((item) => item.name?.toLowerCase().indexOf("vlastnost") === -1)
                    $.newDiv(this.classGrid)
                        .appendTo(this.parentCnt.element)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        data: view,
                        columns: sloupce,
                        defaultProfile: { name: "default", columnList: sloupce.columns.map((c) => c.name).join(",") },
                        profiles: [
                            { name: "userProfile", columnList: sloupce.columns.map((c) => c.name).join(",") },
                        ],
                        profileVisible: false,
                        defaultAction: that.parentCnt.actions.actStavy
                    });
                }
                /**
                * function CreateFilterZalozka
                *
                * Obecna zalozka
                * @param {GContent} content
                * @returns {any}
                */
                createFilterZalozka() {
                    var that = this;
                    //var datMax = new Date(that.Globals.EkoParams?.Rok!, 11,31);// moment("31.12." + that.Globals.EkoParams?.Rok, "D.M.YYYY");
                    //var datMin = new Date(that.Globals.EkoParams?.Rok!, 0, 1);//moment("1.1." + that.Globals.EkoParams?.Rok, "D.M.YYYY");
                    var datMax = new Date(that.Globals.EkoParams?.Rok + "-12-31");
                    var datMin = new Date(that.Globals.EkoParams?.Rok + "-1-1");
                    var aktDatum = new Date(that.aktDatum);
                    var filterFormDef = new Gordic.Forms.Form({ opened: true, layoutDescriptor: "L4M3S12, L-12-12-0, M-12-11-1, S-12-11-1", tabLabel: "jres:30250052" }); //RC 30250052 : Filtr
                    filterFormDef.addSection()
                        .addRow({ label: "jres:30250347" }) //RC 30250347 : ke dni
                        .addField("gdatebox", {
                        name: "datumK",
                        minValue: datMin, //.toDate(),
                        maxValue: datMax, //.toDate(),
                        initialValue: aktDatum, //.toDate(),
                        //model: "model.datumK=value",
                        change: (ev, ctx) => {
                        },
                        valueType: "date"
                    });
                    return filterFormDef;
                }
                /**
                 * Nacteni Isl sluzby pro list
                 *
                 */
                loadISLList(rq) {
                    return this.parentCnt.isl.UcrRisreStavy.listBankovniUcty({ keDni: rq.filter.filters.datumK });
                }
                /**
                 * Vrat muj sestaveny filtr
                 *
                 * @returns
                 */
                getMyFilter(filterServer, filter) {
                    if (typeof filter.datumK === undefined || filter.datumK === null) {
                        return void 0;
                    }
                    return {
                        maska: filterServer, filter: { filters: filter }
                    };
                }
                ///**
                // *  Nacteni dat
                // */
                //public loadDataOld(): JQueryPromise<any> {
                //    var that = this;
                //    var def = $.Deferred();
                //    var maska: Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto = {};
                //    var filter = that.getFilter().gfilterpanel('getCurrentData');
                //    console.log("loaddata.filter", filter);
                //    //let view = this.$grid.ggrid("getView");
                //    let grid = this.getGrid();
                //    if (grid == null) return $.Deferred().reject().promise();
                //    grid.ggridserverfilter<Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto>("collect", maska)
                //        .then((filterServer) => {
                //            maska = filterServer;
                //            if (filter.Mesic === null)
                //                filter.Mesic = -1;
                //            debugger;
                //            if (typeof filter.datumK === undefined || filter.datumK === null) {
                //                return def.reject().promise();
                //            }                    
                //            Gordic.Isl.UcrRisreStavy.listBankovniUcty({ keDni: filter.datumK })
                //                .get()
                //                .then(function (result) {
                //                    debugger;
                //                    //at.setActions(result.ListValues?.length as any);
                //                    //that.loadingData = false;
                //                    that.nastaveniAkci();
                //                    return def.resolve(result);
                //                })
                //                .always(function () {
                //                    //that.loadingData = false;
                //                })
                //                ;
                //            return def.promise();
                //        }
                //    );
                //    return def.promise();
                //}
                /**
                 * Vytvoreni gridformatu dle predlohy
                 *
                 *
                 */
                createGridFormat() {
                    let that = this;
                    var myGridFormat = new Gordic.Data.GridFormat();
                    myGridFormat.addIconColumn({
                        name: "img_valid",
                        caption: "jres:30250410", //RC 30250410 : Validita
                        width: 39, // fixedWidth: true,
                        customClass: "center",
                        iconTemplate: function (data) {
                            if (data.as_buc === null || typeof data.as_buc === "undefined" || data.as_uct === null
                                || typeof data.as_uct === "undefined" || data.c0_buc === null || data.c0_uct === null || typeof data.c0_uct === "undefined" || data.c1_buc === null || data.c1_uct === null || typeof data.c1_uct === "undefined")
                                return {
                                    icon: "", text: "jres:30250407", //RC 30250407 : Nelze validovat
                                    //tooltip: "jres:30250289"
                                };
                            let KS_zust = parseDecimal(0);
                            KS_zust = KS_zust.plus(parseDecimal(data.as_buc)).minus(parseDecimal(data.as_uct));
                            let KS_kredit = parseDecimal(0);
                            KS_kredit = parseDecimal(data.c0_buc).minus(parseDecimal(data.c0_uct));
                            let KS_debet = parseDecimal(0);
                            KS_debet = parseDecimal(data.c1_buc).minus(parseDecimal(data.c1_uct));
                            if (KS_zust.abs().plus(KS_kredit.abs()).plus(KS_debet.abs()).equals(parseDecimal(0)))
                                //if (KS_zust.abs().plus(KS_kredit.abs()).plus(KS_debet.abs()) == parseDecimal(0))
                                return {
                                    icon: "fa-check-circle g-state-text g-state-success gi-stack-pos--rb gi-bgw", text: "jres:30250408", //RC 30250408 : Validace OK
                                    //tooltip: "jres:30250289"
                                };
                            else
                                return {
                                    icon: "fa-times-circle g-state-text g-state-error gi-stack-pos--rb gi-bgw", text: "jres:30250409", //RC 30250409 : Validace chybná
                                };
                        }
                    });
                    myGridFormat.addTextColumn({
                        name: "bu_vl",
                        caption: "jres:30250350", //RC 30250350 : Bankovní účet                
                        serverFilter: this.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */ ? Gordic.Eko.Filters.stringInterval({ model: "bu_vl", caption: "jres:30250351" }) : undefined, //RC 30250351 : Bankovní účet
                        width: 115,
                    });
                    myGridFormat.addTextColumn({
                        name: "sk_vl",
                        caption: "jres:30250353", //RC 30250353 : Banka
                        serverFilter: this.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */ ? Gordic.Eko.Filters.stringInterval({ model: "sk_vl", caption: "jres:30250352" }) : undefined, //RC 30250352 : Banka
                        width: 40, hidden: true
                    });
                    myGridFormat.addIconColumn({
                        name: "diff_uct_buc1",
                        caption: "jres:30250412", //RC 30250412 : Stav                 
                        width: 30, // fixedWidth: true,
                        customClass: "center",
                        iconTemplate: function (data) {
                            if (typeof data.as_buc === "undefined" || typeof data.as_uct === "undefined" || data.as_buc === null || data.as_uct === null)
                                return null;
                            let as_uct = parseDecimal(data.as_uct);
                            let as_buc = parseDecimal(data.as_buc);
                            if (as_uct === null || as_buc === null)
                                return null;
                            let diff = as_uct.minus(as_buc);
                            if (diff.equals(parseDecimal(0)))
                                //if (diff === parseDecimal(0))
                                return {
                                    icon: "fa-check-circle g-state-text g-state-success gi-stack-pos--rb gi-bgw", text: "",
                                };
                            else
                                return {
                                    icon: "fa-times-circle g-state-text g-state-error gi-stack-pos--rb gi-bgw", text: "",
                                };
                        }
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "diff_uct_buc",
                        caption: "jres:30250411", //RC 30250411 : Rozdíl AS UCT-BV
                        width: 120, // fixedWidth: true,
                        cellTemplate: function (data) {
                            if (!data.as_buc || !data.as_uct)
                                return null;
                            let as_uct = parseDecimal(data.as_uct);
                            let as_buc = parseDecimal(data.as_buc);
                            if (as_uct === null || as_buc === null)
                                return null;
                            let diff = as_uct.minus(as_buc);
                            return Gordic.Templates.Formatters.number(diff, "C");
                            //return diff;
                        }
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "ps_uct",
                        caption: "jres:30250393", //RC 30250393 : PS UCT
                        width: 120,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c0_uct",
                        caption: "jres:30250394", //RC 30250394 : MD UCT
                        width: 120,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c1_uct",
                        caption: "jres:30250395", //RC 30250395 : DAL UCT
                        width: 120,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "as_uct",
                        caption: "jres:30250396", //RC 30250396 : AS UCT
                        width: 120,
                    });
                    myGridFormat.addTextColumn({
                        name: "denmes",
                        caption: "jres:30250369", //RC 30250369 : Změna UCT
                        width: 100, //fixedWidth: true,
                        //customClass: "center",
                        cellTemplate: function (data) {
                            //var font = "font-weight: bold;";
                            if (typeof data.denmes === undefined || data.denmes === null)
                                return "";
                            let denmes = data.denmes;
                            let den = denmes % 32;
                            let mesic = Math.floor(denmes / 32);
                            return $("<span>", { text: "" + den + "." + mesic + ".", title: "" /*, "style": font*/ });
                        }
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "ps_buc",
                        caption: "jres:30250397", //RC 30250397 : PS BV
                        width: 120,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c0_buc",
                        caption: "jres:30250398", //RC 30250398 : MD BV
                        width: 120,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c1_buc",
                        caption: "jres:30250399", //RC 30250399 : DAL BV
                        width: 120,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "as_buc",
                        caption: "jres:30250400", //RC 30250400 : AS BV
                        width: 120,
                    });
                    myGridFormat.addNumberColumn({
                        name: "cis_pid",
                        caption: "jres:30250401", //RC 30250401 : Číslo BV
                        width: 80,
                    });
                    myGridFormat.addTextColumn({
                        name: "dat_nov_zus",
                        caption: "jres:30250402", //RC 30250402 : Změna BV
                        width: 70,
                        cellTemplate: function (data) {
                            if (typeof data.dat_nov_zus === undefined || data.dat_nov_zus === null)
                                return "";
                            let dat = Gordic.Templates.Formatters.datetime(data.dat_nov_zus, "dd.MM.");
                            //let dat = moment(data.dat_nov_zus as Date).format("DD") + "." + moment(data.dat_nov_zus as Date).format("MM") + ".";
                            //debugger;
                            return dat;
                        }
                    });
                    myGridFormat.addNumberColumn({
                        name: "s_bvy", //RC 30250403 : s_bvy
                        caption: "jres:30250404", //RC 30250404 : Stav BV
                        width: 30,
                        hidden: !this.debug
                    });
                    return myGridFormat;
                }
            }
            WebClient.GSeznamIISSPPreuctovaniSkutecnostiBanka = GSeznamIISSPPreuctovaniSkutecnostiBanka;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUlJU1NQUHJldWN0b3ZhbmlTa3V0ZWNub3N0aUJhbmthLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbUlJU1NQUHJldWN0b3ZhbmlTa3V0ZWNub3N0aUJhbmthLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0FrZ0JmO0FBbGdCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FrZ0JuQjtJQWxnQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWtnQjdCO1FBbGdCb0IsV0FBQSxTQUFTO1lBQzFCOzs7OztlQUtHO1lBQ0gsTUFBYSx1Q0FBd0MsU0FBUSxVQUFBLGdCQUFnQjtnQkFHekUsY0FBYztvQkFDVixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQzNCLENBQUM7Z0JBRUQ7OztxQkFHSztnQkFDRSxhQUFhO29CQUNoQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFFNUIsUUFBUSxFQUFFOzRCQUNOLElBQUksRUFBRSxVQUFVOzRCQUNoQixrQkFBa0I7NEJBQ2xCLE9BQU8sRUFBRSxLQUFLOzRCQUNkLE9BQU8sRUFBRSxlQUFlLEVBQUUscUJBQXFCOzRCQUMvQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0NBQ2IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOzRCQUNyQixDQUFDO3lCQUNKO3dCQUNELFFBQVEsRUFBRTs0QkFDTixJQUFJLEVBQUUsVUFBVTs0QkFDaEIsa0JBQWtCOzRCQUNsQixPQUFPLEVBQUUsS0FBSzs0QkFDZCxPQUFPLEVBQUUsZUFBZSxFQUFFLHFCQUFxQjs0QkFDL0MsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO2dDQUNiLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs0QkFDckIsQ0FBQzt5QkFDSjtxQkFD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LFdBQVcsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJO2dDQUNsRSxPQUFPLEVBQUUsQ0FBQzs0QkFDZCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUM7NEJBQ25GLHNIQUFzSDs0QkFDdEgsV0FBVzs0QkFDWCxPQUFPLEdBQUcsQ0FBQzt3QkFDZixDQUFDO3FCQUVKLENBQUMsQ0FBQztvQkFFSCxZQUFZLENBQUMsZUFBZSxDQUFDO3dCQUN6QixJQUFJLEVBQUUsT0FBTyxFQUFFLHFCQUFxQjt3QkFDcEMsT0FBTyxFQUFFLGVBQWUsRUFBRSx1QkFBdUI7d0JBQ2pELEtBQUssRUFBRSxFQUFFO3dCQUNULE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLO3FCQUV0QixDQUFDLENBQUM7b0JBSUgsT0FBTyxZQUFZLENBQUM7Z0JBQ3hCLENBQUM7YUFFSjtZQTFmWSxpREFBdUMsMENBMGZuRCxDQUFBO1FBQ0wsQ0FBQyxFQWxnQm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWtnQjdCO0lBQUQsQ0FBQyxFQWxnQmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWtnQm5CO0FBQUQsQ0FBQyxFQWxnQlMsTUFBTSxLQUFOLE1BQU0sUUFrZ0JmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5VY3IuV2ViQ2xpZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogU3Rhdnkga29uc29saWRhY2VcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciB0a2FyZXNcclxuICAgICAqIEBzaW5jZSA0ODQuMS4wLjY5XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBHU2V6bmFtSUlTU1BQcmV1Y3RvdmFuaVNrdXRlY25vc3RpQmFua2EgZXh0ZW5kcyBHU2V6bmFtSUlTU1BCYXNlIGltcGxlbWVudHMgSUdDb250ZW50e1xyXG5cclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLm9uQ29udGVudFJlYWR5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuYWN0aW9ucy5hZGRSYW5nZSh7ICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGFjdFN0YXZ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTdGF2eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWNvbjogXCJnaS1saXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDA1XCIsIC8vUkMgMzAyNTA0MDUgOiBTdGF2eVxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93U3RhdnkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0RGF2a3k6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdERhdmt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pY29uOiBcImdpLWxpc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0MDZcIiwgLy9SQyAzMDI1MDQwNiA6IETDoXZreVxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93RGF2a3koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhemVuaSBzdGF2dVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIHNob3dTdGF2eSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHRpdGxlID0gXCJqcmVzOjMxMTAwMjI0XCI7IC8vUkMgMzExMDAyMjQgOiBaw6FwaXN5IHN0YXZ1XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgIC8vdmFyIGZpbHRyPSB0aGlzLmdldEZpbHRlcigpO1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCBzZWwgPSBncmlkLmdncmlkPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSaXNyZUJhbmthRHRvPihcImdldFNlbGVjdGlvblwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChzZWwubGVuZ3RoICE9PSAxKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJvdyA9IHNlbFswXTtcclxuICAgICAgICAgICAgLy9sZXQgdHlwVWxvaHk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGU7XHJcbiAgICAgICAgICAgIGxldCBpZDogc3RyaW5nO1xyXG4gICAgICAgICAgICBsZXQgZmlsdGVyOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUHJldWN0b3ZhbmlTdGF2TGlzdEZpbHRlckR0bztcclxuXHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZmlsdGVyID0ge1xyXG4gICAgICAgICAgICAgICAgYnVfdmw6IHsgc3RhcnQ6IHJvdy5idV92bD8udHJpbSgpIGFzIHN0cmluZywgZW5kOiByb3cuYnVfdmw/LnRyaW0oKSBhcyBzdHJpbmcgfSxcclxuICAgICAgICAgICAgICAgIHNrX3ZsOiB7IHN0YXJ0OiByb3cuc2tfdmw/LnRyaW0oKSBhcyBzdHJpbmcsIGVuZDogcm93LnNrX3ZsPy50cmltKCkgYXMgc3RyaW5nIH0sXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWQgPSBcInNlem5hbUlJU1NQUHJldWN0b3ZhbmlCYW5rVWN0eSNcIjsgLy9OT1RFOiBNdXNpIGJ5dCBzdGVqbmUgbmEgTWFpbkFwcC5jc1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoYXQucGFyZW50Q250Lm5hdmlnYXRlKCdHb3JkaWMuVWNyLldlYkNsaWVudC5HU2V6bmFtSUlTU1BCYXNlQ29udGVudCcsIHtcclxuICAgICAgICAgICAgICAgIElEOiBpZCxcclxuICAgICAgICAgICAgICAgIFR5cFVsb2h5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX3N0YXZ5LFxyXG4gICAgICAgICAgICAgICAgRmlsdGVyU3Rhdnk6IGZpbHRlcixcclxuICAgICAgICAgICAgICAgIFZvbGFub1pVbG9oeVVsb2h5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX0Jhbmtvdm5pVWN0eSxcclxuICAgICAgICAgICAgICAgIEN1cnJlbnRSb3c6IHJvdyxcclxuICAgICAgICAgICAgICAgIFN0cmljdEZpbHRlcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvL0ZpbHRlclN0clBvcGlzOiBmLmZpbHRlclN0clBvcGlzLFxyXG4gICAgICAgICAgICAgICAgQXV0b0xvYWREYXRhOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW5pIHN0YXZ1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgc2hvd0Rhdmt5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgdGl0bGUgPSBcImpyZXM6MzExMDAyMjRcIjsgLy9SQyAzMTEwMDIyNCA6IFrDoXBpc3kgc3RhdnVcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy92YXIgZmlsdHI9IHRoaXMuZ2V0RmlsdGVyKCk7XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgbGV0IHNlbCA9IGdyaWQuZ2dyaWQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1Jpc3JlQmFua2FEdG8+KFwiZ2V0U2VsZWN0aW9uXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKHNlbC5sZW5ndGggIT09IDEpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBsZXQgcm93ID0gc2VsWzBdO1xyXG4gICAgICAgICAgICAvL2xldCB0eXBVbG9oeTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZTtcclxuICAgICAgICAgICAgbGV0IGlkOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXI6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JQcmV1Y3RvdmFuaVN0YXZMaXN0RmlsdGVyRHRvO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBmaWx0ZXIgPSB7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlkID0gXCJzZXpuYW1JSVNTUFByZXVjdG92YW5pUmVnaXN0ciNcIjsgLy9OT1RFOiBNdXNpIGJ5dCBzdGVqbmUgbmEgTWFpbkFwcC5jc1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoYXQucGFyZW50Q250Lm5hdmlnYXRlKCdHb3JkaWMuVWNyLldlYkNsaWVudC5HU2V6bmFtSUlTU1BCYXNlQ29udGVudCcsIHtcclxuICAgICAgICAgICAgICAgIElEOiBpZCxcclxuICAgICAgICAgICAgICAgIFR5cFVsb2h5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX1JlZ2lzdHJEYXZlayxcclxuICAgICAgICAgICAgICAgIEZpbHRlclN0YXZ5OiBmaWx0ZXIsXHJcbiAgICAgICAgICAgICAgICBWb2xhbm9aVWxvaHlVbG9oeTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9QcmV1Y3RvdmFuaV9CYW5rb3ZuaVVjdHksXHJcbiAgICAgICAgICAgICAgICBDdXJyZW50Um93OiByb3csXHJcbiAgICAgICAgICAgICAgICBTdHJpY3RGaWx0ZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy9GaWx0ZXJTdHJQb3BpczogZi5maWx0ZXJTdHJQb3BpcyxcclxuICAgICAgICAgICAgICAgIEF1dG9Mb2FkRGF0YTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlZmluaWNlIG1lbnViYXJ1XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgRGVmaW5lTWVudUJhcigpOiBNZW51UGFyYW1zW10ge1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgbWVudVBhcjogTWVudVBhcmFtc1tdID1cclxuICAgICAgICAgICAgICAgIFt7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hY3RTdGF2eSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hY3REYXZreSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgcmV0dXJuIG1lbnVQYXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuaSBwcmlzdHVwbm9zdGkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIG5hc3RhdmVuaUFrY2koKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyBwb2t1ZCBuZW5pIGdyaWQsIG5pYyBuZWRlbGVqXHJcbiAgICAgICAgICAgIGlmICh0aGF0LnBhcmVudENudC5jbG9zZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciB2aWV3ID1ncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgbGV0IHBvY2V0ID0gdmlldy5nZXRDb3VudCgpO1xyXG4gICAgICAgICAgICAvLyBzdGF2eVxyXG4gICAgICAgICAgICB0aGF0LnBhcmVudENudC5hY3Rpb25zLmFjdFN0YXZ5Py51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogcG9jZXQgPiAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBkYXZreVxyXG4gICAgICAgICAgICB0aGF0LnBhcmVudENudC5hY3Rpb25zLmFjdERhdmt5Py51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogcG9jZXQgPiAwXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBWeXR2b3JlbmkgZ3JpZHVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBwcm92aWRlciA9IG5ldyBHb3JkaWMuRGF0YS5Qcm92aWRlcjxhbnksIGFueSwgYW55PigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSaXNyZUJhbmthRHRvPihbXSwge1xyXG4gICAgICAgICAgICAgICAgcHJvY2Vzc29yczogeyBwcm92aWRlcjogcHJvdmlkZXIgfVxyXG4gICAgICAgICAgICAgICAgLCBrZXk6IFwicm9rLGJ1X3ZsLHNrX3ZsXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBzbG91cGNlID0gdGhhdC5jcmVhdGVHcmlkRm9ybWF0KCk7XHJcbiAgICAgICAgICAgIC8vdmFyIGRlZmF1bHRQcm9maWxlID0gc2xvdXBjZS5jb2x1bW5zOy8vc2xvdXBjZS5jb2x1bW5zLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5uYW1lPy50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJ2bGFzdG5vc3RcIikgPT09IC0xKVxyXG5cclxuICAgICAgICAgICAgJC5uZXdEaXYodGhpcy5jbGFzc0dyaWQpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5wYXJlbnRDbnQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogc2xvdXBjZSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZTogeyBuYW1lOiBcImRlZmF1bHRcIiwgY29sdW1uTGlzdDogc2xvdXBjZS5jb2x1bW5zLm1hcCgoYykgPT4gYy5uYW1lKS5qb2luKFwiLFwiKSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmFtZTogXCJ1c2VyUHJvZmlsZVwiLCBjb2x1bW5MaXN0OiBzbG91cGNlLmNvbHVtbnMubWFwKChjKSA9PiBjLm5hbWUpLmpvaW4oXCIsXCIpIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBwcm9maWxlVmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5wYXJlbnRDbnQuYWN0aW9ucy5hY3RTdGF2eVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBmdW5jdGlvbiBDcmVhdGVGaWx0ZXJaYWxvemthXHJcbiAgICAgICAgKiAgICAgIFxyXG4gICAgICAgICogT2JlY25hIHphbG96a2FcclxuICAgICAgICAqIEBwYXJhbSB7R0NvbnRlbnR9IGNvbnRlbnRcclxuICAgICAgICAqIEByZXR1cm5zIHthbnl9XHJcbiAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY3JlYXRlRmlsdGVyWmFsb3prYSgpOiBhbnkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3ZhciBkYXRNYXggPSBuZXcgRGF0ZSh0aGF0Lkdsb2JhbHMuRWtvUGFyYW1zPy5Sb2shLCAxMSwzMSk7Ly8gbW9tZW50KFwiMzEuMTIuXCIgKyB0aGF0Lkdsb2JhbHMuRWtvUGFyYW1zPy5Sb2ssIFwiRC5NLllZWVlcIik7XHJcbiAgICAgICAgICAgIC8vdmFyIGRhdE1pbiA9IG5ldyBEYXRlKHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LlJvayEsIDAsIDEpOy8vbW9tZW50KFwiMS4xLlwiICsgdGhhdC5HbG9iYWxzLkVrb1BhcmFtcz8uUm9rLCBcIkQuTS5ZWVlZXCIpO1xyXG4gICAgICAgICAgICB2YXIgZGF0TWF4ID0gbmV3IERhdGUodGhhdC5HbG9iYWxzLkVrb1BhcmFtcz8uUm9rICsgXCItMTItMzFcIik7XHJcbiAgICAgICAgICAgIHZhciBkYXRNaW4gPSBuZXcgRGF0ZSh0aGF0Lkdsb2JhbHMuRWtvUGFyYW1zPy5Sb2sgKyBcIi0xLTFcIik7XHJcbiAgICAgICAgICAgIHZhciBha3REYXR1bSA9IG5ldyBEYXRlKHRoYXQuYWt0RGF0dW0pOyAgIFxyXG4gICAgICAgICAgICB2YXIgZmlsdGVyRm9ybURlZiA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG9wZW5lZDogdHJ1ZSwgbGF5b3V0RGVzY3JpcHRvcjogXCJMNE0zUzEyLCBMLTEyLTEyLTAsIE0tMTItMTEtMSwgUy0xMi0xMS0xXCIsIHRhYkxhYmVsOiBcImpyZXM6MzAyNTAwNTJcIiB9KTsgIC8vUkMgMzAyNTAwNTIgOiBGaWx0clxyXG4gICAgICAgICAgICAgICAgZmlsdGVyRm9ybURlZi5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMjUwMzQ3XCIgfSkgLy9SQyAzMDI1MDM0NyA6IGtlIGRuaVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0dW1LXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluVmFsdWU6IGRhdE1pbiwvLy50b0RhdGUoKSxcclxuICAgICAgICAgICAgICAgICAgICBtYXhWYWx1ZTogZGF0TWF4LC8vLnRvRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogYWt0RGF0dW0sLy8udG9EYXRlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgLy9tb2RlbDogXCJtb2RlbC5kYXR1bUs9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVUeXBlOlwiZGF0ZVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyRm9ybURlZjtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYWN0ZW5pIElzbCBzbHV6YnkgcHJvIGxpc3RcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgbG9hZElTTExpc3QocnE6IHsgbWFza2E6IHt9LCBmaWx0ZXI6IHsgZmlsdGVyczogYW55IH0gfSk6IElzbC5fVGFzazxhbnksIElzbC5HU2VydmljZUxpc3RSZXNwb25zZTxhbnk+PiB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRDbnQuaXNsLlVjclJpc3JlU3RhdnkubGlzdEJhbmtvdm5pVWN0eSh7IGtlRG5pOiBycS5maWx0ZXIuZmlsdGVycy5kYXR1bUsgYXMgYW55fSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZyYXQgbXVqIHNlc3RhdmVueSBmaWx0clxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldE15RmlsdGVyKGZpbHRlclNlcnZlcjogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclByZXVjdG92YW5pU3Rhdkxpc3RGaWx0ZXJEdG8sIGZpbHRlcjogYW55KTogeyBtYXNrYToge30sIGZpbHRlcjogeyBmaWx0ZXJzOiB7fSB9IH0gfCB1bmRlZmluZWQge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWx0ZXIuZGF0dW1LID09PSB1bmRlZmluZWQgfHwgZmlsdGVyLmRhdHVtSyA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgMDtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG1hc2thOiBmaWx0ZXJTZXJ2ZXIsIGZpbHRlcjogeyBmaWx0ZXJzOiBmaWx0ZXIgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLy8qKlxyXG4gICAgICAgIC8vICogIE5hY3RlbmkgZGF0XHJcbiAgICAgICAgLy8gKi9cclxuICAgICAgICAvL3B1YmxpYyBsb2FkRGF0YU9sZCgpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIC8vICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAvLyAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgIC8vICAgIHZhciBtYXNrYTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclByZXVjdG92YW5pU3Rhdkxpc3RGaWx0ZXJEdG8gPSB7fTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgIHZhciBmaWx0ZXIgPSB0aGF0LmdldEZpbHRlcigpLmdmaWx0ZXJwYW5lbCgnZ2V0Q3VycmVudERhdGEnKTtcclxuXHJcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2coXCJsb2FkZGF0YS5maWx0ZXJcIiwgZmlsdGVyKTtcclxuICAgICAgICAvLyAgICAvL2xldCB2aWV3ID0gdGhpcy4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIik7XHJcblxyXG4gICAgICAgIC8vICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgLy8gICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgLy8gICAgZ3JpZC5nZ3JpZHNlcnZlcmZpbHRlcjxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUHJldWN0b3ZhbmlTdGF2TGlzdEZpbHRlckR0bz4oXCJjb2xsZWN0XCIsIG1hc2thKVxyXG4gICAgICAgIC8vICAgICAgICAudGhlbigoZmlsdGVyU2VydmVyKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBtYXNrYSA9IGZpbHRlclNlcnZlcjtcclxuXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgaWYgKGZpbHRlci5NZXNpYyA9PT0gbnVsbClcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBmaWx0ZXIuTWVzaWMgPSAtMTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgICAgICAgIGlmICh0eXBlb2YgZmlsdGVyLmRhdHVtSyA9PT0gdW5kZWZpbmVkIHx8IGZpbHRlci5kYXR1bUsgPT09IG51bGwpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICAgICAgICAgR29yZGljLklzbC5VY3JSaXNyZVN0YXZ5Lmxpc3RCYW5rb3ZuaVVjdHkoeyBrZURuaTogZmlsdGVyLmRhdHVtSyB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vYXQuc2V0QWN0aW9ucyhyZXN1bHQuTGlzdFZhbHVlcz8ubGVuZ3RoIGFzIGFueSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5sb2FkaW5nRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKHJlc3VsdCk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5sb2FkaW5nRGF0YSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAvLyAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAvL31cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBncmlkZm9ybWF0dSBkbGUgcHJlZGxvaHlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY3JlYXRlR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSaXNyZUJhbmthRHRvPiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIG15R3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSaXNyZUJhbmthRHRvPigpO1xyXG5cclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpbWdfdmFsaWRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQxMFwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9SQyAzMDI1MDQxMCA6IFZhbGlkaXRhXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzksLy8gZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImNlbnRlclwiLFxyXG5cclxuICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5hc19idWMgPT09IG51bGwgfHwgdHlwZW9mIGRhdGEuYXNfYnVjID09PSBcInVuZGVmaW5lZFwiIHx8IGRhdGEuYXNfdWN0ID09PSBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IHR5cGVvZiBkYXRhLmFzX3VjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBkYXRhLmMwX2J1YyA9PT0gbnVsbCB8fCBkYXRhLmMwX3VjdCA9PT0gbnVsbCB8fCB0eXBlb2YgZGF0YS5jMF91Y3QgPT09IFwidW5kZWZpbmVkXCIgfHwgZGF0YS5jMV9idWMgPT09IG51bGwgfHwgZGF0YS5jMV91Y3QgPT09IG51bGwgfHwgdHlwZW9mIGRhdGEuYzFfdWN0ID09PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJcIiwgdGV4dDogXCJqcmVzOjMwMjUwNDA3XCIsIC8vUkMgMzAyNTA0MDcgOiBOZWx6ZSB2YWxpZG92YXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9vbHRpcDogXCJqcmVzOjMwMjUwMjg5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgS1NfenVzdDogRGVjaW1hbCA9IHBhcnNlRGVjaW1hbCgwKTtcclxuICAgICAgICAgICAgICAgICAgICBLU196dXN0ID0gS1NfenVzdC5wbHVzKHBhcnNlRGVjaW1hbChkYXRhLmFzX2J1YykpLm1pbnVzKCBwYXJzZURlY2ltYWwoZGF0YS5hc191Y3QgKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IEtTX2tyZWRpdDogRGVjaW1hbCA9IHBhcnNlRGVjaW1hbCgwKTtcclxuICAgICAgICAgICAgICAgICAgICBLU19rcmVkaXQgPSBwYXJzZURlY2ltYWwoZGF0YS5jMF9idWMgYXMgYW55KS5taW51cyhwYXJzZURlY2ltYWwoZGF0YS5jMF91Y3QpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IEtTX2RlYmV0OiBEZWNpbWFsID0gcGFyc2VEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIEtTX2RlYmV0ID0gcGFyc2VEZWNpbWFsKGRhdGEuYzFfYnVjIGFzIGFueSkubWludXMocGFyc2VEZWNpbWFsKGRhdGEuYzFfdWN0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEtTX3p1c3QuYWJzKCkucGx1cyhLU19rcmVkaXQuYWJzKCkpLnBsdXMoS1NfZGViZXQuYWJzKCkpLmVxdWFscyhwYXJzZURlY2ltYWwoMCkpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKEtTX3p1c3QuYWJzKCkucGx1cyhLU19rcmVkaXQuYWJzKCkpLnBsdXMoS1NfZGViZXQuYWJzKCkpID09IHBhcnNlRGVjaW1hbCgwKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXN1Y2Nlc3MgZ2ktc3RhY2stcG9zLS1yYiBnaS1iZ3dcIiwgdGV4dDogXCJqcmVzOjMwMjUwNDA4XCIsIC8vUkMgMzAyNTA0MDggOiBWYWxpZGFjZSBPS1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90b29sdGlwOiBcImpyZXM6MzAyNTAyODlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXRpbWVzLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvciBnaS1zdGFjay1wb3MtLXJiIGdpLWJnd1wiLCB0ZXh0OiBcImpyZXM6MzAyNTA0MDlcIiwgLy9SQyAzMDI1MDQwOSA6IFZhbGlkYWNlIGNoeWJuw6FcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJidV92bFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzUwXCIsIC8vUkMgMzAyNTAzNTAgOiBCYW5rb3Zuw60gw7rEjWV0ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiB0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX3N0YXZ5ID8gR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiYnVfdmxcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzUxXCIgfSkgOiB1bmRlZmluZWQsIC8vUkMgMzAyNTAzNTEgOiBCYW5rb3Zuw60gw7rEjWV0XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTE1LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJza192bFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzUzXCIsIC8vUkMgMzAyNTAzNTMgOiBCYW5rYVxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiB0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX3N0YXZ5ID8gR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwic2tfdmxcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzUyXCIgfSkgOiB1bmRlZmluZWQsIC8vUkMgMzAyNTAzNTIgOiBCYW5rYVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDQwLCBoaWRkZW46IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZGlmZl91Y3RfYnVjMVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDEyXCIsIC8vUkMgMzAyNTA0MTIgOiBTdGF2ICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzMCwvLyBmaXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiY2VudGVyXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEuYXNfYnVjID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBkYXRhLmFzX3VjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBkYXRhLmFzX2J1YyA9PT0gbnVsbCB8fCBkYXRhLmFzX3VjdCA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFzX3VjdDogRGVjaW1hbCA9IHBhcnNlRGVjaW1hbChkYXRhLmFzX3VjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFzX2J1YzogRGVjaW1hbCA9IHBhcnNlRGVjaW1hbChkYXRhLmFzX2J1YyApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhc191Y3QgPT09IG51bGwgfHwgYXNfYnVjID09PSBudWxsKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpZmY6IERlY2ltYWwgPSBhc191Y3QubWludXMoYXNfYnVjKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlmZi5lcXVhbHMocGFyc2VEZWNpbWFsKDApKSlcclxuICAgICAgICAgICAgICAgICAgICAvL2lmIChkaWZmID09PSBwYXJzZURlY2ltYWwoMCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWNoZWNrLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1zdWNjZXNzIGdpLXN0YWNrLXBvcy0tcmIgZ2ktYmd3XCIsIHRleHQ6IFwiXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtdGltZXMtY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLWVycm9yIGdpLXN0YWNrLXBvcy0tcmIgZ2ktYmd3XCIsIHRleHQ6IFwiXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRpZmZfdWN0X2J1Y1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDExXCIsLy9SQyAzMDI1MDQxMSA6IFJvemTDrWwgQVMgVUNULUJWXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLC8vIGZpeGVkV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGF0YS5hc19idWMgIHx8ICFkYXRhLmFzX3VjdCApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsIGFzIGFueTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXNfdWN0OiBEZWNpbWFsID0gcGFyc2VEZWNpbWFsKGRhdGEuYXNfdWN0ICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhc19idWM6IERlY2ltYWwgPSBwYXJzZURlY2ltYWwoZGF0YS5hc19idWMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhc191Y3QgPT09IG51bGwgfHwgYXNfYnVjID09PSBudWxsKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpZmY6IERlY2ltYWwgPSBhc191Y3QubWludXMoYXNfYnVjKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcihkaWZmLFwiQ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkaWZmO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJwc191Y3RcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM5M1wiLCAvL1JDIDMwMjUwMzkzIDogUFMgVUNUXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjMF91Y3RcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM5NFwiLCAvL1JDIDMwMjUwMzk0IDogTUQgVUNUXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImMxX3VjdFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzk1XCIsIC8vUkMgMzAyNTAzOTUgOiBEQUwgVUNUXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFzX3VjdFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzk2XCIsIC8vUkMgMzAyNTAzOTYgOiBBUyBVQ1RcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkZW5tZXNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM2OVwiLCAgIC8vUkMgMzAyNTAzNjkgOiBabcSbbmEgVUNUXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwLCAvL2ZpeGVkV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvL2N1c3RvbUNsYXNzOiBcImNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIGZvbnQgPSBcImZvbnQtd2VpZ2h0OiBib2xkO1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YS5kZW5tZXMgPT09IHVuZGVmaW5lZCB8fCBkYXRhLmRlbm1lcyA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlbm1lcyA9IGRhdGEuZGVubWVzIGFzIG51bWJlcjtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGVuID0gZGVubWVzICUgMzI7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1lc2ljID0gTWF0aC5mbG9vcihkZW5tZXMgLyAzMik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoXCI8c3Bhbj5cIiwgeyB0ZXh0OiBcIlwiICsgZGVuICsgXCIuXCIgKyBtZXNpYyArIFwiLlwiLCB0aXRsZTogXCJcIi8qLCBcInN0eWxlXCI6IGZvbnQqLyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInBzX2J1Y1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzk3XCIsIC8vUkMgMzAyNTAzOTcgOiBQUyBCVlxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjMF9idWNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM5OFwiLCAvL1JDIDMwMjUwMzk4IDogTUQgQlZcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYzFfYnVjXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzOTlcIiwgLy9SQyAzMDI1MDM5OSA6IERBTCBCVlxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhc19idWNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQwMFwiLCAvL1JDIDMwMjUwNDAwIDogQVMgQlZcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNpc19waWRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQwMVwiLCAvL1JDIDMwMjUwNDAxIDogxIzDrXNsbyBCVlxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X25vdl96dXNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQwMlwiLCAvL1JDIDMwMjUwNDAyIDogWm3Em25hIEJWXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhKSB7ICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEuZGF0X25vdl96dXMgPT09IHVuZGVmaW5lZCB8fCBkYXRhLmRhdF9ub3ZfenVzID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ID0gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGV0aW1lKGRhdGEuZGF0X25vdl96dXMgYXMgRGF0ZSwgXCJkZC5NTS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgZGF0ID0gbW9tZW50KGRhdGEuZGF0X25vdl96dXMgYXMgRGF0ZSkuZm9ybWF0KFwiRERcIikgKyBcIi5cIiArIG1vbWVudChkYXRhLmRhdF9ub3ZfenVzIGFzIERhdGUpLmZvcm1hdChcIk1NXCIpICsgXCIuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0O1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInNfYnZ5XCIsIC8vUkMgMzAyNTA0MDMgOiBzX2J2eVxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDA0XCIsIC8vUkMgMzAyNTA0MDQgOiBTdGF2IEJWXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzAsXHJcbiAgICAgICAgICAgICAgICBoaWRkZW46ICF0aGlzLmRlYnVnXHJcblxyXG4gICAgICAgICAgICB9KTsgICAgICAgICAgICBcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG15R3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59Il19
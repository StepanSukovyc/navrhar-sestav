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
            let GSeznamEvidence = class GSeznamEvidence extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    // nastaveni id a titulku okna
                    this.taskId = "seznamDPHEvidenceAct";
                    this.title = "jres:30250085"; //RC 30250085 : Daňová evidence
                }
                onContentReady() {
                    var that = this;
                    this.actions.add({
                        name: "selAct",
                        icon: "gi-detail",
                        caption: "jres:31100156", //RC 31100156 : Detail
                        enabled: false,
                        run: function (ev, ctx) {
                            var row = that.$grid.ggrid("activeRow");
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
                            var row = that.$grid.ggrid("activeRow");
                            if (row === null)
                                return;
                            that.showZapisy(row);
                            //that.dialogs.confirm("jres:30250002".format(row.nazev)) //RC 30250002 : Opravdu chcete smazat vybraný požadavek ({0}) ?
                            //    .on("close", (ev, obj: string) => {
                            //        if (obj !== "yes") return;
                            //        Gordic.Isl.UcrPozadavek.delete({ identifikator: row.ixs_ses })
                            //            .get()
                            //            .then(function () {
                            //                that.loadData();
                            //                that.showFlash({ id: "flashDelete", icon: "gi-tick", label: "jres:30250003", customClass: "g-state-success", timer: 5000 })  //RC 30250003 : Požadavek byl vymazán
                            //            });
                            //    });
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
                    this.$grid = $("<div>")
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
                                if (ctx.cellInfo && ctx.cellInfo.data)
                                    data = ctx.cellInfo.data;
                                else
                                    data = that.$grid.ggrid("getSelection")[0];
                                //zobrazeni detailu
                                that.navigate(Gordic.Ucr.WebClient.GDetailDanoveEvidence, { currentRow: data, viewMode: false, cols: that.cols }, {
                                    closeOnEscape: false,
                                });
                            }
                        }),
                        searchColumns: ["nazev", "hodnota"],
                        //#region Definice sloupcu
                        //#endregion
                    });
                    // poc. nastaveni filtru
                    if (this.filterMonth.length > 0)
                        this.findFields('mesicod,mesicdo').gfield('setValue', this.filterMonth[this.filterMonth.length - 1]);
                    //#region Preview v sidebaru
                    this.element.gsidebar("option", "right", { userSettings: this.userSettings, width: 500, visible: true, pinned: true });
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
                                    $.content(elm).init(dto);
                                    $(tab).empty().append(elm);
                                    //that.$grid.ggrid("focus");
                                }
                            }]
                    });
                    //#endregion
                }
                showZapisy(row) {
                    let id;
                    //NOTE: Odpovida z TK UCR: GSeznamZapisuVRadkuTab.LoadGridData()
                    //let filter: GEkoFilterDto = {
                    //    ico: { start: row.ico!, end: row.ico! },
                    //    ucs: { start: row.ucs!, end: row.ucs! },
                    //    uus: { start: row.uus!, end: row.uus! },
                    //    nks: { start: row.nks!, end: row.nks! },
                    //    mesic: { start: 0, end: row.mesic },
                    //    //drd_msk: row.drd!.toString(),
                    //    cfu: {
                    //        uea: { start: row.uea!, end: row.uea! },
                    //        ueb: { start: row.ueb!, end: row.ueb! },
                    //        uec: { start: row.uec!, end: row.uec! },
                    //        ued: { start: row.ued!, end: row.ued! },
                    //        uee: { start: row.uee!, end: row.uee! },
                    //        uef: { start: row.uef!, end: row.uef! },
                    //        ueg: { start: row.ueg!, end: row.ueg! },
                    //        ueh: { start: row.ueh!, end: row.ueh! },
                    //        uei: { start: row.uei!, end: row.uei! },
                    //        uej: { start: row.uej!, end: row.uej! },
                    //        te0: { start: row.te0!, end: row.te0! },
                    //        te1: { start: row.te1!, end: row.te1! },
                    //        te2: { start: row.te2!, end: row.te2! },
                    //        te3: { start: row.te3!, end: row.te3! },
                    //    }
                    //};
                    let typUlohy = 4 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.FinancovaniZapis */;
                    id = "uctZapisy#"; //NOTE: Musi byt stejne ni na MainApp.cs
                    this.navigate('Gordic.Ucr.WebClient.GSeznamEkoZaznamu', {
                        ID: id,
                        TypUlohy: typUlohy,
                        Filter: undefined,
                        StrictFilter: true,
                        //FilterStrPopis: f.filterStrPopis,
                        AutoLoadData: true,
                        title: "jres:30250099".format(row.ec_dd, row.rok.toString() + "/" + row.mesic.toString()) //RC 30250099 : Zápisy DPH:{0}, {1}
                    });
                }
                /**
                 * Uprava viditelnosti akci
                 *
                 * */
                setActions(pocetRadku) {
                    if (!this.$grid)
                        return;
                    //var pocetZapisu = Gordic.Eko.WebClient.Common.CelkovyPocetRadku(this.$grid);
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
                        .addRow("Měsíc DPH od")
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
                        .addRow("do")
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
                            var view = that.$grid.ggrid("getView");
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
                    Gordic.Isl.UcrDph.listDanovaEvidence({ filter: filtr })
                        .get()
                        .done(function (result) {
                        debugger;
                        that.$grid.ggrid("option", "columns", that.createGridFormat(result.Cols));
                        that.cols = result.Cols;
                        that.setActions(result.ListValues?.length);
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
            GSeznamEvidence = __decorate([
                Decorators.gcontent
            ], GSeznamEvidence);
            WebClient.GSeznamEvidence = GSeznamEvidence;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUV2aWRlbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbUV2aWRlbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0FrWmY7QUFsWkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBa1puQjtJQWxaZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBa1o3QjtRQWxab0IsV0FBQSxTQUFTO1lBQzFCOzs7OztlQUtHO1lBRUgsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxPQUFBLFlBQVk7Z0JBQWpEOztvQkFjSSw4QkFBOEI7b0JBQzlCLFdBQU0sR0FBRSxzQkFBc0IsQ0FBQztvQkFDL0IsVUFBSyxHQUFHLGVBQWUsQ0FBQyxDQUFDLCtCQUErQjtnQkF5WDVELENBQUM7Z0JBeFhHLGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQzt3QkFDYixJQUFJLEVBQUUsUUFBUTt3QkFDZCxJQUFJLEVBQUUsV0FBVzt3QkFDakIsT0FBTyxFQUFFLGVBQWUsRUFBRyxzQkFBc0I7d0JBQ2pELE9BQU8sRUFBRSxLQUFLO3dCQUNkLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUNsQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQzs0QkFDeEMsSUFBSSxHQUFHLEtBQUssSUFBSTtnQ0FDWixPQUFPOzRCQUNYLG1CQUFtQjs0QkFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFO2dDQUM3RyxhQUFhLEVBQUUsS0FB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WUFBWSxDQUFDLGVBQWUsQ0FBQzs0QkFDekIsSUFBSSxFQUFFLE9BQU87NEJBQ2IsT0FBTyxFQUFFLGVBQWUsRUFBRSxxQkFBcUI7eUJBQ2xELENBQUMsQ0FBQztvQkFDUCxDQUFDO29CQUVELGdDQUFnQztvQkFDaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDNUMsSUFBSSxHQUFHLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzQixZQUFZLENBQUMsYUFBYSxDQUFDOzRCQUN2QixJQUFJLEVBQUUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJOzRCQUNyQixPQUFPLEVBQUUsR0FBRyxDQUFDLFFBQWU7eUJBQy9CLENBQUMsQ0FBQztvQkFDUCxDQUFDO29CQUNELE9BQU8sWUFBWSxDQUFDO2dCQUN4QixDQUFDO2FBQ0osQ0FBQTtZQXpZWSxlQUFlO2dCQUQzQixVQUFVLENBQUMsUUFBUTtlQUNQLGVBQWUsQ0F5WTNCO1lBellZLHlCQUFlLGtCQXlZM0IsQ0FBQTtRQUNMLENBQUMsRUFsWm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWtaN0I7SUFBRCxDQUFDLEVBbFpnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFrWm5CO0FBQUQsQ0FBQyxFQWxaUyxNQUFNLEtBQU4sTUFBTSxRQWtaZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIERhbm92ZSBldmlkZW5jZVxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIHRrYXJlc1xyXG4gICAgICogQHNpbmNlIDQ4NC4xLjAuNjlcclxuICAgICAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU2V6bmFtRXZpZGVuY2UgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG5cclxuICAgICAgICBwcml2YXRlIGVrb1BhcmFtczogR29yZGljLlVjci5XZWJDbGllbnQuR0Vrb1BhcmFtc0R0bztcclxuICAgICAgICAvLyBzZXpuYW0gbWVzaWN1LCBwcmVzIGt0ZXJlIGx6ZSBmaWx0cm92YXRcclxuICAgICAgICBwcml2YXRlIGZpbHRlck1vbnRoOiBudW1iZXJbXTsgXHJcbiAgICAgICAgLy8gZmlsdHJvdmFjaSBwYW5lbFxyXG4gICAgICAgIHByaXZhdGUgJGZpbHRlclBhbmVsOiBKUXVlcnk7XHJcbiAgICAgICAgLy8gZ3JpZCBzZSBzZW5hbWVtXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjsgICAgICAgIFxyXG4gICAgICAgIC8vIGtvbnRyb2xlciBwcm8gcHJldmllIG9rbm9cclxuICAgICAgICBwcml2YXRlIHByZXZpZXdDb250cm9sbGVyOiBHb3JkaWMuUHJldmlld3MuR1ByZXZpZXdDb250cm9sbGVyO1xyXG5cclxuICAgICAgICBwcml2YXRlIGNvbHM6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFa29jc2tvRHRvW107XHJcblxyXG4gICAgICAgIC8vIG5hc3RhdmVuaSBpZCBhIHRpdHVsa3Ugb2tuYVxyXG4gICAgICAgIHRhc2tJZD0gXCJzZXpuYW1EUEhFdmlkZW5jZUFjdFwiO1xyXG4gICAgICAgIHRpdGxlID0gXCJqcmVzOjMwMjUwMDg1XCI7IC8vUkMgMzAyNTAwODUgOiBEYcWIb3bDoSBldmlkZW5jZVxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic2VsQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTU2XCIsICAvL1JDIDMxMTAwMTU2IDogRGV0YWlsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gdGhhdC4kZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL3pvYnJhemVuaSBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShHb3JkaWMuVWNyLldlYkNsaWVudC5HRGV0YWlsRGFub3ZlRXZpZGVuY2UsIHsgY3VycmVudFJvdzogcm93LCB2aWV3TW9kZTogZmFsc2UsIGNvbHM6IHRoYXQuY29scyB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlT25Fc2NhcGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiemFwaXN5QWN0XCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImdpLWxpc3RcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDg5XCIsIC8vUkMgMzAyNTAwODkgOiBaw6FwaXN5XHJcbiAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IHRoYXQuJGdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PT0gbnVsbCApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93WmFwaXN5KHJvdylcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZGlhbG9ncy5jb25maXJtKFwianJlczozMDI1MDAwMlwiLmZvcm1hdChyb3cubmF6ZXYpKSAvL1JDIDMwMjUwMDAyIDogT3ByYXZkdSBjaGNldGUgc21hemF0IHZ5YnJhbsO9IHBvxb5hZGF2ZWsgKHswfSkgP1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAub24oXCJjbG9zZVwiLCAoZXYsIG9iajogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmIChvYmogIT09IFwieWVzXCIpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgR29yZGljLklzbC5VY3JQb3phZGF2ZWsuZGVsZXRlKHsgaWRlbnRpZmlrYXRvcjogcm93Lml4c19zZXMgfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQubG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaCh7IGlkOiBcImZsYXNoRGVsZXRlXCIsIGljb246IFwiZ2ktdGlja1wiLCBsYWJlbDogXCJqcmVzOjMwMjUwMDAzXCIsIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtc3VjY2Vzc1wiLCB0aW1lcjogNTAwMCB9KSAgLy9SQyAzMDI1MDAwMyA6IFBvxb5hZGF2ZWsgYnlsIHZ5bWF6w6FuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAgLy97IGFjdGlvbjogdGhhdC5hY3Rpb25zLm5ld0FjdCwgZmF2b3JpdGU6IHRydWUsIGNhcHRpb25WaXNpYmxlOiBcIm5ldmVyXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuc2VsQWN0LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy56YXBpc3lBY3QsIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICAvLyB2eXR2b3JlbmkgZml0cnUgcGFuZWx1XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRmlsdGVyUGFuZWwodGhpcyk7IFxyXG5cclxuICAgICAgICAgICAgbGV0IHByb3ZpZGVyID0gbmV3IEdvcmRpYy5EYXRhLlByb3ZpZGVyPGFueSxhbnksYW55PigoZmlsdGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5sb2FkRGF0YShmaWx0ZXIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoW10sIHsgIHByb2Nlc3NvcnM6IHsgIHByb3ZpZGVyOiBwcm92aWRlciB9IH0pO1xyXG4gICAgICAgICAgICB0aGlzLiRncmlkID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdmlldyxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGZ1bmN0aW9uIChldiwgaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93cyA9IGluZm8uZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5jbGVhckNvbnRyb2xzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3dzLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLmVuYWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIuc2hvdyh7IGN1cnJlbnRSb3c6IHJvd3NbMF0sIHZpZXdNb2RlOiB0cnVlLCBjb2xzOiB0aGF0LmNvbHMgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0sICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhOiBhbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LmNlbGxJbmZvICYmIGN0eC5jZWxsSW5mby5kYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBjdHguY2VsbEluZm8uZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gdGhhdC4kZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vem9icmF6ZW5pIGRldGFpbHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoR29yZGljLlVjci5XZWJDbGllbnQuR0RldGFpbERhbm92ZUV2aWRlbmNlLCB7IGN1cnJlbnRSb3c6IGRhdGEsIHZpZXdNb2RlOiBmYWxzZSwgY29sczogdGhhdC5jb2xzIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZU9uRXNjYXBlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IFtcIm5hemV2XCIsIFwiaG9kbm90YVwiXSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8jcmVnaW9uIERlZmluaWNlIHNsb3VwY3VcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIHBvYy4gbmFzdGF2ZW5pIGZpbHRydVxyXG4gICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJNb250aC5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKCdtZXNpY29kLG1lc2ljZG8nKS5nZmllbGQoJ3NldFZhbHVlJywgdGhpcy5maWx0ZXJNb250aFt0aGlzLmZpbHRlck1vbnRoLmxlbmd0aCAtIDFdKTtcclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBQcmV2aWV3IHYgc2lkZWJhcnVcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5nc2lkZWJhcihcIm9wdGlvblwiLCBcInJpZ2h0XCIsIHsgdXNlclNldHRpbmdzOiB0aGlzLnVzZXJTZXR0aW5ncyEsIHdpZHRoOiA1MDAsIHZpc2libGU6IHRydWUsIHBpbm5lZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgdGhpcy5wcmV2aWV3Q29udHJvbGxlciA9IG5ldyBHb3JkaWMuUHJldmlld3MuR1ByZXZpZXdDb250cm9sbGVyKHRoaXMuZWxlbWVudCwge1xyXG4gICAgICAgICAgICAgICAgdXNlU3VidGFzazogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBwYW5lbE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwOTdcIiwgLy9SQyAzMDI1MDA5NyA6IE7DoWhsZWQgZGV0YWlsdSBkYcWIb3bDqSBldmlkZW5jZVxyXG4gICAgICAgICAgICAgICAgICAgIHNpZGU6IFwicmlnaHRcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRhYnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDk3XCIsIC8vUkMgMzAyNTAwOTcgOiBOw6FobGVkIGRldGFpbHUgZGHFiG92w6kgZXZpZGVuY2VcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21Mb2FkOiAodGFiLCBkdG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVsbSA9ICQoXCI8ZGl2PlwiKS5nY29udGVudChHb3JkaWMuVWNyLldlYkNsaWVudC5HRGV0YWlsRGFub3ZlRXZpZGVuY2UsIHsgcGFyZW50Q29udGVudDogdGhpcyB9KTsgLy9OdXRuZSBwcm8gc3ByYXZuZSBzcG9qZW5pIHMga29udGV4dGVtIGhsYXZuaWhvIGNvbnRlbnR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IHRhYlNldHRpbmdzID0gZHRvLnRhYlNldHRpbmdzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSBkdG8udGFiU2V0dGluZ3M7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuY29udGVudDxHb3JkaWMuVWNyLldlYkNsaWVudC5HRGV0YWlsRGFub3ZlRXZpZGVuY2U+KGVsbSkuaW5pdChkdG8pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0YWIpLmVtcHR5KCkuYXBwZW5kKGVsbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC4kZ3JpZC5nZ3JpZChcImZvY3VzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIHNob3daYXBpc3kocm93OmFueSk6IHZvaWQge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgaWQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgICAgIC8vTk9URTogT2Rwb3ZpZGEgeiBUSyBVQ1I6IEdTZXpuYW1aYXBpc3VWUmFka3VUYWIuTG9hZEdyaWREYXRhKClcclxuICAgICAgICAgICAgLy9sZXQgZmlsdGVyOiBHRWtvRmlsdGVyRHRvID0ge1xyXG4gICAgICAgICAgICAvLyAgICBpY286IHsgc3RhcnQ6IHJvdy5pY28hLCBlbmQ6IHJvdy5pY28hIH0sXHJcbiAgICAgICAgICAgIC8vICAgIHVjczogeyBzdGFydDogcm93LnVjcyEsIGVuZDogcm93LnVjcyEgfSxcclxuICAgICAgICAgICAgLy8gICAgdXVzOiB7IHN0YXJ0OiByb3cudXVzISwgZW5kOiByb3cudXVzISB9LFxyXG4gICAgICAgICAgICAvLyAgICBua3M6IHsgc3RhcnQ6IHJvdy5ua3MhLCBlbmQ6IHJvdy5ua3MhIH0sXHJcbiAgICAgICAgICAgIC8vICAgIG1lc2ljOiB7IHN0YXJ0OiAwLCBlbmQ6IHJvdy5tZXNpYyB9LFxyXG4gICAgICAgICAgICAvLyAgICAvL2RyZF9tc2s6IHJvdy5kcmQhLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgIC8vICAgIGNmdToge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgdWVhOiB7IHN0YXJ0OiByb3cudWVhISwgZW5kOiByb3cudWVhISB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgdWViOiB7IHN0YXJ0OiByb3cudWViISwgZW5kOiByb3cudWViISB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgdWVjOiB7IHN0YXJ0OiByb3cudWVjISwgZW5kOiByb3cudWVjISB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgdWVkOiB7IHN0YXJ0OiByb3cudWVkISwgZW5kOiByb3cudWVkISB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgdWVlOiB7IHN0YXJ0OiByb3cudWVlISwgZW5kOiByb3cudWVlISB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgdWVmOiB7IHN0YXJ0OiByb3cudWVmISwgZW5kOiByb3cudWVmISB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgdWVnOiB7IHN0YXJ0OiByb3cudWVnISwgZW5kOiByb3cudWVnISB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgdWVoOiB7IHN0YXJ0OiByb3cudWVoISwgZW5kOiByb3cudWVoISB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgdWVpOiB7IHN0YXJ0OiByb3cudWVpISwgZW5kOiByb3cudWVpISB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgdWVqOiB7IHN0YXJ0OiByb3cudWVqISwgZW5kOiByb3cudWVqISB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgdGUwOiB7IHN0YXJ0OiByb3cudGUwISwgZW5kOiByb3cudGUwISB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgdGUxOiB7IHN0YXJ0OiByb3cudGUxISwgZW5kOiByb3cudGUxISB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgdGUyOiB7IHN0YXJ0OiByb3cudGUyISwgZW5kOiByb3cudGUyISB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgdGUzOiB7IHN0YXJ0OiByb3cudGUzISwgZW5kOiByb3cudGUzISB9LFxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0eXBVbG9oeSA9IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuRmluYW5jb3ZhbmlaYXBpcztcclxuICAgICAgICAgICAgaWQgPSBcInVjdFphcGlzeSNcIjsgLy9OT1RFOiBNdXNpIGJ5dCBzdGVqbmUgbmkgbmEgTWFpbkFwcC5jc1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGUoJ0dvcmRpYy5VY3IuV2ViQ2xpZW50LkdTZXpuYW1Fa29aYXpuYW11Jywge1xyXG4gICAgICAgICAgICAgICAgSUQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgVHlwVWxvaHk6IHR5cFVsb2h5LFxyXG4gICAgICAgICAgICAgICAgRmlsdGVyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBTdHJpY3RGaWx0ZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvL0ZpbHRlclN0clBvcGlzOiBmLmZpbHRlclN0clBvcGlzLFxyXG4gICAgICAgICAgICAgICAgQXV0b0xvYWREYXRhOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDA5OVwiLmZvcm1hdChyb3cuZWNfZGQsIHJvdy5yb2sudG9TdHJpbmcoKSArIFwiL1wiICsgcm93Lm1lc2ljLnRvU3RyaW5nKCkpIC8vUkMgMzAyNTAwOTkgOiBaw6FwaXN5IERQSDp7MH0sIHsxfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVwcmF2YSB2aWRpdGVsbm9zdGkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRBY3Rpb25zKHBvY2V0UmFka3U6bnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy4kZ3JpZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAvL3ZhciBwb2NldFphcGlzdSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5DZWxrb3Z5UG9jZXRSYWRrdSh0aGlzLiRncmlkKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLnNlbEFjdCEudXBkYXRlKHsgZW5hYmxlZDogcG9jZXRSYWRrdSA+IDAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy56YXBpc3lBY3QhLnVwZGF0ZSh7IGVuYWJsZWQ6IHBvY2V0UmFka3UgPiAwIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAqIGZ1bmN0aW9uIENyZWF0ZUZpbHRlclphbG96a2FcclxuICAgICAgICAqICAgICAgXHJcbiAgICAgICAgKiBPYmVjbmEgemFsb3prYVxyXG4gICAgICAgICogQHBhcmFtIHtHQ29udGVudH0gY29udGVudFxyXG4gICAgICAgICogQHJldHVybnMge2FueX1cclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgQ3JlYXRlRmlsdGVyWmFsb3prYSgpOiBhbnkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgdmFyIGZpbHRlckZvcm1EZWYgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyAvKm9wZW5lZDogdHJ1ZSwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzEsIEwtMy04LTEsIE0tMTItMTEtMSwgUy0xMi0xMS0xXCIsKi8gdGFiTGFiZWw6IFwianJlczozMDI1MDA1MlwiIH0pICAvL1JDIDMwMjUwMDUyIDogRmlsdHJcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdmb3JtYm94XCIsIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIGZvcm06IGZybSwgaXRlbVRlbXBsYXRlOlwie21lc2ljMX1cIlxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk3Em3PDrWMgRFBIIG9kXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtZXNpY29kXCJcclxuICAgICAgICAgICAgICAgICAgICAsIG11bHRpOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICwgbGlzdDogZmFsc2UsIGl0ZW1XaWR0aDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgZHJvcGRvd246IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLywgbW9kZWw6IFwibW9kZWwucHJpel96cGxfa2g9dmFsdWUucHJpel96cGxfa2hcIlxyXG4gICAgICAgICAgICAgICAgICAgIC8vLCBpdGVtVGVtcGxhdGU6IFwie3ByaXpfenBsX2toX3R4dH1cIlxyXG4gICAgICAgICAgICAgICAgICAgIC8vLCBtb2RlbERlZmF1bHRzOiB0aGF0LmZpbHRlcnRNb250aFt0aGF0LmZpbHRlcnRNb250aC5sZW5ndGggICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICwgZGF0YTogdGhhdC5maWx0ZXJNb250aFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJkb1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7IFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVzaWNkb1wiLCBtdWx0aTogZmFsc2UsIGxpc3Q6IGZhbHNlLCBpdGVtV2lkdGg6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAsIGRyb3Bkb3duOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8sIG1vZGVsOiBcIm1vZGVsLnByaXpfenBsX2toPXZhbHVlLnByaXpfenBsX2toXCJcclxuICAgICAgICAgICAgICAgICAgICAvLywgaXRlbVRlbXBsYXRlOiBcIntwcml6X3pwbF9raF90eHR9XCJcclxuICAgICAgICAgICAgICAgICAgICAvLywgbW9kZWxEZWZhdWx0czogdGhhdC5maWx0ZXJ0TW9udGhbdGhhdC5maWx0ZXJ0TW9udGgubGVuZ3RoXVxyXG4gICAgICAgICAgICAgICAgICAgICwgZGF0YTogdGhhdC5maWx0ZXJNb250aFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIDtcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyRm9ybURlZjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGZpbHRyb3ZhY2lobyBwYW5lbHVcclxuICAgICAgICAgKiBAcGFyYW0gdGhhdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyUGFuZWwodGhhdDogdGhpcyk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kZmlsdGVyUGFuZWwgPSAkKFwiPGRpdiBjbGFzcz0nanMtZmlsdHInPlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZmlsdGVycGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlckN1c3RvbWl6ZXI6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb2xTb3J0ID0gZGF0YS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhLm5hbWUgPj0gYi5uYW1lOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBvbFNvcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmb3JtczogW3RoYXQuQ3JlYXRlRmlsdGVyWmFsb3prYSgpXSxcclxuICAgICAgICAgICAgICAgICAgICAvL2ZpbHRlclZpZXdNb2RlOiBkZWZGaWx0cnUsLy8gRmlsdGVyVmlld01vZGUuRGV0YWlsLCAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9mYXZvcml0ZXM6IFtcIml4cFwiLCBcIml4c190eXBcIiwgXCJ2bGFzdG5pX2Rva2xhZHlcIl0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Mb2FkQWZ0ZXJDaG9zZUZpbHRlcjogdHJ1ZSwgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2F2ZU9wdGlvbnNGb3JtOiBcImVrb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclN0b3JhZ2VTZXJ2aWNlOiBuZXcgR29yZGljLkdpbi5GaWx0ZXJTdG9yYWdlU2VydmljZS5TdG9yZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlVXNlclNldHRpbmdzOiBcIkRlbnlcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyAwMS4wMy4yMDIxIC0gVEZlaWtcclxuICAgICAgICAgICAgICAgICAgICAvLyBOYWhyYXplbsOtIG9ic29sZXRlIHBhcmFtZXRyxa8uXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0xvYWRBZnRlckNyZWF0ZVBhbmVsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvL3VzZXJEZWZhdWx0RmlsdGVyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlOiBGaWx0ZXJWaWV3TW9kZS5TaW1wbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zaW1wbGVNb2RlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlTGF5b3V0RGVzY3JpcHRvcjogXCJMNE0zUzFcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2ZpbHRlckhlbHBlckl0ZW1UZW1wbGF0ZTogXCI8Yj57bmF6ZXZ9PC9iPlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dEl0ZW1UZW1wbGF0ZTogXCJ7bmF6ZXZ9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHk6IGZ1bmN0aW9uIChldmVudCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmlsdGVyRm9ybS5hcHBseVwiLCBvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvZy50cmFjZShcImZpbHRlckZvcm0uYXBwbHlcIiwgb2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXcgPSB0aGF0LiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5yZXF1ZXN0RGF0YShvYmouZmlsdGVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZyYWNpIG9iamVrdCBmaWx0cnVcclxuICAgICAgICAgKiBAcGFyYW0ge0dDb250ZW50fSBjb250ZW50XHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIEdldEZpbHRlcigpOiBhbnkge1xyXG4gICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICBpZiAoR29yZGljLlV0aWxzLldpZGdldEV4aXN0cyhcImdmaWx0ZXJwYW5lbFwiLCB0aGlzLiRmaWx0ZXJQYW5lbCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kZmlsdGVyUGFuZWw7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRocm93IFwiTmVuYWxlemVuIGZpbHRyXCI7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIGNvbnRlbnQ/LmVsZW1lbnQuZmluZChcIi5qcy1maWx0ci5nZmlsdGVycGFuZWxcIik7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuICQoXCIuanMtZmlsdHJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBOYWN0ZW5pIGRhdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGxvYWREYXRhKGZpbHRlcj86IGFueSk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBHb3JkaWMuSXNsLlZpZXcoR29yZGljLklzbC5VY3JQb3phZGF2ZWsubGlzdCh7IGZpbHRlcnM6IHsgaXhzX3NlczogdHlwTXNrIH0gfSkpO1xyXG4gICAgICAgICAgICBsZXQgZmlsdHI6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFa29TZXpuYW1EcGhGaWx0ZXJEdG8gPSB7XHJcbiAgICAgICAgICAgICAgICBpY286IHsgc3RhcnQ6IHRoYXQuZWtvUGFyYW1zLkljbyBhcyBzdHJpbmcsIGVuZDogdGhhdC5la29QYXJhbXMuSWNvIGFzIHN0cmluZyB9XHJcbiAgICAgICAgICAgICAgICAsIHJvazogeyBzdGFydDogdGhhdC5la29QYXJhbXMuUm9rIGFzIG51bWJlciwgZW5kOiB0aGF0LmVrb1BhcmFtcy5Sb2sgYXMgbnVtYmVyIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgaWYgKCFmaWx0ZXIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfZmlsdGVyID0gdGhhdC5HZXRGaWx0ZXIoKTtcclxuICAgICAgICAgICAgICAgIGZpbHRlciA9IF9maWx0ZXIuZ2ZpbHRlcnBhbmVsKCdnZXRDb25maXJtZWREYXRhJyk7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmlsdHJbXCJtZXNpY1wiXSA9IHsgc3RhcnQ6IGZpbHRlci5tZXNpY29kIGFzIGFueSwgZW5kOiBmaWx0ZXIubWVzaWNkbyBhcyBhbnkgfTtcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgR29yZGljLklzbC5VY3JEcGgubGlzdERhbm92YUV2aWRlbmNlKHsgZmlsdGVyOiBmaWx0ciB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZC5nZ3JpZChcIm9wdGlvblwiLCBcImNvbHVtbnNcIiwgdGhhdC5jcmVhdGVHcmlkRm9ybWF0KHJlc3VsdC5Db2xzISkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY29scyA9IHJlc3VsdC5Db2xzITtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEFjdGlvbnMocmVzdWx0Lkxpc3RWYWx1ZXM/Lmxlbmd0aCBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZShyZXN1bHQuTGlzdFZhbHVlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LmRhdGEgPSByO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC4kZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgbmV3IEdvcmRpYy5EYXRhLlZpZXcocmVzdWx0Lkxpc3RWYWx1ZXMgYXMgYW55W10pKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgWmRhIHpvYnJhem92YXQgbWVzaWMgRFBIXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGlzTWVzaWNEUEgoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBfZmlsdGVyID0gdGhpcy5HZXRGaWx0ZXIoKTtcclxuICAgICAgICAgICAgdmFyIGZpbHRlciA9IF9maWx0ZXIuZ2ZpbHRlcnBhbmVsKCdnZXRDb25maXJtZWREYXRhJyk7ICAgICBcclxuICAgICAgICAgICAgaWYgKGZpbHRlci5tZXNpY29kICE9IG51bGwgJiYgZmlsdGVyLm1lc2ljZG8gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBmaWx0ZXIubWVzaWNvZCAhPSBmaWx0ZXIubWVzaWNkbztcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgZ3JpZGZvcm1hdHUgZGxlIHByZWRsb2h5XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGNvbERlZmluaXRpb25cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoY29sRGVmaW5pdGlvbjogR29yZGljLlVjdC5JbnRlcmZhY2UuR0Vrb2Nza29EdG9bXSk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQge1xyXG4gICAgICAgICAgICB2YXIgbXlHcmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHN0YXRpY2tlIHNsb3VwY2VcclxuICAgICAgICAgICAvLyBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgLy8gICAgIG5hbWU6IFwiZWNfZGRcIiAsXHJcbiAgICAgICAgICAgLy8gICAgIGNhcHRpb246IFwiZWNfZGRcIixcclxuICAgICAgICAgICAvLyAgICAgd2lkdGg6IDkwLFxyXG4gICAgICAgICAgIC8vICAgICB2aXNpYmxlOmZhbHNlXHJcbiAgICAgICAgICAgLy8gfSlcclxuICAgICAgICAgICAvLy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAvLyAgICBuYW1lOiBcImRpY1wiLFxyXG4gICAgICAgICAgIC8vICAgIGNhcHRpb246IFwiZGljXCIsXHJcbiAgICAgICAgICAgLy8gICAgd2lkdGg6IDkwLFxyXG4gICAgICAgICAgIC8vICAgIHZpc2libGU6IGZhbHNlXHJcbiAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTWVzaWNEUEgoKSkge1xyXG4gICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtZXNpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDA4OFwiLCAvL1JDIDMwMjUwMDg4IDogTcSbc8OtY1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHZ5dHZvcmVuaSBkZWZpbmljbmljaCBzbG91cGN1XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29sRGVmaW5pdGlvbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbCA9IGNvbERlZmluaXRpb25baV07XHJcbiAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJIX1wiICsgY29sLmtsaWMsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogY29sLmtsaWNfdHh0IGFzIGFueSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBteUdyaWRGb3JtYXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
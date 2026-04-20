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
            let GSeznamDanovePriznaniA = class GSeznamDanovePriznaniA extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    // nastaveni id a titulku okna
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
                    // schovam grid
                    this.$grid.hide();
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
                        title: "jres:30250099".format(row.ec_dd, row.rok.toString() + "/" + row.mesic.toString()) //RC 30250099 : Zápisy DPH:{0}, {1}
                    });
                }
                /**
                 * Uprava viditelnosti akci
                 *
                 * */
                setActions(pocetRadku) {
                    // pokud neni grid, nic nedelej
                    if (this.closed || !this.$grid)
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
                        that.$grid.show();
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
            GSeznamDanovePriznaniA = __decorate([
                Decorators.gcontent
            ], GSeznamDanovePriznaniA);
            WebClient.GSeznamDanovePriznaniA = GSeznamDanovePriznaniA;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbURhbm92ZVByaXpuYW5pQS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTZXpuYW1EYW5vdmVQcml6bmFuaUEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQXdYZjtBQXhYRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F3WG5CO0lBeFhnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F3WDdCO1FBeFhvQixXQUFBLFNBQVM7WUFDMUI7Ozs7O2VBS0c7WUFFSCxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUF1QixTQUFRLE9BQUEsWUFBWTtnQkFBeEQ7O29CQWNJLDhCQUE4QjtvQkFDOUIsVUFBSyxHQUFHLGVBQWUsQ0FBQyxDQUFDLCtCQUErQjtnQkFnVzVELENBQUM7Z0JBL1ZHLGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQzt3QkFDYixJQUFJLEVBQUUsUUFBUTt3QkFDZCxJQUFJLEVBQUUsV0FBVzt3QkFDakIsT0FBTyxFQUFFLGVBQWUsRUFBRyxzQkFBc0I7d0JBQ2pELE9BQU8sRUFBRSxLQUFLO3dCQUNkLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUNsQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQzs0QkFDeEMsSUFBSSxHQUFHLEtBQUssSUFBSTtnQ0FDWixPQUFPOzRCQUNYLG1CQUFtQjs0QkFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFO2dDQUM3RyxhQUFhLEVBQUUsS0FBSzs2QkFDdkIsQ0FB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LENBQUMsQ0FBQztvQkFDUCxDQUFDO29CQUVELGdDQUFnQztvQkFDaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDNUMsSUFBSSxHQUFHLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzQixZQUFZLENBQUMsYUFBYSxDQUFDOzRCQUN2QixJQUFJLEVBQUUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJOzRCQUNyQixPQUFPLEVBQUUsR0FBRyxDQUFDLFFBQWU7eUJBQy9CLENBQUMsQ0FBQztvQkFDUCxDQUFDO29CQUNELE9BQU8sWUFBWSxDQUFDO2dCQUN4QixDQUFDO2FBQ0osQ0FBQTtZQS9XWSxzQkFBc0I7Z0JBRGxDLFVBQVUsQ0FBQyxRQUFRO2VBQ1Asc0JBQXNCLENBK1dsQztZQS9XWSxnQ0FBc0IseUJBK1dsQyxDQUFBO1FBQ0wsQ0FBQyxFQXhYb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBd1g3QjtJQUFELENBQUMsRUF4WGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXdYbkI7QUFBRCxDQUFDLEVBeFhTLE1BQU0sS0FBTixNQUFNLFFBd1hmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5VY3IuV2ViQ2xpZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogRGFub3ZlIHByaXpuYW5pXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgdGthcmVzXHJcbiAgICAgKiBAc2luY2UgNDg0LjEuMC42OVxyXG4gICAgICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1EYW5vdmVQcml6bmFuaUEgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG5cclxuICAgICAgICBwcml2YXRlIGVrb1BhcmFtczogR29yZGljLlVjci5XZWJDbGllbnQuR0Vrb1BhcmFtc0R0bztcclxuICAgICAgICAvLyBzZXpuYW0gbWVzaWN1LCBwcmVzIGt0ZXJlIGx6ZSBmaWx0cm92YXRcclxuICAgICAgICBwcml2YXRlIGZpbHRlck1vbnRoOiBudW1iZXJbXTsgXHJcbiAgICAgICAgLy8gZmlsdHJvdmFjaSBwYW5lbFxyXG4gICAgICAgIHByaXZhdGUgJGZpbHRlclBhbmVsOiBKUXVlcnk7XHJcbiAgICAgICAgLy8gZ3JpZCBzZSBzZW5hbWVtXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjsgICAgICAgIFxyXG4gICAgICAgIC8vIGtvbnRyb2xlciBwcm8gcHJldmllIG9rbm9cclxuICAgICAgICBwcml2YXRlIHByZXZpZXdDb250cm9sbGVyOiBHb3JkaWMuUHJldmlld3MuR1ByZXZpZXdDb250cm9sbGVyO1xyXG5cclxuICAgICAgICBwcml2YXRlIGNvbHM6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFa29jc2tvRHRvW107XHJcblxyXG4gICAgICAgIC8vIG5hc3RhdmVuaSBpZCBhIHRpdHVsa3Ugb2tuYVxyXG4gICAgICAgIHRpdGxlID0gXCJqcmVzOjMwMjUwMDg1XCI7IC8vUkMgMzAyNTAwODUgOiBEYcWIb3bDoSBldmlkZW5jZVxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic2VsQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTU2XCIsICAvL1JDIDMxMTAwMTU2IDogRGV0YWlsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gdGhhdC4kZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL3pvYnJhemVuaSBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShHb3JkaWMuVWNyLldlYkNsaWVudC5HRGV0YWlsRGFub3ZlRXZpZGVuY2UsIHsgY3VycmVudFJvdzogcm93LCB2aWV3TW9kZTogZmFsc2UsIGNvbHM6IHRoYXQuY29scyB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlT25Fc2NhcGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiemFwaXN5QWN0XCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImdpLWxpc3RcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDg5XCIsIC8vUkMgMzAyNTAwODkgOiBaw6FwaXN5XHJcbiAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IHRoYXQuJGdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PT0gbnVsbCApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3daYXBpc3kocm93KVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAgLy97IGFjdGlvbjogdGhhdC5hY3Rpb25zLm5ld0FjdCwgZmF2b3JpdGU6IHRydWUsIGNhcHRpb25WaXNpYmxlOiBcIm5ldmVyXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuc2VsQWN0LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy56YXBpc3lBY3QsIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICAvLyB2eXR2b3JlbmkgZml0cnUgcGFuZWx1XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRmlsdGVyUGFuZWwodGhpcyk7IFxyXG5cclxuICAgICAgICAgICAgbGV0IHByb3ZpZGVyID0gbmV3IEdvcmRpYy5EYXRhLlByb3ZpZGVyPGFueSxhbnksYW55PigoZmlsdGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5sb2FkRGF0YShmaWx0ZXIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoW10sIHsgIHByb2Nlc3NvcnM6IHsgIHByb3ZpZGVyOiBwcm92aWRlciB9IH0pO1xyXG4gICAgICAgICAgICB0aGlzLiRncmlkID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdmlldyxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGZ1bmN0aW9uIChldiwgaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93cyA9IGluZm8uZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5jbGVhckNvbnRyb2xzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3dzLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLmVuYWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIuc2hvdyh7IGN1cnJlbnRSb3c6IHJvd3NbMF0sIHZpZXdNb2RlOiB0cnVlLCBjb2xzOiB0aGF0LmNvbHMgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0sICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhOiBhbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LmNlbGxJbmZvICYmIGN0eC5jZWxsSW5mby5kYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBjdHguY2VsbEluZm8uZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gdGhhdC4kZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vem9icmF6ZW5pIGRldGFpbHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoR29yZGljLlVjci5XZWJDbGllbnQuR0RldGFpbERhbm92ZUV2aWRlbmNlLCB7IGN1cnJlbnRSb3c6IGRhdGEsIHZpZXdNb2RlOiBmYWxzZSwgY29sczogdGhhdC5jb2xzIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZU9uRXNjYXBlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IFtcIm5hemV2XCIsIFwiaG9kbm90YVwiXSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8jcmVnaW9uIERlZmluaWNlIHNsb3VwY3VcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIHBvYy4gbmFzdGF2ZW5pIGZpbHRydVxyXG4gICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJNb250aC5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKCdtZXNpY29kLG1lc2ljZG8nKS5nZmllbGQoJ3NldFZhbHVlJywgdGhpcy5maWx0ZXJNb250aFt0aGlzLmZpbHRlck1vbnRoLmxlbmd0aCAtIDFdKTtcclxuICAgICAgICAgICAgLy8gc2Nob3ZhbSBncmlkXHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWQuaGlkZSgpO1xyXG4gICAgICAgICAgICAvLyNyZWdpb24gUHJldmlldyB2IHNpZGViYXJ1XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZ3NpZGViYXIoXCJvcHRpb25cIiwgXCJyaWdodFwiLCB7IHVzZXJTZXR0aW5nczogdGhpcy51c2VyU2V0dGluZ3MhLCB3aWR0aDogNTAwLCB2aXNpYmxlOiB0cnVlLCBwaW5uZWQ6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnByZXZpZXdDb250cm9sbGVyID0gbmV3IEdvcmRpYy5QcmV2aWV3cy5HUHJldmlld0NvbnRyb2xsZXIodGhpcy5lbGVtZW50LCB7XHJcbiAgICAgICAgICAgICAgICB1c2VTdWJ0YXNrOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHBhbmVsT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDA5N1wiLCAvL1JDIDMwMjUwMDk3IDogTsOhaGxlZCBkZXRhaWx1IGRhxYhvdsOpIGV2aWRlbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgc2lkZTogXCJyaWdodFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGFiczogW3tcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwOTdcIiwgLy9SQyAzMDI1MDA5NyA6IE7DoWhsZWQgZGV0YWlsdSBkYcWIb3bDqSBldmlkZW5jZVxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUxvYWQ6ICh0YWIsIGR0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZWxtID0gJChcIjxkaXY+XCIpLmdjb250ZW50KEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdEZXRhaWxEYW5vdmVFdmlkZW5jZSwgeyBwYXJlbnRDb250ZW50OiB0aGlzIH0pOyAvL051dG5lIHBybyBzcHJhdm5lIHNwb2plbmkgcyBrb250ZXh0ZW0gaGxhdm5paG8gY29udGVudHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgdGFiU2V0dGluZ3MgPSBkdG8udGFiU2V0dGluZ3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVsZXRlIGR0by50YWJTZXR0aW5nczsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5jb250ZW50PEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdEZXRhaWxEYW5vdmVFdmlkZW5jZT4oZWxtKS5pbml0KGR0byk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRhYikuZW1wdHkoKS5hcHBlbmQoZWxtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LiRncmlkLmdncmlkKFwiZm9jdXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgc2hvd1phcGlzeShyb3c6YW55KTogdm9pZCB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCBpZDogc3RyaW5nO1xyXG5cclxuICAgICAgICAgICAgLy9OT1RFOiBPZHBvdmlkYSB6IFRLIFVDUjogR1Nlem5hbVphcGlzdVZSYWRrdVRhYi5Mb2FkR3JpZERhdGEoKVxyXG4gICAgICAgICAgICBsZXQgZmlsdGVyOiBHRWtvRmlsdGVyRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgcm9rX3VlajogeyBzdGFydDogcm93LnJvayEsIGVuZDogcm93LnJvayEgfSxcclxuICAgICAgICAgICAgICAgIG1lc2ljX3VlajogeyBzdGFydDogcm93Lm1lc2ljLCBlbmQ6IHJvdy5tZXNpYyB9LCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IHR5cFVsb2h5ID0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5EYW5vdmFFdmlkZW5jZVphcGlzO1xyXG4gICAgICAgICAgICBpZCA9IFwidWN0WmFwaXN5I1wiOyAvL05PVEU6IE11c2kgYnl0IHN0ZWpuZSBuaSBuYSBNYWluQXBwLmNzXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZSgnR29yZGljLlVjci5XZWJDbGllbnQuR1Nlem5hbUVrb1phem5hbXUnLCB7XHJcbiAgICAgICAgICAgICAgICBJRDogaWQsXHJcbiAgICAgICAgICAgICAgICBUeXBVbG9oeTogdHlwVWxvaHksXHJcbiAgICAgICAgICAgICAgICBGaWx0ZXI6IGZpbHRlcixcclxuICAgICAgICAgICAgICAgIFN0cmljdEZpbHRlcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBFY2RkOiByb3cuZWNfZGQsXHJcbiAgICAgICAgICAgICAgICBEaWM6cm93LmRpYyxcclxuICAgICAgICAgICAgICAgIFphcGlzb3ZhOnRydWUsXHJcbiAgICAgICAgICAgICAgICAvL0ZpbHRlclN0clBvcGlzOiBmLmZpbHRlclN0clBvcGlzLFxyXG4gICAgICAgICAgICAgICAgQXV0b0xvYWREYXRhOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDA5OVwiLmZvcm1hdChyb3cuZWNfZGQsIHJvdy5yb2sudG9TdHJpbmcoKSArIFwiL1wiICsgcm93Lm1lc2ljLnRvU3RyaW5nKCkpIC8vUkMgMzAyNTAwOTkgOiBaw6FwaXN5IERQSDp7MH0sIHsxfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVwcmF2YSB2aWRpdGVsbm9zdGkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRBY3Rpb25zKHBvY2V0UmFka3U6IG51bWJlcikge1xyXG4gICAgICAgICAgICAvLyBwb2t1ZCBuZW5pIGdyaWQsIG5pYyBuZWRlbGVqXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsb3NlZCB8fCAhdGhpcy4kZ3JpZCkgcmV0dXJuOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuc2VsQWN0IS51cGRhdGUoeyBlbmFibGVkOiBwb2NldFJhZGt1ID4gMCB9KTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLnphcGlzeUFjdCEudXBkYXRlKHsgZW5hYmxlZDogcG9jZXRSYWRrdSA+IDAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogZnVuY3Rpb24gQ3JlYXRlRmlsdGVyWmFsb3prYVxyXG4gICAgICAgICogICAgICBcclxuICAgICAgICAqIE9iZWNuYSB6YWxvemthXHJcbiAgICAgICAgKiBAcGFyYW0ge0dDb250ZW50fSBjb250ZW50XHJcbiAgICAgICAgKiBAcmV0dXJucyB7YW55fVxyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBDcmVhdGVGaWx0ZXJaYWxvemthKCk6IGFueSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB2YXIgZmlsdGVyRm9ybURlZiA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IC8qb3BlbmVkOiB0cnVlLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMSwgTC0zLTgtMSwgTS0xMi0xMS0xLCBTLTEyLTExLTFcIiwqLyB0YWJMYWJlbDogXCJqcmVzOjMwMjUwMDUyXCIgfSkgIC8vUkMgMzAyNTAwNTIgOiBGaWx0clxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ2Zvcm1ib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgZm9ybTogZnJtLCBpdGVtVGVtcGxhdGU6XCJ7bWVzaWMxfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiTcSbc8OtYyBEUEggb2RcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgeyBcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1lc2ljb2RcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgbXVsdGk6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgLCBsaXN0OiBmYWxzZSwgaXRlbVdpZHRoOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBkcm9wZG93bjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vLCBtb2RlbDogXCJtb2RlbC5wcml6X3pwbF9raD12YWx1ZS5wcml6X3pwbF9raFwiXHJcbiAgICAgICAgICAgICAgICAgICAgLy8sIGl0ZW1UZW1wbGF0ZTogXCJ7cHJpel96cGxfa2hfdHh0fVwiXHJcbiAgICAgICAgICAgICAgICAgICAgLy8sIG1vZGVsRGVmYXVsdHM6IHRoYXQuZmlsdGVydE1vbnRoW3RoYXQuZmlsdGVydE1vbnRoLmxlbmd0aCAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLCBkYXRhOiB0aGF0LmZpbHRlck1vbnRoXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImRvXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtZXNpY2RvXCIsIG11bHRpOiBmYWxzZSwgbGlzdDogZmFsc2UsIGl0ZW1XaWR0aDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgZHJvcGRvd246IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAvLywgbW9kZWw6IFwibW9kZWwucHJpel96cGxfa2g9dmFsdWUucHJpel96cGxfa2hcIlxyXG4gICAgICAgICAgICAgICAgICAgIC8vLCBpdGVtVGVtcGxhdGU6IFwie3ByaXpfenBsX2toX3R4dH1cIlxyXG4gICAgICAgICAgICAgICAgICAgIC8vLCBtb2RlbERlZmF1bHRzOiB0aGF0LmZpbHRlcnRNb250aFt0aGF0LmZpbHRlcnRNb250aC5sZW5ndGhdXHJcbiAgICAgICAgICAgICAgICAgICAgLCBkYXRhOiB0aGF0LmZpbHRlck1vbnRoXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJGb3JtRGVmO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgZmlsdHJvdmFjaWhvIHBhbmVsdVxyXG4gICAgICAgICAqIEBwYXJhbSB0aGF0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXJQYW5lbCh0aGF0OiB0aGlzKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRmaWx0ZXJQYW5lbCA9ICQoXCI8ZGl2IGNsYXNzPSdqcy1maWx0cic+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmaWx0ZXJwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyQ3VzdG9taXplcjogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvbFNvcnQgPSBkYXRhLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEubmFtZSA+PSBiLm5hbWU7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcG9sU29ydDtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1zOiBbdGhhdC5DcmVhdGVGaWx0ZXJaYWxvemthKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZmlsdGVyVmlld01vZGU6IGRlZkZpbHRydSwvLyBGaWx0ZXJWaWV3TW9kZS5EZXRhaWwsICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL2Zhdm9yaXRlczogW1wiaXhwXCIsIFwiaXhzX3R5cFwiLCBcInZsYXN0bmlfZG9rbGFkeVwiXSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0xvYWRBZnRlckNob3NlRmlsdGVyOiB0cnVlLCAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zYXZlT3B0aW9uc0Zvcm06IFwiZWtvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RvcmFnZVNlcnZpY2U6IG5ldyBHb3JkaWMuR2luLkZpbHRlclN0b3JhZ2VTZXJ2aWNlLlN0b3JlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVmlld01vZGVVc2VyU2V0dGluZ3M6IFwiRGVueVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIDAxLjAzLjIwMjEgLSBURmVpa1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5haHJhemVuw60gb2Jzb2xldGUgcGFyYW1ldHLFry5cclxuICAgICAgICAgICAgICAgICAgICBhdXRvTG9hZEFmdGVyQ3JlYXRlUGFuZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdXNlckRlZmF1bHRGaWx0ZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVmlld01vZGU6IEZpbHRlclZpZXdNb2RlLlNpbXBsZSxcclxuICAgICAgICAgICAgICAgICAgICAvL3NpbXBsZU1vZGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVMYXlvdXREZXNjcmlwdG9yOiBcIkw0TTNTMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZmlsdGVySGVscGVySXRlbVRlbXBsYXRlOiBcIjxiPntuYXpldn08L2I+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXh0SXRlbVRlbXBsYXRlOiBcIntuYXpldn1cIixcclxuICAgICAgICAgICAgICAgICAgICBhcHBseTogZnVuY3Rpb24gKGV2ZW50LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaWx0ZXJGb3JtLmFwcGx5XCIsIG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9nLnRyYWNlKFwiZmlsdGVyRm9ybS5hcHBseVwiLCBvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmlldyA9IHRoYXQuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LnJlcXVlc3REYXRhKG9iai5maWx0ZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnJhY2kgb2JqZWt0IGZpbHRydVxyXG4gICAgICAgICAqIEBwYXJhbSB7R0NvbnRlbnR9IGNvbnRlbnRcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgR2V0RmlsdGVyKCk6IGFueSB7XHJcbiAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgIGlmIChHb3JkaWMuVXRpbHMuV2lkZ2V0RXhpc3RzKFwiZ2ZpbHRlcnBhbmVsXCIsIHRoaXMuJGZpbHRlclBhbmVsKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRmaWx0ZXJQYW5lbDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJOZW5hbGV6ZW4gZmlsdHJcIjtcclxuICAgICAgICAgICAgLy9yZXR1cm4gY29udGVudD8uZWxlbWVudC5maW5kKFwiLmpzLWZpbHRyLmdmaWx0ZXJwYW5lbFwiKTtcclxuICAgICAgICAgICAgLy9yZXR1cm4gJChcIi5qcy1maWx0clwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIE5hY3RlbmkgZGF0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbG9hZERhdGEoZmlsdGVyPzogYW55KTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IEdvcmRpYy5Jc2wuVmlldyhHb3JkaWMuSXNsLlVjclBvemFkYXZlay5saXN0KHsgZmlsdGVyczogeyBpeHNfc2VzOiB0eXBNc2sgfSB9KSk7XHJcbiAgICAgICAgICAgIGxldCBmaWx0cjogR29yZGljLlVjdC5JbnRlcmZhY2UuR0Vrb1Nlem5hbURwaEZpbHRlckR0byA9IHtcclxuICAgICAgICAgICAgICAgIGljbzogeyBzdGFydDogdGhhdC5la29QYXJhbXMuSWNvIGFzIHN0cmluZywgZW5kOiB0aGF0LmVrb1BhcmFtcy5JY28gYXMgc3RyaW5nIH1cclxuICAgICAgICAgICAgICAgICwgcm9rOiB7IHN0YXJ0OiB0aGF0LmVrb1BhcmFtcy5Sb2sgYXMgbnVtYmVyLCBlbmQ6IHRoYXQuZWtvUGFyYW1zLlJvayBhcyBudW1iZXIgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICBpZiAoIWZpbHRlcikge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9maWx0ZXIgPSB0aGF0LkdldEZpbHRlcigpO1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyID0gX2ZpbHRlci5nZmlsdGVycGFuZWwoJ2dldENvbmZpcm1lZERhdGEnKTsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmaWx0cltcIm1lc2ljXCJdID0geyBzdGFydDogZmlsdGVyLm1lc2ljb2QgYXMgYW55LCBlbmQ6IGZpbHRlci5tZXNpY2RvIGFzIGFueSB9O1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICBHb3JkaWMuSXNsLlVjckRwaC5saXN0RGFub3ZhRXZpZGVuY2UoeyBmaWx0ZXI6IGZpbHRyIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkLmdncmlkKFwib3B0aW9uXCIsIFwiY29sdW1uc1wiLCB0aGF0LmNyZWF0ZUdyaWRGb3JtYXQocmVzdWx0LkNvbHMhKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jb2xzID0gcmVzdWx0LkNvbHMhO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0QWN0aW9ucyhyZXN1bHQuTGlzdFZhbHVlcz8ubGVuZ3RoIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZC5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKHJlc3VsdC5MaXN0VmFsdWVzKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZGF0YSA9IHI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LiRncmlkLmdncmlkKFwic2V0RGF0YVwiLCBuZXcgR29yZGljLkRhdGEuVmlldyhyZXN1bHQuTGlzdFZhbHVlcyBhcyBhbnlbXSkpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBaZGEgem9icmF6b3ZhdCBtZXNpYyBEUEhcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgaXNNZXNpY0RQSCgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIF9maWx0ZXIgPSB0aGlzLkdldEZpbHRlcigpO1xyXG4gICAgICAgICAgICB2YXIgZmlsdGVyID0gX2ZpbHRlci5nZmlsdGVycGFuZWwoJ2dldENvbmZpcm1lZERhdGEnKTsgICAgIFxyXG4gICAgICAgICAgICBpZiAoZmlsdGVyLm1lc2ljb2QgIT0gbnVsbCAmJiBmaWx0ZXIubWVzaWNkbyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlci5tZXNpY29kICE9IGZpbHRlci5tZXNpY2RvO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBncmlkZm9ybWF0dSBkbGUgcHJlZGxvaHlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gY29sRGVmaW5pdGlvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdChjb2xEZWZpbml0aW9uOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRWtvY3Nrb0R0b1tdKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdCB7XHJcbiAgICAgICAgICAgIHZhciBteUdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gc3RhdGlja2Ugc2xvdXBjZVxyXG4gICAgICAgICAgIC8vIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAvLyAgICAgbmFtZTogXCJlY19kZFwiICxcclxuICAgICAgICAgICAvLyAgICAgY2FwdGlvbjogXCJlY19kZFwiLFxyXG4gICAgICAgICAgIC8vICAgICB3aWR0aDogOTAsXHJcbiAgICAgICAgICAgLy8gICAgIHZpc2libGU6ZmFsc2VcclxuICAgICAgICAgICAvLyB9KVxyXG4gICAgICAgICAgIC8vLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgIC8vICAgIG5hbWU6IFwiZGljXCIsXHJcbiAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJkaWNcIixcclxuICAgICAgICAgICAvLyAgICB3aWR0aDogOTAsXHJcbiAgICAgICAgICAgLy8gICAgdmlzaWJsZTogZmFsc2VcclxuICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNNZXNpY0RQSCgpKSB7XHJcbiAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1lc2ljXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDg4XCIsIC8vUkMgMzAyNTAwODggOiBNxJtzw61jXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gdnl0dm9yZW5pIGRlZmluaWNuaWNoIHNsb3VwY3VcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2xEZWZpbml0aW9uLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29sID0gY29sRGVmaW5pdGlvbltpXTtcclxuICAgICAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkhfXCIgKyBjb2wua2xpYyxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBjb2wua2xpY190eHQgYXMgYW55LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG15R3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
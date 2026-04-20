"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Roz;
    (function (Roz) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GRozManagerCile = 
            /**
             *  Seznam dokladu ze smluv a EVZ
             */
            class GRozManagerCile extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.classGrid = "js-SeznamCiluGrid"; // identifikator gridu
                    this.classFilter = "js-filter"; // identifikator filtru
                    this._loading = false;
                }
                onContentReady() {
                    this.Inicializace();
                }
                prepareContent(options) {
                    this.taskId = "iSeznamCilu";
                    this.options = options;
                    this.Inicializace();
                }
                /**
                 * Inicializace kontextu
                 *
                 */
                Inicializace() {
                    this._loading = true;
                    // vytvoreni akci
                    this.createActions();
                    // vytvoreni commandbaru
                    this.createCommandBar();
                    // vytvoreni fitru panelu
                    this.createFilterPanel(this);
                    // vytvoreni gridu
                    this.createGrid();
                    // nastaveni jmena
                    this.setTitle();
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    // nastaveni vybraneho radku radku
                    const row = this.findRowByCil(this.options.ixs_evp);
                    if (row != null)
                        Gordic.Eko.WebClient.Common.setCurrentRow(grid, row);
                    this._loading = false;
                }
                /**
                 * Vytvoreni commandbaru
                 *
                 */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["acOk!", "actClose*"]));
                }
                /**
                 *
                 * Nastaveni titulku okna
                 *
                 */
                setTitle() {
                    this.title = "jres:30250480"; //RC 30250480 : Výběr výkonného rozp.kompetenta
                }
                /**
                 * Nacteni dat
                 * @returns
                 */
                reloadData() {
                    let that = this;
                    this.log.trace("reloadData");
                    const grd = this.getGrid();
                    if (grd == null)
                        return;
                    var view = grd.ggrid("getView");
                    view.requestData().
                        then(() => { that._loading = false; that.aktualizaceAction(); });
                }
                /**
                 * Vytvoreni filtrovaciho panelu
                 * @param that
                 */
                createFilterPanel(that) {
                    $.newDiv(that.classFilter)
                        .appendTo(this.element)
                        .gfilterpanel({
                        forms: [that.createFilterZalozka()],
                        filterViewMode: FilterViewMode.Simple,
                        clearFilterButtonVisible: "NeverVisible",
                        autoLoadAfter: ["ChoseFilter"],
                        autoLoadAfterUserSettings: "Deny",
                        filterViewModeUserSettings: "Deny",
                        favoriteLayoutDescriptor: "L2M1S1 L-12-12-0 M-12-12-0 S-12-12-0",
                        apply: function (event, obj) {
                            that.log.trace("filterForm.apply", obj);
                            that.reloadData();
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
                createFilterZalozka() {
                    let that = this;
                    // nacteni dat
                    let view = new Gordic.Data.View(that.options.ListCiluEO);
                    let filterFormDef = new Gordic.Forms.Form({ /*tabLabel: "jres:30250052", */ layoutDescriptor: "L4M3S12, L-12-12-0, M-12-11-1, S-12-11-1", }) //RC 30250052 : Filtr
                        .addSection()
                        .addRow("jres:30250493") //RC 30250493 : Cíl ekonomického orgánu
                        .addField("gselectbox", {
                        name: "ixp_den", model: "nazev=value.nazev,ixs_evp=value.ixs_evp,uko=value.uko,uroven=value.uroven",
                        disabled: false,
                        initialValue: that.options.SelectedCilEO > -1 ? that.options.ListCiluEO[that.options.SelectedCilEO] : void 0,
                        itemTemplate: "{uko:trim:encode} {nazev:trim:encode}",
                        data: view,
                        dropdown: true,
                        change: (ev, val) => {
                            debugger;
                            if (that._loading)
                                return;
                            that._loading = true;
                            that.aktualizaceAction();
                            that.reloadData();
                            //const filtr = this.getFilter();
                            //filtr.gfilterpanel("applyFilter");
                        }
                    });
                    return filterFormDef;
                }
                /**
                 * Vraci objekt filtru
                 * @param {GContent} content
                 * @returns
                 */
                getFilter() {
                    var data = this.element.find("." + this.getClassFilter());
                    if (Gordic.Utils.WidgetExists("gfilterpanel", data))
                        return data;
                    else
                        throw new GError("jres:30250497"); //RC 30250497 : Filtr nenalezen
                    //return content?.element.find(".js-filtr.gfilterpanel");
                    //return $(".js-filtr");
                }
                /**
                 * Nacteni dat
                 *
                 */
                loadData() {
                    let _filter = this.getFilter();
                    debugger;
                    let filtry = _filter.gfilterpanel('getCurrentData');
                    return this.isl.RozManagerCile.listStromCilu({ idCile: filtry.ixs_evp, uroven: filtry.uroven }).get();
                }
                /**
                 * Vraci tridu gridu
                 *
                 */
                getClassGrid() {
                    return this.classGrid;
                }
                /**
                 * Vraci tridu gridu
                 *
                 */
                getClassFilter() {
                    return this.classFilter;
                }
                /**
                 * Vraci objekt gridu
                 * @param content
                 * @returns
                */
                getGrid() {
                    var data = this.element.find("." + this.getClassGrid());
                    return (data.length == 0 ? null : data);
                }
                /**
                 * Dohledani radku dle cilu
                 * @param ixs_evp
                 * @returns
                 */
                findRowByCil(ixs_evp) {
                    if (!ixs_evp || ixs_evp.trim() == "")
                        return;
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    let view = grid.ggrid("getView");
                    let data = view.getDataRows(false);
                    if (data.length > 0) {
                        let result = data.find((item) => item?.ixs_evp?.trim() == ixs_evp.trim());
                    }
                }
                /// <summary>
                /// Aktualizace menu
                /// </summary>
                aktualizaceAction() {
                    //var that = this;
                    const grid = this.getGrid();
                    if (grid == null)
                        return;
                    const pocet = Gordic.Eko.WebClient.Common.CelkovyPocetRadku(grid);
                    this.actions.acOk.update({
                        enabled: !this._loading && pocet > 0
                    });
                    this.actions.actClose.update({
                        enabled: !this._loading
                    });
                }
                /**
                 * Vytvoreni gridu
                 *
                 */
                createGrid() {
                    const that = this;
                    let view = new Gordic.Data.View(that.options.ListStromCilu, {
                        processors: {
                            provider: new Gordic.Data.Provider((req) => {
                                return that.loadData();
                            })
                        }
                    });
                    $.newDiv(this.classGrid)
                        //.css("height", "100%")
                        .appendTo(this.element)
                        .ggrid({
                        columnMode: "full", // fit (defaultne by melo byt toto), full
                        multi: false,
                        data: view,
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: function (ev, ctx) {
                                that.closeContent();
                            }
                        }),
                        //#region Definice sloupcu
                        columns: this.createGridFormat()
                        //#endregion
                    }).gautofit({ resizersOnTab: false });
                }
                /**
                 * Vytvoreni gridformatu
                 * @returns
                 */
                createGridFormat() {
                    return new Gordic.Data.GridFormat()
                        .addTextColumn({ name: "fun_nazev_vrk", caption: "jres:30250481", width: 220 }) //RC 30250481 : Výkonný rozp.kompetent
                        .addTextColumn({ name: "ref_nazev_vrk", caption: "jres:30250482", width: 170 }) //RC 30250482 : Referent
                        .addNumberColumn({
                        name: "uroven", caption: "jres:30250484", //RC 30250483 : Ú
                        description: "jres:30250484", width: 80 //RC 30250484 : Úroveň
                    })
                        .addTextColumn({ name: "uko", caption: "jres:30250485", width: 120 }) //RC 30250485 : Cíl
                        .addTextColumn({ name: "nazev", width: 320, caption: "jres:30250486" }); //RC 30250486 : Název cíle
                }
                /**
                 * Vytvoreni akci
                 *
                 */
                createActions() {
                    const that = this;
                    this.actions = new GActionList({
                        acOk: Gordic.Eko.Action.actionOk({
                            enabled: true,
                            caption: "jres:30250487", //RC 30250487 : Vybrat
                            run: function () {
                                that.closeContent();
                            }
                        }),
                        actClose: Gordic.Eko.Action.actionZrusit({
                            enabled: true,
                            run: function () {
                                that.tryClose();
                            }
                        }),
                    });
                }
                /**
                 * Uzavreni contentu
                 *
                 *
                 * @returns
                 */
                closeContent() {
                    const grid = this.getGrid();
                    if (grid == null)
                        return;
                    var radek = Gordic.Eko.Grid.currentRow(grid);
                    if (radek != null) {
                        // zjisteni filtru
                        const _filter = this.getFilter();
                        const filtry = _filter.gfilterpanel('getCurrentData');
                        this.close({ ixs_evp_eo: filtry.ixs_evp, ixs_evp: radek.ixs_evp, manager_cile_txt: radek.ref_nazev_vrk?.trim() + ", " + radek.fun_nazev_vrk?.trim(), ixs_fun_mng: radek.ixs_fun_vrk?.trim() });
                    }
                    else {
                        this.dialogs.messageBox("jres:30250488", //RC 30250488 : Upozornění
                        "jres:30250489"); //RC 30250489 : Není vybrán žádný řádek!
                    }
                }
            };
            GRozManagerCile = __decorate([
                gcontent
                /**
                 *  Seznam dokladu ze smluv a EVZ
                 */
            ], GRozManagerCile);
            WebClient.GRozManagerCile = GRozManagerCile;
        })(WebClient = Roz.WebClient || (Roz.WebClient = {}));
    })(Roz = Gordic.Roz || (Gordic.Roz = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Jvek1hbmFnZXJDaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Jvek1hbmFnZXJDaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0EyVWY7QUEzVUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMlVuQjtJQTNVZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBMlU3QjtRQTNVb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFNbkMsSUFBYSxlQUFlO1lBSDVCOztlQUVHO1lBQ0gsTUFBYSxlQUFnQixTQUFRLE9BQUEsWUFBWTtnQkFBakQ7O29CQUdxQixjQUFTLEdBQUcsbUJBQW1CLENBQUMsQ0FBQyxzQkFBc0I7b0JBQ3ZELGdCQUFXLEdBQUcsV0FBVyxDQUFDLENBQUMsdUJBQXVCO29CQUkzRCxhQUFRLEdBQUcsS0FBSyxDQUFDO2dCQTJUN0IsQ0FBQztnQkF6VEcsY0FBYztvQkFDVixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3hCLENBQUM7Z0JBRUQsY0FBYyxDQUFDLE9BQThCO29CQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDeEIsQ0FBQztnQkFFRDs7O21CQUdHO2dCQUNJLFlBQVk7b0JBRWYsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBQ3JCLGlCQUFpQjtvQkFDakIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQix3QkFBd0I7b0JBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4Qix5QkFBeUI7b0JBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDN0Isa0JBQWtCO29CQUNsQixJQUFJLENB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TUFBTSxLQUFOLE1BQU0sUUEyVWYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlJvei5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIC8qKlxyXG4gICAgICogIFNlem5hbSBkb2tsYWR1IHplIHNtbHV2IGEgRVZaXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBHUm96TWFuYWdlckNpbGUgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NvbnRlbnQsIElHQ2xpZW50Q29udGVudCB7XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGNsYXNzR3JpZCA9IFwianMtU2V6bmFtQ2lsdUdyaWRcIjsgLy8gaWRlbnRpZmlrYXRvciBncmlkdVxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgY2xhc3NGaWx0ZXIgPSBcImpzLWZpbHRlclwiOyAvLyBpZGVudGlmaWthdG9yIGZpbHRydVxyXG5cclxuICAgICAgICAvLyB2c3R1cG5pIHBhcmFtZXRyeVxyXG4gICAgICAgIHByaXZhdGUgb3B0aW9uczogR1Jvek9wdGlvbk1hbmFnZXJDaWx1O1xyXG4gICAgICAgIHByaXZhdGUgX2xvYWRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuSW5pY2lhbGl6YWNlKCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcmVwYXJlQ29udGVudChvcHRpb25zOiBHUm96T3B0aW9uTWFuYWdlckNpbHUpIHtcclxuICAgICAgICAgICAgdGhpcy50YXNrSWQgPSBcImlTZXpuYW1DaWx1XCI7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICAgICAgICAgIHRoaXMuSW5pY2lhbGl6YWNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbmljaWFsaXphY2Uga29udGV4dHVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgSW5pY2lhbGl6YWNlKCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5fbG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIHZ5dHZvcmVuaSBha2NpXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAvLyB2eXR2b3JlbmkgY29tbWFuZGJhcnVcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21tYW5kQmFyKCk7XHJcbiAgICAgICAgICAgIC8vIHZ5dHZvcmVuaSBmaXRydSBwYW5lbHVcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGaWx0ZXJQYW5lbCh0aGlzKTtcclxuICAgICAgICAgICAgLy8gdnl0dm9yZW5pIGdyaWR1XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgICAgICAvLyBuYXN0YXZlbmkgam1lbmFcclxuICAgICAgICAgICAgdGhpcy5zZXRUaXRsZSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyBuYXN0YXZlbmkgdnlicmFuZWhvIHJhZGt1IHJhZGt1XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZmluZFJvd0J5Q2lsKHRoaXMub3B0aW9ucy5peHNfZXZwKTtcclxuICAgICAgICAgICAgaWYgKHJvdyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLnNldEN1cnJlbnRSb3coZ3JpZCxyb3cpO1xyXG4gICAgICAgICAgICB0aGlzLl9sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgY29tbWFuZGJhcnVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbW1hbmRCYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjT2shXCIsIFwiYWN0Q2xvc2UqXCJdKSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBOYXN0YXZlbmkgdGl0dWxrdSBva25hXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRUaXRsZSgpIHtcclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwianJlczozMDI1MDQ4MFwiOyAvL1JDIDMwMjUwNDgwIDogVsO9YsSbciB2w71rb25uw6lobyByb3pwLmtvbXBldGVudGFcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFjdGVuaSBkYXRcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVsb2FkRGF0YSgpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmxvZy50cmFjZShcInJlbG9hZERhdGFcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGdyZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIHZpZXcgPSBncmQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICB2aWV3LnJlcXVlc3REYXRhKCkuXHJcbiAgICAgICAgICAgICAgICB0aGVuKCgpID0+IHsgdGhhdC5fbG9hZGluZyA9IGZhbHNlOyB0aGF0LmFrdHVhbGl6YWNlQWN0aW9uKCk7IH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgZmlsdHJvdmFjaWhvIHBhbmVsdVxyXG4gICAgICAgICAqIEBwYXJhbSB0aGF0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXJQYW5lbCh0aGF0OiB0aGlzKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICAkLm5ld0Rpdih0aGF0LmNsYXNzRmlsdGVyKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZmlsdGVycGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1zOiBbdGhhdC5jcmVhdGVGaWx0ZXJaYWxvemthKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlOiBGaWx0ZXJWaWV3TW9kZS5TaW1wbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJGaWx0ZXJCdXR0b25WaXNpYmxlOiBcIk5ldmVyVmlzaWJsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Mb2FkQWZ0ZXI6IFtcIkNob3NlRmlsdGVyXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Mb2FkQWZ0ZXJVc2VyU2V0dGluZ3M6IFwiRGVueVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlVXNlclNldHRpbmdzOiBcIkRlbnlcIiwgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlTGF5b3V0RGVzY3JpcHRvcjogXCJMMk0xUzEgTC0xMi0xMi0wIE0tMTItMTItMCBTLTEyLTEyLTBcIixcclxuICAgICAgICAgICAgICAgICAgICBhcHBseTogZnVuY3Rpb24gKGV2ZW50LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2cudHJhY2UoXCJmaWx0ZXJGb3JtLmFwcGx5XCIsIG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVsb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBmdW5jdGlvbiBDcmVhdGVGaWx0ZXJaYWxvemthXHJcbiAgICAgICAgKiAgICAgIFxyXG4gICAgICAgICogT2JlY25hIHphbG96a2FcclxuICAgICAgICAqIEBwYXJhbSB7R0NvbnRlbnR9IGNvbnRlbnRcclxuICAgICAgICAqIEByZXR1cm5zIHthbnl9XHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZpbHRlclphbG96a2EoKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vIG5hY3RlbmkgZGF0XHJcbiAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcodGhhdC5vcHRpb25zLkxpc3RDaWx1RU8hKTtcclxuICAgICAgICAgICAgbGV0IGZpbHRlckZvcm1EZWYgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyAvKnRhYkxhYmVsOiBcImpyZXM6MzAyNTAwNTJcIiwgKi9sYXlvdXREZXNjcmlwdG9yOiBcIkw0TTNTMTIsIEwtMTItMTItMCwgTS0xMi0xMS0xLCBTLTEyLTExLTFcIiwgfSkgIC8vUkMgMzAyNTAwNTIgOiBGaWx0clxyXG4gICAgICAgICAgICAuYWRkU2VjdGlvbigpICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTA0OTNcIikgIC8vUkMgMzAyNTA0OTMgOiBDw61sIGVrb25vbWlja8OpaG8gb3Jnw6FudVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfZGVuXCIsIG1vZGVsOiBcIm5hemV2PXZhbHVlLm5hemV2LGl4c19ldnA9dmFsdWUuaXhzX2V2cCx1a289dmFsdWUudWtvLHVyb3Zlbj12YWx1ZS51cm92ZW5cIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGF0Lm9wdGlvbnMuU2VsZWN0ZWRDaWxFTyEgPiAtMSA/IHRoYXQub3B0aW9ucy5MaXN0Q2lsdUVPIVt0aGF0Lm9wdGlvbnMuU2VsZWN0ZWRDaWxFTyFdOnZvaWQgMCxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3Vrbzp0cmltOmVuY29kZX0ge25hemV2OnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIHZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuX2xvYWRpbmcpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fbG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWt0dWFsaXphY2VBY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc3QgZmlsdHIgPSB0aGlzLmdldEZpbHRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2ZpbHRyLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJGb3JtRGVmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnJhY2kgb2JqZWt0IGZpbHRydVxyXG4gICAgICAgICAqIEBwYXJhbSB7R0NvbnRlbnR9IGNvbnRlbnRcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ2V0RmlsdGVyKCk6IEpRdWVyeTxIVE1MRWxlbWVudD4ge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZWxlbWVudC5maW5kKFwiLlwiICsgdGhpcy5nZXRDbGFzc0ZpbHRlcigpKTtcclxuICAgICAgICAgICAgaWYgKEdvcmRpYy5VdGlscy5XaWRnZXRFeGlzdHMoXCJnZmlsdGVycGFuZWxcIiwgZGF0YSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEdFcnJvcihcImpyZXM6MzAyNTA0OTdcIik7IC8vUkMgMzAyNTA0OTcgOiBGaWx0ciBuZW5hbGV6ZW5cclxuICAgICAgICAgICAgLy9yZXR1cm4gY29udGVudD8uZWxlbWVudC5maW5kKFwiLmpzLWZpbHRyLmdmaWx0ZXJwYW5lbFwiKTtcclxuICAgICAgICAgICAgLy9yZXR1cm4gJChcIi5qcy1maWx0clwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hY3RlbmkgZGF0XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkRGF0YSgpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IF9maWx0ZXIgPSB0aGlzLmdldEZpbHRlcigpO1xyXG4gICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgbGV0IGZpbHRyeSA9IF9maWx0ZXIuZ2ZpbHRlcnBhbmVsKCdnZXRDdXJyZW50RGF0YScpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLlJvek1hbmFnZXJDaWxlLmxpc3RTdHJvbUNpbHUoeyBpZENpbGU6IGZpbHRyeS5peHNfZXZwLCB1cm92ZW46IGZpbHRyeS51cm92ZW4gfSkuZ2V0KCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnJhY2kgdHJpZHUgZ3JpZHVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldENsYXNzR3JpZCgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbGFzc0dyaWQgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcmFjaSB0cmlkdSBncmlkdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ2V0Q2xhc3NGaWx0ZXIoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xhc3NGaWx0ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZyYWNpIG9iamVrdCBncmlkdVxyXG4gICAgICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ2V0R3JpZCgpOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHwgbnVsbCB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5lbGVtZW50LmZpbmQoXCIuXCIgKyB0aGlzLmdldENsYXNzR3JpZCgpKTtcclxuICAgICAgICAgICAgcmV0dXJuIChkYXRhLmxlbmd0aCA9PSAwID8gbnVsbCBhcyBhbnkgOiBkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERvaGxlZGFuaSByYWRrdSBkbGUgY2lsdVxyXG4gICAgICAgICAqIEBwYXJhbSBpeHNfZXZwXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGZpbmRSb3dCeUNpbChpeHNfZXZwOiBzdHJpbmcgfCBudWxsfHVuZGVmaW5lZCk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pDaWxlRHRvIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICAgICAgaWYgKCFpeHNfZXZwIHx8IGl4c19ldnAudHJpbSgpID09IFwiXCIpIHJldHVybjtcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBsZXQgdmlldyA9IGdyaWQuZ2dyaWQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1JvekNpbGVEdG8+KFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB2aWV3LmdldERhdGFSb3dzKGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGRhdGEuZmluZCgoaXRlbSkgPT4gaXRlbT8uaXhzX2V2cD8udHJpbSgpID09IGl4c19ldnAudHJpbSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQWt0dWFsaXphY2UgbWVudVxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJpdmF0ZSBha3R1YWxpemFjZUFjdGlvbigpOiB2b2lkIHtcclxuICAgICAgICAgICAgLy92YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zdCBwb2NldCA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5DZWxrb3Z5UG9jZXRSYWRrdShncmlkKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zIS5hY09rIS51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogIXRoaXMuX2xvYWRpbmcgJiYgcG9jZXQgPiAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMhLmFjdENsb3NlIS51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogIXRoaXMuX2xvYWRpbmdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBncmlkdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXc8R29yZGljLlVjdC5JbnRlcmZhY2UuR1JvekNpbGVEdG8+KHRoYXQub3B0aW9ucy5MaXN0U3Ryb21DaWx1ISwge1xyXG4gICAgICAgICAgICAgICAgcHJvY2Vzc29yczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyOiBuZXcgR29yZGljLkRhdGEuUHJvdmlkZXI8R29yZGljLlVjdC5JbnRlcmZhY2UuR1JvekNpbGVEdG8+KChyZXEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQubG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KSB9IH0pO1xyXG4gICAgICAgICAgICAkLm5ld0Rpdih0aGlzLmNsYXNzR3JpZClcclxuICAgICAgICAgICAgICAgIC8vLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLCAgICAgLy8gZml0IChkZWZhdWx0bmUgYnkgbWVsbyBieXQgdG90byksIGZ1bGxcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdmlldyxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7ICAgICAvL29ic2x1em5hIGFrY2UsIGt0ZXJhIHNlIHNwb3VzdGkgZGJsIGNsaWNrZW0gbmFkIHJhZGtlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlQ29udGVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vI3JlZ2lvbiBEZWZpbmljZSBzbG91cGN1XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KClcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgICAgICAgICAgfSkuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgZ3JpZGZvcm1hdHVcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pDaWxlRHRvPiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96Q2lsZUR0bz4oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImZ1bl9uYXpldl92cmtcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDgxXCIsIHdpZHRoOiAyMjAgfSkgLy9SQyAzMDI1MDQ4MSA6IFbDvWtvbm7DvSByb3pwLmtvbXBldGVudFxyXG4gICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwicmVmX25hemV2X3Zya1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTA0ODJcIiwgd2lkdGg6IDE3MCB9KSAvL1JDIDMwMjUwNDgyIDogUmVmZXJlbnRcclxuICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInVyb3ZlblwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTA0ODRcIiwvL1JDIDMwMjUwNDgzIDogw5pcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA0ODRcIiAsIHdpZHRoOiA4MCAvL1JDIDMwMjUwNDg0IDogw5pyb3ZlxYhcclxuICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ1a29cIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDg1XCIsIHdpZHRoOiAxMjAgfSkgLy9SQyAzMDI1MDQ4NSA6IEPDrWxcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJuYXpldlwiLCB3aWR0aDogMzIwLCBjYXB0aW9uOiBcImpyZXM6MzAyNTA0ODZcIiB9KSAvL1JDIDMwMjUwNDg2IDogTsOhemV2IGPDrWxlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBha2NpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zID0gbmV3IEdBY3Rpb25MaXN0KHtcclxuICAgICAgICAgICAgICAgIGFjT2s6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk9rKHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246XCJqcmVzOjMwMjUwNDg3XCIsIC8vUkMgMzAyNTA0ODcgOiBWeWJyYXRcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZUNvbnRlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICBhY3RDbG9zZTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uWnJ1c2l0KHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcblxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFV6YXZyZW5pIGNvbnRlbnR1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNsb3NlQ29udGVudCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciByYWRlayA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pDaWxlRHRvPihncmlkKTtcclxuICAgICAgICAgICAgaWYgKHJhZGVrICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vIHpqaXN0ZW5pIGZpbHRydVxyXG4gICAgICAgICAgICAgICAgY29uc3QgX2ZpbHRlciA9IHRoaXMuZ2V0RmlsdGVyKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0cnkgPSBfZmlsdGVyLmdmaWx0ZXJwYW5lbDxHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96Q2lsZUR0bz4oJ2dldEN1cnJlbnREYXRhJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKHsgaXhzX2V2cF9lbzogZmlsdHJ5Lml4c19ldnAsIGl4c19ldnA6IHJhZGVrLml4c19ldnAsIG1hbmFnZXJfY2lsZV90eHQ6IHJhZGVrLnJlZl9uYXpldl92cms/LnRyaW0oKSArIFwiLCBcIiArIHJhZGVrLmZ1bl9uYXpldl92cms/LnRyaW0oKSwgaXhzX2Z1bl9tbmc6IHJhZGVrLml4c19mdW5fdnJrPy50cmltKCkgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTA0ODhcIiwvL1JDIDMwMjUwNDg4IDogVXBvem9ybsSbbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwNDg5XCIpOyAgLy9SQyAzMDI1MDQ4OSA6IE5lbsOtIHZ5YnLDoW4gxb7DoWRuw70gxZnDoWRlayFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
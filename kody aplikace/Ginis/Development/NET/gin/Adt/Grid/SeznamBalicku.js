//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Adt.WebControls.SeznamBalicku.ts							</Name>
//    <Description> Dialog seznam balíčků										</Description>
//    <Author>      thazmuka													</Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2018							</Copyright>
//    <Created>     2018-11-06													</Created>
//  </FileHeader>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Adt;
    (function (Adt) {
        var WebControls;
        (function (WebControls) {
            var gcontent = Decorators.gcontent;
            /**
             * Dialog seznamu balíčku
             */
            var SeznamBalicku = /** @class */ (function (_super) {
                __extends(SeznamBalicku, _super);
                function SeznamBalicku() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                //#endregion
                /**
                 * onContentReady
                 */
                SeznamBalicku.prototype.onContentReady = function () {
                    this.init();
                };
                /**
                 * init content
                 */
                SeznamBalicku.prototype.init = function () {
                    this.setTitle();
                    Gordic.Isl.GinVlastnostiMetaService.listVla({}).getData().done(function (vlastnosti) {
                        debugger;
                    });
                    this.createGrid();
                    this.createMenuBar();
                };
                /**
                 * nastavit titulek dialogu
                 */
                SeznamBalicku.prototype.setTitle = function () {
                    this.newOps({
                        title: "jres:32000001" //RC 32000001 : Seznam balíčků
                    });
                };
                /**
                 * vytvořit seznam
                 */
                SeznamBalicku.prototype.createGrid = function () {
                    this.grid = $("<div>").appendTo(this.element);
                    this.grid.ggrid({
                        name: "gridSeznamBalicku",
                        renderMode: "auto",
                        columnMode: "full",
                        customClass: "ts-grid-seznam-balicku-class",
                        navigationMode: "row",
                        defaultAction: new GAction({
                            name: "doubleClickGridSeznamBalicku",
                            run: function (ev, ctx) { }
                        }),
                        searchColumns: ["ixs_gdt", "nazev", "popis", "dat_od", "dat_do", "dist_cond"],
                        columns: this.createGridFormat(),
                        cellActivate: function (ev, obj) {
                            // seznam není prázdný
                            if (obj.cellInfo !== null) {
                            }
                        },
                    });
                };
                /**
                 * vytvořit formát sloupců seznamu
                 */
                SeznamBalicku.prototype.createGridFormat = function () {
                    var columnsDefinition = new Gordic.Data.GridFormat();
                    columnsDefinition
                        .addTextColumn({
                        name: "ixs_gdt",
                        caption: "jres:32000004",
                        width: 150,
                        fixedWidth: true,
                    })
                        .addTextColumn({
                        name: "nazev",
                        caption: "jres:32000005",
                        width: 200,
                        fixedWidth: true,
                    })
                        .addTextColumn({
                        name: "popis",
                        caption: "jres:32000006",
                        width: 250,
                        fixedWidth: true,
                    })
                        .addDateTimeColumn({
                        name: "dat_od",
                        caption: "jres:32000007",
                        width: 200,
                        fixedWidth: true
                    })
                        .addDateTimeColumn({
                        name: "dat_do",
                        caption: "jres:32000008",
                        width: 200,
                        fixedWidth: true
                    })
                        .addTextColumn({
                        name: "dist_cond",
                        caption: "jres:32000009",
                        width: 250,
                        fixedWidth: true,
                    });
                    return columnsDefinition;
                };
                /**
                 * vytvořit menu
                 */
                SeznamBalicku.prototype.createMenuBar = function () {
                    var _this = this;
                    var menuBar = [];
                    menuBar.push({
                        favorite: true,
                        primary: true,
                        action: this.actions.add(new GAction({
                            name: "actDetail",
                            icon: "gi-detail",
                            caption: "jres:32000002",
                            run: function () {
                                var options = { Ixs_gdt: "" };
                                // otevření detailu
                                Adt.Dialogs.DetailBalickuDlg(_this, options, Gordic.Gin.Globals.Enums.ModOtevreni.navigate).done(function () {
                                });
                            }
                        }))
                    });
                    this.menuBar(menuBar);
                };
                SeznamBalicku = __decorate([
                    gcontent
                ], SeznamBalicku);
                return SeznamBalicku;
            }(Gordic.GContentBase));
            WebControls.SeznamBalicku = SeznamBalicku;
        })(WebControls = Adt.WebControls || (Adt.WebControls = {}));
    })(Adt = Gordic.Adt || (Gordic.Adt = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=SeznamBalicku.js.map
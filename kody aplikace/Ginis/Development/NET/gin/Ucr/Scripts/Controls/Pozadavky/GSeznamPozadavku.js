"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
            var GSeznamPozadavekx = /** @class */ (function (_super) {
                __extends(GSeznamPozadavekx, _super);
                function GSeznamPozadavekx() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    // nastaveni id a titulku okna
                    _this.taskId = "showSeznamPozAct";
                    _this.title = "jres:31100165"; //RC 31100165 : Seznam požadavků
                    return _this;
                }
                GSeznamPozadavekx.prototype.onContentReady = function () {
                    var that = this;
                    this.setBreadcrumbs([
                        { action: new GAction({ name: "actBack", caption: this.title, run: function () { that.tryCloseAllChildContents(); } }) }
                    ]);
                    $("<div>")
                        .appendTo(this.element)
                        .gsubtasks({
                        params: [
                            { action: new GAction({ name: "actAll", caption: "jres:31100002", run: function () { that.loadData(-1); } }) },
                            { action: new GAction({ name: "actPers", caption: "jres:31100003", run: function () { that.loadData(10); } }) },
                            { action: new GAction({ name: "actPublic", caption: "jres:31100004", run: function () { that.loadData(0); } }) } //RC 31100004 : Veřejné
                        ]
                    });
                    this.menuBar([
                        { action: that.actions.newAct, favorite: true, captionVisible: "never" },
                        { action: that.actions.selAct, favorite: true },
                        { action: that.actions.delAct, favorite: true }
                    ]);
                    this.$grid = $("<div>")
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        data: [],
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: function (ev, ctx) {
                                var row = ctx.cellInfo.data;
                                that.navigate("Gordic.Ucr.WebClient.GDetailPozadavkuControl", { options: { ixsSes: row.ixs_ses } });
                            }
                        }),
                        searchColumns: ["nazev", "poznamka"],
                        //#region Definice sloupcu
                        columns: new Gordic.Data.GridFormat()
                            .addIconColumn({
                            name: "ixs_fun",
                            caption: "",
                            width: 30,
                            iconTemplate: function (row, metarow) {
                                var icon = metarow.data.ixs_fun === Gordic.Ucr.Globals.GUcrGlobals.ixs_fun ? "gi-user" : "gi-group";
                                return { icon: icon };
                            },
                            sortable: false
                        })
                            .addTextColumn({
                            name: "nazev",
                            caption: "jres:31100006",
                            width: 250
                        })
                            .addTextColumn({
                            name: "id_ses_alv",
                            caption: "jres:31100007",
                            width: 75
                        })
                            .addTextColumn({
                            name: "nazev_alv",
                            caption: "jres:31100008",
                            width: 250
                        })
                            .addTextColumn({
                            name: "nazev_frm",
                            caption: "jres:31100009",
                            width: 150
                        })
                            .addNumberColumn({
                            name: "rok",
                            caption: "jres:31100010",
                            width: 50
                        })
                            .addTextColumn({
                            name: "mesic_comp",
                            caption: "jres:31100011",
                            width: 80
                        })
                            .addTextColumn({
                            name: "msk_nazev",
                            caption: "jres:31100012",
                            width: 100
                        })
                            .addTextColumn({
                            name: "ico",
                            caption: Gordic.Ucr.Globals.GZkr.Ico,
                            width: 70
                        })
                            .addTextColumn({
                            name: "ucs",
                            caption: Gordic.Ucr.Globals.GZkr.Ucs,
                            width: 70
                        })
                            .addTextColumn({
                            name: "uus",
                            caption: Gordic.Ucr.Globals.GZkr.Uus,
                            width: 70
                        })
                            .addTextColumn({
                            name: "nks",
                            caption: Gordic.Ucr.Globals.GZkr.Nks,
                            width: 70
                        })
                            .addTextColumn({
                            name: "sns_nazev",
                            caption: "jres:31100013",
                            width: 100
                        })
                            .addTextColumn({
                            name: "poznamka",
                            caption: "jres:31100014",
                            width: 200
                        })
                            .addDateTimeColumn({
                            name: "dat_zmena",
                            caption: "jres:31100015",
                            width: 130
                        })
                        //#endregion
                    });
                    this.loadData(-1);
                };
                /**
                 *  Nacteni dat
                 */
                GSeznamPozadavekx.prototype.loadData = function (typMask) {
                    var that = this;
                    var typMsk = typMask === undefined ? this.lastTypMsk : typMask;
                    this.lastTypMsk = typMsk;
                    //var view = new Gordic.Isl.View(Gordic.Isl.UcrPozadavek.list({ filters: { ixs_ses: typMsk } }));
                    Gordic.Isl.UcrPozadavek.list({ filters: { typ_msk: typMsk } })
                        .getData()
                        .done(function (result) {
                        debugger;
                        that.actions["selAct"].enabled(result.length > 0);
                        //that.data = r;
                        that.$grid.ggrid("setData", new Gordic.Data.View(result, { key: "ixs_ses" }));
                    });
                };
                GSeznamPozadavekx = __decorate([
                    Decorators.gcontent
                ], GSeznamPozadavekx);
                return GSeznamPozadavekx;
            }(Gordic.GContentBase));
            WebClient.GSeznamPozadavekx = GSeznamPozadavekx;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=GSeznamPozadavku.js.map
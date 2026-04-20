"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
    var Uct;
    (function (Uct) {
        var WebClient;
        (function (WebClient) {
            /**
             * GUctKnihy
             *
             *  Seznam ucetnich knih
             *
             * @author Tomáš Kareš
             * @since 482.1.0.29
             */
            var GUctKnihy = /** @class */ (function (_super) {
                __extends(GUctKnihy, _super);
                function GUctKnihy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.taskId = "actSeznamKnihTaskID";
                    return _this;
                }
                GUctKnihy.prototype.onContentReady = function () {
                    //this.setBreadcrumbs([{ caption: this.title, action: new GAction({ name: "actBack", run: () => { this.tryCloseAllChildContents(); } }) }]);
                    var that = this;
                    //debugger;
                    Gordic.Isl.UctKniha.list(function (rq) {
                        return {
                            fragments: ["zkratka", "nazev", "ixp_den", "stav_txt", "doklad", "akt_subrady"]
                        };
                    }).get().done(function (data) {
                        debugger;
                        var myItemTemplate = "<div class='items gcard' style='display: block; float: left; background:#ffffff'>" +
                            "<div class='g-card'>" +
                            "<div class='g-rap-card'>" +
                            "<div class='g-card-header'>" +
                            "<div class='g-card-header-text gtooltip'>{zkratka}</div>" +
                            "</div>" +
                            "<div class='g-card-main'>" +
                            "<div style='font-weight : bold'>{nazev}</div>" +
                            "<hr>" +
                            "</br>" +
                            "<span style='text-decoration : underline'><strong>Stav knihy</strong></span>" +
                            "<div style=\"{styl_stavknihy}\">{stav_txt}</div>" +
                            "</br>" +
                            "<div><span style='text-decoration : underline'><strong>Počty dokladů v knize</strong></span></div>" +
                            //"</br>" +
                            "<div><span>všechny doklady</span><span style ='float: right'><span>{pocet_vsech_dokladu}</span></span></div>" +
                            //"</br>" +
                            "<div><span> připravených k uzávěrce</span><span style ='float: right'><span>{pocet_pripravenych_dokladu}</span></span></div>" +
                            //"</br>" +
                            "<span> nepřipravených k uzávěrce</span><span style ='float: right'><span style=\"color:red\">{pocet_neuzavrenych_dokladu}</span></span>" +
                            "</br>" +
                            //"<span>Okamžitý zůstatek</span><span style ='float: right'><strong>{c_zustatek}</strong><span> </span><span>{mena_zkr}</span></span>" +
                            //"</br></br>" +
                            //"<span style='text-decoration : underline'><strong>Stav knihy</strong></span>" +
                            //"</br>" +
                            //"<span>Hlavní uzávěrka</span><span style ='float: right'><strong>{dat_uz_hl}</strong></span>" +
                            //"</br>" +
                            //"<span>Dílčí uzávěrka</span><span style ='float: right'><strong>{dat_uz_den}</strong></span>" +
                            "</div>" + //g-card-main
                            "</div>" +
                            "</div>" +
                            "</div > ";
                        var cardPanel = $("<div>").appendTo(that.element).gcardpanel({
                            itemTemplate: myItemTemplate,
                            //opened: false,
                            data: that.cardPanelItems(data.data),
                            editable: false,
                            createTab: true,
                            defaultAction: new GAction({
                                name: "actUctDetailKnihy",
                                run: function (ev, ctx) {
                                    //var ParamsJSON = { ixpDen: ctx.item.ixp_den };
                                    //that.navigate("Gordic.Pok.WebClient.GPokInformaceKnihaTab", ParamsJSON);
                                }
                            })
                        });
                    });
                    that.actions.addRange({
                        actVyhledat: {
                            caption: "Detail",
                            icon: "gi-magglass",
                            run: function (ev, ctx) {
                                var ParamsJSON = { ixpDen: "MEHLAPD0A6FL" };
                                that.navigate("Gordic.Pok.WebClient.GPokInformaceKnihaTab", ParamsJSON);
                            }
                        },
                        actHromadneUzavreni: {
                            caption: "Hromadné uzavření knih",
                            icon: "",
                            run: function (ev, ctx) {
                                //that.hromadneUzavreni();
                            }
                        },
                        actStavKnih: {
                            caption: "Stav knih",
                            icon: "",
                            run: function (ev, ctx) {
                                that.stavKnih();
                            }
                        }
                    });
                    //this.menuBar([
                    //    { action: this.actions.actVyhledat, favorite: true },
                    //    { action: this.actions.actHromadneUzavreni, favorite: true },
                    //    { action: this.actions.actStavKnih, favorite: true }
                    //]);
                };
                GUctKnihy.prototype.stavKnih = function () {
                    var ParamsJSON = {};
                    this.navigate("Gordic.Pok.WebClient.GPokStavKnihTab", ParamsJSON);
                };
                GUctKnihy.prototype.cardPanelItems = function (data) {
                    var items = [];
                    data.forEach(function (row) {
                        var item = {
                            zkratka: row.zkratka,
                            nazev: row.nazev,
                            ixp_den: row.ixp_den,
                            stav_txt: row.stav_txt,
                            aktivita: row.aktivita,
                            pocet_vsech_dokladu: Gordic.Templates.Formatters.number(row.pocet_vsech_dokladu + row.pocet_vsech_dokladu_archiv, "# ###0"),
                            pocet_neuzavrenych_dokladu: Gordic.Templates.Formatters.number(row.pocet_neuzavrenych_dokladu, "# ###0"),
                            pocet_pripravenych_dokladu: Gordic.Templates.Formatters.number(row.pocet_vsech_dokladu - row.pocet_neuzavrenych_dokladu, "# ###0"),
                        };
                        var styl = "";
                        if (row.akt_subrady === 400 || row.akt_subrady === 500 || row.akt_subrady === 900 || row.akt_subrady === 0)
                            // uzavreno odlito
                            styl = "color:red";
                        else if (row.akt_subrady === 300)
                            // pripraveno k uzaverce
                            styl = "color:blue";
                        item["styl_stavknihy"] = styl;
                        items.push(item);
                    });
                    return items;
                };
                GUctKnihy = __decorate([
                    Decorators.gcontent
                ], GUctKnihy);
                return GUctKnihy;
            }(Gordic.GContentBase));
            WebClient.GUctKnihy = GUctKnihy;
        })(WebClient = Uct.WebClient || (Uct.WebClient = {}));
    })(Uct = Gordic.Uct || (Gordic.Uct = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=GUctKnihy.js.map
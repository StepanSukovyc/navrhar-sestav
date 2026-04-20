//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GStatistikaDokumentu.js                </Name>
//    <Description> Statistika dokumentu                                        </Description>
//    <Author>      Hanuš                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-11-13                                                  </Created>
//  </FileHeader>

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
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Controls;
            (function (Controls) {
                var Ciselniky;
                (function (Ciselniky) {
                    var GStatistikaDokumentu = /** @class */ (function (_super) {
                        __extends(GStatistikaDokumentu, _super);
                        function GStatistikaDokumentu() {
                            return _super !== null && _super.apply(this, arguments) || this;
                        }
                        GStatistikaDokumentu.prototype.onContentReady = function () {
                            var _this = this;
                            this.title = "STATISTIKA TYPU DOKUMENT\u016E ";
                            this.viewStatistika = new Gordic.Isl.View(Gordic.Isl.SkupinaVymahani.vymahaniStatistika(function (rq) {
                                return {
                                    filters: { ixp: _this.Ixp }
                                };
                            }));
                            this.setBreadcrumbs([{
                                    caption: this.title = "Statistika",
                                }]);
                            $("<div id='Statistika'>")
                                .appendTo(this.element)
                                .ggrid({
                                name: "statistika",
                                data: [],
                                renderMode: "all-at-once",
                                columnMode: "fit",
                                navigationMode: "row",
                                showTopPanel: true,
                                showHeaderRow: true,
                                showBottomPanel: true,
                                multi: false,
                                columns: new Gordic.Data.GridFormat()
                                    .add({ name: "typ_phl", width: 100, caption: "Typ pohledávky" })
                                    .add({ name: "typ_phl_nazev", width: 100, caption: "Nazev typu pohledávky" })
                                    .add({ name: "ixs_typ", width: 100, caption: "Identifikátor typu dokumentu" })
                                    .add({ name: "nazev", width: 100, caption: "Název typu dokumentu" })
                                    .add({ name: "ktg_typ", width: 100, caption: "Kategorie typu dokumentu" })
                                    .add({ name: "pocet", width: 100, caption: "Počet" }),
                                defaultProfile: {
                                    sort: "nazev"
                                }
                            });
                            this.actions.add({
                                name: "load", caption: "načti", tooltip: "", icon: "gi-refresh", run: function () {
                                    $("#Statistika").ggrid("setData", _this.viewStatistika);
                                    _this.viewStatistika.requestData();
                                }
                            });
                            this.actions.load.run();
                        };
                        GStatistikaDokumentu = __decorate([
                            Decorators.gcontent
                        ], GStatistikaDokumentu);
                        return GStatistikaDokumentu;
                    }(Gordic.GContentBase));
                    Ciselniky.GStatistikaDokumentu = GStatistikaDokumentu;
                })(Ciselniky = Controls.Ciselniky || (Controls.Ciselniky = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=GStatistikaDokumentu.js.map
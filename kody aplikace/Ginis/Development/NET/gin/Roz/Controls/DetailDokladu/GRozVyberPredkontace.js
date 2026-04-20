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
    var Roz;
    (function (Roz) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            var GRozVyberPredkontace = /** @class */ (function (_super) {
                __extends(GRozVyberPredkontace, _super);
                function GRozVyberPredkontace() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.result = "";
                    return _this;
                }
                // nastaveni predvoleb
                // ************************************************************************
                // Inicializace formuláře
                GRozVyberPredkontace.prototype.prepareContent = function () {
                    var _this = this;
                    var that = this;
                    that.result = "";
                    this.formularNastaveni()
                        .then(function (result) {
                        //result.addRow();
                        $.newDiv()
                            .appendTo(that.element).gform('createFrom', result); // vytvoření formuláře
                        $(that.contentDiv).resize();
                    });
                    // Definica akci
                    that.actions.addRange({
                        actDetail2: Gordic.Eko.Action.actionDetail({
                            caption: "jres:30250494",
                            enabled: true,
                            run: function () {
                                debugger;
                                //let cnt = $.content<Gordic.Eko.WebClient.GSeznamPredkontaceTS>(that.form);
                                //cnt.actions.actDetail?.run();
                                var code = that.getFormData();
                                if (code != "") {
                                    Gordic.Eko.WebClient.GDetailPredkontaceMethod.ZobrazDetail(that, code, Gordic.Eko.WebClient.UctRoz.Enums.ModeDetail.Prohlizeni);
                                    //that.navigate("Gordic.Eko.WebClient.GDetailPredkontace", { Ixp: idKontace, id: "xxxDetailPredkontace", ModeDetail: Gordic.Eko.WebClient.UctRoz.Enums.ModeDetail.Prohlizeni })
                                    ;
                                }
                                else {
                                    that.dialogs.messageBox("jres:30250495", //RC 30250495 : Upozornění
                                    "jres:30250496"); //RC 30250496 : Není vybrán žádný řádek!
                                }
                            }
                        }),
                        actVyber: new GAction({
                            name: "actVyber", caption: "jres:30250416" //RC 30250416 : Vybrat
                            ,
                            run: function () { return _this.VyberHodnoty(); }
                        }),
                        actZavrit: Gordic.Eko.Action.actionZavrit({
                            enabled: true,
                            run: function () { return _this.tryClose(); }
                        }),
                    });
                    that.commandBar([
                        {
                            id: "idSelect",
                            customClass: "g-button--primary",
                            action: that.actions.actVyber
                        },
                        {
                            id: "idclosedokladyneprouct",
                            action: that.actions.actZavrit
                        },
                        {
                            id: "iddetailPredk",
                            action: that.actions.actDetail2
                        }
                    ]);
                };
                /**
                 * Vyber hodnoty
                 * */
                GRozVyberPredkontace.prototype.VyberHodnoty = function () {
                    var that = this;
                    var data = that.getFormData();
                    if (data != null && data.trim().length == 0) {
                        that.dialogs.warning("jres:30250414" //RC 30250414 : Varování
                        , "jres:30250415"); //RC 30250415 : Není vybrána žádná předkontace!
                    }
                    else {
                        that.result = data;
                        that.tryClose();
                    }
                };
                // ************************************************************************
                // Funkce naplnění dat z dialogu s doplňkovými informacemi
                GRozVyberPredkontace.prototype.getFormData = function () {
                    //return result;                                                                          // odeslání dat
                    return $.content(this.form).getFormData();
                };
                /**
                 *  Formular nastaveni predkontaci
                 *
                 * */
                GRozVyberPredkontace.prototype.formularNastaveni = function () {
                    var that = this;
                    //var a = that.navigate(["Gordic.Eko.WebClient.GSeznamPredkontaceContent"]) ; // volání parametrů z TS do TS => šetření traficu            
                    //let def = $.Deferred();
                    //def.resolve();
                    //return def.resolve(a);  
                    var form = $.newDiv().appendTo(that.element) // přidej DIV na můj element
                        .gcontent("Gordic.Eko.WebClient.GSeznamPredkontaceContent", { TypeForm: "SELECT" });
                    //this.form = $.content<Gordic.Eko.WebClient.GSeznamPredkontaceTS>(form);
                    this.form = form;
                    that.beginOperation(); // indikátor procesu - START
                    form.on('seznampredkontacivyberhodnoty', function () { return that.VyberHodnoty(); });
                    return form.gcontent("load", { TypeForm: "SELECT" }) // nahrání dialogu s parametry
                        .then(function () {
                        return form;
                    })
                        .always(function () { return that.endOperation(); });
                    //return def.promise();
                };
                GRozVyberPredkontace.prototype.closing = function () {
                    return $.Deferred().resolve({ selected: this.result }).promise();
                };
                GRozVyberPredkontace = __decorate([
                    gcontent
                ], GRozVyberPredkontace);
                return GRozVyberPredkontace;
            }(Gordic.GContentBase));
            WebClient.GRozVyberPredkontace = GRozVyberPredkontace;
        })(WebClient = Roz.WebClient || (Roz.WebClient = {}));
    })(Roz = Gordic.Roz || (Gordic.Roz = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=GRozVyberPredkontace.js.map
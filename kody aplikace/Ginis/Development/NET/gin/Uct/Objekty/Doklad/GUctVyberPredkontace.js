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
    var Uct;
    (function (Uct) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            var GUctVyberPredkontace = /** @class */ (function (_super) {
                __extends(GUctVyberPredkontace, _super);
                function GUctVyberPredkontace() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.result = "";
                    return _this;
                }
                // nastaveni predvoleb
                // ************************************************************************
                // Inicializace formuláře
                GUctVyberPredkontace.prototype.prepareContent = function () {
                    var _this = this;
                    var that = this;
                    that.result = "";
                    this.formularNastaveni()
                        .then(function (result) {
                        //result.addRow();
                        $.newDiv()
                            .appendTo(that.element).gform('createFrom', result); // vytvoření formuláře
                        $(that.contentDiv).trigger('resize'); //.resize();
                    });
                    // Definica akci
                    that.actions.addRange({
                        actDetail2: Gordic.Eko.Action.actionDetail({
                            caption: "jres:30250821",
                            //tooltip: "jres:30250821", //RC 30250030 : Detail předkontace
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
                                    that.dialogs.messageBox("jres:30250822", //RC 30250822 : Upozornění
                                    "jres:30250823"); //RC 30250823 : Není vybrán žádný řádek!
                                }
                            }
                        }),
                        actVyber: new GAction({
                            name: "actVyber", caption: "jres:30250804", run: function () {
                                that.VyberHodnoty();
                            }
                        }),
                        actZavrit: Gordic.Eko.Action.actionZavrit({
                            enabled: true,
                            run: function () {
                                _this.tryClose();
                            }
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
                        },
                    ]);
                };
                /**
                 * Vyber hodnoty
                 * */
                GUctVyberPredkontace.prototype.VyberHodnoty = function () {
                    var that = this;
                    var data = that.getFormData();
                    if (data != null && data.trim().length == 0) {
                        that.dialogs.warning("jres:30250603" //RC 30250603 : Varování
                        , "jres:30250602"); //RC 30250602 : Není vybrána žádná předkontace!
                    }
                    else {
                        that.result = data;
                        that.tryClose();
                    }
                };
                // ************************************************************************
                // Funkce naplnění dat z dialogu s doplňkovými informacemi
                GUctVyberPredkontace.prototype.getFormData = function () {
                    //return result;                                                                          // odeslání dat
                    return $.content(this.form).getFormData();
                };
                /**
                 *  Formular nastaveni predkontaci
                 *
                 * */
                GUctVyberPredkontace.prototype.formularNastaveni = function () {
                    var that = this;
                    //var a = that.navigate(["Gordic.Eko.WebClient.GSeznamPredkontaceContent"]) ; // volání parametrů z TS do TS => šetření traficu            
                    var def = $.Deferred();
                    //def.resolve();
                    //return def.resolve(a);  
                    var form = $.newDiv().appendTo(that.element) // přidej DIV na můj element
                        .gcontent("Gordic.Eko.WebClient.GSeznamPredkontaceContent", { TypeForm: "SELECT" });
                    //this.form = $.content<Gordic.Eko.WebClient.GSeznamPredkontaceTS>(form);
                    this.form = form;
                    that.beginOperation(); // indikátor procesu - START
                    form.gcontent("load", { TypeForm: "SELECT" }) // nahrání dialogu s parametry
                        .done(function () {
                        def.resolve(form);
                    })
                        .always(function () { return that.endOperation(); });
                    form.on('seznampredkontacivyberhodnoty', function () { return that.VyberHodnoty(); });
                    return def.promise();
                };
                GUctVyberPredkontace.prototype.closing = function () {
                    var that = this;
                    return $.Deferred().resolve({ selected: that.result }).promise();
                };
                GUctVyberPredkontace = __decorate([
                    gcontent
                ], GUctVyberPredkontace);
                return GUctVyberPredkontace;
            }(Gordic.GContentBase));
            WebClient.GUctVyberPredkontace = GUctVyberPredkontace;
        })(WebClient = Uct.WebClient || (Uct.WebClient = {}));
    })(Uct = Gordic.Uct || (Gordic.Uct = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=GUctVyberPredkontace.js.map
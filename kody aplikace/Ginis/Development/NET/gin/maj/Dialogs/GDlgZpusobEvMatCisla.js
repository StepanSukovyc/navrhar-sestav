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
    var Maj;
    (function (Maj) {
        var WebClient;
        (function (WebClient) {
            var Dialogs;
            (function (Dialogs) {
                var gcontent = Decorators.gcontent;
                var GDlgZpusobEvMatCisla = /** @class */ (function (_super) {
                    __extends(GDlgZpusobEvMatCisla, _super);
                    function GDlgZpusobEvMatCisla() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    GDlgZpusobEvMatCisla_1 = GDlgZpusobEvMatCisla;
                    GDlgZpusobEvMatCisla.prototype.prepareContent = function (params) {
                        var _this_1 = this;
                        var _a;
                        this.title = "jres:31850004"; //RC 31850004 : Způsob evidence materiálového čísla
                        params.data.zev = (_a = params.data.zev) !== null && _a !== void 0 ? _a : 0;
                        var _this = this;
                        var okButton = new GAction({
                            name: "actOK",
                            run: function () {
                                //save
                                var dto = {};
                                _this.findFields().gfield("model", "collect", dto);
                                this.setPending(_this.createServiceContent("Gordic.Maj.WebClient.GDialogServiceCnt").call("ZalozitKmenovyList", { novyZaznam: dto }).then(function () {
                                    return _this.tryClose(dto);
                                }));
                            },
                            enabled: false,
                            caption: "jres:31850005" //RC 31850005 : Potvrzení hodnoty
                        });
                        var commBar = [{
                                action: okButton,
                                primary: true,
                                caption: Gordic.Dialogs.Buttons.mbbOk.text
                            }, {
                                action: new GAction({
                                    name: "actClose",
                                    run: function (ev) {
                                        _this_1.tryClose();
                                    }
                                }),
                                caption: Gordic.Dialogs.Buttons.mbbClose.text,
                            }];
                        var form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-12-12-0, M-12-12-0, S-12-12-0, breaks-500-1000" })
                            .addSection()
                            .addRow("jres:24534060").addField("gstringbox", { name: "mat_cis", disabled: true }) //RC 24534060 : Materiálové číslo
                            .addRow("jres:24534459").addField("gstringbox", { name: "skupina_id", disabled: true }) //RC 24534459 : Skupina majetku
                            // TODO: tady si musím do modelu poslat IXS_SKM anebo (možná lépe) napsat pro políčko reader BEZ ixs_skm
                            //.addRow("jres:24534459").addField("gselectbox", Gordic.Prefabs.Select.majsskm(), {  //RC 24534459 : Skupina majetku
                            //    name: "skupina_id",
                            //    itemTemplate: "{skupina_zkr}",
                            //    model: "model.skupina_id = value.skupina_id",
                            //    disabled: true
                            //})
                            .addRow("jres:24534527").addField("gselectbox", Gordic.Prefabs.Select.majczev(), {
                            name: "zev", itemTemplate: "{zev_txt}", dropdown: true, model: "model.zev=value.zev", change: function (ev, val) {
                                var _a;
                                okButton.update({ enabled: ((_a = val.value) === null || _a === void 0 ? void 0 : _a.zev) !== 0 });
                            }
                        });
                        var divForm = $("<div>").appendTo(this.element).gform("createFrom", form);
                        divForm.findFields().gfield("model", "apply", params.data, { initialValues: true, verificationNeeded: true });
                        this.commandBar(commBar);
                    };
                    GDlgZpusobEvMatCisla.showDlg = function (inputOptions) {
                        return $.content(inputOptions.related).dialogs.showModalWindow(GDlgZpusobEvMatCisla_1, inputOptions).createDialogPromise();
                    };
                    GDlgZpusobEvMatCisla.prototype.show = function (inputOptions) {
                        return GDlgZpusobEvMatCisla_1.showDlg(inputOptions);
                    };
                    var GDlgZpusobEvMatCisla_1;
                    GDlgZpusobEvMatCisla = GDlgZpusobEvMatCisla_1 = __decorate([
                        gcontent
                    ], GDlgZpusobEvMatCisla);
                    return GDlgZpusobEvMatCisla;
                }(Gordic.GContentBase));
                Dialogs.GDlgZpusobEvMatCisla = GDlgZpusobEvMatCisla;
            })(Dialogs = WebClient.Dialogs || (WebClient.Dialogs = {}));
        })(WebClient = Maj.WebClient || (Maj.WebClient = {}));
    })(Maj = Gordic.Maj || (Gordic.Maj = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=GDlgZpusobEvMatCisla.js.map
"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GSmlOstatniUdaje.ts                              </Name>
//    <Description> Záložka ostatni udaje                                                 </Description>
//    <Author>      Adam Černý                                                            </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                                      </Copyright>
//    <Created>     2022-03-10                                                            </Created>
//  </FileHeader>
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
    var Sml;
    (function (Sml) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            var GSmlOstatniUdaje = /** @class */ (function (_super) {
                __extends(GSmlOstatniUdaje, _super);
                function GSmlOstatniUdaje() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                GSmlOstatniUdaje.prototype.onContentReady = function () {
                    this._createForm();
                    this._fillForm();
                };
                GSmlOstatniUdaje.prototype._fillForm = function () {
                    var _a, _b, _c;
                    //přiřazení hodnot modelu
                    (_a = this.$form) === null || _a === void 0 ? void 0 : _a.findForms("OstatniUdaje-Form").findFields().gfield("model", "apply", this.model, { initialValues: true });
                    this.typ_phl_before = (_c = (_b = this.model.findoc) === null || _b === void 0 ? void 0 : _b.typ_phl) !== null && _c !== void 0 ? _c : "";
                };
                GSmlOstatniUdaje.prototype._createForm = function () {
                    var formVZ = new Gordic.Forms.Form({
                        name: "OstatniUdaje-Form",
                        layoutDescriptor: "L2M2S1, L-5-7-0, M-5-7-0, S-12-12-0, breaks-660-800",
                    })
                        .addSection({ label: "&nbsp", customClass: "" })
                        .addRow("jres:33500384") //RC 33500384 : Účinnost
                        .addField("gstringbox", {
                        name: "ucinnost",
                        disabled: false,
                    })
                        .addRow("jres:33500385") //RC 33500385 : Způsob ukončení
                        .addField("gselectbox", Gordic.Prefabs.Select.smlszuk(), {
                        name: "ixs_zuk",
                        model: "model.ixs_zuk = value.ixs_zuk",
                        disabled: false,
                    })
                        .addRow("jres:33500386") //RC 33500386 : Datum ukončení
                        .addField("gdatebox", {
                        name: "dat_uko",
                        disabled: false,
                    })
                        .addSection({ label: "&nbsp", customClass: "" })
                        .addRow("jres:33500387") //RC 33500387 : Stav odeslání
                        .addField("gstringbox", {
                        name: "s_dor",
                        disabled: true,
                    })
                        .addRow("jres:33500388") //RC 33500388 : Datum odeslání
                        .addField("gdatebox", {
                        name: "dat_odes",
                        disabled: true,
                    })
                        .addRow("jres:33500389") //RC 33500389 : Stav rozhodného zveřejnění
                        .addField("gstringbox", {
                        name: "stav_zpv",
                        disabled: true,
                    })
                        .addRow("jres:33500390") //RC 33500390 : Datum rozhodného zveřejnění
                        .addField("gdatebox", {
                        name: "dat_zve",
                        disabled: true,
                    })
                        .addSection({ label: "&nbsp", customClass: "" })
                        .addRow("jres:33500391") //RC 33500391 : Související dokument 1, Datum
                        .addField("gstringbox", "w-8", {
                        name: "ac_dok_1",
                        disabled: false,
                    })
                        .addField("gdatebox", "w-4", {
                        name: "dat_dok_1",
                        disabled: false,
                    })
                        .addRow("jres:33500392") //RC 33500392 : Související dokument 2, Datum
                        .addField("gstringbox", "w-8", {
                        name: "ac_dok_2",
                        disabled: false,
                    })
                        .addField("gdatebox", "w-4", {
                        name: "dat_dok_2",
                        disabled: false,
                    })
                        .addSection({ label: "&nbsp", customClass: "" })
                        .addRow("jres:33500393") //RC 33500393 : Možnost opce
                        .addField("gselectbox", {
                        data: new Gordic.Data.View([0, 1]),
                        defaultValue: 0,
                        itemTemplate: function (value) {
                            if (value == 0)
                                return "jres:33500394"; //RC 33500394 : Ne
                            else if (value == 1)
                                return "jres:33500395"; //RC 33500395 : Ano
                            else
                                return "";
                        },
                        helperItemTemplate: function (value) {
                            if (value == 0)
                                return "jres:33500396"; //RC 33500396 : Ne
                            else if (value == 1)
                                return "jres:33500397"; //RC 33500397 : Ano
                            else
                                return "";
                        },
                        name: "priz_opce",
                        disabled: false,
                    })
                        .addSection({ label: "&nbsp", customClass: "" })
                        //.addRow("Typ pohledávky")
                        //.addField("gselectbox", Gordic.Prefabs.Select.ddpstpp_vl(), {
                        //    name: "typ_phl",
                        //    model: "model.findoc.typ_phl=value.typ_phl",
                        //    change: (fx, value) => {
                        //        debugger;
                        //        Gordic.Isl.OstatniUdaje.changeTypPhl({ data: { typ_phl_new: value?.value?.typ_phl } }).getData().done((value) => {
                        //            if (value.State == 0) {
                        //                this.$form?.findFields("vs").gfield("setValue", value.HelpValueStringOne);
                        //                this.typ_phl_before = this.$form?.findFields("typ_phl").gfield("getValue").typ_phl;
                        //            }
                        //            else if (value.State == -1) {
                        //                this.$form?.findFields("typ_phl").gfield("setValue", this.typ_phl_before);
                        //            }
                        //        })
                        //    },
                        //    disabled: false,
                        //})
                        //.addRow("VS")
                        //.addField("gstringbox", {
                        //    name: "vs",
                        //    model: "model.findoc.vs",
                        //    disabled: false,
                        //})
                        .addSection({ label: "&nbsp", customClass: "" })
                        .addRow("jres:33500398") //RC 33500398 : Účetní kód dokladu
                        .addField("gstringbox", {
                        name: "ucetni_kod",
                        disabled: true,
                    })
                        .addSection({ label: "Poznámka", layoutDescriptor: "L2M2S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                        .addRow("jres:33500399") //RC 33500399 : Poznámka
                        .addField("gstringbox", "w-12", {
                        name: "poznamka",
                        model: "model.poznamka=value",
                        disabled: false,
                        rows: 3,
                    });
                    this.$form = $("<div>").appendTo(this.element).gform("createFrom", formVZ);
                };
                GSmlOstatniUdaje = __decorate([
                    gcontent
                ], GSmlOstatniUdaje);
                return GSmlOstatniUdaje;
            }(Gordic.GContentBase));
            WebClient.GSmlOstatniUdaje = GSmlOstatniUdaje;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=GSmlOstatniUdaje.js.map
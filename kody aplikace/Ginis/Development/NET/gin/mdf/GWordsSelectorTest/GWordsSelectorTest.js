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
    var Mdf;
    (function (Mdf) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            var GWordsSelectorTest = /** @class */ (function (_super) {
                __extends(GWordsSelectorTest, _super);
                function GWordsSelectorTest() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                GWordsSelectorTest.prototype.onContentReady = function () {
                    var that = this;
                    this.$navrhar = $("<div class='no-border'>").append($("<h3>", { text: "Návrh pohledu", style: "margin: 0.5rem" })).appendTo(this.element);
                    var formBuilder = new Gordic.Forms.Form("L3M3S3, L-3-6-3, M-3-6-3, S-3-6-3");
                    var data = this.dataSentence.allSortedDataWords.filter(function (w) { return w.Pouziti == 1; })
                        .map(function (w, index) {
                        return { dbNazev: w.DbNazev, zkratka: w.Zkratka, checked: false };
                    });
                    formBuilder.addSection()
                        .addRow("Slova účetní věty").addField("gselectbox", {
                        name: "A",
                        sortable: true,
                        customClass: "dropField",
                        sortableLink: ".dropField .gselectbox-vc",
                        itemTemplate: "<div class='word'>{zkratka}</div>",
                        itemDeletable: false,
                        graphicInput: "hidden",
                        multi: true,
                        showSelectButton: false,
                        itemWidth: "",
                        //emptyValue: data,
                        //data: data,
                        emptyValue: data /*, tooltip: "Foooo"*/
                    })
                        .addRow("Použitá slova v sestavě").addField("gselectbox", {
                        name: "B",
                        customClass: "dropField",
                        sortable: true,
                        itemDeletable: false,
                        sortableLink: ".dropField .gselectbox-vc",
                        //data: [{ value: "a", checked: false }, { value: "b", checked: false }, { value: "c", checked: false }, { value: "d", checked: false }],
                        graphicInput: "hidden",
                        multi: true,
                        itemWidth: "",
                        itemTemplate: function (value) {
                            var _a;
                            var div = $.newDiv("word")
                                .append($.newSpan().text((_a = value === null || value === void 0 ? void 0 : value.zkratka) !== null && _a !== void 0 ? _a : "?"));
                            //.append($.newSpan().text("?"));
                            $.newDiv("inline pr wordIcon").appendTo(div).gcheck({
                                name: "check" + value.dbNazev, initialValue: value.checked, change: function (e, v) {
                                    var _a;
                                    value.checked = (_a = v.value) !== null && _a !== void 0 ? _a : false;
                                }
                            });
                            div.append($("<span style='float: right; margin-right: 5px;'>Ʃ</span>"));
                            return div;
                        },
                        showSelectButton: false,
                    });
                    this.$navrharForm = $("<div>").appendTo(this.$navrhar).gform("createFrom", formBuilder);
                };
                GWordsSelectorTest = __decorate([
                    gcontent
                ], GWordsSelectorTest);
                return GWordsSelectorTest;
            }(Gordic.GContentBase));
            WebClient.GWordsSelectorTest = GWordsSelectorTest;
        })(WebClient = Mdf.WebClient || (Mdf.WebClient = {}));
    })(Mdf = Gordic.Mdf || (Gordic.Mdf = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=GWordsSelectorTest.js.map
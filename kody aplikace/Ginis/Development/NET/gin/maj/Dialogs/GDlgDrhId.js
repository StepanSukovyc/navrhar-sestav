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
            var GDlgDrhId = /** @class */ (function (_super) {
                __extends(GDlgDrhId, _super);
                function GDlgDrhId() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                GDlgDrhId.prototype.onContentReady = function () {
                    var that = this;
                    //akce
                    this.actions.addRange({
                        actOk: {
                            caption: GDlg.mbbOk.text,
                            run: function (ev, ctx) {
                                that.tryClose({ policko: that.grid.ggrid("activeRow"), uctOsnova: that.grid2.ggrid("activeRow") });
                            }
                        },
                        actClose: {
                            caption: GDlg.mbbClose.text,
                            run: function (ev, ctx) {
                                //that.dialogs.confirm("??? fakt ??").createDialogPromise("yes").done(() => {
                                that.tryClose();
                                //})
                            }
                        },
                    });
                    //nastavení menu
                    this.commandBar(this.actions.createBar([{ action: this.actions.actOk, primary: true }, "actClose"]));
                    this.grid = $("<div>")
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        data: new Gordic.Data.View(this.tblCis),
                        columnMode: "fit",
                        columns: Gordic.Data.Selectors.majsdrm().gridFormat,
                        selection: function (ev, data) {
                            // slíznu si drh_id
                            var row = data.getSelection()[0]; // that.grid.ggrid("getSelection")[0];
                            if (row) {
                                that.beginOperation("Načítám účtovou osnovu...");
                                that.call("NactiUctOsnovu", { drhId: row.drh_id }).done(function (data) {
                                    that.endOperation();
                                    var view = new Gordic.Data.View(data, { key: "drh_id, rok_od" });
                                    that.grid2.ggrid("setData", view);
                                });
                            } // end if (row)
                        }, // end selection()
                    });
                    this.grid2 = $("<div>")
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        // data: new Gordic.Data.View(this.tblCisSu),
                        columnMode: "fit",
                        columns: this.createGridFormat2()
                    });
                }; // end (onContentReady)
                //createGridFormat() {           
                //    /**
                //     * Creates format for grid - DS.
                //     * 
                //     * @returns {Gordic.Data.GridFormat} grid format
                //    */
                //    // MAJSDRM
                //    return new Gordic.Data.GridFormat()
                //        .addNumberColumn({
                //            name: "drh_id",
                //            caption: "#",
                //            width: 40,
                //            fixedWidth: true,
                //            customClass: "ui-disabled"
                //        })
                //        .addNumberColumn({
                //            name: "skupina_id",
                //            caption: "S-id",
                //            width: 25,
                //            fixedWidth: true,
                //            customClass: "ui-disabled",
                //            hidden: true,
                //        })                
                //        .addTextColumn({
                //            name: "skupina_zkr",
                //            caption: "jres:24534086", //RC 24534086 : Skupina
                //            width: 70,                                        
                //        })
                //        .addTextColumn({
                //            name: "drh_txt",
                //            caption: "jres:24534028", //RC 24534028 : Popis
                //            width: 200,
                //        })
                //        .addTextColumn({
                //            name: "drh_zkr",
                //            caption: "jres:24534273", //RC 24534273 : Zkratka
                //            width: 90,
                //        })
                //        .addTextColumn({
                //            name: "mode_odp_txt",
                //            caption: "jres:24534606", //RC 24534606 : Odp
                //            width: 50,
                //        })
                //        .addTextColumn({
                //            name: "typ_rp_zkr",
                //            caption: "jres:24534607", //RC 24534607 : RP
                //            width: 90,
                //        })
                //        .addTextColumn({
                //            name: "s_prodej_txt",
                //            caption: "jres:24534608", //RC 24534608 : Prodej
                //            width: 110,
                //        })
                //        .addTextColumn({
                //            name: "aktivita_txt",
                //            caption: "jres:24534609", //RC 24534609 : Aktivita
                //            width: 80,
                //        })
                //        .addNumberColumn({
                //            name: "k_v",
                //            caption: "jres:24534610", //RC 24534610 : Třídění
                //            width: 80,
                //        })
                //} // end function (createGridFormat)
                GDlgDrhId.prototype.createGridFormat2 = function () {
                    /**
                     * Creates format for grid - DS.
                     *
                     * @returns {Gordic.Data.GridFormat} grid format
                    */
                    var SuWidth = 75;
                    // MAJVDRO
                    return new Gordic.Data.GridFormat()
                        .addNumberColumn({
                        name: "rok_od",
                        caption: "jres:24534612",
                        width: 75,
                    })
                        .addNumberColumn({
                        name: "rok_do",
                        caption: "jres:24534613",
                        width: 75,
                    })
                        .addTextColumn({
                        name: "uea_por",
                        //  caption: "???", 
                        headerTemplate: "jres:24534614",
                        width: SuWidth,
                    })
                        .addTextColumn({
                        name: "uea_evi",
                        caption: "jres:24534615",
                        width: SuWidth,
                    })
                        .addTextColumn({
                        name: "uea_opr",
                        caption: "jres:24534616",
                        width: SuWidth,
                    })
                        .addTextColumn({
                        name: "uea_opp",
                        caption: "jres:24534617",
                        width: SuWidth,
                    })
                        .addTextColumn({
                        name: "aktivita_txt",
                        caption: "jres:24534609",
                        width: 90,
                    });
                }; // end function (createGridFormat2)
                GDlgDrhId = __decorate([
                    Decorators.gcontent
                ], GDlgDrhId);
                return GDlgDrhId;
            }(Gordic.GContentBase));
            WebClient.GDlgDrhId = GDlgDrhId;
        })(WebClient = Maj.WebClient || (Maj.WebClient = {}));
    })(Maj = Gordic.Maj || (Gordic.Maj = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=GDlgDrhId.js.map
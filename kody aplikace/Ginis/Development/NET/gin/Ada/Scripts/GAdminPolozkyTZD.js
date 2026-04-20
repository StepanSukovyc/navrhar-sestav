"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAdminPolozkyTZD.js                                                        </Name>
//    <Description> GAkceUct                                                                                  </Description>
//    <Author>      Jiří Ileček                                                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2016                                                                </Copyright>
//    <Created>     2016-03-03                                                                                      </Created>
//  </FileHeader>
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
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
    var Ada;
    (function (Ada) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            var GAdminPolozkyTZD = /** @class */ (function (_super) {
                __extends(GAdminPolozkyTZD, _super);
                function GAdminPolozkyTZD() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.title = "Seznam položek SdP"; //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#
                    _this.taskId = "actSeznamSdP"; // označení položky v taskListu
                    return _this;
                }
                GAdminPolozkyTZD.prototype.onContentReady = function () {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    var datauct = this.modeluct;
                    console.log("GAdminPolozkyTZD", this.modeluct);
                    $tab.empty();
                    var cnt = this;
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    this.actions.addRange({
                        actNew: {
                            caption: "Nový", icon: "gi-plus",
                            run: function () {
                                return that.detail_radku(true, true);
                            }
                        },
                        actDetail: {
                            caption: "Upravit", icon: "gi-detail",
                            primary: true,
                            run: function () {
                                return that.detail_radku(true, false);
                            }
                        },
                        actDelete: {
                            caption: "Odstranit", icon: "fa-trash",
                            run: function () {
                                return that.smazani_radku();
                            }
                        },
                    });
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actNew*", "actDetail*", "actDelete*"]));
                    //var actEdit = new GAction({
                    //    name: "dblclick",
                    //    run: function (ev, ctx) {
                    //        GDlg.alert("Dvojklik");
                    //        // ctx.cellInfo.data
                    //    }
                    //});
                    var $mainTable = $("<div>")
                        //.css("height", "100%")
                        .appendTo(mainForm)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        cellActivate: function (ev, ctx) {
                            that.row = $mainTable.ggrid("activeRow");
                            if (that.row !== null) {
                                //console.log("adasubgridrowselected", that.row.cislo);
                            }
                        },
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: function (ev, ctx) {
                                debugger;
                                that.row = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek
                                return that.detail_radku(true, false);
                            }
                        }),
                        searchColumns: ["*id_psp", "*nazev", "*zkratka", "*poznamka"],
                        columns: new Gordic.Data.GridFormat()
                            .addIconColumn({
                            name: "aktivita",
                            field: "aktivita",
                            caption: "Stav",
                            // width: 25,
                            formatPreset: Gordic.Global.Enums.GridColumnFormatIcon.icon,
                            iconTemplate: function (data) {
                                switch (data.aktivita) {
                                    case 100: return { icon: "fa-check-circle-o g-state-success g-state-text", text: "Aktivní", caption: "Aktivní", tooltip: "Aktivní" };
                                    case 300: return { icon: "fa-check-circle g-state-warning g-state-text", text: "Návrh", caption: "Návrh", tooltip: "Návrh" };
                                    case 500: return { icon: "fa-trash g-state-error g-state-text", text: "Neaktivní", caption: "Neaktivní", tooltip: "Neaktivní" };
                                    default: return null;
                                }
                            }
                        })
                            .addTextColumn({
                            name: "id_psp",
                            caption: "ID PSP",
                            width: 130
                        })
                            .addTextColumn({
                            name: "nazev",
                            caption: "Název",
                            width: 300
                        })
                            .addTextColumn({
                            name: "zkratka",
                            caption: "Zkratka",
                            width: 100
                        })
                            .addTextColumn({
                            name: "poznamka",
                            caption: "Poznámka",
                            width: 300
                        })
                            .addDateTimeColumn({
                            name: "dat_zmena",
                            caption: "Datum změny",
                            customClass: "dt-left",
                            width: 140,
                        })
                            .addTextColumn({
                            name: "zmenu_prov_txt",
                            caption: "Změnu provedl",
                            width: 300
                        })
                    });
                    that.view_ISL = new Gordic.Isl.View(this.isl.PolozkaSdP.list(function (rq) {
                        console.log("calling this.isl.PolozkaSdP.list", "");
                        console.log("PolozkaSdP.list", that.view_ISL);
                        return { filters: {} };
                    }));
                    $mainTable.ggrid("setData", that.view_ISL);
                };
                GAdminPolozkyTZD.prototype.smazani_radku = function () {
                    var that = this;
                    that.dialogs.messageBox("Dotaz", "Opravdu odstranit záznam?", Gordic.Ada.WebClient.AdaConst.mbbYesNoNegativ, GDlg.mbiQuestion)
                        .on("yes", function () {
                        that.isl.PolozkaSdP.read({ data: that.row })
                            .getData()
                            .done(function (new_data2) {
                            console.log("new_data2", new_data2);
                            that.isl.PolozkaSdP.delete({ data: new_data2 })
                                .get()
                                .then(function (response) {
                                console.log("ulozeno data_radkuPSP", response.data);
                                that.view_ISL.updateData(response.data, "delete");
                            })
                                .fail(function () {
                            });
                        });
                    });
                };
                GAdminPolozkyTZD.prototype.detail_radku = function (editable, novaakce) {
                    var that = this;
                    if (novaakce == false) {
                        that.isl.PolozkaSdP.read({ data: that.row })
                            .getData()
                            .done(function (new_data2) {
                            console.log("new_data2", new_data2);
                            var l_oDiv = that.dialogs.showModalWindow("Gordic.Ada.WebClient.GAdminPolozkyTZDDetail", { modelPSP: new_data2 }, "Detail položky SdP", 350, 450, true); // zobrazení modálního Tabu
                            $(l_oDiv).on('close', function (ev, ctx) {
                                debugger;
                                var akt_data = ctx.data;
                                if (akt_data != null) {
                                    console.log("editace", ctx.data);
                                    that.isl.PolozkaSdP.update({ data: ctx.data })
                                        .get()
                                        .then(function (response) {
                                        console.log("ulozeno data_radkuPSP", response.data);
                                        that.view_ISL.updateData(response.data, "update");
                                    })
                                        .fail(function () {
                                    });
                                }
                            });
                        });
                    }
                    else {
                        var novy_zaznam = {};
                        novy_zaznam.id_psp = "";
                        novy_zaznam.aktivita = 100;
                        var l_oDiv = that.dialogs.showModalWindow("Gordic.Ada.WebClient.GAdminPolozkyTZDDetail", { modelPSP: novy_zaznam }, "Nová položka SdP", 350, 450, true); // zobrazení modálního Tabu
                        $(l_oDiv).on('close', function (ev, ctx) {
                            debugger;
                            console.log("novy", ctx.data);
                            var akt_data = ctx.data;
                            if (akt_data != null) {
                                that.isl.PolozkaSdP.create({ data: ctx.data })
                                    .get()
                                    .then(function (response) {
                                    console.log("ulozeno new data_radkuPSP", response.data);
                                    that.view_ISL.updateData(response.data, "update");
                                })
                                    .fail(function () {
                                });
                            }
                        });
                    }
                };
                GAdminPolozkyTZD = __decorate([
                    gcontent
                ], GAdminPolozkyTZD);
                return GAdminPolozkyTZD;
            }(Gordic.GContentBase));
            WebClient.GAdminPolozkyTZD = GAdminPolozkyTZD;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=GAdminPolozkyTZD.js.map
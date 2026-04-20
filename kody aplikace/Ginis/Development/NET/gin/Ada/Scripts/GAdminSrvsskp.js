"use strict";
/*!//  <FileHeader xmlns="http://www.ordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAdminSrvsskp.js                                                        </Name>
//    <Description> GAkceUct                                                                                  </Description>
//    <Author>      Jiří Ileček                                                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2016                                                                </Copyright>
//    <Created>     2016-03-03                                                                                      </Created>
//  </FileHeader>
*/
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
            let GAdminSrvsskp = class GAdminSrvsskp extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.globals = Gordic.Ada.Globals.GAdaGlobals;
                    this.title = "Seznam skupin"; //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#
                    this.taskId = "actSeznamSrvsskp"; // označení položky v taskListu
                }
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    var datauct = this.modeluct;
                    $tab.empty();
                    var that = this;
                    that.title = "Seznam hodnot " + that.Konfigurace.nazev_skp;
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    this.actions.addRange({
                        actNew: {
                            caption: "Nový záznam", icon: "gi-plus",
                            enabled: that.globals.Param_Administrace_TypCis,
                            run: () => {
                                return that.detail_radku(true, true);
                            }
                        },
                        actDetail: {
                            caption: that.globals.Param_Administrace_TypCis ? "Upravit" : "Detail",
                            icon: that.globals.Param_Administrace_TypCis ? "gi-pencil" : "gi-detail",
                            primary: true,
                            run: () => {
                                return that.detail_radku(that.globals.Param_Administrace_TypCis, false);
                            }
                        },
                        actDelete: {
                            caption: "Odstranit", icon: "fa-trash",
                            enabled: that.globals.Param_Administrace_TypCis,
                            run: () => {
                                return that.smazani_radku();
                            }
                        },
                    });
                    this.actions.addRange({
                        actSeznamPod: {
                            caption: "Seznam hodnot " + that.Konfigurace.nazev_psk,
                            align: "opposite",
                            favorite: true,
                            icon: "gi-plus",
                            run: () => {
                                var l_oDiv = that.navigate("Gordic.Ada.WebClient.GAdminSrvspsk", {
                                    id: 'SeznamPSK#',
                                    Konfigurace: that.Konfigurace,
                                    Ixs_Csp: that.row.ixs_csp,
                                    Skp_Akc: that.row.skp_akc
                                });
                                return;
                            }
                        }
                    });
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actNew*", "actDetail*", "actDelete*"], ["actSeznamPod*"]));
                    //var actEdit = new GAction({
                    //    name: "dblclick",
                    //    run: function (ev, ctx) {
                    //        GDlg.alert("Dvojklik");
                    //        // ctx.cellInfo.data
                    //    }
                    //});
                    var gfEDS = new Gordic.Data.GridFormat()
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
                        name: "skp_akc",
                        caption: that.Konfigurace.nazev_skp,
                        width: 130
                    })
                        .addTextColumn({
                        name: "nazev",
                        caption: "Název",
                        width: 400
                    });
                    var $mainTable = $("<div>")
                        //.css("height", "100%")
                        .appendTo(mainForm)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        cellActivate(ev, ctx) {
                            that.row = $mainTable.ggrid("activeRow");
                            if (that.row !== null) {
                                if ((that.Konfigurace.nazev_skp != "") && (that.Konfigurace.delka_psk != 0)) {
                                    that.actions.actSeznamPod.update({ caption: "Seznam hodnot " + that.Konfigurace.nazev_psk, visible: true });
                                }
                            }
                        },
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run(ev, ctx) {
                                that.row = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek
                                return that.detail_radku(true, false);
                            }
                        }),
                        searchColumns: ["*skp_akc", "*nazev"],
                        columns: gfEDS
                    });
                    var filterDto = {};
                    if ((that.Ixs_Csp != undefined) && (that.Ixs_Csp.toString() != "")) {
                        filterDto.ixs_csp = that.Ixs_Csp.toString();
                    }
                    that.view_ISL = new Gordic.Isl.View(this.isl.SkupinaADADyn.list({ filters: filterDto }));
                    $mainTable.ggrid("setData", that.view_ISL);
                }
                smazani_radku() {
                    var that = this;
                    that.dialogs.messageBox("Dotaz", "Opravdu odstranit záznam?", Gordic.Ada.WebClient.AdaConst.mbbYesNoNegativ, GDlg.mbiQuestion)
                        .on("yes", function () {
                        that.isl.SkupinaADADyn.read({ data: that.row })
                            .getData()
                            .done(function (new_data2) {
                            that.isl.SkupinaADADyn.delete({ data: new_data2 })
                                .get()
                                .then(function (response) {
                                that.view_ISL.updateData(response.data, "delete");
                            })
                                .fail(function () {
                            });
                        });
                    });
                }
                detail_radku(editable, novaakce) {
                    var that = this;
                    if (novaakce == false) {
                        that.isl.SkupinaADADyn.read({ data: that.row })
                            .getData()
                            .done(function (new_data2) {
                            var l_detailwindow = that.navigate("Gordic.Ada.WebClient.GAdminSrvsskpDetail", {
                                id: 'DetailSKP#',
                                Konfigurace: that.Konfigurace,
                                modelSKP: new_data2,
                                RezimNova: novaakce
                            });
                            var windowContent = $.content(l_detailwindow);
                            windowContent.element.on('contentclosed', (ev, ctx) => {
                                //debugger;
                                var akt_data = ctx.data;
                                if (akt_data != null) {
                                    that.isl.SkupinaADADyn.update({ data: ctx.data })
                                        .get()
                                        .then(function (response) {
                                        that.view_ISL.updateData(response.data, "update");
                                    })
                                        .fail(function () {
                                    });
                                }
                            });
                            //    var l_oDiv = that.dialogs.showModalWindow("Gordic.Ada.WebClient.GAdminSrvsskpDetail",
                            //        {
                            //            id: 'DetailSKP#',
                            //            Konfigurace: that.Konfigurace,
                            //            modelSKP: new_data2,
                            //            RezimNova: novaakce
                            //        },
                            //        "Detail hodnoty " + that.Konfigurace.nazev_skp, 600, 600, true);    // zobrazení modálního Tabu
                            //    $(l_oDiv).on('close', function (ev, ctx) {
                            //        var akt_data = ctx.data!;
                            //        if (akt_data != null) {
                            //            that.isl.SkupinaADADyn.update({ data: ctx.data! })
                            //                .get()
                            //                .then(function (response) {
                            //                    that.view_ISL.updateData(response.data, "update");
                            //                })
                            //                .fail(function () {
                            //                });
                            //        }
                            //    });
                        });
                    }
                    else {
                        var novy_zaznam = {};
                        novy_zaznam.ixs_csp = that.Ixs_Csp;
                        novy_zaznam.aktivita = 100;
                        var l_detailwindow = that.navigate("Gordic.Ada.WebClient.GAdminSrvsskpDetail", {
                            id: 'DetailSKP#',
                            Konfigurace: that.Konfigurace,
                            modelSKP: novy_zaznam,
                            RezimNova: novaakce
                        });
                        var windowContent = $.content(l_detailwindow);
                        windowContent.element.on('contentclosed', (ev, ctx) => {
                            //debugger;
                            var akt_data = ctx.data;
                            if (akt_data != null) {
                                that.isl.SkupinaADADyn.create({ data: ctx.data })
                                    .get()
                                    .then(function (response) {
                                    that.view_ISL.updateData(response.data, "update");
                                })
                                    .fail(function () {
                                });
                            }
                        });
                        //var l_oDiv = that.dialogs.showModalWindow("Gordic.Ada.WebClient.GAdminSrvsskpDetail",
                        //    {
                        //        id: 'DetailSKP#',
                        //        Konfigurace: that.Konfigurace,
                        //        modelSKP: novy_zaznam,
                        //        RezimNova: novaakce
                        //    },
                        //    "Nová hodnota " + that.Konfigurace.nazev_skp, 600, 600, true);    // zobrazení modálního Tabu
                        //$(l_oDiv).on('close', function (ev, ctx) {
                        //    var akt_data = ctx.data!;
                        //    if (akt_data != null) {
                        //        that.isl.SkupinaADADyn.create({ data: ctx.data! })
                        //            .get()
                        //            .then(function (response) {
                        //                that.view_ISL.updateData(response.data, "update");
                        //            })
                        //            .fail(function () {
                        //            });
                        //    }
                        //});
                    }
                }
            };
            GAdminSrvsskp = __decorate([
                gcontent
            ], GAdminSrvsskp);
            WebClient.GAdminSrvsskp = GAdminSrvsskp;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FkbWluU3J2c3NrcC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HQWRtaW5TcnZzc2twLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztFQU9FOzs7Ozs7O0FBRUYsSUFBVSxNQUFNLENBa1NmO0FBbFNELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWtTbkI7SUFsU2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWtTN0I7UUFsU29CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxPQUFBLFlBQVk7Z0JBQS9DOztvQkFFWSxZQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO29CQVlqRCxVQUFLLEdBQUcsZUFBZSxDQUFDLENBQUMsbUVBQW1FO29CQUM1RixXQUFNLEdBQUcsa0JBQWtCLENBQUMsQ0FBQywrQkFBK0I7Z0JBOFFoRSxDQUFDO2dCQTVRRyxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFFNUIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUViLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztvQkFFM0QsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRWxJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixNQUFNLEVBQUU7NEJBQ0osT0FBTyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsU0FBUzs0QkFDdkMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQTBCOzRCQUNoRCxHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7NEJBQ3pDLENBQUM7eUJBQ0o7d0JBQ0QsU0FBUyxFQUFFOzRCQUNQLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVE7NEJBQ3RFLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVc7NEJBQ3hFLE9BQU8sRUFBRSxJQUFJOzRCQUNiLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLEVBQUUsS0FBSyxDQUFDLENBQUM7NEJBQzVFLENBQUM7eUJBQ0o7d0JBQ0QsU0FBUyxFQUFFOzRCQUNQLE9BQU8sRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFVBQVU7NEJBQ3RDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUEwQjs0QkFDaEQsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs0QkFDaEMsQ0FBQzt5QkFDSjtxQkFFSixDQUFDLENBQUM7b0JBRUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLFlBQVksRUFBRTs0QkFDVixPQUFPLEVBQUUsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTOzRCQUN0RCxLQUFLLEVBQUUsVUFBVTs0QkFDakIsUUFBUSxFQUFFLElBQUk7NEJBQ2QsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FFTixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUN0QixvQ0FBb0MsRUFDcEM7b0NBQ0ksRUFBRSxFQUFFLFlBQVk7b0NBQ2hCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztvQ0FDN0IsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTztvQ0FDekIsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTztpQ0FDNUIsQ0FBQyxDQUFDO2dDQUNQLE9BQU87NEJBQ1gsQ0FBQzt5QkFDSjtxQkFDSixDQUFDLENBQUM7b0JBRUgsb0JBQW9CO29CQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFakcsNkJBQTZCO29CQUM3Qix1QkFBdUI7b0JBQ3ZCLCtCQUErQjtvQkFDL0IsaUNBQWlDO29CQUNqQyw4QkFBOEI7b0JBQzlCLE9BQU87b0JBQ1AsS0FBSztvQkFFTCxJQUFJLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO3lCQUNuQyxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLEtBQUssRUFBRSxVQUFVO3dCQUNqQixPQUFPLEVBQUUsTUFBTTt3QkFDZixhQUFhO3dCQUNiLFlBQVksRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJO3dCQUMzRCxZQUFZLEVBQUUsVUFBVSxJQUFJOzRCQUN4QixRQUFRLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQ0FDcEIsS0FBSyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLGdEQUFnRCxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7Z0NBQ3JJLEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSw4Q0FBOEMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2dDQUM3SCxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUscUNBQXFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQztnQ0FDaEksT0FBTyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUM7NEJBQ3pCLENBQUM7d0JBQ0wsQ0FBQztxQkFDSixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsU0FBUzt3QkFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFVO3dCQUNwQyxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsT0FBTzt3QkFDYixPQUFPLEVBQUUsT0FBTzt3QkFDaEIsS0FBSyxFQUFFLEdBQUc7cUJBQ2IsQ0FBQyxDQUFDO29CQUVQLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7d0JBQ3ZCLHdCQUF3Qjt5QkFDdkIsUUFBUSxDQUFDLFFBQVEsQ0FBQzt5QkFDbEIsUUFBUSxFQUFFO3lCQUNWLEtBQUssQ0FBQzt3QkFDSCxVQUFVLEVBQUUsTUFBTTt3QkFFbEIsWUFBWSxDQUFDLEVBQUUsRUFBRSxHQUFHOzRCQUNoQixJQUFJLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7NEJBQ3pDLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztnQ0FDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQ0FDMUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFhLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dDQUNqSCxDQUFDOzRCQUNMLENBQUM7d0JBQ0wsQ0FBQzt3QkFFRCxhQUFhLEVBQUUsSUFBSSxPQUFPLENBQUM7NEJBQ3ZCLElBQUksRUFBRSxvQkFBb0I7NEJBQzFCLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRztnQ0FDUCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUkscUNBQXFDO2dDQUN0RSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDOzRCQUMxQyxDQUFDO3lCQUNKLENBQUM7d0JBRUYsYUFBYSxFQUFFLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBRTt3QkFDdEMsT0FBTyxFQUFFLEtBQUs7cUJBQ2pCLENBQUMsQ0FBQztvQkFFUCxJQUFJLFNBQVMsR0FBMkMsRUFBRSxDQUFDO29CQUUzRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQzt3QkFDakUsU0FBUyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNoRCxDQUFDO29CQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUV6RixVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRS9DLENBQUM7Z0JBRUQsYUFBYTtvQkFDVCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUM7eUJBQ3pILEVBQUUsQ0FBQyxLQUFLLEVBQUU7d0JBQ1AsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzs2QkFDMUMsT0FBTyxFQUFFOzZCQUNULElBQUksQ0FBQyxVQUFVLFNBQVM7NEJBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztpQ0FDN0MsR0FBRyxFQUFFO2lDQUNMLElBQUksQ0FBQyxVQUFVLFFBQVE7Z0NBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7NEJBQ3RELENBQUMsQ0FBQztpQ0FDRCxJQUFJLENBQUM7NEJBQ04sQ0FBQyxDQUFDLENBQUM7d0JBQ1gsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsQ0FBQyxDQUFDLENBQUE7Z0JBQ1YsQ0FBQztnQkFHRCxZQUFZLENBQUMsUUFBUSxFQUFFLFFBQVE7b0JBQzNCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxRQUFRLElBQUksS0FBSyxFQUFFLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7NkJBQzFDLE9BQU8sRUFBRTs2QkFDVCxJQUFJLENBQUMsVUFBVSxTQUFTOzRCQUVyQixJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUM5QiwwQ0FBMEMsRUFDMUM7Z0NBQ0ksRUFBRSxFQUFFLFlBQVk7Z0NBQ2hCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztnQ0FDN0IsUUFBUSxFQUFFLFNBQVM7Z0NBQ25CLFNBQVMsRUFBRSxRQUFROzZCQUN0QixDQUFDLENBQUM7NEJBRVAsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQzs0QkFFOUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO2dDQUNsRCxXQUFXO2dDQUNYLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFLLENBQUM7Z0NBQ3pCLElBQUksUUFBUSxJQUFJLElBQUksRUFBRSxDQUFDO29DQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUssRUFBRSxDQUFDO3lDQUM3QyxHQUFHLEVBQUU7eUNBQ0wsSUFBSSxDQUFDLFVBQVUsUUFBUTt3Q0FDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztvQ0FDdEQsQ0FBQyxDQUFDO3lDQUNELElBQUksQ0FBQztvQ0FDTixDQUFDLENBQUMsQ0FBQztnQ0FDWCxDQUFDOzRCQUNMLENBQUMsQ0FBQyxDQUFDOzRCQUVQLDJGQUEyRjs0QkFDM0YsV0FBVzs0QkFDWCwrQkFBK0I7NEJBQy9CLDRDQUE0Qzs0QkFDNUMsa0NBQWtDOzRCQUNsQyxpQ0FBaUM7NEJBQ2pDLFlBQVk7NEJBQ1oseUdBQXlHOzRCQUV6RyxnREFBZ0Q7NEJBQ2hELG1DQUFtQzs0QkFDbkMsaUNBQWlDOzRCQUNqQyxnRUFBZ0U7NEJBQ2hFLHdCQUF3Qjs0QkFDeEIsNkNBQTZDOzRCQUM3Qyx3RUFBd0U7NEJBQ3hFLG9CQUFvQjs0QkFDcEIscUNBQXFDOzRCQUNyQyxxQkFBcUI7NEJBQ3JCLFdBQVc7NEJBQ1gsU0FBUzt3QkFDVCxDQUFDLENBQUMsQ0FBQztvQkFDWCxDQUFDO3lCQUNJLENBQUM7d0JBQ0YsSUFBSSxXQUFXLEdBQXFDLEVBQUUsQ0FBQzt3QkFDdkQsV0FBVyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO3dCQUNuQyxXQUFXLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQzt3QkFFM0IsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FDOUIsMENBQTBDLEVBQzFDOzRCQUNJLEVBQUUsRUFBRSxZQUFZOzRCQUNoQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7NEJBQzdCLFFBQVEsRUFBRSxXQUFXOzRCQUNyQixTQUFTLEVBQUUsUUFBUTt5QkFDdEIsQ0FBQyxDQUFDO3dCQUVQLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7d0JBRTlDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFDbEQsV0FBVzs0QkFDWCxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsSUFBSyxDQUFDOzRCQUN6QixJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUUsQ0FBQztnQ0FDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFLLEVBQUUsQ0FBQztxQ0FDN0MsR0FBRyxFQUFFO3FDQUNMLElBQUksQ0FBQyxVQUFVLFFBQVE7b0NBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0NBQ3RELENBQUMsQ0FBQztxQ0FDRCxJQUFJLENBQUM7Z0NBQ04sQ0FBQyxDQUFDLENBQUM7NEJBQ1gsQ0FBQzt3QkFDTCxDQUFDLENBQUMsQ0FBQzt3QkFFSCx1RkFBdUY7d0JBQ3ZGLE9BQU87d0JBQ1AsMkJBQTJCO3dCQUMzQix3Q0FBd0M7d0JBQ3hDLGdDQUFnQzt3QkFDaEMsNkJBQTZCO3dCQUM3QixRQUFRO3dCQUNSLG1HQUFtRzt3QkFFbkcsNENBQTRDO3dCQUM1QywrQkFBK0I7d0JBQy9CLDZCQUE2Qjt3QkFDN0IsNERBQTREO3dCQUM1RCxvQkFBb0I7d0JBQ3BCLHlDQUF5Qzt3QkFDekMsb0VBQW9FO3dCQUNwRSxnQkFBZ0I7d0JBQ2hCLGlDQUFpQzt3QkFDakMsaUJBQWlCO3dCQUNqQixPQUFPO3dCQUNQLEtBQUs7b0JBRVQsQ0FBQztnQkFFTCxDQUFDO2FBRUosQ0FBQTtZQTdSWSxhQUFhO2dCQUR6QixRQUFRO2VBQ0ksYUFBYSxDQTZSekI7WUE3UlksdUJBQWEsZ0JBNlJ6QixDQUFBO1FBQ0wsQ0FBQyxFQWxTb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBa1M3QjtJQUFELENBQUMsRUFsU2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWtTbkI7QUFBRCxDQUFDLEVBbFNTLE1BQU0sS0FBTixNQUFNLFFBa1NmIiwic291cmNlc0NvbnRlbnQiOlsiLyohLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5vcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkFkYS5XZWJDbGllbnQuR0FkbWluU3J2c3NrcC5qcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEdBa2NlVWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSmnFmcOtIElsZcSNZWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAxNiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE2LTAzLTAzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbiovXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkFkYS5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHQWRtaW5TcnZzc2twIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnbG9iYWxzID0gR29yZGljLkFkYS5HbG9iYWxzLkdBZGFHbG9iYWxzO1xyXG5cclxuICAgICAgICBwcml2YXRlIG1vZGVsdWN0OiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU3J2c3NrcER0b1tdO1xyXG4gICAgICAgIHByaXZhdGUgZGF0YXVjdDogR29yZGljLkFkYS5JbnRlcmZhY2UuR1NydnNza3BEdG9bXTtcclxuICAgICAgICBwcml2YXRlIHJvdzogR29yZGljLkFkYS5JbnRlcmZhY2UuR1NydnNza3BEdG87XHJcbiAgICAgICAgcHJpdmF0ZSBJeHNfQ3NwOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBLb25maWd1cmFjZTogR29yZGljLkFkYS5JbnRlcmZhY2UuR1NydnNjc3BEdG87XHJcblxyXG4gICAgICAgIHByaXZhdGUgVXJvdmVuOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHByaXZhdGUgdmlld19JU0w6IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuQWRhLkludGVyZmFjZS5HU3J2c3NrcER0bz47XHJcblxyXG4gICAgICAgIHRpdGxlID0gXCJTZXpuYW0gc2t1cGluXCI7IC8vYWJ5IHNlIGRhbG8gcMWZaXN0b3VwaXQgeiBicmVhZGNydW1icywgamUgbmFzdGF2ZW5vIHpkZSBtw61zdG8gdiBDI1xyXG4gICAgICAgIHRhc2tJZCA9IFwiYWN0U2V6bmFtU3J2c3NrcFwiOyAvLyBvem5hxI1lbsOtIHBvbG/Fvmt5IHYgdGFza0xpc3R1XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgJHRhYiA9ICQodGhpcy5jb250ZW50RGl2KTtcclxuICAgICAgICAgICAgdmFyIGRhdGF1Y3QgPSB0aGlzLm1vZGVsdWN0O1xyXG5cclxuICAgICAgICAgICAgJHRhYi5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnRpdGxlID0gXCJTZXpuYW0gaG9kbm90IFwiICsgdGhhdC5Lb25maWd1cmFjZS5uYXpldl9za3A7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWFpbkZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcInNldHVwXCIsIHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTAtMTItMFwiIH0pLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3ROZXc6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk5vdsO9IHrDoXpuYW1cIiwgaWNvbjogXCJnaS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhhdC5nbG9iYWxzLlBhcmFtX0FkbWluaXN0cmFjZV9UeXBDaXMhLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kZXRhaWxfcmFka3UodHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdERldGFpbDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoYXQuZ2xvYmFscy5QYXJhbV9BZG1pbmlzdHJhY2VfVHlwQ2lzID8gXCJVcHJhdml0XCIgOiBcIkRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IHRoYXQuZ2xvYmFscy5QYXJhbV9BZG1pbmlzdHJhY2VfVHlwQ2lzID8gXCJnaS1wZW5jaWxcIiA6IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGV0YWlsX3JhZGt1KHRoYXQuZ2xvYmFscy5QYXJhbV9BZG1pbmlzdHJhY2VfVHlwQ2lzLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdERlbGV0ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2RzdHJhbml0XCIsIGljb246IFwiZmEtdHJhc2hcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGF0Lmdsb2JhbHMuUGFyYW1fQWRtaW5pc3RyYWNlX1R5cENpcyEsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnNtYXphbmlfcmFka3UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0U2V6bmFtUG9kOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTZXpuYW0gaG9kbm90IFwiICsgdGhhdC5Lb25maWd1cmFjZS5uYXpldl9wc2ssXHJcbiAgICAgICAgICAgICAgICAgICAgYWxpZ246IFwib3Bwb3NpdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBsdXNcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsX29EaXYgPSB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWRtaW5TcnZzcHNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdTZXpuYW1QU0sjJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBLb25maWd1cmFjZTogdGhhdC5Lb25maWd1cmFjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHNfQ3NwOiB0aGF0LnJvdy5peHNfY3NwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNrcF9Ba2M6IHRoYXQucm93LnNrcF9ha2NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vbmFzdGF2ZW7DrSBtZW51QmFydVxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3ROZXcqXCIsIFwiYWN0RGV0YWlsKlwiLCBcImFjdERlbGV0ZSpcIl0sIFtcImFjdFNlem5hbVBvZCpcIl0pKTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIGFjdEVkaXQgPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiZGJsY2xpY2tcIixcclxuICAgICAgICAgICAgLy8gICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgR0RsZy5hbGVydChcIkR2b2prbGlrXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgLy8gY3R4LmNlbGxJbmZvLmRhdGFcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGdmRURTID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogXCJha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3RhdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHdpZHRoOiAyNSxcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRQcmVzZXQ6IEdvcmRpYy5HbG9iYWwuRW51bXMuR3JpZENvbHVtbkZvcm1hdEljb24uaWNvbixcclxuICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZGF0YS5ha3Rpdml0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDA6IHJldHVybiB7IGljb246IFwiZmEtY2hlY2stY2lyY2xlLW8gZy1zdGF0ZS1zdWNjZXNzIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBcIkFrdGl2bsOtXCIsIGNhcHRpb246IFwiQWt0aXZuw61cIiwgdG9vbHRpcDogXCJBa3Rpdm7DrVwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDMwMDogcmV0dXJuIHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS13YXJuaW5nIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBcIk7DoXZyaFwiLCBjYXB0aW9uOiBcIk7DoXZyaFwiLCB0b29sdGlwOiBcIk7DoXZyaFwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDUwMDogcmV0dXJuIHsgaWNvbjogXCJmYS10cmFzaCBnLXN0YXRlLWVycm9yIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBcIk5lYWt0aXZuw61cIiwgY2FwdGlvbjogXCJOZWFrdGl2bsOtXCIsIHRvb2x0aXA6IFwiTmVha3Rpdm7DrVwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJza3BfYWtjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhhdC5Lb25maWd1cmFjZS5uYXpldl9za3AhLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTsOhemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDQwMFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgJG1haW5UYWJsZSA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLy8uY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKG1haW5Gb3JtKVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxBY3RpdmF0ZShldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucm93ID0gJG1haW5UYWJsZS5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQucm93ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHRoYXQuS29uZmlndXJhY2UubmF6ZXZfc2twICE9IFwiXCIpICYmICh0aGF0LktvbmZpZ3VyYWNlLmRlbGthX3BzayAhPSAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RTZXpuYW1Qb2QhLnVwZGF0ZSh7IGNhcHRpb246IFwiU2V6bmFtIGhvZG5vdCBcIiArIHRoYXQuS29uZmlndXJhY2UubmF6ZXZfcHNrLCB2aXNpYmxlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW4oZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yb3cgPSBjdHguY2VsbEluZm8uZGF0YTsgICAgLy9kYXRhLCB6ZSBrdGVyeWNoIGJ5bCB2eXR2b3JlbiByYWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGV0YWlsX3JhZGt1KHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCIqc2twX2FrY1wiLCBcIipuYXpldlwiIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogZ2ZFRFNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZpbHRlckR0bzogR29yZGljLkFkYS5JbnRlcmZhY2UuR1NydnNwc2tGaWx0ZXJEdG8gPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGlmICgodGhhdC5JeHNfQ3NwICE9IHVuZGVmaW5lZCkgJiYgKHRoYXQuSXhzX0NzcC50b1N0cmluZygpICE9IFwiXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uaXhzX2NzcCA9IHRoYXQuSXhzX0NzcC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQudmlld19JU0wgPSBuZXcgR29yZGljLklzbC5WaWV3KHRoaXMuaXNsLlNrdXBpbmFBREFEeW4ubGlzdCh7IGZpbHRlcnM6IGZpbHRlckR0byB9KSk7XHJcblxyXG4gICAgICAgICAgICAkbWFpblRhYmxlLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXdfSVNMKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzbWF6YW5pX3JhZGt1KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcIkRvdGF6XCIsIFwiT3ByYXZkdSBvZHN0cmFuaXQgesOhem5hbT9cIiwgR29yZGljLkFkYS5XZWJDbGllbnQuQWRhQ29uc3QubWJiWWVzTm9OZWdhdGl2LCBHRGxnLm1iaVF1ZXN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Ta3VwaW5hQURBRHluLnJlYWQoeyBkYXRhOiB0aGF0LnJvdyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChuZXdfZGF0YTIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlNrdXBpbmFBREFEeW4uZGVsZXRlKHsgZGF0YTogbmV3X2RhdGEyIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YShyZXNwb25zZS5kYXRhLCBcImRlbGV0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGRldGFpbF9yYWRrdShlZGl0YWJsZSwgbm92YWFrY2UpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAobm92YWFrY2UgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLlNrdXBpbmFBREFEeW4ucmVhZCh7IGRhdGE6IHRoYXQucm93IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChuZXdfZGF0YTIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsX2RldGFpbHdpbmRvdyA9IHRoYXQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkdvcmRpYy5BZGEuV2ViQ2xpZW50LkdBZG1pblNydnNza3BEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJ0RldGFpbFNLUCMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEtvbmZpZ3VyYWNlOiB0aGF0LktvbmZpZ3VyYWNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsU0tQOiBuZXdfZGF0YTIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmV6aW1Ob3ZhOiBub3ZhYWtjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2luZG93Q29udGVudCA9ICQuY29udGVudChsX2RldGFpbHdpbmRvdyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dDb250ZW50LmVsZW1lbnQub24oJ2NvbnRlbnRjbG9zZWQnLCAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBha3RfZGF0YSA9IGN0eC5kYXRhITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChha3RfZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuU2t1cGluYUFEQUR5bi51cGRhdGUoeyBkYXRhOiBjdHguZGF0YSEgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHJlc3BvbnNlLmRhdGEsIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFyIGxfb0RpdiA9IHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWRtaW5TcnZzc2twRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGlkOiAnRGV0YWlsU0tQIycsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBLb25maWd1cmFjZTogdGhhdC5Lb25maWd1cmFjZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIG1vZGVsU0tQOiBuZXdfZGF0YTIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBSZXppbU5vdmE6IG5vdmFha2NlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIFwiRGV0YWlsIGhvZG5vdHkgXCIgKyB0aGF0LktvbmZpZ3VyYWNlLm5hemV2X3NrcCwgNjAwLCA2MDAsIHRydWUpOyAgICAvLyB6b2JyYXplbsOtIG1vZMOhbG7DrWhvIFRhYnVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgJChsX29EaXYpLm9uKCdjbG9zZScsIGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHZhciBha3RfZGF0YSA9IGN0eC5kYXRhITtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKGFrdF9kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuaXNsLlNrdXBpbmFBREFEeW4udXBkYXRlKHsgZGF0YTogY3R4LmRhdGEhIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YShyZXNwb25zZS5kYXRhLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vdnlfemF6bmFtOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU3J2c3NrcER0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgbm92eV96YXpuYW0uaXhzX2NzcCA9IHRoYXQuSXhzX0NzcDtcclxuICAgICAgICAgICAgICAgIG5vdnlfemF6bmFtLmFrdGl2aXRhID0gMTAwO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBsX2RldGFpbHdpbmRvdyA9IHRoYXQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWRtaW5TcnZzc2twRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ0RldGFpbFNLUCMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBLb25maWd1cmFjZTogdGhhdC5Lb25maWd1cmFjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxTS1A6IG5vdnlfemF6bmFtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXppbU5vdmE6IG5vdmFha2NlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHdpbmRvd0NvbnRlbnQgPSAkLmNvbnRlbnQobF9kZXRhaWx3aW5kb3cpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdpbmRvd0NvbnRlbnQuZWxlbWVudC5vbignY29udGVudGNsb3NlZCcsIChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWt0X2RhdGEgPSBjdHguZGF0YSE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFrdF9kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuU2t1cGluYUFEQUR5bi5jcmVhdGUoeyBkYXRhOiBjdHguZGF0YSEgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHJlc3BvbnNlLmRhdGEsIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdmFyIGxfb0RpdiA9IHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWRtaW5TcnZzc2twRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgaWQ6ICdEZXRhaWxTS1AjJyxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBLb25maWd1cmFjZTogdGhhdC5Lb25maWd1cmFjZSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBtb2RlbFNLUDogbm92eV96YXpuYW0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgUmV6aW1Ob3ZhOiBub3ZhYWtjZVxyXG4gICAgICAgICAgICAgICAgLy8gICAgfSxcclxuICAgICAgICAgICAgICAgIC8vICAgIFwiTm92w6EgaG9kbm90YSBcIiArIHRoYXQuS29uZmlndXJhY2UubmF6ZXZfc2twLCA2MDAsIDYwMCwgdHJ1ZSk7ICAgIC8vIHpvYnJhemVuw60gbW9kw6FsbsOtaG8gVGFidVxyXG5cclxuICAgICAgICAgICAgICAgIC8vJChsX29EaXYpLm9uKCdjbG9zZScsIGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB2YXIgYWt0X2RhdGEgPSBjdHguZGF0YSE7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBpZiAoYWt0X2RhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuaXNsLlNrdXBpbmFBREFEeW4uY3JlYXRlKHsgZGF0YTogY3R4LmRhdGEhIH0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YShyZXNwb25zZS5kYXRhLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==
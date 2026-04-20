"use strict";
/*!//  <FileHeader xmlns="http://www.ordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAdminPolozkyEDS.js                                                        </Name>
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
            let GAdminPolozkyEDS = class GAdminPolozkyEDS extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Seznam programů EDS"; //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#
                    this.taskId = "actSeznamEDS"; // označení položky v taskListu
                    this.globals = Gordic.Ada.Globals.GAdaGlobals;
                }
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    var datauct = this.modeluct;
                    if (that.Uroven == "PIG") {
                        that.title = "Seznam hodnot " + that.globals.Nazev_prg_eds; //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#
                        that.taskId = "actSeznamEDSPRG"; // označení položky v taskListu
                    }
                    if (that.Uroven == "PIJ") {
                        that.title = "Seznam hodnot " + that.globals.Nazev_prj_eds; //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#
                        that.taskId = "actSeznamEDSPIJ"; // označení položky v taskListu
                    }
                    $tab.empty();
                    var that = this;
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    this.actions.addRange({
                        actNew: {
                            caption: "Nový záznam", icon: "gi-plus",
                            enabled: that.globals.Param_Administrace_EDS,
                            run: () => {
                                return that.detail_radku(true, true);
                            }
                        },
                        actDetail: {
                            caption: that.globals.Param_Administrace_EDS ? "Upravit" : "Detail",
                            icon: that.globals.Param_Administrace_EDS ? "gi-pencil" : "gi-detail",
                            primary: true,
                            run: () => {
                                return that.detail_radku(that.globals.Param_Administrace_EDS, false);
                            }
                        },
                        actDelete: {
                            caption: "Odstranit", icon: "fa-trash",
                            enabled: that.globals.Param_Administrace_EDS,
                            run: () => {
                                return that.smazani_radku();
                            }
                        },
                    });
                    this.actions.addRange({
                        actSeznamPod: {
                            caption: "Seznam hodnot " + that.globals.Nazev_prj_eds,
                            align: "opposite",
                            favorite: true,
                            icon: "gi-plus",
                            run: () => {
                                var l_oDiv = that.navigate("Gordic.Ada.WebClient.GAdminPolozkyEDS", {
                                    id: 'DetailEDS#',
                                    Uroven: "PIJ",
                                    HodnotaNad: that.row.xpf_pf
                                });
                                return;
                            }
                        }
                    });
                    //nastavení menuBaru
                    if (that.Uroven == "PIG") {
                        this.menuBar(this.actions.createBar(["actNew*", "actDetail*", "actDelete*"], ["actSeznamPod*"]));
                    }
                    else {
                        this.menuBar(this.actions.createBar(["actNew*", "actDetail*", "actDelete*"]));
                    }
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
                        name: "xpf_pf",
                        caption: (that.Uroven == "PIG") ? that.globals.Nazev_prg_eds : that.globals.Nazev_prj_eds,
                        width: 130
                    })
                        .addTextColumn({
                        name: "nazev",
                        caption: "Název",
                        width: 400
                    })
                        .addNumberColumn({
                        name: "rok_od",
                        caption: "Platnost od",
                        width: 50
                    })
                        .addNumberColumn({
                        name: "rok_do",
                        caption: "Platnost do",
                        width: 50
                    });
                    if (that.Uroven == "PIJ") {
                        gfEDS.addTextColumn({
                            name: "kod_uct",
                            caption: "Kód UCT",
                            width: 300
                        })
                            .addIconColumn({
                            name: "priz_eds",
                            field: "priz_eds",
                            caption: "EDS",
                            // width: 25,
                            formatPreset: Gordic.Global.Enums.GridColumnFormatIcon.icon,
                            iconTemplate: function (data) {
                                switch (data.priz_eds) {
                                    case 1: return { icon: "fa-check-circle g-state-warning g-state-text", text: "Ano", caption: "Ano", tooltip: "Ano" };
                                    default: return null;
                                }
                            }
                        });
                    }
                    ;
                    gfEDS.addDateTimeColumn({
                        name: "dat_zmena",
                        caption: "Datum změny",
                        customClass: "dt-left",
                        width: 150,
                    })
                        .addTextColumn({
                        name: "zmenu_prov_txt",
                        caption: "Změnu provedl",
                        width: 300
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
                            }
                        },
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run(ev, ctx) {
                                that.row = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek
                                return that.detail_radku(true, false);
                            }
                        }),
                        searchColumns: ["*xpf_pf", "*nazev", "*kod_uct"],
                        columns: gfEDS
                    });
                    var filterDto = {};
                    filterDto.uroven = that.Uroven.toString();
                    if ((that.HodnotaNad != undefined) && (that.HodnotaNad.toString() != "")) {
                        filterDto.xpf_pf = that.HodnotaNad.toString();
                    }
                    that.view_ISL = new Gordic.Isl.View(this.isl.ProjektEDS.list({ filters: filterDto }));
                    $mainTable.ggrid("setData", that.view_ISL);
                }
                smazani_radku() {
                    var that = this;
                    that.dialogs.messageBox("Dotaz", "Opravdu odstranit záznam?", Gordic.Ada.WebClient.AdaConst.mbbYesNoNegativ, GDlg.mbiQuestion)
                        .on("yes", function () {
                        that.isl.ProjektEDS.read({ data: that.row })
                            .getData()
                            .done(function (new_data2) {
                            that.isl.ProjektEDS.delete({ data: new_data2 })
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
                        that.isl.ProjektEDS.read({ data: that.row })
                            .getData()
                            .done(function (new_data2) {
                            var l_detailwindow = that.navigate("Gordic.Ada.WebClient.GAdminPolozkyEDSDetail", {
                                id: 'DetailEDS#',
                                Uroven: that.Uroven,
                                modelEDS: new_data2,
                                RezimNova: novaakce
                            });
                            var windowContent = $.content(l_detailwindow);
                            windowContent.element.on('contentclosed', (ev, ctx) => {
                                //debugger;
                                var akt_data = ctx.data;
                                if (akt_data != null) {
                                    that.isl.ProjektEDS.update({ data: ctx.data })
                                        .get()
                                        .then(function (response) {
                                        that.view_ISL.updateData(response.data, "update");
                                    })
                                        .fail(function () {
                                    });
                                }
                            });
                            //    var l_oDiv = that.dialogs.showModalWindow("Gordic.Ada.WebClient.GAdminPolozkyEDSDetail",
                            //        {
                            //            id: 'DetailEDS#',
                            //            Uroven: that.Uroven,
                            //            modelEDS: new_data2, 
                            //            RezimNova: novaakce
                            //        }, that.Uroven == "PIG" ? "Detail programu " : "Detail projektu", 550, 450, true);    // zobrazení modálního Tabu
                            //    $(l_oDiv).on('close', function (ev, ctx) {
                            //        var akt_data = ctx.data!;
                            //        if (akt_data != null) {
                            //            that.isl.ProjektEDS.update({ data: ctx.data! })
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
                        novy_zaznam.xpf_pf_prg = that.HodnotaNad;
                        novy_zaznam.aktivita = 100;
                        novy_zaznam.uroven = that.Uroven;
                        var l_detailwindow = that.navigate("Gordic.Ada.WebClient.GAdminPolozkyEDSDetail", {
                            id: 'DetailEDS#',
                            Uroven: that.Uroven,
                            modelEDS: novy_zaznam,
                            RezimNova: novaakce
                        });
                        var windowContent = $.content(l_detailwindow);
                        windowContent.element.on('contentclosed', (ev, ctx) => {
                            //debugger;
                            var akt_data = ctx.data;
                            if (akt_data != null) {
                                that.isl.ProjektEDS.create({ data: ctx.data })
                                    .get()
                                    .then(function (response) {
                                    that.view_ISL.updateData(response.data, "update");
                                })
                                    .fail(function () {
                                });
                            }
                        });
                        //var l_oDiv = that.dialogs.showModalWindow("Gordic.Ada.WebClient.GAdminPolozkyEDSDetail",
                        //    {
                        //        id: 'DetailEDS#',
                        //        Uroven: that.Uroven,
                        //        modelEDS: novy_zaznam,
                        //        RezimNova: novaakce
                        //    }, that.Uroven == "PIG" ? "Nový program" : "Nový projekt", 550, 450, true);    // zobrazení modálního Tabu
                        //$(l_oDiv).on('close', function (ev, ctx) {
                        //    var akt_data = ctx.data!;
                        //    if (akt_data != null) {
                        //        that.isl.ProjektEDS.create({ data: ctx.data! })
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
            GAdminPolozkyEDS = __decorate([
                gcontent
            ], GAdminPolozkyEDS);
            WebClient.GAdminPolozkyEDS = GAdminPolozkyEDS;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FkbWluUG9sb3preUVEUy5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HQWRtaW5Qb2xvemt5RURTLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztFQU9FOzs7Ozs7O0FBRUYsSUFBVSxNQUFNLENBeVZmO0FBelZELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXlWbkI7SUF6VmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXlWN0I7UUF6Vm9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWlCLFNBQVEsT0FBQSxZQUFZO2dCQUFsRDs7b0JBRUksVUFBSyxHQUFHLHFCQUFxQixDQUFDLENBQUMsbUVBQW1FO29CQUNsRyxXQUFNLEdBQUcsY0FBYyxDQUFDLENBQUMsK0JBQStCO29CQUVoRCxZQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO2dCQStVckQsQ0FBQztnQkFyVUcsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzlCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBRTVCLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQzt3QkFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLG1FQUFtRTt3QkFDL0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLCtCQUErQjtvQkFDcEUsQ0FBQztvQkFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksS0FBSyxFQUFFLENBQUM7d0JBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxtRUFBbUU7d0JBQy9ILElBQUksQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLENBQUMsQ0FBQywrQkFBK0I7b0JBQ3BFLENBQUM7b0JBRUQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUViLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRWxJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixNQUFNLEVBQUU7NEJBQ0osT0FBTyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsU0FBUzs0QkFDdkMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXVCOzRCQUM3QyxHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7NEJBQ3pDLENBQUM7eUJBQ0o7d0JBQ0QsU0FBUyxFQUFFOzRCQUNQLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVE7NEJBQ25FLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVc7NEJBQ3JFLE9BQU8sRUFBRSxJQUFJOzRCQUNiLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsS0FBSyxDQUFDLENBQUM7NEJBQ3pFLENBQUM7eUJBQ0o7d0JBQ0QsU0FBUyxFQUFFOzRCQUNQLE9BQU8sRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFVBQVU7NEJBQ3RDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUF1Qjs0QkFDN0MsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs0QkFDaEMsQ0FBQzt5QkFDSjtxQkFFSixDQUFDLENBQUM7b0JBRUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLFlBQVksRUFBRTs0QkFDVixPQUFPLEVBQUUsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFjOzRCQUN2RCxLQUFLLEVBQUUsVUFBVTs0QkFDakIsUUFBUSxFQUFFLElBQUk7NEJBQ2QsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FFTixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUN0Qix1Q0FBdUMsRUFDdkM7b0NBQ0ksRUFBRSxFQUFFLFlBQVk7b0NBQ2hCLE1BQU0sRUFBRSxLQUFLO29DQUNiLFVBQVUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU07aUNBQzlCLENBQUMsQ0FBQztnQ0FDUCxPQUFPOzRCQUNYLENBQUM7eUJBQ0o7cUJBQ0osQ0FBQyxDQUFDO29CQUVILG9CQUFvQjtvQkFDcEIsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO3dCQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckcsQ0FBQzt5QkFBTSxDQUFDO3dCQUVKLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbEYsQ0FBQztvQkFFRCw2QkFBNkI7b0JBQzdCLHVCQUF1QjtvQkFDdkIsK0JBQStCO29CQUMvQixpQ0FBaUM7b0JBQ2pDLDhCQUE4QjtvQkFDOUIsT0FBTztvQkFDUCxLQUFLO29CQUVMLElBQUksS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7eUJBQ25DLGFBQWEsQ0FBQzt3QkFDWCxJQUFJLEVBQUUsVUFBVTt3QkFDaEIsS0FBSyxFQUFFLFVBQVU7d0JBQ2pCLE9BQU8sRUFBRSxNQUFNO3dCQUNmLGFBQWE7d0JBQ2IsWUFBWSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLElBQUk7d0JBQzNELFlBQVksRUFBRSxVQUFVLElBQUk7NEJBQ3hCLFFBQVEsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dDQUNwQixLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsZ0RBQWdELEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQztnQ0FDckksS0FBSyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLDhDQUE4QyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7Z0NBQzdILEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxxQ0FBcUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDO2dDQUNoSSxPQUFPLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQzs0QkFDekIsQ0FBQzt3QkFDTCxDQUFDO3FCQUNKLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxRQUFRO3dCQUNkLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWM7d0JBQzNGLEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxPQUFPO3dCQUNiLE9BQU8sRUFBRSxPQUFPO3dCQUNoQixLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGVBQWUsQ0FBQzt3QkFDYixJQUFJLEVBQUUsUUFBUTt3QkFDZCxPQUFPLEVBQUUsYUFBYTt3QkFDdEIsS0FBSyxFQUFFLEVBQUU7cUJBQ1osQ0FBQzt5QkFDRCxlQUFlLENBQUM7d0JBQ2IsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsT0FBTyxFQUFFLGFBQWE7d0JBQ3RCLEtBQUssRUFBRSxFQUFFO3FCQUNaLENBQUMsQ0FBQztvQkFFUCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksS0FBSyxFQUFFLENBQUM7d0JBQ3ZCLEtBQUssQ0FBQyxhQUFhLENBQUM7NEJBQ2hCLElBQUksRUFBRSxTQUFTOzRCQUNmLE9BQU8sRUFBRSxTQUFTOzRCQUNsQixLQUFLLEVBQUUsR0FBRzt5QkFDYixDQUFDOzZCQUNELGFBQWEsQ0FBQzs0QkFDWCxJQUFJLEVBQUUsVUFBVTs0QkFDaEIsS0FBSyxFQUFFLFVBQVU7NEJBQ2pCLE9BQU8sRUFBRSxLQUFLOzRCQUNkLGFBQWE7NEJBQ2IsWUFBWSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLElBQUk7NEJBQzNELFlBQVksRUFBRSxVQUFVLElBQUk7Z0NBQ3hCLFFBQVEsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO29DQUNwQixLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsOENBQThDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztvQ0FDckgsT0FBTyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUM7Z0NBQ3pCLENBQUM7NEJBQ0wsQ0FBQzt5QkFDSixDQUFDLENBQUM7b0JBQ1AsQ0FBQztvQkFBQSxDQUFDO29CQUVGLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQzt3QkFDcEIsSUFBSSxFQUFFLFdBQVc7d0JBQ2pCLE9BQU8sRUFBRSxhQUFhO3dCQUN0QixXQUFXLEVBQUUsU0FBUzt3QkFDdEIsS0FBSyxFQUFFLEdBQUc7cUJBQ2IsQ0FBQzt5QkFDRyxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLGdCQUFnQjt3QkFDdEIsT0FBTyxFQUFFLGVBQWU7d0JBQ3hCLEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUMsQ0FBQztvQkFFUCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO3dCQUN2Qix3QkFBd0I7eUJBQ3ZCLFFBQVEsQ0FBQyxRQUFRLENBQUM7eUJBQ2xCLFFBQVEsRUFBRTt5QkFDVixLQUFLLENBQUM7d0JBQ0gsVUFBVSxFQUFFLE1BQU07d0JBRWxCLFlBQVksQ0FBQyxFQUFFLEVBQUUsR0FBRzs0QkFDaEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDOzRCQUN6QyxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7NEJBQ3hCLENBQUM7d0JBQ0wsQ0FBQzt3QkFFRCxhQUFhLEVBQUUsSUFBSSxPQUFPLENBQUM7NEJBQ3ZCLElBQUksRUFBRSxvQkFBb0I7NEJBQzFCLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRztnQ0FDUCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUkscUNBQXFDO2dDQUN0RSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDOzRCQUMxQyxDQUFDO3lCQUNKLENBQUM7d0JBRUYsYUFBYSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUU7d0JBQ2pELE9BQU8sRUFBRSxLQUFLO3FCQUNqQixDQUFDLENBQUM7b0JBRVAsSUFBSSxTQUFTLEdBQTJDLEVBQUUsQ0FBQztvQkFDM0QsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQzt3QkFDdkUsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNsRCxDQUFDO29CQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUV0RixVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRy9DLENBQUM7Z0JBRUQsYUFBYTtvQkFDVCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUM7eUJBQ3pILEVBQUUsQ0FBQyxLQUFLLEVBQUU7d0JBQ1AsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzs2QkFDdkMsT0FBTyxFQUFFOzZCQUNULElBQUksQ0FBQyxVQUFVLFNBQVM7NEJBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztpQ0FDMUMsR0FBRyxFQUFFO2lDQUNMLElBQUksQ0FBQyxVQUFVLFFBQVE7Z0NBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7NEJBQ3RELENBQUMsQ0FBQztpQ0FDRCxJQUFJLENBQUM7NEJBQ04sQ0FBQyxDQUFDLENBQUM7d0JBQ1gsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsQ0FBQyxDQUFDLENBQUE7Z0JBQ1YsQ0FBQztnQkFHRCxZQUFZLENBQUMsUUFBUSxFQUFFLFFBQVE7b0JBQzNCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxRQUFRLElBQUksS0FBSyxFQUFFLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7NkJBQ3ZDLE9BQU8sRUFBRTs2QkFDVCxJQUFJLENBQUMsVUFBVSxTQUFTOzRCQUVyQixJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUM5Qiw2Q0FBNkMsRUFDN0M7Z0NBQ0ksRUFBRSxFQUFFLFlBQVk7Z0NBQ2hCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQ0FDbkIsUUFBUSxFQUFFLFNBQVM7Z0NBQ25CLFNBQVMsRUFBRSxRQUFROzZCQUN0QixDQUFDLENBQUM7NEJBRVAsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQzs0QkFFOUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO2dDQUNsRCxXQUFXO2dDQUNYLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFLLENBQUM7Z0NBQ3pCLElBQUksUUFBUSxJQUFJLElBQUksRUFBRSxDQUFDO29DQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUssRUFBRSxDQUFDO3lDQUMxQyxHQUFHLEVBQUU7eUNBQ0wsSUFBSSxDQUFDLFVBQVUsUUFBUTt3Q0FDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztvQ0FDdEQsQ0FBQyxDQUFDO3lDQUNELElBQUksQ0FBQztvQ0FDTixDQUFDLENBQUMsQ0FBQztnQ0FDWCxDQUFDOzRCQUNMLENBQUMsQ0FBQyxDQUFDOzRCQUdQLDhGQUE4Rjs0QkFDOUYsV0FBVzs0QkFDWCwrQkFBK0I7NEJBQy9CLGtDQUFrQzs0QkFDbEMsbUNBQW1DOzRCQUNuQyxpQ0FBaUM7NEJBQ2pDLDJIQUEySDs0QkFHM0gsZ0RBQWdEOzRCQUNoRCxtQ0FBbUM7NEJBQ25DLGlDQUFpQzs0QkFDakMsNkRBQTZEOzRCQUM3RCx3QkFBd0I7NEJBQ3hCLDZDQUE2Qzs0QkFDN0Msd0VBQXdFOzRCQUN4RSxvQkFBb0I7NEJBQ3BCLHFDQUFxQzs0QkFDckMscUJBQXFCOzRCQUNyQixXQUFXOzRCQUNYLFNBQVM7d0JBQ1QsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsQ0FBQzt5QkFDSSxDQUFDO3dCQUNGLElBQUksV0FBVyxHQUFxQyxFQUFFLENBQUM7d0JBRXZELFdBQVcsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQzt3QkFDekMsV0FBVyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7d0JBQzNCLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQzt3QkFFakMsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FDOUIsNkNBQTZDLEVBQzdDOzRCQUNJLEVBQUUsRUFBRSxZQUFZOzRCQUNoQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07NEJBQ25CLFFBQVEsRUFBRSxXQUFXOzRCQUNyQixTQUFTLEVBQUUsUUFBUTt5QkFDdEIsQ0FBQyxDQUFDO3dCQUVQLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7d0JBRTlDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFDbEQsV0FBVzs0QkFDWCxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsSUFBSyxDQUFDOzRCQUN6QixJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUUsQ0FBQztnQ0FDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFLLEVBQUUsQ0FBQztxQ0FDMUMsR0FBRyxFQUFFO3FDQUNMLElBQUksQ0FBQyxVQUFVLFFBQVE7b0NBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0NBQ3RELENBQUMsQ0FBQztxQ0FDRCxJQUFJLENBQUM7Z0NBQ04sQ0FBQyxDQUFDLENBQUM7NEJBQ1gsQ0FBQzt3QkFDTCxDQUFDLENBQUMsQ0FBQzt3QkFHSCwwRkFBMEY7d0JBQzFGLE9BQU87d0JBQ1AsMkJBQTJCO3dCQUMzQiw4QkFBOEI7d0JBQzlCLGdDQUFnQzt3QkFDaEMsNkJBQTZCO3dCQUM3QixnSEFBZ0g7d0JBRWhILDRDQUE0Qzt3QkFDNUMsK0JBQStCO3dCQUMvQiw2QkFBNkI7d0JBQzdCLHlEQUF5RDt3QkFDekQsb0JBQW9CO3dCQUNwQix5Q0FBeUM7d0JBQ3pDLG9FQUFvRTt3QkFDcEUsZ0JBQWdCO3dCQUNoQixpQ0FBaUM7d0JBQ2pDLGlCQUFpQjt3QkFDakIsT0FBTzt3QkFDUCxLQUFLO29CQUVULENBQUM7Z0JBRUwsQ0FBQzthQUVKLENBQUE7WUFwVlksZ0JBQWdCO2dCQUQ1QixRQUFRO2VBQ0ksZ0JBQWdCLENBb1Y1QjtZQXBWWSwwQkFBZ0IsbUJBb1Y1QixDQUFBO1FBQ0wsQ0FBQyxFQXpWb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBeVY3QjtJQUFELENBQUMsRUF6VmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXlWbkI7QUFBRCxDQUFDLEVBelZTLE1BQU0sS0FBTixNQUFNLFFBeVZmIiwic291cmNlc0NvbnRlbnQiOlsiLyohLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5vcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkFkYS5XZWJDbGllbnQuR0FkbWluUG9sb3preUVEUy5qcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEdBa2NlVWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSmnFmcOtIElsZcSNZWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAxNiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE2LTAzLTAzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbiovXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkFkYS5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHQWRtaW5Qb2xvemt5RURTIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgdGl0bGUgPSBcIlNlem5hbSBwcm9ncmFtxa8gRURTXCI7IC8vYWJ5IHNlIGRhbG8gcMWZaXN0b3VwaXQgeiBicmVhZGNydW1icywgamUgbmFzdGF2ZW5vIHpkZSBtw61zdG8gdiBDI1xyXG4gICAgICAgIHRhc2tJZCA9IFwiYWN0U2V6bmFtRURTXCI7IC8vIG96bmHEjWVuw60gcG9sb8W+a3kgdiB0YXNrTGlzdHVcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnbG9iYWxzID0gR29yZGljLkFkYS5HbG9iYWxzLkdBZGFHbG9iYWxzO1xyXG5cclxuICAgICAgICBwcml2YXRlIG1vZGVsdWN0OiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU3J2c3hwZkR0b1tdO1xyXG4gICAgICAgIHByaXZhdGUgZGF0YXVjdDogR29yZGljLkFkYS5JbnRlcmZhY2UuR1NydnN4cGZEdG9bXTtcclxuICAgICAgICBwcml2YXRlIHJvdzogR29yZGljLkFkYS5JbnRlcmZhY2UuR1NydnN4cGZEdG87XHJcbiAgICAgICAgcHJpdmF0ZSBIb2Rub3RhTmFkOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBVcm92ZW46IHN0cmluZztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3X0lTTDogR29yZGljLklzbC5WaWV3PEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTcnZzeHBmRHRvPjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciAkdGFiID0gJCh0aGlzLmNvbnRlbnREaXYpO1xyXG4gICAgICAgICAgICB2YXIgZGF0YXVjdCA9IHRoaXMubW9kZWx1Y3Q7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5Vcm92ZW4gPT0gXCJQSUdcIikge1xyXG4gICAgICAgICAgICAgICAgdGhhdC50aXRsZSA9IFwiU2V6bmFtIGhvZG5vdCBcIiArIHRoYXQuZ2xvYmFscy5OYXpldl9wcmdfZWRzOyAvL2FieSBzZSBkYWxvIHDFmWlzdG91cGl0IHogYnJlYWRjcnVtYnMsIGplIG5hc3RhdmVubyB6ZGUgbcOtc3RvIHYgQyNcclxuICAgICAgICAgICAgICAgIHRoYXQudGFza0lkID0gXCJhY3RTZXpuYW1FRFNQUkdcIjsgLy8gb3puYcSNZW7DrSBwb2xvxb5reSB2IHRhc2tMaXN0dVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGF0LlVyb3ZlbiA9PSBcIlBJSlwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRpdGxlID0gXCJTZXpuYW0gaG9kbm90IFwiICsgdGhhdC5nbG9iYWxzLk5hemV2X3Byal9lZHM7IC8vYWJ5IHNlIGRhbG8gcMWZaXN0b3VwaXQgeiBicmVhZGNydW1icywgamUgbmFzdGF2ZW5vIHpkZSBtw61zdG8gdiBDI1xyXG4gICAgICAgICAgICAgICAgdGhhdC50YXNrSWQgPSBcImFjdFNlem5hbUVEU1BJSlwiOyAvLyBvem5hxI1lbsOtIHBvbG/Fvmt5IHYgdGFza0xpc3R1XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICR0YWIuZW1wdHkoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBtYWluRm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwic2V0dXBcIiwgeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMTVMtMC0xMi0wXCIgfSkuZ2Zvcm1zZWN0aW9uKFwiY3JlYXRlXCIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdE5ldzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTm92w70gesOhem5hbVwiLCBpY29uOiBcImdpLXBsdXNcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGF0Lmdsb2JhbHMuUGFyYW1fQWRtaW5pc3RyYWNlX0VEUyEsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRldGFpbF9yYWRrdSh0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0RGV0YWlsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhhdC5nbG9iYWxzLlBhcmFtX0FkbWluaXN0cmFjZV9FRFMgPyBcIlVwcmF2aXRcIiA6IFwiRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogdGhhdC5nbG9iYWxzLlBhcmFtX0FkbWluaXN0cmFjZV9FRFMgPyBcImdpLXBlbmNpbFwiIDogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kZXRhaWxfcmFka3UodGhhdC5nbG9iYWxzLlBhcmFtX0FkbWluaXN0cmFjZV9FRFMsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0RGVsZXRlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPZHN0cmFuaXRcIiwgaWNvbjogXCJmYS10cmFzaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoYXQuZ2xvYmFscy5QYXJhbV9BZG1pbmlzdHJhY2VfRURTISxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuc21hemFuaV9yYWRrdSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RTZXpuYW1Qb2Q6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlNlem5hbSBob2Rub3QgXCIgKyB0aGF0Lmdsb2JhbHMuTmF6ZXZfcHJqX2VkcyEsXHJcbiAgICAgICAgICAgICAgICAgICAgYWxpZ246IFwib3Bwb3NpdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBsdXNcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsX29EaXYgPSB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWRtaW5Qb2xvemt5RURTXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdEZXRhaWxFRFMjJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVcm92ZW46IFwiUElKXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSG9kbm90YU5hZDogdGhhdC5yb3cueHBmX3BmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gbWVudUJhcnVcclxuICAgICAgICAgICAgaWYgKHRoYXQuVXJvdmVuID09IFwiUElHXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdE5ldypcIiwgXCJhY3REZXRhaWwqXCIsIFwiYWN0RGVsZXRlKlwiXSwgW1wiYWN0U2V6bmFtUG9kKlwiXSkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdE5ldypcIiwgXCJhY3REZXRhaWwqXCIsIFwiYWN0RGVsZXRlKlwiXSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3ZhciBhY3RFZGl0ID0gbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAvLyAgICBuYW1lOiBcImRibGNsaWNrXCIsXHJcbiAgICAgICAgICAgIC8vICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIEdEbGcuYWxlcnQoXCJEdm9qa2xpa1wiKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vIGN0eC5jZWxsSW5mby5kYXRhXHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBnZkVEUyA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgIC5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFrdGl2aXRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwiYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlN0YXZcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyB3aWR0aDogMjUsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0UHJlc2V0OiBHb3JkaWMuR2xvYmFsLkVudW1zLkdyaWRDb2x1bW5Gb3JtYXRJY29uLmljb24sXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGRhdGEuYWt0aXZpdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTAwOiByZXR1cm4geyBpY29uOiBcImZhLWNoZWNrLWNpcmNsZS1vIGctc3RhdGUtc3VjY2VzcyBnLXN0YXRlLXRleHRcIiwgdGV4dDogXCJBa3Rpdm7DrVwiLCBjYXB0aW9uOiBcIkFrdGl2bsOtXCIsIHRvb2x0aXA6IFwiQWt0aXZuw61cIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzMDA6IHJldHVybiB7IGljb246IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtd2FybmluZyBnLXN0YXRlLXRleHRcIiwgdGV4dDogXCJOw6F2cmhcIiwgY2FwdGlvbjogXCJOw6F2cmhcIiwgdG9vbHRpcDogXCJOw6F2cmhcIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1MDA6IHJldHVybiB7IGljb246IFwiZmEtdHJhc2ggZy1zdGF0ZS1lcnJvciBnLXN0YXRlLXRleHRcIiwgdGV4dDogXCJOZWFrdGl2bsOtXCIsIGNhcHRpb246IFwiTmVha3Rpdm7DrVwiLCB0b29sdGlwOiBcIk5lYWt0aXZuw61cIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwieHBmX3BmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogKHRoYXQuVXJvdmVuID09IFwiUElHXCIpID8gdGhhdC5nbG9iYWxzLk5hemV2X3ByZ19lZHMhIDogdGhhdC5nbG9iYWxzLk5hemV2X3Byal9lZHMhLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTsOhemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDQwMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rX29kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQbGF0bm9zdCBvZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rX2RvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQbGF0bm9zdCBkb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5Vcm92ZW4gPT0gXCJQSUpcIikge1xyXG4gICAgICAgICAgICAgICAgZ2ZFRFMuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrb2RfdWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJLw7NkIFVDVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcml6X2Vkc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBcInByaXpfZWRzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJFRFNcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyB3aWR0aDogMjUsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0UHJlc2V0OiBHb3JkaWMuR2xvYmFsLkVudW1zLkdyaWRDb2x1bW5Gb3JtYXRJY29uLmljb24sXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGRhdGEucHJpel9lZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS13YXJuaW5nIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBcIkFub1wiLCBjYXB0aW9uOiBcIkFub1wiLCB0b29sdGlwOiBcIkFub1wiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgZ2ZFRFMuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfem1lbmFcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGF0dW0gem3Em255XCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6bWVudV9wcm92X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWm3Em251IHByb3ZlZGxcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciAkbWFpblRhYmxlID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAvLy5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8obWFpbkZvcm0pXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbEFjdGl2YXRlKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yb3cgPSAkbWFpblRhYmxlLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5yb3cgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkUm93U2VsZWN0ZWRBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucm93ID0gY3R4LmNlbGxJbmZvLmRhdGE7ICAgIC8vZGF0YSwgemUga3RlcnljaCBieWwgdnl0dm9yZW4gcmFkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRldGFpbF9yYWRrdSh0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogW1wiKnhwZl9wZlwiLCBcIipuYXpldlwiLCBcIiprb2RfdWN0XCIgXSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBnZkVEU1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZmlsdGVyRHRvOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU3J2c3hwZkZpbHRlckR0byA9IHt9O1xyXG4gICAgICAgICAgICBmaWx0ZXJEdG8udXJvdmVuID0gdGhhdC5Vcm92ZW4udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgaWYgKCh0aGF0LkhvZG5vdGFOYWQgIT0gdW5kZWZpbmVkKSAmJiAodGhhdC5Ib2Rub3RhTmFkLnRvU3RyaW5nKCkgIT0gXCJcIikpIHtcclxuICAgICAgICAgICAgICAgIGZpbHRlckR0by54cGZfcGYgPSB0aGF0LkhvZG5vdGFOYWQudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhhdC52aWV3X0lTTCA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhpcy5pc2wuUHJvamVrdEVEUy5saXN0KHsgZmlsdGVyczogZmlsdGVyRHRvIH0pKTtcclxuXHJcbiAgICAgICAgICAgICRtYWluVGFibGUuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlld19JU0wpO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzbWF6YW5pX3JhZGt1KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcIkRvdGF6XCIsIFwiT3ByYXZkdSBvZHN0cmFuaXQgesOhem5hbT9cIiwgR29yZGljLkFkYS5XZWJDbGllbnQuQWRhQ29uc3QubWJiWWVzTm9OZWdhdGl2LCBHRGxnLm1iaVF1ZXN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Qcm9qZWt0RURTLnJlYWQoeyBkYXRhOiB0aGF0LnJvdyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChuZXdfZGF0YTIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlByb2pla3RFRFMuZGVsZXRlKHsgZGF0YTogbmV3X2RhdGEyIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YShyZXNwb25zZS5kYXRhLCBcImRlbGV0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGRldGFpbF9yYWRrdShlZGl0YWJsZSwgbm92YWFrY2UpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAobm92YWFrY2UgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLlByb2pla3RFRFMucmVhZCh7IGRhdGE6IHRoYXQucm93IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChuZXdfZGF0YTIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsX2RldGFpbHdpbmRvdyA9IHRoYXQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkdvcmRpYy5BZGEuV2ViQ2xpZW50LkdBZG1pblBvbG96a3lFRFNEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJ0RldGFpbEVEUyMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVyb3ZlbjogdGhhdC5Vcm92ZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxFRFM6IG5ld19kYXRhMiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmV6aW1Ob3ZhOiBub3ZhYWtjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2luZG93Q29udGVudCA9ICQuY29udGVudChsX2RldGFpbHdpbmRvdyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dDb250ZW50LmVsZW1lbnQub24oJ2NvbnRlbnRjbG9zZWQnLCAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBha3RfZGF0YSA9IGN0eC5kYXRhITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChha3RfZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUHJvamVrdEVEUy51cGRhdGUoeyBkYXRhOiBjdHguZGF0YSEgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHJlc3BvbnNlLmRhdGEsIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHZhciBsX29EaXYgPSB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkFkYS5XZWJDbGllbnQuR0FkbWluUG9sb3preUVEU0RldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBpZDogJ0RldGFpbEVEUyMnLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgVXJvdmVuOiB0aGF0LlVyb3ZlbixcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIG1vZGVsRURTOiBuZXdfZGF0YTIsIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgUmV6aW1Ob3ZhOiBub3ZhYWtjZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9LCB0aGF0LlVyb3ZlbiA9PSBcIlBJR1wiID8gXCJEZXRhaWwgcHJvZ3JhbXUgXCIgOiBcIkRldGFpbCBwcm9qZWt0dVwiLCA1NTAsIDQ1MCwgdHJ1ZSk7ICAgIC8vIHpvYnJhemVuw60gbW9kw6FsbsOtaG8gVGFidVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgJChsX29EaXYpLm9uKCdjbG9zZScsIGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHZhciBha3RfZGF0YSA9IGN0eC5kYXRhITtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKGFrdF9kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuaXNsLlByb2pla3RFRFMudXBkYXRlKHsgZGF0YTogY3R4LmRhdGEhIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YShyZXNwb25zZS5kYXRhLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vdnlfemF6bmFtOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU3J2c3hwZkR0byA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIG5vdnlfemF6bmFtLnhwZl9wZl9wcmcgPSB0aGF0LkhvZG5vdGFOYWQ7XHJcbiAgICAgICAgICAgICAgICBub3Z5X3phem5hbS5ha3Rpdml0YSA9IDEwMDtcclxuICAgICAgICAgICAgICAgIG5vdnlfemF6bmFtLnVyb3ZlbiA9IHRoYXQuVXJvdmVuO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBsX2RldGFpbHdpbmRvdyA9IHRoYXQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWRtaW5Qb2xvemt5RURTRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ0RldGFpbEVEUyMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBVcm92ZW46IHRoYXQuVXJvdmVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbEVEUzogbm92eV96YXpuYW0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlemltTm92YTogbm92YWFrY2VcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgd2luZG93Q29udGVudCA9ICQuY29udGVudChsX2RldGFpbHdpbmRvdyk7XHJcblxyXG4gICAgICAgICAgICAgICAgd2luZG93Q29udGVudC5lbGVtZW50Lm9uKCdjb250ZW50Y2xvc2VkJywgKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBha3RfZGF0YSA9IGN0eC5kYXRhITtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWt0X2RhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Qcm9qZWt0RURTLmNyZWF0ZSh7IGRhdGE6IGN0eC5kYXRhISB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnVwZGF0ZURhdGEocmVzcG9uc2UuZGF0YSwgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vdmFyIGxfb0RpdiA9IHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWRtaW5Qb2xvemt5RURTRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgaWQ6ICdEZXRhaWxFRFMjJyxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBVcm92ZW46IHRoYXQuVXJvdmVuLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIG1vZGVsRURTOiBub3Z5X3phem5hbSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBSZXppbU5vdmE6IG5vdmFha2NlXHJcbiAgICAgICAgICAgICAgICAvLyAgICB9LCB0aGF0LlVyb3ZlbiA9PSBcIlBJR1wiID8gXCJOb3bDvSBwcm9ncmFtXCIgOiBcIk5vdsO9IHByb2pla3RcIiwgNTUwLCA0NTAsIHRydWUpOyAgICAvLyB6b2JyYXplbsOtIG1vZMOhbG7DrWhvIFRhYnVcclxuXHJcbiAgICAgICAgICAgICAgICAvLyQobF9vRGl2KS5vbignY2xvc2UnLCBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgdmFyIGFrdF9kYXRhID0gY3R4LmRhdGEhO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgaWYgKGFrdF9kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LmlzbC5Qcm9qZWt0RURTLmNyZWF0ZSh7IGRhdGE6IGN0eC5kYXRhISB9KVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnVwZGF0ZURhdGEocmVzcG9uc2UuZGF0YSwgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=
"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAdminPolozkyRZD.js                                                        </Name>
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
            let GAdminPolozkyRZD = class GAdminPolozkyRZD extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Seznam typu zdrojů"; //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#
                    this.taskId = "actSeznamTZD"; // označení položky v taskListu
                    this.globals = Gordic.Ada.Globals.GAdaGlobals;
                }
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    var datauct = this.modeluct;
                    $tab.empty();
                    var that = this;
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    this.actions.addRange({
                        actNew: {
                            caption: "Nový záznam", icon: "gi-plus",
                            enabled: that.globals.Param_Administrace_TZD,
                            run: () => {
                                return that.detail_radku(true, true);
                            }
                        },
                        actDetail: {
                            caption: that.globals.Param_Administrace_TZD ? "Upravit" : "Detail",
                            icon: that.globals.Param_Administrace_TZD ? "gi-pencil" : "gi-detail",
                            primary: true,
                            run: () => {
                                return that.detail_radku(that.globals.Param_Administrace_TZD, false);
                            }
                        },
                        actDelete: {
                            caption: "Odstranit", icon: "fa-trash",
                            enabled: that.globals.Param_Administrace_TZD,
                            run: () => {
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
                        searchColumns: ["*id_tzd", "*nazev", "*zkratka", "*poznamka"],
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
                            name: "id_tzd",
                            caption: "Typ zdroje",
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
                            width: 150,
                        })
                            .addTextColumn({
                            name: "zmenu_prov_txt",
                            caption: "Změnu provedl",
                            width: 300
                        })
                    });
                    that.view_ISL = new Gordic.Isl.View(this.isl.TypZdroje.list({ filters: {} }));
                    $mainTable.ggrid("setData", that.view_ISL);
                }
                smazani_radku() {
                    var that = this;
                    that.dialogs.messageBox("Dotaz", "Opravdu odstranit záznam?", Gordic.Ada.WebClient.AdaConst.mbbYesNoNegativ, GDlg.mbiQuestion)
                        .on("yes", function () {
                        that.isl.TypZdroje.read({ data: that.row })
                            .getData()
                            .done(function (new_data2) {
                            that.isl.TypZdroje.delete({ data: new_data2 })
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
                        that.isl.TypZdroje.read({ data: that.row })
                            .getData()
                            .done(function (new_data2) {
                            var l_detailwindow = that.navigate("Gordic.Ada.WebClient.GAdminPolozkyRZDDetail", {
                                id: 'DetailTZD#',
                                RezimNova: novaakce,
                                modelTZD: new_data2
                            });
                            var windowContent = $.content(l_detailwindow);
                            windowContent.element.on('contentclosed', (ev, ctx) => {
                                //debugger;
                                var akt_data = ctx.data;
                                if (akt_data != null) {
                                    that.isl.TypZdroje.update({ data: ctx.data })
                                        .get()
                                        .then(function (response) {
                                        that.view_ISL.updateData(response.data, "update");
                                    })
                                        .fail(function () {
                                    });
                                }
                            });
                            //var l_oDiv = that.dialogs.showModalWindow("Gordic.Ada.WebClient.GAdminPolozkyRZDDetail",
                            //    {
                            //        id: 'DetailTZD#',
                            //        RezimNova: novaakce,
                            //        modelTZD: new_data2
                            //    },                            
                            //    "Detail typu zdroje", 550, 450, true);    // zobrazení modálního Tabu
                            //$(l_oDiv).on('close', function (ev, ctx) {
                            //    var akt_data = ctx.data!;
                            //    if (akt_data != null) {
                            //        that.isl.TypZdroje.update({ data: ctx.data! })
                            //            .get()
                            //            .then(function (response) {
                            //                that.view_ISL.updateData(response.data, "update");
                            //            })
                            //            .fail(function () {
                            //            });
                            //    }
                            //});
                        });
                    }
                    else {
                        var novy_zaznam = {};
                        novy_zaznam.id_tzd = "";
                        novy_zaznam.aktivita = 100;
                        var l_detailwindow = that.navigate("Gordic.Ada.WebClient.GAdminPolozkyRZDDetail", {
                            id: 'DetailTZD#',
                            RezimNova: novaakce,
                            modelTZD: novy_zaznam
                        });
                        var windowContent = $.content(l_detailwindow);
                        windowContent.element.on('contentclosed', (ev, ctx) => {
                            //debugger;
                            var akt_data = ctx.data;
                            if (akt_data != null) {
                                that.isl.TypZdroje.create({ data: ctx.data })
                                    .get()
                                    .then(function (response) {
                                    that.view_ISL.updateData(response.data, "update");
                                })
                                    .fail(function () {
                                });
                            }
                        });
                        //var l_oDiv = that.dialogs.showModalWindow("Gordic.Ada.WebClient.GAdminPolozkyRZDDetail",
                        //    {
                        //        id: 'DetailTZD#',
                        //        RezimNova: novaakce,
                        //        modelTZD: novy_zaznam
                        //    },
                        //    "Nový typ zdroje", 550, 450, true);    // zobrazení modálního Tabu
                        //$(l_oDiv).on('close', function (ev, ctx) {
                        //    var akt_data = ctx.data!;
                        //    if (akt_data != null) {
                        //        that.isl.TypZdroje.create({ data: ctx.data! })
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
            GAdminPolozkyRZD = __decorate([
                gcontent
            ], GAdminPolozkyRZD);
            WebClient.GAdminPolozkyRZD = GAdminPolozkyRZD;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FkbWluUG9sb3preVJaRC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HQWRtaW5Qb2xvemt5UlpELnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztFQU9FOzs7Ozs7O0FBRUYsSUFBVSxNQUFNLENBbVJmO0FBblJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQW1SbkI7SUFuUmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQW1SN0I7UUFuUm9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWlCLFNBQVEsT0FBQSxZQUFZO2dCQUFsRDs7b0JBRUksVUFBSyxHQUFHLG9CQUFvQixDQUFDLENBQUMsbUVBQW1FO29CQUNqRyxXQUFNLEdBQUcsY0FBYyxDQUFDLENBQUMsK0JBQStCO29CQUVoRCxZQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO2dCQXlRckQsQ0FBQztnQkFqUUcsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzlCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBRzVCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFFYixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUVsSSxJQUFJLENBQUMs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RSxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUssRUFBRSxDQUFDO3FDQUN6QyxHQUFHLEVBQUU7cUNBQ0wsSUFBSSxDQUFDLFVBQVUsUUFBUTtvQ0FDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztnQ0FDdEQsQ0FBQyxDQUFDO3FDQUNELElBQUksQ0FBQztnQ0FDTixDQUFDLENBQUMsQ0FBQzs0QkFDWCxDQUFDO3dCQUNMLENBQUMsQ0FBQyxDQUFDO3dCQUVILDBGQUEwRjt3QkFDMUYsT0FBTzt3QkFDUCwyQkFBMkI7d0JBQzNCLDhCQUE4Qjt3QkFDOUIsK0JBQStCO3dCQUMvQixRQUFRO3dCQUNSLHdFQUF3RTt3QkFFeEUsNENBQTRDO3dCQUM1QywrQkFBK0I7d0JBQy9CLDZCQUE2Qjt3QkFDN0Isd0RBQXdEO3dCQUN4RCxvQkFBb0I7d0JBQ3BCLHlDQUF5Qzt3QkFDekMsb0VBQW9FO3dCQUNwRSxnQkFBZ0I7d0JBQ2hCLGlDQUFpQzt3QkFDakMsaUJBQWlCO3dCQUNqQixPQUFPO3dCQUNQLEtBQUs7b0JBRVQsQ0FBQztnQkFFTCxDQUFDO2FBRUosQ0FBQTtZQTlRWSxnQkFBZ0I7Z0JBRDVCLFFBQVE7ZUFDSSxnQkFBZ0IsQ0E4UTVCO1lBOVFZLDBCQUFnQixtQkE4UTVCLENBQUE7UUFDTCxDQUFDLEVBblJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFtUjdCO0lBQUQsQ0FBQyxFQW5SZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBbVJuQjtBQUFELENBQUMsRUFuUlMsTUFBTSxLQUFOLE1BQU0sUUFtUmYiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkFkYS5XZWJDbGllbnQuR0FkbWluUG9sb3preVJaRC5qcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEdBa2NlVWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSmnFmcOtIElsZcSNZWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAxNiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE2LTAzLTAzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbiovXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkFkYS5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHQWRtaW5Qb2xvemt5UlpEIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgdGl0bGUgPSBcIlNlem5hbSB0eXB1IHpkcm9qxa9cIjsgLy9hYnkgc2UgZGFsbyBwxZlpc3RvdXBpdCB6IGJyZWFkY3J1bWJzLCBqZSBuYXN0YXZlbm8gemRlIG3DrXN0byB2IEMjXHJcbiAgICAgICAgdGFza0lkID0gXCJhY3RTZXpuYW1UWkRcIjsgLy8gb3puYcSNZW7DrSBwb2xvxb5reSB2IHRhc2tMaXN0dVxyXG5cclxuICAgICAgICBwcml2YXRlIGdsb2JhbHMgPSBHb3JkaWMuQWRhLkdsb2JhbHMuR0FkYUdsb2JhbHM7XHJcblxyXG4gICAgICAgIHByaXZhdGUgbW9kZWx1Y3Q6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTcnZzdHpkRHRvW107XHJcbiAgICAgICAgcHJpdmF0ZSBkYXRhdWN0OiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU3J2c3R6ZER0b1tdO1xyXG4gICAgICAgIHByaXZhdGUgcm93OiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU3J2c3R6ZER0bztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3X0lTTDogR29yZGljLklzbC5WaWV3PEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTcnZzdHpkRHRvPjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciAkdGFiID0gJCh0aGlzLmNvbnRlbnREaXYpO1xyXG4gICAgICAgICAgICB2YXIgZGF0YXVjdCA9IHRoaXMubW9kZWx1Y3Q7XHJcblxyXG5cclxuICAgICAgICAgICAgJHRhYi5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJzZXR1cFwiLCB7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0wLTEyLTBcIiB9KS5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0TmV3OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOb3bDvSB6w6F6bmFtXCIsIGljb246IFwiZ2ktcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoYXQuZ2xvYmFscy5QYXJhbV9BZG1pbmlzdHJhY2VfVFpEISxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGV0YWlsX3JhZGt1KHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3REZXRhaWw6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGF0Lmdsb2JhbHMuUGFyYW1fQWRtaW5pc3RyYWNlX1RaRCA/IFwiVXByYXZpdFwiIDogXCJEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiB0aGF0Lmdsb2JhbHMuUGFyYW1fQWRtaW5pc3RyYWNlX1RaRCA/IFwiZ2ktcGVuY2lsXCIgOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRldGFpbF9yYWRrdSh0aGF0Lmdsb2JhbHMuUGFyYW1fQWRtaW5pc3RyYWNlX1RaRCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3REZWxldGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9kc3RyYW5pdFwiLCBpY29uOiBcImZhLXRyYXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhhdC5nbG9iYWxzLlBhcmFtX0FkbWluaXN0cmFjZV9UWkQhLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5zbWF6YW5pX3JhZGt1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIG1lbnVCYXJ1XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdE5ldypcIiwgXCJhY3REZXRhaWwqXCIsIFwiYWN0RGVsZXRlKlwiXSkpO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgYWN0RWRpdCA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJkYmxjbGlja1wiLFxyXG4gICAgICAgICAgICAvLyAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBHRGxnLmFsZXJ0KFwiRHZvamtsaWtcIik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLyBjdHguY2VsbEluZm8uZGF0YVxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyICRtYWluVGFibGUgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC8vLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhtYWluRm9ybSlcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjZWxsQWN0aXZhdGUoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJvdyA9ICRtYWluVGFibGUuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnJvdyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW4oZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yb3cgPSBjdHguY2VsbEluZm8uZGF0YTsgICAgLy9kYXRhLCB6ZSBrdGVyeWNoIGJ5bCB2eXR2b3JlbiByYWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGV0YWlsX3JhZGt1KHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCIqaWRfdHpkXCIsIFwiKm5hemV2XCIsIFwiKnprcmF0a2FcIiwgXCIqcG96bmFta2FcIiBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwiYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3RhdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2lkdGg6IDI1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0UHJlc2V0OiBHb3JkaWMuR2xvYmFsLkVudW1zLkdyaWRDb2x1bW5Gb3JtYXRJY29uLmljb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkYXRhLmFrdGl2aXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTAwOiByZXR1cm4geyBpY29uOiBcImZhLWNoZWNrLWNpcmNsZS1vIGctc3RhdGUtc3VjY2VzcyBnLXN0YXRlLXRleHRcIiwgdGV4dDogXCJBa3Rpdm7DrVwiLCBjYXB0aW9uOiBcIkFrdGl2bsOtXCIsIHRvb2x0aXA6IFwiQWt0aXZuw61cIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDMwMDogcmV0dXJuIHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS13YXJuaW5nIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBcIk7DoXZyaFwiLCBjYXB0aW9uOiBcIk7DoXZyaFwiLCB0b29sdGlwOiBcIk7DoXZyaFwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTAwOiByZXR1cm4geyBpY29uOiBcImZhLXRyYXNoIGctc3RhdGUtZXJyb3IgZy1zdGF0ZS10ZXh0XCIsIHRleHQ6IFwiTmVha3Rpdm7DrVwiLCBjYXB0aW9uOiBcIk5lYWt0aXZuw61cIiwgdG9vbHRpcDogXCJOZWFrdGl2bsOtXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImlkX3R6ZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJUeXAgemRyb2plXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTsOhemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiemtyYXRrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJaa3JhdGthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG96bmFta2FcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUG96bsOhbWthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEYXR1bSB6bcSbbnlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6bWVudV9wcm92X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJabcSbbnUgcHJvdmVkbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnZpZXdfSVNMID0gbmV3IEdvcmRpYy5Jc2wuVmlldyh0aGlzLmlzbC5UeXBaZHJvamUubGlzdCh7IGZpbHRlcnM6IHt9IH0pKTtcclxuXHJcbiAgICAgICAgICAgICRtYWluVGFibGUuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlld19JU0wpO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzbWF6YW5pX3JhZGt1KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcIkRvdGF6XCIsIFwiT3ByYXZkdSBvZHN0cmFuaXQgesOhem5hbT9cIiwgR29yZGljLkFkYS5XZWJDbGllbnQuQWRhQ29uc3QubWJiWWVzTm9OZWdhdGl2LCBHRGxnLm1iaVF1ZXN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5UeXBaZHJvamUucmVhZCh7IGRhdGE6IHRoYXQucm93IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKG5ld19kYXRhMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuVHlwWmRyb2plLmRlbGV0ZSh7IGRhdGE6IG5ld19kYXRhMiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnVwZGF0ZURhdGEocmVzcG9uc2UuZGF0YSwgXCJkZWxldGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBkZXRhaWxfcmFka3UoZWRpdGFibGUsIG5vdmFha2NlKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKG5vdmFha2NlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmlzbC5UeXBaZHJvamUucmVhZCh7IGRhdGE6IHRoYXQucm93IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChuZXdfZGF0YTIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsX2RldGFpbHdpbmRvdyA9IHRoYXQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkdvcmRpYy5BZGEuV2ViQ2xpZW50LkdBZG1pblBvbG96a3lSWkREZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJ0RldGFpbFRaRCMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlemltTm92YTogbm92YWFrY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxUWkQ6IG5ld19kYXRhMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2luZG93Q29udGVudCA9ICQuY29udGVudChsX2RldGFpbHdpbmRvdyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dDb250ZW50LmVsZW1lbnQub24oJ2NvbnRlbnRjbG9zZWQnLCAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBha3RfZGF0YSA9IGN0eC5kYXRhITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChha3RfZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuVHlwWmRyb2plLnVwZGF0ZSh7IGRhdGE6IGN0eC5kYXRhISB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnVwZGF0ZURhdGEocmVzcG9uc2UuZGF0YSwgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgbF9vRGl2ID0gdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5BZGEuV2ViQ2xpZW50LkdBZG1pblBvbG96a3lSWkREZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWQ6ICdEZXRhaWxUWkQjJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIFJlemltTm92YTogbm92YWFrY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBtb2RlbFRaRDogbmV3X2RhdGEyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH0sICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBcIkRldGFpbCB0eXB1IHpkcm9qZVwiLCA1NTAsIDQ1MCwgdHJ1ZSk7ICAgIC8vIHpvYnJhemVuw60gbW9kw6FsbsOtaG8gVGFidVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8kKGxfb0Rpdikub24oJ2Nsb3NlJywgZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFyIGFrdF9kYXRhID0gY3R4LmRhdGEhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAoYWt0X2RhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5pc2wuVHlwWmRyb2plLnVwZGF0ZSh7IGRhdGE6IGN0eC5kYXRhISB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnVwZGF0ZURhdGEocmVzcG9uc2UuZGF0YSwgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBub3Z5X3phem5hbTogR29yZGljLkFkYS5JbnRlcmZhY2UuR1NydnN0emREdG8gPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICBub3Z5X3phem5hbS5pZF90emQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgbm92eV96YXpuYW0uYWt0aXZpdGEgPSAxMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGxfZGV0YWlsd2luZG93ID0gdGhhdC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICAgICBcIkdvcmRpYy5BZGEuV2ViQ2xpZW50LkdBZG1pblBvbG96a3lSWkREZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnRGV0YWlsVFpEIycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlemltTm92YTogbm92YWFrY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsVFpEOiBub3Z5X3phem5hbVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB2YXIgd2luZG93Q29udGVudCA9ICQuY29udGVudChsX2RldGFpbHdpbmRvdyk7XHJcblxyXG4gICAgICAgICAgICAgICAgd2luZG93Q29udGVudC5lbGVtZW50Lm9uKCdjb250ZW50Y2xvc2VkJywgKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBha3RfZGF0YSA9IGN0eC5kYXRhITtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWt0X2RhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5UeXBaZHJvamUuY3JlYXRlKHsgZGF0YTogY3R4LmRhdGEhIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YShyZXNwb25zZS5kYXRhLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3ZhciBsX29EaXYgPSB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkFkYS5XZWJDbGllbnQuR0FkbWluUG9sb3preVJaRERldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGlkOiAnRGV0YWlsVFpEIycsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgUmV6aW1Ob3ZhOiBub3ZhYWtjZSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBtb2RlbFRaRDogbm92eV96YXpuYW1cclxuICAgICAgICAgICAgICAgIC8vICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICBcIk5vdsO9IHR5cCB6ZHJvamVcIiwgNTUwLCA0NTAsIHRydWUpOyAgICAvLyB6b2JyYXplbsOtIG1vZMOhbG7DrWhvIFRhYnVcclxuXHJcbiAgICAgICAgICAgICAgICAvLyQobF9vRGl2KS5vbignY2xvc2UnLCBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgdmFyIGFrdF9kYXRhID0gY3R4LmRhdGEhO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgaWYgKGFrdF9kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LmlzbC5UeXBaZHJvamUuY3JlYXRlKHsgZGF0YTogY3R4LmRhdGEhIH0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YShyZXNwb25zZS5kYXRhLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==
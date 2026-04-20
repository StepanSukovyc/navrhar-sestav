"use strict";
/*!//  <FileHeader xmlns="http://www.ordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAdminSrvcskp.js                                                        </Name>
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
            let GAdminSrvcskp = class GAdminSrvcskp extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Seznam skupin"; //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#
                    this.taskId = "actSeznamSrvcskp"; // označení položky v taskListu
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
                            enabled: that.globals.Param_Administrace_SKP,
                            run: () => {
                                return that.detail_radku(true, true);
                            }
                        },
                        actDetail: {
                            caption: that.globals.Param_Administrace_SKP ? "Upravit" : "Detail",
                            icon: that.globals.Param_Administrace_SKP ? "gi-pencil" : "gi-detail",
                            primary: true,
                            run: () => {
                                return that.detail_radku(that.globals.Param_Administrace_SKP, false);
                            }
                        },
                        actDelete: {
                            caption: "Odstranit", icon: "fa-trash",
                            enabled: that.globals.Param_Administrace_SKP,
                            run: () => {
                                return that.smazani_radku();
                            }
                        },
                    });
                    this.actions.addRange({
                        actSeznamPod: {
                            caption: "Seznam podskupin",
                            align: "opposite",
                            favorite: true,
                            icon: "gi-plus",
                            run: () => {
                                var l_oDiv = that.navigate("Gordic.Ada.WebClient.GAdminSrvcpsk", {
                                    id: 'SeznamPSK#',
                                    HodnotaNad: that.row.skp_akce
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
                        .addTextColumn({
                        name: "skp_akce",
                        caption: "Skupina",
                        width: 130
                    })
                        .addTextColumn({
                        name: "skp_akce_txt",
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
                            }
                        },
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run(ev, ctx) {
                                that.row = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek
                                return that.detail_radku(true, false);
                            }
                        }),
                        searchColumns: ["*skp_akce", "*skp_akce_txt"],
                        columns: gfEDS
                    });
                    that.view_ISL = new Gordic.Isl.View(this.isl.SkupinaADA.list({ filters: {} }));
                    $mainTable.ggrid("setData", that.view_ISL);
                }
                smazani_radku() {
                    var that = this;
                    that.dialogs.messageBox("Dotaz", "Opravdu odstranit záznam?", Gordic.Ada.WebClient.AdaConst.mbbYesNoNegativ, GDlg.mbiQuestion)
                        .on("yes", function () {
                        that.isl.SkupinaADA.read({ data: that.row })
                            .getData()
                            .done(function (new_data2) {
                            that.isl.SkupinaADA.delete({ data: new_data2 })
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
                        that.isl.SkupinaADA.read({ data: that.row })
                            .getData()
                            .done(function (new_data2) {
                            var l_detailwindow = that.navigate("Gordic.Ada.WebClient.GAdminSrvcskpDetail", {
                                id: 'DetailSKP#',
                                modelSKP: new_data2,
                                RezimNova: novaakce
                            });
                            var windowContent = $.content(l_detailwindow);
                            windowContent.element.on('contentclosed', (ev, ctx) => {
                                //debugger;
                                var akt_data = ctx.data;
                                if (akt_data != null) {
                                    that.isl.SkupinaADA.update({ data: ctx.data })
                                        .get()
                                        .then(function (response) {
                                        that.view_ISL.updateData(response.data, "update");
                                    })
                                        .fail(function () {
                                    });
                                }
                            });
                            //    var l_oDiv = that.dialogs.showModalWindow("Gordic.Ada.WebClient.GAdminSrvcskpDetail",
                            //        {
                            //            id: 'DetailSKP#',
                            //            modelSKP: new_data2, 
                            //            RezimNova: novaakce
                            //        },
                            //        "Detail skupiny", 600, 250, true);    // zobrazení modálního Tabu
                            //    $(l_oDiv).on('close', function (ev, ctx) {
                            //        var akt_data = ctx.data!;
                            //        if (akt_data != null) {
                            //            that.isl.SkupinaADA.update({ data: ctx.data! })
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
                        var l_detailwindow = that.navigate("Gordic.Ada.WebClient.GAdminSrvcskpDetail", {
                            id: 'DetailSKP#',
                            modelSKP: novy_zaznam,
                            RezimNova: novaakce
                        });
                        var windowContent = $.content(l_detailwindow);
                        windowContent.element.on('contentclosed', (ev, ctx) => {
                            //debugger;
                            var akt_data = ctx.data;
                            if (akt_data != null) {
                                that.isl.SkupinaADA.create({ data: ctx.data })
                                    .get()
                                    .then(function (response) {
                                    that.view_ISL.updateData(response.data, "update");
                                })
                                    .fail(function () {
                                });
                            }
                        });
                        //var l_oDiv = that.dialogs.showModalWindow("Gordic.Ada.WebClient.GAdminSrvcskpDetail",
                        //    {
                        //        id: 'DetailSKP#',
                        //        modelSKP: novy_zaznam,
                        //        RezimNova: novaakce
                        //    },
                        //    "Nová skupina", 600, 250, true);    // zobrazení modálního Tabu
                        //$(l_oDiv).on('close', function (ev, ctx) {
                        //    var akt_data = ctx.data!;
                        //    if (akt_data != null) {
                        //        that.isl.SkupinaADA.create({ data: ctx.data! })
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
            GAdminSrvcskp = __decorate([
                gcontent
            ], GAdminSrvcskp);
            WebClient.GAdminSrvcskp = GAdminSrvcskp;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FkbWluU3J2Y3NrcC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HQWRtaW5TcnZjc2twLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztFQU9FOzs7Ozs7O0FBRUYsSUFBVSxNQUFNLENBZ1FmO0FBaFFELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWdRbkI7SUFoUWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWdRN0I7UUFoUW9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxPQUFBLFlBQVk7Z0JBQS9DOztvQkFFSSxVQUFLLEdBQUcsZUFBZSxDQUFDLENBQUMsbUVBQW1FO29CQUM1RixXQUFNLEdBQUcsa0JBQWtCLENBQUMsQ0FBQywrQkFBK0I7b0JBRXBELFlBQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7Z0JBc1ByRCxDQUFDO2dCQTVPRyxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFFNUIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUViLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRWxJLElBQUksQ0FBQyxPQUFPLENBQUMs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IHhtbG5zPVwiaHR0cDovL3d3dy5vcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkFkYS5XZWJDbGllbnQuR0FkbWluU3J2Y3NrcC5qcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEdBa2NlVWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSmnFmcOtIElsZcSNZWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAxNiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE2LTAzLTAzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbiovXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkFkYS5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHQWRtaW5TcnZjc2twIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgdGl0bGUgPSBcIlNlem5hbSBza3VwaW5cIjsgLy9hYnkgc2UgZGFsbyBwxZlpc3RvdXBpdCB6IGJyZWFkY3J1bWJzLCBqZSBuYXN0YXZlbm8gemRlIG3DrXN0byB2IEMjXHJcbiAgICAgICAgdGFza0lkID0gXCJhY3RTZXpuYW1TcnZjc2twXCI7IC8vIG96bmHEjWVuw60gcG9sb8W+a3kgdiB0YXNrTGlzdHVcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnbG9iYWxzID0gR29yZGljLkFkYS5HbG9iYWxzLkdBZGFHbG9iYWxzO1xyXG5cclxuICAgICAgICBwcml2YXRlIG1vZGVsdWN0OiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU3J2Y3NrcER0b1tdO1xyXG4gICAgICAgIHByaXZhdGUgZGF0YXVjdDogR29yZGljLkFkYS5JbnRlcmZhY2UuR1NydmNza3BEdG9bXTtcclxuICAgICAgICBwcml2YXRlIHJvdzogR29yZGljLkFkYS5JbnRlcmZhY2UuR1NydmNza3BEdG87XHJcbiAgICAgICAgcHJpdmF0ZSBIb2Rub3RhTmFkOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBVcm92ZW46IHN0cmluZztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3X0lTTDogR29yZGljLklzbC5WaWV3PEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTcnZjc2twRHRvPjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciAkdGFiID0gJCh0aGlzLmNvbnRlbnREaXYpO1xyXG4gICAgICAgICAgICB2YXIgZGF0YXVjdCA9IHRoaXMubW9kZWx1Y3Q7XHJcblxyXG4gICAgICAgICAgICAkdGFiLmVtcHR5KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWFpbkZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcInNldHVwXCIsIHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTAtMTItMFwiIH0pLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3ROZXc6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk5vdsO9IHrDoXpuYW1cIiwgaWNvbjogXCJnaS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhhdC5nbG9iYWxzLlBhcmFtX0FkbWluaXN0cmFjZV9TS1AhLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kZXRhaWxfcmFka3UodHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdERldGFpbDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoYXQuZ2xvYmFscy5QYXJhbV9BZG1pbmlzdHJhY2VfU0tQID8gXCJVcHJhdml0XCIgOiBcIkRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IHRoYXQuZ2xvYmFscy5QYXJhbV9BZG1pbmlzdHJhY2VfU0tQID8gXCJnaS1wZW5jaWxcIiA6IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGV0YWlsX3JhZGt1KHRoYXQuZ2xvYmFscy5QYXJhbV9BZG1pbmlzdHJhY2VfU0tQLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdERlbGV0ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2RzdHJhbml0XCIsIGljb246IFwiZmEtdHJhc2hcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGF0Lmdsb2JhbHMuUGFyYW1fQWRtaW5pc3RyYWNlX1NLUCEsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnNtYXphbmlfcmFka3UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0U2V6bmFtUG9kOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTZXpuYW0gcG9kc2t1cGluXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWxpZ246IFwib3Bwb3NpdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBsdXNcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsX29EaXYgPSB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWRtaW5TcnZjcHNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdTZXpuYW1QU0sjJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIb2Rub3RhTmFkOiB0aGF0LnJvdy5za3BfYWtjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIG1lbnVCYXJ1XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdE5ldypcIiwgXCJhY3REZXRhaWwqXCIsIFwiYWN0RGVsZXRlKlwiXSwgW1wiYWN0U2V6bmFtUG9kKlwiXSkpO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgYWN0RWRpdCA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJkYmxjbGlja1wiLFxyXG4gICAgICAgICAgICAvLyAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBHRGxnLmFsZXJ0KFwiRHZvamtsaWtcIik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLyBjdHguY2VsbEluZm8uZGF0YVxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZ2ZFRFMgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJza3BfYWtjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU2t1cGluYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJza3BfYWtjZV90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk7DoXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0MDBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyICRtYWluVGFibGUgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC8vLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhtYWluRm9ybSlcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjZWxsQWN0aXZhdGUoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJvdyA9ICRtYWluVGFibGUuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnJvdyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW4oZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yb3cgPSBjdHguY2VsbEluZm8uZGF0YTsgICAgLy9kYXRhLCB6ZSBrdGVyeWNoIGJ5bCB2eXR2b3JlbiByYWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGV0YWlsX3JhZGt1KHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCIqc2twX2FrY2VcIiwgXCIqc2twX2FrY2VfdHh0XCIgXSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBnZkVEU1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnZpZXdfSVNMID0gbmV3IEdvcmRpYy5Jc2wuVmlldyh0aGlzLmlzbC5Ta3VwaW5hQURBLmxpc3QoeyBmaWx0ZXJzOiB7fX0pKTtcclxuXHJcbiAgICAgICAgICAgICRtYWluVGFibGUuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlld19JU0wpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNtYXphbmlfcmFka3UoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwiRG90YXpcIiwgXCJPcHJhdmR1IG9kc3RyYW5pdCB6w6F6bmFtP1wiLCBHb3JkaWMuQWRhLldlYkNsaWVudC5BZGFDb25zdC5tYmJZZXNOb05lZ2F0aXYsIEdEbGcubWJpUXVlc3Rpb24pXHJcbiAgICAgICAgICAgICAgICAub24oXCJ5ZXNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlNrdXBpbmFBREEucmVhZCh7IGRhdGE6IHRoYXQucm93IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKG5ld19kYXRhMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuU2t1cGluYUFEQS5kZWxldGUoeyBkYXRhOiBuZXdfZGF0YTIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHJlc3BvbnNlLmRhdGEsIFwiZGVsZXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgZGV0YWlsX3JhZGt1KGVkaXRhYmxlLCBub3ZhYWtjZSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChub3ZhYWtjZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuU2t1cGluYUFEQS5yZWFkKHsgZGF0YTogdGhhdC5yb3cgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKG5ld19kYXRhMikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxfZGV0YWlsd2luZG93ID0gdGhhdC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiR29yZGljLkFkYS5XZWJDbGllbnQuR0FkbWluU3J2Y3NrcERldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnRGV0YWlsU0tQIycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxTS1A6IG5ld19kYXRhMiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmV6aW1Ob3ZhOiBub3ZhYWtjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2luZG93Q29udGVudCA9ICQuY29udGVudChsX2RldGFpbHdpbmRvdyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dDb250ZW50LmVsZW1lbnQub24oJ2NvbnRlbnRjbG9zZWQnLCAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBha3RfZGF0YSA9IGN0eC5kYXRhITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChha3RfZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuU2t1cGluYUFEQS51cGRhdGUoeyBkYXRhOiBjdHguZGF0YSEgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHJlc3BvbnNlLmRhdGEsIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFyIGxfb0RpdiA9IHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWRtaW5TcnZjc2twRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGlkOiAnRGV0YWlsU0tQIycsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBtb2RlbFNLUDogbmV3X2RhdGEyLCBcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIFJlemltTm92YTogbm92YWFrY2VcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgXCJEZXRhaWwgc2t1cGlueVwiLCA2MDAsIDI1MCwgdHJ1ZSk7ICAgIC8vIHpvYnJhemVuw60gbW9kw6FsbsOtaG8gVGFidVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAkKGxfb0Rpdikub24oJ2Nsb3NlJywgZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdmFyIGFrdF9kYXRhID0gY3R4LmRhdGEhO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAoYWt0X2RhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5pc2wuU2t1cGluYUFEQS51cGRhdGUoeyBkYXRhOiBjdHguZGF0YSEgfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHJlc3BvbnNlLmRhdGEsIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm92eV96YXpuYW06IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTcnZjc2twRHRvID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGxfZGV0YWlsd2luZG93ID0gdGhhdC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICAgICBcIkdvcmRpYy5BZGEuV2ViQ2xpZW50LkdBZG1pblNydmNza3BEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnRGV0YWlsU0tQIycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsU0tQOiBub3Z5X3phem5hbSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmV6aW1Ob3ZhOiBub3ZhYWtjZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3aW5kb3dDb250ZW50ID0gJC5jb250ZW50KGxfZGV0YWlsd2luZG93KTtcclxuXHJcbiAgICAgICAgICAgICAgICB3aW5kb3dDb250ZW50LmVsZW1lbnQub24oJ2NvbnRlbnRjbG9zZWQnLCAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFrdF9kYXRhID0gY3R4LmRhdGEhO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChha3RfZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlNrdXBpbmFBREEuY3JlYXRlKHsgZGF0YTogY3R4LmRhdGEhIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YShyZXNwb25zZS5kYXRhLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3ZhciBsX29EaXYgPSB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkFkYS5XZWJDbGllbnQuR0FkbWluU3J2Y3NrcERldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGlkOiAnRGV0YWlsU0tQIycsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgbW9kZWxTS1A6IG5vdnlfemF6bmFtLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIFJlemltTm92YTogbm92YWFrY2VcclxuICAgICAgICAgICAgICAgIC8vICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICBcIk5vdsOhIHNrdXBpbmFcIiwgNjAwLCAyNTAsIHRydWUpOyAgICAvLyB6b2JyYXplbsOtIG1vZMOhbG7DrWhvIFRhYnVcclxuXHJcbiAgICAgICAgICAgICAgICAvLyQobF9vRGl2KS5vbignY2xvc2UnLCBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgdmFyIGFrdF9kYXRhID0gY3R4LmRhdGEhO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgaWYgKGFrdF9kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LmlzbC5Ta3VwaW5hQURBLmNyZWF0ZSh7IGRhdGE6IGN0eC5kYXRhISB9KVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnVwZGF0ZURhdGEocmVzcG9uc2UuZGF0YSwgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=
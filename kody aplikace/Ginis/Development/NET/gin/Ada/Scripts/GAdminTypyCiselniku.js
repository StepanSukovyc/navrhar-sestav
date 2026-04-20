"use strict";
/*!//  <FileHeader xmlns="http://www.ordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAdminTypyCiselniku.js                                                        </Name>
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
            let GAdminTypyCiselniku = class GAdminTypyCiselniku extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Seznam hodnot Typ číselníku"; //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#
                    this.taskId = "actSeznamTypCis"; // označení položky v taskListu
                    this.globals = Gordic.Ada.Globals.GAdaGlobals;
                }
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    var datauct = this.modeluct;
                    that.title = "Seznam hodnot Typ číselníku";
                    that.taskId = "actSeznamTypCis"; // označení položky v taskListu
                    $tab.empty();
                    var that = this;
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
                            caption: "Seznam hodnot",
                            align: "opposite",
                            visible: false,
                            favorite: true,
                            icon: "gi-plus",
                            run: () => {
                                var l_oDiv = that.navigate("Gordic.Ada.WebClient.GAdminSrvsskp", {
                                    id: 'DetailSKP2#',
                                    Konfigurace: that.row,
                                    Ixs_Csp: that.row.ixs_csp
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
                        name: "ixs_csp",
                        caption: "Typ číselníku",
                        hidden: true,
                        width: 130
                    })
                        .addTextColumn({
                        name: "nazev",
                        caption: "Název",
                        width: 250
                    })
                        .addTextColumn({
                        name: "zkratka",
                        caption: "Zkratka",
                        width: 100
                    })
                        .addTextColumn({
                        name: "poznamka",
                        caption: "Poznámka",
                        width: 150
                    })
                        .addTextColumn({
                        name: "nazev_skp",
                        caption: "Název 1. úroveň",
                        width: 150
                    })
                        .addTextColumn({
                        name: "zkratka_skp",
                        caption: "Zkratka 1. úroveň",
                        width: 100
                    })
                        .addNumberColumn({
                        name: "delka_skp",
                        caption: "Délka 1. úroveň",
                        width: 50
                    })
                        .addTextColumn({
                        name: "nazev_psk",
                        caption: "Název 2. úroveň",
                        width: 150
                    })
                        .addTextColumn({
                        name: "zkratka_psk",
                        caption: "Zkratka 2. úroveň",
                        width: 100
                    })
                        .addNumberColumn({
                        name: "delka_psk",
                        caption: "Délka 2. úroveň",
                        width: 50
                    });
                    //.addDateTimeColumn({
                    //    name: "dat_zmena",
                    //    caption: "Datum změny",
                    //    customClass: "dt-left",
                    //    width: 150,
                    //})
                    //.addTextColumn({               //sloupce pridane pred cfu
                    //    name: "zmenu_prov_txt",
                    //    caption: "Poslední změnu provedl",
                    //    width: 300
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
                                if ((that.row.nazev_skp != "") && (that.row.delka_skp != 0)) {
                                    that.actions.actSeznamPod.update({ caption: "Seznam hodnot " + that.row.nazev_skp, visible: true });
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
                        searchColumns: ["*nazev", "*zkratka", "*poznamka"],
                        columns: gfEDS
                    });
                    that.view_ISL = new Gordic.Isl.View(this.isl.TypCiselniku.list({ filters: {} }));
                    $mainTable.ggrid("setData", that.view_ISL);
                }
                smazani_radku() {
                    var that = this;
                    that.dialogs.messageBox("Dotaz", "Opravdu odstranit záznam?", Gordic.Ada.WebClient.AdaConst.mbbYesNoNegativ, GDlg.mbiQuestion)
                        .on("yes", function () {
                        that.isl.TypCiselniku.read({ data: that.row })
                            .getData()
                            .done(function (new_data2) {
                            that.isl.TypCiselniku.delete({ data: new_data2 })
                                .get()
                                .then(function (response) {
                                that.view_ISL.updateData(response.data, "update");
                            })
                                .fail(function () {
                            });
                        });
                    });
                }
                detail_radku(editable, novaakce) {
                    var that = this;
                    if (novaakce == false) {
                        that.isl.TypCiselniku.read({ data: that.row })
                            .getData()
                            .done(function (new_data2) {
                            var l_detailwindow = that.navigate("Gordic.Ada.WebClient.GAdminTypyCiselnikuDetail", {
                                id: 'DetailTypCis#',
                                modelTypCis: new_data2,
                                RezimNova: novaakce
                            });
                            var windowContent = $.content(l_detailwindow);
                            windowContent.element.on('contentclosed', (ev, ctx) => {
                                //debugger;
                                var akt_data = ctx.data;
                                if (akt_data != null) {
                                    that.isl.TypCiselniku.update({ data: ctx.data })
                                        .get()
                                        .then(function (response) {
                                        that.view_ISL.updateData(response.data, "update");
                                    })
                                        .fail(function () {
                                    });
                                }
                            });
                            //    var l_oDiv = that.dialogs.showModalWindow("Gordic.Ada.WebClient.GAdminTypyCiselnikuDetail",
                            //        {
                            //            id: 'DetailTypCis#',
                            //            modelTypCis: new_data2,
                            //            RezimNova: novaakce
                            //        }, "Typ číselníku", 550, 600, true);    // zobrazení modálního Tabu
                            //    $(l_oDiv).on('close', function (ev, ctx) {
                            //        var akt_data = ctx.data!;
                            //        if (akt_data != null) {
                            //            that.isl.TypCiselniku.update({ data: ctx.data! })
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
                        novy_zaznam.ixs_csp = "";
                        novy_zaznam.aktivita = 100;
                        var l_detailwindow = that.navigate("Gordic.Ada.WebClient.GAdminTypyCiselnikuDetail", {
                            id: 'DetailTypCis#',
                            modelTypCis: novy_zaznam,
                            RezimNova: novaakce
                        });
                        var windowContent = $.content(l_detailwindow);
                        windowContent.element.on('contentclosed', (ev, ctx) => {
                            //debugger;
                            var akt_data = ctx.data;
                            if (akt_data != null) {
                                that.isl.TypCiselniku.create({ data: ctx.data })
                                    .get()
                                    .then(function (response) {
                                    that.view_ISL.updateData(response.data, "update");
                                })
                                    .fail(function () {
                                });
                            }
                        });
                        //var l_oDiv = that.dialogs.showModalWindow("Gordic.Ada.WebClient.GAdminTypyCiselnikuDetail",
                        //    {
                        //        id: 'DetailTypCis#',
                        //        modelTypCis: novy_zaznam,
                        //        RezimNova: novaakce
                        //    }, "Typ číselníku", 550, 600, true);    // zobrazení modálního Tabu
                        //$(l_oDiv).on('close', function (ev, ctx) {
                        //    var akt_data = ctx.data!;
                        //    if (akt_data != null) {
                        //        that.isl.TypCiselniku.create({ data: ctx.data! })
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
            GAdminTypyCiselniku = __decorate([
                gcontent
            ], GAdminTypyCiselniku);
            WebClient.GAdminTypyCiselniku = GAdminTypyCiselniku;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FkbWluVHlweUNpc2VsbmlrdS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HQWRtaW5UeXB5Q2lzZWxuaWt1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztFQU9FOzs7Ozs7O0FBRUYsSUFBVSxNQUFNLENBb1ZmO0FBcFZELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQW9WbkI7SUFwVmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQW9WN0I7UUFwVm9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW9CLFNBQVEsT0FBQSxZQUFZO2dCQUFyRDs7b0JBRUksVUFBSyxHQUFHLDZCQUE2QixDQUFDLENBQUMsbUVBQW1FO29CQUMxRyxXQUFNLEdBQUcsaUJBQWlCLENBQUMsQ0FBQywrQkFBK0I7b0JBRW5ELFlBQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7Z0JBMFVyRCxDQUFDO2dCQWhVRyxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFFNUIsSUFBSSxDQUFDLEtBQUssR0FBRyw2QkFBNkIsQ0FBQztvQkFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLCtCQUErQjtvQkFFaEUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUViLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FB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Z0JBRUwsQ0FBQzthQUVKLENBQUE7WUEvVVksbUJBQW1CO2dCQUQvQixRQUFRO2VBQ0ksbUJBQW1CLENBK1UvQjtZQS9VWSw2QkFBbUIsc0JBK1UvQixDQUFBO1FBQ0wsQ0FBQyxFQXBWb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBb1Y3QjtJQUFELENBQUMsRUFwVmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQW9WbkI7QUFBRCxDQUFDLEVBcFZTLE1BQU0sS0FBTixNQUFNLFFBb1ZmIiwic291cmNlc0NvbnRlbnQiOlsiLyohLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5vcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkFkYS5XZWJDbGllbnQuR0FkbWluVHlweUNpc2VsbmlrdS5qcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEdBa2NlVWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSmnFmcOtIElsZcSNZWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAxNiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE2LTAzLTAzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbiovXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkFkYS5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHQWRtaW5UeXB5Q2lzZWxuaWt1IGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgdGl0bGUgPSBcIlNlem5hbSBob2Rub3QgVHlwIMSNw61zZWxuw61rdVwiOyAvL2FieSBzZSBkYWxvIHDFmWlzdG91cGl0IHogYnJlYWRjcnVtYnMsIGplIG5hc3RhdmVubyB6ZGUgbcOtc3RvIHYgQyNcclxuICAgICAgICB0YXNrSWQgPSBcImFjdFNlem5hbVR5cENpc1wiOyAvLyBvem5hxI1lbsOtIHBvbG/Fvmt5IHYgdGFza0xpc3R1XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2xvYmFscyA9IEdvcmRpYy5BZGEuR2xvYmFscy5HQWRhR2xvYmFscztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb2RlbHVjdDogR29yZGljLkFkYS5JbnRlcmZhY2UuR1NydnNjc3BEdG9bXTtcclxuICAgICAgICBwcml2YXRlIGRhdGF1Y3Q6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTcnZzY3NwRHRvW107XHJcbiAgICAgICAgcHJpdmF0ZSByb3c6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTcnZzY3NwRHRvO1xyXG4gICAgICAgIHByaXZhdGUgSG9kbm90YU5hZDogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgVXJvdmVuOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHByaXZhdGUgdmlld19JU0w6IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuQWRhLkludGVyZmFjZS5HU3J2c2NzcER0bz47XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgJHRhYiA9ICQodGhpcy5jb250ZW50RGl2KTtcclxuICAgICAgICAgICAgdmFyIGRhdGF1Y3QgPSB0aGlzLm1vZGVsdWN0O1xyXG5cclxuICAgICAgICAgICAgdGhhdC50aXRsZSA9IFwiU2V6bmFtIGhvZG5vdCBUeXAgxI3DrXNlbG7DrWt1XCI7XHJcbiAgICAgICAgICAgIHRoYXQudGFza0lkID0gXCJhY3RTZXpuYW1UeXBDaXNcIjsgLy8gb3puYcSNZW7DrSBwb2xvxb5reSB2IHRhc2tMaXN0dVxyXG5cclxuICAgICAgICAgICAgJHRhYi5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJzZXR1cFwiLCB7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0wLTEyLTBcIiB9KS5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0TmV3OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOb3bDvSB6w6F6bmFtXCIsIGljb246IFwiZ2ktcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoYXQuZ2xvYmFscy5QYXJhbV9BZG1pbmlzdHJhY2VfVHlwQ2lzISxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGV0YWlsX3JhZGt1KHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3REZXRhaWw6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGF0Lmdsb2JhbHMuUGFyYW1fQWRtaW5pc3RyYWNlX1R5cENpcyA/IFwiVXByYXZpdFwiIDogXCJEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiB0aGF0Lmdsb2JhbHMuUGFyYW1fQWRtaW5pc3RyYWNlX1R5cENpcyA/IFwiZ2ktcGVuY2lsXCIgOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRldGFpbF9yYWRrdSh0aGF0Lmdsb2JhbHMuUGFyYW1fQWRtaW5pc3RyYWNlX1R5cENpcywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3REZWxldGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9kc3RyYW5pdFwiLCBpY29uOiBcImZhLXRyYXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhhdC5nbG9iYWxzLlBhcmFtX0FkbWluaXN0cmFjZV9UeXBDaXMhLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5zbWF6YW5pX3JhZGt1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFNlem5hbVBvZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU2V6bmFtIGhvZG5vdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsaWduOiBcIm9wcG9zaXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbF9vRGl2ID0gdGhhdC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiR29yZGljLkFkYS5XZWJDbGllbnQuR0FkbWluU3J2c3NrcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnRGV0YWlsU0tQMiMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEtvbmZpZ3VyYWNlOiB0aGF0LnJvdywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhzX0NzcDogdGhhdC5yb3cuaXhzX2NzcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIG1lbnVCYXJ1XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdE5ldypcIiwgXCJhY3REZXRhaWwqXCIsIFwiYWN0RGVsZXRlKlwiXSwgW1wiYWN0U2V6bmFtUG9kKlwiXSkpO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgYWN0RWRpdCA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJkYmxjbGlja1wiLFxyXG4gICAgICAgICAgICAvLyAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBHRGxnLmFsZXJ0KFwiRHZvamtsaWtcIik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLyBjdHguY2VsbEluZm8uZGF0YVxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZ2ZFRFMgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBcImFrdGl2aXRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTdGF2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gd2lkdGg6IDI1LFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdFByZXNldDogR29yZGljLkdsb2JhbC5FbnVtcy5HcmlkQ29sdW1uRm9ybWF0SWNvbi5pY29uLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkYXRhLmFrdGl2aXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEwMDogcmV0dXJuIHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUtbyBnLXN0YXRlLXN1Y2Nlc3MgZy1zdGF0ZS10ZXh0XCIsIHRleHQ6IFwiQWt0aXZuw61cIiwgY2FwdGlvbjogXCJBa3Rpdm7DrVwiLCB0b29sdGlwOiBcIkFrdGl2bsOtXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzAwOiByZXR1cm4geyBpY29uOiBcImZhLWNoZWNrLWNpcmNsZSBnLXN0YXRlLXdhcm5pbmcgZy1zdGF0ZS10ZXh0XCIsIHRleHQ6IFwiTsOhdnJoXCIsIGNhcHRpb246IFwiTsOhdnJoXCIsIHRvb2x0aXA6IFwiTsOhdnJoXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTAwOiByZXR1cm4geyBpY29uOiBcImZhLXRyYXNoIGctc3RhdGUtZXJyb3IgZy1zdGF0ZS10ZXh0XCIsIHRleHQ6IFwiTmVha3Rpdm7DrVwiLCBjYXB0aW9uOiBcIk5lYWt0aXZuw61cIiwgdG9vbHRpcDogXCJOZWFrdGl2bsOtXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19jc3BcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlR5cCDEjcOtc2VsbsOta3VcIixcclxuICAgICAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOw6F6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjUwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiemtyYXRrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmtyYXRrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3puYW1rYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUG96bsOhbWthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldl9za3BcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk7DoXpldiAxLiDDunJvdmXFiFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6a3JhdGthX3NrcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmtyYXRrYSAxLiDDunJvdmXFiFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRlbGthX3NrcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRMOpbGthIDEuIMO6cm92ZcWIXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDUwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2X3Bza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTsOhemV2IDIuIMO6cm92ZcWIXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInprcmF0a2FfcHNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJaa3JhdGthIDIuIMO6cm92ZcWIXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGVsa2FfcHNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEw6lsa2EgMi4gw7pyb3ZlxYhcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vLmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiZGF0X3ptZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcIkRhdHVtIHptxJtueVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY3VzdG9tQ2xhc3M6IFwiZHQtbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcInptZW51X3Byb3ZfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcIlBvc2xlZG7DrSB6bcSbbnUgcHJvdmVkbFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgd2lkdGg6IDMwMFxyXG4gICAgICAgICAgICAgICAgLy99KTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgJG1haW5UYWJsZSA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLy8uY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKG1haW5Gb3JtKVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxBY3RpdmF0ZShldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucm93ID0gJG1haW5UYWJsZS5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQucm93ICE9PSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCh0aGF0LnJvdy5uYXpldl9za3AgIT0gXCJcIikgJiYgKHRoYXQucm93LmRlbGthX3NrcCAhPSAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RTZXpuYW1Qb2QhLnVwZGF0ZSh7IGNhcHRpb246IFwiU2V6bmFtIGhvZG5vdCBcIiArIHRoYXQucm93Lm5hemV2X3NrcCwgdmlzaWJsZTogdHJ1ZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW4oZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yb3cgPSBjdHguY2VsbEluZm8uZGF0YTsgICAgLy9kYXRhLCB6ZSBrdGVyeWNoIGJ5bCB2eXR2b3JlbiByYWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGV0YWlsX3JhZGt1KHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCIqbmF6ZXZcIiwgXCIqemtyYXRrYVwiLCBcIipwb3puYW1rYVwiIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogZ2ZFRFNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC52aWV3X0lTTCA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhpcy5pc2wuVHlwQ2lzZWxuaWt1Lmxpc3QoeyBmaWx0ZXJzOiB7fSB9KSk7XHJcblxyXG4gICAgICAgICAgICAkbWFpblRhYmxlLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXdfSVNMKTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc21hemFuaV9yYWRrdSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJEb3RhelwiLCBcIk9wcmF2ZHUgb2RzdHJhbml0IHrDoXpuYW0/XCIsIEdvcmRpYy5BZGEuV2ViQ2xpZW50LkFkYUNvbnN0Lm1iYlllc05vTmVnYXRpdiwgR0RsZy5tYmlRdWVzdGlvbilcclxuICAgICAgICAgICAgICAgIC5vbihcInllc1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuVHlwQ2lzZWxuaWt1LnJlYWQoeyBkYXRhOiB0aGF0LnJvdyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChuZXdfZGF0YTIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlR5cENpc2VsbmlrdS5kZWxldGUoeyBkYXRhOiBuZXdfZGF0YTIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHJlc3BvbnNlLmRhdGEsIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgZGV0YWlsX3JhZGt1KGVkaXRhYmxlLCBub3ZhYWtjZSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChub3ZhYWtjZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuVHlwQ2lzZWxuaWt1LnJlYWQoeyBkYXRhOiB0aGF0LnJvdyB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAobmV3X2RhdGEyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbF9kZXRhaWx3aW5kb3cgPSB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWRtaW5UeXB5Q2lzZWxuaWt1RGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdEZXRhaWxUeXBDaXMjJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbFR5cENpczogbmV3X2RhdGEyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlemltTm92YTogbm92YWFrY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdpbmRvd0NvbnRlbnQgPSAkLmNvbnRlbnQobF9kZXRhaWx3aW5kb3cpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Q29udGVudC5lbGVtZW50Lm9uKCdjb250ZW50Y2xvc2VkJywgKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWt0X2RhdGEgPSBjdHguZGF0YSE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWt0X2RhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlR5cENpc2VsbmlrdS51cGRhdGUoeyBkYXRhOiBjdHguZGF0YSEgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHJlc3BvbnNlLmRhdGEsIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFyIGxfb0RpdiA9IHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWRtaW5UeXB5Q2lzZWxuaWt1RGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGlkOiAnRGV0YWlsVHlwQ2lzIycsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBtb2RlbFR5cENpczogbmV3X2RhdGEyLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgUmV6aW1Ob3ZhOiBub3ZhYWtjZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9LCBcIlR5cCDEjcOtc2VsbsOta3VcIiwgNTUwLCA2MDAsIHRydWUpOyAgICAvLyB6b2JyYXplbsOtIG1vZMOhbG7DrWhvIFRhYnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICQobF9vRGl2KS5vbignY2xvc2UnLCBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB2YXIgYWt0X2RhdGEgPSBjdHguZGF0YSE7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmIChha3RfZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmlzbC5UeXBDaXNlbG5pa3UudXBkYXRlKHsgZGF0YTogY3R4LmRhdGEhIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YShyZXNwb25zZS5kYXRhLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vdnlfemF6bmFtOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU3J2c2NzcER0byA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIG5vdnlfemF6bmFtLml4c19jc3AgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgbm92eV96YXpuYW0uYWt0aXZpdGEgPSAxMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGxfZGV0YWlsd2luZG93ID0gdGhhdC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICAgICBcIkdvcmRpYy5BZGEuV2ViQ2xpZW50LkdBZG1pblR5cHlDaXNlbG5pa3VEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnRGV0YWlsVHlwQ2lzIycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsVHlwQ2lzOiBub3Z5X3phem5hbSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmV6aW1Ob3ZhOiBub3ZhYWtjZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3aW5kb3dDb250ZW50ID0gJC5jb250ZW50KGxfZGV0YWlsd2luZG93KTtcclxuXHJcbiAgICAgICAgICAgICAgICB3aW5kb3dDb250ZW50LmVsZW1lbnQub24oJ2NvbnRlbnRjbG9zZWQnLCAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFrdF9kYXRhID0gY3R4LmRhdGEhO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChha3RfZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlR5cENpc2VsbmlrdS5jcmVhdGUoeyBkYXRhOiBjdHguZGF0YSEgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHJlc3BvbnNlLmRhdGEsIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvL3ZhciBsX29EaXYgPSB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkFkYS5XZWJDbGllbnQuR0FkbWluVHlweUNpc2VsbmlrdURldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGlkOiAnRGV0YWlsVHlwQ2lzIycsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgbW9kZWxUeXBDaXM6IG5vdnlfemF6bmFtLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIFJlemltTm92YTogbm92YWFrY2VcclxuICAgICAgICAgICAgICAgIC8vICAgIH0sIFwiVHlwIMSNw61zZWxuw61rdVwiLCA1NTAsIDYwMCwgdHJ1ZSk7ICAgIC8vIHpvYnJhemVuw60gbW9kw6FsbsOtaG8gVGFidVxyXG5cclxuICAgICAgICAgICAgICAgIC8vJChsX29EaXYpLm9uKCdjbG9zZScsIGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB2YXIgYWt0X2RhdGEgPSBjdHguZGF0YSE7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBpZiAoYWt0X2RhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuaXNsLlR5cENpc2VsbmlrdS5jcmVhdGUoeyBkYXRhOiBjdHguZGF0YSEgfSlcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHJlc3BvbnNlLmRhdGEsIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuIl19
"use strict";
/*!//  <FileHeader xmlns="http://www.ordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAdminSrvspsk.js                                                        </Name>
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
            let GAdminSrvspsk = class GAdminSrvspsk extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Seznam podskupin"; //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#
                    this.taskId = "actSeznamSrvcskp"; // označení položky v taskListu
                    this.globals = Gordic.Ada.Globals.GAdaGlobals;
                }
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    var datauct = this.modeluct;
                    $tab.empty();
                    var that = this;
                    that.title = "Seznam hodnot " + that.Konfigurace.nazev_psk;
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
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actNew*", "actDetail*", "actDelete*"]));
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
                        name: "psk_akc",
                        caption: that.Konfigurace.nazev_psk,
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
                            }
                        },
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run(ev, ctx) {
                                that.row = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek
                                return that.detail_radku(true, false);
                            }
                        }),
                        searchColumns: ["*skp_akc", "*psk_akc", "*nazev"],
                        columns: gfEDS
                    });
                    var filterDto = {};
                    if ((that.Ixs_Csp != undefined) && (that.Ixs_Csp.toString() != "")) {
                        filterDto.ixs_csp = that.Ixs_Csp.toString();
                    }
                    if ((that.Skp_Akc != undefined) && (that.Skp_Akc.toString() != "")) {
                        filterDto.skp_akc = that.Skp_Akc.toString();
                    }
                    that.view_ISL = new Gordic.Isl.View(this.isl.PodskupinaADADyn.list({ filters: filterDto }));
                    $mainTable.ggrid("setData", that.view_ISL);
                }
                smazani_radku() {
                    var that = this;
                    that.dialogs.messageBox("Dotaz", "Opravdu odstranit záznam?", Gordic.Ada.WebClient.AdaConst.mbbYesNoNegativ, GDlg.mbiQuestion)
                        .on("yes", function () {
                        that.isl.PodskupinaADADyn.read({ data: that.row })
                            .getData()
                            .done(function (new_data2) {
                            that.isl.PodskupinaADADyn.delete({ data: new_data2 })
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
                        that.isl.PodskupinaADADyn.read({ data: that.row })
                            .getData()
                            .done(function (new_data2) {
                            var l_detailwindow = that.navigate("Gordic.Ada.WebClient.GAdminSrvspskDetail", {
                                id: 'DetailPSK#',
                                Konfigurace: that.Konfigurace,
                                modelPSK: new_data2,
                                RezimNova: novaakce
                            });
                            var windowContent = $.content(l_detailwindow);
                            windowContent.element.on('contentclosed', (ev, ctx) => {
                                //debugger;
                                var akt_data = ctx.data;
                                if (akt_data != null) {
                                    that.isl.PodskupinaADADyn.update({ data: ctx.data })
                                        .get()
                                        .then(function (response) {
                                        that.view_ISL.updateData(response.data, "update");
                                    })
                                        .fail(function () {
                                    });
                                }
                            });
                            //    var l_oDiv = that.dialogs.showModalWindow("Gordic.Ada.WebClient.GAdminSrvspskDetail",
                            //        {
                            //            id: 'DetailPSK#',
                            //            Konfigurace: that.Konfigurace,
                            //            modelPSK: new_data2,
                            //            RezimNova: novaakce
                            //        },
                            //        "Detail hodnoty " + that.Konfigurace.nazev_psk!, 600, 650, true);    // zobrazení modálního Tabu
                            //    $(l_oDiv).on('close', function (ev, ctx) {
                            //        var akt_data = ctx.data!;
                            //        if (akt_data != null) {
                            //            that.isl.PodskupinaADADyn.update({ data: ctx.data! })
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
                        novy_zaznam.skp_akc = that.Skp_Akc;
                        novy_zaznam.aktivita = 100;
                        var l_detailwindow = that.navigate("Gordic.Ada.WebClient.GAdminSrvspskDetail", {
                            id: 'DetailPSK#',
                            Konfigurace: that.Konfigurace,
                            modelPSK: novy_zaznam,
                            RezimNova: novaakce
                        });
                        var windowContent = $.content(l_detailwindow);
                        windowContent.element.on('contentclosed', (ev, ctx) => {
                            //debugger;
                            var akt_data = ctx.data;
                            if (akt_data != null) {
                                that.isl.PodskupinaADADyn.create({ data: ctx.data })
                                    .get()
                                    .then(function (response) {
                                    that.view_ISL.updateData(response.data, "update");
                                })
                                    .fail(function () {
                                });
                            }
                        });
                        //    var l_oDiv = that.dialogs.showModalWindow("Gordic.Ada.WebClient.GAdminSrvspskDetail",
                        //        {
                        //            id: 'DetailPSK#',
                        //            Konfigurace: that.Konfigurace,
                        //            modelPSK: novy_zaznam,
                        //            RezimNova: novaakce
                        //        },
                        //        "Nová hodnota " + that.Konfigurace.nazev_psk!, 600, 650, true);    // zobrazení modálního Tabu
                        //    $(l_oDiv).on('close', function (ev, ctx) {
                        //        var akt_data = ctx.data!;
                        //        if (akt_data != null) {
                        //            that.isl.PodskupinaADADyn.create({ data: ctx.data! })
                        //                .get()
                        //                .then(function (response) {
                        //                    that.view_ISL.updateData(response.data, "update");
                        //                })
                        //                .fail(function () {
                        //                });
                        //        }
                        //    });
                    }
                }
            };
            GAdminSrvspsk = __decorate([
                gcontent
            ], GAdminSrvspsk);
            WebClient.GAdminSrvspsk = GAdminSrvspsk;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FkbWluU3J2c3Bzay5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HQWRtaW5TcnZzcHNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztFQU9FOzs7Ozs7O0FBRUYsSUFBVSxNQUFNLENBdVJmO0FBdlJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXVSbkI7SUF2UmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXVSN0I7UUF2Um9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxPQUFBLFlBQVk7Z0JBQS9DOztvQkFFSSxVQUFLLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxtRUFBbUU7b0JBQy9GLFdBQU0sR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLCtCQUErQjtvQkFFcEQsWUFBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztnQkE2UXJELENBQUM7Z0JBbFFHLGNBQWM7b0JBRVYsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM5QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUU1QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBRWIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLENBQUMsS0FBSyxHQUFHLGdCQUFnQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO29CQUUzRCxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsbUJB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LENBQUE7WUFsUlksYUFBYTtnQkFEekIsUUFBUTtlQUNJLGFBQWEsQ0FrUnpCO1lBbFJZLHVCQUFhLGdCQWtSekIsQ0FBQTtRQUNMLENBQUMsRUF2Um9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXVSN0I7SUFBRCxDQUFDLEVBdlJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUF1Um5CO0FBQUQsQ0FBQyxFQXZSUyxNQUFNLEtBQU4sTUFBTSxRQXVSZiIsInNvdXJjZXNDb250ZW50IjpbIi8qIS8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cub3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5BZGEuV2ViQ2xpZW50LkdBZG1pblNydnNwc2suanMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBHQWtjZVVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEppxZnDrSBJbGXEjWVrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMTYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAxNi0wMy0wMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG4qL1xyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5BZGEuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0FkbWluU3J2c3BzayBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHRpdGxlID0gXCJTZXpuYW0gcG9kc2t1cGluXCI7IC8vYWJ5IHNlIGRhbG8gcMWZaXN0b3VwaXQgeiBicmVhZGNydW1icywgamUgbmFzdGF2ZW5vIHpkZSBtw61zdG8gdiBDI1xyXG4gICAgICAgIHRhc2tJZCA9IFwiYWN0U2V6bmFtU3J2Y3NrcFwiOyAvLyBvem5hxI1lbsOtIHBvbG/Fvmt5IHYgdGFza0xpc3R1XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2xvYmFscyA9IEdvcmRpYy5BZGEuR2xvYmFscy5HQWRhR2xvYmFscztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb2RlbHVjdDogR29yZGljLkFkYS5JbnRlcmZhY2UuR1NydnNwc2tEdG9bXTtcclxuICAgICAgICBwcml2YXRlIGRhdGF1Y3Q6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTcnZzcHNrRHRvW107XHJcbiAgICAgICAgcHJpdmF0ZSByb3c6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTcnZzcHNrRHRvO1xyXG4gICAgICAgIHByaXZhdGUgSXhzX0NzcDogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgU2twX0FrYzogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgS29uZmlndXJhY2U6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTcnZzY3NwRHRvO1xyXG5cclxuICAgICAgICBwcml2YXRlIHZpZXdfSVNMOiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkFkYS5JbnRlcmZhY2UuR1NydnNwc2tEdG8+O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyICR0YWIgPSAkKHRoaXMuY29udGVudERpdik7XHJcbiAgICAgICAgICAgIHZhciBkYXRhdWN0ID0gdGhpcy5tb2RlbHVjdDtcclxuXHJcbiAgICAgICAgICAgICR0YWIuZW1wdHkoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQudGl0bGUgPSBcIlNlem5hbSBob2Rub3QgXCIgKyB0aGF0LktvbmZpZ3VyYWNlLm5hemV2X3BzaztcclxuXHJcbiAgICAgICAgICAgIHZhciBtYWluRm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwic2V0dXBcIiwgeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMTVMtMC0xMi0wXCIgfSkuZ2Zvcm1zZWN0aW9uKFwiY3JlYXRlXCIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdE5ldzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTm92w70gesOhem5hbVwiLCBpY29uOiBcImdpLXBsdXNcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGF0Lmdsb2JhbHMuUGFyYW1fQWRtaW5pc3RyYWNlX1NLUCEsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRldGFpbF9yYWRrdSh0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0RGV0YWlsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhhdC5nbG9iYWxzLlBhcmFtX0FkbWluaXN0cmFjZV9TS1AgPyBcIlVwcmF2aXRcIiA6IFwiRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogdGhhdC5nbG9iYWxzLlBhcmFtX0FkbWluaXN0cmFjZV9TS1AgPyBcImdpLXBlbmNpbFwiIDogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kZXRhaWxfcmFka3UodGhhdC5nbG9iYWxzLlBhcmFtX0FkbWluaXN0cmFjZV9TS1AsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0RGVsZXRlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPZHN0cmFuaXRcIiwgaWNvbjogXCJmYS10cmFzaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoYXQuZ2xvYmFscy5QYXJhbV9BZG1pbmlzdHJhY2VfU0tQISxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuc21hemFuaV9yYWRrdSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vbmFzdGF2ZW7DrSBtZW51QmFydVxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3ROZXcqXCIsIFwiYWN0RGV0YWlsKlwiLCBcImFjdERlbGV0ZSpcIl0pKTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIGFjdEVkaXQgPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiZGJsY2xpY2tcIixcclxuICAgICAgICAgICAgLy8gICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgR0RsZy5hbGVydChcIkR2b2prbGlrXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgLy8gY3R4LmNlbGxJbmZvLmRhdGFcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGdmRURTID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogXCJha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3RhdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHdpZHRoOiAyNSxcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRQcmVzZXQ6IEdvcmRpYy5HbG9iYWwuRW51bXMuR3JpZENvbHVtbkZvcm1hdEljb24uaWNvbixcclxuICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZGF0YS5ha3Rpdml0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDA6IHJldHVybiB7IGljb246IFwiZmEtY2hlY2stY2lyY2xlLW8gZy1zdGF0ZS1zdWNjZXNzIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBcIkFrdGl2bsOtXCIsIGNhcHRpb246IFwiQWt0aXZuw61cIiwgdG9vbHRpcDogXCJBa3Rpdm7DrVwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDMwMDogcmV0dXJuIHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS13YXJuaW5nIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBcIk7DoXZyaFwiLCBjYXB0aW9uOiBcIk7DoXZyaFwiLCB0b29sdGlwOiBcIk7DoXZyaFwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDUwMDogcmV0dXJuIHsgaWNvbjogXCJmYS10cmFzaCBnLXN0YXRlLWVycm9yIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBcIk5lYWt0aXZuw61cIiwgY2FwdGlvbjogXCJOZWFrdGl2bsOtXCIsIHRvb2x0aXA6IFwiTmVha3Rpdm7DrVwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJza3BfYWtjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhhdC5Lb25maWd1cmFjZS5uYXpldl9za3AhLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwc2tfYWtjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhhdC5Lb25maWd1cmFjZS5uYXpldl9wc2shLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTsOhemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDQwMFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgJG1haW5UYWJsZSA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLy8uY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKG1haW5Gb3JtKVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxBY3RpdmF0ZShldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucm93ID0gJG1haW5UYWJsZS5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQucm93ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bihldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJvdyA9IGN0eC5jZWxsSW5mby5kYXRhOyAgICAvL2RhdGEsIHplIGt0ZXJ5Y2ggYnlsIHZ5dHZvcmVuIHJhZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kZXRhaWxfcmFka3UodHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IFtcIipza3BfYWtjXCIsIFwiKnBza19ha2NcIiwgXCIqbmF6ZXZcIiBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IGdmRURTXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmaWx0ZXJEdG86IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTcnZzcHNrRmlsdGVyRHRvID0ge307XHJcblxyXG4gICAgICAgICAgICBpZiAoKHRoYXQuSXhzX0NzcCAhPSB1bmRlZmluZWQpICYmICh0aGF0Lkl4c19Dc3AudG9TdHJpbmcoKSAhPSBcIlwiKSkge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyRHRvLml4c19jc3AgPSB0aGF0Lkl4c19Dc3AudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoKHRoYXQuU2twX0FrYyAhPSB1bmRlZmluZWQpICYmICh0aGF0LlNrcF9Ba2MudG9TdHJpbmcoKSAhPSBcIlwiKSkge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyRHRvLnNrcF9ha2MgPSB0aGF0LlNrcF9Ba2MudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhhdC52aWV3X0lTTCA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhpcy5pc2wuUG9kc2t1cGluYUFEQUR5bi5saXN0KHsgZmlsdGVyczogZmlsdGVyRHRvIH0pKTtcclxuXHJcbiAgICAgICAgICAgICRtYWluVGFibGUuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlld19JU0wpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNtYXphbmlfcmFka3UoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwiRG90YXpcIiwgXCJPcHJhdmR1IG9kc3RyYW5pdCB6w6F6bmFtP1wiLCBHb3JkaWMuQWRhLldlYkNsaWVudC5BZGFDb25zdC5tYmJZZXNOb05lZ2F0aXYsIEdEbGcubWJpUXVlc3Rpb24pXHJcbiAgICAgICAgICAgICAgICAub24oXCJ5ZXNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlBvZHNrdXBpbmFBREFEeW4ucmVhZCh7IGRhdGE6IHRoYXQucm93IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKG5ld19kYXRhMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUG9kc2t1cGluYUFEQUR5bi5kZWxldGUoeyBkYXRhOiBuZXdfZGF0YTIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHJlc3BvbnNlLmRhdGEsIFwiZGVsZXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgZGV0YWlsX3JhZGt1KGVkaXRhYmxlLCBub3ZhYWtjZSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChub3ZhYWtjZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuUG9kc2t1cGluYUFEQUR5bi5yZWFkKHsgZGF0YTogdGhhdC5yb3cgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKG5ld19kYXRhMikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxfZGV0YWlsd2luZG93ID0gdGhhdC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiR29yZGljLkFkYS5XZWJDbGllbnQuR0FkbWluU3J2c3Bza0RldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnRGV0YWlsUFNLIycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgS29uZmlndXJhY2U6IHRoYXQuS29uZmlndXJhY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxQU0s6IG5ld19kYXRhMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXppbU5vdmE6IG5vdmFha2NlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3aW5kb3dDb250ZW50ID0gJC5jb250ZW50KGxfZGV0YWlsd2luZG93KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd0NvbnRlbnQuZWxlbWVudC5vbignY29udGVudGNsb3NlZCcsIChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFrdF9kYXRhID0gY3R4LmRhdGEhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFrdF9kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Qb2Rza3VwaW5hQURBRHluLnVwZGF0ZSh7IGRhdGE6IGN0eC5kYXRhISB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnVwZGF0ZURhdGEocmVzcG9uc2UuZGF0YSwgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFyIGxfb0RpdiA9IHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWRtaW5TcnZzcHNrRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGlkOiAnRGV0YWlsUFNLIycsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBLb25maWd1cmFjZTogdGhhdC5Lb25maWd1cmFjZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIG1vZGVsUFNLOiBuZXdfZGF0YTIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBSZXppbU5vdmE6IG5vdmFha2NlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIFwiRGV0YWlsIGhvZG5vdHkgXCIgKyB0aGF0LktvbmZpZ3VyYWNlLm5hemV2X3BzayEsIDYwMCwgNjUwLCB0cnVlKTsgICAgLy8gem9icmF6ZW7DrSBtb2TDoWxuw61obyBUYWJ1XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICQobF9vRGl2KS5vbignY2xvc2UnLCBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB2YXIgYWt0X2RhdGEgPSBjdHguZGF0YSE7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmIChha3RfZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmlzbC5Qb2Rza3VwaW5hQURBRHluLnVwZGF0ZSh7IGRhdGE6IGN0eC5kYXRhISB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnVwZGF0ZURhdGEocmVzcG9uc2UuZGF0YSwgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm92eV96YXpuYW06IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTcnZzcHNrRHRvID0ge307XHJcbiAgICAgICAgICAgICAgICBub3Z5X3phem5hbS5peHNfY3NwID0gdGhhdC5JeHNfQ3NwO1xyXG4gICAgICAgICAgICAgICAgbm92eV96YXpuYW0uc2twX2FrYyA9IHRoYXQuU2twX0FrYztcclxuICAgICAgICAgICAgICAgIG5vdnlfemF6bmFtLmFrdGl2aXRhID0gMTAwO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBsX2RldGFpbHdpbmRvdyA9IHRoYXQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWRtaW5TcnZzcHNrRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ0RldGFpbFBTSyMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBLb25maWd1cmFjZTogdGhhdC5Lb25maWd1cmFjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxQU0s6IG5vdnlfemF6bmFtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXppbU5vdmE6IG5vdmFha2NlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHdpbmRvd0NvbnRlbnQgPSAkLmNvbnRlbnQobF9kZXRhaWx3aW5kb3cpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdpbmRvd0NvbnRlbnQuZWxlbWVudC5vbignY29udGVudGNsb3NlZCcsIChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWt0X2RhdGEgPSBjdHguZGF0YSE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFrdF9kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUG9kc2t1cGluYUFEQUR5bi5jcmVhdGUoeyBkYXRhOiBjdHguZGF0YSEgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHJlc3BvbnNlLmRhdGEsIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vICAgIHZhciBsX29EaXYgPSB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkFkYS5XZWJDbGllbnQuR0FkbWluU3J2c3Bza0RldGFpbFwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGlkOiAnRGV0YWlsUFNLIycsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgS29uZmlndXJhY2U6IHRoYXQuS29uZmlndXJhY2UsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgbW9kZWxQU0s6IG5vdnlfemF6bmFtLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIFJlemltTm92YTogbm92YWFrY2VcclxuICAgICAgICAgICAgLy8gICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICBcIk5vdsOhIGhvZG5vdGEgXCIgKyB0aGF0LktvbmZpZ3VyYWNlLm5hemV2X3BzayEsIDYwMCwgNjUwLCB0cnVlKTsgICAgLy8gem9icmF6ZW7DrSBtb2TDoWxuw61obyBUYWJ1XHJcblxyXG4gICAgICAgICAgICAvLyAgICAkKGxfb0Rpdikub24oJ2Nsb3NlJywgZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIHZhciBha3RfZGF0YSA9IGN0eC5kYXRhITtcclxuICAgICAgICAgICAgLy8gICAgICAgIGlmIChha3RfZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5pc2wuUG9kc2t1cGluYUFEQUR5bi5jcmVhdGUoeyBkYXRhOiBjdHguZGF0YSEgfSlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHJlc3BvbnNlLmRhdGEsIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuIl19
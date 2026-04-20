"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAdminPolozkySdP.js                                                        </Name>
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
            let GAdminPolozkySdP = class GAdminPolozkySdP extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Seznam položek SdP"; //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#
                    this.taskId = "actSeznamSdP"; // označení položky v taskListu
                    this.globals = Gordic.Ada.Globals.GAdaGlobals;
                }
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    var datauct = this.modeluct;
                    $tab.empty();
                    var cnt = this;
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    this.actions.addRange({
                        actNew: {
                            caption: "Nový záznam", icon: "gi-plus",
                            enabled: that.globals.Param_Administrace_PSP,
                            run: () => {
                                return that.detail_radku(true, true);
                            }
                        },
                        actDetail: {
                            caption: that.globals.Param_Administrace_PSP ? "Upravit" : "Detail",
                            icon: that.globals.Param_Administrace_PSP ? "gi-pencil" : "gi-detail",
                            primary: true,
                            run: () => {
                                return that.detail_radku(that.globals.Param_Administrace_PSP, false);
                            }
                        },
                        actDelete: {
                            caption: "Odstranit", icon: "fa-trash",
                            enabled: that.globals.Param_Administrace_PSP,
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
                            caption: "Položka SdP",
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
                    that.view_ISL = new Gordic.Isl.View(this.isl.PolozkaSdP.list({ filters: {} }));
                    $mainTable.ggrid("setData", that.view_ISL);
                }
                smazani_radku() {
                    var that = this;
                    that.dialogs.messageBox("Dotaz", "Opravdu odstranit záznam?", Gordic.Ada.WebClient.AdaConst.mbbYesNoNegativ, GDlg.mbiQuestion)
                        .on("yes", function () {
                        that.isl.PolozkaSdP.read({ data: that.row })
                            .getData()
                            .done(function (new_data2) {
                            that.isl.PolozkaSdP.delete({ data: new_data2 })
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
                        that.isl.PolozkaSdP.read({ data: that.row })
                            .getData()
                            .done(function (new_data2) {
                            var l_detailwindow = that.navigate("Gordic.Ada.WebClient.GAdminPolozkySdPDetail", {
                                id: 'DetailSdP#',
                                RezimNova: novaakce,
                                modelPSP: new_data2
                            });
                            var windowContent = $.content(l_detailwindow);
                            windowContent.element.on('contentclosed', (ev, ctx) => {
                                //debugger;
                                var akt_data = ctx.data;
                                if (akt_data != null) {
                                    that.isl.PolozkaSdP.update({ data: ctx.data })
                                        .get()
                                        .then(function (response) {
                                        that.view_ISL.updateData(response.data, "update");
                                    })
                                        .fail(function () {
                                    });
                                }
                            });
                            //    var l_oDiv = that.dialogs.showModalWindow("Gordic.Ada.WebClient.GAdminPolozkySdPDetail",
                            //        {
                            //            id: 'DetailSdP#',
                            //            RezimNova: novaakce,
                            //            modelPSP: new_data2
                            //        },
                            //        "Detail položky SdP", 550, 450, true);    // zobrazení modálního Tabu
                            //    $(l_oDiv).on('close', function (ev, ctx) {
                            //        var akt_data = ctx.data!;
                            //        if (akt_data != null) {
                            //            that.isl.PolozkaSdP.update({ data: ctx.data! })
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
                        novy_zaznam.id_psp = "";
                        novy_zaznam.aktivita = 100;
                        var l_detailwindow = that.navigate("Gordic.Ada.WebClient.GAdminPolozkySdPDetail", {
                            id: 'DetailSdP#',
                            RezimNova: novaakce,
                            modelPSP: novy_zaznam
                        });
                        var windowContent = $.content(l_detailwindow);
                        windowContent.element.on('contentclosed', (ev, ctx) => {
                            //debugger;
                            var akt_data = ctx.data;
                            if (akt_data != null) {
                                that.isl.PolozkaSdP.create({ data: ctx.data })
                                    .get()
                                    .then(function (response) {
                                    that.view_ISL.updateData(response.data, "update");
                                })
                                    .fail(function () {
                                });
                            }
                        });
                        //var l_oDiv = that.dialogs.showModalWindow("Gordic.Ada.WebClient.GAdminPolozkySdPDetail",
                        //    {
                        //        id: 'DetailSdP#',
                        //        RezimNova: novaakce,
                        //        modelPSP: novy_zaznam
                        //    },
                        //    "Nová položka SdP", 550, 450, true);    // zobrazení modálního Tabu
                        //$(l_oDiv).on('close', function (ev, ctx) {
                        //    var akt_data = ctx.data!;
                        //    if (akt_data != null) {
                        //        that.isl.PolozkaSdP.create({ data: ctx.data! })
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
            GAdminPolozkySdP = __decorate([
                gcontent
            ], GAdminPolozkySdP);
            WebClient.GAdminPolozkySdP = GAdminPolozkySdP;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FkbWluUG9sb3preVNkUC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HQWRtaW5Qb2xvemt5U2RQLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztFQU9FOzs7Ozs7O0FBRUYsSUFBVSxNQUFNLENBbVJmO0FBblJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQW1SbkI7SUFuUmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQW1SN0I7UUFuUm9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWlCLFNBQVEsT0FBQSxZQUFZO2dCQUFsRDs7b0JBRUksVUFBSyxHQUFHLG9CQUFvQixDQUFDLENBQUMsbUVBQW1FO29CQUNqRyxXQUFNLEdBQUcsY0FBYyxDQUFDLENBQUMsK0JBQStCO29CQUVoRCxZQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO2dCQXlRckQsQ0FBQztnQkFqUUcsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzlCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBRTVCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFFYixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7b0JBRWYsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRWxJLElBQUksQ0FBQyxP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QUksRUFBRSxHQUFHLENBQUMsSUFBSyxFQUFFLENBQUM7cUNBQzFDLEdBQUcsRUFBRTtxQ0FDTCxJQUFJLENBQUMsVUFBVSxRQUFRO29DQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dDQUN0RCxDQUFDLENBQUM7cUNBQ0QsSUFBSSxDQUFDO2dDQUNOLENBQUMsQ0FBQyxDQUFDOzRCQUNYLENBQUM7d0JBQ0wsQ0FBQyxDQUFDLENBQUM7d0JBR0gsMEZBQTBGO3dCQUMxRixPQUFPO3dCQUNQLDJCQUEyQjt3QkFDM0IsOEJBQThCO3dCQUM5QiwrQkFBK0I7d0JBQy9CLFFBQVE7d0JBQ1IseUVBQXlFO3dCQUV6RSw0Q0FBNEM7d0JBQzVDLCtCQUErQjt3QkFDL0IsNkJBQTZCO3dCQUM3Qix5REFBeUQ7d0JBQ3pELG9CQUFvQjt3QkFDcEIseUNBQXlDO3dCQUN6QyxvRUFBb0U7d0JBQ3BFLGdCQUFnQjt3QkFDaEIsaUNBQWlDO3dCQUNqQyxpQkFBaUI7d0JBQ2pCLE9BQU87d0JBQ1AsS0FBSztvQkFFVCxDQUFDO2dCQUVMLENBQUM7YUFFSixDQUFBO1lBOVFZLGdCQUFnQjtnQkFENUIsUUFBUTtlQUNJLGdCQUFnQixDQThRNUI7WUE5UVksMEJBQWdCLG1CQThRNUIsQ0FBQTtRQUNMLENBQUMsRUFuUm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQW1SN0I7SUFBRCxDQUFDLEVBblJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFtUm5CO0FBQUQsQ0FBQyxFQW5SUyxNQUFNLEtBQU4sTUFBTSxRQW1SZiIsInNvdXJjZXNDb250ZW50IjpbIi8qIS8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuQWRhLldlYkNsaWVudC5HQWRtaW5Qb2xvemt5U2RQLmpzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gR0FrY2VVY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBKacWZw60gSWxlxI1layAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE2ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTYtMDMtMDMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuKi9cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQWRhLldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdBZG1pblBvbG96a3lTZFAgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICB0aXRsZSA9IFwiU2V6bmFtIHBvbG/FvmVrIFNkUFwiOyAvL2FieSBzZSBkYWxvIHDFmWlzdG91cGl0IHogYnJlYWRjcnVtYnMsIGplIG5hc3RhdmVubyB6ZGUgbcOtc3RvIHYgQyNcclxuICAgICAgICB0YXNrSWQgPSBcImFjdFNlem5hbVNkUFwiOyAvLyBvem5hxI1lbsOtIHBvbG/Fvmt5IHYgdGFza0xpc3R1XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2xvYmFscyA9IEdvcmRpYy5BZGEuR2xvYmFscy5HQWRhR2xvYmFscztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb2RlbHVjdDogR29yZGljLkFkYS5JbnRlcmZhY2UuR1NydnNwc3BEdG9bXTtcclxuICAgICAgICBwcml2YXRlIGRhdGF1Y3Q6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTcnZzcHNwRHRvW107XHJcbiAgICAgICAgcHJpdmF0ZSByb3c6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTcnZzcHNwRHRvO1xyXG5cclxuICAgICAgICBwcml2YXRlIHZpZXdfSVNMOiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkFkYS5JbnRlcmZhY2UuR1NydnNwc3BEdG8+O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyICR0YWIgPSAkKHRoaXMuY29udGVudERpdik7XHJcbiAgICAgICAgICAgIHZhciBkYXRhdWN0ID0gdGhpcy5tb2RlbHVjdDtcclxuXHJcbiAgICAgICAgICAgICR0YWIuZW1wdHkoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJzZXR1cFwiLCB7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0wLTEyLTBcIiB9KS5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0TmV3OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOb3bDvSB6w6F6bmFtXCIsIGljb246IFwiZ2ktcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoYXQuZ2xvYmFscy5QYXJhbV9BZG1pbmlzdHJhY2VfUFNQISxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGV0YWlsX3JhZGt1KHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3REZXRhaWw6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGF0Lmdsb2JhbHMuUGFyYW1fQWRtaW5pc3RyYWNlX1BTUCA/IFwiVXByYXZpdFwiIDogXCJEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiB0aGF0Lmdsb2JhbHMuUGFyYW1fQWRtaW5pc3RyYWNlX1BTUCA/IFwiZ2ktcGVuY2lsXCIgOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRldGFpbF9yYWRrdSh0aGF0Lmdsb2JhbHMuUGFyYW1fQWRtaW5pc3RyYWNlX1BTUCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3REZWxldGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9kc3RyYW5pdFwiLCBpY29uOiBcImZhLXRyYXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhhdC5nbG9iYWxzLlBhcmFtX0FkbWluaXN0cmFjZV9QU1AhLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5zbWF6YW5pX3JhZGt1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIG1lbnVCYXJ1XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdE5ldypcIiwgXCJhY3REZXRhaWwqXCIsIFwiYWN0RGVsZXRlKlwiXSkpO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgYWN0RWRpdCA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJkYmxjbGlja1wiLFxyXG4gICAgICAgICAgICAvLyAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBHRGxnLmFsZXJ0KFwiRHZvamtsaWtcIik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLyBjdHguY2VsbEluZm8uZGF0YVxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyICRtYWluVGFibGUgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC8vLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhtYWluRm9ybSlcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjZWxsQWN0aXZhdGUoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJvdyA9ICRtYWluVGFibGUuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnJvdyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW4oZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yb3cgPSBjdHguY2VsbEluZm8uZGF0YTsgICAgLy9kYXRhLCB6ZSBrdGVyeWNoIGJ5bCB2eXR2b3JlbiByYWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGV0YWlsX3JhZGt1KHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCIqaWRfcHNwXCIsIFwiKm5hemV2XCIsIFwiKnprcmF0a2FcIiwgXCIqcG96bmFta2FcIiBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwiYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3RhdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2lkdGg6IDI1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0UHJlc2V0OiBHb3JkaWMuR2xvYmFsLkVudW1zLkdyaWRDb2x1bW5Gb3JtYXRJY29uLmljb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkYXRhLmFrdGl2aXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTAwOiByZXR1cm4geyBpY29uOiBcImZhLWNoZWNrLWNpcmNsZS1vIGctc3RhdGUtc3VjY2VzcyBnLXN0YXRlLXRleHRcIiwgdGV4dDogXCJBa3Rpdm7DrVwiLCBjYXB0aW9uOiBcIkFrdGl2bsOtXCIsIHRvb2x0aXA6IFwiQWt0aXZuw61cIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDMwMDogcmV0dXJuIHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS13YXJuaW5nIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBcIk7DoXZyaFwiLCBjYXB0aW9uOiBcIk7DoXZyaFwiLCB0b29sdGlwOiBcIk7DoXZyaFwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTAwOiByZXR1cm4geyBpY29uOiBcImZhLXRyYXNoIGctc3RhdGUtZXJyb3IgZy1zdGF0ZS10ZXh0XCIsIHRleHQ6IFwiTmVha3Rpdm7DrVwiLCBjYXB0aW9uOiBcIk5lYWt0aXZuw61cIiwgdG9vbHRpcDogXCJOZWFrdGl2bsOtXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImlkX3BzcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQb2xvxb5rYSBTZFBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOw6F6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6a3JhdGthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlprcmF0a2FcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3puYW1rYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQb3puw6Fta2FcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ptZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRhdHVtIHptxJtueVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZHQtbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInptZW51X3Byb3ZfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlptxJtudSBwcm92ZWRsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQudmlld19JU0wgPSBuZXcgR29yZGljLklzbC5WaWV3KHRoaXMuaXNsLlBvbG96a2FTZFAubGlzdCh7ZmlsdGVyczoge30gfSkpO1xyXG5cclxuICAgICAgICAgICAgJG1haW5UYWJsZS5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3X0lTTCk7XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNtYXphbmlfcmFka3UoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwiRG90YXpcIiwgXCJPcHJhdmR1IG9kc3RyYW5pdCB6w6F6bmFtP1wiLCBHb3JkaWMuQWRhLldlYkNsaWVudC5BZGFDb25zdC5tYmJZZXNOb05lZ2F0aXYsIEdEbGcubWJpUXVlc3Rpb24pXHJcbiAgICAgICAgICAgICAgICAub24oXCJ5ZXNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlBvbG96a2FTZFAucmVhZCh7IGRhdGE6IHRoYXQucm93IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKG5ld19kYXRhMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUG9sb3prYVNkUC5kZWxldGUoeyBkYXRhOiBuZXdfZGF0YTIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHJlc3BvbnNlLmRhdGEsIFwiZGVsZXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgZGV0YWlsX3JhZGt1KGVkaXRhYmxlLCBub3ZhYWtjZSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChub3ZhYWtjZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuUG9sb3prYVNkUC5yZWFkKHsgZGF0YTogdGhhdC5yb3cgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKG5ld19kYXRhMikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxfZGV0YWlsd2luZG93ID0gdGhhdC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiR29yZGljLkFkYS5XZWJDbGllbnQuR0FkbWluUG9sb3preVNkUERldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnRGV0YWlsU2RQIycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmV6aW1Ob3ZhOiBub3ZhYWtjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbFBTUDogbmV3X2RhdGEyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3aW5kb3dDb250ZW50ID0gJC5jb250ZW50KGxfZGV0YWlsd2luZG93KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd0NvbnRlbnQuZWxlbWVudC5vbignY29udGVudGNsb3NlZCcsIChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFrdF9kYXRhID0gY3R4LmRhdGEhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFrdF9kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Qb2xvemthU2RQLnVwZGF0ZSh7IGRhdGE6IGN0eC5kYXRhISB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnVwZGF0ZURhdGEocmVzcG9uc2UuZGF0YSwgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pOyBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFyIGxfb0RpdiA9IHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWRtaW5Qb2xvemt5U2RQRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGlkOiAnRGV0YWlsU2RQIycsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBSZXppbU5vdmE6IG5vdmFha2NlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgbW9kZWxQU1A6IG5ld19kYXRhMlxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBcIkRldGFpbCBwb2xvxb5reSBTZFBcIiwgNTUwLCA0NTAsIHRydWUpOyAgICAvLyB6b2JyYXplbsOtIG1vZMOhbG7DrWhvIFRhYnVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgJChsX29EaXYpLm9uKCdjbG9zZScsIGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHZhciBha3RfZGF0YSA9IGN0eC5kYXRhITtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKGFrdF9kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuaXNsLlBvbG96a2FTZFAudXBkYXRlKHsgZGF0YTogY3R4LmRhdGEhIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YShyZXNwb25zZS5kYXRhLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vdnlfemF6bmFtOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU3J2c3BzcER0byA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIG5vdnlfemF6bmFtLmlkX3BzcCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBub3Z5X3phem5hbS5ha3Rpdml0YSA9IDEwMDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbF9kZXRhaWx3aW5kb3cgPSB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgIFwiR29yZGljLkFkYS5XZWJDbGllbnQuR0FkbWluUG9sb3preVNkUERldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdEZXRhaWxTZFAjJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmV6aW1Ob3ZhOiBub3ZhYWtjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxQU1A6IG5vdnlfemF6bmFtXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgd2luZG93Q29udGVudCA9ICQuY29udGVudChsX2RldGFpbHdpbmRvdyk7XHJcblxyXG4gICAgICAgICAgICAgICAgd2luZG93Q29udGVudC5lbGVtZW50Lm9uKCdjb250ZW50Y2xvc2VkJywgKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBha3RfZGF0YSA9IGN0eC5kYXRhITtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWt0X2RhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Qb2xvemthU2RQLmNyZWF0ZSh7IGRhdGE6IGN0eC5kYXRhISB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnVwZGF0ZURhdGEocmVzcG9uc2UuZGF0YSwgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vdmFyIGxfb0RpdiA9IHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWRtaW5Qb2xvemt5U2RQRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgaWQ6ICdEZXRhaWxTZFAjJyxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBSZXppbU5vdmE6IG5vdmFha2NlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIG1vZGVsUFNQOiBub3Z5X3phem5hbVxyXG4gICAgICAgICAgICAgICAgLy8gICAgfSxcclxuICAgICAgICAgICAgICAgIC8vICAgIFwiTm92w6EgcG9sb8W+a2EgU2RQXCIsIDU1MCwgNDUwLCB0cnVlKTsgICAgLy8gem9icmF6ZW7DrSBtb2TDoWxuw61obyBUYWJ1XHJcblxyXG4gICAgICAgICAgICAgICAgLy8kKGxfb0Rpdikub24oJ2Nsb3NlJywgZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHZhciBha3RfZGF0YSA9IGN0eC5kYXRhITtcclxuICAgICAgICAgICAgICAgIC8vICAgIGlmIChha3RfZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5pc2wuUG9sb3prYVNkUC5jcmVhdGUoeyBkYXRhOiBjdHguZGF0YSEgfSlcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHJlc3BvbnNlLmRhdGEsIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuIl19
"use strict";
/*!//  <FileHeader xmlns="http://www.ordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAdminSrvsmsa.js                                                        </Name>
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
            let GAdminSrvsmsa = class GAdminSrvsmsa extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Seznam konfigurace Akce x ORG"; //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#
                    this.taskId = "actSeznamMSA"; // označení položky v taskListu
                    this.globals = Gordic.Ada.Globals.GAdaGlobals;
                }
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    var datauct = this.modeluct;
                    if (that.rezim == undefined)
                        that.rezim = false;
                    $tab.empty();
                    var that = this;
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    this.actions.addRange({
                        actNew: {
                            caption: "Nový záznam", icon: "gi-plus",
                            enabled: that.rezim,
                            run: () => {
                                return that.detail_radku(that.rezim, true);
                            }
                        },
                        actDetail: {
                            caption: "Detail",
                            icon: "gi-detail",
                            primary: true,
                            run: () => {
                                return that.detail_radku(that.rezim, false);
                            }
                        },
                        //actDelete: {
                        //    caption: "Odstranit", icon: "fa-trash",
                        //    enabled: true,
                        //    run: () => {
                        //        return that.smazani_radku();
                        //    }
                        //},
                    });
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actNew*", "actDetail*"]));
                    //var actEdit = new GAction({
                    //    name: "dblclick",
                    //    run: function (ev, ctx) {
                    //        GDlg.alert("Dvojklik");
                    //        // ctx.cellInfo.data
                    //    }
                    //});
                    var gfMSA = new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "ico",
                        caption: "IČ",
                        width: 130
                    })
                        .addNumberColumn({
                        name: "ktg_akce",
                        caption: "Kategorie akce",
                        width: 40
                    })
                        .addTextColumn({
                        name: "ktg_akce_txt",
                        caption: "Název kategorie akce",
                        width: 400
                    })
                        .addNumberColumn({
                        name: "rok_od",
                        caption: "Rok od",
                        width: 50
                    })
                        .addNumberColumn({
                        name: "rok_do",
                        caption: "Rok do",
                        width: 50
                    });
                    gfMSA.addTextColumn({
                        name: "te1_msk",
                        caption: "Maska",
                        width: 300
                    });
                    gfMSA.addDateTimeColumn({
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
                                return that.detail_radku(that.rezim, false);
                            }
                        }),
                        // searchColumns: ["*rok", "*nazev", "*kod_uct" ],
                        columns: gfMSA
                    });
                    that.view_ISL = new Gordic.Isl.View(this.isl.Srvsmsa.list({ filters: {} }));
                    $mainTable.ggrid("setData", that.view_ISL);
                }
                //smazani_radku() {
                //    var that = this;
                //    that.dialogs.messageBox("Dotaz", "Opravdu odstranit záznam?", Gordic.Ada.WebClient.AdaConst.mbbYesNoNegativ, GDlg.mbiQuestion)
                //        .on("yes", function () {
                //            that.isl.ProjektEDS.read({ data: that.row })
                //                .getData()
                //                .done(function (new_data2) {
                //                    that.isl.ProjektEDS.delete({ data: new_data2 })
                //                        .get()
                //                        .then(function (response) {
                //                            that.view_ISL.updateData(response.data, "delete");
                //                        })
                //                        .fail(function () {
                //                        });
                //                });
                //        })
                //}
                detail_radku(editable, novaakce) {
                    var that = this;
                    if (novaakce == false) {
                        that.isl.Srvsmsa.read({ data: that.row })
                            .getData()
                            .done(function (new_data2) {
                            var l_detailwindow = that.navigate("Gordic.Ada.WebClient.GAdminSrvsmsaDetail", {
                                id: 'DetailMSA#',
                                modelMSA: new_data2,
                                RezimNova: novaakce,
                                RezimEditace: that.rezim
                            });
                            var windowContent = $.content(l_detailwindow);
                            windowContent.element.on('contentclosed', (ev, ctx) => {
                                //debugger;
                                var akt_data = ctx.data;
                                if (akt_data != null) {
                                    that.isl.Srvsmsa.update({ data: ctx.data })
                                        .get()
                                        .then(function (response) {
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
                        novy_zaznam.ico = that.gpc.ico;
                        novy_zaznam.rok_od = parseInt(that.gpc.rok);
                        novy_zaznam.rok_do = 2049;
                        novy_zaznam.ktg_akce = 30;
                        novy_zaznam.te1_msk = "";
                        var l_detailwindow = that.navigate("Gordic.Ada.WebClient.GAdminSrvsmsaDetail", {
                            id: 'DetailMSA#',
                            modelMSA: novy_zaznam,
                            RezimNova: novaakce,
                            RezimEditace: that.rezim
                        });
                        var windowContent = $.content(l_detailwindow);
                        windowContent.element.on('contentclosed', (ev, ctx) => {
                            //debugger;
                            var akt_data = ctx.data;
                            if (akt_data != null) {
                                that.isl.Srvsmsa.create({ data: ctx.data })
                                    .get()
                                    .then(function (response) {
                                    that.view_ISL.updateData(response.data, "update");
                                })
                                    .fail(function () {
                                });
                            }
                        });
                    }
                }
            };
            GAdminSrvsmsa = __decorate([
                gcontent
            ], GAdminSrvsmsa);
            WebClient.GAdminSrvsmsa = GAdminSrvsmsa;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FkbWluU3J2c21zYS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HQWRtaW5TcnZzbXNhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztFQU9FOzs7Ozs7O0FBRUYsSUFBVSxNQUFNLENBOE9mO0FBOU9ELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQThPbkI7SUE5T2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQThPN0I7UUE5T29CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxPQUFBLFlBQVk7Z0JBQS9DOztvQkFFSSxVQUFLLEdBQUcsK0JBQStCLENBQUMsQ0FBQyxtRUFBbUU7b0JBQzVHLFdBQU0sR0FBRyxjQUFjLENBQUMsQ0FBQywrQkFBK0I7b0JBRWhELFlBQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7Z0JBb09yRCxDQUFDO2dCQTNORyxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFFNUIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVM7d0JBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBRWhELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFFYixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxt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QUM7Z0NBQ3RELENBQUMsQ0FBQztxQ0FDRCxJQUFJLENBQUM7Z0NBQ04sQ0FBQyxDQUFDLENBQUM7NEJBQ1gsQ0FBQzt3QkFDTCxDQUFDLENBQUMsQ0FBQztvQkFFUCxDQUFDO2dCQUVMLENBQUM7YUFFSixDQUFBO1lBek9ZLGFBQWE7Z0JBRHpCLFFBQVE7ZUFDSSxhQUFhLENBeU96QjtZQXpPWSx1QkFBYSxnQkF5T3pCLENBQUE7UUFDTCxDQUFDLEVBOU9vQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE4TzdCO0lBQUQsQ0FBQyxFQTlPZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBOE9uQjtBQUFELENBQUMsRUE5T1MsTUFBTSxLQUFOLE1BQU0sUUE4T2YiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3Lm9yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuQWRhLldlYkNsaWVudC5HQWRtaW5TcnZzbXNhLmpzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gR0FrY2VVY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBKacWZw60gSWxlxI1layAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE2ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTYtMDMtMDMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuKi9cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQWRhLldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdBZG1pblNydnNtc2EgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICB0aXRsZSA9IFwiU2V6bmFtIGtvbmZpZ3VyYWNlIEFrY2UgeCBPUkdcIjsgLy9hYnkgc2UgZGFsbyBwxZlpc3RvdXBpdCB6IGJyZWFkY3J1bWJzLCBqZSBuYXN0YXZlbm8gemRlIG3DrXN0byB2IEMjXHJcbiAgICAgICAgdGFza0lkID0gXCJhY3RTZXpuYW1NU0FcIjsgLy8gb3puYcSNZW7DrSBwb2xvxb5reSB2IHRhc2tMaXN0dVxyXG5cclxuICAgICAgICBwcml2YXRlIGdsb2JhbHMgPSBHb3JkaWMuQWRhLkdsb2JhbHMuR0FkYUdsb2JhbHM7XHJcblxyXG4gICAgICAgIHByaXZhdGUgbW9kZWx1Y3Q6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTcnZzbXNhRHRvW107XHJcbiAgICAgICAgcHJpdmF0ZSBkYXRhdWN0OiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU3J2c21zYUR0b1tdO1xyXG4gICAgICAgIHByaXZhdGUgcm93OiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU3J2c21zYUR0bztcclxuICAgICAgICBwcml2YXRlIHJlemltOiBib29sZWFuO1xyXG5cclxuICAgICAgICBwcml2YXRlIHZpZXdfSVNMOiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkFkYS5JbnRlcmZhY2UuR1NydnNtc2FEdG8+O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyICR0YWIgPSAkKHRoaXMuY29udGVudERpdik7XHJcbiAgICAgICAgICAgIHZhciBkYXRhdWN0ID0gdGhpcy5tb2RlbHVjdDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LnJlemltID09IHVuZGVmaW5lZCkgdGhhdC5yZXppbSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgJHRhYi5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJzZXR1cFwiLCB7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0wLTEyLTBcIiB9KS5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0TmV3OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOb3bDvSB6w6F6bmFtXCIsIGljb246IFwiZ2ktcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoYXQucmV6aW0sXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRldGFpbF9yYWRrdSh0aGF0LnJlemltLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0RGV0YWlsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRldGFpbF9yYWRrdSh0aGF0LnJlemltLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vYWN0RGVsZXRlOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcIk9kc3RyYW5pdFwiLCBpY29uOiBcImZhLXRyYXNoXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIHRoYXQuc21hemFuaV9yYWRrdSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99LFxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gbWVudUJhcnVcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0TmV3KlwiLCBcImFjdERldGFpbCpcIl0pKTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIGFjdEVkaXQgPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiZGJsY2xpY2tcIixcclxuICAgICAgICAgICAgLy8gICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgR0RsZy5hbGVydChcIkR2b2prbGlrXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgLy8gY3R4LmNlbGxJbmZvLmRhdGFcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGdmTVNBID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWNvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJJxIxcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdGdfYWtjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiS2F0ZWdvcmllIGFrY2VcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdGdfYWtjZV90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk7DoXpldiBrYXRlZ29yaWUgYWtjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0MDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva19vZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUm9rIG9kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDUwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb2tfZG9cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlJvayBkb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBnZk1TQS5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRlMV9tc2tcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk1hc2thXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGdmTVNBLmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ptZW5hXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRhdHVtIHptxJtueVwiLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZHQtbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInptZW51X3Byb3ZfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlptxJtudSBwcm92ZWRsXCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzAwXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyICRtYWluVGFibGUgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC8vLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhtYWluRm9ybSlcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjZWxsQWN0aXZhdGUoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJvdyA9ICRtYWluVGFibGUuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnJvdyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW4oZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yb3cgPSBjdHguY2VsbEluZm8uZGF0YTsgICAgLy9kYXRhLCB6ZSBrdGVyeWNoIGJ5bCB2eXR2b3JlbiByYWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGV0YWlsX3JhZGt1KHRoYXQucmV6aW0sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBzZWFyY2hDb2x1bW5zOiBbXCIqcm9rXCIsIFwiKm5hemV2XCIsIFwiKmtvZF91Y3RcIiBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IGdmTVNBXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQudmlld19JU0wgPSBuZXcgR29yZGljLklzbC5WaWV3KHRoaXMuaXNsLlNydnNtc2EubGlzdCh7IGZpbHRlcnM6IHt9IH0pKTtcclxuXHJcbiAgICAgICAgICAgICRtYWluVGFibGUuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlld19JU0wpO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3NtYXphbmlfcmFka3UoKSB7XHJcbiAgICAgICAgLy8gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcIkRvdGF6XCIsIFwiT3ByYXZkdSBvZHN0cmFuaXQgesOhem5hbT9cIiwgR29yZGljLkFkYS5XZWJDbGllbnQuQWRhQ29uc3QubWJiWWVzTm9OZWdhdGl2LCBHRGxnLm1iaVF1ZXN0aW9uKVxyXG4gICAgICAgIC8vICAgICAgICAub24oXCJ5ZXNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgdGhhdC5pc2wuUHJvamVrdEVEUy5yZWFkKHsgZGF0YTogdGhhdC5yb3cgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKG5ld19kYXRhMikge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Qcm9qZWt0RURTLmRlbGV0ZSh7IGRhdGE6IG5ld19kYXRhMiB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnVwZGF0ZURhdGEocmVzcG9uc2UuZGF0YSwgXCJkZWxldGVcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgLy99XHJcblxyXG5cclxuICAgICAgICBkZXRhaWxfcmFka3UoZWRpdGFibGUsIG5vdmFha2NlKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKG5vdmFha2NlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmlzbC5TcnZzbXNhLnJlYWQoeyBkYXRhOiB0aGF0LnJvdyB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAobmV3X2RhdGEyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbF9kZXRhaWx3aW5kb3cgPSB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWRtaW5TcnZzbXNhRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdEZXRhaWxNU0EjJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbE1TQTogbmV3X2RhdGEyLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXppbU5vdmE6IG5vdmFha2NlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlemltRWRpdGFjZTogdGhhdC5yZXppbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2luZG93Q29udGVudCA9ICQuY29udGVudChsX2RldGFpbHdpbmRvdyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dDb250ZW50LmVsZW1lbnQub24oJ2NvbnRlbnRjbG9zZWQnLCAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBha3RfZGF0YSA9IGN0eC5kYXRhITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChha3RfZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuU3J2c21zYS51cGRhdGUoeyBkYXRhOiBjdHguZGF0YSEgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKHJlc3BvbnNlLmRhdGEsIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBub3Z5X3phem5hbTogR29yZGljLkFkYS5JbnRlcmZhY2UuR1NydnNtc2FEdG8gPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICBub3Z5X3phem5hbS5pY28gPSB0aGF0LmdwYy5pY287XHJcbiAgICAgICAgICAgICAgICBub3Z5X3phem5hbS5yb2tfb2QgPSBwYXJzZUludCh0aGF0LmdwYy5yb2spO1xyXG4gICAgICAgICAgICAgICAgbm92eV96YXpuYW0ucm9rX2RvID0gMjA0OTtcclxuICAgICAgICAgICAgICAgIG5vdnlfemF6bmFtLmt0Z19ha2NlID0gMzA7XHJcbiAgICAgICAgICAgICAgICBub3Z5X3phem5hbS50ZTFfbXNrID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbF9kZXRhaWx3aW5kb3cgPSB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgIFwiR29yZGljLkFkYS5XZWJDbGllbnQuR0FkbWluU3J2c21zYURldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdEZXRhaWxNU0EjJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxNU0E6IG5vdnlfemF6bmFtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXppbU5vdmE6IG5vdmFha2NlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXppbUVkaXRhY2U6IHRoYXQucmV6aW1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgd2luZG93Q29udGVudCA9ICQuY29udGVudChsX2RldGFpbHdpbmRvdyk7XHJcblxyXG4gICAgICAgICAgICAgICAgd2luZG93Q29udGVudC5lbGVtZW50Lm9uKCdjb250ZW50Y2xvc2VkJywgKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBha3RfZGF0YSA9IGN0eC5kYXRhITtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWt0X2RhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5TcnZzbXNhLmNyZWF0ZSh7IGRhdGE6IGN0eC5kYXRhISB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnVwZGF0ZURhdGEocmVzcG9uc2UuZGF0YSwgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==
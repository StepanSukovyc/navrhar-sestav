"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAkceRoz.js                                                        </Name>
//    <Description> GAkceRoz                                                                                  </Description>
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
            let GAkceRoz = class GAkceRoz extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    var dataroz = this.modelroz;
                    $tab.empty();
                    var cnt = this;
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    this.actions.addRange({
                        actDetail: {
                            caption: "Detail", icon: "gi-detail",
                            enabled: true,
                            run: () => {
                                //        that.row = ctx.cellInfo.data;    //data, ze kterych byl vytvoren radek
                                var a_agenda = 0;
                                if (this.globals.Parametr_Zobrazeni_AG_Detailu_ROZ) {
                                    a_agenda = 50;
                                }
                                if (a_agenda > 0) {
                                    // otevření nové záložky
                                    Gordic.WebApp.Utility.openApp({
                                        ixx1: that.row.ixp, // id cílového objektu v nově otevírané záložce
                                        ixx2: null, // druhé id cílového objektu v případě složeného klíče (nepovinné)
                                        ixx3: null, // druhé id cílového objektu v případě složeného klíče (nepovinné)
                                        typAg: 50, // typ agendy cílového objektu (nepovinné)
                                        faze: null, // fáze požadovaná pro otevření cílového objektu (nepovinné)
                                        banCurrentApp: true, // příznak zákazu použití aktuální fáze (nepovinné)
                                        noAppFail: false // příznak vyvolání výjimky při nenalezení cílové fáze (nepovinné)
                                    }, "OpenDetail" // název metody spuštěné po otevření nové záložky
                                    ).fail(() => {
                                        Gordic.Wfl.Dialogs.DetailDokumentuSpisu(undefined, { SimpleMode: true, DetailDto: { ixp: that.row.ixp } }, Gordic.Global.Enums.ModOtevreni.auto);
                                    });
                                }
                            }
                        }
                    });
                    this.filter_akce.typ = "ROZ";
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actDetail*"]));
                    this.actions.actDetail?.enabled(false);
                    this.actions.actDetail?.visible(false);
                    if (this.globals.Parametr_Zobrazeni_AG_Detailu_ROZ) {
                        this.actions.actDetail?.enabled(true);
                        this.actions.actDetail?.visible(true);
                    }
                    var $mainTable = $("<div>")
                        //.css("height", "100%")
                        .appendTo(mainForm)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        cellActivate(ev, ctx) {
                            that.row = $mainTable.ggrid("activeRow");
                            if (that.row !== null) {
                                that.element.trigger("adasubgridrowselected", { agenda: 50, data: that.row });
                            }
                        },
                        defaultAction: that.actions.actDetail,
                        //defaultAction: new GAction({
                        //    name: "gridRowSelectedAct",
                        //    run (ev, ctx) {
                        //        that.row = ctx.cellInfo.data;    //data, ze kterych byl vytvoren radek
                        //        // otevření nové záložky
                        //        Gordic.WebApp.Utility.openApp(
                        //            {
                        //                ixx1: that.row.ixp, // id cílového objektu v nově otevírané záložce
                        //                ixx2: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                        //                ixx3: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                        //                typAg: 50, // typ agendy cílového objektu (nepovinné)
                        //                faze: null,  // fáze požadovaná pro otevření cílového objektu (nepovinné)
                        //                banCurrentApp: true, // příznak zákazu použití aktuální fáze (nepovinné)
                        //                noAppFail: false // příznak vyvolání výjimky při nenalezení cílové fáze (nepovinné) 
                        //            },
                        //            "OpenDetail"            // název metody spuštěné po otevření nové záložky
                        //        ).fail(() => {
                        //            Wfl.Dialogs.DetailDokumentuSpisu(this.parentCnt, { SimpleMode: true, DetailDto: { ixp: that.row.ixp! } }, Global.Enums.ModOtevreni.auto);
                        //        });
                        //    }
                        //}),
                        searchColumns: ["ac"],
                        columns: new Gordic.Data.GridFormat()
                            .addTextColumn({
                            name: "ixp",
                            caption: "PID",
                            width: 130
                        })
                            .addTextColumn({
                            name: "ktg_typ_txt",
                            caption: "Typ dokladu",
                            width: 200
                        })
                            .addTextColumn({
                            name: "ac",
                            caption: "Agendové číslo",
                            width: 130
                        })
                            .addCurrencyColumn({
                            name: "c",
                            caption: "Částka",
                            width: 150
                        })
                            .addTextColumn({
                            name: "popis",
                            caption: "Popis",
                            width: 300
                        })
                    });
                    that.view_ISL = new Gordic.Isl.View(cnt.isl.Akce.listDokladyROZAkce({ filters: this.filter_akce }));
                    $mainTable.ggrid("setData", that.view_ISL);
                    //var view = new Gordic.Data.View(dataroz);
                    //$mainTable.ggrid("setData", view );
                }
            };
            GAkceRoz = __decorate([
                gcontent
            ], GAkceRoz);
            WebClient.GAkceRoz = GAkceRoz;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FrY2VSb3ouanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbIlNjcmlwdHMvR0FrY2VSb3oudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0VBT0U7Ozs7Ozs7QUFFRixJQUFVLE1BQU0sQ0FtSmY7QUFuSkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBbUpuQjtJQW5KZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBbUo3QjtRQW5Kb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUyxTQUFRLE9BQUEsWUFBWTtnQkFTdEMsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzlCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBRTVCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFFYixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7b0JBRWYsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRWxJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixTQUFTLEVBQUU7NEJBQ1AsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsV0FBVzs0QkFDcEMsT0FBTyxFQUFFLElBQUk7NEJBQ2IsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDVixnRkFBZ0Y7Z0NBRTVFLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztnQ0FDakIs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QUFJLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRTNDLDJDQUEyQztvQkFDM0MscUNBQXFDO2dCQUV6QyxDQUFDO2FBQ0osQ0FBQTtZQTlJWSxRQUFRO2dCQURwQixRQUFRO2VBQ0ksUUFBUSxDQThJcEI7WUE5SVksa0JBQVEsV0E4SXBCLENBQUE7UUFDTCxDQUFDLEVBbkpvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFtSjdCO0lBQUQsQ0FBQyxFQW5KZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBbUpuQjtBQUFELENBQUMsRUFuSlMsTUFBTSxLQUFOLE1BQU0sUUFtSmYiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkFkYS5XZWJDbGllbnQuR0FrY2VSb3ouanMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBHQWtjZVJveiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEppxZnDrSBJbGXEjWVrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMTYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAxNi0wMy0wMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG4qL1xyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5BZGEuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0FrY2VSb3ogZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwcml2YXRlIG1vZGVscm96OiBHb3JkaWMuQWRhLkludGVyZmFjZS5HUm96c3BpZERva2xhZHlEdG9bXTtcclxuICAgICAgICBwcml2YXRlIHJvdzogR29yZGljLkFkYS5JbnRlcmZhY2UuR1JvenNwaWREb2tsYWR5RHRvO1xyXG5cclxuICAgICAgICBwcml2YXRlIHZpZXdfSVNMOiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkFkYS5JbnRlcmZhY2UuR1JvenNwaWREb2tsYWR5RHRvPjtcclxuICAgICAgICBwcml2YXRlIGZpbHRlcl9ha2NlOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HQWdEb2tsYWR5RmlsdGVyRHRvO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZ2xvYmFsczogR29yZGljLkFkYS5XZWJDbGllbnQuRFRPLkdBZGFHbG9iYWxzRHRvO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyICR0YWIgPSAkKHRoaXMuY29udGVudERpdik7XHJcbiAgICAgICAgICAgIHZhciBkYXRhcm96ID0gdGhpcy5tb2RlbHJvejtcclxuXHJcbiAgICAgICAgICAgICR0YWIuZW1wdHkoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJzZXR1cFwiLCB7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0wLTEyLTBcIiB9KS5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0RGV0YWlsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEZXRhaWxcIiwgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LnJvdyA9IGN0eC5jZWxsSW5mby5kYXRhOyAgICAvL2RhdGEsIHplIGt0ZXJ5Y2ggYnlsIHZ5dHZvcmVuIHJhZGVrXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYV9hZ2VuZGEgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxzLlBhcmFtZXRyX1pvYnJhemVuaV9BR19EZXRhaWx1X1JPWikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYV9hZ2VuZGEgPSA1MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFfYWdlbmRhID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3RldsWZZW7DrSBub3bDqSB6w6Fsb8W+a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5XZWJBcHAuVXRpbGl0eS5vcGVuQXBwKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXh4MTogdGhhdC5yb3cuaXhwLCAvLyBpZCBjw61sb3bDqWhvIG9iamVrdHUgdiBub3bEmyBvdGV2w61yYW7DqSB6w6Fsb8W+Y2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXh4MjogbnVsbCwgIC8vIGRydWjDqSBpZCBjw61sb3bDqWhvIG9iamVrdHUgdiBwxZnDrXBhZMSbIHNsb8W+ZW7DqWhvIGtsw63EjWUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4eDM6IG51bGwsICAvLyBkcnVow6kgaWQgY8OtbG92w6lobyBvYmpla3R1IHYgcMWZw61wYWTEmyBzbG/FvmVuw6lobyBrbMOtxI1lIChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBBZzogNTAsIC8vIHR5cCBhZ2VuZHkgY8OtbG92w6lobyBvYmpla3R1IChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXplOiBudWxsLCAgLy8gZsOhemUgcG/FvmFkb3ZhbsOhIHBybyBvdGV2xZllbsOtIGPDrWxvdsOpaG8gb2JqZWt0dSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFuQ3VycmVudEFwcDogdHJ1ZSwgLy8gcMWZw616bmFrIHrDoWthenUgcG91xb5pdMOtIGFrdHXDoWxuw60gZsOhemUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQXBwRmFpbDogZmFsc2UgLy8gcMWZw616bmFrIHZ5dm9sw6Fuw60gdsO9amlta3kgcMWZaSBuZW5hbGV6ZW7DrSBjw61sb3bDqSBmw6F6ZSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiT3BlbkRldGFpbFwiICAgICAgICAgICAgLy8gbsOhemV2IG1ldG9keSBzcHXFoXTEm27DqSBwbyBvdGV2xZllbsOtIG5vdsOpIHrDoWxvxb5reVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXZmwuRGlhbG9ncy5EZXRhaWxEb2t1bWVudHVTcGlzdSh1bmRlZmluZWQgYXMgdW5rbm93biBhcyBHQ29udGVudCwgeyBTaW1wbGVNb2RlOiB0cnVlLCBEZXRhaWxEdG86IHsgaXhwOiB0aGF0LnJvdy5peHAhIH0gfSwgR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLmF1dG8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyX2FrY2UudHlwID0gXCJST1pcIjtcclxuXHJcbiAgICAgICAgICAgIC8vbmFzdGF2ZW7DrSBtZW51QmFydVxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3REZXRhaWwqXCJdKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3REZXRhaWw/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsPy52aXNpYmxlKGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFscy5QYXJhbWV0cl9ab2JyYXplbmlfQUdfRGV0YWlsdV9ST1opIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3REZXRhaWw/LmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsPy52aXNpYmxlKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgJG1haW5UYWJsZSA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLy8uY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKG1haW5Gb3JtKVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxBY3RpdmF0ZShldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucm93ID0gJG1haW5UYWJsZS5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQucm93ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQudHJpZ2dlcihcImFkYXN1YmdyaWRyb3dzZWxlY3RlZFwiLCB7IGFnZW5kYTogNTAsIGRhdGE6IHRoYXQucm93IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdERldGFpbCwgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgcnVuIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQucm93ID0gY3R4LmNlbGxJbmZvLmRhdGE7ICAgIC8vZGF0YSwgemUga3RlcnljaCBieWwgdnl0dm9yZW4gcmFkZWtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vIG90ZXbFmWVuw60gbm92w6kgesOhbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIEdvcmRpYy5XZWJBcHAuVXRpbGl0eS5vcGVuQXBwKFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGl4eDE6IHRoYXQucm93Lml4cCwgLy8gaWQgY8OtbG92w6lobyBvYmpla3R1IHYgbm92xJsgb3RldsOtcmFuw6kgesOhbG/FvmNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaXh4MjogbnVsbCwgIC8vIGRydWjDqSBpZCBjw61sb3bDqWhvIG9iamVrdHUgdiBwxZnDrXBhZMSbIHNsb8W+ZW7DqWhvIGtsw63EjWUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaXh4MzogbnVsbCwgIC8vIGRydWjDqSBpZCBjw61sb3bDqWhvIG9iamVrdHUgdiBwxZnDrXBhZMSbIHNsb8W+ZW7DqWhvIGtsw63EjWUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdHlwQWc6IDUwLCAvLyB0eXAgYWdlbmR5IGPDrWxvdsOpaG8gb2JqZWt0dSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBmYXplOiBudWxsLCAgLy8gZsOhemUgcG/FvmFkb3ZhbsOhIHBybyBvdGV2xZllbsOtIGPDrWxvdsOpaG8gb2JqZWt0dSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBiYW5DdXJyZW50QXBwOiB0cnVlLCAvLyBwxZnDrXpuYWsgesOha2F6dSBwb3XFvml0w60gYWt0dcOhbG7DrSBmw6F6ZSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBub0FwcEZhaWw6IGZhbHNlIC8vIHDFmcOtem5hayB2eXZvbMOhbsOtIHbDvWppbWt5IHDFmWkgbmVuYWxlemVuw60gY8OtbG92w6kgZsOhemUgKG5lcG92aW5uw6kpIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIFwiT3BlbkRldGFpbFwiICAgICAgICAgICAgLy8gbsOhemV2IG1ldG9keSBzcHXFoXTEm27DqSBwbyBvdGV2xZllbsOtIG5vdsOpIHrDoWxvxb5reVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICApLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgV2ZsLkRpYWxvZ3MuRGV0YWlsRG9rdW1lbnR1U3Bpc3UodGhpcy5wYXJlbnRDbnQsIHsgU2ltcGxlTW9kZTogdHJ1ZSwgRGV0YWlsRHRvOiB7IGl4cDogdGhhdC5yb3cuaXhwISB9IH0sIEdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5hdXRvKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfSksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IFtcImFjXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQSURcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImt0Z190eXBfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlR5cCBkb2tsYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJBZ2VuZG92w6kgxI3DrXNsb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwixIzDoXN0a2FcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQudmlld19JU0wgPSBuZXcgR29yZGljLklzbC5WaWV3KGNudC5pc2wuQWtjZS5saXN0RG9rbGFkeVJPWkFrY2UoeyBmaWx0ZXJzOiB0aGlzLmZpbHRlcl9ha2NlIH0pKTtcclxuXHJcbiAgICAgICAgICAgICRtYWluVGFibGUuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlld19JU0wpO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGRhdGFyb3opO1xyXG4gICAgICAgICAgICAvLyRtYWluVGFibGUuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcgKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
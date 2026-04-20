"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAkceBLK.js                                                        </Name>
//    <Description> GAkceBLK                                                                                  </Description>
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
            let GAkceBLK = class GAkceBLK extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    var datablk = this.modelblk;
                    $tab.empty();
                    var cnt = this;
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    this.actions.addRange({
                        actDetail: {
                            caption: "Detail", icon: "gi-detail",
                            enabled: true,
                            run: () => {
                                // that.row = ctx.cellInfo.data;    //data, ze kterych byl vytvoren radek
                                var a_agenda = 0;
                                var a_faze = "";
                                if (cnt.filter_akce.typ == "VFP") {
                                    if (this.globals.Parametr_Zobrazeni_AG_Detailu_VFP) {
                                        a_agenda = 580;
                                    }
                                }
                                if (cnt.filter_akce.typ == "EVZ") {
                                    if (this.globals.Parametr_Zobrazeni_AG_Detailu_EVZ) {
                                        a_agenda = 510;
                                    }
                                }
                                if (cnt.filter_akce.typ == "RZA") {
                                    if (this.globals.Parametr_Zobrazeni_AG_Detailu_RZA) {
                                        a_agenda = 520;
                                    }
                                }
                                if (cnt.filter_akce.typ == "EPO") {
                                    if (this.globals.Parametr_Zobrazeni_AG_Detailu_EPO) {
                                        a_agenda = 620;
                                    }
                                }
                                if (a_agenda > 0) {
                                    // otevření nové záložky
                                    Gordic.WebApp.Utility.openApp({
                                        ixx1: that.row.ixs_pri, // id cílového objektu v nově otevírané záložce
                                        ixx2: null, // druhé id cílového objektu v případě složeného klíče (nepovinné)
                                        ixx3: null, // druhé id cílového objektu v případě složeného klíče (nepovinné)
                                        typAg: a_agenda, // typ agendy cílového objektu (nepovinné)
                                        faze: null, // fáze požadovaná pro otevření cílového objektu (nepovinné)
                                        banCurrentApp: true, // příznak zákazu použití aktuální fáze (nepovinné)
                                        noAppFail: false // příznak vyvolání výjimky při nenalezení cílové fáze (nepovinné)
                                    }, "OpenDetail" // název metody spuštěné po otevření nové záložky
                                    ).fail(() => {
                                        Gordic.Wfl.Dialogs.DetailDokumentuSpisu(undefined, { SimpleMode: true, DetailDto: { ixp: that.row.ixs_pri } }, Gordic.Global.Enums.ModOtevreni.auto);
                                    });
                                }
                            }
                        }
                    });
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actDetail*"]));
                    this.actions.actDetail?.enabled(false);
                    this.actions.actDetail?.visible(false);
                    if (cnt.filter_akce.typ == "EVZ") {
                        if (this.globals.Parametr_Zobrazeni_AG_Detailu_EVZ) {
                            this.actions.actDetail?.enabled(true);
                            this.actions.actDetail?.visible(true);
                        }
                    }
                    if (cnt.filter_akce.typ == "VFP") {
                        if (this.globals.Parametr_Zobrazeni_AG_Detailu_VFP) {
                            this.actions.actDetail?.enabled(true);
                            this.actions.actDetail?.visible(true);
                        }
                    }
                    if (cnt.filter_akce.typ == "EPO") {
                        if (this.globals.Parametr_Zobrazeni_AG_Detailu_EPO) {
                            this.actions.actDetail?.enabled(true);
                            this.actions.actDetail?.visible(true);
                        }
                    }
                    if (cnt.filter_akce.typ == "RZA") {
                        if (this.globals.Parametr_Zobrazeni_AG_Detailu_RZA) {
                            this.actions.actDetail?.enabled(true);
                            this.actions.actDetail?.visible(true);
                        }
                    }
                    var $mainTable = $("<div>")
                        //.css("height", "100%")
                        .appendTo(mainForm)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        cellActivate: function (ev, ctx) {
                            that.row = $mainTable.ggrid("activeRow");
                            if (that.row !== null) {
                                that.element.trigger("adasubgridrowselected", { agenda: 50, data: that.row });
                            }
                        },
                        defaultAction: that.actions.actDetail,
                        //defaultAction: new GAction({
                        //    name: "gridRowSelectedAct",
                        //    run: function (ev, ctx) {
                        //        that.row = ctx.cellInfo.data;    //data, ze kterych byl vytvoren radek
                        //        var a_agenda = 0;
                        //        var a_faze = "";
                        //        if (cnt.filter_akce.typ == "VFP") {
                        //            a_agenda = 580;
                        //        }
                        //        if (cnt.filter_akce.typ == "EVZ") {
                        //            a_agenda = 510;
                        //        }
                        //        if (cnt.filter_akce.typ == "EPO") {
                        //            a_agenda = 620;
                        //        }
                        //        if (a_agenda > 0) {
                        //            // otevření nové záložky
                        //            Gordic.WebApp.Utility.openApp(
                        //                {
                        //                    ixx1: that.row.ixs_pri, // id cílového objektu v nově otevírané záložce
                        //                    ixx2: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                        //                    ixx3: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                        //                    typAg: a_agenda,  // typ agendy cílového objektu (nepovinné)
                        //                    faze: null,  // fáze požadovaná pro otevření cílového objektu (nepovinné)
                        //                    banCurrentApp: true, // příznak zákazu použití aktuální fáze (nepovinné)
                        //                    noAppFail: false // příznak vyvolání výjimky při nenalezení cílové fáze (nepovinné) 
                        //                },
                        //                "OpenDetail"            // název metody spuštěné po otevření nové záložky
                        //            ).fail(() => {
                        //                Wfl.Dialogs.DetailDokumentuSpisu(this.parentCnt, { SimpleMode: true, DetailDto: { ixp: that.row.ixs_pri! } }, Global.Enums.ModOtevreni.auto);
                        //            });
                        //        }
                        //    }
                        //}),
                        searchColumns: ["ac"],
                        columns: new Gordic.Data.GridFormat()
                            .addTextColumn({
                            name: "ixs_pri",
                            caption: "PID",
                            width: 130
                        })
                            .addTextColumn({
                            name: "ktg_typ_txt",
                            caption: "Typ",
                            width: 200
                        })
                            .addTextColumn({
                            name: "ac_ag",
                            caption: "Agendové číslo",
                            width: 130
                        })
                            .addTextColumn({
                            name: ((this.filter_akce.typ == "EVZ") || (this.filter_akce.typ == "RZA")) ? "ac_ver_zak" : "ac",
                            caption: "Evidenční číslo",
                            width: 130
                        })
                            .addCurrencyColumn({
                            name: "c",
                            caption: "Částka",
                            width: 150
                        })
                            .addTextColumn({
                            name: "nazev",
                            caption: "Popis",
                            width: 300
                        })
                    });
                    if (this.filter_akce.typ == "EVZ") {
                        that.view_ISL = new Gordic.Isl.View(this.isl.Akce.listDokladyEVZAkce({ filters: this.filter_akce }));
                    }
                    if (this.filter_akce.typ == "RZA") {
                        that.view_ISL = new Gordic.Isl.View(this.isl.Akce.listDokladyRZAAkce({ filters: this.filter_akce }));
                    }
                    if (this.filter_akce.typ == "VFP") {
                        that.view_ISL = new Gordic.Isl.View(this.isl.Akce.listDokladyVFPAkce({ filters: this.filter_akce }));
                    }
                    if (this.filter_akce.typ == "EPO") {
                        that.view_ISL = new Gordic.Isl.View(this.isl.Akce.listDokladyEPOAkce({ filters: this.filter_akce }));
                    }
                    $mainTable.ggrid("setData", that.view_ISL);
                    //var view = new Gordic.Data.View(datablk);
                    //$mainTable.ggrid("setData", view );
                }
            };
            GAkceBLK = __decorate([
                gcontent
            ], GAkceBLK);
            WebClient.GAkceBLK = GAkceBLK;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FrY2VCTEsuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbIlNjcmlwdHMvR0FrY2VCTEsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0VBT0U7Ozs7Ozs7QUFFRixJQUFVLE1BQU0sQ0FnT2Y7QUFoT0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBZ09uQjtJQWhPZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBZ083QjtRQWhPb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUyxTQUFRLE9BQUEsWUFBWTtnQkFTdEMsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzlCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBRTVCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFFYixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7b0JBRWYsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRWxJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixTQUFTLEVBQUU7NEJBQ1AsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsV0FBVzs0QkFDcEMsT0FBTyxFQUFFLElBQUk7NEJBQ2IsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDRix5RUFBeUU7Z0NBRXpFLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztnQ0FDakIs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QUFILFVBQUcsS0FBSCxVQUFHLFFBZ09uQjtBQUFELENBQUMsRUFoT1MsTUFBTSxLQUFOLE1BQU0sUUFnT2YiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkFkYS5XZWJDbGllbnQuR0FrY2VCTEsuanMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBHQWtjZUJMSyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEppxZnDrSBJbGXEjWVrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMTYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAxNi0wMy0wMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG4qL1xyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5BZGEuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0FrY2VCTEsgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwcml2YXRlIG1vZGVsYmxrOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HRXZ6c3ByaURva2xhZHlEdG9bXTtcclxuICAgICAgICBwcml2YXRlIHJvdzogR29yZGljLkFkYS5JbnRlcmZhY2UuR0V2enNwcmlEb2tsYWR5RHRvO1xyXG5cclxuICAgICAgICBwcml2YXRlIHZpZXdfSVNMOiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkFkYS5JbnRlcmZhY2UuR0V2enNwcmlEb2tsYWR5RHRvPjtcclxuICAgICAgICBwcml2YXRlIGZpbHRlcl9ha2NlOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HQWdEb2tsYWR5RmlsdGVyRHRvO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZ2xvYmFsczogR29yZGljLkFkYS5XZWJDbGllbnQuRFRPLkdBZGFHbG9iYWxzRHRvO1xyXG4gICAgICAgIFxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgJHRhYiA9ICQodGhpcy5jb250ZW50RGl2KTtcclxuICAgICAgICAgICAgdmFyIGRhdGFibGsgPSB0aGlzLm1vZGVsYmxrO1xyXG5cclxuICAgICAgICAgICAgJHRhYi5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNudCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWFpbkZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcInNldHVwXCIsIHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTAtMTItMFwiIH0pLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3REZXRhaWw6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRldGFpbFwiLCBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGF0LnJvdyA9IGN0eC5jZWxsSW5mby5kYXRhOyAgICAvL2RhdGEsIHplIGt0ZXJ5Y2ggYnlsIHZ5dHZvcmVuIHJhZGVrXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFfYWdlbmRhID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhX2ZhemUgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbnQuZmlsdGVyX2FrY2UudHlwID09IFwiVkZQXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxzLlBhcmFtZXRyX1pvYnJhemVuaV9BR19EZXRhaWx1X1ZGUCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhX2FnZW5kYSA9IDU4MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNudC5maWx0ZXJfYWtjZS50eXAgPT0gXCJFVlpcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdsb2JhbHMuUGFyYW1ldHJfWm9icmF6ZW5pX0FHX0RldGFpbHVfRVZaKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFfYWdlbmRhID0gNTEwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY250LmZpbHRlcl9ha2NlLnR5cCA9PSBcIlJaQVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFscy5QYXJhbWV0cl9ab2JyYXplbmlfQUdfRGV0YWlsdV9SWkEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYV9hZ2VuZGEgPSA1MjA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbnQuZmlsdGVyX2FrY2UudHlwID09IFwiRVBPXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxzLlBhcmFtZXRyX1pvYnJhemVuaV9BR19EZXRhaWx1X0VQTykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhX2FnZW5kYSA9IDYyMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFfYWdlbmRhID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG90ZXbFmWVuw60gbm92w6kgesOhbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLldlYkFwcC5VdGlsaXR5Lm9wZW5BcHAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4eDE6IHRoYXQucm93Lml4c19wcmksIC8vIGlkIGPDrWxvdsOpaG8gb2JqZWt0dSB2IG5vdsSbIG90ZXbDrXJhbsOpIHrDoWxvxb5jZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXh4MjogbnVsbCwgIC8vIGRydWjDqSBpZCBjw61sb3bDqWhvIG9iamVrdHUgdiBwxZnDrXBhZMSbIHNsb8W+ZW7DqWhvIGtsw63EjWUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHgzOiBudWxsLCAgLy8gZHJ1aMOpIGlkIGPDrWxvdsOpaG8gb2JqZWt0dSB2IHDFmcOtcGFkxJsgc2xvxb5lbsOpaG8ga2zDrcSNZSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cEFnOiBhX2FnZW5kYSwgIC8vIHR5cCBhZ2VuZHkgY8OtbG92w6lobyBvYmpla3R1IChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF6ZTogbnVsbCwgIC8vIGbDoXplIHBvxb5hZG92YW7DoSBwcm8gb3RldsWZZW7DrSBjw61sb3bDqWhvIG9iamVrdHUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYW5DdXJyZW50QXBwOiB0cnVlLCAvLyBwxZnDrXpuYWsgesOha2F6dSBwb3XFvml0w60gYWt0dcOhbG7DrSBmw6F6ZSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vQXBwRmFpbDogZmFsc2UgLy8gcMWZw616bmFrIHZ5dm9sw6Fuw60gdsO9amlta3kgcMWZaSBuZW5hbGV6ZW7DrSBjw61sb3bDqSBmw6F6ZSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJPcGVuRGV0YWlsXCIgICAgICAgICAgICAvLyBuw6F6ZXYgbWV0b2R5IHNwdcWhdMSbbsOpIHBvIG90ZXbFmWVuw60gbm92w6kgesOhbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV2ZsLkRpYWxvZ3MuRGV0YWlsRG9rdW1lbnR1U3Bpc3UodW5kZWZpbmVkIGFzIHVua25vd24gYXMgR0NvbnRlbnQsIHsgU2ltcGxlTW9kZTogdHJ1ZSwgRGV0YWlsRHRvOiB7IGl4cDogdGhhdC5yb3cuaXhzX3ByaSEgfSB9LCBHbG9iYWwuRW51bXMuTW9kT3RldnJlbmkuYXV0byk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIG1lbnVCYXJ1XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdERldGFpbCpcIl0pKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3REZXRhaWw/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsPy52aXNpYmxlKGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKGNudC5maWx0ZXJfYWtjZS50eXAgPT0gXCJFVlpcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFscy5QYXJhbWV0cl9ab2JyYXplbmlfQUdfRGV0YWlsdV9FVlopIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsPy5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3REZXRhaWw/LnZpc2libGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNudC5maWx0ZXJfYWtjZS50eXAgPT0gXCJWRlBcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFscy5QYXJhbWV0cl9ab2JyYXplbmlfQUdfRGV0YWlsdV9WRlApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsPy5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3REZXRhaWw/LnZpc2libGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNudC5maWx0ZXJfYWtjZS50eXAgPT0gXCJFUE9cIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFscy5QYXJhbWV0cl9ab2JyYXplbmlfQUdfRGV0YWlsdV9FUE8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsPy5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3REZXRhaWw/LnZpc2libGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNudC5maWx0ZXJfYWtjZS50eXAgPT0gXCJSWkFcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFscy5QYXJhbWV0cl9ab2JyYXplbmlfQUdfRGV0YWlsdV9SWkEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsPy5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3REZXRhaWw/LnZpc2libGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciAkbWFpblRhYmxlID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAvLy5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8obWFpbkZvcm0pXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbEFjdGl2YXRlOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJvdyA9ICRtYWluVGFibGUuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnJvdyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LnRyaWdnZXIoXCJhZGFzdWJncmlkcm93c2VsZWN0ZWRcIiwgeyBhZ2VuZGE6IDUwLCBkYXRhOiB0aGF0LnJvdyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoYXQuYWN0aW9ucy5hY3REZXRhaWwsIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2RlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5yb3cgPSBjdHguY2VsbEluZm8uZGF0YTsgICAgLy9kYXRhLCB6ZSBrdGVyeWNoIGJ5bCB2eXR2b3JlbiByYWRla1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB2YXIgYV9hZ2VuZGEgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB2YXIgYV9mYXplID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmIChjbnQuZmlsdGVyX2FrY2UudHlwID09IFwiVkZQXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGFfYWdlbmRhID0gNTgwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAoY250LmZpbHRlcl9ha2NlLnR5cCA9PSBcIkVWWlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBhX2FnZW5kYSA9IDUxMDtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKGNudC5maWx0ZXJfYWtjZS50eXAgPT0gXCJFUE9cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgYV9hZ2VuZGEgPSA2MjA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmIChhX2FnZW5kYSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vIG90ZXbFmWVuw60gbm92w6kgesOhbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBHb3JkaWMuV2ViQXBwLlV0aWxpdHkub3BlbkFwcChcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGl4eDE6IHRoYXQucm93Lml4c19wcmksIC8vIGlkIGPDrWxvdsOpaG8gb2JqZWt0dSB2IG5vdsSbIG90ZXbDrXJhbsOpIHrDoWxvxb5jZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBpeHgyOiBudWxsLCAgLy8gZHJ1aMOpIGlkIGPDrWxvdsOpaG8gb2JqZWt0dSB2IHDFmcOtcGFkxJsgc2xvxb5lbsOpaG8ga2zDrcSNZSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaXh4MzogbnVsbCwgIC8vIGRydWjDqSBpZCBjw61sb3bDqWhvIG9iamVrdHUgdiBwxZnDrXBhZMSbIHNsb8W+ZW7DqWhvIGtsw63EjWUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHR5cEFnOiBhX2FnZW5kYSwgIC8vIHR5cCBhZ2VuZHkgY8OtbG92w6lobyBvYmpla3R1IChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBmYXplOiBudWxsLCAgLy8gZsOhemUgcG/FvmFkb3ZhbsOhIHBybyBvdGV2xZllbsOtIGPDrWxvdsOpaG8gb2JqZWt0dSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgYmFuQ3VycmVudEFwcDogdHJ1ZSwgLy8gcMWZw616bmFrIHrDoWthenUgcG91xb5pdMOtIGFrdHXDoWxuw60gZsOhemUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIG5vQXBwRmFpbDogZmFsc2UgLy8gcMWZw616bmFrIHZ5dm9sw6Fuw60gdsO9amlta3kgcMWZaSBuZW5hbGV6ZW7DrSBjw61sb3bDqSBmw6F6ZSAobmVwb3Zpbm7DqSkgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBcIk9wZW5EZXRhaWxcIiAgICAgICAgICAgIC8vIG7DoXpldiBtZXRvZHkgc3B1xaF0xJtuw6kgcG8gb3RldsWZZW7DrSBub3bDqSB6w6Fsb8W+a3lcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICkuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgV2ZsLkRpYWxvZ3MuRGV0YWlsRG9rdW1lbnR1U3Bpc3UodGhpcy5wYXJlbnRDbnQsIHsgU2ltcGxlTW9kZTogdHJ1ZSwgRGV0YWlsRHRvOiB7IGl4cDogdGhhdC5yb3cuaXhzX3ByaSEgfSB9LCBHbG9iYWwuRW51bXMuTW9kT3RldnJlbmkuYXV0byk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vfSksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IFtcImFjXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19wcmlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUElEXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdGdfdHlwX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJUeXBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjX2FnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkFnZW5kb3bDqSDEjcOtc2xvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogKCh0aGlzLmZpbHRlcl9ha2NlLnR5cCA9PSBcIkVWWlwiKSB8fCAodGhpcy5maWx0ZXJfYWtjZS50eXAgPT0gXCJSWkFcIikpPyBcImFjX3Zlcl96YWtcIiA6IFwiYWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRXZpZGVuxI1uw60gxI3DrXNsb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwixIzDoXN0a2FcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlcl9ha2NlLnR5cCA9PSBcIkVWWlwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMID0gbmV3IEdvcmRpYy5Jc2wuVmlldyh0aGlzLmlzbC5Ba2NlLmxpc3REb2tsYWR5RVZaQWtjZSh7IGZpbHRlcnM6IHRoaXMuZmlsdGVyX2FrY2UgfSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlcl9ha2NlLnR5cCA9PSBcIlJaQVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMID0gbmV3IEdvcmRpYy5Jc2wuVmlldyh0aGlzLmlzbC5Ba2NlLmxpc3REb2tsYWR5UlpBQWtjZSh7IGZpbHRlcnM6IHRoaXMuZmlsdGVyX2FrY2UgfSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlcl9ha2NlLnR5cCA9PSBcIlZGUFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMID0gbmV3IEdvcmRpYy5Jc2wuVmlldyh0aGlzLmlzbC5Ba2NlLmxpc3REb2tsYWR5VkZQQWtjZSh7IGZpbHRlcnM6IHRoaXMuZmlsdGVyX2FrY2UgfSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlcl9ha2NlLnR5cCA9PSBcIkVQT1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMID0gbmV3IEdvcmRpYy5Jc2wuVmlldyh0aGlzLmlzbC5Ba2NlLmxpc3REb2tsYWR5RVBPQWtjZSh7IGZpbHRlcnM6IHRoaXMuZmlsdGVyX2FrY2UgfSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkbWFpblRhYmxlLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXdfSVNMKTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkYXRhYmxrKTtcclxuICAgICAgICAgICAgLy8kbWFpblRhYmxlLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3ICk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19
"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAkceBPL.js                                                        </Name>
//    <Description> GAkceBPL                                                                                  </Description>
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
            let GAkceBPL = class GAkceBPL extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    var data = this.modelBPL;
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
                                if (cnt.filter_akce.typ == "KDF") {
                                    if (this.globals.Parametr_Zobrazeni_AG_Detailu_KDF) {
                                        a_agenda = 70;
                                    }
                                }
                                if (cnt.filter_akce.typ == "KOF") {
                                    if (this.globals.Parametr_Zobrazeni_AG_Detailu_KOF) {
                                        a_agenda = 80;
                                    }
                                }
                                if (cnt.filter_akce.typ == "POU") {
                                    if (this.globals.Parametr_Zobrazeni_AG_Detailu_POU) {
                                        a_agenda = 180;
                                    }
                                }
                                if (cnt.filter_akce.typ == "PRE") {
                                    if (this.globals.Parametr_Zobrazeni_AG_Detailu_PRE) {
                                        a_agenda = 230;
                                    }
                                }
                                if (a_agenda > 0) {
                                    // otevření nové záložky
                                    Gordic.WebApp.Utility.openApp({
                                        ixx1: that.row.ixp, // id cílového objektu v nově otevírané záložce
                                        ixx2: null, // druhé id cílového objektu v případě složeného klíče (nepovinné)
                                        ixx3: null, // druhé id cílového objektu v případě složeného klíče (nepovinné)
                                        typAg: a_agenda, // typ agendy cílového objektu (nepovinné)
                                        faze: null, // fáze požadovaná pro otevření cílového objektu (nepovinné)
                                        banCurrentApp: true, // příznak zákazu použití aktuální fáze (nepovinné)
                                        noAppFail: false // příznak vyvolání výjimky při nenalezení cílové fáze (nepovinné) 
                                    }, "OpenDetail" // název metody spuštěné po otevření nové záložky
                                    ).fail(() => {
                                        Gordic.Wfl.Dialogs.DetailDokumentuSpisu(undefined, { SimpleMode: true, DetailDto: { ixp: that.row.ixp } }, Gordic.Global.Enums.ModOtevreni.auto);
                                    });
                                }
                                else {
                                    // Wfl.Dialogs.DetailDokumentuSpisu(undefined as unknown as GContent, { SimpleMode: true, DetailDto: { ixp: that.row.ixp! } }, Global.Enums.ModOtevreni.auto);
                                }
                            }
                        }
                    });
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actDetail*"]));
                    this.actions.actDetail?.enabled(false);
                    this.actions.actDetail?.visible(false);
                    if (cnt.filter_akce.typ == "KDF") {
                        if (this.globals.Parametr_Zobrazeni_AG_Detailu_KDF) {
                            this.actions.actDetail?.enabled(true);
                            this.actions.actDetail?.visible(true);
                        }
                        //    else {
                        //        this.actions.actDetail?.update({ tooltip: "Agenda nemá povoleno zobrazení agendového detailu" });
                        //    }
                    }
                    if (cnt.filter_akce.typ == "KOF") {
                        if (this.globals.Parametr_Zobrazeni_AG_Detailu_KOF) {
                            this.actions.actDetail?.enabled(true);
                            this.actions.actDetail?.visible(true);
                        }
                    }
                    if (cnt.filter_akce.typ == "POU") {
                        if (this.globals.Parametr_Zobrazeni_AG_Detailu_POU) {
                            this.actions.actDetail?.enabled(true);
                            this.actions.actDetail?.visible(true);
                        }
                    }
                    if (cnt.filter_akce.typ == "PRE") {
                        if (this.globals.Parametr_Zobrazeni_AG_Detailu_PRE) {
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
                            if (that.row != null) {
                                that.element.trigger("adasubgridrowselected", { agenda: 100, data: that.row });
                            }
                        },
                        defaultAction: that.actions.actDetail,
                        //    new GAction({
                        //    name: "gridRowSelectedAct",
                        //    run: function (ev, ctx) {
                        //        that.row = ctx.cellInfo.data;    //data, ze kterych byl vytvoren radek
                        //        var a_agenda = 0;
                        //        if (cnt.filter_akce.typ == "KDF") {
                        //            a_agenda = 70;
                        //        }
                        //        if (cnt.filter_akce.typ == "KOF") {
                        //            a_agenda = 80;
                        //        }
                        //        if (cnt.filter_akce.typ == "POU") {
                        //            a_agenda = 180;
                        //        }
                        //        if (cnt.filter_akce.typ == "PRE") {
                        //            a_agenda = 230;
                        //        }
                        //        if (a_agenda > 0) {
                        //            // otevření nové záložky
                        //            Gordic.WebApp.Utility.openApp(
                        //                {
                        //                    ixx1: that.row.ixp, // id cílového objektu v nově otevírané záložce
                        //                    ixx2: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                        //                    ixx3: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                        //                    typAg: a_agenda,  // typ agendy cílového objektu (nepovinné)
                        //                    faze: null,  // fáze požadovaná pro otevření cílového objektu (nepovinné)
                        //                    banCurrentApp: true, // příznak zákazu použití aktuální fáze (nepovinné)
                        //                    noAppFail: false // příznak vyvolání výjimky při nenalezení cílové fáze (nepovinné) 
                        //                },
                        //                "OpenDetail"            // název metody spuštěné po otevření nové záložky
                        //            ).fail(() => {
                        //                Wfl.Dialogs.DetailDokumentuSpisu(this.parentCnt, { SimpleMode: true, DetailDto: { ixp: that.row.ixp! } }, Global.Enums.ModOtevreni.auto);
                        //            });
                        //        }
                        //    }
                        //}),
                        searchColumns: ["ac", "esu_txt"],
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
                            .addTextColumn({
                            name: "esu_txt",
                            caption: "Subjekt",
                            width: 300
                        })
                            .addCurrencyColumn({
                            name: "c_mena",
                            caption: "Částka",
                            width: 150
                        })
                            .addTextColumn({
                            name: "mena_txt",
                            caption: "Měna",
                            width: 50
                        })
                            .addDateColumn({
                            name: "dat_evid",
                            caption: "Datum evidence",
                            width: 120
                        })
                            .addDateColumn({
                            name: "dat_spl",
                            caption: "Datum splatnosti",
                            width: 120
                        })
                            .addTextColumn({
                            name: "s_uhr_txt",
                            caption: "Stav úhrady",
                            width: 160
                        })
                            .addDateColumn({
                            name: "dat_uhr",
                            caption: "Datum úhrady",
                            tooltipTemplate: "Datum poslední nebo očekávané úhrady",
                            width: 120
                        })
                            .addTextColumn({
                            name: "ac_esu",
                            caption: "Číslo dokladu dodavatele",
                            width: 190
                        })
                            .addTextColumn({
                            name: "vec",
                            caption: "Věc",
                            width: 300
                        })
                            .addTextColumn({
                            name: "popis",
                            caption: "Popis",
                            width: 300
                        })
                    });
                    that.view_ISL = new Gordic.Isl.View(this.isl.Akce.listDokladyBPLAkce({ filters: this.filter_akce }));
                    $mainTable.ggrid("setData", that.view_ISL);
                    //var view = new Gordic.Data.View(data);
                    //$mainTable.ggrid("setData", view );
                }
            };
            GAkceBPL = __decorate([
                gcontent
            ], GAkceBPL);
            WebClient.GAkceBPL = GAkceBPL;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FrY2VCUEwuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbIlNjcmlwdHMvR0FrY2VCUEwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0VBT0U7Ozs7Ozs7QUFFRixJQUFVLE1BQU0sQ0E0UGY7QUE1UEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNFBuQjtJQTVQZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBNFA3QjtRQTVQb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUyxTQUFRLE9BQUEsWUFBWTtnQkFTdEMsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzlCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBRXpCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFFYixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7b0JBRWYsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRWxJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixTQUFTLEVBQUU7NEJBQ1AsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsV0FBVzs0QkFDcEMsT0FBTyxFQUFFLElBQUk7NEJBQ2IsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTix5RUFBeUU7Z0NBRXpFLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztnQ0FFakIs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QUNmLE9BQU8sRUFBRSxjQUFjOzRCQUN2QixlQUFlLEVBQUUsc0NBQXNDOzRCQUN2RCxLQUFLLEVBQUUsR0FBRzt5QkFDYixDQUFDOzZCQUNELGFBQWEsQ0FBQzs0QkFDWCxJQUFJLEVBQUUsUUFBUTs0QkFDZCxPQUFPLEVBQUUsMEJBQTBCOzRCQUNuQyxLQUFLLEVBQUUsR0FBRzt5QkFDYixDQUFDOzZCQUNELGFBQWEsQ0FBQzs0QkFDWCxJQUFJLEVBQUUsS0FBSzs0QkFDWCxPQUFPLEVBQUUsS0FBSzs0QkFDZCxLQUFLLEVBQUUsR0FBRzt5QkFDYixDQUFDOzZCQUNELGFBQWEsQ0FBQzs0QkFDWCxJQUFJLEVBQUUsT0FBTzs0QkFDYixPQUFPLEVBQUUsT0FBTzs0QkFDaEIsS0FBSyxFQUFFLEdBQUc7eUJBQ2IsQ0FBQztxQkFFakIsQ0FBQyxDQUFDO29CQUdQLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUVyRyxVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzNDLHdDQUF3QztvQkFDeEMscUNBQXFDO2dCQUV6QyxDQUFDO2FBQ0osQ0FBQTtZQXZQWSxRQUFRO2dCQURwQixRQUFRO2VBQ0ksUUFBUSxDQXVQcEI7WUF2UFksa0JBQVEsV0F1UHBCLENBQUE7UUFDTCxDQUFDLEVBNVBvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE0UDdCO0lBQUQsQ0FBQyxFQTVQZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBNFBuQjtBQUFELENBQUMsRUE1UFMsTUFBTSxLQUFOLE1BQU0sUUE0UGYiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkFkYS5XZWJDbGllbnQuR0FrY2VCUEwuanMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBHQWtjZUJQTCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEppxZnDrSBJbGXEjWVrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMTYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAxNi0wMy0wMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG4qL1xyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5BZGEuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0FrY2VCUEwgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwcml2YXRlIG1vZGVsQlBMOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HS2Rmc3BpZER0b1tdO1xyXG4gICAgICAgIHByaXZhdGUgcm93OiBHb3JkaWMuQWRhLkludGVyZmFjZS5HS2Rmc3BpZER0bztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3X0lTTDogR29yZGljLklzbC5WaWV3PEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdLZGZzcGlkRHRvPjtcclxuICAgICAgICBwcml2YXRlIGZpbHRlcl9ha2NlOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HQWdEb2tsYWR5RmlsdGVyRHRvO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZ2xvYmFsczogR29yZGljLkFkYS5XZWJDbGllbnQuRFRPLkdBZGFHbG9iYWxzRHRvO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyICR0YWIgPSAkKHRoaXMuY29udGVudERpdik7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5tb2RlbEJQTDtcclxuXHJcbiAgICAgICAgICAgICR0YWIuZW1wdHkoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJzZXR1cFwiLCB7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0wLTEyLTBcIiB9KS5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0RGV0YWlsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEZXRhaWxcIiwgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGF0LnJvdyA9IGN0eC5jZWxsSW5mby5kYXRhOyAgICAvL2RhdGEsIHplIGt0ZXJ5Y2ggYnlsIHZ5dHZvcmVuIHJhZGVrXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYV9hZ2VuZGEgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNudC5maWx0ZXJfYWtjZS50eXAgPT0gXCJLREZcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFscy5QYXJhbWV0cl9ab2JyYXplbmlfQUdfRGV0YWlsdV9LREYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhX2FnZW5kYSA9IDcwOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY250LmZpbHRlcl9ha2NlLnR5cCA9PSBcIktPRlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxzLlBhcmFtZXRyX1pvYnJhemVuaV9BR19EZXRhaWx1X0tPRikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFfYWdlbmRhID0gODA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNudC5maWx0ZXJfYWtjZS50eXAgPT0gXCJQT1VcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFscy5QYXJhbWV0cl9ab2JyYXplbmlfQUdfRGV0YWlsdV9QT1UgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYV9hZ2VuZGEgPSAxODA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNudC5maWx0ZXJfYWtjZS50eXAgPT0gXCJQUkVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFscy5QYXJhbWV0cl9ab2JyYXplbmlfQUdfRGV0YWlsdV9QUkUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhX2FnZW5kYSA9IDIzMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFfYWdlbmRhID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG90ZXbFmWVuw60gbm92w6kgesOhbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuV2ViQXBwLlV0aWxpdHkub3BlbkFwcChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4eDE6IHRoYXQucm93Lml4cCwgLy8gaWQgY8OtbG92w6lobyBvYmpla3R1IHYgbm92xJsgb3RldsOtcmFuw6kgesOhbG/FvmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4eDI6IG51bGwsICAvLyBkcnVow6kgaWQgY8OtbG92w6lobyBvYmpla3R1IHYgcMWZw61wYWTEmyBzbG/FvmVuw6lobyBrbMOtxI1lIChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHgzOiBudWxsLCAgLy8gZHJ1aMOpIGlkIGPDrWxvdsOpaG8gb2JqZWt0dSB2IHDFmcOtcGFkxJsgc2xvxb5lbsOpaG8ga2zDrcSNZSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwQWc6IGFfYWdlbmRhLCAgLy8gdHlwIGFnZW5keSBjw61sb3bDqWhvIG9iamVrdHUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhemU6IG51bGwsICAvLyBmw6F6ZSBwb8W+YWRvdmFuw6EgcHJvIG90ZXbFmWVuw60gY8OtbG92w6lobyBvYmpla3R1IChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYW5DdXJyZW50QXBwOiB0cnVlLCAvLyBwxZnDrXpuYWsgesOha2F6dSBwb3XFvml0w60gYWt0dcOhbG7DrSBmw6F6ZSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9BcHBGYWlsOiBmYWxzZSAvLyBwxZnDrXpuYWsgdnl2b2zDoW7DrSB2w71qaW1reSBwxZlpIG5lbmFsZXplbsOtIGPDrWxvdsOpIGbDoXplIChuZXBvdmlubsOpKSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiT3BlbkRldGFpbFwiICAgICAgICAgICAgLy8gbsOhemV2IG1ldG9keSBzcHXFoXTEm27DqSBwbyBvdGV2xZllbsOtIG5vdsOpIHrDoWxvxb5reVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXZmwuRGlhbG9ncy5EZXRhaWxEb2t1bWVudHVTcGlzdSh1bmRlZmluZWQgYXMgdW5rbm93biBhcyBHQ29udGVudCwgeyBTaW1wbGVNb2RlOiB0cnVlLCBEZXRhaWxEdG86IHsgaXhwOiB0aGF0LnJvdy5peHAhIH0gfSwgR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLmF1dG8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXZmwuRGlhbG9ncy5EZXRhaWxEb2t1bWVudHVTcGlzdSh1bmRlZmluZWQgYXMgdW5rbm93biBhcyBHQ29udGVudCwgeyBTaW1wbGVNb2RlOiB0cnVlLCBEZXRhaWxEdG86IHsgaXhwOiB0aGF0LnJvdy5peHAhIH0gfSwgR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLmF1dG8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gbWVudUJhcnVcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0RGV0YWlsKlwiXSkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdERldGFpbD8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3REZXRhaWw/LnZpc2libGUoZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoY250LmZpbHRlcl9ha2NlLnR5cCA9PSBcIktERlwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxzLlBhcmFtZXRyX1pvYnJhemVuaV9BR19EZXRhaWx1X0tERikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3REZXRhaWw/LmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdERldGFpbD8udmlzaWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsPy51cGRhdGUoeyB0b29sdGlwOiBcIkFnZW5kYSBuZW3DoSBwb3ZvbGVubyB6b2JyYXplbsOtIGFnZW5kb3bDqWhvIGRldGFpbHVcIiB9KTtcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjbnQuZmlsdGVyX2FrY2UudHlwID09IFwiS09GXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdsb2JhbHMuUGFyYW1ldHJfWm9icmF6ZW5pX0FHX0RldGFpbHVfS09GKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdERldGFpbD8uZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsPy52aXNpYmxlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjbnQuZmlsdGVyX2FrY2UudHlwID09IFwiUE9VXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdsb2JhbHMuUGFyYW1ldHJfWm9icmF6ZW5pX0FHX0RldGFpbHVfUE9VKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdERldGFpbD8uZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsPy52aXNpYmxlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjbnQuZmlsdGVyX2FrY2UudHlwID09IFwiUFJFXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdsb2JhbHMuUGFyYW1ldHJfWm9icmF6ZW5pX0FHX0RldGFpbHVfUFJFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdERldGFpbD8uZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsPy52aXNpYmxlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyICRtYWluVGFibGUgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC8vLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhtYWluRm9ybSlcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjZWxsQWN0aXZhdGU6IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucm93ID0gJG1haW5UYWJsZS5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQucm93ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC50cmlnZ2VyKFwiYWRhc3ViZ3JpZHJvd3NlbGVjdGVkXCIsIHsgYWdlbmRhOiAxMDAsIGRhdGE6IHRoYXQucm93IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdERldGFpbCwgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5yb3cgPSBjdHguY2VsbEluZm8uZGF0YTsgICAgLy9kYXRhLCB6ZSBrdGVyeWNoIGJ5bCB2eXR2b3JlbiByYWRla1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdmFyIGFfYWdlbmRhID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmIChjbnQuZmlsdGVyX2FrY2UudHlwID09IFwiS0RGXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGFfYWdlbmRhID0gNzA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKGNudC5maWx0ZXJfYWtjZS50eXAgPT0gXCJLT0ZcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgYV9hZ2VuZGEgPSA4MDtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAoY250LmZpbHRlcl9ha2NlLnR5cCA9PSBcIlBPVVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBhX2FnZW5kYSA9IDE4MDtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAoY250LmZpbHRlcl9ha2NlLnR5cCA9PSBcIlBSRVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBhX2FnZW5kYSA9IDIzMDtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKGFfYWdlbmRhID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vIG90ZXbFmWVuw60gbm92w6kgesOhbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBHb3JkaWMuV2ViQXBwLlV0aWxpdHkub3BlbkFwcChcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGl4eDE6IHRoYXQucm93Lml4cCwgLy8gaWQgY8OtbG92w6lobyBvYmpla3R1IHYgbm92xJsgb3RldsOtcmFuw6kgesOhbG/FvmNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGl4eDI6IG51bGwsICAvLyBkcnVow6kgaWQgY8OtbG92w6lobyBvYmpla3R1IHYgcMWZw61wYWTEmyBzbG/FvmVuw6lobyBrbMOtxI1lIChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBpeHgzOiBudWxsLCAgLy8gZHJ1aMOpIGlkIGPDrWxvdsOpaG8gb2JqZWt0dSB2IHDFmcOtcGFkxJsgc2xvxb5lbsOpaG8ga2zDrcSNZSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdHlwQWc6IGFfYWdlbmRhLCAgLy8gdHlwIGFnZW5keSBjw61sb3bDqWhvIG9iamVrdHUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGZhemU6IG51bGwsICAvLyBmw6F6ZSBwb8W+YWRvdmFuw6EgcHJvIG90ZXbFmWVuw60gY8OtbG92w6lobyBvYmpla3R1IChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBiYW5DdXJyZW50QXBwOiB0cnVlLCAvLyBwxZnDrXpuYWsgesOha2F6dSBwb3XFvml0w60gYWt0dcOhbG7DrSBmw6F6ZSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgbm9BcHBGYWlsOiBmYWxzZSAvLyBwxZnDrXpuYWsgdnl2b2zDoW7DrSB2w71qaW1reSBwxZlpIG5lbmFsZXplbsOtIGPDrWxvdsOpIGbDoXplIChuZXBvdmlubsOpKSBcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIFwiT3BlbkRldGFpbFwiICAgICAgICAgICAgLy8gbsOhemV2IG1ldG9keSBzcHXFoXTEm27DqSBwbyBvdGV2xZllbsOtIG5vdsOpIHrDoWxvxb5reVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgKS5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBXZmwuRGlhbG9ncy5EZXRhaWxEb2t1bWVudHVTcGlzdSh0aGlzLnBhcmVudENudCwgeyBTaW1wbGVNb2RlOiB0cnVlLCBEZXRhaWxEdG86IHsgaXhwOiB0aGF0LnJvdy5peHAhIH0gfSwgR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLmF1dG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy99KSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogW1wiYWNcIiwgXCJlc3VfdHh0XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQSURcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImt0Z190eXBfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlR5cCBkb2tsYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJBZ2VuZG92w6kgxI3DrXNsb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZXN1X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTdWJqZWt0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfbWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIsSMw6FzdGthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1lbmFfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk3Em25hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X2V2aWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEYXR1bSBldmlkZW5jZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3NwbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRhdHVtIHNwbGF0bm9zdGlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNfdWhyX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlN0YXYgw7pocmFkeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTYwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3VoclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRhdHVtIMO6aHJhZHlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcFRlbXBsYXRlOiBcIkRhdHVtIHBvc2xlZG7DrSBuZWJvIG/EjWVrw6F2YW7DqSDDumhyYWR5XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY19lc3VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCLEjMOtc2xvIGRva2xhZHUgZG9kYXZhdGVsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTkwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2ZWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWxJtjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3Bpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHRoYXQudmlld19JU0wgPSBuZXcgR29yZGljLklzbC5WaWV3KHRoaXMuaXNsLkFrY2UubGlzdERva2xhZHlCUExBa2NlKHsgZmlsdGVyczogdGhpcy5maWx0ZXJfYWtjZSB9KSk7XHJcblxyXG4gICAgICAgICAgICAkbWFpblRhYmxlLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXdfSVNMKTtcclxuICAgICAgICAgICAgLy92YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGRhdGEpO1xyXG4gICAgICAgICAgICAvLyRtYWluVGFibGUuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcgKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
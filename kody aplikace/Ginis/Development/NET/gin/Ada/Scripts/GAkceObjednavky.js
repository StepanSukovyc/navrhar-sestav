"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAkceObjednavky.js                                                        </Name>
//    <Description> GAkceObjednavky                                                                                  </Description>
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
            let GAkceObjednavky = class GAkceObjednavky extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    var dataobjednavky = this.modelobjednavky;
                    $tab.empty();
                    var cnt = this;
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    this.actions.addRange({
                        actDetail: {
                            caption: "Detail", icon: "gi-detail",
                            enabled: true,
                            run: () => {
                                var a_agenda = 0;
                                if (this.globals.Parametr_Zobrazeni_AG_Detailu_OBJ) {
                                    a_agenda = 110; //objednávky
                                }
                                if (a_agenda > 0) {
                                    // otevření nové záložky
                                    Gordic.WebApp.Utility.openApp({
                                        ixx1: that.row.ixp, // id cílového objektu v nově otevírané záložce
                                        ixx2: null, // druhé id cílového objektu v případě složeného klíče (nepovinné)
                                        ixx3: null, // druhé id cílového objektu v případě složeného klíče (nepovinné)
                                        typAg: 110, // typ agendy cílového objektu (nepovinné)
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
                    this.filter_akce.typ = "OBJ";
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actDetail*"]));
                    this.actions.actDetail?.enabled(false);
                    this.actions.actDetail?.visible(false);
                    if (this.globals.Parametr_Zobrazeni_AG_Detailu_OBJ) {
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
                            if (that.row != null) {
                                that.element.trigger("adasubgridrowselected", { agenda: 100, data: that.row });
                            }
                        },
                        defaultAction: that.actions.actDetail,
                        //defaultAction: new GAction({
                        //    name: "gridRowSelectedAct",
                        //    run (ev, ctx) {
                        //        that.row = ctx.cellInfo.data;    //data, ze kterych byl vytvoren radek
                        //        //GDlg.alert("Dvojklik: " + row.ixp );
                        //        // otevření nové záložky
                        //        Gordic.WebApp.Utility.openApp(
                        //            {
                        //                ixx1: that.row.ixp, // id cílového objektu v nově otevírané záložce
                        //                ixx2: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                        //                ixx3: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                        //                typAg: null,  // typ agendy cílového objektu (nepovinné)
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
                        searchColumns: ["ac_sml"],
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
                            name: "ac_sml",
                            caption: "Agendové číslo",
                            width: 150
                        })
                            .addTextColumn({
                            name: "esu_txt",
                            caption: "Subjekt",
                            width: 300
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
                    that.view_ISL = new Gordic.Isl.View(this.isl.Akce.listDokladySMLAkce({ filters: this.filter_akce }));
                    $mainTable.ggrid("setData", that.view_ISL);
                    //var view = new Gordic.Data.View(dataobjednavky);
                    //$mainTable.ggrid("setData", view );
                }
            };
            GAkceObjednavky = __decorate([
                gcontent
            ], GAkceObjednavky);
            WebClient.GAkceObjednavky = GAkceObjednavky;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FrY2VPYmplZG5hdmt5LmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJTY3JpcHRzL0dBa2NlT2JqZWRuYXZreS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7RUFPRTs7Ozs7OztBQUVGLElBQVUsTUFBTSxDQXVKZjtBQXZKRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F1Sm5CO0lBdkpnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F1SjdCO1FBdkpvQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUduQyxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLE9BQUEsWUFBWTtnQkFTN0MsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzlCLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7b0JBRTFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFFYixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7b0JBRWYsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRWxJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixTQUFTLEVBQUU7NEJBQ1AsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsV0FBVzs0QkFDcEMsT0FBTyxFQUFFLElBQUk7NEJBQ2IsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7Z0NBQ2pC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RyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUVyRyxVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRTNDLGtEQUFrRDtvQkFDbEQscUNBQXFDO2dCQUV6QyxDQUFDO2FBQ0osQ0FBQTtZQWxKWSxlQUFlO2dCQUQzQixRQUFRO2VBQ0ksZUFBZSxDQWtKM0I7WUFsSlkseUJBQWUsa0JBa0ozQixDQUFBO1FBQ0wsQ0FBQyxFQXZKb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBdUo3QjtJQUFELENBQUMsRUF2SmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXVKbkI7QUFBRCxDQUFDLEVBdkpTLE1BQU0sS0FBTixNQUFNLFFBdUpmIiwic291cmNlc0NvbnRlbnQiOlsiLyohLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5BZGEuV2ViQ2xpZW50LkdBa2NlT2JqZWRuYXZreS5qcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEdBa2NlT2JqZWRuYXZreSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEppxZnDrSBJbGXEjWVrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMTYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAxNi0wMy0wMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG4qL1xyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5BZGEuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0FrY2VPYmplZG5hdmt5IGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb2RlbG9iamVkbmF2a3k6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTbWxzcGlkRG9rbGFkeUR0b1tdO1xyXG4gICAgICAgIHByaXZhdGUgcm93OiBHb3JkaWMuQWRhLkludGVyZmFjZS5HU21sc3BpZERva2xhZHlEdG87XHJcblxyXG4gICAgICAgIHByaXZhdGUgdmlld19JU0w6IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuQWRhLkludGVyZmFjZS5HU21sc3BpZERva2xhZHlEdG8+O1xyXG4gICAgICAgIHByb3RlY3RlZCBmaWx0ZXJfYWtjZTogR29yZGljLkFkYS5JbnRlcmZhY2UuR0FnRG9rbGFkeUZpbHRlckR0bztcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGdsb2JhbHM6IEdvcmRpYy5BZGEuV2ViQ2xpZW50LkRUTy5HQWRhR2xvYmFsc0R0bztcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciAkdGFiID0gJCh0aGlzLmNvbnRlbnREaXYpO1xyXG4gICAgICAgICAgICB2YXIgZGF0YW9iamVkbmF2a3kgPSB0aGlzLm1vZGVsb2JqZWRuYXZreTtcclxuXHJcbiAgICAgICAgICAgICR0YWIuZW1wdHkoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJzZXR1cFwiLCB7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0wLTEyLTBcIiB9KS5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0RGV0YWlsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEZXRhaWxcIiwgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYV9hZ2VuZGEgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxzLlBhcmFtZXRyX1pvYnJhemVuaV9BR19EZXRhaWx1X09CSikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYV9hZ2VuZGEgPSAxMTA7IC8vb2JqZWRuw6F2a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFfYWdlbmRhID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3RldsWZZW7DrSBub3bDqSB6w6Fsb8W+a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5XZWJBcHAuVXRpbGl0eS5vcGVuQXBwKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXh4MTogdGhhdC5yb3cuaXhwLCAvLyBpZCBjw61sb3bDqWhvIG9iamVrdHUgdiBub3bEmyBvdGV2w61yYW7DqSB6w6Fsb8W+Y2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXh4MjogbnVsbCwgIC8vIGRydWjDqSBpZCBjw61sb3bDqWhvIG9iamVrdHUgdiBwxZnDrXBhZMSbIHNsb8W+ZW7DqWhvIGtsw63EjWUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4eDM6IG51bGwsICAvLyBkcnVow6kgaWQgY8OtbG92w6lobyBvYmpla3R1IHYgcMWZw61wYWTEmyBzbG/FvmVuw6lobyBrbMOtxI1lIChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBBZzogMTEwLCAgLy8gdHlwIGFnZW5keSBjw61sb3bDqWhvIG9iamVrdHUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhemU6IG51bGwsICAvLyBmw6F6ZSBwb8W+YWRvdmFuw6EgcHJvIG90ZXbFmWVuw60gY8OtbG92w6lobyBvYmpla3R1IChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYW5DdXJyZW50QXBwOiB0cnVlLCAvLyBwxZnDrXpuYWsgesOha2F6dSBwb3XFvml0w60gYWt0dcOhbG7DrSBmw6F6ZSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9BcHBGYWlsOiBmYWxzZSAvLyBwxZnDrXpuYWsgdnl2b2zDoW7DrSB2w71qaW1reSBwxZlpIG5lbmFsZXplbsOtIGPDrWxvdsOpIGbDoXplIChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJPcGVuRGV0YWlsXCIgICAgICAgICAgICAvLyBuw6F6ZXYgbWV0b2R5IHNwdcWhdMSbbsOpIHBvIG90ZXbFmWVuw60gbm92w6kgesOhbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdmbC5EaWFsb2dzLkRldGFpbERva3VtZW50dVNwaXN1KHVuZGVmaW5lZCBhcyB1bmtub3duIGFzIEdDb250ZW50LCB7IFNpbXBsZU1vZGU6IHRydWUsIERldGFpbER0bzogeyBpeHA6IHRoYXQucm93Lml4cCEgfSB9LCBHbG9iYWwuRW51bXMuTW9kT3RldnJlbmkuYXV0byk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJfYWtjZS50eXAgPSBcIk9CSlwiO1xyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIG1lbnVCYXJ1XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdERldGFpbCpcIl0pKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdERldGFpbD8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3REZXRhaWw/LnZpc2libGUoZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxzLlBhcmFtZXRyX1pvYnJhemVuaV9BR19EZXRhaWx1X09CSikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdERldGFpbD8uZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3REZXRhaWw/LnZpc2libGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciAkbWFpblRhYmxlID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAvLy5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8obWFpbkZvcm0pXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbEFjdGl2YXRlIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucm93ID0gJG1haW5UYWJsZS5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQucm93ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC50cmlnZ2VyKFwiYWRhc3ViZ3JpZHJvd3NlbGVjdGVkXCIsIHsgYWdlbmRhOiAxMDAsIGRhdGE6IHRoYXQuIHJvdyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoYXQuYWN0aW9ucy5hY3REZXRhaWwsIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2RlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHJ1biAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LnJvdyA9IGN0eC5jZWxsSW5mby5kYXRhOyAgICAvL2RhdGEsIHplIGt0ZXJ5Y2ggYnlsIHZ5dHZvcmVuIHJhZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vR0RsZy5hbGVydChcIkR2b2prbGlrOiBcIiArIHJvdy5peHAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vIG90ZXbFmWVuw60gbm92w6kgesOhbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIEdvcmRpYy5XZWJBcHAuVXRpbGl0eS5vcGVuQXBwKFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGl4eDE6IHRoYXQucm93Lml4cCwgLy8gaWQgY8OtbG92w6lobyBvYmpla3R1IHYgbm92xJsgb3RldsOtcmFuw6kgesOhbG/FvmNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaXh4MjogbnVsbCwgIC8vIGRydWjDqSBpZCBjw61sb3bDqWhvIG9iamVrdHUgdiBwxZnDrXBhZMSbIHNsb8W+ZW7DqWhvIGtsw63EjWUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaXh4MzogbnVsbCwgIC8vIGRydWjDqSBpZCBjw61sb3bDqWhvIG9iamVrdHUgdiBwxZnDrXBhZMSbIHNsb8W+ZW7DqWhvIGtsw63EjWUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdHlwQWc6IG51bGwsICAvLyB0eXAgYWdlbmR5IGPDrWxvdsOpaG8gb2JqZWt0dSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBmYXplOiBudWxsLCAgLy8gZsOhemUgcG/FvmFkb3ZhbsOhIHBybyBvdGV2xZllbsOtIGPDrWxvdsOpaG8gb2JqZWt0dSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBiYW5DdXJyZW50QXBwOiB0cnVlLCAvLyBwxZnDrXpuYWsgesOha2F6dSBwb3XFvml0w60gYWt0dcOhbG7DrSBmw6F6ZSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBub0FwcEZhaWw6IGZhbHNlIC8vIHDFmcOtem5hayB2eXZvbMOhbsOtIHbDvWppbWt5IHDFmWkgbmVuYWxlemVuw60gY8OtbG92w6kgZsOhemUgKG5lcG92aW5uw6kpIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIFwiT3BlbkRldGFpbFwiICAgICAgICAgICAgLy8gbsOhemV2IG1ldG9keSBzcHXFoXTEm27DqSBwbyBvdGV2xZllbsOtIG5vdsOpIHrDoWxvxb5reVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICApLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgV2ZsLkRpYWxvZ3MuRGV0YWlsRG9rdW1lbnR1U3Bpc3UodGhpcy5wYXJlbnRDbnQsIHsgU2ltcGxlTW9kZTogdHJ1ZSwgRGV0YWlsRHRvOiB7IGl4cDogdGhhdC5yb3cuaXhwISB9IH0sIEdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5hdXRvKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfSksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IFtcImFjX3NtbFwiXSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUElEXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdGdfdHlwX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJUeXAgZG9rbGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWNfc21sXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkFnZW5kb3bDqSDEjcOtc2xvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlc3VfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlN1Ympla3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIsSMw6FzdGthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUG9waXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC52aWV3X0lTTCA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhpcy5pc2wuQWtjZS5saXN0RG9rbGFkeVNNTEFrY2UoeyBmaWx0ZXJzOiB0aGlzLmZpbHRlcl9ha2NlIH0pKTtcclxuXHJcbiAgICAgICAgICAgICRtYWluVGFibGUuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlld19JU0wpO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGRhdGFvYmplZG5hdmt5KTtcclxuICAgICAgICAgICAgLy8kbWFpblRhYmxlLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3ICk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=
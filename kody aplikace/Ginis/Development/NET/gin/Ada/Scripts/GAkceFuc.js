"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAkceFuc.js                                                        </Name>
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
            let GAkceFuc = class GAkceFuc extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    var datafuc = this.modelfuc;
                    $tab.empty();
                    var cnt = this;
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    this.actions.addRange({
                        actDetail: {
                            caption: "Detail", icon: "gi-detail",
                            enabled: true,
                            run: () => {
                                var a_agenda = 0;
                                if (this.globals.Parametr_Zobrazeni_AG_Detailu_FUC) {
                                    a_agenda = 330; //FUC
                                }
                                if (a_agenda > 0) {
                                    Gordic.WebApp.Utility.openApp({
                                        ixx1: that.row.ixp, // id cílového objektu v nově otevírané záložce
                                        ixx2: null, // druhé id cílového objektu v případě složeného klíče (nepovinné)
                                        ixx3: null, // druhé id cílového objektu v případě složeného klíče (nepovinné)
                                        typAg: 330, // typ agendy cílového objektu (nepovinné)
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
                    this.filter_akce.typ = "FUC";
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actDetail*"]));
                    this.actions.actDetail?.enabled(false);
                    this.actions.actDetail?.visible(false);
                    if (this.globals.Parametr_Zobrazeni_AG_Detailu_FUC) {
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
                                that.element.trigger("adasubgridrowselected", { agenda: 330, data: that.row });
                            }
                        },
                        defaultAction: that.actions.actDetail,
                        //defaultAction: new GAction({
                        //    name: "gridRowSelectedAct",
                        //    run(ev, ctx) {
                        //        that.row = ctx.cellInfo.data;    //data, ze kterych byl vytvoren radek
                        //        ////Gordic.Eko.Dialogs.GVazby(that, { InputDto: { ixp: that.row.ixp!, drd: 0, ktg_typ: that.row.ktg_typ! } }, Gordic.Gin.Globals.Enums.ModOtevreni.showModalWindow);
                        //        //// //GDlg.showWindow("Gordic.Uct.WebClient.GUctDetailDokladu", { Ixp: row.ixp }, "", 800, 600, true); //zobrazeni dalsiho detailu
                        //        //// otevření nové záložky
                        //        //Gordic.WebApp.Utility.openApp(
                        //        //    {
                        //        //        ixx1: "KUZLP00Y4RZ1", // id cílového objektu v nově otevírané záložce
                        //        //        ixx2: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                        //        //        ixx3: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                        //        //        typAg: 330,  // typ agendy cílového objektu (nepovinné)
                        //        //        faze: null,  // fáze požadovaná pro otevření cílového objektu (nepovinné)
                        //        //        banCurrentApp: false, // příznak zákazu použití aktuální fáze (nepovinné)
                        //        //        noAppFail: false  // příznak vyvolání výjimky při nenalezení cílové fáze (nepovinné) 
                        //        //    },
                        //        //    "OpenDetail"            // název metody spuštěné po otevření nové záložky
                        //        //);                        }
                        //        //Gordic.Eko.Dialogs.GVazby(that, { InputDto: { ixp: that.row.ixp!, drd: 0, ktg_typ: that.row.ktg_typ! } }, Gordic.Gin.Globals.Enums.ModOtevreni.showModalWindow);
                        //        // //GDlg.showWindow("Gordic.Uct.WebClient.GUctDetailDokladu", { Ixp: row.ixp }, "", 800, 600, true); //zobrazeni dalsiho detailu
                        //        // otevření nové záložky
                        //        Gordic.WebApp.Utility.openApp(
                        //            {
                        //                ixx1: that.row.ixp, // id cílového objektu v nově otevírané záložce
                        //                ixx2: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                        //                ixx3: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                        //                typAg: 330,  // typ agendy cílového objektu (nepovinné)
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
                    that.view_ISL = new Gordic.Isl.View(this.isl.Akce.listDokladyFUCAkce({ filters: this.filter_akce }));
                    $mainTable.ggrid("setData", that.view_ISL);
                    //var view = new Gordic.Data.View(datauct);
                    //$mainTable.ggrid("setData", view );
                }
            };
            GAkceFuc = __decorate([
                gcontent
            ], GAkceFuc);
            WebClient.GAkceFuc = GAkceFuc;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FrY2VGdWMuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbIlNjcmlwdHMvR0FrY2VGdWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0VBT0U7Ozs7Ozs7QUFFRixJQUFVLE1BQU0sQ0FtS2Y7QUFuS0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBbUtuQjtJQW5LZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBbUs3QjtRQW5Lb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUyxTQUFRLE9BQUEsWUFBWTtnQkFVdEMsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzlCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBRTVCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFFYixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7b0JBRWYsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRWxJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixTQUFTLEVBQUU7NEJBQ1AsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsV0FBVzs0QkFDcEMsT0FBTyxFQUFFLElBQUk7NEJBQ2IsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7Z0NBQ2pCLElBQUksSUFBSSxDQUFD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Rzt5QkFDYixDQUFDO3FCQUNULENBQUMsQ0FBQztvQkFFUCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFFckcsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUUzQywyQ0FBMkM7b0JBQzNDLHFDQUFxQztnQkFFekMsQ0FBQzthQUNKLENBQUE7WUE5SlksUUFBUTtnQkFEcEIsUUFBUTtlQUNJLFFBQVEsQ0E4SnBCO1lBOUpZLGtCQUFRLFdBOEpwQixDQUFBO1FBQ0wsQ0FBQyxFQW5Lb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBbUs3QjtJQUFELENBQUMsRUFuS2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQW1LbkI7QUFBRCxDQUFDLEVBbktTLE1BQU0sS0FBTixNQUFNLFFBbUtmIiwic291cmNlc0NvbnRlbnQiOlsiLyohLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5BZGEuV2ViQ2xpZW50LkdBa2NlRnVjLmpzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gR0FrY2VVY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBKacWZw60gSWxlxI1layAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE2ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTYtMDMtMDMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuKi9cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQWRhLldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdBa2NlRnVjIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtb2RlbGZ1YzogR29yZGljLkFkYS5JbnRlcmZhY2UuR0Z1Y0Rva2xhZHlEdG9bXTtcclxuICAgICAgICBwcml2YXRlIGRhdGFmdWM6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdGdWNEb2tsYWR5RHRvW107XHJcbiAgICAgICAgcHJpdmF0ZSByb3c6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdGdWNEb2tsYWR5RHRvO1xyXG5cclxuICAgICAgICBwcml2YXRlIHZpZXdfSVNMOiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkFkYS5JbnRlcmZhY2UuR0Z1Y0Rva2xhZHlEdG8+O1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyX2FrY2U6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBZ0Rva2xhZHlGaWx0ZXJEdG87XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBnbG9iYWxzOiBHb3JkaWMuQWRhLldlYkNsaWVudC5EVE8uR0FkYUdsb2JhbHNEdG87XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgJHRhYiA9ICQodGhpcy5jb250ZW50RGl2KTtcclxuICAgICAgICAgICAgdmFyIGRhdGFmdWMgPSB0aGlzLm1vZGVsZnVjO1xyXG5cclxuICAgICAgICAgICAgJHRhYi5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNudCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWFpbkZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcInNldHVwXCIsIHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTAtMTItMFwiIH0pLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3REZXRhaWw6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRldGFpbFwiLCBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhX2FnZW5kYSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdsb2JhbHMuUGFyYW1ldHJfWm9icmF6ZW5pX0FHX0RldGFpbHVfRlVDKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhX2FnZW5kYSA9IDMzMDsgLy9GVUNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFfYWdlbmRhID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLldlYkFwcC5VdGlsaXR5Lm9wZW5BcHAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHgxOiB0aGF0LnJvdy5peHAsIC8vIGlkIGPDrWxvdsOpaG8gb2JqZWt0dSB2IG5vdsSbIG90ZXbDrXJhbsOpIHrDoWxvxb5jZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHgyOiBudWxsLCAgLy8gZHJ1aMOpIGlkIGPDrWxvdsOpaG8gb2JqZWt0dSB2IHDFmcOtcGFkxJsgc2xvxb5lbsOpaG8ga2zDrcSNZSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXh4MzogbnVsbCwgIC8vIGRydWjDqSBpZCBjw61sb3bDqWhvIG9iamVrdHUgdiBwxZnDrXBhZMSbIHNsb8W+ZW7DqWhvIGtsw63EjWUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cEFnOiAzMzAsICAvLyB0eXAgYWdlbmR5IGPDrWxvdsOpaG8gb2JqZWt0dSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF6ZTogbnVsbCwgIC8vIGbDoXplIHBvxb5hZG92YW7DoSBwcm8gb3RldsWZZW7DrSBjw61sb3bDqWhvIG9iamVrdHUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhbkN1cnJlbnRBcHA6IHRydWUsIC8vIHDFmcOtem5hayB6w6FrYXp1IHBvdcW+aXTDrSBha3R1w6FsbsOtIGbDoXplIChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0FwcEZhaWw6IGZhbHNlIC8vIHDFmcOtem5hayB2eXZvbMOhbsOtIHbDvWppbWt5IHDFmWkgbmVuYWxlemVuw60gY8OtbG92w6kgZsOhemUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk9wZW5EZXRhaWxcIiAgICAgICAgICAgIC8vIG7DoXpldiBtZXRvZHkgc3B1xaF0xJtuw6kgcG8gb3RldsWZZW7DrSBub3bDqSB6w6Fsb8W+a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV2ZsLkRpYWxvZ3MuRGV0YWlsRG9rdW1lbnR1U3Bpc3UodW5kZWZpbmVkIGFzIHVua25vd24gYXMgR0NvbnRlbnQsIHsgU2ltcGxlTW9kZTogdHJ1ZSwgRGV0YWlsRHRvOiB7IGl4cDogdGhhdC5yb3cuaXhwISB9IH0sIEdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5hdXRvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcl9ha2NlLnR5cCA9IFwiRlVDXCI7XHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gbWVudUJhcnVcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0RGV0YWlsKlwiXSkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsPy5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdERldGFpbD8udmlzaWJsZShmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdsb2JhbHMuUGFyYW1ldHJfWm9icmF6ZW5pX0FHX0RldGFpbHVfRlVDKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsPy5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdERldGFpbD8udmlzaWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyICRtYWluVGFibGUgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC8vLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhtYWluRm9ybSlcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjZWxsQWN0aXZhdGUoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJvdyA9ICRtYWluVGFibGUuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnJvdyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LnRyaWdnZXIoXCJhZGFzdWJncmlkcm93c2VsZWN0ZWRcIiwgeyBhZ2VuZGE6IDMzMCwgZGF0YTogdGhhdC5yb3cgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJncmlkUm93U2VsZWN0ZWRBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBydW4oZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LnJvdyA9IGN0eC5jZWxsSW5mby5kYXRhOyAgICAvL2RhdGEsIHplIGt0ZXJ5Y2ggYnlsIHZ5dHZvcmVuIHJhZGVrXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLy8vR29yZGljLkVrby5EaWFsb2dzLkdWYXpieSh0aGF0LCB7IElucHV0RHRvOiB7IGl4cDogdGhhdC5yb3cuaXhwISwgZHJkOiAwLCBrdGdfdHlwOiB0aGF0LnJvdy5rdGdfdHlwISB9IH0sIEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93TW9kYWxXaW5kb3cpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLy8vIC8vR0RsZy5zaG93V2luZG93KFwiR29yZGljLlVjdC5XZWJDbGllbnQuR1VjdERldGFpbERva2xhZHVcIiwgeyBJeHA6IHJvdy5peHAgfSwgXCJcIiwgODAwLCA2MDAsIHRydWUpOyAvL3pvYnJhemVuaSBkYWxzaWhvIGRldGFpbHVcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8vLyBvdGV2xZllbsOtIG5vdsOpIHrDoWxvxb5reVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvL0dvcmRpYy5XZWJBcHAuVXRpbGl0eS5vcGVuQXBwKFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vICAgICAgICBpeHgxOiBcIktVWkxQMDBZNFJaMVwiLCAvLyBpZCBjw61sb3bDqWhvIG9iamVrdHUgdiBub3bEmyBvdGV2w61yYW7DqSB6w6Fsb8W+Y2VcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gICAgICAgIGl4eDI6IG51bGwsICAvLyBkcnVow6kgaWQgY8OtbG92w6lobyBvYmpla3R1IHYgcMWZw61wYWTEmyBzbG/FvmVuw6lobyBrbMOtxI1lIChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyAgICAgICAgaXh4MzogbnVsbCwgIC8vIGRydWjDqSBpZCBjw61sb3bDqWhvIG9iamVrdHUgdiBwxZnDrXBhZMSbIHNsb8W+ZW7DqWhvIGtsw63EjWUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vICAgICAgICB0eXBBZzogMzMwLCAgLy8gdHlwIGFnZW5keSBjw61sb3bDqWhvIG9iamVrdHUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vICAgICAgICBmYXplOiBudWxsLCAgLy8gZsOhemUgcG/FvmFkb3ZhbsOhIHBybyBvdGV2xZllbsOtIGPDrWxvdsOpaG8gb2JqZWt0dSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gICAgICAgIGJhbkN1cnJlbnRBcHA6IGZhbHNlLCAvLyBwxZnDrXpuYWsgesOha2F6dSBwb3XFvml0w60gYWt0dcOhbG7DrSBmw6F6ZSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gICAgICAgIG5vQXBwRmFpbDogZmFsc2UgIC8vIHDFmcOtem5hayB2eXZvbMOhbsOtIHbDvWppbWt5IHDFmWkgbmVuYWxlemVuw60gY8OtbG92w6kgZsOhemUgKG5lcG92aW5uw6kpIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyAgICBcIk9wZW5EZXRhaWxcIiAgICAgICAgICAgIC8vIG7DoXpldiBtZXRvZHkgc3B1xaF0xJtuw6kgcG8gb3RldsWZZW7DrSBub3bDqSB6w6Fsb8W+a3lcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8pOyAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vR29yZGljLkVrby5EaWFsb2dzLkdWYXpieSh0aGF0LCB7IElucHV0RHRvOiB7IGl4cDogdGhhdC5yb3cuaXhwISwgZHJkOiAwLCBrdGdfdHlwOiB0aGF0LnJvdy5rdGdfdHlwISB9IH0sIEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93TW9kYWxXaW5kb3cpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyAvL0dEbGcuc2hvd1dpbmRvdyhcIkdvcmRpYy5VY3QuV2ViQ2xpZW50LkdVY3REZXRhaWxEb2tsYWR1XCIsIHsgSXhwOiByb3cuaXhwIH0sIFwiXCIsIDgwMCwgNjAwLCB0cnVlKTsgLy96b2JyYXplbmkgZGFsc2lobyBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vIG90ZXbFmWVuw60gbm92w6kgesOhbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIEdvcmRpYy5XZWJBcHAuVXRpbGl0eS5vcGVuQXBwKFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGl4eDE6IHRoYXQucm93Lml4cCwgLy8gaWQgY8OtbG92w6lobyBvYmpla3R1IHYgbm92xJsgb3RldsOtcmFuw6kgesOhbG/FvmNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaXh4MjogbnVsbCwgIC8vIGRydWjDqSBpZCBjw61sb3bDqWhvIG9iamVrdHUgdiBwxZnDrXBhZMSbIHNsb8W+ZW7DqWhvIGtsw63EjWUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaXh4MzogbnVsbCwgIC8vIGRydWjDqSBpZCBjw61sb3bDqWhvIG9iamVrdHUgdiBwxZnDrXBhZMSbIHNsb8W+ZW7DqWhvIGtsw63EjWUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdHlwQWc6IDMzMCwgIC8vIHR5cCBhZ2VuZHkgY8OtbG92w6lobyBvYmpla3R1IChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGZhemU6IG51bGwsICAvLyBmw6F6ZSBwb8W+YWRvdmFuw6EgcHJvIG90ZXbFmWVuw60gY8OtbG92w6lobyBvYmpla3R1IChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGJhbkN1cnJlbnRBcHA6IHRydWUsIC8vIHDFmcOtem5hayB6w6FrYXp1IHBvdcW+aXTDrSBha3R1w6FsbsOtIGbDoXplIChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIG5vQXBwRmFpbDogZmFsc2UgLy8gcMWZw616bmFrIHZ5dm9sw6Fuw60gdsO9amlta3kgcMWZaSBuZW5hbGV6ZW7DrSBjw61sb3bDqSBmw6F6ZSAobmVwb3Zpbm7DqSkgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgXCJPcGVuRGV0YWlsXCIgICAgICAgICAgICAvLyBuw6F6ZXYgbWV0b2R5IHNwdcWhdMSbbsOpIHBvIG90ZXbFmWVuw60gbm92w6kgesOhbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICkuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBXZmwuRGlhbG9ncy5EZXRhaWxEb2t1bWVudHVTcGlzdSh0aGlzLnBhcmVudENudCwgeyBTaW1wbGVNb2RlOiB0cnVlLCBEZXRhaWxEdG86IHsgaXhwOiB0aGF0LnJvdy5peHAhIH0gfSwgR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLmF1dG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy99KSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogW1wiYWNcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBJRFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3RnX3R5cF90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVHlwIGRva2xhZHVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkFnZW5kb3bDqSDEjcOtc2xvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCLEjMOhc3RrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUG9waXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC52aWV3X0lTTCA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhpcy5pc2wuQWtjZS5saXN0RG9rbGFkeUZVQ0FrY2UoeyBmaWx0ZXJzOiB0aGlzLmZpbHRlcl9ha2NlIH0pKTtcclxuXHJcbiAgICAgICAgICAgICRtYWluVGFibGUuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlld19JU0wpO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGRhdGF1Y3QpO1xyXG4gICAgICAgICAgICAvLyRtYWluVGFibGUuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcgKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
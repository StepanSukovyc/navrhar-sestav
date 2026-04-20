"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAkceSmlouvy.js                                                        </Name>
//    <Description> GAkceSmlouvy                                                                                  </Description>
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
            let GAkceSmlouvy = class GAkceSmlouvy extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    var datasmlouvy = this.modelsmlouvy;
                    $tab.empty();
                    var cnt = this;
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    this.actions.addRange({
                        actDetail: {
                            caption: "Detail", icon: "gi-detail",
                            enabled: true,
                            run: () => {
                                var a_agenda = 0;
                                if (this.globals.Parametr_Zobrazeni_AG_Detailu_SML) {
                                    a_agenda = 110; //smlouvy
                                }
                                if (a_agenda > 0) {
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
                    this.filter_akce.typ = "SML";
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actDetail*"]));
                    this.actions.actDetail?.enabled(false);
                    this.actions.actDetail?.visible(false);
                    if (this.globals.Parametr_Zobrazeni_AG_Detailu_SML) {
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
                        //        // otevření nové záložky
                        //        Gordic.WebApp.Utility.openApp(
                        //            {
                        //                ixx1: that.row.ixp, // id cílového objektu v nově otevírané záložce
                        //                ixx2: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                        //                ixx3: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                        //                typAg: 110,  // typ agendy cílového objektu (nepovinné)
                        //                faze: null,  // fáze požadovaná pro otevření cílového objektu (nepovinné)
                        //                banCurrentApp: true, // příznak zákazu použití aktuální fáze (nepovinné)
                        //                noAppFail: false // příznak vyvolání výjimky při nenalezení cílové fáze (nepovinné) 
                        //            },
                        //            "OpenDetail"            // název metody spuštěné po otevření nové záložky
                        //        ).fail(() => {
                        //            Wfl.Dialogs.DetailDokumentuSpisu(this.parentCnt, { SimpleMode: true, DetailDto: { ixp: that.row.ixp! } }, Global.Enums.ModOtevreni.auto);
                        //        });
                        //        //GDlg.showWindow("Gordic.Sml.WebClient.GSmlDetail", { Ixp: row.ixp }, "", 800, 600, true); //zobrazeni dalsiho detailu
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
                            width: 130
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
                    //var view = new Gordic.Data.View(datasmlouvy);
                    //$mainTable.ggrid("setData", view );
                }
            };
            GAkceSmlouvy = __decorate([
                gcontent
            ], GAkceSmlouvy);
            WebClient.GAkceSmlouvy = GAkceSmlouvy;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FrY2VTbWxvdXZ5LmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJTY3JpcHRzL0dBa2NlU21sb3V2eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7RUFPRTs7Ozs7OztBQUVGLElBQVUsTUFBTSxDQXlKZjtBQXpKRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F5Sm5CO0lBekpnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F5SjdCO1FBekpvQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUduQyxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFhLFNBQVEsT0FBQSxZQUFZO2dCQVMxQyxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztvQkFFcEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUViLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztvQkFFZixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFFbEksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLFNBQVMsRUFBRTs0QkFDUCxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxXQUFXOzRCQUNwQyxPQUFPLEVBQUUsSUFBSTs0QkFDYixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztnQ0FDakIsSUFBSSxJ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a0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUVyRyxVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRTNDLCtDQUErQztvQkFDL0MscUNBQXFDO2dCQUV6QyxDQUFDO2FBQ0osQ0FBQTtZQXBKWSxZQUFZO2dCQUR4QixRQUFRO2VBQ0ksWUFBWSxDQW9KeEI7WUFwSlksc0JBQVksZUFvSnhCLENBQUE7UUFDTCxDQUFDLEVBekpvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUF5SjdCO0lBQUQsQ0FBQyxFQXpKZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBeUpuQjtBQUFELENBQUMsRUF6SlMsTUFBTSxLQUFOLE1BQU0sUUF5SmYiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkFkYS5XZWJDbGllbnQuR0FrY2VTbWxvdXZ5LmpzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gR0FrY2VTbWxvdXZ5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSmnFmcOtIElsZcSNZWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAxNiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE2LTAzLTAzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbiovXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkFkYS5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHQWtjZVNtbG91dnkgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwcml2YXRlIG1vZGVsc21sb3V2eTogR29yZGljLkFkYS5JbnRlcmZhY2UuR1NtbHNwaWREb2tsYWR5RHRvW107XHJcbiAgICAgICAgcHJpdmF0ZSByb3c6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTbWxzcGlkRG9rbGFkeUR0bztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3X0lTTDogR29yZGljLklzbC5WaWV3PEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTbWxzcGlkRG9rbGFkeUR0bz47XHJcbiAgICAgICAgcHJvdGVjdGVkIGZpbHRlcl9ha2NlOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HQWdEb2tsYWR5RmlsdGVyRHRvIDtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGdsb2JhbHM6IEdvcmRpYy5BZGEuV2ViQ2xpZW50LkRUTy5HQWRhR2xvYmFsc0R0bztcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkgKCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgJHRhYiA9ICQodGhpcy5jb250ZW50RGl2KTtcclxuICAgICAgICAgICAgdmFyIGRhdGFzbWxvdXZ5ID0gdGhpcy5tb2RlbHNtbG91dnk7XHJcblxyXG4gICAgICAgICAgICAkdGFiLmVtcHR5KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgY250ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBtYWluRm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwic2V0dXBcIiwgeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMTVMtMC0xMi0wXCIgfSkuZ2Zvcm1zZWN0aW9uKFwiY3JlYXRlXCIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdERldGFpbDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGV0YWlsXCIsIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFfYWdlbmRhID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFscy5QYXJhbWV0cl9ab2JyYXplbmlfQUdfRGV0YWlsdV9TTUwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFfYWdlbmRhID0gMTEwOyAvL3NtbG91dnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFfYWdlbmRhID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLldlYkFwcC5VdGlsaXR5Lm9wZW5BcHAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHgxOiB0aGF0LnJvdy5peHAsIC8vIGlkIGPDrWxvdsOpaG8gb2JqZWt0dSB2IG5vdsSbIG90ZXbDrXJhbsOpIHrDoWxvxb5jZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHgyOiBudWxsLCAgLy8gZHJ1aMOpIGlkIGPDrWxvdsOpaG8gb2JqZWt0dSB2IHDFmcOtcGFkxJsgc2xvxb5lbsOpaG8ga2zDrcSNZSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXh4MzogbnVsbCwgIC8vIGRydWjDqSBpZCBjw61sb3bDqWhvIG9iamVrdHUgdiBwxZnDrXBhZMSbIHNsb8W+ZW7DqWhvIGtsw63EjWUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cEFnOiAxMTAsICAvLyB0eXAgYWdlbmR5IGPDrWxvdsOpaG8gb2JqZWt0dSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF6ZTogbnVsbCwgIC8vIGbDoXplIHBvxb5hZG92YW7DoSBwcm8gb3RldsWZZW7DrSBjw61sb3bDqWhvIG9iamVrdHUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhbkN1cnJlbnRBcHA6IHRydWUsIC8vIHDFmcOtem5hayB6w6FrYXp1IHBvdcW+aXTDrSBha3R1w6FsbsOtIGbDoXplIChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0FwcEZhaWw6IGZhbHNlIC8vIHDFmcOtem5hayB2eXZvbMOhbsOtIHbDvWppbWt5IHDFmWkgbmVuYWxlemVuw60gY8OtbG92w6kgZsOhemUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk9wZW5EZXRhaWxcIiAgICAgICAgICAgIC8vIG7DoXpldiBtZXRvZHkgc3B1xaF0xJtuw6kgcG8gb3RldsWZZW7DrSBub3bDqSB6w6Fsb8W+a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV2ZsLkRpYWxvZ3MuRGV0YWlsRG9rdW1lbnR1U3Bpc3UodW5kZWZpbmVkIGFzIHVua25vd24gYXMgR0NvbnRlbnQsIHsgU2ltcGxlTW9kZTogdHJ1ZSwgRGV0YWlsRHRvOiB7IGl4cDogdGhhdC5yb3cuaXhwISB9IH0sIEdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5hdXRvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcl9ha2NlLnR5cCA9IFwiU01MXCI7XHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gbWVudUJhcnVcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0RGV0YWlsKlwiXSkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsPy5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdERldGFpbD8udmlzaWJsZShmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdsb2JhbHMuUGFyYW1ldHJfWm9icmF6ZW5pX0FHX0RldGFpbHVfU01MKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsPy5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdERldGFpbD8udmlzaWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyICRtYWluVGFibGUgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC8vLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhtYWluRm9ybSlcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjZWxsQWN0aXZhdGUgKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yb3cgPSAkbWFpblRhYmxlLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5yb3cgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LnRyaWdnZXIoXCJhZGFzdWJncmlkcm93c2VsZWN0ZWRcIiwgeyBhZ2VuZGE6IDEwMCwgZGF0YTogdGhhdC5yb3cgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJncmlkUm93U2VsZWN0ZWRBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBydW4gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5yb3cgPSBjdHguY2VsbEluZm8uZGF0YTsgICAgLy9kYXRhLCB6ZSBrdGVyeWNoIGJ5bCB2eXR2b3JlbiByYWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vIG90ZXbFmWVuw60gbm92w6kgesOhbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIEdvcmRpYy5XZWJBcHAuVXRpbGl0eS5vcGVuQXBwKFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGl4eDE6IHRoYXQucm93Lml4cCwgLy8gaWQgY8OtbG92w6lobyBvYmpla3R1IHYgbm92xJsgb3RldsOtcmFuw6kgesOhbG/FvmNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaXh4MjogbnVsbCwgIC8vIGRydWjDqSBpZCBjw61sb3bDqWhvIG9iamVrdHUgdiBwxZnDrXBhZMSbIHNsb8W+ZW7DqWhvIGtsw63EjWUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaXh4MzogbnVsbCwgIC8vIGRydWjDqSBpZCBjw61sb3bDqWhvIG9iamVrdHUgdiBwxZnDrXBhZMSbIHNsb8W+ZW7DqWhvIGtsw63EjWUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdHlwQWc6IDExMCwgIC8vIHR5cCBhZ2VuZHkgY8OtbG92w6lobyBvYmpla3R1IChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGZhemU6IG51bGwsICAvLyBmw6F6ZSBwb8W+YWRvdmFuw6EgcHJvIG90ZXbFmWVuw60gY8OtbG92w6lobyBvYmpla3R1IChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGJhbkN1cnJlbnRBcHA6IHRydWUsIC8vIHDFmcOtem5hayB6w6FrYXp1IHBvdcW+aXTDrSBha3R1w6FsbsOtIGbDoXplIChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIG5vQXBwRmFpbDogZmFsc2UgLy8gcMWZw616bmFrIHZ5dm9sw6Fuw60gdsO9amlta3kgcMWZaSBuZW5hbGV6ZW7DrSBjw61sb3bDqSBmw6F6ZSAobmVwb3Zpbm7DqSkgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgXCJPcGVuRGV0YWlsXCIgICAgICAgICAgICAvLyBuw6F6ZXYgbWV0b2R5IHNwdcWhdMSbbsOpIHBvIG90ZXbFmWVuw60gbm92w6kgesOhbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICkuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBXZmwuRGlhbG9ncy5EZXRhaWxEb2t1bWVudHVTcGlzdSh0aGlzLnBhcmVudENudCwgeyBTaW1wbGVNb2RlOiB0cnVlLCBEZXRhaWxEdG86IHsgaXhwOiB0aGF0LnJvdy5peHAhIH0gfSwgR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLmF1dG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vR0RsZy5zaG93V2luZG93KFwiR29yZGljLlNtbC5XZWJDbGllbnQuR1NtbERldGFpbFwiLCB7IEl4cDogcm93Lml4cCB9LCBcIlwiLCA4MDAsIDYwMCwgdHJ1ZSk7IC8vem9icmF6ZW5pIGRhbHNpaG8gZGV0YWlsdVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL30pLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCJhY19zbWxcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBJRFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3RnX3R5cF90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVHlwIGRva2xhZHVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjX3NtbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJBZ2VuZG92w6kgxI3DrXNsb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZXN1X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTdWJqZWt0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCLEjMOhc3RrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC52aWV3X0lTTCA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhpcy5pc2wuQWtjZS5saXN0RG9rbGFkeVNNTEFrY2UoeyBmaWx0ZXJzOiB0aGlzLmZpbHRlcl9ha2NlIH0pKTtcclxuXHJcbiAgICAgICAgICAgICRtYWluVGFibGUuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlld19JU0wpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy92YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGRhdGFzbWxvdXZ5KTtcclxuICAgICAgICAgICAgLy8kbWFpblRhYmxlLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3ICk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=
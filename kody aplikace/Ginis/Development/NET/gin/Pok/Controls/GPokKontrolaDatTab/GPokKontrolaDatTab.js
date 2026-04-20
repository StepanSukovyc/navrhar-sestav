"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Pok;
    (function (Pok) {
        var WebClient;
        (function (WebClient) {
            let GPokKontrolaDatTab = class GPokKontrolaDatTab extends Gordic.GContentBase {
                onContentReady() {
                    this.setBreadcrumbs([{ caption: "Kontrola dat", defaultAction: true }]);
                    var that = this;
                    let form = new Gordic.Forms
                        .Form({
                        name: "pokKontrolyForm", tabOptions: { title: "jres:31302279", opened: true }, layoutDescriptor: "L2M2S1"
                    }) //RC 31302279 : Seznam kontrol
                        .addSection()
                        //   .addRow()
                        .addField("gcheck", { name: "dvojiRezervace", label: "jres:31302280", initialValue: true }) //RC 31302280 : Kontrola dvojí rezervace
                        //   .addRow()
                        .addField("gcheck", { name: "rezervacePohyby", label: "jres:31302281", initialValue: true }) //RC 31302281 : Kontrola rezervačních pohybů
                        //   .addRow()
                        .addField("gcheck", { name: "ucetPohyby", label: "jres:31302282", initialValue: true }) //RC 31302282 : Kontrola účetních pohybů
                        //   .addRow()
                        .addField("gcheck", { name: "opravaVlastnika", label: "jres:31302283", initialValue: true }) //RC 31302283 : Kontrola/Oprava vyplnění vlastníka
                        //  .addRow()
                        .addField("gcheck", { name: "opravaMeny", label: "jres:31302284", initialValue: true }) //RC 31302284 : Kontrola/Oprava vyplnění měn
                        //  .addRow()
                        .addSection()
                        .addField("gcheck", { name: "priznakRezervace", label: "jres:31302285", initialValue: true }) //RC 31302285 : Kontrola/Oprava příznaku rezervace
                        //  .addRow()
                        .addField("gcheck", { name: "soucetDokladu", label: "jres:31302286", initialValue: true }) //RC 31302286 : Kontrola/Oprava součtu dokladu
                        //  .addRow()
                        .addField("gcheck", { name: "zustatekKnihy", label: "jres:31302287", initialValue: true }) //RC 31302287 : Kontrola/Oprava zůstatku knihy
                        //  .addRow()
                        .addField("gcheck", { name: "spisUzel", label: "jres:31302288", initialValue: true }) //RC 31302288 : Kontrola/Oprava spisového uzlu
                        //   .addRow()
                        .addField("gcheck", { name: "stavZauctovani", label: "jres:31302289", initialValue: true }); //RC 31302289 : Kontrola/Oprava stavu zaúčtování
                    var tab = $("<div>").appendTo(this.element).gform("createFrom", form);
                    this.grid = $("<div>").appendTo(this.element)
                        .css("height", "100%")
                        .ggrid({
                        data: [], // this.modelPolozky[0]   //zatim nemam zadna data, nastavim prazdne pole. V momente nacteni je nastavim pres options (metoda loadJsGrid)
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit", // fit, full
                        navigationMode: "row", // row, cell
                        //scrollHelperTemplate: "{ac}",
                        //  searchColumns: ["ac"],
                        rowNumbers: false,
                        columns: this.createGridFormat()
                    });
                    that.actions.addRange({
                        actKontrola: {
                            caption: "jres:31302278",
                            icon: "gi-tick",
                            run: function (ev, ctx) {
                                that.kontrolaDat();
                            }
                        }
                    });
                    this.menuBar([
                        { action: this.actions.actKontrola, favorite: true }
                    ]);
                }
                createGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({ name: "column1", caption: "jres:31302278" }); //RC 31302278 : Kontrola
                    gridFormat.addTextColumn({ name: "column3", caption: "jres:31302185" }); //RC 31302185 : Výsledek
                    return gridFormat;
                }
                kontrolaDat() {
                    //popřemýšlet jestli to neudělat formou promisů a volát to asynchroně?
                    //  var ff = this.findFields().gfield();
                    this.beginOperation("Kontrola dat..");
                    var that = this;
                    this.call("SpustitKontroluVybrane", {
                        kontorlaRezervace: this.findFields("dvojiRezervace").gfield("getValue"),
                        rezPohyb: this.findFields("rezervacePohyby").gfield("getValue"),
                        ucetPohyb: this.findFields("ucetPohyby").gfield("getValue"),
                        vyplnVlastnika: this.findFields("opravaVlastnika").gfield("getValue"),
                        vyplneniMen: this.findFields("opravaMeny").gfield("getValue"),
                        prizRezervace: this.findFields("priznakRezervace").gfield("getValue"),
                        soucetDokladu: this.findFields("soucetDokladu").gfield("getValue"),
                        zustatekKnihy: this.findFields("zustatekKnihy").gfield("getValue"),
                        spisUzel: this.findFields("spisUzel").gfield("getValue"),
                        stavZauctovani: this.findFields("stavZauctovani").gfield("getValue")
                    }).done(function (data) {
                        var view = new Gordic.Data.View(data);
                        that.grid.ggrid("setData", view);
                    })
                        .fail(function (jqXHR, typ, obj) {
                        if (obj.baseType === "Gordic.General.GHplValidationException" || obj.exceptionType === "Gordic.General.GHplValidationException") {
                            obj.handled = true;
                            Gordic.Pok.WebClient.GPokFlash.showFlashError(that, obj.baseMessage);
                        }
                    })
                        .always(function () {
                        that.endOperation();
                    });
                }
            };
            GPokKontrolaDatTab = __decorate([
                Decorators.gcontent
            ], GPokKontrolaDatTab);
            WebClient.GPokKontrolaDatTab = GPokKontrolaDatTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva0tvbnRyb2xhRGF0VGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Bva0tvbnRyb2xhRGF0VGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0FpSVA7QUFqSVQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBaUlYO0lBaklRLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWlJckI7UUFqSVksV0FBQSxTQUFTO1lBRzFCLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEsT0FBQSxZQUFZO2dCQUtoRCxjQUFjO29CQUVWLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUcsYUFBYSxFQUFHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFFMUUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLO3lCQUN0QixJQUFJLENBQUM7d0JBQ0YsSUFBSSxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLGdCQUFnQixFQUFFLFFBQVE7cUJBQVMsQ0FBQyxDQUFBLDhCQUE4Qjt5QkFDcEosVUFBVSxFQUFFO3dCQUNiLGNBQWM7eUJBQ2IsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLHdDQUF3Qzt3QkFDeEksY0FBYzt5QkFDVixRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsNENBQTRDO3dCQUM1SSxjQUFjO3lCQUNWLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsd0NBQXdDO3dCQUNsSSxjQUFjO3lCQUNWLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxrREFBa0Q7d0JBQ2hKLGFBQWE7eUJBQ1YsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyw0Q0FBNEM7d0JBQ25JLGFBQWE7eUJBQ1osVUFBVSxFQUFFO3lCQUNaLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxrREFBa0Q7d0JBQ2pKLGFBQWE7eUJBQ1YsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyw4Q0FBOEM7d0JBQzFJLGFBQWE7eUJBQ1YsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyw4Q0FBOEM7d0JBQzFJLGFBQWE7eUJBQ1YsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyw4Q0FBOEM7d0JBQ3RJLGNBQWM7eUJBQ1YsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUMsZ0RBQWdEO29CQUdoSixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUV0RSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzt5QkFDeEMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7eUJBQ3JCLEtBQUssQ0FBQzt3QkFDSCxJQUFJLEVBQUUsRUFBRSxFQUFJLHlJQUF5STt3QkFDckosVUFBVSxFQUFFLE1BQU0sRUFBTSw2Q0FBNkM7d0JBQ3JFLFVBQVUsRUFBRSxLQUFLLEVBQU8sWUFBWTt3QkFDcEMsY0FBYyxFQUFFLEtBQUssRUFBRyxZQUFZO3dCQUNwQywrQkFBK0I7d0JBQy9CLDBCQUEwQjt3QkFDMUIsVUFBVSxFQUFFLEtBQUs7d0JBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7cUJBQ25DLENBQUMsQ0FBQztvQkFJUCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsV0FBVyxFQUFFOzRCQUNULE9BQU8sRUFBRSxlQUFlOzRCQUN4QixJQUFJLEVBQUUsU0FBUzs0QkFDZixHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FDbEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDOzRCQUN2QixDQUFDO3lCQUNKO3FCQUNKLENBQUMsQ0FBQztvQkFFSCxJQUFJLENBQUMsT0FBTyxDQUFDO3dCQUNULEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7cUJBQ3ZELENBQUMsQ0FBQztnQkFFUCxDQUFDO2dCQUVPLGdCQUFnQjtvQkFDcEIsSUFBSSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBc0IsQ0FBQztvQkFFbEUsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQSx3QkFBd0I7b0JBQ2hHLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUMsd0JBQXdCO29CQUVqRyxPQUFPLFVBQVUsQ0FBQztnQkFFdEIsQ0FBQztnQkFFTyxXQUFXO29CQUdmLHNFQUFzRTtvQkFDdEUsd0NBQXdDO29CQUN4QyxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUE7b0JBQ3JDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFDOUI7d0JBQ0ksaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7d0JBQ3ZFLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQzt3QkFDL0QsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQzt3QkFDM0QsY0FBYyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO3dCQUNyRSxXQUFXLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO3dCQUM3RCxhQUFhLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7d0JBQ3JFLGFBQWEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7d0JBQ2xFLGFBQWEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7d0JBQ2xFLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7d0JBQ3hELGNBQWMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztxQkFHdkUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQTBCO3dCQUN4QyxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBR3JDLENBQUMsQ0FBQzt5QkFDRCxJQUFJLENBQUMsVUFBVSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUc7d0JBRTNCLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyx3Q0FBd0MsSUFBSSxHQUFHLENBQUMsYUFBYSxLQUFLLHdDQUF3QyxFQUFFLENBQUM7NEJBQzlILEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDOzRCQUNuQixNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBRXpFLENBQUM7b0JBRUwsQ0FBQyxDQUFDO3lCQUNELE1BQU0sQ0FBQzt3QkFDSixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ3hCLENBQUMsQ0FBQyxDQUFDO2dCQUNYLENBQUM7YUFHQSxDQUFBO1lBM0hRLGtCQUFrQjtnQkFEOUIsVUFBVSxDQUFDLFFBQVE7ZUFDUCxrQkFBa0IsQ0EySDFCO1lBM0hRLDRCQUFrQixxQkEySDFCLENBQUE7UUFHRCxDQUFDLEVBaklZLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWlJckI7SUFBRCxDQUFDLEVBaklRLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWlJWDtBQUFELENBQUMsRUFqSUMsTUFBTSxLQUFOLE1BQU0sUUFpSVAiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlBvay5XZWJDbGllbnQge1xyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Bva0tvbnRyb2xhRGF0VGFiIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIGl4cERlbjogc3RyaW5nO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnJlYWRjcnVtYnMoW3sgY2FwdGlvbjogXCJLb250cm9sYSBkYXRcIiwgIGRlZmF1bHRBY3Rpb24gOiB0cnVlIH1dKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtc1xyXG4gICAgICAgICAgICAgICAgLkZvcm0oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9rS29udHJvbHlGb3JtXCIsIHRhYk9wdGlvbnM6IHsgdGl0bGU6IFwianJlczozMTMwMjI3OVwiLCBvcGVuZWQ6IHRydWUgfSwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzFcIiB9IGFzIGFueSkvL1JDIDMxMzAyMjc5IDogU2V6bmFtIGtvbnRyb2xcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKCkgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwiZHZvamlSZXplcnZhY2VcIiwgbGFiZWw6IFwianJlczozMTMwMjI4MFwiLCBpbml0aWFsVmFsdWUgOiB0cnVlIH0pIC8vUkMgMzEzMDIyODAgOiBLb250cm9sYSBkdm9qw60gcmV6ZXJ2YWNlXHJcbiAgICAgICAgICAgICAvLyAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJyZXplcnZhY2VQb2h5YnlcIiwgbGFiZWw6IFwianJlczozMTMwMjI4MVwiLCBpbml0aWFsVmFsdWU6IHRydWUgfSkgLy9SQyAzMTMwMjI4MSA6IEtvbnRyb2xhIHJlemVydmHEjW7DrWNoIHBvaHlixa9cclxuICAgICAgICAgICAgIC8vICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBuYW1lOiBcInVjZXRQb2h5YnlcIiwgbGFiZWw6IFwianJlczozMTMwMjI4MlwiLCBpbml0aWFsVmFsdWU6IHRydWV9KSAvL1JDIDMxMzAyMjgyIDogS29udHJvbGEgw7rEjWV0bsOtY2ggcG9oeWLFr1xyXG4gICAgICAgICAgICAgLy8gICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwib3ByYXZhVmxhc3RuaWthXCIsIGxhYmVsOiBcImpyZXM6MzEzMDIyODNcIiwgaW5pdGlhbFZhbHVlOiB0cnVlfSkgLy9SQyAzMTMwMjI4MyA6IEtvbnRyb2xhL09wcmF2YSB2eXBsbsSbbsOtIHZsYXN0bsOta2FcclxuICAgICAgICAgICAgICAvLyAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBuYW1lOiBcIm9wcmF2YU1lbnlcIiwgbGFiZWw6IFwianJlczozMTMwMjI4NFwiLCBpbml0aWFsVmFsdWU6IHRydWV9KSAvL1JDIDMxMzAyMjg0IDogS29udHJvbGEvT3ByYXZhIHZ5cGxuxJtuw60gbcSbblxyXG4gICAgICAgICAgICAgICAgLy8gIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJwcml6bmFrUmV6ZXJ2YWNlXCIsIGxhYmVsOiBcImpyZXM6MzEzMDIyODVcIiwgaW5pdGlhbFZhbHVlOiB0cnVlfSkgLy9SQyAzMTMwMjI4NSA6IEtvbnRyb2xhL09wcmF2YSBwxZnDrXpuYWt1IHJlemVydmFjZVxyXG4gICAgICAgICAgICAgIC8vICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwic291Y2V0RG9rbGFkdVwiLCBsYWJlbDogXCJqcmVzOjMxMzAyMjg2XCIsIGluaXRpYWxWYWx1ZTogdHJ1ZX0pIC8vUkMgMzEzMDIyODYgOiBLb250cm9sYS9PcHJhdmEgc291xI10dSBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgLy8gIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJ6dXN0YXRla0tuaWh5XCIsIGxhYmVsOiBcImpyZXM6MzEzMDIyODdcIiwgaW5pdGlhbFZhbHVlOiB0cnVlfSkgLy9SQyAzMTMwMjI4NyA6IEtvbnRyb2xhL09wcmF2YSB6xa9zdGF0a3Uga25paHlcclxuICAgICAgICAgICAgICAvLyAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBuYW1lOiBcInNwaXNVemVsXCIsIGxhYmVsOiBcImpyZXM6MzEzMDIyODhcIiwgaW5pdGlhbFZhbHVlOiB0cnVlfSkgLy9SQyAzMTMwMjI4OCA6IEtvbnRyb2xhL09wcmF2YSBzcGlzb3bDqWhvIHV6bHVcclxuICAgICAgICAgICAgIC8vICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBuYW1lOiBcInN0YXZaYXVjdG92YW5pXCIsIGxhYmVsOiBcImpyZXM6MzEzMDIyODlcIiwgaW5pdGlhbFZhbHVlOiB0cnVlfSk7IC8vUkMgMzEzMDIyODkgOiBLb250cm9sYS9PcHJhdmEgc3RhdnUgemHDusSNdG92w6Fuw61cclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgdGFiID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ncmlkID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtdLCAgIC8vIHRoaXMubW9kZWxQb2xvemt5WzBdICAgLy96YXRpbSBuZW1hbSB6YWRuYSBkYXRhLCBuYXN0YXZpbSBwcmF6ZG5lIHBvbGUuIFYgbW9tZW50ZSBuYWN0ZW5pIGplIG5hc3RhdmltIHByZXMgb3B0aW9ucyAobWV0b2RhIGxvYWRKc0dyaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyTW9kZTogXCJhdXRvXCIsICAgICAvLyBhdXRvLCBhbGwtYXQtb25jZSwgcGFnZWQtc3luYywgcGFnZWQtYXN5bmNcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZpdFwiLCAgICAgIC8vIGZpdCwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLCAgLy8gcm93LCBjZWxsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zY3JvbGxIZWxwZXJUZW1wbGF0ZTogXCJ7YWN9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gIHNlYXJjaENvbHVtbnM6IFtcImFjXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdEtvbnRyb2xhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMzAyMjc4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS10aWNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmtvbnRyb2xhRGF0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RLb250cm9sYSwgZmF2b3JpdGU6IHRydWUgfVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHUG9rVW5pdmVyemFsbmlEdG8+IHtcclxuICAgICAgICAgICAgdmFyIGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHUG9rVW5pdmVyemFsbmlEdG8+KCk7XHJcblxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImNvbHVtbjFcIiwgY2FwdGlvbjogXCJqcmVzOjMxMzAyMjc4XCIgfSk7Ly9SQyAzMTMwMjI3OCA6IEtvbnRyb2xhXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiY29sdW1uM1wiLCBjYXB0aW9uOiBcImpyZXM6MzEzMDIxODVcIiB9KTsgLy9SQyAzMTMwMjE4NSA6IFbDvXNsZWRla1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBrb250cm9sYURhdCgpOiB2b2lkIHtcclxuXHJcblxyXG4gICAgICAgICAgICAvL3BvcMWZZW3DvcWhbGV0IGplc3RsaSB0byBuZXVkxJtsYXQgZm9ybW91IHByb21pc8WvIGEgdm9sw6F0IHRvIGFzeW5jaHJvbsSbP1xyXG4gICAgICAgICAgICAvLyAgdmFyIGZmID0gdGhpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oXCJLb250cm9sYSBkYXQuLlwiKVxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbChcIlNwdXN0aXRLb250cm9sdVZ5YnJhbmVcIixcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBrb250b3JsYVJlemVydmFjZTogdGhpcy5maW5kRmllbGRzKFwiZHZvamlSZXplcnZhY2VcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgcmV6UG9oeWI6IHRoaXMuZmluZEZpZWxkcyhcInJlemVydmFjZVBvaHlieVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSxcclxuICAgICAgICAgICAgICAgICAgICB1Y2V0UG9oeWI6IHRoaXMuZmluZEZpZWxkcyhcInVjZXRQb2h5YnlcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgdnlwbG5WbGFzdG5pa2E6IHRoaXMuZmluZEZpZWxkcyhcIm9wcmF2YVZsYXN0bmlrYVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSxcclxuICAgICAgICAgICAgICAgICAgICB2eXBsbmVuaU1lbjogdGhpcy5maW5kRmllbGRzKFwib3ByYXZhTWVueVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSxcclxuICAgICAgICAgICAgICAgICAgICBwcml6UmV6ZXJ2YWNlOiB0aGlzLmZpbmRGaWVsZHMoXCJwcml6bmFrUmV6ZXJ2YWNlXCIpLmdmaWVsZChcImdldFZhbHVlXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvdWNldERva2xhZHU6IHRoaXMuZmluZEZpZWxkcyhcInNvdWNldERva2xhZHVcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgenVzdGF0ZWtLbmloeTogdGhpcy5maW5kRmllbGRzKFwienVzdGF0ZWtLbmloeVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSxcclxuICAgICAgICAgICAgICAgICAgICBzcGlzVXplbDogdGhpcy5maW5kRmllbGRzKFwic3Bpc1V6ZWxcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdlphdWN0b3Zhbmk6IHRoaXMuZmluZEZpZWxkcyhcInN0YXZaYXVjdG92YW5pXCIpLmdmaWVsZChcImdldFZhbHVlXCIpXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKGRhdGE6IEdQb2tVbml2ZXJ6YWxuaUR0b1tdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdHlwLCBvYmopXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5iYXNlVHlwZSA9PT0gXCJHb3JkaWMuR2VuZXJhbC5HSHBsVmFsaWRhdGlvbkV4Y2VwdGlvblwiIHx8IG9iai5leGNlcHRpb25UeXBlID09PSBcIkdvcmRpYy5HZW5lcmFsLkdIcGxWYWxpZGF0aW9uRXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmhhbmRsZWQgPSB0cnVlOyAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaEVycm9yKHRoYXQsIG9iai5iYXNlTWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICBcclxuIl19
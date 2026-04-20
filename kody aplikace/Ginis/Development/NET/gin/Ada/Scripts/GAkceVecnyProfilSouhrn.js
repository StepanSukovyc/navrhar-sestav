"use strict";
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
            let GAkceVecnyProfilSouhrn = class GAkceVecnyProfilSouhrn extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Souhrn VP"; //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#
                    this.taskId = "actsouhrnVP"; // označení položky v taskListu
                    this.globals = Gordic.Ada.Globals.GAdaGlobals;
                }
                //---------------------------------------------------------------
                // Inicializace formuláře
                onContentReady() {
                    var that = this;
                    that.title = "Souhrn VP";
                    that.actions.addRange({
                        actZrusit: {
                            caption: "Zrušit", // popis
                            icon: "gi-window-close", // ikona 
                            visible: true, // vždy viditelné
                            enabled: true, // vždy spustitelné
                            run: function () {
                                that.closing(false);
                            }
                        }
                    });
                    //*******************************************************
                    // P ř i d á v á n í   a k c í   d o   m e n u   b a r u
                    this.menuBar([]);
                    this.commandBar([
                        { action: that.actions.actZrusit, favorite: true }, // Zrušit
                    ]);
                    // zobrazení pomocí KPI
                    var result = [];
                    var celkem_castka_vp = new Decimal(0);
                    var celkem_castka_fin = new Decimal(0);
                    var celkem_castka_rozdil = new Decimal(0);
                    that.modelSouhrnVP.forEach((r) => {
                        celkem_castka_vp = parseDecimal(celkem_castka_vp).plus(parseDecimal(r.c_plan));
                        celkem_castka_fin = parseDecimal(celkem_castka_fin).plus(parseDecimal(r.c_fin));
                        celkem_castka_rozdil = parseDecimal(celkem_castka_rozdil).plus(parseDecimal(r.c_rozdil));
                    });
                    // *****************************
                    //    Formulář tabu
                    var SouhrnVPForm = new Gordic.Forms.Form({ name: "SouhrnVP", layoutDescriptor: "L1M1S1 LMS-1-10-1" }); //.addSection("Souhrn VP")
                    //    .addField("gtable", {
                    //        data: that.modelSouhrnVP,       //zatim nemam zadna data, nastavim prazdne pole. V momente nacteni je nastavim pres options (metoda loadJsGrid)
                    //        columns: new Gordic.Data.GridFormat()
                    //            .addNumberColumn({
                    //                name: "rok_vp", caption: "Rok", description: "Rok", width: 50
                    //            })
                    //            .addCurrencyColumn({
                    //                name: "c_plan", caption: "Částka VP", description: "Částka VP", align: "right", width: 160
                    //            })
                    //            .addCurrencyColumn({
                    //                name: "c_fin", caption: "Částka FIN", description: "Částka FIN", align: "right", width: 160
                    //            })
                    //            .addCurrencyColumn({
                    //                name: "c_rozdil", caption: "Rozdíl", description: "Rozdíl", align: "right", width: 160
                    //            })
                    //    })
                    //$("<div class='js-souhrnVP'>").appendTo(that.element).gform("createFrom", SouhrnVPForm).findFields().gfield("model", "apply", that.modelSouhrnVP);
                    var gridFormatSeznam = new Gordic.Data.GridFormat()
                        .addNumberColumn({
                        name: "rok_vp", caption: "Rok", description: "Rok", width: 50
                    })
                        .addCurrencyColumn({
                        name: "c_plan", caption: "Částka VP", description: "Částka VP", align: "right", width: 160
                    })
                        .addCurrencyColumn({
                        name: "c_fin", caption: "Částka FIN", description: "Částka FIN", align: "right", width: 160
                    })
                        .addCurrencyColumn({
                        name: "c_rozdil", caption: "Rozdíl", description: "Rozdíl", align: "right", width: 160
                    });
                    var mainTable = $("<div>")
                        .css("height", "100%")
                        //.appendTo(mainForm)
                        .appendTo(this.element)
                        .ggrid({
                        columnMode: "full",
                        data: [], //zatim nemam zadna data, nastavim prazdne pole. V momente nacteni je nastavim pres options (metoda loadJsGrid)
                        columns: gridFormatSeznam,
                        rowsClass: function (dataRow) {
                            var ret = "  ";
                            if (dataRow && dataRow._isSummary) {
                                ret = "bold";
                            }
                            return ret;
                        }
                    });
                    that.view_ISL = new Gordic.Isl.View(that.isl.AkceVecnyProfil.list_Suma({ filters: this.filter_akce }), {
                        processors: {
                            sumarni_radek: Gordic.Eko.Grid.createSummaryProcessor(gridFormatSeznam, [])
                        }
                    });
                    mainTable.ggrid("setData", that.view_ISL);
                }
                ;
                refresh(data) {
                    var that = this;
                    that.view_ISL.updateData(data, "update");
                }
                ;
                //---------------------------------------------------------------
                // Zavírání formuláře
                closing(provest) {
                    this.close({ data: null }); // při zavírání posílanám zpět objekt
                }
            };
            GAkceVecnyProfilSouhrn = __decorate([
                gcontent
            ], GAkceVecnyProfilSouhrn);
            WebClient.GAkceVecnyProfilSouhrn = GAkceVecnyProfilSouhrn;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FrY2VWZWNueVByb2ZpbFNvdWhybi5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HQWtjZVZlY255UHJvZmlsU291aHJuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0E0SWY7QUE1SUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNEluQjtJQTVJZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBNEk3QjtRQTVJb0IsV0FBQSxTQUFTO1lBRTFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFJbkMsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBdUIsU0FBUSxPQUFBLFlBQVk7Z0JBQXhEOztvQkFFSSxVQUFLLEdBQUcsV0FBVyxDQUFDLENBQUMsbUVBQW1FO29CQUN4RixXQUFNLEdBQUcsYUFBYSxDQUFDLENBQUMsK0JBQStCO29CQUUvQyxZQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO2dCQWdJckQsQ0FBQztnQkF4SEcsaUVBQWlFO2dCQUNqRSx5QkFBeUI7Z0JBQ3pCLGNBQWM7b0JBRVYsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQTtvQkFFeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBRWxCLFNBQVMsRUFBRTs0QkFDUCxPQUFPLEVBQUUsUUFBUSxFQUFtRixRQUFROzRCQUM1RyxJQUFJLEVBQUUsaUJBQWlCLEVBQTZFLFNBQVM7NEJBQzdHLE9BQU8sRUFBRSxJQUFJLEVBQXVGLGlCQUFpQjs0QkFDckgsT0FBTyxFQUFFLElBQUksRUFBdUYsbUJBQW1COzRCQUN2SCxHQUFHLEVBQUU7Z0NBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTs0QkFDdkIsQ0FBQzt5QkFDSjtxQkFDSixDQUFDLENBQUM7b0JB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LEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBa0MscUNBQXFDO2dCQUMxRyxDQUFDO2FBQ0osQ0FBQTtZQXJJWSxzQkFBc0I7Z0JBRmxDLFFBQVE7ZUFFSSxzQkFBc0IsQ0FxSWxDO1lBcklZLGdDQUFzQix5QkFxSWxDLENBQUE7UUFDTCxDQUFDLEVBNUlvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE0STdCO0lBQUQsQ0FBQyxFQTVJZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBNEluQjtBQUFELENBQUMsRUE1SVMsTUFBTSxLQUFOLE1BQU0sUUE0SWYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLkFkYS5XZWJDbGllbnQge1xyXG5cclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEdBa2NlVmVjbnlQcm9maWxTb3Vocm4gZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG5cclxuICAgICAgICB0aXRsZSA9IFwiU291aHJuIFZQXCI7IC8vYWJ5IHNlIGRhbG8gcMWZaXN0b3VwaXQgeiBicmVhZGNydW1icywgamUgbmFzdGF2ZW5vIHpkZSBtw61zdG8gdiBDI1xyXG4gICAgICAgIHRhc2tJZCA9IFwiYWN0c291aHJuVlBcIjsgLy8gb3puYcSNZW7DrSBwb2xvxb5reSB2IHRhc2tMaXN0dVxyXG5cclxuICAgICAgICBwcml2YXRlIGdsb2JhbHMgPSBHb3JkaWMuQWRhLkdsb2JhbHMuR0FkYUdsb2JhbHM7XHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3X0lTTDogR29yZGljLklzbC5WaWV3PEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdWZXBzcGxhU3VtYUR0bz47XHJcbiAgICAgICAgcHJvdGVjdGVkIGZpbHRlcl9ha2NlOiBHb3JkaWMuQWRhLkludGVyZmFjZS5HQWdEb2tsYWR5RmlsdGVyRHRvO1xyXG5cclxuICAgICAgICBwdWJsaWMgbW9kZWxTb3Vocm5WUDogR29yZGljLkFkYS5JbnRlcmZhY2UuR1ZlcHNwbGFTdW1hRHRvW107XHJcblxyXG4gICAgICAgIHByaXZhdGUgUmV6aW1Ob3ZhOiBCb29sZWFuO1xyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIEluaWNpYWxpemFjZSBmb3JtdWzDocWZZVxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnRpdGxlID0gXCJTb3Vocm4gVlBcIlxyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZaWTDoW7DrSBha2PDrVxyXG5cclxuICAgICAgICAgICAgICAgIGFjdFpydXNpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWnJ1xaFpdFwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb3Bpc1xyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlrb25hIFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2xb5keSB2aWRpdGVsbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHbFvmR5IHNwdXN0aXRlbG7DqVxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NpbmcoZmFsc2UpIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICAgICAgLy8gUCDFmSBpIGQgw6EgdiDDoSBuIMOtICAgYSBrIGMgw60gICBkIG8gICBtIGUgbiB1ICAgYiBhIHIgdVxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIoW1xyXG5cclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcihbXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFpydXNpdCwgZmF2b3JpdGU6IHRydWUgfSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFpydcWhaXRcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICAvLyB6b2JyYXplbsOtIHBvbW9jw60gS1BJXHJcbiAgICAgICAgICAgIHZhciByZXN1bHQ6IGFueVtdID0gW107XHJcbiAgICAgICAgICAgIHZhciBjZWxrZW1fY2FzdGthX3ZwID0gbmV3IERlY2ltYWwoMCk7XHJcbiAgICAgICAgICAgIHZhciBjZWxrZW1fY2FzdGthX2ZpbiA9IG5ldyBEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICB2YXIgY2Vsa2VtX2Nhc3RrYV9yb3pkaWwgPSBuZXcgRGVjaW1hbCgwKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQubW9kZWxTb3Vocm5WUC5mb3JFYWNoKChyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjZWxrZW1fY2FzdGthX3ZwID0gcGFyc2VEZWNpbWFsKGNlbGtlbV9jYXN0a2FfdnApLnBsdXMocGFyc2VEZWNpbWFsKHIuY19wbGFuISkpO1xyXG4gICAgICAgICAgICAgICAgY2Vsa2VtX2Nhc3RrYV9maW4gPSBwYXJzZURlY2ltYWwoY2Vsa2VtX2Nhc3RrYV9maW4pLnBsdXMocGFyc2VEZWNpbWFsKHIuY19maW4hKSk7XHJcbiAgICAgICAgICAgICAgICBjZWxrZW1fY2FzdGthX3JvemRpbCA9IHBhcnNlRGVjaW1hbChjZWxrZW1fY2FzdGthX3JvemRpbCkucGx1cyhwYXJzZURlY2ltYWwoci5jX3JvemRpbCEpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICAgICAvLyAgICBGb3JtdWzDocWZIHRhYnVcclxuICAgICAgICAgICAgdmFyIFNvdWhyblZQRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiU291aHJuVlBcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTEtMTAtMVwiIH0pIC8vLmFkZFNlY3Rpb24oXCJTb3Vocm4gVlBcIilcclxuICAgICAgICAgICAgLy8gICAgLmFkZEZpZWxkKFwiZ3RhYmxlXCIsIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGRhdGE6IHRoYXQubW9kZWxTb3Vocm5WUCwgICAgICAgLy96YXRpbSBuZW1hbSB6YWRuYSBkYXRhLCBuYXN0YXZpbSBwcmF6ZG5lIHBvbGUuIFYgbW9tZW50ZSBuYWN0ZW5pIGplIG5hc3RhdmltIHByZXMgb3B0aW9ucyAobWV0b2RhIGxvYWRKc0dyaWQpXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjb2x1bW5zOiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rX3ZwXCIsIGNhcHRpb246IFwiUm9rXCIsIGRlc2NyaXB0aW9uOiBcIlJva1wiLCB3aWR0aDogNTBcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIG5hbWU6IFwiY19wbGFuXCIsIGNhcHRpb246IFwixIzDoXN0a2EgVlBcIiwgZGVzY3JpcHRpb246IFwixIzDoXN0a2EgVlBcIiwgYWxpZ246IFwicmlnaHRcIiwgd2lkdGg6IDE2MFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgbmFtZTogXCJjX2ZpblwiLCBjYXB0aW9uOiBcIsSMw6FzdGthIEZJTlwiLCBkZXNjcmlwdGlvbjogXCLEjMOhc3RrYSBGSU5cIiwgYWxpZ246IFwicmlnaHRcIiwgd2lkdGg6IDE2MFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgbmFtZTogXCJjX3JvemRpbFwiLCBjYXB0aW9uOiBcIlJvemTDrWxcIiwgZGVzY3JpcHRpb246IFwiUm96ZMOtbFwiLCBhbGlnbjogXCJyaWdodFwiLCB3aWR0aDogMTYwXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vJChcIjxkaXYgY2xhc3M9J2pzLXNvdWhyblZQJz5cIikuYXBwZW5kVG8odGhhdC5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgU291aHJuVlBGb3JtKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGF0Lm1vZGVsU291aHJuVlApO1xyXG5cclxuICAgICAgICAgICAgdmFyIGdyaWRGb3JtYXRTZXpuYW0gPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva192cFwiLCBjYXB0aW9uOiBcIlJva1wiLCBkZXNjcmlwdGlvbjogXCJSb2tcIiwgd2lkdGg6IDUwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfcGxhblwiLCBjYXB0aW9uOiBcIsSMw6FzdGthIFZQXCIsIGRlc2NyaXB0aW9uOiBcIsSMw6FzdGthIFZQXCIsIGFsaWduOiBcInJpZ2h0XCIsIHdpZHRoOiAxNjBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19maW5cIiwgY2FwdGlvbjogXCLEjMOhc3RrYSBGSU5cIiwgZGVzY3JpcHRpb246IFwixIzDoXN0a2EgRklOXCIsIGFsaWduOiBcInJpZ2h0XCIsIHdpZHRoOiAxNjBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19yb3pkaWxcIiwgY2FwdGlvbjogXCJSb3pkw61sXCIsIGRlc2NyaXB0aW9uOiBcIlJvemTDrWxcIiwgYWxpZ246IFwicmlnaHRcIiwgd2lkdGg6IDE2MFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIG1haW5UYWJsZSA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC8vLmFwcGVuZFRvKG1haW5Gb3JtKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtdLCAgICAgICAvL3phdGltIG5lbWFtIHphZG5hIGRhdGEsIG5hc3RhdmltIHByYXpkbmUgcG9sZS4gViBtb21lbnRlIG5hY3RlbmkgamUgbmFzdGF2aW0gcHJlcyBvcHRpb25zIChtZXRvZGEgbG9hZEpzR3JpZClcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBncmlkRm9ybWF0U2V6bmFtLCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcm93c0NsYXNzIDogZnVuY3Rpb24gKGRhdGFSb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldCA9IFwiICBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFSb3cgJiYgZGF0YVJvdy5faXNTdW1tYXJ5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQgPSBcImJvbGRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQudmlld19JU0wgPSBuZXcgR29yZGljLklzbC5WaWV3KHRoYXQuaXNsLkFrY2VWZWNueVByb2ZpbC5saXN0X1N1bWEoeyBmaWx0ZXJzOiB0aGlzLmZpbHRlcl9ha2NlIH0pLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NvcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtYXJuaV9yYWRlazogR29yZGljLkVrby5HcmlkLmNyZWF0ZVN1bW1hcnlQcm9jZXNzb3IoZ3JpZEZvcm1hdFNlem5hbSwgW10pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgbWFpblRhYmxlLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXdfSVNMKTtcclxuXHJcbiAgICAgICAgIH07XHJcblxyXG4gICAgICAgIHJlZnJlc2goZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YShkYXRhLCBcInVwZGF0ZVwiICk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyBaYXbDrXLDoW7DrSBmb3JtdWzDocWZZVxyXG4gICAgICAgIGNsb3NpbmcoIHByb3Zlc3QgKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKHsgZGF0YTogbnVsbCB9KTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZaSB6YXbDrXLDoW7DrSBwb3PDrWxhbsOhbSB6cMSbdCBvYmpla3RcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
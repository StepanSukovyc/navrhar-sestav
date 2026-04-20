"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GKalkZaboru.ts                         </Name>
//    <Description> Okno kalkulačky záborů                                      </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-01-18                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            let GKalkZaboru = class GKalkZaboru extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.dto = {};
                }
                onContentReady() {
                    const that = this;
                    this.actions.addRange([
                        new GAction({
                            name: "actSave",
                            caption: "Uložit",
                            icon: "fa-floppy-o",
                            run: function () { that.ok(); }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        })
                    ]);
                    this.commandBar(this.actions.createBar(["actSave!", "actClose"]));
                    this.createForm();
                }
                createForm() {
                    var that = this;
                    var number1Form = new Gordic.Forms.Form({ name: "kalkZaboruHeaderForm" })
                        //.addRow("Sazba")
                        .addSection()
                        .addText("Sazba", "w-6")
                        .addText("Počet (m2)", "w-6")
                        .addField("gnumberbox", "w-6", {
                        name: "sazba",
                        initialValue: that.sazba,
                        decimals: 2,
                        change: function (ev, input) {
                            that.refresh();
                        }
                    })
                        .addField("gnumberbox", "w-6", {
                        name: "pocet_m2",
                        initialValue: that.pocet_m2,
                        decimals: 2,
                        change: function (ev, input) {
                            that.refresh();
                        }
                    });
                    var number2Form = new Gordic.Forms.Form({ name: "kalkZaboruIntervalForm", layoutDescriptor: "L2M2S2, M-3-9-0, S-3-9-0" })
                        .addSection("Interval")
                        .addRow("Počátek")
                        .addField("gdatebox", {
                        name: "pocatek",
                        change: function (ev, input) {
                            that.refresh();
                        }
                    })
                        .addRow("Konec")
                        .addField("gdatebox", {
                        name: "konec",
                        change: function (ev, input) {
                            that.refresh();
                        }
                    })
                        .addRow()
                        .addField("gcheck", {
                        name: "prac_dny",
                        label: "Pouze pracovní dny",
                        initialValue: false,
                        change: function (ev, input) {
                            that.refresh();
                        }
                    });
                    var number3Form = new Gordic.Forms.Form({ name: "kalkZaboruDnyForm", layoutDescriptor: "L2M2S2, M-12-12-0, S-12-12-0" })
                        .addSection("Dny v týdnu")
                        .addField("gcheck", { name: "pondeli", label: "Pondělí", initialValue: true, labelFromRow: "always", change: function (ev, input) { that.refresh(); } })
                        .addField("gcheck", { name: "utery", label: "Úterý", initialValue: true, labelFromRow: "always", change: function (ev, input) { that.refresh(); } })
                        .addField("gcheck", { name: "streda", label: "Středa", initialValue: true, labelFromRow: "always", change: function (ev, input) { that.refresh(); } })
                        .addField("gcheck", { name: "ctvrtek", label: "Čtvrtek", initialValue: true, labelFromRow: "always", change: function (ev, input) { that.refresh(); } })
                        .addField("gcheck", { name: "patek", label: "Pátek", initialValue: true, labelFromRow: "always", change: function (ev, input) { that.refresh(); } })
                        .addField("gcheck", { name: "sobota", label: "Sobota", initialValue: true, labelFromRow: "always", change: function (ev, input) { that.refresh(); } })
                        .addField("gcheck", { name: "nedele", label: "Neděle", initialValue: true, labelFromRow: "always", change: function (ev, input) { that.refresh(); } });
                    var number4Form = new Gordic.Forms.Form({ name: "kalkZaboruFooterForm" })
                        .addSection()
                        .addText("Doba (dnů)", "w-6")
                        .addText("Celkem", "w-6")
                        .addField("gnumberbox", "w-6", {
                        name: "doba",
                        disabled: true
                    })
                        .addField("gnumberbox", "w-6", {
                        name: "celkem",
                        decimals: 2,
                        initialValue: that.castka,
                        disabled: true
                    });
                    $("<div>").appendTo(this.element).gform("createFrom", number1Form);
                    $("<div>").appendTo(this.element).gform("createFrom", number2Form);
                    $("<div>").appendTo(this.element).gform("createFrom", number3Form);
                    $("<div>").appendTo(this.element).gform("createFrom", number4Form);
                }
                refresh() {
                    var that = this;
                    var intervalForm = this.findForms("kalkZaboruIntervalForm");
                    var pocatek = intervalForm.findFields("pocatek").gfield("getValue");
                    var konec = intervalForm.findFields("konec").gfield("getValue");
                    var prac_dny = intervalForm.findFields("prac_dny").gfield("getValue");
                    if (pocatek != null && konec != null) {
                        //sazba a rozsah plochy
                        var headerForm = this.findForms("kalkZaboruHeaderForm");
                        var sazba = headerForm.findFields("sazba").gfield("getValue");
                        var pocet_m2 = headerForm.findFields("pocet_m2").gfield("getValue");
                        var filter = {};
                        var dnyForm = this.findForms("kalkZaboruDnyForm");
                        //hodnoty zda se má započítat den - false(ne) true(ano)
                        dnyForm.findFields("pondeli", "utery", "streda", "ctvrtek", "patek", "sobota", "nedele").gfield("model", "collect", filter);
                        filter.pocatek = pocatek; //dat_od
                        filter.konec = konec; //dat_do
                        filter.prac_dny = prac_dny; //true(počítat pouze pracovní dny) - false(všechny dny)
                        filter.sazba = sazba; //cena za jeden m2
                        filter.pocet_m2 = pocet_m2; //zabraná plocha
                        this.ziskejData(filter);
                    }
                }
                ziskejData(filter) {
                    var that = this;
                    that.beginOperation({ id: "loadData" });
                    that.isl.KalkZaboru.list(rq => {
                        return {
                            filters: filter
                        };
                    }).get().done(function (dto) {
                        var footerForm = that.findForms("kalkZaboruFooterForm");
                        //vložení vypočítané doby a celkové částky
                        footerForm.findFields("doba").gfield("setValue", dto.data[0].doba);
                        footerForm.findFields("celkem").gfield("setValue", dto.data[0].celkem);
                        that.endOperation({ id: "loadData" });
                    });
                }
                ok() {
                    var that = this;
                    var celkem = this.findForms("kalkZaboruFooterForm").findFields("celkem").gfield("getValue");
                    var headerForm = this.findForms("kalkZaboruHeaderForm");
                    var sazba = headerForm.findFields("sazba").gfield("getValue");
                    var pocet = headerForm.findFields("pocet_m2").gfield("getValue");
                    that.dto.celkem = celkem;
                    that.dto.sazba = sazba;
                    that.dto.pocet = pocet;
                    that.close(that.dto);
                }
            };
            GKalkZaboru = __decorate([
                Decorators.gcontent
            ], GKalkZaboru);
            WebClient.GKalkZaboru = GKalkZaboru;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0thbGtaYWJvcnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHS2Fsa1phYm9ydS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBQ2pCLElBQVUsTUFBTSxDQXlMZjtBQXpMRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F5TG5CO0lBekxnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F5TDdCO1FBekxvQixXQUFBLFNBQVM7WUFHMUIsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBWSxTQUFRLE9BQUEsWUFBWTtnQkFBN0M7O29CQWVZLFFBQUcsR0FBK0MsRUFBRSxDQUFDO2dCQXNLakUsQ0FBQztnQkFuS0csY0FBYztvQkFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBR2xCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixJQUFJLE9BQU8sQ0FBQzs0QkFDUixJQUFJLEVBQUUsU0FBUzs0QkFDZixPQUFPLEVBQUUsUUFBUTs0QkFDakIsSUFBSSxFQUFFLGFBQWE7NEJBQ25CLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQSxDQUFDLENBQUM7eUJBQ2pDLENBQUM7d0JBQ0YsSUFBSSxPQUFPLENBQUM7NEJBQ1IsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLE9BQU8sRUFBRSxRQUFROzRCQUNqQixJQUFJLEVBQUUsaUJBQWlCOzRCQUN2QixHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUEsQ0FBQyxDQUFDO3lCQUNwQyxDQUFDO3FCQUNMLENBQUMsQ0FBQTtvQkFFRixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbEUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN0QixDQUFDO2dCQUVPLFVBQVU7b0JBQ2QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixFQUFFLENBQUM7d0JBQ3JFLGtCQUFrQjt5QkFDakIsVUFBVSxFQUFFO3lCQUNaLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDO3lCQUN2QixPQUFPLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQzt5QkFDNUIsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUU7d0JBQzNCLElBQUksRUFBRSxPQUFPO3dCQUNiLFlBQVksRUFBRSxJQUFJLENBQUMsS0FBSzt3QkFDeEIsUUFBUSxFQUFFLENBQUM7d0JBQ1gsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEtBQUs7NEJBQ3ZCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDbkIsQ0FBQztxQkFDSixDQUFDO3lCQUNELFFBQVEsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFO3dCQUMzQixJQUFJLEVBQUUsVUFBVTt3QkFDaEIsWUFBWSxFQUFFLElBQUksQ0FBQyxRQUFRO3dCQUMzQixRQUFRLEVBQUUsQ0FBQzt3QkFDWCxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsS0FBSzs0QkFDdkIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNuQixDQUFDO3FCQUNKLENBQUMsQ0FBQTtvQkFFTixJQUFJLFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLHdCQUF3QixFQUFFLGdCQUFnQixFQUFFLDBCQUEwQixFQUFFLENBQUM7eUJBQ3BILFVBQVUsQ0FBQyxVQUFVLENBQUM7eUJBQ3RCLE1BQU0sQ0FBQyxTQUFTLENBQUM7eUJBQ2pCLFFBQVEsQ0FBQyxVQUFVLEVBQUU7d0JBQ2xCLElBQUksRUFBRSxTQUFTO3dCQUNmLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxLQUFLOzRCQUN2QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ25CLENBQUM7cUJBQ0osQ0FBQzt5QkFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO3lCQUNmLFFBQVEsQ0FBQyxVQUFVLEVBQUU7d0JBQ2xCLElBQUksRUFBRSxPQUFPO3dCQUNiLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxLQUFLOzRCQUN2QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ25CLENBQUM7cUJBQ0osQ0FBQzt5QkFDRCxNQUFNLEVBQUU7eUJBQ1IsUUFBUSxDQUFDLFFBQVEsRUFBRTt3QkFDaEIsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLEtBQUssRUFBRSxvQkFBb0I7d0JBQzNCLFlBQVksRUFBRSxLQUFLO3dCQUNuQixNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsS0FBSzs0QkFDdkIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNuQixDQUFDO3FCQUNKLENBQUMsQ0FBQTtvQkFFTixJQUFJLFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixFQUFFLDhCQUE4QixFQUFFLENBQUM7eUJBQ25ILFVBQVUsQ0FBQyxhQUFhLENBQUM7eUJBQ3pCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7eUJBQ3RKLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7eUJBQ25KLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7eUJBQ3JKLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7eUJBQ3ZKLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7eUJBQ25KLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7eUJBQ3JKLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtvQkFFMUosSUFBSSxXQUFXLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxDQUFDO3lCQUNwRSxVQUFVLEVBQUU7eUJBQ1osT0FBTyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUM7eUJBQzVCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDO3lCQUN4QixRQUFRLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRTt3QkFDM0IsSUFBSSxFQUFFLE1BQU07d0JBQ1osUUFBUSxFQUFFLElBQUk7cUJBQ2pCLENBQUM7eUJBQ0QsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUU7d0JBQzNCLElBQUksRUFBRSxRQUFRO3dCQUNkLFFBQVEsRUFBRSxDQUFDO3dCQUNYLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTTt3QkFDekIsUUFBUSxFQUFFLElBQUk7cUJBQ2pCLENBQUMsQ0FBQTtvQkFDTixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDO29CQUNuRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDO29CQUNuRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDO29CQUNuRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUN2RSxDQUFDO2dCQUdPLE9BQU87b0JBQ1gsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLENBQUM7b0JBQzVELElBQUksT0FBTyxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNwRSxJQUFJLEtBQUssR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDaEUsSUFBSSxRQUFRLEdBQUcsWUFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBRXRFLElBQUksT0FBTyxJQUFJLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFLENBQUM7d0JBQ25DLHVCQUF1Qjt3QkFDdkIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO3dCQUN2RCxJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDOUQsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBRXBFLElBQUksTUFBTSxHQUFRLEVBQUUsQ0FBQzt3QkFDckIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO3dCQUNsRCx1REFBdUQ7d0JBQ3ZELE9BQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBQzdILE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUcsUUFBUTt3QkFDcEMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBTyxRQUFRO3dCQUNwQyxNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLHVEQUF1RDt3QkFDbkYsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBTyxrQkFBa0I7d0JBQzlDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsZ0JBQWdCO3dCQUU1QyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUU1QixDQUFDO2dCQUNMLENBQUM7Z0JBRU8sVUFBVSxDQUFDLE1BQVc7b0JBQzFCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO29CQUN4QyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBRWhCLEVBQUUsQ0FBQyxFQUFFO3dCQUNELE9BQU87NEJBQ0gsT0FBTyxFQUFFLE1BQU07eUJBQ2xCLENBQUE7b0JBQ0wsQ0FBQyxDQUNSLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRzt3QkFDdEIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO3dCQUN4RCwwQ0FBMEM7d0JBQzFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNuRSxVQUFVLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDdkUsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO29CQUMxQyxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUNELEVBQUU7b0JBQ0UsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLHNCQUFzQixDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDNUYsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO29CQUN4RCxJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDOUQsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBRWpFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztvQkFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBRXZCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUN4QixDQUFDO2FBQ0osQ0FBQTtZQXJMWSxXQUFXO2dCQUR2QixVQUFVLENBQUMsUUFBUTtlQUNQLFdBQVcsQ0FxTHZCO1lBckxZLHFCQUFXLGNBcUx2QixDQUFBO1FBQ0wsQ0FBQyxFQXpMb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBeUw3QjtJQUFELENBQUMsRUF6TGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXlMbkI7QUFBRCxDQUFDLEVBekxTLE1BQU0sS0FBTixNQUFNLFFBeUxmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdLYWxrWmFib3J1LnRzICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBPa25vIGthbGt1bGHEjWt5IHrDoWJvcsWvICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIHZjZWNoICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI0LTAxLTE4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHS2Fsa1phYm9ydSBleHRlbmRzIEdDb250ZW50QmFzZSB7ICAgICBcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBEb3BsxYhrb3bDqSDDumRhamUgLSBmb3JtXHJcbiAgICAgICAgKiBAdHlwZSB7SlF1ZXJ5PD59XHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG1haW5Gb3JtOiBKUXVlcnk8SFRNTEVsZW1lbnQ+OyAgICBcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjZWxrZW07XHJcbiAgICAgICAgcHJpdmF0ZSBkb2JhO1xyXG5cclxuICAgICAgICBzYXpiYTogTnVtYmVyO1xyXG4gICAgICAgIHBvY2V0X20yOiBTdHJpbmc7XHJcbiAgICAgICAgY2FzdGthOiBOdW1iZXI7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZHRvOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0thbGtaYWJvcnVEdG8gPSB7fTtcclxuXHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVWxvxb5pdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtZmxvcHB5LW9cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5vaygpIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlphdsWZw610XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5jbG9zZSgpIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RTYXZlIVwiLCBcImFjdENsb3NlXCJdKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRm9ybSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBudW1iZXIxRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwia2Fsa1phYm9ydUhlYWRlckZvcm1cIiB9KSAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRSb3coXCJTYXpiYVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJTYXpiYVwiLCBcInctNlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJQb8SNZXQgKG0yKVwiLCBcInctNlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzYXpiYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhhdC5zYXpiYSxcclxuICAgICAgICAgICAgICAgICAgICBkZWNpbWFsczogMixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb2NldF9tMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhhdC5wb2NldF9tMixcclxuICAgICAgICAgICAgICAgICAgICBkZWNpbWFsczogMixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHZhciBudW1iZXIyRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwia2Fsa1phYm9ydUludGVydmFsRm9ybVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMiwgTS0zLTktMCwgUy0zLTktMFwiIH0pICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiSW50ZXJ2YWxcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb8SNw6F0ZWtcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvY2F0ZWtcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJLb25lY1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia29uZWNcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByYWNfZG55XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUG91emUgcHJhY292bsOtIGRueVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIG51bWJlcjNGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJrYWxrWmFib3J1RG55Rm9ybVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMiwgTS0xMi0xMi0wLCBTLTEyLTEyLTBcIiB9KSAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIkRueSB2IHTDvWRudVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJwb25kZWxpXCIsIGxhYmVsOiBcIlBvbmTEm2zDrVwiLCBpbml0aWFsVmFsdWU6IHRydWUsIGxhYmVsRnJvbVJvdzogXCJhbHdheXNcIiwgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IHRoYXQucmVmcmVzaCgpOyB9fSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwidXRlcnlcIiwgbGFiZWw6IFwiw5p0ZXLDvVwiLCBpbml0aWFsVmFsdWU6IHRydWUsIGxhYmVsRnJvbVJvdzogXCJhbHdheXNcIiwgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IHRoYXQucmVmcmVzaCgpOyB9IH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBuYW1lOiBcInN0cmVkYVwiLCBsYWJlbDogXCJTdMWZZWRhXCIsIGluaXRpYWxWYWx1ZTogdHJ1ZSwgbGFiZWxGcm9tUm93OiBcImFsd2F5c1wiLCBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgdGhhdC5yZWZyZXNoKCk7IH0gfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwiY3R2cnRla1wiLCBsYWJlbDogXCLEjHR2cnRla1wiLCBpbml0aWFsVmFsdWU6IHRydWUsIGxhYmVsRnJvbVJvdzogXCJhbHdheXNcIiwgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IHRoYXQucmVmcmVzaCgpOyB9IH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBuYW1lOiBcInBhdGVrXCIsIGxhYmVsOiBcIlDDoXRla1wiLCBpbml0aWFsVmFsdWU6IHRydWUsIGxhYmVsRnJvbVJvdzogXCJhbHdheXNcIiwgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IHRoYXQucmVmcmVzaCgpOyB9IH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBuYW1lOiBcInNvYm90YVwiLCBsYWJlbDogXCJTb2JvdGFcIiwgaW5pdGlhbFZhbHVlOiB0cnVlLCBsYWJlbEZyb21Sb3c6IFwiYWx3YXlzXCIsIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB0aGF0LnJlZnJlc2goKTsgfSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJuZWRlbGVcIiwgbGFiZWw6IFwiTmVkxJtsZVwiLCBpbml0aWFsVmFsdWU6IHRydWUsIGxhYmVsRnJvbVJvdzogXCJhbHdheXNcIiwgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IHRoYXQucmVmcmVzaCgpOyB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIG51bWJlcjRGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJrYWxrWmFib3J1Rm9vdGVyRm9ybVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIkRvYmEgKGRuxa8pXCIsIFwidy02XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIkNlbGtlbVwiLCBcInctNlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkb2JhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNlbGtlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlY2ltYWxzOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhhdC5jYXN0a2EsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBudW1iZXIxRm9ybSk7XHJcbiAgICAgICAgICAgICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBudW1iZXIyRm9ybSk7XHJcbiAgICAgICAgICAgICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBudW1iZXIzRm9ybSk7XHJcbiAgICAgICAgICAgICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBudW1iZXI0Rm9ybSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWZyZXNoKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBpbnRlcnZhbEZvcm0gPSB0aGlzLmZpbmRGb3JtcyhcImthbGtaYWJvcnVJbnRlcnZhbEZvcm1cIik7XHJcbiAgICAgICAgICAgIHZhciBwb2NhdGVrID0gaW50ZXJ2YWxGb3JtLmZpbmRGaWVsZHMoXCJwb2NhdGVrXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIga29uZWMgPSBpbnRlcnZhbEZvcm0uZmluZEZpZWxkcyhcImtvbmVjXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgcHJhY19kbnkgPSBpbnRlcnZhbEZvcm0uZmluZEZpZWxkcyhcInByYWNfZG55XCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBvY2F0ZWsgIT0gbnVsbCAmJiBrb25lYyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvL3NhemJhIGEgcm96c2FoIHBsb2NoeVxyXG4gICAgICAgICAgICAgICAgdmFyIGhlYWRlckZvcm0gPSB0aGlzLmZpbmRGb3JtcyhcImthbGtaYWJvcnVIZWFkZXJGb3JtXCIpXHJcbiAgICAgICAgICAgICAgICB2YXIgc2F6YmEgPSBoZWFkZXJGb3JtLmZpbmRGaWVsZHMoXCJzYXpiYVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgIHZhciBwb2NldF9tMiA9IGhlYWRlckZvcm0uZmluZEZpZWxkcyhcInBvY2V0X20yXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBmaWx0ZXI6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgdmFyIGRueUZvcm0gPSB0aGlzLmZpbmRGb3JtcyhcImthbGtaYWJvcnVEbnlGb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgLy9ob2Rub3R5IHpkYSBzZSBtw6EgemFwb8SNw610YXQgZGVuIC0gZmFsc2UobmUpIHRydWUoYW5vKVxyXG4gICAgICAgICAgICAgICAgZG55Rm9ybSEuZmluZEZpZWxkcyhcInBvbmRlbGlcIiwgXCJ1dGVyeVwiLCBcInN0cmVkYVwiLCBcImN0dnJ0ZWtcIiwgXCJwYXRla1wiLCBcInNvYm90YVwiLCBcIm5lZGVsZVwiKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZmlsdGVyKTtcclxuICAgICAgICAgICAgICAgIGZpbHRlci5wb2NhdGVrID0gcG9jYXRlazsgICAvL2RhdF9vZFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyLmtvbmVjID0ga29uZWM7ICAgICAgIC8vZGF0X2RvXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIucHJhY19kbnkgPSBwcmFjX2RueTsgLy90cnVlKHBvxI3DrXRhdCBwb3V6ZSBwcmFjb3Zuw60gZG55KSAtIGZhbHNlKHbFoWVjaG55IGRueSlcclxuICAgICAgICAgICAgICAgIGZpbHRlci5zYXpiYSA9IHNhemJhOyAgICAgICAvL2NlbmEgemEgamVkZW4gbTJcclxuICAgICAgICAgICAgICAgIGZpbHRlci5wb2NldF9tMiA9IHBvY2V0X20yOyAvL3phYnJhbsOhIHBsb2NoYVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuemlza2VqRGF0YShmaWx0ZXIpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB6aXNrZWpEYXRhKGZpbHRlcjogYW55KTogdm9pZCB7ICAgLy96w61za8OhbsOtIGRhdCB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcImxvYWREYXRhXCIgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuaXNsLkthbGtaYWJvcnUubGlzdFxyXG4gICAgICAgICAgICAgICAgKFxyXG4gICAgICAgICAgICAgICAgICAgIHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IGZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApLmdldCgpLmRvbmUoZnVuY3Rpb24gKGR0bykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZvb3RlckZvcm0gPSB0aGF0LmZpbmRGb3JtcyhcImthbGtaYWJvcnVGb290ZXJGb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgLy92bG/FvmVuw60gdnlwb8SNw610YW7DqSBkb2J5IGEgY2Vsa292w6kgxI3DoXN0a3lcclxuICAgICAgICAgICAgICAgIGZvb3RlckZvcm0uZmluZEZpZWxkcyhcImRvYmFcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZHRvLmRhdGFbMF0uZG9iYSk7XHJcbiAgICAgICAgICAgICAgICBmb290ZXJGb3JtLmZpbmRGaWVsZHMoXCJjZWxrZW1cIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZHRvLmRhdGFbMF0uY2Vsa2VtKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwibG9hZERhdGFcIiB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9rKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7ICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgY2Vsa2VtID0gdGhpcy5maW5kRm9ybXMoXCJrYWxrWmFib3J1Rm9vdGVyRm9ybVwiKS5maW5kRmllbGRzKFwiY2Vsa2VtXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgaGVhZGVyRm9ybSA9IHRoaXMuZmluZEZvcm1zKFwia2Fsa1phYm9ydUhlYWRlckZvcm1cIik7XHJcbiAgICAgICAgICAgIHZhciBzYXpiYSA9IGhlYWRlckZvcm0uZmluZEZpZWxkcyhcInNhemJhXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgcG9jZXQgPSBoZWFkZXJGb3JtLmZpbmRGaWVsZHMoXCJwb2NldF9tMlwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZHRvLmNlbGtlbSA9IGNlbGtlbTtcclxuICAgICAgICAgICAgdGhhdC5kdG8uc2F6YmEgPSBzYXpiYTtcclxuICAgICAgICAgICAgdGhhdC5kdG8ucG9jZXQgPSBwb2NldDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuY2xvc2UodGhhdC5kdG8pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
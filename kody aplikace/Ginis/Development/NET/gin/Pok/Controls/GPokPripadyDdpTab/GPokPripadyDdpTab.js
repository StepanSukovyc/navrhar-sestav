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
            let GPokPripadyDdpTab = class GPokPripadyDdpTab extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    this.title = "Případy DDP";
                    this.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    let form = new Gordic.Forms
                        .Form({
                        name: "pokPripadyDdpForm", tabOptions: { title: "Filtry", opened: true }, layoutDescriptor: "L1M1S1"
                    })
                        .addSection()
                        .addRow("jres:31302119")
                        .addField("gselectbox", {
                        name: "ixs_esu",
                        model: "ixs_esu=ixs_esu",
                        initialValue: { ixs_esu: that.filterixsesu }
                    }, Gordic.Esu.Prefabs.vyberEsu({
                        typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu, // přidání prefabu   
                        Logovani: {
                            Ixp: "0000X0000003", // zadání logovacích údaju je nutnost hlavně IXP
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani, // vybrat z enumu
                            AktZnacka: "0000X0000003",
                            DuvodHledaniTxt: "Okno případů DDP v POK"
                        },
                    }))
                        .addRow("VS")
                        .addField("gstringbox", { name: "vs", initialValue: that.filtervs })
                        .addRow("Typ pohledávky")
                        .addField("gselectbox", Gordic.Prefabs.Select.ddpstpp(), {
                        initialValue: { typ_phl: that.filtertyppohledavky },
                        name: "typ_phl",
                        dropdown: false,
                        // serverFilter: { aktivita: 100 }
                        model: "model.typ_phl = value.typ_phl"
                    })
                        .addRow()
                        .addField("gcheck", { name: "napojene_pripady", label: "Včetně napojených případů" });
                    this.filter = $("<div>").appendTo(this.element).
                        gfilterpanel({
                        forms: [
                            form
                        ],
                        filterViewMode: FilterViewMode.Simple,
                        apply: (event, obj) => {
                            // this.vyhledat(obj.filter)
                        }
                    });
                    this.view = new Gordic.Isl.View(that.isl.PokBankPlatby.listPripadyDdp(rq => rq), {
                        filterPanel: that.filter,
                        //key: ["ixs_esu"],
                        startEmpty: true
                    });
                    this.grid = $("<div>").appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        data: this.view, // this.modelPolozky[0]   //zatim nemam zadna data, nastavim prazdne pole. V momente nacteni je nastavim pres options (metoda loadJsGrid)
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit", // fit, full
                        navigationMode: "row", // row, cell
                        //scrollHelperTemplate: "{ac}",
                        //  searchColumns: ["ac"],
                        rowNumbers: false,
                        columns: this.createGridFormat()
                    });
                }
                createGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({ name: "ixp", caption: "PID" });
                    gridFormat.addTextColumn({ name: "vs", caption: "VS" });
                    gridFormat.addTextColumn({ name: "typ_phl", caption: "Pohl." });
                    gridFormat.addTextColumn({ name: "ddpstpp_nazev", caption: "Název pohledávky" });
                    gridFormat.addDecimalColumn({ name: "c_poc_stav", caption: "Stav k datu" });
                    gridFormat.addDecimalColumn({ name: "c_pohl", caption: "Předpis" });
                    gridFormat.addDecimalColumn({ name: "c_platby", caption: "Platby" });
                    gridFormat.addDecimalColumn({ name: "c_saldo", caption: "Saldo" });
                    gridFormat.addTextColumn({ name: "ac", caption: "AC" });
                    gridFormat.addTextColumn({ name: "ddpsden_nazev", caption: "Kniha DDP" });
                    gridFormat.addTextColumn({ name: "esu_txt", caption: "Název ESU" });
                    gridFormat.addDateColumn({ name: "dat_do", caption: "Datum ukončení" });
                    gridFormat.addTextColumn({ name: "ddp_radek_nazev", caption: "Řádek" });
                    gridFormat.addTextColumn({ name: "ddp_ctvrt_nazev", caption: "Čtvrť" });
                    return gridFormat;
                }
            };
            GPokPripadyDdpTab = __decorate([
                Decorators.gcontent
            ], GPokPripadyDdpTab);
            WebClient.GPokPripadyDdpTab = GPokPripadyDdpTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva1ByaXBhZHlEZHBUYWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUG9rUHJpcGFkeURkcFRhYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBd0hmO0FBeEhELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXdIbkI7SUF4SGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXdIN0I7UUF4SG9CLFdBQUEsU0FBUztZQUcxQixJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFrQixTQUFRLE9BQUEsWUFBWTtnQkFlL0MsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFBO29CQUMxQixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUVwRSxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLO3lCQUN0QixJQUFJLENBQUM7d0JBQ0YsSUFBSSxFQUFFLG1CQUFtQixFQUFFLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLGdCQUFnQixFQUFFLFFBQVE7cUJBQ2hHLENBQUM7eUJBQ1IsVUFBVSxFQUFFO3lCQUNaLE1BQU0sQ0FBQyxlQUFlLENBQUM7eUJBQ3ZCLFFBQVEsQ0FBQyxZQUFZLEVBQUU7d0JBQ3BCLElBQUksRUFBRSxTQUFTO3dCQUNmLEtBQUssRUFBRSxpQkFBaUI7d0JBQ3hCLFlBQVksRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFO3FCQUMvQyxFQUNHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDeEIsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLEVBQW9DLHFCQUFxQjt3QkFDckgsUUFBUSxFQUNSOzRCQUNJLEdBQUcsRUFBRSxjQUFjLEVBQW9FLGdEQUFnRDs0QkFDdkksWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQVUsaUJBQWlCOzRCQUNuRyxTQUFTLEVBQUUsY0FBYzs0QkFDekIsZUFBZSxFQUFFLHdCQUF3Qjt5QkFDNUM7cUJBQ0osQ0FBMkIsQ0FBQzt5QkFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQzt5QkFDWixRQUFRLENBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO3lCQUNuRSxNQUFNLENBQUMsZ0JBQWdCLENBQUM7eUJBQ3hCLFFBQVEsQ0FBQyxZQUFZLEVBQ2xCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUMvQjt3QkFDSSxZQUFZLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFO3dCQUNuRCxJQUFJLEVBQUUsU0FBUzt3QkFDZixRQUFRLEVBQUUsS0FBSzt3QkFDZixrQ0FBa0M7d0JBQ2xDLEtBQUssRUFBRSwrQkFBK0I7cUJBQ3pDLENBQUM7eUJBQ0wsTUFBTSxFQUFFO3lCQUNSLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLDJCQUEyQixFQUFFLENBQUMsQ0FBQztvQkFHMUYsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7d0JBQzNDLFlBQVksQ0FBQzt3QkFDVCxLQUFLLEVBQUU7NEJBQ0gsSUFBSTt5QkFBQzt3QkFDVCxjQUFjLEVBQUUsY0FBYyxDQUFDLE1BQU07d0JBQ3JDLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFDbkIsNEJBQTRCO3dCQUMvQixDQUFDO3FCQUNKLENBQUMsQ0FBQTtvQkFFTixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FDakMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQ1gsRUFDRDt3QkFDSSxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU07d0JBQ3hCLG1CQUFtQjt3QkFDbkIsVUFBVSxFQUFFLElBQUk7cUJBRW5CLENBQUMsQ0FBQztvQkFHUCxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzt5QkFDeEMsUUFBUSxFQUFFO3lCQUNWLEtBQUssQ0FBQzt3QkFDSCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBSSx5SUFBeUk7d0JBQzVKLFVBQVUsRUFBRSxNQUFNLEVBQU0sNkNBQTZDO3dCQUNyRSxVQUFVLEVBQUUsS0FBSyxFQUFPLFlBQVk7d0JBQ3BDLGNBQWMsRUFBRSxLQUFLLEVBQUcsWUFBWTt3QkFDcEMsK0JBQStCO3dCQUMvQiwwQkFBMEI7d0JBQzFCLFVBQVUsRUFBRSxLQUFLO3dCQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO3FCQUNuQyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQztnQkFFTyxnQkFBZ0I7b0JBQ3BCLElBQUksVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQTBDLENBQUM7b0JBRXRGLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO29CQUMxRCxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDeEQsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQ2hFLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxDQUFDLENBQUM7b0JBQ2pGLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7b0JBQzVFLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7b0JBQ3BFLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQ3JFLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQ25FLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUN4RCxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztvQkFDMUUsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7b0JBQ3BFLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBQyxDQUFDLENBQUE7b0JBQ3ZFLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQ3hFLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBRXhFLE9BQU8sVUFBVSxDQUFDO2dCQUV0QixDQUFDO2FBQ0osQ0FBQTtZQXBIWSxpQkFBaUI7Z0JBRDdCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsaUJBQWlCLENBb0g3QjtZQXBIWSwyQkFBaUIsb0JBb0g3QixDQUFBO1FBQ0wsQ0FBQyxFQXhIb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBd0g3QjtJQUFELENBQUMsRUF4SGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXdIbkI7QUFBRCxDQUFDLEVBeEhTLE1BQU0sS0FBTixNQUFNLFFBd0hmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5Qb2suV2ViQ2xpZW50IHtcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQb2tQcmlwYWR5RGRwVGFiIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICBwcml2YXRlIHZpZXc6IElzbC5WaWV3PEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tQcmlwYWR5RGRwRHRvPjtcclxuXHJcbiAgICAgICAgcHVibGljIGZpbHRlcml4c2VzdTogc3RyaW5nO1xyXG5cclxuICAgICAgICBwdWJsaWMgZmlsdGVydnM6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHVibGljIGZpbHRlcnR5cHBvaGxlZGF2a3k6IHN0cmluZztcclxuXHJcblxyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcIlDFmcOtcGFkeSBERFBcIlxyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKFt7IGNhcHRpb246IHRoaXMudGl0bGUsIGRlZmF1bHRBY3Rpb246IHRydWUgfV0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zXHJcbiAgICAgICAgICAgICAgICAuRm9ybSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb2tQcmlwYWR5RGRwRm9ybVwiLCB0YWJPcHRpb25zOiB7IHRpdGxlOiBcIkZpbHRyeVwiLCBvcGVuZWQ6IHRydWUgfSwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzFcIlxyXG4gICAgICAgICAgICAgICAgfSBhcyBhbnkpXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTMwMjExOVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiaXhzX2VzdT1peHNfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IGl4c19lc3U6IHRoYXQuZmlsdGVyaXhzZXN1IH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLkVzdS5QcmVmYWJzLnZ5YmVyRXN1KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwOiBHb3JkaWMuRXN1Lkdsb2JhbHMuRW51bXMuVHlwWm9icmF6ZW5pS2Fyb3Rla2EuU2VsZWN0RXN1LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZaWTDoW7DrSBwcmVmYWJ1ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ292YW5pOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHA6IFwiMDAwMFgwMDAwMDAzXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHphZMOhbsOtIGxvZ292YWPDrWNoIMO6ZGFqdSBqZSBudXRub3N0IGhsYXZuxJsgSVhQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmk6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5EdXZvZEhsZWRhbmlFc3UuemFkYW5pRXN1VkhsZWRhbmksICAgICAgICAgLy8gdnlicmF0IHogZW51bXVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFrdFpuYWNrYTogXCIwMDAwWDAwMDAwMDNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaVR4dDogXCJPa25vIHDFmcOtcGFkxa8gRERQIHYgUE9LXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9KSBhcyBHU2VsZWN0Qm94T3B0aW9uczxhbnk+KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlZTXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJ2c1wiLCBpbml0aWFsVmFsdWU6IHRoYXQuZmlsdGVydnMgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJUeXAgcG9obGVkw6F2a3lcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZGRwc3RwcCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IHR5cF9waGw6IHRoYXQuZmlsdGVydHlwcG9obGVkYXZreSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9waGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXJ2ZXJGaWx0ZXI6IHsgYWt0aXZpdGE6IDEwMCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnR5cF9waGwgPSB2YWx1ZS50eXBfcGhsXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBuYW1lOiBcIm5hcG9qZW5lX3ByaXBhZHlcIiwgbGFiZWw6IFwiVsSNZXRuxJsgbmFwb2plbsO9Y2ggcMWZw61wYWTFr1wiIH0pOyAgICAgICAgICAgICBcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmZpbHRlciA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLlxyXG4gICAgICAgICAgICAgICAgZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtXSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5OiAoZXZlbnQsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMudnlobGVkYXQob2JqLmZpbHRlcilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gbmV3IEdvcmRpYy5Jc2wuVmlldyA8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva1ByaXBhZHlEZHBEdG8+KFxyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuUG9rQmFua1BsYXRieS5saXN0UHJpcGFkeURkcChcclxuICAgICAgICAgICAgICAgICAgICBycSA9PiBycSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyUGFuZWw6IHRoYXQuZmlsdGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIC8va2V5OiBbXCJpeHNfZXN1XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RW1wdHk6IHRydWVcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy52aWV3LCAgIC8vIHRoaXMubW9kZWxQb2xvemt5WzBdICAgLy96YXRpbSBuZW1hbSB6YWRuYSBkYXRhLCBuYXN0YXZpbSBwcmF6ZG5lIHBvbGUuIFYgbW9tZW50ZSBuYWN0ZW5pIGplIG5hc3RhdmltIHByZXMgb3B0aW9ucyAobWV0b2RhIGxvYWRKc0dyaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyTW9kZTogXCJhdXRvXCIsICAgICAvLyBhdXRvLCBhbGwtYXQtb25jZSwgcGFnZWQtc3luYywgcGFnZWQtYXN5bmNcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZpdFwiLCAgICAgIC8vIGZpdCwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLCAgLy8gcm93LCBjZWxsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zY3JvbGxIZWxwZXJUZW1wbGF0ZTogXCJ7YWN9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gIHNlYXJjaENvbHVtbnM6IFtcImFjXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkRHRvPiB7XHJcbiAgICAgICAgICAgIHZhciBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWREdG8+KCk7XHJcblxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4cFwiLCBjYXB0aW9uOiBcIlBJRFwiIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInZzXCIsIGNhcHRpb246IFwiVlNcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ0eXBfcGhsXCIsIGNhcHRpb246IFwiUG9obC5cIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJkZHBzdHBwX25hemV2XCIsIGNhcHRpb246IFwiTsOhemV2IHBvaGxlZMOhdmt5XCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkRGVjaW1hbENvbHVtbih7IG5hbWU6IFwiY19wb2Nfc3RhdlwiLCBjYXB0aW9uOiBcIlN0YXYgayBkYXR1XCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkRGVjaW1hbENvbHVtbih7IG5hbWU6IFwiY19wb2hsXCIsIGNhcHRpb246IFwiUMWZZWRwaXNcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGREZWNpbWFsQ29sdW1uKHsgbmFtZTogXCJjX3BsYXRieVwiLCBjYXB0aW9uOiBcIlBsYXRieVwiIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZERlY2ltYWxDb2x1bW4oeyBuYW1lOiBcImNfc2FsZG9cIiwgY2FwdGlvbjogXCJTYWxkb1wiIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImFjXCIsIGNhcHRpb246IFwiQUNcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJkZHBzZGVuX25hemV2XCIsIGNhcHRpb246IFwiS25paGEgRERQXCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiZXN1X3R4dFwiLCBjYXB0aW9uOiBcIk7DoXpldiBFU1VcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGREYXRlQ29sdW1uKHsgbmFtZTogXCJkYXRfZG9cIiAsIGNhcHRpb246IFwiRGF0dW0gdWtvbsSNZW7DrVwifSlcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJkZHBfcmFkZWtfbmF6ZXZcIiwgY2FwdGlvbjogXCLFmMOhZGVrXCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiZGRwX2N0dnJ0X25hemV2XCIsIGNhcHRpb246IFwixIx0dnLFpVwiIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
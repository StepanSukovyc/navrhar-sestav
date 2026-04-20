"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GDatumUzaverky.ts                      </Name>
//    <Description> Datum uzávěrky                                              </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2019-01-08                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Controls;
            (function (Controls) {
                var TypyPohledavek;
                (function (TypyPohledavek) {
                    let GDatumUzaverky = class GDatumUzaverky extends Gordic.GContentBase {
                        onContentReady() {
                            this.title = "Zadání data uzávěrky";
                            let prednastaveni_data = "0";
                            if (this.userSettings != null) {
                                let tmp = this.userSettings.get("prednastaveni_data");
                                if (tmp != null)
                                    prednastaveni_data = tmp;
                            }
                            let form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1" })
                                .addRow("Poslední datum úzávěrky")
                                .addField("gdatebox", {
                                name: "posledni_datum_uzaverky",
                                disabled: true
                            })
                                .addRow("Datum uzávěrky")
                                .addField("gdatebox", {
                                name: "datum_uzaverky",
                                validators: [new Gordic.Validators.Required()]
                            })
                                .addRow("Přednastavení data").addField("gradio", {
                                initialValue: prednastaveni_data,
                                itemClass: "w-12",
                                name: "prednastaveni_data",
                                change: (ev, obj) => {
                                    this.zmenitDatum();
                                },
                                radios: [
                                    { value: "0", label: "Aktuální datum" },
                                    { value: "1", label: "Poslední den aktuálního měsíce" },
                                    { value: "2", label: "Poslední den neuzavřeného měsíce" }
                                ]
                            });
                            this.defaultForm = $("<div>")
                                .appendTo(this.element)
                                .gform("createFrom", form);
                            this.defaultForm.findFields("posledni_datum_uzaverky").gfield("setValue", this.dat_uzav);
                            this.zmenitDatum();
                        }
                        zmenitDatum() {
                            let prednastaveni_data = this.defaultForm.findFields("prednastaveni_data").gfield("getValue");
                            let datum;
                            switch (prednastaveni_data) {
                                case "0":
                                default:
                                    datum = this.dat_dnes;
                                    break;
                                case "1":
                                    datum = this.dat_konec_mesice;
                                    break;
                                case "2":
                                    datum = this.dat_konec_neuzavreneho_mesice;
                                    break;
                            }
                            this.defaultForm.findFields("datum_uzaverky").gfield("setValue", datum);
                        }
                        ok() {
                            if (this.defaultForm.gform("isValid")) {
                                let prednastaveni_data = this.defaultForm.findFields("prednastaveni_data").gfield("getValue");
                                if (this.userSettings != null) {
                                    this.userSettings.set("prednastaveni_data", prednastaveni_data);
                                }
                                let retVal = this.defaultForm.findFields("datum_uzaverky").gfield("getValue");
                                this.close(retVal);
                            }
                        }
                    };
                    GDatumUzaverky = __decorate([
                        Decorators.gcontent
                    ], GDatumUzaverky);
                    TypyPohledavek.GDatumUzaverky = GDatumUzaverky;
                })(TypyPohledavek = Controls.TypyPohledavek || (Controls.TypyPohledavek = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RhdHVtVXphdmVya3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRGF0dW1VemF2ZXJreS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBQ2pCLElBQVUsTUFBTSxDQXFGZjtBQXJGRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FxRm5CO0lBckZnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FxRjdCO1FBckZvQixXQUFBLFNBQVM7WUFBQyxJQUFBLFFBQVEsQ0FxRnRDO1lBckY4QixXQUFBLFFBQVE7Z0JBQUMsSUFBQSxjQUFjLENBcUZyRDtnQkFyRnVDLFdBQUEsY0FBYztvQkFHbEQsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBZSxTQUFRLE9BQUEsWUFBWTt3QkFPNUMsY0FBYzs0QkFDVixJQUFJLENBQUMsS0FBSyxHQUFHLHNCQUFzQixDQUFDOzRCQUVwQyxJQUFJLGtCQUFrQixHQUFHLEdBQUcsQ0FBQzs0QkFDN0IsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksRUFBRSxDQUFDO2dDQUM1QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dDQUN0RCxJQUFJLEdBQUcsSUFBSSxJQUFJO29DQUNYLGtCQUFrQixHQUFHLEdBQUcsQ0FBQzs0QkFDakMsQ0FBQzs0QkFFRCxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLENBQUM7aUNBQzNELE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQztpQ0FDakMsUUFBUSxDQUFDLFVBQVUsRUFBRTtnQ0FDbEIsSUFBSSxFQUFFLHlCQUF5QjtnQ0FDL0IsUUFBUSxF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LGNBQWM7d0JBRDFCLFVBQVUsQ0FBQyxRQUFRO3VCQUNQLGNBQWMsQ0FpRjFCO29CQWpGWSw2QkFBYyxpQkFpRjFCLENBQUE7Z0JBQ0wsQ0FBQyxFQXJGdUMsY0FBYyxHQUFkLHVCQUFjLEtBQWQsdUJBQWMsUUFxRnJEO1lBQUQsQ0FBQyxFQXJGOEIsUUFBUSxHQUFSLGtCQUFRLEtBQVIsa0JBQVEsUUFxRnRDO1FBQUQsQ0FBQyxFQXJGb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBcUY3QjtJQUFELENBQUMsRUFyRmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXFGbkI7QUFBRCxDQUFDLEVBckZTLE1BQU0sS0FBTixNQUFNLFFBcUZmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEYXR1bVV6YXZlcmt5LnRzICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBEYXR1bSB1esOhdsSbcmt5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTktMDEtMDggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLlR5cHlQb2hsZWRhdmVrIHtcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEYXR1bVV6YXZlcmt5IGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGRhdF91emF2OiBEYXRlO1xyXG4gICAgICAgIHByb3RlY3RlZCBkYXRfZG5lczogRGF0ZTtcclxuICAgICAgICBwcm90ZWN0ZWQgZGF0X2tvbmVjX21lc2ljZTogRGF0ZTtcclxuICAgICAgICBwcm90ZWN0ZWQgZGF0X2tvbmVjX25ldXphdnJlbmVob19tZXNpY2U6IERhdGU7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJaYWTDoW7DrSBkYXRhIHV6w6F2xJtya3lcIjtcclxuXHJcbiAgICAgICAgICAgIGxldCBwcmVkbmFzdGF2ZW5pX2RhdGEgPSBcIjBcIjtcclxuICAgICAgICAgICAgaWYgKHRoaXMudXNlclNldHRpbmdzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0bXAgPSB0aGlzLnVzZXJTZXR0aW5ncy5nZXQoXCJwcmVkbmFzdGF2ZW5pX2RhdGFcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodG1wICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgcHJlZG5hc3RhdmVuaV9kYXRhID0gdG1wO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3NsZWRuw60gZGF0dW0gw7p6w6F2xJtya3lcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvc2xlZG5pX2RhdHVtX3V6YXZlcmt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gdXrDoXbEm3JreVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0dW1fdXphdmVya3lcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlDFmWVkbmFzdGF2ZW7DrSBkYXRhXCIpLmFkZEZpZWxkKFwiZ3JhZGlvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHByZWRuYXN0YXZlbmlfZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtQ2xhc3M6IFwidy0xMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJlZG5hc3RhdmVuaV9kYXRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnptZW5pdERhdHVtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICByYWRpb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogXCIwXCIsIGxhYmVsOiBcIkFrdHXDoWxuw60gZGF0dW1cIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBcIjFcIiwgbGFiZWw6IFwiUG9zbGVkbsOtIGRlbiBha3R1w6FsbsOtaG8gbcSbc8OtY2VcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBcIjJcIiwgbGFiZWw6IFwiUG9zbGVkbsOtIGRlbiBuZXV6YXbFmWVuw6lobyBtxJtzw61jZVwiIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0gPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJwb3NsZWRuaV9kYXR1bV91emF2ZXJreVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB0aGlzLmRhdF91emF2KTtcclxuICAgICAgICAgICAgdGhpcy56bWVuaXREYXR1bSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgem1lbml0RGF0dW0oKSB7XHJcbiAgICAgICAgICAgIGxldCBwcmVkbmFzdGF2ZW5pX2RhdGEgPSB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKFwicHJlZG5hc3RhdmVuaV9kYXRhXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQgZGF0dW06IERhdGU7XHJcbiAgICAgICAgICAgIHN3aXRjaCAocHJlZG5hc3RhdmVuaV9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiMFwiOlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBkYXR1bSA9IHRoaXMuZGF0X2RuZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiMVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdHVtID0gdGhpcy5kYXRfa29uZWNfbWVzaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjJcIjpcclxuICAgICAgICAgICAgICAgICAgICBkYXR1bSA9IHRoaXMuZGF0X2tvbmVjX25ldXphdnJlbmVob19tZXNpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJkYXR1bV91emF2ZXJreVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBkYXR1bSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvaygpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVmYXVsdEZvcm0hLmdmb3JtKFwiaXNWYWxpZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHByZWRuYXN0YXZlbmlfZGF0YSA9IHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJwcmVkbmFzdGF2ZW5pX2RhdGFcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy51c2VyU2V0dGluZ3MgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlclNldHRpbmdzLnNldChcInByZWRuYXN0YXZlbmlfZGF0YVwiLCBwcmVkbmFzdGF2ZW5pX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCByZXRWYWwgPSB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKFwiZGF0dW1fdXphdmVya3lcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKHJldFZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
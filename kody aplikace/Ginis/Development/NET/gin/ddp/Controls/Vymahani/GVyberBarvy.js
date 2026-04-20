"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GVyberBarvy.ts                         </Name>
//    <Description> Výběr barvy                                                 </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2019-02-18                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            var Controls;
            (function (Controls) {
                var Vymahani;
                (function (Vymahani) {
                    let GVyberBarvy = class GVyberBarvy extends Gordic.GContentBase {
                        onContentReady() {
                            this.vytvoritPaletu();
                        }
                        ok() {
                            this.close(this.Barva);
                        }
                        vytvoritPaletu() {
                            let promise = Gordic.Isl.SkupinaVymahani.pouziteBarvy({}).get();
                            this.beginOperation();
                            let tabZakladni = $("<div class='ddp-color-palette'>");
                            let wrapZakladni = $("<div class='ddp-color-palette-wrap'>")
                                .appendTo(tabZakladni);
                            WebClient.Common.Base.GetDefaultColors().forEach(radekBarev => {
                                let novyRadek = $("<div class='ddp-color-palette-row'>")
                                    .appendTo(wrapZakladni);
                                radekBarev.forEach(hex => {
                                    this.novySloupec(hex, WebClient.Common.Base.GetIntColor(hex))
                                        .appendTo(novyRadek);
                                });
                            });
                            let tabPouzite = $("<div class='ddp-color-palette'>");
                            let wrapPouzite = $("<div class='ddp-color-palette-wrap'>")
                                .appendTo(tabPouzite);
                            $("<div>")
                                .appendTo(this.element)
                                .gform("createFrom", new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                                .addSection("Výběr barvy")
                                .addText(tabZakladni)
                                .addSection("Použité barvy")
                                .addText(tabPouzite));
                            promise
                                .done((pouziteBarvy) => {
                                let novyRadekPouzite = $("<div>");
                                for (let i = 0; i < pouziteBarvy.length; i++) {
                                    if (i % 13 == 0) {
                                        novyRadekPouzite = $("<div class='ddp-color-palette-row'>")
                                            .appendTo(wrapPouzite);
                                    }
                                    this.novySloupec(WebClient.Common.Base.GetHexColor(pouziteBarvy[i]), pouziteBarvy[i])
                                        .appendTo(novyRadekPouzite);
                                }
                            })
                                .always(() => {
                                this.endOperation();
                            });
                        }
                        novySloupec(hex, color) {
                            let sloupec = $("<div class='ddp-color-palette-col'>")
                                .prop("ddp-color", color)
                                .css("background-color", hex);
                            if (color === this.Barva)
                                sloupec.addClass("ddp-color-palette-selected");
                            sloupec.hover(() => {
                                sloupec.toggleClass("ddp-color-palette-hover");
                            });
                            sloupec.click(() => {
                                let sel = this.element.find(".ddp-color-palette-selected");
                                sel.removeClass("ddp-color-palette-selected");
                                sloupec.addClass("ddp-color-palette-selected");
                                this.Barva = parseInt(sloupec.prop("ddp-color"));
                            });
                            return sloupec;
                        }
                    };
                    GVyberBarvy = __decorate([
                        Decorators.gcontent
                    ], GVyberBarvy);
                    Vymahani.GVyberBarvy = GVyberBarvy;
                })(Vymahani = Controls.Vymahani || (Controls.Vymahani = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Z5YmVyQmFydnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHVnliZXJCYXJ2eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQW1GZjtBQW5GRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FtRm5CO0lBbkZnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FtRjdCO1FBbkZvQixXQUFBLFNBQVM7WUFBQyxJQUFBLFFBQVEsQ0FtRnRDO1lBbkY4QixXQUFBLFFBQVE7Z0JBQUMsSUFBQSxRQUFRLENBbUYvQztnQkFuRnVDLFdBQUEsUUFBUTtvQkFFNUMsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBWSxTQUFRLE9BQUEsWUFBWTt3QkFJekMsY0FBYzs0QkFDVixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7d0JBQzFCLENBQUM7d0JBRUQsRUFBRTs0QkFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDM0IsQ0FBQzt3QkFFTyxjQUFjOzRCQUNsQixJQUFJLE9BQU8sR0FBRyxPQUFBLEdBQUcsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUN6RCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7NEJBRXRCLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDOzRCQUN2RCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsc0NBQXNDLENBQUM7aUNBQ3ZELFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQzs0QkFFM0IsVUFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dDQUNoRCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMscUNBQXFDLENBQUM7cUNBQ25ELFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQ0FDNUIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtvQ0FDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsVUFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt5Q0FDOUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dDQUM3QixDQUFDLENBQUMsQ0FBQzs0QkFDUCxDQUFDLENBQUMsQ0FBQzs0QkFFSCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsaUNBQWlDLENBQUMsQ0FBQzs0QkFDdEQsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLHNDQUFzQyxDQUFDO2lDQUN0RCxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7NEJBRTFCLENBQUMsQ0FBQyxPQUFPLENBQUM7aUNBQ0wsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7aUNBQ3RCLEtBQUssQ0FBQyxZQUFZLEVBQUUsSUFBSSxPQUFBLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxzQ0FBc0MsRUFBRSxDQUFDO2lDQUM1RixVQUFVLENBQUMsYUFBYSxDQUFDO2lDQUN6QixPQUFPLENBQUMsV0FBVyxDQUFDO2lDQUNwQixVQUFVLENBQUMsZUFBZSxDQUFDO2lDQUMzQixPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs0QkFFOUIsT0FBTztpQ0FDRixJQUFJLENBQUMsQ0FBQyxZQUFZLEVBQUUsRUFBRTtnQ0FDbkIsSUFBSSxnQkFBZ0IsR0FBd0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dDQUN2RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29DQUMzQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7d0NBQ2QsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLHFDQUFxQyxDQUFDOzZDQUN0RCxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7b0NBQy9CLENBQUM7b0NBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQzt5Q0FDdEUsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0NBQ3BDLENBQUM7NEJBQ0wsQ0FBQyxDQUFDO2lDQUNELE1BQU0sQ0FBQyxHQUFHLEVBQUU7Z0NBQ1QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDOzRCQUN4QixDQUFDLENBQUMsQ0FBQzt3QkFDWCxDQUFDO3dCQUVPLFdBQVcsQ0FBQyxHQUFXLEVBQUUsS0FBYTs0QkFDMUMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLHFDQUFxQyxDQUFDO2lDQUNqRCxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQztpQ0FDeEIsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFDOzRCQUVsQyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSztnQ0FDcEIsT0FBTyxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDOzRCQUVuRCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTtnQ0FDZixPQUFPLENBQUMsV0FBVyxDQUFDLHlCQUF5QixDQUFDLENBQUM7NEJBQ25ELENBQUMsQ0FBQyxDQUFDOzRCQUVILE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO2dDQUNmLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7Z0NBQzNELEdBQUcsQ0FBQyxXQUFXLENBQUMsNEJBQTRCLENBQUMsQ0FBQztnQ0FDOUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2dDQUUvQyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7NEJBQ3JELENBQUMsQ0FBQyxDQUFDOzRCQUVILE9BQU8sT0FBTyxDQUFDO3dCQUNuQixDQUFDO3FCQUNKLENBQUE7b0JBaEZZLFdBQVc7d0JBRHZCLFVBQVUsQ0FBQyxRQUFRO3VCQUNQLFdBQVcsQ0FnRnZCO29CQWhGWSxvQkFBVyxjQWdGdkIsQ0FBQTtnQkFDTCxDQUFDLEVBbkZ1QyxRQUFRLEdBQVIsaUJBQVEsS0FBUixpQkFBUSxRQW1GL0M7WUFBRCxDQUFDLEVBbkY4QixRQUFRLEdBQVIsa0JBQVEsS0FBUixrQkFBUSxRQW1GdEM7UUFBRCxDQUFDLEVBbkZvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFtRjdCO0lBQUQsQ0FBQyxFQW5GZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBbUZuQjtBQUFELENBQUMsRUFuRlMsTUFBTSxLQUFOLE1BQU0sUUFtRmYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1Z5YmVyQmFydnkudHMgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFbDvWLEm3IgYmFydnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBIYW51cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjMgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAxOS0wMi0xOCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLlZ5bWFoYW5pIHtcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Z5YmVyQmFydnkgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBCYXJ2YTogbnVtYmVyO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy52eXR2b3JpdFBhbGV0dSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb2soKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UodGhpcy5CYXJ2YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZ5dHZvcml0UGFsZXR1KCkge1xyXG4gICAgICAgICAgICBsZXQgcHJvbWlzZSA9IElzbC5Ta3VwaW5hVnltYWhhbmkucG91eml0ZUJhcnZ5KHt9KS5nZXQoKTtcclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRhYlpha2xhZG5pID0gJChcIjxkaXYgY2xhc3M9J2RkcC1jb2xvci1wYWxldHRlJz5cIik7XHJcbiAgICAgICAgICAgIGxldCB3cmFwWmFrbGFkbmkgPSAkKFwiPGRpdiBjbGFzcz0nZGRwLWNvbG9yLXBhbGV0dGUtd3JhcCc+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGFiWmFrbGFkbmkpO1xyXG5cclxuICAgICAgICAgICAgQ29tbW9uLkJhc2UuR2V0RGVmYXVsdENvbG9ycygpLmZvckVhY2gocmFkZWtCYXJldiA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm92eVJhZGVrID0gJChcIjxkaXYgY2xhc3M9J2RkcC1jb2xvci1wYWxldHRlLXJvdyc+XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHdyYXBaYWtsYWRuaSk7XHJcbiAgICAgICAgICAgICAgICByYWRla0JhcmV2LmZvckVhY2goaGV4ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdnlTbG91cGVjKGhleCwgQ29tbW9uLkJhc2UuR2V0SW50Q29sb3IoaGV4KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKG5vdnlSYWRlayk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGFiUG91eml0ZSA9ICQoXCI8ZGl2IGNsYXNzPSdkZHAtY29sb3ItcGFsZXR0ZSc+XCIpO1xyXG4gICAgICAgICAgICBsZXQgd3JhcFBvdXppdGUgPSAkKFwiPGRpdiBjbGFzcz0nZGRwLWNvbG9yLXBhbGV0dGUtd3JhcCc+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGFiUG91eml0ZSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIG5ldyBGb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMC0xMi0wLCBNLTAtMTItMCwgUy0wLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiVsO9YsSbciBiYXJ2eVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0KHRhYlpha2xhZG5pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiUG91xb5pdMOpIGJhcnZ5XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHQodGFiUG91eml0ZSkpO1xyXG5cclxuICAgICAgICAgICAgcHJvbWlzZVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKHBvdXppdGVCYXJ2eSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub3Z5UmFkZWtQb3V6aXRlOiBKUXVlcnk8SFRNTEVsZW1lbnQ+ID0gJChcIjxkaXY+XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG91eml0ZUJhcnZ5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICUgMTMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm92eVJhZGVrUG91eml0ZSA9ICQoXCI8ZGl2IGNsYXNzPSdkZHAtY29sb3ItcGFsZXR0ZS1yb3cnPlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh3cmFwUG91eml0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3Z5U2xvdXBlYyhDb21tb24uQmFzZS5HZXRIZXhDb2xvcihwb3V6aXRlQmFydnlbaV0pLCBwb3V6aXRlQmFydnlbaV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8obm92eVJhZGVrUG91eml0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbm92eVNsb3VwZWMoaGV4OiBzdHJpbmcsIGNvbG9yOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgbGV0IHNsb3VwZWMgPSAkKFwiPGRpdiBjbGFzcz0nZGRwLWNvbG9yLXBhbGV0dGUtY29sJz5cIilcclxuICAgICAgICAgICAgICAgIC5wcm9wKFwiZGRwLWNvbG9yXCIsIGNvbG9yKVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgaGV4KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb2xvciA9PT0gdGhpcy5CYXJ2YSlcclxuICAgICAgICAgICAgICAgIHNsb3VwZWMuYWRkQ2xhc3MoXCJkZHAtY29sb3ItcGFsZXR0ZS1zZWxlY3RlZFwiKTtcclxuXHJcbiAgICAgICAgICAgIHNsb3VwZWMuaG92ZXIoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2xvdXBlYy50b2dnbGVDbGFzcyhcImRkcC1jb2xvci1wYWxldHRlLWhvdmVyXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNsb3VwZWMuY2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlbCA9IHRoaXMuZWxlbWVudC5maW5kKFwiLmRkcC1jb2xvci1wYWxldHRlLXNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgc2VsLnJlbW92ZUNsYXNzKFwiZGRwLWNvbG9yLXBhbGV0dGUtc2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICBzbG91cGVjLmFkZENsYXNzKFwiZGRwLWNvbG9yLXBhbGV0dGUtc2VsZWN0ZWRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5CYXJ2YSA9IHBhcnNlSW50KHNsb3VwZWMucHJvcChcImRkcC1jb2xvclwiKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNsb3VwZWM7XHJcbiAgICAgICAgfVxyXG4gICAgfSAgIFxyXG59Il19
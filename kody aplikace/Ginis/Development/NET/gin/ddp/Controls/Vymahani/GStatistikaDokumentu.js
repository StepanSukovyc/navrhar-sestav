"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GStatistikaDokumentu.ts                </Name>
//    <Description> Statistika dokumentu                                        </Description>
//    <Author>      Patrik Mandula                                              </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2020-06-25                                                  </Created>
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
                    let GStatistikaDokumentu = class GStatistikaDokumentu extends Gordic.GContentBase {
                        onContentReady() {
                            const that = this;
                            this.title = `STATISTIKA TYPU DOKUMENTŮ `;
                            this.viewStatistika = new Gordic.Isl.View(that.isl.SkupinaVymahani.vymahaniStatistika(rq => {
                                return {
                                    filters: { typ_phl: this.Ixp }
                                };
                            }));
                            this.setBreadcrumbs([{
                                    caption: this.title = "Statistika",
                                }]);
                            $("<div id='Statistika'>")
                                .appendTo(this.element)
                                .ggrid({
                                name: "statistika",
                                data: [],
                                renderMode: "all-at-once",
                                columnMode: "fit",
                                navigationMode: "row",
                                showTopPanel: true,
                                showHeaderRow: true,
                                showBottomPanel: true,
                                multi: false,
                                columns: new Gordic.Data.GridFormat()
                                    .add({ name: "typ_phl", width: 100, caption: "Typ pohledávky" })
                                    .add({ name: "typ_phl_nazev", width: 100, caption: "Název typu pohledávky" })
                                    .add({ name: "ixs_typ", width: 100, caption: "Identifikátor typu dokumentu" })
                                    .add({ name: "nazev", width: 100, caption: "Název typu dokumentu" })
                                    .add({ name: "ktg_typ", width: 100, caption: "Kategorie typu dokumentu" })
                                    .add({ name: "pocet", width: 100, caption: "Počet" })
                                    .add({ name: "spis_znak", width: 100, caption: "Spisový znak" })
                                    .add({ name: "spis_pl", width: 100, caption: "Spisový plán" }),
                                defaultProfile: {
                                    sort: "nazev"
                                }
                            });
                            this.actions.add({
                                name: "load", caption: "načti", tooltip: "", icon: "gi-refresh", run: () => {
                                    $("#Statistika").ggrid("setData", this.viewStatistika);
                                    this.viewStatistika.requestData();
                                }
                            });
                            this.actions.load.run();
                        }
                    };
                    GStatistikaDokumentu = __decorate([
                        Decorators.gcontent
                    ], GStatistikaDokumentu);
                    Vymahani.GStatistikaDokumentu = GStatistikaDokumentu;
                })(Vymahani = Controls.Vymahani || (Controls.Vymahani = {}));
            })(Controls = WebClient.Controls || (WebClient.Controls = {}));
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1N0YXRpc3Rpa2FEb2t1bWVudHUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU3RhdGlzdGlrYURva3VtZW50dS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQTZEZjtBQTdERCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E2RG5CO0lBN0RnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E2RDdCO1FBN0RvQixXQUFBLFNBQVM7WUFBQyxJQUFBLFFBQVEsQ0E2RHRDO1lBN0Q4QixXQUFBLFFBQVE7Z0JBQUMsSUFBQSxRQUFRLENBNkQvQztnQkE3RHVDLFdBQUEsUUFBUTtvQkFFNUMsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxPQUFBLFlBQVk7d0JBTWxELGNBQWM7NEJBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDOzRCQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLDRCQUE0QixDQUFDOzRCQUMxQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0NBQ3ZGLE9BQU87b0NBQ0gsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7aUNBQ2pDLENBQUE7NEJBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFFSixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7b0NBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFFLFlBQVk7aUNBQ3BDLENBQUMsQ0FBQyxDQUFDOzRCQUVKLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQztpQ0FDckIs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Z29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HU3RhdGlzdGlrYURva3VtZW50dS50cyAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gU3RhdGlzdGlrYSBkb2t1bWVudHUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBQYXRyaWsgTWFuZHVsYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjMgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyMC0wNi0yNSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbnRyb2xzLlZ5bWFoYW5pe1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU3RhdGlzdGlrYURva3VtZW50dSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIEl4cDogU3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgdmlld1N0YXRpc3Rpa2E6IElzbC5WaWV3PEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlTdGF0aXN0aWthRHRvPjtcclxuXHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IGBTVEFUSVNUSUtBIFRZUFUgRE9LVU1FTlTFriBgO1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdTdGF0aXN0aWthID0gbmV3IEdvcmRpYy5Jc2wuVmlldyh0aGF0LmlzbC5Ta3VwaW5hVnltYWhhbmkudnltYWhhbmlTdGF0aXN0aWthKHJxID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogeyB0eXBfcGhsOiB0aGlzLkl4cCB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnJlYWRjcnVtYnMoW3tcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMudGl0bGUgPVwiU3RhdGlzdGlrYVwiLCAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiPGRpdiBpZD0nU3RhdGlzdGlrYSc+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXRpc3Rpa2FcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJNb2RlOiBcImFsbC1hdC1vbmNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kZTogXCJyb3dcIixcclxuICAgICAgICAgICAgICAgICAgICBzaG93VG9wUGFuZWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0hlYWRlclJvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93Qm90dG9tUGFuZWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZCh7IG5hbWU6IFwidHlwX3BobFwiLCB3aWR0aDogMTAwLCBjYXB0aW9uOiBcIlR5cCBwb2hsZWTDoXZreVwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGQoeyBuYW1lOiBcInR5cF9waGxfbmF6ZXZcIiwgd2lkdGg6IDEwMCwgY2FwdGlvbjogXCJOw6F6ZXYgdHlwdSBwb2hsZWTDoXZreVwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGQoeyBuYW1lOiBcIml4c190eXBcIiwgd2lkdGg6IDEwMCwgY2FwdGlvbjogXCJJZGVudGlmaWvDoXRvciB0eXB1IGRva3VtZW50dVwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGQoeyBuYW1lOiBcIm5hemV2XCIsIHdpZHRoOiAxMDAsIGNhcHRpb246IFwiTsOhemV2IHR5cHUgZG9rdW1lbnR1XCIgfSkgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkKHsgbmFtZTogXCJrdGdfdHlwXCIsIHdpZHRoOiAxMDAsIGNhcHRpb246IFwiS2F0ZWdvcmllIHR5cHUgZG9rdW1lbnR1XCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZCh7IG5hbWU6IFwicG9jZXRcIiwgd2lkdGg6IDEwMCwgY2FwdGlvbjogXCJQb8SNZXRcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkKHsgbmFtZTogXCJzcGlzX3puYWtcIiwgd2lkdGg6IDEwMCwgY2FwdGlvbjogXCJTcGlzb3bDvSB6bmFrXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZCh7IG5hbWU6IFwic3Bpc19wbFwiLCB3aWR0aDogMTAwLCBjYXB0aW9uOiBcIlNwaXNvdsO9IHBsw6FuXCIgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwibmF6ZXZcIiAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJsb2FkXCIsIGNhcHRpb246IFwibmHEjXRpXCIsIHRvb2x0aXA6IFwiXCIsIGljb246IFwiZ2ktcmVmcmVzaFwiLCBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI1N0YXRpc3Rpa2FcIikuZ2dyaWQoXCJzZXREYXRhXCIsIHRoaXMudmlld1N0YXRpc3Rpa2EpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld1N0YXRpc3Rpa2EucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMubG9hZCEucnVuKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
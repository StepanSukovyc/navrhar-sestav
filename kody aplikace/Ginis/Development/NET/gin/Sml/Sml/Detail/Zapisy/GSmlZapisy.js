"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GSmlZapisy.ts                          </Name>
//    <Description> Přehled rozpočtových zápisů případu                         </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-06-12                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Sml;
    (function (Sml) {
        var WebClient;
        (function (WebClient) {
            /**Přehled rozpočtových zápisů případu */
            let GSmlZapisy = class GSmlZapisy extends Gordic.GContentBase {
                onContentReady() {
                    this.createGrid();
                    this.createActions();
                    this.createMenuBar();
                    this.createCommandBar();
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actZavrit: Gordic.Eko.Action.actionZavrit({
                            enabled: true,
                            run: (ev, ctx) => {
                                that.tryClose();
                            }
                        }),
                        actPrint: Gordic.Eko.Action.actionTisk({
                            name: "actPrint",
                            enabled: true,
                            tema: "sml_ptm_prtsml",
                            ixsStr: this.sml_ptm_prtsml,
                            serverParameterMethod: "Gordic.Sml.WebClient.GSmlZapisy:ServerParameterMethod",
                            serverRestrictionAlfMethod: "Gordic.Sml.WebClient.GSmlZapisy:GetRestrictionAlf",
                            serverRestrictionAlvMethod: "Gordic.Sml.WebClient.GSmlZapisy:GetRestrictionAlv",
                            customDto: function () {
                                return { ixp: that.ixp, ac_sml: that.ac_sml, ikc: that.ikc, ekoBookVariant: Gordic.Eko.Utils.getEkoBookVariant(that) };
                            }
                        })
                    });
                }
                /** Vytvoření menubaru */
                createMenuBar() {
                    this.menuBar(this.actions.createBar(["actPrint*"]));
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actZavrit!"]));
                }
                /**Vytvoření seznamu zápisů případu*/
                createGrid() {
                    $.newDiv()
                        .appendTo(this.element)
                        .ggrid({
                        name: "gridZapisy",
                        columnMode: "full",
                        columns: this.createGridFormat(),
                        data: new Gordic.Isl.View(this.isl.SmlZapisy.list({
                            filters: { ixp_sml_pri: this.ixp_sml_pri }
                        })),
                        defaultProfile: {
                            filterVisible: true,
                            columns: {
                                "cislo_sml": { filterVariant: "selection" },
                                "drd": { filterVariant: "selection" }
                            },
                            grouping: "drd",
                        },
                    }).ggrideko({
                        summaryRow: true,
                        summaryRowAllowed: true
                    }).gautofit();
                }
                /**
                 * Vytvoření gridformátu pro zápisy případu
                 * @returns
                 */
                createGridFormat() {
                    var gf = new Gordic.Data.GridFormat();
                    gf.addNumberColumn({
                        name: "cislo_sml", //TK c_10_
                        caption: "jres:33600358" //RC 33600358 : # položky FP
                    }).addRok()
                        .addNumberColumn({
                        name: "drd", //cislo
                        caption: "jres:33600359", //RC 33600359 : DRD
                        grouping: { defaultState: "open" }
                    })
                        .addUcs()
                        .addNks();
                    gf.addSortedEkoCfuSet(this);
                    gf.addCurrencyColumn({
                        name: "c0", //TK kc0_1
                        caption: "jres:33600360" //RC 33600360 : MD
                    }).addCurrencyColumn({
                        name: "c1", //TK c_12
                        caption: "jres:33600361" //RC 33600361 : Dal
                    }).addNumberColumn({
                        name: "mesic", //c_vz_sml
                        caption: "jres:33600362" //RC 33600362 : M 
                    }).addTextColumn({
                        name: "ac", //TK priz_char_txt
                        caption: "jres:33600363" //RC 33600363 : AC
                    }).addNumberColumn({
                        name: "radek_z", //TK flag
                        caption: "jres:33600364" //RC 33600364 : # řádků
                    }).addDateTimeColumn({
                        name: "dat_zmena", //TK priz_char
                        caption: "jres:33600365" //RC 33600365 : Datum změny
                    });
                    return gf;
                }
            };
            GSmlZapisy = __decorate([
                Decorators.gcontent
            ], GSmlZapisy);
            WebClient.GSmlZapisy = GSmlZapisy;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NtbFphcGlzeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTbWxaYXBpc3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUdqQixJQUFVLE1BQU0sQ0FxSmY7QUFySkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBcUpuQjtJQXJKZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBcUo3QjtRQXJKb0IsV0FBQSxTQUFTO1lBaUIxQix5Q0FBeUM7WUFFekMsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVyxTQUFRLE9BQUEsWUFBWTtnQkFvQnhDLGNBQWM7b0JBQ1YsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUNsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQzVCLENBQUM7Z0JBRUQsa0NBQWtDO2dCQUMxQixhQUFhO29CQUNqQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWxCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDOzRCQUN0QyxPQUFPLEVBQUUsSUFBSTs0QkFDYixHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0NBQ2IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUNwQixDQUFDO3lCQUNKLENBQUM7d0JBQ0YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQzs0QkFDbkMsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLE9BQU8sRUFBRSxJ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QWlCLENBQUM7d0JBQ2pCLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUzt3QkFDckIsT0FBTyxFQUFFLGVBQWUsQ0FBQyxtQkFBbUI7cUJBQy9DLENBQUMsQ0FBQyxlQUFlLENBQUM7d0JBQ2YsSUFBSSxFQUFFLE9BQU8sRUFBRSxVQUFVO3dCQUN6QixPQUFPLEVBQUUsZUFBZSxDQUFDLGtCQUFrQjtxQkFDOUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQzt3QkFDYixJQUFJLEVBQUUsSUFBSSxFQUFFLGtCQUFrQjt3QkFDOUIsT0FBTyxFQUFFLGVBQWUsQ0FBQyxrQkFBa0I7cUJBQzlDLENBQUMsQ0FBQyxlQUFlLENBQUM7d0JBQ2YsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUMxQixPQUFPLEVBQUUsZUFBZSxDQUFDLHVCQUF1QjtxQkFDbkQsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO3dCQUNqQixJQUFJLEVBQUUsV0FBVyxFQUFFLGNBQWM7d0JBQ2pDLE9BQU8sRUFBRSxlQUFlLENBQUMsMkJBQTJCO3FCQUN2RCxDQUFDLENBQUM7b0JBRUgsT0FBTyxFQUFFLENBQUM7Z0JBQ2QsQ0FBQzthQUNKLENBQUE7WUFqSVksVUFBVTtnQkFEdEIsVUFBVSxDQUFDLFFBQVE7ZUFDUCxVQUFVLENBaUl0QjtZQWpJWSxvQkFBVSxhQWlJdEIsQ0FBQTtRQUNMLENBQUMsRUFySm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXFKN0I7SUFBRCxDQUFDLEVBckpnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFxSm5CO0FBQUQsQ0FBQyxFQXJKUyxNQUFNLEtBQU4sTUFBTSxRQXFKZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLlNtbC5XZWJDbGllbnQuR1NtbFphcGlzeS50cyAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxuLy8gICAgPERlc2NyaXB0aW9uPiBQxZllaGxlZCByb3pwb8SNdG92w71jaCB6w6FwaXPFryBwxZnDrXBhZHUgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cbi8vICAgIDxBdXRob3I+ICAgICAgcHNtZWprYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyMy0wNi0xMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxuLy8gIDwvRmlsZUhlYWRlcj5cblxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5TbWwuV2ViQ2xpZW50IHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1NtbFphcGlzeUlucHV0UGFyYW1zIHtcclxuICAgICAgICAvLy8qKiBDZWxrb3bDvSByZWNvcmQgLSBkb2tsYWQgKyBwxZnDrXBhZCovXHJcbiAgICAgICAgLy9zbWxwaWQ6IEludGVyZmFjZS5HRG9rbGFkU21sRHRvLFxyXG4gICAgICAgIC8qKklkZW50aWZpa8OhdG9yIHDFmcOtcGFkdSAqL1xyXG4gICAgICAgIGl4cF9zbWxfcHJpOiBzdHJpbmcsXHJcbiAgICAgICAgLyoqIMSMw61zbG8gcG9sb8W+a3kqL1xyXG4gICAgICAgIGNpc2xvOiBudW1iZXIgfCBudWxsLFxyXG4gICAgICAgIC8qKiBJZGVudGlmaWvDoXRvciBkb2tsYWR1IChwcm8gdGlzaykqL1xyXG4gICAgICAgIGl4cDogc3RyaW5nLFxyXG4gICAgICAgIC8qKiBBZ2VuZG92w6kgxI3DrXNsbyAocHJvIHRpc2spKi9cclxuICAgICAgICBhY19zbWw6IHN0cmluZ1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1NtbFphcGlzeVJldHVyblZhbHVlIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipQxZllaGxlZCByb3pwb8SNdG92w71jaCB6w6FwaXPFryBwxZnDrXBhZHUgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1NtbFphcGlzeSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLy8vKiogQ2Vsa292w70gcmVjb3JkIC0gZG9rbGFkICsgcMWZw61wYWQqL1xyXG4gICAgICAgIC8vcHVibGljIHNtbHBpZDogSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG87XHJcbiAgICAgICAgLyoqSWRlbnRpZmlrw6F0b3IgcMWZw61wYWR1ICovXHJcbiAgICAgICAgcHVibGljIGl4cF9zbWxfcHJpOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIMSMw61zbG8gcG9sb8W+a3kqL1xyXG4gICAgICAgIHB1YmxpYyBjaXNsbzogbnVtYmVyIHwgbnVsbDtcclxuICAgICAgICAvKiogSWRlbnRpZmlrw6F0b3IgZG9rbGFkdSAocHJvIHRpc2spKi9cclxuICAgICAgICBwdWJsaWMgaXhwOiBzdHJpbmdcclxuICAgICAgICAvKiogQWdlbmRvdsOpIMSNw61zbG8gKHBybyB0aXNrKSovXHJcbiAgICAgICAgcHVibGljIGFjX3NtbDogc3RyaW5nXHJcblxyXG4gICAgICAgIC8qKiBpa2MgKi9cclxuICAgICAgICBwcml2YXRlIGlrYzogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBEYXRhYsOhem92w70gcGFyYW1ldHIgcHJvIHRpc2sgKi9cclxuICAgICAgICBwcml2YXRlIHNtbF9wdG1fcHJ0c21sOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIC8vSGxhdm7DrSBncmlkIGNvbnRlbnR1IC0gc2V6bmFtIC0gesOhcGlzeVxyXG4gICAgICAgICRncmlkWmFwaXN5OiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gIFxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTWVudUJhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbW1hbmRCYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBha2PDrSBwcm8gdGxhxI3DrXRrYSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0WmF2cml0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25aYXZyaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RQcmludDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uVGlzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RQcmludFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJzbWxfcHRtX3BydHNtbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl4c1N0cjogdGhpcy5zbWxfcHRtX3BydHNtbCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLlNtbC5XZWJDbGllbnQuR1NtbFphcGlzeTpTZXJ2ZXJQYXJhbWV0ZXJNZXRob2RcIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJSZXN0cmljdGlvbkFsZk1ldGhvZDogXCJHb3JkaWMuU21sLldlYkNsaWVudC5HU21sWmFwaXN5OkdldFJlc3RyaWN0aW9uQWxmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyUmVzdHJpY3Rpb25BbHZNZXRob2Q6IFwiR29yZGljLlNtbC5XZWJDbGllbnQuR1NtbFphcGlzeTpHZXRSZXN0cmljdGlvbkFsdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUR0bzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpeHA6IHRoYXQuaXhwLCBhY19zbWw6IHRoYXQuYWNfc21sLCBpa2M6IHRoYXQuaWtjLCBla29Cb29rVmFyaWFudDogRWtvLlV0aWxzLmdldEVrb0Jvb2tWYXJpYW50KHRoYXQpIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gbWVudWJhcnUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZU1lbnVCYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFByaW50KlwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGNvbW1hbmRiYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb21tYW5kQmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RaYXZyaXQhXCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipWeXR2b8WZZW7DrSBzZXpuYW11IHrDoXBpc8WvIHDFmcOtcGFkdSovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRaYXBpc3lcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLklzbC5WaWV3PEludGVyZmFjZS5HUm96ZHhtYUR0bz4odGhpcy5pc2wuU21sWmFwaXN5Lmxpc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7IGl4cF9zbWxfcHJpOiB0aGlzLml4cF9zbWxfcHJpIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyVmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaXNsb19zbWxcIjogeyBmaWx0ZXJWYXJpYW50OiBcInNlbGVjdGlvblwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRyZFwiOiB7IGZpbHRlclZhcmlhbnQ6IFwic2VsZWN0aW9uXCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cGluZzogXCJkcmRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pLmdncmlkZWtvKHtcclxuICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5Um93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1bW1hcnlSb3dBbGxvd2VkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KS5nYXV0b2ZpdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm/FmWVuw60gZ3JpZGZvcm3DoXR1IHBybyB6w6FwaXN5IHDFmcOtcGFkdVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KCk6IERhdGEuR3JpZEZvcm1hdDxhbnk+IHtcclxuICAgICAgICAgICAgdmFyIGdmID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICBnZi5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjaXNsb19zbWxcIiwgLy9USyBjXzEwX1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzU4XCIgLy9SQyAzMzYwMDM1OCA6ICMgcG9sb8W+a3kgRlBcclxuICAgICAgICAgICAgfSkuYWRkUm9rKClcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZHJkXCIsIC8vY2lzbG9cclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzNTlcIiwgLy9SQyAzMzYwMDM1OSA6IERSRFxyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwaW5nOiB7IGRlZmF1bHRTdGF0ZTogXCJvcGVuXCIgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRVY3MoKVxyXG4gICAgICAgICAgICAgICAgLmFkZE5rcygpXHJcbiAgICAgICAgICAgIGdmLmFkZFNvcnRlZEVrb0NmdVNldCh0aGlzKTtcclxuICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjMFwiLCAvL1RLIGtjMF8xXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzNjBcIiAvL1JDIDMzNjAwMzYwIDogTURcclxuICAgICAgICAgICAgfSkuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjMVwiLCAvL1RLIGNfMTJcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDM2MVwiIC8vUkMgMzM2MDAzNjEgOiBEYWxcclxuICAgICAgICAgICAgfSkuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwibWVzaWNcIiwgLy9jX3Z6X3NtbFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzYyXCIgLy9SQyAzMzYwMDM2MiA6IE0gXHJcbiAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY1wiLCAvL1RLIHByaXpfY2hhcl90eHRcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDM2M1wiIC8vUkMgMzM2MDAzNjMgOiBBQ1xyXG4gICAgICAgICAgICB9KS5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJyYWRla196XCIsIC8vVEsgZmxhZ1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzY0XCIgLy9SQyAzMzYwMDM2NCA6ICMgxZnDoWRrxa9cclxuICAgICAgICAgICAgfSkuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfem1lbmFcIiwgLy9USyBwcml6X2NoYXJcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDM2NVwiIC8vUkMgMzM2MDAzNjUgOiBEYXR1bSB6bcSbbnlcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ2Y7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
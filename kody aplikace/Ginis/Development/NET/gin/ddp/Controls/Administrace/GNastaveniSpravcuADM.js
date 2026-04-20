"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GNastaveniSpravcuADM.ts                </Name>
//    <Description> Okno nastavení správců (verze pro ADX)                      </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2024-08-14                                                  </Created>
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
            let GNastaveniSpravcuADM = class GNastaveniSpravcuADM extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    that.taskId = "actGNastaveniSpravcuADM";
                    that.title = `Nastavení správců`;
                    that.createActions();
                    that.createMenu();
                    that.createFilter();
                    that.createGrid();
                    Ddp.WebClient.Common.Base.DdpEkoInit(that, that.InitErrorText);
                }
                createFilter() {
                    const that = this;
                    that.createFilterForm();
                    $("<div>").appendTo(that.element).
                        gfilterpanel({
                        forms: [that.headerForm],
                        filterViewMode: FilterViewMode.Simple,
                        autoLoadAfterCreatePanel: true,
                        apply: (event, obj) => {
                            that.o_filtr = obj.filter;
                            that.ziskejData(this.o_filtr);
                        }
                    });
                }
                createFilterForm() {
                    const that = this;
                    that.headerForm = new Gordic.Forms.Form({ name: "ddpNastaveniSparvcuFilter" })
                        .addRow("Číslo správce")
                        .addField("gstringbox", {
                        name: "cis_spr"
                    })
                        .addField("gcheck", { name: "vsechny", label: "Zobrazovat všechny správce" })
                        .addRow("Název")
                        .addField("gstringbox", {
                        name: "cis_spr_txt"
                    })
                        .addRow("Typ pohledávky")
                        .addField("gselectbox", Gordic.Prefabs.Select.ddpstpp(), {
                        name: "typ_phl",
                        model: "model.typ_phl=value.typ_phl",
                        initialValue: { typ_phl: that.typ_phl, typ_phl_txt: "" },
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()]
                    });
                    return that.headerForm;
                }
                /** Vytvoří grid **/
                createGrid() {
                    const that = this;
                    that.grid = $.newDiv()
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        name: "GSpravciGrid",
                        columnMode: "full",
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        multi: false,
                        navigationMode: "row",
                        columns: WebClient.Common.GridFormats.Spravci(),
                        rowNumbers: false
                    });
                    return that.grid;
                }
                /**Metoda pro vytvoření menu na contentu */
                createMenu() {
                    const that = this;
                    let menu = [
                        {
                            caption: "Nastavení",
                            tooltip: "Změna nastavení správce",
                            icon: "gi-sprava_aplikace",
                            favorite: true,
                            action: that.actions["actGNastaveni"]
                        }
                    ];
                    this.menuBar(menu);
                    that.actions.addRange([
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actClose!"]));
                }
                /**
                * Vytvoří tlačítko nad seznamem kontrol
                */
                createActions() {
                    const that = this;
                    that.actions.addRange([
                        {
                            name: "actGNastaveni",
                            run: () => {
                                if (that.PrizSpr == 0 || that.ddp_rad_chspn == 0 || that.rezimCteni) {
                                    that.showFlash({ label: "Není povolena změna nastavení správce", state: "error" });
                                }
                                else {
                                    var selection = that.grid.ggrid("getSelection");
                                    if (selection.length != 0) {
                                        var sel = selection[0];
                                        that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GDetailSpravce", { ID: "DDPGDetailSpravce#", data: { ico: sel.ico, cis_spr: sel.cis_spr, nazev: sel.nazev, typ_phl: sel.typ_phl, rok: sel.rok, uus: sel.uus, bu_vl: sel.bu_vl, sk_vl: sel.sk_vl, ucs: sel.ucs }, editMode: false }, "Detail správce", 800, 300)
                                            .on("close", function (ev, retVal) {
                                            that.ziskejData(that.o_filtr);
                                        });
                                    }
                                }
                            }
                        }
                    ]);
                }
                /**
                 * Funkce pro získání filtrovaných dat
                 */
                ziskejData(filter) {
                    const that = this;
                    that.beginOperation({ id: "nacitani_spr", text: "Načítání správců..." });
                    that.isl.NastaveniSpravcu.list(rq => {
                        return {
                            filters: filter
                        };
                    }).get().done(function (dto) {
                        var view = new Gordic.Data.View(dto.data, { key: "typ_phl" });
                        that.grid.ggrid("setData", view);
                        that.endOperation({ id: "nacitani_spr" });
                    });
                }
            };
            GNastaveniSpravcuADM = __decorate([
                Decorators.gcontent
            ], GNastaveniSpravcuADM);
            WebClient.GNastaveniSpravcuADM = GNastaveniSpravcuADM;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR05hc3RhdmVuaVNwcmF2Y3VBRE0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHTmFzdGF2ZW5pU3ByYXZjdUFETS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLElBQVUsTUFBTSxDQW9LZjtBQXBLRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FvS25CO0lBcEtnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FvSzdCO1FBcEtvQixXQUFBLFNBQVM7WUFFMUIsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxPQUFBLFlBQVk7Z0JBa0JsRCxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyx5QkFBeUIsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQztvQkFFakMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUVsQixHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ25FLENBQUM7Z0JBRU8sWUFBWTtvQkFDaEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtvQkFDdkIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3dCQUM3QixZQUFZLENBQUM7d0JBQ1QsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzt3QkFDeEIsY0FBYyxFQUFFLGNBQWMsQ0FBQyxNQUFNO3dCQUNyQyx3QkFBd0IsRUFBRSxJQUFJO3dCQUM5QixLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7NEJBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTs0QkFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7d0JBQ2pDLENBQUM7cUJBQ0osQ0FBQyxDQUFBO2dCQUVWLENBQUM7Z0JBRU8sZ0JBQWdCO29CQUNwQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSwyQkFBMkIsRUFBRSxDQUFDO3lCQUN6RSxNQUFNLENBQUMsZUFBZSxDQUFDO3lCQUN2QixRQUFRLENBQUMsWUFBWSxFQUFFO3dCQUNwQixJQUFJLEVBQUUsU0FBUztxQkFDbEIsQ0FBQzt5QkFDRCxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsNEJBQTRCLEVBQUUsQ0FBQzt5QkFDNUUsTUFBTSxDQUFDLE9BQU8sQ0FBQzt5QkFDZixRQUFRLENBQUMsWUFBWSxFQUFFO3dCQUNwQixJQUFJLEVBQUUsYUFBYTtxQkFDdEIsQ0FBQzt5QkFDRCxNQUFNLENBQUMsZ0JBQWdCLENBQUM7eUJBQ3hCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsT0FBQSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFO3dCQUM5QyxJQUFJLEVBQUUsU0FBUzt3QkFDZixLQUFLLEVBQUUsNkJBQTZCO3dCQUNwQyxZQUFZLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFO3dCQUN4RCxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVE7d0JBQ3pDLFVBQVUsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztxQkFDakQsQ0FBQyxDQUFBO29CQUVOLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDM0IsQ0FBQztnQkFFRCxvQkFBb0I7Z0JBQ1osVUFBVTtvQkFDZCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWxCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRTt5QkFDakIsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ3RCLFFBQVEsRUFBRTt5QkFDVixLQUFLLENBQW1EO3dCQUNyRCxJQUFJLEVBQUUsY0FBYzt3QkFDcEIsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLFVBQVUsRUFBRSxNQUFNLEVBQUUsNkNBQTZDO3dCQUNqRSxLQUFLLEVBQUUsS0FBSzt3QkFDWixjQUFjLEVBQUUsS0FBSzt3QkFDckIsT0FBTyxFQUFFLFVBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUU7d0JBQ3JDLFVBQVUsRUFBRSxLQUFLO3FCQUNwQixDQUFDLENBQUM7b0JBRVAsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNyQixDQUFDO2dCQUVELDJDQUEyQztnQkFDbkMsVUFBVTtvQkFDZCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksSUFBSSxHQUFpQjt3QkFDckI7NEJBQ0ksT0FBTyxFQUFFLFdBQVc7NEJBQ3BCLE9BQU8sRUFBRSx5QkFBeUI7NEJBQ2xDLElBQUksRUFBRSxvQkFBb0I7NEJBQzFCLFFBQVEsRUFBRSxJQUFJOzRCQUNkLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQzt5QkFDeEM7cUJBQ0osQ0FBQztvQkFDRixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUVuQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsSUFBSSxPQUFPLENBQUM7NEJBQ1IsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLE9BQU8sRUFBRSxRQUFROzRCQUNqQixJQUFJLEVBQUUsaUJBQWlCOzRCQUN2QixHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUNyQyxDQUFDO3FCQUNMLENBQUMsQ0FBQTtvQkFDRixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxDQUFDO2dCQUVEOztrQkFFRTtnQkFDTSxhQUFhO29CQUNqQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQjs0QkFDSSxJQUFJLEVBQUUsZUFBZTs0QkFDckIsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQ0FDbEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSx1Q0FBdUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztnQ0FDdkYsQ0FBQztxQ0FBTSxDQUFDO29DQUNKLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFtRCxjQUFjLENBQUMsQ0FBQztvQ0FDbEcsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDO3dDQUN4QixJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7d0NBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLHFDQUFxQyxFQUFFLEVBQUUsRUFBRSxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7NkNBQzdTLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUUsTUFBTTs0Q0FDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7d0NBQ2xDLENBQUMsQ0FBQyxDQUFDO29DQUNYLENBQUM7Z0NBQ0wsQ0FBQzs0QkFDTCxDQUFDO3lCQUNKO3FCQUNKLENBQUMsQ0FBQTtnQkFDTixDQUFDO2dCQUVEOzttQkFFRztnQkFDSyxVQUFVLENBQUMsTUFBVztvQkFFMUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUUsQ0FBQyxDQUFDO29CQUN6RSxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FDMUIsRUFBRSxDQUFDLEVBQUU7d0JBQ0QsT0FBTzs0QkFDSCxPQUFPLEVBQUUsTUFBTTt5QkFDbEIsQ0FBQTtvQkFDTCxDQUFDLENBQ0osQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHO3dCQUN0QixJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQzt3QkFDOUQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUNqQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7b0JBQzlDLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7YUFDSixDQUFBO1lBaktZLG9CQUFvQjtnQkFEaEMsVUFBVSxDQUFDLFFBQVE7ZUFDUCxvQkFBb0IsQ0FpS2hDO1lBaktZLDhCQUFvQix1QkFpS2hDLENBQUE7UUFDTCxDQUFDLEVBcEtvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFvSzdCO0lBQUQsQ0FBQyxFQXBLZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBb0tuQjtBQUFELENBQUMsRUFwS1MsTUFBTSxLQUFOLE1BQU0sUUFvS2YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR05hc3RhdmVuaVNwcmF2Y3VBRE0udHMgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IE9rbm8gbmFzdGF2ZW7DrSBzcHLDoXZjxa8gKHZlcnplIHBybyBBRFgpICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgdmNlY2ggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjQtMDgtMTQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7ICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50ICAgICAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBHTmFzdGF2ZW5pU3ByYXZjdUFETSBleHRlbmRzIEdDb250ZW50QmFzZSB7ICAgIFxyXG4gICAgICBcclxuICAgICAgICAvKiogxIzDrXNsbyB0eXB1IHBvaGxlZMOhdmt5ICovXHJcbiAgICAgICAgdHlwX3BobDogc3RyaW5nO1xyXG5cclxuICAgICAgICAvKiogVGV4dCB2csOhY2Vuw70gcG8gaW5pdHUgS25paHkgYSBwb2hsZWTDoXZreSAqL1xyXG4gICAgICAgIEluaXRFcnJvclRleHQ6IHN0cmluZyB8IG51bGw7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwdWJsaWMgaGVhZGVyRm9ybTogR29yZGljLkZvcm1zLkZvcm07XHJcbiAgICAgICAgcHVibGljIG9fZmlsdHI7XHJcblxyXG4gICAgICAgIC8qKiBQxZnDrXpuYWsgemRhIGplIHR5cCBwb2hsZWTDoXZreSBzcHLDoXZjb3ZhbsO9ICAqL1xyXG4gICAgICAgIFByaXpTcHI6IG51bWJlcjtcclxuICAgICAgICAvKiogUMWZw616bmFrIHpkYSBqZSB0eXAgcG9obGVkw6F2a3kgdiByZcW+aW11IMSNdGVuw60gICovXHJcbiAgICAgICAgcmV6aW1DdGVuaTogbnVtYmVyO1xyXG4gICAgICAgIGRkcF9yYWRfY2hzcG46IG51bWJlcjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC50YXNrSWQgPSBcImFjdEdOYXN0YXZlbmlTcHJhdmN1QURNXCI7XHJcbiAgICAgICAgICAgIHRoYXQudGl0bGUgPSBgTmFzdGF2ZW7DrSBzcHLDoXZjxa9gO1xyXG4gICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZU1lbnUoKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVGaWx0ZXIoKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVHcmlkKCk7XHJcblxyXG4gICAgICAgICAgICBEZHAuV2ViQ2xpZW50LkNvbW1vbi5CYXNlLkRkcEVrb0luaXQodGhhdCwgdGhhdC5Jbml0RXJyb3JUZXh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVGaWx0ZXJGb3JtKClcclxuICAgICAgICAgICAgJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoYXQuZWxlbWVudCkuXHJcbiAgICAgICAgICAgICAgICBnZmlsdGVycGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1zOiBbdGhhdC5oZWFkZXJGb3JtXSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Mb2FkQWZ0ZXJDcmVhdGVQYW5lbDogdHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHk6IChldmVudCwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub19maWx0ciA9IG9iai5maWx0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56aXNrZWpEYXRhKHRoaXMub19maWx0cilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXJGb3JtKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuaGVhZGVyRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZGRwTmFzdGF2ZW5pU3BhcnZjdUZpbHRlclwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwixIzDrXNsbyBzcHLDoXZjZVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjaXNfc3ByXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBuYW1lOiBcInZzZWNobnlcIiwgbGFiZWw6IFwiWm9icmF6b3ZhdCB2xaFlY2hueSBzcHLDoXZjZVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiTsOhemV2XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNpc19zcHJfdHh0XCIgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVHlwIHBvaGxlZMOhdmt5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmRkcHN0cHAoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3BobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnR5cF9waGw9dmFsdWUudHlwX3BobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogeyB0eXBfcGhsOiB0aGF0LnR5cF9waGwsIHR5cF9waGxfdHh0OiBcIlwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmhlYWRlckZvcm07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmcOtIGdyaWQgKiovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCk6IEpRdWVyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5ncmlkID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdOYXN0YXZlbmlTcHJhdmN1RHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJHU3ByYXZjaUdyaWRcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJNb2RlOiBcImF1dG9cIiwgLy8gYXV0bywgYWxsLWF0LW9uY2UsIHBhZ2VkLXN5bmMsIHBhZ2VkLWFzeW5jXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IENvbW1vbi5HcmlkRm9ybWF0cy5TcHJhdmNpKCksXHJcbiAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuZ3JpZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKk1ldG9kYSBwcm8gdnl0dm/FmWVuw60gbWVudSBuYSBjb250ZW50dSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBtZW51OiBNZW51UGFyYW1zW10gPSBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOYXN0YXZlbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJabcSbbmEgbmFzdGF2ZW7DrSBzcHLDoXZjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktc3ByYXZhX2FwbGlrYWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHTmFzdGF2ZW5pXCJdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihtZW51KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmF2xZnDrXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmNsb3NlKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcih0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdENsb3NlIVwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBWeXR2b8WZw60gdGxhxI3DrXRrbyBuYWQgc2V6bmFtZW0ga29udHJvbCBcclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHTmFzdGF2ZW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LlByaXpTcHIgPT0gMCB8fCB0aGF0LmRkcF9yYWRfY2hzcG4gPT0gMCB8fCB0aGF0LnJlemltQ3RlbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHsgbGFiZWw6IFwiTmVuw60gcG92b2xlbmEgem3Em25hIG5hc3RhdmVuw60gc3Byw6F2Y2VcIiwgc3RhdGU6IFwiZXJyb3JcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdOYXN0YXZlbmlTcHJhdmN1RHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsID0gc2VsZWN0aW9uWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HRGV0YWlsU3ByYXZjZVwiLCB7IElEOiBcIkREUEdEZXRhaWxTcHJhdmNlI1wiLCBkYXRhOiB7IGljbzogc2VsLmljbywgY2lzX3Nwcjogc2VsLmNpc19zcHIsIG5hemV2OiBzZWwubmF6ZXYsIHR5cF9waGw6IHNlbC50eXBfcGhsLCByb2s6IHNlbC5yb2ssIHV1czogc2VsLnV1cywgYnVfdmw6IHNlbC5idV92bCwgc2tfdmw6IHNlbC5za192bCwgdWNzOiBzZWwudWNzIH0sIGVkaXRNb2RlOiBmYWxzZSB9LCBcIkRldGFpbCBzcHLDoXZjZVwiLCA4MDAsIDMwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKGV2LCByZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuemlza2VqRGF0YSh0aGF0Lm9fZmlsdHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBcclxuICAgICAgICAgKiBGdW5rY2UgcHJvIHrDrXNrw6Fuw60gZmlsdHJvdmFuw71jaCBkYXQgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB6aXNrZWpEYXRhKGZpbHRlcjogYW55KTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcIm5hY2l0YW5pX3NwclwiLCB0ZXh0OiBcIk5hxI3DrXTDoW7DrSBzcHLDoXZjxa8uLi5cIiB9KTtcclxuICAgICAgICAgICAgdGhhdC5pc2wuTmFzdGF2ZW5pU3ByYXZjdS5saXN0KFxyXG4gICAgICAgICAgICAgICAgcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IGZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKS5nZXQoKS5kb25lKGZ1bmN0aW9uIChkdG8pIHtcclxuICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZHRvLmRhdGEsIHsga2V5OiBcInR5cF9waGxcIiB9KTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcIm5hY2l0YW5pX3NwclwiIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19
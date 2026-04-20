"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GRozpusteniDluhu.ts                    </Name>
//    <Description> Okno rozpuštění dluhů                                       </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-08-20                                                  </Created>
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
            let GRozpusteniDluhu = class GRozpusteniDluhu extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    that.title = `Seznam rozpouštění dluhů`;
                    that.createActions();
                    that.createMenu();
                    that.createGrid();
                    that.setBreadcrumbs([{
                            caption: that.title,
                            action: that.actions["actGRozpusteniZavritPotomky"]
                        }]);
                    that.ziskejData();
                }
                /** Vytvoří grid **/
                createGrid() {
                    const that = this;
                    that.grid = $.newDiv()
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        name: "GRozpusteniDluhuGrid",
                        columnMode: "fit",
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        multi: false,
                        navigationMode: "row",
                        columns: WebClient.Common.GridFormats.RozpusteniDluhu(),
                        defaultProfile: {
                            rowNumbers: true
                        },
                        profiles: [{
                                name: "aktivita", _locked: true, _default: true,
                                columnList: "aktivita, nazev, typ_rdl, dat_od, dat_do, proc_sazba_pen, poznamka",
                                condFormats: [
                                    { description: "Neaktivní", formula: 'NOT(EQUALS(@aktivita, "100"))', bg: Gordic.Components.Grid.CondFormats.CondFormatBg.lightgray },
                                ]
                            }]
                    });
                    return that.grid;
                }
                /**Metoda pro vytvoření menu na contentu */
                createMenu() {
                    const that = this;
                    let menu = [
                        {
                            caption: "Detail",
                            tooltip: "Detail",
                            icon: "gi-detail",
                            favorite: true,
                            action: that.actions["actGDetail"]
                        },
                        {
                            caption: "Nový",
                            tooltip: "Vytvořit nové rozpouštění",
                            icon: "gi-plus_bold",
                            favorite: true,
                            action: that.actions["actGNovy"]
                        },
                        {
                            caption: "Zrušit",
                            tooltip: "Zrušit vybrané rozpuštění",
                            icon: "gi-minus_bold",
                            favorite: true,
                            action: that.actions["actGZrusit"]
                        },
                        {
                            caption: "Rozp. dluhu",
                            tooltip: "Případy rozpuštění dluhů",
                            icon: "gi-sprava_aplikace",
                            favorite: true,
                            action: that.actions["actGRozpusteniDluhuPripady"]
                        }
                    ];
                    this.menuBar(menu);
                }
                /**
                * Vytvoří tlačítko nad seznamem kontrol
                */
                createActions() {
                    const that = this;
                    that.actions.addRange([
                        {
                            name: "actGRozpusteniZavritPotomky",
                            run: () => {
                                this.tryCloseAllSignificants();
                            }
                        },
                        {
                            name: "actGDetail",
                            run: () => {
                                var selection = that.grid.ggrid("getSelection");
                                if (selection.length != 0) {
                                    var sel = selection[0];
                                    that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GParametryRozpDluhu", { ID: "DDPGParametryRozpDluhu#", data: { ixs_rdl: sel.ixs_rdl }, editMode: false }, "Parametry rozpuštění dluhu", 800, 400)
                                        .on("close", function (ev, retVal) {
                                        that.ziskejData();
                                    });
                                }
                            }
                        },
                        {
                            name: "actGNovy",
                            run: () => {
                                that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GParametryRozpDluhu", { ID: "DDPGParametryRozpDluhu#", data: { ixs_rdl: "" }, editMode: false }, "Parametry rozpuštění dluhu", 800, 400)
                                    .on("close", function (ev, retVal) {
                                    that.ziskejData();
                                });
                            }
                        },
                        {
                            name: "actGZrusit",
                            run: () => {
                                var that = this;
                                var dto = {};
                                var selection = that.grid.ggrid("getSelection");
                                if (selection.length != 0) {
                                    var sel = selection[0];
                                    dto.ixs_rdl = sel.ixs_rdl;
                                    var req = rq => {
                                        return {
                                            rq: { Data: dto }
                                        };
                                    };
                                    that.isl.RozpusteniDluhu.deactivate(req)
                                        .get().done(function (dto) {
                                        that.ziskejData();
                                    });
                                }
                            }
                        },
                        {
                            name: "actGRozpusteniDluhuPripady",
                            run: () => {
                                var selection = that.grid.ggrid("getSelection");
                                var ixs_rdl = selection[0].ixs_rdl;
                                var nazev = selection[0].nazev;
                                that.navigate("Gordic.Ddp.WebClient.GRozpusteniDluhuPripady", {
                                    ID: "DDPGRozpusteniDluhuPripady#",
                                    ixs_rdl: ixs_rdl,
                                    nazev: nazev,
                                    vybranePripady: that.vybranePripady
                                });
                            }
                        }
                    ]);
                }
                /**
                 * Funkce pro získání filtrovaných dat
                 */
                ziskejData() {
                    const that = this;
                    that.beginOperation({ id: "nacitani_dat", text: "Načítání dat..." });
                    that.isl.RozpusteniDluhu.list()
                        .get().done(function (dto) {
                        var view = new Gordic.Data.View(dto.data);
                        that.grid.ggrid("setData", view);
                        that.endOperation({ id: "nacitani_dat" });
                    });
                }
            };
            GRozpusteniDluhu = __decorate([
                Decorators.gcontent
            ], GRozpusteniDluhu);
            WebClient.GRozpusteniDluhu = GRozpusteniDluhu;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1JvenB1c3RlbmlEbHVodS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdSb3pwdXN0ZW5pRGx1aHUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0FnTWY7QUFoTUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBZ01uQjtJQWhNZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBZ003QjtRQWhNb0IsV0FBQSxTQUFTO1lBSTFCLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWlCLFNBQVEsT0FBQSxZQUFZO2dCQVU5QyxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRywwQkFBMEIsQ0FBQztvQkFFeEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFFbEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzRCQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUs7NEJBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUFDO3lCQUN0RCxDQUFDLENBQUMsQ0FBQztvQkFFSixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBRXRCLENBQUM7Z0JBRUQsb0JBQW9CO2dCQUNaLFVBQVU7b0JBQ2QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUU7eUJBQ2pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3lCQUN0QixRQUFRLEVBQUU7eUJBQ1YsS0FBSyxDQUFrRDt3QkFDcEQsSUFBSSxFQUFFLHNCQUFzQjt3QkFDNUIsVUFBVSxFQUFFLEtBQUs7d0JBQ2pCLFVBQVUsRUFBRSxNQUFNLEVBQUUsNkNBQTZDO3dCQUNqRSxLQUFLLEVBQUUsS0FBSzt3QkFDWixjQUFjLEVBQUUsS0FBSzt3QkFDckIsT0FBTyxFQUFFLFVBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUU7d0JBQzdDLGNBQWMsRUFBRTs0QkFDWixVQUFVLEVBQUUsSUFBSTt5QkFDbkI7d0JBQ0QsUUFBUSxFQUFFLENBQUM7Z0NBQ1AsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJO2dDQUMvQyxVQUFVLEVBQUUsb0VBQW9FO2dDQUNoRixXQUFXLEVBQUU7b0NBQ1QsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUU7aUNBQ3hJOzZCQUNKLENBQUM7cUJBQ0wsQ0FBQyxDQUFDO29CQUVQLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDckIsQ0FBQztnQkFFRCwyQ0FBMkM7Z0JBQ25DLFVBQVU7b0JBQ2QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLElBQUksR0FBaUI7d0JBQ3JCOzRCQUNJLE9BQU8sRUFBRSxRQUFROzRCQUNqQixPQUFPLEVBQUUsUUFBUTs0QkFDakIsSUFBSSxFQUFFLFdBQVc7NEJBQ2pCLFFBQVEsRUFBRSxJQUFJOzRCQUNkLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQzt5QkFDckM7d0JBQ0Q7NEJBQ0ksT0FBTyxFQUFFLE1BQU07NEJBQ2YsT0FBTyxFQUFFLDJCQUEyQjs0QkFDcEMsSUFBSSxFQUFFLGNBQWM7NEJBQ3BCLFFBQVEsRUFBRSxJQUFJOzRCQUNkLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQzt5QkFDbkM7d0JBQ0Q7NEJBQ0ksT0FBTyxFQUFFLFFBQVE7NEJBQ2pCLE9BQU8sRUFBRSwyQkFBMkI7NEJBQ3BDLElBQUksRUFBRSxlQUFlOzRCQUNyQixRQUFRLEVBQUUsSUFBSTs0QkFDZCxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7eUJBQ3JDO3dCQUNEOzRCQUNJLE9BQU8sRUFBRSxhQUFhOzRCQUN0QixPQUFPLEVBQUUsMEJBQTBCOzRCQUNuQyxJQUFJLEVBQUUsb0JBQW9COzRCQUMxQixRQUFRLEVBQUUsSUFBSTs0QkFDZCxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQzt5QkFDckQ7cUJBQ0osQ0FBQztvQkFFRixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2QixDQUFDO2dCQUVEOztrQkFFRTtnQkFDTSxhQUFhO29CQUNqQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQjs0QkFDSSxJQUFJLEVBQUUsNkJBQTZCOzRCQUNuQyxHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDOzRCQUNuQyxDQUFDO3lCQUNKO3dCQUNEOzRCQUNJLElBQUksRUFBRSxZQUFZOzRCQUNsQixHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFrRCxjQUFjLENBQUMsQ0FBQztnQ0FDakcsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDO29DQUN4QixJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLDBDQUEwQyxFQUFFLEVBQUUsRUFBRSxFQUFFLHlCQUF5QixFQUFFLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLDRCQUE0QixFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7eUNBQy9MLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUUsTUFBTTt3Q0FDN0IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29DQUN0QixDQUFDLENBQUMsQ0FBQztnQ0FDWCxDQUFDOzRCQUNMLENBQUM7eUJBQ0o7d0JBQ0Q7NEJBQ0ksSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsMENBQTBDLEVBQUUsRUFBRSxFQUFFLEVBQUUseUJBQXlCLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSw0QkFBNEIsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO3FDQUN0TCxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFLE1BQU07b0NBQzdCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQ0FDdEIsQ0FBQyxDQUFDLENBQUM7NEJBQ1gsQ0FBQzt5QkFDSjt3QkFDRDs0QkFDSSxJQUFJLEVBQUUsWUFBWTs0QkFDbEIsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7Z0NBQ2hCLElBQUksR0FBRyxHQUFvRCxFQUFFLENBQUM7Z0NBRTlELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFrRCxjQUFjLENBQUMsQ0FBQztnQ0FDakcsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDO29DQUN4QixJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBRXZCLEdBQUcsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztvQ0FFMUIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUU7d0NBQ1gsT0FBTzs0Q0FDSCxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFO3lDQUNwQixDQUFDO29DQUNOLENBQUMsQ0FBQztvQ0FFRixJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO3lDQUNuQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHO3dDQUNyQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0NBQ3RCLENBQUMsQ0FBQyxDQUFDO2dDQUNYLENBQUM7NEJBQ0wsQ0FBQzt5QkFDSjt3QkFDRDs0QkFDSSxJQUFJLEVBQUUsNEJBQTRCOzRCQUNsQyxHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNOLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFrRCxjQUFjLENBQUMsQ0FBQztnQ0FDakcsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQ0FDbkMsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQ0FDL0IsSUFBSSxDQUFDLFFBQVEsQ0FDVCw4Q0FBOEMsRUFDOUM7b0NBQ0ksRUFBRSxFQUFFLDZCQUE2QjtvQ0FDakMsT0FBTyxFQUFFLE9BQU87b0NBQ2hCLEtBQUssRUFBRSxLQUFLO29DQUNaLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztpQ0FDdEMsQ0FDSixDQUFDOzRCQUNOLENBQUM7eUJBQ0o7cUJBQ0osQ0FBQyxDQUFBO2dCQUNOLENBQUM7Z0JBRUQ7O21CQUVHO2dCQUNLLFVBQVU7b0JBRWQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO29CQUVyRSxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUU7eUJBQzlCLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUc7d0JBQ3JCLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztvQkFDOUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQzthQUNKLENBQUE7WUEzTFksZ0JBQWdCO2dCQUY1QixVQUFVLENBQUMsUUFBUTtlQUVQLGdCQUFnQixDQTJMNUI7WUEzTFksMEJBQWdCLG1CQTJMNUIsQ0FBQTtRQUNMLENBQUMsRUFoTW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWdNN0I7SUFBRCxDQUFDLEVBaE1nQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFnTW5CO0FBQUQsQ0FBQyxFQWhNUyxNQUFNLEtBQU4sTUFBTSxRQWdNZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HUm96cHVzdGVuaURsdWh1LnRzICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gT2tubyByb3pwdcWhdMSbbsOtIGRsdWjFryAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgdmNlY2ggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjQtMDgtMjAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgICAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBHUm96cHVzdGVuaURsdWh1IGV4dGVuZHMgR0NvbnRlbnRCYXNlIHsgICAgXHJcbiAgICAgIFxyXG4gICAgICAgIC8qKiDEjMOtc2xvIHR5cHUgcG9obGVkw6F2a3kgKi9cclxuICAgICAgICB0eXBfcGhsOiBzdHJpbmc7XHJcbiAgICAgICAgdnlicmFuZVByaXBhZHk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwdWJsaWMgaGVhZGVyRm9ybTogR29yZGljLkZvcm1zLkZvcm07XHJcbiAgICAgICAgcHVibGljIG9fZmlsdHI7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQudGl0bGUgPSBgU2V6bmFtIHJvenBvdcWhdMSbbsOtIGRsdWjFr2A7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVNZW51KCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlR3JpZCgpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5zZXRCcmVhZGNydW1icyhbe1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogdGhhdC50aXRsZSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R1JvenB1c3RlbmlaYXZyaXRQb3RvbWt5XCJdXHJcbiAgICAgICAgICAgIH1dKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuemlza2VqRGF0YSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZw60gZ3JpZCAqKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKTogSlF1ZXJ5IHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmdyaWQgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1JvenB1c3RlbmlEbHVodUR0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiR1JvenB1c3RlbmlEbHVodUdyaWRcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck1vZGU6IFwiYXV0b1wiLCAvLyBhdXRvLCBhbGwtYXQtb25jZSwgcGFnZWQtc3luYywgcGFnZWQtYXN5bmNcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogQ29tbW9uLkdyaWRGb3JtYXRzLlJvenB1c3RlbmlEbHVodSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGVzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFrdGl2aXRhXCIsIF9sb2NrZWQ6IHRydWUsIF9kZWZhdWx0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiBcImFrdGl2aXRhLCBuYXpldiwgdHlwX3JkbCwgZGF0X29kLCBkYXRfZG8sIHByb2Nfc2F6YmFfcGVuLCBwb3puYW1rYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25kRm9ybWF0czogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBkZXNjcmlwdGlvbjogXCJOZWFrdGl2bsOtXCIsIGZvcm11bGE6ICdOT1QoRVFVQUxTKEBha3Rpdml0YSwgXCIxMDBcIikpJywgYmc6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdEJnLmxpZ2h0Z3JheSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuZ3JpZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKk1ldG9kYSBwcm8gdnl0dm/FmWVuw60gbWVudSBuYSBjb250ZW50dSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBtZW51OiBNZW51UGFyYW1zW10gPSBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIkRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHRGV0YWlsXCJdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTm92w71cIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlZ5dHZvxZlpdCBub3bDqSByb3pwb3XFoXTEm27DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcGx1c19ib2xkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHTm92eVwiXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpydcWhaXRcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlpydcWhaXQgdnlicmFuw6kgcm96cHXFoXTEm27DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktbWludXNfYm9sZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R1pydXNpdFwiXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlJvenAuIGRsdWh1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJQxZnDrXBhZHkgcm96cHXFoXTEm27DrSBkbHVoxa9cIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXNwcmF2YV9hcGxpa2FjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R1JvenB1c3RlbmlEbHVodVByaXBhZHlcIl1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihtZW51KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogVnl0dm/FmcOtIHRsYcSNw610a28gbmFkIHNlem5hbWVtIGtvbnRyb2wgXHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1JvenB1c3RlbmlaYXZyaXRQb3RvbWt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2VBbGxTaWduaWZpY2FudHMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R0RldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUm96cHVzdGVuaURsdWh1RHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbCA9IHNlbGVjdGlvblswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HUGFyYW1ldHJ5Um96cERsdWh1XCIsIHsgSUQ6IFwiRERQR1BhcmFtZXRyeVJvenBEbHVodSNcIiwgZGF0YTogeyBpeHNfcmRsOiBzZWwuaXhzX3JkbCB9LCBlZGl0TW9kZTogZmFsc2UgfSwgXCJQYXJhbWV0cnkgcm96cHXFoXTEm27DrSBkbHVodVwiLCA4MDAsIDQwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoZXYsIHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lnppc2tlakRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHTm92eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuR1BhcmFtZXRyeVJvenBEbHVodVwiLCB7IElEOiBcIkREUEdQYXJhbWV0cnlSb3pwRGx1aHUjXCIsIGRhdGE6IHsgaXhzX3JkbDogXCJcIiB9LCBlZGl0TW9kZTogZmFsc2UgfSwgXCJQYXJhbWV0cnkgcm96cHXFoXTEm27DrSBkbHVodVwiLCA4MDAsIDQwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChldiwgcmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56aXNrZWpEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1pydXNpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdG86IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUm96cHVzdGVuaURsdWh1RHRvID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUm96cHVzdGVuaURsdWh1RHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbCA9IHNlbGVjdGlvblswXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8uaXhzX3JkbCA9IHNlbC5peHNfcmRsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXEgPSBycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnE6IHsgRGF0YTogZHRvIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Sb3pwdXN0ZW5pRGx1aHUuZGVhY3RpdmF0ZShyZXEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpLmRvbmUoZnVuY3Rpb24gKGR0bykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lnppc2tlakRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHUm96cHVzdGVuaURsdWh1UHJpcGFkeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUm96cHVzdGVuaURsdWh1RHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl4c19yZGwgPSBzZWxlY3Rpb25bMF0uaXhzX3JkbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5hemV2ID0gc2VsZWN0aW9uWzBdLm5hemV2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HUm96cHVzdGVuaURsdWh1UHJpcGFkeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEOiBcIkREUEdSb3pwdXN0ZW5pRGx1aHVQcmlwYWR5I1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19yZGw6IGl4c19yZGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF6ZXY6IG5hemV2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ5YnJhbmVQcmlwYWR5OiB0aGF0LnZ5YnJhbmVQcmlwYWR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIEZ1bmtjZSBwcm8gesOtc2vDoW7DrSBmaWx0cm92YW7DvWNoIGRhdCBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHppc2tlakRhdGEoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcIm5hY2l0YW5pX2RhdFwiLCB0ZXh0OiBcIk5hxI3DrXTDoW7DrSBkYXQuLi5cIiB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlJvenB1c3RlbmlEbHVodS5saXN0KClcclxuICAgICAgICAgICAgLmdldCgpLmRvbmUoZnVuY3Rpb24gKGR0bykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkdG8uZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJuYWNpdGFuaV9kYXRcIiB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
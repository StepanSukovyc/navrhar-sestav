"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GSmlAcVerZak.ts                        </Name>
//    <Description> Content pro výběr veřejné zakázky                           </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-01-31                                                  </Created>
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
            /** Content pro výběr veřejné zakázky */
            let GSmlAcVerZak = class GSmlAcVerZak extends Gordic.GContentBase {
                prepareContent(options) {
                    //this.beginOperation({ id: "smlrozaaatstart" });
                    this.serverFilters = this.serverFilters || options.serverFilters;
                    var typ_ag_blok = this.serverFilters.typ_ag_blok;
                    this.rok = this.rok || options.rok;
                    this.ktg_sml = this.ktg_sml || this.serverFilters.ktg_sml;
                    var title = "jres:33600564"; //RC 33600564 : Výběr hodnoty z nabídky
                    if (typ_ag_blok == 510 /* Interface.TypBlokacniAgendy.ng_typagblokEVZ */ || typ_ag_blok == 520 /* Interface.TypBlokacniAgendy.ng_typagblokRZA */) {
                        title = "jres:33600565"; //RC 33600565 : Výběr veřejné zakázky z nabídky
                    }
                    else if (typ_ag_blok == 580 /* Interface.TypBlokacniAgendy.ng_typagblokVFP */) {
                        title = "jres:33600566"; //RC 33600566 : Výběr dotačního titulu z nabídky
                    }
                    else if (typ_ag_blok == 510 /* Interface.TypBlokacniAgendy.ng_typagblokEVZ */) {
                        title = "jres:33600567"; //RC 33600567 : Výběr převodu, odprodeje z nabídky
                    }
                    this.title = title;
                    this.createActions();
                    this.createFilterPanel();
                    this.createGrid();
                    this.createCommandBar();
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actVybrat: {
                            name: "actVybrat",
                            caption: "jres:33600405", //RC 33600405 : Vybrat
                            run: (ev, ctx) => {
                                let row = this.$grid.ggrid("activeRow");
                                this.tryClose(row ?? void 0);
                            }
                        },
                        actZavrit: {
                            name: "actZavrit",
                            caption: GDlg.mbbClose.text,
                            run: (ev, ctx) => {
                                this.tryClose();
                            }
                        },
                    });
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actVybrat!", "actZavrit"]));
                }
                /** Vytvoření filtr panelu nad gridem*/
                createFilterPanel() {
                    const that = this;
                    this.$filterPanel = $.newDiv().appendTo(this.element).gfilterpanel({
                        forms: [this.createFilterForm()],
                        filterViewMode: FilterViewMode.Simple,
                        favorites: ["typ_ag_blok", "ac_ag", "rok", "nazev"],
                        collectData: (ev, o) => {
                            o.data = { ...this.serverFilters, ...o.data };
                        },
                        poVyhledaniZobrazit: "OblibenePodminky",
                        autoLoadAfter: ["CreatePanel"],
                    });
                }
                createFilterForm() {
                    var isEpo = this.ktg_sml == 20 /* Interface.KategorieDokladu.ng_ktgsmlOdb */ || this.ktg_sml == 60 /* Interface.KategorieDokladu.ng_ktgsmlOdbObj */ ||
                        this.ktg_sml == 84 /* Interface.KategorieDokladu.ng_ktgsmlJinyPrijemLim */ || this.ktg_sml == 85 /* Interface.KategorieDokladu.ng_ktgsmlJinyPrijemInd */;
                    var typ_ag_blok_data = [];
                    if (this.ktg_sml != 20 /* Interface.KategorieDokladu.ng_ktgsmlOdb */ && this.ktg_sml != 60 /* Interface.KategorieDokladu.ng_ktgsmlOdbObj */) {
                        typ_ag_blok_data.push({ typ_ag_blok: 510 /* Interface.TypBlokacniAgendy.ng_typagblokEVZ */, text: "jres:33600579" }); //RC 33600579 : Veřejné zakázky
                    }
                    if (this.ktg_sml != 20 /* Interface.KategorieDokladu.ng_ktgsmlOdb */ && this.ktg_sml != 60 /* Interface.KategorieDokladu.ng_ktgsmlOdbObj */ && this.ktg_sml != 90 /* Interface.KategorieDokladu.ng_ktgsmlLimPrislib */) {
                        typ_ag_blok_data.push({ typ_ag_blok: 580 /* Interface.TypBlokacniAgendy.ng_typagblokVFP */, text: "jres:33600580" }); //RC 33600580 : Dotační tituly
                    }
                    if (isEpo) {
                        typ_ag_blok_data.push({ typ_ag_blok: 620 /* Interface.TypBlokacniAgendy.ng_typagblokEPO */, text: "jres:33600581" }); //RC 33600581 : Převody, odprodeje
                    }
                    var form = new Gordic.Forms.Form({ tabLabel: "jres:33600406", name: "filterForm" }); //RC 33600406 : Obecné
                    form.addRow("jres:33600568") //RC 33600568 : Typ případu
                        .addField("gselectbox", {
                        name: "typ_ag_blok",
                        model: "model.typ_ag_blok=value.typ_ag_blok",
                        list: true,
                        multi: false,
                        initialValue: (isEpo) ? { typ_ag_blok: 620 /* Interface.TypBlokacniAgendy.ng_typagblokEPO */ } : { typ_ag_blok: 510 /* Interface.TypBlokacniAgendy.ng_typagblokEVZ */ },
                        itemWidth: "",
                        itemClass: "spaced",
                        //data: new Gordic.Data.View([
                        //    (this.ktg_sml != Interface.KategorieDokladu.ng_ktgsmlOdb && this.ktg_sml != Interface.KategorieDokladu.ng_ktgsmlOdbObj) ? { typ_ag_blok: Interface.TypBlokacniAgendy.ng_typagblokEVZ, text: "jres:33600579" } : void 0, //RC 33600579 : Veřejné zakázky
                        //    (this.ktg_sml != Interface.KategorieDokladu.ng_ktgsmlOdb && this.ktg_sml != Interface.KategorieDokladu.ng_ktgsmlOdbObj && this.ktg_sml != Interface.KategorieDokladu.ng_ktgsmlLimPrislib) ? { typ_ag_blok: Interface.TypBlokacniAgendy.ng_typagblokVFP, text: "jres:33600580" } : void 0, //RC 33600580 : Dotační tituly
                        //    (isEpo) ? { typ_ag_blok: Interface.TypBlokacniAgendy.ng_typagblokEPO, text: "Převody, odprodeje" } : void 0,
                        //], { key: "typ_ag_blok" }),
                        data: new Gordic.Data.View(typ_ag_blok_data, { key: "typ_ag_blok" }),
                        itemTemplate: "{text}"
                    })
                        .addRow("jres:33600569") //RC 33600569 : Agendové číslo
                        .addField("gstringbox", Gordic.Prefabs.String.withOperators(), {
                        name: "ac_ag",
                    })
                        .addRow("jres:33600570") //RC 33600570 : Rok financování
                        .addField("gnumberbox", /*Gordic.Prefabs.Number.withOperators(),*/ {
                        name: "rok",
                        initialValue: this.rok
                    })
                        .addRow("jres:33600571") //RC 33600571 : Název
                        .addField("gstringbox", Gordic.Prefabs.String.withOperators(), {
                        name: "nazev"
                    });
                    return form;
                }
                /** Vytvoření gridu pro výběr veřejné zakázky */
                createGrid() {
                    this.$grid = $.newDiv().appendTo(this.element)
                        .ggrid({
                        name: "gridSmlAcVerZak",
                        columnMode: "full",
                        columns: this.createGridFormat(),
                        data: new Gordic.Isl.View(this.isl.SmlAcVerZak.list(), {
                            key: "ixs_pri",
                            filterPanel: this.$filterPanel,
                            startEmpty: true
                        }),
                        defaultAction: this.actions.actVybrat,
                        defaultProfile: {
                            sort: "ac_ag",
                        },
                    }).gautofit({ resizersOnTab: false });
                }
                /** Vytvoření gridformátu pro grid s prostředky*/
                createGridFormat() {
                    var gf = new Gordic.Data.GridFormat();
                    gf.addTextColumn({
                        name: "ac_ver_zak",
                        caption: "jres:33600572", //RC 33600572 : Evidenční číslo
                        width: 110
                    }).addTextColumn({
                        name: "ac_ag",
                        caption: "jres:33600573", //RC 33600573 : Agendové číslo
                        width: 110
                    }).addTextColumn({
                        name: "nazev",
                        caption: "jres:33600574", //RC 33600574 : Název
                        width: 200
                    }).addCurrencyColumn({
                        name: "c_sch",
                        caption: "jres:33600575", //RC 33600575 : Schválená částka
                        width: 100
                    }).addNumberColumn({
                        name: "fin_od",
                        caption: "jres:33600576", //RC 33600576 : Financování od
                        width: 60
                    }).addNumberColumn({
                        name: "fin_do",
                        caption: "jres:33600577", //RC 33600577 : Financování do
                        width: 60
                    }).addTextColumn({
                        name: "soutez_txt",
                        caption: "jres:33600578", //RC 33600578 : Druh soutěže
                        width: 180
                    }).addTextColumn({
                        name: "typ_ag_zkr",
                        caption: "jres:33600583", //RC 33600583 : Typ agendy
                        width: 60
                    });
                    return gf;
                }
            };
            GSmlAcVerZak = __decorate([
                Decorators.gcontent
            ], GSmlAcVerZak);
            WebClient.GSmlAcVerZak = GSmlAcVerZak;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NtbEFjVmVyWmFrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1NtbEFjVmVyWmFrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFHakIsSUFBVSxNQUFNLENBOExmO0FBOUxELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQThMbkI7SUE5TGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQThMN0I7UUE5TG9CLFdBQUEsU0FBUztZQUMxQix3Q0FBd0M7WUFFeEMsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBYSxTQUFRLE9BQUEsWUFBWTtnQkFjMUMsY0FBYyxDQUFDLE9BQU87b0JBQ2xCLGlEQUFpRDtvQkFDakQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUM7b0JBQ2pFLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO29CQUNqRCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO29CQUV6RCxJQUFJLEtBQUssR0FBRyxlQUFlLENBQUMsQ0FBQyx1Q0FBdUM7b0JBQ3BFLElBQUksV0FBVyx5REFBK0MsSUFBSSxXQUFXLHlEQUErQyxFQUFFLENBQUM7d0JBQzNILEtBQUssR0FBRyxlQUFlLENBQUMsQ0FBQywrQ0FBK0M7b0JBQzVFLENBQUM7eUJBQU0sSUFBSSxXQUFXLHlEQUErQyxFQUFFLENBQUM7d0JBQ3BFLEtBQUssR0FBRyxlQUFlLENBQUMsQ0FBQyxnREFBZ0Q7b0JBQzdFLENBQUM7eUJBQU0sSUFBSSxXQUFXLHlEQUErQyxFQUFFLENBQUM7d0JBQ3BFLEtBQUssR0FBRyxlQUFlLENBQUMsQ0FBQyxrREFBa0Q7b0JBQy9FLENBQUM7b0JBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBRW5CLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQzVCLENBQUM7Z0JBRUQsa0NBQWtDO2dCQUMxQixhQUFhO29CQUNqQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWxCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixTQUFTLEVBQUU7NEJBQ1AsSUFBSSxFQUFFLFdBQVc7NEJBQ2pCLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCOzRCQUNoRCxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0NBQ2IsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7Z0NBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7NEJBQ2pDLENBQUM7eUJBQ0o7d0JBQ0QsU0FBUyxFQUFFOzRCQUNQLElBQUksRUFBRSxXQUFXOzRCQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJOzRCQUMzQixHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0NBQ2IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUNwQixDQUFDO3lCQUNKO3FCQUNKLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUVELDRCQUE0QjtnQkFDcEIsZ0JBQWdCO29CQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekUsQ0FBQztnQkFFRCx1Q0FBdUM7Z0JBQy9CLGlCQUFpQjtvQkFDckIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQzt3QkFDL0QsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7d0JBQ2hDLGNBQWMsRUFBRSxjQUFjLENBQUMsTUFBTTt3QkFDckMsU0FBUyxFQUFFLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDO3dCQUNuRCxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7NEJBQ25CLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ2xELENBQUM7d0JBQ0QsbUJBQW1CLEVBQUUsa0JBQWtCO3dCQUN2QyxhQUFhLEVBQUUsQ0FBQyxhQUFhLENBQUM7cUJBQ2pDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUVPLGdCQUFnQjtvQkFDcEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sb0RBQTJDLElBQUksSUFBSSxDQUFDLE9BQU8sdURBQThDO3dCQUM3SCxJQUFJLENBQUMsT0FBTyw4REFBcUQsSUFBSSxJQUFJLENBQUMsT0FBTyw4REFBcUQsQ0FBQztvQkFDM0ksSUFBSSxnQkFBZ0IsR0FBNEMsRUFBRSxDQUFDO29CQUNuRSxJQUFJLElBQUksQ0FBQyxPQUFPLG9EQUEyQyxJQUFJLElBQUksQ0FBQyxPQUFPLHVEQUE4QyxFQUFFLENBQUM7d0JBQ3hILGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsdURBQTZDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQywrQkFBK0I7b0JBQy9JLENBQUM7b0JBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxvREFBMkMsSUFBSSxJQUFJLENBQUMsT0FBTyx1REFBOEMsSUFBSSxJQUFJLENBQUMsT0FBTywyREFBa0QsRUFBRSxDQUFDO3dCQUMxTCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLHVEQUE2QyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUMsOEJBQThCO29CQUM5SSxDQUFDO29CQUNELElBQUksS0FBSyxFQUFFLENBQUM7d0JBQ1IsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsV0FBVyx1REFBNkMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLGtDQUFrQztvQkFDbEosQ0FBQztvQkFFRCxJQUFJLElBQUksR0FBRyxJQUFJLE9BQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7b0JBQ3BHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsMkJBQTJCO3lCQUNuRCxRQUFRLENBQUMsWUFBWSxFQUFFO3dCQUNwQixJQUFJLEVBQUUsYUFBYTt3QkFDbkIsS0FBSyxFQUFFLHFDQUFxQzt3QkFDNUMsSUFBSSxFQUFFLElBQUk7d0JBQ1YsS0FBSyxFQUFFLEtBQUs7d0JBQ1osWUFBWSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyx1REFBOEMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsdURBQTZDLEVBQUU7d0JBQ25KLFNBQVMsRUFBRSxFQUFFO3dCQUNiLFNBQVMsRUFBRSxRQUFRO3dCQUNuQiw4QkFBOEI7d0JBQzlCLDZQQUE2UDt3QkFDN1AsOFRBQThUO3dCQUM5VCxrSEFBa0g7d0JBQ2xILDZCQUE2Qjt3QkFDN0IsSUFBSSxFQUFFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFFLENBQUM7d0JBQ3BFLFlBQVksRUFBRSxRQUFRO3FCQUN6QixDQUFDO3lCQUNELE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyw4QkFBOEI7eUJBQ3RELFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLEVBQUU7d0JBQzNELElBQUksRUFBRSxPQUFPO3FCQUNoQixDQUFDO3lCQUNELE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQywrQkFBK0I7eUJBQ3ZELFFBQVEsQ0FBQyxZQUFZLEVBQUUsMENBQTBDLENBQUM7d0JBQy9ELElBQUksRUFBRSxLQUFLO3dCQUNYLFlBQVksRUFBRSxJQUFJLENBQUMsR0FBRztxQkFDekIsQ0FBQzt5QkFDRCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMscUJBQXFCO3lCQUM3QyxRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFO3dCQUMzRCxJQUFJLEVBQUUsT0FBTztxQkFDaEIsQ0FBQyxDQUFBO29CQUNOLE9BQU8sSUFBSSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELGdEQUFnRDtnQkFDeEMsVUFBVTtvQkFDZCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzt5QkFDekMsS0FBSyxDQUFDO3dCQUNILElBQUksRUFBRSxpQkFBaUI7d0JBQ3ZCLFVBQVUsRUFBRSxNQUFNO3dCQUNsQixPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO3dCQUNoQyxJQUFJLEVBQUUsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBdUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUU7NEJBQ3pGLEdBQUcsRUFBRSxTQUFTOzRCQUNkLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWTs0QkFDOUIsVUFBVSxFQUFFLElBQUk7eUJBQ25CLENBQUM7d0JBQ0YsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUzt3QkFDckMsY0FBYyxFQUFFOzRCQUNaLElBQUksRUFBRSxPQUFPO3lCQUNoQjtxQkFDSixDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQzlDLENBQUM7Z0JBRUQsaURBQWlEO2dCQUN6QyxnQkFBZ0I7b0JBQ3BCLElBQUksRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDdEMsRUFBRSxDQUFDLGFBQWEsQ0FBQzt3QkFDYixJQUFJLEVBQUUsWUFBWTt3QkFDbEIsT0FBTyxFQUFFLGVBQWUsRUFBRSwrQkFBK0I7d0JBQ3pELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUMsQ0FBQyxhQUFhLENBQUM7d0JBQ2IsSUFBSSxFQUFFLE9BQU87d0JBQ2IsT0FBTyxFQUFFLGVBQWUsRUFBRSw4QkFBOEI7d0JBQ3hELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUMsQ0FBQyxhQUFhLENBQUM7d0JBQ2IsSUFBSSxFQUFFLE9BQU87d0JBQ2IsT0FBTyxFQUFFLGVBQWUsRUFBRSxxQkFBcUI7d0JBQy9DLEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQzt3QkFDakIsSUFBSSxFQUFFLE9BQU87d0JBQ2IsT0FBTyxFQUFFLGVBQWUsRUFBRSxnQ0FBZ0M7d0JBQzFELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUMsQ0FBQyxlQUFlLENBQUM7d0JBQ2YsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsT0FBTyxFQUFFLGVBQWUsRUFBRSw4QkFBOEI7d0JBQ3hELEtBQUssRUFBRSxFQUFFO3FCQUNaLENBQUMsQ0FBQyxlQUFlLENBQUM7d0JBQ2YsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsT0FBTyxFQUFFLGVBQWUsRUFBRSw4QkFBOEI7d0JBQ3hELEtBQUssRUFBRSxFQUFFO3FCQUNaLENBQUMsQ0FBQyxhQUFhLENBQUM7d0JBQ2IsSUFBSSxFQUFFLFlBQVk7d0JBQ2xCLE9BQU8sRUFBRSxlQUFlLEVBQUUsNEJBQTRCO3dCQUN0RCxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDLENBQUMsYUFBYSxDQUFDO3dCQUNiLElBQUksRUFBRSxZQUFZO3dCQUNsQixPQUFPLEVBQUUsZUFBZSxFQUFFLDBCQUEwQjt3QkFDcEQsS0FBSyxFQUFFLEVBQUU7cUJBQ1osQ0FBQyxDQUFDO29CQUVILE9BQU8sRUFBRSxDQUFDO2dCQUNkLENBQUM7YUFDSixDQUFBO1lBMUxZLFlBQVk7Z0JBRHhCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsWUFBWSxDQTBMeEI7WUExTFksc0JBQVksZUEwTHhCLENBQUE7UUFDTCxDQUFDLEVBOUxvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE4TDdCO0lBQUQsQ0FBQyxFQTlMZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBOExuQjtBQUFELENBQUMsRUE5TFMsTUFBTSxLQUFOLE1BQU0sUUE4TGYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLlNtbC5XZWJDbGllbnQuR1NtbEFjVmVyWmFrLnRzICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IENvbnRlbnQgcHJvIHbDvWLEm3IgdmXFmWVqbsOpIHpha8Ohemt5ICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBwc21lamthbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNC0wMS0zMSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuU21sLldlYkNsaWVudCB7XHJcbiAgICAvKiogQ29udGVudCBwcm8gdsO9YsSbciB2ZcWZZWpuw6kgemFrw6F6a3kgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1NtbEFjVmVyWmFrIGV4dGVuZHMgR0NvbnRlbnRCYXNlIGltcGxlbWVudHMgSUdDbGllbnRDb250ZW50IHtcclxuICAgICAgICBwcml2YXRlIHNlcnZlckZpbHRlcnM7XHJcbiAgICAgICAgLyoqIEFrdXTDoWxuw60gcm9rKi9cclxuICAgICAgICBwcml2YXRlIHJvazogbnVtYmVyO1xyXG4gICAgICAgIC8qKiBLYXRlZ29yaWUgZG9rbGFkdSovXHJcbiAgICAgICAgcHJpdmF0ZSBrdGdfc21sO1xyXG4gICAgICAgIC8qKiBPYmpla3QgcyBwb21vY27DvW1pIHByb23Em25uw71taSBwcm8gcHLDoWNpICovXHJcbiAgICAgICAgcHJpdmF0ZSBwb206IEludGVyZmFjZS5HUm96YWFhdFBvbW9jbmVEdG87XHJcblxyXG4gICAgICAgIC8qKiBGaWx0ciBwYW5lbCAod2lkZ2V0KSovXHJcbiAgICAgICAgcHJpdmF0ZSAkZmlsdGVyUGFuZWw6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqIEdyaWQgcyBwcm9zdMWZZWRreSAod2lkZ2V0KSovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgcHJlcGFyZUNvbnRlbnQob3B0aW9ucykge1xyXG4gICAgICAgICAgICAvL3RoaXMuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJzbWxyb3phYWF0c3RhcnRcIiB9KTtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXJGaWx0ZXJzID0gdGhpcy5zZXJ2ZXJGaWx0ZXJzIHx8IG9wdGlvbnMuc2VydmVyRmlsdGVycztcclxuICAgICAgICAgICAgdmFyIHR5cF9hZ19ibG9rID0gdGhpcy5zZXJ2ZXJGaWx0ZXJzLnR5cF9hZ19ibG9rO1xyXG4gICAgICAgICAgICB0aGlzLnJvayA9IHRoaXMucm9rIHx8IG9wdGlvbnMucm9rO1xyXG4gICAgICAgICAgICB0aGlzLmt0Z19zbWwgPSB0aGlzLmt0Z19zbWx8fCB0aGlzLnNlcnZlckZpbHRlcnMua3RnX3NtbDtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aXRsZSA9IFwianJlczozMzYwMDU2NFwiOyAvL1JDIDMzNjAwNTY0IDogVsO9YsSbciBob2Rub3R5IHogbmFiw61ka3lcclxuICAgICAgICAgICAgaWYgKHR5cF9hZ19ibG9rID09IEludGVyZmFjZS5UeXBCbG9rYWNuaUFnZW5keS5uZ190eXBhZ2Jsb2tFVlogfHwgdHlwX2FnX2Jsb2sgPT0gSW50ZXJmYWNlLlR5cEJsb2thY25pQWdlbmR5Lm5nX3R5cGFnYmxva1JaQSkge1xyXG4gICAgICAgICAgICAgICAgdGl0bGUgPSBcImpyZXM6MzM2MDA1NjVcIjsgLy9SQyAzMzYwMDU2NSA6IFbDvWLEm3IgdmXFmWVqbsOpIHpha8Ohemt5IHogbmFiw61ka3lcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBfYWdfYmxvayA9PSBJbnRlcmZhY2UuVHlwQmxva2FjbmlBZ2VuZHkubmdfdHlwYWdibG9rVkZQKSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZSA9IFwianJlczozMzYwMDU2NlwiOyAvL1JDIDMzNjAwNTY2IDogVsO9YsSbciBkb3RhxI1uw61obyB0aXR1bHUgeiBuYWLDrWRreVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cF9hZ19ibG9rID09IEludGVyZmFjZS5UeXBCbG9rYWNuaUFnZW5keS5uZ190eXBhZ2Jsb2tFVlopIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlID0gXCJqcmVzOjMzNjAwNTY3XCI7IC8vUkMgMzM2MDA1NjcgOiBWw71ixJtyIHDFmWV2b2R1LCBvZHByb2RlamUgeiBuYWLDrWRreVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUZpbHRlclBhbmVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbW1hbmRCYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBha2PDrSBwcm8gdGxhxI3DrXRrYSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0VnlicmF0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RWeWJyYXRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA0MDVcIiwgLy9SQyAzMzYwMDQwNSA6IFZ5YnJhdFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMuJGdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2Uocm93ID8/IHZvaWQgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFphdnJpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0WmF2cml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogR0RsZy5tYmJDbG9zZS50ZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGNvbW1hbmRiYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb21tYW5kQmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RWeWJyYXQhXCIsIFwiYWN0WmF2cml0XCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gZmlsdHIgcGFuZWx1IG5hZCBncmlkZW0qL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyUGFuZWwoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLiRmaWx0ZXJQYW5lbCA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZmlsdGVycGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgZm9ybXM6IFt0aGlzLmNyZWF0ZUZpbHRlckZvcm0oKV0sXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGVzOiBbXCJ0eXBfYWdfYmxva1wiLCBcImFjX2FnXCIsIFwicm9rXCIsIFwibmF6ZXZcIl0sXHJcbiAgICAgICAgICAgICAgICBjb2xsZWN0RGF0YTogKGV2LCBvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgby5kYXRhID0geyAuLi50aGlzLnNlcnZlckZpbHRlcnMsIC4uLm8uZGF0YSB9O1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHBvVnlobGVkYW5pWm9icmF6aXQ6IFwiT2JsaWJlbmVQb2RtaW5reVwiLFxyXG4gICAgICAgICAgICAgICAgYXV0b0xvYWRBZnRlcjogW1wiQ3JlYXRlUGFuZWxcIl0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXJGb3JtKCk6IEZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICB2YXIgaXNFcG8gPSB0aGlzLmt0Z19zbWwgPT0gSW50ZXJmYWNlLkthdGVnb3JpZURva2xhZHUubmdfa3Rnc21sT2RiIHx8IHRoaXMua3RnX3NtbCA9PSBJbnRlcmZhY2UuS2F0ZWdvcmllRG9rbGFkdS5uZ19rdGdzbWxPZGJPYmogfHxcclxuICAgICAgICAgICAgICAgIHRoaXMua3RnX3NtbCA9PSBJbnRlcmZhY2UuS2F0ZWdvcmllRG9rbGFkdS5uZ19rdGdzbWxKaW55UHJpamVtTGltIHx8IHRoaXMua3RnX3NtbCA9PSBJbnRlcmZhY2UuS2F0ZWdvcmllRG9rbGFkdS5uZ19rdGdzbWxKaW55UHJpamVtSW5kO1xyXG4gICAgICAgICAgICB2YXIgdHlwX2FnX2Jsb2tfZGF0YTogeyB0eXBfYWdfYmxvazogbnVtYmVyLCB0ZXh0OiBzdHJpbmcgfVtdID0gW107XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmt0Z19zbWwgIT0gSW50ZXJmYWNlLkthdGVnb3JpZURva2xhZHUubmdfa3Rnc21sT2RiICYmIHRoaXMua3RnX3NtbCAhPSBJbnRlcmZhY2UuS2F0ZWdvcmllRG9rbGFkdS5uZ19rdGdzbWxPZGJPYmopIHtcclxuICAgICAgICAgICAgICAgIHR5cF9hZ19ibG9rX2RhdGEucHVzaCh7IHR5cF9hZ19ibG9rOiBJbnRlcmZhY2UuVHlwQmxva2FjbmlBZ2VuZHkubmdfdHlwYWdibG9rRVZaLCB0ZXh0OiBcImpyZXM6MzM2MDA1NzlcIiB9KTsgLy9SQyAzMzYwMDU3OSA6IFZlxZllam7DqSB6YWvDoXpreVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmt0Z19zbWwgIT0gSW50ZXJmYWNlLkthdGVnb3JpZURva2xhZHUubmdfa3Rnc21sT2RiICYmIHRoaXMua3RnX3NtbCAhPSBJbnRlcmZhY2UuS2F0ZWdvcmllRG9rbGFkdS5uZ19rdGdzbWxPZGJPYmogJiYgdGhpcy5rdGdfc21sICE9IEludGVyZmFjZS5LYXRlZ29yaWVEb2tsYWR1Lm5nX2t0Z3NtbExpbVByaXNsaWIpIHtcclxuICAgICAgICAgICAgICAgIHR5cF9hZ19ibG9rX2RhdGEucHVzaCh7IHR5cF9hZ19ibG9rOiBJbnRlcmZhY2UuVHlwQmxva2FjbmlBZ2VuZHkubmdfdHlwYWdibG9rVkZQLCB0ZXh0OiBcImpyZXM6MzM2MDA1ODBcIiB9KTsgLy9SQyAzMzYwMDU4MCA6IERvdGHEjW7DrSB0aXR1bHlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXNFcG8pIHtcclxuICAgICAgICAgICAgICAgIHR5cF9hZ19ibG9rX2RhdGEucHVzaCh7IHR5cF9hZ19ibG9rOiBJbnRlcmZhY2UuVHlwQmxva2FjbmlBZ2VuZHkubmdfdHlwYWdibG9rRVBPLCB0ZXh0OiBcImpyZXM6MzM2MDA1ODFcIiB9KTsgLy9SQyAzMzYwMDU4MSA6IFDFmWV2b2R5LCBvZHByb2RlamVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcImpyZXM6MzM2MDA0MDZcIiwgbmFtZTogXCJmaWx0ZXJGb3JtXCIgfSk7IC8vUkMgMzM2MDA0MDYgOiBPYmVjbsOpXHJcbiAgICAgICAgICAgIGZvcm0uYWRkUm93KFwianJlczozMzYwMDU2OFwiKSAvL1JDIDMzNjAwNTY4IDogVHlwIHDFmcOtcGFkdVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfYWdfYmxva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnR5cF9hZ19ibG9rPXZhbHVlLnR5cF9hZ19ibG9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiAoaXNFcG8pID8geyB0eXBfYWdfYmxvayA6IEludGVyZmFjZS5UeXBCbG9rYWNuaUFnZW5keS5uZ190eXBhZ2Jsb2tFUE99IDogeyB0eXBfYWdfYmxvazogSW50ZXJmYWNlLlR5cEJsb2thY25pQWdlbmR5Lm5nX3R5cGFnYmxva0VWWiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1XaWR0aDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBpdGVtQ2xhc3M6IFwic3BhY2VkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9kYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyhbXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgKHRoaXMua3RnX3NtbCAhPSBJbnRlcmZhY2UuS2F0ZWdvcmllRG9rbGFkdS5uZ19rdGdzbWxPZGIgJiYgdGhpcy5rdGdfc21sICE9IEludGVyZmFjZS5LYXRlZ29yaWVEb2tsYWR1Lm5nX2t0Z3NtbE9kYk9iaikgPyB7IHR5cF9hZ19ibG9rOiBJbnRlcmZhY2UuVHlwQmxva2FjbmlBZ2VuZHkubmdfdHlwYWdibG9rRVZaLCB0ZXh0OiBcImpyZXM6MzM2MDA1NzlcIiB9IDogdm9pZCAwLCAvL1JDIDMzNjAwNTc5IDogVmXFmWVqbsOpIHpha8Ohemt5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgKHRoaXMua3RnX3NtbCAhPSBJbnRlcmZhY2UuS2F0ZWdvcmllRG9rbGFkdS5uZ19rdGdzbWxPZGIgJiYgdGhpcy5rdGdfc21sICE9IEludGVyZmFjZS5LYXRlZ29yaWVEb2tsYWR1Lm5nX2t0Z3NtbE9kYk9iaiAmJiB0aGlzLmt0Z19zbWwgIT0gSW50ZXJmYWNlLkthdGVnb3JpZURva2xhZHUubmdfa3Rnc21sTGltUHJpc2xpYikgPyB7IHR5cF9hZ19ibG9rOiBJbnRlcmZhY2UuVHlwQmxva2FjbmlBZ2VuZHkubmdfdHlwYWdibG9rVkZQLCB0ZXh0OiBcImpyZXM6MzM2MDA1ODBcIiB9IDogdm9pZCAwLCAvL1JDIDMzNjAwNTgwIDogRG90YcSNbsOtIHRpdHVseVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIChpc0VwbykgPyB7IHR5cF9hZ19ibG9rOiBJbnRlcmZhY2UuVHlwQmxva2FjbmlBZ2VuZHkubmdfdHlwYWdibG9rRVBPLCB0ZXh0OiBcIlDFmWV2b2R5LCBvZHByb2RlamVcIiB9IDogdm9pZCAwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vXSwgeyBrZXk6IFwidHlwX2FnX2Jsb2tcIiB9KSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyh0eXBfYWdfYmxva19kYXRhLCB7IGtleTogXCJ0eXBfYWdfYmxva1wiIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7dGV4dH1cIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNTY5XCIpIC8vUkMgMzM2MDA1NjkgOiBBZ2VuZG92w6kgxI3DrXNsb1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcud2l0aE9wZXJhdG9ycygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY19hZ1wiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNTcwXCIpIC8vUkMgMzM2MDA1NzAgOiBSb2sgZmluYW5jb3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCAvKkdvcmRpYy5QcmVmYWJzLk51bWJlci53aXRoT3BlcmF0b3JzKCksKi8ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGlzLnJva1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNTcxXCIpIC8vUkMgMzM2MDA1NzEgOiBOw6F6ZXZcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuU3RyaW5nLndpdGhPcGVyYXRvcnMoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gZ3JpZHUgcHJvIHbDvWLEm3IgdmXFmWVqbsOpIHpha8Ohemt5ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRncmlkID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFNtbEFjVmVyWmFrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuU21sLkludGVyZmFjZS5HU21sQWNWZXJaYWtEdG8+KHRoaXMuaXNsLlNtbEFjVmVyWmFrLmxpc3QoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiaXhzX3ByaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJQYW5lbDogdGhpcy4kZmlsdGVyUGFuZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0RW1wdHk6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0VnlicmF0LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiYWNfYWdcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSkuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBncmlkZm9ybcOhdHUgcHJvIGdyaWQgcyBwcm9zdMWZZWRreSovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KCkge1xyXG4gICAgICAgICAgICB2YXIgZ2YgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpO1xyXG4gICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWNfdmVyX3pha1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNTcyXCIsIC8vUkMgMzM2MDA1NzIgOiBFdmlkZW7EjW7DrSDEjcOtc2xvXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTEwXHJcbiAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY19hZ1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNTczXCIsIC8vUkMgMzM2MDA1NzMgOiBBZ2VuZG92w6kgxI3DrXNsb1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDExMFxyXG4gICAgICAgICAgICB9KS5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDU3NFwiLCAvL1JDIDMzNjAwNTc0IDogTsOhemV2XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMjAwXHJcbiAgICAgICAgICAgIH0pLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY19zY2hcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDU3NVwiLCAvL1JDIDMzNjAwNTc1IDogU2NodsOhbGVuw6EgxI3DoXN0a2FcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDBcclxuICAgICAgICAgICAgfSkuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZmluX29kXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1NzZcIiwgLy9SQyAzMzYwMDU3NiA6IEZpbmFuY292w6Fuw60gb2RcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA2MFxyXG4gICAgICAgICAgICB9KS5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJmaW5fZG9cIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDU3N1wiLCAvL1JDIDMzNjAwNTc3IDogRmluYW5jb3bDoW7DrSBkb1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDYwXHJcbiAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzb3V0ZXpfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1NzhcIiwgLy9SQyAzMzYwMDU3OCA6IERydWggc291dMSbxb5lXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTgwXHJcbiAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfYWdfemtyXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1ODNcIiwgLy9SQyAzMzYwMDU4MyA6IFR5cCBhZ2VuZHlcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA2MFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBnZjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
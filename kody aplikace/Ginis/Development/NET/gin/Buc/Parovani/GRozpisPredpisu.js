"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GRozpisPredpisu.ts                     </Name>
//    <Description> Content pro rozpis předpisů pro párování                    </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-10-20                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Buc;
    (function (Buc) {
        var WebClient;
        (function (WebClient) {
            /** Content pro rozpis předpisů pro párování */
            let GRozpisPredpisu = class GRozpisPredpisu extends Gordic.GContentBase {
                onContentReady() {
                    this.createActions();
                    this.createCommandBar();
                    this.createGrid();
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actZavrit: {
                            caption: GDlg.mbbClose.text,
                            run: (ev, ctx) => {
                                this.tryClose();
                            }
                        }
                    });
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actZavrit"]));
                }
                /** Vytvoření gridu */
                createGrid() {
                    this.$grid = $.newDiv().css("height", "100%").appendTo(this.element).ggrid({
                        name: "gridRozpisPredpisu",
                        columns: this.createGridFormat(),
                        data: new Gordic.Isl.View(this.isl.BucRozpisPredpisu.list({ fragments: ["*"] }), {
                            key: ["ixp", "radek_uhr"],
                            startEmpty: true
                        }),
                        columnMode: "full",
                        multi: true
                    }).ggridcelleditor({
                        autoEdit: true,
                        beforeStart: (ev, ctx) => {
                            //kontrola povolení editace
                            if (this.readOnly) {
                                ev.preventDefault();
                                return;
                            }
                        }
                    }).ggrideko({
                        // součtový řádek
                        summaryRowAllowed: true,
                        summaryRow: true
                    });
                }
                /** Vytvoření gridformátu gridu*/
                createGridFormat() {
                    let gridFormat = new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "upl_zkr" /* Interface.GRozpisPredpisuDtoNames.upl_zkr */,
                        caption: "jres:33600495", //RC 33600495 : Typ
                        description: "jres:33600496", //RC 33600496 : Určení platby
                        width: 32,
                        cellTemplate: (data) => { return data.upl_zkr ?? ""; },
                        tooltipTemplate: (data) => { return data.upl_txt ?? ""; },
                    })
                        .addTextColumn({
                        name: "s_uhrp_zkr" /* Interface.GRozpisPredpisuDtoNames.s_uhrp_zkr */,
                        caption: "jres:33600497", //RC 33600497 : S 
                        description: "jres:33600498", //RC 33600498 : Stav předpisu platby
                        width: 32,
                        cellTemplate: (data) => { return data.s_uhrp_zkr ?? ""; },
                        tooltipTemplate: (data) => { return data.s_uhrp_txt ?? ""; },
                    })
                        .addNumberColumn({
                        name: "pri_uhr" /* Interface.GRozpisPredpisuDtoNames.pri_uhr */,
                        caption: "jres:33600541", //RC 33600541 : Priorita
                        width: 32
                    })
                        .addDateColumn({
                        name: "dat_spl" /* Interface.GRozpisPredpisuDtoNames.dat_spl */,
                        caption: "jres:33600503", //RC 33600503 : Datum splatnosti
                        width: 110
                    })
                        .addCurrencyColumn({
                        name: "c" /* Interface.GRozpisPredpisuDtoNames.c */,
                        caption: "jres:33600542", //RC 33600542 : Částka předpárováno
                        width: 120
                    })
                        .addCurrencyColumn({
                        name: "c_par" /* Interface.GRozpisPredpisuDtoNames.c_par */,
                        caption: "jres:33600543", //RC 33600543 : Částka párováno
                        width: 120
                    })
                        .addCurrencyColumn({
                        name: "c_new" /* Interface.GRozpisPredpisuDtoNames.c_new */,
                        caption: "jres:33600544", //RC 33600544 : Částka
                        width: 120,
                        editor: {
                            widget: "gnumberbox",
                            options: [Gordic.Prefabs.Number.currency(), {
                                    name: "c_new" /* Interface.GRozpisPredpisuDtoNames.c_new */,
                                    validators: [
                                        new Gordic.Validators.Base({
                                            message: "jres:33600131", //RC 33600131 : Částka v CZK nesmí být nulová
                                            validate: (val, src) => {
                                                let row = this.$grid.ggrid("activeRow");
                                                return !(parseDecimal(val ?? 0).equals(0) && row.typ_ag == 350);
                                            }
                                        })
                                    ],
                                    change: (ev, ctx) => {
                                        let row = this.$grid.ggrid("activeRow");
                                        if (row.mena == 0) {
                                            this.$grid.ggrid("getView").updateData({ ixp: row.ixp, radek_uhr: row.radek_uhr, c_mena_new: ctx }, "update");
                                        }
                                    }
                                }]
                        }
                    })
                        .addTextColumn({
                        name: "ktg_upo_txt" /* Interface.GRozpisPredpisuDtoNames.ktg_upo_txt */,
                        caption: "jres:33600217", //RC 33600217 : Kategorie pohybu
                        width: 120
                    })
                        .addMena({
                        name: "mena_txt" /* Interface.GRozpisPredpisuDtoNames.mena_txt */,
                        field: "mena_txt" /* Interface.GRozpisPredpisuDtoNames.mena_txt */,
                    })
                        .addBankovniUcetCizi({
                        name: "ucet_ci" /* Interface.GRozpisPredpisuDtoNames.ucet_ci */,
                        field: "ucet_ci" /* Interface.GRozpisPredpisuDtoNames.ucet_ci */
                    })
                        .addVs({
                        name: "vs" /* Interface.GRozpisPredpisuDtoNames.vs */
                    })
                        .addKs({
                        name: "ks" /* Interface.GRozpisPredpisuDtoNames.ks */
                    })
                        .addBankovniUcetVlastni({
                        name: "ucet_vl" /* Interface.GRozpisPredpisuDtoNames.ucet_vl */,
                        field: "ucet_vl" /* Interface.GRozpisPredpisuDtoNames.ucet_vl */
                    })
                        .addSs({
                        name: "ss" /* Interface.GRozpisPredpisuDtoNames.ss */
                    })
                        .addTextColumn({
                        name: "zp_zkr" /* Interface.GRozpisPredpisuDtoNames.zp_zkr */,
                        caption: "jres:33600504", //RC 33600504 : ZÚ
                        description: "jres:33600505", //RC 33600505 : Způsob platby
                        width: 32,
                        cellTemplate: (data) => { return data.zp_zkr ?? ""; },
                        tooltipTemplate: (data) => { return data.zp_txt ?? ""; },
                    })
                        .addAgenda({
                        name: "typ_ag_zkr" /* Interface.GRozpisPredpisuDtoNames.typ_ag_zkr */,
                        field: "typ_ag_zkr" /* Interface.GRozpisPredpisuDtoNames.typ_ag_zkr */
                    })
                        .addAgendoveCislo({
                        name: "ac" /* Interface.GRozpisPredpisuDtoNames.ac */,
                        field: "ac" /* Interface.GRozpisPredpisuDtoNames.ac */
                    })
                        .addCurrencyColumn({
                        name: "c_mena" /* Interface.GRozpisPredpisuDtoNames.c_mena */,
                        caption: "jres:33600545", //RC 33600545 : Částka předpárováno v měně
                        width: 120
                    })
                        .addCurrencyColumn({
                        name: "c_par_mena" /* Interface.GRozpisPredpisuDtoNames.c_par_mena */,
                        caption: "jres:33600546", //RC 33600546 : Částka párováno v měně
                        width: 120
                    })
                        .addCurrencyColumn({
                        name: "c_new_mena" /* Interface.GRozpisPredpisuDtoNames.c_new_mena */,
                        caption: "jres:33600547", //RC 33600547 : Částka v měně
                        width: 120,
                        editor: {
                            widget: "gnumberbox",
                            options: [Gordic.Prefabs.Number.currency(), {
                                    name: "c_new_mena" /* Interface.GRozpisPredpisuDtoNames.c_new_mena */
                                }]
                        }
                    })
                        .addTextColumn({
                        name: "nazev_dod" /* Interface.GRozpisPredpisuDtoNames.nazev_dod */,
                        caption: "jres:33600509", //RC 33600509 : Název
                        width: 300
                    })
                        .addIco({
                        name: "ico_esu" /* Interface.GRozpisPredpisuDtoNames.ico_esu */,
                        field: "ico_esu" /* Interface.GRozpisPredpisuDtoNames.ico_esu */
                    })
                        .addPid({
                        name: "ixp" /* Interface.GRozpisPredpisuDtoNames.ixp */,
                        field: "ixp" /* Interface.GRozpisPredpisuDtoNames.ixp */
                    });
                    return gridFormat;
                }
            };
            GRozpisPredpisu = __decorate([
                Decorators.gcontent
            ], GRozpisPredpisu);
            WebClient.GRozpisPredpisu = GRozpisPredpisu;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1JvenBpc1ByZWRwaXN1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1JvenBpc1ByZWRwaXN1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFHakIsSUFBVSxNQUFNLENBaU5mO0FBak5ELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWlObkI7SUFqTmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWlON0I7UUFqTm9CLFdBQUEsU0FBUztZQUMxQiwrQ0FBK0M7WUFFL0MsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxPQUFBLFlBQVk7Z0JBTzdDLGNBQWM7b0JBQ1YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN0QixDQUFDO2dCQUVELGtDQUFrQztnQkFDMUIsYUFBYTtvQkFDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsU0FBUyxFQUFFOzRCQUNQLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUk7NEJBQzNCLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtnQ0FDYixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQ3BCLENBQUM7eUJBQ0o7cUJBQ0osQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBRUQsNEJBQTRCO2dCQUNwQixnQkFBZ0I7b0JBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNELENBQUM7Z0JBRUQsc0JBQXNCO2dCQUNkLFVBQVU7b0JBQ2QsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBK0I7d0JBQ3JHLElBQUksRUFBRSxvQkFBb0I7d0JBQzFCLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7d0JBQ2hDLElBQUksRUFBRSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFDckQ7NEJBQ0ksR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQzs0QkFDekIsVUFBVSxFQUFFLElBQUk7eUJBQ25CLENBQUM7d0JBQ04sVUFBVSxFQUFFLE1BQU07d0JBQ2xCLEtBQUssRUFBRSxJQUFJO3FCQUNkLENBQUMsQ0FBQyxlQUFlLENBQUM7d0JBQ2YsUUFBUSxFQUFFLElBQUk7d0JBQ2QsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFOzRCQUNyQiwyQkFBMkI7NEJBQzNCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dDQUNoQixFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7Z0NBQ3BCLE9BQU87NEJBQ1gsQ0FBQzt3QkFDTCxDQUFDO3FCQUNKLENBQUMsQ0FBQyxRQUFRLENBQUM7d0JBQ1IsaUJBQWlCO3dCQUNqQixpQkFBaUIsRUFBRSxJQUFJO3dCQUN2QixVQUFVLEVBQUUsSUFBSTtxQkFDbkIsQ0FBQyxDQUFBO2dCQUNOLENBQUM7Z0JBRUQsaUNBQWlDO2dCQUN6QixnQkFBZ0I7b0JBQ3BCLElBQUksVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQWdDO3lCQUN0RSxhQUFhLENBQUM7d0JBQ1gsSUFBSSwyREFBMkM7d0JBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsbUJBQW1CO3dCQUM3QyxXQUFXLEVBQUUsZUFBZSxFQUFFLDZCQUE2Qjt3QkFDM0QsS0FBSyxFQUFFLEVBQUU7d0JBQ1QsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxPQUFPLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDdEQsZUFBZSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxPQUFPLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDNUQsQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSxpRUFBOEM7d0JBQ2xELE9BQU8sRUFBRSxlQUFlLEVBQUUsa0JBQWtCO3dCQUM1QyxXQUFXLEVBQUUsZUFBZSxFQUFFLG9DQUFvQzt3QkFDbEUsS0FBSyxFQUFFLEVBQUU7d0JBQ1QsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDekQsZUFBZSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDL0QsQ0FBQzt5QkFDRCxlQUFlLENBQUM7d0JBQ2IsSUFBSSwyREFBMkM7d0JBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsd0JBQXdCO3dCQUNsRCxLQUFLLEVBQUUsRUFBRTtxQkFDWixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLDJEQUEyQzt3QkFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxnQ0FBZ0M7d0JBQzFELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsaUJBQWlCLENBQUM7d0JBQ2YsSUFBSSwrQ0FBcUM7d0JBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsbUNBQW1DO3dCQUM3RCxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGlCQUFpQixDQUFDO3dCQUNmLElBQUksdURBQXlDO3dCQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLCtCQUErQjt3QkFDekQsS0FBSyxFQUFFLEdBQUc7cUJBQ2IsQ0FBQzt5QkFDRCxpQkFBaUIsQ0FBQzt3QkFDZixJQUFJLHVEQUF5Qzt3QkFDN0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxzQkFBc0I7d0JBQ2hELEtBQUssRUFBRSxHQUFHO3dCQUNWLE1BQU0sRUFBRTs0QkFDSixNQUFNLEVBQUUsWUFBWTs0QkFDcEIsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7b0NBQ3hDLElBQUksdURBQXlDO29DQUM3QyxVQUFVLEVBQUU7d0NBQ1IsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzs0Q0FDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSw2Q0FBNkM7NENBQ3ZFLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtnREFDbkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQStCLFdBQVcsQ0FBQyxDQUFDO2dEQUN0RSxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDOzRDQUNwRSxDQUFDO3lDQUNKLENBQUM7cUNBQ0w7b0NBQ0QsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO3dDQUNoQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBK0IsV0FBVyxDQUFDLENBQUM7d0NBQ3RFLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQzs0Q0FDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO3dDQUNsSCxDQUFDO29DQUNMLENBQUM7aUNBQ0osQ0FBQzt5QkFDTDtxQkFDSixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLG1FQUErQzt3QkFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxnQ0FBZ0M7d0JBQzFELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsT0FBTyxDQUFDO3dCQUNMLElBQUksNkRBQTRDO3dCQUNoRCxLQUFLLDZEQUE0QztxQkFDcEQsQ0FBQzt5QkFDRCxtQkFBbUIsQ0FBQzt3QkFDakIsSUFBSSwyREFBMkM7d0JBQy9DLEtBQUssMkRBQTJDO3FCQUNuRCxDQUFDO3lCQUNELEtBQUssQ0FBQzt3QkFDSCxJQUFJLGlEQUFzQztxQkFDN0MsQ0FBQzt5QkFDRCxLQUFLLENBQUM7d0JBQ0gsSUFBSSxpREFBc0M7cUJBQzdDLENBQUM7eUJBQ0Qsc0JBQXNCLENBQUM7d0JBQ3BCLElBQUksMkRBQTJDO3dCQUMvQyxLQUFLLDJEQUEyQztxQkFDbkQsQ0FBQzt5QkFDRCxLQUFLLENBQUM7d0JBQ0gsSUFBSSxpREFBc0M7cUJBQzdDLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUkseURBQTBDO3dCQUM5QyxPQUFPLEVBQUUsZUFBZSxFQUFFLGtCQUFrQjt3QkFDNUMsV0FBVyxFQUFFLGVBQWUsRUFBRSw2QkFBNkI7d0JBQzNELEtBQUssRUFBRSxFQUFFO3dCQUNULFlBQVksRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ3JELGVBQWUsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQzNELENBQUM7eUJBQ0QsU0FBUyxDQUFDO3dCQUNQLElBQUksaUVBQThDO3dCQUNsRCxLQUFLLGlFQUE4QztxQkFDdEQsQ0FBQzt5QkFDRCxnQkFBZ0IsQ0FBQzt3QkFDZCxJQUFJLGlEQUFzQzt3QkFDMUMsS0FBSyxpREFBc0M7cUJBQzlDLENBQUM7eUJBQ0QsaUJBQWlCLENBQUM7d0JBQ2YsSUFBSSx5REFBMEM7d0JBQzlDLE9BQU8sRUFBRSxlQUFlLEVBQUUsMENBQTBDO3dCQUNwRSxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGlCQUFpQixDQUFDO3dCQUNmLElBQUksaUVBQThDO3dCQUNsRCxPQUFPLEVBQUUsZUFBZSxFQUFFLHNDQUFzQzt3QkFDaEUsS0FBSyxFQUFFLEdBQUc7cUJBQ2IsQ0FBQzt5QkFDRCxpQkFBaUIsQ0FBQzt3QkFDZixJQUFJLGlFQUE4Qzt3QkFDbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSw2QkFBNkI7d0JBQ3ZELEtBQUssRUFBRSxHQUFHO3dCQUNWLE1BQU0sRUFBRTs0QkFDSixNQUFNLEVBQUUsWUFBWTs0QkFDcEIsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7b0NBQ3hDLElBQUksaUVBQThDO2lDQUNyRCxDQUFDO3lCQUNMO3FCQUNKLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksK0RBQTZDO3dCQUNqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLHFCQUFxQjt3QkFDL0MsS0FBSyxFQUFFLEdBQUc7cUJBQ2IsQ0FBQzt5QkFDRCxNQUFNLENBQUM7d0JBQ0osSUFBSSwyREFBMkM7d0JBQy9DLEtBQUssMkRBQTJDO3FCQUNuRCxDQUFDO3lCQUNELE1BQU0sQ0FBQzt3QkFDSixJQUFJLG1EQUF1Qzt3QkFDM0MsS0FBSyxtREFBdUM7cUJBQy9DLENBQUMsQ0FBQztvQkFFUCxPQUFPLFVBQVUsQ0FBQztnQkFDdEIsQ0FBQzthQUNKLENBQUE7WUE3TVksZUFBZTtnQkFEM0IsVUFBVSxDQUFDLFFBQVE7ZUFDUCxlQUFlLENBNk0zQjtZQTdNWSx5QkFBZSxrQkE2TTNCLENBQUE7UUFDTCxDQUFDLEVBak5vQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFpTjdCO0lBQUQsQ0FBQyxFQWpOZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBaU5uQjtBQUFELENBQUMsRUFqTlMsTUFBTSxLQUFOLE1BQU0sUUFpTmYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkJ1Yy5XZWJDbGllbnQuR1JvenBpc1ByZWRwaXN1LnRzICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IENvbnRlbnQgcHJvIHJvenBpcyBwxZllZHBpc8WvIHBybyBww6Fyb3bDoW7DrSAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBwc21lamthbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNS0xMC0yMCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQnVjLldlYkNsaWVudCB7XHJcbiAgICAvKiogQ29udGVudCBwcm8gcm96cGlzIHDFmWVkcGlzxa8gcHJvIHDDoXJvdsOhbsOtICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdSb3pwaXNQcmVkcGlzdSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLyoqIFDFmcOtem5haywgemRhIGplIGdyaWQgcG91emUgcHJvIMSNdGVuw60qL1xyXG4gICAgICAgIHB1YmxpYyByZWFkT25seTogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgLyoqIEdyaWQgcyBwxZllZHBpc3kqL1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21tYW5kQmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGFrY8OtIHBybyB0bGHEjcOtdGthICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RaYXZyaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBHRGxnLm1iYkNsb3NlLnRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBjb21tYW5kYmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZEJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0WmF2cml0XCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gZ3JpZHUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWQgPSAkLm5ld0RpdigpLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZ3JpZDxJbnRlcmZhY2UuR1JvenBpc1ByZWRwaXN1RHRvPih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3pwaXNQcmVkcGlzdVwiLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLklzbC5WaWV3PEludGVyZmFjZS5HUm96cGlzUHJlZHBpc3VEdG8+KFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNsLkJ1Y1JvenBpc1ByZWRwaXN1Lmxpc3QoeyBmcmFnbWVudHM6IFtcIipcIl0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFtcIml4cFwiLCBcInJhZGVrX3VoclwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRFbXB0eTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgICAgICAgICB9KS5nZ3JpZGNlbGxlZGl0b3Ioe1xyXG4gICAgICAgICAgICAgICAgYXV0b0VkaXQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBiZWZvcmVTdGFydDogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL2tvbnRyb2xhIHBvdm9sZW7DrSBlZGl0YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmVhZE9ubHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuZ2dyaWRla28oe1xyXG4gICAgICAgICAgICAgICAgLy8gc291xI10b3bDvSDFmcOhZGVrXHJcbiAgICAgICAgICAgICAgICBzdW1tYXJ5Um93QWxsb3dlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1bW1hcnlSb3c6IHRydWVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBncmlkZm9ybcOhdHUgZ3JpZHUqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0IHtcclxuICAgICAgICAgICAgbGV0IGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR1JvenBpc1ByZWRwaXN1RHRvPigpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdSb3pwaXNQcmVkcGlzdUR0b05hbWVzLnVwbF96a3IsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNDk1XCIsIC8vUkMgMzM2MDA0OTUgOiBUeXBcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwNDk2XCIsIC8vUkMgMzM2MDA0OTYgOiBVcsSNZW7DrSBwbGF0YnlcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZGF0YSkgPT4geyByZXR1cm4gZGF0YS51cGxfemtyID8/IFwiXCI7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcFRlbXBsYXRlOiAoZGF0YSkgPT4geyByZXR1cm4gZGF0YS51cGxfdHh0ID8/IFwiXCI7IH0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HUm96cGlzUHJlZHBpc3VEdG9OYW1lcy5zX3VocnBfemtyLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDQ5N1wiLCAvL1JDIDMzNjAwNDk3IDogUyBcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwNDk4XCIsIC8vUkMgMzM2MDA0OTggOiBTdGF2IHDFmWVkcGlzdSBwbGF0YnlcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZGF0YSkgPT4geyByZXR1cm4gZGF0YS5zX3VocnBfemtyID8/IFwiXCI7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcFRlbXBsYXRlOiAoZGF0YSkgPT4geyByZXR1cm4gZGF0YS5zX3VocnBfdHh0ID8/IFwiXCI7IH0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdSb3pwaXNQcmVkcGlzdUR0b05hbWVzLnByaV91aHIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNTQxXCIsIC8vUkMgMzM2MDA1NDEgOiBQcmlvcml0YVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1JvenBpc1ByZWRwaXN1RHRvTmFtZXMuZGF0X3NwbCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1MDNcIiwgLy9SQyAzMzYwMDUwMyA6IERhdHVtIHNwbGF0bm9zdGlcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1JvenBpc1ByZWRwaXN1RHRvTmFtZXMuYyxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1NDJcIiwgLy9SQyAzMzYwMDU0MiA6IMSMw6FzdGthIHDFmWVkcMOhcm92w6Fub1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HUm96cGlzUHJlZHBpc3VEdG9OYW1lcy5jX3BhcixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1NDNcIiwgLy9SQyAzMzYwMDU0MyA6IMSMw6FzdGthIHDDoXJvdsOhbm9cclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1JvenBpc1ByZWRwaXN1RHRvTmFtZXMuY19uZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNTQ0XCIsIC8vUkMgMzM2MDA1NDQgOiDEjMOhc3RrYVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnbnVtYmVyYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdSb3pwaXNQcmVkcGlzdUR0b05hbWVzLmNfbmV3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJqcmVzOjMzNjAwMTMxXCIsIC8vUkMgMzM2MDAxMzEgOiDEjMOhc3RrYSB2IENaSyBuZXNtw60gYsO9dCBudWxvdsOhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAodmFsLCBzcmMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLiRncmlkLmdncmlkPEludGVyZmFjZS5HUm96cGlzUHJlZHBpc3VEdG8+KFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEocGFyc2VEZWNpbWFsKHZhbCA/PyAwKS5lcXVhbHMoMCkgJiYgcm93LnR5cF9hZyA9PSAzNTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRoaXMuJGdyaWQuZ2dyaWQ8SW50ZXJmYWNlLkdSb3pwaXNQcmVkcGlzdUR0bz4oXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy5tZW5hID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIikudXBkYXRlRGF0YSh7IGl4cDogcm93Lml4cCwgcmFkZWtfdWhyOiByb3cucmFkZWtfdWhyLCBjX21lbmFfbmV3OiBjdHggfSwgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdSb3pwaXNQcmVkcGlzdUR0b05hbWVzLmt0Z191cG9fdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDIxN1wiLCAvL1JDIDMzNjAwMjE3IDogS2F0ZWdvcmllIHBvaHlidVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkTWVuYSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdSb3pwaXNQcmVkcGlzdUR0b05hbWVzLm1lbmFfdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBJbnRlcmZhY2UuR1JvenBpc1ByZWRwaXN1RHRvTmFtZXMubWVuYV90eHQsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEJhbmtvdm5pVWNldENpemkoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HUm96cGlzUHJlZHBpc3VEdG9OYW1lcy51Y2V0X2NpLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBJbnRlcmZhY2UuR1JvenBpc1ByZWRwaXN1RHRvTmFtZXMudWNldF9jaVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRWcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdSb3pwaXNQcmVkcGlzdUR0b05hbWVzLnZzXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEtzKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1JvenBpc1ByZWRwaXN1RHRvTmFtZXMua3NcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQmFua292bmlVY2V0Vmxhc3RuaSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdSb3pwaXNQcmVkcGlzdUR0b05hbWVzLnVjZXRfdmwsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IEludGVyZmFjZS5HUm96cGlzUHJlZHBpc3VEdG9OYW1lcy51Y2V0X3ZsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNzKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1JvenBpc1ByZWRwaXN1RHRvTmFtZXMuc3NcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdSb3pwaXNQcmVkcGlzdUR0b05hbWVzLnpwX3prcixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1MDRcIiwgLy9SQyAzMzYwMDUwNCA6IFrDmlxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDA1MDVcIiwgLy9SQyAzMzYwMDUwNSA6IFpwxa9zb2IgcGxhdGJ5XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMyLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGEpID0+IHsgcmV0dXJuIGRhdGEuenBfemtyID8/IFwiXCI7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcFRlbXBsYXRlOiAoZGF0YSkgPT4geyByZXR1cm4gZGF0YS56cF90eHQgPz8gXCJcIjsgfSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQWdlbmRhKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1JvenBpc1ByZWRwaXN1RHRvTmFtZXMudHlwX2FnX3prcixcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogSW50ZXJmYWNlLkdSb3pwaXNQcmVkcGlzdUR0b05hbWVzLnR5cF9hZ196a3JcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQWdlbmRvdmVDaXNsbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdSb3pwaXNQcmVkcGlzdUR0b05hbWVzLmFjLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBJbnRlcmZhY2UuR1JvenBpc1ByZWRwaXN1RHRvTmFtZXMuYWNcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HUm96cGlzUHJlZHBpc3VEdG9OYW1lcy5jX21lbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNTQ1XCIsIC8vUkMgMzM2MDA1NDUgOiDEjMOhc3RrYSBwxZllZHDDoXJvdsOhbm8gdiBtxJtuxJtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1JvenBpc1ByZWRwaXN1RHRvTmFtZXMuY19wYXJfbWVuYSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1NDZcIiwgLy9SQyAzMzYwMDU0NiA6IMSMw6FzdGthIHDDoXJvdsOhbm8gdiBtxJtuxJtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1JvenBpc1ByZWRwaXN1RHRvTmFtZXMuY19uZXdfbWVuYSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1NDdcIiwgLy9SQyAzMzYwMDU0NyA6IMSMw6FzdGthIHYgbcSbbsSbXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdudW1iZXJib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW0dvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1JvenBpc1ByZWRwaXN1RHRvTmFtZXMuY19uZXdfbWVuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdSb3pwaXNQcmVkcGlzdUR0b05hbWVzLm5hemV2X2RvZCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1MDlcIiwgLy9SQyAzMzYwMDUwOSA6IE7DoXpldlxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkSWNvKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1JvenBpc1ByZWRwaXN1RHRvTmFtZXMuaWNvX2VzdSxcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogSW50ZXJmYWNlLkdSb3pwaXNQcmVkcGlzdUR0b05hbWVzLmljb19lc3VcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUGlkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1JvenBpc1ByZWRwaXN1RHRvTmFtZXMuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBJbnRlcmZhY2UuR1JvenBpc1ByZWRwaXN1RHRvTmFtZXMuaXhwXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=
"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GBankovniVypisPolozkaVyhledavani.ts    </Name>
//    <Description> Content pro vyhledávání položek bankovních výpisů           </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2026-01-19                                                  </Created>
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
            /** Content pro vyhledávání položek bankovních výpisů */
            let GBankovniVypisPolozkaVyhledavani = class GBankovniVypisPolozkaVyhledavani extends Gordic.GContentBase {
                onContentReady() {
                    this.createActions();
                    this.createMenuBar();
                    this.createCommandBar();
                    this.createFilterPanel();
                    this.createGrid();
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actDetail: Gordic.Eko.Action.actionDetail({
                            enabled: false,
                            run: function (ev, ctx) {
                                this.setPending(that.detail());
                            }
                        }),
                        actTisk: Gordic.Eko.Action.actionTisk({
                            name: "actTisk",
                            tooltip: "jres:33600751", //RC 33600751 : Tisk vybraných položek výpisů
                            tema: "buc_ptm_vybpolg",
                            ixsStr: this.buc_ptm_vybpolg,
                            enabled: false,
                            serverParameterMethod: "Gordic.Buc.WebClient.GBankovniVypisPolozkaVyhledavani:PrintParameters",
                            reportStarting: function (rep) {
                                if (Gordic.Utils.WidgetExists("gfilterpanel", that.$filterPanel)) {
                                    // aktuální filtry pro předání do C# metody
                                    rep.customDto = that.$filterPanel.gfilterpanel("getConfirmedData");
                                    $.extend(rep.customDto, { ikc: that.ikc });
                                }
                            }
                        }),
                        actZavrit: {
                            caption: GDlg.mbbClose.text,
                            run: (ev, ctx) => {
                                this.tryClose();
                            }
                        }
                    });
                }
                /** Vytvoření menubaru */
                createMenuBar() {
                    this.menuBar(this.actions.createBar(["actDetail!", "actTisk*"]));
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actZavrit"]));
                }
                /** Vytvoření filtr panelu nad gridem*/
                createFilterPanel() {
                    this.$filterPanel = $.newDiv().appendTo(this.element)
                        .gfilterpanel(Gordic.Eko.Filters.getFilterParams(this.createFilterForm(), undefined, "buc_ptm_vybpolg", "ixs_fun_akt", void 0, null, false, this));
                }
                /** Vytvoření gridu */
                createGrid() {
                    this.$grid = $.newDiv().appendTo(this.element).css("height", "100%").ggrid({
                        name: "gridBankovniVypisPolozkaVyhledavani",
                        columns: this.createGridFormat(),
                        data: new Gordic.Isl.View(this.isl.BucBankovniVypisPolozkaVyhledavani.list({ filters: { ikc: this.ikc } }), {
                            key: ["ixp", "radek_pol", "subradek", "radek_av"],
                            filterPanel: this.$filterPanel,
                            startEmpty: true,
                            onResponse: (response) => {
                                if ((response?.data?.length ?? 0) >= 1) {
                                    this.actions.actTisk?.enabled(true);
                                    this.actions.actDetail?.enabled(true);
                                }
                                return response;
                            }
                        }),
                        columnMode: "full",
                        defaultAction: this.actions.actDetail,
                        defaultProfile: {
                            sort: "ucet_vl",
                            condFormats: [
                                {
                                    formula: "@c < 0",
                                    description: "jres:33600494", //RC 33600494 : Částka menší než 0
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.red,
                                    applyTo: "c"
                                }
                            ]
                        }
                    }).ggrideko({
                        // součtový řádek
                        summaryRowAllowed: true
                    }).gautofit();
                }
                /** Vytvoření gridformátu gridu*/
                createGridFormat() {
                    let gridFormat = new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "s_pol_zkr" /* Interface.GBankovniVypisPolozkaVyhledavaniDtoNames.s_pol_zkr */,
                        caption: "jres:33600752", //RC 33600752 : S 
                        description: "jres:33600753", //RC 33600753 : Stav položky
                        width: 32,
                        cellTemplate: (data) => { return data.s_pol_zkr ?? ""; },
                        tooltipTemplate: (data) => { return data.s_pol_txt ?? ""; }
                    })
                        .addBankovniUcetVlastni({
                        name: "ucet_vl" /* Interface.GBankovniVypisPolozkaVyhledavaniDtoNames.ucet_vl */,
                        field: "ucet_vl" /* Interface.GBankovniVypisPolozkaVyhledavaniDtoNames.ucet_vl */,
                    })
                        .addNumberColumn({
                        name: "cis_pid" /* Interface.GBankovniVypisPolozkaVyhledavaniDtoNames.cis_pid */,
                        caption: "jres:33600754", //RC 33600754 : Č.v.
                        description: "jres:33600755", //RC 33600755 : Číslo výpisu
                        width: 32
                    });
                    if (this.rppUus == 1) {
                        gridFormat.addUus();
                    }
                    gridFormat.addBankovniUcetCizi({
                        name: "ucet_ci" /* Interface.GBankovniVypisPolozkaVyhledavaniDtoNames.ucet_ci */,
                        field: "ucet_ci" /* Interface.GBankovniVypisPolozkaVyhledavaniDtoNames.ucet_ci */,
                    })
                        .addCurrencyColumn({
                        name: "c" /* Interface.GBankovniVypisPolozkaVyhledavaniDtoNames.c */,
                        caption: "jres:33600756", //RC 33600756 : Částka
                        width: 120
                    })
                        .addVs({
                        name: "vs" /* Interface.GBankovniVypisPolozkaVyhledavaniDtoNames.vs */
                    })
                        .addKs({
                        name: "ks" /* Interface.GBankovniVypisPolozkaVyhledavaniDtoNames.ks */
                    })
                        .addSs({
                        name: "ss" /* Interface.GBankovniVypisPolozkaVyhledavaniDtoNames.ss */
                    })
                        .addDateColumn({
                        name: "dat_zap" /* Interface.GBankovniVypisPolozkaVyhledavaniDtoNames.dat_zap */,
                        caption: "jres:33600757", //RC 33600757 : Datum zaplacení
                        width: 110
                    })
                        .addDateColumn({
                        name: "dat_nov_zus" /* Interface.GBankovniVypisPolozkaVyhledavaniDtoNames.dat_nov_zus */,
                        caption: "jres:33600758", //RC 33600758 : Datum výpisu
                        width: 110
                    })
                        .addTextColumn({
                        name: "nazev" /* Interface.GBankovniVypisPolozkaVyhledavaniDtoNames.nazev */,
                        caption: "jres:33600759", //RC 33600759 : Název
                        width: 300
                    })
                        .addIconColumn({
                        name: "archiv" /* Interface.GBankovniVypisPolozkaVyhledavaniDtoNames.archiv */,
                        caption: "jres:33600760", //RC 33600760 : A 
                        description: "jres:33600761", //RC 33600761 : Archivováno
                        iconTemplate: (data) => {
                            switch (data.archiv) {
                                case 0:
                                    return void 0;
                                case 1:
                                    return { icon: "fa-archive", tooltip: "jres:33600762", text: "jres:33600762" }; //RC 33600762 : Archiv
                            }
                        },
                    });
                    return gridFormat;
                }
                /** Vytvoření formuláře filterpanelu*/
                createFilterForm() {
                    let filterForm = new Gordic.Forms.Form({ tabLabel: "jres:33600763" }); //RC 33600763 : Kompletní filtr
                    filterForm.addPrefab(Gordic.Eko.Filters.prefabVsKsSs());
                    filterForm.addRow("jres:33600764") //RC 33600764 : Účet cizí
                        .addField("gstringbox", {
                        name: "bu_ci"
                    })
                        .addRow("jres:33600765") //RC 33600765 : Směrový kód cizí
                        .addField("gstringbox", {
                        name: "sk_ci"
                    })
                        .addRow("jres:33600766") //RC 33600766 : Účet vlastní
                        .addField("gselectbox", Gordic.Prefabs.Select.ekosuvl(), {
                        name: "ucet_vl",
                        model: "model.bu_vl=value.bu_vl;model.sk_vl=value.sk_vl;model.rok=>value.rok",
                        serverFilters: {
                            pristupKBU: 1, //čistě příznak, zda řešit
                            urovenPristupuKBU: 1, //čistě příznak, zda řešit
                            rezimVyberuDleKnihy: 0
                        }
                    })
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "number",
                        label: "jres:33600767", //RC 33600767 : Částka od-do
                        name: "c",
                        customOptAll: $.extend(Gordic.Prefabs.Number.currency(), { defaultValue: null })
                    }))
                        .addRow("jres:33600768") //RC 33600768 : Název
                        .addField("gstringbox", {
                        name: "nazev"
                    })
                        .addRow("jres:33600769") //RC 33600769 : Stav
                        .addField("gselectbox", Gordic.Prefabs.Select.buccspo(), {
                        name: "s_pol",
                        model: "model.s_pol=value.s_pol",
                        multi: true,
                        list: true,
                        itemWidth: "",
                        itemTooltipTemplate: (value) => {
                            return value.s_pol_txt ?? "";
                        },
                        serverFilters: {
                            s_pol: [10, 12, 20, 25, 27, 30, 35, 40, 50]
                        }
                    })
                        .addRow("jres:33600770") //RC 33600770 : Rozpis
                        .addField("gcheck", {
                        name: "roz_vyh",
                        modelValueTransform: {
                            apply: function (modelValue) { return modelValue === 1; },
                            collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                        },
                        initialValue: true
                    })
                        .addRow("jres:33600771") //RC 33600771 : Spárované-Nezaúčtované
                        .addField("gcheck", {
                        name: "spNezau",
                        modelValueTransform: {
                            apply: function (modelValue) { return modelValue === 1; },
                            collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                        }
                    })
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "jres:33600772", //RC 33600772 : Datum zaplacení od-do
                        name: "dat_zap"
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "jres:33600773", //RC 33600773 : Datum výpisu od-do
                        name: "dat_nov_zus"
                    }))
                        .addRow("jres:33600774") //RC 33600774 : Všechny roky
                        .addField("gcheck", {
                        name: "vyh_roky",
                        modelValueTransform: {
                            apply: function (modelValue) { return modelValue === 1; },
                            collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                        },
                        validators: [new Gordic.Validators.Base({
                                message: "jres:33600775", //RC 33600775 : Nelze kombinovat výběr spárovaných-nezaúčtovaných přes roky!
                                validate: (value, source) => {
                                    return !(value == 1 && source.closest(".gform").findFields("spNezau").gfield("getValue") == 1);
                                }
                            })]
                    });
                    return [filterForm];
                }
                /** Zobrazení detailu bankovního výpisu a skok přímo na položku v gridu */
                detail() {
                    let row = Gordic.Eko.Grid.currentRow(this.$grid);
                    if (!row || !row.ixp) {
                        return $.Deferred().reject().promise();
                    }
                    return this.isl.BucBankovniVypis.read({ ixp: row.ixp })
                        .getData()
                        .then((data) => {
                        if (data?.ixp_den) {
                            let newGpc = Gordic.Eko.Utils.createBookGpc(this.gpc, data.ixp_den);
                            this.navigate(["Gordic.Buc.WebClient.GBankovniVypisDetail", { uid: "GBankovniVypisDetail", gpc: newGpc }], {
                                Ixp: row.ixp,
                                IxpDen: data.ixp_den,
                                radek_pol: row.radek_pol,
                                subradek: row.subradek,
                                radek_av: row.radek_av
                            });
                            return $.Deferred().resolve().promise();
                        }
                        else {
                            return $.Deferred().reject().promise();
                        }
                    });
                }
            };
            GBankovniVypisPolozkaVyhledavani = __decorate([
                Decorators.gcontent
            ], GBankovniVypisPolozkaVyhledavani);
            WebClient.GBankovniVypisPolozkaVyhledavani = GBankovniVypisPolozkaVyhledavani;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0Jhbmtvdm5pVnlwaXNQb2xvemthVnlobGVkYXZhbmkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHQmFua292bmlWeXBpc1BvbG96a2FWeWhsZWRhdmFuaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBR2pCLElBQVUsTUFBTSxDQTBUZjtBQTFURCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EwVG5CO0lBMVRnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0EwVDdCO1FBMVRvQixXQUFBLFNBQVM7WUFDMUIsd0RBQXdEO1lBRXhELElBQWEsZ0NBQWdDLEdBQTdDLE1BQWEsZ0NBQWlDLFNBQVEsT0FBQSxZQUFZO2dCQVc5RCxjQUFjO29CQUNWLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQztnQkFFRCxrQ0FBa0M7Z0JBQzFCLGFBQWE7b0JBQ2pCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLFNBQVMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7NEJBQ3RDLE9BQU8sRUFBRSxLQUFLOzRCQUNkLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHO2dDQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDOzRCQUNuQyxDQUFDO3lCQUNKLENBQUM7d0JBQ0YsT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQzs0QkFDbEMsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsT0FBTyxFQUFFLGVBQWUsRUFBRSw2Q0FBNkM7NEJBQ3ZFLElBQUksRUFBRSxpQkFBaUI7NEJBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsZUFBZTs0QkFDNUIsT0FBTyxFQUFFLEtBQUs7NEJBQ2QscUJBQXFCLEVBQUUsdUVBQXVFOzRCQUM5RixjQUFjLEVBQUUsVUFBVSxHQUFHO2dDQUN6QixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQztvQ0FDL0QsMkNBQTJDO29DQUMzQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUM7b0NBQ25FLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztnQ0FDL0MsQ0FBQzs0QkFDTCxDQUFDO3lCQUNKLENBQUM7d0JBQ0YsU0FBUyxFQUFFOzRCQUNQLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUk7NEJBQzNCLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtnQ0FDYixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQ3BCLENBQUM7eUJBQ0o7cUJBQ0osQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBRUQseUJBQXlCO2dCQUNqQixhQUFhO29CQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckUsQ0FBQztnQkFFRCw0QkFBNEI7Z0JBQ3BCLGdCQUFnQjtvQkFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0QsQ0FBQztnQkFFRCx1Q0FBdUM7Z0JBQy9CLGlCQUFpQjtvQkFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ2hELFlBQVksQ0FDVCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQzlCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUN2QixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLGFBQWEsRUFDYixLQUFLLENBQUMsRUFDTixJQUFXLEVBQ1gsS0FBSyxFQUNMLElBQUksQ0FDUCxDQUNKLENBQUM7Z0JBQ1YsQ0FBQztnQkFFRCxzQkFBc0I7Z0JBQ2QsVUFBVTtvQkFDZCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFnRDt3QkFDdEgsSUFBSSxFQUFFLHFDQUFxQzt3QkFDM0MsT0FBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTt3QkFDaEMsSUFBSSxFQUFFLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBQyxDQUFDLEVBQy9FOzRCQUNJLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQzs0QkFDakQsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZOzRCQUM5QixVQUFVLEVBQUUsSUFBSTs0QkFDaEIsVUFBVSxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0NBQ3JCLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztvQ0FDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQzFDLENBQUM7Z0NBRUQsT0FBTyxRQUFRLENBQUM7NEJBQ3BCLENBQUM7eUJBQ0osQ0FBQzt3QkFDTixVQUFVLEVBQUUsTUFBTTt3QkFDbEIsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUzt3QkFDckMsY0FBYyxFQUFFOzRCQUNaLElBQUksRUFBRSxTQUFTOzRCQUNmLFdBQVcsRUFBRTtnQ0FDVDtvQ0FDSSxPQUFPLEVBQUUsUUFBUTtvQ0FDakIsV0FBVyxFQUFFLGVBQWUsRUFBRSxrQ0FBa0M7b0NBQ2hFLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLEdBQUc7b0NBQzNELE9BQU8sRUFBRSxHQUFHO2lDQUNmOzZCQUNKO3lCQUNKO3FCQUNKLENBQUMsQ0FBQyxRQUFRLENBQUM7d0JBQ1IsaUJBQWlCO3dCQUNqQixpQkFBaUIsRUFBRSxJQUFJO3FCQUMxQixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2xCLENBQUM7Z0JBRUQsaUNBQWlDO2dCQUN6QixnQkFBZ0I7b0JBQ3BCLElBQUksVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQWlEO3lCQUN2RixhQUFhLENBQUM7d0JBQ1gsSUFBSSxnRkFBOEQ7d0JBQ2xFLE9BQU8sRUFBRSxlQUFlLEVBQUUsa0JBQWtCO3dCQUM1QyxXQUFXLEVBQUUsZUFBZSxFQUFFLDRCQUE0Qjt3QkFDMUQsS0FBSyxFQUFFLEVBQUU7d0JBQ1QsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDeEQsZUFBZSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDOUQsQ0FBQzt5QkFDRCxzQkFBc0IsQ0FBQzt3QkFDcEIsSUFBSSw0RUFBNEQ7d0JBQ2hFLEtBQUssNEVBQTREO3FCQUNwRSxDQUFDO3lCQUNELGVBQWUsQ0FBQzt3QkFDYixJQUFJLDRFQUE0RDt3QkFDaEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxvQkFBb0I7d0JBQzlDLFdBQVcsRUFBRSxlQUFlLEVBQUUsNEJBQTRCO3dCQUMxRCxLQUFLLEVBQUUsRUFBRTtxQkFDWixDQUFDLENBQUM7b0JBQ1AsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDO3dCQUNuQixVQUFVLENBQUMsTUFBTSxFQUFFLENBQUE7b0JBQ3ZCLENBQUM7b0JBQ0QsVUFBVSxDQUFDLG1CQUFtQixDQUFDO3dCQUN2QixJQUFJLDRFQUE0RDt3QkFDaEUsS0FBSyw0RUFBNEQ7cUJBQ3BFLENBQUM7eUJBQ0QsaUJBQWlCLENBQUM7d0JBQ2YsSUFBSSxnRUFBc0Q7d0JBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCO3dCQUNoRCxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELEtBQUssQ0FBQzt3QkFDSCxJQUFJLGtFQUF1RDtxQkFDOUQsQ0FBQzt5QkFDRCxLQUFLLENBQUM7d0JBQ0gsSUFBSSxrRUFBdUQ7cUJBQzlELENBQUM7eUJBQ0QsS0FBSyxDQUFDO3dCQUNILElBQUksa0VBQXVEO3FCQUM5RCxDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLDRFQUE0RDt3QkFDaEUsT0FBTyxFQUFFLGVBQWUsRUFBRSwrQkFBK0I7d0JBQ3pELEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksb0ZBQWdFO3dCQUNwRSxPQUFPLEVBQUUsZUFBZSxFQUFFLDRCQUE0Qjt3QkFDdEQsS0FBSyxFQUFFLEdBQUc7cUJBQ2IsQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSx3RUFBMEQ7d0JBQzlELE9BQU8sRUFBRSxlQUFlLEVBQUUscUJBQXFCO3dCQUMvQyxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxJQUFJLDBFQUEyRDt3QkFDL0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxrQkFBa0I7d0JBQzVDLFdBQVcsRUFBRSxlQUFlLEVBQUUsMkJBQTJCO3dCQUN6RCxZQUFZLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTs0QkFDbkIsUUFBUSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0NBQ2xCLEtBQUssQ0FBQztvQ0FDRixPQUFPLEtBQUssQ0FBQyxDQUFDO2dDQUNsQixLQUFLLENBQUM7b0NBQ0YsT0FBTyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxzQkFBc0I7NEJBQzlHLENBQUM7d0JBQ0wsQ0FBQztxQkFDSixDQUFDLENBQUE7b0JBRU4sT0FBTyxVQUFVLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQsc0NBQXNDO2dCQUM5QixnQkFBZ0I7b0JBQ3BCLElBQUksVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQSxDQUFDLCtCQUErQjtvQkFDckcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFBO29CQUN2RCxVQUFVLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLHlCQUF5Qjt5QkFDdkQsUUFBUSxDQUFDLFlBQVksRUFBRTt3QkFDcEIsSUFBSSxFQUFFLE9BQU87cUJBQ2hCLENBQUM7eUJBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGdDQUFnQzt5QkFDeEQsUUFBUSxDQUFDLFlBQVksRUFBRTt3QkFDcEIsSUFBSSxFQUFFLE9BQU87cUJBQ2hCLENBQUM7eUJBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLDRCQUE0Qjt5QkFDcEQsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTt3QkFDckQsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsS0FBSyxFQUFFLHNFQUFzRTt3QkFDN0UsYUFBYSxFQUFFOzRCQUNYLFVBQVUsRUFBRSxDQUFDLEVBQUUsMEJBQTBCOzRCQUN6QyxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsMEJBQTBCOzRCQUNoRCxtQkFBbUIsRUFBRSxDQUFDO3lCQUN6QjtxQkFDSixDQUFDO3lCQUNELFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ25DLElBQUksRUFBRSxRQUFRO3dCQUNkLEtBQUssRUFBRSxlQUFlLEVBQUUsNEJBQTRCO3dCQUNwRCxJQUFJLEVBQUUsR0FBRzt3QkFDVCxZQUFZLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQztxQkFDbkYsQ0FBQyxDQUFDO3lCQUNGLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxxQkFBcUI7eUJBQzdDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7d0JBQ3BCLElBQUksRUFBRSxPQUFPO3FCQUNoQixDQUFDO3lCQUNELE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxvQkFBb0I7eUJBQzVDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7d0JBQ3JELElBQUksRUFBRSxPQUFPO3dCQUNiLEtBQUssRUFBRSx5QkFBeUI7d0JBQ2hDLEtBQUssRUFBRSxJQUFJO3dCQUNYLElBQUksRUFBRSxJQUFJO3dCQUNWLFNBQVMsRUFBRSxFQUFFO3dCQUNiLG1CQUFtQixFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7NEJBQzNCLE9BQU8sS0FBSyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7d0JBQ2pDLENBQUM7d0JBQ0QsYUFBYSxFQUFFOzRCQUNYLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO3lCQUM5QztxQkFDSixDQUFDO3lCQUNELE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxzQkFBc0I7eUJBQzlDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7d0JBQ2hCLElBQUksRUFBRSxTQUFTO3dCQUNmLG1CQUFtQixFQUFFOzRCQUNqQixLQUFLLEVBQUUsVUFBVSxVQUFVLElBQUksT0FBTyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDekQsT0FBTyxFQUFFLFVBQVUsVUFBVSxJQUFJLE9BQU8sVUFBVSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUN6RTt3QkFDRCxZQUFZLEVBQUUsSUFBSTtxQkFDckIsQ0FBQzt5QkFDRCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsc0NBQXNDO3lCQUM5RCxRQUFRLENBQUMsUUFBUSxFQUFFO3dCQUNoQixJQUFJLEVBQUUsU0FBUzt3QkFDZixtQkFBbUIsRUFBRTs0QkFDakIsS0FBSyxFQUFFLFVBQVUsVUFBVSxJQUFJLE9BQU8sVUFBVSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3pELE9BQU8sRUFBRSxVQUFVLFVBQVUsSUFBSSxPQUFPLFVBQVUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDekU7cUJBQ0osQ0FBQzt5QkFDRCxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNuQyxJQUFJLEVBQUUsTUFBTTt3QkFDWixLQUFLLEVBQUUsZUFBZSxFQUFFLHFDQUFxQzt3QkFDN0QsSUFBSSxFQUFFLFNBQVM7cUJBQ2xCLENBQUMsQ0FBQzt5QkFDRixTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNuQyxJQUFJLEVBQUUsTUFBTTt3QkFDWixLQUFLLEVBQUUsZUFBZSxFQUFFLGtDQUFrQzt3QkFDMUQsSUFBSSxFQUFFLGFBQWE7cUJBQ3RCLENBQUMsQ0FBQzt5QkFDRixNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsNEJBQTRCO3lCQUNwRCxRQUFRLENBQUMsUUFBUSxFQUFFO3dCQUNoQixJQUFJLEVBQUUsVUFBVTt3QkFDaEIsbUJBQW1CLEVBQUU7NEJBQ2pCLEtBQUssRUFBRSxVQUFVLFVBQVUsSUFBSSxPQUFPLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN6RCxPQUFPLEVBQUUsVUFBVSxVQUFVLElBQUksT0FBTyxVQUFVLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQ3pFO3dCQUNELFVBQVUsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0NBQ3BDLE9BQU8sRUFBRSxlQUFlLEVBQUUsNEVBQTRFO2dDQUN0RyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUU7b0NBQ3hCLE9BQU8sQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dDQUNuRyxDQUFDOzZCQUNKLENBQUMsQ0FBQztxQkFDTixDQUFDLENBQUE7b0JBRU4sT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN4QixDQUFDO2dCQUVELDBFQUEwRTtnQkFDbEUsTUFBTTtvQkFDVixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQWdELElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDaEcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQzt3QkFBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFBQyxDQUFDO29CQUNqRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQzt5QkFDbEQsT0FBTyxFQUFFO3lCQUNULElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO3dCQUNYLElBQUksSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDOzRCQUNoQixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQ3BFLElBQUksQ0FBQyxRQUFRLENBQ1QsQ0FBQywyQ0FBMkMsRUFBRSxFQUFFLEdBQUcsRUFBRSxzQkFBc0IsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFDM0Y7Z0NBQ0ksR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHO2dDQUNaLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTztnQ0FDcEIsU0FBUyxFQUFFLEdBQUcsQ0FBQyxTQUFTO2dDQUN4QixRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7Z0NBQ3RCLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTs2QkFDekIsQ0FDSixDQUFDOzRCQUNGLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUM1QyxDQUFDOzZCQUFNLENBQUM7NEJBQ0osT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQzNDLENBQUM7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQzthQUNKLENBQUE7WUF0VFksZ0NBQWdDO2dCQUQ1QyxVQUFVLENBQUMsUUFBUTtlQUNQLGdDQUFnQyxDQXNUNUM7WUF0VFksMENBQWdDLG1DQXNUNUMsQ0FBQTtRQUNMLENBQUMsRUExVG9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTBUN0I7SUFBRCxDQUFDLEVBMVRnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEwVG5CO0FBQUQsQ0FBQyxFQTFUUyxNQUFNLEtBQU4sTUFBTSxRQTBUZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuQnVjLldlYkNsaWVudC5HQmFua292bmlWeXBpc1BvbG96a2FWeWhsZWRhdmFuaS50cyAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gQ29udGVudCBwcm8gdnlobGVkw6F2w6Fuw60gcG9sb8W+ZWsgYmFua292bsOtY2ggdsO9cGlzxa8gICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgcHNtZWprYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI2ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjYtMDEtMTkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkJ1Yy5XZWJDbGllbnQge1xyXG4gICAgLyoqIENvbnRlbnQgcHJvIHZ5aGxlZMOhdsOhbsOtIHBvbG/FvmVrIGJhbmtvdm7DrWNoIHbDvXBpc8WvICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdCYW5rb3ZuaVZ5cGlzUG9sb3prYVZ5aGxlZGF2YW5pIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICAvKiogRGF0YWLDoXpvdsO9IHBhcmFtZXRyIHBybyB0aXNrIC0gQlVDIC0gVFQgVsO9YsSbciBwb2xvxb5layB2w71waXPFryAqL1xyXG4gICAgICAgIHByaXZhdGUgYnVjX3B0bV92eWJwb2xnOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIEdsb2JhbHMgLSBycHBVdXMqL1xyXG4gICAgICAgIHByaXZhdGUgcnBwVXVzOiBudW1iZXI7XHJcbiAgICAgICAgLyoqIGlrYyovXHJcbiAgICAgICAgcHJpdmF0ZSBpa2M6IHN0cmluZztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlICRmaWx0ZXJQYW5lbDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1lbnVCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21tYW5kQmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRmlsdGVyUGFuZWwoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVHcmlkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gYWtjw60gcHJvIHRsYcSNw610a2EgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdERldGFpbDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uRGV0YWlsKHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LmRldGFpbCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFRpc2s6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblRpc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMzYwMDc1MVwiLCAvL1JDIDMzNjAwNzUxIDogVGlzayB2eWJyYW7DvWNoIHBvbG/FvmVrIHbDvXBpc8WvXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJidWNfcHRtX3Z5YnBvbGdcIixcclxuICAgICAgICAgICAgICAgICAgICBpeHNTdHI6IHRoaXMuYnVjX3B0bV92eWJwb2xnLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuQnVjLldlYkNsaWVudC5HQmFua292bmlWeXBpc1BvbG96a2FWeWhsZWRhdmFuaTpQcmludFBhcmFtZXRlcnNcIixcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoR29yZGljLlV0aWxzLldpZGdldEV4aXN0cyhcImdmaWx0ZXJwYW5lbFwiLCB0aGF0LiRmaWx0ZXJQYW5lbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFrdHXDoWxuw60gZmlsdHJ5IHBybyBwxZllZMOhbsOtIGRvIEMjIG1ldG9keVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHRoYXQuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImdldENvbmZpcm1lZERhdGFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmV4dGVuZChyZXAuY3VzdG9tRHRvLCB7IGlrYzogdGhhdC5pa2MgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFphdnJpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IEdEbGcubWJiQ2xvc2UudGV4dCxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIG1lbnViYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNZW51QmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3REZXRhaWwhXCIsIFwiYWN0VGlzaypcIl0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBjb21tYW5kYmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZEJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0WmF2cml0XCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gZmlsdHIgcGFuZWx1IG5hZCBncmlkZW0qL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyUGFuZWwoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGZpbHRlclBhbmVsID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2ZpbHRlcnBhbmVsKFxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uRmlsdGVycy5nZXRGaWx0ZXJQYXJhbXM8SW50ZXJmYWNlLkdCYW5rb3ZuaVZ5cGlzUG9sb3prYVZ5aGxlZGF2YW5pRmlsdGVyRHRvPihcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVGaWx0ZXJGb3JtKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJidWNfcHRtX3Z5YnBvbGdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpeHNfZnVuX2FrdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2b2lkIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bGwgYXMgYW55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1xyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gZ3JpZHUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWQgPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKS5nZ3JpZDxJbnRlcmZhY2UuR0Jhbmtvdm5pVnlwaXNQb2xvemthVnlobGVkYXZhbmlEdG8+KHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZEJhbmtvdm5pVnlwaXNQb2xvemthVnlobGVkYXZhbmlcIixcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5Jc2wuVmlldzxJbnRlcmZhY2UuR0Jhbmtvdm5pVnlwaXNQb2xvemthVnlobGVkYXZhbmlEdG8+KFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNsLkJ1Y0Jhbmtvdm5pVnlwaXNQb2xvemthVnlobGVkYXZhbmkubGlzdCh7IGZpbHRlcnM6IHsgaWtjOiB0aGlzLmlrYyB9fSksXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFtcIml4cFwiLCBcInJhZGVrX3BvbFwiLCBcInN1YnJhZGVrXCIsIFwicmFkZWtfYXZcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclBhbmVsOiB0aGlzLiRmaWx0ZXJQYW5lbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRFbXB0eTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25SZXNwb25zZTogKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHJlc3BvbnNlPy5kYXRhPy5sZW5ndGggPz8gMCkgPj0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RUaXNrPy5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3REZXRhaWw/LmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoaXMuYWN0aW9ucy5hY3REZXRhaWwsXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwidWNldF92bFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmRGb3JtYXRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm11bGE6IFwiQGMgPCAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwNDk0XCIsIC8vUkMgMzM2MDA0OTQgOiDEjMOhc3RrYSBtZW7FocOtIG5lxb4gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5yZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBseVRvOiBcImNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5nZ3JpZGVrbyh7XHJcbiAgICAgICAgICAgICAgICAvLyBzb3XEjXRvdsO9IMWZw6FkZWtcclxuICAgICAgICAgICAgICAgIHN1bW1hcnlSb3dBbGxvd2VkOiB0cnVlXHJcbiAgICAgICAgICAgIH0pLmdhdXRvZml0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gZ3JpZGZvcm3DoXR1IGdyaWR1Ki9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdCB7XHJcbiAgICAgICAgICAgIGxldCBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkdCYW5rb3ZuaVZ5cGlzUG9sb3prYVZ5aGxlZGF2YW5pRHRvPigpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdCYW5rb3ZuaVZ5cGlzUG9sb3prYVZ5aGxlZGF2YW5pRHRvTmFtZXMuc19wb2xfemtyLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDc1MlwiLCAvL1JDIDMzNjAwNzUyIDogUyBcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwNzUzXCIsIC8vUkMgMzM2MDA3NTMgOiBTdGF2IHBvbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMyLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGEpID0+IHsgcmV0dXJuIGRhdGEuc19wb2xfemtyID8/IFwiXCI7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcFRlbXBsYXRlOiAoZGF0YSkgPT4geyByZXR1cm4gZGF0YS5zX3BvbF90eHQgPz8gXCJcIjsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRCYW5rb3ZuaVVjZXRWbGFzdG5pKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Jhbmtvdm5pVnlwaXNQb2xvemthVnlobGVkYXZhbmlEdG9OYW1lcy51Y2V0X3ZsLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBJbnRlcmZhY2UuR0Jhbmtvdm5pVnlwaXNQb2xvemthVnlobGVkYXZhbmlEdG9OYW1lcy51Y2V0X3ZsLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HQmFua292bmlWeXBpc1BvbG96a2FWeWhsZWRhdmFuaUR0b05hbWVzLmNpc19waWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNzU0XCIsIC8vUkMgMzM2MDA3NTQgOiDEjC52LlxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDA3NTVcIiwgLy9SQyAzMzYwMDc1NSA6IMSMw61zbG8gdsO9cGlzdVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJwcFV1cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0LmFkZFV1cygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRCYW5rb3ZuaVVjZXRDaXppKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Jhbmtvdm5pVnlwaXNQb2xvemthVnlobGVkYXZhbmlEdG9OYW1lcy51Y2V0X2NpLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBJbnRlcmZhY2UuR0Jhbmtvdm5pVnlwaXNQb2xvemthVnlobGVkYXZhbmlEdG9OYW1lcy51Y2V0X2NpLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdCYW5rb3ZuaVZ5cGlzUG9sb3prYVZ5aGxlZGF2YW5pRHRvTmFtZXMuYyxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA3NTZcIiwgLy9SQyAzMzYwMDc1NiA6IMSMw6FzdGthXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRWcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdCYW5rb3ZuaVZ5cGlzUG9sb3prYVZ5aGxlZGF2YW5pRHRvTmFtZXMudnNcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkS3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HQmFua292bmlWeXBpc1BvbG96a2FWeWhsZWRhdmFuaUR0b05hbWVzLmtzXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNzKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Jhbmtvdm5pVnlwaXNQb2xvemthVnlobGVkYXZhbmlEdG9OYW1lcy5zc1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Jhbmtvdm5pVnlwaXNQb2xvemthVnlobGVkYXZhbmlEdG9OYW1lcy5kYXRfemFwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDc1N1wiLCAvL1JDIDMzNjAwNzU3IDogRGF0dW0gemFwbGFjZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdCYW5rb3ZuaVZ5cGlzUG9sb3prYVZ5aGxlZGF2YW5pRHRvTmFtZXMuZGF0X25vdl96dXMsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNzU4XCIsIC8vUkMgMzM2MDA3NTggOiBEYXR1bSB2w71waXN1XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Jhbmtvdm5pVnlwaXNQb2xvemthVnlobGVkYXZhbmlEdG9OYW1lcy5uYXpldixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA3NTlcIiwgLy9SQyAzMzYwMDc1OSA6IE7DoXpldlxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdCYW5rb3ZuaVZ5cGlzUG9sb3prYVZ5aGxlZGF2YW5pRHRvTmFtZXMuYXJjaGl2LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDc2MFwiLCAvL1JDIDMzNjAwNzYwIDogQSBcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwNzYxXCIsIC8vUkMgMzM2MDA3NjEgOiBBcmNoaXZvdsOhbm9cclxuICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZGF0YS5hcmNoaXYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdm9pZCAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGljb246IFwiZmEtYXJjaGl2ZVwiLCB0b29sdGlwOiBcImpyZXM6MzM2MDA3NjJcIiwgdGV4dDogXCJqcmVzOjMzNjAwNzYyXCIgfTsgLy9SQyAzMzYwMDc2MiA6IEFyY2hpdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBmb3JtdWzDocWZZSBmaWx0ZXJwYW5lbHUqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyRm9ybSgpOiBHb3JkaWMuRm9ybXMuRm9ybVtdIHtcclxuICAgICAgICAgICAgbGV0IGZpbHRlckZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJqcmVzOjMzNjAwNzYzXCIgfSkgLy9SQyAzMzYwMDc2MyA6IEtvbXBsZXRuw60gZmlsdHJcclxuICAgICAgICAgICAgZmlsdGVyRm9ybS5hZGRQcmVmYWIoR29yZGljLkVrby5GaWx0ZXJzLnByZWZhYlZzS3NTcygpKVxyXG4gICAgICAgICAgICBmaWx0ZXJGb3JtLmFkZFJvdyhcImpyZXM6MzM2MDA3NjRcIikgLy9SQyAzMzYwMDc2NCA6IMOaxI1ldCBjaXrDrVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJidV9jaVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA3NjVcIikgLy9SQyAzMzYwMDc2NSA6IFNtxJtyb3bDvSBrw7NkIGNpesOtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNrX2NpXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDc2NlwiKSAvL1JDIDMzNjAwNzY2IDogw5rEjWV0IHZsYXN0bsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zdXZsKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjZXRfdmxcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5idV92bD12YWx1ZS5idV92bDttb2RlbC5za192bD12YWx1ZS5za192bDttb2RlbC5yb2s9PnZhbHVlLnJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpc3R1cEtCVTogMSwgLy/EjWlzdMSbIHDFmcOtem5haywgemRhIMWZZcWhaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJvdmVuUHJpc3R1cHVLQlU6IDEsIC8vxI1pc3TEmyBwxZnDrXpuYWssIHpkYSDFmWXFoWl0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlemltVnliZXJ1RGxlS25paHk6IDBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczozMzYwMDc2N1wiLCAvL1JDIDMzNjAwNzY3IDogxIzDoXN0a2Egb2QtZG9cclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21PcHRBbGw6ICQuZXh0ZW5kKEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7IGRlZmF1bHRWYWx1ZTogbnVsbCB9KVxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDc2OFwiKSAvL1JDIDMzNjAwNzY4IDogTsOhemV2XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2XCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDc2OVwiKSAvL1JDIDMzNjAwNzY5IDogU3RhdlxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuYnVjY3NwbygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzX3BvbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnNfcG9sPXZhbHVlLnNfcG9sXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtV2lkdGg6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRvb2x0aXBUZW1wbGF0ZTogKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5zX3BvbF90eHQgPz8gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc19wb2w6IFsxMCwgMTIsIDIwLCAyNSwgMjcsIDMwLCAzNSwgNDAsIDUwXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDc3MFwiKSAvL1JDIDMzNjAwNzcwIDogUm96cGlzXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm96X3Z5aFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsVmFsdWVUcmFuc2Zvcm06IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbHk6IGZ1bmN0aW9uIChtb2RlbFZhbHVlKSB7IHJldHVybiBtb2RlbFZhbHVlID09PSAxOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0OiBmdW5jdGlvbiAoZmllbGRWYWx1ZSkgeyByZXR1cm4gZmllbGRWYWx1ZSA9PT0gdHJ1ZSA/IDEgOiAwOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDc3MVwiKSAvL1JDIDMzNjAwNzcxIDogU3DDoXJvdmFuw6ktTmV6YcO6xI10b3ZhbsOpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3BOZXphdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsVmFsdWVUcmFuc2Zvcm06IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbHk6IGZ1bmN0aW9uIChtb2RlbFZhbHVlKSB7IHJldHVybiBtb2RlbFZhbHVlID09PSAxOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0OiBmdW5jdGlvbiAoZmllbGRWYWx1ZSkgeyByZXR1cm4gZmllbGRWYWx1ZSA9PT0gdHJ1ZSA/IDEgOiAwOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImRhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMzNjAwNzcyXCIsIC8vUkMgMzM2MDA3NzIgOiBEYXR1bSB6YXBsYWNlbsOtIG9kLWRvXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfemFwXCJcclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiZGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzM2MDA3NzNcIiwgLy9SQyAzMzYwMDc3MyA6IERhdHVtIHbDvXBpc3Ugb2QtZG9cclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9ub3ZfenVzXCJcclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA3NzRcIikgLy9SQyAzMzYwMDc3NCA6IFbFoWVjaG55IHJva3lcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2eWhfcm9reVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsVmFsdWVUcmFuc2Zvcm06IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbHk6IGZ1bmN0aW9uIChtb2RlbFZhbHVlKSB7IHJldHVybiBtb2RlbFZhbHVlID09PSAxOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0OiBmdW5jdGlvbiAoZmllbGRWYWx1ZSkgeyByZXR1cm4gZmllbGRWYWx1ZSA9PT0gdHJ1ZSA/IDEgOiAwOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcImpyZXM6MzM2MDA3NzVcIiwgLy9SQyAzMzYwMDc3NSA6IE5lbHplIGtvbWJpbm92YXQgdsO9YsSbciBzcMOhcm92YW7DvWNoLW5lemHDusSNdG92YW7DvWNoIHDFmWVzIHJva3khXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAodmFsdWUsIHNvdXJjZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEodmFsdWUgPT0gMSAmJiBzb3VyY2UuY2xvc2VzdChcIi5nZm9ybVwiKS5maW5kRmllbGRzKFwic3BOZXphdVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSA9PSAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBbZmlsdGVyRm9ybV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogWm9icmF6ZW7DrSBkZXRhaWx1IGJhbmtvdm7DrWhvIHbDvXBpc3UgYSBza29rIHDFmcOtbW8gbmEgcG9sb8W+a3UgdiBncmlkdSAqL1xyXG4gICAgICAgIHByaXZhdGUgZGV0YWlsKCkge1xyXG4gICAgICAgICAgICBsZXQgcm93ID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8SW50ZXJmYWNlLkdCYW5rb3ZuaVZ5cGlzUG9sb3prYVZ5aGxlZGF2YW5pRHRvPih0aGlzLiRncmlkKTtcclxuICAgICAgICAgICAgaWYgKCFyb3cgfHwgIXJvdy5peHApIHsgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7IH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLkJ1Y0Jhbmtvdm5pVnlwaXMucmVhZCh7IGl4cDogcm93Lml4cCB9KVxyXG4gICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YT8uaXhwX2Rlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3R3BjID0gR29yZGljLkVrby5VdGlscy5jcmVhdGVCb29rR3BjKHRoaXMuZ3BjLCBkYXRhLml4cF9kZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1wiR29yZGljLkJ1Yy5XZWJDbGllbnQuR0Jhbmtvdm5pVnlwaXNEZXRhaWxcIiwgeyB1aWQ6IFwiR0Jhbmtvdm5pVnlwaXNEZXRhaWxcIiwgZ3BjOiBuZXdHcGMgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwOiByb3cuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cERlbjogZGF0YS5peHBfZGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrX3BvbDogcm93LnJhZGVrX3BvbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJyYWRlazogcm93LnN1YnJhZGVrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrX2F2OiByb3cucmFkZWtfYXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=
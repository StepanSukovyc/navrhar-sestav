"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPrehledPredpisuPlateb.ts              </Name>
//    <Description> Okno přehledu předpisů a plateb                             </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-10-13                                                  </Created>
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
            let GPrehledPredpisuPlateb = class GPrehledPredpisuPlateb extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.celkem = 0;
                }
                onContentReady() {
                    var that = this;
                    that.taskId = "actGPrehledPredpisuPlateb";
                    //that.createActions();
                    that.createForms();
                }
                //private createActions() {
                //    const that = this;
                //    that.actions.addRange([
                //        new GAction({
                //            name: "actDetail",
                //            caption: "Detail",
                //            icon: "gi-detail",
                //            tooltip: "Zobrazení detailu případu",
                //            run: (ev, ctx) => {
                //                // gridPredpisy // gridPlatby
                //                let row = ctx.cellInfo.data;
                //                if (row) {
                //                    Common.Pripady.openPripadDetail(this, row.ixp);
                //                } 
                //            }
                //        }),
                //    ])
                //}
                createForms() {
                    const that = this;
                    var headerForm = new Gordic.Forms.Form({ name: "ddpFilter" })
                        .addRow("Bankovní účet - vlastní") // bu_vl - Bankovní účet vlastní, sk_lv - Směrový kód bankovního účtu vlastního
                        .addField("gselectbox", Gordic.Prefabs.Select.ekosuvl(), {
                        name: "ucet_vlastni",
                        model: "model.sk_vl=value.sk_vl; model.bu_vl=value.bu_vl; rok=rok; ucs=ucs; model.bu_vl_invalid=value.bu; model.sk_vl_invalid=value.bankCode",
                        serverFilters: { pristupKBU: 1, urovenPristupuKBU: 1, rezimVyberuDleKnihy: 0 },
                        strict: false, //možnost napsání jiných dat než které jsou v prefabu                         
                        invalidTransform: function (strValue) {
                            if (strValue) {
                                if (!strValue.includes("/"))
                                    strValue += "/";
                                var parts = strValue.split("/"); // rozsekani podle lomitka   
                                if (parts.length == 2) {
                                    return { bu: parts[0].trim(), bankCode: parts[1].trim() }; // vratime data ve formatu v jakem je policko zvykle
                                }
                            }
                            return strValue; // vratime puvodni hodnotu pro pripad, ze si s ni verifikace nejak poradi
                        },
                    })
                        .addRow("Bankovní účet - cizí") //  model: "model.bu_ci=value.bu; model.sk_ci=value.bankCode"
                        .addField("gselectbox", Gordic.Prefabs.Select.ekosuci(), {
                        name: "ucet_cizi",
                        model: "model.bu_ci=value.bu_ci; model.sk_ci=value.sk_ci; model.bu_ci_invalid=value.bu; model.sk_ci_invalid=value.bankCode",
                        strict: false, //možnost napsání jiných dat než které jsou v prefabu              
                        invalidTransform: function (strValue) {
                            if (strValue) {
                                if (!strValue.includes("/"))
                                    strValue += "/";
                                var parts = strValue.split("/"); // rozsekani podle lomitka
                                if (parts.length == 2) {
                                    return { bu: parts[0].trim(), bankCode: parts[1].trim() }; // vratime data ve formatu v jakem je policko zvykle
                                }
                            }
                            return strValue; // vratime puvodni hodnotu pro pripad, ze si s ni verifikace nejak poradi
                        },
                    })
                        .addRow("Datum od")
                        .addField("gdatebox", {
                        name: "dat_od",
                    })
                        .addRow("Datum do")
                        .addField("gdatebox", {
                        name: "dat_do",
                    })
                        .addRow("Způsob úhrady")
                        .addField("gselectbox", Gordic.Prefabs.Select.ekocizp(), {
                        name: "zp",
                        model: "model.zp=value.zp",
                    })
                        .addRow("Způsob platby")
                        .addField("gselectbox", Gordic.Prefabs.Select.ekoczuh(), {
                        name: "zu",
                        model: "model.zu=value.zu",
                    })
                        .addRow("Pouze aktivní případy")
                        .addField("gcheck", WebClient.Common.Prefabs.Checkbox(), {
                        name: "aktivni"
                    });
                    that.filter = $("<div>").appendTo(that.element).
                        gfilterpanel({
                        forms: [headerForm],
                        filterViewMode: FilterViewMode.Simple,
                        apply: (_event, obj) => {
                            that.ziskejDataPredpisu(obj.filter);
                            that.ziskejDataPlateb(obj.filter);
                        },
                    });
                    var alist = new GActionList({
                        actMultiAkce: {
                            name: "actDetail",
                            caption: "Zobrazit případ",
                            icon: "gi-detail",
                            //tooltip: "Zobrazení detailu případu",
                            run: (ev, ctx) => {
                                // gridPredpisy // gridPlatby
                                let row = ctx.cellInfo.data;
                                if (row && row?.ixp?.length == 12) {
                                    WebClient.Common.Pripady.openPripadDetail(that, row.ixp);
                                }
                                //ctx.selection.forEach(function (item) { item.schvaleno = true; item.datSchvaleni = new Date(); });
                                //$(ctx.grid).ggrid("refreshRows")
                            }
                        }
                    });
                    that.gridPredpisy = $("<div>").appendTo(that.element)
                        .css("height", "40%")
                        .ggrid({
                        data: [],
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit", // fit, full
                        navigationMode: "row", // row, cell
                        columns: WebClient.Common.GridFormats.PrehledPrPlPredpisy(),
                        multi: true,
                        //defaultAction: that.actions.actDetail,
                        contextMenu: function (cellContext) {
                            return alist.createBar(["actMultiAkce"]);
                            //return alist.createBar(["polozek: " + cellContext.selection.length.toString(), "actMultiAkce"]) 
                        },
                        defaultProfile: {
                            rowNumbers: true,
                        }
                    }).ggridrowscalc();
                    var statusWidget = $(".status-widget"); //najití počtového okýnka
                    //předpisy
                    $(statusWidget).before('<div class="status-widget" id="predpisy">Předpisy celkem: </div>'); //nalepení salda k počtu
                    that.saldoStatusWidgetPredpisy = $("#predpisy");
                    that.saldoStatusWidgetPredpisy.append('<b class="g-state-text g-state-active">0</b>');
                    that.gridPlatby = $("<div>").appendTo(that.element) //autofit nelze kvůli celkem políček
                        .css("height", "100%")
                        .gautofit()
                        .ggrid({
                        data: [],
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit", // fit, full
                        navigationMode: "row", // row, cell                
                        rowNumbers: false,
                        columns: WebClient.Common.GridFormats.PrehledPrPlPlatby(),
                        multi: true,
                        //defaultAction: that.actions.actDetail,
                        contextMenu: function (cellContext) {
                            return alist.createBar(["polozek: " + cellContext.selection.length.toString(), "actMultiAkce"]);
                        },
                        defaultProfile: {
                            rowNumbers: true,
                        }
                    }).ggridrowscalc();
                    //najití počtového okýnka druhého girddu
                    var grid = that.gridPlatby;
                    var classes = grid[0].classList;
                    var grid_class = classes[5];
                    //platby
                    var statusWidget = $("." + grid_class + " .status-widget");
                    $(statusWidget).before('<div class="status-widget" id="platby">Platby celkem: </div>'); //nalepení salda k počtu
                    that.saldoStatusWidgetPlatby = $("#platby");
                    that.saldoStatusWidgetPlatby.append('<b class="g-state-text g-state-active">0</b>');
                }
                //naplnění gridu předpisu
                ziskejDataPredpisu(filter) {
                    var that = this;
                    that.beginOperation({ id: "loadPredpisy", text: "Načítání dat (Předpisy)" });
                    that.isl.DdpPrehledPredpisu.list(() => {
                        return {
                            filters: filter
                        };
                    }).get().done(function (dto) {
                        if (dto != null) {
                            that.view = new Gordic.Data.View(dto.data);
                            that.loadModel(filter);
                            that.getCelkovouCastku(dto.data, that.saldoStatusWidgetPredpisy);
                            that.gridPredpisy.ggrid("setData", that.view);
                        }
                        else {
                            that.view = null;
                            that.getCelkovouCastku(dto, that.saldoStatusWidgetPredpisy);
                            that.gridPredpisy.ggrid("setData", that.view);
                        }
                        that.endOperation({ id: "loadPredpisy" });
                    });
                }
                //naplnění gridu plateb
                ziskejDataPlateb(filter) {
                    var that = this;
                    that.beginOperation({ id: "loadPlatby", text: "Načítání dat (Platby)" });
                    that.isl.DdpPrehledPlateb.list(rq => {
                        return {
                            filters: filter
                        };
                    }).get().done(function (dto) {
                        if (dto != null) {
                            that.view = new Gordic.Data.View(dto.data);
                            that.loadModel(filter);
                            that.getCelkovouCastku(dto.data, that.saldoStatusWidgetPlatby);
                            that.gridPlatby.ggrid("setData", that.view);
                        }
                        else {
                            that.view = null;
                            that.getCelkovouCastku(dto, that.saldoStatusWidgetPlatby);
                            that.gridPlatby.ggrid("setData", that.view);
                        }
                        that.endOperation({ id: "loadPlatby" });
                    });
                }
                //Když se načetly data do griddu, a byly na vstupu nevalidní data účtů, vyčistili se políčka
                loadModel(filter) {
                    var that = this;
                    var bcinv = filter.bu_ci_invalid;
                    var bcv = filter.bu_ci;
                    var scinv = filter.sk_ci_invalid;
                    var scv = filter.sk_ci;
                    if (bcinv != null)
                        that.filter.findFields("ucet_cizi").gfield("setValue", { bu_ci: bcinv, sk_ci: scinv });
                    else
                        that.filter.findFields("ucet_cizi").gfield("setValue", { bu_ci: bcv, sk_ci: scv });
                    var bvinv = filter.bu_vl_invalid;
                    var bvv = filter.bu_vl;
                    var svinv = filter.sk_vl_invalid;
                    var svv = filter.sk_vl;
                    if (bvinv != null)
                        that.filter.findFields("ucet_vlastni").gfield("setValue", { bu_vl: bvinv, sk_vl: svinv });
                    else
                        that.filter.findFields("ucet_vlastni").gfield("setValue", { bu_vl: bvv, sk_vl: svv });
                }
                formatNumberWithSpacesAndDecimals(number) {
                    const formattedNumber = new Intl.NumberFormat('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }).format(number);
                    return formattedNumber.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ').replace('.', ',');
                }
                //vypočet celkové částky dat v gridu
                getCelkovouCastku(data, saldoStatusWidget) {
                    var that = this;
                    that.celkem = 0;
                    if (data != null) {
                        data.forEach(function (value) {
                            that.celkem = that.celkem + parseFloat(value.c);
                        });
                        var saldo = that.formatNumberWithSpacesAndDecimals(that.celkem);
                        saldoStatusWidget.find('b.g-state-text.g-state-active').text(saldo);
                    }
                    else {
                        saldoStatusWidget.find('b.g-state-text.g-state-active').text(0);
                    }
                }
            };
            GPrehledPredpisuPlateb = __decorate([
                Decorators.gcontent
            ], GPrehledPredpisuPlateb);
            WebClient.GPrehledPredpisuPlateb = GPrehledPredpisuPlateb;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByZWhsZWRQcmVkcGlzdVBsYXRlYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQcmVobGVkUHJlZHBpc3VQbGF0ZWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0FzU2Y7QUF0U0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBc1NuQjtJQXRTZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBc1M3QjtRQXRTb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXVCLFNBQVEsT0FBQSxZQUFZO2dCQUF4RDs7b0JBWVcsV0FBTSxHQUFHLENBQUMsQ0FBQztnQkFzUnRCLENBQUM7Z0JBbFJHLGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLDJCQUEyQixDQUFDO29CQUMxQyx1QkFBdUI7b0JBQ3ZCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDdkIsQ0FBQztnQkFFRCwyQkFBMkI7Z0JBQzNCLHdCQUF3QjtnQkFDeEIsNkJBQTZCO2dCQUM3Qix1QkFBdUI7Z0JBQ3ZCLGdDQUFnQztnQkFDaEMsZ0NBQWdDO2dCQUNoQyxnQ0FBZ0M7Z0JBQ2hDLG1EQUFtRDtnQkFDbkQsaUNBQWlDO2dCQUNqQywrQ0FBK0M7Z0JBQy9DLDhDQUE4QztnQkFDOUMsNEJBQTRCO2dCQUM1QixxRUFBcUU7Z0JBQ3JFLG9CQUFvQjtnQkFDcEIsZUFBZTtnQkFDZixhQUFhO2dCQUNiLFFBQVE7Z0JBQ1IsR0FBRztnQkFDSyxXQUFXO29CQUNmLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FB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LENBQUMsQ0FBQyxDQUFDO3dCQUNwRCxDQUFDLENBQUMsQ0FBQzt3QkFDSCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsaUNBQWlDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUNoRSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3hFLENBQUM7eUJBQUssQ0FBQzt3QkFDSCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BFLENBQUM7Z0JBQ0wsQ0FBQzthQUNKLENBQUE7WUFsU1ksc0JBQXNCO2dCQURsQyxVQUFVLENBQUMsUUFBUTtlQUNQLHNCQUFzQixDQWtTbEM7WUFsU1ksZ0NBQXNCLHlCQWtTbEMsQ0FBQTtRQUNMLENBQUMsRUF0U29CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXNTN0I7SUFBRCxDQUFDLEVBdFNnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFzU25CO0FBQUQsQ0FBQyxFQXRTUyxNQUFNLEtBQU4sTUFBTSxRQXNTZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HUHJlaGxlZFByZWRwaXN1UGxhdGViLnRzICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gT2tubyBwxZllaGxlZHUgcMWZZWRwaXPFryBhIHBsYXRlYiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICB2Y2VjaCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjMgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyMy0xMC0xMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQcmVobGVkUHJlZHBpc3VQbGF0ZWIgZXh0ZW5kcyBHQ29udGVudEJhc2UgeyAgICAgXHJcblxyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHB1YmxpYyBncmlkUHJlZHBpc3k6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHVibGljIGdyaWRQbGF0Ynk6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHVibGljIGZvcm1QcmVkcGlzeTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwdWJsaWMgZm9ybVBsYXRieTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwdWJsaWMgdmlldzogYW55O1xyXG4gICAgICAgIEl4cDogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBUZXh0IHZyw6FjZW7DvSBwbyBpbml0dSBLbmloeSBhIHBvaGxlZMOhdmt5ICovXHJcbiAgICAgICAgSW5pdEVycm9yVGV4dDogc3RyaW5nIHwgbnVsbDtcclxuXHJcbiAgICAgICAgcHVibGljIGNlbGtlbSA9IDA7XHJcbiAgICAgICAgcHJpdmF0ZSBzYWxkb1N0YXR1c1dpZGdldFByZWRwaXN5OiBhbnk7XHJcbiAgICAgICAgcHJpdmF0ZSBzYWxkb1N0YXR1c1dpZGdldFBsYXRieTogYW55O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnRhc2tJZCA9IFwiYWN0R1ByZWhsZWRQcmVkcGlzdVBsYXRlYlwiOyAgICAgICAgICBcclxuICAgICAgICAgICAgLy90aGF0LmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVGb3JtcygpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9wcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgLy8gICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgLy8gICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAvLyAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbmFtZTogXCJhY3REZXRhaWxcIixcclxuICAgICAgICAvLyAgICAgICAgICAgIGNhcHRpb246IFwiRGV0YWlsXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgdG9vbHRpcDogXCJab2JyYXplbsOtIGRldGFpbHUgcMWZw61wYWR1XCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy8gZ3JpZFByZWRwaXN5IC8vIGdyaWRQbGF0YnlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBsZXQgcm93ID0gY3R4LmNlbGxJbmZvLmRhdGE7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKHJvdykge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBDb21tb24uUHJpcGFkeS5vcGVuUHJpcGFkRGV0YWlsKHRoaXMsIHJvdy5peHApO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgIH0pLFxyXG4gICAgICAgIC8vICAgIF0pXHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtcygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBoZWFkZXJGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJkZHBGaWx0ZXJcIiB9KSAgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiQmFua292bsOtIMO6xI1ldCAtIHZsYXN0bsOtXCIpLy8gYnVfdmwgLSBCYW5rb3Zuw60gw7rEjWV0IHZsYXN0bsOtLCBza19sdiAtIFNtxJtyb3bDvSBrw7NkIGJhbmtvdm7DrWhvIMO6xI10dSB2bGFzdG7DrWhvXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zdXZsKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjZXRfdmxhc3RuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnNrX3ZsPXZhbHVlLnNrX3ZsOyBtb2RlbC5idV92bD12YWx1ZS5idV92bDsgcm9rPXJvazsgdWNzPXVjczsgbW9kZWwuYnVfdmxfaW52YWxpZD12YWx1ZS5idTsgbW9kZWwuc2tfdmxfaW52YWxpZD12YWx1ZS5iYW5rQ29kZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHsgcHJpc3R1cEtCVTogMSwgdXJvdmVuUHJpc3R1cHVLQlU6IDEsIHJlemltVnliZXJ1RGxlS25paHk6IDAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdHJpY3Q6IGZhbHNlLCAvL21vxb5ub3N0IG5hcHPDoW7DrSBqaW7DvWNoIGRhdCBuZcW+IGt0ZXLDqSBqc291IHYgcHJlZmFidSAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpbnZhbGlkVHJhbnNmb3JtOiBmdW5jdGlvbiAoc3RyVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0clZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN0clZhbHVlLmluY2x1ZGVzKFwiL1wiKSkgc3RyVmFsdWUgKz0gXCIvXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJ0cyA9IHN0clZhbHVlLnNwbGl0KFwiL1wiKTsgLy8gcm96c2VrYW5pIHBvZGxlIGxvbWl0a2EgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgYnU6IHBhcnRzWzBdLnRyaW0oKSwgYmFua0NvZGU6IHBhcnRzWzFdLnRyaW0oKSB9OyAvLyB2cmF0aW1lIGRhdGEgdmUgZm9ybWF0dSB2IGpha2VtIGplIHBvbGlja28genZ5a2xlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0clZhbHVlOyAvLyB2cmF0aW1lIHB1dm9kbmkgaG9kbm90dSBwcm8gcHJpcGFkLCB6ZSBzaSBzIG5pIHZlcmlmaWthY2UgbmVqYWsgcG9yYWRpXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgXHJcbiAgICAgICAgICAgICAgICB9KSAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkJhbmtvdm7DrSDDusSNZXQgLSBjaXrDrVwiKSAvLyAgbW9kZWw6IFwibW9kZWwuYnVfY2k9dmFsdWUuYnU7IG1vZGVsLnNrX2NpPXZhbHVlLmJhbmtDb2RlXCJcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3N1Y2koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWNldF9jaXppXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuYnVfY2k9dmFsdWUuYnVfY2k7IG1vZGVsLnNrX2NpPXZhbHVlLnNrX2NpOyBtb2RlbC5idV9jaV9pbnZhbGlkPXZhbHVlLmJ1OyBtb2RlbC5za19jaV9pbnZhbGlkPXZhbHVlLmJhbmtDb2RlXCIsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmljdDogZmFsc2UsIC8vbW/Fvm5vc3QgbmFwc8OhbsOtIGppbsO9Y2ggZGF0IG5lxb4ga3RlcsOpIGpzb3UgdiBwcmVmYWJ1ICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpbnZhbGlkVHJhbnNmb3JtOiBmdW5jdGlvbiAoc3RyVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0clZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN0clZhbHVlLmluY2x1ZGVzKFwiL1wiKSkgc3RyVmFsdWUgKz0gXCIvXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJ0cyA9IHN0clZhbHVlLnNwbGl0KFwiL1wiKTsgLy8gcm96c2VrYW5pIHBvZGxlIGxvbWl0a2FcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFydHMubGVuZ3RoID09IDIpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBidTogcGFydHNbMF0udHJpbSgpLCBiYW5rQ29kZTogcGFydHNbMV0udHJpbSgpIH07IC8vIHZyYXRpbWUgZGF0YSB2ZSBmb3JtYXR1IHYgamFrZW0gamUgcG9saWNrbyB6dnlrbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyVmFsdWU7IC8vIHZyYXRpbWUgcHV2b2RuaSBob2Rub3R1IHBybyBwcmlwYWQsIHplIHNpIHMgbmkgdmVyaWZpa2FjZSBuZWphayBwb3JhZGlcclxuICAgICAgICAgICAgICAgICAgICB9LCAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBvZFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X29kXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIGRvXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfZG9cIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlpwxa9zb2Igw7pocmFkeVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvY2l6cCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnpwPXZhbHVlLnpwXCIsICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlpwxa9zb2IgcGxhdGJ5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29jenVoKCksIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6dVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnp1PXZhbHVlLnp1XCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3V6ZSBha3Rpdm7DrSBwxZnDrXBhZHlcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBDb21tb24uUHJlZmFicy5DaGVja2JveCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJha3Rpdm5pXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuZmlsdGVyID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoYXQuZWxlbWVudCkuXHJcbiAgICAgICAgICAgICAgICBnZmlsdGVycGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1zOiBbaGVhZGVyRm9ybV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVmlld01vZGU6IEZpbHRlclZpZXdNb2RlLlNpbXBsZSxcclxuICAgICAgICAgICAgICAgICAgICBhcHBseTogKF9ldmVudCwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuemlza2VqRGF0YVByZWRwaXN1KG9iai5maWx0ZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuemlza2VqRGF0YVBsYXRlYihvYmouZmlsdGVyKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB2YXIgYWxpc3QgPSBuZXcgR0FjdGlvbkxpc3Qoe1xyXG4gICAgICAgICAgICAgICAgYWN0TXVsdGlBa2NlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3REZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpvYnJheml0IHDFmcOtcGFkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3Rvb2x0aXA6IFwiWm9icmF6ZW7DrSBkZXRhaWx1IHDFmcOtcGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ3JpZFByZWRwaXN5IC8vIGdyaWRQbGF0YnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IGN0eC5jZWxsSW5mby5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ICYmIHJvdz8uaXhwPy5sZW5ndGggPT0gMTIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbW1vbi5QcmlwYWR5Lm9wZW5QcmlwYWREZXRhaWwodGhhdCwgcm93Lml4cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jdHguc2VsZWN0aW9uLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgaXRlbS5zY2h2YWxlbm8gPSB0cnVlOyBpdGVtLmRhdFNjaHZhbGVuaSA9IG5ldyBEYXRlKCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyQoY3R4LmdyaWQpLmdncmlkKFwicmVmcmVzaFJvd3NcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5ncmlkUHJlZHBpc3kgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjQwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJNb2RlOiBcImF1dG9cIiwgICAgIC8vIGF1dG8sIGFsbC1hdC1vbmNlLCBwYWdlZC1zeW5jLCBwYWdlZC1hc3luY1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsICAgICAgLy8gZml0LCBmdWxsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsICAvLyByb3csIGNlbGxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuUHJlaGxlZFByUGxQcmVkcGlzeSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdERldGFpbCxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0TWVudTogZnVuY3Rpb24gKGNlbGxDb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhbGlzdC5jcmVhdGVCYXIoW1wiYWN0TXVsdGlBa2NlXCJdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBhbGlzdC5jcmVhdGVCYXIoW1wicG9sb3plazogXCIgKyBjZWxsQ29udGV4dC5zZWxlY3Rpb24ubGVuZ3RoLnRvU3RyaW5nKCksIFwiYWN0TXVsdGlBa2NlXCJdKSBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuZ2dyaWRyb3dzY2FsYygpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHN0YXR1c1dpZGdldCA9ICQoXCIuc3RhdHVzLXdpZGdldFwiKTsgLy9uYWppdMOtIHBvxI10b3bDqWhvIG9rw71ua2FcclxuICAgICAgICAgICAgLy9wxZllZHBpc3lcclxuICAgICAgICAgICAgJChzdGF0dXNXaWRnZXQpLmJlZm9yZSgnPGRpdiBjbGFzcz1cInN0YXR1cy13aWRnZXRcIiBpZD1cInByZWRwaXN5XCI+UMWZZWRwaXN5IGNlbGtlbTogPC9kaXY+Jyk7IC8vbmFsZXBlbsOtIHNhbGRhIGsgcG/EjXR1XHJcbiAgICAgICAgICAgIHRoYXQuc2FsZG9TdGF0dXNXaWRnZXRQcmVkcGlzeSA9ICQoXCIjcHJlZHBpc3lcIilcclxuICAgICAgICAgICAgdGhhdC5zYWxkb1N0YXR1c1dpZGdldFByZWRwaXN5LmFwcGVuZCgnPGIgY2xhc3M9XCJnLXN0YXRlLXRleHQgZy1zdGF0ZS1hY3RpdmVcIj4wPC9iPicpXHJcblxyXG4gICAgICAgICAgICB0aGF0LmdyaWRQbGF0YnkgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhhdC5lbGVtZW50KS8vYXV0b2ZpdCBuZWx6ZSBrdsWvbGkgY2Vsa2VtIHBvbMOtxI1la1xyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtdLCAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck1vZGU6IFwiYXV0b1wiLCAgICAgLy8gYXV0bywgYWxsLWF0LW9uY2UsIHBhZ2VkLXN5bmMsIHBhZ2VkLWFzeW5jXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmaXRcIiwgICAgICAvLyBmaXQsIGZ1bGxcclxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kZTogXCJyb3dcIiwgIC8vIHJvdywgY2VsbCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuUHJlaGxlZFByUGxQbGF0YnkoKSxcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2RlZmF1bHRBY3Rpb246IHRoYXQuYWN0aW9ucy5hY3REZXRhaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dE1lbnU6IGZ1bmN0aW9uIChjZWxsQ29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWxpc3QuY3JlYXRlQmFyKFtcInBvbG96ZWs6IFwiICsgY2VsbENvbnRleHQuc2VsZWN0aW9uLmxlbmd0aC50b1N0cmluZygpLCBcImFjdE11bHRpQWtjZVwiXSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuZ2dyaWRyb3dzY2FsYygpO1xyXG5cclxuICAgICAgICAgICAgLy9uYWppdMOtIHBvxI10b3bDqWhvIG9rw71ua2EgZHJ1aMOpaG8gZ2lyZGR1XHJcbiAgICAgICAgICAgIHZhciBncmlkID0gdGhhdC5ncmlkUGxhdGJ5OyBcclxuICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSBncmlkWzBdLmNsYXNzTGlzdDtcclxuICAgICAgICAgICAgdmFyIGdyaWRfY2xhc3MgPSBjbGFzc2VzWzVdO1xyXG4gICAgICAgICAgICAvL3BsYXRieVxyXG4gICAgICAgICAgICB2YXIgc3RhdHVzV2lkZ2V0ID0gJChcIi5cIiArIGdyaWRfY2xhc3MgKyBcIiAuc3RhdHVzLXdpZGdldFwiKTsgXHJcbiAgICAgICAgICAgICQoc3RhdHVzV2lkZ2V0KS5iZWZvcmUoJzxkaXYgY2xhc3M9XCJzdGF0dXMtd2lkZ2V0XCIgaWQ9XCJwbGF0YnlcIj5QbGF0YnkgY2Vsa2VtOiA8L2Rpdj4nKTsgLy9uYWxlcGVuw60gc2FsZGEgayBwb8SNdHVcclxuICAgICAgICAgICAgdGhhdC5zYWxkb1N0YXR1c1dpZGdldFBsYXRieSA9ICQoXCIjcGxhdGJ5XCIpO1xyXG4gICAgICAgICAgICB0aGF0LnNhbGRvU3RhdHVzV2lkZ2V0UGxhdGJ5LmFwcGVuZCgnPGIgY2xhc3M9XCJnLXN0YXRlLXRleHQgZy1zdGF0ZS1hY3RpdmVcIj4wPC9iPicpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvL25hcGxuxJtuw60gZ3JpZHUgcMWZZWRwaXN1XHJcbiAgICAgICAgcHJpdmF0ZSB6aXNrZWpEYXRhUHJlZHBpc3UoZmlsdGVyOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwibG9hZFByZWRwaXN5XCIsIHRleHQ6IFwiTmHEjcOtdMOhbsOtIGRhdCAoUMWZZWRwaXN5KVwiIH0pO1xyXG4gICAgICAgICAgICB0aGF0LmlzbC5EZHBQcmVobGVkUHJlZHBpc3UubGlzdFxyXG4gICAgICAgICAgICAgICAgKFxyXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IGZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApLmdldCgpLmRvbmUoZnVuY3Rpb24gKGR0bykgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZHRvICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZHRvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRNb2RlbChmaWx0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdldENlbGtvdm91Q2FzdGt1KGR0by5kYXRhLCB0aGF0LnNhbGRvU3RhdHVzV2lkZ2V0UHJlZHBpc3kpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWRQcmVkcGlzeS5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdldENlbGtvdm91Q2FzdGt1KGR0bywgdGhhdC5zYWxkb1N0YXR1c1dpZGdldFByZWRwaXN5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkUHJlZHBpc3kuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwibG9hZFByZWRwaXN5XCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSAgXHJcblxyXG4gICAgICAgIC8vbmFwbG7Em27DrSBncmlkdSBwbGF0ZWJcclxuICAgICAgICBwcml2YXRlIHppc2tlakRhdGFQbGF0ZWIoZmlsdGVyOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzOyAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwibG9hZFBsYXRieVwiLCB0ZXh0OiBcIk5hxI3DrXTDoW7DrSBkYXQgKFBsYXRieSlcIiB9KTtcclxuICAgICAgICAgICAgdGhhdC5pc2wuRGRwUHJlaGxlZFBsYXRlYi5saXN0XHJcbiAgICAgICAgICAgICAgICAoXHJcbiAgICAgICAgICAgICAgICAgICAgcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogZmlsdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkuZ2V0KCkuZG9uZShmdW5jdGlvbiAoZHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGR0byAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGR0by5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkTW9kZWwoZmlsdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5nZXRDZWxrb3ZvdUNhc3RrdShkdG8uZGF0YSwgdGhhdC5zYWxkb1N0YXR1c1dpZGdldFBsYXRieSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZFBsYXRieS5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlldyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ2V0Q2Vsa292b3VDYXN0a3UoZHRvLCB0aGF0LnNhbGRvU3RhdHVzV2lkZ2V0UGxhdGJ5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkUGxhdGJ5LmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gICBcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcImxvYWRQbGF0YnlcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9ICBcclxuXHJcbiAgICAgICAgLy9LZHnFviBzZSBuYcSNZXRseSBkYXRhIGRvIGdyaWRkdSwgYSBieWx5IG5hIHZzdHVwdSBuZXZhbGlkbsOtIGRhdGEgw7rEjXTFrywgdnnEjWlzdGlsaSBzZSBwb2zDrcSNa2FcclxuICAgICAgICBwcml2YXRlIGxvYWRNb2RlbChmaWx0ZXI6IGFueSl7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpczsgXHJcblxyXG4gICAgICAgICAgICB2YXIgYmNpbnYgPSBmaWx0ZXIuYnVfY2lfaW52YWxpZDtcclxuICAgICAgICAgICAgdmFyIGJjdiA9IGZpbHRlci5idV9jaTtcclxuICAgICAgICAgICAgdmFyIHNjaW52ID0gZmlsdGVyLnNrX2NpX2ludmFsaWQ7XHJcbiAgICAgICAgICAgIHZhciBzY3YgPSBmaWx0ZXIuc2tfY2k7XHJcblxyXG4gICAgICAgICAgICBpZiAoYmNpbnYgIT0gbnVsbCkgdGhhdC5maWx0ZXIuZmluZEZpZWxkcyhcInVjZXRfY2l6aVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IGJ1X2NpOiBiY2ludiwgc2tfY2k6IHNjaW52IH0pO1xyXG4gICAgICAgICAgICBlbHNlIHRoYXQuZmlsdGVyLmZpbmRGaWVsZHMoXCJ1Y2V0X2NpemlcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBidV9jaTogYmN2LCBza19jaTogc2N2IH0pXHJcblxyXG4gICAgICAgICAgICB2YXIgYnZpbnYgPSBmaWx0ZXIuYnVfdmxfaW52YWxpZDtcclxuICAgICAgICAgICAgdmFyIGJ2diA9IGZpbHRlci5idV92bDtcclxuICAgICAgICAgICAgdmFyIHN2aW52ID0gZmlsdGVyLnNrX3ZsX2ludmFsaWQ7XHJcbiAgICAgICAgICAgIHZhciBzdnYgPSBmaWx0ZXIuc2tfdmw7XHJcblxyXG4gICAgICAgICAgICBpZiAoYnZpbnYgIT0gbnVsbCkgdGhhdC5maWx0ZXIuZmluZEZpZWxkcyhcInVjZXRfdmxhc3RuaVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IGJ1X3ZsOiBidmludiwgc2tfdmw6IHN2aW52IH0pO1xyXG4gICAgICAgICAgICBlbHNlIHRoYXQuZmlsdGVyLmZpbmRGaWVsZHMoXCJ1Y2V0X3ZsYXN0bmlcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBidV92bDogYnZ2LCBza192bDogc3Z2IH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGZvcm1hdE51bWJlcldpdGhTcGFjZXNBbmREZWNpbWFscyhudW1iZXI6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZE51bWJlciA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tVVMnLCB7XHJcbiAgICAgICAgICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICAgICAgICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICAgICAgICAgIH0pLmZvcm1hdChudW1iZXIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdHRlZE51bWJlci5yZXBsYWNlKC8sL2csICcnKS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCAnICcpLnJlcGxhY2UoJy4nLCAnLCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy92eXBvxI1ldCBjZWxrb3bDqSDEjcOhc3RreSBkYXQgdiBncmlkdVxyXG4gICAgICAgIHByaXZhdGUgZ2V0Q2Vsa292b3VDYXN0a3UoZGF0YSwgc2FsZG9TdGF0dXNXaWRnZXQpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzOyAgICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC5jZWxrZW0gPSAwO1xyXG4gICAgICAgICAgICBpZiAoZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jZWxrZW0gPSB0aGF0LmNlbGtlbSArIHBhcnNlRmxvYXQodmFsdWUuYyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHZhciBzYWxkbyA9IHRoYXQuZm9ybWF0TnVtYmVyV2l0aFNwYWNlc0FuZERlY2ltYWxzKHRoYXQuY2Vsa2VtKTtcclxuICAgICAgICAgICAgICAgIHNhbGRvU3RhdHVzV2lkZ2V0LmZpbmQoJ2IuZy1zdGF0ZS10ZXh0Lmctc3RhdGUtYWN0aXZlJykudGV4dChzYWxkbyk7XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIHNhbGRvU3RhdHVzV2lkZ2V0LmZpbmQoJ2IuZy1zdGF0ZS10ZXh0Lmctc3RhdGUtYWN0aXZlJykudGV4dCgwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
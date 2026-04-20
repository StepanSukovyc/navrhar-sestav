"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ucr.WebClient.GExportDatSeznamUcr.js                                                        </Name>
//    <Description> GExportDatSeznam                                                                                  </Description>
//    <Author>      Jiří Ileček                                                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2016                                                                </Copyright>
//    <Created>     2016-03-03                                                                                      </Created>
//  </FileHeader>
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GExportDatSeznamUcr = class GExportDatSeznamUcr extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Odeslané výkazy";
                    this.init = true;
                    this.globals = Gordic.Ucr.Globals.GUcrGlobals;
                    //detail_davky() {
                    //    var that = this;
                    //    //var detailwindow = this.navigate("Gordic.Inu.WebClient.GImportDatDetail", {
                    //    //    Davka: this.akt_davka,
                    //    //});
                    //    //var windowContent = $.content(detailwindow);
                    //    //windowContent.on("inu_importdetailsave", function (ctx) {
                    //    //    //debugger;
                    //    //    that.view_ISL.updateData(ctx.data, "update");
                    //    //})
                    //}
                    //generateReport(rep) {
                    //    var cnt = this;
                    //    var vstup: Gordic.Uct.Interface.GUcrsexpDto = {};
                    //    vstup = cnt.akt_davka;
                    //    rep.customDto = vstup;
                    //}
                }
                onContentReady() {
                    var that = this;
                    that.title = "Odeslané výkazy";
                    //nastavení breadcrumbs
                    this.setBreadcrumbs([
                        {
                            caption: that.title,
                            defaultAction: true
                        }
                    ]);
                    //this.actions.addRange({
                    //    actDetail: {
                    //        caption: "Detail", //icon: "gi-plus",
                    //        run: () => {
                    //             return that.detail_davky();
                    //        }
                    //    }
                    //});
                    //this.actions.add(GAction.createPrintAction({
                    //    name: "actTisk",
                    //    tema: "inu_ptm_inuimpo",
                    //    caption: "Tisk",
                    //    tooltip: "Tisk",
                    //    parentContent: that,
                    //    serverParameterMethod: "Gordic.Inu.WebClient.GImportDatDetail:ConvertReportParams",
                    //    reportStarting: (rep) => {
                    //        return this.generateReport(rep);
                    //    }
                    //}));
                    // akce na klik na ikonku
                    const linkAct = new GAction({
                        name: "obr",
                        icon: "gi-eattachment",
                        run: (ev, data) => {
                            var that = this;
                            if ((data.datarow.priloha) && (data.datarow.priloha !== "")) { // pokud existuje vybraný záznam
                                var gc = new GContent(["Gordic.Ucr.WebClient.GExportDatSeznamUcr", { parentContent: that }]); //dotažení řádku ze serveru
                                that.beginOperation("Probíhá stažení souboru");
                                gc.call("GetFileZUloziste", { Ixb: data.datarow.priloha })
                                    .then(function (r) {
                                    if (r) {
                                        return GBrowserExtras.documentSaveOpenLocal(r.Name, r.Bytes);
                                    }
                                    return "";
                                })
                                    .fail(function (err) { Gordic.Gui.WebApp.Utils.showReasonFlash(gc, err); })
                                    .always(function () {
                                    gc.close();
                                    that.endOperation();
                                });
                            }
                        }
                    });
                    const linkActNo = new GAction({
                        name: "obr",
                        icon: "fa-fw",
                        run: (ev, data) => {
                            var that = this;
                        }
                    });
                    //nastavení menuBaru
                    //            this.menuBar(this.actions.createBar(["actDetail*", "actTisk*"]));
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", {
                        layoutDescriptor: "L1M1S1 LMS-0-12-0",
                    }).gformsection("create");
                    var $mainTable = $("<div class='js-SeznamDavek'>").appendTo(this.element)
                        .gautofit() //místo nastavení výšky se používá gautofit
                        .ggrid({
                        columnMode: "full",
                        searchColumns: ["popis"],
                        // defaultAction: that.actions.actDetail,
                        sort: "!dat_zmena_nact",
                        selection: function (ev, o) {
                            var cnt = this;
                            var l_ixs_dvk = "";
                            var vybraneRadky = o.getSelection(); //cnt.find(".js-SeznamDokladu").ggrid("getSelection");                        // načtení přes vyhledání gridu (přes class)
                            if (vybraneRadky.length === 1) { // pokud existuje vybraný záznam
                                console.log("nahled ixs_msk", vybraneRadky[0].ixs_msk);
                                that.akt_davka = vybraneRadky[0];
                                // docasne zakazano
                                if ((that.akt_davka.ixs_exp) && (that.akt_davka.ixs_exp !== "")) {
                                    //that.actions.actDetail!.enabled(true);
                                    //that.actions.actTisk!.enabled(true);
                                }
                            }
                        },
                        defaultProfile: {
                            columnList: "popis, rok, mesic, exp_typ, exp_format, soubor, priloha, obraz, mail, dat_zmena_exp, zmenu_prov_exp_txt"
                        },
                        columns: new Gordic.Data.GridFormat()
                            //.addTextColumn({ name: "ixs_exp", caption: "ID exportu", width: 120, fragment: "main" })
                            .addTextColumn({ name: "popis", caption: "Výkaz", width: 110, fragment: "main" })
                            .addNumberColumn({ name: "rok", caption: "Rok", width: 80, fragment: "main" })
                            .addNumberColumn({ name: "mesic", caption: "Měsíc", width: 60, fragment: "main" })
                            //.addTextColumn({ name: "exp_typ", caption: "AG", width: 60, fragment: "main" })
                            //.addTextColumn({ name: "exp_format", caption: " F", width: 60, fragment: "main" })
                            .addTextColumn({ name: "soubor", caption: "Soubor", width: 300, fragment: "main" })
                            //.addTextColumn({ name: "priloha", caption: "Příloha", width: 200 })
                            .addLinksColumn({
                            name: "obraz",
                            caption: " ",
                            tooltipTemplate: "Stažení souboru",
                            customClass: "dt-center",
                            width: 40,
                            links: (d) => {
                                if (d.priloha == "") {
                                    return [{ action: linkActNo }];
                                }
                                else {
                                    return [{ action: linkAct }];
                                }
                            }
                        })
                            //                        .addIconColumn({
                            //                            name: "priloha_ico",
                            //                            field: "priloha_ico",
                            //                            caption: "Příloha",
                            //                            fragment: "main",
                            //                            width: 25,
                            //                            formatPreset: Gordic.Global.Enums.GridColumnFormatIcon.icon,
                            //                            iconTemplate: function (data) {
                            //                                switch (data.priloha) {
                            //                                    case "": return { icon: "fa-fw", text: "", caption: "", tooltip: "" };
                            //                                    default: return { icon: "gi-eattachment", text: "Exportovaný soubor", caption: "Exportovaný soubor", tooltip: "Exportovaný soubor" };
                            //                                }
                            //                            }
                            //                        })
                            //                        .addTextColumn({ name: "zkratka", caption: "Zkratka", width: 100, fragment: "main" })
                            .addTextColumn({ name: "mail", caption: "Odesláno na mail", width: 180, fragment: "main" })
                            .addDateTimeColumn({ name: "dat_zmena_exp", caption: "Odesláno", width: 150, fragment: "main" })
                            .addTextColumn({ name: "zmenu_prov_exp_txt", caption: "Odeslal", width: 300, fragment: "main" })
                    }).gautofit({ resizersOnTab: false });
                    that.view_ISL = new Gordic.Isl.View(this.isl.Ucrsexp.list({ filters: {} }));
                    $mainTable.ggrid("setData", that.view_ISL);
                    //that.actions.actDetail!.enabled(false);
                    //that.actions.actTisk!.enabled(false);
                }
            };
            GExportDatSeznamUcr = __decorate([
                gcontent
            ], GExportDatSeznamUcr);
            WebClient.GExportDatSeznamUcr = GExportDatSeznamUcr;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0V4cG9ydERhdFNlem5hbVVjci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdFeHBvcnREYXRTZXpuYW1VY3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0VBT0U7Ozs7Ozs7QUFFRixJQUFVLE1BQU0sQ0FrTmY7QUFsTkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBa05uQjtJQWxOZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBa043QjtRQWxOb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxPQUFBLFlBQVk7Z0JBQXJEOztvQkFFSSxVQUFLLEdBQUcsaUJBQWlCLENBQUM7b0JBTWhCLFNBQUksR0FBRyxJQUFJLENBQUM7b0JBV2QsWUFBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztvQkFrS2pELGtCQUFrQjtvQkFDbEIsc0JBQXNCO29CQUV0QixtRkFBbUY7b0JBQ25GLGtDQUFrQztvQkFDbEMsV0FBVztvQkFFWCxvREFBb0Q7b0JBRXBELGlFQUFpRTtvQkFDakUsdUJBQXVCO29CQUN2Qix5REFBeUQ7b0JBQ3pELFVBQVU7b0JBRVYsR0FBRztvQkFFSCx1QkFBdUI7b0JBQ3ZCLHFCQUFxQjtvQkFDckIsdURBQXVEO29CQUV2RCw0QkFBNEI7b0JBQzVCLDRCQUE0QjtvQkFDNUIsR0FBRztnQkFFUCxDQUFDO2dCQXhMRyxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLEtBQUssR0FBRSxpQkFBaUIsQ0FBQztvQkFFOUIsdUJBQXVCO29CQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDO3dCQUNoQjs0QkFDSSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUs7NEJBQ25CLGFBQWEsRUFBRSxJQUFJO3lCQUN0Qjtx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LEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUM7NkJBQzFGLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDOzZCQUMvRixhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQztxQkFDdkcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO29CQUUxQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFFNUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUUzQyx5Q0FBeUM7b0JBQ3pDLHVDQUF1QztnQkFDM0MsQ0FBQzthQTJCSixDQUFBO1lBN01ZLG1CQUFtQjtnQkFEL0IsUUFBUTtlQUNJLG1CQUFtQixDQTZNL0I7WUE3TVksNkJBQW1CLHNCQTZNL0IsQ0FBQTtRQUNMLENBQUMsRUFsTm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWtON0I7SUFBRCxDQUFDLEVBbE5nQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFrTm5CO0FBQUQsQ0FBQyxFQWxOUyxNQUFNLEtBQU4sTUFBTSxRQWtOZiIsInNvdXJjZXNDb250ZW50IjpbIi8qIS8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuVWNyLldlYkNsaWVudC5HRXhwb3J0RGF0U2V6bmFtVWNyLmpzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gR0V4cG9ydERhdFNlem5hbSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEppxZnDrSBJbGXEjWVrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMTYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAxNi0wMy0wMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG4qL1xyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5VY3IuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0V4cG9ydERhdFNlem5hbVVjciBleHRlbmRzIEdDb250ZW50QmFzZSB7IFxyXG5cclxuICAgICAgICB0aXRsZSA9IFwiT2Rlc2xhbsOpIHbDvWthenlcIjsgXHJcblxyXG4gICAgICAgIHByaXZhdGUgJGZpbHRlclBhbmVsOiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3X0lTTDogR29yZGljLklzbC5WaWV3PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JzZXhwRHRvPjtcclxuICAgICAgICBwcml2YXRlIHZpZXdfSVNMX3phcGlzeTogR29yZGljLklzbC5WaWV3PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JzZXhwRHRvPjtcclxuICAgICAgICBcclxuICAgICAgICBwcm90ZWN0ZWQgaW5pdCA9IHRydWU7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1vZGVsX3R5cDogc3RyaW5nO1xyXG4gICAgICAgIHByb3RlY3RlZCBhZ2VuZGE6IHN0cmluZztcclxuICAgICAgICBwcm90ZWN0ZWQgZm9ybTogSlF1ZXJ5O1xyXG4gICAgICAgIHByb3RlY3RlZCBGb3JtX0RhdmthOiBHb3JkaWMuRm9ybXMuRm9ybTtcclxuICAgICAgICBwcm90ZWN0ZWQgYWt0X2RhdmthOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyc2V4cER0bztcclxuICAgICAgICBwcm90ZWN0ZWQgYWt0X25ld19kYXZrYTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjcnNleHBEdG87XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBlbGVtOiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDogSlF1ZXJ5O1xyXG5cclxuICAgICAgICBwcml2YXRlIGdsb2JhbHMgPSBHb3JkaWMuVWNyLkdsb2JhbHMuR1Vjckdsb2JhbHM7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnRpdGxlID1cIk9kZXNsYW7DqSB2w71rYXp5XCI7XHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gYnJlYWRjcnVtYnNcclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhhdC50aXRsZSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAvLyAgICBhY3REZXRhaWw6IHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGNhcHRpb246IFwiRGV0YWlsXCIsIC8vaWNvbjogXCJnaS1wbHVzXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGV0YWlsX2Rhdmt5KCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5hY3Rpb25zLmFkZChHQWN0aW9uLmNyZWF0ZVByaW50QWN0aW9uKHtcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJhY3RUaXNrXCIsXHJcbiAgICAgICAgICAgIC8vICAgIHRlbWE6IFwiaW51X3B0bV9pbnVpbXBvXCIsXHJcbiAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwiVGlza1wiLFxyXG4gICAgICAgICAgICAvLyAgICB0b29sdGlwOiBcIlRpc2tcIixcclxuICAgICAgICAgICAgLy8gICAgcGFyZW50Q29udGVudDogdGhhdCxcclxuICAgICAgICAgICAgLy8gICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdJbXBvcnREYXREZXRhaWw6Q29udmVydFJlcG9ydFBhcmFtc1wiLFxyXG4gICAgICAgICAgICAvLyAgICByZXBvcnRTdGFydGluZzogKHJlcCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVSZXBvcnQocmVwKTtcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvL30pKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFrY2UgbmEga2xpayBuYSBpa29ua3VcclxuICAgICAgICAgICAgY29uc3QgbGlua0FjdCA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwib2JyXCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiAgXCJnaS1lYXR0YWNobWVudFwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoZGF0YS5kYXRhcm93LnByaWxvaGEpICYmIChkYXRhLmRhdGFyb3cucHJpbG9oYSAhPT0gXCJcIikpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBleGlzdHVqZSB2eWJyYW7DvSB6w6F6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnYyA9IG5ldyBHQ29udGVudChbXCJHb3JkaWMuVWNyLldlYkNsaWVudC5HRXhwb3J0RGF0U2V6bmFtVWNyXCIsIHsgcGFyZW50Q29udGVudDogdGhhdCB9XSk7IC8vZG90YcW+ZW7DrSDFmcOhZGt1IHplIHNlcnZlcnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJQcm9iw61ow6Egc3Rhxb5lbsOtIHNvdWJvcnVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdjLmNhbGw8R29yZGljLkdpbi5JbnRlcmZhY2UuR0ZpbGVJblN0cmluZ0R0bz4oXCJHZXRGaWxlWlVsb3ppc3RlXCIsIHsgSXhiOiBkYXRhLmRhdGFyb3cucHJpbG9oYSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR0Jyb3dzZXJFeHRyYXMuZG9jdW1lbnRTYXZlT3BlbkxvY2FsKHIuTmFtZSEsIHIuQnl0ZXMhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoZXJyKSB7IEdvcmRpYy5HdWkuV2ViQXBwLlV0aWxzLnNob3dSZWFzb25GbGFzaChnYywgZXJyKTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdjLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtBY3RObyA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwib2JyXCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImZhLWZ3XCIsXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gbWVudUJhcnVcclxuLy8gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3REZXRhaWwqXCIsIFwiYWN0VGlzaypcIl0pKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtYWluRm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwic2V0dXBcIiwge1xyXG4gICAgICAgICAgICAgICAgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTAtMTItMFwiLFxyXG4gICAgICAgICAgICB9KS5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIik7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyICRtYWluVGFibGUgPSAkKFwiPGRpdiBjbGFzcz0nanMtU2V6bmFtRGF2ZWsnPlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKSAvL23DrXN0byBuYXN0YXZlbsOtIHbDvcWha3kgc2UgcG91xb7DrXbDoSBnYXV0b2ZpdFxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCJwb3Bpc1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwiIWRhdF96bWVuYV9uYWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBmdW5jdGlvbiAoZXYsIG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNudCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsX2l4c19kdmsgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZ5YnJhbmVSYWRreSA9IG8uZ2V0U2VsZWN0aW9uKCk7IC8vY250LmZpbmQoXCIuanMtU2V6bmFtRG9rbGFkdVwiKS5nZ3JpZChcImdldFNlbGVjdGlvblwiKTsgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gcMWZZXMgdnlobGVkw6Fuw60gZ3JpZHUgKHDFmWVzIGNsYXNzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodnlicmFuZVJhZGt5Lmxlbmd0aCA9PT0gMSkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBva3VkIGV4aXN0dWplIHZ5YnJhbsO9IHrDoXpuYW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibmFobGVkIGl4c19tc2tcIiwgdnlicmFuZVJhZGt5WzBdLml4c19tc2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ha3RfZGF2a2EgPSB2eWJyYW5lUmFka3lbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG9jYXNuZSB6YWthemFub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCh0aGF0LmFrdF9kYXZrYS5peHNfZXhwKSAmJiAodGhhdC5ha3RfZGF2a2EuaXhzX2V4cCAhPT0gXCJcIikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmFjdGlvbnMuYWN0RGV0YWlsIS5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5hY3Rpb25zLmFjdFRpc2shLmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiBcInBvcGlzLCByb2ssIG1lc2ljLCBleHBfdHlwLCBleHBfZm9ybWF0LCBzb3Vib3IsIHByaWxvaGEsIG9icmF6LCBtYWlsLCBkYXRfem1lbmFfZXhwLCB6bWVudV9wcm92X2V4cF90eHRcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJpeHNfZXhwXCIsIGNhcHRpb246IFwiSUQgZXhwb3J0dVwiLCB3aWR0aDogMTIwLCBmcmFnbWVudDogXCJtYWluXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInBvcGlzXCIsIGNhcHRpb246IFwiVsO9a2F6XCIsIHdpZHRoOiAxMTAsIGZyYWdtZW50OiBcIm1haW5cIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHsgbmFtZTogXCJyb2tcIiwgY2FwdGlvbjogXCJSb2tcIiwgd2lkdGg6IDgwLCBmcmFnbWVudDogXCJtYWluXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7IG5hbWU6IFwibWVzaWNcIiwgY2FwdGlvbjogXCJNxJtzw61jXCIsIHdpZHRoOiA2MCwgZnJhZ21lbnQ6IFwibWFpblwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImV4cF90eXBcIiwgY2FwdGlvbjogXCJBR1wiLCB3aWR0aDogNjAsIGZyYWdtZW50OiBcIm1haW5cIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJleHBfZm9ybWF0XCIsIGNhcHRpb246IFwiIEZcIiwgd2lkdGg6IDYwLCBmcmFnbWVudDogXCJtYWluXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInNvdWJvclwiLCBjYXB0aW9uOiBcIlNvdWJvclwiLCB3aWR0aDogMzAwLCBmcmFnbWVudDogXCJtYWluXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8uYWRkVGV4dENvbHVtbih7IG5hbWU6IFwicHJpbG9oYVwiLCBjYXB0aW9uOiBcIlDFmcOtbG9oYVwiLCB3aWR0aDogMjAwIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkTGlua3NDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJvYnJhelwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCIgXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwVGVtcGxhdGU6IFwiU3Rhxb5lbsOtIHNvdWJvcnVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDQwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlua3M6IChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQucHJpbG9oYSA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbeyBhY3Rpb246IGxpbmtBY3RObyB9XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbeyBhY3Rpb246IGxpbmtBY3QgfV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSBcclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaWxvaGFfaWNvXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkOiBcInByaWxvaGFfaWNvXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUMWZw61sb2hhXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBcIm1haW5cIixcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDI1LFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRQcmVzZXQ6IEdvcmRpYy5HbG9iYWwuRW51bXMuR3JpZENvbHVtbkZvcm1hdEljb24uaWNvbixcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkYXRhLnByaWxvaGEpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiXCI6IHJldHVybiB7IGljb246IFwiZmEtZndcIiwgdGV4dDogXCJcIiwgY2FwdGlvbjogXCJcIiwgdG9vbHRpcDogXCJcIiB9O1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiB7IGljb246IFwiZ2ktZWF0dGFjaG1lbnRcIiwgdGV4dDogXCJFeHBvcnRvdmFuw70gc291Ym9yXCIsIGNhcHRpb246IFwiRXhwb3J0b3ZhbsO9IHNvdWJvclwiLCB0b29sdGlwOiBcIkV4cG9ydG92YW7DvSBzb3Vib3JcIiB9O1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInprcmF0a2FcIiwgY2FwdGlvbjogXCJaa3JhdGthXCIsIHdpZHRoOiAxMDAsIGZyYWdtZW50OiBcIm1haW5cIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwibWFpbFwiLCBjYXB0aW9uOiBcIk9kZXNsw6FubyBuYSBtYWlsXCIsIHdpZHRoOiAxODAsIGZyYWdtZW50OiBcIm1haW5cIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oeyBuYW1lOiBcImRhdF96bWVuYV9leHBcIiwgY2FwdGlvbjogXCJPZGVzbMOhbm9cIiwgd2lkdGg6IDE1MCwgZnJhZ21lbnQ6IFwibWFpblwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ6bWVudV9wcm92X2V4cF90eHRcIiwgY2FwdGlvbjogXCJPZGVzbGFsXCIsIHdpZHRoOiAzMDAsIGZyYWdtZW50OiBcIm1haW5cIiB9KVxyXG4gICAgICAgICAgICAgICAgfSkuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQudmlld19JU0wgPSBuZXcgR29yZGljLklzbC5WaWV3KHRoaXMuaXNsLlVjcnNleHAubGlzdCh7IGZpbHRlcnM6IHt9IH0pKTtcclxuXHJcbiAgICAgICAgICAgICRtYWluVGFibGUuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlld19JU0wpO1xyXG5cclxuICAgICAgICAgICAgLy90aGF0LmFjdGlvbnMuYWN0RGV0YWlsIS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgLy90aGF0LmFjdGlvbnMuYWN0VGlzayEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy9kZXRhaWxfZGF2a3koKSB7XHJcbiAgICAgICAgLy8gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyAgICAvL3ZhciBkZXRhaWx3aW5kb3cgPSB0aGlzLm5hdmlnYXRlKFwiR29yZGljLkludS5XZWJDbGllbnQuR0ltcG9ydERhdERldGFpbFwiLCB7XHJcbiAgICAgICAgLy8gICAgLy8gICAgRGF2a2E6IHRoaXMuYWt0X2RhdmthLFxyXG4gICAgICAgIC8vICAgIC8vfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgIC8vdmFyIHdpbmRvd0NvbnRlbnQgPSAkLmNvbnRlbnQoZGV0YWlsd2luZG93KTtcclxuXHJcbiAgICAgICAgLy8gICAgLy93aW5kb3dDb250ZW50Lm9uKFwiaW51X2ltcG9ydGRldGFpbHNhdmVcIiwgZnVuY3Rpb24gKGN0eCkge1xyXG4gICAgICAgIC8vICAgIC8vICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgLy8gICAgLy8gICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKGN0eC5kYXRhLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAvLyAgICAvL30pXHJcblxyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvL2dlbmVyYXRlUmVwb3J0KHJlcCkge1xyXG4gICAgICAgIC8vICAgIHZhciBjbnQgPSB0aGlzO1xyXG4gICAgICAgIC8vICAgIHZhciB2c3R1cDogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjcnNleHBEdG8gPSB7fTtcclxuXHJcbiAgICAgICAgLy8gICAgdnN0dXAgPSBjbnQuYWt0X2RhdmthO1xyXG4gICAgICAgIC8vICAgIHJlcC5jdXN0b21EdG8gPSB2c3R1cDtcclxuICAgICAgICAvL31cclxuXHJcbiAgICB9XHJcbn0iXX0=
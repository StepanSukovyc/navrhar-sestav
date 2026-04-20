"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Inu.WebClient.GExportDatSeznam.js                                                        </Name>
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
    var Inu;
    (function (Inu) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GExportDatSeznam = class GExportDatSeznam extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Exportované dávky";
                    this.init = true;
                    this.globals = Gordic.Inu.Globals.GInuGlobals;
                }
                onContentReady() {
                    var that = this;
                    that.title = "Exportované dávky";
                    //nastavení breadcrumbs
                    this.setBreadcrumbs([
                        {
                            caption: that.title,
                            defaultAction: true
                        }
                    ]);
                    this.actions.addRange({
                        actDetail: {
                            caption: "Detail", //icon: "gi-plus",
                            run: () => {
                                return that.detail_davky();
                            }
                        }
                    });
                    this.actions.add(GAction.createPrintAction({
                        name: "actTisk",
                        tema: "inu_ptm_inuimpo",
                        caption: "Tisk",
                        tooltip: "Tisk",
                        parentContent: that,
                        serverParameterMethod: "Gordic.Inu.WebClient.GImportDatDetail:ConvertReportParams",
                        reportStarting: (rep) => {
                            return this.generateReport(rep);
                        }
                    }));
                    // akce na klik na ikonku
                    const linkAct = new GAction({
                        name: "obr",
                        icon: "gi-eattachment",
                        run: (ev, data) => {
                            var that = this;
                            if ((data.datarow.priloha) && (data.datarow.priloha !== "")) { // pokud existuje vybraný záznam
                                var gc = new GContent(["Gordic.Inu.WebClient.GImportDatDetail", { parentContent: that }]); //dotažení řádku ze serveru
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
                    this.menuBar(this.actions.createBar(["actDetail*", "actTisk*"]));
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", {
                        layoutDescriptor: "L1M1S1 LMS-0-12-0",
                    }).gformsection("create");
                    var $mainTable = $("<div class='js-SeznamDavek'>").appendTo(this.element)
                        .gautofit() //místo nastavení výšky se používá gautofit
                        .ggrid({
                        columnMode: "full",
                        searchColumns: ["popis"],
                        defaultAction: that.actions.actDetail,
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
                                    that.actions.actDetail.enabled(true);
                                    that.actions.actTisk.enabled(true);
                                }
                            }
                        },
                        defaultProfile: {
                            columnList: "ixs_exp, rok, mesic, exp_typ, exp_format, soubor, priloha, obraz, popis, mail, dat_zmena_exp, zmenu_prov_exp_txt"
                        },
                        columns: new Gordic.Data.GridFormat()
                            .addTextColumn({ name: "ixs_exp", caption: "ID exportu", width: 120, fragment: "main" })
                            .addNumberColumn({ name: "rok", caption: "Rok", width: 80, fragment: "main" })
                            .addNumberColumn({ name: "mesic", caption: "Měsíc", width: 60, fragment: "main" })
                            .addTextColumn({ name: "exp_typ", caption: "AG", width: 60, fragment: "main" })
                            .addTextColumn({ name: "exp_format", caption: " F", width: 60, fragment: "main" })
                            .addTextColumn({ name: "soubor", caption: "Soubor", width: 200, fragment: "main" })
                            //.addTextColumn({ name: "priloha", caption: "Příloha", width: 200 })
                            .addLinksColumn({
                            name: "obraz",
                            caption: "Klik",
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
                            .addTextColumn({ name: "popis", caption: "Popis", width: 300, fragment: "main" })
                            .addTextColumn({ name: "mail", caption: "Mail", width: 180, fragment: "main" })
                            .addDateTimeColumn({ name: "dat_zmena_exp", caption: "Exportováno", width: 150, fragment: "main" })
                            .addTextColumn({ name: "zmenu_prov_exp_txt", caption: "Export provedl", width: 300, fragment: "main" })
                    }).gautofit({ resizersOnTab: false });
                    that.view_ISL = new Gordic.Isl.View(this.isl.Inusexp.list({ filters: {} }));
                    $mainTable.ggrid("setData", that.view_ISL);
                    that.actions.actDetail.enabled(false);
                    that.actions.actTisk.enabled(false);
                }
                detail_davky() {
                    var that = this;
                    //var detailwindow = this.navigate("Gordic.Inu.WebClient.GImportDatDetail", {
                    //    Davka: this.akt_davka,
                    //});
                    //var windowContent = $.content(detailwindow);
                    //windowContent.on("inu_importdetailsave", function (ctx) {
                    //    //debugger;
                    //    that.view_ISL.updateData(ctx.data, "update");
                    //})
                }
                generateReport(rep) {
                    var cnt = this;
                    var vstup = {};
                    vstup = cnt.akt_davka;
                    rep.customDto = vstup;
                }
            };
            GExportDatSeznam = __decorate([
                gcontent
            ], GExportDatSeznam);
            WebClient.GExportDatSeznam = GExportDatSeznam;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0V4cG9ydERhdFNlem5hbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdFeHBvcnREYXRTZXpuYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0VBT0U7Ozs7Ozs7QUFFRixJQUFVLE1BQU0sQ0FpTmY7QUFqTkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBaU5uQjtJQWpOZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBaU43QjtRQWpOb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBaUIsU0FBUSxPQUFBLFlBQVk7Z0JBQWxEOztvQkFFSSxVQUFLLEdBQUcsbUJBQW1CLENBQUM7b0JBTWxCLFNBQUksR0FBRyxJQUFJLENBQUM7b0JBV2QsWUFBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztnQkF5THJELENBQUM7Z0JBdkxHLGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLENBQUMsS0FBSyxHQUFFLG1CQUFtQixDQUFDO29CQUVoQyx1QkFBdUI7b0JBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUM7d0JBQ2hCOzRCQUNJLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSzs0QkFDbkIsYUFBYSxFQUFFLElBQUk7eUJBQ3RCO3FCQUNKLENBQUMsQ0FBQztvQkFFSCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsU0FBUyxFQUFFOzRCQUNQLE9BQU8sRUFBRSxRQUFRLEVBQUUsa0JBQWtCOzRCQUNyQyxHQUFHLEVBQUUsR0FBRyxFQUFFO2dDQUNMLE9BQU8sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDOzRCQUNoQyxDQUFDO3lCQUNKO3FCQUNKLENBQUMsQ0FBQztvQkFFSCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FB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RUFBRSxFQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBRTdFLFVBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFFM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pDLENBQUM7Z0JBR0QsWUFBWTtvQkFDUixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLDZFQUE2RTtvQkFDN0UsNEJBQTRCO29CQUM1QixLQUFLO29CQUVMLDhDQUE4QztvQkFFOUMsMkRBQTJEO29CQUMzRCxpQkFBaUI7b0JBQ2pCLG1EQUFtRDtvQkFDbkQsSUFBSTtnQkFFUixDQUFDO2dCQUVELGNBQWMsQ0FBQyxHQUFHO29CQUNkLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztvQkFDZixJQUFJLEtBQUssR0FBcUMsRUFBRSxDQUFDO29CQUVqRCxLQUFLLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztvQkFDdEIsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQzFCLENBQUM7YUFFSixDQUFBO1lBNU1ZLGdCQUFnQjtnQkFENUIsUUFBUTtlQUNJLGdCQUFnQixDQTRNNUI7WUE1TVksMEJBQWdCLG1CQTRNNUIsQ0FBQTtRQUNMLENBQUMsRUFqTm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWlON0I7SUFBRCxDQUFDLEVBak5nQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFpTm5CO0FBQUQsQ0FBQyxFQWpOUyxNQUFNLEtBQU4sTUFBTSxRQWlOZiIsInNvdXJjZXNDb250ZW50IjpbIi8qIS8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuSW51LldlYkNsaWVudC5HRXhwb3J0RGF0U2V6bmFtLmpzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gR0V4cG9ydERhdFNlem5hbSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEppxZnDrSBJbGXEjWVrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMTYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAxNi0wMy0wMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG4qL1xyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5JbnUuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0V4cG9ydERhdFNlem5hbSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHRpdGxlID0gXCJFeHBvcnRvdmFuw6kgZMOhdmt5XCI7IFxyXG5cclxuICAgICAgICBwcml2YXRlICRmaWx0ZXJQYW5lbDogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgdmlld19JU0w6IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuSW51LkludGVyZmFjZS5HSW51c2V4cER0bz47XHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3X0lTTF96YXBpc3k6IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuSW51LkludGVyZmFjZS5HSW51c2V4cER0bz47XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJvdGVjdGVkIGluaXQgPSB0cnVlO1xyXG4gICAgICAgIHByb3RlY3RlZCBtb2RlbF90eXA6IHN0cmluZztcclxuICAgICAgICBwcm90ZWN0ZWQgYWdlbmRhOiBzdHJpbmc7XHJcbiAgICAgICAgcHJvdGVjdGVkIGZvcm06IEpRdWVyeTtcclxuICAgICAgICBwcm90ZWN0ZWQgRm9ybV9EYXZrYTogR29yZGljLkZvcm1zLkZvcm07XHJcbiAgICAgICAgcHJvdGVjdGVkIGFrdF9kYXZrYTogR29yZGljLkludS5JbnRlcmZhY2UuR0ludXNleHBEdG87XHJcbiAgICAgICAgcHJvdGVjdGVkIGFrdF9uZXdfZGF2a2E6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVzZXhwRHRvO1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgZWxlbTogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWQ6IEpRdWVyeTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnbG9iYWxzID0gR29yZGljLkludS5HbG9iYWxzLkdJbnVHbG9iYWxzO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC50aXRsZSA9XCJFeHBvcnRvdmFuw6kgZMOhdmt5XCI7XHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gYnJlYWRjcnVtYnNcclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhhdC50aXRsZSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdERldGFpbDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGV0YWlsXCIsIC8vaWNvbjogXCJnaS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kZXRhaWxfZGF2a3koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZChHQWN0aW9uLmNyZWF0ZVByaW50QWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1wiLFxyXG4gICAgICAgICAgICAgICAgdGVtYTogXCJpbnVfcHRtX2ludWltcG9cIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVGlza1wiLFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCJUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGF0LFxyXG4gICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdJbXBvcnREYXREZXRhaWw6Q29udmVydFJlcG9ydFBhcmFtc1wiLFxyXG4gICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IChyZXApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZVJlcG9ydChyZXApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAvLyBha2NlIG5hIGtsaWsgbmEgaWtvbmt1XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtBY3QgPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIm9iclwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogIFwiZ2ktZWF0dGFjaG1lbnRcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGRhdGEuZGF0YXJvdy5wcmlsb2hhKSAmJiAoZGF0YS5kYXRhcm93LnByaWxvaGEgIT09IFwiXCIpKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgZXhpc3R1amUgdnlicmFuw70gesOhem5hbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ2MgPSBuZXcgR0NvbnRlbnQoW1wiR29yZGljLkludS5XZWJDbGllbnQuR0ltcG9ydERhdERldGFpbFwiLCB7IHBhcmVudENvbnRlbnQ6IHRoYXQgfV0pOyAvL2RvdGHFvmVuw60gxZnDoWRrdSB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiUHJvYsOtaMOhIHN0YcW+ZW7DrSBzb3Vib3J1XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnYy5jYWxsPEdvcmRpYy5HaW4uSW50ZXJmYWNlLkdGaWxlSW5TdHJpbmdEdG8+KFwiR2V0RmlsZVpVbG96aXN0ZVwiLCB7IEl4YjogZGF0YS5kYXRhcm93LnByaWxvaGEgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdCcm93c2VyRXh0cmFzLmRvY3VtZW50U2F2ZU9wZW5Mb2NhbChyLk5hbWUhLCByLkJ5dGVzISlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGVycikgeyBHb3JkaWMuR3VpLldlYkFwcC5VdGlscy5zaG93UmVhc29uRmxhc2goZ2MsIGVycik7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYy5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rQWN0Tm8gPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIm9iclwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJmYS1md1wiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIG1lbnVCYXJ1XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdERldGFpbCpcIiwgXCJhY3RUaXNrKlwiXSkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJzZXR1cFwiLCB7XHJcbiAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMTVMtMC0xMi0wXCIsXHJcbiAgICAgICAgICAgIH0pLmdmb3Jtc2VjdGlvbihcImNyZWF0ZVwiKTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgJG1haW5UYWJsZSA9ICQoXCI8ZGl2IGNsYXNzPSdqcy1TZXpuYW1EYXZlayc+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpIC8vbcOtc3RvIG5hc3RhdmVuw60gdsO9xaFreSBzZSBwb3XFvsOtdsOhIGdhdXRvZml0XHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IFtcInBvcGlzXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoYXQuYWN0aW9ucy5hY3REZXRhaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCIhZGF0X3ptZW5hX25hY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGZ1bmN0aW9uIChldiwgbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY250ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxfaXhzX2R2ayA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdnlicmFuZVJhZGt5ID0gby5nZXRTZWxlY3Rpb24oKTsgLy9jbnQuZmluZChcIi5qcy1TZXpuYW1Eb2tsYWR1XCIpLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpOyAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBwxZllcyB2eWhsZWTDoW7DrSBncmlkdSAocMWZZXMgY2xhc3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2eWJyYW5lUmFka3kubGVuZ3RoID09PSAxKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgZXhpc3R1amUgdnlicmFuw70gesOhem5hbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJuYWhsZWQgaXhzX21za1wiLCB2eWJyYW5lUmFka3lbMF0uaXhzX21zayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFrdF9kYXZrYSA9IHZ5YnJhbmVSYWRreVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkb2Nhc25lIHpha2F6YW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHRoYXQuYWt0X2RhdmthLml4c19leHApICYmICh0aGF0LmFrdF9kYXZrYS5peHNfZXhwICE9PSBcIlwiKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsIS5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RUaXNrIS5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogXCJpeHNfZXhwLCByb2ssIG1lc2ljLCBleHBfdHlwLCBleHBfZm9ybWF0LCBzb3Vib3IsIHByaWxvaGEsIG9icmF6LCBwb3BpcywgbWFpbCwgZGF0X3ptZW5hX2V4cCwgem1lbnVfcHJvdl9leHBfdHh0XCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4c19leHBcIiwgY2FwdGlvbjogXCJJRCBleHBvcnR1XCIsIHdpZHRoOiAxMjAsIGZyYWdtZW50OiBcIm1haW5cIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHsgbmFtZTogXCJyb2tcIiwgY2FwdGlvbjogXCJSb2tcIiwgd2lkdGg6IDgwLCBmcmFnbWVudDogXCJtYWluXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7IG5hbWU6IFwibWVzaWNcIiwgY2FwdGlvbjogXCJNxJtzw61jXCIsIHdpZHRoOiA2MCwgZnJhZ21lbnQ6IFwibWFpblwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJleHBfdHlwXCIsIGNhcHRpb246IFwiQUdcIiwgd2lkdGg6IDYwLCBmcmFnbWVudDogXCJtYWluXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImV4cF9mb3JtYXRcIiwgY2FwdGlvbjogXCIgRlwiLCB3aWR0aDogNjAsIGZyYWdtZW50OiBcIm1haW5cIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwic291Ym9yXCIsIGNhcHRpb246IFwiU291Ym9yXCIsIHdpZHRoOiAyMDAsIGZyYWdtZW50OiBcIm1haW5cIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJwcmlsb2hhXCIsIGNhcHRpb246IFwiUMWZw61sb2hhXCIsIHdpZHRoOiAyMDAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRMaW5rc0NvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm9icmF6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIktsaWtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDQwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlua3M6IChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQucHJpbG9oYSA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbeyBhY3Rpb246IGxpbmtBY3RObyB9XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbeyBhY3Rpb246IGxpbmtBY3QgfV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSBcclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaWxvaGFfaWNvXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkOiBcInByaWxvaGFfaWNvXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUMWZw61sb2hhXCIsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBcIm1haW5cIixcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDI1LFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRQcmVzZXQ6IEdvcmRpYy5HbG9iYWwuRW51bXMuR3JpZENvbHVtbkZvcm1hdEljb24uaWNvbixcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkYXRhLnByaWxvaGEpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiXCI6IHJldHVybiB7IGljb246IFwiZmEtZndcIiwgdGV4dDogXCJcIiwgY2FwdGlvbjogXCJcIiwgdG9vbHRpcDogXCJcIiB9O1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiB7IGljb246IFwiZ2ktZWF0dGFjaG1lbnRcIiwgdGV4dDogXCJFeHBvcnRvdmFuw70gc291Ym9yXCIsIGNhcHRpb246IFwiRXhwb3J0b3ZhbsO9IHNvdWJvclwiLCB0b29sdGlwOiBcIkV4cG9ydG92YW7DvSBzb3Vib3JcIiB9O1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInprcmF0a2FcIiwgY2FwdGlvbjogXCJaa3JhdGthXCIsIHdpZHRoOiAxMDAsIGZyYWdtZW50OiBcIm1haW5cIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwicG9waXNcIiwgY2FwdGlvbjogXCJQb3Bpc1wiLCB3aWR0aDogMzAwLCBmcmFnbWVudDogXCJtYWluXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIm1haWxcIiwgY2FwdGlvbjogXCJNYWlsXCIsIHdpZHRoOiAxODAsIGZyYWdtZW50OiBcIm1haW5cIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oeyBuYW1lOiBcImRhdF96bWVuYV9leHBcIiwgY2FwdGlvbjogXCJFeHBvcnRvdsOhbm9cIiwgd2lkdGg6IDE1MCwgZnJhZ21lbnQ6IFwibWFpblwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ6bWVudV9wcm92X2V4cF90eHRcIiwgY2FwdGlvbjogXCJFeHBvcnQgcHJvdmVkbFwiLCB3aWR0aDogMzAwLCBmcmFnbWVudDogXCJtYWluXCIgfSlcclxuICAgICAgICAgICAgICAgIH0pLmdhdXRvZml0KHsgcmVzaXplcnNPblRhYjogZmFsc2UgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnZpZXdfSVNMID0gbmV3IEdvcmRpYy5Jc2wuVmlldyh0aGlzLmlzbC5JbnVzZXhwLmxpc3QoeyBmaWx0ZXJzOiB7IH0gfSkpO1xyXG5cclxuICAgICAgICAgICAgJG1haW5UYWJsZS5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3X0lTTCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsIS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFRpc2shLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGRldGFpbF9kYXZreSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgZGV0YWlsd2luZG93ID0gdGhpcy5uYXZpZ2F0ZShcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdJbXBvcnREYXREZXRhaWxcIiwge1xyXG4gICAgICAgICAgICAvLyAgICBEYXZrYTogdGhpcy5ha3RfZGF2a2EsXHJcbiAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3ZhciB3aW5kb3dDb250ZW50ID0gJC5jb250ZW50KGRldGFpbHdpbmRvdyk7XHJcblxyXG4gICAgICAgICAgICAvL3dpbmRvd0NvbnRlbnQub24oXCJpbnVfaW1wb3J0ZGV0YWlsc2F2ZVwiLCBmdW5jdGlvbiAoY3R4KSB7XHJcbiAgICAgICAgICAgIC8vICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgIC8vICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YShjdHguZGF0YSwgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgICAgIC8vfSlcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZW5lcmF0ZVJlcG9ydChyZXApIHtcclxuICAgICAgICAgICAgdmFyIGNudCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciB2c3R1cDogR29yZGljLkludS5JbnRlcmZhY2UuR0ludXNleHBEdG8gPSB7fTtcclxuXHJcbiAgICAgICAgICAgIHZzdHVwID0gY250LmFrdF9kYXZrYTtcclxuICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHZzdHVwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iXX0=
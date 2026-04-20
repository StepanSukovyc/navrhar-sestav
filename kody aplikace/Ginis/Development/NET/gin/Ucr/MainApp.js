"use strict";
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
            //var gcontent = Decorators.gcontent;
            //@gcontent
            let GMainApp = class GMainApp extends Gordic.GContentBase {
                onContentReady(args) {
                    let _this = this;
                    let strPopisDef = Gordic.Ucr.Globals.StrPopis;
                    // docitane cache
                    // TODO: pridat podminku, kdy nacitat
                    //Gordic.Eko.WebClient.DataSentenceAdapter.getCacheContent(this.ixsRoz, this.ixsSax);
                    //debugger;
                    // registrace handleru pro archivace knih           
                    this.SaldokontoSeznamZapisuHandler();
                    // registrace handleru pro vytvoreni davky
                    this.VytvoritDavkuHandler();
                    // Uzivatelske nastaveni
                    //----------------------
                    Gordic.WebApp.globalSettingForms.register([
                        new Gordic.Forms.Form({ name: "Fooo", tabOptions: { title: "jres:30250562", opened: true } }) //RC 30250562 : Zápisy účetnictví
                            .addRow("jres:31100240") //RC 31100240 : Načítat vybrané údaje strukturovaného popisu
                            .addField("gcheck", {
                            name: "strPopisAuto",
                            model: "contents.uctZapisy#.rozsirenyPopisAutoAddGridColumns=value",
                            labelFromRow: "always"
                        })
                            .addRow("jres:31100239") //RC 31100239 : Údaje strukturovaného popisu
                            .addField("gselectbox", {
                            name: "strPopis",
                            model: "contents.uctZapisy#.rozsirenyPopisShowGridColumns=value",
                            itemTemplate: (v) => {
                                if (!v)
                                    return "";
                                return v.join(",");
                            },
                            itemTooltipTemplate: (v) => {
                                if (!v || !v.length)
                                    return "";
                                let s = "<table>";
                                for (var i = 0; i < v.length; i++) {
                                    let strPopis = strPopisDef.find((p) => { return p.klic === v[i]; });
                                    if (!strPopis)
                                        continue;
                                    s += `<tr><td>${strPopis.klic}</td><td>- ${strPopis.klic_txt}</td></tr>`;
                                }
                                s += "</table>";
                                return s;
                            },
                            graphicInput: "hidden",
                            selector: function () {
                                let d = $.Deferred();
                                let field = $(this);
                                _this.dialogs.showModalWindow(Gordic.Ucr.WebClient.Prefabs.GStrukturovanyPopisFilterSelector, {
                                    data: strPopisDef, //NOTE: Jsou-li data undefined, content si je loadne sam
                                    selected: field.gfield("getValue"),
                                    selectable: true,
                                    id: "strPopisSettings#"
                                }, { title: "jres:31100239" }) //RC 31100239 : Údaje strukturovaného popisu
                                    .on("close", (ev, r) => {
                                    if (r?.selected)
                                        d.resolve(r?.selected);
                                    else
                                        d.reject();
                                });
                                return d.promise();
                            }
                        })
                            .addRow("jres:30250563") //RC 30250563 : Načítat údaje o externím subjektu
                            .addField("gcheck", {
                            name: "esuAuto",
                            model: "contents.uctZapisy#.esuAddGridColumns=value",
                            labelFromRow: "always"
                        })
                            .addRow("jres:30250618") //RC 30250618 : Načítat strukturovaný popis dokladu
                            .addField("gcheck", {
                            name: "strPopisDokladuAuto",
                            model: "contents.uctZapisy#.strukturovanyPopisDokladuAutoAddGridColumns=value",
                            labelFromRow: "always"
                        }),
                        new Gordic.Forms.Form({ name: "FoooRozpoctu", tabOptions: { title: "jres:30250683", opened: true } }) //RC 30250683 : Zápisy rozpočtu
                            .addRow("jres:30250618") //RC 30250618 : Načítat strukturovaný popis dokladu
                            .addField("gcheck", {
                            name: "strPopisDokladuAuto",
                            model: "contents.rozZapisy#.strukturovanyPopisDokladuAutoAddGridColumns=value",
                            labelFromRow: "always"
                        })
                    ]);
                    //Gordic.WebApp.globalSettingForms.register([
                    //    new Gordic.Forms.Form({ name: "FoooRozpoctu", tabOptions: { title: "jres:30250683", opened: true } } as GFormOptions) //RC 30250683 : Zápisy rozpočtu
                    //        .addRow("jres:30250618")//RC 30250618 : Načítat strukturovaný popis dokladu
                    //        .addField("gcheck", {
                    //            name: "strPopisDokladuAuto",
                    //            model: "contents.rozZapisy#.strukturovanyPopisDokladuAutoAddGridColumns=value",
                    //            labelFromRow: "always" 
                    //        })
                    //]);
                    // texty z rozvrhu
                    //----------------
                    Gordic.WebApp.globalSettingForms.register([
                        new Gordic.Forms.Form({ name: "txtZRovrhu", tabOptions: { title: "jres:30250588", opened: true } }) //RC 30250588 : Texty z rozvrhu
                            .addRow("jres:30250589") //RC 30250589 : Zobrazit vybrané texty z rozvrhu
                            .addField("gcheck", {
                            name: "showTextyZRozvrhuColumns",
                            model: "Global.Ucr.AppSettings.UctSettingsForm.showTextyZRozvrhuColumns=value",
                            //model: "contents.uctZapisy#.showTextyZRozvrhuColumns=value",
                            labelFromRow: "always"
                        })
                            .addRow("jres:30250601") //RC 30250601 : Automaticky načíst
                            .addField("gcheck", {
                            name: "autoLoadTextyZRozvrhuColumns",
                            model: "Global.Ucr.AppSettings.UctSettingsForm.autoLoadTextyZRozvrhuColumns=value",
                            //model: "contents.uctZapisy#.showTextyZRozvrhuColumns=value",
                            labelFromRow: "always"
                        })
                            .addRow("jres:30250587") //RC 30250587 : Texty z rozvrhu s hodnotou slova
                            .addField("gcheck", {
                            name: "wordWithNumber",
                            model: "Global.Ucr.AppSettings.UctSettingsForm.wordWithNumber=value",
                            //model: "contents.uctZapisy#.wordWithNumber=value",
                            labelFromRow: "always"
                        })
                            .addSection("Vybraná slova účetního rozvrhu")
                            .addRow("jres:30250590") //RC 30250590 : Zápisy účetnictví
                            .addField("gselectbox", {
                            name: "selectedWordsShowGridColumns",
                            //model: "Global.Ucr.AppSettings.UctSettingsForm.selectedWordsShowGridColumns=value",
                            model: "contents.uctZapisy#.selectedWordsShowGridColumns=value",
                            //itemTemplate: (v?: string[]) => {
                            //    if (!v) return "";
                            //    return v.join(",");
                            //},
                            itemTemplate: (v) => {
                                if (!v)
                                    return "";
                                let t = v;
                                let result = "";
                                let plus = "";
                                for (var i = 0; i < v.length; i++) {
                                    let item = v[i];
                                    result += plus + item.klic;
                                    plus = ",";
                                }
                                return result;
                            },
                            itemTooltipTemplate: (v) => {
                                if (!v || !v.length)
                                    return "";
                                debugger;
                                let t = v;
                                let s = "<table>";
                                for (var i = 0; i < v.length; i++) {
                                    //let wordRozvrh = wordsRozvrh.find((p) => { return p.klic === t[i].klic; });
                                    //if (!wordRozvrh) continue;
                                    s += `<tr><td>${t[i].klic}</td><td>- ${t[i].klic_txt}</td></tr>`;
                                }
                                s += "</table>";
                                return s;
                            },
                            graphicInput: "hidden",
                            selector: function () {
                                let d = $.Deferred();
                                let field = $(this);
                                _this.dialogs.showModalWindow(Gordic.Ucr.WebClient.Prefabs.GSlovaRozvrhuFilterFilterSelector, {
                                    data: undefined, //NOTE: Jsou-li data undefined, content si je loadne sam
                                    selected: field.gfield("getValue"),
                                    selectable: true,
                                    id: "wordsRozvrhSettings#"
                                }, { title: "jres:30250591" }) //RC 30250591 : Slova účetního rozvrhu
                                    .on("close", (ev, r) => {
                                    if (r?.selected) {
                                        //r?.selected
                                        //d.resolve(r?.selected);
                                        d.resolve(r?.selected);
                                    }
                                    else
                                        d.reject();
                                });
                                return d.promise();
                            }
                        })
                            .addRow("jres:30250598") //RC 30250598 : Stavy účetnictví
                            .addField("gselectbox", {
                            name: "selectedWordsShowGridColumns",
                            //model: "Global.Ucr.AppSettings.UctSettingsForm.selectedWordsShowGridColumns=value",
                            model: "contents.uctStavy#.selectedWordsShowGridColumns=value",
                            //itemTemplate: (v?: string[]) => {
                            //    if (!v) return "";
                            //    return v.join(",");
                            //},
                            itemTemplate: (v) => {
                                if (!v)
                                    return "";
                                let t = v;
                                let result = "";
                                let plus = "";
                                for (var i = 0; i < v.length; i++) {
                                    let item = v[i];
                                    result += plus + item.klic;
                                    plus = ",";
                                }
                                return result;
                            },
                            itemTooltipTemplate: (v) => {
                                if (!v || !v.length)
                                    return "";
                                debugger;
                                let t = v;
                                let s = "<table>";
                                for (var i = 0; i < v.length; i++) {
                                    //let wordRozvrh = wordsRozvrh.find((p) => { return p.klic === t[i].klic; });
                                    //if (!wordRozvrh) continue;
                                    s += `<tr><td>${t[i].klic}</td><td>- ${t[i].klic_txt}</td></tr>`;
                                }
                                s += "</table>";
                                return s;
                            },
                            graphicInput: "hidden",
                            selector: function () {
                                let d = $.Deferred();
                                let field = $(this);
                                _this.dialogs.showModalWindow(Gordic.Ucr.WebClient.Prefabs.GSlovaRozvrhuFilterFilterSelector, {
                                    data: undefined, //NOTE: Jsou-li data undefined, content si je loadne sam
                                    selected: field.gfield("getValue"),
                                    selectable: true,
                                    id: "wordsRozvrhSettings#"
                                }, { title: "jres:30250591" }) //RC 30250591 : Slova účetního rozvrhu
                                    .on("close", (ev, r) => {
                                    if (r?.selected) {
                                        //r?.selected
                                        //d.resolve(r?.selected);
                                        d.resolve(r?.selected);
                                    }
                                    else
                                        d.reject();
                                });
                                return d.promise();
                            }
                        })
                            .addRow("jres:30250599") //RC 30250599 : Zápisy rozpočtu
                            .addField("gselectbox", {
                            name: "selectedWordsShowGridColumns",
                            //model: "Global.Ucr.AppSettings.UctSettingsForm.selectedWordsShowGridColumns=value",
                            model: "contents.rozZapisy#.selectedWordsShowGridColumns=value",
                            //itemTemplate: (v?: string[]) => {
                            //    if (!v) return "";
                            //    return v.join(",");
                            //},
                            itemTemplate: (v) => {
                                if (!v)
                                    return "";
                                let t = v;
                                let result = "";
                                let plus = "";
                                for (var i = 0; i < v.length; i++) {
                                    let item = v[i];
                                    result += plus + item.klic;
                                    plus = ",";
                                }
                                return result;
                            },
                            itemTooltipTemplate: (v) => {
                                if (!v || !v.length)
                                    return "";
                                debugger;
                                let t = v;
                                let s = "<table>";
                                for (var i = 0; i < v.length; i++) {
                                    //let wordRozvrh = wordsRozvrh.find((p) => { return p.klic === t[i].klic; });
                                    //if (!wordRozvrh) continue;
                                    s += `<tr><td>${t[i].klic}</td><td>- ${t[i].klic_txt}</td></tr>`;
                                }
                                s += "</table>";
                                return s;
                            },
                            graphicInput: "hidden",
                            selector: function () {
                                let d = $.Deferred();
                                let field = $(this);
                                _this.dialogs.showModalWindow(Gordic.Ucr.WebClient.Prefabs.GSlovaRozvrhuFilterFilterSelector, {
                                    data: undefined, //NOTE: Jsou-li data undefined, content si je loadne sam
                                    selected: field.gfield("getValue"),
                                    selectable: true,
                                    id: "wordsRozvrhSettings#"
                                }, { title: "jres:30250591" }) //RC 30250591 : Slova účetního rozvrhu
                                    .on("close", (ev, r) => {
                                    if (r?.selected) {
                                        //r?.selected
                                        //d.resolve(r?.selected);
                                        d.resolve(r?.selected);
                                    }
                                    else
                                        d.reject();
                                });
                                return d.promise();
                            }
                        })
                            .addRow("jres:30250600") //RC 30250600 : Stavy rozpočtu
                            .addField("gselectbox", {
                            name: "selectedWordsShowGridColumns",
                            //model: "Global.Ucr.AppSettings.UctSettingsForm.selectedWordsShowGridColumns=value",
                            model: "contents.rozStavy#.selectedWordsShowGridColumns=value",
                            //itemTemplate: (v?: string[]) => {
                            //    if (!v) return "";
                            //    return v.join(",");
                            //},
                            itemTemplate: (v) => {
                                if (!v)
                                    return "";
                                let t = v;
                                let result = "";
                                let plus = "";
                                for (var i = 0; i < v.length; i++) {
                                    let item = v[i];
                                    result += plus + item.klic;
                                    plus = ",";
                                }
                                return result;
                            },
                            itemTooltipTemplate: (v) => {
                                if (!v || !v.length)
                                    return "";
                                debugger;
                                let t = v;
                                let s = "<table>";
                                for (var i = 0; i < v.length; i++) {
                                    //let wordRozvrh = wordsRozvrh.find((p) => { return p.klic === t[i].klic; });
                                    //if (!wordRozvrh) continue;
                                    s += `<tr><td>${t[i].klic}</td><td>- ${t[i].klic_txt}</td></tr>`;
                                }
                                s += "</table>";
                                return s;
                            },
                            graphicInput: "hidden",
                            selector: function () {
                                let d = $.Deferred();
                                let field = $(this);
                                _this.dialogs.showModalWindow(Gordic.Ucr.WebClient.Prefabs.GSlovaRozvrhuFilterFilterSelector, {
                                    data: undefined, //NOTE: Jsou-li data undefined, content si je loadne sam
                                    selected: field.gfield("getValue"),
                                    selectable: true,
                                    id: "wordsRozvrhSettings#"
                                }, { title: "jres:30250591" }) //RC 30250591 : Slova účetního rozvrhu
                                    .on("close", (ev, r) => {
                                    if (r?.selected) {
                                        //r?.selected
                                        //d.resolve(r?.selected);
                                        d.resolve(r?.selected);
                                    }
                                    else
                                        d.reject();
                                });
                                return d.promise();
                            }
                        })
                    ]);
                    //#region Infopanel - nastaveni sestavy na uvodni strance
                    //NOTE: Inspirace: Ucr.WinClient/ModuleForm/Gordic.ucr.WinClient.GUcrModuleForm.cs, metoda NastavBackPanel()
                    Gordic.WebApp.globalSettingForms.register([
                        new Gordic.Forms.Form({ name: "infopanel", tabOptions: { title: "jres:31100272", opened: true } }) //RC 31100272 : Infopanel
                            //.addRow("jres:31100273") //RC 31100273 : Výběr infopanelu
                            //.addField("gselectbox", Gordic.Prefabs.Select.reports({ reportsOptions: { Tema: "ucr_ptm_info" } }), {
                            //    name: "infopanel",
                            //    model: "Global.ucr.infopanel.reportId=value.reportId",
                            //    dropdown: true,
                            //})
                            .addRow("jres:31100274") //RC 31100274 : Měsíc
                            .addField("gselectbox", Gordic.Prefabs.Select.ucrMesic(), {
                            name: "mesic",
                            model: "Global.ucr.infopanel.mesic=value.mesic",
                            initialValue: { mesic: 20 },
                            dropdown: true,
                            serverFilters: {
                                rok: this.ekoRok,
                                pseudo: 2
                            },
                        }),
                        new Gordic.Forms.Form({ name: "registrPZ", tabOptions: { title: "jres:30250219", opened: true } }) //RC 30250219 : Registr P/Z
                            .addRow("jres:30250220") //RC 30250220 : Předplnění měsíce
                            .addField("gselectbox", {
                            name: "predvolba",
                            itemTemplate: "{popis}",
                            model: "Global.ucr.registrPZ.mesic=value.predvolba",
                            data: new Gordic.Data.View([{ popis: "jres:30250221", predvolba: 0 } //RC 30250221 : Nepředplňovat
                                ,
                                { popis: "jres:30250222", predvolba: 10 } //RC 30250222 : Aktuální měsíc
                                ,
                                { popis: "jres:30250223", predvolba: 20 } //RC 30250223 : Min. otevřený měsíc
                                ,
                                { popis: "jres:30250224", predvolba: 30 } //RC 30250224 : Max. otevřený měsíc
                                ,
                                { popis: "jres:30250225", predvolba: 40 } //RC 30250225 : Max. uzavřený měsíc
                            ], { key: "predvolba" }),
                            initialValue: { predvolba: 0 },
                            dropdown: true,
                        }),
                        Gordic.Eko.Utils.UserSettingsList("Global.Ucr.AppSettings")
                    ]);
                    // Sumarizace
                    Gordic.WebApp.globalSettingForms.register([
                        new Gordic.Forms.Form({ name: "sumarizace", tabOptions: { title: "jres:30450017", opened: true } }) //RC 30450017 : Sumarizace
                            .addRow("jres:30450018") //RC 30450018 : Mail na automat
                            .addField("gstringbox", {
                            name: "sumarizace_mail",
                            model: "Global.Ucr.AppSettings.UctSettingsForm.sumarizace_mail=value",
                        }),
                        Gordic.Eko.Utils.UserSettingsList("Global.Ucr.AppSettings")
                    ]);
                    //#endregion
                    //#region Pro debug loveni focusu
                    //$("body").on("focusin", function (ev) {
                    //    console.log("activeElement", document.activeElement);
                    //});
                    // pokud neni nastavena posledni akce, spusti se defaultni akce
                    // dashboard
                    this.defineDashBoard();
                    //#endregion
                    this.element
                        .off(".ucrCtxChanges")
                        .on("saveAction.ucrCtxChanges", (ev, o) => {
                        const lastAction = o?.lastAction;
                        if (lastAction && !this["skipSaveAction"]) {
                            this.globalSettings?.set("contents.main.lastAction", lastAction);
                            this.globalSettings?.save(); // ulozime posledni akci, ktera byla spustena
                        }
                        delete this["skipSaveAction"]; // smazeme skipSaveAction, aby se pri dalsim spusteni zase ukladala posledni akce
                    });
                }
                /**
                 * Nalezeni a spusteni startovaci stranky
                 * @returns
                 */
                resolveStartPage() {
                    let lastAction = this.globalSettings?.get("contents.main.lastAction");
                    if (lastAction) {
                        this.actions[lastAction]?.run();
                        this.globalSettings?.remove("contents.main.lastAction");
                        this.globalSettings?.save(); // smazeme posledni akci, ktera byla spustena
                        this["skipSaveAction"] = true;
                        return;
                    }
                    this.actions[this.dashboardActionName]?.run();
                }
                /**
                * Uzavirani okna
                * @returns
                */
                closing() {
                    debugger;
                    return $.Deferred().resolve().promise();
                }
                /**
                 * Definice dashboardu
                 */
                defineDashBoard() {
                    let that = this;
                    var customProvider = new Gordic.Dashboard.CustomProvider("jres:30250639", "dashboard", () => {
                        var akt_rok = that.gpc.rok;
                        let dat_dns = new Date(); // dnešní datum
                        var v_rok = dat_dns.getFullYear().toString();
                        var v_mesic = dat_dns.getMonth();
                        if (akt_rok < v_rok) {
                            v_mesic = 12;
                        }
                        that.beginOperation();
                        var DashBoard_ISL_View = new Gordic.Isl.View(that.isl.EkoDashboard.getEkoDashboardData({ filters: { rok: akt_rok, mesic: v_mesic } }).use((rq, next) => {
                            //zmena rq
                            return next(rq).then((response) => {
                                const novaResponse = $.extend({}, response);
                                //zmena response
                                var pole = [] = new Array();
                                var citac = 0;
                                response.data.forEach((radek_dsh) => {
                                    var radek = radek_dsh.data;
                                    if (radek) {
                                        radek.forEach((radek_dsh) => {
                                            if ((radek_dsh) && (radek_dsh.details) && (radek_dsh.details.length > 0)) {
                                                var v_popis = radek_dsh.title;
                                                radek_dsh.title = "";
                                                citac++;
                                                if (radek_dsh.typ == "T") {
                                                    var radek_pole = {
                                                        id: "scorecardDash" + citac.toString(),
                                                        title: "<b>" + v_popis + "</i>",
                                                        mode: "vertical",
                                                        //zone: (citac % 3) == 1 ? 0 : ((citac % 3) == 2 ? 1 : 2),      // rozhozeni na 3 zony postupne zleva doprava a shora dolu
                                                        zone: citac <= 4 ? 0 : citac >= 9 ? 2 : 1, // rozhozeni na 3 zony postupne shora dolu a zleva doprava
                                                        visible: true,
                                                        itemTemplate: Gordic.Prefabs.Panels.kpiMultiRowsTemplate().itemTemplate,
                                                        defaultSelected: false,
                                                        hoverEnabled: false,
                                                        data: radek_dsh,
                                                        //userSettings: this.userSettings
                                                    };
                                                    if (radek_pole)
                                                        pole.push(radek_pole);
                                                }
                                                if (radek_dsh.typ == "G") {
                                                    const l_delka = 30;
                                                    const l_val1 = Gordic.Templates.Formatters.number(parseDecimal(radek_dsh.details[0].value), "C").toString();
                                                    const l_val2 = Gordic.Templates.Formatters.number(parseDecimal(radek_dsh.details[1].value), "C").toString();
                                                    // var val1_out = ": " + new Array(l_delka - l_val1.length + 1).join(' ') + l_val1;
                                                    // var val2_out = ": " + new Array(l_delka - l_val2.length + 1).join(' ') + l_val2;
                                                    //var val1_out = " <div><b>" + radek_dsh.details[0].description! + "</b></div><div class='g-kpi-multirow-header-right'><b>" + l_val1 + "</b></div>"
                                                    //var val2_out = " <div><b>" + radek_dsh.details[1].description! + "</b></div><div class='g-kpi-multirow-header-right'><b>" + l_val2 + "</b></div>"
                                                    var val1_out = " <div class=\"g-kpi-multirow-body-description-row g-kpi-multirow-body-description-row__vertical_mode gtooltip\" style=\"justify-content: space-between;\"><div><b>" + radek_dsh.details[0].description + "</b></div><div class='g-kpi-multirow-header-right'><b>" + l_val1 + "</b></div></div>";
                                                    var val2_out = " <div class=\"g-kpi-multirow-body-description-row g-kpi-multirow-body-description-row__vertical_mode gtooltip\" style=\"justify-content: space-between;\"><div><b>" + radek_dsh.details[1].description + "</b></div><div class='g-kpi-multirow-header-right'><b>" + l_val2 + "</b></div></div>";
                                                    var newData = {
                                                        primaryText: val1_out,
                                                        secondaryText: val2_out,
                                                        chart: {
                                                            type: "bar",
                                                            data: [
                                                                { id: 1, y: radek_dsh.details[0].value, descr: radek_dsh.details[0].description },
                                                                { id: 2, y: radek_dsh.details[1].value, descr: radek_dsh.details[1].description },
                                                            ],
                                                            //    config: {
                                                            //        displayLabels: true,
                                                            //        xPropName: "descr",
                                                            //        yPropName: "y",
                                                            //        yAxis: "kukuY",
                                                            //        xAxis: "kukuZ",
                                                            //        width: 600,
                                                            //        height: 500,
                                                            //        marginTop: 5,
                                                            //        marginLeft: 100,
                                                            //        marginBottom: 100,
                                                            //        marginRight: 20
                                                            //    }
                                                        },
                                                        meaning: null,
                                                        settings: null,
                                                        visible: true
                                                    };
                                                    var radek_pole2 = {
                                                        id: "scorecardDash" + citac.toString(),
                                                        title: "<b>" + v_popis + "</i>",
                                                        mode: "vertical",
                                                        zone: citac <= 4 ? 0 : citac >= 9 ? 2 : 1, // rozhozeni na 3 zony postupne shora dolu a zleva doprava
                                                        visible: true,
                                                        itemTemplate: Gordic.Prefabs.Panels.kpiChartTwoRowsTextTemplate().itemTemplate,
                                                        defaultSelected: false,
                                                        hoverEnabled: false,
                                                        data: newData,
                                                        //userSettings: this.userSettings
                                                    };
                                                    if (radek_pole2)
                                                        pole.push(radek_pole2);
                                                }
                                            }
                                        });
                                    }
                                });
                                that.endOperation();
                                novaResponse.data = pole;
                                return novaResponse;
                            });
                        }));
                        DashBoard_ISL_View.requestData();
                        //var hlavicka = "k období:  " + v_mesic + "/" + akt_rok;
                        let hlavicka = "jres:30250641".format(v_mesic, akt_rok); //RC 30250641 : k období:  {0}/{1}
                        var l_dashboard = $("<div><h4>" + hlavicka + "</h4>").appendTo(this.element).gdashboardpanel({
                            data: DashBoard_ISL_View,
                            editable: false,
                            layout: "horizontal",
                            title: "jres:30250640", //RC 30250640 : Informační panel
                            zones: 3,
                            //fixedWidth: true,
                            //width: 850,
                            sortable: false
                        });
                        //definice vlastního dashboardu
                        return l_dashboard;
                    });
                    Gordic.Dashboard.CustomProviders.register(customProvider);
                }
                openIISSPInbox() {
                    const c = this.navigateTask(Gordic.Iissp.WebControls.GInbox);
                    c.then((div) => {
                        $.content(div).on("griddefaultactionrun", function (dto) {
                            debugger;
                            let maska = {
                                isp_eds: { start: dto.isp_eds, end: dto.isp_eds_do },
                                isp_fim: { start: dto.isp_fim, end: dto.isp_fim_do == null ? dto.isp_fim : dto.isp_fim_do },
                                isp_par: { start: dto.isp_par, end: dto.isp_par_do == null ? dto.isp_par : dto.isp_par_do },
                                isp_pol: { start: dto.isp_pol, end: dto.isp_pol_do == null ? dto.isp_pol : dto.isp_pol_do },
                                isp_pvs: { start: dto.isp_pvs, end: dto.isp_pvs_do == null ? dto.isp_pvs : dto.isp_pvs_do },
                                isp_ucl: { start: dto.isp_ucl, end: dto.isp_ucl_do == null ? dto.isp_ucl : dto.isp_ucl_do },
                                isp_uj: { start: dto.isp_uj, end: dto.isp_uj_do == null ? dto.isp_uj : dto.isp_uj_do },
                                isp_uz: { start: dto.isp_uz, end: dto.isp_uz_do == null ? dto.isp_uz : dto.isp_uz_do },
                                isp_zdr: { start: dto.isp_zdr, end: dto.isp_zdr_do == null ? dto.isp_zdr : dto.isp_zdr_do },
                                isp_zj: { start: dto.isp_zj, end: dto.isp_zj_do == null ? dto.isp_zj : dto.isp_zj_do },
                                dat_stav: dto.dat_stav,
                                dat_stav_od: dto.dat_stav_od
                            };
                            switch (dto.metoda_zkr) {
                                case "STRO":
                                    $.content(div).navigate('Gordic.Ucr.WebClient.GSeznamIISSPBaseContent', {
                                        taskId: 'seznamIISSPStavyRozpoctuAct', ID: 'seznamIISSStavyRozpoctu#', TypUlohy: 20 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Stavy_StavyRozpoctu */, autoReload: true,
                                        maska: maska
                                    });
                                    break;
                                case "STSK":
                                    $.content(div).navigate('Gordic.Ucr.WebClient.GSeznamIISSPBaseContent', {
                                        taskId: 'seznamIISSPStavySkutecnostiAct', ID: 'seznamIISSPStavySkutecnosti#', TypUlohy: 22 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Stavy_StavySkutecnosti */,
                                        autoReload: true, maska: maska
                                    });
                                    break;
                                case "CERO":
                                    $.content(div).navigate('Gordic.Ucr.WebClient.GSeznamIISSPBaseContent', {
                                        taskId: 'seznamIISSPCerpaniRozpoctuAct', ID: 'seznamIISSPCerpaniRozpoctu#', TypUlohy: 21 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Stavy_StavyCerpaniRozpoctu */, autoReload: true,
                                        maska: maska
                                    });
                                    break;
                            }
                        });
                    });
                }
                /**
                 * registrace handleru pro archivace knih
                 *
                 * */
                SaldokontoSeznamZapisuHandler() {
                    var that = this;
                    Gordic.Async.GTaskManager.on("change", "Gordic.Ucr.Server.GUcrZapisySaldokontoAsync", function (o) {
                        console.log("GInuStavyAsync change", o);
                        if (o.progress)
                            this.getNotification().update({ progress: { current: o.progress.current, total: o.progress.total, text: o.progress.text } });
                    })
                        .on("init", "Gordic.Ucr.Server.GUcrZapisySaldokontoAsync", function (o, result) {
                        var notifikace_Stv = new GObservableObject({ title: "Informace", icon: "fa-globe", content: "jres:30250288" }); //RC 30250288 : Start načítání
                        that.notification("add", notifikace_Stv, true);
                        this.setNotification(notifikace_Stv);
                    })
                        .on("done", "Gordic.Ucr.Server.GUcrZapisySaldokontoAsync", function (o, result) {
                        console.log("GUcrZapisySaldokontoAsync done  ", this.id, result);
                        var notifikace_Stv = this.getNotification();
                        notifikace_Stv.update({ title: "Hotovo", icon: "fa-globe", content: "jres:30250286" }); //RC 30250286 : Hotovo
                    })
                        .on("fail", "Gordic.Ucr.Server.GUcrZapisySaldokontoAsync", function (o, exc) {
                        console.log("GUcrZapisySaldokontoAsync fail  ", this.id, exc);
                        var notifikace_Stv = this.getNotification();
                        notifikace_Stv.update({ title: "Chyba", icon: "fa-globe", content: "jres:30250287" }); //RC 30250287 : Nedokončeno
                        GDlg.showException(exc.exception);
                    })
                        .on("always", "Gordic.Ucr.Server.GUcrZapisySaldokontoAsync", function () {
                        console.log("GUcrZapisySaldokontoAsync always", this.id);
                        this.clean();
                    });
                }
                /**
                 * registrace handleru pro archivace knih
                 *
                 * */
                VytvoritDavkuHandler() {
                    var that = this;
                    Gordic.Async.GTaskManager.on("change", "Gordic.Ucr.Server.GUcrVytvoritDavkuAsync", function (o) {
                        console.log("GInuStavyAsync change", o);
                        if (o.progress)
                            this.getNotification().update({ progress: { current: o.progress.current, total: o.progress.total, text: o.progress.text } });
                    })
                        .on("init", "Gordic.Ucr.Server.GUcrVytvoritDavkuAsync", function (o, result) {
                        var notifikace_Stv = new GObservableObject({ title: "Informace", icon: "fa-globe", content: "jres:30250288" }); //RC 30250288 : Start načítání
                        that.notification("add", notifikace_Stv, true);
                        this.setNotification(notifikace_Stv);
                    })
                        .on("done", "Gordic.Ucr.Server.GUcrVytvoritDavkuAsync", function (o, result) {
                        console.log("GUcrVytvoritDavkuAsync done  ", this.id, result);
                        var notifikace_Stv = this.getNotification();
                        notifikace_Stv.update({ title: "Hotovo", icon: "fa-globe", content: "jres:30250286" }); //RC 30250286 : Hotovo
                    })
                        .on("fail", "Gordic.Ucr.Server.GUcrVytvoritDavkuAsync", function (o, exc) {
                        console.log("GUcrVytvoritDavkuAsync fail  ", this.id, exc);
                        var notifikace_Stv = this.getNotification();
                        notifikace_Stv.update({ title: "Chyba", icon: "fa-globe", content: "jres:30250287" }); //RC 30250287 : Nedokončeno
                        GDlg.showException(exc.exception);
                    })
                        .on("always", "Gordic.Ucr.Server.GUcrVytvoritDavkuAsync", function () {
                        console.log("GUcrVytvoritDavkuAsync always", this.id);
                        this.clean();
                    });
                }
                showScheduledEventList() {
                    //TODO: Do gui.webcontrols napsat rozsireni pro GContentBase, ktere bude mit i navigate task
                    let options = {
                        idUdaFilter: 'ucr_uda_genrepo',
                        addBasicIdUdaFilter: true,
                        reportSchedulerClassName: "Gordic.Ucr.WebClient.Reports.GUcrReportScheduler",
                        createDetail: (cnt, dto) => { return new WebClient.GUcrReportScheduler(cnt, { data: dto }); },
                        editCiziODL: this.globals.Rad_EditCiziODL,
                        zrusCiziODL: this.globals.Rad_ZrusCiziODL
                    };
                    this.navigateTask(Gordic.Report.WebClient.GReportScheduleListControl, options);
                }
                /** Otestovani konkurenceschopnosti generovani sestavy vs async task */
                runTestAsyncTask() {
                    if (!this.prop("debugMode"))
                        return;
                    Gordic.Async.GTaskManager.on("change", "Gordic.Uka.Server.GNeverEndingAsyncTask", function (o) {
                        if (!o.progress)
                            return;
                        console.log("GNeverEndingAsyncTask data, smlouvy, result ", o.progress.data, o.progress.smlouvy, o.result, o);
                    });
                    var startedAt = new Date().toISOString();
                    var t = Gordic.Async.GTaskManager.start("Gordic.Uka.Server.GNeverEndingAsyncTask", name + " " + startedAt);
                }
                /**
                 * Zobrazeni prim. dokladu
                 * @param ixp
                 */
                showPrimDoklad(ixp) {
                    this.log.trace("Start showPrimDoklad MainApp");
                    // test na vyplnenini ixp
                    if (typeof ixp === "undefined" || ixp === null)
                        return;
                    Gordic.Wfl.Dialogs.DetailDokumentuSpisu(this, { SimpleMode: false, /*IxpInitProVazbuSouvisejicich: ixp!,*/ DetailDto: { ixp: ixp } }, Gordic.Global.Enums.ModOtevreni.auto);
                }
            };
            GMainApp = __decorate([
                Decorators.gcontent
            ], GMainApp);
            WebClient.GMainApp = GMainApp;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbkFwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1haW5BcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQW15QmY7QUFueUJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQW15Qm5CO0lBbnlCZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBbXlCN0I7UUFueUJvQixXQUFBLFNBQVM7WUFDMUIscUNBQXFDO1lBRXJDLFdBQVc7WUFFWCxJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFTLFNBQVEsT0FBQSxZQUFZO2dCQW1CdEMsY0FBYyxDQUFDLElBQUk7b0JBRWYsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO29CQUNqQixJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7b0JBTTlDLGlCQUFpQjtvQkFDakIscUNBQXFDO29CQUNyQyxxRkFBcUY7b0JBQ3JGLFdBQVc7b0JBQ1gsb0RBQW9EO29CQUNwRCxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztvQkFFckMsMENBQTBDO29CQUMxQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztvQkFFNUIsd0JBQXdCO29CQUN4Qix3QkFBd0I7b0JBQ3hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDO3dCQUN0QyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBa0IsQ0FBQyxDQUFDLGlDQUFpQzs2QkFDMUksTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBLDREQUE0RDs2QkFDbkYsUUFBUSxDQUFDLFFBQVEsRUFBRTs0QkFDaEIsSUFBSSxFQUFFLGNBQWM7NEJBQ3BCLEtBQUssRUFBRSw0REFBNEQ7NEJBQ25F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QU8sRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtnQ0FDM0YsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFO2dDQUMzRixPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7Z0NBQzNGLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtnQ0FDM0YsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFO2dDQUN0RixNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVB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LEdBQUcsS0FBSyxJQUFJO3dCQUFFLE9BQU07b0JBR3JELE9BQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLHVDQUF1QyxDQUFDLFNBQVMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFJLEVBQUUsRUFBRSxFQUFFLE9BQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRXBLLENBQUM7YUFDSixDQUFBO1lBeHhCWSxRQUFRO2dCQURwQixVQUFVLENBQUMsUUFBUTtlQUNQLFFBQVEsQ0F3eEJwQjtZQXh4Qlksa0JBQVEsV0F3eEJwQixDQUFBO1FBTUwsQ0FBQyxFQW55Qm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQW15QjdCO0lBQUQsQ0FBQyxFQW55QmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQW15Qm5CO0FBQUQsQ0FBQyxFQW55QlMsTUFBTSxLQUFOLE1BQU0sUUFteUJmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5VY3IuV2ViQ2xpZW50IHtcclxuICAgIC8vdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICAvL0BnY29udGVudFxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHTWFpbkFwcCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG5cclxuICAgICAgICB0aXRsZTogXCJHb3JkaWMuVWNyLk1haW5BcHBcIjtcclxuICAgICAgICAvKiogUGFyYW1ldHJ5IHNlc3RhdnkgbmEgZGFzaGJvYXJkICovXHJcbiAgICAgICAgcHJpdmF0ZSBla29Sb2s6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIGdsb2JhbHM6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkR0by5HVWNyR2xvYmFsc0R0bztcclxuICAgICAgICBwcml2YXRlIGRhc2hib2FyZEFjdGlvbk5hbWU6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIERlYnVnT3JEZXZlbG9wVmVyc2lvbj86IGJvb2xlYW47XHJcbiAgICAgICAgLyoqIHphc29ibmlrIHVsb3plbnljaCBmaWx0cnUgKi9cclxuICAgICAgICBwdWJsaWMgdWxvemVuZUZpbHRyeUdyaWQ6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JGaWx0ZXJEdG87XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogaWRlbnRpZmlrYXRvciB1Y2V0bmlobyByb3p2cmh1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGl4c1Jvejogc3RyaW5nO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGlkZW50aWZpa2F0b3IgU2F4XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGl4c1NheDogc3RyaW5nO1xyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KGFyZ3MpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBzdHJQb3Bpc0RlZiA9IEdvcmRpYy5VY3IuR2xvYmFscy5TdHJQb3BpcztcclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvLyBkb2NpdGFuZSBjYWNoZVxyXG4gICAgICAgICAgICAvLyBUT0RPOiBwcmlkYXQgcG9kbWlua3UsIGtkeSBuYWNpdGF0XHJcbiAgICAgICAgICAgIC8vR29yZGljLkVrby5XZWJDbGllbnQuRGF0YVNlbnRlbmNlQWRhcHRlci5nZXRDYWNoZUNvbnRlbnQodGhpcy5peHNSb3osIHRoaXMuaXhzU2F4KTtcclxuICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgLy8gcmVnaXN0cmFjZSBoYW5kbGVydSBwcm8gYXJjaGl2YWNlIGtuaWggICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLlNhbGRva29udG9TZXpuYW1aYXBpc3VIYW5kbGVyKCk7XHJcblxyXG4gICAgICAgICAgICAvLyByZWdpc3RyYWNlIGhhbmRsZXJ1IHBybyB2eXR2b3JlbmkgZGF2a3lcclxuICAgICAgICAgICAgdGhpcy5WeXR2b3JpdERhdmt1SGFuZGxlcigpO1xyXG5cclxuICAgICAgICAgICAgLy8gVXppdmF0ZWxza2UgbmFzdGF2ZW5pXHJcbiAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICBHb3JkaWMuV2ViQXBwLmdsb2JhbFNldHRpbmdGb3Jtcy5yZWdpc3RlcihbXHJcbiAgICAgICAgICAgICAgICBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIkZvb29cIiwgdGFiT3B0aW9uczogeyB0aXRsZTogXCJqcmVzOjMwMjUwNTYyXCIsIG9wZW5lZDogdHJ1ZSB9IH0gYXMgR0Zvcm1PcHRpb25zKSAvL1JDIDMwMjUwNTYyIDogWsOhcGlzeSDDusSNZXRuaWN0dsOtXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzExMDAyNDBcIikvL1JDIDMxMTAwMjQwIDogTmHEjcOtdGF0IHZ5YnJhbsOpIMO6ZGFqZSBzdHJ1a3R1cm92YW7DqWhvIHBvcGlzdVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3RyUG9waXNBdXRvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImNvbnRlbnRzLnVjdFphcGlzeSMucm96c2lyZW55UG9waXNBdXRvQWRkR3JpZENvbHVtbnM9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxGcm9tUm93OiBcImFsd2F5c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTEwMDIzOVwiKSAvL1JDIDMxMTAwMjM5IDogw5pkYWplIHN0cnVrdHVyb3ZhbsOpaG8gcG9waXN1XHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3RyUG9waXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiY29udGVudHMudWN0WmFwaXN5Iy5yb3pzaXJlbnlQb3Bpc1Nob3dHcmlkQ29sdW1ucz12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6ICh2Pzogc3RyaW5nW10pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdikgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdi5qb2luKFwiLFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRvb2x0aXBUZW1wbGF0ZTogKHYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdiB8fCAhdi5sZW5ndGgpIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHMgPSBcIjx0YWJsZT5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHJQb3BpcyA9IHN0clBvcGlzRGVmLmZpbmQoKHApID0+IHsgcmV0dXJuIHAua2xpYyA9PT0gdltpXTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdHJQb3BpcykgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcyArPSBgPHRyPjx0ZD4ke3N0clBvcGlzLmtsaWN9PC90ZD48dGQ+LSAke3N0clBvcGlzLmtsaWNfdHh0fTwvdGQ+PC90cj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcyArPSBcIjwvdGFibGU+XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY0lucHV0OiBcImhpZGRlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGQgPSAkLkRlZmVycmVkPHN0cmluZ1tdPigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuVWNyLldlYkNsaWVudC5QcmVmYWJzLkdTdHJ1a3R1cm92YW55UG9waXNGaWx0ZXJTZWxlY3Rvciwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHN0clBvcGlzRGVmLCAvL05PVEU6IEpzb3UtbGkgZGF0YSB1bmRlZmluZWQsIGNvbnRlbnQgc2kgamUgbG9hZG5lIHNhbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmaWVsZC5nZmllbGQoXCJnZXRWYWx1ZVwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInN0clBvcGlzU2V0dGluZ3MjXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHsgdGl0bGU6IFwianJlczozMTEwMDIzOVwiIH0pIC8vUkMgMzExMDAyMzkgOiDDmmRhamUgc3RydWt0dXJvdmFuw6lobyBwb3Bpc3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHI/OiBHb3JkaWMuVWNyLldlYkNsaWVudC5QcmVmYWJzLkdTdHJ1a3R1cm92YW55UG9waXNGaWx0ZXJTZWxlY3Rvck9wdGlvbnNPdXRwdXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHI/LnNlbGVjdGVkKSBkLnJlc29sdmUocj8uc2VsZWN0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGQucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDU2M1wiKS8vUkMgMzAyNTA1NjMgOiBOYcSNw610YXQgw7pkYWplIG8gZXh0ZXJuw61tIHN1Ympla3R1XHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlc3VBdXRvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImNvbnRlbnRzLnVjdFphcGlzeSMuZXN1QWRkR3JpZENvbHVtbnM9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxGcm9tUm93OiBcImFsd2F5c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDYxOFwiKS8vUkMgMzAyNTA2MTggOiBOYcSNw610YXQgc3RydWt0dXJvdmFuw70gcG9waXMgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3RyUG9waXNEb2tsYWR1QXV0b1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJjb250ZW50cy51Y3RaYXBpc3kjLnN0cnVrdHVyb3ZhbnlQb3Bpc0Rva2xhZHVBdXRvQWRkR3JpZENvbHVtbnM9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxGcm9tUm93OiBcImFsd2F5c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiRm9vb1JvenBvY3R1XCIsIHRhYk9wdGlvbnM6IHsgdGl0bGU6IFwianJlczozMDI1MDY4M1wiLCBvcGVuZWQ6IHRydWUgfSB9IGFzIEdGb3JtT3B0aW9ucykgLy9SQyAzMDI1MDY4MyA6IFrDoXBpc3kgcm96cG/EjXR1XHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTA2MThcIikvL1JDIDMwMjUwNjE4IDogTmHEjcOtdGF0IHN0cnVrdHVyb3ZhbsO9IHBvcGlzIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0clBvcGlzRG9rbGFkdUF1dG9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiY29udGVudHMucm96WmFwaXN5Iy5zdHJ1a3R1cm92YW55UG9waXNEb2tsYWR1QXV0b0FkZEdyaWRDb2x1bW5zPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsRnJvbVJvdzogXCJhbHdheXNcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICAvL0dvcmRpYy5XZWJBcHAuZ2xvYmFsU2V0dGluZ0Zvcm1zLnJlZ2lzdGVyKFtcclxuICAgICAgICAgICAgLy8gICAgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJGb29vUm96cG9jdHVcIiwgdGFiT3B0aW9uczogeyB0aXRsZTogXCJqcmVzOjMwMjUwNjgzXCIsIG9wZW5lZDogdHJ1ZSB9IH0gYXMgR0Zvcm1PcHRpb25zKSAvL1JDIDMwMjUwNjgzIDogWsOhcGlzeSByb3pwb8SNdHVcclxuICAgICAgICAgICAgLy8gICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwNjE4XCIpLy9SQyAzMDI1MDYxOCA6IE5hxI3DrXRhdCBzdHJ1a3R1cm92YW7DvSBwb3BpcyBkb2tsYWR1XHJcbiAgICAgICAgICAgIC8vICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIG5hbWU6IFwic3RyUG9waXNEb2tsYWR1QXV0b1wiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIG1vZGVsOiBcImNvbnRlbnRzLnJvelphcGlzeSMuc3RydWt0dXJvdmFueVBvcGlzRG9rbGFkdUF1dG9BZGRHcmlkQ29sdW1ucz12YWx1ZVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGxhYmVsRnJvbVJvdzogXCJhbHdheXNcIiBcclxuICAgICAgICAgICAgLy8gICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAvL10pO1xyXG4gICAgICAgICAgICAvLyB0ZXh0eSB6IHJvenZyaHVcclxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIEdvcmRpYy5XZWJBcHAuZ2xvYmFsU2V0dGluZ0Zvcm1zLnJlZ2lzdGVyKFtcclxuICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwidHh0WlJvdnJodVwiLCB0YWJPcHRpb25zOiB7IHRpdGxlOiBcImpyZXM6MzAyNTA1ODhcIiwgb3BlbmVkOiB0cnVlIH0gfSBhcyBHRm9ybU9wdGlvbnMpIC8vUkMgMzAyNTA1ODggOiBUZXh0eSB6IHJvenZyaHVcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDU4OVwiKS8vUkMgMzAyNTA1ODkgOiBab2JyYXppdCB2eWJyYW7DqSB0ZXh0eSB6IHJvenZyaHVcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNob3dUZXh0eVpSb3p2cmh1Q29sdW1uc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuVWNyLkFwcFNldHRpbmdzLlVjdFNldHRpbmdzRm9ybS5zaG93VGV4dHlaUm96dnJodUNvbHVtbnM9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9tb2RlbDogXCJjb250ZW50cy51Y3RaYXBpc3kjLnNob3dUZXh0eVpSb3p2cmh1Q29sdW1ucz12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbEZyb21Sb3c6IFwiYWx3YXlzXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwNjAxXCIpLy9SQyAzMDI1MDYwMSA6IEF1dG9tYXRpY2t5IG5hxI3DrXN0XHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhdXRvTG9hZFRleHR5WlJvenZyaHVDb2x1bW5zXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIkdsb2JhbC5VY3IuQXBwU2V0dGluZ3MuVWN0U2V0dGluZ3NGb3JtLmF1dG9Mb2FkVGV4dHlaUm96dnJodUNvbHVtbnM9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9tb2RlbDogXCJjb250ZW50cy51Y3RaYXBpc3kjLnNob3dUZXh0eVpSb3p2cmh1Q29sdW1ucz12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbEZyb21Sb3c6IFwiYWx3YXlzXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwNTg3XCIpLy9SQyAzMDI1MDU4NyA6IFRleHR5IHogcm96dnJodSBzIGhvZG5vdG91IHNsb3ZhXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ3b3JkV2l0aE51bWJlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuVWNyLkFwcFNldHRpbmdzLlVjdFNldHRpbmdzRm9ybS53b3JkV2l0aE51bWJlcj12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL21vZGVsOiBcImNvbnRlbnRzLnVjdFphcGlzeSMud29yZFdpdGhOdW1iZXI9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxGcm9tUm93OiBcImFsd2F5c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlZ5YnJhbsOhIHNsb3ZhIMO6xI1ldG7DrWhvIHJvenZyaHVcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDU5MFwiKSAvL1JDIDMwMjUwNTkwIDogWsOhcGlzeSDDusSNZXRuaWN0dsOtXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2VsZWN0ZWRXb3Jkc1Nob3dHcmlkQ29sdW1uc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL21vZGVsOiBcIkdsb2JhbC5VY3IuQXBwU2V0dGluZ3MuVWN0U2V0dGluZ3NGb3JtLnNlbGVjdGVkV29yZHNTaG93R3JpZENvbHVtbnM9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiY29udGVudHMudWN0WmFwaXN5Iy5zZWxlY3RlZFdvcmRzU2hvd0dyaWRDb2x1bW5zPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaXRlbVRlbXBsYXRlOiAodj86IHN0cmluZ1tdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICghdikgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiB2LmpvaW4oXCIsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKHY/OiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2KSByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ID0gdiBhcyBHU2xvdmFSb3p2cmhGaWx0ZXJEdG9bXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBsdXMgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB2W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBwbHVzICsgaXRlbS5rbGljO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsdXMgPSBcIixcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1Ub29sdGlwVGVtcGxhdGU6ICh2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXYgfHwgIXYubGVuZ3RoKSByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHQgPSB2IGFzIEdTbG92YVJvenZyaEZpbHRlckR0b1tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHMgPSBcIjx0YWJsZT5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IHdvcmRSb3p2cmggPSB3b3Jkc1JvenZyaC5maW5kKChwKSA9PiB7IHJldHVybiBwLmtsaWMgPT09IHRbaV0ua2xpYzsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoIXdvcmRSb3p2cmgpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gYDx0cj48dGQ+JHt0W2ldLmtsaWN9PC90ZD48dGQ+LSAke3RbaV0ua2xpY190eHR9PC90ZD48L3RyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzICs9IFwiPC90YWJsZT5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmFwaGljSW5wdXQ6IFwiaGlkZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZCA9ICQuRGVmZXJyZWQ8c3RyaW5nW10+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGQgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5VY3IuV2ViQ2xpZW50LlByZWZhYnMuR1Nsb3ZhUm96dnJodUZpbHRlckZpbHRlclNlbGVjdG9yLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdW5kZWZpbmVkLCAvL05PVEU6IEpzb3UtbGkgZGF0YSB1bmRlZmluZWQsIGNvbnRlbnQgc2kgamUgbG9hZG5lIHNhbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmaWVsZC5nZmllbGQoXCJnZXRWYWx1ZVwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIndvcmRzUm96dnJoU2V0dGluZ3MjXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHsgdGl0bGU6IFwianJlczozMDI1MDU5MVwiIH0pIC8vUkMgMzAyNTA1OTEgOiBTbG92YSDDusSNZXRuw61obyByb3p2cmh1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByPzogR29yZGljLlVjci5XZWJDbGllbnQuUHJlZmFicy5HU2xvdmFSb3p2cmh1RmlsdGVyU2VsZWN0b3JPcHRpb25zT3V0cHV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyPy5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yPy5zZWxlY3RlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kLnJlc29sdmUocj8uc2VsZWN0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZC5yZXNvbHZlKHI/LnNlbGVjdGVkIGFzIHN0cmluZ1tdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGQucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDU5OFwiKSAvL1JDIDMwMjUwNTk4IDogU3Rhdnkgw7rEjWV0bmljdHbDrVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNlbGVjdGVkV29yZHNTaG93R3JpZENvbHVtbnNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9tb2RlbDogXCJHbG9iYWwuVWNyLkFwcFNldHRpbmdzLlVjdFNldHRpbmdzRm9ybS5zZWxlY3RlZFdvcmRzU2hvd0dyaWRDb2x1bW5zPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImNvbnRlbnRzLnVjdFN0YXZ5Iy5zZWxlY3RlZFdvcmRzU2hvd0dyaWRDb2x1bW5zPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaXRlbVRlbXBsYXRlOiAodj86IHN0cmluZ1tdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICghdikgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiB2LmpvaW4oXCIsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKHY/OiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2KSByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ID0gdiBhcyBHU2xvdmFSb3p2cmhGaWx0ZXJEdG9bXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBsdXMgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB2W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBwbHVzICsgaXRlbS5rbGljO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsdXMgPSBcIixcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1Ub29sdGlwVGVtcGxhdGU6ICh2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXYgfHwgIXYubGVuZ3RoKSByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHQgPSB2IGFzIEdTbG92YVJvenZyaEZpbHRlckR0b1tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHMgPSBcIjx0YWJsZT5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IHdvcmRSb3p2cmggPSB3b3Jkc1JvenZyaC5maW5kKChwKSA9PiB7IHJldHVybiBwLmtsaWMgPT09IHRbaV0ua2xpYzsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoIXdvcmRSb3p2cmgpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gYDx0cj48dGQ+JHt0W2ldLmtsaWN9PC90ZD48dGQ+LSAke3RbaV0ua2xpY190eHR9PC90ZD48L3RyPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzICs9IFwiPC90YWJsZT5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmFwaGljSW5wdXQ6IFwiaGlkZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZCA9ICQuRGVmZXJyZWQ8c3RyaW5nW10+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGQgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5VY3IuV2ViQ2xpZW50LlByZWZhYnMuR1Nsb3ZhUm96dnJodUZpbHRlckZpbHRlclNlbGVjdG9yLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdW5kZWZpbmVkLCAvL05PVEU6IEpzb3UtbGkgZGF0YSB1bmRlZmluZWQsIGNvbnRlbnQgc2kgamUgbG9hZG5lIHNhbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmaWVsZC5nZmllbGQoXCJnZXRWYWx1ZVwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIndvcmRzUm96dnJoU2V0dGluZ3MjXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHsgdGl0bGU6IFwianJlczozMDI1MDU5MVwiIH0pIC8vUkMgMzAyNTA1OTEgOiBTbG92YSDDusSNZXRuw61obyByb3p2cmh1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByPzogR29yZGljLlVjci5XZWJDbGllbnQuUHJlZmFicy5HU2xvdmFSb3p2cmh1RmlsdGVyU2VsZWN0b3JPcHRpb25zT3V0cHV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyPy5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yPy5zZWxlY3RlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kLnJlc29sdmUocj8uc2VsZWN0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZC5yZXNvbHZlKHI/LnNlbGVjdGVkIGFzIHN0cmluZ1tdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGQucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDU5OVwiKSAvL1JDIDMwMjUwNTk5IDogWsOhcGlzeSByb3pwb8SNdHVcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzZWxlY3RlZFdvcmRzU2hvd0dyaWRDb2x1bW5zXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbW9kZWw6IFwiR2xvYmFsLlVjci5BcHBTZXR0aW5ncy5VY3RTZXR0aW5nc0Zvcm0uc2VsZWN0ZWRXb3Jkc1Nob3dHcmlkQ29sdW1ucz12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJjb250ZW50cy5yb3paYXBpc3kjLnNlbGVjdGVkV29yZHNTaG93R3JpZENvbHVtbnM9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pdGVtVGVtcGxhdGU6ICh2Pzogc3RyaW5nW10pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKCF2KSByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIHYuam9pbihcIixcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiAodj86IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXYpIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHQgPSB2IGFzIEdTbG92YVJvenZyaEZpbHRlckR0b1tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGx1cyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHYubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHZbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IHBsdXMgKyBpdGVtLmtsaWM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGx1cyA9IFwiLFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRvb2x0aXBUZW1wbGF0ZTogKHYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdiB8fCAhdi5sZW5ndGgpIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdCA9IHYgYXMgR1Nsb3ZhUm96dnJoRmlsdGVyRHRvW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcyA9IFwiPHRhYmxlPlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgd29yZFJvenZyaCA9IHdvcmRzUm96dnJoLmZpbmQoKHApID0+IHsgcmV0dXJuIHAua2xpYyA9PT0gdFtpXS5rbGljOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmICghd29yZFJvenZyaCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcyArPSBgPHRyPjx0ZD4ke3RbaV0ua2xpY308L3RkPjx0ZD4tICR7dFtpXS5rbGljX3R4dH08L3RkPjwvdHI+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gXCI8L3RhYmxlPlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBoaWNJbnB1dDogXCJoaWRkZW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkID0gJC5EZWZlcnJlZDxzdHJpbmdbXT4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZCA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlVjci5XZWJDbGllbnQuUHJlZmFicy5HU2xvdmFSb3p2cmh1RmlsdGVyRmlsdGVyU2VsZWN0b3IsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB1bmRlZmluZWQsIC8vTk9URTogSnNvdS1saSBkYXRhIHVuZGVmaW5lZCwgY29udGVudCBzaSBqZSBsb2FkbmUgc2FtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZpZWxkLmdmaWVsZChcImdldFZhbHVlXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwid29yZHNSb3p2cmhTZXR0aW5ncyNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgeyB0aXRsZTogXCJqcmVzOjMwMjUwNTkxXCIgfSkgLy9SQyAzMDI1MDU5MSA6IFNsb3ZhIMO6xI1ldG7DrWhvIHJvenZyaHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHI/OiBHb3JkaWMuVWNyLldlYkNsaWVudC5QcmVmYWJzLkdTbG92YVJvenZyaHVGaWx0ZXJTZWxlY3Rvck9wdGlvbnNPdXRwdXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHI/LnNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3I/LnNlbGVjdGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2QucmVzb2x2ZShyPy5zZWxlY3RlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkLnJlc29sdmUocj8uc2VsZWN0ZWQgYXMgc3RyaW5nW10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgZC5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwNjAwXCIpIC8vUkMgMzAyNTA2MDAgOiBTdGF2eSByb3pwb8SNdHVcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzZWxlY3RlZFdvcmRzU2hvd0dyaWRDb2x1bW5zXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbW9kZWw6IFwiR2xvYmFsLlVjci5BcHBTZXR0aW5ncy5VY3RTZXR0aW5nc0Zvcm0uc2VsZWN0ZWRXb3Jkc1Nob3dHcmlkQ29sdW1ucz12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJjb250ZW50cy5yb3pTdGF2eSMuc2VsZWN0ZWRXb3Jkc1Nob3dHcmlkQ29sdW1ucz12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2l0ZW1UZW1wbGF0ZTogKHY/OiBzdHJpbmdbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAoIXYpIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4gdi5qb2luKFwiLFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6ICh2PzogYW55W10pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdikgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdCA9IHYgYXMgR1Nsb3ZhUm96dnJoRmlsdGVyRHRvW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwbHVzID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdltpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gcGx1cyArIGl0ZW0ua2xpYztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVzID0gXCIsXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtVG9vbHRpcFRlbXBsYXRlOiAodikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2IHx8ICF2Lmxlbmd0aCkgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ID0gdiBhcyBHU2xvdmFSb3p2cmhGaWx0ZXJEdG9bXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzID0gXCI8dGFibGU+XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHYubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2xldCB3b3JkUm96dnJoID0gd29yZHNSb3p2cmguZmluZCgocCkgPT4geyByZXR1cm4gcC5rbGljID09PSB0W2ldLmtsaWM7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKCF3b3JkUm96dnJoKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzICs9IGA8dHI+PHRkPiR7dFtpXS5rbGljfTwvdGQ+PHRkPi0gJHt0W2ldLmtsaWNfdHh0fTwvdGQ+PC90cj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcyArPSBcIjwvdGFibGU+XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY0lucHV0OiBcImhpZGRlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGQgPSAkLkRlZmVycmVkPHN0cmluZ1tdPigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuVWNyLldlYkNsaWVudC5QcmVmYWJzLkdTbG92YVJvenZyaHVGaWx0ZXJGaWx0ZXJTZWxlY3Rvciwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHVuZGVmaW5lZCwgLy9OT1RFOiBKc291LWxpIGRhdGEgdW5kZWZpbmVkLCBjb250ZW50IHNpIGplIGxvYWRuZSBzYW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmllbGQuZ2ZpZWxkKFwiZ2V0VmFsdWVcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ3b3Jkc1JvenZyaFNldHRpbmdzI1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7IHRpdGxlOiBcImpyZXM6MzAyNTA1OTFcIiB9KSAvL1JDIDMwMjUwNTkxIDogU2xvdmEgw7rEjWV0bsOtaG8gcm96dnJodVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcj86IEdvcmRpYy5VY3IuV2ViQ2xpZW50LlByZWZhYnMuR1Nsb3ZhUm96dnJodUZpbHRlclNlbGVjdG9yT3B0aW9uc091dHB1dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocj8uc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcj8uc2VsZWN0ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZC5yZXNvbHZlKHI/LnNlbGVjdGVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQucmVzb2x2ZShyPy5zZWxlY3RlZCBhcyBzdHJpbmdbXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBkLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gSW5mb3BhbmVsIC0gbmFzdGF2ZW5pIHNlc3RhdnkgbmEgdXZvZG5pIHN0cmFuY2VcclxuXHJcbiAgICAgICAgICAgIC8vTk9URTogSW5zcGlyYWNlOiBVY3IuV2luQ2xpZW50L01vZHVsZUZvcm0vR29yZGljLnVjci5XaW5DbGllbnQuR1Vjck1vZHVsZUZvcm0uY3MsIG1ldG9kYSBOYXN0YXZCYWNrUGFuZWwoKVxyXG5cclxuICAgICAgICAgICAgR29yZGljLldlYkFwcC5nbG9iYWxTZXR0aW5nRm9ybXMucmVnaXN0ZXIoW1xyXG4gICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJpbmZvcGFuZWxcIiwgdGFiT3B0aW9uczogeyB0aXRsZTogXCJqcmVzOjMxMTAwMjcyXCIsIG9wZW5lZDogdHJ1ZSB9IH0gYXMgR0Zvcm1PcHRpb25zKSAvL1JDIDMxMTAwMjcyIDogSW5mb3BhbmVsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8uYWRkUm93KFwianJlczozMTEwMDI3M1wiKSAvL1JDIDMxMTAwMjczIDogVsO9YsSbciBpbmZvcGFuZWx1XHJcbiAgICAgICAgICAgICAgICAgICAgLy8uYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5yZXBvcnRzKHsgcmVwb3J0c09wdGlvbnM6IHsgVGVtYTogXCJ1Y3JfcHRtX2luZm9cIiB9IH0pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJpbmZvcGFuZWxcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBtb2RlbDogXCJHbG9iYWwudWNyLmluZm9wYW5lbC5yZXBvcnRJZD12YWx1ZS5yZXBvcnRJZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTEwMDI3NFwiKSAvL1JDIDMxMTAwMjc0IDogTcSbc8OtY1xyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnVjck1lc2ljKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtZXNpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwudWNyLmluZm9wYW5lbC5tZXNpYz12YWx1ZS5tZXNpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHsgbWVzaWM6IDIwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2s6IHRoaXMuZWtvUm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHNldWRvOiAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwicmVnaXN0clBaXCIsIHRhYk9wdGlvbnM6IHsgdGl0bGU6IFwianJlczozMDI1MDIxOVwiLCBvcGVuZWQ6IHRydWUgfSB9IGFzIEdGb3JtT3B0aW9ucykgLy9SQyAzMDI1MDIxOSA6IFJlZ2lzdHIgUC9aXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAyMjBcIikgLy9SQyAzMDI1MDIyMCA6IFDFmWVkcGxuxJtuw60gbcSbc8OtY2VcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcmVkdm9sYmFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntwb3Bpc31cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiR2xvYmFsLnVjci5yZWdpc3RyUFoubWVzaWM9dmFsdWUucHJlZHZvbGJhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFt7IHBvcGlzOiBcImpyZXM6MzAyNTAyMjFcIiwgcHJlZHZvbGJhOiAwIH0gLy9SQyAzMDI1MDIyMSA6IE5lcMWZZWRwbMWIb3ZhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB7IHBvcGlzOiBcImpyZXM6MzAyNTAyMjJcIiwgcHJlZHZvbGJhOiAxMCB9IC8vUkMgMzAyNTAyMjIgOiBBa3R1w6FsbsOtIG3Em3PDrWNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgeyBwb3BpczogXCJqcmVzOjMwMjUwMjIzXCIsIHByZWR2b2xiYTogMjAgfSAvL1JDIDMwMjUwMjIzIDogTWluLiBvdGV2xZllbsO9IG3Em3PDrWNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgeyBwb3BpczogXCJqcmVzOjMwMjUwMjI0XCIsIHByZWR2b2xiYTogMzAgfSAvL1JDIDMwMjUwMjI0IDogTWF4LiBvdGV2xZllbsO9IG3Em3PDrWNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgeyBwb3BpczogXCJqcmVzOjMwMjUwMjI1XCIsIHByZWR2b2xiYTogNDAgfSAvL1JDIDMwMjUwMjI1IDogTWF4LiB1emF2xZllbsO9IG3Em3PDrWNcclxuICAgICAgICAgICAgICAgICAgICAgICAgXSwgeyBrZXk6IFwicHJlZHZvbGJhXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBpbml0aWFsVmFsdWU6IHsgcHJlZHZvbGJhOiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICwgR29yZGljLkVrby5VdGlscy5Vc2VyU2V0dGluZ3NMaXN0KFwiR2xvYmFsLlVjci5BcHBTZXR0aW5nc1wiKVxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFN1bWFyaXphY2VcclxuICAgICAgICAgICAgR29yZGljLldlYkFwcC5nbG9iYWxTZXR0aW5nRm9ybXMucmVnaXN0ZXIoW1xyXG4gICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJzdW1hcml6YWNlXCIsIHRhYk9wdGlvbnM6IHsgdGl0bGU6IFwianJlczozMDQ1MDAxN1wiLCBvcGVuZWQ6IHRydWUgfSB9IGFzIEdGb3JtT3B0aW9ucykgIC8vUkMgMzA0NTAwMTcgOiBTdW1hcml6YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzA0NTAwMThcIikgLy9SQyAzMDQ1MDAxOCA6IE1haWwgbmEgYXV0b21hdFxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN1bWFyaXphY2VfbWFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuVWNyLkFwcFNldHRpbmdzLlVjdFNldHRpbmdzRm9ybS5zdW1hcml6YWNlX21haWw9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLCBHb3JkaWMuRWtvLlV0aWxzLlVzZXJTZXR0aW5nc0xpc3QoXCJHbG9iYWwuVWNyLkFwcFNldHRpbmdzXCIpXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gUHJvIGRlYnVnIGxvdmVuaSBmb2N1c3VcclxuXHJcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikub24oXCJmb2N1c2luXCIsIGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhcImFjdGl2ZUVsZW1lbnRcIiwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgIC8vIHBva3VkIG5lbmkgbmFzdGF2ZW5hIHBvc2xlZG5pIGFrY2UsIHNwdXN0aSBzZSBkZWZhdWx0bmkgYWtjZVxyXG4gICAgICAgICAgICAvLyBkYXNoYm9hcmRcclxuICAgICAgICAgICAgdGhpcy5kZWZpbmVEYXNoQm9hcmQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50XHJcbiAgICAgICAgICAgICAgICAub2ZmKFwiLnVjckN0eENoYW5nZXNcIilcclxuICAgICAgICAgICAgICAgIC5vbihcInNhdmVBY3Rpb24udWNyQ3R4Q2hhbmdlc1wiLCAoZXYsIG86IHsgbGFzdEFjdGlvbjogc3RyaW5nIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0QWN0aW9uID0gbz8ubGFzdEFjdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdEFjdGlvbiAmJiAhdGhpc1tcInNraXBTYXZlQWN0aW9uXCJdICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbFNldHRpbmdzPy5zZXQoXCJjb250ZW50cy5tYWluLmxhc3RBY3Rpb25cIiwgbGFzdEFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsU2V0dGluZ3M/LnNhdmUoKTsgLy8gdWxvemltZSBwb3NsZWRuaSBha2NpLCBrdGVyYSBieWxhIHNwdXN0ZW5hXHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXNbXCJza2lwU2F2ZUFjdGlvblwiXTsgLy8gc21hemVtZSBza2lwU2F2ZUFjdGlvbiwgYWJ5IHNlIHByaSBkYWxzaW0gc3B1c3RlbmkgemFzZSB1a2xhZGFsYSBwb3NsZWRuaSBha2NlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYWxlemVuaSBhIHNwdXN0ZW5pIHN0YXJ0b3ZhY2kgc3RyYW5reVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZXNvbHZlU3RhcnRQYWdlKCkge1xyXG4gICAgICAgICAgICBsZXQgbGFzdEFjdGlvbiA9IHRoaXMuZ2xvYmFsU2V0dGluZ3M/LmdldChcImNvbnRlbnRzLm1haW4ubGFzdEFjdGlvblwiKTtcclxuICAgICAgICAgICAgaWYgKGxhc3RBY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tsYXN0QWN0aW9uXT8ucnVuKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbFNldHRpbmdzPy5yZW1vdmUoXCJjb250ZW50cy5tYWluLmxhc3RBY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbFNldHRpbmdzPy5zYXZlKCk7IC8vIHNtYXplbWUgcG9zbGVkbmkgYWtjaSwga3RlcmEgYnlsYSBzcHVzdGVuYVxyXG4gICAgICAgICAgICAgICAgdGhpc1tcInNraXBTYXZlQWN0aW9uXCJdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1t0aGlzLmRhc2hib2FyZEFjdGlvbk5hbWVdPy5ydW4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBVemF2aXJhbmkgb2tuYVxyXG4gICAgICAgICogQHJldHVybnNcclxuICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBjbG9zaW5nKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmljZSBkYXNoYm9hcmR1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBkZWZpbmVEYXNoQm9hcmQoKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGN1c3RvbVByb3ZpZGVyID0gbmV3IEdvcmRpYy5EYXNoYm9hcmQuQ3VzdG9tUHJvdmlkZXIoXCJqcmVzOjMwMjUwNjM5XCIsIFwiZGFzaGJvYXJkXCIsICgpID0+IHsgLy9SQyAzMDI1MDYzOSA6IFbDvXNsZWRlayBIb3Nwb2RhxZllbsOtXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGFrdF9yb2sgPSB0aGF0LmdwYy5yb2s7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRhdF9kbnMgPSBuZXcgRGF0ZSgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRuZcWhbsOtIGRhdHVtXHJcbiAgICAgICAgICAgICAgICB2YXIgdl9yb2sgPSBkYXRfZG5zLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHZhciB2X21lc2ljID0gZGF0X2Rucy5nZXRNb250aCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFrdF9yb2sgPCB2X3Jvaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZfbWVzaWMgPSAxMjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgRGFzaEJvYXJkX0lTTF9WaWV3ID0gbmV3IEdvcmRpYy5Jc2wuVmlldyhcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Fa29EYXNoYm9hcmQuZ2V0RWtvRGFzaGJvYXJkRGF0YSh7IGZpbHRlcnM6IHsgcm9rOiBha3Rfcm9rLCBtZXNpYzogdl9tZXNpYyB9IH0pLnVzZSgocnEsIG5leHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy96bWVuYSBycVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dChycSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vdmFSZXNwb25zZSA9ICQuZXh0ZW5kKHt9LCByZXNwb25zZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy96bWVuYSByZXNwb25zZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvbGUgPSBbXSA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNpdGFjID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhLmZvckVhY2goKHJhZGVrX2RzaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRlayA9IHJhZGVrX2RzaC5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYWRlaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRlay5mb3JFYWNoKChyYWRla19kc2gpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgocmFkZWtfZHNoKSAmJiAocmFkZWtfZHNoLmRldGFpbHMpICYmIChyYWRla19kc2guZGV0YWlscy5sZW5ndGggPiAwKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdl9wb3BpcyA9IHJhZGVrX2RzaC50aXRsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRla19kc2gudGl0bGUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdGFjKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGVrX2RzaC50eXAgPT0gXCJUXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGVrX3BvbGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJzY29yZWNhcmREYXNoXCIgKyBjaXRhYy50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiPGI+XCIgKyB2X3BvcGlzICsgXCI8L2k+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlOiBcInZlcnRpY2FsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3pvbmU6IChjaXRhYyAlIDMpID09IDEgPyAwIDogKChjaXRhYyAlIDMpID09IDIgPyAxIDogMiksICAgICAgLy8gcm96aG96ZW5pIG5hIDMgem9ueSBwb3N0dXBuZSB6bGV2YSBkb3ByYXZhIGEgc2hvcmEgZG9sdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgem9uZTogY2l0YWMgPD0gNCA/IDAgOiBjaXRhYyA+PSA5ID8gMiA6IDEsIC8vIHJvemhvemVuaSBuYSAzIHpvbnkgcG9zdHVwbmUgc2hvcmEgZG9sdSBhIHpsZXZhIGRvcHJhdmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IEdvcmRpYy5QcmVmYWJzLlBhbmVscy5rcGlNdWx0aVJvd3NUZW1wbGF0ZSgpLml0ZW1UZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3ZlckVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogcmFkZWtfZHNoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy91c2VyU2V0dGluZ3M6IHRoaXMudXNlclNldHRpbmdzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYWRla19wb2xlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9sZS5wdXNoKHJhZGVrX3BvbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGVrX2RzaC50eXAgPT0gXCJHXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbF9kZWxrYSA9IDMwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsX3ZhbDEgPSBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMubnVtYmVyKHBhcnNlRGVjaW1hbChyYWRla19kc2guZGV0YWlsc1swXS52YWx1ZSEpLCBcIkNcIikudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbF92YWwyID0gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcihwYXJzZURlY2ltYWwocmFkZWtfZHNoLmRldGFpbHNbMV0udmFsdWUhKSwgXCJDXCIpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZhciB2YWwxX291dCA9IFwiOiBcIiArIG5ldyBBcnJheShsX2RlbGthIC0gbF92YWwxLmxlbmd0aCArIDEpLmpvaW4oJyAnKSArIGxfdmFsMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmFyIHZhbDJfb3V0ID0gXCI6IFwiICsgbmV3IEFycmF5KGxfZGVsa2EgLSBsX3ZhbDIubGVuZ3RoICsgMSkuam9pbignICcpICsgbF92YWwyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciB2YWwxX291dCA9IFwiIDxkaXY+PGI+XCIgKyByYWRla19kc2guZGV0YWlsc1swXS5kZXNjcmlwdGlvbiEgKyBcIjwvYj48L2Rpdj48ZGl2IGNsYXNzPSdnLWtwaS1tdWx0aXJvdy1oZWFkZXItcmlnaHQnPjxiPlwiICsgbF92YWwxICsgXCI8L2I+PC9kaXY+XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgdmFsMl9vdXQgPSBcIiA8ZGl2PjxiPlwiICsgcmFkZWtfZHNoLmRldGFpbHNbMV0uZGVzY3JpcHRpb24hICsgXCI8L2I+PC9kaXY+PGRpdiBjbGFzcz0nZy1rcGktbXVsdGlyb3ctaGVhZGVyLXJpZ2h0Jz48Yj5cIiArIGxfdmFsMiArIFwiPC9iPjwvZGl2PlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWwxX291dCA9IFwiIDxkaXYgY2xhc3M9XFxcImcta3BpLW11bHRpcm93LWJvZHktZGVzY3JpcHRpb24tcm93IGcta3BpLW11bHRpcm93LWJvZHktZGVzY3JpcHRpb24tcm93X192ZXJ0aWNhbF9tb2RlIGd0b29sdGlwXFxcIiBzdHlsZT1cXFwianVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcXCI+PGRpdj48Yj5cIiArIHJhZGVrX2RzaC5kZXRhaWxzWzBdLmRlc2NyaXB0aW9uISArIFwiPC9iPjwvZGl2PjxkaXYgY2xhc3M9J2cta3BpLW11bHRpcm93LWhlYWRlci1yaWdodCc+PGI+XCIgKyBsX3ZhbDEgKyBcIjwvYj48L2Rpdj48L2Rpdj5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsMl9vdXQgPSBcIiA8ZGl2IGNsYXNzPVxcXCJnLWtwaS1tdWx0aXJvdy1ib2R5LWRlc2NyaXB0aW9uLXJvdyBnLWtwaS1tdWx0aXJvdy1ib2R5LWRlc2NyaXB0aW9uLXJvd19fdmVydGljYWxfbW9kZSBndG9vbHRpcFxcXCIgc3R5bGU9XFxcImp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXFwiPjxkaXY+PGI+XCIgKyByYWRla19kc2guZGV0YWlsc1sxXS5kZXNjcmlwdGlvbiEgKyBcIjwvYj48L2Rpdj48ZGl2IGNsYXNzPSdnLWtwaS1tdWx0aXJvdy1oZWFkZXItcmlnaHQnPjxiPlwiICsgbF92YWwyICsgXCI8L2I+PC9kaXY+PC9kaXY+XCJcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeVRleHQ6IHZhbDFfb3V0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5VGV4dDogdmFsMl9vdXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFydDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiYmFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAxLCB5OiByYWRla19kc2guZGV0YWlsc1swXS52YWx1ZSwgZGVzY3I6IHJhZGVrX2RzaC5kZXRhaWxzWzBdLmRlc2NyaXB0aW9uIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IDIsIHk6IHJhZGVrX2RzaC5kZXRhaWxzWzFdLnZhbHVlLCBkZXNjcjogcmFkZWtfZHNoLmRldGFpbHNbMV0uZGVzY3JpcHRpb24gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGNvbmZpZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBkaXNwbGF5TGFiZWxzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB4UHJvcE5hbWU6IFwiZGVzY3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgeVByb3BOYW1lOiBcInlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgeUF4aXM6IFwia3VrdVlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgeEF4aXM6IFwia3VrdVpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgd2lkdGg6IDYwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaGVpZ2h0OiA1MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIG1hcmdpblRvcDogNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgbWFyZ2luTGVmdDogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBtYXJnaW5Cb3R0b206IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgbWFyZ2luUmlnaHQ6IDIwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRla19wb2xlMiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInNjb3JlY2FyZERhc2hcIiArIGNpdGFjLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCI8Yj5cIiArIHZfcG9waXMgKyBcIjwvaT5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6IFwidmVydGljYWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpvbmU6IGNpdGFjIDw9IDQgPyAwIDogY2l0YWMgPj0gOSA/IDIgOiAxLCAvLyByb3pob3plbmkgbmEgMyB6b255IHBvc3R1cG5lIHNob3JhIGRvbHUgYSB6bGV2YSBkb3ByYXZhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBHb3JkaWMuUHJlZmFicy5QYW5lbHMua3BpQ2hhcnRUd29Sb3dzVGV4dFRlbXBsYXRlKCkuaXRlbVRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFNlbGVjdGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdmVyRW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXdEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy91c2VyU2V0dGluZ3M6IHRoaXMudXNlclNldHRpbmdzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYWRla19wb2xlMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvbGUucHVzaChyYWRla19wb2xlMik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3ZhUmVzcG9uc2UuZGF0YSA9IHBvbGVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm92YVJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgRGFzaEJvYXJkX0lTTF9WaWV3LnJlcXVlc3REYXRhKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy92YXIgaGxhdmlja2EgPSBcImsgb2Jkb2LDrTogIFwiICsgdl9tZXNpYyArIFwiL1wiICsgYWt0X3JvaztcclxuICAgICAgICAgICAgICAgIGxldCBobGF2aWNrYSA9IFwianJlczozMDI1MDY0MVwiLmZvcm1hdCh2X21lc2ljLGFrdF9yb2spOyAvL1JDIDMwMjUwNjQxIDogayBvYmRvYsOtOiAgezB9L3sxfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBsX2Rhc2hib2FyZCA9ICQoXCI8ZGl2PjxoND5cIiArIGhsYXZpY2thICsgXCI8L2g0PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdkYXNoYm9hcmRwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogRGFzaEJvYXJkX0lTTF9WaWV3LFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBsYXlvdXQ6IFwiaG9yaXpvbnRhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzAyNTA2NDBcIiwgLy9SQyAzMDI1MDY0MCA6IEluZm9ybWHEjW7DrSBwYW5lbFxyXG4gICAgICAgICAgICAgICAgICAgIHpvbmVzOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL3dpZHRoOiA4NTAsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2RlZmluaWNlIHZsYXN0bsOtaG8gZGFzaGJvYXJkdVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxfZGFzaGJvYXJkO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIEdvcmRpYy5EYXNoYm9hcmQuQ3VzdG9tUHJvdmlkZXJzLnJlZ2lzdGVyKGN1c3RvbVByb3ZpZGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBvcGVuSUlTU1BJbmJveCgpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGMgPSAodGhpcyBhcyBhbnkpLm5hdmlnYXRlVGFzayhHb3JkaWMuSWlzc3AuV2ViQ29udHJvbHMuR0luYm94KSBhcyBKUXVlcnlQcm9taXNlPEpRdWVyeT47XHJcbiAgICAgICAgICAgIGMudGhlbigoZGl2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkLmNvbnRlbnQoZGl2KS5vbihcImdyaWRkZWZhdWx0YWN0aW9ucnVuXCIsIGZ1bmN0aW9uIChkdG86IEdvcmRpYy5JaXNzcC5JbnRlcmZhY2UuR0lpc3NwSW5ib3hEdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWFza2EgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzcF9lZHM6IHsgc3RhcnQ6IGR0by5pc3BfZWRzLCBlbmQ6IGR0by5pc3BfZWRzX2RvIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBpc3BfZmltOiB7IHN0YXJ0OiBkdG8uaXNwX2ZpbSwgZW5kOiBkdG8uaXNwX2ZpbV9kbyA9PSBudWxsID8gZHRvLmlzcF9maW0gOiBkdG8uaXNwX2ZpbV9kbyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgaXNwX3BhcjogeyBzdGFydDogZHRvLmlzcF9wYXIsIGVuZDogZHRvLmlzcF9wYXJfZG8gPT0gbnVsbCA/IGR0by5pc3BfcGFyIDogZHRvLmlzcF9wYXJfZG8gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIGlzcF9wb2w6IHsgc3RhcnQ6IGR0by5pc3BfcG9sLCBlbmQ6IGR0by5pc3BfcG9sX2RvID09IG51bGwgPyBkdG8uaXNwX3BvbCA6IGR0by5pc3BfcG9sX2RvIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBpc3BfcHZzOiB7IHN0YXJ0OiBkdG8uaXNwX3B2cywgZW5kOiBkdG8uaXNwX3B2c19kbyA9PSBudWxsID8gZHRvLmlzcF9wdnMgOiBkdG8uaXNwX3B2c19kbyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgaXNwX3VjbDogeyBzdGFydDogZHRvLmlzcF91Y2wsIGVuZDogZHRvLmlzcF91Y2xfZG8gPT0gbnVsbCA/IGR0by5pc3BfdWNsIDogZHRvLmlzcF91Y2xfZG8gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIGlzcF91ajogeyBzdGFydDogZHRvLmlzcF91aiwgZW5kOiBkdG8uaXNwX3VqX2RvID09IG51bGwgPyBkdG8uaXNwX3VqIDogZHRvLmlzcF91al9kbyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgaXNwX3V6OiB7IHN0YXJ0OiBkdG8uaXNwX3V6LCBlbmQ6IGR0by5pc3BfdXpfZG8gPT0gbnVsbD8gZHRvLmlzcF91eiA6IGR0by5pc3BfdXpfZG8gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIGlzcF96ZHI6IHsgc3RhcnQ6IGR0by5pc3BfemRyLCBlbmQ6IGR0by5pc3BfemRyX2RvID09IG51bGwgPyBkdG8uaXNwX3pkciA6IGR0by5pc3BfemRyX2RvIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBpc3Bfemo6IHsgc3RhcnQ6IGR0by5pc3BfemosIGVuZDogZHRvLmlzcF96al9kbyA9PSBudWxsID8gZHRvLmlzcF96aiA6IGR0by5pc3BfempfZG8gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIGRhdF9zdGF2OiBkdG8uZGF0X3N0YXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBkYXRfc3Rhdl9vZDogZHRvLmRhdF9zdGF2X29kXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGR0by5tZXRvZGFfemtyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJTVFJPXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmNvbnRlbnQoZGl2KS5uYXZpZ2F0ZSgnR29yZGljLlVjci5XZWJDbGllbnQuR1Nlem5hbUlJU1NQQmFzZUNvbnRlbnQnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza0lkOiAnc2V6bmFtSUlTU1BTdGF2eVJvenBvY3R1QWN0JywgSUQ6ICdzZXpuYW1JSVNTU3RhdnlSb3pwb2N0dSMnLCBUeXBVbG9oeTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9TdGF2eV9TdGF2eVJvenBvY3R1LCBhdXRvUmVsb2FkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtYXNrYTogbWFza2FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJTVFNLXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmNvbnRlbnQoZGl2KS5uYXZpZ2F0ZSgnR29yZGljLlVjci5XZWJDbGllbnQuR1Nlem5hbUlJU1NQQmFzZUNvbnRlbnQnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza0lkOiAnc2V6bmFtSUlTU1BTdGF2eVNrdXRlY25vc3RpQWN0JywgSUQ6ICdzZXpuYW1JSVNTUFN0YXZ5U2t1dGVjbm9zdGkjJywgVHlwVWxvaHk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfU3RhdnlfU3RhdnlTa3V0ZWNub3N0aVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgYXV0b1JlbG9hZDogdHJ1ZSwgbWFza2E6IG1hc2thXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiQ0VST1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5jb250ZW50KGRpdikubmF2aWdhdGUoJ0dvcmRpYy5VY3IuV2ViQ2xpZW50LkdTZXpuYW1JSVNTUEJhc2VDb250ZW50Jywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tJZDogJ3Nlem5hbUlJU1NQQ2VycGFuaVJvenBvY3R1QWN0JywgSUQ6ICdzZXpuYW1JSVNTUENlcnBhbmlSb3pwb2N0dSMnLCBUeXBVbG9oeTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9TdGF2eV9TdGF2eUNlcnBhbmlSb3pwb2N0dSwgYXV0b1JlbG9hZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbWFza2E6IG1hc2thXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiByZWdpc3RyYWNlIGhhbmRsZXJ1IHBybyBhcmNoaXZhY2Uga25paFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBTYWxkb2tvbnRvU2V6bmFtWmFwaXN1SGFuZGxlcigpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLm9uKFwiY2hhbmdlXCIsIFwiR29yZGljLlVjci5TZXJ2ZXIuR1VjclphcGlzeVNhbGRva29udG9Bc3luY1wiLCBmdW5jdGlvbiAobykgeyAgLy9SZWdpc3RyYWNlICsgbmFtZXNwYWNlXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdJbnVTdGF2eUFzeW5jIGNoYW5nZVwiLCBvKTtcclxuICAgICAgICAgICAgICAgIGlmIChvLnByb2dyZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Tm90aWZpY2F0aW9uKCkudXBkYXRlKHsgcHJvZ3Jlc3M6IHsgY3VycmVudDogby5wcm9ncmVzcy5jdXJyZW50LCB0b3RhbDogby5wcm9ncmVzcy50b3RhbCEsIHRleHQ6IG8ucHJvZ3Jlc3MudGV4dCB9IH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiaW5pdFwiLCBcIkdvcmRpYy5VY3IuU2VydmVyLkdVY3JaYXBpc3lTYWxkb2tvbnRvQXN5bmNcIiwgZnVuY3Rpb24gKG8sIHJlc3VsdCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbm90aWZpa2FjZV9TdHYgPSBuZXcgR09ic2VydmFibGVPYmplY3QoeyB0aXRsZTogXCJJbmZvcm1hY2VcIiwgaWNvbjogXCJmYS1nbG9iZVwiLCBjb250ZW50OiBcImpyZXM6MzAyNTAyODhcIiB9KTsgLy9SQyAzMDI1MDI4OCA6IFN0YXJ0IG5hxI3DrXTDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubm90aWZpY2F0aW9uKFwiYWRkXCIsIG5vdGlmaWthY2VfU3R2LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE5vdGlmaWNhdGlvbihub3RpZmlrYWNlX1N0dik7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oXCJkb25lXCIsIFwiR29yZGljLlVjci5TZXJ2ZXIuR1VjclphcGlzeVNhbGRva29udG9Bc3luY1wiLCBmdW5jdGlvbiAobywgcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHVWNyWmFwaXN5U2FsZG9rb250b0FzeW5jIGRvbmUgIFwiLCB0aGlzLmlkLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBub3RpZmlrYWNlX1N0diA9IHRoaXMuZ2V0Tm90aWZpY2F0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICBub3RpZmlrYWNlX1N0di51cGRhdGUoeyB0aXRsZTogXCJIb3Rvdm9cIiwgaWNvbjogXCJmYS1nbG9iZVwiLCBjb250ZW50OiBcImpyZXM6MzAyNTAyODZcIiB9KTsgLy9SQyAzMDI1MDI4NiA6IEhvdG92b1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbihcImZhaWxcIiwgXCJHb3JkaWMuVWNyLlNlcnZlci5HVWNyWmFwaXN5U2FsZG9rb250b0FzeW5jXCIsIGZ1bmN0aW9uIChvLCBleGMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdVY3JaYXBpc3lTYWxkb2tvbnRvQXN5bmMgZmFpbCAgXCIsIHRoaXMuaWQsIGV4Yyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vdGlmaWthY2VfU3R2ID0gdGhpcy5nZXROb3RpZmljYXRpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWthY2VfU3R2LnVwZGF0ZSh7IHRpdGxlOiBcIkNoeWJhXCIsIGljb246IFwiZmEtZ2xvYmVcIiwgY29udGVudDogXCJqcmVzOjMwMjUwMjg3XCIgfSk7IC8vUkMgMzAyNTAyODcgOiBOZWRva29uxI1lbm9cclxuICAgICAgICAgICAgICAgICAgICBHRGxnLnNob3dFeGNlcHRpb24oZXhjLmV4Y2VwdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiYWx3YXlzXCIsIFwiR29yZGljLlVjci5TZXJ2ZXIuR1VjclphcGlzeVNhbGRva29udG9Bc3luY1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHVWNyWmFwaXN5U2FsZG9rb250b0FzeW5jIGFsd2F5c1wiLCB0aGlzLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFuKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHJlZ2lzdHJhY2UgaGFuZGxlcnUgcHJvIGFyY2hpdmFjZSBrbmloXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIFZ5dHZvcml0RGF2a3VIYW5kbGVyKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Bc3luYy5HVGFza01hbmFnZXIub24oXCJjaGFuZ2VcIiwgXCJHb3JkaWMuVWNyLlNlcnZlci5HVWNyVnl0dm9yaXREYXZrdUFzeW5jXCIsIGZ1bmN0aW9uIChvKSB7ICAvL1JlZ2lzdHJhY2UgKyBuYW1lc3BhY2VcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR0ludVN0YXZ5QXN5bmMgY2hhbmdlXCIsIG8pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG8ucHJvZ3Jlc3MpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXROb3RpZmljYXRpb24oKS51cGRhdGUoeyBwcm9ncmVzczogeyBjdXJyZW50OiBvLnByb2dyZXNzLmN1cnJlbnQsIHRvdGFsOiBvLnByb2dyZXNzLnRvdGFsISwgdGV4dDogby5wcm9ncmVzcy50ZXh0IH0gfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXCJpbml0XCIsIFwiR29yZGljLlVjci5TZXJ2ZXIuR1VjclZ5dHZvcml0RGF2a3VBc3luY1wiLCBmdW5jdGlvbiAobywgcmVzdWx0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBub3RpZmlrYWNlX1N0diA9IG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7IHRpdGxlOiBcIkluZm9ybWFjZVwiLCBpY29uOiBcImZhLWdsb2JlXCIsIGNvbnRlbnQ6IFwianJlczozMDI1MDI4OFwiIH0pOyAvL1JDIDMwMjUwMjg4IDogU3RhcnQgbmHEjcOtdMOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5ub3RpZmljYXRpb24oXCJhZGRcIiwgbm90aWZpa2FjZV9TdHYsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Tm90aWZpY2F0aW9uKG5vdGlmaWthY2VfU3R2KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5vbihcImRvbmVcIiwgXCJHb3JkaWMuVWNyLlNlcnZlci5HVWNyVnl0dm9yaXREYXZrdUFzeW5jXCIsIGZ1bmN0aW9uIChvLCByZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdVY3JWeXR2b3JpdERhdmt1QXN5bmMgZG9uZSAgXCIsIHRoaXMuaWQsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vdGlmaWthY2VfU3R2ID0gdGhpcy5nZXROb3RpZmljYXRpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWthY2VfU3R2LnVwZGF0ZSh7IHRpdGxlOiBcIkhvdG92b1wiLCBpY29uOiBcImZhLWdsb2JlXCIsIGNvbnRlbnQ6IFwianJlczozMDI1MDI4NlwiIH0pOyAvL1JDIDMwMjUwMjg2IDogSG90b3ZvXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiZmFpbFwiLCBcIkdvcmRpYy5VY3IuU2VydmVyLkdVY3JWeXR2b3JpdERhdmt1QXN5bmNcIiwgZnVuY3Rpb24gKG8sIGV4Yykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR1VjclZ5dHZvcml0RGF2a3VBc3luYyBmYWlsICBcIiwgdGhpcy5pZCwgZXhjKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbm90aWZpa2FjZV9TdHYgPSB0aGlzLmdldE5vdGlmaWNhdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpa2FjZV9TdHYudXBkYXRlKHsgdGl0bGU6IFwiQ2h5YmFcIiwgaWNvbjogXCJmYS1nbG9iZVwiLCBjb250ZW50OiBcImpyZXM6MzAyNTAyODdcIiB9KTsgLy9SQyAzMDI1MDI4NyA6IE5lZG9rb27EjWVub1xyXG4gICAgICAgICAgICAgICAgICAgIEdEbGcuc2hvd0V4Y2VwdGlvbihleGMuZXhjZXB0aW9uKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXCJhbHdheXNcIiwgXCJHb3JkaWMuVWNyLlNlcnZlci5HVWNyVnl0dm9yaXREYXZrdUFzeW5jXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdVY3JWeXR2b3JpdERhdmt1QXN5bmMgYWx3YXlzXCIsIHRoaXMuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYW4oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgc2hvd1NjaGVkdWxlZEV2ZW50TGlzdCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgLy9UT0RPOiBEbyBndWkud2ViY29udHJvbHMgbmFwc2F0IHJvenNpcmVuaSBwcm8gR0NvbnRlbnRCYXNlLCBrdGVyZSBidWRlIG1pdCBpIG5hdmlnYXRlIHRhc2tcclxuXHJcbiAgICAgICAgICAgIGxldCBvcHRpb25zOiBHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5JR1JlcG9ydFNjaGVkdWxlTGlzdENvbnRyb2xPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgaWRVZGFGaWx0ZXI6ICd1Y3JfdWRhX2dlbnJlcG8nLFxyXG4gICAgICAgICAgICAgICAgYWRkQmFzaWNJZFVkYUZpbHRlcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHJlcG9ydFNjaGVkdWxlckNsYXNzTmFtZTogXCJHb3JkaWMuVWNyLldlYkNsaWVudC5SZXBvcnRzLkdVY3JSZXBvcnRTY2hlZHVsZXJcIixcclxuICAgICAgICAgICAgICAgIGNyZWF0ZURldGFpbDogKGNudCwgZHRvKSA9PiB7IHJldHVybiBuZXcgR1VjclJlcG9ydFNjaGVkdWxlcihjbnQsIHsgZGF0YTogZHRvIH0pOyB9LFxyXG4gICAgICAgICAgICAgICAgZWRpdENpemlPREw6IHRoaXMuZ2xvYmFscy5SYWRfRWRpdENpemlPREwsXHJcbiAgICAgICAgICAgICAgICB6cnVzQ2l6aU9ETDogdGhpcy5nbG9iYWxzLlJhZF9acnVzQ2l6aU9ETFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgKHRoaXMgYXMgYW55KS5uYXZpZ2F0ZVRhc2soR29yZGljLlJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydFNjaGVkdWxlTGlzdENvbnRyb2wsIG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIE90ZXN0b3Zhbmkga29ua3VyZW5jZXNjaG9wbm9zdGkgZ2VuZXJvdmFuaSBzZXN0YXZ5IHZzIGFzeW5jIHRhc2sgKi9cclxuICAgICAgICBwcml2YXRlIHJ1blRlc3RBc3luY1Rhc2soKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5wcm9wKFwiZGVidWdNb2RlXCIpKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLm9uPEdNeU5ldmVyRW5kaW5nUHJvZ3Jlc3NEdG8sIGJvb2xlYW4+KFwiY2hhbmdlXCIsIFwiR29yZGljLlVrYS5TZXJ2ZXIuR05ldmVyRW5kaW5nQXN5bmNUYXNrXCIsIGZ1bmN0aW9uIChvKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW8ucHJvZ3Jlc3MpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR05ldmVyRW5kaW5nQXN5bmNUYXNrIGRhdGEsIHNtbG91dnksIHJlc3VsdCBcIiwgby5wcm9ncmVzcy5kYXRhLCBvLnByb2dyZXNzLnNtbG91dnksIG8ucmVzdWx0LCBvKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc3RhcnRlZEF0ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xyXG4gICAgICAgICAgICB2YXIgdCA9IEdvcmRpYy5Bc3luYy5HVGFza01hbmFnZXIuc3RhcnQoXCJHb3JkaWMuVWthLlNlcnZlci5HTmV2ZXJFbmRpbmdBc3luY1Rhc2tcIiwgbmFtZSArIFwiIFwiICsgc3RhcnRlZEF0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhemVuaSBwcmltLiBkb2tsYWR1XHJcbiAgICAgICAgICogQHBhcmFtIGl4cFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBzaG93UHJpbURva2xhZChpeHA6IHN0cmluZyApOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5sb2cudHJhY2UoXCJTdGFydCBzaG93UHJpbURva2xhZCBNYWluQXBwXCIpO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyB0ZXN0IG5hIHZ5cGxuZW5pbmkgaXhwXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXhwID09PSBcInVuZGVmaW5lZFwiIHx8IGl4cCA9PT0gbnVsbCkgcmV0dXJuXHJcblxyXG5cclxuICAgICAgICAgICAgIFdmbC5EaWFsb2dzLkRldGFpbERva3VtZW50dVNwaXN1KHRoaXMsIHsgU2ltcGxlTW9kZTogZmFsc2UsIC8qSXhwSW5pdFByb1ZhemJ1U291dmlzZWppY2ljaDogaXhwISwqLyBEZXRhaWxEdG86IHsgaXhwOiBpeHAhIH0gfSwgR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLmF1dG8pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpbnRlcmZhY2UgR015TmV2ZXJFbmRpbmdQcm9ncmVzc0R0byBleHRlbmRzIEdvcmRpYy5Bc3luYy5JR1Rhc2tQcm9ncmVzcyB7XHJcbiAgICAgICAgc21sb3V2eTogQXJyYXk8YW55PjtcclxuICAgICAgICBkYXRhOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iXX0=